/*!
 * react-router-active-component 2.0.0 - https://github.com/insin/react-router-active-component
 * MIT Licensed
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.createActiveRouteComponent = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null)
var assign = require('react/lib/Object.assign')
var $__0=  (typeof window !== "undefined" ? window.ReactRouter : typeof global !== "undefined" ? global.ReactRouter : null),Link=$__0.Link

var PropTypes = React.PropTypes

function createActiveRouteComponent(Component, options) {
  if (!Component) {
    throw new Error('createActiveRouteComponent() must be given a wrapper component.')
  }

  options = assign({
    link: true,
    linkClassName: ''
  }, options)

  return React.createClass({
    contextTypes: {
      router: PropTypes.func.isRequired
    },

    propTypes: {
      activeClassName: PropTypes.string.isRequired,
      to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object // React Router doesn't expose Route or its custom PropType
      ]).isRequired,

      activeStyle: PropTypes.object,
      link: PropTypes.bool,
      linkClassName: PropTypes.string,
      onClick: PropTypes.func,
      params: PropTypes.object,
      query: PropTypes.object
    },

    getDefaultProps:function() {
      return {
        activeClassName: 'active',
        className: '',
        link: options.link,
        linkClassName: options.linkClassName
      }
    },

    getActiveState:function() {
      return this.context.router.isActive(this.props.to, this.props.params, this.props.query)
    },

    getClassName:function() {
      var className = this.props.className
      if (this.getActiveState()) {
        className += ' ' + this.props.activeClassName
      }
      return className
    },

    render:function() {
      var props = assign({}, this.props, {
        active: this.getActiveState(),
        className: this.getClassName()
      })
      if (props.activeStyle && props.active) {
        props.style = props.activeStyle
      }
      if (this.props.link) {
        // Only use active styles on the container
        var linkProps = assign({}, this.props, {
          className: this.props.linkClassName,
          activeClassName: '',
          activeStyle: null
        })
        return React.createElement(Component, props,
          React.createElement(Link, linkProps, this.props.children)
        )
      }
      else {
        return React.createElement(Component, props, this.props.children)
      }
    }
  })
}

module.exports = createActiveRouteComponent
},{"react/lib/Object.assign":2}],2:[function(require,module,exports){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Object.assign
 */

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

'use strict';

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
}

module.exports = assign;

},{}]},{},[1])(1)
});