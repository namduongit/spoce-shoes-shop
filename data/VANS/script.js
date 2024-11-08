
function Product(id, name_product, brand, price, sell, discount, image, image_1, image_2, image_3, image_4) {
    this.id = id;
    this.name_product = name_product;
    this.brand = brand;
    this.price = price;
    this.sell = sell;
    this.discount = discount;
    this.image = image;
    this.promo_image = {
      image_1: image_1,
      image_2: image_2,
      image_3: image_3,
      image_4: image_4
    };
  }
var products_list=[
  new Product("40","Vans Vault Style 36 Orange","VANS","1.040.000","832.000","20","./image/40.png", "./image/40.1.png","./image/40.2.png","./image/40.3.png", "./image/40.4.png"),
  new Product("41","VANS STYLE 36 RED","VANS","1.000.000","800.000","20","./image/41.png", "./image/41.1.png","./image/41.2.png","./image/41.3.png", "./image/41.4.png"),
  new Product("42","Vans Vault Style 36 Black","VANS","1.250.000","1.000.000","20","./image/42.png", "./image/42.1.png","./image/42.2.png","./image/42.3.png", "./image/42.4.png"),
  new Product("43","VANS OLD SKOOL CLASSIC BLACK","VANS","950.000","760.000","20","./image/43.png", "./image/43.1.png","./image/43.2.png","./image/43.3.png", "./image/43.4.png"),
  new Product("44","Vans Vault Style 36 - Red","VANS","1.150.000","690.000","40","./image/44.png", "./image/44.1.png","./image/44.2.png","./image/44.3.png", "./image/44.4.png"),
  new Product("45","Vans Vault Style 36 - Blue","VANS","1.150.000","690.000","40","./image/45.png", "./image/45.1.png","./image/45.2.png","./image/45.3.png", "./image/45.4.png"),
  new Product("46","Vans Vault Style 36 - Green","VANS","1.150.000","920.000","20","./image/46.png", "./image/46.1.png","./image/46.2.png","./image/46.3.png", "./image/46.4.png"),
  new Product("47","Vault og authentic lx (canvas/suede) - Red 2020","VANS","1.050.000","840.000","20","./image/47.png", "./image/47.1.png","./image/47.2.png","./image/47.3.png", "./image/47.4.png"),
  new Product("48","OG Authentic LX Island Leaf (Brown)","VANS","1.250.000","1.000.000","20","./image/48.png", "./image/48.1.png","./image/48.2.png","./image/48.3.png", "./image/48.4.png"),
  new Product("49","VANS OLD SKOOL CLASSIC NAVY","VANS","950.000","760.000","20","./image/49.png", "./image/49.1.png","./image/49.2.png","./image/49.3.png", "./image/49.4.png"),
  new Product("50","VANS STYLE 36 GREEN","VANS","1.000.000","800.000","20","./image/50.png", "./image/50.1.png","./image/50.2.png","./image/50.3.png", "./image/50.4.png"),
  new Product("51","VANS FOG x Era 95 Reissue 'Marshmallow'","VANS","1.200.000","960.000","20","./image/51.png", "./image/51.1.png","./image/51.2.png","./image/51.3.png", "./image/51.4.png"),
  new Product("52","VANS FOG x Era 95 DX 'Collection 2 White'","VANS","1.200.000","960.000","20","./image/52.png", "./image/52.1.png","./image/52.2.png","./image/52.3.png", "./image/52.4.png"),
  new Product("53","VANS FOG x Era 95 DX 'Collection 2 Red'","VANS","1.200.000","600.000","50","./image/53.png", "./image/53.1.png","./image/53.2.png","./image/53.3.png", "./image/53.4.png"),
  new Product("53","VANS STYLE 36 BLUE","VANS","1.200.000","960.000","20","./image/54.png", "./image/54.1.png","./image/54.2.png","./image/54.3.png", "./image/54.4.png"),

];
console.log(products_list);
