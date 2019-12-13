<template>
  <swiper v-if="topImgs.length">
    <swiper-item class="item" v-for="(item,index) in topImgs" :key="index">
      <img :src="item" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImgs: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.item {
  text-align: center;
  height: 300px;
}
</style>