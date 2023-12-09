// 'use client'
import { getProductId } from '@/network/api/api'
import { JWT } from 'next-auth/jwt'
import { cookies } from 'next/headers'
import { useParams } from 'next/navigation'
import React from 'react'
import jwt from 'jsonwebtoken';
import { getAccessSSRToken } from '@/utils/authSSR'
import ProductId from '@/components/ProductId'

const initProductId = async (id: number) => {
    try {
        console.log('getAccessSSRToken()', getAccessSSRToken())
        const res = await getProductId({ id: +id }, getAccessSSRToken())
        return res.data

    } catch (error) {

    }
}

type Props = {
    params: { id: string },
    searchParams: { [key: string]: string | string[] | undefined },
}

const Page = async ({ params }: Props) => {

    const { id } = params
    const product = await initProductId(+id)
    return (
        <ProductId data={product}></ProductId>
    )
}

export default Page