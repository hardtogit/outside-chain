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
      <calendar @onChange="handleCalendarChange"></calendar>
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
          :key="i"
        >
          <div class="left">
            <div class="top">{{ item.fromUserSnapshot.nickname }}</div>
            <div class="bottom">id:{{ item.fromUserSnapshot.roomNo }}</div>
          </div>
          <div class="center">${{ item.achievementAmount / 100 }}</div>
          <div class="right">
            <div class="top">
              <span class="number"
                >${{ (item.rebateAmount + item.emendAddRebateAmount) / 100 }}
              </span>
              <span class="level"
                >(level {{ item.achievementDetail.fromUserLevel }})</span
              >
            </div>
            <div class="bottom">{{ item.creationTime }}</div>
          </div>
        </div>
      </van-list>
      <div class="bottom">
        <div class="left">
          <div class="btn" @click="goEmail">Send to Email</div>
        </div>
        <div class="center">
          <div class="top">lump sum:</div>
          <div class="sub">${{ count.achievementAmount / 100 || "0.00" }}</div>
        </div>
        <div class="right">
          <div class="btn">提现</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Button, Switch, List } from "vant";
import dayjs from "dayjs";
import { request } from "@/utils/request";
import Calendar from "@/components/calendar";
export default {
  name: "Record",
  data() {
    return {
      gender: true,
      month: dayjs().format("YYYY-MM-01"),
      list: [],
      loading: false,
      finished: false,
      page: 1,
      count: {},
    };
  },
  components: {
    "van-switch": Switch,
    "van-list": List,
    calendar: Calendar,
  },
  watch: {
    gender: function (value) {
      this.getCount();
      this.list = [];
      (this.page = 1), (this.finished = false), (this.totalPages = 0);
    },
  },
  mounted() {
    this.getCount();
  },
  methods: {
    handleCalendarChange(e) {
      this.month = e;
      this.getCount();
      this.list = [];
      (this.page = 1), (this.finished = false), (this.totalPages = 0);
    },
    getCount() {
      request
        .post("/UserRebateView.statistics.query", {
          data: {
            params: {
              gender: this.gender ? "Male" : "Female",
              month: this.month,
            },
          },
        })
        .then((response) => {
          // console.log(response);
          this.count = response.data;
        });
    },
    goEmail(){
      this.$router.push('/email')
    },
    goWithDraw(){

    },
    onLoad() {
      console.log(this.page)
      // 异步更新数据
      request
        .post("/UserRebateView.queryMemberList.query", {
          data: {
            size: 10,
            page: this.page,
            params: {
              gender: this.gender ? "Male" : "Female",
              month: this.month,
            },
          },
        })
        .then((response) => {
          console.log(response.data.content);
          this.loading = false;
          this.list = this.list.concat(response.data.content);
          if (
            this.page === response.data.totalPages ||
            response.data.totalPages === 0
          ) {
            this.finished = true;
          }
          this.page = this.page + 1;
        })
        .catch(() => {
          this.loading = false;
          this.finished = true;
        });
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
  padding: 120px 15px 65px 15px;
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
      .right {
        .top {
          font-size: 13px;
          .level {
            color: #9a9a9a;
          }
        }
        .bottom {
          font-size: 12px;
          color: #9a9a9a;
        }
      }
    }
  }
}
.bottom {
  display: flex;
  position: fixed;
  align-items: center;
  background-color: #fff;
  bottom: 0;
  left: 0;
  padding: 20px 15px;
  width: 100%;
  .left {
    flex: 1;
    .btn {
      width: 240px;
      width: 120px;
      height: 35px;
      background: #ffffff;
      border: 1px solid #ff4e6e;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      color: #ff4e6e;
      font-weight: 500;
    }
  }
  .center {
    .top {
      color: #666666;
      font-size: 12px;
    }
    .sub {
      color: #ff4e6e;
      font-size: 20px;
    }
  }
  .right {
    padding-left: 20px;
    .btn {
      width: 80px;
      height: 35px;
      background: #ff4e6e;
      border-radius: 5px;
      color: #fff;
      font-size: 15px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
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
