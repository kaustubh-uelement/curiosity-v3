import Reveal from "./Reveal";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Statement({ title, highlight, body, primary, secondary }) {
  return (
    <section className="sec">
      <Container>
        <Reveal className="statement">
          <h2 className="dispXl">
            {title} {highlight ? <span className="opacity-75">{highlight}</span> : null}
          </h2>
          {body ? <p>{body}</p> : null}
          <div className="btns justify-center">
            {primary && (
              <Button href={primary.href} variant="primary">
                {primary.label}
              </Button>
            )}
            {secondary && (
              <Button href={secondary.href} variant="glass">
                {secondary.label}
              </Button>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

