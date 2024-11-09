function writeForm(funcForm) {
    document.getElementById("form-container").innerHTML = `
    <div class="user-content-selection" id="form">
        <div class="inner-content">
            <div class="left-card">

                <div class="inner-title">SPOCE SHOES</div>

                <div class="inner-desc">Spoce shop là hệ thống chuyên bán các sản phẩm như giày của các hãng nổi tiếng
                    <strong>ADIDAS</strong>
                    <strong>NIKE</strong>
                    <strong>VANS</strong>
                    <strong>CONVERSE ,...</strong>
                    Ngoài ra
                    <strong>SPOCE SHOP</strong>
                    còn bán các sản phẩm như quần, áo, phụ kiện,... chính hãng uy tín chất lượng, đển mỗi khi bạn đi
                    ra ngoài nó sẽ giúp bạn trở nên phong độ, tự tin hơn với phong cách trang phục của bạn.
                    Hệ thống <strong>SPOCE SHOP</strong> còn tuyển các đại lý mua bán sỉ lẻ toàn quốc.
                </div>

                <div class="inner-end-content">
                    <strong>Nếu bạn dành 1% uy tín cho chúng tôi, chúng tôi sẽ chứng mình 99% còn lại</strong>
                    <strong>FROM SPOCE SHOP WITH LOVE ❤️</strong>
                </div>
            </div>

            <div class="right-card">
                <div class="card-content">

                    ${funcForm()}

                </div>
                <i class="fa-solid fa-minus exit-form" id="exit-form" onclick="hideTools()"></i>
            </div>
        </div>
    </div>
    `;
    document.getElementById("form").style.display = "block";
}

function writeLoginForm() {
    return `
    <div class="inner-title large-margin-bottom">Đăng nhập hệ thống</div>

    <div class="inner-notice small-margin-bottom">
        <div class="desc">Nếu bạn chưa có tài khoản</div>
        <button id="register-now" class="register-btn" onclick="actionChangeForm(this)">Đăng ký ngay!</button>
    </div>

    <form action="" onsubmit="return checkValidLogin()">
        <div class="login-form">
            <div class="group-form">
                <label for="input_username_login">Tài khoản của bạn:</label>
                <br>
                <input type="text" id="input_username_login" placeholder="Nhập tài khoản">
            </div>

            <div class="group-form">
                <label for="input_password_login">Nhập mật khẩu:</label>
                <br>
                <input type="password" id="input_password_login" placeholder="*********">
            </div>
        </div>

        <div class="submit-action">
            <button class="login-btn" id="action-login">Đăng nhập</button>
        </div>
    </form>
    `;
}

function writeRegisterForm() {
    return `
    <div class="inner-title large-margin-bottom">Đăng ký tài khoản</div>

    <div class="inner-notice small-margin-bottom">
        <div class="desc">Nếu bạn đã có tài khoản</div>
        <button id="login-now" class="login-btn" onclick="actionChangeForm(this)">Đăng nhập ngay!</button>
    </div>

    <form action="" onsubmit="return checkValidRegister()">
        <div class="register-form">
    
            <div class="left-form">
                <div class="group-form">
                    <label for="input_username_register">Tài khoản: *</label>
                    <br>
                    <input type="text" id="input_username_register" placeholder="Vui lòng nhập tài khoản">
                </div>
                <div class="group-form">
                    <label for="input_password_register">Nhập mật khẩu: *</label>
                    <br>
                    <input type="password" id="input_password_register" placeholder="Vui lòng nhập mật khẩu">
                </div>
                <div class="group-form">
                    <label for="input_password_confirm_register">Nhập lại mật khẩu:</label>
                    <br>
                    <input type="password" id="input_password_confirm_register" placeholder="Vui lòng xác nhận mật khẩu">
                </div>
            </div>
    
            <div class="right-form">
                <div class="group-form">
                    <label for="input_fullname_register">Họ và tên: *</label>
                    <br>
                    <input type="text" id="input_fullname_register" placeholder="Vui lòng nhập họ và tên">
                </div>
                <div class="group-form">
                    <label for="input_email_register">Nhập email:</label>
                    <br>
                    <input type="email" id="input_email_register" placeholder="Vui lòng nhập email">
                </div>
                <div class="group-form">
                    <label for="input_numberphone_register">Nhập số điện thoại: *</label>
                    <br>
                    <input type="tel" id="input_numberphone_register" placeholder="Vui lòng nhập số điện thoại">
                </div>
            </div>
    
        </div>
    
        <div class="submit-action">
            <button class="register-btn" id="action-register">Đăng ký</button>
        </div>
    </form>
    `;
}




function showTools(object) {
    if (object.id === "login") {
        writeForm(writeLoginForm);
    }
    else {
        writeForm(writeRegisterForm);
    }
}
function actionChangeForm(object) {
    if (object.id === "login-now") {
        writeForm(writeLoginForm);
    }
    else {
        writeForm(writeRegisterForm);
    }
}
function hideTools() {
    document.getElementById("form").style.display = "none";
}










// Slide bar
var count_index = 0;
function showSideBar() {

    const sidebar = document.querySelector('.sidebar');
    count_index++;

    if (count_index % 2 != 0) {
        sidebar.classList.remove('slide-to-left');
        sidebar.classList.add('slide-to-right');
        sidebar.style.display = 'block';
    }
    else {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.replace('slide-to-right', 'slide-to-left');
        sidebar.addEventListener('animationend', () => {
            sidebar.style.display = 'none';
        }, { once: true });
    }
}

function hideSideBar() {
    const sidebar = document.querySelector('.sidebar');
    count_index++;
    sidebar.classList.replace('slide-to-right', 'slide-to-left');
    sidebar.addEventListener('animationend', () => {
        sidebar.style.display = 'none';
    }, { once: true });
}

document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    function slideshow() {
        const slides = document.getElementsByClassName('inner-slide-show');
        slides[currentSlide].style.display = 'none';
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].style.display = 'block';
        setTimeout(slideshow, 5000);
    }
    slideshow();
});

