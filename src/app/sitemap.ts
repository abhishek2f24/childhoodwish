import { MetadataRoute } from 'next';
import { getAllProducts } from '@/data/products';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://childhoodwish.in';
  const products = await getAllProducts();

  // Dynamic product URLs
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Static routes
  const routes = ['', '/shop', '/gift-boxes', '/find-a-gift', '/memory-wall', '/blog', '/about'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.9,
  }));

  return [...routes, ...productUrls];
}
