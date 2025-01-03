
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
export interface TradeMark{
  id?: number;
  tmName: string;
  logoUrl: string;
}
//定义别名
export type Records = TradeMark[];
export interface TradeMarkResponseData extends ResponseData {
  data: {
    //和records: TradeMark[]一样的
    records: Records,
    total: number,
    size: number,
    current: number,
    searchCount: boolean,
    pages: number,
  }
}
