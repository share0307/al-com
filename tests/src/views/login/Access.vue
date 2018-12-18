<template>
    <div class='page_access'>
    </div>
</template>

<script>
/**
  此处为统一跳转页面，当第三方需要调用我们系统的时候，可以根据以下配置进行
  吉小微需要调用吉意宝页面时，吉小微需要请求类似地址：http://tjiyibao.jxlife.com.cn/dep/#/access/参数串（不同环境真实地址再另行告知），参数串如下：
  {
    "params": {
        "callback": "回调地址",
        "customParam": "string格式(可以为JSON串，自动识别),需要根据具体页面来约定页面级参数",
        "fromChannel": "请求来源渠道",
        "openId": "微信ID",
        "systemId": "系统标识",
        "timestamp": "访问时间戳",
        "uuid": "请求UUID",
        "visitType": "访问类型",
        "redirectUrl": "请求映射代码，重定向的路由标志"，// eg: clockIn 签到打卡
        "visitPersonCode": "" // 用于判断是哪个用户执行的操作
    },
    "signStr": "签名串"
  }
 */
import Base64 from '../../../static/lib/security/base64.js'
// import md5 from 'js-md5'
export default {
  name: 'access',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
    // base64加密会出现/的存在 所以在加密的时候会将加密的串替换成window.globalConfig.shareReplaceStr
    let paramStr = this.$route.params.id.replace(new RegExp('' + window.globalConfig.shareReplaceStr + '', 'g'), '/')
    // 加密参数
    let param = JSON.parse(Base64.decode(paramStr))
    // 无状态跳转
    this.$router.replace({name: param.params.redirectUrl, params: {id: param.params.customParam}})
  }
}
</script>
