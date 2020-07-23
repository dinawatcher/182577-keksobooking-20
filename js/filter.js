'use strict';

(function () {
  var FILTER_DEFAULT_VALUE = 'any';
  var filterForm = document.querySelector('.map__filters');
  var filterFormSelects = filterForm.querySelectorAll('select');
  var filterFormFeatures = filterForm.querySelectorAll('#housing-features');
  var housingType = filterForm.querySelector('#housing-type');
  var housingPrice = filterForm.querySelector('#housing-price');
  var housingRooms = filterForm.querySelector('#housing-rooms');
  var housingGuests = filterForm.querySelector('#housing-guests');
  var housingFeatures = filterForm.querySelector('#housing-features');
  var debounce = window.debounce;

  var disableFilters = function () {
    filterForm.reset();
    window.util.disableInputs(filterFormSelects);
    window.util.disableInputs(filterFormFeatures);
  };

  disableFilters();

  var activateFilters = function () {
    window.util.activateInputs(filterFormSelects);
    window.util.activateInputs(filterFormFeatures);
  };

  var filterByType = function (item) {
    var typeValue = housingType.value;

    if (typeValue !== FILTER_DEFAULT_VALUE) {
      return item.offer.type === typeValue;
    }

    return window.offer.ads;
  };

  var filterByPrice = function (item) {
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
    var roomsValue = housingRooms.value;

    if (roomsValue !== FILTER_DEFAULT_VALUE) {
      return item.offer.rooms === Number(roomsValue);
    }

    return window.offer.ads;
  };

  var filterByGuests = function (item) {
    var guestsValue = housingGuests.value;

    if (guestsValue !== FILTER_DEFAULT_VALUE) {
      return item.offer.guests === Number(guestsValue);
    }

    return window.offer.ads;
  };

  var filterByFeatures = function (item) {
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
    window.pin.render(filteredAds);
  };

  var onFilterChange = debounce(function () {
    setAds();
  });

  filterForm.addEventListener('change', onFilterChange);

  window.filter = {
    disable: disableFilters,
    activate: activateFilters,
  };
})();
