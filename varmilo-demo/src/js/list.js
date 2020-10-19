require(['./config'], () => {
  require(['template', 'header'], (template) => {
    class List {
      constructor() {
        this.getData()
      }
      getData() {
        // 根据本地json渲染
        $.get('/libs/json/productList.json', resp => {
          // template第一个参数传入模版的script的id,不加#
          // 第二参数写对象,传入模版里所需要的属性
          // 模版里面写需要的list,这个数组是我从json获取到的resp
          const html = template('list-proTemplate', {
            list: resp
          })
          $('#list-intro').html(html)
        })
      }
    }
    new List()
  })
})