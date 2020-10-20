require(['./config'], () => {
  require(['template', 'header', 'footer'], (template) => {
    class ShopCart {
      constructor() {
        this.render()
      }
      render() {
        const cart = localStorage.getItem('cart')
        if (cart) {
          // 购物车有数据
          this.cart = JSON.parse(cart)
          console.log(this.cart);
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
    }
    new ShopCart()
  })
})