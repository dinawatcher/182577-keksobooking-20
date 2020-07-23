'use strict';

(function () {

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
    ads: ads,
    getAds: getAds,
  };
})();
