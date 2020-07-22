'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFilters = document.querySelector('.map__filters-container');
  var cardElement = null;


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

  var createCard = function (ad) {
    popupRemove();

    cardElement = cardTemplate.cloneNode(true);
    var photosBlock = cardElement.querySelector('.popup__photos');
    var featuresBlock = cardElement.querySelector('.popup__features');

    var getRooms = function () {
      if (ad.offer.rooms === 1) {
        return ad.offer.rooms + ' комната для ';
      } else if (ad.offer.rooms > 1 && ad.offer.rooms < 5) {
        return ad.offer.rooms + ' комнаты для ';
      } else {
        return ad.offer.rooms + ' комнат для ';
      }
    };

    var getGuests = function () {
      if (ad.offer.guests === 0) {
        return cardElement.querySelector('.popup__text--capacity').classList.add('hidden');
      } else if (ad.offer.guests === 1) {
        return ad.offer.guests + ' гостя';
      } else {
        return ad.offer.guests + ' гостей';
      }
    };

    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = ad.offer.price + '&#x20bd;<span>/ночь</span>';
    cardElement.querySelector('.popup__type').textContent = window.offer.hotels[ad.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = getRooms(ad) + getGuests(ad);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;
    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

    if (ad.offer.features.length >= 1) {
      renderFeatures(featuresBlock, ad.offer.features);
    } else if (ad.offer.features.length === 0) {
      cardElement.querySelector('.popup__features').remove();
    }

    if (ad.offer.photos.length >= 1) {
      renderPhotos(photosBlock, ad.offer.photos);
    } else if (ad.offer.photos.length === 0) {
      cardElement.querySelector('.popup__photos').remove();
    }

    mapFilters.insertAdjacentElement('beforebegin', cardElement);

    var popupCloseBtn = cardElement.querySelector('.popup__close');
    popupCloseBtn.addEventListener('click', popupRemove);

    document.addEventListener('keydown', onPopupPress);

    return cardElement;
  };

  var onPopupPress = function (evt) {
    if (evt.key === 'Escape' && cardElement !== null) {
      popupRemove();
    }
  };

  var popupRemove = function () {
    if (cardElement !== null) {
      cardElement.remove();
      document.removeEventListener('keydown', onPopupPress);
    }
  };

  window.card = {
    createCard: createCard,
    card: cardElement,
    popupRemove: popupRemove,
  };
})();
