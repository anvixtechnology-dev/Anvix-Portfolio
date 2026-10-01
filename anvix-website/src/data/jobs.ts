import type { JobOpening } from '@/types'

/**
 * Current openings. Add or remove records here (or serve them from an API)
 * and the careers section, filters and application form update automatically.
 */
export const jobs: JobOpening[] = [
  {
    id: 'job-frontend-developer',
    slug: 'frontend-developer',
    title: 'Frontend Developer',
    type: 'Full Time',
    department: 'Engineering',
    location: 'Bhimavaram, Andhra Pradesh, India',
    mode: 'Hybrid',
    experience: '1 – 3 years',
    skills: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS'],
    description:
      'Build responsive, accessible interfaces for real client products across web and mobile. You will work directly with the design and backend side of the team on production features.',
    responsibilities: [
      'Develop responsive, production-grade React interfaces.',
      'Translate designs into precise, accessible components.',
      'Collaborate on API integration and state management.',
      'Write maintainable, well-structured front-end code.',
      'Participate in code reviews and technical planning.',
    ],
    openings: 1,
    featured: true,
    postedAt: '2026-01-12',
  },
  {
    id: 'job-backend-developer',
    slug: 'backend-developer',
    title: 'Backend Developer',
    type: 'Full Time',
    department: 'Engineering',
    location: 'Bhimavaram, Andhra Pradesh, India',
    mode: 'Hybrid',
    experience: '1 – 3 years',
    skills: ['Node.js', 'Express.js', 'Firebase', 'MongoDB'],
    description:
      'Design reliable server-side systems, data models and APIs that support our web and mobile products. You will own services end to end, from schema design to deployment.',
    responsibilities: [
      'Design and build REST APIs using Node.js and Express.',
      'Model and manage data in Firebase, MongoDB and PostgreSQL.',
      'Implement authentication, authorisation and validation.',
      'Write business logic with clear boundaries and tests.',
      'Handle deployment, monitoring and performance tuning.',
    ],
    openings: 1,
    featured: true,
    postedAt: '2026-01-12',
  },
  {
    id: 'job-mobile-developer',
    slug: 'mobile-app-developer',
    title: 'Mobile App Developer',
    type: 'Full Time',
    department: 'Engineering',
    location: 'Bhimavaram, Andhra Pradesh, India',
    mode: 'Hybrid',
    experience: '1 – 2 years',
    skills: ['React Native', 'Expo', 'Firebase', 'APIs'],
    description:
      'Build and ship cross-platform mobile applications with React Native and Expo, covering data, offline behaviour, notifications and store releases.',
    responsibilities: [
      'Develop mobile applications using React Native and Expo.',
      'Integrate device APIs, permissions and third-party services.',
      'Implement offline caching and sync behaviour.',
      'Prepare builds for Google Play and the App Store.',
      'Debug issues across devices and OS versions.',
    ],
    openings: 1,
    postedAt: '2026-02-02',
  },
  {
    id: 'job-ui-ux-designer',
    slug: 'ui-ux-designer',
    title: 'UI/UX Designer',
    type: 'Full Time',
    department: 'Design',
    location: 'Bhimavaram, Andhra Pradesh, India',
    mode: 'Hybrid',
    experience: '1 – 3 years',
    skills: ['Figma', 'UX research', 'Design systems', 'Prototyping'],
    description:
      'Shape how our products look and feel — from early research and wireframes to polished, buildable interface design and design systems.',
    responsibilities: [
      'Conduct UX research and translate findings into flows.',
      'Design wireframes, prototypes and high-fidelity interfaces.',
      'Build and maintain reusable design systems.',
      'Partner with engineers on responsive implementation.',
      'Contribute to product strategy and feature scoping.',
    ],
    openings: 1,
    postedAt: '2026-02-02',
  },
  {
    id: 'job-software-intern',
    slug: 'internship-software-development',
    title: 'Internship — Software Development',
    type: 'Internship',
    department: 'Engineering',
    location: 'Bhimavaram, Andhra Pradesh, India',
    mode: 'On-site',
    experience: 'Fresher / Student',
    skills: ['JavaScript', 'React', 'Git', 'Problem Solving'],
    description:
      'A structured internship for students who want to work on real products with real requirements, real code reviews and real responsibility. Selected interns contribute to live projects.',
    responsibilities: [
      'Learn our development workflow, review standards and tooling.',
      'Contribute to real features under senior developer guidance.',
      'Build foundational skills in React, APIs and version control.',
      'Participate in code reviews and weekly technical sessions.',
      'Receive a certificate and strong reference on completion.',
    ],
    openings: 3,
    postedAt: '2026-02-10',
  },
]

export const experienceOptions = [
  'Fresher',
  'Less than 1 year',
  '1 – 2 years',
  '2 – 4 years',
  '4 – 6 years',
  '6+ years',
  'Student / Intern',
] as const
