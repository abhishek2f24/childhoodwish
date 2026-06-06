import { notFound } from 'next/navigation';
import { getAllProducts, getProductBySlug, getRelatedProducts } from '@/data/products';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductCard } from '@/components/shop/ProductCard';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products
    .filter((p) => !p.isGiftBox)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.memoryHook,
    alternates: {
      canonical: `/product/${slug}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product || product.isGiftBox) notFound();

  const related = await getRelatedProducts(product, 4);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [`https://childhoodwish.in${product.images[0]}`],
    description: product.description,
    sku: product.id,
    offers: {
      '@type': 'Offer',
      url: `https://childhoodwish.in/product/${product.slug}`,
      priceCurrency: 'INR',
      price: product.price,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'ChildhoodWish',
      },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://childhoodwish.in' },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://childhoodwish.in/shop' },
      { '@type': 'ListItem', position: 3, name: product.name, item: `https://childhoodwish.in/product/${product.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="pt-16 min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted mb-8 flex items-center gap-2">
          <span>/</span>
          <span className="text-dark font-medium">{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-cream to-cream-dark rounded-3xl flex items-center justify-center shadow-card">
              <span className="text-9xl">
                {product.category === 'toys-games' && '🎮'}
                {product.category === 'nostalgic-stationery' && '📚'}
                {product.category === 'sports' && '🏏'}
                {product.category === 'gift-boxes' && '🎁'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-cream-dark rounded-xl flex items-center justify-center opacity-50">
                  <span className="text-3xl">
                    {product.category === 'toys-games' && '🎮'}
                    {product.category === 'nostalgic-stationery' && '📚'}
                    {product.category === 'sports' && '🏏'}
                    {product.category === 'gift-boxes' && '🎁'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <ProductInfo product={product} />
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-fraunces text-3xl font-bold text-dark mb-8">You might also want</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
