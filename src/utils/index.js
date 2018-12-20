// import './ext'
// Indicator,
// MessageBox,
// 引入自定义工具类
import cache from './cache'
// import format from './format'
// import validator from './validator'
// import ui from './ui'
// import native from './native'
// import http from './http'
// import wechat from './wechat'

import n22des3 from './N22DES3'

// // 引入接口配置类
// import htag from './../assets/interface/interface'

// if (process.env.NODE_ENV=="development") {
  require('./mock')
// }

/**
 * cache 缓存数据
 * format 日期格式化
 * validator 输入数据验证
 * native 和原生的cordova方法进行交互
 * ui 页面公共弹出框 eg: 确定
 * http 后台请求交互
 * htag 配置后台接口配置参数
 */
const utils = {
  cache,
  n22des3: n22des3,
  // format,
  // validator,
  // native,
  // ui,
  // http,
  // wechat,
  // htag
}

export default utils
