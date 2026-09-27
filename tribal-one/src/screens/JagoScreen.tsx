import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Send,
  Globe,
  ChevronDown,
  RefreshCw,
  AlertCircle,
  Wifi,
  Shield,
  ShieldCheck,
  Lock,
  Key,
  Eye,
  EyeOff,
  CheckCircle2,
  X,
  Info,
} from 'lucide-react';
import type { ChatMessage, Language } from '../types';
import { useApp } from '../context/AppContext';
import {
  callGeminiJago,
  buildUserContext,
  getActiveApiKey,
  setActiveApiKey,
  clearActiveApiKey,
  isApiKeyConfigured,
  type GeminiMessage,
} from '../services/jagoAI';
import {
  sanitizeAndMaskPII,
  rateLimiter,
  maskApiKey,
} from '../utils/security';

// ── Suggested quick questions ────────────────────────────────────────────────
const SUGGESTED: Record<Language, string[]> = {
  en: [
    'Am I eligible for any scholarship?',
    'What is the Pre-Matric Scholarship amount?',
    'What documents do I need to apply?',
    'Track my application status',
    'Explain the NFST fellowship',
    'How does DBT payment work?',
    'What is the NOS scholarship for studying abroad?',
    'When is the application deadline?',
  ],
  te: [
    'నేను ఏదైనా స్కాలర్‌షిప్‌కు అర్హుడినా?',
    'Pre-Matric స్కాలర్‌షిప్ మొత్తం ఎంత?',
    'దరఖాస్తుకు ఏ పత్రాలు కావాలి?',
    'నా దరఖాస్తు స్థితి చెప్పండి',
    'NFST ఫెలోషిప్ ఏమిటి?',
    'DBT చెల్లింపు ఎలా జరుగుతుంది?',
  ],
  hi: [
    'क्या मैं किसी छात्रवृत्ति के लिए पात्र हूं?',
    'Pre-Matric Scholarship की राशि क्या है?',
    'आवेदन के लिए कौन से दस्तावेज़ चाहिए?',
    'मेरे आवेदन की स्थिति बताएं',
    'NFST फेलोशिप क्या है?',
    'DBT भुगतान कैसे होता है?',
  ],
  kn: [
    'ನಾನು ಯಾವುದೇ ವಿದ್ಯಾರ್ಥಿವೇತನಕ್ಕೆ ಅರ್ಹನೇ?',
    'Pre-Matric ವಿದ್ಯಾರ್ಥಿವೇತನದ ಮೊತ್ತ ಎಷ್ಟು?',
    'ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಯಾವ ದಾಖಲೆಗಳು ಬೇಕು?',
    'ನನ್ನ ಅರ್ಜಿಯ ಸ್ಥಿತಿಯನ್ನು ತಿಳಿಸಿ',
    'NFST ಫೆಲೋಶಿಪ್ ಎಂದರೇನು?',
    'DBT ಪಾವತಿ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ?',
  ],
  ta: [
    'நான் ஏதேனும் கல்வி உதவித்தொகைக்கு தகுதியுடையவரா?',
    'Pre-Matric உதவித்தொகை தொகை எவ்வளவு?',
    'விண்ணப்பிக்க என்னென்ன ஆவணங்கள் தேவை?',
    'எனது விண்ணப்பத்தின் நிலையை அறியவும்',
    'NFST ஆய்வு உதவித்தொகை என்றால் என்ன?',
    'DBT பணப்பரிவர்த்தனை எவ்வாறு செயல்படுகிறது?',
  ],
  ml: [
    'ഞാൻ ഏതെങ്കിലും സ്കോളർഷിപ്പിന് അർഹനാണോ?',
    'Pre-Matric സ്കോളർഷിപ്പ് തുക എത്രയാണ്?',
    'അപേക്ഷിക്കാൻ എന്തൊക്കെ രേഖകൾ വേണം?',
    'എന്റെ അപേക്ഷയുടെ നില പരിശോധിക്കുക',
    'NFST ഫെല്ലോഷിപ്പ് എന്താണ്?',
    'DBT പേയ്‌മെൻ്റ് എങ്ങനെ പ്രവർത്തിക്കുന്നു?',
  ],
};

const LANG_LABELS: Record<Language, string> = {
  en: 'English',
  te: 'తెలుగు',
  hi: 'हिंदी',
  kn: 'ಕನ್ನಡ',
  ta: 'தமிழ்',
  ml: 'മലയാളം',
};

// ── Initial greeting ─────────────────────────────────────────────────────────
function getGreeting(lang: Language): string {
  if (lang === 'te') {
    return 'నమస్కారం! నేను JAGO AI, Janjati Setu యొక్క అధికారిక స్కాలర్‌షిప్ సహాయకుడిని.\n\nMoTA యొక్క 5 స్కాలర్‌షిప్ పథకాల గురించి నేను మీకు సహాయం చేయగలను:\n\n1. Pre-Matric Scholarship (తరగతి IX–X)\n2. Post-Matric Scholarship (తరగతి XI నుండి PhD)\n3. Top Class Education Scheme (265 ప్రముఖ సంస్థలు)\n4. National Fellowship NFST (PhD / M.Phil)\n5. National Overseas Scholarship (విదేశాలలో చదువు)\n\nఅర్హత, పత్రాలు, దరఖాస్తు లేదా చెల్లింపు — ఏదైనా అడగండి.\n\n🔒 మీ గోప్యత: UIDAI మార్గదర్శకాల ప్రకారం ఆధార్ మరియు వ్యక్తిగత వివరాలు స్వయంచాలకంగా మాస్క్ చేయబడతాయి.';
  }
  if (lang === 'hi') {
    return 'नमस्ते! मैं JAGO AI हूं, Janjati Setu का आधिकारिक छात्रवृत्ति सहायक।\n\nमैं MoTA की 5 छात्रवृत्ति योजनाओं के बारे में आपकी मदद कर सकता हूं:\n\n1. Pre-Matric Scholarship (कक्षा IX–X)\n2. Post-Matric Scholarship (कक्षा XI से PhD)\n3. Top Class Education Scheme (265 प्रमुख संस्थान)\n4. National Fellowship NFST (PhD / M.Phil)\n5. National Overseas Scholarship (विदेश में उच्च शिक्षा)\n\nपात्रता, दस्तावेज़, आवेदन या भुगतान — कुछ भी पूछें।\n\n🔒 आपकी सुरक्षा: UIDAI के दिशा-निर्देशों के अनुसार आधार व व्यक्तिगत जानकारी स्वतः सुरक्षित व मास्क की जाती है।';
  }
  if (lang === 'kn') {
    return 'ನಮಸ್ಕಾರ! ನಾನು JAGO AI, Janjati Setu ನ ಅಧಿಕೃತ ವಿದ್ಯಾರ್ಥಿವೇತನ ಸಹಾಯಕ.\n\nMoTA ನ 5 ಪ್ರಮುಖ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳ ಕುರಿತು ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ:\n\n1. Pre-Matric Scholarship (ತರಗತಿ IX–X)\n2. Post-Matric Scholarship (ತರಗತಿ XI ರಿಂದ PhD)\n3. Top Class Education Scheme (265 ಪ್ರಮುಖ ಸಂಸ್ಥೆಗಳು)\n4. National Fellowship NFST (PhD / M.Phil)\n5. National Overseas Scholarship (ವಿದೇಶಿ ವ್ಯಾಸಂಗ)\n\nಅರ್ಹತೆ, ದಾಖಲೆಗಳು, ಅರ್ಜಿ ಅಥವಾ ಪಾವತಿ ಕುರಿತು ಏನನ್ನಾದರೂ ಕೇಳಿ.\n\n🔒 ನಿಮ್ಮ ಗೌಪ್ಯತೆ: UIDAI ನಿಯಮಗಳ ಪ್ರಕಾರ ಆಧಾರ್ ವಿವರಗಳು ಸುರಕ್ಷಿತವಾಗಿರುತ್ತವೆ.';
  }
  if (lang === 'ta') {
    return 'வணக்கம்! நான் JAGO AI, Janjati Setu வின் அதிகாரப்பூர்வ கல்வி உதவித்தொகை வழிகாட்டி.\n\nMoTA வின் 5 கல்வி உதவித்தொகை திட்டங்கள் பற்றி நான் உங்களுக்கு உதவ முடியும்:\n\n1. Pre-Matric Scholarship (வகுப்பு IX–X)\n2. Post-Matric Scholarship (வகுப்பு XI முதல் PhD வரை)\n3. Top Class Education Scheme (265 முன்னணி நிறுவனங்கள்)\n4. National Fellowship NFST (PhD / M.Phil)\n5. National Overseas Scholarship (வெளிநாட்டு கல்வி)\n\nதகுதி, ஆவணங்கள், விண்ணப்பம் அல்லது பணம் செலுத்துதல் குறித்து கேளுங்கள்.\n\n🔒 உங்கள் தனியுரிமை: UIDAI வழிகாட்டுதலின்படி உங்கள் ஆதார் விவரங்கள் பாதுகாக்கப்படுகின்றன.';
  }
  if (lang === 'ml') {
    return 'നമസ്കാരം! ഞാൻ JAGO AI, Janjati Setu ൻ്റെ ഔദ്യോഗിക സ്കോളർഷിപ്പ് അസിസ്റ്റൻ്റ്.\n\nMoTA ൻ്റെ 5 സ്കോളർഷിപ്പ് പദ്ധതികളെക്കുറിച്ച് ഞാൻ നിങ്ങളെ സഹായിക്കാം:\n\n1. Pre-Matric Scholarship (ക്ലാസ് IX–X)\n2. Post-Matric Scholarship (ക്ലാസ് XI മുതൽ PhD വരെ)\n3. Top Class Education Scheme (265 പ്രമുഖ സ്ഥാപനങ്ങൾ)\n4. National Fellowship NFST (PhD / M.Phil)\n5. National Overseas Scholarship (വിദേശ പഠനം)\n\nയോഗ്യത, രേഖകൾ, അപേക്ഷ അല്ലെങ്കിൽ പേയ്‌മെൻ്റ് എന്നിവയെക്കുറിച്ച് ചോദിക്കാം.\n\n🔒 സ്വകാര്യത: UIDAI മാർഗ്ഗനിർദ്ദേശങ്ങൾ പ്രകാരം ആധാർ വിവരങ്ങൾ സുരക്ഷിതമായി സൂക്ഷിക്കുന്നു.';
  }
  return 'Hello! I\'m JAGO AI, the official scholarship assistant for Janjati Setu — Tribal One.\n\nI can help you with the 5 MoTA scholarship schemes:\n\n1. Pre-Matric Scholarship (Class IX–X)\n2. Post-Matric Scholarship (Class XI to PhD)\n3. Top Class Education Scheme (265 premier institutions)\n4. National Fellowship NFST (PhD / M.Phil research)\n5. National Overseas Scholarship (higher studies abroad)\n\nAsk me about eligibility, documents, application steps, or payment status.\n\n🔒 Your Privacy: Aadhaar and sensitive identification data are automatically masked per UIDAI data protection norms.';
}

export function JagoScreen() {
  const { student, applications, payments, language, setLanguage, t } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'assistant',
      content: getGreeting(language),
      timestamp: new Date().toISOString(),
      language,
    },
  ]);

  const [geminiHistory, setGeminiHistory] = useState<GeminiMessage[]>([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [securityModalOpen, setSecurityModalOpen] = useState(false);
  const [piiAlert, setPiiAlert] = useState<string | null>(null);
  const [apiConfigured, setApiConfigured] = useState(isApiKeyConfigured());

  // Security Modal state
  const [customKeyInput, setCustomKeyInput] = useState('');
  const [showKeyText, setShowKeyText] = useState(false);
  const [persistKey, setPersistKey] = useState(true);
  const [keySaveMessage, setKeySaveMessage] = useState<string | null>(null);
  const [testingConnection, setTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinking]);

  // Sync API status
  useEffect(() => {
    setApiConfigured(isApiKeyConfigured());
  }, [securityModalOpen]);

  // Language change
  const handleLanguageChange = useCallback((lang: Language) => {
    setLanguage(lang);
    setLangOpen(false);
    setMessages([
      {
        id: `init-${lang}-${Date.now()}`,
        role: 'assistant',
        content: getGreeting(lang),
        timestamp: new Date().toISOString(),
        language: lang,
      },
    ]);
    setGeminiHistory([]);
    setError(null);
  }, [setLanguage]);

  // Send message with security & rate-limit checks
  async function sendMessage(text: string) {
    if (!text.trim() || thinking) return;
    setError(null);
    setPiiAlert(null);

    // 1. Rate Limiting Check
    const rateCheck = rateLimiter.canProceed();
    if (!rateCheck.allowed) {
      setError(rateCheck.reason ?? 'Please wait a moment before sending another message.');
      return;
    }

    // 2. Sanitize and redact PII (Aadhaar, Phone, Bank Account)
    const { cleanedText, piiDetected, maskedItems } = sanitizeAndMaskPII(text.trim());

    if (piiDetected) {
      setPiiAlert(`Privacy Guard: ${maskedItems.join(', ')} auto-masked to protect your identity.`);
    }

    // Record legitimate request for rate-limiter
    rateLimiter.recordRequest();

    // 3. Add sanitized user message to chat UI
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: cleanedText,
      timestamp: new Date().toISOString(),
      language,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setThinking(true);

    // 4. Update Gemini conversation history
    const newHistory: GeminiMessage[] = [
      ...geminiHistory,
      { role: 'user', parts: [{ text: cleanedText }] },
    ];

    try {
      const userContext = buildUserContext(student, applications, payments, language);
      const reply = await callGeminiJago(newHistory, userContext);

      // Model reply
      const updatedHistory: GeminiMessage[] = [
        ...newHistory,
        { role: 'model', parts: [{ text: reply }] },
      ];
      setGeminiHistory(updatedHistory.slice(-20));

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: reply,
          timestamp: new Date().toISOString(),
          language,
        },
      ]);
    } catch (err) {
      console.error('[JAGO AI] Query Error:', err);
      const errMsg = err instanceof Error && err.message.includes('429')
        ? 'Traffic limit reached. Please wait 30 seconds and try again.'
        : err instanceof Error && err.message.includes('401')
        ? 'API authentication error. Tap the Shield icon to verify your key.'
        : 'Unable to connect to JAGO AI. Tap the Shield icon to verify settings or check your connection.';
      setError(errMsg);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `I'm sorry, I could not process your request right now.\n\n${errMsg}\n\nFor official scholarship support, visit scholarships.gov.in or tribal.nic.in.`,
          timestamp: new Date().toISOString(),
          language,
        },
      ]);
    } finally {
      setThinking(false);
    }
  }

  // Key management actions
  const handleSaveCustomKey = () => {
    if (!customKeyInput.trim()) return;
    setActiveApiKey(customKeyInput.trim(), persistKey);
    setApiConfigured(isApiKeyConfigured());
    setCustomKeyInput('');
    setKeySaveMessage('✅ API key saved and activated securely.');
    setTimeout(() => setKeySaveMessage(null), 3000);
  };

  const handleClearCustomKey = () => {
    clearActiveApiKey();
    setApiConfigured(isApiKeyConfigured());
    setKeySaveMessage('🗑️ Custom key cleared. Now using default environment configuration.');
    setTimeout(() => setKeySaveMessage(null), 3000);
  };

  const handleTestConnection = async () => {
    setTestingConnection(true);
    setTestResult(null);
    try {
      const testHistory: GeminiMessage[] = [
        { role: 'user', parts: [{ text: 'Hello' }] },
      ];
      await callGeminiJago(testHistory, 'Language preference: English.');
      setTestResult({ ok: true, message: 'Connection verified! Gemini API is responding securely.' });
    } catch (err) {
      setTestResult({
        ok: false,
        message: err instanceof Error ? err.message : 'Connection test failed. Check key validity.',
      });
    } finally {
      setTestingConnection(false);
    }
  };

  const showSuggested = messages.length <= 1;
  const activeKey = getActiveApiKey();

  return (
    <div
      className="flex flex-col bg-[#f5f7fa]"
      style={{ height: '100dvh', paddingBottom: 56 }}
    >
      {/* ── Header ── */}
      <header className="bg-[#0F766E] px-4 pt-12 pb-3 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-white/70 text-[11px] font-semibold uppercase tracking-wider">
                Ministry of Tribal Affairs
              </span>
              <span className="text-white/40">·</span>
              <span className="text-emerald-300 text-[11px] font-medium flex items-center gap-1">
                <Lock size={10} /> Gov-Secured
              </span>
            </div>
            <h1 className="text-white font-bold text-xl tracking-tight mt-0.5">JAGO AI</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-white/60 text-xs">Official Scholarship Assistant</p>

              {/* Status Indicator */}
              <button
                onClick={() => setSecurityModalOpen(true)}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/15 transition-colors"
                title="Tap to view Security & API Settings"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: apiConfigured ? '#4ade80' : '#f59e0b',
                    boxShadow: apiConfigured ? '0 0 4px #4ade80' : '0 0 4px #f59e0b',
                  }}
                  aria-hidden
                />
                <span className="text-white/80 text-[10px] font-medium">
                  {apiConfigured ? 'AI Online' : 'Key Needed'}
                </span>
                <ShieldCheck size={11} className="text-emerald-300 ml-0.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Security Shield Button */}
            <button
              onClick={() => setSecurityModalOpen(true)}
              className="p-2 rounded-xl text-white/90 hover:text-white transition-colors"
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.18)',
              }}
              aria-label="Security and Privacy Settings"
              title="Security & Privacy Shield"
            >
              <Shield size={16} />
            </button>

            {/* Language picker */}
            <div className="relative">
              <button
                id="lang-select-btn"
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-xs font-semibold"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.18)',
                }}
                aria-label="Select language"
                aria-expanded={langOpen}
              >
                <Globe size={13} />
                {LANG_LABELS[language]}
                <ChevronDown
                  size={12}
                  style={{
                    transform: langOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.15s',
                  }}
                />
              </button>

              {langOpen && (
                <div
                  className="absolute right-0 top-11 rounded-2xl overflow-hidden z-50 shadow-xl border border-gray-100"
                  style={{
                    background: '#fff',
                    minWidth: 130,
                  }}
                >
                  {(Object.entries(LANG_LABELS) as [Language, string][]).map(([code, label]) => (
                    <button
                      key={code}
                      id={`lang-${code}`}
                      onClick={() => handleLanguageChange(code)}
                      className="w-full text-left px-4 py-3 text-sm font-medium transition-colors"
                      style={{
                        background: language === code ? '#f0faf9' : '#fff',
                        color: language === code ? '#0F766E' : '#374151',
                        fontWeight: language === code ? 700 : 500,
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Security / Privacy Trust Pill */}
        <div className="mt-2.5 flex items-center justify-between text-[10px] text-white/70 bg-white/10 rounded-lg px-2.5 py-1">
          <span className="flex items-center gap-1">
            <Lock size={10} className="text-emerald-300" />
            UIDAI Aadhaar Data Masking Active
          </span>
          <span className="font-mono text-white/60">TLS 1.3 Protected</span>
        </div>
      </header>

      {/* ── Messages area ── */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        style={{ background: '#f5f7fa' }}
        onClick={() => setLangOpen(false)}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
          >
            {/* JAGO AI avatar */}
            {msg.role === 'assistant' && (
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-black shrink-0 mb-0.5"
                style={{ background: '#0F766E' }}
                aria-hidden
              >
                JAI
              </div>
            )}

            {/* Message bubble */}
            <div
              className="max-w-[82%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap"
              style={{
                background: msg.role === 'user' ? '#0F766E' : '#ffffff',
                color: msg.role === 'user' ? '#fff' : '#111827',
                borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '4px 20px 20px 20px',
                border: msg.role === 'user' ? 'none' : '1px solid #e5e9ef',
                boxShadow: msg.role === 'assistant' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
              }}
              role="article"
              aria-label={msg.role === 'user' ? 'Your message' : 'JAGO AI response'}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Thinking indicator */}
        {thinking && (
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-full bg-[#0F766E] flex items-center justify-center text-white text-[9px] font-black shrink-0">
              JAI
            </div>
            <div
              className="px-4 py-3.5 flex items-center gap-1.5"
              style={{
                background: '#fff',
                borderRadius: '4px 20px 20px 20px',
                border: '1px solid #e5e9ef',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  className="w-2 h-2 rounded-full bg-[#0F766E]/40 animate-bounce"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* PII Masking Notification Toast */}
        {piiAlert && (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs px-3.5 py-2.5 rounded-xl border border-emerald-200">
            <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
            <p className="flex-1 font-medium">{piiAlert}</p>
            <button onClick={() => setPiiAlert(null)} className="text-emerald-500 hover:text-emerald-700">
              <X size={12} />
            </button>
          </div>
        )}

        {/* Error inline retry */}
        {error && !thinking && (
          <div className="flex items-start gap-2 bg-red-50 rounded-2xl px-4 py-3 border border-red-100">
            <AlertCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-red-700 leading-relaxed">{error}</p>
              <div className="mt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    setError(null);
                    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
                    if (lastUser) sendMessage(lastUser.content);
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700"
                >
                  <RefreshCw size={12} /> Retry
                </button>
                <button
                  onClick={() => setSecurityModalOpen(true)}
                  className="flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-gray-800 underline"
                >
                  <Key size={12} /> Configure Key
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Suggested questions */}
        {showSuggested && !thinking && (
          <div className="space-y-2 pt-1">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide px-1">
              Verified MoTA Topics
            </p>
            {SUGGESTED[language].map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="w-full text-left text-sm text-gray-700 px-4 py-3 rounded-2xl transition-all active:scale-[0.99] hover:bg-emerald-50/50"
                style={{
                  background: '#fff',
                  border: '1px solid #e5e9ef',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input bar ── */}
      <div
        className="shrink-0 px-4 py-2.5 bg-white"
        style={{
          borderTop: '1px solid #e5e9ef',
          boxShadow: '0 -2px 8px rgba(0,0,0,0.04)',
          paddingBottom: 'calc(env(safe-area-inset-bottom) + 10px)',
        }}
      >
        <div className="flex gap-2 items-center">
          {/* Input field */}
          <div
            className="flex-1 flex items-center relative"
            style={{
              background: '#f8fafc',
              border: '1.5px solid #d1d5db',
              borderRadius: 14,
              padding: '8px 12px',
            }}
          >
            <input
              ref={inputRef}
              id="jago-input"
              type="text"
              maxLength={500}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder={t('ask_jago_placeholder')}
              className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder-gray-400"
              style={{ border: 'none', minHeight: 24 }}
              aria-label="Chat input — ask about MoTA scholarships"
              disabled={thinking}
            />

            {/* Character counter (when typing) */}
            {input.length > 50 && (
              <span className="text-[10px] text-gray-400 font-mono ml-2">
                {input.length}/500
              </span>
            )}
          </div>

          {/* Send button */}
          <button
            id="jago-send-btn"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || thinking}
            className="w-11 h-11 flex items-center justify-center rounded-xl shrink-0 transition-all active:scale-95 shadow-sm"
            style={{
              background: input.trim() && !thinking ? '#0F766E' : '#e5e9ef',
              color: input.trim() && !thinking ? '#fff' : '#9ca3af',
            }}
            aria-label="Send message to JAGO AI"
          >
            {thinking ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : (
              <Send size={17} />
            )}
          </button>
        </div>

        {/* Footer security guarantee */}
        <div className="flex items-center justify-between text-[10px] text-gray-400 mt-2 px-1">
          <span className="flex items-center gap-1">
            <Lock size={10} className="text-emerald-600" />
            Official MoTA Scheme Sandbox
          </span>
          <button
            onClick={() => setSecurityModalOpen(true)}
            className="hover:text-emerald-700 underline flex items-center gap-0.5"
          >
            Security & Privacy Shield
          </button>
        </div>
      </div>

      {/* ── Security & API Configuration Modal ── */}
      {securityModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#0F766E] px-5 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-emerald-300" />
                <div>
                  <h3 className="font-bold text-base">Security & Privacy Shield</h3>
                  <p className="text-xs text-white/70">Janjati Setu Governance Controls</p>
                </div>
              </div>
              <button
                onClick={() => setSecurityModalOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-sm text-gray-700">
              {/* Security Status Card */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between font-semibold text-emerald-900 text-xs uppercase tracking-wide">
                  <span>Protection Engine</span>
                  <span className="bg-emerald-200 text-emerald-900 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    ACTIVE
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-600" />
                    <span>UIDAI Aadhaar Redaction</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-600" />
                    <span>Anti-Prompt Injection</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-600" />
                    <span>Rate Abuse Prevention</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-600" />
                    <span>Zero Key Echo Filter</span>
                  </div>
                </div>
              </div>

              {/* Active Key Status */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                  Active Gemini API Key
                </label>
                <div className="flex items-center justify-between bg-gray-100 rounded-xl px-3 py-2.5 font-mono text-xs text-gray-800 border border-gray-200">
                  <span>{maskApiKey(activeKey)}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      apiConfigured
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {apiConfigured ? 'Connected' : 'Missing'}
                  </span>
                </div>
              </div>

              {/* Key Update / Custom Key Form */}
              <div className="space-y-2 pt-1 border-t border-gray-100">
                <label className="block text-xs font-semibold text-gray-700">
                  Update / Set Custom Key
                </label>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-xl px-3 py-2">
                  <Key size={15} className="text-gray-400 shrink-0" />
                  <input
                    type={showKeyText ? 'text' : 'password'}
                    placeholder="Enter Google AI Studio Key (AIza... / AQ...)"
                    value={customKeyInput}
                    onChange={(e) => setCustomKeyInput(e.target.value)}
                    className="flex-1 bg-transparent text-xs text-gray-900 outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKeyText(!showKeyText)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showKeyText ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={persistKey}
                      onChange={(e) => setPersistKey(e.target.checked)}
                      className="rounded text-teal-700"
                    />
                    <span>Persist in Local Storage</span>
                  </label>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal-700 hover:underline flex items-center gap-1"
                  >
                    Get Key <Info size={11} />
                  </a>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleSaveCustomKey}
                    disabled={!customKeyInput.trim()}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#0F766E] text-white text-xs font-semibold hover:bg-teal-800 disabled:opacity-50 transition-colors"
                  >
                    Save & Activate Key
                  </button>
                  <button
                    onClick={handleClearCustomKey}
                    className="py-2 px-3 rounded-xl bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Reset
                  </button>
                </div>

                {keySaveMessage && (
                  <p className="text-xs text-teal-800 bg-teal-50 p-2 rounded-lg font-medium">
                    {keySaveMessage}
                  </p>
                )}
              </div>

              {/* Connection Diagnostics */}
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <button
                  onClick={handleTestConnection}
                  disabled={testingConnection || !apiConfigured}
                  className="w-full py-2 px-3 rounded-xl border border-teal-700 text-teal-800 hover:bg-teal-50 text-xs font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {testingConnection ? (
                    <RefreshCw size={13} className="animate-spin" />
                  ) : (
                    <Wifi size={13} />
                  )}
                  Run Live Connection Test
                </button>

                {testResult && (
                  <div
                    className={`text-xs p-2.5 rounded-xl border ${
                      testResult.ok
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : 'bg-red-50 border-red-200 text-red-800'
                    }`}
                  >
                    {testResult.message}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSecurityModalOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-gray-200 text-gray-800 text-xs font-semibold hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
