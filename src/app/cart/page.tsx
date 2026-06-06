'use client';

import Link from 'next/link';
import { Trash2, Plus, Minus, Package, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, toggleGiftWrapping, getTotal } = useCartStore();
  const total = getTotal();
  const freeShipping = total >= 799;
  const shippingCost = freeShipping ? 0 : 79;

  if (items.length === 0) {
    return (
      <div className="pt-16 min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center py-20">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="font-fraunces text-3xl font-bold text-dark mb-3">Your cart is empty</h1>
          <p className="text-muted text-lg mb-8">Your childhood wish is out there. Let's find it.</p>
          <Link href="/shop" className="btn-primary">
            Browse all products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-fraunces text-4xl font-bold text-dark mb-8">Your Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="card p-5">
                <div className="flex gap-4">
                  {/* Product image */}
                  <div className="w-20 h-20 bg-gradient-to-br from-cream to-cream-dark rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">
                      {item.product.category === 'toys-games' ? '🎮' : item.product.category === 'gift-boxes' ? '🎁' : item.product.category === 'sports' ? '🏏' : '📚'}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-fraunces font-bold text-dark truncate">{item.product.name}</h3>
                    <p className="font-caveat text-secondary italic text-sm line-clamp-1 mt-0.5">{item.product.memoryHook}</p>

                    {/* Gift wrapping toggle */}
                    <label className="flex items-center gap-2 mt-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.giftWrapping || false}
                        onChange={() => toggleGiftWrapping(item.product.id)}
                        className="w-4 h-4 accent-primary rounded"
                      />
                      <span className="text-xs text-muted font-medium">Gift wrapping (+₹49)</span>
                    </label>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity */}
                      <div className="flex items-center border-2 border-cream-darker rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          id={`cart-qty-decrease-${item.product.id}`}
                          className="w-8 h-8 flex items-center justify-center hover:bg-cream-dark transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          id={`cart-qty-increase-${item.product.id}`}
                          className="w-8 h-8 flex items-center justify-center hover:bg-cream-dark transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="font-bold text-dark">
                          {formatPrice((item.product.price + (item.giftWrapping ? 49 : 0)) * item.quantity)}
                        </div>
                        <div className="text-xs text-muted">{formatPrice(item.product.price + (item.giftWrapping ? 49 : 0))} each</div>
                      </div>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    id={`cart-remove-${item.product.id}`}
                    className="text-muted hover:text-red-500 transition-colors p-1 flex-shrink-0"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Memory Note */}
                <div className="mt-4 pt-4 border-t border-cream-darker">
                  <label className="block text-xs font-semibold text-muted mb-1.5 uppercase tracking-wider">Add a memory note (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 'For my brother who always wanted this' — printed on the gift card"
                    className="w-full px-3 py-2 bg-cream border border-cream-darker rounded-lg text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="font-fraunces text-xl font-bold text-dark mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal ({items.length} item{items.length !== 1 ? 's' : ''})</span>
                  <span className="font-medium text-dark">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted flex items-center gap-1">
                    <Package className="w-3.5 h-3.5" /> Shipping
                  </span>
                  <span className={freeShipping ? 'text-green-600 font-medium' : 'font-medium text-dark'}>
                    {freeShipping ? 'FREE' : formatPrice(shippingCost)}
                  </span>
                </div>
                {!freeShipping && (
                  <div className="text-xs text-muted bg-cream rounded-lg p-2">
                    Add {formatPrice(799 - total)} more for free shipping
                  </div>
                )}
              </div>

              <div className="border-t border-cream-darker pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-bold text-dark">Total</span>
                  <span className="font-bold text-2xl text-dark">{formatPrice(total + shippingCost)}</span>
                </div>
              </div>

              <Link href="/checkout" id="cart-checkout-btn" className="btn-primary w-full justify-center text-base py-4">
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </Link>

              {/* Trust signals */}
              <div className="mt-4 space-y-2">
                {['🔒 Secure payment via Razorpay', '✍️ Handwritten note in every order', '↩️ 7-day easy returns'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-muted">
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
