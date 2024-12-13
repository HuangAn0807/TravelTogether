<script setup lang='ts' name=''>
import { ref } from "vue";
import UserInfo from "@/components/UserInfo.vue";

const active = ref(0)
const activeNote = ref(0)
const sex = ref(2)

</script>
<template>
  <div class="page">
    <UserInfo :sex="1" :is-follow="true"></UserInfo>
    <div class="bottom">
      <van-tabs v-model:active="active" sticky >
        <van-tab  title="笔记">
            <van-tabs class="son" v-model:active="activeNote" >
                <van-tab title="公开">内容 1</van-tab>
                <van-tab title="私密">内容 2</van-tab>
            </van-tabs>
        </van-tab>
        <van-tab  title="收藏">
        </van-tab>
        <van-tab  title="赞过">
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<style scoped lang='scss'>
:deep(.van-tabs__line){
    background-color: #e10a2a;
    }
:deep(.son .van-tabs__line){
        display: none;
      }

</style>