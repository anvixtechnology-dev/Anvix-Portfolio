import type { SocialPlatform } from '@/types'

/**
 * Single source of truth for company identity, contact details and navigation.
 * Replace the placeholder values here when real details are available.
 */
export const site = {
  name: 'ANVIX TECHNOLOGIES',
  shortName: 'ANVIX',
  legalName: 'ANVIX Technologies',
  tagline: 'Building Ideas. Creating Technology.',
  description:
    'ANVIX Technologies is a software and technology company focused on web development, mobile applications, AI-powered solutions, AI voice generation, digital marketing, automation and custom software products.',
  url: 'https://anvixtechnologies.com',
  founded: '2024',
  email: 'anvixtechnology@gmail.com',
  phone: '+91 93911 54914',
  phoneHref: '+919391154914',
  phone2: '+91 93914 50503',
  phone2Href: '+919391450503',
  location: 'Bhimavaram, Andhra Pradesh, India',
  locationShort: 'Bhimavaram, AP, India',
  hours: 'Mon – Sat · 10:00 – 19:00 IST',
  responseTime: 'We typically reply within one business day.',
} as const

export interface NavItem {
  label: string
  href: string
  id: string
}

export const navigation: NavItem[] = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Team', href: '#team', id: 'team' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export const socials: SocialPlatform[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/anvix-technologies', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/anvix-technologies', icon: 'github' },
  { label: 'X', href: 'https://x.com/anvixtech', icon: 'x' },
  { label: 'Instagram', href: 'https://instagram.com/anvixtechnologies', icon: 'instagram' },
  { label: 'Email', href: 'mailto:anvixtechnology@gmail.com', icon: 'mail' },
]

export const footerColumns = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Team', href: '#team' },
      { label: 'Projects', href: '#projects' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Web Development', href: '#services' },
      { label: 'Mobile Development', href: '#services' },
      { label: 'AI Solutions', href: '#services' },
      { label: 'Software Development', href: '#services' },
      { label: 'Digital Marketing', href: '#services' },
      { label: 'AI Voice Generation', href: '#services' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Projects', href: '#projects' },
      { label: 'Contact', href: '#contact' },
    ],
  },
] as const

export const projectTypes = [
  'Web Platform',
  'Mobile Application',
  'AI / Automation',
  'AI Voice Generation',
  'Digital Marketing',
  'E-Commerce Website',
  'Custom Software',
  'Business Management System',
  'Not sure yet',
] as const

export const budgetRanges = [
  'Under ₹1,00,000',
  '₹1,00,000 – ₹3,00,000',
  '₹3,00,000 – ₹7,00,000',
  '₹7,00,000+',
  'Need estimation',
] as const
