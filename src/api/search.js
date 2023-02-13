/**
 * 搜索模块
 */
import request from '@/utils/request'

// 获取所有频道列表
export const getSuggestions = (q) => {
    return request({
        method: 'GET',
        url: '/v1_0/suggestion',
        params:{
            q
        }
    })
}
// 获取搜索结果 getSearchResult
export const getSearchResult = (params) => {
    return request({
        method: 'GET',
        url: '/v1_0/search',
        params
    })
}