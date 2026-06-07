export const services = [
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    description: 'Infrastructure setup, Kubernetes clusters, CI/CD pipelines, and cloud migrations on AWS, GCP, or Azure.',
    icon: 'Cloud',
    pricing: 'From $150/hr',
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Modern web applications built with React, Next.js, and Node.js. From landing pages to full platforms.',
    icon: 'Globe',
    pricing: 'From $120/hr',
  },
  {
    id: 'ios-dev',
    title: 'iOS Development',
    description: 'Native iOS apps with Swift and SwiftUI. App Store submission, payments, and push notifications included.',
    icon: 'Smartphone',
    pricing: 'From $140/hr',
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    description: 'Integrate AI into your workflows. Chatbots, data pipelines, and intelligent automation.',
    icon: 'Bot',
    pricing: 'From $160/hr',
  },
];

export const bookingOptions = [
  {
    id: 'discovery',
    title: 'Discovery Call',
    description: 'Free 30-minute intro call to discuss your project.',
    icon: 'Phone',
    pricing: 'Free',
    duration: '30 min',
  },
  {
    id: 'sprint',
    title: 'Sprint Session',
    description: 'Focused 2-hour session to tackle a specific problem.',
    icon: 'Zap',
    pricing: '$200',
    duration: '2 hours',
  },
];

export const allBookingServices = [...services, ...bookingOptions];
