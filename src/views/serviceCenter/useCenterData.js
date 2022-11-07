// import { ref } from 'vue'

// import useBannerData from '../useBannerData'
import useHomeData from "../useHomeData";

export default function () {
  const params = { type: 1, stat: 1 };

  const { list: columnList, bannerList, handleBannerUrl } = useHomeData(params);

  return {
    bannerList,
    columnList,
    handleBannerUrl,
  };
}
