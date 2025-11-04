import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';
import { analyzeStudent } from '../utils/aiAdvisor';

export default function AssessmentPage({ onFinish, onProgressUpdate }) {
  // ========================================
  // State Management
  // ========================================
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 3;

  // ========================================
  // بيانات الأسئلة - Questions Data
  // ========================================
  
  // الاهتمامات
  const interestsOptions = [
    { id: 'tech-numbers', label: 'التعامل مع الأرقام', icon: '🔢' },
    { id: 'programming', label: 'البرمجة والتكنولوجيا', icon: '💻' },
    { id: 'innovation', label: 'الابتكار والإبداع', icon: '💡' },
    { id: 'design-planning', label: 'التصميم والتخطيط', icon: '📐' },
    { id: 'tech-problems', label: 'حل المشاكل التقنية', icon: '🔧' },
    { id: 'helping-people', label: 'مساعدة الناس', icon: '🤝' },
    { id: 'medical-science', label: 'العلوم الطبية', icon: '🩺' },
    { id: 'money-investment', label: 'المال والاستثمار', icon: '💰' },
    { id: 'leadership', label: 'القيادة وإدارة الفرق', icon: '👔' },
    { id: 'law-justice', label: 'القانون والعدالة', icon: '⚖️' },
    { id: 'teaching', label: 'التدريس والتوجيه', icon: '👨‍🏫' },
    { id: 'writing-communication', label: 'الكتابة والتواصل', icon: '✍️' },
    { id: 'research', label: 'البحث العلمي', icon: '🔬' },
    { id: 'environment', label: 'البيئة والاستدامة', icon: '🌱' }
  ];

  // المهارات
  const skillsOptions = [
    { id: 'coding', label: 'البرمجة وكتابة الأكواد', icon: '⌨️' },
    { id: 'logical-thinking', label: 'التفكير المنطقي', icon: '🧩' },
    { id: 'problem-solving', label: 'حل المشاكل المعقدة', icon: '🎯' },
    { id: 'math-stats', label: 'الرياضيات والإحصاء', icon: '📊' },
    { id: 'physics-chemistry', label: 'الفيزياء والكيمياء', icon: '⚗️' },
    { id: 'research-analysis', label: 'البحث والتحليل', icon: '🔍' },
    { id: 'patient-care', label: 'التعامل مع المرضى', icon: '💊' },
    { id: 'precision', label: 'الدقة والتركيز', icon: '🎯' },
    { id: 'communication', label: 'التواصل مع الآخرين', icon: '💬' },
    { id: 'teamwork', label: 'العمل الجماعي', icon: '👥' },
    { id: 'time-management', label: 'إدارة الوقت والموارد', icon: '⏰' },
    { id: 'financial-planning', label: 'التخطيط المالي', icon: '💵' },
    { id: 'writing', label: 'الكتابة والتعبير', icon: '📝' },
    { id: 'design', label: 'التصميم والابتكار', icon: '🎨' }
  ];

  // التفضيلات الدراسية
  const preferencesOptions = [
    { id: 'short-duration', label: 'مدة دراسية قصيرة', icon: '⏱️' },
    { id: 'practical', label: 'دراسة عملية', icon: '🔨' },
    { id: 'theoretical', label: 'دراسة نظرية', icon: '📚' },
    { id: 'mixed', label: 'نظري وعملي', icon: '⚖️' },
    { id: 'field-work', label: 'عمل ميداني', icon: '🚧' },
    { id: 'office-work', label: 'عمل مكتبي', icon: '🏢' },
    { id: 'long-investment', label: 'استثمار طويل المدى', icon: '📈' },
    { id: 'quick-entry', label: 'سجل نسبياً', icon: '🚀' }
  ];

  // ========================================
  // تحديث Progress
  // Update Progress
  // ========================================
  useEffect(() => {
    const progress = (currentStep / totalSteps) * 100;
    if (onProgressUpdate) {
      onProgressUpdate(progress);
    }
  }, [currentStep, onProgressUpdate]);

  // ========================================
  // Toggle Selection
  // ========================================
  const toggleSelection = (item, selectedArray, setSelectedArray, maxSelections = 10) => {
    if (selectedArray.includes(item)) {
      setSelectedArray(selectedArray.filter(i => i !== item));
    } else {
      if (selectedArray.length < maxSelections) {
        setSelectedArray([...selectedArray, item]);
      } else {
        setError(`يمكنك اختيار حتى ${maxSelections} خيارات فقط`);
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  // ========================================
  // Navigation
  // ========================================
  const goToNextStep = () => {
    setError('');
    
    // Validation
    if (currentStep === 1 && selectedInterests.length === 0) {
      setError('الرجاء اختيار اهتمام واحد على الأقل');
      return;
    }
    if (currentStep === 2 && selectedSkills.length === 0) {
      setError('الرجاء اختيار مهارة واحدة على الأقل');
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
  // Submit Assessment
  // ========================================
  const handleSubmit = async () => {
    setError('');
    setIsSubmitting(true);

    // Final validation
    if (selectedInterests.length === 0 || selectedSkills.length === 0) {
      setError('يجب اختيار اهتمامات ومهارات لإتمام التقييم');
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare data for AI analysis
      const assessmentData = {
        interests: selectedInterests,
        skills: selectedSkills,
        studyPreferences: selectedPreferences
      };

      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Call AI analyzer
      const results = analyzeStudent(assessmentData);

      // Save to localStorage
      try {
        localStorage.setItem('tawjeeh-assessment', JSON.stringify(assessmentData));
        localStorage.setItem('tawjeeh-results', JSON.stringify(results));
      } catch (e) {
        console.error('Error saving to localStorage:', e);
      }

      // Pass results to parent
      if (onFinish) {
        onFinish(results);
      }
    } catch (error) {
      console.error('Error processing assessment:', error);
      setError('حدث خطأ في معالجة التقييم. الرجاء المحاولة مرة أخرى.');
      setIsSubmitting(false);
    }
  };

  // ========================================
  // Reset Assessment
  // ========================================
  const handleReset = () => {
    if (window.confirm('هل تريد مسح جميع اختياراتك والبدء من جديد؟')) {
      setSelectedInterests([]);
      setSelectedSkills([]);
      setSelectedPreferences([]);
      setCurrentStep(1);
      setError('');
    }
  };

  // ========================================
  // Render Step Content
  // ========================================
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="fade-in">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-purple-500/20 rounded-full mb-4">
                <Sparkles className="w-12 h-12 text-yellow-400" />
              </div>
              <h2 className="text-3xl font-bold mb-3">اختر مهاراتك 💪</h2>
              <p className="text-purple-200 text-lg">
                حدد المهارات التي تمتلكها أو تشعر بالراحة عند استخدامها
              </p>
              <div className="mt-3 text-sm text-purple-300">
                اخترت: <span className="font-bold text-yellow-400">{selectedInterests.length}</span> من الاهتمامات
              </div>
            </div>

            <div className="card-glass rounded-3xl p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interestsOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => toggleSelection(option.id, selectedInterests, setSelectedInterests, 8)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-right ${
                      selectedInterests.includes(option.id)
                        ? 'bg-yellow-400 border-yellow-500 text-black scale-105 shadow-lg'
                        : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.icon}</div>
                    <div className="font-semibold text-sm">{option.label}</div>
                    {selectedInterests.includes(option.id) && (
                      <CheckCircle2 className="w-5 h-5 mt-2 mx-auto" />
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
              <div className="inline-block p-4 bg-blue-500/20 rounded-full mb-4">
                <Sparkles className="w-12 h-12 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold mb-3">اختر اهتماماتك 🎯</h2>
              <p className="text-purple-200 text-lg">
                ما هي المجالات التي تثير اهتمامك وفضولك؟
              </p>
              <div className="mt-3 text-sm text-purple-300">
                اخترت: <span className="font-bold text-blue-400">{selectedSkills.length}</span> من المهارات
              </div>
            </div>

            <div className="card-glass rounded-3xl p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skillsOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => toggleSelection(option.id, selectedSkills, setSelectedSkills, 8)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-right ${
                      selectedSkills.includes(option.id)
                        ? 'bg-blue-400 border-blue-500 text-black scale-105 shadow-lg'
                        : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.icon}</div>
                    <div className="font-semibold text-sm">{option.label}</div>
                    {selectedSkills.includes(option.id) && (
                      <CheckCircle2 className="w-5 h-5 mt-2 mx-auto" />
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
              <div className="inline-block p-4 bg-green-500/20 rounded-full mb-4">
                <Sparkles className="w-12 h-12 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold mb-3">تفضيلات الدراسة 📚</h2>
              <p className="text-purple-200 text-lg">
                ما هو نوع الدراسة والعمل المفضل لديك؟ (اختياري)
              </p>
              <div className="mt-3 text-sm text-purple-300">
                اخترت: <span className="font-bold text-green-400">{selectedPreferences.length}</span> من التفضيلات
              </div>
            </div>

            <div className="card-glass rounded-3xl p-8 max-w-4xl mx-auto mb-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {preferencesOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => toggleSelection(option.id, selectedPreferences, setSelectedPreferences, 6)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-right ${
                      selectedPreferences.includes(option.id)
                        ? 'bg-green-400 border-green-500 text-black scale-105 shadow-lg'
                        : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.icon}</div>
                    <div className="font-semibold text-sm">{option.label}</div>
                    {selectedPreferences.includes(option.id) && (
                      <CheckCircle2 className="w-5 h-5 mt-2 mx-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Box */}
            <div className="card-glass rounded-3xl p-6 max-w-4xl mx-auto border-2 border-yellow-400/30">
              <h3 className="text-xl font-bold mb-4 text-center text-yellow-400">
                📋 ملخص اختياراتك
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-3xl font-bold text-yellow-400">{selectedInterests.length}</div>
                  <div className="text-sm text-purple-200 mt-1">اهتمام</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-3xl font-bold text-blue-400">{selectedSkills.length}</div>
                  <div className="text-sm text-purple-200 mt-1">مهارة</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-3xl font-bold text-green-400">{selectedPreferences.length}</div>
                  <div className="text-sm text-purple-200 mt-1">تفضيل</div>
                </div>
              </div>
              <div className="mt-4 text-center text-sm text-purple-300">
                ✨ جاهز لاكتشاف أفضل التخصصات المناسبة لك!
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ========================================
  // Main Render
  // ========================================
  return (
    <div className="min-h-screen py-10 px-4 relative">
      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-3">
          {[1, 2, 3].map(step => (
            <div key={step} className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step < currentStep ? 'bg-green-500 text-white' :
                step === currentStep ? 'bg-yellow-400 text-black scale-110' :
                'bg-white/20 text-white/50'
              }`}>
                {step < currentStep ? <CheckCircle2 className="w-6 h-6" /> : step}
              </div>
              {step < 3 && (
                <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                  step < currentStep ? 'bg-green-500' : 'bg-white/20'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center text-sm text-purple-300">
          الخطوة {currentStep} من {totalSteps}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-4xl mx-auto mb-6 slide-up">
          <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
            <p className="text-red-200">{error}</p>
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="mb-8">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center gap-4">
          {/* Previous Button */}
          <button
            onClick={goToPreviousStep}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              currentStep === 1
                ? 'bg-white/5 text-white/30 cursor-not-allowed'
                : 'bg-white/10 hover:bg-white/20 text-white hover:scale-105'
            }`}
          >
            <ArrowRight className="w-5 h-5" />
            السابق
          </button>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="px-4 py-3 rounded-xl font-bold bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-all hover:scale-105 flex items-center gap-2"
          >
            <XCircle className="w-5 h-5" />
            <span className="hidden md:inline">إعادة تعيين</span>
          </button>

          {/* Next/Submit Button */}
          {currentStep < totalSteps ? (
            <button
              onClick={goToNextStep}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:scale-105 transition-all shadow-lg"
            >
              التالي
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all shadow-lg ${
                isSubmitting
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-400 to-green-500 text-black hover:scale-105 pulse-button'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner w-5 h-5 border-2 border-white" />
                  جاري التحليل...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  عرض النتائج
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center mt-12 text-sm text-purple-300">
        <p>💡 نصيحة: اختر بصدق وواقعية للحصول على أفضل توصيات</p>
      </div>
    </div>
  );
}
