<script setup lang='ts' name='EditInfo'>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';
import type { Form, Select } from './type'
import { areaList } from '@vant/area-data'
import { useUserStore, type User } from '@/stores/userStore'
import useCity from '@/hooks/getCity'
import { getUser, updateUser } from '@/api/user';
import { uploadFile } from '@/api/notes';
import type { UploaderFileListItem } from 'vant';
const router = useRouter()
const show = ref(false)
const showArea = ref(false)
const showDate = ref(false)
const { userInfo, setUserInfo, setDistrict, district: useDistrict } = useUserStore()
const { getCity } = useCity()
const district = ref(useDistrict)
// const regex = /(省|市|自治区|壮族|回族|特别行政区|维吾尔)/g;
// const district = ref('')// 显示地区
// if (userInfo.provincialCode && userInfo.cityCode) {
//   // 获取所在省份
//   getCity(userInfo.provincialCode).then((res: string) => {
//     district.value = res.replace(regex, ' ')
//     getCity(userInfo.cityCode).then((res: string) => {
//       district.value = district.value + res.replace(regex, ' ')
//       setDistrict(district.value)
//     })
//   })
// }
const birthday = ref(userInfo?.birthday?.split('-') ?? [])//生日
const avatar = ref<UploaderFileListItem[]>([])// 头像
const backgroundImg = ref<UploaderFileListItem[]>([])// 背景图
const form = ref<Form>({
  nickname: userInfo.nickname,
  introduction: userInfo.introduction,
  sex: userInfo.sex,
  birthday: userInfo.birthday,
  provincialCode: userInfo.provincialCode,
  cityCode: userInfo.cityCode,
  journeyBookId: userInfo.journeyBookId,
})
const gender = computed(() => {
  return form.value.sex === 1 ? '男' : '女'
})



const actions = [
  {
    name: '男',
    value: 1
  },
  {
    name: '女',
    value: 0
  },
]
const onClickLeft = () => {
  router.go(-1)
}
// 选择性别
const onSelect = (val: { name: string, value: number }) => {
  form.value.sex = val.value
  show.value = false
}
// 选择生日
const confirmBirthday = (val: Select) => {
  form.value.birthday = val.selectedValues.join('-')
  showDate.value = false
}
// 选择地区
const confirmArea = (val: Select) => {
  console.log(val);
  for (let i = 0; i < val.selectedOptions.length - 1; i++) {
    // 判断是否是直辖市
    if (val.selectedOptions[i].text === val.selectedOptions[i + 1].text) {
      // 直辖市只显示市
      district.value = val.selectedOptions[i].text
    } else {
      // 非直辖市显示省市
      district.value = val.selectedOptions[i].text + ' ' + val.selectedOptions[i + 1].text
    }
  }
  // 将省市对应的编码存入表单中
  form.value.provincialCode = val.selectedValues[0]
  form.value.cityCode = val.selectedValues[1]

  showArea.value = false
}

// 提交用户编辑后的信息
const onSubmit = async () => {
  if (avatar.value.length !== 0) {
    const result = await uploadFile({ file: avatar.value[0]?.file })
    form.value.avatar = result.data.data
  }
  if (backgroundImg.value.length !== 0) {
    const result = await uploadFile({ file: backgroundImg.value[0]?.file })
    form.value.backgroundImg = result.data.data
  }
  // 更新用户信息
  updateUser(form.value).then(async (data) => {
    //@ts-ignore
    showSuccessToast('保存成功');
    const res = await getUser()
    setUserInfo(res.data.data)
  })
}
</script>
<template>
  <div class="page-content page">
    <van-nav-bar title="编辑资料" left-arrow @click-left="onClickLeft" />
    <van-form>
      <div class="avatar">
        <van-uploader v-model="avatar" reupload max-count="1" :deletable="false">
          <template #default>
            <div class="custom-upload">
              <van-image :src="userInfo.avatar" round width="19.32vw" height="19.32vw" />
            </div>
          </template>
        </van-uploader>
      </div>
      <van-field v-model="form.nickname" name="pattern" label="用户名" placeholder="请输入用户名" />
      <van-field v-model="form.journeyBookId" name="pattern" label="用户ID" :disabled="true" />
      <van-field v-model="form.introduction" name="pattern" label="简介" maxlength="100" :max="100"
        placeholder="请输入用简介" />
      <van-cell is-link title="性别" @click="show = true" :value="gender" />
      <van-cell is-link title="生日" @click="showDate = true" :value="birthday.join('-') || '选择生日'" />
      <van-cell is-link title="地区" @click="showArea = true" :value="district || '选择地区'" />

      <van-cell title="背景图" size="large" center>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-uploader v-model="backgroundImg" reupload max-count="1" :deletable="false" class="bgcimg">
            <template #default>
              <div class="custom-upload">
                <van-image :src="userInfo.backgroundImg" width="19.32vw" height="19.32vw" />
              </div>
            </template>
          </van-uploader>
        </template>
      </van-cell>
    </van-form>
    <!-- 编辑生日 -->
    <van-action-sheet v-model:show="showDate" title="选择生日">
      <van-date-picker v-model="birthday" :min-date="new Date(1949, 0, 1)" :max-date="new Date()"
        @confirm="confirmBirthday" @cancel="showDate = false" />
    </van-action-sheet>
    <!-- 选择性别 -->
    <van-action-sheet v-model:show="show" :actions="actions" @select="onSelect" />
    <!-- 选择地区 -->
    <van-action-sheet v-model:show="showArea" title="选择地区">
      <van-area :area-list="areaList" :columns-num="2" @confirm="confirmArea" @cancel="showArea = false" />
    </van-action-sheet>
  </div>
  <van-button type="danger" class="submit" block @click="onSubmit">保存</van-button>

</template>

<style scoped lang='scss'>
:deep(.van-icon-arrow-left) {
  font-size: 6vw;
  color: #000;
}

:deep(.van-nav-bar__left) {
  padding-left: 0;
}

.avatar :deep(.van-image__img, .van-uploader__upload) {
  border-radius: 50%;
}

:deep(.van-uploader__upload) {
  border-radius: 50%;
}

.page {
  height: calc(100vh - 40px);
}

.avatar {
  padding: 20px 0;
  display: flex;
  justify-content: center;
}

.bgcimg :deep(.van-uploader__upload) {
  border-radius: 0;
}

.submit {
  height: 40px;
}
</style>