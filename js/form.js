'use strict';

(function () {
  var TypesToPrices = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };

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

  var disableForm = function () {
    adForm.reset();
    adForm.classList.add('ad-form--disabled');
    window.util.disableInputs(formFieldsets);
    window.util.disableInputs(adFormSelects);
  };

  disableForm();

  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    window.util.activateInputs(formFieldsets);
    window.util.activateInputs(adFormSelects);
  };

  var setTypesValidity = function () {
    prices.min = TypesToPrices[types.value];
    prices.placeholder = TypesToPrices[types.value];
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

  adForm.addEventListener('reset', function () {
    window.map.disabled();
  });

  window.form = {
    disable: disableForm,
    activate: activateForm,
    fieldsets: formFieldsets,
    selects: adFormSelects,
    address: address,
    // activateInputs: activateInputs,
  };

})();
