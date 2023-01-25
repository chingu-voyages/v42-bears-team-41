export function DividerArea({ className, children, ...props }) {
  return (
    <div className={`bg-base-200 ${className}`} {...props}>
      {children}
    </div>
  );
}
