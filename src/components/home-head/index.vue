<template>
    <div class='head_top' :style="opacityStyle">
        <slot name='logo'></slot>
        <slot name='search'></slot>
        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
            </svg>
        </section>
        <router-link :to="userInfo? '/profile':'/login'" v-if='signinUp' class="head_login">
            <svg class="user_avatar" v-if="userInfo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
            </svg>
            <span class="login_span" v-else>登录|注册</span>
        </router-link>
        <section class="title_head ellipsis" v-if="headTitle">
            <span class="title_text">{{headTitle}}</span>
        </section>
        <slot name="edit"></slot>
        <slot name="msite-title"></slot>
        <slot name="changecity"></slot>
        <slot name="changeLogin"></slot>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "al-home-head",
  data() {
    return {};
  },
  mounted() {
    //获取用户信息
    // this.getUserInfo();
    console.log('%c userinfo','color:green;',this.$store.state.userInfo);
  },
  props: ["signinUp", "headTitle", "goBack","opacityStyle"],
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapActions(["getUserInfo"])
  }
};
</script>

<style lang="scss" scoped>
.head_top {
  background-color: $theme-color;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  @include wh(100%, 45.7px);
}
.head_goback {
  left: 9.4px;
  @include wh(14.1px, 23.4px);
  line-height: 51.6px;
  margin-left: 9.4px;
}
.head_login {
  right: 12.9px;
  @include sc(15.2px, #fff);
  @include ct;
  .login_span {
    color: #fff;
  }
  .user_avatar {
    fill: #fff;
    @include wh(18.8px, 18.8px);
  }
}
.title_head {
  @include center;
  width: 50%;
  color: #fff;
  text-align: center;
  .title_text {
    @include sc(18.8px, #fff);
    text-align: center;
    font-weight: bold;
  }
}
</style>
