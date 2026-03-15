import type { Ticket } from '../../shared/contracts';

interface TicketListProps {
  tickets: Ticket[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  loadState: 'idle' | 'loading' | 'ready' | 'error';
  errorMessage: string | null;
}

function toneForStatus(status: Ticket['status']): string {
  switch (status) {
    case 'resolved':
      return 'status-resolved';
    case 'investigating':
      return 'status-investigating';
    case 'triaged':
      return 'status-triaged';
    default:
      return 'status-new';
  }
}

export function TicketList({
  tickets,
  selectedId,
  onSelect,
  loadState,
  errorMessage
}: TicketListProps) {
  return (
    <aside className="panel panel-list">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Queue</p>
          <h2>Open work</h2>
        </div>
        <span className="count-pill">{tickets.length} tickets</span>
      </div>

      {loadState === 'loading' ? <p className="empty-state">Loading tickets...</p> : null}
      {loadState === 'error' ? <p className="empty-state">{errorMessage}</p> : null}

      <div className="ticket-list">
        {tickets.map((ticket) => (
          <button
            key={ticket.id}
            className={ticket.id === selectedId ? 'ticket-card selected' : 'ticket-card'}
            onClick={() => onSelect(ticket.id)}
            type="button"
          >
            <div className="ticket-card-header">
              <span className={`status-dot ${toneForStatus(ticket.status)}`} />
              <span className="ticket-id">{ticket.id}</span>
            </div>
            <strong>{ticket.title}</strong>
            <p>{ticket.summary}</p>
            <div className="ticket-meta">
              <span>{ticket.customer}</span>
              <span>{ticket.priority}</span>
            </div>
          </button>
        ))}

        {loadState === 'ready' && tickets.length === 0 ? (
          <p className="empty-state">No tickets in the seed dataset.</p>
        ) : null}
      </div>
    </aside>
  );
}

