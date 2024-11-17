import {defineStore } from 'pinia'
import {reqLogin} from '../../api/user'
import type {loginFormData} from '../../api/user'
let useUserStore = defineStore('User', {
  //放数据
  state: () => ({
    token: localStorage.getItem('token'),
  }),
  //属性
  getters: {

  },
  //异步方法
  actions: {
    async userLogin(loginForm: loginFormData) {
      const result = await reqLogin(loginForm)
      console.log(result)
      if(result.code === 200) {
        this.token = result.data.token
        localStorage.setItem('token', result.data.token)
        return 'ok'
      }
      else{
        return Promise.reject(result.data.message)
      }
    }
  }
})
export default useUserStore
