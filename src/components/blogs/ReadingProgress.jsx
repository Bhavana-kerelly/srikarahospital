import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B1A4A] via-[#B82563] to-[#cca830] origin-left z-[300]"
      style={{ scaleX }}
    />
  )
}
export default ReadingProgress
