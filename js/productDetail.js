

let quantityProduct = 0;
// console.log(getProducts);

function decreaseQuantity() {
  var quantityInput = document.getElementById('quantity-input');
  quantityProduct = parseInt(quantityInput.value);
  if (quantityProduct > 1) {
    quantityInput.value = quantityProduct - 1;
  }
}

function increaseQuantity() {
  var quantityInput = document.getElementById('quantity-input');
  quantityProduct = parseInt(quantityInput.value);
  quantityInput.value = quantityProduct + 1;
}


// document.addEventListener("DOMContentLoaded", () => {
//   // Lấy ID sản phẩm từ URL
//   const urlParams = new URLSearchParams(window.location.search);
//   const productId = parseInt(urlParams.get('id'));

//   // Kiểm tra xem ID sản phẩm có tồn tại không
//   if (productId) {
//     // Lấy thông tin sản phẩm từ localStorage
//     let products = JSON.parse(localStorage.getItem('products'));
//     let product = products.find(item => item.id === productId);

//     if (product) {
//       // Cập nhật thông tin sản phẩm trên trang chi tiết sản phẩm
//       document.querySelector(".product-image img").src = product.image;
//       document.querySelector(".product-name").textContent = product.name;
//       document.querySelector(".product-price").textContent = "Giá: " + product.price + ".000 VND";
//       // Thêm các thuộc tính khác nếu cần thiết
//     }
//   }
// });
