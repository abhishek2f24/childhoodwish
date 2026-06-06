import { notFound } from 'next/navigation';
import { getGiftBoxes, getProductBySlug } from '@/data/products';
import { ProductInfo } from '@/components/product/ProductInfo';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const boxes = await getGiftBoxes();
  return boxes.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.memoryHook,
  };
}

export default async function GiftBoxDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product || !product.isGiftBox) notFound();

  return (
    <div className="pt-16 min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <nav className="text-sm text-muted mb-8 flex items-center gap-2">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <span>/</span>
          <a href="/gift-boxes" className="hover:text-primary transition-colors">Gift Boxes</a>
          <span>/</span>
          <span className="text-dark font-medium">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Visual */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-cream to-cream-dark rounded-3xl flex items-center justify-center shadow-card">
              <div className="text-center">
                <div className="text-8xl mb-4">
                  {product.slug === 'the-90s-kid-box' ? '🚁' : product.slug === 'the-dreamer-box' ? '🚗' : '✨'}
                </div>
                <div className="font-fraunces text-2xl text-dark font-bold">{product.name}</div>
                <div className="text-muted text-sm mt-1">{product.giftBoxContents?.length} items inside</div>
              </div>
            </div>
            {/* What's inside preview */}
            {product.giftBoxContents && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="font-semibold text-dark mb-3">What's inside 📦</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.giftBoxContents.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-dark bg-cream rounded-lg p-2">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  );
}
