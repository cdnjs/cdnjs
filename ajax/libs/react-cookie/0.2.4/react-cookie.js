(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var cookie = require('cookie');

var _rawCookies = {};
var _cookies = {};

if (typeof document !== 'undefined') {
  setRawCookie(document.cookie);
}

function load(name, doNotParse) {
  if (doNotParse) {
    return _rawCookies[name];
  }

  return _cookies[name];
}

function save(name, val, opt) {
  _cookies[name] = val;
  _rawCookies[name] = val;

  // allow you to work with cookies as objects.
  if (typeof val === 'object') {
    _rawCookies[name] = JSON.stringify(val);
  }

  // Cookies only work in the browser
  if (typeof document !== 'undefined') {
    document.cookie = cookie.serialize(name, _rawCookies[name], opt);
  }
}

function remove(name) {
  delete _rawCookies[name];
  delete _cookies[name];

  if (typeof document !== 'undefined') {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}

function setRawCookie(rawCookie) {
  if (!rawCookie) {
    return;
  }

  var rawCookies = cookie.parse(rawCookie);

  for (var key in rawCookies) {
    _rawCookies[key] = rawCookies[key];

    try {
      _cookies[key] = JSON.parse(rawCookies[key]);
    } catch(e) {
      // Not serialized object
      _cookies[key] = rawCookies[key];
    }
  }
}

var reactCookie = {
  load: load,
  save: save,
  remove: remove,
  setRawCookie: setRawCookie
};

if (typeof window !== 'undefined') {
  window['reactCookie'] = reactCookie;
}

module.exports = reactCookie;

},{"cookie":2}],2:[function(require,module,exports){

/// Serialize the a name value pair into a cookie string suitable for
/// http headers. An optional options object specified cookie parameters
///
/// serialize('foo', 'bar', { httpOnly: true })
///   => "foo=bar; httpOnly"
///
/// @param {String} name
/// @param {String} val
/// @param {Object} options
/// @return {String}
var serialize = function(name, val, opt){
    opt = opt || {};
    var enc = opt.encode || encode;
    var pairs = [name + '=' + enc(val)];

    if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
        pairs.push('Max-Age=' + maxAge);
    }

    if (opt.domain) pairs.push('Domain=' + opt.domain);
    if (opt.path) pairs.push('Path=' + opt.path);
    if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString());
    if (opt.httpOnly) pairs.push('HttpOnly');
    if (opt.secure) pairs.push('Secure');

    return pairs.join('; ');
};

/// Parse the given cookie header string into an object
/// The object has the various cookies as keys(names) => values
/// @param {String} str
/// @return {Object}
var parse = function(str, opt) {
    opt = opt || {};
    var obj = {}
    var pairs = str.split(/; */);
    var dec = opt.decode || decode;

    pairs.forEach(function(pair) {
        var eq_idx = pair.indexOf('=')

        // skip things that don't look like key=value
        if (eq_idx < 0) {
            return;
        }

        var key = pair.substr(0, eq_idx).trim()
        var val = pair.substr(++eq_idx, pair.length).trim();

        // quoted values
        if ('"' == val[0]) {
            val = val.slice(1, -1);
        }

        // only assign once
        if (undefined == obj[key]) {
            try {
                obj[key] = dec(val);
            } catch (e) {
                obj[key] = val;
            }
        }
    });

    return obj;
};

var encode = encodeURIComponent;
var decode = decodeURIComponent;

module.exports.serialize = serialize;
module.exports.parse = parse;

},{}]},{},[1]);
