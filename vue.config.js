module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '././' : '/',
  lintOnSave: false, // ESLINT
  outputDir: 'dist', // 打包输出文件夹名称
  assetsDir: "static", // 打包输出的静态资源文件
  indexPath: "index.html", // 指定生成的 index.html 的输出路径 (相对于 outputDir)
  filenameHashing: true, // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    host: '0.0.0.0',
    proxy: { //配置代理，解决跨域请求后台数据的问题
      '/api': {
        target: 'http://dev.sinfcloud.com:8000',
        changeOrigin: true,
        ws: true, //是否跨域
        pathRewrite: {
          // '^/api': '' // SinfCloud本地启动服务 要忽略/api
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {}
      }
    }
  }
}