/**
 * History.js ExtJS Adapter
 * @author Sean Adkinson <sean.adkinson@gmail.com>
 * @copyright 2012 Sean Adkinson <sean.adkinson@gmail.com>
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */

// Closure
(function(window,undefined){
    "use strict";

    // Localise Globals
    var
        History = window.History = window.History||{},
        Ext = window.Ext;

    window.JSON = {
        stringify: Ext.JSON.encode,
        parse: Ext.JSON.decode
    };
    
    // Check Existence
    if ( typeof History.Adapter !== 'undefined' ) {
        throw new Error('History.js Adapter has already been loaded...');
    }

    // Add the Adapter
    History.Adapter = {
        observables: {},
        
        /**
         * History.Adapter.bind(el,event,callback)
         * @param {Element|string} el
         * @param {string} event - custom and standard events
         * @param {function} callback
         * @param {Object} scope
         * @return {void}
         */
        bind: function(element,eventName,callback,scope){
            Ext.EventManager.addListener(element, eventName, callback, scope);
            
            //bind an observable to the element that will let us "trigger" events on it
            var id = Ext.id(element, 'history-'), observable = this.observables[id];
            if (!observable) {
                observable = Ext.create('Ext.util.Observable');
                this.observables[id] = observable;
            }
            observable.on(eventName, callback, scope);
        },

        /**
         * History.Adapter.trigger(el,event)
         * @param {Element|string} el
         * @param {string} event - custom and standard events
         * @param {Object=} extra - a object of extra event data (optional)
         * @return {void}
         */
        trigger: function(element,eventName,extra){
            var id = Ext.id(element, 'history-'), observable = this.observables[id];
            if (observable) {
                observable.fireEvent(eventName, extra);
            }
        },

        /**
         * History.Adapter.extractEventData(key,event,extra)
         * @param {string} key - key for the event data to extract
         * @param {string} event - custom and standard events
         * @param {Object=} extra - a object of extra event data (optional)
         * @return {mixed}
         */
        extractEventData: function(key,event,extra){
            var result = (event && event.browserEvent && event.browserEvent[key]) || (extra && extra[key]) || undefined;
            return result;
        },

        /**
         * History.Adapter.onDomLoad(callback)
         * @param {function} callback
         * @return {void}
         */
        onDomLoad: function(callback) {
            Ext.onReady(callback);
        }
    };

    // Try and Initialise History
    if ( typeof History.init !== 'undefined' ) {
        History.init();
    }

})(window);