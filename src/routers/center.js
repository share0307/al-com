/*
 * @Author: aliang 
 * @Date: 2018-11-19 17:21:42 
 * @Last Modified by: 
 * @Last Modified time: 2018-11-22 16:18:53
 */

const center = r => require.ensure([], () => r(require('@/views/center/Center.vue')),undefined, 'login')
// 每个模块定义父路由 引入公共样式方法...
export default [{
  name: 'center',
  path: '/center',
  component: center,
  meta: {
    title: '个人中心',
    login: false,
    footer: false
  }
},
]
