function writeForm(funcForm1, funcForm2, funcForm3) {
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
                    <div class="inner-title large-margin-bottom" id="title-form">Đăng nhập hệ thống</div>
                    ${funcForm2()}

                    ${funcForm1()}

                    ${funcForm3()}
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
    <div class="login-form">
        <div class="input-username small-margin-bottom">
            <label for="username">Tài khoản của bạn:</label>
            <br>
            <input type="text" id="username" placeholder="Nhập tài khoản">
        </div>
        <div class="input-password small-margin-bottom">
            <label for="password">Nhập mật khẩu:</label>
            <br>
            <input type="password" id="password" placeholder="*********">
        </div>
    </div>`;
}

function writeRegisterForm() {
    return `
    <div class="register-form">
        <div class="left-form">
            <div class="input-username">
                <label for="username">Tài khoản của bạn:</label>
                <br>
                <input type="text" id="username" placeholder="Nhập tài khoản">
            </div>
            <div class="innput-password">
                <label for="password">Nhập mật khẩu:</label>
                <br>
                <input type="password" id="password" placeholder="*********">
            </div>
            <div class="confirm-password">
                <label for="password">Nhập lại mật khẩu:</label>
                <br>
                <input type="password" id="password" placeholder="*********">
            </div>
        </div>
        <div class="right-form">
            <div class="input-fullname">
                <label for="fullname">Nhập họ và tên:</label>
                <br>
                <input type="text" id="fullname" placeholder="Nhập tên của bạn:">
            </div>
            <div class="input-email">
                <label for="email">Nhập email:</label>
                <br>
                <input type="email" id="email" placeholder="Nhập email của bạn:">
            </div>
            <div class="innput-number-phone">
                <label for="numberphone">Nhập số điện thoại:</label>
                <br>
                <input type="tel" id="numberphone" placeholder="Nhập số điện thoại:">
            </div>
        </div>
    </div>`;
}

function writeButtonLogin() {
    return `
    <div class="inner-notice small-margin-bottom">
        <div class="desc">Nếu bạn chưa có tài khoản</div>
        <button id="register-now" class="register-btn" onclick="actionChangeForm(this)">Đăng ký ngay!</button>
    </div>
    `;
}
function writeButtonRegister() {
    return `
    <div class="inner-notice small-margin-bottom">
        <div class="desc">Nếu bạn đã có tài khoản</div>
        <button id="login-now" class="login-btn" onclick="actionChangeForm(this)">Đăng nhập ngay!</button>
    </div>
    `;
}
function submitLogin() {
    return `
    <div class="submit-action">
        <button class="login-btn" id="action-login">Đăng nhập</button>
    </div>
    `;
}
function submitRegister() {
    return `
    <div class="submit-action">
        <button class="register-btn" id="action-register">Đăng ký</button>
    </div>
    `;
}
function actionChangeForm(obj) {
    if (obj.id === "register-now") {
        writeForm(writeRegisterForm, writeButtonRegister, submitRegister);
        document.getElementById("title-form").innerHTML = "Đăng ký hệ thống";
    }
    else if (obj.id === "login-now") {
        writeForm(writeLoginForm, writeButtonLogin, submitLogin);
        document.getElementById("title-form").innerHTML = "Đăng nhập tài khoản";
    }
}
function showTools(obj) {
    if (obj.id === "login") {
        writeForm(writeLoginForm, writeButtonLogin, submitLogin);
        document.getElementById("title-form").innerHTML = "Đăng nhập tài khoản";
    } else if (obj.id === "register") {
        writeForm(writeRegisterForm, writeButtonRegister, submitRegister);
        document.getElementById("title-form").innerHTML = "Đăng ký hệ thống";
    }
}

function hideTools() {
    document.getElementById("form").style.display = "none";
}

function showSideBar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.remove('slide-to-left');
    sidebar.classList.add('slide-to-right');
    sidebar.style.display = 'block';
}

function hideSideBar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.replace('slide-to-right','slide-to-left');
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