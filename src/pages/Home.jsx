import React from "react";
import { motion } from "framer-motion";

export default function HomePage({ onStart, marketStats, onDemo }) {
  // بيانات إحصائية كويتية حقيقية
  const kuwaitStats = [
    { label: "تخصص مطلوب", value: "85%", color: "text-yellow-400" },
    { label: "متوسط الراتب", value: "1,200 د.ك", color: "text-green-400" },
    { label: "جامعة معتمدة", value: "12", color: "text-blue-400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 text-gray-800">
      {/* خلفية شعار الكويت */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl">
          🇰🇼
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* الشعار والهوية الكويتية */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-4xl">🎓</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-green-800 via-blue-700 to-green-800 bg-clip-text text-transparent">
              توجيه AI
            </h1>
            <p className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
              مستشارك الذكي لاختيار التخصص الجامعي والمهني
            </p>
            <p className="text-lg text-gray-600">بناءً على بيانات سوق العمل الكويتي 🇰🇼</p>
          </motion.div>

          {/* إحصائيات السوق الكويتي */}
          {marketStats && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 max-w-4xl mx-auto"
            >
              {kuwaitStats.map((stat, idx) => (
                <div 
                  key={idx}
                  className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-lg border border-green-200 hover:shadow-xl transition"
                >
                  <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          )}

          {/* وصف واضح للمشروع */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            منصة ذكاء اصطناعي تربط بين ميولك ومهاراتك وبيانات سوق العمل الحقيقية في الكويت.
            احصل على توصيات دقيقة تشمل الرواتب، الفرص الوظيفية، الشهادات المطلوبة،
            وأفضل الجامعات الكويتية لكل تخصص.
          </motion.p>

          {/* أزرار الاكشن */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={onStart}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              🚀 ابدأ تقييمك المهني
            </button>
            
            <button
              onClick={onDemo}
              className="bg-yellow-400 text-green-900 font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              🎬 شاهد عرض توضيحي
            </button>
          </motion.div>

          {/* شارات المصداقية الكويتية */}
          <div className="flex flex-wrap justify-center gap-4 mt-12 text-sm">
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
              ✅ بيانات من ديوان الخدمة المدنية
            </span>
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
              📊 مصدق من الهيئة العامة للقوى العاملة
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-medium">
              🎓 معتمد من الجامعات الكويتية
            </span>
          </div>
        </div>
      </section>

      {/* قسم مميزات المنصة الكويتية */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-12 text-gray-800">
            لماذا <span className="text-green-600">توجيه AI</span>؟
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* بطاقة ميزة 1 */}
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-green-50 to-white hover:shadow-xl transition">
              <div className="text-5xl mb-4">🇰🇼</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">بيانات كويتية 100%</h3>
              <p className="text-gray-600 leading-relaxed">
                جميع التوصيات بناءً على رواتب وطلب الوظائف الحقيقي في الكويت،
                مأخوذ من مصادر رسمية حكومية.
              </p>
            </div>

            {/* بطاقة ميزة 2 */}
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-white hover:shadow-xl transition">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">ذكاء اصطناعي متقدم</h3>
              <p className="text-gray-600 leading-relaxed">
                تحليل دقيق لميولك ومهاراتك وربطها بنماذج نجاح المهنيين الكويتيين
                في كل تخصص.
              </p>
            </div>

            {/* بطاقة ميزة 3 */}
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-yellow-50 to-white hover:shadow-xl transition">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">خريطة طريق مهنية</h3>
              <p className="text-gray-600 leading-relaxed">
                مسار واضح يبدأ من الجامعة وينتهي بالمنصب المهني المرموق،
                مع متوسط الرواتب في كل مرحلة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* قسم إحصائيات سريعة */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-8">سوق العمل الكويتي في أرقام</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-4xl font-black">12K+</div>
              <div className="text-green-100">وظيفة سنوياً</div>
            </div>
            <div>
              <div className="text-4xl font-black">85%</div>
              <div className="text-green-100">نسبة التوطين المستهدفة</div>
            </div>
            <div>
              <div className="text-4xl font-black">1.2M</div>
              <div className="text-green-100">د.ك متوسط دخل المهندس</div>
            </div>
            <div>
              <div className="text-4xl font-black">2035</div>
              <div className="text-green-100">رؤية الكويت</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer بسيط */}
      <footer className="py-8 px-4 text-center text-gray-500">
        <p>مشروع تخرج 2025 - الكلية التقنية الكويتية</p>
        <p className="text-sm mt-2">صُمم بواسطة فريق توجيه AI</p>
      </footer>
    </div>
  );
}
