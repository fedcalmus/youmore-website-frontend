import Link from "next/link";
import { SOCIAL_ICONS } from "./icons";
import { getContactInfo } from "@/lib/contact";

const SOCIAL_FIELDS = [
  { key: "instagram", name: "Instagram" },
  { key: "facebook", name: "Facebook" },
  { key: "linkedin", name: "LinkedIn" },
] as const;

export async function FooterContact() {
  const contact = await getContactInfo();

  return (
    <>
      <Link className="flink" href="/contact">
        {contact?.email ?? "Contattaci"}
      </Link>
      <div className="site-footer__social">
        {contact &&
          SOCIAL_FIELDS.map(({ key, name }) => {
            const href = contact[key];
            if (!href) return null;
            const Icon = SOCIAL_ICONS[name];
            return (
              <a
                key={key}
                className="flink social-link"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                style={{ "--social-size": "44px" } as React.CSSProperties}
              >
                <Icon />
              </a>
            );
          })}
      </div>
    </>
  );
}
