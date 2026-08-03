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

// Base carries the hover border/lift for BOTH variants (in the prototype
// CSS .btn:hover outranked .btn-primary, so even primary turns
// border-strong on hover); each variant owns its resting border-color.
const BASE_CLASSES =
  "relative isolate inline-flex cursor-pointer items-center justify-center gap-[0.55rem] rounded-full border px-6 py-[0.85rem] text-(length:--step--1) font-semibold transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-border-strong [&_svg]:size-[17px]";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "border-accent/60 bg-[linear-gradient(140deg,rgb(var(--accent)),rgb(var(--accent-2)))] text-white shadow-[0_10px_30px_-12px_rgb(var(--accent)/0.95)] hover:shadow-[0_16px_40px_-12px_rgb(var(--accent)),0_0_0_1px_rgb(var(--accent)/0.5)]",
  ghost: "border-border bg-transparent hover:bg-surface-2",
};

function buttonClassName(variant: ButtonVariant, className?: string) {
  return [BASE_CLASSES, VARIANT_CLASSES[variant], className]
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
