'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Zap, Check, ArrowRight, Sparkles } from 'lucide-react';
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
  const { data: detailedProduct } = useProduct(product.slug);
  
  const isOutOfStock = typeof product.stock === 'number' && product.stock === 0;

  useEffect(() => {
    if (detailedProduct) {
      const hasCustomFields = 'custom_fields' in detailedProduct && detailedProduct.custom_fields && detailedProduct.custom_fields.length > 0;
      const isSubscriptionWithChoice = detailedProduct.subscription && detailedProduct.onetime_sub === true;
      const isDonation = 'donation' in detailedProduct && detailedProduct.donation === true;
      const hasServerChoice = 'server_choice' in detailedProduct && detailedProduct.server_choice === true;
      setNeedsCustomFields(hasCustomFields || isSubscriptionWithChoice || isDonation || hasServerChoice);
    }
  }, [detailedProduct]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;

    if (needsCustomFields && detailedProduct) {
      setShowModal(true);
      return;
    }

    const subscriptionType = product.subscription ? 'recurring' : undefined;
    const currentInCart = cart.items.find((item) => item.product.id === product.id)?.quantity || 0;
    
    if (typeof product.stock === 'number' && currentInCart + 1 > product.stock) return;
    
    cart.addItem(product, 1, {}, subscriptionType);
    
    if (product.subscription && !needsCustomFields) {
      router.push('/cart');
      return;
    }
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '').trim();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <div className={`group relative h-full flex flex-col rounded-2xl bg-[#1b5e20] border border-white/10 transition-all duration-500 overflow-hidden shadow-xl ${
        isOutOfStock ? 'opacity-60 grayscale cursor-not-allowed' : 'hover:border-primary-light hover:shadow-primary/20'
      }`}>
        
        {/* Glass Effect Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
          {product.featured && !hideFeaturedBadge && (
            <span className="flex items-center gap-1 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-primary-light text-white shadow-lg animate-pulse">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          )}
          {product.percent_off && product.percent_off > 0 && (
            <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-red-500 text-white shadow-lg">
              -{product.percent_off}% OFF
            </span>
          )}
        </div>

        {/* Image Area */}
        <div className="relative w-full h-56 bg-black/20 overflow-hidden flex items-center justify-center p-6">
          {product.image ? (
            <motion.div className="relative w-full h-full" whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                unoptimized
              />
            </motion.div>
          ) : (
            <Zap className="w-20 h-20 text-white/10" />
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-transparent to-black/20">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-lighter transition-colors">
            {product.name}
          </h3>
          
          <div className="text-sm text-text-secondary line-clamp-2 mb-6 min-h-[40px]">
            {product.small_description ? stripHtml(product.small_description) : "Premium rank with exclusive server benefits."}
          </div>

          {/* Pricing & Button */}
          <div className="mt-auto pt-4 border-t border-white/5">
            <div className="flex items-end justify-between mb-4">
              <div className="flex flex-col">
                {product.old_price && product.old_price > product.price && (
                  <span className="text-sm text-white/40 line-through decoration-red-500">
                    ${product.old_price.toFixed(2)}
                  </span>
                )}
                <span className="text-3xl font-black text-white tracking-tighter">
                  {product.price > 0 ? `$${product.price.toFixed(2)}` : 'FREE'}
                  {product.subscription && <span className="text-xs font-normal opacity-60 ml-1">/mo</span>}
                </span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || added}
              className={`relative w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden shadow-lg ${
                added 
                  ? 'bg-primary-light text-white' 
                  : 'bg-white text-primary-dark hover:bg-primary-lighter hover:scale-[1.02] active:scale-95'
              } ${isOutOfStock ? 'bg-gray-700 cursor-not-allowed' : ''}`}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.div key="added" initial={{ y: 20 }} animate={{ y: 0 }} className="flex items-center gap-2">
                    <Check className="w-5 h-5" /> Added!
                  </motion.div>
                ) : (
                  <motion.div key="add" initial={{ y: -20 }} animate={{ y: 0 }} className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" /> 
                    {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      <CustomFieldsModal
        open={showModal}
        onOpenChange={setShowModal}
        product={detailedProduct as any}
      />
    </motion.div>
  );
}
