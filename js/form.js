'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var adFormSelects = adForm.querySelectorAll('select');
  var rooms = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var address = adForm.querySelector('#address');
  var filterForm = document.querySelector('.map__filters');
  var filterFormSelects = filterForm.querySelectorAll('select');

  var activateInputs = function (arr) {
    adForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = false;
    }
  };

  var capacityValidity = function () {
    if (rooms.value === '100' && capacity.value !== 0) {
      rooms.setCustomValidity('Не для гостей');
    } else if (rooms.value === '1' && capacity.value > rooms.value) {
      rooms.setCustomValidity('Для одного гостя');
    } else if (rooms.value === '2' && capacity.value > rooms.value) {
      rooms.setCustomValidity('Для двух гостя');
    } else if (rooms.value === '1' && capacity.value > rooms.value) {
      rooms.setCustomValidity('Для трех гостя');
    } else {
      rooms.setCustomValidity('');
    }
  };

  rooms.addEventListener('change', capacityValidity);

  window.form = {
    formFieldsets: formFieldsets,
    filterFormSelects: filterFormSelects,
    adFormSelects: adFormSelects,
    address: address,
    activateInputs: activateInputs,
  };

})();
