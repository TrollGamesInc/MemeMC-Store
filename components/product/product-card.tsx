'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Zap, Check, Sparkles } from 'lucide-react';
import type { ProductGeneral } from '@/lib/schemas';
import { useCart } from '@/hooks/use-cart';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useProduct } from '@/hooks/use-api';
import { CustomFieldsModal } from './custom-fields-modal';
import { useRouter } from 'next/navigation';

type ProductCardProps = {
  product: ProductGeneral;
  hideFeaturedBadge?: boolean;
};

export function ProductCard({ product, hideFeaturedBadge = false }: ProductCardProps) {
  const cart = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [needsCustomFields, setNeedsCustomFields] = useState(false);
  
  // 1. Safe Guard for Hook Input
  const { data: detailedProduct } = useProduct(product?.slug || '');
  
  // 2. Safe Guard for Stock logic
  const isOutOfStock = product?.stock === 0;

  useEffect(() => {
    if (detailedProduct) {
      const hasCustomFields = 
        'custom_fields' in detailedProduct && 
        Array.isArray(detailedProduct.custom_fields) && 
        detailedProduct.custom_fields.length > 0;

      // Safe check for nested properties
      const isSubscriptionWithChoice = !!(detailedProduct?.subscription && detailedProduct?.onetime_sub);
      const isDonation = !!(detailedProduct as any)?.donation;
      const hasServerChoice = !!(detailedProduct as any)?.server_choice;

      setNeedsCustomFields(hasCustomFields || isSubscriptionWithChoice || isDonation || hasServerChoice);
    }
  }, [detailedProduct]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product || isOutOfStock) return;

    if (needsCustomFields && detailedProduct) {
      setShowModal(true);
      return;
    }

    const subscriptionType = product?.subscription ? 'recurring' : undefined;
    const currentInCart = cart.items.find((item) => item.product.id === product.id)?.quantity || 0;
    
    if (typeof product.stock === 'number' && currentInCart + 1 > product.stock) return;

    cart.addItem(product, 1, {}, subscriptionType);
    
    if (product?.subscription && !needsCustomFields) {
      router.push('/cart');
      return;
    }
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const stripHtml = (html: string) => html ? html.replace(/<[^>]*>/g, '').trim() : "";

  // 3. Prevent rendering if product is totally missing
  if (!product) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <div className={`group relative h-full flex flex-col rounded-2xl bg-[#1b5e20] border border-white/10 transition-all duration-500 overflow-hidden shadow-xl ${
        isOutOfStock ? 'opacity-60 grayscale cursor-not-allowed' : 'hover:border-primary-light hover:shadow-primary/20'
      }`}>
        
        {/* Badges */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
          {product?.featured && !hideFeaturedBadge && (
            <span className="flex items-center gap-1 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-primary-light text-white shadow-lg animate-pulse">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          )}
          {product?.percent_off ? (
             <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-red-500 text-white shadow-lg">
                -{product.percent_off}%
             </span>
          ) : null}
        </div>

        {/* Image */}
        <div className="relative w-full h-56 bg-black/20 flex items-center justify-center p-6">
          {product?.image ? (
            <div className="relative w-full h-full">
              <Image
                src={product.image}
                alt={product.name || 'Product'}
                fill
                className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                unoptimized
              />
            </div>
          ) : (
            <Zap className="w-20 h-20 text-white/10" />
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-white mb-2">
            {product?.name || "Rank Item"}
          </h3>
          
          <p className="text-sm text-[#c8e6c9] line-clamp-2 mb-6 min-h-[40px]">
            {product?.small_description ? stripHtml(product.small_description) : "Click to view rank details."}
          </p>

          <div className="mt-auto pt-4 border-t border-white/5">
            <div className="flex items-end justify-between mb-4">
              <div className="flex flex-col">
                {product?.old_price && product.old_price > product.price && (
                  <span className="text-sm text-white/40 line-through decoration-red-500">
                    ${product.old_price.toFixed(2)}
                  </span>
                )}
                <span className="text-3xl font-black text-white tracking-tighter">
                  {/* Using optional chaining inside the template literal fix */}
                  {product?.price !== undefined ? `$${product.price.toFixed(2)}` : 'FREE'}
                  {product?.subscription && <span className="text-xs font-normal opacity-60 ml-1">/mo</span>}
                </span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || added}
              className={`relative w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                added 
                  ? 'bg-primary-light text-white' 
                  : 'bg-white text-[#1b5e20] hover:bg-[#81c784] hover:scale-[1.02]'
              } ${isOutOfStock ? 'bg-gray-700 opacity-50' : ''}`}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.div key="added" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                    <Check className="w-5 h-5" /> Added
                  </motion.div>
                ) : (
                  <motion.div key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" /> 
                    {isOutOfStock ? 'No Stock' : 'Add to Cart'}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      <CustomFieldsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        product={detailedProduct as any}
      />
    </motion.div>
  );
}
