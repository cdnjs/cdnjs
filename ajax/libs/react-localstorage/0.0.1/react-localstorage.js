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
        'While component ' + this.displayName + ' was saving state to localStorage, ' +
        'the localStorage entry was modified by another actor. This can happen when multiple ' +
        'components are using the same localStorage key. Set the property `localStorageKey` ' +
        'on ' + this.displayName + '.'
      );
    }
    ls.setItem(key, JSON.stringify(this.state));
  },

  componentWillMount: function() {
    loadStateFromLocalStorage(this);
  }
};

function loadStateFromLocalStorage(component) {
  if (!ls) return;
  var key = getLocalStorageKey(component);
  var storedState = ls.getItem(key);
  if (storedState) {
    try {
      component.setState(JSON.parse(storedState));
    } catch(e) {
      if (console) console.warn("Unable to load state for", component.displayName, "from localStorage.");
    }
  }
}

function getLocalStorageKey(component) {
  return component.props.localStorageKey || component.displayName || 'react-localstorage';
}
