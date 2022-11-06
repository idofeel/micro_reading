import { onMounted,  ref } from "vue";
import { getBannerList } from "@/api";

export default function () {
  const bannerList = ref([]);

  const getData = async () => {
    const res = await getBannerList();
    bannerList.value = res.filter(i=>i.isUp === 1);
  };

  const handleBannerUrl = (item)=>{
    window.open(item.url)
  }
  onMounted(getData);

  return {
    bannerList,
    handleBannerUrl
  }
}
