let doLogin = false;

let users = [
  {
    id: 1,
    username: "admin",
    password: "123"
  }
];

// Lưu danh sách người dùng vào localStorage
localStorage.setItem('users', JSON.stringify(users));
localStorage.setItem('isLogin', doLogin);

// Hàm hiển thị modal đăng nhập
function showLogin() {
  document.getElementById('loginModal').style.display = 'block';
}

// Hàm đóng modal đăng nhập
function closeLogin() {
  document.getElementById('loginModal').style.display = 'none';
}

// Hàm hiển thị modal đăng ký
function showRegister() {
  document.getElementById('registerModal').style.display = 'block';
}

// Hàm đóng modal đăng ký
function closeRegister() {
  document.getElementById('registerModal').style.display = 'none';
}

// Hàm kiểm tra trạng thái đăng nhập
function checkLogin() {
  let doLoginIsActive = localStorage.getItem('isLogin');
  if (doLoginIsActive !== true) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Chưa đăng nhập, làm sao mua hàng?'
    });
    showLogin();
  }
}

// Hàm kiểm tra tên đăng nhập và mật khẩu
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

// Hàm cập nhật menu người dùng
function updateUserMenu(username) {
  let userMenuContent = document.getElementById('loginMenu');
  userMenuContent.innerHTML = `
          <p>Hello: ${username}</p>
          <a href="#" onclick="logout()">Logout</a>
  `;
}

// Hàm đăng xuất
function logout() {
  let userMenuContent = document.getElementById('loginMenu');
  userMenuContent.innerHTML = `
          <a href="#" onclick="showLogin()">Login</a>
          <a href="#" onclick="showRegister()">Register</a>
  `;
  doLogin = false;
  localStorage.setItem('isLogin', doLogin); // Lưu trạng thái đăng xuất
  Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Bạn đã đăng xuất!'
  });
}

