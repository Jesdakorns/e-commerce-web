import { IPagination, IProductType, IProduct, IPromotions } from "@/network/api/response";
import { useSelector } from "react-redux";

type TFeast = {
  other?: any
  hasMore?: boolean
  loading: boolean,
  isSetData: boolean
}

export type TProductsState = {
  data: IPagination<IProduct[]>
} & TFeast
export type TPromotionsState = IPromotions & TFeast
export type TProductTypeState = {
  data: IProductType[]
} & TFeast



export type TInitialState = {
  priceMax: number
  promotion: TPromotionsState
  productType: TProductTypeState
  products: TProductsState
  productsSearch: TProductsState
  productsTopSell: TProductsState
  product?: IProduct
}

const initialState: TInitialState = {
  priceMax: 0,
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
  product: undefined
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
    case "PRODUCTS_PRICE_MAX":
      return {
        ...state,
        priceMax: action.payload,
      };
    case "PRODUCT":
      return {
        ...state,
        product: action.payload,
      };
    default:
      return { ...state };
  }
};
