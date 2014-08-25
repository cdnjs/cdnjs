/*!
 * backbone.layoutmanager.js v0.7.1
 * Copyright 2012, Tim Branyen (@tbranyen)
 * backbone.layoutmanager.js may be freely distributed under the MIT license.
 */
(function(window) {

"use strict";

// Hoisted, referenced at the bottom of the source.  This caches a list of all
// LayoutManager options at definition time.
var keys;

// Localize global dependency references.
var Backbone = window.Backbone;
var _ = window._;
var $ = window.$;

// Maintain references to the two `Backbone.View` functions that are
// overwritten so that they can be proxied.
var _configure = Backbone.View.prototype._configure;
var render = Backbone.View.prototype.render;

// Cache these methods for performance.
var aPush = Array.prototype.push;
var aConcat = Array.prototype.concat;
var aSplice = Array.prototype.splice;

// LayoutManager is a wrapper around a `Backbone.View`.
var LayoutManager = Backbone.View.extend({
  // This named function allows for significantly easier debugging.
  constructor: function Layout(options) {
    // Options may not always be passed to the constructor, this ensures it is
    // always an object.
    options = options || {};

    // Grant this View superpowers.
    LayoutManager.setupView(this, options);

    // Have Backbone set up the rest of this View.
    Backbone.View.call(this, options);
  },

  // Shorthand to `setView` function with the `append` flag set.
  insertView: function(selector, view) {
    // If the `view` argument exists, then a selector was passed in.  This code
    // path will forward the selector on to `setView`.
    if (view) {
      return this.setView(selector, view, true);
    }

    // If no `view` argument is defined, then assume the first argument is the
    // View, somewhat now confusingly named `selector`.
    return this.setView(selector, true);
  },

  // Iterate over an object and ensure every value is wrapped in an array to
  // ensure they will be appended, then pass that object to `setViews`.
  insertViews: function(views) {
    // If an array of views was passed it should be inserted into the
    // root view. Much like calling insertView without a selector
    if (_.isArray(views)) {
      return this.setViews({'': views});
    }

    _.each(views, function(view, selector) {
      views[selector] = _.isArray(view) ? view : [view];
    });

    return this.setViews(views);
  },

  // Returns the View that matches the `getViews` filter function.
  getView: function(fn) {
    return this.getViews(fn).first().value();
  },

  // Provide a filter function to get a flattened array of all the subviews.
  // If the filter function is omitted it will return all subviews.  If a 
  // String is passed instead, it will return the Views for that selector.
  getViews: function(fn) {
    // Generate an array of all top level (no deeply nested) Views flattened.
    var views = _.chain(this.views).map(function(view) {
      return _.isArray(view) ? view : [view];
    }, this).flatten().value();

    // If the filter argument is a String, then return a chained Version of the
    // elements.
    if (typeof fn === "string") {
      return _.chain([this.views[fn]]).flatten();
    }

    // If a filter function is provided, run it on all Views and return a
    // wrapped chain. Otherwise, simply return a wrapped chain of all Views.
    return _.chain(typeof fn === "function" ? _.filter(views, fn) : views);
  },

  // This takes in a partial name and view instance and assigns them to
  // the internal collection of views.  If a view is not a LayoutManager
  // instance, then mix in the LayoutManager prototype.  This ensures
  // all Views can be used successfully.
  //
  // Must definitely wrap any render method passed in or defaults to a
  // typical render function `return layout(this).render()`.
  setView: function(name, view, append) {
    var manager, existing, options;
    // Parent view, the one you are setting a View on.
    var root = this;

    // If no name was passed, use an empty string and shift all arguments.
    if (typeof name !== "string") {
      append = view;
      view = name;
      name = "";
    }

    // If the parent views object doesn't exist... create it.
    this.views = this.views || {};

    // Shorthand the `__manager__` property.
    manager = view.__manager__;

    // Shorthand the View that potentially already exists.
    existing = this.views[name];

    // If the View has not been properly set up, throw an Error message
    // indicating that the View needs `manage: true` set.
    if (!manager) {
      throw new Error("Please set `View#manage` property with selector '" +
        name + "' to `true`.");
    }

    // Assign options.
    options = view._options();

    // Add reference to the parentView.
    manager.parent = root;

    // Add reference to the placement selector used.
    manager.selector = name;

    // Code path is less complex for Views that are not being appended.  Simply
    // remove existing Views and bail out with the assignment.
    if (!append) {
      // If the View we are adding has already been rendered, simply inject it
      // into the parent.
      if (manager.hasRendered) {
        options.partial(root.el, manager.selector, view.el, manager.append); 
      }

      // Ensure remove is called when swapping View's.
      if (existing) {
        // If the views are an array, iterate and remove each individually.
        _.each(aConcat.call([], existing), function(nestedView) {
          nestedView.remove();
        });
      }

      // Assign to main views object and return for chainability.
      return this.views[name] = view;
    }

    // Ensure this.views[name] is an array and push this View to the end.
    this.views[name] = aConcat.call([], existing || [], view);

    // Put the view into `append` mode.
    manager.append = true;

    return view;
  },

  // Allows the setting of multiple views instead of a single view.
  setViews: function(views) {
    // Iterate over all the views and use the View's view method to assign.
    _.each(views, function(view, name) {
      // If the view is an array put all views into insert mode.
      if (_.isArray(view)) {
        return _.each(view, function(view) {
          this.insertView(name, view);
        }, this);
      }

      // Assign each view using the view function.
      this.setView(name, view);
    }, this);

    // Allow for chaining
    return this;
  },

  // By default this should find all nested views and render them into
  // the this.el and call done once all of them have successfully been
  // resolved.
  //
  // This function returns a promise that can be chained to determine
  // once all subviews and main view have been rendered into the view.el.
  render: function() {
    var root = this;
    var options = root._options();
    var manager = root.__manager__;
    var parent = manager.parent;
    var rentManager = parent && parent.__manager__;
    var def = options.deferred();

    // Triggered once the render has succeeded.
    function resolve() {
      var next;

      // If there is a parent, attach.
      if (parent) {
        if (!options.contains(parent.el, root.el)) {
          options.partial(parent.el, manager.selector, root.el,
            manager.append);
        }
      }

      // Ensure events are always correctly bound after rendering.
      root.delegateEvents();

      // Set this View as successfully rendered.
      manager.hasRendered = true;

      // Resolve the deferred.
      def.resolveWith(root, [root]);

      // Only process the queue if it exists.
      if (next = manager.queue.shift()) {
        // Ensure that the next render is only called after all other
        // `done` handlers have completed.  This will prevent `render`
        // callbacks from firing out of order.
        next();
      } else {
        // Once the queue is depleted, remove it, the render process has
        // completed.
        delete manager.queue;
      }

      // Reusable function for triggering the afterRender callback and event
      // and setting the hasRendered flag.
      function completeRender() {
        var afterRender = options.afterRender;

        if (afterRender) {
          afterRender.call(root, root);
        }

        // Always emit an afterRender event.
        root.trigger("afterRender", root);
      }

      // Special case for when a parent View that has not been rendered is
      // involved.
      if (rentManager && !rentManager.hasRendered) {
        // Wait until the parent View has finished rendering, which could be
        // asynchronous, and trigger afterRender on this View once it has
        // compeleted.
        return parent.on("afterRender", function() {
          // Wish we had `once` for this...
          parent.off("afterRender", null, this);

          // Trigger the afterRender and set hasRendered.
          completeRender();
        }, root);
      }

      // This View and its parent have both rendered.
      completeRender();
    }

    // Actually facilitate a render.
    function actuallyRender() {
      var options = root._options();
      var manager = root.__manager__;
      var parent = manager.parent;
      var rentManager = parent && parent.__manager__;

      // The `_viewRender` method is broken out to abstract away from having
      // too much code in `processRender`.
      root._render(LayoutManager._viewRender, options).done(function() {
        // If there are no children to worry about, complete the render
        // instantly.
        if (!_.keys(root.views).length) {
          return resolve();
        }

        // Create a list of promises to wait on until rendering is done.
        // Since this method will run on all children as well, its sufficient
        // for a full hierarchical. 
        var promises = _.map(root.views, function(view) {
          var append = _.isArray(view);

          // If items are being inserted, they will be in a non-zero length
          // Array.
          if (append && view.length) {
            // Only need to wait for the first View to complete, the rest
            // will be synchronous, by virtue of having the template cached.
            return view[0].render().pipe(function() {
              // Map over all the View's to be inserted and call render on
              // them all.  Once they have all resolved, resolve the other
              // deferred.
              return options.when(_.map(view.slice(1), function(insertView) {
                return insertView.render();
              }));
            });
          }

          // Only return the fetch deferred, resolve the main deferred after
          // the element has been attached to it's parent.
          return !append ? view.render() : view;
        });

        // Once all nested Views have been rendered, resolve this View's
        // deferred.
        options.when(promises).done(function() {
          resolve();
        });
      });
    }

    // Another render is currently happening if there is an existing queue, so
    // push a closure to render later into the queue.
    if (manager.queue) {
      aPush.call(manager.queue, function() {
        actuallyRender();
      });
    } else {
      manager.queue = [];

      // This the first `render`, preceeding the `queue` so render
      // immediately.
      actuallyRender(root, def);
    }

    // Add the View to the deferred so that `view.render().view.el` is
    // possible.
    def.view = root;
    
    // This is the promise that determines if the `render` function has
    // completed or not.
    return def;
  },

  // Ensure the cleanup function is called whenever remove is called.
  remove: function() {
    // Force remove itself from its parent.
    LayoutManager._removeView(this, true);

    // Call the original remove function.
    return this._remove.apply(this, arguments);
  },

  // Merge instance and global options.
  _options: function() {
    // Instance overrides take precedence, fallback to prototype options. In
    // Lo-Dash, `_.extend` will not copy over inherited properties, so the
    // `this.constructor.prototype` was added in to cover that case.
    return _.extend({}, this, this.constructor.prototype,
      LayoutManager.prototype.options, this.options);
  }
},
{
  // Clearable cache.
  _cache: {},

  // Creates a deferred and returns a function to call when finished.
  _makeAsync: function(options, done) {
    var handler = options.deferred();

    // Used to handle asynchronous renders.
    handler.async = function() {
      handler._isAsync = true;

      return done;
    };

    return handler;
  },

  // This gets passed to all _render methods.  The `root` value here is passed
  // from the `manage(this).render()` line in the `_render` function
  _viewRender: function(root, options) {
    var url, contents, fetchAsync;
    var manager = root.__manager__;

    // This function is responsible for pairing the rendered template into
    // the DOM element.
    function applyTemplate(rendered) {
      // Actually put the rendered contents into the element.
      if (rendered) {
        options.html(root.el, rendered);
      }

      // Resolve only after fetch and render have succeeded.
      fetchAsync.resolveWith(root, [root]);
    }

    // Once the template is successfully fetched, use its contents to proceed.
    // Context argument is first, since it is bound for partial application
    // reasons.
    function done(context, contents) {
      // Store the rendered template someplace so it can be re-assignable.
      var rendered;
      // This allows the `render` method to be asynchronous as well as `fetch`.
      var renderAsync = LayoutManager._makeAsync(options, function(rendered) {
        applyTemplate(rendered);
      });

      // Ensure the cache is up-to-date.
      LayoutManager.cache(url, contents);

      // Render the View into the el property.
      if (contents) {
        rendered = options.render.call(renderAsync, contents, context);
      }

      // If the function was synchronous, continue execution.
      if (!renderAsync._isAsync) {
        applyTemplate(rendered);
      }
    }

    return {
      // This `render` function is what gets called inside of the View render,
      // when `manage(this).render` is called.  Returns a promise that can be
      // used to know when the element has been rendered into its parent.
      render: function() {
        var context;
        var data = options.serialize || options.data;
        var template = root.template || options.template;

        // If data is a function, immediately call it.
        if (_.isFunction(data)) {
          data = data.call(root);
        }

        // This allows for `var done = this.async()` and then `done(contents)`.
        fetchAsync = LayoutManager._makeAsync(options, function(contents) {
          done(data, contents);
        });

        // Set the url to the prefix + the view's template property.
        if (typeof template === "string") {
          url = options.prefix + template;
        }

        // Check if contents are already cached and if they are, simply process
        // the template with the correct data.
        if (contents = LayoutManager.cache(url)) {
          done(data, contents, url);

          return fetchAsync;
        }

        // Fetch layout and template contents.
        if (typeof template === "string") {
          contents = options.fetch.call(fetchAsync, options.prefix + template);
        // If its not a string just pass the object/function/whatever.
        } else if (template != null) {
          contents = options.fetch.call(fetchAsync, template);
        }

        // If the function was synchronous, continue execution.
        if (!fetchAsync._isAsync) {
          done(data, contents);
        }

        return fetchAsync;
      }
    };
  },

  // Remove all nested Views.
  _removeViews: function(root, force) {
    // Shift arguments around.
    if (typeof root === "boolean") {
      force = root;
      root = this;
    }

    // Allow removeView to be called on instances.
    root = root || this;

    // Iterate over all of the nested View's and remove.
    root.getViews().each(function(view) {
      // Force doesn't care about if a View has rendered or not.
      if (view.__manager__.hasRendered || force) {
        LayoutManager._removeView(view, force);
      }
    });
  },

  // Remove a single nested View.
  _removeView: function(view, force) {
    var parentViews;
    // Shorthand the manager for easier access.
    var manager = view.__manager__;
    // Test for keep.
    var keep = typeof view.keep === "boolean" ? view.keep : view.options.keep;

    // Only remove views that do not have `keep` attribute set, unless the
    // View is in `append` mode and the force flag is set.
    if (!keep && (manager.append === true || force)) {
      // Clean out the events.
      LayoutManager.cleanViews(view);

      // Since we are removing this view, force subviews to remove
      view._removeViews(true);  
           
      // Remove the View completely.
      view.$el.remove();

      // Bail out early if no parent exists.
      if (!manager.parent) { return; }

      // Assign (if they exist) the sibling Views to a property.
      parentViews = manager.parent.views[manager.selector];

      // If this is an array of items remove items that are not marked to
      // keep.
      if (_.isArray(parentViews)) {
        // Remove duplicate Views.
        return _.each(_.clone(parentViews), function(view, i) {
          // If the managers match, splice off this View.
          if (view && view.__manager__ === manager) {
            aSplice.call(parentViews, i, 1);
          }
        });
      }

      // Otherwise delete the parent selector.
      delete manager.parent.views[manager.selector];
    }
  },

  // Accept either a single view or an array of views to clean of all DOM
  // events internal model and collection references and all Backbone.Events.
  cleanViews: function(views) {
    // Clear out all existing views.
    _.each(aConcat.call([], views), function(view) {
      // Remove all custom events attached to this View.
      view.unbind();

      // Automatically unbind `model`.
      if (view.model instanceof Backbone.Model) {
        view.model.off(null, null, view);
      }

      // Automatically unbind `collection`.
      if (view.collection instanceof Backbone.Collection) {
        view.collection.off(null, null, view);
      }

      // If a custom cleanup method was provided on the view, call it after
      // the initial cleanup is done
      if (view.cleanup) {
        view.cleanup.call(view);
      }
    });
  },

  // Cache templates into LayoutManager._cache.
  cache: function(path, contents) {
    // If template path is found in the cache, return the contents.
    if (path in this._cache) {
      return this._cache[path];
    // Ensure path and contents aren't undefined.
    } else if (path != null && contents != null) {
      return this._cache[path] = contents;
    }

    // If the template is not in the cache, return undefined.
  },

  // This static method allows for global configuration of LayoutManager.
  configure: function(opts) {
    _.extend(LayoutManager.prototype.options, opts);

    // Allow LayoutManager to manage Backbone.View.prototype.
    if (opts.manage) {
      Backbone.View.prototype.manage = true;
    }
  },

  // Configure a View to work with the LayoutManager plugin.
  setupView: function(view, options) {
    // If the View has already been setup, no need to do it again.
    if (view.__manager__) {
      return;
    }

    var views, declaredViews, viewOptions;
    var proto = Backbone.LayoutManager.prototype;
    var viewOverrides = _.pick(view, keys);

    // Ensure necessary properties are set.
    _.defaults(view, {
      // Ensure a view always has a views object.
      views: {},

      // Internal state object used to store whether or not a View has been
      // taken over by layout manager and if it has been rendered into the DOM.
      __manager__: {},

      // Add the ability to remove all Views.
      _removeViews: LayoutManager._removeViews,

      // Add the ability to remove itself.
      _removeView: LayoutManager._removeView

    // Mix in all LayoutManager prototype properties as well.
    }, LayoutManager.prototype);

    // Extend the options with the prototype and passed options.
    options = view.options = _.defaults(options || {}, view.options,
      proto.options);

    // Ensure view events are properly copied over.
    viewOptions = _.pick(options, aConcat.call(["events"],
      _.values(options.events)));

    // Merge the View options into the View.
    _.extend(view, viewOptions);

    // If the View still has the Backbone.View#render method, remove it.  Don't
    // want it accidentally overriding the LM render.
    if (viewOverrides.render === LayoutManager.prototype.render ||
      viewOverrides.render === Backbone.View.prototype.render) {
      delete viewOverrides.render;
    }

    // Pick out the specific properties that can be dynamically added at
    // runtime and ensure they are available on the view object.
    _.extend(options, viewOverrides);

    // By default the original Remove function is the Backbone.View one.
    view._remove = Backbone.View.prototype.remove;

    // Always use this render function when using LayoutManager.
    view._render = function(manage, options) {
      // Keep the view consistent between callbacks and deferreds.
      var view = this;
      // Shorthand the manager.
      var manager = view.__manager__;
      // Cache these properties.
      var beforeRender = options.beforeRender;

      // Ensure all nested Views are properly scrubbed if re-rendering.
      if (manager.hasRendered) {
        this._removeViews();
      }

      // If a beforeRender function is defined, call it.
      if (beforeRender) {
        beforeRender.call(this, this);
      }

      // Always emit a beforeRender event.
      this.trigger("beforeRender", this);

      // Render!
      return manage(this, options).render();
    };

    // Ensure the render is always set correctly.
    view.render = LayoutManager.prototype.render;

    // If the user provided their own remove override, use that instead of the
    // default.
    if (view.remove !== proto.remove) {
      view._remove = view.remove;
      view.remove = proto.remove;
    }
    
    // Normalize views to exist on either instance or options, default to
    // options.
    views = options.views || view.views;

    // Set the internal views, only if selectors have been provided.
    if (_.keys(views).length) {
      // Keep original object declared containing Views.
      declaredViews = views;

      // Reset the property to avoid duplication or overwritting.
      view.views = {};

      // Set the declared Views.
      view.setViews(declaredViews);
    }

    // If a template is passed use that instead.
    if (view.options.template) {
      view.options.template = options.template;
    // Ensure the template is mapped over.
    } else if (view.template) {
      options.template = view.template;

      // Remove it from the instance.
      delete view.template;
    }
  }
});

// Convenience assignment to make creating Layout's slightly shorter.
Backbone.Layout = Backbone.LayoutView = Backbone.LayoutManager = LayoutManager;
// Tack on the version.
LayoutManager.VERSION = "0.7.1";

// Override _configure to provide extra functionality that is necessary in
// order for the render function reference to be bound during initialize.
Backbone.View.prototype._configure = function() {
  // Run the original _configure.
  var retVal = _configure.apply(this, arguments);

  // If manage is set, do it!
  if (this.manage) {
    // Set up this View.
    LayoutManager.setupView(this);
  }

  // Act like nothing happened.
  return retVal;
};

// Default configuration options; designed to be overriden.
LayoutManager.prototype.options = {
  // Prefix template/layout paths.
  prefix: "",

  // Can be used to supply a different deferred implementation.
  deferred: function() {
    return $.Deferred();
  },

  // Fetch is passed a path and is expected to return template contents as a
  // function or string.
  fetch: function(path) {
    return _.template($(path).html());
  },

  // This is the most common way you will want to partially apply a view into
  // a layout.
  partial: function(root, name, el, append) {
    // If no selector is specified, assume the parent should be added to.
    var $root = name ? $(root).find(name) : $(root);

    // Use the append method if append argument is true.
    this[append ? "append" : "html"]($root, el);
  },

  // Override this with a custom HTML method, passed a root element and an
  // element to replace the innerHTML with.
  html: function(root, el) {
    $(root).html(el);
  },

  // Very similar to HTML except this one will appendChild.
  append: function(root, el) {
    $(root).append(el);
  },

  // Return a deferred for when all promises resolve/reject.
  when: function(promises) {
    return $.when.apply(null, promises);
  },

  // By default, render using underscore's templating.
  render: function(template, context) {
    return template(context);
  },

  // A method to determine if a View contains another.
  contains: function(parent, child) {
    return $.contains(parent, child);
  }
};

// Maintain a list of the keys at define time.
keys = _.keys(LayoutManager.prototype.options);

})(this);

