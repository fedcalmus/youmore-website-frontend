import { SOCIAL_ICONS } from "./icons";
import { SOCIAL_LINKS } from "@/lib/site";

export function SocialLinks({ size = 44, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <>
      {SOCIAL_LINKS.map(({ name, href }) => {
        const Icon = SOCIAL_ICONS[name];
        return (
          <a
            key={name}
            className="flink social-link"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            style={{ "--social-size": `${size}px`, ...style } as React.CSSProperties}
          >
            <Icon />
          </a>
        );
      })}
    </>
  );
}
