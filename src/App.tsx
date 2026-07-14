import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingScreen from './components/screens/LandingScreen';
import BrowseScreen from './components/screens/BrowseScreen';
import ProjectDetailScreen from './components/screens/ProjectDetailScreen';
import OrganizationProfileScreen from './components/screens/OrganizationProfileScreen';
import DashboardScreen from './components/screens/DashboardScreen';
import CheckoutScreen from './components/screens/CheckoutScreen';
import AuthScreen from './components/screens/AuthScreen';

function AppContent() {
  const { activePage } = useApp();

  // Route router handler
  const renderActiveScreen = () => {
    switch (activePage) {
      case 'landing':
        return <LandingScreen />;
      case 'browse':
        return <BrowseScreen />;
      case 'project-detail':
        return <ProjectDetailScreen />;
      case 'org-profile':
        return <OrganizationProfileScreen />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'checkout':
        return <CheckoutScreen />;
      case 'auth':
        return <AuthScreen />;
      default:
        return <LandingScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans">
      {/* Dynamic Header */}
      <Header />

      {/* Main Container Stage */}
      <main className="flex-1 animate-in fade-in duration-300">
        {renderActiveScreen()}
      </main>

      {/* Dynamic Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
