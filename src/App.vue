<script setup lang="ts">
const str = 'hello world'

const a = 'hhh'

const b = 'ssss'
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
