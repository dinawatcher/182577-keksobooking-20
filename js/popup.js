'use strict';

(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var onSuccess = function () {
    var fragment = document.createDocumentFragment();
    var successMessage = successTemplate.cloneNode(true);

    fragment.appendChild(successMessage);
    main.appendChild(fragment);

    window.map.disabled();

    document.addEventListener('keydown', removeSuccessPopup);
    document.addEventListener('click', removeSuccessPopup);
  };

  var removeSuccessPopup = function (evt) {
    var success = document.querySelector('.success');

    if (evt.key === 'Escape' || evt.button === 0) {
      success.remove();
    }
    document.removeEventListener('click', removeSuccessPopup);
    document.removeEventListener('keydown', removeSuccessPopup);
  };

  var onError = function () {
    var fragment = document.createDocumentFragment();
    var errorMessage = errorTemplate.cloneNode(true);

    fragment.appendChild(errorMessage);
    main.appendChild(fragment);

    document.addEventListener('keydown', removeErrorPopup);
    document.addEventListener('click', removeErrorPopup);
  };

  var removeErrorPopup = function (evt) {
    var error = document.querySelector('.error');

    if (evt.key === 'Escape' || evt.button === 0) {
      error.remove();
    }
  };

  window.popup = {
    success: onSuccess,
    error: onError,
  };
})();
