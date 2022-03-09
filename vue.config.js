module.exports = {

  devServer: {
    port:8081,
    host:'172.16.0.29',
    https:false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',// 后端接口
        changeOrigin: true, // 是否跨域
      },
      '/my': {
        target: 'http://127.0.0.1:8080',// 后端接口
        changeOrigin: true, // 是否跨域
      },
      '/goods': {
        target: 'http://127.0.0.1:8080',// 后端接口
        changeOrigin: true, // 是否跨域
      },
    }
  }
}

