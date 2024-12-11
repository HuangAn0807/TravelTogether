<script setup lang='ts' name=''>
import {reactive,ref} from 'vue'
import {useRouter } from 'vue-router';
import type {Form} from './type'
const router = useRouter()
const show = ref(false)
const form = reactive<Form>({
    avatar:[],
    username: '',
    intro:'',
    sex:'男',
})
const actions = [
    {
      name: '男',
    },
    {
      name: '女',
    },
    {
      name: '保密',
    },
  ]
const onClickLeft = () => {
    router.go(-1)
}
const onSelect = () => {
    show.value = false
}
</script>
<template>
  <div class="page-content">
    <van-nav-bar
    title="编辑资料"
    left-arrow
    @click-left="onClickLeft"
  />
  <van-form >
    <div class="avatar">
    <van-uploader v-model="form.avatar" reupload max-count="1" :deletable="false" />
  </div>
  <van-field
      v-model="form.username"
      name="pattern"
      label="用户名"
      placeholder="请输入用户名"
    />
    <van-field
      v-model="form.intro"
      name="pattern"
      label="简介"
      maxlength="100"
      :max="100"
      placeholder="请输入用简介"
    />
    <van-cell is-link title="性别" @click="show = true" :value="form.sex"  />
  </van-form>
  <van-action-sheet v-model:show="show" :actions="actions" @select="onSelect" />
</div>
</template>

<style scoped lang='scss'>
::v-deep .van-icon-arrow-left{
  font-size: 6vw;
  color: #000;
}
::v-deep .van-nav-bar__left {
  padding-left: 0;
}
::v-deep .van-image__img{
  border-radius: 50%;
}
::v-deep .van-uploader__upload{ 
  border-radius: 50%;
}
.avatar{
  padding: 20px 0;
  display: flex;
  justify-content: center;
}
</style>