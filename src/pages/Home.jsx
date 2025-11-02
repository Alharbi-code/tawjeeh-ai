import React from "react";
import { motion } from "framer-motion";

export default function Home({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-b from-purple-900 to-black text-white px-4"
    >
      <motion.h1
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        className="text-5xl font-bold mb-4"
      >
        👋 مرحبًا بك في{" "}
        <span className="text-yellow-400 drop-shadow-md">Tawjeeh AI</span>
      </motion.h1>

      <p className="text-lg opacity-80 mb-8 max-w-xl">
        اكتشف التخصص الجامعي والمجال المهني الأنسب لك بناءً على ميولك،
        مهاراتك، وسوق العمل في الكويت 🇰🇼
      </p>

      <motion.button
        onClick={onStart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-yellow-400/40 transition-all"
      >
        🚀 ابدأ التقييم الآن
      </motion.button>

      <p className="text-sm opacity-60 mt-8">
        مشروع تخرج 2025 – واجهة عربية بالكامل (RTL)
      </p>
    </motion.div>
  );
}
