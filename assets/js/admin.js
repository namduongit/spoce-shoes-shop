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
    document.getElementById('brand-select').value = product.brand;
    document.getElementById('save-btn').addEventListener('click', () => {
        var changedProductIndex = products.findIndex(item => item.id === productId.getAttribute('data-id'));
        products[changedProductIndex].id = document.getElementById('id').value;
        products[changedProductIndex].name_product = document.getElementById('name').value;
        products[changedProductIndex].brand = document.getElementById('brand-select').value;
        products[changedProductIndex].price = document.getElementById('original-price').value;
        products[changedProductIndex].sell = document.getElementById('sell-price').value;
        products[changedProductIndex].discount = document.getElementById('discount').value;
        products[changedProductIndex].image = document.getElementById('form-img').src;

        localStorage.setItem('products', JSON.stringify(products));
        closeModifyingForm();
        showProducts();
    });
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
                <input type="text" id="id">
                <br>
            </div>

            <div class="adding-content-item">
                <label for="name">Tên sản phẩm:</label>
                <input type="text" id="name">
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
                <input type="text" id="original-price">
                <br>
            </div>

            <div class="adding-content-item">
                <label for="sell-price">Giá bán: </label>
                <input type="text" id="sell-price">
                <br>
            </div>

            <div class="adding-content-item">
                <label for="discount">Giảm: </label>
                <input type="text" id="discount">
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


