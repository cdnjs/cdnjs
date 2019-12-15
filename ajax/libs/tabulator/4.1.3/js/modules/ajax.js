var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* Tabulator v4.1.3 (c) Oliver Folkerd */

var Ajax = function Ajax(table) {

	this.table = table; //hold Tabulator object
	this.config = false; //hold config object for ajax request
	this.url = ""; //request URL
	this.urlGenerator = false;
	this.params = false; //request parameters

	this.loaderElement = this.createLoaderElement(); //loader message div
	this.msgElement = this.createMsgElement(); //message element
	this.loadingElement = false;
	this.errorElement = false;
	this.loaderPromise = false;

	this.progressiveLoad = false;
	this.loading = false;

	this.requestOrder = 0; //prevent requests comming out of sequence if overridden by another load request
};

//initialize setup options
Ajax.prototype.initialize = function () {
	this.loaderElement.appendChild(this.msgElement);

	if (this.table.options.ajaxLoaderLoading) {
		this.loadingElement = this.table.options.ajaxLoaderLoading;
	}

	this.loaderPromise = this.table.options.ajaxRequestFunc || this.defaultLoaderPromise;

	this.urlGenerator = this.table.options.ajaxURLGenerator || this.defaultURLGenerator;

	if (this.table.options.ajaxLoaderError) {
		this.errorElement = this.table.options.ajaxLoaderError;
	}

	if (this.table.options.ajaxParams) {
		this.setParams(this.table.options.ajaxParams);
	}

	if (this.table.options.ajaxConfig) {
		this.setConfig(this.table.options.ajaxConfig);
	}

	if (this.table.options.ajaxURL) {
		this.setUrl(this.table.options.ajaxURL);
	}

	if (this.table.options.ajaxProgressiveLoad) {
		if (this.table.options.pagination) {
			this.progressiveLoad = false;
			console.error("Progressive Load Error - Pagination and progressive load cannot be used at the same time");
		} else {
			if (this.table.modExists("page")) {
				this.progressiveLoad = this.table.options.ajaxProgressiveLoad;
				this.table.modules.page.initializeProgressive(this.progressiveLoad);
			} else {
				console.error("Pagination plugin is required for progressive ajax loading");
			}
		}
	}
};

Ajax.prototype.createLoaderElement = function () {
	var el = document.createElement("div");
	el.classList.add("tabulator-loader");
	return el;
};

Ajax.prototype.createMsgElement = function () {
	var el = document.createElement("div");

	el.classList.add("tabulator-loader-msg");
	el.setAttribute("role", "alert");

	return el;
};

//set ajax params
Ajax.prototype.setParams = function (params, update) {
	if (update) {
		this.params = this.params || {};

		for (var key in params) {
			this.params[key] = params[key];
		}
	} else {
		this.params = params;
	}
};

Ajax.prototype.getParams = function () {
	return this.params || {};
};

//load config object
Ajax.prototype.setConfig = function (config) {
	this._loadDefaultConfig();

	if (typeof config == "string") {
		this.config.method = config;
	} else {
		for (var key in config) {
			this.config[key] = config[key];
		}
	}
};

//create config object from default
Ajax.prototype._loadDefaultConfig = function (force) {
	var self = this;
	if (!self.config || force) {

		self.config = {};

		//load base config from defaults
		for (var key in self.defaultConfig) {
			self.config[key] = self.defaultConfig[key];
		}
	}
};

//set request url
Ajax.prototype.setUrl = function (url) {
	this.url = url;
};

//get request url
Ajax.prototype.getUrl = function () {
	return this.url;
};

//lstandard loading function
Ajax.prototype.loadData = function (inPosition) {
	var self = this;

	if (this.progressiveLoad) {
		return this._loadDataProgressive();
	} else {
		return this._loadDataStandard(inPosition);
	}
};

Ajax.prototype.nextPage = function (diff) {
	var margin;

	if (!this.loading) {

		margin = this.table.options.ajaxProgressiveLoadScrollMargin || this.table.rowManager.getElement().clientHeight * 2;

		if (diff < margin) {
			this.table.modules.page.nextPage().then(function () {}).catch(function () {});
		}
	}
};

Ajax.prototype.blockActiveRequest = function () {
	this.requestOrder++;
};

Ajax.prototype._loadDataProgressive = function () {
	this.table.rowManager.setData([]);
	return this.table.modules.page.setPage(1);
};

Ajax.prototype._loadDataStandard = function (inPosition) {
	var _this = this;

	return new Promise(function (resolve, reject) {
		_this.sendRequest(inPosition).then(function (data) {
			_this.table.rowManager.setData(data, inPosition);
			resolve();
		}).catch(function (e) {
			reject();
		});
	});
};

Ajax.prototype.generateParamsList = function (data, prefix) {
	var self = this,
	    output = [];

	prefix = prefix || "";

	if (Array.isArray(data)) {
		data.forEach(function (item, i) {
			output = output.concat(self.generateParamsList(item, prefix ? prefix + "[" + i + "]" : i));
		});
	} else if ((typeof data === "undefined" ? "undefined" : _typeof(data)) === "object") {
		for (var key in data) {
			output = output.concat(self.generateParamsList(data[key], prefix ? prefix + "[" + key + "]" : key));
		}
	} else {
		output.push({ key: prefix, value: data });
	}

	return output;
};

Ajax.prototype.serializeParams = function (params) {
	var output = this.generateParamsList(params),
	    encoded = [];

	output.forEach(function (item) {
		encoded.push(encodeURIComponent(item.key) + "=" + encodeURIComponent(item.value));
	});

	return encoded.join("&");
};

//send ajax request
Ajax.prototype.sendRequest = function (silent) {
	var _this2 = this;

	var self = this,
	    url = self.url,
	    requestNo,
	    esc,
	    query;

	self.requestOrder++;
	requestNo = self.requestOrder;

	self._loadDefaultConfig();

	return new Promise(function (resolve, reject) {
		if (self.table.options.ajaxRequesting.call(_this2.table, self.url, self.params) !== false) {

			self.loading = true;

			if (!silent) {
				self.showLoader();
			}

			_this2.loaderPromise(url, self.config, self.params).then(function (data) {
				if (requestNo === self.requestOrder) {
					if (self.table.options.ajaxResponse) {
						data = self.table.options.ajaxResponse.call(self.table, self.url, self.params, data);
					}
					resolve(data);
				} else {
					console.warn("Ajax Response Blocked - An active ajax request was blocked by an attempt to change table data while the request was being made");
				}

				self.hideLoader();

				self.loading = false;
			}).catch(function (error) {
				console.error("Ajax Load Error: ", error);
				self.table.options.ajaxError.call(self.table, error);

				self.showError();

				setTimeout(function () {
					self.hideLoader();
				}, 3000);

				self.loading = false;

				reject();
			});
		} else {
			reject();
		}
	});
};

Ajax.prototype.showLoader = function () {
	var shouldLoad = typeof this.table.options.ajaxLoader === "function" ? this.table.options.ajaxLoader() : this.table.options.ajaxLoader;

	if (shouldLoad) {

		this.hideLoader();

		while (this.msgElement.firstChild) {
			this.msgElement.removeChild(this.msgElement.firstChild);
		}this.msgElement.classList.remove("tabulator-error");
		this.msgElement.classList.add("tabulator-loading");

		if (this.loadingElement) {
			this.msgElement.appendChild(this.loadingElement);
		} else {
			this.msgElement.innerHTML = this.table.modules.localize.getText("ajax|loading");
		}

		this.table.element.appendChild(this.loaderElement);
	}
};

Ajax.prototype.showError = function () {
	this.hideLoader();

	while (this.msgElement.firstChild) {
		this.msgElement.removeChild(this.msgElement.firstChild);
	}this.msgElement.classList.remove("tabulator-loading");
	this.msgElement.classList.add("tabulator-error");

	if (this.errorElement) {
		this.msgElement.appendChild(this.errorElement);
	} else {
		this.msgElement.innerHTML = this.table.modules.localize.getText("ajax|error");
	}

	this.table.element.appendChild(this.loaderElement);
};

Ajax.prototype.hideLoader = function () {
	if (this.loaderElement.parentNode) {
		this.loaderElement.parentNode.removeChild(this.loaderElement);
	}
};

//default ajax config object
Ajax.prototype.defaultConfig = {
	method: "GET"
};

Ajax.prototype.defaultURLGenerator = function (url, config, params) {
	if (params && Object.keys(params).length) {
		if (!config.method || config.method.toLowerCase() == "get") {
			config.method = "get";
			url += "?" + this.serializeParams(params);
		}
	}

	return url;
};

Ajax.prototype.defaultLoaderPromise = function (url, config, params) {
	var self = this,
	    contentType;

	return new Promise(function (resolve, reject) {

		//set url
		url = self.urlGenerator(url, config, params);

		//set body content if not GET request
		if (config.method != "get") {
			contentType = _typeof(self.table.options.ajaxContentType) === "object" ? self.table.options.ajaxContentType : self.contentTypeFormatters[self.table.options.ajaxContentType];
			if (contentType) {

				for (var key in contentType.headers) {
					if (!config.headers) {
						config.headers = {};
					}

					if (typeof config.headers[key] === "undefined") {
						config.headers[key] = contentType.headers[key];
					}
				}

				config.body = contentType.body.call(self, url, config, params);
			} else {
				console.warn("Ajax Error - Invalid ajaxContentType value:", self.table.options.ajaxContentType);
			}
		}

		if (url) {

			//configure headers
			if (typeof config.credentials === "undefined") {
				config.credentials = 'include';
			}

			if (typeof config.headers === "undefined") {
				config.headers = {};
			}

			if (typeof config.headers.Accept === "undefined") {
				config.headers.Accept = "application/json";
			}

			if (typeof config.headers["X-Requested-With"] === "undefined") {
				config.headers["X-Requested-With"] = "XMLHttpRequest";
			}

			//send request
			fetch(url, config).then(function (response) {
				if (response.ok) {
					response.json().then(function (data) {
						resolve(data);
					}).catch(function (error) {
						reject(error);
						console.warn("Ajax Load Error - Invalid JSON returned", error);
					});
				} else {
					console.error("Ajax Load Error - Connection Error: " + response.status, response.statusText);
					reject(response);
				}
			}).catch(function (error) {
				console.error("Ajax Load Error - Connection Error: ", error);
				reject(error);
			});
		} else {
			reject("No URL Set");
		}
	});
};

Ajax.prototype.contentTypeFormatters = {
	"json": {
		headers: {
			'Content-Type': 'application/json'
		},
		body: function body(url, config, params) {
			return JSON.stringify(params);
		}
	},
	"form": {
		headers: {},
		body: function body(url, config, params) {
			var output = this.generateParamsList(params),
			    form = new FormData();

			output.forEach(function (item) {
				form.append(item.key, item.value);
			});

			return form;
		}
	}
};

Tabulator.prototype.registerModule("ajax", Ajax);