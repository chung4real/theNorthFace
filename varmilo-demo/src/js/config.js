require.config({
  baseUrl: '/',
  paths: {
    // 给每一个模块配置名字以及路径，路径不能写后缀名.js
    jquery: '/libs/jquery-3.5.1.min',
    bootstrap: '/bootstrap/css/bootstrap.min',
    header: '/js/modules/header',
    footer: '/js/modules/footer',
    template: '/libs/art-template/template-web'
  },
  // 垫片
  shim: {
    bootstrap: {
      deps: ['jquery']
    }
  }
})