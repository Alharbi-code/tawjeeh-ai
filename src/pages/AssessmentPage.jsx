import React, { useState } from 'react'
import { skillsData, interestsData, studyTypesData, majorsData } from '../data/majorsData'

export default function AssessmentPage({ onFinish }) {
  const [skills, setSkills] = useState([])
  const [interests, setInterests] = useState([])
  const [studyPrefs, setStudyPrefs] = useState([])

  const toggle = (list, setList, id) =>
    setList(list.includes(id) ? list.filter(x => x !== id) : [...list, id])

  const calcMatch = () => {
    const scores = {}
    Object.keys(majorsData).forEach(key => {
      const m = majorsData[key]
      let s = 0
      // المهارات تطابق مطلوبة
      skills.forEach(sk => { if (m.requiredSkills?.includes(sk)) s += 30 })
      // الاهتمامات (تقسم يدويًا بشكل منطقي)
      interests.forEach(it => {
        if (it === 'tech' && key === 'cs') s += 25
        if (it === 'health' && (key === 'medicine' || key === 'pharmacy')) s += 25
        if (it === 'construction' && (key === 'engineering' || key === 'architecture')) s += 25
        if (it === 'business' && key === 'business') s += 20
        if (it === 'law' && key === 'law') s += 20
        if (it === 'education' && key === 'education') s += 20
      })
      // تفضيلات الدراسة
      studyPrefs.forEach(p => { if (m.studyType?.includes(p)) s += 15 })
      // نعطي وزن للطلب الوظيفي
      s += Math.round((m.demandLevel || 60) / 5)

      scores[key] = Math.min(s, 100)
    })

    // ترتيب أفضل 5
    const top = Object.entries(scores)
      .sort((a,b) => b[1]-a[1])
      .slice(0,5)
      .map(([key, matchScore]) => ({ ...majorsData[key], key, matchScore }))

    onFinish({ top })
  }

  const Pill = ({active, onClick, children}) => (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-full text-sm border hover:scale-105 transition
      ${active ? 'bg-yellow-400 text-black border-yellow-500' : 'bg-white/10 border-white/20'}`}
    >
      {children}
    </button>
  )

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">التقييم</h2>

      <div className="card-glass rounded-2xl p-6 max-w-4xl w-full mb-6">
        <h3 className="text-xl mb-3">💪 اختر مهاراتك</h3>
        <div className="flex flex-wrap gap-2">
          {skillsData.map(s => (
            <Pill key={s.id}
              active={skills.includes(s.id)}
              onClick={() => toggle(skills, setSkills, s.id)}
            >
              {s.icon} {s.name}
            </Pill>
          ))}
        </div>
      </div>

      <div className="card-glass rounded-2xl p-6 max-w-4xl w-full mb-6">
        <h3 className="text-xl mb-3">🎯 اهتماماتك</h3>
        <div className="flex flex-wrap gap-2">
          {interestsData.map(i => (
            <Pill key={i.id}
              active={interests.includes(i.id)}
              onClick={() => toggle(interests, setInterests, i.id)}
            >
              {i.icon} {i.name}
            </Pill>
          ))}
        </div>
      </div>

      <div className="card-glass rounded-2xl p-6 max-w-4xl w-full mb-8">
        <h3 className="text-xl mb-3">📚 تفضيلات الدراسة</h3>
        <div className="flex flex-wrap gap-2">
          {studyTypesData.map(p => (
            <Pill key={p.id}
              active={studyPrefs.includes(p.id)}
              onClick={() => toggle(studyPrefs, setStudyPrefs, p.id)}
            >
              {p.icon} {p.name}
            </Pill>
          ))}
        </div>
      </div>

      <button
        onClick={calcMatch}
        className="bg-green-400 text-black font-bold py-3 px-6 rounded-lg hover:scale-105 transition"
      >
        عرض النتائج
      </button>
    </div>
  )
}
