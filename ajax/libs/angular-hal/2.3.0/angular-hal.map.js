(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.angularHal = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * content-type
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * RegExp to match *( ";" parameter ) in RFC 7231 sec 3.1.1.1
 *
 * parameter     = token "=" ( token / quoted-string )
 * token         = 1*tchar
 * tchar         = "!" / "#" / "$" / "%" / "&" / "'" / "*"
 *               / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
 *               / DIGIT / ALPHA
 *               ; any VCHAR, except delimiters
 * quoted-string = DQUOTE *( qdtext / quoted-pair ) DQUOTE
 * qdtext        = HTAB / SP / %x21 / %x23-5B / %x5D-7E / obs-text
 * obs-text      = %x80-FF
 * quoted-pair   = "\" ( HTAB / SP / VCHAR / obs-text )
 */
var paramRegExp = /; *([!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+) */g
var textRegExp = /^[\u000b\u0020-\u007e\u0080-\u00ff]+$/
var tokenRegExp = /^[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+$/

/**
 * RegExp to match quoted-pair in RFC 7230 sec 3.2.6
 *
 * quoted-pair = "\" ( HTAB / SP / VCHAR / obs-text )
 * obs-text    = %x80-FF
 */
var qescRegExp = /\\([\u000b\u0020-\u00ff])/g

/**
 * RegExp to match chars that must be quoted-pair in RFC 7230 sec 3.2.6
 */
var quoteRegExp = /([\\"])/g

/**
 * RegExp to match type in RFC 6838
 *
 * media-type = type "/" subtype
 * type       = token
 * subtype    = token
 */
var typeRegExp = /^[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+\/[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+$/

/**
 * Module exports.
 * @public
 */

exports.format = format
exports.parse = parse

/**
 * Format object to media type.
 *
 * @param {object} obj
 * @return {string}
 * @public
 */

function format(obj) {
  if (!obj || typeof obj !== 'object') {
    throw new TypeError('argument obj is required')
  }

  var parameters = obj.parameters
  var type = obj.type

  if (!type || !typeRegExp.test(type)) {
    throw new TypeError('invalid type')
  }

  var string = type

  // append parameters
  if (parameters && typeof parameters === 'object') {
    var param
    var params = Object.keys(parameters).sort()

    for (var i = 0; i < params.length; i++) {
      param = params[i]

      if (!tokenRegExp.test(param)) {
        throw new TypeError('invalid parameter name')
      }

      string += '; ' + param + '=' + qstring(parameters[param])
    }
  }

  return string
}

/**
 * Parse media type to object.
 *
 * @param {string|object} string
 * @return {Object}
 * @public
 */

function parse(string) {
  if (!string) {
    throw new TypeError('argument string is required')
  }

  if (typeof string === 'object') {
    // support req/res-like objects as argument
    string = getcontenttype(string)

    if (typeof string !== 'string') {
      throw new TypeError('content-type header is missing from object');
    }
  }

  if (typeof string !== 'string') {
    throw new TypeError('argument string is required to be a string')
  }

  var index = string.indexOf(';')
  var type = index !== -1
    ? string.substr(0, index).trim()
    : string.trim()

  if (!typeRegExp.test(type)) {
    throw new TypeError('invalid media type')
  }

  var key
  var match
  var obj = new ContentType(type.toLowerCase())
  var value

  paramRegExp.lastIndex = index

  while (match = paramRegExp.exec(string)) {
    if (match.index !== index) {
      throw new TypeError('invalid parameter format')
    }

    index += match[0].length
    key = match[1].toLowerCase()
    value = match[2]

    if (value[0] === '"') {
      // remove quotes and escapes
      value = value
        .substr(1, value.length - 2)
        .replace(qescRegExp, '$1')
    }

    obj.parameters[key] = value
  }

  if (index !== -1 && index !== string.length) {
    throw new TypeError('invalid parameter format')
  }

  return obj
}

/**
 * Get content-type from req/res objects.
 *
 * @param {object}
 * @return {Object}
 * @private
 */

function getcontenttype(obj) {
  if (typeof obj.getHeader === 'function') {
    // res-like
    return obj.getHeader('content-type')
  }

  if (typeof obj.headers === 'object') {
    // req-like
    return obj.headers && obj.headers['content-type']
  }
}

/**
 * Quote a string if necessary.
 *
 * @param {string} val
 * @return {string}
 * @private
 */

function qstring(val) {
  var str = String(val)

  // no need to quote tokens
  if (tokenRegExp.test(str)) {
    return str
  }

  if (str.length > 0 && !textRegExp.test(str)) {
    throw new TypeError('invalid parameter value')
  }

  return '"' + str.replace(quoteRegExp, '\\$1') + '"'
}

/**
 * Class to represent a content type.
 * @private
 */
function ContentType(type) {
  this.parameters = Object.create(null)
  this.type = type
}

},{}],2:[function(require,module,exports){
/* jshint node:true */

var UriTemplate = require('./UriTemplate');

function Router() {
    var routes = [];

    this.add = function (template, handler) {

        routes.push({
            template: new UriTemplate(template),
            handler: handler
        }); //

    }; //add

    this.handle = function (url) {

        return routes.some(function (route) {
            var data = route.template.parse(url);
            return data && route.handler(data) !== false;
        });

    }; //exec

} //Router

module.exports = Router;
},{"./UriTemplate":3}],3:[function(require,module,exports){
/* jshint node:true */

module.exports = UriTemplate;


var operatorOptions = {
    "": {
        "prefix": "",
        "seperator": ",",
        "assignment": false,
        "assignEmpty": false,
        "encode": percentEncode
    },
    "+": {
        "prefix": "",
        "seperator": ",",
        "assignment": false,
        "assignEmpty": false,
        "encode": encodeURI
    },
    "#": {
        "prefix": "#",
        "seperator": ",",
        "assignment": false,
        "assignEmpty": false,
        "encode": encodeURI
    },
    ".": {
        "prefix": ".",
        "seperator": ".",
        "assignment": false,
        "assignEmpty": false,
        "encode": percentEncode
    },
    "/": {
        "prefix": "/",
        "seperator": "/",
        "assignment": false,
        "encode": encodeURIComponent
    },
    ";": {
        "prefix": ";",
        "seperator": ";",
        "assignment": true,
        "assignEmpty": false,
        "encode": encodeURIComponent
    },
    "?": {
        "prefix": "?",
        "seperator": "&",
        "assignment": true,
        "assignEmpty": true,
        "encode": encodeURIComponent
    },
    "&": {
        "prefix": "&",
        "seperator": "&",
        "assignment": true,
        "assignEmpty": true,
        "encode": encodeURIComponent
    }
}; //operatorOptions

function percentEncode(value) {
    /*
	http://tools.ietf.org/html/rfc3986#section-2.3
	*/
    var unreserved = "-._~";

    if (isUndefined(value)) return '';

    value = value.toString();

    return Array.prototype.map.call(value, function (ch) {
        var charCode = ch.charCodeAt(0);

        if (charCode >= 0x30 && charCode <= 0x39) return ch;
        if (charCode >= 0x41 && charCode <= 0x5a) return ch;
        if (charCode >= 0x61 && charCode <= 0x7a) return ch;

        if (~unreserved.indexOf(ch)) return ch;

        return '%' + charCode.toString(16).toUpperCase();
    }).join('');

} //percentEncode

function isDefined(value) {
    return !isUndefined(value);
} //isDefined
function isUndefined(value) {
    /*
	http://tools.ietf.org/html/rfc6570#section-2.3
	*/
    if (value === null) return true;
    if (value === undefined) return true;
    if (Array.isArray(value)) {
        if (value.length === 0) return true;
    }

    return false;
} //isUndefined


function UriTemplate(template) {
    /*
	http://tools.ietf.org/html/rfc6570#section-2.2

	expression    =  "{" [ operator ] variable-list "}"
	operator      =  op-level2 / op-level3 / op-reserve
	op-level2     =  "+" / "#"
	op-level3     =  "." / "/" / ";" / "?" / "&"
	op-reserve    =  "=" / "," / "!" / "@" / "|"
	*/
    var reTemplate = /\{([\+#\.\/;\?&=\,!@\|]?)([A-Za-z0-9_\,\.\:\*]+?)\}/g;
    var reVariable = /^([\$_a-z][\$_a-z0-9]*)((?:\:[1-9][0-9]?[0-9]?[0-9]?)?)(\*?)$/i;
    var match;
    var pieces = [];
    var glues = [];
    var offset = 0;
    var pieceCount = 0;

    while ( !! (match = reTemplate.exec(template))) {
        glues.push(template.substring(offset, match.index));
        /*
		The operator characters equals ("="), comma (","), exclamation ("!"),
		at sign ("@"), and pipe ("|") are reserved for future extensions.
		*/
        if (match[1] && ~'=,!@|'.indexOf(match[1])) {
            throw "operator '" + match[1] + "' is reserved for future extensions";
        }

        offset = match.index;
        pieces.push({
            operator: match[1],
            variables: match[2].split(',').map(variableMapper)
        });
        offset += match[0].length;
        pieceCount++;
    }

    function variableMapper(variable) {
        var match = reVariable.exec(variable);
        return {
            name: match[1],
            maxLength: match[2] && parseInt(match[2].substring(1), 10),
            composite: !! match[3]
        };
    }

    glues.push(template.substring(offset));

    this.parse = function (str) {
        var data = {};
        var offset = 0;
        var offsets = [];

        if (!glues.every(function (glue, glueIndex) {
            var index;
            if (glueIndex > 0 && glue === '') index = str.length;
            else index = str.indexOf(glue, offset);

            offset = index;
            offsets.push(offset);
            offset += glue.length;

            return~ index;
        })) return false;

        if (!pieces.every(function (piece, pieceIndex) {
            var options = operatorOptions[piece.operator];
            var value, values;
            var offsetBegin = offsets[pieceIndex] + glues[pieceIndex].length;
            var offsetEnd = offsets[pieceIndex + 1];

            value = str.substring(offsetBegin, offsetEnd);
            if (value.length === 0) return true;
            if (value.substring(0, options.prefix.length) !== options.prefix) return false;
            value = value.substring(options.prefix.length);
            values = value.split(options.seperator);

            if (!piece.variables.every(function (variable, variableIndex) {
                var value = values[variableIndex];
                var name;

                if (value === undefined) return true;

                name = variable.name;

                if (options.assignment) {
                    if (value.substring(0, name.length) !== name) return false;
                    value = value.substring(name.length);
                    if (value.length === 0 && options.assignEmpty) return false;
                    if (value.length > 0) {
                        if (value[0] !== '=') return false;
                        value = value.substring(1);
                    }
                }
                value = decodeURIComponent(value);
                data[name] = value;

                return true;
            })) return false;

            return true;

        })) return false;

        return data;
    }; //parse

    this.stringify = function (data) {
        var str = '';
        data = data || {};

        str += glues[0];
        if (!pieces.every(function (piece, pieceIndex) {

            var options = operatorOptions[piece.operator];
            var parts;

            parts = piece.variables.map(function (variable) {
                var value = data[variable.name];

                if (!Array.isArray(value)) value = [value];

                value = value.filter(isDefined);

                if (isUndefined(value)) return null;

                if (variable.composite) {
                    value = value.map(function (value) {

                        if (typeof value === 'object') {

                            value = Object.keys(value).map(function (key) {
                                var keyValue = value[key];
                                if (variable.maxLength) keyValue = keyValue.substring(0, variable.maxLength);

                                keyValue = options.encode(keyValue);

                                if (keyValue) keyValue = key + '=' + keyValue;
                                else {
                                    keyValue = key;
                                    if (options.assignEmpty) keyValue += '=';
                                }

                                return keyValue;
                            }).join(options.seperator);

                        } else {
                            if (variable.maxLength) value = value.substring(0, variable.maxLength);

                            value = options.encode(value);

                            if (options.assignment) {
                                if (value) value = variable.name + '=' + value;
                                else {
                                    value = variable.name;
                                    if (options.assignEmpty) value += '=';
                                }
                            }
                        }

                        return value;
                    });

                    value = value.join(options.seperator);
                } else {
                    value = value.map(function (value) {
                        if (typeof value === 'object') {
                            return Object.keys(value).map(function (key) {
                                var keyValue = value[key];
                                if (variable.maxLength) keyValue = keyValue.substring(0, variable.maxLength);
                                return key + ',' + options.encode(keyValue);
                            }).join(',');
                        } else {
                            if (variable.maxLength) value = value.substring(0, variable.maxLength);

                            return options.encode(value);
                        }

                    });
                    value = value.join(',');

                    if (options.assignment) {
                        if (value) value = variable.name + '=' + value;
                        else {
                            value = variable.name;
                            if (options.assignEmpty) value += '=';
                        }
                    }

                }

                return value;
            });

            parts = parts.filter(isDefined);
            if (isDefined(parts)) {
                str += options.prefix;
                str += parts.join(options.seperator);
            }

            str += glues[pieceIndex + 1];
            return true;
        })) return false;

        return str;
    }; //stringify

} //UriTemplate
},{}],4:[function(require,module,exports){
/* jshint node:true */

module.exports = {
    Router: require('./Router'),
    UriTemplate: require('./UriTemplate')
};
},{"./Router":2,"./UriTemplate":3}],5:[function(require,module,exports){
'use strict';

/**
 * @deprecated The halClient service is deprecated. Please use $http directly instead.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HalClient = function () {
  /**
   * @param {Log}      $log
   * @param {Http}     $http
   * @param {Function} LinkHeader
   * @param {Object}   $halConfiguration
   */

  function HalClient($log, $http, LinkHeader, $halConfiguration) {
    _classCallCheck(this, HalClient);

    this._$log = $log;
    this._$http = $http;
    this._$halConfiguration = $halConfiguration;
    this.LinkHeader = LinkHeader;
  }

  _createClass(HalClient, [{
    key: '$get',
    value: function $get(href, options) {
      return this.$request('GET', href, options);
    }
  }, {
    key: '$post',
    value: function $post(href, options, data) {
      return this.$request('POST', href, options, data);
    }
  }, {
    key: '$put',
    value: function $put(href, options, data) {
      return this.$request('PUT', href, options, data);
    }
  }, {
    key: '$patch',
    value: function $patch(href, options, data) {
      return this.$request('PATCH', href, options, data);
    }
  }, {
    key: '$delete',
    value: function $delete(href, options) {
      return this.$request('DELETE', href, options);
    }
  }, {
    key: '$link',
    value: function $link(href, options, linkHeaders) {
      options = options || {};
      options.headers = options.headers || {};
      options.headers.Link = linkHeaders.map(function (link) {
        return link.toString();
      });
      return this.$request('LINK', href, options);
    }
  }, {
    key: '$unlink',
    value: function $unlink(href, options, linkHeaders) {
      options = options || {};
      options.headers = options.headers || {};
      options.headers.Link = linkHeaders.map(function (link) {
        return link.toString();
      });
      return this.$request('UNLINK', href, options);
    }
  }, {
    key: '$request',
    value: function $request(method, href, options, data) {
      options = options || {};
      this._$log.log('The halClient service is deprecated. Please use $http directly instead.');
      return this._$http(angular.extend({}, options, {
        method: method,
        url: this._$halConfiguration.urlTransformer(href),
        data: data
      }));
    }
  }]);

  return HalClient;
}();

// Inject Dependencies


exports.default = HalClient;
HalClient.$inject = ['$log', '$http', 'LinkHeader', '$halConfiguration'];

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _halClient = require('./hal-client');

var _halClient2 = _interopRequireDefault(_halClient);

var _linkHeader = require('./link-header');

var _linkHeader2 = _interopRequireDefault(_linkHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODULE_NAME = 'angular-hal.client';

// Add module for client
angular.module(MODULE_NAME, []).service('halClient', _halClient2.default).service('$halClient', _halClient2.default).value('LinkHeader', _linkHeader2.default);

exports.default = MODULE_NAME;

},{"./hal-client":5,"./link-header":7}],7:[function(require,module,exports){
'use strict';

/**
 * Link Header
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LinkHeader = function () {
  /**
   * @param {String} uriReference The Link Value
   * @param {Object} linkParams   The Link Params
   */

  function LinkHeader(uriReference, linkParams) {
    _classCallCheck(this, LinkHeader);

    this.uriReference = uriReference;
    this.linkParams = angular.extend({
      rel: null,
      anchor: null,
      rev: null,
      hreflang: null,
      media: null,
      title: null,
      type: null
    }, linkParams);
  }
  /**
   * @return {String}
   */


  _createClass(LinkHeader, [{
    key: 'toString',
    value: function toString() {
      var result = '<' + this.uriReference + '>',
          params = [];

      for (var paramName in this.linkParams) {
        var paramValue = this.linkParams[paramName];
        if (paramValue) {
          params.push(paramName + '="' + paramValue + '"');
        }
      }

      if (params.length < 1) {
        return result;
      }

      result = result + ';' + params.join(';');

      return result;
    }
  }]);

  return LinkHeader;
}();

exports.default = LinkHeader;

},{}],8:[function(require,module,exports){
'use strict';

/**
 * @param {String}
 * @return {String}
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.noopUrlTransformer = noopUrlTransformer;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function noopUrlTransformer(url) {
  return url;
}

var HalConfigurationProvider = function () {
  function HalConfigurationProvider() {
    _classCallCheck(this, HalConfigurationProvider);

    this._linksAttribute = '_links';
    this._embeddedAttribute = '_embedded';
    this._ignoreAttributePrefixes = ['_', '$'];
    this._selfLink = 'self';
    this._forceJSONResource = false;
    this._urlTransformer = noopUrlTransformer;

    this.$get.$inject = ['$log'];
  }

  /**
   * @param {String} linksAttribute
   */


  _createClass(HalConfigurationProvider, [{
    key: 'setLinksAttribute',
    value: function setLinksAttribute(linksAttribute) {
      this._linksAttribute = linksAttribute;
    }

    /**
     * @param {String} embeddedAttribute
     */

  }, {
    key: 'setEmbeddedAttribute',
    value: function setEmbeddedAttribute(embeddedAttribute) {
      this._embeddedAttribute = embeddedAttribute;
    }

    /**
     * @param {String[]} ignoreAttributePrefixes
     */

  }, {
    key: 'setIgnoreAttributePrefixes',
    value: function setIgnoreAttributePrefixes(ignoreAttributePrefixes) {
      this._ignoreAttributePrefixes = ignoreAttributePrefixes;
    }

    /**
     * @param {String} ignoreAttributePrefix
     */

  }, {
    key: 'addIgnoreAttributePrefix',
    value: function addIgnoreAttributePrefix(ignoreAttributePrefix) {
      this._ignoreAttributePrefixes.push(ignoreAttributePrefix);
    }

    /**
     * @param {String} selfLink
     */

  }, {
    key: 'setSelfLink',
    value: function setSelfLink(selfLink) {
      this._selfLink = selfLink;
    }

    /**
     * @param {Boolean} forceJSONResource
     */

  }, {
    key: 'setForceJSONResource',
    value: function setForceJSONResource(forceJSONResource) {
      this._forceJSONResource = forceJSONResource;
    }

    /**
     * @param {Function} urlTransformer
     * @deprecated $halConfigurationProvider.setUrlTransformer is deprecated. Please write a http interceptor instead.
     * @see https://docs.angularjs.org/api/ng/service/$http#interceptors
     */

  }, {
    key: 'setUrlTransformer',
    value: function setUrlTransformer(urlTransformer) {
      this._urlTransformer = urlTransformer;
    }

    /**
     * Get Configuration
     * @param  {Log} $log logger
     * @return {Object}
     */

  }, {
    key: '$get',
    value: function $get($log) {
      if (this._urlTransformer !== noopUrlTransformer) {
        $log.log('$halConfigurationProvider.setUrlTransformer is deprecated. Please write a http interceptor instead.');
      }

      return Object.freeze({
        linksAttribute: this._linksAttribute,
        embeddedAttribute: this._embeddedAttribute,
        ignoreAttributePrefixes: this._ignoreAttributePrefixes,
        selfLink: this._selfLink,
        forceJSONResource: this._forceJSONResource,
        urlTransformer: this._urlTransformer
      });
    }
  }]);

  return HalConfigurationProvider;
}();

exports.default = HalConfigurationProvider;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _halConfiguration = require('./hal-configuration.provider');

var _halConfiguration2 = _interopRequireDefault(_halConfiguration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODULE_NAME = 'angular-hal.configuration';

// Add module for configuration
angular.module(MODULE_NAME, []).provider('$halConfiguration', _halConfiguration2.default);

exports.default = MODULE_NAME;

},{"./hal-configuration.provider":8}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HttpInterceptorConfiguration;

var _resourceHttpInterceptor = require('./resource-http-interceptor.factory');

var _resourceHttpInterceptor2 = _interopRequireDefault(_resourceHttpInterceptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {HttpProvider} $httpProvider
 */
function HttpInterceptorConfiguration($httpProvider) {
  $httpProvider.interceptors.push(_resourceHttpInterceptor2.default);
}

HttpInterceptorConfiguration.$inject = ['$httpProvider'];

},{"./resource-http-interceptor.factory":12}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../resource/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../configuration/index');

var _index4 = _interopRequireDefault(_index3);

var _httpInterception = require('./http-interception.config');

var _httpInterception2 = _interopRequireDefault(_httpInterception);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODULE_NAME = 'angular-hal.http-interception';

// Add module for http interception
angular.module(MODULE_NAME, [_index2.default, _index4.default]).config(_httpInterception2.default);

exports.default = MODULE_NAME;

},{"../configuration/index":9,"../resource/index":15,"./http-interception.config":10}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ResourceHttpInterceptorFactory;

var _contentType = require('content-type');

var CONTENT_TYPE = 'application/hal+json';

function ResourceHttpInterceptorFactory($halConfiguration, Resource) {
  return {
    request: transformRequest,
    response: transformResponse
  };

  /**
   * Add Hal Json As an accepted format
   * @param {Request} request
   * @return {Request}
   */
  function transformRequest(request) {
    if (typeof request.headers.Accept === 'undefined') {
      request.headers.Accept = CONTENT_TYPE;
    } else {
      request.headers.Accept = [CONTENT_TYPE, request.headers.Accept].join(', ');
    }

    return request;
  }

  /**
   * Transform Response
   *
   * @param {Response} response
   * @return {Response|Resource}
   */
  function transformResponse(response) {
    try {
      if ((0, _contentType.parse)(response.headers('Content-Type')).type === CONTENT_TYPE) {
        return transformResponseToResource(response);
      }
    } catch (e) {
      // The parse function could throw an error, we do not want that.
    }
    if (response.config.forceHal) {
      return transformResponseToResource(response);
    }
    if ((response.headers('Content-Type') === 'application/json' || response.headers('Content-Type') === null) && $halConfiguration.forceJSONResource) {
      return transformResponseToResource(response);
    }

    return response;
  }
  function transformResponseToResource(response) {
    return new Resource(response.data, response);
  }
}

ResourceHttpInterceptorFactory.$inject = ['$halConfiguration', 'Resource'];

},{"content-type":1}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./http-interception/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./client/index');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODULE_NAME = 'angular-hal';

// Combine needed Modules
angular.module(MODULE_NAME, [_index2.default, _index4.default]);

exports.default = MODULE_NAME;

},{"./client/index":6,"./http-interception/index":11}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HalResourceClientFactory;

var _extendReadOnly = require('../utility/extend-read-only');

var _extendReadOnly2 = _interopRequireDefault(_extendReadOnly);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Factory for HalResourceClient
 * @param {Q}        $q
 * @param {Injector} $injector Prevent Circular Dependency by injecting $injector instead of $http
 * @param {Object}   $halConfiguration
 */
function HalResourceClientFactory($q, $injector, $halConfiguration) {
  return HalResourceClient;

  /**
   * @param {Resource} resource
   * @param {Object}   links
   * @param {Object}   embedded
   */
  function HalResourceClient(resource, embedded) {
    var self = this,
        $http = $injector.get('$http');

    /**
     * Initialize the client
     */
    (function init() {
      (0, _extendReadOnly2.default)(self, {
        $request: $request,
        $get: $get,
        $getCollection: $getCollection,
        $post: $post,
        $put: $put,
        $patch: $patch,
        $delete: $delete,
        $del: $delete,
        $link: $link,
        $unlink: $unlink,
        $getSelf: $getSelf,
        $postSelf: $postSelf,
        $putSelf: $putSelf,
        $patchSelf: $patchSelf,
        $deleteSelf: $deleteSelf,
        $delSelf: $deleteSelf,
        $linkSelf: $linkSelf,
        $unlinkSelf: $unlinkSelf
      });
    })();

    /**
     * Execute a HTTP request against a link
     *
     * @param {String}      method
     * @param {String}      rel
     * @param {Object|null} urlParams
     * @param {mixed|null}  body
     * @param {Object}      options
     * @return {Promise}
     */
    function $request(method, rel, urlParams, body, options) {
      var promises;

      method = method || 'GET';
      rel = rel || $halConfiguration.selfLink;
      urlParams = urlParams || {};
      body = body || null;
      options = options || {};

      if (method === 'GET' && rel === $halConfiguration.selfLink) {
        return $q.resolve(resource);
      }

      if (resource.$hasEmbedded(rel) && Array.isArray(embedded[rel])) {
        promises = [];
        for (var i = 0; i < embedded[rel].length; i++) {
          promises.push(embedded[rel][i].$request().$request(method, 'self', urlParams, body, options));
        }
        return $q.all(promises);
      }

      if (resource.$hasEmbedded(rel)) {
        return embedded[rel].$request().$request(method, 'self', urlParams, body, options);
      }

      if (resource.$hasLink(rel)) {
        var url = resource.$href(rel, urlParams);

        angular.extend(options, {
          method: method,
          data: body
        });

        if (Array.isArray(url)) {
          promises = [];
          for (var j = 0; j < url.length; j++) {
            promises.push($http(angular.extend({}, options, { url: url[j] })));
          }
          return $q.all(promises);
        }

        return performHttpRequest(rel, urlParams, options);
      }

      return $q.reject(new Error('link "' + rel + '" is undefined'));
    }

    /**
     * Execute a HTTP GET request against a link or
     * load an embedded resource
     *
     * @param {String}      rel
     * @param {Object|null} urlParams
     * @param {Object}      options
     * @return {Promise}
     */
    function $get(rel, urlParams, options) {
      return $request('GET', rel, urlParams, undefined, options);
    }

    /**
     * Execute a HTTP GET request to load a collection. If no embedded collection is found in the response,
     * returns an empty array.
     *
     * @param {String}      rel
     * @param {Object|null} urlParams
     * @param {Object}      options
     * @return {Promise}
     */
    function $getCollection(rel, urlParams, options) {
      return $get(rel, urlParams, options).then(function (resource) {
        if (!resource.$has(rel)) {
          return [];
        } else {
          return resource.$request().$get(rel);
        }
      });
    }

    /**
     * Execute a HTTP POST request against a link
     *
     * @param {String}      rel
     * @param {Object|null} urlParams
     * @param {mixed|null}  body
     * @param {Object}      options
     * @return {Promise}
     */
    function $post(rel, urlParams, body, options) {
      return $request('POST', rel, urlParams, body, options);
    }

    /**
     * Execute a HTTP PUT request against a link
     *
     * @param {String}      rel
     * @param {Object|null} urlParams
     * @param {mixed|null}  body
     * @param {Object}      options
     * @return {Promise}
     */
    function $put(rel, urlParams, body, options) {
      return $request('PUT', rel, urlParams, body, options);
    }

    /**
     * Execute a HTTP PATCH request against a link
     *
     * @param {String}      rel
     * @param {Object|null} urlParams
     * @param {mixed|null}  body
     * @param {Object}      options
     * @return {Promise}
     */
    function $patch(rel, urlParams, body, options) {
      return $request('PATCH', rel, urlParams, body, options);
    }

    /**
     * Execute a HTTP DELEET request against a link
     *
     * @param {String}      rel
     * @param {Object|null} urlParams
     * @param {Object}      options
     * @return {Promise}
     */
    function $delete(rel, urlParams, options) {
      return $request('DELETE', rel, urlParams, undefined, options);
    }

    /**
     * Execute a HTTP LINK request against a link
     *
     * @param {String}       rel
     * @param {Object|null}  urlParams
     * @param {LinkHeader[]} body
     * @param {Object}       options
     * @return {Promise}
     */
    function $link(rel, urlParams, links, options) {
      options = options || {};
      options.headers = options.headers || {};
      options.headers.Link = links.map(toStringItem);
      return $request('LINK', rel, urlParams, undefined, options);
    }

    /**
     * Execute a HTTP UNLINK request against a link
     *
     * @param {String}       rel
     * @param {Object|null}  urlParams
     * @param {LinkHeader[]} body
     * @param {Object}       options
     * @return {Promise}
     */
    function $unlink(rel, urlParams, links, options) {
      options = options || {};
      options.headers = options.headers || {};
      options.headers.Link = links.map(toStringItem);
      return $request('UNLINK', rel, urlParams, undefined, options);
    }

    /**
     * @param {mixed} item
     * @return {String}
     */
    function toStringItem(item) {
      return item.toString();
    }

    /**
     * Execute a HTTP GET request on self
     *
     * @param {Object}      options
     * @return {Promise}
     */
    function $getSelf(options) {
      var fullOptions = angular.extend({}, options, { method: 'GET' });
      return performHttpRequest($halConfiguration.selfLink, {}, fullOptions);
    }

    /**
     * Perform a PUT request on self
     * @param payload
     * @param options
     * @returns {Promise}
     */
    function $putSelf(payload, options) {
      return $put($halConfiguration.selfLink, null, payload, options);
    }

    /**
     * Perform a POST request on self
     * @param payload
     * @param options
     * @returns {Promise}
     */
    function $postSelf(payload, options) {
      return $post($halConfiguration.selfLink, null, payload, options);
    }

    /**
     * Perform a PATCH request on self
     * @param payload
     * @param options
     * @returns {Promise}
     */
    function $patchSelf(payload, options) {
      return $patch($halConfiguration.selfLink, null, payload, options);
    }

    /**
     * Perform a LINK request on self
     * @param payload
     * @param options
     * @returns {Promise}
     */
    function $linkSelf(links, options) {
      return $link($halConfiguration.selfLink, null, links, options);
    }

    /**
     * Perform an UNLINK request on self
     * @param payload
     * @param options
     * @returns {Promise}
     */
    function $unlinkSelf(links, options) {
      return $unlink($halConfiguration.selfLink, null, links, options);
    }

    /**
     * Perform a DELETE request on self
     * @param options
     * @returns {Promise}
     */
    function $deleteSelf(options) {
      return $delete($halConfiguration.selfLink, null, options);
    }

    /**
     * Peform http request on resource's rel
     * @param rel link name
     * @param urlParams
     * @param options
     * @returns {*}
     */
    function performHttpRequest(rel, urlParams, options) {
      return $http(angular.extend({}, options, {
        url: resource.$href(rel, urlParams)
      }));
    }
  }
}

HalResourceClientFactory.$inject = ['$q', '$injector', '$halConfiguration'];

},{"../utility/extend-read-only":18}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../configuration/index');

var _index2 = _interopRequireDefault(_index);

var _resource = require('./resource.factory');

var _resource2 = _interopRequireDefault(_resource);

var _halResourceClient = require('./hal-resource-client.factory');

var _halResourceClient2 = _interopRequireDefault(_halResourceClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODULE_NAME = 'angular-hal.resource';

// Add module for resource
angular.module(MODULE_NAME, [_index2.default]).factory('Resource', _resource2.default).factory('HalResourceClient', _halResourceClient2.default);

exports.default = MODULE_NAME;

},{"../configuration/index":9,"./hal-resource-client.factory":14,"./resource.factory":16}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = ResourceFactory;

var _extendReadOnly = require('../utility/extend-read-only');

var _extendReadOnly2 = _interopRequireDefault(_extendReadOnly);

var _defineReadOnly = require('../utility/define-read-only');

var _defineReadOnly2 = _interopRequireDefault(_defineReadOnly);

var _generateUrl = require('../utility/generate-url');

var _generateUrl2 = _interopRequireDefault(_generateUrl);

var _normalizeLink = require('../utility/normalize-link');

var _normalizeLink2 = _interopRequireDefault(_normalizeLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Factory for Resource
 *
 * @param {Function} HalResourceClient
 * @param {Object}   $halConfiguration
 * @param {Log}      $log
 */
function ResourceFactory(HalResourceClient, $halConfiguration, $log) {
  return Resource;

  /**
   * @param {Object} data
   * @param {Object} response
   */
  function Resource(data, response) {
    var self = this,
        links = {},
        embedded = {},
        client;

    /**
     * Initialize the Resource
     */
    (function init() {
      if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object' || data === null) {
        data = {};
      }
      initializeData();
      initializeEmbedded();
      initializeLinks();
      inititalizeClient();

      (0, _extendReadOnly2.default)(self, {
        $hasLink: $hasLink,
        $hasEmbedded: $hasEmbedded,
        $has: $has,
        $href: $href,
        $meta: $meta,
        $link: $link,
        $request: $request,
        $response: $response
      });
    })();

    /**
     * Add all data from data to itself
     */
    function initializeData() {
      for (var propertyName in data) {
        if (!data.hasOwnProperty(propertyName)) {
          continue;
        }
        if (isMetaProperty(propertyName)) {
          continue;
        }
        (0, _defineReadOnly2.default)(self, propertyName, data[propertyName]);
      }
    }

    /**
     * Normalize all Links
     */
    function initializeLinks() {
      if (_typeof(data[$halConfiguration.linksAttribute]) !== 'object') {
        return;
      }

      Object.keys(data[$halConfiguration.linksAttribute]).forEach(function (rel) {
        var link = data[$halConfiguration.linksAttribute][rel];
        links[rel] = (0, _normalizeLink2.default)(response.config.url, link);
      });
    }

    /**
     * Normalize Embedded Contents
     */
    function initializeEmbedded() {
      if (_typeof(data[$halConfiguration.embeddedAttribute]) !== 'object') {
        return;
      }

      Object.keys(data[$halConfiguration.embeddedAttribute]).forEach(function (rel) {
        embedResource(rel, data[$halConfiguration.embeddedAttribute][rel]);
      });
    }

    /**
     * Initialize the HTTP CLIENT
     */
    function inititalizeClient() {
      client = new HalResourceClient(self, embedded);
    }

    /**
     * Embed a resource(s)
     *
     * @param {String}          rel
     * @param {Object|Object[]} resources
     */
    function embedResource(rel, resources) {
      if (Array.isArray(resources)) {
        embedded[rel] = [];
        resources.forEach(function (resource) {
          embedded[rel].push(new Resource(resource, response));
        });
        return;
      }
      embedded[rel] = new Resource(resources, response);
    }

    /**
     * Determine if a property name is a meta property
     * @param {String} propertyName
     * @return {Boolean}
     */
    function isMetaProperty(propertyName) {
      for (var i = 0; i < $halConfiguration.ignoreAttributePrefixes.length; i++) {
        if (propertyName.substr(0, 1) === $halConfiguration.ignoreAttributePrefixes[i]) {
          return true;
        }
        if (propertyName === $halConfiguration.linksAttribute || propertyName === $halConfiguration.embeddedAttribute) {
          return true;
        }
      }
      return false;
    }

    /**
     * @param {String} rel
     * @return {Boolean}
     */
    function $hasLink(rel) {
      return typeof links[rel] !== 'undefined';
    }

    /**
     * @param {String} rel
     * @return {Boolean}
     */
    function $hasEmbedded(rel) {
      return typeof embedded[rel] !== 'undefined';
    }

    /**
     * @param {String} rel
     * @return {Boolean}
     */
    function $has(rel) {
      return $hasLink(rel) || $hasEmbedded(rel);
    }

    /**
     * Get the href of a Link
     *
     * @param {String} rel
     * @param {Object} parameters
     * @return {String}
     */
    function $href(rel, parameters) {
      var link = $link(rel),
          href = link.href;

      if (Array.isArray(link)) {
        href = [];
        for (var i = 0; i < link.length; i++) {
          var subLink = link[i],
              subHref = subLink.href;
          if (typeof subLink.templated !== 'undefined' && subLink.templated) {
            subHref = (0, _generateUrl2.default)(subLink.href, parameters);
          }
          subHref = $halConfiguration.urlTransformer(subHref);
          href.push(subHref);
        }
      } else {
        if (typeof link.templated !== 'undefined' && link.templated) {
          href = (0, _generateUrl2.default)(link.href, parameters);
        }

        href = $halConfiguration.urlTransformer(href);
      }

      return href;
    }

    /**
     * Get a link
     *
     * !! To get a href, use $href instead !!
     *
     * @param {String} rel
     * @return {Object}
     */
    function $link(rel) {
      if (!$hasLink(rel)) {
        throw new Error('link "' + rel + '" is undefined');
      }
      var link = links[rel];

      if (typeof link.deprecation !== 'undefined') {
        $log.warn('The link "' + rel + '" is marked as deprecated with the value "' + link.deprecation + '".');
      }

      return link;
    }

    /**
     * Get meta properties
     *
     * !! To get a href, use $href instead !!
     * !! To get a link, use $link instead !!
     * !! To get an embedded resource, use $request().$get(rel) instead !!
     *
     * @param {String} rel
     * @return {Object}
     */
    function $meta(name) {
      for (var i = 0; i < $halConfiguration.ignoreAttributePrefixes.length; i++) {
        var fullName = $halConfiguration.ignoreAttributePrefixes[i] + name;
        return data[fullName];
      }
    }

    /**
     * Get the Original Response
     *
     * @return {Object)}
     */
    function $response() {
      return response;
    }

    /**
     * Get the client to perform requests
     *
     * @return {HalResourceClient)}
     */
    function $request() {
      return client;
    }
  }
}
ResourceFactory.$inject = ['HalResourceClient', '$halConfiguration', '$log'];

},{"../utility/define-read-only":17,"../utility/extend-read-only":18,"../utility/generate-url":19,"../utility/normalize-link":20}],17:[function(require,module,exports){
'use strict';

/**
 * Define read-only property in target
 * @param {Object} target
 * @param {String} key
 * @param {mixed}  value
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defineReadOnly;
function defineReadOnly(target, key, value) {
  Object.defineProperty(target, key, {
    configurable: false,
    enumerable: true,
    value: value,
    writable: false
  });
}

},{}],18:[function(require,module,exports){
'use strict';

/**
 * Extend properties from copy read-only to target
 * @param {Object} target
 * @param {Object} copy
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extendReadOnly;
function extendReadOnly(target, copy) {
  for (var key in copy) {
    Object.defineProperty(target, key, {
      configurable: false,
      enumerable: false,
      value: copy[key]
    });
  }
}

},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateUrl;

var _main = require('rfc6570/src/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Generate url from template
 *
 * @param  {String} template
 * @param  {Object} parameters
 * @return {String}
 */
function generateUrl(template, parameters) {
  return new _main2.default.UriTemplate(template).stringify(parameters);
}

},{"rfc6570/src/main":4}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalizeLink;

var _resolveUrl = require('../utility/resolve-url');

var _resolveUrl2 = _interopRequireDefault(_resolveUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {String} baseUrl
 * @param {mixed}  link
 * @return {Object}
 */
function normalizeLink(baseUrl, link) {
  if (Array.isArray(link)) {
    return link.map(function (item) {
      return normalizeLink(baseUrl, item);
    });
  }
  if (typeof link === 'string') {
    return {
      href: (0, _resolveUrl2.default)(baseUrl, link)
    };
  }
  if (typeof link.href === 'string') {
    link.href = (0, _resolveUrl2.default)(baseUrl, link.href);
    return link;
  }
  if (Array.isArray(link.href)) {
    return link.href.map(function (href) {
      var newLink = angular.extend({}, link, {
        href: href
      });
      return normalizeLink(baseUrl, newLink);
    });
  }
  return {
    href: baseUrl
  };
}

},{"../utility/resolve-url":21}],21:[function(require,module,exports){
'use strict';

/**
 * Resolve whole URL
 *
 * @param {String} baseUrl
 * @param {String} path
 * @return {String}
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveUrl;
function resolveUrl(baseUrl, path) {
  var resultHref = '',
      reFullUrl = /^((?:\w+\:)?)((?:\/\/)?)([^\/]*)((?:\/.*)?)$/,
      baseHrefMatch = reFullUrl.exec(baseUrl),
      hrefMatch = reFullUrl.exec(path);

  for (var partIndex = 1; partIndex < 5; partIndex++) {
    if (hrefMatch[partIndex]) {
      resultHref += hrefMatch[partIndex];
    } else {
      resultHref += baseHrefMatch[partIndex];
    }
  }

  return resultHref;
}

},{}]},{},[13])(13)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY29udGVudC10eXBlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JmYzY1NzAvc3JjL1JvdXRlci5qcyIsIm5vZGVfbW9kdWxlcy9yZmM2NTcwL3NyYy9VcmlUZW1wbGF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZmM2NTcwL3NyYy9tYWluLmpzIiwic3JjL2NsaWVudC9oYWwtY2xpZW50LmpzIiwic3JjL2NsaWVudC9pbmRleC5qcyIsInNyYy9jbGllbnQvbGluay1oZWFkZXIuanMiLCJzcmMvY29uZmlndXJhdGlvbi9oYWwtY29uZmlndXJhdGlvbi5wcm92aWRlci5qcyIsInNyYy9jb25maWd1cmF0aW9uL2luZGV4LmpzIiwic3JjL2h0dHAtaW50ZXJjZXB0aW9uL2h0dHAtaW50ZXJjZXB0aW9uLmNvbmZpZy5qcyIsInNyYy9odHRwLWludGVyY2VwdGlvbi9pbmRleC5qcyIsInNyYy9odHRwLWludGVyY2VwdGlvbi9yZXNvdXJjZS1odHRwLWludGVyY2VwdG9yLmZhY3RvcnkuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvcmVzb3VyY2UvaGFsLXJlc291cmNlLWNsaWVudC5mYWN0b3J5LmpzIiwic3JjL3Jlc291cmNlL2luZGV4LmpzIiwic3JjL3Jlc291cmNlL3Jlc291cmNlLmZhY3RvcnkuanMiLCJzcmMvdXRpbGl0eS9kZWZpbmUtcmVhZC1vbmx5LmpzIiwic3JjL3V0aWxpdHkvZXh0ZW5kLXJlYWQtb25seS5qcyIsInNyYy91dGlsaXR5L2dlbmVyYXRlLXVybC5qcyIsInNyYy91dGlsaXR5L25vcm1hbGl6ZS1saW5rLmpzIiwic3JjL3V0aWxpdHkvcmVzb2x2ZS11cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ROQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0FBZDtBQUNELEtBRkQsTUFFTztBQUNMLG9CQUFjLGNBQWMsU0FBZCxDQUFkO0FBQ0Q7QUFDRjs7QUFFRCxTQUFPLFVBQVA7QUFDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiFcbiAqIGNvbnRlbnQtdHlwZVxuICogQ29weXJpZ2h0KGMpIDIwMTUgRG91Z2xhcyBDaHJpc3RvcGhlciBXaWxzb25cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qKlxuICogUmVnRXhwIHRvIG1hdGNoICooIFwiO1wiIHBhcmFtZXRlciApIGluIFJGQyA3MjMxIHNlYyAzLjEuMS4xXG4gKlxuICogcGFyYW1ldGVyICAgICA9IHRva2VuIFwiPVwiICggdG9rZW4gLyBxdW90ZWQtc3RyaW5nIClcbiAqIHRva2VuICAgICAgICAgPSAxKnRjaGFyXG4gKiB0Y2hhciAgICAgICAgID0gXCIhXCIgLyBcIiNcIiAvIFwiJFwiIC8gXCIlXCIgLyBcIiZcIiAvIFwiJ1wiIC8gXCIqXCJcbiAqICAgICAgICAgICAgICAgLyBcIitcIiAvIFwiLVwiIC8gXCIuXCIgLyBcIl5cIiAvIFwiX1wiIC8gXCJgXCIgLyBcInxcIiAvIFwiflwiXG4gKiAgICAgICAgICAgICAgIC8gRElHSVQgLyBBTFBIQVxuICogICAgICAgICAgICAgICA7IGFueSBWQ0hBUiwgZXhjZXB0IGRlbGltaXRlcnNcbiAqIHF1b3RlZC1zdHJpbmcgPSBEUVVPVEUgKiggcWR0ZXh0IC8gcXVvdGVkLXBhaXIgKSBEUVVPVEVcbiAqIHFkdGV4dCAgICAgICAgPSBIVEFCIC8gU1AgLyAleDIxIC8gJXgyMy01QiAvICV4NUQtN0UgLyBvYnMtdGV4dFxuICogb2JzLXRleHQgICAgICA9ICV4ODAtRkZcbiAqIHF1b3RlZC1wYWlyICAgPSBcIlxcXCIgKCBIVEFCIC8gU1AgLyBWQ0hBUiAvIG9icy10ZXh0IClcbiAqL1xudmFyIHBhcmFtUmVnRXhwID0gLzsgKihbISMkJSYnXFwqXFwrXFwtXFwuXFxeX2BcXHx+MC05QS1aYS16XSspICo9ICooXCIoPzpbXFx1MDAwYlxcdTAwMjBcXHUwMDIxXFx1MDAyMy1cXHUwMDViXFx1MDA1ZC1cXHUwMDdlXFx1MDA4MC1cXHUwMGZmXXxcXFxcW1xcdTAwMGJcXHUwMDIwLVxcdTAwZmZdKSpcInxbISMkJSYnXFwqXFwrXFwtXFwuXFxeX2BcXHx+MC05QS1aYS16XSspICovZ1xudmFyIHRleHRSZWdFeHAgPSAvXltcXHUwMDBiXFx1MDAyMC1cXHUwMDdlXFx1MDA4MC1cXHUwMGZmXSskL1xudmFyIHRva2VuUmVnRXhwID0gL15bISMkJSYnXFwqXFwrXFwtXFwuXFxeX2BcXHx+MC05QS1aYS16XSskL1xuXG4vKipcbiAqIFJlZ0V4cCB0byBtYXRjaCBxdW90ZWQtcGFpciBpbiBSRkMgNzIzMCBzZWMgMy4yLjZcbiAqXG4gKiBxdW90ZWQtcGFpciA9IFwiXFxcIiAoIEhUQUIgLyBTUCAvIFZDSEFSIC8gb2JzLXRleHQgKVxuICogb2JzLXRleHQgICAgPSAleDgwLUZGXG4gKi9cbnZhciBxZXNjUmVnRXhwID0gL1xcXFwoW1xcdTAwMGJcXHUwMDIwLVxcdTAwZmZdKS9nXG5cbi8qKlxuICogUmVnRXhwIHRvIG1hdGNoIGNoYXJzIHRoYXQgbXVzdCBiZSBxdW90ZWQtcGFpciBpbiBSRkMgNzIzMCBzZWMgMy4yLjZcbiAqL1xudmFyIHF1b3RlUmVnRXhwID0gLyhbXFxcXFwiXSkvZ1xuXG4vKipcbiAqIFJlZ0V4cCB0byBtYXRjaCB0eXBlIGluIFJGQyA2ODM4XG4gKlxuICogbWVkaWEtdHlwZSA9IHR5cGUgXCIvXCIgc3VidHlwZVxuICogdHlwZSAgICAgICA9IHRva2VuXG4gKiBzdWJ0eXBlICAgID0gdG9rZW5cbiAqL1xudmFyIHR5cGVSZWdFeHAgPSAvXlshIyQlJidcXCpcXCtcXC1cXC5cXF5fYFxcfH4wLTlBLVphLXpdK1xcL1shIyQlJidcXCpcXCtcXC1cXC5cXF5fYFxcfH4wLTlBLVphLXpdKyQvXG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKiBAcHVibGljXG4gKi9cblxuZXhwb3J0cy5mb3JtYXQgPSBmb3JtYXRcbmV4cG9ydHMucGFyc2UgPSBwYXJzZVxuXG4vKipcbiAqIEZvcm1hdCBvYmplY3QgdG8gbWVkaWEgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKiBAcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0KG9iaikge1xuICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FyZ3VtZW50IG9iaiBpcyByZXF1aXJlZCcpXG4gIH1cblxuICB2YXIgcGFyYW1ldGVycyA9IG9iai5wYXJhbWV0ZXJzXG4gIHZhciB0eXBlID0gb2JqLnR5cGVcblxuICBpZiAoIXR5cGUgfHwgIXR5cGVSZWdFeHAudGVzdCh0eXBlKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludmFsaWQgdHlwZScpXG4gIH1cblxuICB2YXIgc3RyaW5nID0gdHlwZVxuXG4gIC8vIGFwcGVuZCBwYXJhbWV0ZXJzXG4gIGlmIChwYXJhbWV0ZXJzICYmIHR5cGVvZiBwYXJhbWV0ZXJzID09PSAnb2JqZWN0Jykge1xuICAgIHZhciBwYXJhbVxuICAgIHZhciBwYXJhbXMgPSBPYmplY3Qua2V5cyhwYXJhbWV0ZXJzKS5zb3J0KClcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFyYW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBwYXJhbSA9IHBhcmFtc1tpXVxuXG4gICAgICBpZiAoIXRva2VuUmVnRXhwLnRlc3QocGFyYW0pKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludmFsaWQgcGFyYW1ldGVyIG5hbWUnKVxuICAgICAgfVxuXG4gICAgICBzdHJpbmcgKz0gJzsgJyArIHBhcmFtICsgJz0nICsgcXN0cmluZyhwYXJhbWV0ZXJzW3BhcmFtXSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RyaW5nXG59XG5cbi8qKlxuICogUGFyc2UgbWVkaWEgdHlwZSB0byBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSBzdHJpbmdcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZShzdHJpbmcpIHtcbiAgaWYgKCFzdHJpbmcpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBzdHJpbmcgaXMgcmVxdWlyZWQnKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBzdHJpbmcgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gc3VwcG9ydCByZXEvcmVzLWxpa2Ugb2JqZWN0cyBhcyBhcmd1bWVudFxuICAgIHN0cmluZyA9IGdldGNvbnRlbnR0eXBlKHN0cmluZylcblxuICAgIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY29udGVudC10eXBlIGhlYWRlciBpcyBtaXNzaW5nIGZyb20gb2JqZWN0Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYXJndW1lbnQgc3RyaW5nIGlzIHJlcXVpcmVkIHRvIGJlIGEgc3RyaW5nJylcbiAgfVxuXG4gIHZhciBpbmRleCA9IHN0cmluZy5pbmRleE9mKCc7JylcbiAgdmFyIHR5cGUgPSBpbmRleCAhPT0gLTFcbiAgICA/IHN0cmluZy5zdWJzdHIoMCwgaW5kZXgpLnRyaW0oKVxuICAgIDogc3RyaW5nLnRyaW0oKVxuXG4gIGlmICghdHlwZVJlZ0V4cC50ZXN0KHR5cGUpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaW52YWxpZCBtZWRpYSB0eXBlJylcbiAgfVxuXG4gIHZhciBrZXlcbiAgdmFyIG1hdGNoXG4gIHZhciBvYmogPSBuZXcgQ29udGVudFR5cGUodHlwZS50b0xvd2VyQ2FzZSgpKVxuICB2YXIgdmFsdWVcblxuICBwYXJhbVJlZ0V4cC5sYXN0SW5kZXggPSBpbmRleFxuXG4gIHdoaWxlIChtYXRjaCA9IHBhcmFtUmVnRXhwLmV4ZWMoc3RyaW5nKSkge1xuICAgIGlmIChtYXRjaC5pbmRleCAhPT0gaW5kZXgpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludmFsaWQgcGFyYW1ldGVyIGZvcm1hdCcpXG4gICAgfVxuXG4gICAgaW5kZXggKz0gbWF0Y2hbMF0ubGVuZ3RoXG4gICAga2V5ID0gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKVxuICAgIHZhbHVlID0gbWF0Y2hbMl1cblxuICAgIGlmICh2YWx1ZVswXSA9PT0gJ1wiJykge1xuICAgICAgLy8gcmVtb3ZlIHF1b3RlcyBhbmQgZXNjYXBlc1xuICAgICAgdmFsdWUgPSB2YWx1ZVxuICAgICAgICAuc3Vic3RyKDEsIHZhbHVlLmxlbmd0aCAtIDIpXG4gICAgICAgIC5yZXBsYWNlKHFlc2NSZWdFeHAsICckMScpXG4gICAgfVxuXG4gICAgb2JqLnBhcmFtZXRlcnNba2V5XSA9IHZhbHVlXG4gIH1cblxuICBpZiAoaW5kZXggIT09IC0xICYmIGluZGV4ICE9PSBzdHJpbmcubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaW52YWxpZCBwYXJhbWV0ZXIgZm9ybWF0JylcbiAgfVxuXG4gIHJldHVybiBvYmpcbn1cblxuLyoqXG4gKiBHZXQgY29udGVudC10eXBlIGZyb20gcmVxL3JlcyBvYmplY3RzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fVxuICogQHJldHVybiB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBnZXRjb250ZW50dHlwZShvYmopIHtcbiAgaWYgKHR5cGVvZiBvYmouZ2V0SGVhZGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gcmVzLWxpa2VcbiAgICByZXR1cm4gb2JqLmdldEhlYWRlcignY29udGVudC10eXBlJylcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb2JqLmhlYWRlcnMgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gcmVxLWxpa2VcbiAgICByZXR1cm4gb2JqLmhlYWRlcnMgJiYgb2JqLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddXG4gIH1cbn1cblxuLyoqXG4gKiBRdW90ZSBhIHN0cmluZyBpZiBuZWNlc3NhcnkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbFxuICogQHJldHVybiB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBxc3RyaW5nKHZhbCkge1xuICB2YXIgc3RyID0gU3RyaW5nKHZhbClcblxuICAvLyBubyBuZWVkIHRvIHF1b3RlIHRva2Vuc1xuICBpZiAodG9rZW5SZWdFeHAudGVzdChzdHIpKSB7XG4gICAgcmV0dXJuIHN0clxuICB9XG5cbiAgaWYgKHN0ci5sZW5ndGggPiAwICYmICF0ZXh0UmVnRXhwLnRlc3Qoc3RyKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludmFsaWQgcGFyYW1ldGVyIHZhbHVlJylcbiAgfVxuXG4gIHJldHVybiAnXCInICsgc3RyLnJlcGxhY2UocXVvdGVSZWdFeHAsICdcXFxcJDEnKSArICdcIidcbn1cblxuLyoqXG4gKiBDbGFzcyB0byByZXByZXNlbnQgYSBjb250ZW50IHR5cGUuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBDb250ZW50VHlwZSh0eXBlKSB7XG4gIHRoaXMucGFyYW1ldGVycyA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgdGhpcy50eXBlID0gdHlwZVxufVxuIiwiLyoganNoaW50IG5vZGU6dHJ1ZSAqL1xuXG52YXIgVXJpVGVtcGxhdGUgPSByZXF1aXJlKCcuL1VyaVRlbXBsYXRlJyk7XG5cbmZ1bmN0aW9uIFJvdXRlcigpIHtcbiAgICB2YXIgcm91dGVzID0gW107XG5cbiAgICB0aGlzLmFkZCA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSwgaGFuZGxlcikge1xuXG4gICAgICAgIHJvdXRlcy5wdXNoKHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiBuZXcgVXJpVGVtcGxhdGUodGVtcGxhdGUpLFxuICAgICAgICAgICAgaGFuZGxlcjogaGFuZGxlclxuICAgICAgICB9KTsgLy9cblxuICAgIH07IC8vYWRkXG5cbiAgICB0aGlzLmhhbmRsZSA9IGZ1bmN0aW9uICh1cmwpIHtcblxuICAgICAgICByZXR1cm4gcm91dGVzLnNvbWUoZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHJvdXRlLnRlbXBsYXRlLnBhcnNlKHVybCk7XG4gICAgICAgICAgICByZXR1cm4gZGF0YSAmJiByb3V0ZS5oYW5kbGVyKGRhdGEpICE9PSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICB9OyAvL2V4ZWNcblxufSAvL1JvdXRlclxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvdXRlcjsiLCIvKiBqc2hpbnQgbm9kZTp0cnVlICovXG5cbm1vZHVsZS5leHBvcnRzID0gVXJpVGVtcGxhdGU7XG5cblxudmFyIG9wZXJhdG9yT3B0aW9ucyA9IHtcbiAgICBcIlwiOiB7XG4gICAgICAgIFwicHJlZml4XCI6IFwiXCIsXG4gICAgICAgIFwic2VwZXJhdG9yXCI6IFwiLFwiLFxuICAgICAgICBcImFzc2lnbm1lbnRcIjogZmFsc2UsXG4gICAgICAgIFwiYXNzaWduRW1wdHlcIjogZmFsc2UsXG4gICAgICAgIFwiZW5jb2RlXCI6IHBlcmNlbnRFbmNvZGVcbiAgICB9LFxuICAgIFwiK1wiOiB7XG4gICAgICAgIFwicHJlZml4XCI6IFwiXCIsXG4gICAgICAgIFwic2VwZXJhdG9yXCI6IFwiLFwiLFxuICAgICAgICBcImFzc2lnbm1lbnRcIjogZmFsc2UsXG4gICAgICAgIFwiYXNzaWduRW1wdHlcIjogZmFsc2UsXG4gICAgICAgIFwiZW5jb2RlXCI6IGVuY29kZVVSSVxuICAgIH0sXG4gICAgXCIjXCI6IHtcbiAgICAgICAgXCJwcmVmaXhcIjogXCIjXCIsXG4gICAgICAgIFwic2VwZXJhdG9yXCI6IFwiLFwiLFxuICAgICAgICBcImFzc2lnbm1lbnRcIjogZmFsc2UsXG4gICAgICAgIFwiYXNzaWduRW1wdHlcIjogZmFsc2UsXG4gICAgICAgIFwiZW5jb2RlXCI6IGVuY29kZVVSSVxuICAgIH0sXG4gICAgXCIuXCI6IHtcbiAgICAgICAgXCJwcmVmaXhcIjogXCIuXCIsXG4gICAgICAgIFwic2VwZXJhdG9yXCI6IFwiLlwiLFxuICAgICAgICBcImFzc2lnbm1lbnRcIjogZmFsc2UsXG4gICAgICAgIFwiYXNzaWduRW1wdHlcIjogZmFsc2UsXG4gICAgICAgIFwiZW5jb2RlXCI6IHBlcmNlbnRFbmNvZGVcbiAgICB9LFxuICAgIFwiL1wiOiB7XG4gICAgICAgIFwicHJlZml4XCI6IFwiL1wiLFxuICAgICAgICBcInNlcGVyYXRvclwiOiBcIi9cIixcbiAgICAgICAgXCJhc3NpZ25tZW50XCI6IGZhbHNlLFxuICAgICAgICBcImVuY29kZVwiOiBlbmNvZGVVUklDb21wb25lbnRcbiAgICB9LFxuICAgIFwiO1wiOiB7XG4gICAgICAgIFwicHJlZml4XCI6IFwiO1wiLFxuICAgICAgICBcInNlcGVyYXRvclwiOiBcIjtcIixcbiAgICAgICAgXCJhc3NpZ25tZW50XCI6IHRydWUsXG4gICAgICAgIFwiYXNzaWduRW1wdHlcIjogZmFsc2UsXG4gICAgICAgIFwiZW5jb2RlXCI6IGVuY29kZVVSSUNvbXBvbmVudFxuICAgIH0sXG4gICAgXCI/XCI6IHtcbiAgICAgICAgXCJwcmVmaXhcIjogXCI/XCIsXG4gICAgICAgIFwic2VwZXJhdG9yXCI6IFwiJlwiLFxuICAgICAgICBcImFzc2lnbm1lbnRcIjogdHJ1ZSxcbiAgICAgICAgXCJhc3NpZ25FbXB0eVwiOiB0cnVlLFxuICAgICAgICBcImVuY29kZVwiOiBlbmNvZGVVUklDb21wb25lbnRcbiAgICB9LFxuICAgIFwiJlwiOiB7XG4gICAgICAgIFwicHJlZml4XCI6IFwiJlwiLFxuICAgICAgICBcInNlcGVyYXRvclwiOiBcIiZcIixcbiAgICAgICAgXCJhc3NpZ25tZW50XCI6IHRydWUsXG4gICAgICAgIFwiYXNzaWduRW1wdHlcIjogdHJ1ZSxcbiAgICAgICAgXCJlbmNvZGVcIjogZW5jb2RlVVJJQ29tcG9uZW50XG4gICAgfVxufTsgLy9vcGVyYXRvck9wdGlvbnNcblxuZnVuY3Rpb24gcGVyY2VudEVuY29kZSh2YWx1ZSkge1xuICAgIC8qXG5cdGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0yLjNcblx0Ki9cbiAgICB2YXIgdW5yZXNlcnZlZCA9IFwiLS5fflwiO1xuXG4gICAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSkgcmV0dXJuICcnO1xuXG4gICAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuXG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbCh2YWx1ZSwgZnVuY3Rpb24gKGNoKSB7XG4gICAgICAgIHZhciBjaGFyQ29kZSA9IGNoLmNoYXJDb2RlQXQoMCk7XG5cbiAgICAgICAgaWYgKGNoYXJDb2RlID49IDB4MzAgJiYgY2hhckNvZGUgPD0gMHgzOSkgcmV0dXJuIGNoO1xuICAgICAgICBpZiAoY2hhckNvZGUgPj0gMHg0MSAmJiBjaGFyQ29kZSA8PSAweDVhKSByZXR1cm4gY2g7XG4gICAgICAgIGlmIChjaGFyQ29kZSA+PSAweDYxICYmIGNoYXJDb2RlIDw9IDB4N2EpIHJldHVybiBjaDtcblxuICAgICAgICBpZiAofnVucmVzZXJ2ZWQuaW5kZXhPZihjaCkpIHJldHVybiBjaDtcblxuICAgICAgICByZXR1cm4gJyUnICsgY2hhckNvZGUudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG4gICAgfSkuam9pbignJyk7XG5cbn0gLy9wZXJjZW50RW5jb2RlXG5cbmZ1bmN0aW9uIGlzRGVmaW5lZCh2YWx1ZSkge1xuICAgIHJldHVybiAhaXNVbmRlZmluZWQodmFsdWUpO1xufSAvL2lzRGVmaW5lZFxuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsdWUpIHtcbiAgICAvKlxuXHRodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NTcwI3NlY3Rpb24tMi4zXG5cdCovXG4gICAgaWYgKHZhbHVlID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRydWU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn0gLy9pc1VuZGVmaW5lZFxuXG5cbmZ1bmN0aW9uIFVyaVRlbXBsYXRlKHRlbXBsYXRlKSB7XG4gICAgLypcblx0aHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjU3MCNzZWN0aW9uLTIuMlxuXG5cdGV4cHJlc3Npb24gICAgPSAgXCJ7XCIgWyBvcGVyYXRvciBdIHZhcmlhYmxlLWxpc3QgXCJ9XCJcblx0b3BlcmF0b3IgICAgICA9ICBvcC1sZXZlbDIgLyBvcC1sZXZlbDMgLyBvcC1yZXNlcnZlXG5cdG9wLWxldmVsMiAgICAgPSAgXCIrXCIgLyBcIiNcIlxuXHRvcC1sZXZlbDMgICAgID0gIFwiLlwiIC8gXCIvXCIgLyBcIjtcIiAvIFwiP1wiIC8gXCImXCJcblx0b3AtcmVzZXJ2ZSAgICA9ICBcIj1cIiAvIFwiLFwiIC8gXCIhXCIgLyBcIkBcIiAvIFwifFwiXG5cdCovXG4gICAgdmFyIHJlVGVtcGxhdGUgPSAvXFx7KFtcXCsjXFwuXFwvO1xcPyY9XFwsIUBcXHxdPykoW0EtWmEtejAtOV9cXCxcXC5cXDpcXCpdKz8pXFx9L2c7XG4gICAgdmFyIHJlVmFyaWFibGUgPSAvXihbXFwkX2Etel1bXFwkX2EtejAtOV0qKSgoPzpcXDpbMS05XVswLTldP1swLTldP1swLTldPyk/KShcXCo/KSQvaTtcbiAgICB2YXIgbWF0Y2g7XG4gICAgdmFyIHBpZWNlcyA9IFtdO1xuICAgIHZhciBnbHVlcyA9IFtdO1xuICAgIHZhciBvZmZzZXQgPSAwO1xuICAgIHZhciBwaWVjZUNvdW50ID0gMDtcblxuICAgIHdoaWxlICggISEgKG1hdGNoID0gcmVUZW1wbGF0ZS5leGVjKHRlbXBsYXRlKSkpIHtcbiAgICAgICAgZ2x1ZXMucHVzaCh0ZW1wbGF0ZS5zdWJzdHJpbmcob2Zmc2V0LCBtYXRjaC5pbmRleCkpO1xuICAgICAgICAvKlxuXHRcdFRoZSBvcGVyYXRvciBjaGFyYWN0ZXJzIGVxdWFscyAoXCI9XCIpLCBjb21tYSAoXCIsXCIpLCBleGNsYW1hdGlvbiAoXCIhXCIpLFxuXHRcdGF0IHNpZ24gKFwiQFwiKSwgYW5kIHBpcGUgKFwifFwiKSBhcmUgcmVzZXJ2ZWQgZm9yIGZ1dHVyZSBleHRlbnNpb25zLlxuXHRcdCovXG4gICAgICAgIGlmIChtYXRjaFsxXSAmJiB+Jz0sIUB8Jy5pbmRleE9mKG1hdGNoWzFdKSkge1xuICAgICAgICAgICAgdGhyb3cgXCJvcGVyYXRvciAnXCIgKyBtYXRjaFsxXSArIFwiJyBpcyByZXNlcnZlZCBmb3IgZnV0dXJlIGV4dGVuc2lvbnNcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIG9mZnNldCA9IG1hdGNoLmluZGV4O1xuICAgICAgICBwaWVjZXMucHVzaCh7XG4gICAgICAgICAgICBvcGVyYXRvcjogbWF0Y2hbMV0sXG4gICAgICAgICAgICB2YXJpYWJsZXM6IG1hdGNoWzJdLnNwbGl0KCcsJykubWFwKHZhcmlhYmxlTWFwcGVyKVxuICAgICAgICB9KTtcbiAgICAgICAgb2Zmc2V0ICs9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgcGllY2VDb3VudCsrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhcmlhYmxlTWFwcGVyKHZhcmlhYmxlKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IHJlVmFyaWFibGUuZXhlYyh2YXJpYWJsZSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiBtYXRjaFsxXSxcbiAgICAgICAgICAgIG1heExlbmd0aDogbWF0Y2hbMl0gJiYgcGFyc2VJbnQobWF0Y2hbMl0uc3Vic3RyaW5nKDEpLCAxMCksXG4gICAgICAgICAgICBjb21wb3NpdGU6ICEhIG1hdGNoWzNdXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2x1ZXMucHVzaCh0ZW1wbGF0ZS5zdWJzdHJpbmcob2Zmc2V0KSk7XG5cbiAgICB0aGlzLnBhcnNlID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICB2YXIgZGF0YSA9IHt9O1xuICAgICAgICB2YXIgb2Zmc2V0ID0gMDtcbiAgICAgICAgdmFyIG9mZnNldHMgPSBbXTtcblxuICAgICAgICBpZiAoIWdsdWVzLmV2ZXJ5KGZ1bmN0aW9uIChnbHVlLCBnbHVlSW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBpbmRleDtcbiAgICAgICAgICAgIGlmIChnbHVlSW5kZXggPiAwICYmIGdsdWUgPT09ICcnKSBpbmRleCA9IHN0ci5sZW5ndGg7XG4gICAgICAgICAgICBlbHNlIGluZGV4ID0gc3RyLmluZGV4T2YoZ2x1ZSwgb2Zmc2V0KTtcblxuICAgICAgICAgICAgb2Zmc2V0ID0gaW5kZXg7XG4gICAgICAgICAgICBvZmZzZXRzLnB1c2gob2Zmc2V0KTtcbiAgICAgICAgICAgIG9mZnNldCArPSBnbHVlLmxlbmd0aDtcblxuICAgICAgICAgICAgcmV0dXJufiBpbmRleDtcbiAgICAgICAgfSkpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZiAoIXBpZWNlcy5ldmVyeShmdW5jdGlvbiAocGllY2UsIHBpZWNlSW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gb3BlcmF0b3JPcHRpb25zW3BpZWNlLm9wZXJhdG9yXTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSwgdmFsdWVzO1xuICAgICAgICAgICAgdmFyIG9mZnNldEJlZ2luID0gb2Zmc2V0c1twaWVjZUluZGV4XSArIGdsdWVzW3BpZWNlSW5kZXhdLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBvZmZzZXRFbmQgPSBvZmZzZXRzW3BpZWNlSW5kZXggKyAxXTtcblxuICAgICAgICAgICAgdmFsdWUgPSBzdHIuc3Vic3RyaW5nKG9mZnNldEJlZ2luLCBvZmZzZXRFbmQpO1xuICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBpZiAodmFsdWUuc3Vic3RyaW5nKDAsIG9wdGlvbnMucHJlZml4Lmxlbmd0aCkgIT09IG9wdGlvbnMucHJlZml4KSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cmluZyhvcHRpb25zLnByZWZpeC5sZW5ndGgpO1xuICAgICAgICAgICAgdmFsdWVzID0gdmFsdWUuc3BsaXQob3B0aW9ucy5zZXBlcmF0b3IpO1xuXG4gICAgICAgICAgICBpZiAoIXBpZWNlLnZhcmlhYmxlcy5ldmVyeShmdW5jdGlvbiAodmFyaWFibGUsIHZhcmlhYmxlSW5kZXgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB2YWx1ZXNbdmFyaWFibGVJbmRleF07XG4gICAgICAgICAgICAgICAgdmFyIG5hbWU7XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgICAgICAgICBuYW1lID0gdmFyaWFibGUubmFtZTtcblxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmFzc2lnbm1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLnN1YnN0cmluZygwLCBuYW1lLmxlbmd0aCkgIT09IG5hbWUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHJpbmcobmFtZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwICYmIG9wdGlvbnMuYXNzaWduRW1wdHkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZVswXSAhPT0gJz0nKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgZGF0YVtuYW1lXSA9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9KSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICB9KSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07IC8vcGFyc2VcblxuICAgIHRoaXMuc3RyaW5naWZ5ID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIHN0ciA9ICcnO1xuICAgICAgICBkYXRhID0gZGF0YSB8fCB7fTtcblxuICAgICAgICBzdHIgKz0gZ2x1ZXNbMF07XG4gICAgICAgIGlmICghcGllY2VzLmV2ZXJ5KGZ1bmN0aW9uIChwaWVjZSwgcGllY2VJbmRleCkge1xuXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG9wZXJhdG9yT3B0aW9uc1twaWVjZS5vcGVyYXRvcl07XG4gICAgICAgICAgICB2YXIgcGFydHM7XG5cbiAgICAgICAgICAgIHBhcnRzID0gcGllY2UudmFyaWFibGVzLm1hcChmdW5jdGlvbiAodmFyaWFibGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBkYXRhW3ZhcmlhYmxlLm5hbWVdO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkgdmFsdWUgPSBbdmFsdWVdO1xuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5maWx0ZXIoaXNEZWZpbmVkKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhcmlhYmxlLmNvbXBvc2l0ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLm1hcChmdW5jdGlvbiAodmFsdWUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gT2JqZWN0LmtleXModmFsdWUpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrZXlWYWx1ZSA9IHZhbHVlW2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYWJsZS5tYXhMZW5ndGgpIGtleVZhbHVlID0ga2V5VmFsdWUuc3Vic3RyaW5nKDAsIHZhcmlhYmxlLm1heExlbmd0aCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5VmFsdWUgPSBvcHRpb25zLmVuY29kZShrZXlWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleVZhbHVlKSBrZXlWYWx1ZSA9IGtleSArICc9JyArIGtleVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleVZhbHVlID0ga2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuYXNzaWduRW1wdHkpIGtleVZhbHVlICs9ICc9JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXlWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5qb2luKG9wdGlvbnMuc2VwZXJhdG9yKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFyaWFibGUubWF4TGVuZ3RoKSB2YWx1ZSA9IHZhbHVlLnN1YnN0cmluZygwLCB2YXJpYWJsZS5tYXhMZW5ndGgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBvcHRpb25zLmVuY29kZSh2YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5hc3NpZ25tZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkgdmFsdWUgPSB2YXJpYWJsZS5uYW1lICsgJz0nICsgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YXJpYWJsZS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuYXNzaWduRW1wdHkpIHZhbHVlICs9ICc9JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmpvaW4ob3B0aW9ucy5zZXBlcmF0b3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUubWFwKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModmFsdWUpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrZXlWYWx1ZSA9IHZhbHVlW2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYWJsZS5tYXhMZW5ndGgpIGtleVZhbHVlID0ga2V5VmFsdWUuc3Vic3RyaW5nKDAsIHZhcmlhYmxlLm1heExlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXkgKyAnLCcgKyBvcHRpb25zLmVuY29kZShrZXlWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuam9pbignLCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFyaWFibGUubWF4TGVuZ3RoKSB2YWx1ZSA9IHZhbHVlLnN1YnN0cmluZygwLCB2YXJpYWJsZS5tYXhMZW5ndGgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZW5jb2RlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5qb2luKCcsJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuYXNzaWdubWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB2YWx1ZSA9IHZhcmlhYmxlLm5hbWUgKyAnPScgKyB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFyaWFibGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5hc3NpZ25FbXB0eSkgdmFsdWUgKz0gJz0nO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcGFydHMgPSBwYXJ0cy5maWx0ZXIoaXNEZWZpbmVkKTtcbiAgICAgICAgICAgIGlmIChpc0RlZmluZWQocGFydHMpKSB7XG4gICAgICAgICAgICAgICAgc3RyICs9IG9wdGlvbnMucHJlZml4O1xuICAgICAgICAgICAgICAgIHN0ciArPSBwYXJ0cy5qb2luKG9wdGlvbnMuc2VwZXJhdG9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3RyICs9IGdsdWVzW3BpZWNlSW5kZXggKyAxXTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfTsgLy9zdHJpbmdpZnlcblxufSAvL1VyaVRlbXBsYXRlIiwiLyoganNoaW50IG5vZGU6dHJ1ZSAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBSb3V0ZXI6IHJlcXVpcmUoJy4vUm91dGVyJyksXG4gICAgVXJpVGVtcGxhdGU6IHJlcXVpcmUoJy4vVXJpVGVtcGxhdGUnKVxufTsiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVGhlIGhhbENsaWVudCBzZXJ2aWNlIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgJGh0dHAgZGlyZWN0bHkgaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFsQ2xpZW50IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7TG9nfSAgICAgICRsb2dcbiAgICogQHBhcmFtIHtIdHRwfSAgICAgJGh0dHBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gTGlua0hlYWRlclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAkaGFsQ29uZmlndXJhdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IoJGxvZywgJGh0dHAsIExpbmtIZWFkZXIsICRoYWxDb25maWd1cmF0aW9uKSB7XG4gICAgdGhpcy5fJGxvZyA9ICRsb2c7XG4gICAgdGhpcy5fJGh0dHAgPSAkaHR0cDtcbiAgICB0aGlzLl8kaGFsQ29uZmlndXJhdGlvbiA9ICRoYWxDb25maWd1cmF0aW9uO1xuICAgIHRoaXMuTGlua0hlYWRlciA9IExpbmtIZWFkZXI7XG4gIH1cbiAgJGdldChocmVmLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuJHJlcXVlc3QoJ0dFVCcsIGhyZWYsIG9wdGlvbnMpO1xuICB9XG4gICRwb3N0KGhyZWYsIG9wdGlvbnMsIGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy4kcmVxdWVzdCgnUE9TVCcsIGhyZWYsIG9wdGlvbnMsIGRhdGEpO1xuICB9XG4gICRwdXQoaHJlZiwgb3B0aW9ucywgZGF0YSkge1xuICAgIHJldHVybiB0aGlzLiRyZXF1ZXN0KCdQVVQnLCBocmVmLCBvcHRpb25zLCBkYXRhKTtcbiAgfVxuICAkcGF0Y2goaHJlZiwgb3B0aW9ucywgZGF0YSkge1xuICAgIHJldHVybiB0aGlzLiRyZXF1ZXN0KCdQQVRDSCcsIGhyZWYsIG9wdGlvbnMsIGRhdGEpO1xuICB9XG4gICRkZWxldGUoaHJlZiwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLiRyZXF1ZXN0KCdERUxFVEUnLCBocmVmLCBvcHRpb25zKTtcbiAgfVxuICAkbGluayhocmVmLCBvcHRpb25zLCBsaW5rSGVhZGVycykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCB7fTtcbiAgICBvcHRpb25zLmhlYWRlcnMuTGluayA9IGxpbmtIZWFkZXJzLm1hcChmdW5jdGlvbihsaW5rKSB7IHJldHVybiBsaW5rLnRvU3RyaW5nKCk7IH0pO1xuICAgIHJldHVybiB0aGlzLiRyZXF1ZXN0KCdMSU5LJywgaHJlZiwgb3B0aW9ucyk7XG4gIH1cbiAgJHVubGluayhocmVmLCBvcHRpb25zLCBsaW5rSGVhZGVycykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCB7fTtcbiAgICBvcHRpb25zLmhlYWRlcnMuTGluayA9IGxpbmtIZWFkZXJzLm1hcChmdW5jdGlvbihsaW5rKSB7IHJldHVybiBsaW5rLnRvU3RyaW5nKCk7IH0pO1xuICAgIHJldHVybiB0aGlzLiRyZXF1ZXN0KCdVTkxJTksnLCBocmVmLCBvcHRpb25zKTtcbiAgfVxuICAkcmVxdWVzdChtZXRob2QsIGhyZWYsIG9wdGlvbnMsIGRhdGEpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLl8kbG9nLmxvZygnVGhlIGhhbENsaWVudCBzZXJ2aWNlIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgJGh0dHAgZGlyZWN0bHkgaW5zdGVhZC4nKTtcbiAgICByZXR1cm4gdGhpcy5fJGh0dHAoYW5ndWxhci5leHRlbmQoe30sIG9wdGlvbnMsIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB0aGlzLl8kaGFsQ29uZmlndXJhdGlvbi51cmxUcmFuc2Zvcm1lcihocmVmKSxcbiAgICAgIGRhdGE6IGRhdGEsXG4gICAgfSkpO1xuICB9XG59XG5cbi8vIEluamVjdCBEZXBlbmRlbmNpZXNcbkhhbENsaWVudC4kaW5qZWN0ID0gW1xuICAnJGxvZycsXG4gICckaHR0cCcsXG4gICdMaW5rSGVhZGVyJyxcbiAgJyRoYWxDb25maWd1cmF0aW9uJyxcbl07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IE1PRFVMRV9OQU1FID0gJ2FuZ3VsYXItaGFsLmNsaWVudCc7XG5cbmltcG9ydCBIYWxDbGllbnQgZnJvbSAnLi9oYWwtY2xpZW50JztcbmltcG9ydCBMaW5rSGVhZGVyIGZyb20gJy4vbGluay1oZWFkZXInO1xuXG4vLyBBZGQgbW9kdWxlIGZvciBjbGllbnRcbmFuZ3VsYXJcbiAgLm1vZHVsZShNT0RVTEVfTkFNRSwgW10pXG5cbiAgLnNlcnZpY2UoJ2hhbENsaWVudCcsIEhhbENsaWVudClcbiAgLnNlcnZpY2UoJyRoYWxDbGllbnQnLCBIYWxDbGllbnQpXG5cbiAgLnZhbHVlKCdMaW5rSGVhZGVyJywgTGlua0hlYWRlcilcbjtcblxuZXhwb3J0IGRlZmF1bHQgTU9EVUxFX05BTUU7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTGluayBIZWFkZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlua0hlYWRlciB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXJpUmVmZXJlbmNlIFRoZSBMaW5rIFZhbHVlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBsaW5rUGFyYW1zICAgVGhlIExpbmsgUGFyYW1zXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih1cmlSZWZlcmVuY2UsIGxpbmtQYXJhbXMpIHtcbiAgICB0aGlzLnVyaVJlZmVyZW5jZSA9IHVyaVJlZmVyZW5jZTtcbiAgICB0aGlzLmxpbmtQYXJhbXMgPSBhbmd1bGFyLmV4dGVuZChcbiAgICAgIHtcbiAgICAgICAgcmVsOiBudWxsLFxuICAgICAgICBhbmNob3I6IG51bGwsXG4gICAgICAgIHJldjogbnVsbCxcbiAgICAgICAgaHJlZmxhbmc6IG51bGwsXG4gICAgICAgIG1lZGlhOiBudWxsLFxuICAgICAgICB0aXRsZTogbnVsbCxcbiAgICAgICAgdHlwZTogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsaW5rUGFyYW1zXG4gICAgKTtcbiAgfVxuICAvKipcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cbiAgdG9TdHJpbmcoKSB7XG4gICAgdmFyIHJlc3VsdCA9ICc8JyArIHRoaXMudXJpUmVmZXJlbmNlICsgJz4nXG4gICAgICAsIHBhcmFtcyA9IFtdO1xuXG4gICAgZm9yKGxldCBwYXJhbU5hbWUgaW4gdGhpcy5saW5rUGFyYW1zKSB7XG4gICAgICBsZXQgcGFyYW1WYWx1ZSA9IHRoaXMubGlua1BhcmFtc1twYXJhbU5hbWVdO1xuICAgICAgaWYocGFyYW1WYWx1ZSkge1xuICAgICAgICBwYXJhbXMucHVzaChwYXJhbU5hbWUgKyAnPVwiJyArIHBhcmFtVmFsdWUgKyAnXCInKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihwYXJhbXMubGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICByZXN1bHQgPSByZXN1bHQgKyAnOycgKyBwYXJhbXMuam9pbignOycpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gbm9vcFVybFRyYW5zZm9ybWVyKHVybCkge1xuICByZXR1cm4gdXJsO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYWxDb25maWd1cmF0aW9uUHJvdmlkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9saW5rc0F0dHJpYnV0ZSA9ICdfbGlua3MnO1xuICAgIHRoaXMuX2VtYmVkZGVkQXR0cmlidXRlID0gJ19lbWJlZGRlZCc7XG4gICAgdGhpcy5faWdub3JlQXR0cmlidXRlUHJlZml4ZXMgPSBbXG4gICAgICAnXycsXG4gICAgICAnJCcsXG4gICAgXTtcbiAgICB0aGlzLl9zZWxmTGluayA9ICdzZWxmJztcbiAgICB0aGlzLl9mb3JjZUpTT05SZXNvdXJjZSA9IGZhbHNlO1xuICAgIHRoaXMuX3VybFRyYW5zZm9ybWVyID0gbm9vcFVybFRyYW5zZm9ybWVyO1xuXG4gICAgdGhpcy4kZ2V0LiRpbmplY3QgPSBbXG4gICAgICAnJGxvZycsXG4gICAgXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbGlua3NBdHRyaWJ1dGVcbiAgICovXG4gIHNldExpbmtzQXR0cmlidXRlKGxpbmtzQXR0cmlidXRlKSB7XG4gICAgdGhpcy5fbGlua3NBdHRyaWJ1dGUgPSBsaW5rc0F0dHJpYnV0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZW1iZWRkZWRBdHRyaWJ1dGVcbiAgICovXG4gIHNldEVtYmVkZGVkQXR0cmlidXRlKGVtYmVkZGVkQXR0cmlidXRlKSB7XG4gICAgdGhpcy5fZW1iZWRkZWRBdHRyaWJ1dGUgPSBlbWJlZGRlZEF0dHJpYnV0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBpZ25vcmVBdHRyaWJ1dGVQcmVmaXhlc1xuICAgKi9cbiAgc2V0SWdub3JlQXR0cmlidXRlUHJlZml4ZXMoaWdub3JlQXR0cmlidXRlUHJlZml4ZXMpIHtcbiAgICB0aGlzLl9pZ25vcmVBdHRyaWJ1dGVQcmVmaXhlcyA9IGlnbm9yZUF0dHJpYnV0ZVByZWZpeGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpZ25vcmVBdHRyaWJ1dGVQcmVmaXhcbiAgICovXG4gIGFkZElnbm9yZUF0dHJpYnV0ZVByZWZpeChpZ25vcmVBdHRyaWJ1dGVQcmVmaXgpIHtcbiAgICB0aGlzLl9pZ25vcmVBdHRyaWJ1dGVQcmVmaXhlcy5wdXNoKGlnbm9yZUF0dHJpYnV0ZVByZWZpeCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtTdHJpbmd9IHNlbGZMaW5rXG4gICAqL1xuICBzZXRTZWxmTGluayhzZWxmTGluaykge1xuICAgIHRoaXMuX3NlbGZMaW5rID0gc2VsZkxpbms7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtCb29sZWFufSBmb3JjZUpTT05SZXNvdXJjZVxuICAgKi9cbiAgc2V0Rm9yY2VKU09OUmVzb3VyY2UoZm9yY2VKU09OUmVzb3VyY2UpIHtcbiAgICB0aGlzLl9mb3JjZUpTT05SZXNvdXJjZSA9IGZvcmNlSlNPTlJlc291cmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHVybFRyYW5zZm9ybWVyXG4gICAqIEBkZXByZWNhdGVkICRoYWxDb25maWd1cmF0aW9uUHJvdmlkZXIuc2V0VXJsVHJhbnNmb3JtZXIgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHdyaXRlIGEgaHR0cCBpbnRlcmNlcHRvciBpbnN0ZWFkLlxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5hbmd1bGFyanMub3JnL2FwaS9uZy9zZXJ2aWNlLyRodHRwI2ludGVyY2VwdG9yc1xuICAgKi9cbiAgc2V0VXJsVHJhbnNmb3JtZXIodXJsVHJhbnNmb3JtZXIpIHtcbiAgICB0aGlzLl91cmxUcmFuc2Zvcm1lciA9IHVybFRyYW5zZm9ybWVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBDb25maWd1cmF0aW9uXG4gICAqIEBwYXJhbSAge0xvZ30gJGxvZyBsb2dnZXJcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgJGdldCgkbG9nKSB7XG4gICAgaWYodGhpcy5fdXJsVHJhbnNmb3JtZXIgIT09IG5vb3BVcmxUcmFuc2Zvcm1lcikge1xuICAgICAgJGxvZy5sb2coJyRoYWxDb25maWd1cmF0aW9uUHJvdmlkZXIuc2V0VXJsVHJhbnNmb3JtZXIgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHdyaXRlIGEgaHR0cCBpbnRlcmNlcHRvciBpbnN0ZWFkLicpO1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcbiAgICAgIGxpbmtzQXR0cmlidXRlOiB0aGlzLl9saW5rc0F0dHJpYnV0ZSxcbiAgICAgIGVtYmVkZGVkQXR0cmlidXRlOiB0aGlzLl9lbWJlZGRlZEF0dHJpYnV0ZSxcbiAgICAgIGlnbm9yZUF0dHJpYnV0ZVByZWZpeGVzOiB0aGlzLl9pZ25vcmVBdHRyaWJ1dGVQcmVmaXhlcyxcbiAgICAgIHNlbGZMaW5rOiB0aGlzLl9zZWxmTGluayxcbiAgICAgIGZvcmNlSlNPTlJlc291cmNlOiB0aGlzLl9mb3JjZUpTT05SZXNvdXJjZSxcbiAgICAgIHVybFRyYW5zZm9ybWVyOiB0aGlzLl91cmxUcmFuc2Zvcm1lcixcbiAgICB9KTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBNT0RVTEVfTkFNRSA9ICdhbmd1bGFyLWhhbC5jb25maWd1cmF0aW9uJztcblxuXG5cbmltcG9ydCBIYWxDb25maWd1cmF0aW9uUHJvdmlkZXIgZnJvbSAnLi9oYWwtY29uZmlndXJhdGlvbi5wcm92aWRlcic7XG5cbi8vIEFkZCBtb2R1bGUgZm9yIGNvbmZpZ3VyYXRpb25cbmFuZ3VsYXJcbiAgLm1vZHVsZShNT0RVTEVfTkFNRSwgW10pXG5cbiAgLnByb3ZpZGVyKCckaGFsQ29uZmlndXJhdGlvbicsIEhhbENvbmZpZ3VyYXRpb25Qcm92aWRlcilcbjtcblxuZXhwb3J0IGRlZmF1bHQgTU9EVUxFX05BTUU7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZXNvdXJjZUh0dHBJbnRlcmNlcHRvckZhY3RvcnkgZnJvbSAnLi9yZXNvdXJjZS1odHRwLWludGVyY2VwdG9yLmZhY3RvcnknO1xuXG4vKipcbiAqIEBwYXJhbSB7SHR0cFByb3ZpZGVyfSAkaHR0cFByb3ZpZGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEh0dHBJbnRlcmNlcHRvckNvbmZpZ3VyYXRpb24oJGh0dHBQcm92aWRlcikge1xuICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKFJlc291cmNlSHR0cEludGVyY2VwdG9yRmFjdG9yeSk7XG59XG5cbkh0dHBJbnRlcmNlcHRvckNvbmZpZ3VyYXRpb24uJGluamVjdCA9IFtcbiAgJyRodHRwUHJvdmlkZXInLFxuXTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgTU9EVUxFX05BTUUgPSAnYW5ndWxhci1oYWwuaHR0cC1pbnRlcmNlcHRpb24nO1xuXG5pbXBvcnQgcmVzb3VyY2UgZnJvbSAnLi4vcmVzb3VyY2UvaW5kZXgnO1xuaW1wb3J0IGNvbmZpZ3VyYXRpb24gZnJvbSAnLi4vY29uZmlndXJhdGlvbi9pbmRleCc7XG5cbmltcG9ydCBIdHRwSW50ZXJjZXB0b3JDb25maWd1cmF0aW9uIGZyb20gJy4vaHR0cC1pbnRlcmNlcHRpb24uY29uZmlnJztcblxuLy8gQWRkIG1vZHVsZSBmb3IgaHR0cCBpbnRlcmNlcHRpb25cbmFuZ3VsYXJcbiAgLm1vZHVsZShNT0RVTEVfTkFNRSwgW1xuICAgIHJlc291cmNlLFxuICAgIGNvbmZpZ3VyYXRpb24sXG4gIF0pXG5cbiAgLmNvbmZpZyhIdHRwSW50ZXJjZXB0b3JDb25maWd1cmF0aW9uKVxuO1xuXG5leHBvcnQgZGVmYXVsdCBNT0RVTEVfTkFNRTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgQ09OVEVOVF9UWVBFID0gJ2FwcGxpY2F0aW9uL2hhbCtqc29uJztcblxuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdjb250ZW50LXR5cGUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZXNvdXJjZUh0dHBJbnRlcmNlcHRvckZhY3RvcnkoJGhhbENvbmZpZ3VyYXRpb24sIFJlc291cmNlKSB7XG4gIHJldHVybiB7XG4gICAgcmVxdWVzdDogdHJhbnNmb3JtUmVxdWVzdCxcbiAgICByZXNwb25zZTogdHJhbnNmb3JtUmVzcG9uc2UsXG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBIYWwgSnNvbiBBcyBhbiBhY2NlcHRlZCBmb3JtYXRcbiAgICogQHBhcmFtIHtSZXF1ZXN0fSByZXF1ZXN0XG4gICAqIEByZXR1cm4ge1JlcXVlc3R9XG4gICAqL1xuICBmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICBpZih0eXBlb2YgcmVxdWVzdC5oZWFkZXJzLkFjY2VwdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJlcXVlc3QuaGVhZGVycy5BY2NlcHQgPSBDT05URU5UX1RZUEU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcXVlc3QuaGVhZGVycy5BY2NlcHQgPSBbXG4gICAgICAgIENPTlRFTlRfVFlQRSxcbiAgICAgICAgcmVxdWVzdC5oZWFkZXJzLkFjY2VwdCxcbiAgICAgIF0uam9pbignLCAnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVxdWVzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm0gUmVzcG9uc2VcbiAgICpcbiAgICogQHBhcmFtIHtSZXNwb25zZX0gcmVzcG9uc2VcbiAgICogQHJldHVybiB7UmVzcG9uc2V8UmVzb3VyY2V9XG4gICAqL1xuICBmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShyZXNwb25zZSkge1xuICAgIHRyeSB7XG4gICAgICBpZihwYXJzZShyZXNwb25zZS5oZWFkZXJzKCdDb250ZW50LVR5cGUnKSkudHlwZSA9PT0gQ09OVEVOVF9UWVBFKSB7XG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1SZXNwb25zZVRvUmVzb3VyY2UocmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH0gY2F0Y2goZSkge1xuICAgICAgLy8gVGhlIHBhcnNlIGZ1bmN0aW9uIGNvdWxkIHRocm93IGFuIGVycm9yLCB3ZSBkbyBub3Qgd2FudCB0aGF0LlxuICAgIH1cbiAgICBpZihyZXNwb25zZS5jb25maWcuZm9yY2VIYWwpIHtcbiAgICAgIHJldHVybiB0cmFuc2Zvcm1SZXNwb25zZVRvUmVzb3VyY2UocmVzcG9uc2UpO1xuICAgIH1cbiAgICBpZigoXG4gICAgICAgIHJlc3BvbnNlLmhlYWRlcnMoJ0NvbnRlbnQtVHlwZScpID09PSAnYXBwbGljYXRpb24vanNvbicgfHxcbiAgICAgICAgcmVzcG9uc2UuaGVhZGVycygnQ29udGVudC1UeXBlJykgPT09IG51bGxcbiAgICAgICkgJiZcbiAgICAgICRoYWxDb25maWd1cmF0aW9uLmZvcmNlSlNPTlJlc291cmNlKSB7XG4gICAgICByZXR1cm4gdHJhbnNmb3JtUmVzcG9uc2VUb1Jlc291cmNlKHJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cbiAgZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2VUb1Jlc291cmNlKHJlc3BvbnNlKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNvdXJjZShyZXNwb25zZS5kYXRhLCByZXNwb25zZSk7XG4gIH1cbn1cblxuUmVzb3VyY2VIdHRwSW50ZXJjZXB0b3JGYWN0b3J5LiRpbmplY3QgPSBbXG4gICckaGFsQ29uZmlndXJhdGlvbicsXG4gICdSZXNvdXJjZScsXG5dO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBNT0RVTEVfTkFNRSA9ICdhbmd1bGFyLWhhbCc7XG5cbmltcG9ydCBodHRwSW50ZXJjZXB0aW9uIGZyb20gJy4vaHR0cC1pbnRlcmNlcHRpb24vaW5kZXgnO1xuaW1wb3J0IGNsaWVudCBmcm9tICcuL2NsaWVudC9pbmRleCc7XG5cbi8vIENvbWJpbmUgbmVlZGVkIE1vZHVsZXNcbmFuZ3VsYXJcbiAgLm1vZHVsZShNT0RVTEVfTkFNRSwgW1xuICAgIGh0dHBJbnRlcmNlcHRpb24sXG4gICAgY2xpZW50LFxuICBdKVxuO1xuXG5leHBvcnQgZGVmYXVsdCBNT0RVTEVfTkFNRTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGV4dGVuZFJlYWRPbmx5IGZyb20gJy4uL3V0aWxpdHkvZXh0ZW5kLXJlYWQtb25seSc7XG5cbi8qKlxuICogRmFjdG9yeSBmb3IgSGFsUmVzb3VyY2VDbGllbnRcbiAqIEBwYXJhbSB7UX0gICAgICAgICRxXG4gKiBAcGFyYW0ge0luamVjdG9yfSAkaW5qZWN0b3IgUHJldmVudCBDaXJjdWxhciBEZXBlbmRlbmN5IGJ5IGluamVjdGluZyAkaW5qZWN0b3IgaW5zdGVhZCBvZiAkaHR0cFxuICogQHBhcmFtIHtPYmplY3R9ICAgJGhhbENvbmZpZ3VyYXRpb25cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSGFsUmVzb3VyY2VDbGllbnRGYWN0b3J5KCRxLCAkaW5qZWN0b3IsICRoYWxDb25maWd1cmF0aW9uKSB7XG4gIHJldHVybiBIYWxSZXNvdXJjZUNsaWVudDtcblxuICAvKipcbiAgICogQHBhcmFtIHtSZXNvdXJjZX0gcmVzb3VyY2VcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgbGlua3NcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgZW1iZWRkZWRcbiAgICovXG4gIGZ1bmN0aW9uIEhhbFJlc291cmNlQ2xpZW50KHJlc291cmNlLCBlbWJlZGRlZCkge1xuICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgLCAkaHR0cCA9ICRpbmplY3Rvci5nZXQoJyRodHRwJyk7XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoZSBjbGllbnRcbiAgICAgKi9cbiAgICAoZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIGV4dGVuZFJlYWRPbmx5KHNlbGYsIHtcbiAgICAgICAgJHJlcXVlc3Q6ICRyZXF1ZXN0LFxuICAgICAgICAkZ2V0OiAkZ2V0LFxuICAgICAgICAkZ2V0Q29sbGVjdGlvbjogJGdldENvbGxlY3Rpb24sXG4gICAgICAgICRwb3N0OiAkcG9zdCxcbiAgICAgICAgJHB1dDogJHB1dCxcbiAgICAgICAgJHBhdGNoOiAkcGF0Y2gsXG4gICAgICAgICRkZWxldGU6ICRkZWxldGUsXG4gICAgICAgICRkZWw6ICRkZWxldGUsXG4gICAgICAgICRsaW5rOiAkbGluayxcbiAgICAgICAgJHVubGluazogJHVubGluayxcbiAgICAgICAgJGdldFNlbGY6ICRnZXRTZWxmLFxuICAgICAgICAkcG9zdFNlbGY6ICRwb3N0U2VsZixcbiAgICAgICAgJHB1dFNlbGY6ICRwdXRTZWxmLFxuICAgICAgICAkcGF0Y2hTZWxmOiAkcGF0Y2hTZWxmLFxuICAgICAgICAkZGVsZXRlU2VsZjogJGRlbGV0ZVNlbGYsXG4gICAgICAgICRkZWxTZWxmOiAkZGVsZXRlU2VsZixcbiAgICAgICAgJGxpbmtTZWxmOiAkbGlua1NlbGYsXG4gICAgICAgICR1bmxpbmtTZWxmOiAkdW5saW5rU2VsZixcbiAgICAgIH0pO1xuICAgIH0pKCk7XG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRlIGEgSFRUUCByZXF1ZXN0IGFnYWluc3QgYSBsaW5rXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICBtZXRob2RcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICByZWxcbiAgICAgKiBAcGFyYW0ge09iamVjdHxudWxsfSB1cmxQYXJhbXNcbiAgICAgKiBAcGFyYW0ge21peGVkfG51bGx9ICBib2R5XG4gICAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgZnVuY3Rpb24gJHJlcXVlc3QobWV0aG9kLCByZWwsIHVybFBhcmFtcywgYm9keSwgb3B0aW9ucykge1xuICAgICAgdmFyIHByb21pc2VzO1xuXG4gICAgICBtZXRob2QgPSBtZXRob2QgfHwgJ0dFVCc7XG4gICAgICByZWwgPSByZWwgfHwgJGhhbENvbmZpZ3VyYXRpb24uc2VsZkxpbms7XG4gICAgICB1cmxQYXJhbXMgPSB1cmxQYXJhbXMgfHwge307XG4gICAgICBib2R5ID0gYm9keSB8fCBudWxsO1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgIGlmKG1ldGhvZCA9PT0gJ0dFVCcgJiZcbiAgICAgICAgIHJlbCA9PT0gJGhhbENvbmZpZ3VyYXRpb24uc2VsZkxpbmspIHtcbiAgICAgICAgcmV0dXJuICRxLnJlc29sdmUocmVzb3VyY2UpO1xuICAgICAgfVxuXG4gICAgICBpZihyZXNvdXJjZS4kaGFzRW1iZWRkZWQocmVsKSAmJlxuICAgICAgICBBcnJheS5pc0FycmF5KGVtYmVkZGVkW3JlbF0pKSB7XG4gICAgICAgIHByb21pc2VzID0gW107XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBlbWJlZGRlZFtyZWxdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgcHJvbWlzZXMucHVzaChlbWJlZGRlZFtyZWxdW2ldLiRyZXF1ZXN0KCkuJHJlcXVlc3QobWV0aG9kLCAnc2VsZicsIHVybFBhcmFtcywgYm9keSwgb3B0aW9ucykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkcS5hbGwocHJvbWlzZXMpO1xuICAgICAgfVxuXG4gICAgICBpZihyZXNvdXJjZS4kaGFzRW1iZWRkZWQocmVsKSkge1xuICAgICAgICByZXR1cm4gZW1iZWRkZWRbcmVsXS4kcmVxdWVzdCgpLiRyZXF1ZXN0KG1ldGhvZCwgJ3NlbGYnLCB1cmxQYXJhbXMsIGJvZHksIG9wdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICBpZihyZXNvdXJjZS4kaGFzTGluayhyZWwpKSB7XG4gICAgICAgIHZhciB1cmwgPSByZXNvdXJjZS4kaHJlZihyZWwsIHVybFBhcmFtcyk7XG5cbiAgICAgICAgYW5ndWxhci5leHRlbmQob3B0aW9ucywge1xuICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgIGRhdGE6IGJvZHksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKEFycmF5LmlzQXJyYXkodXJsKSkge1xuICAgICAgICAgIHByb21pc2VzID0gW107XG4gICAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IHVybC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCgkaHR0cChhbmd1bGFyLmV4dGVuZCh7fSwgb3B0aW9ucywge3VybDogdXJsW2pdfSkpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICRxLmFsbChwcm9taXNlcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGVyZm9ybUh0dHBSZXF1ZXN0KHJlbCwgdXJsUGFyYW1zLCBvcHRpb25zKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICRxLnJlamVjdChuZXcgRXJyb3IoJ2xpbmsgXCInICsgcmVsICsgJ1wiIGlzIHVuZGVmaW5lZCcpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRlIGEgSFRUUCBHRVQgcmVxdWVzdCBhZ2FpbnN0IGEgbGluayBvclxuICAgICAqIGxvYWQgYW4gZW1iZWRkZWQgcmVzb3VyY2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgIHJlbFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fG51bGx9IHVybFBhcmFtc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uICRnZXQocmVsLCB1cmxQYXJhbXMsIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiAkcmVxdWVzdCgnR0VUJywgcmVsLCB1cmxQYXJhbXMsIHVuZGVmaW5lZCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhlY3V0ZSBhIEhUVFAgR0VUIHJlcXVlc3QgdG8gbG9hZCBhIGNvbGxlY3Rpb24uIElmIG5vIGVtYmVkZGVkIGNvbGxlY3Rpb24gaXMgZm91bmQgaW4gdGhlIHJlc3BvbnNlLFxuICAgICAqIHJldHVybnMgYW4gZW1wdHkgYXJyYXkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICByZWxcbiAgICAgKiBAcGFyYW0ge09iamVjdHxudWxsfSB1cmxQYXJhbXNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gICAgICBvcHRpb25zXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAkZ2V0Q29sbGVjdGlvbihyZWwsIHVybFBhcmFtcywgb3B0aW9ucykge1xuICAgICAgcmV0dXJuICRnZXQocmVsLCB1cmxQYXJhbXMsIG9wdGlvbnMpXG4gICAgICAgIC50aGVuKHJlc291cmNlID0+IHtcbiAgICAgICAgICBpZiAoIXJlc291cmNlLiRoYXMocmVsKSkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb3VyY2UuJHJlcXVlc3QoKS4kZ2V0KHJlbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRlIGEgSFRUUCBQT1NUIHJlcXVlc3QgYWdhaW5zdCBhIGxpbmtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgIHJlbFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fG51bGx9IHVybFBhcmFtc1xuICAgICAqIEBwYXJhbSB7bWl4ZWR8bnVsbH0gIGJvZHlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gICAgICBvcHRpb25zXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAkcG9zdChyZWwsIHVybFBhcmFtcywgYm9keSwgb3B0aW9ucykge1xuICAgICAgcmV0dXJuICRyZXF1ZXN0KCdQT1NUJywgcmVsLCB1cmxQYXJhbXMsIGJvZHksIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGUgYSBIVFRQIFBVVCByZXF1ZXN0IGFnYWluc3QgYSBsaW5rXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICByZWxcbiAgICAgKiBAcGFyYW0ge09iamVjdHxudWxsfSB1cmxQYXJhbXNcbiAgICAgKiBAcGFyYW0ge21peGVkfG51bGx9ICBib2R5XG4gICAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgZnVuY3Rpb24gJHB1dChyZWwsIHVybFBhcmFtcywgYm9keSwgb3B0aW9ucykge1xuICAgICAgcmV0dXJuICRyZXF1ZXN0KCdQVVQnLCByZWwsIHVybFBhcmFtcywgYm9keSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhlY3V0ZSBhIEhUVFAgUEFUQ0ggcmVxdWVzdCBhZ2FpbnN0IGEgbGlua1xuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgcmVsXG4gICAgICogQHBhcmFtIHtPYmplY3R8bnVsbH0gdXJsUGFyYW1zXG4gICAgICogQHBhcmFtIHttaXhlZHxudWxsfSAgYm9keVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uICRwYXRjaChyZWwsIHVybFBhcmFtcywgYm9keSwgb3B0aW9ucykge1xuICAgICAgcmV0dXJuICRyZXF1ZXN0KCdQQVRDSCcsIHJlbCwgdXJsUGFyYW1zLCBib2R5LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRlIGEgSFRUUCBERUxFRVQgcmVxdWVzdCBhZ2FpbnN0IGEgbGlua1xuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgcmVsXG4gICAgICogQHBhcmFtIHtPYmplY3R8bnVsbH0gdXJsUGFyYW1zXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgZnVuY3Rpb24gJGRlbGV0ZShyZWwsIHVybFBhcmFtcywgb3B0aW9ucykge1xuICAgICAgcmV0dXJuICRyZXF1ZXN0KCdERUxFVEUnLCByZWwsIHVybFBhcmFtcywgdW5kZWZpbmVkLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRlIGEgSFRUUCBMSU5LIHJlcXVlc3QgYWdhaW5zdCBhIGxpbmtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICByZWxcbiAgICAgKiBAcGFyYW0ge09iamVjdHxudWxsfSAgdXJsUGFyYW1zXG4gICAgICogQHBhcmFtIHtMaW5rSGVhZGVyW119IGJvZHlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgZnVuY3Rpb24gJGxpbmsocmVsLCB1cmxQYXJhbXMsIGxpbmtzLCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgIG9wdGlvbnMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCB7fTtcbiAgICAgIG9wdGlvbnMuaGVhZGVycy5MaW5rID0gbGlua3MubWFwKHRvU3RyaW5nSXRlbSk7XG4gICAgICByZXR1cm4gJHJlcXVlc3QoJ0xJTksnLCByZWwsIHVybFBhcmFtcywgdW5kZWZpbmVkLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRlIGEgSFRUUCBVTkxJTksgcmVxdWVzdCBhZ2FpbnN0IGEgbGlua1xuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgIHJlbFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fG51bGx9ICB1cmxQYXJhbXNcbiAgICAgKiBAcGFyYW0ge0xpbmtIZWFkZXJbXX0gYm9keVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICBvcHRpb25zXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAkdW5saW5rKHJlbCwgdXJsUGFyYW1zLCBsaW5rcywgb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICBvcHRpb25zLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgfHwge307XG4gICAgICBvcHRpb25zLmhlYWRlcnMuTGluayA9IGxpbmtzLm1hcCh0b1N0cmluZ0l0ZW0pO1xuICAgICAgcmV0dXJuICRyZXF1ZXN0KCdVTkxJTksnLCByZWwsIHVybFBhcmFtcywgdW5kZWZpbmVkLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge21peGVkfSBpdGVtXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRvU3RyaW5nSXRlbShpdGVtKSB7XG4gICAgICByZXR1cm4gaXRlbS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGUgYSBIVFRQIEdFVCByZXF1ZXN0IG9uIHNlbGZcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uICRnZXRTZWxmKG9wdGlvbnMpIHtcbiAgICAgIGNvbnN0IGZ1bGxPcHRpb25zID0gYW5ndWxhci5leHRlbmQoe30sIG9wdGlvbnMsIHttZXRob2Q6ICdHRVQnfSk7XG4gICAgICByZXR1cm4gcGVyZm9ybUh0dHBSZXF1ZXN0KCRoYWxDb25maWd1cmF0aW9uLnNlbGZMaW5rLCB7fSwgZnVsbE9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSBQVVQgcmVxdWVzdCBvbiBzZWxmXG4gICAgICogQHBhcmFtIHBheWxvYWRcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uICRwdXRTZWxmKHBheWxvYWQsIG9wdGlvbnMpe1xuICAgICAgcmV0dXJuICRwdXQoJGhhbENvbmZpZ3VyYXRpb24uc2VsZkxpbmssIG51bGwsIHBheWxvYWQsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSBQT1NUIHJlcXVlc3Qgb24gc2VsZlxuICAgICAqIEBwYXJhbSBwYXlsb2FkXG4gICAgICogQHBhcmFtIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAkcG9zdFNlbGYocGF5bG9hZCwgb3B0aW9ucyl7XG4gICAgICByZXR1cm4gJHBvc3QoJGhhbENvbmZpZ3VyYXRpb24uc2VsZkxpbmssIG51bGwsIHBheWxvYWQsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSBQQVRDSCByZXF1ZXN0IG9uIHNlbGZcbiAgICAgKiBAcGFyYW0gcGF5bG9hZFxuICAgICAqIEBwYXJhbSBvcHRpb25zXG4gICAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAgICovXG4gICAgZnVuY3Rpb24gJHBhdGNoU2VsZihwYXlsb2FkLCBvcHRpb25zKXtcbiAgICAgIHJldHVybiAkcGF0Y2goJGhhbENvbmZpZ3VyYXRpb24uc2VsZkxpbmssIG51bGwsIHBheWxvYWQsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSBMSU5LIHJlcXVlc3Qgb24gc2VsZlxuICAgICAqIEBwYXJhbSBwYXlsb2FkXG4gICAgICogQHBhcmFtIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAkbGlua1NlbGYobGlua3MsIG9wdGlvbnMpe1xuICAgICAgcmV0dXJuICRsaW5rKCRoYWxDb25maWd1cmF0aW9uLnNlbGZMaW5rLCBudWxsLCBsaW5rcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbiBVTkxJTksgcmVxdWVzdCBvbiBzZWxmXG4gICAgICogQHBhcmFtIHBheWxvYWRcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uICR1bmxpbmtTZWxmKGxpbmtzLCBvcHRpb25zKXtcbiAgICAgIHJldHVybiAkdW5saW5rKCRoYWxDb25maWd1cmF0aW9uLnNlbGZMaW5rLCBudWxsLCBsaW5rcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIERFTEVURSByZXF1ZXN0IG9uIHNlbGZcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uICRkZWxldGVTZWxmKG9wdGlvbnMpe1xuICAgICAgcmV0dXJuICRkZWxldGUoJGhhbENvbmZpZ3VyYXRpb24uc2VsZkxpbmssIG51bGwsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlZm9ybSBodHRwIHJlcXVlc3Qgb24gcmVzb3VyY2UncyByZWxcbiAgICAgKiBAcGFyYW0gcmVsIGxpbmsgbmFtZVxuICAgICAqIEBwYXJhbSB1cmxQYXJhbXNcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHBlcmZvcm1IdHRwUmVxdWVzdChyZWwsIHVybFBhcmFtcywgb3B0aW9ucyl7XG4gICAgICByZXR1cm4gJGh0dHAoYW5ndWxhci5leHRlbmQoe30sIG9wdGlvbnMsIHtcbiAgICAgICAgdXJsOiByZXNvdXJjZS4kaHJlZihyZWwsIHVybFBhcmFtcyksXG4gICAgICB9KSk7XG4gICAgfVxuICB9XG59XG5cbkhhbFJlc291cmNlQ2xpZW50RmFjdG9yeS4kaW5qZWN0ID0gW1xuICAnJHEnLFxuICAnJGluamVjdG9yJyxcbiAgJyRoYWxDb25maWd1cmF0aW9uJyxcbl07XG5cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgTU9EVUxFX05BTUUgPSAnYW5ndWxhci1oYWwucmVzb3VyY2UnO1xuXG5cbmltcG9ydCBjb25maWd1cmF0aW9uIGZyb20gJy4uL2NvbmZpZ3VyYXRpb24vaW5kZXgnO1xuXG5pbXBvcnQgUmVzb3VyY2VGYWN0b3J5IGZyb20gJy4vcmVzb3VyY2UuZmFjdG9yeSc7XG5pbXBvcnQgSGFsUmVzb3VyY2VDbGllbnRGYWN0b3J5IGZyb20gJy4vaGFsLXJlc291cmNlLWNsaWVudC5mYWN0b3J5JztcblxuLy8gQWRkIG1vZHVsZSBmb3IgcmVzb3VyY2VcbmFuZ3VsYXJcbiAgLm1vZHVsZShNT0RVTEVfTkFNRSwgW1xuICAgIGNvbmZpZ3VyYXRpb24sXG4gIF0pXG5cbiAgLmZhY3RvcnkoJ1Jlc291cmNlJywgUmVzb3VyY2VGYWN0b3J5KVxuXG4gIC5mYWN0b3J5KCdIYWxSZXNvdXJjZUNsaWVudCcsIEhhbFJlc291cmNlQ2xpZW50RmFjdG9yeSlcbjtcblxuZXhwb3J0IGRlZmF1bHQgTU9EVUxFX05BTUU7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBleHRlbmRSZWFkT25seSBmcm9tICcuLi91dGlsaXR5L2V4dGVuZC1yZWFkLW9ubHknO1xuaW1wb3J0IGRlZmluZVJlYWRPbmx5IGZyb20gJy4uL3V0aWxpdHkvZGVmaW5lLXJlYWQtb25seSc7XG5pbXBvcnQgZ2VuZXJhdGVVcmwgZnJvbSAnLi4vdXRpbGl0eS9nZW5lcmF0ZS11cmwnO1xuaW1wb3J0IG5vcm1hbGl6ZUxpbmsgZnJvbSAnLi4vdXRpbGl0eS9ub3JtYWxpemUtbGluayc7XG5cbi8qKlxuICogRmFjdG9yeSBmb3IgUmVzb3VyY2VcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBIYWxSZXNvdXJjZUNsaWVudFxuICogQHBhcmFtIHtPYmplY3R9ICAgJGhhbENvbmZpZ3VyYXRpb25cbiAqIEBwYXJhbSB7TG9nfSAgICAgICRsb2dcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVzb3VyY2VGYWN0b3J5KEhhbFJlc291cmNlQ2xpZW50LCAkaGFsQ29uZmlndXJhdGlvbiwgJGxvZykge1xuICByZXR1cm4gUmVzb3VyY2U7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZVxuICAgKi9cbiAgZnVuY3Rpb24gUmVzb3VyY2UoZGF0YSwgcmVzcG9uc2UpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICwgbGlua3MgPSB7fVxuICAgICAgLCBlbWJlZGRlZCA9IHt9XG4gICAgICAsIGNsaWVudDtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhlIFJlc291cmNlXG4gICAgICovXG4gICAgKGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICBpZih0eXBlb2YgZGF0YSAhPT0gJ29iamVjdCcgfHxcbiAgICAgICAgZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICBkYXRhID0ge307XG4gICAgICB9XG4gICAgICBpbml0aWFsaXplRGF0YSgpO1xuICAgICAgaW5pdGlhbGl6ZUVtYmVkZGVkKCk7XG4gICAgICBpbml0aWFsaXplTGlua3MoKTtcbiAgICAgIGluaXRpdGFsaXplQ2xpZW50KCk7XG5cbiAgICAgIGV4dGVuZFJlYWRPbmx5KHNlbGYsIHtcbiAgICAgICAgJGhhc0xpbms6ICRoYXNMaW5rLFxuICAgICAgICAkaGFzRW1iZWRkZWQ6ICRoYXNFbWJlZGRlZCxcbiAgICAgICAgJGhhczogJGhhcyxcbiAgICAgICAgJGhyZWY6ICRocmVmLFxuICAgICAgICAkbWV0YTogJG1ldGEsXG4gICAgICAgICRsaW5rOiAkbGluayxcbiAgICAgICAgJHJlcXVlc3Q6ICRyZXF1ZXN0LFxuICAgICAgICAkcmVzcG9uc2U6ICRyZXNwb25zZSxcbiAgICAgIH0pO1xuICAgIH0pKCk7XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYWxsIGRhdGEgZnJvbSBkYXRhIHRvIGl0c2VsZlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGluaXRpYWxpemVEYXRhKCkge1xuICAgICAgZm9yKHZhciBwcm9wZXJ0eU5hbWUgaW4gZGF0YSkge1xuICAgICAgICBpZighZGF0YS5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYoaXNNZXRhUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGRlZmluZVJlYWRPbmx5KHNlbGYsIHByb3BlcnR5TmFtZSwgZGF0YVtwcm9wZXJ0eU5hbWVdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOb3JtYWxpemUgYWxsIExpbmtzXG4gICAgICovXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZUxpbmtzKCkge1xuICAgICAgaWYodHlwZW9mIGRhdGFbJGhhbENvbmZpZ3VyYXRpb24ubGlua3NBdHRyaWJ1dGVdICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIE9iamVjdFxuICAgICAgICAua2V5cyhkYXRhWyRoYWxDb25maWd1cmF0aW9uLmxpbmtzQXR0cmlidXRlXSlcbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24ocmVsKSB7XG4gICAgICAgICAgdmFyIGxpbmsgPSBkYXRhWyRoYWxDb25maWd1cmF0aW9uLmxpbmtzQXR0cmlidXRlXVtyZWxdO1xuICAgICAgICAgIGxpbmtzW3JlbF0gPSBub3JtYWxpemVMaW5rKHJlc3BvbnNlLmNvbmZpZy51cmwsIGxpbmspO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOb3JtYWxpemUgRW1iZWRkZWQgQ29udGVudHNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbml0aWFsaXplRW1iZWRkZWQoKSB7XG4gICAgICBpZih0eXBlb2YgZGF0YVskaGFsQ29uZmlndXJhdGlvbi5lbWJlZGRlZEF0dHJpYnV0ZV0gIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgT2JqZWN0XG4gICAgICAgIC5rZXlzKGRhdGFbJGhhbENvbmZpZ3VyYXRpb24uZW1iZWRkZWRBdHRyaWJ1dGVdKVxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihyZWwpIHtcbiAgICAgICAgICBlbWJlZFJlc291cmNlKHJlbCwgZGF0YVskaGFsQ29uZmlndXJhdGlvbi5lbWJlZGRlZEF0dHJpYnV0ZV1bcmVsXSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhlIEhUVFAgQ0xJRU5UXG4gICAgICovXG4gICAgZnVuY3Rpb24gaW5pdGl0YWxpemVDbGllbnQoKSB7XG4gICAgICBjbGllbnQgPSBuZXcgSGFsUmVzb3VyY2VDbGllbnQoc2VsZiwgZW1iZWRkZWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVtYmVkIGEgcmVzb3VyY2UocylcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICByZWxcbiAgICAgKiBAcGFyYW0ge09iamVjdHxPYmplY3RbXX0gcmVzb3VyY2VzXG4gICAgICovXG4gICAgZnVuY3Rpb24gZW1iZWRSZXNvdXJjZShyZWwsIHJlc291cmNlcykge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVzb3VyY2VzKSkge1xuICAgICAgICBlbWJlZGRlZFtyZWxdID0gW107XG4gICAgICAgIHJlc291cmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChyZXNvdXJjZSkge1xuICAgICAgICAgIGVtYmVkZGVkW3JlbF0ucHVzaChuZXcgUmVzb3VyY2UocmVzb3VyY2UsIHJlc3BvbnNlKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBlbWJlZGRlZFtyZWxdID0gbmV3IFJlc291cmNlKHJlc291cmNlcywgcmVzcG9uc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZSBpZiBhIHByb3BlcnR5IG5hbWUgaXMgYSBtZXRhIHByb3BlcnR5XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5TmFtZVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNNZXRhUHJvcGVydHkocHJvcGVydHlOYW1lKSB7XG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgJGhhbENvbmZpZ3VyYXRpb24uaWdub3JlQXR0cmlidXRlUHJlZml4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYocHJvcGVydHlOYW1lLnN1YnN0cigwLCAxKSA9PT0gJGhhbENvbmZpZ3VyYXRpb24uaWdub3JlQXR0cmlidXRlUHJlZml4ZXNbaV0pIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZihwcm9wZXJ0eU5hbWUgPT09ICRoYWxDb25maWd1cmF0aW9uLmxpbmtzQXR0cmlidXRlIHx8XG4gICAgICAgICAgcHJvcGVydHlOYW1lID09PSAkaGFsQ29uZmlndXJhdGlvbi5lbWJlZGRlZEF0dHJpYnV0ZSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHJlbFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gJGhhc0xpbmsocmVsKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIGxpbmtzW3JlbF0gIT09ICd1bmRlZmluZWQnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSByZWxcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uICRoYXNFbWJlZGRlZChyZWwpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgZW1iZWRkZWRbcmVsXSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHJlbFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gJGhhcyhyZWwpIHtcbiAgICAgIHJldHVybiAkaGFzTGluayhyZWwpIHx8ICRoYXNFbWJlZGRlZChyZWwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgaHJlZiBvZiBhIExpbmtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSByZWxcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAkaHJlZihyZWwsIHBhcmFtZXRlcnMpIHtcbiAgICAgIHZhciBsaW5rID0gJGxpbmsocmVsKVxuICAgICAgICAsIGhyZWYgPSBsaW5rLmhyZWY7XG5cbiAgICAgIGlmKEFycmF5LmlzQXJyYXkobGluaykpIHtcbiAgICAgICAgaHJlZiA9IFtdO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGluay5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBzdWJMaW5rID0gbGlua1tpXVxuICAgICAgICAgICAgLCBzdWJIcmVmID0gc3ViTGluay5ocmVmO1xuICAgICAgICAgIGlmKHR5cGVvZiBzdWJMaW5rLnRlbXBsYXRlZCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgIHN1YkxpbmsudGVtcGxhdGVkKSB7XG4gICAgICAgICAgICBzdWJIcmVmID0gZ2VuZXJhdGVVcmwoc3ViTGluay5ocmVmLCBwYXJhbWV0ZXJzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3ViSHJlZiA9ICRoYWxDb25maWd1cmF0aW9uLnVybFRyYW5zZm9ybWVyKHN1YkhyZWYpO1xuICAgICAgICAgIGhyZWYucHVzaChzdWJIcmVmKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYodHlwZW9mIGxpbmsudGVtcGxhdGVkICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgIGxpbmsudGVtcGxhdGVkKSB7XG4gICAgICAgICAgaHJlZiA9IGdlbmVyYXRlVXJsKGxpbmsuaHJlZiwgcGFyYW1ldGVycyk7XG4gICAgICAgIH1cblxuICAgICAgICBocmVmID0gJGhhbENvbmZpZ3VyYXRpb24udXJsVHJhbnNmb3JtZXIoaHJlZik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBocmVmO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhIGxpbmtcbiAgICAgKlxuICAgICAqICEhIFRvIGdldCBhIGhyZWYsIHVzZSAkaHJlZiBpbnN0ZWFkICEhXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVsXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uICRsaW5rKHJlbCkge1xuICAgICAgaWYoISRoYXNMaW5rKHJlbCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsaW5rIFwiJyArIHJlbCArICdcIiBpcyB1bmRlZmluZWQnKTtcbiAgICAgIH1cbiAgICAgIHZhciBsaW5rID0gbGlua3NbcmVsXTtcblxuICAgICAgaWYodHlwZW9mIGxpbmsuZGVwcmVjYXRpb24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICRsb2cud2FybihgVGhlIGxpbmsgXCIke3JlbH1cIiBpcyBtYXJrZWQgYXMgZGVwcmVjYXRlZCB3aXRoIHRoZSB2YWx1ZSBcIiR7bGluay5kZXByZWNhdGlvbn1cIi5gKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGxpbms7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IG1ldGEgcHJvcGVydGllc1xuICAgICAqXG4gICAgICogISEgVG8gZ2V0IGEgaHJlZiwgdXNlICRocmVmIGluc3RlYWQgISFcbiAgICAgKiAhISBUbyBnZXQgYSBsaW5rLCB1c2UgJGxpbmsgaW5zdGVhZCAhIVxuICAgICAqICEhIFRvIGdldCBhbiBlbWJlZGRlZCByZXNvdXJjZSwgdXNlICRyZXF1ZXN0KCkuJGdldChyZWwpIGluc3RlYWQgISFcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSByZWxcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZnVuY3Rpb24gJG1ldGEobmFtZSkge1xuICAgICAgZm9yKHZhciBpID0gMDsgaSA8ICRoYWxDb25maWd1cmF0aW9uLmlnbm9yZUF0dHJpYnV0ZVByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBmdWxsTmFtZSA9ICRoYWxDb25maWd1cmF0aW9uLmlnbm9yZUF0dHJpYnV0ZVByZWZpeGVzW2ldICsgbmFtZTtcbiAgICAgICAgcmV0dXJuIGRhdGFbZnVsbE5hbWVdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgT3JpZ2luYWwgUmVzcG9uc2VcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdCl9XG4gICAgICovXG4gICAgZnVuY3Rpb24gJHJlc3BvbnNlKCkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY2xpZW50IHRvIHBlcmZvcm0gcmVxdWVzdHNcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0hhbFJlc291cmNlQ2xpZW50KX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAkcmVxdWVzdCgpIHtcbiAgICAgIHJldHVybiBjbGllbnQ7XG4gICAgfVxuICB9XG59XG5SZXNvdXJjZUZhY3RvcnkuJGluamVjdCA9IFtcbiAgJ0hhbFJlc291cmNlQ2xpZW50JyxcbiAgJyRoYWxDb25maWd1cmF0aW9uJyxcbiAgJyRsb2cnLFxuXTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZWZpbmUgcmVhZC1vbmx5IHByb3BlcnR5IGluIHRhcmdldFxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHttaXhlZH0gIHZhbHVlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlZmluZVJlYWRPbmx5KHRhcmdldCwga2V5LCB2YWx1ZSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHtcbiAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgdmFsdWU6IHZhbHVlLFxuICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgfSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRXh0ZW5kIHByb3BlcnRpZXMgZnJvbSBjb3B5IHJlYWQtb25seSB0byB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb3B5XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dGVuZFJlYWRPbmx5KHRhcmdldCwgY29weSkge1xuICBmb3IodmFyIGtleSBpbiBjb3B5KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7XG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogY29weVtrZXldLFxuICAgIH0pO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCByZmM2NTcwIGZyb20gJ3JmYzY1NzAvc3JjL21haW4nO1xuXG4vKipcbiAqIEdlbmVyYXRlIHVybCBmcm9tIHRlbXBsYXRlXG4gKlxuICogQHBhcmFtICB7U3RyaW5nfSB0ZW1wbGF0ZVxuICogQHBhcmFtICB7T2JqZWN0fSBwYXJhbWV0ZXJzXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdlbmVyYXRlVXJsKHRlbXBsYXRlLCBwYXJhbWV0ZXJzKSB7XG4gIHJldHVybiBuZXcgcmZjNjU3MC5VcmlUZW1wbGF0ZSh0ZW1wbGF0ZSkuc3RyaW5naWZ5KHBhcmFtZXRlcnMpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgcmVzb2x2ZVVybCBmcm9tICcuLi91dGlsaXR5L3Jlc29sdmUtdXJsJztcblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gYmFzZVVybFxuICogQHBhcmFtIHttaXhlZH0gIGxpbmtcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm9ybWFsaXplTGluayhiYXNlVXJsLCBsaW5rKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGxpbmspKSB7XG4gICAgcmV0dXJuIGxpbmsubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gbm9ybWFsaXplTGluayhiYXNlVXJsLCBpdGVtKTtcbiAgICB9KTtcbiAgfVxuICBpZih0eXBlb2YgbGluayA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaHJlZjogcmVzb2x2ZVVybChiYXNlVXJsLCBsaW5rKSxcbiAgICB9O1xuICB9XG4gIGlmKHR5cGVvZiBsaW5rLmhyZWYgPT09ICdzdHJpbmcnKSB7XG4gICAgbGluay5ocmVmID0gcmVzb2x2ZVVybChiYXNlVXJsLCBsaW5rLmhyZWYpO1xuICAgIHJldHVybiBsaW5rO1xuICB9XG4gIGlmKEFycmF5LmlzQXJyYXkobGluay5ocmVmKSkge1xuICAgIHJldHVybiBsaW5rLmhyZWYubWFwKGZ1bmN0aW9uIChocmVmKSB7XG4gICAgICB2YXIgbmV3TGluayA9IGFuZ3VsYXIuZXh0ZW5kKHt9LCBsaW5rLCB7XG4gICAgICAgIGhyZWY6IGhyZWYsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBub3JtYWxpemVMaW5rKGJhc2VVcmwsIG5ld0xpbmspO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiB7XG4gICAgaHJlZjogYmFzZVVybCxcbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBSZXNvbHZlIHdob2xlIFVSTFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBiYXNlVXJsXG4gKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXNvbHZlVXJsKGJhc2VVcmwsIHBhdGgpIHtcbiAgdmFyIHJlc3VsdEhyZWYgPSAnJ1xuICAgICwgcmVGdWxsVXJsID0gL14oKD86XFx3K1xcOik/KSgoPzpcXC9cXC8pPykoW15cXC9dKikoKD86XFwvLiopPykkL1xuICAgICwgYmFzZUhyZWZNYXRjaCA9IHJlRnVsbFVybC5leGVjKGJhc2VVcmwpXG4gICAgLCBocmVmTWF0Y2ggPSByZUZ1bGxVcmwuZXhlYyhwYXRoKTtcblxuICBmb3IgKHZhciBwYXJ0SW5kZXggPSAxOyBwYXJ0SW5kZXggPCA1OyBwYXJ0SW5kZXgrKykge1xuICAgIGlmIChocmVmTWF0Y2hbcGFydEluZGV4XSkge1xuICAgICAgcmVzdWx0SHJlZiArPSBocmVmTWF0Y2hbcGFydEluZGV4XTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0SHJlZiArPSBiYXNlSHJlZk1hdGNoW3BhcnRJbmRleF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdEhyZWY7XG59XG4iXX0=
