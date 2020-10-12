<template>
  <div class="calendar">
    <div :class="['left', lastDisabled && 'disabled']" @click="last">
      <van-icon name="arrow-left" />Last mth
    </div>
    <div class="center">{{ mthMap[mth] }}</div>
    <div :class="['right', nextDisabled && 'disabled']" @click="next">
      Next mth<van-icon name="arrow" />
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { Icon } from "vant";
const mthMap = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};
const agoTime = dayjs().subtract(6, "month");
console.log(agoTime.format("YYYY-MM-DD"));
export default {
  name: "Calendar",
  data() {
    return {
      mth: null,
      mthMap,
      year: dayjs().year(),
    };
  },
  props: {
    onChange: {
      type: "function",
      default: () => {},
    },
  },
  created() {
    this.mth = new Date().getMonth() + 1;
  },
  computed: {
    lastDisabled: function () {
      if (this.year === agoTime.year() && this.mth === agoTime.month() + 2) {
        return true;
      } else {
        return false;
      }
    },
    nextDisabled: function () {
      if (this.year === dayjs().year() && this.mth === dayjs().month() + 1) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    last() {
      if (this.lastDisabled) {
        return;
      }
      if (this.mth - 1 === 0) {
        this.year = this.year - 1;
        this.mth = 12;
      } else {
        this.mth = this.mth - 1;
      }
      const str = dayjs(`${this.year}-${this.mth}-01`).format("YYYY-MM-01");
      // this.onChange(str);
      this.$emit("onChange", str);
    },
    next() {
      if (this.nextDisabled) {
        return;
      }
      if (this.mth + 1 === 13) {
        this.year = this.year + 1;
        this.mth = 1;
      } else {
        this.mth = this.mth + 1;
      }
      const str = dayjs(`${this.year}-${this.mth}-01`).format("YYYY-MM-01");
      // this.onChange(str);
      this.$emit("onChange", str);
      //  this.mth=this.mth+1===13?1:this.mth+1
    },
  },
  components: {
    "van-icon": Icon,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.calendar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  .left {
    display: flex;
    font-size: 15px;
    align-items: center;
    &.disabled {
      color: #999;
    }
  }
  .center {
    width: 129px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffedf0;
    font-size: 20px;
    color: #ff4e6e;
    font-weight: bold;
    border-radius: 5px;
  }
  .right {
    display: flex;
    font-size: 15px;
    align-items: center;
    &.disabled {
      color: #999;
    }
  }
}
</style>
