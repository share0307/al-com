/*
 * @Author: aliang 
 * @Date: 2018-11-19 17:21:42 
 * @Last Modified by: 
 * @Last Modified time: 2018-12-19 13:38:47
 */

const insured = r => require.ensure([], () => r(require('@/views/insured/Insured.vue')), undefined, 'insured')
const proca = r => require.ensure([], () => r(require('@/views/insured/Proca.vue')), undefined, 'insured')
// 每个模块定义父路由 引入公共样式方法...
export default [{
  name: 'insured',
  path: '/insured',
  component: insured,
  meta: {
    title: '投保',
    login: false,
    transition: true,
    footer: false,
    // scrollToTop: true
  }
},{
  name: 'proca',
  path: '/proca',
  component: proca,
  meta: {
    title: '投保',
    login: false,
    transition: true,
    footer: false
  }
},
]
