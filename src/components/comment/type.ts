export type CommentT= {
    id:string,
    parentId:string,
    parentUserName?:string,
    like:number,
    username:string,
    content:string,
    time:string,
    province:string,
    width?:string,
    avatar:string,
    children:CommentT[]
}