import React from 'react'

export default function HomePage({ onStart }) {
  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-5xl font-bold mb-3">توجيه AI</h1>
      <p className="text-lg text-purple-100 mb-8">
        مستشارك الذكي لاختيار التخصص والمسار المهني في الكويت 🇰🇼
      </p>

      <div className="card-glass rounded-2xl p-6 max-w-xl w-full">
        <p className="mb-6">
          جاوب على أسئلة سريعة عن مهاراتك واهتماماتك وتفضيلاتك في الدراسة،
          وبنعرض لك التخصصات المناسبة مع <b>الطلب الوظيفي</b>، <b>الرواتب</b>، <b>جهات التوظيف</b>،
          و<b>فترة الانتظار في الديوان</b>.
        </p>

        <button
          onClick={onStart}
          className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg hover:scale-105 transition-transform w-full"
        >
          ابدأ التقييم الآن
        </button>
      </div>

      <div className="mt-10 text-sm text-purple-200">
        مشروع تخرج 2025 — واجهة عربية بالكامل (RTL)
      </div>
    </div>
  )
}

