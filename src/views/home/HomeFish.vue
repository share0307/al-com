<template>
    <div>
      <!-- 头部 -->
      <al-home-head v-if="!showAbs" :opacityStyle='opacityStyle' signin-up='msite'>
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


      <!-- content区域 -->
      <!-- <div style="background-color:white;"> -->
        <!--滑动区域 ref='mescroll'不能删, 目的是路由切换时可通过ref调用mescroll-vue组件的beforeRouteEnter方法-->
        <mescroll-vue ref="mescroll" :up="mescrollUp" :down="mescrollDown" @init="mescrollInit">
          <!--模拟的轮播,菜单 可在down.callback中配置刷新轮播数据-->
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
          <!-- 菜单menu -->
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
          </div>
          <loading v-show="!foodTypes.length"></loading>
          <!--筛选条件; 模拟列表的重置和演示空布局的使用-->
          <div class="navv" ref="vtab">
            <van-tabs v-model="pdType" swipeable >
                <van-tab v-for="index in 4" :title="'选项 ' + index" :key="index.id">
                  内容 {{ index }}
                  <!--展示上拉加载的数据列表-->
                  <div class="shop_list_container">
                    <header class="shop_header">
                      <svg class="shop_icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
                      </svg>
                      <span class="shop_header_title">产品</span>
                    </header>
                    <shop-list v-if="hasGetData||true" :geohash="geohash"></shop-list>
                  </div>
                </van-tab>
            </van-tabs>
          </div>
          <!-- <ul id="dataList" class="data-list">
            <li v-for="pd in dataList" :key="pd.id">
              <img class="pd-img" :imgurl="pd.pdImg" src="../../../../../static/mock/img/loading.png"/>
              <p class="pd-name">{{pd.pdName}}</p>
              <p class="pd-price">{{pd.pdPrice}} 元</p>
              <p class="pd-sold">已售{{pd.pdSold}}件</p>
            </li>
          </ul> -->
        </mescroll-vue>
      <!-- </div> -->

      <!-- 不适用的下拉刷新 -->
      <!-- <van-pull-refresh 
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
        //content区域--移到上面，切换为mescroll下拉
      </van-pull-refresh> -->



      <!-- 底部foot -->
    	<al-foot></al-foot>



      <!-- 其他区域(广告...) -->
      <md-landscape v-model="showPic" :mask-closable=true>
        <img @click="godemo()" src="//manhattan.didistatic.com/static/manhattan/do1_6VL7HL8TYaUMsIfygfpz">
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

import { Swipe, SwipeItem, NoticeBar,Tab, Tabs, } from "vant";
// import { PullRefresh, } from "vant";
import {Landscape, } from 'mand-mobile';
import loading from "@/components/common/loading";
import pullLoading from "@/components/common/pullLoading";


// 引入mescroll的vue组件
import MescrollVue from 'mescroll.js/mescroll.vue'
// 模拟数据
import mockData from '../demo/mock/pdlist'

import '../../../static/lib/mescroll/option/mescroll-option.css'

export default {
  components: {
    [HomeHead.name]: HomeHead,
    shopList,
    loading,
    pullLoading,
    [Foot.name]: Foot,
    MescrollVue,
    // [PullRefresh.name]: PullRefresh,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [NoticeBar.name]: NoticeBar,
    [Landscape.name]: Landscape,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
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
      imgBaseUrl: "https://fuss10.elemecdn.com", //图片域名地址
      //以下为mescroll配置
      mescroll: null, // mescroll实例对象
      mescrollUp: {
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 10 // 每页数据的数量
        },
        noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        toTop: {
          src: './static/mescroll/mescroll-totop.png' // 回到顶部按钮的图片路径,支持网络图
        },
        empty: {
          // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才生效;
          warpId: 'dataList', // 父布局的id;
          icon: './static/mescroll/mescroll-empty.png', // 图标,支持网络图
          tip: '暂无相关数据~', // 提示
          btntext: '去逛逛 >', // 按钮,默认""
          btnClick () { // 点击按钮的回调,默认null
            alert('点击了按钮,具体逻辑自行实现')
          }
        },
        lazyLoad: {
          use: true // 是否开启懒加载,默认false
        }
      },
      mescrollDown:{
        auto:false,//是否在初始化完毕之后自动执行下拉回调callback; 默认true
        callback: this.downCallback, //下拉刷新的回调
        offset: 100, //触发刷新的距离
        outOffsetRate: 0.5, //超过指定距离范围外时,改变下拉区域高度比例;小于1,越往下拉高度变化越小;
        htmlContent: '<div class="downwarp-progress"><div><div class="progress-left-arc"></div></div><div><div class="progress-right-arc"></div></div></div><p class="downwarp-tip">下拉即可刷新</p>', //布局内容
        inited: function(mescroll, downwarp) {
          //初始化完毕的回调,可缓存dom
          mescroll.downTipDom = downwarp.getElementsByClassName("downwarp-tip")[0];
          mescroll.downProgressDom = downwarp.getElementsByClassName("downwarp-progress")[0];
          mescroll.downLeftArcDom = downwarp.getElementsByClassName("progress-left-arc")[0];
          mescroll.downRightArcDom = downwarp.getElementsByClassName("progress-right-arc")[0];
          //这里为了演示流畅,提前创建淘宝二楼欢迎页,预先加载好相关图片; 实际项目可按需加载;
          mescroll.taobaoErlouDom = document.createElement("div");
          mescroll.taobaoErlouDom.className = "mescorll-erlou";
          document.body.appendChild(mescroll.taobaoErlouDom); //加在body上,避免加在me.scrollDom在使用硬件加速样式时会使fixed失效
          mescroll.taobaoErlouDom.onclick=function(){//点击隐藏
            mescroll.taobaoErlouDom.classList.remove("mescroll-fade-in");
            mescroll.taobaoErlouDom.classList.add("mescroll-fade-out");
          }
        },
        inOffset: function(mescroll) {
          //进入指定距离范围内那一刻的回调
          mescroll.downTipDom.innerHTML = "下拉即可刷新";
          mescroll.downProgressDom.classList.remove("mescroll-rotate");
          mescroll.downProgressDom.style.display="inline-block";
        },
        outOffset: function(mescroll) {
          //下拉超过指定距离那一刻的回调
          //配置空方法,表示outOffset不做处理 (不可写outOffset:null,否则会执行mescroll默认配置的outOffset方法)
        },
        onMoving: function(mescroll, rate, downHight) {
          //下拉过程中的回调,滑动过程一直在执行; rate下拉区域当前高度与指定距离的比值(inOffset: rate<1; outOffset: rate>=1); downHight当前下拉区域的高度
          if (rate<1) {
            //inOffset
            var progress = 360 * rate;
            if (progress<180) {
              mescroll.downRightArcDom.style.webkitTransform = "rotate(" + (progress+45) + "deg)";
              mescroll.downRightArcDom.style.transform = "rotate(" + (progress+45) + "deg)";
              mescroll.downLeftArcDom.style.webkitTransform = "rotate(45deg)";
              mescroll.downLeftArcDom.style.transform = "rotate(45deg)";
            } else{
              mescroll.downLeftArcDom.style.webkitTransform = "rotate(" + (progress-180+45) + "deg)";
              mescroll.downLeftArcDom.style.transform = "rotate(" + (progress-180+45) + "deg)";
              mescroll.downRightArcDom.style.webkitTransform = "rotate(225deg)";
              mescroll.downRightArcDom.style.transform = "rotate(225deg)";
            }
          } else if(rate<1.5){
            //小于1.5倍offset,
            mescroll.isLockCallback=false;//解除完全自定义下拉刷新
            mescroll.downTipDom.innerHTML = "释放即可刷新";
            mescroll.downProgressDom.style.display="inline-block";
          } else{
            //大于1.5倍offset,自定义下拉刷新,进入淘宝二楼
            if(!mescroll.isLockCallback){
              mescroll.isLockCallback=true;//标记完全自定义下拉刷新,进入淘宝二楼
              mescroll.downTipDom.innerHTML = "欢迎光临 淘宝二楼";
              mescroll.downProgressDom.style.display="none";
            }
          }
        },
        beforeLoading: this.downBeforeLoading,
        showLoading: function(mescroll) {
          //触发下拉刷新的回调
          mescroll.downTipDom.innerHTML = "加载中 ...";
          mescroll.downProgressDom.classList.add("mescroll-rotate");
        }
      },

      dataList: [], // 列表数据
      pdType: 0 ,// 菜单
      //以上为mescroll配置

    };
  },
  // beforeRouteEnter (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
  //   next(vm => {
  //     // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
  //     vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter() // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
  //   })
  // },
  // beforeRouteLeave (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
  //   // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
  //   this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave() // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
  //   next()
  // },
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
  deactivated() {
    console.log('%c 啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊','color:red;','销毁');
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {},
  activated(){
    console.log('%c aaaaaaaaaaaaaaaaaaaaaa','color:orange;','aaaaaaaaaaaaaaaaaaaaaa')
    this.scrollTop()
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapMutations(["RECORD_ADDRESS", "SAVE_GEOHASH"]),
    scrollTop(){
      this.mescroll.scrollTo( 0, 3 );
    },
    godemo(){
      this.$router.push("/demo/mescroll")
    },
    handleScroll(){
      // console.log('%c this.$refs.vtab','color:green;',this.$refs.vtab)
      // console.log('%c this.$refs.vtab','color:green;',this.$refs.vtab.startX+"-"+this.$refs.vtab.startY)
      // const vtabTop = this.$refs.vtab.offsetX
      // if(vtabTop&&vtabTop>0)alert(vtabTop)
      const top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
      if (top > 60) {
        let opacity = top / 140;
        opacity = opacity > 1 ? 1 :opacity;
        this.opacityStyle = {opacity};
        this.showAbs = false;
        // console.log("%c 6000000000000000","color:blue;",top)
      } else {
        this.showAbs = true;
        // console.log("%c xxxxxxxxxxxxxxxxx","color:red;",top)
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
        console.log('%c homeMenu数据返回成功','color:green;',JSON.parse(JSON.stringify(res)));
        // console.log('%c homeMenu数据返回成功','color:green;',JSON.stringify(res));
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
    },
    //============================================mescroll======================================
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    downCallback(mescroll){
      mescroll.endSuccess();
    },
    downBeforeLoading (mescroll,downwarp) {
      //准备触发下拉刷新的回调,自定义下拉刷新进入淘宝二楼
      if (mescroll.isLockCallback) {
        mescroll.endDownScroll();//动画执行完毕后,结束下拉的状态
        this.$router.push("/demo/mescroll")
        // //月亮动画
        // downwarp.classList.add("downwarp-erlou-show");
        // setTimeout(function(){
        //   downwarp.classList.remove("downwarp-erlou-show");
        //   mescroll.endDownScroll();//动画执行完毕后,结束下拉的状态
        // },2000)
        // //显示淘宝二楼
        // mescroll.taobaoErlouDom.classList.remove("mescroll-fade-out");
        // mescroll.taobaoErlouDom.classList.add("mescroll-fade-in");
      }
      
      return mescroll.isLockCallback;//如果要完全自定义下拉刷新,那么return true,此时将不再执行showLoading(),callback();
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback (page, mescroll) {
      // 模拟联网
      this.getListDataFromNet(this.pdType, page.num, page.size, (arr) => {
        // 如果是第一页需手动制空列表
        if (page.num === 1) this.dataList = []
        // 把请求到的数据添加到列表
        this.dataList = this.dataList.concat(arr)
        // 数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          mescroll.endSuccess(arr.length)
        })
      }, () => {
        // 联网异常,隐藏上拉和下拉的加载进度
        mescroll.endErr()
      })
    },

    // 选中状态的样式
    getActiveCls (type) {
      return this.pdType === type ? 'active' : ''
    },
    // 切换菜单
    changeTab (type) {
      if (this.pdType !== type) {
        this.pdType = type
        this.dataList = []// 在这里手动置空列表,可显示加载中的请求进度
        this.mescroll.resetUpScroll() // 刷新列表数据
      }
    },

    /* 联网加载列表数据
       在您的实际项目中,请参考官方写法: http://www.mescroll.com/api.html#tagUpCallback
       请忽略getListDataFromNet的逻辑,这里仅仅是在本地模拟分页数据,本地演示用
       实际项目以您服务器接口返回的数据为准,无需本地处理分页.
       * */
    getListDataFromNet (pdType, pageNum, pageSize, successCallback, errorCallback) {
      // 延时一秒,模拟联网
      setTimeout(() => {
        // axios.get("xxxxxx", {
        //   params: {
        //     num: page.num, //页码
        //     size: page.size //每页长度
        //   }
        // }).then((response)=> {
        var listData = []
        // pdType 全部商品0; 奶粉1; 图书2;
        if (pdType === 0) {
          // 全部商品 (模拟分页数据)
          for (var i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i++) {
            if (i === mockData.length) break
            listData.push(mockData[i])
          }
        } else if (pdType === 1) {
          // 奶粉
          for (var j = 0; j < mockData.length; j++) {
            if (mockData[j].pdName.indexOf('奶') !== -1) {
              listData.push(mockData[j])
            }
          }
        } else if (pdType === 2) {
          // 图书
          for (var k = 0; k < mockData.length; k++) {
            if (mockData[k].pdName.indexOf('图书') !== -1) {
              listData.push(mockData[k])
            }
          }
        }
        // 回调
        successCallback(listData)
        // }).catch((e)=> {
        //   //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        //   errorCallback&&errorCallback()
        // })
      }, 1000)
    },
    //============================================mescroll======================================

  },
  watch: {
    // '$route'(val){
    //   if(val.name!="homefish"){
    //     console.log('%c 路由销毁xxxx','color:green;',val.name);
    //     window.removeEventListener('scroll', this.handleScroll,true);
    //   }
    // },
  }
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
    position: initial;
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


//=======================mescroll===============================
/*以fixed的方式固定mescroll的高度*/
  .mescroll {
    // position: fixed;
    // top: 44px;
    bottom: 44px;
    height: auto;
  }

  .navv {
    text-align: center;
    border-bottom: 1px solid #ddd;
  }

  .navv p {
    display: inline-block;
    width: 30%;
    padding: 10px 0;
  }

  .navv .active {
    border-bottom: 1px solid #FF6990;
    color: #FF6990;
  }

  .data-list li {
    position: relative;
    padding: 10px 8px 10px 120px;
    border-bottom: 1px solid #eee;
  }

  .data-list .pd-img {
    position: absolute;
    left: 18px;
    top: 18px;
    width: 80px;
    height: 80px;
  }

  .data-list .pd-name {
    font-size: 16px;
    line-height: 20px;
    height: 40px;
    overflow: hidden;
  }

  .data-list .pd-price {
    margin-top: 8px;
    color: red;
  }

  .data-list .pd-sold {
    font-size: 12px;
    margin-top: 8px;
    color: gray;
  }
//=======================================================
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
