import request from "@/utils/request";
import axios from "axios";

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
}) => axios.post('/api/auth/login', data)
/**
 * 获取验证码
 * @param data 手机号
 * @returns 
 */
export const getCode = (data: {
    phone: string;
}) => axios.post('/api/auth/verificationCode/send', data)
/**
 * 退出登录
 * 
 * @returns 
 */
export const logout = () => request.post('/auth/logout')

/**
 * 修改密码
 * @param data 表单数据
 * @returns 
 */
export const resetPassword = (data: {
    phone: string;
    password: string;
    code: string;
}) => request.post('/user/password/reset', data)