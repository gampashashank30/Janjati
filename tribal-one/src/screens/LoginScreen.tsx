import { useState } from 'react';
import { useApp } from '../context/AppContext';

type LoginMethod = 'mobile' | 'aadhaar' | 'apaar';

const METHODS: { id: LoginMethod; label: string }[] = [
  { id: 'mobile', label: 'Mobile OTP' },
  { id: 'aadhaar', label: 'Aadhaar' },
  { id: 'apaar', label: 'APAAR ID' },
];

export function LoginScreen() {
  const { login } = useApp();
  const [method, setMethod] = useState<LoginMethod>('mobile');
  const [credential, setCredential] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'credential' | 'otp'>('credential');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const placeholders: Record<LoginMethod, string> = {
    mobile: 'Enter 10-digit mobile number',
    aadhaar: 'Enter 12-digit Aadhaar number',
    apaar: 'Enter APAAR ID (e.g. AP2025MH000000)',
  };

  const labels: Record<LoginMethod, string> = {
    mobile: 'Mobile Number',
    aadhaar: 'Aadhaar Number',
    apaar: 'APAAR ID',
  };

  function handleSendOtp() {
    if (!credential.trim()) { setError(`Please enter your ${labels[method]}`); return; }
    setError('');
    setStep('otp');
  }

  async function handleVerify() {
    if (otp.length < 4) { setError('Enter the OTP sent to your registered mobile number.'); return; }
    setError('');
    setLoading(true);
    try { await login(method, credential); }
    catch { setError('Verification failed. Please try again.'); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0F766E' }}>
      {/* Top decorative band */}
      <div className="relative overflow-hidden" style={{ background: '#0F766E', paddingTop: 'env(safe-area-inset-top)' }}>
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} aria-hidden />

        <div className="relative px-6 pt-12 pb-10">
          {/* Gov & Portal Badge */}
          <div className="flex items-center gap-3.5 mb-8">
            <div
              className="w-13 h-13 rounded-2xl bg-white flex items-center justify-center shrink-0 p-1 overflow-hidden shadow-md"
              style={{ width: '52px', height: '52px' }}
            >
              <img src="/logo.jpg" alt="Tribal One Logo" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Ministry of Tribal Affairs</p>
              <p className="text-white/70 text-[11px] mt-0.5">Government of India · जनजातीय कार्य मंत्रालय</p>
            </div>
          </div>

          <h1 className="text-white text-3xl font-black tracking-tight leading-tight">Tribal One</h1>
          <p className="text-white/70 text-sm mt-2 leading-relaxed">
            Unified Scholarship Portal for<br />Scheduled Tribe Students
          </p>

          {/* Demo notice */}
          <div className="mt-5 inline-flex items-center gap-2 bg-[#F59E0B]/20 border border-[#F59E0B]/30 rounded-lg px-3 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shrink-0" aria-hidden />
            <p className="text-[#F59E0B] text-xs font-medium">Demo — No real credentials required</p>
          </div>
        </div>
      </div>

      {/* Card */}
      <div
        className="flex-1 bg-white px-6 pt-8 pb-10"
        style={{ borderRadius: '24px 24px 0 0', marginTop: -8 }}
      >
        <h2 className="text-xl font-bold text-gray-900 mb-1 tracking-tight">Sign in to continue</h2>
        <p className="text-sm text-gray-500 mb-7 leading-relaxed">
          Access your scholarship dashboard securely using any of the methods below.
        </p>

        {step === 'credential' ? (
          <>
            {/* Method tabs */}
            <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-6" role="group" aria-label="Login method">
              {METHODS.map((m) => (
                <button
                  key={m.id}
                  id={`login-tab-${m.id}`}
                  onClick={() => { setMethod(m.id); setCredential(''); setError(''); }}
                  className="flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-150"
                  style={{
                    background: method === m.id ? '#fff' : 'transparent',
                    color: method === m.id ? '#0F766E' : '#6b7280',
                    boxShadow: method === m.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    minHeight: 36,
                  }}
                  aria-pressed={method === m.id}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="mb-5">
              <label htmlFor="credential-input" className="block text-sm font-semibold text-gray-700 mb-2">
                {labels[method]}
              </label>
              <input
                id="credential-input"
                type={method === 'apaar' ? 'text' : 'tel'}
                inputMode="numeric"
                value={credential}
                onChange={(e) => { setCredential(e.target.value); setError(''); }}
                placeholder={placeholders[method]}
                className="input-base"
                aria-describedby={error ? 'login-error' : undefined}
              />
            </div>

            {error && <p id="login-error" className="text-sm text-red-600 mb-3 font-medium" role="alert">{error}</p>}

            <button id="send-otp-btn" onClick={handleSendOtp} className="btn-primary">
              Send OTP
            </button>
          </>
        ) : (
          <>
            <div className="bg-[#f0faf9] border border-teal-100 rounded-xl px-4 py-3 mb-6 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0F766E] flex items-center justify-center shrink-0 mt-0.5">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path stroke="#fff" strokeWidth="2" strokeLinecap="round" d="M12 18h.01M8 10a4 4 0 118 0 4 4 0 01-8 0" /></svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">OTP Sent</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  Enter the 6-digit OTP sent to your registered mobile.
                  <span className="text-[#0F766E] font-medium"> (Demo: any 6 digits)</span>
                </p>
              </div>
            </div>

            <label htmlFor="otp-input" className="block text-sm font-semibold text-gray-700 mb-2">
              One-Time Password
            </label>
            <input
              id="otp-input"
              type="tel"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => { setOtp(e.target.value); setError(''); }}
              placeholder="_ _ _ _ _ _"
              className="input-base text-center text-2xl font-bold tracking-[0.5em]"
              aria-describedby={error ? 'otp-error' : undefined}
            />

            {error && <p id="otp-error" className="text-sm text-red-600 mt-2 mb-1 font-medium" role="alert">{error}</p>}

            <button
              id="verify-otp-btn"
              onClick={handleVerify}
              disabled={loading}
              className="btn-primary mt-5"
            >
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>

            <button
              id="back-credential-btn"
              onClick={() => { setStep('credential'); setOtp(''); setError(''); }}
              className="w-full py-3 text-sm font-semibold text-gray-500 mt-2"
              style={{ minHeight: 44 }}
            >
              Back
            </button>
          </>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            By signing in, you agree to our{' '}
            <a href="#terms" className="text-[#0F766E] font-medium underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#privacy" className="text-[#0F766E] font-medium underline">Privacy Policy</a>
          </p>
          <p className="text-[10px] text-gray-300 text-center mt-2">
            Ministry of Tribal Affairs · NIC · Government of India
          </p>
        </div>
      </div>
    </div>
  );
}
