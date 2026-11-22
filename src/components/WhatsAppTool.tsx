import React, { useState } from 'react';
import { Language, WhatsAppMessageResult } from '../types/index.ts';
import { translations } from '../data/translations.ts';
import { generateWhatsAppLink } from '../utils/formatters.ts';
import {
  MessageSquare,
  Copy,
  Check,
  Send,
  Phone,
  Clock,
  Lightbulb,
  Sparkles,
  Smartphone,
  CheckCheck,
} from 'lucide-react';

interface WhatsAppToolProps {
  language: Language;
}

export const WhatsAppTool: React.FC<WhatsAppToolProps> = ({ language }) => {
  const t = translations[language];

  const [type, setType] = useState<string>('broadcast');
  const [businessName, setBusinessName] = useState('Duka Letu Kariakoo');
  const [productOrService, setProductOrService] = useState('Mashati ya Pamba & Suruali za Kisasa');
  const [customerName, setCustomerName] = useState('');
  const [price, setPrice] = useState('35,000');
  const [details, setDetails] = useState('Nunua 2 upate punguzo la 10%. Mzigo mpya kutoka Uturuki. Lipa Namba ya M-Pesa: 5123456');
  const [tone, setTone] = useState('professional');
  const [phone, setPhone] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<WhatsAppMessageResult>({
    headline: language === 'sw' ? 'Tangazo la Mzigo Mpya' : 'New Stock Announcement',
    messageText:
      language === 'sw'
        ? `Habari ndugu mteja! ✨\n\nTunayofuraha kukujulisha kuwa *mzigo mpya wa Mashati ya Pamba & Suruali* umewasili leo dukani kwetu Kariakoo! 🇹🇿\n\n📌 *Bei Maalum:* TZS 35,000 tu kwa kila moja.\n🎁 *Ofa ya Wiki:* Nunua vipande 2 upate punguzo la *10%* mara moja!\n\n💳 *Jinsi ya Kulipa:* Lipa kwa M-Pesa Till: *5123456* (Jina: Duka Letu Kariakoo).\n📍 *Mahali Tulipo:* Mtaa wa Kongo / Nyamwezi, Kariakoo.\n\n📦 *Usafiri:* Tunatuma mikoani kote Tanzania kupitia mabasi ya uhakika.\n\nKuweka oda yako kabla mzigo haujaisha, jibu ujumbe huu au piga simu sasa! 📞`
        : `Hello valued customer! ✨\n\nWe are excited to inform you that our fresh stock of *Cotton Shirts & Modern Trousers* has officially landed at our Kariakoo store! 🇹🇿\n\n📌 *Special Price:* TZS 35,000 each.\n🎁 *Weekly Offer:* Buy 2 pieces and receive an instant *10% discount*!\n\n💳 *Payment:* Lipa kwa M-Pesa Till: *5123456* (Name: Duka Letu Kariakoo).\n📍 *Location:* Kongo / Nyamwezi Street, Kariakoo.\n\n📦 *Nationwide Delivery:* Parcels dispatched to all regions across Tanzania.\n\nTo lock in your order before stock clears, reply directly to this message or call now! 📞`,
    suggestedTime:
      language === 'sw'
        ? 'Tuma asubuhi kati ya saa 3:00 - 4:30 Asubuhi au jioni saa 11:30 - 1:00 Usiku.'
        : 'Best sent 9:00 AM - 10:30 AM or 5:30 PM - 7:00 PM.',
    followUpAdvice:
      language === 'sw'
        ? 'Kama mteja ataonyesha nia lakini hajaweka oda ndani ya masaa 24, mtumie picha 2 za rangi zilizobaki na umkumbushe kuwa mzigo ni mchache.'
        : 'If an interested buyer does not confirm within 24 hours, share 2 clear photos of remaining colors with gentle scarcity reminder.',
  });

  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/whatsapp-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          businessName,
          productOrService,
          customerName,
          price,
          details,
          tone,
          phone,
          language,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate message');
      setResult(data);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Error generating message');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result.messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappDirectUrl = generateWhatsAppLink(result.messageText, phone);

  // Quick preset loader
  const loadPreset = (presetType: string) => {
    setType(presetType);
    if (presetType === 'debt_reminder') {
      setProductOrService(language === 'sw' ? 'Salio la Mzigo wa Wiki Iliyopita' : 'Balance for Last Week Stock');
      setPrice('150,000');
      setDetails(
        language === 'sw'
          ? 'Salio linatakiwa kulipwa kupitia Lipa Namba 5123456. Malipo ya heshima na adabu.'
          : 'Balance due via Lipa Namba 5123456. Courteous respectful reminder.'
      );
      setTone('respectful');
    } else if (presetType === 'order_confirmation') {
      setProductOrService(language === 'sw' ? 'Oda ya Mabegi 2 ya Nguo' : 'Order of 2 Travel Bags');
      setPrice('70,000');
      setDetails(
        language === 'sw'
          ? 'Malipo yamethibitishwa. Mzigo unatumwa leo kupitia Basi la Shabiby kwenda Dodoma. Risiti namba #4092'
          : 'Payment verified. Parcel dispatched today via Shabiby Bus to Dodoma. Receipt #4092'
      );
    } else if (presetType === 'quote') {
      setProductOrService(language === 'sw' ? 'Vifaa vya Rangi & Mabomba ya Maji' : 'Paint & Plumbing Supplies');
      setPrice('450,000');
      setDetails(
        language === 'sw'
          ? 'Makadirio haya ni halali kwa siku 7. Bei inajumuisha usafiri ndani ya Dar es Salaam.'
          : 'Quotation valid for 7 business days. Includes delivery within Dar es Salaam.'
      );
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Module Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {t.whatsapp.title}
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {t.whatsapp.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Left Form: 7 Columns */}
        <div className="space-y-6 lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {/* Quick preset selector buttons */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {t.whatsapp.messageType}
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {Object.entries(t.whatsapp.types).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => loadPreset(key)}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium text-left transition-colors ${
                    type === key
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-200'
                      : 'border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.whatsapp.businessName}
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                placeholder="Mf. Mama Neema Boutique"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.whatsapp.customerName}
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                placeholder="Mf. Bwana Juma (hiari)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.whatsapp.productService}
              </label>
              <input
                type="text"
                value={productOrService}
                onChange={(e) => setProductOrService(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                placeholder="Mf. Viatu vya ngozi / Huduma ya pishi"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.whatsapp.priceAmount}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs font-mono text-slate-400">
                  TZS
                </span>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-12 pr-3 py-2 text-sm text-slate-900 tabular-nums focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white font-mono"
                  placeholder="35,000"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              {t.whatsapp.detailsLabel}
            </label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder="Eleza ofa, masharti, namba ya Lipa kwa simu, au tarehe ya mwisho..."
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.whatsapp.customerPhone}
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 tabular-nums font-mono focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                placeholder="Mf. 0754123456 au 255754123456"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.whatsapp.toneLabel}
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="professional">Kibiashara & Rasmi (Professional)</option>
                <option value="respectful">Adabu & Heshima (Respectful / Debt)</option>
                <option value="friendly">Urafiki & Bashasha (Warm & Friendly)</option>
                <option value="urgent">Haraka / Nafasi Chache (Scarcity / Urgent)</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 disabled:opacity-50 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            <Sparkles className="h-4 w-4" />
            <span>{isLoading ? t.whatsapp.generating : t.whatsapp.generateBtn}</span>
          </button>
        </div>

        {/* Right Phone Simulation Preview: 5 Columns */}
        <div className="space-y-4 lg:col-span-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              {t.whatsapp.previewHeading}
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? t.whatsapp.copied : t.whatsapp.copyBtn}</span>
              </button>

              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
                <span>{t.whatsapp.sendWhatsAppBtn}</span>
              </a>
            </div>
          </div>

          {/* Smartphone Frame */}
          <div className="relative mx-auto w-full max-w-sm rounded-[2.5rem] border-4 border-slate-800 bg-slate-900 p-2 shadow-xl dark:border-slate-700">
            {/* Phone Screen */}
            <div className="overflow-hidden rounded-[2rem] bg-[#0b141a] text-slate-100 flex flex-col h-[520px]">
              {/* WhatsApp App Header */}
              <div className="flex items-center justify-between bg-[#1f2c34] px-4 py-3 border-b border-[#2a3942]">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white uppercase">
                    {businessName ? businessName.charAt(0) : 'V'}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white truncate max-w-[150px]">
                      {businessName || 'Vukang Business'}
                    </h3>
                    <p className="text-[10px] text-emerald-400 font-medium">online</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-xs">
                  <Phone className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* Chat Canvas with WhatsApp-style background pattern */}
              <div className="flex-1 overflow-y-auto p-4 bg-[#0b141a] bg-opacity-95 flex flex-col justify-end">
                {/* Bubble */}
                <div className="self-end max-w-[90%] rounded-xl rounded-tr-none bg-[#005c4b] p-3 text-xs text-white shadow-md space-y-1">
                  <div className="whitespace-pre-wrap leading-relaxed font-sans">
                    {result.messageText}
                  </div>
                  <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-200/80 pt-1">
                    <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <CheckCheck className="h-3.5 w-3.5 text-sky-400" />
                  </div>
                </div>
              </div>

              {/* Mock Chat Input Footer */}
              <div className="flex items-center gap-2 bg-[#1f2c34] px-3 py-2 text-xs text-slate-400">
                <span className="flex-1 rounded-full bg-[#2a3942] px-3 py-1.5 text-[11px] text-slate-400">
                  Message...
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00a884] text-white">
                  <Send className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Strategic Tips Box */}
          <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 text-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {t.whatsapp.bestTimeToPost}
                </span>
                <p className="text-slate-600 dark:text-slate-400 mt-0.5">{result.suggestedTime}</p>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Lightbulb className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {t.whatsapp.followUpAdvice}
                </span>
                <p className="text-slate-600 dark:text-slate-400 mt-0.5">{result.followUpAdvice || result.followUpTip}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
