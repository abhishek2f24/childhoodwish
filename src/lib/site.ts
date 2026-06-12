// Single source of truth for site-wide config.
// The live site serves from the www host (apex 301s to www), so every
// canonical/OG/sitemap URL must use www to keep search signals consistent.
export const SITE_URL = 'https://www.childhoodwish.in';

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919506212886';

// Vercel env vars may hold copy-paste placeholders (e.g. G-XXXX..., rzp_test_XXXX...).
// Treat any value with a run of X's as unset so the site never ships a dead integration.
const PLACEHOLDER = /X{4,}/;

export function resolveGaId(): string {
  const envId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return envId && !PLACEHOLDER.test(envId) ? envId : 'G-VTF35ZVZME';
}

export function isOnlinePaymentConfigured(): boolean {
  const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  return !!key && key.startsWith('rzp_') && !PLACEHOLDER.test(key);
}
