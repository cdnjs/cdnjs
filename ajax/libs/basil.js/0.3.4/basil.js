(function () {
	// Basil
	var Basil = function (options) {
		return Basil.utils.extend(Basil.plugins, new Basil.Storage().init(options));
	};

	// Version
	Basil.version = '0.3.4';

	// Utils
	Basil.utils = {
		extend: function () {
			var destination = typeof arguments[0] === 'object' ? arguments[0] : {};
			for (var i = 1; i < arguments.length; i++) {
				if (arguments[i] && typeof arguments[i] === 'object')
					for (var property in arguments[i])
						destination[property] = arguments[i][property];
			}
			return destination;
		},
		isArray: function (obj) {
			return Object.prototype.toString.call(obj) === '[object Array]';
		},
		registerPlugin: function (methods) {
			Basil.plugins = this.extend(methods, Basil.plugins);
		}
	};

	Basil.plugins = {};

	// Options
	Basil.options = Basil.utils.extend({
		namespace: 'b45i1',
		storage: null,
		storages: ['local', 'cookie', 'session', 'memory'],
		expireDays: 365
	}, window.Basil ? window.Basil.options : {});

	// Storage
	Basil.Storage = function () {
		var _salt = 'b45i1' + (Math.random() + 1)
				.toString(36)
				.substring(7),
			_storages = {},
			_toStoragesArray = function (storages) {
				if (!storages)
					return null;
				return Basil.utils.isArray(storages) ? storages : [storages];
			},
			_toStoredKey = function (namespace, name) {
				var key = '';
				if (typeof name === 'string')
					key = namespace + ':' + name;
				else if (Basil.utils.isArray(name)) {
					key = namespace;
					for (var i = 0; i < name.length; i++)
						if (name[i])
							key += ':' + name[i];
				}
				return key;
			},
			_toKeyName = function (namespace, name) {
				if (!namespace)
					return name;
				return name.replace(new RegExp('^' + namespace + ':'), '');
			},
			_toStoredValue = function (value) {
				return JSON.stringify(value);
			},
			_fromStoredValue = function (value) {
				return JSON.parse(value);
			};

		// local storage
		_storages.local = {
			engine: window.localStorage,
			check: function () {
				try {
					this.engine.setItem(_salt, true);
					this.engine.removeItem(_salt);
				} catch (e) {
					return false;
				}
				return true;
			},
			set: function (name, value, options) {
				if (!name)
					return;
				this.engine.setItem(name, value);
			},
			get: function (name) {
				return this.engine.getItem(name);
			},
			remove: function (name) {
				this.engine.removeItem(name);
			},
			reset: function (namespace) {
				for (var i = 0, key; i < this.engine.length; i++) {
					key = this.engine.key(i);
					if (!namespace || key.indexOf(namespace) === 0) {
						this.remove(key);
						i--;
					}
				}
			},
			keys: function (namespace) {
				var keys = [];
				for (var i = 0, key; i < this.engine.length; i++) {
					key = this.engine.key(i);
					if (!namespace || key.indexOf(namespace) === 0)
						keys.push(_toKeyName(namespace, key));
				}
				return keys;
			}
		};

		// session storage
		_storages.session = Basil.utils.extend({}, _storages.local, {
			engine: window.sessionStorage
		});

		// memory storage
		_storages.memory = {
			_hash: {},
			check: function () {
				return true;
			},
			set: function (name, value, options) {
				if (!name)
					return;
				this._hash[name] = value;
			},
			get: function (name) {
				return this._hash[name] || null;
			},
			remove: function (name) {
				delete this._hash[name];
			},
			reset: function (namespace) {
				for (var key in this._hash) {
					if (!namespace || key.indexOf(namespace) === 0)
						this.remove(key);
				}
			},
			keys: function (namespace) {
				var keys = [];
				for (var key in this._hash)
					if (!namespace || key.indexOf(namespace) === 0)
						keys.push(_toKeyName(namespace, key));
				return keys;
			}
		};

		// cookie storage
		_storages.cookie = {
			check: function () {
				return navigator.cookieEnabled;
			},
			set: function (name, value, options) {
				if (!name)
					return;
				options = options || {};
				var cookie = name + '=' + value;
				if (options.expireDays) {
					var date = new Date();
					date.setTime(date.getTime() + (options.expireDays * 24 * 60 * 60 * 1000));
					cookie += '; expires=' + date.toGMTString();
				}
				if (options.domain)
					cookie += '; domain=' + options.domain;
				document.cookie = cookie + '; path=/';
			},
			get: function (name) {
				var cookies = document.cookie.split(';');
				for (var i = 0, cookie; i < cookies.length; i++) {
					cookie = cookies[i].replace(/^\s*/, '');
					if (cookie.indexOf(name + '=') === 0)
						return cookie.substring(name.length + 1, cookie.length);
				}
				return null;
			},
			remove: function (name) {
				if (!name)
					return;
				// remove cookie from main domain
				this.set(name, '', { expireDays: -1 });
				// remove cookie from upper domains
				var domainParts = document.domain.split('.');
				for (var i = domainParts.length - 1; i > 0; i--) {
					this.set(name, '', { expireDays: -1, domain: '.' + domainParts.slice(- i).join('.') });
				}
			},
			reset: function (namespace) {
				var cookies = document.cookie.split(';');
				for (var i = 0, cookie, key; i < cookies.length; i++) {
					cookie = cookies[i].replace(/^\s*/, '');
					key = cookie.substr(0, cookie.indexOf('='));
					if (!namespace || key.indexOf(namespace) === 0)
						this.remove(key);
				}
			},
			keys: function (namespace) {
				var keys = [],
					cookies = document.cookie.split(';');
				for (var i = 0, cookie, key; i < cookies.length; i++) {
					cookie = cookies[i].replace(/^\s*/, '');
					key = cookie.substr(0, cookie.indexOf('='));
					if (!namespace || key.indexOf(namespace) === 0)
						keys.push(_toKeyName(namespace, key));
				}
				return keys;
			}
		};

		return {
			init: function (options) {
				this.options = Basil.utils.extend({}, Basil.options, options);
				this.supportedStorages = {};
				for (var i = 0, storage; i < this.options.storages.length; i++) {
					storage = this.options.storages[i];
					if (_storages.hasOwnProperty(storage))
						this.supportedStorages[storage] = _storages[storage];
				}
				this.defaultStorage = this.check(this.options.storage) ? this.options.storage : this.detect();
				return this;
			},
			detect: function () {
				for (var storage in this.supportedStorages)
					if (this.check(storage))
						return storage;
				return null;
			},
			check: function (storage) {
				storage = storage || this.defaultStorage;
				if (this.supportedStorages.hasOwnProperty(storage))
					return this.supportedStorages[storage].check();
				return false;
			},
			set: function (name, value, options) {
				options = options || {};
				if (!(name = _toStoredKey(options.namespace || this.options.namespace, name)))
					return;
				value = _toStoredValue(value);
				options = Basil.utils.extend({
					expireDays: this.options.expireDays
				}, options);
				var storages = _toStoragesArray(options.storages) || [this.defaultStorage];
				for (var i = 0, storage; i < storages.length; i++) {
					storage = storages[i];
					if (!this.check(storage))
						continue;
					_storages[storage].set(name, value, options);
				}
			},
			get: function (name, options) {
				options = options || {};
				if (!(name = _toStoredKey(options.namespace || this.options.namespace, name)))
					return null;
				var value = null,
					storages = _toStoragesArray(options.storages) || [this.defaultStorage];
				for (var i = 0, storage; value === null && i < storages.length; i++) {
					storage = storages[i];
					if (!this.check(storage))
						continue;
					value = _fromStoredValue(_storages[storage].get(name));
				}
				return value;
			},
			remove: function (name, options) {
				options = options || {};
				if (!(name = _toStoredKey(options.namespace || this.options.namespace, name)))
					return null;
				var storages = _toStoragesArray(options.storages) || [this.defaultStorage];
				for (var i = 0, storage; i < storages.length; i++) {
					storage = storages[i];
					if (!this.check(storage))
						continue;
					_storages[storage].remove(name);
				}
			},
			reset: function (options) {
				options = options || {};
				var storages = _toStoragesArray(options.storages) || [this.defaultStorage],
					namespace = options.namespace || this.options.namespace;
				for (var i = 0, storage; i < storages.length; i++) {
					storage = storages[i];
					if (!this.check(storage))
						continue;
					_storages[storage].reset(namespace);
				}
			},
			keys: function (options) {
				options = options || {};
				var keys = [];
				for (var key in this.keysMap(options))
					keys.push(key);
				return keys;
			},
			keysMap: function (options) {
				options = options || {};
				var map = {},
					storages = _toStoragesArray(options.storages) || this.options.storages,
					namespace = options.namespace || this.options.namespace;
				for (var i = 0, storage, storageKeys; i < storages.length; i++) {
					storage = storages[i];
					if (!this.check(storage))
						continue;
					storageKeys = _storages[storage].keys(namespace);
					for (var j = 0, key; j < storageKeys.length; j++) {
						key = storageKeys[j];
						map[key] = map[key] instanceof Array ? map[key] : [];
						map[key].push(storage);
					}
				}
				return map;
			},
			// Access to native storages, without namespace or basil value decoration
			memory: _storages.memory,
			cookie: _storages.cookie,
			localStorage: _storages.local,
			sessionStorage: _storages.session
		};
	};

	// browser export
	window.Basil = Basil;

	// AMD export
	if (typeof define === 'function' && define.amd) {
		define(function() {
			return Basil;
		});
	// commonjs export
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = Basil;
	}

})();
