// @options apiLoader: function or thennable = undefined
// Function that will be used to load Yandex JS API (if it turns out not enabled on layer add).
// Must return any Promise-like thennable object.
// Instead of function it's also possible to specify Promise/thennable directly as option value.

// Alternatively:
// Predefined loader will be used if apiUrl / apiParams specified.

// @options apiVersion: string = '2.1'
// Can be specified to use api version other then default,
// more info: https://tech.yandex.com/maps/jsapi/doc/2.1/versions/index-docpage/

// @options apiUrl: string = 'https://api-maps.yandex.ru/{version}/'
// This may need to be changed for using commercial versions of the api.
// It's also possible to directly include params in apiUrl.
// Please note that some parameters are mandatory,
// more info: https://tech.yandex.com/maps/jsapi/doc/2.1/dg/concepts/load-docpage/

// @option apiParams: object or string
// Parameters to use when enabling API.
// There are some predefined defaults (see in code), but 'apikey' is still mandatory.
// It's also possible to specify apikey directly as apiParams string value.

// @method apiLoad(options?: Object): this
// Loads API immediately.
// If API loader / params are not specified in layer options,
// they must be provided in `options` argument (otherwise it may be omitted).

/* global ymaps: true */

L.Yandex.include({
	_initLoader: function (options) {
		if (this._loader) { return; }
		options = options || this.options;
		var loader = options.apiLoader;
		if (loader) {
			if (loader.then) { loader = {loading: loader}; }
		} else {
			var url = this._makeUrl(options);
			loader = url && this._loadScript.bind(this,url);
		}
		if (loader) {
			L.Yandex.prototype._loader = loader;
		}
	},

	loadApi: function (options) {
		if (typeof ymaps !== 'undefined') { return this; }
		this._initLoader(options);
		var loader = this._loader;
		if (!loader) {
			throw new Error('api params expected in options');
		}
		if (!loader.loading) {
			loader.loading = loader();
		}
		return this;
	},

	_initApi: function (afterload) {
		var loader = this._loader;
		if (typeof ymaps !== 'undefined') {
			return ymaps.ready(this._initMapObject, this);
		} else if (afterload || !loader) {
			throw new Error('API is not available');
		}
		var loading = loader.loading;
		if (!loading) {
			loading = loader();
			loader.loading = loading;
		}
		loading.then(this._initApi.bind(this,'afterload'));
	},

	_apiDefaults: { // https://tech.yandex.com/maps/jsapi/doc/2.1/dg/concepts/load-docpage/
		url: 'https://api-maps.yandex.ru/{version}/',
		version: '2.1',
		params: {
			lang: 'ru_RU',
			onerror: 'console.error'
		}
	},

	_makeUrl: function (options) {
		var url = options.apiUrl,
			params = options.apiParams,
			def = this._apiDefaults;
		if (!url && !params) { return false; }
		if (params) {
			if (typeof params === 'string') { params = { apikey: params }; }
			params = L.extend({}, def.params, params);
			url = (url || def.url) +
				L.Util.getParamString(params,url);
		}
		return L.Util.template(url, { version: options.apiVersion || def.version });
	},

	_loadScript: function (url) {
		return new Promise(function (resolve, reject) {
			var script = document.createElement('script');
			script.onload = resolve;
			script.onerror = function () {
				reject('API loading failed');
			};
			script.src = url;
			document.body.appendChild(script);
		});
	}

});

L.Yandex.addInitHook(L.Yandex.prototype._initLoader);
