import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Product, WishlistItem } from '@/types'

interface WishlistState { items: WishlistItem[] }
const load = (): WishlistItem[] => {
  try { return JSON.parse(localStorage.getItem('atoyo_wishlist') || '[]') } catch { return [] }
}
const save = (items: WishlistItem[]) => localStorage.setItem('atoyo_wishlist', JSON.stringify(items))

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: load() } as WishlistState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<Product>) {
      const idx = state.items.findIndex((i) => i.product.id === action.payload.id)
      if (idx >= 0) { state.items.splice(idx, 1) }
      else { state.items.push({ product: action.payload, addedAt: new Date().toISOString() }) }
      save(state.items)
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.product.id !== action.payload)
      save(state.items)
    },
    clearWishlist(state) { state.items = []; save([]) },
  },
})

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions
export const selectWishlistItems = (s: { wishlist: WishlistState }) => s.wishlist.items
export const selectIsInWishlist = (productId: string) => (s: { wishlist: WishlistState }) =>
  s.wishlist.items.some((i) => i.product.id === productId)
export default wishlistSlice.reducer
