<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="
        currentComment.reply_count > 0
          ? `${currentComment.reply_count}条回复`
          : '暂无回复'
      "
    >
      <template #left>
        <van-icon @click="$emit('closeReplyPop')" name="cross" size="18" />
      </template>
    </van-nav-bar>
    <!-- 评论项组件 -->
    <comment-item :comment="currentComment"></comment-item>

    <van-cell title="全部评论" />

    <!-- 评论列表 -->
    <comment-list
      :type="'c'"
      :source="currentComment.com_id"
      :commentsList="commentReplyList"
    ></comment-list>

    <!-- 回复按钮 -->
    <div class="btn">
      <van-button @click="isReplyComPopShow = true" type="default" block
        >回复评论</van-button
      >
    </div>

    <!-- 发布回复弹出层 -->
    <van-popup
      v-model="isReplyComPopShow"
      position="bottom"
      :style="{ height: '20%' }"
    >
      <!-- 插槽 组件-->
      <comment-post
        :art_id="art_id"
        :target="currentComment.com_id"
        @success-post="handleReplySuccessPost"
      ></comment-post>
    </van-popup>
  </div>
</template>
  
  <script>
import CommentItem from "./comment-item.vue";
import CommentList from "./comment-list.vue";
import CommentPost from "./comment-post.vue";
export default {
  name: "CommentReply",
  components: {
    CommentItem,
    CommentList,
    CommentPost,
  },
  props: {
    currentComment: {
      //当前评论项
      type: Object,
    },
  },
  //   依赖注入 接收父组件传来的数据
  inject: {
    art_id: {
      type: [String, Number],
    },
  },
  data() {
    return {
      isReplyComPopShow: false,
      commentReplyList: [], //评论别人的回复的列表
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleReplySuccessPost(comment) {
      //comment 评论别人的回复后得到的我们自己的评论项

      //   更新回复数量
      this.currentComment.reply_count++;
      //   把最新回复的comment展示到列表顶部
      this.commentReplyList.unshift(comment.new_obj);
      //   关闭弹层
      this.isReplyComPopShow = false;
    },
  },
};
</script>
  
  <style scoped lang="less">
.btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 88px;
}
</style>