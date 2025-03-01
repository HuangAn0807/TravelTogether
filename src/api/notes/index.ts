import request from "@/utils/request";
import type { UploaderFileListItem } from "vant";
export type Note = {
    type: number//类型
    imgUris: string[]//图片url
    title: string//标题
    videoUri?: string//图片url
    content?: string//文字内容
    topicId?: number//主题id
    position: string//位置
    visible: number | string//公开或私密
}
/**
 * 获取笔记列表
 * @param data
 * @returns
 */
export const getNoteList = (data: { pageNo: number }) => request.post('/search/home', data)

/**
 * 添加笔记
 * @param data 
 * @returns 
 */
export const addNote = (data: Note) => request.post('/note/publish', data)
/**
 * 文件上传
 * @param file
 */
export const uploadFile = (data: any) => request.post('/oss/file/upload', data, {
    headers: {
        'Content-Type': 'multipart/form-data', // 设置请求头
    }
})
/**
 * 笔记详情
 * @param id 笔记id
 */
export const getNoteDetail = (data: { id: string }) => request.post(`/note/detail`, data)

/**
 * 点赞笔记
 * @param id 笔记id
 */
export const likeNote = (data: { id: string }) => request.post(`/note/like`, data)

/**
 * 取消点赞笔记
 * @param id 笔记id
 */
export const unlikeNote = (data: { id: string }) => request.post(`/note/unlike`, data)

/**
 * 收藏笔记
 * @param id 笔记id
 */
export const collectNote = (data: { id: string }) => request.post(`/note/collect`, data)

/**
 * 取消收藏笔记
 * @param id 笔记id
 */
export const unCollectNote = (data: { id: string }) => request.post(`/note/uncollect`, data)


