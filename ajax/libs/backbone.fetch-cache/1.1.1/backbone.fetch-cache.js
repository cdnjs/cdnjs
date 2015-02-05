/*!
  backbone.fetch-cache v1.1.1
  by Andy Appleton - https://github.com/mrappleton/backbone-fetch-cache.git
 */

// AMD wrapper from https://github.com/umdjs/umd/blob/master/amdWebGlobal.js

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module and set browser global
    define(['underscore', 'backbone', 'jquery'], function (_, Backbone, $) {
      return (root.Backbone = factory(_, Backbone, $));
    });
  } else {
    // Browser globals
    root.Backbone = factory(root._, root.Backbone, root.jQuery);
  }
}(this, function (_, Backbone, $) {

  // Setup
  var superMethods = {
    modelFetch: Backbone.Model.prototype.fetch,
    modelSync: Backbone.Model.prototype.sync,
    collectionFetch: Backbone.Collection.prototype.fetch
  },
  supportLocalStorage = (function() {
    var supported = typeof window.localStorage !== 'undefined';
    if (supported) {
      try {
        // impossible to write on some platforms when private browsing is on and
        // throws an exception = local storage not supported.
        localStorage.setItem("test_support", "test_support");
        localStorage.removeItem("test_support");
      } catch (e) {
        supported = false;
      }
    }
    return supported;
  })();

  Backbone.fetchCache = (Backbone.fetchCache || {});
  Backbone.fetchCache._cache = (Backbone.fetchCache._cache || {});

  Backbone.fetchCache.priorityFn = function(a, b) {
    if (!a || !a.expires || !b || !b.expires) {
      return a;
    }

    return a.expires - b.expires;
  };

  Backbone.fetchCache._prioritize = function() {
    var sorted = _.values(this._cache).sort(this.priorityFn);
    var index = _.indexOf(_.values(this._cache), sorted[0]);
    return _.keys(this._cache)[index];
  };

  Backbone.fetchCache._deleteCacheWithPriority = function() {
    Backbone.fetchCache._cache[this._prioritize()] = null;
    delete Backbone.fetchCache._cache[this._prioritize()];
    Backbone.fetchCache.setLocalStorage();
  };

  if (typeof Backbone.fetchCache.localStorage === 'undefined') {
    Backbone.fetchCache.localStorage = true;
  }

  // Shared methods
  function getCacheKey(instance, opts) {
    var url;

    if(opts && opts.url) {
      url = opts.url;
    } else {
      url = _.isFunction(instance.url) ? instance.url() : instance.url;
    }

    // Need url to use as cache key so return if we can't get it
    if(!url) { return; }

    if(opts && opts.data) {
      return url + "?" + $.param(opts.data);
    }
    return url;
  }

  function setCache(instance, opts, attrs) {
    opts = (opts || {});
    var key = Backbone.fetchCache.getCacheKey(instance, opts),
        expires = false;

    // Need url to use as cache key so return if we can't get it
    if (!key) { return; }

    // Never set the cache if user has explicitly said not to
    if (opts.cache === false) { return; }

    // Don't set the cache unless cache: true or prefill: true option is passed
    if (!(opts.cache || opts.prefill)) { return; }

    if (opts.expires !== false) {
      expires = (new Date()).getTime() + ((opts.expires || 5 * 60) * 1000);
    }

    Backbone.fetchCache._cache[key] = {
      expires: expires,
      value: attrs
    };

    Backbone.fetchCache.setLocalStorage();
  }

  function clearItem(key) {
    delete Backbone.fetchCache._cache[key];
    Backbone.fetchCache.setLocalStorage();
  }

  function setLocalStorage() {
    if (!supportLocalStorage || !Backbone.fetchCache.localStorage) { return; }
    try {
      localStorage.setItem('backboneCache', JSON.stringify(Backbone.fetchCache._cache));
    } catch (err) {
      var code = err.code || err.number || err.message;
      if (code === 22) {
        this._deleteCacheWithPriority();
      } else {
        throw(err);
      }
    }
  }

  function getLocalStorage() {
    if (!supportLocalStorage || !Backbone.fetchCache.localStorage) { return; }
    var json = localStorage.getItem('backboneCache') || '{}';
    Backbone.fetchCache._cache = JSON.parse(json);
  }

  function nextTick(fn) {
    return window.setTimeout(fn, 0);
  }

  // Instance methods
  Backbone.Model.prototype.fetch = function(opts) {
    opts = (opts || {});
    var key = Backbone.fetchCache.getCacheKey(this, opts),
        data = Backbone.fetchCache._cache[key],
        expired = false,
        attributes = false,
        deferred = new $.Deferred(),
        self = this;

    function setData() {
      self.set(self.parse(attributes), opts);
      if (_.isFunction(opts.prefillSuccess)) { opts.prefillSuccess(self, attributes, opts); }

      // Trigger sync events
      self.trigger('cachesync', self, attributes, opts);
      self.trigger('sync', self, attributes, opts);

      // Notify progress if we're still waiting for an AJAX call to happen...
      if (opts.prefill) { deferred.notify(self); }
      // ...finish and return if we're not
      else {
        if (_.isFunction(opts.success)) { opts.success(self, attributes, opts); }
        deferred.resolve(self);
      }
    }

    if (data) {
      expired = data.expires;
      expired = expired && data.expires < (new Date()).getTime();
      attributes = data.value;
    }

    if (!expired && (opts.cache || opts.prefill) && attributes) {
      // Ensure that cache resolution adhers to async option, defaults to true.
      if (opts.async == null) { opts.async = true; }

      if (opts.async) {
        nextTick(setData);
      } else {
        setData();
      }

      if (!opts.prefill) {
        return deferred.promise();
      }
    }

    // Delegate to the actual fetch method and store the attributes in the cache
    superMethods.modelFetch.apply(this, arguments)
      // resolve the returned promise when the AJAX call completes
      .done( _.bind(deferred.resolve, this, this) )
      // Set the new data in the cache
      .done( _.bind(Backbone.fetchCache.setCache, null, this, opts) )
      // Reject the promise on fail
      .fail( _.bind(deferred.reject, this, this) );

    // return a promise which provides the same methods as a jqXHR object
    return deferred.promise();
  };

  // Override Model.prototype.sync and try to clear cache items if it looks
  // like they are being updated.
  Backbone.Model.prototype.sync = function(method, model, options) {
    // Only empty the cache if we're doing a create, update, patch or delete.
    if (method === 'read') {
      return superMethods.modelSync.apply(this, arguments);
    }

    var collection = model.collection,
        keys = [],
        i, len;

    // Build up a list of keys to delete from the cache, starting with this
    keys.push(Backbone.fetchCache.getCacheKey(model));

    // If this model has a collection, also try to delete the cache for that
    if (!!collection) {
      keys.push(Backbone.fetchCache.getCacheKey(collection));
    }

    // Empty cache for all found keys
    for (i = 0, len = keys.length; i < len; i++) { clearItem(keys[i]); }

    return superMethods.modelSync.apply(this, arguments);
  };

  Backbone.Collection.prototype.fetch = function(opts) {
    opts = (opts || {});
    var key = Backbone.fetchCache.getCacheKey(this, opts),
        data = Backbone.fetchCache._cache[key],
        expired = false,
        attributes = false,
        deferred = new $.Deferred(),
        self = this;

    function setData() {
      self[opts.reset ? 'reset' : 'set'](self.parse(attributes), opts);
      if (_.isFunction(opts.prefillSuccess)) { opts.prefillSuccess(self); }

      // Trigger sync events
      self.trigger('cachesync', self, attributes, opts);
      self.trigger('sync', self, attributes, opts);

      // Notify progress if we're still waiting for an AJAX call to happen...
      if (opts.prefill) { deferred.notify(self); }
      // ...finish and return if we're not
      else {
        if (_.isFunction(opts.success)) { opts.success(self, attributes, opts); }
        deferred.resolve(self);
      }
    }

    if (data) {
      expired = data.expires;
      expired = expired && data.expires < (new Date()).getTime();
      attributes = data.value;
    }

    if (!expired && (opts.cache || opts.prefill) && attributes) {
      // Ensure that cache resolution adhers to async option, defaults to true.
      if (opts.async == null) { opts.async = true; }

      if (opts.async) {
        nextTick(setData);
      } else {
        setData();
      }

      if (!opts.prefill) {
        return deferred.promise();
      }
    }

    // Delegate to the actual fetch method and store the attributes in the cache
    superMethods.collectionFetch.apply(this, arguments)
      // resolve the returned promise when the AJAX call completes
      .done( _.bind(deferred.resolve, this, this) )
      // Set the new data in the cache
      .done( _.bind(Backbone.fetchCache.setCache, null, this, opts) )
      // Reject the promise on fail
      .fail( _.bind(deferred.reject, this, this) );

    // return a promise which provides the same methods as a jqXHR object
    return deferred.promise();
  };

  // Prime the cache from localStorage on initialization
  getLocalStorage();

  // Exports

  Backbone.fetchCache._superMethods = superMethods;
  Backbone.fetchCache.setCache = setCache;
  Backbone.fetchCache.getCacheKey = getCacheKey;
  Backbone.fetchCache.clearItem = clearItem;
  Backbone.fetchCache.setLocalStorage = setLocalStorage;
  Backbone.fetchCache.getLocalStorage = getLocalStorage;

  return Backbone;
}));
