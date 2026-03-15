import { useEffect, useState } from 'react';

import { getTicket, listTickets } from '../shared/api';
import type { Ticket } from '../shared/contracts';
import { PlaceholderPanel } from './components/PlaceholderPanel';
import { TicketDetail } from './components/TicketDetail';
import { TicketList } from './components/TicketList';

type LoadState = 'idle' | 'loading' | 'ready' | 'error';

export function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [loadState, setLoadState] = useState<LoadState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadTickets() {
      setLoadState('loading');

      try {
        const nextTickets = await listTickets();

        if (cancelled) {
          return;
        }

        setTickets(nextTickets);
        setSelectedId((current) => current ?? nextTickets[0]?.id ?? null);
        setLoadState('ready');
      } catch (error) {
        if (cancelled) {
          return;
        }

        setErrorMessage(error instanceof Error ? error.message : 'Failed to load tickets.');
        setLoadState('error');
      }
    }

    void loadTickets();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedId) {
      setSelectedTicket(null);
      return;
    }

    const ticketId = selectedId;
    let cancelled = false;

    async function loadTicket() {
      try {
        const detail = await getTicket(ticketId);

        if (!cancelled) {
          setSelectedTicket(detail);
        }
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(error instanceof Error ? error.message : 'Failed to load ticket detail.');
        }
      }
    }

    void loadTicket();

    return () => {
      cancelled = true;
    };
  }, [selectedId]);

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">DevDive Sandbox Repo</p>
          <h1>Support Queue Sandbox</h1>
          <p className="hero-copy">
            A believable but intentionally incomplete support dashboard. Read flows work.
            Assignment, saved views, SQLite persistence, and admin audit history are planned.
          </p>
        </div>
        <div className="hero-card">
          <span>Recommended DevDive prompt</span>
          <strong>
            Add ticket assignment, saved views, SQLite persistence, and an admin-only audit log.
          </strong>
        </div>
      </header>

      <main className="workspace">
        <TicketList
          tickets={tickets}
          selectedId={selectedId}
          onSelect={setSelectedId}
          loadState={loadState}
          errorMessage={errorMessage}
        />
        <TicketDetail ticket={selectedTicket} />
        <section className="stack">
          <PlaceholderPanel
            title="Saved Views"
            badge="planned"
            body="Customer success wants reusable filtered views, but the baseline only documents the need."
          />
          <PlaceholderPanel
            title="Admin Audit Log"
            badge="planned"
            body="The future audit panel should show who reassigned a ticket and when. Nothing is persisted yet."
          />
          <PlaceholderPanel
            title="Persistence"
            badge="memory only"
            body="The server exposes a store interface and a SQLite stub, but only the in-memory adapter is wired."
          />
        </section>
      </main>
    </div>
  );
}
