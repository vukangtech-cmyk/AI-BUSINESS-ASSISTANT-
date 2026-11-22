/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, Language } from './types/index.ts';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { AIConsultantChat } from './components/AIConsultantChat.tsx';
import { WhatsAppTool } from './components/WhatsAppTool.tsx';
import { MarketingTool } from './components/MarketingTool.tsx';
import { FinancialCalculators } from './components/FinancialCalculators.tsx';
import { GrowthPlaybooks } from './components/GrowthPlaybooks.tsx';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [language, setLanguage] = useState<Language>('sw'); // Default to Swahili for Tanzanian SMEs
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-150">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        isDark={isDark}
        setIsDark={setIsDark}
      />

      <main className="flex-1">
        {activeTab === 'chat' && <AIConsultantChat language={language} />}
        {activeTab === 'whatsapp' && <WhatsAppTool language={language} />}
        {activeTab === 'marketing' && <MarketingTool language={language} />}
        {activeTab === 'calculators' && <FinancialCalculators language={language} />}
        {activeTab === 'playbooks' && <GrowthPlaybooks language={language} />}
      </main>

      <Footer language={language} />
    </div>
  );
}
