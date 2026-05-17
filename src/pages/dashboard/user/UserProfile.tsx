import { useForm } from 'react-hook-form'
import { useAppSelector, useAppDispatch } from '@/store'
import { setUser } from '@/features/auth/authSlice'
import { updateDocument, COLLECTIONS } from '@/firebase/firestore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface ProfileForm { displayName:string; phone:string; address:string }

export default function UserProfile() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(s=>s.auth.user)
  const [saving,setSaving]=useState(false)
  const { register,handleSubmit,formState:{errors} } = useForm<ProfileForm>({
    defaultValues:{ displayName:user?.displayName||'', phone:user?.phone||'', address:user?.address||'' }
  })

  const onSubmit = async (data:ProfileForm) => {
    if(!user)return
    setSaving(true)
    try {
      await updateDocument(COLLECTIONS.USERS, user.uid, data)
      dispatch(setUser({...user,...data}))
      toast.success('Profil yangilandi')
    } catch { toast.error('Xatolik') }
    finally { setSaving(false) }
  }

  return (
    <div className="space-y-6 max-w-lg">
      <h2 className="text-2xl font-black text-[var(--text-primary)]">Profilni tahrirlash</h2>
      <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-white font-black text-3xl">
              {user?.displayName?.[0]?.toUpperCase()||'U'}
            </div>
          </div>
          <Input label="To'liq ism" {...register('displayName',{required:'Majburiy'})} error={errors.displayName?.message} />
          <Input label="Telefon raqam" {...register('phone')} placeholder="+998 90 000 00 00" />
          <Input label="Manzil" {...register('address')} placeholder="Shahringiz, ko'changiz..." />
          <div className="p-3 rounded-xl bg-[var(--bg-secondary)]">
            <p className="text-xs text-[var(--text-muted)]">Email: <span className="font-semibold text-[var(--text-primary)]">{user?.email}</span></p>
          </div>
          <Button type="submit" fullWidth loading={saving}>Saqlash</Button>
        </form>
      </div>
    </div>
  )
}
