import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, Sparkles, AlertCircle, Building, Briefcase, TrendingUp } from 'lucide-react';

// ===========================================================
// بيانات كويتية محلية (مستندة إلى سوق العمل الفعلي)
// ===========================================================
const KUWAITI_INTERESTS = [
  { id: 'oil_gas', name: 'القطاع النفطي والطاقة', icon: '⛽', sector: 'نفط' },
  { id: 'government', name: 'القطاع الحكومي والخدمات', icon: '🏛️', sector: 'حكومي' },
  { id: 'banking', name: 'القطاع المصرفي والمالي', icon: '🏦', sector: 'مالية' },
  { id: 'healthcare', name: 'القطاع الصحي والتمريض', icon: '🏥', sector: 'صحة' },
  { id: 'engineering', name: 'الهندسة والبناء', icon: '⚙️', sector: 'هندسة' },
  { id: 'technology', name: 'التقنية والبرمجة', icon: '💻', sector: 'تقنية' },
  { id: 'education', name: 'التعليم والتدريس', icon: '📚', sector: 'تعليم' },
  { id: 'business', name: 'الأعمال والريادة', icon: '📈', sector: 'اعمال' },
  { id: 'aviation', name: 'الطيران والنقل', icon: '✈️', sector: 'نقل' },
  { id: 'media', name: 'الإعلام والتواصل', icon: '🎬', sector: 'اعلام' },
  { id: 'legal', name: 'القطاع القانوني', icon: '⚖️', sector: 'قانون' },
  { id: 'retail', name: 'التجزئة والمبيعات', icon: '🛍️', sector: 'تجارة' }
];

const KUWAITI_SKILLS = [
  { id: 'problem_solving', name: 'حل المشكلات المعقدة', icon: '🧠' },
  { id: 'communication', name: 'التواصل باللغتين (عربي/إنجليزي)', icon: '💬' },
  { id: 'teamwork', name: 'العمل الجماعي', icon: '👥' },
  { id: 'leadership', name: 'القيادة والإدارة', icon: '👑' },
  { id: 'analysis', name: 'التحليل العددي', icon: '📊' },
  { id: 'technical', name: 'المهارات التقنية', icon: '🔧' },
  { id: 'creative', name: 'الإبداع والتصميم', icon: '🎨' },
  { id: 'research', name: 'البحث العلمي', icon: '🔬' },
  { id: 'customer_service', name: 'خدمة العملاء', icon: '🤝' },
  { id: 'project_management', name: 'إدارة المشاريع', icon: '📋' },
  { id: 'financial_analysis', name: 'التحليل المالي', icon: '💰' },
  { id: 'programming', name: 'البرمجة والتطوير', icon: '💻' }
];

const KUWAITI_PREFERENCES = [
  { id: 'morning_routine', name: 'الدوام الصباحي (7ص-2م)', icon: '🌅', type: 'routine' },
  { id: 'flexible_hours', name: 'دوام مرن/أونلاين', icon: '⏰', type: 'routine' },
  { id: 'high_salary', name: 'الراتب العالي الم优先', icon: '💵', type: 'priority' },
  { id: 'job_security', name: 'الاستقرار الوظيفي', icon: '🛡️', type: 'priority' },
  { id: 'career_growth', name: 'فرص النمو السريع', icon: '📈', type: 'priority' },
  { id: 'work_life_balance', name: 'التوازن بين العمل والحياة', icon: '⚖️', type: 'priority' },
  { id: 'govt_sector', name: 'القطاع الحكومي', icon: '🏛️', type: 'sector' },
  { id: 'oil_sector', name: 'القطاع النفطي', icon: '⛽', type: 'sector' },
  { id: 'private_sector', name: 'القطاع الخاص', icon: '🏢', type: 'sector' },
  { id: 'kuwait_city', name: 'العمل في مدينة الكويت', icon: '🏙️', type: 'location' },
  { id: 'ahmadi', name: 'العمل في الأحمدي', icon: '🏭', type: 'location' },
  { id: 'work_abroad', name: 'فرص العمل بالخارج', icon: '🌍', type: 'location' }
];

export default function AssessmentPage({ onFinish, onProgressUpdate }) {
  // ========================================
  // State Management - Kuwaiti Context
  // ========================================
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const totalSteps = 3;

  // ========================================
  // Progress Tracking
  // ========================================
  useEffect(() => {
    const progress = (currentStep / totalSteps) * 100;
    if (onProgressUpdate) {
      onProgressUpdate(progress);
    }
  }, [currentStep, onProgressUpdate]);

  // ========================================
  // Selection Toggle with Kuwaiti Validation
  // ========================================
  const toggleSelection = (item, selectedArray, setSelectedArray, maxSelections = 8) => {
    if (selectedArray.includes(item.id)) {
      setSelectedArray(selectedArray.filter(i => i.id !== item.id));
    } else {
      if (selectedArray.length < maxSelections) {
        setSelectedArray([...selectedArray, item]);
      } else {
        setError(`يمكنك اختيار ${maxSelections} خيارات كحد أقصى، امسح خياراً لإضافة آخر`);
        setTimeout(() => setError(''), 4000);
      }
    }
  };

  // ========================================
  // Navigation with Validation
  // ========================================
  const goToNextStep = () => {
    setError('');
    
    // Kuwaiti-specific validation
    if (currentStep === 1 && selectedInterests.length === 0) {
      setError('⚠️ الرجاء اختيار مجال يهمك على الأقل - هذا مهم لتوصيات دقيقة');
      return;
    }
    if (currentStep === 2 && selectedSkills.length === 0) {
      setError('⚠️ اختر مهارة واحدة على الأقل تمتلكها أو تريد تطويرها');
      return;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ========================================
  // Submit with Kuwaiti AI Processing
  // ========================================
  const handleSubmit = async () => {
    setError('');
    setIsSubmitting(true);

    try {
      // Validate minimum selections
      if (selectedInterests.length === 0 || selectedSkills.length === 0) {
        throw new Error('يجب اختيار اهتمامات ومهارات أساسية');
      }

      // تحليل Kuwaiti مخصص
      const analysis = analyzeKuwaitiStudent({
        interests: selectedInterests,
        skills: selectedSkills,
        preferences: selectedPreferences,
        timestamp: new Date().toISOString()
      });

      // Save to localStorage for Kuwaiti persistence
      const results = {
        kuwaitiAnalysis: analysis,
        rawData: {
          interests: selectedInterests,
          skills: selectedSkills,
          preferences: selectedPreferences
        },
        userId: `KW-${Date.now()}`,
        timestamp: new Date().toISOString()
      };

      localStorage.setItem('tawjeeh-kuwaiti-session', JSON.stringify(results));

      setTimeout(() => {
        setIsSubmitting(false);
        onFinish(results);
      }, 1500);

    } catch (error) {
      console.error('خطأ في تحليل التقييم الكويتي:', error);
      setError(`❌ خطأ: ${error.message}. الرجاء المحاولة مرة أخرى.`);
      setIsSubmitting(false);
    }
  };

  // ========================================
  // Reset Assessment
  // ========================================
  const handleReset = () => {
    if (window.confirm('هل تريد مسح جميع إجاباتك والبدء من جديد؟')) {
      setSelectedInterests([]);
      setSelectedSkills([]);
      setSelectedPreferences([]);
      setCurrentStep(1);
      setError('');
    }
  };

  // ========================================
  // Render Kuwaiti Step Content
  // ========================================
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="fade-in">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-green-600/20 rounded-full mb-4">
                <TrendingUp className="w-12 h-12 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold mb-3">🎯 اختر قطاعات السوق الكويتي التي تهمك</h2>
              <p className="text-gray-600 text-lg">
                هذا يساعدنا على توجيهك نحو تخصصات مطلوبة في الكويت
              </p>
              <div className="mt-3 text-sm text-gray-500">
                اختر من 3-8 قطاعات • تم اختيار: {selectedInterests.length}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-200">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {KUWAITI_INTERESTS.map(option => (
                  <button
                    key={option.id}
                    onClick={() => toggleSelection(option, selectedInterests, setSelectedInterests, 8)}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 text-center hover:scale-105 ${
                      selectedInterests.some(i => i.id === option.id)
                        ? 'bg-gradient-to-br from-green-500 to-green-600 border-green-700 text-white shadow-lg'
                        : 'bg-gray-50 border-gray-200 hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    <div className="text-4xl mb-3">{option.icon}</div>
                    <div className="font-bold text-sm mb-1">{option.name}</div>
                    <div className="text-xs opacity-75">{option.sector}</div>
                    {selectedInterests.some(i => i.id === option.id) && (
                      <div className="mt-2">
                        <CheckCircle2 className="w-5 h-5 mx-auto" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="slide-up">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-blue-600/20 rounded-full mb-4">
                <Briefcase className="w-12 h-12 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold mb-3">💪 ما هي المهارات التي تمتلكها؟</h2>
              <p className="text-gray-600 text-lg">
                اختر المهارات التي تتقنها أو ترغب في تطويرها
              </p>
              <div className="mt-3 text-sm text-gray-500">
                اختر من 3-8 مهارات • تم اختيار: {selectedSkills.length}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {KUWAITI_SKILLS.map(option => (
                  <button
                    key={option.id}
                    onClick={() => toggleSelection(option, selectedSkills, setSelectedSkills, 8)}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 text-center hover:scale-105 ${
                      selectedSkills.some(s => s.id === option.id)
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-700 text-white shadow-lg'
                        : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="text-4xl mb-3">{option.icon}</div>
                    <div className="font-bold text-sm">{option.name}</div>
                    {selectedSkills.some(s => s.id === option.id) && (
                      <div className="mt-2">
                        <CheckCircle2 className="w-5 h-5 mx-auto" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="scale-in">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-yellow-600/20 rounded-full mb-4">
                <Building className="w-12 h-12 text-yellow-600" />
              </div>
              <h2 className="text-3xl font-bold mb-3">📊 أخبرنا عن أولوياتك المهنية</h2>
              <p className="text-gray-600 text-lg">
                هذا يساعدنا على تخصيص التوصيات حسب ما يهمك حقاً
              </p>
              <div className="mt-3 text-sm text-gray-500">
                اختر من 4-10 تفضيلات • تم اختيار: {selectedPreferences.length}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-yellow-200 mb-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {KUWAITI_PREFERENCES.map(option => (
                  <button
                    key={option.id}
                    onClick={() => toggleSelection(option, selectedPreferences, setSelectedPreferences, 10)}
                    className={`p-5 rounded-xl border-2 transition-all duration-300 text-center hover:scale-105 ${
                      selectedPreferences.some(p => p.id === option.id)
                        ? 'bg-gradient-to-br from-yellow-500 to-yellow-600 border-yellow-700 text-white shadow-lg'
                        : 'bg-gray-50 border-gray-200 hover:border-yellow-300 hover:bg-yellow-50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.icon}</div>
                    <div className="font-bold text-sm">{option.name}</div>
                    <div className="text-xs opacity-60">{option.type}</div>
                    {selectedPreferences.some(p => p.id === option.id) && (
                      <div className="mt-2">
                        <CheckCircle2 className="w-5 h-5 mx-auto" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ملخص اختياراتك */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                📋 ملخص اختياراتك الكويتية
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-xl p-4 shadow">
                  <div className="text-3xl font-black text-green-600">{selectedInterests.length}</div>
                  <div className="text-sm text-gray-600 mt-1">قطاع اهتمام</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow">
                  <div className="text-3xl font-black text-blue-600">{selectedSkills.length}</div>
                  <div className="text-sm text-gray-600 mt-1">مهارة</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow">
                  <div className="text-3xl font-black text-yellow-600">{selectedPreferences.length}</div>
                  <div className="text-sm text-gray-600 mt-1">تفضيل</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ========================================
  // Main Render with Kuwaiti Styling
  // ========================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      {/* Progress Bar */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map(step => (
            <div key={step} className="flex items-center flex-1">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg transition-all ${
                step < currentStep ? 'bg-gradient-to-br from-green-500 to-green-600 text-white' :
                step === currentStep ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-green-900 scale-110' :
                'bg-gray-200 text-gray-400'
              }`}>
                {step < currentStep ? <CheckCircle2 className="w-6 h-6" /> : step}
              </div>
              {step < 3 && (
                <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                  step < currentStep ? 'bg-gradient-to-r from-green-500 to-yellow-400' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center text-sm font-medium text-gray-600">
          المرحلة {currentStep} من {totalSteps}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-5xl mx-auto mb-6 animate-slide-down">
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="mb-8">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={goToPreviousStep}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-md ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700 hover:scale-105'
            }`}
          >
            <ArrowRight className="w-5 h-5" />
            السابق
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-3 rounded-xl font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-all hover:scale-105 flex items-center gap-2"
          >
            <XCircle className="w-5 h-5" />
            إعادة البداية
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={goToNextStep}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-green-600 to-green-700 text-white hover:scale-105 transition-all shadow-lg"
            >
              التالي
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all shadow-xl ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-900 hover:scale-105 animate-pulse'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-green-900 border-t-transparent rounded-full animate-spin" />
                  جاري التحليل الكويتي...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  عرض نتائج التوصيات
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Footer Tip */}
      <div className="text-center mt-12 text-sm text-gray-500">
        <p>💡 نصيحة: اجب بصدق لتحصل على توصيات دقيقة ومفيدة لسوق الكويت</p>
      </div>
    </div>
  );
}
