import React from 'react';
import { Language } from '../types/index.ts';
import { translations } from '../data/translations.ts';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language];

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <div className="flex items-center gap-2 font-medium text-slate-900 dark:text-slate-200">
            <span>{t.brand}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{t.poweredBy}</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.tagline}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            {t.footer.privacy}
          </span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span>{t.footer.localAdviceNotice}</span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span>© {new Date().getFullYear()} {t.brand}</span>
        </div>
      </div>
    </footer>
  );
};
