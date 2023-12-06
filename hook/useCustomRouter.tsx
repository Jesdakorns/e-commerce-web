import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const useCustomRouter = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const queryParams = new URLSearchParams(searchParams)

  const pushRouter = (valPathname: string, params: URLSearchParams) => {
    router.push(`${valPathname}?${params.toString()}`)
  }

  const pushQueryRouter = (params: URLSearchParams) => {
    router.push(`${pathname}?${params.toString()}`)
  }

  return { queryParams, pushRouter, pushQueryRouter }
}

export default useCustomRouter