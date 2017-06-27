  /*!
    --------------------------------
    riotux.js
    --------------------------------
    + https://luisvinicius167.github.io/riotux/
    + version 1.0.0
    + Copyright 2016 Luis Vinícius
    + Licensed under the MIT license
    + Documentation: https://github.com/luisvinicius167/riotux
  */
  ;(function ( window, riot ) {
    'use strict';
    /**
     * @function concatArgs
     * @desc The Helper function to concat arguments to pass in the trigger method
     * @param { string } event The event name
     * @param { array } args The arguments passed that will applied
     * @return Array
     */
    function concatArgs (event, args ){
      var eventArr = [event];
      var argsToSend = eventArr.concat(args);
      return argsToSend;
    };
    
    /**
     * @function stores
     * @desc The Helper function to turn all Stores listening or trigger to all
     * @param { object } riotux The riotux instance
     * @param { string } api Event API
     * @param { string | array } stores The name of Store or names with all Stores
     * @param { string } event The event name
     * @param { object | string | Function } args The data or callback
     */
    function stores ( riotux, api, stores, event, args ) {
      var self = riotux;
      if ( typeof stores === "object" && stores instanceof Array ) {
        stores.forEach(function ( store ) {
          self.stores[store][api].apply(null, concatArgs(event, args));
        });
        return;
      }
      self.stores[stores][api].apply(null, concatArgs(event, args));
    };
    
    /**
     * @desc Event Controller for Riot.js
     * @function riotux
     */
    function riotux ( ) {
      this.stores = {};
    }
    
    riotux.prototype = {
    
      /**
       * @param { string } storeName The name of your store
       * @param { object } store Your store
       */
      addStore: function ( storeName, store ) {
        this.stores[storeName] = store;
      },
      /**
       * @param { string } name store name
       */
      removeStore: function ( name ) {
        delete this.stores[name];
      },
      /**
       * @param { string } store The name of your store
       * @param { string } event The name of your event
       * @param { function } callback function that will trigger
       */
      on: function ( store, event, callback ) {
        stores(this, 'on', store, event, callback);
      },
    
      /**
       * @param { string | array } store The name of your store or stores
       * @param { string } event The name of your event
       * @param { object | string } Data that will send
       */
      trigger: function ( store, event, data ) {
        var args = Array.prototype.slice.call(arguments, 2);
        stores(this, 'trigger', store, event, args);
      },
    
      /**
       * @param { string } store The name of your store
       * @param { string } event The name of your event
       * @param { function } callback function that will trigger
       */
      one: function ( store, event, callback ) {
        this.stores[store].one(event, callback);
      },
    
      /**
       * @param { string } store The name of your store
       * @param { string } event The name of your event
       * @param { function } callback function that will trigger
       */
      off: function ( store, event, callback ) {
        this.stores[store].off(event, callback);
      },
      
      /**
       * @desc Register an 'on' event in Dispatcher
       * @param { string }   event The name of your event
       * @param { function } callback function that will trigger
       */
      listen: function ( event, callback ) {
        this.Dispatcher.on(event, callback);
        this.register('listen', event, callback);
      },
      
      /**
       * @desc Register an 'one' event in Dispatcher and trigger just one time
       * @param { string }   event The name of your event
       * @param { function } callback function that will trigger
       */
      listenOne: function ( event, callback ) {
        this.Dispatcher.one(event, callback);
        this.register('listenOne', event, callback);
      },
          
      /**
       * @desc Trigger the event that Dispatcher listening
       * @param { string }   event The name of your event
       * @param { function } callback function that will trigger
       */
      emit: function ( event, data ) {
        var args = Array.prototype.slice.call(arguments, 1);
        this.Dispatcher.trigger.apply(null, concatArgs(event, args));
        this.register('emit', event, args);
      },
      
      /**
       * @desc Cancel an event in Dispatcher
       * @param { string }   event The name of your event
       * @param { function } callback function that will trigger
       */
      cancel: function ( event, callback ) {
        this.Dispatcher.off(event, callback);
        this.register('cancel', event, callback);
      },
      
      /**
       * @desc Register the event on Dispatcher.events
       * @param { string }   event - the name of event API
       * @param { string }   eventName - the name of event API
       * @param { function } args - arguments passed in the event
       */
      register: function ( event, eventName, args ) {
        if ( args !== undefined ) {
          this.Dispatcher.events[event].push(
            {
              event: eventName,
              args: args
            }
          );
          return;
        }
        this.Dispatcher.events[event].push(
          {
            event: eventName,
            args: ''
          }
        );
      },
      
      /**
       * @param { string } event - the event API that you want return registered events
       * @return { array } return all events initialized at the moment
       */
      getDispatcherEvent: function ( event ) {
        return this.Dispatcher.events[event];
      }
    };
    
   /**
    * @func Dispatcher
    * @desc The Dispatcher that will improve Views talk with other Views
    */
    function Dispatcher ( ) {
      riot.observable(this);
      this.events = {
        listen: [],
        listenOne: [],
        emit: [],
        cancel: []
      };
    }
    
    if (!window.riotux) {
      window.riotux = new riotux;
      window.riotux.Dispatcher = new Dispatcher();
    }
  }( window, riot ));