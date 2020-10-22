require(['./config'], () => {
  require(['header', 'jquery',], (header) => {
    class Login {
      constructor() {
        this.userLogin()
      }
      
      userLogin() {
        $('#login').on('click', function (e) {
          const name = $('#usrName').val()
          const pwd = $('#usrPwd').val()
          let userList = JSON.parse(localStorage.getItem('userList'))
          if (userList) {
            // 该用户已经注册
            let isExist = userList.some(user => {
              return user.userName === name && user.pwd === pwd
            })
            if (isExist) {   
              localStorage.setItem('username', JSON.stringify(userList))
              header.getUsrInfo()
              location.href = '/index.html'
              $('#usrName').val('')
              $('#usrPwd').val('')
            } else {
              location.href = '/html/login.html'
            }
          } else {
            // 该用户没有注册
            alert('没有该用户的信息,请先注册')
            $('#usrName').val('')
            $('#usrPwd').val('')
          }
          e.preventDefault()
        })
      }
    }
    new Login()
  })
})