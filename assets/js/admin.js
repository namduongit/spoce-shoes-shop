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
function writeMainPage() {
    document.querySelector('.container').innerHTML = `
        <div class="sidebar">
            <div class="top-sidebar">
                <div class="logo">
                    <a href=""><img src="assets/image/logo/logo-header-1.png" alt="logo"></a>
                </div>
                <div class="mini-logo">
                    <a href=""><img src="assets/image/logo/logo-shop-2.png" alt="mini-logo"></a>
                </div>
                <div class="exit-button">
                    <a href="" onclick="event.preventDefault(); hideSideBar()"><i class="fa-solid fa-xmark"></i></a>
                </div>
            </div>
            <div class="sidebar-content">
                <div class="sidebar-item">
                    <a href="">
                        <i class="fa-solid fa-user"></i>
                        <h3>Khách hàng</h3>
                    </a>
                </div>
                <div class="sidebar-item">
                    <a href="">
                        <i class="fa-solid fa-receipt"></i>
                        <h3>Đơn hàng</h3>
                    </a>
                </div>
                <div class="sidebar-item">
                    <a href="">
                        <i class="fa-solid fa-chart-simple"></i>
                        <h3>Thống kê</h3>
                    </a>
                </div>
                <div class="sidebar-item">
                    <a href="">
                        <i class="fa-solid fa-bag-shopping"></i>
                        <h3>Sản phẩm</h3>
                    </a>
                </div>
                <div class="sidebar-item">
                    <a href="">
                        <i class="fa-solid fa-plus"></i>
                        <h3>Thêm sản phẩm</h3>
                    </a>
                </div>
                <div class="sidebar-item">
                    <a href="">
                        <i class="fa-solid fa-right-from-bracket"></i>
                        <h3>Đăng xuất</h3>
                    </a>
                </div>
                
            </div>
        </div>

        <div class="sidebar mini-sidebar" id="side-bar">
            <div class="top-sidebar">
                <div class="logo">
                    <a href=""><img src="assets/image/logo/logo-header-1.png" alt="logo"></a>
                </div>
                <div class="mini-logo">
                    <a href=""><img src="assets/image/logo/logo-shop-2.png" alt="mini-logo"></a>
                </div>
                <div class="exit-button">
                    <a href="" onclick="event.preventDefault(); hideSideBar()"><i class="fa-solid fa-xmark"></i></a>
                </div>
            </div>
            <div class="sidebar-content">
                <div class="sidebar-item">
                    <a href="">
                        <i class="fa-solid fa-user"></i>
                        <h3>Khách hàng</h3>
                    </a>
                </div>
                <div class="sidebar-item">
                    <a href="">
                        <i class="fa-solid fa-receipt"></i>
                        <h3>Đơn hàng</h3>
                    </a>
                </div>
                <div class="sidebar-item">
                    <a href="">
                        <i class="fa-solid fa-chart-simple"></i>
                        <h3>Thống kê</h3>
                    </a>
                </div>
                <div class="sidebar-item">
                    <a href="">
                        <i class="fa-solid fa-bag-shopping"></i>
                        <h3>Sản phẩm</h3>
                    </a>
                </div>
                <div class="sidebar-item">
                    <a href="">
                        <i class="fa-solid fa-plus"></i>
                        <h3>Thêm sản phẩm</h3>
                    </a>
                </div>
                <div class="sidebar-item">
                    <a href="">
                        <i class="fa-solid fa-right-from-bracket"></i>
                        <h3>Đăng xuất</h3>
                    </a>
                </div>
                
            </div>
        </div>

        <div class="body">
            <div class="header-bar">
                <div class="sidebar-button">
                    <a href="" onclick="event.preventDefault(); showSideBar()"><i class="fa-solid fa-bars"></i></a>
                </div>

                <div class="bar-content">
                    <h2>Tổng quan</h2>
                </div>

                <div class="admin-info">
                    <div class="admin-content">
                        <h4>Xin chào, Admin</h4>
                    </div>
                    <div class="admin-logo">
                        <i class="fa-solid fa-user-tie"></i>
                    </div>
                </div>
            </div>

            <div class="content">
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
            </div>
        </div>
    `;
}


