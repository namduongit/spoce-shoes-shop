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
                image: "https://bizweb.dktcdn.net/thumb/large/100/336/177/products/9-a7e276cd-4e85-493d-9035-820eccac9b9e.jpg?v=1695395068057",
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
                discount: "20",
                image: "https://bizweb.dktcdn.net/thumb/large/100/336/177/products/9-a7e276cd-4e85-493d-9035-820eccac9b9e.jpg?v=1695395068057",
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
                discount: "20",
                image: "https://bizweb.dktcdn.net/thumb/large/100/336/177/products/9-a7e276cd-4e85-493d-9035-820eccac9b9e.jpg?v=1695395068057",
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
                discount: "20",
                image: "https://bizweb.dktcdn.net/thumb/large/100/336/177/products/9-a7e276cd-4e85-493d-9035-820eccac9b9e.jpg?v=1695395068057",
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
                image: "https://bizweb.dktcdn.net/thumb/large/100/336/177/products/9-a7e276cd-4e85-493d-9035-820eccac9b9e.jpg?v=1695395068057",
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
                discount: "20",
                image: "https://bizweb.dktcdn.net/thumb/large/100/336/177/products/9-a7e276cd-4e85-493d-9035-820eccac9b9e.jpg?v=1695395068057",
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
                image: "https://bizweb.dktcdn.net/thumb/large/100/336/177/products/9-a7e276cd-4e85-493d-9035-820eccac9b9e.jpg?v=1695395068057",
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
                image: "https://bizweb.dktcdn.net/thumb/large/100/336/177/products/9-a7e276cd-4e85-493d-9035-820eccac9b9e.jpg?v=1695395068057",
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
                image: "https://bizweb.dktcdn.net/thumb/large/100/336/177/products/9-a7e276cd-4e85-493d-9035-820eccac9b9e.jpg?v=1695395068057",
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
                image: "https://bizweb.dktcdn.net/thumb/large/100/336/177/products/9-a7e276cd-4e85-493d-9035-820eccac9b9e.jpg?v=1695395068057",
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
                image: "https://bizweb.dktcdn.net/thumb/large/100/336/177/products/9-a7e276cd-4e85-493d-9035-820eccac9b9e.jpg?v=1695395068057",
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
                discount: "20",
                image: "https://bizweb.dktcdn.net/thumb/large/100/336/177/products/9-a7e276cd-4e85-493d-9035-820eccac9b9e.jpg?v=1695395068057",
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
                image: "https://bizweb.dktcdn.net/thumb/large/100/336/177/products/9-a7e276cd-4e85-493d-9035-820eccac9b9e.jpg?v=1695395068057",
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
                image: "https://bizweb.dktcdn.net/thumb/large/100/336/177/products/9-a7e276cd-4e85-493d-9035-820eccac9b9e.jpg?v=1695395068057",
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
                image: "https://bizweb.dktcdn.net/thumb/large/100/336/177/products/9-a7e276cd-4e85-493d-9035-820eccac9b9e.jpg?v=1695395068057",
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
                image: "https://bizweb.dktcdn.net/thumb/large/100/336/177/products/9-a7e276cd-4e85-493d-9035-820eccac9b9e.jpg?v=1695395068057",
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
                image: "https://bizweb.dktcdn.net/thumb/large/100/336/177/products/9-a7e276cd-4e85-493d-9035-820eccac9b9e.jpg?v=1695395068057",
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
                image: "https://bizweb.dktcdn.net/thumb/large/100/336/177/products/9-a7e276cd-4e85-493d-9035-820eccac9b9e.jpg?v=1695395068057",
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
                image: "https://bizweb.dktcdn.net/thumb/large/100/336/177/products/9-a7e276cd-4e85-493d-9035-820eccac9b9e.jpg?v=1695395068057",
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
                image: "https://bizweb.dktcdn.net/thumb/large/100/336/177/products/9-a7e276cd-4e85-493d-9035-820eccac9b9e.jpg?v=1695395068057",
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
                image: "//bizweb.dktcdn.net/thumb/large/100/336/177/products/6-803049a8-951e-44c0-8138-179bc9edc097.jpg?v=1682928244017",
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
                image: "//bizweb.dktcdn.net/thumb/large/100/336/177/products/6-803049a8-951e-44c0-8138-179bc9edc097.jpg?v=1682928244017",
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
                image: "//bizweb.dktcdn.net/thumb/large/100/336/177/products/6-803049a8-951e-44c0-8138-179bc9edc097.jpg?v=1682928244017",
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
                image: "//bizweb.dktcdn.net/thumb/large/100/336/177/products/6-803049a8-951e-44c0-8138-179bc9edc097.jpg?v=1682928244017",
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
                image: "//bizweb.dktcdn.net/thumb/large/100/336/177/products/6-803049a8-951e-44c0-8138-179bc9edc097.jpg?v=1682928244017",
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
                image: "//bizweb.dktcdn.net/thumb/large/100/336/177/products/6-803049a8-951e-44c0-8138-179bc9edc097.jpg?v=1682928244017",
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
                image: "//bizweb.dktcdn.net/thumb/large/100/336/177/products/6-803049a8-951e-44c0-8138-179bc9edc097.jpg?v=1682928244017",
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
                image: "//bizweb.dktcdn.net/thumb/large/100/336/177/products/6-803049a8-951e-44c0-8138-179bc9edc097.jpg?v=1682928244017",
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
                image: "//bizweb.dktcdn.net/thumb/large/100/336/177/products/6-803049a8-951e-44c0-8138-179bc9edc097.jpg?v=1682928244017",
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
                image: "//bizweb.dktcdn.net/thumb/large/100/336/177/products/6-803049a8-951e-44c0-8138-179bc9edc097.jpg?v=1682928244017",
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
                image: "//bizweb.dktcdn.net/thumb/large/100/336/177/products/6-803049a8-951e-44c0-8138-179bc9edc097.jpg?v=1682928244017",
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
                image: "//bizweb.dktcdn.net/thumb/large/100/336/177/products/6-803049a8-951e-44c0-8138-179bc9edc097.jpg?v=1682928244017",
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
                image: "//bizweb.dktcdn.net/thumb/large/100/336/177/products/6-803049a8-951e-44c0-8138-179bc9edc097.jpg?v=1682928244017",
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
                image: "//bizweb.dktcdn.net/thumb/large/100/336/177/products/6-803049a8-951e-44c0-8138-179bc9edc097.jpg?v=1682928244017",
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
                image: "//bizweb.dktcdn.net/thumb/large/100/336/177/products/6-803049a8-951e-44c0-8138-179bc9edc097.jpg?v=1682928244017",
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
                image: "//bizweb.dktcdn.net/thumb/large/100/336/177/products/6-803049a8-951e-44c0-8138-179bc9edc097.jpg?v=1682928244017",
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
                image: "//bizweb.dktcdn.net/thumb/large/100/336/177/products/6-803049a8-951e-44c0-8138-179bc9edc097.jpg?v=1682928244017",
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
                image: "//bizweb.dktcdn.net/thumb/large/100/336/177/products/6-803049a8-951e-44c0-8138-179bc9edc097.jpg?v=1682928244017",
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
                image: "//bizweb.dktcdn.net/thumb/large/100/336/177/products/6-803049a8-951e-44c0-8138-179bc9edc097.jpg?v=1682928244017",
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
                image: "//bizweb.dktcdn.net/thumb/large/100/336/177/products/6-803049a8-951e-44c0-8138-179bc9edc097.jpg?v=1682928244017",
                promo_image: {
                    "image_1": "image/40.1.png",
                    "image_2": "image/40.2.png",
                    "image_3": "image/40.3.png",
                    "image_4": "image/40.4.png"
                }
            },
        ]
        localStorage.setItem('products', JSON.stringify(products));
    }
}

window.onload = createProduct();

