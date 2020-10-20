require(['./config'], () => {
  require(['template', 'header'], (template) => {
    class List {
      constructor() {
        this.getTabs().then(() => {
          this.getList()
        })
      }
      getTabs() {
        return new Promise(resolve => {
          $.get('https://xiongmaoyouxuan.com/api/tabs', resp => {
            if (resp.code === 200) {
              let { list } = resp.data
              $('#tabList').html(
                template('tabListTemplate', {
                  list: list.slice(2, 6)
                })
              )
              resolve()
            }
          })
        })
      }
      getList() {
        const id = location.search.slice(4)
        $.get(`https://xiongmaoyouxuan.com/api/tab/${id}`, { start: 0 }, resp => {
          if (resp.code === 200) {
            const { list } = resp.data.items
            $('#list-intro').html(template('listProTemplate', {
              list: list.slice(0, 10)
            }))
          }
        })
      }
    }
    new List()
  })
})