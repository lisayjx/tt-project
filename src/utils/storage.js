/**
 * 封装本地存储操作模块
 */

// 存储数据
export const setItem = (key, value) => {
    // 如果存储得数据是数组或者对象，就转化成JSON字符串存进去
    if (typeof value == 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value)
}

// 获取数据
export const getItem = (key) => {
    const res = window.localStorage.getItem(key)
    // 判断回来的数据是不是json字符串 如果能被转换成功就是
    try {
        //如果是有效的json字符串，就返回字符串
        return JSON.parse(res)
    } catch (err) {
        // 如果不是有效的json 会报错 就把数据原封不动返回 
        return res
    }
}


// 删除数据
export const removeItem = key => {
    window.localStorage.removeItem(key)
  }