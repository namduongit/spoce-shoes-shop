function loadAdmin() {
    document.addEventListener("DOMContentLoaded", function () {
        createAdmin()
    })
}

function createAdmin() {
    if (localStorage.getItem('admins') === null) {
        let admins = [
            {
                id: 1,
                username: "admin",
                password: "admin@12345",
                title: "manage",
                status: "Đang hoạt động"
            }
        ];
        localStorage.setItem('admins', JSON.stringify(admins));
    }
}

window.onload = loadAdmin()

var admins = JSON.parse(localStorage.getItem('admins'));

function checkLogin() {
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var validation = new Validation();
    let valid = true;

    // Kiểm tra rỗng cho username và password
    valid &= validation.kiemtraRong(username.value, "#errol_user_disabled") & validation.kiemtraRong(password.value, "#errol_pass_disabled");

    // Nếu không hợp lệ, thoát
    if (valid == 0) {
        return false;
    }

    // Tìm admin với username và password
    let loggedInAdmin = admins.find(admin => admin.username === username.value && admin.password === password.value);

    if (loggedInAdmin) {
        // Lưu thông tin toàn bộ admin đăng nhập
        let currentAdmin = {
            ...loggedInAdmin, // Lưu toàn bộ thông tin admin
            loginTime: new Date().toISOString() // Thêm thời gian đăng nhập
        };
        localStorage.setItem('currentAdmin', JSON.stringify(currentAdmin));

        // Hiển thị giao diện sau khi đăng nhập
        document.querySelector('.container').style.display = 'flex';
        document.querySelector('.login').style.display = 'none';
        document.querySelector('.admin-content').innerHTML = `
            <h4>Xin chào, ${loggedInAdmin.username}</h4>
        `;

        // Gửi thông báo thành công
        toast({ title: 'SUCCESS', message: 'Đăng nhập thành công', type: 'success', duration: 3000 });
        writeMainContent();

    } else {
        // Hiển thị lỗi nếu đăng nhập thất bại
        document.getElementById("errol_pass_disabled").innerHTML = 'Tài khoản hoặc mật khẩu không đúng';
        document.getElementById("errol_pass_disabled").style.display = "block";
    }
}

function interFaceAdmin() {
    const adminCurrent = JSON.parse(localStorage.getItem('currentAdmin'));
    if (adminCurrent) {
        document.querySelector('.container').style.display = 'flex';
        document.querySelector('.login').style.display = 'none';
        writeMainContent();
    } else {
        console.log("Không tìm thấy admin trong localStorage");
    }
}

window.onload = function () {
    interFaceAdmin();
}

function logOut() {
    localStorage.removeItem('currentAdmin'); // Xóa thông tin admin khỏi localStorage
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.login').style.display = 'block';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    toast({ title: 'SUCCESS', message: 'Đăng xuất thành công!', type: 'success', duration: 3000 });
}

function showSideBar() {
    const sidebar = document.getElementById('side-bar');
    sidebar.classList.remove('slide-to-left');
    sidebar.classList.add('slide-to-right');
    sidebar.style.display = 'block';
}

function hideSideBar() {
    const sidebar = document.getElementById('side-bar');
    sidebar.classList.replace('slide-to-right', 'slide-to-left');
    sidebar.addEventListener('animationend', () => {
        sidebar.style.display = 'none';
    }, { once: true });
}


// hàm để kiểm tra nếu độ rộng của web lớn hơn 769px thì ẩn sidebar của màn hình nhỏ đi
function checkResolution() {
    const div = document.getElementById('side-bar');
    if (window.innerWidth >= 769) {
        div.style.display = 'none';
    }
}

// hàm này sẽ được gọi mỗi khi load web và khi web bị thay đổi kích thước
window.addEventListener('load', checkResolution);
window.addEventListener('resize', checkResolution);


function convertCurrencyToNumber(currencyString) {
    // Loại bỏ ký tự không phải số và dấu '.'
    const cleanedString = currencyString.replace(/[^\d]/g, '');
    // Chuyển đổi chuỗi thành số nguyên
    return parseInt(cleanedString, 10);
}

// hàm khởi tạo giao diện chính
function writeMainContent() {
    // Lấy dữ liệu hôm nay
    let date = getCurrentDateTime()
    // Cắt dữ liệu để lấy dd/mm/yyyy
    let currentDate = date.split(' ')[2];
    console.log(currentDate);

    let countNewUser = 0;
    let countNewMoney = 0;
    let countNewOrder = 0;

    let Allbill = JSON.parse(localStorage.getItem('Allbill')) || [];
    let Alluser = JSON.parse(localStorage.getItem('users')) || [];

    let currentBill = Allbill.filter(bill => {
        let paymentdate = bill.paymentdate;
        let current = paymentdate.split(' ')[2];
        return current === currentDate;
    });
    countNewOrder = currentBill.length;

    let currentUser = Alluser.filter(us => {
        let registrationTime = us.registrationTime;
        let current = registrationTime.split(' ')[2];
        return current == currentDate
    });
    countNewUser = currentUser.length;

    currentBill.forEach(bill => {
        let products_buy = bill.products_buy;
        let totalBillMoney = 0;
        products_buy.forEach(pro => {
            let quantity = parseInt(convertCurrencyToNumber(pro.quantity));
            let sell = parseInt(convertCurrencyToNumber(pro.sell));
            totalBillMoney += quantity * sell;
        });
        countNewMoney += totalBillMoney;

    });

    // Xử lí đơn hàng gần đây
    function currentBillNow() {
        let html = ``;
        currentBill.forEach(bill => {
            html += `
            <tr>
                <td>${bill.code}</td>
                <td>${bill.username}</td>
                <td>${bill.street}</td>
                <td>${bill.status}</td>
            </tr>
        `
        });
        return html;
    }

    document.getElementById('bar-title').innerHTML = `
    <h2>Tổng quan</h2>
    `;
    document.querySelector('.content').innerHTML = `
        <div class="analytics">
                    <div class="today-sales analytics-item">
                        <div class="analytics-icon">
                            <i class="fa-solid fa-chart-simple"></i>
                        </div>

                        <div class="analytics-content">
                            <div class="top-content">
                                Đơn hàng hôm nay
                            </div>

                            <div class="bottom-content">
                                ${countNewOrder}
                            </div>
                        </div>
                    </div>

                    <div class="today-income analytics-item">
                        <div class="analytics-icon">
                            <i class="fa-solid fa-money-bill"></i>
                        </div>

                        <div class="analytics-content">
                            <div class="top-content">
                                Doanh thu hôm nay
                            </div>

                            <div class="bottom-content">
                                ${formatMoney(countNewMoney)}
                            </div>
                        </div>
                    </div>

                    <div class="new-guests analytics-item">
                        <div class="analytics-icon">
                            <i class="fa-solid fa-user"></i>
                        </div>

                        <div class="analytics-content">
                            <div class="top-content">
                                Khách mới trong ngày
                            </div>

                            <div class="bottom-content">
                                ${countNewUser}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="recent-orders">
                    <div class="title">
                        Đơn hàng gần đây
                    </div>

                    <div class="recent-orders-content">
                        <table>
                            <thead>
                                <td>Mã đơn hàng</td>
                                <td>Username</td>
                                <td>Địa chỉ</td>
                                <td>Tình trạng</td>
                            </thead>

                            <tbody id="body-table">
                                ${currentBillNow()}
                            </tbody>
                        </table>
                    </div>
                </div>
    `;
}

// đọc mảng products từ local storage về ở dạng biến toàn cục
var products = JSON.parse(localStorage.getItem('products'));

function showProducts() {


    document.getElementById('bar-title').innerHTML = `
        <h2>Sản phẩm</h2>
    `;


    document.querySelector('.content').innerHTML = `
    <div class="delete-confirm">

    </div>

    <div class="modifying">

    </div>

    <div class="product-title">
        <h1>Danh sách sản phẩm</h1>
    </div>

    <div class="product-content">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nhãn Hiệu</th>
                    <th>Tên Sản Phẩm</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>

            <tbody id="product-details">

            </tbody>
        </table>

    </div>

    <ul id="page-select" class="page-select"></ul>
    `;



    const itemsPerPage = 8;
    var numOfPages = Math.ceil(products.length / itemsPerPage);


    var str = "";
    for (let i = 1; i <= numOfPages && numOfPages != 1; i++) {
        str = str + `
            <li class="page-item" data-page="${i}">
                <a class="page-item-text" href="javascript:void(0);">${i}</a>
            </li>
        `;
    }


    function loadProducts(page) {


        var start = itemsPerPage * (page - 1);
        var end = itemsPerPage * page;
        var productsOfPage = products.slice(start, end);


        var s = "";
        for (let i = 0; i < productsOfPage.length; i++) {
            s = s + `
                <tr>
                    <td>${productsOfPage[i].id}</td>
                    <td>${productsOfPage[i].brand.toUpperCase()}</td>
                    <td>${productsOfPage[i].name_product}</td>
                    <td><a href="#" class="warning" data-id="${productsOfPage[i].id}" onclick="showDeleteConfirmation(this); closeModifyingForm()">XÓA</a></td>
                    <td><a href="#" class="warning" data-id="${productsOfPage[i].id}" onclick="showModifyingForm(this); closeDeleteConfirmation()">SỬA</a></td>
                </tr>
            `;
        }


        document.getElementById('product-details').innerHTML = s;
        document.getElementById('page-select').innerHTML = str;
        document.querySelectorAll('.page-item')[page - 1].style.backgroundColor = '#11112f';
        document.querySelectorAll('.page-item-text')[page - 1].style.color = 'white';


        var pageSelectors = document.querySelectorAll('.page-item');
        pageSelectors.forEach(select => {
            select.addEventListener('click', () => {
                var pageid = parseInt(select.getAttribute('data-page'));
                loadProducts(pageid);
            });
        });
    }

    loadProducts(1);
}

// Form để xóa sản phẩm

function showDeleteConfirmation(product) {
    document.querySelector('.delete-confirm').style.display = 'block';
    document.querySelector('.delete-confirm').innerHTML = `
    <div class="confirm-top">
        XÓA SẢN PHẨM
    </div>

    <div class="confirm-content">
        Bạn có chắc chắn muốn xóa sản phẩm có ID là ${product.getAttribute('data-id')} ?
    </div>

    <div class="confirm-btn-container">
        <a href="#" onclick="deleteProduct(this)" data-id="${product.getAttribute('data-id')}">
            <div class="confirm-btn">Xóa</div>
        </a>
        <a href="#" onclick="closeDeleteConfirmation()">
            <div class="confirm-btn">Bỏ qua</div>
        </a>
    </div>
    `;
}

// hàm đóng form xóa sản phẩm
function closeDeleteConfirmation() {
    document.querySelector('.delete-confirm').innerHTML = ``;
    document.querySelector('.delete-confirm').style.display = 'none';
}


function deleteImage(keyw) {
    let key = "." + keyw;
    document.querySelector(key).innerHTML = "";
}

// Hàm để đổi ảnh
function changeImage(event) {
    var img = document.getElementById('form-img');
    var file = event.target.files[0];

    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// hàm đê thêm ảnh khi người dùng thêm file ảnh vào
function addImage(event, img) {
    var imgId = img.id;
    var imgDiv = document.querySelectorAll('.img-product');
    var file = event.target.files[0];

    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            if (imgId === 'main-img') {
                imgDiv[0].innerHTML = `
                <img src="${e.target.result}" alt="main-image">
                `;
            }

            if (imgId === 'promo-1') {
                imgDiv[1].innerHTML = `
                <img src="${e.target.result}" alt="promo-1">
                `;
            }

            if (imgId === 'promo-2') {
                imgDiv[2].innerHTML = `
                <img src="${e.target.result}" alt="promo-2">
                `;
            }

            if (imgId === 'promo-3') {
                imgDiv[3].innerHTML = `
                <img src="${e.target.result}" alt="promo-3">
                `;
            }

            if (imgId === 'promo-4') {
                imgDiv[4].innerHTML = `
                <img src="${e.target.result}" alt="promo-4">
                `;
            }
        }
        reader.readAsDataURL(file);
    }
}
function AddImage(event) {
    let len = document.querySelectorAll(".delete-img").length + 1;
    if (document.querySelectorAll(".delete-img").length == 5) {
        toast({ title: 'WARNING', message: "Tối đa 5 ảnh", type: 'warning', duration: 3000 });
        return;
    }
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.querySelector(`.img_${len}`).innerHTML += `<div class="promo_image">
            <div class="item-image "><img src=${e.target.result}></div>
            <div class="delete-img"><button onclick="deleteImage('img_${len}')" class="btn-delete">Xoá ảnh</button></div></div>
            `
        }
        reader.readAsDataURL(file);
    }
}
// hàm đóng form chỉnh sửa
function closeModifyingForm() {

    document.querySelector('.modifying').innerHTML = '';
    document.querySelector('.modifying').style.display = 'none';
}
function parsePricetoNumber(price) {
    price = price.replace(/\D/g, "");
    return Number(price);
}
function parseNumbertoPrice(number) {
    return number.toLocaleString("vi-VN") + "đ";
}
function ChangetoVND(value) {
    return parseNumbertoPrice(parsePricetoNumber(value));
}
// Form để sửa sản phẩm
function showModifyingForm(productId) {
    products_list = JSON.parse(localStorage.getItem("products"));
    var form = document.querySelector('.modifying');
    form.style.display = 'block';
    let product = products_list.find(item => item.id === productId.getAttribute('data-id'));
    let price = product.price;
    let sell = product.sell;
    var discount = product.discount;
    form.innerHTML = `
    <div class="modifying-top">
        SỬA SẢN PHẨM
    </div>

    <div class="modifying-content">
        <form>
            <br>
            <div class="form-item">
            <label for="name">Tên sản phẩm: </label>
            <input type="text" id="name" value="${product.name_product}">
            </div>
            <br>
            <div class="form-item">
            <label for="brand-select">Nhãn hiệu: </label>
            <select id="brand-select">
                <option value="nike">Nike</option>
                <option value="adidas">Adidas</option>
                <option value="VANS">Vans</option>
                <option value="converse">Converse</option>
                <option value="clothes">Clothes</option>
            </select>
            </div>
            <br>
            <div class="form-item">
            <label for="original-price">Giá gốc: </label>
            <input type="text" id="original-price" value="${product.price}">
            </div>
            <br>
            <div class="form-item">
            <label for="sell-price">Giá bán: </label>
            <input type="text" id="sell-price" value="${product.sell}">
            </div>
            <br>
            <div class="form-item">
            <label for="discount">Giảm: </label>
            <input type="text" id="discount" disabled>
            </div>
            <br>
            <div class="form-item">
            <label for="quantity">Số lượng: </label>
            <select id="size-select" >

            </select>
            <input type="number" id="quantity" >
            </div>
            <br>
            <div class="form-image">

            </div>
              <div class="choose-img">Thêm ảnh:<input type="file" accept="image/*" onchange="AddImage(event)"></div>
        </form>
    </div>

    <div class="modify-btn-container">
        <a href="#" id="save-btn">
            <div class="modify-btn">Lưu</div>
        </a>

        <a href="#" onclick="closeModifyingForm()">
            <div class="modify-btn">Thoát</div>
        </a>
    </div>
    `;
    let s = '';
    product.sizes.forEach(size => {
        s += `
        <option>${size}</option>
        `
    });
    let imgp = ` <div class="form-image-item img_1">
    <div class="promo_image">
    <div class="item-image "><img src=${product.image}></div>
    <div class="delete-img"><button onclick="deleteImage('img_1')" class="btn-delete">Xoá ảnh</button></div>
    </div>
    </div>`;
    let number = 1;
    for (key in product.promo_image) {
        number++;
        if (product.promo_image[key] == '') {
            imgp += ` <div class="form-image-item img_${number}">
    </div>`
            continue;
        }

        imgp += ` <div class="form-image-item img_${number}">
    <div class="promo_image">
    <div class="item-image "><img src=${product.promo_image[key]}></div>
    <div class="delete-img"><button class="btn-delete" onclick="deleteImage( 'img_${number}')">Xoá ảnh</button></div>
    </div>
    </div>`
    }

    document.querySelector(".form-image").innerHTML = imgp;
    document.getElementById("size-select").innerHTML = s;
    document.getElementById("quantity").value = product.size[document.getElementById("size-select").value.toString()];
    document.getElementById("size-select").onchange = function () {
        document.getElementById("quantity").value = product.size[document.getElementById("size-select").value.toString()];
    }
    document.getElementById("quantity").oninput = function () {
        product.size[document.getElementById("size-select").value.toString()] = document.getElementById("quantity").value;
    }

    document.getElementById("discount").value = discount;

    document.getElementById("original-price").onchange = function () {

        document.getElementById("original-price").value = ChangetoVND(document.getElementById("original-price").value);
        price = this.value;
        if (parsePricetoNumber(price) == 0 || parsePricetoNumber(price) < parsePricetoNumber(sell)) {
            document.getElementById("discount").value = "0";
            return;
        }

        discount = 100 - Math.floor((parsePricetoNumber(sell) / parsePricetoNumber(price)) * 100);
        document.getElementById("discount").value = discount;
    }
    document.getElementById("sell-price").onchange = function () {

        document.getElementById("sell-price").value = ChangetoVND(document.getElementById("sell-price").value);
        sell = this.value;
        if (parsePricetoNumber(price) == 0 || parsePricetoNumber(price) < parsePricetoNumber(sell)) {
            document.getElementById("discount").value = "0";
            return;
        }

        discount = 100 - Math.floor((parsePricetoNumber(sell) / parsePricetoNumber(price)) * 100);

        document.getElementById("discount").value = discount;
    }
    document.querySelector(".modify-btn").addEventListener("click", () => {
        product.brand = document.getElementById("brand-select").value;
        product.price = document.getElementById("original-price").value;
        product.sell = document.getElementById("sell-price").value;
        product.discount = document.getElementById("discount").value;
        product.name_product = document.getElementById("name").value;
        let i = -1;
        product.image = "";
        for (key in product.promo_image) {
            product.promo_image[key] = "";
        }
        document.querySelectorAll(".form-image-item .promo_image").forEach(element => {
            console.log();
            if (i == -1) {
                product.image = element.querySelector(".item-image img").getAttribute("src");
            }
            else {
                for (key in product.promo_image) {
                    if (product.promo_image[key] == "") {
                        console.log("Aaa");
                        product.promo_image[key] = element.querySelector(".item-image img").getAttribute("src");
                        break;
                    };
                }

            }
            i += 1;
        });
        for (let r = 0; r < products_list.length; r++) {
            if (products_list[r].id == product.id) {
                products_list[r] = product;
                break;
            }
        }
        localStorage.setItem("products", JSON.stringify(products_list));
        closeModifyingForm();
        showProducts();
    });


}
// hàm xóa sản phẩm khỏi mảng và cập nhật lên local storage
function deleteProduct(productId) {
    var productToBeRemovedIndex = products.findIndex(item => item.id === productId.getAttribute('data-id'));
    products.splice(productToBeRemovedIndex, 1);
    localStorage.setItem('products', JSON.stringify(products));
    showProducts();
}


function showAddingProduct() {

    const products = JSON.parse(localStorage.getItem('products')) || [];

    document.getElementById('bar-title').innerHTML = `
    <h2>Thêm sản phẩm</h2>
    `;

    document.querySelector('.content').innerHTML = `
    <div class="adding-top">
        <h1>Thêm sản phẩm mới</h1>
    </div>

    <div class="adding-content">
        <div>
            <div class="inner-left">
                <form>
                <div class="adding-content-item">
                    <label for="id">ID </label>
                    <br>
                    <input type="text" id="id" placeholder="Nhập ID sản phẩm" disabled value="${parseInt(products[products.length - 1].id) + 1}">
                    <br>
                </div>

                <div class="adding-content-item">
                    <label for="name">Tên sản phẩm</label>
                    <br>
                    <input type="text" id="name" placeholder="Nhập tên sản phẩm">
                    <br>
                </div>

                <div class="adding-content-item">
                    <label for="brand-select">Nhãn hiệu </label>
                    <br>
                    <select id="brand-select">
                        <option value="nike">Nike</option>
                        <option value="adidas">Adidas</option>
                        <option value="VANS">Vans</option>
                        <option value="converse">Converse</option>
                        <option value="clothes">Clothes</option>
                    </select>
                    <br>
                </div>

                <div class="adding-content-item">
                    <label for="original-price">Giá gốc </label>
                    <br>
                    <input type="text" id="original-price" placeholder="Nhập giá gốc">
                    <br>
                </div>

                <div class="adding-content-item">
                    <label for="sell-price">Giá bán </label>
                    <br>
                    <input type="text" id="sell-price" placeholder="Nhập giá bán">
                    <br>
                </div>

                <div class="adding-content-item">
                    <button onclick="calculateDiscount(event)">Tính giảm</button>
                </div>

                <div class="adding-content-item">
                    <label for="discount">Giảm </label>
                    <br>
                    <input type="text" id="discount" placeholder="Ấn nút để tính" disabled>
                    <br>
                </div>
                </form>
            </div>

            <div class="inner-right">

                <div class="adding-content-item">
                    <label for="main-img">Ảnh chính</label>
                    <br>
                    <input type="file" id="main-img" accept="image/*">
                    <br>
                </div>

                <div class="adding-content-item">
                    <label for="promo-1">Ảnh Promo 1 </label>
                    <br>
                    <input type="file" id="promo-1" accept="image/*">
                    <br>
                </div>

                <div class="adding-content-item">
                    <label for="promo-2">Ảnh Promo 2 </label>
                    <br>
                    <input type="file" id="promo-2" accept="image/*">
                    <br>
                </div>

                <div class="adding-content-item">
                    <label for="promo-3">Ảnh Promo 3</label>
                    <br>
                    <input type="file" id="promo-3" accept="image/*">
                    <br>
                </div>

                <div class="adding-content-item">
                    <label for="promo-4">Ảnh Promo 4</label>
                    <br>
                    <input type="file" id="promo-4" accept="image/*">
                    <br>
                </div>
            </div>
            <div class="size-content">
                <div class="size-option">
                    <h4>Chọn size:</h4>
                </div>
                <select id="size-select">

                </select>
                <input type="number" id="quantity">
            </div>

        </div>
    </div>

    <div class="adding-btn-container">
        <a href="#">
            <div class="adding-btn">Thêm</div>
        </a>

        <a href="#" onclick="resetForm()">
            <div class="adding-btn">Đặt lại</div>
        </a>
    </div>
    `;
    let s = '';
    if (document.getElementById("brand-select").value != "Clothes") {
        s = `
         <option>35</option>
          <option>36</option>
           <option>37</option>
            <option>38</option>
        <option>39</option>
        <option>40</option>
        <option>41</option>
        <option>42</option>
        <option>43</option>
        <option>44</option>
        `
    } else {
        s = `
        <option>S</option>
        <option>M</option>
        <option>L</option>
        <option>XL</option>
        <option>2XL</option>
        <option>3XL</option>`
    }
    var sizeArray = {
        "35": 0,
        "36": 0,
        "37": 0,
        "38": 0,
        "39": 0,
        "40": 0,
        "41": 0,
        "42": 0,
        "43": 0,
        "44": 0
    };
    document.getElementById("size-select").innerHTML = s;
    document.getElementById("quantity").value = sizeArray[document.getElementById("size-select").value.toString()];
    document.getElementById("original-price").onchange = function () {

        document.getElementById("original-price").value = ChangetoVND(document.getElementById("original-price").value);

    }
    document.getElementById("sell-price").onchange = function () {

        document.getElementById("sell-price").value = ChangetoVND(document.getElementById("sell-price").value);
    }
    // Add event listener để thay đổi size theo nhãn hiệu
    document.getElementById('brand-select').addEventListener('change', () => {

        if (document.getElementById("brand-select").value != "clothes") {
            console.log("aa");
            s = `
            <option>39</option>
            <option>40</option>
            <option>41</option>
            <option>42</option>
            <option>43</option>
            <option>44</option>
            `
        } else {
            s = `
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>2XL</option>
            <option>3XL</option>`
        }

        document.getElementById("size-select").innerHTML = s;


    });


    document.getElementById("size-select").onchange = function () {
        document.getElementById("quantity").value = sizeArray[document.getElementById("size-select").value.toString()];
        console.log(document.getElementById("size-select").value.toString(), document.getElementById("quantity").value, sizeArray)
    }
    document.getElementById("quantity").oninput = function () {
        sizeArray[document.getElementById("size-select").value.toString()] = document.getElementById("quantity").value;
    }

    document.querySelector(".adding-btn-container").onclick = function () {
        var idField = document.getElementById('id');
        var nameField = document.getElementById('name');
        var brandField = document.getElementById('brand-select');
        var orgPriceField = document.getElementById('original-price');
        var sellPriceField = document.getElementById('sell-price');
        var discountField = document.getElementById('discount');

        var mainImg = document.getElementById('main-img');
        var promo1 = document.getElementById('promo-1');
        var promo2 = document.getElementById('promo-2');
        var promo3 = document.getElementById('promo-3');
        var promo4 = document.getElementById('promo-4');

        var sizeOption = document.getElementById('size-select');


        if (nameField.value === '') {
            alert('Tên sản phẩm không được bỏ trống');
            return;
        }

        if (orgPriceField.value === '') {
            alert('Giá gốc sản phẩm không được bỏ trống');
            return;
        }

        if (sellPriceField.value === '') {
            alert('Giá bán sản phẩm không được bỏ trống');
            return;
        }

        if (discountField.value === '' || isNaN(discountField.value)) {
            alert('Giảm giá sản phẩm không được bỏ trống');
            return;
        }




        var mainImgURL = "";
        if (mainImg.value !== '') {
            var mainImgFile = mainImg.files[0];

            mainImgURL = URL.createObjectURL(mainImgFile);

        }

        var newProduct = {};
        newProduct.id = idField.value;
        newProduct.name_product = nameField.value;
        newProduct.brand = brandField.value;
        newProduct.discount = discountField.value;
        newProduct.image = mainImgURL;
        // Đổi xoá hết dấu '.' và 'đ' trong giá gốc và giá bán
        var originalPrice = orgPriceField.value;
        var sellPrice = sellPriceField.value;

        originalPrice = originalPrice.replace(/\./g, '');
        originalPrice = originalPrice.replace('đ', '');
        sellPrice = sellPrice.replace(/\./g, '');
        sellPrice = sellPrice.replace('đ', '');
        newProduct.price = formatMoney(parseInt(originalPrice));
        newProduct.sell = formatMoney(parseInt(sellPrice));
        newProduct.size = sizeArray;
        newProduct.sizes =
            ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44"];
        newProduct.promo_image = {
            image_1: "",
            image_2: "",
            image_3: "",
            image_4: "",
        };



        if (promo1.value !== '') {
            let promoImgFile = promo1.files[0];
            let promoImgURL = URL.createObjectURL(promoImgFile);
            newProduct.promo_image.image_1 = promoImgURL;
        }

        if (promo2.value !== '') {
            let promoImgFile = promo1.files[0];
            let promoImgURL = URL.createObjectURL(promoImgFile);
            newProduct.promo_image.image_2 = promoImgURL;
        }

        if (promo3.value !== '') {
            let promoImgFile = promo1.files[0];
            let promoImgURL = URL.createObjectURL(promoImgFile);
            newProduct.promo_image.image_3 = promoImgURL;
        }

        if (promo4.value !== '') {
            let promoImgFile = promo1.files[0];
            let promoImgURL = URL.createObjectURL(promoImgFile);
            newProduct.promo_image.image_4 = promoImgURL;
        }
        if (newProduct.image == "") {
            newProduct.image = "./assets/image/announcement/comingsoon.jpg";
        }





        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        toast({ title: 'SUCCESS', message: 'Thêm sản phẩm thành công', type: 'success', duration: 3000 });

        resetForm();
        window.onload();
    }
}
function addingProduct() {

    var idField = document.getElementById('id');
    var nameField = document.getElementById('name');
    var brandField = document.getElementById('brand-select');
    var orgPriceField = document.getElementById('original-price');
    var sellPriceField = document.getElementById('sell-price');
    var discountField = document.getElementById('discount');

    var mainImg = document.getElementById('main-img');
    var promo1 = document.getElementById('promo-1');
    var promo2 = document.getElementById('promo-2');
    var promo3 = document.getElementById('promo-3');
    var promo4 = document.getElementById('promo-4');

    var sizeOption = document.getElementById('size-select');


    if (nameField.value === '') {
        alert('Tên sản phẩm không được bỏ trống');
        return;
    }

    if (orgPriceField.value === '') {
        alert('Giá gốc sản phẩm không được bỏ trống');
        return;
    }

    if (sellPriceField.value === '') {
        alert('Giá bán sản phẩm không được bỏ trống');
        return;
    }

    if (discountField.value === '' || isNaN(discountField.value)) {
        alert('Giảm giá sản phẩm không được bỏ trống');
        return;
    }




    var mainImgURL = "";
    if (mainImg.value !== '') {
        var mainImgFile = mainImg.files[0];

        mainImgURL = URL.createObjectURL(mainImgFile);

    }

    var newProduct = {};
    newProduct.id = idField.value;
    newProduct.name_product = nameField.value;
    newProduct.brand = brandField.value;
    newProduct.discount = discountField.value;
    newProduct.image = mainImgURL;
    // Đổi xoá hết dấu '.' và 'đ' trong giá gốc và giá bán
    var originalPrice = orgPriceField.value;
    var sellPrice = sellPriceField.value;

    originalPrice = originalPrice.replace(/\./g, '');
    originalPrice = originalPrice.replace('đ', '');
    sellPrice = sellPrice.replace(/\./g, '');
    sellPrice = sellPrice.replace('đ', '');
    newProduct.price = formatMoney(parseInt(originalPrice));
    newProduct.sell = formatMoney(parseInt(sellPrice));
    newProduct.size = sizeArray;
    newProduct.sizes =
        ["39", "40", "41", "42", "43", "44"];
    newProduct.promo_image = {
        image_1: "",
        image_2: "",
        image_3: "",
        image_4: "",
    };



    if (promo1.value !== '') {
        let promoImgFile = promo1.files[0];
        let promoImgURL = URL.createObjectURL(promoImgFile);
        newProduct.promo_image.image_1 = promoImgURL;
    }

    if (promo2.value !== '') {
        let promoImgFile = promo1.files[0];
        let promoImgURL = URL.createObjectURL(promoImgFile);
        newProduct.promo_image.image_2 = promoImgURL;
    }

    if (promo3.value !== '') {
        let promoImgFile = promo1.files[0];
        let promoImgURL = URL.createObjectURL(promoImgFile);
        newProduct.promo_image.image_3 = promoImgURL;
    }

    if (promo4.value !== '') {
        let promoImgFile = promo1.files[0];
        let promoImgURL = URL.createObjectURL(promoImgFile);
        newProduct.promo_image.image_4 = promoImgURL;
    }
    if (newProduct.image == "") {
        newProduct.image = "./assets/image/announcement/comingsoon.jpg";
    }





    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    toast({ title: 'SUCCESS', message: 'Thêm sản phẩm thành công', type: 'success', duration: 3000 });

    resetForm();
    window.onload();
}

function calculateDiscount(event) {
    event.preventDefault;
    var originalPrice = document.getElementById('original-price').value;
    var sellPrice = document.getElementById('sell-price').value;
    // Loại bỏ để đưa về thành số
    if (parsePricetoNumber(originalPrice) == 0 || parsePricetoNumber(originalPrice) < parsePricetoNumber(sellPrice)) {
        document.getElementById("discount").value = "0";
        return;
    }
    discount = 100 - Math.floor((parsePricetoNumber(sellPrice) / parsePricetoNumber(originalPrice)) * 100);
    document.getElementById("discount").value = discount;

}

function formatMoney(money) {
    let result = '';
    let count = 0;
    let moneyStr = money.toString();

    for (let i = moneyStr.length - 1; i >= 0; i--) {
        result = moneyStr[i] + result;
        count++;
        if (count % 3 === 0 && i !== 0) { // Đảm bảo không thêm dấu '.' ở đầu chuỗi
            result = '.' + result;
        }
    }
    return result + "đ"; // Thêm "đ" vào cuối chuỗi
}



// hàm để đặt lại dữ liệu trong form
function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('brand-select').value = 'nike';
    document.getElementById('original-price').value = '';
    document.getElementById('sell-price').value = '';
    document.getElementById('discount').value = '';
    document.getElementById('main-img').value = '';
    document.getElementById('promo-1').value = '';
    document.getElementById('promo-2').value = '';
    document.getElementById('promo-3').value = '';
    document.getElementById('promo-4').value = '';
}


var users = JSON.parse(localStorage.getItem('users'));


function resetDataList() {
    brandList = [];
    productsName = [];

    productsList.forEach(product => {
        // Kiểm tra xem brand đã tồn tại trong brandList chưa và gắn cho nó là 0
        if (!brandList.some(b => b.brand === product.brand)) {
            let newBrand = {
                brand: product.brand,
                count: 0
            };
            brandList.push(newBrand);
        }

        // Kiểm tra xem tên sản phẩm đã tồn tại trong productsName chưa
        if (!productsName.some(p => p.name === product.name_product)) {
            let newProduct = {
                name: product.name_product,
                count: 0,
                price: product.price
            };
            productsName.push(newProduct);
        }
    });
}

function showCustomer() {
    document.getElementById('bar-title').innerHTML = `
    <h2>Khách hàng</h2>
    `;

    document.querySelector('.content').innerHTML = `
    <div class="user-modify-form"></div>

    <div class="customer-adding-form"></div>

    <div class="customer-title">
        <h1>Danh sách khách hàng</h1>
        <a href="#" class="add-user-btn" onclick="showAddingCustomerForm()">
            Thêm khách hàng
        </a>
    </div>

    <div class="customer-content">
        <table>
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Username</th>
                    <th>Số điện thoại</th>
                    <th>Trạng thái</th>
                    <th></th>
                </tr>
            </thead>

            <tbody id="customer-details">

            </tbody>
        </table>

    </div>

    <ul id="page-select" class="page-select"></ul>
    `;


    var userPerPage = 8;
    var numOfPages = Math.ceil(users.length / userPerPage);

    var str = "";
    for (let i = 1; i <= numOfPages && numOfPages != 1; i++) {
        str = str + `
            <li class="page-item" data-page="${i}">
                <a class="page-item-text" href="javascript:void(0);">${i}</a>
            </li>
        `;
    }

    function loadPage(page) {
        var start = userPerPage * (page - 1);
        var end = userPerPage * page;
        var userOfPage = users.slice(start, end);
        var stt = start + 1;

        var s = "";
        for (let i = 0; i < userOfPage.length; i++) {
            var activeStr;
            if (userOfPage[i].active) {
                activeStr = "Đang hoạt động";
            } else {
                activeStr = "Khóa";
            }

            s = s + `
            <tr>
                <td>${stt}</td>
                <td>${userOfPage[i].username}</td>
                <td>${userOfPage[i].phone}</td>
                <td>${activeStr}</td>
                <td><a href="#" class="warning" data-username="${userOfPage[i].username}" onclick="showUserModify(this)">Sửa</a></td>
            </tr>
            `;
            stt++;
        }

        document.getElementById('customer-details').innerHTML = s;
        document.getElementById('page-select').innerHTML = str;
        document.querySelectorAll('.page-item')[page - 1].style.backgroundColor = '#11112f';
        document.querySelectorAll('.page-item-text')[page - 1].style.color = 'white';

        var pageBtns = document.querySelectorAll('.page-item');
        pageBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                var page = parseInt(btn.getAttribute('data-page'));
                loadPage(page);
            });
        });
    }

    loadPage(1);
}

function showUserModify(obj) {
    document.querySelector('.user-modify-form').style.display = 'block';
    var user = users.find(item => item.username === obj.getAttribute('data-username'));
    var indexOfUser = users.findIndex(item => item.username === obj.getAttribute('data-username'));
    document.querySelector('.user-modify-form').innerHTML = `
        <div class="user-modify-top">
            Thông tin khách hàng
        </div>

        <div class="user-modify-content">
            <form>
                <div class="form-item">
                    <label for="username">Tài khoản </label>
                    <br>
                    <input type="text" id="username" value="${user.username}" disabled>
                </div>
                <br>

                <div class="form-item">
                    <label for="password">Mật khẩu </label>
                    <br>
                    <input type="text" id="password" value="${user.password}">
                    <span class="text-danger" id="errol_pass_disable"></span>
                    <span class="text-danger" id="errol_pass_length"></span>
                </div>

                <br>

                <div class="form-item">
                    <label for="fullname">Họ tên </label>
                    <br>
                    <input type="text" id="fullname" value="${user.fullname}">
                    <span class="text-danger" id="errol_name_disable"></span>
                </div>
                <br>

                <div class="form-item">
                    <label for="email">Email </label>
                    <br>
                    <input type="text" id="email" value="${user.email}">
                    <span class="text-danger" id="errol_email_disable"></span>
                      <span class="text-danger" id="errol_email_wrong"></span>
                    <span class="text-danger" id="errol_email_same"></span>
                </div>

                <br>

                <div class="form-item">
                    <label for="phone">Số điện thoại </label>
                    <br>
                    <input type="text" id="phone" value="${user.phone}">
                    <span class="text-danger" id="errol_phone_disable"></span>
                    <span class="text-danger" id="errol_phone_wrong"></span>
                    <span class="text-danger" id="errol_phone_same"></span>
                </div>
                <br>

                <div class="form-item">
                    <label for="account-status">Trạng thái: </label>
                    <br>
                    <select id="account-status">
                        <option value="true">Hoạt động</option>
                        <option value="false">Khóa</option>
                    </select>
                </div>
            </form>
        </div>

        <div class="user-modify-btn-container">
            <a href="#" id="user-save-btn">
                <div class="user-modify-btn">
                    Lưu
                </div>
            </a>

            <a href="#" onclick="closeUserModifyForm()">
                <div class="user-modify-btn">
                    Thoát
                </div>
            </a>
        </div>
    `;

    document.getElementById('account-status').value = String(user.active);
    document.getElementById('user-save-btn').addEventListener('click', () => {
        var status = (document.getElementById('account-status').value === "true");
        const emailRegex = /@[a-zA-z0-9]+\.[a-zA-z]{2,}$/;

        if (users.some(user => user.username == document.getElementById('username').value) && user.username != document.getElementById('username').value) {
            alert('Username đã tồn tại trong hệ thống!');
            return;
        }
        valid = true;
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let name = document.getElementById("fullname").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        var validation = new Validation();
        valid &= validation.kiemtraRong(password, "#errol_pass_disable") & validation.kiemtraRong(email, "#errol_email_disable") & validation.kiemtraRong(name, "#errol_name_disable") & validation.kiemtraRong(phone, "#errol_phone_disable") & validation.kiemtraDodai(password, "#errol_pass_length", 6) & validation.kiemtraEmail(email, "#errol_email_wrong") & validation.kiemtraSDT(phone, "#errol_phone_wrong");
        if (valid == 0) {
            return false;
        }
        let i = 0;
        if (users.some(user => {
            return user.email == email && username != user.username;
        })) {
            document.getElementById("errol_email_same").innerHTML = "Email đã có người khác đăng ký";
            document.getElementById("errol_email_same").display = "block";
            valid = false;
        } else {
            document.getElementById("errol_email_same").display = "none";
        }
        if (users.some(user => {
            return user.phone == phone && username != user.username;;
        })) {

            document.getElementById("errol_phone_same").innerHTML = "Số điện thoại đã có người khác đăng ký";
            document.getElementById("errol_phone_same").display = "block";
            valid = false;
        }
        else {

            document.getElementById("errol_phone_same").display = "none";
        }
        if (valid == false) {
            return false;
        }
        users[indexOfUser].username = document.getElementById('username').value;
        users[indexOfUser].password = document.getElementById('password').value;
        users[indexOfUser].fullname = document.getElementById('fullname').value;
        users[indexOfUser].email = document.getElementById('email').value;
        users[indexOfUser].phone = document.getElementById('phone').value;
        users[indexOfUser].active = status;
        localStorage.setItem('users', JSON.stringify(users));
        var usercurrent = JSON.parse(localStorage.getItem("usercurrent"));
        if (usercurrent) {
            usercurrent.username = document.getElementById('username').value;
            usercurrent.password = document.getElementById('password').value;
            usercurrent.fullname = document.getElementById('fullname').value;
            usercurrent.email = document.getElementById('email').value;
            usercurrent.phone = document.getElementById('phone').value;
            usercurrent.active = status;
            localStorage.setItem("usercurrent", JSON.stringify(usercurrent));
        }
        closeUserModifyForm();
        showCustomer();
    });
}

function closeUserModifyForm() {
    document.querySelector('.user-modify-form').style.display = 'none';
}

function showAddingCustomerForm() {
    document.querySelector('.customer-adding-form').style.display = 'block';
    document.querySelector('.customer-adding-form').innerHTML = `
        <div class="customer-adding-top">
            Thông tin khách hàng
        </div>

        <div class="customer-adding-content">
            <form>
                <div class="form-item">
                    <label for="username">Tài khoản </label>
                    <br>
                    <input type="text" id="username" placeholder="Nhập tài khoản">
                    <span class="text-danger" id="errol_user_disable"></span>
                    <span class="text-danger" id="errol_user_length"></span>
                    <span class="text-danger" id="errol_user_same"></span>
                </div>
                <br>

                <div class="form-item">
                    <label for="password">Mật khẩu </label>
                    <br>
                    <input type="text" id="password" placeholder="Nhập mật khẩu">
                    <span class="text-danger" id="errol_password_disable"></span>
                    <span class="text-danger" id="errol_password_length"></span>

                </div>
                <br>

                <div class="form-item">
                    <label for="fullname">Họ tên </label>
                    <br>
                    <input type="text" id="fullname" placeholder="Nhập họ tên">
                    <span class="text-danger" id="errol_name_disable"></span>
                </div>
                <br>

                <div class="form-item">
                    <label for="email">Email </label>
                    <br>
                    <input type="text" id="email" placeholder="Nhập email">
                    <span class="text-danger" id="errol_email_disable"></span>
                    <span class="text-danger" id="errol_email_wrong"></span>
                    <span class="text-danger" id="errol_email_same"></span>
                </div>
                <br>

                <div class="form-item">
                    <label for="phone">Số điện thoại </label>
                    <br>
                    <input type="text" id="phone" placeholder="Nhập số điện thoại">
                    <span class="text-danger" id="errol_tel_disable"></span>
                    <span class="text-danger" id="errol_tel_pattern"></span>
                    <span class="text-danger" id="errol_tel_same"></span>
                </div>
                <br>

                <div class="form-item">
                    <label for="account-status">Trạng thái: </label>
                    <br>
                    <select id="account-status">
                        <option value="true">Hoạt động</option>
                        <option value="false">Khóa</option>
                    </select>
                </div>
            </form>
        </div>

        <div class="user-modify-btn-container">
            <a href="#" id="customer-save-btn">
                <div class="user-modify-btn">
                    Thêm
                </div>
            </a>

            <a href="#" onclick="closeCustomerAddingForm()">
                <div class="user-modify-btn">
                    Thoát
                </div>
            </a>
        </div>
    `;

    document.getElementById('customer-save-btn').addEventListener('click', () => {
        var username = document.getElementById('username');
        var password = document.getElementById('password');
        var fullname = document.getElementById('fullname');
        var emailAddress = document.getElementById('email');
        var phoneNumber = document.getElementById('phone');
        var status = document.getElementById('account-status').value === "true";
        var currentTime = new Date();
        currentTime = getCurrentDateTime(currentTime);

        var validation = new Validation();
        var valid = true;
        //Check validation
        valid &= validation.kiemtraRong(username.value, "#errol_user_disable") & validation.kiemtraRong(password.value, "#errol_password_disable") & validation.kiemtraRong(fullname.value, "#errol_name_disable") & validation.kiemtraRong(emailAddress.value, "#errol_email_disable") & validation.kiemtraRong(phoneNumber.value, "#errol_tel_disable") & validation.kiemtraDodai(username.value, "#errol_user_length", 6) & validation.kiemtraDodai(password.value, "#errol_password_length", 6) & validation.kiemtraEmail(emailAddress.value, "#errol_email_wrong") & validation.kiemtraSDT(phoneNumber.value, "#errol_tel_pattern");
        if (valid === 0) {
            return false;
        }
        if (users.some(user => {
            return user.username === username.value;
        })) {
            document.querySelector("#errol_user_same").innerHTML = "Tên tài khoản đã tồn tại!";
            document.querySelector("#errol_user_same").style.display = "block";
            valid = false;
        } else {
            document.querySelector("#errol_user_same").style.display = "none";
        }
        if (users.some(user => {
            return user.email === email.value;
        })) {
            document.querySelector("#errol_email_same").innerHTML = "email đã được đăng ký cho tài khoản khác!";
            document.querySelector("#errol_email_same").style.display = "block";
            valid = false;
        }
        else {
            document.querySelector("#errol_email_same").style.display = "none";
        }
        if (users.some(user => {
            return user.phone === phone.value;
        })) {
            document.querySelector("#errol_tel_same").innerHTML = "Số điện thoại đã được đăng ký cho tài khoản khác!";
            document.querySelector("#errol_tel_same").style.display = "block";
            valid = false;
        } else {
            document.querySelector("#errol_tel_same").style.display = "none";
        }
        if (valid == false) {
            return;
        }
        var newCustomer = {
            username: username.value,
            password: password.value,
            fullname: fullname.value,
            email: emailAddress.value,
            phone: phoneNumber.value,
            registrationTime: currentTime,
            cart: [],
            products: [],
            active: status
        };

        users.push(newCustomer);
        localStorage.setItem('users', JSON.stringify(users));
        closeCustomerAddingForm();
        showCustomer();
    });
}
function closeCustomerAddingForm() {
    document.querySelector('.customer-adding-form').style.display = 'none';
}

function getCurrentDateTime() {
    const now = new Date();

    const day = now.getDay() + 1;                                      // Thứ (0 - 6, nên cần + 1)
    const date = now.getDate().toString().padStart(2, '0');            // Ngày (1-31)
    const month = (now.getMonth() + 1).toString().padStart(2, '0');    // Tháng (0-11, nên cần +1)
    const year = now.getFullYear();                                    // Năm
    const hours = now.getHours().toString().padStart(2, '0');          // Giờ (0-23)
    const minutes = now.getMinutes().toString().padStart(2, '0');      // Phút (0-59)
    const seconds = now.getSeconds().toString().padStart(2, '0');      // Giây (0-59)

    return `Thứ ${day} ${date}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}


var orders = JSON.parse(localStorage.getItem('Allbill'));



function getCurrentDateTime() {
    const now = new Date();

    const day = now.getDay() + 1;
    const date = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `Thứ ${day} ${date}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}




function showStatistics() {
    var currentTime = new Date();
    currentTime = getCurrentDateTime(currentTime); // Giả sử bạn có hàm này để định dạng thời gian

    document.getElementById('bar-title').innerHTML = `
        <h2>Thống kê đơn hàng từng tháng</h2>
    `;
    document.querySelector('.content').innerHTML = `
        <div class="statistics">
            <div class="head-content">

            </div>

            <div class="foot-content">
                <!-- Các thông tin thêm có thể thêm ở đây -->
            </div>
        </div>
    `;


}

var productsList = JSON.parse(localStorage.getItem('products'));

var brandList = []
var productsName = []

productsList.forEach(product => {
    // Kiểm tra xem brand đã tồn tại trong brandList chưa và gắn cho nó là 0
    if (!brandList.some(b => b.brand === product.brand)) {
        let newBrand = {
            brand: product.brand,
            count: 0
        };
        brandList.push(newBrand);
    }

    // Kiểm tra xem tên sản phẩm đã tồn tại trong productsName chưa
    if (!productsName.some(p => p.name === product.name_product)) {
        let newProduct = {
            name: product.name_product,
            count: 0,
            price: product.price
        };
        productsName.push(newProduct);
    }
});


function getDateFromString(str) {
    var arr = str.match(/\d{2}\/\d{2}\/\d{4}/);
    return arr[0];
}

function showOrders() {
    document.getElementById('bar-title').innerHTML = `
    <h2>Đơn hàng</h2>
    `;

    document.querySelector('.content').innerHTML = `
    <div class="order-title">
        <h1>Danh sách đơn hàng</h1>
    </div>

    <div class="order-detail"></div>

    <div class="order-sort">
        <div class="sort-content">

            <h3>Tìm kiếm</h3>

            <form>
                <div class="form-item">
                <label for="start-date">Thời gian</label>
                <br>
                <input type="date" id="start-date">
                <input type="date" id="end-date">
                </div>
                <br>
                <div class="form-item">
                <label for="order-status">Tình trạng</label>
                <br>
                <select id="order-status">
                    <option value="0">Chọn tình trạng</option>
                    <option value="1">Đang xử lý</option>
                    <option value="2">Đã xác nhận</option>
                    <option value="3">Đã giao thành công</option>
                    <option value="4">Đã hủy</option>
                </select>
                </div>
                <br>
                <div class="form-item">
                <input type="checkbox" id="sortDistrict">
                <label for="sortDistrict">Sắp xếp theo quận</label>
                </div>
            </form>

            <div class="sort-submt">
                <a href="#" onclick="sortOrder()">Lọc</a>
            </div>
        </div>
    </div>

    <div class="order-content">
        <table>
            <thead>
                <tr>
                    <th>Mã đơn hàng</th>
                    <th>Ngày lập đơn</th>
                    <th>Khách hàng</th>
                    <th>Địa chỉ</th>
                    <th>Quận</th>
                    <th>Trạng thái</th>
                    <th></th>
                </tr>
            </thead>

            <tbody id="order-details">

            </tbody>
        </table>

    </div>

    <ul id="page-select" class="page-select"></ul>
    `;

    var orderPerPage = 5;
    var numOfPages = Math.ceil(orders.length / orderPerPage);

    var str = "";
    for (let i = 1; i <= numOfPages; i++) {
        str = str + `
        <li class="page-item" data-page="${i}">
            <a class="page-item-text" href="javascript:void(0);">${i}</a>
        </li>
        `;
    }

    function loadOrder(page) {
        var start = orderPerPage * (page - 1);
        var end = orderPerPage * page;
        var ordersOfPage = orders.slice(start, end);

        var s = "";
        for (let i = 0; i < ordersOfPage.length; i++) {
            s = s + `
            <tr>
                <td>${ordersOfPage[i].code}</td>
                <td>${getDateFromString(ordersOfPage[i].paymentdate)}</td>
                <td>${ordersOfPage[i].name}</td>
                <td>${ordersOfPage[i].street}</td>
                <td>${ordersOfPage[i].district.toUpperCase()}</td>
                <td>${ordersOfPage[i].status}</td>
                <td><a href="#" class="warning" data-code="${ordersOfPage[i].code}" onclick="showOrderDetail(this)">Chi tiết</a></td>
            </tr>
            `;
        }

        document.getElementById('page-select').innerHTML = str;
        document.getElementById('order-details').innerHTML = s;
        document.querySelectorAll('.page-item')[page - 1].style.backgroundColor = '#11112f';
        document.querySelectorAll('.page-item-text')[page - 1].style.color = 'white';

        var pageBtns = document.querySelectorAll('.page-item');
        pageBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                var newPage = btn.getAttribute('data-page');
                loadOrder(newPage);
            });
        });
    }
    loadOrder(1);
}

function showOrderDetail(obj) {
    var order = orders.find(item => item.code == obj.getAttribute('data-code'));
    var index = orders.findIndex(item => item.code == obj.getAttribute('data-code'));

    var str = "";
    var price = 0;
    order.products_buy.forEach(item => {
        str = str + item.quantity + "x " + "SIZE " + item.sizes + " " + item.name_product + "; ";
        var priceOfProduct = parseInt(item.sell.replace(/[^0-9]/g, ""));
        var quantity = parseInt(item.quantity);
        price = price + quantity * priceOfProduct;
    });
    var priceString = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    priceString = priceString + "₫";


    document.querySelector('.order-detail').style.display = 'flex';
    document.querySelector('.order-detail').innerHTML = `
    <div class="close-detail">
        <a href="#" onclick="closeOrderDetail()"><i class="fa-solid fa-xmark"></i></a>
    </div>
    <div class="to-print">
        <h2>Chi tiết đơn hàng</h2>
        <h4>Thông tin đơn hàng</h4>
        <p>${str}</p>
        <h4>Mã đơn hàng</h4>
        <p>${order.code}</p>
        <h4>Tên khách hàng</h4>
        <p>${order.name}</p>
        <h4>Số điện thoại</h4>
        <p>${order.phone}</p>
        <h4>Địa chỉ</h4>
        <p>${order.street + " " + order.district}</p>
        <h4>Tổng giá tiền</h4>
        <p>${priceString}</p>
    </div>
    <h4>Tình trạng</h4>
    <select id="status-select">
        <option value="1">Đang xử lý</option>
        <option value="2">Đã xác nhận</option>
        <option value="3">Đã giao thành công</option>
        <option value="4">Đã hủy</option>
    </select>
    <a class="order-print" href="#" onclick="window.print()">In hóa đơn</a>
    `;
    var statusCode;
    if (order.status === "Đang xử lý") {
        statusCode = 1;
    }

    if (order.status === "Đã xác nhận") {
        statusCode = 2;
    }

    if (order.status === "Đã giao thành công") {
        statusCode = 3;
    }

    if (order.status === "Đã hủy") {
        statusCode = 4;
    }

    document.getElementById('status-select').value = statusCode;

    document.getElementById('status-select').addEventListener('change', () => {
        var currentStatusCode = document.getElementById('status-select').value;
        var currentStatus;
        if (currentStatusCode === "1") {
            currentStatus = "Đang xử lý";
        }

        if (currentStatusCode === "2") {
            currentStatus = "Đã xác nhận";
            orders[index].products_buy.forEach(product => {
                var productIndex = products.findIndex(item => product.id == item.id);
                if (products[productIndex].size[product.sizes] - parseInt(product.quantity) < 0) {
                    toast({ title: 'WARNING', message: 'Số lượng trong kho không đủ', type: 'warning', duration: 3000 });
                    document.getElementById('status-select').value = 4;
                    currentStatus = "Đã hủy";
                } else {
                    products[productIndex].size[product.sizes] -= product.quantity;
                }
            });
        }

        if (currentStatusCode === "3") {
            currentStatus = "Đã giao thành công";
        }

        if (currentStatusCode === "4") {
            currentStatus = "Đã hủy";
            orders[index].products_buy.forEach(product => {
                var productIndex = products.findIndex(item => product.id == item.id);
                products[productIndex].size[product.sizes] += parseInt(product.quantity);
            });
        }
        orders[index].status = currentStatus;
        localStorage.setItem('Allbill', JSON.stringify(orders));
        localStorage.setItem('products', JSON.stringify(products));
    });
}

function closeOrderDetail() {
    document.querySelector('.order-detail').style.display = 'none';
    showOrders();
}

function sortOrder() {
    var startDate = document.getElementById('start-date');
    var endDate = document.getElementById('end-date');
    var orderStatus = document.getElementById('order-status');
    var toSort = document.getElementById('sortDistrict');

    if ((startDate.value == "" && endDate.value != "") || (startDate.value != "" && endDate.value == "")) {
        if (startDate.value == "") {
            alert('Ngày bắt đầu chưa được chọn!');
            return;
        }

        if (endDate.value == "") {
            alert('Ngày kết thúc chưa được chọn!');
            return;
        }
    }

    var start, end;
    var ordersSelected = [];
    if (startDate.value != "" && endDate.value != "") {
        start = new Date(startDate.value);
        end = new Date(endDate.value);
        console.log(start);
        console.log(end);
        console.log(start.getTime() == end.getTime());

        if (orderStatus.value != "0") {
            if (orderStatus.value == "1") {
                orders.forEach(item => {
                    var dateStr = item.paymentdate.match(/\d{2}\/\d{2}\/\d{4}/);
                    var dateArr = dateStr[0].split('/');
                    var orderDate = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
                    if (item.status == "Đang xử lý" && orderDate.getDate() >= start.getDate() && orderDate.getDate() <= end.getDate()) {
                        ordersSelected.push(item);
                    }
                });
            } else if (orderStatus.value == "2") {
                orders.forEach(item => {
                    var dateStr = item.paymentdate.match(/\d{2}\/\d{2}\/\d{4}/);
                    var dateArr = dateStr[0].split('/');
                    var orderDate = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
                    if (item.status == "Đã xác nhận" && orderDate.getDate() >= start.getDate() && orderDate.getDate() <= end.getDate()) {
                        ordersSelected.push(item);
                    }
                });
            } else if (orderStatus.value == "3") {
                orders.forEach(item => {
                    var dateStr = item.paymentdate.match(/\d{2}\/\d{2}\/\d{4}/);
                    var dateArr = dateStr[0].split('/');
                    var orderDate = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
                    if (item.status == "Đã giao thành công" && orderDate.getDate() >= start.getDate() && orderDate.getDate() <= end.getDate()) {
                        ordersSelected.push(item);
                    }
                });
            } else if (orderStatus.value == "4") {
                orders.forEach(item => {
                    var dateStr = item.paymentdate.match(/\d{2}\/\d{2}\/\d{4}/);
                    var dateArr = dateStr[0].split('/');
                    var orderDate = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
                    if (item.status == "Đã hủy" && orderDate.getDate() >= start.getDate() && orderDate.getDate() <= end.getDate()) {
                        ordersSelected.push(item);
                    }
                });
            }
        } else {
            orders.forEach(item => {
                var dateStr = item.paymentdate.match(/\d{2}\/\d{2}\/\d{4}/);
                var dateArr = dateStr[0].split('/');
                var orderDate = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
                console.log(orderDate);
                if (orderDate.getDate() >= start.getDate() && orderDate.getDate() <= end.getDate()) {
                    ordersSelected.push(item);
                }
            });
        }
    } else {
        if (orderStatus.value != "0") {
            if (orderStatus.value == "1") {
                orders.forEach(item => {
                    if (item.status == "Đang xử lý") {
                        ordersSelected.push(item);
                    }
                });
            } else if (orderStatus.value == "2") {
                orders.forEach(item => {
                    if (item.status == "Đã xác nhận") {
                        ordersSelected.push(item);
                    }
                });
            } else if (orderStatus.value == "3") {
                orders.forEach(item => {
                    if (item.status == "Đã giao thành công") {
                        ordersSelected.push(item);
                    }
                });
            } else if (orderStatus.value == "4") {
                orders.forEach(item => {
                    if (item.status == "Đã hủy") {
                        ordersSelected.push(item);
                    }
                });
            }
        } else {
            ordersSelected = orders.slice();
        }
    }

    function standardlizeDistrict(str) {
        return str.replace(/Quận/g, "").trim();
    }

    if (toSort.checked) {
        ordersSelected.sort((a, b) => {
            var districtOfA = standardlizeDistrict(a.district);
            var districtOfB = standardlizeDistrict(b.district);

            if (!isNaN(districtOfA) && !isNaN(districtOfB)) {
                return districtOfA - districtOfB;
            }

            return districtOfA.localeCompare(districtOfB);
        });
    }

    var orderPerPage = 5;
    var numOfPages = Math.ceil(ordersSelected.length / orderPerPage);

    var str = "";
    for (let i = 1; i <= numOfPages && numOfPages != 1; i++) {
        str = str + `
        <li class="page-item" data-page="${i}">
            <a class="page-item-text" href="javascript:void(0);">${i}</a>
        </li>
        `;
    }

    function loadOrder(page) {
        var start = orderPerPage * (page - 1);
        var end = orderPerPage * page;
        var ordersOfPage = ordersSelected.slice(start, end);

        var s = "";
        for (let i = 0; i < ordersOfPage.length; i++) {
            s = s + `
            <tr>
                <td>${ordersOfPage[i].code}</td>
                <td>${getDateFromString(ordersOfPage[i].paymentdate)}</td>
                <td>${ordersOfPage[i].name}</td>
                <td>${ordersOfPage[i].street}</td>
                <td>${ordersOfPage[i].district.toUpperCase()}</td>
                <td>${ordersOfPage[i].status}</td>
                <td><a href="#" class="warning" data-code="${ordersOfPage[i].code}" onclick="showOrderDetail(this)">Chi tiết</a></td>
            </tr>
            `;
        }

        document.getElementById('page-select').innerHTML = str;
        document.getElementById('order-details').innerHTML = s;
        document.querySelectorAll('.page-item')[page - 1].style.backgroundColor = '#11112f';
        document.querySelectorAll('.page-item-text')[page - 1].style.color = 'white';

        var pageBtns = document.querySelectorAll('.page-item');
        pageBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                var newPage = btn.getAttribute('data-page');
                loadOrder(newPage);
            });
        });
    }
    loadOrder(1);
}


function showAdmin() {
    document.getElementById('bar-title').innerHTML = `
    <h2>Quản trị viên</h2>
    `;

    document.querySelector('.content').innerHTML = `
    <div class="admin-modify-form"></div>

    <div class="admin-adding-form"></div>

    <div class="admin-delete-confirmation-form"></div>

    <div class="customer-title">
        <h1>Danh sách quản trị viên</h1>
        <a href="#" class="add-user-btn" onclick="showAddingAdminForm()">
            Thêm quản trị viên
        </a>
    </div>

    <div class="customer-content">
        <table>
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Username</th>
                    <th>Trạng thái</th>
                    <th>Chức vụ</th>
                    <th>Hành động</th>
                </tr>
            </thead>

            <tbody id="customer-details">

            </tbody>
        </table>

    </div>

    <ul id="page-select" class="page-select"></ul>
    `;


    var adminPerPage = 8;
    var numOfPages = Math.ceil(admins.length / adminPerPage);

    var str = "";
    for (let i = 1; i <= numOfPages && numOfPages != 1; i++) {
        str = str + `
            <li class="page-item" data-page="${i}">
                <a class="page-item-text" href="javascript:void(0);">${i}</a>
            </li>
        `;
    }

    function loadPage(page) {
        var start = adminPerPage * (page - 1);
        var end = adminPerPage * page;
        var adminOfPage = admins.slice(start, end);
        var stt = start + 1;

        var s = "";
        for (let i = 0; i < adminOfPage.length; i++) {
            s = s + `
            <tr>
                <td>${stt}</td>
                <td>${adminOfPage[i].username}</td>
                <td>${adminOfPage[i].status}</td>
                <td>${adminOfPage[i].title}</td>
                <td>
                    <span>
                        <a href="#" class="warning" data-username="${adminOfPage[i].username}" onclick="showAdminDeleteConfirmation(this)">Xóa</a>
                    </span>
                    <span>
                        <a href="#" class="warning" data-username="${adminOfPage[i].username}" onclick="showAdminModify(this)">Sửa</a>
                    </span>
                </td>
            </tr>
            `;
            stt++;
        }

        document.getElementById('customer-details').innerHTML = s;
        document.getElementById('page-select').innerHTML = str;
        document.querySelectorAll('.page-item')[page - 1].style.backgroundColor = '#11112f';
        document.querySelectorAll('.page-item-text')[page - 1].style.color = 'white';

        var pageBtns = document.querySelectorAll('.page-item');
        pageBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                var page = parseInt(btn.getAttribute('data-page'));
                loadPage(page);
            });
        });
    }

    loadPage(1);
}

function showAdminDeleteConfirmation(obj) {
    const adminCurrent = JSON.parse(localStorage.getItem('currentAdmin')); // Lấy thông tin admin hiện tại
    const adminToDelete = admins.find(admin => admin.username === obj.getAttribute('data-username')); // Lấy thông tin admin cần xóa
    const adminList = JSON.parse(localStorage.getItem('admins'));
    const adminManageList = adminList.filter(admin => admin.title === "manage");
    console.log(adminManageList)

    // Kiểm tra quyền hạn
    if (adminCurrent.title === "contributors" && adminToDelete.title === "manage") {
        alert("Bạn không có quyền xóa quản lý.");
        return;
    }
    if (adminCurrent.title === "manage" && adminManageList.length == 1) {
        alert("Bạn phải giữ lại ít nhất 1 quản trị viên là Manage")
        return;
    }


    document.querySelector('.admin-delete-confirmation-form').style.display = 'block';
    document.querySelector('.admin-delete-confirmation-form').innerHTML = `
        <div class="confirm-top">
            XÓA QUẢN TRỊ VIÊN
        </div>

        <div class="confirm-content">
            Bạn có chắc chắn muốn xóa tài khoản quản trị viên "${adminToDelete.username}"?
        </div>

        <div class="confirm-btn-container">
            <a href="#" onclick="deleteAdmin(this)" data-username="${adminToDelete.username}">
                <div class="confirm-btn">Xóa</div>
            </a>
            <a href="#" onclick="closeAdminDeleteConfirmation()">
                <div class="confirm-btn">Bỏ qua</div>
            </a>
        </div>`;
}

function deleteAdmin(obj) {
    const adminCurrent = JSON.parse(localStorage.getItem('currentAdmin')); // Lấy thông tin admin hiện tại
    const usernameToDelete = obj.getAttribute('data-username'); // Lấy username cần xóa
    const adminToDelete = admins.find(admin => admin.username === usernameToDelete); // Lấy thông tin admin cần xóa

    // Kiểm tra quyền hạn trước khi xóa
    if (adminCurrent.title === "contributors" && adminToDelete.title === "manage") {
        alert("Bạn không có quyền xóa quản lý.");
        return;
    }

    // Thực hiện xóa admin
    admins = admins.filter(admin => admin.username !== usernameToDelete); // Lọc bỏ admin cần xóa
    localStorage.setItem('admins', JSON.stringify(admins)); // Cập nhật lại localStorage

    alert(`Đã xóa tài khoản quản trị viên "${usernameToDelete}".`);
    closeAdminDeleteConfirmation();
    showAdmin(); // Cập nhật lại danh sách hiển thị
}

function closeAdminDeleteConfirmation() {
    document.querySelector('.admin-delete-confirmation-form').style.display = 'none';
}

function showAdminModify(obj) {
    // Lấy thông tin người dùng đang đăng nhập
    var currentAdmin = JSON.parse(localStorage.getItem("currentAdmin"));

    if (!currentAdmin || currentAdmin.title === "contributors") {
        alert("Bạn không có quyền chỉnh sửa thông tin trang quản trị.");
        return; // Thoát nếu người dùng không có quyền
    }

    document.querySelector('.admin-modify-form').style.display = 'block';

    // Lấy thông tin admin cần chỉnh sửa
    var admin = admins.find(item => item.username == obj.getAttribute('data-username'));
    var indexOfAdmin = admins.findIndex(item => item.username == obj.getAttribute('data-username'));

    if (!admin) {
        alert("Không tìm thấy quản trị viên cần chỉnh sửa.");
        return;
    }

    // Hiển thị form chỉnh sửa
    document.querySelector('.admin-modify-form').innerHTML = `
        <div class="admin-modify-top">
            Thông tin quản trị viên
        </div>

        <div class="admin-modify-content">
            <form>
                <div class="form-item">
                    <label for="username">Tài khoản </label>
                    <br>
                    <input type="text" id="username" value="${admin.username}" disabled>
                </div>
                <br>

                <div class="form-item">
                    <label for="password">Mật khẩu </label>
                    <br>
                    <input type="text" id="password" value="${admin.password}">
                    <span class="text-danger" id="errol_pass_disable"></span>
                    <span class="text-danger" id="errol_pass_length"></span>
                </div>
                <br>

                <div class="form-item">
                    <label for="title">Chức vụ</label>
                    <br>
                    <select id="title" ${currentAdmin.title === "contributors" ? "disabled" : ""}>
                        <option value="manage" ${admin.title === "manage" ? "selected" : ""}>Quản lý</option>
                        <option value="contributors" ${admin.title === "contributors" ? "selected" : ""}>Cộng tác viên</option>
                    </select>
                </div>
                <br>

                <div class="form-item">
                    <label for="status">Trạng thái</label>
                    <br>
                    <select id="status">
                        <option value="true" ${admin.status === "Đang hoạt động" ? "selected" : ""}>Đang hoạt động</option>
                        <option value="false" ${admin.status === "Khoá" ? "selected" : ""}>Khoá</option>
                    </select>
                </div>
            </form>
        </div>

        <div class="admin-modify-btn-container">
            <a href="#" id="admin-save-btn">
                <div class="admin-modify-btn">
                    Lưu
                </div>
            </a>

            <a href="#" onclick="closeAdminModifyForm()">
                <div class="admin-modify-btn">
                    Thoát
                </div>
            </a>
        </div>
    `;

    // Thêm sự kiện cho nút lưu
    document.getElementById('admin-save-btn').addEventListener('click', () => {
        var password = document.getElementById('password').value;
        var title = document.getElementById('title').value;
        var status = document.getElementById('status').value === "true" ? "Đang hoạt động" : "Khoá";

        var validation = new Validation();
        var valid = true;

        // Kiểm tra hợp lệ mật khẩu
        valid &= validation.kiemtraRong(password, "#errol_pass_disable") & validation.kiemtraDodai(password, "#errol_pass_length", 6);

        if (!valid) {
            return; // Nếu không hợp lệ, thoát
        }

        // Kiểm tra quyền hạn: Không cho phép cộng tác viên sửa quản lý
        if (currentAdmin.title === "contributors" && admin.title === "manage") {
            alert("Bạn không được phép chỉnh sửa thông tin Quản lý.");
            return;
        }

        // Nếu đang sửa admin hiện tại, kiểm tra danh sách admin có ít nhất 2 quản lý
        if (currentAdmin.username === admin.username && title !== "manage") {
            var manageAdminsCount = admins.filter(admin => admin.title === "manage").length;

            if (manageAdminsCount < 1) {
                alert("Phải có ít nhất 1 người quản trị viên là Quản lý.");
                return;
            }
        }

        // Cập nhật thông tin admin
        admins[indexOfAdmin].password = password;
        admins[indexOfAdmin].title = title;
        admins[indexOfAdmin].status = status;

        // Lưu lại trong localStorage
        localStorage.setItem('admins', JSON.stringify(admins));

        // Nếu admin hiện tại bị sửa, cập nhật thông tin trong currentAdmin
        if (currentAdmin && currentAdmin.username === admin.username) {
            currentAdmin.password = password;
            currentAdmin.title = title;
            currentAdmin.status = status;
            localStorage.setItem("currentAdmin", JSON.stringify(currentAdmin));
        }

        closeAdminModifyForm();
        showAdmin(); // Cập nhật lại danh sách admin
    });
}


function showAddingAdminForm() {
    // Lấy thông tin người dùng hiện tại từ localStorage
    var currentAdmin = JSON.parse(localStorage.getItem("currentAdmin"));


    document.querySelector('.admin-adding-form').style.display = 'block';
    document.querySelector('.admin-adding-form').innerHTML = `
        <div class="admin-adding-top">
            Thông tin quản trị viên
        </div>

        <div class="admin-adding-content">
            <form>
                <div class="form-item">
                    <label for="username">Tài khoản </label>
                    <br>
                    <input type="text" id="username" placeholder="Nhập tài khoản">
                    <span class="text-danger" id="errol_user_disable"></span>
                    <span class="text-danger" id="errol_user_length"></span>
                    <span class="text-danger" id="errol_user_same"></span>
                </div>
                <br>

                <div class="form-item">
                    <label for="password">Mật khẩu </label>
                    <br>
                    <input type="text" id="password" placeholder="Nhập mật khẩu">
                    <span class="text-danger" id="errol_password_disable"></span>
                    <span class="text-danger" id="errol_password_length"></span>
                </div>
                <br>

                <div class="form-item">
                    <label for="title">Chức vụ</label>
                    <br>
                    <select id="title">
                        <option value="manage">Quản lý</option>
                        <option value="contributors">Cộng tác viên</option>
                    </select>
                </div>
                <br>

                <div class="form-item">
                    <label for="status">Trạng thái</label>
                    <br>
                    <select id="status">
                        <option value="true">Đang hoạt động</option>
                        <option value="false">Khoá</option>
                    </select>
                </div>
            </form>
        </div>

        <div class="admin-modify-btn-container">
            <a href="#" id="admin-save-btn">
                <div class="admin-modify-btn">
                    Thêm
                </div>
            </a>

            <a href="#" onclick="closeAdminAddingForm()">
                <div class="admin-modify-btn">
                    Thoát
                </div>
            </a>
        </div>
    `;

    document.getElementById('admin-save-btn').addEventListener('click', () => {
        var username = document.getElementById('username');
        var password = document.getElementById('password');
        var title = document.getElementById('title').value;
        var status = document.getElementById('status').value === "true" ? "Đang hoạt động" : "Khoá";

        var validation = new Validation();
        var valid = true;

        valid &= validation.kiemtraRong(username.value, '#errol_user_disable') &
            validation.kiemtraDodai(username.value, '#errol_user_length', 3) &
            validation.kiemtraRong(password.value, '#errol_password_disable') &
            validation.kiemtraDodai(password.value, '#errol_password_length', 6);


        if (admins.some(admin => admin.username === username.value)) {
            document.getElementById('errol_user_same').style.display = 'block';
            document.getElementById('errol_user_same').innerHTML = 'Tài khoản đã tồn tại!';
            valid = false;
        } else {
            document.getElementById('errol_user_same').style.display = 'none';
        }

        // Nếu không hợp lệ, thoát
        if (!valid) {
            return;
        }

        if (currentAdmin.title === "contributors" && title === "manage") {
            alert("Cộng tác viên không được phép thêm quản lý.");
            return;
        }

        var newAdmin = {
            username: username.value,
            password: password.value,
            title: title,
            status: status
        };

        admins.push(newAdmin);
        localStorage.setItem('admins', JSON.stringify(admins));
        closeAdminAddingForm();
        showAdmin();
    });
}

function closeAdminModifyForm() {
    document.querySelector('.admin-modify-form').style.display = 'none';
}

function closeAdminAddingForm() {
    document.querySelector('.admin-adding-form').style.display = 'none';
}