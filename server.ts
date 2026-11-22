import 'dotenv/config';
import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google Gen AI
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const VUKANG_SYSTEM_PROMPT = `You are VUKANG AI BUSINESS ASSISTANT, powered by VukangTech.

IDENTITY:
You are an intelligent business assistant designed specifically to help small and medium businesses (SMEs) in Tanzania.

YOUR CORE RESPONSIBILITIES:
1. Customer support and communication.
2. Product marketing and advertisement writing.
3. Business calculations and profit analysis.
4. Sales and business growth advice.
5. WhatsApp Business message creation.

OPERATING RULES:
- Communicate in professional but simple English or Swahili (match the user's preferred language or prompt language, feel free to use standard business Swahili like 'Bei ya jumla', 'Faida halisi', 'Gharama za uendeshaji', 'Madeni ya wateja', 'Lipa kwa simu').
- Use Tanzanian Shillings (TZS) for all financial calculations and currency notations (e.g., TZS 50,000 or TSh 50,000).
- Never invent product prices, stock availability or business information.
- Ask questions when important information is missing.
- Show calculations step by step with clear formulas and breakdown.
- Give practical recommendations grounded in Tanzanian SME realities (e.g., Kariakoo trade, mobile money like M-Pesa / Tigo Pesa / Airtel Money / Halopesa, TRA EFD/VAT considerations, local delivery bodaboda/bajaji, seasonal demand like Sabasaba, Nane Nane, Eid, Christmas, Easter, school opening).
- Never provide generic motivational answers. Give concrete actions.
- Protect customer privacy.
- Keep responses organized, bulleted, and easy to understand on mobile screens.

BRAND:
VUKANG AI
Powered by VukangTech.`;

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    brand: 'VUKANG AI',
    provider: 'VukangTech',
    hasKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Main Chat Endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, language = 'en', businessContext } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    if (!apiKey) {
      return res.status(503).json({
        error: 'Gemini API key is not configured in environment variables. Please check Settings > Secrets.',
      });
    }

    let contextualSystemPrompt = VUKANG_SYSTEM_PROMPT;
    if (language === 'sw') {
      contextualSystemPrompt += `\nLugha kuu ya mazungumzo ni Kiswahili fasaha cha kibiashara. Fafanua vizuri hesabu na maelezo yote.`;
    }
    if (businessContext) {
      contextualSystemPrompt += `\nTaarifa za Biashara ya Mteja (Business Context): ${JSON.stringify(businessContext)}`;
    }

    // Convert message history to GoogleGenAI format
    // In chat, we can pass formatted contents
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: contextualSystemPrompt,
      },
    });

    const reply = response.text || 'Samahani, sikuweza kuzalisha jibu. Tafadhali jaribu tena.';
    res.json({ reply });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: error.message || 'Internal server error processing AI response.',
    });
  }
});

// Dedicated WhatsApp Message Generator
app.post('/api/whatsapp-generator', async (req: Request, res: Response) => {
  try {
    const {
      type, // 'broadcast' | 'followup' | 'debt_reminder' | 'order_confirmation' | 'quote' | 'customer_support'
      businessName,
      productOrService,
      details,
      price,
      customerName,
      phone,
      language = 'sw', // default swahili or english
      tone = 'professional', // 'friendly' | 'urgent' | 'respectful'
    } = req.body;

    if (!apiKey) {
      return res.status(503).json({
        error: 'Gemini API key is not configured. Please check Settings > Secrets.',
      });
    }

    const prompt = `Create an optimized, high-converting WhatsApp Business message for a Tanzanian SME.
Type of message: ${type}
Business Name: ${businessName || 'Biashara Yetu'}
Product/Service: ${productOrService || 'Bidhaa'}
Customer Name: ${customerName || '[Jina la Mteja]'}
Details/Offer: ${details || 'Hakuna maelezo ya ziada'}
Price / Amount: ${price ? `TZS ${price}` : 'Kulingana na maelewano'}
Tone: ${tone}
Language preferred: ${language === 'sw' ? 'Swahili (Kiswahili cha kibiashara cha Tanzania)' : 'English (with natural Tanzanian business courtesy)'}

RULES FOR WHATSAPP MESSAGES:
1. Use WhatsApp text formatting: *bold* for key highlights, _italic_ for subtle notes.
2. Include tasteful emojis suitable for Tanzanian WhatsApp culture (e.g. 📦, ✨, 📞, 📍, 🇹🇿).
3. Always include a crystal-clear Call To Action (CTA), e.g., how to order via Lipa Namba / M-Pesa, reply, or visit the shop.
4. If this is a Debt Reminder (Kudai deni), it MUST be extremely respectful (adabu na heshima), protecting customer dignity while stating the exact amount in TZS and payment details.
5. Provide a 1-sentence tip on best time to send on WhatsApp in Tanzania (e.g., asubuhi saa 3 au jioni saa 11).

Return response in strict JSON format with keys:
- "headline": Short descriptive label
- "messageText": The exact text to copy or send in WhatsApp
- "suggestedTime": Best time to broadcast/send
- "followUpTip": Practical advice for closing the sale or handling responses.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: VUKANG_SYSTEM_PROMPT,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('WhatsApp generator error:', error);
    res.status(500).json({ error: error.message || 'Error generating WhatsApp message' });
  }
});

// Dedicated Marketing & Advertisement Copywriter
app.post('/api/marketing-generator', async (req: Request, res: Response) => {
  try {
    const {
      platform, // 'instagram' | 'tiktok' | 'facebook' | 'sms' | 'poster'
      businessName,
      productName,
      targetAudience,
      uniqueSellingPoint,
      priceTZS,
      location,
      contactInfo,
      language = 'sw',
    } = req.body;

    if (!apiKey) {
      return res.status(503).json({ error: 'Gemini API key is not configured.' });
    }

    const prompt = `Write a high-converting marketing campaign for a Tanzanian business.
Platform: ${platform}
Business Name: ${businessName}
Product/Service: ${productName}
Target Audience: ${targetAudience || 'Wateja wa rejareja na jumla Tanzania'}
Unique Advantage/Offer: ${uniqueSellingPoint || 'Ubora wa juu na bei nafuu'}
Price: ${priceTZS ? `TZS ${priceTZS}` : 'Wasiliana nasi kwa bei'}
Location: ${location || 'Dar es Salaam, Tanzania'}
Contact/Order info: ${contactInfo || 'WhatsApp / Piga simu'}
Language: ${language === 'sw' ? 'Kiswahili (au mchanganyiko wa kuvutia wa Kiswahili na Kiingereza cha biashara)' : 'English'}

Provide the response in strict JSON with:
- "headline": Catchy hook / headline
- "mainCopy": The complete advertisement text with hashtags suitable for ${platform} (e.g., #BiasharaTanzania #Kariakoo #DarEsSalaam)
- "videoHook": If TikTok/Reels, the first 3-second visual and spoken script hook; otherwise an eye-catching visual tip
- "callToAction": Compelling closing action (e.g. "Bofya link kwenye bio kuweka oda", "Tuma ujumbe WhatsApp")
- "targetStrategy": 2 practical tips on how to reach buyers in Tanzania without wasting advertising budget.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: VUKANG_SYSTEM_PROMPT,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Marketing generator error:', error);
    res.status(500).json({ error: error.message || 'Error generating marketing copy' });
  }
});

// Dedicated Business Calculation & Growth Advisor
app.post('/api/business-advice', async (req: Request, res: Response) => {
  try {
    const {
      calculationType, // 'profit_margin' | 'break_even' | 'working_capital' | 'pricing' | 'growth_audit'
      inputs, // object with relevant numbers in TZS
      businessType,
      currentChallenges,
      language = 'sw',
    } = req.body;

    if (!apiKey) {
      return res.status(503).json({ error: 'Gemini API key is not configured.' });
    }

    const prompt = `Perform an accurate, step-by-step business analysis for a Tanzanian SME.
Type of Analysis: ${calculationType}
Business Category: ${businessType || 'General Retail/Wholesale SME'}
Inputs provided: ${JSON.stringify(inputs)}
Current Business Challenges: ${currentChallenges || 'None stated'}
Language: ${language}

OPERATING RULES:
1. Show mathematical calculations step-by-step with clear formulas.
2. Currency MUST strictly be Tanzanian Shillings (TZS).
3. Identify if the business is at risk (e.g., low margins, high hidden overheads like transport/kodi ya pango/umeme LUKU, excessive credit sales/madeni ya wateja).
4. Give 3-4 concrete, actionable strategic recommendations tailored to Tanzania.

Provide response in strict JSON format:
- "summary": Quick executive verdict (1-2 sentences)
- "stepByStepMath": Array of steps explaining the arithmetic with values in TZS
- "keyMetrics": Object of computed key indicators (e.g. "Net Profit TZS", "Margin %", "Break-Even Units", "Days of Cash")
- "riskAssessment": Practical assessment of vulnerability or opportunity
- "actionableRecommendations": Array of 3-4 specific steps the business owner should take this week.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: VUKANG_SYSTEM_PROMPT,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Business advice error:', error);
    res.status(500).json({ error: error.message || 'Error analyzing business calculations' });
  }
});

// Vite middleware for dev or static serving for production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`VUKANG AI Business Assistant server running on port ${PORT}`);
  });
}

startServer();
