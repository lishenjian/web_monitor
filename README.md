# 前端监控

## 前端监控目标
### 稳定性
* js 错误（未捕获的错误）
  
  > JS执行错误或者 promise 异常
* 资源异常
  
  > script、link等资源加载异常
* 接口错误
  
  > ajax或fetch请求接口异常
* 白瓶
  
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



