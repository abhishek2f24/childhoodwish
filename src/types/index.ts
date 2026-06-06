export type MemoryTag =
  | 'school-days'
  | 'colony-games'
  | '90s-kid'
  | '80s-kid'
  | 'cricket'
  | 'summer-vacation'
  | 'retro'
  | 'stationery'
  | 'monsoon'
  | 'birthday';

export type Occasion =
  | 'brother'
  | 'husband'
  | 'best-friend'
  | '90s-kid'
  | 'yourself'
  | 'birthday';

export type ProductCategory =
  | 'toys-games'
  | 'nostalgic-stationery'
  | 'sports'
  | 'gift-boxes';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  memoryHook: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  inStock: boolean;
  tags: MemoryTag[];
  occasions: Occasion[];
  isGiftBox: boolean;
  giftBoxContents?: string[];
  featured: boolean;
  memoryWallCount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  giftWrapping?: boolean;
  personalNote?: string;
}

export interface MemorySubmission {
  id: string;
  wish: string;
  decade?: '80s' | '90s' | '2000s';
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  ip?: string;
}

export interface QuizAnswers {
  recipient: string;
  decade: string;
  interests: string[];
  budget: string;
  occasion: string;
}

export interface Order {
  id: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  createdAt: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
    state: string;
  };
  personalNote?: string;
  memoryNote?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  content: string;
  keyword: string;
}

export interface OccasionPage {
  slug: string;
  title: string;
  hero: string;
  subtext: string;
  productIds: string[];
}
