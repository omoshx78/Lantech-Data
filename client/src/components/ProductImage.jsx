import { useState, useEffect } from 'react'
import { ImagePlus } from 'lucide-react'

/**
 * Renders `src` if it loads; otherwise shows an on-brand placeholder instead
 * of a broken-image icon. Drop a real file at the given path (see
 * public/images/products/README.md) and it swaps in automatically — no code
 * change needed.
 */
export default function ProductImage({ src, alt, className = '', rounded = 'rounded-2xl' }) {
  const [failed, setFailed] = useState(false)

  useEffect(() => setFailed(false), [src])

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 border border-dashed ${rounded} ${className}`}
        style={{ borderColor: 'var(--slate-line)', background: 'var(--paper-dim)', color: 'var(--slate)' }}
      >
        <ImagePlus size={22} />
        <p className="text-xs font-mono text-center px-4">{src}</p>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`object-cover ${rounded} ${className}`}
    />
  )
}
