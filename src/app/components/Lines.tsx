type Props = {
  color: string
  className?: string
}

export function LinesLeft({ color, className = "" }: Props) {
  return (
    <svg width="356" height="111" viewBox="0 0 356 111" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <line x1="356" y1="4.5" x2="-148" y2="4.5" stroke={color} strokeWidth="9"/>
      <line x1="291.84" y1="106.5" x2="-147.998" y2="106.5" stroke={color} strokeWidth="9"/>
      <line x1="316.016" y1="73.5" x2="-147.999" y2="73.5" stroke={color} strokeWidth="9"/>
      <line x1="335.543" y1="37.5" x2="-147.999" y2="37.5" stroke={color} strokeWidth="9"/>
    </svg>
  )
}

export function LinesRight({ color, className = "" }: Props) {
  return (
    <svg width="356" height="111" viewBox="0 0 356 111" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <line y1="106.498" x2="504" y2="106.498" stroke={color} strokeWidth="9"/>
      <line x1="64.1602" y1="4.5" x2="503.998" y2="4.5" stroke={color} strokeWidth="9"/>
      <line x1="39.9844" y1="37.5" x2="503.999" y2="37.5" stroke={color} strokeWidth="9"/>
      <line x1="20.457" y1="73.498" x2="503.999" y2="73.498" stroke={color} strokeWidth="9"/>
    </svg>
  )
}
