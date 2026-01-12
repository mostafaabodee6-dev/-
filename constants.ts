
import { Project, Skill } from './types';

export const PERSONAL_INFO = {
  name: "عبدالملك مصطفى",
  title: "مطوّر مواقع | صانع تجارب رقمية",
  tagline: "عاشق التفاصيل والتأثيرات",
  bio: "أنا عبدالملك مصطفى، مبدع تقني وشغوف بتطوير المواقع وبناء التجارب الرقمية التي تجمع بين القوة البصرية، الذكاء البرمجي، والتأثيرات الإبداعية. أؤمن أن الموقع ليس مجرد شكل، بل تجربة تُحفر في الذاكرة من أول زيارة.",
  slogan: "الموقع العادي يُنسى… وأنا أصنع مواقع تُحفر في الذاكرة.",
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "منصة التداول الذكي",
    description: "واجهة تداول متقدمة تدعم البيانات اللحظية مع رسوم بيانية تفاعلية.",
    image: "https://picsum.photos/seed/tech1/800/600",
    tags: ["React", "D3.js", "Tailwind"],
    link: "#"
  },
  {
    id: 2,
    title: "تجربة تسوق غامرة",
    description: "موقع تجارة إلكترونية يركز على الحركات الدقيقة وتجربة المستخدم السلسة.",
    image: "https://picsum.photos/seed/tech2/800/600",
    tags: ["Next.js", "Framer Motion", "Stripe"],
    link: "#"
  },
  {
    id: 3,
    title: "محرك البحث المدعوم بالذكاء الاصطناعي",
    description: "أداة بحث تستخدم Gemini لتحليل المحتوى وتقديم إجابات دقيقة.",
    image: "https://picsum.photos/seed/tech3/800/600",
    tags: ["Gemini API", "TypeScript", "Node.js"],
    link: "#"
  }
];

export const SKILLS: Skill[] = [
  { name: "تطوير HTML5/CSS3", icon: "Code", category: "Frontend" },
  { name: "JavaScript / TypeScript", icon: "Cpu", category: "Programming" },
  { name: "تأثيرات CSS متقدمة", icon: "Zap", category: "Design" },
  { name: "تحسين تجربة المستخدم", icon: "Heart", category: "UX" },
  { name: "تصميم متجاوب", icon: "Smartphone", category: "Layout" },
  { name: "تطوير React/Next.js", icon: "Layers", category: "Frontend" }
];
