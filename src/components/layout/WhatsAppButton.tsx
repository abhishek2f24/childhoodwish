'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
  const message = encodeURIComponent("Hi! I need help choosing a gift on ChildhoodWish");
  const href = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip */}
      {isHovered && (
        <div className="bg-dark text-white text-sm font-medium px-3 py-2 rounded-xl shadow-lg whitespace-nowrap animate-in fade-in slide-in-from-right-4 duration-200">
          Chat with us on WhatsApp
        </div>
      )}

      {/* Button */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        id="whatsapp-floating-btn"
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200',
          'after:absolute after:inset-0 after:rounded-full after:bg-[#25D366] after:animate-ping after:opacity-40'
        )}
      >
        <MessageCircle className="w-7 h-7 text-white fill-white" />
      </a>
    </div>
  );
}
