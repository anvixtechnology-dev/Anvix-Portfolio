import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Tailwind-aware className merger used across every component. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
