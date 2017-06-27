/*global exports, module, require, define, setTimeout*/
(function () {
    'use strict';
    var root, sNotDefined, oModules, oVars, _null_, bUnblockUI, _false_, sVersion, FakeModule, Hydra, bDebug, ErrorHandler, Module, Bus, oChannels, isNodeEnvironment, oObjProto;

    /**
     * Used to generate an unique key for instance ids that are not supplied by the user.
     * @return {String}
     */
    function generateUniqueKey() {
        var sFirstToken = +new Date() + '',
            sSecondToken = Math.floor(Math.random() * (999999 - 1 + 1)) + 1;
        return sFirstToken + '_' + sSecondToken;
    }

    /**
     * Return the length of properties of one object
     * @param oObj
     * @return {*}
     */
    function getObjectLength(oObj) {
        var nLen, sKey;
        if (Object.keys) {
            nLen = Object.keys(oObj).length;
        } else {
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
     */
    isNodeEnvironment = typeof exports === "object" && typeof module === "object" && typeof module.exports === "object" && typeof require === "function";
    /**
     * Cache 'undefined' string to test typeof
     * @type {String}
     */
    sNotDefined = 'undefined';
    /**
     * Cache of object prototype to use it in other functions
     * @type {Object}
     */
    oObjProto = Object.prototype;
    /**
     * set the correct root depending from the environment.
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
     * @private
     * @type {Object}
     */
    oModules = {};

    /**
     * Version of Hydra
     * @private
     * @type {String}
     */
    sVersion = '3.1.2';

    /**
     * Used to activate the debug mode
     * @private
     * @type {Boolean}
     */
    bDebug = _false_;

    /**
     * Use to activate the unblock UI when notifies are executed.
     * WARNING!!! This will not block your UI but could give problems with the order of execution.
     * @type {Boolean}
     */
    bUnblockUI = _false_;

    /**
     * Wrapper of Object.prototype.toString to detect type of object in cross browsing mode.
     * @private
     * @param {Object} oObject
     * @return {String}
     */
    function toString(oObject) {
        return oObjProto.toString.call(oObject);
    }

    /**
     * isFunction is a function to know if the object passed as parameter is a Function object.
     * @private
     * @param {Object} fpCallback
     * @return {Boolean}
     */
    function isFunction(fpCallback) {
        return toString(fpCallback) === '[object Function]';
    }

    /**
     * isArray is a function to know if the object passed as parameter is an Array object.
     * @private
     * @param {String|Array|Object} aArray
     * @return {Boolean}
     */
    function isArray(aArray) {
        return toString(aArray) === '[object Array]';
    }

    /**
     * setDebug is a method to set the bDebug flag.
     * @private
     * @param {Boolean} _bDebug
     */
    function setDebug(_bDebug) {
        bDebug = _bDebug;
    }

    /**
     * setUnblockUI is a method to set the bUnblockUI flag.
     * @private
     * @param {Boolean} _bUnblockUI
     */
    function setUnblockUI(_bUnblockUI) {
        bUnblockUI = _bUnblockUI;
    }

    /**
     * Converts objects like node list to real array.
     * @private
     * @param {Object} oLikeArray
     * @param {Number} nElements
     * @return {Array}
     */
    function slice(oLikeArray, nElements) {
        return [].slice.call(oLikeArray, nElements || 0);
    }

    /**
     * Wrapper of Object.hasOwnProperty
     * @private
     * @param {Object} oObj
     * @param {String} sKey
     * @return {Boolean}
     */
    function ownProp(oObj, sKey) {
        return oObj.hasOwnProperty(sKey);
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

        if (bSingle && oWrapper.isModuleStarted(sModuleId, sIdInstance)) {
            oWrapper.stop(sModuleId, sIdInstance);
        }
        if (typeof oModule !== sNotDefined) {
            oInstance = createInstance(sModuleId);
            oModule.instances[sIdInstance] = oInstance;
            oInstance.__instance_id__ = sIdInstance;
            if (typeof oData !== sNotDefined) {
                oInstance.init(oData);
            } else {
                oInstance.init();
            }
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
     * wrapMethod is a method to wrap the original method to avoid failing code.
     * This will be only called if bDebug flag is set to false.
     * @private
     * @param {Object} oInstance
     * @param {String} sName
     * @param {String} sModuleId
     * @param {Function} fpMethod
     */
    function wrapMethod(oInstance, sName, sModuleId, fpMethod) {
        oInstance[sName] = (function (sName, fpMethod) {
            return function () {
                var aArgs = slice(arguments, 0);
                try {
                    return fpMethod.apply(this, aArgs);
                }
                catch (erError) {
                    ErrorHandler.log(sModuleId, sName, erError);
                    return false;
                }
            };
        }(sName, fpMethod));
    }

    /**
     * Private object to save the channels for communicating event driven
     * @private
     * @type {Object}
     */
    oChannels = {
        global:{}
    };

    /**
     * subscribersByEvent return all the subscribers of the event in the channel.
     * @param {Object} oChannel
     * @param {String} sEventName
     * @return {Array}
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
     */
    Bus = {
        /**
         * subscribers return the array of subscribers to one channel and event.
         * @param {String} sChannelId
         * @param {String} sEventName
         * @return {Array}
         */
        subscribers:function (sChannelId, sEventName) {
            return subscribersByEvent(oChannels[sChannelId], sEventName);
        },
        /**
         * _getChannelEvents return the events array in channel.
         * @param aEventsParts
         * @param sChannelId
         * @param sEvent
         * @return {Object}
         * @private
         */
        _getChannelEvents:function (sChannelId, sEvent) {
            if(typeof oChannels[sChannelId] === 'undefined')
            {
                oChannels[sChannelId] = {};
            }
            if (typeof oChannels[sChannelId][sEvent] === 'undefined') {
                oChannels[sChannelId][sEvent] = [];
            }
            return oChannels[sChannelId][sEvent];
        },
        /**
         * _addSubscribers add all the events of one channel from the subscriber
         * @param oEventsCallbacks
         * @param sChannelId
         * @param oSubscriber
         * @private
         */
        _addSubscribers:function (oEventsCallbacks, sChannelId, oSubscriber) {
            var sEvent;
            for (sEvent in oEventsCallbacks) {
                if (ownProp(oEventsCallbacks, sEvent)) {
                    this.subscribeTo(sChannelId, sEvent, oEventsCallbacks[sEvent], oSubscriber);
                }
            }
        },
        /**
         * Method to unsubscribe a subscriber from a channel and event type.
         * @param sChannelId
         * @param sEventType
         * @param oSubscriber
         */
        unsubscribeFrom:function (sChannelId, sEventType, oSubscriber) {
            var aChannelEvents = this._getChannelEvents(sChannelId, sEventType),
                oItem,
                nEvent,
                nLenEvents = aChannelEvents.length;

            for (nEvent = 0; nEvent < nLenEvents; nEvent++) {
                oItem = aChannelEvents[nEvent];
                if(oItem.subscriber === oSubscriber)
                {
                    aChannelEvents.splice(nEvent, 1);
                }
            }
        },
        /**
         * Method to add a single callback in one channel an in one event.
         * @param sChannelId
         * @param sEventType
         * @param fpHandler
         * @param oSubscriber
         */
        subscribeTo:function (sChannelId, sEventType, fpHandler, oSubscriber) {
            var aChannelEvents = this._getChannelEvents(sChannelId, sEventType);
            aChannelEvents.push({
                subscriber:oSubscriber,
                handler:fpHandler
            });
        },
        /**
         * subscribe method gets the oEventsCallbacks object with all the handlers and add these handlers to the channel.
         * @param {Module/Object} oSubscriber
         * @return {Boolean}
         */
        subscribe:function (oSubscriber) {
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
         * @param aSubscribers
         * @param oSubscriber
         * @return {Number}
         * @private
         */
        _removeSubscribers:function (aSubscribers, oSubscriber) {
            var nLenSubscribers,
                nIndex = 0,
                nUnsubscribed = 0;
            if (typeof aSubscribers !== sNotDefined) {
                nLenSubscribers = aSubscribers.length;
                for (; nIndex < nLenSubscribers; nIndex++) {
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
         * @param oEventsCallbacks
         * @param bOnlyGlobal
         * @param sChannelId
         * @param oSubscriber
         * @return {*}
         * @private
         */
        _removeSubscribersPerEvent:function (oEventsCallbacks, sChannelId, oSubscriber) {
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
         * @param {Module/Object} oSubscriber
         * @return {Boolean}
         */
        unsubscribe:function (oSubscriber) {
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
         * @private
         * @param {Array} aSubscribers
         * @param {Object} oData
         * @param {String} sChannelId
         * @param {String} sEvent
         */
        _avoidBlockUI:function (aSubscribers, oData, sChannelId, sEvent) {
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
         */
        publish:function (sChannelId, sEvent, oData) {
            var aSubscribers = this.subscribers(sChannelId, sEvent),
                nLenSubscribers = aSubscribers.length,
                nIndex,
                oHandlerObject;
            if (nLenSubscribers === 0) {
                return false;
            }
            if(bUnblockUI)
            {
                this._avoidBlockUI(aSubscribers, oData, sChannelId, sEvent);
            }else
            {
                for ( nIndex = 0 ; nIndex < nLenSubscribers; nIndex++ ) {
                    oHandlerObject = aSubscribers[nIndex];
                    oHandlerObject.handler.call( oHandlerObject.subscriber, oData );
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
        reset:function () {
            oChannels = {
                global:{}
            };
        }
    };
    /**
     * Add common properties and methods to avoid repeating code in modules
     * @param {String} sModuleId
     * @param {Object} Bus
     */
    function addPropertiesAndMethodsToModule(sModuleId, Bus) {
        var oModule,
            fpInitProxy;
        oModule = oModules[sModuleId].creator(Bus);
        oModule.__module_id__ = sModuleId;
        fpInitProxy = oModule.init || function () {
        };
        oModule.__action__ = Bus;
        oModule.events = oModule.events || {};
        oModule.init = function () {
            var aArgs = slice(arguments, 0).concat(oVars);
            Bus.subscribe(oModule);
            fpInitProxy.apply(this, aArgs);
        };
        oModule.handleAction = function (oNotifier) {
            var fpCallback = this.events[oNotifier.type];
            if (typeof fpCallback === sNotDefined) {
                return;
            }
            fpCallback.call(this, oNotifier);
        };
        oModule.onDestroy = oModule.onDestroy || function () {
        };
        oModule.destroy = function () {
            this.onDestroy();
            Bus.unsubscribe(oModule);
        };
        return oModule;
    }

    /**
     * createInstance is the method that will create the module instance and wrap the method if needed.
     * @private
     * @param {String} sModuleId
     * @return {Object} Module instance
     */
    function createInstance(sModuleId) {
        var oInstance, sName;
        if (typeof oModules[sModuleId] === sNotDefined) {
            throw new Error('The module ' + sModuleId + ' is not registered!');
        }
        oInstance = addPropertiesAndMethodsToModule(sModuleId, Bus);
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
     */
    ErrorHandler = root.console || {
        log:function () {
        }
    };
    /**
     * Class to manage the modules.
     * @constructor
     * @class Module
     * @name Module
     */
    Module = function () {
    };

    Module.prototype = {
        /**
         * type is a property to be able to know the class type.
         * @member Module.prototype
         * @type String
         */
        type:'Module',
        /**
         * Wrapper to use createInstance for plugins if needed.
         */
        getInstance:createInstance,
        /**
         * register is the method that will add the new module to the oModules object.
         * sModuleId will be the key where it will be stored.
         * @member Module.prototype
         * @param {String} sModuleId
         * @param {Function} fpCreator
         * @return {Module}
         */
        register:function (sModuleId, fpCreator) {
            var self = this;
            oModules[sModuleId] = new FakeModule(sModuleId, fpCreator);
            return oModules[sModuleId];
        },
        /**
         * _setSuper add the __super__ support to access to the methods in parent module.
         * @param oFinalModule
         * @param oModuleBase
         * @private
         */
        _setSuper:function (oFinalModule, oModuleBase) {
            oFinalModule.__super__ = {};
            oFinalModule.__super__.__instance__ = oModuleBase;
            oFinalModule.__super__.__call__ = function (sKey, aArgs) {
                var oObject = this;
                while (ownProp(oObject, sKey) === _false_) {
                    oObject = oObject.__instance__.__super__;
                }
                oObject[sKey].apply(oFinalModule, aArgs);
            };
        },
        /**
         * Callback that is used to call the methods in parent module.
         * @private
         * @param fpCallback
         * @return {Function}
         */
        _callInSuper:function (fpCallback) {
            return function () {
                var aArgs = slice(arguments, 0);
                fpCallback.apply(this, aArgs);
            };
        },
        /**
         * Adds the extended properties and methods to final module.
         * @param oFinalModule
         * @param oModuleExtended
         * @private
         */
        _mergeModuleExtended:function (oFinalModule, oModuleExtended) {
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
         * @param oFinalModule
         * @param oModuleBase
         * @private
         */
        _mergeModuleBase:function (oFinalModule, oModuleBase) {
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
         * @private
         * @param {Object} oModuleBase
         * @param {Object} oModuleExtended
         * @return {Object}
         */
        _merge:function (oModuleBase, oModuleExtended) {
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
         * @param {Function/String} oSecondParameter can be the name of the new module that extends the baseModule or a function if we want to extend an existent module.
         * @param {Function} oThirdParameter [optional] this must exist only if we need to create a new module that extends the baseModule.
         */
        extend:function (sModuleId, oSecondParameter, oThirdParameter) {
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
            } else {
                fpCreator = oSecondParameter;
            }
            if (typeof oModule === sNotDefined) {
                return;
            }
            oExtendedModule = fpCreator(Bus);
            oBaseModule = oModule.creator(Bus);

            oModules[sFinalModuleId] = new FakeModule(sFinalModuleId, function (Bus) {
                // If we extend the module with the different name, we
                // create proxy class for the original methods.
                oFinalModule = self._merge(oBaseModule, oExtendedModule);
                // This gives access to the Action instance used to listen and notify.
                oFinalModule.__action__ = Bus;
                return oFinalModule;
            });
            return oModules[sFinalModuleId];
        },
        /**
         * Method to set an instance of a module
         * @param {String} sModuleId
         * @param {String} sIdInstance
         * @param {Object} oInstance
         * @return {Module}
         */
        setInstance:function (sModuleId, sIdInstance, oInstance) {
            var oModule = oModules[sModuleId];
            if (!oModule) {
                throw new Error('The module ' + sModuleId + ' is not registered!');
            }
            oModule.instances[sIdInstance] = oInstance;
            return oModule;
        },
        /**
         * Sets an object of vars and add it's content to oVars private variable
         * @param {Object} oVar
         */
        setVars:function (oVar) {
            if (typeof oVars !== sNotDefined) {
                oVars = simpleMerge(oVars, oVar);
            } else {
                oVars = oVar;
            }
        },
        /**
         * Returns the private vars object by copy.
         * @returns {Object} global vars.
         */
        getVars:function () {
            return simpleMerge({}, oVars);
        },
        /**
         * start more than one module at the same time.
         * @param aModulesIds
         * @param sIdInstance
         * @param oData
         * @param bSingle
         * @private
         */
        _multiModuleStart:function (aModulesIds, sIdInstance, oData, bSingle) {
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
         * @param sModuleId
         * @param sIdInstance
         * @param oData
         * @param bSingle
         * @private
         */
        _singleModuleStart:function (sModuleId, sIdInstance, oData, bSingle) {
            if (typeof sIdInstance !== 'string') {
                oData = sIdInstance;
                bSingle = oData;
                sIdInstance = generateUniqueKey();
            }
            startSingleModule(this, sModuleId, sIdInstance, oData, bSingle);
        },
        /**
         * start is the method that initialize the module/s
         * If you use array instead of arrays you can start more than one module even adding the instance, the data and if it must be executed
         * as single module start.
         * @param {String/Array} sModuleId
         * @param {String/Array} sIdInstance
         * @param {Object/Array} oData
         * @param {Boolean/Array} bSingle
         */
        start:function (sModuleId, sIdInstance, oData, bSingle) {
            var bStartMultipleModules = isArray(sModuleId);

            if (bStartMultipleModules) {
                this._multiModuleStart(sModuleId.slice(0), sIdInstance, oData, bSingle);
            } else {
                this._singleModuleStart(sModuleId, sIdInstance, oData, bSingle);
            }
        },
        /**
         * Checks if module was already successfully started
         * @member Module.prototype
         * @param {String} sModuleId Name of the module
         * @param {String} sInstanceId Id of the instance
         * @return {Boolean}
         */
        isModuleStarted:function (sModuleId, sInstanceId) {
            var bStarted = false;
            if (typeof sInstanceId === sNotDefined) {
                bStarted = ( typeof oModules[sModuleId] !== sNotDefined && getObjectLength(oModules[sModuleId].instances) > 0 );
            } else {
                bStarted = ( typeof oModules[sModuleId] !== sNotDefined && typeof oModules[sModuleId].instances[sInstanceId] !== sNotDefined );
            }
            return bStarted;
        },
        /**
         * startAll is the method that will initialize all the registered modules.
         * @member Module.prototype
         */
        startAll:function () {
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
         * @param oModule
         * @private
         */
        _multiModuleStop:function (oModule) {
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
        },
        /**
         * Stop only one module.
         * @param oModule
         * @param sModuleId
         * @param sInstanceId
         * @private
         */
        _singleModuleStop:function (oModule, sModuleId, sInstanceId) {
            var oInstance = oModule.instances[sInstanceId];
            if (typeof oModule !== sNotDefined && typeof oInstance !== sNotDefined) {
                oInstance.destroy();
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
        stop:function (sModuleId, sInstanceId) {
            var oModule;
            oModule = oModules[sModuleId];
            if (typeof oModule === sNotDefined) {
                return false;
            }
            if (typeof sInstanceId !== sNotDefined) {
                this._singleModuleStop(oModule, sModuleId, sInstanceId);
            } else {
                this._multiModuleStop(oModule);
            }
            return true;
        },
        /**
         * Loops over instances of modules to stop them.
         * @param oInstances
         * @param sModuleId
         * @private
         */
        _stopOneByOne:function (oInstances, sModuleId) {
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
        stopAll:function () {
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
         */
        _delete:function (sModuleId) {
            if (typeof oModules[sModuleId] !== sNotDefined) {
                delete oModules[sModuleId];
            }
        },
        /**
         * remove is the method that will remove the full module from the oModules object
         * @member Module.prototype
         * @param {String} sModuleId
         */
        remove:function (sModuleId) {
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
     * Module to be stored, adds two methods to start and extend modules.
     * @private
     * @param {String} sModuleId
     * @param {Function} fpCreator
     * @constructor
     */
    FakeModule = function(sModuleId, fpCreator)
    {
        if(typeof fpCreator === sNotDefined)
        {
            console.log('test');
        }
        this.creator = fpCreator;
        this.instances = {};
        this.sModuleId = sModuleId;
    };

    FakeModule.prototype = {
        start: function(oData)
        {
            return Module.prototype.start(this.sModuleId, undefined, oData);
        },
        extend: function(oSecondParameter, oThirdParameter)
        {
            return Module.prototype.extend(this.sModuleId, oSecondParameter, oThirdParameter);
        },
        stop: function()
        {
            Module.prototype.stop(this.sModuleId);
        }
    };

    /**
     * getErrorHandler is a method to gain access to the private ErrorHandler constructor.
     * @private
     * @return ErrorHandler class
     */
    function getErrorHandler() {
        return ErrorHandler;
    }

    /**
     * setErrorHandler is a method to set the ErrorHandler to a new object to add more logging logic.
     * @private
     * @param {Function} oErrorHandler
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
     * @static
     * @member Hydra
     * @type String
     */
    Hydra.version = sVersion;

    /**
     * bus is a singleton instance of the bus to subscribe and publish content in channels.
     * @type {Object}
     */
    Hydra.bus = Bus;
    /**
     * Returns the actual ErrorHandler
     * @static
     * @member Hydra
     * @type ErrorHandler
     */
    Hydra.errorHandler = getErrorHandler;

    /**
     * Sets and overwrites the ErrorHandler object to log errors and messages
     * @static
     * @param ErrorHandler
     * @member Hydra
     */
    Hydra.setErrorHandler = setErrorHandler;

    /**
     * Return a singleton of Module
     * @static
     * @member Hydra
     */
    Hydra.module = new Module();

    /**
     * Change the unblock UI mode to on/off
     * @static
     * @Member Hydra
     */
    Hydra.setUnblockUI = setUnblockUI;

    /**
     * Change the debug mode to on/off
     * @static
     * @member Hydra
     */
    Hydra.setDebug = setDebug;

    /**
     * Get the debug status
     * @static
     * @member Hydra
     */
    Hydra.getDebug = function () {
        return bDebug;
    };
    /**
     * Extends Hydra object with new functionality
     * @static
     * @member Hydra
     * @param {String} sIdExtension
     * @param {Object} oExtension
     */
    Hydra.extend = function (sIdExtension, oExtension) {
        if (typeof this[sIdExtension] === sNotDefined) {
            this[sIdExtension] = oExtension;
        } else {
            this[sIdExtension] = simpleMerge(this[sIdExtension], oExtension);
        }
    };

    /**
     * Adds an alias to parts of Hydra
     * @static
     * @member Hydra
     * @param {String} sOldName
     * @param {Object} oNewContext
     * @param {String} sNewName
     * @return {Boolean}
     */
    Hydra.noConflict = function (sOldName, oNewContext, sNewName) {
        if (typeof this[sOldName] !== sNotDefined) {
            oNewContext[sNewName] = this[sOldName];
            return true;
        }
        return false;
    };

    /*
     * Expose Hydra to be used in node.js, as AMD module or as global
     */
    root.Hydra = Hydra;
    if (isNodeEnvironment) {
        module.exports = Hydra;
    } else if (typeof define !== 'undefined') {
        define(function () {
            return Hydra;
        });
    }
}.call(this));