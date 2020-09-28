<template>
  <div class="login" @click="handleClick">
    <div class="title">Agent login</div>
    <div class="dis">Log in after the mobile number is bound with the APP, which is faster</div>
    <div class="label">Phone number</div>
    <div class="input-group phone">
      <div class="left">
        <div class="prefix">+86</div>
      </div>
      <input type="number" maxlength="11" class="right" placeholder="please enter" v-model="phone" />
    </div>
    <div class="label two">Verification code</div>
    <div class="input-group code">
      <input v-model="code" class="left" type="number" placeholder="please enter" />
      <div @click="sendCode" :class="['right',sendFlag &&'active']">{{sendFlag?'Obtain':`${countDown}s`}}</div>
    </div>
    <div :class="['login', submitFlag &&'active' ]">Log in</div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Login",
  data() {
    return {
      phone: 123,
      code: null,
      countDown: 60
    };
  },
  computed: {
    submitFlag: function() {
      return this.phone && this.code;
    },
    sendFlag: function() {
      return this.countDown === 60;
    }
  },
  methods: {
    handleClick() {
      // Toast("失败文案");
    },
    submit() {},
    countDownFn() {
      if(this.countDown!==60){
        return
      }
      const timer = setInterval(() => {
        if (this.countDown !== 0) {
          this.countDown = this.countDown - 1;
        } else {
          clearInterval(timer);
          this.countDown = 60;
        }
      }, 1000);
    },
    sendCode() {
      this.countDownFn()
    }
  }
};
</script>

<style scoped lang="less">
.login {
  padding: 15px 20px;
  color: #2e2a2a;
  .title {
    font-size: 24px;
    font-weight: bold;
  }
  .dis {
    font-size: 15px;
    margin-top: 14px;
  }
  .label {
    font-size: 15px;
    margin-top: 42px;
    font-weight: 500;
    &.two {
      margin-top: 25px;
    }
  }
  .input-group {
    height: 50px;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    margin-top: 16px;
    &.phone {
      .left {
        width: 72px;
        display: flex;
        align-items: center;
        .prefix {
          font-size: 16px;
          text-align: center;
          width: 72px;
          color: #2e292a;
          height: 28px;
          line-height: 28px;
          border-right: 1px solid #eee;
        }
      }
      .right {
        flex: 1;
        display: flex;
        padding-left: 10px;
        font-size: 16px;
      }
    }
    &.code {
      .left {
        flex: 1;
        font-size: 16px;
        padding-left: 10px;
      }
      .right {
        width: 90px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: 500;
        background-color: #ccc;
        color: #fff;
        &.active {
          background: #ff4e6e;
          color: #fff;
        }
      }
    }
  }
  .login {
    height: 49px;
    background: #f0f0f0;
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    font-weight: 500;
    font-size: 18px;
    color: #929191;
    &.active {
      background: linear-gradient(0deg, #ff37ab 13%, #ff4975 100%);
      color: #fff;
    }
  }
}
</style>
