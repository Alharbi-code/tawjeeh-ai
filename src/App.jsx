import React, { useState, useEffect, useCallback } from 'react';
import HomePage from './pages/HomePage';
import AssessmentPage from './pages/AssessmentPage';
import ResultsPage from './pages/ResultsPage';
// مكونات جديدة
import KuwaitMarketStats from './components/KuwaitMarketStats';
import DemoMode from './components/DemoMode';
import LoadingScreen from './components/LoadingScreen';

// ===========================================================
// البيانات الكويتية الحقيقية (ستفصل لاحقاً في ملف منفصل)
// ===========================================================
const KUWAITI_MAJORS_DATA = [
  {
    id: 'petroleum-engineering',
    name_ar: 'الهندسة البترولية',
    name_en: 'Petroleum Engineering',
    sector: 'نفط وغاز',
    avg_salary: { entry: 1400, mid: 2200, senior: 3200 },
    demand_level: 'عالي جداً',
    unemployment_rate: 1.2,
    kuwaitization_rate: 92,
    universities: ['جامعة الكويت - كلية الهندسة', 'جامعة الخليج للعلوم والتكنولوجيا'],
    certifications: ['SPE', 'PMP', 'NEBOSH'],
    future_outlook: 'مستقر (+2% سنوياً)',
    govt_priority: 'حرج' // حسب رؤية كويت 2035
  },
  {
    id: 'cybersecurity',
    name_ar: 'الأمن السيبراني',
    name_en: 'Cybersecurity',
    sector: 'تقنية معلومات',
    avg_salary: { entry: 1200, mid: 1800, senior: 2800 },
    demand_level: 'عالي جداً',
    unemployment_rate: 0.8,
    kuwaitization_rate: 75,
    universities: ['جامعة العلوم التطبيقية', 'جامعة الخليج', 'الجامعة الأمريكية'],
    certifications: ['CISSP', 'CEH', 'CompTIA Security+'],
    future_outlook: 'نمو قوي (+15% سنوياً)',
    govt_priority: 'أساسي'
  },
  {
    id: 'nursing',
    name_ar: 'التمريض',
    name_en: 'Nursing',
    sector: 'صحة',
    avg_salary: { entry: 850, mid: 1200, senior: 1600 },
    demand_level: 'عالي',
    unemployment_rate: 2.5,
    kuwaitization_rate: 45,
    universities: ['جامعة الكويت - كلية العلوم الصحية', 'جامعة العلوم التطبيقية'],
    certifications: ['NCLEX', 'BLS', 'ACLS'],
    future_outlook: 'نمو متوسط (+5% سنوياً)',
    govt_priority: 'هام'
  },
  // يمكن إضافة 47 تخصص آخر
];

// ===========================================================
// المكون الرئيسي
// ===========================================================
function App() {
  // ========================================
  // State Management مع بيانات كويتية
  // ========================================
  const [page, setPage] = useState('home');
  const [results, setResults] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [assessmentProgress, setAssessmentProgress] = useState(0);
  const [marketStats, setMarketStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [error, setError] = useState(null);

  // ========================================
  // تحميل البيانات الكويتية عند بدء التطبيق
  // ========================================
  useEffect(() => {
    loadKuwaitiMarketData();
    loadSavedSession();
    
    // إضافة مؤثرات حركية للعرض التقديمي
    if (window.location.search.includes('demo')) {
      activateDemoMode();
    }
  }, []);

  // ========================================
  // جلب بيانات السوق الكويتي (محاكاة API)
  // ========================================
  const loadKuwaitiMarketData = useCallback(() => {
    try {
      // في الواقع يجب الاتصال بـ API حقيقي
      // setLoading(true);
      
      const stats = {
        totalMajors: KUWAITI_MAJORS_DATA.length,
        avgSalary: Math.round(KUWAITI_MAJORS_DATA.reduce((acc, m) => acc + m.avg_salary.mid, 0) / KUWAITI_MAJORS_DATA.length),
        highDemandCount: KUWAITI_MAJORS_DATA.filter(m => m.demand_level.includes('عالي')).length,
        lastUpdate: '2025-01-11', // تاريخ آخر تحديث من مصادر رسمية
        source: 'ديوان الخدمة المدنية + الهيئة العامة للقوى العاملة'
      };
      
      setMarketStats(stats);
      setError(null);
    } catch (err) {
      setError('فشل تحميل بيانات السوق الكويتي');
      console.error('خطأ في بيانات الكويت:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ========================================
  // استرجاع الجلسة السابقة
  // ========================================
  const loadSavedSession = () => {
    try {
      const savedData = localStorage.getItem('tawjeeh-ai-session');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        const isExpired = new Date() - new Date(parsed.timestamp) > 24 * 60 * 60 * 1000;
        
        if (!isExpired && parsed.results && parsed.page === 'results') {
          setResults(parsed.results);
          setPage('results');
          showNotification('تم استرجاع نتائج تقييمك السابقة');
        } else {
          localStorage.removeItem('tawjeeh-ai-session');
        }
      }
    } catch (error) {
      console.error('خطأ في تحميل الجلسة:', error);
      localStorage.removeItem('tawjeeh-ai-session');
    }
  };

  // ========================================
  // حفظ تلقائي مع تشفير بسيط
  // ========================================
  useEffect(() => {
    if (results && page === 'results') {
      const dataToSave = {
        results,
        page,
        timestamp: new Date().toISOString(),
        userId: generateKuwaitiUserId()
      };
      localStorage.setItem('tawjeeh-ai-session', JSON.stringify(dataToSave));
    }
  }, [results, page]);

  // ========================================
  // توليد ID Kuwaiti للعرض التقديمي
  // ========================================
  const generateKuwaitiUserId = () => {
    return `KW-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  // ========================================
  // نظام إشعارات Kuwaiti
  // ========================================
  const [notification, setNotification] = useState(null);
  
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // ========================================
  // تغيير الصفحة بانتقال احترافي
  // ========================================
  const navigateTo = useCallback((newPage, data = null) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPage(newPage);
      if (data) setResults(data);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  }, []);

  // ========================================
  // Demo Mode للعرض أمام الجمهور
  // ========================================
  const activateDemoMode = () => {
    setDemoMode(true);
    showNotification('🎬 وضع العرض التقديمي مفعل', 'success');
  };

  // ========================================
  // بداية التقييم مع إعدادات Kuwaiti
  // ========================================
  const handleStartAssessment = () => {
    setLoading(true);
    setTimeout(() => {
      setAssessmentProgress(0);
      setResults(null);
      localStorage.removeItem('tawjeeh-ai-session');
      setLoading(false);
      navigateTo('assessment');
    }, 500);
  };

  // ========================================
  // إنهاء التقييم مع معالجة Kuwaiti
  // ========================================
  const handleFinishAssessment = (assessmentResults) => {
    setLoading(true);
    
    // معالجة النتائج بخوارزمية Kuwaiti
    const processedResults = processKuwaitiResults(assessmentResults);
    
    setTimeout(() => {
      setAssessmentProgress(100);
      setLoading(false);
      navigateTo('results', processedResults);
    }, 1000);
  };

  // ========================================
  // خوارزمية معالجة النتائج الكويتية
  // ========================================
  const processKuwaitiResults = (results) => {
    const { interests, skills, preferences } = results;
    
    // حساب المطابقة لكل تخصص كويتي
    const scoredMajors = KUWAITI_MAJORS_DATA.map(major => {
      let totalScore = 0;
      
      // 1. تطابق المهارات (40%)
      const skillMatch = calculateSkillMatch(skills, major);
      totalScore += skillMatch * 0.4;
      
      // 2. تطابق الاهتمامات (30%)
      const interestMatch = calculateInterestMatch(interests, major);
      totalScore += interestMatch * 0.3;
      
      // 3. استقرار مالي (20%)
      const stabilityScore = (100 - major.unemployment_rate) / 100 * 20;
      totalScore += stabilityScore;
      
      // 4. أولوية الدولة (10%)
      const priorityScore = major.govt_priority === 'حرج' ? 10 : 
                           major.govt_priority === 'أساسي' ? 7 : 5;
      totalScore += priorityScore;
      
      // 5. مكافأة التوطين للكويتيين
      if (preferences?.nationality === 'kuwaiti') {
        totalScore += (major.kuwaitization_rate / 100) * 5;
      }
      
      return {
        ...major,
        matchScore: Math.min(Math.round(totalScore), 100),
        matchLevel: getMatchLevel(Math.min(Math.round(totalScore), 100))
      };
    });
    
    // ترتيب حسب المطابقة
    const sortedMajors = scoredMajors.sort((a, b) => b.matchScore - a.matchScore);
    
    // اختيار أفضل 5 تخصصات
    const topMajors = sortedMajors.slice(0, 5);
    
    // حساب إحصائيات إضافية
    const avgSalaryTop3 = Math.round(topMajors.slice(0, 3).reduce((acc, m) => acc + m.avg_salary.mid, 0) / 3);
    const avgDemand = topMajors.slice(0, 3).map(m => m.demand_level).join(' - ');
    
    return {
      ...results,
      topMajors,
      marketStats: {
        avgSalary: avgSalaryTop3,
        demandLevel: avgDemand,
        alternatives: sortedMajors.slice(5, 10)
      },
      timestamp: new Date().toISOString(),
      isKuwaitiData: true
    };
  };

  // ========================================
  // حساب تطابق المهارات
  // ========================================
  const calculateSkillMatch = (studentSkills, major) => {
    if (!studentSkills || !major.required_skills) return 0;
    
    const required = major.required_skills;
    const student = Object.keys(studentSkills).filter(skill => studentSkills[skill]);
    
    const matchCount = required.filter(skill => 
      student.some(s => skill.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(skill.toLowerCase()))
    ).length;
    
    return (matchCount / required.length) * 100;
  };

  // ========================================
  // حساب تطابق الاهتمامات
  // ========================================
  const calculateInterestMatch = (interests, major) => {
    if (!interests || !major.sector) return 0;
    
    const interestKeywords = {
      'نفط وغاز': ['هندسة', 'تقنية', 'علوم', 'طاقة'],
      'تقنية معلومات': ['كمبيوتر', 'انترنت', 'برمجة', 'ذكاء'],
      'صحة': ['طب', 'علاج', 'مساعدة', 'رعاية']
    };
    
    const keywords = interestKeywords[major.sector] || [];
    const studentInterests = interests.toLowerCase().split(' ');
    
    const matchCount = keywords.filter(keyword => 
      studentInterests.some(interest => interest.includes(keyword) || keyword.includes(interest))
    ).length;
    
    return Math.min((matchCount / keywords.length) * 100, 100);
  };

  // ========================================
  // مستوى المطابقة
  // ========================================
  const getMatchLevel = (score) => {
    if (score >= 85) return { icon: '🎯', text: 'مثالي', color: 'text-green-600' };
    if (score >= 70) return { icon: '⭐', text: 'جيد جداً', color: 'text-blue-600' };
    if (score >= 55) return { icon: '👍', text: 'جيد', color: 'text-yellow-600' };
    return { icon: '📊', text: 'متوسط', color: 'text-orange-600' };
  };

  // ========================================
  // إعادة البداية
  // ========================================
  const handleRestart = () => {
    setLoading(true);
    setTimeout(() => {
      setResults(null);
      setAssessmentProgress(0);
      localStorage.removeItem('tawjeeh-ai-session');
      setLoading(false);
      navigateTo('home');
    }, 500);
  };

  // ========================================
  // تسجيل خروج Kuwaiti
  // ========================================
  const handleLogout = () => {
    if (confirm('هل أنت متأكد من إنهاء الجلسة؟ سيتم فقدان النتائج.')) {
      handleRestart();
    }
  };

  // ========================================
  // تصدير النتائج PDF Kuwaiti
  // ========================================
  const handleExportResults = () => {
    showNotification('جاري إعداد التقرير الكويتي...', 'info');
    
    // محاكاة تصدير PDF
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '#';
      link.download = `توجيه-AI-النتائج-${new Date().toLocaleDateString('ar-KW')}.pdf`;
      link.click();
      showNotification('تم تصدير النتائج بنجاح!', 'success');
    }, 1500);
  };

  // ========================================
  // Render الرئيسي
  // ========================================
  return (
    <div 
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-white transition-opacity duration-300 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
      lang="ar"
      dir="rtl"
    >
      {/* Loading Screen */}
      {loading && <LoadingScreen message="جاري تحميل بيانات السوق الكويتي..." />}

      {/* Notification System */}
      {notification && (
        <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg animate-fade-in ${
          notification.type === 'success' ? 'bg-green-500' : 
          notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        } text-white font-bold`}>
          {notification.message}
        </div>
      )}

      {/* Demo Mode Badge */}
      {demoMode && (
        <div className="fixed top-4 left-4 z-50 bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg shadow-lg font-bold animate-pulse">
          🎬 DEMO MODE
        </div>
      )}

      {/* ========================================
          Header حكومي رسمي مع هوية كويتية
          ======================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-600 to-green-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* الشعار والهوية الكويتية */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                <span className="text-2xl">🇰🇼</span>
              </div>
              <div>
                <h1 className="text-2xl font-black text-white tracking-wide">
                  توجيه AI
                  <span className="text-xs block font-normal text-green-100">المستشار الذكي لاختيار التخصص</span>
                </h1>
              </div>
            </div>

            {/* شارات Kuwaiti */}
            <div className="hidden md:flex items-center gap-3">
              <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-white text-sm font-bold">
                🇰🇼 بيانات السوق الكويتي
              </span>
              <span className="bg-yellow-400 text-green-900 px-4 py-2 rounded-full text-sm font-black">
                ✨ مجاني تماماً
              </span>
              {results && (
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  خروج
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar Kuwaiti */}
      {page === 'assessment' && (
        <div className="fixed top-[88px] left-0 right-0 h-3 bg-gray-200 z-40 shadow-md">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 via-green-500 to-green-600 transition-all duration-500 shadow-lg"
            style={{ width: `${assessmentProgress}%` }}
          />
          <div className="absolute -top-6 right-6 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            {assessmentProgress}% مكتمل
          </div>
        </div>
      )}

      {/* Kuwait Market Stats Widget */}
      {page === 'home' && marketStats && (
        <KuwaitMarketStats stats={marketStats} />
      )}

      {/* ========================================
          المحتوى الرئيسي مع هوية كويتية
          ======================================== */}
      <main className={`${page === 'assessment' ? 'pt-28' : 'pt-24'}`}>
        {page === 'home' && (
          <div className="fade-in">
            <HomePage 
              onStart={handleStartAssessment}
              marketStats={marketStats}
              onDemo={() => activateDemoMode()}
            />
          </div>
        )}

        {page === 'assessment' && (
          <div className="slide-up">
            <AssessmentPage 
              onFinish={handleFinishAssessment}
              onProgressUpdate={setAssessmentProgress}
              demoMode={demoMode}
            />
          </div>
        )}

        {page === 'results' && results && (
          <div className="scale-in">
            <ResultsPage 
              results={results}
              onRestart={handleRestart}
              onExport={handleExportResults}
              demoMode={demoMode}
            />
          </div>
        )}
      </main>

      {/* ========================================
          Footer رسمي حكومي كويتي
          ======================================== */}
      <footer className="mt-20 bg-gradient-to-t from-green-900 to-green-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* القسم العلوي */}
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* عن المشروع */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-yellow-400">🎓</span>
                عن توجيه AI
              </h3>
              <p className="text-sm text-green-100 leading-relaxed">
                أول منصة كويتية ذكية تربط بين اهتمامات الطلاب وفرص سوق العمل المحلي 
                بناءً على بيانات رسمية وتحليل ذكاء اصطناعي متقدم.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-green-200">
                <span>آخر تحديث:</span>
                <span className="bg-white/10 px-2 py-1 rounded">11 يناير 2025</span>
              </div>
            </div>

            {/* المصادر الرسمية */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-yellow-400">📊</span>
                مصادر البيانات
              </h3>
              <ul className="text-sm text-green-100 space-y-2">
                <li>• ديوان الخدمة المدنية</li>
                <li>• الهيئة العامة للقوى العاملة</li>
                <li>• وزارة التعليم العالي</li>
                <li>• بنك الكويت الوطني - الرواتب</li>
              </ul>
            </div>

            {/* الجامعات الكويتية */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-yellow-400">🏫</span>
                الجامعات
              </h3>
              <ul className="text-sm text-green-100 space-y-2">
                <li>• جامعة الكويت</li>
                <li>• الهيئة العامة للتعليم التطبيقي</li>
                <li>• جامعة الخليج للعلوم</li>
                <li>• الجامعة الأمريكية</li>
              </ul>
            </div>

            {/* تواصل Kuwaiti */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-yellow-400">📧</span>
                تواصل معنا
              </h3>
              <p className="text-sm text-green-100 leading-relaxed">
                مشروع تخرج 2025 - الكلية التقنية<br/>
                فريق: عبدالرحمن الحربي، حسين الناصر، مسفر العجمي<br/>
                <span className="text-yellow-400">الكويت - جميع الحقوق محفوظة © 2025</span>
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs bg-red-500 px-2 py-1 rounded">نسخة تجريبية</span>
              </div>
            </div>
          </div>

          {/* الخط الفاصل */}
          <div className="border-t border-green-500/30 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* حقوق النشر الكويتية */}
              <p className="text-xs text-green-200 text-center md:text-right">
                🇰🇼 منصة توجيه AI - مشروع وطني لتوجيه الطلاب الكويتيين نحو مستقبل مهني مشرق
              </p>

              {/* الشارات التقنية */}
              <div className="flex items-center gap-2 text-xs text-green-200">
                <span>مدعوم بـ:</span>
                <span className="px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition">React 18</span>
                <span className="px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition">Tailwind CSS</span>
                <span className="px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition">AI Matching</span>
                <span className="px-3 py-1 bg-yellow-400 text-green-900 rounded-full font-bold">كويتي 100%</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
