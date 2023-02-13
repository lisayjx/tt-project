<template>
  <div class="update-birthday">
    <van-datetime-picker
      type="date"
      title="选择年月日"
      v-model="currentDate"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="confirm"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user";
import dayjs from "dayjs";
export default {
  name: "UpdateBirthday",
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value), //把1970-3-12转成这种格式Fri Jun 06 1952 00:00:00 GMT+0800 (中国标准时间)
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async confirm() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, // 禁止背景点击
        duration: 0, // 持续展示
      });
      try {
        let currentDate = this.currentDate;
        //    把那一大堆的时间格式 再转成 1970-12-13这种 再传给后端
        currentDate = dayjs(currentDate).format("YYYY-MM-DD");
        const re = await updateUserProfile({
          birthday: currentDate,
        });
        this.$toast.success("更新成功");
        // 通知父亲更新视图
        console.log(re, 2222);
        this.$emit("input", currentDate);
        this.$emit("closeBirthdayPop");
      } catch (err) {
        console.log(err);
        this.$toast.fail("更新失败");
      }
    },
    cancel() {
      this.$emit("closeBirthdayPop");
    },
  },
};
</script>

<style scoped lang="less">
</style>
