export function Badge({ children, className, ...props }) {
  return (
    <span className={"badge badge-outline badge-neutral mx-1 mt-2"} {...props}>
      {children}
    </span>
  );
}
