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
document
  .getElementById("min-price")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      searchAndDisplay();
    }
  });
document
  .getElementById("max-price")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      searchAndDisplay();
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

  const filteredProducts = allProducts.filter((product) => {
    const matchesName = product.name_product
      .toLowerCase()
      .includes(searchQuery);
    const matchesBrand =
      selectedBrand === "" ||
      product.brand.toLowerCase() === selectedBrand.toLowerCase();

    // Chuyển giá về dạng số để so sánh
    const productPrice = parseFloat(product.price.replace(/[^0-9]/g, ""));
    const matchesPrice = productPrice >= minPrice && productPrice <= maxPrice;

    return matchesName && matchesBrand && matchesPrice;
  });

  if (filteredProducts.length === 0) {
    alert("Không tìm thấy sản phẩm.");
    return;
  }

  const productsPerPage = 6;
  const numPages = Math.ceil(filteredProducts.length / productsPerPage);
  let currentPage = 1;

  let footPage = "";
  for (let i = 1; i <= numPages; i++) {
    footPage += `
            <li class="page-item" data-page="${i}"><a href="javascript:void(0);" class="page-link">${i}</a></li>
        `;
  }

  function loadPage(page) {
    currentPage = page;
    const start = productsPerPage * (page - 1);
    const end = productsPerPage * page;
    const currentProducts = filteredProducts.slice(start, end);

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
                          <li class="size grid__col-6"><input type="checkbox" onclick="handleSelectSizes(event)"><span>35</span></li>
                          <li class="size grid__col-6"><input type="checkbox" onclick="handleSelectSizes(event)"><span>37</span></li>
                          <li class="size grid__col-6"><input type="checkbox" onclick="handleSelectSizes(event)"><span>38</span></li>
                          <li class="size grid__col-6"><input type="checkbox" onclick="handleSelectSizes(event)"><span>39</span></li>
                          <li class="size grid__col-6"><input type="checkbox" onclick="handleSelectSizes(event)"><span>40</span></li>
                          <li class="size grid__col-6"><input type="checkbox" onclick="handleSelectSizes(event)"><span>41</span></li>
                          <li class="size grid__col-6"><input type="checkbox" onclick="handleSelectSizes(event)"><span>42</span></li>
                          <li class="size grid__col-6"><input type="checkbox" onclick="handleSelectSizes(event)"><span>43</span></li>
                          <li class="size grid__col-6"><input type="checkbox" onclick="handleSelectSizes(event)"><span>44</span></li>
                          <li class="size grid__col-6"><input type="checkbox" onclick="handleSelectSizes(event)"><span>36</span></li>
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
                                                    <li  onclick="Default()"><a href="#">Mặc định</a></li>
                                                    <li onclick="SortA_Z()"><a href="#">A → Z</a></li>
                                                             <li onclick="SortZ_A()"><a href="#">Z → A</a></li>
                                                             <li onclick="SortIncrease()"><a href="#" >Giá tăng dần</a></li>
                                                             <li onclick="SortReduce()"><a href="#">Giá giảm dần</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="grid__row product_list"data-brand="${brand}" >
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
  const productsPerPage = 6;
  let numPages = Math.ceil(products.length / productsPerPage);
  let currentPage = 1;

  let footPage = "";
  for (let i = 1; i <= numPages; i++) {
    footPage += `<li class="page-item" data-page="${i}">
                 <a href="javascript:void(0);" class="page-link">${i}</a>
               </li>`;
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
                                  <li class="size grid__col-6"><input type="checkbox" onclick="handleSelectSizes(event)"><span>35</span></li>
                                  <li class="size grid__col-6"><input type="checkbox" onclick="handleSelectSizes(event)"><span>36</span></li>
                                  <li class="size grid__col-6"><input type="checkbox" onclick="handleSelectSizes(event)"><span>37</span></li>
                                  <li class="size grid__col-6"><input type="checkbox" onclick="handleSelectSizes(event)"><span>38</span></li>
                                  <li class="size grid__col-6"><input type="checkbox" onclick="handleSelectSizes(event)"><span>39</span></li>
                                  <li class="size grid__col-6"><input type="checkbox" onclick="handleSelectSizes(event)"><span>40</span></li>
                                  <li class="size grid__col-6"><input type="checkbox" onclick="handleSelectSizes(event)"><span>41</span></li>
                                  <li class="size grid__col-6"><input type="checkbox" onclick="handleSelectSizes(event)"><span>42</span></li>
                                  <li class="size grid__col-6"><input type="checkbox" onclick="handleSelectSizes(event)"><span>43</span></li>
                                  <li class="size grid__col-6"><input type="checkbox" onclick="handleSelectSizes(event)"><span>44</span></li>
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
                                                             <li onclick="SortA_Z()"><a href="#">A → Z</a></li>
                                                             <li onclick="SortZ_A()"><a href="#">Z → A</a></li>
                                                             <li onclick="SortIncrease()"><a href="#" >Giá tăng dần</a></li>
                                                             <li onclick="SortReduce()"><a href="#">Giá giảm dần</a></li>
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

    const activeLink = document.querySelector(
      `.page-item[data-page="${currentPage}"] .page-link`
    );
    if (activeLink) {
      activeLink.classList.add("active");
    }

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
    products = [...originalProducts];
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
