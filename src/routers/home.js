/*
 * @Author: aliang 
 * @Date: 2018-11-19 17:21:42 
 * @Last Modified by: 
 * @Last Modified time: 2018-12-05 14:02:18
 */

const home = r => require.ensure([], () => r(require('@/views/home/Home.vue')), undefined, 'home')
const homefish = r => require.ensure([], () => r(require('@/views/home/HomeFish.vue')), undefined, 'home')
// 每个模块定义父路由 引入公共样式方法...
export default [{
    name: 'home',
    path: '/home',
    component: home,
    // component: () => import('@/views/home/Home.vue'),
    meta: {
        title: '首页',
        login: false,
        transition: false,
        footer: false
    }
},{
    name: 'homefish',
    path: '/homefish',
    component: homefish,
    // component: () => import('@/views/home/HomeFish.vue'),
    meta: {
        title: '首页',
        login: false,
        transition: false,
        footer: false
    }
},
]
