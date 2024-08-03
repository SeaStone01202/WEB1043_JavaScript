let products = [
    {
      id: 1,
      name: "Hộp trung thu Như Ý",
      image: "https://cailonuong.com/wp-content/uploads/2024/07/trungthu-1_1-800x1200.jpg",
      price: 595.000,
    },
    {
      id: 2,
      name: "Hộp trung thu Vạn An",
      image: "https://cailonuong.com/wp-content/uploads/2024/07/trungthu-2_1-800x1200.jpg",
      price: 595.000,
    },
    {
      id: 3,
      name: "Túi Hảo",
      image: "https://cailonuong.com/wp-content/uploads/2024/07/trungthu-16_1-800x1200.jpg",
      price: 295.000,
    },
    {
      id: 4,
      name: "Túi Nguyệt",
      image: "https://cailonuong.com/wp-content/uploads/2024/07/trungthu-15_1-800x1200.jpg",
      price: 295.000,
    },
    {
      id: 5,
      name: "Túi An",
      image: "https://cailonuong.com/wp-content/uploads/2024/07/trungthu-14_1-800x1200.jpg",
      price: 295.000,
    },
    {
      id: 6,
      name: "Túi Yên",
      image: "https://cailonuong.com/wp-content/uploads/2024/07/trungthu-13_1-800x1200.jpg",
      price: 295.000,
    },
    {
        id: 7,
        name: "Bánh tắc muối trần bì",
        image: "https://cailonuong.com/wp-content/uploads/2024/07/trungthu-20113_1-800x1200.jpg",
        price: 155.000,
      },
      {
        id: 8,
        name: "Bánh táo đỏ kỷ tử ",
        image: "https://cailonuong.com/wp-content/uploads/2024/07/trungthu-20112_1-800x1200.jpg",
        price: 155.000,
      }
  ];
  localStorage.setItem('products', JSON.stringify(products));


  function loadProduct() {
    let listProduct = document.querySelector(".showProduct");
    listProduct = '';
    products.forEach(product => {
      let newDiv = document.createElement("div");
      newDiv.classList.add("item");
      newDiv.innerHTML = `
        <a href="/WEB1043_JavaScript/view/productDetail.html">
            <img src="https://cailonuong.com/wp-content/uploads/2024/07/trungthu-1_1-800x1200.jpg">
          </a>
            <div class="title">Hộp trung thu Như Ý</div>
            <div class="price">595.000</div>
            <button style="cursor: pointer;" onclick="checkLogin()">Them vao gio hang</button>`;
      listProduct.appendChild(newDiv);
    });
  }