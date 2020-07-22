'use strict';

(function () {
  var MainPinSettings = {
    PIN_MAIN_SIZE: 65,
    PIN_MAIN_POINTER: 22,
    PIN_MAIN_DEFAULT_X: 570,
    PIN_MAIN_DEFAULT_Y: 375,
  };

  var hotelMap = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var pinMainLocationX = Math.round(parseInt(mapPinMain.style.left, 10) + MainPinSettings.PIN_MAIN_SIZE / 2);
  var pinMainLocationY = Math.round(parseInt(mapPinMain.style.top, 10) + MainPinSettings.PIN_MAIN_SIZE / 2);
  var pinMainLocationYActive = Math.round(parseInt(mapPinMain.style.top, 10)) + MainPinSettings.PIN_MAIN_SIZE + MainPinSettings.PIN_MAIN_POINTER;

  var filterForm = document.querySelector('.map__filters');
  var filterFormSelects = filterForm.querySelectorAll('select');
  var filterFormFeatures = filterForm.querySelectorAll('#housing-features');

  var disableInputs = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i].disabled = true;
      array[i].style.cursor = 'default';
    }
  };

  var pinRemove = function () {
    window.pin.mapPins.querySelectorAll('.map__pin').forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });
  };

  var disabledOnLoad = function () {
    window.form.form.reset();
    filterForm.reset();
    [window.form.formFieldsets, window.form.adFormSelects, filterFormSelects, filterFormFeatures].forEach(function (inputs) {
      disableInputs(inputs);
    });

    hotelMap.classList.add('map--faded');
    window.form.form.classList.add('ad-form--disabled');
    pinRemove();
    if (hotelMap.querySelector('map__card')) {
      hotelMap.querySelector('.map__card').remove();
    }
    mapPinMain.style.left = MainPinSettings.PIN_MAIN_DEFAULT_X + 'px';
    mapPinMain.style.top = MainPinSettings.PIN_MAIN_DEFAULT_Y + 'px';
    window.form.address.value = pinMainLocationX + ',' + ' ' + pinMainLocationY;

    mapPinMain.addEventListener('mousedown', onPinMainAction);
    mapPinMain.addEventListener('keydown', onPinMainAction);
  };

  var getData = function () {
    var onSuccessLoad = function (data) {
      for (var i = 0; i < data.length; i++) {
        window.offer.getAds(data[i]);
      }
      window.pin.renderPins(data);
      activatePage();
    };
    var onErrorLoad = function () {
      disabledOnLoad();
    };

    window.api.load(onSuccessLoad, onErrorLoad);
  };


  var activatePage = function () {
    hotelMap.classList.remove('map--faded');
    window.form.activateInputs(window.form.formFieldsets);
    window.form.activateInputs(window.form.adFormSelects);
    window.form.activateInputs(filterFormSelects);
    window.form.address.value = pinMainLocationX + ', ' + pinMainLocationYActive;
  };

  var onPinMainAction = function (evt) {
    if (evt.button === 0 || evt.code === 'Enter') {
      getData();
    }
    mapPinMain.removeEventListener('mousedown', onPinMainAction);
    mapPinMain.removeEventListener('keydown', onPinMainAction);
  };

  mapPinMain.addEventListener('mousedown', onPinMainAction);
  mapPinMain.addEventListener('keydown', onPinMainAction);

  window.map = {
    disabled: disabledOnLoad,
    mapPinMain: mapPinMain,
    pinSize: MainPinSettings.PIN_MAIN_SIZE,
    pinRemove: pinRemove,
  };
})();
