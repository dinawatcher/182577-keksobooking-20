'use strict';

(function () {
  var PIN_MAIN_SIZE = 65;
  var PIN_MAIN_POINTER = 22;

  var hotelMap = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var pinMainLocationX = Math.round(parseInt(mapPinMain.style.left, 10) + PIN_MAIN_SIZE / 2);
  var pinMainLocationY = Math.round(parseInt(mapPinMain.style.top, 10) + PIN_MAIN_SIZE / 2);
  var pinMainLocationYActive = Math.round(parseInt(mapPinMain.style.top, 10)) + PIN_MAIN_SIZE + PIN_MAIN_POINTER;

  var disableInputs = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = true;
    }
  };

  var disabledOnLoad = function () {
    [window.form.formFieldsets, window.form.adFormSelects, window.form.filterFormSelects].forEach(function (inputs) {
      disableInputs(inputs);
    });
    window.form.address.value = pinMainLocationX + ',' + ' ' + pinMainLocationY;
  };

  var getData = function () {
    var urlLoad = 'https://javascript.pages.academy/keksobooking/data';

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

    window.backend.load(urlLoad, onSuccessLoad, onErrorLoad);
  };

  var activatePage = function () {
    hotelMap.classList.remove('map--faded');
    window.form.activateInputs(window.form.formFieldsets);
    window.form.activateInputs(window.form.adFormSelects);
    window.form.activateInputs(window.form.filterFormSelects);
    window.form.address.value = pinMainLocationX + ', ' + pinMainLocationYActive;

    mapPinMain.removeEventListener('mousedown', onPinMainAction);
    mapPinMain.removeEventListener('keydown', onPinMainAction);
  };

  var onPinMainAction = function (evt) {
    if (evt.button === 0 || evt.code === 'Enter') {
      getData();
    }
  };

  mapPinMain.addEventListener('mousedown', onPinMainAction);
  mapPinMain.addEventListener('keydown', onPinMainAction);

  window.map = {
    hotelMap: hotelMap,
    mapPinMain: mapPinMain,
    pinSize: PIN_MAIN_SIZE,
    pinPointer: PIN_MAIN_POINTER,
  };
})();
