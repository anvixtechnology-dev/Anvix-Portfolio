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
  'Innovation',
]

export const heroLines = ['We Build', 'Digital Experiences', 'That Matter.'] as const

export const heroStatsPreview: Stat[] = [
  { id: 'projects', value: 4, suffix: '+', label: 'Projects Delivered', detail: 'Shipped products across web and mobile.' },
  { id: 'partners', value: 2, suffix: '', label: 'Founding Partners', detail: 'Engineering and operations leadership.' },
  { id: 'solutions', value: 4, suffix: '+', label: 'Technology Solutions', detail: 'Practice areas we deliver end to end.' },
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
    capabilities: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Vercel'],
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
    capabilities: ['Generative AI', 'AI APIs', 'Workflow automation', 'Data pipelines', 'Assistants'],
  },
  {
    id: 'svc-software',
    title: 'Custom Software',
    body: 'Bespoke business software and management systems shaped around how your organisation actually operates.',
    capabilities: ['Business systems', 'Admin dashboards', 'Billing', 'Role-based access', 'Integrations'],
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
    label: 'Frontend',
    items: [
      { name: 'React', note: 'Component architecture', icon: 'code' },
      { name: 'React Native', note: 'Cross-platform mobile', icon: 'layers' },
      { name: 'TypeScript', note: 'Type-safe codebases', icon: 'shield' },
      { name: 'JavaScript', note: 'ES2020+ / modern runtime', icon: 'gauge' },
      { name: 'Tailwind CSS', note: 'Utility-first styling', icon: 'sparkles' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: [
      { name: 'Node.js', note: 'Server runtime', icon: 'code' },
      { name: 'Express.js', note: 'REST API frameworks', icon: 'layers' },
    ],
  },
  {
    id: 'data',
    label: 'Database / Cloud',
    items: [
      { name: 'Firebase', note: 'Auth, Firestore, hosting', icon: 'cloud' },
      { name: 'Supabase', note: 'Postgres + realtime', icon: 'database' },
      { name: 'MongoDB', note: 'Document data modelling', icon: 'database' },
      { name: 'PostgreSQL', note: 'Relational data', icon: 'database' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    items: [
      { name: 'Git', note: 'Version control', icon: 'git' },
      { name: 'GitHub', note: 'Repositories & CI', icon: 'git' },
      { name: 'Vercel', note: 'Deployment & edge CDN', icon: 'cloud' },
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    items: [
      { name: 'Generative AI', note: 'LLM-powered features', icon: 'sparkles' },
      { name: 'AI APIs', note: 'Model integrations', icon: 'bot' },
      { name: 'Automation', note: 'Workflow automation', icon: 'workflow' },
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
