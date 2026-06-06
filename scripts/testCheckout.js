const crypto = require('crypto');

async function testCheckout() {
  console.log('🛒 Starting Razorpay Checkout Test...');

  // 1. Create Order
  console.log('\n1. Requesting Order Creation (/api/orders/create)...');
  const createRes = await fetch('http://localhost:3000/api/orders/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: 100, // ₹1
      customer: { name: 'Test User', email: 'test@example.com' },
      items: [{ id: '1', name: 'Test Toy', price: 100, quantity: 1 }]
    })
  });
  
  const createData = await createRes.json();
  console.log('Create Order Response:', createData);
  
  if (!createData.orderId) {
    console.error('Failed to get orderId');
    return;
  }

  // 2. Simulate Razorpay Success & Signature Generation
  const razorpay_order_id = createData.orderId;
  const razorpay_payment_id = 'pay_mock_' + Date.now();
  const secret = 'your_razorpay_secret_here'; // Must match .env
  
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  console.log(`\n2. Generated Mock Signature: ${expectedSignature}`);

  // 3. Verify Order
  console.log('\n3. Verifying Order (/api/orders/verify)...');
  const verifyRes = await fetch('http://localhost:3000/api/orders/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature: expectedSignature,
      customer: { name: 'Test User', email: 'test@example.com', phone: '9999999999' },
      items: [{ id: '1', name: 'Test Toy', price: 100, quantity: 1 }],
      total: 100
    })
  });

  const verifyData = await verifyRes.json();
  console.log('Verify Order Response:', verifyData);

  if (verifyData.success) {
    console.log('\n✅ CHECKOUT TEST SUCCESSFUL! Order safely inserted into Supabase.');
  } else {
    console.error('\n❌ CHECKOUT TEST FAILED!', verifyData);
  }
}

testCheckout();
