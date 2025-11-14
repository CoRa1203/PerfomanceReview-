'use client'
import { APIUser } from '@/lib/API'
import { User } from '@/types'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'


type UserContext = {
  user: User | null;
  setUser: (user: User) => void;
}

export const contextUser = createContext<UserContext | undefined>(undefined)

export default function ProviderUser({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<User | null>(null)
  const { data } = useSession();
  useEffect(() => {
    data?.user?.id && APIUser.get(data.user.id).then(user => setUser(user))
  }, [])
  return (
    <contextUser.Provider value={
      {
        user: user,
        setUser: setUser
      }
    } >
      {/* // <contextUser.Provider value={user} > */}
      {children}
    </contextUser.Provider>
  )
}
