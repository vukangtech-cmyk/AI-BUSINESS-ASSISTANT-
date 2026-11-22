export type Language = 'en' | 'sw';

export type ActiveTab = 'chat' | 'whatsapp' | 'marketing' | 'calculators' | 'playbooks';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  category?: 'general' | 'calculation' | 'marketing' | 'whatsapp' | 'support';
}

export interface BusinessProfile {
  name: string;
  sector: string;
  location: string;
  phone: string;
  mPesaTill: string;
}

export interface WhatsAppMessageResult {
  headline: string;
  messageText: string;
  suggestedTime: string;
  followUpTip?: string;
  followUpAdvice?: string;
}

export interface MarketingResult {
  headline: string;
  mainCopy: string;
  videoHook?: string;
  callToAction: string;
  targetStrategy: string[];
}

export interface BusinessAdviceResult {
  summary: string;
  stepByStepMath: string[];
  keyMetrics: Record<string, string>;
  riskAssessment: string;
  actionableRecommendations: string[];
}
