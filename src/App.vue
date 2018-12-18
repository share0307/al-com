<template>
  <div id="app">
    <transition :name="transitionName">
      <navigation>
        <router-view v-wechat-title='$route.meta.title' v-if="isRouterAlive" class="router-view"></router-view>
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
  name: 'App',
  provide(){
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      transitionName: '',
      isRouterAlive: true,
    }
  },
  methods: {
    //页面重载--用于页面不做跳转但是需要重渲染页面的情况（实现原理：利用v-if重新渲染）
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  },
  computed: {
  },
  mounted () {
    this.$navigation.on('forward', (to, from) => {
      console.log('%c forward','color:green;',to)
      console.log('%c forward','color:green;',from)
      this.transitionName = (window.globalConfig.animation && (to.route.meta.transition || from.route.meta.transition)?('slide-in'):'')
    })
    this.$navigation.on('back', (to, from) => {
      console.log('%c back','color:green;',to)
      console.log('%c back','color:green;',from)
      this.transitionName = (window.globalConfig.animation && (to.route.meta.transition || from.route.meta.transition)?('slide-out'):'')
    })
    console.log('%c appvue','color:green;','appvue');
  }
}
</script>
