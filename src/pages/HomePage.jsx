import React from 'react'
import { Sparkles, Target, TrendingUp, Briefcase, GraduationCap, Users } from 'lucide-react'

export default function HomePage({ onStart }) {
  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      
      {/* عناصر ديكور في الخلفية */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 left-10 w-32 h-32 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      
      {/* المحتوى الرئيسي */}
      <div className="relative z-10 max-w-5xl w-full">
        
        {/* الشعار والعنوان */}
        <div className="mb-8 fade-in">
          <div className="inline-block mb-4">
            <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-2 float" />
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-4 text-glow">
            توجيه AI
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 mb-4 font-semibold">
            مستشارك الذكي لاختيار التخصص والمسار المهني في الكويت 🇰🇼
          </p>
          <div className="flex items-center justify-center gap-2 text-yellow-400">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-sm">أول منصة كويتية ذكية للتوجيه المهني</span>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* البطاقة الرئيسية */}
        <div className="card-glass rounded-3xl p-8 md:p-10 max-w-2xl mx-auto mb-10 slide-up">
          <p className="text-lg leading-relaxed mb-8 text-purple-50">
            جاوب على أسئلة سريعة عن <span className="text-yellow-400 font-bold">مهاراتك</span> و
            <span className="text-yellow-400 font-bold">اهتماماتك</span> و
            <span className="text-yellow-400 font-bold">تفضيلاتك</span> في الدراسة،
            وبنعرض لك التخصصات المناسبة مع:
          </p>
          
          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-sm font-semibold">الطلب الوظيفي</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all">
              <Briefcase className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-sm font-semibold">متوسط الرواتب</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all">
              <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-sm font-semibold">جهات التوظيف</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all">
              <Target className="w-8 h-8 text-pink-400 mx-auto mb-2" />
              <p className="text-sm font-semibold">فترة الانتظار</p>
            </div>
          </div>

          {/* زر البداية */}
          <button
            onClick={onStart}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 px-10 rounded-xl hover:scale-105 hover:shadow-2xl transition-all w-full text-lg pulse-button flex items-center justify-center gap-3"
          >
            <GraduationCap className="w-6 h-6" />
            ابدأ التقييم الآن
          </button>
          
          <p className="text-xs text-purple-200 mt-4">
            ⏱️ يستغرق 3-5 دقائق فقط
          </p>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10 scale-in">
          <div className="card-glass rounded-xl p-6 hover:scale-105 transition-transform">
            <div className="text-4xl font-black text-yellow-400 mb-2">50+</div>
            <p className="text-sm text-purple-200">تخصص جامعي</p>
          </div>
          <div className="card-glass rounded-xl p-6 hover:scale-105 transition-transform">
            <div className="text-4xl font-black text-green-400 mb-2">120+</div>
            <p className="text-sm text-purple-200">مسار وظيفي</p>
          </div>
          <div className="card-glass rounded-xl p-6 hover:scale-105 transition-transform">
            <div className="text-4xl font-black text-pink-400 mb-2">100%</div>
            <p className="text-sm text-purple-200">بيانات محلية كويتية</p>
          </div>
        </div>

        {/* معلومات إضافية */}
        <div className="text-sm text-purple-200 space-y-2 fade-in">
          <p>🎓 <b>مبني على بيانات حقيقية</b> من ديوان الخدمة المدنية وسوق العمل الكويتي</p>
          <p>🤖 <b>يستخدم الذكاء الاصطناعي</b> لتحليل إجاباتك وتقديم توصيات دقيقة</p>
          <p>📊 <b>محدّث باستمرار</b> لمواكبة احتياجات السوق الحالية</p>
        </div>

        {/* Footer المشروع */}
        <div className="mt-12 text-sm text-purple-300/80">
          <p className="mb-2">مشروع تخرج 2025 — واجهة عربية بالكامل (RTL)</p>
          <p className="text-xs">
            <span className="text-purple-400">Abdulrahman Alharbi</span> • 
            <span className="text-purple-400"> Husain Alnaser</span> • 
            <span className="text-purple-400"> Mesfer Alajmi</span>
          </p>
        </div>
      </div>
    </div>
  )
}
