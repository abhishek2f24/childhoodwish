import { Resend } from 'resend';
import { CartItem } from '@/types';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || 're_placeholder');
}

export async function sendOrderConfirmationEmail(
  to: string,
  orderId: string,
  items: CartItem[] | any[],
  total: number,
  customerName: string,
  shippingAddress?: string,
  estimatedDelivery?: string
) {
  const itemsHtml = items
    .map(
      (item) =>
        `<tr>
          <td style="padding: 8px; border-bottom: 1px solid #f0ebe3;">${item.name || item.product?.name}</td>
          <td style="padding: 8px; border-bottom: 1px solid #f0ebe3; text-align:center;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #f0ebe3; text-align:right;">₹${(item.price || item.product?.price * item.quantity).toLocaleString('en-IN')}</td>
        </tr>`
    )
    .join('');

  await getResend().emails.send({
    from: process.env.FROM_EMAIL || 'orders@childhoodwish.in',
    to,
    subject: `Your ChildhoodWish Order is Confirmed 🎉 #${orderId}`,
    html: `
      <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; background: #FDF8F2; border-radius: 12px; overflow: hidden;">
        <div style="background: #E8532A; padding: 32px; text-align: center;">
          <h1 style="color: white; font-size: 28px; margin: 0;">ChildhoodWish ✨</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Your childhood wish is on its way!</p>
        </div>
        <div style="padding: 32px;">
          <h2 style="color: #1A1A2E; font-size: 20px;">Hi ${customerName},</h2>
          <p style="color: #4B5563; line-height: 1.6;">
            We've received your order and we're carefully packing it with love and a handwritten note — just as we promised. 🎁
          </p>
          
          <div style="background: white; border-radius: 8px; padding: 24px; margin: 24px 0;">
            <h3 style="color: #1A1A2E; margin: 0 0 16px;">Order #${orderId}</h3>
            
            ${estimatedDelivery ? `<p style="color: #E8532A; font-weight: bold; margin-bottom: 16px;">Estimated Delivery: ${estimatedDelivery}</p>` : ''}
            
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f9f5f0;">
                  <th style="padding: 8px; text-align: left; color: #6B7280;">Item</th>
                  <th style="padding: 8px; text-align: center; color: #6B7280;">Qty</th>
                  <th style="padding: 8px; text-align: right; color: #6B7280;">Price</th>
                </tr>
              </thead>
              <tbody>${itemsHtml}</tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding: 12px 8px; font-weight: bold; color: #1A1A2E;">Total</td>
                  <td style="padding: 12px 8px; font-weight: bold; color: #E8532A; text-align: right;">₹${total.toLocaleString('en-IN')}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          ${shippingAddress ? `
          <div style="background: #f9f5f0; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <h3 style="color: #1A1A2E; margin: 0 0 8px; font-size: 16px;">Shipping Address</h3>
            <p style="color: #4B5563; margin: 0; line-height: 1.5; white-space: pre-wrap;">${shippingAddress}</p>
          </div>
          ` : ''}

          <div style="background: #2D4A7A; border-radius: 8px; padding: 24px; color: white; margin: 24px 0;">
            <p style="font-style: italic; font-size: 16px; margin: 0 0 8px;">"I hope this brings back a memory worth keeping."</p>
            <p style="margin: 0; opacity: 0.8;">— Abhishek, ChildhoodWish.in</p>
          </div>
          <p style="color: #6B7280;">Expected delivery: 3–7 business days. You'll receive a tracking link via SMS once dispatched.</p>
          <p style="color: #6B7280;">Questions? Reply to this email or WhatsApp us: <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}" style="color: #E8532A;">Chat on WhatsApp</a></p>
        </div>
        <div style="background: #f9f5f0; padding: 16px; text-align: center;">
          <p style="color: #9CA3AF; font-size: 12px; margin: 0;">ChildhoodWish.in • Because some wishes never expire</p>
        </div>
      </div>
    `,
  });
}

export async function sendAdminNotificationEmail(
  orderId: string,
  total: number,
  customerName: string,
  items: any[],
  customerEmail?: string,
  customerPhone?: string,
  shippingAddress?: string
) {
  const itemsList = items.map(item => `<li>${item.quantity}x ${item.name || item.product?.name}</li>`).join('');

  await getResend().emails.send({
    from: process.env.FROM_EMAIL || 'orders@childhoodwish.in',
    to: process.env.ADMIN_EMAIL || 'abhishek2f24@gmail.com',
    subject: `🛍️ New Order #${orderId} — ₹${total.toLocaleString('en-IN')}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2>New Order: ${orderId}</h2>
        <p><strong>Customer:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail || 'N/A'}</p>
        <p><strong>Phone:</strong> ${customerPhone || 'N/A'}</p>
        <p><strong>Total:</strong> ₹${total.toLocaleString('en-IN')}</p>
        
        <h3>Items:</h3>
        <ul>${itemsList}</ul>
        
        <h3>Shipping Address:</h3>
        <p style="white-space: pre-wrap;">${shippingAddress || 'N/A'}</p>
      </div>
    `,
  });
}

export async function sendWaitlistWelcomeEmail(to: string, wish?: string) {
  await getResend().emails.send({
    from: process.env.FROM_EMAIL || 'orders@childhoodwish.in',
    to,
    subject: 'You\'re on the ChildhoodWish waitlist 🎁',
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 32px; background: #FDF8F2;">
        <h1 style="color: #E8532A;">ChildhoodWish</h1>
        <p>You're on the list! 🎉</p>
        ${wish ? `<p>We noted your wish: <em>"${wish}"</em></p><p>If this becomes a product, you'll be the first to know.</p>` : ''}
        <p>We'll email you once — when we launch. No spam, ever.</p>
        <p style="color: #6B7280; font-size: 12px;">— Abhishek, ChildhoodWish.in</p>
      </div>
    `,
  });
}

export async function sendAbandonedCartEmail(
  to: string,
  cartItems: CartItem[],
  total: number
) {
  const itemNames = cartItems.map((i) => i.product.name).join(', ');
  await getResend().emails.send({
    from: process.env.FROM_EMAIL || 'orders@childhoodwish.in',
    to,
    subject: 'Your childhood wish is waiting 👀',
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 32px; background: #FDF8F2;">
        <h1 style="color: #E8532A;">ChildhoodWish</h1>
        <p>You left something behind...</p>
        <p><strong>${itemNames}</strong> — worth ₹${total.toLocaleString('en-IN')} — is sitting in your cart, waiting to finally come home.</p>
        <a href="https://childhoodwish.in/cart" style="display: inline-block; background: #E8532A; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 16px;">Complete Your Order →</a>
        <p style="color: #6B7280; font-size: 12px; margin-top: 24px;">You're receiving this because you started checkout on ChildhoodWish.in.</p>
      </div>
    `,
  });
}
