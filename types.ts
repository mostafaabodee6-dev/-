
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: string;
}

export type Theme = 'light' | 'dark';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  timestamp: number;
}
