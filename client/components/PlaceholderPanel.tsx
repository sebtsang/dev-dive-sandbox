interface PlaceholderPanelProps {
  title: string;
  badge: string;
  body: string;
}

export function PlaceholderPanel({ title, badge, body }: PlaceholderPanelProps) {
  return (
    <section className="panel placeholder-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Planned Surface Area</p>
          <h2>{title}</h2>
        </div>
        <span className="count-pill">{badge}</span>
      </div>
      <p>{body}</p>
    </section>
  );
}

