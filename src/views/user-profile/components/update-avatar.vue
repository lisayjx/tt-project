<template>
  <div class="update-avatar">
    <!-- 图片预览 -->
    <img class="img" :src="img" ref="img" />
    <!-- 底部工具栏 -->
    <div class="toolbar">
      <div class="cancel" @click="$emit('closeAvatarPop')">取消</div>
      <div class="ok" @click="onconfirm">完成</div>
    </div>
  </div>
</template>

<script>
// 图片裁切库
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { updateUserPhoto } from "@/api/user";

export default {
  name: "UpdateAvatar",
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    img: {
      //img
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      cropper: null, //图片裁切对象
      blob: null,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // 操作dom要写到这个生命周期
    const image = this.$refs.img; //获取图片节点
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: "move", // 画布可以移动
      aspectRatio: 1, // 裁剪区默认正方形  16/9是长方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false, // 关闭默认背景
      movable: true, //画布是否允许被拖动
    });
  },
  methods: {
    // 点击确定
    onconfirm() {
      // 方案一：服务端有才裁切接口时
      // 调用getData，得到裁切的区域参数，通过cropper调用getData
      //   console.log(this.cropper.getData());
      //   {
      //     height: 714;
      //     rotate: 0;
      //     scaleX: 1;
      //     scaleY: 1;
      //     width: 714;
      //     x: 0;
      //     y: 182.99999999999997;
      //   }然后把参数传到后端 让后端裁切 后 返回数据

      // 方案二：前端实现裁切
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        // console.log(blob,111)//Blob {size: 2362849, type: 'image/png'}size: 2362849type: "image/png"[[Prototype]]: Blob
        this.handleUpdateAvatar(blob);
      });
    },
    async handleUpdateAvatar(blob) {
      try {
        this.$toast.loading({
          message: "保存中...",
          forbidClick: true, // 禁止背景点击
          duration: 0, // 持续展示
        });

        //请求接口
        const formData = new FormData();
        formData.append("photo", blob);
        const { data } = await updateUserPhoto(formData);
        //   console.log(data.data); //photo: 'http://toutiao.itheima.net/uploads/1676301152346.blob'
        //   关闭弹出层
        this.$emit("closeAvatarPop");
        // 通知父亲更新图片地址
        this.$emit("update-img", data.data.photo);

        this.$toast.success("更新成功");
      } catch (err) {
        console.log(err);
        this.$toast.fail("更新失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.update-avatar {
  background-color: #000;
  height: 100%;
  display: flex;

  .img {
    display: block;
    max-width: 100%;
  }
  .toolbar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 36px;
    color: #fff;

    .cancel,
    .ok {
      width: 100px;
      height: 50px;
      padding: 10px 20px;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .cropper-container {
    // width: 100%;
  }
}
</style>
