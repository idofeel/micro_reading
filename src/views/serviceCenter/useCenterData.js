import { reactive } from "vue";

// import useBannerData from '../useBannerData'
import useHomeData from "../useHomeData";

export default function () {
  const actions = [
    { text: "题名", id: "title" },
    { text: "主题词", id: "sub" },
    { text: "作者", id: "creator" },
    { text: "出版社", id: "lsr03" },
    { text: "ISBN", id: "isb" },
    { text: "全部检索", id: "any" },
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
