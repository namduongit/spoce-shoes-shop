function checkValidRegister() {
    var username = document.getElementById('input_username_register').value;
    var password = document.getElementById('input_password_register').value;
    var password2 = document.getElementById('input_password_confirm_register').value;
    var fullname = document.getElementById('input_fullname_register').value;
    var email = document.getElementById('input_email_register').value;
    var phone = document.getElementById('input_numberphone_register').value;

    // Lấy mảng người dùng từ localStorage hoặc tạo mảng mới nếu chưa tồn tại
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (username == '') {
        alert('Tài khoản không được để trống');
        document.getElementById('input_username_register').focus();
        return false;
    } else if (username.length < 6) {
        alert('Tài khoản phải có tối thiểu 6 ký tự');
        document.getElementById('input_username_register').focus();
        return false;
    } else if (users.some(user => {
        return user.username === username;
    })) {
        alert("Tên tài khoản đã được đăng ký!");
        document.getElementById('input_username_register').focus();
        return false;
    }

    if (password == '') {
        alert('Mật khẩu không được để trống');
        document.getElementById('input_password_register').focus();
        return false;
    } else if (password.length < 6) {
        alert('Mật khẩu phải có tối thiểu 6 ký tự');
        document.getElementById('input_password_register').focus();
        return false;
    }

    if (password2 == '') {
        alert('Vui lòng xác nhận mật khẩu');
        document.getElementById('input_password_confirm_register').focus();
        return false;
    } else if (password2 != password) {
        alert('Mật khẩu không trùng khớp');
        document.getElementById('input_password_confirm_register').focus();
        return false;
    }

    if (fullname == '') {
        alert('Họ và tên không được để trống');
        document.getElementById('input_fullname_register').focus();
        return false;
    } else if (fullname.length < 6) {
        alert('Họ và tên phải có tối thiểu 6 ký tự');
        document.getElementById('input_fullname_register').focus();
        return false;
    }

    if (users.some(user => {
        return user.email === email;
    })) {
        alert("Email đã được đăng ký cho tài khoản khác!");
        document.getElementById('input_email_register').focus();
        return false;
    }

    if (phone == '') {
        alert('Số điện thoại không được để trống');
        document.getElementById('input_numberphone_register').focus();
        return false;
    } else if (phone.length < 10) {
        alert('Số điện thoại phải có tối thiểu 10 số');
        document.getElementById('input_numberphone_register').focus();
        return false;
    } else if (isNaN(phone)) {
        alert('Số điện thoại không hợp lệ');
        document.getElementById('input_numberphone_register').focus();
        return false;
    } else if (users.some(user => {
        return user.phone === phone;
    })) {
        alert("Số điện thoại đã được đăng ký cho tài khoản khác!");
        document.getElementById('input_numberphone_register').focus();
        return false;
    }

    // Kiểm tra xem username đã tồn tại chưa
    const isExistingUser = users.some(user => {
        return user.username === username;
    })
    
    // Kiểm tra tên đăng nhập đã tồn tại hay chưa
    if (isExistingUser) {
        alert("Tài khoản đã tồn tại!");
        return false;
    } else {
        var currentTime =  new Date();
        currentTime = getCurrentDateTime(currentTime);
        const newUser = {
            username: username,
            password: password,
            fullname: fullname,
            email: email,
            phone: phone,
            registrationTime: currentTime,
            cart: [],
            products: []
        };

        // Thêm tài khoản mới vào mảng
        users.push(newUser);
        // lưu tài khoản vào localStorage
        localStorage.setItem("users", JSON.stringify(users));
        alert("Đăng ký thành công!");
    }


    return true;
}

function checkValidLogin() {
    var username = document.getElementById('input_username_login');
    var password = document.getElementById('input_password_login');

    if (username.value == "") {
        alert("Trường tài khoản không được bỏ trống!");
        username.focus();
        return false;
    }

    if (password.value == "") {
        alert("Trường mật khẩu không được bỏ trống!");
        password.focus();
        return false;
    }

    // Lấy danh sách người dùng từ localStorage hoặc tạo mảng mới nếu chưa tồn tại
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra nếu users là mảng hợp lệ và có người dùng
    if (users.length === 0) {
        alert("Không có người dùng nào trong hệ thống.");
        return false;
    }

    // Tìm tài khoản với tên người dùng và mật khẩu đã nhập
    const user = users.find(user => user.username === username.value && user.password === password.value);

    if (user) {
        alert("Đăng nhập thành công!");
    } else {
        alert("Thông tin đăng nhập không đúng. Vui lòng kiểm tra và thử lại!");
        return false;
    }
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

