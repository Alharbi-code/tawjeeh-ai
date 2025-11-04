import React, { useState, useEffect } from 'react'
import HomePage from './pages/HomePage'
import AssessmentPage from './pages/AssessmentPage'
import ResultsPage from './pages/ResultsPage'

function App() {
  // ========================================
  // State Management
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
  // ========================================
  return (
    <div className={`min-h-screen transition-opacity duration-300 ${
      isTransitioning ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Progress Bar (يظهر فقط في صفحة التقييم) */}
      {page === 'assessment' && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transition-all duration-500"
            style={{ width: `${assessmentProgress}%` }}
          />
        </div>
      )}

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

      {/* Footer ثابت */}
      <footer className="fixed bottom-0 left-0 right-0 text-center py-3 text-xs text-white/60 bg-black/20 backdrop-blur-sm">
        <p>
          مشروع تخرج 2025 - واجهة عربية بالكامل (RTL) 
          <span className="mx-2">•</span>
          طلاب الكلية التقنية - الكويت
        </p>
      </footer>
    </div>
  )
}

export default App
