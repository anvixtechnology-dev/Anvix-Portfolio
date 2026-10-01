import type { TeamMember } from '@/types'

/**
 * Founding partners.
 *
 * `image` is intentionally optional. Drop a portrait into
 * `/public/assets/images/` (e.g. `tamiri-chetan.jpg`) and set the path here —
 * the card swaps the placeholder for the real photograph automatically.
 */
export const team: TeamMember[] = [
  {
    id: 'tm-tamiri-chetan-anand',
    index: '01',
    name: 'Tamiri Chetan Anand',
    role: 'Co-Founder & Technology Lead',
    tagline: 'Technology strategy, architecture and engineering',
    description:
      'Responsible for technology strategy, product development, software architecture and engineering at ANVIX Technologies.',
    areas: [
      'Technology Strategy',
      'Product Development',
      'Software Architecture',
      'Engineering',
    ],
    skills: [
      'Full Stack Development',
      'Mobile Application Development',
      'Cloud Technologies',
      'Product Engineering',
      'Software Architecture',
    ],
    image: undefined,
    email: 'hello@anvixtechnologies.com',
    location: 'Bhimavaram, Andhra Pradesh',
    socials: [
      { label: 'Email', href: 'mailto:hello@anvixtechnologies.com', icon: 'mail' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/anvix-technologies', icon: 'linkedin' },
      { label: 'GitHub', href: 'https://github.com/anvix-technologies', icon: 'github' },
    ],
  },
  {
    id: 'tm-sangisetti-gayathri-naga-pravallika',
    index: '02',
    name: 'Sangisetti Gayathri Naga Pravallika',
    role: 'Co-Founder & Business / Operations Lead',
    tagline: 'Operations, client relationships and growth',
    description:
      'Responsible for business operations, coordination, client relationships and strategic growth initiatives at ANVIX Technologies.',
    areas: [
      'Business Operations',
      'Client Relations',
      'Project Coordination',
      'Strategy',
      'Growth',
    ],
    skills: [
      'Business Operations',
      'Client Relations',
      'Project Coordination',
      'Strategy',
      'Growth',
    ],
    image: undefined,
    email: 'hello@anvixtechnologies.com',
    location: 'Bhimavaram, Andhra Pradesh',
    socials: [
      { label: 'Email', href: 'mailto:hello@anvixtechnologies.com', icon: 'mail' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/anvix-technologies', icon: 'linkedin' },
    ],
  },
]
