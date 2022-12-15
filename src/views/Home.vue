<template>
  <div class="home">
    <van-sticky>
      <div style="background: #fff">
        <van-swipe class="home_swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item
            v-for="i in bannerList"
            :key="i"
            @click="
              $requestLog({ fromUrl: i.url, urlName: i.name, type: 0 });
              handleBannerUrl(i);
            "
          >
            <van-image class="banner_img" :src="baseUrl + i.picUrl" />
          </van-swipe-item>
        </van-swipe>
       <Login ref="loginRef" @success="loginSucess" />
        <van-dropdown-menu>
          <van-dropdown-item
            title="全语种"
            :title-class="params.languages.length !== 0 ? 'drop_item' : ''"
            ref="langRef"
          >
            <div class="check_box">
              <!-- <van-button
                class="check_btn"
                type="primary"
                size="small"
                :plain="checkedParams.languages.length !== 0"
                @click="checkedParams.languages.length = 0"
                >全部</van-button
              > -->

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
          <van-dropdown-item
            title="全部类别"
            :title-class="params.tagsNames.length !== 0 ? 'drop_item' : ''"
            ref="tagRef"
          >
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
              >
                {{ i }}</van-button
              >
            </div>
            <div style="padding: 5px 16px">
              <van-button type="danger" block round @click="onConfirm(tagRef)">
                确认
              </van-button>
            </div>
          </van-dropdown-item>
          <van-dropdown-item
            title="访问方式"
            ref="itemRef"
            :title-class="params.displayNames.length !== 0 ? 'drop_item' : ''"
          >
            <div class="check_box">
              <!-- <van-button
                class="check_btn"
                type="primary"
                size="small"
                :plain="checkedParams.displayNames.length !== 0"
                @click="checkedParams.displayNames.length = 0"
                >全部</van-button
              > -->
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
      </div>
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
            <div>
              <div class="van-multi-ellipsis--l2 title">
                {{ item.shortName }}
              </div>
            </div>
            <div>
              <van-tag class="tag" plain type="warning" v-if="item.languages">{{
                item.languages
              }}</van-tag>
              <van-tag class="tag" plain color="#7232dd" v-if="item.tagName">{{
                item.tagName
              }}</van-tag>

              <van-tag
                class="tag"
                plain
                type="primary"
                v-if="item.displayName === '0'"
                >登录访问
              </van-tag>
              <van-tag class="tag" plain type="success" v-else
                >免登录访问</van-tag
              >
            </div>
            <div style="margin-bottom: 6px">
              <!-- align-self: flex-end; -->
              <span
                class="link"
                @click.stop="item.visible = !item.visible"
                v-if="item.resume"
                >{{ item.visible ? "收起简介" : "查看简介" }}</span
              >
            </div>
          </div>
        </div>
        <transition name="van-slide-down">
          <div class="read_item_desc" v-show="item.visible">
            {{ item.resume }}
          </div>
        </transition>

        <!-- <TextOverflow
          :text="item.resume || ''"
          :maxLines="1"
          class="read_item_desc"
        >
          <template v-slot:default="{ clickToggle, expanded }">
            <div @click.stop="clickToggle" class="btn">
              {{ expanded ? "收起" : "展开" }}
            </div>
          </template>
        </TextOverflow> -->
      </div>
    </van-list>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, computed } from "vue";
// import TextOverflow from "../components/TextOverflow.vue";
import Login from "../components/Login.vue";
import useHomeData from "./useHomeData";
import { useStore } from "vuex";
// import { useRoute } from "vue-router";

export default {
  name: "Home",
  components: { Login },

  setup() {
    const store = useStore();
    // const { query } = useRoute();
    // if (query.openId) {
    //   store.commit("saveOpenId", query.openId);
    // }

    // const list = ref([]);
    const showLoginModal = ref(false);
    const itemRef = ref(null);
    const tagRef = ref(null);
    const langRef = ref(null);
    const tempUrl = ref(null);
    const loginRef = ref(null);

    const {
      list,
      bannerList,
      loading,
      finished,
      displayNames,
      languages,
      tagsNames,
      checkedParams,
      params,
      filterData,
      toggleLangChecked,
      toggleTagChecked,
      toggleDisplayChecked,
      getData,
      log,
    } = useHomeData({ type: 0, stat: 0 });

    const isLogin = computed(() => store.getters["isLogin"]);


    const onConfirm = (name) => {
      filterData();
      name.toggle();
    };

    const openTarget = (item) => {
      log(item.url, item.shortName);
      console.log(item);
      if (item.displayName === "0" && !isLogin.value) {
       loginRef.value.handleShowLoginDialog();
        tempUrl.value = item.url;
      } else {
        window.open(item.url);
      }
    };

  

    const loginSucess = () => {
      getData();
      if (tempUrl.value) {
        window.location.href = tempUrl.value;
      }
    };


    const handleBannerUrl = (item) => {
      window.open(item.url);
    };

    return {
      itemRef,
      langRef,
      tagRef,
      loginRef,

      loading,
      finished,
      list,
      bannerList,
      showLoginModal,
      displayNames,
      languages,
      tagsNames,
      checkedParams,
      params,
      handleBannerUrl,
      toggleLangChecked,
      toggleTagChecked,
      onConfirm,
      openTarget,
      toggleDisplayChecked,
      loginSucess,
      baseUrl: process.env.VUE_APP_BASE_URL + "wechat",
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
    background: #fff;
    margin-bottom: 10px;

    &_info {
      padding: 10px;
      display: flex;
      flex-direction: row;
      position: relative;
      z-index: 2;
      background: #fff;
    }
    &_desc {
      // margin-top: 10px;
      padding: 0 10px 10px;
      text-align: left;
      font-size: 14px;
    }

    .left {
      width: 144px;
      position: relative;
      .img {
        width: 100%;
        height: 94px;
        border-radius: 8px;
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
        font-weight: 600;
        text-align: left;
        // margin-bottom: 8px;
      }

      .tag {
        margin-right: 8px;
      }

      .link {
        color: var(--van-button-primary-background-color);
        font-size: 14px;
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

.drop_item:after {
  border-color: transparent transparent var(--van-primary-color)
    var(--van-primary-color) !important;
}
</style>
