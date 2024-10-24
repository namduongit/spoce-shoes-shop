function headerPage() {
    document.write(`
        <div class="inner-content">
                <div class="inner-logo">
                    <a href="">
                        <img src="assets/image/logo/logo-header-2.png" alt="">
                    </a>
                </div>

                <div class="inner-search">
                    <select name="" id="">
                        <option value="" selected>Tất cả</option>
                        <option value="">NIKE</option>
                        <option value="">ADIDAS</option>
                        <option value="">VANS</option>
                        <option value="">CONVERSE</option>
                        <option value="">QUẦN ÁO</option>
                        <option value="">PHỤ KIỆN</option>
                    </select>
                    <div class="search">
                        <input type="search" placeholder="Tìm kiếm sản phẩm">
                        <a href="">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </a>
                    </div>
                </div>

                <div class="inner-user">
                    <div class="user" id="user" onclick="showTools()">
                        <div>
                            <i class="fa-solid fa-user"></i>
                            <span>Tài khoản</span>
                        </div>
                    </div>
                    <div class="cart" id="cart>
                        <div href="">
                            <i class="fa-solid fa-cart-shopping"></i>
                            <span>Giỏ hàng</span>
                        </div>
                    </div>
                </div>
            </div>
    `);
}

function headMenu() {
    document.write(`
        <div class="inner-content">
                <ul class="menu-1">
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
    `);
}
function headFooter() {
    document.write(`
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
                            <a href="">Trang chủ</a>
                        </li>
                        <li>
                            <a href="">Giới thiệu</a>
                        </li>
                        <li>
                            <a href="">Sản phẩm</a>
                        </li>
                        <li>
                            <a href="">Khuyến mãi</a>
                        </li>
                        <li>
                            <a href="">Tin tức</a>
                        </li>
                        <li>
                            <a href="">Liên hệ</a>
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

    `);
}

function footFooter() {
    document.write(`
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
    `);
}