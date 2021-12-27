module.exports = {
  assetsDir: "public", //放置生成的静态资源
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    open: true,
    port: 3000,
    proxy: {
      "/api": {
        target: "http://8.211.163.33:2022",
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
