<template>
  <div class="update-name">
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="ClosePop"
      @click-right="onClickRight"
    />
    <van-field
      class="nameField"
      v-model.trim="localName"
      rows="5"
      autosize
      type="textarea"
      maxlength="10"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user";
export default {
  name: "UpdateName",
  components: {},

  // 组件参数 接收来自父组件的数据
  props: {
    // userProfile.name
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localName: this.value, //昵称 有初始值
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    ClosePop() {
      this.$emit("closeNamePop");
      this.message = "";
    },
    async onClickRight() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, // 禁止背景点击
        duration: 0, // 持续展示
      });
      try {
        const localName = this.localName;
        if (!localName.length) {
          //如果长度为0
          return this.$toast("昵称不能为空");
        }
        const re = await updateUserProfile({
          name: localName,
        });
        this.$toast.success("更新成功");
        // 通知父亲更新视图
        this.$emit("input", localName);
        this.$emit("closeNamePop");
      
      } catch (err) {
        this.$toast.fail("更新失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
</style>
