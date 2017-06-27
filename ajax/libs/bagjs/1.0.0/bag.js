/*
 * bag.js - js/css/other loader + kv storage
 *
 * Copyright 2013-2014 Vitaly Puzrin
 * https://github.com/nodeca/bag.js
 *
 * License MIT
 */

/*global define*/

(function (root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else {
    root.Bag = factory();
  }
} (this, function () {
  'use strict';

  var head = document.head || document.getElementsByTagName('head')[0];

  //////////////////////////////////////////////////////////////////////////////
  // helpers

  function _nope() { return; }

  function _isString(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
  }

  var _isArray = Array.isArray || function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  function _isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  }

  function _each(obj, iterator) {
    if (_isArray(obj)) {
      if (obj.forEach) {
        return obj.forEach(iterator);
      }
      for (var i = 0; i < obj.length; i++) {
        iterator(obj[i], i, obj);
      }
    } else {
      for (var k in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, k)) {
          iterator(obj[k], k);
        }
      }
    }
  }

  function _default(obj, src) {
    // extend obj with src properties if not exists;
    _each(src, function (val, key) {
      if (!obj[key]) { obj[key] = src[key]; }
    });
  }


  function _asyncEach(arr, iterator, callback) {
    callback = callback || _nope;
    if (!arr.length) { return callback(); }

    var completed = 0;
    _each(arr, function (x) {
      iterator(x, function (err) {
        if (err) {
          callback(err);
          callback = _nope;
        } else {
          completed += 1;
          if (completed >= arr.length) {
            callback();
          }
        }
      });
    });
  }


  //////////////////////////////////////////////////////////////////////////////
  // Adapters for Store class

  function DomStorage(namespace) {
    var self = this;
    var _ns = namespace + '__';
    var _storage = localStorage;


    this.init = function (callback) {
      callback();
    };


    this.remove = function (key, callback) {
      callback = callback || _nope;
      _storage.removeItem(_ns + key);
      callback();
    };


    this.set = function (key, value, expire, callback) {
      var obj = {
        value: value,
        expire: expire
      };

      var err;

      try {
        _storage.setItem(_ns + key, JSON.stringify(obj));
      } catch (e) {
        // On quota error try to reset storage & try again.
        // Just remove all keys, without conditions, no optimizations needed.
        if (e.name.toUpperCase().indexOf('QUOTA') >= 0) {
          try {
            _each(_storage, function (val, name) {
              var k = name.split(_ns)[1];
              if (k) { self.remove(k); }
            });
            _storage.setItem(_ns + key, JSON.stringify(obj));
          } catch (e2) {
            err = e2;
          }
        } else {
          err = e;
        }
      }

      callback(err);
    };


    this.get = function (key, raw, callback) {
      if (_isFunction(raw)) {
        callback = raw;
        raw = false;
      }

      var err, data;

      try {
        data = JSON.parse(_storage.getItem(_ns + key));
        data = raw ? data : data.value;
      } catch (e) {
        err = new Error('Can\'t read key: ' + key);
      }

      callback(err, data);
    };


    this.clear = function (expiredOnly, callback) {
      var now = +new Date();

      _each(_storage, function (val, name) {
        var key = name.split(_ns)[1];

        if (!key) { return; }

        if (!expiredOnly) {
          self.remove(key);
          return;
        }

        var raw;
        self.get(key, true, function (__, data) {
          raw = data; // can use this hack, because get is sync;
        });
        if (raw && (raw.expire > 0) && ((raw.expire - now) < 0)) {
          self.remove(key);
        }
      });

      callback();
    };
  }


  DomStorage.prototype.exists = function () {
    try {
      localStorage.setItem('__ls_test__', '__ls_test__');
      localStorage.removeItem('__ls_test__');
      return true;
    } catch (e) {
      return false;
    }
  };



  function WebSql(namespace) {
    var db;


    this.init = function (callback) {
      db = window.openDatabase(namespace, '1.0', 'bag.js db', 2e5);

      if (!db) { return callback('Can\'t open webdql database'); }

      db.transaction(function (tx) {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS kv (key TEXT PRIMARY KEY, value TEXT, expire INTEGER KEY)',
          [],
          function () { return callback(); },
          function (tx, err) { return callback(err); }
        );
      });
    };


    this.remove = function (key, callback) {
      callback = callback || _nope;
      db.transaction(function (tx) {
        tx.executeSql(
          'DELETE FROM kv WHERE key = ?',
          [ key ],
          function () { return callback(); },
          function (tx, err) { return callback(err); }
        );
      });
    };


    this.set = function (key, value, expire, callback) {
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT OR REPLACE INTO kv (key, value, expire) VALUES (?, ?, ?)',
          [ key, JSON.stringify(value), expire ],
          function () { return callback(); },
          function (tx, err) { return callback(err); }
        );
      });
    };


    this.get = function (key, callback) {
      db.readTransaction(function (tx) {
        tx.executeSql(
          'SELECT value FROM kv WHERE key = ?',
          [ key ],
          function (tx, result) {
            if (result.rows.length === 0) {
              return callback(new Error('key not found: ' + key));
            }
            var value = result.rows.item(0).value;
            var err, data;
            try {
              data = JSON.parse(value);
            } catch (e) {
              err = new Error('Can\'t unserialise data: ' + value);
            }
            callback(err, data);
          },
          function (tx, err) { return callback(err); }
        );
      });
    };


    this.clear = function (expiredOnly, callback) {

      db.transaction(function (tx) {
        if (expiredOnly) {
          tx.executeSql(
            'DELETE FROM kv WHERE expire > 0 AND expire < ?',
            [ +new Date() ],
            function () { return callback(); },
            function (tx, err) { return callback(err); }
          );
        } else {
          db.transaction(function (tx) {
            tx.executeSql(
              'DELETE FROM kv',
              [],
              function () { return callback(); },
              function (tx, err) { return callback(err); }
            );
          });
        }
      });
    };
  }


  WebSql.prototype.exists = function () {
    return (!!window.openDatabase);
  };



  function Idb(namespace) {
    var db;

    this.init = function (callback) {
      var idb = this.idb = window.indexedDB; /* || window.webkitIndexedDB ||
                           window.mozIndexedDB || window.msIndexedDB;*/

      var req = idb.open(namespace, 2 /*version*/);

      req.onsuccess = function (e) {
        db = e.target.result;
        callback();
      };
      req.onblocked = function (e) {
        callback(new Error('IndexedDB blocked. ' + e.target.errorCode));
      };
      req.onerror = function (e) {
        callback(new Error('IndexedDB opening error. ' + e.target.errorCode));
      };
      req.onupgradeneeded = function (e) {
        db = e.target.result;
        if (db.objectStoreNames.contains('kv')) {
          db.deleteObjectStore('kv');
        }
        var store = db.createObjectStore('kv', { keyPath: 'key' });
        store.createIndex('expire', 'expire', { unique: false });
      };
    };


    this.remove = function (key, callback) {
      var tx = db.transaction('kv', 'readwrite');

      tx.oncomplete = function () { callback(); };
      tx.onerror = tx.onabort = function (e) { callback(new Error('Key remove error: ', e.target)); };

      // IE 8 not allow to use reserved keywords as functions. More info:
      // http://tiffanybbrown.com/2013/09/10/expected-identifier-bug-in-internet-explorer-8/
      tx.objectStore('kv')['delete'](key).onerror = function () { tx.abort(); };
    };


    this.set = function (key, value, expire, callback) {
      var tx = db.transaction('kv', 'readwrite');

      tx.oncomplete = function () { callback(); };
      tx.onerror = tx.onabort = function (e) { callback(new Error('Key set error: ', e.target)); };

      tx.objectStore('kv').put({
        key: key,
        value: value,
        expire: expire
      }).onerror = function () { tx.abort(); };
    };


    this.get = function (key, callback) {
      var err, result;
      var tx = db.transaction('kv');

      tx.oncomplete = function () { callback(err, result); };
      tx.onerror = tx.onabort = function (e) { callback(new Error('Key get error: ', e.target)); };

      tx.objectStore('kv').get(key).onsuccess = function (e) {
        if (e.target.result) {
          result = e.target.result.value;
        } else {
          err = new Error('key not found: ' + key);
        }
      };
    };


    this.clear = function (expiredOnly, callback) {
      var keyrange = window.IDBKeyRange; /* ||
                     window.webkitIDBKeyRange || window.msIDBKeyRange;*/
      var tx, store;

      tx = db.transaction('kv', 'readwrite');
      store = tx.objectStore('kv');

      tx.oncomplete = function () { callback(); };
      tx.onerror = tx.onabort = function (e) { callback(new Error('Clear error: ', e.target)); };

      if (expiredOnly) {

        var cursor = store.index('expire').openCursor(keyrange.bound(1, +new Date()));

        cursor.onsuccess = function (e) {
          var _cursor = e.target.result;
          if (_cursor) {
            // IE 8 not allow to use reserved keywords as functions (`delete` and `continue`). More info:
            // http://tiffanybbrown.com/2013/09/10/expected-identifier-bug-in-internet-explorer-8/
            store['delete'](_cursor.primaryKey).onerror = function () { tx.abort(); };
            _cursor['continue']();
          }
        };

      } else {
        // Just clear everything
        tx.objectStore('kv').clear().onerror = function () { tx.abort(); };
      }
    };
  }


  Idb.prototype.exists = function () {
    var db =  window.indexedDB /*||
              window.webkitIndexedDB ||
              window.mozIndexedDB ||
              window.msIndexedDB*/;

    if (!db) {
      return false;
    }

    // Check outdated idb implementations, where `onupgradeneede` event doesn't work,
    // see https://github.com/pouchdb/pouchdb/issues/1207 for more details
    var dbName = '__idb_test__';
    var result = db.open(dbName, 1).onupgradeneeded === null;

    if (db.deleteDatabase) {
      db.deleteDatabase(dbName);
    }

    return result;
  };



  /////////////////////////////////////////////////////////////////////////////
  // key/value storage with expiration

  var storeAdapters = {
    indexeddb: Idb,
    websql: WebSql,
    localstorage: DomStorage
  };


  // namespace - db name or similar
  // storesList - array of allowed adapter names to use
  //
  function Storage(namespace, storesList) {
    var self = this;

    var db = null;

    // States of db init singletone process
    // 'done' / 'progress' / 'failed' / undefined
    var initState;
    var initStack = [];

    _each(storesList, function (name) {
      // do storage names case insensitive
      name = name.toLowerCase();

      if (!storeAdapters[name]) {
        throw new Error('Wrong storage adapter name: ' + name, storesList);
      }

      if (storeAdapters[name].prototype.exists() && !db) {
        db = new storeAdapters[name](namespace);
        return false; // terminate search on first success
      }
    });

    if (!db) {
      /* eslint-disable no-console */
      // If no adaprets - don't make error for correct fallback.
      // Just log that we continue work without storing results.
      if (typeof console !== 'undefined' && console.log) {
        console.log('None of requested storages available: ' + storesList);
      }
      /* eslint-enable no-console */
    }


    this.init = function (callback) {
      if (!db) {
        callback(new Error('No available db'));
        return;
      }

      if (initState === 'done') {
        callback();
        return;
      }

      if (initState === 'progress') {
        initStack.push(callback);
        return;
      }

      initStack.push(callback);
      initState = 'progress';

      db.init(function (err) {
        initState = !err ? 'done' : 'failed';
        _each(initStack, function (cb) {
          cb(err);
        });
        initStack = [];

        // Clear expired. A bit dirty without callback,
        // but we don't care until clear compleete
        if (!err) { self.clear(true); }
      });
    };


    this.set = function (key, value, expire, callback) {
      if (_isFunction(expire)) {
        callback = expire;
        expire = null;
      }
      callback = callback || _nope;
      expire = expire ? +(new Date()) + (expire * 1000) : 0;

      this.init(function (err) {
        if (err) { return callback(err); }
        db.set(key, value, expire, callback);
      });
    };


    this.get = function (key, callback) {
      this.init(function (err) {
        if (err) { return callback(err); }
        db.get(key, callback);
      });
    };


    this.remove = function (key, callback) {
      callback = callback || _nope;
      this.init(function (err) {
        if (err) { return callback(err); }
        db.remove(key, callback);
      });
    };


    this.clear = function (expiredOnly, callback) {
      if (_isFunction(expiredOnly)) {
        callback = expiredOnly;
        expiredOnly = false;
      }
      callback = callback || _nope;

      this.init(function (err) {
        if (err) { return callback(err); }
        db.clear(expiredOnly, callback);
      });
    };
  }


  //////////////////////////////////////////////////////////////////////////////
  // Bag class implementation

  function Bag(options) {
    if (!(this instanceof Bag)) { return new Bag(options); }

    var self = this;

    options = options || {};

    this.prefix       = options.prefix || 'bag';
    this.timeout      = options.timeout || 20;    // 20 seconds
    this.expire       = options.expire || 30 * 24;  // 30 days
    this.isValidItem  = options.isValidItem || null;

    this.stores = _isArray(options.stores) ? options.stores : [ 'indexeddb', 'websql', 'localstorage' ];

    var storage = null;

    this._queue = [];
    this._chained = false;

    this._createStorage = function () {
      if (!storage) { storage = new Storage(self.prefix, self.stores); }
    };

    function getUrl(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            callback(null, {
              content: xhr.responseText,
              type: xhr.getResponseHeader('content-type')
            });
            callback = _nope;
          } else {
            callback(new Error('Can\'t open url ' + url +
               (xhr.status ? xhr.statusText + ' (' + xhr.status + ')' : '')));
            callback = _nope;
          }
        }
      };

      setTimeout(function () {
        if (xhr.readyState < 4) {
          xhr.abort();
          callback(new Error('Timeout'));
          callback = _nope;
        }
      }, self.timeout * 1000);

      xhr.send();
    }

    function createCacheObj(obj, response) {
      var cacheObj = {};

      _each([ 'url', 'key', 'unique' ], function (key) {
        if (obj[key]) { cacheObj[key] = obj[key]; }
      });

      var now = +new Date();
      cacheObj.data = response.content;
      cacheObj.originalType = response.type;
      cacheObj.type = obj.type || response.type;
      cacheObj.stamp = now;

      return cacheObj;
    }

    function saveUrl(obj, callback) {
      getUrl(obj.url_real, function (err, result) {
        if (err) { return callback(err); }

        var delay = (obj.expire || self.expire) * 60 * 60; // in seconds

        var cached = createCacheObj(obj, result);

        self.set(obj.key, cached, delay, function () {
          // Don't check error - have to return data anyway
          _default(obj, cached);
          callback(null, obj);
        });
      });
    }


    function isCacheValid(cached, obj) {
      return !cached ||
        cached.expire - +new Date() < 0  ||
        obj.unique !== cached.unique ||
        obj.url !== cached.url ||
        (self.isValidItem && !self.isValidItem(cached, obj));
    }


    function fetch(obj, callback) {

      if (!obj.url) { return callback(); }
      obj.key = (obj.key || obj.url);

      self.get(obj.key, function (err_cache, cached) {

        // Check error only on forced fetch from cache
        if (err_cache && obj.cached) {
          callback(err_cache);
          return;
        }

        // if can't get object from store, then just load it from web.
        obj.execute = (obj.execute !== false);
        var shouldFetch = !!err_cache || isCacheValid(cached, obj);

        // If don't have to load new date - return one from cache
        if (!obj.live && !shouldFetch) {
          obj.type = obj.type || cached.originalType;
          _default(obj, cached);
          callback(null, obj);
          return;
        }

        // calculate loading url
        obj.url_real = obj.url;
        if (obj.unique) {
          // set parameter to prevent browser cache
          obj.url_real = obj.url + ((obj.url.indexOf('?') > 0) ? '&' : '?') + 'bag-unique=' + obj.unique;
        }

        saveUrl(obj, function (err_load) {
          if (err_cache && err_load) {
            callback(err_load);
            return;
          }

          if (err_load) {
            obj.type = obj.type || cached.originalType;
            _default(obj, cached);
            callback(null, obj);
            return;
          }

          callback(null, obj);
        });
      });
    }

    ////////////////////////////////////////////////////////////////////////////
    // helpers to set absolute sourcemap url

    /* eslint-disable max-len */
    var sourceMappingRe = /(?:^([ \t]*\/\/[@|#][ \t]+sourceMappingURL=)(.+?)([ \t]*)$)|(?:^([ \t]*\/\*[@#][ \t]+sourceMappingURL=)(.+?)([ \t]*\*\/[ \t])*$)/mg;
    /* eslint-enable max-len */

    function parse_url(url) {
      var pattern = new RegExp('^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?');
      var matches = url.match(pattern);
      return {
        scheme: matches[2],
        authority: matches[4],
        path: matches[5],
        query: matches[7],
        fragment: matches[9]
      };
    }

    function patchMappingUrl(obj) {
      var refUrl = parse_url(obj.url);
      var done = false;
      var res = obj.data.replace(sourceMappingRe, function (match, p1, p2, p3, p4, p5, p6) {
        if (!match) { return null; }
        done = true;
        // select matched group of params
        if (!p1) { p1 = p4; p2 = p5; p3 = p6; }
        var mapUrl = parse_url(p2);

        var scheme = (mapUrl.scheme ? mapUrl.scheme : refUrl.scheme) || window.location.protocol.slice(0, -1);
        var authority = (mapUrl.authority ? mapUrl.authority : refUrl.authority) || window.location.host;
        /* eslint-disable max-len */
        var path = mapUrl.path[0] === '/' ? mapUrl.path : refUrl.path.split('/').slice(0, -1).join('/') + '/' + mapUrl.path;
        /* eslint-enable max-len */
        return p1 + (scheme + '://' + authority + path) + p3;
      });
      return done ? res : '';
    }

    ////////////////////////////////////////////////////////////////////////////

    var handlers = {
      'application/javascript': function injectScript(obj) {
        var script = document.createElement('script'), txt;

        // try to change sourcemap address to absolute
        txt = patchMappingUrl(obj);
        if (!txt) {
          // or add script name for dev tools
          txt = obj.data + '\n//# sourceURL=' + obj.url;
        }

        // Have to use .text, since we support IE8,
        // which won't allow appending to a script
        script.text = txt;
        head.appendChild(script);
        return;
      },

      'text/css': function injectStyle(obj) {
        var style = document.createElement('style'), txt;

        // try to change sourcemap address to absolute
        txt = patchMappingUrl(obj);
        if (!txt) {
          // or add stylesheet script name for dev tools
          txt = obj.data + '\n/*# sourceURL=' + obj.url + ' */';
        }

        // Needed to enable `style.styleSheet` in IE
        style.setAttribute('type', 'text/css');

        if (style.styleSheet) {
          // We should append style element to DOM before assign css text to
          // workaround IE bugs with `@import` and `@font-face`.
          // https://github.com/andrewwakeling/ie-css-bugs
          head.appendChild(style);

          style.styleSheet.cssText = txt; // IE method
        } else {
          style.appendChild(document.createTextNode(txt)); // others
          head.appendChild(style);
        }

        return;
      }
    };


    function execute(obj) {
      if (!obj.type) { return; }

      // Cut off encoding if exists:
      // application/javascript; charset=UTF-8
      var handlerName = obj.type.split(';')[0];

      // Fix outdated mime types if needed, to use single handler
      if (handlerName === 'application/x-javascript' || handlerName === 'text/javascript') {
        handlerName = 'application/javascript';
      }

      if (handlers[handlerName]) {
        handlers[handlerName](obj);
      }
      return;
    }

    ////////////////////////////////////////////////////////////////////////////

    //
    // Public methods
    //

    this.require = function (resources, callback) {
      var queue = self._queue;

      if (_isFunction(resources)) {
        callback = resources;
        resources = null;
      }

      if (resources) {
        var res = _isArray(resources) ? resources : [ resources ];

        // convert string urls to structures
        // and push to queue
        _each(res, function (r, i) {
          if (_isString(r)) { res[i] = { url: r }; }
          queue.push(res[i]);
        });
      }

      self._createStorage();

      if (!callback) {
        self._chained = true;
        return self;
      }

      _asyncEach(queue, fetch, function (err) {
        if (err) {
          // cleanup
          self._chained = false;
          self._queue = [];

          callback(err);
          return;
        }

        _each(queue, function (obj) {
          if (obj.execute) {
            execute(obj);
          }
        });

        // return content only, if one need fuul info -
        // check input object, that will be extended.
        var replies = [];
        _each(queue, function (r) { replies.push(r.data); });

        var result = (_isArray(resources) || self._chained) ? replies : replies[0];

        // cleanup
        self._chained = false;
        self._queue = [];

        callback(null, result);
      });
    };


    // Create proxy methods (init store then subcall)
    _each([ 'remove', 'get', 'set', 'clear' ], function (method) {
      self[method] = function () {
        self._createStorage();
        storage[method].apply(storage, arguments);
      };
    });


    this.addHandler = function (types, handler) {
      types = _isArray(types) ? types : [ types ];
      _each(types, function (type) { handlers[type] = handler; });
    };


    this.removeHandler = function (types) {
      self.addHandler(types/*, undefined*/);
    };
  }

  return Bag;

}));
