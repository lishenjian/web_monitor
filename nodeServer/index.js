//导入 http 模块
const http = require('http');
//导入 文件 模块
const fs = require('fs');

//创建web 服务器
const server = http.createServer();

//为服务器实例绑定 request 事件，监听客户端的请求
server.on('request', function(req, res) {
  const url = req.url;
  const method = req.method;
  if(url === '/index') {
    let str = {
      name: 'lishenjian',
      age: '18'
    }
    let saveStr = `${Date.now()}\t${url}\r\n`
    fs.writeFile('./test.txt', saveStr, {flag: 'a+'}, function(error) {
      if(error) {
        console.log(error);
      }
    })
    res.end(JSON.stringify(str));
  }
  console.log(`${url}: ${method}`);
})

//启动服务
server.listen(3000, function() {
  console.log('服务器启动 http://127.0.0.1:3000 端口开始监听');
})
