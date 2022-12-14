import request from "@/utils/request";

/**
 * @method
 * @returns
 * @description
 */
export function accesslog(data) {
  console.log(data);
  return request({
    url: "/wechat/accesslog.action",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: {
      fromUrl: data.fromUrl,
      urlName: data.urlName,
      type: data.type,
    },
  });
}
