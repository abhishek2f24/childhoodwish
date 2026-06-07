'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice, cn } from '@/lib/utils';
import { Product } from '@/types';

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const featured = products.slice(0, 4);
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);

  return (
    <section className="py-20 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="font-fraunces text-4xl md:text-5xl font-bold text-dark mb-3">
              Things you always wanted
            </h2>
            <p className="text-muted text-lg">Each one passed our emotional resonance test. No compromises.</p>
          </div>
          <Link href="/shop" className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-200 flex-shrink-0">
            See everything <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, index) => {
            const cartItem = items.find((i) => i.product.id === product.id);
            const quantity = cartItem?.quantity || 0;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card group overflow-hidden"
              >
                {/* Product Image */}
                <Link href={`/product/${product.slug}`} className="block">
                  <div className="aspect-square bg-gradient-to-br from-cream to-cream-dark relative overflow-hidden flex items-center justify-center">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                          {product.category === 'toys-games' && '🎮'}
                          {product.category === 'nostalgic-stationery' && '📚'}
                          {product.category === 'sports' && '🏏'}
                          {product.category === 'gift-boxes' && '🎁'}
                        </span>
                      </div>
                    )}
                    {product.originalPrice && (
                      <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                        Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </div>
                    )}
                    {product.memoryWallCount && product.memoryWallCount > 100 && (
                      <div className="absolute top-3 right-3 bg-secondary/90 text-white text-xs font-medium px-2 py-1 rounded-full">
                        🔥 {product.memoryWallCount} wished
                      </div>
                    )}
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-5">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                    {product.category.replace(/-/g, ' ')}
                  </div>
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="font-fraunces text-lg font-bold text-dark mb-2 hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="font-caveat text-secondary text-sm italic line-clamp-2 mb-4">
                    {product.memoryHook}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xl text-dark">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted line-through ml-2">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                    <button
                      onClick={() => addItem(product)}
                      id={`featured-add-to-cart-${product.id}`}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
                        quantity > 0
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-primary text-white hover:bg-primary-dark"
                      )}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {quantity > 0 ? `Added (${quantity})` : 'Add'}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
