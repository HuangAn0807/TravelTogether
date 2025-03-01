export type Reply = (data: { id: string, username: string }) => void
export type ChangeLike = (count: number, icon: string, isLike: boolean) => void
// 评论表单
export type Form = {
    rootId: string,
    id: string,
    replyId: string,
    content: string,
}
// 评论树
export type CommentT = {
    id: string,
    parentId: string,
    rootId: string,
    parentUserName: string,
    like: number,
    username: string,
    content: string,
    time: string,
    province: string,
    width?: string,
    avatar: string,
    children: CommentT[]
}
// 详情页表单
export type DetailForm = {
    avatar: string,
    content: string,
    creatorId: number
    creatorName: string,
    id: bigint,
    imgUris: string[],
    position: string,
    title: string,
    topicId: number,
    topicName: string,
    type: number,
    updateTime: string,
    videoUri: string,
    visible: number
    isLike: boolean
    isCollect: boolean
    likeCount: number
    collectCount: number
    commentCount: number
    isFollow: boolean
}
