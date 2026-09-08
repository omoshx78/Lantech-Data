import { createContext, useContext, useEffect, useState } from 'react'
import { useProducts } from './ProductsContext'

const CartContext = createContext(null)
const STORAGE_KEY = 'lantech-cart-v2'

export function CartProvider({ children }) {
  const { findProduct } = useProducts()
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

  const addItem = (productId, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId)
      if (existing) return prev.map((i) => (i.productId === productId ? { ...i, qty: i.qty + qty } : i))
      return [...prev, { productId, qty }]
    })
  }

  const removeItem = (productId) => setItems((prev) => prev.filter((i) => i.productId !== productId))
  const updateQty = (productId, qty) =>
    setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, qty: Math.max(1, qty) } : i)))
  const clear = () => setItems([])

  const detailedItems = items
    .map((i) => ({ ...i, product: findProduct(i.productId) }))
    .filter((i) => i.product)

  const total = detailedItems.reduce((sum, i) => sum + i.product.price * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ items: detailedItems, addItem, removeItem, updateQty, clear, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
