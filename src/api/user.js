/*
*用户相关的请求模块
*/


import request from '@/utils/request'




// 用户登录
export const login = (data) => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}
// 发送短信验证码
export const sendSms = (mobile) => {
    return request({
        method: 'GET',
        url: '/v1_0/sms/codes/' + mobile,
    })
}
// 获取用户个人资料
export const getUserInfo = (mobile) => {
    return request({
        method: 'GET',
        url: '/v1_0/user'
    })
}
// 获取用户的频道列表
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels'
    })
}
// 关注用户
export const addFollow = (target) => {
    return request({
        method: 'POST',
        url: '/v1_0/user/followings',
        data: {
            target
        }
    })
}
// 取消关注用户
export const delFollow = (target) => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/followings/${target}`,

    })
}

// 获取用户个人资料
export const getUserProfile = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/profile'
    })
}

// 更新用户个人资料
export const updateUserProfile = (data) => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/profile',
        data
    })
}
// 编辑用户照片资料（头像、身份证照片）
export const updateUserPhoto = (data) => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/photo',
        data
      
    })
}