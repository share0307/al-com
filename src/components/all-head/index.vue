<template>
  <div :class="{al_head:headBottom}">
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      :fixed=true
      :z-index=zIndex
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <slot name="head_bottom">
      
    </slot>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { NavBar } from 'vant';

export default {
  name: "al-all-head",
  computed: {
    // style() {
    //   return {
    //     zIndex: 1000
    //   };
    // }
  },
  data() {
    return {
      zIndex:100,
    };
  },
  components: {
      [NavBar.name]: NavBar,
  },
  mounted() {
    //获取用户信息
    this.getUserInfo();
    console.log("%c userinfo", "color:green;", this.$store.state.userInfo);
  },
  props: {
    headBottom: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapActions(["getUserInfo"]),
    onClickLeft() {
        this.back()
    //   Toast('返回');
    },
    onClickRight() {
      // Toast('按钮');
      this.$router.push("/proca")
    }
  }
};
</script>

<style lang="scss" scoped>
// .van-nav-bar{
//   height: 50px;
// }
.al_head{
  height: $headBottomTop;
}
</style>
