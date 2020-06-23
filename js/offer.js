'use strict';

(function () {
  var MAX_X = 1200;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 3;
  var MIN_GUESTS = 0;
  var MAX_GUESTS = 2;
  var HOTEL_TYPES = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
  };
  var CHECK_TIME = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var HOTEL_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var createAds = function (num) {
    var ads = [];

    for (var i = 0; i < num; i++) {
      var locationX = window.randomize.getRandomNumber(0, MAX_X);
      var locationY = window.randomize.getRandomNumber(MIN_Y, MAX_Y);

      ads[i] = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png',
        },
        'offer': {
          'title': 'Заголовок объявления',
          'address': locationX + ', ' + locationY,
          'price': window.randomize.getRandomNumber(MIN_PRICE, MAX_PRICE),
          'type': window.randomize.getTypes(HOTEL_TYPES),
          'rooms': window.randomize.getRandomNumber(MIN_ROOMS, MAX_ROOMS),
          'guests': window.randomize.getRandomNumber(MIN_GUESTS, MAX_GUESTS),
          'checkin': CHECK_TIME[window.randomize.getRandomNumber(0, CHECK_TIME.length - 1)],
          'checkout': CHECK_TIME[window.randomize.getRandomNumber(0, CHECK_TIME.length - 1)],
          'features': window.randomize.getFeatures(FEATURES),
          'description': 'Описание (не обязательно)',
          'photos': window.randomize.getRandomArray(HOTEL_PHOTOS),
        },
        'location': {
          x: locationX,
          y: locationY,
        }
      };
    }
    return ads;
  };
  window.offer = {
    createAds: createAds,
    hotels: HOTEL_TYPES,
  };
})();

