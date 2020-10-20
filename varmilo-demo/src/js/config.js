require.config({
  baseUrl: '/',
  paths: {
    // 给每一个模块配置名字以及路径，路径不能写后缀名.js
    jquery: '/libs/jquery-3.5.1.min',
    header: '/js/modules/header',
    footer: '/js/modules/footer',
    template: '/libs/art-template/template-web',
    swiper: '/libs/swiper/js/swiper.min',
    bootstrap: '/bootstrap/css/bootstrap.min',
    cookie: '/libs/jquery-plugins/jquery.cookie',
    elevateZoom:'/libs/jquery-plugins/jquery.elevateZoom-3.0.8.min',
    fly:'/libs/jquery-plugins/jquery.fly.min'
  },
  // 垫片
  shim: {
    bootstrap: {
      deps: ['jquery']
    },
    elevateZoom: {
      deps: ['jquery']
    },
    fly: {
      deps:['jquery']
    }
  }
})