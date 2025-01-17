import request from "@/utils/request";

/**
 * 登录注册
 * @param data 表单数据
 * @returns 
 */
export const login = (data: {
    phone: string;
    password?: string;
    code?: string;
    userLoginType: number;
}) => request.post('/auth/login', data)
/**
 * 获取验证码
 * @param data 手机号
 * @returns 
 */
export const getCode = (data: {
    phone: string;
}) => request.post('/auth/verificationCode/send', data)
/**
 * 退出登录
 * 
 * @returns 
 */
export const logout = () => request.post('/auth/logout')