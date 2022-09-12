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
