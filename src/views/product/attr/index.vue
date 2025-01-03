<script setup lang="ts">
import { watch, ref, reactive, nextTick, onBeforeMount } from 'vue'
import { reqAddorUpdateAttr, reqAttr, reqDeleteAttr } from '@/api/product/attr'
import { Plus } from '@element-plus/icons-vue'
import useCategoryStore from '@/store/modules/category.ts'
import type {AttrResponseData,Attr} from '@/api/product/attr/type.ts'
import { ElMessage } from 'element-plus'
const attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})
let categoryStore = useCategoryStore()
let attrArr = ref<Attr[]>([])
let scene = ref(true)
let inputArr = ref([])
const addAttr = () => {
  delete attrParams.id;
  attrParams.attrName =''
  attrParams.attrValueList=[]
  attrParams.categoryId = categoryStore.c3Id
  scene.value = false
}
const updateAttr = (row) => {
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
  scene.value = false
}
const save = async ()=>{
  let result = await reqAddorUpdateAttr(attrParams)
  if(result.code===200){
    scene.value = true
    ElMessage({
      type: 'success',
      message:attrParams.id?'Updated the property successfully':'Add the property successfully',
    })
    await getAttr()
  }
  else {
    ElMessage({
      type: 'error',
      message:attrParams.id?'Updated the property unsuccessfully':'Add the property unsuccessfully',
    })
  }
}
const cancel =()=>{
  scene.value = true
}
const clear = ()=>{
  attrParams.attrValueList.length = 0
}
watch(()=>categoryStore.c3Id, ()=>{
  attrArr.value = []
  if(!categoryStore.c3Id) return
  getAttr();
})
const getAttr=async ()=>{
  const {c1Id,c2Id,c3Id} = categoryStore
  let result:AttrResponseData = await reqAttr(c1Id,c2Id,c3Id);
  if(result.code === 200){
    attrArr.value = result.data
  }
}
const addAttribute = ()=>{
  attrParams.attrValueList.push({
    valueName: '',
    flag: true
  })
  nextTick(()=>{
    inputArr.value[attrParams.attrValueList.length-1].focus()
  })
}
const isLook=(row,index)=>{
  if(row.valueName.trim()===''){
    ElMessage({
      type:'error',
      message:"The attribute name can't be empty",
    })
    attrParams.attrValueList.splice(index,1)
    return
  }
  let repeat =attrParams.attrValueList.find((item)=>{
    if(item!==row){//避免和自身比较
      return item.valueName===row.valueName//返回是否有相等的值
    }
  })
  if(repeat){
    ElMessage({
      type:'error',
      message:"The attribute name can't be same",
    })
    attrParams.attrValueList.splice(index,1)
    return
  }
  row.flag=false
}
const isEdit=(row,index)=>{
  row.flag=true
  nextTick(()=>{
    inputArr.value[index].focus()
  })
}
const deleteAttr=async (id)=>{
  let result = await reqDeleteAttr(id)
  if(result.code===200){
    ElMessage({
      type:'success',
      message:'Delete the attribute successfully'
    })
  }
  else{
    ElMessage({
      type:'error',
      message:'Delete the attribute unsuccessfully'
    })
  }
}
onBeforeMount(()=>{
  categoryStore.$reset()
})
</script>

<template>
  <el-card class="card">
    <Category :scene="scene"/>
  </el-card>
  <el-card style="margin-top: 24px" class="card">
    <div v-show="scene===true">
      <el-button class="button" :icon="Plus" :disabled="!categoryStore.c3Id" @click="addAttr">Add Property</el-button>
      <el-table border :header-cell-style="{background:'rgb(245, 244, 239)',color:'black'}" :data="attrArr">
        <el-table-column label="Number" width="100px" align="center" type="index"></el-table-column>
        <el-table-column label="Property Name" align="center" prop="attrName"></el-table-column>
        <el-table-column label="Attribute Name" align="center">
          <template #="{row,$index}">
            <el-tag style="margin: 5px" v-for="(item,index) in row.attrValueList" :key="item.id">{{item.valueName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Operation" align="center">
          <template #default="{row,$index}">
            <el-button type="primary" size="small" icon="Edit" class="button1" @click="updateAttr(row)"></el-button>
            <el-popconfirm width="240px" @confirm="deleteAttr(row.id)" :title="`Are you sure to delete this ${row.attrName}?`">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete" class="button2"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table></div>
    <div v-show="!scene">
      <el-form>
        <el-form-item label="Property Name" >
          <el-input style="width: 40%" placeholder="Please Input the Property Name" v-model="attrParams.attrName"></el-input>
        </el-form-item>
      </el-form>
      <el-button :disabled="!attrParams.attrName" class="button" :icon="Plus" @click="addAttribute">Add Attribute</el-button>
      <el-button :disabled="!attrParams.attrValueList.length>0" style="margin-bottom: 24px;" class="button2"  @click="clear">Clear</el-button>
      <el-table border :header-cell-style="{background:'rgb(245, 244, 239)',color:'black'}" :data="attrParams.attrValueList">
        <el-table-column label="Number" width="100px" align="center" type="index"></el-table-column>
        <el-table-column label="Attribute Name" align="center">
          <template #default="{row,$index}">
            <el-input :ref="(vc: any) => inputArr[$index]=vc" v-if="row.flag" placeholder="Please Attribute Value" v-model="row.valueName" @blur="isLook(row,$index)"></el-input>
            <div v-else class="div1" @click="isEdit(row,$index)">{{row.valueName}}</div>
          </template>

        </el-table-column>
        <el-table-column label="Attribute Operation" align="center">
          <template #default="{row,$index}">
            <el-button class="button1" size="small" type="primary" icon="Delete" @click="attrParams.attrValueList.splice($index,1)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="button1" style="margin: 20px 10px 0 0" @click="save" :disabled="!attrParams.attrValueList.length>0">Save</el-button>
      <el-button class="button2" style="margin: 20px 0 0 10px " @click="cancel">Cancel</el-button>
    </div>

  </el-card>
</template>

<style scoped lang="scss">
.card {
  background: $layout-sidebar-background-color;
}
.div1{
  color: black;
  font-family: 'Lucida Console', monospace;
}
.button {
  background: $layout-navbar-background-color;
  border-color: $layout-navbar-background-color;
  color: black;
  font-family: 'Lucida Console', monospace;
  margin-bottom: 24px;
}
.button:hover {
  background-color: rgb(198, 108, 76);
}
.button1{
  background: $layout-navbar-background-color;
  border-color: $layout-navbar-background-color;
  color: black;
  font-family: 'Lucida Console', monospace;
}
.button1:hover{
  background-color: rgb(198, 108, 76);
}
.button2{
  background: #D39D55;
  border-color: #D39D55;
  color: black;
  font-family: 'Lucida Console', monospace;
}
.button2:hover{
  background-color: #e1a95d;
}
</style>
