<template>
  <div class="goods">
    <good-list-item v-for="(item,index) in goods" :key="index" />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodsListItem
  }
};
</script>

<style scoped>
.good{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}


</style>