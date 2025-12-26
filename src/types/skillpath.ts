export type EducationLevel = 'student' | 'graduate' | 'working';
export type GoalType = 'learning' | 'internship' | 'both';
export type Domain = 'web-development' | 'data-analytics' | 'ui-ux' | 'cloud-computing' | 'ai-ml';

export interface UserProfile {
  username: string;
  email: string;
  education: EducationLevel;
  goal: GoalType;
  domain: Domain;
  skills: string[];
}

export interface MicroTopic {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  days: string;
  status: 'pending' | 'active' | 'completed';
  microTopics: MicroTopic[];
}

export interface Roadmap {
  domain: Domain;
  title: string;
  skills: Skill[];
}

export const DOMAINS = [
  { id: 'web-development', name: 'Web Development', icon: 'Code', description: 'Build modern websites and web applications' },
  { id: 'data-analytics', name: 'Data Analytics', icon: 'BarChart3', description: 'Analyze data and derive insights' },
  { id: 'ui-ux', name: 'UI / UX Design', icon: 'Palette', description: 'Design beautiful user experiences' },
  { id: 'cloud-computing', name: 'Cloud Computing', icon: 'Cloud', description: 'Deploy and manage cloud infrastructure' },
  { id: 'ai-ml', name: 'AI / Machine Learning', icon: 'Brain', description: 'Build intelligent systems' },
] as const;

export const SKILLS_BY_DOMAIN: Record<Domain, string[]> = {
  'web-development': ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Git', 'None / Just Starting'],
  'data-analytics': ['Excel', 'SQL', 'Python', 'Statistics', 'Tableau', 'Power BI', 'None / Just Starting'],
  'ui-ux': ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research', 'None / Just Starting'],
  'cloud-computing': ['Linux', 'AWS', 'Azure', 'Docker', 'Kubernetes', 'Networking', 'None / Just Starting'],
  'ai-ml': ['Python', 'Math/Statistics', 'NumPy', 'Pandas', 'TensorFlow', 'PyTorch', 'None / Just Starting'],
};
