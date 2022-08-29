
<template>
  <div>
    <div class="top">
      <p>
        <i class="el-icon-s-order"></i>
        <span>我的订单</span>
      </p>
    </div>
    <div class="order-box">
      <div class="content-box" v-for="(item, index) in orderList" :key="index">
        <div class="top-txt">
          <span class="order-num">订单编号:{{ item[0].order_id }}</span>
          <span class="order-time"
            >订单时间:{{ new Date(item[0].order_time).toLocaleString() }}</span
          >
        </div>

        <ul>
          <li>
            <p>商品名称</p>
            <p>单价</p>
            <p>数量</p>
            <p>小计</p>
          </li>
          <li v-for="child in item" :key="child.product_id">
            <p>
              <img class="pic" :src="child.product_picture" alt="" />
              <span>{{ child.product_name }}</span>
            </p>
            <p>{{ child.product_price }}元</p>
            <p>{{ child.product_num }}</p>
            <p class="ori-price">
              {{ child.product_price * child.product_num }}元
            </p>
          </li>
        </ul>
        <div class="bottom">
          <p class="left">
            共<span class="txt-num">{{ getNum(index) }}</span
            >件商品
          </p>
          <p class="txt">合计: <span class="big-txt">{{getPrice(index)}}元</span></p>
        </div>
      </div>
    </div>

    <div class="empty" v-show="orderList.length == 0">
      <div class="txt">
        <h2>您的订单还是空的</h2>
        <h3>快去购物吧!</h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  components: {},
  data() {
    return {
      orderList: [],
      secList: [],
    };
  },
  created() {
    axios
      .post("user/order/getOrder", { user_id: this.$store.state.user.user_id })
      .then((res) => {
        console.log(res);
        if (res.data.code == "001") {
          this.orderList = res.data.orders;
        }
      });
  },
  mounted() {},
  methods: {
    getNum(index) {
      let num = 0;
      this.orderList[index].forEach((item) => {
        num += item.product_num;
      });
      return num;
    },
    getPrice(index) {
      let price = 0;
      this.orderList[index].forEach((item) => {
        price += item.product_num * item.product_price;
      });
      return price;
    },
  },
};
</script>
<style scoped lang='scss'>
.order-box {
  width: 100%;
  background-color: #f5f5f5;
  .content-box {
    width: 96%;
    margin: 2%;
    background-color: white;

    .bottom {
      width: 96%;
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      .left {
        width: 100px;
        margin-left: 2%;
        .txt-num {
          color: #ff6f13;
        }
      }
      .txt {
        color: #ff6f13;
        .big-txt {
          font-size: 30px;
        }
      }
    }
    ul {
      width: 100%;
      border-bottom: 1px solid #ff6f13;
      li {
        width: 100%;
        display: flex;
        justify-content: space-around;
        border-bottom: 2px solid #eee;
        height: 100px;
        line-height: 100px;
        .pic {
          width: 80px;
          height: 80px;
          vertical-align: middle;
        }
        .ori-price {
          color: #ff6f13;
        }
      }
    }
    .top-txt {
      border-bottom: 1px solid #ff6f13;
      height: 60px;
      line-height: 60px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      .order-num {
        color: #ff6f13;
        margin-left: 2%;
      }
      .order-time {
        margin-right: 2%;
      }
    }
  }
}
.top {
  width: 100%;
  height: 100px;
  line-height: 120px;
  border-bottom: 2px solid rgba(250, 101, 46, 0.8);
  i {
    color: rgb(250, 99, 44);
    font-size: 30px;
  }
  span {
    font-size: 30px;
    margin: 0 15px;
  }
}
.empty {
  width: 100%;
  min-height: 460px;
  background: url("http://101.132.181.9/img/cart-empty.8b316431.png") no-repeat;
  background-color: #f7f7f7;
  position: relative;

  .txt {
    position: absolute;
    width: 50%;
    right: 5%;
    top: 30%;

    h2 {
      font-size: 40px;
      color: rgba(128, 128, 128, 0.69);
      font-weight: 600;
    }
    h3 {
      color: rgba(128, 128, 128, 0.69);
      font-size: 30px;
      margin: 20px 0;
      font-weight: 300;
    }
  }
}
</style>
