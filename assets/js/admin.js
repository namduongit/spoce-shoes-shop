var admins = [
    {
        username: "admin",
        password: "admin@12345"
    }
];

function checkLogin() {
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var validation=new Validation();
    let valid=true;
    valid&=validation.kiemtraRong(username.value,"#errol_user_disabled")&validation.kiemtraRong(password.value,"#errol_pass_disabled");
    if(valid==0){
        return false;
    }


    if (admins.some(admin => {
        return admin.username === username.value && admin.password === password.value
    })) {
        let currentAdmin = {
            username: username.value,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('currentAdmin', JSON.stringify(currentAdmin));

        document.querySelector('.container').style.display = 'flex';
        document.querySelector('.login').style.display = 'none';
        toast({title:'SUCCESS',message:'Đăng nhập thành công"',type:'success',duration:3000});
        writeMainContent();

    } else {
        document.getElementById("errol_pass_disabled").innerHTML='Tài khoản hoặc mật khẩu không đúng';
        document.getElementById("errol_pass_disabled").style.display="block";
    }
}

function interFaceAdmin() {
    const adminCurrent = JSON.parse(localStorage.getItem('currentAdmin'));
    if (adminCurrent) {
        console.log("Admin hiện tại:", adminCurrent);
        document.querySelector('.container').style.display = 'flex';
        document.querySelector('.login').style.display = 'none';
        writeMainContent();
    } else {
        console.log("Không tìm thấy admin trong localStorage");
    }
}

window.onload = function() {
    interFaceAdmin();
}

function logOut() {
    localStorage.removeItem('currentAdmin'); // Xóa thông tin admin khỏi localStorage
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.login').style.display = 'block';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    alert('Đã đăng xuất!');
}

function showSideBar() {
    const sidebar = document.getElementById('side-bar');
    sidebar.classList.remove('slide-to-left');
    sidebar.classList.add('slide-to-right');
    sidebar.style.display = 'block';
}

function hideSideBar() {
    const sidebar = document.getElementById('side-bar');
    sidebar.classList.replace('slide-to-right','slide-to-left');
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
window.addEventListener('load',checkResolution);
window.addEventListener('resize',checkResolution);

// hàm khởi tạo giao diện chính
function writeMainContent() {
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
                                0
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
                                0
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
                                0
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
                                <td>Địa chỉ</td>
                                <td>Tình trạng</td>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>001</td>
                                    <td>ABC</td>
                                    <td>Chưa xử lí</td>
                                </tr>

                                <tr>
                                    <td>001</td>
                                    <td>ABC</td>
                                    <td>Chưa xử lí</td>
                                </tr>

                                <tr>
                                    <td>001</td>
                                    <td>ABC</td>
                                    <td>Chưa xử lí</td>
                                </tr>

                                <tr>
                                    <td>001</td>
                                    <td>ABC</td>
                                    <td>Chưa xử lí</td>
                                </tr>

                                <tr>
                                    <td>001</td>
                                    <td>ABC</td>
                                    <td>Chưa xử lí</td>
                                </tr>
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
    for (let i=1; i<=numOfPages; i++) {
        str = str + `
            <li class="page-item" data-page="${i}">
                <a class="page-item-text" href="javascript:void(0);">${i}</a>
            </li>
        `;
    }


    function loadProducts(page) {


        var start = itemsPerPage * (page - 1);
        var end = itemsPerPage * page;
        var productsOfPage = products.slice(start,end);


        var s = "";
        for (let i=0; i<productsOfPage.length; i++) {
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
        document.querySelectorAll('.page-item')[page-1].style.backgroundColor = 'black';
        document.querySelectorAll('.page-item-text')[page-1].style.color = 'white';


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


// hàm để xóa ảnh
function deleteImage() {
    var img = document.getElementById('form-img');
    img.src = '';
    img.alt = 'Không có ảnh';
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
        reader.onload = function(e) {
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

// hàm đóng form chỉnh sửa
function closeModifyingForm() {
    document.querySelector('.modifying').innerHTML = '';
    document.querySelector('.modifying').style.display = 'none';
}

// Form để sửa sản phẩm
function showModifyingForm(productId) {
    var form = document.querySelector('.modifying');
    form.style.display = 'block';
    var product = products.find(item => item.id === productId.getAttribute('data-id'));
    if (product.brand === 'clothes') {
        form.innerHTML = `
    <div class="modifying-top">
        SỬA SẢN PHẨM
    </div>

    <div class="modifying-content">
        <form>
            <div class="form-item">
            <label for="id">ID: </label>
            <input type="text" id="id" value="${product.id}">
            </div>
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
            <input type="text" id="discount" value="${product.discount}">
            </div>
            <br>
            <div class="form-item">
            <label for="quantity">Số lượng: </label>
            <select id="size-select" onchange="updateSizeQuantity(${product.id}, this)">
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="2XL">2XL</option>
                <option value="3XL">3XL</option>
            </select>
            <input type="text" id="quantity" value="${product.size.S}">
            </div>
            <br>
            <div class="form-image">
                <div class="form-image-item">
                    <label value="image">Hình ảnh: </label>
                </div>

                <div class="form-image-item">
                    <img src="${product.image}" id="form-img" alt="product-image">
                </div>

                <div class="form-image-item">
                    <button onclick="deleteImage(${product.id})">Xóa ảnh</button>
                </div>

                <div class="form-image-item">
                    <input type="file" onchange="changeImage(event)" accept="image/*">
                </div>
            </div>
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
    } else {
        form.innerHTML = `
    <div class="modifying-top">
        SỬA SẢN PHẨM
    </div>

    <div class="modifying-content">
        <form>
            <div class="form-item">
            <label for="id">ID: </label>
            <input type="text" id="id" value="${product.id}">
            </div>
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
            <input type="text" id="discount" value="${product.discount}">
            </div>
            <br>
            <div class="form-item">
            <label for="quantity">Số lượng: </label>
            <select id="size-select" onchange="updateSizeQuantity(${product.id}, this)">
                <option value="35">35</option>
                <option value="36">36</option>
                <option value="37">37</option>
                <option value="38">38</option>
                <option value="39">39</option>
                <option value="40">40</option>
                <option value="41">41</option>
                <option value="42">42</option>
                <option value="43">43</option>
                <option value="44">44</option>
            </select>
            <input type="text" id="quantity" value="${product.size["35"]}">
            </div>
            <br>
            <div class="form-image">
                <div class="form-image-item">
                    <label value="image">Hình ảnh: </label>
                </div>

                <div class="form-image-item">
                    <img src="${product.image}" id="form-img" alt="product-image">
                </div>

                <div class="form-image-item">
                    <button onclick="deleteImage(${product.id})">Xóa ảnh</button>
                </div>

                <div class="form-image-item">
                    <input type="file" onchange="changeImage(event)" accept="image/*">
                </div>
            </div>
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
    }

    document.getElementById('brand-select').value = product.brand;
    document.getElementById('save-btn').addEventListener('click', () => {
        var changedProductIndex = products.findIndex(item => item.id === productId.getAttribute('data-id'));
        var sizeSelect = document.getElementById('size-select').value;
        products[changedProductIndex].id = document.getElementById('id').value;
        products[changedProductIndex].name_product = document.getElementById('name').value;
        products[changedProductIndex].brand = document.getElementById('brand-select').value;
        products[changedProductIndex].price = document.getElementById('original-price').value;
        products[changedProductIndex].sell = document.getElementById('sell-price').value;
        products[changedProductIndex].discount = document.getElementById('discount').value;
        products[changedProductIndex].image = document.getElementById('form-img').src;
        products[changedProductIndex].size[sizeSelect] = parseInt(document.getElementById('quantity').value);

        localStorage.setItem('products', JSON.stringify(products));
        closeModifyingForm();
        showProducts();
    });
}

function updateSizeQuantity(productID, obj) {
    var quantityField = document.getElementById('quantity');
    var product = products.find(item => item.id == productID);
    if (obj.value === 'S') {
        quantityField.value = product.size["S"];
    }

    if (obj.value === 'M') {
        quantityField.value = product.size["M"];
    }

    if (obj.value === 'L') {
        quantityField.value = product.size["L"];
    }

    if (obj.value === 'XL') {
        quantityField.value = product.size["XL"];
    }

    if (obj.value === '2XL') {
        quantityField.value = product.size["2XL"];
    }

    if (obj.value === '3XL') {
        quantityField.value = product.size["3XL"];
    }

    if (obj.value === '35') {
        quantityField.value = product.size["35"];
    }

    if (obj.value === '36') {
        quantityField.value = product.size["36"];
    }

    if (obj.value === '37') {
        quantityField.value = product.size["37"];
    }

    if (obj.value === '38') {
        quantityField.value = product.size["38"];
    }

    if (obj.value === '39') {
        quantityField.value = product.size["39"];
    }

    if (obj.value === '40') {
        quantityField.value = product.size["40"];
    }

    if (obj.value === '41') {
        quantityField.value = product.size["41"];
    }

    if (obj.value === '42') {
        quantityField.value = product.size["42"];
    }

    if (obj.value === '43') {
        quantityField.value = product.size["43"];
    }

    if (obj.value === '44') {
        quantityField.value = product.size["44"];
    }
}

// hàm xóa sản phẩm khỏi mảng và cập nhật lên local storage
function deleteProduct(productId) {
    var productToBeRemovedIndex = products.findIndex(item => item.id === productId.getAttribute('data-id'));
    products.splice(productToBeRemovedIndex,1);
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
        <form>
            <div class="inner-left">
                <div class="adding-content-item">
                    <label for="id">ID: </label>
                    <input type="text" id="id" placeholder="Nhập ID sản phẩm" disabled value="${parseInt(products[products.length - 1].id) + 1}">
                    <br>
                </div>

                <div class="adding-content-item">
                    <label for="name">Tên sản phẩm:</label>
                    <input type="text" id="name" placeholder="Nhập tên sản phẩm">
                    <br>
                </div>

                <div class="adding-content-item">
                    <label for="brand-select">Nhãn hiệu: </label>
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
                    <label for="original-price">Giá gốc: </label>
                    <input type="text" id="original-price" placeholder="Nhập giá gốc">
                    <br>
                </div>

                <div class="adding-content-item">
                    <label for="sell-price">Giá bán: </label>
                    <input type="text" id="sell-price" placeholder="Nhập giá bán">
                    <br>
                </div>

                <div class="adding-content-item">
                    <button onclick="calculateDiscount()">Tính giảm</button>
                </div>

                <div class="adding-content-item">
                    <label for="discount">Giảm: </label>
                    <input type="text" id="discount" placeholder="Ấn nút để tính" disabled>
                    <br>
                </div>

                <div class="adding-content-item">
                    <label for="size-select">Thêm tất cả số lượng cho size: </label>
                    <select id="size-select" disabled>
                    </select>

                </div>
            </div>

            <div class="inner-right">
                <div class="adding-content-item">
                    <label for="quantity">Số lượng: </label>
                    <input type="text" id="quantity" placeholder="Nhập số lượng">
                </div>

                <div class="adding-content-item">
                    <label for="main-img">Ảnh chính:</label>
                    <input type="file" id="main-img" accept="image/*">
                    <br>
                </div>

                <div class="adding-content-item">
                    <label for="promo-1">Ảnh Promo 1: </label>
                    <input type="file" id="promo-1" accept="image/*">
                    <br>
                </div>

                <div class="adding-content-item">
                    <label for="promo-2">Ảnh Promo 2: </label>
                    <input type="file" id="promo-2" accept="image/*">
                    <br>
                </div>

                <div class="adding-content-item">
                    <label for="promo-3">Ảnh Promo 3: </label>
                    <input type="file" id="promo-3" accept="image/*">
                    <br>
                </div>

                <div class="adding-content-item">
                    <label for="promo-4">Ảnh Promo 4: </label>
                    <input type="file" id="promo-4" accept="image/*">
                    <br>
                </div>
            </div>

        </form>
    </div>

    <div class="adding-btn-container">
        <a href="#" onclick="addingProduct()">
            <div class="adding-btn">Thêm</div>
        </a>

        <a href="#" onclick="resetForm()">
            <div class="adding-btn">Đặt lại</div>
        </a>
    </div>
    `;

    // Add event listener to brand select
    document.getElementById('brand-select').addEventListener('change', () => {
    const brand = document.getElementById('brand-select').value;
    const select = document.getElementById('size-select');
    if (brand === 'clothes') {
        select.innerHTML = `
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
        <option value="2XL">2XL</option>
        <option value="3XL">3XL</option>
        `;
    }
    else if (brand === 'nike' || brand === 'adidas' || brand === 'VANS' || brand === 'converse') {
        select.innerHTML = `
        <option value="35">35</option>
        <option value="36">36</option>
        <option value="37">37</option>
        <option value="38">38</option>
        <option value="39">39</option>
        <option value="40">40</option>
        <option value="41">41</option>
        <option value="42">42</option>
        <option value="43">43</option>
        <option value="44">44</option>
        `;
    }
    });
}

function calculateDiscount() {
    var originalPrice = document.getElementById('original-price').value;
    var sellPrice = document.getElementById('sell-price').value;
    // Loại bỏ để đưa về thành số
    originalPrice = originalPrice.replace(/\./g, '');
    originalPrice = originalPrice.replace('đ', '');
    sellPrice = sellPrice.replace(/\./g, '');
    sellPrice = sellPrice.replace('đ', '');
    // Tính giảm theo phần trăm
    var discount = (originalPrice - sellPrice) / originalPrice * 100;
    // Đưa giá trị vào ô giảm
    document.getElementById('discount').value = discount;


    // Cho 2 thẻ kia thay đổi theo formatMoney
    document.getElementById('original-price').value = formatMoney(parseInt(originalPrice));
    document.getElementById('sell-price').value = formatMoney(parseInt(sellPrice));
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
    document.getElementById('quantity').value = '';
    document.getElementById('sell-price').value = '';
    document.getElementById('discount').value = '';
    document.getElementById('main-img').value = '';
    document.getElementById('promo-1').value = '';
    document.getElementById('promo-2').value = '';
    document.getElementById('promo-3').value = '';
    document.getElementById('promo-4').value = '';
}

// hàm để kiểm tra và tạo sản phẩm mới đồng thời cập nhật lên local storage
function addingProduct() {

    var idField = document.getElementById('id');
    var nameField = document.getElementById('name');
    var brandField = document.getElementById('brand-select');
    var orgPriceField = document.getElementById('original-price');
    var sellPriceField = document.getElementById('sell-price');
    var discountField = document.getElementById('discount');
    var qualityField = document.getElementById('quantity');
    var sizeField = document.getElementById('size-select');
    var mainImg = document.getElementById('main-img');
    var promo1 = document.getElementById('promo-1');
    var promo2 = document.getElementById('promo-2');
    var promo3 = document.getElementById('promo-3');
    var promo4 = document.getElementById('promo-4');


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

    if (qualityField.value === '') {
        alert('Số lượng sản phẩm không được bỏ trống');
        return;
    }

    if (sizeField.value === '') {
        alert('Size sản phẩm không được bỏ trống');
        return;
    }

    if (mainImg.value === '') {
        alert('Ảnh sản phẩm không được bỏ trống');
        return;
    }


    var mainImgFile = mainImg.files[0];
    var mainImgURL = URL.createObjectURL(mainImgFile);

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
    // Mảng con
    newProduct.size = {};
    newProduct.sizes =
    ["39", "40", "41", "42", "43", "44"];
    newProduct.promo_image = {};

    // Nếu size là clothes thì thêm size và số lượng vào mảng size
    // VD: size: {S: 50, M: 50, L: 50, XL: 50, 2XL: 50, 3XL: 50}
    if (newProduct.brand === 'clothes') {
        newProduct.size.S = parseInt(qualityField.value);
        newProduct.size.M = parseInt(qualityField.value);
        newProduct.size.L = parseInt(qualityField.value);
        newProduct.size.XL = parseInt(qualityField.value);
        newProduct.size['2XL'] = parseInt(qualityField.value);
        newProduct.size['3XL'] = parseInt(qualityField.value);
        newProduct.sizes.push('S');
        newProduct.sizes.push('M');
        newProduct.sizes.push('L');
        newProduct.sizes.push('XL');
        newProduct.sizes.push('2XL');
        newProduct.sizes.push('3XL');
    } else {
        // Size từ 39 -> 40
        newProduct.size['39'] = parseInt(qualityField.value);
        newProduct.size['40'] = parseInt(qualityField.value);
        newProduct.size['41'] = parseInt(qualityField.value);
        newProduct.size['42'] = parseInt(qualityField.value);
        newProduct.size['43'] = parseInt(qualityField.value);
        newProduct.size['44'] = parseInt(qualityField.value);
    }

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

    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    alert('Thêm sản phẩm thành công');
    resetForm();
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
                count: 0
            };
            productsName.push(newProduct);
        }
    });
}
console.log(brandList);
console.log(productsName);

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
    for (let i=1; i<=numOfPages; i++) {
        str = str + `
            <li class="page-item" data-page="${i}">
                <a class="page-item-text" href="javascript:void(0);">${i}</a>
            </li>
        `;
    }

    function loadPage(page) {
        var start = userPerPage * (page - 1);
        var end = userPerPage * page;
        var userOfPage = users.slice(start,end);
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
        document.querySelectorAll('.page-item')[page-1].style.backgroundColor = 'black';
        document.querySelectorAll('.page-item-text')[page-1].style.color = 'white';

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
                    <label for="username">Tài khoản: </label>
                    <input type="text" id="username" value="${user.username}">
                </div>
                <br>

                <div class="form-item">
                    <label for="password">Mật khẩu: </label>
                    <input type="text" id="password" value="${user.password}">

                </div>
                <br>

                <div class="form-item">
                    <label for="fullname">Họ tên: </label>
                    <input type="text" id="fullname" value="${user.fullname}">

                </div>
                <br>

                <div class="form-item">
                    <label for="email">Email: </label>
                    <input type="text" id="email" value="${user.email}">

                </div>
                <br>

                <div class="form-item">
                    <label for="phone">Số điện thoại: </label>
                    <input type="text" id="phone" value="${user.phone}">

                </div>
                <br>

                <div class="form-item">
                    <label for="account-status">Trạng thái: </label>
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
        users[indexOfUser].username = document.getElementById('username').value;
        users[indexOfUser].password = document.getElementById('password').value;
        users[indexOfUser].fullname = document.getElementById('fullname').value;
        users[indexOfUser].email = document.getElementById('email').value;
        users[indexOfUser].phone = document.getElementById('phone').value;
        users[indexOfUser].active = status;
        localStorage.setItem('users', JSON.stringify(users));
        var usercurrent=JSON.parse(localStorage.getItem("usercurrent"));
        if(usercurrent){
            usercurrent.username = document.getElementById('username').value;
            usercurrent.password = document.getElementById('password').value;
            usercurrent.fullname = document.getElementById('fullname').value;
            usercurrent.email = document.getElementById('email').value;
            usercurrent.phone = document.getElementById('phone').value;
            usercurrent.active = status;
            localStorage.setItem("usercurrent",JSON.stringify(usercurrent));
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
                    <label for="username">Tài khoản: </label>
                    <input type="text" id="username" placeholder="Nhập tài khoản">
                </div>
                <br>

                <div class="form-item">
                    <label for="password">Mật khẩu: </label>
                    <input type="text" id="password" placeholder="Nhập mật khẩu">

                </div>
                <br>

                <div class="form-item">
                    <label for="fullname">Họ tên: </label>
                    <input type="text" id="fullname" placeholder="Nhập họ tên">

                </div>
                <br>

                <div class="form-item">
                    <label for="email">Email: </label>
                    <input type="text" id="email" placeholder="Nhập email">

                </div>
                <br>

                <div class="form-item">
                    <label for="phone">Số điện thoại: </label>
                    <input type="text" id="phone" placeholder="Nhập số điện thoại">

                </div>
                <br>

                <div class="form-item">
                    <label for="account-status">Trạng thái: </label>
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

        if (username.value === "") {
            alert("Tài khoản không được để trống.");
            return;
        }

        if (password.value === "") {
            alert("Mật khẩu không được để trống.");
            return;
        }

        if (password.value.length < 6) {
            alert("Mật khẩu không được ít hơn 6 kí tự.");
            return;
        }

        if (fullname.value === "") {
            alert("Họ tên không được để trống.");
            return;
        }

        if (emailAddress.value === "") {
            alert("Email không được để trống.");
            return;
        }

        if (phoneNumber.value === "") {
            alert("Số điện thoại không được để trống.");
            return;
        }

        if (users.some(user => {
            return user.username === username.value;
        })) {
            alert("Tài khoản đã tồn tại!");
            return;
        }

        if (users.some(user => {
            return user.email === emailAddress.value;
        })) {
            alert("Email đã tồn tại");
            return;
        }

        if (users.some(user => {
            return user.phone === phoneNumber.value;
        })) {
            alert("Số điện thoại đã tồn tại!");
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
                <div class="section-one">
                    <div class="section-one-title">
                        <h3>Thống kê đơn hàng</h3>
                    </div>
                    <div class="section-one-info">
                        <div class="month-info">
                            <label for="month-select">Chọn tháng: </label>
                            <input type="text" id="month-select" placeholder="Nhập tháng">
                        </div>
                        <div class="year-info">
                            <label for="year-select">Chọn năm: </label>
                            <input type="text" id="year-select" placeholder="Nhập năm">
                        </div>
                    </div>
                    <div class="search-btn">
                        <a href="#" onclick="searchOrder()">Tìm kiếm</a>
                    </div>
                </div>
                <div class="section-two">
                    <div class="statistic-info">
                        <h3>Thống kể tổng đơn hàng theo ngày</h3>
                        <div class="date-info">
                            <p class="date-start">Từ: </p>
                            <p class="date-end">Đến: </p>
                        </div>
                    </div>

                    <div class="chart-container">

                            <!-- Biểu đồ cột sẽ được vẽ ở đây -->
                            <canvas id="orderChart"></canvas>

                    </div>
                </div>
                <div class="section-three">
                        <div class="total-info-now">
                            <div>
                                <h3 class="total-info-now-title">Thống kê hàng tháng: </h3>
                            </div>
                            <p id="total-order">Tổng số đơn hàng: </p>
                            <p id="total-quantity">Tổng số lượng: </p>
                            <p id="total-revenue">Tổng doanh thu: </p>
                            <p id="most-brand">Band bán chạy nhất: </p>
                            <p id="most-product">Sản phẩm bán chạy nhất: </p>
                        </div>

                        <div class="total-info-last">
                            <div>
                                <h3 class="total-info-last-title">Thống kê hàng tháng trước: </h3>
                            </div>
                            <div class="total-info-last-content">
                                <p id="total-order-last">Tổng đơn tháng trước: </p>
                                <p id="total-quantity-last">Tổng số lượng tháng trước: </p>
                                <p id="total-revenue-last">Tổng doanh thu tháng trước</p>
                                <p id="most-brand-last">Brand bán chạy nhất tháng trước: </p>
                                <p id="most-product-last">Sản phẩm bán chạy nhất tháng trước: </p>
                            </div>
                </div>
            </div>
            <div class="foot-content">
                <!-- Các thông tin thêm có thể thêm ở đây -->
            </div>
        </div>
    `;

    // Vẽ biểu đồ sau khi chèn nội dung
    var ctx = document.getElementById('orderChart').getContext('2d');
    orderChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [], // Nhãn sẽ được cập nhật trong searchOrder
            datasets: [{
                label: 'Hàng',
                data: [], // Số liệu sẽ được cập nhật trong searchOrder
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1,
                barThickness: 15 // Điều chỉnh độ dày của cột (giảm bớt nếu cần)
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        color: 'rgba(0, 0, 0, 0.8)', // Màu của các nhãn trên trục X
                        font: {
                            weight: 'bold' // Độ đậm của font chữ trục X
                        },
                        maxRotation: 45, // Cho phép xoay nhãn nếu quá dài
                        minRotation: 0
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.3)' // Màu của đường lưới trục X
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1, // Các bước nhảy trên trục y
                        color: 'rgba(0, 0, 0, 0.8)', // Màu của các nhãn trên trục Y
                        font: {
                            weight: 'bold' // Độ đậm của font chữ trục Y
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.5)' // Màu của đường lưới trục Y
                    }
                }
            },
            responsive: true,
            elements: {
                bar: {
                    categoryPercentage: 0.85, // Giảm khoảng cách giữa các cột
                    barPercentage: 0.7 // Điều chỉnh chiều rộng cột để có thêm không gian
                }
            }
        }
    });

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
            count: 0
        };
        productsName.push(newProduct);
    }
});

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
                count: 0
            };
            productsName.push(newProduct);
        }
    });
}

function searchOrder() {
    var month = parseInt(document.getElementById('month-select').value);
    var year = parseInt(document.getElementById('year-select').value);

    var allBill = JSON.parse(localStorage.getItem('Allbill'));


    // Kiểm tra dữ liệu nhập
    if (isNaN(month) || isNaN(year)) {
        alert('Vui lòng nhập tháng và năm hợp lệ');
        return;
    }
    if (month < 1 || month > 12) {
        alert('Tháng không hợp lệ');
        return;
    }
    if (year < 2020 || year > new Date().getFullYear()) {
        alert('Năm không hợp lệ');
        return;
    }

    let totalQuantity = 0;
    let totalMoney = 0;
    let mostBrand = '';
    let mostProduct = '';


    document.querySelector('.date-info .date-start').innerText = `Từ: 01/${month}/${year}`;
    document.querySelector('.date-info .date-end').innerText = `Đến: ${new Date(year, month, 0).getDate()}/${month}/${year}`;

    // Lấy danh sách các hóa đơn trong tháng/năm
    const billOfSelectDate = allBill.filter(item => {
        let dateOfBill = item.paymentdate.split(' ')[2];
        let [day, monthOfBill, yearOfBill] = dateOfBill.split('/');
        return parseInt(monthOfBill) === month && parseInt(yearOfBill) === year;
    });

    // Tính số ngày trong tháng
    const daysInMonth = new Date(year, month, 0).getDate();
    // Tạo mảng có số ngày trong tháng và khởi tạo bằng 0
    let dayCounts = Array(daysInMonth).fill(0);
    resetDataList();
    // Đếm số đơn hàng theo từng ngày
    billOfSelectDate.forEach(item => {
        let dateOfBill = item.paymentdate.split(' ')[2];
        let day = parseInt(dateOfBill.split('/')[0]);
        dayCounts[day - 1] += 1; // Tăng số lượng đơn hàng cho ngày tương ứng
        // Tính tổng số lượng và doanh thu
        let products_buy = item.products_buy;
        products_buy.forEach(pro => {
            totalQuantity += parseInt(pro.quantity);
            totalMoney += parseInt(pro.sell.replace(/[^0-9]/g, '')) * parseInt(pro.quantity);
            let nameBrand = pro.brand;
            let nameProduct = pro.name_product;
            brandList.forEach(brand => {
                if (brand.brand === nameBrand) {
                    brand.count += parseInt(pro.quantity);
                }
            });

            productsName.forEach(product => {
                if (product.name === nameProduct) {
                    product.count += parseInt(pro.quantity);
                }
            });


        });
        let max_brand = 0;
        brandList.forEach(brand => {
            if (brand.count > max_brand) {
                max_brand = brand.count;
                mostBrand = brand.brand;
            };
        });
        let max_product = 0;
        productsName.forEach(product => {
            if (product.count > max_product) {
                max_product = product.count;
                mostProduct = product.name;
            };
        });

    });

    // Tìm giá trị lớn nhất trong mảng dayCounts
    const maxOrders = Math.max(...dayCounts);
    const maxValue = Math.ceil(maxOrders * 1.1);

    // Tạo nhãn (labels) cho từng ngày trong tháng
    let labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}/${month}`);

    // Cập nhật dữ liệu và trục y của biểu đồ
    orderChart.data.labels = labels;
    orderChart.data.datasets[0].data = dayCounts;
    orderChart.options.scales.y.max = maxValue;
    orderChart.update();


    // Cập nhật dữ liệu vào total now
    document.getElementsByClassName('total-info-now-title')[0].innerHTML += ` ${month}/${year}`;
    document.getElementById('total-order').innerHTML = `Tổng số đơn hàng: ${billOfSelectDate.length}`;
    document.getElementById('total-quantity').innerHTML = `Tổng số lượng: ${totalQuantity}`;
    document.getElementById('total-revenue').innerHTML = `Tổng doanh thu: ${totalMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`;
    document.getElementById('most-brand').innerHTML = `Brand bán chạy nhất: ${mostBrand}`;
    document.getElementById('most-product').innerHTML = `Sản phẩm bán chạy nhất: ${mostProduct}`;


    // Làm dữ liệu cho tháng trước

    let totalQuantityLast = 0;
    let totalMoneyLast = 0;
    let mostBrandLast = 0;
    let mostProductLast = 0;

    let lastMonth = month - 1; // Js tự hiểu phép trừ
    let lastYear = year;
    if (lastMonth === 0) {
        lastMonth = 12;
        lastYear = year - 1;
    }
    const billOfLastMonth = allBill.filter(item => {
        let dateOfBill = item.paymentdate.split(' ')[2];
        let [day, monthOfBill, yearOfBill] = dateOfBill.split('/');
        return parseInt(monthOfBill) === lastMonth && parseInt(yearOfBill) === lastYear;
    });

    // Đếm thông tin trong billOfLastMonth
    resetDataList();
    billOfLastMonth.forEach(item => {
        let products_buy = item.products_buy;
        products_buy.forEach(pro => {
            totalQuantityLast += parseInt(pro.quantity);
            totalMoneyLast += parseInt(pro.sell.replace(/[^0-9]/g, '')) * parseInt(pro.quantity);
            let nameBrand = pro.brand;
            let nameProduct = pro.name_product;
            brandList.forEach(brand => {
                if (brand.brand === nameBrand) {
                    brand.count += parseInt(pro.quantity);
                }
            });

            productsName.forEach(product => {
                if (product.name === nameProduct) {
                    product.count += parseInt(pro.quantity);
                }
            });
        });
    });
    let max_brand_last = 0;
    brandList.forEach(brand => {
        if (brand.count > max_brand_last) {
            max_brand_last = brand.count;
            mostBrandLast = brand.brand;
        };
    });
    let max_product_last = 0;
    productsName.forEach(product => {
        if (product.count > max_product_last) {
            max_product_last = product.count;
            mostProductLast = product.name;
        };
    });

    // Câp nhật dữ liệu vào total last
    document.getElementsByClassName('total-info-last-title')[0].innerHTML += ` ${lastMonth}/${lastYear}`;
    document.getElementById('total-order-last').innerHTML = `Tổng số đơn hàng tháng trước: ${billOfLastMonth.length}`;
    document.getElementById('total-quantity-last').innerHTML = `Tổng số lượng tháng trước: ${totalQuantityLast}`;
    document.getElementById('total-revenue-last').innerHTML = `Tổng doanh thu tháng trước: ${totalMoneyLast.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`;
    document.getElementById('most-brand-last').innerHTML = `Brand bán chạy nhất tháng trước: ${mostBrandLast}`;
    document.getElementById('most-product-last').innerHTML = `Sản phẩm bán chạy nhất tháng trước: ${mostProductLast}`;
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
                <input type="date" id="start-date">
                <input type="date" id="end-date">
                </div>
                <br>
                <div class="form-item">
                <label for="order-status">Tình trạng</label>
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
                    <th>Khách hàng</th>
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
    for (let i=1; i<=numOfPages; i++) {
        str = str + `
        <li class="page-item" data-page="${i}">
            <a class="page-item-text" href="javascript:void(0);">${i}</a>
        </li>
        `;
    }

    function loadOrder(page) {
        var start = orderPerPage * (page - 1);
        var end = orderPerPage * page;
        var ordersOfPage = orders.slice(start,end);

        var s = "";
        for (let i=0; i<ordersOfPage.length; i++) {
            s = s + `
            <tr>
                <td>${ordersOfPage[i].code}</td>
                <td>${ordersOfPage[i].name}</td>
                <td>${ordersOfPage[i].district.toUpperCase()}</td>
                <td>${ordersOfPage[i].status}</td>
                <td><a href="#" class="warning" data-code="${ordersOfPage[i].code}" onclick="showOrderDetail(this)">Chi tiết</a></td>
            </tr>
            `;
        }

        document.getElementById('page-select').innerHTML = str;
        document.getElementById('order-details').innerHTML = s;
        document.querySelectorAll('.page-item')[page-1].style.backgroundColor = 'black';
        document.querySelectorAll('.page-item-text')[page-1].style.color = 'white';

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
        str = str + item.quantity + "x " + item.name_product + "; ";
        var priceOfProduct = parseInt(item.sell.replace(/[^0-9]/g, ""));
        var quantity = parseInt(item.quantity);
        price = price + quantity * priceOfProduct;
    });
    var priceString = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");
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
        <h4>Tên khách hàng</h4>
        <p>${order.name}</p>
        <h4>Số điện thoại</h4>
        <p>${order.phone}</p>
        <h4>Địa chỉ</h4>
        <p>${order.street}</p>
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
        }

        if (currentStatusCode === "3") {
            currentStatus = "Đã giao thành công";
        }

        if (currentStatusCode === "4") {
            currentStatus = "Đã hủy";
        }
        orders[index].status = currentStatus;
        localStorage.setItem('Allbill', JSON.stringify(orders));
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

        if (orderStatus.value != "0") {
            if (orderStatus.value == "1") {
                orders.forEach(item => {
                    var dateStr = item.paymentdate.match(/\d{2}\/\d{2}\/\d{4}/);
                    var dateArr = dateStr[0].split('/');
                    var orderDate = new Date(dateArr[2],dateArr[1]-1,dateArr[0]);
                    if (item.status == "Đang xử lý" && orderDate >= start && orderDate <= end) {
                         ordersSelected.push(item);
                    }
                });
            } else if (orderStatus.value == "2") {
                orders.forEach(item => {
                    var dateStr = item.paymentdate.match(/\d{2}\/\d{2}\/\d{4}/);
                    var dateArr = dateStr[0].split('/');
                    var orderDate = new Date(dateArr[2],dateArr[1]-1,dateArr[0]);
                    if (item.status == "Đã xác nhận" && orderDate >= start && orderDate <= end) {
                        ordersSelected.push(item);
                    }
                });
            } else if (orderStatus.value == "3") {
                orders.forEach(item => {
                    var dateStr = item.paymentdate.match(/\d{2}\/\d{2}\/\d{4}/);
                    var dateArr = dateStr[0].split('/');
                    var orderDate = new Date(dateArr[2],dateArr[1]-1,dateArr[0]);
                    if (item.status == "Đã giao thành công" && orderDate >= start && orderDate <= end) {
                        ordersSelected.push(item);
                    }
                });
            } else if (orderStatus.value == "4" && orderDate >= start && orderDate <= end) {
                orders.forEach(item => {
                    var dateStr = item.paymentdate.match(/\d{2}\/\d{2}\/\d{4}/);
                    var dateArr = dateStr[0].split('/');
                    var orderDate = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
                    if (item.status == "Đã hủy") {
                        ordersSelected.push(item);
                    }
                });
            }
        } else {
            orders.forEach(item => {
                var dateStr = item.paymentdate.match(/\d{2}\/\d{2}\/\d{4}/);
                var dateArr = dateStr[0].split('/');
                var orderDate = new Date(dateArr[2],dateArr[1]-1,dateArr[0]);
                if (orderDate >= start && orderDate <= end) {
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
        return str.replace(/Quận/g,"").trim();
    }

    if (toSort.checked) {
        ordersSelected.sort((a,b) => {
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
    for (let i=1; i<=numOfPages; i++) {
        str = str + `
        <li class="page-item" data-page="${i}">
            <a class="page-item-text" href="javascript:void(0);">${i}</a>
        </li>
        `;
    }

    function loadOrder(page) {
        var start = orderPerPage * (page - 1);
        var end = orderPerPage * page;
        var ordersOfPage = ordersSelected.slice(start,end);

        var s = "";
        for (let i=0; i<ordersOfPage.length; i++) {
            s = s + `
            <tr>
                <td>${ordersOfPage[i].code}</td>
                <td>${ordersOfPage[i].name}</td>
                <td>${ordersOfPage[i].district.toUpperCase()}</td>
                <td>${ordersOfPage[i].status}</td>
                <td><a href="#" class="warning" data-code="${ordersOfPage[i].code}" onclick="showOrderDetail(this)">Chi tiết</a></td>
            </tr>
            `;
        }

        document.getElementById('page-select').innerHTML = str;
        document.getElementById('order-details').innerHTML = s;
        document.querySelectorAll('.page-item')[page-1].style.backgroundColor = 'black';
        document.querySelectorAll('.page-item-text')[page-1].style.color = 'white';

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
