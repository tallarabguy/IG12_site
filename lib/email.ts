// lib/email.ts
import { Resend } from 'resend';
import ManifestoEmail from '@/emails/ManifestoEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail(email: string, firstName: string) {
  try {
    const result = await resend.emails.send({
      from: 'IG12 <hello@yourdomain.com>', // ✅ set this up in Resend’s domain settings
      to: email,
      subject: 'Your IG12 Manifesto',
      react: ManifestoEmail({ firstName }),
    });

    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
