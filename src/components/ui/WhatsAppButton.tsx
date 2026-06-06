'use client';

import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function WhatsAppButton() {
  const pathname = usePathname();

  // Hide WhatsApp button on checkout and order confirmation pages
  if (pathname === '/checkout' || pathname?.startsWith('/order-confirmation')) {
    return null;
  }

  const message = "Hi ChildhoodWish, I need help choosing a gift.";
  const encodedMessage = encodeURIComponent(message);
  // Replace with actual business WhatsApp number
  const whatsappUrl = `https://wa.me/919876543210?text=${encodedMessage}`;

  return (
    <AnimatePresence>
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: 'spring' }}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_8px_32px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_12px_40px_rgba(37,211,102,0.6)] transition-all duration-300 flex items-center justify-center group"
      >
        <MessageCircle className="w-7 h-7" />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-4 bg-white text-dark text-sm font-semibold px-4 py-2 rounded-xl shadow-card opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden sm:block">
          Need help? Chat with us
          <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white rotate-45" />
        </span>
      </motion.a>
    </AnimatePresence>
  );
}
