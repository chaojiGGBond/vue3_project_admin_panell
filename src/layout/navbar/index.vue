<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>
<script lang="ts">
export default {
  name: 'Navbar',
}
</script>
<template>
  <div class="navbar">
    <div class="navbar-left">
      <Breadcrumb />
    </div>
    <div class="navbar-right">
      <Setting />
    </div>
  </div>
</template>

<style scoped lang="scss">
.navbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .navbar-left {
    display: flex;
    align-items: center;
    margin: 0 24px;
    .el-breadcrumb__inner {
      color: black !important;
    }
  }
  .navbar-right {
    display: flex;
    align-items: center;
    margin-right: 16px;
  }
}
</style>
