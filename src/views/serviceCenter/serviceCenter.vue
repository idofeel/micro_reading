<template>
  <div>
    <van-swipe class="home_swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="i in bannerList" :key="i" @click="
          $requestLog({ fromUrl: i.url, urlName: i.name, type: 1 });
          handleBannerUrl(i);
        ">
        <van-image class="banner_img" :src="baseUrl + i.picUrl" />
      </van-swipe-item>
    </van-swipe>
   <Login />
    <van-search v-model="submitParams.value" show-action label="地址" placeholder="请输入搜索关键词"
      @search="onSearch">
      <template #label>
        <van-popover v-model:show="showPopover" :actions="actions" @select="onSelect"
          placement="bottom-start" theme="dark">
          <template #reference>
            <div>
              {{ submitParams.text }}
              <van-icon name="arrow-down" />
            </div>
          </template>
        </van-popover>
      </template>
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <!-- onsubmit="loginfoTo('/wechat/wxbanding!opacbook.action','首页OPAC查询')" -->
    <form name="addForm" v-show="false" id="addForm1" action="/wechat/primobook!opacbook.action"
      method="post">
      <input type="text" name="allover" :value="submitParams.key" />
      <input type="text" name="keyword" :value="submitParams.value" />
       <input value="STE,ST,CLCN_EBOOK" name="scope"/>
    </form>
    <van-grid :column-num="3">
      <van-grid-item v-for="item in columnList" :key="item.id" :text="item.shortName" @click="
          $requestLog({ fromUrl: item.url, urlName: item.title, type: 1 });
          handleBannerUrl(item);
        ">
        <template v-slot:icon>
          <van-image :src="baseUrl + item.picUrl" style="width: 49px; height: 42px" />
        </template>
      </van-grid-item>

      <!-- require('../assets/banner/stbanner.jpg') -->
    </van-grid>
    <div style="margin-top: 20px">
      <van-divider :style="{
          color: '#1989fa',
          borderColor: '#1989fa',
          padding: '0px 16px',
        }">更多内容,陆续加载中,欢迎关注</van-divider>
    </div>
  </div>
</template>

<script>
import useCenterData from '@/views/serviceCenter/useCenterData';
import { ref, getCurrentInstance } from 'vue';

import Login from '@/components/Login.vue';

export default {
  components: { Login },
  setup() {

    const {
      bannerList,
      columnList,
      handleBannerUrl,
      submitParams,
      actions,
      onSelect,
    } = useCenterData();
    const { proxy } = getCurrentInstance();
    const showPopover = ref(false);

    const onSearch = () => {
      proxy.$requestLog({
        fromUrl: '/wechat/primobook!opacbook.action',
        urlName: '首页OPAC查询',
        type: 1,
      });
      document.getElementById('addForm1').submit();
    };

    return {
      baseUrl: process.env.VUE_APP_BASE_URL + 'wechat',
      bannerList,
      columnList,
      handleBannerUrl,
      actions,
      showPopover,
      onSelect,
      submitParams,
      onSearch,
    };
  },
};
</script>

<style lang="scss" scoped></style>
