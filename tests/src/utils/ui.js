// import store from '../vuex/store'
import { Toast, MessageBox, Indicator } from 'mint-ui'
let scrollTop, bodyCls = 'modal-open'
const ui = {
  /**
   * @name 加载框
   */
  loadding () {
    Indicator.open({
      text: '',
      spinnerType: 'fading-circle'
    })
  },

  /**
   * @name 关闭加载框
   */
  closeLoadding () {
    Indicator.close()
  },

  // 弹出提示
  toast (msg) {
    Toast({
      message: msg,
      position: 'bottom',
      duration: 5000
    })
  },

  // 弹出框提示
  alert (msg, opt) {
    return MessageBox.alert(msg)
  },

  // 对话框提示
  dialog (msg, opt) {
    let promise = new Promise(function (resolve, reject) {
      // 调用cordova 相机插件
      MessageBox(Object.assign({
        message: msg,
        showCancelButton: true
      }, opt)).then(action => {
        if (action === 'cancel') {
          reject()
        } else {
          resolve()
        }
      })
    })
    return promise
    // return MessageBox.confirm(msg)
  },

  // @todo 暂未实现
  popup (title, msg, callback) {

  },
  // 禁止body滚动
  disabledBodyScroll (disabled) {
    // 当为
    // if (window.globalConfig.platform === 'native') {
      // let ele,
      //   eleList = document.getElementsByClassName('scroll_content')
      // // 找到对应的滚动容易并停止滚动
      // if (eleList.length > 0) {
      //   for (let i = 0; i < eleList.length; i++) {
      //     let item = eleList[i]
      //     if (item.className.indexOf('modal') < 0) {
      //       ele = item
      //       break
      //     }
      //   }
      //   // 禁止/启用滚动
      //   if (disabled) {
      //     ele.style['-webkit-overflow-scrolling'] = 'auto'
      //   } else {
      //     setTimeout(() => {
      //       ele.style['-webkit-overflow-scrolling'] = 'touch'
      //     }, 500)
      //   }
      // }
    // } else {
    if (disabled) {
      scrollTop = document.scrollingElement.scrollTop
      document.body.classList.add(bodyCls)
      // document.body.style.top = -scrollTop + 'px'
    } else {
      document.body.classList.remove(bodyCls)
      // scrollTop lost after set position:fixed, restore it back.
      document.scrollingElement.scrollTop = scrollTop
    }
  },

  // 滚动到顶部的方法
  scrollToTop () {
    // if (window.globalConfig.os === 'android') {
    //   document.getElementsByClassName('scroll_content')[0].scrollTop = 0 // platforms.scss scroll_content有设置overflow-y: scroll;时使用
    // } else {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    // }
  }
}
export default ui
