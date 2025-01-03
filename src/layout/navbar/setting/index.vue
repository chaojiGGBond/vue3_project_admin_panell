<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting.ts'
import useUserStore from '@/store/modules/user.ts'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time.ts'
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const layoutSettingStore = useLayoutSettingStore()
const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
const fullScreen = () => {
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen() // 在整个文档元素上调用
  } else {
    document.exitFullscreen() // 退出全屏模式
  }
}
const logout = async () => {
  await userStore.userLogout()

  await router.push({
    path: '/login',
    query: { redirect: route.path },
  })
  ElNotification({
    type: 'success',
    message: 'logout successfully',
  })
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>
<template>
  <el-button
    size="small"
    circle
    icon="Refresh"
    @click="updateRefresh"
  ></el-button>
  <el-button
    size="small"
    circle
    icon="FullScreen"
    @click="fullScreen"
  ></el-button>
  <el-button size="small" circle icon="Setting"></el-button>
  <img
    :src="userStore.avatar"
    alt="logo"
    style="width: 24px; height: 24px; border-radius: 50%; margin: 0 16px"
  />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">Logout</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">
.el-button {
  color: black;
  background-color: white;
}
.el-dropdown-menu {
  background-color: rgb(240, 238, 229);
}
.el-dropdown {
  color: black !important;
  font-family: 'Lucida Console', monospace;
}
::v-deep .el-dropdown-menu__item:not(.is-disabled) {
  color: black !important;
  font-family: 'Lucida Console', monospace;
}
::v-deep .el-dropdown-menu__item:not(.is-disabled):focus {
  background-color: rgb(222, 216, 196);
}
</style>
