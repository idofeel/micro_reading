import { onBeforeMount, computed, reactive, ref, toRefs } from "vue";
import { getSourceList } from "@/api";

const fakeData = {
  micresourceList: [
    {
      tagName: "数据事实",
      shortName: "抗“疫”专题",
      url: "http://wechatadmin.clcn.net.cn/wechat/index!showNews.action?newsId=449",
      picUrl: "/category/2021-12-23/20211223145316249.jpeg",
      resume: "",
      displayOrder: 1001,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: "中文",
      isTry: 0,
      id: 29,
      displayName: "1",
    },
    {
      tagName: "影音听书",
      shortName: "思政",
      url: "http://wxsz.gxsentu.net/h5/",
      picUrl: "/category/2021-11-23/20211123114858347.png",
      resume: null,
      displayOrder: 1011,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: null,
      isTry: 0,
      id: 1,
      displayName: "0",
    },
    {
      tagName: "图书",
      shortName: "掌阅电子书",
      url: "",
      picUrl: "/category/2021-11-23/20211123115043497.jpeg",
      resume: null,
      displayOrder: 1012,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: null,
      isTry: 0,
      id: 2,
      displayName: "0",
    },
    {
      tagName: "图书",
      shortName: "读秀",
      url: "http://yz4.chaoxing.com/circlemarket/index?channelId=52&name=%E5%9B%BE%E4%B9%A6&fidEnc=0e645763276ac2af",
      picUrl: "/category/2021-11-23/20211123115306324.jpeg",
      resume: null,
      displayOrder: 1013,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: null,
      isTry: 0,
      id: 3,
      displayName: "0",
    },
    {
      tagName: "双语阅读",
      shortName: "Ebook Central</br>电子书",
      url: "https://ebookcentral.proquest.com/auth/lib/clcncn",
      picUrl: "/category/2021-11-23/20211123122200793.jpeg",
      resume: null,
      displayOrder: 1023,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: null,
      isTry: 0,
      id: 6,
      displayName: "0",
    },
    {
      tagName: "期刊",
      shortName: "Emerald管理学</br>全文期刊库",
      url: "http://www.emerald.com/insight",
      picUrl: "/category/2021-12-16/20211216164410870.jpeg",
      resume: "",
      displayOrder: 1024,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: "英文",
      isTry: 0,
      id: 28,
      displayName: "1",
    },
    {
      tagName: "影音听书",
      shortName: "库客音乐",
      url: "http://ms.kuke.com/#index?mac=cc:79:cf:0e:27:ed",
      picUrl: "/category/2021-11-23/20211123122028351.png",
      resume: null,
      displayOrder: 1031,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: null,
      isTry: 0,
      id: 7,
      displayName: "0",
    },
    {
      tagName: "影音听书",
      shortName: "知识视界",
      url: "https://reading.libvideo.com/?lib=D5D0075E9DDDCD9AEDB3041AAA4DB6E0",
      picUrl: "/category/2021-11-23/20211123122036961.png",
      resume: null,
      displayOrder: 1032,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: null,
      isTry: 0,
      id: 8,
      displayName: "0",
    },
    {
      tagName: "影音听书",
      shortName: "云图有声",
      url: "https://wechatadmin.clcn.net.cn/clickServlet?start=8&redirectUrl=aHR0cDovL3l1bnR1d2VjaGF0Lnl1bnR1eXMuY29tL2luZGV4L01UQTQvTVRJeQ==",
      picUrl: "/category/2021-11-23/20211123122045132.png",
      resume: null,
      displayOrder: 1033,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: null,
      isTry: 0,
      id: 9,
      displayName: "0",
    },
    {
      tagName: "图书",
      shortName: "QQ阅读",
      url: "http://wechatadmin.clcn.net.cn/clickServlet?start=8&redirectUrl=aHR0cDovL2ppbmdoZWN4LmNvbS9yZWFkLmh0bWw/cz1jbGNuJmw9MQ==",
      picUrl: "/category/2021-11-23/20211123121812558.jpeg",
      resume: null,
      displayOrder: 1041,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: null,
      isTry: 0,
      id: 10,
      displayName: "0",
    },
    {
      tagName: "报刊",
      shortName: "龙源",
      url: "https://sdtsg.dps.qikan.cn/api/Authentification/DSWeChatForSub?serviceid=C4D727A6-FD36-4A47-969A-B51744041BE5",
      picUrl: "/category/2021-12-16/20211216164453904.jpeg",
      resume: null,
      displayOrder: 1042,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: null,
      isTry: 0,
      id: 11,
      displayName: "0",
    },
    {
      tagName: "图书",
      shortName: "中华连环画",
      url: "http://wx.zhlhh.com/clcnlib/",
      picUrl: "/category/2021-11-23/20211123121840229.jpeg",
      resume: null,
      displayOrder: 1043,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: null,
      isTry: 0,
      id: 12,
      displayName: "0",
    },
    {
      tagName: "图书",
      shortName: "畅想之星",
      url: "",
      picUrl: "/category/2021-11-23/20211123121856981.jpeg",
      resume:
        "畅想之星电子书是和出版社深度合作，面向图书馆建立一个集版权管理、新书发布、电子书采购、销售、借阅与知识发现于一体的综合性服务平台。已经有380余家供货商入驻，提供电子图书包含三大品类：中文电子书、古籍电子书和民国电子书，总数量超过34万品种。涉及学科包括哲学、经济学、法学、教育学",
      displayOrder: 1051,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: "中文",
      isTry: 0,
      id: 13,
      displayName: "0",
    },
    {
      tagName: "少儿",
      shortName: "乐儿智慧王国",
      url: "http://sdwx.atleer.com/",
      picUrl: "/category/2021-11-23/20211123122053836.png",
      resume:
        "乐儿智慧王国是澳通乐儿自主研发的原创少儿数字资源库，由科普动漫数据库、互动学习动漫数据库、视频体验学习库、电子书悦读等版块组成。数字资源内容采用情景化学习、多元互动、动画+品牌IP+真人演示等特色形式，向少儿趣味讲解多种类知识，帮助孩子在兴趣中提升能力及建立知识体系，陪伴孩子开启",
      displayOrder: 1052,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: "中文",
      isTry: 0,
      id: 14,
      displayName: "0",
    },
    {
      tagName: "影音听书",
      shortName: "VR全景视频库",
      url: "https://360readtree-test.expreader5g.net/shouDuTuShuGuan/h5/index.html#/video/list",
      picUrl: "/category/2021-11-23/20211123122103227.png",
      resume: null,
      displayOrder: 1053,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: null,
      isTry: 0,
      id: 15,
      displayName: "0",
    },
    {
      tagName: "图书",
      shortName: "疫情防控公</br>益知识库",
      url: "http://lib-yq.museum.chaoxing.com/html/yqknowledge/",
      picUrl: "/category/2021-11-23/20211123121938873.jpeg",
      resume: null,
      displayOrder: 1062,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: null,
      isTry: 0,
      id: 16,
      displayName: "1",
    },
    {
      tagName: "图书",
      shortName: "网络书香</br>阅见美好",
      url: "http://wechatadmin.clcn.net.cn/wechat/read/images/wangluoshuxiang.jpg",
      picUrl: "/category/2021-11-23/20211123121949650.jpeg",
      resume: null,
      displayOrder: 1063,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: null,
      isTry: 0,
      id: 17,
      displayName: "1",
    },
    {
      tagName: "多媒体",
      shortName: "若存体育-赛事视频资源库（试用）",
      url: "http://www.sportsfans.cn/sdlib",
      picUrl: "/category/2021-11-23/20211123122342199.png",
      resume:
        "“若存体育-赛事视频资源库”是体育项目最丰富、视频时间最长、视频时间跨度最大的唯一一家以完整体育赛事视频为主的体育视频资源库。",
      displayOrder: 1072,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: "中文",
      isTry: 1,
      id: 20,
      displayName: "1",
    },
    {
      tagName: "数值事实",
      shortName: "中国思想与文化名家数据库（试用）",
      url: "http://cnthinkers.com/#/?code=82aac96e540d54a37839fe2bd2d021e0",
      picUrl: "/category/2021-11-23/20211123122444674.jpeg",
      resume: null,
      displayOrder: 1081,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: null,
      isTry: 0,
      id: 24,
      displayName: "1",
    },
    {
      tagName: "数值事实",
      shortName: "中国审判案例数据库（试用）",
      url: "http://www.chncase.cn/#/index?code=f71f8d729cc870411007581611d643b8",
      picUrl: "/category/2021-11-23/20211123122454683.jpeg",
      resume:
        "中国审判案例数据库是集案例、法律法规等资源的检索、阅读、研究于一体的法律应用案例平台。",
      displayOrder: 1082,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: "中文",
      isTry: 1,
      id: 25,
      displayName: "1",
    },
    {
      tagName: "少儿",
      shortName: "阿咘手绘百科（试用）",
      url: "http://zgdl.wap.shbk.tech/home/custome/sdtsg",
      picUrl: "/category/2021-11-23/20211123122505347.jpeg",
      resume:
        "《阿咘手绘百科》是以地理历史人文百科手绘为主体，以专题手绘定制为特色的综合性百科类数据库产品及服务平台。",
      displayOrder: 1083,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: "中文",
      isTry: 0,
      id: 26,
      displayName: "1",
    },
    {
      tagName: "少儿",
      shortName: "书童AR互动科普教育资源库（试用）",
      url: "http://office.hist.cc:88/mz/",
      picUrl: "/category/2021-12-28/20211228114656646.png",
      resume:
        "书童AR互动科普，是一款专为图书馆研发并充分服务PC端、移动端和微信端联动阅读的创新型高新技术科普资源数据库，丰富的馆内外阅读服务模式，通过电脑、微信和APP均可实现立体交互阅读。",
      displayOrder: 1090,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: "中文",
      isTry: 1,
      id: 21,
      displayName: "1",
    },
    {
      tagName: "多媒体",
      shortName: "Artlib《世界艺术鉴赏库》（试用）",
      url: "http://artlib.cn:9090/bridge/index?lib=8a98a68a64b6c41b01659ee908bb61ee",
      picUrl: "/category/2022-06-30/20220630135839685.png",
      resume:
        "Artlib《世界艺术鉴赏库》是一个满足互联网+时代全方位艺术鉴赏需求的产品，收录高清图片并处于实时更新状态，涵盖油画、素描、版画、水彩、国画、书法、壁画、雕塑、篆刻、建筑艺术及其他类型，包含艺术普及、艺术故事、艺术品、艺术家、艺术机构、资讯六大内容模块。具有：知识系统组织、内容",
      displayOrder: 1095,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: "中文",
      isTry: 1,
      id: 38,
      displayName: "1",
    },
    {
      tagName: "图书",
      shortName: "中华诗词库平台（试用）",
      url: "https://zhsck.cxcwwlkj.com/?tokenAuth=Mzk3OTI1MjY1ODM1NzA4NDMzY3hjdzIwMjAy",
      picUrl: "/category/2022-07-26/20220726182814835.jpeg",
      resume:
        "“晨星创文•中华诗词库平台”是一个集文献、教育、阅读、竞赛为一体的中国传统文化在线学习平台。我们把传统文化中的诗词曲赋都收录在内，为诗词学习者和爱好者提供一个全面、丰富的数字诗词阅读平台，我们希望能在现代化快节奏的生活之外，在工作学习的闲暇之余，培养市民综合素养和人文精神，寥寥数",
      displayOrder: 1096,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: "中文",
      isTry: 1,
      id: 39,
      displayName: "1",
    },
    {
      tagName: "多媒体",
      shortName: "口语伙伴（试用）",
      url: "http://calis.isayb.com/?z=do&ac=clcnautologin",
      picUrl: "/category/2022-03-30/20220330200712494.jpeg",
      resume:
        "口语伙伴交互式外语学习数据库是数字图书馆建设中的新型多媒体学习资源。",
      displayOrder: 1103,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: "中文",
      isTry: 1,
      id: 35,
      displayName: "1",
    },
    {
      tagName: "图书",
      shortName: "地方典籍数据库（北京）（试用）",
      url: "http://ssbybj.com:8101/",
      picUrl: "/category/2022-03-30/2022033020080910.jpeg",
      resume:
        "“地方典籍数据库”收录北京地方古籍文献178种，其中方志53种、地方诗文总集2种、家谱8种、综合地方文献115种，20G。此后还将持续更新文献数据，优化库内整体架构，定期发布最新成果，最大限度地完成互联网大数据交互服务。 “地方典籍数据库—北京”以北京地方文献为核心，专注于古籍文",
      displayOrder: 1104,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: "中文",
      isTry: 1,
      id: 36,
      displayName: "1",
    },
    {
      tagName: "多媒体",
      shortName: "网上报告厅（试用）",
      url: "https://wb.wap.bjadks.com//autologin/index?gid=2258",
      picUrl: "/category/2022-03-30/20220330200847256.png",
      resume:
        "《网上报告厅》聚集了近139万分钟的视频学习资源，其中包含了营销、医学、健康、文史、外语、体育、农林、理工、就业择业、经管、教育培训、法律视点、党政14大学术报告系列及旅游地理、军事、探索发现、对话4大学术鉴赏系列。全平台资源覆盖12个学科体系，92个学科类，506个专业。形成了",
      displayOrder: 1105,
      stat: 0,
      parentId: 1,
      isUp: 0,
      languages: "中文",
      isTry: 1,
      id: 37,
      displayName: "1",
    },
  ],
  userinfo: null,
};

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
    displayNames: ["登录", "不登录"], // [0] 登录 [1] 不登录
    tagsNames: [],
    languages: [],
  });

  const loading = ref(true);
  const finished = ref(false);

  const setLoading = (bl) => (loading.value = !!bl);
  const setFinished = (bl) => (finished.value = !!bl);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await getSourceList();
      response.list = res.micresourceList;
    } catch (error) {
      console.log(error);
      response.list = fakeData.micresourceList;
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

  return {
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
  };
}
