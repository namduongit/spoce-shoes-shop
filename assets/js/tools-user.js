function exitToolsUser() {
    const tools = document.getElementById("tools-user");
    tools.style.display = "none";
}
function showTools() {
    const tools = document.getElementById("tools-user")
    tools.style.display = "block";
}

function checkSelect(obj) {
    return obj.id === "btn-login";
}

function changeSelectToolUser(obj) {
    const content = document.querySelector(".tools-user .inner-right .inner-select");
    const title = document.querySelector(".tools-user .inner-right .inner-title");
    const value = document.querySelector(".tools-user .inner-right .inner-value .inner-title");
    const button = document.querySelector(".tools-user .inner-right .inner-value button");

    if (checkSelect(obj)) {
        content.innerHTML = `
            <div class="inner-login">
                <div class="user-name">
                    <div class="inner-title">Tài khoản:</div>
                    <input type="text" name="" id="" placeholder="Nhập tài khoản">
                </div>
                <div class="pass-word">
                    <div class="inner-title">Mật khẩu</div>
                    <input type="password" name="" id="" placeholder="********">
                </div>
                <div class="inner-save-info">
                    <input type="checkbox">
                    <div class="inner-title">Nhớ đăng nhập lần sau</div>
                </div>
                <button class="button small-margin-top" id="btn-login">Đăng nhập</button>
             </div>
        `;
        title.innerHTML = "Đăng nhập hệ thống";
        value.innerHTML = "Nếu bạn chưa có tài khoản";
        button.innerHTML = "Đăng ký ngay!";
        button.id = "btn-register";

    } else {
        content.innerHTML = `
            <div class="inner-register resgister-from">
                <div class="user-name box-name">
                    <div class="inner-title small-margin-top">Tài khoản</div>
                    <input type="text" name="" id="" placeholder="Nhập tài khoản">
                </div>
                <div class="number-phone box-phone">
                    <div class="inner-title small-margin-top">Số điện thoại</div>
                    <input type="tel" name="" id="" maxlength="10" placeholder="Nhập số điện thoại">
                </div>
                <div class="pass-word-1 box-password">
                    <div class="inner-title small-margin-top">Mật khẩu</div>
                    <input type="password" name="" id="" placeholder="********">
                </div>
                <div class="pass-word-2 box-repeat-password">
                    <div class="inner-title small-margin-bottom small-margin-top">Nhập lại mật khẩu</div>
                    <input type="password" name="" id="" placeholder="********">
                </div>
                <button class="button small-margin-top" id="btn-register">Đăng ký</button>
            </div>
        `;
        title.innerHTML = "Đăng ký tài khoản";
        value.innerHTML = "Nếu bạn đã có tài khoản";
        button.innerHTML = "Đăng nhập ngay!";
        button.id = "btn-login";
    }
}

function addLogin() {
    document.write(`
        <div class="inner-login login-form">
            <div class="user-name">
                <div class="inner-title small-margin-top">Tài khoản:</div>
                <input type="text" name="" id="" placeholder="Nhập tài khoản">
            </div>
            <div class="pass-word">
                <div class="inner-title small-margin-top">Mật khẩu</div>
                <input type="password" name="" id="" placeholder="********">
            </div>
            <div class="inner-save-info">
                <input type="checkbox">

                <span class="inner-title">Nhớ đăng nhập lần sau</span>
            </div>
            <button class="button" id="btn-login">Đăng nhập</button>
        </div>

    `);
}


function writeTools() {
    document.write(`
    <div class="tools-user" id="tools-user">
        <div class="inner-content">
            <div class="inner-box">
                <div class="inner-left">
                    <div class="inner-title">SPOCE SHOES</div>
                    <div class="inner-desc">Spoce shop là hệ thống chuyên bán các sản phẩm như giày của các hãng nổi
                        tiếng
                        <strong>ADIDAS</strong>
                        <strong>NIKE</strong>
                        <strong>VANS</strong>
                        <strong>CONVERSE, ...</strong>
                        Ngoài ra <strong>SPOCE SHOP</strong> còn bán các sản phẩm như quần, áo, phụ kiện,... chính hãng cam kết đổi trả
                        nếu sản phẩm kém chất lượng
                        uy tín chất lượng.
                        Hệ thống <strong>SPOCE SHOP</strong> còn tuyển các đại lý mua bán sỉ lẻ trên toàn quốc.
                    </div>
                    <div class="inner-end">
                        <strong>Nếu bạn dành 1% uy tín cho chúng tôi, chúng tôi sẽ chứng minh 99% còn lại</strong>
                        <strong>FROM SPOCE SHOP WITH LOVE❤️</strong>
                    </div>
                </div>


                <div class="inner-right">
                    <div class="inner-title">Đăng nhập hệ thống</div>
                    <div class="inner-value">
                        <div class="inner-title">Nếu bạn chưa có tài khoản</div>

                        <button class="button" name="btn-selection" id="btn-register" onclick="changeSelectToolUser(this)">Đăng ký
                            ngay!</button>
                    </div>
                    <div class="inner-select">
                        <script>
                            addLogin();
                        </script>
                    </div>

                    <i class="fa-solid fa-right-from-bracket btn-exit-tools-user" onclick="exitToolsUser()" id="exit-tools-user"></i>

                </div>
            </div>
        </div>
    </div>
    `);
}