<script setup lang='ts' name=''>
import { ref } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import type { FormT } from './type';
const show = ref(false)
const actions = [
      { name: '公开可见', value:'1' },
      { name: '仅自己可见', value: '2' },
]
// 初始化表单信息
const form = ref<FormT>({
    title:'',
    content:'',
    fileList:[],
    privacy:'1'
})
const router = useRouter()
const route = useRoute()
const locationInfo = route.query
console.log(Object.keys(locationInfo));

// 返回上一页
const goBack = () => {
    router.push('/home')
}
const onSelect = (val:{name:string,value:string}) => {
    form.value.privacy = val.value
    show.value = false
}
</script>
<template>
  <div class="page-content">
       <header class="header">
          <van-icon name="arrow-left" size="6vw"  @click="goBack"/>
          <div class="title">分享心得</div>
          <van-button type="danger" class="publish">发表</van-button>
       </header>
       <main class="main">
            <div class="content">
                <van-form :model="form">
                    <van-cell-group>
                        <van-field v-model="form.title"  placeholder="请输入标题" maxlength="50" />
                    </van-cell-group>
                    <van-cell-group>
                        <van-field
                        v-model="form.content"
                        rows="5"
                        :autosize="{ maxHeight: 100, minHeight: 150 }"
                        type="textarea"
                        maxlength="300"
                        placeholder="请输入正文"
                        show-word-limit
                    />
                    </van-cell-group>
                    <van-cell-group >
                        <van-uploader v-model="form.fileList" :deletable="true" max-count="9" class="uploader" preview-size="25.8vw" />
                    </van-cell-group>
                    <van-cell :title="locationInfo.keys?.length>0?locationInfo.name as string:'标记地点'" icon="location-o"  is-link to="/location"/>
                    <van-cell :title="form.privacy==='1'?'公开可见':'仅自己可见'" icon="eye-o"  is-link @click="show = true" />
                <van-action-sheet v-model:show="show" :actions="actions" @select="onSelect" />

                </van-form>
            </div>
       </main>
</div>
</template>

<style scoped lang='scss'>
.header{
    display: flex;
    padding-top: 10px;
    justify-content: space-between;
    line-height:6vw ;
    .publish{
        font-size: 3vw;
        width: 15vw;
        height: 8vw;
    }
}
.main{
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    height: calc(100% - 15vw);
    background-color: #f3f2f7;
    .content{
        width: 100%;
        height: fit-content;
        background-color: #fff;
        border-radius: 10px;
        .uploader{
            margin:10px 10px 0 10px;
        }
    }
}
</style>