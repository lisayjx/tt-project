<template>
  <div class="update-gender">
    <van-picker
      title="标题"
      show-toolbar
      :columns="genders"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
      :default-index="value"
    />
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user";
export default {
  name: "UpdateGender",
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      genders: ["男", "女"],
      localGender:this.value  //传来的性别
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 点击确定
    async onConfirm(value, index) {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, // 禁止背景点击
        duration: 0, // 持续展示
      });
      try {
        const localGender=this.localGender
        await updateUserProfile({
          gender: localGender,
        });
        this.$toast.success("更新成功");
        //   通知父亲关闭弹窗
        this.$emit("closeGenderPop");
        //   通知父组件更新性别
        this.$emit("input", localGender);
      } catch (err) {
        console.log(err);
        this.$toast.fail("更新失败");
      }
    },
    onChange(picker, value, index) {
      // this.$toast(`当前值：${value}, 当前索引：${index}`);
      this.localGender=index
    },
    // 点击取消
    onCancel() {
      //   通知父亲关闭弹窗
      this.$emit("closeGenderPop");
    },
  },
};
</script>

<style scoped lang="less">
</style>
