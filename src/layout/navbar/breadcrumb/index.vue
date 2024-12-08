<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting';
import {useRoute} from 'vue-router'
let $route = useRoute()
const layoutSettingStore = useLayoutSettingStore();

const changeFold = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold;
};
</script>

<script lang="ts">
export default {
  name: 'Breadcrumb',
};
</script>

<template>
  <el-icon class="icon" @click="changeFold">
    <component :is="layoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
      <el-icon class="icon">
        <component :is="item.meta.icon" />
      </el-icon>
      <span class="title">{{item.meta.title}}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>


<style scoped lang="scss">
.icon{
  margin-right: 16px;
  font-size: 20px;
}
.title{
  font-size: 16px;
}
/* 不被选中时的颜色 */
.el-breadcrumb ::v-deep .el-breadcrumb__inner {
  color: black !important;
  font-weight:400 !important;
  font-family: 'Lucida Console', monospace;
}
/* 被选中时的颜色 */
.el-breadcrumb__item:last-child ::v-deep .el-breadcrumb__inner {
  color: black !important;
  font-weight:800 !important;
  font-family: 'Lucida Console', monospace;
}
::v-deep .el-breadcrumb__separator {
  color: black !important;
}
</style>
