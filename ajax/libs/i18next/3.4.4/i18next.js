(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.i18next = factory());
}(this, function () { 'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
	};

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	var inherits = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	var possibleConstructorReturn = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};

	var slicedToArray = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

	var consoleLogger = {
	  type: 'logger',

	  log: function log(args) {
	    this._output('log', args);
	  },
	  warn: function warn(args) {
	    this._output('warn', args);
	  },
	  error: function error(args) {
	    this._output('error', args);
	  },
	  _output: function _output(type, args) {
	    if (console && console[type]) console[type].apply(console, Array.prototype.slice.call(args));
	  }
	};

	var Logger = function () {
	  function Logger(concreteLogger) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    classCallCheck(this, Logger);

	    this.subs = [];
	    this.init(concreteLogger, options);
	  }

	  Logger.prototype.init = function init(concreteLogger) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    this.prefix = options.prefix || 'i18next:';
	    this.logger = concreteLogger || consoleLogger;
	    this.options = options;
	    this.debug = options.debug === false ? false : true;
	  };

	  Logger.prototype.setDebug = function setDebug(bool) {
	    this.debug = bool;
	    this.subs.forEach(function (sub) {
	      sub.setDebug(bool);
	    });
	  };

	  Logger.prototype.log = function log() {
	    this.forward(arguments, 'log', '', true);
	  };

	  Logger.prototype.warn = function warn() {
	    this.forward(arguments, 'warn', '', true);
	  };

	  Logger.prototype.error = function error() {
	    this.forward(arguments, 'error', '');
	  };

	  Logger.prototype.deprecate = function deprecate() {
	    this.forward(arguments, 'warn', 'WARNING DEPRECATED: ', true);
	  };

	  Logger.prototype.forward = function forward(args, lvl, prefix, debugOnly) {
	    if (debugOnly && !this.debug) return;
	    if (typeof args[0] === 'string') args[0] = prefix + this.prefix + ' ' + args[0];
	    this.logger[lvl](args);
	  };

	  Logger.prototype.create = function create(moduleName) {
	    var sub = new Logger(this.logger, _extends({ prefix: this.prefix + ':' + moduleName + ':' }, this.options));
	    this.subs.push(sub);

	    return sub;
	  };

	  // createInstance(options = {}) {
	  //   return new Logger(options, callback);
	  // }

	  return Logger;
	}();

	;

	var baseLogger = new Logger();

	var EventEmitter = function () {
		function EventEmitter() {
			classCallCheck(this, EventEmitter);

			this.observers = {};
		}

		EventEmitter.prototype.on = function on(events, listener) {
			var _this = this;

			events.split(' ').forEach(function (event) {
				_this.observers[event] = _this.observers[event] || [];
				_this.observers[event].push(listener);
			});
		};

		EventEmitter.prototype.off = function off(event, listener) {
			var _this2 = this;

			if (!this.observers[event]) {
				return;
			}

			this.observers[event].forEach(function () {
				if (!listener) {
					delete _this2.observers[event];
				} else {
					var index = _this2.observers[event].indexOf(listener);
					if (index > -1) {
						_this2.observers[event].splice(index, 1);
					}
				}
			});
		};

		EventEmitter.prototype.emit = function emit(event) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			if (this.observers[event]) {
				this.observers[event].forEach(function (observer) {
					observer.apply(undefined, args);
				});
			}

			if (this.observers['*']) {
				this.observers['*'].forEach(function (observer) {
					var _ref;

					observer.apply(observer, (_ref = [event]).concat.apply(_ref, args));
				});
			}
		};

		return EventEmitter;
	}();

	function makeString(object) {
	  if (object == null) return '';
	  return '' + object;
	}

	function copy(a, s, t) {
	  a.forEach(function (m) {
	    if (s[m]) t[m] = s[m];
	  });
	}

	function getLastOfPath(object, path, Empty) {
	  function cleanKey(key) {
	    return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;
	  }

	  var stack = typeof path !== 'string' ? [].concat(path) : path.split('.');
	  while (stack.length > 1) {
	    if (!object) return {};

	    var key = cleanKey(stack.shift());
	    if (!object[key] && Empty) object[key] = new Empty();
	    object = object[key];
	  }

	  if (!object) return {};
	  return {
	    obj: object,
	    k: cleanKey(stack.shift())
	  };
	}

	function setPath(object, path, newValue) {
	  var _getLastOfPath = getLastOfPath(object, path, Object);

	  var obj = _getLastOfPath.obj;
	  var k = _getLastOfPath.k;


	  obj[k] = newValue;
	}

	function pushPath(object, path, newValue, concat) {
	  var _getLastOfPath2 = getLastOfPath(object, path, Object);

	  var obj = _getLastOfPath2.obj;
	  var k = _getLastOfPath2.k;


	  obj[k] = obj[k] || [];
	  if (concat) obj[k] = obj[k].concat(newValue);
	  if (!concat) obj[k].push(newValue);
	}

	function getPath(object, path) {
	  var _getLastOfPath3 = getLastOfPath(object, path);

	  var obj = _getLastOfPath3.obj;
	  var k = _getLastOfPath3.k;


	  if (!obj) return undefined;
	  return obj[k];
	}

	function deepExtend(target, source, overwrite) {
	  for (var prop in source) {
	    if (prop in target) {
	      // If we reached a leaf string in target or source then replace with source or skip depending on the 'overwrite' switch
	      if (typeof target[prop] === 'string' || target[prop] instanceof String || typeof source[prop] === 'string' || source[prop] instanceof String) {
	        if (overwrite) target[prop] = source[prop];
	      } else {
	        deepExtend(target[prop], source[prop], overwrite);
	      }
	    } else {
	      target[prop] = source[prop];
	    }
	  }return target;
	}

	function regexEscape(str) {
	  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
	}

	/* eslint-disable */
	var _entityMap = {
	  "&": "&amp;",
	  "<": "&lt;",
	  ">": "&gt;",
	  '"': '&quot;',
	  "'": '&#39;',
	  "/": '&#x2F;'
	};
	/* eslint-enable */

	function escape(data) {
	  if (typeof data === 'string') {
	    return data.replace(/[&<>"'\/]/g, function (s) {
	      return _entityMap[s];
	    });
	  } else {
	    return data;
	  }
	}

	var ResourceStore = function (_EventEmitter) {
	  inherits(ResourceStore, _EventEmitter);

	  function ResourceStore() {
	    var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var options = arguments.length <= 1 || arguments[1] === undefined ? { ns: ['translation'], defaultNS: 'translation' } : arguments[1];
	    classCallCheck(this, ResourceStore);

	    var _this = possibleConstructorReturn(this, _EventEmitter.call(this));

	    _this.data = data;
	    _this.options = options;
	    return _this;
	  }

	  ResourceStore.prototype.addNamespaces = function addNamespaces(ns) {
	    if (this.options.ns.indexOf(ns) < 0) {
	      this.options.ns.push(ns);
	    }
	  };

	  ResourceStore.prototype.removeNamespaces = function removeNamespaces(ns) {
	    var index = this.options.ns.indexOf(ns);
	    if (index > -1) {
	      this.options.ns.splice(index, 1);
	    }
	  };

	  ResourceStore.prototype.getResource = function getResource(lng, ns, key) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	    var keySeparator = options.keySeparator || this.options.keySeparator;
	    if (keySeparator === undefined) keySeparator = '.';

	    var path = [lng, ns];
	    if (key && typeof key !== 'string') path = path.concat(key);
	    if (key && typeof key === 'string') path = path.concat(keySeparator ? key.split(keySeparator) : key);

	    if (lng.indexOf('.') > -1) {
	      path = lng.split('.');
	    }

	    return getPath(this.data, path);
	  };

	  ResourceStore.prototype.addResource = function addResource(lng, ns, key, value) {
	    var options = arguments.length <= 4 || arguments[4] === undefined ? { silent: false } : arguments[4];

	    var keySeparator = this.options.keySeparator;
	    if (keySeparator === undefined) keySeparator = '.';

	    var path = [lng, ns];
	    if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);

	    if (lng.indexOf('.') > -1) {
	      path = lng.split('.');
	      value = ns;
	      ns = path[1];
	    }

	    this.addNamespaces(ns);

	    setPath(this.data, path, value);

	    if (!options.silent) this.emit('added', lng, ns, key, value);
	  };

	  ResourceStore.prototype.addResources = function addResources(lng, ns, resources) {
	    for (var m in resources) {
	      if (typeof resources[m] === 'string') this.addResource(lng, ns, m, resources[m], { silent: true });
	    }
	    this.emit('added', lng, ns, resources);
	  };

	  ResourceStore.prototype.addResourceBundle = function addResourceBundle(lng, ns, resources, deep, overwrite) {
	    var path = [lng, ns];
	    if (lng.indexOf('.') > -1) {
	      path = lng.split('.');
	      deep = resources;
	      resources = ns;
	      ns = path[1];
	    }

	    this.addNamespaces(ns);

	    var pack = getPath(this.data, path) || {};

	    if (deep) {
	      deepExtend(pack, resources, overwrite);
	    } else {
	      pack = _extends({}, pack, resources);
	    }

	    setPath(this.data, path, pack);

	    this.emit('added', lng, ns, resources);
	  };

	  ResourceStore.prototype.removeResourceBundle = function removeResourceBundle(lng, ns) {
	    if (this.hasResourceBundle(lng, ns)) {
	      delete this.data[lng][ns];
	    }
	    this.removeNamespaces(ns);

	    this.emit('removed', lng, ns);
	  };

	  ResourceStore.prototype.hasResourceBundle = function hasResourceBundle(lng, ns) {
	    return this.getResource(lng, ns) !== undefined;
	  };

	  ResourceStore.prototype.getResourceBundle = function getResourceBundle(lng, ns) {
	    if (!ns) ns = this.options.defaultNS;

	    // TODO: COMPATIBILITY remove extend in v2.1.0
	    if (this.options.compatibilityAPI === 'v1') return _extends({}, this.getResource(lng, ns));

	    return this.getResource(lng, ns);
	  };

	  ResourceStore.prototype.toJSON = function toJSON() {
	    return this.data;
	  };

	  return ResourceStore;
	}(EventEmitter);

	var postProcessor = {

	  processors: {},

	  addPostProcessor: function addPostProcessor(module) {
	    this.processors[module.name] = module;
	  },
	  handle: function handle(processors, value, key, options, translator) {
	    var _this = this;

	    processors.forEach(function (processor) {
	      if (_this.processors[processor]) value = _this.processors[processor].process(value, key, options, translator);
	    });

	    return value;
	  }
	};

	function convertInterpolation(options) {

	  options.interpolation = {
	    unescapeSuffix: 'HTML'
	  };

	  options.interpolation.prefix = options.interpolationPrefix || '__';
	  options.interpolation.suffix = options.interpolationSuffix || '__';
	  options.interpolation.escapeValue = options.escapeInterpolation || false;

	  options.interpolation.nestingPrefix = options.reusePrefix || '$t(';
	  options.interpolation.nestingSuffix = options.reuseSuffix || ')';

	  return options;
	}

	function convertAPIOptions(options) {
	  if (options.resStore) options.resources = options.resStore;

	  if (options.ns && options.ns.defaultNs) {
	    options.defaultNS = options.ns.defaultNs;
	    options.ns = options.ns.namespaces;
	  } else {
	    options.defaultNS = options.ns || 'translation';
	  }

	  if (options.fallbackToDefaultNS && options.defaultNS) options.fallbackNS = options.defaultNS;

	  options.saveMissing = options.sendMissing;
	  options.saveMissingTo = options.sendMissingTo || 'current';
	  options.returnNull = options.fallbackOnNull ? false : true;
	  options.returnEmptyString = options.fallbackOnEmpty ? false : true;
	  options.returnObjects = options.returnObjectTrees;
	  options.joinArrays = '\n';

	  options.returnedObjectHandler = options.objectTreeKeyHandler;
	  options.parseMissingKeyHandler = options.parseMissingKey;
	  options.appendNamespaceToMissingKey = true;

	  options.nsSeparator = options.nsseparator;
	  options.keySeparator = options.keyseparator;

	  if (options.shortcutFunction === 'sprintf') {
	    options.overloadTranslationOptionHandler = function (args) {
	      var values = [];

	      for (var i = 1; i < args.length; i++) {
	        values.push(args[i]);
	      }

	      return {
	        postProcess: 'sprintf',
	        sprintf: values
	      };
	    };
	  }

	  options.whitelist = options.lngWhitelist;
	  options.preload = options.preload;
	  if (options.load === 'current') options.load = 'currentOnly';
	  if (options.load === 'unspecific') options.load = 'languageOnly';

	  // backend
	  options.backend = options.backend || {};
	  options.backend.loadPath = options.resGetPath || 'locales/__lng__/__ns__.json';
	  options.backend.addPath = options.resPostPath || 'locales/add/__lng__/__ns__';
	  options.backend.allowMultiLoading = options.dynamicLoad;

	  // cache
	  options.cache = options.cache || {};
	  options.cache.prefix = 'res_';
	  options.cache.expirationTime = 7 * 24 * 60 * 60 * 1000;
	  options.cache.enabled = options.useLocalStorage ? true : false;

	  options = convertInterpolation(options);
	  if (options.defaultVariables) options.interpolation.defaultVariables = options.defaultVariables;

	  // TODO: deprecation
	  // if (options.getAsync === false) throw deprecation error

	  return options;
	}

	function convertJSONOptions(options) {
	  options = convertInterpolation(options);
	  options.joinArrays = '\n';

	  return options;
	}

	function convertTOptions(options) {
	  if (options.interpolationPrefix || options.interpolationSuffix || options.escapeInterpolation) {
	    options = convertInterpolation(options);
	  }

	  options.nsSeparator = options.nsseparator;
	  options.keySeparator = options.keyseparator;

	  options.returnObjects = options.returnObjectTrees;

	  return options;
	}

	function appendBackwardsAPI(i18n) {
	  i18n.lng = function () {
	    baseLogger.deprecate('i18next.lng() can be replaced by i18next.language for detected language or i18next.languages for languages ordered by translation lookup.');
	    return i18n.services.languageUtils.toResolveHierarchy(i18n.language)[0];
	  };

	  i18n.preload = function (lngs, cb) {
	    baseLogger.deprecate('i18next.preload() can be replaced with i18next.loadLanguages()');
	    i18n.loadLanguages(lngs, cb);
	  };

	  i18n.setLng = function (lng, options, callback) {
	    baseLogger.deprecate('i18next.setLng() can be replaced with i18next.changeLanguage() or i18next.getFixedT() to get a translation function with fixed language or namespace.');
	    if (typeof options === 'function') {
	      callback = options;
	      options = {};
	    }
	    if (!options) options = {};

	    if (options.fixLng === true) {
	      if (callback) return callback(null, i18n.getFixedT(lng));
	    }

	    i18n.changeLanguage(lng, callback);
	  };

	  i18n.addPostProcessor = function (name, fc) {
	    baseLogger.deprecate('i18next.addPostProcessor() can be replaced by i18next.use({ type: \'postProcessor\', name: \'name\', process: fc })');
	    i18n.use({
	      type: 'postProcessor',
	      name: name,
	      process: fc
	    });
	  };
	}

	var Translator = function (_EventEmitter) {
	  inherits(Translator, _EventEmitter);

	  function Translator(services) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    classCallCheck(this, Translator);

	    var _this = possibleConstructorReturn(this, _EventEmitter.call(this));

	    copy(['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector'], services, _this);

	    _this.options = options;
	    _this.logger = baseLogger.create('translator');
	    return _this;
	  }

	  Translator.prototype.changeLanguage = function changeLanguage(lng) {
	    if (lng) this.language = lng;
	  };

	  Translator.prototype.exists = function exists(key) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? { interpolation: {} } : arguments[1];

	    if (this.options.compatibilityAPI === 'v1') {
	      options = convertTOptions(options);
	    }

	    return this.resolve(key, options) !== undefined;
	  };

	  Translator.prototype.extractFromKey = function extractFromKey(key, options) {
	    var nsSeparator = options.nsSeparator || this.options.nsSeparator;
	    if (nsSeparator === undefined) nsSeparator = ':';

	    var namespaces = options.ns || this.options.defaultNS;
	    if (nsSeparator && key.indexOf(nsSeparator) > -1) {
	      var parts = key.split(nsSeparator);
	      namespaces = parts[0];
	      key = parts[1];
	    }
	    if (typeof namespaces === 'string') namespaces = [namespaces];

	    return {
	      key: key,
	      namespaces: namespaces
	    };
	  };

	  Translator.prototype.translate = function translate(keys) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
	      options = this.options.overloadTranslationOptionHandler(arguments);
	    } else if (this.options.compatibilityAPI === 'v1') {
	      options = convertTOptions(options);
	    }

	    // non valid keys handling
	    if (keys === undefined || keys === null || keys === '') return '';
	    if (typeof keys === 'number') keys = String(keys);
	    if (typeof keys === 'string') keys = [keys];

	    // return key on CIMode
	    var lng = options.lng || this.language;
	    if (lng && lng.toLowerCase() === 'cimode') return keys[keys.length - 1];

	    // separators
	    var keySeparator = options.keySeparator || this.options.keySeparator || '.';

	    // get namespace(s)

	    var _extractFromKey = this.extractFromKey(keys[keys.length - 1], options);

	    var key = _extractFromKey.key;
	    var namespaces = _extractFromKey.namespaces;

	    var namespace = namespaces[namespaces.length - 1];

	    // resolve from store
	    var res = this.resolve(keys, options);

	    var resType = Object.prototype.toString.apply(res);
	    var noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
	    var joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;

	    // object
	    if (res && typeof res !== 'string' && noObject.indexOf(resType) < 0 && !(joinArrays && resType === '[object Array]')) {
	      if (!options.returnObjects && !this.options.returnObjects) {
	        this.logger.warn('accessing an object - but returnObjects options is not enabled!');
	        return this.options.returnedObjectHandler ? this.options.returnedObjectHandler(key, res, options) : 'key \'' + key + ' (' + this.language + ')\' returned an object instead of string.';
	      }

	      var copy = resType === '[object Array]' ? [] : {}; // apply child translation on a copy

	      for (var m in res) {
	        copy[m] = this.translate('' + key + keySeparator + m, _extends({ joinArrays: false, ns: namespaces }, options));
	      }
	      res = copy;
	    }
	    // array special treatment
	    else if (joinArrays && resType === '[object Array]') {
	        res = res.join(joinArrays);
	        if (res) res = this.extendTranslation(res, key, options);
	      }
	      // string, empty or null
	      else {
	          var usedDefault = false,
	              usedKey = false;

	          // fallback value
	          if (!this.isValidLookup(res) && options.defaultValue !== undefined) {
	            usedDefault = true;
	            res = options.defaultValue;
	          }
	          if (!this.isValidLookup(res)) {
	            usedKey = true;
	            res = key;
	          }

	          // save missing
	          if (usedKey || usedDefault) {
	            this.logger.log('missingKey', lng, namespace, key, res);

	            var lngs = [];
	            if (this.options.saveMissingTo === 'fallback' && this.options.fallbackLng && this.options.fallbackLng[0]) {
	              for (var i = 0; i < this.options.fallbackLng.length; i++) {
	                lngs.push(this.options.fallbackLng[i]);
	              }
	            } else if (this.options.saveMissingTo === 'all') {
	              lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
	            } else {
	              //(this.options.saveMissingTo === 'current' || (this.options.saveMissingTo === 'fallback' && this.options.fallbackLng[0] === false) ) {
	              lngs.push(options.lng || this.language);
	            }

	            if (this.options.saveMissing) {
	              if (this.options.missingKeyHandler) {
	                this.options.missingKeyHandler(lngs, namespace, key, res);
	              } else if (this.backendConnector && this.backendConnector.saveMissing) {
	                this.backendConnector.saveMissing(lngs, namespace, key, res);
	              }
	            }

	            this.emit('missingKey', lngs, namespace, key, res);
	          }

	          // extend
	          res = this.extendTranslation(res, key, options);

	          // append namespace if still key
	          if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = namespace + ':' + key;

	          // parseMissingKeyHandler
	          if (usedKey && this.options.parseMissingKeyHandler) res = this.options.parseMissingKeyHandler(res);
	        }

	    // return
	    return res;
	  };

	  Translator.prototype.extendTranslation = function extendTranslation(res, key, options) {
	    var _this2 = this;

	    if (options.interpolation) this.interpolator.init(options);

	    // interpolate
	    var data = options.replace && typeof options.replace !== 'string' ? options.replace : options;
	    if (this.options.interpolation.defaultVariables) data = _extends({}, this.options.interpolation.defaultVariables, data);
	    res = this.interpolator.interpolate(res, data, this.language);

	    // nesting
	    res = this.interpolator.nest(res, function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return _this2.translate.apply(_this2, args);
	    }, options);

	    if (options.interpolation) this.interpolator.reset();

	    // post process
	    var postProcess = options.postProcess || this.options.postProcess;
	    var postProcessorNames = typeof postProcess === 'string' ? [postProcess] : postProcess;

	    if (res !== undefined && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
	      res = postProcessor.handle(postProcessorNames, res, key, options, this);
	    }

	    return res;
	  };

	  Translator.prototype.resolve = function resolve(keys) {
	    var _this3 = this;

	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var found = void 0;

	    if (typeof keys === 'string') keys = [keys];

	    // forEach possible key
	    keys.forEach(function (k) {
	      if (_this3.isValidLookup(found)) return;

	      var _extractFromKey2 = _this3.extractFromKey(k, options);

	      var key = _extractFromKey2.key;
	      var namespaces = _extractFromKey2.namespaces;

	      if (_this3.options.fallbackNS) namespaces = namespaces.concat(_this3.options.fallbackNS);

	      var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
	      var needsContextHandling = options.context !== undefined && typeof options.context === 'string' && options.context !== '';

	      var codes = options.lngs ? options.lngs : _this3.languageUtils.toResolveHierarchy(options.lng || _this3.language);

	      namespaces.forEach(function (ns) {
	        if (_this3.isValidLookup(found)) return;

	        codes.forEach(function (code) {
	          if (_this3.isValidLookup(found)) return;

	          var finalKey = key;
	          var finalKeys = [finalKey];

	          var pluralSuffix = void 0;
	          if (needsPluralHandling) pluralSuffix = _this3.pluralResolver.getSuffix(code, options.count);

	          // fallback for plural if context not found
	          if (needsPluralHandling && needsContextHandling) finalKeys.push(finalKey + pluralSuffix);

	          // get key for context if needed
	          if (needsContextHandling) finalKeys.push(finalKey += '' + _this3.options.contextSeparator + options.context);

	          // get key for plural if needed
	          if (needsPluralHandling) finalKeys.push(finalKey += pluralSuffix);

	          // iterate over finalKeys starting with most specific pluralkey (-> contextkey only) -> singularkey only
	          var possibleKey = void 0;
	          while (possibleKey = finalKeys.pop()) {
	            if (_this3.isValidLookup(found)) continue;
	            found = _this3.getResource(code, ns, possibleKey, options);
	          }
	        });
	      });
	    });

	    return found;
	  };

	  Translator.prototype.isValidLookup = function isValidLookup(res) {
	    return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
	  };

	  Translator.prototype.getResource = function getResource(code, ns, key) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	    return this.resourceStore.getResource(code, ns, key, options);
	  };

	  return Translator;
	}(EventEmitter);

	function capitalize(string) {
	  return string.charAt(0).toUpperCase() + string.slice(1);
	}

	var LanguageUtil = function () {
	  function LanguageUtil(options) {
	    classCallCheck(this, LanguageUtil);

	    this.options = options;

	    this.whitelist = this.options.whitelist || false;
	    this.logger = baseLogger.create('languageUtils');
	  }

	  LanguageUtil.prototype.getLanguagePartFromCode = function getLanguagePartFromCode(code) {
	    if (code.indexOf('-') < 0) return code;

	    var specialCases = ['NB-NO', 'NN-NO', 'nb-NO', 'nn-NO', 'nb-no', 'nn-no'];
	    var p = code.split('-');
	    return this.formatLanguageCode(specialCases.indexOf(code) > -1 ? p[1].toLowerCase() : p[0]);
	  };

	  LanguageUtil.prototype.formatLanguageCode = function formatLanguageCode(code) {
	    // http://www.iana.org/assignments/language-tags/language-tags.xhtml
	    if (typeof code === 'string' && code.indexOf('-') > -1) {
	      var specialCases = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];
	      var p = code.split('-');

	      if (this.options.lowerCaseLng) {
	        p = p.map(function (part) {
	          return part.toLowerCase();
	        });
	      } else if (p.length === 2) {
	        p[0] = p[0].toLowerCase();
	        p[1] = p[1].toUpperCase();

	        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
	      } else if (p.length === 3) {
	        p[0] = p[0].toLowerCase();

	        // if lenght 2 guess it's a country
	        if (p[1].length === 2) p[1] = p[1].toUpperCase();
	        if (p[0] !== 'sgn' && p[2].length === 2) p[2] = p[2].toUpperCase();

	        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
	        if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());
	      }

	      return p.join('-');
	    } else {
	      return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
	    }
	  };

	  LanguageUtil.prototype.isWhitelisted = function isWhitelisted(code, exactMatch) {
	    if (this.options.load === 'languageOnly' || this.options.nonExplicitWhitelist && !exactMatch) {
	      code = this.getLanguagePartFromCode(code);
	    }
	    return !this.whitelist || !this.whitelist.length || this.whitelist.indexOf(code) > -1 ? true : false;
	  };

	  LanguageUtil.prototype.toResolveHierarchy = function toResolveHierarchy(code, fallbackCode) {
	    var _this = this;

	    fallbackCode = fallbackCode || this.options.fallbackLng || [];
	    if (typeof fallbackCode === 'string') fallbackCode = [fallbackCode];

	    var codes = [];
	    var addCode = function addCode(code) {
	      var exactMatch = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	      if (_this.isWhitelisted(code, exactMatch)) {
	        codes.push(code);
	      } else {
	        _this.logger.warn('rejecting non-whitelisted language code: ' + code);
	      }
	    };

	    if (typeof code === 'string' && code.indexOf('-') > -1) {
	      if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code), true);
	      if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
	    } else if (typeof code === 'string') {
	      addCode(this.formatLanguageCode(code));
	    }

	    fallbackCode.forEach(function (fc) {
	      if (codes.indexOf(fc) < 0) addCode(_this.formatLanguageCode(fc));
	    });

	    return codes;
	  };

	  return LanguageUtil;
	}();

	;

	// definition http://translate.sourceforge.net/wiki/l10n/pluralforms
	/* eslint-disable */
	var sets = [{ lngs: ['ach', 'ak', 'am', 'arn', 'br', 'fil', 'gun', 'ln', 'mfe', 'mg', 'mi', 'oc', 'tg', 'ti', 'tr', 'uz', 'wa'], nr: [1, 2], fc: 1 }, { lngs: ['af', 'an', 'ast', 'az', 'bg', 'bn', 'ca', 'da', 'de', 'dev', 'el', 'en', 'eo', 'es', 'es_ar', 'et', 'eu', 'fi', 'fo', 'fur', 'fy', 'gl', 'gu', 'ha', 'he', 'hi', 'hu', 'hy', 'ia', 'it', 'kn', 'ku', 'lb', 'mai', 'ml', 'mn', 'mr', 'nah', 'nap', 'nb', 'ne', 'nl', 'nn', 'no', 'nso', 'pa', 'pap', 'pms', 'ps', 'pt', 'pt_br', 'rm', 'sco', 'se', 'si', 'so', 'son', 'sq', 'sv', 'sw', 'ta', 'te', 'tk', 'ur', 'yo'], nr: [1, 2], fc: 2 }, { lngs: ['ay', 'bo', 'cgg', 'fa', 'id', 'ja', 'jbo', 'ka', 'kk', 'km', 'ko', 'ky', 'lo', 'ms', 'sah', 'su', 'th', 'tt', 'ug', 'vi', 'wo', 'zh'], nr: [1], fc: 3 }, { lngs: ['be', 'bs', 'dz', 'hr', 'ru', 'sr', 'uk'], nr: [1, 2, 5], fc: 4 }, { lngs: ['ar'], nr: [0, 1, 2, 3, 11, 100], fc: 5 }, { lngs: ['cs', 'sk'], nr: [1, 2, 5], fc: 6 }, { lngs: ['csb', 'pl'], nr: [1, 2, 5], fc: 7 }, { lngs: ['cy'], nr: [1, 2, 3, 8], fc: 8 }, { lngs: ['fr'], nr: [1, 2], fc: 9 }, { lngs: ['ga'], nr: [1, 2, 3, 7, 11], fc: 10 }, { lngs: ['gd'], nr: [1, 2, 3, 20], fc: 11 }, { lngs: ['is'], nr: [1, 2], fc: 12 }, { lngs: ['jv'], nr: [0, 1], fc: 13 }, { lngs: ['kw'], nr: [1, 2, 3, 4], fc: 14 }, { lngs: ['lt'], nr: [1, 2, 10], fc: 15 }, { lngs: ['lv'], nr: [1, 2, 0], fc: 16 }, { lngs: ['mk'], nr: [1, 2], fc: 17 }, { lngs: ['mnk'], nr: [0, 1, 2], fc: 18 }, { lngs: ['mt'], nr: [1, 2, 11, 20], fc: 19 }, { lngs: ['or'], nr: [2, 1], fc: 2 }, { lngs: ['ro'], nr: [1, 2, 20], fc: 20 }, { lngs: ['sl'], nr: [5, 1, 2, 3], fc: 21 }];

	var _rulesPluralsTypes = {
	  1: function _(n) {
	    return Number(n > 1);
	  },
	  2: function _(n) {
	    return Number(n != 1);
	  },
	  3: function _(n) {
	    return 0;
	  },
	  4: function _(n) {
	    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
	  },
	  5: function _(n) {
	    return Number(n === 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
	  },
	  6: function _(n) {
	    return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);
	  },
	  7: function _(n) {
	    return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
	  },
	  8: function _(n) {
	    return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);
	  },
	  9: function _(n) {
	    return Number(n >= 2);
	  },
	  10: function _(n) {
	    return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
	  },
	  11: function _(n) {
	    return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);
	  },
	  12: function _(n) {
	    return Number(n % 10 != 1 || n % 100 == 11);
	  },
	  13: function _(n) {
	    return Number(n !== 0);
	  },
	  14: function _(n) {
	    return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);
	  },
	  15: function _(n) {
	    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
	  },
	  16: function _(n) {
	    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);
	  },
	  17: function _(n) {
	    return Number(n == 1 || n % 10 == 1 ? 0 : 1);
	  },
	  18: function _(n) {
	    return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
	  },
	  19: function _(n) {
	    return Number(n == 1 ? 0 : n === 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
	  },
	  20: function _(n) {
	    return Number(n == 1 ? 0 : n === 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
	  },
	  21: function _(n) {
	    return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
	  }
	};
	/* eslint-enable */

	function createRules() {
	  var l,
	      rules = {};
	  sets.forEach(function (set) {
	    set.lngs.forEach(function (l) {
	      return rules[l] = {
	        numbers: set.nr,
	        plurals: _rulesPluralsTypes[set.fc]
	      };
	    });
	  });
	  return rules;
	}

	var PluralResolver = function () {
	  function PluralResolver(languageUtils) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    classCallCheck(this, PluralResolver);

	    this.languageUtils = languageUtils;
	    this.options = options;

	    this.logger = baseLogger.create('pluralResolver');

	    this.rules = createRules();
	  }

	  PluralResolver.prototype.addRule = function addRule(lng, obj) {
	    this.rules[lng] = obj;
	  };

	  PluralResolver.prototype.getRule = function getRule(code) {
	    return this.rules[this.languageUtils.getLanguagePartFromCode(code)];
	  };

	  PluralResolver.prototype.needsPlural = function needsPlural(code) {
	    var rule = this.getRule(code);

	    return rule && rule.numbers.length <= 1 ? false : true;
	  };

	  PluralResolver.prototype.getSuffix = function getSuffix(code, count) {
	    var _this = this;

	    var rule = this.getRule(code);

	    if (rule) {
	      var _ret = function () {
	        if (rule.numbers.length === 1) return {
	            v: ''
	          }; // only singular

	        var idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
	        var suffix = rule.numbers[idx];

	        // special treatment for lngs only having singular and plural
	        if (rule.numbers.length === 2 && rule.numbers[0] === 1) {
	          if (suffix === 2) {
	            suffix = 'plural';
	          } else if (suffix === 1) {
	            suffix = '';
	          }
	        }

	        var returnSuffix = function returnSuffix() {
	          return _this.options.prepend && suffix.toString() ? _this.options.prepend + suffix.toString() : suffix.toString();
	        };

	        // COMPATIBILITY JSON
	        // v1
	        if (_this.options.compatibilityJSON === 'v1') {
	          if (suffix === 1) return {
	              v: ''
	            };
	          if (typeof suffix === 'number') return {
	              v: '_plural_' + suffix.toString()
	            };
	          return {
	            v: returnSuffix()
	          };
	        }
	        // v2
	        else if (_this.options.compatibilityJSON === 'v2' || rule.numbers.length === 2 && rule.numbers[0] === 1) {
	            return {
	              v: returnSuffix()
	            };
	          }
	          // v3 - gettext index
	          else if (rule.numbers.length === 2 && rule.numbers[0] === 1) {
	              return {
	                v: returnSuffix()
	              };
	            }
	        return {
	          v: _this.options.prepend && idx.toString() ? _this.options.prepend + idx.toString() : idx.toString()
	        };
	      }();

	      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    } else {
	      this.logger.warn('no plural rule found for: ' + code);
	      return '';
	    }
	  };

	  return PluralResolver;
	}();

	;

	var Interpolator = function () {
	  function Interpolator() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    classCallCheck(this, Interpolator);

	    this.logger = baseLogger.create('interpolator');

	    this.init(options, true);
	  }

	  Interpolator.prototype.init = function init() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var reset = arguments[1];

	    if (reset) {
	      this.options = options;
	      this.format = options.interpolation && options.interpolation.format || function (value) {
	        return value;
	      };
	    }
	    if (!options.interpolation) options.interpolation = { escapeValue: true };

	    var iOpts = options.interpolation;

	    this.escapeValue = iOpts.escapeValue !== undefined ? iOpts.escapeValue : true;

	    this.prefix = iOpts.prefix ? regexEscape(iOpts.prefix) : iOpts.prefixEscaped || '{{';
	    this.suffix = iOpts.suffix ? regexEscape(iOpts.suffix) : iOpts.suffixEscaped || '}}';
	    this.formatSeparator = iOpts.formatSeparator ? regexEscape(iOpts.formatSeparator) : iOpts.formatSeparator || ',';

	    this.unescapePrefix = iOpts.unescapeSuffix ? '' : iOpts.unescapePrefix || '-';
	    this.unescapeSuffix = this.unescapePrefix ? '' : iOpts.unescapeSuffix || '';

	    this.nestingPrefix = iOpts.nestingPrefix ? regexEscape(iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || regexEscape('$t(');
	    this.nestingSuffix = iOpts.nestingSuffix ? regexEscape(iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || regexEscape(')');

	    // the regexp
	    this.resetRegExp();
	  };

	  Interpolator.prototype.reset = function reset() {
	    if (this.options) this.init(this.options);
	  };

	  Interpolator.prototype.resetRegExp = function resetRegExp() {
	    // the regexp
	    var regexpStr = this.prefix + '(.+?)' + this.suffix;
	    this.regexp = new RegExp(regexpStr, 'g');

	    var regexpUnescapeStr = this.prefix + this.unescapePrefix + '(.+?)' + this.unescapeSuffix + this.suffix;
	    this.regexpUnescape = new RegExp(regexpUnescapeStr, 'g');

	    var nestingRegexpStr = this.nestingPrefix + '(.+?)' + this.nestingSuffix;
	    this.nestingRegexp = new RegExp(nestingRegexpStr, 'g');
	  };

	  Interpolator.prototype.interpolate = function interpolate(str, data, lng) {
	    var _this = this;

	    var match = void 0,
	        value = void 0;

	    function regexSafe(val) {
	      return val.replace(/\$/g, '$$$$');
	    }

	    var handleFormat = function handleFormat(key) {
	      if (key.indexOf(_this.formatSeparator) < 0) return getPath(data, key);

	      var p = key.split(_this.formatSeparator);
	      var k = p.shift().trim();
	      var f = p.join(_this.formatSeparator).trim();

	      return _this.format(getPath(data, k), f, lng);
	    };

	    this.resetRegExp();

	    // unescape if has unescapePrefix/Suffix
	    while (match = this.regexpUnescape.exec(str)) {
	      var _value = handleFormat(match[1].trim());
	      str = str.replace(match[0], _value);
	      this.regexpUnescape.lastIndex = 0;
	    }

	    // regular escape on demand
	    while (match = this.regexp.exec(str)) {
	      value = handleFormat(match[1].trim());
	      if (typeof value !== 'string') value = makeString(value);
	      if (!value) {
	        this.logger.warn('missed to pass in variable ' + match[1] + ' for interpolating ' + str);
	        value = '';
	      }
	      value = this.escapeValue ? regexSafe(escape(value)) : regexSafe(value);
	      str = str.replace(match[0], value);
	      this.regexp.lastIndex = 0;
	    }
	    return str;
	  };

	  Interpolator.prototype.nest = function nest(str, fc) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    var match = void 0,
	        value = void 0;

	    var clonedOptions = JSON.parse(JSON.stringify(options));
	    clonedOptions.applyPostProcessor = false; // avoid post processing on nested lookup

	    function regexSafe(val) {
	      return val.replace(/\$/g, '$$$$');
	    }

	    // if value is something like "myKey": "lorem $(anotherKey, { "count": {{aValueInOptions}} })"
	    function handleHasOptions(key) {
	      if (key.indexOf(',') < 0) return key;

	      var p = key.split(',');
	      key = p.shift();
	      var optionsString = p.join(',');
	      optionsString = this.interpolate(optionsString, clonedOptions);

	      try {
	        clonedOptions = JSON.parse(optionsString);
	      } catch (e) {
	        this.logger.error('failed parsing options string in nesting for key ' + key, e);
	      }

	      return key;
	    }

	    // regular escape on demand
	    while (match = this.nestingRegexp.exec(str)) {
	      value = fc(handleHasOptions.call(this, match[1].trim()), clonedOptions);
	      if (typeof value !== 'string') value = makeString(value);
	      if (!value) {
	        this.logger.warn('missed to pass in variable ' + match[1] + ' for interpolating ' + str);
	        value = '';
	      }
	      value = this.escapeValue ? regexSafe(escape(value)) : regexSafe(value);
	      str = str.replace(match[0], value);
	      this.regexp.lastIndex = 0;
	    }
	    return str;
	  };

	  return Interpolator;
	}();

	function remove(arr, what) {
	  var found = arr.indexOf(what);

	  while (found !== -1) {
	    arr.splice(found, 1);
	    found = arr.indexOf(what);
	  }
	}

	var Connector = function (_EventEmitter) {
	  inherits(Connector, _EventEmitter);

	  function Connector(backend, store, services) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	    classCallCheck(this, Connector);

	    var _this = possibleConstructorReturn(this, _EventEmitter.call(this));

	    _this.backend = backend;
	    _this.store = store;
	    _this.services = services;
	    _this.options = options;
	    _this.logger = baseLogger.create('backendConnector');

	    _this.state = {};
	    _this.queue = [];

	    _this.backend && _this.backend.init && _this.backend.init(services, options.backend, options);
	    return _this;
	  }

	  Connector.prototype.queueLoad = function queueLoad(languages, namespaces, callback) {
	    var _this2 = this;

	    // find what needs to be loaded
	    var toLoad = [],
	        pending = [],
	        toLoadLanguages = [],
	        toLoadNamespaces = [];

	    languages.forEach(function (lng) {
	      var hasAllNamespaces = true;

	      namespaces.forEach(function (ns) {
	        var name = lng + '|' + ns;

	        if (_this2.store.hasResourceBundle(lng, ns)) {
	          _this2.state[name] = 2; // loaded
	        } else if (_this2.state[name] < 0) {
	            // nothing to do for err
	          } else if (_this2.state[name] === 1) {
	              if (pending.indexOf(name) < 0) pending.push(name);
	            } else {
	              _this2.state[name] = 1; // pending

	              hasAllNamespaces = false;

	              if (pending.indexOf(name) < 0) pending.push(name);
	              if (toLoad.indexOf(name) < 0) toLoad.push(name);
	              if (toLoadNamespaces.indexOf(ns) < 0) toLoadNamespaces.push(ns);
	            }
	      });

	      if (!hasAllNamespaces) toLoadLanguages.push(lng);
	    });

	    if (toLoad.length || pending.length) {
	      this.queue.push({
	        pending: pending,
	        loaded: {},
	        errors: [],
	        callback: callback
	      });
	    }

	    return {
	      toLoad: toLoad,
	      pending: pending,
	      toLoadLanguages: toLoadLanguages,
	      toLoadNamespaces: toLoadNamespaces
	    };
	  };

	  Connector.prototype.loaded = function loaded(name, err, data) {
	    var _this3 = this;

	    var _name$split = name.split('|');

	    var _name$split2 = slicedToArray(_name$split, 2);

	    var lng = _name$split2[0];
	    var ns = _name$split2[1];


	    if (err) this.emit('failedLoading', lng, ns, err);

	    if (data) {
	      this.store.addResourceBundle(lng, ns, data);
	    }

	    // set loaded
	    this.state[name] = err ? -1 : 2;
	    // callback if ready
	    this.queue.forEach(function (q) {
	      pushPath(q.loaded, [lng], ns);
	      remove(q.pending, name);

	      if (err) q.errors.push(err);

	      if (q.pending.length === 0 && !q.done) {
	        q.errors.length ? q.callback(q.errors) : q.callback();
	        _this3.emit('loaded', q.loaded);
	        q.done = true;
	      }
	    });

	    // remove done load requests
	    this.queue = this.queue.filter(function (q) {
	      return !q.done;
	    });
	  };

	  Connector.prototype.read = function read(lng, ns, fcName, tried, wait, callback) {
	    var _this4 = this;

	    if (!tried) tried = 0;
	    if (!wait) wait = 250;

	    if (!lng.length) return callback(null, {}); // noting to load

	    this.backend[fcName](lng, ns, function (err, data) {
	      if (err && data /* = retryFlag */ && tried < 5) {
	        setTimeout(function () {
	          _this4.read.call(_this4, lng, ns, fcName, ++tried, wait * 2, callback);
	        }, wait);
	        return;
	      }
	      callback(err, data);
	    });
	  };

	  Connector.prototype.load = function load(languages, namespaces, callback) {
	    var _this5 = this;

	    if (!this.backend) {
	      this.logger.warn('No backend was added via i18next.use. Will not load resources.');
	      return callback && callback();
	    }
	    var options = _extends({}, this.backend.options, this.options.backend);

	    if (typeof languages === 'string') languages = this.services.languageUtils.toResolveHierarchy(languages);
	    if (typeof namespaces === 'string') namespaces = [namespaces];

	    var toLoad = this.queueLoad(languages, namespaces, callback);
	    if (!toLoad.toLoad.length) {
	      if (!toLoad.pending.length) callback(); // nothing to load and no pendings...callback now
	      return; // pendings will trigger callback
	    }

	    // load with multi-load
	    if (options.allowMultiLoading && this.backend.readMulti) {
	      this.read(toLoad.toLoadLanguages, toLoad.toLoadNamespaces, 'readMulti', null, null, function (err, data) {
	        if (err) _this5.logger.warn('loading namespaces ' + toLoad.toLoadNamespaces.join(', ') + ' for languages ' + toLoad.toLoadLanguages.join(', ') + ' via multiloading failed', err);
	        if (!err && data) _this5.logger.log('loaded namespaces ' + toLoad.toLoadNamespaces.join(', ') + ' for languages ' + toLoad.toLoadLanguages.join(', ') + ' via multiloading', data);

	        toLoad.toLoad.forEach(function (name) {
	          var _name$split3 = name.split('|');

	          var _name$split4 = slicedToArray(_name$split3, 2);

	          var l = _name$split4[0];
	          var n = _name$split4[1];


	          var bundle = getPath(data, [l, n]);
	          if (bundle) {
	            _this5.loaded(name, err, bundle);
	          } else {
	            var _err = 'loading namespace ' + n + ' for language ' + l + ' via multiloading failed';
	            _this5.loaded(name, _err);
	            _this5.logger.error(_err);
	          }
	        });
	      });
	    }

	    // load one by one
	    else {
	        (function () {
	          var readOne = function readOne(name) {
	            var _this6 = this;

	            var _name$split5 = name.split('|');

	            var _name$split6 = slicedToArray(_name$split5, 2);

	            var lng = _name$split6[0];
	            var ns = _name$split6[1];


	            this.read(lng, ns, 'read', null, null, function (err, data) {
	              if (err) _this6.logger.warn('loading namespace ' + ns + ' for language ' + lng + ' failed', err);
	              if (!err && data) _this6.logger.log('loaded namespace ' + ns + ' for language ' + lng, data);

	              _this6.loaded(name, err, data);
	            });
	          };

	          ;

	          toLoad.toLoad.forEach(function (name) {
	            readOne.call(_this5, name);
	          });
	        })();
	      }
	  };

	  Connector.prototype.reload = function reload(languages, namespaces) {
	    var _this7 = this;

	    if (!this.backend) {
	      this.logger.warn('No backend was added via i18next.use. Will not load resources.');
	    }
	    var options = _extends({}, this.backend.options, this.options.backend);

	    if (typeof languages === 'string') languages = this.services.languageUtils.toResolveHierarchy(languages);
	    if (typeof namespaces === 'string') namespaces = [namespaces];

	    // load with multi-load
	    if (options.allowMultiLoading && this.backend.readMulti) {
	      this.read(languages, namespaces, 'readMulti', null, null, function (err, data) {
	        if (err) _this7.logger.warn('reloading namespaces ' + namespaces.join(', ') + ' for languages ' + languages.join(', ') + ' via multiloading failed', err);
	        if (!err && data) _this7.logger.log('reloaded namespaces ' + namespaces.join(', ') + ' for languages ' + languages.join(', ') + ' via multiloading', data);

	        languages.forEach(function (l) {
	          namespaces.forEach(function (n) {
	            var bundle = getPath(data, [l, n]);
	            if (bundle) {
	              _this7.loaded(l + '|' + n, err, bundle);
	            } else {
	              var _err2 = 'reloading namespace ' + n + ' for language ' + l + ' via multiloading failed';
	              _this7.loaded(l + '|' + n, _err2);
	              _this7.logger.error(_err2);
	            }
	          });
	        });
	      });
	    }

	    // load one by one
	    else {
	        (function () {
	          var readOne = function readOne(name) {
	            var _this8 = this;

	            var _name$split7 = name.split('|');

	            var _name$split8 = slicedToArray(_name$split7, 2);

	            var lng = _name$split8[0];
	            var ns = _name$split8[1];


	            this.read(lng, ns, 'read', null, null, function (err, data) {
	              if (err) _this8.logger.warn('reloading namespace ' + ns + ' for language ' + lng + ' failed', err);
	              if (!err && data) _this8.logger.log('reloaded namespace ' + ns + ' for language ' + lng, data);

	              _this8.loaded(name, err, data);
	            });
	          };

	          ;

	          languages.forEach(function (l) {
	            namespaces.forEach(function (n) {
	              readOne.call(_this7, l + '|' + n);
	            });
	          });
	        })();
	      }
	  };

	  Connector.prototype.saveMissing = function saveMissing(languages, namespace, key, fallbackValue) {
	    if (this.backend && this.backend.create) this.backend.create(languages, namespace, key, fallbackValue);

	    // write to store to avoid resending
	    if (!languages || !languages[0]) return;
	    this.store.addResource(languages[0], namespace, key, fallbackValue);
	  };

	  return Connector;
	}(EventEmitter);

	var Connector$1 = function (_EventEmitter) {
	  inherits(Connector, _EventEmitter);

	  function Connector(cache, store, services) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	    classCallCheck(this, Connector);

	    var _this = possibleConstructorReturn(this, _EventEmitter.call(this));

	    _this.cache = cache;
	    _this.store = store;
	    _this.services = services;
	    _this.options = options;
	    _this.logger = baseLogger.create('cacheConnector');

	    _this.cache && _this.cache.init && _this.cache.init(services, options.cache, options);
	    return _this;
	  }

	  Connector.prototype.load = function load(languages, namespaces, callback) {
	    var _this2 = this;

	    if (!this.cache) return callback && callback();
	    var options = _extends({}, this.cache.options, this.options.cache);

	    if (typeof languages === 'string') languages = this.services.languageUtils.toResolveHierarchy(languages);
	    if (typeof namespaces === 'string') namespaces = [namespaces];

	    if (options.enabled) {
	      this.cache.load(languages, function (err, data) {
	        if (err) _this2.logger.error('loading languages ' + languages.join(', ') + ' from cache failed', err);
	        if (data) {
	          for (var l in data) {
	            for (var n in data[l]) {
	              if (n === 'i18nStamp') continue;
	              var bundle = data[l][n];
	              if (bundle) _this2.store.addResourceBundle(l, n, bundle);
	            }
	          }
	        }
	        if (callback) callback();
	      });
	    } else {
	      if (callback) callback();
	    }
	  };

	  Connector.prototype.save = function save() {
	    if (this.cache && this.options.cache && this.options.cache.enabled) this.cache.save(this.store.data);
	  };

	  return Connector;
	}(EventEmitter);

	function get$1() {
	  return {
	    debug: false,
	    initImmediate: true,

	    ns: ['translation'],
	    defaultNS: ['translation'],
	    fallbackLng: ['dev'],
	    fallbackNS: false, // string or array of namespaces

	    whitelist: false, // array with whitelisted languages
	    nonExplicitWhitelist: false,
	    load: 'all', // | currentOnly | languageOnly
	    preload: false, // array with preload languages

	    keySeparator: '.',
	    nsSeparator: ':',
	    pluralSeparator: '_',
	    contextSeparator: '_',

	    saveMissing: false, // enable to send missing values
	    saveMissingTo: 'fallback', // 'current' || 'all'
	    missingKeyHandler: false, // function(lng, ns, key, fallbackValue) -> override if prefer on handling

	    postProcess: false, // string or array of postProcessor names
	    returnNull: true, // allows null value as valid translation
	    returnEmptyString: true, // allows empty string value as valid translation
	    returnObjects: false,
	    joinArrays: false, // or string to join array
	    returnedObjectHandler: function returnedObjectHandler() {}, // function(key, value, options) triggered if key returns object but returnObjects is set to false
	    parseMissingKeyHandler: false, // function(key) parsed a key that was not found in t() before returning
	    appendNamespaceToMissingKey: false,
	    overloadTranslationOptionHandler: function overloadTranslationOptionHandler(args) {
	      return { defaultValue: args[1] };
	    },

	    interpolation: {
	      escapeValue: true,
	      format: function format(value, _format, lng) {
	        return value;
	      },
	      prefix: '{{',
	      suffix: '}}',
	      formatSeparator: ',',
	      // prefixEscaped: '{{',
	      // suffixEscaped: '}}',
	      // unescapeSuffix: '',
	      unescapePrefix: '-',

	      nestingPrefix: '$t(',
	      nestingSuffix: ')',
	      // nestingPrefixEscaped: '$t(',
	      // nestingSuffixEscaped: ')',
	      defaultVariables: undefined // object that can have values to interpolate on - extends passed in interpolation data
	    }
	  };
	}

	function transformOptions(options) {
	  // create namespace object if namespace is passed in as string
	  if (typeof options.ns === 'string') options.ns = [options.ns];
	  if (typeof options.fallbackLng === 'string') options.fallbackLng = [options.fallbackLng];
	  if (typeof options.fallbackNS === 'string') options.fallbackNS = [options.fallbackNS];

	  // extend whitelist with cimode
	  if (options.whitelist && options.whitelist.indexOf('cimode') < 0) options.whitelist.push('cimode');

	  return options;
	}

	var I18n = function (_EventEmitter) {
	  inherits(I18n, _EventEmitter);

	  function I18n() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var callback = arguments[1];
	    classCallCheck(this, I18n);

	    var _this = possibleConstructorReturn(this, _EventEmitter.call(this));

	    _this.options = transformOptions(options);
	    _this.services = {};
	    _this.logger = baseLogger;
	    _this.modules = {};

	    if (callback && !_this.isInitialized) _this.init(options, callback);
	    return _this;
	  }

	  I18n.prototype.init = function init(options, callback) {
	    var _this2 = this;

	    if (typeof options === 'function') {
	      callback = options;
	      options = {};
	    }
	    if (!options) options = {};

	    if (options.compatibilityAPI === 'v1') {
	      this.options = _extends({}, get$1(), transformOptions(convertAPIOptions(options)), {});
	    } else if (options.compatibilityJSON === 'v1') {
	      this.options = _extends({}, get$1(), transformOptions(convertJSONOptions(options)), {});
	    } else {
	      this.options = _extends({}, get$1(), this.options, transformOptions(options));
	    }
	    if (!callback) callback = function callback() {};

	    function createClassOnDemand(ClassOrObject) {
	      if (!ClassOrObject) return;
	      if (typeof ClassOrObject === 'function') return new ClassOrObject();
	      return ClassOrObject;
	    }

	    // init services
	    if (!this.options.isClone) {
	      if (this.modules.logger) {
	        baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
	      } else {
	        baseLogger.init(null, this.options);
	      }

	      var lu = new LanguageUtil(this.options);
	      this.store = new ResourceStore(this.options.resources, this.options);

	      var s = this.services;
	      s.logger = baseLogger;
	      s.resourceStore = this.store;
	      s.resourceStore.on('added removed', function (lng, ns) {
	        s.cacheConnector.save();
	      });
	      s.languageUtils = lu;
	      s.pluralResolver = new PluralResolver(lu, { prepend: this.options.pluralSeparator, compatibilityJSON: this.options.compatibilityJSON });
	      s.interpolator = new Interpolator(this.options);

	      s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
	      // pipe events from backendConnector
	      s.backendConnector.on('*', function (event) {
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }

	        _this2.emit.apply(_this2, [event].concat(args));
	      });

	      s.backendConnector.on('loaded', function (loaded) {
	        s.cacheConnector.save();
	      });

	      s.cacheConnector = new Connector$1(createClassOnDemand(this.modules.cache), s.resourceStore, s, this.options);
	      // pipe events from backendConnector
	      s.cacheConnector.on('*', function (event) {
	        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	          args[_key2 - 1] = arguments[_key2];
	        }

	        _this2.emit.apply(_this2, [event].concat(args));
	      });

	      if (this.modules.languageDetector) {
	        s.languageDetector = createClassOnDemand(this.modules.languageDetector);
	        s.languageDetector.init(s, this.options.detection, this.options);
	      }

	      this.translator = new Translator(this.services, this.options);
	      // pipe events from translator
	      this.translator.on('*', function (event) {
	        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	          args[_key3 - 1] = arguments[_key3];
	        }

	        _this2.emit.apply(_this2, [event].concat(args));
	      });
	    }

	    // append api
	    var storeApi = ['getResource', 'addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle', 'hasResourceBundle', 'getResourceBundle'];
	    storeApi.forEach(function (fcName) {
	      _this2[fcName] = function () {
	        return this.store[fcName].apply(this.store, arguments);
	      };
	    });

	    // TODO: COMPATIBILITY remove this
	    if (this.options.compatibilityAPI === 'v1') appendBackwardsAPI(this);

	    var load = function load() {
	      _this2.changeLanguage(_this2.options.lng, function (err, t) {
	        _this2.emit('initialized', _this2.options);
	        _this2.logger.log('initialized', _this2.options);

	        callback(err, t);
	      });
	    };

	    if (this.options.resources || !this.options.initImmediate) {
	      load();
	    } else {
	      setTimeout(load, 0);
	    }

	    return this;
	  };

	  I18n.prototype.loadResources = function loadResources(callback) {
	    var _this3 = this;

	    if (!callback) callback = function callback() {};

	    if (!this.options.resources) {
	      var _ret = function () {
	        if (_this3.language && _this3.language.toLowerCase() === 'cimode') return {
	            v: callback()
	          }; // avoid loading resources for cimode

	        var toLoad = [];

	        var append = function append(lng) {
	          var lngs = _this3.services.languageUtils.toResolveHierarchy(lng);
	          lngs.forEach(function (l) {
	            if (toLoad.indexOf(l) < 0) toLoad.push(l);
	          });
	        };

	        append(_this3.language);

	        if (_this3.options.preload) {
	          _this3.options.preload.forEach(function (l) {
	            append(l);
	          });
	        }

	        _this3.services.cacheConnector.load(toLoad, _this3.options.ns, function () {
	          _this3.services.backendConnector.load(toLoad, _this3.options.ns, callback);
	        });
	      }();

	      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    } else {
	      callback(null);
	    }
	  };

	  I18n.prototype.reloadResources = function reloadResources(lngs, ns) {
	    if (!lngs) lngs = this.languages;
	    if (!ns) ns = this.options.ns;
	    this.services.backendConnector.reload(lngs, ns);
	  };

	  I18n.prototype.use = function use(module) {
	    if (module.type === 'backend') {
	      this.modules.backend = module;
	    }

	    if (module.type === 'cache') {
	      this.modules.cache = module;
	    }

	    if (module.type === 'logger' || module.log && module.warn && module.warn) {
	      this.modules.logger = module;
	    }

	    if (module.type === 'languageDetector') {
	      this.modules.languageDetector = module;
	    }

	    if (module.type === 'postProcessor') {
	      postProcessor.addPostProcessor(module);
	    }

	    return this;
	  };

	  I18n.prototype.changeLanguage = function changeLanguage(lng, callback) {
	    var _this4 = this;

	    var done = function done(err) {
	      if (lng) {
	        _this4.emit('languageChanged', lng);
	        _this4.logger.log('languageChanged', lng);
	      }

	      if (callback) callback(err, function () {
	        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	          args[_key4] = arguments[_key4];
	        }

	        return _this4.t.apply(_this4, args);
	      });
	    };

	    if (!lng && this.services.languageDetector) lng = this.services.languageDetector.detect();

	    if (lng) {
	      this.language = lng;
	      this.languages = this.services.languageUtils.toResolveHierarchy(lng);

	      this.translator.changeLanguage(lng);

	      if (this.services.languageDetector) this.services.languageDetector.cacheUserLanguage(lng);
	    }

	    this.loadResources(function (err) {
	      done(err);
	    });
	  };

	  I18n.prototype.getFixedT = function getFixedT(lng, ns) {
	    var _this5 = this;

	    var fixedT = function fixedT(key, options) {
	      options = options || {};
	      options.lng = options.lng || fixedT.lng;
	      options.ns = options.ns || fixedT.ns;
	      return _this5.t(key, options);
	    };
	    fixedT.lng = lng;
	    fixedT.ns = ns;
	    return fixedT;
	  };

	  I18n.prototype.t = function t() {
	    return this.translator && this.translator.translate.apply(this.translator, arguments);
	  };

	  I18n.prototype.exists = function exists() {
	    return this.translator && this.translator.exists.apply(this.translator, arguments);
	  };

	  I18n.prototype.setDefaultNamespace = function setDefaultNamespace(ns) {
	    this.options.defaultNS = ns;
	  };

	  I18n.prototype.loadNamespaces = function loadNamespaces(ns, callback) {
	    var _this6 = this;

	    if (!this.options.ns) return callback && callback();
	    if (typeof ns === 'string') ns = [ns];

	    ns.forEach(function (n) {
	      if (_this6.options.ns.indexOf(n) < 0) _this6.options.ns.push(n);
	    });

	    this.loadResources(callback);
	  };

	  I18n.prototype.loadLanguages = function loadLanguages(lngs, callback) {
	    if (typeof lngs === 'string') lngs = [lngs];
	    var preloaded = this.options.preload || [];

	    var newLngs = lngs.filter(function (lng) {
	      return preloaded.indexOf(lng) < 0;
	    });
	    // Exit early if all given languages are already preloaded
	    if (!newLngs.length) return callback();

	    this.options.preload = preloaded.concat(newLngs);
	    this.loadResources(callback);
	  };

	  I18n.prototype.dir = function dir(lng) {
	    if (!lng) lng = this.language;
	    if (!lng) return 'rtl';

	    var rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam'];

	    return rtlLngs.indexOf(this.services.languageUtils.getLanguagePartFromCode(lng)) >= 0 ? 'rtl' : 'ltr';
	  };

	  I18n.prototype.createInstance = function createInstance() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var callback = arguments[1];

	    return new I18n(options, callback);
	  };

	  I18n.prototype.cloneInstance = function cloneInstance() {
	    var _this7 = this;

	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var callback = arguments[1];

	    var clone = new I18n(_extends({}, options, this.options, { isClone: true }), callback);
	    var membersToCopy = ['store', 'translator', 'services', 'language'];
	    membersToCopy.forEach(function (m) {
	      clone[m] = _this7[m];
	    });

	    return clone;
	  };

	  return I18n;
	}(EventEmitter);

	var i18next = new I18n();

	return i18next;

}));