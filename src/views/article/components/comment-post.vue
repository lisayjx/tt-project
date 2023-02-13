<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button 
    :disabled="!message.length"
    @click="postComment" class="post-btn">发布</van-button>
  </div>
</template>
  
  <script>
import { comment } from "@/api/comments";
export default {
  name: "CommentPost",
  components: {},
  props: {
    art_id: {
      required: true,
    },
    target: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async postComment() {
      try {
        this.$toast.loading({
        duration: 0, // 持续时间，默认时间2s，0表示持续展示不停止，直到成功或失败
        forbidClick: true, // 是否禁止背景点击（forbid：禁止）
        message: "发布中...", // 提示消息
      });
        
        const { data } = await comment({
          target: this.target,  //评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）		
          content: this.message,
          art_id: this.art_id, // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        });
        if (data.message == "OK") {
          this.$toast.success("发布成功");
          this.message = "";
          //   通知父亲把弹出层关闭,把评论放到评论列表顶部
          this.$emit("success-post",data.data);
 
          this.$toast.success("发布成功");
        }
      } catch (err) {
        console.log(err);
        this.$toast.fail("发布失败");
      }
    },
  },
};
</script>
  
  <style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    background: #fff;
    &::before {
      display: none;
    }
  }
}
</style>