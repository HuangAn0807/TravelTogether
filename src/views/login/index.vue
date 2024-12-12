<script setup lang='ts' name=''>
import type { FieldRule } from 'vant';
import { computed, ref, watch } from 'vue'
interface Form {
  phone: string;
  password: string;
  code?: string;
  reconfirmPassword?:string
}
const isLogin = ref(true)
const title = computed(() => {
  return isLogin.value ? '登录' : '注册'
})
// 切换注册登录时需要清空表单
watch(() => isLogin.value,() => {
  form.value = {
    phone: '',
    password: '',
    code: '',
    reconfirmPassword:''
  }
})
const form  = ref<Form>({
  phone: '',
  password: '',
  code: '',
  reconfirmPassword:''
})

const changeStatus = () => {
  isLogin.value = !isLogin.value
}
const rules = {
  phone: [
    {
      required: true,
      message: '请输入手机号',
    },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '手机号格式不正确',
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
    },
    {
      min: 6,
      max: 20,
      message: '密码长度为6-20位',
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
    },
    {
      pattern: /^\d{6}$/,
      message: '验证码格式不正确',
    }
  ],
  reconfirmPassword: [
    {
      required: true,
      message: '请再次输入密码',
    },
    {
      validator: (value:any, rule:any) => {
        return value === form.value.password;
      },
      message: '两次输入的密码不一致',
    }
  ]
}
</script>
<template>
  <div class="page-content">
    <div class="header">
      <div class="title">旅途同行</div>
      <div class="text">你的旅行指南</div>
    </div>
    <h2>{{ title }}</h2>
    <van-form >
      <van-field
          v-model.trim="form.phone"
          label="手机号"
          left-icon="phone-o"
          placeholder="请输入手机号"
          :rules="rules.phone as FieldRule[]"
        />
        <van-field
          v-model.trim="form.password"
          type="password"
          clearable
          label="密码"
          left-icon="lock"
          placeholder="请输入密码"
          :rules="rules.password as FieldRule[]"
        />
        <van-field
          v-if="!isLogin"
          v-model.trim="form.reconfirmPassword"
          type="password"
          clearable
          label="确认密码"
          left-icon="lock"
          placeholder="请再次输入密码"
          :rules="rules.reconfirmPassword as FieldRule[]"
        />
          <van-button type="danger" class="submit">{{ title }}</van-button>
          <span type="text" @click="changeStatus">{{ isLogin?'已有帐号？去注册':'去登录' }}</span>
    </van-form>
  </div>
</template>

<style scoped lang='scss'>
.header{
  margin-top: 20%;
  margin-bottom: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  .title{
    width: 100%;
    font-weight: 700;
    font-size: 2em;
    font-style: italic;
    color: #e10a2a;
  }
}
.text{
      width: 100%;
     letter-spacing: 8px;
  }
  h2{
    margin-bottom: 20px;
    text-align: center;
  }
  .submit{
    width: 80%;
    margin: 20px 10%;
    background-color: #e10a2a;
  }
  :deep(.van-field){
    height: 4em;
  }
</style>