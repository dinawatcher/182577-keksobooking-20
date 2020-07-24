'use strict';

(function () {
  window.map.pinMain.addEventListener('mousedown', function (evt) {
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

      var currentX = window.map.pinMain.offsetLeft - shift.x;
      var currentY = window.map.pinMain.offsetTop - shift.y;

      if (currentY <= window.const.Map.MIN_Y) {
        currentY = window.const.Map.MIN_Y;
      } else if (currentY >= window.const.Map.MAX_Y) {
        currentY = window.const.Map.MAX_Y;
      }

      if (currentX <= 0 - window.map.pinSize / 2) {
        currentX = 0 - window.map.pinSize / 2;
      } else if (currentX >= window.const.Map.MAX_X - window.map.pinSize / 2) {
        currentX = window.const.Map.MAX_X - window.map.pinSize / 2;
      }

      window.map.pinMain.style.left = currentX + 'px';
      window.map.pinMain.style.top = currentY + 'px';
      window.form.address.value = Math.floor((currentX + window.map.pinSize / 2)) + ', ' + Math.floor(currentY);


    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          window.map.pinMain.removeEventListener('click', onClickPreventDefault);
        };
        window.map.pinMain.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
