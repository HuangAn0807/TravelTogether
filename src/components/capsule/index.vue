<script setup lang='ts' name=''>
defineProps<{
    text?:string,
}>()
</script>
<template>
  <div class="sex">
    <slot> {{ text }}</slot>
</div>
</template>

<style scoped lang='scss'>

</style>