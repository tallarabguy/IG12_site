// lib/saveToGoogleSheets.ts
export async function saveToGoogleSheets(data: {
  firstName: string;
  lastName: string;
  email: string;
}) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secretKey = process.env.GOOGLE_SHEETS_SECRET;

  const res = await fetch(webhookUrl!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      secret: secretKey, // ✅ Add secret to the request body
    }),
  });

  const text = await res.text();
  console.log('Google Sheets raw response:', text);

  let result;
  try {
    result = JSON.parse(text);
  } catch (err) {
    throw new Error('Invalid JSON response from Google Sheets webhook');
  }

  if (!result.success) {
    throw new Error("Failed to save to Google Sheets: " + result.error);
  }

  return result;
}
