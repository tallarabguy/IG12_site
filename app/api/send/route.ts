// app/api/send/route.ts
import { NextResponse } from 'next/server';
import { sendConfirmationEmail } from '@/lib/email';
import { saveToGoogleSheets } from '@/lib/saveToGoogleSheets';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, firstName, lastName } = body;

  try {
    // 1. Save to Google Sheets
    const sheetsResult = await saveToGoogleSheets({ firstName, lastName, email });

    // 2. Send confirmation email
    const emailResult = await sendConfirmationEmail(email, firstName);

    return NextResponse.json({
      success: true,
      emailResult,
      sheetsResult,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
