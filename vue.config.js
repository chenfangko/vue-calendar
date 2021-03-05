module.exports = {
  // chainWebpack: config => {
  //   config.module
  //     .rule('pug')
  //     .test(/\.pug$/)
  //     .use('pug-plain-loader')
  //     .loader('pug-plain-loader')
  //     .end()

  //   const svgRule = config.module.rule('svg');
  //   svgRule.uses.clear();
  //   svgRule
  //     .use('vue-loader')
  //     .loader('vue-loader')
  //     .end()
  //     .use('vue-svg-loader')
  //     .loader('vue-svg-loader')

  // },

  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '@/assets/style/global.sass'`
      }
    }
  }
}
