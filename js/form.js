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

  var typesValidity = function (type, price) {
    switch (type.value) {
      case 'bungalo':
        price.setAttribute('min', 0);
        price.placeholder = '0';
        break;

      case 'flat' :
        price.setAttribute('min', 1000);
        price.placeholder = '1000';
        break;

      case 'house':
        price.setAttribute('min', 5000);
        price.placeholder = '5000';
        break;

      case 'palace':
        price.setAttribute('min', 10000);
        price.placeholder = '10000';
        break;
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
  types.addEventListener('change', function () {
    typesValidity(types, prices);
  });
  rooms.addEventListener('change', capacityValidity);

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.api.send('https://javascript.pages.academy/keksobooking', new FormData(adForm), window.popup.success, window.popup.error);
  });

  window.form = {
    form: adForm,
    formFieldsets: formFieldsets,
    filterFormSelects: filterFormSelects,
    adFormSelects: adFormSelects,
    address: address,
    activateInputs: activateInputs,
  };

})();
