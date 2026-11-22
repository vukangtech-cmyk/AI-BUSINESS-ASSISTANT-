import React from 'react';
import { ActiveTab, Language } from '../types/index.ts';
import { translations } from '../data/translations.ts';
import { Globe, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isDark: boolean;
  setIsDark: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  isDark,
  setIsDark,
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('chat');
          }}
          className="shrink-0 text-xl font-bold tracking-tight text-slate-950 transition-opacity hover:opacity-90 dark:text-white"
        >
          {t.brand}
        </a>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            type="button"
            onClick={() => setActiveTab('chat')}
            className={`shrink-0 whitespace-nowrap transition-colors py-1 ${
              activeTab === 'chat'
                ? 'font-semibold text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.tabs.chat}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('whatsapp')}
            className={`shrink-0 whitespace-nowrap transition-colors py-1 ${
              activeTab === 'whatsapp'
                ? 'font-semibold text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.tabs.whatsapp}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('marketing')}
            className={`shrink-0 whitespace-nowrap transition-colors py-1 ${
              activeTab === 'marketing'
                ? 'font-semibold text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.tabs.marketing}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('calculators')}
            className={`shrink-0 whitespace-nowrap transition-colors py-1 ${
              activeTab === 'calculators'
                ? 'font-semibold text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.tabs.calculators}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('playbooks')}
            className={`shrink-0 whitespace-nowrap transition-colors py-1 ${
              activeTab === 'playbooks'
                ? 'font-semibold text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.tabs.playbooks}
          </button>
        </nav>

        {/* Zone 3: 1 primary action cluster */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Language Switcher */}
          <button
            type="button"
            onClick={() => setLanguage(language === 'sw' ? 'en' : 'sw')}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
            title="Switch Language (Swahili / English)"
            aria-label="Switch Language"
          >
            <Globe className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="tabular-nums font-mono">{language === 'sw' ? 'SW' : 'EN'}</span>
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={() => setIsDark(!isDark)}
            className="rounded-lg border border-slate-200 p-1.5 text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
            title="Toggle Light / Dark mode"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <div className="flex md:hidden items-center justify-around overflow-x-auto border-t border-slate-200 bg-slate-50 px-2 py-2 dark:border-slate-800 dark:bg-slate-900">
        <button
          type="button"
          onClick={() => setActiveTab('chat')}
          className={`shrink-0 whitespace-nowrap px-2.5 py-1 text-xs font-medium rounded-md ${
            activeTab === 'chat'
              ? 'bg-emerald-600 text-white'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          {t.tabs.chat}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('whatsapp')}
          className={`shrink-0 whitespace-nowrap px-2.5 py-1 text-xs font-medium rounded-md ${
            activeTab === 'whatsapp'
              ? 'bg-emerald-600 text-white'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          {t.tabs.whatsapp}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('marketing')}
          className={`shrink-0 whitespace-nowrap px-2.5 py-1 text-xs font-medium rounded-md ${
            activeTab === 'marketing'
              ? 'bg-emerald-600 text-white'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          {t.tabs.marketing}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('calculators')}
          className={`shrink-0 whitespace-nowrap px-2.5 py-1 text-xs font-medium rounded-md ${
            activeTab === 'calculators'
              ? 'bg-emerald-600 text-white'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          {t.tabs.calculators}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('playbooks')}
          className={`shrink-0 whitespace-nowrap px-2.5 py-1 text-xs font-medium rounded-md ${
            activeTab === 'playbooks'
              ? 'bg-emerald-600 text-white'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          {t.tabs.playbooks}
        </button>
      </div>
    </header>
  );
};
