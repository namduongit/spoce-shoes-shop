function checkValidRegister() {
    var username = document.getElementById('input_username_register').value;
    var password = document.getElementById('input_password_register').value;
    var password2 = document.getElementById('input_password_confirm_register').value;
    var fullname = document.getElementById('input_fullname_register').value;
    var email = document.getElementById('input_email_register').value;
    var phone = document.getElementById('input_numberphone_register').value;
    var validation = new Validation();
    // Lấy mảng người dùng từ localStorage hoặc tạo mảng mới nếu chưa tồn tại
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
    var valid = true;
    //Check validation
    valid &= validation.kiemtraRong(username, "#errol_user_disable") & validation.kiemtraRong(password, "#errol_password_disable") & validation.kiemtraRong(password2, "#errol_confirm_disable") & validation.kiemtraRong(fullname, "#errol_name_disable") & validation.kiemtraRong(email, "#errol_email_disable") & validation.kiemtraRong(phone, "#errol_tel_disable") & validation.kiemtraDodai(username, "#errol_user_length", 6) & validation.kiemtraDodai(password, "#errol_password_length", 6) & validation.kiemtraDodai(fullname, "#errol_name_length", 6) & validation.kiemtraEmail(email, "#errol_email_wrongpattern") & validation.kiemtraSDT(phone, "#errol_tel_pattern");

    if (valid === 0) {
        return false;
    }
    if (users.some(user => {
        return user.username === username;
    })) {
        document.querySelector("#errol_user_same").innerHTML = "Tên tài khoản đã tồn tại!";
        document.querySelector("#errol_user_same").style.display = "block";
    } else {
        document.querySelector("#errol_user_same").style.display = "none";
    }
    if (password2 != password) {
        document.querySelector("#errol_confirm_same").innerHTML = "Mật khẩu phải trùng khớp";
        document.querySelector("#errol_confirm_same").style.display = "block";
    }
    else {
        document.querySelector("#errol_confirm_same").style.display = "none";
    }
    if (users.some(user => {
        return user.email === email;
    })) {
        document.querySelector("#errol_email_same").innerHTML = "email đã được đăng ký cho tài khoản khác!";
        document.querySelector("#errol_email_same").style.display = "block";
    }
    else {
        document.querySelector("#errol_email_same").style.display = "none";
    }
    if (users.some(user => {
        return user.phone === phone;
    })) {
        document.querySelector("#errol_tel_same").innerHTML = "Số điện thoại đã được đăng ký cho tài khoản khác!";
        document.querySelector("#errol_tel_same").style.display = "block";
    } else {
        document.querySelector("#errol_tel_same").style.display = "none";
    }
    valid = true;
    valid &= !users.some(user => { return user.username === username; }) & (password2 == password) & !users.some(user => { return user.email === email; }) &
        !users.some(user => { return user.phone === phone; });
    if (valid == 0) {
        return false;
    }
    var currentTime = new Date();
    currentTime = getCurrentDateTime(currentTime);
    const newUser = {
        username: username,
        password: password,
        fullname: fullname,
        email: email,
        phone: phone,
        registrationTime: currentTime,
        cart: [],
        products: [],
        address: [],
        active: true
    };

    // Thêm tài khoản mới vào mảng
    users.push(newUser);
    // lưu tài khoản vào localStorage
    localStorage.setItem("users", JSON.stringify(users));
    // alert("Đăng ký thành công!");
    // users.forEach(user => {
    //     if (user.username === username) {

    //         localStorage.setItem("usercurrent", JSON.stringify(user));
    //     }
    // });
    // hideTools();
    // InterfaceLogin();
    // return true;
    localStorage.setItem("usercurrent", JSON.stringify(newUser));


    if (guestCart.length > 0) {
        const userCartKey = `cart_${username}`;
        localStorage.setItem(userCartKey, JSON.stringify(guestCart));

        localStorage.removeItem("guestCart");
    }


    updateCartQuantity();

    alert("Đăng ký thành công!");
    hideTools();
    InterfaceLogin();
    return true;
}

function checkValidLogin() {
    event.preventDefault();
    document.querySelector("#errol_wrong").style.display = "none";
    var username = document.getElementById('input_username_login').value;
    var password = document.getElementById('input_password_login').value;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length === 0) {
        alert("Không có người dùng nào trong hệ thống.");
        return false;
    }
    var validation = new Validation();
    let valid = true;
    valid &= validation.kiemtraRong(username, "#errol_username_disable") & validation.kiemtraRong(password, "#errol_pass_disable");
    if (valid == 0) {
        return false;
    }
    users.forEach(user => {
        if (user.username == username && user.active == false) {
            alert("Tài khoản đã bị khóa");
            valid = false;
        }
    })
    if (valid == false) {
        return;
    }
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        mergeGuestCartToUserCart(username);
        // Lưu currentUser trước khi gọi updateCartQuantity
        localStorage.setItem("usercurrent", JSON.stringify(user));

        updateCartQuantity(); // Gọi sau khi lưu currentUser

        alert("Đăng nhập thành công!");
        document.querySelector("#errol_wrong").style.display = "none";
    } else {
        document.querySelector("#errol_wrong").innerHTML = "Thông tin đăng nhập không đúng. Vui lòng kiểm tra và thử lại!";
        document.querySelector("#errol_wrong").style.display = "block";
        return false;
    }

    hideTools();
    InterfaceLogin();
    return true;
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
function InterfaceLogin() {
    let currenuser = JSON.parse(localStorage.getItem("usercurrent"));
    if (currenuser != null) {
        if (currenuser.active == false) {
            alert("Tài khoản đã bị khóa");
            Logout();
            return;
        }
        const nameParts = currenuser.fullname.split(" ");
        const shortName = nameParts[nameParts.length - 2] + " " + nameParts[nameParts.length - 1];
        document.querySelector(".inner-user .user").innerHTML = `
                        <div class="parent">
                            <div class="icon-name">
                                <i class="fa-solid fa-user"></i>
                                <span>${shortName}</span>
                            </div>
                            <div class="child">
                                <div class="group-form" onclick="InforClient()" id="changeInfo">
                                    <i class="fa-solid fa-gear"></i>
                                    <span>Thông tin</span>
                                </div>
                                <div class="group-form" onclick ="Logout()"" id="register">
                                    <i class="fa-solid fa-user-plus"></i>
                                    <span>Đăng xuất</span>
                                </div>
                            </div>

                        </div>
                        `

    }
}
window.onload = InterfaceLogin();
function Logout() {
    localStorage.removeItem("usercurrent");
    window.location.reload();
}
function InforClient() {
    let user = JSON.parse(localStorage.getItem("usercurrent"));
    let address = null;
    user.address.forEach(use => {
        if (use.default == "true") {
            address = use;
        }
    })
    if (address === null) {
        address = {
            id: "",
            consignee: "",
            phone: "",
            city: "",
            district: "",
            street: "",
            default: ""
        }
    }
    document.querySelector(".section-two").style.display = "none";
    let s = ``;
    s = `
    <div class="row">
       <div class="col-account">
            <div class="page-title">
            <h2>Xin chào, ${user.fullname}</h2>
       </div>
            <div class="table-order">
                <table class="table">
                    <tr class="tHead">
                        <th>Đơn hàng</th>
                        <th>Ngày</th>
                        <th>Địa chỉ</th>
                        <th>Giá trị đơn hàng</th>
                        <th>Phương thức thanh toán</th>
                        <th>Trạng thái</th>
                        <th>Thông tin</th>
                    </tr>
                    <tr class="tbody">
                        ${showBillPay()}
                    </tr>
                </table>
            </div>
       </div>

        <div class="col-infor">
        <div class="account">
        <h3>THÔNG TIN NGƯỜI NHẬN HÀNG</h3>
        <div class="infor-client">
        <p>
        <i class="fa fa-user"></i>  Tên người nhận: <strong>${address.consignee}</strong> <br>
        <i class="fa fa-map-marked"></i>  Địa chỉ: <span>${address.city} ${address.district} ${address.street}</span><br>
        <i class="fa fa-phone"></i>  Số điện thoại: <span>${address.phone}</span> <br>
        </p>
        </div>
        </div>
        <div class="infor_update">
        <button class="btn-update" onclick="UpdateUser()">Cập nhật</button>
        </div>
        <div class="change-pass" ><a onclick="ChangePassword()" href="javascirp:void(0)">Đổi mật khẩu</a></div>
        </div>
    </div>

    <div id="showProductCode">
        <div class="wrap-content">
            <div id="head-content">

            </div>
            <div class="foot-content">
                <div class="hideShowProduct" onclick="hideShowProduct()">Đóng</div>
            </div>
        </div>
    </div>


    `
    document.querySelector(".body-content").innerHTML = s;

}
function convertIntToString(number) {
    let convertMoney = "";
    let index = 0;
    let strMoney = number.toString();
    for (let i = strMoney.length - 1; i >= 0; i--) {
        convertMoney += strMoney[i];
        index++;
        if (index % 3 == 0) {
            if (i != 0) {
                convertMoney += '.';
            }
        }
    }
    convertMoney = convertMoney.split('').reverse().join('');
    return convertMoney;
}

function showBillPay() {
    const currentUser = JSON.parse(localStorage.getItem("usercurrent"));
    const AllBill = JSON.parse(localStorage.getItem("Allbill"));

    if (currentUser && AllBill) {
        const userCurrentBill = AllBill.filter(oneBill => oneBill.username === currentUser.username);

        if (userCurrentBill.length == 0) {
            return `<td colspan="6">Không có đơn hàng.</td>`;
        } else {
            let html = "";
            userCurrentBill.forEach(bill => {
                // Xử lí dữ liệu
                let billCode = bill.code;
                let billDay = bill.paymentdate;
                billDay = billDay.split(" ")[2];
                let address = bill.city + ", " + bill.district;
                let allProduct = bill.products_buy;
                let billMoney = 0;
                let paymethod = bill.paymethod
                // Sửa lỗi ở đây: sử dụng forEach đúng cách
                allProduct.forEach(product => {
                    billMoney += parseInt(product.sell.replace("₫", "").replace(/\./g, "").trim());
                });
                let resultMoney = convertIntToString(billMoney);

                let status = bill.status;
                html += `
                <tr class="info-product-tr">
                    <td class="info-product-user">${billCode}</td>
                    <td class="info-product-user">${billDay}</td>
                    <td class="info-product-user">${address}</td>
                    <td class="info-product-user">${resultMoney}đ</td>
                    <td class="info-product-user">${paymethod}</td>
                    <td class="info-product-user">${status}</td>
                    <td class="out-info" onclick="outInfoCode(${billCode})">
                        <div>Xem</div>
                    </td>
                </tr>
            `;
            });
            return html;
        }
    }
    else {
        return `<td colspan="6">Không có đơn hàng.</td>`;
    }
}

function ChangePassword() {
    let s = "";
    s = `
     <div class="card-changepass">
     <div class="form-box oldpass">
     <i class="fa fa-lock"></i>
      <h2>Đổi mật khẩu</h2>
        <form class="form-group">
        <div class="input-box">
            <input type="password" id="oldpassword" required>
            <label>Nhập mật khẩu cũ</label>
        </div>
        <span class="errol_disable text-danger"></span>
        </form>
        <div class="next-icon" onclick="NewPassword()">
        <i class="fa fa-arrow-right"></i>
        </div>

        </div>
          <div class="iclose" onclick="Hide()">
        <i class="fa fa-times"></i>
        </div>
         <div class="form-box newpass">
     <i class="fa fa-lock"></i>
      <h2>Đổi mật khẩu</h2>
        <form class="form-group">
        <div class="input-box">
        <input type="password"id="newpassword" required>
        <label for="newpassword">Nhập mật khẩu mới:</label>
         </div>
          <span class="errol_pass_disable text-danger"></span>
          <span class="errol_pass_length text-danger"></span>
         <div class="input-box" >
        <input type="password" id="confirmpassword" required>
         <label for="confirmpassword">Xác nhận mật khẩu:</label>
       </div>
       <span class="errol_confirm_disable text-danger"></span>
        </form>
        <div class="next-icon" onclick="Notification()">
        <i class="fa fa-arrow-right"></i>
        </div>
        </div>
        <div class="iclose" onclick="Hide()">
        <i class="fa fa-times"></i>
        </div>
        <div class="success form-box">
        <i class="fa fa-check"></i>
        <p>ĐỔI MẬT KHẨU THÀNH CÔNG!</p>
        </div>
    </div>
    `
    document.querySelector(".detail-background").innerHTML = s;
    document.querySelector(".detail-background").classList.add("active");

    // Để load đươc hết thông tin
    document.addEventListener("DOMContentLoaded", function () {

    })


}
function NewPassword() {
    let oldpass = document.getElementById("oldpassword").value;
    let validation = new Validation();
    let valid = true;
    valid &= validation.kiemtraRong(oldpass, ".errol_disable");
    if (valid === 0) {
        return false;
    }
    let usercurrent = JSON.parse(localStorage.getItem("usercurrent"));
    if (usercurrent.password !== oldpass) {
        document.querySelector(".errol_disable").innerHTML = "Mật khẩu không đúng";
        document.getElementById("oldpassword").value = "";
        document.querySelector(".errol_disable").style.display = "block";
        return false;
    } else {
        document.querySelector(".errol_disable").style.display = "none";
    }
    document.querySelector(".newpass").style.transform = "translateX(0)";
    document.querySelector(".oldpass").style.transform = "translateX(-400px)";
    document.querySelector(".oldpass").style.transition = "transform .5s";
    document.querySelector(".card-changepass").classList.add("open");
}
function Hide() {
    document.querySelector(".detail-background").classList.remove("active");
}
function Notification() {
    let newpass = document.getElementById("newpassword").value;
    let confirmpass = document.getElementById("confirmpassword").value;
    let validation = new Validation();
    valid = true;
    valid &= validation.kiemtraRong(newpass, ".errol_pass_disable") & validation.kiemtraRong(confirmpass, ".errol_confirm_disable") & validation.kiemtraDodai(newpass, ".errol_pass_length", 6);
    if (valid == 0) {
        document.getElementById("newpassword").value = "";
        return false;
    }
    if (newpass != confirmpass) {
        document.querySelector(".errol_confirm_disable").innerHTML = "Mật khẩu không trùng khớp";
        document.querySelector(".errol_confirm_disable").style.display = "block";
        return false;
    } else {
        document.querySelector(".errol_confirm_disable").display = "none";
    }
    let usercurrent = JSON.parse(localStorage.getItem("usercurrent"));
    let users = JSON.parse(localStorage.getItem("users"));
    users.forEach(user => {
        if (user.username == usercurrent.username) {
            user.password = newpass;
        }
    });
    localStorage.setItem("users", JSON.stringify(users));
    usercurrent.password = newpass;
    localStorage.setItem("usercurrent", JSON.stringify(usercurrent));
    document.querySelector(".newpass").style.transform = "translateX(-400px)";
    document.querySelector(".success").style.transform = "translateX(0)";

}
function UpdateUser() {
    let usercurrent = JSON.parse(localStorage.getItem("usercurrent"));
    let str = "";
    usercurrent.address.forEach(user => {
        str += `
        <div class="form-address">
        <p>
        <i class="fa fa-user"></i>  Tên người nhận: <strong>${user.consignee}</strong> <br>
        <i class="fa fa-map-marked"></i>  Địa chỉ: <span>${user.city}, ${user.district}, ${user.street}</span><br>
        <i class="fa fa-phone"></i>  Số điện thoại: <span>${user.phone}</span> <br>
        </p>
           <div class="address-default">
        <input type="checkbox" data-address="${user.id}" class="checkbox" onclick="CheckDefault(this)">
        <label>Đặt làm địa chỉ mặc định</label>
            <div class="fix-infor"></div>
        </div>
        <button class="btn-delete btn-update" onclick="DeleteAddress(${user.id})">Xóa</button>
        <button class="btn-fix btn-update" onclick="FixAddress(${user.id})">Sửa</button>
        </div>
        `;
        if (user.default === "true") {
            document.querySelectorAll(".checkbox").forEach(element => {
                Number(element.dataset.address) == user.id;
                element.checked = true;
            })
        }
    });
    let s = "";
    s = `
    <div class="address">
      <div class="page-back">

      <a href="javascript:void(0)" onclick="InforClient()" > <i class="fa fa-angle-double-left"></i>Quay lại trang thông tin tài khoản</a>
      </div>
      <div class="row">
      <div class="enter-address">
        <p>Thêm địa chỉ: </p>
        <form class="form-group">
        <div class="enter-input">
        <label>Họ tên người nhận:</label>
        <input type="text" id="name_user">
        <span class="text-danger" id="errol_user_disable"></span>
        </div>
         <div class="enter-input">
        <label>Số điện thoại người nhận:</label>
        <input type="text" id="phone_user">
         <span class="text-danger" id="errol_phone_disable"></span>
          <span class="text-danger" id="errol_phone_wrong"></span>
        </div>
         <div class="enter-input">
        <label>Thành phố:</label>
        <input type="text" id="city_user">
         <span class="text-danger" id="errol_city_disable"></span>
        </div>
         <div class="enter-input">
        <label>Quận/Huyện/Phường:</label>
        <input type="text" id="district_user">
         <span class="text-danger" id="errol_district_disable"></span>
        </div>
         <div class="enter-input">
        <label>Địa chỉ( tên đường, số nhà,...):</label>
        <input type="text" id="street_user">
         <span class="text-danger" id="errol_street_disable"></span>
        </div>
        </form>
        <div class="add-address">
      <button class="btn-add btn-update" onclick="Addaddress()">Thêm địa chỉ</button>
      </div>
      </div>
      <div class="export-address">
      <p>Địa chỉ của bạn:</p>
      <div class="list-address">
      ${str}
      </div>
      </div>
      </div>

    </div>
    `
    document.querySelector(".body-content").innerHTML = s;
    usercurrent.address.forEach(user => {
        if (user.default === "true") {
            document.querySelectorAll(".checkbox").forEach(element => {
                if (Number(element.dataset.address) == user.id) {
                    element.checked = true;
                }
            })
        }
    });
}
function Addaddress() {
    let name = document.getElementById("name_user").value;
    let phone = document.getElementById("phone_user").value;
    let city = document.getElementById("city_user").value;
    let district = document.getElementById("district_user").value;
    let street = document.getElementById("street_user").value;
    let validation = new Validation();
    let valid = true;
    valid &= validation.kiemtraRong(name, "#errol_user_disable") & validation.kiemtraRong(phone, "#errol_phone_disable") & validation.kiemtraRong(city, "#errol_city_disable") & validation.kiemtraRong(district, "#errol_district_disable") & validation.kiemtraRong(street, "#errol_street_disable") & validation.kiemtraSDT(phone, "#errol_phone_wrong");
    if (valid == 0) {
        return false;
    }
    let id;
    let usercurrent = JSON.parse(localStorage.getItem("usercurrent"));
    if (usercurrent.address.length == 0) {
        id = 0;
    }
    else {
        usercurrent.address.forEach(user => {
            id = user.id + 1;
        });
    }
    let address = {
        id: id,
        consignee: name,
        phone: phone,
        city: city,
        district: district,
        street: street,
        default: "none"
    }
    let test = true;
    usercurrent.address.forEach(user => {
        if (user.city.trim() === city.trim() && user.district.trim() === district.trim() && user.street.trim() === street.trim() && user.phone == address.phone) {
            alert("Dia chi da ton tai!");
            test = false;
        }
    });
    if (test === false) return false;
    usercurrent.address.push(address);
    localStorage.setItem("usercurrent", JSON.stringify(usercurrent));
    let users = JSON.parse(localStorage.getItem("users"));
    users.forEach(user => {
        if (user.username == usercurrent.username) {
            user.address = usercurrent.address;
        }
    });
    localStorage.setItem("users", JSON.stringify(users));
    let s = "";
    usercurrent.address.forEach(user => {
        s += `
        <div class="form-address">
        <p>
        <i class="fa fa-user"></i>  Tên người nhận: <strong>${user.consignee}</strong> <br>
        <i class="fa fa-map-marked"></i>  Địa chỉ: <span>${user.city}, ${user.district}, ${user.street}</span><br>
        <i class="fa fa-phone"></i>  Số điện thoại: <span>${user.phone}</span> <br>
        </p>
        <div class="address-default">
        <input type="checkbox" class="checkbox" data-address="${user.id}" onclick="CheckDefault(this)" >
        <label>Đặt làm địa chỉ mặc định</label>
        <div class="fix-infor"></div>
        </div>
        <button class="btn-delete btn-update" onclick="DeleteAddress(${user.id})">Xóa</button>
        <button class="btn-fix btn-update" onclick="FixAddress(${user.id})">Sửa</button>
        </div>
        `
    });
    document.querySelector(".list-address").innerHTML = s;

}
function CheckDefault(checkbox) {
    document.querySelectorAll(".checkbox").forEach(checkBox => checkBox.checked = false);
    checkbox.checked = true;
    let usercurrent = JSON.parse(localStorage.getItem("usercurrent"));
    usercurrent.address.forEach(user => {
        if (user.id === Number(checkbox.dataset.address)) {
            user.default = "true";
        }
        else {
            user.default = "none";
        }
    })
    localStorage.setItem("usercurrent", JSON.stringify(usercurrent));
    let users = JSON.parse(localStorage.getItem("users"));
    users.forEach(user => {
        if (user.username == usercurrent.username) {
            user.address = usercurrent.address;
        }
    });
    localStorage.setItem("users", JSON.stringify(users));
}
function DeleteAddress(value) {
    let usercurrent = JSON.parse(localStorage.getItem("usercurrent"));
    usercurrent.address = usercurrent.address.filter(user => user.id !== Number(value));
    localStorage.setItem("usercurrent", JSON.stringify(usercurrent));
    let users = JSON.parse(localStorage.getItem("users"));
    users.forEach(user => {
        if (user.username == usercurrent.username) {
            user.address = usercurrent.address;
        }
    });
    localStorage.setItem("users", JSON.stringify(users));
    UpdateUser();

}
function FixAddress(value) {
    let s = ` <form class="form-group">
        <div class="enter-input">
        <label>Họ tên người nhận:</label>
        <input type="text" id="fname${value}_user">
        <span class="text-danger" id="errol_fuser${value}_disable"></span>
        </div>
         <div class="enter-input">
        <label>Số điện thoại người nhận:</label>
        <input type="text" id="fphone${value}_user">
         <span class="text-danger" id="errol_fphone${value}_disable"></span>
          <span class="text-danger" id="errol_fphone${value}_wrong"></span>
        </div>
         <div class="enter-input">
        <label>Thành phố:</label>
        <input type="text" id="fcity${value}_user">
         <span class="text-danger" id="errol_fcity${value}_disable"></span>
        </div>
         <div class="enter-input">
        <label>Quận/Huyện/Phường:</label>
        <input type="text" id="fdistrict${value}_user">
         <span class="text-danger" id="errol_fdistrict${value}_disable"></span>
        </div>
         <div class="enter-input">
        <label>Địa chỉ( tên đường, số nhà,...):</label>
        <input type="text" id="fstreet${value}_user">
         <span class="text-danger" id="errol_fstreet${value}_disable"></span>
        </div>
        <button class="btn-update btn-save" onclick="SaveAddress(${value})">Lưu</button>
        </form>`
    document.querySelectorAll(".fix-infor")[value].innerHTML = s;

}
function SaveAddress(value) {
    event.preventDefault();
    let name = document.getElementById("fname" + value + "_user").value;
    let phone = document.getElementById("fphone" + value + "_user").value;
    let city = document.getElementById("fcity" + value + "_user").value;
    let district = document.getElementById("fdistrict" + value + "_user").value;
    let street = document.getElementById("fstreet" + value + "_user").value;
    let validation = new Validation();
    let valid = true;
    valid &= validation.kiemtraRong(name, "#errol_fuser" + value + "_disable") & validation.kiemtraRong(phone, "#errol_fphone" + value + "_disable") & validation.kiemtraRong(city, "#errol_fcity" + value + "_disable") & validation.kiemtraRong(district, "#errol_fdistrict" + value + "_disable") & validation.kiemtraRong(street, "#errol_fstreet" + value + "_disable") & validation.kiemtraSDT(phone, "#errol_fphone" + value + "_wrong");
    if (valid == 0) {
        return false;
    }
    let usercurrent = JSON.parse(localStorage.getItem("usercurrent"));
    let address = {
        id: value,
        consignee: name,
        phone: phone,
        city: city,
        district: district,
        street: street,
        default: "none"
    }
    let test = true;
    usercurrent.address.forEach(user => {
        if (user.city.trim() === city.trim() && user.district.trim() === district.trim() && user.street.trim() === street.trim() && user.phone == address.phone) {
            test = false;
        }
    });
    usercurrent.address.forEach(user => {
        if (user.city.trim() === address.city.trim() && user.district.trim() === address.district.trim() && user.street.trim() === address.street.trim() && user.name == address.name && user.phone == address.phone) {

            test = true;
        }
    });
    const indexToUpdate = usercurrent.address.findIndex(user => user.id === address.id);
    usercurrent.address[indexToUpdate] = address;
    if (test === false) {
        alert("Dia chi da ton tai!");
        return false;
    }
    console.log(usercurrent);
    localStorage.setItem("usercurrent", JSON.stringify(usercurrent));
    let users = JSON.parse(localStorage.getItem("users"));
    users.forEach(user => {
        if (user.username == usercurrent.username) {
            user.address = usercurrent.address;
        }
    });
    localStorage.setItem("users", JSON.stringify(users));
    UpdateUser();
}
function converStringToNumber(str) {
    let result = str.match(/\d+/g)?.join("") || "0";
    return parseInt(result);
}

function outInfoCode(billCode) {
    const AllBill = JSON.parse(localStorage.getItem("Allbill"));
    const usercurrent = JSON.parse(localStorage.getItem("usercurrent"));

    if (AllBill && usercurrent) {
        const productsUser = AllBill.filter(bill => bill.username === usercurrent.username);

        const productInfoCurrent = productsUser.find(pro => pro.code === billCode);

        if (productInfoCurrent) {
            // Lấy tất cả sản phẩm mua ra
            const productBuy = productInfoCurrent.products_buy;
            console.log(productBuy);

            // Lấy thẻ đựng chứa nội dung
            const element = document.getElementById("head-content");
            let rowsHtml = ``;

            // Duyệt qua danh sách sản phẩm và tạo các dòng cho bảng
            productBuy.forEach(product => {
                rowsHtml += `
                    <tr>
                        <td>${product.name_product}</td>
                        <td>${product.size}</td>
                        <td>${product.quantity}</td>
                        <td>${convertIntToString(converStringToNumber(product.sell) * product.quantity)}đ</td>
                    </tr>
                `;
            });

            // Cấu trúc bảng HTML
            let str = `
                <div class="head-content">
                    <h4>Chi tiết đơn hàng</h4>
                    <div class="info-user">

                        
                    </div>
                </div>
                <div class="body-content">
                    <div class="table-order">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Size</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rowsHtml}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

            // Cập nhật nội dung vào thẻ
            element.innerHTML = str;
            document.getElementById("showProductCode").style.display = "block";
        } else {
            console.log("Không tìm thấy hóa đơn với mã:", billCode);
        }
    } else {
        console.log("Dữ liệu không hợp lệ hoặc người dùng chưa đăng nhập.");
    }
}


function hideShowProduct() {
    document.getElementById("showProductCode").style.display = "none";
}
