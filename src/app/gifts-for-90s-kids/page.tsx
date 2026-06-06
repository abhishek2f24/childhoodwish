import { Metadata } from 'next';
import { getAllProducts } from '@/data/products';
import { ProductCard } from '@/components/shop/ProductCard';

export const metadata: Metadata = {
  title: '15 Best Gifts for 90s Kids in India (2024)',
  description: 'Looking for the ultimate nostalgic gift for a 90s kid? Explore our curated collection of retro toys, 90s nostalgia items, and childhood memories.',
  alternates: {
    canonical: 'https://childhoodwish.in/gifts-for-90s-kids',
  },
};

export default async function GiftsFor90sKidsPage() {
  const products = await getAllProducts();
  return (
    <div className="pt-16 min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-secondary py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-6xl mb-6">📼</div>
          <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            The Ultimate Guide to Gifts for 90s Kids in India
          </h1>
          <p className="font-caveat text-2xl text-white/80 italic max-w-2xl mx-auto leading-relaxed">
            Because nothing beats the joy of getting the exact toy you begged your parents for in 1999.
          </p>
        </div>
      </div>

      {/* SEO Content & Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <article className="prose prose-lg mx-auto mb-16 text-muted">
          <p className="lead text-xl text-dark font-medium">
            If you're searching for the perfect birthday gift for a 90s kid, you know that standard wallets or generic perfumes just won't cut it. Millennials who grew up in India during the 1990s share a very specific set of cultural memories.
          </p>
          <p>
            It was an era before smartphones and high-speed internet. An era where joy was found in the satisfying click of a magnetic geometry box, the thrill of winning glass kanchas (marbles) in the neighborhood colony, and the collective excitement of watching Shaktimaan on Sunday mornings. 
          </p>
          <p>
            When you give a nostalgic gift, you aren't just giving a physical item—you're giving them a time machine back to the golden days of their childhood.
          </p>
        </article>

        <h2 className="font-fraunces text-3xl font-bold text-dark mb-8 text-center">
          Our Top Nostalgic Gift Recommendations
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <article className="prose prose-lg mx-auto text-muted">
          <h3 className="font-fraunces text-2xl font-bold text-dark">Why Nostalgia Makes the Best Gift</h3>
          <p>
            Psychologists suggest that nostalgia acts as an emotional anchor. For Indian millennials navigating the complexities of adult life, a retro toy from their childhood provides immense comfort and pure, unadulterated joy. It reminds them of simpler times, long summer vacations, and the innocence of being a kid.
          </p>
          <p>
            At ChildhoodWish, we've spent months tracking down these core memories. From Remote Control Racing Cars to Vintage Board Games, our curated gift boxes are the perfect surprise for your best friend, sibling, or partner.
          </p>
        </article>
      </div>
    </div>
  );
}
