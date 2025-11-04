import React, { useState, useEffect } from 'react'
import HomePage from './pages/HomePage'
import AssessmentPage from './pages/AssessmentPage'
import ResultsPage from './pages/ResultsPage'

function App() {
  // ========================================
  // State Management
  // إدارة الحالة
  // ========================================
  const [page, setPage] = useState('home')
  const [results, setResults] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [assessmentProgress, setAssessmentProgress] = useState(0)

  // ========================================
  // تحميل البيانات المحفوظة عند بداية التطبيق
  // Load saved data on app start
  // ========================================
  useEffect(() => {
    const savedData = localStorage.getItem('tawjeeh-ai-session')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        // استرجاع النتائج السابقة إذا كانت موجودة
        if (parsed.results && parsed.page === 'results') {
          setResults(parsed.results)
          setPage('results')
        }
      } catch (error) {
        console.error('خطأ في تحميل البيانات المحفوظة:', error)
        localStorage.removeItem('tawjeeh-ai-session')
      }
    }
  }, [])

  // ========================================
  // حفظ تلقائي للنتائج في LocalStorage
  // Auto-save results to LocalStorage
  // ========================================
  useEffect(() => {
    if (results && page === 'results') {
      const dataToSave = {
        results,
        page,
        timestamp: new Date().toISOString()
      }
      localStorage.setItem('tawjeeh-ai-session', JSON.stringify(dataToSave))
    }
  }, [results, page])

  // ========================================
  // تغيير الصفحة مع Transition سلس
  // Change page with smooth transition
  // ========================================
  const navigateTo = (newPage, data = null) => {
    setIsTransitioning(true)
    
    // تأخير بسيط للـ fade out
    setTimeout(() => {
      setPage(newPage)
      if (data) setResults(data)
      setIsTransitioning(false)
      
      // Scroll to top عند تغيير الصفحة
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 300)
  }

  // ========================================
  // بداية التقييم
  // Start Assessment
  // ========================================
  const handleStartAssessment = () => {
    setAssessmentProgress(0)
    setResults(null)
    localStorage.removeItem('tawjeeh-ai-session')
    navigateTo('assessment')
  }

  // ========================================
  // إنهاء التقييم وعرض النتائج
  // Finish Assessment and Show Results
  // ========================================
  const handleFinishAssessment = (assessmentResults) => {
    setAssessmentProgress(100)
    navigateTo('results', assessmentResults)
  }

  // ========================================
  // إعادة البداية
  // Restart from Beginning
  // ========================================
  const handleRestart = () => {
    setResults(null)
    setAssessmentProgress(0)
    localStorage.removeItem('tawjeeh-ai-session')
    navigateTo('home')
  }

  // ========================================
  // تحديث التقدم في التقييم
  // Update Assessment Progress
  // ========================================
  const updateProgress = (progress) => {
    setAssessmentProgress(progress)
  }

  // ========================================
  // Render الصفحات
  // Pages Rendering
  // ========================================
  return (
    <div className={`min-h-screen transition-opacity duration-300 ${
      isTransitioning ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* ========================================
          Header حكومي رسمي
          Official Government Header
          ======================================== */}
      <header className="header-official fixed top-0 left-0 right-0 z-50 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* شعار وعنوان */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-2xl">🎓</span>
            </div>
            <div>
              <h1 className="text-xl font-black text-blue-900">توجيه AI</h1>
              <p className="text-xs text-gray-600">المستشار الذكي لاختيار التخصص الجامعي</p>
            </div>
          </div>

          {/* شارات رسمية */}
          <div className="hidden md:flex items-center gap-2">
            <span className="badge-gov">🇰🇼 الكويت</span>
            <span className="badge-gold">✨ مجاني</span>
          </div>
        </div>
      </header>

      {/* Progress Bar (يظهر فقط في صفحة التقييم) */}
      {page === 'assessment' && (
        <div className="fixed top-[72px] left-0 right-0 h-2 bg-gray-200 z-40">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 transition-all duration-500 shadow-lg"
            style={{ width: `${assessmentProgress}%` }}
          />
          {/* نسبة الإنجاز */}
          <div className="absolute top-3 right-6 text-xs font-bold text-blue-900">
            {assessmentProgress}% مكتمل
          </div>
        </div>
      )}

      {/* المحتوى الرئيسي */}
      <main className={`${page === 'assessment' ? 'pt-24' : 'pt-20'}`}>
        {/* الصفحة الرئيسية */}
        {page === 'home' && (
          <div className="fade-in">
            <HomePage onStart={handleStartAssessment} />
          </div>
        )}

        {/* صفحة التقييم */}
        {page === 'assessment' && (
          <div className="slide-up">
            <AssessmentPage 
              onFinish={handleFinishAssessment}
              onProgressUpdate={updateProgress}
            />
          </div>
        )}

        {/* صفحة النتائج */}
        {page === 'results' && results && (
          <div className="scale-in">
            <ResultsPage 
              results={results} 
              onRestart={handleRestart}
              onBackToAssessment={() => navigateTo('assessment')}
            />
          </div>
        )}
      </main>

      {/* ========================================
          Footer حكومي رسمي
          Official Government Footer
          ======================================== */}
      <footer className="footer-official mt-20 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          {/* القسم العلوي */}
          <div className="grid md:grid-cols-3 gap-8 mb-6">
            {/* عن المشروع */}
            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <span className="text-yellow-400">🎓</span>
                عن توجيه AI
              </h3>
              <p className="text-sm text-blue-100 leading-relaxed">
                منصة ذكية لتوجيه الطلاب في الكويت لاختيار التخصص الجامعي المناسب 
                بناءً على اهتماماتهم ومهاراتهم وبيانات سوق العمل الكويتي.
              </p>
            </div>

            {/* روابط سريعة */}
            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <span className="text-yellow-400">🔗</span>
                روابط مهمة
              </h3>
              <ul className="text-sm text-blue-100 space-y-2">
                <li>• جامعة الكويت</li>
                <li>• الهيئة العامة للتعليم التطبيقي</li>
                <li>• وزارة التعليم العالي</li>
                <li>• ديوان الخدمة المدنية</li>
              </ul>
            </div>

            {/* معلومات التواصل */}
            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <span className="text-yellow-400">📧</span>
                تواصل معنا
              </h3>
              <p className="text-sm text-blue-100 leading-relaxed">
                مشروع تخرج 2025<br/>
                الكلية التقنية - الكويت<br/>
                جميع الحقوق محفوظة ©
              </p>
            </div>
          </div>

          {/* الخط الفاصل */}
          <div className="border-t border-blue-500/30 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* حقوق النشر */}
              <p className="text-xs text-blue-200">
                © 2025 توجيه AI - منصة مجانية لتوجيه الطلاب في الكويت
              </p>

              {/* تقنيات */}
              <div className="flex items-center gap-2 text-xs text-blue-200">
                <span>مدعوم بـ:</span>
                <span className="px-2 py-1 bg-white/10 rounded">React</span>
                <span className="px-2 py-1 bg-white/10 rounded">Tailwind</span>
                <span className="px-2 py-1 bg-white/10 rounded">AI</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
