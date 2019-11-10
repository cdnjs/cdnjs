// MarionetteJS (Backbone.Marionette)
// ----------------------------------
// v3.3.1
//
// Copyright (c)2017 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
//
// http://marionettejs.com


(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('backbone'), require('underscore'), require('backbone.radio')) :
	typeof define === 'function' && define.amd ? define(['backbone', 'underscore', 'backbone.radio'], factory) :
	(global.Marionette = global['Mn'] = factory(global.Backbone,global._,global.Backbone.Radio));
}(this, (function (Backbone,_,Radio) { 'use strict';

Backbone = 'default' in Backbone ? Backbone['default'] : Backbone;
_ = 'default' in _ ? _['default'] : _;
Radio = 'default' in Radio ? Radio['default'] : Radio;

var version = "3.3.1";

//Internal utility for creating context style global utils
var proxy = function proxy(method) {
  return function (context) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return method.apply(context, args);
  };
};

// Marionette.extend
// -----------------

// Borrow the Backbone `extend` method so we can use it as needed
var extend = Backbone.Model.extend;

/* global console */

var deprecate = function deprecate(message, test) {
  if (_.isObject(message)) {
    message = message.prev + ' is going to be removed in the future. ' + 'Please use ' + message.next + ' instead.' + (message.url ? ' See: ' + message.url : '');
  }

  if (!Marionette.DEV_MODE) {
    return;
  }

  if ((test === undefined || !test) && !deprecate._cache[message]) {
    deprecate._warn('Deprecation warning: ' + message);
    deprecate._cache[message] = true;
  }
};

deprecate._console = typeof console !== 'undefined' ? console : {};
deprecate._warn = function () {
  var warn = deprecate._console.warn || deprecate._console.log || _.noop;
  return warn.apply(deprecate._console, arguments);
};
deprecate._cache = {};

// Marionette.isNodeAttached
// -------------------------

// Determine if `el` is a child of the document
var isNodeAttached = function isNodeAttached(el) {
  return document.documentElement.contains(el && el.parentNode);
};

// Merge `keys` from `options` onto `this`
var mergeOptions = function mergeOptions(options, keys) {
  var _this = this;

  if (!options) {
    return;
  }

  _.each(keys, function (key) {
    var option = options[key];
    if (option !== undefined) {
      _this[key] = option;
    }
  });
};

// Marionette.getOption
// --------------------

// Retrieve an object, function or other value from the
// object or its `options`, with `options` taking precedence.
var getOption = function getOption(optionName) {
  if (!optionName) {
    return;
  }
  if (this.options && this.options[optionName] !== undefined) {
    return this.options[optionName];
  } else {
    return this[optionName];
  }
};

// Marionette.normalizeMethods
// ----------------------

// Pass in a mapping of events => functions or function names
// and return a mapping of events => functions
var normalizeMethods = function normalizeMethods(hash) {
  var _this = this;

  return _.reduce(hash, function (normalizedHash, method, name) {
    if (!_.isFunction(method)) {
      method = _this[method];
    }
    if (method) {
      normalizedHash[name] = method;
    }
    return normalizedHash;
  }, {});
};

// Trigger Method
// --------------

// split the event name on the ":"
var splitter = /(^|:)(\w)/gi;

// take the event section ("section1:section2:section3")
// and turn it in to uppercase name onSection1Section2Section3
function getEventName(match, prefix, eventName) {
  return eventName.toUpperCase();
}

var getOnMethodName = _.memoize(function (event) {
  return 'on' + event.replace(splitter, getEventName);
});

// Trigger an event and/or a corresponding method name. Examples:
//
// `this.triggerMethod("foo")` will trigger the "foo" event and
// call the "onFoo" method.
//
// `this.triggerMethod("foo:bar")` will trigger the "foo:bar" event and
// call the "onFooBar" method.
function triggerMethod$1(event) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  // get the method name from the event name
  var methodName = getOnMethodName(event);
  var method = getOption.call(this, methodName);
  var result = void 0;

  // call the onMethodName if it exists
  if (_.isFunction(method)) {
    // pass all args, except the event name
    result = method.apply(this, args);
  }

  // trigger the event
  this.trigger.apply(this, arguments);

  return result;
}

// triggerMethodOn invokes triggerMethod on a specific context
//
// e.g. `Marionette.triggerMethodOn(view, 'show')`
// will trigger a "show" event or invoke onShow the view.
function triggerMethodOn(context) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  if (_.isFunction(context.triggerMethod)) {
    return context.triggerMethod.apply(context, args);
  }

  return triggerMethod$1.apply(context, args);
}

// DOM Refresh
// -----------

// Trigger method on children unless a pure Backbone.View
function triggerMethodChildren(view, event, shouldTrigger) {
  if (!view._getImmediateChildren) {
    return;
  }
  _.each(view._getImmediateChildren(), function (child) {
    if (!shouldTrigger(child)) {
      return;
    }
    triggerMethodOn(child, event, child);
  });
}

function shouldTriggerAttach(view) {
  return !view._isAttached;
}

function shouldAttach(view) {
  if (!shouldTriggerAttach(view)) {
    return false;
  }
  view._isAttached = true;
  return true;
}

function shouldTriggerDetach(view) {
  return view._isAttached;
}

function shouldDetach(view) {
  if (!shouldTriggerDetach(view)) {
    return false;
  }
  view._isAttached = false;
  return true;
}

function triggerDOMRefresh(view) {
  if (view._isAttached && view._isRendered) {
    triggerMethodOn(view, 'dom:refresh', view);
  }
}

function triggerDOMRemove(view) {
  if (view._isAttached && view._isRendered) {
    triggerMethodOn(view, 'dom:remove', view);
  }
}

function handleBeforeAttach() {
  triggerMethodChildren(this, 'before:attach', shouldTriggerAttach);
}

function handleAttach() {
  triggerMethodChildren(this, 'attach', shouldAttach);
  triggerDOMRefresh(this);
}

function handleBeforeDetach() {
  triggerMethodChildren(this, 'before:detach', shouldTriggerDetach);
  triggerDOMRemove(this);
}

function handleDetach() {
  triggerMethodChildren(this, 'detach', shouldDetach);
}

function handleBeforeRender() {
  triggerDOMRemove(this);
}

function handleRender() {
  triggerDOMRefresh(this);
}

// Monitor a view's state, propagating attach/detach events to children and firing dom:refresh
// whenever a rendered view is attached or an attached view is rendered.
function monitorViewEvents(view) {
  if (view._areViewEventsMonitored) {
    return;
  }

  view._areViewEventsMonitored = true;

  view.on({
    'before:attach': handleBeforeAttach,
    'attach': handleAttach,
    'before:detach': handleBeforeDetach,
    'detach': handleDetach,
    'before:render': handleBeforeRender,
    'render': handleRender
  });
}

// Error
// -----

var errorProps = ['description', 'fileName', 'lineNumber', 'name', 'message', 'number'];

var MarionetteError = extend.call(Error, {
  urlRoot: 'http://marionettejs.com/docs/v' + version + '/',

  constructor: function constructor(message, options) {
    if (_.isObject(message)) {
      options = message;
      message = options.message;
    } else if (!options) {
      options = {};
    }

    var error = Error.call(this, message);
    _.extend(this, _.pick(error, errorProps), _.pick(options, errorProps));

    this.captureStackTrace();

    if (options.url) {
      this.url = this.urlRoot + options.url;
    }
  },
  captureStackTrace: function captureStackTrace() {
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MarionetteError);
    }
  },
  toString: function toString() {
    return this.name + ': ' + this.message + (this.url ? ' See: ' + this.url : '');
  }
});

MarionetteError.extend = extend;

// Bind Entity Events & Unbind Entity Events
// -----------------------------------------
//
// These methods are used to bind/unbind a backbone "entity" (e.g. collection/model)
// to methods on a target object.
//
// The first parameter, `target`, must have the Backbone.Events module mixed in.
//
// The second parameter is the `entity` (Backbone.Model, Backbone.Collection or
// any object that has Backbone.Events mixed in) to bind the events from.
//
// The third parameter is a hash of { "event:name": "eventHandler" }
// configuration. Multiple handlers can be separated by a space. A
// function can be supplied instead of a string handler name.

// Bind/unbind the event to handlers specified as a string of
// handler names on the target object
function bindFromStrings(target, entity, evt, methods, actionName) {
  var methodNames = methods.split(/\s+/);

  _.each(methodNames, function (methodName) {
    var method = target[methodName];
    if (!method) {
      throw new MarionetteError('Method "' + methodName + '" was configured as an event handler, but does not exist.');
    }

    target[actionName](entity, evt, method);
  });
}

// generic looping function
function iterateEvents(target, entity, bindings, actionName) {
  if (!entity || !bindings) {
    return;
  }

  // type-check bindings
  if (!_.isObject(bindings)) {
    throw new MarionetteError({
      message: 'Bindings must be an object.',
      url: 'marionette.functions.html#marionettebindevents'
    });
  }

  // iterate the bindings and bind/unbind them
  _.each(bindings, function (method, evt) {

    // allow for a list of method names as a string
    if (_.isString(method)) {
      bindFromStrings(target, entity, evt, method, actionName);
      return;
    }

    target[actionName](entity, evt, method);
  });
}

function bindEvents(entity, bindings) {
  iterateEvents(this, entity, bindings, 'listenTo');
  return this;
}

function unbindEvents(entity, bindings) {
  iterateEvents(this, entity, bindings, 'stopListening');
  return this;
}

// Bind/Unbind Radio Requests
// -----------------------------------------
//
// These methods are used to bind/unbind a backbone.radio request
// to methods on a target object.
//
// The first parameter, `target`, will set the context of the reply method
//
// The second parameter is the `Radio.channel` to bind the reply to.
//
// The third parameter is a hash of { "request:name": "replyHandler" }
// configuration. A function can be supplied instead of a string handler name.

function iterateReplies(target, channel, bindings, actionName) {
  if (!channel || !bindings) {
    return;
  }

  // type-check bindings
  if (!_.isObject(bindings)) {
    throw new MarionetteError({
      message: 'Bindings must be an object.',
      url: 'marionette.functions.html#marionettebindrequests'
    });
  }

  var normalizedRadioRequests = normalizeMethods.call(target, bindings);

  channel[actionName](normalizedRadioRequests, target);
}

function bindRequests(channel, bindings) {
  iterateReplies(this, channel, bindings, 'reply');
  return this;
}

function unbindRequests(channel, bindings) {
  iterateReplies(this, channel, bindings, 'stopReplying');
  return this;
}

// Internal utility for setting options consistently across Mn
var setOptions = function setOptions() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  this.options = _.extend.apply(_, [{}, _.result(this, 'options')].concat(args));
};

var CommonMixin = {

  // Imports the "normalizeMethods" to transform hashes of
  // events=>function references/names to a hash of events=>function references
  normalizeMethods: normalizeMethods,

  _setOptions: setOptions,

  // A handy way to merge passed-in options onto the instance
  mergeOptions: mergeOptions,

  // Enable getting options from this or this.options by name.
  getOption: getOption,

  // Enable binding view's events from another entity.
  bindEvents: bindEvents,

  // Enable unbinding view's events from another entity.
  unbindEvents: unbindEvents
};

// MixinOptions
// - channelName
// - radioEvents
// - radioRequests

var RadioMixin = {
  _initRadio: function _initRadio() {
    var channelName = _.result(this, 'channelName');

    if (!channelName) {
      return;
    }

    /* istanbul ignore next */
    if (!Radio) {
      throw new MarionetteError({
        name: 'BackboneRadioMissing',
        message: 'The dependency "backbone.radio" is missing.'
      });
    }

    var channel = this._channel = Radio.channel(channelName);

    var radioEvents = _.result(this, 'radioEvents');
    this.bindEvents(channel, radioEvents);

    var radioRequests = _.result(this, 'radioRequests');
    this.bindRequests(channel, radioRequests);

    this.on('destroy', this._destroyRadio);
  },
  _destroyRadio: function _destroyRadio() {
    this._channel.stopReplying(null, null, this);
  },
  getChannel: function getChannel() {
    return this._channel;
  },


  // Proxy `bindEvents`
  bindEvents: bindEvents,

  // Proxy `unbindEvents`
  unbindEvents: unbindEvents,

  // Proxy `bindRequests`
  bindRequests: bindRequests,

  // Proxy `unbindRequests`
  unbindRequests: unbindRequests

};

// Object
// ------

var ClassOptions = ['channelName', 'radioEvents', 'radioRequests'];

// A Base Class that other Classes should descend from.
// Object borrows many conventions and utilities from Backbone.
var MarionetteObject = function MarionetteObject(options) {
  this._setOptions(options);
  this.mergeOptions(options, ClassOptions);
  this.cid = _.uniqueId(this.cidPrefix);
  this._initRadio();
  this.initialize.apply(this, arguments);
};

MarionetteObject.extend = extend;

// Object Methods
// --------------

// Ensure it can trigger events with Backbone.Events
_.extend(MarionetteObject.prototype, Backbone.Events, CommonMixin, RadioMixin, {
  cidPrefix: 'mno',

  // for parity with Marionette.AbstractView lifecyle
  _isDestroyed: false,

  isDestroyed: function isDestroyed() {
    return this._isDestroyed;
  },


  //this is a noop method intended to be overridden by classes that extend from this base
  initialize: function initialize() {},
  destroy: function destroy() {
    if (this._isDestroyed) {
      return this;
    }

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this.triggerMethod.apply(this, ['before:destroy', this].concat(args));

    this._isDestroyed = true;
    this.triggerMethod.apply(this, ['destroy', this].concat(args));
    this.stopListening();

    return this;
  },


  triggerMethod: triggerMethod$1
});

// DomMixin
//  ---------

var DomMixin = {
  createBuffer: function createBuffer() {
    return document.createDocumentFragment();
  },
  appendChildren: function appendChildren(el, children) {
    Backbone.$(el).append(children);
  },
  beforeEl: function beforeEl(el, sibling) {
    Backbone.$(el).before(sibling);
  },
  replaceEl: function replaceEl(newEl, oldEl) {
    if (newEl === oldEl) {
      return;
    }

    var parent = oldEl.parentNode;

    if (!parent) {
      return;
    }

    parent.replaceChild(newEl, oldEl);
  },
  detachContents: function detachContents(el) {
    Backbone.$(el).contents().detach();
  },
  setInnerContent: function setInnerContent(el, html) {
    Backbone.$(el).html(html);
  },
  detachEl: function detachEl(el) {
    Backbone.$(el).detach();
  },
  removeEl: function removeEl(el) {
    Backbone.$(el).remove();
  },
  findEls: function findEls(selector, context) {
    return Backbone.$(selector, context);
  }
};

// Template Cache
// --------------

// Manage templates stored in `<script>` blocks,
// caching them for faster access.
var TemplateCache = function TemplateCache(templateId) {
  this.templateId = templateId;
};

// TemplateCache object-level methods. Manage the template
// caches from these method calls instead of creating
// your own TemplateCache instances
_.extend(TemplateCache, {
  templateCaches: {},

  // Get the specified template by id. Either
  // retrieves the cached version, or loads it
  // from the DOM.
  get: function get(templateId, options) {
    var cachedTemplate = this.templateCaches[templateId];

    if (!cachedTemplate) {
      cachedTemplate = new TemplateCache(templateId);
      this.templateCaches[templateId] = cachedTemplate;
    }

    return cachedTemplate.load(options);
  },


  // Clear templates from the cache. If no arguments
  // are specified, clears all templates:
  // `clear()`
  //
  // If arguments are specified, clears each of the
  // specified templates from the cache:
  // `clear("#t1", "#t2", "...")`
  clear: function clear() {
    var i = void 0;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var length = args.length;

    if (length > 0) {
      for (i = 0; i < length; i++) {
        delete this.templateCaches[args[i]];
      }
    } else {
      this.templateCaches = {};
    }
  }
});

// TemplateCache instance methods, allowing each
// template cache object to manage its own state
// and know whether or not it has been loaded
_.extend(TemplateCache.prototype, DomMixin, {

  // Internal method to load the template
  load: function load(options) {
    // Guard clause to prevent loading this template more than once
    if (this.compiledTemplate) {
      return this.compiledTemplate;
    }

    // Load the template and compile it
    var template = this.loadTemplate(this.templateId, options);
    this.compiledTemplate = this.compileTemplate(template, options);

    return this.compiledTemplate;
  },


  // Load a template from the DOM, by default. Override
  // this method to provide your own template retrieval
  // For asynchronous loading with AMD/RequireJS, consider
  // using a template-loader plugin as described here:
  // https://github.com/marionettejs/backbone.marionette/wiki/Using-marionette-with-requirejs
  loadTemplate: function loadTemplate(templateId, options) {
    var $template = this.findEls(templateId);

    if (!$template.length) {
      throw new MarionetteError({
        name: 'NoTemplateError',
        message: 'Could not find template: "' + templateId + '"'
      });
    }
    return $template.html();
  },


  // Pre-compile the template before caching it. Override
  // this method if you do not need to pre-compile a template
  // (JST / RequireJS for example) or if you want to change
  // the template engine used (Handebars, etc).
  compileTemplate: function compileTemplate(rawTemplate, options) {
    return _.template(rawTemplate, options);
  }
});

// Implementation of the invoke method (http://underscorejs.org/#invoke) with support for
// lodash v3, v4, and underscore.js
var _invoke = _.invokeMap || _.invoke;

// MixinOptions
// - behaviors

// Takes care of getting the behavior class
// given options and a key.
// If a user passes in options.behaviorClass
// default to using that.
// If a user passes in a Behavior Class directly, use that
// Otherwise delegate the lookup to the users `behaviorsLookup` implementation.
function getBehaviorClass(options, key) {
  if (options.behaviorClass) {
    return options.behaviorClass;
    //treat functions as a Behavior constructor
  } else if (_.isFunction(options)) {
    return options;
  }

  // behaviorsLookup can be either a flat object or a method
  if (_.isFunction(Marionette.Behaviors.behaviorsLookup)) {
    return Marionette.Behaviors.behaviorsLookup(options, key)[key];
  }

  return Marionette.Behaviors.behaviorsLookup[key];
}

// Iterate over the behaviors object, for each behavior
// instantiate it and get its grouped behaviors.
// This accepts a list of behaviors in either an object or array form
function parseBehaviors(view, behaviors) {
  return _.chain(behaviors).map(function (options, key) {
    var BehaviorClass = getBehaviorClass(options, key);
    //if we're passed a class directly instead of an object
    var _options = options === BehaviorClass ? {} : options;
    var behavior = new BehaviorClass(_options, view);
    var nestedBehaviors = parseBehaviors(view, _.result(behavior, 'behaviors'));

    return [behavior].concat(nestedBehaviors);
  }).flatten().value();
}

var BehaviorsMixin = {
  _initBehaviors: function _initBehaviors() {
    this._behaviors = this._getBehaviors();
  },
  _getBehaviors: function _getBehaviors() {
    var behaviors = _.result(this, 'behaviors');

    // Behaviors defined on a view can be a flat object literal
    // or it can be a function that returns an object.
    return _.isObject(behaviors) ? parseBehaviors(this, behaviors) : {};
  },
  _getBehaviorTriggers: function _getBehaviorTriggers() {
    var triggers = _invoke(this._behaviors, 'getTriggers');
    return _.reduce(triggers, function (memo, _triggers) {
      return _.extend(memo, _triggers);
    }, {});
  },
  _getBehaviorEvents: function _getBehaviorEvents() {
    var events = _invoke(this._behaviors, 'getEvents');
    return _.reduce(events, function (memo, _events) {
      return _.extend(memo, _events);
    }, {});
  },


  // proxy behavior $el to the view's $el.
  _proxyBehaviorViewProperties: function _proxyBehaviorViewProperties() {
    _invoke(this._behaviors, 'proxyViewProperties');
  },


  // delegate modelEvents and collectionEvents
  _delegateBehaviorEntityEvents: function _delegateBehaviorEntityEvents() {
    _invoke(this._behaviors, 'delegateEntityEvents');
  },


  // undelegate modelEvents and collectionEvents
  _undelegateBehaviorEntityEvents: function _undelegateBehaviorEntityEvents() {
    _invoke(this._behaviors, 'undelegateEntityEvents');
  },
  _destroyBehaviors: function _destroyBehaviors() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // Call destroy on each behavior after
    // destroying the view.
    // This unbinds event listeners
    // that behaviors have registered for.
    _invoke.apply(undefined, [this._behaviors, 'destroy'].concat(args));
  },


  // Remove a behavior
  _removeBehavior: function _removeBehavior(behavior) {
    // Don't worry about the clean up if the view is destroyed
    if (this._isDestroyed) {
      return;
    }
    this._behaviors = _.without(this._behaviors, behavior);
  },
  _bindBehaviorUIElements: function _bindBehaviorUIElements() {
    _invoke(this._behaviors, 'bindUIElements');
  },
  _unbindBehaviorUIElements: function _unbindBehaviorUIElements() {
    _invoke(this._behaviors, 'unbindUIElements');
  },
  _triggerEventOnBehaviors: function _triggerEventOnBehaviors() {
    var behaviors = this._behaviors;
    // Use good ol' for as this is a very hot function
    for (var i = 0, length = behaviors && behaviors.length; i < length; i++) {
      triggerMethod$1.apply(behaviors[i], arguments);
    }
  }
};

// MixinOptions
// - collectionEvents
// - modelEvents

var DelegateEntityEventsMixin = {
  // Handle `modelEvents`, and `collectionEvents` configuration
  _delegateEntityEvents: function _delegateEntityEvents(model, collection) {
    this._undelegateEntityEvents(model, collection);

    var modelEvents = _.result(this, 'modelEvents');
    bindEvents.call(this, model, modelEvents);

    var collectionEvents = _.result(this, 'collectionEvents');
    bindEvents.call(this, collection, collectionEvents);
  },
  _undelegateEntityEvents: function _undelegateEntityEvents(model, collection) {
    var modelEvents = _.result(this, 'modelEvents');
    unbindEvents.call(this, model, modelEvents);

    var collectionEvents = _.result(this, 'collectionEvents');
    unbindEvents.call(this, collection, collectionEvents);
  }
};

// Borrow event splitter from Backbone
var delegateEventSplitter = /^(\S+)\s*(.*)$/;

function uniqueName(eventName, selector) {
  return [eventName + _.uniqueId('.evt'), selector].join(' ');
}

// Set event name to be namespaced using a unique index
// to generate a non colliding event namespace
// http://api.jquery.com/event.namespace/
var getUniqueEventName = function getUniqueEventName(eventName) {
  var match = eventName.match(delegateEventSplitter);
  return uniqueName(match[1], match[2]);
};

// Add Feature flags here
// e.g. 'class' => false
var FEATURES = {
  childViewEventPrefix: true,
  triggersStopPropagation: true,
  triggersPreventDefault: true
};

function isEnabled(name) {
  return !!FEATURES[name];
}

function setEnabled(name, state) {
  return FEATURES[name] = state;
}

// Internal method to create an event handler for a given `triggerDef` like
// 'click:foo'
function buildViewTrigger(view, triggerDef) {
  if (_.isString(triggerDef)) {
    triggerDef = { event: triggerDef };
  }

  var eventName = triggerDef.event;

  var shouldPreventDefault = !!triggerDef.preventDefault;

  if (isEnabled('triggersPreventDefault')) {
    shouldPreventDefault = triggerDef.preventDefault !== false;
  }

  var shouldStopPropagation = !!triggerDef.stopPropagation;

  if (isEnabled('triggersStopPropagation')) {
    shouldStopPropagation = triggerDef.stopPropagation !== false;
  }

  return function (event) {
    if (shouldPreventDefault) {
      event.preventDefault();
    }

    if (shouldStopPropagation) {
      event.stopPropagation();
    }

    view.triggerMethod(eventName, view, event);
  };
}

var TriggersMixin = {

  // Configure `triggers` to forward DOM events to view
  // events. `triggers: {"click .foo": "do:foo"}`
  _getViewTriggers: function _getViewTriggers(view, triggers) {
    // Configure the triggers, prevent default
    // action and stop propagation of DOM events
    return _.reduce(triggers, function (events, value, key) {
      key = getUniqueEventName(key);
      events[key] = buildViewTrigger(view, value);
      return events;
    }, {});
  }
};

// allows for the use of the @ui. syntax within
// a given key for triggers and events
// swaps the @ui with the associated selector.
// Returns a new, non-mutated, parsed events hash.
var _normalizeUIKeys = function _normalizeUIKeys(hash, ui) {
  return _.reduce(hash, function (memo, val, key) {
    var normalizedKey = _normalizeUIString(key, ui);
    memo[normalizedKey] = val;
    return memo;
  }, {});
};

// utility method for parsing @ui. syntax strings
// into associated selector
var _normalizeUIString = function _normalizeUIString(uiString, ui) {
  return uiString.replace(/@ui\.[a-zA-Z-_$0-9]*/g, function (r) {
    return ui[r.slice(4)];
  });
};

// allows for the use of the @ui. syntax within
// a given value for regions
// swaps the @ui with the associated selector
var _normalizeUIValues = function _normalizeUIValues(hash, ui, properties) {
  _.each(hash, function (val, key) {
    if (_.isString(val)) {
      hash[key] = _normalizeUIString(val, ui);
    } else if (_.isObject(val) && _.isArray(properties)) {
      _.extend(val, _normalizeUIValues(_.pick(val, properties), ui));
      /* Value is an object, and we got an array of embedded property names to normalize. */
      _.each(properties, function (property) {
        var propertyVal = val[property];
        if (_.isString(propertyVal)) {
          val[property] = _normalizeUIString(propertyVal, ui);
        }
      });
    }
  });
  return hash;
};

var UIMixin = {

  // normalize the keys of passed hash with the views `ui` selectors.
  // `{"@ui.foo": "bar"}`
  normalizeUIKeys: function normalizeUIKeys(hash) {
    var uiBindings = this._getUIBindings();
    return _normalizeUIKeys(hash, uiBindings);
  },


  // normalize the passed string with the views `ui` selectors.
  // `"@ui.bar"`
  normalizeUIString: function normalizeUIString(uiString) {
    var uiBindings = this._getUIBindings();
    return _normalizeUIString(uiString, uiBindings);
  },


  // normalize the values of passed hash with the views `ui` selectors.
  // `{foo: "@ui.bar"}`
  normalizeUIValues: function normalizeUIValues(hash, properties) {
    var uiBindings = this._getUIBindings();
    return _normalizeUIValues(hash, uiBindings, properties);
  },
  _getUIBindings: function _getUIBindings() {
    var uiBindings = _.result(this, '_uiBindings');
    var ui = _.result(this, 'ui');
    return uiBindings || ui;
  },


  // This method binds the elements specified in the "ui" hash inside the view's code with
  // the associated jQuery selectors.
  _bindUIElements: function _bindUIElements() {
    var _this = this;

    if (!this.ui) {
      return;
    }

    // store the ui hash in _uiBindings so they can be reset later
    // and so re-rendering the view will be able to find the bindings
    if (!this._uiBindings) {
      this._uiBindings = this.ui;
    }

    // get the bindings result, as a function or otherwise
    var bindings = _.result(this, '_uiBindings');

    // empty the ui so we don't have anything to start with
    this._ui = {};

    // bind each of the selectors
    _.each(bindings, function (selector, key) {
      _this._ui[key] = _this.$(selector);
    });

    this.ui = this._ui;
  },
  _unbindUIElements: function _unbindUIElements() {
    var _this2 = this;

    if (!this.ui || !this._uiBindings) {
      return;
    }

    // delete all of the existing ui bindings
    _.each(this.ui, function ($el, name) {
      delete _this2.ui[name];
    });

    // reset the ui element to the original bindings configuration
    this.ui = this._uiBindings;
    delete this._uiBindings;
    delete this._ui;
  },
  _getUI: function _getUI(name) {
    return this._ui[name];
  }
};

// ViewMixin
//  ---------

// MixinOptions
// - behaviors
// - childViewEventPrefix
// - childViewEvents
// - childViewTriggers
// - collectionEvents
// - modelEvents
// - triggers
// - ui


var ViewMixin = {
  supportsRenderLifecycle: true,
  supportsDestroyLifecycle: true,

  _isDestroyed: false,

  isDestroyed: function isDestroyed() {
    return !!this._isDestroyed;
  },


  _isRendered: false,

  isRendered: function isRendered() {
    return !!this._isRendered;
  },


  _isAttached: false,

  isAttached: function isAttached() {
    return !!this._isAttached;
  },


  // Overriding Backbone.View's `delegateEvents` to handle
  // `events` and `triggers`
  delegateEvents: function delegateEvents(eventsArg) {

    this._proxyBehaviorViewProperties();
    this._buildEventProxies();

    var viewEvents = this._getEvents(eventsArg);

    if (typeof eventsArg === 'undefined') {
      this.events = viewEvents;
    }

    var combinedEvents = _.extend({}, this._getBehaviorEvents(), viewEvents, this._getBehaviorTriggers(), this.getTriggers());

    Backbone.View.prototype.delegateEvents.call(this, combinedEvents);

    return this;
  },
  _getEvents: function _getEvents(eventsArg) {
    var events = eventsArg || this.events;

    if (_.isFunction(events)) {
      return this.normalizeUIKeys(events.call(this));
    }

    return this.normalizeUIKeys(events);
  },


  // Configure `triggers` to forward DOM events to view
  // events. `triggers: {"click .foo": "do:foo"}`
  getTriggers: function getTriggers() {
    if (!this.triggers) {
      return;
    }

    // Allow `triggers` to be configured as a function
    var triggers = this.normalizeUIKeys(_.result(this, 'triggers'));

    // Configure the triggers, prevent default
    // action and stop propagation of DOM events
    return this._getViewTriggers(this, triggers);
  },


  // Handle `modelEvents`, and `collectionEvents` configuration
  delegateEntityEvents: function delegateEntityEvents() {
    this._delegateEntityEvents(this.model, this.collection);

    // bind each behaviors model and collection events
    this._delegateBehaviorEntityEvents();

    return this;
  },


  // Handle unbinding `modelEvents`, and `collectionEvents` configuration
  undelegateEntityEvents: function undelegateEntityEvents() {
    this._undelegateEntityEvents(this.model, this.collection);

    // unbind each behaviors model and collection events
    this._undelegateBehaviorEntityEvents();

    return this;
  },


  // Handle destroying the view and its children.
  destroy: function destroy() {
    if (this._isDestroyed) {
      return this;
    }
    var shouldTriggerDetach = !!this._isAttached;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this.triggerMethod.apply(this, ['before:destroy', this].concat(args));
    if (shouldTriggerDetach) {
      this.triggerMethod('before:detach', this);
    }

    // unbind UI elements
    this.unbindUIElements();

    // remove the view from the DOM
    this.removeEl(this.el);

    if (shouldTriggerDetach) {
      this._isAttached = false;
      this.triggerMethod('detach', this);
    }

    // remove children after the remove to prevent extra paints
    this._removeChildren();

    this._isDestroyed = true;
    this._isRendered = false;

    // Destroy behaviors after _isDestroyed flag
    this._destroyBehaviors.apply(this, args);

    this.triggerMethod.apply(this, ['destroy', this].concat(args));

    this.stopListening();

    return this;
  },
  bindUIElements: function bindUIElements() {
    this._bindUIElements();
    this._bindBehaviorUIElements();

    return this;
  },


  // This method unbinds the elements specified in the "ui" hash
  unbindUIElements: function unbindUIElements() {
    this._unbindUIElements();
    this._unbindBehaviorUIElements();

    return this;
  },
  getUI: function getUI(name) {
    return this._getUI(name);
  },


  // used as the prefix for child view events
  // that are forwarded through the layoutview
  childViewEventPrefix: function childViewEventPrefix() {
    return isEnabled('childViewEventPrefix') ? 'childview' : false;
  },


  // import the `triggerMethod` to trigger events with corresponding
  // methods if the method exists
  triggerMethod: function triggerMethod() {
    var ret = triggerMethod$1.apply(this, arguments);

    this._triggerEventOnBehaviors.apply(this, arguments);

    return ret;
  },


  // Cache `childViewEvents` and `childViewTriggers`
  _buildEventProxies: function _buildEventProxies() {
    this._childViewEvents = _.result(this, 'childViewEvents');
    this._childViewTriggers = _.result(this, 'childViewTriggers');
  },
  _proxyChildViewEvents: function _proxyChildViewEvents(view) {
    this.listenTo(view, 'all', this._childViewEventHandler);
  },
  _childViewEventHandler: function _childViewEventHandler(eventName) {
    var childViewEvents = this.normalizeMethods(this._childViewEvents);

    // call collectionView childViewEvent if defined

    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    if (typeof childViewEvents !== 'undefined' && _.isFunction(childViewEvents[eventName])) {
      childViewEvents[eventName].apply(this, args);
    }

    // use the parent view's proxyEvent handlers
    var childViewTriggers = this._childViewTriggers;

    // Call the event with the proxy name on the parent layout
    if (childViewTriggers && _.isString(childViewTriggers[eventName])) {
      this.triggerMethod.apply(this, [childViewTriggers[eventName]].concat(args));
    }

    var prefix = _.result(this, 'childViewEventPrefix');

    if (prefix !== false) {
      var childEventName = prefix + ':' + eventName;

      this.triggerMethod.apply(this, [childEventName].concat(args));
    }
  }
};

_.extend(ViewMixin, DomMixin, BehaviorsMixin, CommonMixin, DelegateEntityEventsMixin, TriggersMixin, UIMixin);

function destroyBackboneView(view) {
  if (!view.supportsDestroyLifecycle) {
    triggerMethodOn(view, 'before:destroy', view);
  }

  var shouldTriggerDetach = !!view._isAttached;

  if (shouldTriggerDetach) {
    triggerMethodOn(view, 'before:detach', view);
  }

  view.remove();

  if (shouldTriggerDetach) {
    view._isAttached = false;
    triggerMethodOn(view, 'detach', view);
  }

  view._isDestroyed = true;

  if (!view.supportsDestroyLifecycle) {
    triggerMethodOn(view, 'destroy', view);
  }
}

// Region
// ------

var ClassOptions$2 = ['allowMissingEl', 'parentEl', 'replaceElement'];

var Region = MarionetteObject.extend({
  cidPrefix: 'mnr',
  replaceElement: false,
  _isReplaced: false,
  _isSwappingView: false,

  constructor: function constructor(options) {
    this._setOptions(options);

    this.mergeOptions(options, ClassOptions$2);

    // getOption necessary because options.el may be passed as undefined
    this._initEl = this.el = this.getOption('el');

    // Handle when this.el is passed in as a $ wrapped element.
    this.el = this.el instanceof Backbone.$ ? this.el[0] : this.el;

    if (!this.el) {
      throw new MarionetteError({
        name: 'NoElError',
        message: 'An "el" must be specified for a region.'
      });
    }

    this.$el = this.getEl(this.el);
    MarionetteObject.call(this, options);
  },


  // Displays a backbone view instance inside of the region. Handles calling the `render`
  // method for you. Reads content directly from the `el` attribute. The `preventDestroy`
  // option can be used to prevent a view from the old view being destroyed on show.
  show: function show(view, options) {
    if (!this._ensureElement(options)) {
      return;
    }

    view = this._getView(view, options);

    if (view === this.currentView) {
      return this;
    }

    this._isSwappingView = !!this.currentView;

    this.triggerMethod('before:show', this, view, options);

    // Assume an attached view is already in the region for pre-existing DOM
    if (!view._isAttached) {
      this.empty(options);
    }

    this._setupChildView(view);

    this._renderView(view);

    this._attachView(view, options);

    this.currentView = view;

    this.triggerMethod('show', this, view, options);

    this._isSwappingView = false;

    return this;
  },
  _setupChildView: function _setupChildView(view) {
    monitorViewEvents(view);

    this._proxyChildViewEvents(view);

    // We need to listen for if a view is destroyed in a way other than through the region.
    // If this happens we need to remove the reference to the currentView since once a view
    // has been destroyed we can not reuse it.
    view.on('destroy', this._empty, this);
  },
  _proxyChildViewEvents: function _proxyChildViewEvents(view) {
    var parentView = this._parentView;

    if (!parentView) {
      return;
    }

    parentView._proxyChildViewEvents(view);
  },
  _renderView: function _renderView(view) {
    if (view._isRendered) {
      return;
    }

    if (!view.supportsRenderLifecycle) {
      triggerMethodOn(view, 'before:render', view);
    }

    view.render();

    if (!view.supportsRenderLifecycle) {
      view._isRendered = true;
      triggerMethodOn(view, 'render', view);
    }
  },
  _attachView: function _attachView(view) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var shouldTriggerAttach = !view._isAttached && isNodeAttached(this.el);
    var shouldReplaceEl = typeof options.replaceElement === 'undefined' ? !!_.result(this, 'replaceElement') : !!options.replaceElement;

    if (shouldTriggerAttach) {
      triggerMethodOn(view, 'before:attach', view);
    }

    if (shouldReplaceEl) {
      this._replaceEl(view);
    } else {
      this.attachHtml(view);
    }

    if (shouldTriggerAttach) {
      view._isAttached = true;
      triggerMethodOn(view, 'attach', view);
    }
  },
  _ensureElement: function _ensureElement() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!_.isObject(this.el)) {
      this.$el = this.getEl(this.el);
      this.el = this.$el[0];
    }

    if (!this.$el || this.$el.length === 0) {
      var allowMissingEl = typeof options.allowMissingEl === 'undefined' ? !!_.result(this, 'allowMissingEl') : !!options.allowMissingEl;

      if (allowMissingEl) {
        return false;
      } else {
        throw new MarionetteError('An "el" must exist in DOM for this region ' + this.cid);
      }
    }
    return true;
  },
  _getView: function _getView(view) {
    if (!view) {
      throw new MarionetteError({
        name: 'ViewNotValid',
        message: 'The view passed is undefined and therefore invalid. You must pass a view instance to show.'
      });
    }

    if (view._isDestroyed) {
      throw new MarionetteError({
        name: 'ViewDestroyedError',
        message: 'View (cid: "' + view.cid + '") has already been destroyed and cannot be used.'
      });
    }

    if (view instanceof Backbone.View) {
      return view;
    }

    var viewOptions = this._getViewOptions(view);

    return new View(viewOptions);
  },


  // This allows for a template or a static string to be
  // used as a template
  _getViewOptions: function _getViewOptions(viewOptions) {
    if (_.isFunction(viewOptions)) {
      return { template: viewOptions };
    }

    if (_.isObject(viewOptions)) {
      return viewOptions;
    }

    var template = function template() {
      return viewOptions;
    };

    return { template: template };
  },


  // Override this method to change how the region finds the DOM element that it manages. Return
  // a jQuery selector object scoped to a provided parent el or the document if none exists.
  getEl: function getEl(el) {
    return this.findEls(el, _.result(this, 'parentEl'));
  },
  _replaceEl: function _replaceEl(view) {
    // always restore the el to ensure the regions el is present before replacing
    this._restoreEl();

    view.on('before:destroy', this._restoreEl, this);

    this.replaceEl(view.el, this.el);

    this._isReplaced = true;
  },


  // Restore the region's element in the DOM.
  _restoreEl: function _restoreEl() {
    // There is nothing to replace
    if (!this._isReplaced) {
      return;
    }

    var view = this.currentView;

    if (!view) {
      return;
    }

    this._detachView(view);

    this._isReplaced = false;
  },


  // Check to see if the region's el was replaced.
  isReplaced: function isReplaced() {
    return !!this._isReplaced;
  },


  // Check to see if a view is being swapped by another
  isSwappingView: function isSwappingView() {
    return !!this._isSwappingView;
  },


  // Override this method to change how the new view is appended to the `$el` that the
  // region is managing
  attachHtml: function attachHtml(view) {
    this.appendChildren(this.el, view.el);
  },


  // Destroy the current view, if there is one. If there is no current view, it does
  // nothing and returns immediately.
  empty: function empty() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { allowMissingEl: true };

    var view = this.currentView;

    // If there is no view in the region we should only detach current html
    if (!view) {
      if (this._ensureElement(options)) {
        this.detachHtml();
      }
      return this;
    }

    var shouldDestroy = !options.preventDestroy;

    if (!shouldDestroy) {
      deprecate('The preventDestroy option is deprecated. Use Region#detachView');
    }

    this._empty(view, shouldDestroy);
    return this;
  },
  _empty: function _empty(view, shouldDestroy) {
    view.off('destroy', this._empty, this);
    this.triggerMethod('before:empty', this, view);

    this._restoreEl();

    delete this.currentView;

    if (!view._isDestroyed) {
      if (shouldDestroy) {
        this.removeView(view);
      } else {
        this._detachView(view);
      }
      this._stopChildViewEvents(view);
    }

    this.triggerMethod('empty', this, view);
  },
  _stopChildViewEvents: function _stopChildViewEvents(view) {
    var parentView = this._parentView;

    if (!parentView) {
      return;
    }

    this._parentView.stopListening(view);
  },
  destroyView: function destroyView(view) {
    if (view._isDestroyed) {
      return view;
    }

    if (view.destroy) {
      view.destroy();
    } else {
      destroyBackboneView(view);
    }
    return view;
  },
  removeView: function removeView(view) {
    this.destroyView(view);
  },


  // Empties the Region without destroying the view
  // Returns the detached view
  detachView: function detachView() {
    var view = this.currentView;

    if (!view) {
      return;
    }

    this._empty(view);

    return view;
  },
  _detachView: function _detachView(view) {
    var shouldTriggerDetach = !!view._isAttached;
    var shouldRestoreEl = this._isReplaced;
    if (shouldTriggerDetach) {
      triggerMethodOn(view, 'before:detach', view);
    }

    if (shouldRestoreEl) {
      this.replaceEl(this.el, view.el);
    } else {
      this.detachHtml();
    }

    if (shouldTriggerDetach) {
      view._isAttached = false;
      triggerMethodOn(view, 'detach', view);
    }
  },


  // Override this method to change how the region detaches current content
  detachHtml: function detachHtml() {
    this.detachContents(this.el);
  },


  // Checks whether a view is currently present within the region. Returns `true` if there is
  // and `false` if no view is present.
  hasView: function hasView() {
    return !!this.currentView;
  },


  // Reset the region by destroying any existing view and clearing out the cached `$el`.
  // The next time a view is shown via this region, the region will re-query the DOM for
  // the region's `el`.
  reset: function reset(options) {
    this.empty(options);

    if (this.$el) {
      this.el = this._initEl;
    }

    delete this.$el;
    return this;
  },
  destroy: function destroy(options) {
    if (this._isDestroyed) {
      return this;
    }

    this.reset(options);

    if (this._name) {
      this._parentView._removeReferences(this._name);
    }
    delete this._parentView;
    delete this._name;

    return MarionetteObject.prototype.destroy.apply(this, arguments);
  }
});

_.extend(Region.prototype, DomMixin);

// return the region instance from the definition
var buildRegion = function (definition, defaults) {
  if (definition instanceof Region) {
    return definition;
  }

  return buildRegionFromDefinition(definition, defaults);
};

function buildRegionFromDefinition(definition, defaults) {
  var opts = _.extend({}, defaults);

  if (_.isString(definition)) {
    _.extend(opts, { el: definition });

    return buildRegionFromObject(opts);
  }

  if (_.isFunction(definition)) {
    _.extend(opts, { regionClass: definition });

    return buildRegionFromObject(opts);
  }

  if (_.isObject(definition)) {
    if (definition.selector) {
      deprecate('The selector option on a Region definition object is deprecated. Use el to pass a selector string');
    }

    _.extend(opts, { el: definition.selector }, definition);

    return buildRegionFromObject(opts);
  }

  throw new MarionetteError({
    message: 'Improper region configuration type.',
    url: 'marionette.region.html#region-configuration-types'
  });
}

function buildRegionFromObject(definition) {
  var RegionClass = definition.regionClass;

  var options = _.omit(definition, 'regionClass');

  return new RegionClass(options);
}

// MixinOptions
// - regions
// - regionClass

var RegionsMixin = {
  regionClass: Region,

  // Internal method to initialize the regions that have been defined in a
  // `regions` attribute on this View.
  _initRegions: function _initRegions() {

    // init regions hash
    this.regions = this.regions || {};
    this._regions = {};

    this.addRegions(_.result(this, 'regions'));
  },


  // Internal method to re-initialize all of the regions by updating
  // the `el` that they point to
  _reInitRegions: function _reInitRegions() {
    _invoke(this._regions, 'reset');
  },


  // Add a single region, by name, to the View
  addRegion: function addRegion(name, definition) {
    var regions = {};
    regions[name] = definition;
    return this.addRegions(regions)[name];
  },


  // Add multiple regions as a {name: definition, name2: def2} object literal
  addRegions: function addRegions(regions) {
    // If there's nothing to add, stop here.
    if (_.isEmpty(regions)) {
      return;
    }

    // Normalize region selectors hash to allow
    // a user to use the @ui. syntax.
    regions = this.normalizeUIValues(regions, ['selector', 'el']);

    // Add the regions definitions to the regions property
    this.regions = _.extend({}, this.regions, regions);

    return this._addRegions(regions);
  },


  // internal method to build and add regions
  _addRegions: function _addRegions(regionDefinitions) {
    var _this = this;

    var defaults = {
      regionClass: this.regionClass,
      parentEl: _.partial(_.result, this, 'el')
    };

    return _.reduce(regionDefinitions, function (regions, definition, name) {
      regions[name] = buildRegion(definition, defaults);
      _this._addRegion(regions[name], name);
      return regions;
    }, {});
  },
  _addRegion: function _addRegion(region, name) {
    this.triggerMethod('before:add:region', this, name, region);

    region._parentView = this;
    region._name = name;

    this._regions[name] = region;

    this.triggerMethod('add:region', this, name, region);
  },


  // Remove a single region from the View, by name
  removeRegion: function removeRegion(name) {
    var region = this._regions[name];

    this._removeRegion(region, name);

    return region;
  },


  // Remove all regions from the View
  removeRegions: function removeRegions() {
    var regions = this._getRegions();

    _.each(this._regions, _.bind(this._removeRegion, this));

    return regions;
  },
  _removeRegion: function _removeRegion(region, name) {
    this.triggerMethod('before:remove:region', this, name, region);

    region.destroy();

    this.triggerMethod('remove:region', this, name, region);
  },


  // Called in a region's destroy
  _removeReferences: function _removeReferences(name) {
    delete this.regions[name];
    delete this._regions[name];
  },


  // Empty all regions in the region manager, but
  // leave them attached
  emptyRegions: function emptyRegions() {
    var regions = this.getRegions();
    _invoke(regions, 'empty');
    return regions;
  },


  // Checks to see if view contains region
  // Accepts the region name
  // hasRegion('main')
  hasRegion: function hasRegion(name) {
    return !!this.getRegion(name);
  },


  // Provides access to regions
  // Accepts the region name
  // getRegion('main')
  getRegion: function getRegion(name) {
    if (!this._isRendered) {
      this.render();
    }
    return this._regions[name];
  },


  // Get all regions
  _getRegions: function _getRegions() {
    return _.clone(this._regions);
  },
  getRegions: function getRegions() {
    if (!this._isRendered) {
      this.render();
    }
    return this._getRegions();
  },
  showChildView: function showChildView(name, view) {
    var region = this.getRegion(name);

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    return region.show.apply(region, [view].concat(args));
  },
  detachChildView: function detachChildView(name) {
    return this.getRegion(name).detachView();
  },
  getChildView: function getChildView(name) {
    return this.getRegion(name).currentView;
  }
};

// Renderer
// --------

// Render a template with data by passing in the template
// selector and the data to render.
var Renderer = {

  // Render a template with data. The `template` parameter is
  // passed to the `TemplateCache` object to retrieve the
  // template function. Override this method to provide your own
  // custom rendering and template handling for all of Marionette.
  render: function render(template, data) {
    if (!template) {
      throw new MarionetteError({
        name: 'TemplateNotFoundError',
        message: 'Cannot render the template since its false, null or undefined.'
      });
    }

    var templateFunc = _.isFunction(template) ? template : TemplateCache.get(template);

    return templateFunc(data);
  }
};

// View
// ---------

var ClassOptions$1 = ['behaviors', 'childViewEventPrefix', 'childViewEvents', 'childViewTriggers', 'collectionEvents', 'events', 'modelEvents', 'regionClass', 'regions', 'template', 'templateContext', 'triggers', 'ui'];

// The standard view. Includes view events, automatic rendering
// of Underscore templates, nested views, and more.
var View = Backbone.View.extend({
  constructor: function constructor(options) {
    this.render = _.bind(this.render, this);

    this._setOptions(options);

    this.mergeOptions(options, ClassOptions$1);

    monitorViewEvents(this);

    this._initBehaviors();
    this._initRegions();

    var args = Array.prototype.slice.call(arguments);
    args[0] = this.options;
    Backbone.View.prototype.constructor.apply(this, args);

    this.delegateEntityEvents();

    this._triggerEventOnBehaviors('initialize', this);
  },


  // Serialize the view's model *or* collection, if
  // it exists, for the template
  serializeData: function serializeData() {
    if (!this.model && !this.collection) {
      return {};
    }

    // If we have a model, we serialize that
    if (this.model) {
      return this.serializeModel();
    }

    // Otherwise, we serialize the collection,
    // making it available under the `items` property
    return {
      items: this.serializeCollection()
    };
  },


  // Prepares the special `model` property of a view
  // for being displayed in the template. By default
  // we simply clone the attributes. Override this if
  // you need a custom transformation for your view's model
  serializeModel: function serializeModel() {
    if (!this.model) {
      return {};
    }
    return _.clone(this.model.attributes);
  },


  // Serialize a collection by cloning each of
  // its model's attributes
  serializeCollection: function serializeCollection() {
    if (!this.collection) {
      return {};
    }
    return this.collection.map(function (model) {
      return _.clone(model.attributes);
    });
  },


  // Overriding Backbone.View's `setElement` to handle
  // if an el was previously defined. If so, the view might be
  // rendered or attached on setElement.
  setElement: function setElement() {
    var hasEl = !!this.el;

    Backbone.View.prototype.setElement.apply(this, arguments);

    if (hasEl) {
      this._isRendered = !!this.$el.length;
      this._isAttached = isNodeAttached(this.el);
    }

    if (this._isRendered) {
      this.bindUIElements();
    }

    return this;
  },


  // Render the view, defaulting to underscore.js templates.
  // You can override this in your view definition to provide
  // a very specific rendering for your view. In general, though,
  // you should override the `Marionette.Renderer` object to
  // change how Marionette renders views.
  // Subsequent renders after the first will re-render all nested
  // views.
  render: function render() {
    if (this._isDestroyed) {
      return this;
    }

    this.triggerMethod('before:render', this);

    // If this is not the first render call, then we need to
    // re-initialize the `el` for each region
    if (this._isRendered) {
      this._reInitRegions();
    }

    this._renderTemplate();
    this.bindUIElements();

    this._isRendered = true;
    this.triggerMethod('render', this);

    return this;
  },


  // Internal method to render the template with the serialized data
  // and template context via the `Marionette.Renderer` object.
  _renderTemplate: function _renderTemplate() {
    var template = this.getTemplate();

    // Allow template-less views
    if (template === false) {
      deprecate('template:false is deprecated.  Use _.noop.');
      return;
    }

    // Add in entity data and template context
    var data = this.mixinTemplateContext(this.serializeData());

    // Render and add to el
    var html = this._renderHtml(template, data);
    this.attachElContent(html);
  },


  // Renders the data into the template
  _renderHtml: function _renderHtml(template, data) {
    return Renderer.render(template, data, this);
  },


  // Get the template for this view
  // instance. You can set a `template` attribute in the view
  // definition or pass a `template: "whatever"` parameter in
  // to the constructor options.
  getTemplate: function getTemplate() {
    return this.template;
  },


  // Mix in template context methods. Looks for a
  // `templateContext` attribute, which can either be an
  // object literal, or a function that returns an object
  // literal. All methods and attributes from this object
  // are copies to the object passed in.
  mixinTemplateContext: function mixinTemplateContext() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var templateContext = _.result(this, 'templateContext');
    return _.extend(target, templateContext);
  },


  // Attaches the content of a given view.
  // This method can be overridden to optimize rendering,
  // or to render in a non standard way.
  //
  // For example, using `innerHTML` instead of `$el.html`
  //
  // ```js
  // attachElContent(html) {
  //   this.el.innerHTML = html;
  //   return this;
  // }
  // ```
  attachElContent: function attachElContent(html) {
    this.setInnerContent(this.el, html);

    return this;
  },


  // called by ViewMixin destroy
  _removeChildren: function _removeChildren() {
    this.removeRegions();
  },
  _getImmediateChildren: function _getImmediateChildren() {
    return _.chain(this._getRegions()).map('currentView').compact().value();
  }
}, {
  // Sets the renderer for the Marionette.View class
  setRenderer: function setRenderer(renderer) {
    this.prototype._renderHtml = renderer;
  }
});

_.extend(View.prototype, ViewMixin, RegionsMixin);

// Mix in methods from Underscore, for iteration, and other
// collection related features.
// Borrowing this code from Backbone.Collection:
// https://github.com/jashkenas/backbone/blob/1.1.2/backbone.js#L962

var methods = ['forEach', 'each', 'map', 'find', 'detect', 'filter', 'select', 'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke', 'toArray', 'first', 'initial', 'rest', 'last', 'without', 'isEmpty', 'pluck', 'reduce', 'partition'];

var emulateCollection = function emulateCollection(object, listProperty) {
  _.each(methods, function (method) {
    object[method] = function () {
      var list = _.values(_.result(this, listProperty));
      var args = [list].concat(_.toArray(arguments));
      return _[method].apply(_, args);
    };
  });
};

// Provide a container to store, retrieve and
// shut down child views.
var Container = function Container(views) {
  this._views = {};
  this._indexByModel = {};
  this._indexByCustom = {};
  this._updateLength();

  _.each(views, _.bind(this.add, this));
};

emulateCollection(Container.prototype, '_views');

// Container Methods
// -----------------

_.extend(Container.prototype, {

  // Add a view to this container. Stores the view
  // by `cid` and makes it searchable by the model
  // cid (and model itself). Optionally specify
  // a custom key to store an retrieve the view.
  add: function add(view, customIndex) {
    return this._add(view, customIndex)._updateLength();
  },


  // To be used when avoiding call _updateLength
  // When you are done adding all your new views
  // call _updateLength
  _add: function _add(view, customIndex) {
    var viewCid = view.cid;

    // store the view
    this._views[viewCid] = view;

    // index it by model
    if (view.model) {
      this._indexByModel[view.model.cid] = viewCid;
    }

    // index by custom
    if (customIndex) {
      this._indexByCustom[customIndex] = viewCid;
    }

    return this;
  },


  // Find a view by the model that was attached to
  // it. Uses the model's `cid` to find it.
  findByModel: function findByModel(model) {
    return this.findByModelCid(model.cid);
  },


  // Find a view by the `cid` of the model that was attached to
  // it. Uses the model's `cid` to find the view `cid` and
  // retrieve the view using it.
  findByModelCid: function findByModelCid(modelCid) {
    var viewCid = this._indexByModel[modelCid];
    return this.findByCid(viewCid);
  },


  // Find a view by a custom indexer.
  findByCustom: function findByCustom(index) {
    var viewCid = this._indexByCustom[index];
    return this.findByCid(viewCid);
  },


  // Find by index. This is not guaranteed to be a
  // stable index.
  findByIndex: function findByIndex(index) {
    return _.values(this._views)[index];
  },


  // retrieve a view by its `cid` directly
  findByCid: function findByCid(cid) {
    return this._views[cid];
  },


  // Remove a view
  remove: function remove(view) {
    return this._remove(view)._updateLength();
  },


  // To be used when avoiding call _updateLength
  // When you are done adding all your new views
  // call _updateLength
  _remove: function _remove(view) {
    var viewCid = view.cid;

    // delete model index
    if (view.model) {
      delete this._indexByModel[view.model.cid];
    }

    // delete custom index
    _.some(this._indexByCustom, _.bind(function (cid, key) {
      if (cid === viewCid) {
        delete this._indexByCustom[key];
        return true;
      }
    }, this));

    // remove the view from the container
    delete this._views[viewCid];

    return this;
  },


  // Update the `.length` attribute on this container
  _updateLength: function _updateLength() {
    this.length = _.size(this._views);

    return this;
  }
});

// Collection View
// ---------------

var ClassOptions$3 = ['behaviors', 'childView', 'childViewEventPrefix', 'childViewEvents', 'childViewOptions', 'childViewTriggers', 'collectionEvents', 'events', 'filter', 'emptyView', 'emptyViewOptions', 'modelEvents', 'reorderOnSort', 'sort', 'triggers', 'ui', 'viewComparator'];

// A view that iterates over a Backbone.Collection
// and renders an individual child view for each model.
var CollectionView = Backbone.View.extend({

  // flag for maintaining the sorted order of the collection
  sort: true,

  // constructor
  // option to pass `{sort: false}` to prevent the `CollectionView` from
  // maintaining the sorted order of the collection.
  // This will fallback onto appending childView's to the end.
  //
  // option to pass `{viewComparator: compFunction()}` to allow the `CollectionView`
  // to use a custom sort order for the collection.
  constructor: function constructor(options) {
    this.render = _.bind(this.render, this);

    this._setOptions(options);

    this.mergeOptions(options, ClassOptions$3);

    monitorViewEvents(this);

    this._initBehaviors();
    this.once('render', this._initialEvents);
    this._initChildViewStorage();
    this._bufferedChildren = [];

    var args = Array.prototype.slice.call(arguments);
    args[0] = this.options;
    Backbone.View.prototype.constructor.apply(this, args);

    this.delegateEntityEvents();

    this._triggerEventOnBehaviors('initialize', this);
  },


  // Instead of inserting elements one by one into the page, it's much more performant to insert
  // elements into a document fragment and then insert that document fragment into the page
  _startBuffering: function _startBuffering() {
    this._isBuffering = true;
  },
  _endBuffering: function _endBuffering() {
    var shouldTriggerAttach = !!this._isAttached;
    var triggerOnChildren = shouldTriggerAttach ? this._getImmediateChildren() : [];

    this._isBuffering = false;

    _.each(triggerOnChildren, function (child) {
      triggerMethodOn(child, 'before:attach', child);
    });

    this.attachBuffer(this, this._createBuffer());

    _.each(triggerOnChildren, function (child) {
      child._isAttached = true;
      triggerMethodOn(child, 'attach', child);
    });

    this._bufferedChildren = [];
  },
  _getImmediateChildren: function _getImmediateChildren() {
    return _.values(this.children._views);
  },


  // Configured the initial events that the collection view binds to.
  _initialEvents: function _initialEvents() {
    if (this.collection) {
      this.listenTo(this.collection, 'add', this._onCollectionAdd);
      this.listenTo(this.collection, 'update', this._onCollectionUpdate);
      this.listenTo(this.collection, 'reset', this.render);

      if (this.sort) {
        this.listenTo(this.collection, 'sort', this._sortViews);
      }
    }
  },


  // Handle a child added to the collection
  _onCollectionAdd: function _onCollectionAdd(child, collection, opts) {
    // `index` is present when adding with `at` since BB 1.2; indexOf fallback for < 1.2
    var index = opts.at !== undefined && (opts.index || collection.indexOf(child));

    // When filtered or when there is no initial index, calculate index.
    if (this.filter || index === false) {
      index = _.indexOf(this._filteredSortedModels(index), child);
    }

    if (this._shouldAddChild(child, index)) {
      this._destroyEmptyView();
      this._addChild(child, index);
    }
  },


  // Handle collection update model removals
  _onCollectionUpdate: function _onCollectionUpdate(collection, options) {
    var changes = options.changes;
    this._removeChildModels(changes.removed);
  },


  // Remove the child views and destroy them.
  // This function also updates the indices of later views
  // in the collection in order to keep the children in sync with the collection.
  // "models" is an array of models and the corresponding views
  // will be removed and destroyed from the CollectionView
  _removeChildModels: function _removeChildModels(models) {
    // Used to determine where to update the remaining
    // sibling view indices after these views are removed.
    var removedViews = this._getRemovedViews(models);

    if (!removedViews.length) {
      return;
    }

    this.children._updateLength();

    // decrement the index of views after this one
    this._updateIndices(removedViews, false);

    if (this.isEmpty()) {
      this._showEmptyView();
    }
  },


  // Returns the views that will be used for re-indexing
  // through CollectionView#_updateIndices.
  _getRemovedViews: function _getRemovedViews(models) {
    var _this = this;

    // Returning a view means something was removed.
    return _.reduce(models, function (removingViews, model) {
      var view = model && _this.children.findByModel(model);

      if (!view || view._isDestroyed) {
        return removingViews;
      }

      _this._removeChildView(view);

      removingViews.push(view);

      return removingViews;
    }, []);
  },
  _removeChildView: function _removeChildView(view) {
    this.triggerMethod('before:remove:child', this, view);

    this.children._remove(view);
    if (view.destroy) {
      view.destroy();
    } else {
      destroyBackboneView(view);
    }

    this.stopListening(view);
    this.triggerMethod('remove:child', this, view);
  },


  // Overriding Backbone.View's `setElement` to handle
  // if an el was previously defined. If so, the view might be
  // attached on setElement.
  setElement: function setElement() {
    var hasEl = !!this.el;

    Backbone.View.prototype.setElement.apply(this, arguments);

    if (hasEl) {
      this._isAttached = isNodeAttached(this.el);
    }

    return this;
  },


  // Render children views. Override this method to provide your own implementation of a
  // render function for the collection view.
  render: function render() {
    if (this._isDestroyed) {
      return this;
    }
    this.triggerMethod('before:render', this);
    this._renderChildren();
    this._isRendered = true;
    this.triggerMethod('render', this);
    return this;
  },


  // An efficient rendering used for filtering. Instead of modifying the whole DOM for the
  // collection view, we are only adding or removing the related childrenViews.
  setFilter: function setFilter(filter) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        preventRender = _ref.preventRender;

    var canBeRendered = this._isRendered && !this._isDestroyed;
    var filterChanged = this.filter !== filter;
    var shouldRender = canBeRendered && filterChanged && !preventRender;

    if (shouldRender) {
      var previousModels = this._filteredSortedModels();
      this.filter = filter;
      var models = this._filteredSortedModels();
      this._applyModelDeltas(models, previousModels);
    } else {
      this.filter = filter;
    }

    return this;
  },


  // `removeFilter` is actually an alias for removing filters.
  removeFilter: function removeFilter(options) {
    return this.setFilter(null, options);
  },


  // Calculate and apply difference by cid between `models` and `previousModels`.
  _applyModelDeltas: function _applyModelDeltas(models, previousModels) {
    var _this2 = this;

    var currentIds = {};
    _.each(models, function (model, index) {
      var addedChildNotExists = !_this2.children.findByModel(model);
      if (addedChildNotExists) {
        _this2._onCollectionAdd(model, _this2.collection, { at: index });
      }
      currentIds[model.cid] = true;
    });

    var removeModels = _.filter(previousModels, function (prevModel) {
      return !currentIds[prevModel.cid] && _this2.children.findByModel(prevModel);
    });

    this._removeChildModels(removeModels);
  },


  // Reorder DOM after sorting. When your element's rendering do not use their index,
  // you can pass reorderOnSort: true to only reorder the DOM after a sort instead of
  // rendering all the collectionView.
  reorder: function reorder() {
    var children = this.children;
    var models = this._filteredSortedModels();

    if (!models.length && this._showingEmptyView) {
      return this;
    }

    var anyModelsAdded = _.some(models, function (model) {
      return !children.findByModel(model);
    });

    // If there are any new models added due to filtering we need to add child views,
    // so render as normal.
    if (anyModelsAdded) {
      this.render();
    } else {

      var filteredOutModels = [];

      // Get the DOM nodes in the same order as the models and
      // find the model that were children before but aren't in this new order.
      var elsToReorder = children.reduce(function (viewEls, view) {
        var index = _.indexOf(models, view.model);

        if (index === -1) {
          filteredOutModels.push(view.model);
          return viewEls;
        }

        view._index = index;

        viewEls[index] = view.el;

        return viewEls;
      }, new Array(models.length));

      this.triggerMethod('before:reorder', this);

      // Since append moves elements that are already in the DOM, appending the elements
      // will effectively reorder them.
      this._appendReorderedChildren(elsToReorder);

      // remove any views that have been filtered out
      this._removeChildModels(filteredOutModels);

      this.triggerMethod('reorder', this);
    }
    return this;
  },


  // Render view after sorting. Override this method to change how the view renders
  // after a `sort` on the collection.
  resortView: function resortView() {
    if (this.reorderOnSort) {
      this.reorder();
    } else {
      this._renderChildren();
    }
    return this;
  },


  // Internal method. This checks for any changes in the order of the collection.
  // If the index of any view doesn't match, it will render.
  _sortViews: function _sortViews() {
    var _this3 = this;

    var models = this._filteredSortedModels();

    // check for any changes in sort order of views
    var orderChanged = _.find(models, function (item, index) {
      var view = _this3.children.findByModel(item);
      return !view || view._index !== index;
    });

    if (orderChanged) {
      this.resortView();
    }
  },


  // Internal reference to what index a `emptyView` is.
  _emptyViewIndex: -1,

  // Internal method. Separated so that CompositeView can append to the childViewContainer
  // if necessary
  _appendReorderedChildren: function _appendReorderedChildren(children) {
    this.appendChildren(this.el, children);
  },


  // Internal method. Separated so that CompositeView can have more control over events
  // being triggered, around the rendering process
  _renderChildren: function _renderChildren() {
    if (this._isRendered) {
      this._destroyEmptyView();
      this._destroyChildren();
    }

    var models = this._filteredSortedModels();
    if (this.isEmpty({ processedModels: models })) {
      this._showEmptyView();
    } else {
      this.triggerMethod('before:render:children', this);
      this._startBuffering();
      this._showCollection(models);
      this._endBuffering();
      this.triggerMethod('render:children', this);
    }
  },
  _createView: function _createView(model, index) {
    var ChildView = this._getChildView(model);
    var childViewOptions = this._getChildViewOptions(model, index);
    var view = this.buildChildView(model, ChildView, childViewOptions);
    return view;
  },
  _setupChildView: function _setupChildView(view, index) {
    monitorViewEvents(view);

    // set up the child view event forwarding
    this._proxyChildViewEvents(view);

    if (this.sort) {
      view._index = index;
    }
  },


  // Internal method to loop through collection and show each child view.
  _showCollection: function _showCollection(models) {
    _.each(models, _.bind(this._addChild, this));
    this.children._updateLength();
  },


  // Allow the collection to be sorted by a custom view comparator
  _filteredSortedModels: function _filteredSortedModels(addedAt) {
    if (!this.collection || !this.collection.length) {
      return [];
    }

    var viewComparator = this.getViewComparator();
    var models = this.collection.models;
    addedAt = Math.min(Math.max(addedAt, 0), models.length - 1);

    if (viewComparator) {
      var addedModel = void 0;
      // Preserve `at` location, even for a sorted view
      if (addedAt) {
        addedModel = models[addedAt];
        models = models.slice(0, addedAt).concat(models.slice(addedAt + 1));
      }
      models = this._sortModelsBy(models, viewComparator);
      if (addedModel) {
        models.splice(addedAt, 0, addedModel);
      }
    }

    // Filter after sorting in case the filter uses the index
    models = this._filterModels(models);

    return models;
  },
  getViewComparator: function getViewComparator() {
    return this.viewComparator;
  },


  // Filter an array of models, if a filter exists
  _filterModels: function _filterModels(models) {
    var _this4 = this;

    if (this.filter) {
      models = _.filter(models, function (model, index) {
        return _this4._shouldAddChild(model, index);
      });
    }
    return models;
  },
  _sortModelsBy: function _sortModelsBy(models, comparator) {
    if (typeof comparator === 'string') {
      return _.sortBy(models, function (model) {
        return model.get(comparator);
      });
    } else if (comparator.length === 1) {
      return _.sortBy(models, _.bind(comparator, this));
    } else {
      return _.clone(models).sort(_.bind(comparator, this));
    }
  },


  // Internal method to show an empty view in place of a collection of child views,
  // when the collection is empty
  _showEmptyView: function _showEmptyView() {
    var EmptyView = this._getEmptyView();

    if (EmptyView && !this._showingEmptyView) {
      this._showingEmptyView = true;

      var model = new Backbone.Model();
      var emptyViewOptions = this.emptyViewOptions || this.childViewOptions;
      if (_.isFunction(emptyViewOptions)) {
        emptyViewOptions = emptyViewOptions.call(this, model, this._emptyViewIndex);
      }

      var view = this.buildChildView(model, EmptyView, emptyViewOptions);

      this.triggerMethod('before:render:empty', this, view);
      this.addChildView(view, 0);
      this.triggerMethod('render:empty', this, view);
    }
  },


  // Internal method to destroy an existing emptyView instance if one exists. Called when
  // a collection view has been rendered empty, and then a child is added to the collection.
  _destroyEmptyView: function _destroyEmptyView() {
    if (this._showingEmptyView) {
      this.triggerMethod('before:remove:empty', this);

      this._destroyChildren();
      delete this._showingEmptyView;

      this.triggerMethod('remove:empty', this);
    }
  },


  // Retrieve the empty view class
  _getEmptyView: function _getEmptyView() {
    var emptyView = this.emptyView;

    if (!emptyView) {
      return;
    }

    return this._getView(emptyView);
  },


  // Retrieve the `childView` class
  // The `childView` property can be either a view class or a function that
  // returns a view class. If it is a function, it will receive the model that
  // will be passed to the view instance (created from the returned view class)
  _getChildView: function _getChildView(child) {
    var childView = this.childView;

    if (!childView) {
      throw new MarionetteError({
        name: 'NoChildViewError',
        message: 'A "childView" must be specified'
      });
    }

    childView = this._getView(childView, child);

    if (!childView) {
      throw new MarionetteError({
        name: 'InvalidChildViewError',
        message: '"childView" must be a view class or a function that returns a view class'
      });
    }

    return childView;
  },


  // First check if the `view` is a view class (the common case)
  // Then check if it's a function (which we assume that returns a view class)
  _getView: function _getView(view, child) {
    if (view.prototype instanceof Backbone.View || view === Backbone.View) {
      return view;
    } else if (_.isFunction(view)) {
      return view.call(this, child);
    }
  },


  // Internal method for building and adding a child view
  _addChild: function _addChild(child, index) {
    var view = this._createView(child, index);
    this.addChildView(view, index);

    return view;
  },
  _getChildViewOptions: function _getChildViewOptions(child, index) {
    if (_.isFunction(this.childViewOptions)) {
      return this.childViewOptions(child, index);
    }

    return this.childViewOptions;
  },


  // Render the child's view and add it to the HTML for the collection view at a given index.
  // This will also update the indices of later views in the collection in order to keep the
  // children in sync with the collection.
  addChildView: function addChildView(view, index) {
    this.triggerMethod('before:add:child', this, view);
    this._setupChildView(view, index);

    // Store the child view itself so we can properly remove and/or destroy it later
    if (this._isBuffering) {
      // Add to children, but don't update children's length.
      this.children._add(view);
    } else {
      // increment indices of views after this one
      this._updateIndices(view, true);
      this.children.add(view);
    }

    this._renderView(view);

    this._attachView(view, index);

    this.triggerMethod('add:child', this, view);

    return view;
  },


  // Internal method. This decrements or increments the indices of views after the added/removed
  // view to keep in sync with the collection.
  _updateIndices: function _updateIndices(views, increment) {
    if (!this.sort) {
      return;
    }

    if (!increment) {
      _.each(_.sortBy(this.children._views, '_index'), function (view, index) {
        view._index = index;
      });

      return;
    }

    var view = _.isArray(views) ? _.max(views, '_index') : views;

    if (_.isObject(view)) {
      // update the indexes of views after this one
      this.children.each(function (laterView) {
        if (laterView._index >= view._index) {
          laterView._index += 1;
        }
      });
    }
  },
  _renderView: function _renderView(view) {
    if (view._isRendered) {
      return;
    }

    if (!view.supportsRenderLifecycle) {
      triggerMethodOn(view, 'before:render', view);
    }

    view.render();

    if (!view.supportsRenderLifecycle) {
      view._isRendered = true;
      triggerMethodOn(view, 'render', view);
    }
  },
  _attachView: function _attachView(view, index) {
    // Only trigger attach if already attached and not buffering,
    // otherwise _endBuffering() or Region#show() handles this.
    var shouldTriggerAttach = !view._isAttached && !this._isBuffering && this._isAttached;

    if (shouldTriggerAttach) {
      triggerMethodOn(view, 'before:attach', view);
    }

    this.attachHtml(this, view, index);

    if (shouldTriggerAttach) {
      view._isAttached = true;
      triggerMethodOn(view, 'attach', view);
    }
  },


  // Build a `childView` for a model in the collection.
  buildChildView: function buildChildView(child, ChildViewClass, childViewOptions) {
    var options = _.extend({ model: child }, childViewOptions);
    return new ChildViewClass(options);
  },


  // Remove the child view and destroy it. This function also updates the indices of later views
  // in the collection in order to keep the children in sync with the collection.
  removeChildView: function removeChildView(view) {
    if (!view || view._isDestroyed) {
      return view;
    }

    this._removeChildView(view);
    this.children._updateLength();
    // decrement the index of views after this one
    this._updateIndices(view, false);
    return view;
  },


  // check if the collection is empty or optionally whether an array of pre-processed models is empty
  isEmpty: function isEmpty(options) {
    var models = void 0;
    if (_.result(options, 'processedModels')) {
      models = options.processedModels;
    } else {
      models = this.collection ? this.collection.models : [];
      models = this._filterModels(models);
    }
    return models.length === 0;
  },


  // You might need to override this if you've overridden attachHtml
  attachBuffer: function attachBuffer(collectionView, buffer) {
    this.appendChildren(collectionView.el, buffer);
  },


  // Create a fragment buffer from the currently buffered children
  _createBuffer: function _createBuffer() {
    var _this5 = this;

    var elBuffer = this.createBuffer();
    _.each(this._bufferedChildren, function (b) {
      _this5.appendChildren(elBuffer, b.el);
    });
    return elBuffer;
  },


  // Append the HTML to the collection's `el`. Override this method to do something other
  // than `.append`.
  attachHtml: function attachHtml(collectionView, childView, index) {
    if (collectionView._isBuffering) {
      // buffering happens on reset events and initial renders
      // in order to reduce the number of inserts into the
      // document, which are expensive.
      collectionView._bufferedChildren.splice(index, 0, childView);
    } else {
      // If we've already rendered the main collection, append
      // the new child into the correct order if we need to. Otherwise
      // append to the end.
      if (!collectionView._insertBefore(childView, index)) {
        collectionView._insertAfter(childView);
      }
    }
  },


  // Internal method. Check whether we need to insert the view into the correct position.
  _insertBefore: function _insertBefore(childView, index) {
    var currentView = void 0;
    var findPosition = this.sort && index < this.children.length - 1;
    if (findPosition) {
      // Find the view after this one
      currentView = this.children.find(function (view) {
        return view._index === index + 1;
      });
    }

    if (currentView) {
      this.beforeEl(currentView.el, childView.el);
      return true;
    }

    return false;
  },


  // Internal method. Append a view to the end of the $el
  _insertAfter: function _insertAfter(childView) {
    this.appendChildren(this.el, childView.el);
  },


  // Internal method to set up the `children` object for storing all of the child views
  _initChildViewStorage: function _initChildViewStorage() {
    this.children = new Container();
  },


  // called by ViewMixin destroy
  _removeChildren: function _removeChildren() {
    this._destroyChildren();
  },


  // Destroy the child views that this collection view is holding on to, if any
  _destroyChildren: function _destroyChildren(options) {
    if (!this.children.length) {
      return;
    }

    this.triggerMethod('before:destroy:children', this);
    this.children.each(_.bind(this._removeChildView, this));
    this.children._updateLength();
    this.triggerMethod('destroy:children', this);
  },


  // Return true if the given child should be shown. Return false otherwise.
  // The filter will be passed (child, index, collection), where
  //  'child' is the given model
  //  'index' is the index of that model in the collection
  //  'collection' is the collection referenced by this CollectionView
  _shouldAddChild: function _shouldAddChild(child, index) {
    var filter = this.filter;
    return !_.isFunction(filter) || filter.call(this, child, index, this.collection);
  }
});

_.extend(CollectionView.prototype, ViewMixin);

// Provide a container to store, retrieve and
// shut down child views.
var Container$1 = function Container$1() {
  this._init();
};

emulateCollection(Container$1.prototype, '_views');

function stringComparator(comparator, view) {
  return view.model && view.model.get(comparator);
}

// Container Methods
// -----------------

_.extend(Container$1.prototype, {

  // Initializes an empty container
  _init: function _init() {
    this._views = [];
    this._viewsByCid = {};
    this._indexByModel = {};
    this._updateLength();
  },


  // Add a view to this container. Stores the view
  // by `cid` and makes it searchable by the model
  // cid (and model itself). Additionally it stores
  // the view by index in the _views array
  _add: function _add(view) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._views.length;

    var viewCid = view.cid;

    // store the view
    this._viewsByCid[viewCid] = view;

    // index it by model
    if (view.model) {
      this._indexByModel[view.model.cid] = viewCid;
    }

    // add to end by default
    this._views.splice(index, 0, view);

    this._updateLength();
  },


  // Sort (mutate) and return the array of the child views.
  _sort: function _sort(comparator) {
    if (typeof comparator === 'string') {
      comparator = _.partial(stringComparator, comparator);
      return this._sortBy(comparator);
    }

    if (comparator.length === 1) {
      return this._sortBy(comparator);
    }

    return this._views.sort(comparator);
  },


  // Makes `_.sortBy` mutate the array to match `this._views.sort`
  _sortBy: function _sortBy(comparator) {
    var sortedViews = _.sortBy(this._views, comparator);

    this._set(sortedViews);

    return sortedViews;
  },


  // Replace array contents without overwriting the reference.
  _set: function _set(views) {
    this._views.length = 0;

    this._views.push.apply(this._views, views.slice(0));

    this._updateLength();
  },


  // Find a view by the model that was attached to it.
  // Uses the model's `cid` to find it.
  findByModel: function findByModel(model) {
    return this.findByModelCid(model.cid);
  },


  // Find a view by the `cid` of the model that was attached to it.
  // Uses the model's `cid` to find the view `cid` and
  // retrieve the view using it.
  findByModelCid: function findByModelCid(modelCid) {
    var viewCid = this._indexByModel[modelCid];
    return this.findByCid(viewCid);
  },


  // Find a view by index.
  findByIndex: function findByIndex(index) {
    return this._views[index];
  },


  // Find the index of a view instance
  findIndexByView: function findIndexByView(view) {
    return this._views.indexOf(view);
  },


  // Retrieve a view by its `cid` directly
  findByCid: function findByCid(cid) {
    return this._viewsByCid[cid];
  },


  // Remove a view and clean up index references.
  _remove: function _remove(view) {
    if (!this._viewsByCid[view.cid]) {
      return;
    }

    // delete model index
    if (view.model) {
      delete this._indexByModel[view.model.cid];
    }

    // remove the view from the container
    delete this._viewsByCid[view.cid];

    var index = this.findIndexByView(view);
    this._views.splice(index, 1);

    this._updateLength();
  },


  // Update the `.length` attribute on this container
  _updateLength: function _updateLength() {
    this.length = this._views.length;
  }
});

// Next Collection View
// ---------------

var ClassOptions$4 = ['behaviors', 'childView', 'childViewEventPrefix', 'childViewEvents', 'childViewOptions', 'childViewTriggers', 'collectionEvents', 'emptyView', 'emptyViewOptions', 'events', 'modelEvents', 'sortWithCollection', 'triggers', 'ui', 'viewComparator', 'viewFilter'];

// A view that iterates over a Backbone.Collection
// and renders an individual child view for each model.
var CollectionView$2 = Backbone.View.extend({
  // flag for maintaining the sorted order of the collection
  sortWithCollection: true,

  // constructor
  constructor: function constructor(options) {
    this._setOptions(options);

    this.mergeOptions(options, ClassOptions$4);

    monitorViewEvents(this);

    this.once('render', this._initialEvents);

    // This children container isn't really used by a render, but it provides
    // the ability to check `this.children.length` prior to rendering
    // It also allows for cases where only addChildView is used
    this._initChildViewStorage();
    this._initBehaviors();

    var args = Array.prototype.slice.call(arguments);
    args[0] = this.options;
    Backbone.View.prototype.constructor.apply(this, args);

    this._initEmptyRegion();

    this.delegateEntityEvents();

    this._triggerEventOnBehaviors('initialize', this);
  },


  // Internal method to set up the `children` object for storing all of the child views
  _initChildViewStorage: function _initChildViewStorage() {
    this.children = new Container$1();
  },


  // Create an region to show the emptyView
  _initEmptyRegion: function _initEmptyRegion() {
    this.emptyRegion = new Region({ el: this.el });

    this.emptyRegion._parentView = this;
  },


  // Configured the initial events that the collection view binds to.
  _initialEvents: function _initialEvents() {
    this.listenTo(this.collection, {
      'sort': this._onCollectionSort,
      'reset': this._onCollectionReset,
      'update': this._onCollectionUpdate
    });
  },


  // Internal method. This checks for any changes in the order of the collection.
  // If the index of any view doesn't match, it will re-sort.
  _onCollectionSort: function _onCollectionSort() {
    var _this = this;

    if (!this.sortWithCollection) {
      return;
    }

    // If the data is changing we will handle the sort later
    if (this.collection.length !== this.children.length) {
      return;
    }

    // Additional check if the data is changing
    var hasAddedModel = this.collection.some(function (model) {
      return !_this.children.findByModel(model);
    });

    if (hasAddedModel) {
      return;
    }

    // If the only thing happening here is sorting, sort.
    this.sort();
  },
  _onCollectionReset: function _onCollectionReset() {
    this.render();
  },


  // Handle collection update model additions and  removals
  _onCollectionUpdate: function _onCollectionUpdate(collection, options) {
    var changes = options.changes;

    // Remove first since it'll be a shorter array lookup.
    var removedViews = this._removeChildModels(changes.removed);

    this._addChildModels(changes.added);

    this._detachChildren(removedViews);

    this._showChildren();

    // Destroy removed child views after all of the render is complete
    this._removeChildViews(removedViews);
  },
  _removeChildModels: function _removeChildModels(models) {
    return _.map(models, _.bind(this._removeChildModel, this));
  },
  _removeChildModel: function _removeChildModel(model) {
    var view = this.children.findByModel(model);

    this._removeChild(view);

    return view;
  },
  _removeChild: function _removeChild(view) {
    this.triggerMethod('before:remove:child', this, view);

    this.children._remove(view);

    this.triggerMethod('remove:child', this, view);
  },


  // Added views are returned for consistency with _removeChildModels
  _addChildModels: function _addChildModels(models) {
    return _.map(models, _.bind(this._addChildModel, this));
  },
  _addChildModel: function _addChildModel(model) {
    var view = this._createChildView(model);

    this._addChild(view);

    return view;
  },
  _createChildView: function _createChildView(model) {
    var ChildView = this._getChildView(model);
    var childViewOptions = this._getChildViewOptions(model);
    var view = this.buildChildView(model, ChildView, childViewOptions);

    return view;
  },
  _addChild: function _addChild(view, index) {
    this.triggerMethod('before:add:child', this, view);

    this._setupChildView(view);
    this.children._add(view, index);

    this.triggerMethod('add:child', this, view);
  },


  // Retrieve the `childView` class
  // The `childView` property can be either a view class or a function that
  // returns a view class. If it is a function, it will receive the model that
  // will be passed to the view instance (created from the returned view class)
  _getChildView: function _getChildView(child) {
    var childView = this.childView;

    if (!childView) {
      throw new MarionetteError({
        name: 'NoChildViewError',
        message: 'A "childView" must be specified'
      });
    }

    childView = this._getView(childView, child);

    if (!childView) {
      throw new MarionetteError({
        name: 'InvalidChildViewError',
        message: '"childView" must be a view class or a function that returns a view class'
      });
    }

    return childView;
  },


  // First check if the `view` is a view class (the common case)
  // Then check if it's a function (which we assume that returns a view class)
  _getView: function _getView(view, child) {
    if (view.prototype instanceof Backbone.View || view === Backbone.View) {
      return view;
    } else if (_.isFunction(view)) {
      return view.call(this, child);
    }
  },
  _getChildViewOptions: function _getChildViewOptions(child) {
    if (_.isFunction(this.childViewOptions)) {
      return this.childViewOptions(child);
    }

    return this.childViewOptions;
  },


  // Build a `childView` for a model in the collection.
  // Override to customize the build
  buildChildView: function buildChildView(child, ChildViewClass, childViewOptions) {
    var options = _.extend({ model: child }, childViewOptions);
    return new ChildViewClass(options);
  },
  _setupChildView: function _setupChildView(view) {
    monitorViewEvents(view);

    // We need to listen for if a view is destroyed in a way other
    // than through the CollectionView.
    // If this happens we need to remove the reference to the view
    // since once a view has been destroyed we can not reuse it.
    view.on('destroy', this.removeChildView, this);

    // set up the child view event forwarding
    this._proxyChildViewEvents(view);
  },


  // used by ViewMixin's `_childViewEventHandler`
  _getImmediateChildren: function _getImmediateChildren() {
    return this.children._views;
  },


  // Overriding Backbone.View's `setElement` to handle
  // if an el was previously defined. If so, the view might be
  // attached on setElement.
  setElement: function setElement() {
    var hasEl = !!this.el;

    Backbone.View.prototype.setElement.apply(this, arguments);

    if (hasEl) {
      this._isAttached = isNodeAttached(this.el);
    }

    return this;
  },


  // Render children views.
  render: function render() {
    if (this._isDestroyed) {
      return this;
    }
    this.triggerMethod('before:render', this);

    this._destroyChildren();

    // After all children have been destroyed re-init the container
    this.children._init();

    if (this.collection) {
      this._addChildModels(this.collection.models);
    }

    this._showChildren();

    this._isRendered = true;

    this.triggerMethod('render', this);
    return this;
  },


  // Sorts the children then filters and renders the results.
  sort: function sort() {
    if (this._isDestroyed) {
      return this;
    }

    if (!this.children.length) {
      return this;
    }

    this._showChildren();

    return this;
  },
  _showChildren: function _showChildren() {
    if (this.isEmpty()) {
      this._showEmptyView();
      return;
    }

    this._sortChildren();

    this.filter();
  },


  // Returns true if the collectionView is considered empty.
  // This is called twice during a render. Once to check the data,
  // and again when views are filtered. Override this function to
  // customize what empty means.
  isEmpty: function isEmpty(allViewsFiltered) {
    return allViewsFiltered || !this.children.length;
  },
  _showEmptyView: function _showEmptyView() {
    var EmptyView = this._getEmptyView();

    if (!EmptyView) {
      return;
    }

    var options = this._getEmptyViewOptions();

    this.emptyRegion.show(new EmptyView(options));
  },


  // Retrieve the empty view class
  _getEmptyView: function _getEmptyView() {
    var emptyView = this.emptyView;

    if (!emptyView) {
      return;
    }

    return this._getView(emptyView);
  },


  // Remove the emptyView
  _destroyEmptyView: function _destroyEmptyView() {

    // Only empty if a view is show so the region
    // doesn't detach any other unrelated HTML
    if (this.emptyRegion.hasView()) {
      this.emptyRegion.empty();
    }
  },


  //
  _getEmptyViewOptions: function _getEmptyViewOptions() {
    var emptyViewOptions = this.emptyViewOptions || this.childViewOptions;

    if (_.isFunction(emptyViewOptions)) {
      return emptyViewOptions.call(this);
    }

    return emptyViewOptions;
  },


  // Sorts views by viewComparator and sets the children to the new order
  _sortChildren: function _sortChildren() {
    this.triggerMethod('before:sort', this);

    var viewComparator = this.getComparator();

    if (_.isFunction(viewComparator)) {
      // Must use native bind to preserve length
      viewComparator = viewComparator.bind(this);
    }

    this.children._sort(viewComparator);

    this.triggerMethod('sort', this);
  },


  // Sets the view's `viewComparator` and applies the sort if the view is ready.
  // To prevent the render pass `{ preventRender: true }` as the 2nd argument.
  setComparator: function setComparator(comparator) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        preventRender = _ref.preventRender;

    var comparatorChanged = this.viewComparator !== comparator;
    var shouldSort = comparatorChanged && !preventRender;

    this.viewComparator = comparator;

    if (shouldSort) {
      this.sort();
    }

    return this;
  },


  // Clears the `viewComparator` and follows the same rules for rendering as `setComparator`.
  removeComparator: function removeComparator(options) {
    return this.setComparator(null, options);
  },


  // If viewComparator is overriden it will be returned here.
  // Additionally override this function to provide custom
  // viewComparator logic
  getComparator: function getComparator() {
    return this.viewComparator || this._viewComparator;
  },


  // Default internal view comparator that order the views by
  // the order of the collection
  _viewComparator: function _viewComparator(view) {
    if (!this.collection) {
      return;
    }
    return this.collection.indexOf(view.model);
  },


  // This method re-filters the children views and re-renders the results
  filter: function filter() {
    if (this._isDestroyed) {
      return this;
    }

    if (!this.children.length) {
      return this;
    }

    var filteredViews = this._filterChildren();

    this._renderChildren(filteredViews);

    return this;
  },
  _filterChildren: function _filterChildren() {
    var viewFilter = this._getFilter();

    if (!viewFilter) {
      return this.children._views;
    }

    this.triggerMethod('before:filter', this);

    var filteredViews = this.children.partition(_.bind(viewFilter, this));

    this._detachChildren(filteredViews[1]);

    this.triggerMethod('filter', this);

    return filteredViews[0];
  },


  // This method returns a function for the viewFilter
  _getFilter: function _getFilter() {
    var viewFilter = this.getFilter();

    if (!viewFilter) {
      return false;
    }

    if (_.isFunction(viewFilter)) {
      return viewFilter;
    }

    // Support filter predicates `{ fooFlag: true }`
    if (_.isObject(viewFilter)) {
      var matcher = _.matches(viewFilter);
      return function (view) {
        return matcher(view.model && view.model.attributes);
      };
    }

    // Filter by model attribute
    if (_.isString(viewFilter)) {
      return function (view) {
        return view.model && view.model.get(viewFilter);
      };
    }

    throw new MarionetteError({
      name: 'InvalidViewFilterError',
      message: '"viewFilter" must be a function, predicate object literal, a string indicating a model attribute, or falsy'
    });
  },


  // Override this function to provide custom
  // viewFilter logic
  getFilter: function getFilter() {
    return this.viewFilter;
  },


  // Sets the view's `viewFilter` and applies the filter if the view is ready.
  // To prevent the render pass `{ preventRender: true }` as the 2nd argument.
  setFilter: function setFilter(filter) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        preventRender = _ref2.preventRender;

    var filterChanged = this.viewFilter !== filter;
    var shouldRender = filterChanged && !preventRender;

    this.viewFilter = filter;

    if (shouldRender) {
      this.filter();
    }

    return this;
  },


  // Clears the `viewFilter` and follows the same rules for rendering as `setFilter`.
  removeFilter: function removeFilter(options) {
    return this.setFilter(null, options);
  },
  _detachChildren: function _detachChildren(detachingViews) {
    _.each(detachingViews, _.bind(this._detachChildView, this));
  },
  _detachChildView: function _detachChildView(view) {
    var shouldTriggerDetach = !!view._isAttached;
    if (shouldTriggerDetach) {
      triggerMethodOn(view, 'before:detach', view);
    }

    this.detachHtml(view);

    if (shouldTriggerDetach) {
      view._isAttached = false;
      triggerMethodOn(view, 'detach', view);
    }
  },


  // Override this method to change how the collectionView detaches a child view
  detachHtml: function detachHtml(view) {
    this.detachEl(view.el);
  },
  _renderChildren: function _renderChildren(views) {
    if (this.isEmpty(!views.length)) {
      this._showEmptyView();
      return;
    }

    this._destroyEmptyView();

    this.triggerMethod('before:render:children', this, views);

    var els = this._getBuffer(views);

    this._attachChildren(els, views);

    this.triggerMethod('render:children', this, views);
  },
  _attachChildren: function _attachChildren(els, views) {
    var shouldTriggerAttach = !!this._isAttached;

    views = shouldTriggerAttach ? views : [];

    _.each(views, function (view) {
      if (view._isAttached) {
        return;
      }
      triggerMethodOn(view, 'before:attach', view);
    });

    this.attachHtml(this, els);

    _.each(views, function (view) {
      if (view._isAttached) {
        return;
      }
      view._isAttached = true;
      triggerMethodOn(view, 'attach', view);
    });
  },


  // Renders each view in children and creates a fragment buffer from them
  _getBuffer: function _getBuffer(views) {
    var _this2 = this;

    var elBuffer = this.createBuffer();

    _.each(views, function (view) {
      _this2._renderChildView(view);
      _this2.appendChildren(elBuffer, view.el);
    });

    return elBuffer;
  },
  _renderChildView: function _renderChildView(view) {
    if (view._isRendered) {
      return;
    }

    if (!view.supportsRenderLifecycle) {
      triggerMethodOn(view, 'before:render', view);
    }

    view.render();

    if (!view.supportsRenderLifecycle) {
      view._isRendered = true;
      triggerMethodOn(view, 'render', view);
    }
  },


  // Override this method to do something other than `.append`.
  // You can attach any HTML at this point including the els.
  attachHtml: function attachHtml(collectionView, els) {
    this.appendChildren(collectionView.el, els);
  },


  // Render the child's view and add it to the HTML for the collection view at a given index, based on the current sort
  addChildView: function addChildView(view, index) {
    if (!view || view._isDestroyed) {
      return view;
    }

    this._addChild(view, index);
    this._showChildren();

    return view;
  },


  // Detach a view from the children.  Best used when adding a
  // childView from `addChildView`
  detachChildView: function detachChildView(view) {
    this.removeChildView(view, { shouldDetach: true });

    return view;
  },


  // Remove the child view and destroy it.  Best used when adding a
  // childView from `addChildView`
  // The options argument is for internal use only
  removeChildView: function removeChildView(view, options) {
    if (!view) {
      return view;
    }

    this._removeChildView(view, options);

    this._removeChild(view);

    if (this.isEmpty()) {
      this._showEmptyView();
    }

    return view;
  },
  _removeChildViews: function _removeChildViews(views) {
    _.each(views, _.bind(this._removeChildView, this));
  },
  _removeChildView: function _removeChildView(view) {
    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        shouldDetach = _ref3.shouldDetach;

    view.off('destroy', this.removeChildView, this);

    if (shouldDetach) {
      this._detachChildView(view);
    } else {
      this._destroyChildView(view);
    }

    this.stopListening(view);
  },
  _destroyChildView: function _destroyChildView(view) {
    if (view._isDestroyed) {
      return;
    }

    if (view.destroy) {
      view.destroy();
    } else {
      destroyBackboneView(view);
    }
  },


  // called by ViewMixin destroy
  _removeChildren: function _removeChildren() {
    this._destroyChildren();
    this.emptyRegion.destroy();
  },


  // Destroy the child views that this collection view is holding on to, if any
  _destroyChildren: function _destroyChildren() {
    if (!this.children || !this.children.length) {
      return;
    }

    this.triggerMethod('before:destroy:children', this);
    this.children.each(_.bind(this._removeChildView, this));
    this.triggerMethod('destroy:children', this);
  }
});

_.extend(CollectionView$2.prototype, ViewMixin);

// Composite View
// --------------

var ClassOptions$5 = ['childViewContainer', 'template', 'templateContext'];

// Used for rendering a branch-leaf, hierarchical structure.
// Extends directly from CollectionView
// @deprecated
var CompositeView = CollectionView.extend({

  // Setting up the inheritance chain which allows changes to
  // Marionette.CollectionView.prototype.constructor which allows overriding
  // option to pass '{sort: false}' to prevent the CompositeView from
  // maintaining the sorted order of the collection.
  // This will fallback onto appending childView's to the end.
  constructor: function constructor(options) {
    deprecate('CompositeView is deprecated. Convert to View at your earliest convenience');

    this.mergeOptions(options, ClassOptions$5);

    CollectionView.prototype.constructor.apply(this, arguments);
  },


  // Configured the initial events that the composite view
  // binds to. Override this method to prevent the initial
  // events, or to add your own initial events.
  _initialEvents: function _initialEvents() {

    // Bind only after composite view is rendered to avoid adding child views
    // to nonexistent childViewContainer

    if (this.collection) {
      this.listenTo(this.collection, 'add', this._onCollectionAdd);
      this.listenTo(this.collection, 'update', this._onCollectionUpdate);
      this.listenTo(this.collection, 'reset', this.renderChildren);

      if (this.sort) {
        this.listenTo(this.collection, 'sort', this._sortViews);
      }
    }
  },


  // Retrieve the `childView` to be used when rendering each of
  // the items in the collection. The default is to return
  // `this.childView` or Marionette.CompositeView if no `childView`
  // has been defined. As happens in CollectionView, `childView` can
  // be a function (which should return a view class).
  _getChildView: function _getChildView(child) {
    var childView = this.childView;

    // for CompositeView, if `childView` is not specified, we'll get the same
    // composite view class rendered for each child in the collection
    // then check if the `childView` is a view class (the common case)
    // finally check if it's a function (which we assume that returns a view class)
    if (!childView) {
      return this.constructor;
    }

    childView = this._getView(childView, child);

    if (!childView) {
      throw new MarionetteError({
        name: 'InvalidChildViewError',
        message: '"childView" must be a view class or a function that returns a view class'
      });
    }

    return childView;
  },


  // Return the serialized model
  serializeData: function serializeData() {
    return this.serializeModel();
  },


  // Renders the model and the collection.
  render: function render() {
    if (this._isDestroyed) {
      return this;
    }
    this._isRendering = true;
    this.resetChildViewContainer();

    this.triggerMethod('before:render', this);

    this._renderTemplate();
    this.bindUIElements();
    this.renderChildren();

    this._isRendering = false;
    this._isRendered = true;
    this.triggerMethod('render', this);
    return this;
  },
  renderChildren: function renderChildren() {
    if (this._isRendered || this._isRendering) {
      CollectionView.prototype._renderChildren.call(this);
    }
  },


  // You might need to override this if you've overridden attachHtml
  attachBuffer: function attachBuffer(compositeView, buffer) {
    var $container = this.getChildViewContainer(compositeView);
    this.appendChildren($container, buffer);
  },


  // Internal method. Append a view to the end of the $el.
  // Overidden from CollectionView to ensure view is appended to
  // childViewContainer
  _insertAfter: function _insertAfter(childView) {
    var $container = this.getChildViewContainer(this, childView);
    this.appendChildren($container, childView.el);
  },


  // Internal method. Append reordered childView'.
  // Overidden from CollectionView to ensure reordered views
  // are appended to childViewContainer
  _appendReorderedChildren: function _appendReorderedChildren(children) {
    var $container = this.getChildViewContainer(this);
    this.appendChildren($container, children);
  },


  // Internal method to ensure an `$childViewContainer` exists, for the
  // `attachHtml` method to use.
  getChildViewContainer: function getChildViewContainer(containerView, childView) {
    if (!!containerView.$childViewContainer) {
      return containerView.$childViewContainer;
    }

    var container = void 0;
    var childViewContainer = containerView.childViewContainer;
    if (childViewContainer) {

      var selector = _.result(containerView, 'childViewContainer');

      if (selector.charAt(0) === '@' && containerView.ui) {
        container = containerView.ui[selector.substr(4)];
      } else {
        container = this.findEls(selector, containerView.$el);
      }

      if (container.length <= 0) {
        throw new MarionetteError({
          name: 'ChildViewContainerMissingError',
          message: 'The specified "childViewContainer" was not found: ' + containerView.childViewContainer
        });
      }
    } else {
      container = containerView.$el;
    }

    containerView.$childViewContainer = container;
    return container;
  },


  // Internal method to reset the `$childViewContainer` on render
  resetChildViewContainer: function resetChildViewContainer() {
    if (this.$childViewContainer) {
      this.$childViewContainer = undefined;
    }
  }
});

// To prevent duplication but allow the best View organization
// Certain View methods are mixed directly into the deprecated CompositeView
var MixinFromView = _.pick(View.prototype, 'serializeModel', 'getTemplate', '_renderTemplate', '_renderHtml', 'mixinTemplateContext', 'attachElContent');
_.extend(CompositeView.prototype, MixinFromView);

// Behavior
// --------

// A Behavior is an isolated set of DOM /
// user interactions that can be mixed into any View.
// Behaviors allow you to blackbox View specific interactions
// into portable logical chunks, keeping your views simple and your code DRY.

var ClassOptions$6 = ['collectionEvents', 'events', 'modelEvents', 'triggers', 'ui'];

var Behavior = MarionetteObject.extend({
  cidPrefix: 'mnb',

  constructor: function constructor(options, view) {
    // Setup reference to the view.
    // this comes in handle when a behavior
    // wants to directly talk up the chain
    // to the view.
    this.view = view;

    if (this.defaults) {
      deprecate('Behavior defaults are deprecated. For similar functionality set options on the Behavior class.');
    }

    this.defaults = _.clone(_.result(this, 'defaults', {}));

    this._setOptions(this.defaults, options);
    this.mergeOptions(this.options, ClassOptions$6);

    // Construct an internal UI hash using
    // the behaviors UI hash and then the view UI hash.
    // This allows the user to use UI hash elements
    // defined in the parent view as well as those
    // defined in the given behavior.
    // This order will help the reuse and share of a behavior
    // between multiple views, while letting a view override a
    // selector under an UI key.
    this.ui = _.extend({}, _.result(this, 'ui'), _.result(view, 'ui'));

    MarionetteObject.apply(this, arguments);
  },


  // proxy behavior $ method to the view
  // this is useful for doing jquery DOM lookups
  // scoped to behaviors view.
  $: function $() {
    return this.view.$.apply(this.view, arguments);
  },


  // Stops the behavior from listening to events.
  // Overrides Object#destroy to prevent additional events from being triggered.
  destroy: function destroy() {
    this.stopListening();

    this.view._removeBehavior(this);

    return this;
  },
  proxyViewProperties: function proxyViewProperties() {
    this.$el = this.view.$el;
    this.el = this.view.el;

    return this;
  },
  bindUIElements: function bindUIElements() {
    this._bindUIElements();

    return this;
  },
  unbindUIElements: function unbindUIElements() {
    this._unbindUIElements();

    return this;
  },
  getUI: function getUI(name) {
    return this._getUI(name);
  },


  // Handle `modelEvents`, and `collectionEvents` configuration
  delegateEntityEvents: function delegateEntityEvents() {
    this._delegateEntityEvents(this.view.model, this.view.collection);

    return this;
  },
  undelegateEntityEvents: function undelegateEntityEvents() {
    this._undelegateEntityEvents(this.view.model, this.view.collection);

    return this;
  },
  getEvents: function getEvents() {
    var _this = this;

    // Normalize behavior events hash to allow
    // a user to use the @ui. syntax.
    var behaviorEvents = this.normalizeUIKeys(_.result(this, 'events'));

    // binds the handler to the behavior and builds a unique eventName
    return _.reduce(behaviorEvents, function (events, behaviorHandler, key) {
      if (!_.isFunction(behaviorHandler)) {
        behaviorHandler = _this[behaviorHandler];
      }
      if (!behaviorHandler) {
        return;
      }
      key = getUniqueEventName(key);
      events[key] = _.bind(behaviorHandler, _this);
      return events;
    }, {});
  },


  // Internal method to build all trigger handlers for a given behavior
  getTriggers: function getTriggers() {
    if (!this.triggers) {
      return;
    }

    // Normalize behavior triggers hash to allow
    // a user to use the @ui. syntax.
    var behaviorTriggers = this.normalizeUIKeys(_.result(this, 'triggers'));

    return this._getViewTriggers(this.view, behaviorTriggers);
  }
});

_.extend(Behavior.prototype, DelegateEntityEventsMixin, TriggersMixin, UIMixin);

// Application
// -----------
var ClassOptions$7 = ['region', 'regionClass'];

// A container for a Marionette application.
var Application = MarionetteObject.extend({
  cidPrefix: 'mna',

  constructor: function constructor(options) {
    this._setOptions(options);

    this.mergeOptions(options, ClassOptions$7);

    this._initRegion();

    MarionetteObject.prototype.constructor.apply(this, arguments);
  },


  regionClass: Region,

  _initRegion: function _initRegion() {
    var region = this.region;

    if (!region) {
      return;
    }

    var defaults = {
      regionClass: this.regionClass
    };

    this._region = buildRegion(region, defaults);
  },
  getRegion: function getRegion() {
    return this._region;
  },
  showView: function showView(view) {
    var region = this.getRegion();

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return region.show.apply(region, [view].concat(args));
  },
  getView: function getView() {
    return this.getRegion().currentView;
  },


  // kick off all of the application's processes.
  start: function start(options) {
    this.triggerMethod('before:start', this, options);
    this.triggerMethod('start', this, options);
    return this;
  }
});

// App Router
// ----------

// Reduce the boilerplate code of handling route events
// and then calling a single method on another object,
// called a controller.
// Have your routers configured to call the method on
// your controller, directly.
//
// Configure an AppRouter with `appRoutes`.
//
// App routers can only take one `controller` object.
// It is recommended that you divide your controller
// objects in to smaller pieces of related functionality
// and have multiple routers / controllers, instead of
// just one giant router and controller.
//
// You can also add standard routes to an AppRouter.

var ClassOptions$8 = ['appRoutes', 'controller'];

var AppRouter = Backbone.Router.extend({
  constructor: function constructor(options) {
    this._setOptions(options);

    this.mergeOptions(options, ClassOptions$8);

    Backbone.Router.apply(this, arguments);

    var appRoutes = this.appRoutes;
    var controller = this._getController();
    this.processAppRoutes(controller, appRoutes);
    this.on('route', this._processOnRoute, this);
  },


  // Similar to route method on a Backbone Router but
  // method is called on the controller
  appRoute: function appRoute(route, methodName) {
    var controller = this._getController();
    this._addAppRoute(controller, route, methodName);
    return this;
  },


  // process the route event and trigger the onRoute
  // method call, if it exists
  _processOnRoute: function _processOnRoute(routeName, routeArgs) {
    // make sure an onRoute before trying to call it
    if (_.isFunction(this.onRoute)) {
      // find the path that matches the current route
      var routePath = _.invert(this.appRoutes)[routeName];
      this.onRoute(routeName, routePath, routeArgs);
    }
  },


  // Internal method to process the `appRoutes` for the
  // router, and turn them in to routes that trigger the
  // specified method on the specified `controller`.
  processAppRoutes: function processAppRoutes(controller, appRoutes) {
    var _this = this;

    if (!appRoutes) {
      return this;
    }

    var routeNames = _.keys(appRoutes).reverse(); // Backbone requires reverted order of routes

    _.each(routeNames, function (route) {
      _this._addAppRoute(controller, route, appRoutes[route]);
    });

    return this;
  },
  _getController: function _getController() {
    return this.controller;
  },
  _addAppRoute: function _addAppRoute(controller, route, methodName) {
    var method = controller[methodName];

    if (!method) {
      throw new MarionetteError('Method "' + methodName + '" was not found on the controller');
    }

    this.route(route, methodName, _.bind(method, controller));
  },


  triggerMethod: triggerMethod$1
});

_.extend(AppRouter.prototype, CommonMixin);

// Placeholder method to be extended by the user.
// The method should define the object that stores the behaviors.
// i.e.
//
// ```js
// Marionette.Behaviors.behaviorsLookup: function() {
//   return App.Behaviors
// }
// ```
function behaviorsLookup() {
  throw new MarionetteError({
    message: 'You must define where your behaviors are stored.',
    url: 'marionette.behaviors.md#behaviorslookup'
  });
}

var previousMarionette = Backbone.Marionette;
var Marionette = Backbone.Marionette = {};

// This allows you to run multiple instances of Marionette on the same
// webapp. After loading the new version, call `noConflict()` to
// get a reference to it. At the same time the old version will be
// returned to Backbone.Marionette.
Marionette.noConflict = function () {
  Backbone.Marionette = previousMarionette;
  return this;
};

// Utilities
Marionette.bindEvents = proxy(bindEvents);
Marionette.unbindEvents = proxy(unbindEvents);
Marionette.bindRequests = proxy(bindRequests);
Marionette.unbindRequests = proxy(unbindRequests);
Marionette.mergeOptions = proxy(mergeOptions);
Marionette.getOption = proxy(getOption);
Marionette.normalizeMethods = proxy(normalizeMethods);
Marionette.extend = extend;
Marionette.isNodeAttached = isNodeAttached;
Marionette.deprecate = deprecate;
Marionette.triggerMethod = proxy(triggerMethod$1);
Marionette.triggerMethodOn = triggerMethodOn;
Marionette.isEnabled = isEnabled;
Marionette.setEnabled = setEnabled;
Marionette.monitorViewEvents = monitorViewEvents;

Marionette.Behaviors = {};
Marionette.Behaviors.behaviorsLookup = behaviorsLookup;

// Classes
Marionette.Application = Application;
Marionette.AppRouter = AppRouter;
Marionette.Renderer = Renderer;
Marionette.TemplateCache = TemplateCache;
Marionette.View = View;
Marionette.CollectionView = CollectionView;
Marionette.NextCollectionView = CollectionView$2;
Marionette.CompositeView = CompositeView;
Marionette.Behavior = Behavior;
Marionette.Region = Region;
Marionette.Error = MarionetteError;
Marionette.Object = MarionetteObject;

// Configuration
Marionette.DEV_MODE = false;
Marionette.FEATURES = FEATURES;
Marionette.VERSION = version;

return Marionette;

})));

//# sourceMappingURL=backbone.marionette.js.map
