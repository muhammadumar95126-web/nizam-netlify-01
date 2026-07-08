export type Module = {
  index: string;
  name: string;
  tagline: string;
  description: string;
  capabilities: string[];
  status?: "live" | "soon";
};

export const MODULES: Module[] = [
  {
    index: "01",
    name: "Service Requests",
    tagline: "Every request, one front door",
    description:
      "A single intake for every channel: portal, mobile, QR, email. Requests are classified, routed and tracked to resolution with full transparency for the requester.",
    capabilities: ["Omni-channel intake", "Smart routing", "SLA tracking", "Requester portal"],
  },
  {
    index: "02",
    name: "Incident Management",
    tagline: "From alarm to all-clear",
    description:
      "Structured escalation for the moments that matter. Severity classification, response protocols and post-incident review, codified rather than improvised.",
    capabilities: ["Severity matrix", "Escalation chains", "Live status", "Root-cause review"],
  },
  {
    index: "03",
    name: "Maintenance",
    tagline: "Planned. Preventive. Predictable.",
    description:
      "Preventive schedules and readings that keep critical systems ahead of failure. Calendars, checklists and compliance evidence generated as work happens.",
    capabilities: ["PPM scheduling", "Meter readings", "Checklists", "Compliance logs"],
  },
  {
    index: "04",
    name: "Work Orders",
    tagline: "Work that runs itself",
    description:
      "The operational unit of record. Created from any source, assigned by skill and zone, costed by labor and parts, closed with proof.",
    capabilities: ["Auto-assignment", "Labor & parts costing", "Proof of completion", "Approval flows"],
  },
  {
    index: "05",
    name: "Asset Management",
    tagline: "Know everything you own",
    description:
      "A living registry of every asset: location, condition, warranty, history and lifetime cost. Decisions on repair or replace, backed by data.",
    capabilities: ["Asset registry", "QR identity", "Lifecycle cost", "Warranty tracking"],
  },
  {
    index: "06",
    name: "Field Operations",
    tagline: "The office, in the field",
    description:
      "Mobile-first execution for distributed teams. Offline-capable tasking, geo-verified attendance and live coordination across sites.",
    capabilities: ["Offline mobile", "Geo verification", "Route optimization", "Live dispatch"],
  },
  {
    index: "07",
    name: "Inspections",
    tagline: "Standards, enforced daily",
    description:
      "Digital rounds and audits with scoring, photo evidence and automatic corrective actions when a standard is not met.",
    capabilities: ["Custom checklists", "Scored audits", "Photo evidence", "Auto follow-ups"],
  },
  {
    index: "08",
    name: "Analytics",
    tagline: "The truth, in numbers",
    description:
      "Operational intelligence across every module. SLA performance, cost per asset, team utilization: one source of truth for every decision.",
    capabilities: ["Live dashboards", "SLA analytics", "Cost intelligence", "Exportable reports"],
  },
  {
    index: "09",
    name: "NIZAM AI",
    tagline: "Operations that think ahead",
    description:
      "Predictive maintenance, intelligent triage and natural-language operations queries. The platform learns your operation, then runs ahead of it.",
    capabilities: ["Predictive maintenance", "Auto triage", "Anomaly detection", "Ask NIZAM"],
    status: "soon",
  },
];

export type Industry = {
  id: string;
  name: string;
  headline: string;
  description: string;
  modules: string[];
  flow: string[];
  stat: { value: string; label: string };
  image: string;
};

export const INDUSTRIES: Industry[] = [
  {
    id: "government",
    name: "Government",
    headline: "Public service, accountable by design",
    description:
      "Citizen requests, municipal assets and field crews governed in one auditable system, with the transparency the public sector demands.",
    modules: ["Service Requests", "Field Operations", "Analytics"],
    flow: ["Citizen report", "Departmental routing", "Crew dispatched", "Public status update"],
    stat: { value: "40%", label: "faster citizen response" },
    image: "/images/government.jpg",
  },
  {
    id: "housing",
    name: "Housing Societies",
    headline: "Communities that run like clockwork",
    description:
      "Resident complaints, shared amenities and maintenance dues handled with hotel-grade discipline, visible to every stakeholder.",
    modules: ["Service Requests", "Maintenance", "Inspections"],
    flow: ["Resident request", "Technician assigned", "Work verified", "Resident notified"],
    stat: { value: "3×", label: "resident satisfaction" },
    image: "/images/housing.jpg",
  },
  {
    id: "hotels",
    name: "Hotels",
    headline: "Invisible operations, visible luxury",
    description:
      "Guest-facing perfection depends on back-of-house precision: housekeeping rounds, engineering tickets and asset care, silent and swift.",
    modules: ["Work Orders", "Inspections", "Asset Management"],
    flow: ["Guest room flag", "Housekeeping tasked", "Engineering fix", "Quality inspection"],
    stat: { value: "<15m", label: "in-room response time" },
    image: "/images/hotels.jpg",
  },
  {
    id: "hospitals",
    name: "Hospitals",
    headline: "Uptime where it matters most",
    description:
      "Medical equipment, critical utilities and sanitation protocols managed to clinical standards, with compliance evidence built in.",
    modules: ["Asset Management", "Maintenance", "Incident Management"],
    flow: ["Equipment alert", "Biomedical dispatch", "Certified repair", "Compliance log"],
    stat: { value: "99.9%", label: "critical asset uptime" },
    image: "/images/hospitals.jpg",
  },
  {
    id: "universities",
    name: "Universities",
    headline: "A campus in perfect order",
    description:
      "Lecture halls, laboratories, dormitories and grounds: thousands of assets and daily requests, orchestrated across one campus map.",
    modules: ["Service Requests", "Work Orders", "Analytics"],
    flow: ["Faculty request", "Zone assignment", "Completion proof", "Semester reporting"],
    stat: { value: "60%", label: "less admin overhead" },
    image: "/images/universities.jpg",
  },
  {
    id: "malls",
    name: "Shopping Malls",
    headline: "Retail environments, always on",
    description:
      "Common areas, HVAC, tenant fit-outs and security incidents, coordinated across operators, tenants and contractors without friction.",
    modules: ["Incident Management", "Maintenance", "Inspections"],
    flow: ["Floor incident", "Vendor escalation", "Resolution SLA", "Tenant report"],
    stat: { value: "24/7", label: "coordinated coverage" },
    image: "/images/malls.jpg",
  },
  {
    id: "airports",
    name: "Airports",
    headline: "Zero-delay infrastructure",
    description:
      "Terminals, runways-adjacent systems and passenger facilities where minutes cost millions. Response protocols measured in seconds.",
    modules: ["Incident Management", "Field Operations", "Analytics"],
    flow: ["Terminal alert", "Priority dispatch", "Live tracking", "Ops-center closure"],
    stat: { value: "-35%", label: "disruption minutes" },
    image: "/images/airports.jpg",
  },
  {
    id: "factories",
    name: "Factories",
    headline: "Downtime, engineered out",
    description:
      "Production lines, utilities and safety inspections under preventive discipline. Every stoppage traced, every asset accountable.",
    modules: ["Maintenance", "Asset Management", "Work Orders"],
    flow: ["Line anomaly", "Preventive check", "Parts & labor", "OEE analytics"],
    stat: { value: "-28%", label: "unplanned downtime" },
    image: "/images/factories.jpg",
  },
  {
    id: "industrial",
    name: "Industrial Areas",
    headline: "Estate-scale coordination",
    description:
      "Shared infrastructure across dozens of tenants: roads, power, water, waste, managed as one estate with clear accountability.",
    modules: ["Field Operations", "Service Requests", "Maintenance"],
    flow: ["Tenant report", "Estate triage", "Contractor tasked", "Estate-wide view"],
    stat: { value: "1", label: "system for the estate" },
    image: "/images/industrial.jpg",
  },
  {
    id: "fm",
    name: "Facility Management",
    headline: "Your entire portfolio, one pane",
    description:
      "Multi-client, multi-site service delivery with contract SLAs, workforce productivity and client reporting: proof of value, automated.",
    modules: ["Work Orders", "Analytics", "Inspections"],
    flow: ["Client SLA", "Multi-site dispatch", "Verified delivery", "Client dashboard"],
    stat: { value: "100%", label: "SLA evidence" },
    image: "/images/fm.jpg",
  },
  {
    id: "enterprise",
    name: "Large Enterprises",
    headline: "Order, at any scale",
    description:
      "Campuses, branches and corporate real estate unified under one operational standard, with global visibility and local execution.",
    modules: ["Analytics", "Asset Management", "Service Requests"],
    flow: ["Branch request", "Regional routing", "Standard execution", "Global rollup"],
    stat: { value: "∞", label: "sites, one standard" },
    image: "/images/enterprise.jpg",
  },
];

export const PROBLEMS = [
  {
    index: "01",
    title: "Fragmentation",
    body: "Operations scattered across spreadsheets, chat groups and disconnected tools. No single system knows what is actually happening.",
  },
  {
    index: "02",
    title: "Invisibility",
    body: "Leaders discover problems after they become expensive. Without live operational data, every decision is a guess.",
  },
  {
    index: "03",
    title: "Slow response",
    body: "Requests pass through hands, not systems. Hours are lost in routing, days in follow-up, and accountability dissolves in between.",
  },
  {
    index: "04",
    title: "Asset blindness",
    body: "Organizations own thousands of assets they cannot see: unknown condition, expired warranties, costs that surface only at failure.",
  },
  {
    index: "05",
    title: "Unprovable work",
    body: "Work happens, but evidence doesn't. No audit trail, no compliance record, no proof of service delivered.",
  },
];

export type PricingTier = {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  ctaType: "waitlist" | "demo";
  featured?: boolean;
};

export const PRICING: PricingTier[] = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    description: "Perfect for small housing societies and single-site operations.",
    features: [
      "1 site · up to 10 users",
      "Service requests",
      "Work orders",
      "Mobile field app",
      "Basic dashboard",
      "Email support",
    ],
    cta: "Join Waitlist",
    ctaType: "waitlist",
  },
  {
    name: "Professional",
    price: "$149",
    period: "/mo",
    description: "For growing organizations managing multiple teams.",
    features: [
      "Up to 5 sites · 50 users",
      "All core modules",
      "SLA management",
      "Advanced dashboards",
      "Asset management & inspections",
      "Priority support",
    ],
    cta: "Join Waitlist",
    ctaType: "waitlist",
    featured: true,
  },
  {
    name: "Business",
    price: "$299",
    period: "/mo",
    description: "For large organizations with multiple locations.",
    features: [
      "Up to 20 sites · 250 users",
      "Everything in Professional",
      "Analytics suite",
      "API access & automation",
      "Advanced permissions",
      "Dedicated success manager",
    ],
    cta: "Join Waitlist",
    ctaType: "waitlist",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For governments and nationwide organizations.",
    features: [
      "Unlimited sites & users",
      "Custom integrations",
      "Dedicated infrastructure",
      "Private deployment options",
      "24/7 support · custom SLA",
      "Training, onboarding & account manager",
    ],
    cta: "Contact Sales",
    ctaType: "demo",
  },
];

export type RoadmapPhase = {
  quarter: string;
  title: string;
  status: "done" | "active" | "next";
  progress: number;
  items: string[];
};

export const ROADMAP: RoadmapPhase[] = [
  {
    quarter: "Q1 2026",
    title: "Foundation",
    status: "done",
    progress: 100,
    items: ["Core platform architecture", "Service requests & work orders", "Asset registry", "Mobile field app (alpha)"],
  },
  {
    quarter: "Q2 2026",
    title: "Operations Core",
    status: "done",
    progress: 100,
    items: ["Preventive maintenance", "Inspections & audits", "SLA engine", "Incident protocols"],
  },
  {
    quarter: "Q3 2026",
    title: "Intelligence",
    status: "active",
    progress: 65,
    items: ["Analytics suite", "Executive dashboards", "Private beta program", "Integration API"],
  },
  {
    quarter: "Q4 2026",
    title: "Launch",
    status: "next",
    progress: 10,
    items: ["General availability", "Marketplace of modules", "Multi-language & RTL", "Enterprise onboarding"],
  },
  {
    quarter: "2027",
    title: "NIZAM AI",
    status: "next",
    progress: 0,
    items: ["Predictive maintenance", "Intelligent triage", "Ask NIZAM (natural language)", "Autonomous scheduling"],
  },
];

export const FAQ = [
  {
    q: "What exactly is NIZAM?",
    a: "NIZAM is an enterprise operations platform: one system for service requests, incidents, maintenance, work orders, assets, field operations, inspections and analytics. Instead of stitching together point tools, organizations run their entire physical operation from a single system of record.",
  },
  {
    q: "When does NIZAM launch?",
    a: "General availability is planned for Q4 2026. A private beta opens earlier for selected organizations on the waitlist. Early access members receive priority onboarding and founding-customer pricing.",
  },
  {
    q: "Which industries is NIZAM built for?",
    a: "NIZAM is operation-agnostic by design. It is being built with government bodies, housing societies, hotels, hospitals, universities, malls, airports, factories, industrial estates and facility-management companies: any organization that operates physical space at scale.",
  },
  {
    q: "Can NIZAM replace our existing CMMS or helpdesk?",
    a: "Yes. NIZAM covers the full scope of a modern CMMS/CAFM and service-desk stack, and unifies them. Migration tooling and an integration API are part of the launch roadmap, so existing data and adjacent systems carry over cleanly.",
  },
  {
    q: "How does pricing work before launch?",
    a: "Waitlist members lock founding pricing on Starter and Professional plans. Enterprise and Government agreements are scoped individually. Book a demo and we will map NIZAM to your operation.",
  },
  {
    q: "Is our data secure?",
    a: "Security is foundational: encryption in transit and at rest, role-based access, full audit trails, and SSO on enterprise plans. Government deployments can run on sovereign cloud or on-premise infrastructure.",
  },
  {
    q: "What makes NIZAM different?",
    a: "Most tools digitize one task. NIZAM unifies the entire operation: every request, asset and person in one connected system, with modules that share data natively. One platform, one truth, every operation.",
  },
];

export const NAV_LINKS = [
  { label: "Platform", href: "/platform" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Contact", href: "/contact" },
];

export const SOLUTIONS = [
  {
    index: "01",
    id: "record",
    title: "One System of Record",
    headline: "Every request, asset and action: one place, one truth.",
    body: "Fragmentation is how operations fail quietly. NIZAM replaces the spreadsheet sprawl with a single connected system: every request links to an asset, every asset to a history, every history to a cost. Nothing lives in someone's inbox anymore.",
    points: ["Unified intake across channels", "Assets linked to every action", "Complete operational history", "Zero data silos"],
    image: "/images/architecture-dark.jpg",
  },
  {
    index: "02",
    id: "discipline",
    title: "Discipline by Default",
    headline: "SLAs, escalations and protocols, enforced by the system rather than memory.",
    body: "Good operations shouldn't depend on heroics. NIZAM codifies your standards: response targets that escalate on their own, severity protocols that trigger without a phone call, and preventive schedules that never get forgotten.",
    points: ["SLA engine with auto-escalation", "Severity-based incident protocols", "Preventive maintenance calendars", "Approval workflows"],
    image: "/images/control-room.jpg",
  },
  {
    index: "03",
    id: "field",
    title: "Field-First Execution",
    headline: "The platform lives where the work happens: in the field.",
    body: "Operations are won on floors, roofs and basements, not at desks. NIZAM's mobile experience works offline, verifies presence by location, and gives every technician exactly what they need: the task, the asset, the history, the checklist.",
    points: ["Offline-capable mobile app", "Geo-verified attendance", "Guided checklists & photo proof", "Live dispatch & routing"],
    image: "/images/field-engineer.jpg",
  },
  {
    index: "04",
    id: "evidence",
    title: "Evidence Everywhere",
    headline: "Every action leaves proof. Every report writes itself.",
    body: "When the auditor, the board or the client asks, the answer is already there. Time-stamped trails, photo evidence, compliance logs and exportable reporting are generated as a by-product of work, not as extra work.",
    points: ["Immutable audit trails", "Photo & signature proof", "Compliance-ready logs", "Board-grade reporting"],
    image: "/images/helmet.jpg",
  },
];

export const VALUES = [
  {
    title: "Order",
    body: "Our name is our promise: systems over improvisation, clarity over chaos, in our product and in how we build it.",
  },
  {
    title: "Discipline",
    body: "We ship what operations can rely on: predictable, tested, documented software that behaves like the teams it serves.",
  },
  {
    title: "Clarity",
    body: "Every screen answers a question. If a feature needs a manual, we redesign it until it doesn't.",
  },
  {
    title: "Longevity",
    body: "Operations infrastructure is a decades-long commitment. We build, and price, for relationships measured in years.",
  },
];
