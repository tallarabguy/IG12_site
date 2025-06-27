// lib/email.ts
import { Resend } from 'resend';
import ManifestoEmail from '@/emails/ManifestoEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail(email: string, firstName: string) {
  const response = await resend.emails.send({
    from: 'IG12 <onboarding@resend.dev>',
    to: email,
    subject: 'Your IG12 Manifesto',
    react: ManifestoEmail({ firstName }),
  });

  console.log('Resend response:', response); // <--- Add this
  return response;
}