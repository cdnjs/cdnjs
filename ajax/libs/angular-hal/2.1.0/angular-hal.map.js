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

exports.default = HalClient;

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

/**
 * @param {HttpProvider} $httpProvider
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HttpInterceptorConfiguration;
function HttpInterceptorConfiguration($httpProvider) {
  $httpProvider.interceptors.push('ResourceHttpInterceptor');
}

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _resource = require('../resource');

var _resource2 = _interopRequireDefault(_resource);

var _configuration = require('../configuration');

var _configuration2 = _interopRequireDefault(_configuration);

var _resourceHttpInterceptor = require('./resource-http-interceptor.factory');

var _resourceHttpInterceptor2 = _interopRequireDefault(_resourceHttpInterceptor);

var _httpInterception = require('./http-interception.config');

var _httpInterception2 = _interopRequireDefault(_httpInterception);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODULE_NAME = 'angular-hal.http-interception';

// Add module for http interception
angular.module(MODULE_NAME, [_resource2.default, _configuration2.default]).config(_httpInterception2.default).factory('ResourceHttpInterceptor', _resourceHttpInterceptor2.default);

exports.default = MODULE_NAME;

},{"../configuration":9,"../resource":16,"./http-interception.config":10,"./resource-http-interceptor.factory":12}],12:[function(require,module,exports){
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

},{"content-type":1}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _httpInterception = require('./http-interception');

var _httpInterception2 = _interopRequireDefault(_httpInterception);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODULE_NAME = 'angular-hal';

// Combine needed Modules
angular.module(MODULE_NAME, [_httpInterception2.default, _client2.default]);

exports.default = MODULE_NAME;

},{"./client":6,"./http-interception":11}],14:[function(require,module,exports){
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

},{"rfc6570/src/main":4}],15:[function(require,module,exports){
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
        $post: $post,
        $put: $put,
        $patch: $patch,
        $delete: $delete,
        $del: $delete,
        $link: $link,
        $unlink: $unlink
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

        return $http(angular.extend({}, options, {
          url: resource.$href(rel, urlParams)
        }));
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
  }
}

},{"../utility/extend-read-only":19}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _configuration = require('../configuration');

var _configuration2 = _interopRequireDefault(_configuration);

var _resource = require('./resource.factory');

var _resource2 = _interopRequireDefault(_resource);

var _halResourceClient = require('./hal-resource-client.factory');

var _halResourceClient2 = _interopRequireDefault(_halResourceClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODULE_NAME = 'angular-hal.resource';

// Add module for resource
angular.module(MODULE_NAME, [_configuration2.default]).factory('Resource', _resource2.default).factory('HalResourceClient', _halResourceClient2.default);

exports.default = MODULE_NAME;

},{"../configuration":9,"./hal-resource-client.factory":15,"./resource.factory":17}],17:[function(require,module,exports){
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

var _generateUrl = require('./generate-url');

var _generateUrl2 = _interopRequireDefault(_generateUrl);

var _normalizeLink = require('../utility/normalize-link');

var _normalizeLink2 = _interopRequireDefault(_normalizeLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Factory for Resource
 *
 * @param {Function} HalResourceClient
 * @param {Object}   $halConfiguration
 */
function ResourceFactory(HalResourceClient, $halConfiguration) {
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
      if (!$hasLink(rel)) {
        throw new Error('link "' + rel + '" is undefined');
      }

      var link = links[rel],
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

},{"../utility/define-read-only":18,"../utility/extend-read-only":19,"../utility/normalize-link":20,"./generate-url":14}],18:[function(require,module,exports){
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
    writable: true
  });
}

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY29udGVudC10eXBlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JmYzY1NzAvc3JjL1JvdXRlci5qcyIsIm5vZGVfbW9kdWxlcy9yZmM2NTcwL3NyYy9VcmlUZW1wbGF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZmM2NTcwL3NyYy9tYWluLmpzIiwic3JjL2NsaWVudC9oYWwtY2xpZW50LmpzIiwic3JjL2NsaWVudC9pbmRleC5qcyIsInNyYy9jbGllbnQvbGluay1oZWFkZXIuanMiLCJzcmMvY29uZmlndXJhdGlvbi9oYWwtY29uZmlndXJhdGlvbi5wcm92aWRlci5qcyIsInNyYy9jb25maWd1cmF0aW9uL2luZGV4LmpzIiwic3JjL2h0dHAtaW50ZXJjZXB0aW9uL2h0dHAtaW50ZXJjZXB0aW9uLmNvbmZpZy5qcyIsInNyYy9odHRwLWludGVyY2VwdGlvbi9pbmRleC5qcyIsInNyYy9odHRwLWludGVyY2VwdGlvbi9yZXNvdXJjZS1odHRwLWludGVyY2VwdG9yLmZhY3RvcnkuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvcmVzb3VyY2UvZ2VuZXJhdGUtdXJsLmpzIiwic3JjL3Jlc291cmNlL2hhbC1yZXNvdXJjZS1jbGllbnQuZmFjdG9yeS5qcyIsInNyYy9yZXNvdXJjZS9pbmRleC5qcyIsInNyYy9yZXNvdXJjZS9yZXNvdXJjZS5mYWN0b3J5LmpzIiwic3JjL3V0aWxpdHkvZGVmaW5lLXJlYWQtb25seS5qcyIsInNyYy91dGlsaXR5L2V4dGVuZC1yZWFkLW9ubHkuanMiLCJzcmMvdXRpbGl0eS9ub3JtYWxpemUtbGluay5qcyIsInNyYy91dGlsaXR5L3Jlc29sdmUtdXJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2VEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBOzs7Ozs7Ozs7Ozs7OztJQUtxQjs7Ozs7Ozs7QUFPbkIsV0FQbUIsU0FPbkIsQ0FBWSxJQUFaLEVBQWtCLEtBQWxCLEVBQXlCLFVBQXpCLEVBQXFDLGlCQUFyQyxFQUF3RDswQkFQckMsV0FPcUM7O0FBQ3RELFNBQUssS0FBTCxHQUFhLElBQWIsQ0FEc0Q7QUFFdEQsU0FBSyxNQUFMLEdBQWMsS0FBZCxDQUZzRDtBQUd0RCxTQUFLLGtCQUFMLEdBQTBCLGlCQUExQixDQUhzRDtBQUl0RCxTQUFLLFVBQUwsR0FBa0IsVUFBbEIsQ0FKc0Q7R0FBeEQ7O2VBUG1COzt5QkFhZCxNQUFNLFNBQVM7QUFDbEIsYUFBTyxLQUFLLFFBQUwsQ0FBYyxLQUFkLEVBQXFCLElBQXJCLEVBQTJCLE9BQTNCLENBQVAsQ0FEa0I7Ozs7MEJBR2QsTUFBTSxTQUFTLE1BQU07QUFDekIsYUFBTyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEVBQXNCLElBQXRCLEVBQTRCLE9BQTVCLEVBQXFDLElBQXJDLENBQVAsQ0FEeUI7Ozs7eUJBR3RCLE1BQU0sU0FBUyxNQUFNO0FBQ3hCLGFBQU8sS0FBSyxRQUFMLENBQWMsS0FBZCxFQUFxQixJQUFyQixFQUEyQixPQUEzQixFQUFvQyxJQUFwQyxDQUFQLENBRHdCOzs7OzJCQUduQixNQUFNLFNBQVMsTUFBTTtBQUMxQixhQUFPLEtBQUssUUFBTCxDQUFjLE9BQWQsRUFBdUIsSUFBdkIsRUFBNkIsT0FBN0IsRUFBc0MsSUFBdEMsQ0FBUCxDQUQwQjs7Ozs0QkFHcEIsTUFBTSxTQUFTO0FBQ3JCLGFBQU8sS0FBSyxRQUFMLENBQWMsUUFBZCxFQUF3QixJQUF4QixFQUE4QixPQUE5QixDQUFQLENBRHFCOzs7OzBCQUdqQixNQUFNLFNBQVMsYUFBYTtBQUNoQyxnQkFBVSxXQUFXLEVBQVgsQ0FEc0I7QUFFaEMsY0FBUSxPQUFSLEdBQWtCLFFBQVEsT0FBUixJQUFtQixFQUFuQixDQUZjO0FBR2hDLGNBQVEsT0FBUixDQUFnQixJQUFoQixHQUF1QixZQUFZLEdBQVosQ0FBZ0IsVUFBUyxJQUFULEVBQWU7QUFBRSxlQUFPLEtBQUssUUFBTCxFQUFQLENBQUY7T0FBZixDQUF2QyxDQUhnQztBQUloQyxhQUFPLEtBQUssUUFBTCxDQUFjLE1BQWQsRUFBc0IsSUFBdEIsRUFBNEIsT0FBNUIsQ0FBUCxDQUpnQzs7Ozs0QkFNMUIsTUFBTSxTQUFTLGFBQWE7QUFDbEMsZ0JBQVUsV0FBVyxFQUFYLENBRHdCO0FBRWxDLGNBQVEsT0FBUixHQUFrQixRQUFRLE9BQVIsSUFBbUIsRUFBbkIsQ0FGZ0I7QUFHbEMsY0FBUSxPQUFSLENBQWdCLElBQWhCLEdBQXVCLFlBQVksR0FBWixDQUFnQixVQUFTLElBQVQsRUFBZTtBQUFFLGVBQU8sS0FBSyxRQUFMLEVBQVAsQ0FBRjtPQUFmLENBQXZDLENBSGtDO0FBSWxDLGFBQU8sS0FBSyxRQUFMLENBQWMsUUFBZCxFQUF3QixJQUF4QixFQUE4QixPQUE5QixDQUFQLENBSmtDOzs7OzZCQU0zQixRQUFRLE1BQU0sU0FBUyxNQUFNO0FBQ3BDLGdCQUFVLFdBQVcsRUFBWCxDQUQwQjtBQUVwQyxXQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUseUVBQWYsRUFGb0M7QUFHcEMsYUFBTyxLQUFLLE1BQUwsQ0FBWSxRQUFRLE1BQVIsQ0FBZSxFQUFmLEVBQW1CLE9BQW5CLEVBQTRCO0FBQzdDLGdCQUFRLE1BQVI7QUFDQSxhQUFLLEtBQUssa0JBQUwsQ0FBd0IsY0FBeEIsQ0FBdUMsSUFBdkMsQ0FBTDtBQUNBLGNBQU0sSUFBTjtPQUhpQixDQUFaLENBQVAsQ0FIb0M7Ozs7U0F4Q25COzs7Ozs7QUNMckI7Ozs7OztBQUlBOzs7O0FBQ0E7Ozs7OztBQUhBLElBQU0sY0FBYyxvQkFBZDs7O0FBTU4sUUFDRyxNQURILENBQ1UsV0FEVixFQUN1QixFQUR2QixFQUdHLE9BSEgsQ0FHVyxXQUhYLHVCQUlHLE9BSkgsQ0FJVyxZQUpYLHVCQU1HLEtBTkgsQ0FNUyxZQU5UOztrQkFTZTs7O0FDakJmOzs7Ozs7Ozs7Ozs7OztJQUtxQjs7Ozs7O0FBS25CLFdBTG1CLFVBS25CLENBQVksWUFBWixFQUEwQixVQUExQixFQUFzQzswQkFMbkIsWUFLbUI7O0FBQ3BDLFNBQUssWUFBTCxHQUFvQixZQUFwQixDQURvQztBQUVwQyxTQUFLLFVBQUwsR0FBa0IsUUFBUSxNQUFSLENBQ2hCO0FBQ0UsV0FBSyxJQUFMO0FBQ0EsY0FBUSxJQUFSO0FBQ0EsV0FBSyxJQUFMO0FBQ0EsZ0JBQVUsSUFBVjtBQUNBLGFBQU8sSUFBUDtBQUNBLGFBQU8sSUFBUDtBQUNBLFlBQU0sSUFBTjtLQVJjLEVBVWhCLFVBVmdCLENBQWxCLENBRm9DO0dBQXRDOzs7Ozs7ZUFMbUI7OytCQXVCUjtBQUNULFVBQUksU0FBUyxNQUFNLEtBQUssWUFBTCxHQUFvQixHQUExQjtVQUNULFNBQVMsRUFBVCxDQUZLOztBQUlULFdBQUksSUFBSSxTQUFKLElBQWlCLEtBQUssVUFBTCxFQUFpQjtBQUNwQyxZQUFJLGFBQWEsS0FBSyxVQUFMLENBQWdCLFNBQWhCLENBQWIsQ0FEZ0M7QUFFcEMsWUFBRyxVQUFILEVBQWU7QUFDYixpQkFBTyxJQUFQLENBQVksWUFBWSxJQUFaLEdBQW1CLFVBQW5CLEdBQWdDLEdBQWhDLENBQVosQ0FEYTtTQUFmO09BRkY7O0FBT0EsVUFBRyxPQUFPLE1BQVAsR0FBZ0IsQ0FBaEIsRUFBbUI7QUFDcEIsZUFBTyxNQUFQLENBRG9CO09BQXRCOztBQUlBLGVBQVMsU0FBUyxHQUFULEdBQWUsT0FBTyxJQUFQLENBQVksR0FBWixDQUFmLENBZkE7O0FBaUJULGFBQU8sTUFBUCxDQWpCUzs7OztTQXZCUTs7Ozs7O0FDTHJCOzs7Ozs7Ozs7Ozs7O1FBTWdCOzs7O0FBQVQsU0FBUyxrQkFBVCxDQUE0QixHQUE1QixFQUFpQztBQUN0QyxTQUFPLEdBQVAsQ0FEc0M7Q0FBakM7O0lBSWM7QUFDbkIsV0FEbUIsd0JBQ25CLEdBQWM7MEJBREssMEJBQ0w7O0FBQ1osU0FBSyxlQUFMLEdBQXVCLFFBQXZCLENBRFk7QUFFWixTQUFLLGtCQUFMLEdBQTBCLFdBQTFCLENBRlk7QUFHWixTQUFLLHdCQUFMLEdBQWdDLENBQzlCLEdBRDhCLEVBRTlCLEdBRjhCLENBQWhDLENBSFk7QUFPWixTQUFLLFNBQUwsR0FBaUIsTUFBakIsQ0FQWTtBQVFaLFNBQUssa0JBQUwsR0FBMEIsS0FBMUIsQ0FSWTtBQVNaLFNBQUssZUFBTCxHQUF1QixrQkFBdkIsQ0FUWTtHQUFkOzs7Ozs7O2VBRG1COztzQ0FnQkQsZ0JBQWdCO0FBQ2hDLFdBQUssZUFBTCxHQUF1QixjQUF2QixDQURnQzs7Ozs7Ozs7O3lDQU9iLG1CQUFtQjtBQUN0QyxXQUFLLGtCQUFMLEdBQTBCLGlCQUExQixDQURzQzs7Ozs7Ozs7OytDQU9iLHlCQUF5QjtBQUNsRCxXQUFLLHdCQUFMLEdBQWdDLHVCQUFoQyxDQURrRDs7Ozs7Ozs7OzZDQU8zQix1QkFBdUI7QUFDOUMsV0FBSyx3QkFBTCxDQUE4QixJQUE5QixDQUFtQyxxQkFBbkMsRUFEOEM7Ozs7Ozs7OztnQ0FPcEMsVUFBVTtBQUNwQixXQUFLLFNBQUwsR0FBaUIsUUFBakIsQ0FEb0I7Ozs7Ozs7Ozt5Q0FPRCxtQkFBbUI7QUFDdEMsV0FBSyxrQkFBTCxHQUEwQixpQkFBMUIsQ0FEc0M7Ozs7Ozs7Ozs7O3NDQVN0QixnQkFBZ0I7QUFDaEMsV0FBSyxlQUFMLEdBQXVCLGNBQXZCLENBRGdDOzs7Ozs7Ozs7Ozt5QkFTN0IsTUFBTTtBQUNULFVBQUcsS0FBSyxlQUFMLEtBQXlCLGtCQUF6QixFQUE2QztBQUM5QyxhQUFLLEdBQUwsQ0FBUyxxR0FBVCxFQUQ4QztPQUFoRDs7QUFJQSxhQUFPLE9BQU8sTUFBUCxDQUFjO0FBQ25CLHdCQUFnQixLQUFLLGVBQUw7QUFDaEIsMkJBQW1CLEtBQUssa0JBQUw7QUFDbkIsaUNBQXlCLEtBQUssd0JBQUw7QUFDekIsa0JBQVUsS0FBSyxTQUFMO0FBQ1YsMkJBQW1CLEtBQUssa0JBQUw7QUFDbkIsd0JBQWdCLEtBQUssZUFBTDtPQU5YLENBQVAsQ0FMUzs7OztTQXJFUTs7Ozs7O0FDVnJCOzs7Ozs7QUFNQTs7Ozs7O0FBSkEsSUFBTSxjQUFjLDJCQUFkOzs7QUFPTixRQUNHLE1BREgsQ0FDVSxXQURWLEVBQ3VCLEVBRHZCLEVBR0csUUFISCxDQUdZLG1CQUhaOztrQkFNZTs7O0FDZmY7Ozs7Ozs7OztrQkFLd0I7QUFBVCxTQUFTLDRCQUFULENBQXNDLGFBQXRDLEVBQXFEO0FBQ2xFLGdCQUFjLFlBQWQsQ0FBMkIsSUFBM0IsQ0FBZ0MseUJBQWhDLEVBRGtFO0NBQXJEOzs7QUNMZjs7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQVBBLElBQU0sY0FBYywrQkFBZDs7O0FBVU4sUUFDRyxNQURILENBQ1UsV0FEVixFQUN1Qiw2Q0FEdkIsRUFNRyxNQU5ILDZCQVFHLE9BUkgsQ0FRVyx5QkFSWDs7a0JBV2U7OztBQ3ZCZjs7Ozs7a0JBTXdCOztBQUZ4Qjs7QUFGQSxJQUFNLGVBQWUsc0JBQWY7O0FBSVMsU0FBUyw4QkFBVCxDQUF3QyxpQkFBeEMsRUFBMkQsUUFBM0QsRUFBcUU7QUFDbEYsU0FBTztBQUNMLGFBQVMsZ0JBQVQ7QUFDQSxjQUFVLGlCQUFWO0dBRkY7Ozs7Ozs7QUFEa0YsV0FXekUsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUM7QUFDakMsUUFBRyxPQUFPLFFBQVEsT0FBUixDQUFnQixNQUFoQixLQUEyQixXQUFsQyxFQUErQztBQUNoRCxjQUFRLE9BQVIsQ0FBZ0IsTUFBaEIsR0FBeUIsWUFBekIsQ0FEZ0Q7S0FBbEQsTUFFTztBQUNMLGNBQVEsT0FBUixDQUFnQixNQUFoQixHQUF5QixDQUN2QixZQUR1QixFQUV2QixRQUFRLE9BQVIsQ0FBZ0IsTUFBaEIsQ0FGdUIsQ0FHdkIsSUFIdUIsQ0FHbEIsSUFIa0IsQ0FBekIsQ0FESztLQUZQOztBQVNBLFdBQU8sT0FBUCxDQVZpQztHQUFuQzs7Ozs7Ozs7QUFYa0YsV0E4QnpFLGlCQUFULENBQTJCLFFBQTNCLEVBQXFDO0FBQ25DLFFBQUk7QUFDRixVQUFHLHdCQUFNLFNBQVMsT0FBVCxDQUFpQixjQUFqQixDQUFOLEVBQXdDLElBQXhDLEtBQWlELFlBQWpELEVBQStEO0FBQ2hFLGVBQU8sNEJBQTRCLFFBQTVCLENBQVAsQ0FEZ0U7T0FBbEU7S0FERixDQUlFLE9BQU0sQ0FBTixFQUFTOztLQUFUO0FBR0YsUUFBRyxTQUFTLE1BQVQsQ0FBZ0IsUUFBaEIsRUFBMEI7QUFDM0IsYUFBTyw0QkFBNEIsUUFBNUIsQ0FBUCxDQUQyQjtLQUE3QjtBQUdBLFFBQUcsQ0FDQyxTQUFTLE9BQVQsQ0FBaUIsY0FBakIsTUFBcUMsa0JBQXJDLElBQ0EsU0FBUyxPQUFULENBQWlCLGNBQWpCLE1BQXFDLElBQXJDLENBRkQsSUFJRCxrQkFBa0IsaUJBQWxCLEVBQXFDO0FBQ3JDLGFBQU8sNEJBQTRCLFFBQTVCLENBQVAsQ0FEcUM7S0FKdkM7O0FBUUEsV0FBTyxRQUFQLENBbkJtQztHQUFyQztBQXFCQSxXQUFTLDJCQUFULENBQXFDLFFBQXJDLEVBQStDO0FBQzdDLFdBQU8sSUFBSSxRQUFKLENBQWEsU0FBUyxJQUFULEVBQWUsUUFBNUIsQ0FBUCxDQUQ2QztHQUEvQztDQW5EYTs7O0FDTmY7Ozs7OztBQUlBOzs7O0FBQ0E7Ozs7OztBQUhBLElBQU0sY0FBYyxhQUFkOzs7QUFNTixRQUNHLE1BREgsQ0FDVSxXQURWLEVBQ3VCLDhDQUR2Qjs7a0JBT2U7OztBQ2ZmOzs7OztrQkFXd0I7O0FBVHhCOzs7Ozs7Ozs7Ozs7O0FBU2UsU0FBUyxXQUFULENBQXFCLFFBQXJCLEVBQStCLFVBQS9CLEVBQTJDO0FBQ3hELFNBQU8sSUFBSSxlQUFRLFdBQVIsQ0FBb0IsUUFBeEIsRUFBa0MsU0FBbEMsQ0FBNEMsVUFBNUMsQ0FBUCxDQUR3RDtDQUEzQzs7O0FDWGY7Ozs7O2tCQVV3Qjs7QUFSeEI7Ozs7Ozs7Ozs7OztBQVFlLFNBQVMsd0JBQVQsQ0FBa0MsRUFBbEMsRUFBc0MsU0FBdEMsRUFBaUQsaUJBQWpELEVBQW9FO0FBQ2pGLFNBQU8saUJBQVA7Ozs7Ozs7QUFEaUYsV0FReEUsaUJBQVQsQ0FBMkIsUUFBM0IsRUFBcUMsUUFBckMsRUFBK0M7QUFDN0MsUUFBSSxPQUFPLElBQVA7UUFDQSxRQUFRLFVBQVUsR0FBVixDQUFjLE9BQWQsQ0FBUjs7Ozs7QUFGeUMsS0FPNUMsU0FBUyxJQUFULEdBQWdCO0FBQ2Ysb0NBQWUsSUFBZixFQUFxQjtBQUNuQixrQkFBVSxRQUFWO0FBQ0EsY0FBTSxJQUFOO0FBQ0EsZUFBTyxLQUFQO0FBQ0EsY0FBTSxJQUFOO0FBQ0EsZ0JBQVEsTUFBUjtBQUNBLGlCQUFTLE9BQVQ7QUFDQSxjQUFNLE9BQU47QUFDQSxlQUFPLEtBQVA7QUFDQSxpQkFBUyxPQUFUO09BVEYsRUFEZTtLQUFoQixDQUFEOzs7Ozs7Ozs7Ozs7QUFQNkMsYUErQnBDLFFBQVQsQ0FBa0IsTUFBbEIsRUFBMEIsR0FBMUIsRUFBK0IsU0FBL0IsRUFBMEMsSUFBMUMsRUFBZ0QsT0FBaEQsRUFBeUQ7QUFDdkQsVUFBSSxRQUFKLENBRHVEOztBQUd2RCxlQUFTLFVBQVUsS0FBVixDQUg4QztBQUl2RCxZQUFNLE9BQU8sa0JBQWtCLFFBQWxCLENBSjBDO0FBS3ZELGtCQUFZLGFBQWEsRUFBYixDQUwyQztBQU12RCxhQUFPLFFBQVEsSUFBUixDQU5nRDtBQU92RCxnQkFBVSxXQUFXLEVBQVgsQ0FQNkM7O0FBU3ZELFVBQUcsV0FBVyxLQUFYLElBQ0MsUUFBUSxrQkFBa0IsUUFBbEIsRUFBNEI7QUFDdEMsZUFBTyxHQUFHLE9BQUgsQ0FBVyxRQUFYLENBQVAsQ0FEc0M7T0FEeEM7O0FBS0EsVUFBRyxTQUFTLFlBQVQsQ0FBc0IsR0FBdEIsS0FDRCxNQUFNLE9BQU4sQ0FBYyxTQUFTLEdBQVQsQ0FBZCxDQURDLEVBQzZCO0FBQzlCLG1CQUFXLEVBQVgsQ0FEOEI7QUFFOUIsYUFBSSxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksU0FBUyxHQUFULEVBQWMsTUFBZCxFQUFzQixHQUF6QyxFQUE4QztBQUM1QyxtQkFBUyxJQUFULENBQWMsU0FBUyxHQUFULEVBQWMsQ0FBZCxFQUFpQixRQUFqQixHQUE0QixRQUE1QixDQUFxQyxNQUFyQyxFQUE2QyxNQUE3QyxFQUFxRCxTQUFyRCxFQUFnRSxJQUFoRSxFQUFzRSxPQUF0RSxDQUFkLEVBRDRDO1NBQTlDO0FBR0EsZUFBTyxHQUFHLEdBQUgsQ0FBTyxRQUFQLENBQVAsQ0FMOEI7T0FEaEM7O0FBU0EsVUFBRyxTQUFTLFlBQVQsQ0FBc0IsR0FBdEIsQ0FBSCxFQUErQjtBQUM3QixlQUFPLFNBQVMsR0FBVCxFQUFjLFFBQWQsR0FBeUIsUUFBekIsQ0FBa0MsTUFBbEMsRUFBMEMsTUFBMUMsRUFBa0QsU0FBbEQsRUFBNkQsSUFBN0QsRUFBbUUsT0FBbkUsQ0FBUCxDQUQ2QjtPQUEvQjs7QUFJQSxVQUFHLFNBQVMsUUFBVCxDQUFrQixHQUFsQixDQUFILEVBQTJCO0FBQ3pCLFlBQUksTUFBTSxTQUFTLEtBQVQsQ0FBZSxHQUFmLEVBQW9CLFNBQXBCLENBQU4sQ0FEcUI7O0FBR3pCLGdCQUFRLE1BQVIsQ0FBZSxPQUFmLEVBQXdCO0FBQ3RCLGtCQUFRLE1BQVI7QUFDQSxnQkFBTSxJQUFOO1NBRkYsRUFIeUI7O0FBUXpCLFlBQUcsTUFBTSxPQUFOLENBQWMsR0FBZCxDQUFILEVBQXVCO0FBQ3JCLHFCQUFXLEVBQVgsQ0FEcUI7QUFFckIsZUFBSSxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksSUFBSSxNQUFKLEVBQVksR0FBL0IsRUFBb0M7QUFDbEMscUJBQVMsSUFBVCxDQUFjLE1BQU0sUUFBUSxNQUFSLENBQWUsRUFBZixFQUFtQixPQUFuQixFQUE0QixFQUFDLEtBQUssSUFBSSxDQUFKLENBQUwsRUFBN0IsQ0FBTixDQUFkLEVBRGtDO1dBQXBDO0FBR0EsaUJBQU8sR0FBRyxHQUFILENBQU8sUUFBUCxDQUFQLENBTHFCO1NBQXZCOztBQVFBLGVBQU8sTUFBTSxRQUFRLE1BQVIsQ0FBZSxFQUFmLEVBQW1CLE9BQW5CLEVBQTRCO0FBQ3ZDLGVBQUssU0FBUyxLQUFULENBQWUsR0FBZixFQUFvQixTQUFwQixDQUFMO1NBRFcsQ0FBTixDQUFQLENBaEJ5QjtPQUEzQjs7QUFxQkEsYUFBTyxHQUFHLE1BQUgsQ0FBVSxJQUFJLEtBQUosQ0FBVSxXQUFXLEdBQVgsR0FBaUIsZ0JBQWpCLENBQXBCLENBQVAsQ0FoRHVEO0tBQXpEOzs7Ozs7Ozs7OztBQS9CNkMsYUEyRnBDLElBQVQsQ0FBYyxHQUFkLEVBQW1CLFNBQW5CLEVBQThCLE9BQTlCLEVBQXVDO0FBQ3JDLGFBQU8sU0FBUyxLQUFULEVBQWdCLEdBQWhCLEVBQXFCLFNBQXJCLEVBQWdDLFNBQWhDLEVBQTJDLE9BQTNDLENBQVAsQ0FEcUM7S0FBdkM7Ozs7Ozs7Ozs7O0FBM0Y2QyxhQXdHcEMsS0FBVCxDQUFlLEdBQWYsRUFBb0IsU0FBcEIsRUFBK0IsSUFBL0IsRUFBcUMsT0FBckMsRUFBOEM7QUFDNUMsYUFBTyxTQUFTLE1BQVQsRUFBaUIsR0FBakIsRUFBc0IsU0FBdEIsRUFBaUMsSUFBakMsRUFBdUMsT0FBdkMsQ0FBUCxDQUQ0QztLQUE5Qzs7Ozs7Ozs7Ozs7QUF4RzZDLGFBcUhwQyxJQUFULENBQWMsR0FBZCxFQUFtQixTQUFuQixFQUE4QixJQUE5QixFQUFvQyxPQUFwQyxFQUE2QztBQUMzQyxhQUFPLFNBQVMsS0FBVCxFQUFnQixHQUFoQixFQUFxQixTQUFyQixFQUFnQyxJQUFoQyxFQUFzQyxPQUF0QyxDQUFQLENBRDJDO0tBQTdDOzs7Ozs7Ozs7OztBQXJINkMsYUFrSXBDLE1BQVQsQ0FBZ0IsR0FBaEIsRUFBcUIsU0FBckIsRUFBZ0MsSUFBaEMsRUFBc0MsT0FBdEMsRUFBK0M7QUFDN0MsYUFBTyxTQUFTLE9BQVQsRUFBa0IsR0FBbEIsRUFBdUIsU0FBdkIsRUFBa0MsSUFBbEMsRUFBd0MsT0FBeEMsQ0FBUCxDQUQ2QztLQUEvQzs7Ozs7Ozs7OztBQWxJNkMsYUE4SXBDLE9BQVQsQ0FBaUIsR0FBakIsRUFBc0IsU0FBdEIsRUFBaUMsT0FBakMsRUFBMEM7QUFDeEMsYUFBTyxTQUFTLFFBQVQsRUFBbUIsR0FBbkIsRUFBd0IsU0FBeEIsRUFBbUMsU0FBbkMsRUFBOEMsT0FBOUMsQ0FBUCxDQUR3QztLQUExQzs7Ozs7Ozs7Ozs7QUE5STZDLGFBMkpwQyxLQUFULENBQWUsR0FBZixFQUFvQixTQUFwQixFQUErQixLQUEvQixFQUFzQyxPQUF0QyxFQUErQztBQUM3QyxnQkFBVSxXQUFXLEVBQVgsQ0FEbUM7QUFFN0MsY0FBUSxPQUFSLEdBQWtCLFFBQVEsT0FBUixJQUFtQixFQUFuQixDQUYyQjtBQUc3QyxjQUFRLE9BQVIsQ0FBZ0IsSUFBaEIsR0FBdUIsTUFBTSxHQUFOLENBQVUsWUFBVixDQUF2QixDQUg2QztBQUk3QyxhQUFPLFNBQVMsTUFBVCxFQUFpQixHQUFqQixFQUFzQixTQUF0QixFQUFpQyxTQUFqQyxFQUE0QyxPQUE1QyxDQUFQLENBSjZDO0tBQS9DOzs7Ozs7Ozs7OztBQTNKNkMsYUEyS3BDLE9BQVQsQ0FBaUIsR0FBakIsRUFBc0IsU0FBdEIsRUFBaUMsS0FBakMsRUFBd0MsT0FBeEMsRUFBaUQ7QUFDL0MsZ0JBQVUsV0FBVyxFQUFYLENBRHFDO0FBRS9DLGNBQVEsT0FBUixHQUFrQixRQUFRLE9BQVIsSUFBbUIsRUFBbkIsQ0FGNkI7QUFHL0MsY0FBUSxPQUFSLENBQWdCLElBQWhCLEdBQXVCLE1BQU0sR0FBTixDQUFVLFlBQVYsQ0FBdkIsQ0FIK0M7QUFJL0MsYUFBTyxTQUFTLFFBQVQsRUFBbUIsR0FBbkIsRUFBd0IsU0FBeEIsRUFBbUMsU0FBbkMsRUFBOEMsT0FBOUMsQ0FBUCxDQUorQztLQUFqRDs7Ozs7O0FBM0s2QyxhQXNMcEMsWUFBVCxDQUFzQixJQUF0QixFQUE0QjtBQUMxQixhQUFPLEtBQUssUUFBTCxFQUFQLENBRDBCO0tBQTVCO0dBdExGO0NBUmE7OztBQ1ZmOzs7Ozs7QUFLQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQU5BLElBQU0sY0FBYyxzQkFBZDs7O0FBU04sUUFDRyxNQURILENBQ1UsV0FEVixFQUN1Qix5QkFEdkIsRUFLRyxPQUxILENBS1csVUFMWCxzQkFPRyxPQVBILENBT1csbUJBUFg7O2tCQVVlOzs7QUNyQmY7Ozs7Ozs7O2tCQWF3Qjs7QUFYeEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQVFlLFNBQVMsZUFBVCxDQUNiLGlCQURhLEVBRWIsaUJBRmEsRUFHYjtBQUNBLFNBQU8sUUFBUDs7Ozs7O0FBREEsV0FPUyxRQUFULENBQWtCLElBQWxCLEVBQXdCLFFBQXhCLEVBQWtDO0FBQ2hDLFFBQUksT0FBTyxJQUFQO1FBQ0EsUUFBUSxFQUFSO1FBQ0EsV0FBVyxFQUFYO1FBQ0EsTUFISjs7Ozs7QUFEZ0MsS0FTL0IsU0FBUyxJQUFULEdBQWdCO0FBQ2YsVUFBRyxRQUFPLG1EQUFQLEtBQWdCLFFBQWhCLElBQ0QsU0FBUyxJQUFULEVBQWU7QUFDZixlQUFPLEVBQVAsQ0FEZTtPQURqQjtBQUlBLHVCQUxlO0FBTWYsMkJBTmU7QUFPZix3QkFQZTtBQVFmLDBCQVJlOztBQVVmLG9DQUFlLElBQWYsRUFBcUI7QUFDbkIsa0JBQVUsUUFBVjtBQUNBLHNCQUFjLFlBQWQ7QUFDQSxjQUFNLElBQU47QUFDQSxlQUFPLEtBQVA7QUFDQSxlQUFPLEtBQVA7QUFDQSxlQUFPLEtBQVA7QUFDQSxrQkFBVSxRQUFWO0FBQ0EsbUJBQVcsU0FBWDtPQVJGLEVBVmU7S0FBaEIsQ0FBRDs7Ozs7QUFUZ0MsYUFrQ3ZCLGNBQVQsR0FBMEI7QUFDeEIsV0FBSSxJQUFJLFlBQUosSUFBb0IsSUFBeEIsRUFBOEI7QUFDNUIsWUFBRyxDQUFDLEtBQUssY0FBTCxDQUFvQixZQUFwQixDQUFELEVBQW9DO0FBQ3JDLG1CQURxQztTQUF2QztBQUdBLFlBQUcsZUFBZSxZQUFmLENBQUgsRUFBaUM7QUFDL0IsbUJBRCtCO1NBQWpDO0FBR0Esc0NBQWUsSUFBZixFQUFxQixZQUFyQixFQUFtQyxLQUFLLFlBQUwsQ0FBbkMsRUFQNEI7T0FBOUI7S0FERjs7Ozs7QUFsQ2dDLGFBaUR2QixlQUFULEdBQTJCO0FBQ3pCLFVBQUcsUUFBTyxLQUFLLGtCQUFrQixjQUFsQixFQUFaLEtBQWtELFFBQWxELEVBQTREO0FBQzdELGVBRDZEO09BQS9EOztBQUlBLGFBQ0csSUFESCxDQUNRLEtBQUssa0JBQWtCLGNBQWxCLENBRGIsRUFFRyxPQUZILENBRVcsVUFBUyxHQUFULEVBQWM7QUFDckIsWUFBSSxPQUFPLEtBQUssa0JBQWtCLGNBQWxCLENBQUwsQ0FBdUMsR0FBdkMsQ0FBUCxDQURpQjtBQUVyQixjQUFNLEdBQU4sSUFBYSw2QkFBYyxTQUFTLE1BQVQsQ0FBZ0IsR0FBaEIsRUFBcUIsSUFBbkMsQ0FBYixDQUZxQjtPQUFkLENBRlgsQ0FMeUI7S0FBM0I7Ozs7O0FBakRnQyxhQWlFdkIsa0JBQVQsR0FBOEI7QUFDNUIsVUFBRyxRQUFPLEtBQUssa0JBQWtCLGlCQUFsQixFQUFaLEtBQXFELFFBQXJELEVBQStEO0FBQ2hFLGVBRGdFO09BQWxFOztBQUlBLGFBQ0csSUFESCxDQUNRLEtBQUssa0JBQWtCLGlCQUFsQixDQURiLEVBRUcsT0FGSCxDQUVXLFVBQVMsR0FBVCxFQUFjO0FBQ3JCLHNCQUFjLEdBQWQsRUFBbUIsS0FBSyxrQkFBa0IsaUJBQWxCLENBQUwsQ0FBMEMsR0FBMUMsQ0FBbkIsRUFEcUI7T0FBZCxDQUZYLENBTDRCO0tBQTlCOzs7OztBQWpFZ0MsYUFnRnZCLGlCQUFULEdBQTZCO0FBQzNCLGVBQVMsSUFBSSxpQkFBSixDQUFzQixJQUF0QixFQUE0QixRQUE1QixDQUFULENBRDJCO0tBQTdCOzs7Ozs7OztBQWhGZ0MsYUEwRnZCLGFBQVQsQ0FBdUIsR0FBdkIsRUFBNEIsU0FBNUIsRUFBdUM7QUFDckMsVUFBSSxNQUFNLE9BQU4sQ0FBYyxTQUFkLENBQUosRUFBOEI7QUFDNUIsaUJBQVMsR0FBVCxJQUFnQixFQUFoQixDQUQ0QjtBQUU1QixrQkFBVSxPQUFWLENBQWtCLFVBQVUsUUFBVixFQUFvQjtBQUNwQyxtQkFBUyxHQUFULEVBQWMsSUFBZCxDQUFtQixJQUFJLFFBQUosQ0FBYSxRQUFiLEVBQXVCLFFBQXZCLENBQW5CLEVBRG9DO1NBQXBCLENBQWxCLENBRjRCO0FBSzVCLGVBTDRCO09BQTlCO0FBT0EsZUFBUyxHQUFULElBQWdCLElBQUksUUFBSixDQUFhLFNBQWIsRUFBd0IsUUFBeEIsQ0FBaEIsQ0FScUM7S0FBdkM7Ozs7Ozs7QUExRmdDLGFBMEd2QixjQUFULENBQXdCLFlBQXhCLEVBQXNDO0FBQ3BDLFdBQUksSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLGtCQUFrQix1QkFBbEIsQ0FBMEMsTUFBMUMsRUFBa0QsR0FBckUsRUFBMEU7QUFDeEUsWUFBRyxhQUFhLE1BQWIsQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsTUFBOEIsa0JBQWtCLHVCQUFsQixDQUEwQyxDQUExQyxDQUE5QixFQUE0RTtBQUM3RSxpQkFBTyxJQUFQLENBRDZFO1NBQS9FO0FBR0EsWUFBRyxpQkFBaUIsa0JBQWtCLGNBQWxCLElBQ2xCLGlCQUFpQixrQkFBa0IsaUJBQWxCLEVBQXFDO0FBQ3RELGlCQUFPLElBQVAsQ0FEc0Q7U0FEeEQ7T0FKRjtBQVNBLGFBQU8sS0FBUCxDQVZvQztLQUF0Qzs7Ozs7O0FBMUdnQyxhQTJIdkIsUUFBVCxDQUFrQixHQUFsQixFQUF1QjtBQUNyQixhQUFPLE9BQU8sTUFBTSxHQUFOLENBQVAsS0FBc0IsV0FBdEIsQ0FEYztLQUF2Qjs7Ozs7O0FBM0hnQyxhQW1JdkIsWUFBVCxDQUFzQixHQUF0QixFQUEyQjtBQUN6QixhQUFPLE9BQU8sU0FBUyxHQUFULENBQVAsS0FBeUIsV0FBekIsQ0FEa0I7S0FBM0I7Ozs7OztBQW5JZ0MsYUEySXZCLElBQVQsQ0FBYyxHQUFkLEVBQW1CO0FBQ2pCLGFBQU8sU0FBUyxHQUFULEtBQWlCLGFBQWEsR0FBYixDQUFqQixDQURVO0tBQW5COzs7Ozs7Ozs7QUEzSWdDLGFBc0p2QixLQUFULENBQWUsR0FBZixFQUFvQixVQUFwQixFQUFnQztBQUM5QixVQUFHLENBQUMsU0FBUyxHQUFULENBQUQsRUFBZ0I7QUFDakIsY0FBTSxJQUFJLEtBQUosQ0FBVSxXQUFXLEdBQVgsR0FBaUIsZ0JBQWpCLENBQWhCLENBRGlCO09BQW5COztBQUlBLFVBQUksT0FBTyxNQUFNLEdBQU4sQ0FBUDtVQUNBLE9BQU8sS0FBSyxJQUFMLENBTm1COztBQVE5QixVQUFHLE1BQU0sT0FBTixDQUFjLElBQWQsQ0FBSCxFQUF3QjtBQUN0QixlQUFPLEVBQVAsQ0FEc0I7QUFFdEIsYUFBSSxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksS0FBSyxNQUFMLEVBQWEsR0FBaEMsRUFBcUM7QUFDbkMsY0FBSSxVQUFVLEtBQUssQ0FBTCxDQUFWO2NBQ0EsVUFBVSxRQUFRLElBQVIsQ0FGcUI7QUFHbkMsY0FBRyxPQUFPLFFBQVEsU0FBUixLQUFzQixXQUE3QixJQUNELFFBQVEsU0FBUixFQUFtQjtBQUNuQixzQkFBVSwyQkFBWSxRQUFRLElBQVIsRUFBYyxVQUExQixDQUFWLENBRG1CO1dBRHJCO0FBSUEsb0JBQVUsa0JBQWtCLGNBQWxCLENBQWlDLE9BQWpDLENBQVYsQ0FQbUM7QUFRbkMsZUFBSyxJQUFMLENBQVUsT0FBVixFQVJtQztTQUFyQztPQUZGLE1BWU87QUFDTCxZQUFHLE9BQU8sS0FBSyxTQUFMLEtBQW1CLFdBQTFCLElBQ0QsS0FBSyxTQUFMLEVBQWdCO0FBQ2hCLGlCQUFPLDJCQUFZLEtBQUssSUFBTCxFQUFXLFVBQXZCLENBQVAsQ0FEZ0I7U0FEbEI7O0FBS0EsZUFBTyxrQkFBa0IsY0FBbEIsQ0FBaUMsSUFBakMsQ0FBUCxDQU5LO09BWlA7O0FBcUJBLGFBQU8sSUFBUCxDQTdCOEI7S0FBaEM7Ozs7Ozs7Ozs7QUF0SmdDLGFBOEx2QixLQUFULENBQWUsR0FBZixFQUFvQjtBQUNsQixVQUFHLENBQUMsU0FBUyxHQUFULENBQUQsRUFBZ0I7QUFDakIsY0FBTSxJQUFJLEtBQUosQ0FBVSxXQUFXLEdBQVgsR0FBaUIsZ0JBQWpCLENBQWhCLENBRGlCO09BQW5CO0FBR0EsVUFBSSxPQUFPLE1BQU0sR0FBTixDQUFQLENBSmM7QUFLbEIsYUFBTyxJQUFQLENBTGtCO0tBQXBCOzs7Ozs7Ozs7Ozs7QUE5TGdDLGFBZ052QixLQUFULENBQWUsSUFBZixFQUFxQjtBQUNuQixXQUFJLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxrQkFBa0IsdUJBQWxCLENBQTBDLE1BQTFDLEVBQWtELEdBQXJFLEVBQTBFO0FBQ3hFLFlBQUksV0FBVyxrQkFBa0IsdUJBQWxCLENBQTBDLENBQTFDLElBQStDLElBQS9DLENBRHlEO0FBRXhFLGVBQU8sS0FBSyxRQUFMLENBQVAsQ0FGd0U7T0FBMUU7S0FERjs7Ozs7OztBQWhOZ0MsYUE0TnZCLFNBQVQsR0FBcUI7QUFDbkIsYUFBTyxRQUFQLENBRG1CO0tBQXJCOzs7Ozs7O0FBNU5nQyxhQXFPdkIsUUFBVCxHQUFvQjtBQUNsQixhQUFPLE1BQVAsQ0FEa0I7S0FBcEI7R0FyT0Y7Q0FWYTs7O0FDYmY7Ozs7Ozs7Ozs7OztrQkFRd0I7QUFBVCxTQUFTLGNBQVQsQ0FBd0IsTUFBeEIsRUFBZ0MsR0FBaEMsRUFBcUMsS0FBckMsRUFBNEM7QUFDekQsU0FBTyxjQUFQLENBQXNCLE1BQXRCLEVBQThCLEdBQTlCLEVBQW1DO0FBQ2pDLGtCQUFjLEtBQWQ7QUFDQSxnQkFBWSxJQUFaO0FBQ0EsV0FBTyxLQUFQO0FBQ0EsY0FBVSxJQUFWO0dBSkYsRUFEeUQ7Q0FBNUM7OztBQ1JmOzs7Ozs7Ozs7OztrQkFPd0I7QUFBVCxTQUFTLGNBQVQsQ0FBd0IsTUFBeEIsRUFBZ0MsSUFBaEMsRUFBc0M7QUFDbkQsT0FBSSxJQUFJLEdBQUosSUFBVyxJQUFmLEVBQXFCO0FBQ25CLFdBQU8sY0FBUCxDQUFzQixNQUF0QixFQUE4QixHQUE5QixFQUFtQztBQUNqQyxvQkFBYyxLQUFkO0FBQ0Esa0JBQVksS0FBWjtBQUNBLGFBQU8sS0FBSyxHQUFMLENBQVA7S0FIRixFQURtQjtHQUFyQjtDQURhOzs7QUNQZjs7Ozs7a0JBU3dCOztBQVB4Qjs7Ozs7Ozs7Ozs7QUFPZSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsRUFBZ0MsSUFBaEMsRUFBc0M7QUFDbkQsTUFBSSxNQUFNLE9BQU4sQ0FBYyxJQUFkLENBQUosRUFBeUI7QUFDdkIsV0FBTyxLQUFLLEdBQUwsQ0FBUyxVQUFVLElBQVYsRUFBZ0I7QUFDOUIsYUFBTyxjQUFjLE9BQWQsRUFBdUIsSUFBdkIsQ0FBUCxDQUQ4QjtLQUFoQixDQUFoQixDQUR1QjtHQUF6QjtBQUtBLE1BQUcsT0FBTyxJQUFQLEtBQWdCLFFBQWhCLEVBQTBCO0FBQzNCLFdBQU87QUFDTCxZQUFNLDBCQUFXLE9BQVgsRUFBb0IsSUFBcEIsQ0FBTjtLQURGLENBRDJCO0dBQTdCO0FBS0EsTUFBRyxPQUFPLEtBQUssSUFBTCxLQUFjLFFBQXJCLEVBQStCO0FBQ2hDLFNBQUssSUFBTCxHQUFZLDBCQUFXLE9BQVgsRUFBb0IsS0FBSyxJQUFMLENBQWhDLENBRGdDO0FBRWhDLFdBQU8sSUFBUCxDQUZnQztHQUFsQztBQUlBLE1BQUcsTUFBTSxPQUFOLENBQWMsS0FBSyxJQUFMLENBQWpCLEVBQTZCO0FBQzNCLFdBQU8sS0FBSyxJQUFMLENBQVUsR0FBVixDQUFjLFVBQVUsSUFBVixFQUFnQjtBQUNuQyxVQUFJLFVBQVUsUUFBUSxNQUFSLENBQWUsRUFBZixFQUFtQixJQUFuQixFQUF5QjtBQUNyQyxjQUFNLElBQU47T0FEWSxDQUFWLENBRCtCO0FBSW5DLGFBQU8sY0FBYyxPQUFkLEVBQXVCLE9BQXZCLENBQVAsQ0FKbUM7S0FBaEIsQ0FBckIsQ0FEMkI7R0FBN0I7QUFRQSxTQUFPO0FBQ0wsVUFBTSxPQUFOO0dBREYsQ0F2Qm1EO0NBQXRDOzs7QUNUZjs7Ozs7Ozs7Ozs7OztrQkFTd0I7QUFBVCxTQUFTLFVBQVQsQ0FBb0IsT0FBcEIsRUFBNkIsSUFBN0IsRUFBbUM7QUFDaEQsTUFBSSxhQUFhLEVBQWI7TUFDQSxZQUFZLDhDQUFaO01BQ0EsZ0JBQWdCLFVBQVUsSUFBVixDQUFlLE9BQWYsQ0FBaEI7TUFDQSxZQUFZLFVBQVUsSUFBVixDQUFlLElBQWYsQ0FBWixDQUo0Qzs7QUFNaEQsT0FBSyxJQUFJLFlBQVksQ0FBWixFQUFlLFlBQVksQ0FBWixFQUFlLFdBQXZDLEVBQW9EO0FBQ2xELFFBQUksVUFBVSxTQUFWLENBQUosRUFBMEI7QUFDeEIsb0JBQWMsVUFBVSxTQUFWLENBQWQsQ0FEd0I7S0FBMUIsTUFFTztBQUNMLG9CQUFjLGNBQWMsU0FBZCxDQUFkLENBREs7S0FGUDtHQURGOztBQVFBLFNBQU8sVUFBUCxDQWRnRDtDQUFuQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiFcbiAqIGNvbnRlbnQtdHlwZVxuICogQ29weXJpZ2h0KGMpIDIwMTUgRG91Z2xhcyBDaHJpc3RvcGhlciBXaWxzb25cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qKlxuICogUmVnRXhwIHRvIG1hdGNoICooIFwiO1wiIHBhcmFtZXRlciApIGluIFJGQyA3MjMxIHNlYyAzLjEuMS4xXG4gKlxuICogcGFyYW1ldGVyICAgICA9IHRva2VuIFwiPVwiICggdG9rZW4gLyBxdW90ZWQtc3RyaW5nIClcbiAqIHRva2VuICAgICAgICAgPSAxKnRjaGFyXG4gKiB0Y2hhciAgICAgICAgID0gXCIhXCIgLyBcIiNcIiAvIFwiJFwiIC8gXCIlXCIgLyBcIiZcIiAvIFwiJ1wiIC8gXCIqXCJcbiAqICAgICAgICAgICAgICAgLyBcIitcIiAvIFwiLVwiIC8gXCIuXCIgLyBcIl5cIiAvIFwiX1wiIC8gXCJgXCIgLyBcInxcIiAvIFwiflwiXG4gKiAgICAgICAgICAgICAgIC8gRElHSVQgLyBBTFBIQVxuICogICAgICAgICAgICAgICA7IGFueSBWQ0hBUiwgZXhjZXB0IGRlbGltaXRlcnNcbiAqIHF1b3RlZC1zdHJpbmcgPSBEUVVPVEUgKiggcWR0ZXh0IC8gcXVvdGVkLXBhaXIgKSBEUVVPVEVcbiAqIHFkdGV4dCAgICAgICAgPSBIVEFCIC8gU1AgLyAleDIxIC8gJXgyMy01QiAvICV4NUQtN0UgLyBvYnMtdGV4dFxuICogb2JzLXRleHQgICAgICA9ICV4ODAtRkZcbiAqIHF1b3RlZC1wYWlyICAgPSBcIlxcXCIgKCBIVEFCIC8gU1AgLyBWQ0hBUiAvIG9icy10ZXh0IClcbiAqL1xudmFyIHBhcmFtUmVnRXhwID0gLzsgKihbISMkJSYnXFwqXFwrXFwtXFwuXFxeX2BcXHx+MC05QS1aYS16XSspICo9ICooXCIoPzpbXFx1MDAwYlxcdTAwMjBcXHUwMDIxXFx1MDAyMy1cXHUwMDViXFx1MDA1ZC1cXHUwMDdlXFx1MDA4MC1cXHUwMGZmXXxcXFxcW1xcdTAwMGJcXHUwMDIwLVxcdTAwZmZdKSpcInxbISMkJSYnXFwqXFwrXFwtXFwuXFxeX2BcXHx+MC05QS1aYS16XSspICovZ1xudmFyIHRleHRSZWdFeHAgPSAvXltcXHUwMDBiXFx1MDAyMC1cXHUwMDdlXFx1MDA4MC1cXHUwMGZmXSskL1xudmFyIHRva2VuUmVnRXhwID0gL15bISMkJSYnXFwqXFwrXFwtXFwuXFxeX2BcXHx+MC05QS1aYS16XSskL1xuXG4vKipcbiAqIFJlZ0V4cCB0byBtYXRjaCBxdW90ZWQtcGFpciBpbiBSRkMgNzIzMCBzZWMgMy4yLjZcbiAqXG4gKiBxdW90ZWQtcGFpciA9IFwiXFxcIiAoIEhUQUIgLyBTUCAvIFZDSEFSIC8gb2JzLXRleHQgKVxuICogb2JzLXRleHQgICAgPSAleDgwLUZGXG4gKi9cbnZhciBxZXNjUmVnRXhwID0gL1xcXFwoW1xcdTAwMGJcXHUwMDIwLVxcdTAwZmZdKS9nXG5cbi8qKlxuICogUmVnRXhwIHRvIG1hdGNoIGNoYXJzIHRoYXQgbXVzdCBiZSBxdW90ZWQtcGFpciBpbiBSRkMgNzIzMCBzZWMgMy4yLjZcbiAqL1xudmFyIHF1b3RlUmVnRXhwID0gLyhbXFxcXFwiXSkvZ1xuXG4vKipcbiAqIFJlZ0V4cCB0byBtYXRjaCB0eXBlIGluIFJGQyA2ODM4XG4gKlxuICogbWVkaWEtdHlwZSA9IHR5cGUgXCIvXCIgc3VidHlwZVxuICogdHlwZSAgICAgICA9IHRva2VuXG4gKiBzdWJ0eXBlICAgID0gdG9rZW5cbiAqL1xudmFyIHR5cGVSZWdFeHAgPSAvXlshIyQlJidcXCpcXCtcXC1cXC5cXF5fYFxcfH4wLTlBLVphLXpdK1xcL1shIyQlJidcXCpcXCtcXC1cXC5cXF5fYFxcfH4wLTlBLVphLXpdKyQvXG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKiBAcHVibGljXG4gKi9cblxuZXhwb3J0cy5mb3JtYXQgPSBmb3JtYXRcbmV4cG9ydHMucGFyc2UgPSBwYXJzZVxuXG4vKipcbiAqIEZvcm1hdCBvYmplY3QgdG8gbWVkaWEgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKiBAcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0KG9iaikge1xuICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FyZ3VtZW50IG9iaiBpcyByZXF1aXJlZCcpXG4gIH1cblxuICB2YXIgcGFyYW1ldGVycyA9IG9iai5wYXJhbWV0ZXJzXG4gIHZhciB0eXBlID0gb2JqLnR5cGVcblxuICBpZiAoIXR5cGUgfHwgIXR5cGVSZWdFeHAudGVzdCh0eXBlKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludmFsaWQgdHlwZScpXG4gIH1cblxuICB2YXIgc3RyaW5nID0gdHlwZVxuXG4gIC8vIGFwcGVuZCBwYXJhbWV0ZXJzXG4gIGlmIChwYXJhbWV0ZXJzICYmIHR5cGVvZiBwYXJhbWV0ZXJzID09PSAnb2JqZWN0Jykge1xuICAgIHZhciBwYXJhbVxuICAgIHZhciBwYXJhbXMgPSBPYmplY3Qua2V5cyhwYXJhbWV0ZXJzKS5zb3J0KClcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFyYW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBwYXJhbSA9IHBhcmFtc1tpXVxuXG4gICAgICBpZiAoIXRva2VuUmVnRXhwLnRlc3QocGFyYW0pKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludmFsaWQgcGFyYW1ldGVyIG5hbWUnKVxuICAgICAgfVxuXG4gICAgICBzdHJpbmcgKz0gJzsgJyArIHBhcmFtICsgJz0nICsgcXN0cmluZyhwYXJhbWV0ZXJzW3BhcmFtXSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RyaW5nXG59XG5cbi8qKlxuICogUGFyc2UgbWVkaWEgdHlwZSB0byBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSBzdHJpbmdcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZShzdHJpbmcpIHtcbiAgaWYgKCFzdHJpbmcpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBzdHJpbmcgaXMgcmVxdWlyZWQnKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBzdHJpbmcgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gc3VwcG9ydCByZXEvcmVzLWxpa2Ugb2JqZWN0cyBhcyBhcmd1bWVudFxuICAgIHN0cmluZyA9IGdldGNvbnRlbnR0eXBlKHN0cmluZylcblxuICAgIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY29udGVudC10eXBlIGhlYWRlciBpcyBtaXNzaW5nIGZyb20gb2JqZWN0Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYXJndW1lbnQgc3RyaW5nIGlzIHJlcXVpcmVkIHRvIGJlIGEgc3RyaW5nJylcbiAgfVxuXG4gIHZhciBpbmRleCA9IHN0cmluZy5pbmRleE9mKCc7JylcbiAgdmFyIHR5cGUgPSBpbmRleCAhPT0gLTFcbiAgICA/IHN0cmluZy5zdWJzdHIoMCwgaW5kZXgpLnRyaW0oKVxuICAgIDogc3RyaW5nLnRyaW0oKVxuXG4gIGlmICghdHlwZVJlZ0V4cC50ZXN0KHR5cGUpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaW52YWxpZCBtZWRpYSB0eXBlJylcbiAgfVxuXG4gIHZhciBrZXlcbiAgdmFyIG1hdGNoXG4gIHZhciBvYmogPSBuZXcgQ29udGVudFR5cGUodHlwZS50b0xvd2VyQ2FzZSgpKVxuICB2YXIgdmFsdWVcblxuICBwYXJhbVJlZ0V4cC5sYXN0SW5kZXggPSBpbmRleFxuXG4gIHdoaWxlIChtYXRjaCA9IHBhcmFtUmVnRXhwLmV4ZWMoc3RyaW5nKSkge1xuICAgIGlmIChtYXRjaC5pbmRleCAhPT0gaW5kZXgpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludmFsaWQgcGFyYW1ldGVyIGZvcm1hdCcpXG4gICAgfVxuXG4gICAgaW5kZXggKz0gbWF0Y2hbMF0ubGVuZ3RoXG4gICAga2V5ID0gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKVxuICAgIHZhbHVlID0gbWF0Y2hbMl1cblxuICAgIGlmICh2YWx1ZVswXSA9PT0gJ1wiJykge1xuICAgICAgLy8gcmVtb3ZlIHF1b3RlcyBhbmQgZXNjYXBlc1xuICAgICAgdmFsdWUgPSB2YWx1ZVxuICAgICAgICAuc3Vic3RyKDEsIHZhbHVlLmxlbmd0aCAtIDIpXG4gICAgICAgIC5yZXBsYWNlKHFlc2NSZWdFeHAsICckMScpXG4gICAgfVxuXG4gICAgb2JqLnBhcmFtZXRlcnNba2V5XSA9IHZhbHVlXG4gIH1cblxuICBpZiAoaW5kZXggIT09IC0xICYmIGluZGV4ICE9PSBzdHJpbmcubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaW52YWxpZCBwYXJhbWV0ZXIgZm9ybWF0JylcbiAgfVxuXG4gIHJldHVybiBvYmpcbn1cblxuLyoqXG4gKiBHZXQgY29udGVudC10eXBlIGZyb20gcmVxL3JlcyBvYmplY3RzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fVxuICogQHJldHVybiB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBnZXRjb250ZW50dHlwZShvYmopIHtcbiAgaWYgKHR5cGVvZiBvYmouZ2V0SGVhZGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gcmVzLWxpa2VcbiAgICByZXR1cm4gb2JqLmdldEhlYWRlcignY29udGVudC10eXBlJylcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb2JqLmhlYWRlcnMgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gcmVxLWxpa2VcbiAgICByZXR1cm4gb2JqLmhlYWRlcnMgJiYgb2JqLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddXG4gIH1cbn1cblxuLyoqXG4gKiBRdW90ZSBhIHN0cmluZyBpZiBuZWNlc3NhcnkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbFxuICogQHJldHVybiB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBxc3RyaW5nKHZhbCkge1xuICB2YXIgc3RyID0gU3RyaW5nKHZhbClcblxuICAvLyBubyBuZWVkIHRvIHF1b3RlIHRva2Vuc1xuICBpZiAodG9rZW5SZWdFeHAudGVzdChzdHIpKSB7XG4gICAgcmV0dXJuIHN0clxuICB9XG5cbiAgaWYgKHN0ci5sZW5ndGggPiAwICYmICF0ZXh0UmVnRXhwLnRlc3Qoc3RyKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludmFsaWQgcGFyYW1ldGVyIHZhbHVlJylcbiAgfVxuXG4gIHJldHVybiAnXCInICsgc3RyLnJlcGxhY2UocXVvdGVSZWdFeHAsICdcXFxcJDEnKSArICdcIidcbn1cblxuLyoqXG4gKiBDbGFzcyB0byByZXByZXNlbnQgYSBjb250ZW50IHR5cGUuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBDb250ZW50VHlwZSh0eXBlKSB7XG4gIHRoaXMucGFyYW1ldGVycyA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgdGhpcy50eXBlID0gdHlwZVxufVxuIiwiLyoganNoaW50IG5vZGU6dHJ1ZSAqL1xuXG52YXIgVXJpVGVtcGxhdGUgPSByZXF1aXJlKCcuL1VyaVRlbXBsYXRlJyk7XG5cbmZ1bmN0aW9uIFJvdXRlcigpIHtcbiAgICB2YXIgcm91dGVzID0gW107XG5cbiAgICB0aGlzLmFkZCA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSwgaGFuZGxlcikge1xuXG4gICAgICAgIHJvdXRlcy5wdXNoKHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiBuZXcgVXJpVGVtcGxhdGUodGVtcGxhdGUpLFxuICAgICAgICAgICAgaGFuZGxlcjogaGFuZGxlclxuICAgICAgICB9KTsgLy9cblxuICAgIH07IC8vYWRkXG5cbiAgICB0aGlzLmhhbmRsZSA9IGZ1bmN0aW9uICh1cmwpIHtcblxuICAgICAgICByZXR1cm4gcm91dGVzLnNvbWUoZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHJvdXRlLnRlbXBsYXRlLnBhcnNlKHVybCk7XG4gICAgICAgICAgICByZXR1cm4gZGF0YSAmJiByb3V0ZS5oYW5kbGVyKGRhdGEpICE9PSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICB9OyAvL2V4ZWNcblxufSAvL1JvdXRlclxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvdXRlcjsiLCIvKiBqc2hpbnQgbm9kZTp0cnVlICovXG5cbm1vZHVsZS5leHBvcnRzID0gVXJpVGVtcGxhdGU7XG5cblxudmFyIG9wZXJhdG9yT3B0aW9ucyA9IHtcbiAgICBcIlwiOiB7XG4gICAgICAgIFwicHJlZml4XCI6IFwiXCIsXG4gICAgICAgIFwic2VwZXJhdG9yXCI6IFwiLFwiLFxuICAgICAgICBcImFzc2lnbm1lbnRcIjogZmFsc2UsXG4gICAgICAgIFwiYXNzaWduRW1wdHlcIjogZmFsc2UsXG4gICAgICAgIFwiZW5jb2RlXCI6IHBlcmNlbnRFbmNvZGVcbiAgICB9LFxuICAgIFwiK1wiOiB7XG4gICAgICAgIFwicHJlZml4XCI6IFwiXCIsXG4gICAgICAgIFwic2VwZXJhdG9yXCI6IFwiLFwiLFxuICAgICAgICBcImFzc2lnbm1lbnRcIjogZmFsc2UsXG4gICAgICAgIFwiYXNzaWduRW1wdHlcIjogZmFsc2UsXG4gICAgICAgIFwiZW5jb2RlXCI6IGVuY29kZVVSSVxuICAgIH0sXG4gICAgXCIjXCI6IHtcbiAgICAgICAgXCJwcmVmaXhcIjogXCIjXCIsXG4gICAgICAgIFwic2VwZXJhdG9yXCI6IFwiLFwiLFxuICAgICAgICBcImFzc2lnbm1lbnRcIjogZmFsc2UsXG4gICAgICAgIFwiYXNzaWduRW1wdHlcIjogZmFsc2UsXG4gICAgICAgIFwiZW5jb2RlXCI6IGVuY29kZVVSSVxuICAgIH0sXG4gICAgXCIuXCI6IHtcbiAgICAgICAgXCJwcmVmaXhcIjogXCIuXCIsXG4gICAgICAgIFwic2VwZXJhdG9yXCI6IFwiLlwiLFxuICAgICAgICBcImFzc2lnbm1lbnRcIjogZmFsc2UsXG4gICAgICAgIFwiYXNzaWduRW1wdHlcIjogZmFsc2UsXG4gICAgICAgIFwiZW5jb2RlXCI6IHBlcmNlbnRFbmNvZGVcbiAgICB9LFxuICAgIFwiL1wiOiB7XG4gICAgICAgIFwicHJlZml4XCI6IFwiL1wiLFxuICAgICAgICBcInNlcGVyYXRvclwiOiBcIi9cIixcbiAgICAgICAgXCJhc3NpZ25tZW50XCI6IGZhbHNlLFxuICAgICAgICBcImVuY29kZVwiOiBlbmNvZGVVUklDb21wb25lbnRcbiAgICB9LFxuICAgIFwiO1wiOiB7XG4gICAgICAgIFwicHJlZml4XCI6IFwiO1wiLFxuICAgICAgICBcInNlcGVyYXRvclwiOiBcIjtcIixcbiAgICAgICAgXCJhc3NpZ25tZW50XCI6IHRydWUsXG4gICAgICAgIFwiYXNzaWduRW1wdHlcIjogZmFsc2UsXG4gICAgICAgIFwiZW5jb2RlXCI6IGVuY29kZVVSSUNvbXBvbmVudFxuICAgIH0sXG4gICAgXCI/XCI6IHtcbiAgICAgICAgXCJwcmVmaXhcIjogXCI/XCIsXG4gICAgICAgIFwic2VwZXJhdG9yXCI6IFwiJlwiLFxuICAgICAgICBcImFzc2lnbm1lbnRcIjogdHJ1ZSxcbiAgICAgICAgXCJhc3NpZ25FbXB0eVwiOiB0cnVlLFxuICAgICAgICBcImVuY29kZVwiOiBlbmNvZGVVUklDb21wb25lbnRcbiAgICB9LFxuICAgIFwiJlwiOiB7XG4gICAgICAgIFwicHJlZml4XCI6IFwiJlwiLFxuICAgICAgICBcInNlcGVyYXRvclwiOiBcIiZcIixcbiAgICAgICAgXCJhc3NpZ25tZW50XCI6IHRydWUsXG4gICAgICAgIFwiYXNzaWduRW1wdHlcIjogdHJ1ZSxcbiAgICAgICAgXCJlbmNvZGVcIjogZW5jb2RlVVJJQ29tcG9uZW50XG4gICAgfVxufTsgLy9vcGVyYXRvck9wdGlvbnNcblxuZnVuY3Rpb24gcGVyY2VudEVuY29kZSh2YWx1ZSkge1xuICAgIC8qXG5cdGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0yLjNcblx0Ki9cbiAgICB2YXIgdW5yZXNlcnZlZCA9IFwiLS5fflwiO1xuXG4gICAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSkgcmV0dXJuICcnO1xuXG4gICAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuXG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbCh2YWx1ZSwgZnVuY3Rpb24gKGNoKSB7XG4gICAgICAgIHZhciBjaGFyQ29kZSA9IGNoLmNoYXJDb2RlQXQoMCk7XG5cbiAgICAgICAgaWYgKGNoYXJDb2RlID49IDB4MzAgJiYgY2hhckNvZGUgPD0gMHgzOSkgcmV0dXJuIGNoO1xuICAgICAgICBpZiAoY2hhckNvZGUgPj0gMHg0MSAmJiBjaGFyQ29kZSA8PSAweDVhKSByZXR1cm4gY2g7XG4gICAgICAgIGlmIChjaGFyQ29kZSA+PSAweDYxICYmIGNoYXJDb2RlIDw9IDB4N2EpIHJldHVybiBjaDtcblxuICAgICAgICBpZiAofnVucmVzZXJ2ZWQuaW5kZXhPZihjaCkpIHJldHVybiBjaDtcblxuICAgICAgICByZXR1cm4gJyUnICsgY2hhckNvZGUudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG4gICAgfSkuam9pbignJyk7XG5cbn0gLy9wZXJjZW50RW5jb2RlXG5cbmZ1bmN0aW9uIGlzRGVmaW5lZCh2YWx1ZSkge1xuICAgIHJldHVybiAhaXNVbmRlZmluZWQodmFsdWUpO1xufSAvL2lzRGVmaW5lZFxuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsdWUpIHtcbiAgICAvKlxuXHRodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NTcwI3NlY3Rpb24tMi4zXG5cdCovXG4gICAgaWYgKHZhbHVlID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRydWU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn0gLy9pc1VuZGVmaW5lZFxuXG5cbmZ1bmN0aW9uIFVyaVRlbXBsYXRlKHRlbXBsYXRlKSB7XG4gICAgLypcblx0aHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjU3MCNzZWN0aW9uLTIuMlxuXG5cdGV4cHJlc3Npb24gICAgPSAgXCJ7XCIgWyBvcGVyYXRvciBdIHZhcmlhYmxlLWxpc3QgXCJ9XCJcblx0b3BlcmF0b3IgICAgICA9ICBvcC1sZXZlbDIgLyBvcC1sZXZlbDMgLyBvcC1yZXNlcnZlXG5cdG9wLWxldmVsMiAgICAgPSAgXCIrXCIgLyBcIiNcIlxuXHRvcC1sZXZlbDMgICAgID0gIFwiLlwiIC8gXCIvXCIgLyBcIjtcIiAvIFwiP1wiIC8gXCImXCJcblx0b3AtcmVzZXJ2ZSAgICA9ICBcIj1cIiAvIFwiLFwiIC8gXCIhXCIgLyBcIkBcIiAvIFwifFwiXG5cdCovXG4gICAgdmFyIHJlVGVtcGxhdGUgPSAvXFx7KFtcXCsjXFwuXFwvO1xcPyY9XFwsIUBcXHxdPykoW0EtWmEtejAtOV9cXCxcXC5cXDpcXCpdKz8pXFx9L2c7XG4gICAgdmFyIHJlVmFyaWFibGUgPSAvXihbXFwkX2Etel1bXFwkX2EtejAtOV0qKSgoPzpcXDpbMS05XVswLTldP1swLTldP1swLTldPyk/KShcXCo/KSQvaTtcbiAgICB2YXIgbWF0Y2g7XG4gICAgdmFyIHBpZWNlcyA9IFtdO1xuICAgIHZhciBnbHVlcyA9IFtdO1xuICAgIHZhciBvZmZzZXQgPSAwO1xuICAgIHZhciBwaWVjZUNvdW50ID0gMDtcblxuICAgIHdoaWxlICggISEgKG1hdGNoID0gcmVUZW1wbGF0ZS5leGVjKHRlbXBsYXRlKSkpIHtcbiAgICAgICAgZ2x1ZXMucHVzaCh0ZW1wbGF0ZS5zdWJzdHJpbmcob2Zmc2V0LCBtYXRjaC5pbmRleCkpO1xuICAgICAgICAvKlxuXHRcdFRoZSBvcGVyYXRvciBjaGFyYWN0ZXJzIGVxdWFscyAoXCI9XCIpLCBjb21tYSAoXCIsXCIpLCBleGNsYW1hdGlvbiAoXCIhXCIpLFxuXHRcdGF0IHNpZ24gKFwiQFwiKSwgYW5kIHBpcGUgKFwifFwiKSBhcmUgcmVzZXJ2ZWQgZm9yIGZ1dHVyZSBleHRlbnNpb25zLlxuXHRcdCovXG4gICAgICAgIGlmIChtYXRjaFsxXSAmJiB+Jz0sIUB8Jy5pbmRleE9mKG1hdGNoWzFdKSkge1xuICAgICAgICAgICAgdGhyb3cgXCJvcGVyYXRvciAnXCIgKyBtYXRjaFsxXSArIFwiJyBpcyByZXNlcnZlZCBmb3IgZnV0dXJlIGV4dGVuc2lvbnNcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIG9mZnNldCA9IG1hdGNoLmluZGV4O1xuICAgICAgICBwaWVjZXMucHVzaCh7XG4gICAgICAgICAgICBvcGVyYXRvcjogbWF0Y2hbMV0sXG4gICAgICAgICAgICB2YXJpYWJsZXM6IG1hdGNoWzJdLnNwbGl0KCcsJykubWFwKHZhcmlhYmxlTWFwcGVyKVxuICAgICAgICB9KTtcbiAgICAgICAgb2Zmc2V0ICs9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgcGllY2VDb3VudCsrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhcmlhYmxlTWFwcGVyKHZhcmlhYmxlKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IHJlVmFyaWFibGUuZXhlYyh2YXJpYWJsZSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiBtYXRjaFsxXSxcbiAgICAgICAgICAgIG1heExlbmd0aDogbWF0Y2hbMl0gJiYgcGFyc2VJbnQobWF0Y2hbMl0uc3Vic3RyaW5nKDEpLCAxMCksXG4gICAgICAgICAgICBjb21wb3NpdGU6ICEhIG1hdGNoWzNdXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2x1ZXMucHVzaCh0ZW1wbGF0ZS5zdWJzdHJpbmcob2Zmc2V0KSk7XG5cbiAgICB0aGlzLnBhcnNlID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICB2YXIgZGF0YSA9IHt9O1xuICAgICAgICB2YXIgb2Zmc2V0ID0gMDtcbiAgICAgICAgdmFyIG9mZnNldHMgPSBbXTtcblxuICAgICAgICBpZiAoIWdsdWVzLmV2ZXJ5KGZ1bmN0aW9uIChnbHVlLCBnbHVlSW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBpbmRleDtcbiAgICAgICAgICAgIGlmIChnbHVlSW5kZXggPiAwICYmIGdsdWUgPT09ICcnKSBpbmRleCA9IHN0ci5sZW5ndGg7XG4gICAgICAgICAgICBlbHNlIGluZGV4ID0gc3RyLmluZGV4T2YoZ2x1ZSwgb2Zmc2V0KTtcblxuICAgICAgICAgICAgb2Zmc2V0ID0gaW5kZXg7XG4gICAgICAgICAgICBvZmZzZXRzLnB1c2gob2Zmc2V0KTtcbiAgICAgICAgICAgIG9mZnNldCArPSBnbHVlLmxlbmd0aDtcblxuICAgICAgICAgICAgcmV0dXJufiBpbmRleDtcbiAgICAgICAgfSkpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZiAoIXBpZWNlcy5ldmVyeShmdW5jdGlvbiAocGllY2UsIHBpZWNlSW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gb3BlcmF0b3JPcHRpb25zW3BpZWNlLm9wZXJhdG9yXTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSwgdmFsdWVzO1xuICAgICAgICAgICAgdmFyIG9mZnNldEJlZ2luID0gb2Zmc2V0c1twaWVjZUluZGV4XSArIGdsdWVzW3BpZWNlSW5kZXhdLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBvZmZzZXRFbmQgPSBvZmZzZXRzW3BpZWNlSW5kZXggKyAxXTtcblxuICAgICAgICAgICAgdmFsdWUgPSBzdHIuc3Vic3RyaW5nKG9mZnNldEJlZ2luLCBvZmZzZXRFbmQpO1xuICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBpZiAodmFsdWUuc3Vic3RyaW5nKDAsIG9wdGlvbnMucHJlZml4Lmxlbmd0aCkgIT09IG9wdGlvbnMucHJlZml4KSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cmluZyhvcHRpb25zLnByZWZpeC5sZW5ndGgpO1xuICAgICAgICAgICAgdmFsdWVzID0gdmFsdWUuc3BsaXQob3B0aW9ucy5zZXBlcmF0b3IpO1xuXG4gICAgICAgICAgICBpZiAoIXBpZWNlLnZhcmlhYmxlcy5ldmVyeShmdW5jdGlvbiAodmFyaWFibGUsIHZhcmlhYmxlSW5kZXgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB2YWx1ZXNbdmFyaWFibGVJbmRleF07XG4gICAgICAgICAgICAgICAgdmFyIG5hbWU7XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgICAgICAgICBuYW1lID0gdmFyaWFibGUubmFtZTtcblxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmFzc2lnbm1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLnN1YnN0cmluZygwLCBuYW1lLmxlbmd0aCkgIT09IG5hbWUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHJpbmcobmFtZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwICYmIG9wdGlvbnMuYXNzaWduRW1wdHkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZVswXSAhPT0gJz0nKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgZGF0YVtuYW1lXSA9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9KSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICB9KSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07IC8vcGFyc2VcblxuICAgIHRoaXMuc3RyaW5naWZ5ID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIHN0ciA9ICcnO1xuICAgICAgICBkYXRhID0gZGF0YSB8fCB7fTtcblxuICAgICAgICBzdHIgKz0gZ2x1ZXNbMF07XG4gICAgICAgIGlmICghcGllY2VzLmV2ZXJ5KGZ1bmN0aW9uIChwaWVjZSwgcGllY2VJbmRleCkge1xuXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG9wZXJhdG9yT3B0aW9uc1twaWVjZS5vcGVyYXRvcl07XG4gICAgICAgICAgICB2YXIgcGFydHM7XG5cbiAgICAgICAgICAgIHBhcnRzID0gcGllY2UudmFyaWFibGVzLm1hcChmdW5jdGlvbiAodmFyaWFibGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBkYXRhW3ZhcmlhYmxlLm5hbWVdO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkgdmFsdWUgPSBbdmFsdWVdO1xuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5maWx0ZXIoaXNEZWZpbmVkKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhcmlhYmxlLmNvbXBvc2l0ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLm1hcChmdW5jdGlvbiAodmFsdWUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gT2JqZWN0LmtleXModmFsdWUpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrZXlWYWx1ZSA9IHZhbHVlW2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYWJsZS5tYXhMZW5ndGgpIGtleVZhbHVlID0ga2V5VmFsdWUuc3Vic3RyaW5nKDAsIHZhcmlhYmxlLm1heExlbmd0aCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5VmFsdWUgPSBvcHRpb25zLmVuY29kZShrZXlWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleVZhbHVlKSBrZXlWYWx1ZSA9IGtleSArICc9JyArIGtleVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleVZhbHVlID0ga2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuYXNzaWduRW1wdHkpIGtleVZhbHVlICs9ICc9JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXlWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5qb2luKG9wdGlvbnMuc2VwZXJhdG9yKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFyaWFibGUubWF4TGVuZ3RoKSB2YWx1ZSA9IHZhbHVlLnN1YnN0cmluZygwLCB2YXJpYWJsZS5tYXhMZW5ndGgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBvcHRpb25zLmVuY29kZSh2YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5hc3NpZ25tZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkgdmFsdWUgPSB2YXJpYWJsZS5uYW1lICsgJz0nICsgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YXJpYWJsZS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuYXNzaWduRW1wdHkpIHZhbHVlICs9ICc9JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmpvaW4ob3B0aW9ucy5zZXBlcmF0b3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUubWFwKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModmFsdWUpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrZXlWYWx1ZSA9IHZhbHVlW2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYWJsZS5tYXhMZW5ndGgpIGtleVZhbHVlID0ga2V5VmFsdWUuc3Vic3RyaW5nKDAsIHZhcmlhYmxlLm1heExlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXkgKyAnLCcgKyBvcHRpb25zLmVuY29kZShrZXlWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuam9pbignLCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFyaWFibGUubWF4TGVuZ3RoKSB2YWx1ZSA9IHZhbHVlLnN1YnN0cmluZygwLCB2YXJpYWJsZS5tYXhMZW5ndGgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZW5jb2RlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5qb2luKCcsJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuYXNzaWdubWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB2YWx1ZSA9IHZhcmlhYmxlLm5hbWUgKyAnPScgKyB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFyaWFibGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5hc3NpZ25FbXB0eSkgdmFsdWUgKz0gJz0nO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcGFydHMgPSBwYXJ0cy5maWx0ZXIoaXNEZWZpbmVkKTtcbiAgICAgICAgICAgIGlmIChpc0RlZmluZWQocGFydHMpKSB7XG4gICAgICAgICAgICAgICAgc3RyICs9IG9wdGlvbnMucHJlZml4O1xuICAgICAgICAgICAgICAgIHN0ciArPSBwYXJ0cy5qb2luKG9wdGlvbnMuc2VwZXJhdG9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3RyICs9IGdsdWVzW3BpZWNlSW5kZXggKyAxXTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfTsgLy9zdHJpbmdpZnlcblxufSAvL1VyaVRlbXBsYXRlIiwiLyoganNoaW50IG5vZGU6dHJ1ZSAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBSb3V0ZXI6IHJlcXVpcmUoJy4vUm91dGVyJyksXG4gICAgVXJpVGVtcGxhdGU6IHJlcXVpcmUoJy4vVXJpVGVtcGxhdGUnKVxufTsiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVGhlIGhhbENsaWVudCBzZXJ2aWNlIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgJGh0dHAgZGlyZWN0bHkgaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFsQ2xpZW50IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7TG9nfSAgICAgICRsb2dcbiAgICogQHBhcmFtIHtIdHRwfSAgICAgJGh0dHBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gTGlua0hlYWRlclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAkaGFsQ29uZmlndXJhdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IoJGxvZywgJGh0dHAsIExpbmtIZWFkZXIsICRoYWxDb25maWd1cmF0aW9uKSB7XG4gICAgdGhpcy5fJGxvZyA9ICRsb2c7XG4gICAgdGhpcy5fJGh0dHAgPSAkaHR0cDtcbiAgICB0aGlzLl8kaGFsQ29uZmlndXJhdGlvbiA9ICRoYWxDb25maWd1cmF0aW9uO1xuICAgIHRoaXMuTGlua0hlYWRlciA9IExpbmtIZWFkZXI7XG4gIH1cbiAgJGdldChocmVmLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuJHJlcXVlc3QoJ0dFVCcsIGhyZWYsIG9wdGlvbnMpO1xuICB9XG4gICRwb3N0KGhyZWYsIG9wdGlvbnMsIGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy4kcmVxdWVzdCgnUE9TVCcsIGhyZWYsIG9wdGlvbnMsIGRhdGEpO1xuICB9XG4gICRwdXQoaHJlZiwgb3B0aW9ucywgZGF0YSkge1xuICAgIHJldHVybiB0aGlzLiRyZXF1ZXN0KCdQVVQnLCBocmVmLCBvcHRpb25zLCBkYXRhKTtcbiAgfVxuICAkcGF0Y2goaHJlZiwgb3B0aW9ucywgZGF0YSkge1xuICAgIHJldHVybiB0aGlzLiRyZXF1ZXN0KCdQQVRDSCcsIGhyZWYsIG9wdGlvbnMsIGRhdGEpO1xuICB9XG4gICRkZWxldGUoaHJlZiwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLiRyZXF1ZXN0KCdERUxFVEUnLCBocmVmLCBvcHRpb25zKTtcbiAgfVxuICAkbGluayhocmVmLCBvcHRpb25zLCBsaW5rSGVhZGVycykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCB7fTtcbiAgICBvcHRpb25zLmhlYWRlcnMuTGluayA9IGxpbmtIZWFkZXJzLm1hcChmdW5jdGlvbihsaW5rKSB7IHJldHVybiBsaW5rLnRvU3RyaW5nKCk7IH0pO1xuICAgIHJldHVybiB0aGlzLiRyZXF1ZXN0KCdMSU5LJywgaHJlZiwgb3B0aW9ucyk7XG4gIH1cbiAgJHVubGluayhocmVmLCBvcHRpb25zLCBsaW5rSGVhZGVycykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCB7fTtcbiAgICBvcHRpb25zLmhlYWRlcnMuTGluayA9IGxpbmtIZWFkZXJzLm1hcChmdW5jdGlvbihsaW5rKSB7IHJldHVybiBsaW5rLnRvU3RyaW5nKCk7IH0pO1xuICAgIHJldHVybiB0aGlzLiRyZXF1ZXN0KCdVTkxJTksnLCBocmVmLCBvcHRpb25zKTtcbiAgfVxuICAkcmVxdWVzdChtZXRob2QsIGhyZWYsIG9wdGlvbnMsIGRhdGEpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLl8kbG9nLmxvZygnVGhlIGhhbENsaWVudCBzZXJ2aWNlIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgJGh0dHAgZGlyZWN0bHkgaW5zdGVhZC4nKTtcbiAgICByZXR1cm4gdGhpcy5fJGh0dHAoYW5ndWxhci5leHRlbmQoe30sIG9wdGlvbnMsIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB0aGlzLl8kaGFsQ29uZmlndXJhdGlvbi51cmxUcmFuc2Zvcm1lcihocmVmKSxcbiAgICAgIGRhdGE6IGRhdGEsXG4gICAgfSkpO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IE1PRFVMRV9OQU1FID0gJ2FuZ3VsYXItaGFsLmNsaWVudCc7XG5cbmltcG9ydCBIYWxDbGllbnQgZnJvbSAnLi9oYWwtY2xpZW50JztcbmltcG9ydCBMaW5rSGVhZGVyIGZyb20gJy4vbGluay1oZWFkZXInO1xuXG4vLyBBZGQgbW9kdWxlIGZvciBjbGllbnRcbmFuZ3VsYXJcbiAgLm1vZHVsZShNT0RVTEVfTkFNRSwgW10pXG5cbiAgLnNlcnZpY2UoJ2hhbENsaWVudCcsIEhhbENsaWVudClcbiAgLnNlcnZpY2UoJyRoYWxDbGllbnQnLCBIYWxDbGllbnQpXG5cbiAgLnZhbHVlKCdMaW5rSGVhZGVyJywgTGlua0hlYWRlcilcbjtcblxuZXhwb3J0IGRlZmF1bHQgTU9EVUxFX05BTUU7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTGluayBIZWFkZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlua0hlYWRlciB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXJpUmVmZXJlbmNlIFRoZSBMaW5rIFZhbHVlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBsaW5rUGFyYW1zICAgVGhlIExpbmsgUGFyYW1zXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih1cmlSZWZlcmVuY2UsIGxpbmtQYXJhbXMpIHtcbiAgICB0aGlzLnVyaVJlZmVyZW5jZSA9IHVyaVJlZmVyZW5jZTtcbiAgICB0aGlzLmxpbmtQYXJhbXMgPSBhbmd1bGFyLmV4dGVuZChcbiAgICAgIHtcbiAgICAgICAgcmVsOiBudWxsLFxuICAgICAgICBhbmNob3I6IG51bGwsXG4gICAgICAgIHJldjogbnVsbCxcbiAgICAgICAgaHJlZmxhbmc6IG51bGwsXG4gICAgICAgIG1lZGlhOiBudWxsLFxuICAgICAgICB0aXRsZTogbnVsbCxcbiAgICAgICAgdHlwZTogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsaW5rUGFyYW1zXG4gICAgKTtcbiAgfVxuICAvKipcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cbiAgdG9TdHJpbmcoKSB7XG4gICAgdmFyIHJlc3VsdCA9ICc8JyArIHRoaXMudXJpUmVmZXJlbmNlICsgJz4nXG4gICAgICAsIHBhcmFtcyA9IFtdO1xuXG4gICAgZm9yKGxldCBwYXJhbU5hbWUgaW4gdGhpcy5saW5rUGFyYW1zKSB7XG4gICAgICBsZXQgcGFyYW1WYWx1ZSA9IHRoaXMubGlua1BhcmFtc1twYXJhbU5hbWVdO1xuICAgICAgaWYocGFyYW1WYWx1ZSkge1xuICAgICAgICBwYXJhbXMucHVzaChwYXJhbU5hbWUgKyAnPVwiJyArIHBhcmFtVmFsdWUgKyAnXCInKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihwYXJhbXMubGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICByZXN1bHQgPSByZXN1bHQgKyAnOycgKyBwYXJhbXMuam9pbignOycpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gbm9vcFVybFRyYW5zZm9ybWVyKHVybCkge1xuICByZXR1cm4gdXJsO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYWxDb25maWd1cmF0aW9uUHJvdmlkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9saW5rc0F0dHJpYnV0ZSA9ICdfbGlua3MnO1xuICAgIHRoaXMuX2VtYmVkZGVkQXR0cmlidXRlID0gJ19lbWJlZGRlZCc7XG4gICAgdGhpcy5faWdub3JlQXR0cmlidXRlUHJlZml4ZXMgPSBbXG4gICAgICAnXycsXG4gICAgICAnJCcsXG4gICAgXTtcbiAgICB0aGlzLl9zZWxmTGluayA9ICdzZWxmJztcbiAgICB0aGlzLl9mb3JjZUpTT05SZXNvdXJjZSA9IGZhbHNlO1xuICAgIHRoaXMuX3VybFRyYW5zZm9ybWVyID0gbm9vcFVybFRyYW5zZm9ybWVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBsaW5rc0F0dHJpYnV0ZVxuICAgKi9cbiAgc2V0TGlua3NBdHRyaWJ1dGUobGlua3NBdHRyaWJ1dGUpIHtcbiAgICB0aGlzLl9saW5rc0F0dHJpYnV0ZSA9IGxpbmtzQXR0cmlidXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBlbWJlZGRlZEF0dHJpYnV0ZVxuICAgKi9cbiAgc2V0RW1iZWRkZWRBdHRyaWJ1dGUoZW1iZWRkZWRBdHRyaWJ1dGUpIHtcbiAgICB0aGlzLl9lbWJlZGRlZEF0dHJpYnV0ZSA9IGVtYmVkZGVkQXR0cmlidXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7U3RyaW5nW119IGlnbm9yZUF0dHJpYnV0ZVByZWZpeGVzXG4gICAqL1xuICBzZXRJZ25vcmVBdHRyaWJ1dGVQcmVmaXhlcyhpZ25vcmVBdHRyaWJ1dGVQcmVmaXhlcykge1xuICAgIHRoaXMuX2lnbm9yZUF0dHJpYnV0ZVByZWZpeGVzID0gaWdub3JlQXR0cmlidXRlUHJlZml4ZXM7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtTdHJpbmd9IGlnbm9yZUF0dHJpYnV0ZVByZWZpeFxuICAgKi9cbiAgYWRkSWdub3JlQXR0cmlidXRlUHJlZml4KGlnbm9yZUF0dHJpYnV0ZVByZWZpeCkge1xuICAgIHRoaXMuX2lnbm9yZUF0dHJpYnV0ZVByZWZpeGVzLnB1c2goaWdub3JlQXR0cmlidXRlUHJlZml4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZkxpbmtcbiAgICovXG4gIHNldFNlbGZMaW5rKHNlbGZMaW5rKSB7XG4gICAgdGhpcy5fc2VsZkxpbmsgPSBzZWxmTGluaztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGZvcmNlSlNPTlJlc291cmNlXG4gICAqL1xuICBzZXRGb3JjZUpTT05SZXNvdXJjZShmb3JjZUpTT05SZXNvdXJjZSkge1xuICAgIHRoaXMuX2ZvcmNlSlNPTlJlc291cmNlID0gZm9yY2VKU09OUmVzb3VyY2U7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gdXJsVHJhbnNmb3JtZXJcbiAgICogQGRlcHJlY2F0ZWQgJGhhbENvbmZpZ3VyYXRpb25Qcm92aWRlci5zZXRVcmxUcmFuc2Zvcm1lciBpcyBkZXByZWNhdGVkLiBQbGVhc2Ugd3JpdGUgYSBodHRwIGludGVyY2VwdG9yIGluc3RlYWQuXG4gICAqIEBzZWUgaHR0cHM6Ly9kb2NzLmFuZ3VsYXJqcy5vcmcvYXBpL25nL3NlcnZpY2UvJGh0dHAjaW50ZXJjZXB0b3JzXG4gICAqL1xuICBzZXRVcmxUcmFuc2Zvcm1lcih1cmxUcmFuc2Zvcm1lcikge1xuICAgIHRoaXMuX3VybFRyYW5zZm9ybWVyID0gdXJsVHJhbnNmb3JtZXI7XG4gIH1cblxuICAvKipcbiAgICogR2V0IENvbmZpZ3VyYXRpb25cbiAgICogQHBhcmFtICB7TG9nfSAkbG9nIGxvZ2dlclxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICAkZ2V0KCRsb2cpIHtcbiAgICBpZih0aGlzLl91cmxUcmFuc2Zvcm1lciAhPT0gbm9vcFVybFRyYW5zZm9ybWVyKSB7XG4gICAgICAkbG9nLmxvZygnJGhhbENvbmZpZ3VyYXRpb25Qcm92aWRlci5zZXRVcmxUcmFuc2Zvcm1lciBpcyBkZXByZWNhdGVkLiBQbGVhc2Ugd3JpdGUgYSBodHRwIGludGVyY2VwdG9yIGluc3RlYWQuJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xuICAgICAgbGlua3NBdHRyaWJ1dGU6IHRoaXMuX2xpbmtzQXR0cmlidXRlLFxuICAgICAgZW1iZWRkZWRBdHRyaWJ1dGU6IHRoaXMuX2VtYmVkZGVkQXR0cmlidXRlLFxuICAgICAgaWdub3JlQXR0cmlidXRlUHJlZml4ZXM6IHRoaXMuX2lnbm9yZUF0dHJpYnV0ZVByZWZpeGVzLFxuICAgICAgc2VsZkxpbms6IHRoaXMuX3NlbGZMaW5rLFxuICAgICAgZm9yY2VKU09OUmVzb3VyY2U6IHRoaXMuX2ZvcmNlSlNPTlJlc291cmNlLFxuICAgICAgdXJsVHJhbnNmb3JtZXI6IHRoaXMuX3VybFRyYW5zZm9ybWVyLFxuICAgIH0pO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IE1PRFVMRV9OQU1FID0gJ2FuZ3VsYXItaGFsLmNvbmZpZ3VyYXRpb24nO1xuXG5cblxuaW1wb3J0IEhhbENvbmZpZ3VyYXRpb25Qcm92aWRlciBmcm9tICcuL2hhbC1jb25maWd1cmF0aW9uLnByb3ZpZGVyJztcblxuLy8gQWRkIG1vZHVsZSBmb3IgY29uZmlndXJhdGlvblxuYW5ndWxhclxuICAubW9kdWxlKE1PRFVMRV9OQU1FLCBbXSlcblxuICAucHJvdmlkZXIoJyRoYWxDb25maWd1cmF0aW9uJywgSGFsQ29uZmlndXJhdGlvblByb3ZpZGVyKVxuO1xuXG5leHBvcnQgZGVmYXVsdCBNT0RVTEVfTkFNRTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAcGFyYW0ge0h0dHBQcm92aWRlcn0gJGh0dHBQcm92aWRlclxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIdHRwSW50ZXJjZXB0b3JDb25maWd1cmF0aW9uKCRodHRwUHJvdmlkZXIpIHtcbiAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnUmVzb3VyY2VIdHRwSW50ZXJjZXB0b3InKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgTU9EVUxFX05BTUUgPSAnYW5ndWxhci1oYWwuaHR0cC1pbnRlcmNlcHRpb24nO1xuXG5cbmltcG9ydCByZXNvdXJjZSBmcm9tICcuLi9yZXNvdXJjZSc7XG5pbXBvcnQgY29uZmlndXJhdGlvbiBmcm9tICcuLi9jb25maWd1cmF0aW9uJztcblxuaW1wb3J0IFJlc291cmNlSHR0cEludGVyY2VwdG9yIGZyb20gJy4vcmVzb3VyY2UtaHR0cC1pbnRlcmNlcHRvci5mYWN0b3J5JztcbmltcG9ydCBIdHRwSW50ZXJjZXB0b3JDb25maWd1cmF0aW9uIGZyb20gJy4vaHR0cC1pbnRlcmNlcHRpb24uY29uZmlnJztcblxuLy8gQWRkIG1vZHVsZSBmb3IgaHR0cCBpbnRlcmNlcHRpb25cbmFuZ3VsYXJcbiAgLm1vZHVsZShNT0RVTEVfTkFNRSwgW1xuICAgIHJlc291cmNlLFxuICAgIGNvbmZpZ3VyYXRpb24sXG4gIF0pXG5cbiAgLmNvbmZpZyhIdHRwSW50ZXJjZXB0b3JDb25maWd1cmF0aW9uKVxuXG4gIC5mYWN0b3J5KCdSZXNvdXJjZUh0dHBJbnRlcmNlcHRvcicsIFJlc291cmNlSHR0cEludGVyY2VwdG9yKVxuO1xuXG5leHBvcnQgZGVmYXVsdCBNT0RVTEVfTkFNRTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgQ09OVEVOVF9UWVBFID0gJ2FwcGxpY2F0aW9uL2hhbCtqc29uJztcblxuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdjb250ZW50LXR5cGUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZXNvdXJjZUh0dHBJbnRlcmNlcHRvckZhY3RvcnkoJGhhbENvbmZpZ3VyYXRpb24sIFJlc291cmNlKSB7XG4gIHJldHVybiB7XG4gICAgcmVxdWVzdDogdHJhbnNmb3JtUmVxdWVzdCxcbiAgICByZXNwb25zZTogdHJhbnNmb3JtUmVzcG9uc2UsXG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBIYWwgSnNvbiBBcyBhbiBhY2NlcHRlZCBmb3JtYXRcbiAgICogQHBhcmFtIHtSZXF1ZXN0fSByZXF1ZXN0XG4gICAqIEByZXR1cm4ge1JlcXVlc3R9XG4gICAqL1xuICBmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICBpZih0eXBlb2YgcmVxdWVzdC5oZWFkZXJzLkFjY2VwdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJlcXVlc3QuaGVhZGVycy5BY2NlcHQgPSBDT05URU5UX1RZUEU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcXVlc3QuaGVhZGVycy5BY2NlcHQgPSBbXG4gICAgICAgIENPTlRFTlRfVFlQRSxcbiAgICAgICAgcmVxdWVzdC5oZWFkZXJzLkFjY2VwdFxuICAgICAgXS5qb2luKCcsICcpO1xuICAgIH1cblxuICAgIHJldHVybiByZXF1ZXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybSBSZXNwb25zZVxuICAgKlxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNwb25zZVxuICAgKiBAcmV0dXJuIHtSZXNwb25zZXxSZXNvdXJjZX1cbiAgICovXG4gIGZ1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKHJlc3BvbnNlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmKHBhcnNlKHJlc3BvbnNlLmhlYWRlcnMoJ0NvbnRlbnQtVHlwZScpKS50eXBlID09PSBDT05URU5UX1RZUEUpIHtcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybVJlc3BvbnNlVG9SZXNvdXJjZShyZXNwb25zZSk7XG4gICAgICB9XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICAvLyBUaGUgcGFyc2UgZnVuY3Rpb24gY291bGQgdGhyb3cgYW4gZXJyb3IsIHdlIGRvIG5vdCB3YW50IHRoYXQuXG4gICAgfVxuICAgIGlmKHJlc3BvbnNlLmNvbmZpZy5mb3JjZUhhbCkge1xuICAgICAgcmV0dXJuIHRyYW5zZm9ybVJlc3BvbnNlVG9SZXNvdXJjZShyZXNwb25zZSk7XG4gICAgfVxuICAgIGlmKChcbiAgICAgICAgcmVzcG9uc2UuaGVhZGVycygnQ29udGVudC1UeXBlJykgPT09ICdhcHBsaWNhdGlvbi9qc29uJyB8fFxuICAgICAgICByZXNwb25zZS5oZWFkZXJzKCdDb250ZW50LVR5cGUnKSA9PT0gbnVsbFxuICAgICAgKSAmJlxuICAgICAgJGhhbENvbmZpZ3VyYXRpb24uZm9yY2VKU09OUmVzb3VyY2UpIHtcbiAgICAgIHJldHVybiB0cmFuc2Zvcm1SZXNwb25zZVRvUmVzb3VyY2UocmVzcG9uc2UpO1xuICAgIH1cblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfVxuICBmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZVRvUmVzb3VyY2UocmVzcG9uc2UpIHtcbiAgICByZXR1cm4gbmV3IFJlc291cmNlKHJlc3BvbnNlLmRhdGEsIHJlc3BvbnNlKTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBNT0RVTEVfTkFNRSA9ICdhbmd1bGFyLWhhbCc7XG5cbmltcG9ydCBodHRwSW50ZXJjZXB0aW9uIGZyb20gJy4vaHR0cC1pbnRlcmNlcHRpb24nO1xuaW1wb3J0IGNsaWVudCBmcm9tICcuL2NsaWVudCc7XG5cbi8vIENvbWJpbmUgbmVlZGVkIE1vZHVsZXNcbmFuZ3VsYXJcbiAgLm1vZHVsZShNT0RVTEVfTkFNRSwgW1xuICAgIGh0dHBJbnRlcmNlcHRpb24sXG4gICAgY2xpZW50LFxuICBdKVxuO1xuXG5leHBvcnQgZGVmYXVsdCBNT0RVTEVfTkFNRTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHJmYzY1NzAgZnJvbSAncmZjNjU3MC9zcmMvbWFpbic7XG5cbi8qKlxuICogR2VuZXJhdGUgdXJsIGZyb20gdGVtcGxhdGVcbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHRlbXBsYXRlXG4gKiBAcGFyYW0gIHtPYmplY3R9IHBhcmFtZXRlcnNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2VuZXJhdGVVcmwodGVtcGxhdGUsIHBhcmFtZXRlcnMpIHtcbiAgcmV0dXJuIG5ldyByZmM2NTcwLlVyaVRlbXBsYXRlKHRlbXBsYXRlKS5zdHJpbmdpZnkocGFyYW1ldGVycyk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBleHRlbmRSZWFkT25seSBmcm9tICcuLi91dGlsaXR5L2V4dGVuZC1yZWFkLW9ubHknO1xuXG4vKipcbiAqIEZhY3RvcnkgZm9yIEhhbFJlc291cmNlQ2xpZW50XG4gKiBAcGFyYW0ge1F9ICAgICAgICAkcVxuICogQHBhcmFtIHtJbmplY3Rvcn0gJGluamVjdG9yIFByZXZlbnQgQ2lyY3VsYXIgRGVwZW5kZW5jeSBieSBpbmplY3RpbmcgJGluamVjdG9yIGluc3RlYWQgb2YgJGh0dHBcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICRoYWxDb25maWd1cmF0aW9uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhhbFJlc291cmNlQ2xpZW50RmFjdG9yeSgkcSwgJGluamVjdG9yLCAkaGFsQ29uZmlndXJhdGlvbikge1xuICByZXR1cm4gSGFsUmVzb3VyY2VDbGllbnQ7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UmVzb3VyY2V9IHJlc291cmNlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgIGxpbmtzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgIGVtYmVkZGVkXG4gICAqL1xuICBmdW5jdGlvbiBIYWxSZXNvdXJjZUNsaWVudChyZXNvdXJjZSwgZW1iZWRkZWQpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICwgJGh0dHAgPSAkaW5qZWN0b3IuZ2V0KCckaHR0cCcpO1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgY2xpZW50XG4gICAgICovXG4gICAgKGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICBleHRlbmRSZWFkT25seShzZWxmLCB7XG4gICAgICAgICRyZXF1ZXN0OiAkcmVxdWVzdCxcbiAgICAgICAgJGdldDogJGdldCxcbiAgICAgICAgJHBvc3Q6ICRwb3N0LFxuICAgICAgICAkcHV0OiAkcHV0LFxuICAgICAgICAkcGF0Y2g6ICRwYXRjaCxcbiAgICAgICAgJGRlbGV0ZTogJGRlbGV0ZSxcbiAgICAgICAgJGRlbDogJGRlbGV0ZSxcbiAgICAgICAgJGxpbms6ICRsaW5rLFxuICAgICAgICAkdW5saW5rOiAkdW5saW5rLFxuICAgICAgfSk7XG4gICAgfSkoKTtcblxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGUgYSBIVFRQIHJlcXVlc3QgYWdhaW5zdCBhIGxpbmtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgIG1ldGhvZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgIHJlbFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fG51bGx9IHVybFBhcmFtc1xuICAgICAqIEBwYXJhbSB7bWl4ZWR8bnVsbH0gIGJvZHlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gICAgICBvcHRpb25zXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAkcmVxdWVzdChtZXRob2QsIHJlbCwgdXJsUGFyYW1zLCBib2R5LCBvcHRpb25zKSB7XG4gICAgICB2YXIgcHJvbWlzZXM7XG5cbiAgICAgIG1ldGhvZCA9IG1ldGhvZCB8fCAnR0VUJztcbiAgICAgIHJlbCA9IHJlbCB8fCAkaGFsQ29uZmlndXJhdGlvbi5zZWxmTGluaztcbiAgICAgIHVybFBhcmFtcyA9IHVybFBhcmFtcyB8fCB7fTtcbiAgICAgIGJvZHkgPSBib2R5IHx8IG51bGw7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgaWYobWV0aG9kID09PSAnR0VUJyAmJlxuICAgICAgICAgIHJlbCA9PT0gJGhhbENvbmZpZ3VyYXRpb24uc2VsZkxpbmspIHtcbiAgICAgICAgcmV0dXJuICRxLnJlc29sdmUocmVzb3VyY2UpO1xuICAgICAgfVxuXG4gICAgICBpZihyZXNvdXJjZS4kaGFzRW1iZWRkZWQocmVsKSAmJlxuICAgICAgICBBcnJheS5pc0FycmF5KGVtYmVkZGVkW3JlbF0pKSB7XG4gICAgICAgIHByb21pc2VzID0gW107XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBlbWJlZGRlZFtyZWxdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgcHJvbWlzZXMucHVzaChlbWJlZGRlZFtyZWxdW2ldLiRyZXF1ZXN0KCkuJHJlcXVlc3QobWV0aG9kLCAnc2VsZicsIHVybFBhcmFtcywgYm9keSwgb3B0aW9ucykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkcS5hbGwocHJvbWlzZXMpO1xuICAgICAgfVxuXG4gICAgICBpZihyZXNvdXJjZS4kaGFzRW1iZWRkZWQocmVsKSkge1xuICAgICAgICByZXR1cm4gZW1iZWRkZWRbcmVsXS4kcmVxdWVzdCgpLiRyZXF1ZXN0KG1ldGhvZCwgJ3NlbGYnLCB1cmxQYXJhbXMsIGJvZHksIG9wdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICBpZihyZXNvdXJjZS4kaGFzTGluayhyZWwpKSB7XG4gICAgICAgIHZhciB1cmwgPSByZXNvdXJjZS4kaHJlZihyZWwsIHVybFBhcmFtcyk7XG5cbiAgICAgICAgYW5ndWxhci5leHRlbmQob3B0aW9ucywge1xuICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgIGRhdGE6IGJvZHksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKEFycmF5LmlzQXJyYXkodXJsKSkge1xuICAgICAgICAgIHByb21pc2VzID0gW107XG4gICAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IHVybC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCgkaHR0cChhbmd1bGFyLmV4dGVuZCh7fSwgb3B0aW9ucywge3VybDogdXJsW2pdfSkpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICRxLmFsbChwcm9taXNlcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJGh0dHAoYW5ndWxhci5leHRlbmQoe30sIG9wdGlvbnMsIHtcbiAgICAgICAgICB1cmw6IHJlc291cmNlLiRocmVmKHJlbCwgdXJsUGFyYW1zKSxcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJHEucmVqZWN0KG5ldyBFcnJvcignbGluayBcIicgKyByZWwgKyAnXCIgaXMgdW5kZWZpbmVkJykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGUgYSBIVFRQIEdFVCByZXF1ZXN0IGFnYWluc3QgYSBsaW5rIG9yXG4gICAgICogbG9hZCBhbiBlbWJlZGRlZCByZXNvdXJjZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgcmVsXG4gICAgICogQHBhcmFtIHtPYmplY3R8bnVsbH0gdXJsUGFyYW1zXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgZnVuY3Rpb24gJGdldChyZWwsIHVybFBhcmFtcywgb3B0aW9ucykge1xuICAgICAgcmV0dXJuICRyZXF1ZXN0KCdHRVQnLCByZWwsIHVybFBhcmFtcywgdW5kZWZpbmVkLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRlIGEgSFRUUCBQT1NUIHJlcXVlc3QgYWdhaW5zdCBhIGxpbmtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgIHJlbFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fG51bGx9IHVybFBhcmFtc1xuICAgICAqIEBwYXJhbSB7bWl4ZWR8bnVsbH0gIGJvZHlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gICAgICBvcHRpb25zXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAkcG9zdChyZWwsIHVybFBhcmFtcywgYm9keSwgb3B0aW9ucykge1xuICAgICAgcmV0dXJuICRyZXF1ZXN0KCdQT1NUJywgcmVsLCB1cmxQYXJhbXMsIGJvZHksIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGUgYSBIVFRQIFBVVCByZXF1ZXN0IGFnYWluc3QgYSBsaW5rXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICByZWxcbiAgICAgKiBAcGFyYW0ge09iamVjdHxudWxsfSB1cmxQYXJhbXNcbiAgICAgKiBAcGFyYW0ge21peGVkfG51bGx9ICBib2R5XG4gICAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgZnVuY3Rpb24gJHB1dChyZWwsIHVybFBhcmFtcywgYm9keSwgb3B0aW9ucykge1xuICAgICAgcmV0dXJuICRyZXF1ZXN0KCdQVVQnLCByZWwsIHVybFBhcmFtcywgYm9keSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhlY3V0ZSBhIEhUVFAgUEFUQ0ggcmVxdWVzdCBhZ2FpbnN0IGEgbGlua1xuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgcmVsXG4gICAgICogQHBhcmFtIHtPYmplY3R8bnVsbH0gdXJsUGFyYW1zXG4gICAgICogQHBhcmFtIHttaXhlZHxudWxsfSAgYm9keVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uICRwYXRjaChyZWwsIHVybFBhcmFtcywgYm9keSwgb3B0aW9ucykge1xuICAgICAgcmV0dXJuICRyZXF1ZXN0KCdQQVRDSCcsIHJlbCwgdXJsUGFyYW1zLCBib2R5LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRlIGEgSFRUUCBERUxFRVQgcmVxdWVzdCBhZ2FpbnN0IGEgbGlua1xuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgcmVsXG4gICAgICogQHBhcmFtIHtPYmplY3R8bnVsbH0gdXJsUGFyYW1zXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgZnVuY3Rpb24gJGRlbGV0ZShyZWwsIHVybFBhcmFtcywgb3B0aW9ucykge1xuICAgICAgcmV0dXJuICRyZXF1ZXN0KCdERUxFVEUnLCByZWwsIHVybFBhcmFtcywgdW5kZWZpbmVkLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRlIGEgSFRUUCBMSU5LIHJlcXVlc3QgYWdhaW5zdCBhIGxpbmtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICByZWxcbiAgICAgKiBAcGFyYW0ge09iamVjdHxudWxsfSAgdXJsUGFyYW1zXG4gICAgICogQHBhcmFtIHtMaW5rSGVhZGVyW119IGJvZHlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgZnVuY3Rpb24gJGxpbmsocmVsLCB1cmxQYXJhbXMsIGxpbmtzLCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgIG9wdGlvbnMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCB7fTtcbiAgICAgIG9wdGlvbnMuaGVhZGVycy5MaW5rID0gbGlua3MubWFwKHRvU3RyaW5nSXRlbSk7XG4gICAgICByZXR1cm4gJHJlcXVlc3QoJ0xJTksnLCByZWwsIHVybFBhcmFtcywgdW5kZWZpbmVkLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRlIGEgSFRUUCBVTkxJTksgcmVxdWVzdCBhZ2FpbnN0IGEgbGlua1xuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgIHJlbFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fG51bGx9ICB1cmxQYXJhbXNcbiAgICAgKiBAcGFyYW0ge0xpbmtIZWFkZXJbXX0gYm9keVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICBvcHRpb25zXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAkdW5saW5rKHJlbCwgdXJsUGFyYW1zLCBsaW5rcywgb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICBvcHRpb25zLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgfHwge307XG4gICAgICBvcHRpb25zLmhlYWRlcnMuTGluayA9IGxpbmtzLm1hcCh0b1N0cmluZ0l0ZW0pO1xuICAgICAgcmV0dXJuICRyZXF1ZXN0KCdVTkxJTksnLCByZWwsIHVybFBhcmFtcywgdW5kZWZpbmVkLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge21peGVkfSBpdGVtXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRvU3RyaW5nSXRlbShpdGVtKSB7XG4gICAgICByZXR1cm4gaXRlbS50b1N0cmluZygpO1xuICAgIH1cbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBNT0RVTEVfTkFNRSA9ICdhbmd1bGFyLWhhbC5yZXNvdXJjZSc7XG5cblxuaW1wb3J0IGNvbmZpZ3VyYXRpb24gZnJvbSAnLi4vY29uZmlndXJhdGlvbic7XG5cbmltcG9ydCBSZXNvdXJjZUZhY3RvcnkgZnJvbSAnLi9yZXNvdXJjZS5mYWN0b3J5JztcbmltcG9ydCBIYWxSZXNvdXJjZUNsaWVudEZhY3RvcnkgZnJvbSAnLi9oYWwtcmVzb3VyY2UtY2xpZW50LmZhY3RvcnknO1xuXG4vLyBBZGQgbW9kdWxlIGZvciByZXNvdXJjZVxuYW5ndWxhclxuICAubW9kdWxlKE1PRFVMRV9OQU1FLCBbXG4gICAgY29uZmlndXJhdGlvbixcbiAgXSlcblxuICAuZmFjdG9yeSgnUmVzb3VyY2UnLCBSZXNvdXJjZUZhY3RvcnkpXG5cbiAgLmZhY3RvcnkoJ0hhbFJlc291cmNlQ2xpZW50JywgSGFsUmVzb3VyY2VDbGllbnRGYWN0b3J5KVxuO1xuXG5leHBvcnQgZGVmYXVsdCBNT0RVTEVfTkFNRTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGV4dGVuZFJlYWRPbmx5IGZyb20gJy4uL3V0aWxpdHkvZXh0ZW5kLXJlYWQtb25seSc7XG5pbXBvcnQgZGVmaW5lUmVhZE9ubHkgZnJvbSAnLi4vdXRpbGl0eS9kZWZpbmUtcmVhZC1vbmx5JztcbmltcG9ydCBnZW5lcmF0ZVVybCBmcm9tICcuL2dlbmVyYXRlLXVybCc7XG5pbXBvcnQgbm9ybWFsaXplTGluayBmcm9tICcuLi91dGlsaXR5L25vcm1hbGl6ZS1saW5rJztcblxuLyoqXG4gKiBGYWN0b3J5IGZvciBSZXNvdXJjZVxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IEhhbFJlc291cmNlQ2xpZW50XG4gKiBAcGFyYW0ge09iamVjdH0gICAkaGFsQ29uZmlndXJhdGlvblxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZXNvdXJjZUZhY3RvcnkoXG4gIEhhbFJlc291cmNlQ2xpZW50LFxuICAkaGFsQ29uZmlndXJhdGlvblxuKSB7XG4gIHJldHVybiBSZXNvdXJjZTtcblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlXG4gICAqL1xuICBmdW5jdGlvbiBSZXNvdXJjZShkYXRhLCByZXNwb25zZSkge1xuICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgLCBsaW5rcyA9IHt9XG4gICAgICAsIGVtYmVkZGVkID0ge31cbiAgICAgICwgY2xpZW50O1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgUmVzb3VyY2VcbiAgICAgKi9cbiAgICAoZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIGlmKHR5cGVvZiBkYXRhICE9PSAnb2JqZWN0JyB8fFxuICAgICAgICBkYXRhID09PSBudWxsKSB7XG4gICAgICAgIGRhdGEgPSB7fTtcbiAgICAgIH1cbiAgICAgIGluaXRpYWxpemVEYXRhKCk7XG4gICAgICBpbml0aWFsaXplRW1iZWRkZWQoKTtcbiAgICAgIGluaXRpYWxpemVMaW5rcygpO1xuICAgICAgaW5pdGl0YWxpemVDbGllbnQoKTtcblxuICAgICAgZXh0ZW5kUmVhZE9ubHkoc2VsZiwge1xuICAgICAgICAkaGFzTGluazogJGhhc0xpbmssXG4gICAgICAgICRoYXNFbWJlZGRlZDogJGhhc0VtYmVkZGVkLFxuICAgICAgICAkaGFzOiAkaGFzLFxuICAgICAgICAkaHJlZjogJGhyZWYsXG4gICAgICAgICRtZXRhOiAkbWV0YSxcbiAgICAgICAgJGxpbms6ICRsaW5rLFxuICAgICAgICAkcmVxdWVzdDogJHJlcXVlc3QsXG4gICAgICAgICRyZXNwb25zZTogJHJlc3BvbnNlLFxuICAgICAgfSk7XG4gICAgfSkoKTtcblxuICAgIC8qKlxuICAgICAqIEFkZCBhbGwgZGF0YSBmcm9tIGRhdGEgdG8gaXRzZWxmXG4gICAgICovXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZURhdGEoKSB7XG4gICAgICBmb3IodmFyIHByb3BlcnR5TmFtZSBpbiBkYXRhKSB7XG4gICAgICAgIGlmKCFkYXRhLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZihpc01ldGFQcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgZGVmaW5lUmVhZE9ubHkoc2VsZiwgcHJvcGVydHlOYW1lLCBkYXRhW3Byb3BlcnR5TmFtZV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5vcm1hbGl6ZSBhbGwgTGlua3NcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbml0aWFsaXplTGlua3MoKSB7XG4gICAgICBpZih0eXBlb2YgZGF0YVskaGFsQ29uZmlndXJhdGlvbi5saW5rc0F0dHJpYnV0ZV0gIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgT2JqZWN0XG4gICAgICAgIC5rZXlzKGRhdGFbJGhhbENvbmZpZ3VyYXRpb24ubGlua3NBdHRyaWJ1dGVdKVxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihyZWwpIHtcbiAgICAgICAgICB2YXIgbGluayA9IGRhdGFbJGhhbENvbmZpZ3VyYXRpb24ubGlua3NBdHRyaWJ1dGVdW3JlbF07XG4gICAgICAgICAgbGlua3NbcmVsXSA9IG5vcm1hbGl6ZUxpbmsocmVzcG9uc2UuY29uZmlnLnVybCwgbGluayk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5vcm1hbGl6ZSBFbWJlZGRlZCBDb250ZW50c1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGluaXRpYWxpemVFbWJlZGRlZCgpIHtcbiAgICAgIGlmKHR5cGVvZiBkYXRhWyRoYWxDb25maWd1cmF0aW9uLmVtYmVkZGVkQXR0cmlidXRlXSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBPYmplY3RcbiAgICAgICAgLmtleXMoZGF0YVskaGFsQ29uZmlndXJhdGlvbi5lbWJlZGRlZEF0dHJpYnV0ZV0pXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKHJlbCkge1xuICAgICAgICAgIGVtYmVkUmVzb3VyY2UocmVsLCBkYXRhWyRoYWxDb25maWd1cmF0aW9uLmVtYmVkZGVkQXR0cmlidXRlXVtyZWxdKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgSFRUUCBDTElFTlRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbml0aXRhbGl6ZUNsaWVudCgpIHtcbiAgICAgIGNsaWVudCA9IG5ldyBIYWxSZXNvdXJjZUNsaWVudChzZWxmLCBlbWJlZGRlZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW1iZWQgYSByZXNvdXJjZShzKVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIHJlbFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fE9iamVjdFtdfSByZXNvdXJjZXNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBlbWJlZFJlc291cmNlKHJlbCwgcmVzb3VyY2VzKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXNvdXJjZXMpKSB7XG4gICAgICAgIGVtYmVkZGVkW3JlbF0gPSBbXTtcbiAgICAgICAgcmVzb3VyY2VzLmZvckVhY2goZnVuY3Rpb24gKHJlc291cmNlKSB7XG4gICAgICAgICAgZW1iZWRkZWRbcmVsXS5wdXNoKG5ldyBSZXNvdXJjZShyZXNvdXJjZSwgcmVzcG9uc2UpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGVtYmVkZGVkW3JlbF0gPSBuZXcgUmVzb3VyY2UocmVzb3VyY2VzLCByZXNwb25zZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lIGlmIGEgcHJvcGVydHkgbmFtZSBpcyBhIG1ldGEgcHJvcGVydHlcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlOYW1lXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc01ldGFQcm9wZXJ0eShwcm9wZXJ0eU5hbWUpIHtcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCAkaGFsQ29uZmlndXJhdGlvbi5pZ25vcmVBdHRyaWJ1dGVQcmVmaXhlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZihwcm9wZXJ0eU5hbWUuc3Vic3RyKDAsIDEpID09PSAkaGFsQ29uZmlndXJhdGlvbi5pZ25vcmVBdHRyaWJ1dGVQcmVmaXhlc1tpXSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmKHByb3BlcnR5TmFtZSA9PT0gJGhhbENvbmZpZ3VyYXRpb24ubGlua3NBdHRyaWJ1dGUgfHxcbiAgICAgICAgICBwcm9wZXJ0eU5hbWUgPT09ICRoYWxDb25maWd1cmF0aW9uLmVtYmVkZGVkQXR0cmlidXRlKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVsXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAkaGFzTGluayhyZWwpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgbGlua3NbcmVsXSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHJlbFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gJGhhc0VtYmVkZGVkKHJlbCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBlbWJlZGRlZFtyZWxdICE9PSAndW5kZWZpbmVkJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVsXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAkaGFzKHJlbCkge1xuICAgICAgcmV0dXJuICRoYXNMaW5rKHJlbCkgfHwgJGhhc0VtYmVkZGVkKHJlbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBocmVmIG9mIGEgTGlua1xuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHJlbFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uICRocmVmKHJlbCwgcGFyYW1ldGVycykge1xuICAgICAgaWYoISRoYXNMaW5rKHJlbCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsaW5rIFwiJyArIHJlbCArICdcIiBpcyB1bmRlZmluZWQnKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGxpbmsgPSBsaW5rc1tyZWxdXG4gICAgICAgICwgaHJlZiA9IGxpbmsuaHJlZjtcblxuICAgICAgaWYoQXJyYXkuaXNBcnJheShsaW5rKSkge1xuICAgICAgICBocmVmID0gW107XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsaW5rLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIHN1YkxpbmsgPSBsaW5rW2ldXG4gICAgICAgICAgICAsIHN1YkhyZWYgPSBzdWJMaW5rLmhyZWY7XG4gICAgICAgICAgaWYodHlwZW9mIHN1YkxpbmsudGVtcGxhdGVkICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgc3ViTGluay50ZW1wbGF0ZWQpIHtcbiAgICAgICAgICAgIHN1YkhyZWYgPSBnZW5lcmF0ZVVybChzdWJMaW5rLmhyZWYsIHBhcmFtZXRlcnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdWJIcmVmID0gJGhhbENvbmZpZ3VyYXRpb24udXJsVHJhbnNmb3JtZXIoc3ViSHJlZik7XG4gICAgICAgICAgaHJlZi5wdXNoKHN1YkhyZWYpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZih0eXBlb2YgbGluay50ZW1wbGF0ZWQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgbGluay50ZW1wbGF0ZWQpIHtcbiAgICAgICAgICBocmVmID0gZ2VuZXJhdGVVcmwobGluay5ocmVmLCBwYXJhbWV0ZXJzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhyZWYgPSAkaGFsQ29uZmlndXJhdGlvbi51cmxUcmFuc2Zvcm1lcihocmVmKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhyZWY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGEgbGlua1xuICAgICAqXG4gICAgICogISEgVG8gZ2V0IGEgaHJlZiwgdXNlICRocmVmIGluc3RlYWQgISFcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSByZWxcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZnVuY3Rpb24gJGxpbmsocmVsKSB7XG4gICAgICBpZighJGhhc0xpbmsocmVsKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xpbmsgXCInICsgcmVsICsgJ1wiIGlzIHVuZGVmaW5lZCcpO1xuICAgICAgfVxuICAgICAgdmFyIGxpbmsgPSBsaW5rc1tyZWxdO1xuICAgICAgcmV0dXJuIGxpbms7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IG1ldGEgcHJvcGVydGllc1xuICAgICAqXG4gICAgICogISEgVG8gZ2V0IGEgaHJlZiwgdXNlICRocmVmIGluc3RlYWQgISFcbiAgICAgKiAhISBUbyBnZXQgYSBsaW5rLCB1c2UgJGxpbmsgaW5zdGVhZCAhIVxuICAgICAqICEhIFRvIGdldCBhbiBlbWJlZGRlZCByZXNvdXJjZSwgdXNlICRyZXF1ZXN0KCkuJGdldChyZWwpIGluc3RlYWQgISFcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSByZWxcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZnVuY3Rpb24gJG1ldGEobmFtZSkge1xuICAgICAgZm9yKHZhciBpID0gMDsgaSA8ICRoYWxDb25maWd1cmF0aW9uLmlnbm9yZUF0dHJpYnV0ZVByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBmdWxsTmFtZSA9ICRoYWxDb25maWd1cmF0aW9uLmlnbm9yZUF0dHJpYnV0ZVByZWZpeGVzW2ldICsgbmFtZTtcbiAgICAgICAgcmV0dXJuIGRhdGFbZnVsbE5hbWVdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgT3JpZ2luYWwgUmVzcG9uc2VcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdCl9XG4gICAgICovXG4gICAgZnVuY3Rpb24gJHJlc3BvbnNlKCkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY2xpZW50IHRvIHBlcmZvcm0gcmVxdWVzdHNcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0hhbFJlc291cmNlQ2xpZW50KX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAkcmVxdWVzdCgpIHtcbiAgICAgIHJldHVybiBjbGllbnQ7XG4gICAgfVxuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGVmaW5lIHJlYWQtb25seSBwcm9wZXJ0eSBpbiB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7bWl4ZWR9ICB2YWx1ZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWZpbmVSZWFkT25seSh0YXJnZXQsIGtleSwgdmFsdWUpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7XG4gICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiB2YWx1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgfSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRXh0ZW5kIHByb3BlcnRpZXMgZnJvbSBjb3B5IHJlYWQtb25seSB0byB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb3B5XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dGVuZFJlYWRPbmx5KHRhcmdldCwgY29weSkge1xuICBmb3IodmFyIGtleSBpbiBjb3B5KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7XG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogY29weVtrZXldLFxuICAgIH0pO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCByZXNvbHZlVXJsIGZyb20gJy4uL3V0aWxpdHkvcmVzb2x2ZS11cmwnO1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBiYXNlVXJsXG4gKiBAcGFyYW0ge21peGVkfSAgbGlua1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub3JtYWxpemVMaW5rKGJhc2VVcmwsIGxpbmspIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkobGluaykpIHtcbiAgICByZXR1cm4gbGluay5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBub3JtYWxpemVMaW5rKGJhc2VVcmwsIGl0ZW0pO1xuICAgIH0pO1xuICB9XG4gIGlmKHR5cGVvZiBsaW5rID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB7XG4gICAgICBocmVmOiByZXNvbHZlVXJsKGJhc2VVcmwsIGxpbmspLFxuICAgIH07XG4gIH1cbiAgaWYodHlwZW9mIGxpbmsuaHJlZiA9PT0gJ3N0cmluZycpIHtcbiAgICBsaW5rLmhyZWYgPSByZXNvbHZlVXJsKGJhc2VVcmwsIGxpbmsuaHJlZik7XG4gICAgcmV0dXJuIGxpbms7XG4gIH1cbiAgaWYoQXJyYXkuaXNBcnJheShsaW5rLmhyZWYpKSB7XG4gICAgcmV0dXJuIGxpbmsuaHJlZi5tYXAoZnVuY3Rpb24gKGhyZWYpIHtcbiAgICAgIHZhciBuZXdMaW5rID0gYW5ndWxhci5leHRlbmQoe30sIGxpbmssIHtcbiAgICAgICAgaHJlZjogaHJlZixcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZUxpbmsoYmFzZVVybCwgbmV3TGluayk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBocmVmOiBiYXNlVXJsLFxuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFJlc29sdmUgd2hvbGUgVVJMXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGJhc2VVcmxcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlc29sdmVVcmwoYmFzZVVybCwgcGF0aCkge1xuICB2YXIgcmVzdWx0SHJlZiA9ICcnXG4gICAgLCByZUZ1bGxVcmwgPSAvXigoPzpcXHcrXFw6KT8pKCg/OlxcL1xcLyk/KShbXlxcL10qKSgoPzpcXC8uKik/KSQvXG4gICAgLCBiYXNlSHJlZk1hdGNoID0gcmVGdWxsVXJsLmV4ZWMoYmFzZVVybClcbiAgICAsIGhyZWZNYXRjaCA9IHJlRnVsbFVybC5leGVjKHBhdGgpO1xuXG4gIGZvciAodmFyIHBhcnRJbmRleCA9IDE7IHBhcnRJbmRleCA8IDU7IHBhcnRJbmRleCsrKSB7XG4gICAgaWYgKGhyZWZNYXRjaFtwYXJ0SW5kZXhdKSB7XG4gICAgICByZXN1bHRIcmVmICs9IGhyZWZNYXRjaFtwYXJ0SW5kZXhdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRIcmVmICs9IGJhc2VIcmVmTWF0Y2hbcGFydEluZGV4XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0SHJlZjtcbn1cbiJdfQ==
