//封装的原因，使用请求和响应拦截器
import axios from 'axios'
import { ElMessage } from "element-plus";
//创建axios实例
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})
//配置请求拦截器
request.interceptors.request.use((config)=>{
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  return config
})
//配置响应拦截器
request.interceptors.response.use((response)=>{
  return response.data
},(error)=>{
  let message = ''
  let status = error.response.status
  switch (status) {
    case 401:
      message='token过期'
      break
    case 403:
      message='无权访问'
      break
    case 404:
      message='请求地址错误'
      break
    case 500:
      message='服务器错误'
      break
    default:
      message = '无网络'
  }
  ElMessage({
    type: 'error',
    message: message
  })
//返回失败响应，不会继续执行
  return Promise.reject(error);
})
//导出实例
export default request;
