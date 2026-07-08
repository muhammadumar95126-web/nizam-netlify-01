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
    name: "NizamOps AI",
    tagline: "Operations that think ahead",
    description:
      "Predictive maintenance, intelligent triage and natural-language operations queries. The platform learns your operation, then runs ahead of it.",
    capabilities: ["Predictive maintenance", "Auto triage", "Anomaly detection", "Ask NizamOps"],
    status: "soon",
  },
];

export type Industry = {
  id: string;
  name: string;
  headline: string;
  description: string;
  useCase: string;
  benefit: string;
  essence: string;
  modules: string[];
  flow: string[];
  image: string;
  challenges: string[];
  solutions: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    id: "government",
    name: "Government",
    headline: "Public service, accountable by design",
    description:
      "Citizen requests, municipal assets and field crews governed in one auditable system, with the transparency the public sector demands.",
    useCase:
      "A pothole reported through the citizen portal is routed to the right department, dispatched to a field crew and closed out with photo evidence the public can see.",
    benefit: "Public services with complete operational accountability.",
    essence: "Accountable by Design",
    modules: ["Service Requests", "Field Operations", "Analytics"],
    flow: ["Citizen report", "Departmental routing", "Crew dispatched", "Public status update"],
    image: "/images/government.jpg",
    challenges: [
      "Citizen requests scattered across phone lines, counters and social media with no single record.",
      "Departments working in silos, so accountability disappears between handoffs.",
      "No public-facing proof of work, which erodes trust in service delivery.",
    ],
    solutions: [
      "One intake for every channel, classified and routed automatically to the right department.",
      "Full audit trail from report to resolution, visible to supervisors and, where appropriate, citizens.",
      "Field crews dispatched and tracked in real time against published service standards.",
    ],
  },
  {
    id: "housing",
    name: "Housing Societies",
    headline: "Communities that run like clockwork",
    description:
      "Resident complaints, shared amenities and maintenance dues handled with hotel-grade discipline, visible to every stakeholder.",
    useCase:
      "A resident flags a broken lift from the app; a technician is assigned, the repair is verified on-site, and the resident is notified the moment it's resolved.",
    benefit: "One platform for residents, maintenance teams and community operations.",
    essence: "Community, in Order",
    modules: ["Service Requests", "Maintenance", "Inspections"],
    flow: ["Resident request", "Technician assigned", "Work verified", "Resident notified"],
    image: "/images/housing.jpg",
    challenges: [
      "Resident complaints arriving through WhatsApp groups, notice boards and word of mouth.",
      "Shared amenities and common-area maintenance with no clear ownership or schedule.",
      "Maintenance staff without visibility into what's been promised to residents.",
    ],
    solutions: [
      "A resident app that turns every complaint into a tracked, time-stamped ticket.",
      "Preventive maintenance calendars for lifts, generators and common-area equipment.",
      "Verified completion with photo proof before a ticket is closed.",
    ],
  },
  {
    id: "hotels",
    name: "Hotels",
    headline: "Invisible operations, visible luxury",
    description:
      "Guest-facing perfection depends on back-of-house precision: housekeeping rounds, engineering tickets and asset care, silent and swift.",
    useCase:
      "A guest reports a faulty AC unit from their room; engineering is dispatched, housekeeping is looped in, and the fix is verified before the guest returns.",
    benefit: "Guest experiences supported by seamless operations.",
    essence: "Seamless Guest Ops",
    modules: ["Work Orders", "Inspections", "Asset Management"],
    flow: ["Guest room flag", "Housekeeping tasked", "Engineering fix", "Quality inspection"],
    image: "/images/hotels.jpg",
    challenges: [
      "Engineering and housekeeping running on separate radios and paper logs.",
      "Room-readiness delays that guests notice, even when staff are working hard.",
      "No structured record of asset condition across hundreds of rooms.",
    ],
    solutions: [
      "One work-order system connecting front desk, housekeeping and engineering.",
      "Room-level asset history, so recurring issues are caught before they repeat.",
      "Quality inspections with scoring, closing the loop before a guest ever notices.",
    ],
  },
  {
    id: "hospitals",
    name: "Hospitals",
    headline: "Uptime where it matters most",
    description:
      "Medical equipment, critical utilities and sanitation protocols managed to clinical standards, with compliance evidence built in.",
    useCase:
      "A ventilator flags a fault; biomedical engineering is dispatched immediately, the repair is certified, and the compliance record is generated automatically.",
    benefit: "Critical care supported by dependable operations.",
    essence: "Dependable Critical Care",
    modules: ["Asset Management", "Maintenance", "Incident Management"],
    flow: ["Equipment alert", "Biomedical dispatch", "Certified repair", "Compliance log"],
    image: "/images/hospitals.jpg",
    challenges: [
      "Critical equipment faults reported informally, with no severity triage.",
      "Compliance documentation assembled manually before every audit.",
      "Biomedical and facilities teams working from different systems.",
    ],
    solutions: [
      "Severity-based incident protocols that escalate critical faults instantly.",
      "Compliance logs generated automatically as work happens, not after.",
      "One asset registry shared across biomedical, facilities and administration.",
    ],
  },
  {
    id: "universities",
    name: "Universities",
    headline: "A campus in perfect order",
    description:
      "Lecture halls, laboratories, dormitories and grounds: thousands of assets and daily requests, orchestrated across one campus map.",
    useCase:
      "A leaking lab tap is reported by faculty, routed to the right zone team, and closed out with proof before it disrupts the next class.",
    benefit: "Campus operations connected across every building and department.",
    essence: "Campus, Connected",
    modules: ["Service Requests", "Work Orders", "Analytics"],
    flow: ["Faculty request", "Zone assignment", "Completion proof", "Semester reporting"],
    image: "/images/universities.jpg",
    challenges: [
      "Faculty and student requests submitted through inconsistent, department-specific channels.",
      "Thousands of assets across buildings with no unified condition record.",
      "Leadership without semester-level visibility into operational performance.",
    ],
    solutions: [
      "A single request channel for faculty, students and staff, routed by zone.",
      "Campus-wide asset registry covering labs, halls, dorms and grounds.",
      "Semester reporting that turns daily work into administrative evidence.",
    ],
  },
  {
    id: "malls",
    name: "Shopping Malls",
    headline: "Retail environments, always on",
    description:
      "Common areas, HVAC, tenant fit-outs and security incidents, coordinated across operators, tenants and contractors without friction.",
    useCase:
      "A spill in a common area is reported by security, a cleaning crew is dispatched within minutes, and the incident is logged for tenant reporting.",
    benefit: "Retail environments kept running for tenants and shoppers alike.",
    essence: "Always-On Retail",
    modules: ["Incident Management", "Maintenance", "Inspections"],
    flow: ["Floor incident", "Vendor escalation", "Resolution SLA", "Tenant report"],
    image: "/images/malls.jpg",
    challenges: [
      "Incidents in common areas reported inconsistently across security, ops and tenants.",
      "Vendor and contractor coordination happening over scattered phone calls.",
      "Tenants with no visibility into how quickly issues affecting their storefront are resolved.",
    ],
    solutions: [
      "Incident intake from security and staff, routed with a resolution SLA attached.",
      "Vendor escalation built into the workflow, not chased manually.",
      "Tenant-facing reporting that shows response performance transparently.",
    ],
  },
  {
    id: "airports",
    name: "Airports",
    headline: "Zero-delay infrastructure",
    description:
      "Terminals, runway-adjacent systems and passenger facilities where minutes cost millions. Response protocols measured in seconds, not shifts.",
    useCase:
      "A jet bridge malfunction triggers priority dispatch, live tracking keeps ops informed, and the incident closes with an audit trail ready for regulators.",
    benefit: "Terminal operations coordinated when every minute counts.",
    essence: "Minutes That Matter",
    modules: ["Incident Management", "Field Operations", "Analytics"],
    flow: ["Terminal alert", "Priority dispatch", "Live tracking", "Ops-center closure"],
    image: "/images/airports.jpg",
    challenges: [
      "Terminal-critical faults competing with routine tickets in the same queue.",
      "Field crews dispatched without live visibility into their location or progress.",
      "Regulatory audit trails assembled after the fact, under time pressure.",
    ],
    solutions: [
      "Priority dispatch protocols that separate terminal-critical incidents automatically.",
      "Live tracking of crews and tasks from the operations center.",
      "Audit-ready incident closure, built in as the work happens.",
    ],
  },
  {
    id: "factories",
    name: "Factories",
    headline: "Downtime, engineered out",
    description:
      "Production lines, utilities and safety inspections under preventive discipline. Every stoppage traced, every asset accountable.",
    useCase:
      "A vibration sensor flags an anomaly on the line; a preventive check is scheduled before the failure happens, not after the line stops.",
    benefit: "Preventive maintenance and operational visibility in one system.",
    essence: "Downtime, Prevented",
    modules: ["Maintenance", "Asset Management", "Work Orders"],
    flow: ["Line anomaly", "Preventive check", "Parts & labor", "OEE analytics"],
    image: "/images/factories.jpg",
    challenges: [
      "Unplanned downtime discovered only after production has already stopped.",
      "Maintenance schedules tracked on spreadsheets that drift out of date.",
      "Parts and labor costs not tied back to the assets that consumed them.",
    ],
    solutions: [
      "Preventive maintenance schedules that trigger before failure, not after.",
      "Work orders costed by labor and parts, tied to a single asset history.",
      "OEE analytics that turn floor activity into a management dashboard.",
    ],
  },
  {
    id: "industrial",
    name: "Industrial Areas",
    headline: "Estate-scale coordination",
    description:
      "Shared infrastructure across dozens of tenants: roads, power, water, waste, managed as one estate with clear accountability.",
    useCase:
      "A tenant reports a power outage; the estate team triages, a contractor is dispatched, and the whole estate's status stays visible in one view.",
    benefit: "One system coordinating an entire industrial estate.",
    essence: "One Estate, One View",
    modules: ["Field Operations", "Service Requests", "Maintenance"],
    flow: ["Tenant report", "Estate triage", "Contractor tasked", "Estate-wide view"],
    image: "/images/industrial.jpg",
    challenges: [
      "Dozens of tenants reporting shared-infrastructure issues with no common system.",
      "Contractor coordination handled ad hoc, estate by estate.",
      "No estate-wide view of what's broken, in progress or resolved.",
    ],
    solutions: [
      "A single reporting channel for every tenant across the estate.",
      "Contractor tasking and tracking built into the same workflow.",
      "One live view of estate-wide operational status for management.",
    ],
  },
  {
    id: "fm",
    name: "Facility Management",
    headline: "Your entire portfolio, one pane",
    description:
      "Multi-client, multi-site service delivery with contract SLAs, workforce productivity and client reporting: proof of value, automated.",
    useCase:
      "A client's SLA breach risk is flagged automatically; the right crew is dispatched across the portfolio, and the client sees proof of delivery in real time.",
    benefit: "One platform for every client, site and service contract.",
    essence: "Proof, on Every Contract",
    modules: ["Work Orders", "Analytics", "Inspections"],
    flow: ["Client SLA", "Multi-site dispatch", "Verified delivery", "Client dashboard"],
    image: "/images/fm.jpg",
    challenges: [
      "Every client contract tracked in a different spreadsheet or tool.",
      "SLA breaches discovered by the client before they're discovered internally.",
      "Proof of service delivery assembled manually for client reporting.",
    ],
    solutions: [
      "One platform covering every client, site and contract SLA.",
      "Automatic SLA-breach flags before they become client escalations.",
      "Client-facing dashboards that turn delivered work into visible proof.",
    ],
  },
  {
    id: "enterprise",
    name: "Large Enterprises",
    headline: "Order, at any scale",
    description:
      "Campuses, branches and corporate real estate unified under one operational standard, with global visibility and local execution.",
    useCase:
      "A branch office reports a facilities issue; it's triaged locally, executed to a shared standard, and rolled up into one global view for leadership.",
    benefit: "One operational standard, from headquarters to every branch.",
    essence: "One Standard, Every Site",
    modules: ["Analytics", "Asset Management", "Service Requests"],
    flow: ["Branch request", "Regional routing", "Standard execution", "Global rollup"],
    image: "/images/enterprise.jpg",
    challenges: [
      "Every branch or region running its own tools and its own standards.",
      "Corporate real estate with no consolidated view of cost or condition.",
      "Leadership decisions made without reliable, rolled-up operational data.",
    ],
    solutions: [
      "One operational standard, configured locally, enforced globally.",
      "A single asset registry spanning every branch and site.",
      "Global rollup analytics built from the same data every branch works from.",
    ],
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
    name: "Enterprise & Government",
    price: "Custom",
    description: "For government bodies and nationwide organizations with custom requirements.",
    features: [
      "Unlimited sites & users",
      "Custom integrations",
      "Sovereign / private deployment options",
      "Dedicated infrastructure",
      "24/7 support · custom SLA",
      "Training, onboarding & dedicated account manager",
    ],
    cta: "Contact Sales",
    ctaType: "demo",
  },
];

export type RoadmapStage = {
  index: string;
  title: string;
  description: string;
  status: "complete" | "current" | "upcoming";
};

export const ROADMAP: RoadmapStage[] = [
  {
    index: "01",
    title: "Website",
    description: "The platform's story, industries and modules, live for the world to see.",
    status: "complete",
  },
  {
    index: "02",
    title: "Private Beta",
    description: "Core modules opened to a small group of design partners, shaping the product in the open.",
    status: "current",
  },
  {
    index: "03",
    title: "Dashboard",
    description: "The Operations Command Center: live work, live assets, live accountability, in one pane of glass.",
    status: "upcoming",
  },
  {
    index: "04",
    title: "PWA Launch",
    description: "NizamOps installs directly from the browser: desktop, tablet and mobile, no app store required.",
    status: "upcoming",
  },
  {
    index: "05",
    title: "AI Assistant",
    description: "Predictive maintenance, intelligent triage and natural-language operations, layered onto the core.",
    status: "upcoming",
  },
  {
    index: "06",
    title: "Enterprise Integrations",
    description: "SSO, ERP and IoT connectors bringing NizamOps into the systems you already run.",
    status: "upcoming",
  },
  {
    index: "07",
    title: "Public Release",
    description: "General availability, with onboarding, documentation and support ready for every industry.",
    status: "upcoming",
  },
  {
    index: "08",
    title: "Marketplace",
    description: "Third-party modules and integrations, extending the platform without leaving it.",
    status: "upcoming",
  },
  {
    index: "09",
    title: "Smart City Platform",
    description: "NizamOps as shared infrastructure for cities and large estates operating at civic scale.",
    status: "upcoming",
  },
];

export const FAQ = [
  {
    q: "What exactly is NizamOps?",
    a: "NizamOps is an enterprise operations platform: one system for service requests, incidents, maintenance, work orders, assets, field operations, inspections and analytics. Instead of stitching together point tools, organizations run their entire physical operation from a single system of record.",
  },
  {
    q: "When does NizamOps launch?",
    a: "General availability is planned for Q4 2026. A private beta opens earlier for selected organizations on the waitlist. Early access members receive priority onboarding and founding-customer pricing.",
  },
  {
    q: "Which industries is NizamOps built for?",
    a: "NizamOps is operation-agnostic by design. It is being built with government bodies, housing societies, hotels, hospitals, universities, malls, airports, factories, industrial estates and facility-management companies: any organization that operates physical space at scale.",
  },
  {
    q: "Can NizamOps replace our existing CMMS or helpdesk?",
    a: "Yes. NizamOps covers the full scope of a modern CMMS/CAFM and service-desk stack, and unifies them. Migration tooling and an integration API are part of the launch roadmap, so existing data and adjacent systems carry over cleanly.",
  },
  {
    q: "How does pricing work before launch?",
    a: "Waitlist members lock founding pricing on Starter and Professional plans. Enterprise and Government agreements are scoped individually. Book a demo and we will map NizamOps to your operation.",
  },
  {
    q: "Is our data secure?",
    a: "Security is foundational: encryption in transit and at rest, role-based access, full audit trails, and SSO on enterprise plans. Government deployments can run on sovereign cloud or on-premise infrastructure.",
  },
  {
    q: "What makes NizamOps different?",
    a: "Most tools digitize one task. NizamOps unifies the entire operation: every request, asset and person in one connected system, with modules that share data natively. One platform, one truth, every operation.",
  },
  {
    q: "Can multiple sites be managed from one account?",
    a: "Yes. NizamOps is multi-site by design, from a single building to hundreds of locations across regions. Each site keeps its own operational detail while leadership gets a rolled-up, standardized view across all of them.",
  },
  {
    q: "Does NizamOps work offline?",
    a: "Field teams stay productive without signal. The mobile app queues tasks, checklists and photo evidence offline and syncs automatically the moment connectivity returns.",
  },
  {
    q: "Is there a mobile app?",
    a: "Yes. NizamOps's field app is mobile-first: technicians get their tasks, asset history and checklists on the device they already carry, with offline support built in.",
  },
  {
    q: "Can workflows be customized?",
    a: "Every organization runs differently. Routing rules, approval chains, SLA targets and checklist templates are all configurable to match how your operation actually works, not the other way around.",
  },
  {
    q: "Can assets use QR codes?",
    a: "Every asset in the registry can carry a QR identity. Scanning it in the field pulls up its full history, warranty and open work instantly, no manual lookup required.",
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
    body: "Fragmentation is how operations fail quietly. NizamOps replaces the spreadsheet sprawl with a single connected system: every request links to an asset, every asset to a history, every history to a cost. Nothing lives in someone's inbox anymore.",
    points: ["Unified intake across channels", "Assets linked to every action", "Complete operational history", "Zero data silos"],
    image: "/images/architecture-dark.jpg",
  },
  {
    index: "02",
    id: "discipline",
    title: "Discipline by Default",
    headline: "SLAs, escalations and protocols, enforced by the system rather than memory.",
    body: "Good operations shouldn't depend on heroics. NizamOps codifies your standards: response targets that escalate on their own, severity protocols that trigger without a phone call, and preventive schedules that never get forgotten.",
    points: ["SLA engine with auto-escalation", "Severity-based incident protocols", "Preventive maintenance calendars", "Approval workflows"],
    image: "/images/control-room.jpg",
  },
  {
    index: "03",
    id: "field",
    title: "Field-First Execution",
    headline: "The platform lives where the work happens: in the field.",
    body: "Operations are won on floors, roofs and basements, not at desks. NizamOps's mobile experience works offline, verifies presence by location, and gives every technician exactly what they need: the task, the asset, the history, the checklist.",
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
    image: "/images/qr-scan.jpg",
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

export type WhyCard = { index: string; title: string; body: string };

export const WHY_NIZAM: WhyCard[] = [
  {
    index: "01",
    title: "One Platform",
    body: "Everything connected instead of spreadsheets, WhatsApp threads and disconnected point software.",
  },
  {
    index: "02",
    title: "Built for Operations",
    body: "Purpose-built for organizations that manage physical infrastructure, not a generic ticketing tool bent into shape.",
  },
  {
    index: "03",
    title: "Multi-Site Ready",
    body: "Scale from one building to hundreds of locations without changing systems or standards.",
  },
  {
    index: "04",
    title: "Mobile First",
    body: "Designed for field teams first: the office view is the by-product, not the other way around.",
  },
  {
    index: "05",
    title: "Enterprise Security",
    body: "Role-based permissions, audit logs and a secure cloud architecture from day one, not bolted on later.",
  },
  {
    index: "06",
    title: "Future Ready",
    body: "AI, IoT and predictive operations are on the roadmap, arriving as the platform evolves, not as a separate product.",
  },
];

export type TrustPoint = { index: string; title: string; body: string };

export const TRUST: TrustPoint[] = [
  {
    index: "01",
    title: "Enterprise-Ready Architecture",
    body: "Built on cloud infrastructure designed for uptime, isolation and scale from the first deployment.",
  },
  {
    index: "02",
    title: "Role-Based Permissions",
    body: "Every user sees exactly what their role requires, nothing more, enforced at the system level.",
  },
  {
    index: "03",
    title: "Audit Logs",
    body: "Every action, every change, every approval, time-stamped and traceable for compliance and review.",
  },
  {
    index: "04",
    title: "Data Isolation",
    body: "Multi-tenant SaaS architecture keeps every organization's data logically separated and secure.",
  },
  {
    index: "05",
    title: "Encryption",
    body: "Data protected in transit and at rest, using industry-standard encryption throughout the platform.",
  },
  {
    index: "06",
    title: "Offline Field Support",
    body: "Field operations continue without signal, syncing securely the moment connectivity returns.",
  },
  {
    index: "07",
    title: "Continuous Updates",
    body: "The platform improves in place: new capability delivered without disruptive migrations.",
  },
  {
    index: "08",
    title: "Scalable for Every Size",
    body: "The same architecture serves a single-site operator and a nationwide enterprise, without a rebuild.",
  },
];

export type WorkflowStep = { index: string; title: string; body: string };

export const WORKFLOW: WorkflowStep[] = [
  { index: "01", title: "Issue Reported", body: "A citizen, resident, guest or employee raises an issue through any channel." },
  { index: "02", title: "Ticket Created", body: "The system classifies and logs it instantly as a trackable record." },
  { index: "03", title: "Supervisor Reviews", body: "A supervisor confirms priority, scope and the right team to handle it." },
  { index: "04", title: "Worker Assigned", body: "The task reaches a field worker with everything they need to act." },
  { index: "05", title: "Work Completed", body: "The task is executed on-site, with checklists and photo evidence." },
  { index: "06", title: "Verification", body: "Completed work is reviewed and confirmed against the original request." },
  { index: "07", title: "Analytics Updated", body: "The outcome feeds live dashboards, SLA metrics and reporting." },
  { index: "08", title: "Citizen / Customer Notified", body: "The original requester is informed the moment it's resolved." },
];

export type Role = { id: string; name: string; body: string };

export const ROLES: Role[] = [
  {
    id: "citizen",
    name: "Citizen / Resident",
    body: "Reports issues in seconds and sees exactly where the request stands, without ever chasing anyone.",
  },
  {
    id: "reception",
    name: "Reception",
    body: "Logs requests as they arrive and routes them into the system instead of a notebook or a group chat.",
  },
  {
    id: "supervisor",
    name: "Supervisor",
    body: "Reviews incoming work, sets priority and assigns it to the right team without a single phone call.",
  },
  {
    id: "field-worker",
    name: "Field Worker",
    body: "Gets the task, the asset history and the checklist on their phone, online or off.",
  },
  {
    id: "manager",
    name: "Manager",
    body: "Watches SLA performance and team load across every site from one live dashboard.",
  },
  {
    id: "director",
    name: "Director",
    body: "Sees the operation at a glance: cost, coverage and compliance, without waiting on a report.",
  },
  {
    id: "admin",
    name: "System Administrator",
    body: "Configures roles, workflows and permissions to match exactly how the organization runs.",
  },
];

export type ArchitectureLayer = { index: string; title: string; body: string };

export const ARCHITECTURE: ArchitectureLayer[] = [
  { index: "01", title: "Organization", body: "Your entire operation, modeled as one entity with its own configuration and standards." },
  { index: "02", title: "Departments", body: "Divisions and sites nested underneath, each with local autonomy inside the global standard." },
  { index: "03", title: "Users", body: "Every person who touches the system, from front desk to field, provisioned centrally." },
  { index: "04", title: "Roles", body: "Permissions scoped precisely: what each user can see, act on and approve." },
  { index: "05", title: "Modules", body: "Service requests, maintenance, assets and more, all reading and writing the same data." },
  { index: "06", title: "Assets", body: "The physical world, registered and tracked: condition, history, warranty, cost." },
  { index: "07", title: "Analytics", body: "Every action across every layer, rolled up into live, board-ready intelligence." },
  { index: "08", title: "AI", body: "Predictive maintenance and intelligent triage, learning from everything above it." },
];

export type MobileStep = { index: string; title: string; caption: string };

export const MOBILE_STEPS: MobileStep[] = [
  { index: "01", title: "Receiving a Task", caption: "A work order lands on the technician's phone with location, asset and priority." },
  { index: "02", title: "QR Scanning", caption: "Scanning the asset's QR code pulls up its full history and warranty status instantly." },
  { index: "03", title: "Updating Work Order", caption: "Status, notes and parts used are logged as the work happens, not after." },
  { index: "04", title: "Uploading Evidence", caption: "Photo proof attaches directly to the record, timestamped and geo-tagged." },
  { index: "05", title: "Completing the Job", caption: "A signature or supervisor sign-off closes the loop on the spot." },
  { index: "06", title: "Back to Dashboard", caption: "The completed job updates the live dashboard for every stakeholder, instantly." },
];

export type FutureModule = { index: string; name: string; body: string };

export const FUTURE_MODULES: FutureModule[] = [
  { index: "01", name: "Operations Command Center", body: "The live view of everything running across every site, in one pane of glass." },
  { index: "02", name: "Service Requests", body: "Every request, one front door, classified and routed the moment it arrives." },
  { index: "03", name: "Asset Management", body: "A living registry of every asset: location, condition, warranty and lifetime cost." },
  { index: "04", name: "Maintenance", body: "Preventive schedules and readings that keep critical systems ahead of failure." },
  { index: "05", name: "Work Orders", body: "The operational unit of record, assigned, costed and closed with proof." },
  { index: "06", name: "Analytics", body: "SLA performance, cost per asset and team utilization, in one source of truth." },
  { index: "07", name: "Inspections", body: "Digital rounds and audits with scoring, photo evidence and auto follow-ups." },
  { index: "08", name: "Reports", body: "Board-ready exports generated as a by-product of work, not extra work." },
  { index: "09", name: "Inventory", body: "Parts and stock levels tracked against every work order that consumes them." },
  { index: "10", name: "Field Operations", body: "Offline-capable tasking and live dispatch for distributed teams." },
  { index: "11", name: "NizamOps AI", body: "Predictive maintenance and intelligent triage, learning from every closed loop." },
];

export type InstallFlowNode = { index: string; title: string; body: string };

export const INSTALL_FLOW: InstallFlowNode[] = [
  { index: "01", title: "Cloud", body: "One secure, multi-tenant backbone serving every device and every organization." },
  { index: "02", title: "Web", body: "Full platform access from any modern browser, no installation required." },
  { index: "03", title: "Desktop", body: "Installed as a native-feeling app on Windows and macOS, straight from the browser." },
  { index: "04", title: "Tablet", body: "The same interface, optimized for reception desks and supervisor rounds." },
  { index: "05", title: "Android", body: "Installs directly from Chrome, no Google Play dependency required." },
  { index: "06", title: "iPhone", body: "Installs from Safari, works and feels like a native iOS app." },
  { index: "07", title: "Field Worker", body: "Offline-capable tasking, QR scanning and evidence capture, on the device they carry." },
  { index: "08", title: "Office Staff", body: "Reception and coordination, live, without switching between tools." },
  { index: "09", title: "Executives", body: "One rolled-up view of the entire operation, on whatever screen is nearest." },
];
