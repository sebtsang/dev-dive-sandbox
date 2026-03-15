export type TicketStatus = 'new' | 'triaged' | 'investigating' | 'resolved';
export type TicketPriority = 'low' | 'medium' | 'high';
export type TicketChannel = 'email' | 'chat' | 'phone';

export interface Agent {
  id: string;
  name: string;
  team: string;
  email: string;
}

export interface Ticket {
  id: string;
  title: string;
  customer: string;
  requesterEmail: string;
  channel: TicketChannel;
  status: TicketStatus;
  priority: TicketPriority;
  summary: string;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  assigneeId: string | null;
  assigneeName: string | null;
}

export interface AssignmentRequest {
  assigneeId: string;
  note?: string;
}

export interface HealthResponse {
  status: 'ok';
  mode: 'memory';
  auth: 'bypassed';
  version: string;
}

export interface ApiError {
  error: string;
  detail?: string;
}

