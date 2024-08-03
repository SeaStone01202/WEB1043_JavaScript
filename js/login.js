let doLogin = false;

let users = [
  {
    id: 1,
    username: "admin",
    password: "123"
  }
];

localStorage.setItem('users', JSON.stringify(users));
localStorage.setItem('isLogin', doLogin);

// login
function showLogin() {
  document.getElementById('loginModal').style.display = 'block';
}

function closeLogin() {
  document.getElementById('loginModal').style.display = 'none';
}

function showRegister() {
  document.getElementById('registerModal').style.display = 'block';
}

function closeRegister() {
  document.getElementById('registerModal').style.display = 'none';
}

function checkLogin(){
  let doLoginIsActive = sessionStorage.getItem('isLogin');
  doLogin = parseInt(doLoginIsActive);
  if(!doLogin){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Chưa đăng nhập, làm sao mua hàng ?'
    });
    showLogin();
  }
}

function checkUsernamePassword() {
  const username = users[0].username;
  const password = users[0].password;
  let usernameCheck = document.getElementById('username').value;
  let passwordCheck = document.getElementById('password').value;

  if (username === usernameCheck && password === passwordCheck) {
    doLogin = true;
    localStorage.setItem('isLogin', doLogin);
    console.log(doLogin);
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Đăng nhập thành công!'
    });
    updateUserMenu(usernameCheck);
    closeLogin();
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Tên đăng nhập hoặc mật khẩu không đúng!'
    });
  }
}

function updateUserMenu(username) {
  let userMenuContent = document.getElementById('loginMenu');
  userMenuContent.innerHTML = `
          <p>Hello: ${username}</p>
          <a href="#" onclick="logout()">Logout</a>
  `;
}

function logout() {
  let userMenuContent = document.getElementById('loginMenu');
  userMenuContent.innerHTML = `
          <a href="#" onclick="showLogin()">Login</a>
          <a href="#" onclick="showRegister()">Register</a>
  `;
  doLogin = false;
  localStorage.setItem('isLogin', doLogin);
  Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Bạn đã đăng xuất!'
  });
}
