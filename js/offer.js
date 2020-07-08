'use strict';

(function () {
  var MAX_X = document.querySelector('.map__pins').clientWidth;
  var MIN_Y = 130;
  var MAX_Y = 630;
  // var MIN_PRICE = 10000;
  // var MAX_PRICE = 50000;
  // var MIN_ROOMS = 1;
  // var MAX_ROOMS = 3;
  // var MIN_GUESTS = 0;
  // var MAX_GUESTS = 2;
  var HOTEL_TYPES = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
  };
  // var CHECK_TIME = ['12:00', '13:00', '14:00'];
  // var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  // var HOTEL_PHOTOS = [
  //   'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  // ];

  var ads = [];

  var getAds = function (data) {
    ads.push(data);
  };


  window.offer = {
    ads: ads,
    getAds: getAds,
    hotels: HOTEL_TYPES,
    maxX: MAX_X,
    minY: MIN_Y,
    maxY: MAX_Y,
  };
})();

