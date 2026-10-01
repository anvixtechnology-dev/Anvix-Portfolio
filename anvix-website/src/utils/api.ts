/**
 * API adapter — the single seam between the UI and a future backend.
 *
 * Today the adapter simulates a network round-trip so the interface, loading
 * states and success/error handling are already production-shaped. To go live,
 * replace the bodies below with `fetch('/api/...')` calls (or a Supabase /
 * Firebase client) — no component changes required.
 */

import type { ContactEnquiry, JobApplication } from '@/types'

const LATENCY_MS = 850

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export interface ApiResult<T = unknown> {
  ok: boolean
  status: number
  data: T | null
  message?: string
}

export const api = {
  async submitEnquiry(payload: ContactEnquiry): Promise<ApiResult<{ id: string }>> {
    await wait(LATENCY_MS)
    if (!payload.email.includes('@')) {
      return { ok: false, status: 422, data: null, message: 'Invalid email address.' }
    }
    return { ok: true, status: 201, data: { id: `enq_${Date.now()}` } }
  },

  async submitApplication(payload: JobApplication): Promise<ApiResult<{ id: string }>> {
    await wait(LATENCY_MS + 250)
    if (!payload.resume) {
      return { ok: false, status: 422, data: null, message: 'Resume attachment is required.' }
    }
    return { ok: true, status: 201, data: { id: `app_${Date.now()}` } }
  },
}
