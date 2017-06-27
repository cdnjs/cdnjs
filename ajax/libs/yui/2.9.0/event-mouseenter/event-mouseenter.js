/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
/**
 * Augments the Event Utility with support for the mouseenter and mouseleave 
 * events:  A mouseenter event fires the first time the mouse enters an 
 * element; a mouseleave event first the first time the mouse leaves an 
 * element.
 * 
 * @module event-mouseenter
 * @title Event Utility mouseenter and mouseout Module
 * @namespace YAHOO.util
 * @requires event
 */

(function () {

    var Event = YAHOO.util.Event,
        Lang = YAHOO.lang,

        addListener = Event.addListener,
        removeListener = Event.removeListener,
        getListeners = Event.getListeners,

        delegates = [],
        
        specialTypes = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, 

        remove = function(el, type, fn) {

            var index = Event._getCacheIndex(delegates, el, type, fn),
                cacheItem,
                returnVal;

            if (index >= 0) {
                cacheItem = delegates[index];
            }

            if (el && cacheItem) {

                //    removeListener will translate the value of type                
                returnVal = removeListener.call(Event, cacheItem[0], type, cacheItem[3]);
        
                if (returnVal) {
                    delete delegates[index][2];
                    delete delegates[index][3];
                    delegates.splice(index, 1);
                }
        
            }

            return returnVal;

        };        


    Lang.augmentObject(Event._specialTypes, specialTypes); 

    Lang.augmentObject(Event, {

        /**
         * Creates a delegate function used to call mouseover and mouseleave 
         * event listeners specified via the 
         * <code>YAHOO.util.Event.addListener</code> 
         * or <code>YAHOO.util.Event.on</code> method.
         *
         * @method _createMouseDelegate
         *
         * @param {Function} fn        The method (event listener) to call
         * @param {Object}   obj    An arbitrary object that will be 
         *                             passed as a parameter to the listener
         * @param {Boolean|object}  overrideContext  If true, the value of the 
         *                             obj parameter becomes the execution context
         *                          of the listener. If an object, this object
         *                          becomes the execution context. 
         * @return {Function} Function that will call the event listener 
         * specified by either the <code>YAHOO.util.Event.addListener</code> 
         * or <code>YAHOO.util.Event.on</code> method.
         * @private
         * @static
         * @for Event
         */
        _createMouseDelegate: function (fn, obj, overrideContext) {

            return function (event, container) {

                var el = this,
                    relatedTarget = Event.getRelatedTarget(event),
                    context,
                    args;

                if (el != relatedTarget && !YAHOO.util.Dom.isAncestor(el, relatedTarget)) {

                    context = el;

                    if (overrideContext) {
                        if (overrideContext === true) {
                            context = obj;
                        } else {
                            context = overrideContext;
                        }
                    }

                    // The default args passed back to a mouseenter or 
                    // mouseleave listener are: the event, and any object
                    // the user passed when subscribing

                    args = [event, obj];

                    // Add the element and delegation container as arguments
                    // when delegating mouseenter and mouseleave

                    if (container) {
                        args.splice(1, 0, el, container);
                    }

                    return fn.apply(context, args);

                }

            };

        },
        
        addListener: function (el, type, fn, obj, overrideContext) {

            var fnDelegate,
                returnVal;

            if (specialTypes[type]) {

                fnDelegate = Event._createMouseDelegate(fn, obj, overrideContext);
                
                fnDelegate.mouseDelegate = true;

                delegates.push([el, type, fn, fnDelegate]);

                //    addListener will translate the value of type
                returnVal = addListener.call(Event, el, type, fnDelegate);

            }
            else {
                returnVal = addListener.apply(Event, arguments);
            }

            return returnVal;

        },
        
        removeListener: function (el, type, fn) {

            var returnVal;

            if (specialTypes[type]) {
                returnVal = remove.apply(Event, arguments);
            }
            else {
                returnVal = removeListener.apply(Event, arguments);
            }

            return returnVal;

        },
        
        getListeners: function (el, type) {

            //    If the user specified the type as mouseover or mouseout, 
            //    need to filter out those used by mouseenter and mouseleave.
            //    If the user specified the type as mouseenter or mouseleave, 
            //    need to filter out the true mouseover and mouseout listeners.

            var listeners = [],
                elListeners,
                bMouseOverOrOut = (type === "mouseover" || type === "mouseout"),
                bMouseDelegate,
                i,
                l;
            
            if (type && (bMouseOverOrOut || specialTypes[type])) {
                
                elListeners = getListeners.call(Event, el, this._getType(type));

                if (elListeners) {

                    for (i=elListeners.length-1; i>-1; i--) {

                        l = elListeners[i];
                        bMouseDelegate = l.fn.mouseDelegate;

                        if ((specialTypes[type] && bMouseDelegate) || (bMouseOverOrOut && !bMouseDelegate)) {
                            listeners.push(l);
                        }

                    }

                }
                
            }
            else {
                listeners = getListeners.apply(Event, arguments);
            }

            return (listeners && listeners.length) ? listeners : null;
            
        }
        
    }, true);
    
    Event.on = Event.addListener;

}());
YAHOO.register("event-mouseenter", YAHOO.util.Event, {version: "2.9.0", build: "2800"});
