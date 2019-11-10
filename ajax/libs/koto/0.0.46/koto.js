function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('d3')) : typeof define === 'function' && define.amd ? define(['d3'], factory) : global.Koto = factory(global.d3);
})(this, function (d3) {
	'use strict';

	/**
  * Simple Assertion function
  * @param  {anything} test    Anything that will evaluate to true of false.
  * @param  {string} message The error message to send if `test` is false
  */
	function kotoAssert(test, message) {
		if (test) {
			return;
		}
		throw new Error('[koto] ' + message);
	}

	var assert_js = kotoAssert;

	var Layer = (function () {
		function Layer(base, options) {
			_classCallCheck(this, Layer);

			this._base = base;
			this._handlers = {};
			this._lifecycleRe = /^(enter|update|merge|exit)(:transition)?$/;

			if (options) {
				// Set layer methods (required)
				this.dataBind = options.dataBind;
				this.insert = options.insert;

				// Bind events (optional)
				if ('events' in options) {
					for (var eventName in options.events) {
						this.on(eventName, options.events[eventName]);
					}
				}
			}
		}

		/**
   * Invoked by {@link Layer#draw} to join data with this layer's DOM nodes. This
   * implementation is "virtual"--it *must* be overridden by Layer instances.
   *
   * @param {Array} data Value passed to {@link Layer#draw}
   */

		Layer.prototype.dataBind = function dataBind() {
			assert_js(false, 'Layers must specify a dataBind method.');
		};

		/**
   * Invoked by {@link Layer#draw} in order to insert new DOM nodes into this
   * layer's `base`. This implementation is "virtual"--it *must* be overridden by
   * Layer instances.
   */

		Layer.prototype.insert = function insert() {
			assert_js(false, 'Layers must specify an `insert` method.');
		};

		/**
   * Subscribe a handler to a "lifecycle event". These events (and only these
   * events) are triggered when {@link Layer#draw} is invoked--see that method
   * for more details on lifecycle events.
   *
   * @param {String} eventName Identifier for the lifecycle event for which to
   *        subscribe.
   * @param {Function} handler Callback function
   *
   * @returns {Chart} Reference to the layer instance (chaining).
   */

		Layer.prototype.on = function on(eventName, handler, options) {
			options = options || {};

			assert_js(this._lifecycleRe.test(eventName), 'Unrecognized lifecycle event name specified to \'Layer#on\': \'' + eventName + '\'.');

			if (!(eventName in this._handlers)) {
				this._handlers[eventName] = [];
			}
			this._handlers[eventName].push({
				callback: handler,
				chart: options.chart || null
			});

			return this;
		};

		/**
   * Unsubscribe the specified handler from the specified event. If no handler is
   * supplied, remove *all* handlers from the event.
   *
   * @param {String} eventName Identifier for event from which to remove
   *        unsubscribe
   * @param {Function} handler Callback to remove from the specified event
   *
   * @returns {Chart} Reference to the layer instance (chaining).
   */

		Layer.prototype.off = function off(eventName, handler) {
			var handlers = this._handlers[eventName];
			var idx;

			assert_js(this._lifecycleRe.test(eventName), 'Unrecognized lifecycle event name specified to \'Layer#on\': \'' + eventName + '\'.');

			if (!handlers) {
				return this;
			}

			if (arguments.length === 1) {
				handlers.length = 0;
				return this;
			}

			for (idx = handlers.length - 1; idx > -1; --idx) {
				if (handlers[idx].callback === handler) {
					handlers.splice(idx, 1);
				}
			}

			return this;
		};

		/**
   * Render the layer according to the input data: Bind the data to the layer
   * (according to {@link Layer#dataBind}, insert new elements (according to
   * {@link Layer#insert}, make lifecycle selections, and invoke all relevant
   * handlers (as attached via {@link Layer#on}) with the lifecycle selections.
   *
   * - update
   * - update:transition
   * - enter
   * - enter:transition
   * - exit
   * - exit:transition
   *
   * @param {Array} data Data to drive the rendering.
   */

		Layer.prototype.draw = function draw(data) {
			var bound,
			    entering,
			    events,
			    selection,
			    method,
			    handlers,
			    eventName,
			    idx,
			    len,
			    tidx,
			    tlen,
			    promises = [];

			function endall(transition, callback) {
				var n = 0;
				if (transition.size() === 0) {
					callback();
				} else {
					transition.each(function () {
						++n;
					}).each('interrupt.promise', function () {
						callback.apply(this, arguments);
					}).each('end.promise', function () {
						if (! --n) {
							callback.apply(this, arguments);
						}
					});
				}
			}

			function promiseCallback(resolve) {
				selection.call(endall, function () {
					resolve(true);
				});
			}

			bound = this.dataBind.call(this._base, data);

			assert_js(bound instanceof d3.selection, 'Invalid selection defined by `Layer#dataBind` method.');
			assert_js(bound.enter, 'Layer selection not properly bound.');

			entering = bound.enter();
			entering._chart = this._base._chart;

			events = [{
				name: 'update',
				selection: bound
			}, {
				name: 'enter',
				selection: entering,
				method: this.insert
			}, {
				name: 'merge',
				// Although the `merge` lifecycle event shares its selection object
				// with the `update` lifecycle event, the object's contents will be
				// modified when d3.chart invokes the user-supplied `insert` method
				// when triggering the `enter` event.
				selection: bound
			}, {
				name: 'exit',
				// Although the `exit` lifecycle event shares its selection object
				// with the `update` and `merge` lifecycle events, the object's
				// contents will be modified when d3.chart invokes
				// `d3.selection.exit`.
				selection: bound,
				method: bound.exit
			}];

			for (var i = 0, l = events.length; i < l; ++i) {
				eventName = events[i].name;
				selection = events[i].selection;
				method = events[i].method;

				// Some lifecycle selections modify shared state, so they must be
				// deferred until just prior to handler invocation.
				if (typeof method === 'function') {
					selection = method.call(selection);
				}

				if (selection.empty()) {
					continue;
				}

				// Although `selection instanceof d3.selection` is more explicit,
				// it fails in IE8, so we use duck typing to maintain
				// compatability.

				assert_js(selection && selection instanceof d3.selection, 'Invalid selection defined for ' + eventName + ' lifecycle event.');

				handlers = this._handlers[eventName];

				if (handlers) {
					for (idx = 0, len = handlers.length; idx < len; ++idx) {
						// Attach a reference to the parent chart so the selection"s
						// `chart` method will function correctly.
						selection._chart = handlers[idx].chart || this._base._chart;
						selection.call(handlers[idx].callback);
					}
				}

				handlers = this._handlers[eventName + ':transition'];

				if (handlers && handlers.length) {
					selection = selection.transition();
					for (tlen = handlers.length, tidx = 0; tidx < tlen; ++tidx) {
						selection._chart = handlers[tidx].chart || this._base._chart;
						selection.call(handlers[tidx].callback);
						promises.push(new Promise(promiseCallback));
					}
				}
				this.promise = Promise.all(promises);
			}
		};

		return Layer;
	})();

	var layer_js = Layer;

	assert_js(d3, 'd3 js is required.');

	/**
  * Create a koto chart
  *
  * @constructor
  *
  * @param {d3.selection} selection The chart's "base" DOM node. This should
  *        contain any nodes that the chart generates.
  */

	var Chart = (function () {
		function Chart(selection) {
			_classCallCheck(this, Chart);

			this.base = selection; // Container for chart @type {d3.selection}.
			this.hasDrawn = false; // Has this chart been drawn at lease once?

			function baseExtend(dst, maps) {
				var setDst = function setDst(value, key) {
					dst.set(key, value);
				};
				for (var i = 0, ii = maps.length; i < ii; ++i) {
					var map = maps[i];
					map.forEach(setDst);
				}
				return dst;
			}

			this.merge = {
				configs: (function () {
					var merged = baseExtend(this.configs, arguments);
					return merged;
				}).bind(this),
				accessors: (function () {
					var merged = baseExtend(this.accessors, arguments);
					return merged;
				}).bind(this)
			};

			// exposed properties
			this.configs = new Map();
			this.accessors = new Map();
			this.promise = null;

			// private
			this._layers = new Map();
			this._attached = new Map();
			this._events = new Map();

			// alias
			this.c = this.config;
			this.a = this.accessor;
		}

		/**
   * A "hook" method that you may define to modify input data before it is used
   * to draw the chart's layers and attachments. This method will be used by all
   * sub-classes.
   *
   * Note: you will most likely never call this method directly, but rather
   * include it as part of a chart definition, and then rely on d3.chart to
   * invoke it when you draw the chart with {@link Chart#draw}.
   *
   * @param {Array} data Input data provided to @link Chart#draw}.
   * @returns {mixed} Data to be used in drawing the chart's layers and
   *                  attachments.
   */

		Chart.prototype.transform = function transform(data) {
			return data;
		};

		/**
   * A "hook" method that you may define to choose which mutation of the input
   * data is sent to which of the attached charts (by name). This method will
   * be used by all sub-classes. This only applies to charts that use the
   * {@link Chart#attach} method.
   *
   * Note: you will most likely never call this method directly, but rather
   * include it as part of a chart definition, and then rely on d3.chart to
   * invoke it when you draw the chart with {@link Chart#draw}.
   *
   * @param {String} data Name of attached chart defined in {@link Chart#attach}.
   * @param {Array} data Input data provided to {@link Chart#draw}.
   * @returns {mixed} Data to be used in drawing the chart's layers and
   *                  attachments.
   */

		Chart.prototype.demux = function demux(name, data) {
			return data;
		};

		/**
   * A "hook" method that will allow you to run some arbitrary code before
   * {@link Chart#draw}. This will run everytime {@link Chart#draw} is called.
   *
   * Note: you will most likely never call this method directly, but rather
   * include it as part of a chart definition, and then rely on d3.chart to
   * invoke it when you draw the chart with {@link Chart#draw}.
   *
   * Note 2: a `postDraw` event is also fired when appropriate;
   *
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */

		Chart.prototype.preDraw = function preDraw() {};

		/**
   * A "hook" method that will allow you to run some arbitrary code after
   * {@link Chart#draw}. This will run everytime {@link Chart#draw} is called.
   *
   * Note: you will most likely never call this method directly, but rather
   * include it as part of a chart definition, and then rely on d3.chart to
   * invoke it when you draw the chart with {@link Chart#draw}.
   *
   * @param  {[type]} data [description]
   */

		Chart.prototype.postDraw = function postDraw() {};

		/**
   * A "hook" method that will allow you to run some arbitrary code after
   * {@link Chart#draw} is called AND after all transitions for all layers
   * and attached charts have been completed. This will run everytime
   * {@link Chart#draw} is called.
   *
   * Note: you will most likely never call this method directly, but rather
   * include it as part of a chart definition, and then rely on d3.chart to
   * invoke it when you draw the chart with {@link Chart#draw}.
   *
   * Note 2: a `postTransition` event is also fired when appropriate;
   *
   * @param  {[type]} data
   */

		Chart.prototype.postTransition = function postTransition() {};

		/**
   * Remove a layer from the chart.
   *
   * @param {String} name The name of the layer to remove.
   * @returns {Layer} The layer removed by this operation.
   */

		Chart.prototype.unlayer = function unlayer(name) {
			var layer = this.layer(name);

			this._layers['delete'](name);
			delete layer._chart;

			return layer;
		};

		/**
   * Interact with the chart's {@link Layer|layers}.
   *
   * If only a `name` is provided, simply return the layer registered to that
   * name (if any).
   *
   * If a `name` and `selection` are provided, treat the `selection` as a
   * previously-created layer and attach it to the chart with the specified
   * `name`.
   *
   * If all three arguments are specified, initialize a new {@link Layer} using
   * the specified `selection` as a base passing along the specified `options`.
   *
   * The {@link Layer.draw} method of attached layers will be invoked
   * whenever this chart's {@link Chart#draw} is invoked and will receive the
   * data (optionally modified by the chart's {@link Chart#transform} method.
   *
   * @param {String} name Name of the layer to attach or retrieve.
   * @param {d3.selection|Layer} [selection] The layer's base or a
   *        previously-created {@link Layer}.
   * @param {Object} [options] Options to be forwarded to {@link Layer|the Layer
   *        constructor}
   *
   * @returns {Layer}
   */

		Chart.prototype.layer = function layer(name, selection, options) {
			var _Chart = this;
			var _layer;

			if (arguments.length === 1) {
				return this._layers.get(name);
			}

			// we are reattaching a previous layer, which the
			// selection argument is now set to.
			if (arguments.length === 2) {

				if (selection instanceof layer_js) {
					selection._chart = this;
					this._layers.set(name, selection);
					return this._layers.get(name);
				} else {
					assert_js(false, 'When reattaching a layer, the second argument must be a koto layer');
				}
			}

			selection._chart = this;

			_layer = new layer_js(selection, options);

			_layer.remove = function () {
				_Chart._layers['delete'](name);
				return this;
			};

			this._layers.set(name, _layer);

			return _layer;
		};

		/**
   * Register or retrieve an "attachment" Chart. The "attachment" chart's `draw`
   * method will be invoked whenever the containing chart's `draw` method is
   * invoked.
   *
   * @param {String} attachmentName Name of the attachment
   * @param {Chart} [chart] koto to register as a mix in of this chart. When
   *        unspecified, this method will return the attachment previously
   *        registered with the specified `attachmentName` (if any).
   *
   * @returns {Chart} Reference to this chart (chainable).
   */

		Chart.prototype.attach = function attach(attachmentName, chart) {
			if (arguments.length === 1) {
				return this._attached.get(attachmentName);
			}

			this._attached.set(attachmentName, chart);
			return chart;
		};

		/**
   * Update the chart's representation in the DOM, drawing all of its layers and
   * any "attachment" charts (as attached via {@link Chart#attach}).
   *
   * Note: The first time you call this method, the property `hasDrawn` will be
   * set to true. This is helpful if you want to only run some code on the first
   * time the chart is drawn.
   *
   * @param {Object} data Data to pass to the {@link Layer#draw|draw method} of
   *        this cart's {@link Layer|layers} (if any) and the {@link
   *        Chart#draw|draw method} of this chart's attachments (if any).
   */

		Chart.prototype.draw = function draw(rawData) {
			var layer,
			    attachmentData,
			    promises = [];

			var data = this.transform(rawData);

			this.preDraw(data);
			this.trigger('preDraw', data);

			for (var _iterator = this._layers.values(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
				if (_isArray) {
					if (_i >= _iterator.length) break;
					layer = _iterator[_i++];
				} else {
					_i = _iterator.next();
					if (_i.done) break;
					layer = _i.value;
				}

				layer.draw(data);
				promises.push(layer.promise);
			}

			for (var _iterator2 = this._attached.entries(), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
				var _ref2;

				if (_isArray2) {
					if (_i2 >= _iterator2.length) break;
					_ref2 = _iterator2[_i2++];
				} else {
					_i2 = _iterator2.next();
					if (_i2.done) break;
					_ref2 = _i2.value;
				}

				var attachmentName = _ref2[0];
				var attachment = _ref2[1];

				attachmentData = this.demux ? this.demux(attachmentName, data) : data;
				attachment.draw(attachmentData);
				promises.push(attachment.promise);
			}

			this.hasDrawn = true;

			this.promise = Promise.all(promises);

			this.postDraw();
			this.trigger('postDraw', data);

			this.promise.then((function () {
				this.postTransition(data);
				this.trigger('postTransition', data);
			}).bind(this));
		};

		/**
   * Function invoked with the context specified when the handler was bound (via
   * {@link Chart#on} {@link Chart#once}).
   *
   * @callback ChartEventHandler
   * @param {...*} arguments Invoked with the arguments passed to {@link
   *         Chart#trigger}
   */

		/**
   * Subscribe a callback function to an event triggered on the chart. See {@link
   * Chart#once} to subscribe a callback function to an event for one occurence.
   *
   * @externalExample {runnable} chart-on
   *
   * @param {String} name Name of the event
   * @param {ChartEventHandler} callback Function to be invoked when the event
   *        occurs
   * @param {Object} [context] Value to set as `this` when invoking the
   *        `callback`. Defaults to the chart instance.
   *
   * @returns {Chart} A reference to this chart (chainable).
   */

		Chart.prototype.on = function on(name, callback, context) {
			var events;
			if (this._events.has(name)) {
				events = this._events.get(name);
			} else {
				events = new Set();
			}

			events.add({
				callback: callback,
				context: context || this,
				_chart: this
			});

			this._events.set(name, events);
			return this;
		};

		/**
   * Subscribe a callback function to an event triggered on the chart. This
   * function will be invoked at the next occurance of the event and immediately
   * unsubscribed. See {@link Chart#on} to subscribe a callback function to an
   * event indefinitely.
   *
   * @externalExample {runnable} chart-once
   *
   * @param {String} name Name of the event
   * @param {ChartEventHandler} callback Function to be invoked when the event
   *        occurs
   * @param {Object} [context] Value to set as `this` when invoking the
   *        `callback`. Defaults to the chart instance
   *
   * @returns {Chart} A reference to this chart (chainable)
   */

		Chart.prototype.once = function once(name, callback, context) {
			var self = this;
			var _once = function _once() {
				self.off(name, _once);
				callback.apply(this, arguments);
			};
			return this.on(name, _once, context);
		};

		/**
   * Unsubscribe one or more callback functions from an event triggered on the
   * chart. When no arguments are specified, *all* handlers will be unsubscribed.
   * When only a `name` is specified, all handlers subscribed to that event will
   * be unsubscribed. When a `name` and `callback` are specified, only that
   * function will be unsubscribed from that event. When a `name` and `context`
   * are specified (but `callback` is omitted), all events bound to the given
   * event with the given context will be unsubscribed.
   *
   * @externalExample {runnable} chart-off
   *
   * @param {String} [name] Name of the event to be unsubscribed
   * @param {ChartEventHandler} [callback] Function to be unsubscribed
   * @param {Object} [context] Contexts to be unsubscribe
   *
   * @returns {Chart} A reference to this chart (chainable).
   */

		Chart.prototype.off = function off(name, callback, context) {

			// remove all events
			if (arguments.length === 0) {
				this._events.clear();
				return this;
			}

			// remove all events for a specific name
			if (arguments.length === 1) {
				if (this._events.has(name)) {
					this._events.get(name).clear();
				}
				return this;
			}

			// remove all events that match whatever combination of name, context
			// and callback.

			this._events.get(name).forEach(function (event, clone, map) {
				if (callback && callback === clone.callback || context && context === clone.context) {
					map['delete'](event);
				}
			});

			return this;
		};

		/**
   * Publish an event on this chart with the given `name`.
   *
   * @externalExample {runnable} chart-trigger
   *
   * @param {String} name Name of the event to publish
   * @param {...*} arguments Values with which to invoke the registered
   *        callbacks.
   *
   * @returns {Chart} A reference to this chart (chainable).
   */

		Chart.prototype.trigger = function trigger(name) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			if (this._events.has(name)) {
				this._events.get(name).forEach(function (event) {
					var _event$callback;

					(_event$callback = event.callback).call.apply(_event$callback, [event.context].concat(args));
				});
			}
			return this;
		};

		/**
   * Get and set chart options (or configs)
   *
   * @param  {mixed} nameOrObject name of item getting or setting
   *                              or its an object with key value pairs.
   * @param  {mixed} value the value for config item witha that name.
   * @return {mixed} if getting, its the value. if setting it is the chart instance.
   */

		Chart.prototype.config = function config(nameOrObject, value) {
			var key;
			var definition;
			var _Chart = this;

			function setPercentage() {
				function calcultePerecentage(arr, initialValue) {
					var min = Math.min.call(null, arr.map(function (name) {
						return _Chart.config(name);
					}));
					return initialValue / min;
				}

				if (definition.constrain === true) {
					definition.percentage = calcultePerecentage(['width', 'height'], definition.value);
				} else if (Array.isArray(definition.constrain)) {
					definition.percentage = calcultePerecentage(definition.constrain, definition.value);
				} else {
					definition.percentage = calcultePerecentage([definition.constrain], definition.value);
				}
			}

			if (arguments.length === 0) {
				return this.configs;
			}

			if (arguments.length === 1) {
				if (typeof nameOrObject === 'object') {
					for (key in nameOrObject) {
						if (this.configs.has(key)) {
							definition = this.configs.get(key);
							if (definition.hasOwnProperty('setter')) {
								definition.value = definition.setter.call(definition, nameOrObject[key]);
							} else {
								definition.value = nameOrObject[key];
							}
							if (definition.hasOwnProperty('constrain')) {
								setPercentage();
							}
							this.configs.set(key, definition);
						} else {
							console.warn('config with name ' + nameOrObject + ' is not defined.');
						}
					}
					return this;
				}

				assert_js(this.configs.has(nameOrObject), '' + nameOrObject + ' is not a valid option.');
				definition = this.configs.get(nameOrObject);
				if (definition.hasOwnProperty('getter')) {
					return definition.getter.call(definition);
				}
				return definition.value;
			}

			if (arguments.length === 2) {
				if (this.configs.has(nameOrObject)) {
					definition = this.configs.get(nameOrObject);
					if (definition.hasOwnProperty('setter')) {
						definition.value = definition.setter.call(definition, value);
					} else {
						definition.value = value;
					}
					if (definition.hasOwnProperty('constrain')) {
						setPercentage();
					}
					this.configs.set(nameOrObject, definition);
				} else {
					console.warn('config with name ' + nameOrObject + ' is not defined.');
				}
				return this;
			}
		};

		/**
   * This will get or set any of the chart's accessors.
   *
   * @param  {String or Object} item If string, it will return the function for that accessor item.
   *                                 If object, it will update that accessor with set function.
   * @param  {function} [value] The function to update accessor item with.
   * @return {object} The chart to preserve chainability.
   */

		Chart.prototype.accessor = function accessor(item, value) {
			var key;
			if (arguments.length === 0) {
				return this.accessors;
			}

			if (arguments.length === 1) {
				if (typeof item === 'string') {
					assert_js(this.accessors.has(item), '' + item + ' is not a valid accessor.');
					return this.accessors.get(item);
				} else {
					for (key in item) {
						this.accessors.set(key, item[key]);
					}
				}
			} else {
				this.accessors.set(item, value);
			}
			return this;
		};

		/**
   * This will extend a chart by passing in an object of initialize function.
   * @param  {Object || function} init Initialize function of object with initialize method.
   * @return {Construtor}      Chart constructor
   */

		Chart.extend = function extend(init) {
			var chart = (function (_ref) {
				function chart(selection) {
					_classCallCheck(this, chart);

					var key;
					_ref.call(this, selection);

					if (typeof init === 'function') {
						init.call(this);
					} else {
						for (key in init) {
							this[key] = init[key];
						}
						this.initialize.call(this);
					}
				}

				_inherits(chart, _ref);

				return chart;
			})(this);

			return chart;
		};

		return Chart;
	})();

	var _chart = Chart;

	return _chart;
});
//# sourceMappingURL=./koto.js.map