var admins = [
    {
        username: "admin",
        password: "admin@12345"
    }
];

function checkLogin() {
    var username = document.getElementById('username');
    var password = document.getElementById('password');

    if (username.value === "") {
        alert("Tài khoản không được để trống!");
        return;
    }

    if (password.value === "") {
        alert("Mật khẩu không được để trống!");
        return;
    }

    if (admins.some(admin => {
        return admin.username === username.value && admin.password === password.value
    })) {
        document.querySelector('.container').style.display = 'flex';
        document.querySelector('.login').style.display = 'none';
        writeMainContent();
        alert('Đăng nhập thành công!');
    } else {
        alert('Tài khoản hoặc mật khẩu không đúng');
    }
}

function logOut() {
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
    document.getElementById('bar-title').innerHTML = `
    <h2>Thêm sản phẩm</h2>
    `;

    document.querySelector('.content').innerHTML = `
    <div class="adding-top">
        <h1>Thêm sản phẩm mới</h1>
    </div>

    <div class="adding-content">
        <form>
            <div class="adding-content-item">
                <label for="id">ID: </label>
                <input type="text" id="id" placeholder="Nhập ID sản phẩm">
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
                <label for="discount">Giảm: </label>
                <input type="text" id="discount" placeholder="Nhập phần trăm giảm">
                <br>
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
}

// hàm để đặt lại dữ liệu trong form
function resetForm() {
    document.getElementById('id').value = '';
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

// hàm để kiểm tra và tạo sản phẩm mới đồng thời cập nhật lên local storage
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

    if (idField.value === '') {
        alert('ID sản phẩm không được bỏ trống');
        return;
    }

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

    if (discountField.value === '') {
        alert('Phẩn trăm giảm của sản phẩm không được bỏ trống');
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
    newProduct.price = orgPriceField.value;
    newProduct.sell = sellPriceField.value;
    newProduct.discount = discountField.value;
    newProduct.image = mainImgURL;
    newProduct.promo_image = {};

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
    resetForm();
}



var users = JSON.parse(localStorage.getItem('users'));

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
                    <option value="1">Đang xử lí</option>
                    <option value="2">Đã xác nhận</option>
                    <option value="3">Đã giao</option>
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
