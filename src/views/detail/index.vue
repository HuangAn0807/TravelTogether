<script setup lang='ts' name='Detail'>
import { useRoute, useRouter } from 'vue-router';
import Comment from './components/Comment.vue';
import { emitter } from '@/utils/emitter';
import { onMounted, ref } from 'vue'
import { getNoteDetail, likeNote, unlikeNote, commentList, collectNote, unCollectNote } from '@/api/index'
import type { Reply, Form, CommentT, ChangeLike, DetailForm } from './type';
import { useUserStore } from '@/stores/userStore';
import useCity from '@/hooks/getCity';
const { userInfo } = useUserStore()
const route = useRoute();
const router = useRouter()
const { getPlace } = useCity()
const city = ref('未知')
const input = ref<HTMLInputElement | null>(null)
// 详情数据
const detailForm = ref<DetailForm>()
// 是否点赞
const isLike = ref(false)
const isCollect = ref(false)
// 评论内容
const commentValue = ref('')
// 点赞数
const likeNum = ref(0)
// 收藏数
const collectNum = ref(0)
// 关注
const isFollow = ref(false)
//星星图标
const starIcon = ref('star')

onMounted(async () => {
    // 获取笔记详情
    const res = await getNoteDetail({ id: route.query.id as string })
    detailForm.value = res.data.data as DetailForm
    // 用户是否点过赞
    isLike.value = detailForm.value.isLike
    likeNum.value = detailForm.value.likeCount
    collectNum.value = detailForm.value.collectCount
    // 用户是否收藏过
    isCollect.value = detailForm.value.isCollect
    getPlace(detailForm.value.position).then((res) => {
        city.value = res.regeocode.formatted_address
    })
    const result = await commentList({ noteId: route.query.id as string, pageNo: 1 })
    console.log(result.data);

})

const datalist = ref<CommentT[]>([
    {
        id: '1',
        parentId: '',
        rootId: '',
        parentUserName: '',
        like: 12,
        username: '张三',
        content: '程序员的破防瞬间的破防瞬间 程序员的破防瞬间程序员的破防瞬间 程序员的破防瞬间程序员',
        time: '01-01',
        province: '广东',
        avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        children: [
            {
                id: '2',
                parentId: '1',
                rootId: '1',
                parentUserName: '张三',
                like: 12,
                username: '李四',
                content: '123456',
                time: '01-01',
                province: '广东',
                avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
                children: [
                    {
                        id: '3',
                        parentId: '2',
                        rootId: '1',
                        parentUserName: '李四',
                        like: 12,
                        username: '黄小安',
                        content: '如何躺着也能暴富',
                        time: '01-01',
                        province: '广东',
                        avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
                        children: [
                            {
                                id: '4',
                                parentId: '3',
                                rootId: '1',
                                parentUserName: '黄小安',
                                like: 12,
                                username: '王五',
                                content: '程序员的破防瞬间 程序员的破防瞬间程序员的破防瞬间',
                                time: '01-01',
                                province: '广东',
                                avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
                                children: []
                            }
                        ]
                    },
                ]
            },
        ]
    },
    {
        id: '5',
        rootId: '',
        parentId: '',
        parentUserName: '',
        like: 12,
        username: '张三',
        content: '如何躺平也能暴富',
        time: '01-01',
        province: '广东',
        avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        children: [
            {
                id: '6',
                parentId: '5',
                rootId: '5',
                parentUserName: '李四',
                like: 12,
                username: '黄小安',
                content: '如何躺着也能暴富',
                time: '01-01',
                province: '广东',
                avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
                children: []
            }
        ]
    }
])
const form = ref<Form>({
    content: '',
    rootId: '',
    replyId: '',
    id: ''

})


const placeholder = ref('')
const goBack = () => {
    router.go(-1)
}
// 跳转用户详情
const goUserDetail = () => {
    router.push({ name: 'userDetail', query: { id: route.query.id } })
}
// 关注
const followChange = () => {
    isFollow.value = !isFollow.value
}
// 回复
const handleReply: Reply = (data) => {
    placeholder.value = `回复${data.username}`
    form.value.replyId = data.id
    input.value?.focus()
}
// 监听回复事件
emitter.on('reply', handleReply)
// 失去焦点执行的操作
const loseFocus = () => {
    placeholder.value = ''
}

const changeLike: ChangeLike = async (count, icon, like) => {
    if (icon === 'like') {
        likeNum.value = count
        isLike.value = like
        if (isLike.value) {
            await likeNote({ id: route.query.id as string })
        } else {
            await unlikeNote({ id: route.query.id as string })
        }
    } else if (icon === starIcon.value) {
        collectNum.value = count
        isCollect.value = like
        if (isCollect.value) {
            await collectNote({ id: route.query.id as string })
        } else {
            await unCollectNote({ id: route.query.id as string })
        }
    }
}
</script>
<template>
    <div class="page-content page">
        <header class="header">
            <div class="header-left">
                <van-icon name="arrow-left" size="6vw" @click="goBack" />
                <div class="user-info">
                    <van-image fit="cover" :src="detailForm?.avatar" round class="user-img" @click="goUserDetail" />
                    <div class="user-name">
                        {{ detailForm?.creatorName }}
                    </div>
                </div>
            </div>
            <div class="header-right">
                <div v-if="userInfo.id !== detailForm?.creatorId" :class="['right', isFollow ? 'black' : 'red']"
                    @click="followChange">
                    {{ isFollow ? '已关注' : '关注' }}
                </div>
            </div>
        </header>
        <main class="main">
            <div class="top">
                <van-swipe lazy-render :loop="false">
                    <van-swipe-item class="item" v-for="image in detailForm?.imgUris" :key="image">
                        <img :src="image" fit="cover" class="img" />
                    </van-swipe-item>
                    <template #indicator="{ active, total }">
                        <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
                    </template>
                </van-swipe>
            </div>
            <div class="center">
                <div class="title">
                    {{ detailForm?.title }}
                </div>
                <div class="content">
                    {{ detailForm?.content }}
                </div>
                <div class="date"><span>{{ detailForm?.updateTime }}</span><span>{{ city }}</span></div>
            </div>
            <div class="bottom">
                <div class="comment-count">
                    共有{{ detailForm?.commentCount }}条评论
                </div>
                <Comment v-for="item in datalist" :key="item.id" :root-id="item.rootId" :id="item.id"
                    :parentId="item.parentId" :parentUserName="item.parentUserName" :username="item.username"
                    :content="item.content" :time="item.time" :province="item.province" :avatar="item.avatar"
                    :children="item.children" :like="item.like">
                </Comment>
            </div>
        </main>
        <footer>
            <div class="left">
                <van-field v-model="commentValue" left-icon="smile-o" :placeholder="placeholder || '说点什么'"
                    @blur="loseFocus" class="input" ref="input" />
            </div>
            <div class="right">
                <div class="like">
                    <!-- 点赞 -->
                    <Upvote @changeLike="changeLike" :like="isLike" :count="likeNum" />
                </div>
                <div class="collect">
                    <!-- 收藏 -->
                    <Upvote @changeLike="changeLike" :like="isCollect" :icon="starIcon" :color="'#ffd21e'"
                        :count="collectNum" />
                </div>
            </div>
        </footer>
    </div>
</template>

<style scoped lang='scss'>
.page {
    padding: 0;
}

.custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 10px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.3);
}

.user-name,
.title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.header {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    padding: 30px 30px 30px 10px;
    align-items: center;
    height: 8vw;
    width: 100%;
    background-color: #fff;

    .header-left {
        display: flex;

        .user-info {
            margin-left: 20px;
            display: flex;
            align-items: center;

            .user-img {
                margin-right: 10px;
                width: 6vw;
                height: 6vw;
            }

            .user-name {
                width: 40vw;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }

    .header-right {
        display: flex;

        .right {
            width: 80px;
            height: 2em;
            line-height: 2em;
            border-radius: 1em;
            text-align: center;
            font-weight: 500;
        }

        .red {
            border: 1px solid #e10a2a;
            color: #e10a2a;
        }

        .black {
            border: 1px solid #898989;
        }
    }
}

.main {
    margin-top: 14vw;
    margin-bottom: 14vw;
    width: 100%;

    .center {
        padding: 10px;
    }

    .item {
        overflow: hidden;
        width: 100%;

        .img {
            height: auto;
            width: 100%;
        }
    }

    :deep(.van-swipe__track) {
        align-items: center;
    }

    .title {
        font-size: 1.4em
    }

    .date {
        font-size: 0.8em;
        color: #898989;

        span {
            margin-right: 10px;
        }
    }

    .bottom {
        padding: 10px;
        padding-top: 0;
        padding-bottom: 14vw;

        .comment-count {
            font-size: 1em;
            color: #898989;
        }
    }
}

footer {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    width: 100%;
    height: 14vw;
    background-color: #fff;

    .input {
        height: 40px;
        border-radius: 20px;
        background-color: #eee;
    }

    .right {
        width: 40vw;
        display: flex;
        align-items: center;
        justify-content: space-evenly;

        span {
            margin-left: 5px;
        }
    }
}
</style>