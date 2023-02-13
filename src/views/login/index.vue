<template>
  <div id="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <!-- 图标插槽 -->
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <!-- 图标插槽 -->
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <!-- 验证码按钮插槽 -->
        <template #button>
          <!-- 倒计时组件 -->
          <van-count-down
            v-if="isShowCountDown"
            :time="1000 * 3"
            format="ss s"
            @finish="isShowCountDown = false"
          />

          <van-button
            v-else
            @click="sendSms"
            native-type="button"
            class="ssm-btn"
            type="default"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div class="login">
        <van-button class="login-btn" block>登录</van-button>
      </div>
    </van-form>

    <!-- 路由出口 -->
    <router-view />
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user";
export default {
  name: "",
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {},
  data() {
    return {
      // 用户信息
      user: {
        mobile: "",
        code: "",
      },
      //   用户信息校验
      userFormRules: {
        mobile: [
          { required: true, message: "手机号不能为空" },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: "手机号格式错误" },
        ],
        code: [
          { required: true, message: "验证码不能为空" },
          { pattern: /^\d{6}$/, message: "验证码格式错误" },
        ],
      },
      //   是否显示倒计时
      isShowCountDown: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 点击发送验证码
    async sendSms() {
      // 1.仅验证手机号
      try {
        await this.$refs.loginForm.validate("mobile"); //验证成功往下走开启倒计时
      } catch (err) {
        return console.log("校验手机号失败"); //不往下执行
      }
      // 2.验证通过，开启倒计时
      this.isShowCountDown = true;
      //   3.发送登录验证码的请求
      try {
        const re = await sendSms(this.user.mobile);
        if (re.status == 200) {
          this.$toast.success("验证码发送成功");
        }
      } catch (err) {
        this.isShowCountDown = false; //发送失败关闭倒计时
        if (err.response.status == 404) {
          return this.$toast.fail("手机号不正确");
        } else if (err.response.status == 429) {
          return this.$toast.fail(err.response.data.message); //频繁
        } else {
          return this.$toast.fail("发送失败，请稍后重试");
        }
      }
    },

    // 点击登录按钮
    async onSubmit() {
      //  1.获取表单数据
      const user = this.user;
      // 2.表单验证
      // 3.提交表单请求登录
      // 开始转圈圈
      this.$toast.loading({
        duration: 0, // 持续时间，默认时间2s，0表示持续展示不停止，直到成功或失败
        forbidClick: true, // 是否禁止背景点击（forbid：禁止）
        message: "登录中...", // 提示消息
      });
      try {
        const res = await login(user);
        console.log(res, 111);
        // 存token到仓库
        this.$store.commit("setUser", res.data.data); //res.data.data里面有token和refresh_token
        this.$toast.success("登陆成功");
        this.$router.back();
      } catch (err) {
        if (err.response.status == 400) {
          this.$toast.fail(err.response.data.message);
        } else {
          this.$toast.fail("登录失败，请稍候重试");
        }
      }

      // 4.根据请求响应结果处理后续操作
    },
  },
};
</script>

<style scoped lang="less">
.iconfont {
  font-size: 36px;
}

// 验证码按钮
.ssm-btn {
  border-radius: 24px;
  font-size: 22px;
  height: 48px;
  background-color: #ededed;

  .van-button__text {
    color: #666;
  }
}

// 登录按钮
.login {
  padding: 0px 28px;
  margin-top: 58px;

  .login-btn {
    color: #fff;
  }
}
</style>
