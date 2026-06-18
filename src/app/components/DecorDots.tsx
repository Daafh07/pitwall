"use client"

import { motion } from "framer-motion"

const dots = [
  {cx:110,cy:77},{cx:134,cy:77},{cx:158,cy:77},{cx:182,cy:77},{cx:206,cy:77},{cx:230,cy:77},{cx:254,cy:77},{cx:278,cy:77},
  {cx:14,cy:77},{cx:302,cy:77},{cx:326,cy:77},{cx:350,cy:77},{cx:374,cy:77},{cx:398,cy:77},{cx:38,cy:77},{cx:62,cy:77},
  {cx:86,cy:77},{cx:614,cy:77},{cx:638,cy:77},{cx:422,cy:77},{cx:446,cy:77},{cx:470,cy:77},{cx:494,cy:77},{cx:518,cy:77},
  {cx:542,cy:77},{cx:566,cy:77},{cx:590,cy:77},{cx:134,cy:54},{cx:158,cy:54},{cx:182,cy:54},{cx:206,cy:54},{cx:230,cy:54},
  {cx:254,cy:54},{cx:278,cy:54},{cx:302,cy:54},{cx:14,cy:54},{cx:38,cy:54},{cx:326,cy:54},{cx:350,cy:54},{cx:374,cy:54},
  {cx:398,cy:54},{cx:422,cy:54},{cx:62,cy:54},{cx:86,cy:54},{cx:110,cy:54},{cx:638,cy:54},{cx:662,cy:54},{cx:446,cy:54},
  {cx:470,cy:54},{cx:494,cy:54},{cx:518,cy:54},{cx:542,cy:54},{cx:566,cy:54},{cx:590,cy:54},{cx:614,cy:54},{cx:158,cy:31},
  {cx:182,cy:31},{cx:206,cy:31},{cx:230,cy:31},{cx:254,cy:31},{cx:278,cy:31},{cx:302,cy:31},{cx:326,cy:31},{cx:14,cy:31},
  {cx:38,cy:31},{cx:62,cy:31},{cx:350,cy:31},{cx:374,cy:31},{cx:398,cy:31},{cx:422,cy:31},{cx:446,cy:31},{cx:86,cy:31},
  {cx:110,cy:31},{cx:134,cy:31},{cx:662,cy:31},{cx:686,cy:31},{cx:470,cy:31},{cx:494,cy:31},{cx:518,cy:31},{cx:542,cy:31},
  {cx:566,cy:31},{cx:590,cy:31},{cx:614,cy:31},{cx:638,cy:31},{cx:182,cy:8},{cx:206,cy:8},{cx:230,cy:8},{cx:254,cy:8},
  {cx:278,cy:8},{cx:302,cy:8},{cx:326,cy:8},{cx:350,cy:8},{cx:14,cy:8},{cx:38,cy:8},{cx:62,cy:8},{cx:86,cy:8},
  {cx:374,cy:8},{cx:398,cy:8},{cx:422,cy:8},{cx:446,cy:8},{cx:470,cy:8},{cx:110,cy:8},{cx:134,cy:8},{cx:158,cy:8},
  {cx:686,cy:8},{cx:710,cy:8},{cx:494,cy:8},{cx:518,cy:8},{cx:542,cy:8},{cx:566,cy:8},{cx:590,cy:8},{cx:614,cy:8},
  {cx:638,cy:8},{cx:662,cy:8},
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.01 } },
}

const dotVariant = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] } },
}

export default function DecorDots({ color, className, style, direction = "ltr" }: {
  color: string,
  className?: string,
  style?: React.CSSProperties,
  direction?: "ltr" | "rtl"
}) {
  const sorted = [...dots].sort((a, b) => direction === "ltr" ? a.cx - b.cx : b.cx - a.cx)

  return (
    <motion.svg
      width="718" height="85" viewBox="0 0 718 85" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} style={style}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <g opacity="0.34" fill={color}>
        {sorted.map((d, i) => (
          <motion.circle key={i} cx={d.cx} cy={d.cy} r="8" variants={dotVariant} />
        ))}
      </g>
    </motion.svg>
  )
}
