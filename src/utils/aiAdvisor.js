export function analyzeStudent(interests, skills) {
  const scores = {
    IT: 0,
    Engineering: 0,
    Business: 0,
    Education: 0,
    Design: 0,
  };

  // تحليل الاهتمامات
  if (interests.includes("technology") || skills.includes("coding")) scores.IT += 3;
  if (interests.includes("building") || skills.includes("math")) scores.Engineering += 3;
  if (interests.includes("management") || skills.includes("money")) scores.Business += 3;
  if (interests.includes("teaching")) scores.Education += 3;
  if (interests.includes("art") || interests.includes("creative")) scores.Design += 3;

  // استخراج التخصص الأعلى
  const recommended = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  return { recommended, scores };
}
