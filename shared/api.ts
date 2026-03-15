import type {
  AssignmentRequest,
  HealthResponse,
  Ticket
} from './contracts';

const configuredBaseUrl =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : 'http://localhost:3001';

async function readJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${configuredBaseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {})
    },
    ...init
  });

  if (!response.ok) {
    let message = 'Request failed';

    try {
      const body = (await response.json()) as Partial<{ error: string; detail: string }>;
      message = body.detail ?? body.error ?? message;
    } catch {
      message = response.statusText || message;
    }

    throw new Error(message);
  }

  return (await response.json()) as T;
}

export function getHealth(): Promise<HealthResponse> {
  return readJson<HealthResponse>('/api/health');
}

export function listTickets(): Promise<Ticket[]> {
  return readJson<Ticket[]>('/api/tickets');
}

export function getTicket(id: string): Promise<Ticket> {
  return readJson<Ticket>(`/api/tickets/${id}`);
}

export function assignTicket(id: string, body: AssignmentRequest): Promise<Ticket> {
  return readJson<Ticket>(`/api/tickets/${id}/assignee`, {
    method: 'PATCH',
    body: JSON.stringify(body)
  });
}

