<template>
  <div class="search-container">
    <!-- 
        搜索框
        form包着是为了让手机键盘上有搜索按钮
     -->

    <form action="/" class="form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="orange"
        shape="round"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <div class="placeholder"></div>
    <!-- 三个组件 -->
    <search-result v-if="isResultShow" :searchText="searchText"></search-result>
    <search-suggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    ></search-suggestion>
    <search-history v-else></search-history>
  </div>
</template>

<script>
// 引入组件
import SearchHistory from "./components/search-history.vue";
import SearchSuggestion from "./components/search-suggestion.vue";
import SearchResult from "./components/search-result.vue";
export default {
  name: "Search",
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  props: {},
  data() {
    return {
      searchText: "", //搜索栏搜索的关键字
      isResultShow: false, //控制搜索结果显示与否
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 回车搜索时触发
    onSearch(text) {
      this.isResultShow = true; //显示result组件
      this.searchText = text; //把从联想点击的关键字展示到搜索框
    },
    // 取消时候
    onCancel() {
      //  返回上一页
      this.$router.back();
    },
  },
};
</script>

<style scoped lang="less">
.search-container {
  .van-search__action {
    //取消的颜色
    color: #fff;
  }

  .form {
    position: fixed;
    width: 100%;
    z-index: 999;
  }
  .placeholder {
    height: 110px;
  }
}
</style>
