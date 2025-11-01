// ==== التخصصات (ملخّص واقعي ومكفي للتشغيل) ====
export const majorsData = {
  cs: {
    id: 'cs',
    name: 'علوم الحاسب وتقنية المعلومات',
    icon: '💻',
    demandLevel: 95, // عالي جداً
    salary: { min: 800, max: 1500, avg: 1150 },
    difficulty: 'متوسط إلى صعب',
    studyYears: 4,
    registeredDiwan: 2850,
    hiredPerYear: 320,
    waitingMonths: 9,
    employers: ['CITRA', 'القطاع الحكومي', 'البنوك', 'شركات الاتصالات', 'القطاع الخاص'],
    requiredSkills: ['logic', 'technology', 'numbers', 'research'],
    studyType: ['practical', 'challenging'],
    marketTrend: [
      { year: '2020', demand: 75 },
      { year: '2021', demand: 80 },
      { year: '2022', demand: 85 },
      { year: '2023', demand: 90 },
      { year: '2024', demand: 95 },
      { year: '2025', demand: 98 }
    ],
    advantages: ['رواتب عالية', 'طلب متزايد', 'تنوع وظائف', 'إمكانية العمل الحر'],
    disadvantages: ['تحديث مهارات مستمر', 'منافسة عالية']
  },

  medicine: {
    id: 'medicine',
    name: 'الطب البشري',
    icon: '⚕️',
    demandLevel: 92,
    salary: { min: 1200, max: 2500, avg: 1850 },
    difficulty: 'صعب جداً',
    studyYears: 7,
    registeredDiwan: 4200,
    hiredPerYear: 180,
    waitingMonths: 36,
    employers: ['وزارة الصحة', 'المستشفيات الحكومية', 'القطاع الخاص'],
    requiredSkills: ['memorization', 'helping', 'research'],
    studyType: ['theoretical', 'challenging', 'long'],
    marketTrend: [
      { year: '2020', demand: 88 },
      { year: '2021', demand: 89 },
      { year: '2022', demand: 90 },
      { year: '2023', demand: 91 },
      { year: '2024', demand: 92 },
      { year: '2025', demand: 92 }
    ],
    advantages: ['مكانة اجتماعية', 'راتب ممتاز', 'أمان وظيفي'],
    disadvantages: ['دراسة طويلة وصعبة', 'ضغط ومسؤولية عالية']
  },

  engineering: {
    id: 'engineering',
    name: 'الهندسة (مدني/كهرباء/ميكانيكا)',
    icon: '🏗️',
    demandLevel: 83,
    salary: { min: 700, max: 1400, avg: 1050 },
    difficulty: 'صعب',
    studyYears: 5,
    registeredDiwan: 5600,
    hiredPerYear: 280,
    waitingMonths: 18,
    employers: ['وزارة الأشغال', 'وزارة الكهرباء والماء', 'القطاع النفطي', 'القطاع الخاص'],
    requiredSkills: ['logic', 'numbers', 'drawing', 'research'],
    studyType: ['practical', 'challenging'],
    marketTrend: [
      { year: '2020', demand: 78 },
      { year: '2021', demand: 79 },
      { year: '2022', demand: 80 },
      { year: '2023', demand: 81 },
      { year: '2024', demand: 82 },
      { year: '2025', demand: 83 }
    ],
    advantages: ['فرص نفطية', 'مشاريع كبرى'],
    disadvantages: ['عمل ميداني محتمل', 'دراسة قوية']
  },

  business: {
    id: 'business',
    name: 'إدارة الأعمال والمحاسبة',
    icon: '💼',
    demandLevel: 68, // متوسط
    salary: { min: 600, max: 1200, avg: 900 },
    difficulty: 'متوسط',
    studyYears: 4,
    registeredDiwan: 8900,
    hiredPerYear: 250,
    waitingMonths: 30,
    employers: ['البنوك', 'وزارة المالية', 'الشركات الحكومية', 'القطاع الخاص'],
    requiredSkills: ['numbers', 'communication', 'logic'],
    studyType: ['theoretical', 'easy'],
    marketTrend: [
      { year: '2020', demand: 70 },
      { year: '2021', demand: 69 },
      { year: '2022', demand: 68 },
      { year: '2023', demand: 68 },
      { year: '2024', demand: 68 },
      { year: '2025', demand: 68 }
    ],
    advantages: ['فرص متنوعة', 'مطلوب في كل القطاعات'],
    disadvantages: ['تشبّع ومنافسة عالية', 'انتظار أطول']
  },

  law: {
    id: 'law',
    name: 'القانون والحقوق',
    icon: '⚖️',
    demandLevel: 45, // منخفض
    salary: { min: 600, max: 1500, avg: 1050 },
    difficulty: 'صعب (حفظ كثير)',
    studyYears: 4,
    registeredDiwan: 12500,
    hiredPerYear: 80,
    waitingMonths: 78,
    employers: ['وزارة العدل', 'الفتوى والتشريع', 'مكاتب محاماة'],
    requiredSkills: ['memorization', 'communication', 'logic'],
    studyType: ['theoretical', 'challenging', 'long'],
    marketTrend: [
      { year: '2020', demand: 50 },
      { year: '2021', demand: 48 },
      { year: '2022', demand: 47 },
      { year: '2023', demand: 46 },
      { year: '2024', demand: 45 },
      { year: '2025', demand: 45 }
    ],
    advantages: ['مكانة مرموقة', 'فرص محاماة خاصة'],
    disadvantages: ['تشبّع شديد', 'انتظار طويل جداً']
  },

  education: {
    id: 'education',
    name: 'التربية والتعليم',
    icon: '👩‍🏫',
    demandLevel: 85, // عالي
    salary: { min: 550, max: 900, avg: 725 },
    difficulty: 'سهل',
    studyYears: 4,
    registeredDiwan: 6800,
    hiredPerYear: 450,
    waitingMonths: 9,
    employers: ['وزارة التربية', 'المدارس الخاصة'],
    requiredSkills: ['communication', 'helping', 'memorization'],
    studyType: ['theoretical', 'easy', 'short'],
    marketTrend: [
      { year: '2020', demand: 82 },
      { year: '2021', demand: 83 },
      { year: '2022', demand: 84 },
      { year: '2023', demand: 85 },
      { year: '2024', demand: 85 },
      { year: '2025', demand: 86 }
    ],
    advantages: ['توظيف أسرع', 'إجازات طويلة'],
    disadvantages: ['راتب أقل نسبياً']
  },

  pharmacy: {
    id: 'pharmacy',
    name: 'الصيدلة',
    icon: '💊',
    demandLevel: 66, // متوسط
    salary: { min: 800, max: 1300, avg: 1050 },
    difficulty: 'متوسط إلى صعب',
    studyYears: 5,
    registeredDiwan: 3200,
    hiredPerYear: 120,
    waitingMonths: 18,
    employers: ['وزارة الصحة', 'الصيدليات الخاصة', 'شركات الأدوية'],
    requiredSkills: ['memorization', 'helping', 'research'],
    studyType: ['theoretical', 'challenging'],
    marketTrend: [
      { year: '2020', demand: 62 },
      { year: '2021', demand: 63 },
      { year: '2022', demand: 64 },
      { year: '2023', demand: 65 },
      { year: '2024', demand: 65 },
      { year: '2025', demand: 66 }
    ],
    advantages: ['طلب مستقر', 'فرص قطاع خاص'],
    disadvantages: ['ساعات عمل أطول']
  },

  architecture: {
    id: 'architecture',
    name: 'الهندسة المعمارية',
    icon: '🏛️',
    demandLevel: 50, // منخفض
    salary: { min: 650, max: 1300, avg: 975 },
    difficulty: 'صعب',
    studyYears: 5,
    registeredDiwan: 2100,
    hiredPerYear: 45,
    waitingMonths: 48,
    employers: ['البلدية', 'مكاتب التصميم', 'شركات التطوير'],
    requiredSkills: ['drawing', 'creativity', 'logic'],
    studyType: ['practical', 'challenging'],
    marketTrend: [
      { year: '2020', demand: 55 },
      { year: '2021', demand: 53 },
      { year: '2022', demand: 52 },
      { year: '2023', demand: 51 },
      { year: '2024', demand: 50 },
      { year: '2025', demand: 50 }
    ],
    advantages: ['عمل إبداعي', 'مشاريع متنوعة'],
    disadvantages: ['طلب محدود', 'انتظار أطول']
  }
}

// ==== المهارات / الاهتمامات / أنماط الدراسة ====
export const skillsData = [
  { id: 'memorization', name: 'الحفظ والاستذكار', icon: '🧠' },
  { id: 'drawing', name: 'الرسم والتصميم', icon: '🎨' },
  { id: 'logic', name: 'التفكير المنطقي', icon: '🧩' },
  { id: 'communication', name: 'التواصل والإقناع', icon: '💬' },
  { id: 'numbers', name: 'العمل مع الأرقام', icon: '🔢' },
  { id: 'helping', name: 'مساعدة الآخرين', icon: '🤝' },
  { id: 'technology', name: 'التقنية والحاسوب', icon: '💻' },
  { id: 'research', name: 'البحث والتحليل', icon: '🔬' },
  { id: 'creativity', name: 'الإبداع والابتكار', icon: '✨' },
]

export const interestsData = [
  { id: 'health', name: 'الصحة والطب', icon: '⚕️' },
  { id: 'tech', name: 'التقنية والبرمجة', icon: '💻' },
  { id: 'business', name: 'الأعمال والمال', icon: '💼' },
  { id: 'law', name: 'القانون والعدالة', icon: '⚖️' },
  { id: 'construction', name: 'البناء والتشييد', icon: '🏗️' },
  { id: 'education', name: 'التعليم والتدريب', icon: '📚' },
  { id: 'art', name: 'الفنون والتصميم', icon: '🎨' },
  { id: 'science', name: 'العلوم والبحث', icon: '🔬' },
]

export const studyTypesData = [
  { id: 'practical', name: 'عملي وتطبيقي', icon: '🛠️' },
  { id: 'theoretical', name: 'نظري ودراسي', icon: '📖' },
  { id: 'easy', name: 'سهل نسبياً', icon: '😊' },
  { id: 'challenging', name: 'يحتاج اجتهاد', icon: '💪' },
  { id: 'short', name: 'مدة دراسة قصيرة', icon: '⏱️' },
  { id: 'long', name: 'استثمار طويل المدى', icon: '📅' },
]

