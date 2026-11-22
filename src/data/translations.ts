export interface TranslationStrings {
  brand: string;
  poweredBy: string;
  tagline: string;
  tabs: {
    chat: string;
    whatsapp: string;
    marketing: string;
    calculators: string;
    playbooks: string;
  };
  chat: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    send: string;
    thinking: string;
    quickPromptsLabel: string;
    quickPrompts: { label: string; prompt: string }[];
    welcomeHeading: string;
    welcomeMessage: string;
    clearChat: string;
    exportChat: string;
  };
  whatsapp: {
    title: string;
    subtitle: string;
    messageType: string;
    businessName: string;
    productService: string;
    customerName: string;
    priceAmount: string;
    detailsLabel: string;
    toneLabel: string;
    customerPhone: string;
    generateBtn: string;
    generating: string;
    previewHeading: string;
    copyBtn: string;
    copied: string;
    sendWhatsAppBtn: string;
    bestTimeToPost: string;
    followUpAdvice: string;
    types: Record<string, string>;
  };
  marketing: {
    title: string;
    subtitle: string;
    platformLabel: string;
    productLabel: string;
    audienceLabel: string;
    uspLabel: string;
    priceLabel: string;
    locationLabel: string;
    contactLabel: string;
    generateBtn: string;
    generating: string;
    outputHeading: string;
    copyAd: string;
    platforms: Record<string, string>;
  };
  calculators: {
    title: string;
    subtitle: string;
    marginTab: string;
    breakevenTab: string;
    vatTab: string;
    debtRiskTab: string;
    costPrice: string;
    sellingPrice: string;
    unitsSold: string;
    grossProfit: string;
    profitMargin: string;
    markup: string;
    fixedCosts: string;
    variableCost: string;
    breakevenUnits: string;
    breakevenRevenue: string;
    vatExplanation: string;
    debtWarning: string;
    askAiAudit: string;
    analyzing: string;
  };
  footer: {
    rights: string;
    privacy: string;
    localAdviceNotice: string;
  };
}

export const translations: Record<'en' | 'sw', TranslationStrings> = {
  sw: {
    brand: 'VUKANG AI',
    poweredBy: 'Powered by VukangTech',
    tagline: 'Msaidizi Mahiri wa Biashara kwa Wajasiriamali na SME za Tanzania',
    tabs: {
      chat: 'Mshauri wa Biashara',
      whatsapp: 'Ujumbe wa WhatsApp',
      marketing: 'Matangazo & Masoko',
      calculators: 'Hesabu za Faida',
      playbooks: 'Miongozo ya Ukuaji',
    },
    chat: {
      title: 'Mshauri Wako wa Biashara',
      subtitle: 'Uliza kuhusu mauzo, hesabu za fedha, huduma kwa wateja, au mikakati ya soko la Tanzania.',
      inputPlaceholder: 'Andika swali lako la biashara hapa (k.m. Kupiga hesabu ya faida, kudai deni, au kuongeza wateja)...',
      send: 'Tuma Swali',
      thinking: 'Vukang AI inachambua na kuandaa majibu...',
      quickPromptsLabel: 'Maswali ya Haraka:',
      quickPrompts: [
        {
          label: 'Hesabu ya Faida Kariakoo',
          prompt: 'Nimenunua mzigo wa mashati 50 kwa TZS 10,000 kila moja. Gharama ya usafiri na ushuru ni TZS 50,000 jumla. Nipangie bei ya kuuza ili nipate faida halisi ya 35%. Nionyeshe hesabu hatua kwa hatua.',
        },
        {
          label: 'Ujumbe wa Kudai Deni kwa Heshima',
          prompt: 'Mteja wangu anadaiwa TZS 180,000 toka wiki mbili zilizopita. Naomba utunge ujumbe wa heshima na adabu lakini unaosisitiza kulipa kupitia M-Pesa bila kumfanya akasirike.',
        },
        {
          label: 'Mbinu za Kuongeza Mauzo ya Duka',
          prompt: 'Nina duka la vipodozi na huduma ya saluni Sinza, Dar es Salaam. Nipe mbinu 4 madhubuti za kuvutia wateja wapya wiki hii bila kutumia bajeti kubwa ya matangazo.',
        },
        {
          label: 'Kudhibiti Gharama za Umeme na Kodi',
          prompt: 'Kila mwezi nalipa pango TZS 350,000, LUKU TZS 80,000, na mfanyakazi TZS 200,000. Je, biashara yangu inapaswa kuingiza mauzo ya kiasi gani kwa siku ili nisipate hasara?',
        },
      ],
      welcomeHeading: 'Habari! Mimi ni VUKANG AI.',
      welcomeMessage:
        'Msaidizi wako maalum wa kibiashara nchini Tanzania. Ninaweza kukusaidia kupiga hesabu za faida kwa Shilingi ya Kitanzania (TZS), kuandika jumbe bora za WhatsApp Business, kuboresha matangazo yako, na kutoa ushauri halisi wa kukuza mtaji.',
      clearChat: 'Futa Mazungumzo',
      exportChat: 'Pakua Mazungumzo',
    },
    whatsapp: {
      title: 'Mtengeneza Jumbe za WhatsApp Business',
      subtitle: 'Tunga jumbe zenye matokeo chanya kwa wateja wa Tanzania zenye muundo wa kuvutia na Lipa Namba.',
      messageType: 'Aina ya Ujumbe',
      businessName: 'Jina la Biashara Yako',
      productService: 'Bidhaa au Huduma',
      customerName: 'Jina la Mteja (Hiari)',
      priceAmount: 'Kiasi / Bei (TZS)',
      detailsLabel: 'Ofa au Maelezo Muhimu',
      toneLabel: 'Mlio wa Ujumbe (Tone)',
      customerPhone: 'Namba ya Simu ya Mteja (Hiari kwa ajili ya kutuma moja kwa moja)',
      generateBtn: 'Tunga Ujumbe wa WhatsApp',
      generating: 'Inatunga ujumbe...',
      previewHeading: 'Muonekano wa Ujumbe Kwenye WhatsApp',
      copyBtn: 'Nakili Ujumbe',
      copied: 'Imenakiliwa!',
      sendWhatsAppBtn: 'Fungua & Tuma WhatsApp',
      bestTimeToPost: 'Muda Bora wa Kutuma:',
      followUpAdvice: 'Ushauri wa Ufuatiliaji:',
      types: {
        broadcast: 'Ofa ya Punguzo / Tangazo la Mzigo Mpya',
        debt_reminder: 'Kudai Deni kwa Heshima na Adabu',
        order_confirmation: 'Uthibitisho wa Oda na Namba ya Malipo',
        quote: 'Makadirio ya Bei / Ankara (Quotation)',
        customer_support: 'Kujibu Mteja Anayeuliza Bei & Huduma',
        followup: 'Kumjulia Hali Mteja wa Zamani (Follow-up)',
      },
    },
    marketing: {
      title: 'Mwandishi Mahiri wa Matangazo & Masoko',
      subtitle: 'Unda matangazo yenye ushawishi mkubwa kwa mitandao ya kijamii na redio nchini Tanzania.',
      platformLabel: 'Jukwaa la Tangazo',
      productLabel: 'Jina la Bidhaa au Huduma',
      audienceLabel: 'Walengwa Wakuu (Mf. Wafanyakazi, akina mama, vijana)',
      uspLabel: 'Sifa ya Kipekee au Ofa ya Ziada',
      priceLabel: 'Bei ya Bidhaa (TZS)',
      locationLabel: 'Mahali Biashara Ilipo (k.m. Kariakoo, Mwanza, Arusha)',
      contactLabel: 'Njia ya Mawasiliano / Kuweka Oda',
      generateBtn: 'Andika Tangazo la Masoko',
      generating: 'Inaandaa tangazo...',
      outputHeading: 'Tangazo Lililotungwa',
      copyAd: 'Nakili Tangazo',
      platforms: {
        instagram: 'Instagram Post & Maelezo (Caption)',
        tiktok: 'TikTok / Reels Video Hook & Maelezo',
        facebook: 'Facebook Marketplace & Groups',
        sms: 'SMS ya Moja kwa Moja (Fupi & Yenye Nguvu)',
        poster: 'Bango / Flyer ya Mtaani',
      },
    },
    calculators: {
      title: 'Vikokotoo vya Faida na Fedha za Biashara',
      subtitle: 'Pata hesabu kamili za fedha hatua kwa hatua katika Shilingi ya Kitanzania (TZS).',
      marginTab: 'Faida & Asilimia (Margin)',
      breakevenTab: 'Mvuvumko wa Biashara (Break-Even)',
      vatTab: 'Kodi ya TRA (VAT 18%)',
      debtRiskTab: 'Udhibiti wa Madeni ya Wateja',
      costPrice: 'Gharama ya Kununua (Cost Price - TZS)',
      sellingPrice: 'Bei ya Kuuza (Selling Price - TZS)',
      unitsSold: 'Idadi ya Bidhaa (Units)',
      grossProfit: 'Faida Ghafi',
      profitMargin: 'Asilimia ya Faida (Margin %)',
      markup: 'Kiwango cha Ongezeko (Markup %)',
      fixedCosts: 'Gharama Zisizobadilika kwa Mwezi (Pango, Mishahara, Umeme TZS)',
      variableCost: 'Gharama ya Kila Bidhaa (Variable Cost TZS)',
      breakevenUnits: 'Idadi ya Kuuza Kufidia Gharama (Break-Even Units)',
      breakevenRevenue: 'Kiwango cha Mauzo ya Kufidia Gharama',
      vatExplanation: 'Kiwango cha Kodi ya Ongezeko la Thamani (VAT) Tanzania ni 18%.',
      debtWarning: 'Tahadhari: Madeni ya wateja yakizidi 25% ya mtaji, biashara inakabiliwa na uhaba wa fedha taslimu.',
      askAiAudit: 'Pata Ushauri wa Kina kutoka Vukang AI',
      analyzing: 'Inafanya tathmini ya kina...',
    },
    footer: {
      rights: 'Haki zote zimehifadhiwa.',
      privacy: 'Ulinzi wa Taarifa za Wateja umezingatiwa kikamilifu.',
      localAdviceNotice: 'Hesabu na ushauri umeandaliwa kwa ajili ya mazingira halisi ya biashara Tanzania.',
    },
  },
  en: {
    brand: 'VUKANG AI',
    poweredBy: 'Powered by VukangTech',
    tagline: 'Intelligent Business Assistant for Small & Medium Enterprises in Tanzania',
    tabs: {
      chat: 'AI Consultant',
      whatsapp: 'WhatsApp Business',
      marketing: 'Marketing & Ads',
      calculators: 'Profit Calculators',
      playbooks: 'Growth Playbooks',
    },
    chat: {
      title: 'AI Business Consultant',
      subtitle: 'Ask about sales strategies, financial calculations, customer support, or Tanzanian market tactics.',
      inputPlaceholder: 'Ask any business question (e.g. Profit calculation, polite debt collection, stock pricing)...',
      send: 'Send Inquiry',
      thinking: 'Vukang AI is analyzing and preparing practical recommendations...',
      quickPromptsLabel: 'Quick Scenarios:',
      quickPrompts: [
        {
          label: 'Kariakoo Wholesale Profit',
          prompt: 'I purchased 50 shirts at TZS 10,000 each. Transport and municipal fees are TZS 50,000 total. Calculate the target selling price to achieve a 35% net profit margin. Show step-by-step arithmetic.',
        },
        {
          label: 'Respectful Debt Collection',
          prompt: 'A customer owes TZS 180,000 overdue by two weeks. Draft a respectful, culturally courteous WhatsApp reminder that protects the relationship while clearly directing payment via M-Pesa.',
        },
        {
          label: 'Increase Shop Foot-Traffic',
          prompt: 'I run a cosmetics shop and salon in Sinza, Dar es Salaam. Give me 4 actionable tactics to drive new foot traffic this week without a heavy ad budget.',
        },
        {
          label: 'Overhead & Daily Sales Target',
          prompt: 'My monthly overhead is: Shop rent TZS 350,000, LUKU electricity TZS 80,000, staff wages TZS 200,000. How much revenue must I generate per day to break even?',
        },
      ],
      welcomeHeading: 'Greetings! I am VUKANG AI.',
      welcomeMessage:
        'Your dedicated business assistant for Tanzanian enterprises. I help you calculate accurate profits in Tanzanian Shillings (TZS), craft high-converting WhatsApp Business messages, produce compelling marketing copy, and advise on sustainable business growth.',
      clearChat: 'Clear History',
      exportChat: 'Export Chat',
    },
    whatsapp: {
      title: 'WhatsApp Business Message Creator',
      subtitle: 'Compose high-converting, professional messages formatted with bold text, emojis, and payment options.',
      messageType: 'Message Type',
      businessName: 'Your Business Name',
      productService: 'Product or Service',
      customerName: 'Customer Name (Optional)',
      priceAmount: 'Amount / Price (TZS)',
      detailsLabel: 'Offer or Special Details',
      toneLabel: 'Tone of Voice',
      customerPhone: 'Customer Phone (Optional for 1-click dispatch)',
      generateBtn: 'Generate WhatsApp Message',
      generating: 'Generating message...',
      previewHeading: 'WhatsApp Live Preview',
      copyBtn: 'Copy Message',
      copied: 'Copied to Clipboard!',
      sendWhatsAppBtn: 'Open & Send via WhatsApp',
      bestTimeToPost: 'Recommended Dispatch Time:',
      followUpAdvice: 'Follow-up Recommendation:',
      types: {
        broadcast: 'Discount Offer / New Stock Announcement',
        debt_reminder: 'Respectful Debt Reminder',
        order_confirmation: 'Order Confirmation & Lipa Namba Details',
        quote: 'Price Estimate / Proforma Quotation',
        customer_support: 'Inquiry Response & Product Information',
        followup: 'Customer Relationship Follow-up',
      },
    },
    marketing: {
      title: 'Smart Marketing & Advertisement Copywriter',
      subtitle: 'Create persuasive marketing campaigns designed for social media and local promotions in Tanzania.',
      platformLabel: 'Target Platform',
      productLabel: 'Product / Service Name',
      audienceLabel: 'Target Buyers (e.g. Office professionals, parents, university students)',
      uspLabel: 'Key Advantage or Unique Selling Proposition',
      priceLabel: 'Price (TZS)',
      locationLabel: 'Business Location (e.g. Kariakoo, Arusha, Mwanza)',
      contactLabel: 'Contact / Ordering Channel',
      generateBtn: 'Generate Marketing Copy',
      generating: 'Writing campaign...',
      outputHeading: 'Generated Marketing Campaign',
      copyAd: 'Copy Campaign',
      platforms: {
        instagram: 'Instagram Post & Caption',
        tiktok: 'TikTok / Reels Video Hook & Script',
        facebook: 'Facebook Marketplace & Groups',
        sms: 'Direct Bulk SMS (Punchy & Concise)',
        poster: 'Local Printed Poster / Flyer Blurb',
      },
    },
    calculators: {
      title: 'Profit & Financial Analysis Calculators',
      subtitle: 'Accurate, step-by-step math in Tanzanian Shillings (TZS) with AI-powered consulting insights.',
      marginTab: 'Profit Margin & Markup',
      breakevenTab: 'Break-Even Point',
      vatTab: 'TRA VAT 18% Calculator',
      debtRiskTab: 'Customer Debt Risk',
      costPrice: 'Cost of Goods Sold (TZS)',
      sellingPrice: 'Selling Price (TZS)',
      unitsSold: 'Units Sold',
      grossProfit: 'Gross Profit',
      profitMargin: 'Profit Margin (%)',
      markup: 'Markup (%)',
      fixedCosts: 'Monthly Fixed Overheads (Rent, Wages, LUKU in TZS)',
      variableCost: 'Variable Cost per Unit (TZS)',
      breakevenUnits: 'Required Units to Break Even',
      breakevenRevenue: 'Required Revenue to Break Even',
      vatExplanation: 'Value Added Tax (VAT) in Tanzania is standard at 18% under TRA guidelines.',
      debtWarning: 'Warning: When accounts receivable exceed 25% of working capital, cash flow is critically vulnerable.',
      askAiAudit: 'Run Deep AI Financial Audit',
      analyzing: 'Auditing financials with Vukang AI...',
    },
    footer: {
      rights: 'All rights reserved.',
      privacy: 'Strict customer privacy and data protection observed.',
      localAdviceNotice: 'Financial calculations and business advice formulated specifically for the Tanzanian SME market.',
    },
  },
};
