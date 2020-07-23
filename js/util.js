'use strict';

(function () {
  var disableInputs = function (inputs) {
    inputs.forEach(function (input) {
      input.disabled = true;
      input.style.cursor = 'default';
    });
  };

  var activateInputs = function (inputs) {
    inputs.forEach(function (input) {
      input.disabled = false;
      input.style.cursor = 'pointer';
    });
  };

  window.util = {
    disableInputs: disableInputs,
    activateInputs: activateInputs,
  };
})();
