import getLastEvent from '../utils/getLastEvent';
import getSelector from '../utils/getSelector';
import Tracker from '../utils/sendLog';

export function injectJsError() {
  //监听全局未捕获的错误，如果用try catch 捕获的错误，这里监听不到
  window.addEventListener("error", (e)=> {
    let lastEvent = getLastEvent();
    let sendLog = null;
    console.log(e);
    //脚本资源加载错误
    if(e.target && (e.target.src || e.target.href)) {
      sendLog = {
        kind: "stability",                //大类
        type: "error",                    //小类
        errorType: "resourceError",                             //资源加载错误  js、css
        filename: e.target.src || e.target.href,                //访问的文件名
        tagName: e.target.tagName,                              //行列信息
        selector: getSelector(e.path)   //选择器
      }
    }else {
      sendLog = {
        kind: "stability",                //大类
        type: "error",                    //小类
        errorType: "jsError",             //错误类型
        message: e.message,                                     //类型详情
        filename: e.filename,                                   //访问的文件名
        position: `${e.lineno}:${e.colno}`,                     //行列信息
        stack: getStack(e.error.stack),                         //堆栈信息
        selector: lastEvent ? getSelector(lastEvent.path):''    //选择器
      }
    }
    Tracker.send(sendLog);
  }, true)

  //监听 promise 错误
  window.addEventListener('unhandledrejection', (event)=>{
    console.log(event)
    let lastEvent = getLastEvent();
    let filename;
    let line = 0;
    let column = 0;
    let stack;
    let reason = event.reason;
    let message;
    
    if(typeof reason === 'string') {
      message = reason;
      //promise reject 错误没有 stack 和 filename
      filename = location.href;
    }else if(typeof reason === 'object') {
      if(reason.stack) {
        let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
        console.log(matchResult);
        filename = matchResult[1];
        line = matchResult[2];
        column = matchResult[3];
      }
      message = reason.message;
      stack = getStack(reason.stack)
    }
    let sendLog = {
      kind: "stability",                //大类
      type: "error",                    //小类
      errorType: "promiseError",             //错误类型
      message: message,                      //类型详情
      filename: filename,                     //访问的文件名
      position: `${line}:${column}`,                     //行列信息
      stack: stack,                         //堆栈信息
      selector: lastEvent ? getSelector(lastEvent.path):''         //选择器
    }
    Tracker.send(sendLog);
  }, true)
}
// "TypeError: Cannot set property 'a' of undefined\n    at errorClick (http://localhost:8080/:23:27)\n    at HTMLInputElement.onclick (http://localhost:8080/:11:66)"
function getStack(stack) {
  return stack.split('\n').slice(1).map(item=>item.replace(/^\s+at\s+/g, '')).join('$')
}