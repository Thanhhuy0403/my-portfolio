import { LuArrowUpRight } from "react-icons/lu";

/**
 * External "read more" link used under awards and startup milestones.
 * Hover / keyboard focus draws an accent underline from the left and nudges the arrow (see .link-line).
 */
export function SourceLink({ label, href, newTabLabel }: { label: string; href: string; newTabLabel: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex items-center gap-1 text-xs text-muted transition-colors duration-300 hover:text-accent focus-visible:text-accent"
    >
      <span className="link-line">{label}</span>
      <LuArrowUpRight
        className="size-3 transition-transform duration-300 ease-out-expo group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-focus-visible/link:translate-x-0.5 group-focus-visible/link:-translate-y-0.5"
        aria-hidden="true"
      />
      <span className="sr-only"> {newTabLabel}</span>
    </a>
  );
}
