module.exports = {
    plugins: {
        // 配置使用 autoprefixer 插件:生成浏览器 CSS 样式规则前缀
        //   'autoprefixer': { 
        //     browsers: ['Android >= 4.0', 'iOS >= 8']
        //   },
        // 配置使用 postcss-pxtorem 插件:把 px 转为 rem
        'postcss-pxtorem': {
            rootValue({ file }) {
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },
            propList: ['*'],
            // 配置不做单位转换的资源文件名
            exclude: 'github-markdown'
        }
    }
}