<template>
  <div class="ArticleEdit">
    <!-- 我的推荐 -->
    <van-cell class="cell" :border="false">
      <div class="title" slot="title">我的频道</div>
      <van-button
        @click="isShowClose = !isShowClose"
        class="edit-btn"
        round
        size="small"
        >{{ isShowClose ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <!-- 格子 -->
    <van-grid class="grid my" :gutter="10">
      <van-grid-item
        v-for="(item, index) in userChannels"
        :key="index"
        class="grid-item"
        @click="onMyChannelClick(item, index)"
      >
        <!-- 插槽 文字 -->
        <span
          slot="text"
          class="text"
          :class="index == active ? 'active' : ''"
          >{{ item.name }}</span
        >
        <!-- 插槽 × -->
        <i
          v-show="isShowClose && !fixChannels.includes(item.id)"
          slot="icon"
          class="iconfont icon-cuowu1"
        ></i>
      </van-grid-item>
    </van-grid>

    <!-- 推荐 -->
    <van-cell class="cell" :border="false">
      <div class="title comment-title" slot="title">频道推荐</div>
    </van-cell>
    <!-- 格子 -->
    <van-grid class="grid comment" :gutter="10" :border="false">
      <van-grid-item
        v-for="(item, index) in recommendChannels"
        :key="index"
        class="grid-item"
        icon="plus"
        :text="item.name"
        @click="addChannel(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getChannels, addUserChannels, delUserChannels } from "@/api/channels";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";
export default {
  name: "ArticleEdit",
  components: {},
  props: {
    userChannels: {
      //用户推荐频道列表
      type: Array,
      required: true,
    },
    active: {
      type: [String, Number],
      default: 0,
    },
  },
  data() {
    return {
      channels: [], //所有推荐频道列表
      isShowClose: false, //×号的显示和隐藏
      fixChannels: [0], //固定不显示×的频道放这里
    };
  },
  computed: {
    // 所有频道 - 用户频道 = 推荐频道
    recommendChannels() {
      //推荐频道
      // find检查是否满足条件?
      return this.channels.filter((item) => {
        return !this.userChannels.find((myItem) => {
          return myItem.id === item.id;
        });
      });
    },
    ...mapState(["user"]),
  },
  watch: {},
  created() {
    this.loadChannels();
  },
  mounted() {},
  methods: {
    // 获取所有频道列表
    async loadChannels() {
      try {
        const re = await getChannels();
        const { channels } = re.data.data;
        this.channels = channels;
      } catch (err) {
        console.log(err, "获取所有频道列表失败");
      }
    },
    // 点击频道推荐把频道添加到我的频道
    async addChannel(item) {
      this.userChannels.push(item);

      if (this.user) {
        try {
          // 如果登录了 存储到线上
          await addUserChannels({
            id: item.id,
            seq: this.userChannels.length,
          });
        } catch (err) {
          console.log(err, "添加频道错误");
        }
      } else {
        // 如果没登陆存储到本地
        setItem("TT_channels", this.userChannels);
      }
    },
    // 点击我的频道里的频道
    async onMyChannelClick(item, index) {
      // 删除
      if (this.isShowClose) {
        //1.如果是固定频道，则不删除
        if (this.fixChannels.includes(item.id)) {
          return;
        }
        //2. 删除此频道
        this.userChannels.splice(index, 1);
        //3.如果删除的激活频道之前的频道，则更新激活的频道项
        if (index <= this.active) {
          // 让激活频道的索引 - 1
          this.$emit("updateActive", this.active - 1, true);
        }
        //  4.数据持久化
        this.handleDelChannel(item);
      } else {
        //如果是点击频道
        // 通知父组件修改当前active
        this.$emit("updateActive", index);
      }
    },

    // 处理数据持久化里的删除
    async handleDelChannel(item) {
      // 如果登录了 将数据更新到线上
      if (this.user) {
        try {
          await delUserChannels(item.id);
        } catch (err) {
          console.log(err, "删除频道错误");
        }
      } else {
        // 如果没登陆  将数据更新到本地
        setItem("TT_channels", this.userChannels);
      }
    },
  },
};
</script>

<style scoped lang="less">
.ArticleEdit {
  padding-top: 128px;

  .cell {
    .title {
      font-size: 32px;
      color: #333;
      font-family: MicrosoftYaHei;
    }
    .edit-btn {
      width: 100px;
      height: 50px;
      font-size: 26px;
      border-color: #f85a5a;
      color: #f85a5a;
    }
  }

  /deep/.grid {
    padding-top: 48px;
    border-radius: 6px;
    .grid-item {
      width: 160px;
      height: 86px;
      .van-grid-item__content {
        background-color: #f4f5f6;
        padding: 30px 0;
        white-space: nowrap;
        .van-grid-item__text,
        .text {
          color: #222;
          font-size: 28px;
        }
      }
    }
  }

  // 上
  /deep/.my {
    .van-grid-item__content {
      position: relative;
      .van-grid-item__icon-wrapper {
        position: unset;
        .icon-cuowu1 {
          position: absolute;
          top: -12px;
          right: -14px;
          font-size: 42px;
          color: orange;
        }
      }

      .van-grid-item__icon + .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
  .comment-title {
    margin-top: 70px;
  }

  // 下
  /deep/ .comment {
    .van-grid-item__content {
      flex-direction: row;
      .van-grid-item__icon {
        font-size: 30px;
      }
      .van-grid-item__icon + .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}

.active {
  color: orange !important;
}
</style>
