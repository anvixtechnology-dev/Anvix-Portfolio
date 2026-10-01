/**
 * ANVIX Technologies — core content models.
 *
 * Every content-driven section of the site renders from these interfaces so the
 * data can later be swapped from static modules to a CMS / admin dashboard API
 * without touching UI components.
 */

/* ------------------------------------------------------------------ */
/* Shared primitives                                                   */
/* ------------------------------------------------------------------ */

export type WithId = { id: string }

export type IconName =
  | 'code'
  | 'layers'
  | 'shield'
  | 'gauge'
  | 'git'
  | 'cloud'
  | 'database'
  | 'sparkles'
  | 'bot'
  | 'workflow'

/* ------------------------------------------------------------------ */
/* Projects                                                             */
/* ------------------------------------------------------------------ */

export type ProjectCategory =
  | 'Business Management System'
  | 'Mobile Application'
  | 'Architecture / Planning Technology'
  | 'Vaasthu / Mobile Application'

/** Categories used by the project filter bar. */
export interface ProjectCategoryOption {
  label: string
  value: 'all' | ProjectCategory
  count: number
}

export type ProjectLink = {
  label: string
  href: string
  external?: boolean
}

export interface ProjectGalleryItem {
  id: string
  title: string
  description: string
  /** When no image is supplied a branded placeholder is rendered instead. */
  image?: string
  kind: 'dashboard' | 'mobile' | 'planning' | 'reference'
}

export interface ProjectFeature {
  title: string
  detail?: string
}

export interface Project extends WithId {
  index: string
  slug: string
  name: string
  category: ProjectCategory
  /** Short line used on the project card. */
  summary: string
  description: string
  year: string
  role: string
  platforms: string[]
  accent: 'azure' | 'steel' | 'mist'
  technologies: string[]
  features: ProjectFeature[]
  overview: string
  problem: string
  solution: string
  approach: { phase: string; detail: string }[]
  results: { metric: string; label: string }[]
  outcomes: string[]
  gallery: ProjectGalleryItem[]
  links: ProjectLink[]
  image?: string
}

/* ------------------------------------------------------------------ */
/* Team                                                                 */
/* ------------------------------------------------------------------ */

export interface SocialLink {
  label: string
  href: string
  icon: 'mail' | 'linkedin' | 'github' | 'phone' | 'globe'
}

export interface TeamMember extends WithId {
  index: string
  name: string
  role: string
  tagline: string
  description: string
  areas: string[]
  skills: string[]
  /** Supply a real portrait path (e.g. /assets/images/tamiri.jpg) to replace the placeholder. */
  image?: string
  email?: string
  phone?: string
  location: string
  socials: SocialLink[]
}

/* ------------------------------------------------------------------ */
/* Careers                                                              */
/* ------------------------------------------------------------------ */

export type EmploymentType =
  | 'Full Time'
  | 'Part Time'
  | 'Contract'
  | 'Internship'
  | 'Remote'

export interface JobOpening extends WithId {
  slug: string
  title: string
  type: EmploymentType
  department: string
  location: string
  mode: 'On-site' | 'Hybrid' | 'Remote'
  experience: string
  skills: string[]
  description: string
  responsibilities: string[]
  openings: number
  featured?: boolean
  postedAt: string
}

/* ------------------------------------------------------------------ */
/* Contact & applications (form payloads)                               */
/* ------------------------------------------------------------------ */

export interface ContactEnquiry {
  name: string
  email: string
  phone: string
  company: string
  projectType: string
  budgetRange: string
  message: string
}

export interface JobApplication {
  jobId: string
  jobTitle: string
  name: string
  email: string
  phone: string
  experience: string
  portfolio: string
  resume: File | null
  message: string
}

export type SubmitState = 'idle' | 'loading' | 'success' | 'error'

/* ------------------------------------------------------------------ */
/* Static content models                                                */
/* ------------------------------------------------------------------ */

export interface Stat {
  id: string
  value: number
  suffix: string
  label: string
  detail: string
}

export interface ValueCard {
  index: string
  title: string
  body: string
  icon: IconName
}

export interface TechnologyGroup {
  id: string
  label: string
  items: { name: string; note: string; icon: IconName }[]
}

export interface ProcessStep {
  index: string
  title: string
  body: string
  deliverable: string
}

export interface Reason {
  index: string
  title: string
  body: string
}

export interface Service {
  id: string
  title: string
  body: string
  capabilities: string[]
}

export interface FaqItem {
  question: string
  answer: string
}

export interface SocialPlatform {
  label: string
  href: string
  icon: 'linkedin' | 'github' | 'x' | 'instagram' | 'mail'
}
