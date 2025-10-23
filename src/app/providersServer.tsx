import React from 'react'
import { SessionProvider } from "next-auth/react";
import { auth } from "@/config/auth";

export async function ProvidersServer({ children }: {children: React.ReactNode }) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}
