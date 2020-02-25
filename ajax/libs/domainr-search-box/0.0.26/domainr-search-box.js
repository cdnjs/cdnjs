(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.domainr = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var util = require('./util');

var sequence = 0;

// Detect CORS support
var cors = false;
if ('withCredentials' in xhr()) {
  cors = true;
}

// ----------
function getJSON(url, callback, failure) {
  if (!callback) {
    throw new Error('[domainr] Missing callback');
  }

  if (cors) {
    getCORS(url, callback, failure);
    return;
  }

  getJSONP(url, callback, failure);
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
function getCORS(url, callback, failure) {
  failure = failure || function() {};
  var x = xhr();

  x.onreadystatechange = function() {
    var message;
    
    if (x.readyState != 4) {
      return;
    }

    if (x.status != 200) {
      message = 'Error fetching data: ' + x.responseText;
      util.error(message);
      failure({ message: message });
      return;
    }

    var result;
    try {
      result = JSON.parse(x.responseText);
    } catch (e) {
      message = 'Unable to parse data: ' + x.responseText + '; ' + e;
      util.error(message);
      failure({ message: message });
      return;
    }

    callback(result);
  };

  x.open('GET', url, true);
  x.send();
}

// ----------
// You must provide a success callback, but the failure callback is optional.
// For each call to getJSONP, you'll get at most 1 callback (either success or failure) call. If you
// don't provide a failure callback, you might not receive a call at all (if the function doesn't
// succeed). If you do provide the failure callback, you'll get exactly 1 call, whichever one is
// appropriate to the result.
function getJSONP(url, success, failure) {
  var script = document.createElement('script');
  script.async = true;
  var id = '_jsonp' + sequence++;
  var failureSent = false;

  var timeout = setTimeout(function() {
    var message = 'Timeout trying to retrieve ' + url;
    util.error(message);
    if (failure) {
      failure({ message: message });
      
      // Here we set a flag so we won't end up sending a success callback later if the result comes
      // through after the timeout.
      failureSent = true;
    }
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

    if (!failureSent) {
      success(data);
    }
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
    var self = this;
    
    if (!domains) {
      throw new Error('[domainr] domains array is required');
    }

    util.uniq(domains);
    
    var output = {
      status: []
    };
    
    var completed = 0;
    
    var incrementCompleted = function() {
      completed++;
      if (completed === domains.length) {
        callback(output);
      }
    };
    
    var doOne = function(domain) {
      var params = {
        domain: domain
      };
      
      self._get('/status', params, function(result) {
        if (result && result.status && result.status[0]) {
          output.status.push(result.status[0]);
        } else {
          util.error('Empty status result', result);
        }

        incrementCompleted();
      }, incrementCompleted);
    };
    
    for (var i = 0; i < domains.length; i++) {
      doOne(domains[i]);
    }
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

  _get: function(path, params, callback, failure) {
    var url = this.baseURL + path + '?' + util.qs(params || {}, this._key());
    ajax.getJSON(url, callback, failure);
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
  this._searchTimeout = null;
  this._searchDelay = 250;
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
  
  if (options.searchDelay !== undefined) {
    this._searchDelay = options.searchDelay;
  }

  if (options.onSelect !== undefined) {
    this._onSelect = options.onSelect;
  } else {
    this._onSelect = function(result) {
      self._in.value = result.domain;
      window.open(self._client.registerURL(result.domain));
    };
  }
  
  this._input(); // In case there's something already in the input
};

SearchBox.prototype = {
  _input: function() {
    if (this._state.query != this._in.value) {
      if (this._in.value === '') {
        this._state.results = [];
        this._update();
        return;
      }
      this._state.query = this._in.value;
      window.clearTimeout(this._searchTimeout);
      this._searchTimeout = window.setTimeout(this._search.bind(this), this._searchDelay);
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
    this._sort();
    this._limit();
    this._status();
    this._render();
  },

  _sort: function() {
    if (!this._state.defaults || !this._state.results) {
      return;
    }

    var defaults = this._state.defaults.split(',');
    this._state.results.sort(function(a, b) {
      var aIndex = util.indexOf(defaults, a.zone);
      if (aIndex === -1) {
        aIndex = defaults.length;
      }

      var bIndex = util.indexOf(defaults, b.zone);
      if (bIndex === -1) {
        bIndex = defaults.length;
      }

      if (aIndex !== bIndex) {
        return aIndex - bIndex;
      }

      return a.domain - b.domain;
    });
  },

  _limit: function() {
    if (this._state.limit >= 0 && this._state.results.length > this._state.limit) {
      this._state.results.length = this._state.limit;
    }
  },

  _status: function() {
    var self = this;

    // Extract domains without status
    var i;
    var d = [];
    var MAX_STATUS_DOMAINS = 10;
    var rs = this._state.results;
    for (i = 0; i < rs.length && d.length < MAX_STATUS_DOMAINS; i++) {
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
    
    util.uniq(d);
    
    var doOne = function(domain) {
      self._client.status([domain], function(res) {
        var s = res.status[0];
        if (s) {
          self._cache[s.domain + ':status'] = s.status;
          self._update();
        }
      });
    };
    
    for (i = 0; i < d.length; i++) {
      doOne(d[i]);
    }
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
  return q.sort().join('&');
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

function indexOf(a, v) {
  if (!a) {
    return -1;
  }

  var i;
  for (i = 0; i < a.length; i++) {
    if (a[i] === v) {
      return i;
    }
  }

  return -1;
}

module.exports = {
  euc: euc,
  extract: extract,
  qs: qs,
  error: error,
  uniq: uniq,
  indexOf: indexOf
};

},{}]},{},[3])(3)
});
