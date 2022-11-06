import { ref } from "vue";

import useBannerData from "../useBannerData";

export default function () {
  const columnList = ref([
    {
      url: "http://clcn.jingshicorp.com/clickServlet?start=8&redirectUrl=aHR0cDovL3N4c3Qudy5jaGluZXNlYWxsLmNu",
      title: "中文在线",
      icon: require('../../assets/center/read-dianzi.png'),
    },
    {
      url: "https://clcn.overdrivechina.cn/",
      title: "Overdrive",
      icon: require('../../assets/center/read-ebook.png'),

    },
    {
      url: "http://clcn.jingshicorp.com/clickServlet?start=8&r…1d2VjaGF0Lnl1bnR1eXMuY29tL2luZGV4L01UQTQvTVRJeQ==",
      title: "云图有声",
      icon: require('../../assets/center/read-listen.png'),

    },
    {
      url: "http://clcn.jingshicorp.com/clickServlet?start=8&r…waG9uZS5kb29sYW5kLmNvbS9jbGNud3ovaW5kZXguaHRtbA==",
      title: "读览天下",
      icon: require('../../assets/center/read-journal.png'),

    },
    { url: "http://wx.zhlhh.com/clcnlib/", title: "中华连环画",
    icon: require('../../assets/center/read-comic.png'),
  },
    {
      url: "http://ms.kuke.com/#index?mac=cc:79:cf:0e:27:ed",
      title: "库客音乐",
    icon: require('../../assets/center/read-music.png'),

    },
    {
      url: "http://clcn.jingshicorp.com/clickServlet?start=8&r…tL2FwaS9hdXRoZW50aWZpY2F0aW9uL2Rzd2VjaGF0Zm9yc3Vi",
      title: "龙源",
    icon: require('../../assets/center/read-search.png'),

    },
    {
      url: "http://clcn.jingshicorp.com/clickServlet?start=8&r…hbWU9RDVEMDA3NUU5REREQ0Q5QUVEQjMwNDFBQUE0REI2RTA=",
      title: "知识视界",
    icon: require('../../assets/center/read-video.png'),

    },
    {
      url: "http://clcn.jingshicorp.com/clickServlet?start=8&r…vL3Nwc2NpLmNvbS5jbi9yZWFkLmh0bWw/cz1jbGNuJmw9MQ==",
      title: "QQ阅读",
      icon: require('../../assets/center/read-journal.png'),

    },
    {
      url: "https://mp.weixin.qq.com/s?__biz=MzI0MzQ1NjI2Mg==&…c775512b4e1f433c6df993c249ca2ce2eff27312b68ac0#rd",
      title: "客户端",
      icon: require('../../assets/center/read-app.png'),

    },
  ]);

  const { bannerList, handleBannerUrl } = useBannerData();

  return {
    bannerList,
    columnList,
    handleBannerUrl
  };
}
