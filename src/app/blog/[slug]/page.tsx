import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

interface BlogPostData {
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  category: string;
  emoji: string;
  content: string;
  keyword: string;
}

const blogContent: Record<string, BlogPostData> = {
  '15-toys-90s-kids-wanted': {
    title: '15 Toys Every Indian 90s Kid Wanted But Never Got',
    excerpt: 'From RC helicopters to GameBoys — the toys that haunted toy store windows across middle-class India in the 90s.',
    publishedAt: 'June 1, 2026',
    readTime: '6 min read',
    category: 'Nostalgia',
    emoji: '🚁',
    keyword: '90s Indian toys',
    content: `
I remember standing at the toy store on MG Road every day after school. The RC helicopter was in the window display — always. Red body, dual blades, the kind that made that satisfying whirring sound. The price tag said ₹800. It might as well have said ₹8 lakhs.

Most of us grew up in households where toys were occasional luxuries, not expected birthdays. The really good stuff — the branded stuff, the stuff with batteries and remotes and mechanical parts — that was for the rich kids. The ones whose parents drove Maruti 800s instead of riding cycles.

Here are 15 toys that defined the wanting for every Indian 90s kid.

## 1. RC Helicopter
The king of all 90s toy wishes. Every toy store had one in the window. Most of us never owned one. The feeling when you finally pilot one as an adult? Indescribable.

## 2. RC Racing Car
"Remote control car" was the phrase that sent every 90s kid into a spiral of wanting. The ones with the proper spring suspension and grip tyres were the stuff of legends.

## 3. Nintendo GameBoy
We had "brick game" — the 999-in-1 version that cost ₹200 from the local electronics shop. But the GameBoy was the real thing, and we all knew it.

## 4. Glass Marble Set (Kanchas)
The premium ones. Not the cheap ones you could get for ₹2 a handful. The big, heavy, perfectly clear ones in a velvet pouch. Collecting those was status.

## 5. Professional Yo-Yo
Not the plastic ₹10 one that snapped string in a week. The proper one, ball-bearing axle, the kind that would sleep for a full 30 seconds.

## 6. Lego Set
The proper Lego — not the Chinese knock-offs. A Lego Technic or a Lego City set was the pinnacle of toy achievement.

## 7. Professional Cricket Bat
Not the thin wooden plank you'd get from the local sports shop. A proper SG or SS bat, the ones with the full spine and the correct weight.

## 8. Bicycle with Gears
We had cycles. But not the ones with gear shifts. The ones with the handlebar gear changers were reserved for the colony's elite.

## 9. Air Gun (Pistol) with Pellets
Parents said no. We wanted one anyway. The metal ones that actually had some weight to them.

## 10. Chemistry Set
Real chemistry set. Not the educational toy — the one with actual experiments and reactions. We wanted to feel like scientists.

## 11. Walkie-Talkies
Two-way radios. Before mobile phones. The idea of talking to your friend from across the street using a device — pure magic.

## 12. Metal Spinning Top (Lattu)
The expensive metal one with perfect balance, not the plastic toy. The kind that would spin for 5 minutes on a smooth floor.

## 13. Real Telescope
Not a magnifying glass. An actual telescope you could point at the sky and see craters on the moon. Every kid who read science books wanted one.

## 14. Carrom Board (Coin Quality)
The full-size carrom board with real striker coins, not the plastic ones. The ones families bought for their sitting room were sacred objects.

## 15. Hot Wheels Track Set
The orange plastic track that you could loop and curve. We had toy cars; we didn't have the full track system.

---

Some of these wishes — we've finally fulfilled them. The RC helicopter, the glass marble set, the metal spinning top, the professional yo-yo — they're all here at ChildhoodWish.

Your childhood wish? **It can finally come true.**
    `,
  },
  'best-nostalgia-gifts-india': {
    title: 'Best Nostalgia Gifts for Adults in India 2026',
    excerpt: 'A curated guide to the most meaningful nostalgic gifts you can give someone who grew up in India in the 80s, 90s, or 2000s.',
    publishedAt: 'June 3, 2026',
    readTime: '5 min read',
    category: 'Gift Guide',
    emoji: '🎁',
    keyword: 'nostalgia gifts India',
    content: `
The best gifts aren't the most expensive ones. They're the ones that make someone feel seen — like you understand what made them who they are.

For Indians who grew up in the 80s, 90s, or early 2000s, nostalgia is a specific and powerful thing. It's tied to the television shows, the colony games, the school stationery, the toys that lived in shop windows.

Here's a curated guide to the best nostalgia gifts for Indian adults in 2026.

## For the 90s Kid Who Had Everything But the Good Stuff

**The 90s Kid Box (₹1,499)**
This is the one. RC helicopter, glass marble set, professional yo-yo, vintage geometry box replica. Everything they pointed at through toy store glass, finally in one box.

## For the School Stationery Nostalgic

**Vintage Geometry Box Replica (₹449)**
Every Indian kid had one. Lost it every semester. This replica brings back the feeling with premium quality — a keepsake, not a stationery item.

## For the RC Toy Dreamer

**RC Mini Helicopter (₹699)**
The toy that hovered in every toy store window in the 90s. Now available at a price that's actually within reach.

## For the Gully Cricket Champion

**Cricket Memory Kit (₹599)**
Leather ball, bat grip, cricket cap. Not a full set — a memory. The exact bundle that made you feel like Sachin for an afternoon.

## Gifting Tips for Nostalgia Gifts

1. **Add a personal note.** Every ChildhoodWish order includes a handwritten note. But add your own message too — reference a specific memory.
2. **Think decade first.** An 80s kid and a 2000s kid have different nostalgia triggers.
3. **Curated is better than expensive.** A ₹449 geometry box that hits the right memory beats a ₹5,000 generic gift every time.

**The rule:** If it makes them stop and say "I always wanted this" — you got it right.
    `,
  },
  'middle-class-childhood-dreams': {
    title: 'Things Middle-Class Indian Kids Always Dreamed of Owning',
    excerpt: "The specific joy of pressing your nose to the toy store glass. The things that felt just out of reach. We're bringing them back.",
    publishedAt: 'June 5, 2026',
    readTime: '4 min read',
    category: 'Nostalgia',
    emoji: '💭',
    keyword: 'childhood dreams India',
    content: `
There was a specific category of things we couldn't have as middle-class Indian kids. Not the things we never heard of — those we didn't miss. I mean the things we *knew* existed, that we'd seen in other people's houses or toy store windows, that we walked past weekly and catalogued carefully in our heads.

These were the things that taught us the difference between want and have.

## The Toy Store Window Economy

Every shopping area had a toy store. Good toy stores had display windows. And middle-class children — those of us whose parents had enough to survive comfortably but not enough to indulge freely — became expert window shoppers before we were seven years old.

You'd press your nose to the glass. Catalog the prices. Calculate in your head how many weeks of pocket money it would take. Know that it would never happen.

## What Made It Hurt

It wasn't poverty. Most of our families had food, schooling, safety — the basics plus a little more. What we had was exactly enough — and "exactly enough" meant certain things didn't make the cut.

The RC helicopter. The chemistry set. The proper cricket bat with the full spine. These were ₹500–₹1,500 items in the 90s — not nothing, but not everything either.

## The Kids Who Had Them

You knew who they were. The ones who came to school with the proper yo-yo, not the cheap plastic one. The ones with the branded geometry box. You weren't jealous in a mean way — you were just acutely aware of the distance.

## Now

We're adults. Most of us earn more than our parents did. And yet, somehow, most of us still haven't bought the things we wanted at 10.

There's something about childhood wants that stays frozen. You move on. You get other things. But the window is still there somewhere in your memory.

ChildhoodWish exists for this specific feeling. Not to sell toys — to fulfil wishes.

The RC helicopter you pointed at. The glass marbles in the velvet pouch. The geometry box that's a keepsake, not a stationery item.

**They're here now. You can finally have them.**
    `,
  },
  'guide-to-meaningful-gifting': {
    title: 'The Complete Guide to Gifting Something Meaningful',
    excerpt: "Generic gifts are forgettable. Meaningful gifts create memories. Here's how to think about gifting differently.",
    publishedAt: 'June 7, 2026',
    readTime: '7 min read',
    category: 'Gift Guide',
    emoji: '💌',
    keyword: 'meaningful gifts India',
    content: `
Most gifts are forgotten within a week. The box is recycled. The item gets stashed in a drawer. The gesture was appreciated in the moment, but nothing lasting was created.

Meaningful gifts are different. They get displayed. They're talked about. They come up in stories years later — "do you remember when you gave me...?"

Here's how to be that person. The one who actually gets it right.

## Rule 1: Give Them Something They Wouldn't Buy for Themselves

This is the most important rule. If they'd already have it, you're not giving them anything — you're just replacing something.

The best gifts are things people *want* but wouldn't prioritize spending money on. Maybe they think it's frivolous. Maybe they always put others first. Maybe they've just never gotten around to it.

Your job: get around to it for them.

## Rule 2: Reference a Specific Memory

A gift becomes meaningful when it references something specific. Not "I thought you'd like this" — but "I remembered you always talked about the RC car you wanted as a kid."

That specificity turns an object into evidence that someone was listening.

## Rule 3: Nostalgia Hits Different

Memories are emotional. Triggering a positive memory is one of the most reliable ways to make someone feel genuinely happy.

For Indian adults who grew up in the 80s, 90s, or 2000s, childhood nostalgia is particularly potent. The specific toys, stationery, games — these aren't just objects. They're portal to a version of themselves that was unselfconscious and full of simple want.

## Rule 4: The Presentation Matters

A meaningful gift in a plastic bag from a general store loses half its meaning. Packaging tells the recipient: "I thought about this."

Tissue paper. A proper box. A handwritten note. These cost almost nothing but add everything.

## The Nostalgia Gift Shortcut

If you know someone who grew up in India in the 90s (or any decade), nostalgia gifting is the highest-ROI category. It's specific, it's personal by default, and it creates a reaction that generic gifts can't.

A glass marble set in a velvet pouch. A vintage geometry box. An RC helicopter. A professional yo-yo. These are gifts that say: *"I see who you were, and I think that person deserved this."*

That's the gift.
    `,
  },
  'rc-helicopter-obsession': {
    title: "Why RC Helicopters Were Every 90s Kid's Obsession",
    excerpt: "The toy that hovered in toy store windows across India. The one your parents said 'maybe next time' about. This is its story.",
    publishedAt: 'June 9, 2026',
    readTime: '5 min read',
    category: 'Nostalgia',
    emoji: '🚁',
    keyword: 'RC helicopter India childhood',
    content: `
There was something about RC helicopters that made them the top of the want list for 90s Indian kids.

It wasn't just that they flew. Kites flew. Paper planes flew. It was the combination: they flew *mechanically*, they responded to *your control*, and they hovered — which felt like magic.

## The Physics of Wanting

An RC helicopter has a quality that no other toy has. It moves in three dimensions. It can go up, down, sideways, rotate, hover in place. It defies gravity while obeying you.

For a 10-year-old who understood none of the physics, it was pure wonder. For a 10-year-old who was starting to understand some physics, it was *even more wonder*.

## The Toy Store Window

Every toy store in every town in India that stocked them put them in the window. Why? Because they drew the gaze. You'd be walking past, and the rotating blades would catch your eye, and you'd stop.

Then you'd stand there for a while, watching.

Then you'd look at the price tag.

Then you'd calculate.

Then you'd go home.

## "Maybe Next Time"

These were the words that haunted every 90s kid's RC helicopter journey.

"Maybe for your birthday."
"If you get good marks."
"Maybe next time."

Next time never came. Or if it did, it came in the form of a cheaper, worse version that broke in a week and made the original want somehow sharper.

## Twenty Years Later

Here's what happened when I finally bought one.

I was 30. I'd just launched ChildhoodWish. I ordered an RC mini helicopter as the first product I was testing. It arrived in a brown cardboard box.

I charged it for an hour. Took it to my living room. Turned it on.

It lifted off the floor, wobbled, found its balance, and hovered at eye level.

I flew it around my apartment for an hour.

Knocking into walls. Laughing at nothing. Sending it up to the ceiling fan level and panicking and bringing it back down.

I'm not embarrassed to tell you that I felt exactly like that 10-year-old at the toy store window. Exactly. The feeling doesn't age.

---

**The RC Mini Helicopter is ₹699 at ChildhoodWish.** Charges via USB, flies for 10 minutes, hovers beautifully. It's everything that used to be in the window.

*This time, you can bring it home.*
    `,
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(blogContent).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogContent[slug];
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.keyword],
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogContent[slug];
  if (!post) notFound();

  // Convert simple markdown-ish content to HTML paragraphs
  const formatContent = (content: string) => {
    return content
      .trim()
      .split('\n\n')
      .map((block, i) => {
        if (block.startsWith('## ')) {
          return <h2 key={i} className="font-fraunces text-2xl font-bold text-dark mt-10 mb-4">{block.replace('## ', '')}</h2>;
        }
        if (block.startsWith('**') && block.endsWith('**')) {
          return <p key={i} className="font-bold text-dark text-lg my-4">{block.replace(/\*\*/g, '')}</p>;
        }
        if (block.startsWith('---')) {
          return <hr key={i} className="border-cream-darker my-8" />;
        }
        if (block.startsWith('*') && block.endsWith('*')) {
          return <p key={i} className="font-caveat text-xl text-secondary italic my-4">{block.replace(/\*/g, '')}</p>;
        }
        return <p key={i} className="text-dark text-lg leading-relaxed mb-4">{block}</p>;
      });
  };

  return (
    <div className="pt-16 min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-secondary py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-6xl mb-4">{post.emoji}</div>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-white/20 text-white font-semibold text-sm px-3 py-1 rounded-full">{post.category}</span>
            <span className="text-white/60 text-sm">{post.publishedAt}</span>
            <span className="text-white/60 text-sm">· {post.readTime}</span>
          </div>
          <h1 className="font-fraunces text-3xl md:text-5xl font-bold text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <p className="font-caveat text-2xl text-secondary italic mb-8 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="space-y-2">
          {formatContent(post.content)}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-primary rounded-3xl p-8 text-center text-white">
          <div className="text-4xl mb-3">🎁</div>
          <h3 className="font-fraunces text-2xl font-bold mb-3">Relive the memory →</h3>
          <p className="text-white/80 mb-6">The products from this article are available on ChildhoodWish. Curated with care, shipped with a handwritten note.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-cream transition-colors">
            Shop now
          </Link>
        </div>

        {/* Back to blog */}
        <div className="mt-8 text-center">
          <Link href="/blog" className="text-primary hover:underline font-medium">
            ← Back to all articles
          </Link>
        </div>
      </div>
    </div>
  );
}
