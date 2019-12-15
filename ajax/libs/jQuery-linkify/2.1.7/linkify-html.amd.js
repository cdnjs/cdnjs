define("simple-html-tokenizer/entity-parser", ["module", "exports"], function (module, exports) {
  "use strict";

  try { try { Object.defineProperty(exports, "__esModule", {
    value: true
  }); } catch (e) { exports['__esModule'] = true; } } catch (e) { exports['__esModule'] = true; }
  function EntityParser(named) {
    this.named = named;
  }

  var HEXCHARCODE = /^#[xX]([A-Fa-f0-9]+)$/;
  var CHARCODE = /^#([0-9]+)$/;
  var NAMED = /^([A-Za-z0-9]+)$/;

  EntityParser.prototype.parse = function (entity) {
    if (!entity) {
      return;
    }
    var matches = entity.match(HEXCHARCODE);
    if (matches) {
      return "&#x" + matches[1] + ";";
    }
    matches = entity.match(CHARCODE);
    if (matches) {
      return "&#" + matches[1] + ";";
    }
    matches = entity.match(NAMED);
    if (matches) {
      return this.named[matches[1]] || "&" + matches[1] + ";";
    }
  };

  exports['default'] = EntityParser;
  module.exports = exports["default"];
});
define('simple-html-tokenizer/evented-tokenizer', ['module', 'exports', './utils'], function (module, exports, _utils) {
  'use strict';

  try { try { Object.defineProperty(exports, "__esModule", {
    value: true
  }); } catch (e) { exports['__esModule'] = true; } } catch (e) { exports['__esModule'] = true; }


  function EventedTokenizer(delegate, entityParser) {
    this.delegate = delegate;
    this.entityParser = entityParser;

    this.state = null;
    this.input = null;

    this.index = -1;
    this.line = -1;
    this.column = -1;
    this.tagLine = -1;
    this.tagColumn = -1;

    this.reset();
  }

  EventedTokenizer.prototype = {
    reset: function reset() {
      this.state = 'beforeData';
      this.input = '';

      this.index = 0;
      this.line = 1;
      this.column = 0;

      this.tagLine = -1;
      this.tagColumn = -1;

      this.delegate.reset();
    },

    tokenize: function tokenize(input) {
      this.reset();
      this.tokenizePart(input);
      this.tokenizeEOF();
    },

    tokenizePart: function tokenizePart(input) {
      this.input += (0, _utils.preprocessInput)(input);

      while (this.index < this.input.length) {
        this.states[this.state].call(this);
      }
    },

    tokenizeEOF: function tokenizeEOF() {
      this.flushData();
    },

    flushData: function flushData() {
      if (this.state === 'data') {
        this.delegate.finishData();
        this.state = 'beforeData';
      }
    },

    peek: function peek() {
      return this.input.charAt(this.index);
    },

    consume: function consume() {
      var char = this.peek();

      this.index++;

      if (char === "\n") {
        this.line++;
        this.column = 0;
      } else {
        this.column++;
      }

      return char;
    },

    consumeCharRef: function consumeCharRef() {
      var endIndex = this.input.indexOf(';', this.index);
      if (endIndex === -1) {
        return;
      }
      var entity = this.input.slice(this.index, endIndex);
      var chars = this.entityParser.parse(entity);
      if (chars) {
        var count = entity.length;
        // consume the entity chars
        while (count) {
          this.consume();
          count--;
        }
        // consume the `;`
        this.consume();

        return chars;
      }
    },

    markTagStart: function markTagStart() {
      // these properties to be removed in next major bump
      this.tagLine = this.line;
      this.tagColumn = this.column;

      if (this.delegate.tagOpen) {
        this.delegate.tagOpen();
      }
    },

    states: {
      beforeData: function beforeData() {
        var char = this.peek();

        if (char === "<") {
          this.state = 'tagOpen';
          this.markTagStart();
          this.consume();
        } else {
          this.state = 'data';
          this.delegate.beginData();
        }
      },

      data: function data() {
        var char = this.peek();

        if (char === "<") {
          this.delegate.finishData();
          this.state = 'tagOpen';
          this.markTagStart();
          this.consume();
        } else if (char === "&") {
          this.consume();
          this.delegate.appendToData(this.consumeCharRef() || "&");
        } else {
          this.consume();
          this.delegate.appendToData(char);
        }
      },

      tagOpen: function tagOpen() {
        var char = this.consume();

        if (char === "!") {
          this.state = 'markupDeclaration';
        } else if (char === "/") {
          this.state = 'endTagOpen';
        } else if ((0, _utils.isAlpha)(char)) {
          this.state = 'tagName';
          this.delegate.beginStartTag();
          this.delegate.appendToTagName(char.toLowerCase());
        }
      },

      markupDeclaration: function markupDeclaration() {
        var char = this.consume();

        if (char === "-" && this.input.charAt(this.index) === "-") {
          this.consume();
          this.state = 'commentStart';
          this.delegate.beginComment();
        }
      },

      commentStart: function commentStart() {
        var char = this.consume();

        if (char === "-") {
          this.state = 'commentStartDash';
        } else if (char === ">") {
          this.delegate.finishComment();
          this.state = 'beforeData';
        } else {
          this.delegate.appendToCommentData(char);
          this.state = 'comment';
        }
      },

      commentStartDash: function commentStartDash() {
        var char = this.consume();

        if (char === "-") {
          this.state = 'commentEnd';
        } else if (char === ">") {
          this.delegate.finishComment();
          this.state = 'beforeData';
        } else {
          this.delegate.appendToCommentData("-");
          this.state = 'comment';
        }
      },

      comment: function comment() {
        var char = this.consume();

        if (char === "-") {
          this.state = 'commentEndDash';
        } else {
          this.delegate.appendToCommentData(char);
        }
      },

      commentEndDash: function commentEndDash() {
        var char = this.consume();

        if (char === "-") {
          this.state = 'commentEnd';
        } else {
          this.delegate.appendToCommentData("-" + char);
          this.state = 'comment';
        }
      },

      commentEnd: function commentEnd() {
        var char = this.consume();

        if (char === ">") {
          this.delegate.finishComment();
          this.state = 'beforeData';
        } else {
          this.delegate.appendToCommentData("--" + char);
          this.state = 'comment';
        }
      },

      tagName: function tagName() {
        var char = this.consume();

        if ((0, _utils.isSpace)(char)) {
          this.state = 'beforeAttributeName';
        } else if (char === "/") {
          this.state = 'selfClosingStartTag';
        } else if (char === ">") {
          this.delegate.finishTag();
          this.state = 'beforeData';
        } else {
          this.delegate.appendToTagName(char);
        }
      },

      beforeAttributeName: function beforeAttributeName() {
        var char = this.peek();

        if ((0, _utils.isSpace)(char)) {
          this.consume();
          return;
        } else if (char === "/") {
          this.state = 'selfClosingStartTag';
          this.consume();
        } else if (char === ">") {
          this.consume();
          this.delegate.finishTag();
          this.state = 'beforeData';
        } else {
          this.state = 'attributeName';
          this.delegate.beginAttribute();
          this.consume();
          this.delegate.appendToAttributeName(char);
        }
      },

      attributeName: function attributeName() {
        var char = this.peek();

        if ((0, _utils.isSpace)(char)) {
          this.state = 'afterAttributeName';
          this.consume();
        } else if (char === "/") {
          this.delegate.beginAttributeValue(false);
          this.delegate.finishAttributeValue();
          this.consume();
          this.state = 'selfClosingStartTag';
        } else if (char === "=") {
          this.state = 'beforeAttributeValue';
          this.consume();
        } else if (char === ">") {
          this.delegate.beginAttributeValue(false);
          this.delegate.finishAttributeValue();
          this.consume();
          this.delegate.finishTag();
          this.state = 'beforeData';
        } else {
          this.consume();
          this.delegate.appendToAttributeName(char);
        }
      },

      afterAttributeName: function afterAttributeName() {
        var char = this.peek();

        if ((0, _utils.isSpace)(char)) {
          this.consume();
          return;
        } else if (char === "/") {
          this.delegate.beginAttributeValue(false);
          this.delegate.finishAttributeValue();
          this.consume();
          this.state = 'selfClosingStartTag';
        } else if (char === "=") {
          this.consume();
          this.state = 'beforeAttributeValue';
        } else if (char === ">") {
          this.delegate.beginAttributeValue(false);
          this.delegate.finishAttributeValue();
          this.consume();
          this.delegate.finishTag();
          this.state = 'beforeData';
        } else {
          this.delegate.beginAttributeValue(false);
          this.delegate.finishAttributeValue();
          this.consume();
          this.state = 'attributeName';
          this.delegate.beginAttribute();
          this.delegate.appendToAttributeName(char);
        }
      },

      beforeAttributeValue: function beforeAttributeValue() {
        var char = this.peek();

        if ((0, _utils.isSpace)(char)) {
          this.consume();
        } else if (char === '"') {
          this.state = 'attributeValueDoubleQuoted';
          this.delegate.beginAttributeValue(true);
          this.consume();
        } else if (char === "'") {
          this.state = 'attributeValueSingleQuoted';
          this.delegate.beginAttributeValue(true);
          this.consume();
        } else if (char === ">") {
          this.delegate.beginAttributeValue(false);
          this.delegate.finishAttributeValue();
          this.consume();
          this.delegate.finishTag();
          this.state = 'beforeData';
        } else {
          this.state = 'attributeValueUnquoted';
          this.delegate.beginAttributeValue(false);
          this.consume();
          this.delegate.appendToAttributeValue(char);
        }
      },

      attributeValueDoubleQuoted: function attributeValueDoubleQuoted() {
        var char = this.consume();

        if (char === '"') {
          this.delegate.finishAttributeValue();
          this.state = 'afterAttributeValueQuoted';
        } else if (char === "&") {
          this.delegate.appendToAttributeValue(this.consumeCharRef('"') || "&");
        } else {
          this.delegate.appendToAttributeValue(char);
        }
      },

      attributeValueSingleQuoted: function attributeValueSingleQuoted() {
        var char = this.consume();

        if (char === "'") {
          this.delegate.finishAttributeValue();
          this.state = 'afterAttributeValueQuoted';
        } else if (char === "&") {
          this.delegate.appendToAttributeValue(this.consumeCharRef("'") || "&");
        } else {
          this.delegate.appendToAttributeValue(char);
        }
      },

      attributeValueUnquoted: function attributeValueUnquoted() {
        var char = this.peek();

        if ((0, _utils.isSpace)(char)) {
          this.delegate.finishAttributeValue();
          this.consume();
          this.state = 'beforeAttributeName';
        } else if (char === "&") {
          this.consume();
          this.delegate.appendToAttributeValue(this.consumeCharRef(">") || "&");
        } else if (char === ">") {
          this.delegate.finishAttributeValue();
          this.consume();
          this.delegate.finishTag();
          this.state = 'beforeData';
        } else {
          this.consume();
          this.delegate.appendToAttributeValue(char);
        }
      },

      afterAttributeValueQuoted: function afterAttributeValueQuoted() {
        var char = this.peek();

        if ((0, _utils.isSpace)(char)) {
          this.consume();
          this.state = 'beforeAttributeName';
        } else if (char === "/") {
          this.consume();
          this.state = 'selfClosingStartTag';
        } else if (char === ">") {
          this.consume();
          this.delegate.finishTag();
          this.state = 'beforeData';
        } else {
          this.state = 'beforeAttributeName';
        }
      },

      selfClosingStartTag: function selfClosingStartTag() {
        var char = this.peek();

        if (char === ">") {
          this.consume();
          this.delegate.markTagAsSelfClosing();
          this.delegate.finishTag();
          this.state = 'beforeData';
        } else {
          this.state = 'beforeAttributeName';
        }
      },

      endTagOpen: function endTagOpen() {
        var char = this.consume();

        if ((0, _utils.isAlpha)(char)) {
          this.state = 'tagName';
          this.delegate.beginEndTag();
          this.delegate.appendToTagName(char.toLowerCase());
        }
      }
    }
  };

  exports['default'] = EventedTokenizer;
  module.exports = exports['default'];
});
define("simple-html-tokenizer/html5-named-char-refs", ["module", "exports"], function (module, exports) {
    "use strict";

    try { try { Object.defineProperty(exports, "__esModule", {
        value: true
    }); } catch (e) { exports['__esModule'] = true; } } catch (e) { exports['__esModule'] = true; }
    var HTML5NamedCharRefs = {
        // We don't need the complete named character reference because linkifyHtml
        // does not modify the escape sequences. We do need &nbsp; so that
        // whitespace is parsed properly. Other types of whitespace should already
        // be accounted for
        nbsp: "\xA0"
    };
    exports['default'] = HTML5NamedCharRefs;
    module.exports = exports["default"];
});
define('simple-html-tokenizer/index', ['exports', './html5-named-char-refs', './entity-parser', './evented-tokenizer', './tokenizer', './tokenize'], function (exports, _html5NamedCharRefs, _entityParser, _eventedTokenizer, _tokenizer, _tokenize) {
  'use strict';

  try { try { Object.defineProperty(exports, "__esModule", {
    value: true
  }); } catch (e) { exports['__esModule'] = true; } } catch (e) { exports['__esModule'] = true; }
  Object.defineProperty(exports, 'HTML5NamedCharRefs', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_html5NamedCharRefs)['default'];
    }
  });
  Object.defineProperty(exports, 'EntityParser', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_entityParser)['default'];
    }
  });
  Object.defineProperty(exports, 'EventedTokenizer', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_eventedTokenizer)['default'];
    }
  });
  Object.defineProperty(exports, 'Tokenizer', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_tokenizer)['default'];
    }
  });
  Object.defineProperty(exports, 'tokenize', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_tokenize)['default'];
    }
  });

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      'default': obj
    };
  }
});
define('simple-html-tokenizer/tokenize', ['module', 'exports', './tokenizer', './entity-parser', './html5-named-char-refs'], function (module, exports, _tokenizer, _entityParser, _html5NamedCharRefs) {
  'use strict';

  try { try { Object.defineProperty(exports, "__esModule", {
    value: true
  }); } catch (e) { exports['__esModule'] = true; } } catch (e) { exports['__esModule'] = true; }
  exports['default'] = tokenize;

  var _tokenizer2 = _interopRequireDefault(_tokenizer);

  var _entityParser2 = _interopRequireDefault(_entityParser);

  var _html5NamedCharRefs2 = _interopRequireDefault(_html5NamedCharRefs);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      'default': obj
    };
  }

  function tokenize(input, options) {
    var tokenizer = new _tokenizer2['default'](new _entityParser2['default'](_html5NamedCharRefs2['default']), options);
    return tokenizer.tokenize(input);
  }
  module.exports = exports['default'];
});
define('simple-html-tokenizer/tokenizer', ['module', 'exports', './evented-tokenizer'], function (module, exports, _eventedTokenizer) {
  'use strict';

  try { try { Object.defineProperty(exports, "__esModule", {
    value: true
  }); } catch (e) { exports['__esModule'] = true; } } catch (e) { exports['__esModule'] = true; }

  var _eventedTokenizer2 = _interopRequireDefault(_eventedTokenizer);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      'default': obj
    };
  }

  function Tokenizer(entityParser, options) {
    this.token = null;
    this.startLine = 1;
    this.startColumn = 0;
    this.options = options || {};
    this.tokenizer = new _eventedTokenizer2['default'](this, entityParser);
  }

  Tokenizer.prototype = {
    tokenize: function tokenize(input) {
      this.tokens = [];
      this.tokenizer.tokenize(input);
      return this.tokens;
    },

    tokenizePart: function tokenizePart(input) {
      this.tokens = [];
      this.tokenizer.tokenizePart(input);
      return this.tokens;
    },

    tokenizeEOF: function tokenizeEOF() {
      this.tokens = [];
      this.tokenizer.tokenizeEOF();
      return this.tokens[0];
    },

    reset: function reset() {
      this.token = null;
      this.startLine = 1;
      this.startColumn = 0;
    },

    addLocInfo: function addLocInfo() {
      if (this.options.loc) {
        this.token.loc = {
          start: {
            line: this.startLine,
            column: this.startColumn
          },
          end: {
            line: this.tokenizer.line,
            column: this.tokenizer.column
          }
        };
      }
      this.startLine = this.tokenizer.line;
      this.startColumn = this.tokenizer.column;
    },

    // Data

    beginData: function beginData() {
      this.token = {
        type: 'Chars',
        chars: ''
      };
      this.tokens.push(this.token);
    },

    appendToData: function appendToData(char) {
      this.token.chars += char;
    },

    finishData: function finishData() {
      this.addLocInfo();
    },

    // Comment

    beginComment: function beginComment() {
      this.token = {
        type: 'Comment',
        chars: ''
      };
      this.tokens.push(this.token);
    },

    appendToCommentData: function appendToCommentData(char) {
      this.token.chars += char;
    },

    finishComment: function finishComment() {
      this.addLocInfo();
    },

    // Tags - basic

    beginStartTag: function beginStartTag() {
      this.token = {
        type: 'StartTag',
        tagName: '',
        attributes: [],
        selfClosing: false
      };
      this.tokens.push(this.token);
    },

    beginEndTag: function beginEndTag() {
      this.token = {
        type: 'EndTag',
        tagName: ''
      };
      this.tokens.push(this.token);
    },

    finishTag: function finishTag() {
      this.addLocInfo();
    },

    markTagAsSelfClosing: function markTagAsSelfClosing() {
      this.token.selfClosing = true;
    },

    // Tags - name

    appendToTagName: function appendToTagName(char) {
      this.token.tagName += char;
    },

    // Tags - attributes

    beginAttribute: function beginAttribute() {
      this._currentAttribute = ["", "", null];
      this.token.attributes.push(this._currentAttribute);
    },

    appendToAttributeName: function appendToAttributeName(char) {
      this._currentAttribute[0] += char;
    },

    beginAttributeValue: function beginAttributeValue(isQuoted) {
      this._currentAttribute[2] = isQuoted;
    },

    appendToAttributeValue: function appendToAttributeValue(char) {
      this._currentAttribute[1] = this._currentAttribute[1] || "";
      this._currentAttribute[1] += char;
    },

    finishAttributeValue: function finishAttributeValue() {}
  };

  exports['default'] = Tokenizer;
  module.exports = exports['default'];
});
define("simple-html-tokenizer/utils", ["exports"], function (exports) {
  "use strict";

  try { try { Object.defineProperty(exports, "__esModule", {
    value: true
  }); } catch (e) { exports['__esModule'] = true; } } catch (e) { exports['__esModule'] = true; }
  exports.isSpace = isSpace;
  exports.isAlpha = isAlpha;
  exports.preprocessInput = preprocessInput;
  var WSP = /[\t\n\f ]/;
  var ALPHA = /[A-Za-z]/;
  var CRLF = /\r\n?/g;

  function isSpace(char) {
    return WSP.test(char);
  }

  function isAlpha(char) {
    return ALPHA.test(char);
  }

  function preprocessInput(input) {
    return input.replace(CRLF, "\n");
  }
});
define('simple-html-tokenizer', ['module', 'exports', './simple-html-tokenizer/html5-named-char-refs', './simple-html-tokenizer/entity-parser', './simple-html-tokenizer/evented-tokenizer', './simple-html-tokenizer/tokenizer', './simple-html-tokenizer/tokenize'], function (module, exports, _html5NamedCharRefs, _entityParser, _eventedTokenizer, _tokenizer, _tokenize) {
	'use strict';

	try { try { Object.defineProperty(exports, "__esModule", {
		value: true
	}); } catch (e) { exports['__esModule'] = true; } } catch (e) { exports['__esModule'] = true; }

	var _html5NamedCharRefs2 = _interopRequireDefault(_html5NamedCharRefs);

	var _entityParser2 = _interopRequireDefault(_entityParser);

	var _eventedTokenizer2 = _interopRequireDefault(_eventedTokenizer);

	var _tokenizer2 = _interopRequireDefault(_tokenizer);

	var _tokenize2 = _interopRequireDefault(_tokenize);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			'default': obj
		};
	}

	var HTML5Tokenizer = {
		HTML5NamedCharRefs: _html5NamedCharRefs2['default'],
		EntityParser: _entityParser2['default'],
		EventedTokenizer: _eventedTokenizer2['default'],
		Tokenizer: _tokenizer2['default'],
		tokenize: _tokenize2['default']
	};

	exports['default'] = HTML5Tokenizer;
	module.exports = exports['default'];
});
define('linkify-html', ['module', 'exports', './simple-html-tokenizer', './linkify'], function (module, exports, _simpleHtmlTokenizer, _linkify) {
	'use strict';

	try { try { Object.defineProperty(exports, "__esModule", {
		value: true
	}); } catch (e) { exports['__esModule'] = true; } } catch (e) { exports['__esModule'] = true; }
	exports['default'] = linkifyHtml;

	var _simpleHtmlTokenizer2 = _interopRequireDefault(_simpleHtmlTokenizer);

	var linkify = _interopRequireWildcard(_linkify);

	function _interopRequireWildcard(obj) {
		if (obj && obj.__esModule) {
			return obj;
		} else {
			var newObj = {};

			if (obj != null) {
				for (var key in obj) {
					if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
				}
			}

			newObj['default'] = obj;
			return newObj;
		}
	}

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			'default': obj
		};
	}

	var options = linkify.options;
	var Options = options.Options;


	var StartTag = 'StartTag';
	var EndTag = 'EndTag';
	var Chars = 'Chars';
	var Comment = 'Comment';

	/**
 	`tokens` and `token` in this section refer to tokens generated by the HTML
 	parser.
 */
	function linkifyHtml(str) {
		var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		var tokens = _simpleHtmlTokenizer2['default'].tokenize(str);
		var linkifiedTokens = [];
		var linkified = [];
		var i;

		opts = new Options(opts);

		// Linkify the tokens given by the parser
		for (i = 0; i < tokens.length; i++) {
			var token = tokens[i];

			if (token.type === StartTag) {
				linkifiedTokens.push(token);

				// Ignore all the contents of ignored tags
				var tagName = token.tagName.toUpperCase();
				var isIgnored = tagName === 'A' || options.contains(opts.ignoreTags, tagName);
				if (!isIgnored) {
					continue;
				}

				var preskipLen = linkifiedTokens.length;
				skipTagTokens(tagName, tokens, ++i, linkifiedTokens);
				i += linkifiedTokens.length - preskipLen - 1;
				continue;
			} else if (token.type !== Chars) {
				// Skip this token, it's not important
				linkifiedTokens.push(token);
				continue;
			}

			// Valid text token, linkify it!
			var linkifedChars = linkifyChars(token.chars, opts);
			linkifiedTokens.push.apply(linkifiedTokens, linkifedChars);
		}

		// Convert the tokens back into a string
		for (i = 0; i < linkifiedTokens.length; i++) {
			var _token = linkifiedTokens[i];
			switch (_token.type) {
				case StartTag:
					{
						var link = '<' + _token.tagName;
						if (_token.attributes.length > 0) {
							var attrs = attrsToStrings(_token.attributes);
							link += ' ' + attrs.join(' ');
						}
						link += '>';
						linkified.push(link);
						break;
					}
				case EndTag:
					linkified.push('</' + _token.tagName + '>');
					break;
				case Chars:
					linkified.push(escapeText(_token.chars));
					break;
				case Comment:
					linkified.push('<!--' + escapeText(_token.chars) + '-->');
					break;
			}
		}

		return linkified.join('');
	}

	/**
 	`tokens` and `token` in this section referes to tokens returned by
 	`linkify.tokenize`. `linkified` will contain HTML Parser-style tokens
 */
	function linkifyChars(str, opts) {
		var tokens = linkify.tokenize(str);
		var result = [];

		for (var i = 0; i < tokens.length; i++) {
			var token = tokens[i];

			if (token.type === 'nl' && opts.nl2br) {
				result.push({
					type: StartTag,
					tagName: 'br',
					attributes: [],
					selfClosing: true
				});
				continue;
			} else if (!token.isLink || !opts.check(token)) {
				result.push({ type: Chars, chars: token.toString() });
				continue;
			}

			var _opts$resolve = opts.resolve(token),
			    formatted = _opts$resolve.formatted,
			    formattedHref = _opts$resolve.formattedHref,
			    tagName = _opts$resolve.tagName,
			    className = _opts$resolve.className,
			    target = _opts$resolve.target,
			    attributes = _opts$resolve.attributes;

			// Build up attributes
			var attributeArray = [['href', formattedHref]];

			if (className) {
				attributeArray.push(['class', className]);
			}

			if (target) {
				attributeArray.push(['target', target]);
			}

			for (var attr in attributes) {
				attributeArray.push([attr, attributes[attr]]);
			}

			// Add the required tokens
			result.push({
				type: StartTag,
				tagName: tagName,
				attributes: attributeArray,
				selfClosing: false
			});
			result.push({ type: Chars, chars: formatted });
			result.push({ type: EndTag, tagName: tagName });
		}

		return result;
	}

	/**
 	Returns a list of tokens skipped until the closing tag of tagName.
 
 	* `tagName` is the closing tag which will prompt us to stop skipping
 	* `tokens` is the array of tokens generated by HTML5Tokenizer which
 	* `i` is the index immediately after the opening tag to skip
 	* `skippedTokens` is an array which skipped tokens are being pushed into
 
 	Caveats
 
 	* Assumes that i is the first token after the given opening tagName
 	* The closing tag will be skipped, but nothing after it
 	* Will track whether there is a nested tag of the same type
 */
	function skipTagTokens(tagName, tokens, i, skippedTokens) {

		// number of tokens of this type on the [fictional] stack
		var stackCount = 1;

		while (i < tokens.length && stackCount > 0) {
			var token = tokens[i];

			if (token.type === StartTag && token.tagName.toUpperCase() === tagName) {
				// Nested tag of the same type, "add to stack"
				stackCount++;
			} else if (token.type === EndTag && token.tagName.toUpperCase() === tagName) {
				// Closing tag
				stackCount--;
			}

			skippedTokens.push(token);
			i++;
		}

		// Note that if stackCount > 0 here, the HTML is probably invalid
		return skippedTokens;
	}

	function escapeText(text) {
		// Not required, HTML tokenizer ensures this occurs properly
		return text;
	}

	function escapeAttr(attr) {
		return attr.replace(/"/g, '&quot;');
	}

	function attrsToStrings(attrs) {
		var attrStrs = [];
		for (var i = 0; i < attrs.length; i++) {
			var _attrs$i = attrs[i],
			    name = _attrs$i[0],
			    value = _attrs$i[1];

			attrStrs.push(name + '="' + escapeAttr(value) + '"');
		}
		return attrStrs;
	}
	module.exports = exports['default'];
});