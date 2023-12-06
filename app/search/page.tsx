import Search from '@/components/Search'
import { AppDispatch } from '@/store'
import { productsSearchStore } from '@/store/actions'
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'
import { cookies, headers } from 'next/headers'
import { getProducts } from '@/network/api/api'
import { getSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { jwtDecode } from "jwt-decode";

const Page = async ({
  params: { search },
}: {
  params: { search: string }
}) => {
  // const cookieStore = cookies()
  // const session = cookieStore.get(process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token')?.value || ''

  // const decoded = await jwtDecode(session);
  // console.log(`🚀 ~ file: page.tsx ~ line 25 ~ decoded`, decoded)

  // // console.log(`🚀 ~ file: page.tsx ~ line 18 ~ session`, decode(session))
  // const initProducts = async (search?: string, aadToken?: string) => {
  //   return await getProducts({ search }, aadToken)
  // }
  // const res = await initProducts(decodeURIComponent(search), decoded?.accessToken as string)
  return (
    <Search />
  )
}

export default Page
