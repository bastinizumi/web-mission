import Service from '../models/Service.js';
import Project from '../models/Project.js';
import Faq from '../models/Faq.js';

export const SERVICES_SEED = [
  {
    slug: 'ui-ux-web-design',
    number: '01',
    title: 'UI/UX & Web Design',
    subtitle: 'Bespoke Visual Systems & Interactive Interfaces',
    description:
      'Innovative, mobile-responsive, and customized website designs crafted to reflect your brand identity and turn first impressions into measurable engagement.',
    deliverables: [
      'Wireframing & Interactive Prototypes',
      'Design Systems & Brand Identity',
      'Motion & Micro-Interaction Craft',
      'Conversion-Focused Landing Pages',
    ],
    image: '/images/service-uiux.jpg',
    accentColor: '#38bdf8',
    order: 1,
  },
  {
    slug: 'web-development',
    number: '02',
    title: 'Web Development',
    subtitle: 'High-Performance Full-Stack Engineering',
    description:
      'Custom web applications, e-commerce platforms, and scalable enterprise software engineered with modern MERN and full-stack architectures.',
    deliverables: [
      'Custom MERN & Next.js Web Apps',
      'E-Commerce & Payment Integrations',
      'Headless CMS & REST/GraphQL APIs',
      'Core Web Vitals & Speed Optimization',
    ],
    image: '/images/about-craft.jpg',
    accentColor: '#2dd4bf',
    order: 2,
  },
  {
    slug: 'digital-marketing',
    number: '03',
    title: 'Digital Marketing & SEO',
    subtitle: 'Data-Driven Growth & Search Dominance',
    description:
      'Target-driven digital marketing, technical SEO, and performance campaigns built to skyrocket organic visibility, qualified leads, and revenue.',
    deliverables: [
      'Technical & Local Chennai SEO',
      'Performance Ads & Lead Funnels',
      'Social Media Brand Growth',
      'Analytics & Conversion Tracking',
    ],
    image: '/images/service-marketing.jpg',
    accentColor: '#818cf8',
    order: 3,
  },
  {
    slug: 'app-development',
    number: '04',
    title: 'App Development',
    subtitle: 'Cross-Platform Mobile & Product Engineering',
    description:
      'Seamless mobile and web applications engineered for reliability, fluid animations, and effortless scaling as your customer base grows.',
    deliverables: [
      'iOS & Android Cross-Platform Apps',
      'Real-Time Dashboards & Portals',
      'Cloud-Native Backend APIs',
      'Ongoing Maintenance & Scaling',
    ],
    image: '/images/service-app.jpg',
    accentColor: '#22d3ee',
    order: 4,
  },
];

export const PROJECTS_SEED = [
  {
    slug: 'floral-boutique-gift-shop',
    title: 'Floral Boutique & Gift Shop',
    clientName: 'Bespoke Floral & Wedding Boutique',
    category: 'E-Commerce',
    tags: ['E-Commerce', 'UI/UX Design', 'Web Development'],
    headline: 'Curated Bridal Garlands & Artisanal Gifting Storefront',
    summary:
      'A high-converting visual commerce experience celebrating traditional South Indian wedding florals with effortless catalog browsing, custom order inquiries, and mobile-first checkout.',
    impactMetric: '3.2x Online Inquiries',
    image: '/images/proj-floral.jpg',
    accent: '#f472b6',
    featured: true,
    order: 1,
  },
  {
    slug: 'esports-gaming-portal',
    title: 'E-Sports & Gaming Portal',
    clientName: 'RB Gaming Lounge',
    category: 'UI/UX Design',
    tags: ['UI Design', 'UX Design', 'Web Development'],
    headline: 'Level Up Your Next-Gen Gaming Experience',
    summary:
      'A kinetic dark-mode gaming arena & tournament portal featuring instant WhatsApp slot booking, live event showcases, and high-contrast esports aesthetics.',
    impactMetric: '68% Faster Booking Flow',
    image: '/images/proj-gaming.jpg',
    accent: '#ef4444',
    featured: true,
    order: 2,
  },
  {
    slug: 'architectural-construction-firm',
    title: 'Architectural & Construction Firm',
    clientName: 'SS Constructions',
    category: 'Web Development',
    tags: ['Corporate Site', 'UI Design', 'Web Design'],
    headline: 'Crafting Quality Homes with Excellence',
    summary:
      'Corporate digital flagship for residential and commercial builders showcasing structural milestones, transparent turnkey packages, and direct consultation triggers.',
    impactMetric: '2.4x Qualified Leads',
    image: '/images/proj-construction.jpg',
    accent: '#38bdf8',
    featured: true,
    order: 3,
  },
  {
    slug: 'solar-energy-green-power',
    title: 'Solar Energy & Green Power Solutions',
    clientName: 'Enerjoy Solar',
    category: 'Web Development',
    tags: ['CleanTech', 'UI/UX Design', 'Website Design'],
    headline: 'Brighten Tomorrow With Clean Solar Energy',
    summary:
      'CleanTech corporate platform engineered to educate commercial & residential buyers on solar ROI with instant quote requests and project telemetry galleries.',
    impactMetric: '45% Quote Conversion Lift',
    image: '/images/proj-solar.jpg',
    accent: '#2dd4bf',
    featured: true,
    order: 4,
  },
  {
    slug: 'event-catering-culinary-services',
    title: 'Event Catering & Culinary Services',
    clientName: 'Sri Annapurani Catering',
    category: 'UI/UX Design',
    tags: ['Branding', 'UI/UX Design', 'Responsive Design'],
    headline: 'Making Every Event Memorable',
    summary:
      'Heritage culinary showcase blending authentic South Indian hospitality with interactive menu exploration, value-added event packages, and direct WhatsApp enquiry.',
    impactMetric: '4.1x Event Bookings',
    image: '/images/proj-catering.jpg',
    accent: '#34d399',
    featured: true,
    order: 5,
  },
  {
    slug: 'luxury-interior-architecture-studio',
    title: 'Luxury Interior & Architecture Studio',
    clientName: 'Twinstone Interiors',
    category: 'UI/UX Design',
    tags: ['Interior Design', 'UI Design', 'Branding'],
    headline: 'Designing Your Dream Spaces, One Room at a Time',
    summary:
      'Editorial portfolio & uPVC architectural showcase tailored for discerning homeowners, pairing warm architectural photography with streamlined consultation booking.',
    impactMetric: '92% Mobile Engagement',
    image: '/images/proj-interior.jpg',
    accent: '#fbbf24',
    featured: true,
    order: 6,
  },
  {
    slug: 'ias-academy-civil-services-portal',
    title: 'IAS Academy & Civil Services Portal',
    clientName: 'Keystone IAS Academy',
    category: 'Enterprise',
    tags: ['Educational Portal', 'UI/UX Design', 'Web Development'],
    headline: 'Empowering Future Civil Servants & Leaders',
    summary:
      'Structured academic portal featuring daily current affairs modules, structured course pathways, mentorship highlights, and seamless student admission workflows.',
    impactMetric: '10k+ Monthly Readers',
    image: '/images/proj-academy.jpg',
    accent: '#60a5fa',
    featured: true,
    order: 7,
  },
  {
    slug: 'enterprise-business-b2b-solutions',
    title: 'Enterprise Business & B2B Solutions',
    clientName: 'Balaji Enterprises',
    category: 'Enterprise',
    tags: ['Enterprise', 'UI/UX Design', 'Web Development'],
    headline: 'Eco-Innovations That Drive Environmental Change',
    summary:
      'B2B industrial sustainability platform communicating cost-effective waste treatment technologies, compliance credentials, and rapid pickup scheduling.',
    impactMetric: '3x B2B RFQs',
    image: '/images/proj-enterprise.jpg',
    accent: '#10b981',
    featured: true,
    order: 8,
  },
];

export const FAQS_SEED = [
  {
    question: 'What services does WebMission provide?',
    answer:
      'We specialize in creative web design, custom website development, e-commerce solutions, mobile app development, and data-driven digital marketing strategies to help your business grow online.',
    order: 1,
  },
  {
    question: 'How long does it take to complete a project?',
    answer:
      'A bespoke marketing or corporate website typically launches in 2 to 4 weeks, while custom MERN full-stack web applications and e-commerce platforms take 4 to 8 weeks depending on integrations and scope.',
    order: 2,
  },
  {
    question: 'Do you build SEO-optimized and mobile-responsive websites?',
    answer:
      'Yes. Every website we craft in Chennai and beyond is engineered mobile-first with clean semantic markup, fast Core Web Vitals, technical SEO structure, and smooth hardware-accelerated animations.',
    order: 3,
  },
  {
    question: 'Can you redesign an existing website while keeping our content?',
    answer:
      'Absolutely. We preserve your proven brand messaging, service offerings, and portfolio content while completely transforming the visual identity, UX architecture, scroll choreography, and conversion performance.',
    order: 4,
  },
  {
    question: 'Do you offer ongoing maintenance and digital marketing support?',
    answer:
      'Yes. Since 2017, we have partnered with clients long-term for hosting care, feature scaling, technical SEO, and ROI-focused digital marketing campaigns.',
    order: 5,
  },
];

export async function ensureSeeded() {
  const [svcCount, projCount, faqCount] = await Promise.all([
    Service.countDocuments(),
    Project.countDocuments(),
    Faq.countDocuments(),
  ]);

  if (svcCount === 0) {
    await Service.insertMany(SERVICES_SEED);
    console.log(`[SEED] Inserted ${SERVICES_SEED.length} services`);
  }
  if (projCount === 0) {
    await Project.insertMany(PROJECTS_SEED);
    console.log(`[SEED] Inserted ${PROJECTS_SEED.length} projects`);
  }
  if (faqCount === 0) {
    await Faq.insertMany(FAQS_SEED);
    console.log(`[SEED] Inserted ${FAQS_SEED.length} FAQs`);
  }
}

