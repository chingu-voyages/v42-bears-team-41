export function DividerArea({ className, children, ...props }) {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
}
