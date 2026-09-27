import { Home, BookOpen, FolderOpen, MessageSquare, Layers } from 'lucide-react';
import type { NavTab } from '../types';
import { useApp } from '../context/AppContext';
import type { TranslationKey } from '../utils/translations';

const TABS: {
  id: NavTab;
  labelKey: TranslationKey;
  Icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    style?: React.CSSProperties;
    className?: string;
  }>;
}[] = [
  { id: 'home',         labelKey: 'nav_home',         Icon: Home },
  { id: 'scholarships', labelKey: 'nav_scholarships', Icon: BookOpen },
  { id: 'programmes',   labelKey: 'nav_programmes',   Icon: Layers },
  { id: 'documents',    labelKey: 'nav_documents',    Icon: FolderOpen },
  { id: 'jago',         labelKey: 'nav_jago',         Icon: MessageSquare },
];

export function BottomNavigation() {
  const { activeTab, setActiveTab, t } = useApp();

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
        {TABS.map(({ id, labelKey, Icon }) => {
          const active = activeTab === id;
          const label = t(labelKey);
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
              {/* Active indicator bar */}
              {active && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-[#0F766E]"
                  aria-hidden
                />
              )}
              <Icon
                size={20}
                strokeWidth={active ? 2.5 : 1.8}
                style={{ color: active ? '#0F766E' : '#9ca3af', transition: 'color 0.15s' }}
              />
              <span
                className="text-[9px] font-semibold leading-none mt-0.5"
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
