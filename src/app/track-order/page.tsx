'use client';

import { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin, Search } from 'lucide-react';
import type { OrderStatus } from '@/types/order';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Mock order state for demonstration
  const [order, setOrder] = useState<any>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (orderId.trim() === '' || email.trim() === '') {
      setError('Please enter both Order ID and Email.');
      setLoading(false);
      return;
    }

    try {
      // Strip out 'CW' or 'CW-' prefix if user typed it, since our DB ID might or might not have it depending on format
      // Our API ID generation used `CW${Date.now()}`, so let's allow what they typed and let API handle it
      let searchId = orderId.trim();
      if (!searchId.toUpperCase().startsWith('CW')) {
        searchId = `CW${searchId}`;
      }

      const res = await fetch(`/api/orders/${searchId}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Order not found. Please check your Order ID.');
        setOrder(null);
      } else {
        // Verify email matches to protect order privacy
        if (data.order.customerEmail.toLowerCase() !== email.trim().toLowerCase()) {
          setError('Order not found or email does not match.');
          setOrder(null);
        } else {
          // Format date for estimated delivery
          const orderDate = new Date(data.order.date);
          orderDate.setDate(orderDate.getDate() + 5);
          const estimatedDelivery = orderDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });

          setOrder({
            id: data.order.id,
            orderId: data.order.id,
            status: data.order.status as OrderStatus,
            estimatedDelivery,
            trackingLink: null, // Add actual tracking links later if integrated with Delhivery/Bluedart
            items: data.order.items,
          });
        }
      }
    } catch (err) {
      setError('Failed to fetch order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 'pending', label: 'Order Placed', icon: Clock },
    { id: 'processing', label: 'Processing', icon: Package },
    { id: 'shipped', label: 'Shipped', icon: Truck },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle },
  ];

  const getStepIndex = (status: OrderStatus) => {
    if (status === 'cancelled') return -1;
    if (status === 'paid') return 0;
    return steps.findIndex(s => s.id === status);
  };

  return (
    <div className="pt-16 min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-dark mb-4">Track Your Order</h1>
          <p className="text-muted text-lg">Enter your Order ID and Email to see your delivery status.</p>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-card border border-cream-darker mb-12">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="track-order-id" className="block text-sm font-semibold text-dark mb-1.5">Order ID</label>
              <input
                id="track-order-id"
                type="text"
                placeholder="e.g. CW-1024"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-cream-darker rounded-xl focus:outline-none focus:border-primary transition-colors text-dark bg-cream"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="track-email" className="block text-sm font-semibold text-dark mb-1.5">Email Address</label>
              <input
                id="track-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-cream-darker rounded-xl focus:outline-none focus:border-primary transition-colors text-dark bg-cream"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full md:w-auto h-[52px] px-8 flex items-center justify-center gap-2"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Search className="w-5 h-5" /> Track</>}
              </button>
            </div>
          </form>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}
        </div>

        {order && (
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-card border border-cream-darker animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-cream-darker pb-6 mb-8 gap-4">
              <div>
                <h2 className="font-fraunces text-2xl font-bold text-dark">Order {order.orderId}</h2>
                <p className="text-muted text-sm mt-1">Arriving: <span className="font-semibold text-dark">{order.estimatedDelivery}</span></p>
              </div>
              {order.trackingLink && (
                <a 
                  href={order.trackingLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-outline py-2 px-4 text-sm"
                >
                  View Courier Tracking
                </a>
              )}
            </div>

            {/* Tracking Progress Bar */}
            <div className="relative mb-12">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-cream-darker -translate-y-1/2 z-0" />
              
              <div 
                className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-1000 ease-out"
                style={{ width: `${Math.max(0, (getStepIndex(order.status) / (steps.length - 1)) * 100)}%` }}
              />

              <div className="relative z-10 flex justify-between">
                {steps.map((step, index) => {
                  const currentIndex = getStepIndex(order.status);
                  const isCompleted = index <= currentIndex;
                  const isCurrent = index === currentIndex;
                  const Icon = step.icon;

                  return (
                    <div key={step.id} className="flex flex-col items-center">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white transition-colors duration-500 ${
                          isCompleted ? 'bg-primary text-white shadow-[0_0_15px_rgba(232,83,42,0.4)]' : 'bg-cream-dark text-muted'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-xs sm:text-sm font-semibold mt-3 absolute top-12 text-center w-24 -ml-12 ${
                        isCurrent ? 'text-primary' : isCompleted ? 'text-dark' : 'text-muted'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Items Summary */}
            <div className="mt-20">
              <h3 className="font-bold text-dark mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item: any, i: number) => (
                  <div key={i} className="flex items-center justify-between bg-cream rounded-xl p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-cream-dark rounded-lg flex items-center justify-center text-xl">
                        🎁
                      </div>
                      <div>
                        <div className="font-medium text-dark">{item.name}</div>
                        <div className="text-sm text-muted">Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="font-bold text-dark">
                      ₹{item.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
