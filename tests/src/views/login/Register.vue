<template>
  <n22-page>
    <!-- 公司logo -->
    <div slot="content" class="page_register">
      <!-- 暂时留着，@todu -->
      <!-- <mt-button class="toLogin" size='small'>去登陆</mt-button> -->

      <div class="userMsg pd-md">
        <img src="./../../../static/images/login/register_header.png" alt="">
        <!-- 登录注册 :hasIcon="true"-->
        <n22-input v-model="registerModal.userName"  :form.sync="validateObj.userName"   :validator="ruleObj.userName" hintText="请输入您的真实姓名"></n22-input>
        <n22-input v-model="registerModal.loginCode" type='tel' :form.sync="validateObj.loginCode"  :validator="ruleObj.loginCode" hintText="请输入11位手机号码"></n22-input>
        <n22-input v-model="registerModal.loginPwd"  :form.sync="validateObj.loginPwd"   :validator="ruleObj.loginPwd"  type="password" hintText="请设置新密码，至少六位数（数字，字母）"></n22-input>
        <n22-input v-model="registerModal.loginPwdCheck"  :form.sync="validateObj.loginPwdCheck"  :validator="ruleObj.loginPwdCheck"  type="password" hintText="请再次填写密码，至少六位数（数字，字母）"></n22-input>
        <div class="yzm">
          <n22-input  v-model="registerModal.random" type='tel' :form.sync="validateObj.random"   :validator="ruleObj.random"   hintText="请输入验证码"></n22-input>
          <mt-button @click.native="getRandom()" :disabled='!validateObj.loginCode.status || btn_disabled' class=" primary-bg" size="small">{{btn_yzm}}</mt-button>
        </div>
      </div>

      <!-- 分割线 -->
      <div class="divider_line"></div>

      <!-- 推荐人信息区域 -->
      <div style="min-height:100px;">
        <div class="info_referee pd-md" v-show="agentInfo.personCode">
          <n22-field :label="'推荐人工号'"  >
            <span slot="right">{{agentInfo.personCode | nullFilter}}</span>
          </n22-field>

          <n22-field :label="'推荐人职级'"  >
            <span slot="right">{{agentInfo.rankCode | nullFilter}}</span>
          </n22-field>

          <n22-field :label="'推荐人姓名'"  >
            <span slot="right">{{agentInfo.personName | nullFilter}}</span>
          </n22-field>

          <n22-field :label="'推荐人机构'"  >
            <span slot="right">{{agentInfo.orgName | nullFilter}}</span>
          </n22-field>
        </div>
      </div>

      <!-- 按钮区域 -->
      <div class="btn_area pd-md">
        <mt-button :disabled = '!isPass' @click.native="register()" class="lg_btn primary-bg" size="large">下一步,性向测试</mt-button>
        <div @click="go('login')" class="login">已有账户，去登录</div>
      </div>
    </div>
  </n22-page>
</template>

<script>
import md5 from 'js-md5'
// import DES3 from './../../../static/lib/security/DES3.js'
import commonHandler from '../../handlers/commonHandler'

export default {
  name: 'register',
  components: {
  },
  data () {
    return {
      btn_yzm: '获取验证码',
      btn_disabled: false,
      agentInfo: {},
      registerModal: {
        userName: '', // 用户名
        sourceType: 'RZ', // 注册来源 RZ自助入司;ZM招募
        loginCode: '', // 手机号码
        random: '', // 手机验证码
        loginPwd: '',
        loginPwdCheck:'',
        longitude: '',
        latitude: ''
      },
      // 规则对象配置
      ruleObj: {
        userName: {
          rules: ['require:请输入您的名字']
        },
        loginCode: {
          rules: ['require:请输入手机号', 'mobile:手机号码不正确']
        },
        loginPwd: {
          rules: ['require:请输入密码', 'pwd:密码格式不正确']
        },
        loginPwdCheck: {
          rules: ['require:请输入密码', 'pwd:密码格式不正确']
        },
        random: {
          rules: ['require:请输入验证码', 'numberStr:验证码有误']
        }
      },
      // 验证对象
      validateObj: {
        userName: {},
        loginPwd: {},
        loginPwdCheck: {},
        loginCode: {},
        random: {}
      }
    }
  },
  methods: {

    /**
     * @name 获取推荐人信息
     */
    getRefereeInfo (agentCode) {
      let req = {
        loginCode: '',
        agentCode: agentCode
      }
      window.utils.http
        .post(window.utils.htag.agentInfo, req)
        .then(response => {
          this.agentInfo = response.data.agent
        })
    },

    /**
     * @name 获取验证码
     */
    getRandom () {
      let req = {
        loginCode: this.registerModal.loginCode,
        functionCode: 'REGISTERED'
      }
      window.utils.http
        .post(window.utils.htag.sendMsg, req)
        .then(response => {
          // 验证码计时
          window.utils.ui.toast('发送成功')
          this.countdown()
        })
    },

    /**
     * @name 注册接口
     */
    register () {

      if (!this.checkSame()) return

      let paramReq = Object.assign({}, this.registerModal)
      paramReq.loginPwd = md5(this.registerModal.loginPwd)
      // 塞入推荐人code
      // if (this.agentInfo.personCode) {
      paramReq.customList = {
        custom: []
      }
      // recommendCode 推荐人工号
      // organId 机构代码
      // subChannel子渠道
      // channel渠道
      paramReq.customList.custom.push({
        key: 'recommendCode',
        value: this.agentInfo.personCode || ''
      })

      for (let key in this.agentInfo) {
        let item = {
          key: key,
          value: this.agentInfo[key]
        }
        paramReq.customList.custom.push(item)
      }
      // }
      // 注册用户
      // 获取经纬度并发送到后台
      window.utils.native.getCurrentPosition().then(success => {
        paramReq.longitude = success.longitude
        paramReq.latitude = success.latitude
        // 注册用户
        this.registerUser(paramReq)
      }).catch(error => {
        // window.utils.ui.toast('获取当前地址失败')
        this.registerUser(paramReq)
      })
    },
    /**
     * @name 注册用户发送请求
     */
    registerUser (req) {
      window.utils.http
          .post(window.utils.htag.register, req)
          .then(response => {
            // 处理返回信息
            commonHandler.dealUserMsg(response)
            // 在app内部才跳转到首页
            if (window.globalConfig.platform === 'native') {
              this.$router.push({name: 'home'})
            } else {
              // 跳转到性向测试
              this.$router.push({name: 'trainExam'})
            }
          })
    },
    /**
     * @name 验证码倒计时
     */
    countdown () {
      let startTime = new Date(), time = 1
      if (timeInterval) clearInterval(timeInterval)
      let timeInterval = setInterval(e => {
        this.btn_disabled = true
        // this.time--;
        ;(time = 60 - parseInt((new Date() - startTime) / 1000))
        this.btn_yzm = '（' + time + 's）'
        if (time <= 0) {
          this.btn_disabled = false
          this.btn_yzm = '获取验证码'
          clearInterval(timeInterval)
        }
      }, 1000)
    },
    checkSame () {
      console.log(this.registerModal.loginPwd +"-"+ this.registerModal.loginPwdCheck)
      if (this.registerModal.loginPwdCheck != '' && this.registerModal.loginPwd != this.registerModal.loginPwdCheck){
        window.utils.ui.toast('两次密码输入不一致')
        return false
      }
      else {
        return true
      }
    }
  },
  mounted () {
    // 获取推荐人信息
    // 当值为no时候代表没有推荐人
    if (this.$route.params.id !== 'no') {
      let param = JSON.parse(this.$route.params.id)
      this.agentInfo = param
      console.log('页面传参', param)
      // this.getRefereeInfo(this.$route.params.id)
      // this.agentInfo.personCode = this.$route.params.id
    }
  },
  computed: {
    // 判断是否通过规则
    isPass: vm => {
      for (const key in vm.validateObj) {
        if (!vm.validateObj[key].status) {
          return false
        }
      }
      return true
    }
  }
}
</script>

<style lang="scss">
@import './../../assets/css/vars';
.page_register{
  img{
    width: 100%;
    // margin-top: 4rem;
  }
  .toLogin{
    position: absolute;
    right: 10px;
    top: 10px;
    border: none;
    background: none;
  }
  .img_icon{
    width: 1.5rem!important;
    margin-left: 0px!important;
  }
  .va_ipt{
    margin-top: $mg-lg;
    border-bottom: 1px solid $divider-color;
    &:last-of-type{
      border: none;
    }
    .line{
      bottom: -15px!important;
    }
  }
  .no_border{
    border: none;
  }

  .yzm{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .va_ipt{
      flex: 1.5;
    }
    .primary-bg{
      color: $primary-color;
      background-color: rgb(255, 255, 255);
      border: none;
      box-shadow: 0px 0px 0px white;
      border-left: 1px solid rgb(0, 0, 0);
      border-radius: 0px;
      height: 40px;
      margin-top: 20px;
      flex: 1;
    }
  }
  .info_referee{
    color: $emphasize-color;
    .input_field{
      padding-left: 0px;
    }
  }
  // 底部按钮区域
  .btn_area{
    text-align: center;
    div{
      font-size: $font-md;
      margin: $mg-md;
      color: $emphasize-color;
    }
  }
}
</style>
