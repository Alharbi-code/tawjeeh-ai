// src/pages/ResultsPage.jsx
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DemandBadge = ({ level }) => {
  const color =
    level >= 80 ? "#10b981" : level >= 60 ? "#f59e0b" : "#ef4444";
  const txt = level >= 80 ? "عالٍ" : level >= 60 ? "متوسط" : "منخفض";
  return (
    <span
      className="px-3 py-1 rounded-full text-sm"
      style={{ backgroundColor: `${color}33`, color }}
    >
      الطلب: {txt} ({level}%)
    </span>
  );
};

export default function ResultsPage({ results, onRestart }) {
  const list = results?.top || [];

  // 🔹 نعرض أيضًا نتيجة الذكاء الاصطناعي المحفوظة من AssessmentPage
  const [aiResult, setAiResult] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("aiResult");
    if (stored) {
      try {
        setAiResult(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing AI result:", e);
      }
    }
  }, []);

  // 🔸 إعداد بيانات الرسم البياني لتوزيع الدرجات (الذكاء الاصطناعي)
  const aiChartData = aiResult
    ? Object.entries(aiResult.scores).map(([major, score]) => ({
        name: major,
        value: score,
      }))
    : [];

  return (
    <div className="min-h-screen p-6 text-white">
      <h2 className="text-3xl font-bold mb-2 text-center">نتائجك الشخصية</h2>
      <p className="text-center text-purple-100 mb-10">
        أفضل التخصصات المطابقة لميولك ومهاراتك في الكويت 🇰🇼
      </p>

      {/* 💡 قسم الذكاء الاصطناعي */}
      {aiResult && (
        <div className="max-w-4xl mx-auto mb-10 card-glass rounded-2xl p-6 text-center">
          <h3 className="text-2xl font-semibold mb-4 text-yellow-300">
            🔍 تحليل الذكاء الاصطناعي لتفضيلاتك
          </h3>
          <p className="text-xl mb-4">
            التخصص المقترح لك هو:{" "}
            <span className="font-bold text-green-400">
              {aiResult.recommended}
            </span>
          </p>

          <div className="h-56 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aiChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#60a5fa" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="mt-3 text-sm text-white/70">
            هذا التحليل ناتج عن مقارنة اهتماماتك وتفضيلاتك الدراسية بخوارزمية
            ذكية تساعد في تحديد التخصص الأقرب لميولك الفعلية.
          </p>
        </div>
      )}

      {/* 🔸 قائمة التخصصات المقترحة */}
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {list.map((m) => (
          <div
            key={m.id}
            className="card-glass rounded-2xl p-5 border border-white/10 hover:scale-[1.01] transition"
          >
            {/* عنوان التخصص + مستوى الطلب */}
            <div className="flex items-center justify-between mb-3">
              <div className="text-2xl font-bold">
                {m.icon} {m.name}
              </div>
              <DemandBadge level={m.demandLevel} />
            </div>

            {/* تفاصيل مختصرة */}
            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div>
                الراتب المتوقع: <b>{m.salary.avg} د.ك</b>
              </div>
              <div>
                مدة الدراسة: <b>{m.studyYears} سنوات</b>
              </div>
              <div>
                المسجلون في الديوان:{" "}
                <b>{m.registeredDiwan.toLocaleString()}</b>
              </div>
              <div>
                التوظيف سنويًا: <b>{m.hiredPerYear}</b>
              </div>
              <div>
                الانتظار المتوقع: <b>{m.waitingMonths} شهر</b>
              </div>
              <div>
                الصعوبة: <b>{m.difficulty}</b>
              </div>
            </div>

            {/* رسم بياني للرواتب */}
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "أدنى", value: m.salary.min },
                    { name: "متوسط", value: m.salary.avg },
                    { name: "أعلى", value: m.salary.max },
                  ]}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#facc15" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* جهات التوظيف */}
            <div className="mt-3 text-sm">
              <div className="mb-1">جهات التوظيف:</div>
              <ul className="list-disc pr-6 opacity-90">
                {m.employers.map((e, idx) => (
                  <li key={idx}>{e}</li>
                ))}
              </ul>
            </div>

            {/* مميزات وتحديات */}
            <div className="mt-4 text-sm opacity-90">
              <b>مميزات:</b> {m.advantages?.join("، ")}
              <br />
              <b>تحديات:</b> {m.disadvantages?.join("، ")}
            </div>

            {/* 🔥 قسم الشهادات والدورات المقترحة */}
            {m.certificates && (
              <div className="mt-4 text-sm bg-purple-800/40 p-3 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-2">
                  🎓 الشهادات والدورات المقترحة
                </h4>
                <ul className="list-disc pr-6 opacity-90 space-y-1">
                  {m.certificates.map((cert, i) => (
                    <li key={i}>{cert}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* نسبة التطابق */}
            <div className="mt-4 text-sm">
              <div className="mb-1">
                نسبة التطابق: <b>{m.matchScore}%</b>
              </div>
              <div className="w-full h-2 bg-white/20 rounded">
                <div
                  className="h-2 bg-yellow-400 rounded"
                  style={{ width: `${m.matchScore}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* زر إعادة التقييم */}
      <div className="flex justify-center mt-10">
        <button
          onClick={onRestart}
          className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg hover:scale-105 transition"
        >
          🔁 إعادة التقييم
        </button>
      </div>

      {/* في حال لا توجد نتائج */}
      {list.length === 0 && !aiResult && (
        <p className="text-center text-gray-400 mt-10">
          لم يتم العثور على نتائج بعد، الرجاء العودة لصفحة التقييم.
        </p>
      )}
    </div>
  );
}
