/*!
 * react-router-active-component 1.0.0 - https://github.com/insin/react-router-active-component
 * MIT Licensed
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.createActiveRouteComponent=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null)
var assign = require('react/lib/Object.assign')
var $__0=   (typeof window !== "undefined" ? window.ReactRouter : typeof global !== "undefined" ? global.ReactRouter : null),Link=$__0.Link,State=$__0.State

function createActiveRouteComponent(component, options) {
  if (!component) {
    throw new Error('createActiveRouteComponent() must be given a wrapper component.')
  }
  options = assign({link: true}, options)

  return React.createClass({
    mixins: [State],

    propTypes: {
      activeClassName: React.PropTypes.string.isRequired,
      link: React.PropTypes.bool,
      to: React.PropTypes.string.isRequired,
      params: React.PropTypes.object,
      query: React.PropTypes.object,
      onClick: React.PropTypes.func
    },

    getDefaultProps:function() {
      return {
        activeClassName: 'active'
      , link: options.link
      }
    },

    getClassName:function() {
      var $__0=      this.props,className=$__0.className,activeClassName=$__0.activeClassName,to=$__0.to,params=$__0.params,query=$__0.query
      var classNames = []
      if (className) {
        classNames.push(className)
      }
      if (this.isActive(to, params, query)) {
        classNames.push(activeClassName)
      }
      return classNames.join(' ')
    },

    render:function() {
      var props = assign({}, this.props, {
        active: this.isActive(this.props.to, this.props.params, this.props.query)
      , className: this.getClassName()
      })
      if (this.props.link) {
        // Only put classNames on the container
        var linkProps = assign({}, this.props, {
          className: ''
        , activeClassName: ''
        })
        return React.createElement(component, props,
          React.createElement(Link, linkProps, this.props.children)
        )
      }
      else {
        return React.createElement(component, props, this.props.children)
      }
    }
  })
}

module.exports = createActiveRouteComponent
},{"react/lib/Object.assign":2}],2:[function(require,module,exports){
/**
 * Copyright 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Object.assign
 */

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

function assign(target, sources) {
  if (target == null) {
    throw new TypeError('Object.assign target cannot be null or undefined');
  }

  var to = Object(target);
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
    var nextSource = arguments[nextIndex];
    if (nextSource == null) {
      continue;
    }

    var from = Object(nextSource);

    // We don't currently support accessors nor proxies. Therefore this
    // copy cannot throw. If we ever supported this then we must handle
    // exceptions and side-effects. We don't support symbols so they won't
    // be transferred.

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
  }

  return to;
};

module.exports = assign;

},{}]},{},[1])(1)
});