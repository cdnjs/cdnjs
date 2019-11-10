var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

(function (global, factory) {
	typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.koto = factory();
})(this, function () {
	"use strict";

	/**
  * Simple Assertion function
  * @param  {anything} test    Anything that will evaluate to true of false.
  * @param  {string} message The error message to send if `test` is false
  */
	function kotoAssert(test, message) {
		if (test) {
			return;
		}
		throw new Error("[koto] " + message);
	}

	var Chart = (function () {
		function Chart(selection) {
			_classCallCheck(this, Chart);

			this.base = selection; // Container for chart @type {d3.selection}.
			this.hasDrawn = false; // Has this chart been drawn at lease once?

			// private
			this._layers = {};
			this._attached = {};
			this._events = {};
			this._configs = {};
			this._accessors = {};
		}

		_prototypeProperties(Chart, null, {
			transform: {

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

				value: function transform(data) {
					return data;
				},
				writable: true,
				configurable: true
			},
			demux: {

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

				value: function demux(name, data) {
					return data;
				},
				writable: true,
				configurable: true
			},
			preDraw: {

				/**
     * A "hook" method that will allow you to run some arbitrary code before
     * {@link Chart#draw}. This will run everytime {@link Chart#draw} is called.
     *
     * Note: you will most likely never call this method directly, but rather
     * include it as part of a chart definition, and then rely on d3.chart to
     * invoke it when you draw the chart with {@link Chart#draw}.
     *
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */

				value: function preDraw() {},
				writable: true,
				configurable: true
			},
			postDraw: {

				/**
     * A "hook" method that will allow you to run some arbitrary code after
     * {@link Chart#draw}. This will run everytime {@link Chart#draw} is called.
     *
     * Note: you will most likely never call this method directly, but rather
     * include it as part of a chart definition, and then rely on d3.chart to
     * invoke it when you draw the chart with {@link Chart#draw}.
     *
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */

				value: function postDraw() {},
				writable: true,
				configurable: true
			},
			unlayer: {

				/**
     * Remove a layer from the chart.
     *
     * @param {String} name The name of the layer to remove.
     * @returns {Layer} The layer removed by this operation.
     */

				value: function unlayer(name) {
					var layer = this.layer(name);

					delete this._layers[name];
					delete layer._chart;

					return layer;
				},
				writable: true,
				configurable: true
			},
			layer: {

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

				value: function layer(name, selection, options) {
					var _layer;

					if (arguments.length === 1) {
						return this._layers[name];
					}

					// we are reattaching a previous layer, which the
					// selection argument is now set to.
					if (arguments.length === 2) {

						if (typeof selection.draw === "function") {
							selection._chart = this;
							this._layers[name] = selection;
							return this._layers[name];
						} else {
							kotoAssert(false, "When reattaching a layer, the second argument " + "must be a d3.chart layer");
						}
					}

					_layer = selection.layer(options);

					this._layers[name] = _layer;

					selection._chart = this;

					return _layer;
				},
				writable: true,
				configurable: true
			},
			attach: {

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

				value: function attach(attachmentName, chart) {
					if (arguments.length === 1) {
						return this._attached[attachmentName];
					}

					this._attached[attachmentName] = chart;
					return chart;
				},
				writable: true,
				configurable: true
			},
			draw: {

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

				value: function draw(rawData) {

					var layerName, attachmentName, attachmentData;

					var data = this.transform(rawData);

					this.preDraw(data);

					for (layerName in this._layers) {
						this._layers[layerName].draw(data);
					}

					for (attachmentName in this._attached) {
						if (this.demux) {
							attachmentData = this.demux(attachmentName, data);
						} else {
							attachmentData = data;
						}
						this._attached[attachmentName].draw(attachmentData);
					}

					this.hasDrawn = true;

					this.postDraw(data);
				},
				writable: true,
				configurable: true
			},
			on: {

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

				value: function on(name, callback, context) {
					var events = this._events[name] || (this._events[name] = []);
					events.push({
						callback: callback,
						context: context || this,
						_chart: this
					});
					return this;
				},
				writable: true,
				configurable: true
			},
			once: {

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

				value: function once(name, callback, context) {
					var self = this;
					var _once = (function (_once2) {
						var _onceWrapper = function _once() {
							return _once2.apply(this, arguments);
						};

						_onceWrapper.toString = function () {
							return _once2.toString();
						};

						return _onceWrapper;
					})(function () {
						self.off(name, _once);
						callback.apply(this, arguments);
					});
					return this.on(name, _once, context);
				},
				writable: true,
				configurable: true
			},
			off: {

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

				value: function off(name, callback, context) {
					var names, n, events, event, i, j;

					// remove all events
					if (arguments.length === 0) {
						for (name in this._events) {
							this._events[name].length = 0;
						}
						return this;
					}

					// remove all events for a specific name
					if (arguments.length === 1) {
						events = this._events[name];
						if (events) {
							events.length = 0;
						}
						return this;
					}

					// remove all events that match whatever combination of name, context
					// and callback.
					names = name ? [name] : Object.keys(this._events);
					for (i = 0; i < names.length; i++) {
						n = names[i];
						events = this._events[n];
						j = events.length;
						while (j--) {
							event = events[j];
							if (callback && callback === event.callback || context && context === event.context) {
								events.splice(j, 1);
							}
						}
					}

					return this;
				},
				writable: true,
				configurable: true
			},
			trigger: {

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

				value: function trigger(name) {
					var args = Array.prototype.slice.call(arguments, 1);
					var events = this._events[name];
					var i, ev;

					if (events !== undefined) {
						for (i = 0; i < events.length; i++) {
							ev = events[i];
							ev.callback.apply(ev.context, args);
						}
					}

					return this;
				},
				writable: true,
				configurable: true
			},
			config: {
				/**
     * Get and set chart options (or configs)
     *
     * @param  {mixed} nameOrObject name of item getting or setting
     *                              or its an object with key value pairs.
     * @param  {mixed} value the value for config item witha that name.
     * @return {mixed} if getting, its the value. if setting it is the chart instance.
     */

				value: function config(nameOrObject, value) {
					var key;
					if (arguments.length === 0) {
						return this._configs;
					}

					if (arguments.length === 1) {
						if (typeof nameOrObject === "object") {
							for (key in nameOrObject) {
								this._configs[key] = nameOrObject[key];
							}
							return this;
						}
						kotoAssert(this._configs[nameOrObject], "" + nameOrObject + " is not a valid option.");
						return this._configs[nameOrObject];
					}

					if (arguments.length === 2) {
						this._configs[nameOrObject] = value;
						return this;
					}
				},
				writable: true,
				configurable: true
			},
			accessor: {

				/**
     * This will get or set any of the chart's accessors.
     *
     * @param  {String or Object} item If string, it will return the function for that accessor item.
     *                                 If object, it will update that accessor with set function.
     * @param  {function} [value] The function to update accessor item with.
     * @return {object} The chart to preserve chainability.
     */

				value: function accessor(item, value) {
					var key;
					if (arguments.length === 0) {
						return this._accessors;
					}

					if (arguments.length === 1) {
						if (typeof item === "string") {
							kotoAssert(this._accessors[item], "" + item + " is not a valid accessor.");
							if (typeof this._accessors[item] === "object") {
								return this._accessors[item].accessor;
							}
							return this._accessors[item];
						} else {
							for (key in item) {
								this._accessors[key] = item[key];
							}
						}
					} else {
						this._accessors[item] = value;
					}
					return this;
				},
				writable: true,
				configurable: true
			}
		});

		return Chart;
	})();

	var lifecycleRe = /^(enter|update|merge|exit)(:transition)?$/;

	/**
  * Loop through handers and call them on selection
  * @param {d3.selection} selection The node to run the handler on.
  *                                  it could be an `d3.transition` selection
  * @param {lifecycle event} handlers A function to call for that layers named
  *                           				 lifecycle event.
  */
	function selectionHandler(selection, handlers) {
		var idx, len;
		for (idx = 0, len = handlers.length; idx < len; ++idx) {
			// Attach a reference to the parent chart so the selection's
			// `chart` method will function correctly.
			selection._chart = handlers[idx].chart || this._base._chart;
			selection.call(handlers[idx].callback);
		}
		return selection;
	}

	/**
  * Create a layer using the provided `base`. The layer instance is *not*
  * exposed to d3.chart users. Instead, its instance methods are mixed in to the
  * `base` selection it describes; users interact with the instance via these
  * bound methods.
  *
  * @private
  * @class
  *
  * @param {d3.selection} base The containing DOM node for the layer.
  */

	var Layer = (function () {
		function Layer(base) {
			_classCallCheck(this, Layer);

			this._base = base;
			this._handlers = {};
		}

		_prototypeProperties(Layer, null, {
			dataBind: {

				/**
     * Invoked by {@link Layer#draw} to join data with this layer's DOM nodes. This
     * implementation is "virtual"--it *must* be overridden by Layer instances.
     *
     * @param {Array} data Value passed to {@link Layer#draw}
     */

				value: function dataBind() {
					kotoAssert(false, "Layers must specify a dataBind method.");
				},
				writable: true,
				configurable: true
			},
			insert: {

				/**
     * Invoked by {@link Layer#draw} in order to insert new DOM nodes into this
     * layer's `base`. This implementation is "virtual"--it *must* be overridden by
     * Layer instances.
     */

				value: function insert() {
					kotoAssert(false, "Layers must specify an `insert` method.");
				},
				writable: true,
				configurable: true
			},
			on: {

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

				value: function on(eventName, handler, options) {
					options = options || {};

					kotoAssert(lifecycleRe.test(eventName), "Unrecognized lifecycle event name specified to 'Layer#on': '" + eventName + "'.");

					if (!(eventName in this._handlers)) {
						this._handlers[eventName] = [];
					}
					this._handlers[eventName].push({
						callback: handler,
						chart: options.chart || null
					});
					return this._base;
				},
				writable: true,
				configurable: true
			},
			off: {

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

				value: function off(eventName, handler) {

					var handlers = this._handlers[eventName];
					var idx;

					kotoAssert(lifecycleRe.test(eventName), "Unrecognized lifecycle event name specified to 'Layer#on': '" + eventName + "'.");

					if (!handlers) {
						return this._base;
					}

					if (arguments.length === 1) {
						handlers.length = 0;
						return this._base;
					}

					for (idx = handlers.length - 1; idx > -1; --idx) {
						if (handlers[idx].callback === handler) {
							handlers.splice(idx, 1);
						}
					}
					return this._base;
				},
				writable: true,
				configurable: true
			},
			draw: {

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

				value: function draw(data) {
					var bound, entering, events, selection, method, handlers, transitionHandlers, eventName;

					bound = this.dataBind.call(this._base, data);

					kotoAssert(bound instanceof d3.selection, "Invalid selection defined by `Layer#dataBind` method.");
					kotoAssert(bound.enter, "Layer selection not properly bound.");

					entering = bound.enter();
					entering._chart = this._base._chart;

					events = [{
						name: "update",
						selection: bound
					}, {
						name: "enter",
						selection: entering,
						method: this.insert
					}, {
						name: "merge",
						// Although the `merge` lifecycle event shares its selection object
						// with the `update` lifecycle event, the object's contents will be
						// modified when d3.chart invokes the user-supplied `insert` method
						// when triggering the `enter` event.
						selection: bound
					}, {
						name: "exit",
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
						if (typeof method === "function") {
							selection = method.call(selection);
						}

						if (selection.empty()) {
							continue;
						}

						// Although `selection instanceof d3.selection` is more explicit,
						// it fails in IE8, so we use duck typing to maintain
						// compatability.

						kotoAssert(selection && selection instanceof d3.selection, "Invalid selection defined for " + eventName + " lifecycle event.");

						handlers = this._handlers[eventName];

						if (handlers) {
							selection = selectionHandler.call(this, selection, handlers);
						}

						transitionHandlers = this._handlers[eventName + ":transition"];

						if (transitionHandlers && transitionHandlers.length) {
							selection = selection.transition();
							selection = selectionHandler.call(this, selection, transitionHandlers);
						}
					}
				},
				writable: true,
				configurable: true
			}
		});

		return Layer;
	})();

	kotoAssert(d3, "d3.js is required");

	/**
  * Registry {@link Chart} defintions to be used later.
  * @class
  *
  * @param {Class} Options The Options class.
  * @param {Class} Layer The Layer class.
  * @param {Class} Chart The Chart class.
  */

	var Koto = (function () {
		function Koto(Layer, Chart) {
			_classCallCheck(this, Koto);

			this._registry = {};

			this.Layer = Layer;
			this.Chart = Chart;
		}

		_prototypeProperties(Koto, null, {
			chart: {

				/**
     * Takes a name and a function that returns a chart definiion (class).
     * It registeres that chart defintion with given name and makes it available
     * to the `d3.seletion.chart` method.
     *
     * If function is called with no parameters, the list of registered charts is
     * returned.
     *
     * If the function is only called with 'name' parameter, the chart definition
     * registered with that name is returned.
     *
     * If the function is called with 'name' and 'classFn' parameter, the chart
     * definition is registered (or overwritten) with the given name.
     *
     * @param  {string} name Name of chart to get or register.
     * @param  {function} classFn A function that returns a chart.
     * @return {Chart} The chart registered with given name (if any).
     */

				value: function chart(name, classFn) {
					var baseChart,
					    _Koto = this;
					if (arguments.length === 0) {
						return this._registry;
					} else if (arguments.length === 1) {
						kotoAssert(this._registry[name], "no chart registered with name " + name);
						baseChart = this._registry[name];
						baseChart.extend = function (childName, childClassFn) {
							_Koto._registry[childName] = childClassFn(baseChart);
							return _Koto._registry[childName];
						};
						return baseChart;
					} else {
						this._registry[name] = classFn(this.Chart);
						return this._registry[name];
					}
				},
				writable: true,
				configurable: true
			}
		});

		return Koto;
	})();

	var koto = new Koto(Layer, Chart);

	/**
  * d3.js extensions
  */

	/**
  * Instantiate a chart or return the chart that the current selection belongs
  * to.
  *
  * @param {String} [chartName] The name of the chart to instantiate. If the
  *        name is unspecified, this method will return the chart that the
  *        current selection belongs to.
  * @param {mixed} options The options to use when instantiated the new chart.
  *        See {@link Chart} for more information.
  */
	d3.selection.prototype.chart = function (chartName) {
		// Without an argument, attempt to resolve the current selection's
		// containing d3.chart.
		if (arguments.length === 0) {
			return this._chart;
		}
		var ChartCtor = koto.chart(chartName);
		return new ChartCtor(this);
	};

	// Implement the zero-argument signature of `d3.selection.prototype.chart`
	// for all selection types.
	d3.selection.enter.prototype.chart = function () {
		return this._chart;
	};
	d3.transition.prototype.chart = d3.selection.enter.prototype.chart;

	/**
  * Create a new layer on the d3 selection from which it is called.
  *
  * @static
  *
  * @param {Object} [options] Options to be forwarded to {@link Layer|the Layer
  *        constructor}
  * @returns {d3.selection}
  */
	d3.selection.prototype.layer = function (options) {
		var layer = new Layer(this);
		var eventName;

		// Set layer methods (required)
		layer.dataBind = options.dataBind;
		layer.insert = options.insert;

		// Bind events (optional)
		if ("events" in options) {
			for (eventName in options.events) {
				layer.on(eventName, options.events[eventName]);
			}
		}

		// Mix the public methods into the D3.js selection (bound appropriately)
		this.on = function () {
			return layer.on.apply(layer, arguments);
		};
		this.off = function () {
			return layer.off.apply(layer, arguments);
		};
		this.draw = function () {
			return layer.draw.apply(layer, arguments);
		};

		return this;
	};

	return koto;
});
//# sourceMappingURL=./koto.js.map