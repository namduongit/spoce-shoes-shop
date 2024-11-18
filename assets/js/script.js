//start tim kiếm theo tên + brand
// Thêm sự kiện cho các nút và input tìm kiếm
document
  .getElementById("button-search")
  .addEventListener("click", function (event) {
    event.preventDefault();
    searchAndDisplay();
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

function searchAndDisplay() {
    let brand=document.querySelector("#brand-select").value;
  const searchQuery = document
    .getElementById("search-inp")
    .value.trim()
    .toLowerCase();
  const selectedBrand = document.getElementById("brand-select").value;

  // Ẩn phần nội dung không liên quan
  document.querySelector(".section-two").style.display = "none";

  // Lấy dữ liệu từ localStorage
  const allProducts = JSON.parse(localStorage.getItem("products")) || [];

  // Lọc sản phẩm dựa trên tên và thương hiệu
  const filteredProducts = allProducts.filter((product) => {
    const matchesName = product.name_product
      .toLowerCase()
      .includes(searchQuery);
    const matchesBrand =
      selectedBrand === "" ||
      product.brand.toLowerCase() === selectedBrand.toLowerCase();
    return matchesName && matchesBrand;
  });

  // Kiểm tra nếu không tìm thấy sản phẩm
  if (filteredProducts.length === 0) {
    document.getElementsByClassName("body-content")[0].innerHTML = `
      <div class="no-results">Không tìm thấy sản phẩm phù hợp.</div>`;
    return;
  }

  // Phân trang
  const productsPerPage = 6;
  const numPages = Math.ceil(filteredProducts.length / productsPerPage);
  let currentPage = 1;

  function loadPage(page) {
    currentPage = page;
    const start = productsPerPage * (page - 1);
    const end = productsPerPage * page;
    const currentProducts = filteredProducts.slice(start, end);

    // Tạo nội dung sản phẩm
    let s = "";
    currentProducts.forEach((product) => {
      s += `<div class="grid_col-4 product__item" onclick="DetailProducts('${product.id}')">
                <a href="javascript:void(0)" class="product__link">
                    <img src="${product.image}" alt="" class="product__link-img">
                    <span class="product__link-name">${product.name_product}</span>
                    <div class="product__link-sale">${product.discount}%</div>
                </a>
                <div class="product__price">
                    <div class="product__price-current">${product.sell}đ</div>
                    <div class="product__price-old">${product.price}đ</div>
                </div>
            </div>`;
    });

    // Tạo nội dung phân trang
    let footPage = "";
    for (let i = 1; i <= numPages; i++) {
      footPage += `
        <li class="page-item" data-page="${i}">
          <a href="javascript:void(0);" class="page-link">${i}</a>
        </li>`;
    }

    // Cập nhật nội dung trang
    let pageContent = `
        <div class="wrapper">
            <div class="grid">
                <div class="grid__row">
                    <div class="grid__col-3">
                        <h3 class="title_size">Theo size giày</h3>
                        <ul class="sizeList grid__row">
                            <li class="size grid__col-6"><input type="checkbox"><span>35</span></li>
                            <li class="size grid__col-6"><input type="checkbox"><span>36</span></li>
                            <li class="size grid__col-6"><input type="checkbox"><span>37</span></li>
                            <li class="size grid__col-6"><input type="checkbox"><span>38</span></li>
                            <li class="size grid__col-6"><input type="checkbox"><span>39</span></li>
                            <li class="size grid__col-6"><input type="checkbox"><span>40</span></li>
                            <li class="size grid__col-6"><input type="checkbox"><span>41</span></li>
                            <li class="size grid__col-6"><input type="checkbox"><span>42</span></li>
                            <li class="size grid__col-6"><input type="checkbox"><span>43</span></li>
                            <li class="size grid__col-6"><input type="checkbox"><span>44</span></li>
                        </ul>
                    </div>
                    <div class="grid__col-9">
                        <div class="PagiBar">
                            <div class="grid__row sortPagiBar">
                                <div class="grid__col-7">
                                    <div class="view-mode">
                                        <div class="view-mode__icon">
                                            <i class="fa-solid fa-grip"></i>
                                            <i class="fa-solid fa-bars"></i>
                                        </div>
                                        <div class="total-product">
                                            <span> Hiển thị ${start + 1} - ${
      start + currentProducts.length
    } trong tổng số ${filteredProducts.length} sản phẩm </span>
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
                                                    <li onclick="SortA_Z()"><a href="#">A → Z</a></li>
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
                        <div class="grid__row product_list" data-brand="${brand}"  >
                            ${s}
                            <ul class="pagination">${footPage}</ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    document.getElementsByClassName("body-content")[0].innerHTML = pageContent;

    // Gắn sự kiện cho các nút phân trang (Event Delegation)
    document.querySelector(".pagination").addEventListener("click", function (e) {
      if (e.target.classList.contains("page-link")) {
        const page = parseInt(
          e.target.parentElement.getAttribute("data-page")
        );
        loadPage(page);
      }
    });
  }

  loadPage(1); // Hiển thị trang đầu tiên
}

//end tìm kiếm theo tên + brand
// SORT
function SortA_Z() {
  var brand = document.querySelector(".product_list").dataset.brand;
  var products = JSON.parse(localStorage.getItem("products"));
  if (brand === "ALL") {
    // Trường hợp hiển thị tất cả sản phẩm
    // Không cần lọc, giữ nguyên danh sách sản phẩm
  } else if (brand === "Sale") {
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
  displaylist(products,brand);
  document.querySelector(".text-default").innerHTML = "A → Z <i class='fa-solid fa-caret-down'></i>"
}
function displaylist(products,brand) {
  const productsPerPage = 6;
  let numPages = Math.ceil(products.length / productsPerPage);
  let currentPage = 1;

  let footPage = "";
  for (let i = 1; i <= numPages; i++) {
    footPage += `<li class="page-item" data-page="${i}"><a href="javascript:void(0);" class="page-link">${i}</a></li>`;
  }

  function loadPage(page) {
    currentPage = page;
    let start = productsPerPage * (page - 1);
    let end = productsPerPage * page;
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
                                 <h3 class="title_size">Theo size giày</h3>
                                 <ul class="sizeList grid__row">
                                     <li class="size grid__col-6"><input type="checkbox"><span>35</span></li>
                                     <li class="size grid__col-6"><input type="checkbox"><span>36</span></li>
                                     <li class="size grid__col-6"><input type="checkbox"><span>37</span></li>
                                     <li class="size grid__col-6"><input type="checkbox"><span>38</span></li>
                                     <li class="size grid__col-6"><input type="checkbox"><span>39</span></li>
                                     <li class="size grid__col-6"><input type="checkbox"><span>40</span></li>
                                     <li class="size grid__col-6"><input type="checkbox"><span>41</span></li>
                                     <li class="size grid__col-6"><input type="checkbox"><span>42</span></li>
                                     <li class="size grid__col-6"><input type="checkbox"><span>43</span></li>
                                     <li class="size grid__col-6"><input type="checkbox"><span>44</span></li>
                                 </ul>
                             </div>
        
                             <div class="grid__col-9">
                                 <div class="PagiBar">
                                     <div class="grid__row sortPagiBar">
                                         <div class="grid__col-7">
                                             <div class="view-mode">
                                                 <div class="view-mode__icon">
                                                     <i class="fa-solid fa-grip"></i>
                                                     <i class="fa-solid fa-bars"></i>
                                                 </div>
                                                 <div class="total-product">
                                                     <span> Hiển thị ${start + 1
      } - ${start + currentProducts.length
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
                                                             <li  onclick="Default()"><a href="#">Mặc định</li>
                                                             <li onclick="SortA_Z()"><a href="#">A → Z</li>
                                                             <li onclick="SortZ_A()"><a href="#">Z → A</li>
                                                             <li onclick="SortIncrease()"><a href="#" >Giá tăng dần</li>
                                                             <li onclick="SortReduce()"><a href="#">Giá giảm dần</li>

                                                         </ul>
                                                     </li>
                                                 </ul>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
        
                                <div class="grid__row product_list "data-brand="${brand}">
                                    ${s}
                                    <ul class="pagination">
                                        ${footPage}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

    document.getElementsByClassName("body-content")[0].innerHTML = pageContent;
    document
      .querySelectorAll(".page-link")
      .forEach((page) => page.classList.remove("active"));
    document
      .querySelector(`.page-item[data-page="${currentPage}"] .page-link`)
      .classList.add("active");

    const pageLinks = document.querySelectorAll(".page-item");
    pageLinks.forEach((pageLink) => {
      pageLink.addEventListener("click", function () {
        const page = parseInt(pageLink.getAttribute("data-page"));
        loadPage(page);
      });
    });
  }

  loadPage(1);
}
function SortZ_A() {
  var brand = document.querySelector(".product_list").dataset.brand;
  var products = JSON.parse(localStorage.getItem("products"));
  if (brand === "ALL") {
    // Trường hợp hiển thị tất cả sản phẩm
    // Không cần lọc, giữ nguyên danh sách sản phẩm
  } else if (brand === "Sale") {
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
  displaylist(products,brand);
  document.querySelector(".text-default").innerHTML = "Z → A <i class='fa-solid fa-caret-down'></i>"
}
function SortIncrease() {
  var brand = document.querySelector(".product_list").dataset.brand;
  var products = JSON.parse(localStorage.getItem("products"));
  if (brand === "ALL") {
    // Trường hợp hiển thị tất cả sản phẩm
    // Không cần lọc, giữ nguyên danh sách sản phẩm
  } else if (brand === "Sale") {
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
  displaylist(products,brand);
  document.querySelector(".text-default").innerHTML = "Giá tăng dần <i class='fa-solid fa-caret-down'></i>"
}
function SortReduce() {
  var brand = document.querySelector(".product_list").dataset.brand;
  var products = JSON.parse(localStorage.getItem("products"));
  if (brand === "ALL") {
    // Trường hợp hiển thị tất cả sản phẩm
    // Không cần lọc, giữ nguyên danh sách sản phẩm
  } else if (brand === "Sale") {
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
  displaylist(products,brand);
  document.querySelector(".text-default").innerHTML = "Giá giảm dần <i class='fa-solid fa-caret-down'></i>"
}
function Default(){
  var brand = document.querySelector(".product_list").dataset.brand;
  var products = JSON.parse(localStorage.getItem("products"));
  if (brand === "ALL") {
    // Trường hợp hiển thị tất cả sản phẩm
    // Không cần lọc, giữ nguyên danh sách sản phẩm
  } else if (brand === "Sale") {
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
  displaylist(products,brand);
  document.querySelector(".text-default").innerHTML = "Mặc định <i class='fa-solid fa-caret-down'></i>";
}

  document.querySelector(".text-default").innerHTML = "Z → A <i class='fa-solid fa-caret-down'></i>"
}

function SortIncrease() {
  var brand = document.querySelector(".product_list").dataset.brand;
  var products = JSON.parse(localStorage.getItem("products"));
  products = products.filter((item) => item.brand.toLowerCase() === brand.toLowerCase());
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
  console.log(products);
  displaylist(products);
  document.querySelector(".text-default").innerHTML = "Giá tăng dần <i class='fa-solid fa-caret-down'></i>"
}

function SortReduce() {
  var brand = document.querySelector(".product_list").dataset.brand;
  var products = JSON.parse(localStorage.getItem("products"));
  products = products.filter((item) => item.brand.toLowerCase() === brand.toLowerCase());
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
  displaylist(products);
  document.querySelector(".text-default").innerHTML = "Giá giảm dần <i class='fa-solid fa-caret-down'></i>"
}

function Default(){
  var products = JSON.parse(localStorage.getItem("products"));
  var brand = document.querySelector(".product_list").dataset.brand;
  products = products.filter(
    (item) => item.brand.toLowerCase() === brand.toLowerCase()
  );
  displaylist(products);
  document.querySelector(".text-default").innerHTML = "Mặc định <i class='fa-solid fa-caret-down'></i>";
}
