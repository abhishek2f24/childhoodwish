import { createHash, timingSafeEqual } from 'crypto';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Orders (admin)',
  robots: { index: false, follow: false },
};

interface OrderRow {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address: { street?: string; city?: string; state?: string; pincode?: string } | null;
  personal_note: string | null;
  items: { name?: string; quantity?: number; price?: number }[] | null;
  total: number;
  status: string;
}

function secretMatches(provided: string | undefined, secret: string): boolean {
  if (!provided) return false;
  const a = createHash('sha256').update(provided).digest();
  const b = createHash('sha256').update(secret).digest();
  return timingSafeEqual(a, b);
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  const secret = process.env.ADMIN_SECRET;

  if (!secret || secret === 'change_this_to_a_strong_secret_key') {
    return (
      <div className="pt-24 min-h-screen bg-cream max-w-xl mx-auto px-4">
        <h1 className="font-fraunces text-2xl font-bold text-dark mb-3">Admin not configured</h1>
        <p className="text-muted">
          Set a strong <code>ADMIN_SECRET</code> environment variable in Vercel, redeploy, then open
          <code> /admin/orders?key=&lt;your secret&gt;</code>.
        </p>
      </div>
    );
  }

  if (!secretMatches(key, secret)) {
    return (
      <div className="pt-24 min-h-screen bg-cream max-w-xl mx-auto px-4">
        <h1 className="font-fraunces text-2xl font-bold text-dark">Unauthorized</h1>
      </div>
    );
  }

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    return (
      <div className="pt-24 min-h-screen bg-cream max-w-xl mx-auto px-4">
        <h1 className="font-fraunces text-2xl font-bold text-dark mb-3">Error loading orders</h1>
        <p className="text-muted">{error.message}</p>
      </div>
    );
  }

  const orders = (data || []) as OrderRow[];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="font-fraunces text-3xl font-bold text-dark mb-2">Orders</h1>
        <p className="text-muted mb-8">{orders.length} most recent orders (newest first)</p>

        {orders.length === 0 ? (
          <div className="card p-8 text-center text-muted">No orders yet.</div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="card p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <div className="font-bold text-dark">
                    #{o.id}
                    <span
                      className={`ml-3 text-xs font-semibold px-2 py-1 rounded-full ${
                        o.status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : o.status === 'cod_pending'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {o.status}
                    </span>
                  </div>
                  <div className="text-sm text-muted">
                    {new Date(o.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-dark font-medium">{o.customer_name}</div>
                    <div className="text-muted">{o.customer_email}</div>
                    {o.customer_phone && (
                      <a
                        className="text-primary font-medium"
                        href={`https://wa.me/91${o.customer_phone.replace(/\D/g, '').slice(-10)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WhatsApp: {o.customer_phone}
                      </a>
                    )}
                    {o.shipping_address && (
                      <div className="text-muted mt-1">
                        {[o.shipping_address.street, o.shipping_address.city, o.shipping_address.state, o.shipping_address.pincode]
                          .filter(Boolean)
                          .join(', ')}
                      </div>
                    )}
                  </div>
                  <div>
                    <ul className="text-muted">
                      {(o.items || []).map((it, i) => (
                        <li key={i}>
                          {it.quantity}× {it.name} {typeof it.price === 'number' ? `— ₹${it.price.toLocaleString('en-IN')}` : ''}
                        </li>
                      ))}
                    </ul>
                    <div className="font-bold text-dark mt-1">Total: ₹{o.total.toLocaleString('en-IN')}</div>
                    {o.personal_note && <div className="text-muted italic mt-1">Note: {o.personal_note}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
