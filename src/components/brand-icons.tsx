import type { IconType } from "react-icons";
import { LuGlobe } from "react-icons/lu";
import { SiFacebook, SiGithub } from "react-icons/si";

const SOCIAL: Record<"github" | "facebook" | "globe", IconType> = {
  github: SiGithub,
  facebook: SiFacebook,
  globe: LuGlobe,
};

export function SocialIcon({
  name,
  className,
}: {
  name: keyof typeof SOCIAL;
  className?: string;
}) {
  const Icon = SOCIAL[name];
  return <Icon className={className} aria-hidden="true" />;
}
