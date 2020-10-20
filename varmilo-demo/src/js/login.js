require(['./config'], () => {
  require(['jquery', 'cookie', 'header'], () => {
    class Login {
      constructor() {
        this.userLogin()
      }
      userLogin() {
        $('#login').on('click', function (e) {
          const name = $('#usrName').val()
          const pwd = $('#usrPwd').val()
          const checkbox = $('#check')
          let userList = localStorage.getItem('userList')
          if (userList) {
            // 该用户已经注册
            userList = JSON.parse(userList)
            const isExist = userList.some(user => {
              return user.name == name && user.pwd == pwd
            })
            if (isExist) {
              if (checkbox.prop('checked')) {
                $.cookie('username', name, { expires: 7, path: '/' })
              } else {
                $.removeCookie('username', name, { path: '/' })
              }
              alert('登录成功,即将跳往首页')
            } else {
              alert('用户名密码输入有误,请重新输入')
              location.href = '/html/login.html'
            }
          } else {
            // 该用户没有注册
            console.log(123);
            alert('没有该用户的信息,请先注册')
            // location.href = '/html/register.html'
            e.preventDefault()
          }
        })
      }
    }
    new Login()
  })
})