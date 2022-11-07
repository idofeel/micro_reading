import { onMounted, ref } from "vue";
import { getBannerList } from "@/api";

export default function (props) {
  const bannerList = ref([]);

  const getData = async () => {
    const res = await getBannerList({ isUp: 1, ...props });
    bannerList.value = res;
  };

  const handleBannerUrl = (item) => {
    window.open(item.url);
  };
  onMounted(getData);

  return {
    bannerList,
    handleBannerUrl,
  };
}
