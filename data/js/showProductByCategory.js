function showCategory(value) {
  document.querySelector(".section-two").style.display = "none";

  // Lấy danh sách sản phẩm từ localStorage
  let products = JSON.parse(localStorage.getItem("products")) || [];

  // Kiểm tra giá trị để lọc sản phẩm
  if (value === "ALL") {
    // Trường hợp hiển thị tất cả sản phẩm
    // Không cần lọc, giữ nguyên danh sách sản phẩm
  } else if (value === "Sale") {
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
                        <a href="" class="product__link">
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
                                                             <li><a href="#">Mặc định</li>
                                                             <li><a href="#">A → Z</li>
                                                             <li><a href="#">Z → A</li>
                                                             <li><a href="#">Giá tăng dần</li>
                                                             <li><a href="#">Giá giảm dần</li>
                                                             <li><a href="#">Hàng mới nhất</li>
                                                             <li><a href="#">Hàng cũ nhất</li>
                                                         </ul>
                                                     </li>
                                                 </ul>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
        
                                <div class="grid__row product_list">
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
