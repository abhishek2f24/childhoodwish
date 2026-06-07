'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';

const occasionLinks = [
  { label: 'For Brother', href: '/for/brother' },
  { label: 'For Husband', href: '/for/husband' },
  { label: 'For Best Friend', href: '/for/best-friend' },
  { label: 'For 90s Kids', href: '/for/90s-kid' },
  { label: 'For Yourself', href: '/for/yourself' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isForSomeoneOpen, setIsForSomeoneOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-card border-b border-cream-darker'
          : 'bg-cream/80 backdrop-blur-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 group py-1">
            <img src="/logo.svg" alt="ChildhoodWish Logo" className="h-12 md:h-14 w-auto transition-transform duration-200 group-hover:scale-[1.02]" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/gift-boxes" className="px-4 py-2 font-medium text-dark hover:text-primary transition-colors rounded-lg hover:bg-cream-dark">
              Gift Boxes
            </Link>

            {/* For Someone Dropdown */}
            <div className="relative" onMouseEnter={() => setIsForSomeoneOpen(true)} onMouseLeave={() => setIsForSomeoneOpen(false)}>
              <button className="flex items-center gap-1 px-4 py-2 font-medium text-dark hover:text-primary transition-colors rounded-lg hover:bg-cream-dark">
                For Someone
                <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', isForSomeoneOpen && 'rotate-180')} />
              </button>

              {isForSomeoneOpen && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-2xl shadow-card-hover border border-cream-darker overflow-hidden">
                  {occasionLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center px-4 py-3 text-dark hover:bg-cream hover:text-primary transition-colors font-medium"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/shop" className="px-4 py-2 font-medium text-dark hover:text-primary transition-colors rounded-lg hover:bg-cream-dark">
              Shop
            </Link>
            <Link href="/find-a-gift" className="px-4 py-2 font-medium text-dark hover:text-primary transition-colors rounded-lg hover:bg-cream-dark">
              Find a Gift
            </Link>
            <Link href="/blog" className="px-4 py-2 font-medium text-dark hover:text-primary transition-colors rounded-lg hover:bg-cream-dark">
              Blog
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              id="navbar-cart-btn"
              className="relative flex items-center gap-2 px-3 py-2 font-medium text-dark hover:text-primary transition-colors rounded-lg hover:bg-cream-dark"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
              <span className="hidden sm:inline">Cart</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              id="navbar-mobile-menu-btn"
              className="md:hidden p-2 rounded-lg hover:bg-cream-dark transition-colors"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="md:hidden border-t border-cream-darker py-4 space-y-1">
            <Link href="/gift-boxes" className="block px-4 py-3 font-medium text-dark hover:text-primary hover:bg-cream-dark rounded-lg transition-colors" onClick={() => setIsMobileOpen(false)}>
              🎁 Gift Boxes
            </Link>
            <div className="px-4 py-2 text-xs font-semibold text-muted uppercase tracking-wider">For Someone</div>
            {occasionLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block px-8 py-2 font-medium text-dark hover:text-primary hover:bg-cream-dark rounded-lg transition-colors" onClick={() => setIsMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/shop" className="block px-4 py-3 font-medium text-dark hover:text-primary hover:bg-cream-dark rounded-lg transition-colors" onClick={() => setIsMobileOpen(false)}>
              🛍️ Shop
            </Link>
            <Link href="/find-a-gift" className="block px-4 py-3 font-medium text-dark hover:text-primary hover:bg-cream-dark rounded-lg transition-colors" onClick={() => setIsMobileOpen(false)}>
              🎯 Find a Gift
            </Link>
            <Link href="/blog" className="block px-4 py-3 font-medium text-dark hover:text-primary hover:bg-cream-dark rounded-lg transition-colors" onClick={() => setIsMobileOpen(false)}>
              📝 Blog
            </Link>
            <Link href="/memory-wall" className="block px-4 py-3 font-medium text-dark hover:text-primary hover:bg-cream-dark rounded-lg transition-colors" onClick={() => setIsMobileOpen(false)}>
              🧡 Memory Wall
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
