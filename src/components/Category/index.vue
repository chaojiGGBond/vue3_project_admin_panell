<script setup lang="ts">
import useCategoryStore from '@/store/modules/category.ts'
import { onMounted } from 'vue'

let categoryStore = useCategoryStore()
defineProps(['scene'])
const get1 = ()=>{
  categoryStore.getC1();
}
const get2 = ()=>{
  categoryStore.removeC2()
  categoryStore.getC2();
}
const get3 = ()=>{
  categoryStore.removeC3()
  categoryStore.getC3();
}
onMounted(()=>{
  get1()
})
</script>

<template>
  <el-form :inline="true">
    <el-form-item label="Primary">
      <el-select :disabled="scene===false" style="width: 190px" v-model="categoryStore.c1Id" @change="get2">
        <el-option v-for="(c1,index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Secondary" >
      <el-select :disabled="scene===false" style="width: 190px"  v-model="categoryStore.c2Id" @change="get3">
        <el-option v-for="(c2,index) in categoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>

      </el-select>
    </el-form-item>
    <el-form-item label="Tertiary">
      <el-select :disabled="scene===false" style="width: 190px"  v-model="categoryStore.c3Id">
        <el-option v-for="(c3,index) in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>
