var styled = (function (React) {
  'use strict';

  var React__default = 'default' in React ? React['default'] : React;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  // 
  var isPlainObject = (function (x) {
    return (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x.constructor === Object;
  });

  // 

  function isStyledComponent(target) /* : %checks */{
    return (
      // $FlowFixMe TODO: flow for styledComponentId
      target && typeof target.styledComponentId === 'string'
    );
  }

  // 

  /**
   * inlined version of
   * https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/hyphenateStyleName.js
   */

  var uppercasePattern = /([A-Z])/g;
  var msPattern = /^ms-/;

  /**
   * Hyphenates a camelcased CSS property name, for example:
   *
   *   > hyphenateStyleName('backgroundColor')
   *   < "background-color"
   *   > hyphenateStyleName('MozTransition')
   *   < "-moz-transition"
   *   > hyphenateStyleName('msTransition')
   *   < "-ms-transition"
   *
   * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
   * is converted to `-ms-`.
   *
   * @param {string} string
   * @return {string}
   */
  function hyphenateStyleName(string) {
    return string.replace(uppercasePattern, '-$1').toLowerCase().replace(msPattern, '-ms-');
  }

  // 


  var SC_ATTR = typeof process !== 'undefined' && process.env.SC_ATTR || 'data-styled';

  var SC_VERSION_ATTR = 'data-styled-version';

  var SC_STREAM_ATTR = 'data-styled-streamed';

  var IS_BROWSER = typeof window !== 'undefined' && 'HTMLElement' in window;

  // Shared empty execution context when generating static styles
  var STATIC_EXECUTION_CONTEXT = {};

  // 


  /**
   * Parse errors.md and turn it into a simple hash of code: message
   */
  var ERRORS = {
    "1": "Cannot create styled-component for component: %s.\n\n",
    "2": "Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n",
    "3": "Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n",
    "4": "The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n",
    "5": "The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n",
    "6": "Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n",
    "7": "ThemeProvider: Please return an object from your \"theme\" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n",
    "8": "ThemeProvider: Please make your \"theme\" prop an object.\n\n",
    "9": "Missing document `<head>`\n\n",
    "10": "Cannot find sheet for given tag\n\n",
    "11": "[createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n"
  };

  /**
   * super basic version of sprintf
   */
  function format() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var a = args[0];
    var b = [];
    var c = void 0;

    for (c = 1; c < args.length; c += 1) {
      b.push(args[c]);
    }

    b.forEach(function (d) {
      a = a.replace(/%[a-z]/, d);
    });

    return a;
  }

  /**
   * Create an error file out of errors.md for development and a simple web link to the full errors
   * in production mode.
   */

  var StyledComponentsError = function (_Error) {
    inherits(StyledComponentsError, _Error);

    function StyledComponentsError(code) {
      classCallCheck(this, StyledComponentsError);

      for (var _len2 = arguments.length, interpolations = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        interpolations[_key2 - 1] = arguments[_key2];
      }

      if (false) {
        var _this;
      } else {
        var _this = possibleConstructorReturn(this, _Error.call(this, format.apply(undefined, [ERRORS[code]].concat(interpolations)).trim()));
      }
      return possibleConstructorReturn(_this);
    }

    return StyledComponentsError;
  }(Error);

  // 
  var SC_COMPONENT_ID = /^[^\S\n]*?\/\* sc-component-id:\s*(\S+)\s+\*\//gm;

  var extractComps = (function (maybeCSS) {
    var css = '' + (maybeCSS || ''); // Definitely a string, and a clone
    var existingComponents = [];
    css.replace(SC_COMPONENT_ID, function (match, componentId, matchIndex) {
      existingComponents.push({ componentId: componentId, matchIndex: matchIndex });
      return match;
    });
    return existingComponents.map(function (_ref, i) {
      var componentId = _ref.componentId,
          matchIndex = _ref.matchIndex;

      var nextComp = existingComponents[i + 1];
      var cssFromDOM = nextComp ? css.slice(matchIndex, nextComp.matchIndex) : css.slice(matchIndex);
      return { componentId: componentId, cssFromDOM: cssFromDOM };
    });
  });

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var stylis = createCommonjsModule(function (module, exports) {
  /*
   *          __        ___
   *    _____/ /___  __/ (_)____
   *   / ___/ __/ / / / / / ___/
   *  (__  ) /_/ /_/ / / (__  )
   * /____/\__/\__, /_/_/____/
   *          /____/
   *
   * light - weight css preprocessor @licence MIT
   */
  (function (factory) {/* eslint-disable */
  	module['exports'] = factory(null);
  }(/** @param {*=} options */function factory (options) {/* eslint-disable */

  	/**
  	 * Notes
  	 *
  	 * The ['<method name>'] pattern is used to support closure compiler
  	 * the jsdoc signatures are also used to the same effect
  	 *
  	 * ----
  	 *
  	 * int + int + int === n4 [faster]
  	 *
  	 * vs
  	 *
  	 * int === n1 && int === n2 && int === n3
  	 *
  	 * ----
  	 *
  	 * switch (int) { case ints...} [faster]
  	 *
  	 * vs
  	 *
  	 * if (int == 1 && int === 2 ...)
  	 *
  	 * ----
  	 *
  	 * The (first*n1 + second*n2 + third*n3) format used in the property parser
  	 * is a simple way to hash the sequence of characters
  	 * taking into account the index they occur in
  	 * since any number of 3 character sequences could produce duplicates.
  	 *
  	 * On the other hand sequences that are directly tied to the index of the character
  	 * resolve a far more accurate measure, it's also faster
  	 * to evaluate one condition in a switch statement
  	 * than three in an if statement regardless of the added math.
  	 *
  	 * This allows the vendor prefixer to be both small and fast.
  	 */

  	var nullptn = /^\0+/g; /* matches leading null characters */
  	var formatptn = /[\0\r\f]/g; /* matches new line, null and formfeed characters */
  	var colonptn = /: */g; /* splits animation rules */
  	var cursorptn = /zoo|gra/; /* assert cursor varient */
  	var transformptn = /([,: ])(transform)/g; /* vendor prefix transform, older webkit */
  	var animationptn = /,+\s*(?![^(]*[)])/g; /* splits multiple shorthand notation animations */
  	var propertiesptn = / +\s*(?![^(]*[)])/g; /* animation properties */
  	var elementptn = / *[\0] */g; /* selector elements */
  	var selectorptn = /,\r+?/g; /* splits selectors */
  	var andptn = /([\t\r\n ])*\f?&/g; /* match & */
  	var escapeptn = /:global\(((?:[^\(\)\[\]]*|\[.*\]|\([^\(\)]*\))*)\)/g; /* matches :global(.*) */
  	var invalidptn = /\W+/g; /* removes invalid characters from keyframes */
  	var keyframeptn = /@(k\w+)\s*(\S*)\s*/; /* matches @keyframes $1 */
  	var plcholdrptn = /::(place)/g; /* match ::placeholder varient */
  	var readonlyptn = /:(read-only)/g; /* match :read-only varient */
  	var beforeptn = /\s+(?=[{\];=:>])/g; /* matches \s before ] ; = : */
  	var afterptn = /([[}=:>])\s+/g; /* matches \s after characters [ } = : */
  	var tailptn = /(\{[^{]+?);(?=\})/g; /* matches tail semi-colons ;} */
  	var whiteptn = /\s{2,}/g; /* matches repeating whitespace */
  	var pseudoptn = /([^\(])(:+) */g; /* pseudo element */
  	var writingptn = /[svh]\w+-[tblr]{2}/; /* match writing mode property values */
  	var supportsptn = /\(\s*(.*)\s*\)/g; /* match supports (groups) */
  	var propertyptn = /([\s\S]*?);/g; /* match properties leading semicolon */
  	var selfptn = /-self|flex-/g; /* match flex- and -self in align-self: flex-*; */
  	var pseudofmt = /[^]*?(:[rp][el]a[\w-]+)[^]*/; /* extrats :readonly or :placholder from selector */
  	var dimensionptn = /stretch|:\s*\w+\-(?:conte|avail)/; /* match max/min/fit-content, fill-available */
  	var imgsrcptn = /([^-])(image-set\()/;

  	/* vendors */
  	var webkit = '-webkit-';
  	var moz = '-moz-';
  	var ms = '-ms-';

  	/* character codes */
  	var SEMICOLON = 59; /* ; */
  	var CLOSEBRACES = 125; /* } */
  	var OPENBRACES = 123; /* { */
  	var OPENPARENTHESES = 40; /* ( */
  	var CLOSEPARENTHESES = 41; /* ) */
  	var OPENBRACKET = 91; /* [ */
  	var CLOSEBRACKET = 93; /* ] */
  	var NEWLINE = 10; /* \n */
  	var CARRIAGE = 13; /* \r */
  	var TAB = 9; /* \t */
  	var AT = 64; /* @ */
  	var SPACE = 32; /*   */
  	var AND = 38; /* & */
  	var DASH = 45; /* - */
  	var UNDERSCORE = 95; /* _ */
  	var STAR = 42; /* * */
  	var COMMA = 44; /* , */
  	var COLON = 58; /* : */
  	var SINGLEQUOTE = 39; /* ' */
  	var DOUBLEQUOTE = 34; /* " */
  	var FOWARDSLASH = 47; /* / */
  	var GREATERTHAN = 62; /* > */
  	var PLUS = 43; /* + */
  	var TILDE = 126; /* ~ */
  	var NULL = 0; /* \0 */
  	var FORMFEED = 12; /* \f */
  	var VERTICALTAB = 11; /* \v */

  	/* special identifiers */
  	var KEYFRAME = 107; /* k */
  	var MEDIA = 109; /* m */
  	var SUPPORTS = 115; /* s */
  	var PLACEHOLDER = 112; /* p */
  	var READONLY = 111; /* o */
  	var IMPORT = 105; /* <at>i */
  	var CHARSET = 99; /* <at>c */
  	var DOCUMENT = 100; /* <at>d */
  	var PAGE = 112; /* <at>p */

  	var column = 1; /* current column */
  	var line = 1; /* current line numebr */
  	var pattern = 0; /* :pattern */

  	var cascade = 1; /* #id h1 h2 vs h1#id h2#id  */
  	var prefix = 1; /* vendor prefix */
  	var escape = 1; /* escape :global() pattern */
  	var compress = 0; /* compress output */
  	var semicolon = 0; /* no/semicolon option */
  	var preserve = 0; /* preserve empty selectors */

  	/* empty reference */
  	var array = [];

  	/* plugins */
  	var plugins = [];
  	var plugged = 0;
  	var should = null;

  	/* plugin context */
  	var POSTS = -2;
  	var PREPS = -1;
  	var UNKWN = 0;
  	var PROPS = 1;
  	var BLCKS = 2;
  	var ATRUL = 3;

  	/* plugin newline context */
  	var unkwn = 0;

  	/* keyframe animation */
  	var keyed = 1;
  	var key = '';

  	/* selector namespace */
  	var nscopealt = '';
  	var nscope = '';

  	/**
  	 * Compile
  	 *
  	 * @param {Array<string>} parent
  	 * @param {Array<string>} current
  	 * @param {string} body
  	 * @param {number} id
  	 * @param {number} depth
  	 * @return {string}
  	 */
  	function compile (parent, current, body, id, depth) {
  		var bracket = 0; /* brackets [] */
  		var comment = 0; /* comments /* // or /* */
  		var parentheses = 0; /* functions () */
  		var quote = 0; /* quotes '', "" */

  		var first = 0; /* first character code */
  		var second = 0; /* second character code */
  		var code = 0; /* current character code */
  		var tail = 0; /* previous character code */
  		var trail = 0; /* character before previous code */
  		var peak = 0; /* previous non-whitespace code */

  		var counter = 0; /* count sequence termination */
  		var context = 0; /* track current context */
  		var atrule = 0; /* track @at-rule context */
  		var pseudo = 0; /* track pseudo token index */
  		var caret = 0; /* current character index */
  		var format = 0; /* control character formating context */
  		var insert = 0; /* auto semicolon insertion */
  		var invert = 0; /* inverted selector pattern */
  		var length = 0; /* generic length address */
  		var eof = body.length; /* end of file(length) */
  		var eol = eof - 1; /* end of file(characters) */

  		var char = ''; /* current character */
  		var chars = ''; /* current buffer of characters */
  		var child = ''; /* next buffer of characters */
  		var out = ''; /* compiled body */
  		var children = ''; /* compiled children */
  		var flat = ''; /* compiled leafs */
  		var selector; /* generic selector address */
  		var result; /* generic address */

  		// ...build body
  		while (caret < eof) {
  			code = body.charCodeAt(caret);

  			// eof varient
  			if (caret === eol) {
  				// last character + noop context, add synthetic padding for noop context to terminate
  				if (comment + quote + parentheses + bracket !== 0) {
  					if (comment !== 0) {
  						code = comment === FOWARDSLASH ? NEWLINE : FOWARDSLASH;
  					}

  					quote = parentheses = bracket = 0;
  					eof++;
  					eol++;
  				}
  			}

  			if (comment + quote + parentheses + bracket === 0) {
  				// eof varient
  				if (caret === eol) {
  					if (format > 0) {
  						chars = chars.replace(formatptn, '');
  					}

  					if (chars.trim().length > 0) {
  						switch (code) {
  							case SPACE:
  							case TAB:
  							case SEMICOLON:
  							case CARRIAGE:
  							case NEWLINE: {
  								break
  							}
  							default: {
  								chars += body.charAt(caret);
  							}
  						}

  						code = SEMICOLON;
  					}
  				}

  				// auto semicolon insertion
  				if (insert === 1) {
  					switch (code) {
  						// false flags
  						case OPENBRACES:
  						case CLOSEBRACES:
  						case SEMICOLON:
  						case DOUBLEQUOTE:
  						case SINGLEQUOTE:
  						case OPENPARENTHESES:
  						case CLOSEPARENTHESES:
  						case COMMA: {
  							insert = 0;
  						}
  						// ignore
  						case TAB:
  						case CARRIAGE:
  						case NEWLINE:
  						case SPACE: {
  							break
  						}
  						// valid
  						default: {
  							insert = 0;
  							length = caret;
  							first = code;
  							caret--;
  							code = SEMICOLON;

  							while (length < eof) {
  								switch (body.charCodeAt(length++)) {
  									case NEWLINE:
  									case CARRIAGE:
  									case SEMICOLON: {
  										++caret;
  										code = first;
  										length = eof;
  										break
  									}
  									case COLON: {
  										if (format > 0) {
  											++caret;
  											code = first;
  										}
  									}
  									case OPENBRACES: {
  										length = eof;
  									}
  								}
  							}
  						}
  					}
  				}

  				// token varient
  				switch (code) {
  					case OPENBRACES: {
  						chars = chars.trim();
  						first = chars.charCodeAt(0);
  						counter = 1;
  						length = ++caret;

  						while (caret < eof) {
  							switch (code = body.charCodeAt(caret)) {
  								case OPENBRACES: {
  									counter++;
  									break
  								}
  								case CLOSEBRACES: {
  									counter--;
  									break
  								}
  								case FOWARDSLASH: {
  									switch (second = body.charCodeAt(caret + 1)) {
  										// /*, //
  										case STAR:
  										case FOWARDSLASH: {
  											caret = delimited(second, caret, eol, body);
  										}
  									}
  									break
  								}
  								// given "[" === 91 & "]" === 93 hence forth 91 + 1 + 1 === 93
  								case OPENBRACKET: {
  									code++;
  								}
  								// given "(" === 40 & ")" === 41 hence forth 40 + 1 === 41
  								case OPENPARENTHESES: {
  									code++;
  								}
  								// quote tail delimiter is identical to the head delimiter hence noop,
  								// fallthrough clauses have been shited to the correct tail delimiter
  								case DOUBLEQUOTE:
  								case SINGLEQUOTE: {
  									while (caret++ < eol) {
  										if (body.charCodeAt(caret) === code) {
  											break
  										}
  									}
  								}
  							}

  							if (counter === 0) {
  								break
  							}

  							caret++;
  						}

  						child = body.substring(length, caret);

  						if (first === NULL) {
  							first = (chars = chars.replace(nullptn, '').trim()).charCodeAt(0);
  						}

  						switch (first) {
  							// @at-rule
  							case AT: {
  								if (format > 0) {
  									chars = chars.replace(formatptn, '');
  								}

  								second = chars.charCodeAt(1);

  								switch (second) {
  									case DOCUMENT:
  									case MEDIA:
  									case SUPPORTS:
  									case DASH: {
  										selector = current;
  										break
  									}
  									default: {
  										selector = array;
  									}
  								}

  								child = compile(current, selector, child, second, depth+1);
  								length = child.length;

  								// preserve empty @at-rule
  								if (preserve > 0 && length === 0) {
  									length = chars.length;
  								}

  								// execute plugins, @at-rule context
  								if (plugged > 0) {
  									selector = select(array, chars, invert);
  									result = proxy(ATRUL, child, selector, current, line, column, length, second, depth, id);
  									chars = selector.join('');

  									if (result !== void 0) {
  										if ((length = (child = result.trim()).length) === 0) {
  											second = 0;
  											child = '';
  										}
  									}
  								}

  								if (length > 0) {
  									switch (second) {
  										case SUPPORTS: {
  											chars = chars.replace(supportsptn, supports);
  										}
  										case DOCUMENT:
  										case MEDIA:
  										case DASH: {
  											child = chars + '{' + child + '}';
  											break
  										}
  										case KEYFRAME: {
  											chars = chars.replace(keyframeptn, '$1 $2' + (keyed > 0 ? key : ''));
  											child = chars + '{' + child + '}';

  											if (prefix === 1 || (prefix === 2 && vendor('@'+child, 3))) {
  												child = '@' + webkit + child + '@' + child;
  											} else {
  												child = '@' + child;
  											}
  											break
  										}
  										default: {
  											child = chars + child;

  											if (id === PAGE) {
  												child = (out += child, '');
  											}
  										}
  									}
  								} else {
  									child = '';
  								}

  								break
  							}
  							// selector
  							default: {
  								child = compile(current, select(current, chars, invert), child, id, depth+1);
  							}
  						}

  						children += child;

  						// reset
  						context = 0;
  						insert = 0;
  						pseudo = 0;
  						format = 0;
  						invert = 0;
  						atrule = 0;
  						chars = '';
  						child = '';
  						code = body.charCodeAt(++caret);
  						break
  					}
  					case CLOSEBRACES:
  					case SEMICOLON: {
  						chars = (format > 0 ? chars.replace(formatptn, '') : chars).trim();

  						if ((length = chars.length) > 1) {
  							// monkey-patch missing colon
  							if (pseudo === 0) {
  								first = chars.charCodeAt(0);

  								// first character is a letter or dash, buffer has a space character
  								if ((first === DASH || first > 96 && first < 123)) {
  									length = (chars = chars.replace(' ', ':')).length;
  								}
  							}

  							// execute plugins, property context
  							if (plugged > 0) {
  								if ((result = proxy(PROPS, chars, current, parent, line, column, out.length, id, depth, id)) !== void 0) {
  									if ((length = (chars = result.trim()).length) === 0) {
  										chars = '\0\0';
  									}
  								}
  							}

  							first = chars.charCodeAt(0);
  							second = chars.charCodeAt(1);

  							switch (first) {
  								case NULL: {
  									break
  								}
  								case AT: {
  									if (second === IMPORT || second === CHARSET) {
  										flat += chars + body.charAt(caret);
  										break
  									}
  								}
  								default: {
  									if (chars.charCodeAt(length-1) === COLON) {
  										break
  									}

  									out += property(chars, first, second, chars.charCodeAt(2));
  								}
  							}
  						}

  						// reset
  						context = 0;
  						insert = 0;
  						pseudo = 0;
  						format = 0;
  						invert = 0;
  						chars = '';
  						code = body.charCodeAt(++caret);
  						break
  					}
  				}
  			}

  			// parse characters
  			switch (code) {
  				case CARRIAGE:
  				case NEWLINE: {
  					// auto insert semicolon
  					if (comment + quote + parentheses + bracket + semicolon === 0) {
  						// valid non-whitespace characters that
  						// may precede a newline
  						switch (peak) {
  							case CLOSEPARENTHESES:
  							case SINGLEQUOTE:
  							case DOUBLEQUOTE:
  							case AT:
  							case TILDE:
  							case GREATERTHAN:
  							case STAR:
  							case PLUS:
  							case FOWARDSLASH:
  							case DASH:
  							case COLON:
  							case COMMA:
  							case SEMICOLON:
  							case OPENBRACES:
  							case CLOSEBRACES: {
  								break
  							}
  							default: {
  								// current buffer has a colon
  								if (pseudo > 0) {
  									insert = 1;
  								}
  							}
  						}
  					}

  					// terminate line comment
  					if (comment === FOWARDSLASH) {
  						comment = 0;
  					} else if (cascade + context === 0 && id !== KEYFRAME && chars.length > 0) {
  						format = 1;
  						chars += '\0';
  					}

  					// execute plugins, newline context
  					if (plugged * unkwn > 0) {
  						proxy(UNKWN, chars, current, parent, line, column, out.length, id, depth, id);
  					}

  					// next line, reset column position
  					column = 1;
  					line++;
  					break
  				}
  				case SEMICOLON:
  				case CLOSEBRACES: {
  					if (comment + quote + parentheses + bracket === 0) {
  						column++;
  						break
  					}
  				}
  				default: {
  					// increment column position
  					column++;

  					// current character
  					char = body.charAt(caret);

  					// remove comments, escape functions, strings, attributes and prepare selectors
  					switch (code) {
  						case TAB:
  						case SPACE: {
  							if (quote + bracket + comment === 0) {
  								switch (tail) {
  									case COMMA:
  									case COLON:
  									case TAB:
  									case SPACE: {
  										char = '';
  										break
  									}
  									default: {
  										if (code !== SPACE) {
  											char = ' ';
  										}
  									}
  								}
  							}
  							break
  						}
  						// escape breaking control characters
  						case NULL: {
  							char = '\\0';
  							break
  						}
  						case FORMFEED: {
  							char = '\\f';
  							break
  						}
  						case VERTICALTAB: {
  							char = '\\v';
  							break
  						}
  						// &
  						case AND: {
  							// inverted selector pattern i.e html &
  							if (quote + comment + bracket === 0 && cascade > 0) {
  								invert = 1;
  								format = 1;
  								char = '\f' + char;
  							}
  							break
  						}
  						// ::p<l>aceholder, l
  						// :read-on<l>y, l
  						case 108: {
  							if (quote + comment + bracket + pattern === 0 && pseudo > 0) {
  								switch (caret - pseudo) {
  									// ::placeholder
  									case 2: {
  										if (tail === PLACEHOLDER && body.charCodeAt(caret-3) === COLON) {
  											pattern = tail;
  										}
  									}
  									// :read-only
  									case 8: {
  										if (trail === READONLY) {
  											pattern = trail;
  										}
  									}
  								}
  							}
  							break
  						}
  						// :<pattern>
  						case COLON: {
  							if (quote + comment + bracket === 0) {
  								pseudo = caret;
  							}
  							break
  						}
  						// selectors
  						case COMMA: {
  							if (comment + parentheses + quote + bracket === 0) {
  								format = 1;
  								char += '\r';
  							}
  							break
  						}
  						// quotes
  						case DOUBLEQUOTE: {
  							if (comment === 0) {
  								quote = quote === code ? 0 : (quote === 0 ? code : quote);
  							}
  							break
  						}
  						case SINGLEQUOTE: {
  							if (comment === 0) {
  								quote = quote === code ? 0 : (quote === 0 ? code : quote);
  							}
  							break
  						}
  						// attributes
  						case OPENBRACKET: {
  							if (quote + comment + parentheses === 0) {
  								bracket++;
  							}
  							break
  						}
  						case CLOSEBRACKET: {
  							if (quote + comment + parentheses === 0) {
  								bracket--;
  							}
  							break
  						}
  						// functions
  						case CLOSEPARENTHESES: {
  							if (quote + comment + bracket === 0) {
  								parentheses--;
  							}
  							break
  						}
  						case OPENPARENTHESES: {
  							if (quote + comment + bracket === 0) {
  								if (context === 0) {
  									switch (tail*2 + trail*3) {
  										// :matches
  										case 533: {
  											break
  										}
  										// :global, :not, :nth-child etc...
  										default: {
  											counter = 0;
  											context = 1;
  										}
  									}
  								}

  								parentheses++;
  							}
  							break
  						}
  						case AT: {
  							if (comment + parentheses + quote + bracket + pseudo + atrule === 0) {
  								atrule = 1;
  							}
  							break
  						}
  						// block/line comments
  						case STAR:
  						case FOWARDSLASH: {
  							if (quote + bracket + parentheses > 0) {
  								break
  							}

  							switch (comment) {
  								// initialize line/block comment context
  								case 0: {
  									switch (code*2 + body.charCodeAt(caret+1)*3) {
  										// //
  										case 235: {
  											comment = FOWARDSLASH;
  											break
  										}
  										// /*
  										case 220: {
  											length = caret;
  											comment = STAR;
  											break
  										}
  									}
  									break
  								}
  								// end block comment context
  								case STAR: {
  									if (code === FOWARDSLASH && tail === STAR && length + 2 !== caret) {
  										// /*<!> ... */, !
  										if (body.charCodeAt(length+2) === 33) {
  											out += body.substring(length, caret+1);
  										}
  										char = '';
  										comment = 0;
  									}
  								}
  							}
  						}
  					}

  					// ignore comment blocks
  					if (comment === 0) {
  						// aggressive isolation mode, divide each individual selector
  						// including selectors in :not function but excluding selectors in :global function
  						if (cascade + quote + bracket + atrule === 0 && id !== KEYFRAME && code !== SEMICOLON) {
  							switch (code) {
  								case COMMA:
  								case TILDE:
  								case GREATERTHAN:
  								case PLUS:
  								case CLOSEPARENTHESES:
  								case OPENPARENTHESES: {
  									if (context === 0) {
  										// outside of an isolated context i.e nth-child(<...>)
  										switch (tail) {
  											case TAB:
  											case SPACE:
  											case NEWLINE:
  											case CARRIAGE: {
  												char = char + '\0';
  												break
  											}
  											default: {
  												char = '\0' + char + (code === COMMA ? '' : '\0');
  											}
  										}
  										format = 1;
  									} else {
  										// within an isolated context, sleep untill it's terminated
  										switch (code) {
  											case OPENPARENTHESES: {
  												// :globa<l>(
  												if (pseudo + 7 === caret && tail === 108) {
  													pseudo = 0;
  												}
  												context = ++counter;
  												break
  											}
  											case CLOSEPARENTHESES: {
  												if ((context = --counter) === 0) {
  													format = 1;
  													char += '\0';
  												}
  												break
  											}
  										}
  									}
  									break
  								}
  								case TAB:
  								case SPACE: {
  									switch (tail) {
  										case NULL:
  										case OPENBRACES:
  										case CLOSEBRACES:
  										case SEMICOLON:
  										case COMMA:
  										case FORMFEED:
  										case TAB:
  										case SPACE:
  										case NEWLINE:
  										case CARRIAGE: {
  											break
  										}
  										default: {
  											// ignore in isolated contexts
  											if (context === 0) {
  												format = 1;
  												char += '\0';
  											}
  										}
  									}
  								}
  							}
  						}

  						// concat buffer of characters
  						chars += char;

  						// previous non-whitespace character code
  						if (code !== SPACE && code !== TAB) {
  							peak = code;
  						}
  					}
  				}
  			}

  			// tail character codes
  			trail = tail;
  			tail = code;

  			// visit every character
  			caret++;
  		}

  		length = out.length;

  		// preserve empty selector
   		if (preserve > 0) {
   			if (length === 0 && children.length === 0 && (current[0].length === 0) === false) {
   				if (id !== MEDIA || (current.length === 1 && (cascade > 0 ? nscopealt : nscope) === current[0])) {
  					length = current.join(',').length + 2;
   				}
   			}
  		}

  		if (length > 0) {
  			// cascade isolation mode?
  			selector = cascade === 0 && id !== KEYFRAME ? isolate(current) : current;

  			// execute plugins, block context
  			if (plugged > 0) {
  				result = proxy(BLCKS, out, selector, parent, line, column, length, id, depth, id);

  				if (result !== void 0 && (out = result).length === 0) {
  					return flat + out + children
  				}
  			}

  			out = selector.join(',') + '{' + out + '}';

  			if (prefix*pattern !== 0) {
  				if (prefix === 2 && !vendor(out, 2))
  					pattern = 0;

  				switch (pattern) {
  					// ::read-only
  					case READONLY: {
  						out = out.replace(readonlyptn, ':'+moz+'$1')+out;
  						break
  					}
  					// ::placeholder
  					case PLACEHOLDER: {
  						out = (
  							out.replace(plcholdrptn, '::' + webkit + 'input-$1') +
  							out.replace(plcholdrptn, '::' + moz + '$1') +
  							out.replace(plcholdrptn, ':' + ms + 'input-$1') + out
  						);
  						break
  					}
  				}

  				pattern = 0;
  			}
  		}

  		return flat + out + children
  	}

  	/**
  	 * Select
  	 *
  	 * @param {Array<string>} parent
  	 * @param {string} current
  	 * @param {number} invert
  	 * @return {Array<string>}
  	 */
  	function select (parent, current, invert) {
  		var selectors = current.trim().split(selectorptn);
  		var out = selectors;

  		var length = selectors.length;
  		var l = parent.length;

  		switch (l) {
  			// 0-1 parent selectors
  			case 0:
  			case 1: {
  				for (var i = 0, selector = l === 0 ? '' : parent[0] + ' '; i < length; ++i) {
  					out[i] = scope(selector, out[i], invert, l).trim();
  				}
  				break
  			}
  			// >2 parent selectors, nested
  			default: {
  				for (var i = 0, j = 0, out = []; i < length; ++i) {
  					for (var k = 0; k < l; ++k) {
  						out[j++] = scope(parent[k] + ' ', selectors[i], invert, l).trim();
  					}
  				}
  			}
  		}

  		return out
  	}

  	/**
  	 * Scope
  	 *
  	 * @param {string} parent
  	 * @param {string} current
  	 * @param {number} invert
  	 * @param {number} level
  	 * @return {string}
  	 */
  	function scope (parent, current, invert, level) {
  		var selector = current;
  		var code = selector.charCodeAt(0);

  		// trim leading whitespace
  		if (code < 33) {
  			code = (selector = selector.trim()).charCodeAt(0);
  		}

  		switch (code) {
  			// &
  			case AND: {
  				switch (cascade + level) {
  					case 0:
  					case 1: {
  						if (parent.trim().length === 0) {
  							break
  						}
  					}
  					default: {
  						return selector.replace(andptn, '$1'+parent.trim())
  					}
  				}
  				break
  			}
  			// :
  			case COLON: {
  				switch (selector.charCodeAt(1)) {
  					// g in :global
  					case 103: {
  						if (escape > 0 && cascade > 0) {
  							return selector.replace(escapeptn, '$1').replace(andptn, '$1'+nscope)
  						}
  						break
  					}
  					default: {
  						// :hover
  						return parent.trim() + selector.replace(andptn, '$1'+parent.trim())
  					}
  				}
  			}
  			default: {
  				// html &
  				if (invert*cascade > 0 && selector.indexOf('\f') > 0) {
  					return selector.replace(andptn, (parent.charCodeAt(0) === COLON ? '' : '$1')+parent.trim())
  				}
  			}
  		}

  		return parent + selector
  	}

  	/**
  	 * Property
  	 *
  	 * @param {string} input
  	 * @param {number} first
  	 * @param {number} second
  	 * @param {number} third
  	 * @return {string}
  	 */
  	function property (input, first, second, third) {
  		var index = 0;
  		var out = input + ';';
  		var hash = (first*2) + (second*3) + (third*4);
  		var cache;

  		// animation: a, n, i characters
  		if (hash === 944) {
  			return animation(out)
  		} else if (prefix === 0 || (prefix === 2 && !vendor(out, 1))) {
  			return out
  		}

  		// vendor prefix
  		switch (hash) {
  			// text-decoration/text-size-adjust/text-shadow/text-align/text-transform: t, e, x
  			case 1015: {
  				// text-shadow/text-align/text-transform, a
  				return out.charCodeAt(10) === 97 ? webkit + out + out : out
  			}
  			// filter/fill f, i, l
  			case 951: {
  				// filter, t
  				return out.charCodeAt(3) === 116 ? webkit + out + out : out
  			}
  			// color/column, c, o, l
  			case 963: {
  				// column, n
  				return out.charCodeAt(5) === 110 ? webkit + out + out : out
  			}
  			// box-decoration-break, b, o, x
  			case 1009: {
  				if (out.charCodeAt(4) !== 100) {
  					break
  				}
  			}
  			// mask, m, a, s
  			// clip-path, c, l, i
  			case 969:
  			case 942: {
  				return webkit + out + out
  			}
  			// appearance: a, p, p
  			case 978: {
  				return webkit + out + moz + out + out
  			}
  			// hyphens: h, y, p
  			// user-select: u, s, e
  			case 1019:
  			case 983: {
  				return webkit + out + moz + out + ms + out + out
  			}
  			// background/backface-visibility, b, a, c
  			case 883: {
  				// backface-visibility, -
  				if (out.charCodeAt(8) === DASH) {
  					return webkit + out + out
  				}

  				// image-set(...)
  				if (out.indexOf('image-set(', 11) > 0) {
  					return out.replace(imgsrcptn, '$1'+webkit+'$2') + out
  				}

  				return out
  			}
  			// flex: f, l, e
  			case 932: {
  				if (out.charCodeAt(4) === DASH) {
  					switch (out.charCodeAt(5)) {
  						// flex-grow, g
  						case 103: {
  							return webkit + 'box-' + out.replace('-grow', '') + webkit + out + ms + out.replace('grow', 'positive') + out
  						}
  						// flex-shrink, s
  						case 115: {
  							return webkit + out + ms + out.replace('shrink', 'negative') + out
  						}
  						// flex-basis, b
  						case 98: {
  							return webkit + out + ms + out.replace('basis', 'preferred-size') + out
  						}
  					}
  				}

  				return webkit + out + ms + out + out
  			}
  			// order: o, r, d
  			case 964: {
  				return webkit + out + ms + 'flex' + '-' + out + out
  			}
  			// justify-items/justify-content, j, u, s
  			case 1023: {
  				// justify-content, c
  				if (out.charCodeAt(8) !== 99) {
  					break
  				}

  				cache = out.substring(out.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
  				return webkit + 'box-pack' + cache + webkit + out + ms + 'flex-pack' + cache + out
  			}
  			// cursor, c, u, r
  			case 1005: {
  				return cursorptn.test(out) ? out.replace(colonptn, ':' + webkit) + out.replace(colonptn, ':' + moz) + out : out
  			}
  			// writing-mode, w, r, i
  			case 1000: {
  				cache = out.substring(13).trim();
  				index = cache.indexOf('-') + 1;

  				switch (cache.charCodeAt(0)+cache.charCodeAt(index)) {
  					// vertical-lr
  					case 226: {
  						cache = out.replace(writingptn, 'tb');
  						break
  					}
  					// vertical-rl
  					case 232: {
  						cache = out.replace(writingptn, 'tb-rl');
  						break
  					}
  					// horizontal-tb
  					case 220: {
  						cache = out.replace(writingptn, 'lr');
  						break
  					}
  					default: {
  						return out
  					}
  				}

  				return webkit + out + ms + cache + out
  			}
  			// position: sticky
  			case 1017: {
  				if (out.indexOf('sticky', 9) === -1) {
  					return out
  				}
  			}
  			// display(flex/inline-flex/inline-box): d, i, s
  			case 975: {
  				index = (out = input).length - 10;
  				cache = (out.charCodeAt(index) === 33 ? out.substring(0, index) : out).substring(input.indexOf(':', 7) + 1).trim();

  				switch (hash = cache.charCodeAt(0) + (cache.charCodeAt(7)|0)) {
  					// inline-
  					case 203: {
  						// inline-box
  						if (cache.charCodeAt(8) < 111) {
  							break
  						}
  					}
  					// inline-box/sticky
  					case 115: {
  						out = out.replace(cache, webkit+cache)+';'+out;
  						break
  					}
  					// inline-flex
  					// flex
  					case 207:
  					case 102: {
  						out = (
  							out.replace(cache, webkit+(hash > 102 ? 'inline-' : '')+'box')+';'+
  							out.replace(cache, webkit+cache)+';'+
  							out.replace(cache, ms+cache+'box')+';'+
  							out
  						);
  					}
  				}

  				return out + ';'
  			}
  			// align-items, align-center, align-self: a, l, i, -
  			case 938: {
  				if (out.charCodeAt(5) === DASH) {
  					switch (out.charCodeAt(6)) {
  						// align-items, i
  						case 105: {
  							cache = out.replace('-items', '');
  							return webkit + out + webkit + 'box-' + cache + ms + 'flex-' + cache + out
  						}
  						// align-self, s
  						case 115: {
  							return webkit + out + ms + 'flex-item-' + out.replace(selfptn, '') + out
  						}
  						// align-content
  						default: {
  							return webkit + out + ms + 'flex-line-pack' + out.replace('align-content', '').replace(selfptn, '') + out
  						}
  					}
  				}
  				break
  			}
  			// min/max
  			case 973:
  			case 989: {
  				// min-/max- height/width/block-size/inline-size
  				if (out.charCodeAt(3) !== DASH || out.charCodeAt(4) === 122) {
  					break
  				}
  			}
  			// height/width: min-content / width: max-content
  			case 931:
  			case 953: {
  				if (dimensionptn.test(input) === true) {
  					// stretch
  					if ((cache = input.substring(input.indexOf(':') + 1)).charCodeAt(0) === 115)
  						return property(input.replace('stretch', 'fill-available'), first, second, third).replace(':fill-available', ':stretch')
  					else
  						return out.replace(cache, webkit + cache) + out.replace(cache, moz + cache.replace('fill-', '')) + out
  				}
  				break
  			}
  			// transform, transition: t, r, a
  			case 962: {
  				out = webkit + out + (out.charCodeAt(5) === 102 ? ms + out : '') + out;

  				// transitions
  				if (second + third === 211 && out.charCodeAt(13) === 105 && out.indexOf('transform', 10) > 0) {
  					return out.substring(0, out.indexOf(';', 27) + 1).replace(transformptn, '$1' + webkit + '$2') + out
  				}

  				break
  			}
  		}

  		return out
  	}

  	/**
  	 * Vendor
  	 *
  	 * @param {string} content
  	 * @param {number} context
  	 * @return {boolean}
  	 */
  	function vendor (content, context) {
  		var index = content.indexOf(context === 1 ? ':' : '{');
  		var key = content.substring(0, context !== 3 ? index : 10);
  		var value = content.substring(index + 1, content.length - 1);

  		return should(context !== 2 ? key : key.replace(pseudofmt, '$1'), value, context)
  	}

  	/**
  	 * Supports
  	 *
  	 * @param {string} match
  	 * @param {string} group
  	 * @return {string}
  	 */
  	function supports (match, group) {
  		var out = property(group, group.charCodeAt(0), group.charCodeAt(1), group.charCodeAt(2));

  		return out !== group+';' ? out.replace(propertyptn, ' or ($1)').substring(4) : '('+group+')'
  	}

  	/**
  	 * Animation
  	 *
  	 * @param {string} input
  	 * @return {string}
  	 */
  	function animation (input) {
  		var length = input.length;
  		var index = input.indexOf(':', 9) + 1;
  		var declare = input.substring(0, index).trim();
  		var out = input.substring(index, length-1).trim();

  		switch (input.charCodeAt(9)*keyed) {
  			case 0: {
  				break
  			}
  			// animation-*, -
  			case DASH: {
  				// animation-name, n
  				if (input.charCodeAt(10) !== 110) {
  					break
  				}
  			}
  			// animation/animation-name
  			default: {
  				// split in case of multiple animations
  				var list = out.split((out = '', animationptn));

  				for (var i = 0, index = 0, length = list.length; i < length; index = 0, ++i) {
  					var value = list[i];
  					var items = value.split(propertiesptn);

  					while (value = items[index]) {
  						var peak = value.charCodeAt(0);

  						if (keyed === 1 && (
  							// letters
  							(peak > AT && peak < 90) || (peak > 96 && peak < 123) || peak === UNDERSCORE ||
  							// dash but not in sequence i.e --
  							(peak === DASH && value.charCodeAt(1) !== DASH)
  						)) {
  							// not a number/function
  							switch (isNaN(parseFloat(value)) + (value.indexOf('(') !== -1)) {
  								case 1: {
  									switch (value) {
  										// not a valid reserved keyword
  										case 'infinite': case 'alternate': case 'backwards': case 'running':
  										case 'normal': case 'forwards': case 'both': case 'none': case 'linear':
  										case 'ease': case 'ease-in': case 'ease-out': case 'ease-in-out':
  										case 'paused': case 'reverse': case 'alternate-reverse': case 'inherit':
  										case 'initial': case 'unset': case 'step-start': case 'step-end': {
  											break
  										}
  										default: {
  											value += key;
  										}
  									}
  								}
  							}
  						}

  						items[index++] = value;
  					}

  					out += (i === 0 ? '' : ',') + items.join(' ');
  				}
  			}
  		}

  		out = declare + out + ';';

  		if (prefix === 1 || (prefix === 2 && vendor(out, 1)))
  			return webkit + out + out

  		return out
  	}

  	/**
  	 * Isolate
  	 *
  	 * @param {Array<string>} current
  	 */
  	function isolate (current) {
  		for (var i = 0, length = current.length, selector = Array(length), padding, element; i < length; ++i) {
  			// split individual elements in a selector i.e h1 h2 === [h1, h2]
  			var elements = current[i].split(elementptn);
  			var out = '';

  			for (var j = 0, size = 0, tail = 0, code = 0, l = elements.length; j < l; ++j) {
  				// empty element
  				if ((size = (element = elements[j]).length) === 0 && l > 1) {
  					continue
  				}

  				tail = out.charCodeAt(out.length-1);
  				code = element.charCodeAt(0);
  				padding = '';

  				if (j !== 0) {
  					// determine if we need padding
  					switch (tail) {
  						case STAR:
  						case TILDE:
  						case GREATERTHAN:
  						case PLUS:
  						case SPACE:
  						case OPENPARENTHESES:  {
  							break
  						}
  						default: {
  							padding = ' ';
  						}
  					}
  				}

  				switch (code) {
  					case AND: {
  						element = padding + nscopealt;
  					}
  					case TILDE:
  					case GREATERTHAN:
  					case PLUS:
  					case SPACE:
  					case CLOSEPARENTHESES:
  					case OPENPARENTHESES: {
  						break
  					}
  					case OPENBRACKET: {
  						element = padding + element + nscopealt;
  						break
  					}
  					case COLON: {
  						switch (element.charCodeAt(1)*2 + element.charCodeAt(2)*3) {
  							// :global
  							case 530: {
  								if (escape > 0) {
  									element = padding + element.substring(8, size - 1);
  									break
  								}
  							}
  							// :hover, :nth-child(), ...
  							default: {
  								if (j < 1 || elements[j-1].length < 1) {
  									element = padding + nscopealt + element;
  								}
  							}
  						}
  						break
  					}
  					case COMMA: {
  						padding = '';
  					}
  					default: {
  						if (size > 1 && element.indexOf(':') > 0) {
  							element = padding + element.replace(pseudoptn, '$1' + nscopealt + '$2');
  						} else {
  							element = padding + element + nscopealt;
  						}
  					}
  				}

  				out += element;
  			}

  			selector[i] = out.replace(formatptn, '').trim();
  		}

  		return selector
  	}

  	/**
  	 * Proxy
  	 *
  	 * @param {number} context
  	 * @param {string} content
  	 * @param {Array<string>} selectors
  	 * @param {Array<string>} parents
  	 * @param {number} line
  	 * @param {number} column
  	 * @param {number} length
  	 * @param {number} id
  	 * @param {number} depth
  	 * @param {number} at
  	 * @return {(string|void|*)}
  	 */
  	function proxy (context, content, selectors, parents, line, column, length, id, depth, at) {
  		for (var i = 0, out = content, next; i < plugged; ++i) {
  			switch (next = plugins[i].call(stylis, context, out, selectors, parents, line, column, length, id, depth, at)) {
  				case void 0:
  				case false:
  				case true:
  				case null: {
  					break
  				}
  				default: {
  					out = next;
  				}
  			}
  		}

  		switch (out) {
  			case void 0:
  			case false:
  			case true:
  			case null:
  			case content: {
  				break
  			}
  			default: {
  				return out
  			}
  		}
  	}

  	/**
  	 * @param {number} code
  	 * @param {number} index
  	 * @param {number} length
  	 * @param {string} body
  	 * @return {number}
  	 */
  	function delimited (code, index, length, body) {
  		for (var i = index + 1; i < length; ++i) {
  			switch (body.charCodeAt(i)) {
  				// /*
  				case FOWARDSLASH: {
  					if (code === STAR) {
  						if (body.charCodeAt(i - 1) === STAR &&  index + 2 !== i) {
  							return i + 1
  						}
  					}
  					break
  				}
  				// //
  				case NEWLINE: {
  					if (code === FOWARDSLASH) {
  						return i + 1
  					}
  				}
  			}
  		}

  		return i
  	}

  	/**
  	 * Minify
  	 *
  	 * @param {(string|*)} output
  	 * @return {string}
  	 */
  	function minify (output) {
  		return output
  			.replace(formatptn, '')
  			.replace(beforeptn, '')
  			.replace(afterptn, '$1')
  			.replace(tailptn, '$1')
  			.replace(whiteptn, ' ')
  	}

  	/**
  	 * Use
  	 *
  	 * @param {(Array<function(...?)>|function(...?)|number|void)?} plugin
  	 */
  	function use (plugin) {
  		switch (plugin) {
  			case void 0:
  			case null: {
  				plugged = plugins.length = 0;
  				break
  			}
  			default: {
  				switch (plugin.constructor) {
  					case Array: {
  						for (var i = 0, length = plugin.length; i < length; ++i) {
  							use(plugin[i]);
  						}
  						break
  					}
  					case Function: {
  						plugins[plugged++] = plugin;
  						break
  					}
  					case Boolean: {
  						unkwn = !!plugin|0;
  					}
  				}
  			}
   		}

   		return use
  	}

  	/**
  	 * Set
  	 *
  	 * @param {*} options
  	 */
  	function set (options) {
  		for (var name in options) {
  			var value = options[name];
  			switch (name) {
  				case 'keyframe': keyed = value|0; break
  				case 'global': escape = value|0; break
  				case 'cascade': cascade = value|0; break
  				case 'compress': compress = value|0; break
  				case 'semicolon': semicolon = value|0; break
  				case 'preserve': preserve = value|0; break
  				case 'prefix':
  					should = null;

  					if (!value) {
  						prefix = 0;
  					} else if (typeof value !== 'function') {
  						prefix = 1;
  					} else {
  						prefix = 2;
  						should = value;
  					}
  			}
  		}

  		return set
  	}

  	/**
  	 * Stylis
  	 *
  	 * @param {string} selector
  	 * @param {string} input
  	 * @return {*}
  	 */
  	function stylis (selector, input) {
  		if (this !== void 0 && this.constructor === stylis) {
  			return factory(selector)
  		}

  		// setup
  		var ns = selector;
  		var code = ns.charCodeAt(0);

  		// trim leading whitespace
  		if (code < 33) {
  			code = (ns = ns.trim()).charCodeAt(0);
  		}

  		// keyframe/animation namespace
  		if (keyed > 0) {
  			key = ns.replace(invalidptn, code === OPENBRACKET ? '' : '-');
  		}

  		// reset, used to assert if a plugin is moneky-patching the return value
  		code = 1;

  		// cascade/isolate
  		if (cascade === 1) {
  			nscope = ns;
  		} else {
  			nscopealt = ns;
  		}

  		var selectors = [nscope];
  		var result;

  		// execute plugins, pre-process context
  		if (plugged > 0) {
  			result = proxy(PREPS, input, selectors, selectors, line, column, 0, 0, 0, 0);

  			if (result !== void 0 && typeof result === 'string') {
  				input = result;
  			}
  		}

  		// build
  		var output = compile(array, selectors, input, 0, 0);

  		// execute plugins, post-process context
  		if (plugged > 0) {
  			result = proxy(POSTS, output, selectors, selectors, line, column, output.length, 0, 0, 0);

  			// bypass minification
  			if (result !== void 0 && typeof(output = result) !== 'string') {
  				code = 0;
  			}
  		}

  		// reset
  		key = '';
  		nscope = '';
  		nscopealt = '';
  		pattern = 0;
  		line = 1;
  		column = 1;

  		return compress*code === 0 ? output : minify(output)
  	}

  	stylis['use'] = use;
  	stylis['set'] = set;

  	if (options !== void 0) {
  		set(options);
  	}

  	return stylis
  }));
  });

  var stylisRuleSheet = createCommonjsModule(function (module, exports) {
  (function (factory) {
  	module['exports'] = factory();
  }(function () {

  	return function (insertRule) {
  		var delimiter = '/*|*/';
  		var needle = delimiter+'}';

  		function toSheet (block) {
  			if (block)
  				try {
  					insertRule(block + '}');
  				} catch (e) {}
  		}

  		return function ruleSheet (context, content, selectors, parents, line, column, length, ns, depth, at) {
  			switch (context) {
  				// property
  				case 1:
  					// @import
  					if (depth === 0 && content.charCodeAt(0) === 64)
  						return insertRule(content+';'), ''
  					break
  				// selector
  				case 2:
  					if (ns === 0)
  						return content + delimiter
  					break
  				// at-rule
  				case 3:
  					switch (ns) {
  						// @font-face, @page
  						case 102:
  						case 112:
  							return insertRule(selectors[0]+content), ''
  						default:
  							return content + (at === 0 ? delimiter : '')
  					}
  				case -2:
  					content.split(needle).forEach(toSheet);
  			}
  		}
  	}
  }));
  });

  // 

  var COMMENT_REGEX = /^\s*\/\/.*$/gm;

  // NOTE: This stylis instance is only used to split rules from SSR'd style tags
  var stylisSplitter = new stylis({
    global: false,
    cascade: true,
    keyframe: false,
    prefix: false,
    compress: false,
    semicolon: true
  });

  var stylis$1 = new stylis({
    global: false,
    cascade: true,
    keyframe: false,
    prefix: true,
    compress: false,
    semicolon: false // NOTE: This means "autocomplete missing semicolons"
  });

  // Wrap `insertRulePlugin to build a list of rules,
  // and then make our own plugin to return the rules. This
  // makes it easier to hook into the existing SSR architecture

  var parsingRules = [];
  // eslint-disable-next-line consistent-return
  var returnRulesPlugin = function returnRulesPlugin(context) {
    if (context === -2) {
      var parsedRules = parsingRules;
      parsingRules = [];
      return parsedRules;
    }
  };

  var parseRulesPlugin = stylisRuleSheet(function (rule) {
    parsingRules.push(rule);
  });

  stylis$1.use([parseRulesPlugin, returnRulesPlugin]);
  stylisSplitter.use([parseRulesPlugin, returnRulesPlugin]);

  var stringifyRules = function stringifyRules(rules, selector, prefix) {
    var flatCSS = rules.join('').replace(COMMENT_REGEX, ''); // replace JS comments

    var cssStr = selector && prefix ? prefix + ' ' + selector + ' { ' + flatCSS + ' }' : flatCSS;

    return stylis$1(prefix || !selector ? '' : selector, cssStr);
  };

  var splitByRules = function splitByRules(css) {
    return stylisSplitter('', css);
  };

  // 
  /* eslint-disable camelcase, no-undef */

  var getNonce = (function () {
    return typeof __webpack_nonce__ !== 'undefined' ? __webpack_nonce__ : null;
  });

  // 
  // Helper to call a given function, only once
  var once = (function (cb) {
    var called = false;

    return function () {
      if (!called) {
        called = true;
        cb();
      }
    };
  });

  // 
  /* These are helpers for the StyleTags to keep track of the injected
   * rule names for each (component) ID that they're keeping track of.
   * They're crucial for detecting whether a name has already been
   * injected.
   * (This excludes rehydrated names) */

  /* adds a new ID:name pairing to a names dictionary */
  var addNameForId = function addNameForId(names, id, name) {
    if (name) {
      // eslint-disable-next-line no-param-reassign
      var namesForId = names[id] || (names[id] = Object.create(null));
      namesForId[name] = true;
    }
  };

  /* resets an ID entirely by overwriting it in the dictionary */
  var resetIdNames = function resetIdNames(names, id) {
    // eslint-disable-next-line no-param-reassign
    names[id] = Object.create(null);
  };

  /* factory for a names dictionary checking the existance of an ID:name pairing */
  var hasNameForId = function hasNameForId(names) {
    return function (id, name) {
      return names[id] !== undefined && names[id][name];
    };
  };

  /* stringifies names for the html/element output */
  var stringifyNames = function stringifyNames(names) {
    var str = '';
    // eslint-disable-next-line guard-for-in
    for (var id in names) {
      str += Object.keys(names[id]).join(' ') + ' ';
    }
    return str.trim();
  };

  /* clones the nested names dictionary */
  var cloneNames = function cloneNames(names) {
    var clone = Object.create(null);
    // eslint-disable-next-line guard-for-in
    for (var id in names) {
      clone[id] = _extends({}, names[id]);
    }
    return clone;
  };

  //

  // 

  /* this marker separates component styles and is important for rehydration */
  var makeTextMarker = function makeTextMarker(id) {
    return '\n/* sc-component-id: ' + id + ' */\n';
  };

  /* create a new style tag after lastEl */
  var makeStyleTag = function makeStyleTag(target, tagEl, insertBefore) {
    var el = document.createElement('style');
    el.setAttribute(SC_ATTR, '');
    el.setAttribute(SC_VERSION_ATTR, "4.0.0-beta.3-purecomponent");

    var nonce = getNonce();
    if (nonce) {
      el.setAttribute('nonce', nonce);
    }

    /* Work around insertRule quirk in EdgeHTML */
    el.appendChild(document.createTextNode(''));

    if (target && !tagEl) {
      /* Append to target when no previous element was passed */
      target.appendChild(el);
    } else {
      if (!tagEl || !target || !tagEl.parentNode) {
        throw new StyledComponentsError(6);
      }

      /* Insert new style tag after the previous one */
      tagEl.parentNode.insertBefore(el, insertBefore ? tagEl : tagEl.nextSibling);
    }

    return el;
  };

  /* takes a css factory function and outputs an html styled tag factory */
  var wrapAsHtmlTag = function wrapAsHtmlTag(css, names) {
    return function (additionalAttrs) {
      var nonce = getNonce();
      var attrs = [nonce && 'nonce="' + nonce + '"', SC_ATTR + '="' + stringifyNames(names) + '"', SC_VERSION_ATTR + '="' + "4.0.0-beta.3-purecomponent" + '"', additionalAttrs];

      var htmlAttr = attrs.filter(Boolean).join(' ');
      return '<style ' + htmlAttr + '>' + css() + '</style>';
    };
  };

  /* takes a css factory function and outputs an element factory */
  var wrapAsElement = function wrapAsElement(css, names) {
    return function () {
      var _props;

      var props = (_props = {}, _props[SC_ATTR] = stringifyNames(names), _props[SC_VERSION_ATTR] = "4.0.0-beta.3-purecomponent", _props);

      var nonce = getNonce();
      if (nonce) {
        // $FlowFixMe
        props.nonce = nonce;
      }

      // eslint-disable-next-line react/no-danger
      return React__default.createElement('style', _extends({}, props, { dangerouslySetInnerHTML: { __html: css() } }));
    };
  };

  var getIdsFromMarkersFactory = function getIdsFromMarkersFactory(markers) {
    return function () {
      return Object.keys(markers);
    };
  };

  var makeTextNode = function makeTextNode(id) {
    return document.createTextNode(makeTextMarker(id));
  };

  var makeBrowserTag = function makeBrowserTag(el, getImportRuleTag) {
    var names = Object.create(null);
    var markers = Object.create(null);

    var extractImport = getImportRuleTag !== undefined;

    /* indicates whther getImportRuleTag was called */
    var usedImportRuleTag = false;

    var insertMarker = function insertMarker(id) {
      var prev = markers[id];
      if (prev !== undefined) {
        return prev;
      }

      markers[id] = makeTextNode(id);
      el.appendChild(markers[id]);
      names[id] = Object.create(null);

      return markers[id];
    };

    var insertRules = function insertRules(id, cssRules, name) {
      var marker = insertMarker(id);
      var importRules = [];
      var cssRulesSize = cssRules.length;

      for (var i = 0; i < cssRulesSize; i += 1) {
        var rule = cssRules[i];
        var mayHaveImport = extractImport;
        if (mayHaveImport && rule.indexOf('@import') !== -1) {
          importRules.push(rule);
        } else {
          mayHaveImport = false;
          var separator = i === cssRulesSize - 1 ? '' : ' ';
          marker.appendData('' + rule + separator);
        }
      }

      addNameForId(names, id, name);

      if (extractImport && importRules.length > 0) {
        usedImportRuleTag = true;
        // $FlowFixMe
        getImportRuleTag().insertRules(id + '-import', importRules);
      }
    };

    var removeRules = function removeRules(id) {
      var marker = markers[id];
      if (marker === undefined) return;

      /* create new empty text node and replace the current one */
      var newMarker = makeTextNode(id);
      el.replaceChild(newMarker, marker);
      markers[id] = newMarker;
      resetIdNames(names, id);

      if (extractImport && usedImportRuleTag) {
        // $FlowFixMe
        getImportRuleTag().removeRules(id + '-import');
      }
    };

    var css = function css() {
      var str = '';
      // eslint-disable-next-line guard-for-in
      for (var id in markers) {
        str += markers[id].data;
      }
      return str;
    };
    return {
      clone: function clone() {
        throw new StyledComponentsError(5);
      },

      css: css,
      getIds: getIdsFromMarkersFactory(markers),
      hasNameForId: hasNameForId(names),
      insertMarker: insertMarker,
      insertRules: insertRules,
      removeRules: removeRules,
      sealed: false,
      styleTag: el,
      toElement: wrapAsElement(css, names),
      toHTML: wrapAsHtmlTag(css, names)
    };
  };

  var makeServerTagInternal = function makeServerTagInternal(namesArg, markersArg) {
    var names = namesArg === undefined ? Object.create(null) : namesArg;
    var markers = markersArg === undefined ? Object.create(null) : markersArg;

    var insertMarker = function insertMarker(id) {
      var prev = markers[id];
      if (prev !== undefined) {
        return prev;
      }

      return markers[id] = [''];
    };

    var insertRules = function insertRules(id, cssRules, name) {
      var marker = insertMarker(id);
      marker[0] += cssRules.join(' ');
      addNameForId(names, id, name);
    };

    var removeRules = function removeRules(id) {
      var marker = markers[id];
      if (marker === undefined) return;
      marker[0] = '';
      resetIdNames(names, id);
    };

    var css = function css() {
      var str = '';
      // eslint-disable-next-line guard-for-in
      for (var id in markers) {
        var cssForId = markers[id][0];
        if (cssForId) {
          str += makeTextMarker(id) + cssForId;
        }
      }
      return str;
    };

    var clone = function clone() {
      var namesClone = cloneNames(names);
      var markersClone = Object.create(null);

      // eslint-disable-next-line guard-for-in
      for (var id in markers) {
        markersClone[id] = [markers[id][0]];
      }

      return makeServerTagInternal(namesClone, markersClone);
    };

    var tag = {
      clone: clone,
      css: css,
      getIds: getIdsFromMarkersFactory(markers),
      hasNameForId: hasNameForId(names),
      insertMarker: insertMarker,
      insertRules: insertRules,
      removeRules: removeRules,
      sealed: false,
      styleTag: null,
      toElement: wrapAsElement(css, names),
      toHTML: wrapAsHtmlTag(css, names)
    };

    return tag;
  };

  var makeServerTag = function makeServerTag() {
    return makeServerTagInternal();
  };

  var makeTag = function makeTag(target, tagEl, forceServer, insertBefore, getImportRuleTag) {
    if (IS_BROWSER && !forceServer) {
      var el = makeStyleTag(target, tagEl, insertBefore);

      {
        return makeBrowserTag(el, getImportRuleTag);
      }
    }

    return makeServerTag();
  };

  /* wraps a given tag so that rehydration is performed once when necessary */
  var makeRehydrationTag = function makeRehydrationTag(tag, els, extracted, immediateRehydration) {
    /* rehydration function that adds all rules to the new tag */
    var rehydrate = once(function () {
      /* add all extracted components to the new tag */
      for (var i = 0, len = extracted.length; i < len; i += 1) {
        var _extracted$i = extracted[i],
            componentId = _extracted$i.componentId,
            cssFromDOM = _extracted$i.cssFromDOM;

        var cssRules = splitByRules(cssFromDOM);
        tag.insertRules(componentId, cssRules);
      }

      /* remove old HTMLStyleElements, since they have been rehydrated */
      for (var _i = 0, _len = els.length; _i < _len; _i += 1) {
        var el = els[_i];
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      }
    });

    if (immediateRehydration) rehydrate();

    return _extends({}, tag, {
      /* add rehydration hook to insertion methods */
      insertMarker: function insertMarker(id) {
        rehydrate();
        return tag.insertMarker(id);
      },

      insertRules: function insertRules(id, cssRules, name) {
        rehydrate();
        return tag.insertRules(id, cssRules, name);
      },

      removeRules: function removeRules(id) {
        rehydrate();
        return tag.removeRules(id);
      }
    });
  };

  // 

  var SPLIT_REGEX = /\s+/;

  /* determine the maximum number of components before tags are sharded */
  var MAX_SIZE = void 0;
  if (IS_BROWSER) {
    /* in speedy mode we can keep a lot more rules in a sheet before a slowdown can be expected */
    MAX_SIZE = 40;
  } else {
    /* for servers we do not need to shard at all */
    MAX_SIZE = -1;
  }

  var sheetRunningId = 0;
  var master = void 0;

  var StyleSheet = function () {
    /* a map from ids to tags */
    /* deferred rules for a given id */
    /* this is used for not reinjecting rules via hasNameForId() */
    /* when rules for an id are removed using remove() we have to ignore rehydratedNames for it */
    /* a list of tags belonging to this StyleSheet */
    /* a tag for import rules */
    /* current capacity until a new tag must be created */
    /* children (aka clones) of this StyleSheet inheriting all and future injections */

    function StyleSheet() {
      var _this = this;

      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : IS_BROWSER ? document.head : null;
      var forceServer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      classCallCheck(this, StyleSheet);

      this.getImportRuleTag = function () {
        var importRuleTag = _this.importRuleTag;

        if (importRuleTag !== undefined) {
          return importRuleTag;
        }

        var firstTag = _this.tags[0];
        var insertBefore = true;

        return _this.importRuleTag = makeTag(_this.target, firstTag ? firstTag.styleTag : null, _this.forceServer, insertBefore);
      };

      sheetRunningId += 1;
      this.id = sheetRunningId;
      this.forceServer = forceServer;
      this.target = forceServer ? null : target;
      this.tagMap = {};
      this.deferred = {};
      this.rehydratedNames = {};
      this.ignoreRehydratedNames = {};
      this.tags = [];
      this.capacity = 1;
      this.clones = [];
    }

    /* rehydrate all SSR'd style tags */


    StyleSheet.prototype.rehydrate = function rehydrate() {
      if (!IS_BROWSER || this.forceServer) {
        return this;
      }
      var els = [];
      var extracted = [];
      var isStreamed = false;

      /* retrieve all of our SSR style elements from the DOM */
      var nodes = document.querySelectorAll('style[' + SC_ATTR + '][' + SC_VERSION_ATTR + '="' + "4.0.0-beta.3-purecomponent" + '"]');
      var nodesSize = nodes.length;

      /* abort rehydration if no previous style tags were found */
      if (nodesSize === 0) {
        return this;
      }

      for (var i = 0; i < nodesSize; i += 1) {
        // $FlowFixMe: We can trust that all elements in this query are style elements
        var el = nodes[i];

        /* check if style tag is a streamed tag */
        if (!isStreamed) isStreamed = !!el.getAttribute(SC_STREAM_ATTR);

        /* retrieve all component names */
        var elNames = (el.getAttribute(SC_ATTR) || '').trim().split(SPLIT_REGEX);
        var elNamesSize = elNames.length;
        for (var j = 0; j < elNamesSize; j += 1) {
          var name = elNames[j];
          /* add rehydrated name to sheet to avoid readding styles */
          this.rehydratedNames[name] = true;
        }

        /* extract all components and their CSS */
        extracted.push.apply(extracted, extractComps(el.textContent));

        /* store original HTMLStyleElement */
        els.push(el);
      }

      /* abort rehydration if nothing was extracted */
      var extractedSize = extracted.length;
      if (extractedSize === 0) {
        return this;
      }

      /* create a tag to be used for rehydration */
      var tag = this.makeTag(null);
      var rehydrationTag = makeRehydrationTag(tag, els, extracted, isStreamed);

      /* reset capacity and adjust MAX_SIZE by the initial size of the rehydration */
      this.capacity = Math.max(1, MAX_SIZE - extractedSize);
      this.tags.push(rehydrationTag);

      /* retrieve all component ids */
      for (var _j = 0; _j < extractedSize; _j += 1) {
        this.tagMap[extracted[_j].componentId] = rehydrationTag;
      }

      return this;
    };

    /* retrieve a "master" instance of StyleSheet which is typically used when no other is available
     * The master StyleSheet is targeted by createGlobalStyle, keyframes, and components outside of any
      * StyleSheetManager's context */


    /* reset the internal "master" instance */
    StyleSheet.reset = function reset() {
      var forceServer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      master = new StyleSheet(undefined, forceServer).rehydrate();
    };

    /* adds "children" to the StyleSheet that inherit all of the parents' rules
     * while their own rules do not affect the parent */


    StyleSheet.prototype.clone = function clone() {
      var sheet = new StyleSheet(this.target, this.forceServer);

      /* add to clone array */
      this.clones.push(sheet);

      /* clone all tags */
      sheet.tags = this.tags.map(function (tag) {
        var ids = tag.getIds();
        var newTag = tag.clone();

        /* reconstruct tagMap */
        for (var i = 0; i < ids.length; i += 1) {
          sheet.tagMap[ids[i]] = newTag;
        }

        return newTag;
      });

      /* clone other maps */
      sheet.rehydratedNames = _extends({}, this.rehydratedNames);
      sheet.deferred = _extends({}, this.deferred);

      return sheet;
    };

    /* force StyleSheet to create a new tag on the next injection */


    StyleSheet.prototype.sealAllTags = function sealAllTags() {
      this.capacity = 1;

      this.tags.forEach(function (tag) {
        // eslint-disable-next-line no-param-reassign
        tag.sealed = true;
      });
    };

    StyleSheet.prototype.makeTag = function makeTag$$1(tag) {
      var lastEl = tag ? tag.styleTag : null;
      var insertBefore = false;

      return makeTag(this.target, lastEl, this.forceServer, insertBefore, this.getImportRuleTag);
    };

    /* get a tag for a given componentId, assign the componentId to one, or shard */
    StyleSheet.prototype.getTagForId = function getTagForId(id) {
      /* simply return a tag, when the componentId was already assigned one */
      var prev = this.tagMap[id];
      if (prev !== undefined && !prev.sealed) {
        return prev;
      }

      var tag = this.tags[this.tags.length - 1];

      /* shard (create a new tag) if the tag is exhausted (See MAX_SIZE) */
      this.capacity -= 1;

      if (this.capacity === 0) {
        this.capacity = MAX_SIZE;
        tag = this.makeTag(tag);
        this.tags.push(tag);
      }

      return this.tagMap[id] = tag;
    };

    /* mainly for createGlobalStyle to check for its id */


    StyleSheet.prototype.hasId = function hasId(id) {
      return this.tagMap[id] !== undefined;
    };

    /* caching layer checking id+name to already have a corresponding tag and injected rules */


    StyleSheet.prototype.hasNameForId = function hasNameForId(id, name) {
      /* exception for rehydrated names which are checked separately */
      if (this.ignoreRehydratedNames[id] === undefined && this.rehydratedNames[name]) {
        return true;
      }

      var tag = this.tagMap[id];
      return tag !== undefined && tag.hasNameForId(id, name);
    };

    /* registers a componentId and registers it on its tag */


    StyleSheet.prototype.deferredInject = function deferredInject(id, cssRules) {
      /* don't inject when the id is already registered */
      if (this.tagMap[id] !== undefined) return;

      var clones = this.clones;

      for (var i = 0; i < clones.length; i += 1) {
        clones[i].deferredInject(id, cssRules);
      }

      this.getTagForId(id).insertMarker(id);
      this.deferred[id] = cssRules;
    };

    /* injects rules for a given id with a name that will need to be cached */


    StyleSheet.prototype.inject = function inject(id, cssRules, name) {
      var clones = this.clones;


      for (var i = 0; i < clones.length; i += 1) {
        clones[i].inject(id, cssRules, name);
      }

      var tag = this.getTagForId(id);

      /* add deferred rules for component */
      if (this.deferred[id] !== undefined) {
        // Combine passed cssRules with previously deferred CSS rules
        // NOTE: We cannot mutate the deferred array itself as all clones
        // do the same (see clones[i].inject)
        var rules = this.deferred[id].concat(cssRules);
        tag.insertRules(id, rules, name);

        this.deferred[id] = undefined;
      } else {
        tag.insertRules(id, cssRules, name);
      }
    };

    /* removes all rules for a given id, which doesn't remove its marker but resets it */


    StyleSheet.prototype.remove = function remove(id) {
      var tag = this.tagMap[id];
      if (tag === undefined) return;

      var clones = this.clones;

      for (var i = 0; i < clones.length; i += 1) {
        clones[i].remove(id);
      }

      /* remove all rules from the tag */
      tag.removeRules(id);
      /* ignore possible rehydrated names */
      this.ignoreRehydratedNames[id] = true;
      /* delete possible deferred rules */
      this.deferred[id] = undefined;
    };

    StyleSheet.prototype.toHTML = function toHTML() {
      return this.tags.map(function (tag) {
        return tag.toHTML();
      }).join('');
    };

    StyleSheet.prototype.toReactElements = function toReactElements() {
      var id = this.id;


      return this.tags.map(function (tag, i) {
        var key = 'sc-' + id + '-' + i;
        return React.cloneElement(tag.toElement(), { key: key });
      });
    };

    createClass(StyleSheet, null, [{
      key: 'master',
      get: function get$$1() {
        return master || (master = new StyleSheet().rehydrate());
      }

      /* NOTE: This is just for backwards-compatibility with jest-styled-components */

    }, {
      key: 'instance',
      get: function get$$1() {
        return StyleSheet.master;
      }
    }]);
    return StyleSheet;
  }();

  // 

  var Keyframes = function () {
    function Keyframes(name, rules) {
      var _this = this;

      classCallCheck(this, Keyframes);

      this.inject = function (styleSheet) {
        if (!styleSheet.hasNameForId(_this.id, _this.name)) {
          styleSheet.inject(_this.id, _this.rules, _this.name);
        }
      };

      this.name = name;
      this.rules = rules;

      this.id = 'sc-keyframes-' + name;
    }

    Keyframes.prototype.getName = function getName() {
      return this.name;
    };

    return Keyframes;
  }();

  // 

  var objToCss = function objToCss(obj, prevKey) {
    var css = Object.keys(obj).filter(function (key) {
      var chunk = obj[key];
      return chunk !== undefined && chunk !== null && chunk !== false && chunk !== '';
    }).map(function (key) {
      if (isPlainObject(obj[key])) return objToCss(obj[key], key);
      return hyphenateStyleName(key) + ': ' + obj[key] + ';';
    }).join(' ');
    return prevKey ? prevKey + ' {\n  ' + css + '\n}' : css;
  };

  var flatten = function flatten(chunks, executionContext, styleSheet) {
    return chunks.reduce(function (ruleSet, chunk) {
      /* Remove falsey values */
      if (chunk === undefined || chunk === null || chunk === false || chunk === '') {
        return ruleSet;
      }

      /* Flatten ruleSet */
      if (Array.isArray(chunk)) {
        ruleSet.push.apply(ruleSet, flatten(chunk, executionContext, styleSheet));
        return ruleSet;
      }

      /* Handle other components */
      if (isStyledComponent(chunk)) {
        // $FlowFixMe not sure how to make this pass
        ruleSet.push('.' + chunk.styledComponentId);
        return ruleSet;
      }

      /* Either execute or defer the function */
      if (typeof chunk === 'function') {
        if (executionContext) {
          ruleSet.push.apply(ruleSet, flatten([chunk(executionContext)], executionContext, styleSheet));
        } else ruleSet.push(chunk);

        return ruleSet;
      }

      if (chunk instanceof Keyframes) {
        if (styleSheet) {
          chunk.inject(styleSheet);
          ruleSet.push(chunk.getName());
        } else ruleSet.push(chunk);

        return ruleSet;
      }

      /* Handle objects */
      ruleSet.push(
      // $FlowFixMe have to add %checks somehow to isPlainObject
      isPlainObject(chunk) ? objToCss(chunk) : chunk.toString());

      return ruleSet;
    }, []);
  };

  // 
  /* eslint-disable no-bitwise */

  /* This is the "capacity" of our alphabet i.e. 2x26 for all letters plus their capitalised
   * counterparts */
  var charsLength = 52;

  /* start at 75 for 'a' until 'z' (25) and then start at 65 for capitalised letters */
  var getAlphabeticChar = function getAlphabeticChar(code) {
    return String.fromCharCode(code + (code > 25 ? 39 : 97));
  };

  /* input a number, usually a hash and convert it to base-52 */
  var generateAlphabeticName = function generateAlphabeticName(code) {
    var name = '';
    var x = void 0;

    /* get a char and divide by alphabet-length */
    for (x = code; x > charsLength; x = Math.floor(x / charsLength)) {
      name = getAlphabeticChar(x % charsLength) + name;
    }

    return getAlphabeticChar(x % charsLength) + name;
  };

  // 

  var interleave = (function (strings, interpolations) {
    var result = [strings[0]];

    for (var i = 0, len = interpolations.length; i < len; i += 1) {
      result.push(interpolations[i], strings[i + 1]);
    }

    return result;
  });

  // 
  var EMPTY_ARRAY = Object.freeze([]);
  var EMPTY_OBJECT = Object.freeze({});

  // 

  var css = (function (styles) {
    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    if (typeof styles === 'function' || isPlainObject(styles)) {
      // $FlowFixMe
      return flatten(interleave(EMPTY_ARRAY, [styles].concat(interpolations)));
    }

    // $FlowFixMe
    return flatten(interleave(styles, interpolations));
  });

  function memoize(fn) {
    var cache = {};
    return function (arg) {
      if (cache[arg] === undefined) cache[arg] = fn(arg);
      return cache[arg];
    };
  }

  var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|valueLink|accept|acceptCharset|accessKey|action|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|default|defer|dir|disabled|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|itemProp|itemScope|itemType|itemID|itemRef|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class)|(on[A-Z].*)|((data|aria|x)-.*))$/i;
  var index = memoize(reactPropsRegex.test.bind(reactPropsRegex));

  var reactIs_production_min = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports,"__esModule",{value:!0});var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.forward_ref"):60112,n=b?Symbol.for("react.timeout"):60113;
  function q(a){if("object"===typeof a&&null!==a){var p=a.$$typeof;switch(p){case c:switch(a=a.type,a){case l:case e:case g:case f:return a;default:switch(a=a&&a.$$typeof,a){case k:case m:case h:return a;default:return p}}case d:return p}}}exports.typeOf=q;exports.AsyncMode=l;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=m;exports.Fragment=e;exports.Profiler=g;exports.Portal=d;exports.StrictMode=f;
  exports.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===l||a===g||a===f||a===n||"object"===typeof a&&null!==a&&(a.$$typeof===h||a.$$typeof===k||a.$$typeof===m)};exports.isAsyncMode=function(a){return q(a)===l};exports.isContextConsumer=function(a){return q(a)===k};exports.isContextProvider=function(a){return q(a)===h};exports.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return q(a)===m};
  exports.isFragment=function(a){return q(a)===e};exports.isProfiler=function(a){return q(a)===g};exports.isPortal=function(a){return q(a)===d};exports.isStrictMode=function(a){return q(a)===f};
  });

  unwrapExports(reactIs_production_min);
  var reactIs_production_min_1 = reactIs_production_min.typeOf;
  var reactIs_production_min_2 = reactIs_production_min.AsyncMode;
  var reactIs_production_min_3 = reactIs_production_min.ContextConsumer;
  var reactIs_production_min_4 = reactIs_production_min.ContextProvider;
  var reactIs_production_min_5 = reactIs_production_min.Element;
  var reactIs_production_min_6 = reactIs_production_min.ForwardRef;
  var reactIs_production_min_7 = reactIs_production_min.Fragment;
  var reactIs_production_min_8 = reactIs_production_min.Profiler;
  var reactIs_production_min_9 = reactIs_production_min.Portal;
  var reactIs_production_min_10 = reactIs_production_min.StrictMode;
  var reactIs_production_min_11 = reactIs_production_min.isValidElementType;
  var reactIs_production_min_12 = reactIs_production_min.isAsyncMode;
  var reactIs_production_min_13 = reactIs_production_min.isContextConsumer;
  var reactIs_production_min_14 = reactIs_production_min.isContextProvider;
  var reactIs_production_min_15 = reactIs_production_min.isElement;
  var reactIs_production_min_16 = reactIs_production_min.isForwardRef;
  var reactIs_production_min_17 = reactIs_production_min.isFragment;
  var reactIs_production_min_18 = reactIs_production_min.isProfiler;
  var reactIs_production_min_19 = reactIs_production_min.isPortal;
  var reactIs_production_min_20 = reactIs_production_min.isStrictMode;

  var reactIs_development = createCommonjsModule(function (module, exports) {



  {
    (function() {

  Object.defineProperty(exports, '__esModule', { value: true });

  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var hasSymbol = typeof Symbol === 'function' && Symbol.for;

  var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
  var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
  var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
  var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
  var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
  var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
  var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
  var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
  var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
  var REACT_TIMEOUT_TYPE = hasSymbol ? Symbol.for('react.timeout') : 0xead1;

  function isValidElementType(type) {
    return typeof type === 'string' || typeof type === 'function' ||
    // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
    type === REACT_FRAGMENT_TYPE || type === REACT_ASYNC_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_TIMEOUT_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
  }

  function typeOf(object) {
    if (typeof object === 'object' && object !== null) {
      var $$typeof = object.$$typeof;

      switch ($$typeof) {
        case REACT_ELEMENT_TYPE:
          var type = object.type;

          switch (type) {
            case REACT_ASYNC_MODE_TYPE:
            case REACT_FRAGMENT_TYPE:
            case REACT_PROFILER_TYPE:
            case REACT_STRICT_MODE_TYPE:
              return type;
            default:
              var $$typeofType = type && type.$$typeof;

              switch ($$typeofType) {
                case REACT_CONTEXT_TYPE:
                case REACT_FORWARD_REF_TYPE:
                case REACT_PROVIDER_TYPE:
                  return $$typeofType;
                default:
                  return $$typeof;
              }
          }
        case REACT_PORTAL_TYPE:
          return $$typeof;
      }
    }

    return undefined;
  }

  var AsyncMode = REACT_ASYNC_MODE_TYPE;
  var ContextConsumer = REACT_CONTEXT_TYPE;
  var ContextProvider = REACT_PROVIDER_TYPE;
  var Element = REACT_ELEMENT_TYPE;
  var ForwardRef = REACT_FORWARD_REF_TYPE;
  var Fragment = REACT_FRAGMENT_TYPE;
  var Profiler = REACT_PROFILER_TYPE;
  var Portal = REACT_PORTAL_TYPE;
  var StrictMode = REACT_STRICT_MODE_TYPE;

  function isAsyncMode(object) {
    return typeOf(object) === REACT_ASYNC_MODE_TYPE;
  }
  function isContextConsumer(object) {
    return typeOf(object) === REACT_CONTEXT_TYPE;
  }
  function isContextProvider(object) {
    return typeOf(object) === REACT_PROVIDER_TYPE;
  }
  function isElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function isForwardRef(object) {
    return typeOf(object) === REACT_FORWARD_REF_TYPE;
  }
  function isFragment(object) {
    return typeOf(object) === REACT_FRAGMENT_TYPE;
  }
  function isProfiler(object) {
    return typeOf(object) === REACT_PROFILER_TYPE;
  }
  function isPortal(object) {
    return typeOf(object) === REACT_PORTAL_TYPE;
  }
  function isStrictMode(object) {
    return typeOf(object) === REACT_STRICT_MODE_TYPE;
  }

  exports.typeOf = typeOf;
  exports.AsyncMode = AsyncMode;
  exports.ContextConsumer = ContextConsumer;
  exports.ContextProvider = ContextProvider;
  exports.Element = Element;
  exports.ForwardRef = ForwardRef;
  exports.Fragment = Fragment;
  exports.Profiler = Profiler;
  exports.Portal = Portal;
  exports.StrictMode = StrictMode;
  exports.isValidElementType = isValidElementType;
  exports.isAsyncMode = isAsyncMode;
  exports.isContextConsumer = isContextConsumer;
  exports.isContextProvider = isContextProvider;
  exports.isElement = isElement;
  exports.isForwardRef = isForwardRef;
  exports.isFragment = isFragment;
  exports.isProfiler = isProfiler;
  exports.isPortal = isPortal;
  exports.isStrictMode = isStrictMode;
    })();
  }
  });

  unwrapExports(reactIs_development);
  var reactIs_development_1 = reactIs_development.typeOf;
  var reactIs_development_2 = reactIs_development.AsyncMode;
  var reactIs_development_3 = reactIs_development.ContextConsumer;
  var reactIs_development_4 = reactIs_development.ContextProvider;
  var reactIs_development_5 = reactIs_development.Element;
  var reactIs_development_6 = reactIs_development.ForwardRef;
  var reactIs_development_7 = reactIs_development.Fragment;
  var reactIs_development_8 = reactIs_development.Profiler;
  var reactIs_development_9 = reactIs_development.Portal;
  var reactIs_development_10 = reactIs_development.StrictMode;
  var reactIs_development_11 = reactIs_development.isValidElementType;
  var reactIs_development_12 = reactIs_development.isAsyncMode;
  var reactIs_development_13 = reactIs_development.isContextConsumer;
  var reactIs_development_14 = reactIs_development.isContextProvider;
  var reactIs_development_15 = reactIs_development.isElement;
  var reactIs_development_16 = reactIs_development.isForwardRef;
  var reactIs_development_17 = reactIs_development.isFragment;
  var reactIs_development_18 = reactIs_development.isProfiler;
  var reactIs_development_19 = reactIs_development.isPortal;
  var reactIs_development_20 = reactIs_development.isStrictMode;

  var reactIs = createCommonjsModule(function (module) {

  {
    module.exports = reactIs_development;
  }
  });
  var reactIs_1 = reactIs.isValidElementType;

  var _ReactIs$ForwardRef;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  /**
   * Copyright 2015, Yahoo! Inc.
   * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
   */


  var REACT_STATICS = {
      childContextTypes: true,
      contextTypes: true,
      defaultProps: true,
      displayName: true,
      getDefaultProps: true,
      getDerivedStateFromProps: true,
      mixins: true,
      propTypes: true,
      type: true
  };

  var KNOWN_STATICS = {
      name: true,
      length: true,
      prototype: true,
      caller: true,
      callee: true,
      arguments: true,
      arity: true
  };

  var TYPE_STATICS = _defineProperty({}, reactIs.ForwardRef, (_ReactIs$ForwardRef = {}, _defineProperty(_ReactIs$ForwardRef, '$$typeof', true), _defineProperty(_ReactIs$ForwardRef, 'render', true), _ReactIs$ForwardRef));

  var defineProperty$1 = Object.defineProperty;
  var getOwnPropertyNames = Object.getOwnPropertyNames;
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var getPrototypeOf = Object.getPrototypeOf;
  var objectPrototype = Object.prototype;

  function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
      if (typeof sourceComponent !== 'string') {
          // don't hoist over string (html) components

          if (objectPrototype) {
              var inheritedComponent = getPrototypeOf(sourceComponent);
              if (inheritedComponent && inheritedComponent !== objectPrototype) {
                  hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
              }
          }

          var keys = getOwnPropertyNames(sourceComponent);

          if (getOwnPropertySymbols) {
              keys = keys.concat(getOwnPropertySymbols(sourceComponent));
          }

          var targetStatics = TYPE_STATICS[targetComponent['$$typeof']] || REACT_STATICS;
          var sourceStatics = TYPE_STATICS[sourceComponent['$$typeof']] || REACT_STATICS;

          for (var i = 0; i < keys.length; ++i) {
              var key = keys[i];
              if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
                  var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                  try {
                      // Avoid failures from read-only properties
                      defineProperty$1(targetComponent, key, descriptor);
                  } catch (e) {}
              }
          }

          return targetComponent;
      }

      return targetComponent;
  }

  var hoistNonReactStatics_cjs = hoistNonReactStatics;

  // 

  var LIMIT = 200;

  var createWarnTooManyClasses = (function (displayName) {
    var generatedClasses = {};
    var warningSeen = false;

    return function (className) {
      if (!warningSeen) {
        generatedClasses[className] = true;
        if (Object.keys(generatedClasses).length >= LIMIT) {
          // Unable to find latestRule in test environment.
          /* eslint-disable no-console, prefer-template */
          console.warn('Over ' + LIMIT + ' classes were generated for component ' + displayName + '. \n' + 'Consider using the attrs method, together with a style object for frequently changed styles.\n' + 'Example:\n' + '  const Component = styled.div.attrs({\n' + '    style: ({ background }) => ({\n' + '      background,\n' + '    }),\n' + '  })`width: 100%;`\n\n' + '  <Component />');
          warningSeen = true;
          generatedClasses = {};
        }
      }
    };
  });

  // 

  var determineTheme = (function (props, fallbackTheme, defaultProps) {
    // Props should take precedence over ThemeProvider, which should take precedence over
    // defaultProps, but React automatically puts defaultProps on props.

    /* eslint-disable react/prop-types */
    var isDefaultTheme = defaultProps ? props.theme === defaultProps.theme : false;

    var theme = props.theme && !isDefaultTheme ? props.theme : fallbackTheme || defaultProps.theme;
    /* eslint-enable */

    return theme;
  });

  // 
  var escapeRegex = /[[\].#*$><+~=|^:(),"'`-]+/g;
  var dashesAtEnds = /(^-|-$)/g;

  /**
   * TODO: Explore using CSS.escape when it becomes more available
   * in evergreen browsers.
   */
  function escape(str) {
    return str
    // Replace all possible CSS selectors
    .replace(escapeRegex, '-')

    // Remove extraneous hyphens at the start and end
    .replace(dashesAtEnds, '');
  }

  // 

  function getComponentName(target) {
    return target.displayName || target.name || 'Component';
  }

  // 

  function isTag(target) /* : %checks */{
    return typeof target === 'string';
  }

  // 

  function generateDisplayName(target) {
    return isTag(target) ? 'styled.' + target : 'Styled(' + getComponentName(target) + ')';
  }

  // 
  function isDerivedReactComponent(fn) {
    return !!(fn && fn.prototype && fn.prototype.isReactComponent);
  }

  var simpleIsEqual = function simpleIsEqual(a, b) {
    return a === b;
  };

  function index$1 (resultFn) {
    var isEqual = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : simpleIsEqual;

    var lastThis = void 0;
    var lastArgs = [];
    var lastResult = void 0;
    var calledOnce = false;

    var isNewArgEqualToLast = function isNewArgEqualToLast(newArg, index) {
      return isEqual(newArg, lastArgs[index]);
    };

    var result = function result() {
      for (var _len = arguments.length, newArgs = Array(_len), _key = 0; _key < _len; _key++) {
        newArgs[_key] = arguments[_key];
      }

      if (calledOnce && lastThis === this && newArgs.length === lastArgs.length && newArgs.every(isNewArgEqualToLast)) {
        return lastResult;
      }

      calledOnce = true;
      lastThis = this;
      lastArgs = newArgs;
      lastResult = resultFn.apply(this, newArgs);
      return lastResult;
    };

    return result;
  }

  // 

  var isFunction = function isFunction(test) {
    return typeof test === 'function';
  };

  var ThemeContext = React.createContext();

  var ThemeConsumer = ThemeContext.Consumer;

  /**
   * Provide a theme to an entire react component tree via context
   */

  var ThemeProvider = function (_Component) {
    inherits(ThemeProvider, _Component);

    function ThemeProvider(props) {
      classCallCheck(this, ThemeProvider);

      var _this = possibleConstructorReturn(this, _Component.call(this, props));

      _this.getContext = index$1(_this.getContext.bind(_this));
      _this.renderInner = _this.renderInner.bind(_this);
      return _this;
    }

    ThemeProvider.prototype.render = function render() {
      if (!this.props.children) return null;

      return React__default.createElement(
        ThemeContext.Consumer,
        null,
        this.renderInner
      );
    };

    ThemeProvider.prototype.renderInner = function renderInner(outerTheme) {
      var context = this.getContext(this.props.theme, outerTheme);

      return React__default.createElement(
        ThemeContext.Provider,
        { value: context },
        React__default.Children.only(this.props.children)
      );
    };

    /**
     * Get the theme from the props, supporting both (outerTheme) => {}
     * as well as object notation
     */


    ThemeProvider.prototype.getTheme = function getTheme(theme, outerTheme) {
      if (isFunction(theme)) {
        var mergedTheme = theme(outerTheme);

        if (mergedTheme === null || Array.isArray(mergedTheme) || (typeof mergedTheme === 'undefined' ? 'undefined' : _typeof(mergedTheme)) !== 'object') {
          throw new StyledComponentsError(7);
        }

        return mergedTheme;
      }

      if (theme === null || Array.isArray(theme) || (typeof theme === 'undefined' ? 'undefined' : _typeof(theme)) !== 'object') {
        throw new StyledComponentsError(8);
      }

      return _extends({}, outerTheme, theme);
    };

    ThemeProvider.prototype.getContext = function getContext(theme, outerTheme) {
      return this.getTheme(theme, outerTheme);
    };

    return ThemeProvider;
  }(React.Component);

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols$1 = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
  	if (val === null || val === undefined) {
  		throw new TypeError('Object.assign cannot be called with null or undefined');
  	}

  	return Object(val);
  }

  function shouldUseNative() {
  	try {
  		if (!Object.assign) {
  			return false;
  		}

  		// Detect buggy property enumeration order in older V8 versions.

  		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
  		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
  		test1[5] = 'de';
  		if (Object.getOwnPropertyNames(test1)[0] === '5') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test2 = {};
  		for (var i = 0; i < 10; i++) {
  			test2['_' + String.fromCharCode(i)] = i;
  		}
  		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
  			return test2[n];
  		});
  		if (order2.join('') !== '0123456789') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test3 = {};
  		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
  			test3[letter] = letter;
  		});
  		if (Object.keys(Object.assign({}, test3)).join('') !==
  				'abcdefghijklmnopqrst') {
  			return false;
  		}

  		return true;
  	} catch (err) {
  		// We don't expect any of the above to throw, but better to be safe.
  		return false;
  	}
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  	var from;
  	var to = toObject(target);
  	var symbols;

  	for (var s = 1; s < arguments.length; s++) {
  		from = Object(arguments[s]);

  		for (var key in from) {
  			if (hasOwnProperty.call(from, key)) {
  				to[key] = from[key];
  			}
  		}

  		if (getOwnPropertySymbols$1) {
  			symbols = getOwnPropertySymbols$1(from);
  			for (var i = 0; i < symbols.length; i++) {
  				if (propIsEnumerable.call(from, symbols[i])) {
  					to[symbols[i]] = from[symbols[i]];
  				}
  			}
  		}
  	}

  	return to;
  };

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

  var ReactPropTypesSecret_1 = ReactPropTypesSecret;

  var printWarning = function() {};

  {
    var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
    var loggedTypeFailures = {};

    printWarning = function(text) {
      var message = 'Warning: ' + text;
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };
  }

  /**
   * Assert that the values match with the type specs.
   * Error messages are memorized and will only be shown once.
   *
   * @param {object} typeSpecs Map of name to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @param {string} componentName Name of the component for error messages.
   * @param {?Function} getStack Returns the component stack.
   * @private
   */
  function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    {
      for (var typeSpecName in typeSpecs) {
        if (typeSpecs.hasOwnProperty(typeSpecName)) {
          var error;
          // Prop type validation may throw. In case they do, we don't want to
          // fail the render phase where it didn't fail before. So we log it.
          // After these have been cleaned up, we'll let them throw.
          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            if (typeof typeSpecs[typeSpecName] !== 'function') {
              var err = Error(
                (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
                'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
              );
              err.name = 'Invariant Violation';
              throw err;
            }
            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
          } catch (ex) {
            error = ex;
          }
          if (error && !(error instanceof Error)) {
            printWarning(
              (componentName || 'React class') + ': type specification of ' +
              location + ' `' + typeSpecName + '` is invalid; the type checker ' +
              'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
              'You may have forgotten to pass an argument to the type checker ' +
              'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
              'shape all require an argument).'
            );

          }
          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error.message] = true;

            var stack = getStack ? getStack() : '';

            printWarning(
              'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
            );
          }
        }
      }
    }
  }

  var checkPropTypes_1 = checkPropTypes;

  var printWarning$1 = function() {};

  {
    printWarning$1 = function(text) {
      var message = 'Warning: ' + text;
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };
  }

  function emptyFunctionThatReturnsNull() {
    return null;
  }

  var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
    /* global Symbol */
    var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

    /**
     * Returns the iterator method function contained on the iterable object.
     *
     * Be sure to invoke the function with the iterable as context:
     *
     *     var iteratorFn = getIteratorFn(myIterable);
     *     if (iteratorFn) {
     *       var iterator = iteratorFn.call(myIterable);
     *       ...
     *     }
     *
     * @param {?object} maybeIterable
     * @return {?function}
     */
    function getIteratorFn(maybeIterable) {
      var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
      if (typeof iteratorFn === 'function') {
        return iteratorFn;
      }
    }

    /**
     * Collection of methods that allow declaration and validation of props that are
     * supplied to React components. Example usage:
     *
     *   var Props = require('ReactPropTypes');
     *   var MyArticle = React.createClass({
     *     propTypes: {
     *       // An optional string prop named "description".
     *       description: Props.string,
     *
     *       // A required enum prop named "category".
     *       category: Props.oneOf(['News','Photos']).isRequired,
     *
     *       // A prop named "dialog" that requires an instance of Dialog.
     *       dialog: Props.instanceOf(Dialog).isRequired
     *     },
     *     render: function() { ... }
     *   });
     *
     * A more formal specification of how these methods are used:
     *
     *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
     *   decl := ReactPropTypes.{type}(.isRequired)?
     *
     * Each and every declaration produces a function with the same signature. This
     * allows the creation of custom validation functions. For example:
     *
     *  var MyLink = React.createClass({
     *    propTypes: {
     *      // An optional string or URI prop named "href".
     *      href: function(props, propName, componentName) {
     *        var propValue = props[propName];
     *        if (propValue != null && typeof propValue !== 'string' &&
     *            !(propValue instanceof URI)) {
     *          return new Error(
     *            'Expected a string or an URI for ' + propName + ' in ' +
     *            componentName
     *          );
     *        }
     *      }
     *    },
     *    render: function() {...}
     *  });
     *
     * @internal
     */

    var ANONYMOUS = '<<anonymous>>';

    // Important!
    // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
    var ReactPropTypes = {
      array: createPrimitiveTypeChecker('array'),
      bool: createPrimitiveTypeChecker('boolean'),
      func: createPrimitiveTypeChecker('function'),
      number: createPrimitiveTypeChecker('number'),
      object: createPrimitiveTypeChecker('object'),
      string: createPrimitiveTypeChecker('string'),
      symbol: createPrimitiveTypeChecker('symbol'),

      any: createAnyTypeChecker(),
      arrayOf: createArrayOfTypeChecker,
      element: createElementTypeChecker(),
      instanceOf: createInstanceTypeChecker,
      node: createNodeChecker(),
      objectOf: createObjectOfTypeChecker,
      oneOf: createEnumTypeChecker,
      oneOfType: createUnionTypeChecker,
      shape: createShapeTypeChecker,
      exact: createStrictShapeTypeChecker,
    };

    /**
     * inlined Object.is polyfill to avoid requiring consumers ship their own
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
     */
    /*eslint-disable no-self-compare*/
    function is(x, y) {
      // SameValue algorithm
      if (x === y) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        return x !== 0 || 1 / x === 1 / y;
      } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
      }
    }
    /*eslint-enable no-self-compare*/

    /**
     * We use an Error-like object for backward compatibility as people may call
     * PropTypes directly and inspect their output. However, we don't use real
     * Errors anymore. We don't inspect their stack anyway, and creating them
     * is prohibitively expensive if they are created too often, such as what
     * happens in oneOfType() for any type before the one that matched.
     */
    function PropTypeError(message) {
      this.message = message;
      this.stack = '';
    }
    // Make `instanceof Error` still work for returned errors.
    PropTypeError.prototype = Error.prototype;

    function createChainableTypeChecker(validate) {
      {
        var manualPropTypeCallCache = {};
        var manualPropTypeWarningCount = 0;
      }
      function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
        componentName = componentName || ANONYMOUS;
        propFullName = propFullName || propName;

        if (secret !== ReactPropTypesSecret_1) {
          if (throwOnDirectAccess) {
            // New behavior only for users of `prop-types` package
            var err = new Error(
              'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
              'Use `PropTypes.checkPropTypes()` to call them. ' +
              'Read more at http://fb.me/use-check-prop-types'
            );
            err.name = 'Invariant Violation';
            throw err;
          } else if (typeof console !== 'undefined') {
            // Old behavior for people using React.PropTypes
            var cacheKey = componentName + ':' + propName;
            if (
              !manualPropTypeCallCache[cacheKey] &&
              // Avoid spamming the console because they are often not actionable except for lib authors
              manualPropTypeWarningCount < 3
            ) {
              printWarning$1(
                'You are manually calling a React.PropTypes validation ' +
                'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
                'and will throw in the standalone `prop-types` package. ' +
                'You may be seeing this warning due to a third-party PropTypes ' +
                'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
              );
              manualPropTypeCallCache[cacheKey] = true;
              manualPropTypeWarningCount++;
            }
          }
        }
        if (props[propName] == null) {
          if (isRequired) {
            if (props[propName] === null) {
              return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
            }
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
          }
          return null;
        } else {
          return validate(props, propName, componentName, location, propFullName);
        }
      }

      var chainedCheckType = checkType.bind(null, false);
      chainedCheckType.isRequired = checkType.bind(null, true);

      return chainedCheckType;
    }

    function createPrimitiveTypeChecker(expectedType) {
      function validate(props, propName, componentName, location, propFullName, secret) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== expectedType) {
          // `propValue` being instance of, say, date/regexp, pass the 'object'
          // check, but we can offer a more precise error message here rather than
          // 'of type `object`'.
          var preciseType = getPreciseType(propValue);

          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createAnyTypeChecker() {
      return createChainableTypeChecker(emptyFunctionThatReturnsNull);
    }

    function createArrayOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
        }
        var propValue = props[propName];
        if (!Array.isArray(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
        }
        for (var i = 0; i < propValue.length; i++) {
          var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createElementTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!isValidElement(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createInstanceTypeChecker(expectedClass) {
      function validate(props, propName, componentName, location, propFullName) {
        if (!(props[propName] instanceof expectedClass)) {
          var expectedClassName = expectedClass.name || ANONYMOUS;
          var actualClassName = getClassName(props[propName]);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createEnumTypeChecker(expectedValues) {
      if (!Array.isArray(expectedValues)) {
        printWarning$1('Invalid argument supplied to oneOf, expected an instance of array.');
        return emptyFunctionThatReturnsNull;
      }

      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        for (var i = 0; i < expectedValues.length; i++) {
          if (is(propValue, expectedValues[i])) {
            return null;
          }
        }

        var valuesString = JSON.stringify(expectedValues);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
      }
      return createChainableTypeChecker(validate);
    }

    function createObjectOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
        }
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
        }
        for (var key in propValue) {
          if (propValue.hasOwnProperty(key)) {
            var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
            if (error instanceof Error) {
              return error;
            }
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createUnionTypeChecker(arrayOfTypeCheckers) {
      if (!Array.isArray(arrayOfTypeCheckers)) {
        printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.');
        return emptyFunctionThatReturnsNull;
      }

      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (typeof checker !== 'function') {
          printWarning$1(
            'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
            'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
          );
          return emptyFunctionThatReturnsNull;
        }
      }

      function validate(props, propName, componentName, location, propFullName) {
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
            return null;
          }
        }

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
      }
      return createChainableTypeChecker(validate);
    }

    function createNodeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        if (!isNode(props[propName])) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
        }
        for (var key in shapeTypes) {
          var checker = shapeTypes[key];
          if (!checker) {
            continue;
          }
          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createStrictShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
        }
        // We need to check all keys in case some are required but missing from
        // props.
        var allKeys = objectAssign({}, props[propName], shapeTypes);
        for (var key in allKeys) {
          var checker = shapeTypes[key];
          if (!checker) {
            return new PropTypeError(
              'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
              '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
              '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
            );
          }
          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error) {
            return error;
          }
        }
        return null;
      }

      return createChainableTypeChecker(validate);
    }

    function isNode(propValue) {
      switch (typeof propValue) {
        case 'number':
        case 'string':
        case 'undefined':
          return true;
        case 'boolean':
          return !propValue;
        case 'object':
          if (Array.isArray(propValue)) {
            return propValue.every(isNode);
          }
          if (propValue === null || isValidElement(propValue)) {
            return true;
          }

          var iteratorFn = getIteratorFn(propValue);
          if (iteratorFn) {
            var iterator = iteratorFn.call(propValue);
            var step;
            if (iteratorFn !== propValue.entries) {
              while (!(step = iterator.next()).done) {
                if (!isNode(step.value)) {
                  return false;
                }
              }
            } else {
              // Iterator will provide entry [k,v] tuples rather than values.
              while (!(step = iterator.next()).done) {
                var entry = step.value;
                if (entry) {
                  if (!isNode(entry[1])) {
                    return false;
                  }
                }
              }
            }
          } else {
            return false;
          }

          return true;
        default:
          return false;
      }
    }

    function isSymbol(propType, propValue) {
      // Native Symbol.
      if (propType === 'symbol') {
        return true;
      }

      // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
      if (propValue['@@toStringTag'] === 'Symbol') {
        return true;
      }

      // Fallback for non-spec compliant Symbols which are polyfilled.
      if (typeof Symbol === 'function' && propValue instanceof Symbol) {
        return true;
      }

      return false;
    }

    // Equivalent of `typeof` but with special handling for array and regexp.
    function getPropType(propValue) {
      var propType = typeof propValue;
      if (Array.isArray(propValue)) {
        return 'array';
      }
      if (propValue instanceof RegExp) {
        // Old webkits (at least until Android 4.0) return 'function' rather than
        // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
        // passes PropTypes.object.
        return 'object';
      }
      if (isSymbol(propType, propValue)) {
        return 'symbol';
      }
      return propType;
    }

    // This handles more types than `getPropType`. Only used for error messages.
    // See `createPrimitiveTypeChecker`.
    function getPreciseType(propValue) {
      if (typeof propValue === 'undefined' || propValue === null) {
        return '' + propValue;
      }
      var propType = getPropType(propValue);
      if (propType === 'object') {
        if (propValue instanceof Date) {
          return 'date';
        } else if (propValue instanceof RegExp) {
          return 'regexp';
        }
      }
      return propType;
    }

    // Returns a string that is postfixed to a warning about an invalid type.
    // For example, "undefined" or "of type array"
    function getPostfixForTypeWarning(value) {
      var type = getPreciseType(value);
      switch (type) {
        case 'array':
        case 'object':
          return 'an ' + type;
        case 'boolean':
        case 'date':
        case 'regexp':
          return 'a ' + type;
        default:
          return type;
      }
    }

    // Returns class name of the object, if any.
    function getClassName(propValue) {
      if (!propValue.constructor || !propValue.constructor.name) {
        return ANONYMOUS;
      }
      return propValue.constructor.name;
    }

    ReactPropTypes.checkPropTypes = checkPropTypes_1;
    ReactPropTypes.PropTypes = ReactPropTypes;

    return ReactPropTypes;
  };

  var propTypes = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
      Symbol.for &&
      Symbol.for('react.element')) ||
      0xeac7;

    var isValidElement = function(object) {
      return typeof object === 'object' &&
        object !== null &&
        object.$$typeof === REACT_ELEMENT_TYPE;
    };

    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true;
    module.exports = factoryWithTypeCheckers(isValidElement, throwOnDirectAccess);
  }
  });

  // 

  var ServerStyleSheet = function () {
    function ServerStyleSheet() {
      classCallCheck(this, ServerStyleSheet);

      /* The master sheet might be reset, so keep a reference here */
      this.masterSheet = StyleSheet.master;
      this.instance = this.masterSheet.clone();
      this.closed = false;
    }

    ServerStyleSheet.prototype.complete = function complete() {
      if (!this.closed) {
        /* Remove closed StyleSheets from the master sheet */
        var index = this.masterSheet.clones.indexOf(this.instance);
        this.masterSheet.clones.splice(index, 1);
        this.closed = true;
      }
    };

    ServerStyleSheet.prototype.collectStyles = function collectStyles(children) {
      if (this.closed) {
        throw new StyledComponentsError(2);
      }

      return React__default.createElement(
        StyleSheetManager,
        { sheet: this.instance },
        children
      );
    };

    ServerStyleSheet.prototype.getStyleTags = function getStyleTags() {
      this.complete();
      return this.instance.toHTML();
    };

    ServerStyleSheet.prototype.getStyleElement = function getStyleElement() {
      this.complete();
      return this.instance.toReactElements();
    };

    ServerStyleSheet.prototype.interleaveWithNodeStream = function interleaveWithNodeStream(readableStream) {
      var _this = this;

      {
        throw new StyledComponentsError(3);
      }

      /* the tag index keeps track of which tags have already been emitted */
      var instance = this.instance;

      var instanceTagIndex = 0;

      var streamAttr = SC_STREAM_ATTR + '="true"';

      var transformer = new stream.Transform({
        transform: function appendStyleChunks(chunk, /* encoding */_, callback) {
          var tags = instance.tags;

          var html = '';

          /* retrieve html for each new style tag */
          for (; instanceTagIndex < tags.length; instanceTagIndex += 1) {
            var tag = tags[instanceTagIndex];
            html += tag.toHTML(streamAttr);
          }

          /* force our StyleSheets to emit entirely new tags */
          instance.sealAllTags();

          /* prepend style html to chunk */
          this.push(html + chunk);
          callback();
        }
      });

      readableStream.on('end', function () {
        return _this.complete();
      });
      readableStream.on('error', function (err) {
        _this.complete();

        // forward the error to the transform stream
        transformer.emit('error', err);
      });

      return readableStream.pipe(transformer);
    };

    return ServerStyleSheet;
  }();

  // 

  var StyleSheetContext = React.createContext();

  var StyleSheetConsumer = StyleSheetContext.Consumer;

  var StyleSheetManager = function (_Component) {
    inherits(StyleSheetManager, _Component);

    function StyleSheetManager(props) {
      classCallCheck(this, StyleSheetManager);

      var _this = possibleConstructorReturn(this, _Component.call(this, props));

      _this.getContext = index$1(_this.getContext);
      return _this;
    }

    StyleSheetManager.prototype.getContext = function getContext(sheet, target) {
      if (sheet) {
        return sheet;
      } else if (target) {
        return new StyleSheet(target);
      } else {
        throw new StyledComponentsError(4);
      }
    };

    StyleSheetManager.prototype.render = function render() {
      var _props = this.props,
          children = _props.children,
          sheet = _props.sheet,
          target = _props.target;

      var context = this.getContext(sheet, target);
      return React__default.createElement(
        StyleSheetContext.Provider,
        { value: context },
        React__default.Children.only(children)
      );
    };

    return StyleSheetManager;
  }(React.Component);
  StyleSheetManager.propTypes = {
    sheet: propTypes.oneOfType([propTypes.instanceOf(StyleSheet), propTypes.instanceOf(ServerStyleSheet)]),
    target: propTypes.shape({
      appendChild: propTypes.func.isRequired
    })
  };

  // 

  // HACK for generating all static styles without needing to allocate
  // an empty execution context every single time...
  var STATIC_EXECUTION_CONTEXT$1 = {};

  var identifiers = {};

  /* We depend on components having unique IDs */
  function generateId(ComponentStyle, _displayName, parentComponentId) {
    var displayName = typeof _displayName !== 'string' ? 'sc' : escape(_displayName);

    /**
     * This ensures uniqueness if two components happen to share
     * the same displayName.
     */
    var nr = (identifiers[displayName] || 0) + 1;
    identifiers[displayName] = nr;

    var componentId = displayName + '-' + ComponentStyle.generateName(displayName + nr);

    return parentComponentId ? parentComponentId + '-' + componentId : componentId;
  }

  var warnInnerRef = once(function () {
    return (
      // eslint-disable-next-line no-console
      console.warn('The "innerRef" API has been removed in styled-components v4 in favor of React 16 ref forwarding, use "ref" instead like a typical component.')
    );
  });

  // $FlowFixMe

  var BaseStyledComponent = function (_PureComponent) {
    inherits(BaseStyledComponent, _PureComponent);

    function BaseStyledComponent() {
      classCallCheck(this, BaseStyledComponent);

      var _this = possibleConstructorReturn(this, _PureComponent.call(this));

      _this.attrs = {};

      _this.renderOuter = _this.renderOuter.bind(_this);
      _this.renderInner = _this.renderInner.bind(_this);
      return _this;
    }

    BaseStyledComponent.prototype.render = function render() {
      return React__default.createElement(
        StyleSheetConsumer,
        null,
        this.renderOuter
      );
    };

    BaseStyledComponent.prototype.renderOuter = function renderOuter(styleSheet) {
      this.styleSheet = styleSheet;

      return React__default.createElement(
        ThemeConsumer,
        null,
        this.renderInner
      );
    };

    BaseStyledComponent.prototype.renderInner = function renderInner(theme) {
      var _props$forwardedClass = this.props.forwardedClass,
          componentStyle = _props$forwardedClass.componentStyle,
          defaultProps = _props$forwardedClass.defaultProps,
          styledComponentId = _props$forwardedClass.styledComponentId,
          target = _props$forwardedClass.target;


      var isTargetTag = isTag(this.props.as || target);

      var generatedClassName = void 0;
      if (componentStyle.isStatic) {
        generatedClassName = this.generateAndInjectStyles(STATIC_EXECUTION_CONTEXT$1, this.props, this.styleSheet);
      } else if (theme !== undefined) {
        var determinedTheme = determineTheme(this.props, theme, defaultProps);

        generatedClassName = this.generateAndInjectStyles(determinedTheme, this.props, this.styleSheet);
      } else {
        generatedClassName = this.generateAndInjectStyles(this.props.theme || EMPTY_OBJECT, this.props, this.styleSheet);
      }

      var propsForElement = _extends({}, this.attrs);

      var key = void 0;
      for (key in this.props) {
        if (key === 'forwardedClass' || key === 'as') continue;else if (key === 'innerRef') {
          warnInnerRef();
        } else if (key === 'forwardedRef') propsForElement.ref = this.props[key];
        // Don't pass through non HTML tags through to HTML elements
        else if (!isTargetTag || index(key)) {
            propsForElement[key] = key === 'style' && key in this.attrs ? _extends({}, this.attrs[key], this.props[key]) : this.props[key];
          }
      }

      propsForElement.className = [this.props.className, styledComponentId, this.attrs.className, generatedClassName].filter(Boolean).join(' ');

      return React.createElement(this.props.as || target, propsForElement);
    };

    BaseStyledComponent.prototype.buildExecutionContext = function buildExecutionContext(theme, props, attrs) {
      var context = _extends({}, props, { theme: theme });

      if (attrs === undefined) return context;

      this.attrs = {};

      var attr = void 0;
      var key = void 0;

      /* eslint-disable guard-for-in */
      for (key in attrs) {
        attr = attrs[key];

        this.attrs[key] = typeof attr === 'function' && !isDerivedReactComponent(attr) && !isStyledComponent(attr) ? attr(context) : attr;
      }
      /* eslint-enable */

      return _extends({}, context, this.attrs);
    };

    BaseStyledComponent.prototype.generateAndInjectStyles = function generateAndInjectStyles(theme, props) {
      var styleSheet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : StyleSheet.master;
      var _props$forwardedClass2 = props.forwardedClass,
          attrs = _props$forwardedClass2.attrs,
          componentStyle = _props$forwardedClass2.componentStyle,
          warnTooManyClasses = _props$forwardedClass2.warnTooManyClasses;

      // statically styled-components don't need to build an execution context object,
      // and shouldn't be increasing the number of class names

      if (componentStyle.isStatic && attrs === undefined) {
        return componentStyle.generateAndInjectStyles(STATIC_EXECUTION_CONTEXT$1, styleSheet);
      } else {
        var executionContext = this.buildExecutionContext(theme, props, props.forwardedClass.attrs);

        var className = componentStyle.generateAndInjectStyles(executionContext, styleSheet);

        if (warnTooManyClasses !== undefined) {
          warnTooManyClasses(className);
        }

        return className;
      }
    };

    return BaseStyledComponent;
  }(React.PureComponent);

  var _StyledComponent = (function (ComponentStyle) {
    function createStyledComponent(target, options, rules) {
      var isTargetStyledComp = isStyledComponent(target);
      var isClass = !isTag(target);

      var _options$displayName = options.displayName,
          displayName = _options$displayName === undefined ? generateDisplayName(target) : _options$displayName,
          _options$componentId = options.componentId,
          componentId = _options$componentId === undefined ? generateId(ComponentStyle, options.displayName, options.parentComponentId) : _options$componentId,
          _options$ParentCompon = options.ParentComponent,
          ParentComponent = _options$ParentCompon === undefined ? BaseStyledComponent : _options$ParentCompon,
          attrs = options.attrs;


      var styledComponentId = options.displayName && options.componentId ? escape(options.displayName) + '-' + options.componentId : options.componentId || componentId;

      // fold the underlying StyledComponent attrs up (implicit extend)
      var finalAttrs =
      // $FlowFixMe
      isTargetStyledComp && target.attrs ? _extends({}, target.attrs, attrs) : attrs;

      var componentStyle = new ComponentStyle(isTargetStyledComp ? // fold the underlying StyledComponent rules up (implicit extend)
      // $FlowFixMe
      target.componentStyle.rules.concat(rules) : rules, finalAttrs, styledComponentId);

      /**
       * forwardRef creates a new interim component, which we'll take advantage of
       * instead of extending ParentComponent to create _another_ interim class
       */
      var StyledComponent = React__default.forwardRef(function (props, ref) {
        return React__default.createElement(ParentComponent, _extends({}, props, {
          forwardedClass: StyledComponent,
          forwardedRef: ref
        }));
      });

      // $FlowFixMe
      StyledComponent.attrs = finalAttrs;
      // $FlowFixMe
      StyledComponent.componentStyle = componentStyle;
      StyledComponent.displayName = displayName;
      // $FlowFixMe
      StyledComponent.styledComponentId = styledComponentId;

      // fold the underlying StyledComponent target up since we folded the styles
      // $FlowFixMe
      StyledComponent.target = isTargetStyledComp ? target.target : target;

      // $FlowFixMe
      StyledComponent.withComponent = function withComponent(tag) {
        var previousComponentId = options.componentId,
            optionsToCopy = objectWithoutProperties(options, ['componentId']);


        var newComponentId = previousComponentId && previousComponentId + '-' + (isTag(tag) ? tag : escape(getComponentName(tag)));

        var newOptions = _extends({}, optionsToCopy, {
          attrs: finalAttrs,
          componentId: newComponentId,
          ParentComponent: ParentComponent
        });

        return createStyledComponent(tag, newOptions, rules);
      };

      {
        // $FlowFixMe
        StyledComponent.warnTooManyClasses = createWarnTooManyClasses(displayName);
      }

      if (isClass) {
        hoistNonReactStatics_cjs(StyledComponent, target, {
          // all SC-specific things should not be hoisted
          attrs: true,
          componentStyle: true,
          displayName: true,
          styledComponentId: true,
          target: true,
          warnTooManyClasses: true,
          withComponent: true
        });
      }

      return StyledComponent;
    }

    return createStyledComponent;
  });

  // Source: https://github.com/garycourt/murmurhash-js/blob/master/murmurhash2_gc.js
  function murmurhash(str) {
    var l = str.length | 0,
        h = l | 0,
        i = 0,
        k;

    while (l >= 4) {
      k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;

      k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
      k ^= k >>> 24;
      k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);

      h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16) ^ k;

      l -= 4;
      ++i;
    }

    switch (l) {
      case 3:
        h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
      case 2:
        h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
      case 1:
        h ^= str.charCodeAt(i) & 0xff;
        h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
    }

    h ^= h >>> 13;
    h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
    h ^= h >>> 15;

    return h >>> 0;
  }

  // 

  function isStaticRules(rules, attrs) {
    for (var i = 0; i < rules.length; i += 1) {
      var rule = rules[i];

      // recursive case
      if (Array.isArray(rule) && !isStaticRules(rule)) {
        return false;
      } else if (typeof rule === 'function' && !isStyledComponent(rule)) {
        // functions are allowed to be static if they're just being
        // used to get the classname of a nested styled component
        return false;
      }
    }

    if (attrs !== undefined) {
      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      for (var key in attrs) {
        var value = attrs[key];
        if (typeof value === 'function') {
          return false;
        }
      }
    }

    return true;
  }

  // 

  var areStylesCacheable = IS_BROWSER;

  var isHMREnabled = typeof module !== 'undefined' && module.hot;

  /*
   ComponentStyle is all the CSS-specific stuff, not
   the React-specific stuff.
   */
  var _ComponentStyle = (function (nameGenerator, flatten, stringifyRules) {
    /* combines hashStr (murmurhash) and nameGenerator for convenience */
    var generateRuleHash = function generateRuleHash(str) {
      return nameGenerator(murmurhash(str));
    };

    var ComponentStyle = function () {
      function ComponentStyle(rules, attrs, componentId) {
        classCallCheck(this, ComponentStyle);

        this.rules = rules;
        this.isStatic = !isHMREnabled && isStaticRules(rules, attrs);
        this.componentId = componentId;

        if (!StyleSheet.master.hasId(componentId)) {
          var placeholder = ['.' + componentId + ' {}'];

          StyleSheet.master.deferredInject(componentId, placeholder);
        }
      }

      /*
       * Flattens a rule set into valid CSS
       * Hashes it, wraps the whole chunk in a .hash1234 {}
       * Returns the hash to be injected on render()
       * */


      ComponentStyle.prototype.generateAndInjectStyles = function generateAndInjectStyles(executionContext, styleSheet) {
        var isStatic = this.isStatic,
            componentId = this.componentId,
            lastClassName = this.lastClassName;

        if (areStylesCacheable && isStatic && lastClassName !== undefined && styleSheet.hasNameForId(componentId, lastClassName)) {
          return lastClassName;
        }

        var flatCSS = flatten(this.rules, executionContext, styleSheet);
        var name = generateRuleHash(this.componentId + flatCSS.join(''));
        if (!styleSheet.hasNameForId(componentId, name)) {
          styleSheet.inject(this.componentId, stringifyRules(flatCSS, '.' + name), name);
        }

        this.lastClassName = name;
        return name;
      };

      ComponentStyle.generateName = function generateName(str) {
        return generateRuleHash(str);
      };

      return ComponentStyle;
    }();

    return ComponentStyle;
  });

  // 
  // Thanks to ReactDOMFactories for this handy list!

  var domElements = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr',

  // SVG
  'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

  // 

  var _styled = (function (styledComponent, constructWithOptions) {
    var styled = function styled(tag) {
      return constructWithOptions(styledComponent, tag);
    };

    // Shorthands for all valid HTML Elements
    domElements.forEach(function (domElement) {
      styled[domElement] = styled(domElement);
    });

    return styled;
  });

  // 

  var _constructWithOptions = (function (css) {
    var constructWithOptions = function constructWithOptions(componentConstructor, tag) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY_OBJECT;

      if (!reactIs_1(tag)) {
        throw new StyledComponentsError(1, String(tag));
      }

      /* This is callable directly as a template function */
      // $FlowFixMe: Not typed to avoid destructuring arguments
      var templateFunction = function templateFunction() {
        return componentConstructor(tag, options, css.apply(undefined, arguments));
      };

      /* If config methods are called, wrap up a new template function and merge options */
      templateFunction.withConfig = function (config) {
        return constructWithOptions(componentConstructor, tag, _extends({}, options, config));
      };
      templateFunction.attrs = function (attrs) {
        return constructWithOptions(componentConstructor, tag, _extends({}, options, {
          attrs: _extends({}, options.attrs || EMPTY_OBJECT, attrs)
        }));
      };

      return templateFunction;
    };

    return constructWithOptions;
  });

  // 

  var replaceWhitespace = function replaceWhitespace(str) {
    return str.replace(/\s|\\n/g, '');
  };

  var _keyframes = (function (nameGenerator, stringifyRules, css) {
    return function () {
      var rules = css.apply(undefined, arguments);
      var name = nameGenerator(murmurhash(replaceWhitespace(JSON.stringify(rules))));

      return new Keyframes(name, stringifyRules(rules, name, '@keyframes'));
    };
  });

  // 

  var _GlobalStyle = (function (stringifyRules) {
    var GlobalStyle = function () {
      function GlobalStyle(rules, componentId) {
        classCallCheck(this, GlobalStyle);

        this.rules = rules;
        this.componentId = componentId;
        this.isStatic = isStaticRules(rules);

        if (!StyleSheet.master.hasId(componentId)) {
          StyleSheet.master.deferredInject(componentId, []);
        }
      }

      GlobalStyle.prototype.createStyles = function createStyles(executionContext, styleSheet) {
        var flatCSS = flatten(this.rules, executionContext);
        var css = stringifyRules(flatCSS, '');

        styleSheet.inject(this.componentId, css);
      };

      GlobalStyle.prototype.renderStyles = function renderStyles(executionContext, styleSheet) {
        this.removeStyles(styleSheet);
        this.createStyles(executionContext, styleSheet);
      };

      GlobalStyle.prototype.removeStyles = function removeStyles(styleSheet) {
        var componentId = this.componentId;

        if (styleSheet.hasId(componentId)) {
          styleSheet.remove(componentId);
        }
      };

      return GlobalStyle;
    }();

    return GlobalStyle;
  });

  // 

  var _createGlobalStyle = (function (stringifyRules, css) {
    var GlobalStyle = _GlobalStyle(stringifyRules);

    var createGlobalStyle = function createGlobalStyle(strings) {
      for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        interpolations[_key - 1] = arguments[_key];
      }

      var rules = css.apply(undefined, [strings].concat(interpolations));
      var id = 'sc-global-' + murmurhash(JSON.stringify(rules));
      var style = new GlobalStyle(rules, id);
      var count = 0;

      var GlobalStyleComponent = function (_React$PureComponent) {
        inherits(GlobalStyleComponent, _React$PureComponent);

        function GlobalStyleComponent() {
          classCallCheck(this, GlobalStyleComponent);

          var _this = possibleConstructorReturn(this, _React$PureComponent.call(this));

          count += 1;
          return _this;
        }

        GlobalStyleComponent.prototype.componentWillUnmount = function componentWillUnmount() {
          count -= 1;

          /**
           * Depending on the order "render" is called this can cause the styles to be lost
           * until the next render pass of the remaining instance, which may
           * not be immediate.
           */
          if (count === 0) style.removeStyles(this.styleSheet);else if (IS_BROWSER && count > 1) {
            console.warn('The global style component ' + id + ' was composed and rendered multiple times in your React component tree. Only the last-rendered copy will have its styles remain in <head>.');
          }
        };

        GlobalStyleComponent.prototype.render = function render() {
          var _this2 = this;

          if (React__default.Children.count(this.props.children)) {
            throw new StyledComponentsError(11);
          }

          return React__default.createElement(
            StyleSheetConsumer,
            null,
            function (styleSheet) {
              _this2.styleSheet = styleSheet || StyleSheet.master;

              if (style.isStatic) {
                style.renderStyles(STATIC_EXECUTION_CONTEXT, _this2.styleSheet);

                return null;
              } else {
                return React__default.createElement(
                  ThemeConsumer,
                  null,
                  function (theme) {
                    var defaultProps = _this2.constructor.defaultProps;


                    var context = _extends({}, _this2.props);

                    if (typeof theme !== 'undefined') {
                      context.theme = determineTheme(_this2.props, theme, defaultProps);
                    }

                    style.renderStyles(context, _this2.styleSheet);

                    return null;
                  }
                );
              }
            }
          );
        };

        return GlobalStyleComponent;
      }(React__default.PureComponent);

      GlobalStyleComponent.styledComponentId = id;


      return GlobalStyleComponent;
    };

    return createGlobalStyle;
  });

  // 

  var withTheme = (function (Component) {
    var WithTheme = React__default.forwardRef(function (props, ref) {
      return React__default.createElement(
        ThemeConsumer,
        null,
        function (theme) {
          // $FlowFixMe
          var defaultProps = WithTheme.defaultProps;

          var themeProp = determineTheme(props, theme, defaultProps);

          if (themeProp === undefined) {
            // eslint-disable-next-line no-console
            console.warn('[withTheme] You are not using a ThemeProvider nor passing a theme prop or a theme in defaultProps in component class ' + getComponentName(Component));
          }

          return React__default.createElement(Component, _extends({}, props, { theme: themeProp, ref: ref }));
        }
      );
    });

    hoistNonReactStatics_cjs(WithTheme, Component);

    WithTheme.displayName = 'WithTheme(' + getComponentName(Component) + ')';

    return WithTheme;
  });

  // 

  /* eslint-disable */
  var __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS = {
    StyleSheet: StyleSheet
  };

  // 

  /* Warning if you've imported this file on React Native */
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    // eslint-disable-next-line no-console
    console.warn("It looks like you've imported 'styled-components' on React Native.\n" + "Perhaps you're looking to import 'styled-components/native'?\n" + 'Read more about this at https://www.styled-components.com/docs/basics#react-native');
  }

  /* Warning if there are several instances of styled-components */
  if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Node.js') === -1 && navigator.userAgent.indexOf('jsdom') === -1) {
    window['__styled-components-init__'] = window['__styled-components-init__'] || 0;

    if (window['__styled-components-init__'] === 1) {
      // eslint-disable-next-line no-console
      console.warn("It looks like there are several instances of 'styled-components' initialized in this application. " + 'This may cause dynamic styles not rendering properly, errors happening during rehydration process ' + 'and makes your application bigger without a good reason.\n\n' + 'See https://s-c.sh/2BAXzed for more info.');
    }

    window['__styled-components-init__'] += 1;
  }

  /* Instantiate exported singletons */
  var keyframes = _keyframes(generateAlphabeticName, stringifyRules, css);
  var createGlobalStyle = _createGlobalStyle(stringifyRules, css);

  var secondary = /*#__PURE__*/Object.freeze({
    css: css,
    keyframes: keyframes,
    createGlobalStyle: createGlobalStyle,
    isStyledComponent: isStyledComponent,
    ThemeConsumer: ThemeConsumer,
    ThemeProvider: ThemeProvider,
    withTheme: withTheme,
    ServerStyleSheet: ServerStyleSheet,
    StyleSheetManager: StyleSheetManager,
    __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS: __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS
  });

  // 

  /* Instantiate singletons */
  var ComponentStyle = _ComponentStyle(generateAlphabeticName, flatten, stringifyRules);

  var constructWithOptions = _constructWithOptions(css);
  var StyledComponent = _StyledComponent(ComponentStyle);

  var styled = _styled(StyledComponent, constructWithOptions);

  /**
   * eliminates the need to do styled.default since the other APIs
   * are directly assigned as properties to the main function
   * */
  // eslint-disable-next-line guard-for-in
  for (var key in secondary) {
    styled[key] = secondary[key];
  }

  return styled;

}(React));
;window.styled = styled;
//# sourceMappingURL=styled-components.js.map
