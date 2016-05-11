  /*!
    --------------------------------
    riotux.js
    --------------------------------
    + https://luisvinicius167.github.io/riotux/
    + Copyright 2016 Luis Vinícius
    + Licensed under the MIT license
    + Documentation: https://github.com/luisvinicius167/riotux
  */
  ;(function ( window, riot ) {
    'use strict';
    
    /**
     * @name  _currentState
     * @description The current state for state that will be changed
     */
    var _currentState;
    
    /**
     * @name  the store state and mutations
     * @type { Object }
     */
    var _store = {};

    /**
     * @desc Event Controller for Riot.js
     * @function riotux
     */
    function riotux ( ) {
      riot.observable(this);
      var self = this;
      /**
       * @name store
       * @description Manage all application state 
       * @type { Object }
       */
      this.store = {
        /**
         * @name  dispatch 
         * @description Send the data for change state and update all listening components when state changed]
         * @param  { string } type [the name of mutation function you want to call]
         * @return { Promise } 
         */
        dispatch: function ( name ) {
          var _slice = Array.prototype.slice.call(arguments, 1)
            , state = [_store.state]
            , args = state.concat(_slice)
          ;
          return new Promise( function ( resolve, reject ) {
            resolve(_store.mutations[name].apply(null, args));
          }).then(function ( result ) {
            self.trigger(_currentState, _store.state[_currentState]);
          });
        }
      };
      /**
       * @name actions
       * @description All actions for components call
       * @type {Object}
       */
      this.actions = {};
    };

    riotux.prototype = {
      /**
       * @name Store
       * @param  { object } data The data that contain the store mutations and state
       * @return { object } Return the store
       */
      Store: function ( data ) {
        _store = Object.assign({}, data);
        return this.store;
      },  
      /**
       * @name  Actions
       * @param  { object } data The data that contain all actions
       * @return { object } Return actions
       */
      Actions: function ( data ) {
        this.actions = data;
        return this.actions;
      },
      /**
       * @name action
       * @description Emit an action for store dispatcher to change the state
       * @return { void }
       */
      action: function ( ) {
        _currentState = arguments[0];
        if (_store.state[_currentState] !== undefined ) {
          var args = Array.prototype.slice.call(arguments, 2);
          this.actions[arguments[1]].apply(null, args);
        } else {
          var args = Array.prototype.slice.call(arguments, 1);
          this.actions[arguments[0]].apply(null, args);
        }
      },
      /**
       * @name getter
       * @param  { string } name The name of state
       */
      getter: function ( name ) {
        return _store.state[name];
      }
    };

    if ( !window.riotux ) {
      window.riotux = new riotux;
    };
    
    if ( typeof(module) !== "undefined" ) {
      module.exports = riotux;
    };
  }( window, riot ));