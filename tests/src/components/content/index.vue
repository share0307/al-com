<template>
    <div :class="{al_content:headBottom}">
      <slot name="content"></slot>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "al-content",
  data() {
    return {};
  },
  components: {},
  mounted() {
    //获取用户信息
    // this.getUserInfo();
    // console.log("%c userinfo", "color:green;", this.$store.state.userInfo);
  },
  props: {
    headBottom: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapActions(["getUserInfo"])
  }
};
</script>

<style lang="scss" scoped>
.al_content {
  margin-top: $headTop;
}
</style>
