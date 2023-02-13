<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button slot="title" icon="search" size="small" to="/search" round>
        搜索
      </van-button>
    </van-nav-bar>

    <!-- 标签 -->
    <van-tabs
      class="channel-tabs"
      v-model="active"
      swipeable
      animated
      swipeable
    >
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!-- 频道的文章列表组件 -->
        <article-list :channel="channel"></article-list>
      </van-tab>

      <!-- 插槽-汉堡和占位符 -->
      <div slot="nav-right" class="placeholder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isEditPopupShow = true"
      >
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 弹窗 -->
    <van-popup
      v-model="isEditPopupShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 组件 -->
      <article-edit
        :userChannels="channels"
        :active="active"
        @updateActive="handleUpdateActive"
      ></article-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
import ArticleList from "./components/article-list.vue";
import ArticleEdit from "./components/article-edit.vue";
import { getItem } from "@/utils/storage";
import { mapState } from "vuex";
export default {
  name: "",
  components: {
    ArticleList,
    ArticleEdit,
  },
  // 组件参数 接收来自父组件的数据
  props: {},
  data() {
    return {
      // 当前所在标签
      active: 0,
      // 用户频道列表
      channels: [],
      // 控制汉堡的弹窗
      isEditPopupShow: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {},
  created() {
    this.loadUserChannels();
  },
  mounted() {},

  methods: {
    // 获取用户频道列表
    async loadUserChannels() {
      try {
        let channels = [];
        // 如果是登录状态 请求接口
        if (this.user) {
          const { data } = await getUserChannels();
          channels = data.data.channels;
        } else {
          // 如果没登录 请求本地存储里 如果本地存储没有 请求默认的
          if (getItem("TT_channels")) {
            channels = getItem("TT_channels");
          } else {
            const { data } = await getUserChannels();
            channels = data.data.channels;
          }
        }

        this.channels = channels;
      } catch (err) {
        this.$toast("获取用户频道列表失败");
        console.log(err);
      }
    },
    // 更新active
    handleUpdateActive(index, isEditPopupShow) {
      this.active = index;
      this.isEditPopupShow = isEditPopupShow; //控制弹窗
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding-bottom: 100px;
  /*添加上padding 撑开高度*/
  padding-top: 174px;
  .page-nav-bar {
    background-color: orange;
    /deep/ .van-nav-bar__title {
      max-width: unset;
    }
    .van-button {
      width: 555px;
      background-color: #fac486;
      border: 0;
      color: #fff;
      font-size: 28px;
      .van-icon {
        font-size: 32px;
      }
    }
  }
  // tabs
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
      width: 100%;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;

      .van-tab__text {
        color: #777;
        font-size: 30px;
      }
    }
    .van-tab--active {
      .van-tab__text {
        color: #333;
        font-weight: 600;
      }
    }
    .van-tabs__line {
      width: 31px;
      background-color: orange;
    }
  }
  // 汉堡
  .hamburger-btn {
    width: 66px;
    height: 82px;
    background-color: #fff;
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      font-size: 33px;
      color: #000;
    }
    &::before {
      content: "";
      width: 1px;
      height: 100%;
      background: url("~@/assets/gradient-gray-line.png");
      background-size: contain;
      position: absolute;
      left: 0;
    }
  }
  .placeholder {
    width: 70px;
    height: 82px;
    background-color: #fff;
    flex-shrink: 0;
    position: relative;
    right: 0;
  }
}
</style>
