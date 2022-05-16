'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', [
  {
    "active": true,
    "name": "MONITOR ASUS 29 POL. 2560X1080 FULL HD, MX299Q",
    "url_Image": "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/m/x/mx299q_1.jpg",
    "price": 10.50
  },
  {
    "active": true,
    "name": "MONITOR PHILIPS 276E8V 27' IPS 5MS 60HZ 4K PRETO, 276E8VJSB/57",
    "url_Image": "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/2/7/276e8vjsb572321.jpg",
    "price": 7.50
  },
  {
    "active": true,
    "name": "Monitor Tubo Crt Hp 15",
    "url_Image": "https://http2.mlstatic.com/D_NQ_NP_782734-MLB49960206316_052022-O.webp",
    "price": 0.50
  },
  {
    "active": false,
    "name": "MONITOR GAMER BENQ ZOWIE 24.5 POL LED FULL HD 1MS 240HZ, XL2546",
    "url_Image": "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/o/p/optix-g27cq4231.jpg",
    "price": 8.39
  },
  {
    "active": true,
    "name": "TECLADO GAMER REDRAGON HARPE RGB, K503RGB",
    "url_Image": "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/k/5/k503rgb2.jpg",
    "price": 2.50
  },
  {
    "active": false,
    "name": "TECLADO MECANICO REDRAGON DITI ONE-HAND RGB, K585RGB",
    "url_Image": "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/k/5/k585rgb3.jpg",
    "price": 3.20
  },
  {
    "active": true,
    "name": "TECLADO GAMER REDRAGON KARURA 2, BRANCO, K502W-N",
    "url_Image": "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/k/5/k502w-n7.jpg",
    "price": 4.00
  },
  {
    "active": true,
    "name": "COMPUTADOR ALVES GAMER KAGYU, AMD RYZEN 3 3200G, 8GB DDR4, SSD 240GB",
    "url_Image": "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/t/e/templar_intel_1650_560_1__1_7.jpg",
    "price": 24.30
  },
  {
    "active": true,
    "name": "COMPUTADOR ALVES GAMER, INTEL I7-10700KF, GEFORCE RTX 3070 TI 8GB, 16GB DDR4, SSD 960GB",
    "url_Image": "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/s/e/seraph-e-rgb-water-rtx-006_16.jpg",
    "price": 50.30
  },
  {
    "active": true,
    "name": "HEADSET GAMER REDRAGON MENTO, RGB, DRIVERS 50MM, ROSA, H270-P",
    "url_Image": "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/h/2/h270-p7.jpg",
    "price": 9.30
  },
  {
    "active": true,
    "name": "MOUSE GAMER COUGAR AIRBLADER, 16000DPI, 6 BOTOES, PRETO, CGR-WONB-410M",
    "url_Image": "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/c/g/cgr-wonb-410m8.jpg",
    "price": 9.30
  },
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};
