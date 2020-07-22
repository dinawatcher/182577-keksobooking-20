'use strict';

(function () {
  var MAX_X = document.querySelector('.map').clientWidth;
  var MIN_Y = 130;
  var MAX_Y = 630;

  var hotelTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
  };

  var ads = [];

  var getAds = function (data) {
    ads.push(data);
  };

  window.offer = {
    hotels: hotelTypes,
    maxX: MAX_X,
    minY: MIN_Y,
    maxY: MAX_Y,
    ads: ads,
    getAds: getAds,
  };
})();
