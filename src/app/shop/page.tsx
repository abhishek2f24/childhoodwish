import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { getAllProducts } from '@/data/products';

export const metadata: Metadata = {
  title: 'Shop All Nostalgic Gifts',
  description: 'Browse all nostalgic gifts — RC helicopters, glass marbles, vintage geometry boxes, cricket kits, and more. Curated for emotional resonance.',
};

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <div className="pt-16 min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-white mb-3">
            Everything you always wanted
          </h1>
          <p className="text-white/70 text-lg">
            Curated for emotional resonance. Every product passed our nostalgia test.
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <Suspense fallback={<div className="text-center py-20 text-muted">Loading products...</div>}>
          <ProductGrid products={products} />
        </Suspense>
      </div>
    </div>
  );
}
