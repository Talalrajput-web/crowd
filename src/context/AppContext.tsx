import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, User, Contribution, ProjectComment } from '../types';
import { INITIAL_PROJECTS, INITIAL_USER, INITIAL_CONTRIBUTIONS } from '../data';
import { auth, db, googleProvider } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  onSnapshot, 
  query, 
  where,
  getDoc
} from 'firebase/firestore';

interface AppContextType {
  projects: Project[];
  currentUser: User | null;
  contributions: Contribution[];
  activePage: 'landing' | 'browse' | 'project-detail' | 'org-profile' | 'dashboard' | 'checkout' | 'auth';
  selectedProjectId: string;
  donationDraft: { amount: number; isRecurring: boolean; projectId: string } | null;
  isLoading: boolean;
  
  setPage: (page: 'landing' | 'browse' | 'project-detail' | 'org-profile' | 'dashboard' | 'checkout' | 'auth') => void;
  selectProject: (id: string) => void;
  prepareDonation: (projectId: string, amount: number, isRecurring: boolean) => void;
  submitDonation: (isAnonymous: boolean, name?: string, email?: string) => Promise<{ success: boolean; error?: string }>;
  addComment: (projectId: string, content: string) => Promise<void>;
  loginWithEmail: (email: string, password: string, isSignUp: boolean, name: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string, isSignUp: boolean, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  resetAll: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  // Sync basic UI parameters to localStorage
  useEffect(() => {
    localStorage.setItem('kindred_active_page', activePage);
  }, [activePage]);

  useEffect(() => {
    localStorage.setItem('kindred_selected_project_id', selectedProjectId);
  }, [selectedProjectId]);

  useEffect(() => {
    localStorage.setItem('kindred_donation_draft', JSON.stringify(donationDraft));
  }, [donationDraft]);

  // Real-time Firebase Sync
  useEffect(() => {
    // 1. Listen to real-time Projects in Firestore
    const unsubscribeProjects = onSnapshot(collection(db, 'projects'), (snapshot) => {
      if (snapshot.empty) {
        // Seed projects if database is clean
        INITIAL_PROJECTS.forEach((proj) => {
          setDoc(doc(db, 'projects', proj.id), proj);
        });
      } else {
        const projs: Project[] = [];
        snapshot.forEach((doc) => {
          projs.push(doc.data() as Project);
        });
        setProjects(projs);
      }
    }, (error) => {
      console.error("Firestore projects error:", error);
    });

    // 2. Listen to Firebase Auth state change
    let unsubscribeUserDoc: (() => void) | null = null;
    let unsubscribeContribs: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
      if (unsubscribeUserDoc) unsubscribeUserDoc();
      if (unsubscribeContribs) unsubscribeContribs();

      if (firebaseUser) {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        
        // Listen to User Profile in Firestore
        unsubscribeUserDoc = onSnapshot(userDocRef, async (userSnap) => {
          if (userSnap.exists()) {
            setCurrentUser(userSnap.data() as User);
          } else {
            // Document might not exist yet if created by SignUp, wait or create
            const newUserProfile: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Kindred Supporter',
              avatar: firebaseUser.photoURL || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYkD54FGxMSHLUxHNadUljaJmEHwSMRXkb-HoQsc1dcbM3vzpSjHR7c7U3GriJVmVtNbBpp90chbkaq8fEuiBq42neFIzYtedVzJcQ-BS4SNSSwbxiXAm4-h2ufxbJ3REy3SFTOpcVbiXJppk6TSo9i-aYvyhHV5AGiaXxtMP0LVhQTjAbV1Ai87-ExWInKbBKil2NxthLPPP9IscE-6XAaZ7z-c8b86TvxpVhHiBSKZ4jiZ50bktVVg',
              memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
              verificationLevel: 2,
              recurringDonationsCount: 0,
              totalDonated: 0
            };
            await setDoc(userDocRef, newUserProfile);
            setCurrentUser(newUserProfile);
          }
          setIsLoading(false);
        }, (error) => {
          console.error("User profile snapshot error:", error);
          setIsLoading(false);
        });

        // Listen to User's Contributions in Firestore
        const contribsQuery = query(collection(db, 'contributions'), where('userId', '==', firebaseUser.uid));
        unsubscribeContribs = onSnapshot(contribsQuery, (snapshot) => {
          const list: Contribution[] = [];
          snapshot.forEach((doc) => {
            list.push(doc.data() as Contribution);
          });
          // Sort descending
          list.sort((a, b) => b.id.localeCompare(a.id));
          setContributions(list);
        }, (error) => {
          console.error("Contributions snapshot error:", error);
        });

      } else {
        setCurrentUser(null);
        setContributions([]);
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribeProjects();
      unsubscribeAuth();
      if (unsubscribeUserDoc) unsubscribeUserDoc();
      if (unsubscribeContribs) unsubscribeContribs();
    };
  }, []);

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
  const submitDonation = async (isAnonymous: boolean, name?: string, email?: string) => {
    if (!donationDraft) return { success: false, error: 'No active donation draft' };

    const project = projects.find(p => p.id === donationDraft.projectId);
    if (!project) return { success: false, error: 'Project not found' };

    try {
      const txId = `tx-${Date.now()}`;
      
      // 1. Create contribution record in Firestore
      const newContribution: Contribution = {
        id: txId,
        projectId: project.id,
        projectTitle: project.title,
        projectImage: project.image,
        amount: donationDraft.amount,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        isRecurring: donationDraft.isRecurring,
        isAnonymous: isAnonymous,
        status: 'Completed'
      };
      
      // Add a link to userId if currentUser exists
      const dbContribution = {
        ...newContribution,
        userId: currentUser ? currentUser.id : 'anonymous'
      };

      await setDoc(doc(db, 'contributions', txId), dbContribution);

      // 2. Update user stats in Firestore
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.id);
        await updateDoc(userDocRef, {
          totalDonated: currentUser.totalDonated + donationDraft.amount,
          recurringDonationsCount: donationDraft.isRecurring 
            ? currentUser.recurringDonationsCount + 1 
            : currentUser.recurringDonationsCount
        });
      }

      // 3. Update project details (raised amount, donor count, comments) in Firestore
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

      const projDocRef = doc(db, 'projects', project.id);
      await updateDoc(projDocRef, {
        raisedAmount: project.raisedAmount + donationDraft.amount,
        donorCount: project.donorCount + 1,
        comments: [newComment, ...project.comments]
      });

      setDonationDraft(null);
      setPage('dashboard');
      return { success: true };
    } catch (e: any) {
      console.error("Donation execution failed:", e);
      return { success: false, error: e.message || "Unknown error during transaction processing" };
    }
  };

  // Add normal comment
  const addComment = async (projectId: string, content: string) => {
    if (!currentUser) return;
    
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    try {
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

      const projDocRef = doc(db, 'projects', projectId);
      await updateDoc(projDocRef, {
        comments: [newComment, ...project.comments]
      });
    } catch (e) {
      console.error("Failed to post comment:", e);
    }
  };

  // Firebase Authentication actions
  const loginWithEmail = async (email: string, password: string, isSignUp: boolean, name: string) => {
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        
        // Create user document in Firestore
        const newUserProfile: User = {
          id: firebaseUser.uid,
          email: email,
          name: name || email.split('@')[0],
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYkD54FGxMSHLUxHNadUljaJmEHwSMRXkb-HoQsc1dcbM3vzpSjHR7c7U3GriJVmVtNbBpp90chbkaq8fEuiBq42neFIzYtedVzJcQ-BS4SNSSwbxiXAm4-h2ufxbJ3REy3SFTOpcVbiXJppk6TSo9i-aYvyhHV5AGiaXxtMP0LVhQTjAbV1Ai87-ExWInKbBKil2NxthLPPP9IscE-6XAaZ7z-c8b86TvxpVhHiBSKZ4jiZ50bktVVg',
          memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          verificationLevel: 2,
          recurringDonationsCount: 0,
          totalDonated: 0
        };
        await setDoc(doc(db, 'users', firebaseUser.uid), newUserProfile);
        setCurrentUser(newUserProfile);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setPage('dashboard');
      return { success: true };
    } catch (e: any) {
      console.error("Auth action failed:", e);
      return { success: false, error: e.message || "Authentication failed" };
    }
  };

  const loginWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const firebaseUser = userCredential.user;
      
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userDocRef);
      
      if (!userSnap.exists()) {
        const newUserProfile: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Kindred Supporter',
          avatar: firebaseUser.photoURL || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYkD54FGxMSHLUxHNadUljaJmEHwSMRXkb-HoQsc1dcbM3vzpSjHR7c7U3GriJVmVtNbBpp90chbkaq8fEuiBq42neFIzYtedVzJcQ-BS4SNSSwbxiXAm4-h2ufxbJ3REy3SFTOpcVbiXJppk6TSo9i-aYvyhHV5AGiaXxtMP0LVhQTjAbV1Ai87-ExWInKbBKil2NxthLPPP9IscE-6XAaZ7z-c8b86TvxpVhHiBSKZ4jiZ50bktVVg',
          memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          verificationLevel: 2,
          recurringDonationsCount: 0,
          totalDonated: 0
        };
        await setDoc(userDocRef, newUserProfile);
        setCurrentUser(newUserProfile);
      }
      setPage('dashboard');
      return { success: true };
    } catch (e: any) {
      console.error("Google Sign-In failed:", e);
      return { success: false, error: e.message || "Google Sign-In failed" };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setContributions([]);
      setPage('landing');
    } catch (e) {
      console.error("Sign-out failed:", e);
    }
  };

  const resetAll = async () => {
    try {
      const batchPromises = INITIAL_PROJECTS.map((proj) => setDoc(doc(db, 'projects', proj.id), proj));
      await Promise.all(batchPromises);
      await signOut(auth);
      setCurrentUser(null);
      setContributions([]);
      setPage('landing');
    } catch (e) {
      console.error("Reset failed:", e);
    }
  };

  return (
    <AppContext.Provider value={{
      projects,
      currentUser,
      contributions,
      activePage,
      selectedProjectId,
      donationDraft,
      isLoading,
      setPage,
      selectProject,
      prepareDonation,
      submitDonation,
      addComment,
      loginWithEmail,
      loginWithGoogle,
      login: loginWithEmail, // backward-compatible mapping
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
