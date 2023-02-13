<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div class="header logined" v-if="user">
      <div class="user-show">
        <div class="user-info">
          <van-image
            class="avatar"
            width="66"
            height="66"
            :src="userInfo.photo"
            round
            fit="cover"
          ></van-image>
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="edit-info">
          <van-button size="mini" to="/user/profile" round>编辑资料</van-button>
        </div>
      </div>
      <div class="user-count">
        <div class="item">
          <span>{{ userInfo.art_count }}</span>
          <span>头条</span>
        </div>
        <div class="item">
          <span>{{ userInfo.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="item">
          <span>{{ userInfo.fans_count }}</span>
          <span>粉丝</span>
        </div>
        <div class="item">
          <span>{{ userInfo.like_count }}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="header not-login" v-else>
      <!-- header -->
      <div class="mobile" @click="$router.push('login')">
        <div class="mobile-box"><img src="@/assets/iphone.png" /></div>
        <span class="text">登录/注册</span>
      </div>
    </div>

    <!-- 宫格导航 -->
    <van-grid :column-num="2" class="grid-nav">
      <van-grid-item text="收藏">
        <i slot="icon" class="iconfont icon-shoucang"></i>
      </van-grid-item>
      <van-grid-item text="历史">
        <i slot="icon" class="iconfont icon-lishi"></i>
      </van-grid-item>
    </van-grid>

    <!-- 消息通知/小T同学 -->
    <div class="cell">
      <van-cell title="消息通知" is-link />
      <van-cell title="小T同学" is-link />
    </div>

    <!-- 退出登录按钮 -->
    <van-button
      v-if="user"
      class="out-btn"
      @click="outLogin"
      type="default"
      block
      clickable
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserInfo } from "@/api/user";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      // 用户信息
      userInfo: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {},
  created() {
    if (this.user) {
      // 获取用户信息
      this.loadUserInfo();
    }
  },
  mounted() {},
  methods: {
    // 退出登录
    outLogin() {
      // 消息询问框
      this.$dialog
        .confirm({
          title: "确定要退出？",
        })
        .then(() => {
          //点击弹框确认执行then
          //确认退出：清除登录状态（容器中的 user + 本地存储中的 user）
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          console.log("取消执行这里");
        });
    },
    // 获取用户信息
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo();
        this.userInfo = data.data;
      } catch (err) {
        if (err.response.status == 401) {
          console.log("token超时或者未传token");
        } else {
          console.log("请求参数错误");
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 400px;
    background: url("~@/assets/loginBG.png");
    background-size: cover;
  }

  // 未登录
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .mobile {
      display: flex;
      flex-direction: column;
      align-items: center;
      .mobile-box {
        background-color: #fff;
        height: 132px;
        width: 132px;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .text {
        font-size: 28px;
        color: #fff;
        margin-top: 15px;
      }
    }
  }
  // 登录
  .logined {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    // 上
    .user-show {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 132px;
      padding: 0 28px;
      .user-info {
        color: #fff;
        font-size: 30px;
        display: flex;
        align-items: center;
        .avatar {
          margin-right: 10px;
        }
      }
      .edit-info {
        .van-button {
          color: #666;
        }
      }
    }
    // 下
    .user-count {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      .item {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-items: center;
        align-items: center;
        color: #fff;
        :first-child {
          font-size: 36px;
        }
        :nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }

  .grid-nav {
    .iconfont {
      font-size: 44px;
    }
    .icon-shoucang {
      color: #eb5253;
    }
    .icon-lishi {
      color: yellowgreen;
    }
  }

  .cell {
    margin-top: 10px;
  }
  .out-btn {
    color: orange;
    margin-top: 10px;
  }
}
</style>
