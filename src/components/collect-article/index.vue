<template>
  <van-button
    v-if="!is_collected"
    class="btn-item-o"
    icon="star-o"
    @click="handleCollect"
  />

  <van-button v-else icon="star" style="color: orange" @click="handleCollect" />
</template>

<script>
import { collectArticle, unCollectArticle } from "@/api/article";
export default {
  name: "CollectArticle",
  components: {},
  model: {
    prop: "is_collected",
    event: "updateIsCollected",
  },
  props: {
    is_collected: {
      type: Boolean,
      required: true,
    },
    art_id: {
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
    async handleCollect() {
      try {
        if (this.is_collected) {
          // 取消收藏
          await unCollectArticle(this.art_id);
          this.$toast("取消收藏成功");
        } else {
          // 去收藏
          this.$toast("收藏成功");
          await collectArticle({
            target: this.art_id,
          });
        }
        // 通知父亲更新视图
        this.$emit("updateIsCollected", !this.is_collected);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped lang="less">
</style>
