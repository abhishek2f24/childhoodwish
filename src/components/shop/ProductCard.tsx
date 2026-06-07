'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { formatPrice, cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const cartItem = useCartStore((s) => s.items.find((i) => i.product.id === product.id));
  const quantity = cartItem?.quantity || 0;

  const categoryEmoji: Record<string, string> = {
    'toys-games': '🎮',
    'nostalgic-stationery': '📚',
    'sports': '🏏',
    'gift-boxes': '🎁',
  };

  return (
    <div className={cn('card group overflow-hidden flex flex-col h-full')}>
      {/* Image */}
      <Link href={product.isGiftBox ? `/gift-boxes/${product.slug}` : `/product/${product.slug}`} className="block">
        <div className="aspect-square bg-gradient-to-br from-cream to-cream-dark relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
              {categoryEmoji[product.category] || '🎁'}
            </span>
          </div>
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.originalPrice && (
              <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            )}
            {product.isGiftBox && (
              <span className="bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full">
                Gift Box
              </span>
            )}
          </div>
          {product.memoryWallCount && product.memoryWallCount > 200 && (
            <div className="absolute top-3 right-3 bg-dark/80 text-white text-xs px-2 py-1 rounded-full">
              🔥 {product.memoryWallCount}
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-dark/50 flex items-center justify-center">
              <span className="bg-dark text-white font-semibold px-4 py-2 rounded-full text-sm">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
          {product.category.replace(/-/g, ' ')}
        </div>

        <Link href={product.isGiftBox ? `/gift-boxes/${product.slug}` : `/product/${product.slug}`}>
          <h3 className="font-fraunces font-bold text-dark hover:text-primary transition-colors mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="font-caveat text-secondary text-sm italic line-clamp-2 mb-3 flex-1">
          {product.memoryHook}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-lg text-dark">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          {product.inStock ? (
            <button
              onClick={() => addItem(product)}
              id={`product-card-add-${product.id}`}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200',
                quantity > 0
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-primary text-white hover:bg-primary-dark'
              )}
            >
              <ShoppingCart className="w-4 h-4" />
              {quantity > 0 ? `Added (${quantity})` : 'Add'}
            </button>
          ) : (
            <span className="text-xs text-muted">Notify me</span>
          )}
        </div>
      </div>
    </div>
  );
}
