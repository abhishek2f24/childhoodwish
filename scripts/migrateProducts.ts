// scripts/migrateProducts.ts
import { createClient } from '@supabase/supabase-js';
import { products } from './extracted_products.ts';
import * as dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Service Role Key in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log('Starting migration to Supabase...');

  for (const product of products) {
    const { id, ...productData } = product;
    
    // Map data to match snake_case DB schema where required
    const payload = {
      id: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category,
      price: product.price,
      original_price: product.originalPrice || null,
      description: product.description,
      memory_hook: product.memoryHook,
      images: product.images,
      in_stock: product.inStock,
      tags: product.tags,
      occasions: product.occasions,
      is_gift_box: product.isGiftBox,
      gift_box_contents: product.giftBoxContents || [],
      featured: product.featured || false,
      memory_wall_count: product.memoryWallCount || 0,
    };

    const { data, error } = await supabase
      .from('products')
      .upsert(payload)
      .select();

    if (error) {
      console.error(`Failed to insert product: ${product.name}`, error);
    } else {
      console.log(`✅ Migrated: ${product.name}`);
    }
  }

  console.log('Migration complete!');
}

migrate();
