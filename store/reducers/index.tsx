import { IPagination, IProductType, IProducts, IPromotions } from "@/network/api/response";
import { useSelector } from "react-redux";

type TFeast = {
  hasMore?: boolean
  loading: boolean,
  isSetData: boolean
}

export type TProductsState = {
  data: IPagination<IProducts[]>
} & TFeast
export type TPromotionsState = IPromotions & TFeast
export type TProductTypeState = {
  data: IProductType[]
} & TFeast



export type TInitialState = {
  promotion: TPromotionsState
  productType: TProductTypeState
  products: TProductsState
}

const initialState: TInitialState = {
  promotion: {
    promotion: [],
    promotionSub: [],
    loading: true,
    isSetData: false
  },
  productType: {
    data: [],
    loading: true,
    isSetData: false
  },
  products: {
    data: {
      data: [],
      total: 0,
      nextPage: null,
      prevPage: null
    },
    hasMore: true,
    loading: true,
    isSetData: false
  }
};


export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "PROMOTIONS":
      return {
        ...state,
        promotion: action.payload,
      };
    case "PRODUCT_TYPE":
      return {
        ...state,
        productType: action.payload,
      };
    case "PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    default:
      return { ...state };
  }
};
