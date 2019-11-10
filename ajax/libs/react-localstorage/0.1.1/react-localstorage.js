'use strict';
var React = require('react');
var invariant = require('react/lib/invariant');
var ls = global.localStorage;

var Mixin = module.exports = {
  componentDidUpdate: function(prevProps, prevState) {
    if (!ls) return;
    var key = getLocalStorageKey(this);
    var prevStoredState = ls.getItem(key);
    if (prevStoredState) {
      invariant(
        prevStoredState === JSON.stringify(prevState),
        'While component ' + getDisplayName(this) + ' was saving state to localStorage, ' +
        'the localStorage entry was modified by another actor. This can happen when multiple ' +
        'components are using the same localStorage key. Set the property `localStorageKey` ' +
        'on ' + getDisplayName(this) + '.'
      );
    }
    ls.setItem(key, JSON.stringify(this.state));
  },

  componentWillMount: function() {
    loadStateFromLocalStorage(this);
  },

  componentDidMount: function () {
    // we have to save it to make the saved state
    // correspond to the updated component state structure
    ls.setItem(getLocalStorageKey(this), JSON.stringify(this.state));
  }
};

function loadStateFromLocalStorage(component) {
    if (!ls) return;
    var key = getLocalStorageKey(component);
    try {
      var storedState = JSON.parse(ls.getItem(key));
      if (storedState) {
        component.setState(storedState);
      }
    } catch(e) {
      if (console) console.warn("Unable to load state for", getDisplayName(component), "from localStorage.");
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
