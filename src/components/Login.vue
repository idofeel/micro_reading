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
          v-model="fromData.borId"
          name="borId"
          placeholder="请输入读者证号"
          :rules="[{ required: true, message: '请输入读者证号' }]"
        />
        <van-field
          v-model="fromData.borPassword"
          type="password"
          name="borPassword"
          placeholder="密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
      </van-cell-group>
      <div style="margin: 40px 16px">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          :loading="loading"
          loading-text="绑定中..."
        >
          提交
        </van-button>
      </div>
    </van-form>
  </van-dialog>
</template>

<script>
import { reactive, computed, ref } from "vue";
import { useStore } from "vuex";
import { bindCard } from "@/api";
import { Toast } from "vant";
export default {
  props: {
    showLoginModal: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const store = useStore();

    const loading = ref(false);

    const openId = computed(() => store.state.openId);

    const fromData = reactive({
      openId,
      borId: "",
      borPassword: "",
    });

    const onSubmit = async (values) => {
      if (loading.value) return;
      loading.value = true;
      console.log(values);
      try {
        const pass = await bindCard({ ...values, openId });
        if (pass) {
          context.emit("success");
          closeModal();
        } else {
          Toast("登录失败");
        }
      } catch (error) {
        Toast("登录失败");
      } finally {
        loading.value = false;
      }
    };

    const closeModal = () => {
      context.emit("update:showLoginModal", false);
    };

    return {
      fromData,
      loading,
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

.close {
  color: #222;
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>
