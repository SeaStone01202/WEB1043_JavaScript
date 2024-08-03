let doLogin = 0;

let users = [
  {
    id: 1,
    username: "admin",
    password: "123"
  }
];

sessionStorage.setItem('users', JSON.stringify(users));


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

