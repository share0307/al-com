/*
* @Author: aliang
* @Date: 2018-07-26 16:17:56
 * @Last Modified by: 
 * @Last Modified time: 2018-12-18 19:32:31
* @desc mock虚拟数据接口--虚拟后台接口
*/
import axios from 'axios'
import Mock from 'mockjs'
import menu from '../../static/mock/data/test.json'

// 引入mockjs
// const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
//虚拟数据请求时间ms
Mock.setup({
    timeout: 1000
})
// Mock.mock( url, post/get , 返回的数据)//例子请求方式
//虚拟登录请求接口
Mock.mock('/mock/menu', 'get', menu)

export default {
  Mock:Mock,
}