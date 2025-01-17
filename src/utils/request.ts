import axios, { type AxiosResponse } from 'axios'
import { useUserStore } from '@/stores/userStore'
interface ResponseData<T = any> {
  code: string;
  data: T;
  message: string;
}
const request = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: '/api',
  // 超时
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
})
// 添加一个请求拦截器
request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  const token = userStore.token
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  if ((config.method)?.toLowerCase() == 'post') {
    const dateNow = Date.now()
    //添加时间戳
    config.headers['timeStamp'] = dateNow
  }
  return config;
}, (error) => {

  return Promise.reject(error);
});

// 添加一个响应拦截器
request.interceptors.response.use((response: AxiosResponse<any, any>) => {
  //     对响应数据做点什么
  if (response.data.code == '200') {
    return response;
  }
  return Promise.reject(new Error(response.data.message) || '请求失败');
}, (error) => {
  // 对响应错误做点什么
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 未授权，跳转到登录页
        // router.push('/login')
        break;
      case 403:
        // 权限不足
        break;
      case 404:
        // 请求不存在
        break;
      case 500:
        // 服务器错误
        break;
      default:
        break;
    }
  }
  return Promise.reject(error);
});
export default request;