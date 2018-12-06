// vue.config.js

const path = require('path')

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