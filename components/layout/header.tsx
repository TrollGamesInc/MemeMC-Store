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
  const [animate, setAnimate] = useState(false);

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
            <div className="relative w-[42px] height-[42px]">
               <Image
                src={store.logo}
                alt="MemeMC Logo"
                width={42}
                height={42}
                className="logo-img"
                unoptimized
              />
            </div>
          ) : (
            <div className="logo-img bg-primary flex items-center justify-center text-white font-bold">
              {store?.title?.[0] || 'M'}
            </div>
          )}
          <span className="logo-text">{store?.title || 'MemeMC'}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links hidden md:flex">
          <Link href="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          
          <Link href="/rules" className={`nav-link ${isActive('/rules') ? 'active' : ''}`}>
            <Book className="w-4 h-4" />
            <span>Rules</span>
          </Link>

          <Link href="/partners" className={`nav-link ${isActive('/partners') ? 'active' : ''}`}>
            <Handshake className="w-4 h-4" />
            <span>Partners</span>
          </Link>

          <Link href="/staff" className={`nav-link ${isActive('/staff') ? 'active' : ''}`}>
            <Users className="w-4 h-4" />
            <span>Staff</span>
          </Link>

          <Link href="/punishments" className={`nav-link ${isActive('/punishments') ? 'active' : ''}`}>
            <Gavel className="w-4 h-4" />
            <span>Punishments</span>
          </Link>

          {/* Dynamic Store/Cart Button */}
          <Link href="/shop" className="btn btn-store relative group">
            <ShoppingCart className="w-4 h-4" />
            <span>Store</span>
            <AnimatePresence>
              {mounted && cartItemCount > 0 && (
                <motion.span
                  key={cartItemCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white text-primary text-[10px] font-bold flex items-center justify-center shadow-lg"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button onClick={() => copyToClipboard('mememc.club')} className="btn btn-join cursor-pointer">
            <Plug className="w-4 h-4" />
            <span>Copy IP</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="mobile-menu-btn md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden flex flex-col p-4 space-y-4 bg-background border-t border-border"
          >
            <Link href="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/rules" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Rules</Link>
            <Link href="/partners" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Partners</Link>
            <Link href="/shop" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Store ({cartItemCount})</Link>
            <button onClick={() => copyToClipboard('mememc.club')} className="btn btn-join w-full">Copy IP</button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
