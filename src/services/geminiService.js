// ========================================
// Gemini AI Service - تحديثات سوق العمل
// Market Updates powered by Google Gemini
// ========================================

const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE'; // ⚠️ استبدل هذا بـ API key الخاص بك
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// ========================================
// تحليل أخبار سوق العمل الكويتي
// Analyze Kuwait job market news
// ========================================
export async function getMarketUpdates() {
  try {
    // Check if API key is set
    if (GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
      console.warn('⚠️ Gemini API Key not set. Using mock data.');
      return getMockMarketUpdates();
    }

    const prompt = `
أنت محلل سوق عمل متخصص في الكويت. قم بتحليل أحدث اتجاهات سوق العمل الكويتي في 2025.

أريد منك تقرير مختصر يحتوي على:
1. التخصصات الأكثر طلباً حالياً (3-5 تخصصات)
2. التخصصات التي انخفض الطلب عليها
3. تخصصات جديدة أو ناشئة
4. توقعات قصيرة المدى (6 أشهر)
5. نصيحة واحدة للطلاب

أعطني الإجابة بصيغة JSON فقط بدون أي نص إضافي:
{
  "lastUpdated": "2025-01-15",
  "topDemandMajors": [
    {"name": "اسم التخصص", "change": "+15%", "reason": "السبب"}
  ],
  "decliningMajors": [
    {"name": "اسم التخصص", "change": "-5%", "reason": "السبب"}
  ],
  "emergingFields": ["تخصص جديد 1", "تخصص جديد 2"],
  "shortTermForecast": "توقعات مختصرة",
  "studentAdvice": "نصيحة مختصرة"
}
`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.status}`);
    }

    const data = await response.json();
    const textResponse = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from response
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const marketData = JSON.parse(jsonMatch[0]);
      
      // Cache the results
      localStorage.setItem('tawjeeh-market-updates', JSON.stringify({
        data: marketData,
        timestamp: new Date().toISOString()
      }));
      
      return marketData;
    } else {
      throw new Error('Failed to parse Gemini response');
    }

  } catch (error) {
    console.error('Error fetching market updates:', error);
    
    // Try to return cached data
    const cached = localStorage.getItem('tawjeeh-market-updates');
    if (cached) {
      const { data } = JSON.parse(cached);
      console.log('📦 Using cached market data');
      return data;
    }
    
    // Fallback to mock data
    return getMockMarketUpdates();
  }
}

// ========================================
// تحديثات وهمية للتجربة
// Mock updates for testing/demo
// ========================================
function getMockMarketUpdates() {
  return {
    lastUpdated: new Date().toISOString().split('T')[0],
    topDemandMajors: [
      {
        name: "الأمن السيبراني",
        change: "+25%",
        reason: "زيادة التهديدات السيبرانية وتحول رقمي في القطاع الحكومي"
      },
      {
        name: "الذكاء الاصطناعي",
        change: "+32%",
        reason: "تطبيق رؤية الكويت 2035 والاستثمار في التقنيات الحديثة"
      },
      {
        name: "التمريض",
        change: "+20%",
        reason: "توسع القطاع الصحي وافتتاح مستشفيات جديدة"
      },
      {
        name: "نظم المعلومات الإدارية",
        change: "+18%",
        reason: "التحول الرقمي في جميع الجهات الحكومية"
      },
      {
        name: "الإحصاء وتحليل البيانات",
        change: "+22%",
        reason: "الحاجة لاتخاذ قرارات مبنية على البيانات"
      }
    ],
    decliningMajors: [
      {
        name: "القانون",
        change: "-3%",
        reason: "تشبع السوق وطول فترة الانتظار في الديوان"
      },
      {
        name: "الهندسة المعمارية",
        change: "-5%",
        reason: "تباطؤ في مشاريع البناء الحكومية"
      }
    ],
    emergingFields: [
      "تحليل البيانات الضخمة (Big Data)",
      "الطاقة المتجددة والاستدامة",
      "تطوير تطبيقات الهاتف المحمول",
      "التسويق الرقمي والتجارة الإلكترونية",
      "الأمن الغذائي والزراعة الحديثة"
    ],
    shortTermForecast: "يتوقع استمرار الطلب العالي على التخصصات التقنية خلال الأشهر الستة القادمة، مع بدء توظيف 500+ وظيفة في القطاع الصحي. الحكومة أعلنت عن مبادرة جديدة لتوطين 30% من وظائف القطاع الخاص في المجالات التقنية.",
    studentAdvice: "ركز على التخصصات التقنية والصحية، واحرص على الحصول على شهادات مهنية إضافية. الشهادات الجامعية وحدها لم تعد كافية - المهارات العملية والخبرات التدريبية أصبحت ضرورية للتوظيف السريع."
  };
}

// ========================================
// تحليل تخصص معين
// Analyze specific major
// ========================================
export async function analyzeMajor(majorName) {
  try {
    if (GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
      return getMockMajorAnalysis(majorName);
    }

    const prompt = `
قم بتحليل سريع لتخصص "${majorName}" في سوق العمل الكويتي:
1. الوضع الحالي (جملة واحدة)
2. التوقعات (جملة واحدة)
3. نصيحة سريعة (جملة واحدة)

أعطني JSON فقط:
{
  "status": "نص قصير",
  "forecast": "نص قصير",
  "advice": "نص قصير"
}
`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    const data = await response.json();
    const textResponse = data.candidates[0].content.parts[0].text;
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return getMockMajorAnalysis(majorName);
  } catch (error) {
    console.error('Error analyzing major:', error);
    return getMockMajorAnalysis(majorName);
  }
}

function getMockMajorAnalysis(majorName) {
  const analyses = {
    "default": {
      status: "طلب مستقر مع نمو متوقع في السنوات القادمة",
      forecast: "يتوقع زيادة الطلب بنسبة 5-10% خلال العامين القادمين",
      advice: "احصل على شهادات مهنية إضافية لتعزيز فرصك"
    },
    "tech": {
      status: "طلب مرتفع جداً مع نقص في الكوادر المؤهلة",
      forecast: "نمو سريع متوقع مع التحول الرقمي المتسارع",
      advice: "ركز على المهارات العملية والمشاريع الحقيقية"
    },
    "health": {
      status: "طلب عالي ومستمر مع توسع القطاع الصحي",
      forecast: "احتياج متزايد مع افتتاح مستشفيات جديدة",
      advice: "احصل على خبرة عملية مبكرة أثناء الدراسة"
    }
  };

  // Determine category based on major name
  if (majorName.includes('حاسب') || majorName.includes('تقنية') || majorName.includes('ذكاء')) {
    return analyses.tech;
  } else if (majorName.includes('طب') || majorName.includes('صحة') || majorName.includes('تمريض')) {
    return analyses.health;
  }
  
  return analyses.default;
}

// ========================================
// التحقق من صلاحية API Key
// Check if API key is valid
// ========================================
export function isGeminiConfigured() {
  return GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE';
}

// ========================================
// الحصول على آخر تحديث من الذاكرة
// Get last cached update
// ========================================
export function getCachedMarketUpdates() {
  try {
    const cached = localStorage.getItem('tawjeeh-market-updates');
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      
      // Check if cache is less than 24 hours old
      const cacheAge = Date.now() - new Date(timestamp).getTime();
      const isValid = cacheAge < 24 * 60 * 60 * 1000; // 24 hours
      
      return { data, isValid, timestamp };
    }
  } catch (error) {
    console.error('Error reading cached updates:', error);
  }
  return null;
}
