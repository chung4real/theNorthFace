define(['jquery'], () => {
  class Header {
    constructor() {
      this.loadHTML().then(() => {
        this.getUsrInfo()
      })
    }
    loadHTML() {
      return new Promise(resolve => {
        $('header').load('/html/multiplex/header.html', resolve)
      })
    }
    getUsrInfo() {
      let username = JSON.parse(localStorage.getItem('username'))
      if (username) {
        $('.user').hide()
        $('.userLogin').show().find('b').html(username[0].userName)
      } else {
        $('.user').show()
        $('.userLogin').hide()
      }
    }
  }
  return new Header()
})
