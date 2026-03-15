import cors from 'cors';
import express, { type Request, type Response } from 'express';

import type {
  ApiError,
  AssignmentRequest,
  HealthResponse
} from '../shared/contracts';
import { seedAgents, seedTickets } from './data';
import { requireAdmin } from './lib/auth';
import {
  AssigneeNotFoundError,
  MemoryTicketStore,
  TicketNotFoundError,
  type TicketStore
} from './lib/store';

function sendError(
  res: Response<ApiError>,
  status: number,
  error: string,
  detail?: string
): void {
  res.status(status).json({ error, detail });
}

export function createApp(
  store: TicketStore = new MemoryTicketStore(seedTickets, seedAgents)
) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (_req, res: Response<HealthResponse>) => {
    res.json({
      status: 'ok',
      mode: 'memory',
      auth: 'bypassed',
      version: '0.1.0'
    });
  });

  app.get('/api/tickets', async (_req, res, next) => {
    try {
      const tickets = await store.listTickets();
      res.json(tickets);
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/tickets/:id', async (req, res, next) => {
    try {
      const ticket = await store.getTicket(req.params.id);

      if (!ticket) {
        sendError(res, 404, 'Not found', `Ticket ${req.params.id} does not exist.`);
        return;
      }

      res.json(ticket);
    } catch (error) {
      next(error);
    }
  });

  app.patch(
    '/api/tickets/:id/assignee',
    requireAdmin,
    async (req: Request<{ id: string }, unknown, Partial<AssignmentRequest>>, res, next) => {
      try {
        if (!req.body.assigneeId) {
          sendError(res, 400, 'Validation failed', 'assigneeId is required.');
          return;
        }

        const ticket = await store.assignTicket(req.params.id.toLowerCase(), {
          assigneeId: req.body.assigneeId,
          note: req.body.note
        });

        res.json(ticket);
      } catch (error) {
        if (error instanceof TicketNotFoundError) {
          sendError(res, 404, 'Not found', error.message);
          return;
        }

        if (error instanceof AssigneeNotFoundError) {
          sendError(res, 400, 'Validation failed', error.message);
          return;
        }

        next(error);
      }
    }
  );

  app.use((error: unknown, _req: Request, res: Response<ApiError>, _next: express.NextFunction) => {
    const detail = error instanceof Error ? error.message : 'Unexpected server error.';
    sendError(res, 500, 'Internal server error', detail);
  });

  // test comment
  return app;
}
