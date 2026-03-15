import { describe, expect, it } from 'vitest';

import { seedAgents, seedTickets } from '../server/data';
import {
  AssigneeNotFoundError,
  MemoryTicketStore,
  TicketNotFoundError
} from '../server/lib/store';

describe('MemoryTicketStore.assignTicket', () => {
  it('updates assignee metadata and timestamp', async () => {
    const store = new MemoryTicketStore(seedTickets, seedAgents);
    const original = await store.getTicket('SQ-1003');

    const updated = await store.assignTicket('SQ-1003', {
      assigneeId: 'agt_priya'
    });

    expect(original).not.toBeNull();
    expect(updated.assigneeId).toBe('agt_priya');
    expect(updated.assigneeName).toBe('Priya Shah');
    expect(updated.updatedAt >= (original?.updatedAt ?? '')).toBe(true);
  });

  it('throws when the ticket does not exist', async () => {
    const store = new MemoryTicketStore(seedTickets, seedAgents);

    await expect(
      store.assignTicket('SQ-missing', {
        assigneeId: 'agt_priya'
      })
    ).rejects.toBeInstanceOf(TicketNotFoundError);
  });

  it('throws when the assignee does not exist', async () => {
    const store = new MemoryTicketStore(seedTickets, seedAgents);

    await expect(
      store.assignTicket('SQ-1001', {
        assigneeId: 'agt_missing'
      })
    ).rejects.toBeInstanceOf(AssigneeNotFoundError);
  });
});
