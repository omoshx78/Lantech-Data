import { useState, useEffect } from 'react'
import { GraduationCap } from 'lucide-react'

export default function ProductImage({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setFailed(false)
  }, [src])

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-[#EEEEF9] to-slate-50 ${className}`}>
        <GraduationCap size={40} className="text-[#C7C8EC]" />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => {
        setFailed(true)
      }}
      className={`object-cover ${className}`}
    />
  )
}
