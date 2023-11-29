import { getProductType, getProducts, getPromotion } from '@/network/api/api'
import { TProductTypeState, TProductsState, TPromotionsState } from '../reducers'
import { IPagination, IProducts } from '@/network/api/response'
import store from 'store2'


export const promotionsStore = () => async (dispatch: any, subscribe: any) => {
   const data: TPromotionsState = {
      promotion: [],
      promotionSub: [],
      loading: true,
      isSetData: false
   }
   try {
      const res = await getPromotion()
      data.promotion = res?.data?.promotion ?? []
      data.promotionSub = res?.data?.promotionSub ?? []
      data.isSetData = true
   } catch (error) {

   } finally {
      data.loading = false
   }

   dispatch({ type: 'PROMOTIONS', payload: data })
   return subscribe({ type: 'PROMOTIONS', payload: data })
}

export const productTypeStore = () => async (dispatch: any, subscribe: any) => {
   const data: TProductTypeState = {
      data: [],
      loading: true,
      isSetData: false
   }
   try {
      const res = await getProductType()
      data.data = res.data ?? []
      data.isSetData = true
   } catch (error) {

   } finally {
      data.loading = false
   }

   dispatch({ type: 'PRODUCT_TYPE', payload: data })
   return subscribe({ type: 'PRODUCT_TYPE', payload: data })
}

export const productsStore = ({ val, limit = 12, page = 1, max = 100 }: { val?: IProducts[], limit?: number, page?: number, max?: number }) => async (dispatch: any, subscribe: any) => {
   let data: IPagination<IProducts[]> = {
      data: [],
      total: 0,
      nextPage: null,
      prevPage: null
   }
   let isSetData = false
   let loading = true
   let hasMore = true
   let nextPage = null
   try {
      const res = await getProducts({ limit, page })
      data = val?.length ? { ...res.data, data: [...val, ...res.data.data] } : res.data
      isSetData = true
      nextPage = data.nextPage
   } catch (error) {

   } finally {
      loading = false
      if (data.data.length >= max || !nextPage) {
         hasMore = false
      }
   }

   dispatch({ type: 'PRODUCTS', payload: { data, isSetData, loading, hasMore } })
   return subscribe({ type: 'PRODUCTS', payload: { data, isSetData, loading, hasMore } })
}
