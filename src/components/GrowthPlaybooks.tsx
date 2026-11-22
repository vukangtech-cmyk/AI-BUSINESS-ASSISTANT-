import React, { useState } from 'react';
import { Language } from '../types/index.ts';
import { translations } from '../data/translations.ts';
import { playbooks, Playbook } from '../data/playbooks.ts';
import {
  BookOpen,
  CheckCircle2,
  Bookmark,
  Share2,
  ChevronDown,
  ChevronUp,
  Search,
  Sparkles,
} from 'lucide-react';

interface GrowthPlaybooksProps {
  language: Language;
}

export const GrowthPlaybooks: React.FC<GrowthPlaybooksProps> = ({ language }) => {
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('lipa-kwa-simu');

  const filteredPlaybooks = playbooks.filter((p) => {
    const q = searchTerm.toLowerCase();
    const title = language === 'sw' ? p.titleSw.toLowerCase() : p.titleEn.toLowerCase();
    const summary = language === 'sw' ? p.summarySw.toLowerCase() : p.summaryEn.toLowerCase();
    return title.includes(q) || summary.includes(q) || p.category.toLowerCase().includes(q);
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header with Search */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {language === 'sw' ? 'Miongozo ya Ukuaji wa Biashara Tanzania' : 'Tanzanian SME Growth Playbooks'}
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {language === 'sw'
              ? 'Mbinu halisi za kibiashara zilizofanyiwa majaribio katika soko la Tanzania.'
              : 'Actionable, battle-tested operational frameworks tailored for Tanzanian enterprises.'}
          </p>
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="absolute inset-y-0 left-0 my-auto ml-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={language === 'sw' ? 'Tafuta mwongozo...' : 'Search playbooks...'}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 shadow-sm focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Hero Showcase Photo */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="p-6 md:col-span-7 space-y-3">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              VUKANG AI · Powered by VukangTech
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">
              {language === 'sw'
                ? 'Kukuza Biashara Yako Kutoka Rejareja Hadi Mtandao wa Jumla'
                : 'Scaling Your Enterprise from Single Retail to Multi-Channel Wholesale'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {language === 'sw'
                ? 'Biashara nyingi nchini Tanzania hushindwa kwa sababu ya kukosa udhibiti wa fedha, kuamini madeni bila mikataba, na kutotumia mifumo ya kisasa ya kidijitali. Jifunze hatua kwa hatua jinsi ya kulinda mtaji wako.'
                : 'Most small businesses fail not from lack of demand, but from uncollected customer credit, mixed accounts, and manual friction. Master these operational disciplines.'}
            </p>
          </div>
          <div className="md:col-span-5 h-48 md:h-full min-h-[200px]">
            <img
              src="/src/assets/images/tanzania_sme_commerce_1793535516233.jpg"
              alt="Tanzanian SME Commerce"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Playbooks Accordion List */}
      <div className="space-y-4">
        {filteredPlaybooks.map((playbook) => {
          const isExpanded = expandedId === playbook.id;
          const title = language === 'sw' ? playbook.titleSw : playbook.titleEn;
          const summary = language === 'sw' ? playbook.summarySw : playbook.summaryEn;
          const actionSteps = language === 'sw' ? playbook.actionStepsSw : playbook.actionStepsEn;
          const goldenRule = language === 'sw' ? playbook.goldenRuleSw : playbook.goldenRuleEn;

          return (
            <div
              key={playbook.id}
              className="rounded-2xl border border-slate-200 bg-white transition-all shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleExpand(playbook.id)}
                className="flex w-full items-start justify-between p-6 text-left transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/40"
              >
                <div className="space-y-1 pr-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>{playbook.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{playbook.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {summary}
                  </p>
                </div>

                <div className="shrink-0 rounded-lg border border-slate-200 p-1.5 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-slate-100 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-950/40 space-y-6">
                  {/* Action Steps */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                      {language === 'sw' ? 'Hatua za Kiutendaji (Actionable Steps)' : 'Operational Action Steps'}
                    </h4>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {actionSteps.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900"
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            {idx + 1}
                          </span>
                          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Golden Rule Callout */}
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30">
                    <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider block mb-1">
                      {language === 'sw' ? '⭐ Kanuni ya Dhahabu (Golden Rule)' : '⭐ Golden Principle'}
                    </span>
                    <p className="text-sm font-semibold text-emerald-950 dark:text-emerald-100 italic">
                      "{goldenRule}"
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
