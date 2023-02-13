<template>
  <div class="article-item">
    <van-cell
      :to="{
        name: 'article',
        params: {
          articleId: article.art_id,
        },
      }"
    >
      <!-- 插槽 -->
      <div slot="title" class="title van-multi-ellipsis--l2">
        {{ article.title }}
      </div>

      <div slot="label" class="label">
        <!-- 三张图片的 -->
        <div class="three-img">
          <van-image
            v-if="article.cover.type === 3"
            v-for="(img, index) in article.cover.images"
            :key="index"
            :src="img"
          />
        </div>
        <!-- info -->
        <div class="info">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}评论</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </div>

      <!-- 一张图片的 -->
      <van-image
        class="one-img"
        slot="default"
        v-if="article.cover.type === 1"
        :src="article.cover.images[0]"
        fit="cover"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  components: {},
  props: {
    article: {
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
  methods: {},
};
</script>

<style scoped lang="less">
.article-item {
  .van-cell {
    border-bottom: 1px solid #edeff3;
    .title {
      font-size: 32px;
    }

    .van-cell__value {
      flex: unset;
      width: 232px;
      height: 146px;
    }
    .info {
      width: 100%;
      span {
        margin-right: 15px;
      }
    }

    /deep/ .label {
      .three-img {
        display: flex;
        width: 100%;
        padding: 30px 0;
        .van-image {
          width: 232px;
          height: 146px;
          &:not(:last-child) {
            margin-right: 4px;
          }
        }
      }
    }
  }
}
</style>
