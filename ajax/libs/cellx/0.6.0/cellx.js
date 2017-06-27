(function(undefined) {
	'use strict';

	var hasOwn = Object.prototype.hasOwnProperty;
	var toString = Object.prototype.toString;
	var push = Array.prototype.push;
	var slice = Array.prototype.slice;
	var splice = Array.prototype.splice;

	var global = Function('return this;')();

	var invokeCell;

	/**
	 * @typesign (value?, opts?: {
	 *     read?: (value): *,
	 *     validate?: (value): *,
	 *     computed?: false
	 * }): cellx;
	 *
	 * @typesign (formula: (): *, opts?: {
	 *     read?: (value): *,
	 *     write?: (value),
	 *     validate?: (value): *,
	 *     computed?: true,
	 *     pureComputed: boolean = false
	 * }): cellx;
	 */
	function cellx(value, opts) {
		if (!opts) {
			opts = {};
		}

		var initialValue = value;

		function cell(value) {
			return invokeCell(cell, initialValue, opts, this, value, slice.call(arguments, 1), arguments.length);
		}
		cell.constructor = cellx;

		return cell;
	}

	if (typeof exports != 'undefined') {
		if (typeof module != 'undefined') {
			module.exports = cellx;
		} else {
			exports.cellx = cellx;
		}
	} else {
		global.cellx = cellx;
	}

	/**
	 * @memberOf cellx
	 */
	var KEY_UID = '__cellx_uid__';
	/**
	 * @memberOf cellx
	 */
	var KEY_INNER = '__cellx_inner__';
	/**
	 * @memberOf cellx
	 */
	var KEY_USED = '__cellx_used__';
	/**
	 * @memberOf cellx
	 */
	var KEY_CELLS = '__cellx_cells__';

	if (global.Symbol && typeof Symbol.iterator == 'symbol') {
		KEY_UID = Symbol(KEY_UID);
		KEY_INNER = Symbol(KEY_INNER);
		KEY_USED = Symbol(KEY_USED);
		KEY_CELLS = Symbol(KEY_CELLS);
	}

	cellx.KEY_UID = KEY_UID;
	cellx.KEY_INNER = KEY_INNER;
	cellx.KEY_USED = KEY_USED;
	cellx.KEY_CELLS = KEY_CELLS;

	var uidCounter = 0;

	/**
	 * @typesign (fn: Function): boolean;
	 */
	function isNative(fn) {
		return fn.toString().indexOf('[native code]') != -1;
	}

	/**
	 * @memberOf cellx
	 * @typesign (err);
	 */
	var logError;

	if (global.console) {
		if (console.error) {
			logError = function(err) {
				console.error(err === Object(err) && err.stack || err);
			};
		} else {
			logError = function(err) {
				console.log('!!! ' + (err === Object(err) && err.stack || err));
			};
		}
	} else {
		logError = function() {};
	}

	cellx.logError = logError;

	/**
	 * https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero
	 * @typesign (a, b): boolean;
	 */
	function svz(a, b) {
		return a === b || (a != a && b != b);
	}

	/**
	 * @typesign (proto: Object): Object;
	 */
	var create = Object.create || function(proto) {
		function F() {}
		F.prototype = proto;
		return new F();
	};

	/**
	 * @typesign (target: Object, source: Object);
	 */
	var assign = Object.assign || function assign(target, source) {
		for (var name in source) {
			if (hasOwn.call(source, name)) {
				target[name] = source[name];
			}
		}

		return target;
	};

	/**
	 * @typesign (child: Function, parent: Function): Function;
	 */
	function extend(child, parent) {
		function F() {
			this.constructor = child;
		}
		F.prototype = parent.prototype;

		child.prototype = new F();
		return child;
	}

	/**
	 * @typesign (value): boolean;
	 */
	var isArray = Array.isArray || function(value) {
		return toString.call(value) == '[object Array]';
	};

	/**
	 * @typesign (): uint;
	 */
	var now = Date.now || function() {
		return +new Date();
	};

	// gulp-include
	(function() {
		var create = Object.create;
		var Dictionary;
	
		if (create && isNative(create)) {
			Dictionary = function() {
				return create(null);
			};
		} else {
			// IE8
			Dictionary = function() {
				var iframe = document.createElement('iframe');
				var container = document.body || document.documentElement;
	
				iframe.style.display = 'none';
				container.appendChild(iframe);
				iframe.src = 'javascript:';
	
				var empty = iframe.contentWindow.Object.prototype;
	
				container.removeChild(iframe);
				iframe = null;
	
				delete empty.constructor;
				delete empty.isPrototypeOf;
				delete empty.hasOwnProperty;
				delete empty.propertyIsEnumerable;
				delete empty.valueOf;
				delete empty.toString;
				delete empty.toLocaleString;
	
				Dictionary = function() {};
				Dictionary.prototype = empty;
	
				return new Dictionary();
			};
		}
	
		cellx.Dictionary = Dictionary;
	})();
	

	(function() {
		var Map = global.Map;
	
		if (!Map) {
			var Dictionary = cellx.Dictionary;
	
			var entryStub = { value: undefined };
	
			Map = function Map(arr) {
				this._entries = new Dictionary();
				this._objectStamps = {};
	
				this._first = null;
				this._last = null;
	
				this.size = 0;
	
				if (arr) {
					for (var i = 0, l = arr.length; i < l; i++) {
						this.set(arr[i][0], arr[i][1]);
					}
				}
			};
	
			assign(Map.prototype, {
				has: function(key) {
					return !!this._entries[this._getValueStamp(key)];
				},
	
				get: function(key) {
					return (this._entries[this._getValueStamp(key)] || entryStub).value;
				},
	
				set: function(key, value) {
					var entries = this._entries;
					var keyStamp = this._getValueStamp(key);
	
					if (entries[keyStamp]) {
						entries[keyStamp].value = value;
					} else {
						var entry = entries[keyStamp] = {
							key: key,
							keyStamp: keyStamp,
							value: value,
							prev: this._last,
							next: null
						};
	
						if (this.size++) {
							this._last.next = entry;
						} else {
							this._first = entry;
						}
	
						this._last = entry;
					}
	
					return this;
				},
	
				'delete': function(key) {
					var keyStamp = this._getValueStamp(key);
					var entry = this._entries[keyStamp];
	
					if (!entry) {
						return false;
					}
	
					if (--this.size) {
						var prev = entry.prev;
						var next = entry.next;
	
						if (prev) {
							prev.next = next;
						} else {
							this._first = next;
						}
	
						if (next) {
							next.prev = prev;
						} else {
							this._last = prev;
						}
					} else {
						this._first = null;
						this._last = null;
					}
	
					delete this._entries[keyStamp];
					delete this._objectStamps[keyStamp];
	
					return true;
				},
	
				clear: function() {
					var entries = this._entries;
	
					for (var stamp in entries) {
						delete entries[stamp];
					}
	
					this._objectStamps = {};
	
					this._first = null;
					this._last = null;
	
					this.size = 0;
				},
	
				_getValueStamp: function(value) {
					switch (typeof value) {
						case 'undefined': {
							return 'undefined';
						}
						case 'object': {
							if (value === null) {
								return 'null';
							}
	
							break;
						}
						case 'boolean': {
							return '?' + value;
						}
						case 'number': {
							return '+' + value;
						}
						case 'string': {
							return ',' + value;
						}
					}
	
					return this._getObjectStamp(value);
				},
	
				_getObjectStamp: (function() {
					// for non-extensible objects and IE8
					function getObjectStamp(obj) {
						var stamps = this._objectStamps;
						var stamp;
	
						for (stamp in stamps) {
							if (stamps[stamp] == obj) {
								return stamp;
							}
						}
	
						stamp = String(++uidCounter);
						stamps[stamp] = obj;
						return stamp;
					}
	
					if (
						Object.defineProperty && isNative(Object.defineProperty) &&
							Object.isExtensible && isNative(Object.isExtensible)
					) {
						return function(obj) {
							if (!hasOwn.call(obj, KEY_UID)) {
								if (!Object.isExtensible(obj)) {
									return getObjectStamp.call(this, obj);
								}
	
								Object.defineProperty(obj, KEY_UID, {
									value: String(++uidCounter)
								});
							}
	
							return obj[KEY_UID];
						};
					}
	
					return getObjectStamp;
				})(),
	
				forEach: function(cb, context) {
					if (context == null) {
						context = global;
					}
	
					var entry = this._first;
	
					while (entry) {
						cb.call(context, entry.value, entry.key, this);
	
						do {
							entry = entry.next;
						} while (entry && !this._entries[entry.keyStamp]);
					}
				},
	
				toString: function() {
					return '[object Map]';
				}
			});
	
			var iterators = [
				['keys', function(entry) {
					return entry.key;
				}],
				['values', function(entry) {
					return entry.value;
				}],
				['entries', function(entry) {
					return [entry.key, entry.value];
				}]
			];
	
			for (var i = 0, l = iterators.length; i < l; i++) {
				Map.prototype[iterators[i][0]] = (function(getStepValue) {
					return function() {
						var entries = this._entries;
						var entry;
						var done = false;
						var map = this;
	
						return {
							next: function() {
								if (!done) {
									if (entry) {
										do {
											entry = entry.next;
										} while (entry && !entries[entry.keyStamp]);
									} else {
										entry = map._first;
									}
	
									if (entry) {
										return {
											value: getStepValue(entry),
											done: false
										};
									}
	
									done = true;
								}
	
								return {
									value: undefined,
									done: true
								};
							}
						};
					};
				})(iterators[i][1]);
			}
		}
	
		cellx.Map = Map;
	})();
	

	(function() {
		var Set = global.Set;
	
		if (!Set) {
			var Map = cellx.Map;
	
			Set = function Set(arr) {
				this._entries = new Map();
	
				this.size = 0;
	
				if (arr) {
					for (var i = 0, l = arr.length; i < l; i++) {
						this.add(arr[i]);
					}
				}
			};
	
			assign(Set.prototype, {
				has: function(value) {
					return this._entries.has(value);
				},
	
				add: function(value) {
					this._entries.set(value, value);
					this.size = this._entries.size;
					return this;
				},
	
				'delete': function(value) {
					if (this._entries['delete'](value)) {
						this.size--;
						return true;
					}
	
					return false;
				},
	
				clear: function() {
					this._entries.clear();
					this.size = 0;
				},
	
				forEach: function(cb, context) {
					if (context == null) {
						context = global;
					}
	
					this._entries.forEach(function(value) {
						cb.call(context, value, value, this);
					}, this);
				},
	
				keys: function() {
					return this._entries.keys();
				},
	
				values: function() {
					return this._entries.values();
				},
	
				entries: function() {
					return this._entries.entries();
				},
	
				toString: function() {
					return '[object Set]';
				}
			});
		}
	
		cellx.Set = Set;
	})();
	

	(function() {
		/**
		 * @memberOf cellx
		 *
		 * @example
		 * nextTick(function() {
		 *     console.log('nextTick');
		 * });
		 *
		 * @typesign (cb: Function);
		 */
		var nextTick;
	
		if (global.process && process.toString() == '[object process]' && process.nextTick) {
			nextTick = process.nextTick;
		} else if (global.setImmediate) {
			nextTick = function(cb) {
				setImmediate(cb);
			};
		} else if (global.Promise && isNative(Promise)) {
			var prm = Promise.resolve();
	
			nextTick = function(cb) {
				prm.then(function() {
					cb();
				});
			};
		} else if (global.postMessage && !global.ActiveXObject) {
			var queue;
	
			global.addEventListener('message', function() {
				if (queue) {
					var q = queue;
	
					queue = null;
	
					for (var i = 0, l = q.length; i < l; i++) {
						try {
							q[i]();
						} catch (err) {
							cellx.logError(err);
						}
					}
				}
			}, false);
	
			nextTick = function(cb) {
				if (queue) {
					queue.push(cb);
				} else {
					queue = [cb];
					global.postMessage('__tic__', '*');
				}
			};
		} else {
			nextTick = function(cb) {
				setTimeout(cb, 1);
			};
		}
	
		cellx.nextTick = nextTick;
	})();
	

	(function() {
		/**
		 * @class cellx.Event
		 * @extends {Object}
		 * @typesign new (type: string, canBubble: boolean = true): cellx.Event;
		 */
		function Event(type, canBubble) {
			/**
			 * Объект, к которому применено событие.
			 * @type {?Object}
			 * @writable
			 */
			this.target = null;
	
			/**
			 * @type {string}
			 */
			this.type = type;
	
			/**
			 * @type {int|undefined}
			 * @writable
			 */
			this.timestamp = undefined;
	
			/**
			 * Дополнительная информация по событию.
			 * @type {?Object}
			 * @writable
			 */
			this.detail = null;
	
			/**
			 * Является ли событие всплывающим.
			 */
			this.bubbles = canBubble !== false;
	
			/**
			 * Распространение события на другие объекты остановлено.
			 */
			this.isPropagationStopped = false;
			/**
			 * Распространение события на другие объекты и его обработка на текущем остановлены.
			 */
			this.isImmediatePropagationStopped = false;
		}
	
		assign(Event.prototype, {
			/**
			 * Останавливает распространение события на другие объекты.
			 * @typesign ();
			 */
			stopPropagation: function() {
				this.isPropagationStopped = true;
			},
	
			/**
			 * Останавливает распространение события на другие объекты, а также его обработку на текущем.
			 * @typesign ();
			 */
			stopImmediatePropagation: function() {
				this.isPropagationStopped = true;
				this.isImmediatePropagationStopped = true;
			}
		});
	
		cellx.Event = Event;
	})();
	

	(function() {
		var Map = cellx.Map;
		var Set = cellx.Set;
		var Event = cellx.Event;
	
		/**
		 * @class cellx.EventEmitter
		 * @extends {Object}
		 * @typesign new (): cellx.EventEmitter;
		 */
		function EventEmitter() {
			/**
			 * @type {Map<string, Set<{ listener: Function, context: Object }>>}
			 */
			this._events = new Map();
		}
	
		assign(EventEmitter.prototype, {
			/**
			 * @typesign (
			 *     type: string,
			 *     listener: (evt: cellx.Event): boolean|undefined,
			 *     context?: Object
			 * ): cellx.EventEmitter;
			 *
			 * @typesign (
			 *     listeners: Object<(evt: cellx.Event): boolean|undefined>,
			 *     context?: Object
			 * ): cellx.EventEmitter;
			 */
			on: function(type, listener, context) {
				if (typeof type == 'object') {
					context = listener;
	
					var listeners = type;
	
					for (type in listeners) {
						this._on(type, listeners[type], context);
					}
				} else {
					this._on(type, listener, context);
				}
	
				return this;
			},
			/**
			 * @typesign (
			 *     type: string,
			 *     listener: (evt: cellx.Event): boolean|undefined,
			 *     context?: Object
			 * ): cellx.EventEmitter;
			 *
			 * @typesign (
			 *     listeners: Object<(evt: cellx.Event): boolean|undefined>,
			 *     context?: Object
			 * ): cellx.EventEmitter;
			 *
			 * @typesign (): cellx.EventEmitter;
			 */
			off: function(type, listener, context) {
				if (type) {
					if (typeof type == 'object') {
						context = listener;
	
						var listeners = type;
	
						for (type in listeners) {
							this._off(type, listeners[type], context);
						}
					} else {
						this._off(type, listener, context);
					}
				} else if (this._events) {
					this._events.clear();
				}
	
				return this;
			},
	
			/**
			 * @typesign (
			 *     type: string,
			 *     listener: (evt: cellx.Event): boolean|undefined,
			 *     context?: Object
			 * );
			 */
			_on: function(type, listener, context) {
				var events = (this._events || (this._events = new Map())).get(type);
	
				if (events) {
					events.add({ listener: listener, context: context || this });
				} else {
					this._events.set(type, new Set([{ listener: listener, context: context || this }]));
				}
			},
			/**
			 * @typesign (
			 *     type: string,
			 *     listener: (evt: cellx.Event): boolean|undefined,
			 *     context?: Object
			 * );
			 */
			_off: function(type, listener, context) {
				var events = this._events || (this._events = new Map()).get(type);
	
				if (!events) {
					return;
				}
	
				if (!context) {
					context = this;
				}
	
				for (var iterator = events.values(), step; !(step = iterator.next()).done;) {
					var evt = step.value;
	
					if (evt.context == context) {
						var evtListener = evt.listener;
	
						if (
							evtListener == listener ||
								(evtListener.hasOwnProperty(KEY_INNER) && evtListener[KEY_INNER] == listener)
						) {
							events['delete'](evt);
							break;
						}
					}
				}
			},
	
			/**
			 * @typesign (
			 *     type: string,
			 *     listener: (evt: cellx.Event): boolean|undefined,
			 *     context?: Object
			 * ): cellx.EventEmitter;
			 */
			once: function(type, listener, context) {
				function wrap() {
					this._off(type, wrap, context);
					listener.apply(this, arguments);
				}
				wrap[KEY_INNER] = listener;
	
				this._on(type, wrap, context);
	
				return this;
			},
	
			/**
			 * @typesign (evt: cellx.Event, detail?: Object): cellx.Event;
			 * @typesign (type: string, detail?: Object): cellx.Event;
			 */
			emit: function(evt, detail) {
				if (typeof evt == 'string') {
					evt = new Event(evt);
				} else if (evt.hasOwnProperty(KEY_USED)) {
					throw new TypeError('Attempt to use an object that is no longer usable');
				}
	
				evt[KEY_USED] = true;
	
				evt.target = this;
				evt.timestamp = now();
	
				if (detail) {
					evt.detail = detail;
				}
	
				this._handleEvent(evt);
	
				return evt;
			},
	
			/**
			 * @typesign (evt: cellx.Event);
			 */
			_handleEvent: function(evt) {
				var type = evt.type;
				var events = this._events && this._events.get(type);
	
				if (!events) {
					return;
				}
	
				for (var iterator = events.values(), step; !(step = iterator.next()).done;) {
					if (evt.isImmediatePropagationStopped) {
						break;
					}
	
					try {
						if (step.value.listener.call(step.value.context, evt) === false) {
							evt.stopPropagation();
						}
					} catch (err) {
						this._logError(err);
					}
				}
			},
	
			/**
			 * @typesign (err);
			 */
			_logError: function(err) {
				cellx.logError(err);
			}
		});
	
		cellx.EventEmitter = EventEmitter;
	})();
	

	var MActiveCollection;
	
	(function() {
		var EventEmitter = cellx.EventEmitter;
	
		MActiveCollection = {
			/**
			 * @typesign (evt: cellx.Event);
			 */
			_onItemChange: function(evt) {
				this._handleEvent(evt);
			},
	
			/**
			 * @typesign (value);
			 */
			_registerValue: function(value) {
				var valueCounts = this._valueCounts;
				var valueCount = valueCounts.get(value);
	
				if (valueCount) {
					valueCounts.set(value, valueCount + 1);
				} else {
					valueCounts.set(value, 1);
	
					if (this.adoptsItemChanges && value instanceof EventEmitter) {
						value.on('change', this._onItemChange, this);
					}
				}
			},
	
			/**
			 * @typesign (value);
			 */
			_unregisterValue: function(value) {
				var valueCounts = this._valueCounts;
				var valueCount = valueCounts.get(value);
	
				if (valueCount > 1) {
					valueCounts.set(value, valueCount - 1);
				} else {
					valueCounts['delete'](value);
	
					if (this.adoptsItemChanges && value instanceof EventEmitter) {
						value.off('change', this._onItemChange, this);
					}
				}
			},
	
			/**
			 * Уничтожает инстанс освобождая занятые им ресурсы.
			 * @typesign ();
			 */
			dispose: function() {
				if (this.adoptsItemChanges) {
					var onItemChange = this._onItemChange;
	
					this._valueCounts.forEach(function(value) {
						if (value instanceof EventEmitter) {
							value.off('change', onItemChange, this);
						}
					}, this);
				}
			}
		};
	})();
	

	(function() {
		var Map = cellx.Map;
	
		/**
		 * @class cellx.ActiveMap
		 * @extends {cellx.EventEmitter}
		 *
		 * @typesign new (entries?: Object|Array<{ 0, 1 }>|cellx.ActiveMap, opts?: {
		 *     adoptsItemChanges: boolean = true
		 * }): cellx.ActiveMap;
		 */
		function ActiveMap(entries, opts) {
			/**
			 * @type {Map}
			 */
			this._entries = new Map();
			/**
			 * @type {Map<*, uint>}
			 */
			this._valueCounts = new Map();
	
			this.size = 0;
	
			/**
			 * @type {boolean}
			 */
			this.adoptsItemChanges = !opts || opts.adoptsItemChanges !== false;
	
			if (entries) {
				var thisEntries = this._entries;
	
				if (entries instanceof ActiveMap) {
					entries._entries.forEach(function(value, key) {
						thisEntries.set(key, value);
						this._registerValue(value);
					}, this);
				} else if (isArray(entries)) {
					for (var i = 0, l = entries.length; i < l; i++) {
						var entry = entries[i];
	
						thisEntries.set(entry[0], entry[1]);
						this._registerValue(entry[1]);
					}
				} else {
					for (var key in entries) {
						thisEntries.set(key, entries[key]);
						this._registerValue(entries[key]);
					}
				}
	
				this.size = thisEntries.size;
			}
		}
		extend(ActiveMap, cellx.EventEmitter);
	
		assign(ActiveMap.prototype, MActiveCollection);
		assign(ActiveMap.prototype, {
			/**
			 * @typesign (key): boolean;
			 */
			has: function(key) {
				return this._entries.has(key);
			},
	
			/**
			 * @typesign (value): boolean;
			 */
			contains: function(value) {
				return this._valueCounts.has(value);
			},
	
			/**
			 * @typesign (key): *;
			 */
			get: function(key) {
				return this._entries.get(key);
			},
	
			/**
			 * @typesign (key, value): cellx.ActiveMap;
			 */
			set: function(key, value) {
				var entries = this._entries;
				var hasKey = entries.has(key);
				var oldValue;
	
				if (hasKey) {
					oldValue = entries.get(key);
	
					if (svz(oldValue, value)) {
						return this;
					}
	
					this._unregisterValue(oldValue);
				}
	
				entries.set(key, value);
				this._registerValue(value);
	
				if (!hasKey) {
					this.size++;
				}
	
				this.emit('change', {
					type: hasKey ? 'update' : 'add',
					key: key,
					oldValue: oldValue,
					value: value
				});
	
				return this;
			},
	
			/**
			 * @typesign (key): boolean;
			 */
			'delete': function(key) {
				var entries = this._entries;
	
				if (!entries.has(key)) {
					return false;
				}
	
				var value = entries.get(key);
	
				entries['delete'](key);
				this._unregisterValue(value);
	
				this.size--;
	
				this.emit('change', {
					type: 'delete',
					key: key,
					oldValue: value,
					value: undefined
				});
	
				return true;
			},
	
			/**
			 * @typesign (): cellx.ActiveMap;
			 */
			clear: function() {
				if (!this.size) {
					return this;
				}
	
				this._entries.clear();
				this._valueCounts.clear();
				this.size = 0;
	
				this.emit('change', { type: 'clear' });
	
				return this;
			},
	
			/**
			 * @typesign (cb: (value, key, map: cellx.ActiveMap), context?: Object);
			 */
			forEach: function(cb, context) {
				if (context == null) {
					context = global;
				}
	
				this._entries.forEach(function(value, key) {
					cb.call(context, value, key, this);
				}, this);
			},
	
			/**
			 * @typesign (): { next: (): { value, done: boolean } };
			 */
			keys: function() {
				return this._entries.keys();
			},
	
			/**
			 * @typesign (): { next: (): { value, done: boolean } };
			 */
			values: function() {
				return this._entries.values();
			},
	
			/**
			 * @typesign (): { next: (): { value: { 0, 1 }, done: boolean } };
			 */
			entries: function() {
				return this._entries.entries();
			},
	
			/**
			 * @typesign (): cellx.ActiveMap;
			 */
			clone: function() {
				return new this.constructor(this, {
					adoptsItemChanges: this.adoptsItemChanges
				});
			}
		});
	
		cellx.ActiveMap = ActiveMap;
	
		/**
		 * @memberOf cellx
		 *
		 * @typesign (entries?: Object|Array<{ 0, 1 }>|cellx.ActiveMap, opts?: {
		 *     adoptsItemChanges: boolean = true
		 * }): cellx.ActiveMap;
		 *
		 * @typesign (entries?: Object|Array<{ 0, 1 }>|cellx.ActiveMap, adoptsItemChanges: boolean = true): cellx.ActiveMap;
		 */
		function map(entries, opts) {
			return new ActiveMap(entries, typeof opts == 'boolean' ? { adoptsItemChanges: opts } : opts);
		}
	
		cellx.map = map;
	})();
	

	(function() {
		var arrayProto = Array.prototype;
	
		/**
		 * @typesign (a, b): enum[-1, 1, 0];
		 */
		function defaultComparator(a, b) {
			if (a < b) {
				return -1;
			}
			if (a > b) {
				return 1;
			}
			return 0;
		}
	
		/**
		 * @typesign (list: cellx.ActiveList, items: Array);
		 */
		function addRange(list, items) {
			var listItems = list._items;
	
			if (list.sorted) {
				var comparator = list.comparator;
	
				for (var i = 0, l = items.length; i < l; i++) {
					var item = items[i];
					var low = 0;
					var high = listItems.length;
	
					while (low != high) {
						var mid = (low + high) >> 1;
	
						if (comparator(item, listItems[mid]) < 0) {
							high = mid;
						} else {
							low = mid + 1;
						}
					}
	
					listItems.splice(low, 0, item);
					list._registerValue(item);
				}
			} else {
				push.apply(listItems, items);
	
				for (var j = items.length; j;) {
					list._registerValue(items[--j]);
				}
			}
	
			list.length = listItems.length;
		}
	
		/**
		 * @class cellx.ActiveList
		 * @extends {cellx.EventEmitter}
		 *
		 * @typesign new (items?: Array|cellx.ActiveList, opts?: {
		 *     adoptsItemChanges: boolean = true,
		 *     comparator?: (a, b): int,
		 *     sorted?: boolean
		 * }): cellx.ActiveList;
		 */
		function ActiveList(items, opts) {
			if (!opts) {
				opts = {};
			}
	
			/**
			 * @type {Array}
			 */
			this._items = [];
			/**
			 * @type {Map<*, uint>}
			 */
			this._valueCounts = new Map();
	
			this.length = 0;
	
			/**
			 * @type {boolean}
			 */
			this.adoptsItemChanges = opts.adoptsItemChanges !== false;
	
			/**
			 * @type {?Function}
			 */
			this.comparator = null;
	
			this.sorted = false;
	
			if (opts.sorted || (opts.comparator && opts.sorted !== false)) {
				this.comparator = opts.comparator || defaultComparator;
				this.sorted = true;
			}
	
			if (items) {
				addRange(this, items instanceof ActiveList ? items._items : items);
			}
		}
		extend(ActiveList, cellx.EventEmitter);
	
		assign(ActiveList.prototype, MActiveCollection);
		assign(ActiveList.prototype, {
			/**
			 * @typesign (index: int, endIndex: boolean = false): uint|undefined;
			 */
			_validateIndex: function(index, endIndex) {
				if (index === undefined) {
					return index;
				}
	
				if (index < 0) {
					index += this.length;
	
					if (index < 0) {
						throw new RangeError('Index out of range');
					}
				} else if (index >= (this.length + (endIndex ? 1 : 0))) {
					throw new RangeError('Index out of range');
				}
	
				return index;
			},
	
			/**
			 * @typesign (value): boolean;
			 */
			contains: function(value) {
				return this._valueCounts.has(value);
			},
	
			/**
			 * @typesign (value, fromIndex: int = 0): int;
			 */
			indexOf: function(value, fromIndex) {
				return this._items.indexOf(value, this._validateIndex(fromIndex));
			},
	
			/**
			 * @typesign (value, fromIndex: int = -1): int;
			 */
			lastIndexOf: function(value, fromIndex) {
				return this._items.lastIndexOf(value, this._validateIndex(fromIndex));
			},
	
			/**
			 * @typesign (index: int): *;
			 */
			get: function(index) {
				return this._items[this._validateIndex(index)];
			},
	
			/**
			 * @typesign (index: int = 0, count?: uint): Array;
			 */
			getRange: function(index, count) {
				index = this._validateIndex(index || 0, true);
	
				var items = this._items;
	
				if (count === undefined) {
					return items.slice(index);
				}
	
				if (index + count > items.length) {
					throw new RangeError('"index" and "count" do not denote a valid range');
				}
	
				return items.slice(index, index + count);
			},
	
			/**
			 * @typesign (index: int, value): cellx.ActiveList;
			 */
			set: function(index, value) {
				if (this.sorted) {
					throw new TypeError('Can\'t set to sorted list');
				}
	
				index = this._validateIndex(index);
	
				var items = this._items;
	
				if (svz(items[index], value)) {
					return this;
				}
	
				this._unregisterValue(items[index]);
	
				items[index] = value;
				this._registerValue(value);
	
				this.emit('change');
	
				return this;
			},
	
			/**
			 * @typesign (index: int, items: Array): cellx.ActiveList;
			 */
			setRange: function(index, items) {
				if (this.sorted) {
					throw new TypeError('Can\'t set to sorted list');
				}
	
				index = this._validateIndex(index);
	
				var itemCount = items.length;
	
				if (!itemCount) {
					return this;
				}
	
				if (index + itemCount > this.length) {
					throw new RangeError('"index" and length of "items" do not denote a valid range');
				}
	
				var thisItems = this._items;
				var changed = false;
	
				for (var i = index + itemCount; i > index;) {
					var item = items[--i];
	
					if (!svz(thisItems[i], item)) {
						this._unregisterValue(thisItems[i]);
	
						thisItems[i] = item;
						this._registerValue(item);
	
						changed = true;
					}
				}
	
				if (changed) {
					this.emit('change');
				}
	
				return this;
			},
	
			/**
			 * @typesign (item): cellx.ActiveList;
			 */
			add: function(item) {
				this.addRange([item]);
				return this;
			},
	
			/**
			 * @typesign (items: Array): cellx.ActiveList;
			 */
			addRange: function(items) {
				if (!items.length) {
					return this;
				}
	
				addRange(this, items);
				this.emit('change');
	
				return this;
			},
	
			/**
			 * @typesign (index: int, item): cellx.ActiveList;
			 */
			insert: function(index, item) {
				this.insertRange(index, [item]);
				return this;
			},
	
			/**
			 * @typesign (index: int, items: Array): cellx.ActiveList;
			 */
			insertRange: function(index, items) {
				if (this.sorted) {
					throw new TypeError('Can\'t insert to sorted list');
				}
	
				index = this._validateIndex(index, true);
	
				var itemCount = items.length;
	
				if (!itemCount) {
					return this;
				}
	
				splice.apply(this._items, [].concat(index, 0, items));
	
				for (var i = itemCount; i;) {
					this._registerValue(items[--i]);
				}
	
				this.length += itemCount;
	
				this.emit('change');
	
				return this;
			},
	
			/**
			 * @typesign (item, fromIndex: int = 0): cellx.ActiveList;
			 */
			remove: function(item, fromIndex) {
				var index = this._items.indexOf(item, this._validateIndex(fromIndex));
	
				if (index == -1) {
					return this;
				}
	
				this._items.splice(index, 1);
				this._unregisterValue(item);
	
				this.length--;
	
				this.emit('change');
	
				return this;
			},
	
			/**
			 * @typesign (item, fromIndex: int = 0): cellx.ActiveList;
			 */
			removeAll: function(item, fromIndex) {
				var items = this._items;
				var index = this._validateIndex(fromIndex);
				var changed = false;
	
				while ((index = items.indexOf(item, index)) != -1) {
					items.splice(index, 1);
					this._unregisterValue(item);
	
					changed = true;
				}
	
				if (changed) {
					this.length = items.length;
					this.emit('change');
				}
	
				return this;
			},
	
			/**
			 * @typesign (index: int): cellx.ActiveList;
			 */
			removeAt: function(index) {
				this._unregisterValue(this._items.splice(this._validateIndex(index), 1)[0]);
				this.length--;
	
				this.emit('change');
	
				return this;
			},
	
			/**
			 * @typesign (index: int = 0, count?: uint): cellx.ActiveList;
			 */
			removeRange: function(index, count) {
				index = this._validateIndex(index || 0, true);
	
				var items = this._items;
	
				if (count === undefined) {
					count = items.length - index;
				} else if (index + count > items.length) {
					throw new RangeError('"index" and "count" do not denote a valid range');
				}
	
				if (!count) {
					return this;
				}
	
				for (var i = index + count; i > index;) {
					this._unregisterValue(items[--i]);
				}
				items.splice(index, count);
	
				this.length -= count;
	
				this.emit('change');
	
				return this;
			},
	
			/**
			 * @typesign (): cellx.ActiveList;
			 */
			clear: function() {
				if (this.length) {
					this._items.length = 0;
					this._valueCounts.clear();
	
					this.length = 0;
	
					this.emit('change');
				}
	
				return this;
			},
	
			/**
			 * @typesign (separator: string = ','): string;
			 */
			join: function(separator) {
				return this._items.join(separator);
			},
	
			/**
			 * @typesign (cb: (item, index: uint, arr: cellx.ActiveList), context: Object = global);
			 */
			forEach: null,
	
			/**
			 * @typesign (cb: (item, index: uint, arr: cellx.ActiveList): *, context: Object = global): Array;
			 */
			map: null,
	
			/**
			 * @typesign (cb: (item, index: uint, arr: cellx.ActiveList): boolean, context: Object = global): Array;
			 */
			filter: null,
	
			/**
			 * @typesign (cb: (item, index: uint, arr: cellx.ActiveList): boolean, context: Object = global): boolean;
			 */
			every: null,
	
			/**
			 * @typesign (cb: (item, index: uint, arr: cellx.ActiveList): boolean, context: Object = global): boolean;
			 */
			some: null,
	
			/**
			 * @typesign (cb: (accumulator: *, item, index: uint, arr: cellx.ActiveList): *, initialValue?): *;
			 */
			reduce: null,
	
			/**
			 * @typesign (cb: (accumulator: *, item, index: uint, arr: cellx.ActiveList): *, initialValue?): *;
			 */
			reduceRight: null,
	
			/**
			 * @typesign (): cellx.ActiveList;
			 */
			clone: function() {
				return new this.constructor(this, {
					adoptsItemChanges: this.adoptsItemChanges,
					comparator: this.comparator,
					sorted: this.sorted
				});
			},
	
			/**
			 * @typesign (): Array;
			 */
			toArray: function() {
				return this._items.slice(0);
			},
	
			/**
			 * @typesign (): string;
			 */
			toString: function() {
				return this._items.join();
			}
		});
	
		var methods = ['forEach', 'map', 'filter', 'every', 'some', 'reduce', 'reduceRight'];
	
		for (var i = methods.length; i;) {
			(function(name) {
				ActiveList.prototype[name] = function() {
					return arrayProto[name].apply(this._items, arguments);
				};
			})(methods[--i]);
		}
	
		cellx.ActiveList = ActiveList;
	
		/**
		 * @memberOf cellx
		 *
		 * @typesign (items?: Array|cellx.ActiveList, opts?: {
		 *     adoptsItemChanges: boolean = true,
		 *     comparator?: (a, b): int,
		 *     sorted?: boolean
		 * }): cellx.ActiveList;
		 *
		 * @typesign (items?: Array|cellx.ActiveList, adoptsItemChanges: boolean = true): cellx.ActiveList;
		 */
		function list(items, opts) {
			return new ActiveList(items, typeof opts == 'boolean' ? { adoptsItemChanges: opts } : opts);
		}
	
		cellx.list = list;
	})();
	

	(function() {
		var Map = cellx.Map;
		var Set = cellx.Set;
		var nextTick = cellx.nextTick;
		var Event = cellx.Event;
		var EventEmitter = cellx.EventEmitter;
	
		var STATE_CHANGES_COMBINING = 0;
		var STATE_CHANGES_HANDLING = 1;
		var STATE_SLAVES_RECALCULATION = 2;
	
		var state = STATE_CHANGES_COMBINING;
	
		/**
		 * @type {Map<cellx.Cell, { event: cellx.Event, cancellable: boolean }>}
		 */
		var changes = new Map();
		/**
		 * @type {Array<cellx.Cell>}
		 */
		var outdatedCells = [];
	
		/**
		 * @type {Set<cellx.Cell>}
		 */
		var detectedMasters = null;
	
		var releaseVersion = 1;
	
		/**
		 * @typesign (cell: cellx.Cell);
		 */
		function registerOutdatedCell(cell) {
			if (outdatedCells.length) {
				var maxMasterLevel = cell._maxMasterLevel;
				var low = 0;
				var high = outdatedCells.length;
	
				while (low != high) {
					var mid = (low + high) >> 1;
	
					if (maxMasterLevel < outdatedCells[mid]._maxMasterLevel) {
						low = mid + 1;
					} else {
						high = mid;
					}
				}
	
				outdatedCells.splice(low, 0, cell);
			} else {
				outdatedCells.push(cell);
			}
		}
	
		/**
		 * @typesign (cell: cellx.Cell);
		 */
		function registerOutdatedCellIf(cell) {
			if (cell._outdated) {
				return;
			}
	
			registerOutdatedCell(cell);
			cell._outdated = true;
		}
	
		/**
		 * @typesign ();
		 */
		function handleChanges() {
			state = STATE_CHANGES_HANDLING;
	
			for (var iterator = changes.entries(), step; !(step = iterator.next()).done;) {
				var cell = step.value[0];
	
				changes['delete'](cell);
	
				cell._slaves.forEach(registerOutdatedCellIf);
	
				cell._fixedValue = cell._value;
				cell._changed = true;
	
				cell._handleEvent(step.value[1].event);
	
				if (state != STATE_CHANGES_HANDLING) {
					return;
				}
			}
		}
	
		/**
		 * @typesign ();
		 */
		function releaseChanges() {
			if (changes.size) {
				handleChanges();
	
				if (state != STATE_CHANGES_HANDLING) {
					return;
				}
			} else if (state == STATE_CHANGES_COMBINING) {
				return;
			}
	
			state = STATE_SLAVES_RECALCULATION;
	
			while (outdatedCells.length) {
				var cell = outdatedCells[outdatedCells.length - 1];
	
				if (cell._recalc()) {
					registerOutdatedCell(outdatedCells.pop());
				} else {
					outdatedCells.pop();
					cell._outdated = false;
				}
	
				if (changes.size) {
					handleChanges();
	
					if (state != STATE_CHANGES_HANDLING) {
						return;
					}
	
					state = STATE_SLAVES_RECALCULATION;
				}
			}
	
			releaseVersion++;
			state = STATE_CHANGES_COMBINING;
		}
	
		/**
		 * @typesign (cell: cellx.Cell, change: cellx.Event|Object, cancellable: boolean = true);
		 */
		function addChange(cell, change, cancellable) {
			var evt;
	
			if (change instanceof Event) {
				evt = change;
			} else {
				evt = new Event('change');
				evt.target = cell;
				evt.timestamp = now();
				evt.detail = change;
			}
	
			if (changes.size) {
				change = changes.get(cell);
	
				if (change) {
					(evt.detail || (evt.detail = {})).prevEvent = change.event;
					change.event = evt;
	
					if (cancellable === false) {
						change.cancellable = false;
					}
	
					return;
				}
			} else {
				if (state == STATE_CHANGES_COMBINING) {
					nextTick(releaseChanges);
				}
			}
	
			changes.set(cell, {
				event: evt,
				cancellable: cancellable !== false
			});
		}
	
		/**
		 * @class cellx.Cell
		 * @extends {cellx.EventEmitter}
		 *
		 * @example
		 * var a = new Cell(1);
		 * var b = new Cell(2);
		 * var c = new Cell(function() {
		 *     return a.read() + b.read();
		 * });
		 *
		 * c.on('change', function() {
		 *     console.log('c = ' + c.read());
		 * });
		 *
		 * console.log(c.read());
		 * // => 3
		 *
		 * a.write(5);
		 * b.write(10);
		 * // => 'c = 15'
		 *
		 * @typesign new (value?, opts?: {
		 *     owner?: Object,
		 *     read?: (value): *,
		 *     validate?: (value): *,
		 *     onchange?: (evt: cellx.Event),
		 *     onerror?: (evt: cellx.Event),
		 *     computed?: false
		 * }): cellx.Cell;
		 *
		 * @typesign new (formula: (): *, opts?: {
		 *     owner?: Object,
		 *     read?: (value): *,
		 *     write?: (value),
		 *     validate?: (value): *,
		 *     onchange?: (evt: cellx.Event),
		 *     onerror?: (evt: cellx.Event),
		 *     computed?: true,
		 *     pureComputed: boolean = false
		 * }): cellx.Cell;
		 */
		function Cell(value, opts) {
			EventEmitter.call(this);
	
			if (!opts) {
				opts = {};
			}
	
			/**
			 * @type {boolean}
			 */
			this.computed = typeof value == 'function' &&
				(opts.computed !== undefined ? opts.computed : value.constructor == Function);
			/**
			 * @type {boolean}
			 */
			this.pureComputed = opts.pureComputed === true;
	
			/**
			 * @type {?Object}
			 */
			this.owner = opts.owner || null;
	
			/**
			 * @type {*}
			 */
			this._value = undefined;
			/**
			 * @type {*}
			 */
			this._fixedValue = undefined;
			/**
			 * @type {*}
			 */
			this.initialValue = undefined;
			/**
			 * @type {?Function}
			 */
			this._formula = null;
	
			/**
			 * @type {?Function}
			 */
			this._read = opts.read || null;
			/**
			 * @type {?Function}
			 */
			this._write = opts.write || null;
	
			/**
			 * @type {?Function}
			 */
			this._validate = opts.validate || null;
	
			/**
			 * Ведущие ячейки.
			 * @type {Set<cellx.Cell>}
			 */
			this._masters = null;
			/**
			 * Ведомые ячейки.
			 * @type {Set<cellx.Cell>}
			 */
			this._slaves = new Set();
	
			/**
			 * @type {uint|undefined}
			 */
			this._maxMasterLevel = 0;
	
			this._version = 0;
	
			this._circularityDetectionCounter = 0;
	
			/**
			 * @type {?cellx.Event}
			 */
			this._lastErrorEvent = null;
	
			this._active = false;
	
			this._outdated = false;
	
			this._changed = false;
	
			if (this.computed) {
				this._formula = value;
			} else {
				if (this._validate) {
					this._validate.call(this.owner || this, value);
				}
	
				this._value = this._fixedValue = this.initialValue = value;
	
				if (value instanceof EventEmitter) {
					value.on('change', this._onValueChange, this);
				}
			}
	
			if (opts.onchange) {
				this.on('change', opts.onchange);
			}
			if (opts.onerror) {
				this.on('error', opts.onerror);
			}
		}
		extend(Cell, EventEmitter);
	
		assign(Cell.prototype, {
			/**
			 * @typesign (): boolean;
			 */
			changed: function() {
				if (changes.size) {
					releaseChanges();
				}
	
				return this._changed;
			},
	
			/**
			 * @override cellx.EventEmitter#on
			 */
			on: function(type, listener, context) {
				if (changes.size) {
					releaseChanges();
				}
	
				if (this.computed && !this._events.size && !this._slaves.size) {
					this._activate();
				}
	
				EventEmitter.prototype.on.call(this, type, listener, context);
	
				return this;
			},
			/**
			 * @override cellx.EventEmitter#off
			 */
			off: function(type, listener, context) {
				if (changes.size) {
					releaseChanges();
				}
	
				EventEmitter.prototype.off.call(this, type, listener, context);
	
				if (this.computed && !this._events.size && !this._slaves.size) {
					this._deactivate();
				}
	
				return this;
			},
	
			/**
			 * @override cellx.EventEmitter#_on
			 */
			_on: function(type, listener, context) {
				EventEmitter.prototype._on.call(this, type, listener, context || this.owner);
			},
			/**
			 * @override cellx.EventEmitter#_off
			 */
			_off: function(type, listener, context) {
				EventEmitter.prototype._off.call(this, type, listener, context || this.owner);
			},
	
			/**
			 * @typesign (listener: (evt: cellx.Event): boolean|undefined): cellx.Cell;
			 */
			subscribe: function(listener) {
				function wrap(evt) {
					listener.call(this, evt.type == 'change' ? null : evt.detail.error, evt);
				}
				wrap[KEY_INNER] = listener;
	
				this
					.on('change', wrap)
					.on('error', wrap);
	
				return this;
			},
	
			/**
			 * @typesign (listener: (evt: cellx.Event): boolean|undefined): cellx.Cell;
			 */
			unsubscribe: function(listener) {
				this
					.off('change', listener)
					.off('error', listener);
	
				return this;
			},
	
			/**
			 * @typesign (slave: cellx.Cell);
			 */
			_registerSlave: function(slave) {
				if (this.computed && !this._events.size && !this._slaves.size) {
					this._activate();
				}
	
				this._slaves.add(slave);
			},
	
			/**
			 * @typesign (slave: cellx.Cell);
			 */
			_unregisterSlave: function(slave) {
				this._slaves['delete'](slave);
	
				if (this.computed && !this._events.size && !this._slaves.size) {
					this._deactivate();
				}
			},
	
			/**
			 * @typesign ();
			 */
			_activate: function() {
				if (this._version != releaseVersion) {
					var prevDetectedMasters = detectedMasters;
					detectedMasters = [];
	
					var result = this._tryFormula();
	
					this._masters = detectedMasters;
					detectedMasters = prevDetectedMasters;
	
					this._version = releaseVersion;
	
					if (result[0]) {
						this._value = this._fixedValue = result[1];
					} else {
						this._handleError(result[1]);
					}
				}
	
				var masters = this._masters;
				var maxMasterLevel = 0;
	
				for (var i = masters.length; i;) {
					var master = masters[--i];
	
					master._registerSlave(this);
	
					if (maxMasterLevel <= master._maxMasterLevel) {
						maxMasterLevel = master._maxMasterLevel + 1;
					}
				}
	
				this._maxMasterLevel = maxMasterLevel;
	
				this._active = true;
			},
	
			/**
			 * @typesign ();
			 */
			_deactivate: function() {
				var masters = this._masters;
	
				for (var i = masters.length; i;) {
					masters[--i]._unregisterSlave(this);
				}
	
				this._maxMasterLevel = undefined;
	
				this._active = false;
			},
	
			/**
			 * @typesign (evt: cellx.Event);
			 */
			_onValueChange: function(evt) {
				addChange(this, evt, this._value !== this._fixedValue);
			},
	
			/**
			 * @typesign (): *;
			 */
			read: function() {
				if (detectedMasters && detectedMasters.indexOf(this) == -1) {
					detectedMasters.push(this);
				}
	
				if (state == STATE_CHANGES_COMBINING && changes.size) {
					releaseChanges();
				}
	
				if (this.computed && !this._active && this._version != releaseVersion) {
					var prevDetectedMasters = detectedMasters;
					detectedMasters = [];
	
					var result = this._tryFormula();
	
					this._masters = detectedMasters;
					detectedMasters = prevDetectedMasters;
	
					this._version = releaseVersion;
	
					if (result[0]) {
						this._value = this._fixedValue = result[1];
					} else {
						this._handleError(result[1]);
					}
				}
	
				return this._read ? this._read.call(this.owner || this, this._value) : this._value;
			},
	
			/**
			 * @typesign (value): boolean;
			 */
			write: function(value) {
				if (this.computed && !this._write) {
					throw new TypeError('Cannot write to read-only cell');
				}
	
				var oldValue = this._value;
	
				if (oldValue === value || (oldValue != oldValue && value != value)) {
					return false;
				}
	
				if (this._validate) {
					this._validate.call(this.owner || this, value);
				}
	
				if (this.computed) {
					this._write.call(this.owner || this, value);
				} else {
					this._value = value;
	
					if (oldValue instanceof EventEmitter) {
						oldValue.off('change', this._onValueChange, this);
					}
					if (value instanceof EventEmitter) {
						value.on('change', this._onValueChange, this);
					}
	
					if (
						(value === this._fixedValue || (value != value && this._fixedValue != this._fixedValue)) &&
							changes.get(this).cancellable
					) {
						changes['delete'](this);
					} else {
						addChange(this, {
							oldValue: oldValue,
							value: value
						});
					}
				}
	
				return true;
			},
	
			/**
			 * @typesign (): boolean;
			 */
			_recalc: function() {
				var result;
	
				if (this.pureComputed) {
					result = this._tryFormula();
				} else {
					if (this._version == releaseVersion) {
						if (++this._circularityDetectionCounter == 10) {
							this._handleError(new RangeError('Circular dependency detected'));
							return false;
						}
					} else {
						this._circularityDetectionCounter = 1;
					}
	
					var prevDetectedMasters = detectedMasters;
					detectedMasters = [];
	
					result = this._tryFormula();
	
					var oldMasters = this._masters;
	
					var masters = this._masters = detectedMasters;
					detectedMasters = prevDetectedMasters;
	
					var isMasterListChanged = false;
	
					for (var i = oldMasters.length; i;) {
						if (masters.indexOf(oldMasters[--i]) == -1) {
							oldMasters[i]._unregisterSlave(this);
							isMasterListChanged = true;
						}
					}
	
					if (isMasterListChanged || oldMasters.length < masters.length) {
						var maxMasterLevel = 0;
	
						for (var j = masters.length; i;) {
							var master = masters[--j];
	
							if (oldMasters.indexOf(master) == -1) {
								master._registerSlave(this);
							}
	
							if (maxMasterLevel <= master._maxMasterLevel) {
								maxMasterLevel = master._maxMasterLevel + 1;
							}
						}
	
						if (this._maxMasterLevel != maxMasterLevel) {
							if (
								this._maxMasterLevel < maxMasterLevel && outdatedCells.length > 1 &&
									maxMasterLevel > outdatedCells[outdatedCells.length - 2]._maxMasterLevel
							) {
								this._maxMasterLevel = maxMasterLevel;
								return true;
							}
	
							this._maxMasterLevel = maxMasterLevel;
						}
					}
				}
	
				this._version = releaseVersion + 1;
	
				if (result[0]) {
					var oldValue = this._value;
					var value = result[1];
	
					if (oldValue !== value && (oldValue == oldValue || value == value)) {
						this._value = value;
	
						addChange(this, {
							oldValue: oldValue,
							value: value
						});
					}
				} else {
					this._handleError(result[1]);
				}
	
				return false;
			},
	
			/**
			 * @typesign (): { 0: true, 1 };
			 * @typesign (): { 0: false, 1: Error };
			 */
			_tryFormula: function() {
				try {
					var value = this._formula.call(this.owner || this);
	
					if (this._validate) {
						this._validate.call(this.owner || this, value);
					}
	
					return [true, value];
				} catch (err) {
					return [false, err];
				}
			},
	
			/**
			 * @typesign (err);
			 */
			_handleError: function(err) {
				var evt = new Event('error');
				evt.target = this;
				evt.timestamp = now();
				evt.detail = { error: err };
	
				this._handleErrorEvent(evt);
			},
	
			/**
			 * @typesign (evt: cellx.Event);
			 */
			_handleErrorEvent: function(evt) {
				if (this._lastErrorEvent === evt) {
					return;
				}
	
				this._lastErrorEvent = evt;
	
				this._handleEvent(evt);
	
				for (var iterator = this._slaves.values(), step; !(step = iterator.next()).done;) {
					if (evt.isPropagationStopped) {
						break;
					}
	
					step.value._handleErrorEvent(evt);
				}
			},
	
			/**
			 * @typesign (): cellx.Cell;
			 */
			clear: function() {
				if (changes.size) {
					releaseChanges();
				}
	
				this._clear();
	
				return this;
			},
	
			/**
			 * @typesign ();
			 */
			_clear: function() {
				this.off();
	
				if (this._active) {
					this._slaves.forEach(function(slave) {
						slave._clear();
					});
				}
			}
		});
	
		cellx.Cell = Cell;
	})();
	

	(function() {
		var Map = cellx.Map;
		var Cell = cellx.Cell;
	
		var cellProto = Cell.prototype;
	
		invokeCell = function(wrap, initialValue, opts, owner, firstArg, otherArgs, argCount) {
			if (!owner || owner == global) {
				owner = wrap;
			}
	
			if (!hasOwn.call(owner, KEY_CELLS)) {
				Object.defineProperty(owner, KEY_CELLS, {
					value: new Map()
				});
			}
	
			var cell = owner[KEY_CELLS].get(wrap);
	
			if (!cell) {
				if (initialValue != null && typeof initialValue == 'object') {
					if (typeof initialValue.clone == 'function') {
						initialValue = initialValue.clone();
					} else if (isArray(initialValue)) {
						initialValue = initialValue.slice(0);
					} else if (initialValue.constructor === Object) {
						initialValue = assign({}, initialValue);
					} else {
						switch (toString.call(initialValue)) {
							case '[object Date]': {
								initialValue = new Date(initialValue);
								break;
							}
							case '[object RegExp]': {
								initialValue = new RegExp(initialValue);
								break;
							}
						}
					}
				}
	
				opts = create(opts);
				opts.owner = owner;
	
				cell = new Cell(initialValue, opts);
				owner[KEY_CELLS].set(wrap, cell);
			}
	
			switch (argCount) {
				case 0: {
					return cell.read();
				}
				case 1: {
					return cell.write(firstArg);
				}
				default: {
					return cellProto[firstArg].apply(cell, otherArgs);
				}
			}
		};
	})();
	

})();
