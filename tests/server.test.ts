import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createApp } from '../server/app';

describe('support queue sandbox api', () => {
  const app = createApp();

  it('serves health metadata', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: 'ok',
      mode: 'memory',
      auth: 'bypassed'
    });
  });

  it('returns seeded tickets', async () => {
    const response = await request(app).get('/api/tickets');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(4);
    expect(response.body[0]).toMatchObject({
      id: expect.any(String),
      title: expect.any(String),
      status: expect.any(String)
    });
  });

  it('returns a ticket by id', async () => {
    const response = await request(app).get('/api/tickets/SQ-1002');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: 'SQ-1002',
      customer: 'Beacon Health'
    });
  });

  it('assigns a ticket through the API', async () => {
    const response = await request(app)
      .patch('/api/tickets/SQ-1002/assignee')
      .send({ assigneeId: 'agt_olivia' });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: 'SQ-1002',
      assigneeId: 'agt_olivia',
      assigneeName: 'Olivia Vega'
    });
  });

  it('rejects unknown assignees', async () => {
    const response = await request(app)
      .patch('/api/tickets/SQ-1001/assignee')
      .send({ assigneeId: 'agt_unknown' });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: 'Validation failed'
    });
  });
});
