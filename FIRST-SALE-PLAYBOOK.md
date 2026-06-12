# ChildhoodWish — First Sale Playbook

Goal: **one paid COD order within 48 hours.** The site can now take orders without Razorpay (COD + WhatsApp), so the only missing ingredient is putting the product in front of ~50 right-fit people.

---

## Step 0 — 15 minutes of setup (do once, in order)

1. **Merge the PR** (`sale-readiness` branch) — until then production still has the dead checkout:
   https://github.com/abhishek2f24/childhoodwish/pull/new/sale-readiness
2. **Re-seed the catalog** (products table is empty; fallback covers the site, but DB should match):
   ```
   npx tsx scripts/migrateProducts.ts
   ```
3. **Vercel → Settings → Environment Variables** (then redeploy):
   - `ADMIN_SECRET` → a strong random string → your order dashboard becomes `https://www.childhoodwish.in/admin/orders?key=<secret>`
   - `RESEND_API_KEY` → real key from resend.com (free tier is fine) → order emails start working
   - Fix `NEXT_PUBLIC_GA_MEASUREMENT_ID` → `G-VTF35ZVZME` (or delete the placeholder var — code now falls back correctly either way)
4. **Place one ₹93–₹190 test COD order yourself** end-to-end on your phone. Check it appears in `/admin/orders`. This is your dress rehearsal — you'll see exactly what your customer sees.
5. **Ping search engines**: `node scripts/indexnow-ping.mjs` (instant Bing/Yandex). For Google: Search Console → add property `www.childhoodwish.in` → submit `sitemap.xml`.

---

## Why your first sale will NOT come from SEO

The domain is 6 days old. Google takes weeks–months to rank a new domain for "nostalgia gifts india". SEO is your month-2 channel. Your first 10 sales come from **direct, personal distribution** — and your product is unusually good for this because everyone aged 25–40 has an unfulfilled childhood wish to talk about.

## The one offer that converts cold audiences

> **"First 20 orders: I write your memory note by hand and ship free — COD, pay only when it arrives."**

COD removes 100% of the trust barrier (new site, unknown brand). The handwritten note is your differentiator. Scarcity ("first 20") gives a reason to act now.

---

## Channel 1 — Your WhatsApp (Day 1, highest conversion)

Send to 30 friends/ex-colleagues/cousins aged 25–40. **Personalise the first line per person.** Template:

> Arre [name], remember how every 90s kid wanted an RC helicopter / glass marbles / a real cricket kit and never got one? 😄
>
> I just launched something around exactly that — **ChildhoodWish.in** — nostalgic gifts for adults, each shipped with a handwritten note. RC helicopters, marble sets, vintage geometry boxes, gift boxes…
>
> It's brand new (you'd literally be among my first customers). **Cash on Delivery, free shipping above ₹799.** If anything there hits you in the feels, order it — and either way, tell me which product YOU wanted as a kid. Building my catalogue from those answers 🙏
>
> 👉 https://www.childhoodwish.in

Also: WhatsApp Status post (screenshot of the RC helicopter page + "my new thing, COD available"). Status converts shockingly well because it's passive.

**Expect: 30 messages → ~10 replies → 1–3 orders.**

## Channel 2 — Instagram Reels (Day 1–2, the brand-fit channel)

Nostalgia is THE highest-engagement content category in India. Post 1 reel/day:
- Format: product close-up + text overlay: *"POV: you're 8, holding ₹5, staring at the glass marbles you can't afford"* → cut to the product today → "It's not too late. ChildhoodWish.in"
- Audio: any trending 90s Bollywood remix.
- Hashtags: #90skids #90sindia #nostalgia #childhoodmemories #giftsforhim
- DM every commenter the link with a personal line.

## Channel 3 — Reddit & communities (Day 2)

- r/india, r/IndianTeenagers (older siblings), r/desis, city subs (r/vadodara, r/mumbai…): **don't post a link first.** Post: *"What's one thing you desperately wanted as a kid that your parents couldn't buy?"* — it's a guaranteed-engagement question. Reply to comments; mention the site only when people ask "where can I get one now?" or in a single follow-up comment.
- Same move in 2–3 WhatsApp/Facebook groups you're already in (college alumni, society group).

## Channel 4 — The Memory Wall flywheel (ongoing)

Every conversation from channels 1–3, ask: "add your wish to the Memory Wall" (childhoodwish.in/memory-wall). Real wishes now display on the site → social proof → screenshots become tomorrow's content.

---

## When an order lands

You'll get a WhatsApp message from the buyer (the confirmation page pushes them to send one) and the row appears in `/admin/orders?key=…`.

1. Reply within minutes, warmly. Confirm address + delivery estimate.
2. Ship via India Post / Delhivery / Shiprocket (COD-capable). For order #1–5, even hand-delivery in Vadodara is fine — it's a story.
3. The handwritten note goes IN the box. Take a photo of it before sealing.
4. After delivery: ask for a WhatsApp testimonial + a photo → post it → that's your next reel.
5. Prepaid alternative while Razorpay KYC is pending: send your **UPI QR in the WhatsApp chat** — many will pay upfront happily.

## Razorpay (parallel track, not a blocker anymore)

Complete KYC at dashboard.razorpay.com → get **live** keys → Vercel env: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID` → redeploy. The "Pay Online" option reappears automatically; nothing else to change.

---

## Scorecard (fill daily)

| Day | WhatsApp sent | Replies | Reels | Site visits (GA) | Orders |
|-----|---------------|---------|-------|------------------|--------|
| 1   |               |         |       |                  |        |
| 2   |               |         |       |                  |        |
