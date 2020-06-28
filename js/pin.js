'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (item) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinImg = pinElement.querySelector('img');

    pinImg.setAttribute('src', item.author.avatar);
    pinImg.setAttribute('alt', item.offer.title);

    pinElement.style.left = item.location.x - (pinImg.width / 2) + 'px';
    pinElement.style.top = item.location.y - pinImg.height + 'px';

    pinElement.addEventListener('keydown',function (evt) {
      if (evt.code === 'Enter') {
        window.card.createCard;
      }
    });

    return pinElement;
  };

  var renderPins = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      var ad = window.offer.ads[i];
      var pin = renderPin(ad);
      fragment.appendChild(pin);
      addPinHandlers(pin, ad);
    }
    mapPins.appendChild(fragment);
  };

  var addPinHandlers = function (pin, ad) {
    pin.addEventListener('click', function () {
      window.card.createCard(ad);
    });
  };

  window.pin = {
    renderPins: renderPins,
  };
})();
