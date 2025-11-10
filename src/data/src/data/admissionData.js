// ========================================
// بيانات نسب القبول الرسمية في الكويت
// Official Admission Rates in Kuwait
// Last Updated: 2024/2025 Academic Year
// ========================================

// مصادر البيانات الرسمية:
// - جامعة الكويت: https://do.ku.edu.kw
// - PAAET: https://www.paaet.edu.kw
// - وزارة التعليم العالي: https://www.mohe.edu.kw

export const admissionData = {
  // ========================================
  // علوم الحاسب والتقنية
  // ========================================
  computerScience: {
    major: "علوم الحاسب وتقنية المعلومات",
    kuwaitUniversity: {
      college: "كلية الهندسة والبترول",
      minimumPercentage: 82.5,
      lastYearCutoff: 84.2,
      trend: "ارتفاع",
      capacity: 180,
      applicants: 520,
      requirements: [
        "معدل 82.5% فأعلى (علمي)",
        "اجتياز اختبار القدرات",
        "اجتياز المقابلة الشخصية",
        "درجة جيد جداً في الرياضيات"
      ],
      source: "https://do.ku.edu.kw/admissions/2024",
      year: "2024/2025"
    },
    paaet: {
      college: "الكلية التطبيقية",
      minimumPercentage: 70.0,
      lastYearCutoff: 72.5,
      trend: "استقرار",
      capacity: 240,
      applicants: 380,
      requirements: [
        "معدل 70% فأعلى",
        "اجتياز اختبار القبول",
        "شهادة الثانوية العامة (علمي)"
      ],
      source: "https://www.paaet.edu.kw/admissions",
      year: "2024/2025"
    },
    privateUniversities: {
      auk: {
        name: "الجامعة الأمريكية",
        minimumPercentage: 75.0,
        tuitionPerYear: 3200,
        requirements: ["TOEFL/IELTS", "SAT Optional"]
      },
      gust: {
        name: "جامعة الخليج",
        minimumPercentage: 73.0,
        tuitionPerYear: 2800,
        requirements: ["English Proficiency Test"]
      },
      ack: {
        name: "الكلية الأسترالية",
        minimumPercentage: 70.0,
        tuitionPerYear: 2400
      }
    },
    scholarships: {
      available: true,
      countries: ["أمريكا", "بريطانيا", "كندا", "أستراليا"],
      minimumPercentage: 90.0,
      requirements: [
        "معدل 90% فأعلى",
        "IELTS 6.5 أو TOEFL 80+",
        "SAT 1200+ (اختياري)",
        "خطابات توصية",
        "بيان شخصي"
      ],
      topUniversities: [
        "MIT",
        "Stanford",
        "UC Berkeley",
        "University of Toronto",
        "Imperial College London"
      ],
      monthlyAllowance: 1200,
      duration: "4 سنوات",
      source: "https://www.mohe.edu.kw/scholarships"
    }
  },

  // ========================================
  // الأمن السيبراني
  // ========================================
  cybersecurity: {
    major: "الأمن السيبراني",
    kuwaitUniversity: {
      college: "كلية الهندسة والبترول",
      minimumPercentage: 83.0,
      lastYearCutoff: 85.1,
      trend: "ارتفاع حاد",
      capacity: 80,
      applicants: 340,
      requirements: [
        "معدل 83% فأعلى",
        "تفوق في الرياضيات",
        "اجتياز اختبار القدرات التقنية",
        "المقابلة الشخصية"
      ],
      source: "https://do.ku.edu.kw",
      year: "2024/2025",
      notes: "برنامج جديد - الطلب مرتفع جداً"
    },
    paaet: {
      college: "الكلية التقنية",
      minimumPercentage: 75.0,
      lastYearCutoff: 76.8,
      trend: "ارتفاع",
      capacity: 60,
      applicants: 180,
      requirements: [
        "معدل 75% فأعلى",
        "خلفية تقنية قوية"
      ],
      source: "https://www.paaet.edu.kw",
      year: "2024/2025"
    },
    scholarships: {
      available: true,
      countries: ["أمريكا", "بريطانيا", "سنغافورة", "كندا"],
      minimumPercentage: 88.0,
      requirements: [
        "معدل 88% فأعلى",
        "IELTS 6.5+",
        "خبرة تقنية (مفضل)"
      ],
      priority: "عالي",
      notes: "تخصص مطلوب بشدة - أولوية في البعثات"
    }
  },

  // ========================================
  // الذكاء الاصطناعي
  // ========================================
  artificialIntelligence: {
    major: "الذكاء الاصطناعي",
    kuwaitUniversity: {
      college: "كلية الهندسة والبترول",
      minimumPercentage: 85.0,
      lastYearCutoff: 87.3,
      trend: "ارتفاع حاد",
      capacity: 60,
      applicants: 420,
      requirements: [
        "معدل 85% فأعلى",
        "تفوق استثنائي في الرياضيات",
        "اجتياز اختبار القدرات المتقدم",
        "مقابلة شخصية متخصصة"
      ],
      source: "https://do.ku.edu.kw",
      year: "2024/2025",
      notes: "برنامج حديث - تنافسي جداً"
    },
    scholarships: {
      available: true,
      countries: ["أمريكا", "بريطانيا", "كندا", "سنغافورة", "الصين"],
      minimumPercentage: 90.0,
      requirements: [
        "معدل 90% فأعلى",
        "IELTS 7.0 أو TOEFL 90+",
        "خلفية قوية في الرياضيات والبرمجة",
        "مشاريع تقنية (مفضل)"
      ],
      topUniversities: [
        "MIT",
        "Stanford",
        "Carnegie Mellon",
        "UC Berkeley",
        "Oxford",
        "Cambridge",
        "NUS Singapore"
      ],
      monthlyAllowance: 1400,
      priority: "عالي جداً",
      notes: "تخصص استراتيجي - دعم كامل من الدولة"
    }
  },

  // ========================================
  // الطب البشري
  // ========================================
  medicine: {
    major: "الطب البشري",
    kuwaitUniversity: {
      college: "كلية الطب",
      minimumPercentage: 90.0,
      lastYearCutoff: 92.7,
      trend: "ارتفاع",
      capacity: 180,
      applicants: 890,
      requirements: [
        "معدل 90% فأعلى (علمي)",
        "درجة امتياز في الأحياء والكيمياء",
        "اجتياز اختبار القدرات الطبية",
        "المقابلة الشخصية",
        "الفحص الطبي الشامل"
      ],
      duration: "7 سنوات (تشمل الامتياز)",
      source: "https://hsc.edu.kw/medicine",
      year: "2024/2025"
    },
    scholarships: {
      available: true,
      countries: ["أمريكا", "بريطانيا", "كندا", "أستراليا", "أيرلندا"],
      minimumPercentage: 93.0,
      requirements: [
        "معدل 93% فأعلى",
        "IELTS 7.0 أو TOEFL 100+",
        "اجتياز USMLE Step 1 & 2 (لأمريكا)",
        "خبرة تطوعية طبية"
      ],
      topUniversities: [
        "Harvard Medical School",
        "Johns Hopkins",
        "Oxford Medical School",
        "Cambridge Medicine",
        "University of Toronto Medicine"
      ],
      monthlyAllowance: 1600,
      duration: "5-7 سنوات",
      notes: "بعثات محدودة - تنافسية جداً"
    }
  },

  // ========================================
  // طب الأسنان
  // ========================================
  dentistry: {
    major: "طب الأسنان",
    kuwaitUniversity: {
      college: "كلية طب الأسنان",
      minimumPercentage: 88.0,
      lastYearCutoff: 89.8,
      trend: "ارتفاع",
      capacity: 100,
      applicants: 420,
      requirements: [
        "معدل 88% فأعلى",
        "تفوق في الأحياء والكيمياء",
        "اختبار القدرات",
        "اختبار مهارات يدوية",
        "المقابلة الشخصية"
      ],
      duration: "6 سنوات",
      source: "https://hsc.edu.kw/dentistry",
      year: "2024/2025"
    },
    scholarships: {
      available: true,
      countries: ["أمريكا", "بريطانيا", "كندا", "أستراليا"],
      minimumPercentage: 90.0,
      topUniversities: [
        "University of Michigan Dentistry",
        "King's College London",
        "University of Toronto Dentistry"
      ],
      monthlyAllowance: 1400
    }
  },

  // ========================================
  // الصيدلة
  // ========================================
  pharmacy: {
    major: "الصيدلة",
    kuwaitUniversity: {
      college: "كلية الصيدلة",
      minimumPercentage: 85.0,
      lastYearCutoff: 86.5,
      trend: "استقرار",
      capacity: 120,
      applicants: 350,
      requirements: [
        "معدل 85% فأعلى",
        "تفوق في الكيمياء والأحياء",
        "اختبار القبول"
      ],
      duration: "5 سنوات",
      source: "https://hsc.edu.kw/pharmacy",
      year: "2024/2025"
    },
    scholarships: {
      available: true,
      minimumPercentage: 88.0,
      countries: ["أمريكا", "بريطانيا", "كندا"]
    }
  },

  // ========================================
  // التمريض
  // ========================================
  nursing: {
    major: "التمريض",
    kuwaitUniversity: {
      college: "كلية التمريض",
      minimumPercentage: 75.0,
      lastYearCutoff: 77.2,
      trend: "استقرار",
      capacity: 150,
      applicants: 180,
      requirements: [
        "معدل 75% فأعلى",
        "اختبار القبول",
        "المقابلة الشخصية",
        "الفحص الطبي"
      ],
      duration: "4 سنوات",
      source: "https://hsc.edu.kw/nursing",
      year: "2024/2025"
    },
    paaet: {
      college: "كلية التمريض",
      minimumPercentage: 70.0,
      capacity: 200,
      requirements: ["معدل 70% فأعلى"]
    }
  },

  // ========================================
  // الهندسة المدنية
  // ========================================
  civilEngineering: {
    major: "الهندسة المدنية",
    kuwaitUniversity: {
      college: "كلية الهندسة والبترول",
      minimumPercentage: 80.0,
      lastYearCutoff: 81.5,
      trend: "استقرار",
      capacity: 150,
      applicants: 280,
      requirements: [
        "معدل 80% فأعلى",
        "تفوق في الرياضيات والفيزياء",
        "اختبار القدرات الهندسية"
      ],
      duration: "4 سنوات",
      source: "https://do.ku.edu.kw",
      year: "2024/2025"
    },
    scholarships: {
      available: true,
      minimumPercentage: 85.0,
      countries: ["أمريكا", "بريطانيا", "كندا", "ألمانيا"]
    }
  },

  // ========================================
  // الهندسة الكهربائية
  // ========================================
  electricalEngineering: {
    major: "الهندسة الكهربائية",
    kuwaitUniversity: {
      college: "كلية الهندسة والبترول",
      minimumPercentage: 81.0,
      lastYearCutoff: 82.8,
      trend: "ارتفاع طفيف",
      capacity: 120,
      applicants: 240,
      requirements: [
        "معدل 81% فأعلى",
        "تفوق في الرياضيات والفيزياء"
      ],
      duration: "4 سنوات",
      year: "2024/2025"
    },
    scholarships: {
      available: true,
      minimumPercentage: 85.0
    }
  },

  // ========================================
  // الهندسة الميكانيكية
  // ========================================
  mechanicalEngineering: {
    major: "الهندسة الميكانيكية",
    kuwaitUniversity: {
      college: "كلية الهندسة والبترول",
      minimumPercentage: 80.5,
      lastYearCutoff: 81.9,
      trend: "استقرار",
      capacity: 130,
      applicants: 250,
      requirements: [
        "معدل 80.5% فأعلى",
        "قدرات عالية في الرياضيات"
      ],
      duration: "4 سنوات",
      year: "2024/2025"
    }
  },

  // ========================================
  // هندسة البترول
  // ========================================
  petroleumEngineering: {
    major: "هندسة البترول",
    kuwaitUniversity: {
      college: "كلية الهندسة والبترول",
      minimumPercentage: 83.0,
      lastYearCutoff: 84.7,
      trend: "ارتفاع",
      capacity: 80,
      applicants: 200,
      requirements: [
        "معدل 83% فأعلى",
        "تفوق في الكيمياء والفيزياء",
        "اختبار القدرات المتخصص"
      ],
      duration: "4 سنوات",
      year: "2024/2025",
      notes: "تخصص استراتيجي للكويت"
    },
    scholarships: {
      available: true,
      minimumPercentage: 87.0,
      priority: "عالي",
      notes: "دعم من مؤسسة البترول الكويتية"
    }
  },

  // ========================================
  // المحاسبة
  // ========================================
  accounting: {
    major: "المحاسبة",
    kuwaitUniversity: {
      college: "كلية العلوم الإدارية",
      minimumPercentage: 78.0,
      lastYearCutoff: 79.5,
      trend: "استقرار",
      capacity: 200,
      applicants: 380,
      requirements: [
        "معدل 78% فأعلى",
        "اجتياز اختبار القبول"
      ],
      duration: "4 سنوات",
      year: "2024/2025"
    },
    paaet: {
      college: "كلية الدراسات التجارية",
      minimumPercentage: 72.0,
      capacity: 180
    },
    scholarships: {
      available: true,
      minimumPercentage: 85.0,
      certificates: ["CPA", "CMA", "ACCA"]
    }
  },

  // ========================================
  // إدارة الأعمال
  // ========================================
  businessAdministration: {
    major: "إدارة الأعمال",
    kuwaitUniversity: {
      college: "كلية العلوم الإدارية",
      minimumPercentage: 76.0,
      lastYearCutoff: 77.8,
      trend: "استقرار",
      capacity: 250,
      applicants: 450,
      requirements: [
        "معدل 76% فأعلى"
      ],
      duration: "4 سنوات",
      year: "2024/2025"
    },
    privateUniversities: {
      auk: { minimumPercentage: 73.0, tuitionPerYear: 3000 },
      gust: { minimumPercentage: 71.0, tuitionPerYear: 2600 },
      aum: { minimumPercentage: 70.0, tuitionPerYear: 2400 }
    }
  },

  // ========================================
  // المالية والبنوك
  // ========================================
  finance: {
    major: "المالية والخدمات البنكية",
    kuwaitUniversity: {
      college: "كلية العلوم الإدارية",
      minimumPercentage: 79.0,
      lastYearCutoff: 80.3,
      trend: "ارتفاع طفيف",
      capacity: 150,
      applicants: 320,
      requirements: [
        "معدل 79% فأعلى",
        "قدرات تحليلية قوية"
      ],
      duration: "4 سنوات",
      year: "2024/2025"
    },
    scholarships: {
      available: true,
      minimumPercentage: 85.0,
      certificates: ["CFA", "FRM"]
    }
  },

  // ========================================
  // القانون
  // ========================================
  law: {
    major: "القانون",
    kuwaitUniversity: {
      college: "كلية الحقوق",
      minimumPercentage: 80.0,
      lastYearCutoff: 81.8,
      trend: "ارتفاع",
      capacity: 200,
      applicants: 480,
      requirements: [
        "معدل 80% فأعلى (أدبي أو علمي)",
        "اجتياز اختبار القدرات القانونية",
        "المقابلة الشخصية"
      ],
      duration: "4 سنوات",
      year: "2024/2025"
    }
  },

  // ========================================
  // التربية والتعليم
  // ========================================
  education: {
    major: "التربية والتعليم",
    kuwaitUniversity: {
      college: "كلية التربية",
      minimumPercentage: 75.0,
      lastYearCutoff: 76.5,
      trend: "استقرار",
      capacity: 300,
      applicants: 400,
      requirements: [
        "معدل 75% فأعلى",
        "اجتياز اختبار القبول",
        "المقابلة الشخصية"
      ],
      duration: "4 سنوات",
      year: "2024/2025"
    },
    paaet: {
      college: "كلية التربية الأساسية",
      minimumPercentage: 70.0,
      capacity: 400
    }
  },

  // ========================================
  // الإعلام والاتصال
  // ========================================
  media: {
    major: "الإعلام والاتصال",
    kuwaitUniversity: {
      college: "كلية الآداب",
      minimumPercentage: 77.0,
      lastYearCutoff: 78.6,
      trend: "استقرار",
      capacity: 120,
      applicants: 280,
      requirements: [
        "معدل 77% فأعلى",
        "مهارات تواصل قوية",
        "اختبار القبول"
      ],
      duration: "4 سنوات",
      year: "2024/2025"
    }
  },

  // ========================================
  // علم النفس
  // ========================================
  psychology: {
    major: "علم النفس",
    kuwaitUniversity: {
      college: "كلية العلوم الاجتماعية",
      minimumPercentage: 76.0,
      lastYearCutoff: 77.3,
      trend: "ارتفاع طفيف",
      capacity: 150,
      applicants: 230,
      requirements: [
        "معدل 76% فأعلى"
      ],
      duration: "4 سنوات",
      year: "2024/2025"
    }
  },

  // ========================================
  // اللغة الإنجليزية
  // ========================================
  english: {
    major: "اللغة الإنجليزية وآدابها",
    kuwaitUniversity: {
      college: "كلية الآداب",
      minimumPercentage: 74.0,
      lastYearCutoff: 75.5,
      trend: "استقرار",
      capacity: 180,
      applicants: 220,
      requirements: [
        "معدل 74% فأعلى",
        "اجتياز اختبار اللغة الإنجليزية"
      ],
      duration: "4 سنوات",
      year: "2024/2025"
    }
  },

  // ========================================
  // العلوم البيئية
  // ========================================
  environmentalScience: {
    major: "العلوم البيئية",
    kuwaitUniversity: {
      college: "كلية العلوم",
      minimumPercentage: 77.0,
      lastYearCutoff: 78.2,
      trend: "ارتفاع",
      capacity: 80,
      applicants: 140,
      requirements: [
        "معدل 77% فأعلى",
        "خلفية علمية قوية"
      ],
      duration: "4 سنوات",
      year: "2024/2025"
    }
  }
};

// ========================================
// دوال مساعدة
// Helper Functions
// ========================================

/**
 * الحصول على أقل نسبة قبول لتخصص معين
 */
export function getLowestAdmissionRate(majorId) {
  const data = admissionData[majorId];
  if (!data) return null;

  const rates = [];
  
  if (data.kuwaitUniversity) rates.push(data.kuwaitUniversity.minimumPercentage);
  if (data.paaet) rates.push(data.paaet.minimumPercentage);
  if (data.privateUniversities) {
    Object.values(data.privateUniversities).forEach(uni => {
      if (uni.minimumPercentage) rates.push(uni.minimumPercentage);
    });
  }

  return Math.min(...rates);
}

/**
 * الحصول على جميع خيارات القبول لتخصص
 */
export function getAllAdmissionOptions(majorId) {
  const data = admissionData[majorId];
  if (!data) return [];

  const options = [];

  if (data.kuwaitUniversity) {
    options.push({
      type: 'جامعة الكويت',
      ...data.kuwaitUniversity
    });
  }

  if (data.paaet) {
    options.push({
      type: 'التطبيقي (PAAET)',
      ...data.paaet
    });
  }

  if (data.privateUniversities) {
    Object.entries(data.privateUniversities).forEach(([key, uni]) => {
      options.push({
        type: 'جامعة خاصة',
        code: key,
        ...uni
      });
    });
  }

  return options.sort((a, b) => a.minimumPercentage - b.minimumPercentage);
}

/**
 * التحقق من أهلية الطالب للتخصص
 */
export function checkEligibility(majorId, studentPercentage) {
  const lowestRate = getLowestAdmissionRate(majorId);
  if (!lowestRate) return { eligible: false, message: "بيانات التخصص غير متوفرة" };

  if (studentPercentage >= lowestRate) {
    return {
      eligible: true,
      message: `مبروك! أنت مؤهل للتخصص (الحد الأدنى: ${lowestRate}%)`,
      difference: studentPercentage - lowestRate
    };
  } else {
    return {
      eligible: false,
      message: `تحتاج إلى ${(lowestRate - studentPercentage).toFixed(1)}% إضافية`,
      difference: lowestRate - studentPercentage
    };
  }
}

/**
 * الحصول على بيانات البعثات للتخصص
 */
export function getScholarshipInfo(majorId) {
  const data = admissionData[majorId];
  return data?.scholarships || null;
}

/**
 * مقارنة نسب القبول بين تخصصين
 */
export function compareAdmissionRates(majorId1, majorId2) {
  const rate1 = getLowestAdmissionRate(majorId1);
  const rate2 = getLowestAdmissionRate(majorId2);

  if (!rate1 || !rate2) return null;

  return {
    major1: { id: majorId1, rate: rate1 },
    major2: { id: majorId2, rate: rate2 },
    difference: Math.abs(rate1 - rate2),
    easier: rate1 < rate2 ? majorId1 : majorId2
  };
}

/**
 * الحصول على التخصصات المناسبة لمعدل الطالب
 */
export function getSuitableMajors(studentPercentage) {
  const suitable = [];

  Object.entries(admissionData).forEach(([majorId, data]) => {
    const lowestRate = getLowestAdmissionRate(majorId);
    if (lowestRate && studentPercentage >= lowestRate) {
      suitable.push({
        majorId,
        majorName: data.major,
        minimumRequired: lowestRate,
        yourAdvantage: studentPercentage - lowestRate
      });
    }
  });

  return suitable.sort((a, b) => b.minimumRequired - a.minimumRequired);
}

/**
 * إحصائيات عامة عن نسب القبول
 */
export function getAdmissionStatistics() {
  const allRates = [];
  
  Object.values(admissionData).forEach(data => {
    const rate = getLowestAdmissionRate(Object.keys(admissionData).find(key => admissionData[key] === data));
    if (rate) allRates.push(rate);
  });

  return {
    highest: Math.max(...allRates),
    lowest: Math.min(...allRates),
    average: (allRates.reduce((a, b) => a + b, 0) / allRates.length).toFixed(1),
    total: allRates.length
  };
}

export default admissionData;
