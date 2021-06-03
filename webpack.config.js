const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: '/src/index.js',
  context: process.cwd(),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'monitor.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), //静态文件根目录
    //before 内部启动 express 服务器
    before(router) {
      router.get('/success', function(req, res){
        res.json({id: 1})
        //res.sendStatus(500) 
      })
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'head'
    })
  ]
}