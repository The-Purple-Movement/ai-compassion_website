// Centralized Team & Coordinators Roster for AI + Compassion Global Forum 2026

export const TEAM_CATEGORIES = [
  { id: 'all', label: 'All Teams' },
  { id: 'project-management', label: 'Project Managers' },
  { id: 'regional-coordinators', label: 'Regional Coordinators' },
  { id: 'content-team', label: 'Content Team' },
  { id: 'design-team', label: 'Design Team' },
  { id: 'tech-operations', label: 'Tech & Operations' },
  { id: 'social-media', label: 'Social Media & Outreach' },
  { id: 'video-editors', label: 'Video Editors' },
];

export const TEAM_GROUPS = [
  // 1. Project Managers
  {
    id: 'project-management',
    title: 'Project Managers',
    description: 'Overseeing forum orchestration, milestone tracking, resource coordination, and cross-team operational workflows.',
    badge: 'Operations & Execution',
    members: [
      {
        name: 'Rasha Hasoon',
        role: 'Project Manager',
        team: 'Project Managers',
        img: '/rasha.png',
        slug: 'rasha-hasoon',
        focus: 'Strategic Operations & Timeline Synchronization',
      },
      {
        name: 'Jibu Mathew',
        role: 'Project Manager',
        team: 'Project Managers',
        img: '/jibu.png',
        slug: 'jibu-mathew',
        focus: 'Global Operations & Program Execution',
      },
    ],
  },

  // 2. Regional Coordinators
  {
    id: 'regional-coordinators',
    title: 'Regional Coordinators',
    description: 'Regional leads orchestrating producer synchronization, youth engagement, and cross-continental dialogues across all 12 operational relay zones.',
    badge: 'Operational Leadership',
    members: [
      {
        name: 'Adithya Baiju',
        role: 'Regional Coordinator',
        team: 'Regional Coordinators',
        img: '/coordinators/adithya-baiju.jpeg',
        slug: 'adithya-baiju',
        focus: 'UK, Ireland, Iberia & West Africa | Eastern North America, Caribbean & Northern South America',
      },
      {
        name: 'Ann Rose Mathew',
        role: 'Regional Coordinator',
        team: 'Regional Coordinators',
        img: '/coordinators/ann-rose-mathew.png',
        slug: 'ann-rose-mathew',
        focus: 'Middle East, Caucasus & Central Asia | Western North America',
      },
      {
        name: 'Jeniffer Jerald JN',
        role: 'Regional Coordinator',
        team: 'Regional Coordinators',
        img: '/coordinators/jeniffer-jerald.jpg',
        slug: 'jeniffer-jerald',
        focus: 'Australia, New Zealand, South Pacific & Southeast Asia',
      },
      {
        name: 'Kavya',
        role: 'Regional Coordinator',
        team: 'Regional Coordinators',
        img: '/coordinators/kavya.jpg',
        slug: 'kavya',
        focus: 'South Asia, Hawaiʻi, Alaska & Pacific Islands | East Asia',
      },
    ],
  },

  // 3. Content Team
  {
    id: 'content-team',
    title: 'Content Team',
    description: 'Developing editorial narratives, research dossiers, speaker storylines, and communication frameworks.',
    badge: 'Editorial & Narrative',
    members: [
      {
        name: 'Akhila Sunesh',
        role: 'Content Team',
        team: 'Content Team',
        img: '/team/akhila-sunesh.jpg',
        imgPosition: 'center 20%',
        slug: 'akhila-sunesh',
        focus: 'Editorial Content & Editorial Strategy',
      },
      {
        name: 'Beneeta Benny',
        role: 'Content Team',
        team: 'Content Team',
        img: '/team/beneeta-benny.jpg',
        imgPosition: 'center 20%',
        slug: 'beneeta-benny',
        focus: 'Narrative Architecture & Copywriting',
      },
      {
        name: 'Mohamed Suhail D',
        role: 'Content Team',
        team: 'Content Team',
        img: '/team/mohamed-suhail-d.jpg',
        imgPosition: 'center 20%',
        slug: 'mohamed-suhail-d',
        focus: 'Research & Content Strategy',
      },
      {
        name: 'Athira D R',
        role: 'Content Team',
        team: 'Content Team',
        img: '/team/athira-d-r.jpg',
        imgPosition: 'center 15%',
        slug: 'athira-d-r',
        focus: 'Editorial Research & Documentation',
      },
    ],
  },

  // 4. Design Team
  {
    id: 'design-team',
    title: 'Design Team',
    description: 'Directing brand identity, visual systems, UX/UI interfaces, and promotional creative assets.',
    badge: 'Visual Experience & Identity',
    members: [
      {
        name: 'Akshay',
        role: 'Design Team',
        team: 'Design Team',
        img: '/team/akshay.jpg',
        imgPosition: 'center 15%',
        slug: 'akshay',
        focus: 'UI/UX & Digital Experience Design',
      },
      {
        name: 'Alan Manoj',
        role: 'Design Team',
        team: 'Design Team',
        img: '/team/alan-manoj.jpg',
        imgPosition: 'center 15%',
        slug: 'alan-manoj',
        focus: 'Brand Identity & Visual Design',
      },
      {
        name: 'Asiya S',
        role: 'Design Team',
        team: 'Design Team',
        img: '/team/asiya-s.jpg',
        imgPosition: 'center 20%',
        slug: 'asiya-s',
        focus: 'Creative Direction & Graphic Design',
      },
      {
        name: 'Helan Rogy',
        role: 'Design Team',
        team: 'Design Team',
        img: '/team/helan-rogy.jpg',
        imgPosition: 'center 15%',
        slug: 'helan-rogy',
        focus: 'Visual Assets & Creative Media',
      },
    ],
  },

  // 5. Tech & Operations
  {
    id: 'tech-operations',
    title: 'Tech & Operations',
    description: 'Architecting digital platforms, live streaming systems, cloud infrastructure, and technical execution.',
    badge: 'Engineering & Infrastructure',
    members: [
      {
        name: 'Arjun M S',
        role: 'Tech & Operations',
        team: 'Tech & Operations',
        img: '/team/arjun-m-s.jpg?v=2',
        imgPosition: 'center 20%',
        slug: 'arjun-m-s',
        focus: 'Technical Architecture & Platform Engineering',
      },
      {
        name: 'G Abin Roy',
        role: 'Tech & Operations',
        team: 'Tech & Operations',
        img: '/team/g-abin-roy.jpg?v=2',
        imgPosition: 'center 20%',
        slug: 'g-abin-roy',
        focus: 'Platform Infrastructure & Systems Engineering',
      },
      {
        name: 'Adhwaith A S',
        role: 'Tech & Operations',
        team: 'Tech & Operations',
        img: '/team/adhwaith-a-s.jpg?v=2',
        imgPosition: 'center 20%',
        slug: 'adhwaith-a-s',
        focus: 'Web Systems & Digital Infrastructure',
      },
      {
        name: 'Sundara Siva Sreerag',
        role: 'Tech & Operations',
        team: 'Tech & Operations',
        img: '/team/sundara-siva-sreerag.jpg?v=2',
        imgPosition: 'center 20%',
        slug: 'sundara-siva-sreerag',
        focus: 'Systems Architecture & Digital Operations',
      },
      {
        name: 'Nikhil',
        role: 'Tech & Operations',
        team: 'Tech & Operations',
        img: '/team/nikhil.jpg',
        imgPosition: 'center 15%',
        slug: 'nikhil',
        focus: 'Platform Engineering & Technical Operations',
      },
      {
        name: 'Nash',
        role: 'Tech & Operations',
        team: 'Tech & Operations',
        img: '/nash.png',
        imgPosition: 'center 20%',
        slug: 'nash',
        focus: 'Technical Strategy & Systems Operations',
      },
    ],
  },

  // 6. Social Media & Outreach
  {
    id: 'social-media',
    title: 'Social Media & Outreach',
    description: 'Driving global campaign engagement, community partnerships, youth outreach, and audience communication.',
    badge: 'Growth & Community',
    members: [
      {
        name: 'Ekta Krishna',
        role: 'Social Media & Outreach',
        team: 'Social Media & Outreach',
        img: '/team/ekta-krishna.jpg?v=2',
        imgPosition: 'center 15%',
        slug: 'ekta-krishna',
        focus: 'Global Outreach & Community Campaigns',
      },
      {
        name: 'Diya Bhatt',
        role: 'Social Media & Outreach',
        team: 'Social Media & Outreach',
        img: '/team/diya-bhatt.jpg?v=2',
        imgPosition: 'center 15%',
        slug: 'diya-bhatt',
        focus: 'Social Strategy & Digital Campaigns',
      },
      {
        name: 'Akshat Pradeep',
        role: 'Social Media & Outreach',
        team: 'Social Media & Outreach',
        img: '/team/akshat-pradeep.jpg',
        imgPosition: 'center 20%',
        slug: 'akshat-pradeep',
        focus: 'Community Growth & Engagement Management',
      },
      {
        name: 'Anjosh J A',
        role: 'Social Media & Outreach',
        team: 'Social Media & Outreach',
        img: '/team/anjosh-j-a.jpg',
        imgPosition: 'center 15%',
        slug: 'anjosh-j-a',
        focus: 'Audience Engagement & Partner Outreach',
      },
    ],
  },

  // 7. Video Editors
  {
    id: 'video-editors',
    title: 'Video Editors',
    description: 'Crafting cinematic visual narratives, broadcast reels, keynote editing, and multimedia production for the global forum.',
    badge: 'Broadcast & Media',
    members: [
      {
        name: 'Alex Saju',
        role: 'Video Editor',
        team: 'Video Editors',
        img: '/team/alex-saju.png?v=2',
        imgPosition: 'center 20%',
        slug: 'alex-saju',
        focus: 'Broadcast Post-Production & Video Editing',
      },
      {
        name: 'Ajaydev A.',
        role: 'Video Editor',
        team: 'Video Editors',
        img: '/team/ajaydev-a.jpg?v=2',
        imgPosition: 'center 15%',
        slug: 'ajaydev-a',
        focus: 'Motion Graphics & Multimedia Production',
      },
    ],
  },
];

// Flat list of all members for easy queries
export const ALL_TEAM_MEMBERS = TEAM_GROUPS.flatMap((group) => group.members);
