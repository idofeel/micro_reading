<template>
  <div class="home">
    <van-swipe class="home_swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="i in 3" :key="i">
        <img
          class="banner_img"
          :src="require('../assets/banner/stbanner.jpg')"
        />
      </van-swipe-item>
    </van-swipe>
    <div class="login">
      欢迎您使用首都图书馆数字资源，请先<span
        class="btn"
        @click="handleShowLoginDialog"
        v-if="!isLogin"
        >绑定读者证</span
      >
      <span class="btn" v-else>查看我的二维码读者证</span>
    </div>
    <van-sticky>
      <van-dropdown-menu>
        <van-dropdown-item title="全语种" ref="langRef">
          <div class="check_box">
            <van-button
              class="check_btn"
              type="primary"
              size="small"
              :plain="checkedParams.languages.length !== 0"
              @click="checkedParams.languages.length = 0"
              >全部</van-button
            >

            <van-button
              class="check_btn"
              type="primary"
              size="small"
              v-for="i in languages"
              :plain="!checkedParams.languages.includes(i)"
              @click="toggleLangChecked(i)"
              :key="i"
              >{{ i }}</van-button
            >
          </div>
          <div style="padding: 5px 16px">
            <van-button type="danger" block round @click="onConfirm(langRef)">
              确认
            </van-button>
          </div>
        </van-dropdown-item>
        <van-dropdown-item title="全部类别" ref="tagRef">
          <div class="check_box">
            <van-button
              class="check_btn"
              type="primary"
              size="small"
              :plain="checkedParams.tagsNames.length !== 0"
              @click="checkedParams.tagsNames.length = 0"
              >全部</van-button
            >
            <van-button
              class="check_btn"
              type="primary"
              size="small"
              v-for="i in tagsNames"
              :key="i"
              :plain="!checkedParams.tagsNames.includes(i)"
              @click="toggleTagChecked(i)"
              >{{ i }}</van-button
            >
          </div>
          <div style="padding: 5px 16px">
            <van-button type="danger" block round @click="onConfirm(tagRef)">
              确认
            </van-button>
          </div>
        </van-dropdown-item>
        <van-dropdown-item title="访问方式" ref="itemRef">
          <div class="check_box">
            <van-button
              class="check_btn"
              type="primary"
              size="small"
              :plain="checkedParams.displayNames.length !== 0"
              @click="checkedParams.displayNames.length = 0"
              >全部</van-button
            >
            <van-button
              class="check_btn"
              type="primary"
              size="small"
              v-for="i in displayNames"
              :key="i"
              :plain="!checkedParams.displayNames.includes(i)"
              @click="toggleDisplayChecked(i)"
              >{{ i }}</van-button
            >
          </div>
          <div style="padding: 5px 16px">
            <van-button type="danger" block round @click="onConfirm(itemRef)">
              确认
            </van-button>
          </div>
        </van-dropdown-item>
        <!-- <van-dropdown-item title="访问方式" ref="itemRef">
          <van-cell center title="登录访问">
            <template #right-icon>
              <van-switch
                v-model="displayNames[0]"
                size="24"
                active-color="#ee0a24"
              />
            </template>
          </van-cell>
          <van-cell center title="未登录访问">
            <template #right-icon>
              <van-switch
                v-model="displayNames[1]"
                size="24"
                active-color="#ee0a24"
              />
            </template>
          </van-cell>
          <div style="padding: 5px 16px">
            <van-button type="danger" block round @click="onConfirm(itemRef)">
              确认
            </van-button>
          </div>
        </van-dropdown-item> -->
      </van-dropdown-menu>
    </van-sticky>

    <van-list
      class="read_list"
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadMore"
    >
      <div
        v-for="item in list"
        :key="item"
        :title="item"
        class="read_item"
        @click="openTarget(item)"
      >
        <div class="read_item_info">
          <div class="left">
            <img class="img" :src="baseUrl + item.picUrl" />
            <div class="try" v-if="item.isTry === 1">试用</div>
          </div>
          <div class="right">
            <div class="van-multi-ellipsis--l2 title">
              {{ item.shortName }}
            </div>
            <div>
              <van-tag
                class="tag"
                plain
                type="primary"
                v-if="item.displayName === '0'"
                >登录访问</van-tag
              >
              <van-tag class="tag" plain type="success" v-else
                >未登录访问</van-tag
              >
            </div>
          </div>
        </div>
        <TextOverflow
          :text="item.resume || ''"
          :maxLines="1"
          class="read_item_desc"
        >
          <template v-slot:default="{ clickToggle, expanded }">
            <div @click="clickToggle" class="btn">
              {{ expanded ? "收起" : "展开" }}
            </div>
          </template>
        </TextOverflow>
      </div>
    </van-list>
    <Login v-model:showLoginModal="showLoginModal" />
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, computed } from "vue";
import TextOverflow from "../components/TextOverflow.vue";
import Login from "../components/Login.vue";
import useHomeData from "./useHomeData";
import { useStore } from "vuex";

export default {
  name: "Home",
  components: { TextOverflow, Login },

  setup() {
    // const list = ref([]);
    const showLoginModal = ref(false);
    const itemRef = ref(null);
    const tagRef = ref(null);
    const langRef = ref(null);

    const {
      list,
      loading,
      finished,
      displayNames,
      languages,
      tagsNames,
      checkedParams,
      filterData,
      toggleLangChecked,
      toggleTagChecked,
      toggleDisplayChecked,
    } = useHomeData();

    const store = useStore();

    const isLogin = computed(() => store.state.isLogin);

    // const loadMore = (params) => {
    //   console.log(params);
    //   // params 异步更新数据时的参数
    //   params;

    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       list.value.push(list.value.length + 1);
    //     }

    //     // 加载状态结束
    //     loading.value = false;

    //     // 数据全部加载完成
    //     if (list.value.length >= 40) {
    //       finished.value = true;
    //     }
    //   }, 1000);
    // };

    const handleShowLoginDialog = () => {
      showLoginModal.value = !showLoginModal.value;
    };

    const onConfirm = (name) => {
      filterData();
      name.toggle();
    };

    const openTarget = (item) => {
      if (item.displayName === "0" && !isLogin.value){
        handleShowLoginDialog();
      }else{
        window.open(item.url);
      }
    };

    return {
      itemRef,
      langRef,
      tagRef,

      loading,
      finished,
      list,
      showLoginModal,
      displayNames,
      languages,
      tagsNames,
      checkedParams,
      handleShowLoginDialog,
      toggleLangChecked,
      toggleTagChecked,
      onConfirm,
      openTarget,
      toggleDisplayChecked,
      isLogin,
      baseUrl: "/wechat",
    };
  },
};
</script>

<style lang="scss">
.home {
  text-align: left;
}
.home_swipe {
  height: 150px;
}

.banner_img {
  width: 100%;
  height: 161px;
}

.login {
  font-size: 14px;
  text-align: left;
  padding: 10px;
  margin: 10px 0;
}
.read_list {
  padding: 10px 0;
  background: #f2f2f2;

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

      .try {
        position: absolute;
        right: 0;
        top: 0;
        padding: 2px 12px;
        color: #fff;
        background: rgba(0, 0, 0, 0.4);
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
.check_box {
  padding: 15px;
}
.check_btn {
  margin-right: 15px !important;
  margin-top: 10px !important;
}

.btn {
  padding: 0;
  padding-left: 6px;
  color: var(--van-button-primary-background-color);
}
</style>
