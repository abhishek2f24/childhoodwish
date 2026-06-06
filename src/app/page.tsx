import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { FounderStorySection } from '@/components/home/FounderStorySection';
import { BrandStripSection } from '@/components/home/BrandStripSection';
import { MemoryWallPreview } from '@/components/home/MemoryWallPreview';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { GiftBoxFeature } from '@/components/home/GiftBoxFeature';
import { MemorySearchTags } from '@/components/home/MemorySearchTags';
import { QuizCTASection } from '@/components/home/QuizCTASection';
import { getFeaturedProducts } from '@/data/products';

export const metadata: Metadata = {
  title: 'ChildhoodWish — Your childhood wish, finally fulfilled',
  description: "India's nostalgia gifting company. Curated gifts that unlock childhood memories — RC helicopters, glass marbles, vintage geometry boxes, and more. Every order ships with a handwritten founder note.",
};

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {/* 1. Hero */}
      <HeroSection />
      {/* 2. Founder Story */}
      <FounderStorySection />
      {/* 3. Brand Strip */}
      <BrandStripSection />
      {/* 4. Memory Wall Preview */}
      <MemoryWallPreview />
      {/* 5. Featured Products */}
      <FeaturedProducts products={featuredProducts} />
      {/* 6. Gift Box Feature */}
      <GiftBoxFeature />
      {/* 7. Memory Search Tags */}
      <MemorySearchTags />
      {/* 8. Quiz CTA */}
      <QuizCTASection />
    </>
  );
}
