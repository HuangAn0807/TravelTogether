<script setup lang='ts' name=''>
defineProps<{
  text: string,
  number: number
}>()
</script>
<template>
  <div class="follow">
    <div>{{ number }}</div>
    <div>{{ text }}</div>
  </div>
</template>

<style scoped lang='scss'></style>