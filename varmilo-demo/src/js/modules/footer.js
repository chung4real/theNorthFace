define(['jquery'], () => {
  class Footer {
    constructor() {
      this.loadHTML().then(() => {
        
      })
    }
    loadHTML() {
      return new Promise(resolve => {
        $('footer').load('/html/multiplex/footer.html', resolve)
      })
    }
  }
  return new Footer()
})