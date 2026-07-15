export function SectionMarker({
  index,
  label,
}: {
  index: string;
  label: string;
}) {
  return (
    <div className="section-marker" aria-hidden="true">
      <span className="section-ghost">{index}</span>
      <b>{index}</b>
      <span className="section-marker-line" />
      <span>{label}</span>
    </div>
  );
}
