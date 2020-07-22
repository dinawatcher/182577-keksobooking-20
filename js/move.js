'use strict';

(function () {
  window.map.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentX = window.map.mapPinMain.offsetLeft - shift.x;
      var currentY = window.map.mapPinMain.offsetTop - shift.y;

      if (currentY <= window.offer.minY) {
        currentY = window.offer.minY;
      } else if (currentY >= window.offer.maxY) {
        currentY = window.offer.maxY;
      }

      if (currentX <= 0 - window.map.pinSize / 2) {
        currentX = 0 - window.map.pinSize / 2;
      } else if (currentX >= window.offer.maxX - window.map.pinSize / 2) {
        currentX = window.offer.maxX - window.map.pinSize / 2;
      }

      window.map.mapPinMain.style.left = currentX + 'px';
      window.map.mapPinMain.style.top = currentY + 'px';
      window.form.address.value = currentX + ', ' + currentY;


    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          window.map.mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        window.map.mapPinMain.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
