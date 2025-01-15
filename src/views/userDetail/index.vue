<script setup lang='ts' name='UserDetail'>
import UserInfo from '@/components/UserInfo.vue'
import Profile from "@/components/profile/index.vue";
import Waterfall from '@/components/waterfall/index.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const isFollow = ref(false)
const active = ref(0)
const followChange = () => {
    isFollow.value = !isFollow.value
}
const goBack = () => {
    router.back()
}
const fn = () => {
   
}
</script>
<template>
  <div >
    <UserInfo :sex="1">
        <template #setting>
            <van-icon name="arrow-left" size="6vw" class="goback" @click="goBack" />
      </template>
        <template #default>
            <Profile>
                <template #default>
                    <div :class="['right',isFollow?'black':'red']" @click="followChange">
                      {{ isFollow ? '已关注' : '关注' }}
                    </div>
                </template>
            </Profile>
        </template>
    </UserInfo>
    <van-tabs v-model:active="active" sticky  shrink>
        <van-tab  title="笔记" class="tab">
            <Waterfall :request-fun="fn"/>
        </van-tab>
      </van-tabs>
</div>
</template>

<style scoped lang='scss'>
:deep(.van-tabs__line){
    background-color: #e10a2a;
    }
 .right{
        width: 80px;
        height: 2em;
        line-height: 2em;
        border-radius: 1em;
        text-align: center;
        font-weight: 500;
    }
   .red{
        border: 1px solid #e10a2a;
        color: #e10a2a;
    }
    .black{
        border: 1px solid #898989;
    }
    .header{
        padding: 10px;
    }
    .tab{
        margin-bottom: 10px;
    }
</style>