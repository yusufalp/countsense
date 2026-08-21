import type { Database } from '../db/database.types'
import type { Budget } from '../types/budget'
import type { Expense, Income, Transaction } from '../types/transaction'
import type { Saving } from '../types/saving'
import type { Investment } from '../types/investment'

type BudgetRow = Database['budgets']
type TransactionRow = Database['transactions']
type SavingRow = Database['savings']
type InvestmentRow = Database['investments']

function toNumber(value: string | null | undefined): number {
  if (value === null || value === '') return 0
  return Number(value)
}

function toOptionalNumber(
  value: string | null | undefined,
): number | undefined {
  if (value === null || value === '') return undefined
  return Number(value)
}

export function mapBudget(row: BudgetRow): Budget {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    totalIncome: toNumber(row.total_income),
    totalExpenses: toNumber(row.total_expenses),
    difference: toNumber(row.difference),
    currency: row.currency ?? undefined,
    notes: row.notes ?? undefined,
    createdAt: row.created_at ?? undefined,
    updatedAt: row.updated_at ?? undefined,
  }
}

export function mapBudgets(rows: BudgetRow[]): Budget[] {
  return rows.map(mapBudget)
}

export function mapTransaction(row: TransactionRow): Transaction {
  const base = {
    id: row.id,
    budgetId: row.budget_id,
    name: row.name,
    amount: toNumber(row.amount),
    recurrence: row.recurrence,
    date: row.date ?? undefined,
    source: row.source ?? undefined,
    isRecurring: row.is_recurring ?? undefined,
    categoryId: row.category_id ?? undefined,
    notes: row.notes ?? undefined,
    createdAt: row.created_at ?? undefined,
    updatedAt: row.updated_at ?? undefined,
  }

  if (row.type === 'income') {
    return { ...base, type: 'income' } satisfies Income
  }

  return { ...base, type: 'expense' } satisfies Expense
}

export function mapTransactions(rows: TransactionRow[]): Transaction[] {
  return rows.map(mapTransaction)
}

export function mapSaving(row: SavingRow): Saving {
  return {
    id: row.id,
    budgetId: row.budget_id,
    name: row.name,
    amount: toNumber(row.amount),
    goalAmount: toOptionalNumber(row.goal_amount),
    currentTotal: toOptionalNumber(row.current_total),
    notes: row.notes ?? undefined,
    createdAt: row.created_at ?? undefined,
    updatedAt: row.updated_at ?? undefined,
  }
}

export function mapSavings(rows: SavingRow[]): Saving[] {
  return rows.map(mapSaving)
}

export function mapInvestment(row: InvestmentRow): Investment {
  return {
    id: row.id,
    budgetId: row.budget_id,
    name: row.name,
    amount: toNumber(row.amount),
    type: (row.type as Investment['type']) ?? undefined,
    expectedReturn: toOptionalNumber(row.expected_return),
    notes: row.notes ?? undefined,
    createdAt: row.created_at ?? undefined,
    updatedAt: row.updated_at ?? undefined,
  }
}

export function mapInvestments(rows: InvestmentRow[]): Investment[] {
  return rows.map(mapInvestment)
}
