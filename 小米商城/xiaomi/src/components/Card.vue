
<template>
  <div>
    <div class="phone-box">
      <div class="top">
        <h1>手机</h1>

        <ul v-show="list != undefined && list.length == 2">
          <li v-for="(item, index) in list" :key="index">
            <span
              :class="{ active: currentIndex == index }"
              @mousemove="getList(index)"
              >{{ item.name }}</span
            >
          </li>
        </ul>
        <ul v-show="list != undefined && list.length == 3">
          <li v-for="(item, index) in list" :key="index">
            <span
              :class="{ active: currentIndex2 == index }"
              @mousemove="getParts(index)"
              >{{ item.name }}</span
            >
          </li>
        </ul>
      </div>
      <div class="goods-box">
        <div class="left" >
          <img
            src="http://101.132.181.9:3000/public/imgs/phone/phone.png"
            alt=""
          />
        </div>
        <div class="left" >
          <div class="pics" v-show="list != undefined && list.length == 2">
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
         <div class="left" >
          <div class="pics" v-show="list != undefined && list.length == 3">
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
          <el-card v-for="(item, index) in product" :key="index">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product", "list", "currentIndex", "currentIndex2"],
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    getList(index) {
      this.$emit("getList", index);
    },
    getParts(index) {
      this.$emit("getParts", index);
    },
  },
};
</script>
<style scoped lang='scss'>
.el-card:hover {
  box-shadow: 0 16px 32px 0 rgba(34, 37, 43, 0.375);
  transform: translate(0, -5px);
  transition-delay: 0s !important;
}
.active {
  border-bottom: 2px solid #ff6700;
}
.phone-box {
  width: 80%;
  margin-left: 10%;
  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    ul {
      display: flex;
      li {
        line-height: 95px;
        margin: 0 15px;
        span {
          font-size: 20px;
        }
      }
    }
  }
  .more {
    text-align: center;
    margin-top: 70%;
  }
  h1 {
    font-weight: 400;
    margin: 2% 0;
  }
  .el-card {
    text-align: center;

    img {
      height: 220px;
      width: 200px;
    }
    .title {
      color: rgba(128, 128, 128, 0.756);
      margin: 22px 0;
    }
    .name,
    .title {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .price {
      color: #ff6700;
      margin-right: 10px;
    }
    .del {
      color: gray;
    }
  }
  .goods-box {
    width: 100%;
    height: 800px;
    display: flex;
    .left {
      width: 18%;
      margin-right: 1%;
      .pics {
        img {
          height: 390px;
        }
        .pic {
          margin-bottom: 20px;
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      width: 81%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .el-card {
        width: 24%;
        margin: 5px 0;
        // box-shadow: 0 0 0 0.2;
      }
    }
  }
}
</style>
