// временно, если останется время, сделаю отображение рандомных 5 объявлений, а не первых 5

'use strict';

(function () {
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomArray = function (array) {
    var unfilteredArray = [];

    for (var i = 0; i < getRandomNumber(1, array.length - 1); i++) {
      var arrayItem = array[getRandomNumber(0, array.length - 1)];
      unfilteredArray.push(arrayItem);
    }

    var randomArray = unfilteredArray.filter(function (item, position) {
      return unfilteredArray.indexOf(item) === position;
    });

    return randomArray;
  };

  var getTypes = function (array) {
    var typeItem = Object.keys(array)[getRandomNumber(0, Object.keys(array).length - 1)];

    return typeItem;
  };

  var getFeatures = function (array) {
    var featuresArray = getRandomArray(array);

    return featuresArray;
  };

  window.randomize = {
    getRandomNumber: getRandomNumber,
    getRandomArray: getRandomArray,
    getFeatures: getFeatures,
    getTypes: getTypes,
  };
})();
