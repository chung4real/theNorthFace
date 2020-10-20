require(['./config'], () => {
  require(['template', 'header', 'footer'], (template) => {
    class ShopCart {
      constructor() {
        this.render()
        this.setAllCheckStatus()
        this.calculateTotalPrice()
      }
      render() {
        const cart = localStorage.getItem('cart')
        if (cart) {
          // 购物车有数据
          this.cart = JSON.parse(cart)
          $('#container').html(
            template('containerTemplate', {
              cart: this.cart
            })
          )
        } else {
          // 购物车没有数据
          $('#cartEmpty').show()
          $('#cartData').hide()
        }
      }
      // 默认全选
      setAllCheckStatus() {
        const isAllCheck = this.cart.every(shop => shop.check)
        $('#allSelect').prop('checked', isAllCheck)
      }
      // 计算总价
      // calculateTotalPrice() {
      //   const allMoney = this.cart.reduce((money, shop) => {
      //     if (shop.check) money += shop.price * shop.count
      //     // 无论条件条件满足,都要return出来
      //     return money
      //   }, 0)
      //   $('.total-num').html(allMoney)
      // }
    }
    new ShopCart()
  })
})