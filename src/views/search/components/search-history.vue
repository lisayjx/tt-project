<template>
  <div class="history">
    <van-cell title="历史记录">
      <template #right-icon>
        <span>全部删除</span>
        <van-icon name="delete-o" />
      </template>
    </van-cell>
    <van-cell title="单元格">
      <template #right-icon>
        <van-icon name="close" />
      </template>
    </van-cell>
    <van-cell title="单元格">
      <template #right-icon>
        <van-icon name="close" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {},
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
.history {
  .van-icon-delete-o {
    display: flex;
    align-items: center;
    font-size: 30px;
  }
}
</style>
