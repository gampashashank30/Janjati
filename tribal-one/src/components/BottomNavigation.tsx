import { Home, BookOpen, FolderOpen, MessageSquare, User } from 'lucide-react';
import type { NavTab } from '../types';
import { useApp } from '../context/AppContext';

const TABS: { id: NavTab; label: string; Icon: React.FC<{ size?: number; strokeWidth?: number }> }[] = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'scholarships', label: 'Schemes', Icon: BookOpen },
  { id: 'documents', label: 'Documents', Icon: FolderOpen },
  { id: 'jago', label: 'JAGO AI', Icon: MessageSquare },
  { id: 'profile', label: 'Profile', Icon: User },
];

export function BottomNavigation() {
  const { activeTab, setActiveTab } = useApp();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white"
      style={{
        boxShadow: '0 -1px 0 #e5e9ef, 0 -4px 16px rgba(0,0,0,0.05)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
      aria-label="Main navigation"
    >
      <div className="flex max-w-lg mx-auto">
        {TABS.map(({ id, label, Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              id={`nav-${id}`}
              aria-label={label}
              aria-current={active ? 'page' : undefined}
              onClick={() => setActiveTab(id)}
              className="relative flex-1 flex flex-col items-center justify-center py-2 gap-0.5"
              style={{ minHeight: 56 }}
            >
              {/* Active indicator dot */}
              {active && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-[#0F766E]"
                  aria-hidden
                />
              )}
              <Icon
                size={22}
                strokeWidth={active ? 2.5 : 1.8}
                style={{ color: active ? '#0F766E' : '#9ca3af', transition: 'color 0.15s' }}
              />
              <span
                className="text-[10px] font-semibold leading-none"
                style={{ color: active ? '#0F766E' : '#9ca3af', transition: 'color 0.15s' }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
