<script setup lang='ts' name=''>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import type { FieldRule } from 'vant';
import { getCode, resetPassword } from '@/api';
import { useUserStore } from '@/stores/userStore';
const router = useRouter()
const { setToken } = useUserStore()
interface Form {
  phone: string;
  password: string;
  code: string;
}
const form = ref<Form>({
  phone: '',
  password: '',
  code: '',
})
const disabled = ref(false)//验证码按钮是否禁用

const codeText = ref('发送验证码')//验证码按钮文字

const goBack = () => {
  router.back()
}
const onSubmit = async () => {
  const res = await resetPassword(form.value)
  if (res.data.code == '200') {
    setToken('')
    //@ts-ignore
    showSuccessToast('修改密码成功！请重新登录');
    router.push({ name: 'login' })
  }

}
const sendCode = async () => {
  disabled.value = true
  let time = 60
  let timer = -1
  codeText.value = time + 's后可重新发送'
  timer = setInterval(() => {
    if (time == 1) {
      clearInterval(timer)
      disabled.value = false
      codeText.value = '发送验证码'
    } else {
      time--
      codeText.value = time + 's后可重新发送'
    }
  }, 1000)
  await getCode({ phone: form.value.phone })
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
      validator: (value: any, rule: any) => {
        return value === form.value.password;
      },
      message: '两次输入的密码不一致',
    }
  ]
}
</script>
<template>
  <div class="page-content">
    <van-nav-bar title="修改密码" left-arrow @click-left="goBack" />
    <van-form>
      <van-field v-model.trim="form.phone" label="手机号" left-icon="phone-o" placeholder="请输入手机号"
        :rules="rules.phone as FieldRule[]" />
      <van-field v-model.trim="form.password" type="password" clearable label="密码" left-icon="lock" placeholder="请输入新密码"
        :rules="rules.password as FieldRule[]" />
      <van-field v-model.trim="form.code" type="text" clearable label="验证码" placeholder="请输入验证码"
        :rules="rules.code as FieldRule[]">
        <template #left-icon>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yanzhengma"></use>
          </svg>
        </template>
        <template #button>
          <van-button size="small" type="danger" @click="sendCode" :disabled="disabled">
            {{ codeText }}
          </van-button>
        </template>
      </van-field>
      <van-button type="danger" class="submit" @click="onSubmit">确认</van-button>
    </van-form>
  </div>
</template>

<style scoped lang='scss'>
:deep(.van-icon-arrow-left) {
  color: #000;
  font-size: 6vw;
}

:deep(.van-nav-bar__left) {
  padding-left: 0;
}

:deep(.van-field) {
  height: 4em;
}

.submit {
  width: 80%;
  margin: 20px 10%;
  background-color: #e10a2a;
}
</style>