(function () {
	var Basil = window.Basil = function (options) {
		return new window.Basil.Storage().init(options);
	};

	Basil.version = '0.2.1';

	Basil.Storage = function () {
		var _supportedStorages = ['local', 'cookie', 'session', 'memory'],
			_namespace = function () {
				var options = this.options || {};
				return (options.namespace || 'b45i1') + ':';
			},
			_detect = function (storages) {
				storages = _toStoragesArray.call(this, storages) || _supportedStorages;
				for (var i = 0; i < storages.length; i++) {
					if (this.check(storages[i]))
						return storages[i];
				}
				return null;
			},
			_toStoragesArray = function (storages) {
				if (!storages)
					return null;
				return Object.prototype.toString.call(storages) === '[object Array]' ? storages : [storages];
			},
			_toStoredKey = function (name) {
				var key = '',
					namespace = _namespace.call(this);
				if (typeof name === 'string')
					key = namespace + name;
				else if (name instanceof Array) {
					for (var i = 0; i < name.length; i++)
						if (name[i])
							key += (key.length ? ':' : namespace) + name[i];
				}
				return key;
			},
			_toStoredValue = function (value) {
				return JSON.stringify(value);
			},
			_fromStoredValue = function (value) {
				return JSON.parse(value);
			},
			_storages = {
				local: {
					check: function () {
						try {
							window.localStorage.setItem('__xyz__', true);
							window.localStorage.removeItem('__xyz__');
						} catch (e) {
							return false;
						}
						return true;
					},
					set: function (name, value, options) {
						if (!name)
							return;
						try {
							window.localStorage.setItem(name, value);
						} catch (e) {
							if (e == QUOTA_EXCEEDED_ERR && window.console)
								window.console.error('localStorage: Quota exceeded');
							throw(e);
						}
					},
					get: function (name) {
						return window.localStorage.getItem(name);
					},
					remove: function (name) {
						window.localStorage.removeItem(name);
					},
					reset: function () {
						var namespace = _namespace.call(this);
						for (var key, i = 0; i < window.localStorage.length; i++) {
							key = window.localStorage.key(i);
							if (key.indexOf(namespace) === 0)
								this.remove(key);
						}
					}
				},
				session: {
					check: function () {
						try {
							window.sessionStorage.setItem('__xyz__', true);
							window.sessionStorage.removeItem('__xyz__');
						} catch (e) {
							return false;
						}
						return true;
					},
					set: function (name, value, options) {
						if (!name)
							return;
						try {
							window.sessionStorage.setItem(name, value);
						} catch (e) {
							if (e == QUOTA_EXCEEDED_ERR && window.console)
								window.console.error('localStorage: Quota exceeded');
							throw(e);
						}
					},
					get: function (name) {
						return window.sessionStorage.getItem(name);
					},
					remove: function (name) {
						window.sessionStorage.removeItem(name);
					},
					reset: function () {
						var namespace = _namespace.call(this);
						for (var key in window.sessionStorage) {
							if (key.indexOf(namespace) === 0)
								this.remove(key);
						}
					}
				},
				memory: {
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
						var namespace = _namespace.call(this);
						for (var key in this._hash) {
							if (key.indexOf(namespace) === 0)
								this.remove(key);
						}
					}
				},
				cookie: {
					check: function () {
						return navigator.cookieEnabled;
					},
					set: function (name, value, options) {
						if (!name)
							return;
						options = options || {};
						var cookie = name + '=' + value;
						if (options.days) {
							var date = new Date();
							date.setTime(date.getTime() + (options.days * 24 * 60 * 60 * 1000));
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
						this.set(name, '', { days: -1 });

						// remove cookie from upper domains
						var domainParts = document.domain.split('.');
						for (var i = domainParts.length - 1; i > 0; i--) {
							this.set(name, '', { days: -1, domain: '.' + domainParts.slice(- i).join('.') });
						}
					},
					reset: function () {
						var namespace = _namespace.call(this),
							cookies = document.cookie.split(';');

						for (var i = 0; i < cookies.length; i++) {
							var cookie = cookies[i].replace(/^\s*/, ''),
								key = cookie.substr(0, cookie.indexOf('='));
							if (key.indexOf(namespace) === 0)
								this.remove(key);
						}
					}
				}
			};

		return {
			init: function (options) {
				this.options = options || {};
				this.supportedStorages = this.options.storages || _supportedStorages;
				this.defaultStorage = this.check(this.options.storage) ? this.options.storage : _detect.call(this, this.supportedStorages);
				return this;
			},
			check: function (storage) {
				storage = storage || this.defaultStorage;
				if (_storages.hasOwnProperty(storage))
					return _storages[storage].check();
				return false;
			},
			set: function (name, value, options) {
				if (!(name = _toStoredKey.call(this, name)))
					return;
				value = _toStoredValue.call(this, value);
				options = options || {};

				var storages = _toStoragesArray.call(this, options.storages) || [this.defaultStorage];
				for (var i = 0; i < storages.length; i++) {
					if (!this.check(storages[i]))
						continue;
					_storages[storages[i]].set(name, value, options);
				}
			},
			get: function (name, options) {
				if (!(name = _toStoredKey.call(this, name)))
					return null;
				options = options || {};

				var value = null,
					storages = _toStoragesArray.call(this, options.storages) || [this.defaultStorage];

				for (var i = 0; value === null && i < storages.length; i++) {
					if (!this.check(storages[i]))
						continue;
					value = _fromStoredValue.call(this, _storages[storages[i]].get(name))
				}
				return value;
			},
			remove: function (name, options) {
				if (!(name = _toStoredKey.call(this, name)))
					return null;
				options = options || {};

				var storages = _toStoragesArray.call(this, options.storages) || [this.defaultStorage];
				for (var i = 0; i < storages.length; i++) {
					if (!this.check(storages[i]))
						continue;
					_storages[storages[i]].remove(name);
				}
			},
			reset: function (options) {
				options = options || {};

				var storages = _toStoragesArray.call(this, options.storages) || [this.defaultStorage];
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
})();
