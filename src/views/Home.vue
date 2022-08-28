<template>
  <div class="home">
    <van-swipe class="home_swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="i in 3" :key="i">
        <img class="banner_img" :src="require('../assets/banner/stbanner.jpg')">
      </van-swipe-item>
    </van-swipe>
    <div class="login">
        欢迎您使用首都图书馆数字资源，请先<span class="btn" @click="handleShowLoginDialog">绑定读者证</span>
    </div>
    <van-sticky>
      <van-dropdown-menu>
        <van-dropdown-item title="全语种" ref="item">
          <div style="padding: 5px 16px">
            <van-button type="danger" block round @click="onConfirm">
              确认
            </van-button>
          </div>
        </van-dropdown-item>
        <van-dropdown-item title="全部类别" ref="item">
          <div style="padding: 5px 16px">
            <van-button type="danger" block round @click="onConfirm">
              确认
            </van-button>
          </div>
        </van-dropdown-item>
        <van-dropdown-item title="访问方式" ref="item">
          <div style="padding: 5px 16px">
            <van-button type="danger" block round @click="onConfirm">
              确认
            </van-button>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </van-sticky>

    <van-list
      class="read_list"
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadMore"
    >
      <div v-for="item in list" :key="item" :title="item" class="read_item">
        <div class="read_item_info">
          <div class="left">
            <img
              class="img"
              src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
            />
            <div class="try">试用</div>
          </div>
          <div class="right">
            <div class="van-multi-ellipsis--l2 title">
              这是一段最多显示两行的文字，多余的内容会被省略llllllll这是一段最多显示两行的文字，多余的内容会被省略llllllll
            </div>
            <div>
              <van-tag class="tag" plain type="primary">登录访问</van-tag>
              <van-tag class="tag" plain type="success">未登录访问</van-tag>
            </div>
          </div>
        </div>
        <TextOverflow :text="text" :maxLines="1" class="read_item_desc">
          <template v-slot:default="{ clickToggle, expanded }">
            <div @click="clickToggle" class="btn"> {{ expanded ? "收起" : "展开" }}</div>
          </template>
        </TextOverflow>
      </div>
    </van-list>
    <Login v-model:showLoginModal="showLoginModal"/>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from "vue";
import TextOverflow from "../components/TextOverflow.vue";
import Login from "../components/Login.vue";
export default {
  name: "Home",
  components: { TextOverflow,Login },

  setup() {
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const showLoginModal = ref(false);

    const loadMore = (params) => {
      console.log(params);
      // params 异步更新数据时的参数
      params;

      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          list.value.push(list.value.length + 1);
        }

        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= 40) {
          finished.value = true;
        }
      }, 1000);
    };

    const handleShowLoginDialog= ()=>{
      showLoginModal.value = !showLoginModal.value
    }

    return {
      list,
      loading,
      finished,
      loadMore,
      text: "说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒说是撒",
      showLoginModal,
      handleShowLoginDialog
    };
  },
};
</script>

<style lang="scss">
.home_swipe {
  height: 150px;
}

.banner_img{
  width: 100%;
  height: 161px;
}

.login{
  font-size: 14px;
  text-align: left;
  padding: 10px;
  margin: 10px 0;
}
.read_list {
  padding: 10px 0;
  background: #efefef;

  .read_item {
    padding: 10px;
    background: #fff;
    margin-bottom: 10px;

    &_info {
      display: flex;
      flex-direction: row;
    }
    &_desc {
      margin-top: 10px;
      text-align: left;
    }

    .left {
      width: 144px;
      position: relative;
      .img {
        width: 100%;
        height: 94px;
      }

      .try{
        position: absolute;
        right: 0;
        top: 0;
        padding: 2px 12px;
        color: #fff;
        background: rgba(0,0,0,0.4);
        font-size: 12px;
        border-bottom-left-radius: 8px;
      }
    }

    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      margin-left: 10px;

      .title {
        font-weight: 500;
        text-align: left;
      }

      .tag {
        margin-right: 8px;
      }
    }
  }

}

  .btn{
    padding: 0;
    padding-left: 6px;
    color: var(--van-button-primary-background-color);
  }
</style>
