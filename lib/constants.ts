// all the site content in one place so its easy to update

export interface Experience {
  company: string;
  role: string;
  period: string;
  achievements: string[];
  logo?: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  imageSrc?: string;
  imageAlt?: string;
}

export const siteConfig = {
  name: "Fahad Aba-Alkhail",
  location: "Ottawa, Canada",
  intro:
    "I'm a Computer Science student passionate about building scalable cloud infrastructure and backend systems. I enjoy turning complex problems into clean, reliable solutions.",
  email: "fk.abaalkhail@gmail.com",
  github: "https://github.com/fkabaalkhail",
  education: {
    university: "University of Ottawa",
    program: "BSc Computer Science",
    gpa: "3.9/4.0",
    graduationDate: "2026",
  },
  experiences: [
    {
      company: "Ericsson",
      role: "Software Engineer",
      period: "Jan 2026 – Present",
      logo: "/images/ericsson-logo.jpg",
      achievements: [
        "Deployed the FST Analysis platform on Kubernetes with horizontal pod autoscaling and ingress controllers for AI-driven fault analysis",
        "Led migration of ADAT analytical workloads from MapR to Amazon S3, reducing data access latency by 35% for petabyte-scale datasets",
        "Built an integrity validation framework benchmarking 50+ critical metrics, achieving zero data loss across production migration",
      ],
    },
    {
      company: "Moneymoon",
      role: "Backend & DevOps Engineer",
      period: "Aug 2025 – Dec 2025",
      logo: "/images/moneymoon-logo.png",
      achievements: [
        "Architected microservices on AWS (EC2, RDS, S3) with Docker and Kubernetes, improving uptime to 99.5%",
        "Designed RESTful services with JWT auth, rate limiting, and optimized query plans, reducing API latency by 20%",
        "Authored Terraform IaC modules for OCI and AWS with remote state locking, cutting provisioning time by 60%",
      ],
    },
    {
      company: "HAMS.AI",
      role: "DevOps Engineer",
      period: "Feb 2025 – Apr 2025",
      logo: "/images/hamsai-logo.png",
      achievements: [
        "Stood up production GKE infrastructure from scratch for an AI voice agent platform with multi-cluster Terraform deployments",
        "Deployed a full VictoriaMetrics monitoring stack and built 3 Grafana dashboards for pipeline health and cluster overview",
        "Cut cloud compute spend by 30% via dynamic autoscaling, node pool right-sizing, and workload identity for secure IAM",
      ],
    },
  ] as Experience[],
  projects: [
    {
      id: "mawaqeet",
      title: "Mawaqeet",
      description: "Production iOS app on the App Store — prayer times with ISNA and Umm Al-Qura engines, CoreMotion Qibla compass, Hijri calendar with Maghrib-based date transitions, Stripe payments via Dockerized Node/Express backend, Apple Pay, and tiered notifications.",
      tech: ["Swift", "SwiftUI", "Node.js", "Express", "Docker", "Stripe", "CoreMotion"],
      github: "https://github.com/fkabaalkhail/Mawaqeet",
      imageSrc: "/images/mawaqeet-architecture.png",
      imageAlt: "Mawaqeet system architecture diagram",
    },
    {
      id: "mrasem",
      title: "Mrasem",
      description: "Full-stack luxury concierge booking platform for Saudi Arabia — iOS app (SwiftUI), admin dashboard (Next.js), REST API (Express) with Supabase backend, phone OTP auth, QR ticketing with Apple Wallet, and bilingual EN/AR UI with full RTL layout.",
      tech: ["SwiftUI", "Next.js", "Express", "Supabase", "Vercel", "Apple Wallet"],
      github: "https://github.com/fkabaalkhail/Mrasem",
      imageSrc: "/images/mrasem-architecture.png",
      imageAlt: "Mrasem system architecture diagram",
    },
  ] as Project[],
  skillCategories: [
    { name: "Languages", skills: ["Python", "Java", "Swift", "SwiftUI", "C++", "JavaScript", "SQL"] },
    { name: "Cloud & DevOps", skills: ["AWS", "GCP", "Azure", "OCI", "Docker", "Kubernetes", "Terraform", "Ansible", "GitHub Actions"] },
    { name: "Backend", skills: ["FastAPI", "Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "Supabase", "Stripe"] },
    { name: "Monitoring & QA", skills: ["Grafana", "VictoriaMetrics", "Prometheus", "SonarQube", "VMAlert"] },
    { name: "Networking & Infra", skills: ["NGINX", "Ingress/Egress Policies", "Load Balancing", "SSL/TLS", "DNS", "Service Mesh"] },
  ] as SkillCategory[],
  interests: [
    "Hiking and exploring nature trails",
    "Photography and visual storytelling",
    "Playing chess competitively",
    "Playing football",
  ],
  caseStudies: [
    {
      id: "service-site",
      title: "Service Site",
      imageSrc: "/images/service-site-preview.png",
      imageAlt: "Service website booking interface",
      href: "/case-studies/service-site",
    },
    {
      id: "memory-game",
      title: "Memory Game",
      imageSrc: "/images/case-study-2.jpg",
      imageAlt: "TrailMatch memory card game setup screen",
      href: "https://trailmatch-beryl.vercel.app",
    },
    {
      id: "ecommerce",
      title: "E-commerce Site",
      imageSrc: "/images/case-study-3.jpg",
      imageAlt: "Verdant indoor-plant store storefront",
      href: "https://verdant-black-eight.vercel.app",
    },
    {
      id: "analytics",
      title: "Food Price Dashboard",
      imageSrc: "/images/case-study-4.jpg",
      imageAlt: "Panier bilingual food-price dashboard with line and bar charts",
      href: "https://panier-beta.vercel.app",
    },
  ] as CaseStudy[],
};

export const navLinks = [
  { label: "Apps", href: "#apps" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "How I Work", href: "#workflow" },
  { label: "Case Studies", href: "#case-studies" },
] as const;

export interface AppFeature {
  title: string;
  body: string;
  screen: string;
}

// screenshots for the iOS app showcases (captured from the iOS simulator)
export const appShowcase = {
  mrasem: {
    features: [
      {
        title: "Curated luxury, one tap away",
        body: "Season events, tours, fine dining and chauffeured cars — all browsable from a single category home built in SwiftUI.",
        screen: "/apps/mrasem/categories.webp",
      },
      {
        title: "Discovery that feels premium",
        body: "Rich restaurant cards with Michelin tags, ratings and cuisine filters, backed by a Supabase catalogue managed from the admin panel.",
        screen: "/apps/mrasem/restaurants.webp",
      },
      {
        title: "Booking in three steps",
        body: "Date, time, guests and add-on services flow into a request the team approves from the Next.js admin dashboard.",
        screen: "/apps/mrasem/booking.webp",
      },
      {
        title: "Tickets straight to Apple Wallet",
        body: "Every confirmed booking issues a QR pass that can be added to Apple Wallet, alongside an SMS confirmation to the phone used for OTP sign-in.",
        screen: "/apps/mrasem/confirmed.webp",
      },
    ] as AppFeature[],
    gallery: [
      { src: "/apps/mrasem/splash.webp", label: "Splash" },
      { src: "/apps/mrasem/login.webp", label: "Phone OTP login" },
      { src: "/apps/mrasem/detail.webp", label: "Venue detail" },
      { src: "/apps/mrasem/membership.webp", label: "Membership card" },
      { src: "/apps/mrasem/booking-event.webp", label: "Event booking" },
      { src: "/apps/mrasem/car-booking-ar.webp", label: "Arabic RTL" },
      { src: "/apps/mrasem/invitations.webp", label: "Invitations" },
    ],
  },
  mawaqeet: {
    // captured in the app's Night Mode
    screens: {
      prayer: "/apps/mawaqeet/prayer.webp",
      prayerArabic: "/apps/mawaqeet/prayer-ar.webp",
      qibla: "/apps/mawaqeet/qibla.webp",
      tracker: "/apps/mawaqeet/tracker.webp",
    },
  },
};
