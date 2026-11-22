import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Language } from '../types/index.ts';
import { translations } from '../data/translations.ts';
import { formatTimestamp } from '../utils/formatters.ts';
import {
  Send,
  Trash2,
  Download,
  Copy,
  Check,
  Building2,
  DollarSign,
  MessageCircle,
  HelpCircle,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

interface AIConsultantChatProps {
  language: Language;
}

export const AIConsultantChat: React.FC<AIConsultantChatProps> = ({ language }) => {
  const t = translations[language];
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `${t.chat.welcomeHeading}\n\n${t.chat.welcomeMessage}\n\n*${
        language === 'sw' ? 'Mambo ninayoweza kukusaidia mara moja:' : 'Areas I can assist you with immediately:'
      }*\n• **${language === 'sw' ? 'Hesabu za Faida' : 'Profit Calculations'}**: Kupiga hesabu ya gharama za mzigo, pango, na faida halisi (TZS).\n• **${
        language === 'sw' ? 'Jumbe za WhatsApp' : 'WhatsApp Messages'
      }**: Kudai madeni kwa adabu, kuthibitisha malipo ya Lipa Namba, na matangazo ya mzigo mpya.\n• **${
        language === 'sw' ? 'Masoko & Wateja' : 'Marketing & Customers'
      }**: Matangazo ya Instagram, TikTok, na mbinu za kuongeza wateja sokoni.\n• **${
        language === 'sw' ? 'Ushauri wa Biashara' : 'Business Consulting'
      }**: Kudhibiti hasara, kodi za TRA, na mikakati ya kukuza mtaji nchini Tanzania.`,
      timestamp: formatTimestamp(),
      category: 'general',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = (customPrompt || input).trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: formatTimestamp(),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Send past messages (excluding system instructions which server manages)
      const apiMessages = newHistory.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          language,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch AI response');
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        timestamp: formatTimestamp(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message ||
          (language === 'sw'
            ? 'Kumetokea hitilafu ya mawasiliano. Tafadhali hakikisha umeunganishwa na mtandao.'
            : 'Error connecting to AI service. Please verify your connection.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    if (
      window.confirm(
        language === 'sw'
          ? 'Je, una uhakika unataka kufuta historia ya mazungumzo?'
          : 'Are you sure you want to clear the conversation history?'
      )
    ) {
      setMessages([
        {
          id: 'welcome-reset',
          role: 'assistant',
          content: `${t.chat.welcomeHeading}\n\n${t.chat.welcomeMessage}`,
          timestamp: formatTimestamp(),
        },
      ]);
    }
  };

  const handleExport = () => {
    const text = messages
      .map(
        (m) =>
          `[${m.timestamp}] ${m.role === 'assistant' ? 'VUKANG AI' : 'BUSINESS OWNER'}:\n${m.content}\n`
      )
      .join('\n---\n\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Vukang_AI_Consulting_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Render markdown-like text with bolding and line breaks cleanly
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Bold handling
      const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
      return (
        <p key={idx} className={`${line.trim() === '' ? 'h-3' : 'min-h-[1.25rem] leading-relaxed'}`}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-semibold text-slate-900 dark:text-white">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith('*') && part.endsWith('*')) {
              return (
                <em key={pIdx} className="italic text-emerald-700 dark:text-emerald-300">
                  {part.slice(1, -1)}
                </em>
              );
            }
            if (part.startsWith('• ') || part.startsWith('- ')) {
              return (
                <span key={pIdx} className="inline-block pl-2">
                  <span className="text-emerald-600 dark:text-emerald-400 mr-2">•</span>
                  {part.slice(2)}
                </span>
              );
            }
            return <span key={pIdx}>{part}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <div className="flex h-[calc(100vh-8.5rem)] flex-col bg-slate-50 dark:bg-slate-950">
      {/* Top Banner with Brand Profile & Actions */}
      <div className="border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/images/vukang_consultant_avatar_1793535513059.jpg"
              alt="Vukang AI Consultant"
              referrerPolicy="no-referrer"
              className="h-11 w-11 rounded-full object-cover ring-2 ring-emerald-500/20 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">{t.chat.title}</h2>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">· VukangTech</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-xs sm:max-w-md">
                {t.chat.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExport}
              title={t.chat.exportChat}
              className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Download className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleClear}
              title={t.chat.clearChat}
              className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-rose-950/40"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Quick Scenario Starters (only visible when message count is low) */}
          {messages.length <= 2 && (
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t.chat.quickPromptsLabel}</span>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {t.chat.quickPrompts.map((qp, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(qp.prompt)}
                    className="flex items-start justify-between rounded-lg border border-slate-200 p-3 text-left transition-colors hover:border-emerald-500 hover:bg-emerald-50/50 dark:border-slate-800 dark:hover:border-emerald-500/50 dark:hover:bg-emerald-950/20"
                  >
                    <div>
                      <span className="block text-xs font-semibold text-slate-900 dark:text-white">
                        {qp.label}
                      </span>
                      <span className="line-clamp-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {qp.prompt}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 mt-0.5 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Conversation Bubbles */}
          {messages.map((message) => {
            const isAssistant = message.role === 'assistant';
            return (
              <div
                key={message.id}
                className={`flex gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}
              >
                {isAssistant && (
                  <img
                    src="/src/assets/images/vukang_consultant_avatar_1793535513059.jpg"
                    alt="VUKANG AI"
                    referrerPolicy="no-referrer"
                    className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700 mt-1"
                  />
                )}

                <div
                  className={`group relative max-w-[85%] rounded-2xl px-4 py-3.5 shadow-sm text-sm ${
                    isAssistant
                      ? 'border border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
                      : 'bg-emerald-600 text-white dark:bg-emerald-600'
                  }`}
                >
                  <div className="space-y-1">
                    {renderFormattedContent(message.content)}
                  </div>

                  <div
                    className={`mt-2 flex items-center justify-between gap-4 text-[10px] ${
                      isAssistant
                        ? 'text-slate-400 dark:text-slate-500'
                        : 'text-emerald-100'
                    }`}
                  >
                    <span>{message.timestamp}</span>

                    {isAssistant && (
                      <button
                        type="button"
                        onClick={() => handleCopy(message.id, message.content)}
                        className="opacity-0 transition-opacity group-hover:opacity-100 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 text-[11px]"
                      >
                        {copiedId === message.id ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-600" />
                            <span>{language === 'sw' ? 'Imenakiliwa' : 'Copied'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>{language === 'sw' ? 'Nakili' : 'Copy'}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Thinking / Loading State */}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <img
                src="/src/assets/images/vukang_consultant_avatar_1793535513059.jpg"
                alt="VUKANG AI"
                referrerPolicy="no-referrer"
                className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700 animate-pulse mt-1"
              />
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                  <span>{t.chat.thinking}</span>
                </div>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
              {errorMessage}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Composer */}
      <div className="border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-end gap-2"
          >
            <div className="relative flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                rows={2}
                placeholder={t.chat.inputPlaceholder}
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-emerald-400 dark:focus:bg-slate-900"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm transition-all hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-emerald-500 dark:hover:bg-emerald-600"
              title={t.chat.send}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>

          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
            <span>
              {language === 'sw'
                ? 'Hesabu zote zinatolewa kwa Shilingi ya Kitanzania (TZS).'
                : 'All financial calculations calibrated in Tanzanian Shillings (TZS).'}
            </span>
            <span>Enter = {language === 'sw' ? 'Tuma' : 'Send'} · Shift+Enter = {language === 'sw' ? 'Mstari Mpya' : 'New line'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
