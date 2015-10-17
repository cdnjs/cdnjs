/**
 * json-mask | (c) 2014 Yuriy Nemtsov | https://github.com/nemtsov/json-mask/blob/master/LICENSE
 * @license
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.jsonMask=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var util = _dereq_('./util')
  , TERMINALS = {',': 1, '/': 2, '(': 3, ')': 4}

module.exports = compile

/**
 *  Compiler
 *
 *  Grammar:
 *     Props ::= Prop | Prop "," Props
 *      Prop ::= Object | Array
 *    Object ::= NAME | NAME "/" Object
 *     Array ::= NAME "(" Props ")"
 *      NAME ::= ? all visible characters ?
 *
 *  Examples:
 *    a
 *    a,d,g
 *    a/b/c
 *    a(b)
 *    ob,a(k,z(f,g/d)),d
 */

function compile(text) {
  if (!text) return null
  return parse(scan(text))
}

function scan(text) {
  var i = 0
    , len = text.length
    , tokens = []
    , name = ''
    , ch

  function maybePushName() {
    if (!name) return
    tokens.push({tag: '_n', value: name})
    name = ''
  }

  for (; i < len; i++) {
    ch = text.charAt(i)
    if (TERMINALS[ch]) {
      maybePushName()
      tokens.push({tag: ch})
    } else {
      name += ch
    }
  }
  maybePushName()

  return tokens
}

function parse(tokens) {
  return _buildTree(tokens, {}, [])
}

function _buildTree(tokens, parent, stack) {
  var props = {}
    , openTag
    , token
    , peek

  while (token = tokens.shift()) {
    if ('_n' === token.tag) {
      token.type = 'object'
      token.properties = _buildTree(tokens, token, stack)
      // exit if in object stack
      peek = stack[stack.length-1]
      if (peek && ('/' == peek.tag)) {
        stack.pop()
        _addToken(token, props)
        return props
      }
    } else if (',' === token.tag) {
      return props
    } else if ('(' === token.tag) {
      stack.push(token)
      parent.type = 'array'
      continue
    } else if (')' === token.tag) {
      openTag = stack.pop(token)
      return props
    } else if ('/' === token.tag) {
      stack.push(token)
      continue
    }
    _addToken(token, props)
  }

  return props
}

function _addToken(token, props) {
  props[token.value] = {type: token.type}
  if (!util.isEmpty(token.properties)) {
    props[token.value].properties = token.properties
  }
}

},{"./util":4}],2:[function(_dereq_,module,exports){
var util = _dereq_('./util')

module.exports = filter

function filter(obj, compiledMask) {
  return util.isArray(obj) ?
    _arrayProperties(obj, compiledMask) :
    _properties(obj, compiledMask)
}

// wrap array & mask in a temp object;
// extract results from temp at the end
function _arrayProperties(arr, mask) {
  var obj = _properties({_: arr}, {_: {
      type: 'array'
    , properties: mask
  }})
  return obj && obj._
}

function _properties(obj, mask) {
  var maskedObj = {}
    , key, value, ret, retKey
  if (!obj || !mask) return obj
  for (key in mask) {
    if (!util.has(mask, key)) continue
    value = mask[key]
    ret = undefined
    if ('object' === value.type) {
      if ('*' === key) {
        ret = _objectAll(obj, value.properties)
        for (retKey in ret) {
          if (!util.has(ret, retKey)) continue
          maskedObj[retKey] = ret[retKey]
        }
        ret = undefined
      } else {
        ret = _object(obj, key, value.properties)
      }
    } else if ('array' === value.type) {
      ret = _array(obj, key, value.properties)
    }
    if ('undefined' !== typeof ret) {
      maskedObj[key] = ret
    }
  }
  return !util.isEmpty(maskedObj) ? maskedObj : undefined
}

function _objectAll(obj, mask) {
  var ret = {}, key, value
  for (key in obj) {
    if (!util.has(obj, key)) continue
    value = _object(obj, key, mask)
    if (value) ret[key] = value
  }
  return ret
}

function _object(obj, key, mask) {
  var value = obj[key]
  if (util.isArray(value)) return _array(obj, key, mask)
  return mask ? _properties(value, mask) : value
}

function _array(object, key, mask) {
  var ret = [], arr = object[key]
    , i, l, obj, maskedObj
  if (util.isEmpty(arr)) return arr
  if (!util.isArray(arr)) return _properties(arr, mask)
  for (i = 0, l = arr.length; i < l; i++) {
    obj = arr[i]
    maskedObj = _properties(obj, mask)
    if (maskedObj) ret.push(maskedObj)
  }
  return ret.length ? ret : undefined
}

},{"./util":4}],3:[function(_dereq_,module,exports){
var compile = _dereq_('./compiler')
  , filter = _dereq_('./filter')

function mask(obj, mask) {
  return filter(obj, compile(mask)) || null
}

mask.compile = compile
mask.filter = filter

module.exports = mask

},{"./compiler":1,"./filter":2}],4:[function(_dereq_,module,exports){
var ObjProto = Object.prototype

exports.isEmpty = isEmpty
exports.isArray = Array.isArray || isArray
exports.has = has

function isEmpty(obj) {
  if (obj == null) return true
  if (isArray(obj) ||
     ('string' === typeof obj)) return (0 === obj.length)
  for (var key in obj) if (has(obj, key)) return false
  return true
}

function isArray(obj) {
  return ObjProto.toString.call(obj) == '[object Array]'
}

function has(obj, key) {
  return ObjProto.hasOwnProperty.call(obj, key)
}

},{}]},{},[3])
(3)
});
