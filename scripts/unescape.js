const fs = require('fs');
const content = fs.readFileSync('scripts/extracted_products.ts', 'utf8');
if (content.startsWith('"')) {
  fs.writeFileSync('scripts/extracted_products.ts', JSON.parse(content));
}
