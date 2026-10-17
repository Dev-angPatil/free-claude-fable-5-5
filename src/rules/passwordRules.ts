export interface PasswordRule {
  id: number;
  label: string;
  description: string;
  validator: (password: string, context: RuleContext) => boolean;
  hint?: (password: string, context: RuleContext) => string;
}

export interface RuleContext {
  todayRomanDate: string;
  currentUtcMinute: string;
}

export function getRuleContext(): RuleContext {
  const now = new Date();
  const day = now.getUTCDate();
  
  // Roman numeral conversion for day (1 to 31)
  const romanMap: [number, string][] = [
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
  ];
  let num = day;
  let roman = '';
  for (const [val, str] of romanMap) {
    while (num >= val) {
      roman += str;
      num -= val;
    }
  }

  const minute = String(now.getUTCMinutes()).padStart(2, '0');

  return {
    todayRomanDate: roman || 'XVII',
    currentUtcMinute: minute,
  };
}

export const RULES: PasswordRule[] = [
  {
    id: 1,
    label: "Minimum Entry Length",
    description: "Your password must be at least 8 characters long.",
    validator: (pw) => pw.length >= 8,
    hint: () => "Keep typing to establish initial entropy.",
  },
  {
    id: 2,
    label: "Numeric Diversity",
    description: "Your password must include at least two digits (0-9).",
    validator: (pw) => (pw.match(/\d/g) || []).length >= 2,
    hint: () => "Numbers are required for cryptographic salt.",
  },
  {
    id: 3,
    label: "Uppercase Distribution",
    description: "Your password must include at least two uppercase letters (A-Z).",
    validator: (pw) => (pw.match(/[A-Z]/g) || []).length >= 2,
  },
  {
    id: 4,
    label: "CRITICAL: Letter-to-Number Quarantine",
    description: "No number may appear directly after any letter (e.g., 'a1', 'K9' are strictly prohibited).",
    validator: (pw) => !/[a-zA-Z]\d/.test(pw),
    hint: () => "Separate digits from letters using punctuation or spaces, or place digits before letters.",
  },
  {
    id: 5,
    label: "Anti-Repetition Protocol",
    description: "No repeated consecutive characters (e.g. 'aa', '33' are prohibited; Roman numeral sequence exempt) and no repeated 2-character tokens (e.g. 'abab').",
    validator: (pw, ctx) => {
      // Strip first occurrence of validated Roman numeral to exempt its internal repeats (e.g. 'II' in XVII)
      const withoutRoman = ctx.todayRomanDate ? pw.replace(ctx.todayRomanDate, '') : pw;
      if (/(.)\1/.test(withoutRoman)) return false;

      // Disallow 3 consecutive identical characters anywhere
      if (/(.)\1\1/.test(pw)) return false;

      // Disallow duplicate 2-character bigrams anywhere in password
      for (let i = 0; i < pw.length - 3; i++) {
        const token = pw.slice(i, i + 2);
        const remainder = pw.slice(i + 2);
        if (remainder.includes(token)) return false;
      }
      return true;
    },
    hint: () => "Ensure characters and 2-character bigrams do not repeat (calendar Roman numeral sequence is exempt).",
  },
  {
    id: 6,
    label: "Temporal Roman Handshake",
    description: "Your password must include today's UTC calendar day in Roman numerals.",
    validator: (pw, ctx) => pw.includes(ctx.todayRomanDate),
    hint: (_pw, ctx) => `Today is day ${new Date().getUTCDate()} UTC (Roman: ${ctx.todayRomanDate}).`,
  },
  {
    id: 7,
    label: "Sum of Digits Verification",
    description: "The sum of all individual digits in your password must equal exactly 29.",
    validator: (pw) => {
      const digits = (pw.match(/\d/g) || []).map(Number);
      const sum = digits.reduce((a, b) => a + b, 0);
      return sum === 29;
    },
    hint: (pw) => {
      const digits = (pw.match(/\d/g) || []).map(Number);
      const sum = digits.reduce((a, b) => a + b, 0);
      return `Current digit sum: ${sum} / 29`;
    },
  },
  {
    id: 8,
    label: "Elemental Chemistry Verification",
    description: "Your password must include the two-letter chemical symbol of an alkali metal (Li, Na, Rb, Cs, or Fr).",
    validator: (pw) => /(Li|Na|Rb|Cs|Fr)/.test(pw),
    hint: () => "Valid elements: Li (Lithium), Na (Sodium), Rb (Rubidium), Cs (Caesium), Fr (Francium). Note: Case-sensitive.",
  },
  {
    id: 9,
    label: "MANDATORY QUANTUM COMPLIANCE",
    description: "Your password length must be AT LEAST 50 characters/digits.",
    validator: (pw) => pw.length >= 50,
    hint: (pw) => `Current length: ${pw.length} / 50 characters`,
  },
  {
    id: 10,
    label: "Vowel / Parity Isolation",
    description: "No vowel (A, E, I, O, U, case-insensitive) may be immediately adjacent to an even number (0, 2, 4, 6, 8).",
    validator: (pw) => {
      const regex1 = /[aeiouAEIOU][02468]/;
      const regex2 = /[02468][aeiouAEIOU]/;
      return !regex1.test(pw) && !regex2.test(pw);
    },
    hint: () => "Keep vowels away from even numbers (0, 2, 4, 6, 8).",
  },
  {
    id: 11,
    label: "Cryptographic Symbols",
    description: "Must contain at least 3 distinct symbols from: ! @ # $ % ^ & * _ + - = ~",
    validator: (pw) => {
      const allowed = new Set(['!', '@', '#', '$', '%', '^', '&', '*', '_', '+', '-', '=', '~']);
      const found = new Set<string>();
      for (const char of pw) {
        if (allowed.has(char)) found.add(char);
      }
      return found.size >= 3;
    },
    hint: (pw) => {
      const allowed = new Set(['!', '@', '#', '$', '%', '^', '&', '*', '_', '+', '-', '=', '~']);
      const found = new Set<string>();
      for (const char of pw) {
        if (allowed.has(char)) found.add(char);
      }
      return `Found: ${found.size} / 3 distinct symbols`;
    },
  },
  {
    id: 12,
    label: "Time-Sensitive UTC Pulse",
    description: "Must contain the current UTC minute formatted as two digits.",
    validator: (pw, ctx) => pw.includes(ctx.currentUtcMinute),
    hint: (_pw, ctx) => `Current UTC Minute: "${ctx.currentUtcMinute}". Beware: this changes every 60 seconds!`,
  },
  {
    id: 13,
    label: "Model Gratitude Tribute",
    description: "Your password must contain an ASCII emoticon showing reverence to Claude (must include ':)' or '<3' or '^_^').",
    validator: (pw) => pw.includes(':)') || pw.includes('<3') || pw.includes('^_^'),
    hint: () => "Accepted emoticons: :) or <3 or ^_^",
  },
  {
    id: 14,
    label: "Bicameral Equilibrium",
    description: "Your password must have an EXACTLY EQUAL count of uppercase and lowercase letters (and at least 4 of each).",
    validator: (pw) => {
      const upper = (pw.match(/[A-Z]/g) || []).length;
      const lower = (pw.match(/[a-z]/g) || []).length;
      return upper >= 4 && upper === lower;
    },
    hint: (pw) => {
      const upper = (pw.match(/[A-Z]/g) || []).length;
      const lower = (pw.match(/[a-z]/g) || []).length;
      return `Upper: ${upper} | Lower: ${lower} (Must be equal, min 4)`;
    },
  },
];

export const PASTE_INSULTS = [
  "Pasting detected! Security protocol breached. Type your credentials with your biological fingers.",
  "Nice try. Clipboard injection is strictly prohibited in Claude 5.5 Fable.",
  "Ctrl+V is for script kiddies. Manual keystrokes only.",
  "Security violation: Automated text injection. Your digital dignity has been deducted.",
  "Keystroke telemetry indicates artificial paste. Try using your keyboard.",
  "Pasting disabled by Anthropic Quantum Gateway v5.5. Suffer like the rest of us.",
];

export const GASLIGHT_MESSAGES = [
  { min: 0, max: 15, text: "Security rating: 2% — Laughable. A toddler with a crayon could bypass this." },
  { min: 16, max: 35, text: "Security rating: 19% — Abysmal. You clearly failed to read the guidelines." },
  { min: 36, max: 55, text: "Security rating: 42% — Questionable. Claude 5.5 is profoundly unimpressed." },
  { min: 56, max: 75, text: "Security rating: 68% — Substandard. Still miles away from quantum resistance." },
  { min: 76, max: 90, text: "Security rating: 84% — Marginally acceptable, yet deeply suspect." },
  { min: 91, max: 99, text: "Security rating: 96% — Near optimal. Watch the clock before the minute changes." },
  { min: 100, max: 100, text: "Security rating: 100% — Miraculous! Submit immediately before entropy shifts!" },
];
