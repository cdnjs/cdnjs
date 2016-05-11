(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.domainr = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var util = require('./util');

var sequence = 0;

// Detect CORS support
var cors = false;
if ('withCredentials' in xhr()) {
  cors = true;
}

// ----------
function getJSON(url, callback) {
  if (!callback) {
    throw new Error('[domainr] Missing callback');
  }

  if (cors) {
    getCORS(url, callback);
    return;
  }

  getJSONP(url, callback);
}

// ----------
// Minimal fallback for IE
// http://toddmotto.com/writing-a-standalone-ajax-xhr-javascript-micro-library/
function xhr() {
  try {
    var XHR = window.XMLHttpRequest || window.ActiveXObject;
    return new XHR('MSXML2.XMLHTTP.3.0');
  } catch (e) {
    return {};
  }
}

// ----------
function getCORS(url, callback) {
  var x = xhr();

  x.onreadystatechange = function() {
    if (x.readyState != 4) {
      return;
    }

    if (x.status != 200) {
      util.error('Error fetching data: ' + x.responseText);
      return;
    }

    var result;
    try {
      result = JSON.parse(x.responseText);
    } catch (e) {
      util.error('Unable to parse data: ' + x.responseText + '; ' + e);
      return;
    }

    callback(result);
  };

  x.open('GET', url, true);
  x.send();
}

// ----------
function getJSONP(url, callback) {
  var script = document.createElement('script');
  script.async = true;
  var id = '_jsonp' + sequence++;

  var timeout = setTimeout(function() {
    util.error('Timeout trying to retrieve ' + url);
  }, 5000);

  window[id] = function(data) {
    clearTimeout(timeout);

    setTimeout(function() {
      var scr = document.getElementById(id);
      scr.parentNode.removeChild(scr);
      window[id] = undefined;
      try {
        delete window[id];
      } catch (e) {}
    }, 0);

    callback(data);
  };

  var c = url.indexOf('?') >= 0 ? '&' : '?';
  script.setAttribute('src', url + c + 'callback=' + id);
  script.id = id;
  var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
  head.insertBefore(script, head.firstChild);
}

// ----------
module.exports = {
  getJSON: getJSON
};

},{"./util":6}],2:[function(require,module,exports){
'use strict';

var ajax = require('./ajax');
var util = require('./util');

function Client(options) {
  options = options || {};
  this.clientId = options.clientId;
  this.mashapeKey = options.mashapeKey;
  if (!this.clientId && !this.mashapeKey) {
    throw new Error('[domainr] Missing mashapeKey or clientId');
  }
  this.baseURL = options.baseURL || (this.clientId ? 'https://api.domainr.com/v2' : 'https://domainr.p.mashape.com/v2');
}

Client.prototype = {
  search: function(params, callback) {
    this._get('/search', this.searchParams(params), callback);
  },

  searchParams: function(p) {
    return util.extract(p, ['query', 'registrar', 'location', 'defaults']);
  },

  status: function(domains, callback) {
    if (!domains) {
      throw new Error('[domainr] domains array is required');
    }

    util.uniq(domains);
    var params = {
      domain: domains.join(',')
    };
    this._get('/status', params, callback);
  },

  options: function(domain, callback) {
    this._get('/options', {
      domain: domain,
    }, callback);
  },

  zones: function(callback) {
    this._get('/zones', {}, callback);
  },

  registerURL: function(domain, options) {
    var params = util.extract(options, ['registrar']);
    params.domain = domain;
    return this._url('/register', params);
  },

  _get: function(path, params, callback) {
    var url = this.baseURL + path + '?' + util.qs(params || {}, this._key());
    ajax.getJSON(url, callback);
  },

  _url: function (path, params) {
    return this.baseURL + path + '?' + util.qs(params || {}, this._key());
  },

  _key: function() {
    if (this.clientId) {
      return {
        client_id: this.clientId
      };
    }

    return {
      'mashape-key': this.mashapeKey
    };
  }
};

module.exports = Client;

},{"./ajax":1,"./util":6}],3:[function(require,module,exports){
'use strict'

var Client = require('./client');
var SearchBox = require('./search-box');
require('./jquery');

module.exports = {
  Client: Client,
  SearchBox: SearchBox
};

},{"./client":2,"./jquery":4,"./search-box":5}],4:[function(require,module,exports){
'use strict';

var SearchBox = require('./search-box');
var util = require('./util');

if (window.jQuery) {
  var $ = window.jQuery;

  $.fn.domainrSearchBox = function(config) {
    this.each(function(i, el) {
      var searchBoxConfig = util.extract(config, ['clientId', 'mashapeKey',
        'renderWith', 'limit', 'registrar', 'defaults', 'onSelect']);

      searchBoxConfig.observe = el;

      if (config.renderTo) {
        var $el = $(config.renderTo);
        if ($el.length > 0) {
          searchBoxConfig.renderTo = $el[0];
        }
      }

      var searchBox = new domainr.SearchBox(searchBoxConfig);
    });

    return this;
  };
}

},{"./search-box":5,"./util":6}],5:[function(require,module,exports){
'use strict'

var Client = require('./client');
var util = require('./util');

var SearchBox = function(options) {
  var self = this;

  options = options || {};

  if (!options.observe) {
    throw new Error('[domainr] "observe" is required');
  }

  this._client = new Client(util.extract(options, ['clientId', 'mashapeKey']));
  this._state = {
    query: '',
    results: [],
    limit: 20,
    selection: -1
  };

  this._seq = 0;
  this._last = 0;
  this._cache = {};
  this._listeners = {};
  this._renderer = defaultRenderer;

  this._in = options.observe;
  on(this._in, 'keyup', this._input, this);
  on(this._in, 'input', this._input, this);
  on(this._in, 'change', this._input, this);
  on(this._in, 'keydown', this._keydown, this);

  if (options.renderTo !== undefined) {
    this._out = options.renderTo;
    addClass(this._out, 'domainr-results-container');
    on(this._out, 'click', this._click, this);
  }

  if (options.renderWith !== undefined) {
    this._renderer = options.renderWith;
  }

  if (options.limit !== undefined) {
    this._state.limit = options.limit;
  }

  if (options.registrar !== undefined) {
    this._state.registrar = options.registrar;
  }

  if (options.defaults !== undefined) {
    this._state.defaults = options.defaults.join(',');
  }

  if (options.onSelect !== undefined) {
    this._onSelect = options.onSelect;
  } else {
    this._onSelect = function(result) {
      self._in.value = result.domain;
      window.open(self._client.registerURL(result.domain));
    };
  }
};

SearchBox.prototype = {
  _input: function() {
    if (this._state.query != this._in.value) {
      this._state.query = this._in.value;
      this._search();
    }
  },

  _keydown: function(event) {
    event = event || window.event;
    var handled = false;

    if (event.keyCode === 38) { // Up arrow
      handled = true;
      this._state.selection--;
      if (this._state.selection < 0) {
        this._state.selection = this._state.results.length - 1;
      }

      this._update();
    } else if (event.keyCode === 40) { // Down arrow
      handled = true;
      this._state.selection++;
      if (this._state.selection >= this._state.results.length) {
        this._state.selection = 0;
      }

      this._update();
    } else if (event.keyCode === 13) { // Enter key
      if (this._state.selection !== -1) {
        handled = true;
        this._choose(this._state.results[this._state.selection]);
      }
    }

    if (handled && event.preventDefault) {
      event.preventDefault();
    }
  },

  _click: function(event) {
    event = event || window.event;
    var rs = this._state.results;
    for (var e = event.target || event.srcElement; e && e != document; e = e.parentNode) {
      var d = e.getAttribute('data-domain');
      if (d) {
        for (var i = 0; i < rs.length; i++) {
          var r = rs[i];
          if (r.domain == d) {
            this._choose(r);
            return;
          }
        }
      }
    }
  },

  _render: function() {
    if (!this._out) {
      return;
    }
    this._out.innerHTML = this._renderer(this._state);
    return this;
  },

  _search: function() {
    var self = this;
    this._state.selection = -1;

    // Try cache first
    var key = util.qs(this._client.searchParams(this._state));
    var res = this._cache[key];
    if (res !== undefined) {
      this._state.results = res.results;
      this._update();
      return;
    }

    // Make network request
    var seq = this._seq++;
    this._client.search(this._state, function(res) {
      self._cache[key] = res;
      if (self._last > seq) {
        return;
      }
      self._last = seq;
      self._state.results = res.results;
      self._update();
    });
  },

  _update: function() {
    this._limit();
    this._status();
    this._render();
  },

  _limit: function() {
    if (this._state.limit >= 0 && this._state.results.length > this._state.limit) {
      this._state.results.length = this._state.limit;
    }
  },

  _status: function() {
    var self = this;

    // Extract domains without status
    var d = [];
    var MAX_STATUS_DOMAINS = 10;
    var rs = this._state.results;
    for (var i = 0; i < rs.length && d.length < MAX_STATUS_DOMAINS; i++) {
      var r = rs[i];
      r.status = this._cache[r.domain + ':status'] || r.status;
      if (!r.status) {
        r.status = 'unknown';
        d.push(r.domain);
      }
    }
    if (d.length === 0) {
      return;
    }

    // Make network request
    this._client.status(d, function(res) {
      var ss = res.status;
      for (var i = 0; i < ss.length; i++) {
        var s = ss[i];
        self._cache[s.domain + ':status'] = s.status;
      }
      self._update();
    });
  },

  _choose: function(result) {
    if (this._onSelect) {
      this._onSelect(result);
    }
  }
};

function defaultRenderer(state) {
  var rs = state.results;
  var l = rs.length;
  if (l === 0) {
    return '';
  }
  var h = ['<div class="domainr-results">'];
  for (var i = 0; i < l; i++) {
    var r = rs[i];

    var classNames = [
      'domainr-result',
      r.status
    ];

    if (state.selection === i) {
      classNames.push('selected');
    }

    h.push(
      '<div class="' + classNames.join(' ') + '" data-domain="' + r.domain + '">' +
        '<span class="domainr-result-domain">' +
          '<span class="domainr-result-host">' + r.host + '</span>' +
          '<span class="domainr-result-subdomain">' + r.subdomain + '</span>' +
          '<span class="domainr-result-zone">' + r.zone + '</span>' +
        '</span>' +
        '<span class="domainr-result-path">' + r.path + '</span>' +
      '</div>'
    );
  }
  h.push('</div>');
  return h.join('');
}

function on(e, ev, cb, obj) {
  if (obj) {
    var original = cb;
    cb = function() {
      return original.apply(obj, arguments);
    };
  }
  if (e.addEventListener) {
    e.addEventListener(ev, cb, false);
  } else if (e.attachEvent) {
    e.attachEvent('on' + ev, cb);
  } else {
    e['on' + ev] = cb;
  }
}

function addClass(e, className) {
  if (e.classList) {
    e.classList.add(className);
  } else {
    e.className += ' ' + className;
  }
}

module.exports = SearchBox;

},{"./client":2,"./util":6}],6:[function(require,module,exports){
'use strict'

var euc = encodeURIComponent;

function extract(p, keys) {
  var x = {};
  if (p) {
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (p[k] !== undefined) {
        x[k] = p[k];
      }
    }
  }
  return x;
}

function qs() {
  var q = [];
  for (var i = 0; i < arguments.length; i++) {
    var p = arguments[i];
    for (var k in p) {
      q.push(euc(k) + '=' + euc(p[k]));
    }
  }
  return q.join('&');
}

function error(message) {
  if (window.console && window.console.error) {
    window.console.error('[domainr] ' + message);
  }
}

function uniq(a) {
  if (!a) {
    return;
  }

  var i, j;
  for (i = 0; i < a.length; i++) {
    for (j = i + 1; j < a.length; j++) {
      if (a[i] === a[j]) {
        a.splice(j, 1);
        j--;
      }
    }
  }
}

module.exports = {
  euc: euc,
  extract: extract,
  qs: qs,
  error: error,
  uniq: uniq
};

},{}]},{},[3])(3)
});