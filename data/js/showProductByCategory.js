function showCategory(value) {
    alert("Hiện thị sản phẩm " + value);
    var products = JSON.parse(localStorage.getItem('products')).filter(item =>  item.brand.toUpperCase() === value.toUpperCase());

    if (products.length === 0) {
        alert("Không tìm thấy sản phẩm với brand: " + value.toUpperCase());
        return;
    }

    var s = "";
    for (let i = 0; i < products.length; i++) {
        s = s + `<div class="grid_col-4 product__item">
                    <a href="" class="product__link">
                        <img src="${products[i].image}" alt="" class="product__link-img">
                        <span class="product__link-name">${products[i].name_product}</span>
                        <div class="product__link-sale">${products[i].discount}%</div>
                    </a>
                    <div class="product__price">
                        <div class="product__price-current">${products[i].sell}</div>
                        <div class="product__price-old">${products[i].price}</div>
                    </div>
                </div>`;
    }
    s = `<div class="grid">
            <div class="grid__row">
                <div class="grid__col-3">
                    <h3 class="title_size">Theo size giày</h3>
                    <ul class="sizeList grid__row">
                        
                        <li class="size grid__col-6">
                            <input type="checkbox"> 
                            <span>35</span>
                        </li>
                        <li class="size grid__col-6">
                            <input type="checkbox"> 
                            <span>36</span>
                        </li>

                        <li class="size grid__col-6">
                            <input type="checkbox"> 
                            <span>37</span>
                        </li>
                        <li class="size grid__col-6">
                            <input type="checkbox"> 
                            <span>38</span>
                        </li>

                        <li class="size grid__col-6">
                            <input type="checkbox"> 
                            <span>39</span>
                        </li>
                        <li class="size grid__col-6">
                            <input type="checkbox"> 
                            <span>40</span>
                        </li>

                        <li class="size grid__col-6">
                            <input type="checkbox"> 
                            <span>41</span>
                        </li>
                        <li class="size grid__col-6">
                            <input type="checkbox"> 
                            <span>42</span>
                        </li>

                        <li class="size grid__col-6">
                            <input type="checkbox"> 
                            <span>43</span>
                        </li>
                        <li class="size grid__col-6">
                            <input type="checkbox"> 
                            <span>44</span>
                        </li>
                                            
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
                                        <span> Hiển thị 1 - 30 trong tổng số 305 sản phẩm </span>
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
                                                <li><a href=""></a>Mặc định</li>
                                                <li><a href=""></a>A → Z</li>
                                                <li><a href=""></a>Z → A</li>
                                                <li><a href=""></a>Giá tăng dần</li>
                                                <li><a href=""></a>Giá giảm dần</li>
                                                <li><a href=""></a>Hàng mới nhất</li>
                                                <li><a href=""></a>Hàng cũ nhất</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid__row product_list">
                    ` + s +
                        `
                        <ul class="pagination">
                            <li class="page-item disabled"><a href="" class="page-link">1</a></li>
                            <li class="page-item"><a href="" class="page-link">2</a></li>
                            <li class="page-item"><a href="" class="page-link">3</a></li>
                            <li class="page-item"><a href="" class="page-link">...</a></li>
                            <li class="page-item"><a href="" class="page-link">5</a></li>
                            <li class="page-item"><a href="" class="page-link"><i class="fa-solid fa-angles-right"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>`
    document.getElementsByClassName("body-content")[0].innerHTML = s;
}