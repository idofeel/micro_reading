import { onBeforeMount, computed, reactive, ref, toRefs } from "vue";
import { getSourceList } from "@/api";
import { accesslog } from "@/api/log.js";

import { useStore } from "vuex";

import useBannerData from "./useBannerData";

export default function () {
  const response = reactive({
    list: [],
    params: {
      // displayName: ["0", "1"],
      displayNames: [],
      tagsNames: [],
      languages: [],
    },
    checkedParams: {
      displayNames: [],
      tagsNames: [],
      languages: [],
    },
    displayNames: ["登录", "免登录"], // [0] 登录 [1] 不登录
    tagsNames: [],
    languages: [],
  });
  const store = useStore();

  const loading = ref(true);
  const finished = ref(false);

  const setLoading = (bl) => (loading.value = !!bl);
  const setFinished = (bl) => (finished.value = !!bl);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await getSourceList();
      response.list = res.micresourceList.map((i) => {
        return {
          ...i,
          visible: false,
        };
      });
      if (res.userinfo) {
        store.commit("saveUser", res.userinfo);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setFinished(true);

      const types = response.list.map((i) => i.tagName).filter((i) => i);
      response.tagsNames = Array.from(new Set(types));

      const languages = response.list.map((i) => i.languages).filter((i) => i);
      response.languages = Array.from(new Set(languages));
    }
  };

  const filterData = () => {
    // response.params.displayNames = response.displayNames.map((item, index) => {
    //   return item ? index + "" : -1;
    // });

    response.params.displayNames = response.checkedParams.displayNames.slice(0);
    response.params.tagsNames = response.checkedParams.tagsNames.slice(0);
    response.params.languages = response.checkedParams.languages.slice(0);
  };

  const toggleDisplayChecked = (i) => {
    let { displayNames } = response.checkedParams;
    if (displayNames.includes(i)) {
      response.checkedParams.displayNames = displayNames.filter((n) => n !== i);
    } else {
      displayNames.push(i);
    }
  };
  const toggleLangChecked = (i) => {
    let { languages } = response.checkedParams;
    if (languages.includes(i)) {
      response.checkedParams.languages = languages.filter((n) => n !== i);
    } else {
      languages.push(i);
    }
  };

  const toggleTagChecked = (i) => {
    let { tagsNames } = response.checkedParams;
    if (tagsNames.includes(i)) {
      response.checkedParams.tagsNames = tagsNames.filter((n) => n !== i);
    } else {
      tagsNames.push(i);
    }
  };

  // tagName
  // languages

  onBeforeMount(getData);

  function log(url = "", name = "") {
    accesslog({
      fromUrl: url,
      urlName: name.trim(),
      type: 0,
    });
  }

  const { bannerList } = useBannerData();

  return {
    bannerList,
    log,
    loading,
    finished,
    ...toRefs(response),
    list: computed(() => {
      let { displayNames, tagsNames, languages } = response.params;
      console.log(languages, tagsNames, displayNames);
      return response.list.filter((i) => {
        let tags = true;
        if (tagsNames.length > 0) {
          tags = tagsNames.includes(i.tagName);
        }

        let langs = true;
        if (languages.length > 0) {
          langs = languages.includes(i.languages);
        }

        let dNames = true;
        if (displayNames.length > 0) {
          dNames = displayNames
            .map((i) => String(response.displayNames.indexOf(i)))
            .includes(i.displayName);
        }
        return dNames && tags && langs;
      });
    }),
    filterData,
    toggleLangChecked,
    toggleTagChecked,
    toggleDisplayChecked,
    getData,
  };
}

// $(document).ready(function(){
//   $("a").click(function(){
//       var title="";
//       if (this.title){
//           title=this.title
//       }else {
//           title=this.text
//       }
//       $.ajax({
//           type: 'POST',
//           url:"https://wechatadmin.clcn.net.cn/wechat/accesslog.action",
//           data:{"fromUrl":this.href,"urlName":title.trim()},
//           async:false});
//   });
// });

// function loginfoTo(url,title) {
//   console.log(title);
//   $.ajax({
//       url:"https://wechatadmin.clcn.net.cn/wechat/accesslog.action",
//       data:{"fromUrl":url,"urlName":title.trim()},
//       async:false});
// }
