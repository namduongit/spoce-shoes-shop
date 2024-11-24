function Payment(product_list) {
    document.querySelector(".detail-background").classList.remove("active");
    document.querySelector(".section-two").style.display = "none";
    let usercurrent = JSON.parse(localStorage.getItem("usercurrent"));
    let code = 0;
    let allbill = JSON.parse(localStorage.getItem("Allbill"));
    if (allbill != null) {
        allbill.forEach(bill => {
            code = bill.code;
        })
    }
    let totalprice = 0;

    let list = "";
    product_list.forEach(product => {
        let price = product.sell.replace(/[.đ₫]/g, "");
        totalprice += Number(price) * Number(product.quantity);
        list += `
     <tr class="product_item">
                <td >
                <div class="product__image">
                <img src=${product.image}>
                </div>
                </td>
                <td>
                <div class="product__name">
                <span class="product">${product.name_product}</span>
                <span class="product psize">Size: ${product.sizes}</span>
                <span class=" product product_quantity">Số lượng: ${product.quantity}</span>
                </div>
                </td>
                  <td >
                  <div class="product__sell">
                <span class="name">${product.sell}</span>
                </div>
                </td>
                </tr>
    `

    })
    totalprice = totalprice.toLocaleString('vi-VN') + "đ";
    window.scrollTo(0, 0);
    let s = `
      <div class="payment-page">
        <div class="Infor-Client">
            <div class="main__content">
                <div class="col-two">
                    <section class="section">
                        <div class="section__header">
                            <h2>Thông tin nhận hàng</h2>
                        </div>
                        <div class="section__content">
                            <div class="field-input">
                                <label>Sổ địa chỉ</label>
                                <select class="list-address">

                                </select>
                            </div>
                            <div class="field-input">
                                <label>Email:</label>
                                <input type="text" value="${usercurrent.email}" class="input_email" disabled>
                            </div>
                            <div class="field-input">
                                <label>Họ và tên:</label>
                                <input type="text" class="input_name">
                                <span class= "text-danger" id="errol_name_disable"></span>
                            </div>
                            <div class="field-input">
                                <label>Số điện thoại:</label>
                                <input type="text" class="input_phone">
                                 <span  class= "text-danger"  id="errol_phone_disable"></span>
                                  <span  class= "text-danger"  id="errol_phone_wrong"></span>
                            </div>
                            <div class="field-input">
                                <label>Tỉnh:</label>
                                <input type="text" class="input_city">
                                 <span  class= "text-danger"  id="errol_city_disable"></span>
                            </div>
                            <div class="field-input">
                                <label>Quận/huyện/phường:</label>
                                <input type="text" class="input_district">
                                 <span  class= "text-danger" id="errol_district_disable"></span>
                            </div>
                            <div class="field-input">
                                <label>Địa chỉ cụ thể( Tên đường,số nhà,...)</label>
                                <input type="text" class="input_street">
                                 <span class= "text-danger" id="errol_street_disable"></span>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="col-two">
                    <div class="payment">
                        <div class="payment__header">
                            <h2>
                                Thông tin thanh toán
                            </h2>
                        </div>
                        <div class="payment__content">
                            <div class="payment-card">
                                <input type="radio" class="input-radio" value="pay-by-card"  name="group1" id="payment-method">
                                <label for="payment-method">Thanh toán online qua thẻ quốc tế (Visa, Master, JCB, UnionPay)
                                </label>
                                <div class="pay-card"></div>
                            </div>
                            <div class="payment-card">
                                <input type="radio"  class="input-radio" value="pay-by-cash"  name="group1" id="payment-method1">
                                <label for="payment-method1">Thanh toán khi nhận hàng</label>
                                <div class="pay-cash"></div>
                            </div>
                            <div class="payment-card">
                                <input type="radio" name="group1"  class="input-radio" value="pay-by-bank" id="payment-method2">
                                <label for="payment-method2">Chuyển khoản ngân hàng</label>
                                <div class="pay-bank"></div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="bill">
            <div class="oder-list">
            <div class="oder-header">
            <h3>Đơn hàng:</h3>
            </div>
            <table class="products__list">
           ${list}
            </table>
        <div class="bill-total">
        <div class="bill-total__price column2">
        <span>Tạm tính </span>
        <span> ${totalprice}</span>
        </div>
        <div class="bill-total__quantity column2">
        <span> Phí vận chuyển </span>
        <span></span>
        </div>
        <div class="bill-total__payall column2">
        <span>Tổng tiền </span>
        <span class="allsum"> ${totalprice} </span>
        </div>
        </div>
        <div class="button-order">
        <button class="btn-order"  >ĐẶT HÀNG</button>
        </div>
          <span class="text-danger" id="non-check"></span>
        </div>
    </div>`;
    let listaddress = "";

    document.querySelector(".body-content").innerHTML = s;
    usercurrent.address.forEach(user => {
        if (user.default == "true") {
            listaddress += `
        <option value="op${user.id}">${user.city}, ${user.district}, ${user.street}</option>
        `
            document.querySelector(".input_name").value = user.consignee;
            document.querySelector(".input_name").disabled = true;
            document.querySelector(".input_phone").value = user.phone;
            document.querySelector(".input_phone").disabled = true;
            document.querySelector(".input_city").value = user.city;
            document.querySelector(".input_city").disabled = true;
            document.querySelector(".input_district").value = user.district;
            document.querySelector(".input_district").disabled = true;
            document.querySelector(".input_street").value = user.street;
            document.querySelector(".input_street").disabled = true;
        }
    });
    let i=0;
    usercurrent.address.forEach(user => {
        if (user.default == "none") {
            i++;
            listaddress += `
        <option  value="op${user.id}">${user.city}, ${user.district}, ${user.street}</option>
        `}
        if(i==usercurrent.address.length){
            document.querySelector(".input_name").value = user.consignee;
            document.querySelector(".input_name").disabled = true;
            document.querySelector(".input_phone").value = user.phone;
            document.querySelector(".input_phone").disabled = true;
            document.querySelector(".input_city").value = user.city;
            document.querySelector(".input_city").disabled = true;
            document.querySelector(".input_district").value = user.district;
            document.querySelector(".input_district").disabled = true;
            document.querySelector(".input_street").value = user.street;
            document.querySelector(".input_street").disabled = true;
        }
    })
   
    listaddress += `
        <option value="op">Địa chỉ khác</option>`
    document.querySelector(".list-address").innerHTML = listaddress;
    document.querySelector(".list-address").onchange = function () {
        let bool = true;
        usercurrent.address.forEach(user => {
            if (this.value === "op" + user.id) {
                document.querySelector(".input_name").value = user.consignee;
                document.querySelector(".input_name").disabled = true;
                document.querySelector(".input_phone").value = user.phone;
                document.querySelector(".input_phone").disabled = true;
                document.querySelector(".input_city").value = user.city;
                document.querySelector(".input_city").disabled = true;
                document.querySelector(".input_district").value = user.district;
                document.querySelector(".input_district").disabled = true;
                document.querySelector(".input_street").value = user.street;
                document.querySelector(".input_street").disabled = true;
                bool = false;
            };
        });
        if (bool == false) {
            return;
        }
        document.querySelector(".input_name").value = "";
        document.querySelector(".input_name").disabled = false;
        document.querySelector(".input_phone").value = "";
        document.querySelector(".input_phone").disabled = false;
        document.querySelector(".input_city").value = "";
        document.querySelector(".input_city").disabled = false;
        document.querySelector(".input_district").value = "";
        document.querySelector(".input_district").disabled = false;
        document.querySelector(".input_street").value = "";
        document.querySelector(".input_street").disabled = false;
    }
    document.querySelector(".pay-card").style.display = "none";
    document.querySelector(".pay-bank").style.display = "none";
    document.getElementById("payment-method").addEventListener("click", () => {
        document.querySelector(".pay-card").innerHTML = `
            <form class="payforcard">
            <div class="input-group">
            <label>Card Number</label>
            <input type="text" id="card-number">
            <span class="text-danger" id="errol_cardnumber_disable"></span>
            <div class="input-group">
            <label>Expiration Date</label>
            <input type="text" id="exp-date">
             <span class="text-danger" id="errol_date_disable"></span>
             <span class="text-danger" id="errol_date_wrong"></span>
            </div>
            <div class="input-group">
            <label>Card Security Code</label>
            <input type="text" id="csc">
             <span class="text-danger" id="errol_csc_disable"></span>
            </div>
                   <div class="input-group">
            <label>Name on card </label>
            <input type="text" id="name-card">
             <span class="text-danger" id="errol_nameoncard_disable"></span>
            </div>
            </form>
        `
        document.querySelector(".pay-card").style.display = "block";
        document.querySelector(".pay-cash").style.display = "none";
        document.querySelector(".pay-bank").style.display = "none";
    });
    document.getElementById("payment-method1").addEventListener("click", () => {
        document.querySelector(".pay-card").style.display = "none";
        document.querySelector(".pay-cash").style.display = "block";
        document.querySelector(".pay-bank").style.display = "none";
    });
    document.getElementById("payment-method2").addEventListener("click", () => {
        document.querySelector(".pay-bank").innerHTML = `
        <div class="name_bank">MB BANK - Chi nhánh Sài Gòn</div>
        <div class="account_bank">GROUP SPOCE SHOP</div>
        <div class="number_bank">0363 589 035</div>
        <div class="name_group">CTY TNHH SPOCE SHOP</div>
        <div class=content-bank>CHUYỂN KHOẢN VỚI NỘI DUNG: SDT - ${code + 1}</div>
    `
        document.querySelector(".pay-card").style.display = "none";
        document.querySelector(".pay-cash").style.display = "none";
        document.querySelector(".pay-bank").style.display = "block";
    });
    document.querySelector(".btn-order").onclick = function () {
        Order(product_list);
    }
}


function Order(product_list) {

    let validation = new Validation();
    let name = document.querySelector(".input_name").value;
    let email = document.querySelector(".input_email").value;
    let phone = document.querySelector(".input_phone").value;
    let city = document.querySelector(".input_city").value;
    let district = document.querySelector(".input_district").value;
    let street = document.querySelector(".input_street").value;
    let vale = true;
    let paymethod;
    document.querySelectorAll(".input-radio").forEach(element => {
        if (element.checked === true) {
            vale = false;
            paymethod = element.value;
        }
    })
    if (vale === true) {
        document.getElementById("non-check").innerHTML = "Vui lòng chọn phương thức thanh toán";
        document.getElementById("non-check").style.display="block";
        return;
    }
    else{
        document.getElementById("non-check").style.display="none";
    }
    let valid = true;

    valid &= validation.kiemtraRong(name, "#errol_name_disable") & validation.kiemtraRong(phone, "#errol_phone_disable") & validation.kiemtraRong(city, "#errol_city_disable") & validation.kiemtraRong(district, "#errol_district_disable") & validation.kiemtraRong(street, "#errol_street_disable") & validation.kiemtraSDT(phone, "#errol_phone_wrong");
    if (valid == 0) {
        return false;
    }
    if (paymethod == "pay-by-card") {
        var numbercard = document.getElementById("card-number").value;
        var date = document.getElementById("exp-date").value;
        var csc = document.getElementById("csc").value;
        var namecard = document.getElementById("name-card").value;
        valid &= validation.kiemtraRong(numbercard, "#errol_cardnumber_disable") & validation.kiemtraRong(numbercard, "#errol_date_disable") & validation.kiemtraRong(numbercard, "#errol_csc_disable") & validation.kiemtraRong(numbercard, "#errol_nameoncard_disable") & validation.kiemtraDateCard(numbercard, "#errol_date_wrong");
        if (valid == 0) {
            return false;
        }
    }
    else {
        var numbercard = "";
        var date = "";
        var csc = "";
        var namecard = "";
    }
    let id=0;
    let address = {
        id: id,
        consignee: name,
        phone: phone,
        city: city,
        district: district,
        street: street,
        default: "none"
    }
    let usercurrent = JSON.parse(localStorage.getItem("usercurrent"));
    if(usercurrent.address.length==0){
        usercurrent.address.push(address);
    }
    else{
        usercurrent.address.forEach(user => {
            id = user.id + 1;
        });
        if(usercurrent.address.some(user=>{
            return user.name==name && user.phone==phone && user.city==city && user.district==district && user.street==street;
        })){
        } else{
            address.id=id;
            usercurrent.address.push(address);
        }
    }
    localStorage.setItem("usercurrent",JSON.stringify(usercurrent));
    let users=JSON.parse(localStorage.getItem("users"));
    users.forEach(user => {
        if (user.username == usercurrent.username) {
            user.address = usercurrent.address;
        }
    });
    localStorage.setItem("users",JSON.stringify(users));

    let code = 0;
    let allbill = JSON.parse(localStorage.getItem("Allbill"));
    if (allbill != null) {
        allbill.forEach(bill => {
            code = bill.code;
        })
    }
    const order = {
        code: code + 1,
        username: usercurrent.username,
        name: name,
        email: email,
        phone: phone,
        city: city,
        district: district,
        street: street,
        products_buy: product_list,
        paymentdate: getCurrentDateTime(),
        paymethod: paymethod,
        numbercard: numbercard,
        date: date,
        csc: csc,
        namecard: namecard,
        status: "Đang xử lý"
    }
    InforInvoice(order);
}
function InforInvoice(order){
    let paymed;
    let totalprice = 0;

    let list = "";
    if(order.paymethod=="pay-by-card"){
        paymed="Thẻ tín dụng";
    }
    else if(order.paymethod=="pay-by-cash"){
        paymed="Thanh toán khi nhận hàng";
    }
    else{
        paymed="Chuyển khoản ngân hàng";
    }
        order.products_buy.forEach(product => {
            let price = product.sell.replace(/[.đ₫]/g, "");
            totalprice += Number(price) * Number(product.quantity);
            list += `
         <tr class="product_item">
                    <td >
                    <div class="product__image">
                <img src=${product.image}>
                </div>
                    </td>
                    <td>
                    <div class="product__name">
                    <span class="product">${product.name_product}</span>
                    <span class="product psize">Size: ${product.sizes}</span>
                    <span class=" product product_quantity">Số lượng: ${product.quantity}</span>
                    </div>
                    </td>
                      <td >
                      <div class="product__sell">
                    <span class="name">${product.sell}</span>
                    </div>
                    </td>
                    </tr>
        `

        })
        totalprice = totalprice.toLocaleString('vi-VN') + "đ";
    let pay=`
    <div class="see-bill">
    <div class="bill-header">
    <h3> THÔNG TIN KHÁCH HÀNG</h3
    </div>
    <div class="bill-content">
    <p>
    Mã hóa đơn: ${order.code} <br>
    Họ tên : ${order.name} <br>
    Số điện thoại: ${order.phone} <br>
    Email: ${order.email} <br>
    Địa chỉ : ${order.city}, ${order.district}, ${order.street} <br>
    Phương thức thanh toán: ${paymed}
    </p>
    </div>
    <div class="bill-products">
    <h3>THÔNG TIN SẢN PHẨM</h3>
     <table class="products__list">
           ${list}
            </table>
        <div class="bill-total">
        <div class="bill-total__price column2">
        <span>Tạm tính </span>
        <span> ${totalprice}</span>
        </div>
        <div class="bill-total__quantity column2">
        <span> Phí vận chuyển </span>
        <span></span>
        </div>
        <div class="bill-total__payall column2">
        <span>Tổng tiền </span>
        <span class="allsum"> ${totalprice} </span>
        </div>
        </div>
        <div class="button-order">
        <button class="btn-confirm">Xác nhận</button>
        </div>
    </div>
    <div class="iclose"><i class="fa fa-times"></i></div>
    </div>
    `
    document.querySelector(".detail-background").innerHTML=pay;
    document.querySelector(".detail-background").classList.add("active");
    const usercurrent = JSON.parse(localStorage.getItem("usercurrent"));
    document.querySelector(".iclose").onclick=function(){
       
        document.querySelector(".detail-background").classList.remove("active");
    }
    document.querySelector(".btn-confirm").onclick=function(){
        if(usercurrent.active==false){
            location.reload();
        }
        let allbill = JSON.parse(localStorage.getItem("Allbill"));
        if(allbill==null){
            allbill = [];
        }
        allbill.push(order);
        localStorage.setItem("Allbill", JSON.stringify(allbill));
        toast({title:'SUCCESS',message:"Đặt hàng thành công ! Giỏ hàng của bạn đã được làm mới",type:'success',duration:3000});
        document.getElementById("quantityOfCart").innerHTML="Giỏ hàng: 0";
        localStorage.removeItem("cart_" + usercurrent.username);
        document.querySelector(".detail-background").classList.remove("active");
        InforClient();
    }
    

}
