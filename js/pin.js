'use strict';

(function () {
  var PINS = 5;

  var mapPins = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (item) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinImg = pinElement.querySelector('img');

    pinImg.setAttribute('src', item.author.avatar);
    pinImg.setAttribute('alt', item.offer.title);

    pinElement.style.left = item.location.x - (pinImg.width / 2) + 'px';
    pinElement.style.top = item.location.y - pinImg.height + 'px';

    return pinElement;
  };

  var renderPins = function (ads) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      if (i >= PINS) {
        break;
      }

      var pin = renderPin(ads[i]);
      fragment.appendChild(pin);
      onPinAction(pin, ads[i]);
    }
    mapPins.appendChild(fragment);
  };

  var onPinAction = function (pin, ad) {
    pin.addEventListener('click', function () {
      window.card.create(ad);
    });
  };

  window.pin = {
    mapPins: mapPins,
    render: renderPins,
  };
})();
