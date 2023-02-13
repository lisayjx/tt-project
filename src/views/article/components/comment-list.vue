<template>
  <van-list
    :immediate-check="false"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error="error"
    error-text="评论加载失败"
  >
    <!-- 组件 -->
    <comment-item
      @reply-click="$emit('reply-click', $event)"
      :comment="item"
      v-for="(item, index) in commentsList"
      :key="index"
    ></comment-item>
  </van-list>
</template>

<script>
import { getComments } from "@/api/comments";
import CommentItem from "./comment-item.vue";
export default {
  name: "CommentList",
  components: { CommentItem },
  props: {
    commentsList: {
      //用父亲给传过来的commentsList
      type: Array,
      default: () => [],
    },
    source: {
      //里面有article传来的art_id文章id和comment-reply组件传来的com_id评论id
      type: [String, Number],
      required: true,
    },
    type: {
      type: String,
      validator(val) {
        //校验组件传过来的值 只能是a或者c，其他不接受
        return ["a", "c"].includes(val);
      },
      default: "a",
    },
  },
  data() {
    return {
      loading: false,
      finished: false,
      offset: null, //获取下一页数据的标记

      // commentsList: [],

      error: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loading=true
    this.onLoad();
  },
  mounted() {},

  methods: {
    async onLoad() {
      try {
        const re = await getComments({
          type: this.type, //a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source, //文章id或评论id
          offset: this.offset,
          limit: 10,
        });
        this.commentsList.push(...re.data.data.results);
        // 把文章评论总数量传递到外部
        this.$emit("total-count", re.data.data.total_count);

        // 加载状态结束
        this.loading = false;

        //  数据全部加载完成
        if (re.data.data.results.length) {
          //  如果还有数据就更新获取下一页的数据页码
          this.offset = re.data.data.last_id;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.error = true;
        this.loading = false;
        console.log(err);
      }
    },
  },
};
</script>

<style scoped lang="less">
</style>
