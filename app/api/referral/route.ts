import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const referrerId = searchParams.get('id');

    if (!referrerId) {
      return NextResponse.json({ error: 'Referrer ID is required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const referrer = await db.collection('users').findOne({ stripeCustomerId: referrerId });

    if (!referrer) {
      return NextResponse.json({ error: 'Invalid referrer' }, { status: 404 });
    }

    return NextResponse.json({
      referrer: {
        id: referrer.stripeCustomerId,
        package: referrer.pacchetto,
        name: referrer.nome // Return referrer's name
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { referrerId, referredId } = body;

    if (!referrerId || !referredId) {
      return NextResponse.json({ error: 'Both referrer and referred IDs are required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    // Create or update referral record
    await db.collection('referrals').updateOne(
      { referrerId, referredId },
      { 
        $set: {
          referrerId,
          referredId,
          status: 'completed',
          createdAt: new Date()
        }
      },
      { upsert: true }
    );

    // Update both users with discount
    await db.collection('users').updateMany(
      { stripeCustomerId: { $in: [referrerId, referredId] } },
      { $set: { hasReferralDiscount: true } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
