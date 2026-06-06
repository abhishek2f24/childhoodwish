'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingCart, Check, Package, Shield } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, 1, giftWrapping);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const totalPrice = product.price * quantity + (giftWrapping ? 49 : 0);

  return (
    <div className="space-y-6">
      {/* Category */}
      <div className="text-xs font-semibold text-primary uppercase tracking-widest">
        {product.category.replace(/-/g, ' ')}
      </div>

      {/* Name */}
      <h1 className="font-fraunces text-3xl md:text-4xl font-bold text-dark leading-tight">
        {product.name}
      </h1>

      {/* Memory Hook */}
      <div className="bg-secondary/5 border-l-4 border-secondary rounded-r-xl p-4">
        <p className="font-caveat text-xl text-secondary italic leading-relaxed">
          {product.memoryHook}
        </p>
      </div>

      {/* Memory Wall Count */}
      {product.memoryWallCount && product.memoryWallCount > 0 ? (
        <div className="flex items-center gap-2 text-sm text-muted">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span>
            <strong className="text-dark">{product.memoryWallCount.toLocaleString()} people</strong> on our memory wall asked for something like this.{' '}
            <Link href="/memory-wall" className="text-primary hover:underline">See the wall →</Link>
          </span>
        </div>
      ) : null}

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="font-bold text-4xl text-dark">{formatPrice(product.price)}</span>
        {product.originalPrice && (
          <>
            <span className="text-xl text-muted line-through">{formatPrice(product.originalPrice)}</span>
            <span className="bg-primary/10 text-primary font-semibold text-sm px-2 py-1 rounded-full">
              Save {formatPrice(product.originalPrice - product.price)}
            </span>
          </>
        )}
      </div>

      {/* Free Shipping Note */}
      {product.price >= 799 ? (
        <div className="text-xs text-green-600 font-medium flex items-center gap-1">
          <Package className="w-3.5 h-3.5" />
          Free shipping on this order
        </div>
      ) : (
        <div className="text-xs text-muted flex items-center gap-1">
          <Package className="w-3.5 h-3.5" />
          Add ₹{(799 - product.price).toLocaleString('en-IN')} more for free shipping
        </div>
      )}

      {/* Quantity */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-semibold text-dark">Quantity</label>
        <div className="flex items-center border-2 border-cream-darker rounded-xl overflow-hidden">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            id="product-qty-decrease"
            className="w-10 h-10 flex items-center justify-center hover:bg-cream-dark transition-colors font-bold text-lg"
          >
            −
          </button>
          <span className="w-12 text-center font-bold">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            id="product-qty-increase"
            className="w-10 h-10 flex items-center justify-center hover:bg-cream-dark transition-colors font-bold text-lg"
          >
            +
          </button>
        </div>
      </div>

      {/* Gift Wrapping Add-on */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          id="gift-wrapping-checkbox"
          checked={giftWrapping}
          onChange={(e) => setGiftWrapping(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-primary rounded"
        />
        <div>
          <span className="font-semibold text-dark group-hover:text-primary transition-colors">
            Add gift wrapping (+₹49)
          </span>
          <p className="text-xs text-muted mt-0.5">Kraft gift box, tissue paper, sealed with our sticker</p>
        </div>
      </label>

      {/* Handwritten Note */}
      <div className="bg-accent/10 rounded-xl p-3 flex items-center gap-3">
        <span className="text-2xl">✍️</span>
        <div>
          <p className="font-semibold text-dark text-sm">Every order includes a personal note</p>
          <p className="text-xs text-muted">A handwritten message from Abhishek, just for you</p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAddToCart}
          id="product-add-to-cart"
          disabled={!product.inStock}
          className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base transition-all duration-200 ${
            added
              ? 'bg-green-500 text-white'
              : product.inStock
              ? 'bg-primary text-white hover:bg-primary-dark shadow-warm hover:shadow-lg hover:-translate-y-0.5'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {added ? (
            <><Check className="w-5 h-5" /> Added to Cart!</>
          ) : (
            <><ShoppingCart className="w-5 h-5" /> Add to Cart — {formatPrice(totalPrice)}</>
          )}
        </button>

        <Link
          href="/checkout"
          id="product-buy-now"
          onClick={() => addItem(product, quantity, giftWrapping)}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base bg-secondary text-white hover:bg-secondary-dark hover:-translate-y-0.5 transition-all duration-200"
        >
          Buy Now <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Trust Signals */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: '🔒', text: 'Secure payment' },
          { icon: '📦', text: '3–7 day delivery' },
          { icon: '↩️', text: '7-day returns' },
        ].map((item) => (
          <div key={item.text} className="flex flex-col items-center text-center p-3 bg-cream rounded-xl">
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs font-medium text-muted">{item.text}</span>
          </div>
        ))}
      </div>

      {/* Product Details Accordion */}
      {product.giftBoxContents && (
        <div className="border border-cream-darker rounded-xl overflow-hidden">
          <div className="bg-cream-dark px-4 py-3">
            <h3 className="font-semibold text-dark">What's in the box?</h3>
          </div>
          <ul className="divide-y divide-cream-darker">
            {product.giftBoxContents.map((item) => (
              <li key={item} className="px-4 py-3 text-sm text-dark flex items-center gap-2">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="border border-cream-darker rounded-xl p-4">
        <h3 className="font-semibold text-dark mb-2">About this product</h3>
        <p className="text-sm text-muted leading-relaxed">{product.description}</p>
      </div>
    </div>
  );
}
