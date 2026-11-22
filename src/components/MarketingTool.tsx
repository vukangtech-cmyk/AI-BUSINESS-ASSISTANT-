import React, { useState } from 'react';
import { Language, MarketingResult } from '../types/index.ts';
import { translations } from '../data/translations.ts';
import {
  Megaphone,
  Copy,
  Check,
  Video,
  Target,
  Sparkles,
  MapPin,
  Tag,
  Share2,
} from 'lucide-react';

interface MarketingToolProps {
  language: Language;
}

export const MarketingTool: React.FC<MarketingToolProps> = ({ language }) => {
  const t = translations[language];

  const [platform, setPlatform] = useState('instagram');
  const [businessName, setBusinessName] = useState('Kilimanjaro Fresh Organics');
  const [productName, setProductName] = useState('Asali Mbichi ya Tabora & Parachichi Safi');
  const [targetAudience, setTargetAudience] = useState('Wapenzi wa afya bora, familia na wafanyakazi wa ofisi Dar es Salaam');
  const [uniqueSellingPoint, setUniqueSellingPoint] = useState('Asali asilia 100% isiyochakachuliwa na matunda mapya kutoka shambani, free delivery kuanzia lita 2');
  const [priceTZS, setPriceTZS] = useState('20,000');
  const [location, setLocation] = useState('Mikocheni & Posta, Dar es Salaam');
  const [contactInfo, setContactInfo] = useState('WhatsApp: 0755 889 900 / Dm kuweka oda');

  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [result, setResult] = useState<MarketingResult>({
    headline: language === 'sw' ? '🍯 Asali Safi ya Nyuki Wakubwa kutoka Tabora!' : '🍯 100% Pure Tabora Honey Direct from the Wild!',
    mainCopy:
      language === 'sw'
        ? `Je, umechoka kutumia asali iliyochanganywa na sukari? Tunakuletea *Asali Mbichi 100% Asilia* kutoka misitu ya Tabora! 🌿\n\n✅ Haipitishwi kwenye moto\n✅ Inatibu kikohozi na kuboresha kinga ya mwili\n✅ Inafaa kwa watoto na wazee\n\n💰 *Bei:* TZS 20,000 tu kwa lita moja.\n🚚 *Usafiri:* Tunakuletea hadi mlangoni kwako popote Dar es Salaam (Free Delivery unaponunua lita 2 au zaidi).\n\n📍 Duka lipo Mikocheni & Posta.\n📞 Bofya link kwenye bio au tuma ujumbe WhatsApp: 0755 889 900 sasa!\n\n#AsaliTabora #AfyaBora #BiasharaTanzania #DarEsSalaam #KilimanjaroFresh #VyakulaAsilia`
        : `Tired of adulterated honey mixed with sugar syrup? Experience the unfiltered richness of *100% Pure Raw Tabora Honey*! 🌿\n\n✅ Never heat-treated or processed\n✅ Boosts immunity and natural vitality\n✅ Safe and nutritious for the entire household\n\n💰 *Price:* Only TZS 20,000 per 1-litre bottle.\n🚚 *Delivery:* Doorstep courier across Dar es Salaam (Complimentary delivery on 2+ bottles).\n\n📍 Located in Mikocheni & Posta.\n📞 Tap the link in bio or WhatsApp 0755 889 900 today!\n\n#TanzaniaBusiness #RawHoney #DarEsSalaam #HealthLivingTZ #OrganicFood`,
    videoHook:
      language === 'sw'
        ? '📹 Video Hook (Sekunde 3 za kwanza): Onyesha kijiko kikimimina asali nzito kwenye glasi ya maji kisha sema: "Hivi unajua jinsi ya kujua kama asali yako ni ya kweli au sukari tupu?"'
        : '📹 Video Hook (First 3 Seconds): Film a spoon slowly drizzling thick golden honey into cold water: "Here is the 5-second test that reveals if your honey is real or fake syrup."',
    callToAction: language === 'sw' ? 'Tuma neno "ASALI" WhatsApp 0755 889 900 kupata chupa yako leo kabla mzigo haujaisha!' : 'Send "HONEY" to WhatsApp 0755 889 900 to claim your bottle today!',
    targetStrategy: [
      language === 'sw'
        ? 'Weka video fupi kwenye Instagram Reels & TikTok kati ya saa 12:30 na 2:00 jioni wakati watu wamerudi kutoka kazini wakiwa kwenye foleni ya Dar.'
        : 'Post short video Reels on Instagram & TikTok between 6:30 PM and 8:00 PM when professionals are commuting in evening traffic.',
      language === 'sw'
        ? 'Jiunge na magroup ya WhatsApp ya mtaani (mf. Makazi Mikocheni, Wazazi Kinondoni) na weka picha zenye risiti za wateja waliopokea mzigo kama ushuhuda.'
        : 'Share buyer delivery receipts and reviews into neighborhood WhatsApp groups as genuine social proof.',
    ],
  });

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/marketing-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform,
          businessName,
          productName,
          targetAudience,
          uniqueSellingPoint,
          priceTZS,
          location,
          contactInfo,
          language,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate campaign');
      setResult(data);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Error generating marketing text');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    const fullText = `${result.headline}\n\n${result.mainCopy}\n\nCTA: ${result.callToAction}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {t.marketing.title}
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {t.marketing.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Form Column */}
        <div className="space-y-6 lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {t.marketing.platformLabel}
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {Object.entries(t.marketing.platforms).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPlatform(key)}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium text-left transition-colors ${
                    platform === key
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
                {language === 'sw' ? 'Jina la Biashara' : 'Business Name'}
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.marketing.productLabel}
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              {t.marketing.audienceLabel}
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              {t.marketing.uspLabel}
            </label>
            <textarea
              rows={2}
              value={uniqueSellingPoint}
              onChange={(e) => setUniqueSellingPoint(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.marketing.priceLabel}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs font-mono text-slate-400">
                  TZS
                </span>
                <input
                  type="text"
                  value={priceTZS}
                  onChange={(e) => setPriceTZS(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-12 pr-3 py-2 text-sm text-slate-900 tabular-nums focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.marketing.locationLabel}
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              {t.marketing.contactLabel}
            </label>
            <input
              type="text"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 disabled:opacity-50 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            <Sparkles className="h-4 w-4" />
            <span>{isLoading ? t.marketing.generating : t.marketing.generateBtn}</span>
          </button>
        </div>

        {/* Output Column */}
        <div className="space-y-6 lg:col-span-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t.marketing.outputHeading}</span>
              </h2>

              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? (language === 'sw' ? 'Imenakiliwa!' : 'Copied!') : t.marketing.copyAd}</span>
              </button>
            </div>

            {/* Headline */}
            <div>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 block mb-1">
                {language === 'sw' ? 'Kichwa cha Habari (Hook)' : 'Headline / Hook'}
              </span>
              <p className="text-lg font-bold text-slate-950 dark:text-white leading-snug">
                {result.headline}
              </p>
            </div>

            {/* Video Script Hook if TikTok/Reels */}
            {result.videoHook && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                  <Video className="h-4 w-4" />
                  <span>{language === 'sw' ? 'Muongozo wa Video (3-Second Visual Hook)' : 'Video Hook (First 3 Seconds)'}</span>
                </div>
                <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed font-sans">
                  {result.videoHook}
                </p>
              </div>
            )}

            {/* Main Advertisement Copy */}
            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-2">
                {language === 'sw' ? 'Maelezo ya Tangazo (Post Copy & Hashtags)' : 'Ad Caption & Hashtags'}
              </span>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs sm:text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                {result.mainCopy}
              </div>
            </div>

            {/* Call To Action */}
            <div className="rounded-xl border border-slate-200 p-3.5 dark:border-slate-800">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                {language === 'sw' ? 'Wito wa Kuchukua Hatua (Call To Action)' : 'Call To Action'}
              </span>
              <p className="text-xs font-semibold text-slate-900 dark:text-white">
                {result.callToAction}
              </p>
            </div>

            {/* Practical Strategy Tips for Tanzania */}
            {result.targetStrategy && result.targetStrategy.length > 0 && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white mb-2">
                  <Target className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{language === 'sw' ? 'Mbinu za Kufikia Wanunuzi Tanzania:' : 'Tanzania Targeting Strategy:'}</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  {result.targetStrategy.map((strat, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                      <span>{strat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
