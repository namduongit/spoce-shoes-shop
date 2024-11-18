function checkValidRegister() {
    var username = document.getElementById('input_username_register').value;
    var password = document.getElementById('input_password_register').value;
    var password2 = document.getElementById('input_password_confirm_register').value;
    var fullname = document.getElementById('input_fullname_register').value;
    var email = document.getElementById('input_email_register').value;
    var phone = document.getElementById('input_numberphone_register').value;
    var validation=new Validation();
    // Lấy mảng người dùng từ localStorage hoặc tạo mảng mới nếu chưa tồn tại
    let users = JSON.parse(localStorage.getItem("users")) || [];
    var valid=true;
    //Check validation
    valid&=validation.kiemtraRong(username,"#errol_user_disable")&validation.kiemtraRong(password,"#errol_password_disable")&validation.kiemtraRong(password2,"#errol_confirm_disable")&validation.kiemtraRong(fullname,"#errol_name_disable")&validation.kiemtraRong(email,"#errol_email_disable")&validation.kiemtraRong(phone,"#errol_tel_disable")&validation.kiemtraDodai(username,"#errol_user_length",6)&validation.kiemtraDodai(password,"#errol_password_length",6)&validation.kiemtraDodai(fullname,"#errol_name_length",6)&validation.kiemtraEmail(email,"#errol_email_wrongpattern")&validation.kiemtraSDT(phone,"#errol_tel_pattern");

    if(valid===0){
        return false;
    }
    if(users.some(user=> {
        return user.username===username;
    })){
        document.querySelector("#errol_user_same").innerHTML="Tên tài khoản đã tồn tại!";
        document.querySelector("#errol_user_same").style.display="block";
    } else{
        document.querySelector("#errol_user_same").style.display="none";
    }
    if(password2!=password){
        document.querySelector("#errol_confirm_same").innerHTML="Mật khẩu phải trùng khớp";
        document.querySelector("#errol_confirm_same").style.display="block";
    }
    else{
        document.querySelector("#errol_confirm_same").style.display="none";
    }
    if (users.some(user => {
        return user.email === email;
    })) {
        document.querySelector("#errol_email_same").innerHTML="email đã được đăng ký cho tài khoản khác!";
        document.querySelector("#errol_email_same").style.display="block";
    }
    else{
        document.querySelector("#errol_email_same").style.display="none";
    }
    if (users.some(user => {
        return user.phone === phone;
    })) {
        document.querySelector("#errol_tel_same").innerHTML="Số điện thoại đã được đăng ký cho tài khoản khác!";
        document.querySelector("#errol_tel_same").style.display="block";
    } else{
        document.querySelector("#errol_tel_same").style.display="none";
    }
    valid =true;
    valid&=!users.some(user=> {return user.username===username;})&(password2==password)&!users.some(user => {return user.email === email;})&
    !users.some(user => {return user.phone === phone;});
    if(valid ==0) {
        return false;
    }
    console.log("aaa");
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
        products: [],
        active: true
    };

    // Thêm tài khoản mới vào mảng
    users.push(newUser);
    // lưu tài khoản vào localStorage
    localStorage.setItem("users", JSON.stringify(users));
    alert("Đăng ký thành công!");
    return true;
}

function checkValidLogin() {
    var username = document.getElementById('input_username_login').value;
    var password = document.getElementById('input_password_login').value;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length === 0) {
        alert("Không có người dùng nào trong hệ thống.");
        return false;
    }
    var validation=new Validation();
    let valid=true;
    valid&=validation.kiemtraRong(username,"#errol_username_disable")&validation.kiemtraRong(password,"#errol_pass_disable");
    if(valid==0) {
        return false;
    }
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        alert("Đăng nhập thành công!");
        document.querySelector("#errol_wrong").style.display="none";
    } else {
        document.querySelector("#errol_wrong").innerHTML="Thông tin đăng nhập không đúng. Vui lòng kiểm tra và thử lại!";
        document.querySelector("#errol_wrong").style.display="block";
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

