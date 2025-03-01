import request from "@/utils/request";
/**
 * 评论列表
 * @param data 笔记id 页码
 * @returns 
 */
export const commentList = (data: {
    noteId: string,
    pageNo: number,
}) => request.post('/comment/list', data)

