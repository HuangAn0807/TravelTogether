<script setup lang='ts' name=''>
import {computed, reactive,ref} from 'vue'
import {useRouter } from 'vue-router';
import type {Form,Select} from './type'
import {areaList} from '@vant/area-data'
const router = useRouter()
const show = ref(false)
const showArea = ref(false)
const showDate = ref(false)
const form = ref<Form>({
    avatar:[],
    username: '',
    intro:'',
    sex:'男',
    id:'123456789',
    birthday:[],
    area:[],
    bgImg:[]
})
const birthday = computed(() => {
    return form.value.birthday.join('-')
})
// 显示地区
const district = ref('')
const actions = [
    {
      name: '男',
    },
    {
      name: '女',
    },
  ]
const onClickLeft = () => {
    router.go(-1)
}
// 选择性别
const onSelect = (val:{name:string}) => {
  form.value.sex = val.name
    show.value = false
}
// 选择生日
const confirmBirthday = (val:Select) => {
    form.value.birthday = val.selectedValues
    showDate.value = false
}
// 选择地区
const confirmArea = (val:Select) => {
  for(let i = 0;i<val.selectedOptions.length-1;i++){
    // 判断是否是直辖市
    if(val.selectedOptions[i].text===val.selectedOptions[i+1].text){
      // 直辖市只显示市
      district.value = val.selectedOptions[i].text
    }else{
      // 非直辖市显示省市
      district.value = val.selectedOptions[i].text+ ' ' +val.selectedOptions[i+1].text
    }
  }
  // 将省市对应的编码存入表单中
    form.value.area = val.selectedValues
    showArea.value = false
}

// 提交用户编辑后的信息
const onSubmit = () => {

}
</script>
<template>
  <div class="page-content page">
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
      v-model="form.id"
      name="pattern"
      label="用户ID"
      :disabled="true"
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
    <van-cell is-link title="生日" @click="showDate = true" :value="birthday||'选择生日'"  />
    <van-cell is-link title="地区" @click="showArea = true" :value="district|| '选择地区'"  />
   
      <van-cell title="背景图" size="large" center> 
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-uploader v-model="form.bgImg" reupload max-count="1" :deletable="false" class="bgcimg" />
        </template>
      </van-cell>
  </van-form>
  <!-- 编辑生日 -->
<van-action-sheet v-model:show="showDate" title="选择生日">
    <van-date-picker
    v-model="form.birthday"
    :min-date="new Date(1900, 0, 1)"
    @confirm="confirmBirthday"
    @cancel="showDate = false"
  />
</van-action-sheet>
<!-- 选择性别 -->
  <van-action-sheet v-model:show="show" :actions="actions" @select="onSelect" />
  <!-- 选择地区 -->
  <van-action-sheet v-model:show="showArea" title="选择地区">
    <van-area  :area-list="areaList" :columns-num="2"  @confirm="confirmArea"
    @cancel="showArea = false" />
</van-action-sheet>
</div>
<van-button type="danger" class="submit" block @click="onSubmit">保存</van-button>

</template>

<style scoped lang='scss'>
 :deep(.van-icon-arrow-left){
  font-size: 6vw;
  color: #000;
}
:deep(.van-nav-bar__left) {
  padding-left: 0;
}
.avatar :deep(.van-image__img,.van-uploader__upload){
  border-radius: 50%;
}
:deep(.van-uploader__upload){ 
  border-radius: 50%;
}
.page{
  height: calc(100vh - 40px);
}
.avatar{
  padding: 20px 0;
  display: flex;
  justify-content: center;
}
.bgcimg :deep(.van-uploader__upload){
  border-radius: 0;
}
.submit{
  height: 40px;
}
</style>