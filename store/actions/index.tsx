import { getProductType, getPromotion } from '@/network/api/api'
import {  TProductTypeState, TPromotionsState } from '../reducers'


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

   dispatch({ type: 'PROMOTIONS_TYPE', payload: data })
   return subscribe({ type: 'PROMOTIONS_TYPE', payload: data })
}
