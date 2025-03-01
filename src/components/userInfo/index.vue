<script setup lang='ts' name=''>
import { getUserCount } from "@/api";
import Capsule from "../capsule/index.vue";
import Profile from "../profile/index.vue";
import { type User, useUserStore } from "@/stores/userStore";
const prop = defineProps<{
  userInfo: User,
  district?: string | undefined,
}>()
</script>
<template>
  <div>
    <div class="top" :style="{ backgroundImage: `url(${userInfo?.backgroundImg})` }">
      <header class="header">
        <slot name="setting"></slot>
      </header>
      <!-- 个人信息 -->
      <div class="user-info">
        <van-image round fit="cover" width="100px" height="100px" :src="userInfo?.avatar" class="user-img" />
        <div class="right">
          <div class="user-name">
            {{ userInfo?.nickname }}
          </div>
          <div class="user-id">
            <div>旅途号：{{ userInfo?.journeyBookId }}</div>
            <div>IP属地：{{ userInfo?.province ?? '未知' }}</div>
          </div>
        </div>
      </div>
      <!-- 个人简介 -->
      <div class="intro">
        {{ userInfo?.introduction ?? '这里什么都没有' }}
      </div>
      <div class="label">
        <!-- 性别年龄 -->
        <Capsule>
          <template #default>
            <svg class="icon" aria-hidden="true">
              <use v-if="userInfo?.sex == 1" xlink:href="#icon-xingbienan"></use>
              <use v-if="userInfo?.sex == 0" xlink:href="#icon-xingbienv"></use>
            </svg>
            <!-- 年龄 -->
            <span>{{ userInfo?.age ?? '年龄是个秘密' }}</span>
          </template>
        </Capsule>
        <!-- 所在城市 -->
        <Capsule v-if="district" :text="district"></Capsule>
      </div>
      <!-- 关注 粉丝 收藏  -->
      <slot>
        <Profile :fans-total="userInfo.fansTotal" :follow-total="userInfo.followingTotal"
          :collect-total="userInfo.collectTotal" />
      </slot>
    </div>

  </div>
</template>

<style scoped lang='scss'>
.icon {
  margin-right: 8px;
  width: 1.2em;
  height: 1.2em;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}

.top::after {
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  content: '';
  width: 100%;
  height: 100%;
  background: rgba(9, 8, 8, 0.6);
}

.top {
  padding-bottom: 10px;
  position: relative;
  z-index: 100;
  width: 100%;
  min-height: 320px;
  height: 40%;
  color: #aca9aa;
  // background: rgba(9, 8, 8, 0.8);
  // background-image: url('https://preview.qiantucdn.com/meijing/73/20/58/46T58PICIUhqnC92dkBmI_PIC2018.jpg!qt_w320');
  background-size: cover;

  // box-sizing: border-box;
  .header {
    padding: 10px 10px 20px 10px;
    width: 100%;
    height: 10vw;

    .setting {
      margin-left: calc(100% - 12vw);
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    padding: 10px;

    .right {
      margin-left: 20px;
      color: #ede8e8;

      .user-name {
        width: calc(100vw - 140px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 1.5em;
      }

      .user-id {
        color: rgb(143, 133, 141);
      }
    }
  }

  .intro {
    padding: 10px;
    max-height: 4em;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .label {
    display: flex
  }

  .edit,
  .sex {
    width: 100px;
    height: 2em;
    line-height: 2em;
    background-color: #736464;
    border-radius: 1em;
  }

  .sex {
    margin: 10px;
    padding: 0 10px;
    min-width: 2em;
    width: fit-content;
  }

  .follow {
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
}
</style>