import React, { useState } from 'react';
import {
  Trophy, TrendingUp, Briefcase, Clock, GraduationCap, Award,
  DollarSign, Users, MapPin, Star, Download, Share2, RefreshCw,
  CheckCircle, AlertCircle, ChevronDown, ChevronUp, BarChart3,
  Target, Zap, Heart, ArrowRight, ExternalLink, Globe, Building2,
  BookOpen, FileText, Percent, CalendarCheck
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';

export default function ResultsPage({ results, onRestart, onBackToAssessment }) {
  // ========================================
  // State Management
  // ========================================
  const [activeTab, setActiveTab] = useState('recommendations');
  const [expandedMajor, setExpandedMajor] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);

  // Extract data from results
  const recommendations = results?.recommendations || [];
  const assessmentData = results?.assessmentData || {};
  const topMajor = recommendations[0];

  // ========================================
  // Helper Functions
  // ========================================
  
  // Get demand badge color and text
  const getDemandInfo = (level) => {
    if (level >= 90) return { color: '#10b981', bg: '#10b98120', text: 'مرتفع جداً' };
    if (level >= 75) return { color: '#3b82f6', bg: '#3b82f620', text: 'مرتفع' };
    if (level >= 60) return { color: '#f59e0b', bg: '#f59e0b20', text: 'متوسط' };
    return { color: '#ef4444', bg: '#ef444420', text: 'منخفض' };
  };

  // Toggle expand major details
  const toggleExpand = (majorId) => {
    setExpandedMajor(expandedMajor === majorId ? null : majorId);
  };

  // Handle compare selection
  const toggleCompare = (major) => {
    if (selectedForCompare.find(m => m.id === major.id)) {
      setSelectedForCompare(selectedForCompare.filter(m => m.id !== major.id));
    } else if (selectedForCompare.length < 3) {
      setSelectedForCompare([...selectedForCompare, major]);
    }
  };

  // Export results as text
  const handleExport = () => {
    const text = `
═══════════════════════════════════════════════════════
        تقرير التوصيات المهنية - توجيه AI
═══════════════════════════════════════════════════════

التاريخ: ${new Date().toLocaleDateString('ar-KW')}
عدد التخصصات الموصى بها: ${recommendations.length}

───────────────────────────────────────────────────────
              التخصصات الموصى بها
───────────────────────────────────────────────────────

${recommendations.map((m, i) => `
${i + 1}. ${m.name} ${i === 0 ? '⭐ (الأفضل لك)' : ''}
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   📊 نسبة التطابق: ${m.matchScore}%
   💰 متوسط الراتب: ${m.salary.avg} د.ك
   📚 مدة الدراسة: ${m.studyYears} سنوات
   
   📋 نسب القبول:
   ${m.admissionData?.kuwaitUniversity ? `   • جامعة الكويت: ${m.admissionData.kuwaitUniversity.minPercentage}` : ''}
   ${m.admissionData?.paaet ? `   • التطبيقي: ${m.admissionData.paaet.minPercentage}` : ''}
   
   🌍 البعثات: ${m.scholarships?.available ? 'متاح' : 'غير متاح'}
   ${m.scholarships?.available ? `   الدول: ${m.scholarships.countries.join('، ')}` : ''}
`).join('\n')}

═══════════════════════════════════════════════════════
تم إنشاء هذا التقرير بواسطة توجيه AI
مشروع تخرج 2025 - الكلية التقنية، الكويت
═══════════════════════════════════════════════════════
    `;
    
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tawjeeh-ai-results-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Share results
  const handleShare = () => {
    const shareText = `🎓 نتائج توجيه AI\n\n✨ أفضل تخصص لي: ${topMajor?.name}\n📊 نسبة التطابق: ${topMajor?.matchScore}%\n💰 متوسط الراتب: ${topMajor?.salary.avg} د.ك\n\n🔗 اكتشف تخصصك المناسب الآن!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'نتائج توجيه AI',
        text: shareText,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText + '\n' + window.location.href)
        .then(() => alert('✅ تم نسخ النتائج!'))
        .catch(() => alert('⚠️ فشل النسخ'));
    }
  };

  // Prepare chart data
  const salaryComparisonData = recommendations.slice(0, 10).map(m => ({
    name: m.name.length > 15 ? m.name.substring(0, 12) + '...' : m.name,
    الراتب: m.salary.avg
  }));

  const matchScoreData = recommendations.slice(0, 10).map(m => ({
    name: m.name.length > 15 ? m.name.substring(0, 12) + '...' : m.name,
    التطابق: m.matchScore
  }));

  const COLORS = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
    '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#fbbf24'
  ];

  // ========================================
  // NEW: Render Admission Data Section
  // ========================================
  const renderAdmissionData = (major) => {
    const admission = major.admissionData;
    if (!admission) return null;

    return (
      <div className="bg-white rounded-xl p-5 border-2 border-blue-200 shadow-sm">
        <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2 text-lg">
          <Percent className="w-5 h-5" />
          نسب القبول الرسمية
        </h4>
        
        <div className="space-y-4">
          {/* Kuwait University */}
          {admission.kuwaitUniversity && (
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <h5 className="font-bold text-blue-900">جامعة الكويت</h5>
                </div>
                <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-bold">
                  {admission.kuwaitUniversity.minPercentage}
                </span>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <strong>الكلية:</strong> {admission.kuwaitUniversity.college}
                </p>
                <p className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <strong>المتطلبات:</strong> {admission.kuwaitUniversity.requirements}
                </p>
                <p className="flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4 text-blue-600" />
                  <strong>العام:</strong> {admission.kuwaitUniversity.year}
                </p>
                {admission.kuwaitUniversity.source && (
                  <a 
                    href={admission.kuwaitUniversity.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold mt-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    المصدر الرسمي
                  </a>
                )}
                {admission.kuwaitUniversity.lastUpdated && (
                  <p className="text-xs text-gray-500 mt-1">
                    آخر تحديث: {admission.kuwaitUniversity.lastUpdated}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* PAAET */}
          {admission.paaet && (
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-green-600" />
                  <h5 className="font-bold text-green-900">الهيئة العامة للتعليم التطبيقي</h5>
                </div>
                {admission.paaet.minPercentage && (
                  <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-bold">
                    {admission.paaet.minPercentage}
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-green-600" />
                  <strong>الكلية:</strong> {admission.paaet.college}
                </p>
                {admission.paaet.programs && (
                  <div className="mt-2">
                    <strong>البرامج المتاحة:</strong>
                    <ul className="mr-4 mt-1 space-y-1">
                      {admission.paaet.programs.map((prog, i) => (
                        <li key={i} className="text-gray-600">• {prog}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {admission.paaet.requirements && (
                  <p className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-green-600" />
                    <strong>المتطلبات:</strong> {admission.paaet.requirements}
                  </p>
                )}
                {admission.paaet.note && (
                  <p className="text-xs text-gray-600 bg-green-100 p-2 rounded mt-2">
                    💡 {admission.paaet.note}
                  </p>
                )}
                {admission.paaet.source && (
                  <a 
                    href={admission.paaet.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-green-600 hover:text-green-800 font-semibold mt-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    المصدر الرسمي
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Private Universities */}
          {admission.privateUniversities && admission.privateUniversities.length > 0 && (
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <h5 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-orange-600" />
                الجامعات الخاصة
              </h5>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {admission.privateUniversities.map((uni, i) => (
                  <div key={i} className="bg-white p-2 rounded border border-orange-200">
                    <div className="font-semibold text-orange-900">{uni.name}</div>
                    <div className="text-gray-600">الحد الأدنى: {uni.minGPA}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ========================================
  // NEW: Render Scholarships Section
  // ========================================
  const renderScholarships = (major) => {
    const scholarships = major.scholarships;
    if (!scholarships?.available) {
      return (
        <div className="bg-gray-100 rounded-xl p-5 border-2 border-gray-300">
          <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            البعثات الخارجية
          </h4>
          <p className="text-gray-600 text-sm">
            لا توجد بعثات خارجية متاحة حالياً لهذا التخصص
          </p>
        </div>
      );
    }

    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border-2 border-blue-300 shadow-sm">
        <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2 text-lg">
          <Globe className="w-5 h-5" />
          البعثات الخارجية المتاحة 🌍
        </h4>
        
        <div className="space-y-4">
          {/* Countries */}
          <div>
            <h5 className="font-semibold text-blue-800 mb-2 text-sm">الدول المتاحة:</h5>
            <div className="flex flex-wrap gap-2">
              {scholarships.countries.map((country, i) => (
                <span 
                  key={i}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-full text-sm font-semibold shadow-sm"
                >
                  🌍 {country}
                </span>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <h5 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              المتطلبات:
            </h5>
            <ul className="space-y-1.5 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-blue-600" />
                <span><strong>الحد الأدنى:</strong> {scholarships.minPercentage} من الثانوية</span>
              </li>
              <li className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span><strong>اللغة:</strong> {scholarships.requirements}</span>
              </li>
            </ul>
          </div>

          {/* Top Universities */}
          {scholarships.topUniversities && (
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-4 border border-yellow-300">
              <h5 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-600" />
                أفضل الجامعات:
              </h5>
              <div className="flex flex-wrap gap-2">
                {scholarships.topUniversities.map((uni, i) => (
                  <span key={i} className="text-xs bg-white px-2 py-1 rounded border border-amber-200 text-gray-700">
                    {uni}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Popular Programs */}
          {scholarships.popularPrograms && (
            <div>
              <h5 className="font-semibold text-blue-800 mb-2 text-sm">البرامج الشائعة:</h5>
              <ul className="space-y-1 text-sm text-gray-700">
                {scholarships.popularPrograms.map((prog, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{prog}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Source & Notes */}
          <div className="bg-blue-100 rounded-lg p-3 text-sm">
            <div className="flex items-center gap-2 text-blue-900 mb-1">
              <FileText className="w-4 h-4" />
              <strong>المصدر:</strong> {scholarships.source || 'وزارة التعليم العالي'}
            </div>
            {scholarships.notes && (
              <p className="text-blue-700 text-xs mt-2">
                💡 {scholarships.notes}
              </p>
            )}
            <a 
              href="https://www.mohe.edu.kw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold mt-2"
            >
              <ExternalLink className="w-4 h-4" />
              موقع وزارة التعليم العالي
            </a>
          </div>
        </div>
      </div>
    );
  };

  // ========================================
  // Render Functions
  // ========================================

  // Render Header
  const renderHeader = () => (
    <div className="text-center mb-12 fade-in">
      <div className="inline-block p-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mb-4 shadow-lg">
        <Trophy className="w-16 h-16 text-white float" />
      </div>
      <h1 className="text-5xl font-black mb-4 text-blue-900">
        🎉 تهانينا! نتائجك جاهزة
      </h1>
      <p className="text-xl text-gray-700 mb-6">
        حللنا اختياراتك ووجدنا أفضل {recommendations.length} تخصص مناسب لك
      </p>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div className="card-official rounded-xl p-4 bg-white">
          <div className="text-3xl font-bold text-blue-600">{recommendations.length}</div>
          <div className="text-sm text-gray-600">تخصص موصى به</div>
        </div>
        <div className="card-official rounded-xl p-4 bg-white">
          <div className="text-3xl font-bold text-green-600">{topMajor?.matchScore}%</div>
          <div className="text-sm text-gray-600">أعلى تطابق</div>
        </div>
        <div className="card-official rounded-xl p-4 bg-white">
          <div className="text-3xl font-bold text-amber-600">{topMajor?.salary.avg}</div>
          <div className="text-sm text-gray-600">متوسط راتب (د.ك)</div>
        </div>
        <div className="card-official rounded-xl p-4 bg-white">
          <div className="text-3xl font-bold text-purple-600">{topMajor?.studyYears}</div>
          <div className="text-sm text-gray-600">سنوات دراسة</div>
        </div>
      </div>
    </div>
  );

  // Render Tabs
  const renderTabs = () => (
    <div className="flex justify-center gap-2 mb-8 flex-wrap">
      {[
        { id: 'recommendations', label: 'التخصصات الموصى بها', icon: Star },
        { id: 'comparison', label: 'المقارنة', icon: BarChart3 },
        { id: 'insights', label: 'رؤى السوق', icon: TrendingUp }
      ].map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === tab.id
              ? 'bg-blue-600 text-white scale-105 shadow-lg'
              : 'bg-white text-gray-700 hover:bg-blue-50 border-2 border-blue-200'
          }`}
        >
          <tab.icon className="w-5 h-5" />
          {tab.label}
        </button>
      ))}
    </div>
  );

  // Render Top Recommendation Banner
  const renderTopRecommendation = () => {
    if (!topMajor) return null;
    const demandInfo = getDemandInfo(topMajor.demandLevel);

    return (
      <div className="bg-white rounded-3xl p-8 mb-8 border-4 border-blue-400 shadow-xl slide-up max-w-5xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-6xl">{topMajor.icon}</div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-black text-blue-900">{topMajor.name}</h2>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-600 text-white text-sm font-bold shadow">
                  <Trophy className="w-4 h-4" />
                  الأفضل لك
                </div>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className="px-3 py-1 rounded-full text-sm font-semibold"
                  style={{ backgroundColor: demandInfo.bg, color: demandInfo.color }}
                >
                  الطلب: {demandInfo.text}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700 border border-green-300">
                  <CheckCircle className="w-4 h-4 inline ml-1" />
                  {topMajor.matchScore}% تطابق
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
            <DollarSign className="w-8 h-8 text-green-600 mb-2" />
            <div className="text-2xl font-bold text-green-900">{topMajor.salary.avg} د.ك</div>
            <div className="text-sm text-gray-600">متوسط الراتب</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
            <GraduationCap className="w-8 h-8 text-blue-600 mb-2" />
            <div className="text-2xl font-bold text-blue-900">{topMajor.studyYears} سنوات</div>
            <div className="text-sm text-gray-600">مدة الدراسة</div>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200">
            <Clock className="w-8 h-8 text-amber-600 mb-2" />
            <div className="text-2xl font-bold text-amber-900">{topMajor.waitingMonths} شهر</div>
            <div className="text-sm text-gray-600">فترة الانتظار</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
            <Users className="w-8 h-8 text-purple-600 mb-2" />
            <div className="text-2xl font-bold text-purple-900">{topMajor.hiredPerYear}</div>
            <div className="text-sm text-gray-600">توظيف سنوياً</div>
          </div>
        </div>

        {/* Market Trend Chart */}
        {topMajor.marketTrend && (
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-gray-800">
              <TrendingUp className="w-5 h-5 text-green-600" />
              اتجاه الطلب في السوق
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={topMajor.marketTrend}>
                <XAxis dataKey="year" stroke="#374151" />
                <YAxis stroke="#374151" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #3b82f6' }} />
                <Line type="monotone" dataKey="demand" stroke="#3b82f6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Admission Data for Top Major */}
        <div className="grid md:grid-cols-2 gap-4">
          {renderAdmissionData(topMajor)}
          {renderScholarships(topMajor)}
        </div>
      </div>
    );
  };

  // Render All Recommendations - UPDATED WITH ADMISSION & SCHOLARSHIPS
  const renderRecommendations = () => (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        {recommendations.map((major, index) => {
          const isExpanded = expandedMajor === major.id;
          const demandInfo = getDemandInfo(major.demandLevel);
          const isTop = index === 0;

          return (
            <div
              key={major.id}
              className={`bg-white rounded-2xl p-6 transition-all hover:shadow-lg border-2 ${
                isTop ? 'border-blue-400' : 'border-gray-200'
              } ${isExpanded ? 'md:col-span-2' : ''}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-4xl">{major.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-900">{major.name}</h3>
                      {isTop && (
                        <div className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs font-bold">
                          #1
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: demandInfo.bg, color: demandInfo.color }}
                      >
                        {demandInfo.text}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleExpand(major.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span>الراتب: <strong>{major.salary.avg} د.ك</strong></span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>الدراسة: <strong>{major.studyYears} سنوات</strong></span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>الانتظار: <strong>{major.waitingMonths} شهر</strong></span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Target className="w-4 h-4 text-purple-600" />
                  <span>الصعوبة: <strong>{major.difficulty}</strong></span>
                </div>
              </div>

              {/* Match Score Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-700">نسبة التطابق</span>
                  <span className="font-bold text-blue-600">{major.matchScore}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000"
                    style={{ width: `${major.matchScore}%` }}
                  />
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="mt-4 space-y-4 slide-up">
                  {/* Admission & Scholarships */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {renderAdmissionData(major)}
                    {renderScholarships(major)}
                  </div>

                  {/* Employers */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-800">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      جهات التوظيف
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {major.employers?.map((employer, i) => (
                        <span key={i} className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-700">
                          {employer}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Advantages & Disadvantages */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                      <h4 className="font-bold mb-2 flex items-center gap-2 text-green-700">
                        <CheckCircle className="w-5 h-5" />
                        المميزات
                      </h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {major.advantages?.map((adv, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span>{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                      <h4 className="font-bold mb-2 flex items-center gap-2 text-red-700">
                        <AlertCircle className="w-5 h-5" />
                        التحديات
                      </h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {major.disadvantages?.map((dis, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-red-600 mt-1">•</span>
                            <span>{dis}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Market Trend */}
                  {major.marketTrend && (
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <h4 className="font-bold mb-3 flex items-center gap-2 text-gray-800">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        اتجاه الطلب في السوق
                      </h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={major.marketTrend}>
                          <XAxis dataKey="year" stroke="#374151" />
                          <YAxis stroke="#374151" />
                          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #10b981' }} />
                          <Line type="monotone" dataKey="demand" stroke="#10b981" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => toggleExpand(major.id)}
                  className="flex-1 py-2 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-sm font-semibold transition"
                >
                  {isExpanded ? 'إخفاء التفاصيل' : 'عرض نسب القبول والبعثات'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Render Comparison View
  const renderComparison = () => (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          مقارنة التخصصات - أفضل {recommendations.length} نتيجة
        </h2>
        
        {/* Salary Comparison Chart */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">مقارنة الرواتب (د.ك)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={salaryComparisonData} margin={{ bottom: 60 }}>
              <XAxis 
                dataKey="name" 
                stroke="#374151" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={11}
              />
              <YAxis stroke="#374151" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #3b82f6' }}
              />
              <Bar dataKey="الراتب" radius={[8, 8, 0, 0]}>
                {salaryComparisonData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Match Score Comparison */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">مقارنة نسب التطابق (%)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={matchScoreData} margin={{ bottom: 60 }}>
              <XAxis 
                dataKey="name" 
                stroke="#374151"
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={11}
              />
              <YAxis stroke="#374151" domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #3b82f6' }}
              />
              <Bar dataKey="التطابق" radius={[8, 8, 0, 0]}>
                {matchScoreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  // Render Market Insights
  const renderInsights = () => {
    const avgSalary = Math.round(recommendations.reduce((sum, m) => sum + m.salary.avg, 0) / recommendations.length);
    const highDemandCount = recommendations.filter(m => m.demandLevel >= 75).length;
    
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900">
            <TrendingUp className="w-6 h-6 text-green-600" />
            رؤى سوق العمل الكويتي
          </h2>

          <div className="space-y-6">
            {/* Statistics */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-2 border-green-300">
                <div className="text-3xl font-bold text-green-700">{avgSalary} د.ك</div>
                <div className="text-sm text-gray-600">متوسط الرواتب المتوقع</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-300">
                <div className="text-3xl font-bold text-blue-700">{highDemandCount}/{recommendations.length}</div>
                <div className="text-sm text-gray-600">تخصصات عالية الطلب</div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border-2 border-amber-300">
                <div className="text-3xl font-bold text-amber-700">{topMajor?.matchScore}%</div>
                <div className="text-sm text-gray-600">أعلى نسبة تطابق</div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
              <h3 className="font-bold mb-3 text-blue-800">💡 نصائح مهمة</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>التخصصات التقنية تشهد أعلى نمو في الطلب (+18% سنوياً)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>القطاع الصحي يحتاج 450+ توظيف سنوياً في الكويت</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>الحصول على شهادات إضافية يزيد فرص التوظيف بنسبة 40%</span>
                </li>
              </ul>
            </div>

            {/* Next Steps */}
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
              <h3 className="font-bold mb-3 text-green-800">🎯 خطواتك التالية</h3>
              <ol className="space-y-2 text-sm list-decimal list-inside text-gray-700">
                <li>راجع نسب القبول الرسمية للتخصصات المقترحة</li>
                <li>تحقق من متطلبات البعثات الخارجية إذا كنت مهتماً</li>
                <li>زر مواقع الجامعات الرسمية للمزيد من التفاصيل</li>
                <li>تحدث مع طلاب وخريجين في هذه التخصصات</li>
                <li>استشر أهلك ومرشديك الأكاديميين</li>
              </ol>
            </div>

            {/* Warning Box */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4">
              <h3 className="font-bold mb-2 text-amber-800 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                تنبيه مهم
              </h3>
              <p className="text-sm text-gray-700">
                نسب القبول المعروضة مبنية على البيانات الرسمية لعام 2024/2025. 
                يُنصح بزيارة المواقع الرسمية للجامعات للتحقق من أحدث النسب قبل التقديم.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ========================================
  // Main Render
  // ========================================
  
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md border-2 border-gray-200">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold mb-4 text-gray-900">لا توجد نتائج متاحة</h2>
          <p className="text-gray-600 mb-6">
            لم يتم العثور على نتائج التقييم. يرجى العودة وإكمال التقييم.
          </p>
          <button
            onClick={onBackToAssessment || onRestart}
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition flex items-center gap-2 mx-auto"
          >
            <ArrowRight className="w-5 h-5" />
            العودة للتقييم
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      {renderHeader()}

      {/* Top Recommendation Banner */}
      {renderTopRecommendation()}

      {/* Action Buttons */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 hover:border-blue-400 text-gray-700 rounded-xl font-semibold transition"
        >
          <Download className="w-5 h-5" />
          تحميل النتائج
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 hover:border-blue-400 text-gray-700 rounded-xl font-semibold transition"
        >
          <Share2 className="w-5 h-5" />
          مشاركة
        </button>
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg"
        >
          <RefreshCw className="w-5 h-5" />
          إعادة التقييم
        </button>
      </div>

      {/* Tabs */}
      {renderTabs()}

      {/* Tab Content */}
      <div className="mb-12">
        {activeTab === 'recommendations' && renderRecommendations()}
        {activeTab === 'comparison' && renderComparison()}
        {activeTab === 'insights' && renderInsights()}
      </div>

      {/* Footer CTA */}
      <div className="text-center py-8">
        <div className="inline-block bg-white rounded-2xl p-6 max-w-2xl border-2 border-blue-200 shadow-lg">
          <Heart className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2 text-gray-900">شكراً لاستخدامك توجيه AI! 🎓</h3>
          <p className="text-gray-600 mb-4">
            نتمنى لك التوفيق في مسيرتك الأكاديمية والمهنية.
          </p>
          <div className="text-sm text-gray-500 space-y-1">
            <p className="font-semibold">مشروع تخرج 2025 • الكلية التقنية - الكويت</p>
            <p className="text-xs">تم تطويره باستخدام تقنيات الذكاء الاصطناعي وبيانات رسمية</p>
          </div>
        </div>
      </div>
    </div>
  );
}
