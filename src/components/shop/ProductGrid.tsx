'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';

const categories = [
  { label: 'All', value: '' },
  { label: 'Toys & Games', value: 'toys-games' },
  { label: 'Nostalgic Stationery', value: 'nostalgic-stationery' },
  { label: 'Sports & Outdoor', value: 'sports' },
  { label: 'Gift Boxes', value: 'gift-boxes' },
];

const tags = [
  { label: 'School Days', value: 'school-days' },
  { label: 'Colony Games', value: 'colony-games' },
  { label: '90s Kid', value: '90s-kid' },
  { label: 'Cricket', value: 'cricket' },
  { label: 'Retro', value: 'retro' },
];

const ITEMS_PER_PAGE = 8;

interface ProductGridProps {
  products: Product[];
  initialCategory?: string;
  initialTag?: string;
}

export function ProductGrid({ products, initialCategory = '', initialTag = '' }: ProductGridProps) {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || initialCategory);
  const [selectedTag, setSelectedTag] = useState(searchParams.get('tag') || initialTag);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filtered = products.filter((p) => {
    const categoryMatch = !selectedCategory || p.category === selectedCategory;
    const tagMatch = !selectedTag || p.tags.includes(selectedTag as any);
    return categoryMatch && tagMatch;
  });

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(ITEMS_PER_PAGE);
  };
  const handleTagChange = (tag: string) => {
    setSelectedTag(tag === selectedTag ? '' : tag);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <div>
      {/* Filter Bar — Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.value}
            id={`filter-category-${cat.value || 'all'}`}
            onClick={() => handleCategoryChange(cat.value)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200 ${
              selectedCategory === cat.value
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-dark border-cream-darker hover:border-primary hover:text-primary'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Memory Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map((tag) => (
          <button
            key={tag.value}
            id={`filter-tag-${tag.value}`}
            onClick={() => handleTagChange(tag.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
              selectedTag === tag.value
                ? 'bg-secondary text-white border-secondary'
                : 'bg-white text-muted border-cream-darker hover:border-secondary hover:text-secondary'
            }`}
          >
            {tag.label}
          </button>
        ))}
        {selectedTag && (
          <button onClick={() => setSelectedTag('')} className="px-3 py-1.5 rounded-full text-xs font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-colors">
            ✕ Clear filter
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="text-sm text-muted mb-6">
        Showing {visible.length} of {filtered.length} products
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="font-fraunces text-2xl text-dark mb-2">No products found</h3>
          <p className="text-muted">Try a different filter or browse all products</p>
          <button onClick={() => { setSelectedCategory(''); setSelectedTag(''); }} className="btn-primary mt-6">
            See All Products
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-10">
              <button
                id="load-more-btn"
                onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
                className="btn-outline"
              >
                Load {Math.min(ITEMS_PER_PAGE, filtered.length - visibleCount)} more products
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
