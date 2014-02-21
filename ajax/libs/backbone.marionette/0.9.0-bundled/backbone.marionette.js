// Backbone.Marionette v0.9.0
//
// Copyright (C)2012 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.marionette

Backbone.Marionette = (function(Backbone, _, $){
  var Marionette = {};

// BindTo: Event Binding
// ---------------------

// BindTo facilitates the binding and unbinding of events
// from objects that extend `Backbone.Events`. It makes
// unbinding events, even with anonymous callback functions,
// easy. 
//
// Thanks to Johnny Oshika for this code.
// http://stackoverflow.com/questions/7567404/backbone-js-repopulate-or-recreate-the-view/7607853#7607853

Marionette.BindTo = {

  // Store the event binding in array so it can be unbound
  // easily, at a later point in time.
  bindTo: function (obj, eventName, callback, context) {
    context = context || this;
    obj.on(eventName, callback, context);

    if (!this.bindings) { this.bindings = []; }

    var binding = { 
      obj: obj, 
      eventName: eventName, 
      callback: callback, 
      context: context 
    }

    this.bindings.push(binding);

    return binding;
  },

  // Unbind from a single binding object. Binding objects are
  // returned from the `bindTo` method call. 
  unbindFrom: function(binding){
    binding.obj.off(binding.eventName, binding.callback, binding.context);
    this.bindings = _.reject(this.bindings, function(bind){return bind === binding});
  },

  // Unbind all of the events that we have stored.
  unbindAll: function () {
    var that = this;

    // The `unbindFrom` call removes elements from the array
    // while it is being iterated, so clone it first.
    var bindings = _.map(this.bindings, _.identity);
    _.each(bindings, function (binding, index) {
      that.unbindFrom(binding);
    });
  }
};


// Marionette.View
// ---------------

// The core view type that other Marionette views extend from.
Marionette.View = Backbone.View.extend({
  constructor: function(){
    Backbone.View.prototype.constructor.apply(this, arguments);
    this.bindTo(this, "show", this.onShowCalled, this);
  },

  // Get the template for this view
  // instance. You can set a `template` attribute in the view
  // definition or pass a `template: "whatever"` parameter in
  // to the constructor options. 
  getTemplate: function(){
    var template;

    // Get the template from `this.options.template` or
    // `this.template`. The `options` takes precedence.
    if (this.options && this.options.template){
      template = this.options.template;
    } else {
      template = this.template;
    }

    return template;
  },

  // Serialize the model or collection for the view. If a model is
  // found, `.toJSON()` is called. If a collection is found, `.toJSON()`
  // is also called, but is used to populate an `items` array in the
  // resulting data. If both are found, defaults to the model. 
  // You can override the `serializeData` method in your own view 
  // definition, to provide custom serialization for your view's data.
  serializeData: function(){
    var data;

    if (this.model) { 
      data = this.model.toJSON(); 
    }
    else if (this.collection) {
      data = { items: this.collection.toJSON() };
    }

    data = this.mixinTemplateHelpers(data);

    return data;
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

    var triggers = this.triggers;
    var that = this;
    var triggerEvents = {};

    // Allow `triggers` to be configured as a function
    if (_.isFunction(triggers)){ triggers = triggers.call(this); }

    // Configure the triggers, prevent default
    // action and stop propagation of DOM events
    _.each(triggers, function(value, key){

      triggerEvents[key] = function(e){
        if (e && e.preventDefault){ e.preventDefault(); }
        if (e && e.stopPropagation){ e.stopPropagation(); }
        that.trigger(value);
      }

    });

    return triggerEvents;
  },

  // Overriding Backbone.View's delegateEvents specifically
  // to handle the `triggers` configuration
  delegateEvents: function(events){
    events = events || this.events;
    if (_.isFunction(events)){ events = events.call(this)}

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
    if (this.beforeClose) { this.beforeClose(); }

    this.remove();

    if (this.onClose) { this.onClose(); }
    this.trigger('close');
    this.unbindAll();
    this.unbind();
  }
});

// Copy the features of `BindTo`
_.extend(Marionette.View.prototype, Marionette.BindTo);

// Item View
// ---------

// A single item view implementation that contains code for rendering
// with underscore.js templates, serializing the view's model or collection,
// and calling several methods on extended views, such as `onRender`.
Marionette.ItemView =  Marionette.View.extend({
  constructor: function(){
    Marionette.View.prototype.constructor.apply(this, arguments);
    this.initialEvents();
  },

  // Configured the initial events that the item view 
  // binds to. Override this method to prevent the initial
  // events, or to add your own initial events.
  initialEvents: function(){
    if (this.collection){
      this.bindTo(this.collection, "reset", this.render, this);
    }
  },

  // Render the view, defaulting to underscore.js templates.
  // You can override this in your view definition to provide
  // a very specific rendering for your view. In general, though,
  // you should override the `Marionette.Renderer` object to
  // change how Marionette renders views.
  render: function(){
    if (this.beforeRender){ this.beforeRender(); }
    this.trigger("before:render", this);
    this.trigger("item:before:render", this);

    var data = this.serializeData();
    var template = this.getTemplate();
    var html = Marionette.Renderer.render(template, data);
    this.$el.html(html);

    if (this.onRender){ this.onRender(); }
    this.trigger("render", this);
    this.trigger("item:rendered", this);
  },

  // Override the default close event to add a few
  // more events that are triggered.
  close: function(){
    this.trigger('item:before:close');
    Marionette.View.prototype.close.apply(this, arguments);
    this.trigger('item:closed');
  }
});

// Collection View
// ---------------

// A view that iterates over a Backbone.Collection
// and renders an individual ItemView for each model.
Marionette.CollectionView = Marionette.View.extend({
  constructor: function(){
    Marionette.View.prototype.constructor.apply(this, arguments);
    this.initChildViewStorage();
    this.initialEvents();
    this.onShowCallbacks = new Marionette.Callbacks();
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
    var ItemView = this.getItemView();
    return this.addItemView(item, ItemView, options.index);
  },

  // Override from `Marionette.View` to guarantee the `onShow` method
  // of child views is called.
  onShowCalled: function(){
    this.onShowCallbacks.run();
  },

  // Loop through all of the items and render 
  // each of them with the specified `itemView`.
  render: function(){
    var that = this;
    var ItemView = this.getItemView();
    var EmptyView = this.options.emptyView || this.emptyView;

    if (this.beforeRender) { this.beforeRender(); }
    this.trigger("collection:before:render", this);

    this.closeChildren();

    if (this.collection) {
      if (this.collection.length === 0 && EmptyView) {
        this.addItemView(new Backbone.Model(), EmptyView, 0);
      } else {
        this.collection.each(function(item, index){
          that.addItemView(item, ItemView, index);
        });
      }
    }

    if (this.onRender) { this.onRender(); }
    this.trigger("collection:rendered", this);
  },

  // Retrieve the itemView type, either from `this.options.itemView`
  // or from the `itemView` in the object definition. The "options"
  // takes precedence.
  getItemView: function(){
    var itemView = this.options.itemView || this.itemView;

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

    var view = this.buildItemView(item, ItemView);

    // Store the child view itself so we can properly 
    // remove and/or close it later
    this.storeChild(view);
    if (this.onItemAdded){ this.onItemAdded(view); }
    this.trigger("item:added", view);

    // Render it and show it
    var renderResult = this.renderItemView(view, index);

    // call onShow for child item views
    if (view.onShow){
      this.onShowCallbacks.add(view.onShow, view);
    }

    // Forward all child item view events through the parent,
    // prepending "itemview:" to the event name
    var childBinding = this.bindTo(view, "all", function(){
      var args = slice.call(arguments);
      args[0] = "itemview:" + args[0];
      args.splice(1, 0, view);

      that.trigger.apply(that, args);
    });

    // Store all child event bindings so we can unbind
    // them when removing / closing the child view
    this.childBindings = this.childBindings || {};
    this.childBindings[view.cid] = childBinding;
    
    return renderResult;
  },
  
  // render the item view
  renderItemView: function(view, index) {
    view.render();
    this.appendHtml(this, view, index);
  },

  // Build an `itemView` for every model in the collection. 
  buildItemView: function(item, ItemView){
    var itemViewOptions = _.result(this, "itemViewOptions");
    var options = _.extend({model: item}, itemViewOptions);
    var view = new ItemView(options);
    return view;
  },

  // Remove the child view and close it
  removeItemView: function(item){
    var view = this.children[item.cid];
    if (view){
      var childBinding = this.childBindings[view.cid];
      if (childBinding) {
        this.unbindFrom(childBinding);
        delete this.childBindings[view.cid];
      }
      view.close();
      delete this.children[item.cid];
    }
    this.trigger("item:removed", view);
  },

  // Append the HTML to the collection's `el`.
  // Override this method to do something other
  // then `.append`.
  appendHtml: function(collectionView, itemView, index){
    collectionView.$el.append(itemView.el);
  },

  // Store references to all of the child `itemView`
  // instances so they can be managed and cleaned up, later.
  storeChild: function(view){
    this.children[view.model.cid] = view;
  },

  // Internal method to set up the `children` object for
  // storing all of the child views
  initChildViewStorage: function(){
    this.children = {};
  },

  // Handle cleanup and other closing needs for
  // the collection of views.
  close: function(){
    this.trigger("collection:before:close");
    this.closeChildren();
    Marionette.View.prototype.close.apply(this, arguments);
    this.trigger("collection:closed");
  },

  // Close the child views that this collection view
  // is holding on to, if any
  closeChildren: function(){
    var that = this;
    if (this.children){
      _.each(_.clone(this.children), function(childView){
        that.removeItemView(childView.model);
      });
    }
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
  getItemView: function(){
    return this.itemView || this.constructor;
  },

  // Renders the model once, and the collection once. Calling
  // this again will tell the model's view to re-render itself
  // but the collection will not re-render.
  render: function(){
    var that = this;

    var html = this.renderModel();
    this.$el.html(html);
    this.trigger("composite:model:rendered");
    this.trigger("render");

    this.renderCollection();
    this.trigger("composite:rendered");
  },

  // Render the collection for the composite view
  renderCollection: function(){
    Marionette.CollectionView.prototype.render.apply(this, arguments);
    this.trigger("composite:collection:rendered");
  },

  // Render an individual model, if we have one, as
  // part of a composite view (branch / leaf). For example:
  // a treeview.
  renderModel: function(){
    var data = {};
    data = this.serializeData();

    var template = this.getTemplate();
    return Marionette.Renderer.render(template, data);
  }
});


// Region 
// ------

// Manage the visual regions of your composite application. See
// http://lostechies.com/derickbailey/2011/12/12/composite-js-apps-regions-and-region-managers/
Marionette.Region = function(options){
  this.options = options || {};

  _.extend(this, options);

  if (!this.el){
    var err = new Error("An 'el' must be specified");
    err.name = "NoElError";
    throw err;
  }

  if (this.initialize){
    this.initialize.apply(this, arguments);
  }
};

_.extend(Marionette.Region.prototype, Backbone.Events, {

  // Displays a backbone view instance inside of the region.
  // Handles calling the `render` method for you. Reads content
  // directly from the `el` attribute. Also calls an optional
  // `onShow` and `close` method on your view, just after showing
  // or just before closing the view, respectively.
  show: function(view){
    var that = this;

    this.ensureEl();
    this.close();

    view.render();
    this.open(view);

    if (view.onShow) { view.onShow(); }
    view.trigger("show");

    if (this.onShow) { this.onShow(view); }
    this.trigger("view:show", view);

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
    this.$el.html(view.el);
  },

  // Close the current view, if there is one. If there is no
  // current view, it does nothing and returns immediately.
  close: function(){
    var view = this.currentView;
    if (!view){ return; }

    if (view.close) { view.close(); }
    this.trigger("view:closed", view);

    delete this.currentView;
  },

  // Attach an existing view to the region. This 
  // will not call `render` or `onShow` for the new view, 
  // and will not replace the current HTML for the `el`
  // of the region.
  attachView: function(view){
    this.currentView = view;
  }
});

// Copy the `extend` function used by Backbone's classes
Marionette.Region.extend = Backbone.View.extend;

// Copy the features of `BindTo`
_.extend(Marionette.Region.prototype, Marionette.BindTo);

// Layout
// ------

// Used for managing application layouts, nested layouts and
// multiple regions within an application or sub-application.
//
// A specialized view type that renders an area of HTML and then
// attaches `Region` instances to the specified `regions`.
// Used for composite view management and sub-application areas.
Marionette.Layout = Marionette.ItemView.extend({
  constructor: function () {
    Backbone.Marionette.ItemView.apply(this, arguments);
    this.initializeRegions();
  },

  // Layout's render will use the existing region objects the
  // first time it is called. Subsequent calls will close the
  // views that the regions are showing and then reset the `el`
  // for the regions to the newly rendered DOM elements.
  render: function(){
    var result = Marionette.ItemView.prototype.render.apply(this, arguments);

    // Rewrite this function to handle re-rendering and
    // re-initializing the `el` for each region
    this.render = function(){
      this.closeRegions();
      this.reInitializeRegions();

      var result = Marionette.ItemView.prototype.render.apply(this, arguments);
      return result;
    }

    return result;
  },

  // Handle closing regions, and then close the view itself.
  close: function () {
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
    _.each(this.regions, function (selector, name) {

      var regionManager = new Backbone.Marionette.Region({
        el: selector,
          getEl: function(selector){
            return that.$(selector);
          }
      });

      that.regionManagers[name] = regionManager;
      that[name] = regionManager;
    });

  },

  // Re-initialize all of the regions by updating the `el` that
  // they point to
  reInitializeRegions: function(){
    _.each(this.regionManagers, function(region){
      delete region.$el;
    });
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


// Application
// -----------

// Contain and manage the composite application as a whole.
// Stores and starts up `Region` objects, includes an
// event aggregator as `app.vent`
Marionette.Application = function(options){
  this.initCallbacks = new Marionette.Callbacks();
  this.vent = new Marionette.EventAggregator();
  _.extend(this, options);
};

_.extend(Marionette.Application.prototype, Backbone.Events, {
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
    this.trigger("initialize:before", options);
    this.initCallbacks.run(options, this);
    this.trigger("initialize:after", options);

    this.trigger("start", options);
  },

  // Add regions to your app. 
  // Accepts a hash of named strings or Region objects
  // addRegions({something: "#someRegion"})
  // addRegions{{something: Region.extend({el: "#someRegion"}) });
  addRegions: function(regions){
    var regionValue, regionObj, region;

    for(region in regions){
      if (regions.hasOwnProperty(region)){
        regionValue = regions[region];

        if (typeof regionValue === "string"){
          regionObj = new Marionette.Region({
            el: regionValue
          });
        } else {
          regionObj = new regionValue();
        }

        this[region] = regionObj;
      }
    }
  },

  // Create a module, attached to the application
  module: function(){
    // see the Marionette.Module object for more information
    return Marionette.Module.create.apply(this, arguments);
  }
});

// Copy the `extend` function used by Backbone's classes
Marionette.Application.extend = Backbone.View.extend;

// Copy the features of `BindTo`
_.extend(Marionette.Application.prototype, Marionette.BindTo);

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
    Backbone.Router.prototype.constructor.call(this, options);

    if (this.appRoutes){
      var controller = this.controller;
      if (options && options.controller) {
        controller = options.controller;
      }
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


// Module
// ------

// A simple module system, used to create privacy and encapsulation in
// Marionette applications
Marionette.Module = function(){};

// Extend the Module prototype with events / bindTo, so that the module
// can be used as an event aggregator or pub/sub.
_.extend(Marionette.Module.prototype, Backbone.Events, Marionette.BindTo);

// Function level methods to create modules
_.extend(Marionette.Module, {

  // Create a module, hanging off 'this' as the parent object. This
  // method must be called with .apply or .create
  create: function(moduleNames, moduleDefinition){
    var moduleName, module, moduleOverride;
    var parentObject = this;
    var parentModule = this;
    var moduleNames = moduleNames.split(".");

    // Loop through all the parts of the module definition
    var length = moduleNames.length;
    for(var i = 0; i < length; i++){
      var isLastModuleInChain = (i === length-1);

      // Get the module name, and check if it exists on
      // the current parent already
      moduleName = moduleNames[i];
      module = parentModule[moduleName];

      // Create a new module if we don't have one already
      if (!module){ 
        module = new Marionette.Module();
      }

      // Check to see if we need to run the definition
      // for the module. Only run the definition if one
      // is supplied, and if we're at the last segment
      // of the "Module.Name" chain.
      if (isLastModuleInChain && moduleDefinition){
        // get the custom args passed in after the module definition and
        // get rid of the module name and definition function
        var customArgs = slice.apply(arguments);
        customArgs.shift();
        customArgs.shift();

        // final arguments list for the module definition
        var argsArray = [module, parentObject, Backbone, Marionette, jQuery, _, customArgs];

        // flatten the nested array
        var args = _.flatten(argsArray);

        // ensure the module definition's `this` is the module itself
        moduleDefinition.apply(module, args);
      }

      // If the defined module is not what we are
      // currently storing as the module, replace it
      if (parentModule[moduleName] !== module){
        parentModule[moduleName] = module;
      }

      // Reset the parent module so that the next child
      // in the list will be added to the correct parent
      parentModule = module;
    }

    // Return the last module in the definition chain
    return module;
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
    var templateFunc = Marionette.TemplateCache.get(template);
    var html = templateFunc(data);
    return html;
  }
};


// Callbacks
// ---------

// A simple way of managing a collection of callbacks
// and executing them at a later point in time, using jQuery's
// `Deferred` object.
Marionette.Callbacks = function(){
  this.deferred = $.Deferred();
  this.promise = this.deferred.promise();
};

_.extend(Marionette.Callbacks.prototype, {

  // Add a callback to be executed. Callbacks added here are
  // guaranteed to execute, even if they are added after the 
  // `run` method is called.
  add: function(callback, contextOverride){
    this.promise.done(function(context, options){
      if (contextOverride){ context = contextOverride; }
      callback.call(context, options);
    });
  },

  // Run all registered callbacks with the context specified. 
  // Additional callbacks can be added after this has been run 
  // and they will still be executed.
  run: function(options, context){
    this.deferred.resolve(context, options);
  }
});


// Event Aggregator
// ----------------

// A pub-sub object that can be used to decouple various parts
// of an application through event-driven architecture.
Marionette.EventAggregator = function(options){
  _.extend(this, options);
};

_.extend(Marionette.EventAggregator.prototype, Backbone.Events, Marionette.BindTo, {
  // Assumes the event aggregator itself is the 
  // object being bound to.
  bindTo: function(eventName, callback, context){
    return Marionette.BindTo.bindTo.call(this, this, eventName, callback, context);
  }
});


// Helpers
// -------

// For slicing `arguments` in functions
var slice = Array.prototype.slice;

  return Marionette;
})(Backbone, _, window.jQuery || window.Zepto || window.ender);

