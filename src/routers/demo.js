import demo from '@/views/demo/demo'
import home from '@/views/demo/mescroll/home'
import listNews from '@/views/demo/mescroll/base/list-news'
import mescrollOptions from '@/views/demo/mescroll/base/mescroll-options'
import listProducts from '@/views/demo/mescroll/base/list-products'
import mescrollComponent from '@/views/demo/mescroll/base/mescroll-component'
import mescrollMore from '@/views/demo/mescroll/base/mescroll-more'
import mescrollSwiperNav from '@/views/demo/mescroll/base/mescroll-swiper-nav'

export default [{
    name: 'demo',
    path: '/demo',
    component: demo,
    children: [
        {
            name: 'mescroll',
            path: 'mescroll',
            component: home,
            children: [{
                    path: 'listNews',
                    name: 'listNews',
                    component: listNews
                }, {
                    path: 'mescrollOptions',
                    name: 'mescrollOptions',
                    component: mescrollOptions
                }, {
                    path: 'listProducts',
                    name: 'listProducts',
                    component: listProducts
                }, {
                    path: 'mescrollComponent',
                    name: 'mescrollComponent',
                    component: mescrollComponent
                }, {
                    path: 'mescrollMore',
                    name: 'mescrollMore',
                    component: mescrollMore
                }, {
                    path: 'mescrollSwiperNav',
                    name: 'mescrollSwiperNav',
                    component: mescrollSwiperNav
                }
            ]
        },
    ]
}]
