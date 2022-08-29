<template>
  <div>
    <div class="top">
      <p>
        <i class="el-icon-shopping-cart-full"></i>
        <span class="myCar">我的购物车</span>
        <span class="tips"
          >温馨提示:产品是否购买成功,以最终下单为准哦,请尽快结算</span
        >
      </p>
    </div>

    
    <div class="empty" v-if="!num">
      <div class="txt">
        <h2>您的购物车还是空的</h2>
        <h3>快去购物吧!</h3>
      </div>
    </div>
   <div v-else>
      <div class="goods-box">
      <ul>
        <li>
          <p class="first">
            <input type="checkbox" :checked="checkAll" @click="selAll" />
            <span>全选</span>
          </p>
          <p class="name">商品名称</p>
          <p class="second">单价</p>
          <p class="num">数量</p>
          <p class="second">小计</p>
          <p class="second">操作</p>
        </li>
        <li v-for="item in $store.state.goodsList" :key="item.id">
          <p class="first">
            <input
              type="checkbox"
              :checked="item.check"
              @click="selOne(item)"
            />
          </p>
          <p class="name">
            <img
              :src="item.productImg"
              alt=""
              @click="
                $router.push({
                  name: 'detail',
                  params: { id: item.product_id },
                })
              "
            />
            <span>{{ item.productName }}</span>
          </p>
          <p class="second">{{ item.price }}元</p>
          <p class="num" @click="changeVal(item)">
            <el-input-number
              v-model="item.num"
              :min="1"
              :max="item.maxNum"
              label="描述文字"
              @change="changeNum"
            ></el-input-number>
          </p>
          <p class="price">{{ item.num * item.price }}元</p>
          <p class="second">
            <i class="el-icon-error" @click="deleteGoods(item)"></i>
          </p>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <div class="left">
        <p class="num1">继续购物</p>
        <p>
          共 <span>{{ $store.getters.totalNum.number }}</span> 件商品,已选择
          <span>{{ $store.getters.selNum }}</span> 件
        </p>
      </div>
      <div class="right">
        <p>
          合计: <span>{{ $store.getters.totalNum.price }}元</span>
        </p>
        <button
          :class="$store.getters.selNum > 0 ? 'oriBtn' : 'grayBtn'"
          @click="settle"
        >
          去结算
        </button>
      </div>
    </div>
   </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "",
  components: {},
  data() {
    return {
      goods: [],
      id: "",
      userId: "",
      checkAll: false,
      bgcActive: false,
      num: 0,
    };
  },
  created() {
    this.getShoppingData();
  },
  mounted() {},

  methods: {
    // 获取购物车商品
    getShoppingData() {
      const user = JSON.parse(localStorage.getItem("user"))
        ? JSON.parse(localStorage.getItem("user"))
        : { userName: "", user_id: "" };
      this.userId = user.user_id;
      axios
        .post("user/shoppingCart/getShoppingCart", { user_id: user.user_id })
        .then((res) => {
          console.log(res);
          this.$store.commit("getGoods", res.data.shoppingCartData);
          this.num = this.$store.state.goodsList.length;
          // this.$store.state.carList.goodsList = res.data.shoppingCartData;
        });
    },
    // 获取商品id
    changeVal(val) {
      this.id = val.productID;
      console.log(this.id);
    },
    // 修改数量
    changeNum(val) {
      axios
        .post("user/shoppingCart/updateShoppingCart", {
          num: val,
          product_id: this.id,
          user_id: this.userId,
        })
        .then((res) => {
          console.log(res);
          this.$notify({
            title: "成功",
            message: "修改数量成功",
            type: "success",
          });
        });
    },

    // 全选
    selAll() {
      this.checkAll = !this.checkAll;
      this.$store.state.goodsList.forEach(
        (item) => (item.check = this.checkAll)
      );
    },
    // 反选
    selOne(val) {
      val.check = !val.check;
      this.checkAll = this.$store.state.goodsList.every((item) => item.check);

      this.bgcActive = true;
    },
    // 删除商品
    deleteGoods(val) {
      console.log(val);
      this.$alert("确定删除吗", {
        confirmButtonText: "确定",
        callback: (action) => {
          axios
            .post("user/shoppingCart/deleteShoppingCart", {
              product_id: val.productID,
              user_id: this.userId,
            })
            .then((res) => {
              console.log(res);
              if (res.data.code == "001") {
                this.getShoppingData();
                this.$notify({
                  title: "成功",
                  message: "删除购物车成功",
                  type: "success",
                });
              }
            });
        },
      });
    },

    // 去结算
    settle() {
      if (this.$store.getters.selNum > 0) {
        this.$router.push('/confirm')
      } else {
        return   this.$notify.error({
          title: '错误',
          message: '请勾选商品后再结算'
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
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
// .active{
//   background-color: #ff6700;
//   color: white;
// }
.bottom {
  width: 96%;
  margin-left: 2%;
  height: 50px;
  line-height: 50px;
  background-color: #eee;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .left,
  .right {
    display: flex;
    align-items: center;
  }
  .left {
    padding-left: 20px;
    .num1 {
      margin-right: 20px;
    }
    p {
      color: gray;
      span {
        color: orangered;
      }
    }
  }
  .right {
    button {
      width: 200px;
      height: 50px;
      border: none;

      margin-left: 30px;
    }
    .oriBtn {
      background-color: #ff6700;
      color: white;
    }
    .grayBtn {
      color: rgba(128, 128, 128, 0.541);
      background-color: #ccc;
    }
    p {
      color: orangered;
      span {
        font-size: 26px;
        font-weight: 400;
      }
    }
  }
}
.goods-box {
  width: 96%;
  margin-left: 2%;
  ul {
    width: 100%;
    background-color: rgb(253, 249, 249);
    padding: 10px;
    margin-top: 20px;
    li {
      width: 100%;
      height: 115px;
      text-align: left;
      line-height: 115px;
      display: flex;
      font-size: 18px;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid rgba(204, 204, 204, 0.703);
      .first {
        width: 10%;
        span {
          margin-left: 10px;
        }
      }
      .name {
        display: inline-block;
        width: 35%;
        display: flex;
        align-items: center;
        font-size: 19px;
        img {
          width: 100px;
          height: 100px;
        }
      }
      .num {
        width: 20%;
      }
      .second,
      .price {
        width: 10%;
      }
      .price {
        color: orangered;
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
  .myCar {
    font-size: 30px;
    margin: 0 15px;
  }
  .tips {
    color: gray;
  }
}
</style>
