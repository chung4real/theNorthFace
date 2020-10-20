require(['./config'], () => {
  require(['template', 'header', 'footer'], (template) => {
    class Detail {
      constructor() {
        this.render().then(() => {
          this.addToCart()
        })
      }
      render() {
        // 从接口地址栏获取id
        const id = location.search.slice(4)
        return new Promise(resolve => {
          $.get('/api/detail?id=8808691&normal=1&sa=', resp => {
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
        $('#joinBtn').on('click', () => {
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
                check:true
              })
            }
            localStorage.setItem('cart', JSON.stringify(cart))
          } else {
            // 购物车数据为空,存当前数据

            localStorage.setItem('cart', JSON.stringify([{
              ...this.detail,
              count: 1,
              check:true
            }]))
          }
        })
      }
    }
    new Detail()
  })
}) 