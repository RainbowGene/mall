<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-imgs="topImgs"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";

import { getDetail } from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImgs: null
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper
  },
  created() {
    this._getDetailData();
  },
  methods: {
    /**网络请求相关 */
    _getDetailData() {
      //获取iid
      const iid = this.$route.params.iid;
      this.iid = iid;
      //请求数据
      getDetail(this.iid).then(res => {
        const data = res.result;
        //1,获取顶部轮播图
        this.topImgs = data.itemInfo.topImages;
      });
    }
  }
};
</script>

<style scoped>
</style>