import Reveal from "@/components/Reveal";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Card from "@/components/ui/Card";
import TextLink from "@/components/ui/TextLink";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/content";

export const metadata = {
  title: "Contact",
  description:
    "Deploy with Curiosity: get in touch as an AI Factory partner, a neo-cloud or enterprise customer, or an investor.",
};

const ROUTES = [
  {
    kicker: "AI Factory partners",
    h: "Bring your site online",
    p: "Have power, land or an AI-ready facility in India? Partner with Curiosity AI to co-invest and deploy GPU infrastructure at megawatt scale.",
    mail: SITE.email.factories,
  },
  {
    kicker: "Neo-clouds & enterprise",
    h: "Reserve GPU capacity",
    p: "Talk to us about long-term GPU-as-a-Service or bare-metal reservations for training, inference or sovereign AI workloads.",
    mail: SITE.email.deploy,
  },
  {
    kicker: "Investors & press",
    h: "Learn more",
    p: "For investment inquiries, partnership discussions or press requests, reach the Curiosity AI team directly.",
    mail: SITE.email.hello,
  },
];

export default function Contact() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="Deploy with Curiosity."
        lead="Tell us whether you're bringing land and power, or looking for long-term GPU capacity; we'll route you to the right team."
      />

      <section className="secSm">
        <Container>
          <Reveal className="g3">
            {ROUTES.map((route) => (
              <Card
                hoverable
                key={route.h}
                tag={route.kicker}
                title={route.h}
                description={route.p}
              >
                <TextLink href={`mailto:${route.mail}`} external>
                  {route.mail}
                </TextLink>
              </Card>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* ============ INTERACTIVE CONTACT FORM ============ */}
      <section className="sec">
        <Container size="sm">
          <Reveal>
            <ContactForm />
          </Reveal>
        </Container>
      </section>

      <section className="sec">
        <Container>
          <Reveal className="g2">
            <Card tag="Office" title="Vaswani Chambers">
              <p className="font-medium text-white mb-1">Curiosity AI Private Limited</p>
              <p>
                Floor 2, Plot 264/265, Vaswani Chambers,
                <br />
                Worli Colony, Mumbai 400030,
                <br />
                Maharashtra, India
              </p>
            </Card>
            <Card tag="Deployment markets" title="Mumbai & Chennai">
              <p>Scaling to additional AI Factory sites through 2029, from 5MW toward 100MW+.</p>
            </Card>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

