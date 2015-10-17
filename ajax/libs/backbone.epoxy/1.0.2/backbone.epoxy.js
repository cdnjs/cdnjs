// Backbone.Epoxy

// (c) 2013 Greg MacWilliam
// Freely distributed under the MIT license
// For usage and documentation:
// http://epoxyjs.org

(function(root, factory) {
	
	var backbone = 'backbone';
	var underscore = 'underscore';
	
	if (typeof exports !== 'undefined') {
		// Define as CommonJS export:
		module.exports = factory(require(underscore), require(backbone));
	} else if (typeof define === 'function' && define.amd) {
		// Define as AMD:
		define([underscore, backbone], factory);
	} else {
		// Just run it:
		factory(root._, root.Backbone);
	}
	
}(this, function(_, Backbone) {
	
	// Epoxy namespace:
	var Epoxy = Backbone.Epoxy = {};
		
	// Object-type utils:
	var array = Array.prototype;
	var isUndefined = _.isUndefined;
	var isFunction = _.isFunction;
	var isObject = _.isObject;
	var isArray = _.isArray;
	var isModel = function(obj) { return obj instanceof Backbone.Model; };
	var isCollection = function(obj) { return obj instanceof Backbone.Collection; };
	var blankMethod = function() {};
	
	// Static mixins API:
	// added as a static member to Epoxy class objects (Model & View);
	// generates a set of class attributes for mixin with other objects.
	var mixins = {
		mixin: function(extend) {
			extend = extend || {};
			
			for (var i in this.prototype) {
				if (this.prototype.hasOwnProperty(i) && i !== 'constructor') {
					extend[i] = this.prototype[i];
				}
			}
			return extend;
		}
	};
	
	// Partial application for calling method implementations of a super-class object:
	function superClass(sup) {
		return function(instance, method, args) {
			return sup.prototype[ method ].apply(instance, args);
		};
	}
	
	
	// Epoxy.Model
	// -----------
	var modelMap;
	var modelSuper = superClass(Backbone.Model);
	var modelProps = ['computeds'];
	
	Epoxy.Model = Backbone.Model.extend({
		
		// Backbone.Model constructor override:
		// configures computed model attributes around the underlying native Backbone model.
		constructor: function(attributes, options) {
			_.extend(this, _.pick(options||{}, modelProps));
			modelSuper(this, 'constructor', arguments);
			this.initComputeds();
		},
		
		// Gets a copy of a model attribute value:
		// Array and Object values will return a shallow copy,
		// primitive values will be returned directly.
		getCopy: function(attribute) {
			return _.clone(this.get(attribute));
		},
		
		// Backbone.Model.get() override:
		// provides access to computed attributes,
		// and maps computed dependency references while establishing bindings.
		get: function(attribute) {
			
			// Automatically register bindings while building out computed dependency graphs:
			modelMap && modelMap.push(['change:'+attribute, this]);
			
			// Return a computed property value, if available:
			if (this.hasComputed(attribute)) {
				return this.c()[ attribute ].get();
			}
			
			// Default to native Backbone.Model get operation:
			return modelSuper(this, 'get', arguments);
		},
		
		// Backbone.Model.set() override:
		// will process any computed attribute setters,
		// and then pass along all results to the underlying model.
		set: function(key, value, options) {
			var params = key;
			
			// Convert key/value arguments into {key:value} format:
			if (params && !isObject(params)) {
				params = {};
				params[ key ] = value;
			} else {
				options = value;
			}
			
			// Default options definition:
			options = options || {};

			// Attempt to set computed attributes while not unsetting:
			if (!options.unset) {
				// All param properties are tested against computed setters,
				// properties set to computeds will be removed from the params table.
				// Optionally, an computed setter may return key/value pairs to be merged into the set.
				params = deepModelSet(this, params, {}, []);
			}
			
			// Pass all resulting set params along to the underlying Backbone Model.
			return modelSuper(this, 'set', [params, options]);
		},
		
		// Backbone.Model.toJSON() override:
		// adds a 'computed' option, specifying to include computed attributes.
		toJSON: function(options) {
			var json = modelSuper(this, 'toJSON', arguments);

			if (options && options.computed) {
				_.each(this.c(), function(computed, attribute) {
					json[ attribute ] = computed.value;
				});
			}
			
			return json;
		},
		
		// Backbone.Model.destroy() override:
		// clears all computed attributes before destroying.
		destroy: function() {
			this.clearComputeds();
			return modelSuper(this, 'destroy', arguments);
		},
		
		// Computed namespace manager:
		// Allows the model to operate as a mixin.
		c: function() {
			return this._c || (this._c = {});
		},
		
		// Initializes the Epoxy model:
		// called automatically by the native constructor,
		// or may be called manually when adding Epoxy as a mixin.
		initComputeds: function() {
			this.clearComputeds();
			
			// Add all computed attributes:
			_.each(_.result(this, 'computeds')||{}, function(params, attribute) {
				params._init = 1;
				this.addComputed(attribute, params);
			}, this);

			// Initialize all computed attributes:
			// all presets have been constructed and may reference each other now.
			_.invoke(this.c(), 'init');
		},
		
		// Adds a computed attribute to the model:
		// computed attribute will assemble and return customized values.
		// @param attribute (string)
		// @param getter (function) OR params (object)
		// @param [setter (function)]
		// @param [dependencies ...]
		addComputed: function(attribute, getter, setter) {
			this.removeComputed(attribute);
			
			var params = getter;
			var delayInit = params._init;
			
			// Test if getter and/or setter are provided:
			if (isFunction(getter)) {
				var depsIndex = 2;
				
				// Add getter param:
				params = {};
				params._get = getter;
				
				// Test for setter param:
				if (isFunction(setter)) {
					params._set = setter;
					depsIndex++;
				}
				
				// Collect all additional arguments as dependency definitions:
				params.deps = array.slice.call(arguments, depsIndex);
			}
			
			// Create a new computed attribute:
			this.c()[ attribute ] = new EpoxyComputedModel(this, attribute, params, delayInit);
			return this;
		},
		
		// Tests the model for a computed attribute definition:
		hasComputed: function(attribute) {
			return this.c().hasOwnProperty(attribute);
		},
		
		// Removes an computed attribute from the model:
		removeComputed: function(attribute) {
			if (this.hasComputed(attribute)) {
				this.c()[ attribute ].dispose();
				delete this.c()[ attribute ];
			}
			return this;
		},

		// Removes all computed attributes:
		clearComputeds: function() {
			for (var attribute in this.c()) {
				this.removeComputed(attribute);
			}
			return this;
		},
		
		// Internal array value modifier:
		// performs array ops on a stored array value, then fires change.
		// No action is taken if the specified attribute value is not an array.
		modifyArray: function(attribute, method) {
			var obj = this.get(attribute);
			
			if (isArray(obj) && isFunction(array[method])) {
				var args = array.slice.call(arguments, 2);
				var result = array[ method ].apply(obj, args);
				this.trigger('change change:'+attribute);
				return result;
			}
			return null;
		},
		
		// Internal object value modifier:
		// sets new property values on a stored object value, then fires change.
		// No action is taken if the specified attribute value is not an object.
		modifyObject: function(attribute, property, value) {
			var obj = this.get(attribute);
			var change = false;
			
			// If property is Object:
			if (isObject(obj)) {
				
				// Delete existing property in response to undefined values:
				if (isUndefined(value) && obj.hasOwnProperty(property)) {
					delete obj[property];
					change = true;
				}
				// Set new and/or changed property values:
				else if (obj[ property ] !== value) {
					obj[ property ] = value;
					change = true;
				}
				
				// Trigger model change:
				if (change) {
					this.trigger('change change:'+attribute);
				}
				
				// Return the modified object:
				return obj;
			}
			return null;
		}
	}, mixins);

	// Epoxy.Model -> Private
	// ----------------------

	// Model deep-setter:
	// Attempts to set a collection of key/value attribute pairs to computed attributes.
	// Observable setters may digest values, and then return mutated key/value pairs for inclusion into the set operation.
	// Values returned from computed setters will be recursively deep-set, allowing computeds to set other computeds.
	// The final collection of resolved key/value pairs (after setting all computeds) will be returned to the native model.
	// @param model: target Epoxy model on which to operate.
	// @param toSet: an object of key/value pairs to attempt to set within the computed model.
	// @param toReturn: resolved non-ovservable attribute values to be returned back to the native model.
	// @param trace: property stack trace (prevents circular setter loops).	
	function deepModelSet(model, toSet, toReturn, stack) {
		
		// Loop through all setter properties:
		for (var attribute in toSet) {
			if (toSet.hasOwnProperty(attribute)) {
				
				// Pull each setter value:
				var value = toSet[ attribute ];
				
				if (model.hasComputed(attribute)) {
					
					// Has a computed attribute:
					// comfirm attribute does not already exist within the stack trace.
					if (!stack.length || _.indexOf(stack, attribute) < 0) {
						
						// Non-recursive:
						// set and collect value from computed attribute. 
						value = model.c()[attribute].set(value);
						
						// Recursively set new values for a returned params object:
						// creates a new copy of the stack trace for each new search branch.
						if (value && isObject(value)) {
							toReturn = deepModelSet(model, value, toReturn, stack.concat(attribute));
						}
						
					} else {
						// Recursive:
						// Throw circular reference error.
						throw('Recursive setter: '+stack.join(' > '));
					}
					
				} else {
					// No computed attribute:
					// set the value to the keeper values.
					toReturn[ attribute ] = value;
				}
			}
		}
		
		return toReturn;
	}
	
	
	// Epoxy.Model -> Computed
	// -----------------------
	// Computed objects store model values independently from the model's attributes table.
	// Computeds define custom getter/setter functions to manage their value.
	
	function EpoxyComputedModel(model, name, params, delayInit) {
		params = params || {};
		
		// Rewrite getter param:
		if (params.get && isFunction(params.get)) {
			params._get = params.get;
		}
		
		// Rewrite setter param:
		if (params.set && isFunction(params.set)) {
			params._set = params.set;
		}
		
		// Prohibit override of 'get()' and 'set()', then extend:
		delete params.get;
		delete params.set;
		_.extend(this, params);
		
		// Set model, name, and default dependencies array:
		this.model = model;
		this.name = name;
		this.deps = this.deps || [];
		
		// Skip init while parent model is initializing:
		// Model will initialize in two passes...
		// the first pass sets up all computed attributes,
		// then the second pass initializes all bindings.
		if (!delayInit) this.init();
	}
	
	_.extend(EpoxyComputedModel.prototype, Backbone.Events, {
		
		// Initializes the computed's value and bindings:
		// this method is called independently from the object constructor,
		// allowing computeds to build and initialize in two passes by the parent model.
		init: function() {
			
			// Configure dependency map, then update the computed's value:
			// All Epoxy.Model attributes accessed while getting the initial value
			// will automatically register themselves within the model bindings map.
			var bindings = {};
			var deps = modelMap = [];
			this.get(true);
			modelMap = null;
			
			// If the computed has dependencies, then proceed to binding it:
			if (deps.length) {
				
				// Compile normalized bindings table:
				// Ultimately, we want a table of event types, each with an array of their associated targets:
				// {'change:name':[<model1>], 'change:status':[<model1>,<model2>]}
				
				// Compile normalized bindings map:
				_.each(deps, function(value) {
					var attribute = value[0];
					var target = value[1];

					// Populate event target arrays:
					if (!bindings[attribute]) {
						bindings[attribute] = [ target ];
					
					} else if (!_.contains(bindings[attribute], target)) {
						bindings[attribute].push(target);
					}
				});
			
				// Bind all event declarations to their respective targets:
				_.each(bindings, function(targets, binding) {
					for (var i=0, len=targets.length; i < len; i++) {
						this.listenTo(targets[i], binding, _.bind(this.get, this, true));
					}
				}, this);
			}
		},
		
		// Gets an attribute value from the parent model.
		val: function(attribute) {
			return this.model.get(attribute);
		},
		
		// Gets the computed's current value:
		// Computed values flagged as dirty will need to regenerate themselves.
		// Note: 'update' is strongly checked as TRUE to prevent unintended arguments (handler events, etc) from qualifying.
		get: function(update) {
			if (update === true && this._get) {
				var val = this._get.apply(this.model, _.map(this.deps, this.val, this));
				this.change(val);
			}
			return this.value;
		},
		
		// Sets the computed's current value:
		// computed values (have a custom getter method) require a custom setter.
		// Custom setters should return an object of key/values pairs;
		// key/value pairs returned to the parent model will be merged into its main .set() operation.
		set: function(val) {
			if (this._get) {
				if (this._set) return this._set.apply(this.model, arguments);
				else throw('Cannot set read-only computed attribute.');
			}
			this.change(val);
			return null;
		},
		
		// Changes the computed's value:
		// new values are cached, then fire an update event.
		change: function(value) {
			if (!_.isEqual(value, this.value)) {
				this.value = value;
				this.model.trigger('change:'+this.name+' change', this.model);
			}
		},
		
		// Disposal:
		// cleans up events and releases references.
		dispose: function() {
			this.stopListening();
			this.off();
			this.model = this.value = null;
		}
	});
	
	
	// Epoxy.binding -> Binding API
	// ----------------------------
	
	var bindingSettings = {
		optionText: 'label',
		optionValue: 'value'
	};
	
	
	// Cache for storing binding parser functions:
	// Cuts down on redundancy when building repetitive binding views.
	var bindingCache = {};
	
	
	// Reads value from an accessor:
	// Accessors come in three potential forms:
	// => A function to call for the requested value.
	// => An object with a collection of attribute accessors.
	// => A primitive (string, number, boolean, etc).
	// This function unpacks an accessor and returns its underlying value(s).
	
	function readAccessor(accessor) {
		
		if (isFunction(accessor)) {
			// Accessor is function: return invoked value.
			return accessor();
		}
		else if (isObject(accessor)) {
			// Accessor is object/array: return copy with all attributes read.
			accessor = _.clone(accessor);
			
			_.each(accessor, function(value, key) {
				accessor[ key ] = readAccessor(value);
			});
		}
		// return formatted value, or pass through primitives:
		return accessor;
	}
	
	
	// Binding Handlers
	// ----------------
	// Handlers define set/get methods for exchanging data with the DOM.
	
	// Formatting function for defining new handler objects:
	function makeHandler(handler) {
		return isFunction(handler) ? {set: handler} : handler;
	}
	
	var bindingHandlers = {
		// Attribute: write-only. Sets element attributes.
		attr: makeHandler(function($element, value) {
			$element.attr(value);
		}),
		
		// Checked: read-write. Toggles the checked status of a form element.
		checked: makeHandler({
			get: function($element, currentValue) {
				var checked = !!$element.prop('checked');
				var value = $element.val();
				
				if (this.isRadio($element)) {
					// Radio button: return value directly.
					return value;
					
				} else if (isArray(currentValue)) {
					// Checkbox array: add/remove value from list.
					currentValue = currentValue.slice();
					var index = _.indexOf(currentValue, value);

					if (checked && index < 0) {
						currentValue.push(value);
					} else if (!checked && index > -1) {
						currentValue.splice(index, 1);
					}
					return currentValue;
				}
				// Checkbox: return boolean toggle.
				return checked;
			},
			set: function($element, value) {
				// Default as loosely-typed boolean:
				var checked = !!value;
				
				if (this.isRadio($element)) {
					// Radio button: match checked state to radio value.
					checked = (value == $element.val());
					
				} else if (isArray(value)) {
					// Checkbox array: match checked state to checkbox value in array contents.
					checked = _.contains(value, $element.val());
				}
				
				// Set checked property to element:
				$element.prop('checked', checked);
			},
			// Is radio button: avoids '.is(":radio");' check for basic Zepto compatibility.
			isRadio: function($element) {
				return $element.attr('type').toLowerCase() === 'radio';
			}
		}),
		
		// Class Name: write-only. Toggles a collection of class name definitions.
		classes: makeHandler(function($element, value) {
			_.each(value, function(enabled, className) {
				$element.toggleClass(className, !!enabled);
			});
		}),
		
		// Collection: write-only. Manages a list of views bound to a Backbone.Collection.
		collection: makeHandler({
			init: function($element, collection) {
				if (!isCollection(collection) || !isFunction(collection.view)) {
					throw('Binding "collection" requires a Collection with a "view" constructor.');
				}
				this.v = {};
			},
			set: function($element, collection, target) {
								
				var models = collection.models;
				var views = this.v;
				var view;
				
				// Default target to the bound collection object:
				// during init (or failure), the binding will reset.
				target = target || collection;
				
				if (isModel(target)) {
					
					// ADD/REMOVE Event (from a Model):
					// test if view exists within the binding...
					if (!views.hasOwnProperty(target.cid)) {
						
						// Add new view:
						views[ target.cid ] = view = new collection.view({model: target});
						var index = _.indexOf(models, target);
						var $children = $element.children();
						
						// Attempt to add at proper index,
						// otherwise just append into the element.
						if (index < $children.length) {
							$children.eq(index).before(view.$el);
						} else {
							$element.append(view.$el);
						}
						
					} else {
						
						// Remove existing view:
						views[ target.cid ].remove();
						delete views[ target.cid ];
					}
					
				} else if (isCollection(target)) {
					
					// SORT/RESET Event (from a Collection):
					// First test if we're sorting...
					// (number of models has not changed and all their views are present)
					var sort = models.length === _.size(views) && collection.every(function(model) {
						return views.hasOwnProperty(model.cid);
					});
					
					// Hide element before manipulating:
					$element.hide();
					
					if (sort) {
						// Sort existing views:
						collection.each(function(model) {
							$element.append(views[model.cid].$el);
						});
						
					} else {
						// Reset with new views:
						this.clean();
						
						collection.each(function(model) {
							views[ model.cid ] = view = new collection.view({model: model});
							$element.append(view.$el);
						});
					}
					
					// Show element after manipulating:
					$element.show();
				}
			},
			clean: function() {
				for (var id in this.v) {
					if (this.v.hasOwnProperty(id)) {
						this.v[ id ].remove();
						delete this.v[ id ];
					}
				}
			}
		}),
		
		// CSS: write-only. Sets a collection of CSS styles to an element.
		css: makeHandler(function($element, value) {
			$element.css(value);
		}),

		// Disabled: write-only. Sets the 'disabled' status of a form element (true :: disabled).
		disabled: makeHandler(function($element, value) {
			$element.prop('disabled', !!value);
		}),
		
		// Enabled: write-only. Sets the 'disabled' status of a form element (true :: !disabled).
		enabled: makeHandler(function($element, value) {
			$element.prop('disabled', !value);
		}),
	
		// HTML: write-only. Sets the inner HTML value of an element.
		html: makeHandler(function($element, value) {
			$element.html(value);
		}),
		
		// Options: write-only. Sets option items to a <select> element, then updates the value.
		options: makeHandler({
			init: function($element, value, context, bindings) {
				this.e = bindings.optionsEmpty;
				this.d = bindings.optionsDefault;
				this.v = bindings.value;
			},
			set: function($element, value) {
				
				// Pre-compile empty and default option values:
				// both values MUST be accessed, for two reasons:
				// 1) we need to need to guarentee that both values are reached for mapping purposes.
				// 2) we'll need their values anyway to determine their defined/undefined status.
				var self = this;
				var optionsEmpty = readAccessor(self.e);
				var optionsDefault = readAccessor(self.d);
				var currentValue = readAccessor(self.v);
				var selection = isArray(currentValue) ? currentValue : [ currentValue ];
				var options = isCollection(value) ? value.models : value;
				var numOptions = options.length;
				var enabled = true;
				var html = '';
				
				// No options or default, and has an empty options placeholder:
				// display placeholder and disable select menu.
				if (!numOptions && !optionsDefault && optionsEmpty) {
				
					html += self.opt(optionsEmpty, numOptions, selection);
					enabled = false;
				
				} else {
					// Try to populate default option and options list:
				
					// Configure list with a default first option, if defined:
					if (optionsDefault) {
						options = [ optionsDefault ].concat(options);
					}
				
					// Create all option items:
					_.each(options, function(option, index) {
						html += self.opt(option, numOptions, selection);
					});
				}

				// Set new HTML to the element and toggle disabled status:
				$element.html(html).prop('disabled', !enabled);

				// Pull revised value with new options selection state:
				var revisedValue = $element.val();

				// Test if the current value was successfully applied:
				// if not, set the new selection state into the model. 
				if (self.v && !_.isEqual(currentValue, revisedValue)) {
					self.v(revisedValue);
				}
			},
			opt: function(option, numOptions, selection) {
				// Set both label and value as the raw option object by default:
				var label = option;
				var value = option;
				var textAttr = bindingSettings.optionText;
				var valueAttr = bindingSettings.optionValue;
				
				// Dig deeper into label/value settings for non-primitive values:
				if (isObject(option)) {
					// Extract a label and value from each object:
					// a model's 'get' method is used to access potential computed values.
					label = isModel(option) ? option.get(textAttr) : option[ textAttr ];
					value = isModel(option) ? option.get(valueAttr) : option[ valueAttr ];
				}
				
				// Configure selection-state option fragment:
				// option should be selected if it's the only item (default/empty), or exists in the selection:
				var select = (!numOptions || _.contains(selection, value)) ? '" selected="selected">' : '">';
				
				return '<option value="'+ value + select + label +'</option>';
			},
			clean: function() {
				this.d = this.e = this.v = 0;
			}
		}),
		
		// Template: write-only. Renders the bound element with an Underscore template.
		template: makeHandler({
			init: function($element, value, context) {
				var raw = $element.find('script,template');
				this.t = _.template(raw.length ? raw.html() : $element.html());
				
				// If an array of template attributes was provided,
				// then replace array with a compiled hash of attribute accessors:
				if (isArray(value)) {
					return _.pick(context, value);
				}
			},
			set: function($element, value) {
				value = isModel(value) ? value.toJSON({computed:true}) : value;
				$element.html(this.t(value));
			},
			clean: function() {
				this.t = null;
			}
		}),
		
		// Text: write-only. Sets the text value of an element.
		text: makeHandler(function($element, value) {
			$element.text(value);
		}),
		
		// Toggle: write-only. Toggles the visibility of an element.
		toggle: makeHandler(function($element, value) {
			$element.toggle(!!value);
		}),
		
		// Value: read-write. Gets and sets the value of a form element.
		value: makeHandler({
			get: function($element) {
				return $element.val();
			},
			set: function($element, value) {
				try {
					if ($element.val() != value) $element.val(value);
				} catch (error) {
					// Error setting value: IGNORE.
					// This occurs in IE6 while attempting to set an undefined multi-select option.
					// unfortuantely, jQuery doesn't gracefully handle this error for us.
					// remove this try/catch block when IE6 is officially deprecated.
				}
			}
		})
	};
	
	
	// Binding Filters
	// ---------------
	// Filters are special binding handlers that may be invoked while binding;
	// they will return a wrapper function used to modify how accessors are read.
	
	// Partial application wrapper for creating binding filters:
	function makeFilter(handler) {
		return function() {
			var params = arguments;
			var read = isFunction(handler) ? handler : handler.get;
			var write = handler.set;
			return function(value) {
				return isUndefined(value) ? 
					read.apply(this, _.map(params, readAccessor)) :
					params[0]((write ? write : read).call(this, value));
			};
		};
	}
	
	var bindingFilters = {
		// Positive collection assessment [read-only]:
		// Tests if all of the provided accessors are truthy (and).
		all: makeFilter(function() {
			var params = arguments;
			for (var i=0, len=params.length; i < len; i++) {
				if (!params[i]) return false;
			}
			return true;
		}),
		
		// Partial collection assessment [read-only]:
		// tests if any of the provided accessors are truthy (or).
		any: makeFilter(function() {
			var params = arguments;
			for (var i=0, len=params.length; i < len; i++) {
				if (params[i]) return true;
			}
			return false;
		}),
		
		// Collection length accessor [read-only]:
		// assumes accessor value to be an Array or Collection; defaults to 0.
		length: makeFilter(function(value) {
			return value.length || 0;
		}),
		
		// Negative collection assessment [read-only]:
		// tests if none of the provided accessors are truthy (and not).
		none: makeFilter(function() {
			var params = arguments;
			for (var i=0, len=params.length; i < len; i++) {
				if (params[i]) return false;
			}
			return true;
		}),
	
		// Negation [read-only]:
		not: makeFilter(function(value) {
			return !value;
		}),
	
		// Formats one or more accessors into a text string:
		// ('$1 $2 did $3', firstName, lastName, action)
		format: makeFilter(function(str) {
			var params = arguments;
			
			for (var i=1, len=params.length; i < len; i++) {
				// TODO: need to make something like this work: (?<!\\)\$1
				str = str.replace(new RegExp('\\$'+i, 'g'), params[i]);
			}
			return str;
		}),
		
		// Provides one of two values based on a ternary condition:
		// uses first param (a) as condition, and returns either b (truthy) or c (falsey).
		select: makeFilter(function(condition, truthy, falsey) {
			return condition ? truthy : falsey;
		}),
		
		// CSV array formatting [read-write]:
		csv: makeFilter({
			get: function(value) {
				value = String(value);
				return value ? value.split(',') : [];
			},
			set: function(value) {
				return isArray(value) ? value.join(',') : value;
			}
		}),
		
		// Integer formatting [read-write]:
		integer: makeFilter(function(value) {
			return value ? parseInt(value, 10) : 0;
		}),
		
		// Float formatting [read-write]:
		decimal: makeFilter(function(value) {
			return value ? parseFloat(value) : 0;
		})
	};
	
	
	// Define binding API:
	Epoxy.binding = {
		addHandler: function(name, handler) {
			bindingHandlers[ name ] = makeHandler(handler);
		},
		addFilter: function(name, handler) {
			bindingFilters[ name ] = makeFilter(handler);
		},
		config: function(settings) {
			_.extend(bindingSettings, settings);
		},
		emptyCache: function() {
			bindingCache = {};
		}
	};
	
	
	// Epoxy.View
	// ----------
	var viewMap;
	var viewSuper = superClass(Backbone.View);
	var viewProps = ['viewModel', 'bindings', 'bindingFilters', 'bindingHandlers', 'bindingSources', 'computeds'];
	
	
	Epoxy.View = Backbone.View.extend({
		
		// Backbone.View constructor override:
		// sets up binding controls around call to super.
		constructor: function(options) {
			_.extend(this, _.pick(options||{}, viewProps));
			viewSuper(this, 'constructor', arguments);
			this.applyBindings();
		},
		
		// Bindings list accessor:
		b: function() {
			return this._b || (this._b = []);
		},
		
		// Bindings definition:
		// this setting defines a DOM attribute name used to query for bindings.
		// Alternatively, this be replaced with a hash table of key/value pairs,
		// where 'key' is a DOM query and 'value' is its binding declaration.
		bindings: 'data-bind',
		
		// Setter options:
		// Defines an optional hashtable of options to be passed to setter operations.
		// Accepts a custom option '{save:true}' that will write to the model via ".save()".
		setterOptions: null,
		
		// Compiles a model context, then applies bindings to the view:
		// All Model->View relationships will be baked at the time of applying bindings;
		// changes in configuration to source attributes or view bindings will require a complete re-bind.
		applyBindings: function() {
			this.removeBindings();
			
			var self = this;
			var sources = _.clone(_.result(self, 'bindingSources'));
			var declarations = self.bindings;
			var options = self.setterOptions;
			var handlers = _.clone(bindingHandlers);
			var filters = _.clone(bindingFilters);
			var context = self._c = {};
			
			// Compile a complete set of binding handlers for the view:
			// mixes all custom handlers into a copy of default handlers.
			// Custom handlers defined as plain functions are registered as read-only setters.
			_.each(_.result(self, 'bindingHandlers')||{}, function(handler, name) {
			    handlers[ name ] = makeHandler(handler);
			});
			
			// Compile a complete set of binding filters for the view:
			// mixes all custom filters into a copy of default filters.
			_.each(_.result(self, 'bindingFilters')||{}, function(filter, name) {
			    filters[ name ] = makeFilter(filter);
			});
			
			// Add native 'model' and 'collection' data sources:
			self.model = addSourceToViewContext(self, context, options, 'model');
			self.viewModel = addSourceToViewContext(self, context, options, 'viewModel');
			self.collection = addSourceToViewContext(self, context, options, 'collection');
			
			// Add all additional data sources:
			if (sources) {
				_.each(sources, function(source, sourceName) {
					sources[ sourceName ] = addSourceToViewContext(sources, context, options, sourceName, sourceName);
				});
				
				// Reapply resulting sources to view instance.
				self.bindingSources = sources;
			}
			
			// Add all computed view properties:
			_.each(_.result(self, 'computeds')||{}, function(computed, name) {
				var getter = isFunction(computed) ? computed : computed.get;
				var setter = computed.set;
				var deps = computed.deps;
				getter.id = name;
				
				context[ name ] = function(value) {
					return (!isUndefined(value) && setter) ?
						setter.call(self, value) :
						getter.apply(self, getDepsFromViewContext(self._c, deps));
				};
			});
			
			// Create all bindings:
			// bindings are created from an object hash of query/binding declarations,
			// OR based on queried DOM attributes.
			if (isObject(declarations)) {
				
				// Object declaration method:
				// {'span.my-element': 'text:attribute'}
				
				_.each(declarations, function(elementDecs, selector) {
					// Get DOM jQuery reference:
					var $element = queryViewForSelector(self, selector);

					// Ignore empty DOM queries (without errors):
					if ($element.length) {
						bindElementToView(self, $element, elementDecs, context, handlers, filters);
					}
				});
				
			} else {
				
				// DOM attributes declaration method:
				// <span data-bind='text:attribute'></span>
				
				// Create bindings for each matched element:
				queryViewForSelector(self, '['+declarations+']').each(function() {
					var $element = $(this);
					bindElementToView(self, $element, $element.attr(declarations), context, handlers, filters);
				});
			}
		},
		
		// Gets a value from the binding context:
		getBinding: function(attribute) {
			return accessViewContext(this._c, arguments, attribute);
		},
		
		// Sets a value to the binding context:
		setBinding: function(attribute, value) {
			return accessViewContext(this._c, arguments, attribute, value);
		},
		
		// Disposes of all view bindings:
		removeBindings: function() {
			this._c = null;
			
			if (this._b) {
				while (this._b.length) {
					this._b.pop().dispose();
				}
			}
		},
	
		// Backbone.View.remove() override:
		// unbinds the view before performing native removal tasks.
		remove: function() {
			this.removeBindings();
			viewSuper(this, 'remove', arguments);
		}
		
	}, mixins);
	
	// Epoxy.View -> Private
	// ---------------------
	
	// Adds a data source to a view:
	// Data sources are Backbone.Model and Backbone.Collection instances.
	// @param source: a source instance, or a function that returns a source.
	// @param context: the working binding context. All bindings in a view share a context.
	function addSourceToViewContext(source, context, options, name, prefix) {
		
		// Resolve source instance:
		source = _.result(source, name);
		
		// Ignore missing sources, and invoke non-instances:
		if (!source) return;
		
		// Add Backbone.Model source instance:
		if (isModel(source)) {
			
			// Establish source prefix:
			prefix = prefix ? prefix+'_' : '';
			
			// Create a read-only accessor for the model instance:
			context['$'+name] = function() {
				viewMap && viewMap.push([source, 'change']);
				return source;
			};
			
			// Compile all model attributes as accessors within the context:
			_.each(source.toJSON({computed:true}), function(value, attribute) {
				
				// Create named accessor functions:
				// -> Attributes from 'view.model' use their normal names.
				// -> Attributes from additional sources are named as 'source_attribute'.
				context[prefix+attribute] = function(value) {
					return accessViewDataAttribute(source, attribute, value, options);
				};
			});
		}
		// Add Backbone.Collection source instance:
		else if (isCollection(source)) {
			
			// Create a read-only accessor for the collection instance:
			context['$'+name] = function() {
				viewMap && viewMap.push([source, 'reset add remove sort update']);
				return source;
			};
		}
		
		// Return original object, or newly constructed data source:
		return source;
	}
	
	// Attribute data accessor:
	// exchanges individual attribute values with model sources.
	// This function is broken out from the accessor creation process for performance.
	// @param source: the model data source to interact with.
	// @param attribute: the model attribute to read/write.
	// @param value: the value to set, or 'undefined' to get the current value.
	function accessViewDataAttribute(source, attribute, value, options) {
		// Register the attribute to the bindings map, if enabled:
		viewMap && viewMap.push([source, 'change:'+attribute]);

		// Set attribute value when accessor is invoked with an argument:
		if (!isUndefined(value)) {
			
			// Set Object (non-null, non-array) hashtable value:
			if (!isObject(value) || isArray(value)) {
				var val = value;
				(value = {})[attribute] = val;
			}
			
			// Set value:
			return options && options.save ? source.save(value, options) : source.set(value, options);
		}
		
		// Get the attribute value by default:
		return source.get(attribute);
	}
	
	// Queries element selectors within a view:
	// matches elements within the view, and the view's container element.
	function queryViewForSelector(view, selector) {
		if (selector === ':el') return view.$el;
		var $elements = view.$(selector);
		
		// Include top-level view in bindings search:
		if (view.$el.is(selector)) {
			$elements = $elements.add(view.$el);
		}
		
		return $elements;
	}
	
	// Binds an element into a view:
	// The element's declarations are parsed, then a binding is created for each declared handler.
	// @param view: the parent View to bind into.
	// @param $element: the target element (as jQuery) to bind.
	// @param declarations: the string of binding declarations provided for the element.
	// @param context: a compiled binding context with all availabe view data.
	// @param handlers: a compiled handlers table with all native/custom handlers.
	function bindElementToView(view, $element, declarations, context, handlers, filters) {

		// Parse localized binding context:
		// parsing function is invoked with 'filters' and 'context' properties made available,
		// yeilds a native context object with element-specific bindings defined.
		try {
			var parserFunct = bindingCache[declarations] || (bindingCache[declarations] = new Function('$f','$c','with($f){with($c){return{'+ declarations +'}}}'));
		 	var bindings = parserFunct(filters, context);
		} catch (error) {
			throw('Error parsing bindings: "'+declarations +'"\n>> '+error);
		}

		// Format the 'events' option:
		// include events from the binding declaration along with a default 'change' trigger,
		// then format all event names with a '.epoxy' namespace.
		var events = _.map(_.union(bindings.events || [], ['change']), function(name) {
			return name+'.epoxy';
		}).join(' ');
		
		// Apply bindings from native context:
		_.each(bindings, function(accessor, handlerName) {
			
			// Validate that each defined handler method exists before binding:
			if (handlers.hasOwnProperty(handlerName)) {
				// Create and add binding to the view's list of handlers:
				view.b().push(new EpoxyBinding($element, handlers[handlerName], accessor, events, context, bindings));
			}
		});
	}
	
	// Gets and sets view context data attributes:
	// used by the implementations of "getBinding" and "setBinding".
	function accessViewContext(context, args, attribute, value) {
		if (args.callee.caller && args.callee.caller.id === attribute) {
			throw('Recursive access error: '+attribute);
		} else if (context && context.hasOwnProperty(attribute)) {
			return isUndefined(value) ? readAccessor(context[attribute]) : context[attribute](value);
		}
	}
	
	// Accesses an array of dependency properties from a view context:
	// used for mapping view dependencies by manual declaration.
	function getDepsFromViewContext(context, attributes) {
		var values = [];
		if (attributes && context) {
			for (var i=0, len=attributes.length; i < len; i++) {
				values.push(attributes[i] in context ? context[ attributes[i] ]() : null);
			}
		}
		return values;
	}
	
	
	// Epoxy.View -> Binding
	// ---------------------
	// The binding object connects an element to a bound handler.
	// @param $element: the target element (as jQuery) to bind.
	// @param handler: the handler object to apply (include all handler methods).
	// @param accessor: an accessor method from the binding context that exchanges data with the model.
	// @param options: a compiled set of binding options that was pulled from the declaration.
	function EpoxyBinding($element, handler, accessor, events, context, bindings) {
		
		var self = this;
		var tag = ($element[0].tagName).toLowerCase();
		var changable = (tag == 'input' || tag == 'select' || tag == 'textarea' || $element.prop('contenteditable') == 'true');
		var triggers = [];
		var reset = function(target) {
			self.set(self.$el, readAccessor(accessor), target);
		};
		
		self.$el = $element;
		self.evt = events;
		_.extend(self, handler);

		// Initialize the binding:
		// allow the initializer to redefine/modify the attribute accessor if needed.
		accessor = self.init(self.$el, readAccessor(accessor), context, bindings) || accessor;
		
		// Set default binding, then initialize & map bindings:
		// each binding handler is invoked to populate its initial value.
		// While running a handler, all accessed attributes will be added to the handler's dependency map.
		viewMap = triggers;
		reset();
		viewMap = null;
		
		// Configure READ/GET-able binding. Requires:
		// => Form element.
		// => Binding handler has a getter method.
		// => Value accessor is a function.
		if (changable && handler.get && isFunction(accessor)) {
			self.$el.on(events, function(evt) {
				accessor(self.get(self.$el, readAccessor(accessor), evt));
			});
		}
		
		// Configure WRITE/SET-able binding. Requires:
		// => One or more events triggers.
		if (triggers.length) {
			for (var i=0, len=triggers.length; i < len; i++) {
				self.listenTo(triggers[i][0], triggers[i][1], reset);
			}
		}
	}
	
	_.extend(EpoxyBinding.prototype, Backbone.Events, {
		
		// Pass-through binding methods:
		// for override by actual implementations.
		init: blankMethod,
		get: blankMethod,
		set: blankMethod,
		clean: blankMethod,
		
		// Destroys the binding:
		// all events and managed sub-views are killed.
		dispose: function() {
			this.clean();
			this.stopListening();
			this.$el.off(this.evt);
			this.$el = null;
		}
	});
	
	return Epoxy;
}));
