import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import type { ReactNode, ComponentType, SVGProps } from "react";
import Brand from "./Brand";

// ─── Data ────────────────────────────────────────────────────────────────────

const HOURS = [
  { day: "Mon – Sat", time: "9:30 AM – 4:30 PM" },
  { day: "Sunday", time: "Open by booking only" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const ColHeading = ({ children }: { children: ReactNode }) => (
  <h3 className="footer-col-heading">{children}</h3>
);

const AccentIcon = ({
  icon: Icon,
  faded = false,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  faded?: boolean;
}) => (
  <Icon
    style={{
      width: "0.9rem",
      height: "0.9rem",
      flexShrink: 0,
      color: faded ? "rgba(130,125,140,0.4)" : "rgba(210,40,40,0.85)",
    }}
  />
);

// ─── Component ────────────────────────────────────────────────────────────────

interface FooterProps {
  showBrands?: boolean;
}

export const Footer = ({ showBrands = true }: FooterProps) => (
  <footer id="contact" className="footer-root footer-grain">

    {/* Ambient crimson bloom */}
    <div aria-hidden="true" className="footer-bloom" />

    {showBrands && <Brand />}

    {/* ══ MAIN FOOTER GRID ══
        Tailwind responsive classes drive the column layout.
        sm: = 640px+, lg: = 1024px+
        On mobile (<640px): single column stack via grid-cols-1
    */}
    <div className="footer-content">
      <div className="
        w-full max-w-[1420px] mx-auto
        px-5 py-10
        grid
        grid-cols-1
        gap-y-10
        sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 sm:px-7 sm:py-12
        lg:grid-cols-4 lg:gap-x-14 lg:gap-y-0 lg:px-10 lg:py-12
      ">

        {/* Col 1 — Brand identity */}
        <div className="flex flex-col">
          <a href="#home" className="footer-brand">
            <img src="/navbar/LOGO PNG.png" alt="MotorMedic Logo"  className="footer-brand-logo"     />
            <img src="/navbar/FONT PNG.png" alt="MotorMedic"       className="footer-brand-wordmark" />
          </a>
          <p className="footer-brand-desc">
            Auckland's premium independent car workshop. Precision care, honest service.
          </p>
          <div className="footer-social-row">
            <a
  href="https://www.instagram.com/motormedic.autoz?igsh=MWFsZDkzYXN4YWx3Mg%3D%3D&utm_source=qr"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Instagram"
  className="social-btn"
>
            </a>
            <a
  href="https://www.facebook.com/profile.php?id=61590655644061"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Facebook"
  className="social-btn"
>
            </a>
          </div>
        </div>

        {/* Col 2 — Visit Us */}
        <div className="flex flex-col">
          <ColHeading>Visit Us</ColHeading>
          <a
            href="https://maps.app.goo.gl/fepEQtV3DB9q9QXb9"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-info-link"
          >
            <MapPin style={{ width: "0.95rem", height: "0.95rem", marginTop: "0.15rem", flexShrink: 0, color: "rgba(210,40,40,0.85)" }} />
            <span>
              5 Wingate Street,<br />
              Avondale, Auckland 0600<br />
              New Zealand
            </span>
          </a>
        </div>

        {/* Col 3 — Contact */}
        <div className="flex flex-col">
          <ColHeading>Contact</ColHeading>
          <ul className="footer-info-list gap-contact">
            <li>
              <a href="tel:+0279165555" className="footer-info-link" style={{ alignItems: "center" }}>
                <AccentIcon icon={Phone} />
                027 916 5555
              </a>
            </li>
            <li>
              <a href="mailto:motormedicnz@gmail.com" className="footer-info-link" style={{ alignItems: "center" }}>
                <AccentIcon icon={Mail} />
                <span style={{ wordBreak: "break-all" }}>motormedicnz@gmail.com</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4 — Hours */}
        <div className="flex flex-col">
          <ColHeading>Hours</ColHeading>
          <ul className="footer-info-list gap-hours">
            {HOURS.map(({ day, time }) => {
              const isClosed = time === "Closed";
              return (
                <li key={day} className={`footer-hours-item${isClosed ? " closed" : ""}`}>
                  <AccentIcon icon={Clock} faded={isClosed} />
                  <span>
                    <span className="footer-hours-day">{day}:</span>
                    {time}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

      </div>
    </div>

    {/* Bottom bar */}
    <div className="footer-bottom">
      <div className="footer-bottom-inner">
        <p>© {new Date().getFullYear()} MotorMedic Auckland. All rights reserved.</p>
        <p>Trusted automotive care in Auckland.</p>
      </div>
    </div>

  </footer>
);

export default Footer;