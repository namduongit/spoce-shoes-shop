// Khởi tạo danh sách sản phẩm
function createProduct() {
    if (localStorage.getItem('products') === null) {
        let products = [
            {
                id: "1",
                name_product: "WMNS AIR JORDAN 1 LOW SE 'REVERSE ICE BLUE'",
                brand: "nike",
                price: "2.100.000đ",
                sell: "1.470.000đ",
                discount: "30",
                image: "image/1.png",
                promo_image: {
                    "image_1": "",
                    "image_2": "",
                    "image_3": "",
                    "image_4": ""
                }
            },
            {
                id: "2",
                name_product: "Ambush x Air Force 1 Low 'Phantom'",
                brand: "nike",
                price: "3.300.000₫",
                sell: "2.640.000₫",
                discount: "30",
                image: "image/2.png",
                promo_image: {
                    "image_1": "",
                    "image_2": "",
                    "image_3": "",
                    "image_4": ""
                }
            },
            {
                id: "3",
                name_product: "Air Force 1 'Blue Paisley'",
                brand: "nike",
                price: "1.700.000₫",
                sell: "1.360.000₫",
                discount: "30",
                image: "image/3.png",
                promo_image: {
                    "image_1": "",
                    "image_2": "",
                    "image_3": "",
                    "image_4": ""
                }
            },
            {
                id: "4",
                name_product: "Air Force 1 Essential Low 'White Gym Red'",
                brand: "nike",
                price: "1.700.000₫",
                sell: "1.360.000₫",
                discount: "30",
                image: "image/4.png",
                promo_image: {
                    "image_1": "",
                    "image_2": "",
                    "image_3": "",
                    "image_4": ""
                }
            },
            {
                id: "5",
                name_product: "JORDAN LEGACY 312 LOW '25TH ANNIVERSARY'",
                brand: "nike",
                price: "2.200.000đ",
                sell: "1.550.000đ",
                discount: "30",
                image: "image/5.png",
                promo_image: {
                    "image_1": "",
                    "image_2": "",
                    "image_3": "",
                    "image_4": ""
                }
            },
            {
                id: "6",
                name_product: "Air Force 1 07 Low Light Grey Rice",
                brand: "nike",
                price: "1.800.000đ",
                sell: "1.440.000đ",
                discount: "30",
                image: "image/6.png",
                promo_image: {
                    "image_1": "image/6.1.png",
                    "image_2": "image/6.2.png",
                    "image_3": "image/6.3.png",
                    "image_4": "image/6.4.png"
                }
            },
            {
                id: "7",
                name_product: "AIR JORDAN 1 LOW 'WHITE UNIVERISTY RED'",
                brand: "nike",
                price: "2.100.000đ",
                sell: "1.470.000đ",
                discount: "30",
                image: "image/7.png",
                promo_image: {
                    "image_1": "",
                    "image_2": "",
                    "image_3": "",
                    "image_4": ""
                }
            },
            {
                id: "8",
                name_product: "Air Jordan 1 Low ‘Pink Foam’",
                brand: "nike",
                price: "2.100.000đ",
                sell: "1.470.000đ",
                discount: "30",
                image: "image/8.png",
                promo_image: {
                    "image_1": "",
                    "image_2": "",
                    "image_3": "",
                    "image_4": ""
                }
            },
            {
                id: "9",
                name_product: "Air Jordan 1 Low 'Light Grey Sail'",
                brand: "nike",
                price: "2.100.000đ",
                sell: "1.470.000đ",
                discount: "30",
                image: "image/9.png",
                promo_image: {
                    "image_1": "",
                    "image_2": "",
                    "image_3": "",
                    "image_4": ""
                }
            },
            {
                id: "10",
                name_product: "WMNS AIR JORDAN 1 LOW 'JADE SMOKE'",
                brand: "nike",
                price: "2.100.000đ",
                sell: "1.470.000đ",
                discount: "30",
                image: "image/10.png",
                promo_image: {
                    "image_1": "image/10.1.png",
                    "image_2": "image/10.2.png",
                    "image_3": "image/10.3.png",
                    "image_4": "image/10.4.png"
                }
            },
            {
                id: "11",
                name_product: "TROPHY ROOM X JORDAN 1 RETRO LOW OG SP 'ROOKIE CARD - AWAY'",
                brand: "nike",
                price: "2.800.000đ",
                sell: "1.960.000₫",
                discount: "30",
                image: "image/11.png",
                promo_image: {
                    "image_1": "image/11.1.png",
                    "image_2": "image/11.2.png",
                    "image_3": "image/11.3.png",
                    "image_4": "image/11.4.png"
                }
            },
            {
                id: "12",
                name_product: "AIR JORDAN 1 MID SE 'WHITE ICE BLUE'",
                brand: "nike",
                price: "2.400.000đ",
                sell: "1.920.000₫",
                discount: "30",
                image: "image/12.png",
                promo_image: {
                    "image_1": "",
                    "image_2": "",
                    "image_3": "",
                    "image_4": ""
                }
            },
            {
                id: "13",
                name_product: "AIR JORDAN 1 LOW SE 'INDUSTRIAL BLUE SASHIKO'",
                brand: "nike",
                price: "2.100.000đ",
                sell: "1.470.000đ",
                discount: "30",
                image: "image/13.png",
                promo_image: {
                    "image_1": "image/13.1.png",
                    "image_2": "image/13.2.png",
                    "image_3": "image/13.3.png",
                    "image_4": "image/13.4.png"
                }
            },
            {
                id: "14",
                name_product: "AIR JORDAN 1 LOW SE 'TOKYO 96'",
                brand: "nike",
                price: "2.100.000đ",
                sell: "1.470.000đ",
                discount: "30",
                image: "image/14.png",
                promo_image: {
                    "image_1": "",
                    "image_2": "",
                    "image_3": "",
                    "image_4": ""
                }
            },
            {
                id: "15",
                name_product: "AIR JORDAN 1 LOW GS 'DESERT BERRY'",
                brand: "nike",
                price: "2.100.000đ",
                sell: "1.470.000đ",
                discount: "30",
                image: "image/15.png",
                promo_image: {
                    "image_1": "image/15.1.png",
                    "image_2": "image/15.2.png",
                    "image_3": "image/15.3.png",
                    "image_4": "image/15.4.png"
                }
            },
            {
                id: "16",
                name_product: "AIR JORDAN 1 LOW 'TRUE BLUE CEMENT'",
                brand: "nike",
                price: "2.100.000đ",
                sell: "1.470.000đ",
                discount: "30",
                image: "image/16.png",
                promo_image: {
                    "image_1": "image/16.1.png",
                    "image_2": "image/16.2.png",
                    "image_3": "image/16.3.png",
                    "image_4": "image/16.4.png"
                }
            },
            {
                id: "17",
                name_product: "WMNS AIR JORDAN 1 LOW 'PASTEL PLUM'",
                brand: "nike",
                price: "2.100.000đ",
                sell: "1.470.000đ",
                discount: "30",
                image: "image/17.png",
                promo_image: {
                    "image_1": "",
                    "image_2": "",
                    "image_3": "",
                    "image_4": ""
                }
            },
            {
                id: "18",
                name_product: "Court Borough Low 2 GS 'Triple White'",
                brand: "nike",
                price: "1.400.000đ",
                sell: "980.000đ",
                discount: "30",
                image: "image/18.png",
                promo_image: {
                    "image_1": "",
                    "image_2": "",
                    "image_3": "",
                    "image_4": ""
                }
            },
            {
                id: "19",
                name_product: "AIR JORDAN 1 LOW 'AQUATONE'",
                brand: "nike",
                price: "2.100.000đ",
                sell: "1.470.000đ",
                discount: "30",
                image: "image/19.png",
                promo_image: {
                    "image_1": "image/19.1.png",
                    "image_2": "image/19.2.png",
                    "image_3": "image/19.3.png",
                    "image_4": "image/19.4.png"
                }
            },
            {
                id: "20",
                name_product: "Air Jordan 1 Low 'Gold Swoosh'",
                brand: "nike",
                price: "2.100.000đ",
                sell: "1.470.000đ",
                discount: "30",
                image: "image/20.png",
                promo_image: {
                    "image_1": "image/20.1.png",
                    "image_2": "image/20.2.png",
                    "image_3": "image/20.3.png",
                    "image_4": "image/20.4.png"
                }
            },
            {
                id: "21",
                name_product: "Super Star II 'White Black'",
                brand: "adidas",
                price: "1.200.000",
                sell: "960.000",
                discount: "20",
                image: "image/21.png",
                promo_image: {
                    "image_1": "image/21.1.png",
                    "image_2": "image/21.2.png",
                    "image_3": "image/21.3.png",
                    "image_4": "image/21.4.png"
                }
            },
            {
                id: "22",
                name_product: "Samba OG White Green",
                brand: "adidas",
                price: "1.200.000",
                sell: "960.000",
                discount: "20",
                image: "image/22.png",
                promo_image: {
                    "image_1": "image/22.1.png",
                    "image_2": "image/22.2.png",
                    "image_3": "image/22.3.png",
                    "image_4": "image/22.4.png"
                }
            },
            {
                id: "23",
                name_product: "UltraBoost 4.0 DNA 'Black Green White'",
                brand: "adidas",
                price: "1.800.000",
                sell: "1.440.000",
                discount: "20",
                image: "image/23.png",
                promo_image: {
                    "image_1": "image/23.1.png",
                    "image_2": "image/23.2.png",
                    "image_3": "image/23.3.png",
                    "image_4": "image/23.4.png"
                }
            },
            {
                id: "24",
                name_product: "YEEZY SLIDES 'BONE' 2022",
                brand: "adidas",
                price: "900.000",
                sell: "720.000",
                discount: "20",
                image: "image/24.png",
                promo_image: {
                    "image_1": "image/24.1.png",
                    "image_2": "image/24.2.png",
                    "image_3": "image/24.3.png",
                    "image_4": "image/24.4.png"
                }
            },
            {
                id: "25",
                name_product: "ULTRABOOST 22 HEAT.RDY 'BLACK CLEAR ORANGE'",
                brand: "adidas",
                price: "1.900.000",
                sell: "1.520.000",
                discount: "20",
                image: "image/25.png",
                promo_image: {
                    "image_1": "image/25.1.png",
                    "image_2": "image/25.2.png",
                    "image_3": "image/25.3.png",
                    "image_4": "image/25.4.png"
                }
            },
            {
                id: "26",
                name_product: "YEEZY BOOST 350 V2 'DAZZLING BLUE'",
                brand: "adidas",
                price: "2.100.000",
                sell: "1.680.000",
                discount: "20",
                image: "image/26.png",
                promo_image: {
                    "image_1": "image/26.1.png",
                    "image_2": "image/26.2.png",
                    "image_3": "image/26.3.png",
                    "image_4": "image/26.4.png"
                }
            },
            {
                id: "27",
                name_product: "YEEZY BOOST 350 V2 'MX OAT'",
                brand: "adidas",
                price: "2.100.000",
                sell: "1.680.000",
                discount: "20",
                image: "image/27.png",
                promo_image: {
                    "image_1": "image/27.1.png",
                    "image_2": "image/27.2.png",
                    "image_3": "image/27.3.png",
                    "image_4": "image/27.4.png"
                }
            },
            {
                id: "28",
                name_product: "Superstars White",
                brand: "adidas",
                price: "1.200.000",
                sell: "960.000",
                discount: "20",
                image: "image/28.png",
                promo_image: {
                    "image_1": "image/28.1.png",
                    "image_2": "image/28.2.png",
                    "image_3": "image/28.3.png",
                    "image_4": "image/28.4.png"
                }
            },
            {
                id: "29",
                name_product: "Stan Smith White",
                brand: "adidas",
                price: "1.200.000",
                sell: "960.000",
                discount: "20",
                image: "image/29.png",
                promo_image: {
                    "image_1": "image/29.1.png",
                    "image_2": "image/29.2.png",
                    "image_3": "image/29.3.png",
                    "image_4": "image/29.4.png"
                }
            },
            {
                id: "30",
                name_product: "Stan Smith Black",
                brand: "adidas",
                price: "1.200.000",
                sell: "960.000",
                discount: "20",
                image: "image/30.png",
                promo_image: {
                    "image_1": "image/30.1.png",
                    "image_2": "image/30.2.png",
                    "image_3": "image/30.3.png",
                    "image_4": "image/30.4.png"
                }
            },
            {
                id: "31",
                name_product: "SAMBA VEGAN 'BLACK'",
                brand: "adidas",
                price: "1.200.000",
                sell: "960.000",
                discount: "20",
                image: "image/31.png",
                promo_image: {
                    "image_1": "image/31.1.png",
                    "image_2": "image/31.2.png",
                    "image_3": "image/31.3.png",
                    "image_4": "image/31.4.png"
                }
            },
            {
                id: "32",
                name_product: "adiFOM Superstar 'Black White'",
                brand: "adidas",
                price: "1.100.000",
                sell: "550.000",
                discount: "50",
                image: "image/32.png",
                promo_image: {
                    "image_1": "image/32.1.png",
                    "image_2": "image/32.2.png",
                    "image_3": "image/32.3.png",
                    "image_4": "image/32.4.png"
                }
            },
            {
                id: "33",
                name_product: "YEEZY SLIDES 'PURE'",
                brand: "adidas",
                price: "900.000",
                sell: "720.000",
                discount: "20",
                image: "image/33.png",
                promo_image: {
                    "image_1": "image/33.1.png",
                    "image_2": "image/33.2.png",
                    "image_3": "image/33.3.png",
                    "image_4": "image/33.4.png"
                }
            },
            {
                id: "34",
                name_product: "SuperStar 'White Silver Metallic'",
                brand: "adidas",
                price: "1.300.000",
                sell: "1.040.000",
                discount: "20",
                image: "image/34.png",
                promo_image: {
                    "image_1": "image/34.1.png",
                    "image_2": "image/34.2.png",
                    "image_3": "image/34.3.png",
                    "image_4": "image/34.4.png"
                }
            },
            {
                id: "35",
                name_product: "YEEZY BOOST 350 V2 'ONYX'",
                brand: "adidas",
                price: "2.100.000",
                sell: "1.680.000",
                discount: "20",
                image: "image/35.png",
                promo_image: {
                    "image_1": "image/35.1.png",
                    "image_2": "image/35.2.png",
                    "image_3": "image/35.3.png",
                    "image_4": "image/35.4.png"
                }
            },
            {
                id: "36",
                name_product: "ULTRABOOST 22 'NON DYED BLACK'",
                brand: "adidas",
                price: "1.900.000",
                sell: "1.520.000",
                discount: "20",
                image: "image/36.png",
                promo_image: {
                    "image_1": "image/36.1.png",
                    "image_2": "image/36.2.png",
                    "image_3": "image/36.3.png",
                    "image_4": "image/36.4.png"
                }
            },
            {
                id: "37",
                name_product: "FORUM 84 LOW 'WHITE BLACK'",
                brand: "adidas",
                price: "1.200.000",
                sell: "960.000",
                discount: "20",
                image: "image/37.png",
                promo_image: {
                    "image_1": "image/37.1.png",
                    "image_2": "image/37.2.png",
                    "image_3": "image/37.3.png",
                    "image_4": "image/37.4.png"
                }
            },
            {
                id: "38",
                name_product: "AR.SENAL X ULTRABOOST 21 'BLACK SCARLET'",
                brand: "adidas",
                price: "1.900.000",
                sell: "1.520.000",
                discount: "20",
                image: "image/38.png",
                promo_image: {
                    "image_1": "image/38.1.png",
                    "image_2": "image/38.2.png",
                    "image_3": "image/38.3.png",
                    "image_4": "image/38.4.png"
                }
            },
            {
                id: "39",
                name_product: "YEEZY BOOST 700 'WASH ORANGE'",
                brand: "adidas",
                price: "3.000.000",
                sell: "2.400.000",
                discount: "20",
                image: "image/39.png",
                promo_image: {
                    "image_1": "image/39.1.png",
                    "image_2": "image/39.2.png",
                    "image_3": "image/39.3.png",
                    "image_4": "image/39.4.png"
                }
            },
            {
                id: "40",
                name_product: "EQ21 RUN COLD.RDY",
                brand: "adidas",
                price: "1.100.000",
                sell: "880.000",
                discount: "20",
                image: "image/40.png",
                promo_image: {
                    "image_1": "image/40.1.png",
                    "image_2": "image/40.2.png",
                    "image_3": "image/40.3.png",
                    "image_4": "image/40.4.png"
                }
            },
            {
                id: "41",
                name_product: "VANS STYLE 36 RED",
                brand: "VANS",
                price: "1.000.000",
                sell: "800.000",
                discount: "20",
                image: "image/41.png",
                promo_image: {
                    "image_1": "image/41.1.png",
                    "image_2": "image/41.2.png",
                    "image_3": "image/41.3.png",
                    "image_4": "image/41.4.png"
                }
            },
            {
                id: "42",
                name_product: "Vans Vault Style 36 Black",
                brand: "VANS",
                price: "1.250.000",
                sell: "1.000.000",
                discount: "20",
                image: "image/42.png",
                promo_image: {
                    "image_1": "image/42.1.png",
                    "image_2": "image/42.2.png",
                    "image_3": "image/42.3.png",
                    "image_4": "image/42.4.png"
                }
            },
            {
                id: "43",
                name_product: "VANS OLD SKOOL CLASSIC BLACK",
                brand: "VANS",
                price: "950.000",
                sell: "760.000",
                discount: "20",
                image: "image/43.png",
                promo_image: {
                    "image_1": "image/43.1.png",
                    "image_2": "image/43.2.png",
                    "image_3": "image/43.3.png",
                    "image_4": "image/43.4.png"
                }
            },
            {
                id: "44",
                name_product: "Vans Vault Style 36 - Red",
                brand: "VANS",
                price: "1.150.000",
                sell: "690.000",
                discount: "40",
                image: "image/44.png",
                promo_image: {
                    "image_1": "image/44.1.png",
                    "image_2": "image/44.2.png",
                    "image_3": "image/44.3.png",
                    "image_4": "image/44.4.png"
                }
            },
            {
                id: "45",
                name_product: "Vans Vault Style 36 - Blue",
                brand: "VANS",
                price: "1.150.000",
                sell: "690.000",
                discount: "40",
                image: "image/45.png",
                promo_image: {
                    "image_1": "image/45.1.png",
                    "image_2": "image/45.2.png",
                    "image_3": "image/45.3.png",
                    "image_4": "image/45.4.png"
                }
            },
            {
                id: "46",
                name_product: "Vans Vault Style 36 - Green",
                brand: "VANS",
                price: "1.150.000",
                sell: "920.000",
                discount: "20",
                image: "image/46.png",
                promo_image: {
                    "image_1": "image/46.1.png",
                    "image_2": "image/46.2.png",
                    "image_3": "image/46.3.png",
                    "image_4": "image/46.4.png"
                }
            },
            {
                id: "47",
                name_product: "Vault og authentic lx (canvas/suede) - Red 2020",
                brand: "VANS",
                price: "1.050.000",
                sell: "840.000",
                discount: "20",
                image: "image/47.png",
                promo_image: {
                    "image_1": "image/47.1.png",
                    "image_2": "image/47.2.png",
                    "image_3": "image/47.3.png",
                    "image_4": "image/47.4.png"
                }
            },
            {
                id: "48",
                name_product: "OG Authentic LX Island Leaf (Brown)",
                brand: "VANS",
                price: "1.250.000",
                sell: "1.000.000",
                discount: "20",
                image: "image/48.png",
                promo_image: {
                    "image_1": "image/48.1.png",
                    "image_2": "image/48.2.png",
                    "image_3": "image/48.3.png",
                    "image_4": "image/48.4.png"
                }
            },
            {
                id: "49",
                name_product: "VANS OLD SKOOL CLASSIC NAVY",
                brand: "VANS",
                price: "950.000",
                sell: "760.000",
                discount: "20",
                image: "image/49.png",
                promo_image: {
                    "image_1": "image/49.1.png",
                    "image_2": "image/49.2.png",
                    "image_3": "image/49.3.png",
                    "image_4": "image/49.4.png"
                }
            },
            {
                id: "50",
                name_product: "VANS STYLE 36 GREEN",
                brand: "VANS",
                price: "1.000.000",
                sell: "800.000",
                discount: "20",
                image: "image/50.png",
                promo_image: {
                    "image_1": "image/50.1.png",
                    "image_2": "image/50.2.png",
                    "image_3": "image/50.3.png",
                    "image_4": "image/50.4.png"
                }
            },
            {
                id: "51",
                name_product: "VANS FOG x Era 95 Reissue 'Marshmallow'",
                brand: "VANS",
                price: "1.200.000",
                sell: "960.000",
                discount: "20",
                image: "image/51.png",
                promo_image: {
                    "image_1": "image/51.1.png",
                    "image_2": "image/51.2.png",
                    "image_3": "image/51.3.png",
                    "image_4": "image/51.4.png"
                }
            },
            {
                id: "52",
                name_product: "VANS FOG x Era 95 DX 'Collection 2 White'",
                brand: "VANS",
                price: "1.200.000",
                sell: "960.000",
                discount: "20",
                image: "image/52.png",
                promo_image: {
                    "image_1": "image/52.1.png",
                    "image_2": "image/52.2.png",
                    "image_3": "image/52.3.png",
                    "image_4": "image/52.4.png"
                }
            },
            {
                id: "53",
                name_product: "VANS FOG x Era 95 DX 'Collection 2 Red'",
                brand: "VANS",
                price: "1.200.000",
                sell: "600.000",
                discount: "50",
                image: "image/53.png",
                promo_image: {
                    "image_1": "image/53.1.png",
                    "image_2": "image/53.2.png",
                    "image_3": "image/53.3.png",
                    "image_4": "image/53.4.png"
                }
            },
            {
                id: "54",
                name_product: "VANS STYLE 36 BLUE",
                brand: "VANS",
                price: "1.200.000",
                sell: "960.000",
                discount: "20",
                image: "image/54.png",
                promo_image: {
                    "image_1": "image/54.1.png",
                    "image_2": "image/54.2.png",
                    "image_3": "image/54.3.png",
                    "image_4": "image/54.4.png"
                }
            },
            {
                id: "61",
                name_product: "1970s PARCHMENT HIGH",
                brand: "converse",
                price: "1.100.000",
                sell: "800.000",
                discount: "20",
                image: "image/61.png",
                promo_image: {
                    "image_1": "image/61.1.png",
                    "image_2": "image/61.2.png",
                    "image_3": "image/61.3.png",
                    "image_4": "image/61.4.png"
                }
            },

            {
                id: "62",
                name_product: "1970s PARCHMENT LOW",
                brand: "converse",
                price: "1.100.000",
                sell: "880.000",
                discount: "20",
                image: "image/62.png",
                promo_image: {
                    "image_1": "image/62.1.png",
                    "image_2": "image/62.2.png",
                    "image_3": "image/62.3.png",
                    "image_4": "image/62.4.png"
                }
            },

            {
                id: "63",
                name_product: "FEAR OF GOD x CHUCK 70 HI 'GREY'",
                brand: "converse",
                price: "1.700.000",
                sell: "1.360.000",
                discount: "20",
                image: "image/63.png",
                promo_image: {
                    "image_1": "image/63.1.png",
                    "image_2": "image/63.2.png",
                    "image_3": "image/63.3.png",
                    "image_4": "image/63.4.png"
                }
            },

            {
                id: "64",
                name_product: "FEAR OF GOD x CHUCK 70 HI 'BLACK'",
                brand: "converse",
                price: "3.300.000",
                sell: "2.460.000",
                discount: "20",
                image: "image/63.png",
                promo_image: {
                    "image_1": "image/64.1.png",
                    "image_2": "image/64.2.png",
                    "image_3": "image/64.3.png",
                    "image_4": "image/64.4.png"
                }
            },

            {
                id: "65",
                name_product: "FEAR OF GOD x CHUCK 70 HI 'NATURAL'",
                brand: "converse",
                price: "1.700.000",
                sell: "800.000",
                discount: "53",
                image: "image/65.png",
                promo_image: {
                    "image_1": "image/65.1.png",
                    "image_2": "image/65.2.png",
                    "image_3": "image/65.3.png",
                    "image_4": "image/65.4.png"
                }
            },

            {
                id: "66",
                name_product: "1970s WHITE LOW",
                brand: "converse",
                price: "1.100.000",
                sell: "880.000",
                discount: "20",
                image: "image/66.png",
                promo_image: {
                    "image_1": "image/66.1.png",
                    "image_2": "image/66.2.png",
                    "image_3": "image/66.3.png",
                    "image_4": "image/66.4.png"
                }
            },

            {
                id: "67",
                name_product: "1970s BLACK LOW",
                brand: "converse",
                price: "1.100.000",
                sell: "880.000",
                discount: "20",
                image: "image/67.png",
                promo_image: {
                    "image_1": "image/67.1.png",
                    "image_2": "image/67.2.png",
                    "image_3": "image/67.3.png",
                    "image_4": "image/67.4.png"
                }
            },

            {
                id: "68",
                name_product: "1970s BLACK HIGH",
                brand: "converse",
                price: "1.100.000",
                sell: "880.000",
                discount: "20",
                image: "image/68.png",
                promo_image: {
                    "image_1": "image/68.1.png",
                    "image_2": "image/68.2.png",
                    "image_3": "image/68.3.png",
                    "image_4": "image/68.4.png"
                }
            },

            {
                id: "69",
                name_product: "1970s WHITE HIGH",
                brand: "converse",
                price: "1.100.000",
                sell: "880.000",
                discount: "20",
                image: "image/69.png",
                promo_image: {
                    "image_1": "image/69.1.png",
                    "image_2": "image/69.2.png",
                    "image_3": "image/69.3.png",
                    "image_4": "image/69.4.png"
                }
            },

            {
                id: "70",
                name_product: "CHUCK 70s x CDG BLACK HIGH",
                brand: "converse",
                price: "1.100.000",
                sell: "880.000",
                discount: "20",
                image: "image/70.png",
                promo_image: {
                    "image_1": "image/70.1.png",
                    "image_2": "image/70.2.png",
                    "image_3": "image/70.3.png",
                    "image_4": "image/70.4.png"
                }
            },

            {
                id: "71",
                name_product: "CHUCK 70s x CDG BLACK LOW",
                brand: "converse",
                price: "1.100.000",
                sell: "880.000",
                discount: "20",
                image: "image/71.png",
                promo_image: {
                    "image_1": "image/71.1.png",
                    "image_2": "image/71.2.png",
                    "image_3": "image/71.3.png",
                    "image_4": "image/71.4.png"
                }
            },

            {
                id: "72",
                name_product: "CHUCK 70s x CDG WHITE HIGH",
                brand: "converse",
                price: "1.100.000",
                sell: "880.000",
                discount: "20",
                image: "image/72.png",
                promo_image: {
                    "image_1": "image/72.1.png",
                    "image_2": "image/72.2.png",
                    "image_3": "image/72.3.png",
                    "image_4": "image/72.4.png"
                }
            },

            {
                id: "73",
                name_product: "CHUCK 70s x CDG WHITE LOW",
                brand: "converse",
                price: "1.100.000",
                sell: "880.000",
                discount: "20",
                image: "image/73.png",
                promo_image: {
                    "image_1": "image/73.1.png",
                    "image_2": "image/73.2.png",
                    "image_3": "image/73.3.png",
                    "image_4": "image/73.4.png"
                }
            },

            {
                id: "74",
                name_product: "CHUCK TAYLOR ALL STAR SPRAY PAINT",
                brand: "converse",
                price: "2.000.000",
                sell: "1.800.000",
                discount: "10",
                image: "image/74.png",
                promo_image: {
                    "image_1": "image/74.1.png",
                    "image_2": "image/74.2.png",
                    "image_3": "image/74.3.png",
                    "image_4": "image/74.4.png"
                }
            },

            {
                id: "75",
                name_product: "CHUCK 70 PLUS AQUA MIST",
                brand: "converse",
                price: "2.500.000",
                sell: "1.625.000",
                discount: "35",
                image: "image/75.png",
                promo_image: {
                    "image_1": "image/75.1.png",
                    "image_2": "image/75.2.png",
                    "image_3": "image/75.3.png",
                    "image_4": "image/75.4.png"
                }
            },

            {
                id: "76",
                name_product: "CHUCK 70 PLUS PINK",
                brand: "converse",
                price: "2.500.000",
                sell: "1.250.000",
                discount: "50",
                image: "image/76.png",
                promo_image: {
                    "image_1": "image/76.1.png",
                    "image_2": "image/76.2.png",
                    "image_3": "image/76.3.png",
                    "image_4": "image/76.4.png"
                }
            },

            {
                id: "77",
                name_product: "CHUCK 70 CRAFT MIX",
                brand: "converse",
                price: "2.500.000",
                sell: "1.650.000",
                discount: "35",
                image: "image/77.png",
                promo_image: {
                    "image_1": "image/77.1.png",
                    "image_2": "image/77.2.png",
                    "image_3": "image/77.3.png",
                    "image_4": "image/77.4.png"
                }
            },

            {
                id: "78",
                name_product: "CHUCK TAYLOR ALL STAR LOGO TAG",
                brand: "converse",
                price: "2.000.000",
                sell: "1.200.000",
                discount: "40",
                image: "image/78.png",
                promo_image: {
                    "image_1": "image/78.1.png",
                    "image_2": "image/78.2.png",
                    "image_3": "image/78.3.png",
                    "image_4": "image/78.4.png"
                }
            },

            {
                id: "79",
                name_product: "RUN STAR HIKE PLATFORM",
                brand: "converse",
                price: "2.500.000",
                sell: "1.250.000",
                discount: "35",
                image: "image/79.png",
                promo_image: {
                    "image_1": "image/79.1.png",
                    "image_2": "image/79.2.png",
                    "image_3": "image/79.3.png",
                    "image_4": "image/79.4.png"
                }
            },

            {
                id: "80",
                name_product: "CHUCK TAYLOR ALL STAR MOVE",
                brand: "converse",
                price: "2.000.000",
                sell: "1.700.000",
                discount: "15",
                image: "image/80.png",
                promo_image: {
                    "image_1": "image/80.1.png",
                    "image_2": "image/80.2.png",
                    "image_3": "image/80.3.png",
                    "image_4": "image/80.4.png"
                }
            },
            {
                id: "81",
                name_product: "HTAG SWEATER - VINTAGE HASTAG",
                brand: "clothes",
                price: "500000",
                sell: "220000",
                discount: "30",
                image: "image/1.png",
                promo_image: {
                    "image_1": "image/81.1.png",
                    "image_2": "image/81.2.png",
                    "image_3": "image/81.3.png",
                    "image_4": "image/81.4.png"
                }
            },
            {
                id: "82",
                name_product: "HTAG HOODIE - EARTH BLACK",
                brand: "clothes",
                price: "800000",
                sell: "290000",
                discount: "30",
                image: "image/82.png",
                promo_image: {
                    "image_1": "image/82.1.png",
                    "image_2": "image/82.2.png",
                    "image_3": "image/82.3.png",
                    "image_4": "image/82.4.png"
                }
            },
            {
                id: "83",
                name_product: "HTAG SWEATER - WHITE HORSE",
                brand: "clothes",
                price: "700000",
                sell: "290000",
                discount: "30",
                image: "image/83.png",
                promo_image: {
                    "image_1": "image/83.1.png",
                    "image_2": "image/83.2.png",
                    "image_3": "image/83.3.png",
                    "image_4": "image/83.4.png"
                }
            },
            {
                id: "84",
                name_product: "HTAG SWEATER - BLACK HORSE",
                brand: "clothes",
                price: "700000",
                sell: "290000",
                discount: "30",
                image: "image/84.png",
                promo_image: {
                    "image_1": "image/84.1.png",
                    "image_2": "image/84.2.png",
                    "image_3": "image/84.3.png",
                    "image_4": "image/84.4.png"
                }
            },
            {
                id: "85",
                name_product: "HTAG SWEATER - VINTAGE HORSE",
                brand: "clothes",
                price: "700000",
                sell: "290000",
                discount: "30",
                image: "image/85.png",
                promo_image: {
                    "image_1": "image/85.1.png",
                    "image_2": "image/85.2.png",
                    "image_3": "image/85.3.png",
                    "image_4": "image/85.4.png"
                }
            },
            {
                id: "86",
                name_product: "HTAG HOODIE - GREY HASTAG",
                brand: "clothes",
                price: "700000",
                sell: "290000",
                discount: "30",
                image: "image/86.png",
                promo_image: {
                    "image_1": "image/86.1.png",
                    "image_2": "image/86.2.png",
                    "image_3": "image/86.3.png",
                    "image_4": "image/86.4.png"
                }
            },
            {
                id: "87",
                name_product: "HTAG HOODIE - VINTAGE HASTAG",
                brand: "clothes",
                price: "700000",
                sell: "290000",
                discount: "30",
                image: "image/87.png",
                promo_image: {
                    "image_1": "image/87.1.png",
                    "image_2": "image/87.2.png",
                    "image_3": "image/87.3.png",
                    "image_4": "image/87.4.png"
                }
            },
            {
                id: "88",
                name_product: "HTAG HOODIE - RED HASTAG",
                brand: "clothes",
                price: "700000",
                sell: "290000",
                discount: "30",
                image: "image/88.png",
                promo_image: {
                    "image_1": "image/88.1.png",
                    "image_2": "image/88.2.png",
                    "image_3": "image/88.3.png",
                    "image_4": "image/88.4.png"
                }
            },
            {
                id: "89",
                name_product: "HTAG HOODIE - GREEN BLACK HASTAG",
                brand: "clothes",
                price: "700000",
                sell: "290000",
                discount: "30",
                image: "image/89.png",
                promo_image: {
                    "image_1": "image/89.1.png",
                    "image_2": "image/89.2.png",
                    "image_3": "image/89.3.png",
                    "image_4": "image/89.4.png"
                }
            },
            {
                id: "90",
                name_product: "HTAG JACKET VARSITY - ROBOT BLACK WHITE",
                brand: "clothes",
                price: "1300000",
                sell: "780000",
                discount: "30",
                image: "image/90.png",
                promo_image: {
                    "image_1": "image/90.1.png",
                    "image_2": "image/90.2.png",
                    "image_3": "image/90.3.png",
                    "image_4": "image/90.4.png"
                }
            },
            {
                id: "91",
                name_product: "HTAG BOMBER - BRING BLACK",
                brand: "clothes",
                price: "990000",
                sell: "594000",
                discount: "30",
                image: "image/91.png",
                promo_image: {
                    "image_1": "image/91.1.png",
                    "image_2": "image/91.2.png",
                    "image_3": "image/91.3.png",
                    "image_4": "image/91.4.png"
                }
            },
            {
                id: "92",
                name_product: "HTAG BOMBER - BRING ORANGE",
                brand: "clothes",
                price: "990000",
                sell: "594000",
                discount: "30",
                image: "image/92.png",
                promo_image: {
                    "image_1": "image/92.1.png",
                    "image_2": "image/92.2.png",
                    "image_3": "image/92.3.png",
                    "image_4": "image/92.4.png"
                }
            },
            {
                id: "93",
                name_product: "Sweater Kenzo Blue",
                brand: "clothes",
                price: "800000",
                sell: "640000",
                discount: "30",
                image: "image/93.png",
                promo_image: {
                    "image_1": "image/93.1.png",
                    "image_2": "image/93.2.png"
                }
            },
            {
                id: "94",
                name_product: "Sweater Kenzo Black Blue",
                brand: "clothes",
                price: "800000",
                sell: "640000",
                discount: "30",
                image: "image/94.png",
                promo_image: {
                    "image_1": "image/94.1.png",
                    "image_2": "image/94.2.png"
                }
            },
        ]
         for(let i=0;i<products.length;i++){
            products[i].image="data/js/image/"+(i+1)+".png";
        }
        localStorage.setItem('products', JSON.stringify(products));
    }
}

window.onload = createProduct();

