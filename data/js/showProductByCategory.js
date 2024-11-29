// khai báo biến toàn cục để lưu size
const selectSizes = [];

function showCategory(value) {
  selectSizes.length = 0; // Reset mảng về trạng thái rỗng
  console.log("Mảng đã reset:", selectSizes);
  const menuHeader = document.querySelector(".inner-section-menu-header");
  const childMenu = menuHeader.getElementsByClassName("child-menu")[0];
  if (showChildMenuContent % 2 == 1) {
    childMenu.style.display = "none";
    showChildMenuContent += 1;
  }


  document.querySelector(".section-two").style.display = "none";

  // Lấy danh sách sản phẩm từ localStorage
  let products = JSON.parse(localStorage.getItem("products")) || [];

  // Kiểm tra giá trị để lọc sản phẩm
  if (value === "ALL") {
    // Trường hợp hiển thị tất cả sản phẩm
    // Không cần lọc, giữ nguyên danh sách sản phẩm
  } else if (value === "SALE") {
    // Lọc sản phẩm có giảm giá từ 40% đến 80%
    products = products.filter(
      (item) => item.discount >= 40 && item.discount <= 80
    );
  } else {
    // Lọc sản phẩm theo thương hiệu (NIKE, ADIDAS, VANS, v.v.)
    products = products.filter(
      (item) => item.brand.toUpperCase() === value.toUpperCase()
    );
  }

  // Kiểm tra nếu không có sản phẩm nào thỏa mãn
  if (products.length === 0) {
    alert("Không tìm thấy sản phẩm.");
    return;
  }

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

                                    <div class="grid__row product_list" data-brand="${value}">
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
                         <div class="choose-img">Mua Giày và Quần Áo chính hãng nhập khẩu từ các thương hiệu nổi tiếng: Adidas, Nike, Converse, Vans,
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

                                    <div class="grid__row product_list" data-brand="${value}">
                                        ${s}
                                        <ul class="pagination">
                                        </ul>
                                    </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>`;
                  const bodyContent = document.getElementsByClassName("body-content")[0];
                  if (bodyContent) {
                      if (value.toLowerCase() === "clothes") {
                          bodyContent.innerHTML = pageContent2;
                      } else {
                          bodyContent.innerHTML = pageContent;
                      }
                  } else {
                      console.error("Phần tử 'body-content' không tồn tại trong DOM.");
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
          footPage += `<li class="page-item" onclick="changePage(${currentPage - 1})">
                    <a href="javascript:void(0);" class="page-link">
                      <i class="fa-solid fa-angle-left"></i>
                    </a>
                  </li>`;
      }


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
          if (numPages >= 2 * range - 1) {
              // rut gon 2 ben
              if (numberTruncateLeft > 3 && numberTruncateRight < numPages - 3 + 1) {
                  if (pos >= numberTruncateLeft && pos <= numberTruncateRight)
                      renderTwoSide += renderPage(pos, active);
              } else {
                  // rut gon 1 ben
                  if ((currentPage < range && pos <= range) || (currentPage > numPages - range && pos >= numPages - range + 1)
                  || pos == numPages || pos == 1) {
                      render += renderPage(pos, active)
                  } else {
                      countTruncate++;
                      if (countTruncate == 1) render += dot;
                  }
              }
          } else {
              // khong rut gon duoc
              render += renderPage(pos, active)
          }
      }

      if (renderTwoSide) {
          renderTwoSide = renderPage(1) + dot + renderTwoSide + dot + renderPage(numPages);
          footPage += renderTwoSide;
      } else {
          footPage += render;
      }

      if (currentPage != numPages) {
          footPage += `<li class="page-item" onclick="changePage(${currentPage + 1})">
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
      document.querySelector('.pagination').innerHTML = footPage;
  }

  window.changePage = function changePage(page) {
    currentPage = page;
    loadItem();
  }

  function renderPage(index, active) {
    return `<li class="page-item" data-page="${index}" onclick="changePage(${index})">
              <a href="javascript:void(0);" class="page-link ${active}">${index}</a>
            </li>`
  }
}


// xu li 2 truong hop all va sale =))
function displayProductBySize(products, value) {
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

                    <div class="grid__row product_list "data-brand="${value}">
                        ${s}
                        <ul class="pagination">
                            ${footPage}
                        </ul>
                    </div>`;

    document.getElementsByClassName("listProductByBrand")[0].innerHTML =
      pageContent;
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

function emptyList(brand) {
  let s = `<div class="noti-product">
              <p class="noti-product__text">Không có sản phẩm nào trong danh sách này.</p>
              <i class="fa-solid fa-xmark" id="close_message"></i>
            </div>`;

  let pageContent = `
                        <div class="PagiBar">
                          <div class="grid__row sortPagiBar">
                            <div class="grid__col-7">
                              <div class="view-mode">
                                <div class="view-mode__icon">
                                  <i class="fa-solid fa-grip"></i>
                                  <i class="fa-solid fa-bars"></i>
                                </div>
                              </div>
                            </div>
                            <div class="grid__col-5">
                              <div class="sort">
                                <label class="sort-by">Sắp xếp: </label>
                                <ul class="list-sort">
                                  <li>
                                    <span class="text-default">
                                      Thứ tự <i class="fa-solid fa-caret-down"></i>
                                    </span>
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
                        <div class="grid__row product_list" data-brand="${brand}">
                          ${s}
                        </div>

   `;
  document.getElementsByClassName("listProductByBrand")[0].innerHTML =
    pageContent;
}

function handleSelectSizes(event) {
  //   // Khởi tạo mảng selectSizes để lưu kích thước đã chọn
  // const selectSizes = [];

  let size = event.target.nextElementSibling.textContent;

  // Thêm hoặc loại bỏ kích thước khỏi mảng selectSizes
  if (event.target.checked) {
    selectSizes.push(size);
  } else {
    let index = selectSizes.indexOf(size);
    if (index !== -1) selectSizes.splice(index, 1);
  }
  console.log(selectSizes);

  // Lấy danh sách sản phẩm từ localStorage
  let products = JSON.parse(localStorage.getItem("products")) || [];

  // Lấy thương hiệu từ thuộc tính data-brand
  let brand = document.querySelector(".product_list").dataset.brand;

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
      (item) => item.brand.toLowerCase() === brand.toLowerCase()
    );
  }

  // // Lọc sản phẩm theo thương hiệu
  // products = products.filter(item => item.brand.toLowerCase() === brand.toLowerCase());

  // Lọc sản phẩm theo kích thước đã chọn
  products = products.filter(
    (item) => item.sizes.some((size) => selectSizes.includes(size)) // Điều kiện lọc các sản phẩm có kích thước đã chọn
  );

  if (selectSizes == 0) {
    // hien thi tat ca san pham cung loai
    brand = brand.toUpperCase();
    showCategory(brand);
  } else if (selectSizes != 0 && products.length == 0) {
    brand = brand.toUpperCase();
    emptyList(brand);
  } else {
    // product != 0 && selectSizes != 0
    displayProductBySize(products, brand);
  }
  // Hiển thị danh sách sản phẩm sau khi lọc
  console.log(products);
  // displaylist(products);
}

// Lấy tất cả các mục <li> trong menu
// document.querySelectorAll('.menu-1 li').forEach(item => {
//   item.addEventListener('click', function() {
//     // Khởi tạo mảng selectSizes
//     const selectSizes = [];

//     console.log('Mảng selectSizes vừa được khởi tạo:', selectSizes);
//     document.querySelectorAll('.sizeList input[type="checkbox"]').forEach(checkbox => {
//       checkbox.addEventListener('click', handleSelectSizes);
//     })
//   });
// });
