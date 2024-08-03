// Mảng chứa thông tin các sản phẩm
const products = [
    { id: 1, img: 'img/hinh1.jpg', imghover: 'img/diChuotHinh1.jpg', name: 'BOOT CAO CỔ KQ09', price: '600.000Đ', link: 'ChiTietSP.html' },
    { id: 2, img: 'img/hinh2.jpg', imghover: 'img/diChuotHinh1.jpg', name: 'BOOT CỔ GỐI CAO CẤP GÓT NHỌN CELI 3 MÀU KQ200', price: '690.000Đ', link: '#' },
    { id: 3, img: 'img/hinh3.jpg', imghover: 'img/diChuotHinh1.jpg', name: 'BOOT NEVI CỔ CHỮ V MŨI NHỌN 2023 CC66', price: '580.000Đ', link: '#' },
    { id: 4, img: 'img/hinh4.jpg', imghover: 'img/diChuotHinh1.jpg', name: 'BOOT SWING-BOOT GỐI MIX ĐINH TÁN CC33', price: '690.000Đ', link: '#' },
    { id: 5, img: 'img/hinh5.jpg', imghover: 'img/diChuotHinh1.jpg', name: 'BOOT CAO CỔ KQ48', price: '480.000Đ', link: '#' },
    { id: 6, img: 'img/hinh6.jpg', imghover: 'img/diChuotHinh1.jpg', name: 'BOOT CAO CỔ CC202', price: '580.000Đ', link: '#' },
    { id: 7, img: 'img/hinh7.jpg', imghover: 'img/diChuotHinh1.jpg', name: 'BOOT CỔ CAO CC30', price: '580.000Đ', link: '#' },
    { id: 8, img: 'img/hinh8.jpg', imghover: 'img/diChuotHinh1.jpg', name: 'BOOT CỔ CAO CC23', price: '520.000Đ', link: '#' }
];

// Hàm tạo HTML cho mỗi sản phẩm
function loadProducts() {
    const productContainer = document.getElementById('productContainer');
    if (!productContainer) {
        console.error('Không tìm thấy phần tử productContainer');
        return;
    }
    products.forEach((product, index) => {
        const productHTML = `
            <div class="col-25">
                <div class="column">
                    <div class="column1">
                        <div class="hinh">
                            <a href="${product.link}"><img src="${product.img}" alt=""
                                onmouseover="this.src = '${product.imghover}'"
                                onmouseout="this.src = '${product.img}'">
                            </a>
                            <div class="icon">
                                <a href="giohang.html" onclick="addcart(${index})">
                                    Thêm vào giỏ
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="ten">
                        <a href="${product.link}">${product.name}</a>
                    </div>
                    <div class="gia">
                        <strong>${product.price}</strong> 
                    </div>
                </div>
            </div>
        `;
        productContainer.innerHTML += productHTML;
    });
}


var cart = []; // id, img, name, price, quantity

// Hàm khôi phục giỏ hàng từ localStorage và cập nhật giao diện
function updateCart() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalQuantity = cart.reduce((sum, item) => sum + item[4], 0)
    if (document.getElementById('sosp')) {
        document.getElementById('sosp').innerText = totalQuantity;
    }
}

function addcart(index) {
    let flag = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i][0] == products[index].id) {
            cart[i][4]++;
            flag = true;
            break;
        }
    }

    if (!flag) {
        cart.push([products[index].id, products[index].img, products[index].name, products[index].price, 1]);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    updateCart();

    console.log(cart);
}

// Gọi hàm loadProducts và updatecart khi trang được tải
document.addEventListener('DOMContentLoaded', function(){
    loadProducts();
    updateCart();
});
