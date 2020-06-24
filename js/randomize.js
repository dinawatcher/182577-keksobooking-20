'use strict';

(function () {
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

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

  var getTypes = function (arr) {
    var typeItem = Object.keys(arr)[getRandomNumber(0, Object.keys(arr).length - 1)];

    return typeItem;
  };

  var getFeatures = function (arr) {
    var featuresArray = getRandomArray(arr);

    return featuresArray;
  };

  window.randomize = {
    getRandomNumber: getRandomNumber,
    getRandomArray: getRandomArray,
    getFeatures: getFeatures,
    getTypes: getTypes,
  };
})();
