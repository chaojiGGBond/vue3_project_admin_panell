<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: '#icon-',
  },
  name: {
    type: String,
  },
  color: {
    type: String,
    default: ' ',
  },
  width: {
    type: String,
    default: '16px',
  },
  height: {
    type: String,
    default: '16px',
  },
})
</script>

<template>
  <!--  svg标签表示一个容器，可以规定图标的大小，xlink:href表示要引入的图标是哪个，fill表示图标的颜色-->
  <svg :style="{ width: width, height: height }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<style scoped lang="scss"></style>
