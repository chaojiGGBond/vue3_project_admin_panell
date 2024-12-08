import { defineStore } from 'pinia'
import { reqLogin,reqUserInfo,reqLogout} from '../../api/user'
import type { loginFormData, loginResponseData,  } from '../../api/user'
import {SET_TOKEN, GET_TOKEN, REMOVE_TOKEN} from '../../utils/token.ts'
import {constantRoutes} from '../../router/routes.ts'

let useUserStore = defineStore('User', {
  //放数据
  state: ():UserState => ({
    token: GET_TOKEN(),
    menuRoutes: constantRoutes,
    username: '',
    avatar: ''
  }),
  //属性
  getters: {},
  //异步方法
  actions: {
    async userLogin(loginForm: any) {
      const result:any = await reqLogin(loginForm)
      if (result.code === 200) {
        this.token = result.data
        SET_TOKEN(result.data)
        return 'ok'
      } else {
        return Promise.reject(result.data)
      }
    },
    async userInfo() {
      let result = await reqUserInfo()
      if(result.code === 200) {
        this.username = result.data.username
        this.avatar = result.data.avatar
        return 'ok'
      }
      else{
        return Promise.reject(new Error(result.message))
      }

    },
    async userLogout() {
      let result =await reqLogout();
      if(result.code === 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      }
      else return Promise.reject(new Error(result.message))

    }
  },
})
export default useUserStore
