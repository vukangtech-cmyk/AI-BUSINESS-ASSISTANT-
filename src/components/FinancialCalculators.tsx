import React, { useState } from 'react';
import { Language, BusinessAdviceResult } from '../types/index.ts';
import { translations } from '../data/translations.ts';
import { formatTZS, parseTZS } from '../utils/formatters.ts';
import confetti from 'canvas-confetti';
import {
  Calculator,
  TrendingUp,
  Percent,
  Receipt,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface FinancialCalculatorsProps {
  language: Language;
}

export const FinancialCalculators: React.FC<FinancialCalculatorsProps> = ({ language }) => {
  const t = translations[language];

  const [activeSubTab, setActiveSubTab] = useState<'margin' | 'breakeven' | 'vat' | 'debt'>('margin');

  // Profit Margin Calculator State
  const [costPrice, setCostPrice] = useState('15,000');
  const [sellingPrice, setSellingPrice] = useState('22,000');
  const [unitsSold, setUnitsSold] = useState('100');

  // Break-even State
  const [fixedCosts, setFixedCosts] = useState('650,000'); // Rent 350k + LUKU 100k + salary 200k
  const [unitVariableCost, setUnitVariableCost] = useState('8,000');
  const [unitPrice, setUnitPrice] = useState('14,000');

  // TRA VAT State
  const [vatBaseAmount, setVatBaseAmount] = useState('1,000,000');
  const [isVatInclusive, setIsVatInclusive] = useState(false);

  // Debt Risk State
  const [customerDebts, setCustomerDebts] = useState('2,500,000');
  const [liquidCapital, setLiquidCapital] = useState('5,000,000');

  // AI Audit State
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<BusinessAdviceResult | null>(null);

  // Margin Computations
  const numCost = parseTZS(costPrice);
  const numSell = parseTZS(sellingPrice);
  const numUnits = parseTZS(unitsSold) || 1;

  const totalCost = numCost * numUnits;
  const totalRevenue = numSell * numUnits;
  const grossProfit = totalRevenue - totalCost;
  const profitMarginPercent = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;
  const markupPercent = numCost > 0 ? ((numSell - numCost) / numCost) * 100 : 0;

  // Break-even Computations
  const numFixed = parseTZS(fixedCosts);
  const numVarCost = parseTZS(unitVariableCost);
  const numPrice = parseTZS(unitPrice);
  const contributionMarginPerUnit = numPrice - numVarCost;
  const breakEvenUnits = contributionMarginPerUnit > 0 ? Math.ceil(numFixed / contributionMarginPerUnit) : 0;
  const breakEvenRevenue = breakEvenUnits * numPrice;

  // VAT Computations (TRA standard 18%)
  const numVatBase = parseTZS(vatBaseAmount);
  let netVatAmount = 0;
  let computedVat = 0;
  let grossVatAmount = 0;

  if (isVatInclusive) {
    // Price includes 18% VAT: Base / 1.18 = Net
    netVatAmount = numVatBase / 1.18;
    computedVat = numVatBase - netVatAmount;
    grossVatAmount = numVatBase;
  } else {
    // Price is exclusive: Net + 18% = Gross
    netVatAmount = numVatBase;
    computedVat = numVatBase * 0.18;
    grossVatAmount = netVatAmount + computedVat;
  }

  // Debt Risk Computations
  const numDebts = parseTZS(customerDebts);
  const numCapital = parseTZS(liquidCapital);
  const debtRatio = numCapital > 0 ? (numDebts / numCapital) * 100 : 0;

  // Trigger celebration confetti if healthy profit margin > 30%
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const handleRunAiAudit = async () => {
    setIsLoadingAdvice(true);
    try {
      let inputsData: any = {};
      if (activeSubTab === 'margin') {
        inputsData = {
          costPriceTZS: numCost,
          sellingPriceTZS: numSell,
          unitsSold: numUnits,
          totalRevenueTZS: totalRevenue,
          grossProfitTZS: grossProfit,
          profitMarginPercent: profitMarginPercent.toFixed(1) + '%',
          markupPercent: markupPercent.toFixed(1) + '%',
        };
      } else if (activeSubTab === 'breakeven') {
        inputsData = {
          monthlyFixedOverheadsTZS: numFixed,
          unitVariableCostTZS: numVarCost,
          unitPriceTZS: numPrice,
          breakEvenUnitsRequired: breakEvenUnits,
          breakEvenMonthlyRevenueTZS: breakEvenRevenue,
        };
      } else if (activeSubTab === 'vat') {
        inputsData = {
          baseAmountTZS: numVatBase,
          isInclusive: isVatInclusive,
          netAmountTZS: Math.round(netVatAmount),
          traVat18PercentTZS: Math.round(computedVat),
          grossAmountTZS: Math.round(grossVatAmount),
        };
      } else {
        inputsData = {
          unpaidCustomerDebtsTZS: numDebts,
          totalWorkingCapitalTZS: numCapital,
          debtExposurePercentage: debtRatio.toFixed(1) + '%',
        };
      }

      const res = await fetch('/api/business-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calculationType: activeSubTab,
          inputs: inputsData,
          businessType: 'Tanzanian Retail & Wholesale SME',
          language,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to get audit');
      setAiAdvice(data);
      if (profitMarginPercent >= 30) triggerConfetti();
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Error running financial audit');
    } finally {
      setIsLoadingAdvice(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {t.calculators.title}
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {t.calculators.subtitle}
        </p>
      </div>

      {/* Calculator Mode Switcher Tabs */}
      <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-4 dark:border-slate-800">
        <button
          type="button"
          onClick={() => {
            setActiveSubTab('margin');
            setAiAdvice(null);
          }}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
            activeSubTab === 'margin'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
          }`}
        >
          <TrendingUp className="h-3.5 w-3.5" />
          <span>{t.calculators.marginTab}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveSubTab('breakeven');
            setAiAdvice(null);
          }}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
            activeSubTab === 'breakeven'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
          }`}
        >
          <Calculator className="h-3.5 w-3.5" />
          <span>{t.calculators.breakevenTab}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveSubTab('vat');
            setAiAdvice(null);
          }}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
            activeSubTab === 'vat'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
          }`}
        >
          <Receipt className="h-3.5 w-3.5" />
          <span>{t.calculators.vatTab}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveSubTab('debt');
            setAiAdvice(null);
          }}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
            activeSubTab === 'debt'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
          }`}
        >
          <AlertTriangle className="h-3.5 w-3.5" />
          <span>{t.calculators.debtRiskTab}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Interactive Calculator Inputs: 5 Columns */}
        <div className="space-y-6 lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            {language === 'sw' ? 'Weka Takwimu za Biashara' : 'Enter Financial Figures'}
          </h2>

          {activeSubTab === 'margin' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.calculators.costPrice}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs font-mono text-slate-400">
                    TZS
                  </span>
                  <input
                    type="text"
                    value={costPrice}
                    onChange={(e) => setCostPrice(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-12 pr-3 py-2 text-sm text-slate-900 tabular-nums focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.calculators.sellingPrice}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs font-mono text-slate-400">
                    TZS
                  </span>
                  <input
                    type="text"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-12 pr-3 py-2 text-sm text-slate-900 tabular-nums focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.calculators.unitsSold}
                </label>
                <input
                  type="text"
                  value={unitsSold}
                  onChange={(e) => setUnitsSold(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 tabular-nums focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white font-mono"
                />
              </div>
            </div>
          )}

          {activeSubTab === 'breakeven' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.calculators.fixedCosts}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs font-mono text-slate-400">
                    TZS
                  </span>
                  <input
                    type="text"
                    value={fixedCosts}
                    onChange={(e) => setFixedCosts(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-12 pr-3 py-2 text-sm text-slate-900 tabular-nums focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white font-mono"
                  />
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  {language === 'sw' ? 'Mfano: Pango TZS 350,000 + Mishahara 200,000 + LUKU 100,000' : 'e.g., Rent 350,000 + Wages 200,000 + Utilities 100,000'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.calculators.variableCost}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs font-mono text-slate-400">
                    TZS
                  </span>
                  <input
                    type="text"
                    value={unitVariableCost}
                    onChange={(e) => setUnitVariableCost(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-12 pr-3 py-2 text-sm text-slate-900 tabular-nums focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'sw' ? 'Bei ya Kuuza Kila Bidhaa (Selling Price)' : 'Unit Selling Price (TZS)'}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs font-mono text-slate-400">
                    TZS
                  </span>
                  <input
                    type="text"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-12 pr-3 py-2 text-sm text-slate-900 tabular-nums focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'vat' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'sw' ? 'Kiasi cha Ankara / Ankara ya Bidhaa (TZS)' : 'Invoice Base Amount (TZS)'}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs font-mono text-slate-400">
                    TZS
                  </span>
                  <input
                    type="text"
                    value={vatBaseAmount}
                    onChange={(e) => setVatBaseAmount(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-12 pr-3 py-2 text-sm text-slate-900 tabular-nums focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="vatInclusive"
                  checked={isVatInclusive}
                  onChange={(e) => setIsVatInclusive(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="vatInclusive" className="text-xs text-slate-700 dark:text-slate-300">
                  {language === 'sw' ? 'Kiasi hiki kimeshajumuisha VAT 18% (VAT Inclusive)' : 'Amount is already inclusive of 18% VAT'}
                </label>
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3 text-xs text-blue-800 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-200">
                {t.calculators.vatExplanation}
              </div>
            </div>
          )}

          {activeSubTab === 'debt' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'sw' ? 'Jumla ya Madeni ya Wateja (Debts / Receivables TZS)' : 'Total Outstanding Customer Debts (TZS)'}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs font-mono text-slate-400">
                    TZS
                  </span>
                  <input
                    type="text"
                    value={customerDebts}
                    onChange={(e) => setCustomerDebts(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-12 pr-3 py-2 text-sm text-slate-900 tabular-nums focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'sw' ? 'Mtaji wa Mzunguko / Pesa Taslimu (Working Capital TZS)' : 'Working Capital & Cash Reserves (TZS)'}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs font-mono text-slate-400">
                    TZS
                  </span>
                  <input
                    type="text"
                    value={liquidCapital}
                    onChange={(e) => setLiquidCapital(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-12 pr-3 py-2 text-sm text-slate-900 tabular-nums focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-xs text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200">
                {t.calculators.debtWarning}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleRunAiAudit}
            disabled={isLoadingAdvice}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 disabled:opacity-50 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            <Sparkles className="h-4 w-4" />
            <span>{isLoadingAdvice ? t.calculators.analyzing : t.calculators.askAiAudit}</span>
          </button>
        </div>

        {/* Live Calculation Results: 7 Columns */}
        <div className="space-y-6 lg:col-span-7">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              {language === 'sw' ? 'Matokeo ya Hesabu za Moja kwa Moja' : 'Live Calculation Breakdown'}
            </h2>

            {/* Results Grid according to active subtab */}
            {activeSubTab === 'margin' && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                    {t.calculators.grossProfit}
                  </span>
                  <span className="mt-1 block text-lg font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                    {formatTZS(grossProfit)}
                  </span>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                    {t.calculators.profitMargin}
                  </span>
                  <span className={`mt-1 block text-lg font-bold font-mono tabular-nums ${
                    profitMarginPercent >= 25 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                  }`}>
                    {profitMarginPercent.toFixed(1)}%
                  </span>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                    {t.calculators.markup}
                  </span>
                  <span className="mt-1 block text-lg font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                    {markupPercent.toFixed(1)}%
                  </span>
                </div>
              </div>
            )}

            {activeSubTab === 'breakeven' && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                    {t.calculators.breakevenUnits}
                  </span>
                  <span className="mt-1 block text-xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                    {breakEvenUnits.toLocaleString()} {language === 'sw' ? 'vipande / bidhaa' : 'units'}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {language === 'sw' ? 'Kufidia gharama za kila mwezi' : 'To cover monthly overheads'}
                  </span>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                    {t.calculators.breakevenRevenue}
                  </span>
                  <span className="mt-1 block text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                    {formatTZS(breakEvenRevenue)}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {language === 'sw' ? 'Kiwango cha chini cha mauzo' : 'Minimum monthly sales target'}
                  </span>
                </div>
              </div>
            )}

            {activeSubTab === 'vat' && (
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-800/50">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                    {language === 'sw' ? 'Thamani Halisi (Net)' : 'Net Amount'}
                  </span>
                  <span className="mt-1 block text-sm sm:text-base font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                    {formatTZS(netVatAmount)}
                  </span>
                </div>

                <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3.5 dark:border-emerald-950 dark:bg-emerald-950/20">
                  <span className="text-xs text-emerald-800 dark:text-emerald-300 font-medium block">
                    {language === 'sw' ? 'Kodi ya TRA (18%)' : 'TRA VAT (18%)'}
                  </span>
                  <span className="mt-1 block text-sm sm:text-base font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                    {formatTZS(computedVat)}
                  </span>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-800/50">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                    {language === 'sw' ? 'Jumla (Gross)' : 'Gross Amount'}
                  </span>
                  <span className="mt-1 block text-sm sm:text-base font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                    {formatTZS(grossVatAmount)}
                  </span>
                </div>
              </div>
            )}

            {activeSubTab === 'debt' && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                    {language === 'sw' ? 'Kiwango cha Hatari ya Madeni' : 'Receivables Exposure'}
                  </span>
                  <span className={`mt-1 block text-2xl font-bold font-mono tabular-nums ${
                    debtRatio > 35 ? 'text-rose-600' : debtRatio > 20 ? 'text-amber-600' : 'text-emerald-600'
                  }`}>
                    {debtRatio.toFixed(1)}%
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {debtRatio > 25
                      ? (language === 'sw' ? '⚠️ Iko juu ya kiwango salama (25%)' : '⚠️ Above safe liquidity threshold (25%)')
                      : (language === 'sw' ? '✅ Iko ndani ya udhibiti' : '✅ Within safe bounds')}
                  </span>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                    {language === 'sw' ? 'Pesa Iliyozuiwa na Wateja' : 'Tied-Up Working Capital'}
                  </span>
                  <span className="mt-1 block text-xl font-bold font-mono tabular-nums text-rose-600 dark:text-rose-400">
                    {formatTZS(numDebts)}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {language === 'sw' ? 'Inapaswa kufuatiliwa kwa simu au WhatsApp' : 'Priority for WhatsApp follow-up'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* AI Deep Audit Output */}
          {aiAdvice && (
            <div className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm dark:border-emerald-900/60 dark:bg-slate-900 space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {language === 'sw' ? 'Uchambuzi na Ushauri wa Vukang AI' : 'Vukang AI Financial Audit'}
                </h3>
              </div>

              <p className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                {aiAdvice.summary}
              </p>

              {/* Step by step math */}
              {aiAdvice.stepByStepMath && aiAdvice.stepByStepMath.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                    {language === 'sw' ? 'Hesabu Hatua kwa Hatua (Step-by-Step Math)' : 'Step-by-Step Mathematical Calculations'}
                  </h4>
                  <ul className="space-y-1.5 rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300 font-mono">
                    {aiAdvice.stepByStepMath.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">[{idx + 1}]</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Risk Assessment */}
              {aiAdvice.riskAssessment && (
                <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs dark:border-amber-900/40 dark:bg-amber-950/30">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200 mb-1">
                    <ShieldAlert className="h-4 w-4" />
                    <span>{language === 'sw' ? 'Tathmini ya Hatari (Risk Assessment)' : 'Risk Assessment'}</span>
                  </div>
                  <p className="text-amber-900 dark:text-amber-200 leading-relaxed font-sans">
                    {aiAdvice.riskAssessment}
                  </p>
                </div>
              )}

              {/* Actionable Recommendations */}
              {aiAdvice.actionableRecommendations && aiAdvice.actionableRecommendations.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                    {language === 'sw' ? 'Hatua za Kuchukua Wiki Hii (Actionable Steps)' : 'Strategic Actions for This Week'}
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {aiAdvice.actionableRecommendations.map((rec, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
