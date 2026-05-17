import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Product, Category } from '@/types'

interface ProductsState {
  items: Product[]; categories: Category[]; loading: boolean; error: string | null
  selectedCategory: string | null; searchQuery: string; priceRange: [number, number]
  sortBy: string; page: number
}

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [], categories: [], loading: false, error: null,
    selectedCategory: null, searchQuery: '', priceRange: [0, 10000000], sortBy: 'default', page: 1,
  } as ProductsState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) { state.items = action.payload; state.loading = false },
    setCategories(state, action: PayloadAction<Category[]>) { state.categories = action.payload },
    setLoading(state, action: PayloadAction<boolean>) { state.loading = action.payload },
    setError(state, action: PayloadAction<string | null>) { state.error = action.payload; state.loading = false },
    setSelectedCategory(state, action: PayloadAction<string | null>) { state.selectedCategory = action.payload; state.page = 1 },
    setSearchQuery(state, action: PayloadAction<string>) { state.searchQuery = action.payload; state.page = 1 },
    setPriceRange(state, action: PayloadAction<[number, number]>) { state.priceRange = action.payload; state.page = 1 },
    setSortBy(state, action: PayloadAction<string>) { state.sortBy = action.payload },
    setPage(state, action: PayloadAction<number>) { state.page = action.payload },
    resetFilters(state) { state.selectedCategory = null; state.searchQuery = ''; state.priceRange = [0, 10000000]; state.sortBy = 'default'; state.page = 1 },
  },
})

export const { setProducts, setCategories, setLoading, setError, setSelectedCategory, setSearchQuery, setPriceRange, setSortBy, setPage, resetFilters } = productsSlice.actions
export default productsSlice.reducer
