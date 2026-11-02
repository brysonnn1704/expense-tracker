export const DEFAULT_CATEGORIES = [
  { id: 'housing', name: 'Housing & Rent', color: '#6366F1', icon: 'Home', defaultBudget: 25000 },
  { id: 'food', name: 'Food & Dining', color: '#F59E0B', icon: 'Utensils', defaultBudget: 12000 },
  { id: 'transport', name: 'Transportation', color: '#3B82F6', icon: 'Car', defaultBudget: 5000 },
  { id: 'utilities', name: 'Utilities & Bills', color: '#10B981', icon: 'Zap', defaultBudget: 4000 },
  { id: 'entertainment', name: 'Entertainment', color: '#EC4899', icon: 'Film', defaultBudget: 6000 },
  { id: 'shopping', name: 'Shopping', color: '#8B5CF6', icon: 'ShoppingBag', defaultBudget: 8000 },
  { id: 'health', name: 'Health & Fitness', color: '#14B8A6', icon: 'HeartPulse', defaultBudget: 3500 },
  { id: 'misc', name: 'Miscellaneous', color: '#64748B', icon: 'Layers', defaultBudget: 3000 },
];

export const INCOME_CATEGORIES = [
  { id: 'salary', name: 'Salary', color: '#10B981', icon: 'Briefcase' },
  { id: 'freelance', name: 'Freelance & Projects', color: '#06B6D4', icon: 'Laptop' },
  { id: 'investment', name: 'Investments & Dividends', color: '#8B5CF6', icon: 'TrendingUp' },
  { id: 'other_income', name: 'Other Income', color: '#F59E0B', icon: 'PlusCircle' },
];

export const SEED_TRANSACTIONS = [
  {
    id: 'tx-1',
    title: 'Monthly Tech Salary',
    amount: 85000,
    type: 'income',
    category: 'salary',
    date: '2026-11-01',
    notes: 'Primary monthly compensation direct deposit'
  },
  {
    id: 'tx-2',
    title: 'Apartment Rent & Maintenance',
    amount: 22000,
    type: 'expense',
    category: 'housing',
    date: '2026-11-01',
    notes: 'Monthly residential lease transfer'
  },
  {
    id: 'tx-3',
    title: 'Gourmet Grocery & Organics',
    amount: 3450,
    type: 'expense',
    category: 'food',
    date: '2026-11-01',
    notes: 'Weekly whole foods and pantry replenishment'
  },
  {
    id: 'tx-4',
    title: 'Fiber Internet & Electricity Bill',
    amount: 2100,
    type: 'expense',
    category: 'utilities',
    date: '2026-10-30',
    notes: 'Broadband connection and monthly utility'
  },
  {
    id: 'tx-5',
    title: 'Frontend Freelance Milestone',
    amount: 28000,
    type: 'income',
    category: 'freelance',
    date: '2026-10-29',
    notes: 'React client UI dashboard delivery'
  },
  {
    id: 'tx-6',
    title: 'Metro Pass & Uber Transit',
    amount: 1450,
    type: 'expense',
    category: 'transport',
    date: '2026-10-28',
    notes: 'Commute and city ride-hailing'
  },
  {
    id: 'tx-7',
    title: 'Weekend Dining & Social',
    amount: 2800,
    type: 'expense',
    category: 'food',
    date: '2026-10-26',
    notes: 'Team dinner celebration'
  },
  {
    id: 'tx-8',
    title: 'Gym & Fitness Membership',
    amount: 1800,
    type: 'expense',
    category: 'health',
    date: '2026-10-24',
    notes: 'Quarterly athletic pass'
  },
  {
    id: 'tx-9',
    title: 'Mutual Fund SIP & Equity',
    amount: 15000,
    type: 'expense',
    category: 'misc',
    date: '2026-10-20',
    notes: 'Automated index fund allocation'
  }
];
