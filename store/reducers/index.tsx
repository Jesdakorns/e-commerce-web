import { IProductType, IPromotions } from "@/network/api/response";
import { useSelector } from "react-redux";

type TFeast = {
  loading: boolean,
  isSetData: boolean
}

export type TPromotionsState = IPromotions & TFeast
export type TProductTypeState = {
  data: IProductType[]
} & TFeast



export type TInitialState = {
  promotion: TPromotionsState
  productType: TProductTypeState
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
  }
};


export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "PROMOTIONS":
      return {
        ...state,
        promotion: action.payload,
      };
    case "PROMOTIONS_TYPE":
      return {
        ...state,
        productType: action.payload,
      };
    default:
      return { ...state };
  }
};
