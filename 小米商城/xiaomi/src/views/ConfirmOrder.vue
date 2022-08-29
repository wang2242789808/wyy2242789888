
<template>
  <div class="confirm">
    <HeaderIcon :data="data"></HeaderIcon>
    <div class="confirm-content">
      <div class="confirm-address">
        <p>收货地址</p>
        <ul>
          <li>
            <h2>陈同学</h2>
            <p class="phone">13580018623</p>
            <p class="address">广东 广州市 白云区 江高镇 广东白云学院</p>
          </li>
          <li>
            <h2>陈同学</h2>
            <p class="phone">13580018623</p>
            <p class="address">广东 茂名市 化州市 杨梅镇 ***</p>
          </li>
          <li class="add-address">
            <div>
              <i class="el-icon-circle-plus-outline"></i>
              <p>添加新地址</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="confirm-goods">
        <p class="title">商品及优惠卷</p>
        <div class="goods-list">
          <ul>
            <li
              v-for="item in $store.state.goodsList.filter(
                (item) => item.check
              )"
            >
              <div class="goods-list-Img">
                <img :src="item.productImg" alt="" />
                <span>{{ item.productName }}</span>
              </div>
              <div>{{ item.price }} * {{ item.num }}</div>
              <div style="color: #ff6700">{{ item.price * item.num }} 元</div>
            </li>
          </ul>
        </div>
        <div class="confirm-shipment">
          <p class="title">配送方式</p>
          <p class="shipment">包邮</p>
        </div>
        <div class="section-invoice">
          <p class="title">发票</p>
          <p class="invoice">电子发票</p>
          <p class="invoice">个人</p>
          <p class="invoice">商品明细</p>
        </div>
      </div>
      <div class="section-count">
        <div class="money-box">
          <ul>
            <li>
              <span class="title">商品件数：</span>
              <span class="value">{{totalNum.number}}件</span>
            </li>
            <li>
              <span class="title">商品总价：</span>
              <span class="value">{{totalNum.price}}元</span>
            </li>
            <li>
              <span class="title">活动优惠：</span>
              <span class="value">-0元</span>
            </li>
            <li>
              <span class="title">优惠券抵扣：</span>
              <span class="value">-0元</span>
            </li>
            <li>
              <span class="title">运费：</span>
              <span class="value">0元</span>
            </li>
            <li class="total">
              <span class="title">应付总额：</span>
              <span class="value">
                <span class="total-price">{{totalNum.price}}</span> 元</span
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="section-bar">
        <div class="btn">
          <button class="btn-base btn-return" @click="$router.push('/car')">
            返回购物车
          </button>
          <button class="btn-base btn-primary" @click="settlement">结算</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderIcon from "../components/HeaderIcon.vue";
import axios from 'axios'
export default {
  name: "",
  components: { HeaderIcon },
  data() {
    return {
      data: {
        icon: "el-icon-s-order",
        title: "确认订单",
      },
      selList:[]
    };
  },
  created() {},
  mounted() {},
  computed:{
      totalNum(){
          this.selList=this.$store.state.goodsList.filter(item =>item.check)
          return this.selList.reduce((total,cur)=>{
              total.number+=cur.num
              total.price+=cur.num*cur.price
              return total
          },{number:0,price:0})
      }
  },
  methods: {
    settlement() {
      const user = JSON.parse(localStorage.getItem("user"))
        ? JSON.parse(localStorage.getItem("user"))
        : { userName: "", user_id: "" };
        
      axios
        .post("/user/order/addOrder", {
          user_id: user.user_id,
          products: this.$store.state.goodsList.filter((item) => item.check),
        })
        .then((res) => {
          // console.log(res);
          if ((res.data.code = "001")) {
          this.$router.push('/order')
            this.$notify({
              title: "成功",
              message: res.data.msg,
              type: "success",
            });
          } else {
            this.$notify.error({
              title: "失败",
              message: res.data.msg,
              type: "error",
            });
          }
        });
    },
  },
};
</script>
<style scoped lang='scss'>
.section-bar {
  padding: 20px 48px;
  border-top: 2px solid #f5f5f5;
  overflow: hidden;
  .btn {
    float: right;
  }
  .btn-return {
    width: 100px;
    height: 40px;
    background-color: #fff;
    border: 1px solid #aaa;
    color: #aaa;
    margin: 0 10px;
  }
  .btn-primary {
    background: #ff6700;
    border-color: #ff6700;
    color: #fff;
    width: 100px;
    height: 40px;
    border: 0;
  }
}
.section-count {
  padding: 20px 0;
  overflow: hidden;
  .money-box {
    float: right;
    text-align: right;
    ul {
      display: block;
      list-style-type: disc;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      padding-inline-start: 40px;
      li {
        display: list-item;
        text-align: -webkit-match-parent;
        .title {
          float: left;
          width: 126px;
          height: 30px;
          display: block;
          line-height: 30px;
          color: #757575;
        }
        .value {
          float: left;
          min-width: 105px;
          height: 30px;
          display: block;
          line-height: 30px;
          color: #ff6700;
          .total-price {
            font-size: 30px;
          }
        }
      }
    }
  }
}
.section-invoice {
  padding: 25px 0;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
  .title {
    float: left;
    width: 150px;
    color: #333;
    font-size: 18px;
    line-height: 38px;
  }
  .invoice {
    float: left;
    line-height: 38px;
    font-size: 14px;
    margin-right: 20px;
    color: #ff6700;
  }
}
.confirm-shipment {
  padding: 25px 0;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
  .title {
    float: left;
    width: 150px;
    color: #333;
    font-size: 18px;
    line-height: 38px;
  }
  .shipment {
    float: left;
    line-height: 38px;
    font-size: 14px;
    color: #ff6700;
  }
}
.confirm-goods {
  .goods-list {
    padding: 5px 0;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    ul {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .goods-list-Img {
          display: flex;
          align-items: center;
          img {
            width: 50px;
          }
        }
      }
    }
  }
  .title {
    color: #333;
    font-size: 18px;
    line-height: 40px;
  }
}
.confirm-address {
  ul {
    margin: 20px 0;
    display: flex;
    li {
      color: #333;
      width: 220px;
      height: 178px;
      border: 1px solid #e0e0e0;
      padding: 15px 24px 0;
      margin-right: 17px;
      margin-bottom: 24px;
      h2 {
        font-size: 18px;
        font-weight: 400;
        line-height: 30px;
        margin-bottom: 10px;
      }
      .phone {
        font-size: 14px;
        color: #757575;
      }
      .address {
        padding: 10px 0;
        max-width: 180px;
        max-height: 88px;
        line-height: 22px;
        font-size: 14px;
        color: #757575;
      }
    }
    .add-address {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 25px;
      p {
        font-size: 16px;
      }
    }
  }
}
.confirm-content {
  padding: 20px;
  background-color: #fff;
  margin: 20px;
}

.confirm {
  background-color: #f5f5f5;
}
</style>
