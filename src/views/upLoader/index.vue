<script setup lang='ts' name='UpLoader'>
import { ref, watch, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { addNote, type Note, uploadFile } from '@/api/notes'
import type { UploaderFileListItem } from 'vant';
import { useFilelistStore } from '@/stores/useFileStore'
const { setFileList, fileList } = useFilelistStore()
const show = ref(false)
const actions = [
    { name: '公开可见', value: 0 },
    { name: '仅自己可见', value: 1 },
]
const imageList = ref<UploaderFileListItem[]>(fileList.length > 0 ? fileList : [])
const router = useRouter()
const route = useRoute()
const locationInfo = ref(route.query)

// 初始化表单信息
const form = ref<Note>(JSON.parse(localStorage.getItem('form') as string) || {
    title: '',
    content: '',
    imgUris: [],
    type: 0,
    position: route.query.location || '',
    visible: 0,
})
watchEffect(() => {
    form.value.position = route.query.location as string
    setFileList(imageList.value)
    localStorage.setItem('form', JSON.stringify(form.value))
})

// 返回上一页
const goBack = () => {
    localStorage.removeItem('form')
    setFileList([])
    router.push({ name: 'home' })
}
// 选择可见性
const onSelect = (val: { name: string, value: string }) => {
    form.value.visible = val.value
    show.value = false
}
const toLocation = () => {
    router.push({ name: 'location' })
}
// 发布心得
const publishNote = async () => {
    let flag = false
    // 获取文件列表
    const images = imageList.value.map((item) => item.file)
    // 将文件上传返回的链接添加到form.value.imgUris中
    for (let i = 0; i < imageList.value.length; i++) {
        const res = await uploadFile({ file: images[i] })
        if (res.data.code == '200') {
            form.value.imgUris.push(res.data.data)
        }
        if (i === images.length - 1) {
            flag = true
        }
    }
    if (!flag) return
    const res = await addNote(form.value)
    if (res.data.code == 200) {
        // 成功通知
        // @ts-ignore
        showNotify({ type: 'success', message: '发布成功' });
        localStorage.removeItem('form')
        setFileList([])
        router.push({ name: 'home' })
    }
}
const rules = {
    title: [
        {
            required: true,
            message: '请输入标题',
        }
    ],
    position: [
        {
            required: true,
            message: '请选择地点',
        },

    ],
}
</script>
<template>
    <div class="page-content">
        <header class="header">
            <van-icon name="arrow-left" size="6vw" @click="goBack" />
            <div class="title">分享心得</div>
            <van-button type="danger" class="publish" @click="publishNote">发布</van-button>
        </header>
        <main class="main">
            <div class="content">
                <van-form :model="form">
                    <van-cell-group>
                        <van-field v-model="form.title" placeholder="请输入标题" maxlength="50" :rules="rules.title" />
                    </van-cell-group>
                    <van-cell-group>
                        <van-field v-model="form.content" rows="5" :autosize="{ maxHeight: 100, minHeight: 150 }"
                            type="textarea" maxlength="300" placeholder="请输入正文" show-word-limit />
                    </van-cell-group>
                    <van-cell-group>
                        <!-- <KeepAlive>
                            <component :is="currentComponent"></component>
                        </KeepAlive> -->
                        <van-uploader v-model="imageList" :deletable="true" max-count="9" class="uploader"
                            preview-size="25.8vw" />
                    </van-cell-group>
                    <van-cell :title="locationInfo?.name ? locationInfo.name as string : '标记地点'" icon="location-o"
                        @click="toLocation" :rules="rules.position" />
                    <van-cell :title="form.visible === 0 ? '公开可见' : '仅自己可见'" icon="eye-o" is-link
                        @click="show = true" />
                    <van-action-sheet v-model:show="show" :actions="actions" @select="onSelect" />

                </van-form>
            </div>
        </main>
    </div>
</template>

<style scoped lang='scss'>
.header {
    display: flex;
    padding-top: 10px;
    justify-content: space-between;
    line-height: 6vw;

    .publish {
        font-size: 3vw;
        width: 15vw;
        height: 8vw;
    }
}

.main {
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    height: calc(100% - 15vw);
    background-color: #f3f2f7;

    .content {
        width: 100%;
        height: fit-content;
        background-color: #fff;
        border-radius: 10px;

        .uploader {
            margin: 10px 10px 0 10px;
        }
    }
}
</style>