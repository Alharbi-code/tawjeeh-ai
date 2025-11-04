import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Sparkles, AlertCircle, 
  RefreshCw, Calendar, Lightbulb, Zap, ChevronDown, 
  ChevronUp, Clock, ArrowUp, ArrowDown
} from 'lucide-react';
import { getMarketUpdates, isGeminiConfigured } from '../services/geminiService';

export default function MarketUpdatesPanel() {
  // ========================================
  // State Management
  // ========================================
  const [updates, setUpdates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(null);

  // ========================================
  // Load Market Updates
  // ========================================
  useEffect(() => {
    loadMarketUpdates();
  }, []);

  const loadMarketUpdates = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMarketUpdates();
      setUpdates(data);
      setLastRefresh(new Date());
    } catch (err) {
      console.error('Error loading market updates:', err);
      setError('فشل تحميل التحديثات. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // Manual Refresh
  // ========================================
  const handleRefresh = () => {
    loadMarketUpdates();
  };

  // ========================================
  // Loading State
  // ========================================
  if (loading) {
    return (
      <div className="card-glass rounded-2xl p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-white/20 rounded w-48"></div>
          <div className="h-8 w-8 bg-white/20 rounded-full"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-white/20 rounded w-full"></div>
          <div className="h-4 bg-white/20 rounded w-3/4"></div>
          <div className="h-4 bg-white/20 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  // ========================================
  // Error State
  // ========================================
  if (error) {
    return (
      <div className="card-glass rounded-2xl p-6 border-2 border-red-500/30">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-red-400" />
          <h3 className="text-lg font-bold text-red-400">خطأ في التحديثات</h3>
        </div>
        <p className="text-red-300 mb-4">{error}</p>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm font-semibold transition"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  if (!updates) return null;

  // ========================================
  // Main Render
  // ========================================
  return (
    <div className="card-glass rounded-2xl p-6 slide-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <Sparkles className="w-6 h-6 text-green-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              آخر تحديثات السوق الكويتي
              {!isGeminiConfigured() && (
                <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">
                  Demo Mode
                </span>
              )}
            </h3>
            <div className="flex items-center gap-2 text-xs text-purple-300">
              <Clock className="w-3 h-3" />
              آخر تحديث: {updates.lastUpdated}
            </div>
          </div>
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="p-2 hover:bg-white/10 rounded-lg transition group"
          title="تحديث البيانات"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-500`} />
        </button>
      </div>

      {/* Top Demand Majors */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-green-400" />
          <h4 className="font-bold text-green-400">التخصصات الأكثر طلباً</h4>
        </div>
        
        <div className="space-y-2">
          {updates.topDemandMajors.slice(0, isExpanded ? undefined : 3).map((major, index) => (
            <div 
              key={index}
              className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 hover:bg-green-500/20 transition"
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-6 h-6 bg-green-500/30 rounded-full text-xs font-bold">
                    {index + 1}
                  </div>
                  <span className="font-semibold">{major.name}</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-green-500/30 rounded-full text-xs font-bold">
                  <ArrowUp className="w-3 h-3" />
                  {major.change}
                </div>
              </div>
              <p className="text-sm text-purple-200 mr-8">{major.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Declining Majors */}
      {updates.decliningMajors && updates.decliningMajors.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="w-5 h-5 text-red-400" />
            <h4 className="font-bold text-red-400">تخصصات منخفضة الطلب</h4>
          </div>
          
          <div className="space-y-2">
            {updates.decliningMajors.map((major, index) => (
              <div 
                key={index}
                className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 hover:bg-red-500/20 transition"
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="font-semibold">{major.name}</span>
                  <div className="flex items-center gap-1 px-2 py-1 bg-red-500/30 rounded-full text-xs font-bold">
                    <ArrowDown className="w-3 h-3" />
                    {major.change}
                  </div>
                </div>
                <p className="text-sm text-purple-200">{major.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emerging Fields */}
      {isExpanded && updates.emergingFields && updates.emergingFields.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h4 className="font-bold text-yellow-400">مجالات ناشئة</h4>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {updates.emergingFields.map((field, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-sm font-semibold text-yellow-300 hover:bg-yellow-500/30 transition"
              >
                {field}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Forecast */}
      {isExpanded && updates.shortTermForecast && (
        <div className="mb-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            <h4 className="font-bold text-blue-400">التوقعات القصيرة</h4>
          </div>
          <p className="text-sm text-purple-100 leading-relaxed">
            {updates.shortTermForecast}
          </p>
        </div>
      )}

      {/* Student Advice */}
      {isExpanded && updates.studentAdvice && (
        <div className="mb-4 bg-purple-500/10 border-2 border-purple-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-purple-400" />
            <h4 className="font-bold text-purple-400">نصيحة للطلاب</h4>
          </div>
          <p className="text-sm text-purple-100 leading-relaxed">
            {updates.studentAdvice}
          </p>
        </div>
      )}

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2"
      >
        {isExpanded ? (
          <>
            <ChevronUp className="w-4 h-4" />
            إخفاء التفاصيل
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" />
            عرض المزيد من التفاصيل
          </>
        )}
      </button>

      {/* Last Refresh Info */}
      {lastRefresh && (
        <div className="mt-4 text-xs text-center text-purple-400">
          تم التحديث: {lastRefresh.toLocaleTimeString('ar-KW')}
        </div>
      )}

      {/* Demo Mode Notice */}
      {!isGeminiConfigured() && (
        <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
          <p className="text-xs text-yellow-300 text-center">
            💡 هذه بيانات تجريبية. للحصول على تحديثات حقيقية، أضف Gemini API Key في الملف
          </p>
        </div>
      )}
    </div>
  );
}
