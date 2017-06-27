/*global exports, module, require, define, setTimeout*/
(function () {
  'use strict';
  var root, sNotDefined, oModules, oVars, _null_, bUnblockUI, _false_, sVersion, FakeModule, Hydra, bDebug, ErrorHandler, Module, Bus, oChannels, isNodeEnvironment, oObjProto;

  /**
   * Use Event detection and if it fails it degradates to use duck typing detection to test if the supplied object is an Event
   * @param oObj
   * @returns {boolean}
   */
  function isEvent(oObj) {
    try {
      return oObj instanceof Event;
    } catch (erError) {
      // Duck typing detection (If it sounds like a duck and it moves like a duck, it's a duck)
      if (typeof oObj.altKey !== 'undefined' && ( oObj.srcElement || oObj.target )) {
        return true;
      }
    }
    return false;
  }

  /**
   * Use jQuery detection
   * @param oObj
   * @returns {boolean}
   */
  function isJqueryObject(oObj) {
    var isJquery = false;
    if(root.jQuery)
    {
      isJquery = oObj instanceof root.jQuery;
    }
    return isJquery;

  }

  /**
   * nullFunc
   * An empty function to be used as default is no supplied callbacks.
   * @private
   */
  function nullFunc() {
  }

  /**
   * Used to generate an unique key for instance ids that are not supplied by the user.
   * @return {String}
   * @private
   */
  function generateUniqueKey() {
    var sFirstToken = +new Date() + '',
      sSecondToken = Math.floor(Math.random() * (999999 - 1 + 1)) + 1;
    return sFirstToken + '_' + sSecondToken;
  }

  /**
   * Return the length of properties of one object
   * @param {Object} oObj
   * @return {Number}
   * @private
   */
  function getObjectLength(oObj) {
    var nLen, sKey;
    if (Object.keys) {
      nLen = Object.keys(oObj).length;
    }
    else {
      nLen = 0;
      for (sKey in oObj) {
        if (ownProp(oObj, sKey)) {
          nLen++;
        }
      }
    }
    return nLen;
  }

  /**
   * Check if Object.create exist, if not exist we create it to be used inside the code.
   */
  if (typeof Object.create !== 'function') {
    Object.create = function (oObject) {
      function Copy() {
      }

      Copy.prototype = oObject;
      return new Copy();
    };
  }

  /**
   * Check if Hydra.js is loaded in Node.js environment
   * @type {Boolean}
   * @private
   */
  isNodeEnvironment = typeof exports === 'object' && typeof module === 'object' && typeof module.exports === 'object' && typeof require === 'function';

  /**
   * Cache 'undefined' string to test typeof
   * @type {String}
   * @private
   */
  sNotDefined = 'undefined';

  /**
   * Cache of object prototype to use it in other functions
   * @type {Object}
   * @private
   */
  oObjProto = Object.prototype;

  /**
   * set the correct root depending from the environment.
   * @type {Object}
   * @private
   */
  root = this;

  /**
   * Contains a reference to null object to decrease final size
   * @type {Object}
   * @private
   */
  _null_ = null;

  /**
   * Contains a reference to false to decrease final size
   * @type {Boolean}
   * @private
   */
  _false_ = false;

  /**
   * Property that will save the registered modules
   * @type {Object}
   * @private
   */
  oModules = {};

  /**
   * Version of Hydra
   * @type {String}
   * @private
   */
  sVersion = '3.5.0';

  /**
   * Used to activate the debug mode
   * @type {Boolean}
   * @private
   */
  bDebug = _false_;

  /**
   * Use to activate the unblock UI when notifies are executed.
   * WARNING!!! This will not block your UI but could give problems with the order of execution.
   * @type {Boolean}
   * @private
   */
  bUnblockUI = _false_;

  /**
   * Wrapper of Object.prototype.toString to detect type of object in cross browsing mode.
   * @param {Object} oObject
   * @return {String}
   * @private
   */
  function toString(oObject) {
    return oObjProto.toString.call(oObject);
  }

  /**
   * isFunction is a function to know if the object passed as parameter is a Function object.
   * @param {Object} fpCallback
   * @return {Boolean}
   * @private
   */
  function isFunction(fpCallback) {
    return toString(fpCallback) === '[object Function]';
  }

  /**
   * isArray is a function to know if the object passed as parameter is an Array object.
   * @param {String|Array|Object} aArray
   * @return {Boolean}
   * @private
   */
  function isArray(aArray) {
    return toString(aArray) === '[object Array]';
  }

  /**
   * setDebug is a method to set the bDebug flag.
   * @param {Boolean} _bDebug
   * @private
   */
  function setDebug(_bDebug) {
    bDebug = _bDebug;
  }

  /**
   * setUnblockUI is a method to set the bUnblockUI flag.
   * @param {Boolean} _bUnblockUI
   * @private
   */
  function setUnblockUI(_bUnblockUI) {
    bUnblockUI = _bUnblockUI;
  }

  /**
   * Converts objects like node list to real array.
   * @param {Object} oLikeArray
   * @param {Number} nElements
   * @return {Array<*>}
   * @private
   */
  function slice(oLikeArray, nElements) {
    return [].slice.call(oLikeArray, nElements || 0);
  }

  /**
   * Wrapper of Object.hasOwnProperty
   * @param {Object} oObj
   * @param {String} sKey
   * @return {Boolean}
   * @private
   */
  function ownProp(oObj, sKey) {
    return oObj.hasOwnProperty(sKey);
  }

  /**
   * Method to modify the init method to use it for extend.
   * @param {Object} oInstance
   * @param {Object} oModifyInit
   * @param {Object} oData
   * @param {Boolean} bSingle
   * @private
   */
  function beforeInit(oInstance, oModifyInit, oData, bSingle) {
    var sKey;
    for (sKey in oModifyInit) {
      if (oModifyInit.hasOwnProperty(sKey)) {
        if (oInstance[sKey] && typeof oModifyInit[sKey] === 'function') {
          oModifyInit[sKey](oInstance, oData, bSingle);
        }
      }
    }
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
   * @return {Module} instance of the module
   * @private
   */
  function startSingleModule(oWrapper, sModuleId, sIdInstance, oData, bSingle) {
    var oModule, oInstance;
    oModule = oModules[sModuleId];
    if (bSingle && oWrapper.isModuleStarted(sModuleId)) {
      oWrapper.stop(sModuleId);
    }
    if (typeof oModule !== sNotDefined) {
      oInstance = createInstance(sModuleId);
      oModule.instances[sIdInstance] = oInstance;
      oInstance.__instance_id__ = sIdInstance;

      beforeInit(oInstance, oWrapper.oModifyInit, oData, bSingle);

      if (typeof oData !== sNotDefined) {
        oInstance.init(oData);
      }
      else {
        oInstance.init();
      }
    }
    else {
      ErrorHandler.error(new Error(), 'The module ' + sModuleId + ' is not registered in the system');
    }
    return oInstance;
  }

  /**
   * Do a simple merge of two objects overwriting the target properties with source properties
   * @param {Object} oTarget
   * @param {Object} oSource
   * @private
   */
  function simpleMerge(oTarget, oSource) {
    var sKey;
    for (sKey in oSource) {
      if (ownProp(oSource, sKey)) {
        oTarget[sKey] = oSource[sKey];
      }
    }
    return oTarget;
  }

  /**
   * Return a copy of the object.
   * @param {Object} oObject
   */
  function clone(oObject) {
    var oCopy, oItem, nIndex, nLenArr, sAttr;
    // Handle the 3 simple types, and null or undefined
    if (null == oObject || 'object' !== typeof oObject) {
      return oObject;
    }

    if (isEvent(oObject) || isJqueryObject(oObject)) {
      return oObject;
    }

    // Handle Date
    if (oObject instanceof Date) {
      oCopy = new Date();
      oCopy.setTime(oObject.getTime());
      return oCopy;
    }

    // Handle Array
    if (oObject instanceof Array) {
      oCopy = [];
      for (nIndex = 0, nLenArr = oObject.length; nIndex < nLenArr; nIndex++) {
        oItem = oObject[nIndex];
        oCopy[nIndex] = clone(oItem);
      }
      return oCopy;
    }

    // Handle Object
    if (oObject instanceof Object) {
      oCopy = {};
      for (sAttr in oObject) {
        if (oObject.hasOwnProperty(sAttr)) {
          oCopy[sAttr] = clone(oObject[sAttr]);
        }
      }
      return oCopy;
    }

    throw new Error('Unable to copy obj! Its type isn\'t supported.');
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
        var aArgs = slice(arguments, 0);
        try {
          return fpMethod.apply(this, aArgs);
        }
        catch (erError) {
          ErrorHandler.error(sModuleId, sName, erError);
          return false;
        }
      };
    }(sName, fpMethod));
  }

  /**
   * Private object to save the channels for communicating event driven
   * @type {{global: Object}}
   * @private
   */
  oChannels = {
    global: {}
  };

  /**
   * subscribersByEvent return all the subscribers of the event in the channel.
   * @param {Object} oChannel
   * @param {String} sEventName
   * @return {Array<Module>}
   * @private
   */
  function subscribersByEvent(oChannel, sEventName) {
    var aSubscribers = [],
      sEvent;
    if (typeof oChannel !== 'undefined') {
      for (sEvent in oChannel) {
        if (ownProp(oChannel, sEvent) && sEvent === sEventName) {
          aSubscribers = oChannel[sEvent];
        }
      }
    }
    return aSubscribers;
  }


  /**
   * Bus is the object that must be used to manage the notifications by channels
   * @constructor
   * @class Bus
   * @name Bus
   * @private
   */
  Bus = {
    /**
     * subscribers return the array of subscribers to one channel and event.
     * @param {String} sChannelId
     * @param {String} sEventName
     * @return {Array<Module>}
     */
    subscribers: function (sChannelId, sEventName) {
      return subscribersByEvent(oChannels[sChannelId], sEventName);
    },

    /**
     * _getChannelEvents return the events array in channel.
     * @param {String} sChannelId
     * @param {String} sEvent
     * @return {Object}
     * @private
     */
    _getChannelEvents: function (sChannelId, sEvent) {
      if (typeof oChannels[sChannelId] === 'undefined') {
        oChannels[sChannelId] = {};
      }
      if (typeof oChannels[sChannelId][sEvent] === 'undefined') {
        oChannels[sChannelId][sEvent] = [];
      }
      return oChannels[sChannelId][sEvent];
    },

    /**
     * _addSubscribers add all the events of one channel from the subscriber
     * @param {Object} oEventsCallbacks
     * @param {String} sChannelId
     * @param {Module} oSubscriber
     * @private
     */
    _addSubscribers: function (oEventsCallbacks, sChannelId, oSubscriber) {
      var sEvent;
      for (sEvent in oEventsCallbacks) {
        if (ownProp(oEventsCallbacks, sEvent)) {
          this.subscribeTo(sChannelId, sEvent, oEventsCallbacks[sEvent], oSubscriber);
        }
      }
    },

    /**
     * Method to unsubscribe a subscriber from a channel and event type.
     * It iterates in reverse order to avoid messing with array length when removing items.
     * @param {String} sChannelId
     * @param {String} sEventType
     * @param {Module} oSubscriber
     */
    unsubscribeFrom: function (sChannelId, sEventType, oSubscriber) {
      var aChannelEvents = this._getChannelEvents(sChannelId, sEventType),
        oItem,
        nEvent = aChannelEvents.length - 1;

      for (; nEvent >= 0; nEvent--) {
        oItem = aChannelEvents[nEvent];
        if (oItem.subscriber === oSubscriber) {
          aChannelEvents.splice(nEvent, 1);
        }
      }
    },

    /**
     * Method to add a single callback in one channel an in one event.
     * @param {String} sChannelId
     * @param {String} sEventType
     * @param {Function} fpHandler
     * @param {Module} oSubscriber
     */
    subscribeTo: function (sChannelId, sEventType, fpHandler, oSubscriber) {
      var aChannelEvents = this._getChannelEvents(sChannelId, sEventType);
      aChannelEvents.push({
        subscriber: oSubscriber,
        handler: fpHandler
      });
    },

    /**
     * subscribe method gets the oEventsCallbacks object with all the handlers and add these handlers to the channel.
     * @param {Module|Object} oSubscriber
     * @return {Boolean}
     */
    subscribe: function (oSubscriber) {
      var sChannelId, oEventsCallbacks = oSubscriber.events;
      if (!oSubscriber || typeof oEventsCallbacks === 'undefined') {
        return false;
      }
      for (sChannelId in oEventsCallbacks) {
        if (ownProp(oEventsCallbacks, sChannelId)) {
          if (typeof oChannels[sChannelId] === 'undefined') {
            oChannels[sChannelId] = {};
          }
          this._addSubscribers(oEventsCallbacks[sChannelId], sChannelId, oSubscriber);
        }
      }

      return true;
    },

    /**
     * _removeSubscribers remove the subscribers to one channel and return the number of
     * subscribers that have been unsubscribed.
     * @param {Array<Module>} aSubscribers
     * @param {Module} oSubscriber
     * @return {Number}
     * @private
     */
    _removeSubscribers: function (aSubscribers, oSubscriber) {
      var nUnsubscribed = 0,
        nIndex;
      if (typeof aSubscribers !== sNotDefined) {
        nIndex = aSubscribers.length - 1;
        for (; nIndex >= 0; nIndex--) {
          if (aSubscribers[nIndex].subscriber === oSubscriber) {
            nUnsubscribed++;
            aSubscribers.splice(nIndex, 1);
          }
        }
      }
      return nUnsubscribed;
    },

    /**
     * Loops per all the events to remove subscribers.
     * @param {Object} oEventsCallbacks
     * @param {Boolean} bOnlyGlobal
     * @param {String} sChannelId
     * @param {Module} oSubscriber
     * @return {Number}
     * @private
     */
    _removeSubscribersPerEvent: function (oEventsCallbacks, sChannelId, oSubscriber) {
      var sEvent, aEventsParts, sChannel, sEventType, nUnsubscribed = 0;
      for (sEvent in oEventsCallbacks) {
        if (ownProp(oEventsCallbacks, sEvent)) {
          aEventsParts = sEvent.split(':');

          sChannel = sChannelId;
          sEventType = sEvent;
          if (aEventsParts[0] === 'global') {
            sChannel = aEventsParts[0];
            sEventType = aEventsParts[1];
          }
          nUnsubscribed += this._removeSubscribers(oChannels[sChannel][sEventType], oSubscriber);
        }
      }
      return nUnsubscribed;
    },

    /**
     * unsubscribe gets the oEventsCallbacks methods and removes the handlers of the channel.
     * @param {Module|Object} oSubscriber
     * @return {Boolean}
     */
    unsubscribe: function (oSubscriber) {
      var nUnsubscribed = 0, sChannelId, oEventsCallbacks = oSubscriber.events;
      if (!oSubscriber || typeof oEventsCallbacks === 'undefined') {
        return false;
      }

      for (sChannelId in oEventsCallbacks) {
        if (ownProp(oEventsCallbacks, sChannelId)) {
          if (typeof oChannels[sChannelId] === 'undefined') {
            oChannels[sChannelId] = {};
          }
          nUnsubscribed = this._removeSubscribersPerEvent(oEventsCallbacks[sChannelId], sChannelId, oSubscriber);
        }
      }

      return nUnsubscribed > 0;
    },

    /**
     * Method to execute all the callbacks but without blocking the user interface.
     * @param {Array<Module>} aSubscribers
     * @param {Object} oData
     * @param {String} sChannelId
     * @param {String} sEvent
     * @private
     */
    _avoidBlockUI: function (aSubscribers, oData, sChannelId, sEvent) {
      var oHandlerObject,
        aSubs = aSubscribers.concat();
      setTimeout(function recall() {
        var nStart = +new Date();
        do {
          oHandlerObject = aSubs.shift();
          oHandlerObject.handler.call(oHandlerObject.subscriber, oData);
          if (bDebug) {
            ErrorHandler.log(sChannelId, sEvent, oHandlerObject);
          }
        }
        while (aSubs.length > 0 && ( +new Date() - nStart < 50 ));
        if (aSubs.length > 0) {
          setTimeout(recall, 25);
        }
      }, 25);
    },

    /**
     * Publish the event in one channel.
     * @param {String} sChannelId
     * @param {String} sEvent
     * @param {String} oData
     * @return {Boolean}
     */
    publish: function (sChannelId, sEvent, oData) {
      var aSubscribers = this.subscribers(sChannelId, sEvent).slice(),
        nLenSubscribers = aSubscribers.length,
        nIndex = 0,
        oHandlerObject,
        oDataToPublish;
      if (nLenSubscribers === 0) {
        return false;
      }
      oDataToPublish = clone(oData);
      if (bUnblockUI) {
        this._avoidBlockUI(aSubscribers, oDataToPublish, sChannelId, sEvent);
      } else {
        for (; nIndex < nLenSubscribers; nIndex++) {
          oHandlerObject = aSubscribers[nIndex];
          oHandlerObject.handler.call(oHandlerObject.subscriber, oDataToPublish);
          if (bDebug) {
            ErrorHandler.log(sChannelId, sEvent, oHandlerObject);
          }
        }
      }
      return true;
    },

    /**
     * Reset channels
     */
    reset: function () {
      oChannels = {
        global: {}
      };
    }
  };

  /**
   * Add common properties and methods to avoid repeating code in modules
   * @param {String} sModuleId
   * @param {Bus} Bus
   * @private
   */
  function addPropertiesAndMethodsToModule(sModuleId) {
    var oModule,
      fpInitProxy;
    oModule = oModules[sModuleId].creator(Bus, Hydra.module, Hydra.errorHandler(), Hydra);
    oModule.__module_id__ = sModuleId;
    fpInitProxy = oModule.init || nullFunc;
    // Provide compatibility with old versions of Hydra.js
    oModule.__action__ = oModule.__sandbox__ = Bus;
    oModule.events = oModule.events || {};
    oModule.init = function () {
      var aArgs = slice(arguments, 0).concat(oVars);
      Bus.subscribe(oModule);
      return fpInitProxy.apply(this, aArgs);
    };
    oModule.handleAction = function (oNotifier) {
      var fpCallback = this.events[oNotifier.type];
      if (typeof fpCallback === sNotDefined) {
        return;
      }
      fpCallback.call(this, oNotifier);
    };
    // Provide compatibility with old Hydra versions which used to use "destroy" as onDestroy hook.
    oModule.onDestroy = oModule.onDestroy || oModule.destroy || function () {
    };
    oModule.destroy = function () {
      this.onDestroy();
      Bus.unsubscribe(oModule);
      delete oModules[sModuleId].instances[oModule.__instance_id__];
    };
    return oModule;
  }

  /**
   * createInstance is the method that will create the module instance and wrap the method if needed.
   * @param {String} sModuleId
   * @return {Module} Module instance
   * @private
   */
  function createInstance(sModuleId) {
    var oInstance, sName;
    if (typeof oModules[sModuleId] === sNotDefined) {
      throw new Error('The module ' + sModuleId + ' is not registered!');
    }
    oInstance = addPropertiesAndMethodsToModule(sModuleId);
    if (!bDebug) {
      for (sName in oInstance) {
        if (ownProp(oInstance, sName) && isFunction(oInstance[sName])) {
          wrapMethod(oInstance, sName, sModuleId, oInstance[sName]);
        }
      }
    }
    return oInstance;
  }

  /**
   * Simple object to abstract the error handler, the most basic is to be the console object
   * @type {Object|*}
   * @private
   */
  ErrorHandler = root.console || {
    log: function () {
    },
    error: function () {
    }
  };

  /**
   * Class to manage the modules.
   * @constructor
   * @class Module
   * @name Module
   * @private
   */
  Module = function () {
  };

  /**
   * Module Prototype
   * @member Module
   * @type {{type: string, getInstance: Function, oModifyInit: {}, register: Function, _setSuper: Function, _callInSuper: Function, _mergeModuleExtended: Function, _mergeModuleBase: Function, _merge: Function, extend: Function, setInstance: Function, setVars: Function, getVars: Function, _multiModuleStart: Function, _singleModuleStart: Function, start: Function, isModuleStarted: Function, startAll: Function, _multiModuleStop: Function, _singleModuleStop: Function, stop: Function, _stopOneByOne: Function, stopAll: Function, _delete: Function, remove: Function}}
   */
  Module.prototype = {
    /**
     * type is a property to be able to know the class type.
     * @member Module.prototype
     * @type {String}
     */
    type: 'Module',

    /**
     * Wrapper to use createInstance for plugins if needed.
     * @member Module.prototype
     * @type {Function}
     */
    getInstance: createInstance,

    /**
     * oModifyInit is an object where save the extensions to modify the init function to use by extensions.
     * @member Module.prototype
     * @type {Object}
     */
    oModifyInit: {},

    /**
     * register is the method that will add the new module to the oModules object.
     * sModuleId will be the key where it will be stored.
     * @member Module.prototype
     * @param {String} sModuleId
     * @param {Function} fpCreator
     * @return {Module}
     */
    register: function (sModuleId, fpCreator) {
      oModules[sModuleId] = new FakeModule(sModuleId, fpCreator);
      return oModules[sModuleId];
    },

    /**
     * _setSuper add the __super__ support to access to the methods in parent module.
     * @member Module.prototype
     * @param {Module} oFinalModule
     * @param {Module} oModuleBase
     * @private
     */
    _setSuper: function (oFinalModule, oModuleBase) {
      oFinalModule.__super__ = {};
      oFinalModule.__super__.__instance__ = oModuleBase;
      oFinalModule.__super__.__call__ = function (sKey, aArgs) {
        var oObject = this;
        while (ownProp(oObject, sKey) === _false_) {
          oObject = oObject.__instance__.__super__;
        }
        return oObject[sKey].apply(oFinalModule, aArgs);
      };
    },

    /**
     * Callback that is used to call the methods in parent module.
     * @member Module.prototype
     * @param {Function} fpCallback
     * @return {Function}
     * @private
     */
    _callInSuper: function (fpCallback) {
      return function () {
        var aArgs = slice(arguments, 0);
        fpCallback.apply(this, aArgs);
      };
    },

    /**
     * Adds the extended properties and methods to final module.
     * @member Module.prototype
     * @param {Module} oFinalModule
     * @param {Module} oModuleExtended
     * @private
     */
    _mergeModuleExtended: function (oFinalModule, oModuleExtended) {
      var sKey;
      for (sKey in oModuleExtended) {
        if (ownProp(oModuleExtended, sKey)) {
          if (typeof oFinalModule.__super__ !== sNotDefined && isFunction(oFinalModule[sKey])) {
            oFinalModule.__super__[sKey] = (this._callInSuper(oFinalModule[sKey]));
          }
          oFinalModule[sKey] = oModuleExtended[sKey];
        }
      }
    },

    /**
     * Adds the base properties and methods to final module.
     * @member Module.prototype
     * @param {Module} oFinalModule
     * @param {Module} oModuleBase
     * @private
     */
    _mergeModuleBase: function (oFinalModule, oModuleBase) {
      var sKey;
      for (sKey in oModuleBase) {
        if (ownProp(oModuleBase, sKey)) {
          if (sKey !== '__super__') {
            oFinalModule[sKey] = oModuleBase[sKey];
          }
        }
      }
    },

    /**
     * _merge is the method that gets the base module and the extended and returns the merge of them
     * @member Module.prototype
     * @param {Module} oModuleBase
     * @param {Module} oModuleExtended
     * @return {Module}
     * @private
     */
    _merge: function (oModuleBase, oModuleExtended) {
      var oFinalModule = {};
      this._setSuper(oFinalModule, oModuleBase);
      this._mergeModuleBase(oFinalModule, oModuleBase);
      this._mergeModuleExtended(oFinalModule, oModuleExtended);
      return oFinalModule;
    },

    /**
     * extend is the method that will be used to extend a module with new features.
     * can be used to remove some features too, without touching the original code.
     * You can extend a module and create a extended module with a different name.
     * @member Module.prototype
     * @param {String} sModuleId
     * @param {Function|String} oSecondParameter can be the name of the new module that extends the baseModule or a function if we want to extend an existent module.
     * @param {Function} oThirdParameter [optional] this must exist only if we need to create a new module that extends the baseModule.
     * @deprecated
     * @return {undefined|Module}
     */
    extend: function (sModuleId, oSecondParameter, oThirdParameter) {
      var oModule, sFinalModuleId, fpCreator, oBaseModule, oExtendedModule, oFinalModule, self;
      self = this;
      oModule = oModules[sModuleId];
      sFinalModuleId = sModuleId;
      fpCreator = function () {
      };

      // Function "overloading".
      // If the 2nd parameter is a string,
      if (typeof oSecondParameter === 'string') {
        sFinalModuleId = oSecondParameter;
        fpCreator = oThirdParameter;
      }
      else {
        fpCreator = oSecondParameter;
      }
      if (typeof oModule === sNotDefined) {
        return;
      }
      oExtendedModule = fpCreator(Bus, Hydra.module, Hydra.errorHandler(), Hydra);
      oBaseModule = oModule.creator(Bus, Hydra.module, Hydra.errorHandler(), Hydra);

      oModules[sFinalModuleId] = new FakeModule(sFinalModuleId, function (Bus) {
        // If we extend the module with the different name, we
        // create proxy class for the original methods.
        oFinalModule = self._merge(oBaseModule, oExtendedModule);
        // This gives access to the Action instance used to listen and notify.
        // __sandbox__ for adding retrocompatibility
        oFinalModule.__action__ = oFinalModule.__sandbox__ = Bus;
        return oFinalModule;
      });
      return oModules[sFinalModuleId];
    },

    /**
     * Method to set an instance of a module
     * @member Module.prototype
     * @param {String} sModuleId
     * @param {String} sIdInstance
     * @param {Module} oInstance
     * @return {Module}
     */
    setInstance: function (sModuleId, sIdInstance, oInstance) {
      var oModule = oModules[sModuleId];
      if (!oModule) {
        throw new Error('The module ' + sModuleId + ' is not registered!');
      }
      oModule.instances[sIdInstance] = oInstance;
      return oModule;
    },

    /**
     * Sets an object of vars and add it's content to oVars private variable
     * @member Module.prototype
     * @param {Object} oVar
     */
    setVars: function (oVar) {
      if (typeof oVars !== sNotDefined) {
        oVars = simpleMerge(oVars, oVar);
      }
      else {
        oVars = oVar;
      }
    },

    /**
     * Returns the private vars object by copy.
     * @member Module.prototype
     * @return {Object} global vars.
     */
    getVars: function () {
      return simpleMerge({}, oVars);
    },

    /**
     * start more than one module at the same time.
     * @member Module.prototype
     * @param {Array<String>} aModulesIds
     * @param {String} sIdInstance
     * @param {Object} oData
     * @param {Boolean} bSingle
     * @private
     */
    _multiModuleStart: function (aModulesIds, sIdInstance, oData, bSingle) {
      var aInstancesIds, aData, aSingle, nIndex, nLenModules, sModuleId;
      if (isArray(sIdInstance)) {
        aInstancesIds = sIdInstance.slice(0);
      }
      if (isArray(oData)) {
        aData = oData.slice(0);
      }
      if (isArray(bSingle)) {
        aSingle = bSingle.slice(0);
      }
      for (nIndex = 0, nLenModules = aModulesIds.length; nIndex < nLenModules; nIndex++) {
        sModuleId = aModulesIds[nIndex];
        sIdInstance = aInstancesIds && aInstancesIds[nIndex] || generateUniqueKey();
        oData = aData && aData[nIndex] || oData;
        bSingle = aSingle && aSingle[nIndex] || bSingle;
        startSingleModule(this, sModuleId, sIdInstance, oData, bSingle);
      }
    },
    /**
     * Start only one module.
     * @member Module.prototype
     * @param {String} sModuleId
     * @param {String} sIdInstance
     * @param {Object} oData
     * @param {Boolean} bSingle
     * @private
     */
    _singleModuleStart: function (sModuleId, sIdInstance, oData, bSingle) {
      if (typeof sIdInstance !== 'string') {
        bSingle = oData;
        oData = sIdInstance;
        sIdInstance = generateUniqueKey();
      }

      startSingleModule(this, sModuleId, sIdInstance, oData, bSingle);
    },

    /**
     * start is the method that initialize the module/s
     * If you use array instead of arrays you can start more than one module even adding the instance, the data and if it must be executed
     * as single module start.
     * @member Module.prototype
     * @param {String|Array} oModuleId
     * @param {String|Array} oIdInstance
     * @param {Object|Array} oData
     * @param {Boolean|Array} oSingle
     */
    start: function (oModuleId, oIdInstance, oData, oSingle) {
      var bStartMultipleModules = isArray(oModuleId);

      if (bStartMultipleModules) {
        this._multiModuleStart(oModuleId.slice(0), oIdInstance, oData, oSingle);
      }
      else {
        this._singleModuleStart(oModuleId, oIdInstance, oData, oSingle);
      }
    },
    /**
     * Method to decorate modules instead of extend
     * @param sModuleId
     * @param sModuleDecorated
     * @param fpDecorator
     * @returns {null}
     */
    decorate: function (sModuleId, sModuleDecorated, fpDecorator) {
      var oModule = oModules[sModuleId], oInstance;
      if (!oModule) {
        ErrorHandler.log(sModuleId + ' module is not registered!');
        return null;
      }
      oInstance = createInstance(sModuleId);
      oModules[sModuleDecorated] = {
        creator: function (oBus, Module, ErrorHandler, Hydra) {
          var oMerged = {},
            oDecorated = fpDecorator(oBus, Module, ErrorHandler, Hydra, oInstance);
          simpleMerge(oMerged, oInstance);
          simpleMerge(oMerged, oDecorated);
          return oMerged;
        }
      };
      oModules[sModuleDecorated].instances = [];
      return new FakeModule(sModuleDecorated, oModules[sModuleDecorated].creator);
    },
    /**
     * Checks if module was already successfully started
     * @member Module.prototype
     * @param {String} sModuleId Name of the module
     * @param {String} sInstanceId Id of the instance
     * @return {Boolean}
     */
    isModuleStarted: function (sModuleId, sInstanceId) {
      var bStarted = false;
      if (typeof sInstanceId === sNotDefined) {
        bStarted = ( typeof oModules[sModuleId] !== sNotDefined && getObjectLength(oModules[sModuleId].instances) > 0 );
      }
      else {
        bStarted = ( typeof oModules[sModuleId] !== sNotDefined && typeof oModules[sModuleId].instances[sInstanceId] !== sNotDefined );
      }
      return bStarted;
    },

    /**
     * startAll is the method that will initialize all the registered modules.
     * @member Module.prototype
     */
    startAll: function () {
      var sModuleId, oModule;
      for (sModuleId in oModules) {
        if (ownProp(oModules, sModuleId)) {
          oModule = oModules[sModuleId];
          if (typeof oModule !== sNotDefined) {
            this.start(sModuleId, generateUniqueKey());
          }
        }
      }
    },

    /**
     * stop more than one module at the same time.
     * @member Module.prototype
     * @param {Module} oModule
     * @private
     */
    _multiModuleStop: function (oModule) {
      var sKey,
        oInstances = oModule.instances,
        oInstance;
      for (sKey in oInstances) {
        if (ownProp(oInstances, sKey)) {
          oInstance = oInstances[sKey];
          if (typeof oModule !== sNotDefined && typeof oInstance !== sNotDefined) {
            oInstance.destroy();
          }
        }
      }
      oModule.instances = {};
    },

    /**
     * Stop only one module.
     * @member Module.prototype
     * @param {Module} oModule
     * @param {String} sModuleId
     * @param {String} sInstanceId
     * @private
     */
    _singleModuleStop: function (oModule, sModuleId, sInstanceId) {
      var oInstance = oModule.instances[sInstanceId];
      if (typeof oModule !== sNotDefined && typeof oInstance !== sNotDefined) {
        oInstance.destroy();
        delete oModule.instances[sInstanceId];
      }
    },

    /**
     * stop is the method that will finish the module if it was registered and started.
     * When stop is called the module will call the destroy method and will nullify the instance.
     * @member Module.prototype
     * @param {String} sModuleId
     * @param {String} sInstanceId
     * @return {Boolean}
     */
    stop: function (sModuleId, sInstanceId) {
      var oModule;
      oModule = oModules[sModuleId];
      if (typeof oModule === sNotDefined) {
        return false;
      }
      if (typeof sInstanceId !== sNotDefined) {
        this._singleModuleStop(oModule, sModuleId, sInstanceId);
      }
      else {
        this._multiModuleStop(oModule);
      }
      return true;
    },
    /**
     * Loops over instances of modules to stop them.
     * @member Module.prototype
     * @param {Module} oInstances
     * @param {String} sModuleId
     * @private
     */
    _stopOneByOne: function (oInstances, sModuleId) {
      var sInstanceId;
      for (sInstanceId in oInstances) {
        if (ownProp(oInstances, sInstanceId)) {
          this.stop(sModuleId, sInstanceId);
        }
      }
    },

    /**
     * stopAll is the method that will finish all the registered and started modules.
     * @member Module.prototype
     */
    stopAll: function () {
      var sModuleId;
      for (sModuleId in oModules) {
        if (ownProp(oModules, sModuleId) && typeof oModules[sModuleId] !== sNotDefined) {
          this._stopOneByOne(oModules[sModuleId].instances, sModuleId);
        }
      }
    },

    /**
     * _delete is a wrapper method that will call the native delete javascript function
     * It's important to test the full code.
     * @member Module.prototype
     * @param {String} sModuleId
     * @return {Boolean}
     */
    _delete: function (sModuleId) {
      if (typeof oModules[sModuleId] !== sNotDefined) {
        delete oModules[sModuleId];
        return true;
      }
      return false;
    },

    /**
     * remove is the method that will remove the full module from the oModules object
     * @member Module.prototype
     * @param {String} sModuleId
     * @return {Module|null}
     */
    remove: function (sModuleId) {
      var oModule = oModules[sModuleId];
      if (typeof oModule === sNotDefined) {
        return null;
      }
      if (typeof oModule !== sNotDefined) {
        try {
          return oModule;
        }
        finally {
          this._delete(sModuleId);
        }
      }
      return null;
    }
  };

  /**
   * getErrorHandler is a method to gain access to the private ErrorHandler constructor.
   * @return {Object|Function} ErrorHandler class
   * @private
   */
  function getErrorHandler() {
    return ErrorHandler;
  }

  /**
   * setErrorHandler is a method to set the ErrorHandler to a new object to add more logging logic.
   * @param {Object|Function} oErrorHandler
   * @private
   */
  function setErrorHandler(oErrorHandler) {
    ErrorHandler = oErrorHandler;
  }

  /**
   * Hydra is the api that will be available to use by developers
   * @constructor
   * @class Hydra
   * @name Hydra
   */
  Hydra = function () {
  };

  /**
   * Version number of Hydra.
   * @member Hydra
   * @type {String}
   * @static
   */
  Hydra.version = sVersion;

  /**
   * bus is a singleton instance of the bus to subscribe and publish content in channels.
   * @member Hydra
   * @type {Object}
   */
  Hydra.bus = Bus;

  /**
   * Returns the actual ErrorHandler
   * @member Hydra
   * @type {Function}
   * @static
   */
  Hydra.errorHandler = getErrorHandler;

  /**
   * Sets and overwrites the ErrorHandler object to log errors and messages
   * @member Hydra
   * @type {Function}
   * @static
   */
  Hydra.setErrorHandler = setErrorHandler;

  /**
   * Return a singleton of Module
   * @member Hydra
   * @type {Module}
   * @static
   */
  Hydra.module = new Module();

  /**
   * Change the unblock UI mode to on/off
   * @Member Hydra
   * @type {Function}
   * @static
   */
  Hydra.setUnblockUI = setUnblockUI;

  /**
   * Change the debug mode to on/off
   * @member Hydra
   * @type {Function}
   * @static
   */
  Hydra.setDebug = setDebug;

  /**
   * Get the debug status
   * @member Hydra
   * @type {Function}
   * @static
   */
  Hydra.getDebug = function () {
    return bDebug;
  };

  /**
   * Extends Hydra object with new functionality
   * @member Hydra
   * @param {String} sIdExtension
   * @param {Object} oExtension
   * @static
   */
  Hydra.extend = function (sIdExtension, oExtension) {
    if (typeof this[sIdExtension] === sNotDefined) {
      this[sIdExtension] = oExtension;
    }
    else {
      this[sIdExtension] = simpleMerge(this[sIdExtension], oExtension);
    }
  };

  /**
   * Adds an alias to parts of Hydra
   * @member Hydra
   * @param {String} sOldName
   * @param {Object} oNewContext
   * @param {String} sNewName
   * @return {Boolean}
   * @static
   */
  Hydra.noConflict = function (sOldName, oNewContext, sNewName) {
    if (typeof this[sOldName] !== sNotDefined) {
      oNewContext[sNewName] = this[sOldName];
      return true;
    }
    return false;
  };

  /**
   * Merges an object to oModifyInit that will be executed before executing the init.
   * {
   *    'property_in_module_to_check': function(oModule){} // Callback to execute if the property exist
   * }
   * @type {Function}
   * @param {Object} oVar
   */
  Hydra.addExtensionBeforeInit = function (oVar) {

    Hydra.module.oModifyInit = simpleMerge(Hydra.module.oModifyInit, oVar);
  };

  /**
   * To be used about extension, it will return a deep copy of the Modules object to avoid modifying the original
   * object.
   * @returns {Object}
   */
  Hydra.getCopyModules = function () {
    return clone(oModules);
  };

  /**
   * To be used about extension, it will return a deep copy of the Channels object to avoid modifying the original
   * object.
   * @returns {Object}
   */
  Hydra.getCopyChannels = function () {
    return clone(oChannels);
  };
  /**
   * Module to be stored, adds two methods to start and extend modules.
   * @param {String} sModuleId
   * @param {Function} fpCreator
   * @constructor
   * @class FakeModule
   * @name FakeModule
   * @private
   */
  FakeModule = function (sModuleId, fpCreator) {
    if (typeof fpCreator === sNotDefined) {
      throw new Error('Something goes wrong!');
    }
    this.creator = fpCreator;
    this.instances = {};
    this.sModuleId = sModuleId;
  };

  /**
   * FakeModule Prototype
   * @type {{start: Function, extend: Function, stop: Function}}
   */
  FakeModule.prototype = {
    /**
     * Wraps the module start
     * @param {Object} oData
     * @returns {FakeModule}
     */
    start: function (oData) {
      Hydra.module.start(this.sModuleId, oData);
      return this;
    },

    /**
     * Wraps the module extend
     * @param {Module} oSecondParameter
     * @param {Module} oThirdParameter
     * @returns {FakeModule}
     */
    extend: function (oSecondParameter, oThirdParameter) {
      Hydra.module.extend(this.sModuleId, oSecondParameter, oThirdParameter);
      return this;
    },

    /**
     * Wraps the module stop
     * @returns {FakeModule}
     */
    stop: function () {
      Hydra.module.stop(this.sModuleId);
      return this;
    }
  };

  /*
   * Expose Hydra to be used in node.js, as AMD module or as global
   */
  root.Hydra = Hydra;
  if (isNodeEnvironment) {
    module.exports = Hydra;
  }
  else if (typeof define !== 'undefined') {
    define('hydra', [], function () {
      return Hydra;
    });
  }
}.call(this));