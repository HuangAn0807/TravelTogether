<script setup lang='ts' name='User'>
import { ref } from "vue";
import UserInfo from "@/components/UserInfo.vue";
import Waterfall from "@/components/waterfall/index.vue";
import { logout } from "@/api/index";
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
const router = useRouter()
const { setToken } = useUserStore()
const active = ref(0)
const activeNote = ref(0)
const sex = ref(2)
const show = ref(false)
const changeShow = () => {
  show.value = !show.value
}
// 退出登录
const logOut = () => {
  // @ts-ignore
  showConfirmDialog({
    title: '提示',
    message:
      '确定退出登录吗？',
  })
    .then(async () => {
      // on confirm
      await logout()
      setToken('')
      router.push({ name: 'login' })
    })
    .catch(() => {
      // on cancel
    });
}
const fn = () => {

}
</script>
<template>
  <div class="page">
    <UserInfo :sex="sex" :is-follow="true">
      <template #setting>
        <van-icon name="setting-o" class="setting" size="6vw" @click="changeShow" />
      </template>
    </UserInfo>
    <div class="bottom">
      <van-tabs v-model:active="active" sticky>
        <van-tab title="笔记">
          <van-tabs class="son" v-model:active="activeNote">
            <van-tab title="公开" class="tab">
              <Waterfall :request-fun="fn" />
            </van-tab>
            <van-tab title="私密" class="tab">
              <Waterfall :request-fun="fn" />
            </van-tab>
          </van-tabs>
        </van-tab>
        <van-tab title="收藏" class="tab">
          <Waterfall :request-fun="fn" />
        </van-tab>
        <van-tab title="赞过" class="tab">
          <Waterfall :request-fun="fn" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
  <!-- 右侧弹出 -->
  <van-popup class="popup" v-model:show="show" position="right" :style="{ width: '70%', height: '100%' }">
    <template #default>
      <van-cell-group>
        <van-cell title="修改密码" is-link :to="{ name: 'changePassword' }" />
      </van-cell-group>
      <van-button type="danger" class="outLogin" @click="logOut">退出登录</van-button>
    </template>
  </van-popup>
</template>

<style scoped lang='scss'>
.setting {
  margin-left: calc(100% - 12vw);
}

:deep(.van-tabs__line) {
  background-color: #e10a2a;
}

:deep(.son .van-tabs__line) {
  display: none;
}

.popup {
  padding: 10px;
  background-color: #fafafa;
}

.outLogin {
  width: calc(100% - 20px);
  margin: 10px;
  margin-top: calc(100vh - 120px);
}

:deep(.van-tab--active) {
  color: #e10a2a;
}
</style>