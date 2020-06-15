'use strict';

var ADS_COUNT = 8;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var MIN_PRICE = 10000;
var MAX_PRICE = 50000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 3;
var MIN_GUESTS = 0;
var MAX_GUESTS = 2;
var HOTEL_TYPES = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = {
  'wifi': 'Wi-Fi',
  'dishwasher': 'Посудомоечная машина',
  'parking': 'Парковка',
  'washer': 'Стиральная машина',
  'elevator': 'Лифт',
  'conditioner': 'Кондиционер'};
var HOTEL_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var hotelMap = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

// случайное число
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// случайный массив
var getRandomArray = function (arr) {
  var randomArray = [];
  for (var i = 0; i < getRandomNumber(1, arr.length - 1); i++) {
    randomArray[i] = arr[getRandomNumber(0, arr.length - 1)];
  }

  return randomArray;
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
        'type': Object.keys(HOTEL_TYPES)[getRandomNumber(0, Object.keys(HOTEL_TYPES).length - 1)],
        'rooms': getRandomNumber(MIN_ROOMS, MAX_ROOMS),
        'guests': getRandomNumber(MIN_GUESTS, MAX_GUESTS),
        'checkin': CHECK_TIME[getRandomNumber(0, CHECK_TIME.length - 1)],
        'checkout': CHECK_TIME[getRandomNumber(0, CHECK_TIME.length - 1)],
        'features': getRandomArray(Object.keys(FEATURES)),
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

var ad = createAds(1);

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

var prepareMap = function () {
  hotelMap.classList.remove('map--faded');
};

var pins = createAds(ADS_COUNT);
renderPins(pins);
prepareMap();


// отрисовка фотографий для карточки
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

// отрисовка преимуществ для карточки
var renderFeatures = function (container, features) {
  container.innerHTML = '';

  for (var i = 0; i < features.length; i++) {
    var li = document.createElement('li');

    li.textContent = features[i];
    li.className = 'popup__feature popup__feature--' + Object.keys(features);
    container.appendChild(li);
  }
};

var createCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);
  var photosBlock = cardElement.querySelector('.popup__photos');
  var featuresBlock = cardElement.querySelector('.popup-features');

  var getRooms = function () {
    if (card[0].offer.rooms === 1) {
      return card[0].offer.rooms + ' комната для ';
    } else if (card[0].offer.rooms > 1 && card[0].offer.rooms < 5) {
      return card[0].offer.rooms + ' комнаты для ';
    } else {
      return card[0].offer.rooms + ' комнат для ';
    }
  };

  var getGuests = function () {
    if (card[0].offer.guests === 1) {
      return card[0].offer.guests + ' гостя';
    } else {
      return card[0].offer.guests + ' гостей';
    }
  };

  cardElement.querySelector('.popup__title').textContent = card[0].offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card[0].offer.address;
  cardElement.querySelector('.popup__text--price').innerHTML = card[0].offer.price + '&#x20bd;<span>/ночь</span>';
  cardElement.querySelector('.popup__type').textContent = card[0].offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = getRooms(card[0]) + getGuests(card[0]);
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card[0].offer.checkin + ', выезд до ' + card[0].offer.checkout;
  cardElement.querySelector('.popup__description').textContent = card[0].offer.description;
  cardElement.querySelector('.popup__avatar').src = card[0].author.avatar;

  renderPhotos(photosBlock, card[0].offer.photos);
  // renderFeatures(featuresBlock, card[0].offer.features);

  return cardElement;
};

var mapFilters = document.querySelector('.map__filters-container');
hotelMap.insertBefore(createCard(ad), mapFilters);
