<script setup lang="ts">
import setting from '@/setting.ts'
</script>
<script lang="ts">
export default {
  name: 'Logo',
}
</script>
<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="logo">
    <p >{{ setting.title }}</p>
  </div>
</template>

<style scoped lang="scss">
.logo{
  width: 100%;
  height: $layout-sidebar-logo-height;
  display: flex;
  align-items: center;
  padding: 10px;
  img{
    width: 30px;
    height: 30px;
  }
  p{
    font-size: $layout-sidebar-logo-title-size;
    font-family: $title-font-style;
    margin-left: 36px;
  }
}
</style>
