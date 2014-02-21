// Backbone.Marionette v0.9.7
//
// Copyright (C)2012 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.marionette

// Marionette.Async
// ----------------

// Provides asynchronous rendering implementations
// for the various view types in Marionette
Backbone.Marionette.Async = (function(Backbone, Marionette, _, $){

  // Configure Marionette to use the async rendering for all view types
  var Async = {
    init: function(){
      Marionette.TemplateCache = Async.TemplateCache;
      Marionette.Renderer = Async.Renderer;
      _.extend(Marionette.ItemView.prototype, Async.ItemView);
      _.extend(Marionette.CollectionView.prototype, Async.CollectionView);
      _.extend(Marionette.CompositeView.prototype, Async.CompositeView);
      _.extend(Marionette.Region.prototype, Async.Region);
    }
  };

// Async ItemView
// --------------

// An asynchronous rendering method for the `ItemView`. This method
// assumes template loading, data serialization, `beforRender`, and
// `onRender` functions are all asynchronous, using `jQuery.Deferred()`
// and `jQuery.when(...).then(...)` to manage async calls.
Async.ItemView = {
  render: function(){
    var that = this;

    var deferredRender = $.Deferred();

    var beforeRenderDone = function() {
      that.trigger("before:render", that);
      that.trigger("item:before:render", that);

      var deferredData = that.serializeData();
      $.when(deferredData).then(dataSerialized);
    } 

    var dataSerialized = function(data){
      var template = that.getTemplate();
      var asyncRender = Marionette.Renderer.render(template, data);
      $.when(asyncRender).then(templateRendered);
    }

    var templateRendered = function(html){
      that.$el.html(html);
      callDeferredMethod(that.onRender, onRenderDone, that);
    }

    var onRenderDone = function(){
      that.trigger("render", that);
      that.trigger("item:rendered", that);

      deferredRender.resolve();
    }

    callDeferredMethod(this.beforeRender, beforeRenderDone, this);

    return deferredRender.promise();
  }
};

// Async CollectionView
// --------------------

// provides async rendering for collection views
Async.CollectionView = {
  render: function(){
    var that = this;
    var deferredRender = $.Deferred();
    var promises;

    this.triggerBeforeRender();

    this.closeEmptyView();
    this.closeChildren();

    if (this.collection && this.collection.length > 0) {
      promises = this.showCollection();
    } else {
      var promise = this.showEmptyView();
      promises = [promise];
    }

    deferredRender.done(function(){
      that.triggerRendered();
    });

    $.when.apply(this, promises).then(function(){
      deferredRender.resolveWith(that);
    });

    return deferredRender.promise();
  },
  
  // Internal method to loop through each item in the
  // collection view and show it
  showCollection: function(){
    var that = this;
    var promises = [];

    var ItemView = this.getItemView();
    this.collection.each(function(item, index){
      var promise = that.addItemView(item, ItemView, index);
      promises.push(promise);
    });

    return promises;
  },

  // Internal method to show an empty view in place of
  // a collection of item views, when the collection is
  // empty
  showEmptyView: function(promises){
    var promise;
    var EmptyView = this.options.emptyView || this.emptyView;
    if (EmptyView && !this._showingEmptyView){
      this._showingEmptyView = true;
      var model = new Backbone.Model();
      promise = this.addItemView(model, EmptyView, 0);
    }
    return promise;
  },
  
  renderItemView: function(view, index) {
    var that = this;
    var viewRendered = view.render();
    $.when(viewRendered).then(function(){
      that.appendHtml(that, view, index);
    });
    return viewRendered;
  }
}

// Async Composite View
// --------------------

Async.CompositeView = {
  // Renders the model once, and the collection once. Calling
  // this again will tell the model's view to re-render itself
  // but the collection will not re-render.
  render: function(){
    var that = this;
    var compositeRendered = $.Deferred();

    this.resetItemViewContainer();

    var modelIsRendered = this.renderModel();
    $.when(modelIsRendered).then(function(html){
      that.$el.html(html);
      that.trigger("composite:model:rendered");
      that.trigger("render");

      var collectionIsRendered = that.renderCollection();
      $.when(collectionIsRendered).then(function(){
        compositeRendered.resolve();
      });
    });

    compositeRendered.done(function(){
      that.trigger("composite:rendered");
    });

    return compositeRendered.promise();
  },

  // Render the collection for the composite view
  renderCollection: function(){
    var collectionDeferred = Marionette.CollectionView.prototype.render.apply(this, arguments);
    collectionDeferred.done(function(){
      this.trigger("composite:collection:rendered");
    });
    return collectionDeferred.promise();
  }
}

// Async Region
// ------------

// Show a view that is rendered asynchronously, waiting for the view
// to be rendered before swaping it in.
Async.Region = {
  show: function(view){
    var that = this;
    var asyncShow = $.Deferred();

    this.ensureEl();
    this.close();

    // Wait for the view to finish rendering
    $.when(view.render()).then(function () {
      that.open(view);

      if (view.onShow) { view.onShow(); }
      view.trigger("show");

      if (that.onShow) { that.onShow(view); }
      that.trigger("view:show", view);
      
      asyncShow.resolve();
    });

    this.currentView = view;
    return asyncShow.promise();
  }
};
// Async Renderer
// --------------

// Render a template with data by passing in the template
// selector and the data to render. Do it all asynchronously.
Async.Renderer = {

  // Render a template with data. The `template` parameter is
  // passed to the `TemplateCache` object to retrieve the
  // template function. Override this method to provide your own
  // custom rendering and template handling for all of Marionette.
  render: function(template, data){
    var asyncRender = $.Deferred();

    var templateRetrieval = Marionette.TemplateCache.get(template);
    $.when(templateRetrieval).then(function(templateFunc){
      var html = templateFunc(data);
      asyncRender.resolve(html);
    });

    return asyncRender.promise();
  }
};


// Async Template Cache
// --------------------

// Manage templates stored in `<script>` blocks,
// caching them for faster access.
Async.TemplateCache = function(templateId){
  this.templateId = templateId;
};

// TemplateCache object-level methods. Manage the template
// caches from these method calls instead of creating 
// your own TemplateCache instances
_.extend(Async.TemplateCache, {
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
_.extend(Async.TemplateCache.prototype, {

  // Internal method to load the template asynchronously.
  load: function(){
    var that = this;

    // Guard clause to prevent loading this template more than once
    if (this.deferred){
      return this.deferred.promise();
    }

    // Load the template asynchronously
    this.deferred = $.Deferred();
    this.loadTemplate(this.templateId, function(template){
      that.template = template;
      that.deferred.resolve(template);
    });

    return this.deferred.promise();
  },

  // Load a template from the DOM, by default. Override
  // this method to provide your own template retrieval,
  // such as asynchronous loading from a server.
  loadTemplate: function(templateId, callback){
    var template = $(templateId).html();

    if (!template || template.length === 0){
      var msg = "Could not find template: '" + templateId + "'";
      var err = new Error(msg);
      err.name = "NoTemplateError";
      throw err;
    }

    template = this.compileTemplate(template);

    callback.call(this, template);
  },

  // Pre-compile the template before caching it. Override
  // this method if you do not need to pre-compile a template
  // (JST / RequireJS for example) or if you want to change
  // the template engine used (Handebars, etc).
  compileTemplate: function(rawTemplate){
    return _.template(rawTemplate);
  }
});


// Async Helpers
// -------------

// A simple wrapper method for deferring a callback until 
// after another method has been called, passing the
// results of the first method to the second. Uses jQuery's
// deferred / promise objects, and $.when/then to make it
// work.
var callDeferredMethod = function(fn, callback, context){
  var promise;
  if (fn) { promise = fn.call(context); }
  $.when(promise).then(_.bind(callback, context));
}

// Initialize the async-modules
Async.init();

  
  return Async;
})(Backbone, Backbone.Marionette, _, window.jQuery || window.Zepto || window.ender);
