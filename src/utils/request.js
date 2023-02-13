/**
 * 封装 axios 请求模块
 */

import axios from 'axios'
import store from '@/store'




// axios又创建了一个新的实例对象request  
const request = axios.create({
    // 接口的基准路径
    baseURL: 'http://toutiao.itheima.net',
    // 自定义后端返回的原始数据
})

// 请求拦截器
request.interceptors.request.use(config => {
    const { user } = store.state
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
}, err => {
    // 如果请求出错（还没发出去）会进入这里
    return Promise.reject(err)
})





// 导出
export default request