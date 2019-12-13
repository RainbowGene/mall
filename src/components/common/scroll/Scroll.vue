<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScorll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0 //默认不监听，影响性能
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    //document.querySelector('wrapper') 这样做不严谨，可能与其他组件重名
    //使用 ref 绑定元素
    this.scroll = new BScorll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    //2,监听滚动的位置
    this.scroll.on("scroll", position => {
      //console.log(position);
      this.$emit("scroll", position);
    });

    //3.监听上拉事件
    this.scroll.on("pullingUp", () => {
      //console.log("上拉加载更多!");
      this.$emit("pullingUp");
    });

    //this.refresh();
  },
  methods: {
    backTop(x = 0, y = 0, time = 500) {
      //返回顶部：判断scroll是否已被创建
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      //激活上拉事件
      this.scroll.finishPullUp();
      //console.log("刷新成功！");
    },
    refresh() {
      //重新计算可滑动内容总高度
      this.scroll && this.scroll.refresh();
      //console.log("计算完成！");
    },
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    }
  }
};
</script>

<style scoped>
</style>