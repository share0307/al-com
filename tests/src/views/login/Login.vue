<template>
  <div>
    登陆
  </div>
</template>
<style lang="scss">
</style>

<script>
import md5 from 'js-md5'
import { AllHead, Foot } from "@/components";

export default {
  name: 'login',
  components: {
    AllHead,
    Foot,
},
  data () {
    return {
      isCus: true,
      isNative: window.globalConfig.platform === 'native',
    }
  },
  methods: {
  },
  computed: {
  },
  mounted () {
    console.log('%c ddddddddddddddddddddddddd','color:green;','dddd');
  }
}
</script>
