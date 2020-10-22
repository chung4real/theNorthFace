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
          this.subClick()
          this.addClick()
          this.remove()
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
            shop.check = $(this).prop('checked')
            return shop
          })
          localStorage.setItem('cart', JSON.stringify(_this.cart))
          $('.confirmBuy').prop('checked', $(this).prop('checked'))
          _this.calculateTotalPrice()
        })
      }
      // 单选状态的改变
      checksChange() {
        const _this = this
        $('#container').on('change', 'input', function () {
          if ($(this).is('.confirmBuy')) {
            const id = $(this).parents('.product-intro').data('id')
            _this.cart = _this.cart.map(shop => {
              if (shop.id === id) {
                shop.check = $(this).prop('checked')
              }
              // 无论条件是否成里,这里都要return出来
              return shop
            })
            localStorage.setItem('cart', JSON.stringify(_this.cart))
            _this.setAllCheckStatus()
            _this.calculateTotalPrice()
          }
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
        $('#container').on('click', 'button', function () {
          if ($(this).is('.subBtn')) {
            const subId = $(this).parents('.product-intro').data('id')
            console.log(subId)
            _this.cart = _this.cart.map(shop => {
              if (shop.id === subId) {
                shop.count--
                if (shop.count <= 0) {
                  shop.count = 1
                }
                $(this).next().val(shop.count).parent().siblings('.price').find('em').html((shop.originPrice * shop.count).toFixed(2))
              }
              return shop
            })
            localStorage.setItem('cart', JSON.stringify(_this.cart))
            _this.calculateTotalPrice()
          }
        })
        // $('.subBtn').on('click', function () {

        // })
      }
      // 点击+按钮进行购物车数量变更
      addClick() {
        const _this = this
        // $('.addBtn').on('click', function () {
        // })
        $('#container').on('click', 'button', function () {
          if ($(this).is('.addBtn')) {
            const addId = $(this).parents('.product-intro').data('id')
            console.log(addId)
            _this.cart = _this.cart.map(shop => {
              if (shop.id === addId) { shop.count++ }
              $(this).prev().val(shop.count).parent().siblings('.price').find('em').html((shop.originPrice * shop.count).toFixed(2))
              return shop
            })
            localStorage.setItem('cart', JSON.stringify(_this.cart))
            _this.calculateTotalPrice()
          }
        })
      }
      // 移除商品
      remove() {
        const _this = this
        $('#container').on('click', 'p', function () {
          if ($(this).is('.trash')) {
            const removeId = $(this).parents('.product-intro').data('id')
            _this.cart = _this.cart.filter(shop => {
              return shop.id !== removeId
            })
            if (_this.cart.length === 0) {
              localStorage.removeItem('cart')
              $('#container').hide()
              $('#cartEmpty').show()
            } else {
              localStorage.setItem('cart', JSON.stringify(_this.cart))
              $('#allSelect').prop('checked', false)
              $(this).parents('.product-intro').remove()
              _this.calculateTotalPrice()
              _this.setAllCheckStatus()
              // _this.render()
            }
          }
        })
      }
    }
    new ShopCart()
  })
})