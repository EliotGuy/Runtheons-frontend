import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  // Connect to MongoDB
  const { db } = await connectToDatabase();

  try {
    // Count total number of users in the collection
    const userCount = await db.collection('users').countDocuments();

    // Return the count
    return NextResponse.json({ count: userCount });
  } catch (error) {
    console.error('Error fetching user count:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
