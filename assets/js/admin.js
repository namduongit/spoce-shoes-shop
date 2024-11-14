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

function showProducts() {

    
    document.getElementById('bar-title').innerHTML = `
        <h2>Sản phẩm</h2>
    `;


    document.querySelector('.content').innerHTML = `
    <div class="delete-confirm">
        
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


    var products = JSON.parse(localStorage.getItem('products'));
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
                    <td><a href="#" class="warning" data-id="${productsOfPage[i].id}" onclick="showDeleteConfirmation(this)">XÓA</a></td>
                    <td><a href="#" class="warning" data-id="${productsOfPage[i].id}">SỬA</a></td>
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
        <a href="#">
            <div class="confirm-btn">Xóa</div>
        </a>
        <a href="#" onclick="closeDeleteConfirmation()">
            <div class="confirm-btn">Bỏ qua</div>
        </a>
    </div>
    `;
}

function closeDeleteConfirmation() {
    document.querySelector('.delete-confirm').innerHTML = ``;
    document.querySelector('.delete-confirm').style.display = 'none';
}


