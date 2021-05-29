//浏览器检测
let userAgent = require('user-agent');
console.log(userAgent);
// 获取浏览器及用户信息
function getExtraData() {
    return {
        title: document.title,
        url: location.href,
        timestamp: Date.now(),
        userAgent: userAgent.parse(navigator.userAgent),         //用户浏览器类型
    }
}

// 发送日志对象
class SendTracker {
    constructor() {
        //设置 url + ip:port
    }

    send(data = {}) {
        let extraData = getExtraData();
        let sendLog = { ...extraData, ...data};
        console.log(sendLog);
    }
}
export default new SendTracker();