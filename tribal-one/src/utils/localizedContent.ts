import type { ScholarshipScheme, Language } from '../types';
import type { Programme, ProgrammeCategory } from '../data/programmes';

export const SCHOLARSHIP_CATEGORY_LABELS: Record<string, Record<Language, string>> = {
  all: {
    en: 'All Schemes',
    te: 'అన్ని పథకాలు',
    hi: 'सभी योजनाएं',
    kn: 'ಎಲ್ಲಾ ಯೋಜನೆಗಳು',
    ta: 'அனைத்து திட்டங்கள்',
    ml: 'എല്ലാ പദ്ധതികളും',
  },
  scholarships: {
    en: 'Scholarships',
    te: 'స్కాలర్‌షిప్‌లు',
    hi: 'छात्रवृत्तियां',
    kn: 'ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು',
    ta: 'உதவித்தொகை',
    ml: 'സ്കോളർഷിപ്പുകൾ',
  },
  fellowship: {
    en: 'Fellowships',
    te: 'ఫెలోషిప్‌లు',
    hi: 'फ़ेलोशिप',
    kn: 'ಫೆಲೋಶಿಪ್‌ಗಳು',
    ta: 'ஆராய்ச்சி உதவித்தொகை',
    ml: 'ഫെലോഷിപ്പുകൾ',
  },
  loans: {
    en: 'Loans & Credit',
    te: 'రుణాలు & క్రెడిట్',
    hi: 'ऋण एवं क्रेडिट',
    kn: 'ಸಾಲಗಳು ಮತ್ತು ಕ್ರೆಡಿಟ್',
    ta: 'கடன்கள் & வரவு',
    ml: 'വായ്പകളും ക്രെഡിറ്റും',
  },
  school: {
    en: 'School & PVTG',
    te: 'పాఠశాల & PVTG',
    hi: 'विद्यालय एवं पीवीटीजी',
    kn: 'ಶಾಲೆ ಮತ್ತು ಪಿವಿಟಿಜಿ',
    ta: 'பள்ளி & PVTG',
    ml: 'സ്കൂളും PVTG യും',
  },
  livelihood: {
    en: 'Livelihood & Skills',
    te: 'జీవనోపాధి & నైపుణ్యాలు',
    hi: 'आजीविका एवं कौशल',
    kn: 'ಜೀವನೋಪಾಯ ಮತ್ತು ಕೌಶಲ್ಯ',
    ta: 'வாழ்வாதாரம் & திறன்',
    ml: 'ഉപജീവനവും നൈപുണ്യവും',
  },
};

export const PROGRAMME_CATEGORY_LABELS: Record<ProgrammeCategory | 'All', Record<Language, string>> = {
  'All': {
    en: 'All',
    te: 'అన్నీ',
    hi: 'सभी',
    kn: 'ಎಲ್ಲವೂ',
    ta: 'அனைத்தும்',
    ml: 'എല്ലാം',
  },
  'School & Education': {
    en: 'School & Education',
    te: 'పాఠశాల & విద్య',
    hi: 'विद्यालय एवं शिक्षा',
    kn: 'ಶಾಲೆ ಮತ್ತು ಶಿಕ್ಷಣ',
    ta: 'பள்ளி மற்றும் கல்வி',
    ml: 'സ്കൂളും വിദ്യാഭ്യാസവും',
  },
  'Education Loan': {
    en: 'Education Loan',
    te: 'విద్యా రుణం',
    hi: 'शिक्षा ऋण',
    kn: 'ಶಿಕ್ಷಣ ಸಾಲ',
    ta: 'கல்வி கடன்',
    ml: 'വിദ്യാഭ്യാസ വായ്പ',
  },
  'Youth & Skill Development': {
    en: 'Youth & Skill Development',
    te: 'యువత & నైపుణ్యాభివృద్ధి',
    hi: 'युवा एवं कौशल विकास',
    kn: 'ಯುವಜನ ಮತ್ತು ಕೌಶಲ್ಯ ಅಭಿವೃದ್ಧಿ',
    ta: 'இளைஞர் மற்றும் திறன் மேம்பாடு',
    ml: 'യുവജന & നൈപുണ്യ വികസനം',
  },
  'PVTG / Tribal Welfare': {
    en: 'PVTG / Tribal Welfare',
    te: 'పీవీటీజీ / గిరిజన సంక్షేమం',
    hi: 'पीवीटीजी / जनजातीय कल्याण',
    kn: 'ಪಿವಿಟಿಜಿ / ಬುಡಕಟ್ಟು ಕಲ್ಯಾಣ',
    ta: 'PVTG / பழங்குடியினர் நலம்',
    ml: 'PVTG / ആദിവാസി ക്ഷേമം',
  },
  'Tribal Development': {
    en: 'Tribal Development',
    te: 'గిరిజనాభివృద్ధి',
    hi: 'जनजातीय विकास',
    kn: 'ಬುಡಕಟ್ಟು ಅಭಿವೃದ್ಧಿ',
    ta: 'பழங்குடியினர் வளர்ச்சி',
    ml: 'ആദിവാസി വികസനം',
  },
  'Livelihood & Economic': {
    en: 'Livelihood & Economic',
    te: 'జీవనోపాధి & ఆర్థికం',
    hi: 'आजीविका एवं आर्थिक',
    kn: 'ಜೀವನೋಪಾಯ ಮತ್ತು ಆರ್ಥಿಕ',
    ta: 'வாழ்வாதாரம் மற்றும் பொருளாதாரம்',
    ml: 'ഉപജീവനവും സാമ്പത്തികവും',
  },
  'Entrepreneurship & Finance': {
    en: 'Entrepreneurship & Finance',
    te: 'వ్యవస్థాపకత & ఆర్థిక సహాయం',
    hi: 'उद्यमिता एवं वित्त',
    kn: 'ಉದ್ಯಮಶೀಲತೆ ಮತ್ತು ಹಣಕಾಸು',
    ta: 'தொழில்முனைவு மற்றும் நிதி',
    ml: 'സംരംഭകത്വവും ധനകാര്യവും',
  },
};

export const UI_TERMS: Record<string, Record<Language, string>> = {
  income_limit: {
    en: 'Income Limit',
    te: 'ఆదాయ పరిమితి',
    hi: 'आय सीमा',
    kn: 'ಆದಾಯ ಮಿತಿ',
    ta: 'வருமான வரம்பு',
    ml: 'വരുമാന പരിധി',
  },
  no_income_bar: {
    en: 'No income bar',
    te: 'ఆదాయ పరిమితి లేదు',
    hi: 'कोई आय सीमा नहीं',
    kn: 'ಆದಾಯ ಮಿತಿ ಇಲ್ಲ',
    ta: 'வருமான வரம்பு இல்லை',
    ml: 'വരുമാന പരിധിയില്ല',
  },
  eligibility: {
    en: 'Eligibility',
    te: 'అర్హత',
    hi: 'पात्रता',
    kn: 'ಅರ್ಹತೆ',
    ta: 'தகுதி',
    ml: 'യോഗ്യത',
  },
  details: {
    en: 'Details',
    te: 'వివరాలు',
    hi: 'विवरण',
    kn: 'ವಿವರಗಳು',
    ta: 'விவரங்கள்',
    ml: 'വിശദാംശങ്ങൾ',
  },
  apply_now: {
    en: 'Apply on Portal',
    te: 'పోర్టల్‌లో దరఖాస్తు',
    hi: 'पोर्टल पर आवेदन करें',
    kn: 'ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    ta: 'விண்ணப்பிக்கவும்',
    ml: 'പോർട്ടലിൽ അപേക്ഷിക്കുക',
  },
  applied: {
    en: 'Applied',
    te: 'దరఖాస్తు చేశారు',
    hi: 'आवेदित',
    kn: 'ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗಿದೆ',
    ta: 'விண்ணப்பிக்கப்பட்டது',
    ml: 'അപേക്ഷിച്ചു',
  },
  implementing_body: {
    en: 'Implementing Body',
    te: 'అమలు చేసే విభాగం',
    hi: 'कार्यान्वयन निकाय',
    kn: 'ಅನುಷ್ಠಾನ ಸಂಸ್ಥೆ',
    ta: 'செயல்படுத்தும் அமைப்பு',
    ml: 'നടപ്പിലാക്കുന്ന ഏജൻസി',
  },
  target_group: {
    en: 'Target Beneficiaries',
    te: 'లబ్ధిదారులు',
    hi: 'लक्षित लाभार्थी',
    kn: 'ಫಲಾನುಭವಿಗಳು',
    ta: 'பயனாளிகள்',
    ml: 'ഗുണഭോക്താക്കൾ',
  },
  financial_assistance: {
    en: 'Financial Assistance',
    te: 'ఆర్థిక సహాయం',
    hi: 'वित्तीय सहायता',
    kn: 'ಹಣಕಾಸು ನೆರವು',
    ta: 'நிதி உதவி',
    ml: 'സാമ്പത്തിക സഹായം',
  },
  key_highlights: {
    en: 'Key Highlights',
    te: 'ముఖ్య ముఖ్యాంశాలు',
    hi: 'मुख्य विशेषताएं',
    kn: 'ಪ್ರಮುಖ ಮುಖ್ಯಾಂಶಗಳು',
    ta: 'முக்கிய சிறப்பம்சங்கள்',
    ml: 'പ്രധാന സവിശേഷതകൾ',
  },
  how_to_access: {
    en: 'How to Access',
    te: 'ఎలా దరఖాస్తు చేయాలి',
    hi: 'आवेदन कैसे करें',
    kn: 'ಹೇಗೆ ಪ್ರವೇಶಿಸುವುದು',
    ta: 'எவ்வாறு அணுகுவது',
    ml: 'എങ്ങനെ ലഭ്യമാക്കാം',
  },
  visit_official_portal: {
    en: 'Visit Official Portal',
    te: 'అధికారిక పోర్టల్‌ను సందర్శించండి',
    hi: 'आधिकारिक पोर्टल पर जाएं',
    kn: 'ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ',
    ta: 'அதிகாரப்பூர்வ இணையதளத்தைப் பார்வையிடவும்',
    ml: 'ഔദ്യോഗിക പോർട്ടൽ സന്ദർശിക്കുക',
  },
  programmes_title: {
    en: 'MoTA Programmes & Schemes',
    te: 'MoTA కార్యక్రమాలు & పథకాలు',
    hi: 'जनजातीय कार्य मंत्रालय के कार्यक्रम व योजनाएं',
    kn: 'MoTA ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಯೋಜನೆಗಳು',
    ta: 'MoTA திட்டங்கள் & கொள்கைகள்',
    ml: 'MoTA പദ്ധതികളും പരിപാടികളും',
  },
  programmes_sub: {
    en: '10 Government programmes across 7 categories',
    te: '7 వర్గాల్లో 10 ప్రభుత్వ కార్యక్రమాలు',
    hi: '7 श्रेणियों में 10 सरकारी कार्यक्रम',
    kn: '7 ವರ್ಗಗಳಲ್ಲಿ 10 ಸರ್ಕಾರಿ ಕಾರ್ಯಕ್ರಮಗಳು',
    ta: '7 பிரிவுகளில் 10 அரசு திட்டங்கள்',
    ml: '7 വിഭാഗങ്ങളിലായി 10 സർക്കാർ പദ്ധതികൾ',
  },
  programmes_disclaimer: {
    en: 'These are government programmes and livelihood missions. Only some allow direct online applications — check the route badge on each card.',
    te: 'ఇవి ప్రభుత్వ కార్యక్రమాలు మరియు జీవనోపాధి మిషన్లు. కొన్ని పథకాలకు మాత్రమే నేరుగా ఆన్‌లైన్ దరఖాస్తు ఉంటుంది — ప్రతి కార్డుపై ఉన్న రూట్ బ్యాడ్జ్ చూడండి.',
    hi: 'ये सरकारी कार्यक्रम और आजीविका मिशन हैं। केवल कुछ ही सीधे ऑनलाइन आवेदन की अनुमति देते हैं — कृपया कार्ड पर रूट बैज देखें।',
    kn: 'ಇವು ಸರ್ಕಾರಿ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಜೀವನೋಪಾಯ ಮಿಷನ್‌ಗಳು. ಕೆಲವು ಯೋಜನೆಗಳಿಗೆ ಮಾತ್ರ ನೇರ ಆನ್‌ಲೈನ್ ಅರ್ಜಿ ಲಭ್ಯವಿದೆ — ಕಾರ್ಡ್‌ನಲ್ಲಿ ಬ್ಯಾಡ್ಜ್ ನೋಡಿ.',
    ta: 'இவை அரசு நலத்திட்டங்கள் மற்றும் வாழ்வாதார திட்டங்கள். சில திட்டங்களுக்கு மட்டுமே நேரடி விண்ணப்பம் உண்டு — அட்டையில் உள்ள குறியீட்டைப் பார்க்கவும்.',
    ml: 'ഇവ സർക്കാർ പദ്ധതികളും ഉപജീവന മിഷനുകളുമാണ്. ചിലതിന് മാത്രമേ നേരിട്ട് അപേക്ഷിക്കാൻ സാധിക്കൂ — കാർഡിലെ വിവരങ്ങൾ ശ്രദ്ധിക്കുക.',
  },
  scholarships_title: {
    en: 'MoTA Scholarship Schemes',
    te: 'MoTA స్కాలర్‌షిప్ పథకాలు',
    hi: 'MoTA छात्रवृत्ति योजनाएं',
    kn: 'MoTA ವಿದ್ಯಾರ್ಥಿವೇತನ ಯೋಜನೆಗಳು',
    ta: 'MoTA கல்வி உதவித்தொகை திட்டங்கள்',
    ml: 'MoTA സ്കോളർഷിപ്പ് പദ്ധതികൾ',
  },
  scholarships_sub: {
    en: '15 Verified Schemes & Financial Support for ST Students',
    te: 'ఎస్టీ విద్యార్థుల కోసం 15 ధృవీకరించిన పథకాలు & ఆర్థిక సహాయం',
    hi: 'एसटी विद्यार्थियों हेतु 15 सत्यापित योजनाएं एवं वित्तीय सहायता',
    kn: 'ಎಸ್‌ಟಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗಾಗಿ 15 ಅಧಿಕೃತ ಯೋಜನೆಗಳು ಮತ್ತು ಹಣಕಾಸು ನೆರವು',
    ta: 'எஸ்டி மாணவர்களுக்கான 15 சரிபார்க்கப்பட்ட அரசு உதவித்தொகைகள்',
    ml: 'എസ്ടി വിദ്യാർത്ഥികൾക്കായി 15 സർക്കാർ സ്കോളർഷിപ്പുകൾ',
  },
};

// ── Localized Scheme Translations (Names, ShortNames, Descriptions) ──────────
const SCHEME_TRANSLATIONS: Record<string, Record<Language, { name: string; shortName: string; description: string }>> = {
  pre_matric: {
    en: {
      name: 'Pre-Matric Scholarship for ST Students',
      shortName: 'Pre-Matric',
      description: 'Financial assistance to Scheduled Tribe students studying in Classes IX and X to reduce dropout rates and encourage continuation of education.',
    },
    te: {
      name: 'ఎస్టీ విద్యార్థులకు ప్రీ-మెట్రిక్ స్కాలర్‌షిప్ (9-10 తరగతులు)',
      shortName: 'ప్రీ-మెట్రిక్',
      description: 'బడి మానేయడాన్ని అరికట్టడానికి 9 మరియు 10 తరగతులు చదువుతున్న ఎస్టీ విద్యార్థులకు భారత ప్రభుత్వం అందించే ఆర్థిక సహాయం.',
    },
    hi: {
      name: 'एसटी छात्रों के लिए प्री-मैट्रिक छात्रवृत्ति (कक्षा IX–X)',
      shortName: 'प्री-मैट्रिक',
      description: 'कक्षा 9 और 10 में अध्ययनरत अनुसूचित जनजाति के छात्रों को पढ़ाई जारी रखने और ड्रॉपआउट रोकने के लिए वित्तीय सहायता।',
    },
    kn: {
      name: 'ಎಸ್‌ಟಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಪ್ರೀ-ಮೆಟ್ರಿಕ್ ವಿದ್ಯಾರ್ಥಿವೇತನ',
      shortName: 'ಪ್ರೀ-ಮೆಟ್ರಿಕ್',
      description: '9 ಮತ್ತು 10ನೇ ತರಗತಿಯಲ್ಲಿ ಓದುತ್ತಿರುವ ಪರಿಶಿಷ್ಟ ಪಂಗಡದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಶಿಕ್ಷಣ ಮುಂದುವರಿಸಲು ಆರ್ಥಿಕ ನೆರವು.',
    },
    ta: {
      name: 'எஸ்டி மாணவர்களுக்கான பள்ளி படிப்பு உதவித்தொகை (9-10 வகுப்புகள்)',
      shortName: 'ப்ரீ-மெட்ரிக்',
      description: '9 மற்றும் 10 ஆம் வகுப்புகளில் பயிலும் பழங்குடியின மாணவர்கள் தொடர்ந்து படிக்க அரசு வழங்கும் நிதி உதவி.',
    },
    ml: {
      name: 'എസ്ടി വിദ്യാർത്ഥികൾക്കുള്ള പ്രീ-മെട്രിക് സ്കോളർഷിപ്പ്',
      shortName: 'പ്രീ-മെട്രിക്',
      description: '9, 10 ക്ലാസുകളിൽ പഠിക്കുന്ന പട്ടികവർഗ്ഗ വിദ്യാർത്ഥികൾക്ക് വിദ്യാഭ്യാസം തുടരുന്നതിനായി സാമ്പത്തിക സഹായം.',
    },
  },

  post_matric: {
    en: {
      name: 'Post-Matric Scholarship for ST Students',
      shortName: 'Post-Matric',
      description: 'Flagship scholarship scheme providing financial assistance to ST students studying at post-matriculation or post-secondary stages up to PhD.',
    },
    te: {
      name: 'ఎస్టీ విద్యార్థులకు పోస్ట్-మెట్రిక్ స్కాలర్‌షిప్ (11వ తరగతి నుండి పీహెచ్‌డీ)',
      shortName: 'పోస్ట్-మెట్రిక్',
      description: '11వ తరగతి, డిగ్రీ, పీజీ నుండి పీహెచ్‌డీ వరకు ఉన్నత విద్యను అభ్యసిస్తున్న ఎస్టీ విద్యార్థులకు ఉపకార వేతనం మరియు ఫీజు రీయింబర్స్‌మెంట్.',
    },
    hi: {
      name: 'एसटी छात्रों के लिए पोस्ट-मैट्रिक छात्रवृत्ति (कक्षा XI से पीएचडी)',
      shortName: 'पोस्ट-मैट्रिक',
      description: 'कक्षा 11वीं, स्नातक, स्नातकोत्तर से लेकर पीएचडी तक के एसटी छात्रों के लिए निर्वाह भत्ता और अनिवार्य शुल्क प्रतिपूर्ति।',
    },
    kn: {
      name: 'ಎಸ್‌ಟಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಪೋಸ್ಟ್-ಮೆಟ್ರಿಕ್ ವಿದ್ಯಾರ್ಥಿವೇತನ',
      shortName: 'ಪೋಸ್ಟ್-ಮೆಟ್ರಿಕ್',
      description: '11ನೇ ತರಗತಿ, ಪದವಿ ಮತ್ತು ಪಿಎಚ್‌ಡಿ ಹಂತದವರೆಗಿನ ಎಸ್‌ಟಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಪೂರ್ಣ ಶುಲ್ಕ ಮತ್ತು ಮಾಸಿಕ ಭತ್ಯೆ ನೀಡುವ ಯೋಜನೆ.',
    },
    ta: {
      name: 'எஸ்டி மாணவர்களுக்கான கல்லூரி படிப்பு உதவித்தொகை (11ம் வகுப்பு முதல் PhD வரை)',
      shortName: 'போஸ்ட்-மெட்ரிக்',
      description: '11-ஆம் வகுப்பு முதல் பிஎச்டி வரை உயர் கல்வி பயிலும் பழங்குடியின மாணவர்களுக்கான கட்டண சலுகை மற்றும் உதவித்தொகை.',
    },
    ml: {
      name: 'എസ്ടി വിദ്യാർത്ഥികൾക്കുള്ള പോസ്റ്റ്-മെട്രിക് സ്കോളർഷിപ്പ്',
      shortName: 'പോസ്റ്റ്-മെട്രിക്',
      description: '11-ാം ക്ലാസ് മുതൽ പിഎച്ച്.ഡി വരെയുള്ള ഉന്നത വിദ്യാഭ്യാസം നേടുന്ന പട്ടികവർഗ്ഗ വിദ്യാർത്ഥികൾക്കുള്ള സാമ്പത്തിക സഹായം.',
    },
  },

  top_class: {
    en: {
      name: 'National Scholarship Scheme for Higher Education (Top Class)',
      shortName: 'Top Class Education',
      description: '100% financial assistance for ST students admitted to 265 premier institutions across India including IITs, NITs, IIMs, AIIMS, and NLUs.',
    },
    te: {
      name: 'ఉన్నత విద్య కోసం జాతీయ స్కాలర్‌షిప్ (టాప్ క్లాస్ ఎడ్యుకేషన్)',
      shortName: 'టాప్ క్లాస్',
      description: 'ఐఐటీలు, ఎన్‌ఐటీలు, ఐఐఎంలు, ఎయిమ్స్ వంటి 265 ప్రతిష్టాత్మక విద్యాసంస్థల్లో ప్రవేశం పొందిన ఎస్టీ విద్యార్థులకు 100% పూర్తి ఫీజు మరియు ల్యాప్‌టాప్ గ్రాంట్.',
    },
    hi: {
      name: 'उच्च शिक्षा हेतु राष्ट्रीय छात्रवृत्ति (टॉप क्लास एजुकेशन)',
      shortName: 'टॉप क्लास',
      description: 'आईआईटी, आईआईएम, एम्स और एनएलयू जैसे 265 शीर्ष संस्थानों में नामांकित एसटी विद्यार्थियों को पूर्ण शिक्षण शुल्क, लैपटॉप और निर्वाह भत्ता।',
    },
    kn: {
      name: 'ಉನ್ನತ ಶಿಕ್ಷಣಕ್ಕಾಗಿ ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿವೇತನ (ಟಾಪ್ ಕ್ಲಾಸ್)',
      shortName: 'ಟಾಪ್ ಕ್ಲಾಸ್',
      description: 'ಐಐಟಿ, ಎನ್‌ಐಟಿ, ಐಐಎಂ ಮುಂತಾದ 265 ಪ್ರಮುಖ ಸಂಸ್ಥೆಗಳಲ್ಲಿ ವ್ಯಾಸಂಗ ಮಾಡುವ ಎಸ್‌ಟಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಪೂರ್ಣ ಉಚಿತ ಶಿಕ್ಷಣ ಮತ್ತು ಲ್ಯಾಪ್ಟಾಪ್.',
    },
    ta: {
      name: 'உயர்கல்விக்கான தேசிய உதவித்தொகை (டாப் கிளாஸ் கல்வி)',
      shortName: 'டாப் கிளாஸ்',
      description: 'ஐஐடி, என்ஐடி, ஐஐஎம், எய்ம்ஸ் போன்ற 265 முதன்மை கல்வி நிறுவனங்களில் பயிலும் பழங்குடியின மாணவர்களுக்கு முழு கட்டணம் மற்றும் மடிக்கணினி.',
    },
    ml: {
      name: 'ഉന്നത വിദ്യാഭ്യാസത്തിനായുള്ള ദേശീയ സ്കോളർഷിപ്പ് (ടോപ്പ് ക്ലാസ്സ്)',
      shortName: 'ടോപ്പ് ക്ലാസ്',
      description: 'ഐഐടി, എൻഐടി, ഐഐഎം, എയിംസ് തുടങ്ങിയ 265 പ്രമുഖ സ്ഥാപനങ്ങളിൽ പഠിക്കുന്ന എസ്ടി വിദ്യാർത്ഥികൾക്ക് പൂർണ്ണ ട്യൂഷൻ ഫീസും ലാപ്ടോപ്പും.',
    },
  },

  nfst: {
    en: {
      name: 'National Fellowship for Scheduled Tribe Students (NFST)',
      shortName: 'NFST Fellowship',
      description: 'Fellowship for ST students pursuing regular and full-time M.Phil and Ph.D. degrees in Science, Humanities, and Engineering.',
    },
    te: {
      name: 'ఎస్టీ పరిశోధక విద్యార్థులకు జాతీయ ఫెలోషిప్ (NFST)',
      shortName: 'NFST ఫెలోషిప్',
      description: 'విశ్వవిద్యాలయాల్లో పూర్తి సమయ ఎం.ఫిల్ మరియు పీహెచ్‌డీ పరిశోధనలు చేస్తున్న ఎస్టీ విద్యార్థులకు నెలకు ₹37,000–₹42,000 వరకు ఫెలోషిప్.',
    },
    hi: {
      name: 'एसटी छात्रों के लिए राष्ट्रीय फ़ेलोशिप (NFST)',
      shortName: 'NFST फ़ेलोशिप',
      description: 'एम.फिल और पीएचडी शोध कर रहे अनुसूचित जनजाति के शोधकर्ताओं हेतु ₹37,000 से ₹42,000 प्रति माह की प्रतिष्ठित सरकारी अध्येतावृत्ति।',
    },
    kn: {
      name: 'ಎಸ್‌ಟಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ರಾಷ್ಟ್ರೀಯ ಫೆಲೋಶಿಪ್ (NFST)',
      shortName: 'NFST ಫೆಲೋಶಿಪ್',
      description: 'ವಿಶ್ವವಿದ್ಯಾನಿಲಯಗಳಲ್ಲಿ ಎಂ.ಫಿಲ್ ಮತ್ತು ಪಿಎಚ್‌ಡಿ ಸಂಶೋಧನೆ ನಡೆಸುತ್ತಿರುವ ಎಸ್‌ಟಿ ಸಂಶೋಧಕರಿಗೆ ಮಾಸಿಕ ₹37,000–₹42,000 ಫೆಲೋಶಿಪ್.',
    },
    ta: {
      name: 'எஸ்டி மாணவர்களுக்கான தேசிய ஆய்வு உதவித்தொகை (NFST)',
      shortName: 'NFST பெல்லோஷிப்',
      description: 'பல்கலைக்கழகங்களில் முழுநேர எம்.பில் மற்றும் பிஎச்டி ஆராய்ச்சி மேற்கொள்ளும் எஸ்டி மாணவர்களுக்கான மாதாந்திர ஊக்கத்தொகை.',
    },
    ml: {
      name: 'എസ്ടി വിദ്യാർത്ഥികൾക്കുള്ള ദേശീയ ഫെലോഷിപ്പ് (NFST)',
      shortName: 'NFST ഫെലോഷിപ്പ്',
      description: 'എം.ഫിൽ, പിഎച്ച്.ഡി ഗവേഷണം നടത്തുന്ന പട്ടികവർഗ്ഗ വിദ്യാർത്ഥികൾക്ക് പ്രതിമാസം ₹37,000 മുതൽ ₹42,000 വരെ ഫെലോഷിപ്പ്.',
    },
  },

  nos: {
    en: {
      name: 'National Overseas Scholarship (NOS) for ST Students',
      shortName: 'National Overseas (NOS)',
      description: 'Supports meritorious ST scholars to pursue Master level courses, Ph.D., and Post-Doctoral research programmes abroad.',
    },
    te: {
      name: 'జాతీయ విదేశీ విద్యా స్కాలర్‌షిప్ (NOS)',
      shortName: 'NOS విదేశీ విద్య',
      description: 'ప్రపంచ ప్రఖ్యాత విదేశీ విశ్వవిద్యాలయాల్లో మాస్టర్స్, పీహెచ్‌డీ అభ్యసించే ఎస్టీ ప్రతిభావంతులకు విమాన ఖర్చులు, ట్యూషన్ ఫీజు మరియు జీవన భత్యం.',
    },
    hi: {
      name: 'एसटी छात्रों के लिए राष्ट्रीय विदेशी छात्रवृत्ति (NOS)',
      shortName: 'विदेशी छात्रवृत्ति (NOS)',
      description: 'विदेश के प्रतिष्ठित विश्वविद्यालयों से परास्नातक, पीएचडी व पोस्ट-डॉक्टरल शोध करने हेतु संपूर्ण ट्यूशन शुल्क, विमान किराया एवं निर्वाह व्यय।',
    },
    kn: {
      name: 'ರಾಷ್ಟ್ರೀಯ ವಿದೇಶಿ ವಿದ್ಯಾರ್ಥಿವೇತನ (NOS)',
      shortName: 'NOS ವಿದೇಶಿ ವ್ಯಾಸಂಗ',
      description: 'ವಿದೇಶಿ ವಿಶ್ವವಿದ್ಯಾಲಯಗಳಲ್ಲಿ ಸ್ನಾತಕೋತ್ತರ ಮತ್ತು ಪಿಎಚ್‌ಡಿ ವ್ಯಾಸಂಗ ಮಾಡಲು ವಿಮಾನ ಪ್ರಯಾಣ ವೆಚ್ಚ ಹಾಗೂ ಪೂರ್ಣ ಶುಲ್ಕ ನೀಡುವ ಯೋಜನೆ.',
    },
    ta: {
      name: 'தேசிய வெளிநாட்டு கல்வி உதவித்தொகை (NOS)',
      shortName: 'NOS வெளிநாட்டு கல்வி',
      description: 'வெளிநாட்டு பல்கலைக்கழகங்களில் முதுகலை மற்றும் பிஎச்டி பயில பழங்குடியின மாணவர்களுக்கு விமான கட்டணம் மற்றும் முழு செலவு.',
    },
    ml: {
      name: 'ദേശീയ വിദേശ സ്കോളർഷിപ്പ് (NOS)',
      shortName: 'NOS വിദേശ പഠനം',
      description: 'വിദേശ സർവ്വകലാശാലകളിൽ മാസ്റ്റേഴ്സ്, പിഎച്ച്.ഡി എന്നിവ പഠിക്കുന്നതിന് വിമാനച്ചെലവും മുഴുവൻ ഫീസും നൽകുന്ന പദ്ധതി.',
    },
  },

  emrs: {
    en: {
      name: 'Eklavya Model Residential Schools (EMRS)',
      shortName: 'EMRS Schools',
      description: 'Free quality CBSE residential schooling for ST students from Class VI to XII with 100% free boarding, lodging, books, and competitive exam coaching.',
    },
    te: {
      name: 'ఏకలవ్య మోడల్ రెసిడెన్షియల్ పాఠశాలలు (EMRS)',
      shortName: 'ఏకలవ్య పాఠశాలలు',
      description: '6 నుండి 12వ తరగతి వరకు ఎస్టీ విద్యార్థులకు ఉచిత సీబీఎస్‌ఈ విద్య, హాస్టల్ వసతి, భోజనం మరియు నీట్/జేఈఈ ప్రవేశ పరీక్షల శిక్షణ.',
    },
    hi: {
      name: 'एकलव्य आदर्श आवासीय विद्यालय (EMRS)',
      shortName: 'एकलव्य विद्यालय',
      description: 'कक्षा 6 से 12 तक के जनजातीय विद्यार्थियों के लिए 100% निःशुल्क सीबीएसई आवासीय शिक्षा, आवास, भोजन व जेईई/नीट कोचिंग।',
    },
    kn: {
      name: 'ಏಕಲವ್ಯ ಮಾದರಿ ವಸತಿ ಶಾಲೆಗಳು (EMRS)',
      shortName: 'ಏಕಲವ್ಯ ಶಾಲೆಗಳು',
      description: '6 ರಿಂದ 12ನೇ ತರಗತಿಯ ಎಸ್‌ಟಿ ಮಕ್ಕಳಿಗೆ ಉಚಿತ ಸಿಬಿಎಸ್‌ಇ ವಸತಿ ಶಿಕ್ಷಣ, ಊಟ, ವಸತಿ ಮತ್ತು ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷಾ ತರಬೇತಿ.',
    },
    ta: {
      name: 'ஏகலைவா மாதிரி குடியிருப்பு பள்ளிகள் (EMRS)',
      shortName: 'ஏகலைவா பள்ளிகள்',
      description: '6 முதல் 12 ஆம் வகுப்பு வரை பழங்குடியின மாணவர்களுக்கு இலவச சிபிஎஸ்இ கல்வி, உறைவிடம், உணவு மற்றும் பயிற்சி.',
    },
    ml: {
      name: 'ഏകലവ്യ മോഡൽ റസിഡൻഷ്യൽ സ്കൂളുകൾ (EMRS)',
      shortName: 'ഏകലവ്യ സ്കൂളുകൾ',
      description: '6 മുതൽ 12 വരെ ക്ലാസുകളിലെ എസ്ടി കുട്ടികൾക്ക് സൗജന്യ സിബിഎസ്ഇ റസിഡൻഷ്യൽ വിദ്യാഭ്യാസം, ഭക്ഷണം, താമസം എന്നിവ നൽകുന്നു.',
    },
  },

  goal_program: {
    en: {
      name: 'GOAL — Going Online as Leaders',
      shortName: 'GOAL Mentorship',
      description: 'Digital mentorship and entrepreneurship leadership program by MoTA and Meta (Facebook) for tribal youth.',
    },
    te: {
      name: 'గోల్ (GOAL) — డిజిటల్ నాయకత్వ శిక్షణ',
      shortName: 'GOAL మెంటార్‌షిప్',
      description: 'గిరిజన యువత కోసం MoTA మరియు మెటా (ఫేస్‌బుక్) భాగస్వామ్యంతో డిజిటల్ నైపుణ్యాలు మరియు నాయకత్వ మెంటార్‌షిప్ కార్యక్రమం.',
    },
    hi: {
      name: 'गोल (GOAL) — गोइंग ऑनलाइन एज़ लीडर्स',
      shortName: 'GOAL मेंटरशिप',
      description: 'जनजातीय कार्य मंत्रालय एवं मेटा (फेसबुक) द्वारा जनजातीय युवाओं को डिजिटल कौशल एवं नेतृत्व मेंटरशिप प्रदान करने वाला कार्यक्रम।',
    },
    kn: {
      name: 'ಗೋಲ್ (GOAL) — ಡಿಜಿಟಲ್ ನಾಯಕತ್ವ ತರಬೇತಿ',
      shortName: 'GOAL ಮೆಂಟರ್‌ಶಿಪ್',
      description: 'ಬುಡಕಟ್ಟು ಯುವಜನರಿಗೆ ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯ ಮತ್ತು ಉದ್ಯಮಶೀಲತೆ ತರಬೇತಿ ನೀಡುವ ಕಾರ್ಯಕ್ರಮ.',
    },
    ta: {
      name: 'கோல் (GOAL) — இணையவழி தலைமைத்துவ பயிற்சி',
      shortName: 'GOAL பயிற்சி',
      description: 'பழங்குடியின இளைஞர்களுக்கான டிஜிட்டல் திறன் மற்றும் தொழில்முனைவோர் பயிற்சி திட்டம்.',
    },
    ml: {
      name: 'ഗോൾ (GOAL) — ഡിജിറ്റൽ ലീഡർഷിപ്പ് പ്രോഗ്രാം',
      shortName: 'GOAL മെന്റർഷിപ്പ്',
      description: 'ആദിവാസി യുവാക്കൾക്കായി ഡിജിറ്റൽ കഴിവുകളും നേതൃത്വ പരിശീലനവും നൽകുന്ന സംരംഭം.',
    },
  },

  asry_loan: {
    en: {
      name: 'Adivasi Shiksha Rinn Yojana (ASRY)',
      shortName: 'ASRY Education Loan',
      description: 'Concessional education loan scheme up to ₹10 Lakh at 6% p.a. interest (4.5% for women) for professional/technical higher education.',
    },
    te: {
      name: 'ఆదివాసీ విద్యా రుణ పథకం (ASRY)',
      shortName: 'ASRY విద్యా రుణం',
      description: 'వృత్తి విద్యా కోర్సులు చదివే ఎస్టీ విద్యార్థులకు ₹10 లక్షల వరకు కేవలం 6% వడ్డీతో (మహిళలకు 4.5%) రాయితీ విద్యా రుణం.',
    },
    hi: {
      name: 'आदिवासी शिक्षा ऋण योजना (ASRY)',
      shortName: 'ASRY शिक्षा ऋण',
      description: 'व्यावसायिक एवं तकनीकी उच्च शिक्षा हेतु ₹10 लाख तक का रियायती शिक्षा ऋण मात्र 6% ब्याज दर पर (छात्राओं हेतु 4.5%)।',
    },
    kn: {
      name: 'ಆದಿವಾಸಿ ಶಿಕ್ಷಣ ಸಾಲ ಯೋಜನೆ (ASRY)',
      shortName: 'ASRY ಶಿಕ್ಷಣ ಸಾಲ',
      description: 'ವೃತ್ತಿಪರ ಶಿಕ್ಷಣಕ್ಕಾಗಿ ₹10 ಲಕ್ಷದವರೆಗೆ ರಿಯಾಯಿತಿ ಬಡ್ಡಿದರದಲ್ಲಿ (ಮಹಿಳೆಯರಿಗೆ 4.5%) ದೊರೆಯುವ ಸಾಲ.',
    },
    ta: {
      name: 'ஆதிவாசி கல்வி கடன் திட்டம் (ASRY)',
      shortName: 'ASRY கல்வி கடன்',
      description: 'தொழில்முறை உயர்கல்வி பயில ₹10 லட்சம் வரை 6% குறைந்த வட்டியில் (பெண்களுக்கு 4.5%) வழங்கப்படும் கல்வி கடன்.',
    },
    ml: {
      name: 'ആദിവാസി വിദ്യാഭ്യാസ വായ്പാ പദ്ധതി (ASRY)',
      shortName: 'ASRY വിദ്യാഭ്യാസ വായ്പ',
      description: 'പ്രൊഫഷണൽ കോഴ്സുകൾ പഠിക്കുന്നതിന് ₹10 ലക്ഷം വരെ കുറഞ്ഞ പലിശ നിരക്കിൽ നൽകുന്ന വായ്പ.',
    },
  },

  amsy_scheme: {
    en: {
      name: 'Adivasi Mahila Sashaktikaran Yojana (AMSY)',
      shortName: 'AMSY Women Scheme',
      description: 'Concessional micro-credit scheme exclusively for Scheduled Tribe women entrepreneurs up to ₹2 Lakh at 4% p.a. interest.',
    },
    te: {
      name: 'ఆదివాసీ మహిళా సాధికారత పథకం (AMSY)',
      shortName: 'AMSY మహిళా రుణం',
      description: 'ఎస్టీ మహిళా వ్యాపారవేత్తల కోసం ₹2 లక్షల వరకు కేవలం 4% వడ్డీతో అందించే ప్రత్యేక మైక్రో-క్రెడిట్ పథకం.',
    },
    hi: {
      name: 'आदिवासी महिला सशक्तिकरण योजना (AMSY)',
      shortName: 'AMSY महिला योजना',
      description: 'अनुसूचित जनजाति की महिला उद्यमियों हेतु ₹2 लाख तक का रियायती सूक्ष्म ऋण मात्र 4% वार्षिक ब्याज दर पर।',
    },
    kn: {
      name: 'ಆದಿವಾಸಿ ಮಹಿಳಾ ಸಬಲೀಕರಣ ಯೋಜನೆ (AMSY)',
      shortName: 'AMSY ಮಹಿಳಾ ಸಾಲ',
      description: 'ಎಸ್‌ಟಿ ಮಹಿಳಾ ಉದ್ಯಮಿಗಳಿಗೆ ಕೇವಲ 4% ಬಡ್ಡಿದರದಲ್ಲಿ ₹2 ಲಕ್ಷದವರೆಗೆ ಕಿರು ಸಾಲ ನೀಡುವ ಯೋಜನೆ.',
    },
    ta: {
      name: 'ஆதிவாசி மகளிர் அதிகாரமளித்தல் திட்டம் (AMSY)',
      shortName: 'AMSY மகளிர் திட்டம்',
      description: 'பழங்குடியின பெண் தொழில்முனைவோருக்கு ₹2 லட்சம் வரை வெறும் 4% வட்டியில் வழங்கப்படும் குறுங்கடன்.',
    },
    ml: {
      name: 'ആദിവാസി വനിതാ ശാക്തീകരണ പദ്ധതി (AMSY)',
      shortName: 'AMSY വനിതാ വായ്പ',
      description: 'എസ്ടി വനിതാ സംരംഭകർക്കായി 4% പലിശ നിരക്കിൽ ₹2 ലക്ഷം വരെ നൽകുന്ന വായ്പ.',
    },
  },

  nstfdc_term_loan: {
    en: {
      name: 'NSTFDC Term Loan Scheme for ST Entrepreneurs',
      shortName: 'NSTFDC Term Loan',
      description: 'Term loans up to ₹50 Lakh (up to 90% of project cost) at concessional 6% to 8% interest for ST industrial, agricultural and service ventures.',
    },
    te: {
      name: 'ఎస్టీ వ్యాపారవేత్తల కోసం NSTFDC టర్మ్ లోన్ పథకం',
      shortName: 'NSTFDC టర్మ్ లోన్',
      description: 'పరిశ్రమలు, వ్యవసాయం మరియు సేవా రంగాల్లో ప్రాజెక్టులకు ₹50 లక్షల వరకు (90% ప్రాజెక్ట్ ఖర్చు) రాయితీ వడ్డీతో అందించే వ్యాపార రుణం.',
    },
    hi: {
      name: 'एसटी उद्यमियों हेतु एनएसटीएफडीसी मियादी ऋण योजना',
      shortName: 'एनएसटीएफडीसी टर्म लोन',
      description: 'कृषि, सेवा और औद्योगिक उद्यमों हेतु ₹50 लाख तक (परियोजना लागत का 90% तक) रियायती ब्याज दर पर ऋण।',
    },
    kn: {
      name: 'ಎಸ್‌ಟಿ ಉದ್ಯಮಿಗಳಿಗಾಗಿ ಎನ್‌ಎಸ್‌ಟಿಎಫ್‌ಡಿಸಿ ಟರ್ಮ್ ಸಾಲ ಯೋಜನೆ',
      shortName: 'ಎನ್‌ಎಸ್‌ಟಿಎಫ್‌ಡಿಸಿ ಸಾಲ',
      description: 'ಉದ್ಯಮ, ಕೃಷಿ ಮತ್ತು ಸೇವಾ ವಲಯದ ಯೋಜನೆಗಳಿಗಾಗಿ ₹50 ಲಕ್ಷದವರೆಗೆ ರಿಯಾಯಿತಿ ದರದ ಸಾಲ.',
    },
    ta: {
      name: 'எஸ்டி தொழில்முனைவோருக்கான NSTFDC கடன் திட்டம்',
      shortName: 'NSTFDC வணிக கடன்',
      description: 'பழங்குடியின தொழில்முனைவோர் தொழில் தொடங்க ₹50 லட்சம் வரை குறைந்த வட்டியில் வழங்கப்படும் கடன்.',
    },
    ml: {
      name: 'എസ്ടി സംരംഭകർക്കായുള്ള NSTFDC ടേം ലോൺ പദ്ധതി',
      shortName: 'NSTFDC ടേം ലോൺ',
      description: 'വ്യവസായ, കാർഷിക സംരംഭങ്ങൾക്കായി ₹50 ലക്ഷം വരെ കുറഞ്ഞ പലിശയിൽ നൽകുന്ന ബിസിനസ് വായ്പ.',
    },
  },

  vcf_st: {
    en: {
      name: 'Venture Capital Fund for Scheduled Tribes (VCF-ST)',
      shortName: 'VCF-ST Venture Fund',
      description: 'First-of-its-kind dedicated equity/debt funding from ₹20 Lakh up to ₹5 Crore for innovative Scheduled Tribe startup founders.',
    },
    te: {
      name: 'షెడ్యూల్డ్ తెగల వెంచర్ క్యాపిటల్ ఫండ్ (VCF-ST)',
      shortName: 'VCF-ST వెంచర్ ఫండ్',
      description: 'ఎస్టీ స్టార్టప్ వ్యవస్థాపకులు మరియు ఆవిష్కర్తల కోసం ₹20 లక్షల నుండి ₹5 కోట్ల వరకు వెంచర్ క్యాపిటల్ నిధులు.',
    },
    hi: {
      name: 'अनुसूचित जनजाति वेंचर कैपिटल फंड (VCF-ST)',
      shortName: 'VCF-ST वेंचर फंड',
      description: 'एसटी स्टार्टअप संस्थापकों एवं नवाचारियों के लिए ₹20 लाख से ₹5 करोड़ तक का समर्पित वेंचर कैपिटल इक्विटी एवं ऋण वित्तपोषण।',
    },
    kn: {
      name: 'ಪರಿಶಿಷ್ಟ ಪಂಗಡದ ಸಾಹಸೋದ್ಯಮ ಬಂಡವಾಳ ನಿಧಿ (VCF-ST)',
      shortName: 'VCF-ST ವೆಂಚರ್ ಫಂಡ್',
      description: 'ನವೋದ್ಯಮ ಆರಂಭಿಸುವ ಎಸ್‌ಟಿ ಉದ್ಯಮಿಗಳಿಗಾಗಿ ₹20 ಲಕ್ಷದಿಂದ ₹5 ಕೋಟಿಯವರೆಗೆ ಸಾಹಸೋದ್ಯಮ ಬಂಡವಾಳ ಬೆಂಬಲ.',
    },
    ta: {
      name: 'பழங்குடியினருக்கான துணிகர மூலதன நிதி (VCF-ST)',
      shortName: 'VCF-ST மூலதன நிதி',
      description: 'பழங்குடியின ஸ்டார்ட்அப் நிறுவனர்களுக்கு ₹20 லட்சம் முதல் ₹5 கோடி வரை முதலீடு மற்றும் நிதி உதவி.',
    },
    ml: {
      name: 'പട്ടികവർഗ്ഗ വെഞ്ച്വർ ക്യാപിറ്റൽ ഫണ്ട് (VCF-ST)',
      shortName: 'VCF-ST വെഞ്ച്വർ ഫണ്ട്',
      description: 'എസ്ടി സ്റ്റാർട്ടപ്പുകൾക്ക് ₹20 ലക്ഷം മുതൽ ₹5 കോടി വരെ ലഭ്യമാക്കുന്ന വെഞ്ച്വർ ക്യാപിറ്റൽ ഫണ്ട്.',
    },
  },

  pm_janman_hostels: {
    en: {
      name: 'PM-JANMAN Tribal Hostel & PVTG Education Scheme',
      shortName: 'PM-JANMAN Hostels',
      description: '100% free residential facilities, bilingual tutoring and bridge schools across 75 Particularly Vulnerable Tribal Groups (PVTGs).',
    },
    te: {
      name: 'పీఎం-జన్‌మన్ గిరిజన హాస్టళ్లు & పీవీటీజీ విద్యా పథకం',
      shortName: 'పీఎం-జన్‌మన్ హాస్టళ్లు',
      description: '75 ప్రత్యేక బలహీన గిరిజన సమూహాల (PVTG) పిల్లల కోసం 100% ఉచిత హాస్టల్ వసతి, పౌష్టికాహారం మరియు వంతెన విద్య.',
    },
    hi: {
      name: 'पीएम-जनमन जनजातीय छात्रावास एवं पीवीटीजी शिक्षा योजना',
      shortName: 'पीएम-जनमन छात्रावास',
      description: '75 विशेष रूप से कमज़ोर जनजातीय समूहों (PVTG) के विद्यार्थियों हेतु 100% निःशुल्क छात्रावास, पोषण किट एवं द्विभाषी शिक्षण।',
    },
    kn: {
      name: 'ಪಿಎಂ-ಜನ್‌ಮನ್ ಬುಡಕಟ್ಟು ಹಾಸ್ಟೆಲ್ ಮತ್ತು ಪಿವಿಟಿಜಿ ಶಿಕ್ಷಣ ಯೋಜನೆ',
      shortName: 'ಪಿಎಂ-ಜನ್‌ಮನ್ ಹಾಸ್ಟೆಲ್',
      description: '75 ಪಿವಿಟಿಜಿ ಸಮುದಾಯಗಳ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಉಚಿತ ವಸತಿ ಶಾಲೆಗಳು, ಪೌಷ್ಟಿಕ ಆಹಾರ ಮತ್ತು ಸೇತುವೆ ಶಿಕ್ಷಣ.',
    },
    ta: {
      name: 'பிஎம்-ஜன்மன் பழங்குடியினர் விடுதி மற்றும் கல்வி திட்டம்',
      shortName: 'பிஎம்-ஜன்மன் விடுதிகள்',
      description: '75 நலிவடைந்த பழங்குடியின (PVTG) மாணவர்களுக்கான இலவச விடுதி வசதிகள் மற்றும் கல்வி உதவி.',
    },
    ml: {
      name: 'പിഎം-ജൻമൻ ആദിവാസി ഹോസ്റ്റൽ & പിവിടിജി വിദ്യാഭ്യാസ പദ്ധതി',
      shortName: 'പിഎം-ജൻമൻ ഹോസ്റ്റലുകൾ',
      description: '75 ദുർബല ഗോത്രവിഭാഗങ്ങളിലെ (PVTG) കുട്ടികൾക്കായി സൗജന്യ ഹോസ്റ്റൽ സൗകര്യങ്ങളും വിദ്യാഭ്യാസ പിന്തുണയും.',
    },
  },

  tfdes_scheme: {
    en: {
      name: 'Tribal Forest Dwellers Empowerment Scheme (TFDES)',
      shortName: 'TFDES Forest Dwellers',
      description: 'Concessional loans up to ₹1 Lakh at 6% p.a. for FRA Patta title holders for agriculture, minor forest produce processing, and solar pumps.',
    },
    te: {
      name: 'అటవీ నివాస గిరిజనుల సాధికారత పథకం (TFDES)',
      shortName: 'TFDES అటవీ నివాసులు',
      description: 'అటవీ హక్కుల పట్టా పొందిన గిరిజనులకు వ్యవసాయం, అటవీ ఉత్పత్తుల ప్రాసెసింగ్ మరియు సోలార్ పంపుల కోసం ₹1 లక్ష వరకు 6% వడ్డీతో రుణాలు.',
    },
    hi: {
      name: 'जनजातीय वनवासी अधिकारिता योजना (TFDES)',
      shortName: 'TFDES वनवासी योजना',
      description: 'वन अधिकार पट्टा धारकों को कृषि, लघु वनोपज प्रसंस्करण एवं सौर पंपों हेतु ₹1 लाख तक 6% वार्षिक ब्याज पर रियायती ऋण।',
    },
    kn: {
      name: 'ಬುಡಕಟ್ಟು ಅರಣ್ಯವಾಸಿಗಳ ಸಬಲೀಕರಣ ಯೋಜನೆ (TFDES)',
      shortName: 'TFDES ಅರಣ್ಯವಾಸಿಗಳು',
      description: 'ಅರಣ್ಯ ಹಕ್ಕು ಪಟ್ಟಾ ಹೊಂದಿರುವವರಿಗೆ ಕೃಷಿ ಮತ್ತು ಸೌರ ಪಂಪ್‌ಗಳಿಗಾಗಿ ₹1 ಲಕ್ಷದವರೆಗೆ ರಿಯಾಯಿತಿ ಸಾಲ.',
    },
    ta: {
      name: 'பழங்குடியின வனவாசிகள் அதிகாரமளித்தல் திட்டம் (TFDES)',
      shortName: 'TFDES வனவாசிகள்',
      description: 'வன உரிமை பட்டா பெற்ற பழங்குடியினருக்கு விவசாயம் மற்றும் சோலார் பம்புகளுக்கு ₹1 லட்சம் வரை கடனுதவி.',
    },
    ml: {
      name: 'ആദിവാസി വനവാസി ശാക്തീകരണ പദ്ധതി (TFDES)',
      shortName: 'TFDES വനവാസി വായ്പ',
      description: 'വനവകാശ പട്ടയ ഉടമകൾക്ക് കാർഷികാവശ്യങ്ങൾക്കായി 6% പലിശയിൽ ₹1 ലക്ഷം വരെ വായ്പ.',
    },
  },

  micro_credit_st: {
    en: {
      name: 'Micro Credit Scheme for ST Self Help Groups (SHGs)',
      shortName: 'ST SHG Micro Credit',
      description: 'Direct micro-finance credit up to ₹50,000 per member and ₹5 Lakh per SHG at 6% p.a. to promote rural tribal enterprise.',
    },
    te: {
      name: 'ఎస్టీ స్వయం సహాయక సంఘాల మైక్రో క్రెడిట్ పథకం',
      shortName: 'ఎస్టీ సంఘాల మైక్రో క్రెడిట్',
      description: 'ఎస్టీ మహిళా గ్రూపులకు ఒక్కో సభ్యురాలికి ₹50,000, గ్రూపునకు ₹5 లక్షల వరకు 6% వడ్డీతో అందించే చిన్న తరహా వ్యాపార రుణాలు.',
    },
    hi: {
      name: 'एसटी स्वयं सहायता समूहों हेतु सूक्ष्म ऋण योजना',
      shortName: 'एसटी एसएचजी ऋण',
      description: 'जनजातीय स्व-सहायता समूहों के सदस्यों को ₹50,000 प्रति सदस्य और ₹5 लाख प्रति समूह तक 6% वार्षिक दर पर सूक्ष्म ऋण।',
    },
    kn: {
      name: 'ಎಸ್‌ಟಿ ಸ್ವಸಹಾಯ ಸಂಘಗಳ ಕಿರು ಸಾಲ ಯೋಜನೆ',
      shortName: 'ಎಸ್‌ಟಿ ಸಂಘಗಳ ಕಿರು ಸಾಲ',
      description: 'ಗ್ರಾಮೀಣ ಎಸ್‌ಟಿ ಮಹಿಳಾ ಸ್ವಸಹಾಯ ಸಂಘಗಳ ಸಬಲೀಕರಣಕ್ಕಾಗಿ ರಿಯಾಯಿತಿ ಬಡ್ಡಿದರದ ಕಿರು ಸಾಲ.',
    },
    ta: {
      name: 'எஸ்டி சுயஉதவிக் குழுக்களுக்கான குறுங்கடன் திட்டம்',
      shortName: 'எஸ்டி குழு குறுங்கடன்',
      description: 'பழங்குடியின சுயஉதவிக் குழுக்களுக்கு உறுப்பினருக்கு ₹50,000 மற்றும் குழுவுக்கு ₹5 லட்சம் வரை குறுங்கடன்.',
    },
    ml: {
      name: 'എസ്ടി സ്വയംസഹായ സംഘങ്ങൾക്കുള്ള മൈക്രോ ക്രെഡിറ്റ് പദ്ധതി',
      shortName: 'എസ്ടി ഗ്രൂപ്പ് വായ്പ',
      description: 'എസ്ടി വനിതാ സ്വയംസഹായ സംഘങ്ങൾക്ക് കുറഞ്ഞ പലിശയിൽ ലഭിക്കുന്ന മൈക്രോ ഫിനാൻസ് വായ്പ.',
    },
  },

  pmvky_fellowship: {
    en: {
      name: 'PM Vanbandhu Kalyan Yojana / TRI Research Fellowships',
      shortName: 'PMVKY Fellowships',
      description: 'National research fellowships for ST scholars engaged in documentation of indigenous knowledge, tribal languages, and tribal culture preservation.',
    },
    te: {
      name: 'పీఎం వన్‌బంధు కల్యాణ్ యోజన / పరిశోధనా ఫెలోషిప్‌లు',
      shortName: 'పీఎంవీకేవై ఫెలోషిప్',
      description: 'గిరిజన సంస్కృతి, భాషలు మరియు దేశీయ జ్ఞాన వ్యవస్థల పరిరక్షణపై పరిశోధనలు చేసే ఎస్టీ పీహెచ్‌డీ స్కాలర్లకు నెలవారీ ఫెలోషిప్ మరియు గ్రాంట్.',
    },
    hi: {
      name: 'पीएम वनबंधु कल्याण योजना / टीआरआई शोध फ़ेलोशिप',
      shortName: 'पीएमवीकेवाई फ़ेलोशिप',
      description: 'जनजातीय संस्कृति, भाषाओं व स्वदेशी ज्ञान प्रणालियों के संरक्षण एवं शोध में संलग्न शोधार्थियों हेतु विशेष राष्ट्रीय फ़ेलोशिप।',
    },
    kn: {
      name: 'ಪಿಎಂ ವನಬಂಧು ಕಲ್ಯಾಣ ಯೋಜನೆ / ಸಂಶೋಧನಾ ಫೆಲೋಶಿಪ್‌ಗಳು',
      shortName: 'ಪಿಎಂವಿಕೆವೈ ಫೆಲೋಶಿಪ್',
      description: 'ಬುಡಕಟ್ಟು ಸಂಸ್ಕೃತಿ ಮತ್ತು ಭಾಷೆಗಳ ಸಂರಕ್ಷಣೆ ಸಂಶೋಧನೆಗಾಗಿ ನೀಡಲಾಗುವ ವಿಶೇಷ ಫೆಲೋಶಿಪ್.',
    },
    ta: {
      name: 'பிஎம் வன்பந்து கல்யாண் யோஜனா / ஆய்வு உதவித்தொகை',
      shortName: 'PMVKY உதவித்தொகை',
      description: 'பழங்குடியின கலாச்சாரம் மற்றும் மொழிகள் குறித்த ஆராய்ச்சியில் ஈடுபடும் ஆய்வாளர்களுக்கான தேசிய உதவித்தொகை.',
    },
    ml: {
      name: 'പിഎം വൻബന്ധു കല്യാൺ യോജന / ഗവേഷണ ഫെലോഷിപ്പുകൾ',
      shortName: 'PMVKY ഫെലോഷിപ്പ്',
      description: 'ഗോത്ര സംസ്കാരവും ഭാഷകളും സംരക്ഷിക്കുന്നതിനുള്ള ഗവേഷണത്തിൽ ഏർപ്പെട്ടിരിക്കുന്നവർക്കുള്ള ഫെലോഷിപ്പ്.',
    },
  },
};

// ── Localized Programme Translations ─────────────────────────────────────────
const PROGRAMME_TRANSLATIONS: Record<string, Record<Language, { title: string; subtitle: string; description: string; targetGroup: string; financialAid: string }>> = {
  emrs: {
    en: {
      title: 'Eklavya Model Residential Schools (EMRS)',
      subtitle: 'Free CBSE Residential Schooling for ST Students (Class VI to XII)',
      description: 'Flagship intervention providing quality middle and high-level education to ST students in remote areas, with 100% free boarding, lodging, books, and uniforms.',
      targetGroup: 'ST students in Classes VI–XII residing in tribal/remote areas',
      financialAid: '100% free schooling, boarding, lodging, coaching, uniforms & books',
    },
    te: {
      title: 'ఏకలవ్య మోడల్ రెసిడెన్షియల్ పాఠశాలలు (EMRS)',
      subtitle: 'ఎస్టీ విద్యార్థులకు ఉచిత సీబీఎస్‌ఈ రెసిడెన్షియల్ విద్య (6 నుండి 12వ తరగతి)',
      description: 'మారుమూల గిరిజన ప్రాంతాల్లోని విద్యార్థులకు ఉచిత నాణ్యమైన విద్య, వసతి, భోజనం మరియు జేఈఈ/నీట్ శిక్షణ అందించే ప్రతిష్టాత్మక పథకం.',
      targetGroup: 'గిరిజన ప్రాంతాల 6–12వ తరగతి ఎస్టీ విద్యార్థులు',
      financialAid: '100% ఉచిత విద్య, హాస్టల్, భోజనం, పుస్తకాలు మరియు కోచింగ్',
    },
    hi: {
      title: 'एकलव्य आदर्श आवासीय विद्यालय (EMRS)',
      subtitle: 'एसटी विद्यार्थियों हेतु निःशुल्क सीबीएसई आवासीय शिक्षा (कक्षा VI से XII)',
      description: 'दूरदराज के जनजातीय क्षेत्रों के विद्यार्थियों को 100% निःशुल्क गुणवत्तापूर्ण शिक्षा, आवास, भोजन और प्रतियोगी परीक्षाओं की कोचिंग।',
      targetGroup: 'जनजातीय क्षेत्रों के कक्षा 6-12 के एसटी छात्र',
      financialAid: '100% निःशुल्क शिक्षा, भोजन, आवास, वर्दी व पुस्तकें',
    },
    kn: {
      title: 'ಏಕಲವ್ಯ ಮಾದರಿ ವಸತಿ ಶಾಲೆಗಳು (EMRS)',
      subtitle: 'ಎಸ್‌ಟಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಉಚಿತ ಸಿಬಿಎಸ್‌ಇ ವಸತಿ ಶಾಲೆ (6 ರಿಂದ 12ನೇ ತರಗತಿ)',
      description: 'ಬುಡಕಟ್ಟು ಪ್ರದೇಶದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಉಚಿತ ಗುಣಮಟ್ಟದ ಶಿಕ್ಷಣ, ಊಟ, ವಸತಿ ಮತ್ತು ಪ್ರವೇಶ ಪರೀಕ್ಷಾ ತರಬೇತಿ ನೀಡುವ ಯೋಜನೆ.',
      targetGroup: 'ಬುಡಕಟ್ಟು ಪ್ರದೇಶಗಳ 6–12ನೇ ತರಗತಿಯ ಎಸ್‌ಟಿ ವಿದ್ಯಾರ್ಥಿಗಳು',
      financialAid: '100% ಉಚಿತ ಶಿಕ್ಷಣ, ಹಾಸ್ಟೆಲ್, ಊಟ, ಸಮವಸ್ತ್ರ ಮತ್ತು ಪುಸ್ತಕಗಳು',
    },
    ta: {
      title: 'ஏகலைவா மாதிரி குடியிருப்பு பள்ளிகள் (EMRS)',
      subtitle: 'எஸ்டி மாணவர்களுக்கு இலவச சிபிஎஸ்இ குடியிருப்பு கல்வி (6 முதல் 12 ஆம் வகுப்பு)',
      description: 'தொலைதூர பழங்குடியின பகுதிகளில் உள்ள மாணவர்களுக்கு இலவச தரமான கல்வி, தங்குமிடம் மற்றும் உணவு வழங்கும் திட்டம்.',
      targetGroup: 'பழங்குடியின பகுதிகளில் உள்ள 6–12 ஆம் வகுப்பு மாணவர்கள்',
      financialAid: '100% இலவச கல்வி, தங்குமிடம், உணவு, சீருடைகள் மற்றும் புத்தகங்கள்',
    },
    ml: {
      title: 'ഏകലവ്യ മോഡൽ റസിഡൻഷ്യൽ സ്കൂളുകൾ (EMRS)',
      subtitle: 'എസ്ടി വിദ്യാർത്ഥികൾക്ക് സൗജന്യ സിബിഎസ്ഇ വിദ്യാഭ്യാസം (ക്ലാസ് 6 മുതൽ 12 വരെ)',
      description: 'വിദൂര ആദിവാസി മേഖലകളിലെ കുട്ടികൾക്ക് സൗജന്യ റസിഡൻഷ്യൽ വിദ്യാഭ്യാസവും ഭക്ഷണവും മത്സരപരീക്ഷാ പരിശീലനവും നൽകുന്നു.',
      targetGroup: 'ആദിവാസി മേഖലകളിലെ 6–12 ക്ലാസുകളിലെ എസ്ടി വിദ്യാർത്ഥികൾ',
      financialAid: '100% സൗജന്യ വിദ്യാഭ്യാസം, താമസം, ഭക്ഷണം, പുസ്തകങ്ങൾ',
    },
  },

  asry: {
    en: {
      title: 'Adivasi Shiksha Rinn Yojana (ASRY)',
      subtitle: 'Concessional Education Loan for Professional / Technical Degrees',
      description: 'Concessional loans up to ₹10 Lakh at 6% per annum interest with interest subsidy during the moratorium period.',
      targetGroup: 'ST students pursuing approved technical & professional courses in India',
      financialAid: 'Loan up to ₹10 Lakh at 6% p.a. (4.5% net for women)',
    },
    te: {
      title: 'ఆదివాసీ విద్యా రుణ పథకం (ASRY)',
      subtitle: 'వృత్తి/సాంకేతిక ఉన్నత విద్య కోసం రాయితీ విద్యా రుణం',
      description: 'ఇంజనీరింగ్, మెడిసిన్, ఎంబీఏ వంటి వృత్తి విద్యా కోర్సులు చదివే ఎస్టీ విద్యార్థులకు ₹10 లక్షల వరకు రాయితీ వడ్డీతో అందించే రుణం.',
      targetGroup: 'భారతదేశంలో గుర్తింపు పొందిన సాంకేతిక/వృత్తి కోర్సులు చదివే ఎస్టీ విద్యార్థులు',
      financialAid: '₹10 లక్షల వరకు రుణం (కేవలం 6% వడ్డీ, మహిళలకు 4.5%)',
    },
    hi: {
      title: 'आदिवासी शिक्षा ऋण योजना (ASRY)',
      subtitle: 'व्यावसायिक एवं तकनीकी डिग्रियों हेतु रियायती शिक्षा ऋण',
      description: 'पाठ्यक्रम अवधि के दौरान ब्याज सब्सिडी के साथ मात्र 6% प्रति वर्ष की दर पर ₹10 लाख तक का शिक्षा ऋण।',
      targetGroup: 'भारत में तकनीकी/व्यावसायिक पाठ्यक्रमों में अध्ययनरत एसटी छात्र',
      financialAid: '₹10 लाख तक का ऋण (छात्राओं हेतु 4.5% शुद्ध ब्याज)',
    },
    kn: {
      title: 'ಆದಿವಾಸಿ ಶಿಕ್ಷಣ ಸಾಲ ಯೋಜನೆ (ASRY)',
      subtitle: 'ವೃತ್ತಿಪರ ಪದವಿಗಳಿಗಾಗಿ ರಿಯಾಯಿತಿ ಶಿಕ್ಷಣ ಸಾಲ',
      description: 'ತಾಂತ್ರಿಕ ಮತ್ತು ವೃತ್ತಿಪರ ಶಿಕ್ಷಣ ಪಡೆಯುತ್ತಿರುವ ಎಸ್‌ಟಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ₹10 ಲಕ್ಷದವರೆಗೆ ರಿಯಾಯಿತಿ ಬಡ್ಡಿದರದ ಸಾಲ.',
      targetGroup: 'ತಾಂತ್ರಿಕ ಮತ್ತು ವೃತ್ತಿಪರ ಕೋರ್ಸ್‌ಗಳನ್ನು ಕಲಿಯುತ್ತಿರುವ ಎಸ್‌ಟಿ ವಿದ್ಯಾರ್ಥಿಗಳು',
      financialAid: '₹10 ಲಕ್ಷದವರೆಗೆ ಸಾಲ (ಕೇವಲ 6% ಬಡ್ಡಿ, ಮಹಿಳೆಯರಿಗೆ 4.5%)',
    },
    ta: {
      title: 'ஆதிவாசி கல்வி கடன் திட்டம் (ASRY)',
      subtitle: 'தொழில்முறை படிப்புகளுக்கான குறைந்த வட்டி கல்வி கடன்',
      description: 'மருத்துவம், பொறியியல் போன்ற உயர்கல்வி பயில ₹10 லட்சம் வரை குறைந்த வட்டியில் வழங்கப்படும் கல்வி கடன்.',
      targetGroup: 'தொழில்முறை பட்டப்படிப்பு பயிலும் பழங்குடியின மாணவர்கள்',
      financialAid: '₹10 லட்சம் வரை கடன் (6% வட்டி, பெண்களுக்கு 4.5%)',
    },
    ml: {
      title: 'ആദിവാസി വിദ്യാഭ്യാസ വായ്പാ പദ്ധതി (ASRY)',
      subtitle: 'പ്രൊഫഷണൽ ബിരുദങ്ങൾക്കുള്ള കുറഞ്ഞ പലിശ വിദ്യാഭ്യാസ വായ്പ',
      description: 'പ്രൊഫഷണൽ കോഴ്സുകൾ പഠിക്കുന്നതിന് ₹10 ലക്ഷം വരെ കുറഞ്ഞ പലിശ നിരക്കിൽ നൽകുന്ന വായ്പ.',
      targetGroup: 'അംഗീകൃത സാങ്കേതിക, പ്രൊഫഷണൽ കോഴ്സുകൾ പഠിക്കുന്ന എസ്ടി വിദ്യാർത്ഥികൾ',
      financialAid: '₹10 ലക്ഷം വരെ വായ്പ (6% പലിശ, സ്ത്രീകൾക്ക് 4.5%)',
    },
  },

  goal: {
    en: {
      title: 'GOAL — Going Online as Leaders',
      subtitle: 'Digital Mentorship & Leadership Programme for Tribal Youth',
      description: 'Joint initiative by MoTA and Meta (Facebook) to empower tribal youth with digital literacy, entrepreneurship, and 1-on-1 industry mentorship.',
      targetGroup: 'ST youth aged 18–35 with smartphone access and basic literacy',
      financialAid: 'Fully sponsored mentorship, digital training & certification',
    },
    te: {
      title: 'గోల్ (GOAL) — డిజిటల్ నాయకత్వ శిక్షణ',
      subtitle: 'గిరిజన యువత కోసం డిజిటల్ మెంటార్‌షిప్ & లీడర్‌షిప్ ప్రోగ్రామ్',
      description: 'గిరిజన యువతకు డిజిటల్ మార్కెటింగ్, వ్యాపార నైపుణ్యాలు మరియు ప్రముఖ పారిశ్రామికవేత్తలతో 1-ఆన్-1 మెంటార్‌షిప్ అందించే పథకం.',
      targetGroup: 'స్మార్ట్‌ఫోన్ సౌకర్యం గల 18–35 సంవత్సరాల ఎస్టీ యువతీ యువకులు',
      financialAid: 'పూర్తి ఉచిత డిజిటల్ శిక్షణ, మెంటార్‌షిప్ మరియు సర్టిఫికేషన్',
    },
    hi: {
      title: 'गोल (GOAL) — गोइंग ऑनलाइन एज़ लीडर्स',
      subtitle: 'जनजातीय युवाओं हेतु डिजिटल मेंटरशिप व नेतृत्व कार्यक्रम',
      description: 'मेटा (फेसबुक) एवं जनजातीय कार्य मंत्रालय का संयुक्त कार्यक्रम जो जनजातीय युवाओं को डिजिटल साक्षरता और 1-ऑन-1 मेंटरशिप प्रदान करता है।',
      targetGroup: '18-35 वर्ष के स्मार्टफोन धारक एसटी युवा',
      financialAid: 'पूर्णतः प्रायोजित प्रशिक्षण, प्रमाण पत्र एवं मेंटरशिप',
    },
    kn: {
      title: 'ಗೋಲ್ (GOAL) — ಡಿಜಿಟಲ್ ನಾಯಕತ್ವ ತರಬೇತಿ',
      subtitle: 'ಬುಡಕಟ್ಟು ಯುವಜನರಿಗಾಗಿ ಡಿಜಿಟಲ್ ಮಾರ್ಗದರ್ಶನ ಕಾರ್ಯಕ್ರಮ',
      description: 'ಬುಡಕಟ್ಟು ಯುವಜನರಲ್ಲಿ ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯ ಮತ್ತು ಉದ್ಯಮಶೀಲತೆ ಬೆಳೆಸಲು MoTA ಮತ್ತು ಮೆಟಾ ಸಂಸ್ಥೆಯ ಸಹಯೋಗದ ಯೋಜನೆ.',
      targetGroup: 'ಸ್ಮಾರ್ಟ್‌ಫೋನ್ ಹೊಂದಿರುವ 18–35 ವರ್ಷದ ಎಸ್‌ಟಿ ಯುವಕರು',
      financialAid: 'ಸಂಪೂರ್ಣ ಉಚಿತ ತರಬೇತಿ, ಪ್ರಮಾಣಪತ್ರ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ',
    },
    ta: {
      title: 'கோல் (GOAL) — இணையவழி தலைமைத்துவ பயிற்சி',
      subtitle: 'பழங்குடியின இளைஞர்களுக்கான டிஜிட்டல் வழிகாட்டுதல் திட்டம்',
      description: 'பழங்குடியின இளைஞர்களுக்கு டிஜிட்டல் தொழில்நுட்பம் மற்றும் தலைமைத்துவ பயிற்சி அளிக்கும் திட்டம்.',
      targetGroup: 'ஸ்மார்ட்போன் வசதி கொண்ட 18–35 வயதுடைய எஸ்டி இளைஞர்கள்',
      financialAid: 'முழுமையான இலவச பயிற்சி, சான்றிதழ் மற்றும் வழிகாட்டுதல்',
    },
    ml: {
      title: 'ഗോൾ (GOAL) — ഡിജിറ്റൽ ലീഡർഷിപ്പ് പ്രോഗ്രാം',
      subtitle: 'ആദിവാസി യുവാക്കൾക്കുള്ള ഡിജിറ്റൽ മെന്റർഷിപ്പ് പദ്ധതി',
      description: 'ആദിവാസി യുവാക്കൾക്ക് ഡിജിറ്റൽ സാക്ഷരതയും നേതൃത്വപാടവവും നൽകുന്ന പദ്ധതി.',
      targetGroup: 'സ്മാർട്ട്‌ഫോൺ ഉപയോഗിക്കുന്ന 18–35 വയസ്സുള്ള എസ്ടി യുവാക്കൾ',
      financialAid: 'സൗജന്യ പരിശീലനം, സർട്ടിഫിക്കേഷൻ, മെന്റർഷിപ്പ്',
    },
  },

  pm_janman: {
    en: {
      title: 'PM-JANMAN Mission',
      subtitle: 'Pradhan Mantri Janjati Adivasi Nyaya Maha Abhiyan',
      description: 'Comprehensive multi-ministry package covering 11 critical interventions for 75 Particularly Vulnerable Tribal Groups (PVTGs).',
      targetGroup: 'All 75 notified PVTG communities across 18 States and UTs',
      financialAid: 'Free pucca housing, piped water, electricity, hostels, roads & healthcare',
    },
    te: {
      title: 'పీఎం-జన్‌మన్ మిషన్ (PM-JANMAN)',
      subtitle: 'ప్రధానమంత్రి జనజాతి ఆదివాసీ న్యాయ మహా అభియాన్',
      description: '75 బలహీన గిరిజన సమూహాల (PVTG) సమగ్ర అభివృద్ధి కోసం పక్కా ఇళ్లు, తాగునీరు, విద్యుత్ మరియు హాస్టళ్లతో కూడిన బృహత్ పథకం.',
      targetGroup: 'దేశంలోని 18 రాష్ట్రాలు/కేంద్రపాలిత ప్రాంతాల్లోని 75 PVTG సమూహాలు',
      financialAid: 'ఉచిత పక్కా ఇళ్లు, కుళాయి నీరు, విద్యుత్, హాస్టళ్లు మరియు ఉచిత వైద్యం',
    },
    hi: {
      title: 'पीएम-जनमन मिशन (PM-JANMAN)',
      subtitle: 'प्रधानमंत्री जनजाति आदिवासी न्याय महा अभियान',
      description: '75 विशेष रूप से कमज़ोर जनजातीय समूहों (PVTG) के समग्र उत्थान हेतु पक्के आवास, स्वच्छ जल, बिजली और स्वास्थ्य का महा-अभियान।',
      targetGroup: '18 राज्यों/केंद्रशासित प्रदेशों के सभी 75 अधिसूचित पीवीटीजी समुदाय',
      financialAid: 'निःशुल्क पक्के मकान, नल जल, सड़क, बिजली और छात्रावास',
    },
    kn: {
      title: 'ಪಿಎಂ-ಜನ್‌ಮನ್ ಮಿಷನ್ (PM-JANMAN)',
      subtitle: 'ಪ್ರಧಾನಮಂತ್ರಿ ಜನಜಾತಿ ಆದಿವಾಸಿ ನ್ಯಾಯ ಮಹಾ ಅಭಿಯಾನ',
      description: '75 ದುರ್ಬಲ ಬುಡಕಟ್ಟು ಸಮುದಾಯಗಳ (PVTG) ಸಮಗ್ರ ಅಭಿವೃದ್ಧಿಗಾಗಿ ಮನೆ, ನೀರು, ರಸ್ತೆ ಮತ್ತು ಶಿಕ್ಷಣ ಒದಗಿಸುವ ಯೋಜನೆ.',
      targetGroup: '18 ರಾಜ್ಯಗಳಲ್ಲಿನ 75 ಪಿವಿಟಿಜಿ ಸಮುದಾಯಗಳು',
      financialAid: 'ಉಚಿತ ಪಕ್ಕಾ ಮನೆಗಳು, ಕುಡಿಯುವ ನೀರು, ವಿದ್ಯುತ್ ಮತ್ತು ಹಾಸ್ಟೆಲ್‌ಗಳು',
    },
    ta: {
      title: 'பிஎம்-ஜன்மன் திட்டம் (PM-JANMAN)',
      subtitle: 'பிரதமர் பழங்குடியினர் நீதி மகா அபியான்',
      description: '75 நலிவடைந்த பழங்குடியின சமூகங்களுக்கான முழுமையான வீடு, குடிநீர், சாலை மற்றும் சுகாதார வசதிகள் திட்டம்.',
      targetGroup: '18 மாநிலங்களில் உள்ள 75 PVTG பழங்குடியின மக்கள்',
      financialAid: 'இலவச நிரந்தர வீடுகள், குடிநீர், மின்சாரம், விடுதிகள் மற்றும் சாலைகள்',
    },
    ml: {
      title: 'പിഎം-ജൻമൻ മിഷൻ (PM-JANMAN)',
      subtitle: 'പ്രധാനമന്ത്രി ജനജാതി ആദിവാസി ന്യായ മഹാ അഭിയാൻ',
      description: '75 പ്രത്യേക ദുർബല ഗോത്രവിഭാഗങ്ങളുടെ (PVTG) സമഗ്ര വികസനത്തിനായുള്ള പദ്ധതി.',
      targetGroup: '18 സംസ്ഥാനങ്ങളിലെ 75 പിവിടിജി വിഭാഗങ്ങൾ',
      financialAid: 'സൗജന്യ ഭവനം, ശുദ്ധജലം, വൈദ്യുതി, റോഡുകൾ, വിദ്യാഭ്യാസം',
    },
  },
};

export function getLocalizedScholarship(scheme: ScholarshipScheme, lang: Language): ScholarshipScheme {
  const t = SCHEME_TRANSLATIONS[scheme.id]?.[lang];
  if (!t) return scheme;
  return {
    ...scheme,
    name: t.name || scheme.name,
    shortName: t.shortName || scheme.shortName,
    description: t.description || scheme.description,
  };
}

export function getLocalizedProgramme(prog: Programme, lang: Language): Programme {
  const t = PROGRAMME_TRANSLATIONS[prog.id]?.[lang];
  if (!t) return prog;
  return {
    ...prog,
    name: t.title || prog.name,
    shortName: t.subtitle || prog.shortName,
    overview: t.description || prog.overview,
    target: t.targetGroup || prog.target,
  };
}
