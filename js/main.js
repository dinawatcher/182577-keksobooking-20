'use strict';

var ADS_COUNT = 8;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var PIN_MAIN_SIZE = 65;
var PIN_MAIN_POINTER = 22;
var MIN_PRICE = 10000;
var MAX_PRICE = 50000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 3;
var MIN_GUESTS = 0;
var MAX_GUESTS = 2;
var HOTEL_TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало',
};
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var HOTEL_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var hotelMap = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPinMain = document.querySelector('.map__pin--main');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var adForm = document.querySelector('.ad-form');
var formFieldsets = adForm.querySelectorAll('fieldset');
var adFormSelects = adForm.querySelectorAll('select');
var filterForm = document.querySelector('.map__filters');
var filterFormSelects = filterForm.querySelectorAll('select');
var rooms = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');
var address = adForm.querySelector('#address');

// var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

// случайное число
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// случайный массив
var getRandomArray = function (arr) {
  var unfilteredArray = [];
  for (var i = 0; i < getRandomNumber(1, arr.length - 1); i++) {
    var arrayItem = arr[getRandomNumber(0, arr.length - 1)];
    unfilteredArray.push(arrayItem);
  }

  var randomArray = unfilteredArray.filter(function (item, pos) {
    return unfilteredArray.indexOf(item) === pos;
  });

  return randomArray;
};

var pinMainLocationX = Math.round(parseInt(mapPinMain.style.left, 10) + PIN_MAIN_SIZE / 2);
var pinMainLocationY = Math.round(parseInt(mapPinMain.style.top, 10) + PIN_MAIN_SIZE / 2);
var pinMainLocationYActive = Math.round(parseInt(mapPinMain.style.top, 10)) + PIN_MAIN_SIZE + PIN_MAIN_POINTER;

// отключение полей в форме

var disableInputs = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].disabled = true;
  }
};

// включение полей в форме
var activateInputs = function (arr) {
  adForm.classList.remove('ad-form--disabled');
  for (var i = 0; i < arr.length; i++) {
    arr[i].disabled = false;
  }
};

var disabledOnLoad = function () {
  [formFieldsets, adFormSelects, filterFormSelects].forEach(function (inputs) {
    disableInputs(inputs);
  });
  address.value = pinMainLocationX + ',' + ' ' + pinMainLocationY;
};
disabledOnLoad();

// получение случайного типа жилья
var getTypes = function (arr) {
  var typeItem = Object.keys(arr)[getRandomNumber(0, Object.keys(arr).length - 1)];

  return typeItem;
};

// получение случайных неповторяющихся удобств
var getFeatures = function (arr) {
  var featuresArray = getRandomArray(arr);

  return featuresArray;
};

// случайное объявление
var createAds = function (num) {
  var ads = [];

  for (var i = 0; i < num; i++) {
    var locationX = getRandomNumber(0, MAX_X);
    var locationY = getRandomNumber(MIN_Y, MAX_Y);

    ads[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png',
      },
      'offer': {
        'title': 'Заголовок объявления',
        'address': locationX + ', ' + locationY,
        'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
        'type': getTypes(HOTEL_TYPES),
        'rooms': getRandomNumber(MIN_ROOMS, MAX_ROOMS),
        'guests': getRandomNumber(MIN_GUESTS, MAX_GUESTS),
        'checkin': CHECK_TIME[getRandomNumber(0, CHECK_TIME.length - 1)],
        'checkout': CHECK_TIME[getRandomNumber(0, CHECK_TIME.length - 1)],
        'features': getFeatures(FEATURES),
        'description': 'Описание (не обязательно)',
        'photos': getRandomArray(HOTEL_PHOTOS),
      },
      'location': {
        x: locationX,
        y: locationY,
      }
    };
  }
  return ads;
};

// отрисовка метки
var renderPin = function (item) {
  var pinElement = mapPinTemplate.cloneNode(true);
  var pinImg = pinElement.querySelector('img');

  pinImg.setAttribute('src', item.author.avatar);
  pinImg.setAttribute('alt', item.offer.title);

  pinElement.style.left = item.location.x - (pinImg.width / 2) + 'px';
  pinElement.style.top = item.location.y - pinImg.height + 'px';

  return pinElement;
};

var renderPins = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i]));
  }
  mapPins.appendChild(fragment);
};

// активация страницы
var activatePage = function () {
  var pins = createAds(ADS_COUNT);

  hotelMap.classList.remove('map--faded');
  renderPins(pins);
  activateInputs(formFieldsets);
  activateInputs(adFormSelects);
  activateInputs(filterFormSelects);
  address.value = pinMainLocationX + ', ' + pinMainLocationYActive;

  mapPinMain.removeEventListener('mousedown', onPinMainAction);
  mapPinMain.removeEventListener('keydown', onPinMainAction);
};

var onPinMainAction = function (evt) {
  if (evt.button === 0 || evt.code === 'Enter') {
    activatePage();
  }
};

mapPinMain.addEventListener('mousedown', onPinMainAction);
mapPinMain.addEventListener('keydown', onPinMainAction);

// отрисовка фотографий для карточки
// var renderPhotos = function (container, photos) {
//   container.innerHTML = '';

//   for (var i = 0; i < photos.length; i++) {
//     var img = document.createElement('img');

//     img.src = photos[i];
//     img.className = 'popup__photo';
//     img.width = 45;
//     img.height = 40;
//     img.alt = 'Фотография жилья';
//     container.appendChild(img);
//   }
// };

// // отрисовка преимуществ для карточки
// var renderFeatures = function (container, features) {
//   container.innerHTML = '';
//   for (var i = 0; i < features.length; i++) {
//     var li = document.createElement('li');

//     li.textContent = features[i];
//     li.className = 'popup__feature popup__feature--' + features[i];
//     container.appendChild(li);
//   }
// };

// var createCard = function (items) {
//   var cardElement = cardTemplate.cloneNode(true);
//   var photosBlock = cardElement.querySelector('.popup__photos');
//   var featuresBlock = cardElement.querySelector('.popup__features');

//   var card = items[0];

//   var getRooms = function () {
//     if (card.offer.rooms === 1) {
//       return card.offer.rooms + ' комната для ';
//     } else if (card.offer.rooms > 1 && card.offer.rooms < 5) {
//       return card.offer.rooms + ' комнаты для ';
//     } else {
//       return card.offer.rooms + ' комнат для ';
//     }
//   };

//   var getGuests = function () {
//     if (card.offer.guests === 0) {
//       return cardElement.querySelector('.popup__text--capacity').classList.add('hidden');
//     } else if (card.offer.guests === 1) {
//       return card.offer.guests + ' гостя';
//     } else {
//       return card.offer.guests + ' гостей';
//     }
//   };

//   cardElement.querySelector('.popup__title').textContent = card.offer.title;
//   cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
//   cardElement.querySelector('.popup__text--price').innerHTML = card.offer.price + '&#x20bd;<span>/ночь</span>';
//   cardElement.querySelector('.popup__type').textContent = HOTEL_TYPES[card.offer.type];
//   cardElement.querySelector('.popup__text--capacity').textContent = getRooms(card) + getGuests(card);
//   cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
//   cardElement.querySelector('.popup__description').textContent = card.offer.description;
//   cardElement.querySelector('.popup__avatar').src = card.author.avatar;

//   renderPhotos(photosBlock, card.offer.photos);
//   renderFeatures(featuresBlock, card.offer.features);

//   return cardElement;
// };

// var mapFilters = document.querySelector('.map__filters-container');
// hotelMap.insertBefore(createCard(pins), mapFilters);

// смена цены в засивимости от типа жилья
var capacityValidity = function () {
  if (rooms.value === '100' && capacity.value !== 0) {
    rooms.setCustomValidity('Не для гостей');
  } else if (rooms.value === '1' && capacity.value > rooms.value) {
    rooms.setCustomValidity('Для одного гостя');
  } else if (rooms.value === '2' && capacity.value > rooms.value) {
    rooms.setCustomValidity('Для двух гостя');
  } else if (rooms.value === '1' && capacity.value > rooms.value) {
    rooms.setCustomValidity('Для трех гостя');
  } else {
    rooms.setCustomValidity('');
  }
};

rooms.addEventListener('change', capacityValidity);
