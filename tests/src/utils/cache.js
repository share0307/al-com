/*
 * @Author: aliang 
 * @Date: 2018-11-20 11:10:50 
 * @Last Modified by:    
 * @Last Modified time: 2018-11-20 11:10:50 
 */

const cache = {
  /**
   * @name 存入单个对象或者字符串 一直存在
   */
  setAlways (key, value) {
    if (typeof value === 'string') {
      localStorage.setItem(key, value)
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  },
  /**
   * @name 存入单个对象或者字符串
   * @param key 键
   * @param value 值
   */
  set: (key, value) => {
    if (typeof value === 'string') {
      sessionStorage.setItem(key, value)
    } else {
      sessionStorage.setItem(key, JSON.stringify(value))
    }
  },

  /**
   * @name 获取值
   * @param key
   */
  get: (key) => {
    let value = sessionStorage.getItem(key) || localStorage.getItem(key)
    // 判断是否是字符串对象
    if (value && (value.substr(0, 1) === '{' || value.substr(0, 1) === '[')) {
      try {
        value = eval('(' + value + ')')
      } catch (e) {
        console.error('error in get cache key:' + key + ', value:' + value)
      }
    }
    return value
  },

  /**
   * @name 取值
   * @desc 取完后清空缓存
   * @param key
   */
  getDisposable: (key) => {
    let value = localStorage.getItem(key)
    // 判断是否是字符串对象
    if (value && (value.substr(0, 1) === '{' || value.substr(0, 1) === '[')) {
      try {
        value = eval('(' + value + ')')
      } catch (e) {
        console.error('error in get cache key:' + key + ', value:' + value)
      }
    }
    localStorage.removeItem(key)
    return value
  },

  /**
   * @name 移除缓存中的某项
   * @param key
   */
  removeItem: (key) => {
    localStorage.removeItem(key)
    sessionStorage.removeItem(key)
  },

  /**
   * @name 清除所有的缓存项目 (慎用)
   */
  clear: () => {
    localStorage.clear()
    // localStorage.removeItem()
  }
}

export default cache
