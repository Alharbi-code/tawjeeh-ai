// ========================================
// بيانات سوق العمل الكويتي 2025
// Kuwait Job Market Data 2025
// ========================================

// ========================================
// اتجاهات السوق لجميع التخصصات
// Market Trends for All Majors
// ========================================
export const marketTrends = [
  // التقنية
  { id: 1, major: "علوم الحاسب وتقنية المعلومات", demand: 88, avgSalary: 1150, growth: "+18%", sector: "تقنية" },
  { id: 2, major: "الأمن السيبراني", demand: 92, avgSalary: 1250, growth: "+25%", sector: "تقنية" },
  { id: 3, major: "الذكاء الاصطناعي", demand: 95, avgSalary: 1300, growth: "+32%", sector: "تقنية" },
  
  // الهندسة
  { id: 4, major: "الهندسة المدنية", demand: 76, avgSalary: 1050, growth: "+12%", sector: "هندسة" },
  { id: 5, major: "الهندسة الكهربائية", demand: 78, avgSalary: 1100, growth: "+10%", sector: "هندسة" },
  { id: 6, major: "الهندسة الميكانيكية", demand: 72, avgSalary: 1000, growth: "+8%", sector: "هندسة" },
  { id: 7, major: "هندسة البترول", demand: 65, avgSalary: 1400, growth: "+5%", sector: "هندسة" },
  
  // الصحة
  { id: 8, major: "الطب البشري", demand: 90, avgSalary: 1850, growth: "+15%", sector: "صحة" },
  { id: 9, major: "طب الأسنان", demand: 82, avgSalary: 1650, growth: "+12%", sector: "صحة" },
  { id: 10, major: "الصيدلة", demand: 75, avgSalary: 1100, growth: "+9%", sector: "صحة" },
  { id: 11, major: "التمريض", demand: 96, avgSalary: 800, growth: "+20%", sector: "صحة" },
  
  // الأعمال
  { id: 12, major: "المالية والخدمات البنكية", demand: 74, avgSalary: 900, growth: "+11%", sector: "أعمال" },
  { id: 13, major: "إدارة الأعمال", demand: 68, avgSalary: 850, growth: "+7%", sector: "أعمال" },
  { id: 14, major: "المحاسبة", demand: 73, avgSalary: 900, growth: "+8%", sector: "أعمال" },
  
  // القانون
  { id: 15, major: "القانون", demand: 62, avgSalary: 1000, growth: "+6%", sector: "قانون" },
  
  // التعليم
  { id: 16, major: "التربية والتعليم", demand: 80, avgSalary: 800, growth: "+10%", sector: "تعليم" },
  
  // الإعلام
  { id: 17, major: "الإعلام والاتصال", demand: 64, avgSalary: 850, growth: "+9%", sector: "إعلام" },
  
  // العلوم
  { id: 18, major: "العلوم البيئية", demand: 70, avgSalary: 900, growth: "+14%", sector: "علوم" },
  
  // اللغات
  { id: 19, major: "اللغة الإنجليزية", demand: 69, avgSalary: 750, growth: "+8%", sector: "لغات" },
  
  // العلوم الإنسانية
  { id: 20, major: "علم النفس", demand: 67, avgSalary: 850, growth: "+11%", sector: "علوم إنسانية" }
];

// ========================================
// التخصصات الأكثر طلباً (Top 10)
// Most In-Demand Majors
// ========================================
export const topDemandMajors = [
  { rank: 1, major: "التمريض", demand: 96, jobOpenings: 450 },
  { rank: 2, major: "الذكاء الاصطناعي", demand: 95, jobOpenings: 95 },
  { rank: 3, major: "الأمن السيبراني", demand: 92, jobOpenings: 120 },
  { rank: 4, major: "الطب البشري", demand: 90, jobOpenings: 180 },
  { rank: 5, major: "علوم الحاسب وتقنية المعلومات", demand: 88, jobOpenings: 280 },
  { rank: 6, major: "طب الأسنان", demand: 82, jobOpenings: 120 },
  { rank: 7, major: "التربية والتعليم", demand: 80, jobOpenings: 600 },
  { rank: 8, major: "الهندسة الكهربائية", demand: 78, jobOpenings: 180 },
  { rank: 9, major: "الهندسة المدنية", demand: 76, jobOpenings: 320 },
  { rank: 10, major: "الصيدلة", demand: 75, jobOpenings: 140 }
];

// ========================================
// التخصصات الأعلى راتباً (Top 10)
// Highest Paying Majors
// ========================================
export const highestPayingMajors = [
  { rank: 1, major: "الطب البشري", avgSalary: 1850, maxSalary: 3000 },
  { rank: 2, major: "طب الأسنان", avgSalary: 1650, maxSalary: 2500 },
  { rank: 3, major: "هندسة البترول", avgSalary: 1400, maxSalary: 2000 },
  { rank: 4, major: "الذكاء الاصطناعي", avgSalary: 1300, maxSalary: 2200 },
  { rank: 5, major: "الأمن السيبراني", avgSalary: 1250, maxSalary: 2000 },
  { rank: 6, major: "علوم الحاسب وتقنية المعلومات", avgSalary: 1150, maxSalary: 1800 },
  { rank: 7, major: "الصيدلة", avgSalary: 1100, maxSalary: 1600 },
  { rank: 8, major: "الهندسة الكهربائية", avgSalary: 1100, maxSalary: 1700 },
  { rank: 9, major: "الهندسة المدنية", avgSalary: 1050, maxSalary: 1600 },
  { rank: 10, major: "الهندسة الميكانيكية", avgSalary: 1000, maxSalary: 1500 }
];

// ========================================
// التخصصات الأسرع نمواً
// Fastest Growing Majors
// ========================================
export const fastestGrowingMajors = [
  { rank: 1, major: "الذكاء الاصطناعي", growth: "+32%", reason: "التحول الرقمي ورؤية 2035" },
  { rank: 2, major: "الأمن السيبراني", growth: "+25%", reason: "زيادة التهديدات السيبرانية" },
  { rank: 3, major: "التمريض", growth: "+20%", reason: "توسع القطاع الصحي" },
  { rank: 4, major: "علوم الحاسب وتقنية المعلومات", growth: "+18%", reason: "الحكومة الإلكترونية" },
  { rank: 5, major: "الطب البشري", growth: "+15%", reason: "شيخوخة السكان وزيادة الطلب" },
  { rank: 6, major: "العلوم البيئية", growth: "+14%", reason: "التركيز على الاستدامة" },
  { rank: 7, major: "طب الأسنان", growth: "+12%", reason: "ارتفاع الوعي الصحي" },
  { rank: 8, major: "الهندسة المدنية", growth: "+12%", reason: "مشاريع البنية التحتية" },
  { rank: 9, major: "المالية والخدمات البنكية", growth: "+11%", reason: "التكنولوجيا المالية (FinTech)" },
  { rank: 10, major: "علم النفس", growth: "+11%", reason: "زيادة الوعي بالصحة النفسية" }
];

// ========================================
// توزيع الوظائف حسب القطاع
// Job Distribution by Sector
// ========================================
export const sectorDistribution = {
  government: {
    name: "القطاع الحكومي",
    percentage: 68,
    avgSalary: 950,
    benefits: ["تأمين صحي شامل", "إجازات سنوية", "راتب تقاعدي", "بدلات متعددة"],
    topEmployers: [
      "وزارة الصحة (12,000 موظف)",
      "وزارة التربية (15,000 موظف)",
      "وزارة الكهرباء والماء (8,500 موظف)",
      "مؤسسة البترول الكويتية (7,200 موظف)"
    ]
  },
  private: {
    name: "القطاع الخاص",
    percentage: 32,
    avgSalary: 1100,
    benefits: ["رواتب أعلى", "مرونة في العمل", "فرص تطوير سريعة"],
    topEmployers: [
      "البنوك (5,400 موظف)",
      "شركات التكنولوجيا (3,200 موظف)",
      "شركات الهندسة (4,800 موظف)",
      "القطاع الصحي الخاص (2,900 موظف)"
    ]
  }
};

// ========================================
// فترات الانتظار في ديوان الخدمة المدنية
// Civil Service Commission Waiting Periods
// ========================================
export const civilServiceWaitingPeriods = [
  { major: "التمريض", waitingPeriod: "فوري", months: 0, priority: "عاجل جداً" },
  { major: "الطب البشري", waitingPeriod: "فوري - 3 أشهر", months: 2, priority: "عاجل" },
  { major: "الأمن السيبراني", waitingPeriod: "3-6 أشهر", months: 4, priority: "مرتفع" },
  { major: "الذكاء الاصطناعي", waitingPeriod: "3-6 أشهر", months: 4, priority: "مرتفع" },
  { major: "طب الأسنان", waitingPeriod: "3-6 أشهر", months: 4, priority: "مرتفع" },
  { major: "الصيدلة", waitingPeriod: "6-9 أشهر", months: 7, priority: "متوسط" },
  { major: "علوم الحاسب وتقنية المعلومات", waitingPeriod: "6-9 أشهر", months: 7, priority: "متوسط" },
  { major: "الهندسة الكهربائية", waitingPeriod: "7-10 أشهر", months: 8, priority: "متوسط" },
  { major: "التربية والتعليم", waitingPeriod: "6-12 شهر", months: 9, priority: "متوسط" },
  { major: "اللغة الإنجليزية", waitingPeriod: "8-14 شهر", months: 11, priority: "متوسط" },
  { major: "الهندسة المدنية", waitingPeriod: "9-12 شهر", months: 10, priority: "متوسط" },
  { major: "المالية والخدمات البنكية", waitingPeriod: "9-12 شهر", months: 10, priority: "متوسط" },
  { major: "المحاسبة", waitingPeriod: "9-14 شهر", months: 11, priority: "متوسط" },
  { major: "الهندسة الميكانيكية", waitingPeriod: "10-14 شهر", months: 12, priority: "منخفض" },
  { major: "العلوم البيئية", waitingPeriod: "10-16 شهر", months: 13, priority: "منخفض" },
  { major: "علم النفس", waitingPeriod: "10-16 شهر", months: 13, priority: "منخفض" },
  { major: "هندسة البترول", waitingPeriod: "12-18 شهر", months: 15, priority: "منخفض" },
  { major: "الإعلام والاتصال", waitingPeriod: "12-18 شهر", months: 15, priority: "منخفض" },
  { major: "إدارة الأعمال", waitingPeriod: "12-18 شهر", months: 15, priority: "منخفض" },
  { major: "القانون", waitingPeriod: "14-24 شهر", months: 19, priority: "منخفض جداً" }
];

// ========================================
// توقعات السوق للسنوات القادمة (2025-2030)
// Market Forecasts (2025-2030)
// ========================================
export const marketForecasts = {
  "2025": {
    totalJobs: 45000,
    topSectors: ["تقنية", "صحة", "تعليم"],
    emergingFields: ["الذكاء الاصطناعي", "الأمن السيبراني", "البيانات الضخمة"]
  },
  "2026": {
    totalJobs: 48000,
    topSectors: ["تقنية", "طاقة متجددة", "صحة"],
    emergingFields: ["Blockchain", "IoT", "الطاقة المتجددة"]
  },
  "2027": {
    totalJobs: 51000,
    topSectors: ["تقنية", "بيئة", "صحة"],
    emergingFields: ["الاستدامة", "المدن الذكية", "الطب الرقمي"]
  },
  "2028": {
    totalJobs: 54000,
    topSectors: ["تقنية", "روبوتات", "تعليم"],
    emergingFields: ["الروبوتات", "التعليم الإلكتروني", "الميتافيرس"]
  },
  "2030": {
    totalJobs: 60000,
    topSectors: ["تقنية متقدمة", "فضاء", "بيئة"],
    emergingFields: ["تقنية الفضاء", "الاقتصاد الأخضر", "الحوسبة الكمومية"]
  }
};

// ========================================
// إحصائيات سوق العمل العامة
// General Job Market Statistics
// ========================================
export const marketStatistics = {
  totalEmployees: 485000,
  totalGraduates2024: 12500,
  employmentRate: 92.3,
  averageSalary: 1050,
  privateToPublicRatio: "32:68",
  femaleParticipation: 48.5,
  youthUnemployment: 7.2,
  avgJobSearchTime: "8 أشهر"
};

// ========================================
// Functions مساعدة
// Helper Functions
// ========================================

// الحصول على بيانات تخصص معين
export const getMajorMarketData = (majorName) => {
  return marketTrends.find(m => m.major.includes(majorName) || majorName.includes(m.major));
};

// ترتيب التخصصات حسب الطلب
export const sortByDemand = () => {
  return [...marketTrends].sort((a, b) => b.demand - a.demand);
};

// ترتيب التخصصات حسب الراتب
export const sortBySalary = () => {
  return [...marketTrends].sort((a, b) => b.avgSalary - a.avgSalary);
};

// فلترة حسب القطاع
export const filterBySector = (sector) => {
  return marketTrends.filter(m => m.sector === sector);
};

// الحصول على فترة الانتظار
export const getWaitingPeriod = (majorName) => {
  const found = civilServiceWaitingPeriods.find(
    m => m.major.includes(majorName) || majorName.includes(m.major)
  );
  return found || { waitingPeriod: "غير محدد", months: 12, priority: "متوسط" };
};

// تحليل نمو التخصص
export const analyzeMajorGrowth = (majorName) => {
  const marketData = getMajorMarketData(majorName);
  const growthData = fastestGrowingMajors.find(
    m => m.major.includes(majorName) || majorName.includes(m.major)
  );
  
  if (!marketData) return null;
  
  return {
    ...marketData,
    growthDetails: growthData,
    outlook: marketData.demand >= 80 ? "ممتاز" : 
             marketData.demand >= 70 ? "جيد جداً" :
             marketData.demand >= 60 ? "جيد" : "متوسط"
  };
};

// مقارنة بين تخصصين
export const compareMajors = (major1, major2) => {
  const data1 = getMajorMarketData(major1);
  const data2 = getMajorMarketData(major2);
  
  if (!data1 || !data2) return null;
  
  return {
    demand: {
      winner: data1.demand > data2.demand ? major1 : major2,
      difference: Math.abs(data1.demand - data2.demand)
    },
    salary: {
      winner: data1.avgSalary > data2.avgSalary ? major1 : major2,
      difference: Math.abs(data1.avgSalary - data2.avgSalary)
    },
    growth: {
      major1: data1.growth,
      major2: data2.growth
    }
  };
};

// الحصول على التخصصات المشابهة
export const getSimilarMajors = (majorName, count = 3) => {
  const current = getMajorMarketData(majorName);
  if (!current) return [];
  
  return marketTrends
    .filter(m => m.sector === current.sector && m.major !== current.major)
    .slice(0, count);
};

// حساب متوسط الراتب لقطاع معين
export const getAverageSalaryBySector = (sector) => {
  const majors = filterBySector(sector);
  if (majors.length === 0) return 0;
  
  const total = majors.reduce((sum, m) => sum + m.avgSalary, 0);
  return Math.round(total / majors.length);
};

// الحصول على أفضل 5 تخصصات للمستقبل
export const getBestFutureMajors = () => {
  return marketTrends
    .filter(m => m.demand >= 80 && parseInt(m.growth) >= 10)
    .sort((a, b) => {
      const scoreA = m.demand * 0.6 + parseInt(m.growth) * 0.4;
      const scoreB = b.demand * 0.6 + parseInt(b.growth) * 0.4;
      return scoreB - scoreA;
    })
    .slice(0, 5);
};
