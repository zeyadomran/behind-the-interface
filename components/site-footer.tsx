import Link from "@/components/link";
import { ArrowUp } from "lucide-react";
import { CopyContactEmail } from "./copy-contact-email";
import "@/app/site-footer.css";

const email = "ziomran@gmail.com";

function ContactArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="bti-contact-screen">
      <section
        className="bti-contact"
        id="contact"
        aria-labelledby="contact-heading"
      >
        <p className="bti-contact-label">
          <span className="tiny-square" aria-hidden="true" />
          <span>03</span>
          <span>Start a conversation</span>
        </p>
        <div className="bti-contact-intro">
          <h2 id="contact-heading">
            Something worth a closer look?
            <br />
            <span>Let’s talk design.</span>
          </h2>
          <p>
            Found a website I should study, have a different take, or want to
            build something thoughtful? I’d love to hear from you.
          </p>
        </div>
        <a className="bti-contact-email" href={`mailto:${email}`}>
          <span>{email}</span>
          <ContactArrow />
        </a>
        <div className="bti-contact-bottom">
          <div className="bti-contact-actions">
            <CopyContactEmail email={email} />
            <a
              className="bti-contact-portfolio"
              href="https://zeyadomran.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio <ContactArrow />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <div className="bti-contact-links">
            <a
              href="https://linkedin.com/in/zeyadomran"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ContactArrow />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href="https://github.com/zeyadomran"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <ContactArrow />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>
      <div className="bti-footer">
        <p className="bti-footer-name">
          <span>Behind the </span>
          <span>Interface</span>
        </p>
        <div className="bti-footer-meta">
          <span>© {new Date().getFullYear()} Zeyad Omran</span>
          <Link href="/docs/methodology/">How I research</Link>
          <a href="#main-content" className="bti-footer-top">
            Back to top <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
