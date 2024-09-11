
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api.thecatapi.com/v1/images/search?limit=100', { // Fetch 9 cat images
      headers: {
        'x-api-key': process.env.THE_CAT_API_KEY,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch cat images');
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching cat images', error: error.message }, { status: 500 });
  }
}
