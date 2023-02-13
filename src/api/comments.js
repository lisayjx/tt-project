/*
*评论相关的请求模块
*/
import request from '@/utils/request'



// 获取评论或评论回复
export const getComments = (params) => {
    return request({
        method: 'GET',
        url: '/v1_0/comments',
        params
    })
}

// 对评论或评论回复 点赞
export const addCommentLike = (target) => {
    return request({
        method: 'POST',
        url: '/v1_0/comment/likings',
        data: {
            target
        }
    })
}
// 对评论或评论回复 取消点赞
export const delCommentLike = (target) => {
    return request({
        method: 'DELETE',
        url: `/v1_0/comment/likings/${target}`,

    })
}
// 对文章或者评论进行评论
export const comment = (data) => {
    return request({
        method: 'POST',
        url: '/v1_0/comments',
        data
    })
}