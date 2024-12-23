export type Reply = (data:{id:string,username:string})=>void
export type ChangeLike = ( count:number,icon:string)=>void
// 评论表单
export type Form = {
    rootId:string,
    id:string,
    replyId:string,
    content:string,
}
// 评论树
export type CommentT= {
    id:string,
    parentId:string,
    rootId:string,
    parentUserName:string,
    like:number,
    username:string,
    content:string,
    time:string,
    province:string,
    width?:string,
    avatar:string,
    children:CommentT[]
}
