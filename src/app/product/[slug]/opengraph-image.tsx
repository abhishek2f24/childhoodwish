import { ImageResponse } from 'next/og';
import { getProductBySlug } from '@/data/products';

export const runtime = 'edge';

// Image metadata
export const alt = 'Product Image';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: '#FDF8F2',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1A1A2E',
            fontFamily: 'sans-serif',
          }}
        >
          ChildhoodWish
        </div>
      ),
      {
        ...size,
      }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: '#FDF8F2',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 80,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 100,
              marginBottom: 40,
            }}
          >
            {product.category === 'toys-games' ? '🎮' : 
             product.category === 'nostalgic-stationery' ? '📚' : 
             product.category === 'sports' ? '🏏' : '🎁'}
          </div>
          
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: '#1A1A2E',
              fontFamily: 'sans-serif',
              marginBottom: 24,
              lineHeight: 1.2,
            }}
          >
            {product.name}
          </div>
          
          <div
            style={{
              fontSize: 48,
              fontWeight: 600,
              color: '#E8532A',
              marginBottom: 40,
            }}
          >
            ₹{product.price.toLocaleString('en-IN')}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(45, 74, 122, 0.1)',
              padding: '16px 32px',
              borderRadius: 40,
              fontSize: 32,
              color: '#2D4A7A',
              fontStyle: 'italic',
            }}
          >
            {product.memoryHook}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 32,
            color: '#6B7280',
            fontWeight: 500,
          }}
        >
          childhoodwish.in
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
