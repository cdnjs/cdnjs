'use strict';
var React = require('react');
var invariant = require('react/lib/invariant');
var warn = require('react/lib/warning');
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

var Mixin = module.exports = {
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
  componentDidUpdate: function(prevProps, prevState) {
    if (!hasLocalStorage || !this.__stateLoadedFromLS) return;
    var key = getLocalStorageKey(this);
    var prevStoredState = ls.getItem(key);
    if (prevStoredState && process.env.NODE_ENV !== "production") {
      invariant(
        prevStoredState === JSON.stringify(getSyncState(this, prevState)),
        'While component ' + getDisplayName(this) + ' was saving state to localStorage, ' +
        'the localStorage entry was modified by another actor. This can happen when multiple ' +
        'components are using the same localStorage key. Set the property `localStorageKey` ' +
        'on ' + getDisplayName(this) + '.'
      );
    }
    ls.setItem(key, JSON.stringify(getSyncState(this, this.state)));
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
  var settingState = false;
  try {
    var storedState = JSON.parse(ls.getItem(key));
    if (storedState) {
      settingState = true;
      component.setState(storedState, done);
    }
  } catch(e) {
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
  return component.displayName || component.constructor.displayName;
}

function getLocalStorageKey(component) {
  if (component.getLocalStorageKey) {
    return component.getLocalStorageKey();
  }
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
  if (!stateFilterKeys) return state;
  var result = {};
  stateFilterKeys.forEach(function(sk) {
    for (var key in state) {
      if (state.hasOwnProperty(key) && sk === key) result[key] = state[key];
    }
  });
  return result;
}
