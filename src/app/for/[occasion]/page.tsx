import { notFound } from 'next/navigation';
import { getProductsByOccasion } from '@/data/products';
import { ProductCard } from '@/components/shop/ProductCard';
import type { Metadata } from 'next';

const occasionConfig: Record<string, { title: string; hero: string; subtext: string; emoji: string; seoCopy: string[] }> = {
  brother: {
    title: 'Gifts for Brother',
    hero: 'For the brother who taught you cricket in the colony.',
    subtext: "He spent summers explaining offside rules and teaching you to patch a cycle tyre. Now it's your turn to give him something that brings it all back.",
    emoji: '🏏',
    seoCopy: [
      "Finding the perfect birthday gift for your brother in India can be challenging, especially when he seems to have everything. Whether he's your older brother who protected you or your younger brother who annoyed you, the shared memories of an Indian childhood remain unforgettable.",
      "Instead of generic wallets or perfumes, surprise him with something that instantly transports him back to the 90s. From remote control helicopters he always wanted to play with, to vintage games that defined your summer vacations together. These nostalgic gifts for brothers are guaranteed to make him smile."
    ],
  },
  husband: {
    title: 'Gifts for Husband',
    hero: 'For the man who never lost his inner child.',
    subtext: "He still talks about the RC car he wanted. The geometry box he treasured. The games he played in the colony. Give him something that says: I see you.",
    emoji: '❤️',
    seoCopy: [
      "Are you struggling to find a unique gift for a husband who has everything? The secret to the perfect anniversary or birthday gift isn't finding something expensive, it's finding something meaningful. Behind every hardworking husband is a kid who grew up in the 90s, watching Shaktimaan and trading WWE trump cards.",
      "Our curated collection of nostalgic gifts for men is designed to unlock those core memories. Hand him an RC racing car or a classic 90s kid gift box, and watch his eyes light up exactly like they would have 25 years ago. It's not just a gift; it's a ticket back to his favorite childhood memories."
    ],
  },
  'best-friend': {
    title: 'Gifts for Best Friend',
    hero: 'For the one who shared your childhood.',
    subtext: "You fought over the same toys. You wanted the same things. Now you can give them what they never got — and remind them why they're your person.",
    emoji: '🤝',
    seoCopy: [
      "Your best friend isn't just someone you know; they are the person who shared your most defining childhood moments. You traded lunchboxes, played video games until your thumbs hurt, and pooled your pocket money to buy snacks from the corner shop.",
      "The best gift for a childhood best friend is one that honors those shared experiences. Explore our collection of retro toys, 90s nostalgia items, and meaningful keepsakes that celebrate the unbreakable bond you built during the golden days of growing up in India."
    ],
  },
  '90s-kid': {
    title: 'Gifts for 90s Kids',
    hero: 'For the kid who grew up in the best decade.',
    subtext: "Doordarshan, Cartoon Network, kanchas in school bags, geometry boxes, colony cricket. The 90s were special. So are the people who lived them.",
    emoji: '📼',
    seoCopy: [
      "Growing up in India during the 1990s was a unique cultural phenomenon. Before smartphones and social media, joy was found in simple things: the satisfying click of a magnetic geometry box, the thrill of winning glass kanchas, and the collective excitement of Sunday morning cartoons.",
      "If you're looking for the ultimate retro gifts for 90s kids, you've found the right place. Our premium gift boxes and individual nostalgia items are meticulously curated to recreate the exact feeling of being a child in 90s India. These make perfect birthday gifts for millennials looking to relive their childhood."
    ],
  },
  yourself: {
    title: 'Gifts for Yourself',
    hero: 'The most important person who deserves this gift? You.',
    subtext: "You spent years making sure everyone else got what they wanted. This one's for the child who waited the longest. You deserve to finally have it.",
    emoji: '💝',
    seoCopy: [
      "Self-gifting is a powerful act of healing, especially when it involves fulfilling a long-held childhood wish. Many of us grew up watching other kids play with toys our parents couldn't afford—the expensive RC helicopters, the premium cricket bats, or the imported video games.",
      "Now that you're an adult, it's time to heal your inner child. Buying a nostalgic gift for yourself isn't just about the physical item; it's about telling the kid inside you that their wishes still matter. You waited long enough. Treat yourself to the childhood dream you never forgot."
    ],
  },
};

const VALID_OCCASIONS = Object.keys(occasionConfig);

interface Props {
  params: Promise<{ occasion: string }>;
}

export function generateStaticParams() {
  return VALID_OCCASIONS.map((occasion) => ({ occasion }));
}

export async function generateMetadata(props: { params: Promise<{ occasion: string }> }): Promise<Metadata> {
  const params = await props.params;
  const occasion = params.occasion.toLowerCase();
  const config = occasionConfig[occasion];

  if (!config) {
    return { title: 'Gifts by Occasion | ChildhoodWish' };
  }

  return {
    title: `${config.title} — Nostalgic Toys & Memories | ChildhoodWish`,
    description: config.subtext,
    alternates: {
      canonical: `https://www.childhoodwish.in/for/${occasion}`,
    },
  };
}

export default async function OccasionPage(props: { params: Promise<{ occasion: string }> }) {
  const params = await props.params;
  const occasion = params.occasion.toLowerCase();
  const config = occasionConfig[occasion];

  if (!config) {
    notFound();
  }

  const products = await getProductsByOccasion(occasion);

  return (
    <div className="pt-16 min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-cream-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-6xl mb-6">{config.emoji}</div>
          <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-dark mb-4">
            {config.title}
          </h1>
          <p className="font-caveat text-secondary text-2xl mb-4 italic max-w-2xl mx-auto">
            "{config.hero}"
          </p>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            {config.subtext}
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {products.length > 0 ? (
          <>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-fraunces text-2xl font-bold text-dark">Curated Collection</h2>
              <span className="text-sm text-muted">{products.length} gifts</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎁</div>
            <h3 className="font-fraunces text-2xl text-dark mb-2">Coming soon</h3>
            <p className="text-muted">We're curating the perfect gifts for this occasion.</p>
          </div>
        )}

        {/* Gift box recommendation */}
        <div className="mt-16 bg-primary rounded-3xl p-8 text-white text-center">
          <h3 className="font-fraunces text-3xl font-bold mb-3">Can't decide? Build a gift box.</h3>
          <p className="text-white/80 mb-6">Pick any 3 items from our collection and we'll pack it beautifully.</p>
          <a href="/gift-boxes/build-your-wish-box" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-cream transition-colors">
            Build Your Wish Box →
          </a>
        </div>

        {/* SEO Copy Section */}
        {config.seoCopy && config.seoCopy.length > 0 && (
          <article className="mt-20 max-w-4xl mx-auto border-t border-cream-darker pt-16">
            <h2 className="font-fraunces text-2xl font-bold text-dark mb-6">
              More about {config.title.toLowerCase()}
            </h2>
            <div className="space-y-4">
              {config.seoCopy.map((paragraph, index) => (
                <p key={index} className="text-muted leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
