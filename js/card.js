'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var renderPhotos = function (container, photos) {
    container.innerHTML = '';

    for (var i = 0; i < photos.length; i++) {
      var img = document.createElement('img');

      img.src = photos[i];
      img.className = 'popup__photo';
      img.width = 45;
      img.height = 40;
      img.alt = 'Фотография жилья';
      container.appendChild(img);
    }
  };

  var renderFeatures = function (container, features) {
    container.innerHTML = '';
    for (var i = 0; i < features.length; i++) {
      var li = document.createElement('li');

      li.textContent = features[i];
      li.className = 'popup__feature popup__feature--' + features[i];
      container.appendChild(li);
    }
  };

  var createCard = function (items) {
    var cardElement = cardTemplate.cloneNode(true);
    var photosBlock = cardElement.querySelector('.popup__photos');
    var featuresBlock = cardElement.querySelector('.popup__features');

    var card = items[0];

    var getRooms = function () {
      if (card.offer.rooms === 1) {
        return card.offer.rooms + ' комната для ';
      } else if (card.offer.rooms > 1 && card.offer.rooms < 5) {
        return card.offer.rooms + ' комнаты для ';
      } else {
        return card.offer.rooms + ' комнат для ';
      }
    };

    var getGuests = function () {
      if (card.offer.guests === 0) {
        return cardElement.querySelector('.popup__text--capacity').classList.add('hidden');
      } else if (card.offer.guests === 1) {
        return card.offer.guests + ' гостя';
      } else {
        return card.offer.guests + ' гостей';
      }
    };

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = card.offer.price + '&#x20bd;<span>/ночь</span>';
    cardElement.querySelector('.popup__type').textContent = window.offer.hotels[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = getRooms(card) + getGuests(card);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    renderPhotos(photosBlock, card.offer.photos);
    renderFeatures(featuresBlock, card.offer.features);

    return cardElement;
  };

  window.card = {
    createCard: createCard,
  };
})();
