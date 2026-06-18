type Props = {
  color: string
  className?: string
  flip?: boolean
}

export function DriverDecor({ color, className = "", flip = false }: Props) {
  return (
    <svg
      width="243" height="42" viewBox="0 0 243 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={flip ? { transform: "rotate(180deg)" } : {}}
    >
      <line x1="12.66" y1="4.5" x2="243" y2="4.5" stroke={color} strokeWidth="7"/>
      <line x1="0" y1="30" x2="243" y2="30" stroke={color} strokeWidth="7"/>
    </svg>
  )
}
