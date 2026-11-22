export interface Playbook {
  id: string;
  category: string;
  titleSw: string;
  titleEn: string;
  summarySw: string;
  summaryEn: string;
  badge: string;
  readTime: string;
  actionStepsSw: string[];
  actionStepsEn: string[];
  goldenRuleSw: string;
  goldenRuleEn: string;
}

export const playbooks: Playbook[] = [
  {
    id: 'lipa-kwa-simu',
    category: 'Fedha & Malipo (Finance)',
    titleSw: 'Mbinu za Kudhibiti Malipo ya Lipa kwa Simu (M-Pesa / Tigo / Airtel)',
    titleEn: 'Mastering Mobile Money Payments (M-Pesa / Tigo / Airtel)',
    summarySw: 'Jinsi ya kutenganisha fedha za kibinafsi na za duka, kuepuka makato yasiyo ya lazima, na kusawazisha mahesabu kila jioni.',
    summaryEn: 'How to separate business cash from personal funds, eliminate reconciliation errors, and leverage merchant till numbers.',
    badge: 'Malipo',
    readTime: '3 min read',
    actionStepsSw: [
      'Sajili Lipa Namba ya Biashara (Merchant Till) badala ya kutumia namba ya kawaida ya simu ili kujenga heshima ya kibiashara na kupunguza makato ya kutoa fedha.',
      'Fanya mapatano (reconciliation) ya mauzo ya simu kila siku saa 12 jioni kabla ya kufunga duka. Linganisha SMS za miamala na daftari la stoo.',
      'Usiwahi kutoa pesa ya mtaji wa mzunguko kwenye simu kwa matumizi ya kibinafsi (mf. chakula, nauli, marafiki) bila kuandika kama mshahara wako binafsi.',
      'Weka kibao au stika ya QR code na Lipa Namba mahali ambapo mteja anaiona mara moja bila kuanza kuuliza.',
    ],
    actionStepsEn: [
      'Register a dedicated Merchant Till (Lipa Namba) rather than personal phone lines to build institutional trust and minimize consumer cashout fees.',
      'Reconcile mobile transaction SMS records with daily register books every evening at 6:00 PM before closing.',
      'Never draw working capital directly from mobile money balances for spontaneous personal expenses without logging it as formal owner wage.',
      'Display high-visibility Till stickers and QR codes at eye level on checkout counters to reduce transaction friction.',
    ],
    goldenRuleSw: 'Pesa ya biashara si yako; wewe ni mwajiriwa wa kwanza wa biashara yako.',
    goldenRuleEn: 'Business cash is not your personal wallet; you are simply the first employee of your enterprise.',
  },
  {
    id: 'kudhibiti-madeni',
    category: 'Mzunguko wa Mtaji (Working Capital)',
    titleSw: 'Mbinu 5 za Kudhibiti na Kupunguza Madeni ya Wateja Bila Kupoteza Uhusiano',
    titleEn: '5 Proven Rules to Control & Recover Customer Debts Without Breaking Bonds',
    summarySw: 'Madeni yasiyolipika ndiyo sababu namba moja ya vifo vya maduka ya rejareja nchini Tanzania. Fuata kanuni hizi.',
    summaryEn: 'Uncollected customer credit is the primary cause of retail failure across East Africa. Here is how to safeguard liquidity.',
    badge: 'Mtaji',
    readTime: '4 min read',
    actionStepsSw: [
      'Weka kiwango cha juu cha deni (Credit Limit) kwa kila mteja mwaminifu; kamwe usiruhusu deni lizidi 20% ya thamani anayonunua kwa mwezi.',
      'Usitoe bidhaa kwa mkopo kabla mteja hajamaliza deni la awali—kanuni ya: "Lipa ya zamani ndipo uchukue mpya".',
      'Tuma ujumbe wa heshima wa WhatsApp siku 2 kabla ya tarehe ya ahadi, ukimkumbusha kwa lugha ya staha pamoja na namba ya kulipa.',
      'Kwa bidhaa za bei kubwa au oda maalum, dai angalau 60% ya malipo ya awali (deposit/advance) kabla ya kukabidhi mzigo.',
    ],
    actionStepsEn: [
      'Enforce strict credit ceilings for trusted accounts—never allow outstanding balance to surpass 20% of their monthly volume.',
      'Enforce the consecutive payment rule: No fresh inventory on credit until the previous invoice balance is cleared in full.',
      'Send a courteous WhatsApp courtesy notice 48 hours prior to the promised payment deadline with payment till details.',
      'Mandate at least a 60% advance commitment deposit on custom orders and wholesale dispatches before goods leave premises.',
    ],
    goldenRuleSw: 'Ni bora kukosa mteja kuliko kumpa mzigo akaupoteze pamoja na mtaji wako.',
    goldenRuleEn: 'It is better to lose an unprofitable buyer than to lose both your inventory and your working capital.',
  },
  {
    id: 'kariakoo-sourcing',
    category: 'Ununuzi & Stoo (Inventory)',
    titleSw: 'Mbinu za Kununua Mzigo Kariakoo na Masoko Makuu ya Jumla',
    titleEn: 'Smart Sourcing Tactics in Kariakoo & Central Wholesale Markets',
    summarySw: 'Kupata bei ya chini kabisa, kukagua ubora, na kupanga usafiri salama wa mabasi au maroli mikoani.',
    summaryEn: 'Negotiating the best wholesale tier, rigorous defect checks, and organizing regional logistics securely.',
    badge: 'Stoo & Mzigo',
    readTime: '4 min read',
    actionStepsSw: [
      'Usikimbilie kununua duka la kwanza barabarani; maduka yaliyopo ghorofani au vichochoroni (mitaa ya nyuma) mara nyingi yana bei nafuu zaidi kwa sababu pango lao ni dogo.',
      'Kagua angalau asilimia 10 ya katoni kabla ya kulipa ili kubaini kama kuna bidhaa zenye hitilafu au zilizoisha muda wake.',
      'Jenga uhusiano wa kudumu na muuzaji mmoja au wawili wakuu ili uweze kutumiwa picha za mzigo mpya kupitia WhatsApp bila kulazimika kusafiri kila wiki.',
      'Tumia ofisi rasmi za mizigo za mabasi au kampuni za logistics zenye stakabadhi badala ya kumpa mpagazi au mtu usiyemjua.',
    ],
    actionStepsEn: [
      'Avoid roadside storefronts where rents inflate wholesale margins; mezzanine and inner-lane merchants consistently offer 10-15% better rates.',
      'Perform random quality audits on at least 10% of master cartons prior to final payment to identify transit defects.',
      'Cultivate long-term rapport with 1-2 primary importers so new catalog drops reach your WhatsApp without weekly travel costs.',
      'Always route regional parcels through certified bus luggage desks with carbon-copy waybills rather than unverified casual couriers.',
    ],
    goldenRuleSw: 'Faida ya biashara huanza pale unaponunua mzigo kwa bei sahihi, si pale unapouza tu.',
    goldenRuleEn: 'Profit is made at the moment of smart purchasing, not just at final retail markup.',
  },
  {
    id: 'tra-na-sheria',
    category: 'Kodi & Sheria (Compliance)',
    titleSw: 'Uelewa wa Kodi za TRA, Leseni ya Biashara na Mashine ya EFD',
    titleEn: 'TRA Compliance, Business Licensing & EFD Receipt Fundamentals',
    summarySw: 'Jinsi ya kuendesha biashara yako kwa amani bila faini za ghafla, ukizingatia viwango sahihi vya mapato.',
    summaryEn: 'Operating with compliance peace of mind, avoiding penalty surprises, and keeping your TIN and receipts orderly.',
    badge: 'Sheria & Kodi',
    readTime: '3 min read',
    actionStepsSw: [
      'Pata namba ya utambulisho wa mlipa kodi (TIN) ya biashara na hakikisha unajua kama biashara yako iko chini ya Mfumo wa Makadirio (Presumptive Tax) au Mfumo Rasmi wa Hesabu.',
      'Kama unastahili kutoa risiti ya EFD, toa risiti kwa kila muamala mara moja ili kuepuka faini nzito zinazoweza kukausha mtaji.',
      'Weka faili la kumbukumbu ya risiti zote za ununuzi na stakabadhi za gharama (LUKU, pango, usafiri) kwa angalau miaka 5.',
      'Lipa Leseni ya Biashara (Halmashauri ya Manispaa) mapema kila mwaka kabla ya tarehe ya mwisho.',
    ],
    actionStepsEn: [
      'Acquire a valid business TIN and clarify your standing under the Presumptive Tax bracket versus the standard audited accounting regime.',
      'If EFD-registered, issue digital fiscal receipts promptly on every sale to prevent catastrophic statutory penalty fines.',
      'Preserve all purchase invoices, shipping manifests, and utility payment receipts in a structured physical/cloud binder for five years.',
      'Renew municipal trade licenses promptly each year before inspection deadlines to maintain uninterrupted operation.',
    ],
    goldenRuleSw: 'Kutunza kumbukumbu za kodi kwa wakati kunakupa amani ya kulala na kujenga sifa ya kukopesheka benki.',
    goldenRuleEn: 'Disciplined compliance records guarantee peaceful sleep and unlock institutional bank financing.',
  },
];
