/*!
 * Operative
 * ---
 * Operative is a small JS utility for seamlessly creating Web Worker scripts.
 * ---
 * @author James Padolsey http://james.padolsey.com
 * @repo http://github.com/padolsey/operative
 * @version 0.4.0-rc1
 * @license MIT
 */
(function() {

	if (typeof window == 'undefined' && self.importScripts) {
		// I'm a worker! Run the boiler-script:
		// (Operative itself is called in IE10 as a worker,
		//  to avoid SecurityErrors)
		workerBoilerScript();
		return;
	}

	var slice = [].slice;
	var hasOwn = {}.hasOwnProperty;
	var toString = {}.toString;

	var scripts = document.getElementsByTagName('script');
	var opScript = scripts[scripts.length - 1];
	var opScriptURL = /operative/.test(opScript.src) && opScript.src;

	// Default base URL (to be prepended to relative dependency URLs)
	// is current page's parent dir:
	var baseURL = (
		location.protocol + '//' +
		location.hostname +
		(location.port?':'+location.port:'') +
		location.pathname
	).replace(/[^\/]+$/, '');

	var URL = window.URL || window.webkitURL;
	var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;

	var workerViaBlobSupport = (function() {
		try {
			new Worker(makeBlobURI(';'));
		} catch(e) {
			return false;
		}
		return true;
	}());

	var transferrableObjSupport = (function() {
		try {
			var ab = new ArrayBuffer(1);
			new Worker( makeBlobURI(';') ).postMessage(ab, [ab]);
			return !ab.byteLength;
		} catch(e) {
			return false;
		}
	}());

	/**
	 * Provide Object.create shim
	 */
	var objCreate = Object.create || function(o) {
		function F() {}
		F.prototype = o;
		return new F();
	};

	function makeBlobURI(script) {
		var blob;

		try {
			blob = new Blob([script], { type: 'text/javascript' });
		} catch (e) {
			blob = new BlobBuilder();
			blob.append(script);
			blob = blob.getBlob();
		}

		return URL.createObjectURL(blob);
	}

	// Indicates whether operatives will run within workers:
	operative.hasWorkerSupport = !!window.Worker;
	operative.hasWorkerViaBlobSupport = workerViaBlobSupport;
	operative.hasTransferSupport = transferrableObjSupport;

	operative.Promise = window.Promise;

	// Expose:
	if (typeof define === 'function' && define.amd) {
		define( function () { return operative; });
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = operative;
	} else {
		window.operative = operative;
	}


	operative.setSelfURL = function(url) {
		opScriptURL = url;
	};

	operative.setBaseURL = function(base) {
		baseURL = base;
	};

	operative.getBaseURL = function() {
		return baseURL;
	};

	function OperativeTransfers(transfers) {
		this.value = transfers;
	}

	/**
	 * Operative: Exposed Operative Constructor
	 * @param {Object} module Object containing methods/properties
	 */
	function Operative(module, dependencies) {

		var _self = this;

		module.get = module.get || function(prop) {
			return this[prop];
		};

		module.set = module.set || function(prop, value) {
			return this[prop] = value;
		};

		this._curToken = 0;
		this._queue = [];

		this.isDestroyed = false;
		this.isContextReady = false;

		this.module = module;
		this.dependencies = dependencies || [];

		this.dataProperties = {};
		this.api = {};
		this.callbacks = {};
		this.deferreds = {};

		this._fixDependencyURLs();
		this._setup();

		for (var methodName in module) {
			if (hasOwn.call(module, methodName)) {
				this._createExposedMethod(methodName);
			}
		}

		this.api.__operative__ = this;

		// Provide the instance's destroy method on the exposed API:
		this.api.destroy = this.api.terminate = function() {
			return _self.destroy();
		};

	}

	Operative.prototype = {

		_marshal: function(v) {
			return v;
		},

		_demarshal: function(v) {
			return v;
		},

		_enqueue: function(fn) {
			this._queue.push(fn);
		},

		_fixDependencyURLs: function() {
			var deps = this.dependencies;
			for (var i = 0, l = deps.length; i < l; ++i) {
				var dep = deps[i];
				if (!/\/\//.test(dep)) {
					deps[i] = dep.replace(/^\/?/, baseURL);
				}
			}
		},

		_dequeueAll: function() {
			for (var i = 0, l = this._queue.length; i < l; ++i) {
				this._queue[i].call(this);
			}
			this._queue = [];
		},

		_buildContextScript: function(boilerScript) {

			var script = [];
			var module = this.module;
			var dataProperties = this.dataProperties;
			var property;

			for (var i in module) {
				property = module[i];
				if (typeof property == 'function') {
					script.push('   self["' + i.replace(/"/g, '\\"') + '"] = ' + property.toString() + ';');
				} else {
					dataProperties[i] = property;
				}
			}

			return script.join('\n') + (
				boilerScript ? '\n(' + boilerScript.toString() + '());' : ''
			);

		},

		_createExposedMethod: function(methodName) {

			var self = this;

			var method = this.api[methodName] = function() {

				if (self.isDestroyed) {
					throw new Error('Operative: Cannot run method. Operative has already been destroyed');
				}

				var token = ++self._curToken;
				var args = slice.call(arguments);
				var cb = typeof args[args.length - 1] == 'function' && args.pop();
				var transferables = args[args.length - 1] instanceof OperativeTransfers && args.pop();

				if (!cb && !operative.Promise) {
					throw new Error(
						'Operative: No callback has been passed. Assumed that you want a promise. ' +
						'But `operative.Promise` is null. Please provide Promise polyfill/lib.'
					);
				}

				if (cb) {

					self.callbacks[token] = cb;

					// Ensure either context runs the method async:
					setTimeout(function() {
						runMethod();
					}, 1);

				} else if (operative.Promise) {

					// No Callback -- Promise used:

					return new operative.Promise(function(resolve, reject) {
						var deferred;

						if (resolve.fulfil || resolve.fulfill) {
							// Backwards compatibility
							deferred = resolve;
							deferred.fulfil = deferred.fulfill = resolve.fulfil || resolve.fulfill;
						} else {
							deferred = {
								// Deprecate:
								fulfil: resolve,
								fulfill: resolve,

								resolve: resolve,
								reject: reject,

								// for the iframe:
								transferResolve: resolve,
								transferReject: reject
							};
						}

						self.deferreds[token] = deferred;
						runMethod();
					});

				}

				function runMethod() {
					if (self.isContextReady) {
						self._runMethod(methodName, token, args, transferables);
					} else {
						self._enqueue(runMethod);
					}
				}

			};

			method.transfer = function() {

				var args = [].slice.call(arguments);
				var transfersIndex = typeof args[args.length - 1] == 'function' ?
					args.length - 2:
					args.length - 1;
				var transfers = args[transfersIndex];

				if (toString.call(transfers) !== '[object Array]') {
					throw new Error('Operative:transfer() must be passed an Array of transfers as its last arguments');
				}

				args[transfersIndex] = new OperativeTransfers(transfers);
				return method.apply(null, args);

			};

		},

		destroy: function() {
			this.isDestroyed = true;
		}
	};


	/**
	 * Operative Worker
	 */
	Operative.Worker = function Worker(module) {
		this._msgQueue = [];
		Operative.apply(this, arguments);
	};

	var WorkerProto = Operative.Worker.prototype = objCreate(Operative.prototype);

	WorkerProto._onWorkerMessage = function(e) {
		var data = e.data;

		if (typeof data === 'string' && data.indexOf('pingback') === 0) {
			if (data === 'pingback:structuredCloningSupport=NO') {
				// No structuredCloningSupport support (marshal JSON from now on):
				this._marshal = function(o) { return JSON.stringify(o); };
				this._demarshal = function(o) { return JSON.parse(o); };
			}

			this.isContextReady = true;
			this._postMessage({
				definitions: this.dataProperties
			});
			this._dequeueAll();
			return;

		}

		data = this._demarshal(data);

		switch (data.cmd) {
			case 'console':
				window.console && window.console[data.method].apply(window.console, data.args);
				break;
			case 'result':

				var callback = this.callbacks[data.token];
				var deferred = this.deferreds[data.token];

				var deferredAction = data.result && data.result.isDeferred && data.result.action;

				if (deferred && deferredAction) {
					deferred[deferredAction](data.result.args[0]);
				} else if (callback) {
					callback.apply(this, data.result.args);
				} else if (deferred) {
					// Resolve promise even if result was given
					// via callback within the worker:
					deferred.fulfil(data.result.args[0]);
				}

				break;
		}
	};

	WorkerProto._setup = function() {
		var self = this;

		var worker;
		var script = this._buildContextScript(
			// The script is not included if we're Eval'ing this file directly:
			workerViaBlobSupport ? workerBoilerScript : ''
		);

		if (this.dependencies.length) {
			script = 'importScripts("' + this.dependencies.join('", "') + '");\n' + script;
		}

		if (workerViaBlobSupport) {
			worker = this.worker = new Worker( makeBlobURI(script) );
		}  else {
			if (!opScriptURL) {
				throw new Error('Operaritve: No operative.js URL available. Please set via operative.setSelfURL(...)');
			}
			worker = this.worker = new Worker( opScriptURL );
			// Marshal-agnostic initial message is boiler-code:
			// (We don't yet know if structured-cloning is supported so we send a string)
			worker.postMessage('EVAL|' + script);
		}

		worker.postMessage(['PING']); // Initial PING
		worker.postMessage('EVAL|self.hasTransferSupport=' + transferrableObjSupport);

		worker.addEventListener('message', function(e) {
			self._onWorkerMessage(e);
		});
	};

	WorkerProto._postMessage = function(msg) {
		var transfers = transferrableObjSupport && msg.transfers;
		return transfers ?
			this.worker.postMessage(msg, transfers.value) :
			this.worker.postMessage(
				this._marshal(msg)
			);
	};

	WorkerProto._runMethod = function(methodName, token, args, transfers) {
		this._postMessage({
			method: methodName,
			args: args,
			token: token,
			transfers: transfers
		});
	};

	WorkerProto.destroy = function() {
		this.worker.terminate();
		Operative.prototype.destroy.call(this);
	};


	/**
	 * Operative IFrame
	 */
	Operative.Iframe = function Iframe(module) {
		Operative.apply(this, arguments);
	};

	var IframeProto = Operative.Iframe.prototype = objCreate(Operative.prototype);

	var _loadedMethodNameI = 0;

	IframeProto._setup = function() {

		var self = this;
		var loadedMethodName = '__operativeIFrameLoaded' + (++_loadedMethodNameI);

		this.module.isWorker = false;

		var iframe = this.iframe = document.body.appendChild(
			document.createElement('iframe')
		);

		iframe.style.display = 'none';

		var iWin = this.iframeWindow = iframe.contentWindow;
		var iDoc = iWin.document;

		// Cross browser (tested in IE8,9) way to call method from within
		// IFRAME after all < script >s have loaded:
		window[loadedMethodName] = function() {

			window[loadedMethodName] = null;

			var script = iDoc.createElement('script');
			var js = self._buildContextScript(iframeBoilerScript);

			if (script.text !== void 0) {
				script.text = js;
			} else {
				script.innerHTML = js;
			}

			iDoc.documentElement.appendChild(script);

			for (var i in self.dataProperties) {
				iWin[i] = self.dataProperties[i];
			}

			self.isContextReady = true;
			self._dequeueAll();

		};

		iDoc.open();
		if (this.dependencies.length) {
			iDoc.write(
				'<script src="' + this.dependencies.join('"><\/script><script src="') + '"><\/script>'
			);
		}
		// Place <script> at bottom to tell parent-page when dependencies are loaded:
		iDoc.write('<script>window.parent.' + loadedMethodName + '();<\/script>');
		iDoc.close();

	};

	IframeProto._runMethod = function(methodName, token, args) {
		var self = this;

		var callback = this.callbacks[token];
		var deferred = this.deferreds[token];

		this.iframeWindow.__run__(methodName, args, function(result) {
			var cb = callback;
			var df = deferred;
			if (cb) {
				cb.apply(self, arguments);
			} else if(df) {
				df.fulfil(result);
			}
		}, deferred);
	};

	IframeProto.destroy = function() {
		this.iframe.parentNode.removeChild(this.iframe);
		Operative.prototype.destroy.call(this);
	};

	operative.Operative = Operative;

	/**
	 * Exposed operative factory
	 */
	function operative(module, dependencies) {

		var OperativeContext = operative.hasWorkerSupport ?
			Operative.Worker : Operative.Iframe;

		if (typeof module == 'function') {
			// Allow a single function to be passed.
			var o = new OperativeContext({ main: module }, dependencies);
			var singularOperative = function() {
				return o.api.main.apply(o, arguments);
			};
			singularOperative.transfer = function() {
				return o.api.main.transfer.apply(o, arguments);
			};
			// Copy across exposable API to the returned function:
			for (var i in o.api) {
				if (hasOwn.call(o.api, i)) {
					singularOperative[i] = o.api[i];
				}
			}
			return singularOperative;
		}

		return new OperativeContext(module, dependencies).api;

	}

	operative.pool = function(size, module, dependencies) {
		size = 0 | Math.abs(size) || 1;
		var operatives = [];
		var current = 0;

		for (var i = 0; i < size; ++i) {
			operatives.push(operative(module, dependencies));
		}

		return {
			terminate: function() {
				for (var i = 0; i < size; ++i) {
					operatives[i].destroy();
				}
			},
			next: function() {
				current = current + 1 === size ? 0 : current + 1;
				return operatives[current];
			}
		};
	};

/**
 * The boilerplate for the Iframe Context
 * NOTE:
 *  this'll be executed within an iframe, not here.
 *  Indented @ Zero to make nicer debug code within worker
 */
function iframeBoilerScript() {

	// Called from parent-window:
	window.__run__ = function(methodName, args, cb, deferred) {

		var isAsync = false;
		var isDeferred = false;

		window.async = function() {
			isAsync = true;
			return cb;
		};

		window.deferred = function() {
			isDeferred = true;
			return deferred;
		};

		function callback() {
			return cb.apply(this, arguments);
		}

		// Define fallback transfer() method:
		callback.transfer = function() {
			// Remove [transfers] list (last argument)
			return cb.apply(this, [].slice.call(arguments, 0, arguments.length - 1));
		};

		if (cb) {
			args.push(callback);
		}

		var result = window[methodName].apply(window, args);

		window.async = function() {
			throw new Error('Operative: async() called at odd time');
		};

		window.deferred = function() {
			throw new Error('Operative: deferred() called at odd time');
		};


		if (!isDeferred && !isAsync && result !== void 0) {
			// Deprecated direct-returning as of 0.2.0
			callback(result);
		}
	};
}

/**
 * The boilerplate for the Worker Blob
 * NOTE:
 *  this'll be executed within a worker, not here.
 *  Indented @ Zero to make nicer debug code within worker
 */
function workerBoilerScript() {

	var postMessage = self.postMessage;
	var structuredCloningSupport = null;
	var toString = {}.toString;

	self.console = {};
	self.isWorker = true;

	// Provide basic console interface:
	['log', 'debug', 'error', 'info', 'warn', 'time', 'timeEnd'].forEach(function(meth) {
		self.console[meth] = function() {
			postMessage({
				cmd: 'console',
				method: meth,
				args: [].slice.call(arguments)
			});
		};
	});

	self.addEventListener('message', function(e) {

		var data = e.data;

		if (typeof data == 'string' && data.indexOf('EVAL|') === 0) {
			eval(data.substring(5));
			return;
		}

		if (structuredCloningSupport == null) {

			// e.data of ['PING'] (An array) indicates structuredCloning support
			// e.data of '"PING"' (A string) indicates no support (Array has been serialized)
			structuredCloningSupport = e.data[0] === 'PING';

			// Pingback to parent page:
			self.postMessage(
				structuredCloningSupport ?
					'pingback:structuredCloningSupport=YES' :
					'pingback:structuredCloningSupport=NO'
			);

			if (!structuredCloningSupport) {
				postMessage = function(msg) {
					// Marshal before sending
					return self.postMessage(JSON.stringify(msg));
				};
			}

			return;
		}

		if (!structuredCloningSupport) {
			// Demarshal:
			data = JSON.parse(data);
		}

		var defs = data.definitions;
		var isDeferred = false;
		var isAsync = false;
		var args = data.args;

		if (defs) {
			// Initial definitions:
			for (var i in defs) {
				self[i] = defs[i];
			}
			return;
		}

		var callback = function() {
			// Callback function to be passed to operative method
			returnResult({
				args: [].slice.call(arguments)
			});
		};

		callback.transfer = function() {
			var args = [].slice.call(arguments);
			var transfers = extractTransfers(args);
			// Callback function to be passed to operative method
			returnResult({
				args: args
			}, transfers);
		};

		args.push(callback);

		self.async = function() { // Async deprecated as of 0.2.0
			isAsync = true;
			return function() { returnResult({ args: [].slice.call(arguments) }); };
		};

		self.deferred = function() {
			isDeferred = true;
			var def = {};
			function resolve(r, transfers) {
				returnResult({
					isDeferred: true,
					action: 'resolve',
					args: [r]
				}, transfers);
				return def;
			}
			function reject(r, transfers) {
				returnResult({
					isDeferred: true,
					action: 'reject',
					args: [r]
				}, transfers);
			}
			// Deprecated:
			def.fulfil = def.fulfill = def.resolve = function(value) {
				return resolve(value);
			};
			def.reject = function(value) {
				return reject(value);
			};
			def.transferResolve = function(value) {
				var transfers = extractTransfers(arguments);
				return resolve(value, transfers);
			};
			def.transferReject = function(value) {
				var transfers = extractTransfers(arguments);
				return reject(value, transfers);
			};
			return def;
		};

		// Call actual operative method:
		var result = self[data.method].apply(self, args);

		if (!isDeferred && !isAsync && result !== void 0) {
			// Deprecated direct-returning as of 0.2.0
			returnResult({
				args: [result]
			});
		}

		self.deferred = function() {
			throw new Error('Operative: deferred() called at odd time');
		};

		self.async = function() { // Async deprecated as of 0.2.0
			throw new Error('Operative: async() called at odd time');
		};

		function returnResult(res, transfers) {
			postMessage({
				cmd: 'result',
				token: data.token,
				result: res
			}, hasTransferSupport && transfers || []);
		}

		function extractTransfers(args) {
			var transfers = args[args.length - 1];

			if (toString.call(transfers) !== '[object Array]') {
				throw new Error('Operative: callback.transfer() must be passed an Array of transfers as its last arguments');
			}

			return transfers;
		}
	});
}

}());
