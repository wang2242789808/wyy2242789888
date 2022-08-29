
<template>
  <div>
    <div class="top">
      <p>{{ data.product_name }}</p>
      <p class="right">
        <span>概述</span>
        <span>参数</span>
        <span>用户评价</span>
      </p>
    </div>
    <div class="bottom">
      <div class="left">
        <el-carousel height="490px">
          <el-carousel-item v-for="(item, index) in imgs" :key="index">
            <img :src="item.product_picture" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="right">
        <h2>{{ data.product_name }}</h2>
        <p class="intro">{{ data.product_intro }}</p>
        <p class="title">{{ data.product_title }}</p>
        <p class="title1">{{ data.product_selling_price }}元</p>

        <div class="box">
          <p>
            <span>{{ data.product_name }}</span>
            <span>{{ data.product_selling_price }}元</span>
          </p>
          <h2>总计:{{ data.product_selling_price }}元</h2>
        </div>
        <div class="btn-box">
          <button class="car" @click="goCar(data)">加入购物车</button>
          <button class="like" @click="addCollect(data)">喜欢</button>
        </div>
        <ul>
          <li><i class="el-icon-circle-check"></i>小米自营</li>
          <li><i class="el-icon-circle-check"></i>小米发货</li>
          <li><i class="el-icon-circle-check"></i>7天无理由退货</li>
          <li><i class="el-icon-circle-check"></i>7天价格保护</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations, mapState } from "vuex";
export default {
  name: "",
  components: {},
  data() {
    return {
      id: "",
      data: {},
      imgs: [],
    };
  },
  created() {
    this.id = this.$route.params.id;
    axios.post("product/getDetails", { productID: this.id }).then((res) => {
      this.data = res.data.Product[0];
    }),
      axios
        .post("product/getDetailsPicture", { productID: this.id })
        .then((res) => {
          console.log(res);
          this.imgs = res.data.ProductPicture;
        });
  },
  computed: {
    // ...mapState('carList',{
    //   goodsList:state=>state.goodsList
    // }),
    // goodsList:{
    //   set(){
    //   },
    //   get(val){
    //     this.$store.carList.goodsList=val
    //   }
    // }
  },
  mounted() {},
  methods: {
    ...mapMutations("carList", ["toCar"]),
    // 加入购物车
    goCar(val) {
      const user = JSON.parse(localStorage.getItem("user"))
        ? JSON.parse(localStorage.getItem("user"))
        : { userName: "" };
      console.log(user);
      if (user.userName == "") {
        this.$store.state.LoginDialog = true;
      } else {
        axios
          .post("user/shoppingCart/addShoppingCart", {
            user_id: user.user_id,
            product_id: val.product_id,
          })
          .then((res) => {
            console.log(this.$store.state.carList.goodsList);
            this.$notify({
              title: "成功",
              message: "添加购物车成功",
              type: "success",
            });
            const user = JSON.parse(localStorage.getItem("user"))
              ? JSON.parse(localStorage.getItem("user"))
              : { userName: "", user_id: "" };
            this.userId = user.user_id;
            axios
              .post("user/shoppingCart/getShoppingCart", {
                user_id: user.user_id,
              })
              .then((res) => {
                console.log(res);
                this.$store.commit("getGoods", res.data.shoppingCartData);
                this.num = this.$store.state.goodsList.length;
                // this.$store.state.carList.goodsList = res.data.shoppingCartData;
              });
          });
      }
    },
    // 添加收藏
    addCollect(val) {
      const user = JSON.parse(localStorage.getItem("user"))
        ? JSON.parse(localStorage.getItem("user"))
        : { userName: "" };
      console.log(user);
      if (user.userName == "") {
        this.$store.state.LoginDialog = true;
      } else {
        axios
          .post("user/collect/addCollect", {
            user_id: user.user_id,
            product_id: val.product_id,
          })
          .then((res) => {
            this.$notify({
              title: "成功",
              message: "添加收藏成功",
              type: "success",
            });
          });
      }
    },
  },
};
</script>
<style scoped lang='scss'>
.btn-box {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  .car {
    width: 50%;
    background-color: #ff6700;
    margin-right: 30px;
  }
  .like {
    width: 40%;
    background-color: #b0b0b0;
  }
  .like,
  .car {
    height: 50px;
    border-radius: 3px;
    border: none;
    color: white;
  }
}
.bottom {
  width: 100%;
  height: 500px;
  display: flex;
  .left {
    width: 40%;
    img {
      width: 400px;
      height: 400px;
    }
  }
  .right {
    flex: 1;
    .box {
      width: 100%;
      height: 140px;
      background-color: #f9f9fa;
      padding: 30px;
      margin-bottom: 30px;
      p {
        width: 100%;
        display: flex;
        justify-content: space-between;
        color: gray;
      }
      h2 {
        color: #ff6700;
        margin: 10px 0;
      }
    }
    .intro {
      color: rgba(128, 128, 128, 0.721);
      margin: 10px 0;
    }
    .title,
    .title1 {
      color: #ff6700;
      margin: 10px 0;
    }
    .title1 {
      width: 100%;
      padding-bottom: 30px;
      display: inline-block;
      border-bottom: 1px solid #ddd;
    }
    h2 {
      font-weight: 400;
    }
    ul {
      display: flex;
      width: 100%;
      justify-content: flex-start;
      li {
        color: rgba(128, 128, 128, 0.632);
        margin: 0 10px;
      }
    }
  }
}
.top {
  width: 100%;
  height: 64px;
  line-height: 64px;
  background-color: rgba(238, 238, 238, 0.3);
  padding: 0 10px;

  display: flex;
  justify-content: space-between;
  .right {
    span {
      color: gray;
      display: inline-block;
      margin: 0 20px;
    }
  }
}
</style>
