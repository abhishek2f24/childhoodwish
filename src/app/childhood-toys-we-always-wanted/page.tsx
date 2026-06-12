import { Metadata } from 'next';
import { getAllProducts } from '@/data/products';
import { ProductCard } from '@/components/shop/ProductCard';

export const metadata: Metadata = {
  title: 'Childhood Toys We Always Wanted But Never Got',
  description: 'A nostalgic trip down memory lane looking at the most desired childhood toys of the 90s and 2000s in India. Shop the ones you missed out on!',
  alternates: {
    canonical: 'https://www.childhoodwish.in/childhood-toys-we-always-wanted',
  },
};

export default async function ChildhoodToysPage() {
  const products = await getAllProducts();
  return (
    <div className="pt-16 min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-[#E8532A] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-6xl mb-6">🚂</div>
          <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Childhood Toys We Always Wanted
          </h1>
          <p className="font-caveat text-2xl text-white/80 italic max-w-2xl mx-auto leading-relaxed">
            The ultimate list of the toys that dominated our 90s Indian childhood dreams.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <article className="prose prose-lg mx-auto mb-16 text-muted">
          <p className="lead text-xl text-dark font-medium">
            If you grew up in India during the 90s and early 2000s, there was a universal hierarchy of cool toys. The kid who brought the multi-tier magnetic geometry box to school was royalty for the day. The kid who owned the big remote control car was the undisputed leader of the colony.
          </p>
          <p>
            But for most of us, these toys remained on our wishlists. We stared at them in shop windows, saw them advertised between episodes of our favorite cartoons, and begged our parents for them before every birthday.
          </p>
        </article>

        <h2 className="font-fraunces text-3xl font-bold text-dark mb-8 text-center">
          Bring Home the Toys You Missed
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <article className="prose prose-lg mx-auto text-muted">
          <h3 className="font-fraunces text-2xl font-bold text-dark">Why We Never Forgot Them</h3>
          <p>
            The toys we didn't get often stick in our memories far longer than the ones we did. They represent a sense of unfulfilled wonder. That's why finally holding that toy in your hands as an adult is such a powerful experience.
          </p>
          <p>
            At ChildhoodWish, we specialize in hunting down these precise nostalgic artifacts. We source high-quality, authentic versions of the childhood toys you always wanted, allowing you to finally cross them off your childhood wishlist.
          </p>
        </article>
      </div>
    </div>
  );
}
