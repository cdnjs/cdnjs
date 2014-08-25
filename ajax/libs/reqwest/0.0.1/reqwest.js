/*!
  * Boom. Ajax! Ever heard of it!?
  * copyright 2011 @dedfat
  * https://github.com/ded/reqwest
  * license MIT
  */
!function (context) {
  var twoHundo = /^20\d$/,
      xhr = ('XMLHttpRequest' in window) ?
        function () {
          return new XMLHttpRequest();
        } :
        function () {
          return new ActiveXObject('Microsoft.XMLHTTP');
        };

  function readyState(o, fn) {
    return function () {
      if (o && o.readyState == 4) {
        if (twoHundo.test(o.status)) {
          fn && typeof fn == 'function' ? fn(o) : fn.success(o);
        } else {
          fn && fn.error && fn.error(o);
        }
        fn && fn.complete && fn.complete(o);
      }
    };
  }

  function getRequest(o, fn) {
    var http = xhr();
    http.open(o.method || 'GET', typeof o == 'string' ? o : o.url, true);
    http.onreadystatechange = readyState(http, fn || o);
    http.send(o.data || null);
    return http;
  }

  // would be cool if there was some fancy class system out there...
  function Reqwest(o, fn) {
    var type = o.type || 'js';
    function success(resp) {
      var r = resp.responseText,
          val = /json$/i.test(type) ? JSON.parse(r) : r;
      /^js$/i.test(type) && eval(r);
      fn && typeof fn == 'function' ? fn(o) : o.success(val);
    }
    this.request = getRequest(o, success);
    this.retries = o.retries || 0;
  }

  Reqwest.prototype = {
    abort: function () {
      this.request.abort();
    },

    retry: function () {
      this.request.send(this.o.data || null);
    }
  };

  function reqwest(o, fn) {
    return new Reqwest(o, fn);
  }

  var oldJax = context.reqwest;
  reqwest.noConflict = function () {
    context.reqwest = oldJax;
    return this;
  };
  context.reqwest = reqwest;

}(this);