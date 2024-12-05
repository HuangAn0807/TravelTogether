<script setup lang='ts' name=''>
import { ref } from "vue";
  const list = ref<Number[]>([]);
    const loading = ref(false);
    const finished = ref(false);

    const onLoad = () => {
      console.log(123);
      
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          list.value.push(list.value.length + 1);
        }

        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= 50) {
          finished.value = true;
        }
      }, 1000);
    };

</script>
<template>
  <div >
    <van-list
  v-model:loading="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell v-for="item in list" :key="item as number" :title="item as number" />
</van-list>
</div>
</template>

<style scoped lang='scss'>

</style>