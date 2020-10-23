require(['./config'], () => {
  require(['template', 'header', 'footer', 'elevateZoom', 'fly'], (template, header) => {
    class Detail {
      constructor() {
        this.render().then(() => {
          this.addToCart()
          this.zoom()
        })
      }
      render() {
        // 从接口地址栏获取id
        const id = location.search.slice(4)
        return new Promise(resolve => {
          $.get(`/api/detail`, {
            id: id,
            normal: 1,
            sa: ''
          }, resp => {
            if (resp.code === 200) {
              const {
                id,
                photo,
                qunTitle,
                originPrice,
                descContentList
              } = resp.data.detail
              // 把所有需要的数据写给this.detail,这样其他方法同样也可以使用
              this.detail = {
                id,
                photo,
                qunTitle,
                originPrice,
                descContentList
              }
              $('#detail').html(
                template('detailTemplate', {
                  ...this.detail,
                  descContentList: descContentList.slice(0, 5)
                })
              )
              resolve()
            }
          })
        })
      }
      addToCart() {
        /**
          * 点击添加商品到购物车
          * 1.如果是第一次添加商品，localStorage里没有shopCart数据 
          *      则先创建一个json格式的数据，存储 商品的基本信息和商品数量，设置checked为true，将数据转换为字符串格式，存入localStorage里
          * 2.如果不是第一次添加商品
          *      拿到localStorage里存储的数据，将其转换为json格式，将新的商品的数据 push到这个json数据里，再将json数据转换为字符串，重新存入localStorage 覆盖之前的数据，实现数据更新
          */
        $('#joinBtn').on('click', () => {
          this.fly()
          this.calcCartCount()
          // 先取,判断是否已有数据存在
          let cart = localStorage.getItem('cart')
          if (cart) {
            // 购物车有数据
            cart = JSON.parse(cart)
            // 继续判断已添加数据是否包含当前数据
            const isExist = cart.some(shop => shop.id === this.detail.id)
            if (isExist) {
              // 当前已在购物车,数量+1
              cart = cart.map(shop => {
                if (shop.id === this.detail.id) {
                  shop.count++
                }
                // 不管有没有数据,都要return出去
                return shop
              })
            } else {
              cart.push({
                ...this.detail,
                count: 1,
                check: true
              })
            }
            localStorage.setItem('cart', JSON.stringify(cart))
          } else {
            // 购物车数据为空,存当前数据
            // 初次加入购物车默认为true
            localStorage.setItem('cart', JSON.stringify([{
              ...this.detail,
              count: 1,
              check: true
            }]))
          }
        })
      }
      zoom() {
        $("#keyboard").elevateZoom({
          // scrollZoom: true,
          easing: true,
          gallery: 'imgList',
          cursor: 'crosshair',
          // zoomType: "lens",
          // zoomType: "inner"
        })
      }
      fly() {
        $('#joinBtn').on('click', function (e) {
          $('<div class="fly">😋</div>').fly({
            start: {
              left: e.clientX,  //开始位置（必填）#fly元素会被设置成position: fixed
              top: e.clientY,  //开始位置（必填）
            },
            end: {
              left: $('#shopCart').offset().left - $(document).scrollLeft(), //结束位置（必填）
              top: $('#shopCart').offset().top - $(document).scrollTop(),  //结束位置（必填）
            },
            // autoPlay: false, //是否直接运动,默认true
            speed: 0.8, //越大越快，默认1.2
            vertex_Rtop: 50, //运动轨迹最高点top值，默认20
            onEnd: function () {
              // 移除fly
              this.destroy()
              // 重新计算购物车数量
              // this.calcCartCount()
            } //结束回调
          })
        })
      }
      calcCartCount() {
        let count = 0
        let cart = localStorage.getItem('cart')
        if (cart) {
          cart = JSON.parse(cart)
          count = cart.reduce((num, shop) => num + shop.count, 0)
        }
        $('#shopNum').html(count)
      }
    }
    new Detail()
  })
}) 