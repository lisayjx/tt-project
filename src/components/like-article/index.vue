<template>
  <van-button
    @click="handleLike"
    icon="good-job-o"
    :class="{
      like: attitude == 1,
    }"
  />
</template>

<script>
import{likeArticle,unLikeArticle}from '@/api/article'
export default {
  name: "LikeArticle",
  components: {},
  model: {
    prop: "attitude", //态度-1无态度 0不喜欢 1已点赞
    event: "updateAttitude",
  },
  // 组件参数 接收来自父组件的数据
  props: {
    art_id: {
      type: [Number, String],
      required: true,
    },
    attitude: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async handleLike() {
        try {
            let status=-1 //无状态
        if (this.attitude==1) {
          // 取消点赞
          await unLikeArticle(this.art_id);
          this.$toast("取消点赞成功");
        } else {
          // 去喜欢
          this.$toast("点赞成功");
          await likeArticle({
            target: this.art_id,
          });
            status= 1 //喜欢
        }
        // 通知父亲更新视图
        this.$emit("updateAttitude", status);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped lang="less">
.like {
  color: orangered !important;
}
</style>
