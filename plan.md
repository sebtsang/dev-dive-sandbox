# DevDive Operator Playbook

This file is for humans running the DevDive sandbox. The primary planning input for DevDive should still be [`README.md`](/Users/stsang/Development/dev-dive-sandbox/README.md).

## Exact prompt

Use this exact command when testing planning:

```bash
devdive init "Add ticket assignment, saved views, SQLite persistence, and an admin-only audit log."
```

## Expected baseline planning areas

The generated work should cover most or all of these labels:

- `frontend`
- `backend`
- `api`
- `testing`
- `database`
- `auth`

## Scripted follow-up scenarios

### Scenario 1: implement backend assignment

Goal:
Make `PATCH /api/tickets/:id/assignee` actually update the in-memory store and return the updated ticket.

Suggested commit theme:
`feat: implement ticket assignment endpoint`

Expected DevDive behavior:

- Commit analysis should mention assignment or ticket ownership changes.
- One backend or API task should move to `in_progress` or `done`.
- The dashboard should show a new commit analysis entry tied to the appropriate issue.

### Scenario 2: wire frontend assignment UI

Goal:
Replace the disabled assignment button with a real control that calls the shared API client and updates the detail view.

Suggested commit theme:
`feat: add assignment controls to ticket detail`

Expected DevDive behavior:

- Commit analysis should identify frontend progress.
- At least one frontend-labelled task should move forward.
- The planner's design notes should still align because the shared API client remains the integration path.

### Scenario 3: break CI intentionally

Goal:
Introduce a contract mismatch or failing test, for example by changing the assignment payload shape in one layer only.

Suggested commit theme:
`test: reproduce assignment contract mismatch`

Expected DevDive behavior:

- GitHub Actions should switch from passing to failing.
- The CI watcher should update `devdive.json`.
- A nudge should be generated because the failure is a state transition, not a steady-state failure.

### Scenario 4: introduce architectural drift

Goal:
Implement a feature in the wrong layer, such as bypassing `shared/api.ts` from the frontend or storing audit history only in local component state.

Suggested commit theme:
`feat: quick audit log prototype`

Expected DevDive behavior:

- `devdive review` should report at least one warning or critical finding.
- Findings should mention a mismatch with shared contracts, persistence boundaries, or the planned admin-only audit path.
- A critical finding should also trigger a nudge.

## Rollback check

After any of the scenarios above, capture a prior `devdive.json` state SHA and verify:

```bash
devdive rollback --sha <commit-sha>
```

Expected result:

- Local state reverts to the selected dashboard state.
- The rollback itself becomes a new state commit in GitHub history.
