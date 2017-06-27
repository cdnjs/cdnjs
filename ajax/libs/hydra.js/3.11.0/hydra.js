!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["1"], [], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register('2', ['3', '4'], function (_export) {

  /**
   * Sugar function to create a new Deferred object.
   * When expects Promise objects to be added to the Deferred object [Promise1, Promise2,...PromiseN]
   * If one of the arguments is not a Promise When assume that we want to complete the Deferred object
   * @private
   */
  'use strict';

  var copyArray, getPromise, getThenCallbacks;

  _export('default', When);

  function When() {
    var aArgs, nArg, nLenArgs, oPromise, oArg, oData, aSolutions;
    aArgs = copyArray(arguments);
    nLenArgs = aArgs.length;
    oPromise = getPromise();
    oData = {
      nLenPromisesResolved: 0
    };
    aSolutions = [];

    if (aArgs.length === 0) {
      oPromise.resolve();
    } else {
      for (nArg = 0; nArg < nLenArgs; nArg++) {
        oArg = aArgs[nArg];
        oArg.then(getThenCallbacks(nArg, 'resolve', oData, nLenArgs, oPromise, aSolutions), getThenCallbacks(nArg, 'reject', oData, nLenArgs, oPromise, aSolutions));
      }
    }

    return oPromise;
  }

  return {
    setters: [function (_) {
      copyArray = _.copyArray;
    }, function (_2) {
      getPromise = _2.getPromise;
      getThenCallbacks = _2.getThenCallbacks;
    }],
    execute: function () {}
  };
});

$__System.register('5', ['3', '6'], function (_export) {
  'use strict';

  var getRoot, createMapping, getMappingMaps, namespace;

  _export('setNamespace', setNamespace);

  _export('getNamespace', getNamespace);

  function setNamespace(_namespace) {
    namespace = _namespace;
    createMapping(getMappingMaps(), 'ns_', namespace);
  }

  function getNamespace() {
    return namespace;
  }

  return {
    setters: [function (_) {
      getRoot = _.getRoot;
    }, function (_2) {
      createMapping = _2.createMapping;
      getMappingMaps = _2.getMappingMaps;
    }],
    execute: function () {
      namespace = getRoot();
    }
  };
});

$__System.register('7', ['3', '8', '9'], function (_export) {
  'use strict';

  var isTypeOf, sNotDefined, iterateObject, copyArray, clone, getDebug, errorHandler, und, oChannels;

  /**
   * _removeSubscribers remove the subscribers to one channel and return the number of
   * subscribers that have been unsubscribed.
   * @param {Array<Object>} aSubscribers
   * @param {Object} oSubscriber
   * @return {Number}
   * @private
   */
  function _removeSubscribers(aSubscribers, oSubscriber) {
    var nUnsubscribed = 0;
    if (!isTypeOf(aSubscribers, sNotDefined)) {
      var nIndex = aSubscribers.length - 1;
      for (; nIndex >= 0; nIndex--) {
        if (aSubscribers[nIndex].subscriber === oSubscriber) {
          nUnsubscribed++;
          aSubscribers.splice(nIndex, 1);
        }
      }
    }
    return nUnsubscribed;
  }
  /**
   * Loops per all the events to remove subscribers.
   * @param {Object} oEventsCallbacks
   * @param {String} sChannelId
   * @param {Object} oSubscriber
   * @return {Number}
   * @private
   */
  function _removeSubscribersPerEvent(oEventsCallbacks, sChannelId, oSubscriber) {
    var nUnsubscribed = 0;
    iterateObject(oEventsCallbacks, function (oItem, sEvent) {
      var aEventsParts = sEvent.split(':');
      var sChannel = sChannelId;
      var sEventType = sEvent;
      if (aEventsParts[0] === 'global') {
        sChannel = aEventsParts[0];
        sEventType = aEventsParts[1];
      }
      nUnsubscribed += _removeSubscribers(oChannels[sChannel][sEventType], oSubscriber);
    });
    return nUnsubscribed;
  }
  /**
   * _addSubscribers add all the events of one channel from the subscriber
   * @param {Object} oEventsCallbacks
   * @param {String} sChannelId
   * @param {Object} oSubscriber
   * @private
   */
  function _addSubscribers(oEventsCallbacks, sChannelId, oSubscriber) {
    iterateObject(oEventsCallbacks, function (oItem, sEvent) {
      subscribeTo(sChannelId, sEvent, oItem, oSubscriber);
    });
  }
  /**
   * _getChannelEvents return the events array in channel.
   * @param {String} sChannelId
   * @param {String} sEvent
   * @return {Object}
   * @private
   */
  function _getChannelEvents(sChannelId, sEvent) {
    if (oChannels[sChannelId] === und) {
      oChannels[sChannelId] = {};
    }
    if (oChannels[sChannelId][sEvent] === und) {
      oChannels[sChannelId][sEvent] = [];
    }
    return oChannels[sChannelId][sEvent];
  }

  /**
   * subscribersByEvent return all the subscribers of the event in the channel.
   * @param {Object} oChannel
   * @param {String} sEventName
   * @return {Array<Object>}
   * @private
   */
  function subscribersByEvent(oChannel, sEventName) {
    var aSubscribers = [];
    if (!isTypeOf(oChannel, sNotDefined)) {
      iterateObject(oChannel, function (oItem, sKey) {
        if (sKey === sEventName) {
          aSubscribers = oItem;
        }
      });
    }
    return aSubscribers;
  }
  /**
   * Sets the preprocessor of data before send the data to handlers.
   * @param {Function} fpCallback
   */
  function preprocessorPublishData(fpCallback) {
    preprocessorsPublishData = function (oData) {
      return fpCallback(oData, clone);
    };
  }
  /**
   * Method to add a single callback in one channel an in one event.
   * @param {String} sChannelId
   * @param {String} sEventType
   * @param {Function} fpHandler
   * @param {Object} oSubscriber
   */
  function subscribeTo(sChannelId, sEventType, fpHandler, oSubscriber) {
    var aChannelEvents = _getChannelEvents(sChannelId, sEventType);
    aChannelEvents.push({
      subscriber: oSubscriber,
      handler: fpHandler
    });
  }
  /**
   * subscribers return the array of subscribers to one channel and event.
   * @param {String} sChannelId
   * @param {String} sEventName
   * @return {Array<Object>}
   */
  function subscribers(sChannelId, sEventName) {
    return subscribersByEvent(oChannels[sChannelId], sEventName);
  }
  /**
   * Method to unsubscribe a subscriber from a channel and event type.
   * It iterates in reverse order to avoid messing with array length when removing items.
   * @param {String} sChannelId
   * @param {String} sEventType
   * @param {Object} oSubscriber
   */
  function unsubscribeFrom(sChannelId, sEventType, oSubscriber) {
    var aChannelEvents = _getChannelEvents(sChannelId, sEventType);
    for (var nEvent = aChannelEvents.length - 1; nEvent >= 0; nEvent--) {
      var oItem = aChannelEvents[nEvent];
      if (oItem.subscriber === oSubscriber) {
        aChannelEvents.splice(nEvent, 1);
      }
    }
  }
  /**
   * subscribe method gets the oEventsCallbacks object with all the handlers and add these handlers to the channel.
   * @param {Object} oSubscriber
   * @return {Boolean}
   */
  function subscribe(oSubscriber) {
    var oEventsCallbacks = oSubscriber.events;
    if (!oSubscriber || oEventsCallbacks === und) {
      return false;
    }
    iterateObject(oEventsCallbacks, function (oItem, sChannelId) {
      if (oChannels[sChannelId] === und) {
        oChannels[sChannelId] = {};
      }
      _addSubscribers(oItem, sChannelId, oSubscriber);
    });

    return true;
  }
  /**
   * unsubscribe gets the oEventsCallbacks methods and removes the handlers of the channel.
   * @param {Object} oSubscriber
   * @return {Boolean}
   */
  function unsubscribe(oSubscriber) {
    var nUnsubscribed = 0;
    var oEventsCallbacks = oSubscriber.events;
    if (!oSubscriber || oEventsCallbacks === und) {
      return false;
    }
    iterateObject(oEventsCallbacks, function (oItem, sChannelId) {
      if (oChannels[sChannelId] === und) {
        oChannels[sChannelId] = {};
      }
      nUnsubscribed = _removeSubscribersPerEvent(oItem, sChannelId, oSubscriber);
    });

    return nUnsubscribed > 0;
  }
  /**
   * Method to execute handlers
   * @param {Object} oHandlerObject
   * @param {Object} oData
   * @param {String} sChannelId
   * @param {String} sEvent
   */
  function _executeHandler(oHandlerObject, oData, sChannelId, sEvent) {
    oHandlerObject.handler.call(oHandlerObject.subscriber, oData);
    if (getDebug()) {
      var ErrorHandler = errorHandler();
      ErrorHandler.log(sChannelId, sEvent, oHandlerObject);
    }
  }
  /**
   * Makes changes in oData before passing it to handler.
   * @param {Object} oData
   * @returns {*}
   */
  function preprocessorsPublishData(oData) {
    return oData;
  }
  /**
   * Reset channels
   */
  function reset() {
    oChannels = {
      global: {}
    };
  }
  /**
   * Publish the event in one channel.
   * @param {String} sChannelId
   * @param {String} sEvent
   * @param {String} oData
   * @return {Boolean}
   */
  function publish(sChannelId, sEvent, oData) {
    var aSubscribers = copyArray(this.subscribers(sChannelId, sEvent));
    var oSubscriber = undefined;
    var nLenSubscribers = aSubscribers.length;
    if (nLenSubscribers === 0) {
      return false;
    }
    oData = preprocessorsPublishData(oData);
    while (!!(oSubscriber = aSubscribers.shift())) {
      _executeHandler(oSubscriber, oData, sChannelId, sEvent);
    }
    return true;
  }
  /**
   * To be used about extension, it will return a deep copy of the Channels object to avoid modifying the original
   * object.
   * @type {Function}
   * @return {Object}
   * @static
   */
  function getCopyChannels() {
    return clone(oChannels);
  }
  /**
   * Bus is the object that must be used to manage the notifications by channels
   * @name Bus
   */
  return {
    setters: [function (_3) {
      isTypeOf = _3.isTypeOf;
      sNotDefined = _3.sNotDefined;
      iterateObject = _3.iterateObject;
      copyArray = _3.copyArray;
      clone = _3.clone;
    }, function (_) {
      getDebug = _.getDebug;
    }, function (_2) {
      errorHandler = _2.errorHandler;
    }],
    execute: function () {
      und = undefined;

      /**
       * Private object to save the channels for communicating event driven
       * @type {Object}
       * @private
       */
      oChannels = {
        global: {}
      };

      _export('default', {
        subscribers: subscribers,
        unsubscribeFrom: unsubscribeFrom,
        subscribeTo: subscribeTo,
        subscribe: subscribe,
        unsubscribe: unsubscribe,
        publish: publish,
        preprocessorPublishData: preprocessorPublishData,
        reset: reset,
        getCopyChannels: getCopyChannels,
        __type__: 'bus'
      });
    }
  };
});

$__System.register('a', ['3'], function (_export) {
  /**
   * Private variables object to be shared between modules
   * @type {Object}
   * @private
   */
  'use strict';

  var simpleMerge, isTypeOf, sNotDefined, oVars;

  /**
   * Reset the vars object
   * @member Module.prototype
   */

  _export('setVars', setVars);

  /**
   * Returns the private vars object by copy.
   * @return {Object} global vars.
   */

  _export('resetVars', resetVars);

  _export('getVars', getVars);

  /**
   * Sets an object of vars and add it's content to oVars private variable
   * @member Module.prototype
   * @param {Object} oVar
   */

  function setVars(oVar) {
    if (!isTypeOf(oVars, sNotDefined)) {
      oVars = simpleMerge(oVars, oVar);
    } else {
      oVars = oVar;
    }
  }

  function resetVars() {
    oVars = {};
  }

  function getVars() {
    return simpleMerge({}, oVars);
  }

  return {
    setters: [function (_) {
      simpleMerge = _.simpleMerge;
      isTypeOf = _.isTypeOf;
      sNotDefined = _.sNotDefined;
    }],
    execute: function () {
      oVars = {};
    }
  };
});

$__System.register('b', ['3'], function (_export) {
  'use strict';

  var clone, oModules;

  _export('getCopyModules', getCopyModules);

  _export('getModules', getModules);

  _export('resetModules', resetModules);

  function getCopyModules() {
    return clone(oModules);
  }

  function getModules() {
    return oModules;
  }

  function resetModules() {
    oModules = {};
  }

  return {
    setters: [function (_) {
      clone = _.clone;
    }],
    execute: function () {
      oModules = {};
    }
  };
});

$__System.register("8", [], function (_export) {
  "use strict";

  var bDebug;

  _export("setDebug", setDebug);

  _export("getDebug", getDebug);

  function setDebug(_bDebug) {
    bDebug = _bDebug;
  }

  function getDebug() {
    return bDebug;
  }

  return {
    setters: [],
    execute: function () {
      bDebug = false;
    }
  };
});

$__System.register('4', ['3'], function (_export) {
  /**
   * Returns the promise callback by type
   * @param {Object}oContext
   * @param {String} sType
   * @return {Function}
   * @private
   */
  'use strict';

  var nullFunc;

  _export('default', Promise);

  /**
   * Promise is a class that must/can be used to defer execution of one or some callbacks when one
   * condition (normally some asynchronous callbacks that are depending one of other)
   * @class Promise
   * @param {Function} fpCallback
   * @constructor
   * @name Promise
   */

  /**
   * Returns an instance of Promise
   * @param {Function} [fpCallback]
   * @returns {Promise}
   * @private
   */

  _export('getThenCallbacks', getThenCallbacks);

  _export('getPromise', getPromise);

  function getPromiseCallbacks(oContext, sType) {
    return function () {
      var aCompleted,
          nLenPromises,
          oDeferred,
          aPromises,
          nPromise,
          oPromise,
          aResults = [];
      oContext.bCompleted = true;
      oContext.sType = sType;
      oContext.oResult = arguments;
      while (oContext.aPending[0]) {
        oContext.aPending.shift()[sType].apply(oContext, arguments);
      }
      oDeferred = oContext.oDeferred;
      if (oDeferred) {
        aCompleted = [];
        aPromises = oDeferred.aPromises;
        nLenPromises = aPromises.length;
        aResults = [];
        for (nPromise = 0; nPromise < nLenPromises; nPromise++) {
          oPromise = aPromises[nPromise];
          aCompleted.push(Number(oPromise.bCompleted));
          aResults.push(oPromise.oResult);
        }
        if (aCompleted.join('').indexOf('0') === -1) {
          oDeferred[sType].apply(oDeferred, aResults);
        }
      }
    };
  }
  function Promise(fpCallback) {
    // Pending callbacks
    this.oDeferred = null;
    this.aResults = [];
    this.aPromises = [];
    this.aPending = [];
    this.bCompleted = false;
    this.sType = '';
    this.oResult = null;
    fpCallback = fpCallback || nullFunc; // Made to be compatible with previous versions not ES6 compliant.

    // Must be called when something finished successfully
    this.resolve = getPromiseCallbacks(this, 'resolve');
    // Must be called when something fails
    this.reject = getPromiseCallbacks(this, 'reject');
    fpCallback(this.resolve, this.reject);
  }

  /**
   * Returns the callback to be executed when needed.
   * @param {Number} nIndex
   * @param {String} sType
   * @param {Object} oData
   * @param {Number} nLenArgs
   * @param {Promise} oPromise
   * @param {Array} aSolutions
   * @return {Function}
   * @private
   */

  function getThenCallbacks(nIndex, sType, oData, nLenArgs, oPromise, aSolutions) {
    return function (oObj) {
      oData.nLenPromisesResolved++;
      aSolutions[nIndex] = oObj;
      if (nLenArgs === oData.nLenPromisesResolved) {
        oPromise[sType].apply(oPromise, aSolutions);
      }
    };
  }

  function getPromise(fpCallback) {
    return new Promise(fpCallback);
  }

  return {
    setters: [function (_) {
      nullFunc = _.nullFunc;
    }],
    execute: function () {

      Promise.prototype = {

        /**
         * Adds new callbacks to execute when the promise has been completed
         * @member Promise.prototype
         * @param {Function} fpSuccess
         * @param {Function} fpFailure
         * @return {Promise} Promise instance
         */
        then: function then(fpSuccess, fpFailure) {
          var oResult = this.oResult;
          if (this.bCompleted) {
            if (this.sType === 'resolve') {
              fpSuccess.apply(fpSuccess, oResult);
            } else {
              fpFailure.apply(fpFailure, oResult);
            }
          } else {
            this.aPending.push({ resolve: fpSuccess, reject: fpFailure });
          }
          return this;
        },

        /**
         * Adds a new callback to be executed when the promise is resolved.
         * @member Promise.prototype
         * @param {Function} fpSuccess
         */
        done: function done(fpSuccess) {
          return this.then(fpSuccess, nullFunc);
        },

        /**
         * Adds a new callback to be executed when the promise is rejected.
         * @member Promise.prototype
         * @param {Function} fpFailure
         */
        fail: function fail(fpFailure) {
          return this.then(nullFunc, fpFailure);
        },

        /**
         * Sugar function to create a new Deferred object.
         * When expects Promise objects to be added to the Deferred object [Promise1, Promise2,...PromiseN]
         * If one of the arguments is not a Promise When assume that we want to complete the Deferred object
         */
        all: function all() {
          return When.apply(When, arguments);
        },
        /**
         * Adds a new callback to be executed when the promise is rejected.
         * According with the new
         * @member Promise.prototype
         * @param {Function} fpFailure
         */
        'catch': function _catch(fpFailure) {
          return this.fail(fpFailure);
        },
        /**
         * Adds a new promise to be used as a Deferred object.
         * @param oPromise
         * @returns {*}
         */
        add: function add(oPromise) {
          oPromise.oDeferred = this;
          this.aPromises.push(oPromise);
          return this;
        }
      };
    }
  };
});

$__System.register('c', ['3', 'd'], function (_export) {
  /**
   * Module to be stored, adds two methods to start and extend modules.
   * @param {String} sModuleId
   * @param {Function} fpCreator
   * @constructor
   * @class FakeModule
   * @name FakeModule
   * @private
   */

  'use strict';

  var isTypeOf, sNotDefined, Module;
  function FakeModule(sModuleId, fpCreator) {
    if (isTypeOf(fpCreator, sNotDefined)) {
      throw new Error('Something goes wrong!');
    }
    this.creator = fpCreator;
    this.instances = {};
    this.sModuleId = sModuleId;
  }

  return {
    setters: [function (_) {
      isTypeOf = _.isTypeOf;
      sNotDefined = _.sNotDefined;
    }, function (_d) {
      Module = _d['default'];
    }],
    execute: function () {
      FakeModule.prototype = {

        /**
         * Wraps the module start
         * @member FakeModule.prototype
         * @param {Object} oData
         * @return {FakeModule}
         */
        start: function start(oData) {
          Module.start(this.sModuleId, oData);
          return this;
        },

        /**
         * Wraps the module extend
         * @member FakeModule.prototype
         * @param {String|Function} oSecondParameter
         * @param {Array|Function} oThirdParameter
         * @param {Function} oFourthParameter
         * @return {FakeModule}
         */
        extend: function extend(oSecondParameter, oThirdParameter, oFourthParameter) {
          Module.extend(this.sModuleId, oSecondParameter, oThirdParameter, oFourthParameter);
          return this;
        },

        /**
         * Wraps the module stop
         * @member FakeModule.prototype
         * @return {FakeModule}
         */
        stop: function stop() {
          Module.stop(this.sModuleId);
          return this;
        }
      };

      _export('default', FakeModule);
    }
  };
});

$__System.register('d', ['3', '4', '6', '7', '8', '9', 'a', 'b', 'c'], function (_export) {
  'use strict';

  var isTypeOf, sNotDefined, iterateObject, isFunction, nullFunc, copyArray, simpleMerge, sFunctionType, generateUniqueKey, getSimpleFunction, getObjectLength, isInstanceOf, isArray, getPromise, resolveDependencies, createMapping, getMappingMaps, Bus, getDebug, errorHandler, resetVars, setVars, getVars, getModules, resetModules, FakeModule, __super__, instances, __type__, oModifyInit, type, Module;

  /**
   * Add common properties and methods to avoid repeating code in modules
   * @param {String} sModuleId
   * @param {Array} aDependencies
   * @param {Function} fpCallback
   * @private
   */

  _export('extendModifyInit', extendModifyInit);

  /**
   * getInstance is the method that will create the module instance and wrap the method if needed.
   * @param {String} sModuleId
   * @param {Array} [aDependencies]
   * @param {Function} fpCallback
   * @private
   */

  _export('isModuleStarted', isModuleStarted);

  /**
   * Return the message to show when a module is not registered
   * @param {String} sModuleId
   * @param {Boolean} [bThrow]
   * @return {String}
   * @private
   */
  function fpThrowErrorModuleNotRegistered(sModuleId, bThrow) {
    var sMessage = 'The module ' + sModuleId + ' is not registered in the system';
    if (bThrow) {
      throw new Error(sMessage);
    }
    return sMessage;
  }

  function extendModifyInit(oVar) {
    simpleMerge(oModifyInit, oVar);
  }

  function addPropertiesAndMethodsToModule(sModuleId, aDependencies, fpCallback) {
    var oPromise;

    function success(mapping) {
      var oModules = getModules();
      var oModule, fpInitProxy;
      oModule = oModules[sModuleId].creator.apply(oModules[sModuleId], [].slice.call(arguments, 1));
      oModule.__children__ = [];
      oModule.dependencies = aDependencies || [].slice.call(arguments, 1);
      oModule.resolvedDependencies = mapping;
      oModule.__module_id__ = sModuleId;
      fpInitProxy = oModule.init || nullFunc;
      // Provide compatibility with old versions of Hydra.js
      oModule.__action__ = oModule.__sandbox__ = Bus;
      oModule.events = oModule.events || {};
      oModule.init = function () {
        var aArgs = copyArray(arguments).concat(getVars());
        if (oModule.__children__.length === 0) {
          // Only subscribe last element of inheritance.
          Bus.subscribe(oModule);
        }
        return fpInitProxy.apply(this, aArgs);
      };
      oModule.handleAction = function (oNotifier) {
        var fpCallback = this.events[oNotifier.type];
        if (isTypeOf(fpCallback, sNotDefined)) {
          return;
        }
        fpCallback.call(this, oNotifier);
      };
      // Provide compatibility with old Hydra versions which used to use "destroy" as onDestroy hook.
      oModule.onDestroy = oModule.onDestroy || oModule.destroy || function () {};
      oModule.destroy = function () {
        this.onDestroy();
        Bus.unsubscribe(oModule);
        delete oModules[sModuleId].instances[oModule.__instance_id__];
      };
      fpCallback(oModule);
    }

    oPromise = resolveDependencies(sModuleId, aDependencies);
    oPromise.then(function () {
      success.apply(success, arguments);
    });
  }
  /**
   * Checks if module was already successfully started
   * @member Module.prototype
   * @param {String} sModuleId Name of the module
   * @param {String} [sInstanceId] Id of the instance
   * @return {Boolean}
   */

  function isModuleStarted(sModuleId, sInstanceId) {
    var oModules = getModules();
    var bStarted = false,
        bModuleDefined = isTypeOf(oModules[sModuleId], sNotDefined);
    if (isTypeOf(sInstanceId, sNotDefined)) {
      bStarted = !bModuleDefined && getObjectLength(oModules[sModuleId].instances) > 0;
    } else {
      bStarted = !bModuleDefined && !isTypeOf(oModules[sModuleId].instances[sInstanceId], sNotDefined);
    }
    return bStarted;
  }

  function getInstance(sModuleId, aDependencies, fpCallback) {
    var oModules = getModules();
    if (isTypeOf(oModules[sModuleId], sNotDefined)) {
      fpThrowErrorModuleNotRegistered(sModuleId, true);
    }
    addPropertiesAndMethodsToModule(sModuleId, aDependencies, function (oInstance) {
      if (!getDebug()) {
        iterateObject(oInstance, function (oItem, sName) {
          if (isFunction(oItem)) {
            wrapMethod(oInstance, sName, sModuleId, oInstance[sName]);
          }
        });
      }
      fpCallback(oInstance);
    });
  }
  /**
   * wrapMethod is a method to wrap the original method to avoid failing code.
   * This will be only called if bDebug flag is set to false.
   * @param {Object} oInstance
   * @param {String} sName
   * @param {String} sModuleId
   * @param {Function} fpMethod
   * @private
   */
  function wrapMethod(oInstance, sName, sModuleId, fpMethod) {
    oInstance[sName] = (function (sName, fpMethod) {
      return function () {
        var aArgs = copyArray(arguments);
        try {
          return fpMethod.apply(this, aArgs);
        } catch (erError) {
          var ErrorHandler = errorHandler();
          ErrorHandler.error(sModuleId, sName, erError);
          return false;
        }
      };
    })(sName, fpMethod);
  }

  /**
   * register is the method that will add the new module to the oModules object.
   * sModuleId will be the key where it will be stored.
   * @param {String} sModuleId
   * @param {Array} aDependencies
   * @param {Function | *} fpCreator
   * @return {Object}
   */
  function register(sModuleId, aDependencies, fpCreator) {
    var oModules = getModules();
    if (isFunction(aDependencies)) {
      fpCreator = aDependencies;
      aDependencies = ['$$_bus', '$$_module', '$$_log', 'gl_Hydra'];
    }
    oModules[sModuleId] = new FakeModule(sModuleId, fpCreator);

    oModules[sModuleId].dependencies = aDependencies;
    return oModules[sModuleId];
  }
  /**
   * Method to set an instance of a module
   * @param {String} sModuleId
   * @param {String} sIdInstance
   * @param {Module} oInstance
   * @return {Module}
   */
  function setInstance(sModuleId, sIdInstance, oInstance) {
    var oModules = getModules();
    var oModule = oModules[sModuleId];
    if (!oModule) {
      fpThrowErrorModuleNotRegistered(sModuleId, true);
    }
    oModule.instances[sIdInstance] = oInstance;
    return oModule;
  }
  /**
   * start more than one module at the same time.
   * @param {Object} oInstance
   * @param {Array<String>} aModulesIds
   * @param {String} sIdInstance
   * @param {Object} oData
   * @param {Boolean} bSingle
   * @private
   */
  function _multiModuleStart(oInstance, aModulesIds, sIdInstance, oData, bSingle) {
    var aInstancesIds, aData, aSingle, nIndex, nLenModules, sModuleId;
    if (isArray(sIdInstance)) {
      aInstancesIds = copyArray(sIdInstance);
    }
    if (isArray(oData)) {
      aData = copyArray(oData);
    }
    if (isArray(bSingle)) {
      aSingle = copyArray(bSingle);
    }
    for (nIndex = 0, nLenModules = aModulesIds.length; nIndex < nLenModules; nIndex++) {
      sModuleId = aModulesIds[nIndex];
      sIdInstance = aInstancesIds && aInstancesIds[nIndex] || generateUniqueKey();
      oData = aData && aData[nIndex] || oData;
      bSingle = aSingle && aSingle[nIndex] || bSingle;
      startSingleModule(oInstance, sModuleId, sIdInstance, oData, bSingle);
    }
  }
  /**
   * Method to modify the init method to use it for extend.
   * @param {Object} oInstance
   * @param {Object} oData
   * @param {Boolean} bSingle
   * @private
   */
  function beforeInit(oInstance, oData, bSingle) {
    iterateObject(oModifyInit, function (oMember) {
      if (oMember && isTypeOf(oMember, sFunctionType)) {
        oMember(oInstance, oData, bSingle);
      }
    });
  }
  /**
   * startSingleModule is the method that will initialize the module.
   * When start is called the module instance will be created and the init method is called.
   * If bSingle is true and the module is started the module will be stopped before instance it again.
   * This avoid execute the same listeners more than one time.
   * @param {Object} oWrapper
   * @param {String} sModuleId
   * @param {String} sIdInstance
   * @param {Object} oData
   * @param {Boolean} bSingle
   * @private
   */
  function startSingleModule(oWrapper, sModuleId, sIdInstance, oData, bSingle) {
    var oModules = getModules();
    var oModule;
    oModule = oModules[sModuleId];
    if (bSingle && isModuleStarted(sModuleId) || isModuleStarted(sModuleId, sIdInstance)) {
      oWrapper.stop(sModuleId, sIdInstance);
    }
    if (!isTypeOf(oModule, sNotDefined)) {
      createInstance(sModuleId, undefined, function (oInstance) {
        oModule.instances[sIdInstance] = oInstance;
        oInstance.__instance_id__ = sIdInstance;

        beforeInit(oInstance, oData, bSingle);

        if (!isTypeOf(oData, sNotDefined)) {
          oInstance.init(oData);
        } else {
          oInstance.init();
        }
      });
    } else {
      var ErrorHandler = errorHandler();
      ErrorHandler.error(new Error(), fpThrowErrorModuleNotRegistered(sModuleId));
    }
  }

  /**
   * Start only one module.
   * @param {Object} oInstance
   * @param {String} sModuleId
   * @param {String} sIdInstance
   * @param {Object} oData
   * @param {Boolean|*} bSingle
   * @private
   */
  function _singleModuleStart(oInstance, sModuleId, sIdInstance, oData, bSingle) {
    if (!isTypeOf(sIdInstance, 'string')) {
      bSingle = oData;
      oData = sIdInstance;
      sIdInstance = generateUniqueKey();
    }

    startSingleModule(oInstance, sModuleId, sIdInstance, oData, bSingle);
  }
  /**
   * start is the method that initialize the module/s
   * If you use array instead of arrays you can start more than one module even adding the instance,
   * the data and if it must be executed as single module start.
   * @param {String|Array} oModuleId
   * @param {String|Array} [oIdInstance]
   * @param {Object|Array} [oData]
   * @param {Boolean|Array} [oSingle]
   */
  function start(oModuleId, oIdInstance, oData, oSingle) {
    var bStartMultipleModules = isArray(oModuleId);

    if (bStartMultipleModules) {
      _multiModuleStart(this, copyArray(oModuleId), oIdInstance, oData, oSingle);
    } else {
      _singleModuleStart(this, oModuleId, oIdInstance, oData, oSingle);
    }
  }
  /**
   * createInstance is the method that will create the module instance and wrap the method if needed.
   * @param {String} sModuleId
   * @param {Array|undefined} [aDependencies]
   * @param {Function} fpCallback
   * @private
   */
  function createInstance(sModuleId, aDependencies, fpCallback) {
    var oModules = getModules();
    if (isTypeOf(oModules[sModuleId], sNotDefined)) {
      fpThrowErrorModuleNotRegistered(sModuleId, true);
    }
    addPropertiesAndMethodsToModule(sModuleId, aDependencies, function (oInstance) {
      if (!getDebug()) {
        iterateObject(oInstance, function (oItem, sName) {
          if (isFunction(oItem)) {
            wrapMethod(oInstance, sName, sModuleId, oInstance[sName]);
          }
        });
      }
      fpCallback(oInstance);
    });
  }
  /**
   * Sets properties and methods from a template object.
   * @param {Object} oMethodsObject
   * @param {Object} oPropertiesObject
   * @returns {Function}
   */
  function getCallbackToSetObjectFromTemplate(oMethodsObject, oPropertiesObject) {
    return function (oValue, sKey) {
      if (typeof oValue === 'function') {
        oMethodsObject[sKey] = getSimpleFunction(oValue);
      } else if (isArray(oValue)) {
        oPropertiesObject[sKey] = copyArray(oValue);
      } else if (typeof oValue === 'object' && oValue !== null) {
        oPropertiesObject[sKey] = simpleMerge({}, oValue);
      } else if (isInstanceOf(oValue, Date)) {
        oPropertiesObject[sKey] = new Date();
        oPropertiesObject[sKey].setTime(oValue.getTime());
      } else {
        oPropertiesObject[sKey] = oValue;
      }
    };
  }

  /**
   * Method to extend modules using inheritance or decoration pattern
   * @param {String} sBaseModule
   * @param {String|Function} sModuleDecorated
   * @param {Array|Function} aDependencies
   * @param {Function} fpDecorator
   * @return {Promise}
   */
  function extend(sBaseModule, sModuleDecorated, aDependencies, fpDecorator) {
    var oModules = getModules();
    var oModule = oModules[sBaseModule],
        oDecorated,
        oPromise;
    oPromise = getPromise();
    if (!oModule) {
      var ErrorHandler = errorHandler();
      ErrorHandler.log(fpThrowErrorModuleNotRegistered(sBaseModule));
      oPromise.resolve(null);
      return oPromise;
    }

    createInstance(sBaseModule, aDependencies, function (oInstance) {
      var oPromise2,
          aNoDependencies = ['$$_bus', '$$_module', '$$_log', 'gl_Hydra'];

      if (isTypeOf(sModuleDecorated, sFunctionType)) {
        fpDecorator = sModuleDecorated;
        sModuleDecorated = sBaseModule;
        aDependencies = aNoDependencies;
      }
      if (isTypeOf(aDependencies, sFunctionType)) {
        fpDecorator = aDependencies;
        aDependencies = aNoDependencies;
      }
      oPromise2 = resolveDependencies(sModuleDecorated, aDependencies);
      oPromise2.then(function () {
        var oModules = getModules();
        var oParentProperties = {},
            oParentMethods = {},
            Parent,
            Child;
        oModules[sModuleDecorated] = new FakeModule(sModuleDecorated, function () {
          var aDepends = [].slice.call(arguments);
          aDepends.push(oInstance);
          // If we extend the module with the different name, we
          // create proxy class for the original methods.

          oDecorated = fpDecorator.apply(fpDecorator, aDepends);

          if (isTypeOf(sBaseModule, 'string') && isTypeOf(sModuleDecorated, 'string')) {
            oInstance.__children__.push(oDecorated);
          }

          iterateObject(oInstance, getCallbackToSetObjectFromTemplate(oParentMethods, oParentProperties));

          Parent = function () {
            var self = this;
            iterateObject(oParentProperties, function (oValue, sKey) {
              self[sKey] = oValue;
            });
          };
          Parent.prototype = oParentMethods;

          Child = function () {
            var self = this,
                _super = oParentMethods;
            Parent.apply(self, arguments);

            _super.parentModule = sBaseModule;
            iterateObject(oDecorated, getCallbackToSetObjectFromTemplate(self, self));
            this.uber = _super;

            if (oInstance.uber) {
              _super.uber = {};
              iterateObject(oInstance.uber, function (oValue, sKey) {
                var fpCallback = getSimpleFunction(oValue, self);
                if (!self.uber[sKey]) {
                  self.uber[sKey] = fpCallback;
                }
                // If the son does not have the method but the parent has then the son should have it too.
                _super.uber[sKey] = fpCallback;
              });
            }

            this.__children__ = [];
            this.__super__ = {
              __call__: function __call__(sKey, aArgs) {
                return oInstance[sKey].apply(self, aArgs);
              }
            };
          };
          Child.prototype = new Parent();

          return new Child();
        });
        oModules[sModuleDecorated].dependencies = aDependencies;
        oPromise.resolve(oModules[sModuleDecorated]);
      });
    });
    return oPromise;
  }
  /**
   * Alias decorate to extend modules.
   * @return {Promise}
   */
  function decorate() {
    return this.extend.apply(this, arguments);
  }
  /**
   * startAll is the method that will initialize all the registered modules.
   * @member Module.prototype
   */
  function startAll() {
    var oModules = getModules();
    iterateObject(oModules, function (_oModule, sModuleId) {
      if (!isTypeOf(_oModule, sNotDefined)) {
        start(sModuleId, generateUniqueKey());
      }
    });
  }
  /**
   * stop is the method that will finish the module if it was registered and started.
   * When stop is called the module will call the destroy method and will nullify the instance.
   * @param {String} sModuleId
   * @param {String} [sInstanceId]
   * @return {Boolean}
   */
  function stop(sModuleId, sInstanceId) {
    var oModules = getModules();
    var oModule;
    oModule = oModules[sModuleId];
    if (isTypeOf(oModule, sNotDefined)) {
      return false;
    }
    if (!isTypeOf(sInstanceId, sNotDefined)) {
      _singleModuleStop(oModule, sInstanceId);
    } else {
      _multiModuleStop(oModule);
    }
    return true;
  }
  /**
   * stop more than one module at the same time.
   * @param {Object} oModule
   * @private
   */
  function _multiModuleStop(oModule) {
    iterateObject(oModule.instances, function (oInstance) {
      if (!isTypeOf(oModule, sNotDefined) && !isTypeOf(oInstance, sNotDefined)) {
        oInstance.destroy();
      }
    });
    oModule.instances = {};
  }
  /**
   * Stop only one module.
   * @param {Object} oModule
   * @param {String} sInstanceId
   * @private
   */
  function _singleModuleStop(oModule, sInstanceId) {
    var oInstance = oModule.instances[sInstanceId];
    if (!isTypeOf(oModule, sNotDefined) && !isTypeOf(oInstance, sNotDefined)) {
      oInstance.destroy();
      delete oModule.instances[sInstanceId];
    }
  }
  /**
   * stopAll is the method that will finish all the registered and started modules.
   */
  function stopAll() {
    var oModules = getModules();
    iterateObject(oModules, function (_oModule, sModuleId) {
      if (!isTypeOf(_oModule, sNotDefined)) {
        _stopOneByOne(_oModule, sModuleId);
      }
    });
  }
  /**
   * Loops over instances of modules to stop them.
   * @param {Object} oModule
   * @param {String} sModuleId
   * @private
   */
  function _stopOneByOne(oModule, sModuleId) {
    iterateObject(oModule.instances, function (oItem, sInstanceId) {
      stop(sModuleId, sInstanceId);
    });
  }
  /**
   * remove is the method that will remove the full module from the oModules object
   * @param {String} sModuleId
   * @return {*}
   */
  function remove(sModuleId) {
    var oModules = getModules();
    var oModule = oModules[sModuleId];
    if (isTypeOf(oModule, sNotDefined)) {
      return null;
    }
    if (!isTypeOf(oModule, sNotDefined)) {
      try {
        return Module;
      } finally {
        _delete(sModuleId);
        createMapping(getMappingMaps(), 'hm_', oModules);
      }
    }
    return null;
  }
  /**
   * _delete is a wrapper method that will call the native delete javascript function
   * It's important to test the full code.
   * @param {String} sModuleId
   * @return {Boolean}
   */
  function _delete(sModuleId) {
    var oModules = getModules();
    if (!isTypeOf(oModules[sModuleId], sNotDefined)) {
      delete oModules[sModuleId];
      return true;
    }
    return false;
  }
  /**
   * Stop all the running modules and cleans all the stored modules.
   */
  function reset() {
    stopAll();
    resetModules();
    createMapping(getMappingMaps(), 'hm_', getModules());
  }

  /**
   * Class to manage the modules.
   * @constructor
   * @class Module
   * @name Module
   * @private
   */
  return {
    setters: [function (_) {
      isTypeOf = _.isTypeOf;
      sNotDefined = _.sNotDefined;
      iterateObject = _.iterateObject;
      isFunction = _.isFunction;
      nullFunc = _.nullFunc;
      copyArray = _.copyArray;
      simpleMerge = _.simpleMerge;
      sFunctionType = _.sFunctionType;
      generateUniqueKey = _.generateUniqueKey;
      getSimpleFunction = _.getSimpleFunction;
      getObjectLength = _.getObjectLength;
      isInstanceOf = _.isInstanceOf;
      isArray = _.isArray;
    }, function (_4) {
      getPromise = _4.getPromise;
    }, function (_5) {
      resolveDependencies = _5.resolveDependencies;
      createMapping = _5.createMapping;
      getMappingMaps = _5.getMappingMaps;
    }, function (_2) {
      Bus = _2['default'];
    }, function (_3) {
      getDebug = _3.getDebug;
    }, function (_6) {
      errorHandler = _6.errorHandler;
    }, function (_a) {
      resetVars = _a.resetVars;
      setVars = _a.setVars;
      getVars = _a.getVars;
    }, function (_b) {
      getModules = _b.getModules;
      resetModules = _b.resetModules;
    }, function (_c) {
      FakeModule = _c['default'];
    }],
    execute: function () {
      __super__ = {};
      instances = {};
      __type__ = 'module';
      oModifyInit = {};

      /**
       * type is a property to be able to know the class type.
       * @type {String}
       */
      type = 'Module';
      Module = {
        __super__: __super__,
        instances: instances,
        __type__: __type__,
        type: type,
        getInstance: getInstance,
        setInstance: setInstance,
        setVars: setVars,
        resetVars: resetVars,
        getVars: getVars,
        extend: extend,
        decorate: decorate,
        isModuleStarted: isModuleStarted,
        register: register,
        start: start,
        startAll: startAll,
        stop: stop,
        stopAll: stopAll,
        remove: remove,
        reset: reset
      };

      _export('default', Module);
    }
  };
});

$__System.register('3', [], function (_export) {
  /**
   * Wrapper of Object.prototype.toString to detect type of object in cross browsing mode.
   * @param {Object} oObject
   * @return {String}
   * @private
   */
  'use strict';

  var sNotDefined, sFunctionType;

  /**
   * Return a copy of the object.
   * @param {Object} oObject
   * @return {Object}
   * @private
   */

  /**
   * Use Event detection and if it fails it degrades to use duck typing detection to
   * test if the supplied object is an Event
   * @param {Object} oObj
   * @return {Boolean}
   * @private
   */

  _export('isArray', isArray);

  /**
   * isArray is a function to know if the object passed as parameter is an Array object.
   * @param {*} aArray
   * @return {Boolean}
   * @private
   */

  /**
   * Use jQuery detection
   * @param {Object} oObj
   * @return {Boolean}
   * @private
   */

  /**
   * Check if is the type indicated
   * @param {Object} oMix
   * @param {String} sType
   * @return {Boolean}
   */

  _export('clone', clone);

  /**
   * Cache 'undefined' string to test typeof
   * @type {String}
   */

  _export('isTypeOf', isTypeOf);

  /**
   * Returns global or window object
   * @returns {boolean|Window|*|getRoot}
   */

  _export('copyArray', copyArray);

  /**
   * isFunction is a function to know if the object passed as parameter is a Function object.
   * @param {*} fpCallback
   * @return {Boolean}
   * @private
   */

  _export('getRoot', getRoot);

  /**
   * Helper to iterate over objects using for-in approach
   * @param {Object} oObject
   * @param {Function} fpProcess
   * @private
   */

  _export('isFunction', isFunction);

  /**
   * nullFunc
   * An empty function to be used as default is no supplied callbacks.
   * @private
   */

  _export('iterateObject', iterateObject);

  /**
   * Do a simple merge of two objects overwriting the target properties with source properties
   * @param {Object} oTarget
   * @param {Object} oSource
   * @private
   */

  _export('nullFunc', nullFunc);

  /**
   * Function type string
   * @type {String}
   * @private
   */

  _export('simpleMerge', simpleMerge);

  /**
   * Wrapper of instanceof to reduce final size
   * @param {Object} oInstance
   * @param {Object} oConstructor
   * @return {Boolean}
   * @private
   */

  _export('simpleMerge', simpleMerge);

  /**
   * Return the length of properties of one object
   * @param {Object} oObj
   * @return {Number}
   * @private
   */

  _export('isInstanceOf', isInstanceOf);

  /**
   * Return the length of properties of one object
   * @param {Object} oObj
   * @return {Number}
   * @private
   */

  _export('getObjectLength', getObjectLength);

  /**
   * Used to generate an unique key for instance ids that are not supplied by the user.
   * @return {String}
   * @private
   */

  _export('getSimpleFunction', getSimpleFunction);

  _export('generateUniqueKey', generateUniqueKey);

  function toString(oObject) {
    return Object.prototype.toString.call(oObject);
  }function isJqueryObject(oObj) {
    var isJquery = false,
        $ = getRoot().jQuery;
    if ($) {
      isJquery = isInstanceOf(oObj, $);
    }
    return isJquery;
  }function isEvent(oObj) {
    try {
      return isInstanceOf(oObj, Event);
    } catch (erError) {
      // Duck typing detection (If it sounds like a duck and it moves like a duck, it's a duck)
      if (oObj.altKey !== und && (oObj.srcElement || oObj.target)) {
        return true;
      }
    }
    return false;
  }
  function isArray(aArray) {
    return toString(aArray) === '[object Array]';
  }

  function clone(oObject) {
    var oCopy;
    /*
     Handle null, undefined, DOM element, Event and jQuery objects,
     and all the objects that are instances of a constructor different from Object.
     */
    if (null == oObject || // Is null or undefined
    !isTypeOf(oObject, 'object') || // Is not an object (primitive)
    oObject.constructor.toString().indexOf('Object()') === -1 || // Is an instance
    isEvent(oObject) || // Is an event
    isJqueryObject(oObject) || // Is a jQuery object
    oObject.nodeType && oObject.nodeType === 1) {
      // Is a DOM element
      return oObject;
    }

    // Handle Date
    if (isInstanceOf(oObject, Date)) {
      oCopy = new Date();
      oCopy.setTime(oObject.getTime());
      return oCopy;
    }

    // Handle Array
    if (isInstanceOf(oObject, Array)) {
      oCopy = copyArray(oObject);
      return oCopy;
    }

    // Handle Object
    if (isInstanceOf(oObject, Object)) {
      oCopy = {};
      iterateObject(oObject, function (oItem, sKey) {
        oCopy[sKey] = clone(oItem);
      });
      return oCopy;
    }

    throw new Error('Unable to copy object!');
  }

  function isTypeOf(oMix, sType) {
    return typeof oMix === sType;
  }

  /**
   * Return a copy of an Array or convert a LikeArray object to Array
   * @param {Object|Array} oLikeArray
   * @private
   */

  function copyArray(oLikeArray) {
    return [].slice.call(oLikeArray, 0);
  }

  function getRoot() {
    var root = typeof self === 'object' && self.self === self && self || typeof global === 'object' && global.global === global && global || this;
    if (root.document) {
      root.document.__type__ = 'doc';
    }
    if (root.console) {
      root.console.__type__ = 'log';
    }
    return root;
  }

  function isFunction(fpCallback) {
    return toString(fpCallback) === '[object Function]';
  }

  function iterateObject(oObject, fpProcess) {
    var sKey;

    for (sKey in oObject) {
      if (oObject.hasOwnProperty(sKey)) {
        fpProcess(oObject[sKey], sKey);
      }
    }
  }

  function nullFunc() {}

  function simpleMerge(oTarget, oSource) {
    iterateObject(oSource, function (oItem, sKey) {
      oTarget[sKey] = oSource[sKey];
    });
    return oTarget;
  }

  /**
   * Do a simple merge of two objects overwriting the target properties with source properties
   * @param {Object} oTarget
   * @param {Object} oSource
   * @private
   */

  function simpleMerge(oTarget, oSource) {
    iterateObject(oSource, function (oItem, sKey) {
      oTarget[sKey] = oSource[sKey];
    });
    return oTarget;
  }

  function isInstanceOf(oInstance, oConstructor) {
    return oInstance instanceof oConstructor;
  }

  function getObjectLength(oObj) {
    return getKeys(oObj).length;
  }

  function getObjectLength(oObj) {
    return getKeys(oObj).length;
  }
  /**
   * Return the function to execute simple callbacks in extended modules.
   * @param {Function} oCallback
   * @param {Object} [oContext]
   * @returns {Function}
   */

  function getSimpleFunction(oCallback, oContext) {
    return function () {
      return oCallback.apply(oContext || this, arguments);
    };
  }

  function generateUniqueKey() {
    var oMath = Math,
        sFirstToken = +new Date() + '',
        sSecondToken = oMath.floor(oMath.random() * (999999 - 1 + 1)) + 1;
    return sFirstToken + '_' + sSecondToken;
  }

  return {
    setters: [],
    execute: function () {
      sNotDefined = 'undefined';

      _export('sNotDefined', sNotDefined);

      sFunctionType = 'function';

      _export('sFunctionType', sFunctionType);
    }
  };
});

$__System.register('9', ['3'], function (_export) {
  'use strict';

  var getRoot, root, ErrorHandler;

  /**
   * Sets and overwrites the ErrorHandler object to log errors and messages
   * @member Hydra
   * @type {Function}
   * @static
   */

  _export('errorHandler', errorHandler);

  _export('setErrorHandler', setErrorHandler);

  /**
   * Returns the actual ErrorHandler
   * @member Hydra
   * @type {Function}
   * @static
   */

  function errorHandler() {
    return ErrorHandler;
  }

  function setErrorHandler(oErrorHandler) {
    ErrorHandler = oErrorHandler;
    ErrorHandler.__type__ = 'log';
  }

  return {
    setters: [function (_) {
      getRoot = _.getRoot;
    }],
    execute: function () {
      root = getRoot();

      /**
       * Simple object to abstract the error handler, the most basic is to be the console object
       * @type {Object|*}
       * @private
       */
      ErrorHandler = root.console || {
        log: function log() {},
        error: function error() {},
        __type__: 'log'
      };
    }
  };
});

$__System.register('6', ['2', '3', '4', '5', '7', '9', 'b', 'a', 'd', 'e'], function (_export) {
  'use strict';

  var When, getRoot, isTypeOf, copyArray, isArray, getPromise, getNamespace, Bus, errorHandler, getCopyModules, getModules, getVars, Module, getApi, root, und, oMapping, oMappingMaps;

  /**
   * Return oMappingMaps
   * @returns {Object}
   */

  _export('createMapping', createMapping);

  /**
   * Create or get a namespace by a namespace defined as string
   * @param {String}sNamespace
   * @return {Object}
   * @private
   */

  _export('getMappingMaps', getMappingMaps);

  _export('resolveDependencies', resolveDependencies);

  /**
   * Helper function to create the mapping
   * @param {Object} oMapping
   * @param {String} sId
   * @param {Object} oMap
   * @param {Function} [fpResolveDI]
   * @private
   */

  function createMapping(oMapping, sId, oMap, fpResolveDI) {
    oMapping.___order___.push(sId);
    oMapping[sId] = {
      __map__: oMap
    };
    if (!fpResolveDI) {
      fpResolveDI = getResolveDICallback(oMapping[sId]);
    }
    oMapping[sId].__resolveDI__ = fpResolveDI;
  }

  function getMappingMaps() {
    return oMappingMaps;
  }

  function resolveNamespace(sNamespace) {
    var oObj = root,
        aElements = sNamespace.split('.'),
        sElement;
    while (!!(sElement = aElements.shift())) {
      oObj = oObj[sElement] !== und ? oObj[sElement] : oObj[sElement] = {};
    }
    return oObj;
  }
  /**
   * Resolve dependency injection by default.
   * @param {Object} oMapping
   * @return {Function}
   * @private
   */
  function getResolveDICallback(oMapping) {
    return function (sDependency) {
      var oPromise = getPromise();
      if (!oMapping.__map__[sDependency]) {
        return false;
      }
      oPromise.resolve(oMapping.__map__[sDependency]);
      return oPromise;
    };
  }

  /**
    * Traverse all the mapping systems to get a match.
    * @param {String} sDependency
    * @return {Boolean|Promise}
    * @private
    */
  function getDependencyThroughAllMaps(sDependency) {
    var oMap,
        oDependency,
        nIndexOrder,
        nLenOrder,
        aOrderDependency = oMappingMaps.___order___;

    createMapping(oMappingMaps, '__', root, function (sDependency) {
      var oDependency,
          oPromise = getPromise();
      oDependency = resolveNamespace(sDependency);
      oPromise.resolve(oDependency);
      return oPromise;
    });

    for (nIndexOrder = 0, nLenOrder = aOrderDependency.length; nIndexOrder < nLenOrder; nIndexOrder++) {
      oMap = oMappingMaps[aOrderDependency[nIndexOrder]];
      oDependency = oMap.__resolveDI__(sDependency);
      if (oDependency) {
        delete oMappingMaps['__'];
        return oDependency;
      }
    }
    delete oMappingMaps['__'];
    return false;
  }

  /**
    * Inject dependencies creating modules
    * Look for dependencies in:
    * Hydra mappings
    * oVars
    * oModules
    * namespace
    * root
    * @param {String} sModuleId
    * @param {Array} aDependencies
    */

  function resolveDependencies(sModuleId, aDependencies) {
    var oMappingMaps = getMappingMaps();
    var sDependency,
        sPrefix,
        oModules,
        oMod,
        aPromises = [],
        nDependencies = 0,
        oMap,
        aExtraDependencies,
        oDependency,
        oPromise,
        oResult = {
      mapping: [],
      dependencies: []
    };

    oModules = getCopyModules();
    oMod = oModules[sModuleId];
    if (!oMod) {
      oMod = {};
    }
    if (!oMod.dependencies) {
      oMod.dependencies = ['$$_bus', '$$_module', '$$_log', 'gl_Hydra'];
    }
    aExtraDependencies = oMod.dependencies;
    if (!isArray(aExtraDependencies) && typeof aExtraDependencies === 'object') {
      aExtraDependencies = getKeys(aExtraDependencies);
    }

    aDependencies = (isArray(aDependencies) ? aDependencies : aExtraDependencies || []).concat();

    while (!!(sDependency = aDependencies.shift())) {

      if (isTypeOf(sDependency, 'string')) {
        if (sDependency.indexOf('_') === 2) {
          sPrefix = sDependency.substr(0, 3);
        } else if (sDependency.indexOf('$') === 0) {
          sPrefix = sDependency.substr(0, 1);
        } else {
          sPrefix = '';
        }
        oMap = oMappingMaps[sPrefix] || oMappingMaps['gl_'];
        sDependency = sDependency.replace(sPrefix, '');
        oDependency = oMap.__map__[sDependency];
        if (!oDependency) {
          oDependency = getDependencyThroughAllMaps(sDependency);
        } else {
          oDependency = oMap.__resolveDI__(sDependency);
        }

        oResult.mapping.push(sDependency);
      } else {
        oDependency = getPromise();
        oDependency.resolve(sDependency);
        oResult.mapping.push(sDependency.__type__ || oMod.dependencies[nDependencies]);
      }
      aPromises.push(oDependency);
    }
    oPromise = getPromise();

    When.apply(When, aPromises).then(function () {
      oPromise.resolve.apply(oPromise, [oResult.mapping].concat(copyArray(arguments)));
    });
    return oPromise;
  }

  return {
    setters: [function (_3) {
      When = _3['default'];
    }, function (_) {
      getRoot = _.getRoot;
      isTypeOf = _.isTypeOf;
      copyArray = _.copyArray;
      isArray = _.isArray;
    }, function (_2) {
      getPromise = _2.getPromise;
    }, function (_5) {
      getNamespace = _5.getNamespace;
    }, function (_4) {
      Bus = _4['default'];
    }, function (_6) {
      errorHandler = _6.errorHandler;
    }, function (_b) {
      getCopyModules = _b.getCopyModules;
      getModules = _b.getModules;
    }, function (_a) {
      getVars = _a.getVars;
    }, function (_d) {
      Module = _d['default'];
    }, function (_e) {
      getApi = _e.getApi;
    }],
    execute: function () {
      root = getRoot();
      und = undefined;
      oMapping = {
        'bus': Bus,
        'module': Module,
        'log': errorHandler(),
        'api': getApi(),
        'global': root,
        'doc': root.document || null
      };

      /**
       * Mapping of prefixes by object to check to resolve dependencies.
       * @type {Object}
       * @private
       */
      oMappingMaps = { ___order___: [] };

      createMapping(oMappingMaps, '$$_', oMapping);
      createMapping(oMappingMaps, '$', oMapping);
      createMapping(oMappingMaps, 'pr_', getVars());
      createMapping(oMappingMaps, 'hm_', getModules());
      createMapping(oMappingMaps, 'ns_', getNamespace() || root);
      createMapping(oMappingMaps, 'gl_', root);
    }
  };
});

$__System.register('e', ['2', '3', '4', '5', '6', '7', '8', '9', 'b', 'd'], function (_export) {
  'use strict';

  var when, isTypeOf, clone, sNotDefined, simpleMerge, Promise, setNamespace, resolveDependencies, getMappingMaps, createMapping, bus, setDebug, getDebug, errorHandler, setErrorHandler, getCopyModules, _module, extendModifyInit, und, version, Deferred, __type__, getCopyChannels;

  _export('getApi', getApi);

  function extend(sIdExtension, oExtension) {
    if (isTypeOf(this[sIdExtension], sNotDefined)) {
      this[sIdExtension] = oExtension;
    } else {
      this[sIdExtension] = simpleMerge(this[sIdExtension], oExtension);
    }
  }
  function noConflict(sOldName, oNewContext, sNewName) {
    if (!isTypeOf(this[sOldName], sNotDefined)) {
      oNewContext[sNewName] = this[sOldName];
      return true;
    }
    return false;
  }
  function addExtensionBeforeInit(oVar) {
    extendModifyInit(oVar);
  }
  function addMapping(sPrefix, oMapping, fpResolveDI) {
    var oMappingMaps = getMappingMaps();
    var oMap = oMappingMaps[sPrefix];
    if (oMap === und) {
      createMapping(oMappingMaps, sPrefix, oMapping, fpResolveDI);
    } else {
      simpleMerge(oMappingMaps[sPrefix].__map__, oMapping);
    }
  }
  function addAsyncMapping(sPrefix, oMapping, fpCallback) {
    this.addMapping(sPrefix, oMapping, function (sDependency) {
      return fpCallback.call(oMapping, sDependency);
    });
  }

  function getApi() {
    return {
      /**
       * Version number of Hydra.
       * @type {String}
       */
      version: version,
      /**
       * bus is a singleton instance of the bus to subscribe and publish content in channels.
       * @type {Object}
       */
      bus: bus,
      /**
       * Returns the actual ErrorHandler
       * @type {Function}
       * @static
       */
      errorHandler: errorHandler,
      /**
       * Sets and overwrites the ErrorHandler object to log errors and messages
       * @type {Function}
       * @static
       */
      setErrorHandler: setErrorHandler,
      /**
       * Returns the constructor of Promise object
       * @type {Promise}
       * @static
       */
      Promise: Promise,
      /**
       * Returns the constructor of Deferred object
       * @type {Promise}
       * @static
       */
      Deferred: Deferred,
      /**
       * Sugar method to generate Deferred objects in a simple way
       * @type {Function}
       * @static
       */
      when: when,
      /**
       * Return a singleton of Module
       * @type {Object}
       * @static
       */
      module: _module,
      /**
       * Change the debug mode to on/off
       * @type {Function}
       * @static
       */
      setDebug: setDebug,
      /**
       * Get the debug status
       * @type {Function}
       * @static
       */
      getDebug: getDebug,
      /**
       * Extends Hydra object with new functionality
       * @param {String} sIdExtension
       * @param {Object} oExtension
       * @static
       */
      extend: extend,
      /**
       * Resolve dependencies of modules
       * @static
       */
      resolveDependencies: resolveDependencies,
      /**
       * Adds an alias to parts of Hydra
       * @param {String} sOldName
       * @param {Object} oNewContext
       * @param {String} sNewName
       * @return {Boolean}
       * @static
       */
      noConflict: noConflict,
      /**
       * Merges an object to oModifyInit that will be executed before executing the init.
       * {
      *    'property_in_module_to_check': function(Module){} // Callback to execute if the property exist
      * }
       * @type {Function}
       * @param {Object} oVar
       * @static
       */
      addExtensionBeforeInit: addExtensionBeforeInit,
      /**
       * To be used about extension, it will return a deep copy of the Modules object to avoid modifying the original
       * object.
       * @type {Function}
       * @return {Object}
       * @static
       */
      getCopyModules: getCopyModules,
      /**
       * To be used about extension, it will return a deep copy of the Channels object to avoid modifying the original
       * object.
       * @type {Function}
       * @return {Object}
       * @static
       */
      getCopyChannels: getCopyChannels,
      /**
       * Sets the global namespace
       * @param {Object} _namespace
       * @type {Function}
       * @static
       */
      setNamespace: setNamespace,
      /**
       * Adds a new mapping to be used by the dependency injection system.
       * @param {String} sPrefix
       * @param {Object} oMapping
       * @param {Function} [fpResolveDI]
       * @static
       */
      addMapping: addMapping,
      /**
       * Adds an async mapping to be used by the dependency injection system.
       * @param {String} sPrefix
       * @param {Object} oMapping
       * @param {Function} fpCallback -> This callback should return a promise.
       * @static
       */
      addAsyncMapping: addAsyncMapping,
      __type__: __type__
    };
  }

  return {
    setters: [function (_5) {
      when = _5['default'];
    }, function (_7) {
      isTypeOf = _7.isTypeOf;
      clone = _7.clone;
      sNotDefined = _7.sNotDefined;
      simpleMerge = _7.simpleMerge;
    }, function (_4) {
      Promise = _4['default'];
    }, function (_6) {
      setNamespace = _6.setNamespace;
    }, function (_8) {
      resolveDependencies = _8.resolveDependencies;
      getMappingMaps = _8.getMappingMaps;
      createMapping = _8.createMapping;
    }, function (_) {
      bus = _['default'];
    }, function (_2) {
      setDebug = _2.setDebug;
      getDebug = _2.getDebug;
    }, function (_3) {
      errorHandler = _3.errorHandler;
      setErrorHandler = _3.setErrorHandler;
    }, function (_b) {
      getCopyModules = _b.getCopyModules;
    }, function (_d) {
      _module = _d['default'];
      extendModifyInit = _d.extendModifyInit;
    }],
    execute: function () {
      und = undefined;
      version = '3.11.0';
      Deferred = Promise;
      __type__ = 'api';
      getCopyChannels = bus.getCopyChannels;

      _export('version', version);

      _export('bus', bus);

      _export('errorHandler', errorHandler);

      _export('setErrorHandler', setErrorHandler);

      _export('Promise', Promise);

      _export('Deferred', Deferred);

      _export('when', when);

      _export('module', _module);

      _export('setDebug', setDebug);

      _export('getDebug', getDebug);

      _export('extend', extend);

      _export('resolveDependencies', resolveDependencies);

      _export('noConflict', noConflict);

      _export('addExtensionBeforeInit', addExtensionBeforeInit);

      _export('getCopyModules', getCopyModules);

      _export('getCopyChannels', getCopyChannels);

      _export('setNamespace', setNamespace);

      _export('addMapping', addMapping);

      _export('addAsyncMapping', addAsyncMapping);

      _export('__type__', __type__);
    }
  };
});

/**
 * Version number of Hydra.
 * @type {String}
 */

/**
 * bus is a singleton instance of the bus to subscribe and publish content in channels.
 * @type {Object}
 */

/**
 * Returns the actual ErrorHandler
 * @type {Function}
 * @static
 */

/**
 * Sets and overwrites the ErrorHandler object to log errors and messages
 * @type {Function}
 * @static
 */

/**
 * Returns the constructor of Promise object
 * @type {Promise}
 * @static
 */

/**
 * Returns the constructor of Deferred object
 * @type {Promise}
 * @static
 */

/**
 * Sugar method to generate Deferred objects in a simple way
 * @type {Function}
 * @static
 */

/**
 * Return a singleton of Module
 * @type {Object}
 * @static
 */

/**
 * Change the debug mode to on/off
 * @type {Function}
 * @static
 */

/**
 * Get the debug status
 * @type {Function}
 * @static
 */

/**
 * Extends Hydra object with new functionality
 * @param {String} sIdExtension
 * @param {Object} oExtension
 * @static
 */

/**
 * Resolve dependencies of modules
 * @static
 */

/**
 * Adds an alias to parts of Hydra
 * @param {String} sOldName
 * @param {Object} oNewContext
 * @param {String} sNewName
 * @return {Boolean}
 * @static
 */

/**
 * Merges an object to oModifyInit that will be executed before executing the init.
 * {
 *    'property_in_module_to_check': function(Module){} // Callback to execute if the property exist
 * }
 * @type {Function}
 * @param {Object} oVar
 * @static
 */

/**
 * To be used about extension, it will return a deep copy of the Modules object to avoid modifying the original
 * object.
 * @type {Function}
 * @return {Object}
 * @static
 */

/**
 * To be used about extension, it will return a deep copy of the Channels object to avoid modifying the original
 * object.
 * @type {Function}
 * @return {Object}
 * @static
 */

/**
 * Sets the global namespace
 * @param {Object} _namespace
 * @type {Function}
 * @static
 */

/**
 * Adds a new mapping to be used by the dependency injection system.
 * @param {String} sPrefix
 * @param {Object} oMapping
 * @param {Function} [fpResolveDI]
 * @static
 */

/**
 * Adds an async mapping to be used by the dependency injection system.
 * @param {String} sPrefix
 * @param {Object} oMapping
 * @param {Function} fpCallback -> This callback should return a promise.
 * @static
 */

$__System.registerDynamic("1", ["e"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /**
   * Hydra is the api that will be available to use by developers
   * @constructor
   * @class Hydra
   * @name Hydra
   */
  module.exports = $__require("e");
});
})
(function(factory) {
  Hydra = factory();
});