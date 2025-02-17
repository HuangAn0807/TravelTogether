<script setup lang='ts' name=''>
import { useRouter } from "vue-router";
import ProfileItem from "@/views/user/components/ProfileItem.vue";
const router = useRouter()
const { userId } = defineProps<{
  userId: number
}>()
const toFollow = (type: number) => {
  router.push({ name: 'follow', query: { type, userId } })
}
</script>
<template>
  <div class="profile">
    <ProfileItem text="关注" :number="123" @click="toFollow(0)"></ProfileItem>
    <ProfileItem text="粉丝" :number="123" @click="toFollow(1)"></ProfileItem>
    <ProfileItem text="收藏" :number="123"></ProfileItem>
    <slot>
      <div class="edit">
        <slot>
          <RouterLink :to="{ name: 'editInfo' }">编辑资料</RouterLink>
        </slot>
      </div>
    </slot>
  </div>
</template>

<style scoped lang='scss'>
.profile {
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #d2cecb;
  text-align: center;

  a {
    color: #d2cecb;
  }

  .edit {
    width: 100px;
    height: 2em;
    line-height: 2em;
    background-color: #736464;
    border-radius: 1em;
  }
}
</style>