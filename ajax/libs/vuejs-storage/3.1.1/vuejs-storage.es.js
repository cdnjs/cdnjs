function parsePath(path) {
  return path.replace(/\[([^[\]]*)\]/g, '.$1.').split('.').filter(function (t) {
    return t !== '';
  });
}
function get(obj, path) {
  return parsePath(path).reduce(function (prev, cur) {
    return prev && prev[cur];
  }, obj);
}
function set(obj, path, value) {
  var paths = parsePath(path);
  var cur = obj;

  for (var i = 0; i < paths.length - 1; i++) {
    var pname = paths[i];
    if (!cur.hasOwnProperty(pname)) cur[pname] = {};
    cur = cur[pname];
  }

  cur[paths[paths.length - 1]] = value;
}
function copy(dest, source, path) {
  set(dest, path, get(source, path));
}

var StroageDriverImpl =
/** @class */
function () {
  function StroageDriverImpl(storage) {
    this.storage = storage;
  }

  StroageDriverImpl.prototype.set = function (key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  };

  StroageDriverImpl.prototype.get = function (key) {
    return JSON.parse(this.storage.getItem(key));
  };

  StroageDriverImpl.prototype.has = function (key) {
    return !!this.storage.getItem(key);
  };

  return StroageDriverImpl;
}();
var localStorage = new StroageDriverImpl(window.localStorage);
var sessionStorage = new StroageDriverImpl(window.sessionStorage);

var drivers = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': StroageDriverImpl,
	localStorage: localStorage,
	sessionStorage: sessionStorage
});

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

// a simple object merge function implementation
var isobj = function isobj(x) {
  return _typeof(x) === 'object' && !Array.isArray(x) && x !== null;
};

var merge = function merge(target, source) {
  for (var _i = 0, _a = Object.keys(source); _i < _a.length; _i++) {
    var key = _a[_i];

    if (!isobj(source[key])) {
      target[key] = source[key];
      continue;
    }

    if (!(key in target)) {
      target[key] = source[key];
      continue;
    }

    var targetValue = typeof target[key] === 'undefined' || target[key] === null ? {} : target[key];
    merge(targetValue, source[key]);
  }

  return target;
};

function applyPersistence(vm, option) {
  var keys = option.keys,
      _a = option.merge,
      merge$1 = _a === void 0 ? merge : _a,
      ns = option.namespace,
      _b = option.driver,
      driver = _b === void 0 ? localStorage : _b;
  var originaldata = {};

  for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
    var k = keys_1[_i];
    copy(originaldata, vm, k);
  }

  var data = null;

  if (driver.has(ns)) {
    data = driver.get(ns);
  } else {
    var tmp = {};

    for (var _c = 0, keys_2 = keys; _c < keys_2.length; _c++) {
      var k = keys_2[_c];
      copy(tmp, originaldata, k);
    }

    data = tmp;
    driver.set(ns, data);
  }

  data = merge$1(originaldata, data);

  var _loop_1 = function _loop_1(k) {
    copy(vm, data, k);
    vm.$watch(k, {
      handler: function handler(value) {
        set(data, k, value);
        driver.set(ns, data);
      },
      deep: true
    });
  };

  for (var _d = 0, keys_3 = keys; _d < keys_3.length; _d++) {
    var k = keys_3[_d];

    _loop_1(k);
  }
}

function install(Vue) {
  Vue.mixin({
    created: function created() {
      var _this = this;

      if ('storage' in this.$options) {
        var option = this.$options.storage;

        if (typeof option === 'function') {
          option = option.apply(this);
        }

        if (Array.isArray(option)) option.forEach(function (opt) {
          return applyPersistence(_this, opt);
        });else applyPersistence(this, option);
      }
    }
  });
}

/**
 * Create Vuex plugin
 */

function createVuexPlugin(option) {
  var keys = option.keys,
      _a = option.merge,
      merge$1 = _a === void 0 ? merge : _a,
      ns = option.namespace,
      _b = option.driver,
      driver = _b === void 0 ? localStorage : _b;
  return function (store) {
    if (driver.has(ns)) {
      var data = driver.get(ns);
      store.replaceState(merge$1(store.state, data));
    } else {
      var data = {};

      for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var k = keys_1[_i];
        copy(data, store.state, k);
      }

      driver.set(ns, data);
    }

    store.subscribe(function (mutation, state) {
      var data = {};

      for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
        var k = keys_2[_i];
        copy(data, state, k);
      }

      driver.set(ns, data);
    });
  };
}

var vuejsStorage = function vuejsStorage(option) {
  return createVuexPlugin(option);
};

vuejsStorage.install = install;
vuejsStorage.drivers = drivers;

export default vuejsStorage;
