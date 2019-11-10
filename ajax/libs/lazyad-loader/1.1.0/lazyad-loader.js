/**
* lazyad-loader
* Conditionally load ads after the page has rendered.
* Madgex. Build date: 20-05-2014
*/

// An html parser written in JavaScript
// Based on http://ejohn.org/blog/pure-javascript-html-parser/

(function() {
  var supports = (function() {
    var supports = {};

    var html;
    var work = this.document.createElement('div');

    html = "<P><I></P></I>";
    work.innerHTML = html;
    supports.tagSoup = work.innerHTML !== html;

    work.innerHTML = "<P><i><P></P></i></P>";
    supports.selfClose = work.childNodes.length === 2;

    return supports;
  })();



  // Regular Expressions for parsing tags and attributes
  var startTag = /^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
  var endTag = /^<\/([\-A-Za-z0-9_]+)[^>]*>/;
  var attr = /([\-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
  var fillAttr = /^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i;

  var DEBUG = false;

  function htmlParser(stream, options) {
    stream = stream || '';

    // Options
    options = options || {};

    for(var key in supports) {
      if(supports.hasOwnProperty(key)) {
        if(options.autoFix) {
          options['fix_'+key] = true;//!supports[key];
        }
        options.fix = options.fix || options['fix_'+key];
      }
    }

    var stack = [];

    var append = function(str) {
      stream += str;
    };

    var prepend = function(str) {
      stream = str + stream;
    };

    // Order of detection matters: detection of one can only
    // succeed if detection of previous didn't
    var detect = {
      comment: /^<!--/,
      endTag: /^<\//,
      atomicTag: /^<\s*(script|style|noscript|iframe|textarea)[\s>]/i,
      startTag: /^</,
      chars: /^[^<]/
    };

    // Detection has already happened when a reader is called.
    var reader = {

      comment: function() {
        var index = stream.indexOf("-->");
        if ( index >= 0 ) {
          return {
            content: stream.substr(4, index),
            length: index + 3
          };
        }
      },

      endTag: function() {
        var match = stream.match( endTag );

        if ( match ) {
          return {
            tagName: match[1],
            length: match[0].length
          };
        }
      },

      atomicTag: function() {
        var start = reader.startTag();
        if(start) {
          var rest = stream.slice(start.length);
          // for optimization, we check first just for the end tag
          if(rest.match(new RegExp("<\/\\s*" + start.tagName + "\\s*>", "i"))) {
            // capturing the content is inefficient, so we do it inside the if
            var match = rest.match(new RegExp("([\\s\\S]*?)<\/\\s*" + start.tagName + "\\s*>", "i"));
            if(match) {
              // good to go
              return {
                tagName: start.tagName,
                attrs: start.attrs,
                content: match[1],
                length: match[0].length + start.length
              };
            }
          }
        }
      },

      startTag: function() {
        var match = stream.match( startTag );

        if ( match ) {
          var attrs = {};

          match[2].replace(attr, function(match, name) {
            var value = arguments[2] || arguments[3] || arguments[4] ||
              fillAttr.test(name) && name || null;

            attrs[name] = value;
          });

          return {
            tagName: match[1],
            attrs: attrs,
            unary: !!match[3],
            length: match[0].length
          };
        }
      },

      chars: function() {
        var index = stream.indexOf("<");
        return {
          length: index >= 0 ? index : stream.length
        };
      }
    };

    var readToken = function() {

      // Enumerate detects in order
      for (var type in detect) {

        if(detect[type].test(stream)) {
          if(DEBUG) { console.log('suspected ' + type); }

          var token = reader[type]();
          if(token) {
            if(DEBUG) { console.log('parsed ' + type, token); }
            // Type
            token.type = token.type || type;
            // Entire text
            token.text = stream.substr(0, token.length);
            // Update the stream
            stream = stream.slice(token.length);

            return token;
          }
          return null;
        }
      }
    };

    var readTokens = function(handlers) {
      var tok;
      while(tok = readToken()) {
        // continue until we get an explicit "false" return
        if(handlers[tok.type] && handlers[tok.type](tok) === false) {
          return;
        }
      }
    };

    var clear = function() {
      var rest = stream;
      stream = '';
      return rest;
    };

    var rest = function() {
      return stream;
    };

    if(options.fix) {
      (function() {
        // Empty Elements - HTML 4.01
        var EMPTY = /^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i;

        // Elements that you can| intentionally| leave open
        // (and which close themselves)
        var CLOSESELF = /^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i;


        var stack = [];
        stack.last = function() {
          return this[this.length - 1];
        };
        stack.lastTagNameEq = function(tagName) {
          var last = this.last();
          return last && last.tagName &&
            last.tagName.toUpperCase() === tagName.toUpperCase();
        };

        stack.containsTagName = function(tagName) {
          for(var i = 0, tok; tok = this[i]; i++) {
            if(tok.tagName === tagName) {
              return true;
            }
          }
          return false;
        };

        var correct = function(tok) {
          if(tok && tok.type === 'startTag') {
            // unary
            tok.unary = EMPTY.test(tok.tagName) || tok.unary;
          }
          return tok;
        };

        var readTokenImpl = readToken;

        var peekToken = function() {
          var tmp = stream;
          var tok = correct(readTokenImpl());
          stream = tmp;
          return tok;
        };

        var closeLast = function() {
          var tok = stack.pop();

          // prepend close tag to stream.
          prepend('</'+tok.tagName+'>');
        };

        var handlers = {
          startTag: function(tok) {
            var tagName = tok.tagName;
            // Fix tbody
            if(tagName.toUpperCase() === 'TR' && stack.lastTagNameEq('TABLE')) {
              prepend('<TBODY>');
              prepareNextToken();
            } else if(options.fix_selfClose &&
              CLOSESELF.test(tagName) &&
              stack.containsTagName(tagName)) {
                if(stack.lastTagNameEq(tagName)) {
                  closeLast();
                } else {
                  prepend('</'+tok.tagName+'>');
                  prepareNextToken();
                }
            } else if (!tok.unary) {
              stack.push(tok);
            }
          },

          endTag: function(tok) {
            var last = stack.last();
            if(last) {
              if(options.fix_tagSoup && !stack.lastTagNameEq(tok.tagName)) {
                // cleanup tag soup
                closeLast();
              } else {
                stack.pop();
              }
            } else if (options.fix_tagSoup) {
              // cleanup tag soup part 2: skip this token
              skipToken();
            }
          }
        };

        var skipToken = function() {
          // shift the next token
          readTokenImpl();

          prepareNextToken();
        };

        var prepareNextToken = function() {
          var tok = peekToken();
          if(tok && handlers[tok.type]) {
            handlers[tok.type](tok);
          }
        };

        // redefine readToken
        readToken = function() {
          prepareNextToken();
          return correct(readTokenImpl());
        };
      })();
    }

    return {
      append: append,
      readToken: readToken,
      readTokens: readTokens,
      clear: clear,
      rest: rest,
      stack: stack
    };

  }

  htmlParser.supports = supports;

  htmlParser.tokenToString = function(tok) {
    var handler = {
      comment: function(tok) {
        return '<--' + tok.content + '-->';
      },
      endTag: function(tok) {
        return '</'+tok.tagName+'>';
      },
      atomicTag: function(tok) {
        console.log(tok);
        return handler.startTag(tok) +
              tok.content +
              handler.endTag(tok);
      },
      startTag: function(tok) {
        var str = '<'+tok.tagName;
        for (var key in tok.attrs) {
          var val = tok.attrs[key];
          // escape quotes
          str += ' '+key+'="'+(val ? val.replace(/(^|[^\\])"/g, '$1\\\"') : '')+'"';
        }
        return str + (tok.unary ? '/>' : '>');
      },
      chars: function(tok) {
        return tok.text;
      }
    };
    return handler[tok.type](tok);
  };

  htmlParser.escapeAttributes = function(attrs) {
    var escapedAttrs = {};
    // escape double-quotes for writing html as a string

    for(var name in attrs) {
      var value = attrs[name];
      escapedAttrs[name] = value && value.replace(/(^|[^\\])"/g, '$1\\\"');
    }
    return escapedAttrs;
  };

  for(var key in supports) {
    htmlParser.browserHasFlaw = htmlParser.browserHasFlaw || (!supports[key]) && key;
  }

  this.htmlParser = htmlParser;
})();
;/**
 * lifted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
 * polyfill needed for IE <= 7
 */
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {
        if (this === undefined || this === null) {
            throw new TypeError('"this" is null or not defined');
        }

        var length = this.length >>> 0; // Hack to convert object.length to a UInt32

        fromIndex = +fromIndex || 0;

        if (Math.abs(fromIndex) === Infinity) {
            fromIndex = 0;
        }

        if (fromIndex < 0) {
            fromIndex += length;
            if (fromIndex < 0) {
                fromIndex = 0;
            }
        }

        for (; fromIndex < length; fromIndex++) {
            if (this[fromIndex] === searchElement) {
                return fromIndex;
            }
        }

        return -1;
    };
};/* MediaMatch v.2.0.2 - Testing css media queries in Javascript. Authors & copyright (c) 2013: WebLinc, David Knight. */

window.matchMedia || (window.matchMedia = function (win) {
    'use strict';

    // Internal globals
    var _doc        = win.document,
        _viewport   = _doc.documentElement,
        _queries    = [],
        _queryID    = 0,
        _type       = '',
        _features   = {},
                    // only screen
                    // only screen and
                    // not screen
                    // not screen and
                    // screen
                    // screen and
        _typeExpr   = /\s*(only|not)?\s*(screen|print|[a-z\-]+)\s*(and)?\s*/i,
                    // (-vendor-min-width: 300px)
                    // (min-width: 300px)
                    // (width: 300px)
                    // (width)
                    // (orientation: portrait|landscape)
        _mediaExpr  = /^\s*\(\s*(-[a-z]+-)?(min-|max-)?([a-z\-]+)\s*(:?\s*([0-9]+(\.[0-9]+)?|portrait|landscape)(px|em|dppx|dpcm|rem|%|in|cm|mm|ex|pt|pc|\/([0-9]+(\.[0-9]+)?))?)?\s*\)\s*$/,
        _timer      = 0,

        // Helper methods

        /*
            _matches
         */
        _matches = function (media) {
            // screen and (min-width: 400px), screen and (max-width: 500px)
            var mql         = (media.indexOf(',') !== -1 && media.split(',')) || [media],
                mqIndex     = mql.length - 1,
                mqLength    = mqIndex,
                mq          = null,

                // not screen, screen
                negateType      = null,
                negateTypeFound = '',
                negateTypeIndex = 0,
                negate          = false,
                type            = '',

                // (min-width: 400px), (min-width)
                exprListStr = '',
                exprList    = null,
                exprIndex   = 0,
                exprLength  = 0,
                expr        = null,

                prefix      = '',
                length      = '',
                unit        = '',
                value       = '',
                feature     = '',

                match       = false;

            if (media === '') {
                return true;
            }

            do {
                mq          = mql[mqLength - mqIndex];
                negate      = false;
                negateType  = mq.match(_typeExpr);

                if (negateType) {
                    negateTypeFound = negateType[0];
                    negateTypeIndex = negateType.index;
                }

                if (!negateType || ((mq.substring(0, negateTypeIndex).indexOf('(') === -1) && (negateTypeIndex || (!negateType[3] && negateTypeFound !== negateType.input)))) {
                    match = false;
                    continue;
                }

                exprListStr = mq;

                negate = negateType[1] === 'not';

                if (!negateTypeIndex) {
                    type        =  negateType[2];
                    exprListStr = mq.substring(negateTypeFound.length);
                }

                // Test media type
                // Test type against this device or if 'all' or empty ''
                match       = type === _type || type === 'all' || type === '';

                exprList    = (exprListStr.indexOf(' and ') !== -1 && exprListStr.split(' and ')) || [exprListStr];
                exprIndex   = exprList.length - 1;
                exprLength  = exprIndex;

                if (match && exprIndex >= 0 && exprListStr !== '') {
                    do {
                        expr = exprList[exprIndex].match(_mediaExpr);

                        if (!expr || !_features[expr[3]]) {
                            match = false;
                            break;
                        }

                        prefix  = expr[2];
                        length  = expr[5];
                        value   = length;
                        unit    = expr[7];
                        feature = _features[expr[3]];

                        // Convert unit types
                        if (unit) {
                            if (unit === 'px') {
                                // If unit is px
                                value = Number(length);
                            } else if (unit === 'em' || unit === 'rem') {
                                // Convert relative length unit to pixels
                                // Assumed base font size is 16px
                                value = 16 * length;
                            } else if (expr[8]) {
                                // Convert aspect ratio to decimal
                                value = (length / expr[8]).toFixed(2);
                            } else if (unit === 'dppx') {
                                // Convert resolution dppx unit to pixels
                                value = length * 96;
                            } else if (unit === 'dpcm') {
                                // Convert resolution dpcm unit to pixels
                                value = length * 0.3937;
                            } else {
                                // default
                                value = Number(length);
                            }
                        }

                        // Test for prefix min or max
                        // Test value against feature
                        if (prefix === 'min-' && value) {
                            match = feature >= value;
                        } else if (prefix === 'max-' && value) {
                            match = feature <= value;
                        } else if (value) {
                            match = feature === value;
                        } else {
                            match = !!feature;
                        }

                        // If 'match' is false, break loop
                        // Continue main loop through query list
                        if (!match) {
                            break;
                        }
                    } while (exprIndex--);
                }

                // If match is true, break loop
                // Once matched, no need to check other queries
                if (match) {
                    break;
                }
            } while (mqIndex--);

            return negate ? !match : match;
        },

        /*
            _setFeature
         */
        _setFeature = function () {
            // Sets properties of '_features' that change on resize and/or orientation.
            var w   = win.innerWidth || _viewport.clientWidth,
                h   = win.innerHeight || _viewport.clientHeight,
                dw  = win.screen.width,
                dh  = win.screen.height,
                c   = win.screen.colorDepth,
                x   = win.devicePixelRatio;

            _features.width                     = w;
            _features.height                    = h;
            _features['aspect-ratio']           = (w / h).toFixed(2);
            _features['device-width']           = dw;
            _features['device-height']          = dh;
            _features['device-aspect-ratio']    = (dw / dh).toFixed(2);
            _features.color                     = c;
            _features['color-index']            = Math.pow(2, c);
            _features.orientation               = (h >= w ? 'portrait' : 'landscape');
            _features.resolution                = (x && x * 96) || win.screen.deviceXDPI || 96;
            _features['device-pixel-ratio']     = x || 1;
        },

        /*
            _watch
         */
        _watch = function () {
            clearTimeout(_timer);

            _timer = setTimeout(function () {
                var query   = null,
                    qIndex  = _queryID - 1,
                    qLength = qIndex,
                    match   = false;

                if (qIndex >= 0) {
                    _setFeature();

                    do {
                        query = _queries[qLength - qIndex];

                        if (query) {
                            match = _matches(query.mql.media);

                            if ((match && !query.mql.matches) || (!match && query.mql.matches)) {
                                query.mql.matches = match;

                                if (query.listeners) {
                                    for (var i = 0, il = query.listeners.length; i < il; i++) {
                                        if (query.listeners[i]) {
                                            query.listeners[i].call(win, query.mql);
                                        }
                                    }
                                }
                            }
                        }
                    } while(qIndex--);
                }

                
            }, 10);
        },

        /*
            _init
         */
        _init = function () {
            var head        = _doc.getElementsByTagName('head')[0],
                style       = _doc.createElement('style'),
                info        = null,
                typeList    = ['screen', 'print', 'speech', 'projection', 'handheld', 'tv', 'braille', 'embossed', 'tty'],
                typeIndex   = 0,
                typeLength  = typeList.length,
                cssText     = '#mediamatchjs { position: relative; z-index: 0; }',
                eventPrefix = '',
                addEvent    = win.addEventListener || (eventPrefix = 'on') && win.attachEvent;

            style.type  = 'text/css';
            style.id    = 'mediamatchjs';

            head.appendChild(style);

            // Must be placed after style is inserted into the DOM for IE
            info = (win.getComputedStyle && win.getComputedStyle(style)) || style.currentStyle;

            // Create media blocks to test for media type
            for ( ; typeIndex < typeLength; typeIndex++) {
                cssText += '@media ' + typeList[typeIndex] + ' { #mediamatchjs { position: relative; z-index: ' + typeIndex + ' } }';
            }

            // Add rules to style element
            if (style.styleSheet) {
                style.styleSheet.cssText = cssText;
            } else {
                style.textContent = cssText;
            }

            // Get media type
            _type = typeList[(info.zIndex * 1) || 0];

            head.removeChild(style);

            _setFeature();

            // Set up listeners
            addEvent(eventPrefix + 'resize', _watch);
            addEvent(eventPrefix + 'orientationchange', _watch);
        };

    _init();

    /*
        A list of parsed media queries, ex. screen and (max-width: 400px), screen and (max-width: 800px)
    */
    return function (media) {
        var id  = _queryID,
            mql = {
                matches         : false,
                media           : media,
                addListener     : function addListener(listener) {
                    _queries[id].listeners || (_queries[id].listeners = []);
                    listener && _queries[id].listeners.push(listener);
                },
                removeListener  : function removeListener(listener) {
                    var query   = _queries[id],
                        i       = 0,
                        il      = 0;

                    if (!query) {
                        return;
                    }

                    il = query.listeners.length;

                    for ( ; i < il; i++) {
                        if (query.listeners[i] === listener) {
                            query.listeners.splice(i, 1);
                        }
                    }
                }
            };

        if (media === '') {
            mql.matches = true;
            return mql;
        }

        mql.matches = _matches(media);

        _queryID = _queries.push({
            mql         : mql,
            listeners   : null
        });

        return mql;
    };
}(window));;//     postscribe.js 1.1.2
//     (c) Copyright 2012 to the present, Krux
//     postscribe is freely distributable under the MIT license.
//     For all details and documentation:
//     http://krux.github.com/postscribe


(function() {

    var global = this;

    if (global.postscribe) {
        return;
    }

    // Debug write tasks.
    var DEBUG = true;

    // Turn on to debug how each chunk affected the DOM.
    var DEBUG_CHUNK = false;

    // # Helper Functions

    var slice = Array.prototype.slice;

    // A function that intentionally does nothing.
    function doNothing() {}


    // Is this a function?
    function isFunction(x) {
        return "function" === typeof x;
    }

    // Loop over each item in an array-like value.
    function each(arr, fn, _this) {
        var i, len = (arr && arr.length) || 0;
        for (i = 0; i < len; i++) {
            fn.call(_this, arr[i], i);
        }
    }

    // Loop over each key/value pair in a hash.
    function eachKey(obj, fn, _this) {
        var key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                fn.call(_this, key, obj[key]);
            }
        }
    }

    // Set properties on an object.
    function set(obj, props) {
        eachKey(props, function(key, value) {
            obj[key] = value;
        });
        return obj;
    }

    // Set default options where some option was not specified.
    function defaults(options, _defaults) {
        options = options || {};
        eachKey(_defaults, function(key, val) {
            if (options[key] == null) {
                options[key] = val;
            }
        });
        return options;
    }

    // Convert value (e.g., a NodeList) to an array.
    function toArray(obj) {
        try {
            return slice.call(obj);
        } catch (e) {
            var ret = [];
            each(obj, function(val) {
                ret.push(val);
            });
            return ret;
        }
    }

    // Test if token is a script tag.
    function isScript(tok) {
        return (/^script$/i).test(tok.tagName);
    }

    // # Class WriteStream

    // Stream static html to an element, where "static html" denotes "html without scripts".

    // This class maintains a *history of writes devoid of any attributes* or "proxy history".
    // Injecting the proxy history into a temporary div has no side-effects,
    // other than to create proxy elements for previously written elements.

    // Given the `staticHtml` of a new write, a `tempDiv`'s innerHTML is set to `proxy_history + staticHtml`.
    // The *structure* of `tempDiv`'s contents, (i.e., the placement of new nodes beside or inside of proxy elements),
    // reflects the DOM structure that would have resulted if all writes had been squashed into a single write.

    // For each descendent `node` of `tempDiv` whose parentNode is a *proxy*, `node` is appended to the corresponding *real* element within the DOM.

    // Proxy elements are mapped to *actual* elements in the DOM by injecting a data-id attribute into each start tag in `staticHtml`.
    var WriteStream = (function() {

        // Prefix for data attributes on DOM elements.
        var BASEATTR = 'data-ps-';

        // get / set data attributes
        function data(el, name, value) {
            var attr = BASEATTR + name;

            if (arguments.length === 2) {
                // Get
                var val = el.getAttribute(attr);

                // IE 8 returns a number if it's a number
                return val == null ? val : String(val);

            } else if (value != null && value !== '') {
                // Set
                el.setAttribute(attr, value);

            } else {
                // Remove
                el.removeAttribute(attr);
            }
        }

        function WriteStream(root, options) {
            var doc = root.ownerDocument;

            set(this, {
                root: root,

                options: options,

                win: doc.defaultView || doc.parentWindow,

                doc: doc,

                parser: global.htmlParser('', {
                    autoFix: true
                }),

                // Actual elements by id.
                actuals: [root],

                // Embodies the "structure" of what's been written so far, devoid of attributes.
                proxyHistory: '',

                // Create a proxy of the root element.
                proxyRoot: doc.createElement(root.nodeName),

                scriptStack: [],

                writeQueue: []
            });

            data(this.proxyRoot, 'proxyof', 0);

        }


        WriteStream.prototype.write = function() {
            [].push.apply(this.writeQueue, arguments);
            // Process writes
            // When new script gets pushed or pending this will stop
            // because new writeQueue gets pushed
            var arg;
            while (!this.deferredRemote &&
                this.writeQueue.length) {
                arg = this.writeQueue.shift();

                if (isFunction(arg)) {
                    this.callFunction(arg);
                } else {
                    this.writeImpl(arg);
                }
            }
        };

        WriteStream.prototype.callFunction = function(fn) {
            var tok = {
                type: "function",
                value: fn.name || fn.toString()
            };
            this.onScriptStart(tok);
            fn.call(this.win, this.doc);
            this.onScriptDone(tok);
        };

        WriteStream.prototype.writeImpl = function(html) {
            this.parser.append(html);

            var tok, tokens = [];

            // stop if we see a script token
            while ((tok = this.parser.readToken()) && !isScript(tok)) {
                tokens.push(tok);
            }

            this.writeStaticTokens(tokens);

            if (tok) {
                this.handleScriptToken(tok);
            }
        };


        // ## Contiguous non-script tokens (a chunk)
        WriteStream.prototype.writeStaticTokens = function(tokens) {

            var chunk = this.buildChunk(tokens);

            if (!chunk.actual) {
                // e.g., no tokens, or a noscript that got ignored
                return;
            }
            chunk.html = this.proxyHistory + chunk.actual;
            this.proxyHistory += chunk.proxy;

            this.proxyRoot.innerHTML = chunk.html;

            if (DEBUG_CHUNK) {
                chunk.proxyInnerHTML = this.proxyRoot.innerHTML;
            }

            this.walkChunk();

            if (DEBUG_CHUNK) {
                chunk.actualInnerHTML = this.root.innerHTML; //root
            }

            return chunk;
        };


        WriteStream.prototype.buildChunk = function(tokens) {
            var nextId = this.actuals.length,

                // The raw html of this chunk.
                raw = [],

                // The html to create the nodes in the tokens (with id's injected).
                actual = [],

                // Html that can later be used to proxy the nodes in the tokens.
                proxy = [];

            each(tokens, function(tok) {

                raw.push(tok.text);

                if (tok.attrs) { // tok.attrs <==> startTag or atomicTag or cursor
                    // Ignore noscript tags. They are atomic, so we don't have to worry about children.
                    if (!(/^noscript$/i).test(tok.tagName)) {
                        var id = nextId++;

                        // Actual: inject id attribute: replace '>' at end of start tag with id attribute + '>'
                        actual.push(
                            tok.text.replace(/(\/?>)/, ' ' + BASEATTR + 'id=' + id + ' $1')
                        );

                        // Don't proxy scripts: they have no bearing on DOM structure.
                        if (tok.attrs.id !== "ps-script") {
                            // Proxy: strip all attributes and inject proxyof attribute
                            proxy.push(
                                // ignore atomic tags (e.g., style): they have no "structural" effect
                                tok.type === 'atomicTag' ? '' :
                                '<' + tok.tagName + ' ' + BASEATTR + 'proxyof=' + id + (tok.unary ? '/>' : '>')
                            );
                        }
                    }

                } else {
                    // Visit any other type of token
                    // Actual: append.
                    actual.push(tok.text);
                    // Proxy: append endTags. Ignore everything else.
                    proxy.push(tok.type === 'endTag' ? tok.text : '');
                }
            });

            return {
                tokens: tokens,
                raw: raw.join(''),
                actual: actual.join(''),
                proxy: proxy.join('')
            };
        };

        WriteStream.prototype.walkChunk = function() {
            var node, stack = [this.proxyRoot];

            // use shift/unshift so that children are walked in document order

            while ((node = stack.shift()) != null) {

                var isElement = node.nodeType === 1;
                var isProxy = isElement && data(node, 'proxyof');

                // Ignore proxies
                if (!isProxy) {

                    if (isElement) {
                        // New actual element: register it and remove the the id attr.
                        this.actuals[data(node, 'id')] = node;
                        data(node, 'id', null);
                    }

                    // Is node's parent a proxy?
                    var parentIsProxyOf = node.parentNode && data(node.parentNode, 'proxyof');
                    if (parentIsProxyOf) {
                        // Move node under actual parent.
                        this.actuals[parentIsProxyOf].appendChild(node);
                    }
                }
                // prepend childNodes to stack
                stack.unshift.apply(stack, toArray(node.childNodes));
            }
        };

        // ### Script tokens

        WriteStream.prototype.handleScriptToken = function(tok) {
            var remainder = this.parser.clear();

            if (remainder) {
                // Write remainder immediately behind this script.
                this.writeQueue.unshift(remainder);
            }

            tok.src = tok.attrs.src || tok.attrs.SRC;

            if (tok.src && this.scriptStack.length) {
                // Defer this script until scriptStack is empty.
                // Assumption 1: This script will not start executing until
                // scriptStack is empty.
                this.deferredRemote = tok;
            } else {
                this.onScriptStart(tok);
            }

            // Put the script node in the DOM.
            var _this = this;
            this.writeScriptToken(tok, function() {
                _this.onScriptDone(tok);
            });

        };

        WriteStream.prototype.onScriptStart = function(tok) {
            tok.outerWrites = this.writeQueue;
            this.writeQueue = [];
            this.scriptStack.unshift(tok);
        };

        WriteStream.prototype.onScriptDone = function(tok) {
            // Pop script and check nesting.
            if (tok !== this.scriptStack[0]) {
                this.options.error({
                    message: "Bad script nesting or script finished twice"
                });
                return;
            }
            this.scriptStack.shift();

            // Append outer writes to queue and process them.
            this.write.apply(this, tok.outerWrites);

            // Check for pending remote

            // Assumption 2: if remote_script1 writes remote_script2 then
            // the we notice remote_script1 finishes before remote_script2 starts.
            // I think this is equivalent to assumption 1
            if (!this.scriptStack.length && this.deferredRemote) {
                this.onScriptStart(this.deferredRemote);
                this.deferredRemote = null;
            }
        };

        // Build a script and insert it into the DOM.
        // Done is called once script has executed.
        WriteStream.prototype.writeScriptToken = function(tok, done) {
            var el = this.buildScript(tok);

            if (tok.src) {
                // Fix for attribute "SRC" (capitalized). IE does not recognize it.
                el.src = tok.src;
                this.scriptLoadHandler(el, done);
            }

            try {
                this.insertScript(el);
                if (!tok.src) {
                    done();
                }
            } catch (e) {
                this.options.error(e);
                done();
            }
        };

        // Build a script element from an atomic script token.
        WriteStream.prototype.buildScript = function(tok) {
            var el = this.doc.createElement(tok.tagName);

            // Set attributes
            eachKey(tok.attrs, function(name, value) {
                el.setAttribute(name, value);
            });

            // Set content
            if (tok.content) {
                el.text = tok.content;
            }

            return el;
        };


        // Insert script into DOM where it would naturally be written.
        WriteStream.prototype.insertScript = function(el) {
            // Append a span to the stream. That span will act as a cursor
            // (i.e. insertion point) for the script.
            this.writeImpl('<span id="ps-script"/>');

            // Grab that span from the DOM.
            var cursor = this.doc.getElementById("ps-script");

            // Replace cursor with script.
            cursor.parentNode.replaceChild(el, cursor);
        };


        WriteStream.prototype.scriptLoadHandler = function(el, done) {
            function cleanup() {
                el = el.onload = el.onreadystatechange = el.onerror = null;
                done();
            }

            // Error handler
            var error = this.options.error;

            // Set handlers
            set(el, {
                onload: function() {
                    cleanup();
                },

                onreadystatechange: function() {
                    if (/^(loaded|complete)$/.test(el.readyState)) {
                        cleanup();
                    }
                },

                onerror: function() {
                    error({
                        message: 'remote script failed ' + el.src
                    });
                    cleanup();
                }
            });
        };

        return WriteStream;

    }());






    // Public-facing interface and queuing
    var postscribe = (function() {
        var nextId = 0;

        var queue = [];

        var active = null;

        function nextStream() {
            var args = queue.shift();
            if (args) {
                args.stream = runStream.apply(null, args);
            }
        }


        function runStream(el, html, options) {
            active = new WriteStream(el, options);

            // Identify this stream.
            active.id = nextId++;
            active.name = options.name || active.id;
            postscribe.streams[active.name] = active;

            // Override document.write.
            var doc = el.ownerDocument;

            var stash = {
                write: doc.write,
                writeln: doc.writeln
            };

            function write(str) {
                str = options.beforeWrite(str);
                active.write(str);
                options.afterWrite(str);
            }

            set(doc, {
                write: function() {
                    return write(toArray(arguments).join(''));
                },
                writeln: function(str) {
                    return write(toArray(arguments).join('') + '\n');
                }
            });

            // Override window.onerror
            var oldOnError = active.win.onerror || doNothing;

            // This works together with the try/catch around WriteStream::insertScript
            // In modern browsers, exceptions in tag scripts go directly to top level
            active.win.onerror = function(msg, url, line) {
                options.error({
                    msg: msg + ' - ' + url + ':' + line
                });
                oldOnError.apply(active.win, arguments);
            };

            // Write to the stream
            active.write(html, function streamDone() {
                // restore document.write
                set(doc, stash);

                // restore window.onerror
                active.win.onerror = oldOnError;

                options.done();
                active = null;
                nextStream();
            });

            return active;
        }


        function postscribe(el, html, options) {
            if (isFunction(options)) {
                options = {
                    done: options
                };
            }
            options = defaults(options, {
                done: doNothing,
                error: function(e) {
                    throw e;
                },
                beforeWrite: function(str) {
                    return str;
                },
                afterWrite: doNothing
            });

            el =
            // id selector
            (/^#/).test(el) ? global.document.getElementById(el.substr(1)) :
            // jquery object. TODO: loop over all elements.
            el.jquery ? el[0] : el;


            var args = [el, html, options];

            el.postscribe = {
                cancel: function() {
                    if (args.stream) {
                        // TODO: implement this
                        args.stream.abort();
                    } else {
                        args[1] = doNothing;
                    }
                }
            };

            queue.push(args);
            if (!active) {
                nextStream();
            }

            return el.postscribe;
        }

        return set(postscribe, {
            // Streams by name.
            streams: {},
            // Queue of streams.
            queue: queue,
            // Expose internal classes.
            WriteStream: WriteStream
        });

    }());

    // export postscribe
    global.postscribe = postscribe;

}());;/*!
  * domready (c) Dustin Diaz 2012 - License MIT
  */
!function (name, definition) {
  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()
}('domready', function (ready) {

  var fns = [], fn, f = false
    , doc = document
    , testEl = doc.documentElement
    , hack = testEl.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , addEventListener = 'addEventListener'
    , onreadystatechange = 'onreadystatechange'
    , readyState = 'readyState'
    , loadedRgx = hack ? /^loaded|^c/ : /^loaded|c/
    , loaded = loadedRgx.test(doc[readyState])

  function flush(f) {
    loaded = 1
    while (f = fns.shift()) f()
  }

  doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
    doc.removeEventListener(domContentLoaded, fn, f)
    flush()
  }, f)


  hack && doc.attachEvent(onreadystatechange, fn = function () {
    if (/^c/.test(doc[readyState])) {
      doc.detachEvent(onreadystatechange, fn)
      flush()
    }
  })

  return (ready = hack ?
    function (fn) {
      self != top ?
        loaded ? fn() : fns.push(fn) :
        function () {
          try {
            testEl.doScroll('left')
          } catch (e) {
            return setTimeout(function() { ready(fn) }, 50)
          }
          fn()
        }()
    } :
    function (fn) {
      loaded ? fn() : fns.push(fn)
    })
})
;(function() {

    var debug = true;

    var config = {
        containerElement: 'div',
        containerClass: 'ad'
    };

    var startTime,
        hasjQuery = (window.jQuery || window.Zepto) ? true : false;


    // Global object
    window.LazyAds = LazyAds = {};



    /**
     * Utility functions
     *
     */
    ''.trim || (String.prototype.trim = function() {
        return this.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
    });

    function log() {
        if (debug === true && window.console) {
            // Only run on the first time through - reset this function to the appropriate console.log helper
            if (Function.prototype.bind) {
                log = Function.prototype.bind.call(console.log, console);
            } else {
                log = function() {
                    Function.prototype.apply.call(console.log, console, arguments);
                };
            }

            log.apply(this, arguments);
        }
    }

    // Debounce source: https://github.com/rhysbrettbowen/debounce
    function debounce(func, wait) {
        // we need to save these in the closure
        var timeout, args, context, timestamp;

        return function() {

            // save details of latest call
            context = this;
            args = [].slice.call(arguments, 0);
            timestamp = new Date();

            // this is where the magic happens
            var later = function() {

                // how long ago was the last call
                var last = (new Date()) - timestamp;

                // if the latest call was less that the wait period ago
                // then we reset the timeout to wait for the difference
                if (last < wait) {
                    timeout = setTimeout(later, wait - last);

                    // or if not we can null out the timer and run the latest
                } else {
                    timeout = null;
                    func.apply(context, args);
                }
            };

            // we only need to set the timer now if one isn't already running
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
        };
    }

    function addEvent(evnt, elem, func) {
        if (elem.addEventListener) // W3C DOM
            elem.addEventListener(evnt, func, false);
        else if (elem.attachEvent) { // IE DOM
            elem.attachEvent("on" + evnt, func);
        } else { // No much to do
            elem["on" + evnt] = func;
        }
    }


    // Internals
    var find = function(tagName, className, context) {
        var results = [],
            selector, node, i, isLazyAd, classListSupported, querySelectorSupported,
            context = context || document;

        if (hasjQuery === true) {
            log('Using jquery')
            return $(context).find(tagname + '.' + className);
        }

        classListSupported = 'classList' in document.createElement("_"),
        querySelectorSupported = 'querySelectorAll' in document;

        if (querySelectorSupported) {
            selector = tagName;
            selector += className ? '.' + className : '';
            results = context.querySelectorAll(selector);

        } else {
            q = context.getElementsByTagName(tagName);

            for (i = 0; i < q.length; i++) {
                node = q[i];
                if (className === false) {
                    results.push(node);
                } else {
                    if (classListSupported) {
                        if (node.classList.contains(className)) {
                            results.push(node);
                        }
                    } else {
                        if (node.className && node.className.split(/\s/).indexOf(className) !== -1) {
                            results.push(node);
                        }
                    }
                }
            }
        }

        return results;
    };

    var findAdContainers = function(root) {
        var containers = find(config.containerElement, config.containerClass),
            node,
            isLazyAd = false,
            results = [];

        for (var i = 0; i < containers.length; i++) {
            node = containers[i];
            isLazyAd = (node.getAttribute('data-lazyad') !== null);

            if (isLazyAd === true) {
                results.push(node);
            }
        }

        return results;
    };

    var findAdScripts = function(root) {
        var ads = find('script', false, root),
            node,
            type,
            results = [];

        for (var i = 0; i < ads.length; i++) {
            node = ads[i];
            type = node.getAttribute('type');
            if (type && type === 'text/lazyad') {
                results.push(node);
            }
        }

        return results;
    };

    var stripCommentBlock = function(str) {
        // trim whitespace
        str = str.replace(/^\s+|\s+$/g, '');
        return str.replace('<!--', '').replace('-->', '').trim();
    };

    var adReplace = function(el, text) {
        var node, target;

        log('Injecting lazy-loaded Ad', el);

        text = stripCommentBlock(text);
        setTimeout(function() {
            postscribe(el, text);
        }, 0);

        // set the loaded flag
        el.setAttribute('data-lazyad-loaded', true);
    };

    var processAll = function(adContainers) {

        var counter = 0,
            el,
            adScripts,
            lazyAdEl,
            lazyAdElType,
            elWidth,
            elHeight,
            reqAdWidth,
            reqAdHeight,
            mq,
            sizeReqFulfilled,
            isLoaded;

        for (var x = 0; x < adContainers.length; x++) {

            el = adContainers[x];
            mq = el.getAttribute('data-matchmedia') || false;
            reqAdWidth = parseInt(el.getAttribute('data-adwidth'), 0) || false;
            reqAdHeight = parseInt(el.getAttribute('data-adheight'), 0) || false;
            adScripts = findAdScripts(el);

            for (var i = 0; i < adScripts.length; i++) {
                lazyAdEl = adScripts[i];

                isLoaded = (el.getAttribute('data-lazyad-loaded') === "true");


                if (reqAdWidth || reqAdHeight) {
                    elWidth = el.offsetWidth;
                    elHeight = el.offsetHeight;
                    sizeReqFulfilled = true;

                    if (reqAdWidth && (reqAdWidth > elWidth)) sizeReqFulfilled = false;
                    if (reqAdHeight && (reqAdHeight > elHeight)) sizeReqFulfilled = false;

                    if (sizeReqFulfilled === false) {
                        // log('Lazy-loaded container dimensions fulfilment not met.', reqAdWidth, reqAdHeight, elWidth, elHeight, el, lazyAdEl);
                        if (isLoaded) {
                            unloadAds(el);
                        }
                        break;
                    }
                }

                if (mq !== false && matchMedia(mq).matches === false) {
                    // log('Lazy-loaded Ad media-query fulfilment not met.', el, lazyAdEl);
                    if (isLoaded) {
                        unloadAds(el);
                    }
                    break;
                }

                if (!isLoaded) {
                    adReplace(el, lazyAdEl.innerHTML);
                    counter++;
                }

            }

        }

        return counter;
    };

    var unloadAds = function(el) {
        log('Unloading Ad:', el);
        var childNodes = el.getElementsByTagName('*');

        while (childNodes) {
            var child = childNodes[childNodes.length - 1];
            if (child.nodeName.toLowerCase() === 'script' && child.type === 'text/lazyad') {
                // dont want to remove the lazy-loaded script
                break;
            } else {
                child.parentNode.removeChild(child);
            }
        }

        el.setAttribute('data-lazyad-loaded', "false");
    }

    // Expose init method
    LazyAds.init = function() {
        var adContainers,
            timeToComplete,
            counter = 0;


        log('Lazyad init. Using jQuery/Zepto: ' + hasjQuery);

        // reset timer
        startTime = new Date().getTime();

        // find all lazyads
        adContainers = findAdContainers();

        // process/replace/unload
        if (adContainers && adContainers.length > 0) {
            counter = processAll(adContainers);
        }

        // stop the clock…
        timeToComplete = (new Date().getTime() - startTime);
        timeToComplete = '~' + timeToComplete + 'ms';

        // finished
        log('Lazy-loaded count: ', counter, timeToComplete);
    };

    // dependency on ready.js
    domready(function() {

        // watch the windows resize event
        addEvent('resize', window, debounce(function(e) {
            LazyAds.init();
        }, 250));

        LazyAds.init();
    });

})();