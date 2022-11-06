import request from "@/utils/request";

/**
 * @method
 * @returns
 * @description
 */
export function getSourceList(params) {
  return request({
    url: "/wechat/servicehall!microReading.action",
    method: "get",
    params,
  });
}

/**
 * @method
 * @returns
 * @description
 */
export function bindCard(params) {
  return request({
    url: "/wechat/historyjob!bangding.action",
    method: "get",
    params,
  });
}

/**
 * @method
 * @returns
 * @description
 */
export function logut(params) {
  return request({
    url: "/wechat/readcert!ajaxUmreadCertBangdingCon.action",
    method: "get",
    params,
  });
}

/**
 * @method 获取banner 列表
 * @returns
 * @description
 */
export function getBannerList(params) {
  return request({
    url: "/wechat/advertisement!center.action",
    method: "get",
    params,
  });
}

// 获取排行榜

/**
 * @method 获取banner 列表
 * @returns {order_key,clc,max-entry}
 * @description
 */
export function getRankList(params) {
  return request({
    url: "/wechat/advertisement!toploan.action",
    method: "get",
    params,
  });
}

// https://wechatadmin.clcn.net.cn/wechat/advertisement!toploan.action?order_key=toptenw&clc=A&max-entry=2
