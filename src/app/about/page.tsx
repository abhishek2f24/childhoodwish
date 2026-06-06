import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About ChildhoodWish — The Founder Story',
  description: 'Learn why ChildhoodWish exists. The story behind India\'s nostalgia gifting company, told by its founder Abhishek.',
};

export default function AboutPage() {
  return (
    <div className="pt-16 min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-secondary py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-6xl mb-4">👨‍💻</div>
          <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-white mb-4">
            Why ChildhoodWish exists
          </h1>
          <p className="font-caveat text-xl text-white/80 italic">
            A founder story about an RC helicopter, a toy store window, and twenty years.
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="prose prose-lg max-w-none">
          <blockquote className="font-caveat text-3xl text-secondary italic border-l-4 border-primary pl-6 mb-8 leading-relaxed">
            "When I was 10, I wanted an RC helicopter."
          </blockquote>

          <p className="text-dark text-lg leading-relaxed mb-6">
            I used to stop at the toy store every day after school and look at it through the glass. The one with the dual blades and the remote with the flip-up antenna. It was ₹800 — which, at the time, felt like ₹8,00,000.
          </p>

          <p className="text-dark text-lg leading-relaxed mb-6">
            My parents couldn't afford it. That's just how it was. We weren't poor — we were middle-class in the way that most Indian families were middle-class in the 90s. There was food on the table, school fees were paid, and luxuries were for later.
          </p>

          <p className="text-dark text-lg leading-relaxed mb-6">
            Twenty years later, I bought one for myself. I sat on the floor of my apartment in Vadodara and flew it around for an hour. Knocking into walls. Laughing at nothing. Feeling, for a moment, like the 10-year-old who never stopped looking through that glass.
          </p>

          <p className="font-fraunces text-2xl text-dark font-bold mb-6">
            That feeling became ChildhoodWish.
          </p>

          <p className="text-dark text-lg leading-relaxed mb-6">
            Not a toy store. Not a gifting company in the generic sense. A place where every product carries a specific emotion — the thing you always wanted, the thing that felt out of reach, the thing that made you stop and stare.
          </p>

          <p className="text-dark text-lg leading-relaxed mb-6">
            Every product on this site passed a test I call the "glass window test" — does this make someone stop and stare the way I stopped at that toy store? If yes, it's in. If no, it's not.
          </p>

          <p className="text-dark text-lg leading-relaxed mb-6">
            Every order ships with a handwritten note from me. Not printed, not stamped, not templated. Written. Because the unboxing should feel as good as the wish coming true.
          </p>

          <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-6 mb-8">
            <p className="font-caveat text-xl text-secondary italic mb-3">
              "I hope this brings back a memory worth keeping."
            </p>
            <p className="font-bold text-dark">— Abhishek</p>
            <p className="text-muted text-sm">Founder, ChildhoodWish.in</p>
            <p className="text-muted text-sm">Vadodara, Gujarat</p>
          </div>

          <p className="text-dark text-lg leading-relaxed mb-6">
            If you have a wish you never got — tell me on the <Link href="/memory-wall" className="text-primary hover:underline font-semibold">Memory Wall</Link>. If your wish becomes a product, you'll be the first to know.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-10">
            <Link href="/shop" className="btn-primary">
              Browse the shop
            </Link>
            <Link href="/memory-wall" className="btn-outline">
              Share your wish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
