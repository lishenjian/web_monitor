import getLastEvent from '../utils/getLastEvent';
import getSelector from '../utils/getSelector';
import Tracker from '../utils/sendLog';

export function injectJsError() {
  //监听全局未捕获的错误，如果用try catch 捕获的错误，这里监听不到
  window.addEventListener('error', function(e) {
    let lastEvent = getLastEvent();
    let sendLog = {
      title: "前端监控系统",            //页面标题
      url: "http://localhost:8080/",    //页面url
      timestamp: "",                    //访问时间戳
      kind: "stability",                //大类
      type: "error",                    //小类
      errorType: "jsError",             //错误类型
      message: e.message,                      //类型详情
      filename: e.filename,                     //访问的文件名
      position: `${e.lineno}:${e.colno}`,                     //行列信息
      stack: getStack(e.error.stack),                         //堆栈信息
      selector: lastEvent ? getSelector(lastEvent.path):''         //选择器
    }
    console.log(sendLog);
    Tracker.send(sendLog);
  })
}
// "TypeError: Cannot set property 'a' of undefined\n    at errorClick (http://localhost:8080/:23:27)\n    at HTMLInputElement.onclick (http://localhost:8080/:11:66)"
function getStack(stack) {
  return stack.split('\n').slice(1).map(item=>item.replace(/^\s+at\s+/g, '')).join('$')
}