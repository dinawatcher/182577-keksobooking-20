'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var adFormSelects = adForm.querySelectorAll('select');
  var types = adForm.querySelector('#type');
  var prices = adForm.querySelector('#price');
  var checkin = adForm.querySelector('#timein');
  var checkout = adForm.querySelector('#timeout');
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

  var typesValidity = function () {
    if (types.value === 'bungalo') {
      prices.setAttribute('min', 0);
      prices.placeholder = '0';
    } else if (types.value === 'flat') {
      prices.setAttribute('min', 1000);
      prices.placeholder = '1000';
    } else if (types.value === 'house') {
      prices.setAttribute('min', 5000);
      prices.placeholder = '5000';
    } else if (types.value === 'palace') {
      prices.setAttribute('min', 10000);
      prices.placeholder = '10000';
    }
  };

  var timeInValidity = function () {
    checkout.value = checkin.value;
  };

  var timeOutValidity = function () {
    checkin.value = checkout.value;
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

  checkin.addEventListener('change', timeInValidity);
  checkout.addEventListener('change', timeOutValidity);
  types.addEventListener('change', typesValidity);
  rooms.addEventListener('change', capacityValidity);

  window.form = {
    formFieldsets: formFieldsets,
    filterFormSelects: filterFormSelects,
    adFormSelects: adFormSelects,
    address: address,
    activateInputs: activateInputs,
  };

})();
