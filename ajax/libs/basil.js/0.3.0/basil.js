(function () {

	// Utils
	Object.extend = function () {
		var destination = typeof arguments[0] === 'object' ? arguments[0] : {};
		for (var i = 1; i < arguments.length; i++) {
			if (arguments[i] && typeof arguments[i] === 'object')
				for (var property in arguments[i])
					destination[property] = arguments[i][property];
		}
		return destination;
	};

	// Basil
	var Basil = function (options) {
		return new Basil.Storage().init(options);
	};

	Basil.version = '0.3.0';

	Basil.options = Object.extend({
		namespace: 'b45i1',
		storage: null,
		storages: ['local', 'cookie', 'session', 'memory'],
		expireDays: 365
	}, window.Basil ? window.Basil.options : {});

	Basil.Storage = function () {
		var _salt = 'b45i1' + (Math.random() + 1)
				.toString(36)
				.substring(7),
			_storages = {},
			_toStoragesArray = function (storages) {
				if (!storages)
					return null;
				return Object.prototype.toString.call(storages) === '[object Array]' ? storages : [storages];
			},
			_toStoredKey = function (namespace, name) {
				var key = '';
				if (typeof name === 'string')
					key = namespace + ':' + name;
				else if (name instanceof Array) {
					key = namespace;
					for (var i = 0; i < name.length; i++)
						if (name[i])
							key += ':' + name[i];
				}
				return key;
			},
			_toStoredValue = function (value) {
				return JSON.stringify(value);
			},
			_fromStoredValue = function (value) {
				return JSON.parse(value);
			};

		// local storage
		_storages['local'] = {
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
			reset: function () {
				for (var key, i = 0; i < this.engine.length; i++) {
					key = this.engine.key(i);
					if (key.indexOf(this.options.namespace) === 0)
						this.remove(key);
				}
			}
		};

		// session storage
		_storages['session'] = Object.extend({}, _storages['local'], {
			engine: window.sessionStorage
		});

		// memory storage
		_storages['memory'] = {
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
			reset: function () {
				for (var key in this._hash) {
					if (key.indexOf(this.options.namespace) === 0)
						this.remove(key);
				}
			}
		};

		// cookie storage
		_storages['cookie'] = {
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

				for (var i = 0; i < cookies.length; i++) {
					var cookie = cookies[i].replace(/^\s*/, '');
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
			reset: function () {
				var cookies = document.cookie.split(';');

				for (var i = 0; i < cookies.length; i++) {
					var cookie = cookies[i].replace(/^\s*/, ''),
						key = cookie.substr(0, cookie.indexOf('='));
					if (key.indexOf(this.options.namespace) === 0)
						this.remove(key);
				}
			}
		};

		return {
			init: function (options) {
				this.options = Object.extend({}, Basil.options, options);

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
				for (var storage in this.supportedStorages) {
					if (this.check(storage))
						return storage;
				}
				return null;
			},
			check: function (storage) {
				storage = storage || this.defaultStorage;
				if (this.supportedStorages.hasOwnProperty(storage))
					return this.supportedStorages[storage].check();
				return false;
			},
			set: function (name, value, options) {
				if (!(name = _toStoredKey(this.options.namespace, name)))
					return;
				value = _toStoredValue(value);
				options = Object.extend({
					expireDays: this.options.expireDays
				}, options);

				var storages = _toStoragesArray(options.storages) || [this.defaultStorage];
				for (var i = 0; i < storages.length; i++) {
					if (!this.check(storages[i]))
						continue;
					_storages[storages[i]].set(name, value, options);
				}
			},
			get: function (name, options) {
				if (!(name = _toStoredKey(this.options.namespace, name)))
					return null;
				options = options || {};

				var value = null,
					storages = _toStoragesArray(options.storages) || [this.defaultStorage];

				for (var i = 0; value === null && i < storages.length; i++) {
					if (!this.check(storages[i]))
						continue;
					value = _fromStoredValue(_storages[storages[i]].get(name));
				}
				return value;
			},
			remove: function (name, options) {
				if (!(name = _toStoredKey(this.options.namespace, name)))
					return null;
				options = options || {};

				var storages = _toStoragesArray(options.storages) || [this.defaultStorage];
				for (var i = 0; i < storages.length; i++) {
					if (!this.check(storages[i]))
						continue;
					_storages[storages[i]].remove(name);
				}
			},
			reset: function (options) {
				options = options || {};

				var storages = _toStoragesArray(options.storages) || [this.defaultStorage];
				for (var i = 0; i < storages.length; i++) {
					if (!this.check(storages[i]))
						continue;
					_storages[storages[i]].reset();
				}
			},
			// Access to native storages, without namespace or basil value decoration
			cookie: _storages.cookie,
			localStorage: _storages.local,
			sessionStorage: _storages.session
		};
	};

	window.Basil = Basil;

})();
