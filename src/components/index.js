/* eslint comma-dangle: ["error", "always-multiline"] */

// 组件引入
import { warn } from './_util'
import AllHead from './all-head'
import HomeHead from './home-head'
import Content from './content'
import Foot from './foot'
/* @init<%import ${componentNameUpper} from './${componentName}'%> */

// 全量引入提醒
warn(
    'You are using a whole package of al-mobile, ' +
    'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.',
    'warn',
)

/* global AL_VERSION */
// const version = /* @echo MAN_VERSION */
const version = '0.1.0'

// 单个组件暴露
export const components = {
    AllHead,
    HomeHead,
    Content,
    Foot,
    /* @init<%${componentNameUpper},%> */
}

// 定义插件安装方法
const install = function (Vue) {
    if (!Vue || install.installed) {
        return
    }
    const componentsNames = Object.keys(components)
    componentsNames.forEach(name => {
        const component = components[name]
        component.name && Vue.component(component.name, component)
    })

    // 全局服务注入
    //   Vue.prototype.$toast = Toast
    //   Vue.prototype.$dialog = Dialog
    //   Vue.prototype.$actionsheet = ActionSheet
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

// 集合组件暴露
export {
    install,
    version,
    AllHead,
    HomeHead,
    Content,
    Foot,
    /* @init<%${componentNameUpper},%> */
}

export default {
    install,
    version,
}
