/**
 * 频道模块
 */
import request from '@/utils/request'

// 获取所有频道列表
export const getChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/channels'
    })
}
// 删除指定用户频道
export const delUserChannels = (channelId) => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/channels/${channelId}`,
    })
}
// 添加用户频道
export const addUserChannels = (channel) => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/channels',
        data: {
            channels: [channel]
        }
    })
}