<script setup lang="ts">
const str = 'hello world'
</script>

<template>
  <div class="box">
    <p>{{ str }}</p>
  </div>
</template>

<style scoped lang="scss">
.box {
  background: #999;
  width: 20%;
  height: 20%;
  p {
    color: linen;
  }
}
</style>
