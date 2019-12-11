<template>
  <swiper ref="swiper" v-if="banners.length">
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
// import Swiper from "components/common/swiper/Swiper"
// import SwiperItem from "components/common/swiper/SwiperItem"
//上诉两个导入可以写成
import { Swiper, SwiperItem } from "components/common/swiper/index";

//或者 ：import {Swiper, SwiperItem} from 'common/swiper'

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default: []
    }
  },
  methods: {
    stopTimer() {
      this.$refs.swiper.stopTimer();
    },
    startTimer() {
      if (this.$refs.swiper) {
        this.$refs.swiper.startTimer();
      }
    }
  }
};
</script scoped>

<style>
</style>