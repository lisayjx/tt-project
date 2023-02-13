import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  // 登录页
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login')
  },
  // layout页 父亲
  {
    path: '/',
    component: () => import('@/views/layout'),
    // 3个tabBar孩子
    children: [
      { path: '', name: 'home', component: () => import('@/views/home') },//默认子路由，只能有一个，当访问/的时候，显示home组件
      { path: '/qa', name: 'qa', component: () => import('@/views/qa') },
      { path: '/video', name: 'video', component: () => import('@/views/video') },
      { path: '/my', name: 'my', component: () => import('@/views/my') }
    ]
  },
  // 搜索页
  {
    name: 'search',
    path: '/search',
    component: () => import('@/views/search')
  },
  // 文章内容页
  {
    name: 'article',
    path: '/article/:articleId',  //动态路由匹配
    component: () => import('@/views/article'),
    props: true
  },
  // 个人信息页
  {
    name: 'user-profile',
    path: '/user/profile',
    component: () => import('@/views/user-profile')
  },
]
const router = new VueRouter({
  routes
})
export default router
