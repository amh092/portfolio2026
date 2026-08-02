import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "ghost";

type ButtonLinkProps = { href: string; variant?: ButtonVariant } & Omit<
  ComponentPropsWithoutRef<"a">,
  "href"
>;

type ButtonButtonProps = {
  href?: undefined;
  variant?: ButtonVariant;
} & ComponentPropsWithoutRef<"button">;

export type ButtonProps = ButtonLinkProps | ButtonButtonProps;

function buttonClassName(variant: ButtonVariant, className?: string) {
  return ["btn", variant === "primary" ? "btn-primary" : "btn-ghost", className]
    .filter(Boolean)
    .join(" ");
}

// Pill button per the prototype: primary = accent→indigo gradient with a
// static glow (the pulse animation is Phase 5), ghost = bordered transparent.
// Renders an anchor when `href` is given so CTAs work as in-page links.
export default function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant = "primary", className, href, ...rest } = props;
    return <a href={href} className={buttonClassName(variant, className)} {...rest} />;
  }

  const { variant = "primary", className, type = "button", ...rest } = props;
  return (
    <button type={type} className={buttonClassName(variant, className)} {...rest} />
  );
}
