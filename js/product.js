let listProduct = document.querySelector(".showProduct");
let products = [
  {
    id: 1,
    name: "Hộp trung thu Như Ý",
    image: "https://cailonuong.com/wp-content/uploads/2024/07/trungthu-1_1-800x1200.jpg",
    price: 595000
  },
  {
    id: 2,
    name: "Hộp trung thu Vạn An",
    image: "https://cailonuong.com/wp-content/uploads/2024/07/trungthu-2_1-800x1200.jpg",
    price: 595000
  },
  {
    id: 3,
    name: "Túi Hảo",
    image: "https://cailonuong.com/wp-content/uploads/2024/07/trungthu-16_1-800x1200.jpg",
    price: 295000
  },
  {
    id: 4,
    name: "Túi Nguyệt",
    image: "https://cailonuong.com/wp-content/uploads/2024/07/trungthu-15_1-800x1200.jpg",
    price: 295000
  },
  {
    id: 5,
    name: "Túi An",
    image: "https://cailonuong.com/wp-content/uploads/2024/07/trungthu-14_1-800x1200.jpg",
    price: 295000
  },
  {
    id: 6,
    name: "Túi Yên",
    image: "https://cailonuong.com/wp-content/uploads/2024/07/trungthu-13_1-800x1200.jpg",
    price: 295000
  },
  {
    id: 7,
    name: "Bánh tắc muối trần bì",
    image: "https://cailonuong.com/wp-content/uploads/2024/07/trungthu-20113_1-800x1200.jpg",
    price: 155000
  },
  {
    id: 8,
    name: "Bánh táo đỏ kỷ tử ",
    image: "https://cailonuong.com/wp-content/uploads/2024/07/trungthu-20112_1-800x1200.jpg",
    price: 155000
  }
];
localStorage.setItem('products', JSON.stringify(products));

function loadProduct() {
  products.forEach(product => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("items");
    newDiv.innerHTML = `
      <a href="/WEB1043_JavaScript/view/productDetail.html?id=${product.id}"><img src="${product.image}" alt="${product.name}"></a>
      <div class="title">${product.name}</div>
      <div class="price">${product.price}.000</div>
      <button style="cursor: pointer;" onclick="checkLogin(${product.id})">Thêm vào giỏ hàng</button>
    `;
    listProduct.appendChild(newDiv);
  });
}

function checkLogin(productId) {
  if (isUserLoggedIn()) {
    addToCart(productId);
  } else {
    alert('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng');
    showLogin();
  }
}

let orders = JSON.parse(localStorage.getItem('orders')) || [
  {
    orderId: 1,
    orderDate: "7/23/2024",
    status: "Pending",
    totalAmount: 1,
    shippingAddress: null,
    userId: 1
  }
];

let orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || [
  {
    orderDetailId: 1,
    orderId: 1,
    productId: 1,
    productName: "Crab Pool Security",
    quantity: 1,
    price: 30.00,
    totalPrice: 30.00
  }
];
localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

function addToCart(productId) {
  let isLogin = JSON.parse(localStorage.getItem('isLogin'));
  if (!isLogin) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng'
    });
    return;
  }

  const product = products.find(p => p.id === productId);
  if (!product) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Sản phẩm không tồn tại'
    });
    return;
  }

  // let orders = JSON.parse(localStorage.getItem('orders')) || [];
  // let orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || [];

  let currentOrder = orders.find(o => o.status === 'Pending');
  if (!currentOrder) {
    currentOrder = {
      orderId: orders.length + 1,
      orderDate: new Date().toLocaleDateString(),
      status: 'Pending',
      totalAmount: 0,
      shippingAddress: 'Default Address',
      userId: 1
    };
    orders.push(currentOrder);
  }

  let orderDetail = orderDetails.find(od => od.orderId === currentOrder.orderId && od.productId === productId);
  if (!orderDetail) {
    orderDetail = {
      orderDetailId: orderDetails.length + 1,
      orderId: currentOrder.orderId,
      productId: productId,
      productName: product.name,
      quantity: 1,
      price: product.price,
      totalPrice: product.price
    };
    orderDetails.push(orderDetail);
  } else {
    orderDetail.quantity += 1;
    orderDetail.totalPrice = orderDetail.quantity * orderDetail.price;
  }

  currentOrder.totalAmount = orderDetails.filter(od => od.orderId === currentOrder.orderId)
    .reduce((total, od) => total + od.totalPrice, 0);

  localStorage.setItem('orders', JSON.stringify(orders));
  localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: 'Sản phẩm đã được thêm vào giỏ hàng'
  });
}


function loadCart() {
  let cartItems = document.getElementById('cartItems');
  let totalAmount = document.getElementById('totalAmount');
  let totalCart = 0;

  if (!isUserLoggedIn()) {
      return;
  }

  let orderDetailsCart = JSON.parse(localStorage.getItem('orderDetails'));
  let ordersCart = JSON.parse(localStorage.getItem('orders'));
  let currentOrder = ordersCart.find(ordersCart => ordersCart.status === 'Pending');

  cartItems.innerHTML = ''; // Xóa nội dung cũ của bảng giỏ hàng

  if (currentOrder.totalAmount !== 1) {
      orderDetailsCart.forEach(orderDetailCart => {
          if (orderDetailCart.orderId === currentOrder.orderId) {
              totalCart += orderDetailCart.totalPrice;
              const productCart = products.find(p => p.id === orderDetailCart.productId);
              if (productCart) {
                  let row = document.createElement('tr');
                  row.innerHTML = `
                      <td>${orderDetailCart.productName}</td>
                      <td><img src="${productCart.image}" alt="${orderDetailCart.productName}" width="50%"></td>
                      <td>${orderDetailCart.price}</td>
                      <td>${orderDetailCart.quantity}</td>
                      <td>${orderDetailCart.totalPrice}</td>
                      <td><button onclick="removeFromCart(${orderDetailCart.orderDetailId})">Xóa</button></td>
                  `;
                  cartItems.appendChild(row);
              }
          }
      });
  }

  totalAmount.innerText = totalCart;
}

function removeFromCart(orderDetailId) {
  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  let orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || [];

  // Tìm orderDetail theo orderDetailId
  const orderDetailIndex = orderDetails.findIndex(od => od.orderDetailId === orderDetailId);
  
  if (orderDetailIndex > -1) {
    // Xóa orderDetail khỏi orderDetails
    orderDetails.splice(orderDetailIndex, 1);
  }

  // Cập nhật lại tổng số lượng cho đơn hàng
  let currentOrder = orders.find(o => o.status === 'Pending');
  if (currentOrder) {
    currentOrder.totalAmount = orderDetails.filter(od => od.orderId === currentOrder.orderId)
      .reduce((total, od) => total + od.totalPrice, 0);
  }

  // Cập nhật lại localStorage
  localStorage.setItem('orders', JSON.stringify(orders));
  localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

  // Cập nhật lại giỏ hàng trên giao diện
  loadCart();

  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: 'Sản phẩm đã được xóa khỏi giỏ hàng'
  });
}



document.addEventListener("DOMContentLoaded", loadProduct);
document.addEventListener("DOMContentLoaded", loadCart);

function isUserLoggedIn() {
  return JSON.parse(localStorage.getItem('isLogin')) === true;
}

function showLogin() {
  document.getElementById('loginModal').style.display = 'block';
}


