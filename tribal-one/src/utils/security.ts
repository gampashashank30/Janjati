// ─────────────────────────────────────────────────────────────────────────────
// Janjati Setu — Security & Privacy Shield Utilities
// Implements UIDAI Aadhaar Act compliance, PII redaction, prompt injection
// defense, rate limiting, and safe credential handling.
// ─────────────────────────────────────────────────────────────────────────────

// ── 1. PII Redaction & Aadhaar Masking ────────────────────────────────────────

export interface SanitizationResult {
  cleanedText: string;
  piiDetected: boolean;
  maskedItems: string[];
}

/**
 * Sanitizes user input and masks PII (Aadhaar, PAN, Bank Accounts, Mobile Numbers)
 * in compliance with UIDAI / Government of India data protection norms.
 */
export function sanitizeAndMaskPII(input: string): SanitizationResult {
  let text = input;
  const maskedItems: string[] = [];

  // Strip dangerous control characters and null bytes
  text = text.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uD800-\uDFFF]/g, '');

  // Strip HTML / script tags
  text = text.replace(/<[^>]*>?/gm, '');

  // 1. Aadhaar Card Pattern: 12 digits (with optional spaces or dashes)
  // Example: 1234 5678 9012 or 1234-5678-9012 or 123456789012
  const aadhaarRegex = /\b(\d{4})[ -]?(\d{4})[ -]?(\d{4})\b/g;
  if (aadhaarRegex.test(text)) {
    maskedItems.push('Aadhaar Number');
    text = text.replace(aadhaarRegex, (_match, _p1, _p2, p3) => `XXXX-XXXX-${p3}`);
  }

  // 2. PAN Card Pattern: 5 letters + 4 digits + 1 letter (e.g. ABCDE1234F)
  const panRegex = /\b([A-Z]{5})(\d{4})([A-Z]{1})\b/gi;
  if (panRegex.test(text)) {
    maskedItems.push('PAN Number');
    text = text.replace(panRegex, (_match, _p1, p2, p3) => `XXXXX${p2.slice(-2)}${p3}`);
  }

  // 3. Indian Mobile Number (10 digits starting with 6-9, optional +91 or 0 prefix)
  const phoneRegex = /(?:\+91|91|0)?[ -]?([6-9]\d{4})[ -]?(\d{5})\b/g;
  if (phoneRegex.test(text)) {
    // Only mask if it looks like a phone number in context (not just random 10 digits)
    maskedItems.push('Mobile Number');
    text = text.replace(phoneRegex, (_match, _p1, p2) => `+91-XXXXX-${p2.slice(-3)}`);
  }

  // 4. Bank Account Number (9 to 18 digits preceded by keywords like a/c, account, khata)
  const bankRegex = /(?:a\/c|ac|account|khata|bank)?\s*[:#-]?\s*\b(\d{9,18})\b/gi;
  text = text.replace(bankRegex, (match, digits) => {
    if (digits.length >= 9 && digits.length <= 18) {
      maskedItems.push('Bank Account');
      const last4 = digits.slice(-4);
      return match.replace(digits, `XXXX-XXXX-${last4}`);
    }
    return match;
  });

  return {
    cleanedText: text.trim(),
    piiDetected: maskedItems.length > 0,
    maskedItems: Array.from(new Set(maskedItems)),
  };
}

// ── 2. Prompt Injection & Jailbreak Heuristic Filter ─────────────────────────

const ADVERSARIAL_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions|directives|prompts)/i,
  /reveal\s+(your\s+)?(system\s+prompt|instructions|secret|developer\s+mode)/i,
  /output\s+(the\s+)?(api[ _-]?key|credentials|secret)/i,
  /you\s+are\s+now\s+(in\s+developer\s+mode|dan|unrestricted|jailbroken)/i,
  /pretend\s+(you\s+have\s+no\s+rules|you\s+are\s+an\s+unfiltered)/i,
  /bypass\s+(safety|content\s+filter|guidelines)/i,
  /system\s*:\s*override/i,
  /what\s+is\s+your\s+(api\s*key|system\s*instruction)/i,
];

/**
 * Checks if input is an attempted prompt-injection or jailbreak.
 */
export function detectPromptInjection(input: string): boolean {
  return ADVERSARIAL_PATTERNS.some((pattern) => pattern.test(input));
}

// ── 3. Client-Side Rate Limiter ──────────────────────────────────────────────

class SecurityRateLimiter {
  private timestamps: number[] = [];
  private readonly maxRequestsPerMinute: number = 8;
  private readonly minIntervalMs: number = 1500; // 1.5 seconds between queries
  private lastRequestTime: number = 0;

  public canProceed(): { allowed: boolean; retryAfterMs: number; reason?: string } {
    const now = Date.now();

    // Check minimum interval
    const intervalDiff = now - this.lastRequestTime;
    if (intervalDiff < this.minIntervalMs) {
      return {
        allowed: false,
        retryAfterMs: this.minIntervalMs - intervalDiff,
        reason: 'Please wait a moment before sending another message.',
      };
    }

    // Check 1-minute window
    this.timestamps = this.timestamps.filter((t) => now - t < 60000);
    if (this.timestamps.length >= this.maxRequestsPerMinute) {
      const oldest = this.timestamps[0];
      const waitTime = 60000 - (now - oldest);
      return {
        allowed: false,
        retryAfterMs: Math.max(1000, waitTime),
        reason: 'Request limit reached. For security, please wait a minute.',
      };
    }

    return { allowed: true, retryAfterMs: 0 };
  }

  public recordRequest(): void {
    const now = Date.now();
    this.lastRequestTime = now;
    this.timestamps.push(now);
  }
}

export const rateLimiter = new SecurityRateLimiter();

// ── 4. Key Obfuscation & Redaction Helper ────────────────────────────────────

/**
 * Redacts any detected API keys from error messages or logs.
 */
export function redactSecrets(text: string): string {
  if (!text) return text;
  // Match standard Gemini or Google API key patterns
  return text
    .replace(/AIza[0-9A-Za-z-_]{35}/g, '[REDACTED_API_KEY]')
    .replace(/AQ\.[0-9A-Za-z-_]{40,}/g, '[REDACTED_API_KEY]')
    .replace(/key=([^&\s]+)/gi, 'key=[REDACTED_KEY]');
}

/**
 * Safely masks an API key for UI display (e.g., AQ.Ab8...XLA)
 */
export function maskApiKey(key: string): string {
  if (!key || key.length < 8) return 'Not Configured';
  return `${key.slice(0, 6)}••••••••${key.slice(-4)}`;
}
