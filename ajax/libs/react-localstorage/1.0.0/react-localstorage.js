'use strict';
var warn = require('./lib/warning');

var hasLocalStorage = true;
var testKey = 'react-localstorage.mixin.test-key';
var ls;
try {
  // Access to global `localStorage` property must be guarded as it
  // fails under iOS private session mode.
  ls = global.localStorage;
  ls.setItem(testKey, 'foo');
  ls.removeItem(testKey);
} catch (e) {
  hasLocalStorage = false;
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
   * On unmount, save data.
   *
   * If the page unloads, this may not fire, so we also mount the function to onbeforeunload.
   */
  componentWillUnmount: function() {
    saveStateToLocalStorage(this);

    // Remove beforeunload handler if it exists.
    if (this.__react_localstorage_beforeunload) {
      global.removeEventListener('beforeunload', this.__react_localstorage_beforeunload);
    }
  },

  /**
   * Load data.
   * This seems odd to do this on componentDidMount, but it prevents server checksum errors.
   * This is because the server has no way to know what is in your localStorage. So instead
   * of breaking the checksum and causing a full rerender, we instead change the component after mount
   * for an efficient diff.
   */
  componentDidMount: function() {
    loadStateFromLocalStorage(this);

    // We won't get a componentWillUnmount event if we close the tab or refresh, so add a listener
    // and synchronously populate LS.
    if (hasLocalStorage && this.__react_localstorage_loaded && global.addEventListener) {
      this.__react_localstorage_beforeunload = module.exports.componentWillUnmount.bind(this);
      global.addEventListener('beforeunload', this.__react_localstorage_beforeunload);
    }

  }
};

function loadStateFromLocalStorage(component) {
  if (!hasLocalStorage) return;
  var key = getLocalStorageKey(component);
  if (key === false) return;
  try {
    var storedState = JSON.parse(ls.getItem(key));
    if (storedState) component.setState(storedState);
  } catch(e) {
    // eslint-disable-next-line no-console
    if (console) console.warn("Unable to load state for", getDisplayName(component), "from localStorage.");
  }
  component.__react_localstorage_loaded = true;
}


function saveStateToLocalStorage(component) {
  if (!hasLocalStorage || !component.__react_localstorage_loaded) return;
  var key = getLocalStorageKey(component);
  if (key === false) return;
  ls.setItem(key, JSON.stringify(getSyncState(component)));
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
function getSyncState(component) {
  var state = component.state;
  var stateFilterKeys = getStateFilterKeys(component);
  if (!stateFilterKeys || !state) return state;
  var result = {}, key;
  for (var i = 0; i < stateFilterKeys.length; i++) {
    key = stateFilterKeys[i];
    if (state.hasOwnProperty(key)) result[key] = state[key];
  }
  return result;
}
