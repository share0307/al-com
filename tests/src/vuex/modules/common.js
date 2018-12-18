import utils from '../../utils'
import {
	getUser,
	getAddressList
} from '@/service/getData'

/**
 * 注意
 * token直接存储在storage中 永久缓存
 */
const types = {
  LOADING: 'LOADING',
  // 是否自动提示
  TOAST_DISABLED: 'TOAST_DISABLED',
  RECORD_ADDRESS: 'RECORD_ADDRESS',
  // 是否有底部导航
  SHOW_FOOTER: 'SHOW_FOOTER',
  // 设置proposal对象
  SET_PROPOSAL: 'SET_PROPOSAL',
  // 默认选中tab
  TAB_SELECTED: 'TAB_SELECTED',
  // 获取用户信息
  USE_RINFO: 'USE_RINFO',
  // 设置是否有秦秋loadding
  LOADING_DISABLED: 'LOADING_DISABLED',
  // 设置滚动
  DISABLE_DSCROLL: 'DISABLE_DSCROLL',
  // app版本管理
  APP_VESION: 'APP_VESION',
  // app设备信息
  APP_DEVICE: 'APP_VESION',
  // 消息
  HAS_NOTICE: 'HAS_NOTICE',
  ADD_PRODUCT: 'test'
}

const state = {
  latitude: '39', // 当前位置纬度
	longitude: '116', // 当前位置经度
  userInfo: utils.cache.get('userInfo'),
  // 是否有底部导航
  showFooter: false,
  tabSelected: '1',
  proposal: null,
  loadingDisabled: false,
  // 禁止底部滚动
  disabledScroll: false,
  //
  disabledToast: false,
  // 当前app的版本号
  appVersion: utils.cache.get('appVersion'),
  // 自助入司完善信息模块的对象key
  trainPersonInfo: 'TRAINPERSONINFO',
  // 自动入职合同签订模块的数据
  contactInfo: 'CONTACTINFO',
  // 是否有未读消息
  hasNotice: utils.cache.get('NOTICE'),
  loading:{}
}

const getters = {
  getUser: () => {
    return state.userInfo
  },
  loading: () => {
    return state.loading
  }
}

const actions = {
  add ({
    commit,state
  }, product) {
    commit(types.ADD_PRODUCT, product)
  },
  async getUserInfo({
		commit,state
	}) {
		let res = await getUser();
		commit(types.USE_RINFO, res)
	},
}

const mutations = {
  // 设置加载loadding样式
  [types.LOADING] (state, params) {
    state.loading = params.loading
    state.loadingMsg = params.msg || ''
  },
  // 记录当前经度纬度
	[types.RECORD_ADDRESS](state, {
		latitude,
		longitude
	}) {
		state.latitude = latitude;
		state.longitude = longitude;
	},
  // 设置是否需要loadding
  [types.LOADING_DISABLED] (state, flag) {
    state.loadingDisabled = flag
  },
  // 是否有底部导航
  [types.SHOW_FOOTER] (state, flag) {
    state.showFooter = flag
  },
  // 设置底部导航属于active状态
  [types.TAB_SELECTED] (state, flag) {
    state.tabSelected = flag
  },
  // [types.SET_PROPOSAL] (state, value) {
  //   state.proposal = value
  // },
  [types.TOAST_DISABLED] (state, params) {
    state.disabledToast = params
  },
  // 存储用户信息
  [types.USE_RINFO] (state, params) {
    // 调试模式下存储用户信息入 storage
    utils.cache.setAlways('userInfo', params)
    state.userInfo = params
  },
  // 存储用户信息
  [types.DISABLE_DSCROLL] (state, params) {
    // 调试模式下存储用户信息入 storage
    state.disabledScroll = params
  },
  // app版本号管理
  [types.APP_VESION] (state, params) {
    // 调试模式下存储用户信息入 storage
    state.appVersion = params
  },
  // 消息
  [types.HAS_NOTICE] (state, params) {
    utils.cache.set('NOTICE', params)
    state.hasNotice = params
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
