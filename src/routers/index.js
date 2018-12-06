/*
 * @Author: aliang 
 * @Date: 2018-11-19 17:21:00 
 * @Last Modified by: 
 * @Last Modified time: 2018-12-04 10:55:36
 */

import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex'

// 引入模块
// import demo from './demo'
// 登陆模块
import login from './login'
// 个人中心
import center from './center'
// 投保
import insured from './insured'
// 首页
import home from './home'

Vue.use(Router)
const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
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
    // ...demo,
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

export default router
