<template>
  <div class="rank_list">
    <van-search
      v-model="params.clc"
      placeholder="请输入分类号"
      show-action
      clearable
      @search="getData"
      @blur="getData"
    >
      <template #action>
        <div @click="getData">搜索</div>
      </template>
    </van-search>
    <van-dropdown-menu>
      <van-dropdown-item
        v-model="params.orderKey"
        :options="option1"
        @change="getData"
      />
      <van-dropdown-item
        v-model="params.maxEntry"
        :options="option2"
        @change="getData"
      />
    </van-dropdown-menu>

    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in rankList"
        :key="item"
        :title="`${index + 1}. ${item.bookNames}`"
        :value="`借阅：${item.count}次`"
        value-class="cell_value"
      />
    </van-list>
  </div>
</template>

<script>
import useRankData from "./useRankData";

export default {
  setup() {
    const option1 = [
      { text: "全部时间", value: "" },
      { text: "最近一年", value: "topteny" },
      { text: "最近一季", value: "toptens" },
      { text: "最近一月", value: "toptenm" },
      { text: "最近一周", value: "toptenw" },
    ];
    const option2 = [
      { text: "全部记录", value: "" },
      { text: "Top 10", value: "10" },
      { text: "Top 20", value: "20" },
      { text: "Top 50", value: "50" },
    ];

    const { rankList, params, getData, finished, loading } = useRankData();

    return {
      rankList,
      params,
      getData,
      finished,
      loading,

      option1,
      option2,
    };
  },
};
</script>

<style lang="scss" scoped>
.rank_list {
  text-align: left;
}
/deep/.cell_value {
  max-width: 100px;
  font-size: 12px;
}
</style>
