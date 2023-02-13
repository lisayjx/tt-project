<template>
  <div class="result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell v-for="(item, index) in list" 
      :key="index" :title="item.title"/>
      
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/search";
export default {
  name: "SearchResult",
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    searchText: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      list: [], //搜索结果
      loading: false,
      finished: false,
      page: 1,
      per_page: 20, //每页数量
      error: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        // 1.发起请求
        const res = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText,
        });
        const { results } = res.data.data;
        // 2.将数据添加到列表中
        this.list.push(...results);
        // 3.设置加载状态结束
        this.loading = false;
        // 4.判断是否还是有数据
        if (results.length) {
          this.page++;
        } else {
          this.finished = true;
        }
      } catch (err) {
        // 展示加载失败的提示状态
        this.error = true;
        // 加载失败了 loading 也要关闭
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
</style>
