import request from '../../../utils/request.ts'
import {TradeMarkResponseData,TradeMark} from './type.ts'

enum API{
  TRADEMARK_URL="/admin/product/baseTrademark/",
  ADDTRADEMARK_URL="/admin/product/baseTrademark/save",
  UPDATETRADEMARK_URL="/admin/product/baseTrademark/update",
  DELETETRADEMARK_URL="/admin/product/baseTrademark/remove/{id}",
}
export const reqHasTrademark = (page:number,limit:number)=>request.get<any,TradeMarkResponseData>(API.TRADEMARK_URL+`${page}/${limit}/`)
export const reqAddorUpdateTrademark = (data:TradeMark) =>{
  if(!data.id){
    return request.post<any,any>(API.ADDTRADEMARK_URL,data)
  }
  else{
    return request.put<any,any>(API.UPDATETRADEMARK_URL,data)
  }
}
export const reqDeleteTrademark = (id:number) =>request.delete<any,any>(API.DELETETRADEMARK_URL+id)
