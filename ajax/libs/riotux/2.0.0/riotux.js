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
    components: []
  },
  /**
   * @name store
   * @description Public Store
   */
  store: {
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
     * @name dispatch
     * @description Dispatch an action to change
     * the store state
     * @param { string } action The action name
     * @param { any } args Arguments sended to the action
     */
    dispatch: (action, ...args) => {
      let state;
      let updateStoreData = async () => {
        let updateStoreState = await Promise.resolve(
          riotux._store.actions[action].apply
            (
            null,
            [].concat(riotux._store.state, args)
            )
        )
          .then(stateValue => {
            let component = riotux._store.components
            state = { action, stateValue }
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
    get: (stateName) => {
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

let dispatch = riotux.store.dispatch
  , getState = riotux.store.get
  , setState = riotux.store.setState
  , setActions = riotux.store.setActions
  , subscribe = riotux.store.subscribe
  , unsubscribe = riotux.store.unsubscribe
  ;

export { dispatch, getState, setState, setActions, subscribe, unsubscribe };