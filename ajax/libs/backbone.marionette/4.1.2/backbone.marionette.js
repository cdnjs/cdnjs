/**
* @license
* MarionetteJS (Backbone.Marionette)
* ----------------------------------
* v4.1.2
*
* Copyright (c)2019 Derick Bailey, Muted Solutions, LLC.
* Distributed under MIT license
*
* http://marionettejs.com
*/


(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('backbone'), require('underscore'), require('backbone.radio')) :
  typeof define === 'function' && define.amd ? define(['exports', 'backbone', 'underscore', 'backbone.radio'], factory) :
  (global = global || self, (function () {
    var current = global.Marionette;
    var exports = global.Marionette = {};
    factory(exports, global.Backbone, global._, global.Backbone.Radio);
    exports.noConflict = function () { global.Marionette = current; return exports; };
  }()));
}(this, function (exports, Backbone, _, Radio) { 'use strict';

  Backbone = Backbone && Backbone.hasOwnProperty('default') ? Backbone['default'] : Backbone;
  _ = _ && _.hasOwnProperty('default') ? _['default'] : _;
  Radio = Radio && Radio.hasOwnProperty('default') ? Radio['default'] : Radio;

  var version = "4.1.2";

  //Internal utility for creating context style global utils
  var proxy = function proxy(method) {
    return function (context) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return method.apply(context, args);
    };
  };

  // Marionette.extend

  var extend = Backbone.Model.extend;

  // ----------------------
  // Pass in a mapping of events => functions or function names
  // and return a mapping of events => functions

  var normalizeMethods = function normalizeMethods(hash) {
    var _this = this;

    if (!hash) {
      return;
    }

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

  // Error
  var errorProps = ['description', 'fileName', 'lineNumber', 'name', 'message', 'number', 'url'];
  var MarionetteError = extend.call(Error, {
    urlRoot: "http://marionettejs.com/docs/v".concat(version, "/"),
    url: '',
    constructor: function constructor(options) {
      var error = Error.call(this, options.message);

      _.extend(this, _.pick(error, errorProps), _.pick(options, errorProps));

      if (Error.captureStackTrace) {
        this.captureStackTrace();
      }

      this.url = this.urlRoot + this.url;
    },
    captureStackTrace: function captureStackTrace() {
      Error.captureStackTrace(this, MarionetteError);
    },
    toString: function toString() {
      return "".concat(this.name, ": ").concat(this.message, " See: ").concat(this.url);
    }
  });

  // Bind Entity Events & Unbind Entity Events

  function normalizeBindings(context, bindings) {
    if (!_.isObject(bindings)) {
      throw new MarionetteError({
        message: 'Bindings must be an object.',
        url: 'common.html#bindevents'
      });
    }

    return normalizeMethods.call(context, bindings);
  }

  function bindEvents(entity, bindings) {
    if (!entity || !bindings) {
      return this;
    }

    this.listenTo(entity, normalizeBindings(this, bindings));
    return this;
  }

  function unbindEvents(entity, bindings) {
    if (!entity) {
      return this;
    }

    if (!bindings) {
      this.stopListening(entity);
      return this;
    }

    this.stopListening(entity, normalizeBindings(this, bindings));
    return this;
  } // Export Public API

  // Bind/Unbind Radio Requests

  function normalizeBindings$1(context, bindings) {
    if (!_.isObject(bindings)) {
      throw new MarionetteError({
        message: 'Bindings must be an object.',
        url: 'common.html#bindrequests'
      });
    }

    return normalizeMethods.call(context, bindings);
  }

  function bindRequests(channel, bindings) {
    if (!channel || !bindings) {
      return this;
    }

    channel.reply(normalizeBindings$1(this, bindings), this);
    return this;
  }

  function unbindRequests(channel, bindings) {
    if (!channel) {
      return this;
    }

    if (!bindings) {
      channel.stopReplying(null, null, this);
      return this;
    }

    channel.stopReplying(normalizeBindings$1(this, bindings));
    return this;
  }

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

  // DOM Refresh

  function triggerMethodChildren(view, event, shouldTrigger) {
    if (!view._getImmediateChildren) {
      return;
    }

    _.each(view._getImmediateChildren(), function (child) {
      if (!shouldTrigger(child)) {
        return;
      }

      child.triggerMethod(event, child);
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
    view._isAttached = false;
    return true;
  }

  function triggerDOMRefresh(view) {
    if (view._isAttached && view._isRendered) {
      view.triggerMethod('dom:refresh', view);
    }
  }

  function triggerDOMRemove(view) {
    if (view._isAttached && view._isRendered) {
      view.triggerMethod('dom:remove', view);
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
  } // Monitor a view's state, propagating attach/detach events to children and firing dom:refresh
  // whenever a rendered view is attached or an attached view is rendered.


  function monitorViewEvents(view) {
    if (view._areViewEventsMonitored || view.monitorViewEvents === false) {
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

  // Trigger Method

  var splitter = /(^|:)(\w)/gi; // Only calc getOnMethodName once

  var methodCache = {}; // take the event section ("section1:section2:section3")
  // and turn it in to uppercase name onSection1Section2Section3

  function getEventName(match, prefix, eventName) {
    return eventName.toUpperCase();
  }

  var getOnMethodName = function getOnMethodName(event) {
    if (!methodCache[event]) {
      methodCache[event] = 'on' + event.replace(splitter, getEventName);
    }

    return methodCache[event];
  }; // Trigger an event and/or a corresponding method name. Examples:
  //
  // `this.triggerMethod("foo")` will trigger the "foo" event and
  // call the "onFoo" method.
  //
  // `this.triggerMethod("foo:bar")` will trigger the "foo:bar" event and
  // call the "onFooBar" method.


  function triggerMethod(event) {
    // get the method name from the event name
    var methodName = getOnMethodName(event);
    var method = getOption.call(this, methodName);
    var result; // call the onMethodName if it exists

    if (_.isFunction(method)) {
      // pass all args, except the event name
      result = method.apply(this, _.drop(arguments));
    } // trigger the event


    this.trigger.apply(this, arguments);
    return result;
  }

  var Events = {
    triggerMethod: triggerMethod
  };

  var CommonMixin = {
    // Imports the "normalizeMethods" to transform hashes of
    // events=>function references/names to a hash of events=>function references
    normalizeMethods: normalizeMethods,
    _setOptions: function _setOptions(options, classOptions) {
      this.options = _.extend({}, _.result(this, 'options'), options);
      this.mergeOptions(options, classOptions);
    },
    // A handy way to merge passed-in options onto the instance
    mergeOptions: mergeOptions,
    // Enable getting options from this or this.options by name.
    getOption: getOption,
    // Enable binding view's events from another entity.
    bindEvents: bindEvents,
    // Enable unbinding view's events from another entity.
    unbindEvents: unbindEvents,
    // Enable binding view's requests.
    bindRequests: bindRequests,
    // Enable unbinding view's requests.
    unbindRequests: unbindRequests,
    triggerMethod: triggerMethod
  };

  _.extend(CommonMixin, Backbone.Events);

  var DestroyMixin = {
    _isDestroyed: false,
    isDestroyed: function isDestroyed() {
      return this._isDestroyed;
    },
    destroy: function destroy(options) {
      if (this._isDestroyed) {
        return this;
      }

      this.triggerMethod('before:destroy', this, options);
      this._isDestroyed = true;
      this.triggerMethod('destroy', this, options);
      this.stopListening();
      return this;
    }
  };

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
          message: 'The dependency "backbone.radio" is missing.',
          url: 'backbone.radio.html#marionette-integration'
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
    }
  };

  // Object
  var ClassOptions = ['channelName', 'radioEvents', 'radioRequests']; // Object borrows many conventions and utilities from Backbone.

  var MarionetteObject = function MarionetteObject(options) {
    this._setOptions(options, ClassOptions);

    this.cid = _.uniqueId(this.cidPrefix);

    this._initRadio();

    this.initialize.apply(this, arguments);
  };

  MarionetteObject.extend = extend; // Object Methods
  // --------------

  _.extend(MarionetteObject.prototype, CommonMixin, DestroyMixin, RadioMixin, {
    cidPrefix: 'mno',
    // This is a noop method intended to be overridden
    initialize: function initialize() {}
  });

  // Implementation of the invoke method (http://underscorejs.org/#invoke) with support for
  var _invoke = _.invokeMap || _.invoke;

  // - behaviors
  // Takes care of getting the behavior class
  // given options and a key.
  // If a user passes in options.behaviorClass
  // default to using that.
  // If a user passes in a Behavior Class directly, use that
  // Otherwise an error is thrown

  function getBehaviorClass(options) {
    if (options.behaviorClass) {
      return {
        BehaviorClass: options.behaviorClass,
        options: options
      };
    } //treat functions as a Behavior constructor


    if (_.isFunction(options)) {
      return {
        BehaviorClass: options,
        options: {}
      };
    }

    throw new MarionetteError({
      message: 'Unable to get behavior class. A Behavior constructor should be passed directly or as behaviorClass property of options',
      url: 'marionette.behavior.html#defining-and-attaching-behaviors'
    });
  } // Iterate over the behaviors object, for each behavior
  // instantiate it and get its grouped behaviors.
  // This accepts a list of behaviors in either an object or array form


  function parseBehaviors(view, behaviors, allBehaviors) {
    return _.reduce(behaviors, function (reducedBehaviors, behaviorDefiniton) {
      var _getBehaviorClass = getBehaviorClass(behaviorDefiniton),
          BehaviorClass = _getBehaviorClass.BehaviorClass,
          options = _getBehaviorClass.options;

      var behavior = new BehaviorClass(options, view);
      reducedBehaviors.push(behavior);
      return parseBehaviors(view, _.result(behavior, 'behaviors'), reducedBehaviors);
    }, allBehaviors);
  }

  var BehaviorsMixin = {
    _initBehaviors: function _initBehaviors() {
      this._behaviors = parseBehaviors(this, _.result(this, 'behaviors'), []);
    },
    _getBehaviorTriggers: function _getBehaviorTriggers() {
      var triggers = _invoke(this._behaviors, '_getTriggers');

      return _.reduce(triggers, function (memo, _triggers) {
        return _.extend(memo, _triggers);
      }, {});
    },
    _getBehaviorEvents: function _getBehaviorEvents() {
      var events = _invoke(this._behaviors, '_getEvents');

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
    _destroyBehaviors: function _destroyBehaviors(options) {
      // Call destroy on each behavior after
      // destroying the view.
      // This unbinds event listeners
      // that behaviors have registered for.
      _invoke(this._behaviors, 'destroy', options);
    },
    // Remove a behavior
    _removeBehavior: function _removeBehavior(behavior) {
      // Don't worry about the clean up if the view is destroyed
      if (this._isDestroyed) {
        return;
      } // Remove behavior-only triggers and events


      this.undelegate(".trig".concat(behavior.cid, " .").concat(behavior.cid));
      this._behaviors = _.without(this._behaviors, behavior);
    },
    _bindBehaviorUIElements: function _bindBehaviorUIElements() {
      _invoke(this._behaviors, 'bindUIElements');
    },
    _unbindBehaviorUIElements: function _unbindBehaviorUIElements() {
      _invoke(this._behaviors, 'unbindUIElements');
    },
    _triggerEventOnBehaviors: function _triggerEventOnBehaviors(eventName, view, options) {
      _invoke(this._behaviors, 'triggerMethod', eventName, view, options);
    }
  };

  // - collectionEvents
  // - modelEvents

  var DelegateEntityEventsMixin = {
    // Handle `modelEvents`, and `collectionEvents` configuration
    _delegateEntityEvents: function _delegateEntityEvents(model, collection) {
      if (model) {
        this._modelEvents = _.result(this, 'modelEvents');
        this.bindEvents(model, this._modelEvents);
      }

      if (collection) {
        this._collectionEvents = _.result(this, 'collectionEvents');
        this.bindEvents(collection, this._collectionEvents);
      }
    },
    // Remove any previously delegate entity events
    _undelegateEntityEvents: function _undelegateEntityEvents(model, collection) {
      if (this._modelEvents) {
        this.unbindEvents(model, this._modelEvents);
        delete this._modelEvents;
      }

      if (this._collectionEvents) {
        this.unbindEvents(collection, this._collectionEvents);
        delete this._collectionEvents;
      }
    },
    // Remove cached event handlers
    _deleteEntityEventHandlers: function _deleteEntityEventHandlers() {
      delete this._modelEvents;
      delete this._collectionEvents;
    }
  };

  // - template
  // - templateContext

  var TemplateRenderMixin = {
    // Internal method to render the template with the serialized data
    // and template context
    _renderTemplate: function _renderTemplate(template) {
      // Add in entity data and template context
      var data = this.mixinTemplateContext(this.serializeData()) || {}; // Render and add to el

      var html = this._renderHtml(template, data);

      if (typeof html !== 'undefined') {
        this.attachElContent(html);
      }
    },
    // Get the template for this view instance.
    // You can set a `template` attribute in the view definition
    // or pass a `template: TemplateFunction` parameter in
    // to the constructor options.
    getTemplate: function getTemplate() {
      return this.template;
    },
    // Mix in template context methods. Looks for a
    // `templateContext` attribute, which can either be an
    // object literal, or a function that returns an object
    // literal. All methods and attributes from this object
    // are copies to the object passed in.
    mixinTemplateContext: function mixinTemplateContext(serializedData) {
      var templateContext = _.result(this, 'templateContext');

      if (!templateContext) {
        return serializedData;
      }

      if (!serializedData) {
        return templateContext;
      }

      return _.extend({}, serializedData, templateContext);
    },
    // Serialize the view's model *or* collection, if
    // it exists, for the template
    serializeData: function serializeData() {
      // If we have a model, we serialize that
      if (this.model) {
        return this.serializeModel();
      } // Otherwise, we serialize the collection,
      // making it available under the `items` property


      if (this.collection) {
        return {
          items: this.serializeCollection()
        };
      }
    },
    // Prepares the special `model` property of a view
    // for being displayed in the template. Override this if
    // you need a custom transformation for your view's model
    serializeModel: function serializeModel() {
      return this.model.attributes;
    },
    // Serialize a collection
    serializeCollection: function serializeCollection() {
      return _.map(this.collection.models, function (model) {
        return model.attributes;
      });
    },
    // Renders the data into the template
    _renderHtml: function _renderHtml(template, data) {
      return template(data);
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
    // }
    // ```
    attachElContent: function attachElContent(html) {
      this.Dom.setContents(this.el, html, this.$el);
    }
  };

  // Borrow event splitter from Backbone
  var delegateEventSplitter = /^(\S+)\s*(.*)$/; // Set event name to be namespaced using a unique index
  // to generate a non colliding event namespace
  // http://api.jquery.com/event.namespace/

  var getNamespacedEventName = function getNamespacedEventName(eventName, namespace) {
    var match = eventName.match(delegateEventSplitter);
    return "".concat(match[1], ".").concat(namespace, " ").concat(match[2]);
  };

  // Add Feature flags here
  // e.g. 'class' => false
  var FEATURES = {
    childViewEventPrefix: false,
    triggersStopPropagation: true,
    triggersPreventDefault: true,
    DEV_MODE: false
  };

  function isEnabled(name) {
    return !!FEATURES[name];
  }

  function setEnabled(name, state) {
    return FEATURES[name] = state;
  }

  // 'click:foo'

  function buildViewTrigger(view, triggerDef) {
    if (_.isString(triggerDef)) {
      triggerDef = {
        event: triggerDef
      };
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

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      view.triggerMethod.apply(view, [eventName, view, event].concat(args));
    };
  }

  var TriggersMixin = {
    // Configure `triggers` to forward DOM events to view
    // events. `triggers: {"click .foo": "do:foo"}`
    _getViewTriggers: function _getViewTriggers(view, triggers) {
      var _this = this;

      // Configure the triggers, prevent default
      // action and stop propagation of DOM events
      return _.reduce(triggers, function (events, value, key) {
        key = getNamespacedEventName(key, "trig".concat(_this.cid));
        events[key] = buildViewTrigger(view, value);
        return events;
      }, {});
    }
  };

  // a given key for triggers and events
  // swaps the @ui with the associated selector.
  // Returns a new, non-mutated, parsed events hash.

  var _normalizeUIKeys = function normalizeUIKeys(hash, ui) {
    return _.reduce(hash, function (memo, val, key) {
      var normalizedKey = _normalizeUIString(key, ui);

      memo[normalizedKey] = val;
      return memo;
    }, {});
  };

  var uiRegEx = /@ui\.[a-zA-Z-_$0-9]*/g; // utility method for parsing @ui. syntax strings
  // into associated selector

  var _normalizeUIString = function normalizeUIString(uiString, ui) {
    return uiString.replace(uiRegEx, function (r) {
      return ui[r.slice(4)];
    });
  }; // allows for the use of the @ui. syntax within
  // a given value for regions
  // swaps the @ui with the associated selector


  var _normalizeUIValues = function normalizeUIValues(hash, ui, property) {
    _.each(hash, function (val, key) {
      if (_.isString(val)) {
        hash[key] = _normalizeUIString(val, ui);
      } else if (val) {
        var propertyVal = val[property];

        if (_.isString(propertyVal)) {
          val[property] = _normalizeUIString(propertyVal, ui);
        }
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
    normalizeUIValues: function normalizeUIValues(hash, property) {
      var uiBindings = this._getUIBindings();

      return _normalizeUIValues(hash, uiBindings, property);
    },
    _getUIBindings: function _getUIBindings() {
      var uiBindings = _.result(this, '_uiBindings');

      return uiBindings || _.result(this, 'ui');
    },
    // This method binds the elements specified in the "ui" hash inside the view's code with
    // the associated jQuery selectors.
    _bindUIElements: function _bindUIElements() {
      var _this = this;

      if (!this.ui) {
        return;
      } // store the ui hash in _uiBindings so they can be reset later
      // and so re-rendering the view will be able to find the bindings


      if (!this._uiBindings) {
        this._uiBindings = this.ui;
      } // get the bindings result, as a function or otherwise


      var bindings = _.result(this, '_uiBindings'); // empty the ui so we don't have anything to start with


      this._ui = {}; // bind each of the selectors

      _.each(bindings, function (selector, key) {
        _this._ui[key] = _this.$(selector);
      });

      this.ui = this._ui;
    },
    _unbindUIElements: function _unbindUIElements() {
      var _this2 = this;

      if (!this.ui || !this._uiBindings) {
        return;
      } // delete all of the existing ui bindings


      _.each(this.ui, function ($el, name) {
        delete _this2.ui[name];
      }); // reset the ui element to the original bindings configuration


      this.ui = this._uiBindings;
      delete this._uiBindings;
      delete this._ui;
    },
    _getUI: function _getUI(name) {
      return this._ui[name];
    }
  };

  // DomApi

  function _getEl(el) {
    return el instanceof Backbone.$ ? el : Backbone.$(el);
  } // Static setter


  function setDomApi(mixin) {
    this.prototype.Dom = _.extend({}, this.prototype.Dom, mixin);
    return this;
  }
  var DomApi = {
    // Returns a new HTML DOM node instance
    createBuffer: function createBuffer() {
      return document.createDocumentFragment();
    },
    // Returns the document element for a given DOM element
    getDocumentEl: function getDocumentEl(el) {
      return el.ownerDocument.documentElement;
    },
    // Lookup the `selector` string
    // Selector may also be a DOM element
    // Returns an array-like object of nodes
    getEl: function getEl(selector) {
      return _getEl(selector);
    },
    // Finds the `selector` string with the el
    // Returns an array-like object of nodes
    findEl: function findEl(el, selector) {
      return _getEl(el).find(selector);
    },
    // Returns true if the el contains the node childEl
    hasEl: function hasEl(el, childEl) {
      return el.contains(childEl && childEl.parentNode);
    },
    // Detach `el` from the DOM without removing listeners
    detachEl: function detachEl(el) {
      var _$el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _getEl(el);

      _$el.detach();
    },
    // Remove `oldEl` from the DOM and put `newEl` in its place
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
    // Swaps the location of `el1` and `el2` in the DOM
    swapEl: function swapEl(el1, el2) {
      if (el1 === el2) {
        return;
      }

      var parent1 = el1.parentNode;
      var parent2 = el2.parentNode;

      if (!parent1 || !parent2) {
        return;
      }

      var next1 = el1.nextSibling;
      var next2 = el2.nextSibling;
      parent1.insertBefore(el2, next1);
      parent2.insertBefore(el1, next2);
    },
    // Replace the contents of `el` with the HTML string of `html`
    setContents: function setContents(el, html) {
      var _$el = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _getEl(el);

      _$el.html(html);
    },
    // Takes the DOM node `el` and appends the DOM node `contents`
    // to the end of the element's contents.
    appendContents: function appendContents(el, contents) {
      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref$_$el = _ref._$el,
          _$el = _ref$_$el === void 0 ? _getEl(el) : _ref$_$el,
          _ref$_$contents = _ref._$contents,
          _$contents = _ref$_$contents === void 0 ? _getEl(contents) : _ref$_$contents;

      _$el.append(_$contents);
    },
    // Does the el have child nodes
    hasContents: function hasContents(el) {
      return !!el && el.hasChildNodes();
    },
    // Remove the inner contents of `el` from the DOM while leaving
    // `el` itself in the DOM.
    detachContents: function detachContents(el) {
      var _$el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _getEl(el);

      _$el.contents().detach();
    }
  };

  // ViewMixin
  // - behaviors
  // - childViewEventPrefix
  // - childViewEvents
  // - childViewTriggers
  // - collectionEvents
  // - modelEvents
  // - triggers
  // - ui

  var ViewMixin = {
    Dom: DomApi,
    _isElAttached: function _isElAttached() {
      return !!this.el && this.Dom.hasEl(this.Dom.getDocumentEl(this.el), this.el);
    },
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
    delegateEvents: function delegateEvents(events) {
      this._proxyBehaviorViewProperties();

      this._buildEventProxies();

      var combinedEvents = _.extend({}, this._getBehaviorEvents(), this._getEvents(events), this._getBehaviorTriggers(), this._getTriggers());

      Backbone.View.prototype.delegateEvents.call(this, combinedEvents);
      return this;
    },
    // Allows Backbone.View events to utilize `@ui.` selectors
    _getEvents: function _getEvents(events) {
      if (events) {
        return this.normalizeUIKeys(events);
      }

      if (!this.events) {
        return;
      }

      return this.normalizeUIKeys(_.result(this, 'events'));
    },
    // Configure `triggers` to forward DOM events to view
    // events. `triggers: {"click .foo": "do:foo"}`
    _getTriggers: function _getTriggers() {
      if (!this.triggers) {
        return;
      } // Allow `triggers` to be configured as a function


      var triggers = this.normalizeUIKeys(_.result(this, 'triggers')); // Configure the triggers, prevent default
      // action and stop propagation of DOM events

      return this._getViewTriggers(this, triggers);
    },
    // Handle `modelEvents`, and `collectionEvents` configuration
    delegateEntityEvents: function delegateEntityEvents() {
      this._delegateEntityEvents(this.model, this.collection); // bind each behaviors model and collection events


      this._delegateBehaviorEntityEvents();

      return this;
    },
    // Handle unbinding `modelEvents`, and `collectionEvents` configuration
    undelegateEntityEvents: function undelegateEntityEvents() {
      this._undelegateEntityEvents(this.model, this.collection); // unbind each behaviors model and collection events


      this._undelegateBehaviorEntityEvents();

      return this;
    },
    // Handle destroying the view and its children.
    destroy: function destroy(options) {
      if (this._isDestroyed || this._isDestroying) {
        return this;
      }

      this._isDestroying = true;
      var shouldTriggerDetach = this._isAttached && !this._disableDetachEvents;
      this.triggerMethod('before:destroy', this, options);

      if (shouldTriggerDetach) {
        this.triggerMethod('before:detach', this);
      } // unbind UI elements


      this.unbindUIElements(); // remove the view from the DOM

      this._removeElement();

      if (shouldTriggerDetach) {
        this._isAttached = false;
        this.triggerMethod('detach', this);
      } // remove children after the remove to prevent extra paints


      this._removeChildren();

      this._isDestroyed = true;
      this._isRendered = false; // Destroy behaviors after _isDestroyed flag

      this._destroyBehaviors(options);

      this._deleteEntityEventHandlers();

      this.triggerMethod('destroy', this, options);

      this._triggerEventOnBehaviors('destroy', this, options);

      this.stopListening();
      return this;
    },
    // Equates to this.$el.remove
    _removeElement: function _removeElement() {
      this.$el.off().removeData();
      this.Dom.detachEl(this.el, this.$el);
    },
    // This method binds the elements specified in the "ui" hash
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
    // Cache `childViewEvents` and `childViewTriggers`
    _buildEventProxies: function _buildEventProxies() {
      this._childViewEvents = this.normalizeMethods(_.result(this, 'childViewEvents'));
      this._childViewTriggers = _.result(this, 'childViewTriggers');
      this._eventPrefix = this._getEventPrefix();
    },
    _getEventPrefix: function _getEventPrefix() {
      var defaultPrefix = isEnabled('childViewEventPrefix') ? 'childview' : false;

      var prefix = _.result(this, 'childViewEventPrefix', defaultPrefix);

      return prefix === false ? prefix : prefix + ':';
    },
    _proxyChildViewEvents: function _proxyChildViewEvents(view) {
      if (this._childViewEvents || this._childViewTriggers || this._eventPrefix) {
        this.listenTo(view, 'all', this._childViewEventHandler);
      }
    },
    _childViewEventHandler: function _childViewEventHandler(eventName) {
      var childViewEvents = this._childViewEvents; // call collectionView childViewEvent if defined

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (childViewEvents && childViewEvents[eventName]) {
        childViewEvents[eventName].apply(this, args);
      } // use the parent view's proxyEvent handlers


      var childViewTriggers = this._childViewTriggers; // Call the event with the proxy name on the parent layout

      if (childViewTriggers && childViewTriggers[eventName]) {
        this.triggerMethod.apply(this, [childViewTriggers[eventName]].concat(args));
      }

      if (this._eventPrefix) {
        this.triggerMethod.apply(this, [this._eventPrefix + eventName].concat(args));
      }
    }
  };

  _.extend(ViewMixin, BehaviorsMixin, CommonMixin, DelegateEntityEventsMixin, TemplateRenderMixin, TriggersMixin, UIMixin);

  function renderView(view) {
    if (view._isRendered) {
      return;
    }

    if (!view.supportsRenderLifecycle) {
      view.triggerMethod('before:render', view);
    }

    view.render();
    view._isRendered = true;

    if (!view.supportsRenderLifecycle) {
      view.triggerMethod('render', view);
    }
  }
  function destroyView(view, disableDetachEvents) {
    if (view.destroy) {
      // Attach flag for public destroy function internal check
      view._disableDetachEvents = disableDetachEvents;
      view.destroy();
      return;
    } // Destroy for non-Marionette Views


    if (!view.supportsDestroyLifecycle) {
      view.triggerMethod('before:destroy', view);
    }

    var shouldTriggerDetach = view._isAttached && !disableDetachEvents;

    if (shouldTriggerDetach) {
      view.triggerMethod('before:detach', view);
    }

    view.remove();

    if (shouldTriggerDetach) {
      view._isAttached = false;
      view.triggerMethod('detach', view);
    }

    view._isDestroyed = true;

    if (!view.supportsDestroyLifecycle) {
      view.triggerMethod('destroy', view);
    }
  }

  // Region
  var classErrorName = 'RegionError';
  var ClassOptions$1 = ['allowMissingEl', 'parentEl', 'replaceElement'];

  var Region = function Region(options) {
    this._setOptions(options, ClassOptions$1);

    this.cid = _.uniqueId(this.cidPrefix); // getOption necessary because options.el may be passed as undefined

    this._initEl = this.el = this.getOption('el'); // Handle when this.el is passed in as a $ wrapped element.

    this.el = this.el instanceof Backbone.$ ? this.el[0] : this.el;
    this.$el = this._getEl(this.el);
    this.initialize.apply(this, arguments);
  };

  Region.extend = extend;
  Region.setDomApi = setDomApi; // Region Methods
  // --------------

  _.extend(Region.prototype, CommonMixin, {
    Dom: DomApi,
    cidPrefix: 'mnr',
    replaceElement: false,
    _isReplaced: false,
    _isSwappingView: false,
    // This is a noop method intended to be overridden
    initialize: function initialize() {},
    // Displays a view instance inside of the region. If necessary handles calling the `render`
    // method for you. Reads content directly from the `el` attribute.
    show: function show(view, options) {
      if (!this._ensureElement(options)) {
        return;
      }

      view = this._getView(view, options);

      if (view === this.currentView) {
        return this;
      }

      if (view._isShown) {
        throw new MarionetteError({
          name: classErrorName,
          message: 'View is already shown in a Region or CollectionView',
          url: 'marionette.region.html#showing-a-view'
        });
      }

      this._isSwappingView = !!this.currentView;
      this.triggerMethod('before:show', this, view, options); // Assume an attached view is already in the region for pre-existing DOM

      if (this.currentView || !view._isAttached) {
        this.empty(options);
      }

      this._setupChildView(view);

      this.currentView = view;
      renderView(view);

      this._attachView(view, options);

      this.triggerMethod('show', this, view, options);
      this._isSwappingView = false;
      return this;
    },
    _getEl: function _getEl(el) {
      if (!el) {
        throw new MarionetteError({
          name: classErrorName,
          message: 'An "el" must be specified for a region.',
          url: 'marionette.region.html#additional-options'
        });
      }

      return this.getEl(el);
    },
    _setEl: function _setEl() {
      this.$el = this._getEl(this.el);

      if (this.$el.length) {
        this.el = this.$el[0];
      } // Make sure the $el contains only the el


      if (this.$el.length > 1) {
        this.$el = this.Dom.getEl(this.el);
      }
    },
    // Set the `el` of the region and move any current view to the new `el`.
    _setElement: function _setElement(el) {
      if (el === this.el) {
        return this;
      }

      var shouldReplace = this._isReplaced;

      this._restoreEl();

      this.el = el;

      this._setEl();

      if (this.currentView) {
        var view = this.currentView;

        if (shouldReplace) {
          this._replaceEl(view);
        } else {
          this.attachHtml(view);
        }
      }

      return this;
    },
    _setupChildView: function _setupChildView(view) {
      monitorViewEvents(view);

      this._proxyChildViewEvents(view); // We need to listen for if a view is destroyed in a way other than through the region.
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
    // If the regions parent view is not monitoring its attach/detach events
    _shouldDisableMonitoring: function _shouldDisableMonitoring() {
      return this._parentView && this._parentView.monitorViewEvents === false;
    },
    _isElAttached: function _isElAttached() {
      return this.Dom.hasEl(this.Dom.getDocumentEl(this.el), this.el);
    },
    _attachView: function _attachView(view) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          replaceElement = _ref.replaceElement;

      var shouldTriggerAttach = !view._isAttached && this._isElAttached() && !this._shouldDisableMonitoring();
      var shouldReplaceEl = typeof replaceElement === 'undefined' ? !!_.result(this, 'replaceElement') : !!replaceElement;

      if (shouldTriggerAttach) {
        view.triggerMethod('before:attach', view);
      }

      if (shouldReplaceEl) {
        this._replaceEl(view);
      } else {
        this.attachHtml(view);
      }

      if (shouldTriggerAttach) {
        view._isAttached = true;
        view.triggerMethod('attach', view);
      } // Corresponds that view is shown in a marionette Region or CollectionView


      view._isShown = true;
    },
    _ensureElement: function _ensureElement() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!_.isObject(this.el)) {
        this._setEl();
      }

      if (!this.$el || this.$el.length === 0) {
        var allowMissingEl = typeof options.allowMissingEl === 'undefined' ? !!_.result(this, 'allowMissingEl') : !!options.allowMissingEl;

        if (allowMissingEl) {
          return false;
        } else {
          throw new MarionetteError({
            name: classErrorName,
            message: "An \"el\" must exist in DOM for this region ".concat(this.cid),
            url: 'marionette.region.html#additional-options'
          });
        }
      }

      return true;
    },
    _getView: function _getView(view) {
      if (!view) {
        throw new MarionetteError({
          name: classErrorName,
          message: 'The view passed is undefined and therefore invalid. You must pass a view instance to show.',
          url: 'marionette.region.html#showing-a-view'
        });
      }

      if (view._isDestroyed) {
        throw new MarionetteError({
          name: classErrorName,
          message: "View (cid: \"".concat(view.cid, "\") has already been destroyed and cannot be used."),
          url: 'marionette.region.html#showing-a-view'
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
        return {
          template: viewOptions
        };
      }

      if (_.isObject(viewOptions)) {
        return viewOptions;
      }

      var template = function template() {
        return viewOptions;
      };

      return {
        template: template
      };
    },
    // Override this method to change how the region finds the DOM element that it manages. Return
    // a jQuery selector object scoped to a provided parent el or the document if none exists.
    getEl: function getEl(el) {
      var context = _.result(this, 'parentEl');

      if (context && _.isString(el)) {
        return this.Dom.findEl(context, el);
      }

      return this.Dom.getEl(el);
    },
    _replaceEl: function _replaceEl(view) {
      // Always restore the el to ensure the regions el is present before replacing
      this._restoreEl();

      view.on('before:destroy', this._restoreEl, this);
      this.Dom.replaceEl(view.el, this.el);
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
      this.Dom.appendContents(this.el, view.el, {
        _$el: this.$el,
        _$contents: view.$el
      });
    },
    // Destroy the current view, if there is one. If there is no current view,
    // it will detach any html inside the region's `el`.
    empty: function empty() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        allowMissingEl: true
      };
      var view = this.currentView; // If there is no view in the region we should only detach current html

      if (!view) {
        if (this._ensureElement(options)) {
          this.detachHtml();
        }

        return this;
      }

      this._empty(view, true);

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

        view._isShown = false;

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
    // Non-Marionette safe view.destroy
    destroyView: function destroyView$1(view) {
      if (view._isDestroyed) {
        return view;
      }

      destroyView(view, this._shouldDisableMonitoring());

      return view;
    },
    // Override this method to determine what happens when the view
    // is removed from the region when the view is not being detached
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
      var shouldTriggerDetach = view._isAttached && !this._shouldDisableMonitoring();
      var shouldRestoreEl = this._isReplaced;

      if (shouldTriggerDetach) {
        view.triggerMethod('before:detach', view);
      }

      if (shouldRestoreEl) {
        this.Dom.replaceEl(this.el, view.el);
      } else {
        this.detachHtml();
      }

      if (shouldTriggerDetach) {
        view._isAttached = false;
        view.triggerMethod('detach', view);
      }
    },
    // Override this method to change how the region detaches current content
    detachHtml: function detachHtml() {
      this.Dom.detachContents(this.el, this.$el);
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
      this.el = this._initEl;
      delete this.$el;
      return this;
    },
    _isDestroyed: false,
    isDestroyed: function isDestroyed() {
      return this._isDestroyed;
    },
    // Destroy the region, remove any child view
    // and remove the region from any associated view
    destroy: function destroy(options) {
      if (this._isDestroyed) {
        return this;
      }

      this.triggerMethod('before:destroy', this, options);
      this._isDestroyed = true;
      this.reset(options);

      if (this._name) {
        this._parentView._removeReferences(this._name);
      }

      delete this._parentView;
      delete this._name;
      this.triggerMethod('destroy', this, options);
      this.stopListening();
      return this;
    }
  });

  function buildRegion (definition, defaults) {
    if (definition instanceof Region) {
      return definition;
    }

    if (_.isString(definition)) {
      return buildRegionFromObject(defaults, {
        el: definition
      });
    }

    if (_.isFunction(definition)) {
      return buildRegionFromObject(defaults, {
        regionClass: definition
      });
    }

    if (_.isObject(definition)) {
      return buildRegionFromObject(defaults, definition);
    }

    throw new MarionetteError({
      message: 'Improper region configuration type.',
      url: 'marionette.region.html#defining-regions'
    });
  }

  function buildRegionFromObject(defaults, definition) {
    var options = _.extend({}, defaults, definition);

    var RegionClass = options.regionClass;
    delete options.regionClass;
    return new RegionClass(options);
  }

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
      } // Normalize region selectors hash to allow
      // a user to use the @ui. syntax.


      regions = this.normalizeUIValues(regions, 'el'); // Add the regions definitions to the regions property

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

      _.each(this._regions, this._removeRegion.bind(this));

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
    _getRegions: function _getRegions() {
      return _.clone(this._regions);
    },
    // Get all regions
    getRegions: function getRegions() {
      if (!this._isRendered) {
        this.render();
      }

      return this._getRegions();
    },
    showChildView: function showChildView(name, view, options) {
      var region = this.getRegion(name);
      region.show(view, options);
      return view;
    },
    detachChildView: function detachChildView(name) {
      return this.getRegion(name).detachView();
    },
    getChildView: function getChildView(name) {
      return this.getRegion(name).currentView;
    }
  };

  // Static setter for the renderer
  function setRenderer(renderer) {
    this.prototype._renderHtml = renderer;
    return this;
  }

  // View
  var ClassOptions$2 = ['behaviors', 'childViewEventPrefix', 'childViewEvents', 'childViewTriggers', 'collectionEvents', 'events', 'modelEvents', 'regionClass', 'regions', 'template', 'templateContext', 'triggers', 'ui']; // Used by _getImmediateChildren

  function childReducer(children, region) {
    if (region.currentView) {
      children.push(region.currentView);
    }

    return children;
  } // The standard view. Includes view events, automatic rendering
  // templates, nested views, and more.


  var View = Backbone.View.extend({
    constructor: function constructor(options) {
      this._setOptions(options, ClassOptions$2);

      monitorViewEvents(this);

      this._initBehaviors();

      this._initRegions();

      Backbone.View.prototype.constructor.apply(this, arguments);
      this.delegateEntityEvents();

      this._triggerEventOnBehaviors('initialize', this, options);
    },
    // Overriding Backbone.View's `setElement` to handle
    // if an el was previously defined. If so, the view might be
    // rendered or attached on setElement.
    setElement: function setElement() {
      Backbone.View.prototype.setElement.apply(this, arguments);
      this._isRendered = this.Dom.hasContents(this.el);
      this._isAttached = this._isElAttached();

      if (this._isRendered) {
        this.bindUIElements();
      }

      return this;
    },
    // If a template is available, renders it into the view's `el`
    // Re-inits regions and binds UI.
    render: function render() {
      var template = this.getTemplate();

      if (template === false || this._isDestroyed) {
        return this;
      }

      this.triggerMethod('before:render', this); // If this is not the first render call, then we need to
      // re-initialize the `el` for each region

      if (this._isRendered) {
        this._reInitRegions();
      }

      this._renderTemplate(template);

      this.bindUIElements();
      this._isRendered = true;
      this.triggerMethod('render', this);
      return this;
    },
    // called by ViewMixin destroy
    _removeChildren: function _removeChildren() {
      this.removeRegions();
    },
    _getImmediateChildren: function _getImmediateChildren() {
      return _.reduce(this._regions, childReducer, []);
    }
  }, {
    setRenderer: setRenderer,
    setDomApi: setDomApi
  });

  _.extend(View.prototype, ViewMixin, RegionsMixin);

  // shut down child views.

  var Container = function Container() {
    this._init();
  }; // Mix in methods from Underscore, for iteration, and other
  // collection related features.
  // Borrowing this code from Backbone.Collection:
  // https://github.com/jashkenas/backbone/blob/1.1.2/backbone.js#L962


  var methods = ['forEach', 'each', 'map', 'find', 'detect', 'filter', 'select', 'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke', 'toArray', 'first', 'initial', 'rest', 'last', 'without', 'isEmpty', 'pluck', 'reduce', 'partition'];

  _.each(methods, function (method) {
    Container.prototype[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _[method].apply(_, [this._views].concat(args));
    };
  });

  function stringComparator(comparator, view) {
    return view.model && view.model.get(comparator);
  } // Container Methods
  // -----------------


  _.extend(Container.prototype, {
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

      this._addViewIndexes(view); // add to end by default


      this._views.splice(index, 0, view);

      this._updateLength();
    },
    _addViewIndexes: function _addViewIndexes(view) {
      // store the view
      this._viewsByCid[view.cid] = view; // index it by model

      if (view.model) {
        this._indexByModel[view.model.cid] = view;
      }
    },
    // Sort (mutate) and return the array of the child views.
    _sort: function _sort(comparator, context) {
      if (typeof comparator === 'string') {
        comparator = _.partial(stringComparator, comparator);
        return this._sortBy(comparator);
      }

      if (comparator.length === 1) {
        return this._sortBy(comparator.bind(context));
      }

      return this._views.sort(comparator.bind(context));
    },
    // Makes `_.sortBy` mutate the array to match `this._views.sort`
    _sortBy: function _sortBy(comparator) {
      var sortedViews = _.sortBy(this._views, comparator);

      this._set(sortedViews);

      return sortedViews;
    },
    // Replace array contents without overwriting the reference.
    // Should not add/remove views
    _set: function _set(views, shouldReset) {
      this._views.length = 0;

      this._views.push.apply(this._views, views.slice(0));

      if (shouldReset) {
        this._viewsByCid = {};
        this._indexByModel = {};

        _.each(views, this._addViewIndexes.bind(this));

        this._updateLength();
      }
    },
    // Swap views by index
    _swap: function _swap(view1, view2) {
      var view1Index = this.findIndexByView(view1);
      var view2Index = this.findIndexByView(view2);

      if (view1Index === -1 || view2Index === -1) {
        return;
      }

      var swapView = this._views[view1Index];
      this._views[view1Index] = this._views[view2Index];
      this._views[view2Index] = swapView;
    },
    // Find a view by the model that was attached to it.
    // Uses the model's `cid` to find it.
    findByModel: function findByModel(model) {
      return this.findByModelCid(model.cid);
    },
    // Find a view by the `cid` of the model that was attached to it.
    findByModelCid: function findByModelCid(modelCid) {
      return this._indexByModel[modelCid];
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
    hasView: function hasView(view) {
      return !!this.findByCid(view.cid);
    },
    // Remove a view and clean up index references.
    _remove: function _remove(view) {
      if (!this._viewsByCid[view.cid]) {
        return;
      } // delete model index


      if (view.model) {
        delete this._indexByModel[view.model.cid];
      } // remove the view from the container


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

  // Collection View
  var classErrorName$1 = 'CollectionViewError';
  var ClassOptions$3 = ['behaviors', 'childView', 'childViewContainer', 'childViewEventPrefix', 'childViewEvents', 'childViewOptions', 'childViewTriggers', 'collectionEvents', 'emptyView', 'emptyViewOptions', 'events', 'modelEvents', 'sortWithCollection', 'template', 'templateContext', 'triggers', 'ui', 'viewComparator', 'viewFilter']; // A view that iterates over a Backbone.Collection
  // and renders an individual child view for each model.

  var CollectionView = Backbone.View.extend({
    // flag for maintaining the sorted order of the collection
    sortWithCollection: true,
    // constructor
    constructor: function constructor(options) {
      this._setOptions(options, ClassOptions$3);

      monitorViewEvents(this);

      this._initChildViewStorage();

      this._initBehaviors();

      Backbone.View.prototype.constructor.apply(this, arguments); // Init empty region

      this.getEmptyRegion();
      this.delegateEntityEvents();

      this._triggerEventOnBehaviors('initialize', this, options);
    },
    // Internal method to set up the `children` object for storing all of the child views
    // `_children` represents all child views
    // `children` represents only views filtered to be shown
    _initChildViewStorage: function _initChildViewStorage() {
      this._children = new Container();
      this.children = new Container();
    },
    // Create an region to show the emptyView
    getEmptyRegion: function getEmptyRegion() {
      var $emptyEl = this.$container || this.$el;

      if (this._emptyRegion && !this._emptyRegion.isDestroyed()) {
        this._emptyRegion._setElement($emptyEl[0]);

        return this._emptyRegion;
      }

      this._emptyRegion = new Region({
        el: $emptyEl[0],
        replaceElement: false
      });
      this._emptyRegion._parentView = this;
      return this._emptyRegion;
    },
    // Configured the initial events that the collection view binds to.
    _initialEvents: function _initialEvents() {
      if (this._isRendered) {
        return;
      }

      this.listenTo(this.collection, {
        'sort': this._onCollectionSort,
        'reset': this._onCollectionReset,
        'update': this._onCollectionUpdate
      });
    },
    // Internal method. This checks for any changes in the order of the collection.
    // If the index of any view doesn't match, it will re-sort.
    _onCollectionSort: function _onCollectionSort(collection, _ref) {
      var add = _ref.add,
          merge = _ref.merge,
          remove = _ref.remove;

      if (!this.sortWithCollection || this.viewComparator === false) {
        return;
      } // If the data is changing we will handle the sort later in `_onCollectionUpdate`


      if (add || remove || merge) {
        return;
      } // If the only thing happening here is sorting, sort.


      this.sort();
    },
    _onCollectionReset: function _onCollectionReset() {
      this._destroyChildren();

      this._addChildModels(this.collection.models);

      this.sort();
    },
    // Handle collection update model additions and  removals
    _onCollectionUpdate: function _onCollectionUpdate(collection, options) {
      var changes = options.changes; // Remove first since it'll be a shorter array lookup.

      var removedViews = changes.removed.length && this._removeChildModels(changes.removed);

      this._addedViews = changes.added.length && this._addChildModels(changes.added);

      this._detachChildren(removedViews);

      this.sort(); // Destroy removed child views after all of the render is complete

      this._removeChildViews(removedViews);
    },
    _removeChildModels: function _removeChildModels(models) {
      var _this = this;

      return _.reduce(models, function (views, model) {
        var removeView = _this._removeChildModel(model);

        if (removeView) {
          views.push(removeView);
        }

        return views;
      }, []);
    },
    _removeChildModel: function _removeChildModel(model) {
      var view = this._children.findByModel(model);

      if (view) {
        this._removeChild(view);
      }

      return view;
    },
    _removeChild: function _removeChild(view) {
      this.triggerMethod('before:remove:child', this, view);

      this.children._remove(view);

      this._children._remove(view);

      this.triggerMethod('remove:child', this, view);
    },
    // Added views are returned for consistency with _removeChildModels
    _addChildModels: function _addChildModels(models) {
      return _.map(models, this._addChildModel.bind(this));
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

      this._children._add(view, index);

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
          name: classErrorName$1,
          message: 'A "childView" must be specified',
          url: 'marionette.collectionview.html#collectionviews-childview'
        });
      }

      childView = this._getView(childView, child);

      if (!childView) {
        throw new MarionetteError({
          name: classErrorName$1,
          message: '"childView" must be a view class or a function that returns a view class',
          url: 'marionette.collectionview.html#collectionviews-childview'
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
      var options = _.extend({
        model: child
      }, childViewOptions);

      return new ChildViewClass(options);
    },
    _setupChildView: function _setupChildView(view) {
      monitorViewEvents(view); // We need to listen for if a view is destroyed in a way other
      // than through the CollectionView.
      // If this happens we need to remove the reference to the view
      // since once a view has been destroyed we can not reuse it.

      view.on('destroy', this.removeChildView, this); // set up the child view event forwarding

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
      Backbone.View.prototype.setElement.apply(this, arguments);
      this._isAttached = this._isElAttached();
      return this;
    },
    // Render children views.
    render: function render() {
      if (this._isDestroyed) {
        return this;
      }

      this.triggerMethod('before:render', this);

      this._destroyChildren();

      if (this.collection) {
        this._addChildModels(this.collection.models);

        this._initialEvents();
      }

      var template = this.getTemplate();

      if (template) {
        this._renderTemplate(template);

        this.bindUIElements();
      }

      this._getChildViewContainer();

      this.sort();
      this._isRendered = true;
      this.triggerMethod('render', this);
      return this;
    },
    // Get a container within the template to add the children within
    _getChildViewContainer: function _getChildViewContainer() {
      var childViewContainer = _.result(this, 'childViewContainer');

      this.$container = childViewContainer ? this.$(childViewContainer) : this.$el;

      if (!this.$container.length) {
        throw new MarionetteError({
          name: classErrorName$1,
          message: "The specified \"childViewContainer\" was not found: ".concat(childViewContainer),
          url: 'marionette.collectionview.html#defining-the-childviewcontainer'
        });
      }
    },
    // Sorts the children then filters and renders the results.
    sort: function sort() {
      this._sortChildren();

      this.filter();
      return this;
    },
    // Sorts views by viewComparator and sets the children to the new order
    _sortChildren: function _sortChildren() {
      if (!this._children.length) {
        return;
      }

      var viewComparator = this.getComparator();

      if (!viewComparator) {
        return;
      } // If children are sorted prevent added to end perf


      delete this._addedViews;
      this.triggerMethod('before:sort', this);

      this._children._sort(viewComparator, this);

      this.triggerMethod('sort', this);
    },
    // Sets the view's `viewComparator` and applies the sort if the view is ready.
    // To prevent the render pass `{ preventRender: true }` as the 2nd argument.
    setComparator: function setComparator(comparator) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          preventRender = _ref2.preventRender;

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
      if (this.viewComparator) {
        return this.viewComparator;
      }

      if (!this.sortWithCollection || this.viewComparator === false || !this.collection) {
        return false;
      }

      return this._viewComparator;
    },
    // Default internal view comparator that order the views by
    // the order of the collection
    _viewComparator: function _viewComparator(view) {
      return this.collection.indexOf(view.model);
    },
    // This method filters the children views and renders the results
    filter: function filter() {
      if (this._isDestroyed) {
        return this;
      }

      this._filterChildren();

      this._renderChildren();

      return this;
    },
    _filterChildren: function _filterChildren() {
      var _this2 = this;

      if (!this._children.length) {
        return;
      }

      var viewFilter = this._getFilter();

      if (!viewFilter) {
        var shouldReset = this.children.length !== this._children.length;

        this.children._set(this._children._views, shouldReset);

        return;
      } // If children are filtered prevent added to end perf


      delete this._addedViews;
      this.triggerMethod('before:filter', this);
      var attachViews = [];
      var detachViews = [];

      _.each(this._children._views, function (view, key, children) {
        (viewFilter.call(_this2, view, key, children) ? attachViews : detachViews).push(view);
      });

      this._detachChildren(detachViews); // reset children


      this.children._set(attachViews, true);

      this.triggerMethod('filter', this, attachViews, detachViews);
    },
    // This method returns a function for the viewFilter
    _getFilter: function _getFilter() {
      var viewFilter = this.getFilter();

      if (!viewFilter) {
        return false;
      }

      if (_.isFunction(viewFilter)) {
        return viewFilter;
      } // Support filter predicates `{ fooFlag: true }`


      if (_.isObject(viewFilter)) {
        var matcher = _.matches(viewFilter);

        return function (view) {
          return matcher(view.model && view.model.attributes);
        };
      } // Filter by model attribute


      if (_.isString(viewFilter)) {
        return function (view) {
          return view.model && view.model.get(viewFilter);
        };
      }

      throw new MarionetteError({
        name: classErrorName$1,
        message: '"viewFilter" must be a function, predicate object literal, a string indicating a model attribute, or falsy',
        url: 'marionette.collectionview.html#defining-the-viewfilter'
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
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          preventRender = _ref3.preventRender;

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
      _.each(detachingViews, this._detachChildView.bind(this));
    },
    _detachChildView: function _detachChildView(view) {
      var shouldTriggerDetach = view._isAttached && this.monitorViewEvents !== false;

      if (shouldTriggerDetach) {
        view.triggerMethod('before:detach', view);
      }

      this.detachHtml(view);

      if (shouldTriggerDetach) {
        view._isAttached = false;
        view.triggerMethod('detach', view);
      }

      view._isShown = false;
    },
    // Override this method to change how the collectionView detaches a child view
    detachHtml: function detachHtml(view) {
      this.Dom.detachEl(view.el, view.$el);
    },
    _renderChildren: function _renderChildren() {
      // If there are unrendered views prevent add to end perf
      if (this._hasUnrenderedViews) {
        delete this._addedViews;
        delete this._hasUnrenderedViews;
      }

      var views = this._addedViews || this.children._views;
      this.triggerMethod('before:render:children', this, views);

      if (this.isEmpty()) {
        this._showEmptyView();
      } else {
        this._destroyEmptyView();

        var els = this._getBuffer(views);

        this._attachChildren(els, views);
      }

      delete this._addedViews;
      this.triggerMethod('render:children', this, views);
    },
    // Renders each view and creates a fragment buffer from them
    _getBuffer: function _getBuffer(views) {
      var _this3 = this;

      var elBuffer = this.Dom.createBuffer();

      _.each(views, function (view) {
        renderView(view); // corresponds that view is shown in a Region or CollectionView

        view._isShown = true;

        _this3.Dom.appendContents(elBuffer, view.el, {
          _$contents: view.$el
        });
      });

      return elBuffer;
    },
    _attachChildren: function _attachChildren(els, views) {
      var shouldTriggerAttach = this._isAttached && this.monitorViewEvents !== false;
      views = shouldTriggerAttach ? views : [];

      _.each(views, function (view) {
        if (view._isAttached) {
          return;
        }

        view.triggerMethod('before:attach', view);
      });

      this.attachHtml(els, this.$container);

      _.each(views, function (view) {
        if (view._isAttached) {
          return;
        }

        view._isAttached = true;
        view.triggerMethod('attach', view);
      });
    },
    // Override this method to do something other than `.append`.
    // You can attach any HTML at this point including the els.
    attachHtml: function attachHtml(els, $container) {
      this.Dom.appendContents($container[0], els, {
        _$el: $container
      });
    },
    isEmpty: function isEmpty() {
      return !this.children.length;
    },
    _showEmptyView: function _showEmptyView() {
      var EmptyView = this._getEmptyView();

      if (!EmptyView) {
        return;
      }

      var options = this._getEmptyViewOptions();

      var emptyRegion = this.getEmptyRegion();
      emptyRegion.show(new EmptyView(options));
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
      var emptyRegion = this.getEmptyRegion(); // Only empty if a view is show so the region
      // doesn't detach any other unrelated HTML

      if (emptyRegion.hasView()) {
        emptyRegion.empty();
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
    swapChildViews: function swapChildViews(view1, view2) {
      if (!this._children.hasView(view1) || !this._children.hasView(view2)) {
        throw new MarionetteError({
          name: classErrorName$1,
          message: 'Both views must be children of the collection view to swap.',
          url: 'marionette.collectionview.html#swapping-child-views'
        });
      }

      this._children._swap(view1, view2);

      this.Dom.swapEl(view1.el, view2.el); // If the views are not filtered the same, refilter

      if (this.children.hasView(view1) !== this.children.hasView(view2)) {
        this.filter();
      } else {
        this.children._swap(view1, view2);
      }

      return this;
    },
    // Render the child's view and add it to the HTML for the collection view at a given index, based on the current sort
    addChildView: function addChildView(view, index) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (!view || view._isDestroyed) {
        return view;
      }

      if (view._isShown) {
        throw new MarionetteError({
          name: classErrorName$1,
          message: 'View is already shown in a Region or CollectionView',
          url: 'marionette.region.html#showing-a-view'
        });
      }

      if (_.isObject(index)) {
        options = index;
      } // If options has defined index we should use it


      if (options.index != null) {
        index = options.index;
      }

      if (!this._isRendered) {
        this.render();
      }

      this._addChild(view, index);

      if (options.preventRender) {
        this._hasUnrenderedViews = true;
        return view;
      }

      var hasIndex = typeof index !== 'undefined';
      var isAddedToEnd = !hasIndex || index >= this._children.length; // Only cache views if added to the end and there is no unrendered views

      if (isAddedToEnd && !this._hasUnrenderedViews) {
        this._addedViews = [view];
      }

      if (hasIndex) {
        this._renderChildren();
      } else {
        this.sort();
      }

      return view;
    },
    // Detach a view from the children.  Best used when adding a
    // childView from `addChildView`
    detachChildView: function detachChildView(view) {
      this.removeChildView(view, {
        shouldDetach: true
      });
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
      _.each(views, this._removeChildView.bind(this));
    },
    _removeChildView: function _removeChildView(view) {
      var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          shouldDetach = _ref4.shouldDetach;

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

      var shouldDisableEvents = this.monitorViewEvents === false;
      destroyView(view, shouldDisableEvents);
    },
    // called by ViewMixin destroy
    _removeChildren: function _removeChildren() {
      this._destroyChildren();

      var emptyRegion = this.getEmptyRegion();
      emptyRegion.destroy();
      delete this._addedViews;
    },
    // Destroy the child views that this collection view is holding on to, if any
    _destroyChildren: function _destroyChildren() {
      if (!this._children.length) {
        return;
      }

      this.triggerMethod('before:destroy:children', this);

      if (this.monitorViewEvents === false) {
        this.Dom.detachContents(this.el, this.$el);
      }

      this._removeChildViews(this._children._views); // After all children have been destroyed re-init the container


      this._children._init();

      this.children._init();

      this.triggerMethod('destroy:children', this);
    }
  }, {
    setDomApi: setDomApi,
    setRenderer: setRenderer
  });

  _.extend(CollectionView.prototype, ViewMixin);

  // Behavior
  var ClassOptions$4 = ['collectionEvents', 'events', 'modelEvents', 'triggers', 'ui'];

  var Behavior = function Behavior(options, view) {
    // Setup reference to the view.
    // this comes in handle when a behavior
    // wants to directly talk up the chain
    // to the view.
    this.view = view;

    this._setOptions(options, ClassOptions$4);

    this.cid = _.uniqueId(this.cidPrefix); // Construct an internal UI hash using the behaviors UI
    // hash combined and overridden by the view UI hash.
    // This allows the user to use UI hash elements defined
    // in the parent view as well as those defined in the behavior.
    // This order will help the reuse and share of a behavior
    // between multiple views, while letting a view override
    // a selector under an UI key.

    this.ui = _.extend({}, _.result(this, 'ui'), _.result(view, 'ui')); // Proxy view triggers

    this.listenTo(view, 'all', this.triggerMethod);
    this.initialize.apply(this, arguments);
  };

  Behavior.extend = extend; // Behavior Methods
  // --------------

  _.extend(Behavior.prototype, CommonMixin, DelegateEntityEventsMixin, TriggersMixin, UIMixin, {
    cidPrefix: 'mnb',
    // This is a noop method intended to be overridden
    initialize: function initialize() {},
    // proxy behavior $ method to the view
    // this is useful for doing jquery DOM lookups
    // scoped to behaviors view.
    $: function $() {
      return this.view.$.apply(this.view, arguments);
    },
    // Stops the behavior from listening to events.
    destroy: function destroy() {
      this.stopListening();

      this.view._removeBehavior(this);

      this._deleteEntityEventHandlers();

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
    _getEvents: function _getEvents() {
      var _this = this;

      if (!this.events) {
        return;
      } // Normalize behavior events hash to allow
      // a user to use the @ui. syntax.


      var behaviorEvents = this.normalizeUIKeys(_.result(this, 'events')); // binds the handler to the behavior and builds a unique eventName

      return _.reduce(behaviorEvents, function (events, behaviorHandler, key) {
        if (!_.isFunction(behaviorHandler)) {
          behaviorHandler = _this[behaviorHandler];
        }

        if (!behaviorHandler) {
          return events;
        }

        key = getNamespacedEventName(key, _this.cid);
        events[key] = behaviorHandler.bind(_this);
        return events;
      }, {});
    },
    // Internal method to build all trigger handlers for a given behavior
    _getTriggers: function _getTriggers() {
      if (!this.triggers) {
        return;
      } // Normalize behavior triggers hash to allow
      // a user to use the @ui. syntax.


      var behaviorTriggers = this.normalizeUIKeys(_.result(this, 'triggers'));
      return this._getViewTriggers(this.view, behaviorTriggers);
    }
  });

  // Application
  var ClassOptions$5 = ['channelName', 'radioEvents', 'radioRequests', 'region', 'regionClass'];

  var Application = function Application(options) {
    this._setOptions(options, ClassOptions$5);

    this.cid = _.uniqueId(this.cidPrefix);

    this._initRegion();

    this._initRadio();

    this.initialize.apply(this, arguments);
  };

  Application.extend = extend; // Application Methods
  // --------------

  _.extend(Application.prototype, CommonMixin, DestroyMixin, RadioMixin, {
    cidPrefix: 'mna',
    // This is a noop method intended to be overridden
    initialize: function initialize() {},
    // Kick off all of the application's processes.
    start: function start(options) {
      this.triggerMethod('before:start', this, options);
      this.triggerMethod('start', this, options);
      return this;
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

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      region.show.apply(region, [view].concat(args));
      return view;
    },
    getView: function getView() {
      return this.getRegion().currentView;
    }
  });

  var bindEvents$1 = proxy(bindEvents);
  var unbindEvents$1 = proxy(unbindEvents);
  var bindRequests$1 = proxy(bindRequests);
  var unbindRequests$1 = proxy(unbindRequests);
  var mergeOptions$1 = proxy(mergeOptions);
  var getOption$1 = proxy(getOption);
  var normalizeMethods$1 = proxy(normalizeMethods);
  var triggerMethod$1 = proxy(triggerMethod); // Configuration

  var setDomApi$1 = function setDomApi(mixin) {
    CollectionView.setDomApi(mixin);
    Region.setDomApi(mixin);
    View.setDomApi(mixin);
  };
  var setRenderer$1 = function setRenderer(renderer) {
    CollectionView.setRenderer(renderer);
    View.setRenderer(renderer);
  };
  var backbone_marionette = {
    View: View,
    CollectionView: CollectionView,
    MnObject: MarionetteObject,
    Object: MarionetteObject,
    Region: Region,
    Behavior: Behavior,
    Application: Application,
    isEnabled: isEnabled,
    setEnabled: setEnabled,
    monitorViewEvents: monitorViewEvents,
    Events: Events,
    extend: extend,
    DomApi: DomApi,
    VERSION: version
  };

  exports.Application = Application;
  exports.Behavior = Behavior;
  exports.CollectionView = CollectionView;
  exports.DomApi = DomApi;
  exports.Events = Events;
  exports.MnObject = MarionetteObject;
  exports.Region = Region;
  exports.VERSION = version;
  exports.View = View;
  exports.bindEvents = bindEvents$1;
  exports.bindRequests = bindRequests$1;
  exports.default = backbone_marionette;
  exports.extend = extend;
  exports.getOption = getOption$1;
  exports.isEnabled = isEnabled;
  exports.mergeOptions = mergeOptions$1;
  exports.monitorViewEvents = monitorViewEvents;
  exports.normalizeMethods = normalizeMethods$1;
  exports.setDomApi = setDomApi$1;
  exports.setEnabled = setEnabled;
  exports.setRenderer = setRenderer$1;
  exports.triggerMethod = triggerMethod$1;
  exports.unbindEvents = unbindEvents$1;
  exports.unbindRequests = unbindRequests$1;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
this && this.Marionette && (this.Mn = this.Marionette);
//# sourceMappingURL=backbone.marionette.js.map
