/*
*文章相关的请求模块
*/
import request from '@/utils/request'



// 获取文章新闻推荐,加了article_id就是获取新闻详情
export const getArticles = (params) => {
    return request({
        method: 'GET',
        url: '/v1_0/articles',
        params
    })
}
// 获取文章详情
export const getArticleDetail = (articleId) => {
    return request({
        method: 'GET',
        url: `/v1_0/articles/${articleId}`,
    })
}
// 收藏文章
export const collectArticle = (data) => {
    return request({
        method: 'POST',
        url: '/v1_0/article/collections',
        data
    })
}
// 取消收藏文章
export const unCollectArticle = (target) => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/collections/${target}`,
    })
}
// 点赞文章
export const likeArticle = (data) => {
    return request({
        method: 'POST',
        url: '/v1_0/article/likings',
        data
    })
}
// 取消点赞文章
export const unLikeArticle = (target) => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/likings/${target}`,
    })
}