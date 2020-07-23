'use strict';

(function () {
  var Key = {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
  };
  var LEFT_MOUSE_BUTTON = 0;

  var MapSize = {
    MAX_X: document.querySelector('.map').clientWidth,
    MIN_Y: 130,
    MAX_Y: 630,
  };

  window.const = {
    Key: Key,
    LEFT_MOUSE_BUTTON: LEFT_MOUSE_BUTTON,
    Map: MapSize,
  };
})();
