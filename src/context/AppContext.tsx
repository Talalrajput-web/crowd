import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, User, Contribution, Category, Urgency, ProjectComment } from '../types';
import { INITIAL_PROJECTS, INITIAL_USER, INITIAL_CONTRIBUTIONS } from '../data';

interface AppContextType {
  projects: Project[];
  currentUser: User | null;
  contributions: Contribution[];
  activePage: 'landing' | 'browse' | 'project-detail' | 'org-profile' | 'dashboard' | 'checkout' | 'auth';
  selectedProjectId: string;
  donationDraft: { amount: number; isRecurring: boolean; projectId: string } | null;
  
  setPage: (page: 'landing' | 'browse' | 'project-detail' | 'org-profile' | 'dashboard' | 'checkout' | 'auth') => void;
  selectProject: (id: string) => void;
  prepareDonation: (projectId: string, amount: number, isRecurring: boolean) => void;
  submitDonation: (isAnonymous: boolean, name?: string, email?: string) => { success: boolean; error?: string };
  addComment: (projectId: string, content: string) => void;
  login: (email: string, name: string) => void;
  logout: () => void;
  resetAll: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Load initial data from localStorage or fallback
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('kindred_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('kindred_user');
    if (saved === 'null') return null;
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [contributions, setContributions] = useState<Contribution[]>(() => {
    const saved = localStorage.getItem('kindred_contributions');
    return saved ? JSON.parse(saved) : INITIAL_CONTRIBUTIONS;
  });

  const [activePage, setActivePage] = useState<'landing' | 'browse' | 'project-detail' | 'org-profile' | 'dashboard' | 'checkout' | 'auth'>(() => {
    const saved = localStorage.getItem('kindred_active_page');
    return (saved as any) || 'landing';
  });

  const [selectedProjectId, setSelectedProjectId] = useState<string>(() => {
    const saved = localStorage.getItem('kindred_selected_project_id');
    return saved || 'amazon-canopy';
  });

  const [donationDraft, setDonationDraft] = useState<{ amount: number; isRecurring: boolean; projectId: string } | null>(() => {
    const saved = localStorage.getItem('kindred_donation_draft');
    return saved ? JSON.parse(saved) : null;
  });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('kindred_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('kindred_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('kindred_contributions', JSON.stringify(contributions));
  }, [contributions]);

  useEffect(() => {
    localStorage.setItem('kindred_active_page', activePage);
  }, [activePage]);

  useEffect(() => {
    localStorage.setItem('kindred_selected_project_id', selectedProjectId);
  }, [selectedProjectId]);

  useEffect(() => {
    localStorage.setItem('kindred_donation_draft', JSON.stringify(donationDraft));
  }, [donationDraft]);

  // Page switcher
  const setPage = (page: 'landing' | 'browse' | 'project-detail' | 'org-profile' | 'dashboard' | 'checkout' | 'auth') => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select project to view detail
  const selectProject = (id: string) => {
    setSelectedProjectId(id);
    setPage('project-detail');
  };

  // Create a pending donation draft
  const prepareDonation = (projectId: string, amount: number, isRecurring: boolean) => {
    setDonationDraft({ projectId, amount, isRecurring });
    setPage('checkout');
  };

  // Finalize donation on checkout
  const submitDonation = (isAnonymous: boolean, name?: string, email?: string) => {
    if (!donationDraft) return { success: false, error: 'No active donation draft' };

    const project = projects.find(p => p.id === donationDraft.projectId);
    if (!project) return { success: false, error: 'Project not found' };

    // 1. Create contribution record
    const newContribution: Contribution = {
      id: `tx-${Date.now()}`,
      projectId: project.id,
      projectTitle: project.title,
      projectImage: project.image,
      amount: donationDraft.amount,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      isRecurring: donationDraft.isRecurring,
      isAnonymous: isAnonymous,
      status: 'Completed'
    };

    // 2. Update user stats if logged in
    if (currentUser) {
      const updatedUser: User = {
        ...currentUser,
        totalDonated: currentUser.totalDonated + donationDraft.amount,
        recurringDonationsCount: donationDraft.isRecurring 
          ? currentUser.recurringDonationsCount + 1 
          : currentUser.recurringDonationsCount
      };
      setCurrentUser(updatedUser);
    }

    // 3. Update project details (raised amount, donor count, comments)
    const updatedProjects = projects.map(p => {
      if (p.id === project.id) {
        // Add a verified donor comment placeholder
        const commentId = `c-${Date.now()}`;
        const newComment: ProjectComment = {
          id: commentId,
          userName: isAnonymous ? 'Anonymous Donor' : (currentUser?.name || name || 'Kindred Supporter'),
          userAvatar: isAnonymous 
            ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYkD54FGxMSHLUxHNadUljaJmEHwSMRXkb-HoQsc1dcbM3vzpSjHR7c7U3GriJVmVtNbBpp90chbkaq8fEuiBq42neFIzYtedVzJcQ-BS4SNSSwbxiXAm4-h2ufxbJ3REy3SFTOpcVbiXJppk6TSo9i-aYvyhHV5AGiaXxtMP0LVhQTjAbV1Ai87-ExWInKbBKil2NxthLPPP9IscE-6XAaZ7z-c8b86TvxpVhHiBSKZ4jiZ50bktVVg'
            : (currentUser?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYkD54FGxMSHLUxHNadUljaJmEHwSMRXkb-HoQsc1dcbM3vzpSjHR7c7U3GriJVmVtNbBpp90chbkaq8fEuiBq42neFIzYtedVzJcQ-BS4SNSSwbxiXAm4-h2ufxbJ3REy3SFTOpcVbiXJppk6TSo9i-aYvyhHV5AGiaXxtMP0LVhQTjAbV1Ai87-ExWInKbBKil2NxthLPPP9IscE-6XAaZ7z-c8b86TvxpVhHiBSKZ4jiZ50bktVVg'),
          content: `Backed this project with a tax-deductible contribution of $${donationDraft.amount.toFixed(2)}! Keep up the inspiring work.`,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          amountDonated: donationDraft.amount,
          likes: 0
        };

        return {
          ...p,
          raisedAmount: p.raisedAmount + donationDraft.amount,
          donorCount: p.donorCount + 1,
          comments: [newComment, ...p.comments]
        };
      }
      return p;
    });

    setProjects(updatedProjects);
    setContributions([newContribution, ...contributions]);
    setDonationDraft(null);

    // Redirect to success or dashboard
    setPage('dashboard');
    return { success: true };
  };

  // Add normal comment
  const addComment = (projectId: string, content: string) => {
    if (!currentUser) return;
    
    setProjects(prevProjects => prevProjects.map(p => {
      if (p.id === projectId) {
        const hasDonated = contributions.some(c => c.projectId === projectId);
        const lastDonation = contributions.find(c => c.projectId === projectId);
        const donatedAmount = hasDonated && lastDonation ? lastDonation.amount : 0;

        const newComment: ProjectComment = {
          id: `c-${Date.now()}`,
          userName: currentUser.name,
          userAvatar: currentUser.avatar,
          content: content,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          amountDonated: donatedAmount,
          likes: 0
        };
        return {
          ...p,
          comments: [newComment, ...p.comments]
        };
      }
      return p;
    }));
  };

  // Simple Auth actions
  const login = (email: string, name: string) => {
    const newUser: User = {
      id: email.split('@')[0],
      email: email,
      name: name || 'Sarah Jenkins',
      avatar: name.toLowerCase().includes('sarah') 
        ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvrrytExK0ui02ZsX2WtTr-VYIlKodjZCNh-N96ICkaP4551yA6dv5twE5OIq3xSbwHLuvhmEBDH_M1J-fWhJ73gezupfJE_KhEa0KaDgptVsY-AyA8xMUv0TDXCSnJzxGYUViA5yqCB_c0VPnAxqYJMGOLIIZvvGyPU-0KcQ3eSRusv0hG10JKL5-dXsPAMAA5_HL198KV-JA9H0FW1t5Isa4rQAZ4eknWstbUjMTihRVE8YGLGbFUg'
        : 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYkD54FGxMSHLUxHNadUljaJmEHwSMRXkb-HoQsc1dcbM3vzpSjHR7c7U3GriJVmVtNbBpp90chbkaq8fEuiBq42neFIzYtedVzJcQ-BS4SNSSwbxiXAm4-h2ufxbJ3REy3SFTOpcVbiXJppk6TSo9i-aYvyhHV5AGiaXxtMP0LVhQTjAbV1Ai87-ExWInKbBKil2NxthLPPP9IscE-6XAaZ7z-c8b86TvxpVhHiBSKZ4jiZ50bktVVg',
      memberSince: 'July 2026',
      verificationLevel: 2,
      recurringDonationsCount: 0,
      totalDonated: 0
    };
    setCurrentUser(newUser);
    
    // If we have default Sarah, keep her transactions, otherwise clear for new user demo
    if (name.toLowerCase().includes('sarah') || name === 'Sarah Jenkins') {
      setCurrentUser(INITIAL_USER);
      setContributions(INITIAL_CONTRIBUTIONS);
    } else {
      setContributions([]);
    }
    setPage('dashboard');
  };

  const logout = () => {
    setCurrentUser(null);
    setContributions([]);
    setPage('landing');
  };

  const resetAll = () => {
    localStorage.clear();
    setProjects(INITIAL_PROJECTS);
    setCurrentUser(INITIAL_USER);
    setContributions(INITIAL_CONTRIBUTIONS);
    setSelectedProjectId('amazon-canopy');
    setDonationDraft(null);
    setActivePage('landing');
  };

  return (
    <AppContext.Provider value={{
      projects,
      currentUser,
      contributions,
      activePage,
      selectedProjectId,
      donationDraft,
      setPage,
      selectProject,
      prepareDonation,
      submitDonation,
      addComment,
      login,
      logout,
      resetAll
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
