module.exports = { 
  configureWebpack: { 
    resolve: {
      alias: {  //配置别名
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}