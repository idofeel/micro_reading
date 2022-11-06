import { ref, onMounted, reactive } from "vue";
import { getRankList } from "@/api";

export default function () {
  const rankList = ref([]);
  const params = reactive({
    orderKey: "",
    clc: "",
    maxEntry: "",
  });
  const finished = ref(false);
  const loading = ref(false);

  const getData = async () => {
    rankList.value = [];

    if (loading.value) return;
    loading.value = true;
    finished.value = false;

    const res = await getRankList({
      order_key: params.orderKey,
      clc: params.clc,
      max_entry: params.maxEntry,
    });
    rankList.value = res;

    finished.value = true;
    loading.value = false;
  };

  onMounted(getData);
  return { rankList, params, loading, finished, getData };
}
