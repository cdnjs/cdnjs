'use strict';
var warn = require('./lib/warning');
var hasLocalStorage = 'localStorage' in global;
var ls, testKey;

if (hasLocalStorage) {
  testKey = 'react-localstorage.mixin.test-key';
  try {
    // Access to global `localStorage` property must be guarded as it
    // fails under iOS private session mode.
    ls = global.localStorage;
    ls.setItem(testKey, 'foo');
    ls.removeItem(testKey);
  } catch (e) {
    hasLocalStorage = false;
  }
}

// Warn if localStorage cannot be found or accessed.
if (process.browser) {
  warn(
    hasLocalStorage,
    'localStorage not found. Component state will not be stored to localStorage.'
  );
}

module.exports = {
  /**
   * Error checking. On update, ensure that the last state stored in localStorage is equal
   * to the state on the component. We skip the check the first time around as state is left
   * alone until mount to keep server rendering working.
   *
   * If it is not consistent, we know that someone else is modifying localStorage out from under us, so we throw
   * an error.
   *
   * There are a lot of ways this can happen, so it is worth throwing the error.
   */
  componentWillUpdate: function(nextProps, nextState) {
    if (!hasLocalStorage || !this.__stateLoadedFromLS) return;
    var key = getLocalStorageKey(this);
    if (key === false) return;
    var prevStoredState = ls.getItem(key);
    if (prevStoredState && process.env.NODE_ENV !== "production") {
      warn(
        prevStoredState === JSON.stringify(getSyncState(this, this.state)),
        'While component ' + getDisplayName(this) + ' was saving state to localStorage, ' +
        'the localStorage entry was modified by another actor. This can happen when multiple ' +
        'components are using the same localStorage key. Set the property `localStorageKey` ' +
        'on ' + getDisplayName(this) + '.'
      );
    }
    // Since setState() can't be called in CWU, it's a fine time to save the state.
    ls.setItem(key, JSON.stringify(getSyncState(this, nextState)));
  },

  /**
   * Load data.
   * This seems odd to do this on componentDidMount, but it prevents server checksum errors.
   * This is because the server has no way to know what is in your localStorage. So instead
   * of breaking the checksum and causing a full rerender, we instead change the component after mount
   * for an efficient diff.
   */
  componentDidMount: function () {
    if (!hasLocalStorage) return;
    var me = this;
    loadStateFromLocalStorage(this, function() {
      // After setting state, mirror back to localstorage.
      // This prevents invariants if the developer has changed the initial state of the component.
      ls.setItem(getLocalStorageKey(me), JSON.stringify(getSyncState(me, me.state)));
    });
  }
};

function loadStateFromLocalStorage(component, cb) {
  if (!ls) return;
  var key = getLocalStorageKey(component);
  if (key === false) return;
  var settingState = false;
  try {
    var storedState = JSON.parse(ls.getItem(key));
    if (storedState) {
      settingState = true;
      component.setState(storedState, done);
    }
  } catch(e) {
    // eslint-disable-next-line no-console
    if (console) console.warn("Unable to load state for", getDisplayName(component), "from localStorage.");
  }
  // If we didn't set state, run the callback right away.
  if (!settingState) done();

  function done() {
    // Flag this component as loaded.
    component.__stateLoadedFromLS = true;
    cb();
  }
}

function getDisplayName(component) {
  // at least, we cannot get displayname
  // via this.displayname in react 0.12
  return component.displayName || component.constructor.displayName || component.constructor.name;
}

function getLocalStorageKey(component) {
  if (component.getLocalStorageKey) return component.getLocalStorageKey();
  if (component.props.localStorageKey === false) return false;
  if (typeof component.props.localStorageKey === 'function') return component.props.localStorageKey.call(component);
  return component.props.localStorageKey || getDisplayName(component) || 'react-localstorage';
}

function getStateFilterKeys(component) {
  if (component.getStateFilterKeys) {
    return typeof component.getStateFilterKeys() === 'string' ?
      [component.getStateFilterKeys()] : component.getStateFilterKeys();
  }
  return typeof component.props.stateFilterKeys === 'string' ?
    [component.props.stateFilterKeys] : component.props.stateFilterKeys;
}

/**
* Filters state to only save keys defined in stateFilterKeys.
* If stateFilterKeys is not set, returns full state.
*/
function getSyncState(component, state) {
  var stateFilterKeys = getStateFilterKeys(component);
  if (!stateFilterKeys || !state) return state;
  var result = {}, key;
  for (var i = 0; i < stateFilterKeys.length; i++) {
    key = stateFilterKeys[i];
    if (state.hasOwnProperty(key)) result[key] = state[key];
  }
  return result;
}
