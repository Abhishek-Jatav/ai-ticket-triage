export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Billing: ['refund', 'invoice', 'payment', 'charged'],
  Technical: ['error', 'bug', 'crash', 'down'],
  Account: ['login', 'password', 'account'],
  'Feature Request': ['feature', 'request', 'add'],
};

export const URGENCY_KEYWORDS: string[] = [
  'urgent',
  'asap',
  'immediately',
  'down',
];

export const PRIORITY_RULES: Record<string, string[]> = {
  P0: ['down', 'security'],
  P1: ['urgent', 'asap'],
  P2: [],
  P3: [],
};
