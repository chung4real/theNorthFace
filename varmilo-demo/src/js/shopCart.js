require(['./config'], () => {
  require(['template', 'header', 'footer'], (template) => {
    class ShopCart {
      constructor() {
        this.render()
        if (this.cart) {
          this.setAllCheckStatus()
          this.checksChange()
          this.calculateTotalPrice()
          this.changeAllCheckStatus()
        }
      }
      render() {
        const cart = localStorage.getItem('cart')
        if (cart) {
          // 购物车有数据
          this.cart = JSON.parse(cart)
          $('#container').html(
            template('containerTemplate', { cart: this.cart })
          )
        } else {
          // 购物车没有数据
          $('#cartEmpty').show()
          $('#cartData').hide()
        }
        this.subClick()
        this.addClick()
        this.remove()
      }
      // 默认全选
      setAllCheckStatus() {
        const isAllCheck = this.cart.every(shop => shop.check)
        $('#allSelect').prop('checked', isAllCheck)
      }
      // 改变全选状态
      changeAllCheckStatus() {
        const _this = this
        $('#allSelect').on('change', function () {
          _this.cart = _this.cart.map(shop => {
            shop.checked = $(this).prop('checked')   
            return shop
          })
          localStorage.setItem('cart', JSON.stringify(_this.cart))
          $('.confirmBuy').prop('checked',$(this).prop('checked'))
          _this.calculateTotalPrice()
        })
      }
      // 选中状态的改变
      checksChange() {
        const _this = this
        $('.confirmBuy').on('change', function () {
          const id = $(this).parents('.product-intro').data('id')
          _this.cart = _this.cart.map(shop => {
            if (shop.id === id) {
              shop.check = $(this).prop('checked')
            }
            // 无论条件是否成里,这里都要return出来
            return shop
          })
          // 存localStorage
          localStorage.setItem('cart', JSON.stringify(_this.cart))
          // 重新设置全选
          _this.setAllCheckStatus()
          // 重新计算总价
          _this.calculateTotalPrice()
        })
      }
      // 计算总价
      calculateTotalPrice() {
        const allMoney = this.cart.reduce((money, shop) => {
          if (shop.check) money += shop.originPrice * shop.count
          // 无论条件条件满足,都要return出来
          return money
        }, 0)
        $('.total-number b').html(allMoney.toFixed(2))
      }
      // 点击-按钮进行购物车数量变更
      subClick() {
        const _this = this
        $('.subBtn').on('click', function () {
          const subId = $(this).parents('.product-intro').data('id')
          _this.cart = _this.cart.map(shop => {
            if (shop.id === subId) {
              shop.count--
              if (shop.count <= 0) {
                shop.count = 1
              }
            }
            return shop
          })
          localStorage.setItem('cart', JSON.stringify(_this.cart))
          _this.render()
          _this.calculateTotalPrice()
        })
      }
      // 点击+按钮进行购物车数量变更
      addClick() {
        const _this = this
        $('.addBtn').on('click', function () {
          const addId = $(this).parents('.product-intro').data('id')
          _this.cart = _this.cart.map(shop => {
            if (shop.id === addId)
              shop.count++
            return shop
          })
          localStorage.setItem('cart', JSON.stringify(_this.cart))
          _this.render()
          _this.calculateTotalPrice()
        })
      }
      // 移除商品
      remove() {
        const _this = this
        $('#trash').on('click', function () {
          const removeId = $(this).parents('.product-intro').data('id')
          console.log(removeId);
          _this.cart = _this.cart.filter(shop => {
            return shop.id !== removeId
          })
          if (_this.cart.length === 0) {
            localStorage.removeItem('cart')
          } else {
            localStorage.setItem('cart', JSON.stringify(_this.cart))
          }
          $('#allSelect').prop('checked', false)
          _this.calculateTotalPrice()
          _this.render()
        })
      }
    }
    new ShopCart()
  })
})