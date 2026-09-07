import { createContext, useContext, useEffect, useState } from 'react'
import { findService } from '../data/services'

const CartContext = createContext(null)
const STORAGE_KEY = 'lantech-cart-v1'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (serviceId, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.serviceId === serviceId)
      if (existing) {
        return prev.map((i) => (i.serviceId === serviceId ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { serviceId, qty }]
    })
  }

  const removeItem = (serviceId) => setItems((prev) => prev.filter((i) => i.serviceId !== serviceId))

  const updateQty = (serviceId, qty) =>
    setItems((prev) => prev.map((i) => (i.serviceId === serviceId ? { ...i, qty: Math.max(1, qty) } : i)))

  const clear = () => setItems([])

  const detailedItems = items
    .map((i) => ({ ...i, service: findService(i.serviceId) }))
    .filter((i) => i.service)

  const total = detailedItems.reduce((sum, i) => sum + i.service.price * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider
      value={{ items: detailedItems, addItem, removeItem, updateQty, clear, total, count }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
