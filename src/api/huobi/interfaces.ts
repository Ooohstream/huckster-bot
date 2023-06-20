export interface TradeDataResponse {
  code: number;
  message: string;
  totalCount: number;
  pageSize: number;
  totalPage: number;
  currPage: number;
  data?: DataEntity[] | null;
  success: boolean;
}
export interface DataEntity {
  id: number;
  uid: number;
  userName: string;
  merchantLevel: number;
  merchantTags?: null;
  coinId: number;
  currency: number;
  tradeType: number;
  blockType: number;
  payMethod: string;
  payMethods?: PayMethodsEntity[] | null;
  payTerm: number;
  payName: string;
  minTradeLimit: string;
  maxTradeLimit: string;
  price: string;
  tradeCount: string;
  isOnline: boolean;
  isFollowed: boolean;
  tradeMonthTimes: number;
  orderCompleteRate: string;
  takerAcceptOrder: number;
  takerAcceptAmount: string;
  takerLimit: number;
  gmtSort: number;
  isCopyBlock: boolean;
  thumbUp: number;
  seaViewRoom?: null;
}
export interface PayMethodsEntity {
  payMethodId: number;
  name: string;
  color: string;
  isRecommend?: null;
}
