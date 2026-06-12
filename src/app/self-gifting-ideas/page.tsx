import { Metadata } from 'next';
import { getAllProducts } from '@/data/products';
import { ProductCard } from '@/components/shop/ProductCard';

export const metadata: Metadata = {
  title: 'Self Gifting Ideas: Fulfill Your Childhood Dreams',
  description: 'Healing your inner child is powerful. Treat yourself to the premium childhood toys, games, and items you always wanted growing up but never got.',
  alternates: {
    canonical: 'https://www.childhoodwish.in/self-gifting-ideas',
  },
};

export default async function SelfGiftingIdeasPage() {
  const products = await getAllProducts();
  return (
    <div className="pt-16 min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-[#48785E] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-6xl mb-6">🎁</div>
          <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Self Gifting Ideas to Heal Your Inner Child
          </h1>
          <p className="font-caveat text-2xl text-white/80 italic max-w-2xl mx-auto leading-relaxed">
            You've spent years buying things for others. It's time to finally buy the toy you waited 20 years for.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <article className="prose prose-lg mx-auto mb-16 text-muted">
          <p className="lead text-xl text-dark font-medium">
            Self-gifting isn't just about consumerism; it's a profoundly therapeutic act of self-love. For many of us who grew up in middle-class Indian families, our parents worked incredibly hard to provide us with the necessities. However, the "luxury" toys—the big remote control cars, the premium sports gear, the imported gaming consoles—were often out of reach.
          </p>
          <p>
            We watched other kids play with them in the park, and we silently promised ourselves that one day, when we grew up and earned our own money, we would buy them.
          </p>
        </article>

        <h2 className="font-fraunces text-3xl font-bold text-dark mb-8 text-center">
          Treat Yourself to Your Childhood Wish
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <article className="prose prose-lg mx-auto text-muted">
          <h3 className="font-fraunces text-2xl font-bold text-dark">Why You Deserve This</h3>
          <p>
            Now that you are an adult, you have adult money. But strangely, you spend it all on EMIs, groceries, and practical things. The kid inside you who waited patiently for their turn is still waiting.
          </p>
          <p>
            Buying a nostalgic gift for yourself is a way of telling your inner child: "I see you, and your wishes still matter." Whether it's a premium cricket bat you couldn't afford in 1998, or a vintage board game to play on weekends, treating yourself is the ultimate act of reclaiming your joy.
          </p>
        </article>
      </div>
    </div>
  );
}
