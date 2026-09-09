export function FloatingInput({ label, className = '', ...props }) {
  return (
    <div className={`mdb-field ${className}`}>
      <input placeholder=" " {...props} />
      <label>{label}</label>
    </div>
  )
}

export function FloatingTextarea({ label, className = '', ...props }) {
  return (
    <div className={`mdb-field ${className}`}>
      <textarea placeholder=" " {...props} />
      <label>{label}</label>
    </div>
  )
}
