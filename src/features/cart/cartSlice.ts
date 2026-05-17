import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, Product } from '@/types'

interface CartState { items: CartItem[]; isOpen: boolean }

const load = (): CartItem[] => {
  try { return JSON.parse(localStorage.getItem('atoyo_cart') || '[]') } catch { return [] }
}
const save = (items: CartItem[]) => localStorage.setItem('atoyo_cart', JSON.stringify(items))

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: load(), isOpen: false } as CartState,
  reducers: {
    addToCart(state, action: PayloadAction<{ product: Product; quantity?: number }>) {
      const { product, quantity = 1 } = action.payload
      const ex = state.items.find((i) => i.product.id === product.id)
      if (ex) { ex.quantity = Math.min(ex.quantity + quantity, product.stock) }
      else { state.items.push({ product, quantity }) }
      save(state.items)
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.product.id !== action.payload)
      save(state.items)
    },
    updateQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
      const item = state.items.find((i) => i.product.id === action.payload.productId)
      if (item) { item.quantity = Math.max(1, Math.min(action.payload.quantity, item.product.stock)) }
      save(state.items)
    },
    clearCart(state) { state.items = []; save([]) },
    toggleCart(state) { state.isOpen = !state.isOpen },
    openCart(state) { state.isOpen = true },
    closeCart(state) { state.isOpen = false },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart, openCart, closeCart } = cartSlice.actions
export const selectCartItems = (s: { cart: CartState }) => s.cart.items
export const selectCartTotal = (s: { cart: CartState }) => s.cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
export const selectCartCount = (s: { cart: CartState }) => s.cart.items.reduce((sum, i) => sum + i.quantity, 0)
export const selectCartOpen = (s: { cart: CartState }) => s.cart.isOpen
export default cartSlice.reducer
