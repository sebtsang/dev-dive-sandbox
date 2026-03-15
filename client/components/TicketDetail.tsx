import type { Ticket } from '../../shared/contracts';

interface TicketDetailProps {
  ticket: Ticket | null;
}

function detailLabel(label: string, value: string | null) {
  return (
    <div className="detail-row">
      <span>{label}</span>
      <strong>{value ?? 'Unassigned'}</strong>
    </div>
  );
}

export function TicketDetail({ ticket }: TicketDetailProps) {
  if (!ticket) {
    return (
      <section className="panel panel-detail">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Ticket</p>
            <h2>Select a ticket</h2>
          </div>
        </div>
        <p className="empty-state">
          Pick a ticket from the queue to inspect the baseline implementation.
        </p>
      </section>
    );
  }

  return (
    <section className="panel panel-detail">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Ticket Detail</p>
          <h2>{ticket.title}</h2>
        </div>
        <span className="count-pill">{ticket.status.replace('_', ' ')}</span>
      </div>

      <p className="detail-summary">{ticket.description}</p>

      <div className="detail-grid">
        {detailLabel('Customer', ticket.customer)}
        {detailLabel('Requester', ticket.requesterEmail)}
        {detailLabel('Channel', ticket.channel)}
        {detailLabel('Priority', ticket.priority)}
        {detailLabel('Assignee', ticket.assigneeName)}
        {detailLabel('Updated', new Date(ticket.updatedAt).toLocaleString())}
      </div>

      <div className="tag-row">
        {ticket.tags.map((tag) => (
          <span className="tag-chip" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className="callout">
        <h3>Assignment works in the API, but the UI is still missing</h3>
        <p>
          The memory-backed API now supports <code>PATCH /api/tickets/:id/assignee</code>. This
          screen still keeps the action disabled so the frontend integration remains a separate
          ticket.
        </p>
        <button className="ghost-button" disabled type="button">
          Assign ticket (frontend pending)
        </button>
      </div>
    </section>
  );
}
