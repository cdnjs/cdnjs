; (function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory());
  } else if (typeof exports === "object") {
    module.exports = {
      dispatch: factory().dispatch
      , getState: factory().getState
      , setState: factory().setState
      , setActions: factory().setActions
      , subscribe: factory().subscribe
      , middleware: factory().middleware
      , unsubscribe: factory().unsubscribe
    }
  } else {
    root.Riotux = factory();
  }
} (this, function () {
  'use strict';
  /**
   * @name riotux
   * @description The object that will manage all application state
   */
  let riotux = {
    /**
     * @name _store
     * @description The private store
     */
    _store: {
      /**
       * @name state
       * @description The Store application state
       */
      state: {},
      /**
       * @name actions
       * @description The Functions that will change the Store state
       */
      actions: {},
      /**
       * @name state
       * @description The Components that was subscribed
       */
      components: [],
      middleware: {}
    },
    /**
     * @name store
     * @description Public Store
     */
    store: {
      /**
       * @name subscribe
       * @description Subscribe to call the handler function when the action will be triggered
       * @param {Component} component The Component
       * @param {Function} handler The function that will be called
       **/
      subscribe: (component, handler) => {
        riotux._store.components.push({ component, handler });
      },
      unsubscribe: (component) => {
        riotux._store.components.forEach(el, index => {
          if (el === component) {
            riotux._store.components.splice(index, 1);
          }
        });
      },
      /**
       * @name middleware
       * @description The middleware function that will be triggered
       * every time when an action called.
       * @param {Function} callback A function that will be called 
       **/
      middleware: (callback) => {
        riotux._store.middleware = callback;
      },
      /**
       * @name dispatch
       * @description Dispatch an action to change
       * the store state
       * @param { string } action The action name
       * @param { any } args Arguments sended to the action
       */
      dispatch: (action, ...args) => {
        let state;
        let updateStoreData = () => {
          let updateStoreState = Promise.resolve(
            riotux._store.actions[action].apply
              (
              null,
              [].concat(riotux._store.state, args)
              )
          )
            .then(value => {
              state = { action, value }
              /**
               * has middleware?
               **/
              if (typeof riotux._store.middleware === "function") {
                riotux._store.middleware.call(null, state, riotux._store.state)
              }
              let component = riotux._store.components
              component.forEach((el, i) => {
                if (el.component !== undefined && typeof el.handler === "function") {
                  el.handler(state)
                }
              })
            })
            .then(() => {
              return state;
            });
          return updateStoreState;
        };
        return updateStoreData()
      },
      /**
       * @name setState
       * @description Sets the application data state
       * @param {object} data Simple Object that contain the State
       */
      setState: (data) => {
        Object.assign(riotux._store.state, data);
      },
      /**
       * @name get
       * @param {string} stateName The Store state name
       */
      getState: (stateName) => {
        return riotux._store.state[stateName];
      },
      /**
       * @name setActions
       * @description Sets the application Actions
       * that will change the Store state
       */
      setActions: (data) => {
        Object.assign(riotux._store.actions, data);
      }
    }
  };
  return riotux.store;
}));