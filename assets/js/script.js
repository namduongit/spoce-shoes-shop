
// chức năng tìm kiếm sản phẩm theo tên
// start tìm kiếm theo tên
document.getElementById("button-search").addEventListener("click", function(event) {
    event.preventDefault();
    searchProducts();
});

document.getElementById("search-inp").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        searchProducts();
    }
});

function searchProducts() {
    const searchQuery = document.getElementById("search-inp").value.trim().toLowerCase();
    const allProducts = JSON.parse(localStorage.getItem('products')) || [];
    document.querySelector('.section-two').style.display = 'none';

    // Lọc các sản phẩm có tên chứa từ khóa tìm kiếm
    const filteredProducts = allProducts.filter(product => product.name_product.toLowerCase().includes(searchQuery));

    if (filteredProducts.length === 0) {
        alert("Không tìm thấy sản phẩm nào với từ khóa: " + searchQuery);
        return;
    }

    let resultHTML = "";
    filteredProducts.forEach(product => {
        resultHTML += `<div class="grid_col-4 product__item">
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

    // Hiển thị kết quả tìm kiếm trong phần tử chứa sản phẩm
    document.getElementsByClassName("hot-products")[0].innerHTML = `
        <div class="wrapper">
            <h2>Kết quả tìm kiếm cho: "${searchQuery}"</h2>
            <div class="grid__row product_list">
                ${resultHTML}
            </div>
        </div>`;
}
// end tìm kiếm theo tên
