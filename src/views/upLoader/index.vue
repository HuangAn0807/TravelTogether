<script setup lang='ts' name=''>
import type { UploaderFileListItem } from 'vant';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Ditu from '@/views/upLoader/Ditu.vue';
import Position from './Position.vue';
type FormT={
    title:string,
    content:string,
    fileList:UploaderFileListItem[]
}
const form= ref<FormT>({
    title:'',
    content:'',
    fileList:[]
})
    const router = useRouter()
    // 返回上一页
    const goBack = () => {
        router.go(-1)
    }
</script>
<template>
  <div class="page-content">
       <header class="header">
          <van-icon name="arrow-left" size="8vw"  @click="goBack"/>
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
                    
                </van-form>
                <Ditu></Ditu>
                <Position></Position>
            </div>
       </main>
</div>
</template>

<style scoped lang='scss'>
.header{
    display: flex;
    justify-content: space-between;
    line-height:8vw ;
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
    height: calc(100% - 10vw);
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