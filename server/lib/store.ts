import type {
  Agent,
  AssignmentRequest,
  Ticket
} from '../../shared/contracts';

export interface TicketStore {
  listTickets(): Promise<Ticket[]>;
  getTicket(id: string): Promise<Ticket | null>;
  assignTicket(id: string, input: AssignmentRequest): Promise<Ticket>;
  listAgents(): Promise<Agent[]>;
}

export class MemoryTicketStore implements TicketStore {
  private readonly tickets = new Map<string, Ticket>();
  private readonly agents: Agent[];

  constructor(tickets: Ticket[], agents: Agent[]) {
    this.agents = agents;

    for (const ticket of tickets) {
      this.tickets.set(ticket.id, structuredClone(ticket));
    }
  }

  async listTickets(): Promise<Ticket[]> {
    return Array.from(this.tickets.values()).sort((left, right) =>
      right.updatedAt.localeCompare(left.updatedAt)
    );
  }

  async getTicket(id: string): Promise<Ticket | null> {
    return this.tickets.get(id) ?? null;
  }

  async assignTicket(_id: string, _input: AssignmentRequest): Promise<Ticket> {
    throw new Error('Assignment persistence is not implemented in the memory baseline.');
  }

  async listAgents(): Promise<Agent[]> {
    return this.agents;
  }
}

export class SQLiteTicketStore implements TicketStore {
  constructor(private readonly filename: string) {}

  async listTickets(): Promise<Ticket[]> {
    throw new Error(`SQLite persistence is planned but not wired: ${this.filename}`);
  }

  async getTicket(_id: string): Promise<Ticket | null> {
    throw new Error(`SQLite persistence is planned but not wired: ${this.filename}`);
  }

  async assignTicket(_id: string, _input: AssignmentRequest): Promise<Ticket> {
    throw new Error(`SQLite persistence is planned but not wired: ${this.filename}`);
  }

  async listAgents(): Promise<Agent[]> {
    throw new Error(`SQLite persistence is planned but not wired: ${this.filename}`);
  }
}

