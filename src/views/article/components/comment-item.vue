<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        @click="changeLike"
        class="like-btn"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        :class="{
          liked: comment.is_liking == true,
        }"
        >{{ comment.like_count || "赞" }}</van-button
      >
    </div>

    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{
          comment.pubdate | relativeTime
        }}</span>

        <van-button
        @click="$emit('reply-click',comment)"
         class="reply-btn"
          round
          >回复 
          {{ comment.reply_count }}
          </van-button
        >
      </div>
    </div>
  </van-cell>
</template>
  
  <script>
import { addCommentLike, delCommentLike } from "@/api/comments";
export default {
  name: "CommentItem",
  components: {},
  props: {
    comment: {
      type: Object,
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
    // 点赞评论/取消点赞评论
    async changeLike() {
      try {
        if (this.comment.is_liking) {
          // 取消点赞
          const re = await delCommentLike(this.comment.com_id);
          this.comment.like_count--;
          this.$toast("取消点赞成功");
        } else {
          // 点赞评论
          const re = await addCommentLike(this.comment.com_id);
          this.comment.like_count++;
          this.$toast("点赞成功");
        }
        this.comment.is_liking = !this.comment.is_liking;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
  
  <style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    // width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
}
.liked {
  color: orangered !important;
}
</style>