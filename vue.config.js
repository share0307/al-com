// vue.config.js

const path = require('path')

const { SkeletonPlugin } = require('page-skeleton-webpack-plugin')

const resolve = file => path.resolve(__dirname, file)

module.exports = {
    // configureWebpack: config => {
    //     if (process.env.NODE_ENV === 'production') {
    //         // 为生产环境修改配置...
    //         config.resolve = {
    //             productionSourceMap:false
    //         }
    //     } else {
    //         // 为开发环境修改配置...
    //         config.resolve = {
    //             productionSourceMap:false
    //         }
    //     }
    // },
    //----骨架屏插件
    // configureWebpack: {
    //     plugins: [
    //     // vue-cli3自带html-webpack-plugin，所以我这边没有引入
    //     // 骨架屏插件
    //     new SkeletonPlugin({
    //         pathname: path.resolve(__dirname, './shell'),
    //         staticDir: path.resolve(__dirname, './dist'),
    //         routes: ['/'],
    //     })
    //     ]
    // },
    //----MPA多页应用
    // pages: {
    //     console: {
    //         // 应用入口配置，相当于单页面应用的main.js，必需项
    //         entry: 'src/modules/console/console.js',
    //         // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
    //         template: 'public/console.html',
    //         // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
    //         filename: 'console.html',
    //         // 标题，可选项，一般情况不使用，通常是在路由切换时设置title
    //         // 需要注意的是使用title属性template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //         title: 'console page',
    //         // 包含的模块，可选项
    //         chunks: ['console']
    //     },
    //     // 只有entry属性时，直接用字符串表示模块入口
    //     client: 'src/modules/client/client.js'
    // },
    // ...other vue-cli plugin options...
    outputDir: 'al', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    pwa: {
        name: 'AL',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',

        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
        // swSrc is required in InjectManifest mode.
        swSrc: 'src/main.js',
        // ...other Workbox options...
        }
    },
    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import "@/assets/css/base.scss";
                    @import "@/assets/css/mixin.scss";
                    @import "@/assets/css/vars.scss";
                `
            },
            stylus: {
                import: [
                    resolve('./src/assets/css/theme/mand-mobile')
                ]
                //stylus此处使用data不生效，使用官网建议resolve(暂时使用resolve)
                // data: `
                //     @import "@/assets/css/theme/mand-mobile.styl";
                // `
            },
        }
    },
    // transpileDependencies: [
    //      'mand-mobile'
    // ],
}