import { getProductType, getProducts, getProductsTopSell, getPromotion } from '@/network/api/api'
import { TProductTypeState, TProductsState, TPromotionsState } from '../reducers'
import { IPagination, IParamsProducts, IProducts } from '@/network/api/response'
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

export const productsStore = ({ val, limit = 12, page = 1, max = 100 }: { val?: IProducts[], limit?: number, page?: number, max?: number, search?: string }) => async (dispatch: any, subscribe: any) => {
   let data: IPagination<IProducts[]> = {
      data: [],
      meta: undefined
   }
   let isSetData = false
   let loading = true
   let hasMore = true
   let nextPage = null
   try {
      const res = await getProducts({ limit, page })
      if (res?.data) {
         data.data = val?.length ? [...val, ...res?.data] : res.data
         data.meta = res.meta
         isSetData = true
         nextPage = data.meta?.nextPage
      }
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

export const productsSearchStore = ({ val, limit = 2, page = 1, max = 100, order, search, orderByField, lowPrice, highPrice }: IParamsProducts & { val?: IProducts[], max?: number }) => async (dispatch: any, subscribe: any) => {
   let data: IPagination<IProducts[]> = {
      data: [],
      meta: undefined
   }
   let other = {}
   let isSetData = false
   let loading = true
   let hasMore = true
   let nextPage = null
   try {
      const res = await getProducts({ limit, page, order, search, orderByField, lowPrice, highPrice })
      if (res?.data) {
         data.data = val?.length ? [...val, ...res?.data] : res.data
         data.meta = res.meta
         other = res?.other
         isSetData = true
         nextPage = data.meta?.nextPage
      }
   } catch (error) {

   } finally {
      loading = false
      if (data.data.length >= max || !nextPage) {
         hasMore = false
      }
   }

   dispatch({ type: 'PRODUCTS_SEARCH', payload: { data, other, isSetData, loading, hasMore } })
   return subscribe({ type: 'PRODUCTS_SEARCH', payload: { data, other, isSetData, loading, hasMore } })
}

export const productsTopSellStore = ({ val, limit = 10, page = 1, max = 100 }: { val?: IProducts[], limit?: number, page?: number, max?: number }) => async (dispatch: any, subscribe: any) => {
   let data: IPagination<IProducts[]> = {
      data: [],
      meta: undefined
   }
   let isSetData = false
   let loading = true
   let hasMore = true
   let nextPage = null
   try {
      const res = await getProductsTopSell({ limit, page })
      if (res?.data) {
         data.data = val?.length ? [...val, ...res?.data] : res.data
         data.meta = res.meta
         isSetData = true
         nextPage = data.meta?.nextPage
      }
   } catch (error) {

   } finally {
      loading = false
      if (data.data.length >= max || !nextPage) {
         hasMore = false
      }
   }

   dispatch({ type: 'PRODUCTS_TOP_SELL', payload: { data, isSetData, loading, hasMore } })
   return subscribe({ type: 'PRODUCTS_TOP_SELL', payload: { data, isSetData, loading, hasMore } })
}
