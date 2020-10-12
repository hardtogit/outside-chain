<template>
  <div class="login" @click="handleClick">
    <div class="title">Send to email</div>
    <div class="dis">
      We will send the monthly income details to your email. Please set your designated email address.
    </div>
    <div class="label">Email address <span>(Recommend using Gmail)</span></div>
    <div class="input-group phone">
      <input
        type="text"
        maxlength="11"
        class="right"
        placeholder="please enter"
        v-model="email"
      />
    </div>
    <div :class="['login', submitFlag && 'active']" @click="submit">Send</div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        title=""
        show-toolbar
        default-index="36"
        value-key="name"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="closePickerFn"
      />
    </van-popup>
  </div>
</template>

<script>
import { Toast, Picker, Popup } from "vant";
import prefix from "@/assets/js/prefix";
import { request } from "@/utils/request";
export default {
  name: "Login",
  data() {
    return {
      email: '',
      code: null,
      countDown: 60,
      showPicker: false,
      columns: prefix,
      selectPrefix: {
        name: "China",
        value: "CN",
        code: "86",
      },
    };
  },
  components: {
    "van-picker": Picker,
    "van-popup": Popup,
  },
  computed: {
    submitFlag: function () {
      return this.email;
    },
    sendFlag: function () {
      return this.countDown === 60;
    },
  },
  methods: {
    handleClick() {
      // Toast("失败文案");
    },
    showPickerFn() {
      this.showPicker = true;
    },
    closePickerFn() {
      this.showPicker = false;
    },
    submit() {
      if (!this.submitFlag) {
        return;
      }
      request.post("/UserRebateTransactor.createPdfAndSendMail.command", {
        requestType:'form',
      }).then(()=>{
        Toast('Send Success')
      }).catch(()=>{

      });
    },
    countDownFn() {
      const timer = setInterval(() => {
        if (this.countDown !== 0) {
          this.countDown = this.countDown - 1;
        } else {
          clearInterval(timer);
          this.countDown = 60;
        }
      }, 1000);
    },
    onConfirm(e) {
      this.selectPrefix = e;
      this.showPicker = false;
      console.log(e);
    },
    sendCode() {
      if (this.countDown !== 60) {
        return;
      }
      request
        .post("/SmsTransactor.userSignupValidationCode.command", {
          data: {
            data: { mobile: `${this.selectPrefix.code}-${this.mobile}` },
          },
        })
        .then(() => {
          this.countDownFn();
        });
    },
  },
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
    span{
      font-size: 12px;
      color: #666;
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
