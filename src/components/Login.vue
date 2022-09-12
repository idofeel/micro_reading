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

    const paramsStr = window.location.search.substring(1);
    const queryList = paramsStr.split("&");
    const query = {};
    //
    queryList.forEach((i) => {
      const [key, value] = i.split("=");
      query[key] = value;
    });

    if (query.openId) {
      store.commit("saveOpenId", query.openId);
    }

    const loading = ref(false);

    const isLogin = computed(() => store.state.isLogin);
    console.log("isLogin", isLogin);

    const fromData = reactive({
      openId: query.openId,
      borId: "",
      borPassword: "",
    });

    const onSubmit = async (values) => {
      loading.value = true;
      try {
        const pass = await bindCard(values);
        if (pass) {
          store.commit("login", true);
          closeModal();
        } else {
          Toast("登录失败");
        }
      } catch (error) {
        console.log(error);
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
