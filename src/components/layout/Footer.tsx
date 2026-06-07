import Link from 'next/link';
import { Heart, Send, Mail } from 'lucide-react';

const productLinks = [
  { label: 'Gift Boxes', href: '/gift-boxes' },
  { label: 'All Products', href: '/shop' },
  { label: 'RC Toys', href: '/shop?category=toys-games' },
  { label: 'Nostalgic Stationery', href: '/shop?category=nostalgic-stationery' },
  { label: 'Sports & Outdoor', href: '/shop?category=sports' },
];

const occasionLinks = [
  { label: 'For Brother', href: '/for/brother' },
  { label: 'For Husband', href: '/for/husband' },
  { label: 'For Best Friend', href: '/for/best-friend' },
  { label: 'For 90s Kids', href: '/for/90s-kid' },
  { label: 'For Yourself', href: '/for/yourself' },
];

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Memory Wall', href: '/memory-wall' },
  { label: 'Find a Gift', href: '/find-a-gift' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const legalLinks = [
  { label: 'Terms & Conditions', href: '/legal/terms' },
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Shipping Policy', href: '/legal/shipping' },
  { label: 'Refund Policy', href: '/legal/refunds' },
];

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 flex items-center justify-center">
                <img src="/logo.svg" alt="ChildhoodWish Logo" className="w-full h-full brightness-0 invert" />
              </div>
              <span className="font-fraunces font-bold text-xl text-white tracking-tight">
                Childhood<span className="text-primary">Wish</span>
              </span>
            </div>
            <p className="font-caveat text-lg text-accent italic mb-2">"Because some wishes never expire"</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              India's nostalgia gifting company. We curate gifts that unlock childhood memories — because you deserve that feeling, finally.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a href="https://instagram.com/childhoodwish" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Heart className="w-4 h-4" />
              </a>
              <a href="https://twitter.com/childhoodwish" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Send className="w-4 h-4" />
              </a>
              <a href="mailto:hello@childhoodwish.in" aria-label="Email" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Someone */}
          <div>
            <h3 className="font-semibold text-white mb-4">For Someone</h3>
            <ul className="space-y-2">
              {occasionLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 ChildhoodWish.in — Made with ❤️ in Vadodara, India
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-gray-500 hover:text-gray-300 transition-colors text-xs">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
