import { useState, useRef, useEffect } from 'react';
import { Send, Globe, ChevronDown } from 'lucide-react';
import type { ChatMessage, Language } from '../types';
import { useApp } from '../context/AppContext';
import { SCHOLARSHIPS } from '../data/scholarships';

const SUGGESTED: Record<Language, string[]> = {
  en: [
    'Am I eligible for any scholarship?',
    'Track my application status',
    'What documents do I need?',
    'Explain the NFST fellowship',
    'When will my payment arrive?',
    'How do I apply for Top Class Education?',
  ],
  hi: [
    'क्या मैं किसी छात्रवृत्ति के लिए पात्र हूं?',
    'मेरे आवेदन की स्थिति बताएं',
    'मुझे कौन से दस्तावेज़ चाहिए?',
    'NFST फेलोशिप समझाइए',
    'मेरा भुगतान कब आएगा?',
  ],
  te: [
    'నేను ఏదైనా స్కాలర్‌షిప్‌కు అర్హుడినా?',
    'నా దరఖాస్తు స్థితి చెప్పండి',
    'నాకు ఏ పత్రాలు కావాలి?',
    'NFST ఫెలోషిప్ వివరించండి',
    'నా చెల్లింపు ఎప్పుడు వస్తుంది?',
  ],
};

function generateResponse(
  query: string,
  lang: Language,
  student: ReturnType<typeof useApp>['student'],
  applications: ReturnType<typeof useApp>['applications'],
  payments: ReturnType<typeof useApp>['payments']
): string {
  const q = query.toLowerCase();

  if (q.includes('eligible') || q.includes('पात्र') || q.includes('అర్హుడు') || q.includes('qualify')) {
    const eligible: string[] = [];
    if (student) {
      if (student.annualIncome <= 250000) {
        eligible.push('Pre-Matric Scholarship (Class IX–X)');
        eligible.push('Post-Matric Scholarship (Class XI and above)');
      }
      if (student.annualIncome <= 600000) {
        eligible.push('Top Class Education Scheme (if enrolled in a MoTA-notified institution)');
        eligible.push('National Overseas Scholarship (with foreign university admission)');
      }
    }
    if (lang === 'hi') return `आपकी वार्षिक आय Rs. ${student?.annualIncome?.toLocaleString('en-IN') ?? '—'} के आधार पर आप इन योजनाओं के लिए पात्र हो सकते हैं:\n\n${eligible.map((e, i) => `${i + 1}. ${e}`).join('\n')}\n\nविस्तृत जांच के लिए प्रोफ़ाइल में Eligibility Checker खोलें।`;
    if (lang === 'te') return `మీ వార్షిక ఆదాయం Rs. ${student?.annualIncome?.toLocaleString('en-IN') ?? '—'} ఆధారంగా:\n\n${eligible.map((e, i) => `${i + 1}. ${e}`).join('\n')}\n\nProfile లో Eligibility Checker తెరవండి.`;
    return `Based on your profile (Income: Rs. ${student?.annualIncome?.toLocaleString('en-IN') ?? '—'}, Category: ST), you may be eligible for:\n\n${eligible.map((e, i) => `${i + 1}. ${e}`).join('\n')}\n\nUse the Eligibility Checker in your Profile tab for a detailed assessment.`;
  }

  if (q.includes('track') || q.includes('status') || q.includes('application') || q.includes('आवेदन') || q.includes('దరఖాస్తు')) {
    if (!applications.length) return 'You have not submitted any applications yet. Go to the Schemes tab to apply for a scholarship.';
    const statuses = applications.map((a) => `• ${a.schemeName}: ${a.status.replace(/_/g, ' ').toUpperCase()}${a.applicationNumber ? ` (${a.applicationNumber})` : ''}`).join('\n');
    if (lang === 'hi') return `आपके आवेदन:\n\n${statuses}`;
    if (lang === 'te') return `మీ దరఖాస్తుల స్థితి:\n\n${statuses}`;
    return `Your current application statuses:\n\n${statuses}\n\nFor detailed tracking, open the Schemes tab and tap Track Status.`;
  }

  if (q.includes('document') || q.includes('दस्तावेज़') || q.includes('పత్రాలు') || q.includes('missing')) {
    if (lang === 'hi') return 'MoTA छात्रवृत्ति के लिए आवश्यक दस्तावेज़:\n\n1. Aadhaar Card\n2. ST Certificate\n3. Income Certificate (Tehsildar)\n4. Domicile Certificate\n5. APAAR ID\n6. Marksheets\n7. Bonafide Certificate\n8. Bank Passbook (Aadhaar-linked)\n\nDocuments टैब में जाकर देखें।';
    if (lang === 'te') return 'MoTA స్కాలర్‌షిప్‌లకు అవసరమైన పత్రాలు:\n\n1. Aadhaar Card\n2. ST Certificate\n3. Income Certificate\n4. Domicile Certificate\n5. APAAR ID\n6. Marksheets\n7. Bonafide Certificate\n8. Bank Passbook\n\nDocuments tab చూడండి.';
    return 'Common documents required for all MoTA scholarships:\n\n1. Aadhaar Card\n2. ST Certificate (from competent authority)\n3. Income Certificate (Tehsildar or Revenue Officer)\n4. Domicile Certificate\n5. APAAR ID\n6. Marksheets of previous qualifying exams\n7. Bonafide / Enrollment Certificate\n8. Bank Passbook (Aadhaar-seeded)\n\nCheck your Documents tab to see which are pending or missing.';
  }

  if (q.includes('nfst') || q.includes('fellowship') || q.includes('फेलोशिप') || q.includes('ఫెలోషిప్')) {
    const nfst = SCHOLARSHIPS.find((s) => s.id === 'nfst')!;
    if (lang === 'hi') return `${nfst.name}\n\nयह योजना ST शोधार्थियों को M.Phil / PhD के लिए मासिक स्टाइपेंड देती है:\n\n• JRF: Rs. 31,000/माह (वर्ष 1–2)\n• SRF: Rs. 35,000/माह (वर्ष 3–5)\n• कोई आय सीमा नहीं\n• आयु: ≤ 35 वर्ष\n• 750 सीटें प्रति वर्ष\n\nआवेदन: sfmp.tribal.nic.in`;
    if (lang === 'te') return `${nfst.name}\n\nST పరిశోధకులకు M.Phil/PhD కోసం నెలవారీ స్టైపెండ్:\n\n• JRF: Rs. 31,000/నెల\n• SRF: Rs. 35,000/నెల\n• ఆదాయ పరిమితి లేదు\n• వయస్సు: ≤ 35 సంవత్సరాలు\n\nదరఖాస్తు: sfmp.tribal.nic.in`;
    return `${nfst.name}\n\nMonthly stipend for ST scholars pursuing M.Phil or PhD:\n\n• JRF: Rs. 31,000/month (Years 1–2)\n• SRF: Rs. 35,000/month (Years 3–5)\n• No income limit\n• 750 slots per year\n• Age: up to 35 years\n• Must have passed NET/SET\n\nApply at: sfmp.tribal.nic.in`;
  }

  if (q.includes('payment') || q.includes('when') || q.includes('भुगतान') || q.includes('చెల్లింపు') || q.includes('money')) {
    if (!payments.length) return 'No payment records found yet. Once your application is sanctioned, the scholarship amount is credited directly to your Aadhaar-seeded bank account via PFMS (Direct Benefit Transfer).';
    const p = payments[0];
    if (lang === 'hi') return `आपका अंतिम भुगतान:\n\n• योजना: ${p.schemeName}\n• राशि: Rs. ${p.amount.toLocaleString('en-IN')}\n• स्थिति: Credited\n• UTR: ${p.utrNumber ?? '—'}\n• तिथि: ${p.date}\n\nDBT सीधे आपके Aadhaar-linked बैंक खाते में होता है।`;
    return `Your latest payment:\n\n• Scheme: ${p.schemeName}\n• Amount: Rs. ${p.amount.toLocaleString('en-IN')}\n• Status: CREDITED\n• UTR: ${p.utrNumber ?? 'N/A'}\n• Date: ${p.date}\n\nDisbursements are made via PFMS directly to your Aadhaar-seeded account.`;
  }

  if (q.includes('top class') || q.includes('iit') || q.includes('nit') || q.includes('aiims')) {
    if (lang === 'hi') return 'Top Class Education Scheme ST छात्रों को IIT, NIT, IIM, AIIMS, NLU जैसे शीर्ष संस्थानों में पूरी फीस + Rs. 3,000/माह + Rs. 45,000 laptop देती है। पात्रता: आय ≤ Rs. 6 लाख। आवेदन: sfmp.tribal.nic.in';
    return 'Top Class Education Scheme gives ST students admitted to 267+ MoTA-notified premier institutions (IITs, NITs, IIMs, AIIMS, NLUs etc.):\n\n• Full tuition fee\n• Rs. 3,000/month living allowance\n• Rs. 5,000/year books\n• Rs. 45,000 one-time laptop\n\nIncome limit: Rs. 6 lakh per annum.\nApply at: sfmp.tribal.nic.in';
  }

  if (q.includes('overseas') || q.includes('nos') || q.includes('abroad') || q.includes('foreign')) {
    return 'National Overseas Scholarship (NOS) supports ST students pursuing Masters or PhD abroad:\n\n• Full tuition + living allowance + airfare + visa fees\n• 20 slots per year for ST students\n• Income limit: Rs. 6 lakh per annum\n• Age: up to 35 years\n• Minimum 60% in graduation\n\nApply when the notification is released at: tribal.nic.in/nos.aspx';
  }

  const list = SCHOLARSHIPS.map((s, i) => `${i + 1}. ${s.name}`).join('\n');
  if (lang === 'hi') return `नमस्ते! मैं JAGO AI हूं। MoTA की 5 छात्रवृत्ति योजनाएं:\n\n${list}\n\nपात्रता, दस्तावेज़, आवेदन स्थिति या भुगतान के बारे में पूछें।`;
  if (lang === 'te') return `నమస్కారం! నేను JAGO AI. MoTA యొక్క 5 స్కాలర్‌షిప్ పథకాలు:\n\n${list}\n\nమీ ప్రశ్న అడగండి.`;
  return `I'm JAGO AI — the official scholarship assistant for Ministry of Tribal Affairs.\n\nI can help you with the 5 MoTA schemes:\n${list}\n\nAsk me about eligibility, documents, application status, or payments.`;
}

const LANG_LABELS: Record<Language, string> = { en: 'English', hi: 'हिंदी', te: 'తెలుగు' };

export function JagoScreen() {
  const { student, applications, payments, language, setLanguage } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'assistant',
      content: `Hello! I'm JAGO AI, the official scholarship assistant for the Ministry of Tribal Affairs.\n\nI can answer your questions about the 5 MoTA scholarship schemes — eligibility, documents, application status, and payments.\n\nSelect a question below or type your own.`,
      timestamp: new Date().toISOString(),
      language: 'en',
    },
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinking]);

  async function sendMessage(text: string) {
    if (!text.trim() || thinking) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
      language,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setThinking(true);

    await new Promise((r) => setTimeout(r, 800));

    const reply = generateResponse(text, language, student, applications, payments);
    setMessages((prev) => [
      ...prev,
      { id: (Date.now() + 1).toString(), role: 'assistant', content: reply, timestamp: new Date().toISOString(), language },
    ]);
    setThinking(false);
  }

  const showSuggested = messages.length <= 1;

  return (
    <div
      className="flex flex-col bg-[#f5f7fa]"
      style={{ height: '100dvh', paddingBottom: 56 }}
    >
      {/* ── Header ── */}
      <header className="bg-[#0F766E] px-4 pt-14 pb-4 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/60 text-[11px] font-medium uppercase tracking-wide">Ministry of Tribal Affairs</p>
            <h1 className="text-white font-bold text-xl tracking-tight mt-0.5">JAGO AI</h1>
            <p className="text-white/60 text-xs">Official Scholarship Assistant</p>
          </div>

          {/* Language picker */}
          <div className="relative">
            <button
              id="lang-select-btn"
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-xs font-semibold"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
              aria-label="Select language"
              aria-expanded={langOpen}
            >
              <Globe size={13} />
              {LANG_LABELS[language]}
              <ChevronDown size={12} style={{ transform: langOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
            </button>

            {langOpen && (
              <div
                className="absolute right-0 top-11 rounded-2xl overflow-hidden z-50"
                style={{
                  background: '#fff',
                  border: '1px solid #e5e9ef',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  minWidth: 130,
                }}
              >
                {(Object.entries(LANG_LABELS) as [Language, string][]).map(([code, label]) => (
                  <button
                    key={code}
                    id={`lang-${code}`}
                    onClick={() => { setLanguage(code); setLangOpen(false); }}
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
      </header>

      {/* ── Messages ── */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        style={{ background: '#f5f7fa' }}
        onClick={() => setLangOpen(false)}
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
            {msg.role === 'assistant' && (
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-black shrink-0 mb-0.5"
                style={{ background: '#0F766E' }}
                aria-hidden
              >
                AI
              </div>
            )}
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
            <div className="w-7 h-7 rounded-full bg-[#0F766E] flex items-center justify-center text-white text-[10px] font-black shrink-0">
              AI
            </div>
            <div
              className="px-4 py-3.5 flex items-center gap-1.5"
              style={{ background: '#fff', borderRadius: '4px 20px 20px 20px', border: '1px solid #e5e9ef', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
            >
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Suggested questions */}
        {showSuggested && !thinking && (
          <div className="space-y-2 pt-2">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide px-1">Suggested questions</p>
            {SUGGESTED[language].map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="w-full text-left text-sm text-gray-700 px-4 py-3 rounded-2xl transition-colors"
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

      {/* ── Input bar — GOV.UK Chat style ── */}
      <div
        className="shrink-0 px-4 py-3 bg-white"
        style={{
          borderTop: '1px solid #e5e9ef',
          boxShadow: '0 -2px 8px rgba(0,0,0,0.04)',
          paddingBottom: 'calc(env(safe-area-inset-bottom) + 12px)',
        }}
      >
        <div className="flex gap-2 items-end">
          <div
            className="flex-1 flex items-center"
            style={{
              background: '#f5f7fa',
              border: '1.5px solid #d1d5db',
              borderRadius: 14,
              padding: '10px 14px',
              transition: 'border-color 0.15s',
            }}
          >
            <input
              ref={inputRef}
              id="jago-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
              placeholder="Ask a question..."
              className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder-gray-400"
              style={{ border: 'none', minHeight: 24 }}
              aria-label="Chat input"
            />
          </div>
          <button
            id="jago-send-btn"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || thinking}
            className="w-11 h-11 flex items-center justify-center rounded-xl shrink-0 transition-all"
            style={{
              background: input.trim() && !thinking ? '#0F766E' : '#e5e9ef',
              color: input.trim() && !thinking ? '#fff' : '#9ca3af',
            }}
            aria-label="Send message"
          >
            <Send size={17} />
          </button>
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-2">
          JAGO AI answers from official MoTA scheme data only · tribal.nic.in
        </p>
      </div>
    </div>
  );
}
