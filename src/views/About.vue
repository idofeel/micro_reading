<template>
  <div>
    {{ value }}
    <a-input v-model="value" :value="value"></a-input>

    <el-input v-model="value" :value="value" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "123",
    };
  },
};
</script>

<style lang="scss" scoped></style>
