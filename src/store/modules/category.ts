import { defineStore } from 'pinia'
import {reqC1, reqC2, reqC3} from '../../api/product/attr'
import {CategoryResponseData} from '../../api/product/attr/type.ts'

let useCategoryStore = defineStore('CategoryStore', {
  state: ()=>{
    return {
      c1Arr: [],
      c1Id: '',
      c2Arr: [],
      c2Id: '',
      c3Arr: [],
      c3Id: '',
    }
  },
  actions: {
    async getC1(){
      let result:CategoryResponseData = await reqC1();
      if(result.code === 200){
        this.c1Arr = result.data
      }
    },
    async getC2(){
      let result:CategoryResponseData = await reqC2(this.c1Id);
      if(result.code === 200){
        this.c2Arr = result.data
      }
    },
    async getC3(){
      let result:CategoryResponseData = await reqC3(this.c2Id);
      if(result.code === 200){
        this.c3Arr = result.data
      }
    },
    removeC2(){
      this.c3Arr = []
      this.c3Id = ''
      this.c2Id = ''
    },
    removeC3(){
      this.c3Id = ''
    },
  },
  getters: {

  }
})
export default useCategoryStore
