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
      addStore: function ( storeName, store ){
        this.stores[storeName] = store;
      },
      /**
       * @param { string } store The name of your store
       * @param { string } event The name of your event
       * @param { function } callback function that will trigger
       */
      on: function ( store, event, callback ) {
        this.stores[store].on(event, callback);
      },
    
      /**
       * @param { string } store The name of your store
       * @param { string } event The name of your event
       * @param { function } callback function that will trigger
       */
      trigger: function ( store, event, callback ) {
        this.stores[store].trigger(event, callback);
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
      emmit: function ( event, args ) {
        this.Dispatcher.trigger(event, args);
        this.register('emmit', event, args);
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
    
    function Dispatcher ( ) {
      riot.observable(this);
      this.events = {
        listen: [],
        listenOne: [],
        emmit: [],
        cancel: []
      };
    }
    
    if (!window.riotux) {
      window.riotux = new riotux;
      window.riotux.Dispatcher = new Dispatcher();
    }
  }( window, riot ));
