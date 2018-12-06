<template>
  <n22-page class="page_reset_pwd">
    <mt-header slot="header" :fixed="true" title="忘记密码">
        <mt-button @click.native = "back('login')"  slot="left" icon="back"></mt-button>
    </mt-header>

    <div slot="content">
      <!-- 公司logo -->
      <div class="content">
        <!-- 登录注册 :hasIcon="true"-->
        <n22-input v-model="resetModel.mobilePhone"
            type="tel"
            :form.sync="validateObj.mobilePhone" :validator="ruleObj.mobilePhone"
            hintText="请输入您的手机号"></n22-input>

        <n22-input v-model="resetModel.password"
           :form.sync="validateObj.password" :validator="ruleObj.password"
           type="password" hintText="请输入新密码，至少六位数（数字，字母）"></n22-input>

        <n22-input v-model="resetModel.comfirmPwd"
           :form.sync="validateObj.comfirmPwd" :validator="ruleObj.comfirmPwd"
            type="password" hintText="确认密码"></n22-input>

        <div class="yzm">
          <n22-input v-model="resetModel.code"
           type="tel"
           :form.sync="validateObj.code" :validator="ruleObj.code"
           hintText="请输入验证码"></n22-input>
          <mt-button @click.native="getRandom()" class=" primary-bg" size="small">{{btn_yzm}}</mt-button>
          <!-- <mt-button @click.native="login()" :disabled ="true" class=" primary-bg" size="small">获取验证码</mt-button> -->
        </div>
        <mt-button :disabled = "!isPass"  @click.native="resetPwd()" class="lg_btn primary-bg" size="large">确认</mt-button>
      </div>
    </div>
  </n22-page>
</template>

<script>
import md5 from 'js-md5'
import commonHandler from './../../handlers/commonHandler.js'
export default {
  name: 'ResetPwd',
  data () {
    return {
      btn_yzm: '获取验证码',
      btn_disabled: false,
      resetModel: {
        mobilePhone: '',
        flag: '2', // 1代表修改密码 2 是忘记密码
        oldPassword: '', // 旧密码
        password: '', // 新密码
        comfirmPwd: '', // 确认密码
        code: ''
      },
      ruleObj: {
        mobilePhone: {
          rules: ['require:请输入手机号码', 'mobile:手机号码格式不正确']
        },
        code: {
          rules: ['require:请输入验证码', 'numberStr:验证码有误']
        },
        password: {
          rules: ['require:请输入密码', 'pwd:密码格式不正确']
        },
        comfirmPwd: {
          rules: ['require:请输入密码', 'pwd:密码格式不正确']
        }
      },
      // 验证对象
      validateObj: {
        code: {},
        mobilePhone: {},
        password: {},
        comfirmPwd: {}
      }
    }
  },
  methods: {
     /**
     * @name 获取验证码
     */
    getRandom () {
      if (this.resetModel.mobilePhone == '') {
        window.utils.ui.toast('请输入手机号')
        return
      }
      let req = {
        loginCode: this.resetModel.mobilePhone,
        functionCode: 'FINDPWD'
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
     * @name 修改密码
     */
    resetPwd () {
      if (!this.checkRule()) return
       // 重新生成登陆请求对象
      let paramReq = Object.assign({}, this.resetModel)
      for (const key in paramReq) {
        if (key === 'oldPassword' || key === 'password' || key === 'comfirmPwd') paramReq[key] = md5(paramReq[key])
      }
      // 调用后台接口
      window.utils.http
        .post(window.utils.htag.changePwd, paramReq)
        .then(response => {
          commonHandler.loginOut(false)
          window.utils.ui.toast('密码重置成功，请重新登录!')
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
    // 规则校验
    checkRule () {
      if (this.resetModel.password != this.resetModel.comfirmPwd) {
        window.utils.ui.toast('两次密码输入不一致')
        return false
      }
      return true
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
.page_reset_pwd{

  .lg_img{
    width: 100%;
    margin-top: 4rem;
  }

  .content{
    margin: $mg-md;
    .img_icon{
      width: 1.5rem!important;
      margin-left: 0px!important;
    }
    .va_ipt{
      margin-top: $mg-md;
      border-bottom: 1px solid $divider-color;
    }
    .lg_btn{
      margin-top: 5.5rem;
    }
    .yzm{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .va_ipt{
        flex: 1.5;
      }
      .primary-bg{
        background-color: rgb(255, 255, 255);
        color: $primary-color;
        border: none;
        box-shadow: 0px 0px 0px white;
        border-left: 1px solid rgb(0, 0, 0);
        border-radius: 0px;
        height: 19px;
        flex: 1;
      }
    }
  }
}
</style>
