var cart = []; // id, img, name, price, quantity

// Hàm khôi phục giỏ hàng từ localStorage và cập nhật giao diện
function updateCart() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalQuantity = cart.reduce((sum, item) => sum + item[4], 0);
    if (document.getElementById('sosp')) {
        document.getElementById('sosp').innerText = totalQuantity;
    }
}

// Hàm hiển thị giỏ hàng
function hienthigiohang() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    let tong = 0;
    let chuoi =
        `<tr>
            <td>Tên</td>
            <td>Hình</td>
            <td>Giá</td>
            <td>Số lượng</td>
            <td>Thành tiền</td>
            <td>Chức năng</td>
        </tr>`;

    for (let i = 0; i < cart.length; i++) {
        let thanhtien = parseFloat(cart[i][3].replace(/[^0-9]/g, '')) * cart[i][4];
        tong += thanhtien;
        chuoi +=
            `<tr>
                <td><strong>${cart[i][2]}</strong></td>
                <td><img src="${cart[i][1]}" alt width="50%"></td>
                <td>${cart[i][3]}</td>
                <td>${cart[i][4]}</td>
                <td>${thanhtien.toLocaleString()}Đ</td>
                <td><button onclick="XoaSP(${i})">Xóa</button></td>
            </tr>`;
    }
    chuoi +=
        `<tr>
            <td colspan="4" align="center">Tổng cộng: </td>
            <td><strong>${tong.toLocaleString()}Đ</strong></td>
            <td><button>Thanh toán</button></td>
        </tr>`;

    if (document.getElementById('hienthigiohang')) {
        document.getElementById('hienthigiohang').innerHTML = chuoi;
    }
}

function XoaSP(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    hienthigiohang();
    updateCart();
}

document.addEventListener('DOMContentLoaded', function(){
    hienthigiohang();
    updateCart();
});