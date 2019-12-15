
/*!
 * inferno-router v1.3.0-rc.1
 * (c) 2017 Dominic Gannaway'
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('inferno-component'), require('inferno-create-element'), require('path-to-regexp-es6')) :
	typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'inferno-component', 'inferno-create-element', 'path-to-regexp-es6'], factory) :
	(factory((global['inferno-router'] = global['inferno-router'] || {}),global.Inferno,global.Inferno.Component,global.Inferno.createElement,global.Inferno.pathToRegexp));
}(this, (function (exports,Inferno,Component,createElement,pathToRegExp) { 'use strict';

var Inferno__default = 'default' in Inferno ? Inferno['default'] : Inferno;
Component = 'default' in Component ? Component['default'] : Component;
createElement = 'default' in createElement ? createElement['default'] : createElement;
pathToRegExp = 'default' in pathToRegExp ? pathToRegExp['default'] : pathToRegExp;

var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    var arguments$1 = arguments;

    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments$1[i];
        for (var p in s) { if (Object.prototype.hasOwnProperty.call(s, p))
            { t[p] = s[p]; } }
    }
    return t;
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) { if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        { t[p] = s[p]; } }
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        { for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) { if (e.indexOf(p[i]) < 0)
            { t[p[i]] = s[p[i]]; } } }
    return t;
};
function Link(props, ref) {
    var router = ref.router;

    // TODO: Convert to object assign
    var activeClassName = props.activeClassName;
    var activeStyle = props.activeStyle;
    var className = props.className;
    var onClick = props.onClick;
    var to = props.to;
    var otherProps = __rest(props, ["activeClassName", "activeStyle", "className", "onClick", "to"]);
    var elemProps = __assign({ href: to }, otherProps);
    if (className) {
        elemProps.className = className;
    }
    if (router.location.pathname === to) {
        if (activeClassName) {
            elemProps.className = (className ? className + ' ' : '') + activeClassName;
        }
        if (activeStyle) {
            elemProps.style = Object.assign({}, props.style, activeStyle);
        }
    }
    elemProps.onclick = function navigate(e) {
        if (e.button !== 0 || e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) {
            return;
        }
        e.preventDefault();
        if (typeof onClick === 'function') {
            onClick(e);
        }
        router.push(to, e.target.textContent);
    };
    return Inferno.createVNode(2 /* HtmlElement */, 'a', elemProps, props.children);
}

function IndexLink(props) {
    props.to = '/';
    return Inferno.createVNode(8 /* ComponentFunction */, Link, props);
}

function toArray(children) {
    return isArray(children) ? children : (children ? [children] : children);
}
// this is MUCH faster than .constructor === Array and instanceof Array
// in Node 7 and the later versions of V8, slower in older versions though
var isArray = Array.isArray;






function isString(obj) {
    return typeof obj === 'string';
}







var EMPTY_OBJ = {};
{
    Object.freeze(EMPTY_OBJ);
}

var emptyObject = {};
function decode(val) {
    return typeof val !== 'string' ? val : decodeURIComponent(val);
}
function isEmpty(children) {
    return !children || !(isArray(children) ? children : Object.keys(children)).length;
}
function flatten(oldArray) {
    var newArray = [];
    flattenArray(oldArray, newArray);
    return newArray;
}
function getURLString(location) {
    return isString(location) ? location : (location.pathname + location.search);
}
/**
 * Maps a querystring to an object
 * Supports arrays and utf-8 characters
 * @param search
 * @returns {any}
 */
function mapSearchParams(search) {
    if (search === '') {
        return {};
    }
    // Create an object with no prototype
    var map = Object.create(null);
    var fragments = search.split('&');
    for (var i = 0, len = fragments.length; i < len; i++) {
        var fragment = fragments[i];
        var ref = fragment.split('=').map(mapFragment);
        var k = ref[0];
        var v = ref[1];
        if (map[k]) {
            map[k] = isArray(map[k]) ? map[k] : [map[k]];
            map[k].push(v);
        }
        else {
            map[k] = v;
        }
    }
    return map;
}
/**
 * Gets the relevant part of the URL for matching
 * @param fullURL
 * @param partURL
 * @returns {string}
 */
function toPartialURL(fullURL, partURL) {
    if (fullURL.indexOf(partURL) === 0) {
        return fullURL.substr(partURL.length);
    }
    return fullURL;
}
/**
 * Simulates ... operator by returning first argument
 * with the keys in the second argument excluded
 * @param _args
 * @param excluded
 * @returns {{}}
 */
function rest(_args, excluded) {
    var t = {};
    for (var p in _args) {
        if (excluded.indexOf(p) < 0) {
            t[p] = _args[p];
        }
    }
    return t;
}
/**
 * Sorts an array according to its `path` prop length
 * @param a
 * @param b
 * @returns {number}
 */
function pathRankSort(a, b) {
    var aAttr = a.props || emptyObject;
    var bAttr = b.props || emptyObject;
    var diff = rank(bAttr.path) - rank(aAttr