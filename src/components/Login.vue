<template>
  <van-dialog :show="showLoginModal" :showConfirmButton="false">
    <template v-slot:title>
      <div class="login_title">
        <span>读者登录</span>
        <van-icon name="cross" class="close" @click="closeModal" />
      </div>
    </template>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="读者证号"
          placeholder="请输入读者证号"
          :rules="[{ required: true, message: '请输入读者证号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
      </van-cell-group>
      <div style="margin: 40px 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </van-dialog>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    showLoginModal: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const username = ref("");
    const password = ref("");
    const onSubmit = (values) => {
      console.log("submit", values);
    };
    const closeModal = () => {
      context.emit("update:showLoginModal", false);
    };

    return {
      username,
      password,
      onSubmit,
      closeModal,
    };
  },
};
</script>

<style lang="scss" scoped>
.login_title {
  font-size: 24px;
  color: var(--van-button-primary-background-color);
  font-weight: 600;
  text-align: left;
  padding: 10px 16px;
  margin-bottom: 20px;
}

.close{
    color: #222;
    position: absolute;
    right: 20px;
    top:20px;
}
</style>
