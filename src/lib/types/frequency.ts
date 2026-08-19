import type { FREQUENCY_OPTIONS } from '../constants/frequency'

export type Frequency = (typeof FREQUENCY_OPTIONS)[number]['value']
// → "daily" | "weekly" | "biweekly" | "monthly" | "yearly"
