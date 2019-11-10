// Backbone.Epoxy

// (c) 2013 Greg MacWilliam
// Freely distributed under the MIT license
// For usage and documentation:
// http://epoxyjs.org

(function() {
	
	// Operations scope:
	var root = this;
	var Backbone = root.Backbone;
	var _ = root._;
	
	
	// Epoxy namespace:
	var Epoxy = Backbone.Epoxy = {};
	
	
	// Object-type assessment utils:
	var array = Array.prototype;
	var isUndefined = _.isUndefined;
	var isFunction = _.isFunction;
	var isObject = _.isObject;
	var isArray = _.isArray;
	var isModel = function(obj) { return obj instanceof Backbone.Model; };
	var isCollection = function(obj) { return obj instanceof Backbone.Collection; };
	
	
	function copy( value ) {
		if ( isArray(value) ) {
			return value.slice();
		} else if ( isObject(value) ) {
			return _.clone(value);
		}
		return value;
	}
	
	
	// Partial application for calling method implementations of a super-class object:
	function superClass( sup ) {
		return function( instance, method, args ) {
			return sup.prototype[ method ].apply( instance, args );
		};
	}
	
	
	// Epoxy.Model
	// -----------
	var modelMap;
	var modelSuper = superClass( Backbone.Model );
	
	Epoxy.Model = Backbone.Model.extend({
		
		// Backbone.Model constructor override:
		// configures observable model attributes around the underlying native Backbone model.
		constructor: function() {
			this.obs = {};
			modelSuper( this, "constructor", arguments );
			
			// Flag "init" status to delay observables from self-initializing:
			// we'll need to hold off initializing observables until all presets are constructed.
			this._init = true;
			
			// Add all default observable attributes:
			if ( this.observableDefaults ) {
				_.each(this.observableDefaults, function( value, attribute ) {
					this.addObservable( attribute, isFunction(value) ? value() : copy(value) );
				}, this);
			}
			
			// Add all computed observables:
			if ( this.computeds ) {
				_.each(this.computeds, function( params, attribute ) {
					this.addComputed( attribute, params );
				}, this);
			}
			
			// Initialize all observable attributes:
			// all presets have been constructed and may reference each other now.
			_.each(this.obs, function( observable ) {
				observable.init();
			});
			
			// Unflag "init"; observables will now self-initialize.
			delete this._init;
		},
		
		// Backbone.Model.get() override:
		// provides access to observable attributes,
		// and maps computed dependency references while establishing bindings.
		get: function( attribute ) {
			
			// Automatically register bindings while building out computed dependency graphs:
			modelMap && modelMap.push( [attribute, this] );
			
			// Return an observable property value, if available:
			if ( this.hasObservable(attribute) ) {
				return this.obs[ attribute ].get();
			}
			
			// Default to native Backbone.Model get operation:
			return modelSuper( this, "get", arguments );
		},
		
		// Gets a copy of a model attribute value:
		// Array and Object values will return a shallow copy,
		// primitive values will be returned directly.
		getCopy: function( attribute ) {
			return copy( this.get(attribute) );
		},
		
		// Backbone.Model.set() override:
		// will process any observable attribute setters,
		// and then pass along all results to the underlying model.
		set: function( key, value, options ) {
			var params = key;
			
			// Convert ["attribute"/value] arguments into {key:value} format:
			if ( params && !isObject(params) ) {
				params = {};
				params[ key ] = value;
			} else {
				options = value;
			}
			
			// Default options definition:
			options = options || {};

			// Attempt to set observable attributes while not unsetting:
			if ( !options.unset ) {
				// All param properties are tested against observable setters,
				// properties set to observables will be removed from the params table.
				// Optionally, an observable setter may return key/value pairs to be merged into the set.
				params = modelDeepSet(this, params, {}, []);
			}
			
			// Pass all resulting set params along to the underlying Backbone Model.
			return modelSuper( this, "set", [params, options] );
		},
		
		// Backbone.Model.destroy() override:
		// clears all observable attributes before destroying.
		destroy: function() {
			this.clearObservables();
			return modelSuper( this, "destroy", arguments );
		},
		
		// Adds an observable attribute to the model:
		// observable attribute values may store any object type.
		addObservable: function( attribute, value ) {
			this.removeObservable( attribute );
			this.obs[ attribute ] = new EpoxyObservable( this, attribute, {value: value} );
			return this;
		},
		
		// Adds a computed observable attribute to the model:
		// computed attribute will assemble and return customized values.
		// @param attribute (string)
		// @param getter (function) OR params (object)
		// @param [setter (function)]
		// @param [dependencies ...]
		addComputed: function( attribute, getter, setter ) {
			this.removeObservable( attribute );
			
			var params = getter;
			
			// Test if getter and/or setter are provided:
			if ( isFunction(getter) ) {
				var depsIndex = 2;
				
				// Add getter param:
				params = {};
				params._get = getter;
				
				// Test for setter param:
				if ( isFunction(setter) ) {
					params._set = setter;
					depsIndex++;
				}
				
				// Collect all additional arguments as dependency definitions:
				params.deps = array.slice.call( arguments, depsIndex );
			}
			
			// Create a new computed attribute:
			this.obs[ attribute ] = new EpoxyObservable( this, attribute, params );
			return this;
		},
		
		// Tests the model for a observable attribute definition:
		hasObservable: function( attribute ) {
			return this.obs.hasOwnProperty( attribute );
		},
		
		// Removes an observable attribute from the model:
		removeObservable: function( attribute ) {
			if ( this.hasObservable(attribute) ) {
				this.obs[ attribute ].dispose();
				delete this.obs[ attribute ];
			}
			return this;
		},

		// Removes all observable attributes:
		clearObservables: function() {
			for ( var attribute in this.obs ) {
				this.removeObservable( attribute );
			}
			return this;
		},
		
		// Internal array value modifier:
		// performs array ops on a stored array value, then fires change.
		// No action is taken if the specified attribute value is not an array.
		modifyArray: function( attribute, method ) {
			var obj = this.get( attribute );
			
			if ( isArray(obj) && isFunction(array[method]) ) {
				var args = array.slice.call( arguments, 2 );
				var result = array[ method ].apply( obj, args );
				this.trigger( "change change:"+attribute );
				return result;
			}
			return null;
		},
		
		// Internal object value modifier:
		// sets new property values on a stored object value, then fires change.
		// No action is taken if the specified attribute value is not an object.
		modifyObject: function( attribute, property, value ) {
			var obj = this.get( attribute );
			var change = false;
			
			// If property is Object:
			if ( isObject(obj) ) {
				
				// Delete existing property in response to undefined values:
				if ( isUndefined(value) && obj.hasOwnProperty(property) ) {
					delete obj[property];
					change = true;
				}
				// Set new and/or changed property values:
				else if ( obj[ property ] !== value ) {
					obj[ property ] = value;
					change = true;
				}
				
				// Trigger model change:
				if (change) {
					this.trigger( "change change:"+attribute );
				}
				
				// Return the modified object:
				return obj;
			}
			return null;
		}
	});

	
	// Model deep-setter:
	// Attempts to set a collection of key/value attribute pairs to observable attributes.
	// Observable setters may digest values, and then return mutated key/value pairs for inclusion into the set operation.
	// Values returned from observable setters will be recursively deep-set, allowing observables to set other observables.
	// The final collection of resolved key/value pairs (after setting all observables) will be returned to the native model.
	// @param model: target Epoxy model on which to operate.
	// @param toSet: an object of key/value pairs to attempt to set within the observable model.
	// @param toReturn: resolved non-ovservable attribute values to be returned back to the native model.
	// @param trace: property stack trace (prevents circular setter loops).
	function modelDeepSet( model, toSet, toReturn, stack ) {
		
		// Loop through all setter properties:
		for ( var attribute in toSet ) {
			if ( toSet.hasOwnProperty(attribute) ) {
				
				// Pull each setter value:
				var value = toSet[ attribute ];
				
				if ( model.hasObservable(attribute) ) {
					
					// Has a observable attribute:
					// comfirm attribute does not already exist within the stack trace.
					if ( !stack.length || _.indexOf(stack, attribute) < 0 ) {
						
						// Non-recursive:
						// set and collect value from observable attribute. 
						value = model.obs[attribute].set(value);
						
						// Recursively set new values for a returned params object:
						// creates a new copy of the stack trace for each new search branch.
						if ( value && isObject(value) ) {
							toReturn = modelDeepSet( model, value, toReturn, stack.slice().concat([attribute]) );
						}
						
					} else {
						// Recursive:
						// Throw circular reference error.
						throw( "Recursive setter: "+stack.join(" > ") );
					}
					
				} else {
					// No observable attribute:
					// set the value to the keeper values.
					toReturn[ attribute ] = value;
				}
			}
		}
		
		return toReturn;
	}
	
	
	// Epoxy.Model -> Observable
	// -------------------------
	// Observable objects store model values independently from the model's attributes table.
	// Observables may store flat values, or define custom getter/setter functions to manage their value.
	var EpoxyObservable = function( model, name, params ) {
		params = params || {};
		
		// Rewrite getter param:
		if ( params.get && isFunction(params.get) ) {
			params._get = params.get;
		}
		
		// Rewrite setter param:
		if ( params.set && isFunction(params.set) ) {
			params._set = params.set;
		}
		
		// Prohibit override of "get()" and "set()", then extend:
		delete params.get;
		delete params.set;
		_.extend(this, params);
		
		// Set model, name, and default dependencies array:
		this.model = model;
		this.name = name;
		this.deps = this.deps || [];
		
		// Skip init while parent model is initializing:
		// Model will initialize in two passes...
		// the first pass sets up all observable attributes,
		// then the second pass initializes all bindings.
		if ( !model._init ) this.init();
	};
	
	_.extend(EpoxyObservable.prototype, Backbone.Events, {
		
		// Initializes the observable's value and bindings:
		// this method is called independently from the object constructor,
		// allowing observables to build and initialize in two passes by the parent model.
		init: function() {
			
			// Configure dependency map, then update the observable's value:
			// All Epoxy.Model attributes accessed while getting the initial value
			// will automatically register themselves within the model bindings map.
			modelMap = this.deps;
			this.get( true );
			modelMap = null;
			
			// If the observable has dependencies, then proceed to binding it:
			if ( this.deps.length ) {
				
				// Compile normalized bindings table:
				// Ultimately, we want a table of event types, each with an array of their associated targets:
				// {"change:name":[<model1>], "change:status":[<model1>,<model2>]}
				
				// Create a bindings table:
				var bindings = {};
			
				// Compile normalized bindings map:
				_.each(this.deps, function( attribute ) {
					var target = this.model;
				
					// Unpack any provided array attribute as: [propName, target].
					if ( isArray(attribute) ) {
						target = attribute[1];
						attribute = attribute[0];
					}
					
					// Normalize attribute names to include a "change:" prefix:
					if ( !!attribute.indexOf("change:") ) {
						attribute = "change:"+attribute;
					}

					// Populate event target arrays:
					if ( !bindings.hasOwnProperty(attribute) ) {
						bindings[attribute] = [ target ];
					
					} else if ( !_.contains(bindings[attribute], target) ) {
						bindings[attribute].push( target );
					}
				
				}, this);
			
				// Bind all event declarations to their respective targets:
				_.each(bindings, function( targets, binding ) {
					for (var i=0, len=targets.length; i < len; i++) {
						this.listenTo( targets[i], binding, _.bind(this.get, this, true) );
					}
				}, this);
			}
		},
		
		// Gets the observable's current value:
		// Computed values flagged as dirty will need to regenerate themselves.
		// Note: "update" is strongly checked as TRUE to prevent unintended arguments (handler events, etc) from qualifying.
		get: function( update ) {
			if ( update === true && this._get ) {
				var val = this._get.call( this.model );
				this.change( val );
			}
			return this.value;
		},
		
		// Sets the observable's current value:
		// computed values (have a custom getter method) require a custom setter.
		// Custom setters should return an object of key/values pairs;
		// key/value pairs returned to the parent model will be merged into its main .set() operation.
		set: function( val ) {
			if ( this._get ) {
				if ( this._set ) return this._set.apply( this.model, arguments );
				else throw( "Cannot set read-only computed observable." );
			}
			this.change( val );
			return null;
		},
		
		// Fires a change event for the observable attribute on the parent model:
		fire: function() {
			this.model.trigger( "change change:"+this.name );
		},

		// Changes the observable's value:
		// new values are cached, then fire an update event.
		change: function( value ) {
			if ( !_.isEqual(value, this.value) ) {
				this.value = value;
				this.fire();
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
	
	
	// Epoxy.View
	// ----------
	var viewMap;
	var viewSuper = superClass( Backbone.View );
	
	Epoxy.View = Backbone.View.extend({
		
		// Backbone.View constructor override:
		// sets up binding controls around call to super.
		constructor: function( options ) {
			// Create bindings list:
			this._bind = [];
			viewSuper( this, "constructor", arguments );
			this.applyBindings();
		},
		
		// Bindings definition:
		// this setting defines a DOM attribute name used to query for bindings.
		// Alternatively, this be replaced with a hash table of key/value pairs,
		// where "key" is a DOM query and "value" is its binding declaration.
		bindings: "data-bind",
		
		// Compiles a model context, then applies bindings to the view:
		// All Model->View relationships will be baked at the time of applying bindings;
		// changes in configuration to source attributes or view bindings will require a complete re-bind.
		applyBindings: function() {
			this.removeBindings();
			
			// Abort if no data sources are provided:
			if (!this.model && !this.collection && !this.bindingSources) return;
			
			var self = this;
			var sources = self.bindingSources;
			var declarations = self.bindings;
			var handlers = _.clone( bindingHandlers );
			var context = {};
			
			// Compile a complete set of binding handlers for the view:
			// mixes all custom handlers into a copy of default handlers.
			// Custom handlers defined as plain functions are registered as read-only setters.
			_.each(self.bindingHandlers||{}, function( handler, name ) {
			    handlers[ name ] = isFunction(handler) ? {set: handler} : handler;
			});
			
			// Add native "model" and "collection" data sources:
			self.model = addSourceToContext( self.model, context );
			self.collection = addSourceToContext( self.collection, context );
			
			// Add all additional data sources:
			_.each(sources, function( source, sourceName ) {
				sources[ sourceName ] = addSourceToContext( source, context, sourceName );
			});
			
			// Creates a single element binding:
			function bind( $element, bindings, selector ) {
				// Try to compile bindings, throw errors if encountered:
				try {
					self._bind.push( new EpoxyBinding($element, bindings, context, handlers) );
				} catch( error ) {
					throw( 'Error parsing bindings for "'+ selector +'" >> '+error );
				}
			}
			
			// Create all bindings:
			// bindings are created from an object hash of query/binding declarations,
			// OR based on queried DOM attributes.
			if ( isObject(declarations) ) {
				
				// Object declaration method:
				// {"span.my-element": "text:attribute"}
				
				_.each(declarations, function( bindings, selector ) {
					// Get DOM jQuery reference:
					var $elements = this.$( selector );

					// Include top-level view in bindings search:
					if ( this.$el.is(selector) ) {
						$elements = $elements.add( this.$el );
					}
					
					// Ignore empty DOM queries (without errors):
					if ( $elements.length ) {
						bind( $elements, bindings, selector );
					}
				}, this);
				
			} else {
				
				// DOM attributes declaration method:
				// <span data-bind="text:attribute"></span>
				
				var selector = "["+ declarations +"]";
				var $elements = this.$( selector );

				// Include top-level view in bindings search:
				if ( this.$el.is(selector) ) {
					$elements = $elements.add( this.$el );
				}
				
				// Create bindings for each matched element:
				$elements.each(function( $element ) {
					$element = $(this);
					bind( $element, $element.attr(declarations), selector );
				});
			}
		},
		
		// Disposes of all view bindings:
		removeBindings: function() {
			while( this._bind.length ) {
				this._bind.pop().dispose();
			}
		},
	
		// Backbone.View.remove() override:
		// unbinds the view before performing native removal tasks.
		remove: function() {
			this.removeBindings();
			viewSuper( this, "remove" );
		}
	});
	
	
	// Adds a data source to a view:
	// Data sources are Backbone.Model and Backbone.Collection instances.
	// @param source: a source instance, or a function that returns a source.
	// @param context: the working binding context. All bindings in a view share a context.
	function addSourceToContext( source, context, name ) {
		
		// Ignore missing sources, and invoke non-instances:
		if (!source) return;
		else if (isFunction(source)) source = source();
		
		// Add Backbone.Model source instance:
		if ( isModel(source) ) {
			
			// Establish source prefix:
			var prefix = name ? name+"_" : "";
			
			// Create a table of all model attributes (native and -optionally- observable):
			var attrs = _.extend({}, source.attributes, source.obs||{});
			
			// Create a read-only accessor for the model instance:
			context[ "$"+(name||"model") ] = function() {
				viewMap && viewMap.push([source, "change"]);
				return source;
			};
			
			// Compile all model attributes as accessors within the context:
			_.each(attrs, function(value, attribute) {
				
				// Create named accessor functions:
				// -> Attributes from "view.model" use their normal names.
				// -> Attributes from additional sources are named as "source_attribute".
				context[ prefix+attribute ] = function( value ) {
					
					// Register the attribute to the bindings map, if enabled:
					viewMap && viewMap.push([source, "change:"+attribute]);

					// Set attribute value when accessor is invoked with an argument:
					if ( !isUndefined(value) ) {
						
						// Set Object (non-null, non-array) hashtable value:
						if ( isObject(value) && !isArray(value) ) {
							return source.set( value );
						}
						
						// Set single attribute/value pair:
						return source.set( attribute, value );
					}
					
					// Get the attribute value by default:
					return source.get( attribute );
				};
			});
			
		}
		// Add Backbone.Collection source instance:
		else if ( isCollection(source) ) {
			
			// Create a read-only accessor for the collection instance:
			context[ "$"+(name||"collection") ] = function() {
				viewMap && viewMap.push([source, "reset add remove sort update"]);
				return source;
			};
		}
		
		// Return original object, or newly constructed data source:
		return source;
	}
	
	
	// readAccessor()
	// --------------
	// Reads value from an accessor:
	// Accessors come in three potential forms:
	// => A function to call for the requested value.
	// => An object with a collection of attribute accessors.
	// => A primitive (string, number, boolean, etc).
	// This function unpacks an accessor and returns its underlying value(s).
	function readAccessor( accessor ) {
		
		if ( isFunction(accessor) ) {
			// Accessor is function: return invoked value.
			return accessor();
		}
		else if ( isObject(accessor) ) {
			// Accessor is object: return copy with all attributes read.
			accessor = isArray(accessor) ? accessor.slice() : _.clone(accessor);
			
			_.each(accessor, function( value, key ) {
				accessor[ key ] = readAccessor( value );
			});
		}
		// return formatted value, or pass through primitives:
		return accessor;
	}
	
	
	// Creates a new HTML string for a <select> menu option:
	// used to generate elements for the "options" binding.
	function createSelectOption( option ) {
		
		// Set both label and value as the raw option object by default:
		var label = option;
		var value = option;
		
		// Dig deeper into label/value settings for non-primitive values:
		if ( isObject( option ) ) {
			// Extract a label and value from each object:
			// a model's "get" method is used to access potential observable values.
			label = isModel( option ) ? option.get( "label" ) : option.label;
			value = isModel( option ) ? option.get( "value" ) : option.value;
		}
		
		return "<option value='"+ value +"'>"+ label +"</option>";
	}

	
	// binding handlers
	// ----------------
	var bindingHandlers = {
		// Attribute: write-only. Sets element attributes.
		attr: {
			set: function( $element, value ) {
				$element.attr( value );
			}
		},
		
		// Checked: read-write. Toggles the checked status of a form element.
		checked: {
			get: function( $element, currentValue ) {
				var checked = !!$element.prop( "checked" );
				var value = $element.val();
				
				if ( $element.is(":radio") ) {
					// Radio button: return value directly.
					return value;
					
				} else if ( isArray(currentValue) ) {
					// Checkbox array: add/remove value from list.
					currentValue = currentValue.slice();
					var index = _.indexOf(currentValue, value);

					if ( checked && index < 0 ) {
						currentValue.push( value );
					} else if ( !checked && index > -1 ) {
						currentValue.splice(index, 1);
					}
					return currentValue;
				}
				// Checkbox: return boolean toggle.
				return checked;
			},
			set: function( $element, value ) {
				// Default as loosely-typed boolean:
				var checked = !!value;
				
				if ( $element.is(":radio") ) {
					// Radio button: match checked state to radio value.
					checked = (value == $element.val());
					
				} else if ( isArray(value) ) {
					// Checkbox array: match checked state to checkbox value in array contents.
					checked = _.contains(value, $element.val());
				}
				
				// Set checked property to element:
				$element.prop("checked", checked);
			}
		},
		
		// Class Name: write-only. Toggles a collection of class name definitions.
		classes: {
			set: function( $element, value ) {
				_.each(value, function(enabled, className) {
					$element.toggleClass(className, !!enabled);
				});
			}
		},
		
		// Collection: write-only. Manages a list of views bound to a Backbone.Collection.
		collection: {
			set: function( $element, collection, target ) {
				
				// Requires a valid collection argument with an associated view:
				if ( isCollection(collection) && isFunction(collection.view) ) {
					
					var models = collection.models;
					var views = this.v;
					var view;
					
					// Default target to the bound collection object:
					// during init (or failure), the binding will reset.
					target = target || collection;
					
					if ( isModel(target) ) {
						
						// ADD/REMOVE Event (from a Model):
						// test if view exists within the binding...
						if ( !views.hasOwnProperty(target.cid) ) {
							
							// Add new view:
							views[ target.cid ] = view = new collection.view({model: target});
							var index = _.indexOf(models, target);
							
							// Attempt to add at proper index,
							// otherwise just append into the element.
							if ($element.children().length < index) {
								$element.eq( index ).before( view.$el );
							} else {
								$element.append( view.$el );
							}
							
						} else {
							
							// Remove existing view:
							view = views[ target.cid ];
							view.remove();
							delete views[ target.cid ];
						}
						
					} else if ( isCollection(target) ) {
						
						// SORT/RESET Event (from a Collection):
						// First test if we're sorting...
						// (we have models and all their views are present)
						var sort = models.length && _.every(models, function( model ) {
							return views.hasOwnProperty(model.cid);
						});
						
						// Hide element before manipulating:
						$element.hide();
						
						if ( sort ) {
							// Sort existing views:
							collection.each(function( model ) {
								$element.append( views[model.cid].$el );
							});
							
						} else {
							// Reset with new views:
							this.empty();
							
							collection.each(function( model ) {
								views[ model.cid ] = view = new collection.view({model: model});
								$element.append( view.$el );
							});
						}
						
						// Show element after manipulating:
						$element.show();
					}
					
				} else {
					// Throw error for invalid binding params:
					throw( "Binding 'collection' requires a Collection with a 'view' constructor." );
				}
			}
		},
		
		// CSS: write-only. Sets a collection of CSS styles to an element.
		css: {
			set: function( $element, value ) {
				$element.css( value );
			}
		},

		// Disabled: write-only. Sets the "disabled" status of a form element (true :: disabled).
		disabled: {
			set: function( $element, value ) {
				$element.prop( "disabled", !!value );
			}
		},
		
		// Enabled: write-only. Sets the "disabled" status of a form element (true :: !disabled).
		enabled: {
			set: function( $element, value ) {
				$element.prop( "disabled", !value );
			}
		},
		
		// HTML: write-only. Sets the inner HTML value of an element.
		html: {
			set: function( $element, value ) {
				$element.html( value );
			}
		},
		
		// Options: write-only. Sets option items to a <select> element, then updates the value.
		options: {
			set: function( $element, value ) {
				
				// Pre-compile empty and default option values:
				// both values MUST be accessed, for two reasons:
				// 1) we need to need to guarentee that both values are reached for mapping purposes.
				// 2) we'll need their values anyway to determine their defined/undefined status.
				var optionsEmpty = readAccessor( this.optionsEmpty );
				var optionsDefault = readAccessor( this.optionsDefault );
				var options = isCollection( value ) ? value.models : value;
				
				// If value is a valid array:
				if ( isArray(options) ) {
					
					var selection = $element.val();
					var enabled = true;
					var html = "";
					
					// No options or default, and has an empty options placeholder:
					// display placeholder and disable select menu.
					if ( !options.length && !optionsDefault && optionsEmpty ) {
						html += createSelectOption( optionsEmpty );
						enabled = false;
					}
					// Try to populate default option and options list:
					else {
						
						// Create the default option, if defined:
						if ( optionsDefault ) {
							html += createSelectOption( optionsDefault );
						}
						
						// Create all option items:
						_.each(options, function( option ) {
							html += createSelectOption( option );
						});
					}
					
					// Set new HTML to the element, toggle disabled status, and apply selection:
					$element
						.html( html )
						.prop( "disabled", !enabled )
						.val( selection );
					
					// Test if previous selection state was successfully applied to the new options:
					// if not, then flash the element's "change" event to trigger view-capture bindings. 
					if ( !_.isEqual($element.val(), selection) ) {
						$element.trigger( "change" );
					}

				} else {
					// Invalid array value:
					throw( "Binding 'options' requires a list value." );
				}
			}
		},

		// Text: write-only. Sets the text value of an element.
		text: {
			set: function( $element, value ) {
				$element.text( value );
			}
		},
		
		// Toggle: write-only. Toggles the visibility of an element.
		toggle: {
			set: function( $element, value ) {
				$element.toggle( !!value );
			}
		},
		
		// Value: read-write. Gets and sets the value of a form element.
		value: {
			get: function( $element ) {
				return $element.val();
			},
			set: function( $element, value ) {
				if ( $element.val() != value ) $element.val( value );
			}
		}
	};
	
	
	// binding operators
	// -----------------
	// Operators are special binding handlers that may be invoked while binding;
	// they will return a wrapper function used to modify how accessors are read.
	
	// Partial application wrapper for creating binding operators:
	var makeOperator = function( handler ) {
		return function() {
			var params = arguments;
			return function() {
				return handler( params );
			};
		};
	};
	
	// IMPORTANT:
	// Binding operators must access ALL of their dependent params while running,
	// otherwise accessor params become unreachable and will not provide binding hooks.
	// Therefore, assessment loops must NOT exit early... so do not optimize!
	
	var bindingOperators = {
		// Tests if all of the provided accessors are truthy (and):
		all: makeOperator(function( params ) {
			var result = true;
			for ( var i=0, len=params.length; i < len; i++ ) {
				if ( !readAccessor(params[i]) ) result = false;
			}
			return result;
		}),
	
		// Tests if any of the provided accessors are truthy (or):
		any: makeOperator(function( params ) {
			var result = false;
			for ( var i=0, len=params.length; i < len; i++ ) {
				if ( readAccessor(params[i]) ) result = true;
			}
			return result;
		}),
		
		// Reads the length of the accessed property:
		// assumes accessor value to be an Array or Collection; defaults to 0.
		length: makeOperator(function( params ) {
			return readAccessor( params[0] ).length || 0;
		}),
		
		// Tests if none of the provided accessors are truthy (and not):
		none: makeOperator(function( params ) {
			var result = true;
			for ( var i=0, len=params.length; i < len; i++ ) {
				if ( readAccessor(params[i]) ) result = false;
			}
			return result;
		}),
	
		// Negates an accessor's value:
		not: makeOperator(function( params ) {
			return !readAccessor( params[0] );
		}),
	
		// Formats one or more accessors into a text string:
		// ("$1 $2 did $3", firstName, lastName, action)
		format: makeOperator(function( params ) {
			var str = readAccessor(params[0]);
			
			for ( var i=1, len=params.length; i < len; i++ ) {
				// TODO: need to make something like this work: (?<!\\)\$1
				str = str.replace( new RegExp("\\$"+i, "g"), readAccessor(params[i]) );
			}
			return str;
		}),
		
		// Provides one of two values based on a ternary condition:
		// uses first param (a) as condition, and returns either b (truthy) or c (falsey).
		select: makeOperator(function( params ) {
			var a = readAccessor(params[0]);
			var b = readAccessor(params[1]);
			var c = readAccessor(params[2]);
			return a ? b : c;
		})
	};
	
	
	// Defines special handler params made available to the binding:
	// these params are used by handler functions, but are not actually handlers themselves.
	// Params will be extracted from the binding context and stored directly on the binding.
	var handlerParams = [ "events", "optionsDefault", "optionsEmpty" ];
	
	
	// Epoxy.View -> Binding
	// ---------------------
	// The binding object connects an element to its binding declarations,
	// as applied to the view's compiled binding context and its handler methods.
	var EpoxyBinding = function( $element, bindings, context, handlers ) {
		
		// Store the element, and create namespace for managed subviews:
		this.$el = $element;
		this.v = {}; // << Views namespace for managed subview.
		//this.h = {}; // << Handlers namespace for managed handlers.
				
		// Determine bound element type and its support for two-way bindings:
		var self = this;
		var tag = ($element[0].tagName).toLowerCase();
		var changable = (tag == "input" || tag == "select" || tag == "textarea");
		
		// Construct and invoke parser function:
		// provided declarations string is constructed into a new function body.
		// Parsing is invoked with "operator" and "context" properties made available,
		// and will yeild a native context object with element-specific bindings defined.
		// (Borrows heavily from the Knockout.js method... thank you Steve & the KO team!)
		var parser = new Function("$o", "$c", "with($o){with($c){return{"+ bindings +"}}}");
		bindings = parser( bindingOperators, context );
		
		// Resulting binding now looks like this after parsing:
		// {text: accessorFunct, classes: {active: accessorFunct}}
		
		// Copy all handler params onto the binding while omitting them from the binding context.
		_.each(handlerParams, function( paramName ) {
			self[ paramName ] = bindings[ paramName ];
			delete bindings[ paramName ];
		});
		
		// Format the binding's "events" param:
		// an events array may have been provided in the binding declaration;
		// use all declared DOM events, and merge in a default "change" event trigger.
		// After establishing the events array, format all event names with a ".epoxy" namespace,
		// and then merge all events into a space-separated string for binding with jQuery.
		this.events = _.map( _.union(this.events || [], ["change"]), function(name) {
			return name+".epoxy";
		}).join(" ");
		
		// Apply bindings from native context:
		// this will loop through all binding handlers defined for the object.
		_.each(bindings, function( accessor, handlerName ) {
			
			// Loop through each defined handler attribute,
			// and validate that a handler method with the same name exists:
			if ( handlers.hasOwnProperty(handlerName) ) {
				
				// VALID handler. Proceed with binding...
				
				var handler = handlers[ handlerName ];
				var triggers = [];
				
				// Create reset function for setting the binding's value to the display:
				var reset = function( target ) {
					handler.set.call(self, self.$el, readAccessor(accessor), target);
				};
				
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
				if ( changable && handler.get && isFunction(accessor) ) {
					self.$el.on(self.events, function() {
						accessor( handler.get.call(self, self.$el, readAccessor(accessor)) );
					});
				}
				
				// Configure WRITE/SET-able binding. Requires:
				// => One or more events triggers.
				if ( triggers.length ) {
					for (var i=0, len=triggers.length; i < len; i++) {
						self.listenTo(triggers[i][0], triggers[i][1], reset);
					}
				}
				
			} else {
				// INVALID handler. Abort binding and throw error...
				// this means an invalid/undefined handler was declared,
				// ie: <data-bind="sfoo:attribute"> -- "sfoo" does not exist.
				throw( "invalid binding => "+handlerName );
			}
		});
	};

	_.extend(EpoxyBinding.prototype, Backbone.Events, {
		
		// Empties all stored sub-views from the binding:
		empty: function() {
			for (var id in this.v) {
				if ( this.v.hasOwnProperty(id) ) {
					this.v[ id ].remove();
					delete this.v[ id ];
				}
			}
		},
		
		// Destroys the binding:
		// all events and managed sub-views are killed.
		dispose: function() {
			this.empty();
			this.stopListening();
			this.$el.off( this.events );
			this.$el = null;
		}
	});
	
}).call( this );