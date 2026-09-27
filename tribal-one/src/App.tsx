import { AppProvider, useApp } from './context/AppContext';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ScholarshipsScreen } from './screens/ScholarshipsScreen';
import { ProgrammesScreen } from './screens/ProgrammesScreen';
import { DocumentsScreen } from './screens/DocumentsScreen';
import { JagoScreen } from './screens/JagoScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AdminScreen } from './screens/AdminScreen';
import { BottomNavigation } from './components/BottomNavigation';

function AppRoutes() {
  const { isLoggedIn, activeTab } = useApp();

  // Admin route — check URL path
  if (window.location.pathname === '/admin') {
    return <AdminScreen />;
  }

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <div className="max-w-lg mx-auto relative">
      <main id="main-content">
        {activeTab === 'home'         && <HomeScreen />}
        {activeTab === 'scholarships' && <ScholarshipsScreen />}
        {activeTab === 'programmes'   && <ProgrammesScreen />}
        {activeTab === 'documents'    && <DocumentsScreen />}
        {activeTab === 'jago'         && <JagoScreen />}
        {activeTab === 'profile'      && <ProfileScreen />}
      </main>
      <BottomNavigation />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
