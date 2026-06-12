import { getAllProducts } from '@/data/products';

export interface IncomingCartItem {
  product: { id: string };
  quantity: number;
  giftWrapping?: boolean;
}

export interface PricedLine {
  id: string;
  name: string;
  price: number;
  quantity: number;
  giftWrapping: boolean;
}

export interface PricedOrder {
  lines: PricedLine[];
  subtotal: number;
  shipping: number;
  total: number;
}

const GIFT_WRAP_PRICE = 49;
const FREE_SHIPPING_THRESHOLD = 799;
const SHIPPING_FEE = 79;

// Prices are always resolved from the catalog on the server — the client's
// cart only tells us *what* was ordered, never what it costs.
export async function priceOrder(
  items: IncomingCartItem[]
): Promise<PricedOrder | null> {
  if (!Array.isArray(items) || items.length === 0 || items.length > 20) {
    return null;
  }

  const catalog = await getAllProducts();
  const lines: PricedLine[] = [];
  let subtotal = 0;

  for (const item of items) {
    const qty = Math.floor(Number(item.quantity));
    const product = catalog.find((p) => p.id === item.product?.id);
    if (!product || !product.inStock || !Number.isFinite(qty) || qty < 1 || qty > 10) {
      return null;
    }
    const wrap = item.giftWrapping ? GIFT_WRAP_PRICE : 0;
    subtotal += (product.price + wrap) * qty;
    lines.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: qty,
      giftWrapping: !!item.giftWrapping,
    });
  }

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  return { lines, subtotal, shipping, total: subtotal + shipping };
}
