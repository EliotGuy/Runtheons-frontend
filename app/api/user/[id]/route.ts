// pages/api/user/[id].ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; // This will be your stripeCustomerId

  // Connect to MongoDB
  const { db } = await connectToDatabase();

  try {
    // Fetch user from the database using stripeCustomerId
    const user = await db.collection('users').findOne({ stripeCustomerId: id });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
