import type { Project, ProjectCategoryOption } from '@/types'

/**
 * ANVIX project portfolio.
 *
 * Each record carries both the card-level summary and the full case-study data
 * used by the project detail modal. Swap this array for an API call later.
 */
export const projects: Project[] = [
  {
    id: 'prj-bhimavaram-cellphone-technician',
    index: '01',
    slug: 'bhimavaram-cellphone-technician',
    name: 'Bhimavaram Cellphone Technician',
    category: 'Business Management System',
    summary:
      'A customer and service management platform for a cellphone repair business — built around the real daily workflow of the shop.',
    description:
      'A customer and service management platform designed for a cellphone repair business. The system helps manage customer information, complaints, service details, payment status and billing.',
    year: '2025',
    role: 'Product design, full-stack development, deployment',
    platforms: ['Web application', 'Admin dashboard'],
    accent: 'azure',
    technologies: ['React', 'Firebase', 'Node.js', 'Express', 'Tailwind CSS'],
    image: undefined,
    features: [
      { title: 'Customer management', detail: 'Create, search and update customer profiles with device history.' },
      { title: 'Phone number search', detail: 'Find any record instantly from a mobile number.' },
      { title: 'Complaint tracking', detail: 'Log incoming issues and follow them through to resolution.' },
      { title: 'Payment status', detail: 'Paid, partial and pending states with outstanding balances.' },
      { title: 'Paid date tracking', detail: 'Automatic record of when each payment was settled.' },
      { title: 'Customer history', detail: 'A complete timeline of every device and repair for a customer.' },
      { title: 'Bill generation', detail: 'Print-ready invoices generated from the service record.' },
      { title: 'Admin dashboard', detail: 'Revenue, pending jobs and workload visibility at a glance.' },
      { title: 'Data management', detail: 'Secure cloud storage with role-based staff access.' },
    ],
    overview:
      'Bhimavaram Cellphone Technician needed a dependable way to stop losing repair jobs, bills and payment records in paper notebooks. ANVIX designed and built a web-based management system that mirrors how the shop already works — so adoption required almost no retraining.',
    problem:
      'Customer details, device complaints and pending payments were recorded manually. Nothing was searchable, bills took time to prepare, and there was no reliable way to know which jobs were still unpaid or which customer was returning with a repeat fault.',
    solution:
      'We built a role-based web platform where a staff member can register a customer in seconds, attach a device and complaint, track the repair status and generate a bill. Every record is searchable by phone number, and the admin dashboard surfaces revenue, pending payments and open jobs.',
    approach: [
      { phase: 'Discovery', detail: 'Shadowed the shop workflow, mapped every record kept on paper and identified the five daily actions that mattered most.' },
      { phase: 'Data model', detail: 'Designed customer, device, complaint, service and payment entities in Firestore with clean relationships.' },
      { phase: 'Interface', detail: 'Built a fast, keyboard-friendly React interface with an admin dashboard, search and print-ready invoice views.' },
      { phase: 'Build & test', detail: 'Node.js + Express middleware for billing logic, validated with real repair scenarios from the shop.' },
      { phase: 'Launch', detail: 'Deployed on Vercel with Firebase, staff training and a feedback-driven improvement cycle.' },
    ],
    results: [
      { metric: '< 20s', label: 'To register a new customer' },
      { metric: '100%', label: 'Searchable repair records' },
      { metric: '1 click', label: 'To generate a bill' },
    ],
    outcomes: [
      'Customer, complaint and payment records moved from paper to a single searchable database.',
      'Outstanding payments are visible at any time, improving follow-up and cash flow.',
      'Bill generation reduced invoice preparation time during busy repair days.',
      'The owner can review daily revenue and workload from the admin dashboard.',
    ],
    gallery: [
      { id: 'g1', kind: 'dashboard', title: 'Admin dashboard', description: 'Revenue, pending jobs and payment status overview.' },
      { id: 'g2', kind: 'dashboard', title: 'Customer records', description: 'Searchable customer list with instant phone number lookup.' },
      { id: 'g3', kind: 'dashboard', title: 'Billing & invoices', description: 'Print-ready bill generation from a service record.' },
    ],
    links: [{ label: 'Request a walkthrough', href: '#contact' }],
  },
  {
    id: 'prj-panchangam-app',
    index: '02',
    slug: 'panchangam-app',
    name: 'Panchangam App',
    category: 'Mobile Application',
    summary:
      'A mobile-first Panchangam application presenting traditional calendar data in a clean, modern and multilingual interface.',
    description:
      'A mobile application designed to provide Panchangam and traditional calendar information in a modern and accessible digital experience.',
    year: '2025',
    role: 'Product design, mobile engineering, API integration',
    platforms: ['Android', 'iOS'],
    accent: 'steel',
    technologies: ['React Native', 'Expo', 'Firebase', 'APIs'],
    features: [
      { title: 'Daily Panchangam', detail: 'Tithi, nakshatra, yoga, karana and vara for every day.' },
      { title: 'Tithi', detail: 'Computed and displayed for the user’s selected date.' },
      { title: 'Nakshatra', detail: 'Nakshatra name, lord and Pada details each day.' },
      { title: 'Muhurtham', detail: 'Auspicious time windows for important events.' },
      { title: 'Calendar', detail: 'Month and year navigation with highlighted panchangam days.' },
      { title: 'Location-based information', detail: 'Data adjusts to the user’s location for accuracy.' },
      { title: 'Multilingual interface', detail: 'Supports multiple languages with a one-tap switcher.' },
      { title: 'Mobile-first experience', detail: 'Designed and tested for real-world mobile conditions.' },
    ],
    overview:
      'Traditional panchangam information is widely needed but typically arrives through dense tables, outdated layouts or unreliable websites. We built a focused mobile application that presents the day’s information clearly, accurately and in the user’s language.',
    problem:
      'Existing Panchangam sources were difficult to read on a phone, slow on mobile data, and inconsistent across languages. Users wanted one dependable application that loads quickly and shows the day’s information immediately.',
    solution:
      'A React Native application backed by a Panchangam data API, with location awareness, offline caching for the current month, multilingual labels and a calendar view that makes planning events simple.',
    approach: [
      { phase: 'Research', detail: 'Reviewed traditional panchangam sources and defined the exact data fields users actually check daily.' },
      { phase: 'Data pipeline', detail: 'Integrated a panchangam calculation API and cached results in Firebase for offline access.' },
      { phase: 'Design', detail: 'Designed a typographic hierarchy that keeps Sanskrit terms readable and elegant on small screens.' },
      { phase: 'Build', detail: 'React Native + Expo with location permissions, language switching and calendar navigation.' },
      { phase: 'Release', detail: 'Tested across Android device sizes, then published with store-ready assets and support flows.' },
    ],
    results: [
      { metric: '< 1.5s', label: 'Cold start to daily data' },
      { metric: 'Offline', label: 'Cached current-month panchangam' },
      { metric: 'Multi', label: 'Languages supported' },
    ],
    outcomes: [
      'Daily panchangam, tithi, nakshatra and muhurtham available in a single mobile view.',
      'Offline caching means the current month is readable without a connection.',
      'Multilingual interface makes the app usable across language preferences.',
      'Calendar view supports date-based planning and event selection.',
    ],
    gallery: [
      { id: 'g1', kind: 'mobile', title: 'Daily panchangam', description: 'Tithi, nakshatra, yoga and vara for the day.' },
      { id: 'g2', kind: 'mobile', title: 'Calendar view', description: 'Month navigation with panchangam highlights.' },
      { id: 'g3', kind: 'mobile', title: 'Multilingual', description: 'One-tap language switching across the interface.' },
    ],
    links: [{ label: 'Discuss a similar app', href: '#contact' }],
  },
  {
    id: 'prj-auto-plot-layout',
    index: '03',
    slug: 'auto-plot-layout',
    name: 'Auto Plot Layout',
    category: 'Architecture / Planning Technology',
    summary:
      'A planning and visualization platform for designing residential plot layouts and building plans interactively, in the browser.',
    description:
      'A digital building-layout platform designed to help users create and manage residential plot layouts and building plans through an interactive interface.',
    year: '2025',
    role: 'Product design, front-end engineering, visualization engine',
    platforms: ['Web application'],
    accent: 'mist',
    technologies: ['React', 'JavaScript', 'Canvas', 'SVG', 'Node.js'],
    features: [
      { title: 'Plot dimensions', detail: 'Define plot length, width and orientation as the drawing base.' },
      { title: 'Building layout', detail: 'Place building footprints, walls and rooms on the plot.' },
      { title: 'Interactive planning', detail: 'Pan, zoom and edit the layout directly on the canvas.' },
      { title: 'Room configuration', detail: 'Assign room types, labels and dimensions per space.' },
      { title: 'Layout visualization', detail: 'Real-time rendering of the plan as it is edited.' },
      { title: 'Editable design', detail: 'Every element can be moved, resized and re-labelled.' },
      { title: 'User-friendly interface', detail: 'Non-technical users can produce a plan in minutes.' },
    ],
    overview:
      'Auto Plot Layout is a planning technology product: it gives users a structured canvas for turning plot dimensions into a considered building layout, then saves, revisits and shares the plan. It is a visualization tool, not a brochure site.',
    problem:
      'Residential planning was being worked out on paper or in generic drawing tools that assume CAD experience. Homeowners and planners had no way to test room arrangements, verify dimensions against a plot and visualise the result before committing to a design.',
    solution:
      'We built an interactive planning environment: enter plot dimensions, place and resize rooms on a responsive canvas, and see the layout update in real time. Plans can be saved per project, revisited later and rendered as a clear, shareable visualization.',
    approach: [
      { phase: 'Domain model', detail: 'Defined the coordinate system, plot boundary, snapping behaviour and dimension rules for room geometry.' },
      { phase: 'Interaction design', detail: 'Prototyped drag, resize, snap-to-grid and dimension-label behaviour for mouse, touch and pen.' },
      { phase: 'Visualization engine', detail: 'Built a canvas/SVG rendering layer that stays smooth with dozens of rooms and live dimension lines.' },
      { phase: 'Application layer', detail: 'React state model for rooms, levels and constraints, with Node.js persistence for saved plans.' },
      { phase: 'Refinement', detail: 'Tuned performance, added export-ready views and validated layouts against practical plot sizes.' },
    ],
    results: [
      { metric: 'Real-time', label: 'Layout rendering' },
      { metric: 'Touch', label: 'And pointer support' },
      { metric: 'Saved', label: 'Re-editable plans' },
    ],
    outcomes: [
      'Plot dimensions, rooms and building footprints are laid out on a single interactive canvas.',
      'Room configuration and dimension labels make the plan readable without CAD knowledge.',
      'Layouts are visualised live, so design decisions are validated before implementation.',
      'Saved plans remain fully editable, turning planning into an iterative process.',
    ],
    gallery: [
      { id: 'g1', kind: 'planning', title: 'Plot canvas', description: 'Interactive plot boundary with grid and dimension inputs.' },
      { id: 'g2', kind: 'planning', title: 'Room configuration', description: 'Placed, sized and labelled rooms with live measurements.' },
      { id: 'g3', kind: 'planning', title: 'Layout visualization', description: 'Finished plan rendered for review and sharing.' },
    ],
    links: [{ label: 'Request a planning demo', href: '#contact' }],
  },
  {
    id: 'prj-vishwakarma-vaasthu',
    index: '04',
    slug: 'vishwakarma-vaasthu-sarvaswam',
    name: 'Vishwakarma Vaasthu Sarvaswam',
    category: 'Vaasthu / Mobile Application',
    summary:
      'A mobile reference application presenting traditional Vaasthu knowledge and direction-based guidance in a modern interface.',
    description:
      'A mobile application combining traditional Vaasthu-related information with a modern digital experience.',
    year: '2024',
    role: 'Product design, mobile engineering, content structuring',
    platforms: ['Android', 'iOS'],
    accent: 'azure',
    technologies: ['React Native', 'Firebase', 'APIs'],
    features: [
      { title: 'Vaasthu information', detail: 'Structured, organised Vaasthu reference content.' },
      { title: 'Direction-based guidance', detail: 'Practical guidance mapped to compass directions.' },
      { title: 'Building-related information', detail: 'Contextual information for building and plot decisions.' },
      { title: 'Digital reference material', detail: 'Searchable material that is easy to browse and revisit.' },
      { title: 'Mobile interface', detail: 'Fast, focused mobile experience built for daily use.' },
      { title: 'User-friendly navigation', detail: 'Clear hierarchy so information is never more than a tap away.' },
    ],
    overview:
      'Vishwakarma Vaasthu Sarvaswam turns traditional Vaasthu material into a structured, searchable digital reference. The app organises dense subject matter so a user can find the relevant guidance quickly instead of scrolling through unstructured text.',
    problem:
      'Vaasthu knowledge is widely documented but difficult to use digitally: the material is scattered, inconsistently organised and hard to navigate on a phone. Users needed a dependable, well-structured reference they could consult quickly.',
    solution:
      'We designed a mobile application with a clear information hierarchy, direction-based sections, fast in-app search and a calm visual treatment that keeps long-form content comfortable to read.',
    approach: [
      { phase: 'Content audit', detail: 'Structured existing Vaasthu material into searchable, logical categories.' },
      { phase: 'IA & navigation', detail: 'Designed navigation that supports both browsing and direct search.' },
      { phase: 'Interface', detail: 'Created a readable long-form type system with clear section hierarchy.' },
      { phase: 'Build', detail: 'React Native application with Firebase content delivery and offline caching.' },
      { phase: 'Iteration', detail: 'Refined search relevance and reading comfort based on user feedback.' },
    ],
    results: [
      { metric: 'Searchable', label: 'Reference content' },
      { metric: 'Offline', label: 'Cached material' },
      { metric: '8', label: 'Content sections' },
    ],
    outcomes: [
      'Vaasthu reference material is organised, searchable and available offline.',
      'Direction-based guidance is easy to locate and compare.',
      'A calm, readable interface makes long-form content comfortable to browse.',
      'Content can be extended without a release, keeping the application current.',
    ],
    gallery: [
      { id: 'g1', kind: 'reference', title: 'Reference sections', description: 'Organised Vaasthu content categories.' },
      { id: 'g2', kind: 'reference', title: 'Direction guidance', description: 'Guidance mapped to compass directions.' },
      { id: 'g3', kind: 'mobile', title: 'Reading view', description: 'Comfortable long-form mobile reading experience.' },
    ],
    links: [{ label: 'Build a similar app', href: '#contact' }],
  },
]

/**
 * Filter options, derived from the project records themselves so a newly added
 * project can never be hidden by an out-of-date filter list.
 */
const categoryLabels: Partial<Record<Project['category'], string>> = {
  'Mobile Application': 'Mobile Apps',
  'Vaasthu / Mobile Application': 'Vaasthu App',
  'Architecture / Planning Technology': 'Planning Tech',
}

export const projectCategories: ProjectCategoryOption[] = [
  { label: 'All Projects', value: 'all', count: projects.length },
  ...Array.from(new Set(projects.map((project) => project.category))).map((category) => ({
    label: categoryLabels[category] ?? category,
    value: category,
    count: projects.filter((project) => project.category === category).length,
  })),
]
