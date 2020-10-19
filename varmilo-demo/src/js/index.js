require(['./config'], () => {
  require(['swiper', 'header', 'footer'], (swiper) => {
    class Index {
      constructor() {


      }

    }
    new Index()
    const mySwiper = new swiper('.swiper-container', {
      loop: true, // 循环模式选项
      speed: 1500,
      autoplay: {
        delay: '2000',// 轮播间隔时间  delay >= speed 否则效果无法运行
        disableOnInteraction: false
      },
      effect: 'fade',
      // effect: 'cube',
      // effect:'coverflow',
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'progressbar'
      },
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    })
    mySwiper.el.onmouseover = function () {
      mySwiper.navigation.$nextEl.removeClass('hide');
      mySwiper.navigation.$prevEl.removeClass('hide');
      // 用户移入轮播图停止播放
      mySwiper.autoplay.stop()
    }
    mySwiper.el.onmouseout = function () {
      mySwiper.navigation.$nextEl.addClass('hide');
      mySwiper.navigation.$prevEl.addClass('hide');
      // 用户移除轮播图继续播放
      mySwiper.autoplay.start()
    }
  })
})