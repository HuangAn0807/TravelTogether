import request from "@/utils/request";
import type { Form } from '@/views/editInfo/type'
/**
 * 获取用户信息
 * @param params 用户id
 * @returns
 */
export const getUser = (params?: { userId: number | null }) => request.get('/user/info', { params })
/**
 * 修改用户信息
 * @param data 用户信息
 * @returns
 
 */
export const updateUser = (data: Form) => request.post('/user/update', data)
/**
 * 获取用户关注列表
 * @param data userId:用户id
 * @returns
/**
 * 关注用户
 * @param params followUserId:用户id
 * @returns
 * */
export const followuser = (params: { followUserId: number | null }) => request.get('/user/follow/number', { params })

/**
 * 获取用户粉丝列表
 * @param data userId:用户id
 * @returns 
 */
export const getFansList = (data: { userId: number | null }) => request.post('/user-relation/following/list', data)