'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var housingType = filterForm.querySelector('#housing-type');
  var housingPrice = filterForm.querySelector('#housing-price');
  var housingRooms = filterForm.querySelector('#housing-rooms');
  var housingGuests = filterForm.querySelector('#housing-guests');
  var housingFeatures = filterForm.querySelector('#housing-features');
  var prices = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
  };
  var values = {
    MIDDLE: 10000,
    HIGH: 50000,
  };

  var filterByType = function (item) {
    // var filteredAds;
    var typeValue = housingType.value;
    if (typeValue !== 'any') {
      return item.offer.type === typeValue;
    } else {
      return window.offer.ads;
    }
  };

  var filterByPrice = function (item) {
    // var filteredAds;
    var priceValue = housingPrice.value;
    switch (priceValue) {
      case 'low':
        return item.offer.price < 10000;
      case 'middle':
        return (item.offer.price > 10000 && item.offer.price < 50000);
      case 'high':
        return item.offer.price > 50000;
      default:
        return window.offer.ads;
    }
  };

  var filterByRooms = function (item) {
    // var filteredAds;
    var roomsValue = housingRooms.value;
    if (roomsValue !== 'any') {
      return item.offer.rooms === Number(roomsValue);
    } else {
      return window.offer.ads;
    }
  };

  var filterByGuests = function (item) {
    // var filteredAds;
    var guestsValue = housingGuests.value;
    if (guestsValue !== 'any') {
      return item.offer.guests === Number(guestsValue);
    } else {
      return window.offer.ads;
    }
  };

  var filterByFeatures = function (item) {
    // var filteredAds;
    var checkedFeatures = housingFeatures.querySelectorAll('input[name="features"]:checked');
    return Array.from(checkedFeatures).every(function (checkedFeature) {
      return item.offer.features.includes(checkedFeature.value);
    });
  };

  var setAds = function () {
    var filteredAds = [];

    window.offer.ads.forEach(function (item) {
      if (filterByType(item) && filterByPrice(item) && filterByRooms(item) && filterByGuests(item) && filterByFeatures(item)) {
        filteredAds.push(item);
      }
    });
    window.card.popupRemove();
    window.map.pinRemove();
    window.pin.renderPins(filteredAds);
  };
  // housingType.addEventListener('change', filterByType);
  // housingPrice.addEventListener('change', filterByPrice);
  // housingRooms.addEventListener('change', filterByRooms);
  // housingGuests.addEventListener('change', filterByGuests);
  // housingFeatures.addEventListener('change', filterByFeatures);
  filterForm.addEventListener('change', setAds);

  window.filter = {
    filterForm: filterForm,
    filterByType: filterByType,
    filterByPrice: filterByPrice,
    filterByRooms: filterByRooms,
    filterByGuests: filterByGuests,
    filterByFeatures: filterByFeatures,
  };
})();
