<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
let scene = ref(0)
let pageNumber = ref(1)
let pageSize = ref(3)
const sel = ref(null)
onMounted(()=>{
  sel.value = document.querySelector('.el-select-dropdown');
  if (sel.value) {
    sel.value.style.background = '#F0EEE5FF';
  }
})
</script>

<template>
  <el-card class="card">
    <Category :scene="scene"></Category>
  </el-card>
  <el-card class="card" style="margin-top: 24px">
    <el-button class="button" :icon="Plus" >Add SKU</el-button>
    <el-table border :header-cell-style="{background:'rgb(245, 244, 239)',color:'black'}">
      <el-table-column label="Number" width="100px" align="center" type="index"></el-table-column>
      <el-table-column label="SPU Name" align="center"></el-table-column>
      <el-table-column label="SPU Description" align="center"></el-table-column>
      <el-table-column label="Operation" align="center"></el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 24px"
      v-model:current-page="pageNumber"
      v-model:page-size="pageSize"
      :page-sizes="[3,5,7,9]"
      :background=true
      layout=" prev, pager, next, jumper, ->,sizes, total,"
      :total="300"
    />
  </el-card>
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
.button:hover {
  background-color: rgb(198, 108, 76);
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
