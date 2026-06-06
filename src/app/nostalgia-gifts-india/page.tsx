import { Metadata } from 'next';
import { getAllProducts } from '@/data/products';
import { ProductCard } from '@/components/shop/ProductCard';

export const metadata: Metadata = {
  title: 'Top Nostalgia Gifts in India: Revisit Your Childhood',
  description: 'Shop the best nostalgia gifts in India. We curate premium vintage toys, retro games, and 90s childhood memories perfect for gifting.',
  alternates: {
    canonical: 'https://childhoodwish.in/nostalgia-gifts-india',
  },
};

export default async function NostalgiaGiftsIndiaPage() {
  const products = await getAllProducts();
  return (
    <div className="pt-16 min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-primary py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-6xl mb-6">🇮🇳</div>
          <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            The Best Nostalgia Gifts in India
          </h1>
          <p className="font-caveat text-2xl text-white/80 italic max-w-2xl mx-auto leading-relaxed">
            Reconnecting Indian adults with the magic of their childhoods.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <article className="prose prose-lg mx-auto mb-16 text-muted">
          <p className="lead text-xl text-dark font-medium">
            Finding genuine nostalgia gifts in India can be difficult. While the market is flooded with generic retro-themed mugs and t-shirts, finding the *actual* toys and items you played with as a child is a completely different challenge.
          </p>
          <p>
            That's why we started ChildhoodWish. We believe that true nostalgia isn't just a retro font on a coffee mug. True nostalgia is holding the exact same magnetic geometry box you took to your 5th standard exams. It's the physical weight of a glass marble. It's the distinct sound of a wind-up toy.
          </p>
        </article>

        <h2 className="font-fraunces text-3xl font-bold text-dark mb-8 text-center">
          Handpicked Nostalgia Gifts
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <article className="prose prose-lg mx-auto text-muted">
          <h3 className="font-fraunces text-2xl font-bold text-dark">Why We Love Indian Nostalgia</h3>
          <p>
            The Indian 90s and early 2000s were a massive cultural transition period. We were the generation that grew up playing gully cricket *and* early video games. We watched Doordarshan *and* Cartoon Network. Our childhoods were a beautiful blend of traditional Indian outdoor games and the early days of globalized entertainment.
          </p>
          <p>
            Whether you're looking for a unique anniversary gift or a birthday present for a loved one, our nostalgic gift boxes are shipped across India with a handwritten note, guaranteeing a deeply emotional and memorable unboxing experience.
          </p>
        </article>
      </div>
    </div>
  );
}
