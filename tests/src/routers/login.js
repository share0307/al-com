/*
 * @Author: aliang 
 * @Date: 2018-11-19 17:21:42 
 * @Last Modified by: 
 * @Last Modified time: 2018-11-20 16:27:36
 */

const login = r => require.ensure([], () => r(require('@/views/login/Login.vue')),undefined, 'login')
// const resetPwd = r => { require.ensure([], () => (require('../views/login/ResetPwd.vue'))) }
// const register = r => { require.ensure([], () => (require('../views/login/Register.vue'))) }
// const access = r => { require.ensure([], () => (require('../views/login/Access.vue'))) }
// 每个模块定义父路由 引入公共样式方法...
export default [{
  name: 'login',
  path: '/login',
  component: login,
  // component: () => import('../views/login/Login.vue'),
  meta: {
    title: '登陆',
    login: false,
    footer: false
  }
},
// {
//   name: 'resetPwd',
//   path: '/resetPwd',
//   component: resetPwd,
//   meta: {
//     title: '重置密码',
//     login: false,
//     footer: false
//   }
// }, {
//   name: 'register',
//   path: '/register/:id',
//   component: register,
//   meta: {
//     title: '注册',
//     login: false,
//     footer: false
//   }
// }, {
//   name: 'access',
//   path: '/access/:id',
//   component: access,
//   meta: {
//     title: '正在跳转...',
//     login: false,
//     footer: false
//   }
// }
]
