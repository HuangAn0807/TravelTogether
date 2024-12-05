import axios from 'axios'
import  {useUserStore} from '@/stores/userStore'
const request = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    // baseURL: process.env.VUE_APP_BASE_API,
    // 超时
    timeout: 10000
  })
// 添加一个请求拦截器
request.interceptors.request.use((config)=> {
    const userStore = useUserStore()
    const token = userStore.token
    if(!token){
        config.headers['Authorization'] = 'Bearer ' + token
    }
    if ((config.method)?.toLowerCase() == 'post') {
        const dateNow = Date.now()
        //添加时间戳
        config.headers['timeStamp'] = dateNow
      }
    return config;
  }, function (error) {
  
    return Promise.reject(error);
  });

// 添加一个响应拦截器
// request.interceptors.response.use((config)=> {
// //     对响应数据做点什么
//     return response ;
//   }, function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
//   });
  export default request;