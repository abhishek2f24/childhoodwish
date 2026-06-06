'use client';

import { useState } from 'react';
import { Mail, MessageCircle, MapPin, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setForm((f) => ({ ...f, error: '' })); // Clear previous errors
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      setSubmitted(true);
    } catch (err: any) {
      alert(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-cream">
      <div className="bg-secondary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-white mb-3">Contact Us</h1>
          <p className="text-white/70 text-lg">We're a small team and we actually read every message.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="font-fraunces text-2xl font-bold text-dark mb-6">Get in touch</h2>
            <div className="space-y-4">
              {[
                { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'hello@childhoodwish.in', href: 'mailto:hello@childhoodwish.in' },
                { icon: <MessageCircle className="w-5 h-5" />, label: 'WhatsApp', value: 'Chat with us', href: 'https://wa.me/919876543210' },
                { icon: <MapPin className="w-5 h-5" />, label: 'Location', value: 'Vadodara, Gujarat, India', href: null },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-muted font-medium">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="font-medium text-dark hover:text-primary transition-colors">{item.value}</a>
                    ) : (
                      <div className="font-medium text-dark">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-cream-dark rounded-2xl p-6">
              <p className="font-caveat text-xl text-secondary italic mb-2">
                "We respond within 24 hours, usually much faster."
              </p>
              <p className="text-sm text-muted">— Abhishek, Founder</p>
            </div>
          </div>

          {/* Form */}
          <div className="card p-6">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { id: 'name', label: 'Your Name', type: 'text', placeholder: 'Abhishek' },
                  { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
                  { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Order question / Gift help / Other' },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={`contact-${field.id}`} className="block text-sm font-semibold text-dark mb-1.5">{field.label}</label>
                    <input
                      id={`contact-${field.id}`}
                      type={field.type}
                      value={(form as any)[field.id]}
                      onChange={(e) => setForm((f) => ({ ...f, [field.id]: e.target.value }))}
                      placeholder={field.placeholder}
                      required
                      className="w-full px-4 py-3 border-2 border-cream-darker rounded-xl focus:outline-none focus:border-primary transition-colors text-dark bg-cream placeholder:text-muted"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-dark mb-1.5">Message</label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Tell us what's on your mind..."
                    rows={4}
                    required
                    className="w-full px-4 py-3 border-2 border-cream-darker rounded-xl focus:outline-none focus:border-primary transition-colors text-dark bg-cream resize-none placeholder:text-muted"
                  />
                </div>
                <button type="submit" id="contact-submit-btn" disabled={loading} className="btn-primary w-full justify-center py-4 disabled:opacity-50">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-fraunces text-2xl font-bold text-dark mb-2">Message received!</h3>
                <p className="text-muted">We'll get back to you within 24 hours.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16 border-t border-cream-darker">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-fraunces text-3xl font-bold text-dark mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "How long does shipping take?", a: "Most orders are shipped within 24-48 hours and arrive in 3-7 business days depending on your location in India." },
              { q: "Do you offer Cash on Delivery (COD)?", a: "Currently, we only accept prepaid orders via Razorpay (UPI, Cards, NetBanking) to ensure seamless, contactless deliveries and prevent return frauds on custom gift boxes." },
              { q: "Can I customize a gift box?", a: "Yes! Use our 'Build Your Wish Box' feature to select any 3-5 items from our store, and we'll package them together in our signature nostalgia box." },
              { q: "What is your return policy?", a: "We offer a 7-day return policy for damaged or defective items. Just send us a photo of the issue via email or WhatsApp and we'll arrange a replacement." }
            ].map((faq, i) => (
              <div key={i} className="bg-cream rounded-2xl p-6 shadow-sm border border-cream-darker">
                <h3 className="font-bold text-dark text-lg mb-2">{faq.q}</h3>
                <p className="text-muted">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
