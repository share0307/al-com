//引入axios
import axios from 'axios'
import {baseUrl} from './env'

let instance = axios.create({
  method: 'post',
  timeout: 60000,
  withCredentials: true,
  headers: {
    post: {
      'Content-Type': undefined
    }
  }
})

let cancel ,promiseArr = {}
const CancelToken = axios.CancelToken;
//请求拦截器
instance.interceptors.request.use(config => {
  console.log('%c 请求拦截器','color:green;',config);
    //发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
        promiseArr[config.url]('操作取消')
        promiseArr[config.url] = cancel
    } else {
        promiseArr[config.url] = cancel
    }
    let commonObject = {//新增公共请求
      "tokenCode": window.utils.cache.getSession('token')==null?"testtoken":window.utils.cache.getSession('token'),
      // "deviceType": globalConfig.commonObjectDeviceType+"",
      // "tagChannel": globalConfig.tagChannel,
      // "deviceNo": globalConfig.commonObjectDeviceType=="iwechat"?(new Date().getTime())+"":"app",
      // "openId": "",
    }
    let requestObj = config.data
    requestObj.commonObject = commonObject
    let requestProcessObj = {
      "objects":config.data,
    }
    requestProcessObj.objects.commonObject = commonObject
    if(config.url.requestType == "PROCESSFIELDRULE" || config.url.requestType == "PROCESSPAGESTEPSAVE"
       || config.url.requestType == "LOGIN"){
      requestObj = requestProcessObj
    }
    let params = {
      "packageList": {
        "packages": {
          "header": {
            "UUID":"de98d28c-2824-4476-9d2c-0673a11c5db1",
            "errorMessage":"",
            "productCode":"",
            "responseCode":"",
            "asyn":"0",
            "requestType": config.url.requestType,
            "comId": globalConfig.comIdT,
            "from": globalConfig.from,
            "sendTime": new Date(),
            "orderSerial": "orderId",
            "comSerial": "comSerial"
          },
          // request: DES3.encrypt('', JSON.stringify(config.data)).replace(/\s/g, "")
          request: utils.n22des3.encrypt('',JSON.stringify(requestObj).replace(/\s/g,""))
        }
      }
    }
    let paramStr = JSON.stringify(params)
    let sign = hex_hmac_md5(globalConfig.transfer, paramStr)
    if(config.debug){//是否开启单个接口debug
      console.log('%c mock','color:green;',config);
      config.url = "/mock/menu"
    }else{
      config.url = globalConfig.rootUrl  + sign + '&com_id=' + globalConfig.comIdT
    }
    config.data = paramStr
    console.log(config)
    return config
}, error => {
    return Promise.reject(error)
})

//响应拦截器即异常处理
instance.interceptors.response.use(response => {
    return response
}, err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求'
          break;
        case 401:
          err.message = '未授权，请重新登录'
          break;
        case 403:
          err.message = '拒绝访问'
          break;
        case 404:
          err.message = '请求错误,未找到该资源'
          break;
        case 405:
          err.message = '请求方法未允许'
          break;
        case 408:
          err.message = '请求超时'
          break;
        case 500:
          err.message = '服务器端出错'
          break;
        case 501:
          err.message = '网络未实现'
          break;
        case 502:
          err.message = '网络错误'
          break;
        case 503:
          err.message = '服务不可用'
          break;
        case 504:
          err.message = '网络超时'
          break;
        case 505:
          err.message = 'http版本不支持该请求'
          break;
        default:
          err.message = `连接错误${err.response.status}`
      }
    } else {
      err.message = `连接到服务器失败${err}`
    }
    console.log('%c 接口请求错误','color:red;',err);
    // message.err(err.message)
      return Promise.resolve(err.message)
})

export default {
    get (url,param,debug) {
      url = baseUrl + url;
      return new Promise((resolve,reject) => {
        instance({
          method: 'get',
          url,
          debug:debug,
          data: param,
          cancelToken: new CancelToken(c => {
            cancel = c
          })
        }).then(res => {
          resolve(res.data)
        })
      })
    },
    post (url,param,debug) {
      url = baseUrl + url;
      return new Promise((resolve,reject) => {
        instance({
          method: 'post',
          url,
          debug:debug,
          data: param,
          cancelToken: new CancelToken(c => {
            cancel = c
          })
        }).then(res => {
          resolve(res.data)
        })
      })
     }
  }