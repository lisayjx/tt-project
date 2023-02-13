<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
      title="社区"
    ></van-nav-bar>

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>

      <div class="article-detail" v-else-if="detail.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ detail.title }}</h1>

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="detail.aut_photo"
          />
          <div slot="title" class="user-name">{{ detail.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ detail.pubdate | relativeTime }}
          </div>

          <!-- 关注组件 -->
          <follow-user
            v-model="detail.is_followed"
            :aut_id="detail.aut_id"
            class="follow-btn"
          />
        </van-cell>

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="detail.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 评论列表组件 -->
        <comment-list
          @reply-click="handleReplyClick"
          @total-count="total_count = $event"
          :source="detail.art_id"
          :commentsList="commentsList"
        ></comment-list>

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            @click="isCommentPopShow = true"
            class="comment-btn"
            type="default"
            round
            size="small"
            >写评论
          </van-button>

          <van-icon class="comment-icon" name="comment-o" :info="total_count" />
          <!-- 收藏组件 -->
          <collect-article
            v-model="detail.is_collected"
            :art_id="detail.art_id"
          />
          <!-- 点赞组件 -->
          <like-article
            :art_id="detail.art_id"
            v-model="detail.attitude"
          ></like-article>
        </div>

        <!-- 发布评论弹出层 -->
        <van-popup
          v-model="isCommentPopShow"
          position="bottom"
          :style="{ height: '20%' }"
        >
          <!-- 插槽 组件-->
          <comment-post
            :target="detail.art_id"
            :art_id="null"
            @success-post="handleSuccessPost"
          ></comment-post>
        </van-popup>
      </div>

      <!-- -------------------------------------------------------------- -->
      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus == 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
    </div>

    <!-- 评论回复弹出层 -->
    <van-popup
      v-model="isReplyPopShow"
      position="bottom"
      :style="{ height: '96%' }"
    >
      <!-- 点击回复弹出来的内容组件 -->
      <comment-reply
        v-if="isReplyPopShow"
        :currentComment="currentComment"
        @closeReplyPop="isReplyPopShow = false"
      ></comment-reply>
    </van-popup>
  </div>
</template>

<script>
import { getArticleDetail } from "@/api/article";
import { ImagePreview } from "vant";
import FollowUser from "@/components/follow-user";
import CollectArticle from "@/components/collect-article";
import LikeArticle from "@/components/like-article";
import CommentList from "./components/comment-list.vue";
import CommentPost from "./components/comment-post.vue";
import CommentReply from "./components/comment-reply.vue";

export default {
  name: "ArticleIndex",
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost, //点击底部评论弹出层里的内容
    CommentReply, //点击回复弹出来的内容
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true,
    },
  },
  // 依赖注入 父组件给所有后代传递数据
  provide  () {
    return {
      art_id: this.articleId,
    };
  },
  data() {
    return {
      detail: null, //文章详情
      loading: false, //加载中的loading状态
      errStatus: 0, //失败的状态码
      total_count: 0, //文章评论总数量
      isCommentPopShow: false, //底部评论弹出层状态
      commentsList: [],
      isReplyPopShow: false, //回复评论弹出层
      currentComment: null, //当前评论项
    };
  },
  computed: {},
  watch: {},
  created() {
    this.handleGetArticleDetail();
  },
  mounted() {},
  methods: {
    async handleGetArticleDetail() {
      // 展示 loading 加载中
      this.loading = true;
      try {
        const { data } = await getArticleDetail(this.articleId);
        this.detail = data.data;

        // 初始化图片点击预览 所以这里延时
        setTimeout(() => {
          this.PreviewImage();
        }, 0);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404;
        }
      }
      // 无论成功还是失败都要关闭loading
      this.loading = false;
    },
    // 图片预览
    PreviewImage() {
      // 得到所有img节点
      const articleContent = this.$refs["article-content"];
      const imgs = articleContent.querySelectorAll("img");
      const images = []; //图片地址的数组
      // 循环装着img节点的数组，每次循环都把里面的图片地址放入images数组
      imgs.forEach((img, index) => {
        images.push(img.src);
        // 给每个img图片节点 注册一个点击事件
        img.onclick = () => {
          // 图片预览
          ImagePreview({
            images,
            // 起始位置 你点击的位置
            startPosition: index,
          });
        };
      });
    },
    // 发布评论成功后
    handleSuccessPost(comment) {
      // 弹出层关闭
      this.isCommentPopShow = false;
      // 把我们的评论的对象res.new_obj，unshift到评论列表顶部
      this.commentsList.unshift(comment.new_obj);
    },
    // 点击回复评论
    handleReplyClick(comment) {
      ////当前评论项（从comment-item传到comment-list再到这里的），然后把他传给comment-reply
      this.currentComment = comment;
      // 弹窗出来
      this.isReplyPopShow = true;
      // 进行回复 在commit-post里回复
    },
  },
};
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
  }
  .article-detail {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
    }
    .comment-icon {
      top: 2px;
      color: #777;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
    .btn-item {
      border: none;
      padding: 0;
      height: 40px;
      line-height: 40px;
      color: #777777;
    }
  }

  .follow-btn {
    border-radius: 50px;
  }
}
</style>
