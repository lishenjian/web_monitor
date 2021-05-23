export function injectJsError() {
  //监听全局未捕获的错误，如果用try catch 捕获的错误，这里监听不到
  window.addEventListener('error', function(e) {
    console.log(e);
  })
}