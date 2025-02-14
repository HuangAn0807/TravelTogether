import request from "@/utils/request";
/**
 * 获取用户信息
 * @param params 用户id
 * @returns
 */
export const getUser = (params: { userId: BigInt | null }) => request.get('/user/info', { params })