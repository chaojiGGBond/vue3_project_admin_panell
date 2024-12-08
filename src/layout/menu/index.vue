<script setup lang="ts">
defineProps(['menuList'])
import {useRouter} from 'vue-router'
let $router = useRouter()
const goRoute = (vc)=>{
  $router.push(vc.index)
}
</script>
<script lang="ts">
export default {
  name: 'Menu',
}
</script>
<template>
  <template v-for="(item,index) in menuList " :key="item.path">
    <template v-if="!item.children">
      <el-menu-item @click="goRoute" v-if="!item.meta.hidden" :index="item.path">
        <el-icon class="menu-icon">
          <component :is="item.meta.icon" />
        </el-icon>
        <template #title>
          <span class="menu-title">{{item.meta.title}}</span>
        </template>
      </el-menu-item>
    </template>
    <template v-if="Array.isArray(item.children) && item.children.length === 1">
      <el-menu-item @click="goRoute" v-if="!item.children[0].hidden" :index="item.children[0].path">
        <el-icon class="menu-icon">
          <component :is="item.children[0].meta.icon" />
        </el-icon>
        <template #title>
          <span class="menu-title">{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <template v-if="Array.isArray(item.children) && item.children.length > 1">
      <el-sub-menu :index="item.path" v-if="!item.meta.hidden">
        <template #title>
          <el-icon class="menu-icon">
            <component :is="item.meta.icon" />
          </el-icon >
          <span class="menu-title">{{item.meta.title}}</span>
        </template>
        <Menu :menuList="item.children" />
      </el-sub-menu>
    </template>
  </template>
</template>

<style scoped lang="scss">
.menu-title {
  font-size: 20px;
  font-family: $content-font-style;
  color: black;
}
.menu-icon {
  font-size: 20px;
  font-weight: 900;
  color: black;
}
.el-menu-item:hover {
  outline: 0 !important;
  background-color: rgb(222, 216, 196) !important;
}
.el-menu-item.is-active {
  color: $layout-navbar-background-color !important;
}
//::v-deep .el-popper.is-dark, .el-popper.is-dark>.el-popper__arrow:before {
//  background: rgb(240, 238, 229) !important;
//  border: 1px solid black !important;
//}
//::v-deep .el-popper.is-dark {
//   color: rgb(240, 238, 229) !important;
//}

</style>
