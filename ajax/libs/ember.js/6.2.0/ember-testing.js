/*!
 * @overview  Ember - JavaScript Application Framework
 * @copyright Copyright 2011 Tilde Inc. and contributors
 *            Portions Copyright 2006-2011 Strobe Inc.
 *            Portions Copyright 2008-2011 Apple Inc. All rights reserved.
 * @license   Licensed under MIT license
 *            See https://raw.github.com/emberjs/ember.js/master/LICENSE
 * @version   6.2.0
 */
/* eslint-disable no-var */
/* globals global globalThis self */
/* eslint-disable-next-line no-unused-vars */
var define, require;

(function () {
  var globalObj =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : null;

  if (globalObj === null) {
    throw new Error('unable to locate global object');
  }

  if (typeof globalObj.define === 'function' && typeof globalObj.require === 'function') {
    define = globalObj.define;
    require = globalObj.require;

    return;
  }

  var registry = Object.create(null);
  var seen = Object.create(null);

  function missingModule(name, referrerName) {
    if (referrerName) {
      throw new Error('Could not find module ' + name + ' required by: ' + referrerName);
    } else {
      throw new Error('Could not find module ' + name);
    }
  }

  function internalRequire(_name, referrerName) {
    var name = _name;
    var mod = registry[name];

    if (!mod) {
      name = name + '/index';
      mod = registry[name];
    }

    var exports = seen[name];

    if (exports !== undefined) {
      return exports;
    }

    exports = seen[name] = {};

    if (!mod) {
      missingModule(_name, referrerName);
    }

    var deps = mod.deps;
    var callback = mod.callback;
    var reified = new Array(deps.length);

    for (var i = 0; i < deps.length; i++) {
      if (deps[i] === 'exports') {
        reified[i] = exports;
      } else if (deps[i] === 'require') {
        reified[i] = require;
      } else {
        reified[i] = require(deps[i], name);
      }
    }

    var result = callback.apply(this, reified);
    if (!deps.includes('exports') || result !== undefined) {
      exports = seen[name] = result;
    }

    return exports;
  }

  require = function (name) {
    return internalRequire(name, null);
  };

  define = function (name, deps, callback) {
    registry[name] = { deps: deps, callback: callback };
  };

  // setup `require` module
  require['default'] = require;

  require.has = function registryHas(moduleName) {
    return Boolean(registry[moduleName]) || Boolean(registry[moduleName + '/index']);
  };

  require._eak_seen = require.entries = registry;
})();
(function (runtime, runloop, errorHandling, EmberObject, debug, EmberApplication, Internals, Router, test) {
          'use strict';

          function d(name, mod) {
                        Object.defineProperty(mod, '__esModule', { value: true });
                        define(name, [], () => mod);
                      }

          function run(fn) {
            if (!runloop._getCurrentRunLoop()) {
              return runloop.run(fn);
            } else {
              return fn();
            }
          }

          const emberTestingLibTestRun = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: run
          }, Symbol.toStringTag, { value: 'Module' });

          let lastPromise = null;
          class TestPromise extends runtime.RSVP.Promise {
            constructor(executor, label) {
              super(executor, label);
              lastPromise = this;
            }
            then(onFulfilled, onRejected, label) {
              let normalizedOnFulfilled = typeof onFulfilled === 'function' ? result => isolate(onFulfilled, result) : undefined;
              return super.then(normalizedOnFulfilled, onRejected, label);
            }
          }

          /**
            This returns a thenable tailored for testing.  It catches failed
            `onSuccess` callbacks and invokes the `Ember.Test.adapter.exception`
            callback in the last chained then.

            This method should be returned by async helpers such as `wait`.

            @public
            @for Ember.Test
            @method promise
            @param {Function} resolver The function used to resolve the promise.
            @param {String} label An optional string for identifying the promise.
          */
          function promise(resolver, label) {
            let fullLabel = `Ember.Test.promise: ${label || '<Unknown Promise>'}`;
            return new TestPromise(resolver, fullLabel);
          }

          /**
            Replacement for `Ember.RSVP.resolve`
            The only difference is this uses
            an instance of `Ember.Test.Promise`

            @public
            @for Ember.Test
            @method resolve
            @param {Mixed} The value to resolve
            @since 1.2.0
          */
          function resolve(result, label) {
            return TestPromise.resolve(result, label);
          }
          function getLastPromise() {
            return lastPromise;
          }

          // This method isolates nested async methods
          // so that they don't conflict with other last promises.
          //
          // 1. Set `Ember.Test.lastPromise` to null
          // 2. Invoke method
          // 3. Return the last promise created during method
          function isolate(onFulfilled, result) {
            // Reset lastPromise for nested helpers
            lastPromise = null;
            let value = onFulfilled(result);
            let promise = lastPromise;
            lastPromise = null;

            // If the method returned a promise
            // return that promise. If not,
            // return the last async helper's promise
            if (value && value instanceof TestPromise || !promise) {
              return value;
            } else {
              return run(() => resolve(promise).then(() => value));
            }
          }

          const emberTestingLibTestPromise = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: TestPromise,
                    getLastPromise,
                    promise,
                    resolve
          }, Symbol.toStringTag, { value: 'Module' });

          const helpers = {};
          /**
           @module @ember/test
          */

          /**
            `registerHelper` is used to register a test helper that will be injected
            when `App.injectTestHelpers` is called.

            The helper method will always be called with the current Application as
            the first parameter.

            For example:

            ```javascript
            import { registerHelper } from '@ember/test';
            import { run } from '@ember/runloop';

            registerHelper('boot', function(app) {
              run(app, app.advanceReadiness);
            });
            ```

            This helper can later be called without arguments because it will be
            called with `app` as the first parameter.

            ```javascript
            import Application from '@ember/application';

            App = Application.create();
            App.injectTestHelpers();
            boot();
            ```

            @public
            @for @ember/test
            @static
            @method registerHelper
            @param {String} name The name of the helper method to add.
            @param {Function} helperMethod
            @param options {Object}
          */
          function registerHelper(name, helperMethod) {
            helpers[name] = {
              method: helperMethod,
              meta: {
                wait: false
              }
            };
          }

          /**
            `registerAsyncHelper` is used to register an async test helper that will be injected
            when `App.injectTestHelpers` is called.

            The helper method will always be called with the current Application as
            the first parameter.

            For example:

            ```javascript
            import { registerAsyncHelper } from '@ember/test';
            import { run } from '@ember/runloop';

            registerAsyncHelper('boot', function(app) {
              run(app, app.advanceReadiness);
            });
            ```

            The advantage of an async helper is that it will not run
            until the last async helper has completed.  All async helpers
            after it will wait for it complete before running.


            For example:

            ```javascript
            import { registerAsyncHelper } from '@ember/test';

            registerAsyncHelper('deletePost', function(app, postId) {
              click('.delete-' + postId);
            });

            // ... in your test
            visit('/post/2');
            deletePost(2);
            visit('/post/3');
            deletePost(3);
            ```

            @public
            @for @ember/test
            @method registerAsyncHelper
            @param {String} name The name of the helper method to add.
            @param {Function} helperMethod
            @since 1.2.0
          */
          function registerAsyncHelper(name, helperMethod) {
            helpers[name] = {
              method: helperMethod,
              meta: {
                wait: true
              }
            };
          }

          /**
            Remove a previously added helper method.

            Example:

            ```javascript
            import { unregisterHelper } from '@ember/test';

            unregisterHelper('wait');
            ```

            @public
            @method unregisterHelper
            @static
            @for @ember/test
            @param {String} name The helper to remove.
          */
          function unregisterHelper(name) {
            delete helpers[name];
            // SAFETY: This isn't necessarily a safe thing to do, but in terms of the immediate types here
            // it won't error.
            delete TestPromise.prototype[name];
          }

          const emberTestingLibTestHelpers = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    helpers,
                    registerAsyncHelper,
                    registerHelper,
                    unregisterHelper
          }, Symbol.toStringTag, { value: 'Module' });

          const callbacks$1 = [];

          /**
            Used to register callbacks to be fired whenever `App.injectTestHelpers`
            is called.

            The callback will receive the current application as an argument.

            Example:

            ```javascript
            import $ from 'jquery';

            Ember.Test.onInjectHelpers(function() {
              $(document).ajaxSend(function() {
                Test.pendingRequests++;
              });

              $(document).ajaxComplete(function() {
                Test.pendingRequests--;
              });
            });
            ```

            @public
            @for Ember.Test
            @method onInjectHelpers
            @param {Function} callback The function to be called.
          */
          function onInjectHelpers(callback) {
            callbacks$1.push(callback);
          }
          function invokeInjectHelpersCallbacks(app) {
            for (let callback of callbacks$1) {
              callback(app);
            }
          }

          const emberTestingLibTestOnInjectHelpers = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    callbacks: callbacks$1,
                    invokeInjectHelpersCallbacks,
                    onInjectHelpers
          }, Symbol.toStringTag, { value: 'Module' });

          /**
           @module @ember/test
          */
          const contexts = [];
          const callbacks = [];

          /**
             This allows ember-testing to play nicely with other asynchronous
             events, such as an application that is waiting for a CSS3
             transition or an IndexDB transaction. The waiter runs periodically
             after each async helper (i.e. `click`, `andThen`, `visit`, etc) has executed,
             until the returning result is truthy. After the waiters finish, the next async helper
             is executed and the process repeats.

             For example:

             ```javascript
             import { registerWaiter } from '@ember/test';

             registerWaiter(function() {
               return myPendingTransactions() === 0;
             });
             ```
             The `context` argument allows you to optionally specify the `this`
             with which your callback will be invoked.

             For example:

             ```javascript
             import { registerWaiter } from '@ember/test';

             registerWaiter(MyDB, MyDB.hasPendingTransactions);
             ```

             @public
             @for @ember/test
             @static
             @method registerWaiter
             @param {Object} context (optional)
             @param {Function} callback
             @since 1.2.0
          */

          function registerWaiter(
          // Formatting makes a pretty big difference in how readable this is.
          // prettier-ignore
          ...args) {
            let checkedCallback;
            let checkedContext;
            if (args.length === 1) {
              checkedContext = null;
              checkedCallback = args[0];
            } else {
              checkedContext = args[0];
              checkedCallback = args[1];
            }
            if (indexOf(checkedContext, checkedCallback) > -1) {
              return;
            }
            contexts.push(checkedContext);
            callbacks.push(checkedCallback);
          }

          /**
             `unregisterWaiter` is used to unregister a callback that was
             registered with `registerWaiter`.

             @public
             @for @ember/test
             @static
             @method unregisterWaiter
             @param {Object} context (optional)
             @param {Function} callback
             @since 1.2.0
          */
          function unregisterWaiter(context, callback) {
            if (!callbacks.length) {
              return;
            }
            if (arguments.length === 1) {
              callback = context;
              context = null;
            }
            let i = indexOf(context, callback);
            if (i === -1) {
              return;
            }
            contexts.splice(i, 1);
            callbacks.splice(i, 1);
          }

          /**
            Iterates through each registered test waiter, and invokes
            its callback. If any waiter returns false, this method will return
            true indicating that the waiters have not settled yet.

            This is generally used internally from the acceptance/integration test
            infrastructure.

            @public
            @for @ember/test
            @static
            @method checkWaiters
          */
          function checkWaiters() {
            if (!callbacks.length) {
              return false;
            }
            for (let i = 0; i < callbacks.length; i++) {
              let context = contexts[i];
              let callback = callbacks[i];
              // SAFETY: The loop ensures that this exists
              if (!callback.call(context)) {
                return true;
              }
            }
            return false;
          }
          function indexOf(context, callback) {
            for (let i = 0; i < callbacks.length; i++) {
              if (callbacks[i] === callback && contexts[i] === context) {
                return i;
              }
            }
            return -1;
          }

          const emberTestingLibTestWaiters = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    checkWaiters,
                    registerWaiter,
                    unregisterWaiter
          }, Symbol.toStringTag, { value: 'Module' });

          let adapter;
          function getAdapter() {
            return adapter;
          }
          function setAdapter(value) {
            adapter = value;
            if (value && typeof value.exception === 'function') {
              errorHandling.setDispatchOverride(adapterDispatch);
            } else {
              errorHandling.setDispatchOverride(null);
            }
          }
          function asyncStart() {
            if (adapter) {
              adapter.asyncStart();
            }
          }
          function asyncEnd() {
            if (adapter) {
              adapter.asyncEnd();
            }
          }
          function adapterDispatch(error) {
            adapter.exception(error);

            // @ts-expect-error Normally unreachable
            console.error(error.stack); // eslint-disable-line no-console
          }

          const emberTestingLibTestAdapter = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    asyncEnd,
                    asyncStart,
                    getAdapter,
                    setAdapter
          }, Symbol.toStringTag, { value: 'Module' });

          /**
            @module ember
          */

          /**
            This is a container for an assortment of testing related functionality:

            * Choose your default test adapter (for your framework of choice).
            * Register/Unregister additional test helpers.
            * Setup callbacks to be fired when the test helpers are injected into
              your application.

            @class Test
            @namespace Ember
            @public
          */
          const Test = {
            /**
              Hash containing all known test helpers.
               @property _helpers
              @private
              @since 1.7.0
            */
            _helpers: helpers,
            registerHelper,
            registerAsyncHelper,
            unregisterHelper,
            onInjectHelpers,
            Promise: TestPromise,
            promise,
            resolve,
            registerWaiter,
            unregisterWaiter,
            checkWaiters
          };

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
           @for Ember.Test
           @property adapter
           @type {Class} The adapter to be used.
           @default Ember.Test.QUnitAdapter
          */
          Object.defineProperty(Test, 'adapter', {
            get: getAdapter,
            set: setAdapter
          });

          const emberTestingLibTest = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: Test
          }, Symbol.toStringTag, { value: 'Module' });

          /**
           @module @ember/test
          */

          /**
            The primary purpose of this class is to create hooks that can be implemented
            by an adapter for various test frameworks.

            @class TestAdapter
            @public
          */

          const Adapter = EmberObject.default.extend({
            /**
              This callback will be called whenever an async operation is about to start.
               Override this to call your framework's methods that handle async
              operations.
               @public
              @method asyncStart
            */
            asyncStart() {},
            /**
              This callback will be called whenever an async operation has completed.
               @public
              @method asyncEnd
            */
            asyncEnd() {},
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
            exception(error) {
              throw error;
            }
          });

          const emberTestingLibAdaptersAdapter = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: Adapter
          }, Symbol.toStringTag, { value: 'Module' });

          /* globals QUnit */

          function isVeryOldQunit(obj) {
            return obj != null && typeof obj.stop === 'function';
          }

          /**
             @module ember
          */
          /**
            This class implements the methods defined by TestAdapter for the
            QUnit testing framework.

            @class QUnitAdapter
            @namespace Ember.Test
            @extends TestAdapter
            @public
          */

          const QUnitAdapter = Adapter.extend({
            init() {
              this.doneCallbacks = [];
            },
            asyncStart() {
              if (isVeryOldQunit(QUnit)) {
                // very old QUnit version
                // eslint-disable-next-line qunit/no-qunit-stop
                QUnit.stop();
              } else {
                this.doneCallbacks.push(QUnit.config.current ? QUnit.config.current.assert.async() : null);
              }
            },
            asyncEnd() {
              // checking for QUnit.stop here (even though we _need_ QUnit.start) because
              // QUnit.start() still exists in QUnit 2.x (it just throws an error when calling
              // inside a test context)
              if (isVeryOldQunit(QUnit)) {
                QUnit.start();
              } else {
                let done = this.doneCallbacks.pop();
                // This can be null if asyncStart() was called outside of a test
                if (done) {
                  done();
                }
              }
            },
            exception(error) {
              QUnit.config.current.assert.ok(false, debug.inspect(error));
            }
          });

          const emberTestingLibAdaptersQunit = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: QUnitAdapter
          }, Symbol.toStringTag, { value: 'Module' });

          /* global self */


          /**
            Sets Ember up for testing. This is useful to perform
            basic setup steps in order to unit test.

            Use `App.setupForTesting` to perform integration tests (full
            application testing).

            @method setupForTesting
            @namespace Ember
            @since 1.5.0
            @private
          */
          function setupForTesting() {
            debug.setTesting(true);
            let adapter = getAdapter();
            // if adapter is not manually set default to QUnit
            if (!adapter) {
              setAdapter(typeof self.QUnit === 'undefined' ? Adapter.create() : QUnitAdapter.create());
            }
          }

          const emberTestingLibSetupForTesting = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: setupForTesting
          }, Symbol.toStringTag, { value: 'Module' });

          EmberApplication.default.reopen({
            /**
             This property contains the testing helpers for the current application. These
             are created once you call `injectTestHelpers` on your `Application`
             instance. The included helpers are also available on the `window` object by
             default, but can be used from this object on the individual application also.
               @property testHelpers
              @type {Object}
              @default {}
              @public
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
            @public
            */
            testing: false,
            /**
              This hook defers the readiness of the application, so that you can start
              the app when your tests are ready to run. It also sets the router's
              location to 'none', so that the window's location will not be modified
              (preventing both accidental leaking of state between tests and interference
              with your testing framework). `setupForTesting` should only be called after
              setting a custom `router` class (for example `App.Router = Router.extend(`).
               Example:
               ```
              App.setupForTesting();
              ```
               @method setupForTesting
              @public
            */
            setupForTesting() {
              setupForTesting();
              this.testing = true;
              this.resolveRegistration('router:main').reopen({
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
              @private
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
              @public
            */
            injectTestHelpers(helperContainer) {
              if (helperContainer) {
                this.helperContainer = helperContainer;
              } else {
                this.helperContainer = window;
              }
              this.reopen({
                willDestroy() {
                  this._super(...arguments);
                  this.removeTestHelpers();
                }
              });
              this.testHelpers = {};
              for (let name in helpers) {
                // SAFETY: It is safe to access a property on an object
                this.originalMethods[name] = this.helperContainer[name];
                // SAFETY: It is not quite as safe to do this, but it _seems_ to be ok.
                this.testHelpers[name] = this.helperContainer[name] = helper(this, name);
                // SAFETY: We checked that it exists
                protoWrap(TestPromise.prototype, name, helper(this, name), helpers[name].meta.wait);
              }
              invokeInjectHelpersCallbacks(this);
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
            removeTestHelpers() {
              if (!this.helperContainer) {
                return;
              }
              for (let name in helpers) {
                this.helperContainer[name] = this.originalMethods[name];
                // SAFETY: This is a weird thing, but it's not technically unsafe here.
                delete TestPromise.prototype[name];
                delete this.testHelpers[name];
                delete this.originalMethods[name];
              }
            }
          });

          // This method is no longer needed
          // But still here for backwards compatibility
          // of helper chaining
          function protoWrap(proto, name, callback, isAsync) {
            // SAFETY: This isn't entirely safe, but it _seems_ to be ok.
            proto[name] = function (...args) {
              if (isAsync) {
                return callback.apply(this, args);
              } else {
                // SAFETY: This is not actually safe.
                return this.then(function () {
                  return callback.apply(this, args);
                });
              }
            };
          }
          function helper(app, name) {
            let helper = helpers[name];
            (!(helper) && debug.assert(`[BUG] Missing helper: ${name}`, helper));
            let fn = helper.method;
            let meta = helper.meta;
            if (!meta.wait) {
              return (...args) => fn.apply(app, [app, ...args]);
            }
            return (...args) => {
              let lastPromise = run(() => resolve(getLastPromise()));

              // wait for last helper's promise to resolve and then
              // execute. To be safe, we need to tell the adapter we're going
              // asynchronous here, because fn may not be invoked before we
              // return.
              asyncStart();
              return lastPromise.then(() => fn.apply(app, [app, ...args])).finally(asyncEnd);
            };
          }

          const emberTestingLibExtApplication = /*#__PURE__*/Object.defineProperty({
                    __proto__: null
          }, Symbol.toStringTag, { value: 'Module' });

          runtime.RSVP.configure('async', function (callback, promise) {
            // if schedule will cause autorun, we need to inform adapter
            runloop._backburner.schedule('actions', () => callback(promise));
          });

          const emberTestingLibExtRsvp = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: runtime.RSVP
          }, Symbol.toStringTag, { value: 'Module' });

          function andThen(app, callback) {
            let wait = app.testHelpers['wait'];
            (!(wait) && debug.assert('[BUG] Missing wait helper', wait));
            return wait(callback(app));
          }

          const emberTestingLibHelpersAndThen = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: andThen
          }, Symbol.toStringTag, { value: 'Module' });

          /**
          @module ember
          */

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
          @public
          */
          function currentPath(app) {
            (!(app.__container__) && debug.assert('[BUG] app.__container__ is not set', app.__container__));
            let routingService = app.__container__.lookup('service:-routing');
            (!(routingService instanceof Internals.RoutingService) && debug.assert('[BUG] service:-routing is not a RoutingService', routingService instanceof Internals.RoutingService));
            return EmberObject.get(routingService, 'currentPath');
          }

          const emberTestingLibHelpersCurrentPath = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: currentPath
          }, Symbol.toStringTag, { value: 'Module' });

          /**
          @module ember
          */
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
          @public
          */
          function currentRouteName(app) {
            (!(app.__container__) && debug.assert('[BUG] app.__container__ is not set', app.__container__));
            let routingService = app.__container__.lookup('service:-routing');
            (!(routingService instanceof Internals.RoutingService) && debug.assert('[BUG] service:-routing is not a RoutingService', routingService instanceof Internals.RoutingService));
            return EmberObject.get(routingService, 'currentRouteName');
          }

          const emberTestingLibHelpersCurrentRouteName = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: currentRouteName
          }, Symbol.toStringTag, { value: 'Module' });

          /**
          @module ember
          */

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
          @public
          */
          function currentURL(app) {
            (!(app.__container__) && debug.assert('[BUG] app.__container__ is not set', app.__container__));
            let router = app.__container__.lookup('router:main');
            (!(router instanceof Router.default) && debug.assert('[BUG] router:main is not a Router', router instanceof Router.default));
            let location = EmberObject.get(router, 'location');
            (!(typeof location !== 'string') && debug.assert('[BUG] location is still a string', typeof location !== 'string'));
            return location.getURL();
          }

          const emberTestingLibHelpersCurrentUrl = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: currentURL
          }, Symbol.toStringTag, { value: 'Module' });

          /**
          @module ember
          */
          let resume;

          /**
           Resumes a test paused by `pauseTest`.

           @method resumeTest
           @return {void}
           @public
          */
          function resumeTest() {
            (!(resume) && debug.assert('Testing has not been paused. There is nothing to resume.', resume));
            resume();
            resume = undefined;
          }

          /**
           Pauses the current test - this is useful for debugging while testing or for test-driving.
           It allows you to inspect the state of your application at any point.
           Example (The test will pause before clicking the button):

           ```javascript
           visit('/')
           return pauseTest();
           click('.btn');
           ```

           You may want to turn off the timeout before pausing.

           qunit (timeout available to use as of 2.4.0):

           ```
           visit('/');
           assert.timeout(0);
           return pauseTest();
           click('.btn');
           ```

           mocha (timeout happens automatically as of ember-mocha v0.14.0):

           ```
           visit('/');
           this.timeout(0);
           return pauseTest();
           click('.btn');
           ```


           @since 1.9.0
           @method pauseTest
           @return {Object} A promise that will never resolve
           @public
          */
          function pauseTest() {
            debug.info('Testing paused. Use `resumeTest()` to continue.');
            return new runtime.RSVP.Promise(resolve => {
              resume = resolve;
            }, 'TestAdapter paused promise');
          }

          const emberTestingLibHelpersPauseTest = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    pauseTest,
                    resumeTest
          }, Symbol.toStringTag, { value: 'Module' });

          /**
            Loads a route, sets up any controllers, and renders any templates associated
            with the route as though a real user had triggered the route change while
            using your app.

            Example:

            ```javascript
            visit('posts/index').then(function() {
              // assert something
            });
            ```

            @method visit
            @param {String} url the name of the route
            @return {RSVP.Promise<undefined>}
            @public
          */
          function visit(app, url) {
            (!(app.__container__) && debug.assert('[BUG] Missing container', app.__container__));
            const router = app.__container__.lookup('router:main');
            (!(router instanceof Router.default) && debug.assert('[BUG] router:main is not a Router', router instanceof Router.default));
            let shouldHandleURL = false;
            app.boot().then(() => {
              (!(typeof router.location !== 'string') && debug.assert('[BUG] router.location is still a string', typeof router.location !== 'string'));
              router.location.setURL(url);
              if (shouldHandleURL) {
                (!(app.__deprecatedInstance__) && debug.assert("[BUG] __deprecatedInstance__ isn't set", app.__deprecatedInstance__));
                runloop.run(app.__deprecatedInstance__, 'handleURL', url);
              }
            });
            if (app._readinessDeferrals > 0) {
              // SAFETY: This should be safe, though it is odd.
              router.initialURL = url;
              runloop.run(app, 'advanceReadiness');
              delete router.initialURL;
            } else {
              shouldHandleURL = true;
            }
            let wait = app.testHelpers['wait'];
            (!(wait) && debug.assert('[BUG] missing wait helper', wait));
            return wait();
          }

          const emberTestingLibHelpersVisit = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: visit
          }, Symbol.toStringTag, { value: 'Module' });

          let requests = [];
          function pendingRequests() {
            return requests.length;
          }
          function clearPendingRequests() {
            requests.length = 0;
          }
          function incrementPendingRequests(_, xhr) {
            requests.push(xhr);
          }
          function decrementPendingRequests(_, xhr) {
            setTimeout(function () {
              for (let i = 0; i < requests.length; i++) {
                if (xhr === requests[i]) {
                  requests.splice(i, 1);
                  break;
                }
              }
            }, 0);
          }

          const emberTestingLibTestPendingRequests = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    clearPendingRequests,
                    decrementPendingRequests,
                    incrementPendingRequests,
                    pendingRequests
          }, Symbol.toStringTag, { value: 'Module' });

          /**
          @module ember
          */

          /**
            Causes the run loop to process any pending events. This is used to ensure that
            any async operations from other helpers (or your assertions) have been processed.

            This is most often used as the return value for the helper functions (see 'click',
            'fillIn','visit',etc). However, there is a method to register a test helper which
            utilizes this method without the need to actually call `wait()` in your helpers.

            The `wait` helper is built into `registerAsyncHelper` by default. You will not need
            to `return app.testHelpers.wait();` - the wait behavior is provided for you.

            Example:

            ```javascript
            import { registerAsyncHelper } from '@ember/test';

            registerAsyncHelper('loginUser', function(app, username, password) {
              visit('secured/path/here')
                .fillIn('#username', username)
                .fillIn('#password', password)
                .click('.submit');
            });
            ```

            @method wait
            @param {Object} value The value to be returned.
            @return {RSVP.Promise<any>} Promise that resolves to the passed value.
            @public
            @since 1.0.0
          */
          function wait(app, value) {
            return new runtime.RSVP.Promise(function (resolve) {
              (!(app.__container__) && debug.assert('[BUG] Missing container', app.__container__));
              const router = app.__container__.lookup('router:main');
              (!(router instanceof Router.default) && debug.assert('[BUG] Expected router:main to be a subclass of Ember Router', router instanceof Router.default)); // Every 10ms, poll for the async thing to have finished
              let watcher = setInterval(() => {
                // 1. If the router is loading, keep polling
                let routerIsLoading = router._routerMicrolib && Boolean(router._routerMicrolib.activeTransition);
                if (routerIsLoading) {
                  return;
                }

                // 2. If there are pending Ajax requests, keep polling
                if (pendingRequests()) {
                  return;
                }

                // 3. If there are scheduled timers or we are inside of a run loop, keep polling
                if (runloop._hasScheduledTimers() || runloop._getCurrentRunLoop()) {
                  return;
                }
                if (checkWaiters()) {
                  return;
                }

                // Stop polling
                clearInterval(watcher);

                // Synchronously resolve the promise
                runloop.run(null, resolve, value);
              }, 10);
            });
          }

          const emberTestingLibHelpersWait = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: wait
          }, Symbol.toStringTag, { value: 'Module' });

          registerAsyncHelper('visit', visit);
          registerAsyncHelper('wait', wait);
          registerAsyncHelper('andThen', andThen);
          registerAsyncHelper('pauseTest', pauseTest);
          registerHelper('currentRouteName', currentRouteName);
          registerHelper('currentPath', currentPath);
          registerHelper('currentURL', currentURL);
          registerHelper('resumeTest', resumeTest);

          const emberTestingLibHelpers = /*#__PURE__*/Object.defineProperty({
                    __proto__: null
          }, Symbol.toStringTag, { value: 'Module' });

          let name = 'deferReadiness in `testing` mode';
          EmberApplication.onLoad('Ember.Application', function (ApplicationClass) {
            if (!ApplicationClass.initializers[name]) {
              ApplicationClass.initializer({
                name: name,
                initialize(application) {
                  if (application.testing) {
                    application.deferReadiness();
                  }
                }
              });
            }
          });

          const emberTestingLibInitializers = /*#__PURE__*/Object.defineProperty({
                    __proto__: null
          }, Symbol.toStringTag, { value: 'Module' });

          // to setup initializer

          const emberTestingLibPublicApi = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    Adapter,
                    QUnitAdapter,
                    Test,
                    setupForTesting
          }, Symbol.toStringTag, { value: 'Module' });

          test.registerTestImplementation(emberTestingLibPublicApi);

          const emberTestingIndex = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    Adapter,
                    QUnitAdapter,
                    Test,
                    setupForTesting
          }, Symbol.toStringTag, { value: 'Module' });

          /* eslint-disable */

          d('ember-testing/index', emberTestingIndex);
          d('ember-testing/lib/adapters/adapter', emberTestingLibAdaptersAdapter);
          d('ember-testing/lib/adapters/qunit', emberTestingLibAdaptersQunit);
          d('ember-testing/lib/ext/application', emberTestingLibExtApplication);
          d('ember-testing/lib/ext/rsvp', emberTestingLibExtRsvp);
          d('ember-testing/lib/helpers', emberTestingLibHelpers);
          d('ember-testing/lib/helpers/and_then', emberTestingLibHelpersAndThen);
          d('ember-testing/lib/helpers/current_path', emberTestingLibHelpersCurrentPath);
          d('ember-testing/lib/helpers/current_route_name', () => emberTestingLibHelpersCurrentRouteName);
          d('ember-testing/lib/helpers/current_url', emberTestingLibHelpersCurrentUrl);
          d('ember-testing/lib/helpers/pause_test', emberTestingLibHelpersPauseTest);
          d('ember-testing/lib/helpers/visit', emberTestingLibHelpersVisit);
          d('ember-testing/lib/helpers/wait', emberTestingLibHelpersWait);
          d('ember-testing/lib/initializers', emberTestingLibInitializers);
          d('ember-testing/lib/public-api', emberTestingLibPublicApi);
          d('ember-testing/lib/setup_for_testing', emberTestingLibSetupForTesting);
          d('ember-testing/lib/test', emberTestingLibTest);
          d('ember-testing/lib/test/adapter', emberTestingLibTestAdapter);
          d('ember-testing/lib/test/helpers', emberTestingLibTestHelpers);
          d('ember-testing/lib/test/on_inject_helpers', emberTestingLibTestOnInjectHelpers);
          d('ember-testing/lib/test/pending_requests', emberTestingLibTestPendingRequests);
          d('ember-testing/lib/test/promise', emberTestingLibTestPromise);
          d('ember-testing/lib/test/run', emberTestingLibTestRun);
          d('ember-testing/lib/test/waiters', emberTestingLibTestWaiters);

})(require('@ember/-internals/runtime'), require('@ember/runloop'), require('@ember/-internals/error-handling'), require('@ember/object'), require('@ember/debug'), require('@ember/application'), require('@ember/routing/-internals'), require('@ember/routing/router'), require('@ember/test'));
//# sourceMappingURL=ember-testing.js.map
