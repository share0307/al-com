// 定义私有变量
import axios from 'axios'
import store from '../vuex/store'
import DES3 from './../../static/lib/security/DES3.js'
import hexHmacMd5 from './../../static/lib/security/md5-min.js'
import router from './../routers'
let instance = axios.create({
  timeout: window.globalConcifg ? window.globalConcifg.timeout : 40000,
  method: 'post',
  headers: {
    post: {
      'Content-Type': 'text/plain'
    }
  }
})
// let loadingCount = 0

/**
 * @description 当请求异常，网络异常,返回异常时候进行提示
 * @param {*} errMsg 错误提示
 */
function showError (errMsg = '网络异常,请检查网络！') {
  window.utils.ui.closeLoadding()
  if (!store.state.common.disabledToast) {
    window.utils.ui.toast(errMsg)
  }
  // store.commit('LOADING', { loading: false })
  // 修改为初始化状态
  store.commit('LOADING_DISABLED', false)
  store.commit('TOAST_DISABLED', false)
}

/**
 * 对象转化为后台接收对象 分布保存接口
 * @param {*} obj
 */
function toParams (obj) {
  // 判断是否为后台对象
  let list = []
  for (const key in obj) {
    let tempObj = {}
    tempObj.fieldId = obj[key].id
    tempObj.fieldCode = obj[key].fieldCode
    tempObj.fieldValue = obj[key].value
    list.push(tempObj)
  }
  return list
}

/**
 * 后台对象的值转化为map(用于获取数据)
 * @param {*} list
 * @param {*} key
 */
function toMap (list, key = 'fieldId') {
  // 判断是否为后台对象
  if (list && list.constructor == Array) {
    let tempMap = {}
    for (let i = 0; i < list.length; i++) {
      let item = list[i]
      // item.fieldValue = '3213131321'
      tempMap[item[key]] = item
    }
    return tempMap
  }
  return {}
}

/**
 * @name 请求拦截器
 */
instance.interceptors.request.use(config => {
  // 判断是否需要加载框
  if (!store.state.common.loadingDisabled) {
    window.utils.ui.loadding()
  }
  // 包装请求参数
  let req = {
    commonObject: {
      deviceNo: window.device ? window.device.uuid : 'no_app_inside', // 54258025099324604000
      channel: window.globalConfig.os === 'ios' ? 'ios' : 'android',
      openId: '', // oomSRjgR6bU9RXKQ6SrgHgSVbJDk
      tokenCode: window.utils.cache.get('token')
    }
  }
  let params = {
    'packageList': {
      'packages': {
        'header': {
          'requestType': config.url,
          'comId': window.globalConfig.comId,
          'from': window.globalConfig.from,
          'sendTime': new Date().format('yyyy-MM-dd HH:mm:ss'),
          'orderSerial': 'orderId',
          'comSerial': 'comSerial',
          'productCode': window.utils.cache.get('token'),
          'responseCode': '0',
          'asyn': '0'
        },
        request: DES3.encrypt('', JSON.stringify({objects: Object.assign(req, config.data)}).replace(/\s/g, '').replace(/\r\n/g, ''))
      }
    }
  }
  // 封装公共代码区域 @todu
  console.log('数据', DES3.decrypt('', params.packageList.packages.request))
  console.log(JSON.stringify(params))
  let paramStr = JSON.stringify(params)
  let sign = hexHmacMd5.hex_hmac_md5(window.globalConfig.transfer, paramStr)
  let today = new Date().getTime()
  config.url = window.globalConfig.rootUrl + 'interfaceChannel?sign=' + sign + '&com_id=' + window.globalConfig.comId + '&time=' + today
  config.data = paramStr
  console.log('config', config)
  return config
}, error => {
  return Promise.reject({
    isLogicError: false,
    errorMessage: '网络异常,请检查网络！！'
  })
})

/**
 * @name 返回拦截器
 */
instance.interceptors.response.use(response => {
  let responsePayload
  // 关闭loadding框
  window.utils.ui.closeLoadding()
  try {
    // 获取后台返回数据
    let backHeader = response.data.packageList.packages.header
    console.log('%c 返回数据>>>>>>>', 'color:green', response)
    if (backHeader.responseCode === '1900') {
      // 如果返回的为1900 则为登陆失效状态
      showError(backHeader.errorMessage || '登陆失效，请重新登陆')
      // 跳回登陆
      router.push({name: 'login'})
      return Promise.reject({
        isLogicError: true,
        errorMessage: backHeader.errorMessage,
        data: undefined
      })
    } else if (backHeader.responseCode !== '0') {
      // 返回失败的时候统一进行提示
      let errMsg = backHeader.errorMessage || ''
      if (errMsg.indexOf('方法出错。具体原因') >= 0) {
        errMsg = '服务器接口出错'
      }
      // 显示返回错误提示
      showError(errMsg)
      return Promise.reject({
        isLogicError: true,
        errorMessage: errMsg || '网络异常',
        data: undefined
      })
    } else {
      // 重置状态
      store.commit('LOADING_DISABLED', false)
      store.commit('TOAST_DISABLED', false)
      // 成功返回进行解密
      response.data.packageList.packages.response = JSON.parse(DES3.decrypt('', response.data.packageList.packages.response))
      responsePayload = response.data.packageList.packages.response
    }
  } catch (e) {
    console.error(e)
    showError()
    return Promise.reject({
      isLogicError: false,
      errorMessage: '网络异常,请检查网络！！！'
    })
  }
  response.data = responsePayload
  return response
}, error => {
  console.error(error)
  store.commit('TOAST_DISABLED', false)
  showError()
  return Promise.reject({
    isLogicError: false,
    errorMessage: '网络异常,请检查网络！！！！'
  })
})

export default {
  axios: axios,
  toParams, // 将数据转化成后台接口对应
  toMap, // 将后台返回的list转化成map
  post (service, params = {}) {
    console.log('%c 请求数据>>>>>>>', 'color:green', JSON.parse(JSON.stringify(params || {})))
    return instance.post(service, params)
  }
}
