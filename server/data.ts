import type { Agent, Ticket } from '../shared/contracts';

export const seedAgents: Agent[] = [
  {
    id: 'agt_olivia',
    name: 'Olivia Vega',
    team: 'Escalations',
    email: 'olivia@example.com'
  },
  {
    id: 'agt_miles',
    name: 'Miles Jordan',
    team: 'Billing',
    email: 'miles@example.com'
  },
  {
    id: 'agt_priya',
    name: 'Priya Shah',
    team: 'Platform',
    email: 'priya@example.com'
  }
];

export const seedTickets: Ticket[] = [
  {
    id: 'SQ-1001',
    title: 'Duplicate invoices after failed retry',
    customer: 'Northstar Labs',
    requesterEmail: 'ops@northstarlabs.com',
    channel: 'email',
    status: 'triaged',
    priority: 'high',
    summary: 'Customer received two invoices after retrying a failed card payment.',
    description:
      'The billing service retried a charge after a gateway timeout and later generated a second invoice. The customer wants the duplicate reversed before month-end close.',
    tags: ['billing', 'retry', 'finance'],
    createdAt: '2026-03-12T09:20:00.000Z',
    updatedAt: '2026-03-13T16:44:00.000Z',
    assigneeId: 'agt_miles',
    assigneeName: 'Miles Jordan'
  },
  {
    id: 'SQ-1002',
    title: 'Webhook delivery stalls during deployment window',
    customer: 'Beacon Health',
    requesterEmail: 'platform@beaconhealth.io',
    channel: 'chat',
    status: 'investigating',
    priority: 'high',
    summary: 'Outbound webhooks pause for several minutes during deploys.',
    description:
      'The customer sees a burst of delayed webhook deliveries every Wednesday release. They need a timeline and a mitigation recommendation.',
    tags: ['webhooks', 'deployments', 'queueing'],
    createdAt: '2026-03-11T14:12:00.000Z',
    updatedAt: '2026-03-14T08:05:00.000Z',
    assigneeId: 'agt_priya',
    assigneeName: 'Priya Shah'
  },
  {
    id: 'SQ-1003',
    title: 'SMS notifications sent after ticket resolution',
    customer: 'Pine & Ledger',
    requesterEmail: 'support@pineledger.co',
    channel: 'phone',
    status: 'new',
    priority: 'medium',
    summary: 'Resolved tickets continue sending reminder texts overnight.',
    description:
      'A nightly reminder job does not appear to honor the resolved state. The customer wants to avoid sending more texts before the next campaign.',
    tags: ['notifications', 'sms'],
    createdAt: '2026-03-14T05:30:00.000Z',
    updatedAt: '2026-03-14T05:30:00.000Z',
    assigneeId: null,
    assigneeName: null
  },
  {
    id: 'SQ-1004',
    title: 'Dashboard widget over-counts open incidents',
    customer: 'Summit Freight',
    requesterEmail: 'noc@summitfreight.com',
    channel: 'email',
    status: 'triaged',
    priority: 'low',
    summary: 'Operations dashboard reports 17 open incidents when only 11 are active.',
    description:
      'The customer shared screenshots showing duplicate incident cards after filtering by region. They need the count fixed before an executive review.',
    tags: ['dashboard', 'analytics'],
    createdAt: '2026-03-10T11:00:00.000Z',
    updatedAt: '2026-03-13T12:22:00.000Z',
    assigneeId: 'agt_olivia',
    assigneeName: 'Olivia Vega'
  }
];

