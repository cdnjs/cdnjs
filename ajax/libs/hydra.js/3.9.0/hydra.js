(function (root, und) {
  'use strict';
  /**
   * Module instance
   * @type {Object}
   */
  var oModule,
  /**
   * Special Mapping
   * @type {Object}
   */
  oMapping,
  /**
   * Mapping of prefixes by object to check to resolve dependencies.
   */
  oMappingMaps = { ___order___: [] },
  /**
   * set the global namespace to be the same as root
   * use Hydra.setNamespace to change it.
   */
  namespace = root,
  /**
   * Cache Error
   * @type {Function}
   */
  Err = Error,
  /**
   * Cache 'undefined' string to test typeof
   * @type {String}
   * @private
   */
  sNotDefined = 'undefined',
  /**
   * Property that will save the registered modules
   * @type {Object}
   * @private
   */
  oModules = {},
  /**
   * Private variables object to be shared between modules
   * @type {{}}
   */
  oVars = {},
  /**
   * Object type string
   * @type {string}
   */
  sObjectType = 'object',
  /**
   * Contains a reference to false to decrease final size
   * @type {Boolean}
   * @private
   */
  _false_ = false,
  /**
   * Function type string
   * @type {string}
   */
  sFunctionType = 'function',
  /**
   * Used to activate the debug mode
   * @type {Boolean}
   * @private
   */
  bDebug = _false_,
  /**
   * Private object to save the channels for communicating event driven
   * @type {{global: Object}}
   * @private
   */
  oChannels = {
    global: {}
  },
  /**
   * Check if Hydra.js is loaded in Node.js environment
   * @type {Boolean}
   * @private
   */
  isNodeEnvironment = isTypeOf( root.exports, sObjectType ) && isTypeOf( root.module, sObjectType ) && isTypeOf( root.module.exports, sObjectType) && isTypeOf( root.require, sFunctionType ),
  FakeModule, Hydra, ErrorHandler, Module, Bus, Promise, When ;

  /**
   * Helper to iterate over objects using for-in approach
   * @param oObject
   * @param fpProcess
   */
  function iterateObject( oObject, fpProcess ){
    var sKey;

    for ( sKey in oObject ) {
      if ( oObject.hasOwnProperty( sKey ) ) {
        fpProcess( oObject[sKey], sKey );
      }
    }
  }
  /**
   * Returns an instance of Promise
   * @returns {Promise}
   */
  function getPromise(){
    return new Promise();
  }
  /**
   * Helper function to create the mapping
   * @param {Object} oMapping
   * @param {String} sId
   * @param {Object} oMap
   * @param {Function} [fpResolveDI]
   */
  function createMapping( oMapping, sId, oMap, fpResolveDI ) {
    oMapping.___order___.push( sId );
    oMapping[sId] = {
      __map__: oMap
    };
    if ( !fpResolveDI ){
      fpResolveDI = getResolveDICallback( oMapping[sId] );
    }
    oMapping[sId].__resolveDI__ = fpResolveDI;
  }
  /**
   * Returns the callback to be executed when needed.
   * @param nIndex
   * @param sType
   * @param oData
   * @param nLenArgs
   * @param oPromise
   * @param aSolutions
   * @returns {Function}
   */
  function getThenCallbacks( nIndex, sType, oData, nLenArgs, oPromise, aSolutions) {
    return function ( oObj ) {
      oData.nLenPromisesResolved++;
      aSolutions[nIndex] = oObj;
      if ( nLenArgs === oData.nLenPromisesResolved ) {
        oPromise[sType].apply( oPromise, aSolutions );
      }
    };
  }

  /**
   * Returns the promise callback by type
   * @param oContext
   * @param sType
   * @returns {Function}
   */
  function getPromiseCallbacks( oContext, sType ) {
    return function () {
      oContext.bCompleted = true;
      oContext.sType = sType;
      oContext.oResult = arguments;
      while ( oContext.aPending[0] ) {
        oContext.aPending.shift()[sType].apply( oContext, arguments );
      }
    };
  }

  /**
   * Traverse all the mapping systems to get a match.
   * @param sDependency
   * @returns {*}
   */
  function getDependencyThroughAllMaps( sDependency ){
    var oMap,
    oDependency,
    nIndexOrder,
    nLenOrder,
    aOrderDependency = oMappingMaps.___order___;

    createMapping( oMappingMaps, '__', root, function ( sDependency ) {
      var oDependency,
      oPromise = getPromise();
      oDependency = resolveNamespace( sDependency );
      oPromise.resolve( oDependency );
      return oPromise;
    } );

    for ( nIndexOrder = 0, nLenOrder = aOrderDependency.length; nIndexOrder < nLenOrder; nIndexOrder++ ) {
      oMap = oMappingMaps[aOrderDependency[nIndexOrder]];
      oDependency = oMap.__resolveDI__( sDependency );
      if ( oDependency )
      {
        delete oMappingMaps.__;
        return oDependency;
      }
    }
    delete oMappingMaps.__;
  }

  /**
   * Resolve dependency injection by default.
   * @param {Object} oMapping
   * @returns {*}
   * @private
   */
  function getResolveDICallback( oMapping ) {
    return function ( sDependency ) {
      var oPromise = getPromise();
      if ( !oMapping.__map__[sDependency] ){
        return false;
      }
      oPromise.resolve( oMapping.__map__[sDependency] );
      return oPromise;
    };
  }

  /**
   * Create or get a namespace by a namespace defined as string
   * @param sNamespace
   * @returns {root|*}
   */
  function resolveNamespace( sNamespace )
  {
    var oObj = root,
    aElements = sNamespace.split( '.' ),
    sElement;
    while ( !!( sElement = aElements.shift() ) ) {
      oObj = oObj[sElement] !== und ? oObj[sElement] : oObj[sElement] = {};
    }
    return oObj;
  }

  /**
   * Check if is the type indicated
   * @param oMix
   * @param sType
   * @returns {boolean}
   */
  function isTypeOf( oMix, sType ) {
    return typeof oMix === sType;
  }

  /**
   * Wrapper of instanceof to reduce final size
   * @param oInstance
   * @param oConstructor
   * @returns {boolean}
   */
  function isInstanceOf( oInstance, oConstructor ) {
    return oInstance instanceof oConstructor;
  }

  /**
   * Return the message to show when a module is not registered
   * @param {String} sModuleId
   * @param {Boolean} [bThrow]
   * @returns {String}
   */
  function fpThrowErrorModuleNotRegistered( sModuleId, bThrow ) {
    var sMessage = 'The module ' + sModuleId + ' is not registered in the system';
    if ( bThrow ) {
      throw new Err( sMessage );
    }
    return sMessage;
  }

  /**
   * Use Event detection and if it fails it degrades to use duck typing detection to test if the supplied object is an Event
   * @param oObj
   * @returns {boolean}
   */
  function isEvent( oObj ) {
    try {
      return isInstanceOf( oObj, Event );
    } catch ( erError ) {
      // Duck typing detection (If it sounds like a duck and it moves like a duck, it's a duck)
      if ( oObj.altKey !== und && ( oObj.srcElement || oObj.target ) ) {
        return true;
      }
    }
    return _false_;
  }

  /**
   * Use jQuery detection
   * @param oObj
   * @returns {boolean}
   */
  function isJqueryObject( oObj ) {
    var isJquery = _false_,
    $ = root.jQuery;
    if ( $ ) {
      isJquery = isInstanceOf( oObj, $ );
    }
    return isJquery;
  }

  /**
   * nullFunc
   * An empty function to be used as default is no supplied callbacks.
   * @private
   */
  function nullFunc() {}

  /**
   * Used to generate an unique key for instance ids that are not supplied by the user.
   * @return {String}
   * @private
   */
  function generateUniqueKey() {
    var oMath = Math, sFirstToken = +new Date() + '',
    sSecondToken = oMath.floor( oMath.random() * ( 999999 - 1 + 1 ) ) + 1;
    return sFirstToken + '_' + sSecondToken;
  }

  /**
   * Return the length of properties of one object
   * @param {Object} oObj
   * @return {Number}
   * @private
   */
  function getObjectLength( oObj ) {
    var nLen, fpKeys = Object.keys;
    if ( fpKeys ) {
      nLen = fpKeys( oObj ).length;
    }
    else {
      nLen = 0;
      iterateObject( oObj, function (){
        nLen++;
      } );
    }
    return nLen;
  }

  /**
   * Wrapper of Object.prototype.toString to detect type of object in cross browsing mode.
   * @param {Object} oObject
   * @return {String}
   * @private
   */
  function toString( oObject ) {
    return Object.prototype.toString.call( oObject );
  }

  /**
   * isFunction is a function to know if the object passed as parameter is a Function object.
   * @param {Object} fpCallback
   * @return {Boolean}
   * @private
   */
  function isFunction( fpCallback ) {
    return toString( fpCallback ) === '[' + sObjectType + ' Function]';
  }

  /**
   * isArray is a function to know if the object passed as parameter is an Array object.
   * @param {String|Array|Object} aArray
   * @return {Boolean}
   * @private
   */
  function isArray(aArray) {
    return toString(aArray) === '[' + sObjectType + ' Array]';
  }

  /**
   * setDebug is a method to set the bDebug flag.
   * @param {Boolean} _bDebug
   * @private
   */
  function setDebug( _bDebug ) {
    bDebug = _bDebug;
  }

  /**
   * Return a copy of an Array or convert a LikeArray object to Array
   * @param oLikeArray
   */
  function copyArray( oLikeArray ) {
    return [].slice.call( oLikeArray, 0 );
  }

  /**
   * Method to modify the init method to use it for extend.
   * @param {Object} oInstance
   * @param {Object} oModifyInit
   * @param {Object} oData
   * @param {Boolean} bSingle
   * @private
   */
  function beforeInit( oInstance, oModifyInit, oData, bSingle ) {
    iterateObject( oModifyInit, function ( oMember, sKey ) {
      if ( oInstance[sKey] && isTypeOf( oMember, sFunctionType ) ) {
        oMember( oInstance, oData, bSingle );
      }
    } );
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
  function startSingleModule( oWrapper, sModuleId, sIdInstance, oData, bSingle ) {
    var oModule;
    oModule = oModules[sModuleId];
    if ( bSingle && oWrapper.isModuleStarted( sModuleId ) ) {
      oWrapper.stop( sModuleId );
    }
    if ( !isTypeOf( oModule, sNotDefined ) ) {
      createInstance( sModuleId, undefined, function ( oInstance ){
        oModule.instances[sIdInstance] = oInstance;
        oInstance.__instance_id__ = sIdInstance;

        beforeInit( oInstance, oWrapper.oModifyInit, oData, bSingle );

        if ( !isTypeOf( oData, sNotDefined ) ) {
          oInstance.init( oData );
        } else {
          oInstance.init();
        }
      });
    } else {
      ErrorHandler.error( new Err(), fpThrowErrorModuleNotRegistered( sModuleId ) );
    }
  }

  /**
   * Do a simple merge of two objects overwriting the target properties with source properties
   * @param {Object} oTarget
   * @param {Object} oSource
   * @private
   */
  function simpleMerge( oTarget, oSource ) {
    iterateObject( oSource , function ( oItem, sKey ) {
      oTarget[sKey] = oSource[sKey];
    } );
    return oTarget;
  }

  /**
   * Return a copy of the object.
   * @param {Object} oObject
   */
  function clone( oObject ) {
    var oCopy;
    // Handle null, undefined, DOM element, Event and jQuery objects, and all the objects that are instances of a constructor different from Object.
    if ( null == oObject ||      // Is null
    !isTypeOf( oObject, sObjectType ) ||  // Is not an object (primitive)
    oObject.constructor.toString().indexOf( 'Object()' ) === -1 ||  // Is an instance
    isEvent( oObject ) ||   // Is an event
    isJqueryObject( oObject ) ||  // Is a jQuery object
    ( oObject.nodeType && oObject.nodeType === 1 ) ) { // Is a DOM element
      return oObject;
    }

    // Handle Date
    if ( isInstanceOf( oObject, Date ) ) {
      oCopy = new Date();
      oCopy.setTime(oObject.getTime());
      return oCopy;
    }

    // Handle Array
    if ( isInstanceOf( oObject, Array ) ) {
      oCopy = copyArray( oObject );
      return oCopy;
    }

    // Handle Object
    if ( isInstanceOf( oObject, Object ) ) {
      oCopy = {};
      iterateObject( oObject, function ( oItem, sKey ) {
        oCopy[sKey] = clone(oItem);
      } );
      return oCopy;
    }

    throw new Err( 'Unable to copy object!' );
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
  function wrapMethod( oInstance, sName, sModuleId, fpMethod ) {
    oInstance[sName] = ( function ( sName, fpMethod ) {
      return function () {
        var aArgs = copyArray( arguments );
        try {
          return fpMethod.apply( this, aArgs );
        }
        catch ( erError ) {
          ErrorHandler.error(sModuleId, sName, erError);
          return _false_;
        }
      };
    }(sName, fpMethod));
  }



  /**
   * subscribersByEvent return all the subscribers of the event in the channel.
   * @param {Object} oChannel
   * @param {String} sEventName
   * @return {Array<Module>}
   * @private
   */
  function subscribersByEvent(oChannel, sEventName) {
    var aSubscribers = [];
    if (!isTypeOf(oChannel, sNotDefined)) {
      iterateObject( oChannel, function ( oItem, sKey ) {
        if( sKey === sEventName ){
          aSubscribers = oItem;
        }
      } );
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
      if (oChannels[sChannelId] === und) {
        oChannels[sChannelId] = {};
      }
      if (oChannels[sChannelId][sEvent] === und) {
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
      var self = this;
      iterateObject( oEventsCallbacks, function ( oItem, sEvent ) {
        self.subscribeTo(sChannelId, sEvent, oItem, oSubscriber);
      });
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
      var self = this, oEventsCallbacks = oSubscriber.events;
      if (!oSubscriber || oEventsCallbacks === und) {
        return _false_;
      }
      iterateObject( oEventsCallbacks, function ( oItem, sChannelId ) {
        if( oChannels[sChannelId] === und ){
          oChannels[sChannelId] = {};
        }
        self._addSubscribers(oItem, sChannelId, oSubscriber);
      } );

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
      if (!isTypeOf(aSubscribers, sNotDefined)) {
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
     * @param {String} sChannelId
     * @param {Module} oSubscriber
     * @return {Number}
     * @private
     */
    _removeSubscribersPerEvent: function (oEventsCallbacks, sChannelId, oSubscriber) {
      var self = this, aEventsParts, sChannel, sEventType, nUnsubscribed = 0;
      iterateObject( oEventsCallbacks, function ( oItem, sEvent ) {
        aEventsParts = sEvent.split(':');
        sChannel = sChannelId;
        sEventType = sEvent;
        if (aEventsParts[0] === 'global') {
          sChannel = aEventsParts[0];
          sEventType = aEventsParts[1];
        }
        nUnsubscribed += self._removeSubscribers(oChannels[sChannel][sEventType], oSubscriber);
      } );
      return nUnsubscribed;
    },

    /**
     * unsubscribe gets the oEventsCallbacks methods and removes the handlers of the channel.
     * @param {Module|Object} oSubscriber
     * @return {Boolean}
     */
    unsubscribe: function (oSubscriber) {
      var self = this, nUnsubscribed = 0, oEventsCallbacks = oSubscriber.events;
      if (!oSubscriber || oEventsCallbacks === und) {
        return _false_;
      }
      iterateObject( oEventsCallbacks, function ( oItem, sChannelId) {
        if (oChannels[sChannelId] === und) {
          oChannels[sChannelId] = {};
        }
        nUnsubscribed = self._removeSubscribersPerEvent(oItem, sChannelId, oSubscriber);
      } );

      return nUnsubscribed > 0;
    },

    /**
     * Method to execute handlers
     * @param {Object} oHandlerObject
     * @param {Object} oData
     * @param {String} sChannelId
     * @param {String} sEvent
     */
    _executeHandler: function ( oHandlerObject, oData, sChannelId, sEvent ) {
      oHandlerObject.handler.call(oHandlerObject.subscriber, oData);
      if (bDebug) {
        ErrorHandler.log(sChannelId, sEvent, oHandlerObject);
      }
    },

    /**
     * Publish the event in one channel.
     * @param {String} sChannelId
     * @param {String} sEvent
     * @param {String} oData
     * @return {Boolean}
     */
    publish: function (sChannelId, sEvent, oData) {
      var aSubscribers = copyArray( this.subscribers(sChannelId, sEvent) ),
      oSubscriber,
      nLenSubscribers = aSubscribers.length;
      if (nLenSubscribers === 0) {
        return _false_;
      }
      while( !!(oSubscriber = aSubscribers.shift()) ){
        this._executeHandler(oSubscriber, oData, sChannelId, sEvent);
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
  function dependencyInjector(sModuleId, aDependencies) {
    var sDependency,
    sPrefix,
    aPromises = [],
    nDependencies = 0,
    oMap,
    oDependency,
    oPromise,
    oResult = {
      mapping: [],
      dependencies: []
    };

    aDependencies = (aDependencies !== und ? aDependencies : (oModules[sModuleId].dependencies || [])).concat();

    while ( !!(sDependency = aDependencies.shift()) ) {

      if ( isTypeOf( sDependency, 'string') ) {
        if ( sDependency.indexOf( '_' ) === 2 ){
          sPrefix = sDependency.substr(0, 3);
        }else if ( sDependency.indexOf( '$' ) === 0 ) {
          sPrefix = sDependency.substr(0, 1);
        }else{
          sPrefix = '';
        }
        oMap = oMappingMaps[ sPrefix ] || oMappingMaps[ 'gl_' ];
        sDependency = sDependency.replace(sPrefix, '');
        oDependency = oMap.__map__[sDependency];
        if ( !oDependency ) {
          oDependency = getDependencyThroughAllMaps( sDependency );
        }else{
          oDependency = oMap.__resolveDI__( sDependency );
        }

        oResult.mapping.push( sDependency );
      }else{
        oDependency = getPromise();
        oDependency.resolve( sDependency );
        oResult.mapping.push( oModules[sModuleId].dependencies[nDependencies] );
      }
      aPromises.push( oDependency );
    }
    oPromise = getPromise();

    When.apply(When, aPromises ).then( function(){
      oPromise.resolve.apply( oPromise, [oResult.mapping].concat( copyArray( arguments ) ) );
    } );
    return oPromise;
  }

  /**
   * Add common properties and methods to avoid repeating code in modules
   * @param {String} sModuleId
   * @param {Array} aDependencies
   * @param {Function} fpCallback
   * @private
   */
  function addPropertiesAndMethodsToModule(sModuleId, aDependencies, fpCallback) {
    var oPromise;
    function success( mapping ){
      var oModule, fpInitProxy;
      oModule = oModules[sModuleId].creator.apply( oModules[sModuleId], [].slice.call( arguments, 1 ) );
      oModule.dependencies = aDependencies;
      oModule.resolvedDependencies = mapping;
      oModule.__module_id__ = sModuleId;
      fpInitProxy = oModule.init || nullFunc;
      // Provide compatibility with old versions of Hydra.js
      oModule.__action__ = oModule.__sandbox__ = Bus;
      oModule.events = oModule.events || {};
      oModule.init = function () {
        var aArgs = copyArray( arguments ).concat(oVars);
        Bus.subscribe(oModule);
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
      oModule.onDestroy = oModule.onDestroy || oModule.destroy || function () {
      };
      oModule.destroy = function () {
        this.onDestroy();
        Bus.unsubscribe(oModule);
        delete oModules[sModuleId].instances[oModule.__instance_id__];
      };
      fpCallback(oModule);
    }
    oPromise = dependencyInjector(sModuleId, aDependencies);
    oPromise.then(function () {
      success.apply(success, arguments);
    });
  }

  /**
   * createInstance is the method that will create the module instance and wrap the method if needed.
   * @param {String} sModuleId
   * @param {Array} [aDependencies]
   * @param {Function} fpCallback
   * @private
   */
  function createInstance(sModuleId, aDependencies, fpCallback) {
    if (isTypeOf(oModules[sModuleId], sNotDefined)) {
      fpThrowErrorModuleNotRegistered(sModuleId, true);
    }
    addPropertiesAndMethodsToModule(sModuleId, aDependencies, function ( oInstance ){
      if (!bDebug) {
        iterateObject( oInstance, function ( oItem, sName ) {
          if( isFunction( oItem ) ) {
            wrapMethod(oInstance, sName, sModuleId, oInstance[sName]);
          }
        } );
      }
      fpCallback(oInstance);
    });
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
    this.__super__ = {};
    this.instances = {};
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
     * @param {Array} aDependencies
     * @param {Function | *} fpCreator
     * @return {Module
     */
    register: function (sModuleId, aDependencies, fpCreator) {
      if (isFunction(aDependencies)) {
        fpCreator = aDependencies;
        aDependencies = [ Bus, oModule, ErrorHandler, Hydra ];
      }
      oModules[sModuleId] = new FakeModule(sModuleId, fpCreator);

      oModules[sModuleId].dependencies = aDependencies;
      return oModules[sModuleId];
    },

    /**
     * _setSuper add the __super__ support to access to the methods in parent module.
     * @member Module.prototype
     * @param {Object} oFinalModule
     * @param {Object} oModuleBase
     * @private
     */
    _setSuper: function (oFinalModule, oModuleBase) {
      oFinalModule.__super__ = {};
      oFinalModule.__super__.__instance__ = oModuleBase;
      oFinalModule.__super__.__call__ = function (sKey, aArgs) {
        var oObject = this;
        while (oObject.hasOwnProperty(sKey) === _false_) {
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
        var aArgs = copyArray( arguments );
        fpCallback.apply(this, aArgs);
      };
    },

    /**
     * Adds the extended properties and methods to final module.
     * @member Module.prototype
     * @param {Object} oFinalModule
     * @param {Object} oModuleExtended
     * @private
     */
    _mergeModuleExtended: function (oFinalModule, oModuleExtended) {
      iterateObject( oModuleExtended, function ( oItem, sKey ) {
        if (!isTypeOf(oFinalModule.__super__, sNotDefined) && isFunction(oFinalModule[sKey])) {
          oFinalModule.__super__[sKey] = (this._callInSuper(oFinalModule[sKey]));
        }
        oFinalModule[sKey] = oItem;
      } );
    },

    /**
     * Adds the base properties and methods to final module.
     * @member Module.prototype
     * @param {Object} oFinalModule
     * @param {Object} oModuleBase
     * @private
     */
    _mergeModuleBase: function (oFinalModule, oModuleBase) {
      iterateObject( oModuleBase, function ( oItem, sKey ) {
        if (sKey !== '__super__') {
          oFinalModule[sKey] = oItem;
        }
      } );
    },

    /**
     * _merge is the method that gets the base module and the extended and returns the merge of them
     * @member Module.prototype
     * @param {Object} oModuleBase
     * @param {Object} oModuleExtended
     * @return {Object}
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
        fpThrowErrorModuleNotRegistered(sModuleId, true);
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
      if (!isTypeOf(oVars, sNotDefined)) {
        oVars = simpleMerge(oVars, oVar);
      }
      else {
        oVars = oVar;
      }
    },

    /**
     * Reset the vars object
     * @member Module.prototype
     */
    resetVars: function () {
      oVars = {};
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
        aInstancesIds = copyArray( sIdInstance );
      }
      if (isArray(oData)) {
        aData = copyArray( oData );
      }
      if (isArray(bSingle)) {
        aSingle = copyArray( bSingle );
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
     * @param {Boolean|*} bSingle
     * @private
     */
    _singleModuleStart: function (sModuleId, sIdInstance, oData, bSingle) {
      if (!isTypeOf(sIdInstance, 'string')) {
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
     * @param {String|Array} [oIdInstance]
     * @param {Object|Array} [oData]
     * @param {Boolean|Array} [oSingle]
     */
    start: function (oModuleId, oIdInstance, oData, oSingle) {
      var bStartMultipleModules = isArray(oModuleId);

      if (bStartMultipleModules) {
        this._multiModuleStart( copyArray( oModuleId ), oIdInstance, oData, oSingle);
      }
      else {
        this._singleModuleStart(oModuleId, oIdInstance, oData, oSingle);
      }
    },
    /**
     * Method to extend modules using inheritance or decoration pattern
     * @param sBaseModule
     * @param sModuleDecorated
     * @param aDependencies
     * @param fpDecorator
     * @returns {*}
     */
    extend: function (sBaseModule, sModuleDecorated, aDependencies, fpDecorator) {
      var oModule = oModules[sBaseModule], oDecorated, oPromise;
      oPromise = getPromise();
      if (!oModule) {
        ErrorHandler.log(fpThrowErrorModuleNotRegistered(sBaseModule));
        oPromise.resolve( null );
        return oPromise;
      }

      createInstance(sBaseModule, undefined, function ( oInstance ){
        if (isTypeOf(sModuleDecorated, sFunctionType)) {
          fpDecorator = sModuleDecorated;
          sModuleDecorated = sBaseModule;
          aDependencies = [Bus, oModule, Hydra.errorHandler(), Hydra];
        }
        if (isTypeOf(aDependencies, sFunctionType)) {
          fpDecorator = aDependencies;
          aDependencies = [Bus, oModule, Hydra.errorHandler(), Hydra];
        }
        aDependencies.push(oInstance);
        oDecorated = fpDecorator.apply(fpDecorator, aDependencies);

        oModules[sModuleDecorated] = new FakeModule(sModuleDecorated, function () {
          // If we extend the module with the different name, we
          // create proxy class for the original methods.
          var oMerge = {};
          oMerge = simpleMerge(oMerge, oInstance);
          oMerge = simpleMerge(oMerge, oDecorated);
          oMerge = simpleMerge(oMerge, {
            __super__: {
              __call__: function (sKey, aArgs) {
                return oInstance[sKey].apply(oMerge, aArgs);
              }
            }
          });
          return oMerge;
        });
        oModules[sModuleDecorated].dependencies = aDependencies;
        oPromise.resolve( oModules[sModuleDecorated] );
      });
      return oPromise;
    },
    /**
     * Alias decorate to extend modules.
     * @returns {Module}
     */
    decorate: function () {
      return this.extend.apply(this, arguments);
    },
    /**
     * Checks if module was already successfully started
     * @member Module.prototype
     * @param {String} sModuleId Name of the module
     * @param {String} sInstanceId Id of the instance
     * @return {Boolean}
     */
    isModuleStarted: function (sModuleId, sInstanceId) {
      var bStarted = _false_;
      if (isTypeOf(sInstanceId, sNotDefined)) {
        bStarted = ( !isTypeOf(oModules[sModuleId], sNotDefined) && getObjectLength(oModules[sModuleId].instances) > 0 );
      }
      else {
        bStarted = ( !isTypeOf(oModules[sModuleId], sNotDefined) && !isTypeOf(oModules[sModuleId].instances[sInstanceId], sNotDefined) );
      }
      return bStarted;
    },

    /**
     * startAll is the method that will initialize all the registered modules.
     * @member Module.prototype
     */
    startAll: function () {
      var self = this;
      iterateObject( oModules, function ( oModule, sModuleId ) {
        if (!isTypeOf(oModule, sNotDefined)) {
          self.start(sModuleId, generateUniqueKey());
        }
      } );
    },

    /**
     * stop more than one module at the same time.
     * @member Module.prototype
     * @param {Module} oModule
     * @private
     */
    _multiModuleStop: function (oModule) {
      iterateObject( oModule.instances, function ( oInstance ) {
        if (!isTypeOf(oModule, sNotDefined) && !isTypeOf(oInstance, sNotDefined)) {
          oInstance.destroy();
        }
      } );
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
      if (!isTypeOf(oModule, sNotDefined) && !isTypeOf(oInstance, sNotDefined)) {
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
      if (isTypeOf(oModule, sNotDefined)) {
        return _false_;
      }
      if (!isTypeOf(sInstanceId, sNotDefined)) {
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
      var self = this;
      iterateObject( oInstances, function ( oItem, sInstanceId ) {
        self.stop(sModuleId, sInstanceId);
      } );
    },

    /**
     * stopAll is the method that will finish all the registered and started modules.
     * @member Module.prototype
     */
    stopAll: function () {
      var self = this;
      iterateObject( oModules, function ( oModule, sModuleId ) {
        if( !isTypeOf( oModule, sNotDefined) ) {
          self._stopOneByOne( oModule.instances, sModuleId );
        }
      } );
    },

    /**
     * _delete is a wrapper method that will call the native delete javascript function
     * It's important to test the full code.
     * @member Module.prototype
     * @param {String} sModuleId
     * @return {Boolean}
     */
    _delete: function (sModuleId) {
      if (!isTypeOf(oModules[sModuleId], sNotDefined)) {
        delete oModules[sModuleId];
        return true;
      }
      return _false_;
    },

    /**
     * remove is the method that will remove the full module from the oModules object
     * @member Module.prototype
     * @param {String} sModuleId
     * @return {Module|null}
     */
    remove: function (sModuleId) {
      var oModule = oModules[sModuleId];
      if (isTypeOf(oModule, sNotDefined)) {
        return null;
      }
      if (!isTypeOf(oModule, sNotDefined)) {
        try {
          return oModule;
        }
        finally {
          this._delete(sModuleId);
          createMapping( oMappingMaps, 'hm_', oModules );
        }
      }
      return null;
    },

    /**
     * Stop all the running modules and cleans all the stored modules.
     */
    reset: function () {
      oModule.stopAll();
      oModules = {};
      createMapping( oMappingMaps, 'hm_', oModules );
    }
  };

  /**
   * Promise is a class that must/can be used to defer execution of one or some callbacks when one condition (normally some asynchronous callbacks that are depending one of other)
   * @class Promise
   * @constructor
   * @name Promise
   */
  Promise = function () {
    // Pending callbacks
    this.aPending = [];
    this.bCompleted = false;
    this.sType = '';
    this.oResult = null;

    // Must be called when something finished successfully
    this.resolve = getPromiseCallbacks(this, 'resolve');
    // Must be called when something fails
    this.reject = getPromiseCallbacks(this, 'reject');
  };

  /**
   * Adds new callbacks to execute when the promise has been completed
   * @member Promise.prototype
   * @param {Function} fpSuccess
   * @param {Function} fpFailure
   * @return {Promise} Promise instance
   */
  Promise.prototype.then = function ( fpSuccess, fpFailure ) {
    if(this.bCompleted){
      if(this.sType === 'resolve'){
        fpSuccess.apply(fpSuccess, this.oResult);
      }else{
        fpFailure.apply(fpFailure, this.oResult);
      }
    }else{
      this.aPending.push( { resolve: fpSuccess, reject: fpFailure} );
    }
    return this;
  };

  /**
   * Sugar function to create a new Deferred object.
   * When expects Promise objects to be added to the Deferred object [Promise1, Promise2,...PromiseN]
   * If one of the arguments is not a Promise When assume that we want to complete the Deferred object
   * @private
   */
  When = function () {
    var aArgs, nArg, nLenArgs, oPromise, oArg, oData, aSolutions;
    aArgs = copyArray( arguments );
    nLenArgs = aArgs.length;
    oPromise = getPromise();
    oData = {
      nLenPromisesResolved: 0
    };
    aSolutions = [];

    for ( nArg = 0; nArg < nLenArgs; nArg++ ) {
      oArg = aArgs[nArg];
      oArg.then(getThenCallbacks(nArg, 'resolve', oData, nLenArgs, oPromise, aSolutions),
      getThenCallbacks(nArg, 'reject', oData, nLenArgs, oPromise, aSolutions));
    }

    return oPromise;
  };
  oModule = new Module();
  /**
   * Hydra is the api that will be available to use by developers
   * @constructor
   * @class Hydra
   * @name Hydra
   */
  Hydra =  {
    /**
     * Version number of Hydra.
     * @member Hydra
     * @type {String}
     * @static
     */
    version: '3.9.0',

    /**
     * bus is a singleton instance of the bus to subscribe and publish content in channels.
     * @member Hydra
     * @type {Object}
     */
    bus: Bus,

    /**
     * Returns the actual ErrorHandler
     * @member Hydra
     * @type {Function}
     * @static
     */
    errorHandler: function () {
      return ErrorHandler;
    },

    /**
     * Sets and overwrites the ErrorHandler object to log errors and messages
     * @member Hydra
     * @type {Function}
     * @static
     */
    setErrorHandler: function (oErrorHandler) {
      ErrorHandler = oErrorHandler;
    },

    /**
     * Returns the constructor of Promise object
     * @static
     * @member Hydra
     * @type {Promise}
     */
    Promise: Promise,

    /**
     * Returns the constructor of Deferred object
     * @static
     * @member Hydra
     * @type {Deferred}
     */
    Deferred: Promise,
    /**
     * Sugar method to generate Deferred objects in a simple way
     * @static
     * @member Hydra
     */
    when: When,

    /**
     * Return a singleton of Module
     * @member Hydra
     * @type {Module}
     * @static
     */
    module: oModule,

    /**
     * Change the debug mode to on/off
     * @member Hydra
     * @type {Function}
     * @static
     */
    setDebug: setDebug,

    /**
     * Get the debug status
     * @member Hydra
     * @type {Function}
     * @static
     */
    getDebug: function () {
      return bDebug;
    },

    /**
     * Extends Hydra object with new functionality
     * @member Hydra
     * @param {String} sIdExtension
     * @param {Object} oExtension
     * @static
     */
    extend: function (sIdExtension, oExtension) {
      if (isTypeOf(this[sIdExtension], sNotDefined)) {
        this[sIdExtension] = oExtension;
      }
      else {
        this[sIdExtension] = simpleMerge(this[sIdExtension], oExtension);
      }
    },

    /**
     * Resolve dependencies of modules
     */
    resolveDependencies: dependencyInjector,
    /**
     * Adds an alias to parts of Hydra
     * @member Hydra
     * @param {String} sOldName
     * @param {Object} oNewContext
     * @param {String} sNewName
     * @return {Boolean}
     * @static
     */
    noConflict: function (sOldName, oNewContext, sNewName) {
      if (!isTypeOf(this[sOldName], sNotDefined)) {
        oNewContext[sNewName] = this[sOldName];
        return true;
      }
      return _false_;
    },
    /**
     * Merges an object to oModifyInit that will be executed before executing the init.
     * {
   *    'property_in_module_to_check': function(oModule){} // Callback to execute if the property exist
   * }
     * @type {Function}
     * @param {Object} oVar
     */
    addExtensionBeforeInit: function (oVar) {
      oModule.oModifyInit = simpleMerge(oModule.oModifyInit, oVar);
    },
    /**
     * To be used about extension, it will return a deep copy of the Modules object to avoid modifying the original
     * object.
     * @returns {Object}
     */
    getCopyModules: function () {
      return clone(oModules);
    },
    /**
     * To be used about extension, it will return a deep copy of the Channels object to avoid modifying the original
     * object.
     * @returns {Object}
     */
    getCopyChannels: function () {
      return clone(oChannels);
    },
    /**
     * Sets the global namespace
     * @param nsp
     */
    setNamespace: function (nsp) {
      namespace = nsp;
    },
    /**
     * Adds a new mapping to be used by the dependency injection system.
     * @param {String} sPrefix
     * @param {Object} oMapping
     * @param {Function} fpResolveDI
     */
    addMapping: function ( sPrefix, oMapping, fpResolveDI ) {
      var oMap = oMappingMaps[sPrefix];
      if( oMap === und ){
        createMapping( oMappingMaps, sPrefix, oMapping, fpResolveDI );
      }else{
        simpleMerge( oMappingMaps[sPrefix].__map__, oMapping );
      }
    },
    /**
     * Adds an async mapping to be used by the dependency injection system.
     * @param {String} sPrefix
     * @param {Object} oMapping
     * @param {Function} fpCallback -> This callback should return a promise.
     */
    addAsyncMapping: function ( sPrefix, oMapping, fpCallback )  {
      this.addMapping( sPrefix, oMapping, function ( sDependency ) {
        return fpCallback.call( oMapping, sDependency );
      });
    }
  };

  /**
   * Special mapping to get easily the more important parts of Hydra and other that are common to all the modules.
   * @type {Object}
   */
  oMapping = {
    'bus': Bus,
    'module': oModule,
    'log': ErrorHandler,
    'api': Hydra,
    'global': root,
    'doc': root.document || null
  };

  createMapping( oMappingMaps, '$$_', oMapping );
  createMapping( oMappingMaps, '$', oMapping );
  createMapping( oMappingMaps, 'pr_', oVars );
  createMapping( oMappingMaps, 'hm_', oModules );
  createMapping( oMappingMaps, 'ns_', namespace || root );
  createMapping( oMappingMaps, 'gl_', root );

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
    if (isTypeOf(fpCreator, sNotDefined)) {
      throw new Err('Something goes wrong!');
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
      oModule.start(this.sModuleId, oData);
      return this;
    },

    /**
     * Wraps the module extend
     * @param {Module} oSecondParameter
     * @param {Module} oThirdParameter
     * @returns {FakeModule}
     */
    extend: function (oSecondParameter, oThirdParameter) {
      oModule.extend(this.sModuleId, oSecondParameter, oThirdParameter);
      return this;
    },

    /**
     * Wraps the module stop
     * @returns {FakeModule}
     */
    stop: function () {
      oModule.stop(this.sModuleId);
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
  else if (typeof define !== sNotDefined) {
    define('hydra', [], function () {
      return Hydra;
    });
  }
}(this));
