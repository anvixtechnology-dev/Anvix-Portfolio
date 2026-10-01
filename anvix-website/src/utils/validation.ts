/**
 * Lightweight, dependency-free validation helpers.
 *
 * They are intentionally framework agnostic so the same rules can run on the
 * server / an admin dashboard when the real API is connected.
 */

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/
/** Indian + international formats: 10 digits, or with country code / separators. */
export const PHONE_PATTERN = /^[+]?[0-9][0-9\s\-()]{7,17}$/
export const URL_PATTERN = /^(https?:\/\/)?([\w-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/

export const isEmail = (value: string) => EMAIL_PATTERN.test(value.trim())
export const isPhone = (value: string) => PHONE_PATTERN.test(value.trim())
export const isUrl = (value: string) => URL_PATTERN.test(value.trim())

export const isNonEmpty = (value: string) => value.trim().length > 0

export const MIN_MESSAGE_LENGTH = 12

export const MAX_RESUME_BYTES = 5 * 1024 * 1024 // 5 MB
export const RESUME_ACCEPT = '.pdf,.doc,.docx'

/** Human readable byte size, e.g. 1.4 MB */
export const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/** Trims a string and collapses repeated whitespace. */
export const tidy = (value: string) => value.replace(/\s+/g, ' ').trim()
