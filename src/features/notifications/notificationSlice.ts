import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface Notification { id: string; type: 'success' | 'error' | 'info' | 'warning'; message: string }
interface NotificationState { items: Notification[] }

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: { items: [] } as NotificationState,
  reducers: {
    addNotification(state, action: PayloadAction<Omit<Notification, 'id'>>) {
      state.items.push({ ...action.payload, id: Date.now().toString() })
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.items = state.items.filter((n) => n.id !== action.payload)
    },
    clearNotifications(state) { state.items = [] },
  },
})

export const { addNotification, removeNotification, clearNotifications } = notificationSlice.actions
export default notificationSlice.reducer
