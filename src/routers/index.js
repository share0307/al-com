/*
 * @Author: aliang 
 * @Date: 2018-11-19 17:21:00 
 * @Last Modified by: 
 * @Last Modified time: 2018-12-19 14:17:58
 */

import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex'

// 引入模块
import demo from './demo'
// 登陆模块
import login from './login'
// 个人中心
import center from './center'
// 投保
import insured from './insured'
// 首页
import home from './home'


// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
const scrollBehavior = (to, from, savedPosition) => {
  console.log('%c savedPosition','color:green;',savedPosition);
  if (savedPosition) {
    let position = {}
    // savedPosition is only available for popstate navigations.
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0
      position.y = 0
    }else{
      position = savedPosition
    }
    // if(position&&position.x&&position.x==0){
    //   document.getElementById('app').scrollIntoView()
    // }
    return position
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash
    }
    // check if any matched route config has meta that requires scrolling to top
    // if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    // }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    // if(position&&position.x&&position.x==0){
    //   document.getElementById('app').scrollIntoView()
    // }
    return position
  }
}

Vue.use(Router)
const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior,
  routes: [
    {
      path: '/',
      name: 'base',
      redirect: to => {
        // 为非app情况下 则重定向到登陆页面
        if (window.globalConfig.platform !== 'native') {
          return window.globalConfig.platform === 'wechat' ? 'register' : 'login'
        }
        console.log('%c routes=>base','color:blue;',window.globalConfig.platform);
        return 'home'
      },
      meta: {
        title: '保险商城测试',
        login: false,
        footer: true,
        tabIndex: '1'
      }
    },
    ...demo,//build包的时候注释掉
    ...login,
    ...home,
    ...center,
    ...insured,
  ]
})

// 监听路由变化
router.beforeEach((to, from, next) => {
  // 配置微信的信息
  try {
    window.utils.wechat.hideAllNonBaseMenuItem()
  } catch (error) {
    console.log('微信配置失败', 'error')
  }
  // 关闭loadding
  // window.utils.ui.closeLoadding()
  // 底部导航是否显示
  store.commit('SHOW_FOOTER', to.meta.footer)
  if (to.meta.tabIndex) {
    store.commit('TAB_SELECTED', to.meta.tabIndex)
  }

  // 是否可以缩放
  // if (to.meta.zoom) {
  //   document.querySelector('meta[name=viewport]').setAttribute('content', 'viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=3.0, user-scalable=yes')
  // } else {
  //   document.querySelector('meta[name=viewport]').setAttribute('content', 'viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no')
  // }

  // 如果是微信 修改顶部标题
  if (window.globalConfig.platform === 'wechat' && to.meta.title) {
    window.document.title = to.meta.title
  }
  // 是否登录
  if (to.meta && to.meta.title && to.meta.login !== false && !store.state.common.user) {
    console.log('现在还走这里吗 安卓' + to.meta.login + store.state.common.user)
    console.log(JSON.stringify(to.meta))
    // 如果是微信的情况则跳转到注册页面
    next('/login')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  // if(to.meta.scrollToTop){
  //   document.getElementById('app').scrollIntoView()
  // }
})

export default router
