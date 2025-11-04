// ========================================
// محرك التوصيات الذكي - Tawjeeh AI
// Smart Recommendation Engine
// ========================================

import { majorsData } from '../data/majors.js';
import { marketTrends, getWaitingPeriod, analyzeMajorGrowth } from '../data/marketData.js';

// ========================================
// نظام الأوزان لكل عامل
// Scoring Weights System
// ========================================
const WEIGHTS = {
  interests: 0.40,      // 40% - الاهتمامات
  skills: 0.35,         // 35% - المهارات
  preferences: 0.15,    // 15% - التفضيلات الدراسية
  marketDemand: 0.10    // 10% - طلب السوق
};

// ========================================
// مصفوفة المطابقة: الاهتمامات → التخصصات
// Interest-to-Major Mapping Matrix
// ========================================
const INTEREST_MAPPING = {
  // اهتمامات تقنية
  "التعامل مع الأرقام": ["علوم الحاسب وتقنية المعلومات", "الذكاء الاصطناعي", "المحاسبة", "هندسة البترول"],
  "البرمجة والتكنولوجيا": ["علوم الحاسب وتقنية المعلومات", "الذكاء الاصطناعي", "الأمن السيبراني"],
  "الابتكار والإبداع": ["الذكاء الاصطناعي", "الهندسة المدنية", "الإعلام والاتصال", "علوم الحاسب وتقنية المعلومات"],
  
  // اهتمامات هندسية
  "التصميم والتخطيط": ["الهندسة المدنية", "الهندسة الكهربائية", "الهندسة الميكانيكية", "هندسة البترول"],
  "حل المشاكل التقنية": ["الهندسة الكهربائية", "الهندسة الميكانيكية", "علوم الحاسب وتقنية المعلومات", "الأمن السيبراني"],
  
  // اهتمامات صحية
  "مساعدة الناس": ["الطب البشري", "طب الأسنان", "الصيدلة", "التمريض", "علم النفس"],
  "العلوم الطبية": ["الطب البشري", "طب الأسنان", "الصيدلة", "التمريض"],
  
  // اهتمامات أعمال
  "المال والاستثمار": ["المالية والخدمات البنكية", "المحاسبة", "إدارة الأعمال"],
  "القيادة وإدارة الفرق": ["إدارة الأعمال", "المالية والخدمات البنكية"],
  
  // اهتمامات قانونية
  "القانون والعدالة": ["القانون"],
  
  // اهتمامات تعليمية
  "التدريس والتوجيه": ["التربية والتعليم", "اللغة الإنجليزية"],
  
  // اهتمامات إعلامية
  "الكتابة والتواصل": ["الإعلام والاتصال", "اللغة الإنجليزية"],
  
  // اهتمامات علمية
  "البحث العلمي": ["الذكاء الاصطناعي", "العلوم البيئية", "علم النفس", "الطب البشري"],
  "البيئة والاستدامة": ["العلوم البيئية", "الهندسة المدنية"]
};

// ========================================
// مصفوفة المطابقة: المهارات → التخصصات
// Skills-to-Major Mapping Matrix
// ========================================
const SKILLS_MAPPING = {
  // مهارات تقنية
  "البرمجة وكتابة الأكواد": ["علوم الحاسب وتقنية المعلومات", "الذكاء الاصطناعي", "الأمن السيبراني"],
  "التفكير المنطقي": ["علوم الحاسب وتقنية المعلومات", "الذكاء الاصطناعي", "الهندسة الكهربائية", "المحاسبة"],
  "حل المشاكل المعقدة": ["الهندسة المدنية", "الهندسة الميكانيكية", "الذكاء الاصطناعي", "الأمن السيبراني"],
  
  // مهارات علمية
  "الرياضيات والإحصاء": ["الذكاء الاصطناعي", "المالية والخدمات البنكية", "المحاسبة", "الهندسة المدنية"],
  "الفيزياء والكيمياء": ["الهندسة الكهربائية", "هندسة البترول", "الصيدلة", "الهندسة الميكانيكية"],
  "البحث والتحليل": ["الطب البشري", "الصيدلة", "العلوم البيئية", "القانون"],
  
  // مهارات صحية
  "التعامل مع المرضى": ["الطب البشري", "طب الأسنان", "التمريض", "الصيدلة"],
  "الدقة والتركيز": ["الطب البشري", "طب الأسنان", "الصيدلة", "الهندسة الكهربائية"],
  
  // مهارات تواصل
  "التواصل مع الآخرين": ["التربية والتعليم", "الإعلام والاتصال", "إدارة الأعمال", "علم النفس"],
  "العمل الجماعي": ["إدارة الأعمال", "التربية والتعليم", "الطب البشري"],
  
  // مهارات إدارية ومالية
  "إدارة الوقت والموارد": ["إدارة الأعمال", "الهندسة المدنية", "المحاسبة"],
  "التخطيط المالي": ["المالية والخدمات البنكية", "المحاسبة", "إدارة الأعمال"],
  
  // مهارات لغوية وإبداعية
  "الكتابة والتعبير": ["الإعلام والاتصال", "اللغة الإنجليزية", "القانون"],
  "التصميم والابتكار": ["الهندسة المدنية", "الهندسة الميكانيكية", "الإعلام والاتصال"]
};

// ========================================
// مصفوفة المطابقة: التفضيلات → التخصصات
// Preferences-to-Major Mapping Matrix
// ========================================
const PREFERENCES_MAPPING = {
  // تفضيلات الدراسة
  "مدة دراسية قصيرة": ["التمريض", "المحاسبة", "إدارة الأعمال"],
  "دراسة عملية": ["التمريض", "الهندسة المدنية", "الهندسة الميكانيكية"],
  "دراسة نظرية": ["القانون", "اللغة الإنجليزية", "علم النفس"],
  "نظري وعملي": ["الطب البشري", "طب الأسنان", "الهندسة الكهربائية", "الصيدلة"],
  
  // بيئة العمل
  "عمل ميداني": ["الهندسة المدنية", "العلوم البيئية", "هندسة البترول"],
  "عمل مكتبي": ["المحاسبة", "إدارة الأعمال", "المالية والخدمات البنكية", "علوم الحاسب وتقنية المعلومات"],
  "استثمار طويل المدى": ["الطب البشري", "طب الأسنان", "هندسة البترول", "القانون"],
  
  // التوظيف
  "سجل نسبياً": ["المالية والخدمات البنكية", "إدارة الأعمال", "المحاسبة", "القانون"],
  "نظري وتراسي": ["القانون", "اللغة الإنجليزية", "الإعلام والاتصال"]
};

// ========================================
// دالة التحليل الرئيسية
// Main Analysis Function
// ========================================
export function analyzeStudent(assessmentData) {
  const { interests, skills, studyPreferences } = assessmentData;
  
  // 1. حساب النقاط لكل تخصص
  const majorScores = calculateMajorScores(interests, skills, studyPreferences);
  
  // 2. ترتيب التخصصات حسب النقاط
  const sortedMajors = sortMajorsByScore(majorScores);
  
  // 3. اختيار أفضل 5-6 تخصصات
  const topRecommendations = sortedMajors.slice(0, 6);
  
  // 4. إضافة بيانات السوق والتفاصيل
  const enrichedRecommendations = enrichRecommendations(topRecommendations);
  
  // 5. تحليل الشخصية
  const personalityProfile = analyzePersonality(interests, skills, studyPreferences);
  
  // 6. توصيات إضافية
  const additionalInsights = generateInsights(enrichedRecommendations, personalityProfile);
  
  return {
    recommendations: enrichedRecommendations,
    personalityProfile,
    insights: additionalInsights,
    timestamp: new Date().toISOString()
  };
}

// ========================================
// حساب النقاط لكل تخصص
// Calculate Scores for Each Major
// ========================================
function calculateMajorScores(interests, skills, preferences) {
  const scores = {};
  
  // تهيئة النقاط
  majorsData.forEach(major => {
    scores[major.name] = {
      interestsScore: 0,
      skillsScore: 0,
      preferencesScore: 0,
      marketScore: 0,
      totalScore: 0
    };
  });
  
  // 1. نقاط الاهتمامات (40%)
  interests.forEach(interest => {
    const matchingMajors = INTEREST_MAPPING[interest] || [];
    matchingMajors.forEach(majorName => {
      if (scores[majorName]) {
        scores[majorName].interestsScore += 1;
      }
    });
  });
  
  // 2. نقاط المهارات (35%)
  skills.forEach(skill => {
    const matchingMajors = SKILLS_MAPPING[skill] || [];
    matchingMajors.forEach(majorName => {
      if (scores[majorName]) {
        scores[majorName].skillsScore += 1;
      }
    });
  });
  
  // 3. نقاط التفضيلات (15%)
  preferences.forEach(pref => {
    const matchingMajors = PREFERENCES_MAPPING[pref] || [];
    matchingMajors.forEach(majorName => {
      if (scores[majorName]) {
        scores[majorName].preferencesScore += 0.5;
      }
    });
  });
  
  // 4. نقاط السوق (10%)
  majorsData.forEach(major => {
    const marketData = marketTrends.find(m => m.major.includes(major.name));
    if (marketData && scores[major.name]) {
      // النقاط بناءً على الطلب (demand من 0-100)
      scores[major.name].marketScore = marketData.demand / 20; // يعطي نقاط من 0-5
    }
  });
  
  // حساب المجموع النهائي بالأوزان
  Object.keys(scores).forEach(majorName => {
    const s = scores[majorName];
    s.totalScore = 
      (s.interestsScore * WEIGHTS.interests * 100) +
      (s.skillsScore * WEIGHTS.skills * 100) +
      (s.preferencesScore * WEIGHTS.preferences * 100) +
      (s.marketScore * WEIGHTS.marketDemand * 100);
  });
  
  return scores;
}

// ========================================
// ترتيب التخصصات حسب النقاط
// Sort Majors by Score
// ========================================
function sortMajorsByScore(scores) {
  return Object.entries(scores)
    .map(([name, scoreData]) => ({
      name,
      ...scoreData
    }))
    .filter(major => major.totalScore > 0) // فقط التخصصات اللي حصلت نقاط
    .sort((a, b) => b.totalScore - a.totalScore);
}

// ========================================
// إثراء التوصيات ببيانات السوق
// Enrich Recommendations with Market Data
// ========================================
function enrichRecommendations(topMajors) {
  return topMajors.map((scoredMajor, index) => {
    // البحث عن التخصص في قاعدة البيانات
    const majorData = majorsData.find(m => m.name === scoredMajor.name);
    const marketData = marketTrends.find(m => m.major.includes(scoredMajor.name));
    const waitingPeriod = getWaitingPeriod(scoredMajor.name);
    const growthAnalysis = analyzeMajorGrowth(scoredMajor.name);
    
    // حساب نسبة التطابق المئوية
    const maxPossibleScore = 100 * (WEIGHTS.interests + WEIGHTS.skills + WEIGHTS.preferences + WEIGHTS.marketDemand);
    const matchPercentage = Math.round((scoredMajor.totalScore / maxPossibleScore) * 100);
    
    return {
      rank: index + 1,
      ...majorData,
      matchPercentage,
      scoreBreakdown: {
        interests: Math.round(scoredMajor.interestsScore * 10),
        skills: Math.round(scoredMajor.skillsScore * 10),
        preferences: Math.round(scoredMajor.preferencesScore * 10),
        marketDemand: Math.round(scoredMajor.marketScore * 2)
      },
      marketInsights: {
        demand: marketData?.demand || 0,
        growth: marketData?.growth || "N/A",
        waitingPeriod: waitingPeriod.waitingPeriod,
        priority: waitingPeriod.priority,
        outlook: growthAnalysis?.outlook || "متوسط"
      },
      recommendation: generateRecommendationText(matchPercentage, majorData, marketData)
    };
  });
}

// ========================================
// توليد نص التوصية
// Generate Recommendation Text
// ========================================
function generateRecommendationText(matchPercentage, majorData, marketData) {
  if (matchPercentage >= 85) {
    return `🌟 تطابق ممتاز! هذا التخصص مناسب جداً لك بناءً على اهتماماتك ومهاراتك. ${majorData?.description || ''}`;
  } else if (matchPercentage >= 70) {
    return `✅ تطابق جيد جداً! هذا التخصص يتوافق بشكل كبير مع قدراتك. ${majorData?.description || ''}`;
  } else if (matchPercentage >= 60) {
    return `👍 تطابق جيد! يمكنك التفكير في هذا التخصص كخيار قوي. ${majorData?.description || ''}`;
  } else {
    return `💡 خيار محتمل. قد يكون مناسباً مع بعض التطوير في المهارات المطلوبة. ${majorData?.description || ''}`;
  }
}

// ========================================
// تحليل الشخصية
// Analyze Personality Profile
// ========================================
function analyzePersonality(interests, skills, preferences) {
  const profile = {
    type: "",
    strengths: [],
    learningStyle: "",
    workEnvironment: "",
    description: ""
  };
  
  // تحديد النمط الشخصي
  const techInterests = interests.filter(i => 
    i.includes("تكنولوجيا") || i.includes("برمجة") || i.includes("أرقام")
  ).length;
  
  const peopleInterests = interests.filter(i => 
    i.includes("مساعدة") || i.includes("تواصل") || i.includes("تدريس")
  ).length;
  
  const creativeInterests = interests.filter(i => 
    i.includes("ابتكار") || i.includes("تصميم") || i.includes("كتابة")
  ).length;
  
  const analyticalInterests = interests.filter(i => 
    i.includes("تحليل") || i.includes("بحث") || i.includes("حل المشاكل")
  ).length;
  
  // تحديد النمط الأساسي
  if (techInterests >= 2) {
    profile.type = "تقني ومنطقي";
    profile.description = "شخصية تميل للتكنولوجيا والتفكير المنطقي والتحليلي.";
  } else if (peopleInterests >= 2) {
    profile.type = "اجتماعي ومساعد";
    profile.description = "شخصية تحب التعامل مع الناس ومساعدة الآخرين.";
  } else if (creativeInterests >= 2) {
    profile.type = "مبدع ومبتكر";
    profile.description = "شخصية إبداعية تحب الابتكار والتصميم.";
  } else if (analyticalInterests >= 2) {
    profile.type = "تحليلي وباحث";
    profile.description = "شخصية تحب البحث والتحليل وحل المشاكل المعقدة.";
  } else {
    profile.type = "متوازن ومتعدد المواهب";
    profile.description = "شخصية متوازنة تجمع بين عدة اهتمامات.";
  }
  
  // نقاط القوة
  profile.strengths = skills.slice(0, 5);
  
  // أسلوب التعلم
  if (preferences.includes("دراسة عملية")) {
    profile.learningStyle = "عملي (Hands-on)";
  } else if (preferences.includes("دراسة نظرية")) {
    profile.learningStyle = "نظري (Theoretical)";
  } else {
    profile.learningStyle = "متوازن (نظري + عملي)";
  }
  
  // بيئة العمل المفضلة
  if (preferences.includes("عمل ميداني")) {
    profile.workEnvironment = "ميداني ومتنقل";
  } else if (preferences.includes("عمل مكتبي")) {
    profile.workEnvironment = "مكتبي ومنظم";
  } else {
    profile.workEnvironment = "مرن ومتنوع";
  }
  
  return profile;
}

// ========================================
// توليد رؤى إضافية
// Generate Additional Insights
// ========================================
function generateInsights(recommendations, profile) {
  const insights = {
    topSectors: [],
    careerAdvice: [],
    certifications: [],
    nextSteps: []
  };
  
  // أفضل القطاعات للطالب
  const sectors = {};
  recommendations.forEach(rec => {
    const sector = rec.category;
    sectors[sector] = (sectors[sector] || 0) + 1;
  });
  
  insights.topSectors = Object.entries(sectors)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([sector]) => sector);
  
  // نصائح مهنية
  if (profile.type.includes("تقني")) {
    insights.careerAdvice = [
      "ركز على تطوير مهارات البرمجة باستمرار",
      "احصل على شهادات تقنية معتمدة",
      "شارك في مشاريع عملية ومسابقات برمجية"
    ];
  } else if (profile.type.includes("اجتماعي")) {
    insights.careerAdvice = [
      "طور مهارات التواصل والعمل الجماعي",
      "شارك في الأعمال التطوعية",
      "احصل على خبرات عملية في التعامل مع الجمهور"
    ];
  } else {
    insights.careerAdvice = [
      "طور مهاراتك في المجالات التي تهمك",
      "ابحث عن فرص تدريبية",
      "استفد من الدورات الإلكترونية المجانية"
    ];
  }
  
  // الشهادات المقترحة
  const topMajor = recommendations[0];
  if (topMajor?.certificates) {
    insights.certifications = topMajor.certificates.slice(0, 3);
  }
  
  // الخطوات التالية
  insights.nextSteps = [
    "راجع التخصصات المقترحة بعناية",
    "تحدث مع طلاب أو خريجين في هذه التخصصات",
    "زر الجامعات واحضر أيام التوجيه المهني",
    "ابحث عن فرص تدريبية صيفية في المجال",
    "استشر أهلك ومرشديك الأكاديميين"
  ];
  
  return insights;
}

// ========================================
// دوال مساعدة إضافية
// Additional Helper Functions
// ========================================

// مقارنة بين توصيتين
export function compareRecommendations(rec1, rec2) {
  return {
    salaryDifference: Math.abs(
      parseInt(rec1.avgSalary) - parseInt(rec2.avgSalary)
    ),
    demandDifference: Math.abs(
      rec1.marketInsights.demand - rec2.marketInsights.demand
    ),
    betterSalary: parseInt(rec1.avgSalary) > parseInt(rec2.avgSalary) ? rec1.name : rec2.name,
    betterDemand: rec1.marketInsights.demand > rec2.marketInsights.demand ? rec1.name : rec2.name
  };
}

// الحصول على تخصصات بديلة
export function getAlternativeMajors(currentMajor, allRecommendations) {
  const current = allRecommendations.find(r => r.name === currentMajor);
  if (!current) return [];
  
  return allRecommendations
    .filter(r => r.category === current.category && r.name !== currentMajor)
    .slice(0, 3);
}

// تصدير البيانات للطباعة أو الحفظ
export function exportResults(analysisResults) {
  return {
    generatedDate: new Date().toLocaleDateString('ar-KW'),
    studentProfile: analysisResults.personalityProfile,
    recommendations: analysisResults.recommendations.map(rec => ({
      rank: rec.rank,
      name: rec.name,
      matchPercentage: rec.matchPercentage,
      avgSalary: rec.avgSalary,
      demand: rec.marketInsights.demand
    })),
    insights: analysisResults.insights
  };
}
