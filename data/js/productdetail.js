document.querySelectorAll(".ChiTietSanPham").forEach(element => {
    element.addEventListener("click",()=>{
        DetailProducts();
        document.querySelectorAll(".page-item").forEach(elements => {
            elements.addEventListener("click",()=>{
                DetailProducts();
            });
        });
    });
});


function DetailProducts() {
    var products = JSON.parse(localStorage.getItem("products"));
    const product_item = document.querySelectorAll(".product__item");
    product_item.forEach(element => {
        element.addEventListener("click", function () {
            let id = this.getAttribute("id");
            let product;
            for (let i = 0; i < products.length; i++) {
                if (id === products[i].id) product = products[i];
            }
            Detail_product(product);
            document.querySelector(".detail-background").classList.add("active");
            document.querySelector(".close-icon").onclick=function(){
                document.querySelector(".detail-background").classList.remove("active");
            }
        });
    });
}
function ZoomImage(image){
    let dom=document.querySelector(".image img");
    console.log(dom);
    dom.setAttribute("src",image);

}
function Quantity(value,price){
    let input=document.querySelector(".input-quantity").value;
    if(value==="down"){
        if(!isNaN(Number(input))) {
            input=Number(input)-1;
            if(input<0) return;
            document.querySelector(".input-quantity").value=input;
           let pay= price;
           cleanedValue = pay.replace(/[.đ₫]/g, ''); 
           let numberValue = Number(cleanedValue);
           pay=numberValue*input;
           pay=pay.toLocaleString('vi-VN');
           pay+="đ";
           document.querySelector(".pay-all").innerHTML=pay;
            return;
        };
        return;
    }
    if(!isNaN(Number(input))) {
        input=Number(input)+1;
        document.querySelector(".input-quantity").value=input;
        let pay= price;
           cleanedValue = pay.replace(/[.đ₫]/g, ''); 
           let numberValue = Number(cleanedValue);
           pay=numberValue*input;
           pay=pay.toLocaleString('vi-VN');
           pay+="đ";
           document.querySelector(".pay-all").innerHTML=pay;
        return;
    };
    return;
    
}
function Detail_product(product) {
    let image="";
    for(let key in product.promo_image){
        if(product.promo_image[key]==="") {
            break;
        }
        image+=`
        <div class="image__item" onclick="ZoomImage('${product.promo_image[key]}')"><img src=${product.promo_image[key]}> </div>
        `
    }
    let s = "";
    s += `
  
    <div class="detail-product">
        <h2>Chi tiết sản phẩm</h2>
        <div class="detail-flex">
            <div class="image">
                <img src=${product.image}>
                <div class="promo-image">
                   ${image}
                </div>
                <div class="detail-product_content">
                    <div class="service">
                        <i class="fa fa-shipping-fast"></i>
                        <span>Giao hàng siêu tốc từ 3 đến 5 ngày</span>
                    </div>
                    <div class="service">
                        <i class="fa fa-users"></i>
                        <span>Đăng ký thành viên để nhận ưu đãi</span>
                    </div>
                </div>
                <div class="size_product">
                    <p>Kích thước:</p>
                    <button class="btn">35</button>
                    <button class="btn">36</button>
                    <button class="btn">37</button>
                    <button class="btn">38</button>
                    <button class="btn">39</button>
                    <button class="btn">40</button>
                    <button class="btn">41</button>
                    <button class="btn">42</button>
                    <button class="btn">43</button>
                    <button class="btn">44 </button>
                </div>
            </div>
            <div class="details-pro">
            <h1>${product.name_product}</h1>
            <div class="details-pro__content">
            <p>
            -Thương hiệu: ${product.brand.toUpperCase()} <br>
            - Chất lượng Chuẩn 98%&nbsp;Spoce Shoes<br>
            - Vận chuyển toàn quốc&nbsp;[ Kiểm Tra Hàng Trước Khi Thanh Toán ]&nbsp;<br>
            - 100% Ảnh chụp trực tiếp tại Spoce Shoes&nbsp;<br>
            - Bảo Hành Trọn Đời Sản Phẩm&nbsp;<br>
            - Đổi Trả 7 Ngày Không Kể Lí Do&nbsp;<br>
            - Liên Hệ : 0967.585.135</p>
            <div class="product__bonus">
            <p>✅ Tặng kèm vớ/tất cổ ngắn khử mùi</p>
            <p>✅Đóng box carton kèm chống sốc, bảo vệ hộp giày nguyên vẹn</p>
            </div>
            <div class= "product__price-old">${product.price} </div>
            <div class="product__price-current">${product.sell}</div>
             <div class="product-quantity">
            <span> Số lượng: </span>
            <button class="btn-down btn" onclick="Quantity('down','${product.sell}')">-</button>
            <input type="text"class="input-quantity" value="1" pattern="/d*" title="Chỉ cho phép nhập số">
             <button class="btn-up btn" onclick="Quantity('up','${product.sell}')">+</button>
            </div>
            </div>
            </div>
        </div>
          <div class="product-pay">
           
            <div class="pay-total">
            <p>Thành tiền: <br> <span class="pay-all">${product.sell}</span></p>
            </div>
            <div class="cart-pay">
            <button class="btn-pay">Thêm vào giỏ hàng</button>
            <button class="btn-pay">Thanh toán</button>
            </div>
            </div>
            <div class="close-icon">
            <i class="fa fa-times"></i>
            </div>
    </div>
    `
    document.querySelector(".detail-background").innerHTML = s;

}