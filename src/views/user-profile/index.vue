<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 单元格 -->
    <input type="file" hidden ref="inputFile" @change="onFileChange" />
    <van-cell title="头像" is-link @click="$refs.inputFile.click()">
      <van-image class="avatar" round fit="cover" :src="userProfile.photo" />
    </van-cell>

    <van-cell
      @click="isShowNamePop = true"
      title="昵称"
      is-link
      :value="userProfile.name"
    />
    <van-cell
      @click="isShowGenderPop = true"
      title="性别"
      is-link
      :value="userProfile.gender == 0 ? '男' : '女'"
    />
    <van-cell
      @click="isShowBirthdayPop = true"
      title="生日"
      is-link
      :value="userProfile.birthday"
    >
    </van-cell>

    <!-- 点击昵称得弹出层 -->
    <van-popup
      v-model="isShowNamePop"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name
        v-if="isShowNamePop"
        v-model="userProfile.name"
        @closeNamePop="isShowNamePop = false"
      ></update-name>
    </van-popup>

    <!-- 点击性别得弹出层 -->
    <van-popup
      v-model="isShowGenderPop"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <update-gender
        v-model="userProfile.gender"
        @closeGenderPop="isShowGenderPop = false"
      ></update-gender>
    </van-popup>

    <!-- 点击生日的弹出层 -->
    <van-popup
      v-model="isShowBirthdayPop"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <update-birthday
        v-if="isShowBirthdayPop"
        v-model="userProfile.birthday"
        @closeBirthdayPop="isShowBirthdayPop = false"
      ></update-birthday>
    </van-popup>

    <!-- 点击头像的弹出层 -->
    <van-popup
      v-model="isShowAvatarPop"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-avatar
        v-if="isShowAvatarPop"
        @closeAvatarPop="isShowAvatarPop = false"
        :img="img"
        @update-img="userProfile.photo = $event"
      ></update-avatar>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";
import UpdateName from "./components/update-name";
import UpdateGender from "./components/update-gender";
import UpdateBirthday from "./components/update-birthday";
import UpdateAvatar from "./components/update-avatar";

export default {
  name: "UserProfile",
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdateAvatar,
  },
  props: {},
  data() {
    return {
      userProfile: {}, //用户资料
      isShowNamePop: false, //昵称弹窗
      isShowGenderPop: false, //性别弹层
      isShowBirthdayPop: false, //生日弹层
      isShowAvatarPop: false, //头像弹层
      img: "", //上传的图片的url
    };
  },
  computed: {},
  watch: {},
  created() {
    this.handleGetUserProfile();
  },
  mounted() {},
  methods: {
    // 获取用户资料
    async handleGetUserProfile() {
      try {
        const { data } = await getUserProfile();
        this.userProfile = data.data;
      } catch (err) {
        console.log(err);
      }
    },
    // 当input上传文件 他改变时
    onFileChange() {
      // 获取上传的文件信息
      const file = this.$refs.inputFile.files[0];
      // 基于文章对象获取 blob 数据，生成src的
      this.img = window.URL.createObjectURL(file);

      this.isShowAvatarPop = true; //显示头像弹出层

      //   file-input如果两次都选了同一个文件不会触发input的change事件，弹窗不会出来
      // 解决办法时 每次使用完毕都把input的value清空

      //   console.log(this.$refs.inputFile.value);
      this.$refs.inputFile.value = "";
    },
  },
};
</script>

<style scoped lang="less">
.user-profile {
  /deep/ .nav-bar {
    background-color: orange;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon {
      color: #fff;
    }
  }
  .avatar {
    width: 55px;
    height: 55px;
  }

  .namePop {
    background-color: #f5f5f5;
  }
  /deep/ .nameField {
    background-color: #f9f9f9;
    .van-cell__value {
      padding: 10px;
      background-color: #fff;
    }
  }
}
</style>
