define(['jquery'], () => {
  class Header {
    constructor() {
      this.loadHTML().then(() => {

      })
    }
    loadHTML() {
      return new Promise(resolve => {
        $('header').load('/html/multiplex/header.html', resolve)
      })
    }
  }
  return new Header()
})
