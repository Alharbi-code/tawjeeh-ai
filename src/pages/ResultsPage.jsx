import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const DemandBadge = ({ level }) => {
  const color = level >= 80 ? '#10b981' : level >= 60 ? '#f59e0b' : '#ef4444'
  const txt = level >= 80 ? 'عالٍ' : level >= 60 ? 'متوسط' : 'منخفض'
  return (
    <span className="px-3 py-1 rounded-full text-sm" style={{backgroundColor: `${color}33`, color}}>
      الطلب: {txt} ({level}%)
    </span>
  )
}

export default function ResultsPage({ results, onRestart }) {
  const list = results?.top || []

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-3xl font-bold mb-2 text-center">نتائجك الشخصية</h2>
      <p className="text-center text-purple-100 mb-8">أفضل التخصصات المطابقة لميولك ومهاراتك</p>

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {list.map((m) => (
          <div key={m.id} className="card-glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-2xl font-bold">{m.icon} {m.name}</div>
              <DemandBadge level={m.demandLevel} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div>الراتب المتوقع: <b>{m.salary.avg} د.ك</b></div>
              <div>مدة الدراسة: <b>{m.studyYears} سنوات</b></div>
              <div>المسجلون في الديوان: <b>{m.registeredDiwan.toLocaleString()}</b></div>
              <div>التوظيف سنويًا: <b>{m.hiredPerYear}</b></div>
              <div>الانتظار المتوقع: <b>{m.waitingMonths} شهر</b></div>
              <div>الصعوبة: <b>{m.difficulty}</b></div>
            </div>

            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'أدنى', value: m.salary.min },
                  { name: 'متوسط', value: m.salary.avg },
                  { name: 'أعلى', value: m.salary.max },
                ]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 text-sm">
              <div className="mb-1">جهات التوظيف:</div>
              <ul className="list-disc pr-6 opacity-90">
                {m.employers.map((e, idx) => <li key={idx}>{e}</li>)}
              </ul>
            </div>

            <div className="mt-4 text-sm opacity-90">
              <b>مميزات:</b> {m.advantages?.join('، ')}<br/>
              <b>تحديات:</b> {m.disadvantages?.join('، ')}
            </div>

            <div className="mt-4 text-sm">
              <div className="mb-1">نسبة التطابق: <b>{m.matchScore}%</b></div>
              <div className="w-full h-2 bg-white/20 rounded">
                <div className="h-2 bg-yellow-400 rounded" style={{ width: `${m.matchScore}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={onRestart}
          className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg hover:scale-105 transition"
        >
          🔁 إعادة التقييم
        </button>
      </div>
    </div>
  )
}
