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
      'x-api-key': secretKey!,
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!result.success) {
    throw new Error("Failed to save to Google Sheets: " + result.error);
  }

  return result;
}
