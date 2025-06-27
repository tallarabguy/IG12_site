// emails/ManifestoEmail.tsx
import { Html, Head, Preview, Body, Container, Text, Link } from '@react-email/components';

type ManifestoEmailProps = {
  firstName: string;
};

const bgColor = "#201E1D";
const borderColor = "#EFEFE9";
const textColor = "#EFEFE9";
const mutedText = "#E7E6E2";

export default function ManifestoEmail({ firstName }: ManifestoEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your copy of the IG12 manifesto</Preview>
      <Body style={{
        backgroundColor: bgColor,
        fontFamily: "Arial, Helvetica, sans-serif",
        color: textColor,
        margin: 0,
        padding: 0,
      }}>
        <Container style={{
          maxWidth: 700,
          margin: "0 auto",
          padding: "32px 16px",
          background: bgColor,
          border: `2px solid ${borderColor}`,
          borderRadius: "12px",
        }}>

          {/* Heading */}
          <Text style={{
            color: borderColor,
            fontWeight: 700,
            fontSize: 22,
            textAlign: "center",
            letterSpacing: "0.04em",
            marginBottom: 14,
            textTransform: "uppercase",
          }}>
            R&D For Civic Innovation
          </Text>
          <div style={{
            width: "100%",
            height: 2,
            background: borderColor,
            opacity: 0.18,
            margin: "0 0 28px 0"
          }}></div>

          {/* Example Body Content */}
          <Text style={{
            fontSize: 16,
            lineHeight: "1.7",
            color: mutedText,
            marginBottom: 22
          }}>
            Hi {firstName},
          </Text>
          <Text>
            Thank you for connecting with IG12. We're excited to share our manifesto with you — a provocation on design, systems, and future possibility.
          </Text>
          <Text>
            <b>THE IG12 MANIFESTO</b>
          </Text>

          <Text>
            <b>I. Systems in Crisis</b><br />
            The systems, structures, and approaches shaping civic life, community, and culture are faltering. Traditional consultancy practices, narrowly siloed expertise, and superficial engagement methods consistently prove inadequate. Communities feel disconnected, outcomes fall short, and complexity overwhelms rather than informs.<br /><br />
            <i>Why?</i> Because these conventional frameworks artificially divide essential insights: emotion from data, creativity from rigor, technology from humanity. It is precisely in these gaps where ineffectiveness thrives.
            <br /><br />
            <b>IG12 is founded on a clear insight:</b> To achieve meaningful progress, we must dismantle outdated thinking, bridging these false divides to reconnect what has been needlessly separated.
          </Text>

          <Text>
            <b>II. Radical Intersectionality and Recursive Scalability</b><br />
            The issues communities face are inherently multi-dimensional—woven across scales and scopes. IG12 embraces a recursive perspective on place and space, recognizing the interconnectedness from granular local insights up to broader systemic dynamics. Our work deliberately moves between and across scales, seeing urban life, civic engagement, and culture as intricately layered entities demanding fine-grained yet systemic perspectives.<br /><br />
            Projects like <b>Codex</b> illustrate this clearly: mapping cultural groups at borough-level granularity offers precise local understanding while revealing broader city-wide patterns. Similarly, <b>Strata</b> interrogates the meaning and scale of space itself, exploring underlying relationships influencing engagement.<br /><br />
            This recursive scalability also applies to scope. Commerce, education, leisure, transport, culture—these dimensions interlock in complex ways. IG12 confidently traverses these scopes, recombining perspectives to understand and address complexity—not by mirroring it, but by interpreting and managing it intelligently.
          </Text>

          <Text>
            <b>III. Methodological Innovation: Discursive and Platformed</b><br />
            IG12’s methodology begins as fundamentally discursive: we ignite conversations, provoke reflection, inspire curiosity, and spark deeper investigation. Crucially, we don't impose rigid methods upfront. Instead, methods emerge responsively, tailored precisely to the unique needs and demands of each investigation.<br /><br />
            Take again <b>Codex and Strata</b>: these projects began with exploratory meditation, revealing previously overlooked spatial relationships. This insight informed the chosen approach—taxonomy and spatial mapping—precisely because that approach was most suited to answer newly surfaced questions.<br /><br />
            We practice what we call <b>"Platforming"</b>: structuring work so that each insight becomes a foundation for future discoveries, layering depth and building ongoing narratives. This allows research externalities—new tools, products, or methodologies—to organically arise, continually enhancing the impact and value of our insights.<br /><br />
            Further, IG12 rejects conventional publishing’s rigid constraints. Instead, we actively explore dynamic modes of research expression. For instance, Codex might become a living, interactive interface for ongoing exploration. Strata’s insights could evolve into engaging, gamified spatial-planning tools that invite crowdsourced input and dialogue, transforming civic consultation into something inclusive, playful, and truly participatory.
          </Text>

          <Text>
            <b>IV. Personal Foundations: A Journey toward Meaning</b><br />
            IG12 emerges directly from personal experience and introspection. My journey began in civil engineering, immersed in technical precision and structured world-building, yet I simultaneously grappled with deeper philosophical questions of civic responsibility and societal benefit.<br /><br />
            Leading Imperial’s Philosophy Society planted seeds of reflection. My doctoral research at UCL crystallized my perspective further: I became deeply fascinated by complex socio-technical systems and passionate about creating genuinely positive societal impact. Having worked across engineering consultancies, central government, and academic institutions, I saw clearly that traditional career paths and large corporate structures often prioritized profit over genuine community benefit.<br /><br />
            This realization led directly to IG12—born from the conviction that my skills and capacities could be better directed toward those community-based, culturally impactful organizations which provide profound social value but typically lack resources to access these very skills.
          </Text>

          <Text>
            <b>V. Who We Work With</b><br />
            IG12 seeks meaningful collaborations across multiple scales of organization, intentionally casting a broad yet strategic net:<br />
            - <b>Grassroots and community-focused organizations</b>, whose impact is deeply local and directly felt.<br />
            - <b>Mid-sized local authorities and established local institutions</b>, positioned uniquely at civic intersections, managing urban complexities daily.<br />
            - <b>Large-scale cultural institutions, think tanks, central government departments, and charities</b>, whose policies, influence, and scope significantly shape societal and cultural frameworks.<br /><br />
            We are actively seeking dialogue and engagement—whether you’re a potential client, collaborator, or someone simply curious about new ways to approach complex urban, civic, and cultural challenges.
          </Text>

          <Text>
            <b>VI. Our Clear Objectives and Commitment</b><br />
            IG12’s overarching aim is to bring analytical creativity and data-driven insights into a sector where they are deeply needed yet rarely accessible. Complex challenges demand precise, thoughtful, and informed responses—responses that typically flow toward private-sector entities with financial resources to command them. We seek to reverse this trend.<br /><br />
            IG12 commits explicitly to making advanced analytical tools and sophisticated interdisciplinary methodologies accessible precisely to those organizations delivering maximum societal benefit, yet currently underserved due to resource constraints.<br /><br />
            We intend to directly empower those working at the intersection of civic responsibility, cultural vitality, and community resilience, ensuring they are fully equipped to navigate and address the complexities they encounter daily.
          </Text>

          <Text>
            <b>VII. A Collective Call to Action</b><br />
            This is IG12—a movement, a commitment, an interdisciplinary platform dedicated to dismantling ineffectiveness, bridging divides, and innovating meaningfully at the intersections.<br /><br />
            We invite you—community leaders, institutional innovators, civic technologists, cultural strategists—to join us. Together, let’s build something that truly serves communities, empowering them with new insights, sophisticated tools, and fresh, impactful thinking.<br /><br />
            The future of meaningful, empowered community life begins here.<br /><br />
            <b>Join us at IG12. Let’s transform complexity into possibility.</b>
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
