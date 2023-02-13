<template>
  <div class="suggest">
    <van-cell
      v-for="(text, index) in options"
      :key="index"
      icon="search"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestions } from "@/api/search";
// 按需加载lodash里的防抖,按需加载只会把使用到的打包到结果中
import { debounce } from "lodash";

export default {
  name: "SearchSuggestion",
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    searchText: {
      type: String,
      require: true
    },
  },
  data() {
    return {
      options: [], //放联想数组
    };
  },
  computed: {},
  watch: {
    searchText: {
      // 用debounce把handler抱起来
      handler: debounce(function (val) {
        this.handleGetSuggestion(val);
      }, 500),
      // 首次监视触发 immediate 立即的，马上的
      immediate: true, // 该回调将会在侦听开始之后被立即调用
    },
  },
  created() {},
  mounted() {},
  methods: {
    async handleGetSuggestion(q) {
      try {
        const { data } = await getSuggestions(q);
        this.options = data.data.options;
      } catch (err) {
        console.log(err, "获取联想数据失败");
      }
    },
    // 让搜索的文字高亮
    highlight(text) {
      if (text) {
        //如果有搜索结果
        const highlightStr = `<span style="color:red">${this.searchText}</span>`;
        const reg = new RegExp(this.searchText, "gi");
        return text.replace(reg, highlightStr);
      }
    },
  },
};
</script>

<style scoped lang="less">
</style>
