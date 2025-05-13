import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { connectToDatabase } from '@/lib/mongodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, cognome, email, telefono, pacchetto, referrerId } = body;

    const { db } = await connectToDatabase();

    const existingUser = await db.collection('users').findOne({ email });

    let customerId;

    if (existingUser) {
      customerId = existingUser.stripeCustomerId;

      await db.collection('users').updateOne(
        { email },
        {
          $set: {
            nome,
            cognome,
            telefono,
            pacchetto
          }
        }
      );
    } else {
      const customer = await stripe.customers.create({
        email,
        name: `${nome} ${cognome}`,
        phone: telefono
      });
      customerId = customer.id;

      await db.collection('users').insertOne({
        stripeCustomerId: customerId,
        nome,
        cognome,
        email,
        telefono,
        pacchetto,
        status: 'pending',
        createdAt: new Date()
      });
    }

    let discountPercentage = 0;
    let coupon;
    if (referrerId) {
      const referrer = await db
        .collection('users')
        .findOne({ stripeCustomerId: referrerId });
      if (referrer) {
        discountPercentage = 20;
        coupon = await stripe.coupons.create({
          percent_off: 20,
          duration: 'forever'
        });

        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/referral`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            referrerId,
            referredId: customerId,
            referrerName: referrer.nome,
            referredName: nome
          })
        });

        const referrerSubscriptions = await stripe.subscriptions.list({
          customer: referrerId,
          status: 'active'
        });

        for (const subscription of referrerSubscriptions.data) {
          const subscriptionItem = subscription.items.data[0];

          if (subscriptionItem && subscriptionItem.price.unit_amount) {
            const unitAmount = Math.round(
              subscriptionItem.price.unit_amount * 0.8
            );

            const productId =
              typeof subscriptionItem.price.product === 'string'
                ? subscriptionItem.price.product
                : subscriptionItem.price.product?.id;

            if (!productId || !subscriptionItem.price.recurring) {
              console.error('Invalid product or missing recurring interval');
              continue;
            }

            await stripe.subscriptionItems.update(subscriptionItem.id, {
              price_data: {
                currency: subscriptionItem.price.currency,
                product: productId,
                unit_amount: unitAmount,
                recurring: {
                  interval: subscriptionItem.price.recurring.interval
                }
              }
            });
          }
        }
      }
    }

    let session;

    if (pacchetto === 'Pro Pack') {
      session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price: 'price_1QtPxKF5A6DRUBICBylcC6ZY', // One-time price ID
            quantity: 1
          },
          {
            price: 'price_1QtPw4F5A6DRUBICXpNqc9d4', // Recurring subscription price ID (yearly)
            quantity: 1
          }
        ],
        mode: 'subscription', // Use subscription mode to allow both one-time and recurring payments
        ...(discountPercentage > 0 && { discounts: [{ coupon: coupon.id }] }), // Apply discount if any
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/grazie?session_id={CHECKOUT_SESSION_ID}&id=${customerId}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`
      });

      return NextResponse.json({ sessionId: session.id });
    } else {
      const priceId =
        pacchetto === 'MVP'
          ? 'price_1QtPpsF5A6DRUBICXDoU0Y8Q'
          : pacchetto === 'Essential'
          ? 'price_1QtPvBF5A6DRUBICPs6mDhBf'
          : pacchetto === 'Rookie'
          ? 'price_1QtPuEF5A6DRUBICKxsjWO2m'
          : null;

      if (!priceId) {
        return NextResponse.json(
          { error: 'Invalid package selected' },
          { status: 400 }
        );
      }

      session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1
          }
        ],
        mode: 'subscription',
        ...(discountPercentage > 0 && { discounts: [{ coupon: coupon.id }] }),
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/grazie?session_id={CHECKOUT_SESSION_ID}&id=${customerId}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`
      });

      return NextResponse.json({ sessionId: session.id });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
