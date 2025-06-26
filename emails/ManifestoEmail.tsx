// emails/ManifestoEmail.tsx
import { Html, Head, Preview, Body, Container, Text, Link } from 'react-email-components';

type ManifestoEmailProps = {
  firstName: string;
};

export default function ManifestoEmail({ firstName }: ManifestoEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your copy of the IG12 manifesto</Preview>
      <Body style={{ backgroundColor: '#ffffff', fontFamily: 'sans-serif' }}>
        <Container style={{ padding: '20px' }}>
          <Text>Hi {firstName},</Text>
          <Text>
            Thank you for connecting with IG12. We're excited to share our manifesto with you —
            a short provocation on design, systems, and future possibility.
          </Text>
          <Text>
            📄 <Link href="https://yourdomain.com/path-to-manifesto.pdf">Download the Manifesto</Link>
          </Text>
          <Text>
            Feel free to reach out or reply directly if you'd like to talk ideas or opportunities.
          </Text>
          <Text>Warmly,</Text>
          <Text>The IG12 Team</Text>
        </Container>
      </Body>
    </Html>
  );
}
