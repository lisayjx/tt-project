<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshing"
      :success-text="refreshSuccessText"
      @refresh="onRefresh"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <!-- 文章内容 组件-->
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import ArticleItem from "@/components/article-item";
export default {
  name: "ArticleList",
  components: {
    ArticleItem,
  },
  // 组件参数 接收来自父组件的数据
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态

      timestamp: null,
      error: false,

      refreshing: false,
      refreshSuccessText: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        // 1.请求接口
        const re = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
        });
        const { data } = re.data;
        // 2.把获取到的数据的每一项添加到list中
        this.list.push(...data.results);
        // 3.设置本次加载中 loading 状态结束
        this.loading = false;
        // 4.判断数据是否加载结束
        if (data.results.length) {
          this.timestamp = data.pre_timestamp;
        } else {
          //如果没有数据了
          this.finished = true;
        }
      } catch (err) {
        this.loading = false;
        this.error = true;
      }
    },
    async onRefresh() {
      try {
        // 1.请求接口
        const re = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
        });
        const { data } = re.data;
        // 2. 将数据追加到列表的顶部
        this.list.unshift(...data.results);
        // 3.关闭下拉刷新的 loading 状态
        this.refreshing = false;
        this.refreshSuccessText = `刷新成功，更新了${data.results.length}条数据`;
      } catch (err) {
        this.refreshSuccessText = "刷新失败";
        this.refreshing = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.article-list {
  .van-pull-refresh {
    .icon-chenggong {
      font-size: 60px;
      color: green;
    }
  }
}
</style>
