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

  function setHeaders(http, options) {
    var headers = options.headers || {};
    headers.Accept = 'text/javascript, text/html, application/xml, text/xml, */*';
    headers.contentType = 'application/x-www-form-urlencoded';
    if (options.data) {
      for (var h in headers) {
        headers.hasOwnProperty(h) && http.setRequestHeader(h, headers[h], false);
      }
    }
  }

  function getRequest(o, fn, err) {
    var http = xhr();
    http.open(o.method || 'GET', typeof o == 'string' ? o : o.url, true);
    setHeaders(http, o);
    http.onreadystatechange = readyState(http, fn, err);
    o.before && o.before(http);
    http.send(o.data || null);
    return http;
  }

  function Reqwest(o, fn) {
    this.o = o;
    this.fn = fn;
    init.apply(this, arguments);
  }

  function setType(url) {
    if (/\.json$/.test(url)) {
      return 'json';
    }
    if (/\.js$/.test(url)) {
      return 'js';
    }
    if (/\.html?$/.test(url)) {
      return 'html';
    }
    if (/\.xml$/.test(url)) {
      return 'xml';
    }
    return 'js';
  }

  function init(o, fn) {
    this.url = typeof o == 'string' ? o : o.url;
    this.timeout = null;
    var type = o.type || setType(this.url), self = this;
    fn = fn || function () {};

    if (o.timeout) {
      this.timeout = setTimeout(function () {
        self.abort();
        error();
      }, o.timeout);
    }

    function complete(resp) {
      o.complete && o.complete(resp);
    }

    function success(resp) {
      o.timeout && clearTimeout(self.timeout) && (self.timeout = null);
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
      init.call(this, this.o, this.fn);
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