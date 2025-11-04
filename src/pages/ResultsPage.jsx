import React, { useState } from 'react';
import {
  Trophy, TrendingUp, Briefcase, Clock, GraduationCap, Award,
  DollarSign, Users, MapPin, Star, Download, Share2, RefreshCw,
  CheckCircle, AlertCircle, ChevronDown, ChevronUp, BarChart3,
  Target, Zap, Heart, ArrowRight
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

  // Export results as text - ENHANCED VERSION
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
   💰 متوسط الراتب: ${m.salary.avg} د.ك (${m.salary.min} - ${m.salary.max})
   📚 مدة الدراسة: ${m.studyYears} سنوات
   ⏳ فترة الانتظار المتوقعة: ${m.waitingMonths} شهر
   📈 مستوى الطلب: ${m.demandLevel}%
   👥 عدد التوظيف السنوي: ${m.hiredPerYear}
   ${m.advantages ? `\n   ✅ المميزات:\n${m.advantages.map(a => `      • ${a}`).join('\n')}` : ''}
   ${m.disadvantages ? `\n   ⚠️  التحديات:\n${m.disadvantages.map(d => `      • ${d}`).join('\n')}` : ''}
`).join('\n')}

───────────────────────────────────────────────────────
                   معلومات إضافية
───────────────────────────────────────────────────────

• متوسط الرواتب للتخصصات المقترحة: ${Math.round(recommendations.reduce((sum, m) => sum + m.salary.avg, 0) / recommendations.length)} د.ك
• عدد التخصصات ذات الطلب العالي: ${recommendations.filter(m => m.demandLevel >= 75).length}
• أقصر فترة انتظار: ${Math.min(...recommendations.map(m => m.waitingMonths))} شهر

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

  // Share results - ENHANCED VERSION
  const handleShare = () => {
    const shareText = `🎓 نتائج توجيه AI\n\n✨ أفضل تخصص لي: ${topMajor?.name}\n📊 نسبة التطابق: ${topMajor?.matchScore}%\n💰 متوسط الراتب: ${topMajor?.salary.avg} د.ك\n\n🔗 اكتشف تخصصك المناسب الآن!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'نتائج توجيه AI - منصة التوجيه المهني الذكية',
        text: shareText,
        url: window.location.href
      }).catch((error) => {
        if (error.name !== 'AbortError') {
          console.log('Error sharing:', error);
        }
      });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(shareText + '\n' + window.location.href)
        .then(() => alert('✅ تم نسخ النتائج للحافظة!'))
        .catch(() => alert('⚠️ فشل النسخ. جرب مرة أخرى.'));
    }
  };

  // Prepare chart data - NOW SHOWS TOP 10!
  const salaryComparisonData = recommendations.slice(0, 10).map(m => ({
    name: m.name.length > 15 ? m.name.substring(0, 12) + '...' : m.name,
    الراتب: m.salary.avg
  }));

  const matchScoreData = recommendations.slice(0, 10).map(m => ({
    name: m.name.length > 15 ? m.name.substring(0, 12) + '...' : m.name,
    التطابق: m.matchScore
  }));

  // 10 COLORS for 10 majors
  const COLORS = [
    '#facc15', '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
    '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316'
  ];

  // ========================================
  // Render Functions
  // ========================================

  // Render Header
  const renderHeader = () => (
    <div className="text-center mb-12 fade-in">
      <div className="inline-block p-4 bg-yellow-400/20 rounded-full mb-4">
        <Trophy className="w-16 h-16 text-yellow-400 float" />
      </div>
      <h1 className="text-5xl font-black mb-4 text-glow">
        🎉 تهانينا! نتائجك جاهزة
      </h1>
      <p className="text-xl text-purple-200 mb-6">
        حللنا اختياراتك ووجدنا أفضل {recommendations.length} {recommendations.length === 10 ? 'تخصصات' : 'تخصص'} مناسبة لك
      </p>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div className="card-glass rounded-xl p-4">
          <div className="text-3xl font-bold text-yellow-400">{recommendations.length}</div>
          <div className="text-sm text-purple-200">تخصص موصى به</div>
        </div>
        <div className="card-glass rounded-xl p-4">
          <div className="text-3xl font-bold text-green-400">{topMajor?.matchScore}%</div>
          <div className="text-sm text-purple-200">أعلى تطابق</div>
        </div>
        <div className="card-glass rounded-xl p-4">
          <div className="text-3xl font-bold text-blue-400">{topMajor?.salary.avg}</div>
          <div className="text-sm text-purple-200">متوسط راتب (د.ك)</div>
        </div>
        <div className="card-glass rounded-xl p-4">
          <div className="text-3xl font-bold text-pink-400">{topMajor?.studyYears}</div>
          <div className="text-sm text-purple-200">سنوات دراسة</div>
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
              ? 'bg-yellow-400 text-black scale-105'
              : 'bg-white/10 text-white hover:bg-white/20'
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
      <div className="card-glass rounded-3xl p-8 mb-8 border-4 border-yellow-400/50 slide-up max-w-5xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-6xl">{topMajor.icon}</div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-black">{topMajor.name}</h2>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-400 text-black text-sm font-bold">
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
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-500/20 text-green-400">
                  <CheckCircle className="w-4 h-4 inline ml-1" />
                  {topMajor.matchScore}% تطابق
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 rounded-xl p-4">
            <DollarSign className="w-8 h-8 text-green-400 mb-2" />
            <div className="text-2xl font-bold">{topMajor.salary.avg} د.ك</div>
            <div className="text-sm text-purple-200">متوسط الراتب</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <GraduationCap className="w-8 h-8 text-blue-400 mb-2" />
            <div className="text-2xl font-bold">{topMajor.studyYears} سنوات</div>
            <div className="text-sm text-purple-200">مدة الدراسة</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <Clock className="w-8 h-8 text-yellow-400 mb-2" />
            <div className="text-2xl font-bold">{topMajor.waitingMonths} شهر</div>
            <div className="text-sm text-purple-200">فترة الانتظار</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <Users className="w-8 h-8 text-pink-400 mb-2" />
            <div className="text-2xl font-bold">{topMajor.hiredPerYear}</div>
            <div className="text-sm text-purple-200">توظيف سنوياً</div>
          </div>
        </div>

        {/* Market Trend Chart */}
        {topMajor.marketTrend && (
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              اتجاه الطلب في السوق
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={topMajor.marketTrend}>
                <XAxis dataKey="year" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Line type="monotone" dataKey="demand" stroke="#facc15" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Why This Major */}
        <div className="mt-6 bg-yellow-400/10 border-2 border-yellow-400/30 rounded-xl p-4">
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-yellow-400">
            <Zap className="w-5 h-5" />
            لماذا هذا التخصص مناسب لك؟
          </h3>
          <p className="text-purple-100">
            بناءً على اختياراتك، يتطابق هذا التخصص بنسبة <strong className="text-yellow-400">{topMajor.matchScore}%</strong> مع اهتماماتك ومهاراتك. 
            {' '}{topMajor.advantages && `المميزات الرئيسية: ${topMajor.advantages.join('، ')}.`}
          </p>
        </div>
      </div>
    );
  };

  // Render All Recommendations
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
              className={`card-glass rounded-2xl p-6 transition-all hover:scale-[1.02] ${
                isTop ? 'border-2 border-yellow-400/50' : ''
              } ${isExpanded ? 'md:col-span-2' : ''}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-4xl">{major.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold">{major.name}</h3>
                      {isTop && (
                        <div className="px-2 py-0.5 rounded-full bg-yellow-400 text-black text-xs font-bold">
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
                  className="p-2 hover:bg-white/10 rounded-lg transition"
                >
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <span>الراتب: <strong>{major.salary.avg} د.ك</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  <span>الدراسة: <strong>{major.studyYears} سنوات</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <span>الانتظار: <strong>{major.waitingMonths} شهر</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-pink-400" />
                  <span>الصعوبة: <strong>{major.difficulty}</strong></span>
                </div>
              </div>

              {/* Match Score Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>نسبة التطابق</span>
                  <span className="font-bold text-yellow-400">{major.matchScore}%</span>
                </div>
                <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-1000"
                    style={{ width: `${major.matchScore}%` }}
                  />
                </div>
              </div>

              {/* Salary Chart (Mini) */}
              {!isExpanded && (
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'أدنى', value: major.salary.min },
                        { name: 'متوسط', value: major.salary.avg },
                        { name: 'أعلى', value: major.salary.max }
                      ]}
                    >
                      <XAxis dataKey="name" stroke="#fff" fontSize={12} />
                      <YAxis stroke="#fff" fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#facc15" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Expanded Details */}
              {isExpanded && (
                <div className="mt-4 space-y-4 slide-up">
                  {/* Employers */}
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-blue-400" />
                      جهات التوظيف
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {major.employers?.map((employer, i) => (
                        <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                          {employer}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Advantages & Disadvantages */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                      <h4 className="font-bold mb-2 flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        المميزات
                      </h4>
                      <ul className="space-y-1 text-sm">
                        {major.advantages?.map((adv, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span>
                            <span>{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                      <h4 className="font-bold mb-2 flex items-center gap-2 text-red-400">
                        <AlertCircle className="w-5 h-5" />
                        التحديات
                      </h4>
                      <ul className="space-y-1 text-sm">
                        {major.disadvantages?.map((dis, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-red-400 mt-1">•</span>
                            <span>{dis}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Market Trend */}
                  {major.marketTrend && (
                    <div className="bg-white/5 rounded-xl p-4">
                      <h4 className="font-bold mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        اتجاه الطلب في السوق
                      </h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={major.marketTrend}>
                          <XAxis dataKey="year" stroke="#fff" />
                          <YAxis stroke="#fff" />
                          <Tooltip />
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
                  className="flex-1 py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition"
                >
                  {isExpanded ? 'إخفاء التفاصيل' : 'عرض المزيد'}
                </button>
                {compareMode && (
                  <button
                    onClick={() => toggleCompare(major)}
                    className={`py-2 px-4 rounded-lg text-sm font-semibold transition ${
                      selectedForCompare.find(m => m.id === major.id)
                        ? 'bg-yellow-400 text-black'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {selectedForCompare.find(m => m.id === major.id) ? '✓ محدد' : 'قارن'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Render Comparison View - ENHANCED WITH 10 RESULTS
  const renderComparison = () => (
    <div className="max-w-6xl mx-auto">
      <div className="card-glass rounded-2xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-400" />
          مقارنة التخصصات - أفضل {recommendations.length} نتيجة
        </h2>
        
        {/* Salary Comparison Chart */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">مقارنة الرواتب (د.ك)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={salaryComparisonData} margin={{ bottom: 60 }}>
              <XAxis 
                dataKey="name" 
                stroke="#fff" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={11}
              />
              <YAxis stroke="#fff" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e1b4b', border: '1px solid #facc15' }}
                labelStyle={{ color: '#fff' }}
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
          <h3 className="text-lg font-semibold mb-3">مقارنة نسب التطابق (%)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={matchScoreData} margin={{ bottom: 60 }}>
              <XAxis 
                dataKey="name" 
                stroke="#fff"
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={11}
              />
              <YAxis stroke="#fff" domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e1b4b', border: '1px solid #facc15' }}
                labelStyle={{ color: '#fff' }}
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

      {/* Compare Toggle */}
      <div className="text-center mb-6">
        <button
          onClick={() => {
            setCompareMode(!compareMode);
            setSelectedForCompare([]);
          }}
          className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-xl hover:scale-105 transition"
        >
          {compareMode ? 'إلغاء المقارنة' : 'تفعيل وضع المقارنة'}
        </button>
      </div>

      {/* Selected for Comparison */}
      {compareMode && selectedForCompare.length > 0 && (
        <div className="card-glass rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4">التخصصات المحددة للمقارنة ({selectedForCompare.length}/3)</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {selectedForCompare.map(major => (
              <div key={major.id} className="bg-white/5 rounded-xl p-4">
                <div className="text-3xl mb-2">{major.icon}</div>
                <div className="font-bold mb-2">{major.name}</div>
                <div className="text-sm space-y-1">
                  <div>التطابق: <strong className="text-yellow-400">{major.matchScore}%</strong></div>
                  <div>الراتب: <strong className="text-green-400">{major.salary.avg} د.ك</strong></div>
                  <div>الدراسة: <strong>{major.studyYears} سنوات</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Render Market Insights - ENHANCED WITH STATS
  const renderInsights = () => {
    // Calculate average salary and demand from recommendations
    const avgSalary = Math.round(recommendations.reduce((sum, m) => sum + m.salary.avg, 0) / recommendations.length);
    const highDemandCount = recommendations.filter(m => m.demandLevel >= 75).length;
    
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card-glass rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-400" />
            رؤى سوق العمل الكويتي
          </h2>

          <div className="space-y-6">
            {/* Statistics */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl p-4 border border-green-500/30">
                <div className="text-3xl font-bold text-green-400">{avgSalary} د.ك</div>
                <div className="text-sm text-purple-200">متوسط الرواتب المتوقع</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl p-4 border border-blue-500/30">
                <div className="text-3xl font-bold text-blue-400">{highDemandCount}/{recommendations.length}</div>
                <div className="text-sm text-purple-200">تخصصات عالية الطلب</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-xl p-4 border border-yellow-500/30">
                <div className="text-3xl font-bold text-yellow-400">{topMajor?.matchScore}%</div>
                <div className="text-sm text-purple-200">أعلى نسبة تطابق</div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-xl p-4">
              <h3 className="font-bold mb-3 text-blue-400">💡 نصائح مهمة</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>التخصصات التقنية تشهد أعلى نمو في الطلب (+18% سنوياً)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>القطاع الصحي يحتاج 450+ توظيف سنوياً في الكويت</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>الحصول على شهادات إضافية يزيد فرص التوظيف بنسبة 40%</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>متوسط فترة الانتظار للتوظيف: {Math.round(recommendations.reduce((sum, m) => sum + m.waitingMonths, 0) / recommendations.length)} شهر</span>
                </li>
              </ul>
            </div>

            {/* Next Steps */}
            <div className="bg-green-500/10 border-2 border-green-500/30 rounded-xl p-4">
              <h3 className="font-bold mb-3 text-green-400">🎯 خطواتك التالية</h3>
              <ol className="space-y-2 text-sm list-decimal list-inside">
                <li>راجع التخصصات المقترحة بعناية وقارن بين خياراتك</li>
                <li>تحدث مع طلاب أو خريجين في هذه التخصصات لمعرفة تجربتهم</li>
                <li>زر الجامعات واحضر أيام التوجيه المهني والأبواب المفتوحة</li>
                <li>ابحث عن فرص تدريبية صيفية أو تطوعية في المجال</li>
                <li>استشر أهلك ومرشديك الأكاديميين قبل اتخاذ القرار النهائي</li>
                <li>راجع متطلبات القبول في الجامعات للتخصصات المختارة</li>
              </ol>
            </div>

            {/* Warning Box */}
            <div className="bg-yellow-500/10 border-2 border-yellow-500/30 rounded-xl p-4">
              <h3 className="font-bold mb-2 text-yellow-400 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                تنبيه مهم
              </h3>
              <p className="text-sm text-purple-200">
                هذه النتائج مبنية على بيانات سوق العمل الحالية وتطابق اهتماماتك. 
                يُنصح بمراجعة أحدث البيانات والإحصائيات قبل اتخاذ القرار النهائي.
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
        <div className="card-glass rounded-2xl p-8 text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold mb-4">لا توجد نتائج متاحة</h2>
          <p className="text-purple-200 mb-6">
            لم يتم العثور على نتائج التقييم. يرجى العودة وإكمال التقييم للحصول على توصيات مخصصة لك.
          </p>
          <button
            onClick={onBackToAssessment || onRestart}
            className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
          >
            <ArrowRight className="w-5 h-5" />
            العودة للتقييم
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4">
      {/* Header */}
      {renderHeader()}

      {/* Top Recommendation Banner */}
      {renderTopRecommendation()}

      {/* Action Buttons */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition"
        >
          <Download className="w-5 h-5" />
          تحميل النتائج
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition"
        >
          <Share2 className="w-5 h-5" />
          مشاركة
        </button>
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black rounded-xl font-bold hover:scale-105 transition"
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
        <div className="inline-block card-glass rounded-2xl p-6 max-w-2xl">
          <Heart className="w-12 h-12 text-pink-400 mx-auto mb-3 animate-pulse" />
          <h3 className="text-xl font-bold mb-2">شكراً لاستخدامك توجيه AI! 🎓</h3>
          <p className="text-purple-200 mb-4">
            نتمنى لك التوفيق في مسيرتك الأكاديمية والمهنية. تذكر أن اختيار التخصص المناسب هو بداية رحلة النجاح!
          </p>
          <div className="text-sm text-purple-300 space-y-1">
            <p className="font-semibold">مشروع تخرج 2025 • الكلية التقنية - الكويت</p>
            <p className="text-xs">تم تطويره باستخدام تقنيات الذكاء الاصطناعي وتحليل البيانات</p>
          </div>
        </div>
      </div>
    </div>
  );
}
