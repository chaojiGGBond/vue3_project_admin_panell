<script setup lang="ts">
import { useRoute } from 'vue-router'
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import useUserStore from '@/store/modules/user.ts'
import Navbar from '@/layout/navbar/index.vue'
import useLayoutSettingStore from '@/store/modules/setting.ts'
let userStore = useUserStore()
let layoutSettingStore = useLayoutSettingStore()
let $route = useRoute()
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>
<template>
  <div class="layout-container">
    <!--    侧边栏-->
    <div class="layout-sidebar">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          :collapse="layoutSettingStore.fold ? true : false"
          :default-active="$route.path"
          background-color="rgb(240, 238, 229)"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!--    导航栏-->
    <div
      class="layout-navbar"
      :class="{ fold: layoutSettingStore.fold ? true : false }"
    >
      <Navbar />
    </div>
    <!--    内容区-->
    <div
      class="layout-content"
      :class="{ fold: layoutSettingStore.fold ? true : false }"
    >
      <Main />
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100vh;
  .layout-sidebar {
    width: $layout-sidebar-width;
    height: 100vh;
    background-color: $layout-sidebar-background-color;
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $layout-sidebar-logo-height);
      .el-menu {
        border-right: none;
      }
    }
  }
  .layout-navbar {
    position: fixed;
    width: calc(100% - $layout-sidebar-width);
    height: $layout-navbar-height;
    top: 0;
    left: $layout-sidebar-width;
    background-color: $layout-navbar-background-color;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $layout-sidebar-fold-width);
      left: $layout-sidebar-fold-width;
    }
  }
  .layout-content {
    position: absolute;
    width: calc(100% - $layout-sidebar-width);
    height: calc(100% - $layout-navbar-height);
    top: $layout-navbar-height;
    left: $layout-sidebar-width;
    background-color: $layout-content-background-color;
    overflow: auto;
    padding: 24px;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $layout-sidebar-fold-width);
      left: $layout-sidebar-fold-width;
    }
  }
}
</style>
