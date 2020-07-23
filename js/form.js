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

  var activateInputs = function (inputs) {
    adForm.classList.remove('ad-form--disabled');

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].disabled = false;
      inputs[i].style.cursor = 'pointer';
    }
  };

  var setTypesValidity = function (type, price) {
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

  var setTimeInValidity = function () {
    checkout.value = checkin.value;
  };

  var setTimeOutValidity = function () {
    checkin.value = checkout.value;
  };

  var setCapacityValidity = function () {
    if (rooms.value < capacity.value) {
      capacity.setCustomValidity('Выберите меньшее количество гостей или увеличьте количество комнат');
    } else if (rooms.value === '100' && capacity.value !== '0' || rooms.value === '100' || capacity.value === '0') {
      capacity.setCustomValidity('Комната не для гостей');
    } else if (rooms.value !== '100' && capacity.value === '0') {
      capacity.setCustomValidity('Выберите большее количество комнат');
    } else {
      capacity.setCustomValidity('');
    }
  };

  rooms.addEventListener('change', setCapacityValidity);
  capacity.addEventListener('change', setCapacityValidity);
  checkin.addEventListener('change', setTimeInValidity);
  checkout.addEventListener('change', setTimeOutValidity);
  types.addEventListener('change', function () {
    setTypesValidity(types, prices);
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.api.send(new FormData(adForm), window.popup.success, window.popup.error);
  });

  window.form = {
    form: adForm,
    formFieldsets: formFieldsets,
    adFormSelects: adFormSelects,
    address: address,
    activateInputs: activateInputs,
  };

})();
