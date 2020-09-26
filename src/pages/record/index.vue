<template>
  <div class="record">
    <div class="header">
      <div class="gender">
        <div :class="['text', !gender && 'active']">Man</div>
        <van-switch
          size="24px"
          v-model="gender"
          active-color="#eee"
          inactive-color="#eee"
        ></van-switch>
        <div :class="['text', gender && 'active']">Girl</div>
      </div>
      <calendar></calendar>
    </div>
    <div class="list-container">
      <div class="bar default">
        <div class="left">Invited user</div>
        <div class="center">Performance</div>
        <div class="right">Income</div>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="No more"
        @load="onLoad"
      >
        <div
          :class="['bar', 'cell', i % 2 == 1 && 'default']"
          v-for="(item, i) in list"
          :key="item"
        >
          <div class="left">
            <div class="top">With the bear</div>
            <div class="bottom">id:224343</div>
          </div>
          <div class="center">$4000</div>
          <div class="right">
            <div class="top">
              <span class="number">$4000 </span>
              <span class="level">(level 1)</span>
            </div>
            <div class="bottom">
               2020 : 09 : 14 :33
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { Toast, Button, Switch, List } from "vant";
import Calendar from "@/components/calendar";
export default {
  name: "Record",
  data() {
    return {
      gender: true,
      list: [],
      loading: false,
      finished: false,
    };
  },
  components: {
    "van-switch": Switch,
    "van-list": List,
    calendar: Calendar,
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  width: 100%;
  padding-bottom: 10px;
  background-color: #fff;
  box-shadow: 1px 9px 16px 0px rgba(46, 42, 42, 0.06);
}
.gender {
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .text {
    font-size: 15px;
    font-weight: 500;
    &.active {
      color: #ff4e6e;
    }
  }
}
.list-container {
  padding: 120px 15px 15px 15px;
  .bar {
    display: flex;
    align-items: center;
    padding: 15px 0;
    .left {
      flex: 1;
      padding-left: 15px;
    }
    .center {
      padding-left: 15px;

      flex: 1;
    }
    .right {
      padding-left: 15px;
      flex: 1;
    }
    &.default {
      background: #f5f5f5;
    }
    &.cell {
      .left {
        flex: 1;
        padding-left: 15px;
        .top {
          font-size: 12px;
        }
        .bottom {
          color: #9a9a9a;
          font-size: 12px;
        }
      }
      .center {
        padding-left: 15px;
        font-size: 13px;
        font-weight: 500px;
        flex: 1;
      }
      .right{
        .top{
            font-size: 13px;
            .level{
              color: #9A9A9A;
            }
        }
        .bottom{
          font-size: 12px;
          color: #9A9A9A;
        }
      }
    }
  }
}
</style>
<style >
.van-switch__node {
  background-color: #ff4e6e;
}
.van-switch {
  border: none;
  margin: 0 10px;
}
</style>
