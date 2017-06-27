/*! JSON Editor v0.6.14 - JSON Schema -> HTML Editor
 * By Jeremy Dorn - https://github.com/jdorn/json-editor/
 * Released under the MIT license
 *
 * Date: 2014-06-11
 */

/**
 * See README.md for requirements and usage info
 */

(function() {

/*jshint loopfunc: true */
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){postMessage("xyz");}) ? /\b_super\b/ : /.*/;
 
  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    Class.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;
 
    // And make this class extendable
    Class.extend = arguments.callee;
   
    return Class;
  };
})();

// CustomEvent constructor polyfill
// From MDN
(function () {
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || 
                                      window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

var $isplainobject = function( obj ) {
  // Not own constructor property must be Object
  if ( obj.constructor &&
    !obj.hasOwnProperty('constructor') &&
    !obj.constructor.prototype.hasOwnProperty('isPrototypeOf')) {
    return false;
  }

  // Own properties are enumerated firstly, so to speed up,
  // if last one is own, then all properties are own.

  var key;
  for ( key in obj ) {}

  return key === undefined || obj.hasOwnProperty(key);
};

var $extend = function(destination) {
  var source, i,property;
  for(i=1; i<arguments.length; i++) {
    source = arguments[i];
    for (property in source) {
      if(source[property] && $isplainobject(source[property])) {
        destination[property] = destination[property] || {};
        $extend(destination[property], source[property]);
      }
      else {
        destination[property] = source[property];
      }
    }
  }
  return destination;
};

var $each = function(obj,callback) {
  if(!obj) return;
  var i;
  if(typeof obj.length !== 'undefined') {
    for(i=0; i<obj.length; i++) {
      if(callback(i,obj[i])===false) return;
    }
  }
  else {
    for(i in obj) {
      if(!obj.hasOwnProperty(i)) continue;
      if(callback(i,obj[i])===false) return;
    }
  }
};

var $trigger = function(el,event) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(event, true, true);
  el.dispatchEvent(e);
};
var $triggerc = function(el,event) {
  var e = new CustomEvent(event,{
    bubbles: true,
    cancelable: true
  });

  el.dispatchEvent(e);
};

var JSONEditor = function(element,options) {
  options = $extend({},JSONEditor.defaults.options,options||{});
  this.element = element;
  this.options = options;
  this.init();
};
JSONEditor.prototype = {
  init: function() {
    var self = this;
    
    this.ready = false;

    var theme_class = JSONEditor.defaults.themes[this.options.theme || JSONEditor.defaults.theme];
    if(!theme_class) throw "Unknown theme " + (this.options.theme || JSONEditor.defaults.theme);
    
    this.schema = this.options.schema;
    this.theme = new theme_class();
    this.template = this.options.template;
    this.uuid = 0;
    this.__data = {};
    
    var icon_class = JSONEditor.defaults.iconlibs[this.options.iconlib || JSONEditor.defaults.iconlib];
    if(icon_class) this.iconlib = new icon_class();

    this.root_container = this.theme.getContainer();
    this.element.appendChild(this.root_container);

    this.validator = new JSONEditor.Validator(this.schema,{
      ajax: this.options.ajax,
      refs: this.options.refs,
      no_additional_properties: this.options.no_additional_properties,
      required_by_default: this.options.required_by_default
    });
    
    this.validator.ready(function(expanded) {
      if(self.ready) return;
      
      self.schema = expanded;
      
      // Create the root editor
      var editor_class = self.getEditorClass(self.schema);
      self.root = self.createEditor(editor_class, {
        jsoneditor: self,
        schema: self.schema,
        container: self.root_container,
        required: true
      });

      // Starting data
      if(self.options.startval) self.root.setValue(self.options.startval);

      self.validation_results = self.validator.validate(self.root.getValue());
      self.root.showValidationErrors(self.validation_results);
      self.ready = true;

      // Fire ready event asynchronously
      requestAnimationFrame(function() {
        self.validation_results = self.validator.validate(self.root.getValue());
        self.root.showValidationErrors(self.validation_results);
        self.trigger('ready');
        self.trigger('change');
      });
    });
  },
  getValue: function() {
    if(!this.ready) throw "JSON Editor not ready yet.  Listen for 'ready' event before getting the value";

    return this.root.getValue();
  },
  setValue: function(value) {
    if(!this.ready) throw "JSON Editor not ready yet.  Listen for 'ready' event before setting the value";

    this.root.setValue(value);
    return this;
  },
  validate: function(value) {
    if(!this.ready) throw "JSON Editor not ready yet.  Listen for 'ready' event before validating";
    
    // Custom value
    if(arguments.length === 1) {
      return this.validator.validate(value);
    }
    // Current value (use cached result)
    else {
      return this.validation_results;
    }
  },
  destroy: function() {
    if(this.destroyed) return;
    if(!this.ready) return;
    
    this.schema = null;
    this.options = null;
    this.root.destroy();
    this.root = null;
    this.root_container = null;
    this.validator = null;
    this.validation_results = null;
    this.theme = null;
    this.iconlib = null;
    this.template = null;
    this.__data = null;
    this.ready = false;
    this.element.innerHTML = '';
    
    this.destroyed = true;
  },
  on: function(event, callback) {
    this.callbacks = this.callbacks || {};
    this.callbacks[event] = this.callbacks[event] || [];
    this.callbacks[event].push(callback);
  },
  off: function(event, callback) {
    // Specific callback
    if(event && callback) {
      this.callbacks = this.callbacks || {};
      this.callbacks[event] = this.callbacks[event] || [];
      var newcallbacks = [];
      for(var i=0; i<this.callbacks[event].length; i++) {
        if(this.callbacks[event][i]===callback) continue;
        newcallbacks.push(this.callbacks[event][i]);
      }
      this.callbacks[event] = newcallbacks;
    }
    // All callbacks for a specific event
    else if(event) {
      this.callbacks = this.callbacks || {};
      this.callbacks[event] = [];
    }
    // All callbacks for all events
    else {
      this.callbacks = {};
    }
  },
  trigger: function(event) {
    if(this.callbacks && this.callbacks[event] && this.callbacks[event].length) {
      for(var i=0; i<this.callbacks[event].length; i++) {
        this.callbacks[event][i]();
      }
    }
  },
  getEditorClass: function(schema, editor) {
    var classname;

    $each(JSONEditor.defaults.resolvers,function(i,resolver) {
      var tmp = resolver(schema);
      if(tmp) {
        if(JSONEditor.defaults.editors[tmp]) {
          classname = tmp;
          return false;
        }
      }
    });

    if(!classname) throw "Unknown editor for schema "+JSON.stringify(schema);
    if(!JSONEditor.defaults.editors[classname]) throw "Unknown editor "+classname;

    return JSONEditor.defaults.editors[classname];
  },
  createEditor: function(editor_class, options) {
    options = $extend({},editor_class.options||{},options);
    return new editor_class(options);
  },
  onChange: function() {
    if(!this.ready) return;
    
    if(this.firing_change) return;
    this.firing_change = true;
    
    var self = this;
    
    requestAnimationFrame(function() {
      self.firing_change = false;
      
      // Validate and cache results
      self.validation_results = self.validator.validate(self.root.getValue());
      self.root.showValidationErrors(self.validation_results);
      
      // Fire change event
      self.trigger('change');
    });
  },
  compileTemplate: function(template, name) {
    name = name || JSONEditor.defaults.template;

    var engine;

    // Specifying a preset engine
    if(typeof name === 'string') {
      if(!JSONEditor.defaults.templates[name]) throw "Unknown template engine "+name;
      engine = JSONEditor.defaults.templates[name]();

      if(!engine) throw "Template engine "+name+" missing required library.";
    }
    // Specifying a custom engine
    else {
      engine = name;
    }

    if(!engine) throw "No template engine set";
    if(!engine.compile) throw "Invalid template engine set";

    return engine.compile(template);
  },
  _data: function(el,key,value) {
    // Setting data
    if(arguments.length === 3) {
      var uuid;
      if(el.hasAttribute('data-jsoneditor-'+key)) {
        uuid = el.getAttribute('data-jsoneditor-'+key);
      }
      else {
        uuid = this.uuid++;
        el.setAttribute('data-jsoneditor-'+key,uuid);
      }

      this.__data[uuid] = value;
    }
    // Getting data
    else {
      // No data stored
      if(!el.hasAttribute('data-jsoneditor-'+key)) return null;
      
      return this.__data[el.getAttribute('data-jsoneditor-'+key)];
    }
  },
  registerEditor: function(editor) {
    this.editors = this.editors || {};
    this.editors[editor.path] = editor;
    return this;
  },
  unregisterEditor: function(editor) {
    this.editors = this.editors || {};
    this.editors[editor.path] = null;
    return this;
  },
  getEditor: function(path) {
    if(!this.editors) return;
    return this.editors[path];
  },
  watch: function(path,callback) {
    this.watchlist = this.watchlist || {};
    this.watchlist[path] = this.watchlist[path] || [];
    this.watchlist[path].push(callback);
    
    return this;
  },
  unwatch: function(path,callback) {
    if(!this.watchlist || !this.watchlist[path]) return this;
    // If removing all callbacks for a path
    if(!callback) {
      this.watchlist[path] = null;
      return this;
    }
    
    var newlist = [];
    for(var i=0; i<this.watchlist[path].length; i++) {
      if(this.watchlist[path][i] === callback) continue;
      else newlist.push(this.watchlist[path][i]);
    }
    this.watchlist[path] = newlist.length? newlist : null;
    return this;
  },
  notifyWatchers: function(path) {
    if(!this.watchlist || !this.watchlist[path]) return this;
    for(var i=0; i<this.watchlist[path].length; i++) {
      this.watchlist[path][i]();
    }
  },
  isEnabled: function() {
    return !this.root || this.root.isEnabled();
  },
  enable: function() {
    this.root.enable();
  },
  disable: function() {
    this.root.disable();
  }
};

JSONEditor.defaults = {
  themes: {},
  templates: {},
  iconlibs: {},
  editors: {},
  resolvers: [],
  custom_validators: []
};

JSONEditor.Validator = Class.extend({
  init: function(schema, options) {
    this.original_schema = schema;
    this.options = options || {};
    this.refs = this.options.refs || {};

    this.ready_callbacks = [];

    if(this.options.ready) this.ready(this.options.ready);
    // Store any $ref and definitions
    this.getRefs();
  },
  ready: function(callback) {
    if(this.is_ready) callback.apply(this,[this.expanded]);
    else {
      this.ready_callbacks.push(callback);
    }

    return this;
  },
  getRefs: function() {
    var self = this;
    this._getRefs(this.original_schema, function(schema) {
      self.schema = schema;
      self.expanded = self.expandSchema(self.schema);

      self.is_ready = true;
      $each(self.ready_callbacks,function(i,callback) {
        callback.apply(self,[self.expanded]);
      });
    });
  },
  _getRefs: function(schema,callback) {
    var self = this;
    var is_root = schema === this.original_schema;

    var waiting, finished, check_if_finished, called;

    // Work on a deep copy of the schema
    schema = $extend({},schema);

    // First expand out any definition in the root node
    if(is_root && schema.definitions) {
      var defs = schema.definitions;
      delete schema.definitions;

      waiting = finished = 0;
      check_if_finished = function(schema) {
        if(finished >= waiting) {
          if(called) return;
          called = true;
          self._getRefs(schema,callback);
        }
      };

      $each(defs,function() {
        waiting++;
      });

      if(waiting) {
        $each(defs,function(i,definition) {
          // Expand the definition recursively
          self._getRefs(definition,function(def_schema) {
            self.refs['#/definitions/'+i] = def_schema;
            finished++;
            check_if_finished(schema);
          });
        });
      }
      else {
        check_if_finished(schema);
      }
    }
    // Expand out any references
    else if(schema.$ref) {
      var ref = schema.$ref;
      delete schema.$ref;

      // If we're currently loading this external reference, wait for it to be done
      if(self.refs[ref] && self.refs[ref] instanceof Array) {
        self.refs[ref].push(function() {
          schema = $extend({},self.refs[ref],schema);
          callback(schema);
        });
      }
      // If this reference has already been loaded
      else if(self.refs[ref]) {
        schema = $extend({},self.refs[ref],schema);
        callback(schema);
      }
      // Otherwise, it needs to be loaded via ajax
      else {
        if(!self.options.ajax) throw "Must set ajax option to true to load external url "+ref;
      
        var r = new XMLHttpRequest(); 
        r.open("GET", ref, true);
        r.onreadystatechange = function () {
          if (r.readyState != 4) return; 
          if(r.status === 200) {
            var response = JSON.parse(r.responseText);
            self.refs[ref] = [];

            // Recursively expand this schema
            self._getRefs(response, function(ref_schema) {
              var list = self.refs[ref];
              self.refs[ref] = ref_schema;
              schema = $extend({},self.refs[ref],schema);
              callback(schema);

              // If anything is waiting on this to load
              $each(list,function(i,v) {
                v();
              });
            });
            return;
          }
          
          // Request failed
          throw "Failed to fetch ref via ajax- "+ref;
        };
        r.send();
      }
    }
    // Expand out any subschemas
    else {
      waiting = finished = 0;
      check_if_finished = function(schema) {
        if(finished >= waiting) {
          if(called) return;
          called = true;

          callback(schema);
        }
      };

      $each(schema, function(key, value) {
        // Arrays that need to be expanded
        if(typeof value === "object" && value && value instanceof Array) {
          $each(value,function(j,item) {
            if(typeof item === "object" && item && !(item instanceof Array)) {
              waiting++;
            }
          });
        }
        // Objects that need to be expanded
        else if(typeof value === "object" && value) {
          waiting++;
        }
      });

      if(waiting) {
        $each(schema, function(key, value) {
          // Arrays that need to be expanded
          if(typeof value === "object" && value && value instanceof Array) {
            $each(value,function(j,item) {
              if(typeof item === "object" && item && !(item instanceof Array)) {
                self._getRefs(item,function(expanded) {
                  schema[key][j] = expanded;

                  finished++;
                  check_if_finished(schema);
                });
              }
            });
          }
          // Objects that need to be expanded
          else if(typeof value === "object" && value) {
            self._getRefs(value,function(expanded) {
              schema[key] = expanded;

              finished++;
              check_if_finished(schema);
            });
          }
        });
      }
      else {
        check_if_finished(schema);
      }
    }
  },
  validate: function(value) {
    return this._validateSchema(this.schema, value);
  },
  _validateSchema: function(schema,value,path) {
    var errors = [];
    var valid, i, j;
    var stringified = JSON.stringify(value);

    path = path || 'root';

    // Work on a copy of the schema
    schema = $extend({},schema);

    /*
     * Type Agnostic Validation
     */

    // Version 3 `required`
    if(schema.required && schema.required === true) {
      if(typeof value === "undefined") {
        errors.push({
          path: path,
          property: 'required',
          message: 'Property must be set'
        });

        // Can't do any more validation at this point
        return errors;
      }
    }
    // Value not defined
    else if(typeof value === "undefined") {
      // If required_by_default is set, all fields are required
      if(this.options.required_by_default) {
        errors.push({
          path: path,
          property: 'required',
          message: 'Property must be set'
        });
      }
      // Not required, no further validation needed
      else {
        return errors;
      }
    }

    // `enum`
    if(schema.enum) {
      valid = false;
      for(i=0; i<schema.enum.length; i++) {
        if(stringified === JSON.stringify(schema.enum[i])) valid = true;
      }
      if(!valid) {
        errors.push({
          path: path,
          property: 'enum',
          message: 'Value must be one of the enumerated values'
        });
      }
    }

    // `extends` (version 3)
    if(schema.extends) {
      for(i=0; i<schema.extends.length; i++) {
        errors = errors.concat(this._validateSchema(schema.extends[i],value,path));
      }
    }

    // `allOf`
    if(schema.allOf) {
      for(i=0; i<schema.allOf.length; i++) {
        errors = errors.concat(this._validateSchema(schema.allOf[i],value,path));
      }
    }

    // `anyOf`
    if(schema.anyOf) {
      valid = false;
      for(i=0; i<schema.anyOf.length; i++) {
        if(!this._validateSchema(schema.anyOf[i],value,path).length) {
          valid = true;
          break;
        }
      }
      if(!valid) {
        errors.push({
          path: path,
          property: 'anyOf',
          message: 'Value must validate against at least one of the provided schemas'
        });
      }
    }

    // `oneOf`
    if(schema.oneOf) {
      valid = 0;
      var oneof_errors = [];
      for(i=0; i<schema.oneOf.length; i++) {
        // Set the error paths to be path.oneOf[i].rest.of.path
        var tmp = this._validateSchema(schema.oneOf[i],value,path);
        if(!tmp.length) {
          valid++;
        }

        for(j=0; j<tmp.length; j++) {
          tmp[j].path = path+'.oneOf['+i+']'+tmp[j].path.substr(path.length);
        }
        oneof_errors = oneof_errors.concat(tmp);

      }
      if(valid !== 1) {
        errors.push({
          path: path,
          property: 'oneOf',
          message: 'Value must validate against exactly one of the provided schemas. '+
            'It currently validates against '+valid+' of the schemas.'
        });
        errors = errors.concat(oneof_errors);
      }
    }

    // `not`
    if(schema.not) {
      if(!this._validateSchema(schema.not,value,path).length) {
        errors.push({
          path: path,
          property: 'not',
          message: 'Value must not validate against the provided schema'
        });
      }
    }

    // `type` (both Version 3 and Version 4 support)
    if(schema.type) {
      // Union type
      if(schema.type instanceof Array) {
        valid = false;
        for(i=0;i<schema.type.length;i++) {
          if(this._checkType(schema.type[i], value)) {
            valid = true;
            break;
          }
        }
        if(!valid) {
          errors.push({
            path: path,
            property: 'type',
            message: 'Value must be one of the provided types'
          });
        }
      }
      // Simple type
      else {
        if(!this._checkType(schema.type, value)) {
          errors.push({
            path: path,
            property: 'type',
            message: 'Value must be of type '+schema.type
          });
        }
      }
    }


    // `disallow` (version 3)
    if(schema.disallow) {
      // Union type
      if(schema.disallow instanceof Array) {
        valid = true;
        for(i=0;i<schema.disallow.length;i++) {
          if(this._checkType(schema.disallow[i], value)) {
            valid = false;
            break;
          }
        }
        if(!valid) {
          errors.push({
            path: path,
            property: 'disallow',
            message: 'Value must not be one of the provided disallowed types'
          });
        }
      }
      // Simple type
      else {
        if(this._checkType(schema.disallow, value)) {
          errors.push({
            path: path,
            property: 'disallow',
            message: 'Value must not be of type '+schema.disallow
          });
        }
      }
    }

    /*
     * Type Specific Validation
     */

    // Number Specific Validation
    if(typeof value === "number") {
      // `multipleOf` and `divisibleBy`
      if(schema.multipleOf || schema.divisibleBy) {
        valid = value / (schema.multipleOf || schema.divisibleBy);
        if(valid !== Math.floor(valid)) {
          errors.push({
            path: path,
            property: schema.multipleOf? 'multipleOf' : 'divisibleBy',
            message: 'Value must be a multiple of '+(schema.multipleOf || schema.divisibleBy)
          });
        }
      }

      // `maximum`
      if(schema.maximum) {
        if(schema.exclusiveMaximum && value >= schema.maximum) {
          errors.push({
            path: path,
            property: 'maximum',
            message: 'Value must be less than '+schema.maximum
          });
        }
        else if(!schema.exclusiveMaximum && value > schema.maximum) {
          errors.push({
            path: path,
            property: 'maximum',
            message: 'Value must be at most '+schema.maximum
          });
        }
      }

      // `minimum`
      if(schema.minimum) {
        if(schema.exclusiveMinimum && value <= schema.minimum) {
          errors.push({
            path: path,
            property: 'minimum',
            message: 'Value must be greater than '+schema.minimum
          });
        }
        else if(!schema.exclusiveMinimum && value < schema.minimum) {
          errors.push({
            path: path,
            property: 'minimum',
            message: 'Value must be at least '+schema.minimum
          });
        }
      }
    }
    // String specific validation
    else if(typeof value === "string") {
      // `maxLength`
      if(schema.maxLength) {
        if((value+"").length > schema.maxLength) {
          errors.push({
            path: path,
            property: 'maxLength',
            message: 'Value must be at most '+schema.maxLength+' characters long'
          });
        }
      }

      // `minLength`
      if(schema.minLength) {
        if((value+"").length < schema.minLength) {
          errors.push({
            path: path,
            property: 'minLength',
            message: 'Value must be at least '+schema.minLength+' characters long'
          });
        }
      }

      // `pattern`
      if(schema.pattern) {
        if(!(new RegExp(schema.pattern)).test(value)) {
          errors.push({
            path: path,
            property: 'pattern',
            message: 'Value must match the provided pattern'
          });
        }
      }
    }
    // Array specific validation
    else if(typeof value === "object" && value !== null && value instanceof Array) {
      // `items` and `additionalItems`
      if(schema.items) {
        // `items` is an array
        if(schema.items instanceof Array) {
          for(i=0; i<value.length; i++) {
            // If this item has a specific schema tied to it
            // Validate against it
            if(schema.items[i]) {
              errors = errors.concat(this._validateSchema(schema.items[i],value[i],path+'.'+i));
            }
            // If all additional items are allowed
            else if(schema.additionalItems === true) {
              break;
            }
            // If additional items is a schema
            // TODO: Incompatibility between version 3 and 4 of the spec
            else if(schema.additionalItems) {
              errors = errors.concat(this._validateSchema(schema.additionalItems,value[i],path+'.'+i));
            }
            // If no additional items are allowed
            else if(schema.additionalItems === false) {
              errors.push({
                path: path,
                property: 'additionalItems',
                message: 'No additional items allowed in this array'
              });
              break;
            }
            // Default for `additionalItems` is an empty schema
            else {
              break;
            }
          }
        }
        // `items` is a schema
        else {
          // Each item in the array must validate against the schema
          for(i=0; i<value.length; i++) {
            errors = errors.concat(this._validateSchema(schema.items,value[i],path+'.'+i));
          }
        }
      }

      // `maxItems`
      if(schema.maxItems) {
        if(value.length > schema.maxItems) {
          errors.push({
            path: path,
            property: 'maxItems',
            message: 'Value must have at most '+schema.maxItems+' items'
          });
        }
      }

      // `minItems`
      if(schema.minItems) {
        if(value.length < schema.minItems) {
          errors.push({
            path: path,
            property: 'minItems',
            message: 'Value must have at least '+schema.minItems+' items'
          });
        }
      }

      // `uniqueItems`
      if(schema.uniqueItems) {
        var seen = {};
        for(i=0; i<value.length; i++) {
          valid = JSON.stringify(value[i]);
          if(seen[valid]) {
            errors.push({
              path: path,
              property: 'uniqueItems',
              message: 'Array must have unique items'
            });
            break;
          }
          seen[valid] = true;
        }
      }
    }
    // Object specific validation
    else if(typeof value === "object" && value !== null) {
      // `maxProperties`
      if(schema.maxProperties) {
        valid = 0;
        for(i in value) {
          if(!value.hasOwnProperty(i)) continue;
          valid++;
        }
        if(valid > schema.maxProperties) {
          errors.push({
            path: path,
            property: 'maxProperties',
            message: 'Object must have at most '+schema.maxProperties+' properties'
          });
        }
      }

      // `minProperties`
      if(schema.minProperties) {
        valid = 0;
        for(i in value) {
          if(!value.hasOwnProperty(i)) continue;
          valid++;
        }
        if(valid < schema.minProperties) {
          errors.push({
            path: path,
            property: 'minProperties',
            message: 'Object must have at least '+schema.minProperties+' properties'
          });
        }
      }

      // Version 4 `required`
      if(schema.required && schema.required instanceof Array) {
        for(i=0; i<schema.required.length; i++) {
          if(typeof value[schema.required[i]] === "undefined") {
            errors.push({
              path: path,
              property: 'required',
              message: 'Object is missing the required property '+schema.required[i]
            });
          }
        }
      }

      // `properties`
      var validated_properties = {};
      if(schema.properties) {
        for(i in schema.properties) {
          if(!schema.properties.hasOwnProperty(i)) continue;
          validated_properties[i] = true;
          errors = errors.concat(this._validateSchema(schema.properties[i],value[i],path+'.'+i));
        }
      }

      // `patternProperties`
      if(schema.patternProperties) {
        for(i in schema.patternProperties) {
          if(!schema.patternProperties.hasOwnProperty(i)) continue;

          var regex = new RegExp(i);

          // Check which properties match
          for(j in value) {
            if(!value.hasOwnProperty(j)) continue;
            if(regex.test(j)) {
              validated_properties[j] = true;
              errors = errors.concat(this._validateSchema(schema.patternProperties[i],value[j],path+'.'+j));
            }
          }
        }
      }

      // The no_additional_properties option currently doesn't work with extended schemas that use oneOf or anyOf
      if(typeof schema.additionalProperties === "undefined" && this.options.no_additional_properties && !schema.oneOf && !schema.anyOf) {
        schema.additionalProperties = false;
      }

      // `additionalProperties`
      if(typeof schema.additionalProperties !== "undefined") {
        for(i in value) {
          if(!value.hasOwnProperty(i)) continue;
          if(!validated_properties[i]) {
            // No extra properties allowed
            if(!schema.additionalProperties) {
              errors.push({
                path: path,
                property: 'additionalProperties',
                message: 'No additional properties allowed, but property '+i+' is set'
              });
              break;
            }
            // Allowed
            else if(schema.additionalProperties === true) {
              break;
            }
            // Must match schema
            // TODO: incompatibility between version 3 and 4 of the spec
            else {
              errors = errors.concat(this._validateSchema(schema.additionalProperties,value[i],path+'.'+i));
            }
          }
        }
      }

      // `dependencies`
      if(schema.dependencies) {
        for(i in schema.dependencies) {
          if(!schema.dependencies.hasOwnProperty(i)) continue;

          // Doesn't need to meet the dependency
          if(typeof value[i] === "undefined") continue;

          // Property dependency
          if(schema.dependencies[i] instanceof Array) {
            for(j=0; j<schema.dependencies[i].length; j++) {
              if(typeof value[schema.dependencies[i][j]] === "undefined") {
                errors.push({
                  path: path,
                  property: 'dependencies',
                  message: 'Must have property '+schema.dependencies[i][j]
                });
              }
            }
          }
          // Schema dependency
          else {
            errors = errors.concat(this._validateSchema(schema.dependencies[i],value,path));
          }
        }
      }
    }

    // Custom type validation
    $each(JSONEditor.defaults.custom_validators,function(i,validator) {
      errors = errors.concat(validator(schema,value,path));
    });

    return errors;
  },
  _checkType: function(type, value) {
    // Simple types
    if(typeof type === "string") {
      if(type==="string") return typeof value === "string";
      else if(type==="number") return typeof value === "number";
      else if(type==="integer") return typeof value === "number" && value === Math.floor(value);
      else if(type==="boolean") return typeof value === "boolean";
      else if(type==="array") return value instanceof Array;
      else if(type === "object") return value !== null && !(value instanceof Array) && typeof value === "object";
      else if(type === "null") return value === null;
      else return true;
    }
    // Schema
    else {
      return !this._validateSchema(type,value).length;
    }
  },
  expandSchema: function(schema) {
    var self = this;
    var extended = schema;
    var i;

    // Version 3 `type`
    if(typeof schema.type === 'object') {
      // Array of types
      if(schema.type instanceof Array) {
        $each(schema.type, function(key,value) {
          // Schema
          if(typeof value === 'object') {
            schema.type[key] = self.expandSchema(value);
          }
        });
      }
      // Schema
      else {
        schema.type = self.expandSchema(schema.type);
      }
    }
    // Version 3 `disallow`
    if(typeof schema.disallow === 'object') {
      // Array of types
      if(schema.disallow instanceof Array) {
        $each(schema.disallow, function(key,value) {
          // Schema
          if(typeof value === 'object') {
            schema.disallow[key] = self.expandSchema(value);
          }
        });
      }
      // Schema
      else {
        schema.disallow = self.expandSchema(schema.disallow);
      }
    }
    // Version 4 `anyOf`
    if(schema.anyOf) {
      $each(schema.anyOf, function(key,value) {
        schema.anyOf[key] = self.expandSchema(value);
      });
    }
    // Version 4 `dependencies` (schema dependencies)
    if(schema.dependencies) {
      $each(schema.dependencies,function(key,value) {
        if(typeof value === "object" && !(value instanceof Array)) {
          schema.dependencies[key] = self.expandSchema(value);
        }
      });
    }
    // `items`
    if(schema.items) {
      // Array of items
      if(schema.items instanceof Array) {
        $each(schema.items, function(key,value) {
          // Schema
          if(typeof value === 'object') {
            schema.items[key] = self.expandSchema(value);
          }
        });
      }
      // Schema
      else {
        schema.items = self.expandSchema(schema.items);
      }
    }
    // `properties`
    if(schema.properties) {
      $each(schema.properties,function(key,value) {
        if(typeof value === "object" && !(value instanceof Array)) {
          schema.properties[key] = self.expandSchema(value);
        }
      });
    }
    // `patternProperties`
    if(schema.patternProperties) {
      $each(schema.patternProperties,function(key,value) {
        if(typeof value === "object" && !(value instanceof Array)) {
          schema.patternProperties[key] = self.expandSchema(value);
        }
      });
    }
    // Version 4 `not`
    if(schema.not) {
      schema.not = this.expandSchema(schema.not);
    }
    // `additionalProperties`
    if(schema.additionalProperties && typeof schema.additionalProperties === "object") {
      schema.additionalProperties = self.expandSchema(schema.additionalProperties);
    }
    // `additionalItems`
    if(schema.additionalItems && typeof schema.additionalItems === "object") {
      schema.additionalItems = self.expandSchema(schema.additionalItems);
    }

    // allOf schemas should be merged into the parent
    if(schema.allOf) {
      for(i=0; i<schema.allOf.length; i++) {
        extended = this.extend(extended,this.expandSchema(schema.allOf[i]));
      }
      delete extended.allOf;
    }
    // extends schemas should be merged into parent
    if(schema.extends) {
      // If extends is a schema
      if(!(schema.extends instanceof Array)) {
        extended = this.extend(extended,this.expandSchema(schema.extends));
      }
      // If extends is an array of schemas
      else {
        for(i=0; i<schema.extends.length; i++) {
          extended = this.extend(extended,this.expandSchema(schema.extends[i]));
        }
      }
      delete extended.extends;
    }
    // parent should be merged into oneOf schemas
    if(schema.oneOf) {
      var tmp = $extend({},extended);
      delete tmp.oneOf;
      for(i=0; i<schema.oneOf.length; i++) {
        extended.oneOf[i] = this.extend(this.expandSchema(schema.oneOf[i]),tmp);
      }
    }

    return extended;
  },
  extend: function(obj1, obj2) {
    obj1 = $extend({},obj1);
    obj2 = $extend({},obj2);

    var self = this;
    var extended = {};
    $each(obj1, function(prop,val) {
      // If this key is also defined in obj2, merge them
      if(typeof obj2[prop] !== "undefined") {
        // Required arrays should be unioned together
        if(prop === 'required' && typeof val === "object" && val instanceof Array) {
          // Union arrays and unique
          extended.required = val.concat(obj2[prop]).reduce(function(p, c) {
            if (p.indexOf(c) < 0) p.push(c);
            return p;
          }, []);
        }
        // Type should be intersected and is either an array or string
        else if(prop === 'type') {
          // Make sure we're dealing with arrays
          if(typeof val !== "object") val = [val];
          if(typeof obj2.type !== "object") obj2.type = [obj2.type];


          extended.type = val.filter(function(n) {
            return obj2.type.indexOf(n) !== -1;
          });

          // If there's only 1 type and it's a primitive, use a string instead of array
          if(extended.type.length === 1 && typeof extended.type[0] === "string") {
            extended.type = extended.type[0];
          }
        }
        // All other arrays should be intersected (enum, etc.)
        else if(typeof val === "object" && val instanceof Array){
          extended[prop] = val.filter(function(n) {
            return obj2[prop].indexOf(n) !== -1;
          });
        }
        // Objects should be recursively merged
        else if(typeof val === "object" && val !== null) {
          extended[prop] = self.extend(val,obj2[prop]);
        }
        // Otherwise, use the first value
        else {
          extended[prop] = val;
        }
      }
      // Otherwise, just use the one in obj1
      else {
        extended[prop] = val;
      }
    });
    // Properties in obj2 that aren't in obj1
    $each(obj2, function(prop,val) {
      if(typeof obj1[prop] === "undefined") {
        extended[prop] = val;
      }
    });

    return extended;
  }
});

/**
 * All editors should extend from this class
 */
JSONEditor.AbstractEditor = Class.extend({
  fireChangeHeaderEvent: function() {
    $triggerc(this.container,'change_header_text');
  },
  onChildEditorChange: function(editor) {
    if(!this.watch_listener) return;
    this.watch_listener();
    this.jsoneditor.notifyWatchers(this.path);
    if(this.parent) this.parent.onChildEditorChange(this);
    else this.jsoneditor.onChange();
  },
  register: function() {
    this.jsoneditor.registerEditor(this);
  },
  unregister: function() {
    if(!this.jsoneditor) return;
    this.jsoneditor.unregisterEditor(this);
  },
  getNumColumns: function() {
    return 12;
  },
  init: function(options) {
    var self = this;
    this.container = options.container;
    this.jsoneditor = options.jsoneditor;

    this.theme = this.jsoneditor.theme;
    this.template_engine = this.jsoneditor.template;
    this.iconlib = this.jsoneditor.iconlib;

    this.options = $extend({}, (this.options || {}), (options.schema.options || {}), options);
    this.schema = this.options.schema;

    if(!options.path && !this.schema.id) this.schema.id = 'root';
    this.path = options.path || 'root';
    this.formname = options.formname || this.path.replace(/\.([^.]+)/g,'[$1]');
    if(this.jsoneditor.options.form_name_root) this.formname = this.formname.replace(/^root\[/,this.jsoneditor.options.form_name_root+'[');
    if(this.schema.id) this.container.setAttribute('data-schemaid',this.schema.id);
    if(this.schema.type && typeof this.schema.type === "string") this.container.setAttribute('data-schematype',this.schema.type);
    this.container.setAttribute('data-schemapath',this.path);
    this.jsoneditor._data(this.container,'editor',this);

    this.key = this.path.split('.').pop();
    this.parent = options.parent;
    this.link_watchers = [];
    
    this.register();
    
    // If not required, add an add/remove property link
    if(!this.isRequired() && !this.options.compact && false) {
      this.title_links = this.theme.getFloatRightLinkHolder();
      this.container.appendChild(this.title_links);

      this.addremove = this.theme.getLink('remove '+this.getTitle());
      this.title_links.appendChild(this.addremove);

      this.addremove.addEventListener('click',function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Don't allow changing the properties when disabled
        if(self.disabled) return;
        
        if(self.property_removed) {
          self.addProperty();
        }
        else {
          self.removeProperty();
        }
      
        if(self.parent) self.parent.onChildEditorChange(self);
        else self.jsoneditor.onChange();
      });
    }
    
    // Watched fields
    this.watched = {};
    if(this.schema.vars) this.schema.watch = this.schema.vars;
    this.watched_values = {};
    this.watch_listener = function() {
      if(self.refreshWatchedFieldValues()) {
        self.onWatchedFieldChange();
      }
    };
    if(this.schema.watch) {
      var path,path_parts,first,root,adjusted_path;

      for(var name in this.schema.watch) {
        if(!this.schema.watch.hasOwnProperty(name)) continue;
        path = this.schema.watch[name];

        if(path instanceof Array) {
          path_parts = [path[0]].concat(path[1].split('.'));
        }
        else {
          path_parts = path.split('.');
          if(!self.theme.closest(self.container,'[data-schemaid="'+path_parts[0]+'"]')) path_parts.unshift('#');
        }
        first = path_parts.shift();

        if(first === '#') first = self.jsoneditor.schema.id || 'root';

        // Find the root node for this template variable
        root = self.theme.closest(self.container,'[data-schemaid="'+first+'"]');
        if(!root) throw "Could not find ancestor node with id "+first;

        // Keep track of the root node and path for use when rendering the template
        adjusted_path = root.getAttribute('data-schemapath') + '.' + path_parts.join('.');
        
        self.jsoneditor.watch(adjusted_path,self.watch_listener);
        
        self.watched[name] = adjusted_path;
      }
    }
    
    // Dynamic header
    if(this.schema.headerTemplate) {
      this.header_template = this.jsoneditor.compileTemplate(this.schema.headerTemplate, this.template_engine);
    }

    this.build();
    
    // Add links
    if(!this.no_link_holder) {
      this.link_holder = this.theme.getLinksHolder();
      this.container.appendChild(this.link_holder);
      if(this.schema.links) {
        for(var i=0; i<this.schema.links.length; i++) {
          this.addLink(this.getLink(this.schema.links[i]));
        }
      }
    }
    
    this.setValue(this.getDefault(), true);
    this.updateHeaderText();
    this.watch_listener();
  },
  getButton: function(text, icon, title) {
    var btnClass = 'json-editor-btn-'+icon;
    if(!this.iconlib) icon = null;
    else icon = this.iconlib.getIcon(icon);
    
    if(!icon && title) {
      text = title;
      title = null;
    }
    
    var btn = this.theme.getButton(text, icon, title);
    btn.className += ' ' + btnClass + ' ';
    return btn;
  },
  setButtonText: function(button, text, icon, title) {
    if(!this.iconlib) icon = null;
    else icon = this.iconlib.getIcon(icon);
    
    if(!icon && title) {
      text = title;
      title = null;
    }
    
    return this.theme.setButtonText(button, text, icon, title);
  },
  addLink: function(link) {
    if(this.link_holder) this.link_holder.appendChild(link);
  },
  getLink: function(data) {
    var holder, link;
        
    // Get mime type of the link
    var mime = data.mediaType || 'application/javascript';
    var type = mime.split('/')[0];
    
    // Template to generate the link href
    var href = this.jsoneditor.compileTemplate(data.href,this.template_engine);
    
    // Image links
    if(type === 'image') {
      holder = this.theme.getBlockLinkHolder();
      link = document.createElement('a');
      link.setAttribute('target','_blank');
      var image = document.createElement('img');
      
      this.theme.createImageLink(holder,link,image);
    
      // When a watched field changes, update the url  
      this.link_watchers.push(function(vars) {
        var url = href(vars);
        link.setAttribute('href',url);
        link.setAttribute('title',data.rel || url);
        image.setAttribute('src',url);
      });
    }
    // Audio/Video links
    else if(['audio','video'].indexOf(type) >=0) {
      holder = this.theme.getBlockLinkHolder();
      
      link = this.theme.getBlockLink();
      link.setAttribute('target','_blank');
      
      var media = document.createElement(type);
      media.setAttribute('controls','controls');
      
      this.theme.createMediaLink(holder,link,media);
      
      // When a watched field changes, update the url  
      this.link_watchers.push(function(vars) {
        var url = href(vars);
        link.setAttribute('href',url);
        link.textContent = data.rel || url;
        media.setAttribute('src',url);
      });
    }
    // Text links
    else {
      holder = this.theme.getBlockLink();
      holder.setAttribute('target','_blank');
      holder.textContent = data.rel;
      
      // When a watched field changes, update the url  
      this.link_watchers.push(function(vars) {
        var url = href(vars);
        holder.setAttribute('href',url);
        holder.textContent = data.rel || url;
      });
    }
    
    return holder;
  },
  refreshWatchedFieldValues: function() {
    if(!this.watched_values) return;
    var watched = {};
    var changed = false;
    var self = this;
    
    if(this.watched) {
      var val,editor;
      for(var name in this.watched) {
        if(!this.watched.hasOwnProperty(name)) continue;
        editor = self.jsoneditor.getEditor(this.watched[name]);
        val = editor? editor.getValue() : null;
        if(self.watched_values[name] !== val) changed = true;
        watched[name] = val;
      }
    }
    
    watched.self = this.getValue();
    if(this.watched_values.self !== watched.self) changed = true;
    
    this.watched_values = watched;
    
    return changed;
  },
  getWatchedFieldValues: function() {
    return this.watched_values;
  },
  updateHeaderText: function() {
    if(this.header) {
      this.header.textContent = this.getHeaderText();
    }
  },
  getHeaderText: function(title_only) {
    if(this.header_text) return this.header_text;
    else if(title_only) return this.schema.title;
    else return this.getTitle();
  },
  onWatchedFieldChange: function() {
    var vars;
    if(this.header_template) {
      vars = $extend(this.getWatchedFieldValues(),{
        key: this.key,
        i: this.key,
        title: this.getTitle()
      });
      var header_text = this.header_template(vars);
      
      if(header_text !== this.header_text) {
        this.header_text = header_text;
        this.updateHeaderText();
        this.fireChangeHeaderEvent();
      }
    }
    if(this.link_watchers.length) {
      vars = this.getWatchedFieldValues();
      for(var i=0; i<this.link_watchers.length; i++) {
        this.link_watchers[i](vars);
      }
    }
  },
  build: function() {

  },
  isValid: function(callback) {
    callback();
  },
  setValue: function(value) {
    this.value = value;
  },
  getValue: function() {
    return this.value;
  },
  refreshValue: function() {

  },
  getChildEditors: function() {
    return false;
  },
  destroy: function() {
    var self = this;
    this.unregister(this);
    $each(this.watched,function(name,adjusted_path) {
      self.jsoneditor.unwatch(adjusted_path,self.watch_listener);
    });
    this.watched = null;
    this.watched_values = null;
    this.watch_listener = null;
    this.header_text = null;
    this.header_template = null;
    this.value = null;
    if(this.container.parentNode) this.container.parentNode.removeChild(this.container);
    this.container = null;
    this.jsoneditor = null;
    this.schema = null;
    this.path = null;
    this.key = null;
    this.parent = null;
  },
  isRequired: function() {
    if(typeof this.options.required !== "undefined") {
      return this.options.required;
    }
    else if(typeof this.schema.required === "boolean") {
      return this.schema.required;
    }
    else if(this.jsoneditor.options.required_by_default) {
      return true;
    }
    else {
      return false;
    }
  },
  getDefault: function() {
    return this.schema.default || null;
  },

  getTheme: function() {
    return this.theme;
  },
  getSchema: function() {
    return this.schema;
  },
  getContainer: function() {
    return this.container;
  },
  getTitle: function() {
    return this.schema.title || this.key;
  },
  getPath: function() {
    return this.path;
  },
  getParent: function() {
    return this.parent;
  },
  enable: function() {
    if(this.addremove) this.addremove.style.opacity = '';
    
    this.disabled = false;
  },
  disable: function() {
    if(this.addremove) this.addremove.style.opacity = '.6';
    
    this.disabled = true;
  },
  isEnabled: function() {
    return !this.disabled;
  },
  getOption: function(key, def) {
    if(typeof this.options[key] !== 'undefined') return this.options[key];
    else return def;
  },
  getDisplayText: function(arr) {
    var disp = [];
    var used = {};
    
    // Determine how many times each attribute name is used.
    // This helps us pick the most distinct display text for the schemas.
    $each(arr,function(i,el) {
      if(el.title) {
        used[el.title] = used[el.title] || 0;
        used[el.title]++;
      }
      if(el.description) {
        used[el.description] = used[el.description] || 0;
        used[el.description]++;
      }
      if(el.format) {
        used[el.format] = used[el.format] || 0;
        used[el.format]++;
      }
      if(el.type) {
        used[el.type] = used[el.type] || 0;
        used[el.type]++;
      }
    });
    
    // Determine display text for each element of the array
    $each(arr,function(i,el)  {
      var name;
      
      // If it's a simple string
      if(typeof el === "string") name = el;
      // Object
      else if(el.title && used[el.title]<=1) name = el.title;
      else if(el.format && used[el.format]<=1) name = el.format;
      else if(el.type && used[el.type]<=1) name = el.type;
      else if(el.description && used[el.description]<=1) name = el.descripton;
      else if(el.title) name = el.title;
      else if(el.format) name = el.format;
      else if(el.type) name = el.type;
      else if(el.description) name = el.description;
      else if(JSON.stringify(el).length < 50) name = JSON.stringify(el);
      else name = "type";
      
      disp.push(name);
    });
    
    // Replace identical display text with "text 1", "text 2", etc.
    var inc = {};
    $each(disp,function(i,name) {
      inc[name] = inc[name] || 0;
      inc[name]++;
      
      if(used[name] > 1) disp[i] = name + " " + inc[name];
    });
    
    return disp;
  },
  showValidationErrors: function(errors) {

  }
});

JSONEditor.defaults.editors.null = JSONEditor.AbstractEditor.extend({
  getValue: function() {
    return null;
  },
  setValue: function() {
    this.jsoneditor.notifyWatchers(this.path);
  },
  getNumColumns: function() {
    return 2;
  }
});

JSONEditor.defaults.editors.string = JSONEditor.AbstractEditor.extend({
  getDefault: function() {    
    return this.schema.default || '';
  },
  register: function() {
    this._super();
    if(!this.input) return;
    this.input.setAttribute('name',this.formname);
  },
  unregister: function() {
    this._super();
    if(!this.input) return;
    this.input.removeAttribute('name');
  },
  setValue: function(value,initial,from_template) {
    var self = this;
    
    if(this.template && !from_template) {
      return;
    }
    
    value = value || '';
    if(typeof value === "object") value = JSON.stringify(value);
    if(typeof value !== "string") value = ""+value;
    if(value === this.serialized) return;

    // Sanitize value before setting it
    var sanitized = this.sanitize(value);
    if(this.select_options && this.select_options.indexOf(sanitized) < 0) {
      sanitized = this.select_options[0];
    }

    if(this.input.value === sanitized) {
      return;
    }
    

    this.input.value = sanitized;
    
    // If using SCEditor, update the WYSIWYG
    if(this.sceditor_instance) {
      this.sceditor_instance.val(sanitized);
    }
    else if(this.epiceditor) {
      this.epiceditor.importFile(null,sanitized);
    }
    else if(this.ace_editor) {
      this.ace_editor.setValue(sanitized);
    }
    
    var changed = from_template || this.getValue() !== value;
    
    this.refreshValue();

    if(changed) {
      if(self.parent) self.parent.onChildEditorChange(self);
      else self.jsoneditor.onChange();
    }
    
    this.watch_listener();
    this.jsoneditor.notifyWatchers(this.path);
  },
  removeProperty: function() {
    this._super();
    this.input.style.display = 'none';
    if(this.description) this.description.style.display = 'none';
    this.theme.disableLabel(this.label);
  },
  addProperty: function() {
    this._super();
    this.input.style.display = '';
    if(this.description) this.description.style.display = '';
    this.theme.enableLabel(this.label);
  },
  getNumColumns: function() {
    var min = Math.ceil(this.getTitle().length/5);
    var num;
    
    if(this.input_type === 'textarea') num = 6;
    else if(['text','email'].indexOf(this.input_type) >= 0) num = 4;
    else num = 2;
    
    return Math.min(12,Math.max(min,num));
  },
  build: function() {
    var self = this, i;
    if(!this.getOption('compact',false)) this.header = this.label = this.theme.getFormInputLabel(this.getTitle());
    if(this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description);

    this.format = this.schema.format;
    if(!this.format && this.schema.media && this.schema.media.type) {
      this.format = this.schema.media.type.replace(/(^(application|text)\/(x-)?(script\.)?)|(-source$)/g,'');
    }

    // Select box
    if(this.schema.enum) {
      this.input_type = 'select';
      this.select_options = this.schema.enum;
      this.input = this.theme.getSelectInput(this.select_options);
    }
    // Dynamic Select box
    else if(this.schema.enumSource) {
      this.input_type = 'select';
      this.input = this.theme.getSelectInput([]);
      this.enumSource = [];
      
      // Shortcut declaration for using a single array
      if(!(this.schema.enumSource instanceof Array)) {
        if(this.schema.enumValue) {
          this.enumSource = [
            {
              source: this.schema.enumSource,
              value: this.schema.enumValue
            }
          ];
        }
        else {
          this.enumSource = [
            {
              source: this.schema.enumSource
            }
          ];
        }
      }
      else {
        for(i=0; i<this.schema.enumSource.length; i++) {
          // Shorthand for watched variable
          if(typeof this.schema.enumSource[i] === "string") {
            this.enumSource[i] = {
              source: this.schema.enumSource[i]
            };
          }
          // Make a copy of the schema
          else if(!(this.schema.enumSource[i] instanceof Array)) {
            this.enumSource[i] = $extend({},this.schema.enumSource[i]);
          }
          else {
            this.enumSource[i] = this.schema.enumSource[i];
          }
        }
      }
      
      // Now, enumSource is an array of sources
      // Walk through this array and fix up the values
      for(i=0; i<this.enumSource.length; i++) {
        if(this.enumSource[i]) {
          this.enumSource[i].value = this.jsoneditor.compileTemplate(this.enumSource[i].value, this.template_engine);
        }
        if(this.enumSource[i].title) {
          this.enumSource[i].title = this.jsoneditor.compileTemplate(this.enumSource[i].title, this.template_engine);
        }
        if(this.enumSource[i].fillter) {
          this.enumSource[i].filter = this.jsoneditor.compileTemplate(this.enumSource[i].filter, this.template_engine);
        }
      }
    }
    // Specific format
    else if(this.format) {
      // Text Area
      if(this.format === 'textarea') {
        this.input_type = 'textarea';
        this.input = this.theme.getTextareaInput();
      }
      // Range Input
      else if(this.format === 'range') {
        this.input_type = 'range';
        var min = this.schema.minimum || 0;
        var max = this.schema.maximum || Math.max(100,min+1);
        var step = 1;
        if(this.schema.multipleOf) {
          if(min%this.schema.multipleOf) min = Math.ceil(min/this.schema.multipleOf)*this.schema.multipleOf;
          if(max%this.schema.multipleOf) max = Math.floor(max/this.schema.multipleOf)*this.schema.multipleOf;
          step = this.schema.multipleOf;
        }

        this.input = this.theme.getRangeInput(min,max,step);
      }
      // Source Code
      else if([
          'actionscript',
          'batchfile',
          'bbcode',
          'c',
          'c++',
          'cpp',
          'coffee',
          'csharp',
          'css',
          'dart',
          'django',
          'ejs',
          'erlang',
          'golang',
          'handlebars',
          'haskell',
          'haxe',
          'html',
          'ini',
          'jade',
          'java',
          'javascript',
          'json',
          'less',
          'lisp',
          'lua',
          'makefile',
          'markdown',
          'matlab',
          'mysql',
          'objectivec',
          'pascal',
          'perl',
          'pgsql',
          'php',
          'python',
          'r',
          'ruby',
          'sass',
          'scala',
          'scss',
          'smarty',
          'sql',
          'stylus',
          'svg',
          'twig',
          'vbscript',
          'xml',
          'yaml'
        ].indexOf(this.format) >= 0
      ) {
        this.input_type = this.format;
        this.source_code = true;
        
        this.input = this.theme.getTextareaInput();
      }
      // HTML5 Input type
      else {
        this.input_type = this.format;
        this.input = this.theme.getFormInputField(this.input_type);
      }
    }
    // Normal text input
    else {
      this.input_type = 'text';
      this.input = this.theme.getFormInputField(this.input_type);
    }
    
    // minLength, maxLength, and pattern
    if(typeof this.schema.maxLength !== "undefined") this.input.setAttribute('maxlength',this.schema.maxLength);
    if(typeof this.schema.pattern !== "undefined") this.input.setAttribute('pattern',this.schema.pattern);
    else if(typeof this.schema.minLength !== "undefined") this.input.setAttribute('pattern','.{'+this.schema.minLength+',}');

    if(this.getOption('compact')) this.container.setAttribute('class',this.container.getAttribute('class')+' compact');

    if(this.schema.readOnly || this.schema.readonly || this.schema.template) {
      this.always_disabled = true;
      this.input.disabled = true;
    }

    this.input
      .addEventListener('change',function(e) {        
        e.preventDefault();
        e.stopPropagation();
        
        // Don't allow changing if this field is a template
        if(self.schema.template) {
          this.value = self.value;
          return;
        }

        var val = this.value;
        
        // sanitize value
        var sanitized = self.sanitize(val);
        if(val !== sanitized) {
          this.value = sanitized;
        }

        self.refreshValue();
        self.watch_listener();
        self.jsoneditor.notifyWatchers(self.path);
        if(self.parent) self.parent.onChildEditorChange(self);
        else self.jsoneditor.onChange();
      });

    if(this.format) this.input.setAttribute('data-schemaformat',this.format);

    this.control = this.getTheme().getFormControl(this.label, this.input, this.description);
    this.container.appendChild(this.control);

    // If the Select2 library is loaded
    if(this.input_type === "select" && window.$ && $.fn && $.fn.select2) {
      $(this.input).select2();
    }

    // Any special formatting that needs to happen after the input is added to the dom
    requestAnimationFrame(function() {
      self.afterInputReady();
    });
    
    this.register();

    // Compile and store the template
    if(this.schema.template) {
      this.template = this.jsoneditor.compileTemplate(this.schema.template, this.template_engine);
      this.refreshValue();
      this.jsoneditor.notifyWatchers(this.path);
    }
    else {
      this.refreshValue();
      this.jsoneditor.notifyWatchers(this.path);
    }
  },
  enable: function() {
    if(!this.always_disabled) {
      this.input.disabled = false;
      // TODO: WYSIWYG and Markdown editors
    }
    this._super();
  },
  disable: function() {
    this.input.disabled = true;
    // TODO: WYSIWYG and Markdown editors
    this._super();
  },
  afterInputReady: function() {
    var self = this, options;
    
    // Code editor
    if(this.source_code) {      
      // WYSIWYG html and bbcode editor
      if(this.options.wysiwyg && 
        ['html','bbcode'].indexOf(this.input_type) >= 0 && 
        window.$ && $.fn && $.fn.sceditor
      ) {
        options = $extend({},{
          plugins: self.input_type==='html'? 'xhtml' : 'bbcode',
          emoticonsEnabled: false,
          width: '100%',
          height: 300
        },JSONEditor.plugins.sceditor);
        
        $(self.input).sceditor(options);
        
        self.sceditor_instance = $(self.input).sceditor('instance');
        
        self.sceditor_instance.blur(function() {
          // Get editor's value
          var val = $("<div>"+self.sceditor_instance.val()+"</div>");
          // Remove sceditor spans/divs
          $('#sceditor-start-marker,#sceditor-end-marker,.sceditor-nlf',val).remove();
          // Set the value and update
          self.input.value = val.html();
          self.value = self.input.value;
          if(self.parent) self.parent.onChildEditorChange(self);
          else self.jsoneditor.onChange();
          self.jsoneditor.notifyWatchers(self.path);
        });
      }
      // EpicEditor for markdown (if it's loaded)
      else if (this.input_type === 'markdown' && window.EpicEditor) {
        this.epiceditor_container = document.createElement('div');
        this.input.parentNode.insertBefore(this.epiceditor_container,this.input);
        this.input.style.display = 'none';
        
        options = $extend({},JSONEditor.plugins.epiceditor,{
          container: this.epiceditor_container,
          clientSideStorage: false
        });
        
        this.epiceditor = new EpicEditor(options).load();
        
        this.epiceditor.importFile(null,this.getValue());
      
        this.epiceditor.on('update',function() {
          var val = self.epiceditor.exportFile();
          self.input.value = val;
          self.value = val;
          if(self.parent) self.parent.onChildEditorChange(self);
          else self.jsoneditor.onChange();
          self.jsoneditor.notifyWatchers(self.path);
        });
      }
      // ACE editor for everything else
      else if(window.ace) {
        var mode = this.input_type;
        // aliases for c/cpp
        if(mode === 'cpp' || mode === 'c++' || mode === 'c') {
          mode = 'c_cpp';
        }
        
        this.ace_container = document.createElement('div');
        this.ace_container.style.width = '100%';
        this.ace_container.style.position = 'relative';
        this.ace_container.style.height = '400px';
        this.input.parentNode.insertBefore(this.ace_container,this.input);
        this.input.style.display = 'none';
        this.ace_editor = ace.edit(this.ace_container);
        
        this.ace_editor.setValue(this.getValue());
        
        // The theme
        if(JSONEditor.plugins.ace.theme) this.ace_editor.setTheme('ace/theme/'+JSONEditor.plugins.ace.theme);
        // The mode
        mode = ace.require("ace/mode/"+mode);
        if(mode) this.ace_editor.getSession().setMode(new mode.Mode());
        
        // Listen for changes
        this.ace_editor.on('change',function() {
          var val = self.ace_editor.getValue();
          self.input.value = val;
          self.refreshValue();
          if(self.parent) self.parent.onChildEditorChange(self);
          else self.jsoneditor.onChange();
          self.jsoneditor.notifyWatchers(self.path);
        });
      }
    }
    
    self.theme.afterInputReady(self.input);
  },
  refreshValue: function() {
    this.value = this.input.value;
    if(typeof this.value !== "string") this.value = '';
    this.serialized = this.value;
  },
  destroy: function() {
    // If using SCEditor, destroy the editor instance
    if(this.sceditor_instance) {
      this.sceditor_instance.destroy();
    }
    else if(this.epiceditor) {
      this.epiceditor.unload();
    }
    else if(this.ace_editor) {
      this.ace_editor.destroy();
    }
    
    
    this.template = null;
    if(this.input.parentNode) this.input.parentNode.removeChild(this.input);
    if(this.label && this.label.parentNode) this.label.parentNode.removeChild(this.label);
    if(this.description && this.description.parentNode) this.description.parentNode.removeChild(this.description);

    this._super();
  },
  /**
   * This is overridden in derivative editors
   */
  sanitize: function(value) {
    return value;
  },
  /**
   * Re-calculates the value if needed
   */
  onWatchedFieldChange: function() {    
    var self = this, vars, j;
    
    // If this editor needs to be rendered by a macro template
    if(this.template) {
      vars = this.getWatchedFieldValues();
      this.setValue(this.template(vars),false,true);
    }
    // If this editor uses a dynamic select box
    if(this.enumSource) {
      vars = this.getWatchedFieldValues();
      var select_options = [];
      var select_titles = [];
      
      for(var i=0; i<this.enumSource.length; i++) {
        // Constant values
        if(this.enumSource[i] instanceof Array) {
          select_options = select_options.concat(this.enumSource[i]);
          select_titles = select_titles.concat(this.enumSource[i]);
        }
        // A watched field
        else if(vars[this.enumSource[i].source]) {
          var items = vars[this.enumSource[i].source];
          
          // Only use a predefined part of the array
          if(this.enumSource[i].slice) {
            items = Array.prototype.slice.apply(items,this.enumSource[i].slice);
          }
          // Filter the items
          if(this.enumSource[i].filter) {
            var new_items = [];
            for(j=0; j<items.length; j++) {
              if(filter({i:j,item:items[j]})) new_items.push(items[j]);
            }
            items = new_items;
          }
          
          var item_titles = [];
          var item_values = [];
          for(j=0; j<items.length; j++) {
            var item = items[j];
            
            // Rendered value
            if(this.enumSource[i].value) {
              item_values[j] = this.enumSource[i].value({
                i: j,
                item: item
              });
            }
            // Use value directly
            else {
              item_values[j] = items[j];
            }
            
            // Rendered title
            if(this.enumSource[i].title) {
              item_titles[j] = this.enumSource[i].title({
                i: j,
                item: item
              });
            }
            // Use value as the title also
            else {
              item_titles[j] = item_values[j];
            }
          }
          
          // TODO: sort
          
          select_options = select_options.concat(item_values);
          select_titles = select_titles.concat(item_titles);
        }
      }
      
      this.theme.setSelectOptions(this.input, select_options, select_titles);
      this.select_options = select_options;
      
      // If the previous value is still in the new select options, stick with it
      if(select_options.indexOf(this.value) !== -1) {
        this.input.value = this.value;
      }
      // Otherwise, set the value to the first select option
      else {
        this.input.value = select_options[0];
        this.value = select_options[0] || "";  
        if(this.parent) this.parent.onChildEditorChange(this);
        else this.jsoneditor.onChange();
        this.jsoneditor.notifyWatchers(this.path);
      }
    }
    
    this._super();
  },
  showValidationErrors: function(errors) {
    var self = this;

    var messages = [];
    $each(errors,function(i,error) {
      if(error.path === self.path) {
        messages.push(error.message);
      }
    });

    if(messages.length) {
      this.theme.addInputError(this.input, messages.join('. ')+'.');
    }
    else {
      this.theme.removeInputError(this.input);
    }
  }
});

JSONEditor.defaults.editors.number = JSONEditor.defaults.editors.string.extend({
  getDefault: function() {
    return this.schema.default || 0;
  },
  sanitize: function(value) {
    return (value+"").replace(/[^0-9\.\-]/g,'');
  },
  getNumColumns: function() {
    return 2;
  },
  getValue: function() {
    return this.value*1;
  }
});

JSONEditor.defaults.editors.integer = JSONEditor.defaults.editors.number.extend({
  sanitize: function(value) {
    value = value + "";
    return value.replace(/[^0-9\-]/g,'');
  },
  getNumColumns: function() {
    return 2;
  }
});

JSONEditor.defaults.editors.object = JSONEditor.AbstractEditor.extend({
  getDefault: function() {
    return $extend({},this.schema.default || {});
  },
  getChildEditors: function() {
    return this.editors;
  },
  register: function() {
    this._super();
    if(this.editors) {
      for(var i in this.editors) {
        if(!this.editors.hasOwnProperty(i)) continue;
        this.editors[i].register();
      }
    }
  },
  unregister: function() {
    this._super();
    if(this.editors) {
      for(var i in this.editors) {
        if(!this.editors.hasOwnProperty(i)) continue;
        this.editors[i].unregister();
      }
    }
  },
  getNumColumns: function() {
    return Math.max(Math.min(12,this.maxwidth),3);
  },
  enable: function() {
    if(this.editjson_button) this.editjson_button.disabled = false;
    if(this.addproperty_button) this.addproperty_button.disabled = false;
    
    this._super();
    if(this.editors) {
      for(var i in this.editors) {
        if(!this.editors.hasOwnProperty(i)) continue;
        this.editors[i].enable();
      }
    }
  },
  disable: function() {
    if(this.editjson_button) this.editjson_button.disabled = true;
    if(this.addproperty_button) this.addproperty_button.disabled = true;
    this.hideEditJSON();
    
    this._super();
    if(this.editors) {
      for(var i in this.editors) {
        if(!this.editors.hasOwnProperty(i)) continue;
        this.editors[i].disable();
      }
    }
  },
  layoutEditors: function() {
    var self = this, i, j;
    
    if(!this.row_container) return;
    
    var container;
    
    if(this.format === 'grid') {
      var rows = [];
      $each(this.editors, function(key,editor) {
        if(editor.property_removed) return;
        var found = false;
        var width = editor.options.hidden? 0 : editor.getNumColumns();
        var height = editor.options.hidden? 0 : editor.container.offsetHeight;
        // See if the editor will fit in any of the existing rows first
        for(var i=0; i<rows.length; i++) {
          // If the editor will fit in the row horizontally
          if(rows[i].width + width <= 12) {
            // If the editor is close to the other elements in height
            // i.e. Don't put a really tall editor in an otherwise short row or vice versa
            if(!height || (rows[i].minh*0.5 < height && rows[i].maxh*2 > height)) {
              found = i;
            }
          }
        }
        
        // If there isn't a spot in any of the existing rows, start a new row
        if(found === false) {
          rows.push({
            width: 0,
            minh: 999999,
            maxh: 0,
            editors: []
          });
          found = rows.length-1;
        }
        
        rows[found].editors.push({
          key: key,
          //editor: editor,
          width: width,
          height: height
        });
        rows[found].width += width;
        rows[found].minh = Math.min(rows[found].minh,height);
        rows[found].maxh = Math.max(rows[found].maxh,height);
      });
      
      // Make almost full rows width 12
      // Do this by increasing all editors' sizes proprotionately
      // Any left over space goes to the biggest editor
      // Don't touch rows with a width of 6 or less
      for(i=0; i<rows.length; i++) {
        if(rows[i].width < 12) {
          var biggest = false;
          var new_width = 0;
          for(j=0; j<rows[i].editors.length; j++) {
            if(biggest === false) biggest = j;
            else if(rows[i].editors[j].width > rows[i].editors[biggest].width) biggest = j;
            rows[i].editors[j].width *= 12/rows[i].width;
            rows[i].editors[j].width = Math.floor(rows[i].editors[j].width);
            new_width += rows[i].editors[j].width;
          }
          if(new_width < 12) rows[i].editors[biggest].width += 12-new_width;
          rows[i].width = 12;
        }
      }
      
      // layout hasn't changed
      if(this.layout === JSON.stringify(rows)) return false;
      this.layout = JSON.stringify(rows);
      
      // Layout the form
      container = document.createElement('div');
      for(i=0; i<rows.length; i++) {
        var row = this.theme.getGridRow();
        container.appendChild(row);
        for(j=0; j<rows[i].editors.length; j++) {
          var editor = this.editors[rows[i].editors[j].key];
          
          if(editor.options.hidden) editor.container.style.display = 'none';
          else this.theme.setGridColumnSize(editor.container,rows[i].editors[j].width);
          
          row.appendChild(editor.container);
        }
      }
    }
    // Normal layout
    else {
      container = document.createElement('div');
      $each(this.editors, function(key,editor) {
        if(editor.property_removed) return;
        var row = self.theme.getGridRow();
        container.appendChild(row);
        
        if(editor.options.hidden) editor.container.style.display = 'none';
        else self.theme.setGridColumnSize(editor.container,12);
        
        row.appendChild(editor.container);
      });
    }
    this.row_container.innerHTML = '';
    this.row_container.appendChild(container);
  },
  build: function() {
    this.editors = {};
    var self = this;
    
    this.format = this.getOption('layout') || this.getOption('object_layout') || this.schema.format || this.jsoneditor.options.object_layout || 'normal';

    this.schema.properties = this.schema.properties || {};

    this.minwidth = 0;
    this.maxwidth = 0;

    // If the object should be rendered as a table row
    if(this.getOption('table_row',false)) {
      this.editor_holder = this.container;
      $each(this.schema.properties, function(key,schema) {
        var editor = self.jsoneditor.getEditorClass(schema, self.jsoneditor);
        var holder = self.editor_holder.appendChild(self.getTheme().getTableCell());

        self.editors[key] = self.jsoneditor.createEditor(editor,{
          jsoneditor: self.jsoneditor,
          schema: schema,
          container: holder,
          path: self.path+'.'+key,
          parent: self,
          compact: true
        });
        
        var width = self.editors[key].options.hidden? 0 : self.editors[key].getNumColumns();

        self.minwidth += width;
        self.maxwidth += width;
        
        if(self.editors[key].options.hidden) {
          holder.style.display = 'none';
        }
      });
      this.no_link_holder = true;
    }
    // If the object should be rendered as a table
    else if(this.getOption('table',false)) {
      // TODO: table display format
      throw "Not supported yet";
    }
    // If the object should be rendered as a div
    else {
      this.header = document.createElement('span');
      this.header.textContent = this.getTitle();
      this.title = this.getTheme().getHeader(this.header);
      this.container.appendChild(this.title);
      this.container.style.position = 'relative';
      
      // Edit JSON modal
      this.editjson_holder = this.theme.getModal();
      this.editjson_textarea = this.theme.getTextareaInput();
      this.editjson_textarea.style.height = '170px';
      this.editjson_textarea.style.width = '300px';
      this.editjson_textarea.style.display = 'block';
      this.editjson_save = this.getButton('Save','save','Save');
      this.editjson_save.addEventListener('click',function() {
        self.saveJSON();
      });
      this.editjson_cancel = this.getButton('Cancel','cancel','Cancel');
      this.editjson_cancel.addEventListener('click',function() {
        self.hideEditJSON();
      });
      this.editjson_holder.appendChild(this.editjson_textarea);
      this.editjson_holder.appendChild(this.editjson_save);
      this.editjson_holder.appendChild(this.editjson_cancel);
      
      // Manage Properties modal
      this.addproperty_holder = this.theme.getModal();
      this.addproperty_list = document.createElement('div');
      this.addproperty_list.style.width = '295px';
      this.addproperty_list.style.maxHeight = '160px';
      this.addproperty_list.style.padding = '5px 0';
      this.addproperty_list.style.overflowY = 'auto';
      this.addproperty_list.style.overflowX = 'hidden';
      this.addproperty_list.style.paddingLeft = '5px';
      this.addproperty_add = this.getButton('add','add','add');
      this.addproperty_input = this.theme.getFormInputField('text');
      this.addproperty_input.setAttribute('placeholder','Property name...');
      this.addproperty_input.style.width = '220px';
      this.addproperty_input.style.marginBottom = '0';
      this.addproperty_input.style.display = 'inline-block';
      this.addproperty_add.addEventListener('click',function() {
        if(self.addproperty_input.value) {
          if(self.editors[self.addproperty_input.value]) {
            alert('there is already a property with that name');
            return;
          }
          
          self.addObjectProperty(self.addproperty_input.value);
          self.addPropertyCheckbox(self.addproperty_input.value);
          if(self.editors[self.addproperty_input.value]) {
            self.editors[self.addproperty_input.value].disable();
          }
        }
      });
      this.addproperty_holder.appendChild(this.addproperty_list);
      this.addproperty_holder.appendChild(this.addproperty_input);
      this.addproperty_holder.appendChild(this.addproperty_add);
      var spacer = document.createElement('div');
      spacer.style.clear = 'both';
      this.addproperty_holder.appendChild(spacer);
      
      
      // Description
      if(this.schema.description) {
        this.description = this.getTheme().getDescription(this.schema.description);
        this.container.appendChild(this.description);
      }
      
      // Validation error placeholder area
      this.error_holder = document.createElement('div');
      this.container.appendChild(this.error_holder);
      
      // Container for child editor area
      this.editor_holder = this.getTheme().getIndentedPanel();
      this.editor_holder.style.paddingBottom = '0';
      this.container.appendChild(this.editor_holder);

      // Container for rows of child editors
      this.row_container = this.theme.getGridContainer();
      this.editor_holder.appendChild(this.row_container);

      $each(this.schema.properties, function(key,schema) {
        var editor = self.jsoneditor.getEditorClass(schema, self.jsoneditor);
        var holder = self.getTheme().getGridColumn();
        self.row_container.appendChild(holder);

        // If the property is required
        var required;
        if(self.schema.required && self.schema.required instanceof Array) {
          required = self.schema.required.indexOf(key) >= 0;
        }

        self.editors[key] = self.jsoneditor.createEditor(editor,{
          jsoneditor: self.jsoneditor,
          schema: schema,
          container: holder,
          path: self.path+'.'+key,
          parent: self,
          required: required
        });

        self.minwidth = Math.max(self.minwidth,self.editors[key].getNumColumns());
        self.maxwidth += self.editors[key].getNumColumns();
      });

      // Control buttons
      this.title_controls = this.getTheme().getHeaderButtonHolder();
      this.editjson_controls = this.getTheme().getHeaderButtonHolder();
      this.addproperty_controls = this.getTheme().getHeaderButtonHolder();
      this.title.appendChild(this.title_controls);
      this.title.appendChild(this.editjson_controls);
      this.title.appendChild(this.addproperty_controls);

      // Show/Hide button
      this.collapsed = false;
      this.toggle_button = this.getButton('','collapse','Collapse');
      this.title_controls.appendChild(this.toggle_button);
      this.toggle_button.addEventListener('click',function() {
        if(self.collapsed) {
          self.editor_holder.style.display = '';
          self.collapsed = false;
          self.setButtonText(self.toggle_button,'','collapse','Collapse');
        }
        else {
          self.editor_holder.style.display = 'none';
          self.collapsed = true;
          self.setButtonText(self.toggle_button,'','expand','Expand');
        }
      });

      // If it should start collapsed
      if(this.options.collapsed) {
        $trigger(this.toggle_button,'click');
      }
      
      // Collapse button disabled
      if(this.schema.options && typeof this.schema.options.disable_collapse !== "undefined") {
        if(this.schema.options.disable_collapse) this.toggle_button.style.display = 'none';
      }
      else if(this.jsoneditor.options.disable_collapse) {
        this.toggle_button.style.display = 'none';
      }
      
      // Edit JSON Button
      this.editjson_button = this.getButton('JSON','edit','Edit JSON');
      this.editjson_button.addEventListener('click',function() {
        self.toggleEditJSON();
      });
      this.editjson_controls.appendChild(this.editjson_button);
      this.editjson_controls.appendChild(this.editjson_holder);
      
      // Edit JSON Buttton disabled
      if(this.schema.options && typeof this.schema.options.disable_edit_json !== "undefined") {
        if(this.schema.options.disable_edit_json) this.editjson_button.style.display = 'none';
      }
      else if(this.jsoneditor.options.disable_edit_json) {
        this.editjson_button.style.display = 'none';
      }
      
      // Object Properties Button
      this.addproperty_button = this.getButton('Properties','edit','Object Properties');
      this.addproperty_button.addEventListener('click',function() {
        self.toggleAddProperty();
      });
      this.addproperty_controls.appendChild(this.addproperty_button);
      this.addproperty_controls.appendChild(this.addproperty_holder);
      this.refreshAddProperties();
    }
    
    // Sort editors by propertyOrder
    var sorted = {};
    var keys = Object.keys(this.editors);
    keys = keys.sort(function(a,b) {
      var ordera = self.editors[a].schema.propertyOrder;
      var orderb = self.editors[b].schema.propertyOrder;
      if(typeof ordera !== "number") ordera = 1000;
      if(typeof orderb !== "number") orderb = 1000;
      
      return ordera - orderb;
    });
    for(var i=0; i<keys.length; i++) {
      sorted[keys[i]] = this.editors[keys[i]];
    }
    this.editors = sorted;

    // Initial layout
    this.layoutEditors();
    // Do it again now that we know the approximate heights of elements
    this.layoutEditors();
    
    this.jsoneditor.notifyWatchers(this.path);
  },
  showEditJSON: function() {
    if(!this.editjson_holder) return;
    this.hideAddProperty();
    
    // Position the form directly beneath the button
    // TODO: edge detection
    this.editjson_holder.style.left = this.editjson_button.offsetLeft+"px";
    this.editjson_holder.style.top = this.editjson_button.offsetTop + this.editjson_button.offsetHeight+"px";
    
    // Start the textarea with the current value
    this.editjson_textarea.value = JSON.stringify(this.getValue(),null,2);
    
    // Disable the rest of the form while editing JSON
    this.disable();
    
    this.editjson_holder.style.display = '';
    this.editjson_button.disabled = false;
    this.editing_json = true;
  },
  hideEditJSON: function() {
    if(!this.editjson_holder) return;
    if(!this.editing_json) return;
    
    this.editjson_holder.style.display = 'none';
    this.enable();
    this.editing_json = false;
  },
  saveJSON: function() {
    if(!this.editjson_holder) return;
    
    try {
      var json = JSON.parse(this.editjson_textarea.value);
      this.setValue(json);
      this.hideEditJSON();
    }
    catch(e) {
      alert('invalid JSON');
      throw e;
    }
  },
  toggleEditJSON: function() {
    if(this.editing_json) this.hideEditJSON();
    else this.showEditJSON();
  },
  addPropertyCheckbox: function(key) {
    var editor = this.editors[key];
    if(!editor) return;
    var self = this;
    var checkbox, label, control;
    
    checkbox = self.theme.getCheckbox();
    checkbox.style.width = 'auto';
    label = self.theme.getCheckboxLabel(key);
    control = self.theme.getFormControl(label,checkbox);
    control.style.paddingBottom = control.style.marginBottom = control.style.paddingTop = control.style.marginTop = 0;
    control.style.height = 'auto';
    //control.style.overflowY = 'hidden';
    self.addproperty_list.appendChild(control);
    
    checkbox.checked = !editor.property_removed;
    if(editor.isRequired()) checkbox.disabled = true;
    checkbox.addEventListener('change',function() {
      if(checkbox.checked) {
        self.addObjectProperty(key);
      }
      else {
        self.removeObjectProperty(key);
      }
    });
    
    return checkbox;
  },
  showAddProperty: function() {
    if(!this.addproperty_holder) return;
    this.hideEditJSON();
    
    // Position the form directly beneath the button
    // TODO: edge detection
    this.addproperty_holder.style.left = this.addproperty_button.offsetLeft+"px";
    this.addproperty_holder.style.top = this.addproperty_button.offsetTop + this.addproperty_button.offsetHeight+"px";
    
    // Build the properties list
    this.addproperty_list.innerHTML = '';
    var self = this;
    this.addproperty_checkboxes = {};
    $each(this.editors,function(i,editor) {
      self.addproperty_checkboxes[i] = self.addPropertyCheckbox(i);
    });
    
    // Disable the rest of the form while editing JSON
    this.disable();
    
    this.adding_property = true;
    this.addproperty_button.disabled = false;
    this.addproperty_holder.style.display = '';
    this.refreshAddProperties();
  },
  hideAddProperty: function() {
    if(!this.addproperty_holder) return;
    if(!this.adding_property) return;
    
    this.addproperty_holder.style.display = 'none';
    this.enable();
    
    this.adding_property = false;
  },
  toggleAddProperty: function() {
    if(this.adding_property) this.hideAddProperty();
    else this.showAddProperty();
  },
  removeObjectProperty: function(property) {
    if(this.editors[property]) {
      this.editors[property].property_removed = true;
      this.editors[property].unregister();
      this.refreshValue();
      this.layoutEditors();
      this.jsoneditor.notifyWatchers(this.path);
      if(this.parent) this.parent.onChildEditorChange(this);
      else this.jsoneditor.onChange();
    }
  },
  addObjectProperty: function(name) {
    var self = this;
    
    // If property with this name already exists
    if(this.editors[name]) {
      // Property  was removed, add it back
      if(this.editors[name].property_removed) {
        this.editors[name].property_removed = false;
        this.editors[name].register();
        this.jsoneditor.notifyWatchers(this.editors[name].path);
      }
      else {
        return; 
      }
    }
    else {
      // Determine the schema to use for this new property
      var schema = {}, matched = false;
      // Check if it matches any of the pattern properties
      if(self.schema.patternProperties) {
        $each(self.schema.patternProperties,function(i,el) {
          var regex = new RegExp(i);
          if(regex.test(name)) {
            matched = true;
            schema = $extend(schema,el);
          }
        });
      }
      // Otherwise, check if additionalProperties is a schema
      if(!matched && typeof self.schema.additionalProperties === "object") {
        schema = $extend(schema,self.schema.additionalProperties);
      }
      
      // Add the property
      var editor = self.jsoneditor.getEditorClass(schema, self.jsoneditor);
      var holder = self.getTheme().getChildEditorHolder();
      self.editor_holder.appendChild(holder);

      self.editors[name] = self.jsoneditor.createEditor(editor,{
        jsoneditor: self.jsoneditor,
        schema: schema,
        container: holder,
        path: self.path+'.'+name,
        parent: self,
        required: false
      });
      self.editors[name].not_core = true;
    }
    
    self.refreshValue();
    self.jsoneditor.notifyWatchers(self.path);
    if(self.parent) self.parent.onChildEditorChange(self);
    else self.jsoneditor.onChange();
    
    self.layoutEditors();
  },
  onChildEditorChange: function(editor) {
    this.refreshValue();
    this._super(editor);
  },
  canHaveAdditionalProperties: function() {
    return this.schema.additionalProperties !== false && !this.jsoneditor.options.no_additional_properties;
  },
  destroy: function() {
    $each(this.editors, function(i,el) {
      el.destroy();
    });
    this.editor_holder.innerHTML = '';
    if(this.title) this.title.parentNode.removeChild(this.title);
    if(this.error_holder) this.error_holder.parentNode.removeChild(this.error_holder);

    this.editors = null;
    this.editor_holder.parentNode.removeChild(this.editor_holder);
    this.editor_holder = null;

    this._super();
  },
  refreshValue: function() {
    this.value = {};
    this.serialized = '';
    var self = this;
    var props = 0;
    
    var removed = false;
    var new_editors = this.editors;
    $each(this.editors, function(i,editor) {
      if(editor.property_removed && editor.not_core) {
        new_editors = {};
        removed = true;
      }
    });
    
    $each(this.editors, function(i,editor) {
      if(editor.property_removed) {
        if(!editor.not_core && removed) new_editors[i] = editor;
        else if(editor.not_core) {
          var container = editor.container;
          editor.destroy();
          if(container.parentNode) container.parentNode.removeChild(container);
        }
        return;
      }
      else if(removed) new_editors[i] = editor;
      
      props++;
      self.value[i] = editor.getValue();
    });
    this.editors = new_editors;
    
    if(this.adding_property) this.refreshAddProperties();
  },
  refreshAddProperties: function() {
    if(this.options.disable_properties || this.jsoneditor.options.disable_properties) {
      this.addproperty_controls.style.display = 'none';
      return;
    }

    var can_add = false, can_remove = false, num_props = 0, i, show_modal = false;
    
    // Get number of editors
    for(i in this.editors) {
      if(!this.editors.hasOwnProperty(i)) continue;
      if(this.editors[i].property_removed) continue;
      num_props++;
    }
    
    // Determine if we can add back removed properties
    can_add = this.canHaveAdditionalProperties() && !(typeof this.schema.maxProperties !== "undefined" && num_props >= this.schema.maxProperties);
    
    // Check for which editors can't be removed or added back
    for(i in this.editors) {
      if(!this.editors.hasOwnProperty(i)) continue;
      if(this.editors[i].isRequired()) {
        if(this.addproperty_checkboxes && this.addproperty_checkboxes[i]) {
          this.addproperty_checkboxes[i].disabled = true;
        }
      }
      else if(typeof this.schema.minProperties !== "undefined" && num_props <= this.schema.minProperties) {
        if(this.addproperty_checkboxes && this.addproperty_checkboxes[i]) {
          this.addproperty_checkboxes[i].disabled = this.addproperty_checkboxes[i].checked;
          if(!this.addproperty_checkboxes[i].checked) show_modal = true;
        }
        else if(this.editors[i].property_removed && can_add) {
          show_modal = true;
        }
      }
      else if(this.editors[i].property_removed) {
        if(this.addproperty_checkboxes && this.addproperty_checkboxes[i]) {
          if(!can_add) {
            this.addproperty_checkboxes[i].disabled = true;
          }
          else {
            this.addproperty_checkboxes[i].disabled = false;
            show_modal = true;
          }
        }
        else if(can_add) {
          show_modal = true;
        }
      }
      else {
        if(this.addproperty_checkboxes && this.addproperty_checkboxes[i]) {
          this.addproperty_checkboxes[i].disabled = false;
        }
        show_modal = true;
        can_remove = true;
      }
    }
    
    if(this.canHaveAdditionalProperties()) {
      show_modal = true;
    }
    
    // Additional addproperty checkboxes not tied to a current editor
    if(this.addproperty_checkboxes) {
      for(i in this.addproperty_checkboxes) {
        if(!this.addproperty_checkboxes.hasOwnProperty(i)) continue;
        if(this.editors[i]) continue;
        show_modal = true;
        this.addproperty_checkboxes[i].disabled = !can_add && !can_remove;
      }
    }
    
    // If no editors can be added or removed, hide the modal button
    if(!show_modal) {
      this.hideAddProperty();
      this.addproperty_controls.style.display = 'none';
    }
    // If additional properties are disabled
    else if(!this.canHaveAdditionalProperties()) {
      this.addproperty_add.style.display = 'none';
      this.addproperty_input.style.display = 'none';
    }
    // If no new properties can be added
    else if(!can_add) {
      this.addproperty_add.disabled = true;
    }
    // If new properties can be added
    else {
      this.addproperty_add.disabled = false;
    }
  },
  setValue: function(value, initial) {
    var self = this;
    value = value || {};
    
    if(typeof value !== "object" || value instanceof Array) value = {};
    
    // First, set the values for all of the defined properties
    $each(this.editors, function(i,editor) {      
      if(typeof value[i] !== "undefined") {
        // If property is removed, add property
        if(editor.property_removed) {
          self.addObjectProperty(i);
        }
        
        editor.setValue(value[i],initial);
      }
      else {
        // If property isn't required, remove property
        if(!initial && !editor.property_removed && !editor.isRequired()) {
          self.removeObjectProperty(i);
          return;
        }
        
        editor.setValue(editor.getDefault(),initial);
      }
    });
    
    // If additional properties are allowed, create the editors for any of those
    if(this.canHaveAdditionalProperties()) {
      $each(value, function(i,val) {
        if(!self.editors[i]) {
          self.addObjectProperty(i);
          if(self.editors[i]) {
            self.editors[i].setValue(val,initial);
          }
        }
      });
    }
    
    this.refreshValue();
    this.jsoneditor.notifyWatchers(this.path);
  },
  showValidationErrors: function(errors) {
    var self = this;

    // Get all the errors that pertain to this editor
    var my_errors = [];
    var other_errors = [];
    $each(errors, function(i,error) {
      if(error.path === self.path) {
        my_errors.push(error);
      }
      else {
        other_errors.push(error);
      }
    });

    // Show errors for this editor
    if(this.error_holder) {
      if(my_errors.length) {
        var message = [];
        this.error_holder.innerHTML = '';
        this.error_holder.style.display = '';
        $each(my_errors, function(i,error) {
          self.error_holder.appendChild(self.theme.getErrorMessage(error.message));
        });
      }
      // Hide error area
      else {
        this.error_holder.style.display = 'none';
      }
    }

    // Show error for the table row if this is inside a table
    if(this.getOption('table_row')) {
      if(my_errors.length) {
        this.theme.addTableRowError(this.container);
      }
      else {
        this.theme.removeTableRowError(this.container);
      }
    }

    // Show errors for child editors
    $each(this.editors, function(i,editor) {
      editor.showValidationErrors(other_errors);
    });
  }
});

JSONEditor.defaults.editors.array = JSONEditor.AbstractEditor.extend({
  getDefault: function() {
    return this.schema.default || [];
  },
  register: function() {
    this._super();
    if(this.rows) {
      for(var i=0; i<this.rows.length; i++) {
        this.rows[i].register();
      }
    }
  },
  unregister: function() {
    this._super();
    if(this.rows) {
      for(var i=0; i<this.rows.length; i++) {
        this.rows[i].unregister();
      }
    }
  },
  getNumColumns: function() {
    var info = this.getItemInfo(0);
    // Tabs require extra horizontal space
    if(this.tabs_holder) {
      return Math.max(Math.min(12,info.width+2),4);
    }
    else {
      return info.width;
    }
  },
  addProperty: function() {
    this._super();
    this.row_holder.style.display = '';
    if(this.tabs_holder) this.tabs_holder.style.display = '';
    this.controls.style.display = '';
    this.title_controls.style.display = '';
    this.theme.enableHeader(this.title);
  },
  removeProperty: function() {
    this._super();
    this.row_holder.style.display = 'none';
    if(this.tabs_holder) this.tabs_holder.style.display = 'none';
    this.controls.style.display = 'none';
    this.title_controls.style.display = 'none';
    this.theme.disableHeader(this.title);
  },
  enable: function() {
    if(this.add_row_button) this.add_row_button.disabled = false;
    if(this.remove_all_rows_button) this.remove_all_rows_button.disabled = false;
    if(this.delete_last_row_button) this.delete_last_row_button.disabled = false;
    
    if(this.rows) {
      for(var i=0; i<this.rows.length; i++) {
        this.rows[i].enable();
        
        if(this.rows[i].moveup_button) this.rows[i].moveup_button.disabled = false;
        if(this.rows[i].movedown_button) this.rows[i].movedown_button.disabled = false;
        if(this.rows[i].delete_button) this.rows[i].delete_button.disabled = false;
      }
    }
    this._super();
  },
  disable: function() {
    if(this.add_row_button) this.add_row_button.disabled = true;
    if(this.remove_all_rows_button) this.remove_all_rows_button.disabled = true;
    if(this.delete_last_row_button) this.delete_last_row_button.disabled = true;

    if(this.rows) {
      for(var i=0; i<this.rows.length; i++) {
        this.rows[i].disable();
        
        if(this.rows[i].moveup_button) this.rows[i].moveup_button.disabled = true;
        if(this.rows[i].movedown_button) this.rows[i].movedown_button.disabled = true;
        if(this.rows[i].delete_button) this.rows[i].delete_button.disabled = true;
      }
    }
    this._super();
  },
  build: function() {
    this.rows = [];
    this.row_cache = [];
    var self = this;

    if(!this.getOption('compact',false)) {
      this.header = document.createElement('span');
      this.header.textContent = this.getTitle();
      this.title = this.theme.getHeader(this.header);
      this.container.appendChild(this.title);
      this.title_controls = this.theme.getHeaderButtonHolder();
      this.title.appendChild(this.title_controls);
      if(this.schema.description) {
        this.description = this.theme.getDescription(this.schema.description);
        this.container.appendChild(this.description);
      }
      this.error_holder = document.createElement('div');
      this.container.appendChild(this.error_holder);

      if(this.schema.format === 'tabs') {
        this.controls = this.theme.getHeaderButtonHolder();
        this.title.appendChild(this.controls);
        this.tabs_holder = this.theme.getTabHolder();
        this.container.appendChild(this.tabs_holder);
        this.row_holder = this.theme.getTabContentHolder(this.tabs_holder);

        this.active_tab = null;
      }
      else {
        this.panel = this.theme.getIndentedPanel();
        this.container.appendChild(this.panel);
        this.row_holder = document.createElement('div');
        this.panel.appendChild(this.row_holder);
        this.controls = this.theme.getButtonHolder();
        this.panel.appendChild(this.controls);
      }
    }
    else {
        this.panel = this.theme.getIndentedPanel();
        this.container.appendChild(this.panel);
        this.controls = this.theme.getButtonHolder();
        this.panel.appendChild(this.controls);
        this.row_holder = document.createElement('div');
        this.panel.appendChild(this.row_holder);
    }

    this.row_holder.addEventListener('change_header_text',function() {
      self.refreshTabs(true);
    });
    
    // Add controls
    this.addControls();
    
    this.jsoneditor.notifyWatchers(this.path);
  },
  onChildEditorChange: function(editor) {
    this.refreshValue();
    this._super(editor);
  },
  getItemTitle: function() {
    return (this.schema.items && this.schema.items.title) || 'item';
  },
  getItemSchema: function(i) {
    if(this.schema.items instanceof Array) {
      if(i >= this.schema.items.length) {
        if(this.schema.additionalItems===true) {
          return {};
        }
        else if(this.schema.additionalItems) {
          return $extend({},this.schema.additionalItems);
        }
      }
      else {
        return $extend({},this.schema.items[i]);
      }
    }
    else if(this.schema.items) {
      return $extend({},this.schema.items);
    }
    else {
      return {};
    }
  },
  getItemInfo: function(i) {
    // Get the schema for this item
    var schema = this.getItemSchema(i);
    
    // Check if it's cached
    this.item_info = this.item_info || {};
    var stringified = JSON.stringify(schema);
    if(typeof this.item_info[stringified] !== "undefined") return this.item_info[stringified];
    
    // Create a temporary editor with this schema and get info
    var tmp = document.createElement('div');
    this.container.appendChild(tmp);
    
    // Ignore events on this temporary editor
    tmp.addEventListener('change_header_text',function(e) {
      e.preventDefault();
      e.stopPropagation();
    });
    
    var editor = this.jsoneditor.getEditorClass(schema, this.jsoneditor);
    editor = this.jsoneditor.createEditor(editor,{
      jsoneditor: this.jsoneditor,
      schema: schema,
      container: tmp,
      path: this.path+'.'+i,
      parent: this,
      required: true
    });
    this.item_info[stringified] = {
      child_editors: editor.getChildEditors()? true : false,
      title: schema.title || 'item',
      width: editor.getNumColumns(),
      default: editor.getDefault()
    };
    editor.destroy();
    if(tmp.parentNode) tmp.parentNode.removeChild(tmp);
    
    return this.item_info[stringified];
  },
  getElementEditor: function(i) {
    var item_info = this.getItemInfo(i);
    var schema = this.getItemSchema(i);
    schema.title = item_info.title+' '+i;

    var editor = this.jsoneditor.getEditorClass(schema, this.jsoneditor);

    var holder;
    if(this.tabs_holder) {
      holder = this.theme.getTabContent();
    }
    else if(item_info.child_editors) {
      holder = this.theme.getChildEditorHolder();
    }
    else {
      holder = this.theme.getIndentedPanel();
    }

    this.row_holder.appendChild(holder);

    var ret = this.jsoneditor.createEditor(editor,{
      jsoneditor: this.jsoneditor,
      schema: schema,
      container: holder,
      path: this.path+'.'+i,
      parent: this,
      required: true
    });

    if(!ret.title_controls) {
      ret.array_controls = this.theme.getButtonHolder();
      holder.appendChild(ret.array_controls);
    }
    
    return ret;
  },
  destroy: function() {
    this.empty(true);
    if(this.title) this.title.parentNode.removeChild(this.title);
    if(this.description) this.description.parentNode.removeChild(this.description);
    if(this.row_holder) this.row_holder.parentNode.removeChild(this.row_holder);
    if(this.controls) this.controls.parentNode.removeChild(this.controls);
    if(this.panel) this.panel.parentNode.removeChild(this.panel);
    
    this.rows = this.row_cache = this.title = this.description = this.row_holder = this.panel = this.controls = null;

    this._super();
  },
  empty: function(hard) {
    if(!this.rows) return;
    var self = this;
    $each(this.rows,function(i,row) {
      if(hard) {
        if(row.tab && row.tab.parentNode) row.tab.parentNode.removeChild(row.tab);
        self.destroyRow(row,true);
        self.row_cache[i] = null;
      }
      self.rows[i] = null;
    });
    self.rows = [];
    if(hard) self.row_cache = [];
  },
  destroyRow: function(row,hard) {
    var holder = row.container;
    if(hard) {
      row.destroy();
      if(holder.parentNode) holder.parentNode.removeChild(holder);
      if(row.tab && row.tab.parentNode) row.tab.parentNode.removeChild(row.tab);
    }
    else {
      if(row.tab) row.tab.style.display = 'none';
      holder.style.display = 'none';
      row.unregister();
    }
  },
  getMax: function() {
    if((this.schema.items instanceof Array) && this.schema.additionalItems === false) {
      return Math.min(this.schema.items.length,this.schema.maxItems || Infinity);
    }
    else {
      return this.schema.maxItems || Infinity;
    }
  },
  refreshTabs: function(refresh_headers) {
    var self = this;
    $each(this.rows, function(i,row) {
      if(!row.tab) return;

      if(refresh_headers) {
        row.tab_text.textContent = row.getHeaderText();
      }
      else {
        if(row.tab === self.active_tab) {
          self.theme.markTabActive(row.tab);
          row.container.style.display = '';
        }
        else {
          self.theme.markTabInactive(row.tab);
          row.container.style.display = 'none';
        }
      }
    });
  },
  setValue: function(value) {
    // Update the array's value, adding/removing rows when necessary
    value = value || [];
    
    if(!(value instanceof Array)) value = [value];
    
    var serialized = JSON.stringify(value);
    if(serialized === this.serialized) return;

    // Make sure value has between minItems and maxItems items in it
    if(this.schema.minItems) {
      while(value.length < this.schema.minItems) {
        value.push(this.getItemInfo(value.length).default);
      }
    }
    if(this.getMax() && value.length > this.getMax()) {
      value = value.slice(0,this.getMax());
    }

    var self = this;
    $each(value,function(i,val) {
      if(self.rows[i]) {
        // TODO: don't set the row's value if it hasn't changed
        self.rows[i].setValue(val);
      }
      else if(self.row_cache[i]) {
        self.rows[i] = self.row_cache[i];
        self.rows[i].setValue(val);
        self.rows[i].container.style.display = '';
        if(self.rows[i].tab) self.rows[i].tab.style.display = '';
        self.rows[i].register();
      }
      else {
        self.addRow(val);
      }
    });

    for(var j=value.length; j<self.rows.length; j++) {
      self.destroyRow(self.rows[j]);
      self.rows[j] = null;
    }
    self.rows = self.rows.slice(0,value.length);

    // Set the active tab
    var new_active_tab = null;
    $each(self.rows, function(i,row) {
      if(row.tab === self.active_tab) {
        new_active_tab = row.tab;
        return false;
      }
    });
    if(!new_active_tab && self.rows.length) new_active_tab = self.rows[0].tab;

    self.active_tab = new_active_tab;

    self.refreshValue();
    self.refreshTabs();
    
    self.jsoneditor.notifyWatchers(self.path);
    
    // TODO: sortable
  },
  refreshValue: function() {
    var self = this;
    var oldi = this.value? this.value.length : 0;
    this.value = [];

    $each(this.rows,function(i,editor) {
      // Get the value for this editor
      self.value[i] = editor.getValue();
    });
    
    if(oldi !== this.value.length) {
      // If we currently have minItems items in the array
      var minItems = this.schema.minItems && this.schema.minItems >= this.rows.length;
      
      $each(this.rows,function(i,editor) {
        // Hide the move down button for the last row
        if(i === self.rows.length - 1) {
          editor.movedown_button.style.display = 'none';
        }
        else {
          editor.movedown_button.style.display = '';
        }

        // Hide the delete button if we have minItems items
        if(minItems) {
          editor.delete_button.style.display = 'none';
        }
        else {
          editor.delete_button.style.display = '';
        }

        // Get the value for this editor
        self.value[i] = editor.getValue();
      });
      
      if(!this.value.length) {
        this.delete_last_row_button.style.display = 'none';
        this.remove_all_rows_button.style.display = 'none';
      }
      else if(this.value.length === 1) {      
        this.remove_all_rows_button.style.display = 'none';  

        // If there are minItems items in the array, hide the delete button beneath the rows
        if(minItems) {
          this.delete_last_row_button.style.display = 'none';
        }
        else {
          this.delete_last_row_button.style.display = '';
        }
      }
      else {
        // If there are minItems items in the array, hide the delete button beneath the rows
        if(minItems) {
          this.delete_last_row_button.style.display = 'none';
          this.delete_last_row_button.style.display = 'none';
        }
        else {
          this.delete_last_row_button.style.display = '';
          this.remove_all_rows_button.style.display = '';
        }
      }

      // If there are maxItems in the array, hide the add button beneath the rows
      if(this.getMax() && this.getMax() <= this.rows.length) {
        this.add_row_button.style.display = 'none';
      }
      else {
        this.add_row_button.style.display = '';
      } 
    }
  },
  addRow: function(value) {
    var self = this;
    var i = this.rows.length;
    
    self.rows[i] = this.getElementEditor(i);
    self.row_cache[i] = self.rows[i];

    if(self.tabs_holder) {
      self.rows[i].tab_text = document.createElement('span');
      self.rows[i].tab_text.textContent = self.rows[i].getHeaderText();
      self.rows[i].tab = self.theme.getTab(self.rows[i].tab_text);
      self.rows[i].tab.addEventListener('click', function(e) {
        self.active_tab = self.rows[i].tab;
        self.refreshTabs();
        e.preventDefault();
        e.stopPropagation();
      });

      self.theme.addTab(self.tabs_holder, self.rows[i].tab);
    }
    
    // Buttons to delete row, move row up, and move row down
    self.rows[i].delete_button = this.getButton(self.getItemTitle(),'delete','Delete '+self.getItemTitle());
    
    self.rows[i].delete_button.className += ' delete';
    self.rows[i].delete_button.setAttribute('data-i',i);
    self.rows[i].delete_button.addEventListener('click',function() {
      var i = this.getAttribute('data-i')*1;

      var value = self.getValue();

      var newval = [];
      var new_active_tab = null;
      $each(value,function(j,row) {
        if(j===i) {
          // If the one we're deleting is the active tab
          if(self.rows[j].tab === self.active_tab) {
            // Make the next tab active if there is one
            if(self.rows[j+1]) new_active_tab = self.rows[j+1].tab;
            // Otherwise, make the previous tab active if there is one
            else if(j) new_active_tab = self.rows[j-1].tab;
          }
          
          return; // If this is the one we're deleting
        }
        newval.push(row);
      });
      self.setValue(newval);
      if(new_active_tab) {
        self.active_tab = new_active_tab;
        self.refreshTabs();
      }
      
      if(self.parent) self.parent.onChildEditorChange(self);
      else self.jsoneditor.onChange();
    });
    self.rows[i].moveup_button = this.getButton('','moveup','Move up');
    self.rows[i].moveup_button.className += ' moveup';
    self.rows[i].moveup_button.setAttribute('data-i',i);
    self.rows[i].moveup_button.addEventListener('click',function() {
      var i = this.getAttribute('data-i')*1;

      if(i<=0) return;
      var rows = self.getValue();
      var tmp = rows[i-1];
      rows[i-1] = rows[i];
      rows[i] = tmp;

      self.setValue(rows);
      self.active_tab = self.rows[i-1].tab;
      self.refreshTabs();

      if(self.parent) self.parent.onChildEditorChange(self);
      else self.jsoneditor.onChange();
    });
    self.rows[i].movedown_button = this.getButton('','movedown','Move down');
    self.rows[i].movedown_button.className += ' movedown';
    self.rows[i].movedown_button.setAttribute('data-i',i);
    self.rows[i].movedown_button.addEventListener('click',function() {
      var i = this.getAttribute('data-i')*1;

      var rows = self.getValue();
      if(i>=rows.length-1) return;
      var tmp = rows[i+1];
      rows[i+1] = rows[i];
      rows[i] = tmp;

      self.setValue(rows);
      self.active_tab = self.rows[i+1].tab;
      self.refreshTabs();
      if(self.parent) self.parent.onChildEditorChange(self);
      else self.jsoneditor.onChange();
    });

    var controls_holder = self.rows[i].title_controls || self.rows[i].array_controls;
    if(controls_holder) {
      controls_holder.appendChild(self.rows[i].delete_button);
      if(i) controls_holder.appendChild(self.rows[i].moveup_button);
      controls_holder.appendChild(self.rows[i].movedown_button);
    }

    if(value) self.rows[i].setValue(value);
    self.refreshTabs();
  },
  addControls: function() {
    var self = this;
    
    this.collapsed = false;
    this.toggle_button = this.getButton('','collapse','Collapse');
    this.title_controls.appendChild(this.toggle_button);
    var row_holder_display = self.row_holder.style.display;
    var controls_display = self.controls.style.display;
    this.toggle_button.addEventListener('click',function() {
      if(self.collapsed) {
        self.collapsed = false;
        self.row_holder.style.display = row_holder_display;
        if(self.tabs_holder) self.tabs_holder.style.display = '';
        self.controls.style.display = controls_display;
        self.setButtonText(this,'','collapse','Collapse');
      }
      else {
        self.collapsed = true;
        self.row_holder.style.display = 'none';
        if(self.tabs_holder) self.tabs_holder.style.display = 'none';
        self.controls.style.display = 'none';
        self.setButtonText(this,'','expand','Expand');
      }
    });

    // If it should start collapsed
    if(this.options.collapsed) {
      $trigger(this.toggle_button,'click');
    }
    
    // Collapse button disabled
    if(this.schema.options && typeof this.schema.options.disable_collapse !== "undefined") {
      if(this.schema.options.disable_collapse) this.toggle_button.style.display = 'none';
    }
    else if(this.jsoneditor.options.disable_collapse) {
      this.toggle_button.style.display = 'none';
    }
    
    // Add "new row" and "delete last" buttons below editor
    this.add_row_button = this.getButton(this.getItemTitle(),'add','Add '+this.getItemTitle());
    
    this.add_row_button.addEventListener('click',function() {
      var i = self.rows.length;
      if(self.row_cache[i]) {
        self.rows[i] = self.row_cache[i];
        self.rows[i].container.style.display = '';
        if(self.rows[i].tab) self.rows[i].tab.style.display = '';
        self.rows[i].register();
      }
      else {
        self.addRow();
      }
      self.active_tab = self.rows[i].tab;
      self.refreshTabs();
      self.refreshValue();
      if(self.parent) self.parent.onChildEditorChange(self);
      else self.jsoneditor.onChange();
      self.jsoneditor.notifyWatchers(self.path);
    });
    self.controls.appendChild(this.add_row_button);

    this.delete_last_row_button = this.getButton('Last '+this.getItemTitle(),'delete','Delete Last '+this.getItemTitle());
    this.delete_last_row_button.addEventListener('click',function() {
      var rows = self.getValue();
      
      var new_active_tab = null;
      if(self.rows.length > 1 && self.rows[self.rows.length-1].tab === self.active_tab) new_active_tab = self.rows[self.rows.length-2].tab;
      
      rows.pop();
      self.setValue(rows);
      if(new_active_tab) {
        self.active_tab = new_active_tab;
        self.refreshTabs();
      }
      if(self.parent) self.parent.onChildEditorChange(self);
      else self.jsoneditor.onChange();
    });
    self.controls.appendChild(this.delete_last_row_button);

    this.remove_all_rows_button = this.getButton('All','delete','Delete All');
    this.remove_all_rows_button.addEventListener('click',function() {
      self.setValue([]);
      if(self.parent) self.parent.onChildEditorChange(self);
      else self.jsoneditor.onChange();
    });
    self.controls.appendChild(this.remove_all_rows_button);

    if(self.tabs) {
      this.add_row_button.style.width = '100%';
      this.add_row_button.style.textAlign = 'left';
      this.add_row_button.style.marginBottom = '3px';
      
      this.delete_last_row_button.style.width = '100%';
      this.delete_last_row_button.style.textAlign = 'left';
      this.delete_last_row_button.style.marginBottom = '3px';
      
      this.remove_all_rows_button.style.width = '100%';
      this.remove_all_rows_button.style.textAlign = 'left';
      this.remove_all_rows_button.style.marginBottom = '3px';
    }
  },
  showValidationErrors: function(errors) {
    var self = this;

    // Get all the errors that pertain to this editor
    var my_errors = [];
    var other_errors = [];
    $each(errors, function(i,error) {
      if(error.path === self.path) {
        my_errors.push(error);
      }
      else {
        other_errors.push(error);
      }
    });

    // Show errors for this editor
    if(this.error_holder) {
      if(my_errors.length) {
        var message = [];
        this.error_holder.innerHTML = '';
        this.error_holder.style.display = '';
        $each(my_errors, function(i,error) {
          self.error_holder.appendChild(self.theme.getErrorMessage(error.message));
        });
      }
      // Hide error area
      else {
        this.error_holder.style.display = 'none';
      }
    }

    // Show errors for child editors
    $each(this.rows, function(i,row) {
      row.showValidationErrors(other_errors);
    });
  }
});

JSONEditor.defaults.editors.table = JSONEditor.defaults.editors.array.extend({
  addProperty: function() {
    this._super();
    if(this.value.length) this.table.style.display = '';
  },
  removeProperty: function() {
    this._super();
    this.table.style.display = 'none';
  },
  register: function() {
    this._super();
    if(this.rows) {
      for(var i=0; i<this.rows.length; i++) {
        this.rows[i].register();
      }
    }
  },
  unregister: function() {
    this._super();
    if(this.rows) {
      for(var i=0; i<this.rows.length; i++) {
        this.rows[i].unregister();
      }
    }
  },
  getNumColumns: function() {
    return Math.max(Math.min(12,this.width),3);
  },
  build: function() {
    this.rows = [];
    var self = this;

    this.schema.items = this.schema.items || [];

    this.table = this.theme.getTable();
    this.container.appendChild(this.table);
    this.thead = this.theme.getTableHead();
    this.table.appendChild(this.thead);
    this.header_row = this.theme.getTableRow();
    this.thead.appendChild(this.header_row);
    this.row_holder = this.theme.getTableBody();
    this.table.appendChild(this.row_holder);

    // Determine the default value of array element
    var tmp = this.getElementEditor(0,true);
    this.item_default = tmp.getDefault();
    this.item_title = this.schema.items.title || 'row';
    this.width = tmp.getNumColumns();

    // Build header row for table
    if(tmp.getChildEditors()) {
      this.item_has_child_editors = true;      
    }
    
    if(!this.getOption('compact',false)) {
      this.title = this.theme.getHeader(this.getTitle());
      this.container.appendChild(this.title);
      this.title_controls = this.theme.getHeaderButtonHolder();
      this.title.appendChild(this.title_controls);
      this.panel = this.theme.getIndentedPanel();
      this.container.appendChild(this.panel);
      if(this.schema.description) {
        this.description = this.theme.getDescription(this.schema.description);
        this.panel.appendChild(this.description);
      }
      this.error_holder = document.createElement('div');
      this.panel.appendChild(this.error_holder);
    }
    else {
      this.panel = document.createElement('div');
      this.container.appendChild(this.panel);
    }

    this.panel.appendChild(this.table);
    this.controls = this.theme.getButtonHolder();
    this.panel.appendChild(this.controls);

    if(this.item_has_child_editors) {
      $each(tmp.getChildEditors(), function(i,editor) {
        var th = self.theme.getTableHeaderCell(editor.getTitle());
        if(editor.options.hidden) th.style.display = 'none';
        self.header_row.appendChild(th);
      });
    }
    else {
      self.header_row.appendChild(self.theme.getTableHeaderCell(this.item_title));
    }

    tmp.destroy();
    this.row_holder.innerHTML = '';

    // Row Controls column
    self.header_row.appendChild(self.theme.getTableHeaderCell(" "));

    // Add controls
    this.addControls();
    
    this.jsoneditor.notifyWatchers(this.path);
  },
  onChildEditorChange: function(editor) {
    this.refreshValue();
    this._super();
  },
  getItemDefault: function() {
    return $extend({},{default:this.item_default}).default;
  },
  getItemTitle: function() {
    return this.item_title;
  },
  getElementEditor: function(i,ignore) {
    var schema_copy = $extend({},this.schema.items);
    var editor = this.jsoneditor.getEditorClass(schema_copy, this.jsoneditor);
    var row = this.row_holder.appendChild(this.theme.getTableRow());
    var holder = row;
    if(!this.item_has_child_editors) {
      holder = this.theme.getTableCell();
      row.appendChild(holder);
    }

    if(ignore) {
      holder.addEventListener('change_header_text',function(e) {
        e.preventDefault();
        e.stopPropagation();
      });
    }

    var ret = this.jsoneditor.createEditor(editor,{
      jsoneditor: this.jsoneditor,
      schema: schema_copy,
      container: holder,
      path: this.path+'.'+i,
      parent: this,
      compact: true,
      table_row: true
    });

    ret.controls_cell = row.appendChild(this.theme.getTableCell());
    ret.row = row;
    ret.table_controls = this.theme.getButtonHolder();
    ret.controls_cell.appendChild(ret.table_controls);
    ret.table_controls.style.margin = 0;
    ret.table_controls.style.padding = 0;
    
    return ret;
  },
  destroy: function() {
    this.innerHTML = '';
    if(this.title) this.title.parentNode.removeChild(this.title);
    if(this.description) this.description.parentNode.removeChild(this.description);
    if(this.row_holder && this.row_holder.parentNode) this.row_holder.parentNode.removeChild(this.row_holder);
    this.table.parentNode.removeChild(this.table);
    if(this.panel) this.panel.parentNode.removeChild(this.panel);

    this.rows = this.title = this.description = this.row_holder = this.table = this.panel = null;

    this._super();
  },
  empty: function() {
    if(!this.rows) return;
    var self = this;
    $each(this.rows,function(i,row) {
      if(!self.item_has_child_editors) {
        row.row.parentNode.removeChild(row.row);
      }
      row.destroy();
      self.rows[i] = null;
    });
    self.rows = [];
  },
  setValue: function(value) {
    // Update the array's value, adding/removing rows when necessary
    value = value || [];

    // Make sure value has between minItems and maxItems items in it
    if(this.schema.minItems) {
      while(value.length < this.schema.minItems) {
        value.push(this.getItemDefault());
      }
    }
    if(this.schema.maxItems && value.length > this.schema.maxItems) {
      value = value.slice(0,this.schema.maxItems);
    }
    
    var serialized = JSON.stringify(value);
    if(serialized === this.serialized) return;

    var numrows_changed = false;

    var self = this;
    $each(value,function(i,val) {
      if(self.rows[i]) {
        // TODO: don't set the row's value if it hasn't changed
        self.rows[i].setValue(val);
      }
      else {
        self.addRow(val);
        numrows_changed = true;
      }
    });

    for(var j=value.length; j<self.rows.length; j++) {
      var holder = self.rows[j].container;
      if(!self.item_has_child_editors) {
        self.rows[j].row.parentNode.removeChild(self.rows[j].row);
      }
      self.rows[j].destroy();
      if(holder.parentNode) holder.parentNode.removeChild(holder);
      self.rows[j] = null;
      numrows_changed = true;
    }
    self.rows = self.rows.slice(0,value.length);

    self.refreshValue();
    if(numrows_changed) self.refreshRowButtons();

    self.jsoneditor.notifyWatchers(self.path);
          
    // TODO: sortable
  },
  refreshRowButtons: function() {
    var self = this;
    
    // If we currently have minItems items in the array
    var minItems = this.schema.minItems && this.schema.minItems >= this.rows.length;
    
    $each(this.rows,function(i,editor) {
      // Hide the move down button for the last row
      if(i === self.rows.length - 1) {
        editor.movedown_button.style.display = 'none';
      }
      else {
        editor.movedown_button.style.display = '';
      }

      // Hide the delete button if we have minItems items
      if(minItems) {
        editor.delete_button.style.display = 'none';
      }
      else {
        editor.delete_button.style.display = '';
      }
    });
  
    if(!this.value.length) {
      this.delete_last_row_button.style.display = 'none';
      this.remove_all_rows_button.style.display = 'none';
      this.table.style.display = 'none';
    }
    else if(this.value.length === 1) {
      this.table.style.display = '';
      this.remove_all_rows_button.style.display = 'none';

      // If there are minItems items in the array, hide the delete button beneath the rows
      if(minItems) {
        this.delete_last_row_button.style.display = 'none';
      }
      else {
        this.delete_last_row_button.style.display = '';
      }
    }
    else {
      this.table.style.display = '';
      // If there are minItems items in the array, hide the delete button beneath the rows
      if(minItems) {
        this.delete_last_row_button.style.display = 'none';
        this.delete_last_row_button.style.display = 'none';
      }
      else {
        this.delete_last_row_button.style.display = '';
        this.remove_all_rows_button.style.display = '';
      }
    }

    // If there are maxItems in the array, hide the add button beneath the rows
    if(this.schema.maxItems && this.schema.maxItems <= this.rows.length) {
      this.add_row_button.style.display = 'none';
    }
    else {
      this.add_row_button.style.display = '';
    }
  },
  refreshValue: function() {
    var self = this;
    this.value = [];

    $each(this.rows,function(i,editor) {
      // Get the value for this editor
      self.value[i] = editor.getValue();
    });
    this.serialized = JSON.stringify(this.value);
  },
  addRow: function(value) {
    var self = this;
    var i = this.rows.length;

    self.rows[i] = this.getElementEditor(i);

    // Buttons to delete row, move row up, and move row down
    self.rows[i].delete_button = this.getButton('','delete','Delete');
    self.rows[i].delete_button.className += ' delete';
    self.rows[i].delete_button.setAttribute('data-i',i);
    self.rows[i].delete_button.addEventListener('click',function() {
      var i = this.getAttribute('data-i')*1;

      var value = self.getValue();

      var newval = [];
      $each(value,function(j,row) {
        if(j===i) return; // If this is the one we're deleting
        newval.push(row);
      });
      self.setValue(newval);
      
      if(self.parent) self.parent.onChildEditorChange(self);
      else self.jsoneditor.onChange();
    });
    self.rows[i].moveup_button = this.getButton('','moveup','Move up');
    self.rows[i].moveup_button.className += ' moveup';
    self.rows[i].moveup_button.setAttribute('data-i',i);
    self.rows[i].moveup_button.addEventListener('click',function() {
      var i = this.getAttribute('data-i')*1;

      if(i<=0) return;
      var rows = self.getValue();
      var tmp = rows[i-1];
      rows[i-1] = rows[i];
      rows[i] = tmp;

      self.setValue(rows);
      if(self.parent) self.parent.onChildEditorChange(self);
      else self.jsoneditor.onChange();
    });
    self.rows[i].movedown_button = this.getButton('','movedown','Move down');
    self.rows[i].movedown_button.className += ' movedown';
    self.rows[i].movedown_button.setAttribute('data-i',i);
    self.rows[i].movedown_button.addEventListener('click',function() {
      var i = this.getAttribute('data-i')*1;
      var rows = self.getValue();
      if(i>=rows.length-1) return;
      var tmp = rows[i+1];
      rows[i+1] = rows[i];
      rows[i] = tmp;

      self.setValue(rows);
      if(self.parent) self.parent.onChildEditorChange(self);
      else self.jsoneditor.onChange();
    });

    var controls_holder = self.rows[i].table_controls;
    controls_holder.appendChild(self.rows[i].delete_button);
    if(i) controls_holder.appendChild(self.rows[i].moveup_button);
    controls_holder.appendChild(self.rows[i].movedown_button);

    if(value) self.rows[i].setValue(value);
    
    self.jsoneditor.notifyWatchers(self.path);
  },
  addControls: function() {
    var self = this;

    this.collapsed = false;
    this.toggle_button = this.getButton('','collapse','Collapse');
    this.title_controls.appendChild(this.toggle_button);
    this.toggle_button.addEventListener('click',function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      if(self.collapsed) {
        self.collapsed = false;
        self.panel.style.display = '';
        self.setButtonText(this,'','collapse','Collapse');
      }
      else {
        self.collapsed = true;
        self.panel.style.display = 'none';
        self.setButtonText(this,'','expand','Expand');
      }
    });

    // If it should start collapsed
    if(this.options.collapsed) {
      $trigger(this.toggle_button,'click');
    }
    
    // Collapse button disabled
    if(this.schema.options && typeof this.schema.options.disable_collapse !== "undefined") {
      if(this.schema.options.disable_collapse) this.toggle_button.style.display = 'none';
    }
    else if(this.jsoneditor.options.disable_collapse) {
      this.toggle_button.style.display = 'none';
    }

    // Add "new row" and "delete last" buttons below editor
    this.add_row_button = this.getButton(this.getItemTitle(),'add','Add '+this.getItemTitle());
    this.add_row_button.addEventListener('click',function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      self.addRow();
      self.refreshValue();
      self.refreshRowButtons();
      if(self.parent) self.parent.onChildEditorChange(self);
      else self.jsoneditor.onChange();
    });
    self.controls.appendChild(this.add_row_button);

    this.delete_last_row_button = this.getButton('Last '+this.getItemTitle(),'delete','Delete Last '+this.getItemTitle());
    this.delete_last_row_button.addEventListener('click',function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      var rows = self.getValue();
      rows.pop();
      self.setValue(rows);
      if(self.parent) self.parent.onChildEditorChange(self);
      else self.jsoneditor.onChange();
    });
    self.controls.appendChild(this.delete_last_row_button);

    this.remove_all_rows_button = this.getButton('All','delete','Delete All');
    this.remove_all_rows_button.addEventListener('click',function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      self.setValue([]);
      if(self.parent) self.parent.onChildEditorChange(self);
      else self.jsoneditor.onChange();
    });
    self.controls.appendChild(this.remove_all_rows_button);
  }
});

// Multiple Editor (for when `type` is an array)
JSONEditor.defaults.editors.multiple = JSONEditor.AbstractEditor.extend({
  getDefault: function() {
    return this.schema.default || null;
  },
  register: function() {
    if(this.editors) {
      for(var i=0; i<this.editors.length; i++) {
        if(!this.editors[i]) continue;
        this.editors[i].unregister();
      }
      if(this.editors[this.type]) this.editors[this.type].register();
    }
    this._super();
  },
  getNumColumns: function() {
    return Math.max(this.editors[this.type].getNumColumns(),4);
  },
  enable: function() {
    if(this.editors) {
      for(var i=0; i<this.editors.length; i++) {
        if(!this.editors[i]) continue;
        this.editors[i].enable();
      }
    }
    this.switcher.disabled = false;
    this._super();
  },
  disable: function() {
    if(this.editors) {
      for(var i=0; i<this.editors.length; i++) {
        if(!this.editors[i]) continue;
        this.editors[i].disable();
      }
    }
    this.switcher.disabled = true;
    this._super();
  },
  unregister: function() {
    this._super();
    if(this.editors) {
      for(var i=0; i<this.editors.length; i++) {
        if(!this.editors[i]) continue;
        this.editors[i].unregister();
      }
    }
  },
  switchEditor: function(i) {
    var self = this;
    
    if(!this.editors[i]) {
      this.buildChildEditor(i);
    }
    
    self.type = i;

    self.register();

    var current_value = self.getValue();

    $each(self.editors,function(type,editor) {
      if(!editor) return;
      if(self.type === type) {
        editor.setValue(current_value,true);
        editor.container.style.display = '';
      }
      else editor.container.style.display = 'none';
    });
    self.refreshValue();
    
    if(self.parent) self.parent.onChildEditorChange(self);
    else self.jsoneditor.onChange();
  },
  buildChildEditor: function(i) {
    var self = this;
    var type = this.types[i];
    var holder = self.theme.getChildEditorHolder();
    self.editor_holder.appendChild(holder);

    var schema;
    
    if(typeof type === "string") {
      schema = $extend({},self.schema);
      schema.type = type;
    }
    else {
      schema = $extend({},self.schema,type);

      // If we need to merge `required` arrays
      if(type.required && type.required instanceof Array && self.schema.required && self.schema.required instanceof Array) {
        schema.required = self.schema.required.concat(type.required);
      }
    }

    var editor = self.jsoneditor.getEditorClass(schema, self.jsoneditor);

    self.editors[i] = self.jsoneditor.createEditor(editor,{
      jsoneditor: self.jsoneditor,
      schema: schema,
      container: holder,
      path: self.path,
      parent: self,
      required: true
    });
    if(self.editors[i].header) self.editors[i].header.style.display = 'none';
    
    self.editors[i].option = self.switcher_options[i];
    
    holder.addEventListener('change_header_text',function() {
      self.refreshHeaderText();
    });

    if(i !== self.type) holder.style.display = 'none';
  },
  build: function() {
    var self = this;
    var container = this.container;

    this.header = this.label = this.theme.getFormInputLabel(this.getTitle());
    this.container.appendChild(this.header);

    this.types = [];
    
    if(this.schema.oneOf) {
      this.oneOf = true;
      this.types = this.schema.oneOf;
      delete this.schema.oneOf;
    }
    else {
      if(!this.schema.type || this.schema.type === "any") {
        this.types = ['string','number','integer','boolean','object','array','null'];
        
        // If any of these primitive types are disallowed
        if(this.schema.disallow) {
          var disallow = this.schema.disallow;
          if(typeof schema.disallow !== 'object' || !(schema.disallow instanceof Array)) {
            disallow = [this.schema.disallow];
          }
          var allowed_types = [];
          $each(this.types,function(i,type) {
            if(disallow.indexOf(type) === -1) allowed_types.push(type);
          });
          this.types = allowed_types;
        }
      }
      else if(this.schema.type instanceof Array) {
        this.types = this.schema.type;
      }
      else {
        this.types = [this.schema.type];
      }
      delete this.schema.type;
    }
    
    this.display_text = this.getDisplayText(this.types);

    this.switcher = this.theme.getSwitcher(this.display_text);
    container.appendChild(this.switcher);
    this.switcher.addEventListener('change',function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      self.switchEditor(self.display_text.indexOf(this.value));
    });
    this.switcher.style.marginBottom = 0;
    this.switcher.style.width = 'auto';
    this.switcher.style.display = 'inline-block';
    this.switcher.style.marginLeft = '5px';

    this.editor_holder = document.createElement('div');
    container.appendChild(this.editor_holder);
    this.type = 0;

    this.editors = [];
    this.validators = [];
    this.switcher_options = this.theme.getSwitcherOptions(this.switcher);
    $each(this.types,function(i,type) {
      self.editors[i] = false;
      
      var schema;
      
      if(typeof type === "string") {
        schema = $extend({},self.schema);
        schema.type = type;
      }
      else {
        schema = $extend({},self.schema,type);

        // If we need to merge `required` arrays
        if(type.required && type.required instanceof Array && self.schema.required && self.schema.required instanceof Array) {
          schema.required = self.schema.required.concat(type.required);
        }
      }

      self.validators[i] = new JSONEditor.Validator(schema,{
        required_by_default: self.jsoneditor.options.required_by_default,
        no_additional_properties: self.jsoneditor.options.no_additional_properties
      });
    });
    
    this.switchEditor(0);

    this.refreshValue();
    this.refreshHeaderText();

    this.register();
  },
  onChildEditorChange: function(editor) {
    if(this.editors[this.type]) {
      this.refreshHeaderText();
      this.refreshValue();
    }
    
    this._super();
  },
  refreshHeaderText: function() {
    var schemas = [];
    $each(this.validators, function(i,validator) {
      schemas.push(validator.schema);
    });
    var display_text = this.getDisplayText(schemas);
    $each(this.switcher_options, function(i,option) {
      option.textContent = display_text[i];
    });
  },
  refreshValue: function() {
    this.value = this.editors[this.type].getValue();
  },
  setValue: function(val,initial) {
    // Determine type by getting the first one that validates
    var self = this;
    $each(this.validators, function(i,validator) {
      if(!validator.validate(val).length) {
        self.type = i;
        self.switcher.value = self.display_text[i];
        return false;
      }
    });
    
    this.switchEditor(this.type);

    this.editors[this.type].setValue(val,initial);

    this.refreshValue();
    this.jsoneditor.notifyWatchers(this.path);
  },
  destroy: function() {
    $each(this.editors, function(type,editor) {
      if(editor) editor.destroy();
    });
    this.editor_holder.parentNode.removeChild(this.editor_holder);
    this.switcher.parentNode.removeChild(this.switcher);
    this._super();
  },
  showValidationErrors: function(errors) {
    var self = this;
    
    // oneOf error paths need to remove the oneOf[i] part before passing to child editors
    if(this.oneOf) {
      $each(this.editors,function(i,editor) {
        if(!editor) return;
        var check = self.path+'.oneOf['+i+']';
        var new_errors = [];
        $each(errors, function(j,error) {
          if(error.path.substr(0,check.length)===check) {
            var new_error = $extend({},error);
            new_error.path = self.path+new_error.path.substr(check.length);
            new_errors.push(new_error);
          }
        });
        
        editor.showValidationErrors(new_errors);
      });
    }
    else {
      $each(this.editors,function(type,editor) {
        if(!editor) return;
        editor.showValidationErrors(errors);
      });
    }
  }
});

// Enum Editor (used for objects and arrays with enumerated values)
JSONEditor.defaults.editors.enum = JSONEditor.AbstractEditor.extend({
  getDefault: function() {
    return this.schema.enum[0];
  },
  addProperty: function() {
    this._super();
    this.display_area.style.display = '';
    this.theme.enableHeader(this.title);
  },
  removeProperty: function() {
    this._super();
    this.display_area.style.display = 'none';
    this.theme.disableHeader(this.title);
  },
  getNumColumns: function() {
    return 4;
  },
  build: function() {
    var container = this.getContainer();
    this.title = this.header = this.label = this.getTheme().getFormInputLabel(this.getTitle());
    this.container.appendChild(this.title);

    this.options.enum_titles = this.options.enum_titles || [];

    this.enum = this.schema.enum;
    this.selected = 0;
    this.select_options = [];
    this.html_values = [];

    var self = this;
    for(var i=0; i<this.enum.length; i++) {
      this.select_options[i] = this.options.enum_titles[i] || "Value "+(i+1);
      this.html_values[i] = this.getHTML(this.enum[i]);
    }

    // Switcher
    this.switcher = this.theme.getSwitcher(this.select_options);
    this.container.appendChild(this.switcher);
    this.switcher.style.width = 'auto';
    this.switcher.style.display = 'inline-block';
    this.switcher.style.marginLeft = '5px';
    this.switcher.style.marginBottom = 0;

    // Display area
    this.display_area = this.theme.getIndentedPanel();
    this.display_area.style.paddingTop = 0;
    this.display_area.style.paddingBottom = 0;
    this.container.appendChild(this.display_area);

    this.switcher.addEventListener('change',function() {
      self.selected = self.select_options.indexOf(this.value);
      self.value = self.enum[self.selected];
      self.refreshValue();
      
      if(self.parent) self.parent.onChildEditorChange(self);
      else self.jsoneditor.onChange();
    });
    this.value = this.enum[0];
    this.refreshValue();
    this.jsoneditor.notifyWatchers(this.path);

    if(this.enum.length === 1) this.switcher.style.display = 'none';
  },
  refreshValue: function() {
    var self = this;
    self.selected = -1;
    var stringified = JSON.stringify(this.value);
    $each(this.enum, function(i, el) {
      if(stringified === JSON.stringify(el)) {
        self.selected = i;
        return false;
      }
    });

    if(self.selected<0) {
      self.setValue(self.enum[0]);
      return;
    }

    this.switcher.value = this.select_options[this.selected];
    this.display_area.innerHTML = this.html_values[this.selected];
  },
  enable: function() {
    if(!this.always_disabled) this.switcher.disabled = false;
    this._super();
  },
  disable: function() {
    this.switcher.disabled = true;
    this._super();
  },
  getHTML: function(el) {
    var self = this;

    if(el === null) {
      return '<em>null</em>';
    }
    // Array or Object
    else if(typeof el === "object") {
      // TODO: use theme
      var ret = '';

      $each(el,function(i,child) {
        var html = self.getHTML(child);

        // Add the keys to object children
        if(!(el instanceof Array)) {
          // TODO: use theme
          html = '<div><em>'+i+'</em>: '+html+'</div>';
        }

        // TODO: use theme
        ret += '<li>'+html+'</li>';
      });
      
      if(el instanceof Array) ret = '<ol>'+ret+'</ol>';
      else ret = "<ul style='margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;'>"+ret+'</ul>';

      return ret;
    }
    // Boolean
    else if(typeof el === "boolean") {
      return el? 'true' : 'false';
    }
    // String
    else if(typeof el === "string") {
      return el.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }
    // Number
    else {
      return el;
    }
  },
  setValue: function(val) {
    if(this.value !== val) {
      this.value = val;
      this.refreshValue();
      this.jsoneditor.notifyWatchers(this.path);
    }
  },
  destroy: function() {
    this.display_area.parentNode.removeChild(this.display_area);
    this.title.parentNode.removeChild(this.title);
    this.switcher.parentNode.removeChild(this.switcher);

    this._super();
  }
});

JSONEditor.defaults.editors.select = JSONEditor.AbstractEditor.extend({
  getDefault: function() {
    return this.schema.default || '';
  },
  setValue: function(value,initial) {
    value = this.typecast(value||'');

    // Sanitize value before setting it
    var sanitized = value;
    if(this.enum_values.indexOf(sanitized) < 0) {
      sanitized = this.enum_values[0];
    }

    if(this.value === sanitized) {
      return;
    }

    this.input.value = this.enum_options[this.enum_values.indexOf(sanitized)];
    this.value = sanitized;
    this.jsoneditor.notifyWatchers(this.path);
  },
  register: function() {
    this._super();
    if(!this.input) return;
    this.input.setAttribute('name',this.formname);
  },
  unregister: function() {
    this._super();
    if(!this.input) return;
    this.input.removeAttribute('name');
  },
  getNumColumns: function() {
    var longest_text = this.getTitle().length;
    for(var i=0; i<this.enum_options.length; i++) {
      longest_text = Math.max(longest_text,this.enum_options[i].length+4);
    }
    return Math.min(12,Math.max(longest_text/7,2));
  },
  typecast: function(value) {
    if(this.schema.type === "boolean") {
      return !!value;
    }
    else if(this.schema.type === "number") {
      return 1*value;
    }
    else if(this.schema.type === "integer") {
      return Math.floor(value*1);
    }
    else {
      return ""+value;
    }
  },
  getValue: function() {
    return this.value;
  },
  removeProperty: function() {
    this._super();
    this.input.style.display = 'none';
    if(this.description) this.description.style.display = 'none';
    this.theme.disableLabel(this.label);
  },
  addProperty: function() {
    this._super();
    this.input.style.display = '';
    if(this.description) this.description.style.display = '';
    this.theme.enableLabel(this.label);
  },
  build: function() {
    var self = this;
    if(!this.getOption('compact',false)) this.header = this.label = this.theme.getFormInputLabel(this.getTitle());
    if(this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description);

    this.input_type = 'select';
    this.enum_options = [];
    this.enum_values = [];
    this.enum_display = [];

    // Enum options enumerated
    if(this.schema.enum) {
      $each(this.schema.enum,function(i,option) {
        self.enum_options[i] = ""+option;
        self.enum_display[i] = ""+option;
        self.enum_values[i] = self.typecast(option);
      });
    }
    // Boolean
    else if(this.schema.type === "boolean") {
      self.enum_display = ['true','false'];
      self.enum_options = ['1',''];
      self.enum_values = [true,false];
    }
    // Other, not supported
    else {
      throw "'select' editor requires the enum property to be set.";
    }

    if(this.getOption('compact')) this.container.setAttribute('class',this.container.getAttribute('class')+' compact');

    this.input = this.theme.getSelectInput(this.enum_options);
    this.theme.setSelectOptions(this.input,this.enum_options,this.enum_display);

    if(this.schema.readOnly || this.schema.readonly) {
      this.always_disabled = true;
      this.input.disabled = true;
    }

    this.input.addEventListener('change',function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      var val = this.value;

      var sanitized = val;
      if(self.enum_options.indexOf(val) === -1) {
        sanitized = self.enum_options[0];
      }

      self.value = self.enum_values[self.enum_options.indexOf(val)];
      
      if(self.parent) self.parent.onChildEditorChange(self);
      else self.jsoneditor.onChange();
      self.jsoneditor.notifyWatchers(self.path);
    });

    this.control = this.getTheme().getFormControl(this.label, this.input, this.description);
    this.container.appendChild(this.control);

    this.value = this.enum_values[0];

    // If the Select2 library is loaded use it when we have lots of items
    if(window.$ && $.fn && $.fn.select2 && this.enum_options.length > 2) {
      $(this.input).select2();
    }
    
    this.register();

    self.theme.afterInputReady(self.input);
    this.jsoneditor.notifyWatchers(this.path);
  },
  enable: function() {
    if(!this.always_disabled) this.input.disabled = false;
    this._super();
  },
  disable: function() {
    this.input.disabled = true;
    this._super();
  },
  destroy: function() {
    if(this.label) this.label.parentNode.removeChild(this.label);
    if(this.description) this.description.parentNode.removeChild(this.description);
    this.input.parentNode.removeChild(this.input);

    this._super();
  }
});

JSONEditor.defaults.editors.multiselect = JSONEditor.AbstractEditor.extend({
  getDefault: function() {
    return [];
  },
  build: function() {
    var self = this, i;
    if(!this.getOption('compact',false)) this.header = this.label = this.theme.getFormInputLabel(this.getTitle());
    if(this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description);

    this.select_options = {};
    this.select_values = {};

    var e = this.schema.items.enum || [];
    var options = [];
    for(i=0; i<e.length; i++) {
      // If the sanitized value is different from the enum value, don't include it
      if(this.sanitize(e[i]) !== e[i]) continue;

      options.push(e[i]+"");
      this.select_values[e[i]+""] = e[i];
    }

    if((!this.schema.format && options.length < 8) || this.schema.format === "checkbox") {
      this.input_type = 'checkboxes';

      this.inputs = {};
      this.controls = {};
      for(i=0; i<options.length; i++) {
        this.inputs[options[i]] = this.theme.getCheckbox();
        this.select_options[options[i]] = this.inputs[options[i]];
        var label = this.theme.getCheckboxLabel(options[i]);
        this.controls[options[i]] = this.theme.getFormControl(label, this.inputs[options[i]]);
      }

      this.control = this.theme.getMultiCheckboxHolder(this.controls,this.label,this.description);
    }
    else {
      this.input_type = 'select';
      this.input = this.theme.getSelectInput(options);
      this.input.multiple = true;
      this.input.size = Math.min(10,options.length);

      for(i=0; i<options.length; i++) {
        this.select_options[options[i]] = this.input.children[i];
      }

      if(this.schema.readOnly || this.schema.readonly) {
        this.always_disabled = true;
        this.input.disabled = true;
      }

      this.control = this.getTheme().getFormControl(this.label, this.input, this.description);
    }

    this.container.appendChild(this.control);
    this.control.addEventListener('change',function(e) {
      e.preventDefault();
      e.stopPropagation();

      var new_value = [];
      for(i = 0; i<options.length; i++) {
        if(self.select_options[options[i]].selected || self.select_options[options[i]].checked) new_value.push(self.select_values[options[i]]);
      }

      self.updateValue(new_value);

      if(self.parent) self.parent.onChildEditorChange(self);
      else self.jsoneditor.onChange();
      self.jsoneditor.notifyWatchers(self.path);
    });
  },
  setValue: function(value, initial) {
    var i;
    value = value || [];
    if(typeof value !== "object") value = [value];
    else if(!(value instanceof Array)) value = [];

    // Make sure we are dealing with an array of strings so we can check for strict equality
    for(i=0; i<value.length; i++) {
      if(typeof value[i] !== "string") value[i] += "";
    }

    // Update selected status of options
    for(i in this.select_options) {
      if(!this.select_options.hasOwnProperty(i)) continue;

      this.select_options[i][this.input_type === "select"? "selected" : "checked"] = (value.indexOf(i) !== -1);
    }

    if(this.updateValue(value)) {
      if(this.parent) this.onChildEditorChange(this);
      else this.jsoneditor.onChange();
    }

    this.jsoneditor.notifyWatchers(this.path);
  },
  register: function() {
    this._super();
    if(!this.input) return;
    this.input.setAttribute('name',this.formname);
  },
  unregister: function() {
    this._super();
    if(!this.input) return;
    this.input.removeAttribute('name');
  },
  getNumColumns: function() {
    var longest_text = this.getTitle().length;
    for(var i in this.select_values) {
      if(!this.select_values.hasOwnProperty(i)) continue;
      longest_text = Math.max(longest_text,(this.select_values[i]+"").length+4);
    }

    return Math.min(12,Math.max(longest_text/7,2));
  },
  updateValue: function(value) {
    var changed = false;
    var new_value = [];
    for(var i=0; i<value.length; i++) {
      if(!this.select_options[value[i]+""]) {
        changed = true;
        continue;
      }
      var sanitized = this.sanitize(this.select_values[value[i]]);
      new_value.push(sanitized);
      if(sanitized !== value[i]) changed = true;
    }
    this.value = new_value;
    return changed;
  },
  sanitize: function(value) {
    if(this.schema.items.type === "number") {
      return 1*value;
    }
    else if(this.schema.items.type === "integer") {
      return Math.floor(value*1);
    }
    else {
      return ""+value;
    }
  },
  enable: function() {
    if(!this.always_disabled) this.input.disabled = false;
    this._super();
  },
  disable: function() {
    this.input.disabled = true;
    this._super();
  }
});

JSONEditor.defaults.editors.base64 = JSONEditor.AbstractEditor.extend({
  getDefault: function() {
    return this.schema.default || '';
  },
  getNumColumns: function() {
    return 4;
  },
  build: function() {    
    var self = this;
    this.title = this.header = this.label = this.getTheme().getFormInputLabel(this.getTitle());

    // Input that holds the base64 string
    this.input = this.theme.getFormInputField('hidden');
    this.container.appendChild(this.input);
    
    // Don't show uploader if this is readonly
    if(!this.schema.readOnly && !this.schema.readonly) {
      if(!window.FileReader) throw "FileReader required for base64 editor";
      
      // File uploader
      this.uploader = this.theme.getFormInputField('file');
      
      this.uploader.addEventListener('change',function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if(this.files && this.files.length) {
          var fr = new FileReader();
          fr.onload = function(evt) {
            self.value = evt.target.result;
            self.refreshPreview();
            self.watch_listener();
            self.jsoneditor.notifyWatchers(self.path);
            if(self.parent) self.parent.onChildEditorChange(self);
            else self.jsoneditor.onChange();
            fr = null;
          };
          fr.readAsDataURL(this.files[0]);
        }
      });
    }

    this.preview = this.theme.getFormInputDescription(this.schema.description);
    this.container.appendChild(this.preview);

    this.control = this.getTheme().getFormControl(this.label, this.uploader||this.input, this.preview);
    this.container.appendChild(this.control);
    
    this.register();
  },
  refreshPreview: function() {
    if(this.last_preview === this.value) return;
    this.last_preview = this.value;
    
    this.preview.innerHTML = '';
    
    if(!this.value) return;
    
    var mime = this.value.match(/^data:([^;,]+)[;,]/);
    if(mime) mime = mime[1];
    
    if(!mime) {
      this.preview.innerHTML = '<em>Invalid data URI</em>';
    }
    else {
      this.preview.innerHTML = '<strong>Type:</strong> '+mime+', <strong>Size:</strong> '+Math.floor((this.value.length-this.value.split(',')[0].length-1)/1.33333)+' bytes';
      if(mime.substr(0,5)==="image") {
        this.preview.innerHTML += '<br>';
        var img = document.createElement('img');
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100px';
        img.src = this.value;
        this.preview.appendChild(img);
      }
    }
  },
  enable: function() {
    if(this.uploader) this.uploader.disabled = false;
    this._super();
  },
  disable: function() {
    if(this.uploader) this.uploader.disabled = true;
    this._super();
  },
  setValue: function(val) {
    if(this.value !== val) {
      this.value = val;
      this.input.value = this.value;
      this.refreshPreview();
      this.watch_listener();
      this.jsoneditor.notifyWatchers(this.path);
    }
  },
  destroy: function() {
    this.preview.parentNode.removeChild(this.preview);
    this.title.parentNode.removeChild(this.title);
    this.input.parentNode.removeChild(this.input);
    if(this.uploader) this.uploader.parentNode.removeChild(this.uploader);

    this._super();
  }
});

JSONEditor.AbstractTheme = Class.extend({
  getContainer: function() {
    return document.createElement('div');
  },
  getFloatRightLinkHolder: function() {
    var el = document.createElement('div');
    el.style = el.style || {};
    el.style.float = 'right';
    el.style['margin-left'] = '10px';
    return el;
  },
  getModal: function() {
    var el = document.createElement('div');
    el.style.backgroundColor = 'white';
    el.style.border = '1px solid black';
    el.style.boxShadow = '3px 3px black';
    el.style.position = 'absolute';
    el.style.zIndex = '10';
    el.style.display = 'none';
    return el;
  },
  getGridContainer: function() {
    var el = document.createElement('div');
    return el;
  },
  getGridRow: function() {
    var el = document.createElement('div');
    el.className = 'row';
    return el;
  },
  getGridColumn: function() {
    var el = document.createElement('div');
    return el;
  },
  setGridColumnSize: function(el,size) {
    
  },
  getLink: function(text) {
    var el = document.createElement('a');
    el.setAttribute('href','#');
    el.appendChild(document.createTextNode(text));
    return el;
  },
  disableHeader: function(header) {
    header.style.color = '#ccc';
  },
  disableLabel: function(label) {
    label.style.color = '#ccc';
  },
  enableHeader: function(header) {
    header.style.color = '';
  },
  enableLabel: function(label) {
    label.style.color = '';
  },
  getFormInputLabel: function(text) {
    var el = document.createElement('label');
    el.appendChild(document.createTextNode(text));
    return el;
  },
  getCheckboxLabel: function(text) {
    var el = this.getFormInputLabel(text);
    el.style.fontWeight = 'normal';
    return el;
  },
  getHeader: function(text) {
    var el = document.createElement('h3');
    if(typeof text === "string") {
      el.textContent = text;
    }
    else {
      el.appendChild(text);
    }
    
    return el;
  },
  getCheckbox: function() {
    var el = this.getFormInputField('checkbox');
    el.style.display = 'inline-block';
    el.style.width = 'auto';
    return el;
  },
  getMultiCheckboxHolder: function(controls,label,description) {
    var el = document.createElement('div');

    label.style.display = 'block';

    el.appendChild(label);

    for(var i in controls) {
      if(!controls.hasOwnProperty(i)) continue;
      controls[i].style.display = 'inline-block';
      controls[i].style.marginRight = '20px';
      el.appendChild(controls[i]);
    }

    if(description) el.appendChild(description);

    return el;
  },
  getSelectInput: function(options) {
    var select = document.createElement('select');
    if(options) this.setSelectOptions(select, options);
    return select;
  },
  getSwitcher: function(options) {
    var switcher = this.getSelectInput(options);
    switcher.style.backgroundColor = 'transparent';
    switcher.style.height = 'auto';
    switcher.style.fontStyle = 'italic';
    switcher.style.fontWeight = 'normal';
    switcher.style.padding = '0 0 0 3px';
    return switcher;
  },
  getSwitcherOptions: function(switcher) {
    return switcher.getElementsByTagName('option');
  },
  setSwitcherOptions: function(switcher, options, titles) {
    this.setSelectOptions(switcher, options, titles);
  },
  setSelectOptions: function(select, options, titles) {
    titles = titles || [];
    select.innerHTML = '';
    for(var i=0; i<options.length; i++) {
      var option = document.createElement('option');
      option.setAttribute('value',options[i]);
      option.textContent = titles[i] || options[i];
      select.appendChild(option);
    }
  },
  getTextareaInput: function() {
    var el = document.createElement('textarea');
    el.style = el.style || {};
    el.style.width = '100%';
    el.style.height = '300px';
    el.style.boxSizing = 'border-box';
    return el;
  },
  getRangeInput: function(min,max,step) {
    var el = this.getFormInputField('range');
    el.setAttribute('min',min);
    el.setAttribute('max',max);
    el.setAttribute('step',step);
    return el;
  },
  getFormInputField: function(type) {
    var el = document.createElement('input');
    el.setAttribute('type',type);
    return el;
  },
  afterInputReady: function(input) {
    
  },
  getFormControl: function(label, input, description) {
    var el = document.createElement('div');
    el.className = 'form-control';
    if(label) el.appendChild(label);
    if(input.type === 'checkbox') {
      label.insertBefore(input,label.firstChild);
    }
    else {
      el.appendChild(input);
    }
    
    if(description) el.appendChild(description);
    return el;
  },
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.style = el.style || {};
    el.style.paddingLeft = '10px';
    el.style.marginLeft = '10px';
    el.style.borderLeft = '1px solid #ccc';
    return el;
  },
  getChildEditorHolder: function() {
    return document.createElement('div');
  },
  getDescription: function(text) {
    var el = document.createElement('p');
    el.appendChild(document.createTextNode(text));
    return el;
  },
  getCheckboxDescription: function(text) {
    return this.getDescription(text);
  },
  getFormInputDescription: function(text) {
    return this.getDescription(text);
  },
  getHeaderButtonHolder: function() {
    return this.getButtonHolder();
  },
  getButtonHolder: function() {
    return document.createElement('div');
  },
  getButton: function(text, icon, title) {
    var el = document.createElement('button');
    this.setButtonText(el,text,icon,title);
    return el;
  },
  setButtonText: function(button, text, icon, title) {
    button.innerHTML = '';
    if(icon) {
      button.appendChild(icon);
      button.innerHTML += ' ';
    }
    button.appendChild(document.createTextNode(text));
    if(title) button.setAttribute('title',title);
  },
  getTable: function() {
    return document.createElement('table');
  },
  getTableRow: function() {
    return document.createElement('tr');
  },
  getTableHead: function() {
    return document.createElement('thead');
  },
  getTableBody: function() {
    return document.createElement('tbody');
  },
  getTableHeaderCell: function(text) {
    var el = document.createElement('th');
    el.textContent = text;
    return el;
  },
  getTableCell: function() {
    var el = document.createElement('td');
    return el;
  },
  getErrorMessage: function(text) {
    var el = document.createElement('p');
    el.style = el.style || {};
    el.style.color = 'red';
    el.appendChild(document.createTextNode(text));
    return el;
  },
  addInputError: function(input, text) {
  },
  removeInputError: function(input) {
  },
  addTableRowError: function(row) {
  },
  removeTableRowError: function(row) {
  },
  getTabHolder: function() {
    var el = document.createElement('div');
    el.innerHTML = "<div style='float: left; width: 130px;' class='tabs'></div><div class='content' style='margin-left: 130px;'></div><div style='clear:both;'></div>";
    return el;
  },
  applyStyles: function(el,styles) {
    el.style = el.style || {};
    for(var i in styles) {
      if(!styles.hasOwnProperty(i)) continue;
      el.style[i] = styles[i];
    }
  },
  closest: function(elem, selector) {
    var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;

    while (elem && elem !== document) {
      try {
        var f = matchesSelector.bind(elem);
        if (f(selector)) {
          return elem;
        } else {
          elem = elem.parentNode;
        }
      }
      catch(e) {
        return false;
      }
    }
    return false;
  },
  getTab: function(span) {
    var el = document.createElement('div');
    el.appendChild(span);
    el.style = el.style || {};
    this.applyStyles(el,{
      border: '1px solid #ccc',
      borderWidth: '1px 0 1px 1px',
      textAlign: 'center',
      lineHeight: '30px',
      borderRadius: '5px',
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      fontWeight: 'bold',
      cursor: 'pointer'
    });
    return el;
  },
  getTabContentHolder: function(tab_holder) {
    return tab_holder.children[1];
  },
  getTabContent: function() {
    return this.getIndentedPanel();
  },
  markTabActive: function(tab) {
    this.applyStyles(tab,{
      opacity: 1,
      background: 'white'
    });
  },
  markTabInactive: function(tab) {
    this.applyStyles(tab,{
      opacity:0.5,
      background: ''
    });
  },
  addTab: function(holder, tab) {
    holder.children[0].appendChild(tab);
  },
  getBlockLink: function() {
    var link = document.createElement('a');
    link.style.display = 'block';
    return link;
  },
  getBlockLinkHolder: function() {
    var el = document.createElement('div');
    return el;
  },
  getLinksHolder: function() {
    var el = document.createElement('div');
    return el;
  },
  createMediaLink: function(holder,link,media) {
    holder.appendChild(link);
    media.style.width='100%';
    holder.appendChild(media);
  },
  createImageLink: function(holder,link,image) {
    holder.appendChild(link);
    link.appendChild(image);
  }
});

JSONEditor.defaults.themes.bootstrap2 = JSONEditor.AbstractTheme.extend({
  getRangeInput: function(min, max, step) {
    // TODO: use bootstrap slider
    return this._super(min, max, step);
  },
  getGridContainer: function() {
    var el = document.createElement('div');
    el.className = 'container-fluid';
    return el;
  },
  getGridRow: function() {
    var el = document.createElement('div');
    el.className = 'row-fluid';
    return el;
  },
  getFormInputLabel: function(text) {
    var el = this._super(text);
    el.style.display = 'inline-block';
    el.style.fontWeight = 'bold';
    return el;
  },
  setGridColumnSize: function(el,size) {
    el.className = 'span'+size;
  },
  getSelectInput: function(options) {
    var input = this._super(options);
    input.style.width = 'auto';
    input.style.maxWidth = '98%';
    return input;
  },
  getFormInputField: function(type) {
    var el = this._super(type);
    el.style.width = '98%';
    return el;
  },
  afterInputReady: function(input) {
    if(input.controlgroup) return;
    input.controlgroup = this.closest(input,'.control-group');
    input.controls = this.closest(input,'.controls');
    if(this.closest(input,'.compact')) {
      input.controlgroup.className = input.controlgroup.className.replace(/control-group/g,'').replace(/[ ]{2,}/g,' ');
      input.controls.className = input.controlgroup.className.replace(/controls/g,'').replace(/[ ]{2,}/g,' ');
      input.style.marginBottom = 0;
    }

    // TODO: use bootstrap slider
  },
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.className = 'well well-small';
    return el;
  },
  getFormInputDescription: function(text) {
    var el = document.createElement('p');
    el.className = 'help-inline';
    el.textContent = text;
    return el;
  },
  getFormControl: function(label, input, description) {
    var ret = document.createElement('div');
    ret.className = 'control-group';

    var controls = document.createElement('div');
    controls.className = 'controls';

    if(label && input.getAttribute('type') === 'checkbox') {
      ret.appendChild(controls);
      label.className += ' checkbox';
      label.appendChild(input);
      controls.appendChild(label);
      controls.style.height = '30px';
    }
    else {
      if(label) {
        label.className += ' control-label';
        ret.appendChild(label);
      }
      controls.appendChild(input);
      ret.appendChild(controls);
    }

    if(description) controls.appendChild(description);

    return ret;
  },
  getHeaderButtonHolder: function() {
    var el = this.getButtonHolder();
    el.style.marginLeft = '10px';
    return el;
  },
  getButtonHolder: function() {
    var el = document.createElement('div');
    el.className = 'btn-group';
    return el;
  },
  getButton: function(text, icon, title) {
    var el =  this._super(text, icon, title);
    el.className += ' btn btn-default';
    return el;
  },
  getTable: function() {
    var el = document.createElement('table');
    el.className = 'table table-bordered';
    el.style.width = 'auto';
    el.style.maxWidth = 'none';
    return el;
  },
  addInputError: function(input,text) {
    if(!input.controlgroup || !input.controls) return;
    input.controlgroup.className += ' error';
    if(!input.errmsg) {
      input.errmsg = document.createElement('p');
      input.errmsg.className = 'help-block errormsg';
      input.controls.appendChild(input.errmsg);
    }
    else {
      input.errmsg.style.display = '';
    }

    input.errmsg.textContent = text;
  },
  removeInputError: function(input) {
    if(!input.errmsg) return;
    input.errmsg.style.display = 'none';
    input.controlgroup.className = input.controlgroup.className.replace(/\s?error/g,'');
  },
  getTabHolder: function() {
    var el = document.createElement('div');
    el.className = 'tabbable tabs-left';
    el.innerHTML = "<ul class='nav nav-tabs span2' style='margin-right: 0;'></ul><div class='tab-content span10' style='overflow:visible;'></div>";
    return el;
  },
  getTab: function(text) {
    var el = document.createElement('li');
    var a = document.createElement('a');
    a.setAttribute('href','#');
    a.appendChild(text);
    el.appendChild(a);
    return el;
  },
  getTabContentHolder: function(tab_holder) {
    return tab_holder.children[1];
  },
  getTabContent: function() {
    var el = document.createElement('div');
    el.className = 'tab-pane active';
    return el;
  },
  markTabActive: function(tab) {
    tab.className += ' active';
  },
  markTabInactive: function(tab) {
    tab.className = tab.className.replace(/\s?active/g,'');
  },
  addTab: function(holder, tab) {
    holder.children[0].appendChild(tab);
  }
});

JSONEditor.defaults.themes.bootstrap3 = JSONEditor.AbstractTheme.extend({
  getSelectInput: function(options) {
    var el = this._super(options);
    el.className += 'form-control';
    //el.style.width = 'auto';
    return el;
  },
  setGridColumnSize: function(el,size) {
    el.className = 'col-md-'+size;
  },
  afterInputReady: function(input) {
    if(input.controlgroup) return;
    input.controlgroup = this.closest(input,'.form-group');
    if(this.closest(input,'.compact')) {
      input.controlgroup.style.marginBottom = 0;
    }

    // TODO: use bootstrap slider
  },
  getTextareaInput: function() {
    var el = document.createElement('textarea');
    el.className = 'form-control';
    return el;
  },
  getRangeInput: function(min, max, step) {
    // TODO: use better slider
    return this._super(min, max, step);
  },
  getFormInputField: function(type) {
    var el = this._super(type);
    if(type !== 'checkbox') {
      el.className += 'form-control';
    }
    return el;
  },
  getFormControl: function(label, input, description) {
    var group = document.createElement('div');

    if(label && input.type === 'checkbox') {
      group.className += ' checkbox';
      label.appendChild(input);
      label.style.fontSize = '14px';
      group.style.marginTop = '0';
      group.appendChild(label);
    } 
    else {
      group.className += ' form-group';
      if(label) {
        label.className += ' control-label';
        group.appendChild(label);
      }
      group.appendChild(input);
    }

    if(description) group.appendChild(description);

    return group;
  },
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.className = 'well well-sm';
    return el;
  },
  getFormInputDescription: function(text) {
    var el = document.createElement('p');
    el.className = 'help-block';
    el.textContent = text;
    return el;
  },
  getHeaderButtonHolder: function() {
    var el = this.getButtonHolder();
    el.style.marginLeft = '10px';
    return el;
  },
  getButtonHolder: function() {
    var el = document.createElement('div');
    el.className = 'btn-group';
    return el;
  },
  getButton: function(text, icon, title) {
    var el = this._super(text, icon, title);
    el.className += 'btn btn-default';
    return el;
  },
  getTable: function() {
    var el = document.createElement('table');
    el.className = 'table table-bordered';
    el.style.width = 'auto';
    el.style.maxWidth = 'none';
    return el;
  },

  addInputError: function(input,text) {
    if(!input.controlgroup) return;
    input.controlgroup.className += ' has-error';
    if(!input.errmsg) {
      input.errmsg = document.createElement('p');
      input.errmsg.className = 'help-block errormsg';
      input.controlgroup.appendChild(input.errmsg);
    }
    else {
      input.errmsg.style.display = '';
    }

    input.errmsg.textContent = text;
  },
  removeInputError: function(input) {
    if(!input.errmsg) return;
    input.errmsg.style.display = 'none';
    input.controlgroup.className = input.controlgroup.className.replace(/\s?has-error/g,'');
  },
  getTabHolder: function() {
    var el = document.createElement('div');
    el.innerHTML = "<div class='tabs list-group col-md-2'></div><div class='col-md-10'></div>";
    el.className = 'rows';
    return el;
  },
  getTab: function(text) {
    var el = document.createElement('a');
    el.className = 'list-group-item';
    el.setAttribute('href','#');
    el.appendChild(text);
    return el;
  },
  markTabActive: function(tab) {
    tab.className += ' active';
  },
  markTabInactive: function(tab) {
    tab.className = tab.className.replace(/\s?active/g,'');
  }
});

// Base Foundation theme
JSONEditor.defaults.themes.foundation = JSONEditor.AbstractTheme.extend({
  getChildEditorHolder: function() {
    var el = document.createElement('div');
    el.style.marginBottom = '15px';
    return el;
  },
  getSelectInput: function(options) {
    var el = this._super(options);
    el.style.minWidth = 'none';
    el.style.padding = '5px';
    el.style.marginTop = '3px';
    return el;
  },
  getSwitcher: function(options) {
    var el = this._super(options);
    el.style.paddingRight = '8px';
    return el;
  },
  afterInputReady: function(input) {
    if(this.closest(input,'.compact')) {
      input.style.marginBottom = 0;
    }
    input.group = this.closest(input,'.form-control');
  },
  getFormInputLabel: function(text) {
    var el = this._super(text);
    el.style.display = 'inline-block';
    return el;
  },
  getFormInputField: function(type) {
    var el = this._super(type);
    el.style.width = '100%';
    el.style.marginBottom = type==='checkbox'? '0' : '12px';
    return el;
  },
  getFormInputDescription: function(text) {
    var el = document.createElement('p');
    el.textContent = text;
    el.style.marginTop = '-10px';
    el.style.fontStyle = 'italic';
    return el;
  },
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.className = 'panel';
    return el;
  },
  getHeaderButtonHolder: function() {
    var el = this.getButtonHolder();
    el.style.display = 'inline-block';
    el.style.marginLeft = '10px';
    el.style.verticalAlign = 'middle';
    return el;
  },
  getButtonHolder: function() {
    var el = document.createElement('div');
    el.className = 'button-group';
    return el;
  },
  getButton: function(text, icon, title) {
    var el = this._super(text, icon, title);
    el.className += ' small button';
    return el;
  },
  addInputError: function(input,text) {
    if(!input.group) return;
    input.group.className += ' error';
    
    if(!input.errmsg) {
      input.insertAdjacentHTML('afterend','<small class="errormsg"></small>');
      input.errmsg = input.parentNode.getElementsByClassName('errormsg')[0];
    }
    else {
      input.errmsg.style.display = '';
    }
    
    input.errmsg.textContent = text;
  },
  removeInputError: function(input) {
    if(!input.errmsg) return;
    input.group.className = input.group.className.replace(/ error/g,'');
    input.errmsg.style.display = 'none';
  }
});

// Foundation 3 Specific Theme
JSONEditor.defaults.themes.foundation3 = JSONEditor.defaults.themes.foundation.extend({
  getHeaderButtonHolder: function() {
    var el = this._super();
    el.style.fontSize = '.6em';
    return el;
  },
  getFormInputLabel: function(text) {
    var el = this._super(text);
    el.style.fontWeight = 'bold';
    return el;
  },
  getTabHolder: function() {
    var el = document.createElement('div');
    el.className = 'row';
    el.innerHTML = "<dl class='tabs vertical two columns'></dl><div class='tabs-content ten columns'></div>";
    return el;
  },
  setGridColumnSize: function(el,size) {
    var sizes = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];
    el.className = 'columns '+sizes[size];
  },
  getTab: function(text) {
    var el = document.createElement('dd');
    var a = document.createElement('a');
    a.setAttribute('href','#');
    a.appendChild(text);
    el.appendChild(a);
    return el;
  },
  getTabContentHolder: function(tab_holder) {
    return tab_holder.children[1];
  },
  getTabContent: function() {
    var el = document.createElement('div');
    el.className = 'content active';
    el.style.paddingLeft = '5px';
    return el;
  },
  markTabActive: function(tab) {
    tab.className += ' active';
  },
  markTabInactive: function(tab) {
    tab.className = tab.className.replace(/\s*active/g,'');
  },
  addTab: function(holder, tab) {
    holder.children[0].appendChild(tab);
  }
});

// Foundation 4 Specific Theme
JSONEditor.defaults.themes.foundation4 = JSONEditor.defaults.themes.foundation.extend({
  getHeaderButtonHolder: function() {
    var el = this._super();
    el.style.fontSize = '.6em';
    return el;
  },
  setGridColumnSize: function(el,size) {
    el.className = 'columns large-'+size;
  },
  getFormInputDescription: function(text) {
    var el = this._super(text);
    el.style.fontSize = '.8rem';
    return el;
  },
  getFormInputLabel: function(text) {
    var el = this._super(text);
    el.style.fontWeight = 'bold';
    return el;
  }
});

// Foundation 5 Specific Theme
JSONEditor.defaults.themes.foundation5 = JSONEditor.defaults.themes.foundation.extend({
  getFormInputDescription: function(text) {
    var el = this._super(text);
    el.style.fontSize = '.8rem';
    return el;
  },
  setGridColumnSize: function(el,size) {
    el.className = 'columns medium-'+size;
  },
  getButton: function(text, icon, title) {
    var el = this._super(text,icon,title);
    el.className = el.className.replace(/\s*small/g,'') + ' tiny';
    return el;
  },
  getTabHolder: function() {
    var el = document.createElement('div');
    el.innerHTML = "<dl class='tabs vertical'></dl><div class='tabs-content'></div>";
    return el;
  },
  getTab: function(text) {
    var el = document.createElement('dd');
    var a = document.createElement('a');
    a.setAttribute('href','#');
    a.appendChild(text);
    el.appendChild(a);
    return el;
  },
  getTabContentHolder: function(tab_holder) {
    return tab_holder.children[1];
  },
  getTabContent: function() {
    var el = document.createElement('div');
    el.className = 'content active';
    el.style.paddingLeft = '5px';
    return el;
  },
  markTabActive: function(tab) {
    tab.className += ' active';
  },
  markTabInactive: function(tab) {
    tab.className = tab.className.replace(/\s*active/g,'');
  },
  addTab: function(holder, tab) {
    holder.children[0].appendChild(tab);
  }
});

JSONEditor.defaults.themes.html = JSONEditor.AbstractTheme.extend({
  getFormInputLabel: function(text) {
    var el = this._super(text);
    el.style.display = 'block';
    el.style.marginBottom = '3px';
    el.style.fontWeight = 'bold';
    return el;
  },
  getFormInputDescription: function(text) {
    var el = this._super(text);
    el.style.fontSize = '.8em';
    el.style.margin = 0;
    el.style.display = 'inline-block';
    el.style.fontStyle = 'italic';
    return el;
  },
  getIndentedPanel: function() {
    var el = this._super();
    el.style.border = '1px solid #ddd';
    el.style.padding = '5px';
    el.style.margin = '5px';
    el.style.borderRadius = '3px';
    return el;
  },
  getChildEditorHolder: function() {
    var el = this._super();
    el.style.marginBottom = '8px';
    return el;
  },
  getHeaderButtonHolder: function() {
    var el = this.getButtonHolder();
    el.style.display = 'inline-block';
    el.style.marginLeft = '10px';
    el.style.fontSize = '.8em';
    el.style.verticalAlign = 'middle';
    return el;
  },
  getTable: function() {
    var el = this._super();
    el.style.borderBottom = '1px solid #ccc';
    el.style.marginBottom = '5px';
    return el;
  },
  addInputError: function(input, text) {
    input.style.borderColor = 'red';
    
    if(!input.errmsg) {
      var group = this.closest(input,'.form-control');
      input.errmsg = document.createElement('div');
      input.errmsg.setAttribute('class','errmsg');
      input.errmsg.style = input.errmsg.style || {};
      input.errmsg.style.color = 'red';
      group.appendChild(input.errmsg);
    }
    else {
      input.errmsg.style.display = 'block';
    }
    
    input.errmsg.innerHTML = '';
    input.errmsg.appendChild(document.createTextNode(text));
  },
  removeInputError: function(input) {
    input.style.borderColor = '';
    if(input.errmsg) input.errmsg.style.display = 'none';
  }
});

JSONEditor.defaults.themes.jqueryui = JSONEditor.AbstractTheme.extend({
  getTable: function() {
    var el = this._super();
    el.setAttribute('cellpadding',5);
    el.setAttribute('cellspacing',0);
    return el;
  },
  getTableHeaderCell: function(text) {
    var el = this._super(text);
    el.className = 'ui-state-active';
    el.style.fontWeight = 'bold';
    return el;
  },
  getTableCell: function() {
    var el = this._super();
    el.className = 'ui-widget-content';
    return el;
  },
  getHeaderButtonHolder: function() {
    var el = this.getButtonHolder();
    el.style.marginLeft = '10px';
    el.style.fontSize = '.6em';
    el.style.display = 'inline-block';
    return el;
  },
  getFormInputDescription: function(text) {
    var el = this.getDescription(text);
    el.style.marginLeft = '10px';
    el.style.display = 'inline-block';
    return el;
  },
  getFormControl: function(label, input, description) {
    var el = this._super(label,input,description);
    if(input.type === 'checkbox') {
      el.style.lineHeight = '25px';
      
      el.style.padding = '3px 0';
    }
    else {
      el.style.padding = '4px 0 8px 0';
    }
    return el;
  },
  getDescription: function(text) {
    var el = document.createElement('span');
    el.style.fontSize = '.8em';
    el.style.fontStyle = 'italic';
    el.textContent = text;
    return el;
  },
  getButtonHolder: function() {
    var el = document.createElement('div');
    el.className = 'ui-buttonset';
    el.style.fontSize = '.7em';
    return el;
  },
  getFormInputLabel: function(text) {
    var el = document.createElement('label');
    el.style.fontWeight = 'bold';
    el.style.display = 'block';
    el.textContent = text;
    return el;
  },
  getButton: function(text, icon, title) {
    var button = document.createElement("button");
    button.className = 'ui-button ui-widget ui-state-default ui-corner-all';

    // Icon only
    if(icon && !text) {
      button.className += ' ui-button-icon-only';
      icon.className += ' ui-button-icon-primary ui-icon-primary';
      button.appendChild(icon);
    }
    // Icon and Text
    else if(icon) {
      button.className += ' ui-button-text-icon-primary';
      icon.className += ' ui-button-icon-primary ui-icon-primary';
      button.appendChild(icon);
    }
    // Text only
    else {
      button.className += ' ui-button-text-only';
    }

    var el = document.createElement('span');
    el.className = 'ui-button-text';
    el.textContent = text||title||".";
    button.appendChild(el);

    button.setAttribute('title',title);
    
    return button;
  },
  setButtonText: function(button,text, icon, title) {
    button.innerHTML = '';
    button.className = 'ui-button ui-widget ui-state-default ui-corner-all';

    // Icon only
    if(icon && !text) {
      button.className += ' ui-button-icon-only';
      icon.className += ' ui-button-icon-primary ui-icon-primary';
      button.appendChild(icon);
    }
    // Icon and Text
    else if(icon) {
      button.className += ' ui-button-text-icon-primary';
      icon.className += ' ui-button-icon-primary ui-icon-primary';
      button.appendChild(icon);
    }
    // Text only
    else {
      button.className += ' ui-button-text-only';
    }

    var el = document.createElement('span');
    el.className = 'ui-button-text';
    el.textContent = text||title||".";
    button.appendChild(el);

    button.setAttribute('title',title);
  },
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.className = 'ui-widget-content ui-corner-all';
    el.style.padding = '1em 1.4em';
    el.style.marginBottom = '20px';
    return el;
  },
  afterInputReady: function(input) {
    if(input.controls) return;
    input.controls = this.closest(input,'.form-control');
  },
  addInputError: function(input,text) {
    if(!input.controls) return;
    if(!input.errmsg) {
      input.errmsg = document.createElement('div');
      input.errmsg.className = 'ui-state-error';
      input.controls.appendChild(input.errmsg);
    }
    else {
      input.errmsg.style.display = '';
    }

    input.errmsg.textContent = text;
  },
  removeInputError: function(input) {
    if(!input.errmsg) return;
    input.errmsg.style.display = 'none';
  },
  markTabActive: function(tab) {
    tab.className = tab.className.replace(/\s*ui-widget-header/g,'')+' ui-state-active';
  },
  markTabInactive: function(tab) {
    tab.className = tab.className.replace(/\s*ui-state-active/g,'')+' ui-widget-header';
  }
});

JSONEditor.AbstractIconLib = Class.extend({
  mapping: {
    collapse: '',
    expand: '',
    delete: '',
    edit: '',
    add: '',
    cancel: '',
    save: '',
    moveup: '',
    movedown: ''
  },
  icon_prefix: '',
  getIconClass: function(key) {
    if(this.mapping[key]) return this.icon_prefix+this.mapping[key];
    else return null;
  },
  getIcon: function(key) {
    var iconclass = this.getIconClass(key);
    
    if(!iconclass) return null;
    
    var i = document.createElement('i');
    i.className = iconclass;
    return i;
  }
});

JSONEditor.defaults.iconlibs.bootstrap2 = JSONEditor.AbstractIconLib.extend({
  mapping: {
    collapse: 'chevron-down',
    expand: 'chevron-up',
    delete: 'trash',
    edit: 'pencil',
    add: 'plus',
    cancel: 'ban-circle',
    save: 'ok',
    moveup: 'arrow-up',
    movedown: 'arrow-down'
  },
  icon_prefix: 'icon-'
});

JSONEditor.defaults.iconlibs.bootstrap3 = JSONEditor.AbstractIconLib.extend({
  mapping: {
    collapse: 'chevron-down',
    expand: 'chevron-right',
    delete: 'remove',
    edit: 'pencil',
    add: 'plus',
    cancel: 'floppy-remove',
    save: 'floppy-saved',
    moveup: 'arrow-up',
    movedown: 'arrow-down'
  },
  icon_prefix: 'glyphicon glyphicon-'
});

JSONEditor.defaults.iconlibs.fontawesome3 = JSONEditor.AbstractIconLib.extend({
  mapping: {
    collapse: 'chevron-down',
    expand: 'chevron-right',
    delete: 'remove',
    edit: 'pencil',
    add: 'plus',
    cancel: 'ban-circle',
    save: 'save',
    moveup: 'arrow-up',
    movedown: 'arrow-down'
  },
  icon_prefix: 'icon-'
});

JSONEditor.defaults.iconlibs.fontawesome4 = JSONEditor.AbstractIconLib.extend({
  mapping: {
    collapse: 'caret-square-o-down',
    expand: 'caret-square-o-right',
    delete: 'times',
    edit: 'pencil',
    add: 'plus',
    cancel: 'ban',
    save: 'save',
    moveup: 'arrow-up',
    movedown: 'arrow-down'
  },
  icon_prefix: 'fa fa-'
});

JSONEditor.defaults.iconlibs.foundation2 = JSONEditor.AbstractIconLib.extend({
  mapping: {
    collapse: 'minus',
    expand: 'plus',
    delete: 'remove',
    edit: 'edit',
    add: 'add-doc',
    cancel: 'error',
    save: 'checkmark',
    moveup: 'up-arrow',
    movedown: 'down-arrow'
  },
  icon_prefix: 'foundicon-'
});

JSONEditor.defaults.iconlibs.foundation3 = JSONEditor.AbstractIconLib.extend({
  mapping: {
    collapse: 'minus',
    expand: 'plus',
    delete: 'x',
    edit: 'pencil',
    add: 'page-add',
    cancel: 'x-circle',
    save: 'save',
    moveup: 'arrow-up',
    movedown: 'arrow-down'
  },
  icon_prefix: 'fi-'
});

JSONEditor.defaults.iconlibs.jqueryui = JSONEditor.AbstractIconLib.extend({
  mapping: {
    collapse: 'triangle-1-s',
    expand: 'triangle-1-e',
    delete: 'trash',
    edit: 'pencil',
    add: 'plusthick',
    cancel: 'closethick',
    save: 'disk',
    moveup: 'arrowthick-1-n',
    movedown: 'arrowthick-1-s'
  },
  icon_prefix: 'ui-icon ui-icon-'
});

JSONEditor.defaults.templates.default = function() {
  var expandVars = function(vars) {
    var expanded = {};
    $each(vars, function(i,el) {
      if(typeof el === "object" && el !== null) {
        var tmp = {};
        $each(el, function(j,item) {
          tmp[i+'.'+j] = item;
        });
        $extend(expanded,expandVars(tmp));
      }
      else {
        expanded[i] = el;
      }
    });
    return expanded;
  };
  
  return {
    compile: function(template) {
      return function (vars) {
        var expanded = expandVars(vars);
        
        var ret = template+"";
        // Only supports basic {{var}} macro replacement
        $each(expanded,function(key,value) {
          ret = ret.replace(new RegExp('{{\\s*'+key+'\\s*}}','g'),value);
        });
        return ret;
      };
    }
  };
};

JSONEditor.defaults.templates.ejs = function() {
  if(!window.EJS) return false;

  return {
    compile: function(template) {
      var compiled = new EJS({
        text: template
      });

      return function(context) {
        return compiled.render(context);
      };
    }
  };
};

JSONEditor.defaults.templates.handlebars = function() {
  return window.Handlebars;
};

JSONEditor.defaults.templates.hogan = function() {
  if(!window.Hogan) return false;

  return {
    compile: function(template) {
      var compiled = Hogan.compile(template);
      return function(context) {
        return compiled.render(context);
      };
    }
  };
};

JSONEditor.defaults.templates.markup = function() {
  if(!window.Mark || !window.Mark.up) return false;

  return {
    compile: function(template) {
      return function(context) {
        return Mark.up(template,context);
      };
    }
  };
};

JSONEditor.defaults.templates.mustache = function() {
  if(!window.Mustache) return false;

  return {
    compile: function(template) {
      return function(view) {
        return Mustache.render(template, view);
      };
    }
  };
};

JSONEditor.defaults.templates.swig = function() {
  return window.swig;
};

JSONEditor.defaults.templates.underscore = function() {
  if(!window._) return false;

  return {
    compile: function(template) {
      return function(context) {
        return _.template(template, context);
      };
    }
  };
};

// Set the default theme
JSONEditor.defaults.theme = 'html';

// Set the default template engine
JSONEditor.defaults.template = 'default';

// Default options when initializing JSON Editor
JSONEditor.defaults.options = {};

// Miscellaneous Plugin Settings
JSONEditor.plugins = {
  ace: {
    theme: ''
  },
  epiceditor: {
    
  },
  sceditor: {
    
  }
};

// Default per-editor options
for(var i in JSONEditor.defaults.editors) {
  if(!JSONEditor.defaults.editors.hasOwnProperty(i)) continue;
  JSONEditor.defaults.editors[i].options = JSONEditor.defaults.editors.options || {};
}

// Set the default resolvers
// Use "multiple" as a fall back for everything
JSONEditor.defaults.resolvers.unshift(function(schema) {
  if(typeof schema.type !== "string") return "multiple";
});
// If the type is set and it's a basic type, use the primitive editor
JSONEditor.defaults.resolvers.unshift(function(schema) {
  // If the schema is a simple type
  if(typeof schema.type === "string") return schema.type;
});
// Use the select editor for all boolean values
JSONEditor.defaults.resolvers.unshift(function(schema) {
  if(schema.type === 'boolean') {
    return "select";
  }
});
// Use the multiple editor for schemas where the `type` is set to "any"
JSONEditor.defaults.resolvers.unshift(function(schema) {
  // If the schema can be of any type
  if(schema.type === "any") return "multiple";
});
// Editor for base64 encoded files
JSONEditor.defaults.resolvers.unshift(function(schema) {
  // If the schema can be of any type
  if(schema.type === "string" && schema.media && schema.media.binaryEncoding==="base64") {
    return "base64";
  }
});
// Use the table editor for arrays with the format set to `table`
JSONEditor.defaults.resolvers.unshift(function(schema) {
  // Type `array` with format set to `table`
  if(schema.type == "array" && schema.format == "table") {
    return "table";
  }
});
// Use the `enum` or `select` editors for schemas with enumerated properties
JSONEditor.defaults.resolvers.unshift(function(schema) {
  if(schema.enum) {
    if(schema.type === "array" || schema.type === "object") {
      return "enum";
    }
    else if(schema.type === "number" || schema.type === "integer" || schema.type === "string") {
      return "select";
    }
  }
});
// Use the 'multiselect' editor for arrays of enumerated strings/numbers/integers
JSONEditor.defaults.resolvers.unshift(function(schema) {
  if(schema.type === "array" && schema.items && !(schema.items instanceof Array) && schema.uniqueItems && schema.items.enum && ['string','number','integer'].indexOf(schema.items.type) >= 0) {
    return 'multiselect';
  }
});
// Use the multiple editor for schemas with `oneOf` set
JSONEditor.defaults.resolvers.unshift(function(schema) {
  // If this schema uses `oneOf`
  if(schema.oneOf) return "multiple";
});

/**
 * This is a small wrapper for using JSON Editor like a typical jQuery plugin.
 */
if(window.jQuery || window.Zepto) {
  window.$ = window.$ || {};
  $.jsoneditor = JSONEditor.defaults;
  
  (window.jQuery || window.Zepto).fn.jsoneditor = function(options) {
    var self = this;
    var editor = this.data('jsoneditor');
    if(options === 'value') {
      if(!editor) throw "Must initialize jsoneditor before getting/setting the value";
      
      // Set value
      if(arguments.length > 1) {
        editor.setValue(arguments[1]);
      }
      // Get value
      else {
        return editor.getValue();
      }
    }
    else if(options === 'validate') {
      if(!editor) throw "Must initialize jsoneditor before validating";
      
      // Validate a specific value
      if(arguments.length > 1) {
        return editor.validate(arguments[1]);
      }
      // Validate current value
      else {
        return editor.validate();
      }
    }
    else if(options === 'destroy') {
      if(editor) {
        editor.destroy();
        this.data('jsoneditor',null);
      }
    }
    else {
      // Destroy first
      if(editor) {
        editor.destroy();
      }
      
      // Create editor
      editor = new JSONEditor(this.get(0),options);
      this.data('jsoneditor',editor);
      
      // Setup event listeners
      editor.on('change',function() {
        self.trigger('change');
      });
      editor.on('ready',function() {
        self.trigger('ready');
      });
    }
    
    return this;
  };
}

  window.JSONEditor = JSONEditor;
})();
