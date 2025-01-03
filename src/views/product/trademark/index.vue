<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { nextTick, onMounted, reactive, ref } from 'vue'
import {reqHasTrademark, reqAddorUpdateTrademark, reqDeleteTrademark} from '@/api/product/trademark'
import {TradeMarkResponseData, Records} from '@/api/product/trademark/type.ts'
import { ElMessage, UploadProps } from 'element-plus'
let pageNumber = ref(1)
let pageSize = ref(3)
const sel = ref(null)
let total = ref(0)
let dialogFormVisible = ref(false)
const trademarkArr = ref<Records>([])
const trademarkParams = reactive({
  tmName:'',
  logoUrl:''
})
let formRef = ref(null)
const getHasTrademark = async (pager=1) => {
  pageNumber.value = pager
  const result:TradeMarkResponseData=await reqHasTrademark(pageNumber.value, pageSize.value)
  if(result.code===200){
    total.value=result.data.total
    trademarkArr.value=result.data.records
  }
}
const sizeChange=()=>{
  getHasTrademark()
}
const addTrademark = ()=> {
  trademarkParams.id=0
  trademarkParams.logoUrl=''
  trademarkParams.tmName=''
  dialogFormVisible.value = true
  nextTick(()=>{
    formRef.value.clearValidate()
  })
}
const updateTrademark = (row)=> {
  trademarkParams.tmName=row.tmName
  trademarkParams.logoUrl=row.logoUrl
  trademarkParams.id = row.id
  dialogFormVisible.value = true
  nextTick(()=>{
    formRef.value.clearValidate()
  })
}
const cancel=()=>{
  dialogFormVisible.value = false
  formRef.value.clearValidate()
}
const confirm=async ()=>{
  await formRef.value.validate()
  let result = await reqAddorUpdateTrademark(trademarkParams)
  if(result.code===200){
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: trademarkParams.id?'Modify the Band Successfully':'Add the Band Successfully',
    });
    await getHasTrademark(trademarkParams.id?pageNumber.value:1)
  }
  else {
    ElMessage({
      type: 'error',
      message: trademarkParams.id?'Modify the Band Unsuccessfully':'Add the Band Unsuccessfully',
    });
    dialogFormVisible.value = false
  }

}
const beforeAvatarUpload = (rawFile) => {
  // 允许的文件类型
  const validTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
  // 文件大小限制，单位字节（4MB）
  const maxSize = 4194304;
  // 检查文件类型
  if (validTypes.includes(rawFile.type)) {
    // 检查文件大小
    if (rawFile.size <= maxSize) {
      return true;
    } else {
      ElMessage({
        type: 'error',
        message: 'Upload size too big',
      });
      return false; // 确保返回 false
    }
  } else {
    ElMessage({
      type: 'error',
      message: 'Upload type wrong',
    });
    return false; // 确保返回 false
  }
};

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  trademarkParams.logoUrl=response.data
}
const validateTmName = (rule: any, value: any, callback: any)=>{
  if(value.trim().length>=2&&value.trim().length<=10) {
    callback()
  }
  else callback(new Error('the Band Name Length Should Be 2 to 10'))
}
const validateLogoUrl = (rule: any, value: any, callback: any) => {
  if(value) callback()
  else callback(new Error("Please Upload Picture"))
}
const rules = {
  tmName: [
    {required: true, trigger: 'blur',validator: validateTmName},
  ],
  logoUrl: [
    {required: true, validator: validateLogoUrl}
  ],
}
const deleteTrademark=async (id:number)=>{
  let result = await reqDeleteTrademark(id)
  if(result.code===200){
    ElMessage({
      type: 'success',
      message: "Successfully deleted the Trademark",
    })
    await getHasTrademark(trademarkParams.value.length>1?pageNumber.value:pageNumber.value-1)
  }
  else{
    ElMessage({
      type: 'error',
      message: "Unsuccessfully deleted the Trademark"
    })
  }
}
onMounted(()=>{
  getHasTrademark()

  sel.value = document.querySelector('.el-select-dropdown');
  if (sel.value) {
    sel.value.style.background = '#F0EEE5FF';
  }
})


</script>

<template>
  <el-card class="card">
    <el-button class="button" :icon="Plus" @click="addTrademark">Add Brand</el-button>
<!--    修改了table头的背景颜色和文字颜色-->
    <el-table border :header-cell-style="{background:'rgb(245, 244, 239)',color:'black'}" :data="trademarkArr">
      <el-table-column label="Number" width="100px" align="center" type="index"></el-table-column>
      <el-table-column label="BandName" align="center">
        <template #default="{row,$index}">
          <pre style="color: #000;font-family: 'Lucida Console', monospace;">{{row.tmName}}</pre>
        </template>
      </el-table-column>
      <el-table-column label="BandLogo" align="center">
        <template #default="{row,$index}">
          <img :src="row.logoUrl" alt="没有图片">
        </template>
      </el-table-column>
      <el-table-column label="Operation" align="center">
        <template #default="{row,$index}">
          <el-button type="primary" size="small" icon="Edit" class="button1" @click="updateTrademark(row)"></el-button>
          <el-popconfirm title="Are you sure to delete this band?" width="240px" icon="Delete" @confirm="deleteTrademark(row.id)">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete" class="button2"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 24px"
      @current-change=getHasTrademark
      @size-change="sizeChange"
      v-model:current-page="pageNumber"
      v-model:page-size="pageSize"
      :page-sizes="[3,5,7,9]"
      :background=true
      layout=" prev, pager, next, jumper, ->,sizes, total,"
      :total="total"
    />
  </el-card>
  <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id?'Modify the Band':'Add the Band'">
    <el-form class="dialog-form" :model="trademarkParams" :rules="rules" ref="formRef">
      <el-form-item label="Band Name" prop="tmName">
        <el-input v-model="trademarkParams.tmName" placeholder="Please Input the Band Name"/>
      </el-form-item>
      <el-form-item label="Band Logo" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img alt="picture" v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>

    </el-form>
    <template #footer>
      <el-button type="primary"  class="button2" @click="cancel">Cancel</el-button>
      <el-button type="primary"  class="button1" @click="confirm">Confirm</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.card {
  background: $layout-sidebar-background-color;
}
.button {
  background: $layout-navbar-background-color;
  border-color: $layout-navbar-background-color;
  color: black;
  font-family: 'Lucida Console', monospace;
  margin-bottom: 24px;
}
.button1{
  background: $layout-navbar-background-color;
  border-color: $layout-navbar-background-color;
  color: black;
  font-family: 'Lucida Console', monospace;
}
.button2{
  background: #D39D55;
  border-color: #D39D55;
  color: black;
  font-family: 'Lucida Console', monospace;
}
.button:hover {
  background-color: rgb(198, 108, 76);
}
.button1:hover{
  background-color: rgb(198, 108, 76);
}
.button2:hover{
  background-color: #e1a95d;
}
.dialog-form{
  width: 80%;
  color: black;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px solid black;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
//修改table的背景颜色
::v-deep .el-table,
::v-deep .el-table__expanded-cell {
  background-color: $layout-content-background-color !important;
}
::v-deep .el-pager li.is-active,
::v-deep .el-pager li:hover {
  color: $layout-navbar-background-color !important;
}
::v-deep .el-pagination.is-background .btn-next.is-active,
::v-deep .el-pagination.is-background .btn-prev.is-active,
::v-deep .el-pagination.is-background .el-pager li.is-active {
  background-color: $layout-navbar-background-color !important;
  color: var(--el-color-white) !important;
}
::v-deep .el-pagination.is-background .btn-next,
::v-deep .el-pagination.is-background .btn-prev,
::v-deep .el-pagination.is-background .el-pager li {
  background-color: $layout-content-background-color !important;
  margin: 0 4px;
}
::v-deep .el-pagination button.is-active,
::v-deep .el-pagination button:hover {
  color: $layout-navbar-background-color !important;
}
::v-deep .el-select__wrapper.is-focused {
  box-shadow: 0 0 0 1px $layout-navbar-background-color !important;
}
</style>
