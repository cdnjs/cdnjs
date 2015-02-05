/*!
 * Backbone.Marionette, v1.0.0-beta6
 * Copyright (c)2012 Derick Bailey, Muted Solutions, LLC.
 * Distributed under MIT license
 * http://github.com/marionettejs/backbone.marionette
*/
/*!
 * Includes BabySitter
 * https://github.com/marionettejs/backbone.babysitter/
 * Includes Wreqr
 * https://github.com/marionettejs/backbone.wreqr/
 * Includes EventBinder
 * https://github.com/marionettejs/backbone.eventbinder/
 */
(function (root, factory) {
  if (typeof exports === 'object') {

    var jquery = require('jquery');
    var underscore = require('underscore');
    var backbone = require('backbone');

    module.exports = factory(jquery, underscore, backbone);

  } else if (typeof define === 'function' && define.amd) {

    define(['jquery', 'underscore', 'backbone'], factory);

  } 
}(this, function ($, _, Backbone) {

  // Backbone.BabySitter, v0.0.3
  // Copyright (c)2012 Derick Bailey, Muted Solutions, LLC.
  // Distributed under MIT license
  // http://github.com/marionettejs/backbone.babysitter
  // Backbone.ChildViewContainer
  // ---------------------------
  //
  // Provide a container to store, retrieve and
  // shut down child views.
  
  Backbone.ChildViewContainer = (function(Backbone, _){
    
    // Container Constructor
    // ---------------------
  
    var Container = function(options){
      this._views = {};
      this._indexByModel = {};
      this._indexByCollection = {};
      this._indexByCustom = {};
      this._updateLength();
    };
  
    // Container Methods
    // -----------------
  
    _.extend(Container.prototype, {
  
      // Add a view to this container. Stores the view
      // by `cid` and makes it searchable by the model
      // and/or collection of the view. Optionally specify
      // a custom key to store an retrieve the view.
      add: function(view, customIndex){
        var viewCid = view.cid;
  
        // store the view
        this._views[viewCid] = view;
  
        // index it by model
        if (view.model){
          this._indexByModel[view.model.cid] = viewCid;
        }
  
        // index it by collection
        if (view.collection){
          this._indexByCollection[view.collection.cid] = viewCid;
        }
  
        // index by custom
        if (customIndex){
          this._indexByCustom[customIndex] = viewCid;
        }
  
        this._updateLength();
      },
  
      // Find a view by the model that was attached to
      // it. Uses the model's `cid` to find it, and
      // retrieves the view by it's `cid` from the result
      findByModel: function(model){
        var viewCid = this._indexByModel[model.cid];
        return this.findByCid(viewCid);
      },
  
      // Find a view by the collection that was attached to
      // it. Uses the collection's `cid` to find it, and
      // retrieves the view by it's `cid` from the result
      findByCollection: function(col){
        var viewCid = this._indexByCollection[col.cid];
        return this.findByCid(viewCid);
      },
  
      // Find a view by a custom indexer.
      findByCustom: function(index){
        var viewCid = this._indexByCustom[index];
        return this.findByCid(viewCid);
      },
  
      // Find by index. This is not guaranteed to be a
      // stable index.
      findByIndex: function(index){
        return _.values(this._views)[index];
      },
  
      // retrieve a view by it's `cid` directly
      findByCid: function(cid){
        return this._views[cid];
      },
  
      // Remove a view
      remove: function(view){
        var viewCid = view.cid;
  
        // delete model index
        if (view.model){
          delete this._indexByModel[view.model.cid];
        }
  
        // delete collection index
        if (view.collection){
          delete this._indexByCollection[view.collection.cid];
        }
  
        // delete custom index
        var cust;
  
        for (var key in this._indexByCustom){
          if (this._indexByCustom.hasOwnProperty(key)){
            if (this._indexByCustom[key] === viewCid){
              cust = key;
              break;
            }
          }
        }
  
        if (cust){
          delete this._indexByCustom[cust];
        }
  
        // remove the view from the container
        delete this._views[viewCid];
  
        // update the length
        this._updateLength();
      },
  
      // Call a method on every view in the container,
      // passing parameters to the call method one at a
      // time, like `function.call`.
      call: function(method, args){
        args = Array.prototype.slice.call(arguments, 1);
        this.apply(method, args);
      },
  
      // Apply a method on every view in the container,
      // passing parameters to the call method one at a
      // time, like `function.apply`.
      apply: function(method, args){
        var view;
        _.each(this._views, function(view, key){
          if (_.isFunction(view[method])){
            view[method].apply(view, args);
          }
        });
      },
  
      // Update the `.length` attribute on this container
      _updateLength: function(){
        this.length = _.size(this._views);
      }
  
    });
  
    // Borrowing this code from Backbone.Collection:
    // http://backbonejs.org/docs/backbone.html#section-106
    //
    // Mix in methods from Underscore, for iteration, and other
    // collection related features.
    var methods = ['forEach', 'each', 'map', 'find', 'detect', 'filter', 
      'select', 'reject', 'every', 'all', 'some', 'any', 'include', 
      'contains', 'invoke', 'toArray', 'first', 'initial', 'rest', 
      'last', 'without', 'isEmpty'];
  
    _.each(methods, function(method) {
      Container.prototype[method] = function() {
        var views = _.values(this._views);
        var args = [views].concat(_.toArray(arguments));
        return _[method].apply(_, args);
      };
    });
  
    // return the public API
    return Container;
  })(Backbone, _);
  
  // Backbone.EventBinder, v0.1.0
  // Copyright (c)2012 Derick Bailey, Muted Solutions, LLC.
  // Distributed under MIT license
  // http://github.com/marionettejs/backbone.eventbinder
  // EventBinder
  // -----------
  //
  // The event binder facilitates the binding and unbinding of events
  // from objects that extend `Backbone.Events`. It makes
  // unbinding events, even with anonymous callback functions,
  // easy. 
  //
  // Inspired by [Johnny Oshika](http://stackoverflow.com/questions/7567404/backbone-js-repopulate-or-recreate-the-view/7607853#7607853)
  
  Backbone.EventBinder = (function(Backbone, _){
    "use strict";
  
    // A map of objects that support binding/unbinding events.
    // This allows EventBinder to support events on arbitrary
    // objects with EB's consistent api.
    var handlerMap = {
      // 'default' type accounts for Backbone style objects extending
      // Backbone.Events
      "default" : {
        bindTo : function (obj, eventName, callback, context) {
          context = context || this;
          obj.on(eventName, callback, context);
  
          var binding = {
            type : 'default',
            obj: obj,
            eventName: eventName,
            callback: callback,
            context: context
          };
  
          return binding;
        },
        unbindFrom : function(binding){
          binding.obj.off(binding.eventName, binding.callback, binding.context);
        }
      },
  
      // 'jquery' style handlers allow us to bind to jQuery
      // (or compatible) objects
      jquery : {
        bindTo : function (obj, eventName, callback, context) {
          context = context || this;
          callback = _(callback).bind(context);
          obj.on(eventName, callback);
  
          var binding = {
            type : 'jquery',
            obj: obj,
            eventName: eventName,
            callback: callback,
            context: context
          };
  
          return binding;
        },
        unbindFrom : function(binding){
          binding.obj.off(binding.eventName, binding.callback);
        }
      }
    };
  
    // Use whatever best logic necessary to determine the type
    // of the supplied object
    function getHandlerForObject(obj) {
      if (obj.jquery) { return handlerMap.jquery; }
  
      return handlerMap["default"];
    }
    
    // Constructor function
    var EventBinder = function(){
      this._eventBindings = [];
    };
  
    // Copy the `extend` function used by Backbone's classes
    EventBinder.extend = Backbone.View.extend;
  
    // Extend the EventBinder with additional methods
    _.extend(EventBinder.prototype, {
  
      // Delegate to the bindTo for the appropriate type and
      // store the event binding in array so it can be unbound
      // easily, at a later point in time.
      bindTo: function(/* args... */) {
        var obj = arguments[0];
        var handlers = getHandlerForObject(obj);
  
        var binding = handlers.bindTo.apply(this,arguments);
  
        this._eventBindings.push(binding);
  
        return binding;
      },
  
      // Unbind from a single binding object. Binding objects are
      // returned from the `bindTo` method call. 
      unbindFrom: function(binding) {
        handlerMap[binding.type].unbindFrom.apply(this,arguments);
        this._eventBindings = _.reject(this._eventBindings, function(bind){return bind === binding;});
      },
  
      // Unbind all of the events that we have stored.
      unbindAll: function() {
        // The `unbindFrom` call removes elements from the array
        // while it is being iterated, so clone it first.
        var bindings = _.map(this._eventBindings, _.identity);
        _.each(bindings, this.unbindFrom, this);
      }
    });
  
    return EventBinder;
  })(Backbone, _);
  
  // Backbone.Wreqr, v0.0.0
  // Copyright (c)2012 Derick Bailey, Muted Solutions, LLC.
  // Distributed under MIT license
  // http://github.com/marionettejs/backbone.wreqr
  Backbone.Wreqr = (function(Backbone, Marionette, _){
    "option strict";
    var Wreqr = {};
  
    Wreqr.Handlers = (function(Backbone, _){
      "option strict";
      
      var Handlers = function(){
        "use strict";
        this._handlers = {};
      };
    
      Handlers.extend = Backbone.Model.extend;
    
      _.extend(Handlers.prototype, {
        addHandler: function(name, handler, context){
          var config = {
            callback: handler,
            context: context
          };
    
          this._handlers[name] = config;
        },
    
        getHandler: function(name){
          var config = this._handlers[name];
    
          if (!config){
            throw new Error("Handler not found for '" + name + "'");
          }
    
          return function(){
            return config.callback.apply(config.context, arguments);
          };
        },
    
        removeHandler: function(name){
          delete this._handlers[name];
        },
    
        removeAllHandlers: function(){
          this._handlers = {};
        }
      });
    
      return Handlers;
    })(Backbone, _);
    
    // Wreqr.Commands
    // --------------
    //
    // A simple command pattern implementation. Register a command
    // handler and execute it.
    Wreqr.Commands = (function(Wreqr){
      "option strict";
    
      return Wreqr.Handlers.extend({
        execute: function(name, args){
          this.getHandler(name)(args);
        }
      });
    
    })(Wreqr);
    
    // Wreqr.RequestResponse
    // ---------------------
    //
    // A simple request/response implementation. Register a
    // request handler, and return a response from it
    Wreqr.RequestResponse = (function(Wreqr){
      "option strict";
    
      return Wreqr.Handlers.extend({
        request: function(name, args){
          return this.getHandler(name)(args);
        }
      });
    
    })(Wreqr);
    
    // Event Aggregator
    // ----------------
    // A pub-sub object that can be used to decouple various parts
    // of an application through event-driven architecture.
    
    Wreqr.EventAggregator = (function(Backbone, _){
      "option strict";
      var EA = function(){};
    
      // Copy the `extend` function used by Backbone's classes
      EA.extend = Backbone.Model.extend;
    
      // Copy the basic Backbone.Events on to the event aggregator
      _.extend(EA.prototype, Backbone.Events);
    
      return EA;
    })(Backbone, _);
    
  
    return Wreqr;
  })(Backbone, Backbone.Marionette, _);
  
  Backbone.Marionette = Marionette = (function(Backbone, _, $){
    var Marionette = {};
  
  // Helpers
  // -------
  
  // For slicing `arguments` in functions
  var slice = Array.prototype.slice;
  
  // Marionette.extend
  // -----------------
  
  // Borrow the Backbone `extend` method so we can use it as needed
  Marionette.extend = Backbone.Model.extend;
  
  // Marionette.getOption
  // --------------------
  
  // Retrieve an object, function or other value from a target
  // object or it's `options`, with `options` taking precedence.
  Marionette.getOption = function(target, optionName){
    if (!target || !optionName){ return; }
    var value;
  
    if (target.options && target.options[optionName]){
      value = target.options[optionName];
    } else {
      value = target[optionName];
    }
  
    return value;
  };
  
  // Mairionette.createObject
  // ------------------------
  
  // A wrapper / shim for `Object.create`. Uses native `Object.create`
  // if available, otherwise shims it in place for Marionette to use.
  Marionette.createObject = (function(){
    var createObject;
    
    // Define this once, and just replace the .prototype on it as needed,
    // to improve performance in older / less optimized JS engines
    function F() {}
  
  
    // Check for existing native / shimmed Object.create
    if (typeof Object.create === "function"){
  
      // found native/shim, so use it
      createObject = Object.create;
  
    } else {
  
      // An implementation of the Boodman/Crockford delegation 
      // w/ Cornford optimization, as suggested by @unscriptable
      // https://gist.github.com/3959151
  
      // native/shim not found, so shim it ourself
      createObject = function (o) {
  
        // set the prototype of the function
        // so we will get `o` as the prototype
        // of the new object instance
        F.prototype = o;
  
        // create a new object that inherits from
        // the `o` parameter
        var child = new F();
        
        // clean up just in case o is really large
        F.prototype = null; 
  
        // send it back
        return child;
      };
  
    }
  
    return createObject;
  })();
  
  // Trigger an event and a corresponding method name. Examples:
  //
  // `this.triggerMethod("foo")` will trigger the "foo" event and
  // call the "onFoo" method. 
  //
  // `this.triggerMethod("foo:bar") will trigger the "foo:bar" event and
  // call the "onFooBar" method.
  Marionette.triggerMethod = function(){
    var args = Array.prototype.slice.apply(arguments);
    var eventName = args[0];
    var segments = eventName.split(":");
    var segment, capLetter, methodName = "on";
  
    for (var i = 0; i < segments.length; i++){
      segment = segments[i];
      capLetter = segment.charAt(0).toUpperCase();
      methodName += capLetter + segment.slice(1);
    }
  
    this.trigger.apply(this, arguments);
  
    if (_.isFunction(this[methodName])){
      args.shift();
      return this[methodName].apply(this, args);
    }
  };
  
  
  // EventBinder
  // -----------
  // Import the event binder from it's new home
  // https://github.com/marionettejs/backbone.eventbinder
  Marionette.EventBinder = Backbone.EventBinder.extend({
  
    augment: function(target){
      var eventBinder = new Marionette.EventBinder();
      target.eventBinder = eventBinder;
      target.bindTo = _.bind(eventBinder.bindTo, eventBinder);
      target.unbindFrom = _.bind(eventBinder.unbindFrom, eventBinder);
      target.unbindAll = _.bind(eventBinder.unbindAll, eventBinder);
    }
    
  });
  
  // Add the EventBinder methods to the view directly,
  // but keep them bound to the EventBinder instance so they work properly.
  // This allows the event binder's implementation to vary independently
  // of it being attached to the view... for example the internal structure
  // used to store the events can change without worry about it interfering
  // with Marionette's views.
  Marionette.addEventBinder = function(target){
    var eventBinder = new Marionette.EventBinder();
    target.eventBinder = eventBinder;
    target.bindTo = _.bind(eventBinder.bindTo, eventBinder);
    target.unbindFrom = _.bind(eventBinder.unbindFrom, eventBinder);
    target.unbindAll = _.bind(eventBinder.unbindAll, eventBinder);
  };
  
  // Event Aggregator
  // ----------------
  // A pub-sub object that can be used to decouple various parts
  // of an application through event-driven architecture.
  //
  // Extends [Backbone.Wreqr.EventAggregator](https://github.com/marionettejs/backbone.wreqr)
  // and mixes in an EventBinder from [Backbone.EventBinder](https://github.com/marionettejs/backbone.eventbinder).
  Marionette.EventAggregator = Backbone.Wreqr.EventAggregator.extend({
  
    constructor: function(){
      Marionette.addEventBinder(this);
      Backbone.Wreqr.EventAggregator.prototype.constructor.apply(this, arguments);
    }
  
  });
  
  // Callbacks
  // ---------
  
  // A simple way of managing a collection of callbacks
  // and executing them at a later point in time, using jQuery's
  // `Deferred` object.
  Marionette.Callbacks = function(){
    this._deferred = $.Deferred();
    this._callbacks = [];
  };
  
  _.extend(Marionette.Callbacks.prototype, {
  
    // Add a callback to be executed. Callbacks added here are
    // guaranteed to execute, even if they are added after the 
    // `run` method is called.
    add: function(callback, contextOverride){
      this._callbacks.push({cb: callback, ctx: contextOverride});
  
      this._deferred.done(function(context, options){
        if (contextOverride){ context = contextOverride; }
        callback.call(context, options);
      });
    },
  
    // Run all registered callbacks with the context specified. 
    // Additional callbacks can be added after this has been run 
    // and they will still be executed.
    run: function(options, context){
      this._deferred.resolve(context, options);
    },
  
    // Resets the list of callbacks to be run, allowing the same list
    // to be run multiple times - whenever the `run` method is called.
    reset: function(){
      var that = this;
      var callbacks = this._callbacks;
      this._deferred = $.Deferred();
      this._callbacks = [];
      _.each(callbacks, function(cb){
        that.add(cb.cb, cb.ctx);
      });
    }
  });
  
  
  // Template Cache
  // --------------
  
  // Manage templates stored in `<script>` blocks,
  // caching them for faster access.
  Marionette.TemplateCache = function(templateId){
    this.templateId = templateId;
  };
  
  // TemplateCache object-level methods. Manage the template
  // caches from these method calls instead of creating 
  // your own TemplateCache instances
  _.extend(Marionette.TemplateCache, {
    templateCaches: {},
  
    // Get the specified template by id. Either
    // retrieves the cached version, or loads it
    // from the DOM.
    get: function(templateId){
      var that = this;
      var cachedTemplate = this.templateCaches[templateId];
  
      if (!cachedTemplate){
        cachedTemplate = new Marionette.TemplateCache(templateId);
        this.templateCaches[templateId] = cachedTemplate;
      }
  
      return cachedTemplate.load();
    },
  
    // Clear templates from the cache. If no arguments
    // are specified, clears all templates:
    // `clear()`
    //
    // If arguments are specified, clears each of the 
    // specified templates from the cache:
    // `clear("#t1", "#t2", "...")`
    clear: function(){
      var i;
      var length = arguments.length;
  
      if (length > 0){
        for(i=0; i<length; i++){
          delete this.templateCaches[arguments[i]];
        }
      } else {
        this.templateCaches = {};
      }
    }
  });
  
  // TemplateCache instance methods, allowing each
  // template cache object to manage it's own state
  // and know whether or not it has been loaded
  _.extend(Marionette.TemplateCache.prototype, {
  
    // Internal method to load the template asynchronously.
    load: function(){
      var that = this;
  
      // Guard clause to prevent loading this template more than once
      if (this.compiledTemplate){
        return this.compiledTemplate;
      }
  
      // Load the template and compile it
      var template = this.loadTemplate(this.templateId);
      this.compiledTemplate = this.compileTemplate(template);
  
      return this.compiledTemplate;
    },
  
    // Load a template from the DOM, by default. Override
    // this method to provide your own template retrieval,
    // such as asynchronous loading from a server.
    loadTemplate: function(templateId){
      var template = $(templateId).html();
  
      if (!template || template.length === 0){
        var msg = "Could not find template: '" + templateId + "'";
        var err = new Error(msg);
        err.name = "NoTemplateError";
        throw err;
      }
  
      return template;
    },
  
    // Pre-compile the template before caching it. Override
    // this method if you do not need to pre-compile a template
    // (JST / RequireJS for example) or if you want to change
    // the template engine used (Handebars, etc).
    compileTemplate: function(rawTemplate){
      return _.template(rawTemplate);
    }
  });
  
  
  // Renderer
  // --------
  
  // Render a template with data by passing in the template
  // selector and the data to render.
  Marionette.Renderer = {
  
    // Render a template with data. The `template` parameter is
    // passed to the `TemplateCache` object to retrieve the
    // template function. Override this method to provide your own
    // custom rendering and template handling for all of Marionette.
    render: function(template, data){
      var templateFunc = typeof template === 'function' ? template : Marionette.TemplateCache.get(template);
      var html = templateFunc(data);
      return html;
    }
  };
  
  
  
  // Marionette Controller
  // ---------------------
  //
  // A multi-purpose object to use as a controller for
  // modules and routers, and as a mediator for workflow
  // and coordination of other objects, views, and more.
  Marionette.Controller = function(options){
    this.triggerMethod = Marionette.triggerMethod;
    this.options = options || {};
  
    Marionette.addEventBinder(this);
  
    if (_.isFunction(this.initialize)){
      this.initialize(this.options);
    }
  };
  
  Marionette.Controller.extend = Marionette.extend;
  
  // Controller Methods
  // --------------
  
  // Ensure it can trigger events with Backbone.Events
  _.extend(Marionette.Controller.prototype, Backbone.Events, {
    close: function(){
      this.unbindAll();
      this.triggerMethod("close");
      this.unbind();
    }
  });
  
  // Region 
  // ------
  //
  // Manage the visual regions of your composite application. See
  // http://lostechies.com/derickbailey/2011/12/12/composite-js-apps-regions-and-region-managers/
  
  Marionette.Region = function(options){
    this.options = options || {};
  
    Marionette.addEventBinder(this);
  
    this.el = Marionette.getOption(this, "el");
  
    if (!this.el){
      var err = new Error("An 'el' must be specified for a region.");
      err.name = "NoElError";
      throw err;
    }
  
    if (this.initialize){
      this.initialize.apply(this, arguments);
    }
  };
  
  
  // Region Type methods
  // -------------------
  
  _.extend(Marionette.Region, {
  
    // Build an instance of a region by passing in a configuration object
    // and a default region type to use if none is specified in the config.
    //
    // The config object should either be a string as a jQuery DOM selector,
    // a Region type directly, or an object literal that specifies both
    // a selector and regionType:
    //
    // ```js
    // {
    //   selector: "#foo",
    //   regionType: MyCustomRegion
    // }
    // ```
    //
    buildRegion: function(regionConfig, defaultRegionType){
      var regionIsString = (typeof regionConfig === "string");
      var regionSelectorIsString = (typeof regionConfig.selector === "string");
      var regionTypeIsUndefined = (typeof regionConfig.regionType === "undefined");
      var regionIsType = (typeof regionConfig === "function");
  
      if (!regionIsType && !regionIsString && !regionSelectorIsString) {
        throw new Error("Region must be specified as a Region type, a selector string or an object with selector property");
      }
  
      var selector, RegionType;
     
      // get the selector for the region
      
      if (regionIsString) {
        selector = regionConfig;
      } 
  
      if (regionConfig.selector) {
        selector = regionConfig.selector;
      }
  
      // get the type for the region
      
      if (regionIsType){
        RegionType = regionConfig;
      }
  
      if (!regionIsType && regionTypeIsUndefined) {
        RegionType = defaultRegionType;
      }
  
      if (regionConfig.regionType) {
        RegionType = regionConfig.regionType;
      }
      
      // build the region instance
  
      var regionManager = new RegionType({
        el: selector
      });
  
      return regionManager;
    }
  
  });
  
  // Region Instance Methods
  // -----------------------
  
  _.extend(Marionette.Region.prototype, Backbone.Events, {
  
    // Displays a backbone view instance inside of the region.
    // Handles calling the `render` method for you. Reads content
    // directly from the `el` attribute. Also calls an optional
    // `onShow` and `close` method on your view, just after showing
    // or just before closing the view, respectively.
    show: function(view){
  
      this.ensureEl();
      this.close();
  
      view.render();
      this.open(view);
  
      Marionette.triggerMethod.call(view, "show");
      Marionette.triggerMethod.call(this, "show", view);
  
      this.currentView = view;
    },
  
    ensureEl: function(){
      if (!this.$el || this.$el.length === 0){
        this.$el = this.getEl(this.el);
      }
    },
  
    // Override this method to change how the region finds the
    // DOM element that it manages. Return a jQuery selector object.
    getEl: function(selector){
      return $(selector);
    },
  
    // Override this method to change how the new view is
    // appended to the `$el` that the region is managing
    open: function(view){
      this.$el.empty().append(view.el);
    },
  
    // Close the current view, if there is one. If there is no
    // current view, it does nothing and returns immediately.
    close: function(){
      var view = this.currentView;
      if (!view || view.isClosed){ return; }
  
      if (view.close) { view.close(); }
      Marionette.triggerMethod.call(this, "close");
  
      delete this.currentView;
    },
  
    // Attach an existing view to the region. This 
    // will not call `render` or `onShow` for the new view, 
    // and will not replace the current HTML for the `el`
    // of the region.
    attachView: function(view){
      this.currentView = view;
    },
  
    // Reset the region by closing any existing view and
    // clearing out the cached `$el`. The next time a view
    // is shown via this region, the region will re-query the
    // DOM for the region's `el`.
    reset: function(){
      this.close();
      delete this.$el;
    }
  });
  
  // Copy the `extend` function used by Backbone's classes
  Marionette.Region.extend = Marionette.extend;
  
  
  // Marionette.View
  // ---------------
  
  // The core view type that other Marionette views extend from.
  Marionette.View = Backbone.View.extend({
  
    constructor: function(){
      _.bindAll(this, "render");
      Marionette.addEventBinder(this);
  
      Backbone.View.prototype.constructor.apply(this, arguments);
  
      this.bindBackboneEntityTo(this.model, this.modelEvents);
      this.bindBackboneEntityTo(this.collection, this.collectionEvents);
  
      this.bindTo(this, "show", this.onShowCalled, this);
    },
  
    // import the "triggerMethod" to trigger events with corresponding
    // methods if the method exists 
    triggerMethod: Marionette.triggerMethod,
  
    // Get the template for this view
    // instance. You can set a `template` attribute in the view
    // definition or pass a `template: "whatever"` parameter in
    // to the constructor options.
    getTemplate: function(){
      return Marionette.getOption(this, "template");
    },
  
    // Mix in template helper methods. Looks for a
    // `templateHelpers` attribute, which can either be an
    // object literal, or a function that returns an object
    // literal. All methods and attributes from this object
    // are copies to the object passed in.
    mixinTemplateHelpers: function(target){
      target = target || {};
      var templateHelpers = this.templateHelpers;
      if (_.isFunction(templateHelpers)){
        templateHelpers = templateHelpers.call(this);
      }
      return _.extend(target, templateHelpers);
    },
  
    // Configure `triggers` to forward DOM events to view
    // events. `triggers: {"click .foo": "do:foo"}`
    configureTriggers: function(){
      if (!this.triggers) { return; }
  
      var that = this;
      var triggerEvents = {};
  
      // Allow `triggers` to be configured as a function
      var triggers = _.result(this, "triggers");
  
      // Configure the triggers, prevent default
      // action and stop propagation of DOM events
      _.each(triggers, function(value, key){
  
        triggerEvents[key] = function(e){
          if (e && e.preventDefault){ e.preventDefault(); }
          if (e && e.stopPropagation){ e.stopPropagation(); }
          that.trigger(value);
        };
  
      });
  
      return triggerEvents;
    },
  
    // Overriding Backbone.View's delegateEvents specifically
    // to handle the `triggers` configuration
    delegateEvents: function(events){
      events = events || this.events;
      if (_.isFunction(events)){ events = events.call(this); }
  
      var combinedEvents = {};
      var triggers = this.configureTriggers();
      _.extend(combinedEvents, events, triggers);
  
      Backbone.View.prototype.delegateEvents.call(this, combinedEvents);
    },
  
    // Internal method, handles the `show` event.
    onShowCalled: function(){},
  
    // Default `close` implementation, for removing a view from the
    // DOM and unbinding it. Regions will call this method
    // for you. You can specify an `onClose` method in your view to
    // add custom code that is called after the view is closed.
    close: function(){
      if (this.isClosed) { return; }
  
      this.triggerMethod("before:close");
  
      this.remove();
      this.unbindAll();
  
      this.triggerMethod("close");
      this.isClosed = true;
    },
  
    // This method binds the elements specified in the "ui" hash inside the view's code with
    // the associated jQuery selectors.
    bindUIElements: function(){
      if (!this.ui) { return; }
  
      var that = this;
  
      if (!this.uiBindings) {
        // We want to store the ui hash in uiBindings, since afterwards the values in the ui hash
        // will be overridden with jQuery selectors.
        this.uiBindings = this.ui;
      }
  
      // refreshing the associated selectors since they should point to the newly rendered elements.
      this.ui = {};
      _.each(_.keys(this.uiBindings), function(key) {
        var selector = that.uiBindings[key];
        that.ui[key] = that.$(selector);
      });
    },
  
    // This method is used to bind a backbone "entity" (collection/model) to methods on the view.
    bindBackboneEntityTo: function(entity, bindings){
      if (!entity || !bindings) { return; }
  
      var view = this;
      _.each(bindings, function(methodName, evt){
  
        var method = view[methodName];
        if(!method) {
          throw new Error("View method '"+ methodName +"' was configured as an event handler, but does not exist.");
        }
  
        view.bindTo(entity, evt, method, view);
      });
    }
  });
  
  // Item View
  // ---------
  
  // A single item view implementation that contains code for rendering
  // with underscore.js templates, serializing the view's model or collection,
  // and calling several methods on extended views, such as `onRender`.
  Marionette.ItemView =  Marionette.View.extend({
    constructor: function(){
      Marionette.View.prototype.constructor.apply(this, arguments);
  
      if (this.initialEvents){
        this.initialEvents();
      }
    },
  
    // Serialize the model or collection for the view. If a model is
    // found, `.toJSON()` is called. If a collection is found, `.toJSON()`
    // is also called, but is used to populate an `items` array in the
    // resulting data. If both are found, defaults to the model.
    // You can override the `serializeData` method in your own view
    // definition, to provide custom serialization for your view's data.
    serializeData: function(){
      var data = {};
  
      if (this.model) {
        data = this.model.toJSON();
      }
      else if (this.collection) {
        data = { items: this.collection.toJSON() };
      }
  
      return data;
    },
  
    // Render the view, defaulting to underscore.js templates.
    // You can override this in your view definition to provide
    // a very specific rendering for your view. In general, though,
    // you should override the `Marionette.Renderer` object to
    // change how Marionette renders views.
    render: function(){
      this.isClosed = false;
  
      this.triggerMethod("before:render", this);
      this.triggerMethod("item:before:render", this);
  
      var data = this.serializeData();
      data = this.mixinTemplateHelpers(data);
  
      var template = this.getTemplate();
      var html = Marionette.Renderer.render(template, data);
      this.$el.html(html);
      this.bindUIElements();
  
      this.triggerMethod("render", this);
      this.triggerMethod("item:rendered", this);
  
      return this;
    },
  
    // Override the default close event to add a few
    // more events that are triggered.
    close: function(){
      if (this.isClosed){ return; }
  
      this.triggerMethod('item:before:close');
      Marionette.View.prototype.close.apply(this, arguments);
      this.triggerMethod('item:closed');
    }
  });
  
  // Collection View
  // ---------------
  
  // A view that iterates over a Backbone.Collection
  // and renders an individual ItemView for each model.
  Marionette.CollectionView = Marionette.View.extend({
    constructor: function(options){
      this.initChildViewStorage();
  
      Marionette.View.prototype.constructor.apply(this, arguments);
      this.initialEvents();
      this.onShowCallbacks = new Marionette.Callbacks();
  
      if (options && options.itemViewOptions) {
        this.itemViewOptions = options.itemViewOptions;
      }
    },
  
    // Configured the initial events that the collection view
    // binds to. Override this method to prevent the initial
    // events, or to add your own initial events.
    initialEvents: function(){
      if (this.collection){
        this.bindTo(this.collection, "add", this.addChildView, this);
        this.bindTo(this.collection, "remove", this.removeItemView, this);
        this.bindTo(this.collection, "reset", this.render, this);
      }
    },
  
    // Handle a child item added to the collection
    addChildView: function(item, collection, options){
      this.closeEmptyView();
      var ItemView = this.getItemView(item);
  
      var index;
      if(options && options.index){
        index = options.index;
      } else {
        index = 0;
      }
  
      return this.addItemView(item, ItemView, index);
    },
  
    // Override from `Marionette.View` to guarantee the `onShow` method
    // of child views is called.
    onShowCalled: function(){
      this.onShowCallbacks.run();
    },
  
    // Internal method to trigger the before render callbacks
    // and events
    triggerBeforeRender: function(){
      this.triggerMethod("before:render", this);
      this.triggerMethod("collection:before:render", this);
    },
  
    // Internal method to trigger the rendered callbacks and
    // events
    triggerRendered: function(){
      this.triggerMethod("render", this);
      this.triggerMethod("collection:rendered", this);
    },
  
    // Render the collection of items. Override this method to
    // provide your own implementation of a render function for
    // the collection view.
    render: function(){
      this.isClosed = false;
  
      this.triggerBeforeRender();
      this.closeEmptyView();
      this.closeChildren();
  
      if (this.collection && this.collection.length > 0) {
        this.showCollection();
      } else {
        this.showEmptyView();
      }
  
      this.triggerRendered();
      return this;
    },
  
    // Internal method to loop through each item in the
    // collection view and show it
    showCollection: function(){
      var that = this;
      var ItemView;
      this.collection.each(function(item, index){
        ItemView = that.getItemView(item);
        that.addItemView(item, ItemView, index);
      });
    },
  
    // Internal method to show an empty view in place of
    // a collection of item views, when the collection is
    // empty
    showEmptyView: function(){
      var EmptyView = Marionette.getOption(this, "emptyView");
  
      if (EmptyView && !this._showingEmptyView){
        this._showingEmptyView = true;
        var model = new Backbone.Model();
        this.addItemView(model, EmptyView, 0);
      }
    },
  
    // Internal method to close an existing emptyView instance
    // if one exists. Called when a collection view has been
    // rendered empty, and then an item is added to the collection.
    closeEmptyView: function(){
      if (this._showingEmptyView){
        this.closeChildren();
        delete this._showingEmptyView;
      }
    },
  
    // Retrieve the itemView type, either from `this.options.itemView`
    // or from the `itemView` in the object definition. The "options"
    // takes precedence.
    getItemView: function(item){
      var itemView = Marionette.getOption(this, "itemView");
  
      if (!itemView){
        var err = new Error("An `itemView` must be specified");
        err.name = "NoItemViewError";
        throw err;
      }
  
      return itemView;
    },
  
    // Render the child item's view and add it to the
    // HTML for the collection view.
    addItemView: function(item, ItemView, index){
      var that = this;
  
      // get the itemViewOptions if any were specified
      var itemViewOptions;
      if (_.isFunction(this.itemViewOptions)){
        itemViewOptions = this.itemViewOptions(item);
      } else {
        itemViewOptions = this.itemViewOptions;
      }
  
      // build the view 
      var view = this.buildItemView(item, ItemView, itemViewOptions);
  
      // Store the child view itself so we can properly
      // remove and/or close it later
      this.children.add(view);
      this.triggerMethod("item:added", view);
  
      // Forward all child item view events through the parent,
      // prepending "itemview:" to the event name
      var childBinding = this.bindTo(view, "all", function(){
        var args = slice.call(arguments);
        args[0] = "itemview:" + args[0];
        args.splice(1, 0, view);
  
        that.triggerMethod.apply(that, args);
      });
  
      // Store all child event bindings so we can unbind
      // them when removing / closing the child view
      this.childBindings = this.childBindings || {};
      this.childBindings[view.cid] = childBinding;
  
      // Render it and show it
      var renderResult = this.renderItemView(view, index);
  
      // call onShow for child item views
      if (view.onShow){
        this.onShowCallbacks.add(view.onShow, view);
      }
  
      return renderResult;
    },
  
    // render the item view
    renderItemView: function(view, index) {
      view.render();
      this.appendHtml(this, view, index);
    },
  
    // Build an `itemView` for every model in the collection.
    buildItemView: function(item, ItemViewType, itemViewOptions){
      var options = _.extend({model: item}, itemViewOptions);
      var view = new ItemViewType(options);
      return view;
    },
  
    // Remove the child view and close it
    removeItemView: function(item){
      var view = this.children.findByModel(item);
  
      if (view){
        var childBinding = this.childBindings[view.cid];
        if (childBinding) {
          this.unbindFrom(childBinding);
          delete this.childBindings[view.cid];
        }
  
        if (view.close){
          view.close();
        }
  
        this.children.remove(view);
      }
  
      if (!this.collection || this.collection.length === 0){
        this.showEmptyView();
      }
  
      this.triggerMethod("item:removed", view);
    },
  
    // Append the HTML to the collection's `el`.
    // Override this method to do something other
    // then `.append`.
    appendHtml: function(collectionView, itemView, index){
      collectionView.$el.append(itemView.el);
    },
  
    // Internal method to set up the `children` object for
    // storing all of the child views
    initChildViewStorage: function(){
      this.children = new Backbone.ChildViewContainer();
    },
  
    // Handle cleanup and other closing needs for
    // the collection of views.
    close: function(){
      if (this.isClosed){ return; }
  
      this.triggerMethod("collection:before:close");
      this.closeChildren();
      this.triggerMethod("collection:closed");
      Marionette.View.prototype.close.apply(this, arguments);
    },
  
    // Close the child views that this collection view
    // is holding on to, if any
    closeChildren: function(){
      var that = this;
      this.children.apply("close");
      // re-initialize to clean up after ourselves
      this.initChildViewStorage();
    }
  });
  
  
  // Composite View
  // --------------
  
  // Used for rendering a branch-leaf, hierarchical structure.
  // Extends directly from CollectionView and also renders an
  // an item view as `modelView`, for the top leaf
  Marionette.CompositeView = Marionette.CollectionView.extend({
    constructor: function(options){
      Marionette.CollectionView.apply(this, arguments);
      this.itemView = this.getItemView();
    },
  
    // Configured the initial events that the composite view
    // binds to. Override this method to prevent the initial
    // events, or to add your own initial events.
    initialEvents: function(){
      if (this.collection){
        this.bindTo(this.collection, "add", this.addChildView, this);
        this.bindTo(this.collection, "remove", this.removeItemView, this);
        this.bindTo(this.collection, "reset", this.renderCollection, this);
      }
    },
  
    // Retrieve the `itemView` to be used when rendering each of
    // the items in the collection. The default is to return
    // `this.itemView` or Marionette.CompositeView if no `itemView`
    // has been defined
    getItemView: function(item){
      var itemView = Marionette.getOption(this, "itemView") || this.constructor;
  
      if (!itemView){
        var err = new Error("An `itemView` must be specified");
        err.name = "NoItemViewError";
        throw err;
      }
  
      return itemView;
    },
  
    // Serialize the collection for the view. 
    // You can override the `serializeData` method in your own view
    // definition, to provide custom serialization for your view's data.
    serializeData: function(){
      var data = {};
  
      if (this.model){
        data = this.model.toJSON();
      }
  
      return data;
    },
  
    // Renders the model once, and the collection once. Calling
    // this again will tell the model's view to re-render itself
    // but the collection will not re-render.
    render: function(){
      this.isClosed = false;
  
      this.resetItemViewContainer();
  
      var html = this.renderModel();
      this.$el.html(html);
  
      // the ui bindings is done here and not at the end of render since they 
      // will not be available until after the model is rendered, but should be
      // available before the collection is rendered.
      this.bindUIElements();
  
      this.triggerMethod("composite:model:rendered");
  
      this.renderCollection();
      this.triggerMethod("composite:rendered");
      return this;
    },
  
    // Render the collection for the composite view
    renderCollection: function(){
      Marionette.CollectionView.prototype.render.apply(this, arguments);
      this.triggerMethod("composite:collection:rendered");
    },
  
    // Render an individual model, if we have one, as
    // part of a composite view (branch / leaf). For example:
    // a treeview.
    renderModel: function(){
      var data = {};
      data = this.serializeData();
      data = this.mixinTemplateHelpers(data);
  
      var template = this.getTemplate();
      return Marionette.Renderer.render(template, data);
    },
  
    // Appends the `el` of itemView instances to the specified
    // `itemViewContainer` (a jQuery selector). Override this method to
    // provide custom logic of how the child item view instances have their
    // HTML appended to the composite view instance.
    appendHtml: function(cv, iv){
      var $container = this.getItemViewContainer(cv);
      $container.append(iv.el);
    },
  
    // Internal method to ensure an `$itemViewContainer` exists, for the
    // `appendHtml` method to use.
    getItemViewContainer: function(containerView){
      if ("$itemViewContainer" in containerView){
        return containerView.$itemViewContainer;
      }
  
      var container;
      if (containerView.itemViewContainer){
  
        var selector = _.result(containerView, "itemViewContainer");
        container = containerView.$(selector);
        if (container.length <= 0) {
          var err = new Error("The specified `itemViewContainer` was not found: " + containerView.itemViewContainer);
          err.name = "ItemViewContainerMissingError";
          throw err;
        }
  
      } else {
        container = containerView.$el;
      }
  
      containerView.$itemViewContainer = container;
      return container;
    },
  
    // Internal method to reset the `$itemViewContainer` on render
    resetItemViewContainer: function(){
      if (this.$itemViewContainer){
        delete this.$itemViewContainer;
      }
    }
  });
  
  
  // Layout
  // ------
  
  // Used for managing application layouts, nested layouts and
  // multiple regions within an application or sub-application.
  //
  // A specialized view type that renders an area of HTML and then
  // attaches `Region` instances to the specified `regions`.
  // Used for composite view management and sub-application areas.
  Marionette.Layout = Marionette.ItemView.extend({
    regionType: Marionette.Region,
    
    // Ensure the regions are avialable when the `initialize` method
    // is called.
    constructor: function () {
      this._firstRender = true;
      this.initializeRegions();
      Backbone.Marionette.ItemView.apply(this, arguments);
    },
  
    // Layout's render will use the existing region objects the
    // first time it is called. Subsequent calls will close the
    // views that the regions are showing and then reset the `el`
    // for the regions to the newly rendered DOM elements.
    render: function(){
  
      if (this._firstRender){
        // if this is the first render, don't do anything to
        // reset the regions
        this._firstRender = false;
      } else {
        // If this is not the first render call, then we need to 
        // re-initializing the `el` for each region
        this.closeRegions();
        this.reInitializeRegions();
      }
  
      var result = Marionette.ItemView.prototype.render.apply(this, arguments);
      return result;
    },
  
    // Handle closing regions, and then close the view itself.
    close: function () {
      if (this.isClosed){ return; }
  
      this.closeRegions();
      this.destroyRegions();
      Backbone.Marionette.ItemView.prototype.close.call(this, arguments);
    },
  
    // Initialize the regions that have been defined in a
    // `regions` attribute on this layout. The key of the
    // hash becomes an attribute on the layout object directly.
    // For example: `regions: { menu: ".menu-container" }`
    // will product a `layout.menu` object which is a region
    // that controls the `.menu-container` DOM element.
    initializeRegions: function () {
      if (!this.regionManagers){
        this.regionManagers = {};
      }
  
      var that = this;
      var regions = this.regions || {};
      _.each(regions, function (region, name) {
  
        var regionManager = Marionette.Region.buildRegion(region, that.regionType);
        regionManager.getEl = function(selector){
          return that.$(selector);
        };
  
        that.regionManagers[name] = regionManager;
        that[name] = regionManager;
      });
  
    },
  
    // Re-initialize all of the regions by updating the `el` that
    // they point to
    reInitializeRegions: function(){
      if (this.regionManagers && _.size(this.regionManagers)===0){
        this.initializeRegions();
      } else {
        _.each(this.regionManagers, function(region){
          region.reset();
        });
      }
    },
  
    // Close all of the regions that have been opened by
    // this layout. This method is called when the layout
    // itself is closed.
    closeRegions: function () {
      var that = this;
      _.each(this.regionManagers, function (manager, name) {
        manager.close();
      });
    },
  
    // Destroys all of the regions by removing references
    // from the Layout
    destroyRegions: function(){
      var that = this;
      _.each(this.regionManagers, function (manager, name) {
        delete that[name];
      });
      this.regionManagers = {};
    }
  });
  
  
  
  // AppRouter
  // ---------
  
  // Reduce the boilerplate code of handling route events
  // and then calling a single method on another object.
  // Have your routers configured to call the method on
  // your object, directly.
  //
  // Configure an AppRouter with `appRoutes`.
  //
  // App routers can only take one `controller` object. 
  // It is recommended that you divide your controller
  // objects in to smaller peices of related functionality
  // and have multiple routers / controllers, instead of
  // just one giant router and controller.
  //
  // You can also add standard routes to an AppRouter.
  
  Marionette.AppRouter = Backbone.Router.extend({
  
    constructor: function(options){
      Backbone.Router.prototype.constructor.apply(this, arguments);
      this.options = options;
  
      if (this.appRoutes){
        var controller = Marionette.getOption(this, "controller");
        this.processAppRoutes(controller, this.appRoutes);
      }
    },
  
    // Internal method to process the `appRoutes` for the
    // router, and turn them in to routes that trigger the
    // specified method on the specified `controller`.
    processAppRoutes: function(controller, appRoutes){
      var method, methodName;
      var route, routesLength, i;
      var routes = [];
      var router = this;
  
      for(route in appRoutes){
        if (appRoutes.hasOwnProperty(route)){
          routes.unshift([route, appRoutes[route]]);
        }
      }
  
      routesLength = routes.length;
      for (i = 0; i < routesLength; i++){
        route = routes[i][0];
        methodName = routes[i][1];
        method = controller[methodName];
  
        if (!method){
          var msg = "Method '" + methodName + "' was not found on the controller";
          var err = new Error(msg);
          err.name = "NoMethodError";
          throw err;
        }
  
        method = _.bind(method, controller);
        router.route(route, methodName, method);
      }
    }
  });
  
  
  // Application
  // -----------
  
  // Contain and manage the composite application as a whole.
  // Stores and starts up `Region` objects, includes an
  // event aggregator as `app.vent`
  Marionette.Application = function(options){
    this.initCallbacks = new Marionette.Callbacks();
    this.vent = new Marionette.EventAggregator();
    this.commands = new Backbone.Wreqr.Commands();
    this.reqres = new Backbone.Wreqr.RequestResponse();
    this.submodules = {};
  
    _.extend(this, options);
  
    Marionette.addEventBinder(this);
    this.triggerMethod = Marionette.triggerMethod;
  };
  
  _.extend(Marionette.Application.prototype, Backbone.Events, {
    // Command execution, facilitated by Backbone.Wreqr.Commands
    execute: function(){
      this.commands.execute.apply(this.commands, arguments);
    },
  
    // Request/response, facilitated by Backbone.Wreqr.RequestResponse
    request: function(){
      return this.reqres.request.apply(this.reqres, arguments);
    },
  
    // Add an initializer that is either run at when the `start`
    // method is called, or run immediately if added after `start`
    // has already been called.
    addInitializer: function(initializer){
      this.initCallbacks.add(initializer);
    },
  
    // kick off all of the application's processes.
    // initializes all of the regions that have been added
    // to the app, and runs all of the initializer functions
    start: function(options){
      this.triggerMethod("initialize:before", options);
      this.initCallbacks.run(options, this);
      this.triggerMethod("initialize:after", options);
  
      this.triggerMethod("start", options);
    },
  
    // Add regions to your app. 
    // Accepts a hash of named strings or Region objects
    // addRegions({something: "#someRegion"})
    // addRegions{{something: Region.extend({el: "#someRegion"}) });
    addRegions: function(regions){
      var that = this;
      _.each(regions, function (region, name) {
        var regionManager = Marionette.Region.buildRegion(region, Marionette.Region);
        that[name] = regionManager;
      });
    },
  
    // Removes a region from your app.
    // Accepts the regions name
    // removeRegion('myRegion')
    removeRegion: function(region) {
      this[region].close();
      delete this[region];
    },
  
    // Create a module, attached to the application
    module: function(moduleNames, moduleDefinition){
      // slice the args, and add this application object as the
      // first argument of the array
      var args = slice.call(arguments);
      args.unshift(this);
  
      // see the Marionette.Module object for more information
      return Marionette.Module.create.apply(Marionette.Module, args);
    }
  });
  
  // Copy the `extend` function used by Backbone's classes
  Marionette.Application.extend = Marionette.extend;
  
  // Module
  // ------
  
  // A simple module system, used to create privacy and encapsulation in
  // Marionette applications
  Marionette.Module = function(moduleName, app){
    this.moduleName = moduleName;
  
    // store sub-modules
    this.submodules = {};
  
    this._setupInitializersAndFinalizers();
  
    // store the configuration for this module
    this.config = {};
    this.config.app = app;
  
    // extend this module with an event binder
    Marionette.addEventBinder(this);
  };
  
  // Extend the Module prototype with events / bindTo, so that the module
  // can be used as an event aggregator or pub/sub.
  _.extend(Marionette.Module.prototype, Backbone.Events, {
  
    // Initializer for a specific module. Initializers are run when the
    // module's `start` method is called.
    addInitializer: function(callback){
      this._initializerCallbacks.add(callback);
    },
  
    // Finalizers are run when a module is stopped. They are used to teardown
    // and finalize any variables, references, events and other code that the
    // module had set up.
    addFinalizer: function(callback){
      this._finalizerCallbacks.add(callback);
    },
  
    // Start the module, and run all of it's initializers
    start: function(options){
      // Prevent re-starting a module that is already started
      if (this._isInitialized){ return; }
  
      // start the sub-modules (depth-first hierarchy)
      _.each(this.submodules, function(mod){
        // check to see if we should start the sub-module with this parent
        var startWithParent = true;
        if (mod.config && mod.config.options){
          startWithParent = mod.config.options.startWithParent;
        }
  
        // start the sub-module
        if (startWithParent){
          mod.start(options);
        }
      });
  
      // run the callbacks to "start" the current module
      this._initializerCallbacks.run(options, this);
      this._isInitialized = true;
    },
  
    // Stop this module by running its finalizers and then stop all of
    // the sub-modules for this module
    stop: function(){
      // if we are not initialized, don't bother finalizing
      if (!this._isInitialized){ return; }
      this._isInitialized = false;
  
      // stop the sub-modules; depth-first, to make sure the
      // sub-modules are stopped / finalized before parents
      _.each(this.submodules, function(mod){ mod.stop(); });
  
      // run the finalizers
      this._finalizerCallbacks.run();
  
      // reset the initializers and finalizers
      this._initializerCallbacks.reset();
      this._finalizerCallbacks.reset();
    },
  
    // Configure the module with a definition function and any custom args
    // that are to be passed in to the definition function
    addDefinition: function(moduleDefinition, customArgs){
      this._runModuleDefinition(moduleDefinition, customArgs);
    },
  
    // Internal method: run the module definition function with the correct
    // arguments
    _runModuleDefinition: function(definition, customArgs){
      if (!definition){ return; }
  
      // build the correct list of arguments for the module definition
      var args = _.flatten([
        this, 
        this.config.app, 
        Backbone, 
        Marionette, 
        $, _, 
        customArgs
      ]);
  
      definition.apply(this, args);
    },
  
    // Internal method: set up new copies of initializers and finalizers.
    // Calling this method will wipe out all existing initializers and
    // finalizers.
    _setupInitializersAndFinalizers: function(){
      this._initializerCallbacks = new Marionette.Callbacks();
      this._finalizerCallbacks = new Marionette.Callbacks();
    }
  });
  
  // Function level methods to create modules
  _.extend(Marionette.Module, {
  
    // Create a module, hanging off the app parameter as the parent object. 
    create: function(app, moduleNames, moduleDefinition){
      var that = this;
      var parentModule = app;
      moduleNames = moduleNames.split(".");
  
      // get the custom args passed in after the module definition and
      // get rid of the module name and definition function
      var customArgs = slice.apply(arguments);
      customArgs.splice(0, 3);
  
      // Loop through all the parts of the module definition
      var length = moduleNames.length;
      _.each(moduleNames, function(moduleName, i){
        var isLastModuleInChain = (i === length-1);
        var isFirstModuleInChain = (i === 0);
        var module = that._getModuleDefinition(parentModule, moduleName, app);
  
        // if this is the last module in the chain, then set up
        // all of the module options from the configuration
        if (isLastModuleInChain){
          module.config.options = that._getModuleOptions(module, parentModule, moduleDefinition);
  
          // Only add a module definition and initializer when this is the last 
          // module in a "parent.child.grandchild" hierarchy of module names and
          // when the module call has a definition function supplied
          if (module.config.options.hasDefinition){
            module.addDefinition(module.config.options.definition, customArgs);
          }
        }
  
        // if it's a top level module, and this is the only
        // module in the chain, then this one gets configured
        // to start with the parent app.
        if (isFirstModuleInChain && isLastModuleInChain ){
          that._configureStartWithApp(app, module);
        }
  
        // Reset the parent module so that the next child
        // in the list will be added to the correct parent
        parentModule = module;
      });
  
      // Return the last module in the definition chain
      return parentModule;
    },
  
    // Only add the initializer if it is set to start with parent (the app), 
    // and if it has not yet been added
    _configureStartWithApp: function(app, module){
      // skip this if we have already configured the module to start w/ the app
      if (module.config.startWithAppIsConfigured){
        return;
      }
        
      // start the module when the app starts
      app.addInitializer(function(options){
        // but only if the module is configured to start w/ parent
        if (module.config.options.startWithParent){
          module.start(options);
        }
      });
  
      // prevent this module from being configured for
      // auto start again. the first time the module
      // is defined, determines it's auto-start
      module.config.startWithAppIsConfigured = true;
    },
  
    _getModuleDefinition: function(parentModule, moduleName, app){
      // Get an existing module of this name if we have one
      var module = parentModule[moduleName];
  
      if (!module){ 
        // Create a new module if we don't have one
        module = new Marionette.Module(moduleName, app);
        parentModule[moduleName] = module;
        // store the module on the parent
        parentModule.submodules[moduleName] = module;
      }
  
      return module;
    },
  
    _getModuleOptions: function(module, parentModule, moduleDefinition){
      // default to starting the module with it's parent to whatever the
      var startWithParent = true;
      if (module.config.options && !module.config.options.startWithParent){
        startWithParent = false;
      }
  
      // set up initial options for the module
      var options = { 
        startWithParent: startWithParent,
        hasDefinition: !!moduleDefinition
      };
  
      // short circuit if we don't have a module definition
      if (!options.hasDefinition){ return options; }
  
      if (_.isFunction(moduleDefinition)){
        // if the definition is a function, assign it directly
        // and use the defaults
        options.definition = moduleDefinition;
  
      } else {
  
        // the definition is an object. 
  
        // grab the "define" attribute
        options.hasDefinition = !!moduleDefinition.define;
        options.definition = moduleDefinition.define;
        
        // grab the "startWithParent" attribute if one exists
        if (moduleDefinition.hasOwnProperty("startWithParent")){
          options.startWithParent = moduleDefinition.startWithParent;
        }
      }
  
      return options;
    }
  });
  
  
    return Marionette;
  })(Backbone, _, $ || window.jQuery || window.Zepto || window.ender);
  
  
  return Backbone.Marionette; 

}));