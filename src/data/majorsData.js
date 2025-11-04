// ========================================
// بيانات التخصصات الجامعية - 20 تخصص
// University Majors Data - 20 Majors
// ========================================

export const majorsData = {
  // ========================================
  // التقنية والحاسوب
  // ========================================
  cs: {
    id: 'cs',
    name: 'علوم الحاسب وتقنية المعلومات',
    icon: '💻',
    demandLevel: 95,
    salary: { min: 800, max: 1800, avg: 1150 },
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
    disadvantages: ['تحديث مهارات مستمر', 'منافسة عالية'],
    certificates: [
      'AWS Certified Solutions Architect',
      'Google Cloud Professional',
      'Microsoft Azure Fundamentals',
      'CompTIA A+'
    ]
  },

  cybersecurity: {
    id: 'cybersecurity',
    name: 'الأمن السيبراني',
    icon: '🔐',
    demandLevel: 92,
    salary: { min: 900, max: 2000, avg: 1250 },
    difficulty: 'صعب',
    studyYears: 4,
    registeredDiwan: 580,
    hiredPerYear: 120,
    waitingMonths: 6,
    employers: ['الهيئة العامة للاتصالات', 'بنك الكويت المركزي', 'وزارة الداخلية', 'القطاع البنكي'],
    requiredSkills: ['logic', 'technology', 'research'],
    studyType: ['practical', 'challenging'],
    marketTrend: [
      { year: '2020', demand: 70 },
      { year: '2021', demand: 75 },
      { year: '2022', demand: 80 },
      { year: '2023', demand: 85 },
      { year: '2024', demand: 90 },
      { year: '2025', demand: 92 }
    ],
    advantages: ['طلب عالي جداً', 'رواتب ممتازة', 'أمان وظيفي', 'مجال متطور'],
    disadvantages: ['يحتاج تحديث مستمر', 'ضغط عمل عالي'],
    certificates: [
      'CompTIA Security+',
      'Certified Ethical Hacker (CEH)',
      'CISSP',
      'Cybersecurity Essentials (Cisco)'
    ]
  },

  ai: {
    id: 'ai',
    name: 'الذكاء الاصطناعي',
    icon: '🤖',
    demandLevel: 95,
    salary: { min: 1000, max: 2200, avg: 1300 },
    difficulty: 'صعب جداً',
    studyYears: 4,
    registeredDiwan: 420,
    hiredPerYear: 95,
    waitingMonths: 6,
    employers: ['مؤسسة البترول الكويتية', 'CITRA', 'بنك الكويت المركزي', 'شركات التكنولوجيا'],
    requiredSkills: ['logic', 'numbers', 'technology', 'research'],
    studyType: ['theoretical', 'challenging'],
    marketTrend: [
      { year: '2020', demand: 60 },
      { year: '2021', demand: 70 },
      { year: '2022', demand: 80 },
      { year: '2023', demand: 85 },
      { year: '2024', demand: 92 },
      { year: '2025', demand: 95 }
    ],
    advantages: ['أعلى الرواتب', 'مستقبل واعد', 'مجال حديث', 'فرص عالمية'],
    disadvantages: ['صعوبة عالية', 'يحتاج تأسيس قوي في الرياضيات'],
    certificates: [
      'Machine Learning by Andrew Ng',
      'Deep Learning Specialization',
      'TensorFlow Developer Certificate',
      'IBM AI Engineering'
    ]
  },

  // ========================================
  // الصحة والطب
  // ========================================
  medicine: {
    id: 'medicine',
    name: 'الطب البشري',
    icon: '⚕️',
    demandLevel: 92,
    salary: { min: 1200, max: 3000, avg: 1850 },
    difficulty: 'صعب جداً',
    studyYears: 7,
    registeredDiwan: 4200,
    hiredPerYear: 180,
    waitingMonths: 36,
    employers: ['وزارة الصحة', 'المستشفيات الحكومية', 'القطاع الخاص', 'مستشفى الأميري'],
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
    advantages: ['مكانة اجتماعية', 'راتب ممتاز', 'أمان وظيفي', 'مهنة إنسانية'],
    disadvantages: ['دراسة طويلة وصعبة', 'ضغط ومسؤولية عالية', 'ساعات عمل طويلة'],
    certificates: [
      'USMLE',
      'BLS & ACLS',
      'تخصصات طبية متقدمة',
      'Board Certification'
    ]
  },

  dentistry: {
    id: 'dentistry',
    name: 'طب الأسنان',
    icon: '🦷',
    demandLevel: 82,
    salary: { min: 1000, max: 2500, avg: 1650 },
    difficulty: 'صعب',
    studyYears: 6,
    registeredDiwan: 1800,
    hiredPerYear: 120,
    waitingMonths: 12,
    employers: ['وزارة الصحة', 'مراكز الأسنان التخصصية', 'العيادات الخاصة'],
    requiredSkills: ['memorization', 'helping', 'drawing'],
    studyType: ['practical', 'challenging'],
    marketTrend: [
      { year: '2020', demand: 75 },
      { year: '2021', demand: 77 },
      { year: '2022', demand: 79 },
      { year: '2023', demand: 80 },
      { year: '2024', demand: 81 },
      { year: '2025', demand: 82 }
    ],
    advantages: ['رواتب عالية', 'عيادة خاصة ممكنة', 'طلب مستمر'],
    disadvantages: ['دراسة طويلة', 'استثمار في المعدات'],
    certificates: [
      'تقويم الأسنان',
      'جراحة الفم',
      'زراعة الأسنان',
      'طب الأسنان التجميلي'
    ]
  },

  pharmacy: {
    id: 'pharmacy',
    name: 'الصيدلة',
    icon: '💊',
    demandLevel: 75,
    salary: { min: 800, max: 1600, avg: 1100 },
    difficulty: 'متوسط إلى صعب',
    studyYears: 5,
    registeredDiwan: 3200,
    hiredPerYear: 140,
    waitingMonths: 18,
    employers: ['وزارة الصحة', 'الصيدليات الخاصة', 'شركات الأدوية', 'المستشفيات'],
    requiredSkills: ['memorization', 'helping', 'research'],
    studyType: ['theoretical', 'challenging'],
    marketTrend: [
      { year: '2020', demand: 70 },
      { year: '2021', demand: 71 },
      { year: '2022', demand: 72 },
      { year: '2023', demand: 73 },
      { year: '2024', demand: 74 },
      { year: '2025', demand: 75 }
    ],
    advantages: ['طلب مستقر', 'فرص قطاع خاص', 'ساعات عمل معقولة'],
    disadvantages: ['منافسة متوسطة', 'ساعات وقوف طويلة'],
    certificates: [
      'Clinical Pharmacy',
      'Hospital Pharmacy',
      'Drug Information',
      'Pharmacotherapy'
    ]
  },

  nursing: {
    id: 'nursing',
    name: 'التمريض',
    icon: '👩‍⚕️',
    demandLevel: 96,
    salary: { min: 600, max: 1200, avg: 800 },
    difficulty: 'متوسط',
    studyYears: 4,
    registeredDiwan: 8500,
    hiredPerYear: 450,
    waitingMonths: 3,
    employers: ['وزارة الصحة', 'جميع المستشفيات الحكومية', 'المستشفيات الخاصة'],
    requiredSkills: ['helping', 'communication', 'memorization'],
    studyType: ['practical', 'easy'],
    marketTrend: [
      { year: '2020', demand: 90 },
      { year: '2021', demand: 92 },
      { year: '2022', demand: 93 },
      { year: '2023', demand: 94 },
      { year: '2024', demand: 95 },
      { year: '2025', demand: 96 }
    ],
    advantages: ['توظيف فوري', 'طلب عالي جداً', 'أمان وظيفي', 'وظيفة إنسانية'],
    disadvantages: ['راتب أقل نسبياً', 'ورديات ليلية'],
    certificates: [
      'BLS & ACLS',
      'ICU Nursing',
      'Pediatric Nursing',
      'Emergency Nursing'
    ]
  },

  // ========================================
  // الهندسة
  // ========================================
  engineering: {
    id: 'engineering',
    name: 'الهندسة المدنية',
    icon: '🏗️',
    demandLevel: 76,
    salary: { min: 750, max: 1600, avg: 1050 },
    difficulty: 'صعب',
    studyYears: 5,
    registeredDiwan: 5600,
    hiredPerYear: 320,
    waitingMonths: 18,
    employers: ['وزارة الأشغال', 'البلدية', 'شركة المشاريع الكويتية', 'شركات المقاولات'],
    requiredSkills: ['logic', 'numbers', 'drawing', 'research'],
    studyType: ['practical', 'challenging'],
    marketTrend: [
      { year: '2020', demand: 72 },
      { year: '2021', demand: 73 },
      { year: '2022', demand: 74 },
      { year: '2023', demand: 75 },
      { year: '2024', demand: 76 },
      { year: '2025', demand: 76 }
    ],
    advantages: ['فرص في مشاريع كبرى', 'طلب مستمر', 'رواتب جيدة'],
    disadvantages: ['عمل ميداني محتمل', 'دراسة قوية'],
    certificates: [
      'PMP',
      'AutoCAD & Revit',
      'Green Construction',
      'PE License'
    ]
  },

  electrical: {
    id: 'electrical',
    name: 'الهندسة الكهربائية',
    icon: '⚡',
    demandLevel: 78,
    salary: { min: 800, max: 1700, avg: 1100 },
    difficulty: 'صعب',
    studyYears: 5,
    registeredDiwan: 4200,
    hiredPerYear: 180,
    waitingMonths: 15,
    employers: ['وزارة الكهرباء والماء', 'مؤسسة البترول', 'شركات الطاقة المتجددة', 'القطاع الصناعي'],
    requiredSkills: ['logic', 'numbers', 'technology', 'research'],
    studyType: ['practical', 'challenging'],
    marketTrend: [
      { year: '2020', demand: 73 },
      { year: '2021', demand: 74 },
      { year: '2022', demand: 75 },
      { year: '2023', demand: 76 },
      { year: '2024', demand: 77 },
      { year: '2025', demand: 78 }
    ],
    advantages: ['طلب مستمر', 'رواتب جيدة', 'فرص في الطاقة المتجددة'],
    disadvantages: ['دراسة صعبة', 'عمل ميداني أحياناً'],
    certificates: [
      'PLC Programming',
      'SCADA Systems',
      'Power Systems',
      'Renewable Energy Engineer'
    ]
  },

  mechanical: {
    id: 'mechanical',
    name: 'الهندسة الميكانيكية',
    icon: '⚙️',
    demandLevel: 72,
    salary: { min: 750, max: 1500, avg: 1000 },
    difficulty: 'صعب',
    studyYears: 5,
    registeredDiwan: 3800,
    hiredPerYear: 150,
    waitingMonths: 20,
    employers: ['مؤسسة البترول', 'الشركة الوطنية للصناعات', 'وزارة الكهرباء', 'شركات التصنيع'],
    requiredSkills: ['logic', 'numbers', 'drawing'],
    studyType: ['practical', 'challenging'],
    marketTrend: [
      { year: '2020', demand: 68 },
      { year: '2021', demand: 69 },
      { year: '2022', demand: 70 },
      { year: '2023', demand: 71 },
      { year: '2024', demand: 72 },
      { year: '2025', demand: 72 }
    ],
    advantages: ['فرص نفطية', 'تنوع في المجالات'],
    disadvantages: ['منافسة متوسطة', 'عمل ميداني'],
    certificates: [
      'SolidWorks Professional',
      'ANSYS Simulation',
      'Mechanical PE License',
      'Lean Six Sigma'
    ]
  },

  petroleum: {
    id: 'petroleum',
    name: 'هندسة البترول',
    icon: '🛢️',
    demandLevel: 65,
    salary: { min: 1000, max: 2000, avg: 1400 },
    difficulty: 'صعب',
    studyYears: 5,
    registeredDiwan: 2100,
    hiredPerYear: 80,
    waitingMonths: 24,
    employers: ['شركة نفط الكويت (KOC)', 'مؤسسة البترول الكويتية', 'شركات البترول العالمية'],
    requiredSkills: ['logic', 'numbers', 'research'],
    studyType: ['theoretical', 'challenging'],
    marketTrend: [
      { year: '2020', demand: 70 },
      { year: '2021', demand: 68 },
      { year: '2022', demand: 67 },
      { year: '2023', demand: 66 },
      { year: '2024', demand: 65 },
      { year: '2025', demand: 65 }
    ],
    advantages: ['رواتب عالية جداً', 'مزايا ممتازة', 'قطاع استراتيجي'],
    disadvantages: ['طلب محدود', 'انتظار أطول', 'عمل ميداني'],
    certificates: [
      'Petroleum Engineering Certification',
      'Reservoir Engineering',
      'Well Logging',
      'HSE Training'
    ]
  },

  architecture: {
    id: 'architecture',
    name: 'الهندسة المعمارية',
    icon: '🏛️',
    demandLevel: 50,
    salary: { min: 650, max: 1300, avg: 975 },
    difficulty: 'صعب',
    studyYears: 5,
    registeredDiwan: 2100,
    hiredPerYear: 45,
    waitingMonths: 48,
    employers: ['البلدية', 'مكاتب التصميم', 'شركات التطوير العقاري'],
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
    advantages: ['عمل إبداعي', 'مشاريع متنوعة', 'إمكانية عمل حر'],
    disadvantages: ['طلب محدود', 'انتظار طويل', 'منافسة عالية'],
    certificates: [
      'Revit Architecture',
      'SketchUp Pro',
      'LEED Certification',
      'BIM Specialist'
    ]
  },

  // ========================================
  // الأعمال والمالية
  // ========================================
  business: {
    id: 'business',
    name: 'إدارة الأعمال',
    icon: '💼',
    demandLevel: 68,
    salary: { min: 650, max: 1400, avg: 850 },
    difficulty: 'متوسط',
    studyYears: 4,
    registeredDiwan: 8900,
    hiredPerYear: 280,
    waitingMonths: 30,
    employers: ['القطاع الحكومي', 'البنوك', 'الشركات الكبرى', 'القطاع الخاص'],
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
    disadvantages: ['تشبّع ومنافسة عالية', 'انتظار أطول'],
    certificates: [
      'PMP',
      'MBA',
      'Six Sigma',
      'Digital Marketing'
    ]
  },

  accounting: {
    id: 'accounting',
    name: 'المحاسبة',
    icon: '🧮',
    demandLevel: 73,
    salary: { min: 700, max: 1500, avg: 900 },
    difficulty: 'متوسط',
    studyYears: 4,
    registeredDiwan: 5400,
    hiredPerYear: 260,
    waitingMonths: 24,
    employers: ['ديوان المحاسبة', 'الوزارات', 'الشركات الكبرى', 'مكاتب التدقيق'],
    requiredSkills: ['numbers', 'logic', 'memorization'],
    studyType: ['theoretical', 'easy'],
    marketTrend: [
      { year: '2020', demand: 70 },
      { year: '2021', demand: 71 },
      { year: '2022', demand: 72 },
      { year: '2023', demand: 72 },
      { year: '2024', demand: 73 },
      { year: '2025', demand: 73 }
    ],
    advantages: ['طلب مستمر', 'فرص في كل القطاعات', 'أمان وظيفي'],
    disadvantages: ['منافسة متوسطة', 'عمل روتيني'],
    certificates: [
      'CPA',
      'CMA',
      'CIA',
      'ACCA'
    ]
  },

  finance: {
    id: 'finance',
    name: 'المالية والخدمات البنكية',
    icon: '💰',
    demandLevel: 74,
    salary: { min: 700, max: 1500, avg: 900 },
    difficulty: 'متوسط',
    studyYears: 4,
    registeredDiwan: 4800,
    hiredPerYear: 220,
    waitingMonths: 22,
    employers: ['البنوك الكويتية', 'بنك الكويت المركزي', 'شركات الاستثمار', 'وزارة المالية'],
    requiredSkills: ['numbers', 'logic', 'communication'],
    studyType: ['theoretical', 'easy'],
    marketTrend: [
      { year: '2020', demand: 70 },
      { year: '2021', demand: 71 },
      { year: '2022', demand: 72 },
      { year: '2023', demand: 73 },
      { year: '2024', demand: 74 },
      { year: '2025', demand: 74 }
    ],
    advantages: ['رواتب جيدة', 'بيئة عمل محترمة', 'فرص تطور'],
    disadvantages: ['ضغط عمل أحياناً', 'منافسة متوسطة'],
    certificates: [
      'CFA',
      'FRM',
      'FinTech Certificate',
      'Bloomberg Certification'
    ]
  },

  // ========================================
  // القانون
  // ========================================
  law: {
    id: 'law',
    name: 'القانون والحقوق',
    icon: '⚖️',
    demandLevel: 45,
    salary: { min: 600, max: 2000, avg: 1000 },
    difficulty: 'صعب (حفظ كثير)',
    studyYears: 4,
    registeredDiwan: 12500,
    hiredPerYear: 80,
    waitingMonths: 78,
    employers: ['وزارة العدل', 'الفتوى والتشريع', 'النيابة العامة', 'مكاتب محاماة'],
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
    advantages: ['مكانة مرموقة', 'فرص محاماة خاصة', 'رواتب عالية للمتميزين'],
    disadvantages: ['تشبّع شديد', 'انتظار طويل جداً', 'منافسة قوية'],
    certificates: [
      'ترخيص المحاماة',
      'التحكيم الدولي',
      'القانون التجاري',
      'القانون الدستوري'
    ]
  },

  // ========================================
  // التعليم
  // ========================================
  education: {
    id: 'education',
    name: 'التربية والتعليم',
    icon: '👩‍🏫',
    demandLevel: 85,
    salary: { min: 550, max: 1200, avg: 800 },
    difficulty: 'سهل',
    studyYears: 4,
    registeredDiwan: 6800,
    hiredPerYear: 600,
    waitingMonths: 12,
    employers: ['وزارة التربية', 'المدارس الحكومية', 'المدارس الخاصة'],
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
    advantages: ['توظيف أسرع', 'إجازات طويلة', 'أمان وظيفي', 'وظيفة إنسانية'],
    disadvantages: ['راتب أقل نسبياً', 'ضغط نفسي'],
    certificates: [
      'رخصة التدريس',
      'التعليم الإلكتروني',
      'تطوير المناهج',
      'إدارة الصف'
    ]
  },

  english: {
    id: 'english',
    name: 'اللغة الإنجليزية',
    icon: '🗣️',
    demandLevel: 69,
    salary: { min: 600, max: 1100, avg: 750 },
    difficulty: 'متوسط',
    studyYears: 4,
    registeredDiwan: 3800,
    hiredPerYear: 180,
    waitingMonths: 20,
    employers: ['وزارة التربية', 'المدارس الخاصة', 'معاهد اللغات', 'الجهات الحكومية (ترجمة)'],
    requiredSkills: ['communication', 'memorization'],
    studyType: ['theoretical', 'easy'],
    marketTrend: [
      { year: '2020', demand: 65 },
      { year: '2021', demand: 66 },
      { year: '2022', demand: 67 },
      { year: '2023', demand: 68 },
      { year: '2024', demand: 69 },
      { year: '2025', demand: 69 }
    ],
    advantages: ['طلب مستمر', 'فرص في التدريس والترجمة', 'مرونة في العمل'],
    disadvantages: ['راتب متوسط', 'منافسة متوسطة'],
    certificates: [
      'TESOL/TEFL',
      'CELTA',
      'Translation Certificate',
      'IELTS Teacher Training'
    ]
  },

  // ========================================
  // الإعلام والفنون
  // ========================================
  media: {
    id: 'media',
    name: 'الإعلام والاتصال',
    icon: '📺',
    demandLevel: 64,
    salary: { min: 600, max: 1400, avg: 850 },
    difficulty: 'متوسط',
    studyYears: 4,
    registeredDiwan: 2100,
    hiredPerYear: 95,
    waitingMonths: 28,
    employers: ['تلفزيون الكويت', 'إذاعة الكويت', 'الصحف والمجلات', 'شركات الإنتاج'],
    requiredSkills: ['communication', 'creativity'],
    studyType: ['practical', 'easy'],
    marketTrend: [
      { year: '2020', demand: 60 },
      { year: '2021', demand: 61 },
      { year: '2022', demand: 62 },
      { year: '2023', demand: 63 },
      { year: '2024', demand: 64 },
      { year: '2025', demand: 64 }
    ],
    advantages: ['عمل إبداعي', 'تنوع في المجالات', 'شهرة ممكنة'],
    disadvantages: ['طلب محدود', 'منافسة عالية', 'عمل غير منتظم أحياناً'],
    certificates: [
      'Digital Marketing',
      'Social Media Management',
      'Broadcast Journalism',
      'Content Creation'
    ]
  },

  // ========================================
  // العلوم
  // ========================================
  environment: {
    id: 'environment',
    name: 'العلوم البيئية',
    icon: '🌱',
    demandLevel: 70,
    salary: { min: 700, max: 1300, avg: 900 },
    difficulty: 'متوسط',
    studyYears: 4,
    registeredDiwan: 850,
    hiredPerYear: 60,
    waitingMonths: 24,
    employers: ['الهيئة العامة للبيئة', 'مؤسسة البترول', 'وزارة الكهرباء', 'الشركات الصناعية'],
    requiredSkills: ['research', 'science'],
    studyType: ['theoretical', 'easy'],
    marketTrend: [
      { year: '2020', demand: 60 },
      { year: '2021', demand: 63 },
      { year: '2022', demand: 65 },
      { year: '2023', demand: 67 },
      { year: '2024', demand: 69 },
      { year: '2025', demand: 70 }
    ],
    advantages: ['مجال متطور', 'وعي بيئي متزايد', 'فرص دولية'],
    disadvantages: ['طلب محدود حالياً', 'تخصص حديث'],
    certificates: [
      'Environmental Impact Assessment',
      'ISO 14001',
      'Sustainability Management',
      'Climate Change Certificate'
    ]
  },

  psychology: {
    id: 'psychology',
    name: 'علم النفس',
    icon: '🧠',
    demandLevel: 67,
    salary: { min: 650, max: 1300, avg: 850 },
    difficulty: 'متوسط',
    studyYears: 4,
    registeredDiwan: 1200,
    hiredPerYear: 75,
    waitingMonths: 26,
    employers: ['وزارة الصحة', 'وزارة التربية', 'المستشفيات', 'العيادات الخاصة'],
    requiredSkills: ['helping', 'communication', 'research'],
    studyType: ['theoretical', 'easy'],
    marketTrend: [
      { year: '2020', demand: 60 },
      { year: '2021', demand: 62 },
      { year: '2022', demand: 64 },
      { year: '2023', demand: 65 },
      { year: '2024', demand: 66 },
      { year: '2025', demand: 67 }
    ],
    advantages: ['وعي متزايد بالصحة النفسية', 'فرص في عدة قطاعات', 'عمل إنساني'],
    disadvantages: ['طلب محدود', 'راتب متوسط في البداية'],
    certificates: [
      'رخصة العلاج النفسي',
      'CBT Certification',
      'Clinical Psychology',
      'Family Therapy'
    ]
  },

  // ========================================
  // تخصصات إضافية متوفرة في الكويت
  // ========================================
  
  economics: {
    id: 'economics',
    name: 'الاقتصاد',
    icon: '📈',
    demandLevel: 71,
    salary: { min: 700, max: 1500, avg: 950 },
    difficulty: 'متوسط إلى صعب',
    studyYears: 4,
    registeredDiwan: 2400,
    hiredPerYear: 110,
    waitingMonths: 24,
    employers: ['وزارة المالية', 'بنك الكويت المركزي', 'البنوك التجارية', 'مراكز الأبحاث'],
    requiredSkills: ['numbers', 'logic', 'research'],
    studyType: ['theoretical', 'challenging'],
    marketTrend: [
      { year: '2020', demand: 65 },
      { year: '2021', demand: 67 },
      { year: '2022', demand: 68 },
      { year: '2023', demand: 70 },
      { year: '2024', demand: 71 },
      { year: '2025', demand: 71 }
    ],
    advantages: ['فهم عميق للأسواق', 'فرص في القطاع البنكي', 'رواتب جيدة'],
    disadvantages: ['منافسة متوسطة', 'يحتاج تحليل معقد'],
    certificates: [
      'CFA',
      'FRM',
      'Economic Analysis',
      'Financial Modeling'
    ]
  },

  mis: {
    id: 'mis',
    name: 'نظم المعلومات الإدارية',
    icon: '💾',
    demandLevel: 88,
    salary: { min: 800, max: 1700, avg: 1100 },
    difficulty: 'متوسط',
    studyYears: 4,
    registeredDiwan: 1800,
    hiredPerYear: 200,
    waitingMonths: 10,
    employers: ['جميع الوزارات', 'البنوك', 'الشركات الكبرى', 'CITRA'],
    requiredSkills: ['technology', 'logic', 'numbers'],
    studyType: ['practical', 'easy'],
    marketTrend: [
      { year: '2020', demand: 78 },
      { year: '2021', demand: 81 },
      { year: '2022', demand: 84 },
      { year: '2023', demand: 86 },
      { year: '2024', demand: 87 },
      { year: '2025', demand: 88 }
    ],
    advantages: ['طلب عالي', 'تنوع وظيفي', 'رواتب جيدة', 'سهل نسبياً'],
    disadvantages: ['تحديث مستمر مطلوب'],
    certificates: [
      'Oracle Database',
      'SAP',
      'Business Intelligence',
      'Data Analytics'
    ]
  },

  interiorDesign: {
    id: 'interiorDesign',
    name: 'التصميم الداخلي',
    icon: '🪑',
    demandLevel: 58,
    salary: { min: 600, max: 1400, avg: 900 },
    difficulty: 'متوسط',
    studyYears: 4,
    registeredDiwan: 950,
    hiredPerYear: 55,
    waitingMonths: 32,
    employers: ['الهيئة العامة للتعليم التطبيقي', 'البلدية', 'شركات التصميم', 'العمل الحر'],
    requiredSkills: ['drawing', 'creativity'],
    studyType: ['practical', 'easy'],
    marketTrend: [
      { year: '2020', demand: 52 },
      { year: '2021', demand: 54 },
      { year: '2022', demand: 55 },
      { year: '2023', demand: 56 },
      { year: '2024', demand: 57 },
      { year: '2025', demand: 58 }
    ],
    advantages: ['عمل إبداعي', 'إمكانية عمل حر', 'مشاريع متنوعة'],
    disadvantages: ['طلب محدود في القطاع الحكومي', 'منافسة في القطاع الخاص'],
    certificates: [
      '3D Max',
      'AutoCAD',
      'SketchUp',
      'Interior Design Certification'
    ]
  },

  graphicDesign: {
    id: 'graphicDesign',
    name: 'التصميم الجرافيكي',
    icon: '🎨',
    demandLevel: 62,
    salary: { min: 550, max: 1200, avg: 800 },
    difficulty: 'سهل إلى متوسط',
    studyYears: 4,
    registeredDiwan: 650,
    hiredPerYear: 70,
    waitingMonths: 28,
    employers: ['الجهات الإعلامية الحكومية', 'شركات الإعلان', 'شركات التسويق', 'العمل الحر'],
    requiredSkills: ['creativity', 'drawing'],
    studyType: ['practical', 'easy'],
    marketTrend: [
      { year: '2020', demand: 55 },
      { year: '2021', demand: 57 },
      { year: '2022', demand: 59 },
      { year: '2023', demand: 60 },
      { year: '2024', demand: 61 },
      { year: '2025', demand: 62 }
    ],
    advantages: ['عمل إبداعي', 'طلب متزايد في التسويق الرقمي', 'فرص Freelance'],
    disadvantages: ['راتب متوسط', 'منافسة عالية'],
    certificates: [
      'Adobe Certified Expert',
      'UI/UX Design',
      'Motion Graphics',
      'Brand Identity Design'
    ]
  },

  publicRelations: {
    id: 'publicRelations',
    name: 'العلاقات العامة',
    icon: '🤝',
    demandLevel: 66,
    salary: { min: 600, max: 1300, avg: 850 },
    difficulty: 'سهل',
    studyYears: 4,
    registeredDiwan: 1100,
    hiredPerYear: 90,
    waitingMonths: 26,
    employers: ['جميع الوزارات', 'الشركات الكبرى', 'المؤسسات الحكومية', 'شركات العلاقات العامة'],
    requiredSkills: ['communication', 'creativity'],
    studyType: ['theoretical', 'easy'],
    marketTrend: [
      { year: '2020', demand: 60 },
      { year: '2021', demand: 62 },
      { year: '2022', demand: 63 },
      { year: '2023', demand: 64 },
      { year: '2024', demand: 65 },
      { year: '2025', demand: 66 }
    ],
    advantages: ['مطلوب في كل المؤسسات', 'تواصل اجتماعي', 'بيئة عمل جيدة'],
    disadvantages: ['راتب متوسط', 'ضغط في الفعاليات'],
    certificates: [
      'Public Relations Certificate',
      'Event Management',
      'Crisis Communication',
      'Social Media Management'
    ]
  },

  socialWork: {
    id: 'socialWork',
    name: 'الخدمة الاجتماعية',
    icon: '🫂',
    demandLevel: 71,
    salary: { min: 600, max: 1100, avg: 800 },
    difficulty: 'سهل',
    studyYears: 4,
    registeredDiwan: 2200,
    hiredPerYear: 140,
    waitingMonths: 20,
    employers: ['وزارة الشؤون الاجتماعية', 'المدارس', 'المستشفيات', 'مراكز الرعاية'],
    requiredSkills: ['helping', 'communication'],
    studyType: ['theoretical', 'easy'],
    marketTrend: [
      { year: '2020', demand: 65 },
      { year: '2021', demand: 67 },
      { year: '2022', demand: 68 },
      { year: '2023', demand: 69 },
      { year: '2024', demand: 70 },
      { year: '2025', demand: 71 }
    ],
    advantages: ['عمل إنساني', 'طلب مستمر', 'أمان وظيفي'],
    disadvantages: ['راتب متوسط', 'ضغط نفسي أحياناً'],
    certificates: [
      'رخصة الأخصائي الاجتماعي',
      'Family Counseling',
      'Community Development',
      'Case Management'
    ]
  },

  biology: {
    id: 'biology',
    name: 'علوم الحياة (الأحياء)',
    icon: '🧬',
    demandLevel: 64,
    salary: { min: 650, max: 1200, avg: 850 },
    difficulty: 'صعب',
    studyYears: 4,
    registeredDiwan: 1600,
    hiredPerYear: 85,
    waitingMonths: 28,
    employers: ['وزارة التربية', 'معهد الأبحاث العلمية', 'المستشفيات (مختبرات)', 'الهيئة العامة للبيئة'],
    requiredSkills: ['memorization', 'research', 'science'],
    studyType: ['theoretical', 'challenging'],
    marketTrend: [
      { year: '2020', demand: 60 },
      { year: '2021', demand: 61 },
      { year: '2022', demand: 62 },
      { year: '2023', demand: 63 },
      { year: '2024', demand: 64 },
      { year: '2025', demand: 64 }
    ],
    advantages: ['مجال علمي', 'فرص بحثية', 'تنوع في العمل'],
    disadvantages: ['طلب محدود', 'أغلب الفرص في التدريس'],
    certificates: [
      'Clinical Laboratory',
      'Molecular Biology',
      'Biotechnology',
      'Research Methods'
    ]
  },

  chemistry: {
    id: 'chemistry',
    name: 'الكيمياء',
    icon: '🧪',
    demandLevel: 63,
    salary: { min: 650, max: 1200, avg: 850 },
    difficulty: 'صعب',
    studyYears: 4,
    registeredDiwan: 1400,
    hiredPerYear: 75,
    waitingMonths: 30,
    employers: ['وزارة التربية', 'معهد الأبحاث العلمية', 'مؤسسة البترول', 'مختبرات التحاليل'],
    requiredSkills: ['memorization', 'research', 'numbers', 'science'],
    studyType: ['practical', 'challenging'],
    marketTrend: [
      { year: '2020', demand: 60 },
      { year: '2021', demand: 61 },
      { year: '2022', demand: 62 },
      { year: '2023', demand: 62 },
      { year: '2024', demand: 63 },
      { year: '2025', demand: 63 }
    ],
    advantages: ['مجال علمي', 'فرص في البترول', 'عمل مختبري'],
    disadvantages: ['طلب محدود', 'أغلب الفرص في التدريس'],
    certificates: [
      'Analytical Chemistry',
      'Industrial Chemistry',
      'Quality Control',
      'Laboratory Safety'
    ]
  },

  math: {
    id: 'math',
    name: 'الرياضيات',
    icon: '🔢',
    demandLevel: 68,
    salary: { min: 650, max: 1200, avg: 850 },
    difficulty: 'صعب',
    studyYears: 4,
    registeredDiwan: 2100,
    hiredPerYear: 160,
    waitingMonths: 22,
    employers: ['وزارة التربية', 'الجامعات', 'البنوك (قسم التحليل)', 'شركات التأمين'],
    requiredSkills: ['numbers', 'logic', 'research'],
    studyType: ['theoretical', 'challenging'],
    marketTrend: [
      { year: '2020', demand: 65 },
      { year: '2021', demand: 66 },
      { year: '2022', demand: 67 },
      { year: '2023', demand: 67 },
      { year: '2024', demand: 68 },
      { year: '2025', demand: 68 }
    ],
    advantages: ['طلب مستمر للمعلمين', 'أساس قوي للتخصصات التقنية', 'فرص في Data Science'],
    disadvantages: ['أغلب الفرص في التدريس', 'راتب متوسط'],
    certificates: [
      'Data Science',
      'Statistical Analysis',
      'Actuarial Science',
      'Financial Mathematics'
    ]
  },

  statistics: {
    id: 'statistics',
    name: 'الإحصاء',
    icon: '📊',
    demandLevel: 76,
    salary: { min: 700, max: 1400, avg: 950 },
    difficulty: 'صعب',
    studyYears: 4,
    registeredDiwan: 850,
    hiredPerYear: 95,
    waitingMonths: 18,
    employers: ['الإدارة المركزية للإحصاء', 'البنوك', 'شركات التأمين', 'مراكز الأبحاث'],
    requiredSkills: ['numbers', 'logic', 'research'],
    studyType: ['theoretical', 'challenging'],
    marketTrend: [
      { year: '2020', demand: 68 },
      { year: '2021', demand: 70 },
      { year: '2022', demand: 72 },
      { year: '2023', demand: 74 },
      { year: '2024', demand: 75 },
      { year: '2025', demand: 76 }
    ],
    advantages: ['طلب متزايد', 'رواتب جيدة', 'مطلوب في عدة قطاعات'],
    disadvantages: ['صعوبة عالية', 'يحتاج تأسيس قوي'],
    certificates: [
      'Data Analytics',
      'SAS Certification',
      'R Programming',
      'Business Intelligence'
    ]
  },

  islamic: {
    id: 'islamic',
    name: 'الشريعة والدراسات الإسلامية',
    icon: '📿',
    demandLevel: 72,
    salary: { min: 600, max: 1100, avg: 800 },
    difficulty: 'متوسط',
    studyYears: 4,
    registeredDiwan: 3200,
    hiredPerYear: 180,
    waitingMonths: 20,
    employers: ['وزارة الأوقاف والشؤون الإسلامية', 'وزارة التربية', 'المحاكم الشرعية', 'المساجد'],
    requiredSkills: ['memorization', 'communication'],
    studyType: ['theoretical', 'easy'],
    marketTrend: [
      { year: '2020', demand: 70 },
      { year: '2021', demand: 71 },
      { year: '2022', demand: 71 },
      { year: '2023', demand: 72 },
      { year: '2024', demand: 72 },
      { year: '2025', demand: 72 }
    ],
    advantages: ['طلب مستمر', 'أمان وظيفي', 'قيمة دينية'],
    disadvantages: ['راتب متوسط', 'محدود في التوظيف'],
    certificates: [
      'الإجازة في القرآن',
      'الإفتاء الشرعي',
      'الوعظ والإرشاد',
      'القضاء الشرعي'
    ]
  },

  politicalScience: {
    id: 'politicalScience',
    name: 'العلوم السياسية',
    icon: '🏛️',
    demandLevel: 55,
    salary: { min: 600, max: 1300, avg: 850 },
    difficulty: 'متوسط',
    studyYears: 4,
    registeredDiwan: 1800,
    hiredPerYear: 65,
    waitingMonths: 36,
    employers: ['وزارة الخارجية', 'مجلس الأمة', 'مراكز الأبحاث', 'الجهات الدبلوماسية'],
    requiredSkills: ['communication', 'memorization', 'research'],
    studyType: ['theoretical', 'easy'],
    marketTrend: [
      { year: '2020', demand: 58 },
      { year: '2021', demand: 57 },
      { year: '2022', demand: 56 },
      { year: '2023', demand: 55 },
      { year: '2024', demand: 55 },
      { year: '2025', demand: 55 }
    ],
    advantages: ['مجال مرموق', 'فرص دبلوماسية', 'تحليل سياسي'],
    disadvantages: ['فرص محدودة', 'منافسة عالية', 'انتظار طويل'],
    certificates: [
      'Diplomatic Studies',
      'International Relations',
      'Political Analysis',
      'Public Policy'
    ]
  },

  sociology: {
    id: 'sociology',
    name: 'علم الاجتماع',
    icon: '👥',
    demandLevel: 59,
    salary: { min: 600, max: 1100, avg: 800 },
    difficulty: 'سهل',
    studyYears: 4,
    registeredDiwan: 1500,
    hiredPerYear: 75,
    waitingMonths: 32,
    employers: ['وزارة الشؤون الاجتماعية', 'مراكز الأبحاث', 'الجامعات', 'المؤسسات الخيرية'],
    requiredSkills: ['communication', 'research'],
    studyType: ['theoretical', 'easy'],
    marketTrend: [
      { year: '2020', demand: 58 },
      { year: '2021', demand: 58 },
      { year: '2022', demand: 59 },
      { year: '2023', demand: 59 },
      { year: '2024', demand: 59 },
      { year: '2025', demand: 59 }
    ],
    advantages: ['فهم المجتمع', 'عمل بحثي', 'مجال إنساني'],
    disadvantages: ['فرص محدودة', 'راتب متوسط'],
    certificates: [
      'Social Research Methods',
      'Community Development',
      'Survey Design',
      'Data Analysis'
    ]
  }
};

// ========================================
// قوائم المهارات والاهتمامات والتفضيلات
// Skills, Interests, and Study Preferences Lists
// ========================================

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
];

export const interestsData = [
  { id: 'health', name: 'الصحة والطب', icon: '⚕️' },
  { id: 'tech', name: 'التقنية والبرمجة', icon: '💻' },
  { id: 'business', name: 'الأعمال والمال', icon: '💼' },
  { id: 'law', name: 'القانون والعدالة', icon: '⚖️' },
  { id: 'construction', name: 'البناء والتشييد', icon: '🏗️' },
  { id: 'education', name: 'التعليم والتدريب', icon: '📚' },
  { id: 'art', name: 'الفنون والتصميم', icon: '🎨' },
  { id: 'science', name: 'العلوم والبحث', icon: '🔬' },
];

export const studyTypesData = [
  { id: 'practical', name: 'عملي وتطبيقي', icon: '🛠️' },
  { id: 'theoretical', name: 'نظري ودراسي', icon: '📖' },
  { id: 'easy', name: 'سهل نسبياً', icon: '😊' },
  { id: 'challenging', name: 'يحتاج اجتهاد', icon: '💪' },
  { id: 'short', name: 'مدة دراسة قصيرة', icon: '⏱️' },
  { id: 'long', name: 'استثمار طويل المدى', icon: '📅' },
];
