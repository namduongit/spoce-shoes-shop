function writeLogoAndUserTools() {
    document.write(`
    <header>
        <div class="inner-wrap">
            <div class="inner-content">
                <div class="inner-logo">
                    <a href="">
                        <img src="assets/image/logo/logo-header-2.png" alt="">
                    </a>
                </div>

                <div class="inner-search">
                    <select name="brand-select" id="brand-select">
                        <option value="" id="all-products" selected>Tất cả</option>
                        <option value="nike" id="nike-products">NIKE</option>
                        <option value="adidas" id="adidas-products">ADIDAS</option>
                        <option value="vans" id="vans-products">VANS</option>
                        <option value="converse" id="converse-products">CONVERSE</option>
                        <option value="clothes" id="clothes-products">QUẦN ÁO</option>
                    </select>
                    <div class="search">
                        <input type="text" id="search-inp" placeholder="Tìm kiếm">
                        <a href="" id="button-search">
                            <i class="fa-solid fa-magnifying-glass" style="color: black;"></i>
                        </a>

                    </div>
                </div>

                <div class="inner-user">
                    <div class="user">
                        <div class="parent">
                            <div class="icon-name">
                                <i class="fa-solid fa-user"></i>
                                <div>Tài khoản</div>
                            </div>
                            <div class="child">
                                <div class="group-form" onclick="showTools(this)" id="login">
                                    <i class="fa-solid fa-right-to-bracket"></i>
                                    <span>Đăng nhập</span>
                                </div>
                                <div class="group-form" onclick="showTools(this)" id="register">
                                    <i class="fa-solid fa-user-plus"></i>
                                    <span>Đăng ký</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="cart">
                        <div class="parent">
                            <i class="fa-solid fa-cart-shopping"></i>
                            <div>Giỏ hàng</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </header>
    `);
}

function writeMenuSelection() {
    document.write(`
<nav>
    <div class="section-one">
        <div class="inner-wrap">
            <div class="inner-content">
                <ul class="menu-1">
                    <li id="all_products" class="ChiTietSanPham" onclick="showCategory('ALL')">
                        <a href="#">All</a>
                    </li>
                    <li id="all_products_sale" class="ChiTietSanPham" onclick="showCategory('Sale')">
                        <a href="#">Sale 40% - 80%</a>
                    </li>
                    <li id="all_nike_products" class="ChiTietSanPham" onclick="showCategory('NIKE')">
                        <a href="#">NIKE</a>
                    </li>
                    <li id="all_adidas_products" class="ChiTietSanPham" onclick="showCategory('ADIDAS')">
                        <a href="#">ADIDAS</a>
                    </li>
                    <li id="all_vans_products" class="ChiTietSanPham" onclick="showCategory('VANS')">
                        <a href="#">VANS</a>
                    </li>
                    <li id="all_converse_products" class="ChiTietSanPham" onclick="showCategory('CONVERSE')">
                        <a href="#">CONVERSE</a>
                    </li>
                    <li id="all_clothes_products" class="ChiTietSanPham" onclick="showCategory('CLOTHES')">
                        <a href="#">QUẦN ÁO</a>
                    </li>
                    <li id="count_slide_bar">
                        <a onclick="showSideBar()"><i class="fa-solid fa-bars"></i></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <div class="sidebar">
        <ul class="menu-1">
            <li>
            <a onclick="hideSideBar()"><i class="fa-solid fa-xmark"></i></a>
            </li>
            <li>
            <a href="">All</a>
            </li>
            <li>
            <a href="">Sale 40% - 80%</a>
            </li>
            <li>
            <a href="">NIKE</a>
            </li>
            <li>
            <a href="">ADIDAS</a>
            </li>
            <li>
            <a href="">VANS</a>
            </li>
            <li>
            <a href="">CONVERSE</a>
            </li>
            <li>
            <a href="">HÃNG KHÁC</a>
            </li>
            <li>
            <a href="">QUẦN ÁO</a>
            </li>
            <li>
            <a href="">PHỤ KIỆN</a>
            </li>
            <li>
            <a href="">NHẬN THÔNG BÁO SALE</a>
            </li>
        </ul>
    </div>
</nav>
    `);
}

function writeSlideShow() {
    document.write(`
    <div class="section-two">
        <div class="inner-slide-show">
            <img src="assets/image/slide-show/slider_1.png" alt="image1">
        </div>
        <div class="inner-slide-show">
            <img src="assets/image/slide-show/slider_2.png" alt="image2">
        </div>
    </div>
    `);
}

function writeStorePolicies() {
    document.write(`
    <footer class="footer">
        <div class="inner-wrap">
            <div class="inner-content">
                <div class="inner-left">
                    <div class="title">ĐỒ ÁN MÔN WEB 1</div>
                    <div class="address">Địa chỉ: 273 An Dương Vương Phường 3, Quận 5</div>
                    <br>
                    <div class="number-phone">Số điện thoại: 0388.853.835</div>
                    <br>
                    <img src="assets/image/logo/logo-shop-1.png" alt="">
                </div>
                <div class="inner-mid-1">
                    <div class="title">Thông tin</div>
                    <ul>
                        <li>
                            <div data-name="home-page">Trang chủ</div>
                        </li>
                        <li>
                            <div data-name="introduce">Giới thiệu</div>
                        </li>
                        <li>
                            <div data-name="products">Sản phẩm</div>
                        </li>
                        <li>
                            <div data-name="promotion">Khuyến mãi</div>
                        </li>
                        <li>
                            <div data-name="news">Tin tức</div>
                        </li>
                        <li>
                            <div data-name="contact">Liên hệ</div>
                        </li>
                    </ul>
                </div>
                <div class="inner-mid-2">
                    <div class="title">Hướng dẫn & Chính sách</div>
                    <ul>
                        <li>
                            <a href="">Hướng dẫn mua hàng</a>
                        </li>
                        <li>
                            <a href="">Thẻ Thành Viên</a>
                        </li>
                        <li>
                            <a href="">Chính sách đổi trả & hoàn tiền</a>
                        </li>
                        <li>
                            <a href="">Chính sách thanh toán</a>
                        </li>
                        <li>
                            <a href="">Chính sách vận chuyển</a>
                        </li>
                        <li>
                            <a href="">Chính sách bảo mật</a>
                        </li>
                    </ul>
                </div>
                <div class="inner-right">
                    <h3>Đồ án môn "Lập trình web và ứng dụng </h2>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.556685064342!2d106.67967527485665!3d10.759992589387783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c81c64183%3A0xd3109d7a7a8f753c!2zMjczIMSQLiBBbiBExrDGoW5nIFbGsMahbmcsIFBoxrDhu51uZyAzLCBRdeG6rW4gNSwgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e1!3m2!1svi!2s!4v1729153291461!5m2!1svi!2s"
                            width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    </footer>
    `);
}

function writeContactUs() {
    document.write(`
    <div class="inner-footer">
        <div class="inner-wrap">
            <div class="inner-content">
                <div class="inner-left">
                    <div>© Đồ án của nhóm: <span>Tên nhóm</span></div>

                    <div>Thiết kế website bán hàng bởi namduongit</div>
                </div>

                <div class="inner-right">
                    <span>Liên hệ với chúng tôi tại:</span>
                    <ul>
                        <li>
                            <a href="">
                                <i class="fa-brands fa-facebook"></i>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i class="fa-brands fa-instagram"></i>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i class="fa-brands fa-github"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    `);
}

function parseCurrencyToNumber(currencyString) {
    // Loại bỏ các ký tự không phải số và dấu thập phân
    const cleanString = currencyString.replace(/[^\d]/g, "");
    // Chuyển đổi chuỗi đã làm sạch thành số
    return parseInt(cleanString, 10);
}
function averagePriceProduct() {
    let sum = 0;
    const products = JSON.parse(localStorage.getItem("products"));
    for (let product of products) {
        sum += parseCurrencyToNumber(product.sell)
    }
    return sum / products.length;
}
function OutStandingProduct() {

    let outProductHTML = ""
    averageProduct = averagePriceProduct();

    const products = JSON.parse(localStorage.getItem("products"));
    const number_productsPage = 8;
    var outstandingproducts_list = [];
    for (let product of products) {
        if (parseCurrencyToNumber(product.sell) >= averageProduct) {
            outstandingproducts_list.push(product);
            if (outstandingproducts_list.length === number_productsPage) {
                break;
            }
        }
    }
    outProductHTML = "";
    outstandingproducts_list.forEach((product) => {
        outProductHTML  += `<div class="grid_col-4 product__item" onclick="DetailProducts('${product.id}')">
                        <a href="javascript:void(0)" class="product__link">
                            <img src="${product.image}" alt="" class="product__link-img">
                            <span class="product__link-name">${product.name_product}</span>
                            <div class="product__link-sale">${product.discount}%</div>
                        </a>
                        <div class="product__price">
                            <div class="product__price-current">${product.sell}</div>
                            <div class="product__price-old">${product.price}</div>
                        </div>
                    </div>`;
    });
    document.querySelector(".outstandingproducts").innerHTML = outProductHTML;


    var sellproducut = []
    for (let product of products) {
        if (product.discount >= 35 && product.discount <= 80) {
            sellproducut.push(product);
            if (sellproducut.length === number_productsPage) {
                break;
            }
        }
    }

    outProductHTML = "";
    sellproducut.forEach((product) => {
        outProductHTML += `<div class="grid_col-4 product__item" onclick="DetailProducts('${product.id}')">
                          <a href="javascript:void(0)" class="product__link">
                              <img src="${product.image}" alt="" class="product__link-img">
                              <span class="product__link-name">${product.name_product}</span>
                              <div class="product__link-sale">${product.discount}%</div>
                          </a>
                          <div class="product__price">
                              <div class="product__price-current">${product.sell}</div>
                              <div class="product__price-old">${product.price}</div>
                          </div>
                      </div>`;
    });
    document.querySelector(".sell-products").innerHTML = outProductHTML;

    let product_fashion = [];

    for (let product of products) {
        if (product.brand.toUpperCase() === "CLOTHES") {
            product_fashion.push(product);
            if (product_fashion.length === number_productsPage) {
                break;
            }
        }
    }

    outProductHTML = "";
    product_fashion.forEach((product) => {
        outProductHTML += `<div class="grid_col-4 product__item" onclick="DetailProducts('${product.id}')">
                            <a href="javascript:void(0)" class="product__link">
                                <img src="${product.image}" alt="" class="product__link-img">
                                <span class="product__link-name">${product.name_product}</span>
                                <div class="product__link-sale">${product.discount}%</div>
                            </a>
                            <div class="product__price">
                                <div class="product__price-current">${product.sell}</div>
                                <div class="product__price-old">${product.price}</div>
                            </div>
                        </div>`;
    });
    document.querySelector(".clothes-products").innerHTML = outProductHTML;
}