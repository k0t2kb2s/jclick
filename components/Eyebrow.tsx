export function Eyebrow({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return <p className={`eyebrow ${dark ? "eyebrow-dark" : ""}`}>{children}</p>;
}
