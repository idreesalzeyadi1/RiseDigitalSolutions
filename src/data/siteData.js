// ==========================================================================
// This file currently holds static/mock data so the UI works immediately.
// Later, replace each array with a Firestore collection
// (services, courses, internships, testimonials) - keep the same shape.
// ==========================================================================

// Service images - imported from src/assets/ (Vite processes/optimizes them
// automatically at build time). To add a new service image, add an import
// line here and use it below.
import webImg from "../assets/website.jpg";
import appImg from "../assets/app.jpg";
import seoImg from "../assets/seo1.jpg";
import digitalMarketingImg from "../assets/digital.jpg";
import contentWritingImg from "../assets/content.jpg";
import uiUxImg from "../assets/ui.jpg";
import digitalmarketing1Img from "../assets/digitalmarketing.jpg";
import seo1Img from "../assets/seo.jpg";
import websiteImg from "../assets/web.jpg";
import app1Img from "../assets/app1.jpg";
export const services = [
  {
    slug: "web-development",
    title: "Web Development",
    icon: "code",
    image: webImg,
    tagline: "Fast, modern, conversion-focused websites",
    description:
      "We build business websites, landing pages, and custom web applications that are fast, secure, and mobile-friendly.",
    features: [
      "Custom responsive design",
      "React / Next.js development",
      "E-commerce integration",
      "SEO-friendly structure",
      "Ongoing maintenance & support",
    ],
    process: [
      { title: "Discovery Call", desc: "Understanding your business and goals." },
      { title: "Design", desc: "Finalizing wireframes and UI design." },
      { title: "Development", desc: "Writing clean, scalable code." },
      { title: "Launch & Support", desc: "Deploying and providing ongoing support." },
    ],
  },
  {
    slug: "app-development",
    title: "App Development",
    icon: "smartphone",
    image: app1Img,
    tagline: "iOS & Android apps that users love",
    description:
      "Native and cross-platform mobile apps focused on both performance and user experience.",
    features: [
      "Cross-platform (React Native)",
      "UI/UX prototyping",
      "API & backend integration",
      "App Store / Play Store deployment",
      "Post-launch updates",
    ],
    process: [
      { title: "Requirement Gathering", desc: "Defining the app's scope and features." },
      { title: "Prototyping", desc: "Building an interactive design prototype." },
      { title: "Build & Test", desc: "Development and rigorous testing." },
      { title: "Publish", desc: "Launching on the store and monitoring." },
    ],
  },
  {
    slug: "seo",
    title: "SEO",
    icon: "search",
    image: seoImg,
    tagline: "Rank higher, get found, grow organically",
    description:
      "On-page and off-page SEO strategies that get your website ranking on top of Google.",
    features: [
      "Keyword research & strategy",
      "On-page optimization",
      "Technical SEO audits",
      "Link building",
      "Monthly performance reports",
    ],
    process: [
      { title: "SEO Audit", desc: "A full analysis of your current website." },
      { title: "Strategy", desc: "Building a keyword and content plan." },
      { title: "Implementation", desc: "Applying on-page and technical fixes." },
      { title: "Track & Improve", desc: "Monitoring rankings and optimizing further." },
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    icon: "megaphone",
    image: digitalMarketingImg,
    tagline: "Campaigns that turn attention into customers",
    description:
      "Social media, paid ads, and content marketing campaigns that get your brand in front of the right audience.",
    features: [
      "Social media management",
      "Meta & Google Ads",
      "Content strategy",
      "Email marketing",
      "Analytics & reporting",
    ],
    process: [
      { title: "Brand Analysis", desc: "Understanding your audience and competitors." },
      { title: "Campaign Planning", desc: "Choosing channels and setting a budget strategy." },
      { title: "Execution", desc: "Launching ads and content." },
      { title: "Optimize", desc: "Improving results based on data." },
    ],
  },
];

export const courses = [
  {
    id: "web-dev-bootcamp",
    title: "Web Development Bootcamp",
    category: "Development",
    level: "Beginner to Advanced",
    duration: "8 Weeks",
    price: "PKR 8,000",
    description:
      "From HTML, CSS, JavaScript, and React to full-stack development - with practical projects.",
    outcomes: [
      "Build real-world projects",
      "React & Tailwind mastery",
      "Portfolio-ready work",
      "Completion certificate",
    ],
  },
  {
    id: "digital-marketing-mastery",
    title: "Digital Marketing Mastery",
    category: "Marketing",
    level: "Beginner",
    duration: "6 Weeks",
    price: "PKR 6,000",
    description: "A complete, practical course covering social media, Meta Ads, and content strategy.",
    outcomes: [
      "Run ad campaigns",
      "Understand analytics",
      "Build a content calendar",
      "Completion certificate",
    ],
  },
  {
    id: "seo-fundamentals",
    title: "SEO Fundamentals",
    category: "SEO",
    level: "Beginner",
    duration: "4 Weeks",
    price: "PKR 5,000",
    description: "From keyword research to technical SEO - all taught in a practical, hands-on way.",
    outcomes: [
      "Keyword research tools",
      "On-page optimization",
      "Basic technical audits",
      "Completion certificate",
    ],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design Essentials",
    category: "Design",
    level: "Beginner",
    duration: "5 Weeks",
    price: "PKR 6,500",
    description: "From Figma to design thinking - learn user-centered design.",
    outcomes: [
      "Figma proficiency",
      "Wireframing & prototyping",
      "Design portfolio piece",
      "Completion certificate",
    ],
  },
];

export const internshipDomains = [
  "Web Development",
  "App Development",
  "SEO",
  "Digital Marketing",
  "UI/UX Design",
  "Content Writing",
];

// Internship tracks with images/icons - used on the homepage's internship
// section (same card design as Services). Reuses service images where the
// domain overlaps; feel free to add dedicated images for UI/UX & Content Writing
// (drop them in src/assets/ and import + reference here, same pattern as above).
export const internshipTracks = [
  {
    slug: "web-development",
    title: "Web Development",
    icon: "code",
    image: websiteImg,
    tagline: "Build real websites with hands-on mentorship",
  },
  {
    slug: "app-development",
    title: "App Development",
    icon: "smartphone",
    image: appImg,
    tagline: "Work on live mobile app projects",
  },
  {
    slug: "seo",
    title: "SEO",
    icon: "search",
    image: seo1Img,
    tagline: "Learn keyword research & optimization by doing",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    icon: "megaphone",
    image: digitalmarketing1Img,
    tagline: "Run real campaigns under expert guidance",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    icon: "layers",
    image: uiUxImg,
    tagline: "Design real interfaces with a design mentor",
  },
  {
    slug: "content-writing",
    title: "Content Writing",
    icon: "edit",
    image: contentWritingImg,
    tagline: "Write for real brands and grow a portfolio",
  },
];

export const stats = [
  { label: "Projects Delivered", value: "50+" },
  { label: "Happy Clients", value: "40+" },
  { label: "Interns Trained", value: "200+" },
  { label: "Courses Offered", value: "15+" },
];

export const testimonials = [
  {
    name: "Ahmed Raza",
    role: "Client - Retail Business",
    quote:
      "RiseDigital Solutions delivered our website right on time and in a very professional manner. We saw noticeable growth in sales.",
    rating: 5,
  },
  {
    name: "Sana Khan",
    role: "Web Development Intern",
    quote:
      "During my internship I got to work on real projects. The certificate really helped me in my job search.",
    rating: 5,
  },
  {
    name: "Bilal Hussain",
    role: "Academy Student",
    quote:
      "The SEO course was very practical. As soon as I learned it, I applied it on my client's website and saw results.",
    rating: 5,
  },
];

export const whyChooseUs = [
  { title: "Experienced Team", desc: "A team of skilled developers, marketers, and designers." },
  { title: "Affordable Pricing", desc: "Reasonable rates without compromising on quality." },
  { title: "On-Time Delivery", desc: "We take deadlines seriously, every time." },
  { title: "Ongoing Support", desc: "Support available even after launch." },
];

export const howItWorksInternship = [
  { title: "Apply Online", desc: "Choose a domain and submit a simple form." },
  { title: "Get Offer Letter", desc: "Your offer letter arrives by email after selection." },
  { title: "Complete Tasks", desc: "Log in to your portal and perform assigned tasks." },
  { title: "Earn Certificate", desc: "Complete the internship and receive a verified certificate." },
];

export const internshipHighlights = [
  {
    icon: "star",
    title: "Skill Growth",
    desc: "Systematic tasks that build your skills step-by-step, career-ready.",
  },
  {
    icon: "check",
    title: "Flexible Pace",
    desc: "Work on your own schedule, from anywhere.",
  },
  {
    icon: "award",
    title: "Verified Certificate",
    desc: "A verified, downloadable certificate upon completion.",
  },
  {
    icon: "users",
    title: "Real Mentorship",
    desc: "A supportive team giving every intern guidance and feedback.",
  },
];

export const internshipStats = [
  { label: "Internship Tracks", value: "6+" },
  { label: "Interns Trained", value: "200+" },
  { label: "Remote-First", value: "100%" },
];

export const internshipFaqs = [
  {
    q: "Are these internships remote?",
    a: "Yes, all internships are 100% remote — you can apply and work from anywhere in Pakistan.",
  },
  {
    q: "Do I get a certificate upon completion?",
    a: "Yes. Once you successfully complete the internship, the admin issues a verified PDF certificate which you can download from your portal.",
  },
  {
    q: "How long does the internship last?",
    a: "Most tracks run 4 to 8 weeks, depending on the domain and tasks involved.",
  },
  {
    q: "Do I need to sign up to apply?",
    a: "No. To apply, you just need to fill out a form — a valid email is required. You're given portal login access only after being selected.",
  },
];
