import Link from "next/link";

export function LinkWrapper({ children, href, ...props }) {
  return (
    <div {...props}>
      <Link href={href}>{children}</Link>
    </div>
  );
}
