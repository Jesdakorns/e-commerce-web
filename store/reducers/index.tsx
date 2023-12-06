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
  productsSearch: TProductsState
  productsTopSell: TProductsState
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
      meta: undefined
    },
    hasMore: true,
    loading: true,
    isSetData: false
  },
  productsTopSell: {
    data: {
      data: [],
      meta: undefined
    },
    hasMore: true,
    loading: true,
    isSetData: false
  },
  productsSearch: {
    data: {
      data: [],
      meta: undefined
    },
    hasMore: true,
    loading: true,
    isSetData: false
  },
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
    case "PRODUCTS_SEARCH":
      return {
        ...state,
        productsSearch: action.payload,
      };
    case "PRODUCTS_TOP_SELL":
      return {
        ...state,
        productsTopSell: action.payload,
      };
    default:
      return { ...state };
  }
};
