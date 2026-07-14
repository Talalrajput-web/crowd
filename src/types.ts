export type Category = 'Education' | 'Environment' | 'Healthcare' | 'Human Rights';
export type Urgency = 'Critical' | 'Trending' | 'Near Goal';

export interface ProjectUpdate {
  id: string;
  date: string;
  title: string;
  content: string;
  author: string;
  avatar: string;
  tag: string;
}

export interface ProjectComment {
  id: string;
  userName: string;
  userAvatar: string;
  content: string;
  date: string;
  amountDonated: number;
  likes: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  reachedDate?: string;
}

export interface DollarDistribution {
  admin: number;
  field: number;
  reserves: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullStory: string;
  challenge: string;
  image: string;
  images: string[];
  category: Category;
  location: string;
  urgency: Urgency;
  goalAmount: number;
  raisedAmount: number;
  donorCount: number;
  daysLeft: number;
  organizationId: string;
  organizationName: string;
  organizationAvatar: string;
  verified: boolean;
  transparencyScore: number;
  dollarDistribution: DollarDistribution;
  updates: ProjectUpdate[];
  comments: ProjectComment[];
  milestones: Milestone[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  memberSince: string;
  verificationLevel: number;
  recurringDonationsCount: number;
  totalDonated: number;
}

export interface Contribution {
  id: string;
  projectId: string;
  projectTitle: string;
  projectImage: string;
  amount: number;
  date: string;
  isRecurring: boolean;
  isAnonymous: boolean;
  status: 'Completed' | 'Pending';
}

export interface Organization {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  mission: string;
  foundedYear: number;
  totalImpactRaised: string;
  projectsCompleted: number;
  successRate: number;
  teamQuote: string;
  teamQuoteAuthor: string;
  teamQuoteRole: string;
  teamImage: string;
  activeProjectsCount: number;
  verified: boolean;
}
