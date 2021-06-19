# 前端监控

## 前端监控目标
### 稳定性
* js 错误（未捕获的错误）
  
  > JS执行错误或者 promise 异常
* 资源异常
  
  > script、link等资源加载异常
* 接口错误
  
  > ajax或fetch请求接口异常
* 白屏
  
  > 页面空白
### 用户体验
指各个阶段的加载时间
* TTFB（time to first byte）首字节时间
  
  > 指浏览器发起第一个请求到数据返回第一个字节所消耗的时间，这个时间包含了网络请求时间、后端处理时间
  
* FP（First paint）首次绘制时间
  
  > 首次绘制包含了任何用户自定义的背景绘制，它是将第一个像素点绘制到屏幕的时间
  
* FCP（First content paint）首次内容绘制
  
  > 首次内容绘制是浏览器将第一个DOM渲染到屏幕的时间，可以是任何文本、图像、SVG等的时间
  
* FMP（First Meaningful Paint）首次有意义绘制
  
  > 首次有意义绘制是页面可用性的量度标准
  
* FID（First inlut delay）首次输入延迟

  > 用户首次和页面交互到页面响应交互的时间

* 卡顿 
  
  > 超过50ms 的长任务


### 业务
* PV  Page View 即页面浏览量或点击量
* UV  指访问某个站点的不同IP地址的人数
* 页面的停留时间

## 前端监控流程
* 前端埋点
* 数据上报
* 分析和计算 将采集到的数据进行加工汇总
* 可视化展示 将数据按各种维度进行展示
* 监控报警 发现问题后按一定的条件出发报警
### 常见的埋点方案
#### 代码埋点
* 以嵌入代码的形式进行埋点，比如需要监控用户的点击事件，会选择在用户点击时插入一段代码，保存这个监听行为或者直接将监听行为以某一种数据格式直接传给服务器端。
* 优点是可以在任意时刻，精确的发送或保存所需要的数据信息
* 缺点是工作量大

#### 可视化埋点
* 通过可视化交互的手段，代替代码埋点
* 将业务代码和埋点代码分离，提供一个可视化的交互页面，输入为业务代码，通过这个可视化的系统，可以在业务代码中自定义增加埋点事件等等，最后输出的代码耦合了业务代码和埋点代码
* 可视化埋点其实是用系统来代替手工插入埋点代码
#### 无痕埋点
* 前端的任意一个事件都被绑定一个标识，所有的事件都被记录下来
* 通过定期上传记录文件，配合文件解析，解析出来我们想要的数据，并生成可视化报告供专业人员分析
* 无痕埋点的优势是采集全量数据，不会出现漏埋和误埋等现象
* 缺点是给数据传输和服务器增加压力，也无法灵活定制数据结构

## 监控 sdk 
  > user-agent npm 包 是用作把浏览器的UserAgent变成一个对象
  > webpack 5* + webpack-cli 4*   webpack-dev-server 配置 webpack serve 启动命令
### 错误分类
#### js 错误



#### promise 异常



####  资源异常

处理 script 脚本时遇到，error 事件没有监听到的情况，后来发现 使用 webpack 打包使用  HtmlWebpackPlugin  时配置问题导致

```javascript
plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'head'	//此处会将 script 会插入 head 头部，然而 script 会添加 defer 属性，会取消 阻塞
    })
 ]
```



#### 接口异常

### 异常错误 数据结构
* jsError
```javascript
{
  "title": "前端监控系统",            //页面标题
  "url": "http://localhost:8080/",    //页面url
  "timestamp": "",                    //访问时间戳
  "userAtgent": "chrome",             //用户浏览器类型
  "kind": "stability",                //大类
  "type": "error",                    //小类
  "errorType": "jsError",             //错误类型
  "message": "",                      //类型详情
  "filename": "",                     //访问的文件名
  "position": "0:0",                  //行列信息
  "stack": "",                        //堆栈信息
  "selector": ""                      //选择器
}
```
* promiseError
```javascript
{
  "title": "前端监控系统",            //页面标题
  "url": "http://localhost:8080/",    //页面url
  "timestamp": "",                    //访问时间戳
  "userAtgent": "chrome",             //用户浏览器类型
  "kind": "stability",                //大类
  "type": "error",                    //小类
  "errorType": "promiseError",        //错误类型
  "message": "",                      //类型详情
  "filename": "",                     //访问的文件名
  "position": "0:0",                  //行列信息
  "stack": "",                        //堆栈信息
  "selector": ""                      //选择器
}
```
* 接口 error

```js
{
  "title": "前端监控系统",            	//页面标题
  "url": "http://localhost:8080/",    	//页面url
  "timestamp": "",                    	//访问时间戳
  "userAtgent": "chrome",            	//用户浏览器类型
  "kind": "stability",               	//大类
  "type": "error",                    	//小类
  "errorType": "ajax",        			//错误类型
  "pathname": "",                      	//路径
  "status": "",                     	//状态
  "duration": "7",                  	//持续时间
  "response": "",                       //响应信息
  "params": ""                      	//请求参数
}
```

## 白屏

### 数据结构
```js
{
  "title": "前端监控系统",            //页面标题
  "url": "http://localhost:8080/",    //页面url
  "timestamp": "",                    //访问时间戳
  "userAtgent": "chrome",             //用户浏览器类型
  "kind": "stability",                //大类
  "type": "blank",                    //小类
  "emptyPoints": "0",        //空白点
  "screen": "2049x1152",              //分辨率
  "viewPoints": "2048x994",           //视口
  "selector": ""                      //选择器
}
```
### 实现
* screen: 返回当前 window 的 screen 对象，返回当前渲染窗口中和屏幕有关得到属性
* innerWidth: 只读的 Window 属性 innerWidth 返回以像素为单位的窗口内部宽度
* innerHeight: 窗口的内部高度（布局视口）的高度
* layout_viewpoint 
* elementsFromPoint方法可以获取到当前视口内指定坐标处，由里到外排列的所有元素



## 加载时间
* PerformanceTiming
* DOMContentLoaded
* FMP
### 浏览器各个阶段
* 卸载老页面
* 重定向
* 读取缓存
* DNS 域名解析
* TCP 网络连接
* Request 请求
* Response 响应
* Processing 处理
* Load 加载
### 各阶段含义
通过 performance.timing 可以拿到一下属性
* navigationStart：初始化页面，在同一个浏览器上下文中前一个页面 unload 的时间戳，如果没有前一个页面的 unload, 则与 fetchStart 值相等
* redirectStart：第一个 HTTP 重定向发生的时间，有跳转且是同域的重定向，否则为0
* redirectEnd：最后一个重定向完成时的时间，否则为0
* fetchStart：浏览器准备好使用 http 请求获取文档的时间，这发生在检查缓存之前
  
  > fetchStart ——> domainLookupStart 读取缓存耗时
* domainLookupStart：DNS域名开始查询的时间，如果有本地的缓存或 keep-alive 则时间为0
  
  > domainLookupStart ——> domainLookupEnd 域名解析时间
* domainLookupEnd：DNS域名结束查询的时间
* connectStart：TCP 开始建立连接的时间，如果是持久连接，则与 fetchStart 值相等；
* secureConnectionStart：https 连接开始的时间，如果不是安全连接则为0（加密连接）；
* connectEnd：TCP完成握手的时间，如果是持久连接，则与 fetchStart 值相等
* requestStart：HTTP 请求读取真实文档开始的时间，包括从本地缓存读取
  
  > requestStart ——> responseStart (TTFB) 请求耗时（首字节耗时）
* requestEnd：HTTP 请求读取真实文档结束的时间，包括从本地缓存读取
* responseStart：返回浏览器从服务器收到（或从本地缓存读取）从第一个字节时的 Unix 毫秒时间戳
* responseEnd：返回浏览器从服务器收到（或从本地缓存读取，或从本地资源读取）最后一个字节时的 Unix 毫秒时间戳
  > responseEnd ——> unloadEventEnd  前一个页面卸载耗时
  > responseEnd ——> domInteractive  可交互 DOM 耗时
* unloadEventStart：前一个页面的 unload 的时间戳，如果没有则为0；（卸载事件开始）
* unloadEventEnd：（卸载事件结束）
* domLoading：开始解析 DOM
* domInteractive：DOM 结构解析结束
* domContentLoadedEventStart: DOMContentLoaded 事件开始
  
  > domContentLoadedEventStart ——> domContentLoadedEventEnd  DOMContentLoaded 事件耗时（domContentLoadedEventStart和domContentLoadedEventEnd事件必须监听才会有值）
* domContentLoadedEventEnd：DOMContentLoaded 事件结束
  
  > domContentLoadedEventEnd ——> domComplete 资源加载耗时
* domComplete：DOM 和资源解析完毕
* loadEventStart：开始 load 回调函数
  
  > loadEventStart——>loadEventEnd onLoad 事件耗时
* loadEventEnd： 结束 load 回调函数

### 阶段计算

| 字段       | 描述                     | 计算方式                                              | 意义                                                         |
| ---------- | ------------------------ | ----------------------------------------------------- | ------------------------------------------------------------ |
| unload     | 前一个页面卸载耗时       | unloadEventEnd - unloadEcentStart                     | -                                                            |
| redirect   | 重定向耗时               | redirectEnd - redirectStart                           | 重定向的时间                                                 |
| appCache   | 缓存耗时                 | domainLookupStart - fetchStart                        | 读取缓存的时间                                               |
| dns        | DNS解析耗时              | domainLookupEnd - domainLookupStart                   | 可观察域名解析服务是否正常                                   |
| tcp        | TCP 连接耗时             | connectEnd - connectStart                             | 建立连接的耗时                                               |
| ssl        | SSL安全连接耗时          | connectEnd - secureConnectStart                       |                                                              |
| TTFB       | 网络请求耗时             | responseStart - requestStart                          | 页面请求到接收响应数据的第一个字节耗时                       |
| response   | 响应数据传输耗时         | responseEnd - responseStart                           | 可观察网络是否正常                                           |
| dom        | DOM 解析耗时             | domInteractive - responseEnd                          | 观察DOM结构是否合理，是否有 js 阻塞页面解析                  |
| dcl        | DOMContentLoaded事件耗时 | domContentLoadedEventEnd - domContentLoadedEventStart | 当HTML 文档被完全加载和解析完成之后，DOMContentLoaded事件等待样式标，图像和子框架完成加载 |
| resources  | 资源加载耗时             | domComplete - domContentLoadedEnd                     | 可观察文档流是否过大                                         |
| domReady   | DOM阶段渲染耗时          | domContentLoadedEventEnd - fetchStart                 | DOM树和页面资源加载完成时间，会触发domContentLoaded 事件     |
| white      | 首次渲染耗时             | responseEnd - fetchStart                              | 加载文档到看到第一帧非空图像的时间（白屏时间）               |
| firstInter | 首次可交互时间           | domInteractive - fetchStart                           | DOM 树解析完成时间，此时 document.readyState为interactive    |
| firstPack  | 首包时间                 | responseStart - domainLookupStart                     | DNS 解析到响应给浏览器抵押给字节的时间                       |
| loadTime   | 页面完全加载时间         | loadEventStart - fetchStart                           |                                                              |
| onload     | onLoad事件耗时           | loadEventEnd - loadEventStart                         |                                                              |



## 性能指标
* PerformanceObserver.observe 方法用于观察传入的参数中指定的新跟那个条目类型的集合。当记录一个指定类型的性能条目时性能监测对象的回调函数将会被调用
* entryType
* pain-timing
* event-timing
* LCP
* FMP
* time-to-interactive

### 字段含义

* FP（First paint）首次绘制时间。包括了任何用户自定义的背景绘制，它是首先将像素绘制到屏幕的时刻
  
* FCP（First content paint）首次内容绘制。是浏览器将第一个 DOM 渲染到屏幕的时间，可能是文本，图像，SVG等，这其实就是白屏时间
  
* FMP（First Meaningful Paint）首次有意义绘制。页面有意义的内容渲染时间
* LCP（Largest ContentFul Paint）最大内容渲染。代表在 viewport 中最大的页面元素加载的时间
* DCL（DomContentLoaded）DOM 加载完成。当 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，无需等待样式表、图像和子框架的完成加载
* L（onLoad）当依赖的资源全部加载完毕后才会触发
* TTI（Time to Interactive） 用于标记引用已进行视觉渲染并可能靠响应用户输入的时间点
* FID（First inlut delay）首次输入延迟。用户首次和页面交互（单击链接，点击按钮等）到页面响应交互的时间