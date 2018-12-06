<template>
  <div id="app">
    <transition :name="transitionName">
      <navigation>
        <router-view class="child-view"></router-view>
      </navigation>
    </transition>
  </div>
</template>

<style lang="scss">
@import './App';
</style>
<script>
import md5 from 'js-md5'
export default {
  name: 'login',
  data () {
    return {
      transitionName: 'transitionName',
    }
  },
  methods: {
  },
  computed: {
  },
  mounted () {
    this.$navigation.on('forward', (to, from) => {
      console.log('%c forward','color:green;',to)
      console.log('%c forward','color:green;',from)
      window.globalConfig.animation && (this.transitionName = 'slide-right')
    })
    this.$navigation.on('back', (to, from) => {
      console.log('%c back','color:green;',to)
      console.log('%c back','color:green;',from)
      window.globalConfig.animation && (this.transitionName = 'slide-left')
    })
    console.log('%c appvue','color:green;','appvue');
  }
}
</script>
