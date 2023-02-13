<template>
  <van-button
    v-if="isFollowed"
    @click="changeFollow"
    :loading="followLoad"
    color="#ccc"
    >已关注</van-button
  >

  <van-button
    v-else
    type="info"
    color="#E63F32"
    icon="plus"
    @click="changeFollow"
    :loading="followLoad"
    >关注</van-button
  >
</template>

<script>
import { addFollow, delFollow } from "@/api/user";
export default {
  name: "FollowUser",
  components: {},
    // 自定义 v-model 的数据名称
  model: {
    prop: 'isFollowed', // 默认是 value
    event: 'update-is_followed' // 默认是 input
  },
  // 组件参数 接收来自父组件的数据
  props: {
    isFollowed: {
      type: Boolean,
      required: true,
    },
    aut_id: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      followLoad: false, // 控制关注按钮的loading
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 点击关注按钮
    async changeFollow() {
      try {
        this.is_followed = true;
        if (this.is_followed) {
          // 去取消关注
          await delFollow(this.aut_id);
        } else {
          // 去关注
        await addFollow(this.aut_id);
        }

        this.$emit('update-is_followed', !this.isFollowed)
      } catch (err) {
        console.log(err)
        let message = '操作失败，请重试！'
        if (err.response && err.response.status === 400) {
          message = '你不能关注你自己！'
        }
        this.$toast(message)
      }
      this.followLoad = false;
    },
  },
};
</script>

<style scoped lang="less">
</style>
