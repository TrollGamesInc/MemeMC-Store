'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X, Home, Book, Handshake, Users, Gavel, Plug } from 'lucide-react';
import { useStore } from '@/hooks/use-api';
import { useCart } from '@/hooks/use-cart';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { Store } from '@/lib/schemas';

interface HeaderProps {
  initialStore?: Store | null;
}

export function Header({ initialStore }: HeaderProps) {
  const { data: fetchedStore } = useStore();
  const store = fetchedStore || initialStore;
  const cart = useCart();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItemCount = cart.getItemCount();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const copyToClipboard = (text: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(text);
      alert('IP copied to clipboard!');
    }
  };

  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="nav-container">
        {/* Logo Section */}
        <Link href="/" className="logo">
          {store?.logo ? (
            <div className="relative w-10 h-10">
               <Image
                src={store.logo}
                alt="Logo"
                width={42}
                height={42}
                className="logo-img object-contain"
                unoptimized
              />
            </div>
          ) : (
            <div className="logo-img bg-primary flex items-center justify-center text-white font-bold text-xl">
              {store?.title?.[0] || 'M'}
            </div>
          )}
          <span className="logo-text">{store?.title || 'MemeMC'}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links hidden md:flex items-center">
          <Link href="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          
          {/* Using "as any" on href prevents the Next.js build error for missing routes */}
          <Link href={"/rules" as any} className={`nav-link ${isActive('/rules') ? 'active' : ''}`}>
            <Book className="w-4 h-4" />
            <span>Rules</span>
          </Link>

          <Link href={"/partners" as any} className={`nav-link ${isActive('/partners') ? 'active' : ''}`}>
            <Handshake className="w-4 h-4" />
            <span>Partners</span>
          </Link>

          <Link href={"/staff" as any} className={`nav-link ${isActive('/staff') ? 'active' : ''}`}>
            <Users className="w-4 h-4" />
            <span>Staff</span>
          </Link>

          <Link href={"/punishments" as any} className={`nav-link ${isActive('/punishments') ? 'active' : ''}`}>
            <Gavel className="w-4 h-4" />
            <span>Punishments</span>
          </Link>

          {/* Dynamic links from your store data */}
          {store?.menu_links?.map((menuLink, index) => (
            <a
              key={index}
              href={menuLink.link.trim()}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              <span>{menuLink.title}</span>
            </a>
          ))}

          {/* Store/Cart Button */}
          <Link href="/shop" className="btn btn-store relative group ml-2">
            <ShoppingCart className="w-4 h-4" />
            <span>Store</span>
            {mounted && cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white text-primary text-[10px] font-bold flex items-center justify-center shadow-md">
                {cartItemCount}
              </span>
            )}
          </Link>

          <button 
            onClick={() => copyToClipboard('mememc.club')} 
            className="btn btn-join cursor-pointer ml-2"
          >
            <Plug className="w-4 h-4" />
            <span>Copy IP</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="mobile-menu-btn md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-md border-t border-white/10"
          >
            <div className="flex flex-col p-6 space-y-4">
              <Link href="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href={"/rules" as any} className="nav-link" onClick={() => setMobileMenuOpen(false)}>Rules</Link>
              <Link href={"/partners" as any} className="nav-link" onClick={() => setMobileMenuOpen(false)}>Partners</Link>
              <Link href="/shop" className="nav-link flex justify-between" onClick={() => setMobileMenuOpen(false)}>
                <span>Store</span>
                {cartItemCount > 0 && <span className="bg-primary px-2 rounded text-xs">{cartItemCount}</span>}
              </Link>
              <button 
                onClick={() => { copyToClipboard('mememc.club'); setMobileMenuOpen(false); }} 
                className="btn btn-join w-full justify-center"
              >
                Copy IP
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
