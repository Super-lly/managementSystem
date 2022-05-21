module.exports = {

  devServer: {
    port: 8081,
    host: '0.0.0.0',
    https: false,
    proxy: {
      '/api': {
        target: 'http://120.25.224.155:8081',// 后端接口
        changeOrigin: true, // 是否跨域
      },
      '/my': {
        target: 'http://120.25.224.155:8081',// 后端接口
        changeOrigin: true, // 是否跨域
      },
      '/goods': {
        target: 'http://120.25.224.155:8081',// 后端接口
        changeOrigin: true, // 是否跨域
      },
    }
  },

}

