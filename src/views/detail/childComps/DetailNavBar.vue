<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item,index) in titles"
          :key="index"
          class="title-item"
          :class="{active:index===currentIndex}"
          @click="titleClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
    },
    //返回按钮的点击事件:返回上页
    backClick() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
  padding: 0 20px;
  font-size: 14px;
}

.title-item {
  flex: 1;
}

.title-item.active {
  color: var(--color-high-text);
}

.back {
  margin-top: 10%;
}
</style>