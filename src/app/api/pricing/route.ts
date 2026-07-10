import { NextResponse } from 'next/server';
import { fetchLivePricing } from '@/lib/pricing';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'discord-bot';

  try {
    const plans = await fetchLivePricing(category);
    return NextResponse.json({ success: true, plans }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
