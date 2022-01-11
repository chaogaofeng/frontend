const path = require("path");
function resolve (dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  assetsDir: "public", //放置生成的静态资源
  lintOnSave: false,
  productionSourceMap: false,
  chainWebpack: (config) => {    
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@components", resolve("src/components"))
      .set("@api", resolve("src/api"))
      .set("@assets", resolve("src/assets"))
      .set("@utils", resolve("src/utils"));
  },
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
