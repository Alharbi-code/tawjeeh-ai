// src/pages/AssessmentPage.jsx
import React, { useMemo, useState } from "react";
import {
  skillsData,
  interestsData,
  studyTypesData,
  majorsData,
} from "../data/majorsData";
import { analyzeStudent } from "../utils/aiAdvisor";

export default function AssessmentPage({ onFinish }) {
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [studyPrefs, setStudyPrefs] = useState([]);
  const [error, setError] = useState("");

  // ---- helpers ----
  const toggle = (list, setList, id) =>
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  const clearAll = () => {
    setSkills([]);
    setInterests([]);
    setStudyPrefs([]);
    setError("");
  };

  // خريطة بسيطة لتحويل الـ ids إلى كلمات يفهمها aiAdvisor
  const interestKeywordMap = {
    tech: "technology",
    health: "health",
    construction: "building",
    business: "management",
    law: "law",
    education: "teaching",
    arts: "art",
    design: "creative",
    money: "money",
    science: "math",
  };

  const studyPrefKeywordMap = {
    practical: "hands-on",
    theory: "theory",
    easy: "easy",
    needsEffort: "discipline",
    short: "short",
    long: "long",
  };

  const aiInterests = useMemo(
    () => interests.map((id) => interestKeywordMap[id] ?? id),
    [interests]
  );
  const aiPrefs = useMemo(
    () => studyPrefs.map((id) => studyPrefKeywordMap[id] ?? id),
    [studyPrefs]
  );

  // ---------------- Main matching (كما كان سابقًا مع تحسينات صغيرة) ---------------
  const calcMatch = () => {
    const scores = {};
    Object.keys(majorsData).forEach((key) => {
      const m = majorsData[key];
      let s = 0;

      // 1) مطابقة المهارات المطلوبة
      skills.forEach((sk) => {
        if (m.requiredSkills?.includes(sk)) s += 30;
      });

      // 2) الاهتمامات
      interests.forEach((it) => {
        if (it === "tech" && key === "cs") s += 25;
        if (it === "health" && (key === "medicine" || key === "pharmacy"))
          s += 25;
        if (
          it === "construction" &&
          (key === "engineering" || key === "architecture")
        )
          s += 25;
        if (it === "business" && key === "business") s += 20;
        if (it === "law" && key === "law") s += 20;
        if (it === "education" && key === "education") s += 20;
        if ((it === "arts" || it === "design") && key === "design") s += 20;
      });

      // 3) تفضيلات الدراسة
      studyPrefs.forEach((p) => {
        if (m.studyType?.includes(p)) s += 15;
      });

      // 4) وزن الطلب الوظيفي
      s += Math.round((m.demandLevel || 60) / 5);

      // سقف 100
      scores[key] = Math.min(s, 100);
    });

    // أفضل 5
    const top = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([key, matchScore]) => ({ ...majorsData[key], key, matchScore }));

    return top;
  };

  // -------------- زر عرض النتائج: يجمع بين الذكاء + النتائج القديمة ----------------
  const handleShowResults = () => {
    setError("");
    if (skills.length === 0 && interests.length === 0 && studyPrefs.length === 0) {
      setError("اختر على الأقل مهارة أو اهتمامًا أو تفضيلاً دراسيًا لعرض نتيجة دقيقة.");
      return;
    }

    // 1) نحسب النتائج التقليدية (تعتمد على majorsData) لعرض صفحة النتائج كما كانت
    const top = calcMatch();

    // 2) نولّد تحليل الذكاء الاصطناعي المحلي (خاطف وخفيف)
    const aiResult = analyzeStudent(aiInterests, aiPrefs);

    // 3) نخزّنه مؤقتًا لصفحة ResultsPage (إن وجدت)
    try {
      localStorage.setItem("aiResult", JSON.stringify(aiResult));
    } catch (_) {
      // تجاهل لو التخزين موقف
    }

    // 4) نمرّر النتائج للـ parent (يحافظ على سلوكك السابق في الانتقال)
    onFinish?.({ top, aiResult });
  };

  // --------------------- UI Components ---------------------
  const Pill = ({ active, onClick, children }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-2 rounded-full text-sm border hover:scale-105 transition
      ${active ? "bg-yellow-400 text-black border-yellow-500" : "bg-white/10 border-white/20"}`}
      aria-pressed={active}
    >
      {children}
    </button>
  );

  const selectionsCount = skills.length + interests.length + studyPrefs.length;

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-2">التقييم</h2>
      <p className="text-white/70 mb-6">
        اختر ما يناسبك ثم اضغط <span className="font-semibold">عرض النتائج</span>. (عدد اختياراتك:{" "}
        <span className="text-green-300">{selectionsCount}</span>)
      </p>

      {/* مهارات */}
      <div className="card-glass rounded-2xl p-6 max-w-4xl w-full mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl">💪 اختر مهاراتك</h3>
          <span className="text-xs text-white/60">
            محدد: {skills.length}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {skillsData.map((s) => (
            <Pill
              key={s.id}
              active={skills.includes(s.id)}
              onClick={() => toggle(skills, setSkills, s.id)}
            >
              {s.icon} {s.name}
            </Pill>
          ))}
        </div>
      </div>

      {/* اهتمامات */}
      <div className="card-glass rounded-2xl p-6 max-w-4xl w-full mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl">🎯 اهتماماتك</h3>
          <span className="text-xs text-white/60">
            محدد: {interests.length}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {interestsData.map((i) => (
            <Pill
              key={i.id}
              active={interests.includes(i.id)}
              onClick={() => toggle(interests, setInterests, i.id)}
            >
              {i.icon} {i.name}
            </Pill>
          ))}
        </div>
      </div>

      {/* تفضيلات الدراسة */}
      <div className="card-glass rounded-2xl p-6 max-w-4xl w-full mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl">📚 تفضيلات الدراسة</h3>
          <span className="text-xs text-white/60">
            محدد: {studyPrefs.length}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {studyTypesData.map((p) => (
            <Pill
              key={p.id}
              active={studyPrefs.includes(p.id)}
              onClick={() => toggle(studyPrefs, setStudyPrefs, p.id)}
            >
              {p.icon} {p.name}
            </Pill>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 text-red-300 text-sm bg-red-900/20 border border-red-700/40 px-4 py-2 rounded-xl">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleShowResults}
          className="bg-green-400 text-black font-bold py-3 px-6 rounded-lg hover:scale-105 transition"
        >
          عرض النتائج
        </button>

        <button
          onClick={clearAll}
          className="bg-white/10 border border-white/20 text-white py-3 px-6 rounded-lg hover:scale-105 transition"
          type="button"
        >
          تصفية الاختيارات
        </button>
      </div>
    </div>
  );
}
