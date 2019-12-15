(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
	(factory((global.styled = {}),global.React));
}(this, (function (exports,React) { 'use strict';

var React__default = 'default' in React ? React['default'] : React;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate$2(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

var hyphenate_1 = hyphenate$2;

var hyphenate = hyphenate_1;

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
  return hyphenate(string).replace(msPattern, '-ms-');
}

var hyphenateStyleName_1 = hyphenateStyleName;

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

/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var index$1 = function isObject(val) {
  return val != null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && Array.isArray(val) === false;
};

var isObject = index$1;

function isObjectObject(o) {
  return isObject(o) === true && Object.prototype.toString.call(o) === '[object Object]';
}

var index = function isPlainObject(o) {
  var ctor, prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
};

// 
var objToCss = function objToCss(obj, prevKey) {
  var css = Object.keys(obj).filter(function (key) {
    var chunk = obj[key];
    return chunk !== undefined && chunk !== null && chunk !== false && chunk !== '';
  }).map(function (key) {
    if (index(obj[key])) return objToCss(obj[key], key);
    return hyphenateStyleName_1(key) + ': ' + obj[key] + ';';
  }).join(' ');
  return prevKey ? prevKey + ' {\n  ' + css + '\n}' : css;
};

var flatten = function flatten(chunks, executionContext) {
  return chunks.reduce(function (ruleSet, chunk) {
    /* Remove falsey values */
    if (chunk === undefined || chunk === null || chunk === false || chunk === '') {
      return ruleSet;
    }
    /* Flatten ruleSet */
    if (Array.isArray(chunk)) {
      return [].concat(ruleSet, flatten(chunk, executionContext));
    }

    /* Handle other components */
    if (chunk.hasOwnProperty('styledComponentId')) {
      // $FlowFixMe not sure how to make this pass
      return [].concat(ruleSet, ['.' + chunk.styledComponentId]);
    }

    /* Either execute or defer the function */
    if (typeof chunk === 'function') {
      return executionContext ? ruleSet.concat.apply(ruleSet, flatten([chunk(executionContext)], executionContext)) : ruleSet.concat(chunk);
    }

    /* Handle objects */
    return ruleSet.concat(
    // $FlowFixMe have to add %checks somehow to isPlainObject
    index(chunk) ? objToCss(chunk) : chunk.toString());
  }, []);
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var stylis$1 = createCommonjsModule(function (module, exports) {
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
	(function (factory) {
		/* eslint-disable */
		(typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module['exports'] = factory(null) : typeof undefined === 'function' && undefined['amd'] ? undefined(factory(null)) : window['stylis'] = factory(null);
	})( /** @param {*=} options */function factory(options) {
		/* eslint-disable */

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
		var IMPORT = 169; /* <at>i */
		var CHARSET = 163; /* <at>c */
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
		function compile(parent, current, body, id, depth) {
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
								case NEWLINE:
									{
										break;
									}
								default:
									{
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
							case COMMA:
								{
									insert = 0;
								}
							// ignore
							case TAB:
							case CARRIAGE:
							case NEWLINE:
							case SPACE:
								{
									break;
								}
							// valid
							default:
								{
									insert = 0;
									length = caret;
									first = code;
									caret--;
									code = SEMICOLON;

									while (length < eof) {
										switch (body.charCodeAt(++length)) {
											case NEWLINE:
											case CARRIAGE:
											case SEMICOLON:
												{
													caret++;
													code = first;
												}
											case COLON:
											case OPENBRACES:
												{
													length = eof;
												}
										}
									}
								}
						}
					}

					// token varient
					switch (code) {
						case OPENBRACES:
							{
								chars = chars.trim();
								first = chars.charCodeAt(0);
								counter = 1;
								length = ++caret;

								while (caret < eof) {
									code = body.charCodeAt(caret);

									switch (code) {
										case OPENBRACES:
											{
												counter++;
												break;
											}
										case CLOSEBRACES:
											{
												counter--;
												break;
											}
									}

									if (counter === 0) {
										break;
									}

									caret++;
								}

								child = body.substring(length, caret);

								if (first === NULL) {
									first = (chars = chars.replace(nullptn, '').trim()).charCodeAt(0);
								}

								switch (first) {
									// @at-rule
									case AT:
										{
											if (format > 0) {
												chars = chars.replace(formatptn, '');
											}

											second = chars.charCodeAt(1);

											switch (second) {
												case DOCUMENT:
												case MEDIA:
												case SUPPORTS:
												case DASH:
													{
														selector = current;
														break;
													}
												default:
													{
														selector = array;
													}
											}

											child = compile(current, selector, child, second, depth + 1);
											length = child.length;

											// preserve empty @at-rule
											if (preserve > 0 && length === 0) {
												length = chars.length;
											}

											// execute plugins, @at-rule context
											if (plugged > 0) {
												selector = select(array, chars, invert);
												result = proxy(ATRUL, child, selector, current, line, column, length, second, depth);
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
													case SUPPORTS:
														{
															chars = chars.replace(supportsptn, supports);
														}
													case DOCUMENT:
													case MEDIA:
													case DASH:
														{
															child = chars + '{' + child + '}';
															break;
														}
													case KEYFRAME:
														{
															chars = chars.replace(keyframeptn, '$1 $2' + (keyed > 0 ? key : ''));
															child = chars + '{' + child + '}';

															if (prefix === 1 || prefix === 2 && vendor('@' + child, 3)) {
																child = '@' + webkit + child + '@' + child;
															} else {
																child = '@' + child;
															}
															break;
														}
													default:
														{
															child = chars + child;

															if (id === PAGE) {
																child = (out += child, '');
															}
														}
												}
											} else {
												child = '';
											}

											break;
										}
									// selector
									default:
										{
											child = compile(current, select(current, chars, invert), child, id, depth + 1);
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
								break;
							}
						case CLOSEBRACES:
						case SEMICOLON:
							{
								chars = (format > 0 ? chars.replace(formatptn, '') : chars).trim();

								if ((length = chars.length) > 1) {
									// monkey-patch missing colon
									if (pseudo === 0) {
										first = chars.charCodeAt(0);

										// first character is a letter or dash, buffer has a space character
										if (first === DASH || first > 96 && first < 123) {
											length = (chars = chars.replace(' ', ':')).length;
										}
									}

									// execute plugins, property context
									if (plugged > 0) {
										if ((result = proxy(PROPS, chars, current, parent, line, column, out.length, id, depth)) !== void 0) {
											if ((length = (chars = result.trim()).length) === 0) {
												chars = '\0\0';
											}
										}
									}

									first = chars.charCodeAt(0);
									second = chars.charCodeAt(1);

									switch (first + second) {
										case NULL:
											{
												break;
											}
										case IMPORT:
										case CHARSET:
											{
												flat += chars + body.charAt(caret);
												break;
											}
										default:
											{
												if (chars.charCodeAt(length - 1) === COLON) break;

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
								break;
							}
					}
				}

				// parse characters
				switch (code) {
					case CARRIAGE:
					case NEWLINE:
						{
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
									case CLOSEBRACES:
										{
											break;
										}
									default:
										{
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
							} else if (cascade + context === 0) {
								format = 1;
								chars += '\0';
							}

							// execute plugins, newline context
							if (plugged * unkwn > 0) {
								proxy(UNKWN, chars, current, parent, line, column, out.length, id, depth);
							}

							// next line, reset column position
							column = 1;
							line++;
							break;
						}
					case SEMICOLON:
					case CLOSEBRACES:
						{
							if (comment + quote + parentheses + bracket === 0) {
								column++;
								break;
							}
						}
					default:
						{
							// increment column position
							column++;

							// current character
							char = body.charAt(caret);

							// remove comments, escape functions, strings, attributes and prepare selectors
							switch (code) {
								case TAB:
								case SPACE:
									{
										if (quote + bracket + comment === 0) {
											switch (tail) {
												case COMMA:
												case COLON:
												case TAB:
												case SPACE:
													{
														char = '';
														break;
													}
												default:
													{
														if (code !== SPACE) {
															char = ' ';
														}
													}
											}
										}
										break;
									}
								// escape breaking control characters
								case NULL:
									{
										char = '\\0';
										break;
									}
								case FORMFEED:
									{
										char = '\\f';
										break;
									}
								case VERTICALTAB:
									{
										char = '\\v';
										break;
									}
								// &
								case AND:
									{
										// inverted selector pattern i.e html &
										if (quote + comment + bracket === 0 && cascade > 0) {
											invert = 1;
											format = 1;
											char = '\f' + char;
										}
										break;
									}
								// ::p<l>aceholder, l
								// :read-on<l>y, l
								case 108:
									{
										if (quote + comment + bracket + pattern === 0 && pseudo > 0) {
											switch (caret - pseudo) {
												// ::placeholder
												case 2:
													{
														if (tail === PLACEHOLDER && body.charCodeAt(caret - 3) === COLON) {
															pattern = tail;
														}
													}
												// :read-only
												case 8:
													{
														if (trail === READONLY) {
															pattern = trail;
														}
													}
											}
										}
										break;
									}
								// :<pattern>
								case COLON:
									{
										if (quote + comment + bracket === 0) {
											pseudo = caret;
										}
										break;
									}
								// selectors
								case COMMA:
									{
										if (comment + parentheses + quote + bracket === 0) {
											format = 1;
											char += '\r';
										}
										break;
									}
								// quotes
								case DOUBLEQUOTE:
									{
										if (comment === 0) {
											quote = quote === code ? 0 : quote === 0 ? code : quote;
										}
										break;
									}
								case SINGLEQUOTE:
									{
										if (comment === 0) {
											quote = quote === code ? 0 : quote === 0 ? code : quote;
										}
										break;
									}
								// attributes
								case OPENBRACKET:
									{
										if (quote + comment + parentheses === 0) {
											bracket++;
										}
										break;
									}
								case CLOSEBRACKET:
									{
										if (quote + comment + parentheses === 0) {
											bracket--;
										}
										break;
									}
								// functions
								case CLOSEPARENTHESES:
									{
										if (quote + comment + bracket === 0) {
											parentheses--;
										}
										break;
									}
								case OPENPARENTHESES:
									{
										if (quote + comment + bracket === 0) {
											if (context === 0) {
												switch (tail * 2 + trail * 3) {
													// :matches
													case 533:
														{
															break;
														}
													// :global, :not, :nth-child etc...
													default:
														{
															counter = 0;
															context = 1;
														}
												}
											}

											parentheses++;
										}
										break;
									}
								case AT:
									{
										if (comment + parentheses + quote + bracket + pseudo + atrule === 0) {
											atrule = 1;
										}
										break;
									}
								// block/line comments
								case STAR:
								case FOWARDSLASH:
									{
										if (quote + bracket + parentheses > 0) {
											break;
										}

										switch (comment) {
											// initialize line/block comment context
											case 0:
												{
													switch (code * 2 + body.charCodeAt(caret + 1) * 3) {
														// //
														case 235:
															{
																comment = FOWARDSLASH;
																break;
															}
														// /*
														case 220:
															{
																length = caret;
																comment = STAR;
																break;
															}
													}
													break;
												}
											// end block comment context
											case STAR:
												{
													if (code === FOWARDSLASH && tail === STAR) {
														// /*<!> ... */, !
														if (body.charCodeAt(length + 2) === 33) {
															out += body.substring(length, caret + 1);
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
										case OPENPARENTHESES:
											{
												if (context === 0) {
													// outside of an isolated context i.e nth-child(<...>)
													switch (tail) {
														case TAB:
														case SPACE:
														case NEWLINE:
														case CARRIAGE:
															{
																char = char + '\0';
																break;
															}
														default:
															{
																char = '\0' + char + (code === COMMA ? '' : '\0');
															}
													}
													format = 1;
												} else {
													// within an isolated context, sleep untill it's terminated
													switch (code) {
														case OPENPARENTHESES:
															{
																context = ++counter;
																break;
															}
														case CLOSEPARENTHESES:
															{
																if ((context = --counter) === 0) {
																	format = 1;
																	char += '\0';
																}
																break;
															}
													}
												}
												break;
											}
										case TAB:
										case SPACE:
											{
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
													case CARRIAGE:
														{
															break;
														}
													default:
														{
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
				if (length === 0 && children.length === 0 && current[0].length === 0 === false) {
					if (id !== MEDIA || current.length === 1 && (cascade > 0 ? nscopealt : nscope) === current[0]) {
						length = current.join(',').length + 2;
					}
				}
			}

			if (length > 0) {
				// cascade isolation mode?
				selector = cascade === 0 && id !== KEYFRAME ? isolate(current) : current;

				// execute plugins, block context
				if (plugged > 0) {
					result = proxy(BLCKS, out, selector, parent, line, column, length, id, depth);

					if (result !== void 0 && (out = result).length === 0) {
						return flat + out + children;
					}
				}

				out = selector.join(',') + '{' + out + '}';

				if (prefix * pattern !== 0) {
					if (prefix === 2 && !vendor(out, 2)) pattern = 0;

					switch (pattern) {
						// ::read-only
						case READONLY:
							{
								out = out.replace(readonlyptn, ':' + moz + '$1') + out;
								break;
							}
						// ::placeholder
						case PLACEHOLDER:
							{
								out = out.replace(plcholdrptn, '::' + webkit + 'input-$1') + out.replace(plcholdrptn, '::' + moz + '$1') + out.replace(plcholdrptn, ':' + ms + 'input-$1') + out;
								break;
							}
					}

					pattern = 0;
				}
			}

			return flat + out + children;
		}

		/**
   * Select
   *
   * @param {Array<string>} parent
   * @param {string} current
   * @param {number} invert
   * @return {Array<string>}
   */
		function select(parent, current, invert) {
			var selectors = current.trim().split(selectorptn);
			var out = selectors;

			var length = selectors.length;
			var l = parent.length;

			switch (l) {
				// 0-1 parent selectors
				case 0:
				case 1:
					{
						for (var i = 0, selector = l === 0 ? '' : parent[0] + ' '; i < length; ++i) {
							out[i] = scope(selector, out[i], invert, l).trim();
						}
						break;
					}
				// >2 parent selectors, nested
				default:
					{
						for (var i = 0, j = 0, out = []; i < length; ++i) {
							for (var k = 0; k < l; ++k) {
								out[j++] = scope(parent[k] + ' ', selectors[i], invert, l).trim();
							}
						}
					}
			}

			return out;
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
		function scope(parent, current, invert, level) {
			var selector = current;
			var code = selector.charCodeAt(0);

			// trim leading whitespace
			if (code < 33) {
				code = (selector = selector.trim()).charCodeAt(0);
			}

			switch (code) {
				// &
				case AND:
					{
						switch (cascade + level) {
							case 0:
							case 1:
								{
									if (parent.trim().length === 0) {
										break;
									}
								}
							default:
								{
									return selector.replace(andptn, '$1' + parent.trim());
								}
						}
						break;
					}
				// :
				case COLON:
					{
						switch (selector.charCodeAt(1)) {
							// g in :global
							case 103:
								{
									if (escape > 0 && cascade > 0) {
										return selector.replace(escapeptn, '$1').replace(andptn, '$1' + nscope);
									}
									break;
								}
							default:
								{
									// :hover
									return parent.trim() + selector.replace(andptn, '$1' + parent.trim());
								}
						}
					}
				default:
					{
						// html &
						if (invert * cascade > 0 && selector.indexOf('\f') > 0) {
							return selector.replace(andptn, (parent.charCodeAt(0) === COLON ? '' : '$1') + parent.trim());
						}
					}
			}

			return parent + selector;
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
		function property(input, first, second, third) {
			var index = 0;
			var out = input + ';';
			var hash = first * 2 + second * 3 + third * 4;
			var cache;

			// animation: a, n, i characters
			if (hash === 944) {
				return animation(out);
			} else if (prefix === 0 || prefix === 2 && !vendor(out, 1)) {
				return out;
			}

			// vendor prefix
			switch (hash) {
				// text-decoration/text-size-adjust: t, e, x
				case 1015:
					{
						// text-size-adjust, -
						return out.charCodeAt(9) === DASH ? webkit + out + out : out;
					}
				// filter/fill f, i, l
				case 951:
					{
						// filter, t
						return out.charCodeAt(3) === 116 ? webkit + out + out : out;
					}
				// color/column, c, o, l
				case 963:
					{
						// column, n
						return out.charCodeAt(5) === 110 ? webkit + out + out : out;
					}
				// box-decoration-break, b, o, x
				case 1009:
					{
						if (out.charCodeAt(4) !== 100) {
							break;
						}
					}
				// mask, m, a, s
				// clip-path, c, l, i
				case 969:
				case 942:
					{
						return webkit + out + out;
					}
				// appearance: a, p, p
				case 978:
					{
						return webkit + out + moz + out + out;
					}
				// hyphens: h, y, p
				// user-select: u, s, e
				case 1019:
				case 983:
					{
						return webkit + out + moz + out + ms + out + out;
					}
				// background/backface-visibility, b, a, c
				case 883:
					{
						// backface-visibility, -
						return out.charCodeAt(8) === DASH ? webkit + out + out : out;
					}
				// flex: f, l, e
				case 932:
					{
						if (out.charCodeAt(4) === DASH) {
							switch (out.charCodeAt(5)) {
								// flex-grow, g
								case 103:
									{
										return webkit + 'box-' + out.replace('-grow', '') + webkit + out + ms + out.replace('grow', 'positive') + out;
									}
								// flex-shrink, s
								case 115:
									{
										return webkit + out + ms + out.replace('shrink', 'negative') + out;
									}
								// flex-basis, b
								case 98:
									{
										return webkit + out + ms + out.replace('basis', 'preferred-size') + out;
									}
							}
						}

						return webkit + out + ms + out + out;
					}
				// order: o, r, d
				case 964:
					{
						return webkit + out + ms + 'flex' + '-' + out + out;
					}
				// justify-items/justify-content, j, u, s
				case 1023:
					{
						// justify-content, c
						if (out.charCodeAt(8) !== 99) {
							break;
						}

						cache = out.substring(out.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
						return webkit + 'box-pack' + cache + webkit + out + ms + 'flex-pack' + cache + out;
					}
				// cursor, c, u, r
				case 1005:
					{
						return cursorptn.test(out) ? out.replace(colonptn, ':' + webkit) + out.replace(colonptn, ':' + moz) + out : out;
					}
				// writing-mode, w, r, i
				case 1000:
					{
						cache = out.substring(13).trim();
						index = cache.indexOf('-') + 1;

						switch (cache.charCodeAt(0) + cache.charCodeAt(index)) {
							// vertical-lr
							case 226:
								{
									cache = out.replace(writingptn, 'tb');
									break;
								}
							// vertical-rl
							case 232:
								{
									cache = out.replace(writingptn, 'tb-rl');
									break;
								}
							// horizontal-tb
							case 220:
								{
									cache = out.replace(writingptn, 'lr');
									break;
								}
							default:
								{
									return out;
								}
						}

						return webkit + out + ms + cache + out;
					}
				// position: sticky
				case 1017:
					{
						if (out.indexOf('sticky', 9) === -1) {
							return out;
						}
					}
				// display(flex/inline-flex/inline-box): d, i, s
				case 975:
					{
						index = (out = input).length - 10;
						cache = (out.charCodeAt(index) === 33 ? out.substring(0, index) : out).substring(input.indexOf(':', 7) + 1).trim();

						switch (hash = cache.charCodeAt(0) + (cache.charCodeAt(7) | 0)) {
							// inline-
							case 203:
								{
									// inline-box
									if (cache.charCodeAt(8) < 111) {
										break;
									}
								}
							// inline-box/sticky
							case 115:
								{
									out = out.replace(cache, webkit + cache) + ';' + out;
									break;
								}
							// inline-flex
							// flex
							case 207:
							case 102:
								{
									out = out.replace(cache, webkit + (hash > 102 ? 'inline-' : '') + 'box') + ';' + out.replace(cache, webkit + cache) + ';' + out.replace(cache, ms + cache + 'box') + ';' + out;
								}
						}

						return out + ';';
					}
				// align-items, align-center, align-self: a, l, i, -
				case 938:
					{
						if (out.charCodeAt(5) === DASH) {
							switch (out.charCodeAt(6)) {
								// align-items, i
								case 105:
									{
										cache = out.replace('-items', '');
										return webkit + out + webkit + 'box-' + cache + ms + 'flex-' + cache + out;
									}
								// align-self, s
								case 115:
									{
										return webkit + out + ms + 'flex-item-' + out.replace(selfptn, '') + out;
									}
								// align-content
								default:
									{
										return webkit + out + ms + 'flex-line-pack' + out.replace('align-content', '').replace(selfptn, '') + out;
									}
							}
						}
						break;
					}
				// width: min-content / width: max-content
				case 953:
					{
						if ((index = out.indexOf('-content', 9)) > 0) {
							// width: min-content / width: max-content
							if (out.charCodeAt(index - 3) === 109 && out.charCodeAt(index - 4) !== 45) {
								cache = out.substring(index - 3);
								return 'width:' + webkit + cache + 'width:' + moz + cache + 'width:' + cache;
							}
						}
						break;
					}
				// transform, transition: t, r, a
				case 962:
					{
						out = webkit + out + (out.charCodeAt(5) === 102 ? ms + out : '') + out;

						// transitions
						if (second + third === 211 && out.charCodeAt(13) === 105 && out.indexOf('transform', 10) > 0) {
							return out.substring(0, out.indexOf(';', 27) + 1).replace(transformptn, '$1' + webkit + '$2') + out;
						}

						break;
					}
			}

			return out;
		}

		function vendor(content, context) {
			var index = content.indexOf(context === 1 ? ':' : '{');
			var key = content.substring(0, context !== 3 ? index : 10);
			var value = content.substring(index + 1, content.length - 1);

			return should(context !== 2 ? key : key.replace(pseudofmt, '$1'), value, context);
		}

		/**
   * Supports
   *
   * @param {string} match
   * @param {string} group
   * @return {string}
   */
		function supports(match, group) {
			var out = property(group, group.charCodeAt(0), group.charCodeAt(1), group.charCodeAt(2));

			return out !== group + ';' ? out.replace(propertyptn, ' or ($1)').substring(4) : '(' + group + ')';
		}

		/**
   * Animation
   *
   * @param {string} input
   * @return {string}
   */
		function animation(input) {
			var length = input.length;
			var index = input.indexOf(':', 9) + 1;
			var declare = input.substring(0, index).trim();
			var out = input.substring(index, length - 1).trim();

			switch (input.charCodeAt(9) * keyed) {
				case 0:
					{
						break;
					}
				// animation-*, -
				case DASH:
					{
						// animation-name, n
						if (input.charCodeAt(10) !== 110) {
							break;
						}
					}
				// animation/animation-name
				default:
					{
						// split in case of multiple animations
						var list = out.split((out = '', animationptn));

						for (var i = 0, index = 0, length = list.length; i < length; index = 0, ++i) {
							var value = list[i];
							var items = value.split(propertiesptn);

							while (value = items[index]) {
								var peak = value.charCodeAt(0);

								if (keyed === 1 && (
								// letters
								peak > AT && peak < 90 || peak > 96 && peak < 123 || peak === UNDERSCORE ||
								// dash but not in sequence i.e --
								peak === DASH && value.charCodeAt(1) !== DASH)) {
									// not a number/function
									switch (isNaN(parseFloat(value)) + (value.indexOf('(') !== -1)) {
										case 1:
											{
												switch (value) {
													// not a valid reserved keyword
													case 'infinite':case 'alternate':case 'backwards':case 'running':
													case 'normal':case 'forwards':case 'both':case 'none':case 'linear':
													case 'ease':case 'ease-in':case 'ease-out':case 'ease-in-out':
													case 'paused':case 'reverse':case 'alternate-reverse':case 'inherit':
													case 'initial':case 'unset':case 'step-start':case 'step-end':
														{
															break;
														}
													default:
														{
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

			if (prefix === 1 || prefix === 2 && vendor(out, 1)) return webkit + out + out;

			return out;
		}

		/**
   * Isolate
   *
   * @param {Array<string>} current
   */
		function isolate(current) {
			for (var i = 0, length = current.length, selector = Array(length), padding, element; i < length; ++i) {
				// split individual elements in a selector i.e h1 h2 === [h1, h2]
				var elements = current[i].split(elementptn);
				var out = '';

				for (var j = 0, size = 0, tail = 0, code = 0, l = elements.length; j < l; ++j) {
					// empty element
					if ((size = (element = elements[j]).length) === 0 && l > 1) {
						continue;
					}

					tail = out.charCodeAt(out.length - 1);
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
							case OPENPARENTHESES:
								{
									break;
								}
							default:
								{
									padding = ' ';
								}
						}
					}

					switch (code) {
						case AND:
							{
								element = padding + nscopealt;
							}
						case TILDE:
						case GREATERTHAN:
						case PLUS:
						case SPACE:
						case CLOSEPARENTHESES:
						case OPENPARENTHESES:
							{
								break;
							}
						case OPENBRACKET:
							{
								element = padding + element + nscopealt;
								break;
							}
						case COLON:
							{
								switch (element.charCodeAt(1) * 2 + element.charCodeAt(2) * 3) {
									// :global
									case 530:
										{
											if (escape > 0) {
												element = padding + element.substring(8, size - 1);
												break;
											}
										}
									// :hover, :nth-child(), ...
									default:
										{
											if (j < 1 || elements[j - 1].length < 1) {
												element = padding + nscopealt + element;
											}
										}
								}
								break;
							}
						case COMMA:
							{
								padding = '';
							}
						default:
							{
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

			return selector;
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
   * @return {(string|void|*)}
   */
		function proxy(context, content, selectors, parents, line, column, length, id, depth) {
			for (var i = 0, out = content, next; i < plugged; ++i) {
				switch (next = plugins[i].call(stylis, context, out, selectors, parents, line, column, length, id, depth)) {
					case void 0:
					case false:
					case true:
					case null:
						{
							break;
						}
					default:
						{
							out = next;
						}
				}
			}

			switch (out) {
				case void 0:
				case false:
				case true:
				case null:
				case content:
					{
						break;
					}
				default:
					{
						return out;
					}
			}
		}

		/**
   * Minify
   *
   * @param {(string|*)} output
   * @return {string}
   */
		function minify(output) {
			return output.replace(formatptn, '').replace(beforeptn, '').replace(afterptn, '$1').replace(tailptn, '$1').replace(whiteptn, ' ');
		}

		/**
   * Use
   *
   * @param {(Array<function(...?)>|function(...?)|number|void)?} plugin
   */
		function use(plugin) {
			switch (plugin) {
				case void 0:
				case null:
					{
						plugged = plugins.length = 0;
						break;
					}
				default:
					{
						switch (plugin.constructor) {
							case Array:
								{
									for (var i = 0, length = plugin.length; i < length; ++i) {
										use(plugin[i]);
									}
									break;
								}
							case Function:
								{
									plugins[plugged++] = plugin;
									break;
								}
							case Boolean:
								{
									unkwn = !!plugin | 0;
								}
						}
					}
			}

			return use;
		}

		/**
   * Set
   *
   * @param {*} options
   */
		function set$$1(options) {
			for (var name in options) {
				var value = options[name];
				switch (name) {
					case 'keyframe':
						keyed = value | 0;break;
					case 'global':
						escape = value | 0;break;
					case 'cascade':
						cascade = value | 0;break;
					case 'compress':
						compress = value | 0;break;
					case 'semicolon':
						semicolon = value | 0;break;
					case 'preserve':
						preserve = value | 0;break;
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

			return set$$1;
		}

		/**
   * Stylis
   *
   * @param {string} selector
   * @param {string} input
   * @return {*}
   */
		function stylis(selector, input) {
			if (this !== void 0 && this.constructor === stylis) {
				return factory(selector);
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
				result = proxy(PREPS, input, selectors, selectors, line, column, 0, 0, 0);

				if (result !== void 0 && typeof result === 'string') {
					input = result;
				}
			}

			// build
			var output = compile(array, selectors, input, 0, 0);

			// execute plugins, post-process context
			if (plugged > 0) {
				result = proxy(POSTS, output, selectors, selectors, line, column, output.length, 0, 0);

				// bypass minification
				if (result !== void 0 && typeof (output = result) !== 'string') {
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

			return compress * code === 0 ? output : minify(output);
		}

		stylis['use'] = use;
		stylis['set'] = set$$1;

		if (options !== void 0) {
			set$$1(options);
		}

		return stylis;
	});
});

var index$3 = createCommonjsModule(function (module, exports) {
	(function (factory) {
		(typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module['exports'] = factory() : typeof undefined === 'function' && undefined['amd'] ? undefined(factory()) : window['stylisRuleSheet'] = factory();
	})(function () {

		return function (insertRule) {
			var delimiter = '/*|*/';
			var needle = delimiter + '}';

			function toSheet(block) {
				if (block) try {
					insertRule(block + '}');
				} catch (e) {}
			}

			return function ruleSheet(context, content, selectors, parents, line, column, length, at, depth) {
				switch (context) {
					// property
					case 1:
						// @import
						if (depth === 0 && content.charCodeAt(0) === 64) return insertRule(content + ';'), '';
						break;
					// selector
					case 2:
						if (at === 0) return content + delimiter;
						break;
					// at-rule
					case 3:
						switch (at) {
							// @font-face, @page
							case 102:
							case 112:
								return insertRule(selectors[0] + content), '';
							default:
								return content + delimiter;
						}
					case -2:
						content.split(needle).forEach(toSheet);
				}
			};
		};
	});
});

// 
var stylis = new stylis$1({
  global: false,
  cascade: true,
  keyframe: false,
  prefix: true,
  compress: false,
  semicolon: true
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

var parseRulesPlugin = index$3(function (rule) {
  parsingRules.push(rule);
});

stylis.use([parseRulesPlugin, returnRulesPlugin]);

var stringifyRules = function stringifyRules(rules, selector, prefix) {
  var flatCSS = rules.join('').replace(/^\s*\/\/.*$/gm, ''); // replace JS comments

  var cssStr = selector && prefix ? prefix + ' ' + selector + ' { ' + flatCSS + ' }' : flatCSS;

  return stylis(prefix || !selector ? '' : selector, cssStr);
};

// 

function isStyledComponent(target) /* : %checks */{
  return typeof target === 'function' && typeof target.styledComponentId === 'string';
}

// 
/**
 * When using streaming rendering, style blocks are emitted in chunks directly
 * next to the HTML they reference. In order to prevent errors during rehydration
 * (since React doesn't know about the style blocks we are interleaving) this
 * method relocates all styled-component blocks to the end of `<head>`.
 *
 * NOTE: this method MUST be called before ReactDOM.hydrate().
 */
function consolidateStreamedStyles() {
  var blocks = Array.from(document.querySelectorAll('style[data-styled-components]'));

  if (blocks.length) {
    var frag = document.createDocumentFragment();

    for (var i = 0, len = blocks.length; i < len; i += 1) {
      // $FlowFixMe
      frag.appendChild(blocks[i].parentNode.removeChild(blocks[i]));
    }

    // $FlowFixMe
    document.head.appendChild(frag);
  }
}

// 
var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
var charsLength = chars.length;

/* Some high number, usually 9-digit base-10. Map it to base-😎 */
var generateAlphabeticName = function generateAlphabeticName(code) {
  var name = '';
  var x = void 0;

  for (x = code; x > charsLength; x = Math.floor(x / charsLength)) {
    name = chars[x % charsLength] + name;
  }

  return chars[x % charsLength] + name;
};

// 

var interleave = (function (strings, interpolations) {
  return interpolations.reduce(function (array, interp, i) {
    return array.concat(interp, strings[i + 1]);
  }, [strings[0]]);
});

// 
var css = (function (strings) {
  for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    interpolations[_key - 1] = arguments[_key];
  }

  return flatten(interleave(strings, interpolations));
});

// 
var SC_COMPONENT_ID = /^[^\S\n]*?\/\* sc-component-id:\s*(\S+)\s+\*\//gm;

var extractCompsFromCSS = (function (maybeCSS) {
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

// 
/* eslint-disable camelcase, no-undef */

var getNonce = (function () {
  return typeof __webpack_nonce__ !== 'undefined' ? __webpack_nonce__ : null;
});

// 
/* eslint-disable no-underscore-dangle */
/*
 * Browser Style Sheet with Rehydration
 *
 * <style data-styled-components="x y z"
 *        data-styled-components-is-local="true">
 *   /· sc-component-id: a ·/
 *   .sc-a { ... }
 *   .x { ... }
 *   /· sc-component-id: b ·/
 *   .sc-b { ... }
 *   .y { ... }
 *   .z { ... }
 * </style>
 *
 * Note: replace · with * in the above snippet.
 * */
var DISABLE_SPEEDY = typeof false === 'boolean' && false || "development" !== 'production';

var COMPONENTS_PER_TAG = 40;
var SPEEDY_COMPONENTS_PER_TAG = 1000; // insertRule allows more injections before a perf slowdown

// Source: https://github.com/threepointone/glamor/blob/master/src/sheet.js#L32-L43
var sheetForTag = function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  }

  for (var i = 0; i < document.styleSheets.length; i += 1) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }

  // NOTE: This should never happen
  throw new Error('');
};

// Safely (try/catch) injects rule at index and returns whether it was successful
var safeInsertRule = function safeInsertRule(sheet, cssRule, index) {
  if (cssRule === undefined || cssRule.length === 0) {
    return false;
  }

  var maxIndex = sheet.cssRules.length;
  var cappedIndex = index <= maxIndex ? index : maxIndex;

  try {
    sheet.insertRule(cssRule, cappedIndex);
  } catch (err) {
    // NOTE: An invalid rule here means it's not supported by the browser or obviously malformed
    return false;
  }

  return true;
};

// Counts up the number of rules inside the array until a specific component entry is found
// This is used to determine the necessary insertRule index
var sizeUpToComponentIndex = function sizeUpToComponentIndex(componentSizes, componentIndex) {
  var cssRulesSize = 0;
  for (var i = 0; i <= componentIndex; i += 1) {
    cssRulesSize += componentSizes[i];
  }

  return cssRulesSize;
};

var BaseBrowserTag = function () {
  function BaseBrowserTag() {
    classCallCheck(this, BaseBrowserTag);
  }

  BaseBrowserTag.prototype.toReactElement = function toReactElement() {
    throw new Error("BrowserTag doesn't implement toReactElement!");
  };

  BaseBrowserTag.prototype.clone = function clone() {
    throw new Error('BrowserTag cannot be cloned!');
  };

  BaseBrowserTag.prototype.getComponentIds = function getComponentIds() {
    return Object.keys(this.components);
  };

  return BaseBrowserTag;
}();

var BrowserTag = void 0;
if (!DISABLE_SPEEDY) {
  BrowserTag = function (_BaseBrowserTag) {
    inherits(SpeedyBrowserTag, _BaseBrowserTag);

    // Store component ruleSizes in an array per component (in order)


    function SpeedyBrowserTag(el, isLocal, existingSource) {
      classCallCheck(this, SpeedyBrowserTag);

      var _this = possibleConstructorReturn(this, _BaseBrowserTag.call(this));

      var nonce = getNonce();
      if (nonce) {
        el.setAttribute('nonce', nonce);
      }

      var extractedComps = extractCompsFromCSS(existingSource);

      _this.el = el;
      _this.isLocal = isLocal;
      _this.ready = false;
      _this.componentSizes = [];
      _this.size = extractedComps.length;
      _this.components = extractedComps.reduce(function (acc, obj) {
        acc[obj.componentId] = obj; // eslint-disable-line no-param-reassign
        return acc;
      }, {});
      return _this;
    }

    /* Because we care about source order, before we can inject anything we need to
     * create a text node for each component and replace the existing CSS. */


    SpeedyBrowserTag.prototype.replaceElement = function replaceElement() {
      var _this2 = this;

      // Build up our replacement style tag
      var newEl = this.el.cloneNode(false);

      if (!this.el.parentNode) {
        throw new Error("Trying to replace an element that wasn't mounted!");
      }

      // workaround for an IE/Edge bug: https://twitter.com/probablyup/status/958138927981977600
      newEl.appendChild(document.createTextNode(''));

      // $FlowFixMe
      this.el.parentNode.replaceChild(newEl, this.el);
      this.el = newEl;
      this.ready = true;

      // Retrieve the sheet for the new style tag
      var sheet = sheetForTag(newEl);

      Object.keys(this.components).forEach(function (componentId) {
        var comp = _this2.components[componentId];
        var cssFromDOM = comp.cssFromDOM;

        var rules = stringifyRules([cssFromDOM]);
        var rulesSize = rules.length;

        var injectedRules = 0;
        for (var j = 0; j < rulesSize; j += 1) {
          if (safeInsertRule(sheet, rules[j], sheet.cssRules.length)) {
            injectedRules += 1;
          }
        }

        comp.componentIndex = _this2.componentSizes.length;
        comp.css = rules.join(' ');
        _this2.componentSizes.push(injectedRules);
      });
    };

    SpeedyBrowserTag.prototype.isSealed = function isSealed() {
      return this.size >= SPEEDY_COMPONENTS_PER_TAG;
    };

    SpeedyBrowserTag.prototype.addComponent = function addComponent(componentId) {
      if (!this.ready) this.replaceElement();

      if ("development" !== 'production' && this.components[componentId]) {
        throw new Error('Trying to add Component \'' + componentId + '\' twice!');
      }

      this.components[componentId] = {
        componentIndex: this.componentSizes.length,
        css: ''
      };

      this.componentSizes.push(0);
      this.size += 1;
    };

    SpeedyBrowserTag.prototype.inject = function inject(componentId, cssRules, name) {
      if (!this.ready) this.replaceElement();

      var comp = this.components[componentId];
      if ("development" !== 'production' && !comp) {
        throw new Error('Must add a new component before you can inject css into it');
      }

      var cssRulesSize = cssRules.length;
      var sheet = sheetForTag(this.el);
      var componentIndex = comp.componentIndex;

      // Determine start index for injection

      var insertIndex = sizeUpToComponentIndex(this.componentSizes, componentIndex);

      // Inject each rule shifting index forward for each one (in-order injection)
      var injectedRules = 0;
      for (var i = 0; i < cssRulesSize; i += 1) {
        var cssRule = cssRules[i];
        if (safeInsertRule(sheet, cssRule, insertIndex + injectedRules)) {
          comp.css += ' ' + cssRule;
          injectedRules += 1;
        }
      }

      // Update number of rules for component
      this.componentSizes[componentIndex] += injectedRules;

      if (name !== undefined && name !== null) {
        var existingNames = this.el.getAttribute(SC_ATTR);
        this.el.setAttribute(SC_ATTR, existingNames ? existingNames + ' ' + name : name);
      }
    };

    SpeedyBrowserTag.prototype.toRawCSS = function toRawCSS() {
      return ''; // NOTE: Unsupported in production mode (SpeedyBrowserTag)
    };

    SpeedyBrowserTag.prototype.toHTML = function toHTML() {
      return ''; // NOTE: Unsupported in production mode (SpeedyBrowserTag)
    };

    return SpeedyBrowserTag;
  }(BaseBrowserTag);
} else {
  BrowserTag = function (_BaseBrowserTag2) {
    inherits(TextNodeBrowserTag, _BaseBrowserTag2);

    function TextNodeBrowserTag(el, isLocal) {
      var existingSource = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      classCallCheck(this, TextNodeBrowserTag);

      var _this3 = possibleConstructorReturn(this, _BaseBrowserTag2.call(this));

      var nonce = getNonce();
      if (nonce !== null) {
        el.setAttribute('nonce', nonce);
      }

      var extractedComps = extractCompsFromCSS(existingSource);

      _this3.el = el;
      _this3.isLocal = isLocal;
      _this3.ready = false;
      _this3.size = extractedComps.length;
      _this3.components = extractedComps.reduce(function (acc, obj) {
        acc[obj.componentId] = obj; // eslint-disable-line no-param-reassign
        return acc;
      }, {});
      return _this3;
    }

    TextNodeBrowserTag.prototype.isSealed = function isSealed() {
      return this.size >= COMPONENTS_PER_TAG;
    };

    TextNodeBrowserTag.prototype.addComponent = function addComponent(componentId) {
      if (!this.ready) this.replaceElement();
      if ("development" !== 'production' && this.components[componentId]) {
        throw new Error('Trying to add Component \'' + componentId + '\' twice!');
      }

      var comp = { componentId: componentId, textNode: document.createTextNode('') };
      this.el.appendChild(comp.textNode);
      this.size += 1;
      this.components[componentId] = comp;
    };

    TextNodeBrowserTag.prototype.inject = function inject(componentId, css, name) {
      if (!this.ready) this.replaceElement();
      var comp = this.components[componentId];

      if ("development" !== 'production' && !comp) {
        throw new Error('Must add a new component before you can inject css into it');
      }

      if (comp.textNode.data === '') {
        comp.textNode.appendData('\n/* sc-component-id: ' + componentId + ' */\n');
      }

      comp.textNode.appendData(css.join(' '));

      if (name !== undefined && name !== null) {
        var existingNames = this.el.getAttribute(SC_ATTR);
        this.el.setAttribute(SC_ATTR, existingNames ? existingNames + ' ' + name : name);
      }
    };

    TextNodeBrowserTag.prototype.toHTML = function toHTML() {
      return this.el.outerHTML;
    };

    TextNodeBrowserTag.prototype.toReactElement = function toReactElement() {
      throw new Error("BrowserTag doesn't implement toReactElement!");
    };

    TextNodeBrowserTag.prototype.clone = function clone() {
      throw new Error('BrowserTag cannot be cloned!');
    };

    /* Because we care about source order, before we can inject anything we need to
     * create a text node for each component and replace the existing CSS. */


    TextNodeBrowserTag.prototype.replaceElement = function replaceElement() {
      var _this4 = this;

      this.ready = true;
      // We have nothing to inject. Use the current el.
      if (this.size === 0) return;

      // Build up our replacement style tag
      var newEl = this.el.cloneNode(false);
      newEl.appendChild(document.createTextNode('\n'));

      Object.keys(this.components).forEach(function (key) {
        var comp = _this4.components[key];

        // eslint-disable-next-line no-param-reassign
        comp.textNode = document.createTextNode(comp.cssFromDOM);
        newEl.appendChild(comp.textNode);
      });

      if (!this.el.parentNode) {
        throw new Error("Trying to replace an element that wasn't mounted!");
      }

      // The ol' switcheroo
      this.el.parentNode.replaceChild(newEl, this.el);
      this.el = newEl;
    };

    return TextNodeBrowserTag;
  }(BaseBrowserTag);
}

/* Factory function to separate DOM operations from logical ones*/
var BrowserStyleSheet = {
  create: function create() {
    var tags = [];
    var names = {};

    /* Construct existing state from DOM */
    var nodes = document.querySelectorAll('[' + SC_ATTR + ']');
    var nodesLength = nodes.length;

    for (var i = 0; i < nodesLength; i += 1) {
      // $FlowFixMe: We can trust that all elements in this query are style elements
      var el = nodes[i];
      var attr = el.getAttribute(SC_ATTR);

      if (attr) {
        attr.trim().split(/\s+/).forEach(function (name) {
          names[name] = true;
        });
      }

      tags.push(new BrowserTag(el, el.getAttribute(LOCAL_ATTR) === 'true', el.textContent));
    }

    /* Factory for making more tags */
    var tagConstructor = function tagConstructor(isLocal) {
      var el = document.createElement('style');
      el.type = 'text/css';
      el.setAttribute(SC_ATTR, '');
      el.setAttribute(LOCAL_ATTR, isLocal ? 'true' : 'false');
      if (!document.head) {
        throw new Error('Missing document <head>');
      }
      document.head.appendChild(el);
      return new BrowserTag(el, isLocal);
    };

    return new StyleSheet(tagConstructor, tags, names);
  }
};

// 
var SC_ATTR = 'data-styled-components';
var LOCAL_ATTR = 'data-styled-components-is-local';
var CONTEXT_KEY = '__styled-components-stylesheet__';

/* eslint-disable flowtype/object-type-delimiter */
/* eslint-enable flowtype/object-type-delimiter */

var instance = null;
// eslint-disable-next-line no-use-before-define
var clones = [];

var IS_BROWSER = typeof document !== 'undefined';

var StyleSheet = function () {
  function StyleSheet(tagConstructor) {
    var tags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var names = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, StyleSheet);
    this.hashes = {};
    this.deferredInjections = {};
    this.stylesCacheable = IS_BROWSER;

    this.tagConstructor = tagConstructor;
    this.tags = tags;
    this.names = names;
    this.constructComponentTagMap();
    this.isStreaming = false;
  }

  // helper for `ComponentStyle` to know when it cache static styles.
  // staticly styled-component can not safely cache styles on the server
  // without all `ComponentStyle` instances saving a reference to the
  // the styleSheet instance they last rendered with,
  // or listening to creation / reset events. otherwise you might create
  // a component with one stylesheet and render it another api response
  // with another, losing styles on from your server-side render.


  StyleSheet.prototype.constructComponentTagMap = function constructComponentTagMap() {
    var _this = this;

    this.componentTags = {};

    this.tags.forEach(function (tag) {
      tag.getComponentIds().forEach(function (componentId) {
        _this.componentTags[componentId] = tag;
      });
    });
  };

  /* Best level of caching—get the name from the hash straight away. */


  StyleSheet.prototype.getName = function getName(hash) {
    return this.hashes[hash.toString()];
  };

  /* Second level of caching—if the name is already in the dom, don't
   * inject anything and record the hash for getName next time. */


  StyleSheet.prototype.alreadyInjected = function alreadyInjected(hash, name) {
    if (!this.names[name]) return false;

    this.hashes[hash.toString()] = name;
    return true;
  };

  /* Third type of caching—don't inject components' componentId twice. */


  StyleSheet.prototype.hasInjectedComponent = function hasInjectedComponent(componentId) {
    return !!this.componentTags[componentId];
  };

  StyleSheet.prototype.deferredInject = function deferredInject(componentId, isLocal, css) {
    if (this === instance) {
      clones.forEach(function (clone) {
        clone.deferredInject(componentId, isLocal, css);
      });
    }

    this.getOrCreateTag(componentId, isLocal);
    this.deferredInjections[componentId] = css;
  };

  StyleSheet.prototype.inject = function inject(componentId, isLocal, css, hash, name) {
    if (this === instance) {
      clones.forEach(function (clone) {
        clone.inject(componentId, isLocal, css);
      });
    }

    var tag = this.getOrCreateTag(componentId, isLocal);

    var deferredInjection = this.deferredInjections[componentId];
    if (deferredInjection) {
      tag.inject(componentId, deferredInjection);
      delete this.deferredInjections[componentId];
    }

    tag.inject(componentId, css, name);

    if (hash && name) {
      this.hashes[hash.toString()] = name;
    }
  };

  StyleSheet.prototype.toHTML = function toHTML() {
    return this.tags.map(function (tag) {
      return tag.toHTML();
    }).join('');
  };

  StyleSheet.prototype.toReactElements = function toReactElements() {
    return this.tags.map(function (tag, i) {
      return tag.toReactElement('sc-' + i);
    });
  };

  StyleSheet.prototype.getOrCreateTag = function getOrCreateTag(componentId, isLocal) {
    var existingTag = this.componentTags[componentId];

    /**
     * in a streaming context, once a tag is sealed it can never be added to again
     * or those styles will never make it to the client
     */
    if (existingTag && this.isStreaming ? !existingTag.isSealed() : existingTag) {
      return existingTag;
    }

    var lastTag = this.tags[this.tags.length - 1];
    var componentTag = !lastTag || lastTag.isSealed() || lastTag.isLocal !== isLocal ? this.createNewTag(isLocal) : lastTag;
    this.componentTags[componentId] = componentTag;
    componentTag.addComponent(componentId);
    return componentTag;
  };

  StyleSheet.prototype.createNewTag = function createNewTag(isLocal) {
    var newTag = this.tagConstructor(isLocal);
    this.tags.push(newTag);
    return newTag;
  };

  StyleSheet.reset = function reset(isServer) {
    instance = StyleSheet.create(isServer);
  };

  /* We can make isServer totally implicit once Jest 20 drops and we
   * can change environment on a per-test basis. */


  StyleSheet.create = function create() {
    var isServer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !IS_BROWSER;

    return (isServer ? ServerStyleSheet : BrowserStyleSheet).create();
  };

  StyleSheet.clone = function clone(oldSheet) {
    var newSheet = new StyleSheet(oldSheet.tagConstructor, oldSheet.tags.map(function (tag) {
      return tag.clone();
    }), _extends({}, oldSheet.names));

    newSheet.hashes = _extends({}, oldSheet.hashes);
    newSheet.deferredInjections = _extends({}, oldSheet.deferredInjections);
    clones.push(newSheet);

    return newSheet;
  };

  createClass(StyleSheet, null, [{
    key: 'instance',
    get: function get$$1() {
      return instance || (instance = StyleSheet.create());
    }
  }]);
  return StyleSheet;
}();

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction$1 = function emptyFunction() {};

emptyFunction$1.thatReturns = makeEmptyFunction;
emptyFunction$1.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction$1.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction$1.thatReturnsNull = makeEmptyFunction(null);
emptyFunction$1.thatReturnsThis = function () {
  return this;
};
emptyFunction$1.thatReturnsArgument = function (arg) {
  return arg;
};

var emptyFunction_1 = emptyFunction$1;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

{
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant$1(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

var invariant_1 = invariant$1;

var emptyFunction$2 = emptyFunction_1;

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning$1 = emptyFunction$2;

{
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
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

  warning$1 = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var warning_1 = warning$1;

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
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
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
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
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var index$5 = shouldUseNative() ? Object.assign : function (target, source) {
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

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
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

var ReactPropTypesSecret$1 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;

{
  var invariant$2 = invariant_1;
  var warning$2 = warning_1;
  var ReactPropTypesSecret$2 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
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
function checkPropTypes$1(typeSpecs, values, location, componentName, getStack) {
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
          invariant$2(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, _typeof(typeSpecs[typeSpecName]));
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$2);
        } catch (ex) {
          error = ex;
        }
        warning$2(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error === 'undefined' ? 'undefined' : _typeof(error));
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning$2(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

var checkPropTypes_1 = checkPropTypes$1;

var emptyFunction = emptyFunction_1;
var invariant = invariant_1;
var warning = warning_1;
var assign = index$5;

var ReactPropTypesSecret = ReactPropTypesSecret_1;
var checkPropTypes = checkPropTypes_1;

var factoryWithTypeCheckers = function factoryWithTypeCheckers(isValidElement, throwOnDirectAccess) {
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
    exact: createStrictShapeTypeChecker
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

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
        } else if ("development" !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (!manualPropTypeCallCache[cacheKey] &&
          // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            warning(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName);
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
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
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
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
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
      warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.');
      return emptyFunction.thatReturnsNull;
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
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
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
      warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.');
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(false, 'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received %s at index %s.', getPostfixForTypeWarning(checker), i);
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
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
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
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
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) {
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
    var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
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

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var index$4 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

    var isValidElement = function isValidElement(object) {
      return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    };

    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true;
    module.exports = factoryWithTypeCheckers(isValidElement, throwOnDirectAccess);
  }
});

var _StyleSheetManager$ch;

// 
var StyleSheetManager = function (_Component) {
  inherits(StyleSheetManager, _Component);

  function StyleSheetManager() {
    classCallCheck(this, StyleSheetManager);
    return possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  StyleSheetManager.prototype.getChildContext = function getChildContext() {
    var _ref;

    return _ref = {}, _ref[CONTEXT_KEY] = this.props.sheet, _ref;
  };

  StyleSheetManager.prototype.render = function render() {
    /* eslint-disable react/prop-types */
    // Flow v0.43.1 will report an error accessing the `children` property,
    // but v0.47.0 will not. It is necessary to use a type cast instead of
    // a "fixme" comment to satisfy both Flow versions.
    return React__default.Children.only(this.props.children);
  };

  return StyleSheetManager;
}(React.Component);

StyleSheetManager.childContextTypes = (_StyleSheetManager$ch = {}, _StyleSheetManager$ch[CONTEXT_KEY] = index$4.oneOfType([index$4.instanceOf(StyleSheet), index$4.instanceOf(ServerStyleSheet)]).isRequired, _StyleSheetManager$ch);

StyleSheetManager.propTypes = {
  sheet: index$4.oneOfType([index$4.instanceOf(StyleSheet), index$4.instanceOf(ServerStyleSheet)]).isRequired
};

// 
/* eslint-disable no-underscore-dangle */
var ServerTag = function () {
  function ServerTag(isLocal) {
    classCallCheck(this, ServerTag);

    this.emitted = false;
    this.isLocal = isLocal;
    this.isProduction = "development" === 'production';
    this.components = {};
    this.size = 0;
    this.names = [];
  }

  ServerTag.prototype.isSealed = function isSealed() {
    return this.emitted;
  };

  ServerTag.prototype.getComponentIds = function getComponentIds() {
    return Object.keys(this.components);
  };

  ServerTag.prototype.addComponent = function addComponent(componentId) {
    if (this.components[componentId]) {
      throw new Error('Trying to add Component \'' + componentId + '\' twice!');
    }
    this.components[componentId] = { componentId: componentId, css: '' };
    this.size += 1;
  };

  ServerTag.prototype.concatenateCSS = function concatenateCSS() {
    var _this = this;

    return Object.keys(this.components).reduce(function (styles, k) {
      return styles + _this.components[k].css;
    }, '');
  };

  ServerTag.prototype.inject = function inject(componentId, css, name) {
    var comp = this.components[componentId];

    if (!comp) {
      throw new Error('Must add a new component before you can inject css into it');
    }

    if (comp.css === '') {
      comp.css = '/* sc-component-id: ' + componentId + ' */\n';
    }

    var cssRulesSize = css.length;
    for (var i = 0; i < cssRulesSize; i += 1) {
      var cssRule = css[i];
      comp.css += (cssRule + '\n').replace(/\n*$/, '\n');
    }

    if (name) this.names.push(name);
  };

  ServerTag.prototype.toHTML = function toHTML() {
    var attrs = ['type="text/css"', SC_ATTR + '="' + this.names.join(' ') + '"', LOCAL_ATTR + '="' + (this.isLocal ? 'true' : 'false') + '"'];

    var nonce = getNonce();
    if (nonce) {
      attrs.push('nonce="' + nonce + '"');
    }

    this.emitted = true;
    return '<style ' + attrs.join(' ') + '>' + this.concatenateCSS() + '</style>';
  };

  ServerTag.prototype.toReactElement = function toReactElement(key) {
    var _attrs;

    var attrs = (_attrs = {}, _attrs[SC_ATTR] = this.names.join(' '), _attrs[LOCAL_ATTR] = this.isLocal.toString(), _attrs);

    var nonce = getNonce();
    if (nonce) {
      attrs.nonce = nonce;
    }

    this.emitted = true;

    return React__default.createElement('style', _extends({
      key: key,
      type: 'text/css'
    }, attrs, {
      dangerouslySetInnerHTML: { __html: this.concatenateCSS() }
    }));
  };

  ServerTag.prototype.clone = function clone() {
    var _this2 = this;

    var copy = new ServerTag(this.isLocal);
    copy.names = [].concat(this.names);
    copy.size = this.size;
    copy.components = Object.keys(this.components).reduce(function (acc, key) {
      acc[key] = _extends({}, _this2.components[key]); // eslint-disable-line no-param-reassign
      return acc;
    }, {});

    return copy;
  };

  return ServerTag;
}();

var ServerStyleSheet = function () {
  function ServerStyleSheet() {
    classCallCheck(this, ServerStyleSheet);

    this.instance = StyleSheet.clone(StyleSheet.instance);
    this.instance.isStreaming = false;
  }

  ServerStyleSheet.prototype.collectStyles = function collectStyles(children) {
    if (this.closed) {
      throw new Error("Can't collect styles once you've called getStyleTags!");
    }
    return React__default.createElement(
      StyleSheetManager,
      { sheet: this.instance },
      children
    );
  };

  ServerStyleSheet.prototype.close = function close() {
    clones.splice(clones.indexOf(this.instance), 1);
    this.closed = true;
  };

  ServerStyleSheet.prototype.getStyleTags = function getStyleTags() {
    if (!this.closed) {
      this.close();
    }

    return this.instance.toHTML();
  };

  ServerStyleSheet.prototype.getStyleElement = function getStyleElement() {
    if (!this.closed) {
      this.close();
    }

    return this.instance.toReactElements();
  };

  ServerStyleSheet.prototype.interleaveWithNodeStream = function interleaveWithNodeStream(readableStream) {
    {
      throw new Error('streaming only works in Node.js, please do not try to call this method in the browser');
    }
  };

  ServerStyleSheet.create = function create() {
    return new StyleSheet(function (isLocal) {
      return new ServerTag(isLocal);
    });
  };

  return ServerStyleSheet;
}();

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
/* eslint-disable max-len */
/**
 * Trying to avoid the unknown-prop errors on styled components by filtering by
 * React's attribute whitelist.
 *
 * To regenerate this regex:
 *
 * 1. `npm i -g regexgen` (https://github.com/devongovett/regexgen)
 * 2. Run `regexgen` with the list of space-separated words below as input
 * 3. Surround the emitted regex with this: `/^(GENERATED_REGEX)$/` -- this will ensure a full string match
 *    and no false positives from partials
 **/
/*
children dangerouslySetInnerHTML key ref autoFocus defaultValue valueLink defaultChecked checkedLink innerHTML suppressContentEditableWarning onFocusIn onFocusOut className onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onReset onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onAnimationStart onAnimationEnd onAnimationIteration onTransitionEnd onCopyCapture onCutCapture onPasteCapture onCompositionEndCapture onCompositionStartCapture onCompositionUpdateCapture onKeyDownCapture onKeyPressCapture onKeyUpCapture onFocusCapture onBlurCapture onChangeCapture onInputCapture onSubmitCapture onResetCapture onClickCapture onContextMenuCapture onDoubleClickCapture onDragCapture onDragEndCapture onDragEnterCapture onDragExitCapture onDragLeaveCapture onDragOverCapture onDragStartCapture onDropCapture onMouseDownCapture onMouseEnterCapture onMouseLeaveCapture onMouseMoveCapture onMouseOutCapture onMouseOverCapture onMouseUpCapture onSelectCapture onTouchCancelCapture onTouchEndCapture onTouchMoveCapture onTouchStartCapture onScrollCapture onWheelCapture onAbortCapture onCanPlayCapture onCanPlayThroughCapture onDurationChangeCapture onEmptiedCapture onEncryptedCapture onEndedCapture onErrorCapture onLoadedDataCapture onLoadedMetadataCapture onLoadStartCapture onPauseCapture onPlayCapture onPlayingCapture onProgressCapture onRateChangeCapture onSeekedCapture onSeekingCapture onStalledCapture onSuspendCapture onTimeUpdateCapture onVolumeChangeCapture onWaitingCapture onLoadCapture onAnimationStartCapture onAnimationEndCapture onAnimationIterationCapture onTransitionEndCapture accept acceptCharset accessKey action allowFullScreen allowTransparency alt as async autoComplete autoPlay capture cellPadding cellSpacing charSet challenge checked cite classID className cols colSpan content contentEditable contextMenu controls coords crossOrigin data dateTime default defer dir disabled download draggable encType form formAction formEncType formMethod formNoValidate formTarget frameBorder headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode integrity is keyParams keyType kind label lang list loop low manifest marginHeight marginWidth max maxLength media mediaGroup method min minLength multiple muted name nonce noValidate open optimum pattern placeholder playsInline poster preload profile radioGroup readOnly referrerPolicy rel required reversed role rows rowSpan sandbox scope scoped scrolling seamless selected shape size sizes span spellCheck src srcDoc srcLang srcSet start step style summary tabIndex target title type useMap value width wmode wrap about datatype inlist prefix property resource typeof vocab autoCapitalize autoCorrect autoSave color itemProp itemScope itemType itemID itemRef results security unselectable accentHeight accumulate additive alignmentBaseline allowReorder alphabetic amplitude arabicForm ascent attributeName attributeType autoReverse azimuth baseFrequency baseProfile baselineShift bbox begin bias by calcMode capHeight clip clipPath clipRule clipPathUnits colorInterpolation colorInterpolationFilters colorProfile colorRendering contentScriptType contentStyleType cursor cx cy d decelerate descent diffuseConstant direction display divisor dominantBaseline dur dx dy edgeMode elevation enableBackground end exponent externalResourcesRequired fill fillOpacity fillRule filter filterRes filterUnits floodColor floodOpacity focusable fontFamily fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontWeight format from fx fy g1 g2 glyphName glyphOrientationHorizontal glyphOrientationVertical glyphRef gradientTransform gradientUnits hanging horizAdvX horizOriginX ideographic imageRendering in in2 intercept k k1 k2 k3 k4 kernelMatrix kernelUnitLength kerning keyPoints keySplines keyTimes lengthAdjust letterSpacing lightingColor limitingConeAngle local markerEnd markerMid markerStart markerHeight markerUnits markerWidth mask maskContentUnits maskUnits mathematical mode numOctaves offset opacity operator order orient orientation origin overflow overlinePosition overlineThickness paintOrder panose1 pathLength patternContentUnits patternTransform patternUnits pointerEvents points pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits r radius refX refY renderingIntent repeatCount repeatDur requiredExtensions requiredFeatures restart result rotate rx ry scale seed shapeRendering slope spacing specularConstant specularExponent speed spreadMethod startOffset stdDeviation stemh stemv stitchTiles stopColor stopOpacity strikethroughPosition strikethroughThickness string stroke strokeDasharray strokeDashoffset strokeLinecap strokeLinejoin strokeMiterlimit strokeOpacity strokeWidth surfaceScale systemLanguage tableValues targetX targetY textAnchor textDecoration textRendering textLength to transform u1 u2 underlinePosition underlineThickness unicode unicodeBidi unicodeRange unitsPerEm vAlphabetic vHanging vIdeographic vMathematical values vectorEffect version vertAdvY vertOriginX vertOriginY viewBox viewTarget visibility widths wordSpacing writingMode x xHeight x1 x2 xChannelSelector xlinkActuate xlinkArcrole xlinkHref xlinkRole xlinkShow xlinkTitle xlinkType xmlBase xmlns xmlnsXlink xmlLang xmlSpace y y1 y2 yChannelSelector z zoomAndPan
*/
/* eslint-enable max-len */

var ATTRIBUTE_REGEX = /^((?:s(?:uppressContentEditableWarn|croll|pac)|(?:shape|image|text)Render|(?:letter|word)Spac|vHang|hang)ing|(?:on(?:AnimationIteration|C(?:o(?:mposition(?:Update|Start|End)|ntextMenu|py)|anPlayThrough|anPlay|hange|lick|ut)|(?:(?:Duration|Volume|Rate)Chang|(?:MouseLea|(?:Touch|Mouse)Mo|DragLea)v|Paus)e|Loaded(?:Metad|D)ata|(?:Animation|Touch|Load|Drag)Start|(?:(?:T(?:ransition|ouch)|Animation)E|Suspe)nd|DoubleClick|(?:TouchCanc|Whe)el|(?:Mouse(?:Ent|Ov)e|Drag(?:Ent|Ov)e|Erro)r|TimeUpdate|(?:E(?:n(?:crypt|d)|mpti)|S(?:tall|eek))ed|MouseDown|P(?:rogress|laying)|(?:MouseOu|DragExi|S(?:elec|ubmi)|Rese|Inpu)t|KeyPress|DragEnd|Key(?:Down|Up)|(?:Wait|Seek)ing|(?:MouseU|Dro)p|Scroll|Paste|Focus|Abort|Drag|Play|Load|Blur)Captur|alignmentBaselin|(?:limitingConeAng|xlink(?:(?:Arcr|R)o|Tit)|s(?:urfaceSca|ty|ca)|unselectab|baseProfi|fontSty|(?:focus|dragg)ab|multip|profi|tit)l|d(?:ominantBaselin|efaultValu)|a(?:uto(?:Capitaliz|Revers|Sav)|dditiv)|(?:(?:formNoValid|xlinkActu|noValid|accumul|rot)a|autoComple|decelera)t|(?:(?:attribute|item)T|datat)yp|(?:attribute|glyph)Nam|playsInlin|(?:formE|e)ncTyp|(?:writing|input|edge)Mod|(?:xlinkTy|itemSco|keyTy|slo)p|(?:amplitu|mo)d|(?:xmlSpa|non)c|fillRul|(?:dateTi|na)m|r(?:esourc|ol)|xmlBas|wmod)e|(?:glyphOrientationHorizont|loc)al|(?:externalResourcesRequir|select|revers|mut)ed|c(?:o(?:lorInterpolationFilter|ntrol|ord)s|o(?:lor(?:Interpolation)?|ntent)|(?:ontentS(?:cript|tyle)Typ|o(?:ntentEditab|lorProfi)l|l(?:assNam|ipRul)|a(?:lcMod|ptur)|it)e|olorRendering|l(?:ipPathUnits|assID)|o(?:ntextMenu|ls)|h(?:eckedLink|a(?:llenge|rSet)|ildren|ecked)|ell(?:Spac|Padd)ing|(?:rossOrigi|olSpa)n|apHeight|lip(?:Path)?|ursor|[xy])|glyphOrientationVertical|d(?:angerouslySetInnerHTML|efaultChecked|ownload|isabled|isplay|[xy])|(?:s(?:trikethroughThickn|eaml)es|(?:und|ov)erlineThicknes|r(?:equiredExtension|adiu)|(?:requiredFeatur|tableValu|stitchTil|numOctav|filterR)e|key(?:(?:Splin|Tim)e|Param)|autoFocu|header|bia)s|(?:(?:st(?:rikethroughPosi|dDevia)|(?:und|ov)erlinePosi|(?:textDecor|elev)a|orienta)tio|(?:strokeLinejo|orig)i|formActio|zoomAndPa|onFocusI|directio|(?:vers|act)io|rowSpa|begi|ico)n|o(?:n(?:AnimationIteration|C(?:o(?:mposition(?:Update|Start|End)|ntextMenu|py)|anPlayThrough|anPlay|hange|lick|ut)|(?:(?:Duration|Volume|Rate)Chang|(?:MouseLea|(?:Touch|Mouse)Mo|DragLea)v|Paus)e|Loaded(?:Metad|D)ata|(?:Animation|Touch|Load|Drag)Start|(?:(?:T(?:ransition|ouch)|Animation)E|Suspe)nd|DoubleClick|(?:TouchCanc|Whe)el|(?:Mouse(?:Ent|Ov)e|Drag(?:Ent|Ov)e|Erro)r|TimeUpdate|(?:E(?:n(?:crypt|d)|mpti)|S(?:tall|eek))ed|MouseDown|P(?:rogress|laying)|(?:MouseOu|DragExi|S(?:elec|ubmi)|Rese|Inpu)t|KeyPress|DragEnd|Key(?:Down|Up)|(?:Wait|Seek)ing|(?:MouseU|Dro)p|Scroll|Paste|Focus|Abort|Drag|Play|Load|Blur)|rient)|p(?:reserveA(?:spectRatio|lpha)|ointsAt[X-Z]|anose1)|(?:patternContent|ma(?:sk(?:Content)?|rker)|primitive|gradient|pattern|filter)Units|(?:gradientT|patternT|t)ransform|(?:(?:allowTranspar|baseFrequ)enc|re(?:ferrerPolic|adOnl)|(?:(?:st(?:roke|op)O|floodO|fillO|o)pac|integr|secur)it|visibilit|fontFamil|accessKe|propert|summar)y|(?:strokeMiterlimi|(?:specularConsta|repeatCou|fontVaria)n|(?:(?:specularE|e)xpon|renderingInt|asc)en|d(?:iffuseConsta|esce)n|(?:fontSizeAdju|lengthAdju|manife)s|baselineShif|vectorEffec|(?:(?:mar(?:ker|gin)|x)H|accentH|fontW)eigh|a(?:utoCorrec|bou)|markerStar|onFocusOu|in(?:tercep|lis)|restar|forma|heigh|lis)t|(?:(?:st(?:rokeDasho|artO)|o)ffs|acceptChars|formTarg|viewTarg|srcS)et|(?:(?:enableBackgrou|markerE)n|s(?:p(?:readMetho|ee)|ee)|formMetho|m(?:arkerMi|etho)|preloa|kin)d|k(?:ernel(?:UnitLength|Matrix)|[1-4])|(?:[xy]ChannelSelect|lightingCol|textAnch|floodCol|stopCol|operat|htmlF)or|(?:allowFullScre|hidd)en|strokeDasharray|systemLanguage|(?:strokeLineca|itemPro|useMa|wra|loo)p|v(?:Mathematical|ert(?:Origin[XY]|AdvY)|alues|ocab)|(?:pointerEve|keyPoi)nts|unicodeRange|(?:(?:allowReord|placehold|frameBord|paintOrd|post|ord)e|repeatDu|d(?:efe|u))r|mathematical|(?:vI|i)deographic|h(?:oriz(?:Origin|Adv)X|ttpEquiv)|u(?:nicodeBidi|[12])|(?:fontStretc|hig)h|(?:(?:mar(?:ker|gin)W|strokeW)id|azimu)th|vAlphabetic|mediaGroup|spellCheck|(?:unitsPerE|optimu|fro)m|r(?:adioGroup|e(?:sults|f[XY]|l)|ows|[xy])|(?:xmlnsXl|valueL)ink|a(?:rabicForm|l(?:phabetic|t)|sync)|pathLength|(?:text|m(?:in|ax))Length|innerHTML|xlinkShow|(?:xlinkHr|glyphR)ef|r(?:e(?:quired|sult|f))?|o(?:verflow|pen)|(?:tabInde|(?:sand|b)bo|viewBo)x|(?:(?:href|xml|src)La|kerni)ng|f(?:o(?:ntSize|rm)|il(?:ter|l))|autoPlay|unicode|p(?:attern|oints)|t(?:arget[XY]|o)|i(?:temRef|n2|s)|divisor|d(?:efault|ata|ir)?|srcDoc|s(?:coped|te(?:m[hv]|p)|pan)|(?:width|size)s|(?:stri|la)ng|prefix|itemID|s(?:t(?:roke|art)|hape|cope|rc)|a(?:ccept|s)|t(?:arget|ype)|typeof|width|value|x(?:mlns)?|label|m(?:edia|a(?:sk|x)|in)|size|href|k(?:ey)?|end|low|x[12]|i[dn]|y[12]|g[12]|by|f[xy]|[yz])$/;

/* From DOMProperty */
var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
var isCustomAttribute = RegExp.prototype.test.bind(new RegExp('^(data|aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$'));

var validAttr = (function (name) {
  return ATTRIBUTE_REGEX.test(name) || isCustomAttribute(name.toLowerCase());
});

// 

function isTag(target) /* : %checks */{
  return typeof target === 'string';
}

// 

/* eslint-disable no-undef */
function getComponentName(target) {
  return target.displayName || target.name || 'Component';
}

// 

var determineTheme = (function (props, fallbackTheme, defaultProps) {
  // Props should take precedence over ThemeProvider, which should take precedence over
  // defaultProps, but React automatically puts defaultProps on props.

  /* eslint-disable react/prop-types */
  var isDefaultTheme = defaultProps && props.theme === defaultProps.theme;
  var theme = props.theme && !isDefaultTheme ? props.theme : fallbackTheme;
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
/**
 * Creates a broadcast that can be listened to, i.e. simple event emitter
 *
 * @see https://github.com/ReactTraining/react-broadcast
 */

var createBroadcast = function createBroadcast(initialState) {
  var listeners = {};
  var id = 0;
  var state = initialState;

  function publish(nextState) {
    state = nextState;

    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (var key in listeners) {
      var listener = listeners[key];
      if (listener === undefined) {
        // eslint-disable-next-line no-continue
        continue;
      }

      listener(state);
    }
  }

  function subscribe(listener) {
    var currentId = id;
    listeners[currentId] = listener;
    id += 1;
    listener(state);
    return currentId;
  }

  function unsubscribe(unsubID) {
    listeners[unsubID] = undefined;
  }

  return { publish: publish, subscribe: subscribe, unsubscribe: unsubscribe };
};

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

var _ThemeProvider$childC;
var _ThemeProvider$contex;

// 
/* globals React$Element */
// NOTE: DO NOT CHANGE, changing this is a semver major change!
var CHANNEL = '__styled-components__';
var CHANNEL_NEXT = CHANNEL + 'next__';

var CONTEXT_CHANNEL_SHAPE = index$4.shape({
  getTheme: index$4.func,
  subscribe: index$4.func,
  unsubscribe: index$4.func
});

var warnChannelDeprecated = void 0;
{
  warnChannelDeprecated = once(function () {
    // eslint-disable-next-line no-console
    console.error('Warning: Usage of `context.' + CHANNEL + '` as a function is deprecated. It will be replaced with the object on `.context.' + CHANNEL_NEXT + '` in a future version.');
  });
}

var isFunction = function isFunction(test) {
  return typeof test === 'function';
};

/**
 * Provide a theme to an entire react component tree via context and event listeners (have to do
 * both context and event emitter as pure components block context updates)
 */

var ThemeProvider = function (_Component) {
  inherits(ThemeProvider, _Component);

  function ThemeProvider() {
    classCallCheck(this, ThemeProvider);

    var _this = possibleConstructorReturn(this, _Component.call(this));

    _this.unsubscribeToOuterId = -1;

    _this.getTheme = _this.getTheme.bind(_this);
    return _this;
  }

  ThemeProvider.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    // If there is a ThemeProvider wrapper anywhere around this theme provider, merge this theme
    // with the outer theme
    var outerContext = this.context[CHANNEL_NEXT];
    if (outerContext !== undefined) {
      this.unsubscribeToOuterId = outerContext.subscribe(function (theme) {
        _this2.outerTheme = theme;

        if (_this2.broadcast !== undefined) {
          _this2.publish(_this2.props.theme);
        }
      });
    }

    this.broadcast = createBroadcast(this.getTheme());
  };

  ThemeProvider.prototype.getChildContext = function getChildContext() {
    var _this3 = this,
        _babelHelpers$extends;

    return _extends({}, this.context, (_babelHelpers$extends = {}, _babelHelpers$extends[CHANNEL_NEXT] = {
      getTheme: this.getTheme,
      subscribe: this.broadcast.subscribe,
      unsubscribe: this.broadcast.unsubscribe
    }, _babelHelpers$extends[CHANNEL] = function (subscriber) {
      {
        warnChannelDeprecated();
      }

      // Patch the old `subscribe` provide via `CHANNEL` for older clients.
      var unsubscribeId = _this3.broadcast.subscribe(subscriber);
      return function () {
        return _this3.broadcast.unsubscribe(unsubscribeId);
      };
    }, _babelHelpers$extends));
  };

  ThemeProvider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.theme !== nextProps.theme) {
      this.publish(nextProps.theme);
    }
  };

  ThemeProvider.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.unsubscribeToOuterId !== -1) {
      this.context[CHANNEL_NEXT].unsubscribe(this.unsubscribeToOuterId);
    }
  };

  // Get the theme from the props, supporting both (outerTheme) => {} as well as object notation


  ThemeProvider.prototype.getTheme = function getTheme(passedTheme) {
    var theme = passedTheme || this.props.theme;
    if (isFunction(theme)) {
      var mergedTheme = theme(this.outerTheme);
      if ("development" !== 'production' && !index(mergedTheme)) {
        throw new Error('[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!');
      }
      return mergedTheme;
    }
    if (!index(theme)) {
      throw new Error('[ThemeProvider] Please make your theme prop a plain object');
    }
    return _extends({}, this.outerTheme, theme);
  };

  ThemeProvider.prototype.publish = function publish(theme) {
    this.broadcast.publish(this.getTheme(theme));
  };

  ThemeProvider.prototype.render = function render() {
    if (!this.props.children) {
      return null;
    }
    return React__default.Children.only(this.props.children);
  };

  return ThemeProvider;
}(React.Component);

ThemeProvider.childContextTypes = (_ThemeProvider$childC = {}, _ThemeProvider$childC[CHANNEL] = index$4.func, _ThemeProvider$childC[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _ThemeProvider$childC);
ThemeProvider.contextTypes = (_ThemeProvider$contex = {}, _ThemeProvider$contex[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _ThemeProvider$contex);

// 

// HACK for generating all static styles without needing to allocate
// an empty execution context every single time...
var STATIC_EXECUTION_CONTEXT = {};

var _StyledComponent = (function (ComponentStyle, constructWithOptions) {
  var identifiers = {};

  /* We depend on components having unique IDs */
  var generateId = function generateId(_displayName, parentComponentId) {
    var displayName = typeof _displayName !== 'string' ? 'sc' : escape(_displayName);

    var componentId = void 0;

    /**
     * only fall back to hashing the component injection order if
     * a proper displayName isn't provided by the babel plugin
     */
    if (!_displayName) {
      var nr = (identifiers[displayName] || 0) + 1;
      identifiers[displayName] = nr;

      componentId = displayName + '-' + ComponentStyle.generateName(displayName + nr);
    } else {
      componentId = displayName + '-' + ComponentStyle.generateName(displayName);
    }

    return parentComponentId !== undefined ? parentComponentId + '-' + componentId : componentId;
  };

  var BaseStyledComponent = function (_Component) {
    inherits(BaseStyledComponent, _Component);

    function BaseStyledComponent() {
      var _temp, _this, _ret;

      classCallCheck(this, BaseStyledComponent);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.attrs = {}, _this.state = {
        theme: null,
        generatedClassName: ''
      }, _this.unsubscribeId = -1, _temp), possibleConstructorReturn(_this, _ret);
    }

    BaseStyledComponent.prototype.unsubscribeFromContext = function unsubscribeFromContext() {
      if (this.unsubscribeId !== -1) {
        this.context[CHANNEL_NEXT].unsubscribe(this.unsubscribeId);
      }
    };

    BaseStyledComponent.prototype.buildExecutionContext = function buildExecutionContext(theme, props) {
      var attrs = this.constructor.attrs;

      var context = _extends({}, props, { theme: theme });
      if (attrs === undefined) {
        return context;
      }

      this.attrs = Object.keys(attrs).reduce(function (acc, key) {
        var attr = attrs[key];
        // eslint-disable-next-line no-param-reassign
        acc[key] = typeof attr === 'function' ? attr(context) : attr;
        return acc;
      }, {});

      return _extends({}, context, this.attrs);
    };

    BaseStyledComponent.prototype.generateAndInjectStyles = function generateAndInjectStyles(theme, props) {
      var _constructor = this.constructor,
          attrs = _constructor.attrs,
          componentStyle = _constructor.componentStyle,
          warnTooManyClasses = _constructor.warnTooManyClasses;

      var styleSheet = this.context[CONTEXT_KEY] || StyleSheet.instance;

      // staticaly styled-components don't need to build an execution context object,
      // and shouldn't be increasing the number of class names
      if (componentStyle.isStatic && attrs === undefined) {
        return componentStyle.generateAndInjectStyles(STATIC_EXECUTION_CONTEXT, styleSheet);
      } else {
        var executionContext = this.buildExecutionContext(theme, props);
        var className = componentStyle.generateAndInjectStyles(executionContext, styleSheet);

        if ("development" !== 'production' && warnTooManyClasses !== undefined) {
          warnTooManyClasses(className);
        }

        return className;
      }
    };

    BaseStyledComponent.prototype.componentWillMount = function componentWillMount() {
      var _this2 = this;

      var componentStyle = this.constructor.componentStyle;

      var styledContext = this.context[CHANNEL_NEXT];

      // If this is a staticaly-styled component, we don't need to the theme
      // to generate or build styles.
      if (componentStyle.isStatic) {
        var generatedClassName = this.generateAndInjectStyles(STATIC_EXECUTION_CONTEXT, this.props);
        this.setState({ generatedClassName: generatedClassName });
        // If there is a theme in the context, subscribe to the event emitter. This
        // is necessary due to pure components blocking context updates, this circumvents
        // that by updating when an event is emitted
      } else if (styledContext !== undefined) {
        var subscribe = styledContext.subscribe;

        this.unsubscribeId = subscribe(function (nextTheme) {
          // This will be called once immediately
          var theme = determineTheme(_this2.props, nextTheme, _this2.constructor.defaultProps);
          var generatedClassName = _this2.generateAndInjectStyles(theme, _this2.props);

          _this2.setState({ theme: theme, generatedClassName: generatedClassName });
        });
      } else {
        // eslint-disable-next-line react/prop-types
        var theme = this.props.theme || {};
        var _generatedClassName = this.generateAndInjectStyles(theme, this.props);
        this.setState({ theme: theme, generatedClassName: _generatedClassName });
      }
    };

    BaseStyledComponent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      // If this is a staticaly-styled component, we don't need to listen to
      // props changes to update styles
      var componentStyle = this.constructor.componentStyle;

      if (componentStyle.isStatic) {
        return;
      }

      this.setState(function (oldState) {
        var theme = determineTheme(nextProps, oldState.theme, _this3.constructor.defaultProps);
        var generatedClassName = _this3.generateAndInjectStyles(theme, nextProps);

        return { theme: theme, generatedClassName: generatedClassName };
      });
    };

    BaseStyledComponent.prototype.componentWillUnmount = function componentWillUnmount() {
      this.unsubscribeFromContext();
    };

    BaseStyledComponent.prototype.render = function render() {
      var _this4 = this;

      // eslint-disable-next-line react/prop-types
      var innerRef = this.props.innerRef;
      var generatedClassName = this.state.generatedClassName;
      var _constructor2 = this.constructor,
          styledComponentId = _constructor2.styledComponentId,
          target = _constructor2.target;


      var isTargetTag = isTag(target);

      var className = [
      // eslint-disable-next-line react/prop-types
      this.props.className, styledComponentId, this.attrs.className, generatedClassName].filter(Boolean).join(' ');

      var baseProps = _extends({}, this.attrs, {
        className: className
      });

      if (isStyledComponent(target)) {
        baseProps.innerRef = innerRef;
      } else {
        baseProps.ref = innerRef;
      }

      var propsForElement = Object.keys(this.props).reduce(function (acc, propName) {
        // Don't pass through non HTML tags through to HTML elements
        // always omit innerRef
        if (propName !== 'innerRef' && propName !== 'className' && (!isTargetTag || validAttr(propName))) {
          // eslint-disable-next-line no-param-reassign
          acc[propName] = _this4.props[propName];
        }

        return acc;
      }, baseProps);

      return React.createElement(target, propsForElement);
    };

    return BaseStyledComponent;
  }(React.Component);

  var createStyledComponent = function createStyledComponent(target, options, rules) {
    var _StyledComponent$cont;

    var _options$displayName = options.displayName,
        displayName = _options$displayName === undefined ? isTag(target) ? 'styled.' + target : 'Styled(' + getComponentName(target) + ')' : _options$displayName,
        _options$componentId = options.componentId,
        componentId = _options$componentId === undefined ? generateId(options.displayName, options.parentComponentId) : _options$componentId,
        _options$ParentCompon = options.ParentComponent,
        ParentComponent = _options$ParentCompon === undefined ? BaseStyledComponent : _options$ParentCompon,
        extendingRules = options.rules,
        attrs = options.attrs;


    var styledComponentId = options.displayName && options.componentId ? escape(options.displayName) + '-' + options.componentId : componentId;

    var componentStyle = new ComponentStyle(extendingRules === undefined ? rules : extendingRules.concat(rules), attrs, styledComponentId);

    var StyledComponent = function (_ParentComponent) {
      inherits(StyledComponent, _ParentComponent);

      function StyledComponent() {
        classCallCheck(this, StyledComponent);
        return possibleConstructorReturn(this, _ParentComponent.apply(this, arguments));
      }

      StyledComponent.withComponent = function withComponent(tag) {
        var previousComponentId = options.componentId,
            optionsToCopy = objectWithoutProperties(options, ['componentId']);


        var newComponentId = previousComponentId && previousComponentId + '-' + (isTag(tag) ? tag : escape(getComponentName(tag)));

        var newOptions = _extends({}, optionsToCopy, {
          componentId: newComponentId,
          ParentComponent: StyledComponent
        });

        return createStyledComponent(tag, newOptions, rules);
      };

      createClass(StyledComponent, null, [{
        key: 'extend',
        get: function get$$1() {
          var rulesFromOptions = options.rules,
              parentComponentId = options.componentId,
              optionsToCopy = objectWithoutProperties(options, ['rules', 'componentId']);


          var newRules = rulesFromOptions === undefined ? rules : rulesFromOptions.concat(rules);

          var newOptions = _extends({}, optionsToCopy, {
            rules: newRules,
            parentComponentId: parentComponentId,
            ParentComponent: StyledComponent
          });

          return constructWithOptions(createStyledComponent, target, newOptions);
        }
      }]);
      return StyledComponent;
    }(ParentComponent);

    StyledComponent.contextTypes = (_StyledComponent$cont = {}, _StyledComponent$cont[CHANNEL] = index$4.func, _StyledComponent$cont[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _StyledComponent$cont[CONTEXT_KEY] = index$4.oneOfType([index$4.instanceOf(StyleSheet), index$4.instanceOf(ServerStyleSheet)]), _StyledComponent$cont);
    StyledComponent.displayName = displayName;
    StyledComponent.styledComponentId = styledComponentId;
    StyledComponent.attrs = attrs;
    StyledComponent.componentStyle = componentStyle;
    StyledComponent.target = target;


    {
      StyledComponent.warnTooManyClasses = createWarnTooManyClasses(displayName);
    }

    return StyledComponent;
  };

  return createStyledComponent;
});

// murmurhash2 via https://gist.github.com/raycmorgan/588423

function doHash(str, seed) {
  var m = 0x5bd1e995;
  var r = 24;
  var h = seed ^ str.length;
  var length = str.length;
  var currentIndex = 0;

  while (length >= 4) {
    var k = UInt32(str, currentIndex);

    k = Umul32(k, m);
    k ^= k >>> r;
    k = Umul32(k, m);

    h = Umul32(h, m);
    h ^= k;

    currentIndex += 4;
    length -= 4;
  }

  switch (length) {
    case 3:
      h ^= UInt16(str, currentIndex);
      h ^= str.charCodeAt(currentIndex + 2) << 16;
      h = Umul32(h, m);
      break;

    case 2:
      h ^= UInt16(str, currentIndex);
      h = Umul32(h, m);
      break;

    case 1:
      h ^= str.charCodeAt(currentIndex);
      h = Umul32(h, m);
      break;
  }

  h ^= h >>> 13;
  h = Umul32(h, m);
  h ^= h >>> 15;

  return h >>> 0;
}

function UInt32(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8) + (str.charCodeAt(pos++) << 16) + (str.charCodeAt(pos) << 24);
}

function UInt16(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8);
}

function Umul32(n, m) {
  n = n | 0;
  m = m | 0;
  var nlo = n & 0xffff;
  var nhi = n >>> 16;
  var res = nlo * m + ((nhi * m & 0xffff) << 16) | 0;
  return res;
}

// 
var isStaticRules = function isStaticRules(rules, attrs) {
  for (var i = 0; i < rules.length; i += 1) {
    var rule = rules[i];

    // recursive case
    if (Array.isArray(rule) && !isStaticRules(rule)) {
      return false;
    } else if (typeof rule === 'function' && !isStyledComponent(rule)) {
      // functions are allowed to be static if they're just being
      // used to get the classname of a nested styled copmonent
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
};

var isHRMEnabled = typeof module !== 'undefined' && module.hot && "development" !== 'production';

/*
 ComponentStyle is all the CSS-specific stuff, not
 the React-specific stuff.
 */
var _ComponentStyle = (function (nameGenerator, flatten, stringifyRules) {
  var ComponentStyle = function () {
    function ComponentStyle(rules, attrs, componentId) {
      classCallCheck(this, ComponentStyle);

      this.rules = rules;
      this.isStatic = !isHRMEnabled && isStaticRules(rules, attrs);
      this.componentId = componentId;
      if (!StyleSheet.instance.hasInjectedComponent(this.componentId)) {
        var placeholder = '.' + componentId + ' {}';
        StyleSheet.instance.deferredInject(componentId, true, [placeholder]);
      }
    }

    /*
     * Flattens a rule set into valid CSS
     * Hashes it, wraps the whole chunk in a .hash1234 {}
     * Returns the hash to be injected on render()
     * */


    ComponentStyle.prototype.generateAndInjectStyles = function generateAndInjectStyles(executionContext, styleSheet) {
      var isStatic = this.isStatic,
          lastClassName = this.lastClassName;

      if (isStatic && lastClassName !== undefined) {
        return lastClassName;
      }

      var flatCSS = flatten(this.rules, executionContext);
      var hash = doHash(this.componentId + flatCSS.join(''));

      var stylesCacheable = styleSheet.stylesCacheable;

      var existingName = styleSheet.getName(hash);

      if (existingName !== undefined) {
        if (stylesCacheable) {
          this.lastClassName = existingName;
        }
        return existingName;
      }

      var name = nameGenerator(hash);
      if (stylesCacheable) {
        this.lastClassName = existingName;
      }
      if (styleSheet.alreadyInjected(hash, name)) {
        return name;
      }

      var css = stringifyRules(flatCSS, '.' + name);
      // NOTE: this can only be set when we inject the class-name.
      // For some reason, presumably due to how css is stringifyRules behaves in
      // differently between client and server, styles break.
      styleSheet.inject(this.componentId, true, css, hash, name);
      return name;
    };

    ComponentStyle.generateName = function generateName(str) {
      return nameGenerator(doHash(str));
    };

    return ComponentStyle;
  }();

  return ComponentStyle;
});

// 
// Thanks to ReactDOMFactories for this handy list!

var domElements = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr',

// SVG
'circle', 'clipPath', 'defs', 'ellipse', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

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
var replaceWhitespace = function replaceWhitespace(str) {
  return str.replace(/\s|\\n/g, '');
};

var _keyframes = (function (nameGenerator, stringifyRules, css) {
  return function (strings) {
    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    var rules = css.apply(undefined, [strings].concat(interpolations));
    var hash = doHash(replaceWhitespace(JSON.stringify(rules)));

    var existingName = StyleSheet.instance.getName(hash);
    if (existingName) return existingName;

    var name = nameGenerator(hash);
    if (StyleSheet.instance.alreadyInjected(hash, name)) return name;

    var generatedCSS = stringifyRules(rules, name, '@keyframes');
    StyleSheet.instance.inject('sc-keyframes-' + name, true, generatedCSS, hash, name);
    return name;
  };
});

// 
var _injectGlobal = (function (stringifyRules, css) {
  var injectGlobal = function injectGlobal(strings) {
    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    var rules = css.apply(undefined, [strings].concat(interpolations));
    var hash = doHash(JSON.stringify(rules));

    var componentId = 'sc-global-' + hash;
    if (StyleSheet.instance.hasInjectedComponent(componentId)) return;

    StyleSheet.instance.inject(componentId, false, stringifyRules(rules));
  };

  return injectGlobal;
});

// 

var _constructWithOptions = (function (css) {
  var constructWithOptions = function constructWithOptions(componentConstructor, tag) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (typeof tag !== 'string' && typeof tag !== 'function') {
      throw new Error('Cannot create styled-component for component: ' + String(tag));
    }

    /* This is callable directly as a template function */
    var templateFunction = function templateFunction(strings) {
      for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        interpolations[_key - 1] = arguments[_key];
      }

      return componentConstructor(tag, options, css.apply(undefined, [strings].concat(interpolations)));
    };

    /* If config methods are called, wrap up a new template function and merge options */
    templateFunction.withConfig = function (config) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, config));
    };
    templateFunction.attrs = function (attrs) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, {
        attrs: _extends({}, options.attrs || {}, attrs)
      }));
    };

    return templateFunction;
  };

  return constructWithOptions;
});

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
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
};

var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

var index$7 = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components
        var keys = Object.getOwnPropertyNames(sourceComponent);

        /* istanbul ignore else */
        if (isGetOwnPropertySymbolsAvailable) {
            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
                try {
                    targetComponent[keys[i]] = sourceComponent[keys[i]];
                } catch (error) {}
            }
        }
    }

    return targetComponent;
};

// 
/* globals ReactClass */

var wrapWithTheme = function wrapWithTheme(Component$$1) {
  var _WithTheme$contextTyp;

  var componentName = Component$$1.displayName || Component$$1.name || 'Component';
  var isStatelessFunctionalComponent = typeof Component$$1 === 'function' && !(Component$$1.prototype && 'isReactComponent' in Component$$1.prototype);

  // NOTE: We can't pass a ref to a stateless functional component
  var shouldSetInnerRef = isStyledComponent(Component$$1) || isStatelessFunctionalComponent;

  var WithTheme = function (_React$Component) {
    inherits(WithTheme, _React$Component);

    function WithTheme() {
      var _temp, _this, _ret;

      classCallCheck(this, WithTheme);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {}, _this.unsubscribeId = -1, _temp), possibleConstructorReturn(_this, _ret);
    }

    // NOTE: This is so that isStyledComponent passes for the innerRef unwrapping


    WithTheme.prototype.componentWillMount = function componentWillMount() {
      var _this2 = this;

      var defaultProps = this.constructor.defaultProps;

      var styledContext = this.context[CHANNEL_NEXT];
      var themeProp = determineTheme(this.props, undefined, defaultProps);
      if (styledContext === undefined && themeProp === undefined && "development" !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('[withTheme] You are not using a ThemeProvider nor passing a theme prop or a theme in defaultProps');
      } else if (styledContext === undefined && themeProp !== undefined) {
        this.setState({ theme: themeProp });
      } else {
        var subscribe = styledContext.subscribe;

        this.unsubscribeId = subscribe(function (nextTheme) {
          var theme = determineTheme(_this2.props, nextTheme, defaultProps);
          _this2.setState({ theme: theme });
        });
      }
    };

    WithTheme.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var defaultProps = this.constructor.defaultProps;

      this.setState(function (oldState) {
        var theme = determineTheme(nextProps, oldState.theme, defaultProps);

        return { theme: theme };
      });
    };

    WithTheme.prototype.componentWillUnmount = function componentWillUnmount() {
      if (this.unsubscribeId !== -1) {
        this.context[CHANNEL_NEXT].unsubscribe(this.unsubscribeId);
      }
    };

    WithTheme.prototype.render = function render() {
      var props = _extends({
        theme: this.state.theme
      }, this.props);

      if (!shouldSetInnerRef) {
        props.ref = props.innerRef;
        delete props.innerRef;
      }

      return React__default.createElement(Component$$1, props);
    };

    return WithTheme;
  }(React__default.Component);

  WithTheme.displayName = 'WithTheme(' + componentName + ')';
  WithTheme.styledComponentId = 'withTheme';
  WithTheme.contextTypes = (_WithTheme$contextTyp = {}, _WithTheme$contextTyp[CHANNEL] = index$4.func, _WithTheme$contextTyp[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _WithTheme$contextTyp);


  return index$7(WithTheme, Component$$1);
};

// 

/* eslint-disable */
var __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS = {
  StyleSheet: StyleSheet
};

// 

/* Import singletons */
/* Import singleton constructors */
/* Import components */
/* Import Higher Order Components */
/* Warning if you've imported this file on React Native */
if ("development" !== 'production' && typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
  console.warn("It looks like you've imported 'styled-components' on React Native.\n" + "Perhaps you're looking to import 'styled-components/native'?\n" + 'Read more about this at https://www.styled-components.com/docs/basics#react-native');
}

/* Instantiate singletons */
var ComponentStyle = _ComponentStyle(generateAlphabeticName, flatten, stringifyRules);
var constructWithOptions = _constructWithOptions(css);
var StyledComponent = _StyledComponent(ComponentStyle, constructWithOptions);

/* Instantiate exported singletons */
var keyframes = _keyframes(generateAlphabeticName, stringifyRules, css);
var injectGlobal = _injectGlobal(stringifyRules, css);
var styled = _styled(StyledComponent, constructWithOptions);

exports['default'] = styled;
exports.css = css;
exports.keyframes = keyframes;
exports.injectGlobal = injectGlobal;
exports.isStyledComponent = isStyledComponent;
exports.consolidateStreamedStyles = consolidateStreamedStyles;
exports.ThemeProvider = ThemeProvider;
exports.withTheme = wrapWithTheme;
exports.ServerStyleSheet = ServerStyleSheet;
exports.StyleSheetManager = StyleSheetManager;
exports.__DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS = __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=styled-components.js.map
