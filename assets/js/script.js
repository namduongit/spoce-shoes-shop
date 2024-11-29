let homeContent = document.getElementsByClassName("body-content")[0].innerHTML;
document.getElementById("price-toggle").addEventListener("click", function () {
  const priceInputs = document.getElementById("price-inputs");
  const icon = document.getElementById("toggle-icon");

  if (
    priceInputs.style.display === "none" ||
    priceInputs.style.display === ""
  ) {
    priceInputs.style.display = "block";
    icon.classList.remove("fa-angle-down");
    icon.classList.add("fa-angle-up");
  } else {
    priceInputs.style.display = "none";
    icon.classList.remove("fa-angle-up");
    icon.classList.add("fa-angle-down");
  }
});

//start tim kiếm theo tên + brand

document
  .getElementById("button-search")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const icon = document.getElementById("toggle-icon");
    searchAndDisplay();
    document.getElementById("min-price").value = "";
    document.getElementById("max-price").value = "";
    document.getElementById("price-inputs").style.display = "none";
    icon.classList.remove("fa-angle-up");
    icon.classList.add("fa-angle-down");
  });

document
  .getElementById("search-inp")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      searchAndDisplay();
    }
  });

document.getElementById("brand-select").addEventListener("change", function () {
  searchAndDisplay();
});
document
  .getElementById("min-price")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      searchAndDisplay();
      const icon = document.getElementById("toggle-icon");
      document.getElementById("min-price").value = "";
      document.getElementById("max-price").value = "";
      document.getElementById("price-inputs").style.display = "none";
      icon.classList.remove("fa-angle-up");
      icon.classList.add("fa-angle-down");
    }
  });
document
  .getElementById("max-price")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      searchAndDisplay();
      const icon = document.getElementById("toggle-icon");
      document.getElementById("min-price").value = "";
      document.getElementById("max-price").value = "";
      document.getElementById("price-inputs").style.display = "none";
      icon.classList.remove("fa-angle-up");
      icon.classList.add("fa-angle-down");
    }
  });

function searchAndDisplay() {
  let brand = document.querySelector("#brand-select").value;
  const searchQuery = document
    .getElementById("search-inp")
    .value.trim()
    .toLowerCase();
  const selectedBrand = document.getElementById("brand-select").value;

  const minPriceInput = document.getElementById("min-price").value;
  const maxPriceInput = document.getElementById("max-price").value;

  const minPrice = minPriceInput
    ? parseFloat(minPriceInput.replace(/[^0-9]/g, ""))
    : 0;
  const maxPrice = maxPriceInput
    ? parseFloat(maxPriceInput.replace(/[^0-9]/g, ""))
    : Infinity;

  document.querySelector(".section-two").style.display = "none";

  const allProducts = JSON.parse(localStorage.getItem("products")) || [];
  function parsePrice(priceString) {
    return parseFloat(priceString.replace(/[^0-9]/g, ""));
  }

  const filteredProducts = allProducts.filter((product) => {
    const matchesName = product.name_product
      .toLowerCase()
      .includes(searchQuery);
    const matchesBrand =
      selectedBrand === "" ||
      product.brand.toLowerCase() === selectedBrand.toLowerCase();

    const productPrice = parsePrice(product.sell);
    const matchesPrice =
      productPrice >= minPrice &&
      productPrice <= (maxPriceInput ? maxPrice : Infinity);

    return matchesName && matchesBrand && matchesPrice;
  });

  if (filteredProducts.length === 0) {
    toast({
      title: "WARNING",
      message: "Không tìm thấy sản phẩm",
      type: "warning",
      duration: 3000,
    });
    return;
  }

  displaylist(filteredProducts, brand);
}

//end tìm kiếm theo tên + brand
// SORT
function SortA_Z() {
  var brand = document.querySelector(".product_list").dataset.brand;
  var products = JSON.parse(localStorage.getItem("products"));

  if (brand === "ALL") {
    // Trường hợp hiển thị tất cả sản phẩm
    // Không cần lọc, giữ nguyên danh sách sản phẩm
  } else if (brand === "SALE") {
    // Lọc sản phẩm có giảm giá từ 40% đến 80%
    products = products.filter(
      (item) => item.discount >= 40 && item.discount <= 80
    );
  } else {
    // Lọc sản phẩm theo thương hiệu (NIKE, ADIDAS, VANS, v.v.)
    products = products.filter(
      (item) => item.brand.toUpperCase() === brand.toUpperCase()
    );
  }
  products.sort((a, b) => {
    if (a.name_product.toLowerCase() < b.name_product.toLowerCase()) {
      return -1;
    }
    if (a.name_product.toLowerCase() > b.name_product.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  console.log(products);
  displaylist(products, brand);
  document.querySelector(".text-default").innerHTML =
    "A → Z <i class='fa-solid fa-caret-down'></i>";
}

function displaylist(products, brand) {
  let currentPage = 1;
  const productsPerPage = 6;
  let numPages = Math.ceil(products.length / productsPerPage);

  function loadItem() {
    let start = productsPerPage * (currentPage - 1);
    let end = productsPerPage * currentPage;
    let currentProducts = products.slice(start, end);

    let s = "";
    currentProducts.forEach((product) => {
      s += `<div class="grid_col-4 product__item" onclick="DetailProducts('${product.id}')">
                          <a href="javascript:void(0)" class="product__link">
                              <img src="${product.image}" alt="" class="product__link-img">
                              <span class="product__link-name">${product.name_product}</span>
                              <div class="product__link-sale">${product.discount}%</div>
                          </a>
                          <div class="product__price">
                              <div class="product__price-current">${product.sell}</div>
                              <div class="product__price-old">${product.price}</div>
                          </div>
                      </div>`;
    });

    let pageContent = `
                   <div class="wrapper">
                       <div class="grid">
                           <div class="grid__row">
                               <div class="grid__col-3">
                                   <h3 class="title_size">Hướng dẫn chọn size</h3>
                         <div class="choose-Size"> <img src="assets/image/author/kich_thuoc_chan.png" alt="Hướng dẫn chọn size"></div>
                         <div class="choose-img">Mua Giày chính hãng nhập khẩu từ các thương hiệu nổi tiếng: Adidas, Nike, Converse, Vans,
                          Áo...chất lượng hàng đầu được kiếm chứng bởi SPOCE SHOP.
                          ✔ Giảm 50K cho đơn đầu tiên
                          ✔ Freeship và giao nhanh nội thành
                          ✔ Đổi trả dễ dàng
                          ✔ Cam kết hàng cao cấp.<br>

                          ⭐️⭐️⭐️⭐️⭐️ (Chất lượng 5 sao)</div>


                    </div>

                               <div class="grid__col-9">
                                <div class="listProductByBrand">
                                      <div class="PagiBar">
                                          <div class="grid__row sortPagiBar">
                                              <div class="grid__col-7">
                                                  <div class="view-mode">
                                                      <div class="view-mode__icon">
                                                          <i class="fa-solid fa-grip"></i>
                                                          <i class="fa-solid fa-bars"></i>
                                                      </div>
                                                      <div class="total-product">
                                                          <span> Hiển thị ${
                                                            start + 1
                                                          } - ${
      start + currentProducts.length
    } trong tổng số ${products.length} sản phẩm </span>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div class="grid__col-5">
                                                  <div class="sort">
                                                      <label class="sort-by">Sắp xếp: </label>
                                                      <ul class="list-sort">
                                                          <li>
                                                              <span class="text-default">Thứ tự <i class="fa-solid fa-caret-down"></i></span>
                                                              <ul class="sort-options">
                                                                  <li onclick="Default()"><a href="#">Mặc định</a></li>
                                                                  <li onclick="SortA_Z()"><a href="#" >A → Z</a></li>
                                                                  <li onclick="SortZ_A()"><a href="#">Z → A</a></li>
                                                                  <li onclick="SortIncrease()"><a href="#">Giá tăng dần</a></li>
                                                                  <li onclick="SortReduce()"><a href="#">Giá giảm dần</a></li>

                                                              </ul>
                                                          </li>
                                                      </ul>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>

                                    <div class="grid__row product_list" data-brand="${brand}">
                                        ${s}
                                        <ul class="pagination">
                                        </ul>
                                    </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>`;





                  let pageContent2 = `
                   <div class="wrapper">
                       <div class="grid">
                           <div class="grid__row">
                               <div class="grid__col-3">
                                   <h3 class="title_size">Hướng dẫn chọn size</h3>
                         <div class="choose-Size"> <img src="assets/image/author/chonsizeao.png" alt=""></div>
                         <div class="choose-img">Mua Giày chính hãng nhập khẩu từ các thương hiệu nổi tiếng: Adidas, Nike, Converse, Vans,
                          Áo...chất lượng hàng đầu được kiếm chứng bởi SPOCE SHOP.
                          ✔ Giảm 50K cho đơn đầu tiên
                          ✔ Freeship và giao nhanh nội thành
                          ✔ Đổi trả dễ dàng
                          ✔ Cam kết hàng cao cấp.<br>

                          ⭐️⭐️⭐️⭐️⭐️ (Chất lượng 5 sao)</div>


                    </div>

                               <div class="grid__col-9">
                                <div class="listProductByBrand">
                                      <div class="PagiBar">
                                          <div class="grid__row sortPagiBar">
                                              <div class="grid__col-7">
                                                  <div class="view-mode">
                                                      <div class="view-mode__icon">
                                                          <i class="fa-solid fa-grip"></i>
                                                          <i class="fa-solid fa-bars"></i>
                                                      </div>
                                                      <div class="total-product">
                                                          <span> Hiển thị ${
                                                            start + 1
                                                          } - ${
      start + currentProducts.length
    } trong tổng số ${products.length} sản phẩm </span>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div class="grid__col-5">
                                                  <div class="sort">
                                                      <label class="sort-by">Sắp xếp: </label>
                                                      <ul class="list-sort">
                                                          <li>
                                                              <span class="text-default">Thứ tự <i class="fa-solid fa-caret-down"></i></span>
                                                              <ul class="sort-options">
                                                                  <li onclick="Default()"><a href="#">Mặc định</a></li>
                                                                  <li onclick="SortA_Z()"><a href="#" >A → Z</a></li>
                                                                  <li onclick="SortZ_A()"><a href="#">Z → A</a></li>
                                                                  <li onclick="SortIncrease()"><a href="#">Giá tăng dần</a></li>
                                                                  <li onclick="SortReduce()"><a href="#">Giá giảm dần</a></li>

                                                              </ul>
                                                          </li>
                                                      </ul>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>

                                    <div class="grid__row product_list" data-brand="${brand}">
                                        ${s}
                                        <ul class="pagination">
                                        </ul>
                                    </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>`;

    if(brand==='clothes')
    {
      document.getElementsByClassName("body-content")[0].innerHTML = pageContent2;
    }else{
      document.getElementsByClassName("body-content")[0].innerHTML = pageContent;
    }
    
    loadPage();
  }

  loadItem();

  function loadPage() {
    let numPages = Math.ceil(products.length / productsPerPage);

    let footPage = "";

    // them nut tro ve trang dau tien
    // footPage += `<li class="page-item" onclick="changePage(1)">
    //               <a href="javascript:void(0);" class="page-link">
    //                 <i class="fa-solid fa-angles-left"></i>
    //               </a>
    //             </li>`;

    if (currentPage != 1) {
      footPage += `<li class="page-item" onclick="changePage(${
        currentPage - 1
      })">
                    <a href="javascript:void(0);" class="page-link">
                      <i class="fa-solid fa-angle-left"></i>
                    </a>
                  </li>`;
    }

    let truncate = true; // rut gon lien ket trang hoac khong
    let numLinksTwoSide = 1; // so lien ket muon hien thi 2 ben

    const range = numLinksTwoSide + 4;
    let render = "";
    let renderTwoSide = "";

    let dot = `<li class="page-item">
      <a href="javascript:void(0);" class="page-link">...</a>
      </li>`;
    let countTruncate = 0;

    const numberTruncateLeft = currentPage - numLinksTwoSide;
    const numberTruncateRight = currentPage + numLinksTwoSide;

    let active = "";
    for (let pos = 1; pos <= numPages; pos++) {
      active = pos == currentPage ? "active" : "";
      if (numPages >= 2 * range - 1 && truncate) {
        // rut gon 2 ben
        if (numberTruncateLeft > 3 && numberTruncateRight < numPages - 3 + 1) {
          if (pos >= numberTruncateLeft && pos <= numberTruncateRight)
            renderTwoSide += renderPage(pos, active);
        } else {
          // rut gon 1 ben
          if (
            (currentPage < range && pos <= range) ||
            (currentPage > numPages - range && pos >= numPages - range + 1) ||
            pos == numPages ||
            pos == 1
          ) {
            render += renderPage(pos, active);
          } else {
            countTruncate++;
            if (countTruncate == 1) render += dot;
          }
        }
      } else {
        // khong rut gon duoc
        render += renderPage(pos, active);
      }
    }

    if (renderTwoSide) {
      renderTwoSide =
        renderPage(1) + dot + renderTwoSide + dot + renderPage(numPages);
      footPage += renderTwoSide;
    } else {
      footPage += render;
    }

    if (currentPage != numPages) {
      footPage += `<li class="page-item" onclick="changePage(${
        currentPage + 1
      })">
                        <a href="javascript:void(0);" class="page-link">
                          <i class="fa-solid fa-angle-right"></i>
                        </a>
                      </li>`;
    }

    // footPage += `<li class="page-item" onclick="changePage(${numPages})">
    //               <a href="javascript:void(0);" class="page-link">
    //                 <i class="fa-solid fa-angles-right"></i>
    //               </a>
    //             </li>`;
    document.querySelector(".pagination").innerHTML = footPage;
  }

  window.changePage = function changePage(page) {
    currentPage = page;
    loadItem();
  };

  function renderPage(index, active) {
    return `<li class="page-item" data-page="${index}" onclick="changePage(${index})">
              <a href="javascript:void(0);" class="page-link ${active}">${index}</a>
            </li>`;
  }
}

function SortZ_A() {
  var brand = document.querySelector(".product_list").dataset.brand;
  var products = JSON.parse(localStorage.getItem("products"));
  if (brand === "ALL") {
    // Trường hợp hiển thị tất cả sản phẩm
    // Không cần lọc, giữ nguyên danh sách sản phẩm
  } else if (brand === "SALE") {
    // Lọc sản phẩm có giảm giá từ 40% đến 80%
    products = products.filter(
      (item) => item.discount >= 40 && item.discount <= 80
    );
  } else {
    // Lọc sản phẩm theo thương hiệu (NIKE, ADIDAS, VANS, v.v.)
    products = products.filter(
      (item) => item.brand.toUpperCase() === brand.toUpperCase()
    );
  }
  products.sort((a, b) => {
    if (a.name_product.toLowerCase() > b.name_product.toLowerCase()) {
      return -1;
    }
    if (a.name_product.toLowerCase() < b.name_product.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  displaylist(products, brand);
  document.querySelector(".text-default").innerHTML =
    "Z → A <i class='fa-solid fa-caret-down'></i>";
}
function SortIncrease() {
  var brand = document.querySelector(".product_list").dataset.brand;
  var products = JSON.parse(localStorage.getItem("products"));
  if (brand === "ALL") {
    // Trường hợp hiển thị tất cả sản phẩm
    // Không cần lọc, giữ nguyên danh sách sản phẩm
    // products = [...originalProducts];
  } else if (brand === "SALE") {
    // Lọc sản phẩm có giảm giá từ 40% đến 80%
    products = products.filter(
      (item) => item.discount >= 40 && item.discount <= 80
    );
  } else {
    // Lọc sản phẩm theo thương hiệu (NIKE, ADIDAS, VANS, v.v.)
    products = products.filter(
      (item) => item.brand.toUpperCase() === brand.toUpperCase()
    );
  }
  for (let i = 0; i < products.length - 1; i++) {
    for (let j = i + 1; j < products.length; j++) {
      let priceA = Number(products[i].sell.replace(/[đ₫.]/g, ""));
      let priceB = Number(products[j].sell.replace(/[đ₫.]/g, ""));
      if (priceA > priceB) {
        let temp = products[i];
        products[i] = products[j];
        products[j] = temp;
      }
    }
  }
  displaylist(products, brand);
  document.querySelector(".text-default").innerHTML =
    "Giá tăng dần <i class='fa-solid fa-caret-down'></i>";
}
function SortReduce() {
  var brand = document.querySelector(".product_list").dataset.brand;
  var products = JSON.parse(localStorage.getItem("products"));
  if (brand === "ALL") {
    // Trường hợp hiển thị tất cả sản phẩm
    // Không cần lọc, giữ nguyên danh sách sản phẩm
  } else if (brand === "SALE") {
    // Lọc sản phẩm có giảm giá từ 40% đến 80%
    products = products.filter(
      (item) => item.discount >= 40 && item.discount <= 80
    );
  } else {
    // Lọc sản phẩm theo thương hiệu (NIKE, ADIDAS, VANS, v.v.)
    products = products.filter(
      (item) => item.brand.toUpperCase() === brand.toUpperCase()
    );
  }
  for (let i = 0; i < products.length - 1; i++) {
    for (let j = i + 1; j < products.length; j++) {
      let priceA = Number(products[i].sell.replace(/[đ₫.]/g, ""));
      let priceB = Number(products[j].sell.replace(/[đ₫.]/g, ""));
      if (priceA < priceB) {
        let temp = products[i];
        products[i] = products[j];
        products[j] = temp;
      }
    }
  }
  displaylist(products, brand);
  document.querySelector(".text-default").innerHTML =
    "Giá giảm dần <i class='fa-solid fa-caret-down'></i>";
}
function Default() {
  var brand = document.querySelector(".product_list").dataset.brand;
  var products = JSON.parse(localStorage.getItem("products"));
  if (brand === "ALL") {
    // Trường hợp hiển thị tất cả sản phẩm
    // Không cần lọc, giữ nguyên danh sách sản phẩm
  } else if (brand === "SALE") {
    // Lọc sản phẩm có giảm giá từ 40% đến 80%
    products = products.filter(
      (item) => item.discount >= 40 && item.discount <= 80
    );
  } else {
    // Lọc sản phẩm theo thương hiệu (NIKE, ADIDAS, VANS, v.v.)
    products = products.filter(
      (item) => item.brand.toUpperCase() === brand.toUpperCase()
    );
  }
  displaylist(products, brand);
  document.querySelector(".text-default").innerHTML =
    "Mặc định <i class='fa-solid fa-caret-down'></i>";
}
function toast({
  title = "",
  message = "",
  type = "success",
  duration = 3000,
}) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");
    const autoremoveId = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);
    toast.onclick = function (e) {
      if (e.target.closest(".toast_close")) {
        main.removeChild(toast);
        clearTimeout(autoremoveId);
      }
    };
    const colors = {
      success: "#47d864",
      info: "#2f86eb",
      warning: "#ffc021",
      error: "#ff6243",
    };
    const icon = {
      success: "fa fa-check-circle",
      errol: "fa fa-times",
      warning: "fa fa-info",
    };
    toast.classList.add("toast", `toast--${type}`);
    toast.innerHTML = `
<div class="toast_icon">
    <i class="${icon[type]}"></i>
</div>
<div class="toast_body">
    <h3 class="toast_title">${title}</h3>
    <p class="toast_msg">${message}</p>
</div>
<div class="toast_close">
      <i class="fa fa-times"></i>
</div>
 <div class="toast__background"style="background-color: ${colors[type]};">
        `;
    delay = (duration / 1000).toFixed(2);
    toast.style.animation = `slideInLeft ease 0.3s,fadeOut linear 1s ${delay}s forwards`;
    main.appendChild(toast);
  }
}

// Hàm thay đổi nội dung về trang chủ
function changeContent(pageType) {
  document.querySelector(".section-two").style.display = "none";

  let pageContent = "";

  switch (pageType) {
    case "home":
      pageContent = homeContent; // homeContent là nội dung bạn đã định nghĩa cho trang chủ
      break;
    case "huongDanMuaHang":
      pageContent = `
      <div class="guidelines">
        <h1>Hướng dẫn mua hàng</h1> <br>
        <p><strong>HOTLINE bộ phận bán hàng Online:</strong> 0388.853.835</p>

        <div class="step">
            <h2>Bước 1: Lựa chọn sản phẩm</h2>
            <ul>
                <li>Click chọn vào các “Danh mục sản phẩm” để lựa chọn sản phẩm.</li>
                <li>Sử dụng chức năng tìm kiếm sản phẩm để tìm nhanh sản phẩm theo ý thích, vui lòng nhập thông tin vào ô “Tìm kiếm sản phẩm” bên trên.</li>
            </ul>
        </div>

        <div class="step">
            <h2>Bước 2: Quyết định đặt hàng trực tuyến</h2>
            <ul>
                <li>Chọn biểu tượng “Giỏ hàng” tại danh sách liệt kê tất cả sản phẩm hoặc biểu tượng “Thanh toán” trong chi tiết sản phẩm.</li>
            </ul>
        </div>

        <div class="step">
            <h2>Bước 3: Cập nhật thông tin giỏ hàng</h2>
            <ul>
                <li>Lựa chọn sản phẩm cần mua.</li>
                <li>Chọn biểu tượng “Xóa” bên phải nếu muốn bỏ sản phẩm đó khỏi giỏ hàng.</li>
                <li>Chọn sản phẩm thêm vào giỏ hàng nếu muốn mua thêm.</li>
                <li>Chọn “Biểu tượng giỏ hàng” để chốt và biết tổng giá trị giỏ hàng.</li>
                <li>Chọn “Thanh toán” khi bạn đã hoàn tất việc chọn và đặt hàng để đến bước tiếp theo.</li>
            </ul>
        </div>

        <div class="step">
            <h2>Bước 4: Xác nhận đơn hàng</h2>
            <ul>
                <li>Đơn hàng hoàn chỉnh hiển thị toàn bộ thông tin sản phẩm, mã sản phẩm đã được chọn và tổng giá trị đơn hàng.</li>
                <li>Quý khách vui lòng cung cấp đầy đủ thông tin liên hệ để chúng tôi tiện liên lạc và gửi thông báo xác nhận đơn hàng.</li>
            </ul>
        </div>

        <div class="step">
            <h2>Bước 5: Hoàn tất việc đặt hàng</h2>
            <ul>
                <li>Khi quý khách chọn “Xác nhận”, thông tin đặt hàng đã được gửi đến ban quản trị web.</li>
                <li>Trong 24h chúng tôi sẽ gửi email và liên lạc qua điện thoại để xác nhận lại đơn hàng (ngoại trừ ngày lễ – tết).</li>
            </ul>
        </div>
      </div>
      `;
      break;
    case "chinhSachBaoHanh":
      pageContent = `
      <div class="policy">
        <h1>Chính sách Bảo hành - Đổi trả</h1>
        <h2>Bảo hành sản phẩm</h2>
        <p>Sản phẩm mua tại cửa hàng chúng tôi sẽ được bảo hành miễn phí 12 tháng kể từ ngày mua với các lỗi hở keo, sứt chỉ. Quý khách vui lòng mang theo hóa đơn khi mang sản phẩm đến bảo hành.</p>

        <h2>Điều kiện đổi hàng</h2>
        <ul>
            <li>Sản phẩm sẽ được đổi mới nếu phát hiện ra lỗi của nhà sản xuất trong vòng 14 ngày kể từ ngày mua.</li>
            <li>Đổi size sản phẩm trong vòng 14 ngày kể từ ngày mua. Sản phẩm còn nguyên vẹn, đế không bị trầy, bị dơ hoặc có dấu hiệu đã sử dụng. Trường hợp sản phẩm đổi hết hàng hoặc hết size, khách hàng có thể đổi sang 01 sản phẩm khác có giá trị lớn hơn (khách hàng bù thêm tiền) hoặc bằng giá với sản phẩm đổi. (Giá trị thấp hơn, shop không hoàn lại tiền).</li>
            <li>Quý khách vui lòng mang theo hóa đơn khi đổi hàng.</li>
            <li>Trường hợp đổi giày mua online, khách hàng sẽ chịu hoàn toàn phí ship (2 chiều).</li>
        </ul>

        <h2>Chính sách không áp dụng trong các trường hợp sau:</h2>
        <ul>
            <li>Sản phẩm bị hao mòn thông thường do quá trình sử dụng: mòn đế, trầy xước.</li>
            <li>Sản phẩm bị hư hỏng do khách hàng gây ra: nóng chảy, thú vật cắn...</li>
            <li>Các sản phẩm trong đợt khuyến mãi giảm giá >= 30% sẽ không hỗ trợ đổi trả và không bảo hành.</li>
        </ul>

        <h2>Lưu ý:</h2>
        <ul>
            <li>Quy định đổi/trả sản phẩm sẽ được áp dụng trong thời gian 02 ngày tính từ ngày khách hàng chốt đơn hàng (hoặc nhận hàng hoặc đặt cọc hàng).</li>
            <li>Việc đổi hàng, sửa chữa sẽ được thực hiện theo quy định của nhà cung cấp sản phẩm.</li>
        </ul>

        <h2>Quy định về thời gian thông báo và gửi sản phẩm đổi trả</h2>
        <ul>
            <li>Thời gian thông báo đổi trả: trong vòng 48h kể từ khi nhận sản phẩm đối với trường hợp sản phẩm thiếu phụ kiện, quà tặng hoặc bị vỡ.</li>
            <li>Thời gian gửi chuyển trả sản phẩm: trong vòng 14 ngày kể từ khi nhận sản phẩm.</li>
            <li>Địa điểm đổi trả sản phẩm: Khách hàng có thể mang hàng trực tiếp đến văn phòng/cửa hàng của chúng tôi hoặc chuyển qua đường bưu điện.</li>
        </ul>

        <p>Trong trường hợp Quý khách hàng có ý kiến đóng góp/khiếu nại liên quan đến chất lượng sản phẩm, vui lòng liên hệ với đường dây chăm sóc khách hàng của chúng tôi.</p>
      </div>
      `;
      break;
    case "thanhtoan":
      pageContent = `
    <div class="payment-methods">
    <h1>Hình Thức Thanh Toán</h1>

    <p>Quý khách có thể thanh toán khi mua hàng tại hệ thống cửa hàng CÔNG TY CỔ PHẦN SPOCE SHOP bằng những cách sau:</p>

    <h2>1. Thanh toán tiền mặt tại nhà khi nhận hàng thông qua hình thức giao hàng trực tiếp</h2>
    <p>Khi nhân viên giao hàng, khách hàng kiểm tra sản phẩm, hàng nhận hàng và thanh toán trực tiếp cho nhân viên giao hàng theo giá trị tiền trên hóa đơn. Ngoài ra khách hàng không phải thanh toán bất kỳ chi phí nào khác.</p>

    <h2>2. Thanh toán chuyển khoản tại cửa hàng</h2>
    <p>Nếu trong quá trình thanh toán, bạn gặp trở ngại hoặc cần hỗ trợ thì cứ liên hệ hotline: <strong>0388.853.835</strong> để được hỗ trợ nhé.</p>

    <h3>Thông tin số tài khoản:</h3>
    <ul>
        <li><strong>Tên đơn vị:</strong> CÔNG TY CỔ PHẦN SPOCE SHOP</li>
        <li><strong>STK:</strong> 0931011514 - Ngân hàng Mbbank</li>
        <li><strong>Nội dung:</strong> Tên khách hàng + Số điện thoại + Tên đăng nhập</li>
    </ul>
</div>



        `;
      break;
    case "vanchuyen":
      pageContent = `<div class="shipping-policy">
  <h1>Chính sách giao hàng</h1>
  <p>Để đảm bảo sản phẩm đến tay khách hàng chất lượng tốt nhất theo một quy trình chỉn chu và tiện lợi cho khách hàng, SPOCE SHOP cung cấp chính sách giao hàng sau:</p>

  <h2>Dịch vụ giao hàng</h2>
  <p>Dịch vụ giao hàng tận nơi trên toàn quốc, áp dụng cho khách mua hàng trên Website, Fanpage và gọi điện thoại và mua trực tiếp tại cửa hàng.</p>
  <p>Đơn hàng sẽ được chuyển phát đến tận địa chỉ khách hàng cung cấp thông qua dịch vụ vận chuyển trung gian có uy tín như Grab, Ahamove, ...</p>

  <h2>Nghĩa vụ của bên vận chuyển</h2>
  <ul>
    <li>Bảo đảm vận chuyển tài sản đầy đủ, an toàn đến địa điểm đã định, theo đúng thời hạn.</li>
    <li>Giao tài sản cho người có quyền nhận.</li>
    <li>Chịu chi phí liên quan đến việc chuyên chở tài sản, trừ trường hợp có thỏa thuận khác.</li>
    <li>Mua bảo hiểm trách nhiệm dân sự theo quy định của pháp luật.</li>
    <li>Bồi thường thiệt hại cho bên thuê vận chuyển trong trường hợp bên vận chuyển để mất, hư hỏng tài sản, trừ trường hợp có thỏa thuận khác hoặc pháp luật có quy định khác.</li>
  </ul>

  <h2>Quyền của bên vận chuyển</h2>
  <ul>
    <li>Kiểm tra sự xác thực của tài sản, của vận đơn hoặc chứng từ vận chuyển tương đương khác.</li>
    <li>Từ chối vận chuyển tài sản không đúng với loại tài sản đã thỏa thuận trong hợp đồng.</li>
    <li>Yêu cầu bên thuê vận chuyển thanh toán đủ cước phí vận chuyển đúng thời hạn.</li>
    <li>Từ chối vận chuyển tài sản cấm giao dịch, tài sản có tính chất nguy hiểm, độc hại, nếu bên vận chuyển.</li>
  </ul>

  <h2>Nghĩa vụ của bên thuê vận chuyển</h2>
  <ul>
    <li>Trả đủ tiền cước phí vận chuyển cho bên vận chuyển theo đúng thời hạn, phương thức đã thỏa thuận.</li>
    <li>Cung cấp thông tin cần thiết liên quan đến tài sản vận chuyển để bảo đảm an toàn cho tài sản vận chuyển.</li>
    <li>Trông coi tài sản trên đường vận chuyển, nếu có thỏa thuận. Trường hợp bên thuê vận chuyển trông coi tài sản mà tài sản bị mất, hư hỏng thì không được bồi thường.</li>
  </ul>

  <h2>Quyền của bên thuê vận chuyển</h2>
  <ul>
    <li>Yêu cầu bên vận chuyển chuyên chở tài sản đến đúng địa điểm, thời điểm đã thỏa thuận.</li>
    <li>Trực tiếp hoặc chỉ định người thứ ba nhận lại tài sản đã thuê vận chuyển.</li>
  </ul>

  <h2>Trách nhiệm bồi thường thiệt hại</h2>
  <ul>
    <li>Bên vận chuyển phải bồi thường thiệt hại cho bên thuê vận chuyển nếu để tài sản bị mất hoặc hư hỏng.</li>
    <li>Bên thuê vận chuyển phải bồi thường thiệt hại cho bên vận chuyển và người thứ ba về thiệt hại do tài sản vận chuyển có tính chất nguy hiểm, độc hại mà không có biện pháp đóng gói, bảo đảm an toàn trong quá trình vận chuyển.</li>
    <li>Trường hợp bất khả kháng dẫn đến tài sản vận chuyển bị mất, hư hỏng hoặc bị hủy hoại trong quá trình vận chuyển thì bên vận chuyển không phải chịu trách nhiệm bồi thường thiệt hại, trừ trường hợp có thỏa thuận khác hoặc pháp luật có quy định khác.</li>
  </ul>

  <h2>1. Thời gian giao hàng</h2>
  <h3>Đơn hàng nội và ngoại thành Thành phố Hồ Chí Minh:</h3>
  <ul>
    <li>Thời gian giao hàng là 1-2 ngày sau khi đặt hàng.</li>
    <li>Đơn hàng trước 11h00 trưa thì sẽ giao trong buổi chiều cùng ngày.</li>
    <li>Đơn hàng sau 11h30 sẽ giao trong hôm sau.</li>
  </ul>

  <h3>Đơn hàng ở các tỉnh thành khác:</h3>
  <ul>
    <li>Thời gian là 2-3 ngày đối với khu vực trung tâm tỉnh thành phố.</li>
    <li>3-7 ngày đối với khu vực ngoại thành, huyện, xã, thị trấn...</li>
    <li>Không tính thứ bảy, chủ nhật và các ngày lễ tết.</li>
  </ul>

  <h3>Quy định chung:</h3>
  <ul>
    <li>Thời gian xử lý đơn hàng sẽ được tính từ khi nhận được thanh toán hoàn tất của quý khách.</li>
    <li>Có thể thay đổi thời gian giao hàng theo yêu cầu của khách.</li>
    <li>Đơn hàng của quý khách sẽ được giao tối đa trong 2 lần. Trường hợp lần đầu giao hàng không thành công, sẽ có nhân viên liên hệ để sắp xếp lịch giao hàng lần 2 với quý khách, trong trường hợp vẫn không thể liên lạc lại được hoặc không nhận được bất kỳ phản hồi nào từ phía quý khách, đơn hàng sẽ không còn hiệu lực.</li>
    <li>Để kiểm tra thông tin hoặc tình trạng đơn hàng của quý khách, xin vui lòng inbox Fanpage hoặc gọi số hotline..., cung cấp thông tin gồm tên, số điện thoại để được kiểm tra.</li>
    <li>Khi hàng được giao đến quý khách, vui lòng ký xác nhận với nhân viên giao hàng và kiểm tra lại số lượng cũng như loại hàng hóa được giao có chính xác không.</li>
    <li>Quý khách vui lòng giữ lại biên lai vận chuyển và hóa đơn mua hàng để đối chiếu kiểm tra.</li>
  </ul>

  <h2>2. Phí giao hàng</h2>
  <ul>
    <li><strong>Nội thành Thành phố Hồ Chí Minh:</strong> 25,000đ</li>
    <li><strong>Ngoại thành Thành phố Hồ Chí Minh:</strong> 35,000đ</li>
    <li><strong>Các tỉnh thành khác:</strong> 40,000đ</li>
  </ul>
  <p>(Giá vận chuyển có thể thay đổi tùy vào bên thứ 3)</p>
</div>
`;
      break;
    case "baomat":
      pageContent = `<div class="privacy-policy">
    <h1>Chính Sách Bảo Mật Thông Tin</h1>

    <h2>I. Mục Đích Và Phạm Vi Thu Thập</h2>
    <p>Việc thu thập dữ liệu chủ yếu trên website bao gồm: họ tên, email, điện thoại, địa chỉ khách hàng trong mục liên hệ. Đây là các thông tin mà chúng tôi cần thành viên cung cấp bắt buộc khi gửi thông tin nhờ tư vấn hay muốn mua sản phẩm và để chúng tôi liên hệ xác nhận lại với khách hàng trên website nhằm đảm bảo quyền lợi cho người tiêu dùng.</p>

    <h2>II. Phạm Vi Sử Dụng Thông Tin</h2>
    <ul>
        <li>Liên hệ xác nhận đơn hàng và giao hàng cho thành viên khi nhận được yêu cầu từ thành viên;</li>
        <li>Cung cấp thông tin về sản phẩm đến khách hàng nếu có yêu cầu từ khách hàng;</li>
        <li>Gửi email tiếp thị, khuyến mại về hàng hóa do chúng tôi bán;</li>
        <li>Gửi các thông báo về các hoạt động trên website;</li>
        <li>Liên lạc và giải quyết với người dùng trong những trường hợp đặc biệt;</li>
        <li>Không sử dụng thông tin cá nhân của người dùng ngoài mục đích xác nhận và liên hệ có liên quan đến giao dịch;</li>
        <li>Khi có yêu cầu của cơ quan tư pháp bao gồm: Viện kiểm sát, tòa án, cơ quan công an điều tra liên quan đến hành vi vi phạm pháp luật của khách hàng.</li>
    </ul>

    <h2>III. Thời Gian Lưu Trữ Thông Tin</h2>
    <p>Dữ liệu cá nhân của thành viên sẽ được lưu trữ cho đến khi có yêu cầu ban quản trị hủy bỏ. Còn lại trong mọi trường hợp thông tin cá nhân thành viên sẽ được bảo mật trên máy chủ của chúng tôi.</p>

    <h2>IV. Những Người Hoặc Tổ Chức Có Thể Được Tiếp Cận Với Thông Tin Cá Nhân</h2>
    <ul>
        <li>Nhân viên của công ty;</li>
        <li>Các đối tác có ký hợp đồng thực hiện một phần dịch vụ của công ty. Các đối tác này sẽ nhận được thông tin theo thỏa thuận hợp đồng.</li>
    </ul>

    <h2>V. Địa Chỉ Của Đơn Vị Thu Thập Và Quản Lý Thông Tin Cá Nhân</h2>
    <p>
        Tên đơn vị: CÔNG TY CỔ PHẦN SPOCE SHOP <br>
        Địa chỉ: 273 An Dương Vương, Phường 3, Quận 5, TP.HCM <br>
        Mã số thuế: 083868386 <br>
        Email: cskh.spoceshop@gmail.com <br>
        Hotline: 0388.853.835
    </p>

    <h2>VI. Phương Tiện Và Công Cụ Để Người Dùng Tiếp Cận Và Chỉnh Sửa Dữ Liệu Cá Nhân Của Mình</h2>
    <p>Thành viên có quyền tự kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ thông tin cá nhân của mình bằng cách liên hệ với ban quản trị website thực hiện việc này.</p>

    <h2>VII. Cơ Chế Tiếp Nhận Và Giải Quyết Khiếu Nại Của Người Tiêu Dùng</h2>
    <p>Mọi tranh chấp phát sinh giữa Công ty và Người dùng sẽ được giải quyết trên cơ sở thương lượng. Trường hợp không đạt được thỏa thuận, một trong hai bên có quyền đưa vụ việc ra Tòa án nhân dân có thẩm quyền để giải quyết.</p>
</div>
`;
      break;
    case "gioithieu":
      pageContent = `<div class="about-us">
    <h1>Giới thiệu SPOCE SHOP</h1>

    <p><strong> SPOCE SHOP - CHẤT LƯỢNG VƯỢT NIỀM TIN!</strong></p>

    <p>SPOCE SHOP ra đời với tất cả niềm đam mê thương mại điện tử và giày dép của những người sáng lập. Chúng tôi mong muốn mang đến cho khách hàng những đôi giày tốt nhất, giúp khách hàng luôn cảm thấy tự tin vững bước theo đuổi niềm đam mê của bản thân để thành công vượt trội.</p>

    <p>SPOCE SHOP là hệ thống bán giày chính hãng từ các thương hiệu hàng đầu thế giới như: Nike, Adidas, Converse, Vans, Áo,... Tất cả các sản phẩm đều có nguồn gốc xuất sứ rõ ràng chính hãng. SPOCE SHOP nói không với hàng fake, hàng chất lượng kém. Khi mua hàng tại Myshoes.vn, khách hàng sẽ luôn có được sản phẩm tốt nhất với mức giá cực kỳ hấp dẫn mà khó có thể tìm được ở nơi khác. Ngoài ra, Myshoes.vn mong muốn mang đến cho khách hàng những trải nghiệm mua sắm tuyệt vời với sự tư vấn nhiệt tình và chân thành nhất từ đội ngũ bán hàng chuyên nghiệp, những phần quà bất ngờ và tình cảm sâu sắc của SPOCE SHOP gửi gắm trên từng sản phẩm. SPOCE SHOP sẽ nỗ lực hết sức để mỗi sản phẩm đến tay khách hàng là mang đến một niềm vui thú vị.</p>

    <p>SPOCE SHOP luôn tâm niệm rằng chất lượng sản phẩm và dịch vụ khách hàng tuyệt vời là những yếu tố quan trọng nhất quyết định sự thành công của một thương hiệu và đó là giá trị cốt lõi mà SPOCE SHOP sẽ mang tới cho khách hàng của mình.</p>

    <p>Hãy cùng đồng hành với SPOCE SHOP để "Sải bước thành công" nhé!</p>

    <p><strong>Trân trọng,</strong></p>

    <hr>

    <h3>Thông tin liên hệ:</h3>
    <ul>
        <li><strong>Showroom:</strong> 273 An Dương Vương Phường 3 Quận 5 TP.HCM</li>
        <li><strong>Điện thoại:</strong> 0388.853.835</li>
        <li><strong>Email:</strong> cskh.spoceshop@gmail.com</li>
    </ul>
</div>
`;
      break;
    case "tintuc":
      pageContent = `<div class="section-six announcement">
        <div class="inner-wrap">
          <div class="inner-title title-content-left">
            <h4>
              <a href="" >Thông báo</a>
            </h4>
          </div>
          <div class="inner-content">
            <div class="inner-items">
              <div class="inner-box">
                <div class="inner-item">
                  <a
                    href="https://sneakernews.com/2024/10/16/air-jordan-1-mid-gs-pink-white-red-dq8423-608/"
                  >
                    <img
                      src="assets/image/announcement/product_01.png"
                      alt=""
                    />
                  </a>
                  <div class="inner-bottom">
                    <a
                      href="https://sneakernews.com/2024/10/16/air-jordan-1-mid-gs-pink-white-red-dq8423-608/"
                    >
                      <h4>
                        The Perfect Air Jordan 1 Mid For Valentine’s Day 2025
                        Has Appeared
                      </h4>
                    </a>
                    <div class="author">
                      <img src="assets/image/author/author_01.png" alt="" />
                      <span class="name-author">Andrew Rizzo</span>
                      <span class="time-up-post">October 16, 2024</span>
                    </div>
                    <div class="desc">Pink overlays wrap a white base.</div>
                    <a
                      href="https://sneakernews.com/2024/10/16/air-jordan-1-mid-gs-pink-white-red-dq8423-608/"
                      class="read-more"
                    >
                      <span>Xem thêm</span>
                      <i class="fa-solid fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="inner-box">
                <div class="inner-item">
                  <a
                    href="https://sneakernews.com/2024/10/16/air-jordan-1-mid-gs-pink-white-red-dq8423-608/"
                  >
                    <img
                      src="assets/image/announcement/product_02.png"
                      alt=""
                    />
                  </a>
                  <div class="inner-bottom">
                    <a
                      href="https://sneakernews.com/2024/10/16/air-jordan-1-mid-gs-pink-white-red-dq8423-608/"
                    >
                      <h4>
                        The Nike Air Foamposite Pro “Wolf Grey” Has Fully
                        Reflective Uppers
                      </h4>
                    </a>
                    <div class="author">
                      <img src="assets/image/author/author_02.png" alt="" />
                      <span class="name-author">Sneaker News</span>
                      <span class="time-up-post"
                        >October 16th, 2024 (updated)</span
                      >
                    </div>

                    <div class="desc">Scheduled to drop on October 23rd.</div>
                    <a
                      href="https://sneakernews.com/2024/10/16/air-jordan-1-mid-gs-pink-white-red-dq8423-608/"
                      class="read-more"
                    >
                      <span>Xem thêm</span>
                      <i class="fa-solid fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="inner-box">
                <div class="inner-item">
                  <a
                    href="https://sneakernews.com/2024/10/16/air-jordan-1-mid-gs-pink-white-red-dq8423-608/"
                  >
                    <img
                      src="assets/image/announcement/product_03.png"
                      alt=""
                    />
                  </a>
                  <div class="inner-bottom">
                    <a
                      href="https://sneakernews.com/2024/10/16/air-jordan-1-mid-gs-pink-white-red-dq8423-608/"
                    >
                      <h4>
                        Nike Elevates The Air Force 1 Low With Embroidered
                        Swoosh Logos
                      </h4>
                    </a>

                    <div class="author">
                      <img src="assets/image/author/author_01.png" alt="" />
                      <span class="name-author">Andrew Rizzo</span>
                      <span class="time-up-post">October 16, 2024</span>
                    </div>

                    <div class="desc">
                      Autumn-appropriate tones take charge.
                    </div>
                    <a
                      href="https://sneakernews.com/2024/10/16/air-jordan-1-mid-gs-pink-white-red-dq8423-608/"
                      class="read-more"
                    >
                      <span>Xem thêm</span>
                      <i class="fa-solid fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
      break;
    case "thanhvien":
      pageContent = `<div class="membership-card">
    <h1>Thẻ Thành Viên Giảm Giá Khi Mua Giày</h1>

    <p>Chào mừng bạn đến với cửa hàng giày của chúng tôi! Đăng ký và trở thành thành viên để nhận ngay những ưu đãi đặc biệt khi mua giày.</p>

    <h3>Lợi ích khi trở thành thành viên:</h3>
    <ul>
        <li>Giảm giá đặc biệt: Nhận ngay ưu đãi giảm giá lên tới 20% cho lần mua giày tiếp theo.</li>
        <li>Quà tặng đặc biệt: Nhận quà tặng hoặc voucher mua sắm cho mỗi lần mua hàng với số tiền đạt mức yêu cầu.</li>
        <li>Thông báo về các sản phẩm mới: Được thông báo sớm nhất về các mẫu giày mới, các chương trình khuyến mãi hấp dẫn.</li>
        <li>Điểm tích lũy: Mỗi lần mua hàng bạn sẽ tích lũy điểm để đổi lấy những ưu đãi đặc biệt hoặc quà tặng giá trị.</li>
    </ul>

    <h3>Cách nhận thẻ thành viên:</h3>
    <ol>
        <li>Đăng ký tài khoản thành viên trên website.</li>
        <li>Chọn giày yêu thích và hoàn tất thanh toán.</li>
        <li>Sử dụng mã giảm giá hoặc tích điểm cho lần mua tiếp theo.</li>
    </ol>

    <h3>Điều kiện và điều khoản:</h3>
    <ul>
        <li>Chỉ áp dụng cho các sản phẩm giày trong cửa hàng.</li>
        <li>Không áp dụng cho các chương trình khuyến mãi khác.</li>
        <li>Mã giảm giá có thể được sử dụng khi mua hàng trực tuyến.</li>
    </ul>

    <p><strong>Hãy nhanh tay đăng ký để tận hưởng những ưu đãi hấp dẫn!</strong></p>
</div>
`;
      break;

    case "khuyenmai":
      pageContent = `<div class="promotion">
    <h1>Chế Độ Khuyến Mãi Đặc Biệt Khi Mua Giày</h1>

    <p>Chào mừng bạn đến với chương trình khuyến mãi của chúng tôi! Tại cửa hàng giày, chúng tôi luôn mang đến những ưu đãi tuyệt vời để bạn có thể sở hữu đôi giày yêu thích với giá hấp dẫn.</p>

    <h3>Các chương trình khuyến mãi đang diễn ra:</h3>

    <div class="promotion-item">
        <h4>Giảm Giá Lên Tới 50%</h4>
        <p>Cập nhật các mẫu giày mới nhất và những sản phẩm giày yêu thích với mức giảm giá lên tới 50%. Áp dụng cho các sản phẩm giày chọn lọc, có thời gian khuyến mãi giới hạn.</p>
    </div>

    <div class="promotion-item">
        <h4>Mua 1 Tặng 1</h4>
        <p>Mua một đôi giày bất kỳ và nhận ngay một đôi giày miễn phí (cùng loại hoặc sản phẩm khác). Áp dụng cho các mẫu giày trong chương trình khuyến mãi.</p>
    </div>

    <div class="promotion-item">
        <h4>Giảm Giá Theo Số Lượng</h4>
        <p>Mua 2 đôi giày trở lên và nhận ngay giảm giá thêm từ 10% đến 20%. Càng mua nhiều, giảm càng sâu!</p>
    </div>

    <div class="promotion-item">
        <h4>Ưu Đãi Cho Thành Viên</h4>
        <p>Đặc biệt dành cho các thành viên của chúng tôi: Nhận thêm mã giảm giá 10% cho mỗi đơn hàng trong chương trình khuyến mãi.</p>
    </div>

    <div class="promotion-item">
        <h4>Giảm Giá Cuối Mùa</h4>
        <p>Được áp dụng cho các mẫu giày hết mùa hoặc giày tồn kho. Chương trình chỉ kéo dài trong thời gian ngắn, đừng bỏ lỡ!</p>
    </div>

    <h3>Điều Kiện Áp Dụng:</h3>
    <ul>
        <li>Các chương trình khuyến mãi có thể thay đổi theo từng thời kỳ và có giới hạn thời gian.</li>
        <li>Không áp dụng cho các sản phẩm đã giảm giá hoặc các chương trình khuyến mãi khác.</li>
        <li>Mỗi khách hàng chỉ được sử dụng mã giảm giá 1 lần trong mỗi đơn hàng.</li>
    </ul>

    <h3>Cách Tham Gia:</h3>
    <ol>
        <li>Chọn giày yêu thích từ các chương trình khuyến mãi.</li>
        <li>Thêm sản phẩm vào giỏ hàng và nhập mã khuyến mãi (nếu có).</li>
        <li>Hoàn tất thanh toán và nhận giày ngay tại nhà với giá ưu đãi!</li>
    </ol>

    <p><strong>Hãy nhanh tay để không bỏ lỡ các ưu đãi hấp dẫn và tận hưởng những đôi giày chất lượng với giá cực kỳ ưu đãi. Chúng tôi cam kết sẽ mang đến cho bạn trải nghiệm mua sắm tuyệt vời!</strong></p>
</div>
`;
      break;

    case "sanpham":
      pageContent = `<div class="shoe-introduction">
    <h1>Giới Thiệu Các Sản Phẩm Giày Nổi Tiếng</h1>
    <p>Tại cửa hàng của chúng tôi, chúng tôi tự hào mang đến cho bạn những đôi giày từ những thương hiệu hàng đầu trên thế giới, giúp bạn có thể thoải mái thể hiện phong cách cá nhân, đồng thời đảm bảo sự thoải mái và chất lượng tuyệt vời. Dưới đây là các dòng giày từ các thương hiệu nổi tiếng mà bạn không thể bỏ qua!</p>

    <div class="brand">
        <h2>Giày Nike: Đột Phá Cùng Công Nghệ Tối Tân</h2>
        <p>Nike là một trong những thương hiệu giày thể thao hàng đầu, nổi tiếng với thiết kế hiện đại và công nghệ tiên tiến. Các sản phẩm giày Nike không chỉ được yêu thích vì sự thoải mái mà còn vì khả năng hỗ trợ tối ưu cho người sử dụng trong các hoạt động thể thao, đặc biệt là chạy bộ và bóng rổ.</p>
        <ul>
            <li><strong>Nike Air Max:</strong> Với thiết kế đột phá và công nghệ đệm khí, giày Nike Air Max mang lại sự nhẹ nhàng và êm ái tuyệt vời cho từng bước đi.</li>
            <li><strong>Nike Zoom:</strong> Sản phẩm giày lý tưởng cho những vận động viên chuyên nghiệp, với tính năng hỗ trợ tối đa trong các môn thể thao tốc độ.</li>
        </ul>
    </div>

    <div class="brand">
        <h2>Giày Adidas: Tinh Hoa Của Thể Thao Và Phong Cách</h2>
        <p>Adidas là thương hiệu giày thể thao hàng đầu thế giới, nổi bật với những đôi giày có thiết kế tối giản nhưng không kém phần thời trang. Các sản phẩm giày Adidas kết hợp sự thoải mái với khả năng chịu lực, phù hợp với nhiều hoạt động thể thao khác nhau, từ chạy bộ cho đến bóng đá.</p>
        <ul>
            <li><strong>Adidas UltraBoost:</strong> Với công nghệ đệm Boost độc quyền, UltraBoost giúp mang lại cảm giác êm ái và nâng đỡ tuyệt vời cho đôi chân.</li>
            <li><strong>Adidas NMD:</strong> Một lựa chọn hoàn hảo cho phong cách streetwear, giày NMD mang lại sự thoải mái và thời trang cho những người yêu thích sự năng động.</li>
        </ul>
    </div>

    <div class="brand">
        <h2>Giày Vans: Phong Cách Phố Xá Cá Tính</h2>
        <p>Vans là thương hiệu giày thể thao gắn liền với phong cách đường phố và văn hóa skate. Với những đôi giày mang đậm nét cá tính, Vans phù hợp với những ai yêu thích sự tự do và muốn thể hiện phong cách riêng biệt.</p>
        <ul>
            <li><strong>Vans Old Skool:</strong> Đây là mẫu giày biểu tượng của Vans với thiết kế đơn giản nhưng tinh tế, mang đến sự thoải mái khi di chuyển.</li>
            <li><strong>Vans Slip-On:</strong> Không cần dây, dễ dàng mang vào và tháo ra, Vans Slip-On là sự lựa chọn hoàn hảo cho những ai yêu thích sự tiện lợi và phong cách đơn giản.</li>
        </ul>
    </div>

    <div class="brand">
        <h2>Giày Converse: Tự Do Và Cổ Điển</h2>
        <p>Converse đã trở thành một biểu tượng của phong cách thể thao cổ điển. Những đôi giày Converse mang đậm dấu ấn văn hóa pop và thời trang, phù hợp cho cả những buổi đi chơi lẫn các sự kiện đặc biệt.</p>
        <ul>
            <li><strong>Converse Chuck Taylor All Star:</strong> Với thiết kế đơn giản, nhưng vô cùng nổi bật, Chuck Taylor All Star là đôi giày cổ điển mà ai cũng nên có trong tủ giày của mình.</li>
            <li><strong>Converse One Star:</strong> Một thiết kế hiện đại hơn, với sự pha trộn giữa thời trang và sự thoải mái, Converse One Star là lựa chọn tuyệt vời cho các tín đồ thời trang.</li>
        </ul>
    </div>

    <p>Với những sản phẩm giày đến từ Nike, Adidas, Vans và Converse, bạn sẽ dễ dàng tìm thấy cho mình một đôi giày phù hợp với phong cách và nhu cầu sử dụng. Chúng tôi cam kết mang đến cho bạn sự lựa chọn phong phú, chất lượng cao và giá cả hợp lý. Hãy khám phá ngay các sản phẩm giày để nâng tầm phong cách sống của bạn!</p>
</div>
`;
      break;
    case "lienhe":
      pageContent = `<div class="contact-info">
  <h2>Thông Tin Liên Hệ</h2>

  <div class="contact-item">
    <h3>Địa Chỉ Văn Phòng</h3>
    <p>Công ty Cổ Phần SPOCE SHOP<br>Số 273, Đường An Dương Vương, Quận 5, TP. Hồ Chí Minh, Việt Nam</p>
  </div>

  <div class="contact-item">
    <h3>Số Điện Thoại</h3>
    <p>Hotline: 1800-888-666<br>Bộ phận chăm sóc khách hàng: 0388.853.835</p>
  </div>

  <div class="contact-item">
    <h3>Email</h3>
    <p>Hỗ trợ khách hàng: <a href="mailto:cskh.spoceshop@.com">cskh.spoceshop@.com</a><br>Bộ phận kinh doanh: <a href="mailto:sales@spoceshop.com">sales@spoceshop.com</a></p>
  </div>

  <div class="contact-item">
    <h3>Giờ Làm Việc</h3>
    <p>Thứ Hai - Thứ Sáu: 9:00 AM - 6:00 PM<br>Thứ Bảy: 9:00 AM - 12:00 PM<br>Chủ Nhật: Nghỉ</p>
  </div>

  <div class="contact-item">
    <h3>Mạng Xã Hội</h3>
    <div class="social-media">
      <a href="https://facebook.com/spoceshop" target="_blank">Facebook</a>
      <a href="https://instagram.com/spoceshop" target="_blank">Instagram</a>
      <a href="https://twitter.com/spoceshop" target="_blank">Twitter</a>
    </div>
  </div>


</div>
`;
      break;

    default:
      return;
  }

  document.getElementsByClassName("body-content")[0].innerHTML = pageContent;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// menu mobile

function writeMenuMobile() {
  return `
        <div class="menu-mobile">
            <div class="menu-mobile__popup">
                <h3 class="menu-mobile__tittle">Menu</h3>
                <i class="fa-solid fa-xmark" onclick="closeMenuMobile()"></i>
                <ul class="menu-mobile__list">
                    <li id="all_products" class="ChiTietSanPham menu-mobile__item" onclick="showCategory('ALL')">
                        <a href="#">All</a>
                    </li>
                    <li id="all_products_sale" class="ChiTietSanPham menu-mobile__item" onclick="showCategory('SALE')">
                        <a href="#">Sale 40% - 80%</a>
                    </li>
                    <li id="all_nike_products" class="ChiTietSanPham menu-mobile__item" onclick="showCategory('NIKE')">
                        <a href="#">NIKE</a>
                    </li>
                    <li id="all_adidas_products" class="ChiTietSanPham menu-mobile__item" onclick="showCategory('ADIDAS')">
                        <a href="#">ADIDAS</a>
                    </li>
                    <li id="all_vans_products" class="ChiTietSanPham menu-mobile__item" onclick="showCategory('VANS')">
                        <a href="#">VANS</a>
                    </li>
                    <li id="all_converse_products" class="ChiTietSanPham menu-mobile__item" onclick="showCategory('CONVERSE')">
                        <a href="#">CONVERSE</a>
                    </li>
                    <li id="all_clothes_products" class="ChiTietSanPham menu-mobile__item" onclick="showCategory('CLOTHES')">
                        <a href="#">QUẦN ÁO</a>
                    </li>
                </ul>
                <div class="moreMenu">
                    <p>Chất lượng vượt niềm tin.</p>
                </div>
            </div>
        </div>`;
}

function showMenuMobile() {
  document.querySelector(".inner-menu_mobile").innerHTML += writeMenuMobile();
  document.querySelector(".menu-mobile").style.display = "block";
  document.querySelectorAll(".menu-mobile__list li").forEach(function (li) {
    li.addEventListener("click", function () {
      document.querySelector(".menu-mobile").style.display = "none";
    });
  });
}

function closeMenuMobile() {
  document.querySelector(".menu-mobile").style.display = "none";
}
