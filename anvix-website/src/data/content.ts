import type {
  ProcessStep,
  Reason,
  Service,
  Stat,
  TechnologyGroup,
  ValueCard,
  FaqItem,
} from '@/types'

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const heroLabels = [
  'Software',
  'AI',
  'Mobile',
  'Web',
  'Marketing',
  'Voice AI',
  'Innovation',
]

export const heroLines = ['We Build', 'Digital Experiences', 'That Matter.'] as const

export const heroStatsPreview: Stat[] = [
  { id: 'projects', value: 6, suffix: '+', label: 'Projects Delivered', detail: 'Shipped products across web and mobile.' },
  { id: 'partners', value: 2, suffix: '', label: 'Founding Partners', detail: 'Engineering and operations leadership.' },
  { id: 'solutions', value: 6, suffix: '+', label: 'Technology Solutions', detail: 'Practice areas we deliver end to end.' },
  { id: 'commitment', value: 100, suffix: '%', label: 'Commitment', detail: 'To quality, deadlines and support.' },
]

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const valueCards: ValueCard[] = [
  {
    index: '01',
    title: 'Innovation',
    body: 'Exploring modern technologies to solve real-world problems.',
    icon: 'sparkles',
  },
  {
    index: '02',
    title: 'Engineering',
    body: 'Building reliable, scalable and maintainable digital products.',
    icon: 'layers',
  },
  {
    index: '03',
    title: 'Partnership',
    body: 'Working closely with clients to transform ideas into practical solutions.',
    icon: 'shield',
  },
]

export const services: Service[] = [
  {
    id: 'svc-web',
    title: 'Web Development',
    body: 'Fast, responsive web platforms built on modern React architecture — from dashboards to customer portals.',
    capabilities: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
  },
  {
    id: 'svc-mobile',
    title: 'Mobile Applications',
    body: 'Cross-platform mobile products designed for real-world usage, offline behaviour and store release.',
    capabilities: ['React Native', 'Expo', 'Firebase', 'Push notifications', 'Store release'],
  },
  {
    id: 'svc-ai',
    title: 'AI-Powered Solutions',
    body: 'Practical AI and automation applied where it genuinely reduces effort, cost and manual work.',
    capabilities: ['LLMs', 'AI agents', 'RAG search', 'Workflow automation', 'Chat assistants'],
  },
  {
    id: 'svc-software',
    title: 'Custom Software',
    body: 'Bespoke business software and management systems shaped around how your organisation actually operates.',
    capabilities: ['Business systems', 'Admin dashboards', 'Billing', 'Role-based access', 'Integrations'],
  },
  {
    id: 'svc-marketing',
    title: 'Digital Marketing',
    body: 'Growth campaigns that bring the right customers to your product — search, social and paid media, measured against real leads and sales rather than vanity numbers.',
    capabilities: ['SEO', 'Google Ads', 'Meta Ads', 'Social media', 'Analytics & reporting'],
  },
  {
    id: 'svc-voice',
    title: 'AI Auto Voice Generation',
    body: 'Natural, human-like AI voices for videos, ads, IVR and announcements — generated automatically from your script in multiple Indian and global languages.',
    capabilities: ['Text-to-speech', 'Multilingual voices', 'Voice-overs', 'IVR & call flows', 'Automated narration'],
  },
]

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export const processSteps: ProcessStep[] = [
  {
    index: '01',
    title: 'Discover',
    body: 'Understand the business, users and requirements.',
    deliverable: 'Requirements brief',
  },
  {
    index: '02',
    title: 'Plan',
    body: 'Define the architecture, features and development roadmap.',
    deliverable: 'Architecture & roadmap',
  },
  {
    index: '03',
    title: 'Design',
    body: 'Create a clear, intuitive and modern user experience.',
    deliverable: 'UI/UX design',
  },
  {
    index: '04',
    title: 'Build',
    body: 'Develop, test and integrate the complete solution.',
    deliverable: 'Working product',
  },
  {
    index: '05',
    title: 'Launch',
    body: 'Deploy, monitor and continuously improve the product.',
    deliverable: 'Deployment & support',
  },
]

/* ------------------------------------------------------------------ */
/* Why ANVIX                                                           */
/* ------------------------------------------------------------------ */

export const reasons: Reason[] = [
  { index: '01', title: 'Real-World Solutions', body: 'Software is judged by the problem it removes, not the features it lists.' },
  { index: '02', title: 'Modern Technology', body: 'A current, well-chosen stack that stays maintainable as your product grows.' },
  { index: '03', title: 'Transparent Communication', body: 'Clear scope, honest timelines and a direct line to the people building your product.' },
  { index: '04', title: 'Scalable Architecture', body: 'Structures that start lean and hold up as users, data and load increase.' },
  { index: '05', title: 'User-Centered Design', body: 'Interfaces designed around actual workflows, not assumptions.' },
  { index: '06', title: 'Long-Term Support', body: 'Post-launch maintenance, updates and improvements — not a handover and goodbye.' },
]

/* ------------------------------------------------------------------ */
/* Technology stack                                                    */
/* ------------------------------------------------------------------ */

export const technologyGroups: TechnologyGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend & Mobile',
    items: [
      { name: 'React 19', note: 'Modern component architecture', icon: 'code' },
      { name: 'Next.js', note: 'SSR, SEO-ready web apps', icon: 'gauge' },
      { name: 'TypeScript', note: 'Type-safe codebases', icon: 'shield' },
      { name: 'Tailwind CSS', note: 'Utility-first styling', icon: 'sparkles' },
      { name: 'React Native + Expo', note: 'Cross-platform mobile', icon: 'layers' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: [
      { name: 'Node.js', note: 'Server runtime', icon: 'code' },
      { name: 'Express / NestJS', note: 'REST & GraphQL APIs', icon: 'layers' },
      { name: 'Python / FastAPI', note: 'AI & data services', icon: 'workflow' },
    ],
  },
  {
    id: 'data',
    label: 'Database / Cloud',
    items: [
      { name: 'PostgreSQL + Supabase', note: 'Relational data, realtime', icon: 'database' },
      { name: 'Firebase', note: 'Auth, Firestore, hosting', icon: 'cloud' },
      { name: 'MongoDB', note: 'Document data modelling', icon: 'database' },
      { name: 'AWS', note: 'Scalable cloud infrastructure', icon: 'cloud' },
    ],
  },
  {
    id: 'tools',
    label: 'DevOps & Tools',
    items: [
      { name: 'Git + GitHub', note: 'Version control & reviews', icon: 'git' },
      { name: 'GitHub Actions', note: 'CI/CD pipelines', icon: 'workflow' },
      { name: 'Docker', note: 'Containerised deployment', icon: 'layers' },
      { name: 'Vercel', note: 'Deployment & edge CDN', icon: 'cloud' },
    ],
  },
  {
    id: 'ai',
    label: 'AI & Voice',
    items: [
      { name: 'Large Language Models', note: 'Claude, GPT & Gemini', icon: 'sparkles' },
      { name: 'AI Agents & RAG', note: 'Assistants on your own data', icon: 'bot' },
      { name: 'AI Voice Generation', note: 'Text-to-speech, voice-overs', icon: 'mic' },
      { name: 'Automation', note: 'n8n & workflow automation', icon: 'workflow' },
    ],
  },
  {
    id: 'marketing',
    label: 'Digital Marketing',
    items: [
      { name: 'SEO', note: 'Search visibility & content', icon: 'search' },
      { name: 'Google & Meta Ads', note: 'Paid campaigns that convert', icon: 'megaphone' },
      { name: 'Social Media', note: 'Content & brand presence', icon: 'sparkles' },
      { name: 'Google Analytics 4', note: 'Tracking & reporting', icon: 'chart' },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const faqs: FaqItem[] = [
  {
    question: 'How do you price a project?',
    answer:
      'Pricing follows scope, complexity and timeline. After a discovery call we share a written proposal with a clear breakdown of deliverables, milestones and payment stages — no vague estimates.',
  },
  {
    question: 'What happens after I get in touch?',
    answer:
      'We respond within one business day, hold a short call to understand the requirement, and follow up with a proposed approach, timeline and estimate.',
  },
  {
    question: 'Do you work with clients outside your city?',
    answer:
      'Yes. We work remotely with clients across India and outside, using regular calls, shared progress updates and staging environments so you always see the current state of the product.',
  },
  {
    question: 'Do you offer support after launch?',
    answer:
      'Yes. Every project includes a support window after release, and we offer ongoing maintenance, updates and feature development as your product grows.',
  },
  {
    question: 'Can you take over an existing codebase?',
    answer:
      'We can. We start with a short technical review to assess the code, dependencies and current state, then recommend whether to continue, improve or rebuild specific parts.',
  },
]
