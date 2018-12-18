<template>
    <div>
      <van-pull-refresh 
        :head-height="vanPullRefresh.headHeight"
        v-model="showLoading"
        @refresh="onRefresh"
        >
        <div slot="normal">
          <div style="height:100px;"><pull-loading></pull-loading></div>
        </div>
        <div style="height:100px;" slot="pulling">
          <div style="height:100px;"><pull-loading></pull-loading></div>
        </div>
        <div style="height:100px;" slot="loosing">
          <div style="height:100px;"><pull-loading></pull-loading></div>
        </div>
        <div style="height:100px;" slot="loading">
            <div style="height:100px;"><pull-loading></pull-loading></div>
        </div>
        <div style="background-color:white;">
          <!-- 头部 -->
          <al-home-head :opacityStyle='opacityStyle' signin-up='msite'>
            <router-link :to="'/search/geohash'" class="link_search" slot="search">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
                <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
              </svg>
            </router-link>
            <router-link to="/home" slot="msite-title" class="msite_title">
              <span class="title_text ellipsis">{{msiteTitle}}</span>
            </router-link>
          </al-home-head>
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
              <div :style="{ 'background-color': image.color, height: '200px' }">xxxxx</div>
              <!-- <img v-lazy="image" /> -->
            </van-swipe-item>
          </van-swipe>
           <!-- 公告 -->
          <div>
            <van-notice-bar
              text="欢迎使用公告栏处理公告数据，欢迎使用公告栏使用公告数据！"
              :left-icon=licon
            />
          </div>
          <div v-show="foodTypes.length">
            <nav class="msite_nav">
              <div class="swiper-container" v-if="foodTypes.length">
                <van-swipe :show-indicators="true">
                  <van-swipe-item class="swiper-slide food_types_container" v-for="(item, index) in foodTypes" :key="index">
                    <div @click="homemenuGo" v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
                      <figure class="al_figure">
                        <img v-lazy="imgBaseUrl + foodItem.image_url">
                        <!-- <img :src="imgBaseUrl + foodItem.image_url"> -->
                        <figcaption>{{foodItem.title}}</figcaption>
                      </figure>
                    </div>
                  </van-swipe-item>
                </van-swipe>
                <div class="swiper-pagination"></div>
              </div>
              <img src="../../assets/images/fl.svg" class="fl_back animation_opactiy" v-else>
            </nav>
            <div class="shop_list_container">
              <header class="shop_header">
                <svg class="shop_icon">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
                </svg>
                <span class="shop_header_title">产品</span>
              </header>
              <shop-list v-if="hasGetData||true" :geohash="geohash"></shop-list>
            </div>
          </div>
          <loading v-show="!foodTypes.length"></loading>
        </div>
      </van-pull-refresh>
    	<al-foot></al-foot>



      <!-- 其他区域(广告...) -->
      <md-landscape v-model="showPic" :mask-closable=true>
        <img src="//manhattan.didistatic.com/static/manhattan/do1_6VL7HL8TYaUMsIfygfpz">
      </md-landscape>
    </div>    
</template>

<script>
import { mapMutations } from "vuex";
// import {imgBaseUrl} from 'src/config/env'
// import headTop from "@/components/header/firHead.vue"
// import footGuide from "@/components/footer/footGuide.vue"

import { HomeHead, Foot } from "@/components";
import shopList from '@/components/common/shoplist'
import {
  msiteAddress,
  msiteFoodTypes,
  cityGuess,
  homeMenu
} from "@/service/getData";

import { Swipe, SwipeItem, NoticeBar, PullRefresh, } from "vant";
import {Landscape, } from 'mand-mobile'
import loading from "@/components/common/loading";
import pullLoading from "@/components/common/pullLoading";

export default {
  components: {
    [HomeHead.name]: HomeHead,
    shopList,
    loading,
    pullLoading,
    [Foot.name]: Foot,
    [PullRefresh.name]: PullRefresh,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [NoticeBar.name]: NoticeBar,
    [Landscape.name]: Landscape,
  },
  data() {
    return {
      licon: require("@/assets/images/common/notice_bar_left_icon.png"),
      vanPullRefresh:{//下拉刷新组件
        headHeight: 400
      },
      showAbs: true,
      opacityStyle: {
        opacity: 0
      },
      images: [
        {
          color: 'red',
        },
        {
          color: 'blue',
        },
        {
          color: 'yellow',
        },
      ],
      showPic:true,
      geohash: "", // city页面传递过来的地址geohash
      msiteTitle: "请选择地址...", // msite页面头部标题
      foodTypes: [], // 食品分类列表
      hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
      showLoading: false, //
      imgBaseUrl: "https://fuss10.elemecdn.com" //图片域名地址
    };
  },
  async beforeMount() {
    if (!this.$route.query.geohash) {
      const address = await cityGuess();
      this.geohash = address.latitude + "," + address.longitude;
    } else {
      this.geohash = this.$route.query.geohash;
    }
    //保存geohash 到vuex
    // this.SAVE_GEOHASH(this.geohash);
    //获取位置信息
    let res = await msiteAddress(this.geohash);
    this.msiteTitle = res.name;
    // 记录当前经度纬度
    // this.RECORD_ADDRESS(res);

    this.hasGetData = true;
  },
  mounted() {
    this.init()
  },
  computed: {},
  activated(){
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapMutations(["RECORD_ADDRESS", "SAVE_GEOHASH"]),
    handleScroll(){
      const top = document.documentElement.scrollTop;
      if (top > 60) {
        let opacity = top / 140;
        opacity = opacity > 1 ? 1 :opacity;
        this.opacityStyle = {opacity};
        this.showAbs = false;
        console.log("%c 6000000000000000","color:blue;",top)
      } else {
        this.showAbs = true;
        console.log("%c xxxxxxxxxxxxxxxxx","color:red;",top)
      }
      // document.documentElement.scrollTop 表示页面滚动的距离
      console.log(document.documentElement.scrollTop);
    },
    homemenuGo(){
      this.$router.push("/insured")
    },
    init(){
      this.homeMenu()
    },
    homeMenu(){
      homeMenu(this.geohash)
      .then(res => {
        console.log('%c homeMenu数据返回成功','color:green;',res);
        let resLength = res.length;
        let resArr = [...res]; // 返回一个新的数组
        let foodArr = [];
        for (let i = 0, j = 0; i < resLength; i += 8, j++) {
          foodArr[j] = resArr.splice(0, 8);
        }
        this.foodTypes = foodArr;
        this.showLoading = false;
      },error => {
        console.log('%c err','color:green;',error);
        this.showLoading = true;
      });
    },
    onRefresh() {
      this.homeMenu()
    },
    // 解码url地址，求去restaurant_category_id值
    getCategoryId(url) {
      let urlData = decodeURIComponent(
        url.split("=")[1].replace("&target_name", "")
      );
      if (/restaurant_category_id/gi.test(urlData)) {
        return JSON.parse(urlData).restaurant_category_id.id;
      } else {
        return "";
      }
    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.al_figure{
  margin: 8px 10px;
}
.link_search {
  left: 18.8px;
  @include wh(21.1px, 21.1px);
  @include ct;
}
.msite_title {
  @include center;
  width: 50%;
  color: #fff;
  text-align: center;
  margin-left: -11.7px;
  .title_text {
    @include sc(18.8px, #fff);
    text-align: center;
    display: block;
  }
}
.head_gg{
  padding-top: 49.2px;
}
.msite_nav {
  // padding-top: 49.2px;
  background-color: #fff;
  border-bottom: 0.6px solid $bc;
  // height: 248.4px;
  .swiper-container {
    @include wh(100%, auto);
    padding-bottom: 14.1px;
    .swiper-pagination {
      bottom: 4.7px;
    }
  }
  .fl_back {
    @include wh(100%, 100%);
  }
}
.food_types_container {
  display: flex;
  flex-wrap: wrap;
  .link_to_food {
    width: 25%;
    // padding: 0.3rem 0rem;
    @include fj(center);
    figure {
      img {
        margin-bottom: 7px;
        @include wh(40px, 40px);
      }
      figcaption {
        text-align: center;
        @include sc(12.9px, #666);
      }
    }
  }
}
.shop_list_container {
  margin-top: 9.4px;
  border-top: 0.6px solid $bc;
  background-color: #fff;
  .shop_header {
    .shop_icon {
      fill: #999;
      margin-left: 14.1px;
      vertical-align: middle;
      @include wh(14.1px, 14.1px);
    }
    .shop_header_title {
      color: #999;
      @include font(12.9px, 37.5px);
    }
  }
}
</style>

<style lang="stylus">
.md-landscape
  .content
    position relative
    min-width 270px
    min-height 250px
    font-size 14px
    text-align center
    border-radius 4px
    background-color white
    >img
      width 100%
      height 100%
      display block
    &.scroll
      max-height 350px
      overflow-y scroll
  .close
    position fixed
    z-index 1000
    left 0
    right 0
    bottom 10%
    width 20px
    margin 0 auto
    color color-text-base-inverse
    &.dark
      color color-text-base
</style>
