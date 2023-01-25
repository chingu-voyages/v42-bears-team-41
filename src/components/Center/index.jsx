export function Center({ children, className, ...props }) {
  return (
    <div className={`flex justify-center ${className}`} {...props}>
      {children}
    </div>
  );
}
export default Center;
