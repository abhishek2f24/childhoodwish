import { ShieldCheck, Truck, RefreshCw, Clock } from 'lucide-react';

export function TrustSignals() {
  const signals = [
    { icon: ShieldCheck, title: 'Secure Checkout', desc: '100% secure Razorpay payments' },
    { icon: Truck, title: 'Fast Shipping', desc: 'Dispatch within 24-48 hours' },
    { icon: RefreshCw, title: '7-Day Returns', desc: 'Hassle-free replacement policy' },
    { icon: Clock, title: 'Support', desc: 'Active WhatsApp & Email support' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-cream-darker">
      {signals.map((signal, i) => {
        const Icon = signal.icon;
        return (
          <div key={i} className="flex flex-col items-center text-center p-4 bg-cream rounded-2xl border border-cream-darker">
            <Icon className="w-6 h-6 text-primary mb-2" />
            <h4 className="font-bold text-dark text-sm mb-1">{signal.title}</h4>
            <p className="text-xs text-muted leading-tight">{signal.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
