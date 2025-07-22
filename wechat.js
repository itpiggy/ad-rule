// ==LoonScript==
// @name 微信朋友圈广告净化 (自用维护版)
// @author piggy & AI
// @version 2.0
// @description 实时清洗朋友圈信息流中的广告内容。
// @match ^https?:\/\/mp\.weixin\.qq\.com\/mp\/getappmsgad
// ==/LoonScript==

// $response 是 Loon 提供的包含服务器响应的对象
// $done 是 Loon 提供的用于结束脚本并返回结果的函数

// 1. 获取原始的响应体（服务器返回的数据）
let body = $response.body;

// 2. 尝试将 JSON 文本解析为 JavaScript 对象
try {
    let data = JSON.parse(body);

    // 3. 核心清洗逻辑：过滤广告条目
    // 检查是否存在 appmsglist 数组，这是朋友圈内容的列表
    if (data.appmsglist) {
        // 使用 filter 方法创建一个新的数组，只保留那些“不是广告”的条目
        // 根据最新分析，广告条目通常包含一个名为 "ad_info" 的对象。
        // 我们就以 "ad_info" 是否存在作为判断广告的依据。
        data.appmsglist = data.appmsglist.filter(item => !item.ad_info);
    }

    // 4. 将修改后的 JavaScript 对象转换回 JSON 文本
    body = JSON.stringify(data);
    
    console.log("微信朋友圈广告净化成功，已移除广告条目。");

} catch (e) {
    // 如果解析失败（比如返回的不是标准的JSON），则不做任何修改，防止出错
    console.log("微信朋友圈广告净化脚本：解析JSON失败，跳过处理。错误信息：" + e);
}

// 5. 使用 $done() 函数，将处理过（或未处理）的 body 返回给微信App
$done({ body });
