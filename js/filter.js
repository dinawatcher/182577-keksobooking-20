'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var housingType = filterForm.querySelector('#housing-type');
  var filteredAds = [];

  var filterByType = function () {
    var typeValue = housingType.value;
    filteredAds = window.offer.ads.filter(function (item) {
      if (typeValue === 'any') {
        return window.offer.ads;
      } else {
        return item.offer.type === typeValue;
      }
    });
    window.card.popupRemove();
    window.map.pinRemove();
    window.pin.renderPins(filteredAds);
  };

  housingType.addEventListener('change', filterByType);

  window.filter = {
    filterForm: filterForm,
    filterByType: filterByType,
  };
})();
