// Lightweight expense persistence helpers reused by the settings app.
// Uses localStorage so expenses remain per-browser without needing a backend.

const STORAGE_KEY = 'appExpenses';

const sampleExpenses = [
  { id: 1, title: 'Groceries', amount: 65, category: 'Food', date: '2026-03-01', userId: 1 },
  { id: 2, title: 'Metro card', amount: 40, category: 'Transport', date: '2026-03-03', userId: 1 },
  { id: 3, title: 'Coffee', amount: 5, category: 'Food', date: '2026-03-04', userId: 1 },
];

const safeParse = (raw, fallback) => {
  try {
    return JSON.parse(raw) || fallback;
  } catch {
    return fallback;
  }
};

export const loadExpenses = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return safeParse(raw, sampleExpenses);
};

export const saveExpenses = (expenses) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch {
    // ignore storage failures (private mode, quota, etc.)
  }
};

export const addExpenseItem = (expenses, newExpense) => [
  ...expenses,
  { ...newExpense, id: newExpense.id ?? Date.now() },
];

export const deleteExpenseItem = (expenses, expenseId) =>
  expenses.filter((exp) => exp.id !== expenseId);

export const clearExpenses = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export default {
  loadExpenses,
  saveExpenses,
  addExpenseItem,
  deleteExpenseItem,
  clearExpenses,
};
