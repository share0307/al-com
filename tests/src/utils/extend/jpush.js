/*
 * @Author: jdf
 * @Date: 2018-05-10 16:06:15
 * @Last Modified by: jdf
 * @Last Modified time: 2018-06-01 11:10:10
 * jpush 初始化jpush监听
 * 统一全部跳转到消息中心
 */
// import router from './../../routers'
import store from './../../vuex/store.js'
function initJpush (router) {
  // 初始化极光推送
  window.utils.native.initJPush(window.globalConfig.isDebug)
  // 监听收到的消息
  document.addEventListener('jpush.openNotification', function (event) {
    console.log('jpush.openNotification', event)
    // dealMsg(event)
    // android ios返回不一致 分开处理
    if (window.globalConfig.os === 'android' && event.extras != null && event.extras.msgId != null && event.extras.msgId != '') {
      store.commit('HAS_NOTICE', '')
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.notification) {
        window.cordova.plugins.notification.badge.set(0)
      }
      router.push({name: 'noticeDetail', params: {noticeId: event.extras.msgId}})
    } else if (window.globalConfig.os != 'android' && event.msgId != null && event.msgId != '') {
      store.commit('HAS_NOTICE', '')
      window.utils.native.setApplicationIconBadgeNumber(0)
      router.push({name: 'noticeDetail', params: {noticeId: event.msgId}})
    }
  }, false)
  // 应用程序处于前台时收到推送会触发该事件
  document.addEventListener('jpush.receiveNotification', function (event) {
    console.log('jpush.receiveNotification', event)
    dealMsg(event)
  }, false)
  // 应用程序处于后台时收到推送会触发该事件
  document.addEventListener('jpush.backgroundNotification', function (event) {
    console.log('jpush.backgroundNotification', event)
    dealMsg(event)
  }, false)
  document.addEventListener('jpush.receiveMessage', function (event) {
    console.log('jpush.receiveMessage', event)
    dealMsg(event)
  }, false)

  // 安卓返回按钮
  // document.addEventListener('backbutton', function () {
  //   window.history.back()
  // }, false)
}
/**
 * @name 处理返回的数据
 * @event 推送数据
 */
function dealMsg (event) {
  // let alertContent = event.aps.alert || event.alert
  // window.utils.ui.toast(alertContent)
  // 存储推送信息
  // window.utils.cache.set('NOTICE', event)
  store.commit('HAS_NOTICE', event)
  // window.utils.cache.get('NOTICE')
  // android 添加角标
  if (window.utils.cache.get('NOTICE_NUM') == null || window.utils.cache.get('NOTICE_NUM') == '') {
    window.utils.cache.set('NOTICE_NUM', 0)
  }
  var num = parseInt(window.utils.cache.get('NOTICE_NUM')) + 1
  window.utils.cache.set('NOTICE_NUM', num)
  if (window.cordova && window.cordova.plugins && window.cordova.plugins.notification) {
    window.cordova.plugins.notification.badge.set(num)
  }
  // window.utils.ui.dialog(alertContent, {confirmButtonText: '前往查看', cancelButtonText: '取消', closeOnClickModal: false}).then(action => {
  //   router.replace({name: 'notice'})
  // }).catch(error => {
  //   console.log('客户选择了关闭')
  //   // 当客户选择了关闭的时候
  //   window.utils.cache.removeItem('NOTICE')
  // })
}

const jpush = {
  initJpush,
  dealMsg
}
export default jpush
