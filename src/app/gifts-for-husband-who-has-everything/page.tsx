import { Metadata } from 'next';
import { getAllProducts } from '@/data/products';
import { ProductCard } from '@/components/shop/ProductCard';

export const metadata: Metadata = {
  title: 'Gifts for Husband Who Has Everything | ChildhoodWish',
  description: 'Struggling to find a gift for your husband? Surprise him with the childhood toys and memories he always wanted but never got.',
  alternates: {
    canonical: 'https://www.childhoodwish.in/gifts-for-husband-who-has-everything',
  },
};

export default async function GiftsForHusbandPage() {
  const products = await getAllProducts();
  return (
    <div className="pt-16 min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-[#2D4A7A] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-6xl mb-6">❤️</div>
          <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Gifts for the Husband Who Has Everything
          </h1>
          <p className="font-caveat text-2xl text-white/80 italic max-w-2xl mx-auto leading-relaxed">
            He might have the latest gadgets and watches. But does he have the RC Car he cried for when he was 10?
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <article className="prose prose-lg mx-auto mb-16 text-muted">
          <p className="lead text-xl text-dark font-medium">
            It's the hardest gifting challenge of the year. Your husband's birthday or your anniversary is coming up, and when you ask him what he wants, he replies: "I don't need anything."
          </p>
          <p>
            Men who "have everything" usually just mean they have everything they need for their *adult* lives. They buy their own clothes, their own tech, and their own tools. What they don't buy for themselves is the pure, innocent joy they experienced as a child.
          </p>
        </article>

        <h2 className="font-fraunces text-3xl font-bold text-dark mb-8 text-center">
          Gifts Guaranteed to Make Him Smile
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <article className="prose prose-lg mx-auto text-muted">
          <h3 className="font-fraunces text-2xl font-bold text-dark">Unlock Core Memories</h3>
          <p>
            When you gift your husband a premium remote control car or a vintage gaming console, you aren't just buying him a toy. You are giving him permission to drop the heavy responsibilities of adulthood for a few hours. You're letting him be a kid again.
          </p>
          <p>
            Many of our customers report that their husbands literally teared up upon opening our nostalgic gift boxes. It shows that you see him not just as a provider or a partner, but as the fun-loving boy he used to be. Skip the boring neckties this year, and give him the childhood wish he never forgot.
          </p>
        </article>
      </div>
    </div>
  );
}
