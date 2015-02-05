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

  function readyState(o, success, error) {
    return function () {
      if (o && o.readyState == 4) {
        if (twoHundo.test(o.status)) {
          success(o);
        } else {
          error(o);
        }
      }
    };
  }

  function getRequest(o, fn, err) {
    var http = xhr();
    http.open(o.method || 'GET', typeof o == 'string' ? o : o.url, true);
    http.onreadystatechange = readyState(http, fn, err);
    http.send(o.data || null);
    return http;
  }

  function Reqwest(o, fn) {
    var type = o.type || 'js';
    fn = fn || function () {};

    function complete(resp) {
      o.complete && o.complete(resp);
    }

    function success(resp) {
      var r = resp.responseText,
          val = /json$/i.test(type) ? JSON.parse(r) : r;
      /^js$/i.test(type) && eval(r);
      fn(o);
      o.success && o.success(val);
      complete(val);
    }
    function error(resp) {
      o.error && o.error(resp);
      complete(resp);
    }
    this.request = getRequest(o, success, error);
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

  var old = context.reqwest;
  reqwest.noConflict = function () {
    context.reqwest = old;
    return this;
  };
  context.reqwest = reqwest;

}(this);