import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

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
        👋 مرحبًا بك في <span className="text-yellow-400">Tawjeeh AI</span>
      </motion.h1>
      <p className="text-lg opacity-80 mb-8">
        اكتشف التخصص الجامعي الأنسب لك بناءً على ميولك وسوق العمل الكويتي
      </p>
      <Button
        onClick={onStart}
        className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg hover:scale-105 transition"
      >
        🚀 ابدأ التقييم الآن
      </Button>
    </motion.div>
  )
}
