function DetailProducts(id) {
  const products = JSON.parse(localStorage.getItem("products"));
  let product;

  for (let i = 0; i < products.length; i++) {
    if (id === products[i].id) product = products[i];
  }

  Detail_product(product);

  document.querySelector(".detail-background").classList.add("active");
  document.querySelector(".close-icon").onclick = function () {
    document.querySelector(".detail-background").classList.remove("active");
  };
  document.querySelectorAll(".size_product .btn").forEach((element) => {
    element.addEventListener("click", () => {
      if (element.classList.contains("check")) {
        element.classList.remove("check");
        return;
      }
      document.querySelectorAll(".size_product .btn").forEach((elm) => {
        if (elm.classList.contains("check")) {
          elm.classList.remove("check");
        }
      });
      element.classList.add("check");
    });
  });

  let i = 0;
  let flag = true;

  function Auto() {
    if (flag == false) return;
    let primg = document.querySelectorAll(".promo-image .image__item");
    if (primg.length == 0) return;
    primg[i].click();
    i++;
    if (i == primg.length) i = 0;
    setTimeout(Auto, 5000);
  }

  document.querySelector(".close-icon").addEventListener("click", () => {
    flag = false;
  });

  document.querySelectorAll(".promo-image .image__item").forEach((element) => {
    element.addEventListener("mousedown", () => {
      flag = false;
    });
  });

  Auto();
}
function ZoomImage(image) {
  let dom = document.querySelector(".image img");
  dom.setAttribute("src", image);
}

function Quantity(value, price) {
  let input = document.querySelector(".input-quantity").value;
  if (value === "down") {
    if (!isNaN(Number(input))) {
      input = Number(input) - 1;
      if (input < 0) return;
      document.querySelector(".input-quantity").value = input;
      let pay = price;
      cleanedValue = pay.replace(/[.đ₫]/g, "");
      let numberValue = Number(cleanedValue);
      pay = numberValue * input;
      pay = pay.toLocaleString("vi-VN");
      pay += "đ";
      document.querySelector(".pay-all").innerHTML = pay;
      return;
    }
    return;
  }
  if (!isNaN(Number(input))) {
    input = Number(input) + 1;
    document.querySelector(".input-quantity").value = input;
    let pay = price;
    cleanedValue = pay.replace(/[.đ₫]/g, "");
    let numberValue = Number(cleanedValue);
    pay = numberValue * input;
    pay = pay.toLocaleString("vi-VN");
    pay += "đ";
    document.querySelector(".pay-all").innerHTML = pay;
    return;
  }

  return;
}

function writeSelectionSize(product) {
  let sizeObj = product.size;
  let html = ``;
  for (let size in sizeObj) {
    html += `
            <button class="btn">${size}</button>
        `;
  }
  return html;
}

function Detail_product(product) {
  let image = "";
  for (let key in product.promo_image) {
    if (product.promo_image[key] === "") {
      break;
    }
    image += `
        <div class="image__item" onclick="ZoomImage('${product.promo_image[key]}')"><img src=${product.promo_image[key]}> </div>
        `;
  }

  function handleAddToCart() {
    const selectedSizeBtn = document.querySelector(".size_product .btn.check");
    if (!selectedSizeBtn) {
      alert("Vui lòng chọn size");
      return;
    }
    const selectedSize = selectedSizeBtn.textContent;

    const quantity =
      parseInt(document.querySelector(".input-quantity").value) || 1;

    addToCart({
      id: product.id,
      name_product: product.name_product,
      brand: product.brand,
      image: product.image,
      size: selectedSize,
      quantity: quantity,
      sell: product.sell,
    });
  }

  let s = "";
  s += `
    <div class="detail-product">
        <h2>Chi tiết sản phẩm</h2>
        <div class="detail-flex">
            <div class="image">
                <div class="main-img">
                    <img src=${product.image}>
                </div>

                <div class="promo-image">
                   ${image}
                </div>

                <div class="detail-product_content">
                    <div class="service">
                        <i class="fa fa-shipping-fast"></i>
                        <span>Giao hàng siêu tốc từ 3 đến 5 ngày</span>
                    </div>
                    <div class="service">
                        <i class="fa fa-users"></i>
                        <span>Đăng ký thành viên để nhận ưu đãi</span>
                    </div>
                </div>

                <div class="size_product">
                    <p>Kích thước:</p>
                    ${writeSelectionSize(product)}
                </div>
            </div>
            <div class="details-pro">
                <h1>${product.name_product}</h1>
                <div class="details-pro__content">
                <p>
                    -Thương hiệu: ${product.brand.toUpperCase()} <br>
                    - Chất lượng Chuẩn 98%&nbsp;<strong>Spoce Shoes</strong><br>
                    - Kiểm Tra Hàng Trước Khi Thanh Toán &nbsp;<br>
                    - 100% Ảnh chụp trực tiếp tại Spoce Shoes&nbsp;<br>
                    - Bảo Hành Trọn Đời Sản Phẩm&nbsp;<br>
                    - Đổi Trả 7 Ngày Không Kể Lí Do&nbsp;<br>
                    - Liên Hệ : 0388.853.835
                </p>

                <div class="product__bonus">
                    <p>🎁 Tặng kèm vớ/tất cổ ngắn khử mùi</p>
                    <p>📦Đóng box carton kèm chống sốc, bảo vệ hộp giày</p>
                </div>

                <div class= "product__price-old" style="font-size: 17px">${
                  product.price
                } </div>
                <div class="product__price-current" style="font-size: 20px">
                    <strong>${product.sell}</strong>
                </div>

                <div class="product-quantity">
                    <span> Số lượng: </span>
                        <button class="btn-down btn" onclick="Quantity('down','${
                          product.sell
                        }')">-</button>
                            <input type="text"class="input-quantity" value="1" pattern="/d*" title="Chỉ cho phép nhập số">
                            <button class="btn-up btn" onclick="Quantity('up','${
                              product.sell
                            }')">+</button>
                </div>
            </div>
        </div>
    </div>

    <div class="product-pay">
        <div class="pay-total">
            <p>Thành tiền:
            <br>
            <span class="pay-all">${product.sell}</span></p>
        </div>

        <div class="cart-pay">
        
            <button class="btn-pay" onclick="document.querySelector('.detail-product').handleAddToCart()">Thêm vào giỏ hàng</button>
            <button class="btn-pay" onclick="showCart()">Thanh toán</button>
            </div>
            </div>
            <div class="close-icon">
            <i class="fa fa-times"></i>
        </div>
    </div>
    `;
  document.querySelector(".detail-background").innerHTML = s;

  document.querySelector(".detail-product").handleAddToCart = handleAddToCart;
}

function mergeGuestCartToUserCart(username) {
  const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];

  const userCartKey = `cart_${username}`;

  const userCart = JSON.parse(localStorage.getItem(userCartKey)) || [];

  if (guestCart.length > 0) {
    guestCart.forEach((guestItem) => {
      const existingItemIndex = userCart.findIndex(
        (userItem) =>
          userItem.id === guestItem.id && userItem.size === guestItem.size
      );

      if (existingItemIndex !== -1) {
        // Nếu sản phẩm đã tồn tại, cộng số lượng
        userCart[existingItemIndex].quantity += guestItem.quantity;
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm mới
        userCart.push(guestItem);
      }
    });

    // Lưu giỏ hàng đã merge vào localStorage của user
    localStorage.setItem(userCartKey, JSON.stringify(userCart));

    // Xóa giỏ hàng khách sau khi đã merge xong
    localStorage.removeItem("guestCart");
  }
}
function addToCart(productInfo) {
  const currentUser = JSON.parse(localStorage.getItem("usercurrent"));

  let cart;
  if (!currentUser) {
    // Nếu chưa đăng nhập, lưu giỏ hàng vào Local Storage chung
    cart = JSON.parse(localStorage.getItem("guestCart")) || [];
  } else {
    // Nếu đã đăng nhập, lưu giỏ hàng theo user
    const userCartKey = `cart_${currentUser.username}`;
    cart = JSON.parse(localStorage.getItem(userCartKey)) || [];
  }

  // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  const existingItemIndex = cart.findIndex(
    (item) => item.id === productInfo.id && item.size === productInfo.size
  );

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += productInfo.quantity;
  } else {
    cart.push({
      id: productInfo.id,
      name_product: productInfo.name_product,
      brand: productInfo.brand,
      image: productInfo.image,
      size: productInfo.size,
      quantity: productInfo.quantity,
      sell: productInfo.sell,
    });
  }

  // Lưu giỏ hàng vào Local Storage
  if (!currentUser) {
    localStorage.setItem("guestCart", JSON.stringify(cart)); // Lưu giỏ hàng cho khách
  } else {
    const userCartKey = `cart_${currentUser.username}`;
    localStorage.setItem(userCartKey, JSON.stringify(cart)); // Lưu giỏ hàng cho user đã đăng nhập
  }

  updateCartQuantity();
  alert("Đã thêm sản phẩm vào giỏ hàng");
}

function updateCartQuantity() {
  const currentUser = JSON.parse(localStorage.getItem("usercurrent"));
  let cart;

  if (!currentUser) {
    cart = JSON.parse(localStorage.getItem("guestCart")) || [];
  } else {
    const userCartKey = `cart_${currentUser.username}`;
    cart = JSON.parse(localStorage.getItem(userCartKey)) || [];
  }

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById(
    "quantityOfCart"
  ).innerHTML = `Giỏ hàng: ${totalQuantity}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("usercurrent"));
  if (currentUser) {
    updateCartQuantity();
  }
});

document.querySelector(".cart").addEventListener("click", showCart);

function loadCart() {
  const currentUser = JSON.parse(localStorage.getItem("usercurrent"));
  if (!currentUser) {
    alert("Bạn cần đăng nhập để xem giỏ hàng!");
    return [];
  }

  const userCartKey = `cart_${currentUser.username}`;
  return JSON.parse(localStorage.getItem(userCartKey)) || [];
}

function showCart() {
  const currentUser = JSON.parse(localStorage.getItem("usercurrent"));
  let cart;

  if (!currentUser) {
    cart = JSON.parse(localStorage.getItem("guestCart")) || [];
  } else {
    const userCartKey = `cart_${currentUser.username}`;
    cart = JSON.parse(localStorage.getItem(userCartKey)) || [];
  }

  if (cart.length === 0) {
    alert("Giỏ hàng của bạn đang trống!");
    return;
  }

  document.querySelector(".detail-background").classList.remove("active");
  document.querySelector(".cart-popup").style.display = "block";
  updateCartTable(cart);
}

// Đóng popup giỏ hàng
document.querySelector(".close-cart").addEventListener("click", () => {
  document.querySelector(".cart-popup").style.display = "none";
});

// Cập nhật bảng giỏ hàng
function updateCartTable(cart) {
  const tbody = document.getElementById("cart-items-body");
  tbody.innerHTML = "";
  let totalAmount = 0;

  cart.forEach((item, index) => {
    const row = document.createElement("tr");
    // Chuyển đổi giá từ string sang number
    const price = parseFloat(item.sell.replace(/[.đ]/g, ""));
    const itemTotal = price * item.quantity;
    totalAmount += itemTotal;

    row.innerHTML = `
            <td><img src="${item.image}" alt="${
      item.name_product
    }" style="width: 50px;"></td>
            <td>${item.name_product}</td>
            <td>${item.size}</td>
            <td>
                <button onclick="updateQuantity(${index}, -1)">-</button>
                ${item.quantity}
                <button onclick="updateQuantity(${index}, 1)">+</button>
            </td>
            <td>${item.sell}</td>
            <td>${itemTotal.toLocaleString("vi-VN")}đ</td>
            <td><button class="delete-btn" onclick="deleteItem(${index})">Xóa</button></td>
        `;
    tbody.appendChild(row);
  });

  document.getElementById("total-amount").textContent =
    totalAmount.toLocaleString("vi-VN") + "đ";
}

function updateQuantity(index, change) {
  const currentUser = JSON.parse(localStorage.getItem("usercurrent"));
  let cart;
  let cartKey;

  if (!currentUser) {
    cartKey = "guestCart";
    cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  } else {
    cartKey = `cart_${currentUser.username}`;
    cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  }

  const products = JSON.parse(localStorage.getItem("products"));
  const item = cart[index];
  const product = products.find((p) => p.id === item.id);
  const newQuantity = item.quantity + change;

  if (newQuantity <= 0) {
    deleteItem(index);
    return;
  }

  if (newQuantity > product.size[item.size]) {
    alert(
      `Số lượng trong kho không đủ. Chỉ còn ${product.size[item.size]} sản phẩm`
    );
    return;
  }

  cart[index].quantity = newQuantity;
  localStorage.setItem(cartKey, JSON.stringify(cart));
  updateCartTable(cart);
  updateCartQuantity();
}

function deleteItem(index) {
  const currentUser = JSON.parse(localStorage.getItem("usercurrent"));
  let cartKey = currentUser ? `cart_${currentUser.username}` : "guestCart";
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  cart.splice(index, 1);
  localStorage.setItem(cartKey, JSON.stringify(cart));
  updateCartTable(cart);
  updateCartQuantity();
}

document.querySelector(".checkout-btn").addEventListener("click", () => {
  const currentUser = JSON.parse(localStorage.getItem("usercurrent"));

  if (!currentUser) {
    alert("Bạn cần đăng nhập để thực hiện thanh toán!");
    return;
  }

  const userCartKey = `cart_${currentUser.username}`;
  const cart = JSON.parse(localStorage.getItem(userCartKey)) || [];

  if (cart.length === 0) {
    alert("Giỏ hàng của bạn đang trống!");
    return;
  }

  // Thực hiện xử lý thanh toán
  alert("Chuyển đến trang thanh toán");
});
