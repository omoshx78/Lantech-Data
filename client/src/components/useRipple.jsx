import { useState, useCallback } from 'react'

/**
 * Material Design ripple effect. Usage:
 *   const { ripples, onRippleClick } = useRipple()
 *   <button className="relative overflow-hidden ..." onClick={(e) => { onRippleClick(e); myHandler(e) }}>
 *     {children}
 *     <RippleLayer ripples={ripples} />
 *   </button>
 */
export function useRipple() {
  const [ripples, setRipples] = useState([])

  const onRippleClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2.2
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2
    const id = Date.now() + Math.random()
    setRipples((r) => [...r, { id, x, y, size }])
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650)
  }, [])

  return { ripples, onRippleClick }
}

export function RippleLayer({ ripples, color = 'rgba(255,255,255,0.55)' }) {
  return (
    <>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
            background: color,
            animation: 'mdb-ripple 0.65s ease-out',
          }}
        />
      ))}
    </>
  )
}
