const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 基本路径
  publicPath: '/a',
  // 输出文件目录
  outputDir: 'a',
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  lintOnSave: false, //关闭验证格式
  css: {
    loaderOptions: {
      stylus: {
        test: /\.styl$/,
        loaders: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    },

  },
  devServer: {
    port: '8080',
    open: true,
    overlay: {
      errors: true
    },
    hot: true
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('images', resolve('static/images'))
      .set('components', resolve('src/views/components'))
      .set('imgs', resolve('src/assets/imgs'))
      .set('stylus', resolve('src/assets/stylus'))
      .set('api', resolve('src/api'))
      .set('views', resolve('src/views'))
      .set('sku', resolve('src/packages/sku'))
  }
}
