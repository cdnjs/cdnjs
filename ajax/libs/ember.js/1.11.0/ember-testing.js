/*!
 * @overview  Ember - JavaScript Application Framework
 * @copyright Copyright 2011-2015 Tilde Inc. and contributors
 *            Portions Copyright 2006-2011 Strobe Inc.
 *            Portions Copyright 2008-2011 Apple Inc. All rights reserved.
 * @license   Licensed under MIT license
 *            See https://raw.github.com/emberjs/ember.js/master/LICENSE
 * @version   1.11.0
 */

(function() {
var enifed, requireModule, eriuqer, requirejs, Ember;
var mainContext = this;

(function() {

  Ember = this.Ember = this.Ember || {};
  if (typeof Ember === 'undefined') { Ember = {}; };
  function UNDEFINED() { }

  if (typeof Ember.__loader === 'undefined') {
    var registry = {};
    var seen = {};

    enifed = function(name, deps, callback) {
      var value = { };

      if (!callback) {
        value.deps = [];
        value.callback = deps;
      } else {
        value.deps = deps;
        value.callback = callback;
      }

        registry[name] = value;
    };

    requirejs = eriuqer = requireModule = function(name) {
      var s = seen[name];

      if (s !== undefined) { return seen[name]; }
      if (s === UNDEFINED) { return undefined;  }

      seen[name] = {};

      if (!registry[name]) {
        throw new Error('Could not find module ' + name);
      }

      var mod = registry[name];
      var deps = mod.deps;
      var callback = mod.callback;
      var reified = [];
      var exports;
      var length = deps.length;

      for (var i=0; i<length; i++) {
        if (deps[i] === 'exports') {
          reified.push(exports = {});
        } else {
          reified.push(requireModule(resolve(deps[i], name)));
        }
      }

      var value = length === 0 ? callback.call(this) : callback.apply(this, reified);

      return seen[name] = exports || (value === undefined ? UNDEFINED : value);
    };

    function resolve(child, name) {
      if (child.charAt(0) !== '.') {
        return child;
      }
      var parts = child.split('/');
      var parentBase = name.split('/').slice(0, -1);

      for (var i=0, l=parts.length; i<l; i++) {
        var part = parts[i];

        if (part === '..') {
          parentBase.pop();
        } else if (part === '.') {
          continue;
        } else {
          parentBase.push(part);
        }
      }

      return parentBase.join('/');
    }

    requirejs._eak_seen = registry;

    Ember.__loader = {
      define: enifed,
      require: eriuqer,
      registry: registry
    };
  } else {
    enifed = Ember.__loader.define;
    requirejs = eriuqer = requireModule = Ember.__loader.require;
  }
})();

enifed('ember-debug', ['exports', 'ember-metal/core', 'ember-metal/error', 'ember-metal/logger', 'ember-metal/environment'], function (exports, Ember, EmberError, Logger, environment) {

  'use strict';

  exports._warnIfUsingStrippedFeatureFlags = _warnIfUsingStrippedFeatureFlags;

  /*global __fail__*/

  Ember['default'].assert = function(desc, test) {
    var throwAssertion;

    if (Ember['default'].typeOf(test) === 'function') {
      throwAssertion = !test();
    } else {
      throwAssertion = !test;
    }

    if (throwAssertion) {
      throw new EmberError['default']("Assertion Failed: " + desc);
    }
  };


  /**
    Display a warning with the provided message. Ember build tools will
    remove any calls to `Ember.warn()` when doing a production build.

    @method warn
    @param {String} message A warning to display.
    @param {Boolean} test An optional boolean. If falsy, the warning
      will be displayed.
  */
  Ember['default'].warn = function(message, test) {
    if (!test) {
      Logger['default'].warn("WARNING: "+message);
      if ('trace' in Logger['default']) {
        Logger['default'].trace();
      }
    }
  };

  /**
    Display a debug notice. Ember build tools will remove any calls to
    `Ember.debug()` when doing a production build.

    ```javascript
    Ember.debug('I\'m a debug notice!');
    ```

    @method debug
    @param {String} message A debug message to display.
  */
  Ember['default'].debug = function(message) {
    Logger['default'].debug("DEBUG: "+message);
  };

  /**
    Display a deprecation warning with the provided message and a stack trace
    (Chrome and Firefox only). Ember build tools will remove any calls to
    `Ember.deprecate()` when doing a production build.

    @method deprecate
    @param {String} message A description of the deprecation.
    @param {Boolean} test An optional boolean. If falsy, the deprecation
      will be displayed.
    @param {Object} options An optional object that can be used to pass
      in a `url` to the transition guide on the emberjs.com website.
  */
  Ember['default'].deprecate = function(message, test, options) {
    var noDeprecation;

    if (typeof test === 'function') {
      noDeprecation = test();
    } else {
      noDeprecation = test;
    }

    if (noDeprecation) { return; }

    if (Ember['default'].ENV.RAISE_ON_DEPRECATION) { throw new EmberError['default'](message); }

    var error;

    // When using new Error, we can't do the arguments check for Chrome. Alternatives are welcome
    try { __fail__.fail(); } catch (e) { error = e; }

    if (arguments.length === 3) {
      Ember['default'].assert('options argument to Ember.deprecate should be an object', options && typeof options === 'object');
      if (options.url) {
        message += ' See ' + options.url + ' for more details.';
      }
    }

    if (Ember['default'].LOG_STACKTRACE_ON_DEPRECATION && error.stack) {
      var stack;
      var stackStr = '';

      if (error['arguments']) {
        // Chrome
        stack = error.stack.replace(/^\s+at\s+/gm, '').
                            replace(/^([^\(]+?)([\n$])/gm, '{anonymous}($1)$2').
                            replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, '{anonymous}($1)').split('\n');
        stack.shift();
      } else {
        // Firefox
        stack = error.stack.replace(/(?:\n@:0)?\s+$/m, '').
                            replace(/^\(/gm, '{anonymous}(').split('\n');
      }

      stackStr = "\n    " + stack.slice(2).join("\n    ");
      message = message + stackStr;
    }

    Logger['default'].warn("DEPRECATION: "+message);
  };



  /**
    Alias an old, deprecated method with its new counterpart.

    Display a deprecation warning with the provided message and a stack trace
    (Chrome and Firefox only) when the assigned method is called.

    Ember build tools will not remove calls to `Ember.deprecateFunc()`, though
    no warnings will be shown in production.

    ```javascript
    Ember.oldMethod = Ember.deprecateFunc('Please use the new, updated method', Ember.newMethod);
    ```

    @method deprecateFunc
    @param {String} message A description of the deprecation.
    @param {Function} func The new function called to replace its deprecated counterpart.
    @return {Function} a new function that wrapped the original function with a deprecation warning
  */
  Ember['default'].deprecateFunc = function(message, func) {
    return function() {
      Ember['default'].deprecate(message);
      return func.apply(this, arguments);
    };
  };


  /**
    Run a function meant for debugging. Ember build tools will remove any calls to
    `Ember.runInDebug()` when doing a production build.

    ```javascript
    Ember.runInDebug(function() {
      Ember.Handlebars.EachView.reopen({
        didInsertElement: function() {
          console.log('I\'m happy');
        }
      });
    });
    ```

    @method runInDebug
    @param {Function} func The function to be executed.
    @since 1.5.0
  */
  Ember['default'].runInDebug = function(func) {
    func();
  };

  /**
    Will call `Ember.warn()` if ENABLE_ALL_FEATURES, ENABLE_OPTIONAL_FEATURES, or
    any specific FEATURES flag is truthy.

    This method is called automatically in debug canary builds.

    @private
    @method _warnIfUsingStrippedFeatureFlags
    @return {void}
  */
  function _warnIfUsingStrippedFeatureFlags(FEATURES, featuresWereStripped) {
    if (featuresWereStripped) {
      Ember['default'].warn('Ember.ENV.ENABLE_ALL_FEATURES is only available in canary builds.', !Ember['default'].ENV.ENABLE_ALL_FEATURES);
      Ember['default'].warn('Ember.ENV.ENABLE_OPTIONAL_FEATURES is only available in canary builds.', !Ember['default'].ENV.ENABLE_OPTIONAL_FEATURES);

      for (var key in FEATURES) {
        if (FEATURES.hasOwnProperty(key) && key !== 'isEnabled') {
          Ember['default'].warn('FEATURE["' + key + '"] is set as enabled, but FEATURE flags are only available in canary builds.', !FEATURES[key]);
        }
      }
    }
  }

  if (!Ember['default'].testing) {
    // Complain if they're using FEATURE flags in builds other than canary
    Ember['default'].FEATURES['features-stripped-test'] = true;
    var featuresWereStripped = true;

    
    delete Ember['default'].FEATURES['features-stripped-test'];
    _warnIfUsingStrippedFeatureFlags(Ember['default'].ENV.FEATURES, featuresWereStripped);

    // Inform the developer about the Ember Inspector if not installed.
    var isFirefox = typeof InstallTrigger !== 'undefined';
    var isChrome = environment['default'].isChrome;

    if (typeof window !== 'undefined' && (isFirefox || isChrome) && window.addEventListener) {
      window.addEventListener("load", function() {
        if (document.documentElement && document.documentElement.dataset && !document.documentElement.dataset.emberExtension) {
          var downloadURL;

          if (isChrome) {
            downloadURL = 'https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi';
          } else if (isFirefox) {
            downloadURL = 'https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/';
          }

          Ember['default'].debug('For more advanced debugging, install the Ember Inspector from ' + downloadURL);
        }
      }, false);
    }
  }

  /*
    We are transitioning away from `ember.js` to `ember.debug.js` to make
    it much clearer that it is only for local development purposes.

    This flag value is changed by the tooling (by a simple string replacement)
    so that if `ember.js` (which must be output for backwards compat reasons) is
    used a nice helpful warning message will be printed out.
  */
  var runningNonEmberDebugJS = false;
  if (runningNonEmberDebugJS) {
    Ember['default'].warn('Please use `ember.debug.js` instead of `ember.js` for development and debugging.');
  }

  exports.runningNonEmberDebugJS = runningNonEmberDebugJS;

});
enifed('ember-testing', ['ember-metal/core', 'ember-testing/initializers', 'ember-testing/support', 'ember-testing/setup_for_testing', 'ember-testing/test', 'ember-testing/adapters/adapter', 'ember-testing/adapters/qunit', 'ember-testing/helpers'], function (Ember, __dep1__, __dep2__, setupForTesting, Test, Adapter, QUnitAdapter) {

  'use strict';

  Ember['default'].Test = Test['default'];
  Ember['default'].Test.Adapter = Adapter['default'];
  Ember['default'].Test.QUnitAdapter = QUnitAdapter['default'];
  Ember['default'].setupForTesting = setupForTesting['default'];

});
enifed('ember-testing/adapters/adapter', ['exports', 'ember-runtime/system/object'], function (exports, EmberObject) {

  'use strict';

  function K() { return this; }

  /**
   @module ember
   @submodule ember-testing
  */

  /**
    The primary purpose of this class is to create hooks that can be implemented
    by an adapter for various test frameworks.

    @class Adapter
    @namespace Ember.Test
  */
  var Adapter = EmberObject['default'].extend({
    /**
      This callback will be called whenever an async operation is about to start.

      Override this to call your framework's methods that handle async
      operations.

      @public
      @method asyncStart
    */
    asyncStart: K,

    /**
      This callback will be called whenever an async operation has completed.

      @public
      @method asyncEnd
    */
    asyncEnd: K,

    /**
      Override this method with your testing framework's false assertion.
      This function is called whenever an exception occurs causing the testing
      promise to fail.

      QUnit example:

      ```javascript
        exception: function(error) {
          ok(false, error);
        };
      ```

      @public
      @method exception
      @param {String} error The exception to be raised.
    */
    exception: function(error) {
      throw error;
    }
  });

  exports['default'] = Adapter;

});
enifed('ember-testing/adapters/qunit', ['exports', 'ember-testing/adapters/adapter', 'ember-metal/utils'], function (exports, Adapter, utils) {

  'use strict';

  exports['default'] = Adapter['default'].extend({
    asyncStart: function() {
      QUnit.stop();
    },
    asyncEnd: function() {
      QUnit.start();
    },
    exception: function(error) {
      ok(false, utils.inspect(error));
    }
  });

});
enifed('ember-testing/helpers', ['ember-metal/core', 'ember-metal/property_get', 'ember-metal/error', 'ember-metal/run_loop', 'ember-views/system/jquery', 'ember-testing/test', 'ember-runtime/ext/rsvp'], function (Ember, property_get, EmberError, run, jQuery, Test, RSVP) {

  'use strict';

  var helper = Test['default'].registerHelper;
  var asyncHelper = Test['default'].registerAsyncHelper;

  function currentRouteName(app) {
    var appController = app.__container__.lookup('controller:application');

    return property_get.get(appController, 'currentRouteName');
  }

  function currentPath(app) {
    var appController = app.__container__.lookup('controller:application');

    return property_get.get(appController, 'currentPath');
  }

  function currentURL(app) {
    var router = app.__container__.lookup('router:main');

    return property_get.get(router, 'location').getURL();
  }

  function pauseTest() {
    Test['default'].adapter.asyncStart();
    return new Ember['default'].RSVP.Promise(function() { }, 'TestAdapter paused promise');
  }

  function focus(el) {
    if (el && el.is(':input, [contenteditable=true]')) {
      var type = el.prop('type');
      if (type !== 'checkbox' && type !== 'radio' && type !== 'hidden') {
        run['default'](el, function() {
          // Firefox does not trigger the `focusin` event if the window
          // does not have focus. If the document doesn't have focus just
          // use trigger('focusin') instead.
          if (!document.hasFocus || document.hasFocus()) {
            this.focus();
          } else {
            this.trigger('focusin');
          }
        });
      }
    }
  }

  function visit(app, url) {
    var router = app.__container__.lookup('router:main');
    router.location.setURL(url);

    if (app._readinessDeferrals > 0) {
      router['initialURL'] = url;
      run['default'](app, 'advanceReadiness');
      delete router['initialURL'];
    } else {
      run['default'](app.__deprecatedInstance__, 'handleURL', url);
    }

    return app.testHelpers.wait();
  }

  function click(app, selector, context) {
    var $el = app.testHelpers.findWithAssert(selector, context);
    run['default']($el, 'mousedown');

    focus($el);

    run['default']($el, 'mouseup');
    run['default']($el, 'click');

    return app.testHelpers.wait();
  }

  function check(app, selector, context) {
    var $el = app.testHelpers.findWithAssert(selector, context);
    var type = $el.prop('type');

    Ember['default'].assert('To check \'' + selector +
        '\', the input must be a checkbox', type === 'checkbox');

    if (!$el.prop('checked')) {
      app.testHelpers.click(selector, context);
    }

    return app.testHelpers.wait();
  }

  function uncheck(app, selector, context) {
    var $el = app.testHelpers.findWithAssert(selector, context);
    var type = $el.prop('type');

    Ember['default'].assert('To uncheck \'' + selector +
        '\', the input must be a checkbox', type === 'checkbox');

    if ($el.prop('checked')) {
      app.testHelpers.click(selector, context);
    }

    return app.testHelpers.wait();
  }

  function triggerEvent(app, selector, contextOrType, typeOrOptions, possibleOptions) {
    var arity = arguments.length;
    var context, type, options;

    if (arity === 3) {
      // context and options are optional, so this is
      // app, selector, type
      context = null;
      type = contextOrType;
      options = {};
    } else if (arity === 4) {
      // context and options are optional, so this is
      if (typeof typeOrOptions === "object") {  // either
        // app, selector, type, options
        context = null;
        type = contextOrType;
        options = typeOrOptions;
      } else { // or
        // app, selector, context, type
        context = contextOrType;
        type = typeOrOptions;
        options = {};
      }
    } else {
      context = contextOrType;
      type = typeOrOptions;
      options = possibleOptions;
    }

    var $el = app.testHelpers.findWithAssert(selector, context);

    var event = jQuery['default'].Event(type, options);

    run['default']($el, 'trigger', event);

    return app.testHelpers.wait();
  }

  function keyEvent(app, selector, contextOrType, typeOrKeyCode, keyCode) {
    var context, type;

    if (typeof keyCode === 'undefined') {
      context = null;
      keyCode = typeOrKeyCode;
      type = contextOrType;
    } else {
      context = contextOrType;
      type = typeOrKeyCode;
    }

    return app.testHelpers.triggerEvent(selector, context, type, { keyCode: keyCode, which: keyCode });
  }

  function fillIn(app, selector, contextOrText, text) {
    var $el, context;
    if (typeof text === 'undefined') {
      text = contextOrText;
    } else {
      context = contextOrText;
    }
    $el = app.testHelpers.findWithAssert(selector, context);
    focus($el);
    run['default'](function() {
      $el.val(text).change();
    });
    return app.testHelpers.wait();
  }

  function findWithAssert(app, selector, context) {
    var $el = app.testHelpers.find(selector, context);
    if ($el.length === 0) {
      throw new EmberError['default']("Element " + selector + " not found.");
    }
    return $el;
  }

  function find(app, selector, context) {
    var $el;
    context = context || property_get.get(app, 'rootElement');
    $el = app.$(selector, context);

    return $el;
  }

  function andThen(app, callback) {
    return app.testHelpers.wait(callback(app));
  }

  function wait(app, value) {
    return new RSVP['default'].Promise(function(resolve) {
      // Every 10ms, poll for the async thing to have finished
      var watcher = setInterval(function() {
        var router = app.__container__.lookup('router:main');

        // 1. If the router is loading, keep polling
        var routerIsLoading = router.router && !!router.router.activeTransition;
        if (routerIsLoading) { return; }

        // 2. If there are pending Ajax requests, keep polling
        if (Test['default'].pendingAjaxRequests) { return; }

        // 3. If there are scheduled timers or we are inside of a run loop, keep polling
        if (run['default'].hasScheduledTimers() || run['default'].currentRunLoop) { return; }
        if (Test['default'].waiters && Test['default'].waiters.any(function(waiter) {
          var context = waiter[0];
          var callback = waiter[1];
          return !callback.call(context);
        })) {
          return;
        }
        // Stop polling
        clearInterval(watcher);

        // Synchronously resolve the promise
        run['default'](null, resolve, value);
      }, 10);
    });

  }


  /**
  * Loads a route, sets up any controllers, and renders any templates associated
  * with the route as though a real user had triggered the route change while
  * using your app.
  *
  * Example:
  *
  * ```javascript
  * visit('posts/index').then(function() {
  *   // assert something
  * });
  * ```
  *
  * @method visit
  * @param {String} url the name of the route
  * @return {RSVP.Promise}
  */
  asyncHelper('visit', visit);

  /**
  * Clicks an element and triggers any actions triggered by the element's `click`
  * event.
  *
  * Example:
  *
  * ```javascript
  * click('.some-jQuery-selector').then(function() {
  *   // assert something
  * });
  * ```
  *
  * @method click
  * @param {String} selector jQuery selector for finding element on the DOM
  * @return {RSVP.Promise}
  */
  asyncHelper('click', click);

    /**
  * Simulates a key event, e.g. `keypress`, `keydown`, `keyup` with the desired keyCode
  *
  * Example:
  *
  * ```javascript
  * keyEvent('.some-jQuery-selector', 'keypress', 13).then(function() {
  *  // assert something
  * });
  * ```
  *
  * @method keyEvent
  * @param {String} selector jQuery selector for finding element on the DOM
  * @param {String} type the type of key event, e.g. `keypress`, `keydown`, `keyup`
  * @param {Number} keyCode the keyCode of the simulated key event
  * @return {RSVP.Promise}
  * @since 1.5.0
  */
  asyncHelper('keyEvent', keyEvent);

  /**
  * Fills in an input element with some text.
  *
  * Example:
  *
  * ```javascript
  * fillIn('#email', 'you@example.com').then(function() {
  *   // assert something
  * });
  * ```
  *
  * @method fillIn
  * @param {String} selector jQuery selector finding an input element on the DOM
  * to fill text with
  * @param {String} text text to place inside the input element
  * @return {RSVP.Promise}
  */
  asyncHelper('fillIn', fillIn);

  /**
  * Finds an element in the context of the app's container element. A simple alias
  * for `app.$(selector)`.
  *
  * Example:
  *
  * ```javascript
  * var $el = find('.my-selector');
  * ```
  *
  * @method find
  * @param {String} selector jQuery string selector for element lookup
  * @return {Object} jQuery object representing the results of the query
  */
  helper('find', find);

  /**
  * Like `find`, but throws an error if the element selector returns no results.
  *
  * Example:
  *
  * ```javascript
  * var $el = findWithAssert('.doesnt-exist'); // throws error
  * ```
  *
  * @method findWithAssert
  * @param {String} selector jQuery selector string for finding an element within
  * the DOM
  * @return {Object} jQuery object representing the results of the query
  * @throws {Error} throws error if jQuery object returned has a length of 0
  */
  helper('findWithAssert', findWithAssert);

  /**
    Causes the run loop to process any pending events. This is used to ensure that
    any async operations from other helpers (or your assertions) have been processed.

    This is most often used as the return value for the helper functions (see 'click',
    'fillIn','visit',etc).

    Example:

    ```javascript
    Ember.Test.registerAsyncHelper('loginUser', function(app, username, password) {
      visit('secured/path/here')
      .fillIn('#username', username)
      .fillIn('#password', password)
      .click('.submit')

      return app.testHelpers.wait();
    });

    @method wait
    @param {Object} value The value to be returned.
    @return {RSVP.Promise}
  */
  asyncHelper('wait', wait);
  asyncHelper('andThen', andThen);


  /**
    Returns the currently active route name.

  Example:

  ```javascript
  function validateRouteName() {
    equal(currentRouteName(), 'some.path', "correct route was transitioned into.");
  }

  visit('/some/path').then(validateRouteName)
  ```

  @method currentRouteName
  @return {Object} The name of the currently active route.
  @since 1.5.0
  */
  helper('currentRouteName', currentRouteName);

  /**
    Returns the current path.

  Example:

  ```javascript
  function validateURL() {
    equal(currentPath(), 'some.path.index', "correct path was transitioned into.");
  }

  click('#some-link-id').then(validateURL);
  ```

  @method currentPath
  @return {Object} The currently active path.
  @since 1.5.0
  */
  helper('currentPath', currentPath);

  /**
    Returns the current URL.

  Example:

  ```javascript
  function validateURL() {
    equal(currentURL(), '/some/path', "correct URL was transitioned into.");
  }

  click('#some-link-id').then(validateURL);
  ```

  @method currentURL
  @return {Object} The currently active URL.
  @since 1.5.0
  */
  helper('currentURL', currentURL);

  /**
   Pauses the current test - this is useful for debugging while testing or for test-driving.
   It allows you to inspect the state of your application at any point.

   Example (The test will pause before clicking the button):

   ```javascript
   visit('/')
   return pauseTest();

   click('.btn');
   ```

   @since 1.9.0
   @method pauseTest
   @return {Object} A promise that will never resolve
   */
  helper('pauseTest', pauseTest);

  /**
    Triggers the given DOM event on the element identified by the provided selector.

    Example:

    ```javascript
    triggerEvent('#some-elem-id', 'blur');
    ```

    This is actually used internally by the `keyEvent` helper like so:

    ```javascript
    triggerEvent('#some-elem-id', 'keypress', { keyCode: 13 });
    ```

   @method triggerEvent
   @param {String} selector jQuery selector for finding element on the DOM
   @param {String} [context] jQuery selector that will limit the selector
                             argument to find only within the context's children
   @param {String} type The event type to be triggered.
   @param {Object} [options] The options to be passed to jQuery.Event.
   @return {RSVP.Promise}
   @since 1.5.0
  */
  asyncHelper('triggerEvent', triggerEvent);

});
enifed('ember-testing/initializers', ['ember-runtime/system/lazy_load'], function (lazy_load) {

  'use strict';

  var name = 'deferReadiness in `testing` mode';

  lazy_load.onLoad('Ember.Application', function(Application) {
    if (!Application.initializers[name]) {
      Application.initializer({
        name: name,

        initialize: function(registry, application) {
          if (application.testing) {
            application.deferReadiness();
          }
        }
      });
    }
  });

});
enifed('ember-testing/setup_for_testing', ['exports', 'ember-metal/core', 'ember-testing/adapters/qunit', 'ember-views/system/jquery'], function (exports, Ember, QUnitAdapter, jQuery) {

  'use strict';

  var Test, requests;

  function incrementAjaxPendingRequests(_, xhr) {
    requests.push(xhr);
    Test.pendingAjaxRequests = requests.length;
  }

  function decrementAjaxPendingRequests(_, xhr) {
    for (var i=0;i<requests.length;i++) {
      if (xhr === requests[i]) {
        requests.splice(i, 1);
      }
    }
    Test.pendingAjaxRequests = requests.length;
  }

  /**
    Sets Ember up for testing. This is useful to perform
    basic setup steps in order to unit test.

    Use `App.setupForTesting` to perform integration tests (full
    application testing).

    @method setupForTesting
    @namespace Ember
    @since 1.5.0
  */
  function setupForTesting() {
    if (!Test) { Test = requireModule('ember-testing/test')['default']; }

    Ember['default'].testing = true;

    // if adapter is not manually set default to QUnit
    if (!Test.adapter) {
      Test.adapter = QUnitAdapter['default'].create();
    }

    requests = [];
    Test.pendingAjaxRequests = requests.length;

    jQuery['default'](document).off('ajaxSend', incrementAjaxPendingRequests);
    jQuery['default'](document).off('ajaxComplete', decrementAjaxPendingRequests);
    jQuery['default'](document).on('ajaxSend', incrementAjaxPendingRequests);
    jQuery['default'](document).on('ajaxComplete', decrementAjaxPendingRequests);
  }
  exports['default'] = setupForTesting;

});
enifed('ember-testing/support', ['ember-metal/core', 'ember-views/system/jquery', 'ember-metal/environment'], function (Ember, jQuery, environment) {

  'use strict';

  var $ = jQuery['default'];

  /**
    This method creates a checkbox and triggers the click event to fire the
    passed in handler. It is used to correct for a bug in older versions
    of jQuery (e.g 1.8.3).

    @private
    @method testCheckboxClick
  */
  function testCheckboxClick(handler) {
    $('<input type="checkbox">')
      .css({ position: 'absolute', left: '-1000px', top: '-1000px' })
      .appendTo('body')
      .on('click', handler)
      .trigger('click')
      .remove();
  }

  if (environment['default'].hasDOM) {
    $(function() {
      /*
        Determine whether a checkbox checked using jQuery's "click" method will have
        the correct value for its checked property.

        If we determine that the current jQuery version exhibits this behavior,
        patch it to work correctly as in the commit for the actual fix:
        https://github.com/jquery/jquery/commit/1fb2f92.
      */
      testCheckboxClick(function() {
        if (!this.checked && !$.event.special.click) {
          $.event.special.click = {
            // For checkbox, fire native event so checked state will be right
            trigger: function() {
              if ($.nodeName(this, "input") && this.type === "checkbox" && this.click) {
                this.click();
                return false;
              }
            }
          };
        }
      });

      // Try again to verify that the patch took effect or blow up.
      testCheckboxClick(function() {
        Ember['default'].warn("clicked checkboxes should be checked! the jQuery patch didn't work", this.checked);
      });
    });
  }

});
enifed('ember-testing/test', ['exports', 'ember-metal/core', 'ember-metal/run_loop', 'ember-metal/platform/create', 'ember-runtime/ext/rsvp', 'ember-testing/setup_for_testing', 'ember-application/system/application'], function (exports, Ember, emberRun, create, RSVP, setupForTesting, EmberApplication) {

  'use strict';

  var slice = [].slice;
  var helpers = {};
  var injectHelpersCallbacks = [];

  /**
    This is a container for an assortment of testing related functionality:

    * Choose your default test adapter (for your framework of choice).
    * Register/Unregister additional test helpers.
    * Setup callbacks to be fired when the test helpers are injected into
      your application.

    @class Test
    @namespace Ember
  */
  var Test = {
    /**
      Hash containing all known test helpers.

      @property _helpers
      @private
      @since 1.7.0
    */
    _helpers: helpers,

    /**
      `registerHelper` is used to register a test helper that will be injected
      when `App.injectTestHelpers` is called.

      The helper method will always be called with the current Application as
      the first parameter.

      For example:

      ```javascript
      Ember.Test.registerHelper('boot', function(app) {
        Ember.run(app, app.advanceReadiness);
      });
      ```

      This helper can later be called without arguments because it will be
      called with `app` as the first parameter.

      ```javascript
      App = Ember.Application.create();
      App.injectTestHelpers();
      boot();
      ```

      @public
      @method registerHelper
      @param {String} name The name of the helper method to add.
      @param {Function} helperMethod
      @param options {Object}
    */
    registerHelper: function(name, helperMethod) {
      helpers[name] = {
        method: helperMethod,
        meta: { wait: false }
      };
    },

    /**
      `registerAsyncHelper` is used to register an async test helper that will be injected
      when `App.injectTestHelpers` is called.

      The helper method will always be called with the current Application as
      the first parameter.

      For example:

      ```javascript
      Ember.Test.registerAsyncHelper('boot', function(app) {
        Ember.run(app, app.advanceReadiness);
      });
      ```

      The advantage of an async helper is that it will not run
      until the last async helper has completed.  All async helpers
      after it will wait for it complete before running.


      For example:

      ```javascript
      Ember.Test.registerAsyncHelper('deletePost', function(app, postId) {
        click('.delete-' + postId);
      });

      // ... in your test
      visit('/post/2');
      deletePost(2);
      visit('/post/3');
      deletePost(3);
      ```

      @public
      @method registerAsyncHelper
      @param {String} name The name of the helper method to add.
      @param {Function} helperMethod
      @since 1.2.0
    */
    registerAsyncHelper: function(name, helperMethod) {
      helpers[name] = {
        method: helperMethod,
        meta: { wait: true }
      };
    },

    /**
      Remove a previously added helper method.

      Example:

      ```javascript
      Ember.Test.unregisterHelper('wait');
      ```

      @public
      @method unregisterHelper
      @param {String} name The helper to remove.
    */
    unregisterHelper: function(name) {
      delete helpers[name];
      delete Test.Promise.prototype[name];
    },

    /**
      Used to register callbacks to be fired whenever `App.injectTestHelpers`
      is called.

      The callback will receive the current application as an argument.

      Example:

      ```javascript
      Ember.Test.onInjectHelpers(function() {
        Ember.$(document).ajaxSend(function() {
          Test.pendingAjaxRequests++;
        });

        Ember.$(document).ajaxComplete(function() {
          Test.pendingAjaxRequests--;
        });
      });
      ```

      @public
      @method onInjectHelpers
      @param {Function} callback The function to be called.
    */
    onInjectHelpers: function(callback) {
      injectHelpersCallbacks.push(callback);
    },

    /**
      This returns a thenable tailored for testing.  It catches failed
      `onSuccess` callbacks and invokes the `Ember.Test.adapter.exception`
      callback in the last chained then.

      This method should be returned by async helpers such as `wait`.

      @public
      @method promise
      @param {Function} resolver The function used to resolve the promise.
    */
    promise: function(resolver) {
      return new Test.Promise(resolver);
    },

    /**
     Used to allow ember-testing to communicate with a specific testing
     framework.

     You can manually set it before calling `App.setupForTesting()`.

     Example:

     ```javascript
     Ember.Test.adapter = MyCustomAdapter.create()
     ```

     If you do not set it, ember-testing will default to `Ember.Test.QUnitAdapter`.

     @public
     @property adapter
     @type {Class} The adapter to be used.
     @default Ember.Test.QUnitAdapter
    */
    adapter: null,

    /**
      Replacement for `Ember.RSVP.resolve`
      The only difference is this uses
      an instance of `Ember.Test.Promise`

      @public
      @method resolve
      @param {Mixed} The value to resolve
      @since 1.2.0
    */
    resolve: function(val) {
      return Test.promise(function(resolve) {
        return resolve(val);
      });
    },

    /**
       This allows ember-testing to play nicely with other asynchronous
       events, such as an application that is waiting for a CSS3
       transition or an IndexDB transaction.

       For example:

       ```javascript
       Ember.Test.registerWaiter(function() {
         return myPendingTransactions() == 0;
       });
       ```
       The `context` argument allows you to optionally specify the `this`
       with which your callback will be invoked.

       For example:

       ```javascript
       Ember.Test.registerWaiter(MyDB, MyDB.hasPendingTransactions);
       ```

       @public
       @method registerWaiter
       @param {Object} context (optional)
       @param {Function} callback
       @since 1.2.0
    */
    registerWaiter: function(context, callback) {
      if (arguments.length === 1) {
        callback = context;
        context = null;
      }
      if (!this.waiters) {
        this.waiters = Ember['default'].A();
      }
      this.waiters.push([context, callback]);
    },
    /**
       `unregisterWaiter` is used to unregister a callback that was
       registered with `registerWaiter`.

       @public
       @method unregisterWaiter
       @param {Object} context (optional)
       @param {Function} callback
       @since 1.2.0
    */
    unregisterWaiter: function(context, callback) {
      if (!this.waiters) { return; }
      if (arguments.length === 1) {
        callback = context;
        context = null;
      }
      this.waiters = Ember['default'].A(this.waiters.filter(function(elt) {
        return !(elt[0] === context && elt[1] === callback);
      }));
    }
  };

  function helper(app, name) {
    var fn = helpers[name].method;
    var meta = helpers[name].meta;

    return function() {
      var args = slice.call(arguments);
      var lastPromise;

      args.unshift(app);

      // some helpers are not async and
      // need to return a value immediately.
      // example: `find`
      if (!meta.wait) {
        return fn.apply(app, args);
      }

      lastPromise = run(function() {
        return Test.resolve(Test.lastPromise);
      });

      // wait for last helper's promise to resolve and then
      // execute. To be safe, we need to tell the adapter we're going
      // asynchronous here, because fn may not be invoked before we
      // return.
      Test.adapter.asyncStart();
      return lastPromise.then(function() {
        return fn.apply(app, args);
      })["finally"](function() {
        Test.adapter.asyncEnd();
      });
    };
  }

  function run(fn) {
    if (!emberRun['default'].currentRunLoop) {
      return emberRun['default'](fn);
    } else {
      return fn();
    }
  }

  EmberApplication['default'].reopen({
    /**
     This property contains the testing helpers for the current application. These
     are created once you call `injectTestHelpers` on your `Ember.Application`
     instance. The included helpers are also available on the `window` object by
     default, but can be used from this object on the individual application also.

      @property testHelpers
      @type {Object}
      @default {}
    */
    testHelpers: {},

    /**
     This property will contain the original methods that were registered
     on the `helperContainer` before `injectTestHelpers` is called.

     When `removeTestHelpers` is called, these methods are restored to the
     `helperContainer`.

      @property originalMethods
      @type {Object}
      @default {}
      @private
      @since 1.3.0
    */
    originalMethods: {},


    /**
    This property indicates whether or not this application is currently in
    testing mode. This is set when `setupForTesting` is called on the current
    application.

    @property testing
    @type {Boolean}
    @default false
    @since 1.3.0
    */
    testing: false,

    /**
     This hook defers the readiness of the application, so that you can start
     the app when your tests are ready to run. It also sets the router's
     location to 'none', so that the window's location will not be modified
     (preventing both accidental leaking of state between tests and interference
     with your testing framework).

     Example:

    ```
    App.setupForTesting();
    ```

      @method setupForTesting
    */
    setupForTesting: function() {
      setupForTesting['default']();

      this.testing = true;

      this.Router.reopen({
        location: 'none'
      });
    },

    /**
      This will be used as the container to inject the test helpers into. By
      default the helpers are injected into `window`.

      @property helperContainer
      @type {Object} The object to be used for test helpers.
      @default window
      @since 1.2.0
    */
    helperContainer: null,

    /**
      This injects the test helpers into the `helperContainer` object. If an object is provided
      it will be used as the helperContainer. If `helperContainer` is not set it will default
      to `window`. If a function of the same name has already been defined it will be cached
      (so that it can be reset if the helper is removed with `unregisterHelper` or
      `removeTestHelpers`).

     Any callbacks registered with `onInjectHelpers` will be called once the
     helpers have been injected.

    Example:
    ```
    App.injectTestHelpers();
    ```

      @method injectTestHelpers
    */
    injectTestHelpers: function(helperContainer) {
      if (helperContainer) {
        this.helperContainer = helperContainer;
      } else {
        this.helperContainer = window;
      }

      this.testHelpers = {};
      for (var name in helpers) {
        this.originalMethods[name] = this.helperContainer[name];
        this.testHelpers[name] = this.helperContainer[name] = helper(this, name);
        protoWrap(Test.Promise.prototype, name, helper(this, name), helpers[name].meta.wait);
      }

      for (var i = 0, l = injectHelpersCallbacks.length; i < l; i++) {
        injectHelpersCallbacks[i](this);
      }
    },

    /**
      This removes all helpers that have been registered, and resets and functions
      that were overridden by the helpers.

      Example:

      ```javascript
      App.removeTestHelpers();
      ```

      @public
      @method removeTestHelpers
    */
    removeTestHelpers: function() {
      if (!this.helperContainer) { return; }

      for (var name in helpers) {
        this.helperContainer[name] = this.originalMethods[name];
        delete this.testHelpers[name];
        delete this.originalMethods[name];
      }
    }
  });

  // This method is no longer needed
  // But still here for backwards compatibility
  // of helper chaining
  function protoWrap(proto, name, callback, isAsync) {
    proto[name] = function() {
      var args = arguments;
      if (isAsync) {
        return callback.apply(this, args);
      } else {
        return this.then(function() {
          return callback.apply(this, args);
        });
      }
    };
  }

  Test.Promise = function() {
    RSVP['default'].Promise.apply(this, arguments);
    Test.lastPromise = this;
  };

  Test.Promise.prototype = create['default'](RSVP['default'].Promise.prototype);
  Test.Promise.prototype.constructor = Test.Promise;
  Test.Promise.resolve = Test.resolve;

  // Patch `then` to isolate async methods
  // specifically `Ember.Test.lastPromise`
  var originalThen = RSVP['default'].Promise.prototype.then;
  Test.Promise.prototype.then = function(onSuccess, onFailure) {
    return originalThen.call(this, function(val) {
      return isolate(onSuccess, val);
    }, onFailure);
  };

  // This method isolates nested async methods
  // so that they don't conflict with other last promises.
  //
  // 1. Set `Ember.Test.lastPromise` to null
  // 2. Invoke method
  // 3. Return the last promise created during method
  function isolate(fn, val) {
    var value, lastPromise;

    // Reset lastPromise for nested helpers
    Test.lastPromise = null;

    value = fn(val);

    lastPromise = Test.lastPromise;
    Test.lastPromise = null;

    // If the method returned a promise
    // return that promise. If not,
    // return the last async helper's promise
    if ((value && (value instanceof Test.Promise)) || !lastPromise) {
      return value;
    } else {
      return run(function() {
        return Test.resolve(lastPromise).then(function() {
          return value;
        });
      });
    }
  }

  exports['default'] = Test;

});
enifed("htmlbars-test-helpers",
  ["exports"],
  function(__exports__) {
    "use strict";
    function equalInnerHTML(fragment, html) {
      var actualHTML = normalizeInnerHTML(fragment.innerHTML);
      QUnit.push(actualHTML === html, actualHTML, html);
    }

    __exports__.equalInnerHTML = equalInnerHTML;function equalHTML(node, html) {
      var fragment;
      if (!node.nodeType && node.length) {
        fragment = document.createDocumentFragment();
        while (node[0]) {
          fragment.appendChild(node[0]);
        }
      } else {
        fragment = node;
      }

      var div = document.createElement("div");
      div.appendChild(fragment.cloneNode(true));

      equalInnerHTML(div, html);
    }

    __exports__.equalHTML = equalHTML;// detect weird IE8 html strings
    var ie8InnerHTMLTestElement = document.createElement('div');
    ie8InnerHTMLTestElement.setAttribute('id', 'womp');
    var ie8InnerHTML = (ie8InnerHTMLTestElement.outerHTML.indexOf('id=womp') > -1);

    // detect side-effects of cloning svg elements in IE9-11
    var ieSVGInnerHTML = (function () {
      if (!document.createElementNS) {
        return false;
      }
      var div = document.createElement('div');
      var node = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      div.appendChild(node);
      var clone = div.cloneNode(true);
      return clone.innerHTML === '<svg xmlns="http://www.w3.org/2000/svg" />';
    })();

    function normalizeInnerHTML(actualHTML) {
      if (ie8InnerHTML) {
        // drop newlines in IE8
        actualHTML = actualHTML.replace(/\r\n/gm, '');
        // downcase ALLCAPS tags in IE8
        actualHTML = actualHTML.replace(/<\/?[A-Z\-]+/gi, function(tag){
          return tag.toLowerCase();
        });
        // quote ids in IE8
        actualHTML = actualHTML.replace(/id=([^ >]+)/gi, function(match, id){
          return 'id="'+id+'"';
        });
        // IE8 adds ':' to some tags
        // <keygen> becomes <:keygen>
        actualHTML = actualHTML.replace(/<(\/?):([^ >]+)/gi, function(match, slash, tag){
          return '<'+slash+tag;
        });

        // Normalize the style attribute
        actualHTML = actualHTML.replace(/style="(.+?)"/gi, function(match, val){
          return 'style="'+val.toLowerCase()+';"';
        });

      }
      if (ieSVGInnerHTML) {
        // Replace `<svg xmlns="http://www.w3.org/2000/svg" height="50%" />` with `<svg height="50%"></svg>`, etc.
        // drop namespace attribute
        actualHTML = actualHTML.replace(/ xmlns="[^"]+"/, '');
        // replace self-closing elements
        actualHTML = actualHTML.replace(/<([^ >]+) [^\/>]*\/>/gi, function(tag, tagName) {
          return tag.slice(0, tag.length - 3) + '></' + tagName + '>';
        });
      }

      return actualHTML;
    }

    __exports__.normalizeInnerHTML = normalizeInnerHTML;// detect weird IE8 checked element string
    var checkedInput = document.createElement('input');
    checkedInput.setAttribute('checked', 'checked');
    var checkedInputString = checkedInput.outerHTML;
    function isCheckedInputHTML(element) {
      equal(element.outerHTML, checkedInputString);
    }

    __exports__.isCheckedInputHTML = isCheckedInputHTML;// check which property has the node's text content
    var textProperty = document.createElement('div').textContent === undefined ? 'innerText' : 'textContent';
    function getTextContent(el) {
      // textNode
      if (el.nodeType === 3) {
        return el.nodeValue;
      } else {
        return el[textProperty];
      }
    }

    __exports__.getTextContent = getTextContent;// IE8 does not have Object.create, so use a polyfill if needed.
    // Polyfill based on Mozilla's (MDN)
    function createObject(obj) {
      if (typeof Object.create === 'function') {
        return Object.create(obj);
      } else {
        var Temp = function() {};
        Temp.prototype = obj;
        return new Temp();
      }
    }
    __exports__.createObject = createObject;
  });
requireModule("ember-testing");

})();