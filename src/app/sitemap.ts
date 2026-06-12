import { MetadataRoute } from 'next';
import { getAllProducts } from '@/data/products';
import { SITE_URL } from '@/lib/site';

const OCCASIONS = ['brother', 'husband', 'best-friend', '90s-kid', 'yourself'];

const BLOG_SLUGS = [
  '15-toys-90s-kids-wanted',
  'best-nostalgia-gifts-india',
  'guide-to-meaningful-gifting',
  'middle-class-childhood-dreams',
  'rc-helicopter-obsession',
];

const SEO_LANDING_PAGES = [
  '/childhood-toys-we-always-wanted',
  '/gifts-for-90s-kids',
  '/gifts-for-husband-who-has-everything',
  '/nostalgia-gifts-india',
  '/self-gifting-ideas',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();

  const productUrls = products.map((product) => ({
    url: product.isGiftBox
      ? `${SITE_URL}/gift-boxes/${product.slug}`
      : `${SITE_URL}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const routes = ['', '/shop', '/gift-boxes', '/find-a-gift', '/memory-wall', '/blog', '/about', '/contact'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.9,
  }));

  const landingUrls = SEO_LANDING_PAGES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const occasionUrls = OCCASIONS.map((occasion) => ({
    url: `${SITE_URL}/for/${occasion}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogUrls = BLOG_SLUGS.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...landingUrls, ...occasionUrls, ...blogUrls, ...productUrls];
}
