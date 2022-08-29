
<template>
  <div class="box">
    <!-- 轮播图 -->
    <div class="cas">
      <el-carousel indicator-position="outside" height="500px">
        <el-carousel-item v-for="item in imgList" :key="item.carousel_id">
          <img :src="item.imgPath" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <Card :product="productList"></Card>
  <Card :product="television" :list="list" @getList="getList" :currentIndex="currentIndex"></Card>
  <Card :product="parts" :list="partsList" @getParts="getParts" :currentIndex2="currentIndex2"></Card>
   

      <!-- <div class="top">
        <h1>家电</h1>
        <ul>
          <li v-for="(item, index) in list" :key="index">
            <span class="active" @mousemove="getList(index)">{{
              item.name
            }}</span>
          </li>
        </ul>
      </div>

      <div class="goods-box">
        <div class="left">
          <div class="pics">
            <img
              class="pic"
              src="http://101.132.181.9:3000/public/imgs/appliance/appliance-promo1.png"
              alt=""
            />
            <img
              src="http://101.132.181.9:3000/public/imgs/appliance/appliance-promo2.png"
              alt=""
            />
          </div>
        </div>
        <div class="right">
          <el-card v-for="(item, i) in television" :key="i">
            <img
              :src="item.product_picture"
              alt=""
              @click="
                $router.push({
                  name: 'detail',
                  params: { id: item.product_id },
                })
              "
            />
            <p class="name">{{ item.product_name }}</p>
            <p class="title">{{ item.product_title }}</p>
            <p>
              <span class="price">{{ item.product_selling_price }}元</span
              ><del class="del">{{ item.product_price }}元</del>
            </p>
          </el-card>

          <el-card>
            <p class="more">浏览更多 》</p>
          </el-card>
        </div>
      </div> -->

      <!-- <div class="top">
        <h1>配件</h1>
        <ul>
          <li v-for="(item, index) in partsList" :key="index">
            <span class="active" @mouseover="getParts(index)">{{
              item.name
            }}</span>
          </li>
        </ul>
      </div>
      <div class="goods-box">
        <div class="left">
          <div class="pics">
            <img
              class="pic"
              src="http://101.132.181.9:3000/public/imgs/accessory/accessory-promo1.png"
              alt=""
            />
            <img
              src="http://101.132.181.9:3000/public/imgs/accessory/accessory-promo2.png"
              alt=""
            />
          </div>
        </div>
        <div class="right">
          <el-card v-for="item in parts" :key="item.product_id">
            <img
              :src="item.product_picture"
              alt=""
              @click="
                $router.push({
                  name: 'detail',
                  params: { id: item.product_id },
                })
              "
            />
            <p class="name">{{ item.product_name }}</p>
            <p class="title">{{ item.product_title }}</p>
            <p>
              <span class="price">{{ item.product_selling_price }}元</span
              ><del class="del">{{ item.product_price }}元</del>
            </p>
          </el-card>
          <el-card>
            <p class="more">浏览更多 》</p>
          </el-card>
        </div>
      </div>  -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Card from "../components/Card.vue";
export default {
  name: "",
  components: { Card },
  data() {
    return {
      imgList: [],
      // 手机
      productList: [],
      // 电视热门
      television: [],
      list: [
        {
          name: "热门",
          categoryName: ["电视机", "空调", "洗衣机"],
        },
        {
          name: "电视影音",
          categoryName: ["电视机"],
        },
      ],

      partsList: [
        {
          name: "热门",
          categoryName: ["保护套", "保护膜", "充电器", "充电宝"],
        },
        {
          name: "保护套",
          categoryName: ["保护套"],
        },
        {
          name: "充电器",
          categoryName: ["充电器"],
        },
      ],
      // 配件热门
      parts: [],
      currentIndex: 0,
      currentIndex2: 0,
    };
  },
  created() {
    // 获取轮播图
    axios.post("resources/carousel").then((res) => {
      console.log(res);
      this.imgList = res.data.carousel;
    });
    // 获取手机
    axios
      .post("product/getPromoProduct", { categoryName: "手机" })
      .then((res) => {
        console.log(res);
        this.productList = res.data.Product;
      });

    this.getList(), this.getParts();
  },
  mounted() {},
  methods: {
    getList(index) {
      console.log(index);
      this.currentIndex = index;
      // 获取家电热门和电视
      axios
        .post("product/getHotProduct", {
          categoryName: !index
            ? ["电视机", "空调", "洗衣机"]
            : this.list[index].categoryName,
        })
        .then((res) => {
          // console.log(res);
          this.television = res.data.Product;
        });
    },

    getParts(index) {
      this.currentIndex2 = index;
      // 获取配件热门和配件
      axios
        .post("product/getHotProduct", {
          categoryName: !index
            ? ["保护套", "保护膜", "充电器", "充电宝"]
            : this.partsList[index].categoryName,
        })
        .then((res) => {
          // console.log(res);
          this.parts = res.data.Product;
        });
    },
  },
};
</script>
<style scoped lang='scss'>
.box {
  width: 100%;
  background-color: #f5f5f5;
}
.cas {
  width: 100%;
  background-color: white;
}
.el-carousel {
  width: 80%;

  margin-left: 10%;
}
// .el-card:hover {
//   box-shadow: 0 16px 32px 0 rgba(34, 37, 43, 0.375);
//   transform: translate(0, -5px);
//   transition-delay: 0s !important;
// }
// .active:hover {
//   border-bottom: 2px solid #ff6700;
//   color: #ff6700;
// }
// .phone-box {
//   width: 80%;
//   margin-left: 10%;
//   .top {
//     width: 100%;
//     display: flex;
//     justify-content: space-between;

//     ul {
//       display: flex;
//       li {
//         line-height: 95px;
//         margin: 0 15px;
//         span {
//           font-size: 20px;
//         }
//       }
//     }
//   }
//   .more {
//     text-align: center;
//     margin-top: 70%;
//   }
//   h1 {
//     font-weight: 400;
//     margin: 2% 0;
//   }
//   .el-card {
//     text-align: center;

//     img {
//       height: 220px;
//       width: 200px;
//     }
//     .title {
//       color: rgba(128, 128, 128, 0.756);
//       margin: 22px 0;
//     }
//     .name,
//     .title {
//       white-space: nowrap;
//       text-overflow: ellipsis;
//       overflow: hidden;
//     }
//     .price {
//       color: #ff6700;
//       margin-right: 10px;
//     }
//     .del {
//       color: gray;
//     }
//   }
//   .goods-box {
//     width: 100%;
//     height: 800px;
//     display: flex;
//     .left {
//       width: 18%;
//       margin-right: 1%;
//       .pics {
//         img {
//           height: 390px;
//         }
//         .pic {
//           margin-bottom: 20px;
//         }
//       }
//       img {
//         width: 100%;
//         height: 100%;
//       }
//     }
//     .right {
//       width: 81%;
//       display: flex;
//       justify-content: space-around;
//       flex-wrap: wrap;
//       .el-card {
//         width: 24%;
//         margin: 5px 0;
//         // box-shadow: 0 0 0 0.2;
//       }
//     }
//   }
// }
</style>
