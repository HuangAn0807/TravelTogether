<script setup lang='ts' name='UserDetail'>
import UserInfo from "@/components/userInfo/index.vue";
import Profile from "@/components/profile/index.vue";
import Waterfall from '@/components/waterfall/index.vue'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { User } from '@/stores/userStore'
import { getUser } from '@/api/user/index'
const router = useRouter()
const route = useRoute()
const isFollow = ref(false)
const userInfo = ref<User>({
    id: 0,
    journeyBookId: "",
    nickname: "",
    avatar: "",
    birthday: "",
    backgroundImg: "",
    phone: "",
    sex: 0,
    introduction: "",
    createTime: "",
    provincialCode: "",
    cityCode: null,
    province: " "
})
const active = ref(0)
const followChange = () => {
    isFollow.value = !isFollow.value
}

onMounted(async () => {
    const result = await getUser({ userId: route.query.userId as any })
    userInfo.value = result.data.data
})
const goBack = () => {
    router.back()
}
const fn = () => {

}
</script>
<template>
    <div>
        <UserInfo :user-info="userInfo">
            <template #setting>
                <van-icon name="arrow-left" size="6vw" class="goback" @click="goBack" />
            </template>
            <template #default>
                <Profile :user-id="userInfo.id">
                    <template #default>
                        <div :class="['right', isFollow ? 'black' : 'red']" @click="followChange">
                            {{ isFollow ? '已关注' : '关注' }}
                        </div>
                    </template>
                </Profile>
            </template>
        </UserInfo>
        <van-tabs v-model:active="active" sticky shrink>
            <van-tab title="笔记" class="tab">
                <Waterfall :request-fun="fn" />
            </van-tab>
        </van-tabs>
    </div>
</template>

<style scoped lang='scss'>
:deep(.van-tabs__line) {
    background-color: #e10a2a;
}

.right {
    width: 80px;
    height: 2em;
    line-height: 2em;
    border-radius: 1em;
    text-align: center;
    font-weight: 500;
}

.red {
    border: 1px solid #e10a2a;
    color: #e10a2a;
}

.black {
    border: 1px solid #898989;
}

.header {
    padding: 10px;
}

.tab {
    margin-bottom: 10px;
}
</style>