import type { Metadata } from 'next';
import { Suspense } from 'react';
import FindAGiftClient from './FindAGiftClient';
import { getAllProducts } from '@/data/products';

export const metadata: Metadata = {
  title: 'Find a Gift | Nostalgia Quiz',
  description: 'Take our nostalgic quiz to find the perfect childhood gift for yourself or a loved one.',
};

export default async function FindAGiftPage() {
  const products = await getAllProducts();

  return (
    <Suspense fallback={<div className="pt-16 min-h-screen bg-cream flex items-center justify-center">Loading quiz...</div>}>
      <FindAGiftClient products={products} />
    </Suspense>
  );
}
