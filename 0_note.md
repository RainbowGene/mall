 # 一，项目目录划分
  1，文件创建
    src/common : 公共常量或者一些工具类
    src/network : 网络请求
    src/components/common : 公共组件
    src/components/content : 和业务有关系的组件内容
    src/router : 路由
    src/store : 状态管理
    src/views : 视图
    src/assets/css : css样式文件
    src/assets/img : 图片文件 
  
  2，引入初始化css文件：
    normalize.css : github 上的一个初始化样式文件
    base.css ： 我们自己定义的基本样式文件

  3，vue-config 和 editorconfig
    3.1 配置别名（vue-cli3）：
      1） 创建 vue.config.js 文件
    3.2 配置编辑器配置
      1） 创建 .editorconfig

  4，小图标修改
    index.html中 <%= BASE_URL %> ： 当前文件所在路径

 # 二，首页开发
  1，首页导航栏的封装和使用
    导航栏基本样式为 左中右（例：返回  标题  更多） 三个插槽
    在common写插槽组件，再home组件中调用，细节样式建议写在视图组件home中

  2，请求首页的多个数据
    npm install axios --save
    2.1 轮播图

 