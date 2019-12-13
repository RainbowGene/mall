<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!--这里多加一个是为了实现tabcontrol吸顶-->
    <tab-control
      v-show="isTabFixed"
      class="fixed"
      @tabClick="tabClick"
      ref="tabControl1"
      :titles="['流行', '新款', '精选']"
    ></tab-control>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="contentLoad"
    >
      <div>
        <home-swiper :banners="banners" ref="hSwiper"></home-swiper>
        <recommend-view :recommends="recommends" />
        <feature-view />
        <tab-control
          :titles="['流行', '新款', '精选']"
          class="tab-control"
          @tabClick="tabClick"
          ref="tabControl2"
        />
        <goods-list :goods-list="showgoods" />
      </div>
    </scroll>

    <!--监听组件的原生事件，必须加修饰符native-->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import TabControl from "components/content/TabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "../../common/units";

//import BScroll from "better-scroll"; 封装成一个Vue组件了
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  computed: {
    showgoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    //组件创建完发送网络请求
    //1,请求多个数据
    this.getMultidata();

    //请求商品数据
    this.getGoods("pop");
    this.getGoods("new");
    this.getGoods("sell");
  },
  mounted() {
    //监听图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 1000); //防抖
    this.$bus.$on("itemImageLoad", () => {
      //事件总线
      //console.log("图片加载完成!");
      refresh();
    });
  },
  updated() {
    //BeforeUpdated 数据挂载DOM之前(可以拿到原始)， updated 数据挂载完成后
    this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop; //tabcontrol 往上的高度
  },
  deactivated() {
    //离开Home组件时，保存Y坐标
    //console.log("home destroyed");
    this.saveY = this.$refs.scroll.scroll.y;
  },
  activated() {
    //进入Home组件时
    //console.log("home activated");
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  methods: {
    /*
      网络请求相关方法
    */
    getMultidata() {
      getHomeMultidata()
        .then(res => {
          //console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getGoods(type) {
      getHomeGoods(type, this.goods[type].page)
        .then(res => {
          //console.log(res);
          const goodsList = res.data.list;
          this.goods[type].list.push(...goodsList); //接口无数据，该条不注释会跳至catch
          this.goods[type].page++;

          //再次激活上拉加载事件
          this.$refs.scroll.finishPullUp();

          //重新计算可滑动内容总高度
          //this.$refs.scroll.refresh();
          const refresh = debounce(this.$refs.scroll.refresh, 1000); //使用防抖
          refresh();
        })
        .catch(err => {
          //console.log(err);
          throw err;
        });
    },
    /*
      事件监听的相关方法
    */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      //返回顶部
      //父组件拿到子组件对象
      //this.$refs.scroll.scroll.scrollTo(0, 0, 500); //x,y,ms:x坐标，y坐标，毫秒

      //封装思想达到目的
      this.$refs.scroll.backTop(0, 0, 500);
    },
    contentScroll(position) {
      //判断返回顶部按钮是否显示
      this.isShowBackTop = -position.y > 600;

      //判断tabControl是否吸附(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    contentLoad() {
      //加载更多内容
      this.getGoods(this.currentType);
    }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: white;

  /**原生让标题不一起滚动，但我们使用的是 scroll 包裹，注释掉这里 */
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
  z-index: 9;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;

  /* height: 300px;
  overflow: hidden;
  margin-top: 44px; */
}
</style>