(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory(require('underscore'), require('backbone'));
    }
    else if(typeof define === 'function' && define.amd) {
        define(['underscore', 'backbone'], factory);
    }
    else {
        root.Backbone.Obscura = factory(root._, root.Backbone);
    }
}(this, function(_, Backbone) {
var require=function(name){return {"backbone":Backbone,"underscore":_}[name];};
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"HusaU0":[function(require,module,exports){

var _ = require('underscore');
var Backbone = require('backbone');

var FilteredCollection = require('backbone-filtered-collection');
var SortedCollection = require('backbone-sorted-collection');
var PaginatedCollection = require('backbone-paginated-collection');
var proxyCollection = require('backbone-collection-proxy');
var proxyEvents = require('./src/proxy-events.js');

function Obscura(superset, options) {
  this._superset = superset;

  this._filtered = new FilteredCollection(superset, options);
  this._sorted = new SortedCollection(this._filtered, options);
  this._paginated = new PaginatedCollection(this._sorted, options);

  proxyCollection(this._paginated, this);
  proxyEvents.call(this, this._filtered, filteredEvents);
  proxyEvents.call(this, this._sorted, sortedEvents);
  proxyEvents.call(this, this._paginated, paginatedEvents);
}

var methods = {

  superset: function() {
    return this._superset;
  },

  getFilteredLength: function() {
    return this._filtered.length;
  },

  removeTransforms: function() {
    this._filtered.resetFilters();
    this._sorted.removeSort();
    this._paginated.removePagination();
    return this;
  },

  destroy: function() {
    this.stopListening();
    this._filtered.destroy();
    this._sorted.destroy();
    this._paginated.destroy();
    this.length = 0;

    this.trigger('obscura:destroy');
  }

};

// Methods on `this._filtered` we will expose to the outside world
var filteredMethods = [
  'filterBy', 'removeFilter', 'resetFilters', 'refilter', 'hasFilter',
  'getFilters'
];

// Events fired from `this._filtered` that we will forward
var filteredEvents = [
  'filtered:add', 'filtered:remove', 'filtered:reset'
];

// Methods on `this._sorted` we will expose to the outside world
var sortedMethods = [ 'setSort', 'reverseSort', 'removeSort' ];

// Events fired from `this._sorted` that we will forward
var sortedEvents = [
  'sorted:add', 'sorted:remove'
];

// Methods on `this._paginated` we will expose to the outside world
var paginatedMethods = [
  'setPerPage', 'setPage', 'getPerPage', 'getNumPages', 'getPage',
  'hasNextPage', 'hasPrevPage', 'nextPage', 'prevPage', 'movePage',
  'removePagination', 'firstPage', 'lastPage'
];

// Events fired from `this._paginated` that we will forward
var paginatedEvents = [
  'paginated:change:perPage', 'paginated:change:page', 'paginated:change:numPages'
];

// Extend obscura with each of the above methods, passing the call to the underlying
// collection.
//
// The return value is checked because some of the methods return `this` to allow
// chaining, and returning the internal collection would break the abstraction. In
// the cases where it would return the internal collection, we can return a reference
// to the Obscura proxy, which gives it the expected behavior.

_.each(filteredMethods, function(method) {
  methods[method] = function() {
    var result = FilteredCollection.prototype[method].apply(this._filtered, arguments);
    return result === this._filtered ? this : result;
  };
});

_.each(paginatedMethods, function(method) {
  methods[method] = function() {
    var result = PaginatedCollection.prototype[method].apply(this._paginated, arguments);
    return result === this._paginated ? this : result;
  };
});

_.each(sortedMethods, function(method) {
  methods[method] = function() {
    var result = SortedCollection.prototype[method].apply(this._sorted, arguments);
    return result === this._sorted ? this : result;
  };
});

_.extend(Obscura.prototype, methods, Backbone.Events);

// Expose the other proxy types so that the user can use them on their own if they want
Obscura.FilteredCollection = FilteredCollection;
Obscura.SortedCollection = SortedCollection;
Obscura.PaginatedCollection = PaginatedCollection;

module.exports = Obscura;


},{"./src/proxy-events.js":9,"backbone":false,"backbone-collection-proxy":3,"backbone-filtered-collection":4,"backbone-paginated-collection":6,"backbone-sorted-collection":7,"underscore":false}],"obscura":[function(require,module,exports){
module.exports=require('HusaU0');
},{}],3:[function(require,module,exports){

var _ = require('underscore');
var Backbone = require('backbone');

// Methods in the collection prototype that we won't expose
var blacklistedMethods = [
  "_onModelEvent", "_prepareModel", "_removeReference", "_reset", "add",
  "initialize", "sync", "remove", "reset", "set", "push", "pop", "unshift",
  "shift", "sort", "parse", "fetch", "create", "model", "off", "on",
  "listenTo", "listenToOnce", "bind", "trigger", "once", "stopListening"
];

var eventWhiteList = [
  'add', 'remove', 'reset', 'sort', 'destroy'
];

function proxyCollection(from, target) {

  function updateLength() {
    target.length = from.length;
  }

  function pipeEvents(eventName) {
    var args = _.toArray(arguments);
    var isChangeEvent = eventName === 'change' ||
                        eventName.slice(0, 7) === 'change:';

    // In the case of a `reset` event, the Collection.models reference
    // is updated to a new array, so we need to update our reference.
    if (eventName === 'reset') {
      target.models = from.models;
    }

    if (_.contains(eventWhiteList, eventName)) {
      if (_.contains(['add', 'remove', 'destory'], eventName)) {
        args[2] = target;
      } else if (_.contains(['reset', 'sort'], eventName)) {
        args[1] = target;
      }
      target.trigger.apply(this, args);
    } else if (isChangeEvent) {
      // In some cases I was seeing change events fired after the model
      // had already been removed from the collection.
      if (target.contains(args[1])) {
        target.trigger.apply(this, args);
      }
    }
  }

  var methods = {};

  _.each(_.functions(Backbone.Collection.prototype), function(method) {
    if (!_.contains(blacklistedMethods, method)) {
      methods[method] = function() {
        return from[method].apply(from, arguments);
      };
    }
  });

  _.extend(target, Backbone.Events, methods);

  target.listenTo(from, 'all', updateLength);
  target.listenTo(from, 'all', pipeEvents);
  target.models = from.models;

  updateLength();
  return target;
}

module.exports = proxyCollection;


},{"backbone":false,"underscore":false}],4:[function(require,module,exports){
var _ = require('underscore');
var Backbone = require('backbone');
var proxyCollection = require('backbone-collection-proxy');
var createFilter = require('./src/create-filter.js');

// Beware of `this`
// All of the following functions are meant to be called in the context
// of the FilteredCollection object, but are not public functions.

function invalidateCache() {
  this._filterResultCache = {};
}

function invalidateCacheForFilter(filterName) {
  for (var cid in this._filterResultCache) {
    if (this._filterResultCache.hasOwnProperty(cid)) {
      delete this._filterResultCache[cid][filterName];
    }
  }
}

function addFilter(filterName, filterObj) {
  // If we've already had a filter of this name, we need to invalidate
  // any and all of the cached results
  if (this._filters[filterName]) {
    invalidateCacheForFilter.call(this, filterName);
  }

  this._filters[filterName] = filterObj;
  this.trigger('filtered:add', filterName);
}

function removeFilter(filterName) {
  delete this._filters[filterName];
  invalidateCacheForFilter.call(this, filterName);
  this.trigger('filtered:remove', filterName);
}

function execFilterOnModel(model) {
  if (!this._filterResultCache[model.cid]) {
    this._filterResultCache[model.cid] = {};
  }

  var cache = this._filterResultCache[model.cid];

  for (var filterName in this._filters) {
    if (this._filters.hasOwnProperty(filterName)) {
      // if we haven't already calculated this, calculate it and cache
      if (!cache.hasOwnProperty(filterName)) {
        cache[filterName] = this._filters[filterName].fn(model);
      }
      if (!cache[filterName]) {
        return false;
      }
    }
  }
  return true;
}

function execFilter() {
  var filtered = [];

  // Filter the collection
  if (this._superset) {
    filtered = this._superset.filter(_.bind(execFilterOnModel, this));
  }

  this._collection.reset(filtered);
  this.length = this._collection.length;
}

function onAddChange(model) {
  // reset the cached results
  this._filterResultCache[model.cid] = {};

  if (execFilterOnModel.call(this, model)) {
    if (!this._collection.get(model.cid)) {
      var index = this.superset().indexOf(model);

      // Find the index at which to insert the model in the
      // filtered collection by finding the index of the
      // previous non-filtered model in the filtered collection
      var filteredIndex = null;
      for (var i = index - 1; i >= 0; i -= 1) {
        if (this.contains(this.superset().at(i))) {
          filteredIndex = this.indexOf(this.superset().at(i)) + 1;
          break;
        }
      }
      filteredIndex = filteredIndex || 0;

      this._collection.add(model, { at: filteredIndex });
    }
  } else {
    if (this._collection.get(model.cid)) {
      this._collection.remove(model);
    }
  }
  this.length = this._collection.length;
}

// This fires on 'change:[attribute]' events. We only want to
// remove this model if it fails the test, but not add it if
// it does. If we remove it, it will prevent the 'change'
// events from being forwarded, and if we add it, it will cause
// an unneccesary 'change' event to be forwarded without the
// 'change:[attribute]' that goes along with it.
function onModelAttributeChange(model) {
  // reset the cached results
  this._filterResultCache[model.cid] = {};

  if (!execFilterOnModel.call(this, model)) {
    if (this._collection.get(model.cid)) {
      this._collection.remove(model);
    }
  }
}

function onAll(eventName, model, value) {
  if (eventName.slice(0, 7) === "change:") {
    onModelAttributeChange.call(this, arguments[1]);
  }
}

function onModelRemove(model) {
  if (this.contains(model)) {
    this._collection.remove(model);
  }
  this.length = this._collection.length;
}

function Filtered(superset) {
  // Save a reference to the original collection
  this._superset = superset;

  // The idea is to keep an internal backbone collection with the filtered
  // set, and expose limited functionality.
  this._collection = new Backbone.Collection(superset.toArray());
  proxyCollection(this._collection, this);

  // Set up the filter data structures
  this.resetFilters();

  this.listenTo(this._superset, 'reset sort', execFilter);
  this.listenTo(this._superset, 'add change', onAddChange);
  this.listenTo(this._superset, 'remove', onModelRemove);
  this.listenTo(this._superset, 'all', onAll);
}

var methods = {

  defaultFilterName: '__default',

  filterBy: function(filterName, filter) {
    // Allow the user to skip the filter name if they're only using one filter
    if (!filter) {
      filter = filterName;
      filterName = this.defaultFilterName;
    }

    addFilter.call(this, filterName, createFilter(filter));

    execFilter.call(this);
    return this;
  },

  removeFilter: function(filterName) {
    if (!filterName) {
      filterName = this.defaultFilterName;
    }

    removeFilter.call(this, filterName);

    execFilter.call(this);
    return this;
  },

  resetFilters: function() {
    this._filters = {};
    invalidateCache.call(this);

    this.trigger('filtered:reset');

    execFilter.call(this);
    return this;
  },

  superset: function() {
    return this._superset;
  },

  refilter: function(arg) {
    if (typeof arg === "object" && arg.cid) {
      // is backbone model, refilter that one
      onAddChange.call(this, arg);
    } else {
      // refilter everything
      invalidateCache.call(this);
      execFilter.call(this);
    }

    return this;
  },

  getFilters: function() {
    return  _.keys(this._filters);
  },

  hasFilter: function(name) {
    return _.contains(this.getFilters(), name);
  },

  destroy: function() {
    this.stopListening();
    this._collection.reset([]);
    this._superset = this._collection;
    this.length = 0;

    this.trigger('filtered:destroy');
  }

};

// Build up the prototype
_.extend(Filtered.prototype, methods, Backbone.Events);

module.exports = Filtered;


},{"./src/create-filter.js":5,"backbone":false,"backbone-collection-proxy":3,"underscore":false}],5:[function(require,module,exports){
var _ = require('underscore');

// Converts a key and value into a function that accepts a model
// and returns a boolean.
function convertKeyValueToFunction(key, value) {
  return function(model) {
    return model.get(key) === value;
  };
}

// Converts a key and an associated filter function into a function
// that accepts a model and returns a boolean.
function convertKeyFunctionToFunction(key, fn) {
  return function(model) {
    return fn(model.get(key));
  };
}

function createFilterObject(filterFunction, keys) {
  // Make sure the keys value is either an array or null
  if (!_.isArray(keys)) {
    keys = null;
  }
  return { fn: filterFunction, keys: keys };
}

// Accepts an object in the form of:
//
//   {
//     key: value,
//     key: function(val) { ... }
//   }
//
// and turns it into a function that accepts a model an returns a
// boolean + a list of the keys that the function depends on.
function createFilterFromObject(filterObj) {
  var keys = _.keys(filterObj);

  var filterFunctions = _.map(keys, function(key) {
    var val = filterObj[key];
    if (_.isFunction(val)) {
      return convertKeyFunctionToFunction(key, val);
    }
    return convertKeyValueToFunction(key, val);
  });

  // Iterate through each of the generated filter functions. If any
  // are false, kill the computation and return false. The function
  // is only true if all of the subfunctions are true.
  var filterFunction = function(model) {
    for (var i = 0; i < filterFunctions.length; i++) {
      if (!filterFunctions[i](model)) {
        return false;
      }
    }
    return true;
  };

  return createFilterObject(filterFunction, keys);
}

// Expects one of the following:
//
//   - A filter function that accepts a model + (optional) array of
//     keys to listen to changes for or null)
//   - An object describing a filter
function createFilter(filter, keys) {
  // This must go first because _.isObject(fn) === true
  if (_.isFunction(filter)) {
    return createFilterObject(filter, keys);
  }

  // If the filter is an object describing a filter, generate the
  // appropriate function.
  if (_.isObject(filter)) {
    return createFilterFromObject(filter);
  }
}

module.exports = createFilter;


},{"underscore":false}],6:[function(require,module,exports){

var _ = require('underscore');
var Backbone = require('backbone');
var proxyCollection = require('backbone-collection-proxy');

function getPageLimits() {
  var start = this.getPage() * this.getPerPage();
  var end = start + this.getPerPage();
  return [start, end];
}

function updatePagination() {
  var pages = getPageLimits.call(this);
  this._collection.reset(this.superset().slice(pages[0], pages[1]));
}

function updateNumPages() {
  var currentNumPages = this._totalPages;
  var length = this.superset().length;
  var perPage = this.getPerPage();

  // If the # of objects can be exactly divided by the number
  // of pages, it would leave an empty last page if we took
  // the floor.
  var totalPages = length % perPage === 0 ?
    (length / perPage) : Math.floor(length / perPage) + 1;

  var numPagesChanged = this._totalPages !== totalPages;
  this._totalPages = totalPages;

  if (numPagesChanged) {
    this.trigger('paginated:change:numPages', { numPages: totalPages });
  }

  // Test to see if we are past the last page, and if so,
  // move back. Return true so that we can test to see if
  // this happened.
  if (this.getPage() >= totalPages) {
    this.setPage(totalPages - 1);
    return true;
  }
}

function recalculatePagination() {
  if (updateNumPages.call(this)) { return; }
  updatePagination.call(this);
}

// Given two arrays of backbone models, with at most one model added
// and one model removed from each, return the model in arrayA that
// is not in arrayB or undefined.
function difference(arrayA, arrayB) {
  var maxLength = _.max([ arrayA.length, arrayB.length ]);

  for (var i = 0, j = 0; i < maxLength; i += 1, j += 1) {
    if (arrayA[i] !== arrayB[j]) {
      if (arrayB[i-1] === arrayA[i]) {
        j -= 1;
      } else if (arrayB[i+1] === arrayA[i]) {
        j += 1;
      } else {
        return arrayA[i];
      }
    }
  }
}

function onAddRemove(model, collection, options) {
  if (updateNumPages.call(this)) { return; }

  var pages = getPageLimits.call(this);
  var start = pages[0], end = pages[1];

  // We are only adding and removing at most one model at a time,
  // so we can find just those two models. We could probably rewrite
  // `collectionDifference` to only make on pass instead of two. This
  // is a bottleneck on the total size of collections. I was getting
  // slow unit tests around 30,000 models / page in Firefox.
  var toAdd = difference(this.superset().slice(start, end), this._collection.toArray());
  var toRemove = difference(this._collection.toArray(), this.superset().slice(start, end));

  if (toRemove) {
    this._collection.remove(toRemove);
  }

  if (toAdd) {
    this._collection.add(toAdd, {
      at: this.superset().indexOf(toAdd) - start
    });
  }
}

function Paginated(superset, options) {
  // Save a reference to the original collection
  this._superset = superset;

  // The idea is to keep an internal backbone collection with the paginated
  // set, and expose limited functionality.
  this._collection = new Backbone.Collection(superset.toArray());
  this._page = 0;
  this.setPerPage((options && options.perPage) ? options.perPage : null);

  proxyCollection(this._collection, this);

  this.listenTo(this._superset, 'add remove', onAddRemove);
  this.listenTo(this._superset, 'reset sort', recalculatePagination);
}

var methods = {

  removePagination: function() {
    this.setPerPage(null);
    return this;
  },

  setPerPage: function(perPage) {
    this._perPage = perPage;
    recalculatePagination.call(this);
    this.setPage(0);

    this.trigger('paginated:change:perPage', {
      perPage: perPage,
      numPages: this.getNumPages()
    });

    return this;
  },

  setPage: function(page) {
    // The lowest page we could set
    var lowerLimit = 0;
    // The highest page we could set
    var upperLimit = this.getNumPages() - 1;

    // If the page is higher or lower than these limits,
    // set it to the limit.
    page = page > lowerLimit ? page : lowerLimit;
    page = page < upperLimit ? page : upperLimit;
    page = page < 0 ? 0 : page;

    this._page = page;
    updatePagination.call(this);

    this.trigger('paginated:change:page', { page: page });
    return this;
  },

  getPerPage: function() {
    return this._perPage || this.superset().length || 1;
  },

  getNumPages: function() {
    return this._totalPages;
  },

  getPage: function() {
    return this._page;
  },

  hasNextPage: function() {
    return this.getPage() < this.getNumPages() - 1;
  },

  hasPrevPage: function() {
    return this.getPage() > 0;
  },

  nextPage: function() {
    this.movePage(1);
    return this;
  },

  prevPage: function() {
    this.movePage(-1);
    return this;
  },

  firstPage: function() {
    this.setPage(0);
  },

  lastPage: function() {
    this.setPage(this.getNumPages() - 1);
  },

  movePage: function(delta) {
    this.setPage(this.getPage() + delta);
    return this;
  },

  superset: function() {
    return this._superset;
  },

  destroy: function() {
    this.stopListening();
    this._collection.reset([]);
    this._superset = this._collection;
    this._page = 0;
    this._totalPages = 0;
    this.length = 0;

    this.trigger('paginated:destroy');
  }

};

// Build up the prototype
_.extend(Paginated.prototype, methods, Backbone.Events);

module.exports =  Paginated;


},{"backbone":false,"backbone-collection-proxy":3,"underscore":false}],7:[function(require,module,exports){

var _ = require('underscore');
var Backbone =require('backbone');
var proxyCollection = require('backbone-collection-proxy');
var reverseSortedIndex = require('./src/reverse-sorted-index.js');

function lookupIterator(value) {
  return _.isFunction(value) ? value : function(obj){ return obj.get(value); };
}

function modelInsertIndex(model) {
  if (!this._comparator) {
    return this._superset.indexOf(model);
  } else {
    if (!this._reverse) {
      return _.sortedIndex(this._collection.toArray(), model, lookupIterator(this._comparator));
    } else {
      return reverseSortedIndex(this._collection.toArray(), model, lookupIterator(this._comparator));
    }
  }
}

function onAdd(model) {
  var index = modelInsertIndex.call(this, model);
  this._collection.add(model, { at: index });
}

function onRemove(model) {
  if (this.contains(model)) {
    this._collection.remove(model);
  }
}

function onChange(model) {
  if (this.contains(model) && this._collection.indexOf(model) !== modelInsertIndex.call(this, model)) {
    this._collection.remove(model);
    onAdd.call(this, model);
  }
}

function sort() {
  if (!this._comparator) {
    this._collection.reset(this._superset.toArray());
    return;
  }

  var newOrder = this._superset.sortBy(this._comparator);
  this._collection.reset(this._reverse ? newOrder.reverse() : newOrder);
}

function Sorted(superset) {
  // Save a reference to the original collection
  this._superset = superset;
  this._reverse = false;
  this._comparator = null;

  // The idea is to keep an internal backbone collection with the paginated
  // set, and expose limited functionality.
  this._collection = new Backbone.Collection(superset.toArray());
  proxyCollection(this._collection, this);

  this.listenTo(this._superset, 'add', onAdd);
  this.listenTo(this._superset, 'remove', onRemove);
  this.listenTo(this._superset, 'change', onChange);
  this.listenTo(this._superset, 'reset', sort);
}

var methods = {

  setSort: function(comparator, direction) {
    this._reverse = direction === 'desc' ? true : false;
    this._comparator = comparator;

    sort.call(this);

    if (!comparator) {
      this.trigger('sorted:remove');
    } else {
      this.trigger('sorted:add');
    }

    return this;
  },

  reverseSort: function() {
    this._reverse = !this._reverse;
    sort.call(this);

    return this;
  },

  removeSort: function() {
    this.setSort();
    return this;
  },

  superset: function() {
    return this._superset;
  },

  destroy: function() {
    this.stopListening();
    this._collection.reset([]);
    this._superset = this._collection;
    this.length = 0;

    this.trigger('sorted:destroy');
  }

};

// Build up the prototype
_.extend(Sorted.prototype, methods, Backbone.Events);

module.exports = Sorted;


},{"./src/reverse-sorted-index.js":8,"backbone":false,"backbone-collection-proxy":3,"underscore":false}],8:[function(require,module,exports){

var _ = require('underscore');

// Underscore provides a .sortedIndex function that works
// when sorting ascending based on a function or a key, but there's no
// way to do the same thing when sorting descending. This is a slight
// modification of the underscore / backbone code to do the same thing
// but descending.

function lookupIterator(value) {
  return _.isFunction(value) ? value : function(obj){ return obj[value]; };
}

function reverseSortedIndex(array, obj, iterator, context) {
  iterator = iterator == null ? _.identity : lookupIterator(iterator);
  var value = iterator.call(context, obj);
  var low = 0, high = array.length;
  while (low < high) {
    var mid = (low + high) >>> 1;
    iterator.call(context, array[mid]) < value ? high = mid : low = mid + 1;
  }
  return low;
}

module.exports = reverseSortedIndex;

},{"underscore":false}],9:[function(require,module,exports){
var _ = require('underscore');

function proxyEvents(from, eventNames) {
  _.each(eventNames, function(eventName) {
    this.listenTo(from, eventName, function() {
      var args = _.toArray(arguments);
      args.unshift(eventName);
      this.trigger.apply(this, args);
    });
  }, this);
}

module.exports = proxyEvents;

},{"underscore":false}]},{},[])
return require('obscura');

}));

