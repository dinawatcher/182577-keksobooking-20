'use strict';

(function () {
  var TIMEOUT_MS = 10000;
  var STATUS = 200;
  var Url = {
    GET: 'https://javascript.pages.academy/keksobooking/data',
    POST: 'https://javascript.pages.academy/keksobooking',
  };

  var makeRequest = function (method, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_MS;
    xhr.open(method, url);
    xhr.send(data);
  };

  var load = function (onSuccess, onError) {
    makeRequest('GET', Url.GET, onSuccess, onError);
  };

  var send = function (data, onSuccess, onError) {
    makeRequest('POST', Url.POST, onSuccess, onError, data);
  };

  window.api = {
    load: load,
    send: send,
  };
})();
