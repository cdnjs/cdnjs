/**
 * Operative
 * ---
 * Operative is a small JS utility for seamlessly creating Web Worker scripts.
 * ---
 * @author James Padolsey http://james.padolsey.com
 * @repo http://github.com/padolsey/operative
 * @version 0.0.2
 */
(function() {

	if (typeof window == 'undefined' && self.importScripts) {
		// I'm a worker! Run the boiler-script:
		// (Operative itself is called in IE10 as a worker, to avoid SecurityErrors)
		workerBoilerScript();
		return;
	}

	var slice = [].slice;
	var hasOwn = {}.hasOwnProperty;

	var scripts = document.getElementsByTagName('script');
	var opScript = scripts[scripts.length - 1];
	var opScriptURL = /operative/.test(opScript.src) && opScript.src;

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

	// Expose:
	window.operative = operative;

	operative.setSelfURL = function(url) {
		opScriptURL = url;
	};

	/**
	 * Operative: Exposed Operative Constructor
	 * @param {Object} module Object containing methods/properties
	 */
	function Operative(module) {

		var _self = this;

		module.get = module.get || function(prop) {
			return this[prop];
		};

		module.set = module.set || function(prop, value) {
			return this[prop] = value;
		};

		this._msgQueue = [];
		this._curToken = 0;

		this.isDestroyed = false;
		this.workerIsReady = false;

		this.module = module;
		this.dataProperties = {};

		this.api = {};
		this.callbacks = {};

		if (operative.hasWorkerSupport) {
			this._setupWorker();
		} else {
			this._setupFallback();
		}

		for (var methodName in module) {
			if (hasOwn.call(module, methodName)) {
				this._createExposedMethod(methodName);
			}
		}

		this.api.__operative__ = this;

		// Provide the instance's destroy method on the exposed API:
		this.api.destroy = function() {
			return _self.destroy();
		};

		return this.api;
	}

	Operative.prototype = {

		_buildWorkerScript: function(doIncludeBoilerScript) {

			var script = [];
			var module = this.module;
			var dataProperties = this.dataProperties;
			var property;

			for (var i in module) {
				var property = module[i];
				if (typeof property == 'function') {
					script.push('	self["' + i.replace(/"/g, '\\"') + '"] = ' + property.toString() + ';');
				} else {
					dataProperties[i] = property;
				}
			}

			return script.join('\n') + (
				doIncludeBoilerScript ? '\n(' + workerBoilerScript.toString() + '());' : ''
			);

		},

		_onWorkerMessage: function(e) {
			var data = e.data;

			if (typeof data === 'string' && data.indexOf('pingback') === 0) {
				if (data === 'pingback:objectTransferSupport=NO') {
					// No transferrableObj support (marshal JSON from now on):
					this._marshal = function(o) { return JSON.stringify(o); };
					this._demarshal = function(o) { return JSON.parse(o); };
				}

				this.workerIsReady = true;
				this._postQueudMessages();
				return;
	
			}

			data = this._demarshal(data);

			switch (data.cmd) {
				case 'console': 
					window.console && window.console[data.method].apply(window.console, data.args);
					break;
				case 'result':
					if (data.token in this.callbacks) {
						var cb = this.callbacks[data.token];
						delete this.callbacks[data.token];
						cb(data.result);
					} else {
						throw new Error('Operative: Unmatched token: ' + data.token);
					}
					break;
			}
		},

		_marshal: function(v) {
			return v;
		},

		_demarshal: function(v) {
			return v;
		},

		_postWorkerMessage: function(msg) {
			if (!this.workerIsReady) {
				this._msgQueue.push(msg);
				return;
			}
			return this.worker.postMessage(this._marshal(msg));
		},

		_postQueudMessages: function() {
			var msgQueue = this._msgQueue;
			for (var i = 0, l = msgQueue.length; i < l; ++i) {
				this._postWorkerMessage( msgQueue[i] );
			}
			this._msgQueue = null;
		},

		_setupWorker: function() {

			var _self = this;

			var worker;

			if (workerViaBlobSupport) {
				worker = this.worker = new Worker( makeBlobURI(this._buildWorkerScript(true)) );
			}  else {
				if (!opScriptURL) {
					throw new Error('Operaritve: No operative.js URL available. Please set via operative.setSelfURL(...)');
				}
				worker = this.worker = new Worker( opScriptURL );
				// Marshal-agnostic initial message is boiler-code:
				// (We don't yet know if transferrableObjs are supported so we send a string)
				worker.postMessage('EVAL|' + this._buildWorkerScript(false));
			}

			worker.postMessage(['PING']); // Initial PING

			worker.addEventListener('message', function(e) {
				_self._onWorkerMessage(e);
			});
	
			this._postWorkerMessage({
				definitions: this.dataProperties
			});

		},

		_createExposedMethod: function(methodName) {

			var _self = this;

			this.api[methodName] = function() {

				if (_self.isDestroyed) {
					throw new Error('Operative: Cannot run method. Operative has already been destroyed');
				}

				var token = ++_self._curToken;
				var args = slice.call(arguments);
				var cb = args.pop();

				if (typeof cb != 'function') {
					throw new TypeError('Operative: Expected last argument to be Function (callback)');
				}

				if (operative.hasWorkerSupport) {

					_self._postWorkerMessage({
						method: methodName,
						args: args,
						token: token
					});

					_self.callbacks[token] = cb;

				} else {
					setTimeout(function() {

						var isAsync = false;

						_self.module.async = function() {
							isAsync = true;
							return cb;
						};

						var result = _self.module[methodName].apply(_self.module, args);

						_self.module.async = function() {
							throw new Error('Operative: async() called at odd time');
						};

						if (!isAsync) {
							cb(result);
						}

					}, 1);
				}
			};

		},

		_setupFallback: function() {
			this.module.isWorker = false;
			this.module.setup && this.module.setup();
		},

		destroy: function() {
			this.isDestroyed = true;
			if (this.worker) {
				this.worker.terminate();
			}
		}
	};

	operative.Operative = Operative;

	function operative(methods) {
		return new Operative(methods);
	}

/**
 * The boilerplate for the Worker Blob
 * (Be warned: this'll be executed within a worker, not here.)
 * Note: Indented @ Zero to make nicer debug code within worker :)
 */
function workerBoilerScript() {

	var postMessage = self.postMessage;
	var objectTransferSupport = null;

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

		if (objectTransferSupport == null) {

			// e.data of ['PING'] (An array) indicates transferrableObjSupport
			// e.data of '"PING"' (A string) indicates no support (Array has been serialized)
			objectTransferSupport = e.data[0] === 'PING';

			// Pingback to parent page:
			self.postMessage(
				objectTransferSupport ?
					'pingback:objectTransferSupport=YES' :
					'pingback:objectTransferSupport=NO'
			);

			if (!objectTransferSupport) {
				postMessage = function(msg) {
					// Marshal before sending
					return self.postMessage(JSON.stringify(msg));
				};
			}

			return;
		}

		if (!objectTransferSupport) {
			// Demarshal:
			data = JSON.parse(data);
		}

		var defs = data.definitions;

		if (defs) {
			// Initial definitions:
			for (var i in defs) {
				self[i] = defs[i];
			}
			self.setup && self.setup();
			return;
		}

		var isAsync = false;

		self.async = function() {
			isAsync = true;
			return function(r) {
				returnResult(r);
			};
		};

		var result = self[data.method].apply(self, data.args);

		// Clear so it's not accidentally used by other code
		self.async = function() {
			throw new Error('Operative: async() called at odd time');
		};

		if (!isAsync) {
			returnResult(result);
		}

		function returnResult(res) {
			postMessage({
				cmd: 'result',
				token: data.token,
				result: res
			});
		}
	});
}

}());

