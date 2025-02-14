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
export const getNoteList = () => { }

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
