/**
 * 处理时间
 */
import Vue from 'vue'
import dayjs from 'dayjs'

// 引入中文包
import 'dayjs/locale/zh-cn'

// 配置使用处理相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

// 配置使用中文语言包
dayjs.locale('zh-cn')


 Vue.filter('relativeTime',value=>{
    return dayjs().to(dayjs(value))
 })