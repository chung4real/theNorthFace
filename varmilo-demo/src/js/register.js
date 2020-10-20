require(['./config'], () => {
  require(['header', 'cookie', 'jquery'], () => {
    class Register {
      constructor() {
        this.saveUserInfo()
      }
      saveUserInfo() {
        $('#submit').on('click', function (e) {
          const userInfo = {
            userName: $('#userName').val(),
            pwd: $('#userPwd').val(),
            confirmPwd: $('#confirmPwd').val()
          }
          // 先取,然后判断是否有该数据
          let userList = localStorage.getItem('userList')
          if (userList) {
            // 该用户已经注册,取出来的字符串解析成数组
            userList = JSON.parse(userList)
            console.log(userList)
            userList.push(userInfo)
            localStorage.setItem('userList', JSON.stringify(userList))
          } else {
            // 该用户没有注册,存入只有userInfo的数组
            localStorage.setItem('userList', JSON.stringify([userInfo]))
          }
          alert('注册成功,即将前往登录页')
          location.href = '/html/login.html'
          // 阻止button默认提交
          e.preventDefault()
        })
      }
    }
    new Register()
  })
})