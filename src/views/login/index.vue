<script setup lang='ts' name=''>
import type { FieldRule } from 'vant';
import { computed, ref } from 'vue'
import { login, getCode } from '@/api/index'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
interface Form {
  phone: string;
  password?: string;
  code?: string;
  userLoginType: number
}
const router = useRouter()

const disabled = ref(false)//验证码按钮是否禁用

const codeText = ref('发送验证码')//验证码按钮文字

const loginMethod = ref(true)//登录方式

const formRef = ref()

const form = ref<Form>({
  phone: '',
  userLoginType: computed(() => {
    return loginMethod.value ? 0 : 1
  }).value
})

const { setToken } = useUserStore()
// 获取验证码
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

// 表单提交
const onSubmit = async () => {
  await formRef.value.validate().then(async () => {
    const res = await login(form.value)
    if (res.data.code == 200) {
      // setUserInfo(res.data.data)
      setToken(res.data.data)
      router.push('/home')
    } else {
      //@ts-ignore
      showFailToast(res.message);
    }
  })
}

// 切换登录方式
const changeLoginMethod = () => {
  loginMethod.value = !loginMethod.value
  form.value = {
    phone: '',
    userLoginType: computed(() => {
      return loginMethod.value ? 0 : 1
    }).value
  }
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
      validator: (value: string) => {
        // 密码长度 8 到 20 个字符
        if (value.length < 8 || value.length > 20) {
          return false;
        }
        // // 包含至少一个大写字母
        // if (!/[A-Z]/.test(value)) {
        //   return false;
        // }
        // 包含至少一个小写字母
        if (!/[a-z]/.test(value)) {
          return false;
        }
        // 包含至少一个数字
        if (!/\d/.test(value)) {
          return false;
        }
        // // 包含至少一个特殊字符
        // if (!/[!@#$%^&*]/.test(value)) {
        //   return false;
        // }
        return true;
      },
      message: '密码必须包含字母、数字，且长度为 8 到 20 个字符',
    },
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
}
</script>
<template>
  <div class="page-content">
    <div class="header">
      <div class="title">旅途同行</div>
      <div class="text">你的旅行指南</div>
    </div>
    <h2>登录</h2>
    <van-form ref="formRef">
      <van-field v-model.trim="form.phone" label="手机号" left-icon="phone-o" placeholder="请输入手机号"
        :rules="rules.phone as FieldRule[]" />
      <van-field v-model.trim="form.password" type="password" clearable label="密码" left-icon="lock" placeholder="请输入密码"
        v-if="!loginMethod" :rules="rules.password as FieldRule[]" />
      <van-field v-model.trim="form.code" type="text" clearable label="验证码" placeholder="请输入验证码" v-if="loginMethod"
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
      <van-button type="danger" class="submit" @click="onSubmit">登录</van-button>
      <div class="bottom">
        <div type="text">首次登录将自动注册账号</div>
        <div type="text" @click="changeLoginMethod">{{ loginMethod ? '账号密码登录' : '验证码登录' }}</div>
      </div>
    </van-form>
  </div>
</template>

<style scoped lang='scss'>
.header {
  margin-top: 20%;
  margin-bottom: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;

  .title {
    width: 100%;
    font-weight: 700;
    font-size: 2em;
    font-style: italic;
    color: #e10a2a;
  }
}

.text {
  width: 100%;
  letter-spacing: 8px;
}

h2 {
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
}

.submit {
  width: 80%;
  margin: 20px 10%;
  background-color: #e10a2a;
}

.bottom {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
}

:deep(.van-field) {
  height: 4.5em;
}
</style>