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
var HOTEL_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var HOTEL_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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
        'type': HOTEL_TYPES[getRandomNumber(0, HOTEL_TYPES.length - 1)],
        'rooms': getRandomNumber(MIN_ROOMS, MAX_ROOMS),
        'guest': getRandomNumber(MIN_GUESTS, MAX_GUESTS),
        'checkin': CHECK_TIME[getRandomNumber(0, CHECK_TIME.length - 1)],
        'checkout': CHECK_TIME[getRandomNumber(0, CHECK_TIME.length - 1)],
        'features': getRandomArray(FEATURES),
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

var prepareMap = function () {
  var hotelMap = document.querySelector('.map');
  hotelMap.classList.remove('map--faded');
};

var pins = createAds(ADS_COUNT);
renderPins(pins);
prepareMap();

