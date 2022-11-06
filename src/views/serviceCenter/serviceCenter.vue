<template>
  <div>
    <van-swipe class="home_swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        v-for="i in bannerList"
        :key="i"
        @click="$requestLog({fromUrl: i.url, urlName: i.name, type: 1});handleBannerUrl(i)"
      >
        <van-image class="banner_img" :src="baseUrl + i.picUrl" />
      </van-swipe-item>
    </van-swipe>

    <van-grid :column-num="3">
      <van-grid-item
        v-for="item in columnList"
        :key="item.url"
        :text="item.title"
        @click="$requestLog({fromUrl: item.url, urlName: item.title, type: 1});handleBannerUrl(item)"
      >
        <template v-slot:icon>
          <van-image :src="item.icon" style="width: 49px; height: 42px" />
        </template>
      </van-grid-item>

      <!-- require('../assets/banner/stbanner.jpg') -->
    </van-grid>
    <div style="margin-top: 20px">
      <van-divider
        :style="{
          color: '#1989fa',
          borderColor: '#1989fa',
          padding: '0px 16px',
        }"
        >更多内容,陆续加载中,欢迎关注</van-divider
      >
    </div>
  </div>
</template>

<script>
import useCenterData from "@/views/serviceCenter/useCenterData";

export default {
  setup() {
    const { bannerList, columnList,handleBannerUrl } = useCenterData();

    return {
      baseUrl: process.env.VUE_APP_BASE_URL + "wechat",
      bannerList,
      columnList,
      handleBannerUrl
    };
  },
};
</script>

<style lang="scss" scoped></style>
