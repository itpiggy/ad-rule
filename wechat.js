// ==LoonScript==
// @name        微信朋友圈广告净化 (V3 - 最终版)
// @author      piggy
// @version     3.0
// @description 拦截并屏蔽朋友圈广告资源加载请求。
// @match       ^https?:\/\/mp\.weixin\.qq\.com\/promotion\/
// ==/LoonScript==

// 核心逻辑：
// 既然已经确定所有 /promotion/ 路径下的请求都是广告，
// 我们不再需要解析和修改返回内容。
// 直接返回一个空的响应体，即可彻底屏蔽广告，且性能最高。
// $done({}); 会返回一个空的HTTP 200响应。

$done({}); 