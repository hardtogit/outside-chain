<template>
  <div class="calendar">
    <div class="left" @click="last" ><van-icon name="arrow-left" />Last mth</div>
    <div class="center">{{mthMap[mth]}}</div>
    <div class="right" @click="next" >Next mth<van-icon name="arrow" /></div>
  </div>
</template>

<script>
import { Icon } from "vant";
const mthMap={
  1:'January',
  2:'February',
  3:'March',
  4:'April',
  5:'May',
  6:'June',
  7:'July',
  8:'August',
  9:'September',
  10:'October',
  11:'November',
  12:'December'
}
export default {
  name: "Calendar",
  data() {
    return {
      mth:null,
      mthMap
    };
  },
  props:{
    onChange:{
      type:'function',
      default:()=>{}
    }
  },
  created(){
    this.mth= new Date().getMonth()+1
  },
  methods:{
    last(){
        this.mth=this.mth-1===0?12:this.mth-1
    },
    next(){
       this.mth=this.mth+1
    }
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
  }
  .center {
    width: 129px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffedf0;
    font-size: 20px;
    color: #FF4E6E;
    font-weight: bold;
    border-radius: 5px;
  }
  .right {
    display: flex;
    font-size: 15px;
    align-items: center;
  }
}
</style>
