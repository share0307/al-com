var httpEnvironment = 'uat';// local、int、uat
window.globalConfig = {
  rootUrl: 'http://tjiyibaouat.jxlife.com.cn/com.ifp.ipartner/', // 客户UAT服务器地址
  wechatUrl: 'http://tjiyibao.jxlife.com.cn', // 微信安全域名
  shareReplaceStr: 'jiyibao', // 微信分享的时候将/替换成此字符串
  isDebug: false, // 是否开启接口debug模式
  platform: 'native', // web、native、wechat、phoneWeb
  os: 'ios', // 操作系统 ios:苹果操作系统 android:安卓系统 window:电脑
  timeout: 1000 * 30, // 默认http请求超时时间30秒
  animation: true,
  loginType: 'extraExtCheck', // 登录方式--extraExtCheck
  from: 'JYB', // header--from
  transfer: 'JXAPPINTERFACE2018#@!%88', // 接口数据交互加密key
  comId: 'JXO2O20180301', // 保险公司编码--保险公司Id
  version: { // @todu ? 本地保存的版本号会不会被更新掉 vXX.XX.XX 第一个表示大版本升级 第二个是小版本升级 第三个是bug修复的
    'system.Portals': (httpEnvironment == 'int') ? 'V1.001.002' : 'V1.001.004', // 原生门户INT V1.001.002  UAT V1.001.002
    'IOS-plist': (httpEnvironment == 'int') ? 'V1.001.004' : 'V1.001.011', // iOS原生门户INT V1.001.004  UAT V1.001.001
    'system.H5upgrade': (httpEnvironment == 'int') ? 'V1.001.014' : 'V1.001.027' // H5升级INT V1.001.014  UAT V1.001.009
  },
  downloadApp_Android: 'https://www.pgyer.com/jx_sit',
  downloadApp_iOS: 'https://www.pgyer.com/jx_iOS_INT'
}
switch (httpEnvironment) {
  case 'local':
    window.globalConfig.isDebug = true;
    break
  case 'int':
    window.globalConfig.isDebug = false;
    window.globalConfig.rootUrl = 'http://tjiyibao.jxlife.com.cn/com.ifp.ipartner/';
    window.globalConfig.downloadApp_Android = 'https://www.pgyer.com/jx_sit';
    window.globalConfig.downloadApp_iOS = 'https://www.pgyer.com/jx_iOS_INT';
    window.globalConfig.wechatUrl = 'http://tjiyibao.jxlife.com.cn';
    break
  case 'uat':
    window.globalConfig.isDebug = false;
    window.globalConfig.rootUrl = 'http://tjiyibaouat.jxlife.com.cn/com.ifp.ipartner/';
    window.globalConfig.downloadApp_Android = 'https://www.pgyer.com/jx_uat';
    window.globalConfig.downloadApp_iOS = 'https://www.pgyer.com/JX_iOS_UAT';
    window.globalConfig.wechatUrl = 'http://tjiyibaouat.jxlife.com.cn';
    break
}



import Vue from 'vue'
import $ from 'jquery'
import Navigation from 'vue-navigation'
import FastClick from 'fastclick'
import VueI18n from 'vue-i18n'
import App from './App.vue'
import router from './routers'
import store from './vuex'
import utils from './utils'
import './registerServiceWorker'
import messages from './data/translation'

//定制化样式
// import './assets/css/mixin.scss'
// import './config/rem.js'
// import 'amfe-flexible'

//注册全局utils
window.utils = utils

//全局引入vant的懒加载
// or with options (options 为可选参数，无则不传)
import { Lazyload } from 'vant';
Vue.use(Lazyload, {
  preLoad: 1.3,
  error: require('@/assets/images/common/voucher.png'),
  loading: require('@/assets/images/common/voucher.png'),
  attempt: 3
})

//配置使用全局jquery
window.jQuery = $;
window.$ = $;

//300ms延迟去除
FastClick.attach(document.body)

Vue.config.productionTip = false

//国际化
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: utils.cache.get('AL_MOBILE_PALETTE') || 'zh',
  messages
})


// 导航插件(保存游览历史的页面数据)
Vue.use(Navigation, {
  router,
  store,
  moduleName: 'navigation',
  keyName: 'AL'
})

// 设置全局参数 方法或者变量
Vue.mixin({
  data () {
    return {
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
      // 定义常量 用于页面判断 @待修改
      os: window.navigator.platform === 'iPhone' ? 'ios' : 'android',
      platform: window.globalConfig.platform
    }
  },
  methods: {
    go (url) {
      this.$router.push({name: url})
    },
    back (urlName) {
      console.log('点击返回=', urlName)
      // 如果url存在 则跳转到对应的位置
      if (typeof urlName === 'string' && urlName) {
        // 如果不存在则 跳转到对应的路由
        this.$router.push({name: urlName})
      } else {
        console.log('进入else')
        window.history.back()
      }
    }
  }
})


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
