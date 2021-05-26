import getLastEvent from '../utils/getLastEvent';

export function injectJsError() {
  //监听全局未捕获的错误，如果用try catch 捕获的错误，这里监听不到
  window.addEventListener('error', function(e) {
    let lastEvent = getLastEvent();
    console.log(lastEvent);
    console.log(e);
    let sendLog = {
      title: "前端监控系统",            //页面标题
      url: "http://localhost:8080/",    //页面url
      timestamp: "",                    //访问时间戳
      userAtgent: "chrome",             //用户浏览器类型
      kind: "stability",                //大类
      type: "error",                    //小类
      errorType: "jsError",             //错误类型
      message: e.message,                      //类型详情
      filename: e.filename,                     //访问的文件名
      position: `${e.lineno}:${e.colno}`,                     //行列信息
      stack: getStack(e.error.stack),                         //堆栈信息
      // selector: lastEvent ? getSelector(lastEvent):''         //选择器
    }
    console.log(sendLog);
  })
}
// "TypeError: Cannot set property 'a' of undefined\n    at errorClick (http://localhost:8080/:23:27)\n    at HTMLInputElement.onclick (http://localhost:8080/:11:66)"
function getStack(stack) {
  return stack.split('\n').slice(1).map(item=>item.replace(/^\s+at\s+/g, '')).join('$')
}