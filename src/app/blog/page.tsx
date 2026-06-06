import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog — Nostalgia Stories & Childhood Memories',
  description: 'Read about 90s Indian childhood memories, nostalgia gifts, and the things we always wanted but never got.',
};

const blogPosts = [
  {
    slug: '15-toys-90s-kids-wanted',
    title: '15 Toys Every Indian 90s Kid Wanted But Never Got',
    excerpt: 'From RC helicopters to GameBoys — the toys that haunted toy store windows across middle-class India in the 90s.',
    publishedAt: 'June 1, 2026',
    readTime: '6 min read',
    category: 'Nostalgia',
    emoji: '🚁',
  },
  {
    slug: 'best-nostalgia-gifts-india',
    title: 'Best Nostalgia Gifts for Adults in India 2026',
    excerpt: 'A curated guide to the most meaningful nostalgic gifts you can give someone who grew up in India in the 80s, 90s, or 2000s.',
    publishedAt: 'June 3, 2026',
    readTime: '5 min read',
    category: 'Gift Guide',
    emoji: '🎁',
  },
  {
    slug: 'middle-class-childhood-dreams',
    title: 'Things Middle-Class Indian Kids Always Dreamed of Owning',
    excerpt: 'The specific joy of pressing your nose to the toy store glass. The things that felt just out of reach. We\'re bringing them back.',
    publishedAt: 'June 5, 2026',
    readTime: '4 min read',
    category: 'Nostalgia',
    emoji: '💭',
  },
  {
    slug: 'guide-to-meaningful-gifting',
    title: 'The Complete Guide to Gifting Something Meaningful',
    excerpt: 'Generic gifts are forgettable. Meaningful gifts create memories. Here\'s how to think about gifting differently.',
    publishedAt: 'June 7, 2026',
    readTime: '7 min read',
    category: 'Gift Guide',
    emoji: '💌',
  },
  {
    slug: 'rc-helicopter-obsession',
    title: "Why RC Helicopters Were Every 90s Kid's Obsession",
    excerpt: "The toy that hovered in toy store windows across India. The one your parents said 'maybe next time' about. This is its story.",
    publishedAt: 'June 9, 2026',
    readTime: '5 min read',
    category: 'Nostalgia',
    emoji: '🚁',
  },
];

export default function BlogPage() {
  return (
    <div className="pt-16 min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-secondary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-white mb-3">The Nostalgia Blog</h1>
          <p className="text-white/70 text-lg">Stories about childhood. Things we wanted. Memories worth keeping.</p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {/* Featured Post */}
        <div className="mb-12">
          <Link href={`/blog/${blogPosts[0].slug}`} className="card block overflow-hidden group hover:shadow-card-hover transition-shadow duration-300">
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center">
              <span className="text-8xl">{blogPosts[0].emoji}</span>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-primary/10 text-primary font-semibold text-xs px-3 py-1 rounded-full">{blogPosts[0].category}</span>
                <span className="text-muted text-sm">{blogPosts[0].publishedAt}</span>
                <span className="text-muted text-sm">· {blogPosts[0].readTime}</span>
              </div>
              <h2 className="font-fraunces text-3xl font-bold text-dark mb-3 group-hover:text-primary transition-colors leading-tight">
                {blogPosts[0].title}
              </h2>
              <p className="text-muted leading-relaxed">{blogPosts[0].excerpt}</p>
              <div className="mt-4 text-primary font-semibold group-hover:underline">Read article →</div>
            </div>
          </Link>
        </div>

        {/* Other Posts */}
        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.slice(1).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card overflow-hidden group hover:shadow-card-hover transition-shadow duration-300">
              <div className="aspect-video bg-gradient-to-br from-cream to-cream-dark flex items-center justify-center">
                <span className="text-6xl">{post.emoji}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-secondary/10 text-secondary font-semibold text-xs px-2 py-0.5 rounded-full">{post.category}</span>
                  <span className="text-muted text-xs">{post.readTime}</span>
                </div>
                <h3 className="font-fraunces text-xl font-bold text-dark mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted text-sm line-clamp-2 leading-relaxed">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
