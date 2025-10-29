'use client'

import { Button } from "@heroui/react"
import Link from "next/link"

export default function ButtonLink({href, children}: {href: string, children: React.ReactNode}){
  return <>
    <Link href={href}>
      <Button>
        {children}          
      </Button>
    </Link>
  </>
}

