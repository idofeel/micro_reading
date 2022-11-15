import { reactive } from "vue";

// import useBannerData from '../useBannerData'
import useHomeData from "../useHomeData";

export default function () {
  const actions = [
    { text: "提名", id: "wti" },
    { text: "关键词", id: "wrd" },
    { text: "作者", id: "wau" },
    { text: "出版社", id: "wpu" },
    { text: "ISBN", id: "isb" },
  ];

  const submitParams = reactive({
    key: "",
    value: "",
    text: "",
  });

  const onSelect = (e) => {
    submitParams.key = e.id;
    submitParams.text = e.text;
  };

  onSelect(actions[0]);

  const params = { type: 1, stat: 1 };

  const { list: columnList, bannerList, handleBannerUrl } = useHomeData(params);

  return {
    bannerList,
    columnList,
    handleBannerUrl,
    actions,
    submitParams,
    onSelect,
  };
}
