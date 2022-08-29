<template>
  <div>
    <div class="top">
      <p>
        <i class="el-icon-reading"></i>
        <span>我的收藏</span>
      </p>
    </div>

    <div class="empty" v-show="!num">
      <div class="txt">
        <h2>您的收藏还是空的</h2>
        <h3>快去购物吧!</h3>
      </div>
    </div>
    
    <div class="box">
      <el-card
        v-for="item in $store.state.carList.collectList"
        :key="item.product_id"
      >
        <span class="del-x" v-show="flag">X</span>
        <img :src="item.product_picture" alt="" @mousemove="showDel"  @click="
            $router.push({ name: 'detail', params: { id: item.product_id } })
          " />
        <p class="name">{{ item.product_name }}</p>
        <p class="title">{{ item.product_title }}</p>
        <p>
          <span class="price">{{ item.product_selling_price }}元</span
          ><del class="del">{{ item.product_price }}元</del>
        </p>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "",
  components: {},
  data() {
    return {
      num: 0,
      flag: false,
    };
  },
  computed: {
    //   ...mapState('carList',{
    //       collectList:state=>state.collectList
    //   })
  },
  created() {
    axios
      .post("user/collect/getCollect", {
        user_id: JSON.parse(localStorage.getItem("user")).user_id,
      })
      .then((res) => {
        console.log(res);
        this.$store.state.carList.collectList = res.data.collectList;
        this.num = this.$store.state.carList.collectList.length;
        console.log(this.num);
      });
  },
  mounted() {},
  methods: {
    showDel() {
      this.flag = true;
      console.log(1);
    },
  },
};
</script>
<style scoped lang="scss">
.el-card:hover {
  box-shadow: 0 16px 32px 0 rgba(34, 37, 43, 0.375);
  transform: translate(0, -3px);
  transition-delay: 0s !important;
}
.box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .el-card {
    text-align: center;
    width: 20%;
    margin: 10px;
    position: relative;
    .del-x {
      position: absolute;
      top: 10px;
      right: 10px;
    }
    img {
      height: 220px;
      width: 200px;
    }
    .title {
      color: rgba(128, 128, 128, 0.756);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin: 22px 0;
    }
    .price {
      color: #ff6700;
      margin-right: 10px;
    }
    .del {
      color: gray;
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
