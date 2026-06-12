import { Product } from '@/types';
import { supabase } from '@/lib/supabase';
import { fallbackProducts } from './fallbackProducts';

// Fetch all products from Supabase with ISR tagging.
// If the DB is unreachable or the table is empty (it was found wiped once),
// serve the bundled catalog so the storefront never goes blank.
export async function getAllProducts(): Promise<Product[]> {
  let res: Response;
  try {
    res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/products?select=*`, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''}`,
      },
      next: { tags: ['products'] }, // On-demand revalidation tag
    });
  } catch (err) {
    console.error('Products fetch failed, using bundled catalog:', err);
    return fallbackProducts;
  }

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Failed to fetch products from Supabase, using bundled catalog:', res.status, errorText);
    return fallbackProducts;
  }

  const data = await res.json();

  if (!Array.isArray(data) || data.length === 0) {
    return fallbackProducts;
  }

  // Map snake_case DB columns back to camelCase frontend types
  return (data || []).map((p: any) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    price: p.price,
    originalPrice: p.original_price,
    description: p.description,
    memoryHook: p.memory_hook,
    images: p.images || [],
    inStock: p.in_stock,
    tags: p.tags || [],
    occasions: p.occasions || [],
    isGiftBox: p.is_gift_box,
    giftBoxContents: p.gift_box_contents,
    featured: p.featured,
    memoryWallCount: p.memory_wall_count,
  })) as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.featured);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.category === category);
}

export async function getProductsByTag(tag: string): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.tags.includes(tag as any));
}

export async function getProductsByOccasion(occasion: string): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.occasions.includes(occasion as any));
}

export async function getGiftBoxes(): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.isGiftBox);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const products = await getAllProducts();
  return products
    .filter((p) => p.id !== product.id && (
      p.category === product.category ||
      p.tags.some((t) => product.tags.includes(t))
    ))
    .slice(0, limit);
}
