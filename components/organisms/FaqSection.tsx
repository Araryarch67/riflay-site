import { MotionText } from "@/components/atoms/MotionText";
import { Icon } from "@/components/atoms/Icon";
import { FAQ } from "@/lib/faq";
import { REPO } from "@/lib/site";

export function FaqSection() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="split">
        <header className="split__aside reveal">
          <h2 id="faq-title" className="headline-large">
            <MotionText>Questions</MotionText>
          </h2>
          <p className="muted">
            Something else? <a href={`${REPO}/issues`}>Ask on GitHub</a>.
          </p>
        </header>
        <div className="faq reveal">
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary>
                <span className="title-medium">{f.q}</span>
                <Icon name="expand_more" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
