<template>
  <div class="layout-container">
    <!-- tabBar子组件出口 -->
    <router-view></router-view>

    <!-- tabbar -->
    <van-tabbar route active-color="orange">
      <van-tabbar-item class="tabber-item" :to="{ name: 'home' }">
        <!-- 插槽 -->
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>

      <van-tabbar-item class="tabber-item" to="/qa">
        <i slot="icon" class="iconfont icon-toutiao"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item class="tabber-item" to="/video">
        <i slot="icon" class="iconfont icon-video"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item class="tabber-item" to="/my">
        <i slot="icon" class="iconfont icon-wode"></i>
        <span class="text">{{ $store.state.user?'我的':'未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.layout-container {
  .tabber-item {
    i {
      font-size: 40px;
    }
    .text {
      font-size: 20px;
    }
  }
}
</style>
