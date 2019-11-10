(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
	(factory((global.styled = global.styled || {}),global.React));
}(this, (function (exports,React) { 'use strict';

var React__default = 'default' in React ? React['default'] : React;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
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





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

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



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var index$1 = function isObject(val) {
  return val != null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && !Array.isArray(val);
};

var isObject$1 = index$1;

function isObjectObject(o) {
  return isObject$1(o) === true && Object.prototype.toString.call(o) === '[object Object]';
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
  var css = Object.keys(obj).map(function (key) {
    if (index(obj[key])) return objToCss(obj[key], key);
    return hyphenateStyleName_1(key) + ': ' + obj[key] + ';';
  }).join(' ');
  return prevKey ? prevKey + ' {\n  ' + css + '\n}' : css;
};

var flatten = function flatten(chunks, executionContext) {
  return chunks.reduce(function (ruleSet, chunk) {
    /* Remove falsey values */
    if (chunk === undefined || chunk === null || chunk === false || chunk === '') return ruleSet;
    /* Flatten ruleSet */
    if (Array.isArray(chunk)) return [].concat(toConsumableArray(ruleSet), toConsumableArray(flatten(chunk, executionContext)));

    /* Handle other components */
    // $FlowFixMe not sure how to make this pass
    if (chunk.hasOwnProperty('styledComponentId')) return [].concat(toConsumableArray(ruleSet), ['.' + chunk.styledComponentId]);

    /* Either execute or defer the function */
    if (typeof chunk === 'function') {
      return executionContext ? ruleSet.concat.apply(ruleSet, toConsumableArray(flatten([chunk(executionContext)], executionContext))) : ruleSet.concat(chunk);
    }

    /* Handle objects */
    // $FlowFixMe have to add %checks somehow to isPlainObject
    return ruleSet.concat(index(chunk) ? objToCss(chunk) : chunk.toString());
  }, []);
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
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
  * stylis is a feature-rich css preprocessor
  * 
  * @licence MIT
  */
	(function (factory) {
		if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
			module.exports = factory(commonjsGlobal);
		} else if (typeof undefined === 'function' && undefined.amd) {
			undefined(factory(window));
		} else {
			window.stylis = factory(window);
		}
	})(function (window) {

		'use strict';

		/**
   * css preprocessor
   *
   * @example stylis('.foo', 'css...', true, true, null);
   * 
   * @param  {string}   selector   - i.e `.class` or `#id` or `[attr=id]`
   * @param  {string}   styles     - css string
   * @param  {boolean=} animations - prefix animations and keyframes, true by default
   * @param  {boolean=} compact    - enable additional features(mixins and variables)
   * @param  {function(context, content, line, column, namespace)=} middleware
   * @return {string}
   */

		function stylis(selector, styles, animations, compact, middleware) {
			/* @type {string} */
			selector += '';

			var prefix = '';
			var namespace = '';

			/* @type {number} */
			var type = selector.charCodeAt(0);

			var char;
			var character;
			var attr;
			var animns;
			var uses;

			// [ attr selector
			if (type === 91) {
				// `[data-id=namespace]` -> ['data-id', 'namespace']
				attr = selector.substring(1, selector.length - 1).split('=');
				char = (namespace = attr[1]).charCodeAt(0);

				// [data-id="namespace"]/[data-id='namespace']
				// --> "namespace"/'namspace' --> namespace
				if (char === 34 || char === 39) {
					namespace = namespace.substring(1, namespace.length - 1);
				}

				prefix = '[' + attr[0] + '="' + namespace + '"]';
			}
			// `#` `.` `>` id class and descendant selectors
			else if (type === 35 || type === 46 || type === 62) {
					namespace = (prefix = selector).substring(1);
				}
				// element selector
				else {
						namespace = prefix = selector;
					}

			// reset type signature
			type = 0;

			// animation and keyframe namespace
			if (animations == undefined || animations === true) {
				animations = true;
				animns = namespace;
			} else {
				animns = '';
				animations = false;
			}

			// middleware
			var use = middleware != null;
			var plugins = stylis.plugins;
			var length = plugins.length;

			if (use) {
				uses = (typeof middleware === 'undefined' ? 'undefined' : _typeof(middleware)).charCodeAt(0);

				// o, object/array
				if (uses === 111) {
					stylis.use(middleware, null);
				}
				// f, function
				else if (uses === 102) {
						plugins[length++] = middleware;
					} else {
						use = false;
					}
			}

			if (length !== 0) {
				middleware = length === 1 ? plugins[0] : function (ctx, str, line, col, prefix, length) {
					var output = str;

					for (var i = 0, l = plugins.length; i < l; i++) {
						output = plugins[i](ctx, output, line, col, prefix, length) || output;
					}

					if (output !== str) {
						return output;
					}
				};

				use = true;
			}

			// declare
			var colon;
			var inner;
			var selectors;
			var build;
			var media;
			var temp;
			var prev;
			var indexOf;
			var first;
			var second;
			var third;
			var sel;
			var blob;
			var nest;
			var query;
			var str;

			// variables
			var vars;
			var varlen;

			// mixins
			var mixins;
			var mixin;

			// prefixes
			var moz = '-moz-';
			var ms = '-ms-';
			var webkit = '-webkit-';

			// buffers
			var buff = '';
			var blck = '';
			var flat = '';

			// character code
			var code = 0;

			// context signatures		
			var special = 0;
			var close = 0;
			var closed = 0;
			var nested = 0;
			var func = 0;
			var medias = 0;
			var strings = 0;
			var glob = 0;
			var globs = 0;

			// context(flat) signatures
			var levels = 0;
			var level = 0;

			// comments
			var comment = 0;
			var comblck = 0;
			var comline = 0;

			// pre-process
			if (use) {
				temp = middleware(0, styles, line, column, prefix, 0);

				if (temp != null) {
					styles = temp;
				}

				str = '';
			}

			// positions
			var caret = 0;
			var depth = 0;
			var column = 0;
			var line = 1;
			var eof = styles.length;
			var last = eof - 1;

			// compiled output
			var output = '';

			// parse + compile
			while (caret < eof) {
				/* @type {number} */
				code = styles.charCodeAt(caret);

				// {, }, ; characters, parse line by line
				if (strings === 0 && func === 0 && comment === 0 && (code === 123 || code === 125 || code === 59 || caret === eof - 1 && buff.length !== 0)) {
					buff += styles.charAt(caret);

					// middleware, selector/property context, }
					if (use && code !== 125) {
						if (use) {
							// { pre-processed selector context
							if (code === 123) {
								temp = middleware(1, buff.substring(0, buff.length - 1).trim(), line, column, prefix, output.length);
							}
							// ; property context
							else {
									temp = middleware(2, buff, line, column, prefix, output.length);
								}

							if (temp != null) {
								buff = code === 123 ? temp + ' {' : temp;
							}
						}
					}

					first = buff.charCodeAt(0);

					// only trim when the first character is a space ` `
					if (first === 32) {
						first = (buff = buff.trim()).charCodeAt(0);
					}

					// default to 0 instead of NaN if there is no second/third character
					second = buff.charCodeAt(1);
					third = buff.charCodeAt(2);

					// @, special block
					if (first === 64) {
						// push flat css
						if (levels === 1 && flat.length !== 0) {
							levels = 0;
							flat = prefix + ' {' + flat + '}';

							// middleware, flat context
							if (use) {
								temp = middleware(4, flat, line, column, prefix, output.length);

								if (temp != null) {
									flat = temp;
								}
							}

							output += flat;
							flat = '';
						}

						// ;
						if (code !== 59) {
							// @keyframe/@global, `k` or @global, `g` character
							if (second === 107 || second === 103) {
								// k, @keyframes
								if (second === 107) {
									blob = buff.substring(1, 11) + (glob === 0 ? animns : '') + buff.substring(11);
									buff = '@' + webkit + blob;
									type = 1;
								}
								// g, @global
								else {
										glob = 1;
										buff = '';
									}
							}
							// @media/@mixin `m` character
							else if (second === 109) {
									// @mixin
									if (compact === true && third === 105) {
										// first match create mixin store
										if (mixins === undefined) {
											mixins = {};
										}

										// retrieve mixin identifier
										blob = (mixin = buff.substring(7, buff.indexOf('{')) + ' ').trim();

										// cache current mixin name
										mixin = mixin.substring(0, mixin.indexOf(' ')).trim();

										// append mixin identifier
										mixins[mixin] = { key: blob.trim(), body: '' };

										type = 3;
										buff = '';
										blob = '';
									}
									// @media
									else if (third === 101) {
											// nested
											if (depth !== 0) {
												// discard first character {
												caret++;
												column++;

												if (media === undefined) {
													media = '';
												}

												temp = '';
												inner = '';
												selectors = prev.split(stylis.regex.split);

												// keep track of opening `{` and `}` occurrences
												closed = 1;

												// travel to the end of the block
												while (caret < eof) {
													char = styles.charCodeAt(caret);

													// {, }, nested blocks may have nested blocks
													if (char === 123) {
														closed++;
													} else if (char === 125) {
														closed--;
													}

													// break when the nested block has ended
													if (closed === 0) {
														break;
													}

													// build content of nested block
													inner += styles.charAt(caret++);

													// move column and line position
													column = char === 13 || char === 10 ? (line++, 0) : column + 1;
												}

												length = selectors.length;

												for (var i = 0; i < length; i++) {
													selector = selectors[i];

													// build media block
													temp += stylis(
													// remove { on last selector
													(i === length - 1 ? selector.substring(0, selector.length - 1) : selector).trim(), inner, animations, compact, middleware);
												}

												media += buff + temp + '}';
												buff = '';
												medias = 1;
												type = 4;
											}
											// top-level
											else {
													type = 2;
													query = buff;
													buff = '';
												}
										}
										// unknown
										else {
												type = 6;
											}
								}
						}

						// @include/@import `i` character
						if (second === 105) {
							// @include `n` character
							if (compact === true && third === 110) {
								buff = buff.substring(9, buff.length - 1);
								indexOf = buff.indexOf('(');

								// function mixins
								if (indexOf !== -1) {
									// mixin name
									var name = buff.substring(0, indexOf);

									// mixin data
									var data = mixins[name];

									// args passed to the mixin
									var passed = buff.substring(name.length + 1, buff.length - 1).split(',');

									// args the mixin expects
									var expected = data.key.replace(name, '').replace(/\(|\)/g, '').trim().split(',');

									buff = data.body;

									length = passed.length;

									for (var i = 0; i < length; i++) {
										var arg = expected[i].trim();

										// if the mixin has a slot for that arg
										if (arg !== undefined) {
											buff = buff.replace(new RegExp('var\\(~~' + arg + '\\)', 'g'), passed[i].trim());
										}
									}

									// create block and update styles length
									styles += buff;
									eof += buff.length;

									// reset
									buff = '';
								}
								// static mixins
								else {
										buff = mixins[buff].body;

										if (depth === 0) {
											// create block and update styles length
											styles += buff;
											eof += buff.length;

											// reset
											buff = '';
										}
									}
							}
							// @import `m` character
							else if (third === 109 && use) {
									// avoid "foo.css"; "foo" screen; "http://foo.com/bar"; url(foo);
									var match = /@import.*?(["'`][^\.\n\r]*?["'`];|["'`][^:\r\n]*?\.[^c].*?["'`])/g.exec(buff);

									if (match !== null) {
										// middleware, import context
										buff = middleware(5, match[1].replace(/['"; ]/g, ''), line, column, prefix, output.length) || '';

										if (buff) {
											// create block and update styles length
											styles = styles.substring(0, caret + 1) + buff + styles.substring(caret + 1);
											eof += buff.length;
										}

										buff = '';
									}
								}
						}
						// flag special, i.e @keyframes, @global, @font-face ...
						else if (type !== 4 && code !== 59) {
								// k, g, m
								if (second !== 107 && second !== 103 && second !== 109) {
									type = 5;
								}

								close = -1;
								special++;
							}
					}
					// ~, ~, ; variables
					else if (compact === true && first === 126 && second === 126 && code === 59 && (colon = buff.indexOf(':')) !== -1) {
							// first match create variables store 
							if (varlen === undefined) {
								vars = [];
								varlen = 0;
							}

							// push key value pair
							vars[varlen++] = [buff.substring(0, colon), buff.substring(colon + 1, buff.length - 1).trim()];

							// reset buffer
							buff = '';
						}
						// property/selector
						else {
								// { character, selector declaration
								if (code === 123) {
									depth++;

									// push flat css
									if (levels === 1 && flat.length !== 0) {
										levels = 0;
										flat = prefix + ' {' + flat + '}';

										// middleware, flat context
										if (use) {
											temp = middleware(4, flat, line, column, prefix, output.length);

											if (temp != null) {
												flat = temp;
											}
										}

										output += flat;
										flat = '';
									}

									// nested selector
									if (depth === 2) {
										// discard first character {
										caret++;
										column++;

										// inner content of block
										inner = '';

										var nestSelector = buff.substring(0, buff.length - 1).split(stylis.regex.split);
										var prevSelector = prev.substring(0, prev.length - 1).split(stylis.regex.split);

										// keep track of opening `{` and `}` occurrences
										closed = 1;

										// travel to the end of the block
										while (caret < eof) {
											char = styles.charCodeAt(caret);

											// {, nested blocks may have nested blocks
											if (char === 123) {
												closed++;
											}
											// },
											else if (char === 125) {
													closed--;
												}

											// break when the nested block has ended
											if (closed === 0) {
												break;
											}

											// build content of nested block
											inner += styles.charAt(caret++);

											// move column and line position
											column = char === 13 || char === 10 ? (line++, 0) : column + 1;
										}

										// handle multiple selectors: h1, h2 { div, h4 {} } should generate
										// -> h1 div, h2 div, h2 h4, h2 div {}

										length = prevSelector.length;

										for (var j = 0; j < length; j++) {
											// extract value, prep index for reuse
											temp = prevSelector[j];
											indexOf = temp.indexOf(prefix);

											prevSelector[j] = '';

											// since there could also be multiple nested selectors
											for (var k = 0, l = nestSelector.length; k < l; k++) {
												if (indexOf > 0) {
													selector = ':global()' + temp.trim();
												} else {
													selector = temp.replace(prefix, '&').trim();
												}

												sel = nestSelector[k].trim();

												if (sel.indexOf(' &') > 0) {
													selector = sel.replace('&', '').trim() + ' ' + selector;
												} else if (stylis.regex.global[0].exec(sel) !== null) {
													selector = sel;
												} else {
													selector = selector + ' ' + sel;
												}

												prevSelector[j] += selector.replace(/ +&/, '').trim() + (k === l - 1 ? '' : ',');
											}
										}

										if (nest === undefined) {
											nest = '';
										}

										// concat nest
										nest += '\n' + prevSelector.join(',').replace(stylis.regex.global[1], ' $1') + ' {' + inner + '}';

										// signature
										nested = 1;

										// clear current line, to avoid adding nested blocks to the normal flow
										buff = '';

										// decreament depth
										depth--;
									}
									// top-level selector
									else if (glob === 0 && (special === 0 || type === 2)) {
											selectors = buff.split(stylis.regex.split);

											// current selector
											build = '';

											// previous selector
											prev = '';

											length = selectors.length;

											// prefix multiple selectors with namesapces
											// @example h1, h2, h3 --> [namespace] h1, [namespace] h1, ....
											for (var j = 0; j < length; j++) {
												char = (selector = selectors[j]).charCodeAt(0);

												// ` `, trim if first character is a space
												if (char === 32) {
													char = (selector = selector.trim()).charCodeAt(0);
												}

												// &
												if (char === 38) {
													// before: & { / &&... {
													selector = prefix + selector.substring(1).replace(stylis.regex.and, prefix);
													// after: ${prefix} { / ${prefix}${prefix}...
												} else {
													// default to :global if & exist outside of the first non-space character
													if ((indexOf = selector.indexOf(' &')) > 0) {
														// `:`
														globs = 2;

														if (selector.indexOf(':global()') !== 0) {
															// before: html & {
															selector = ':global(' + selector.substring(0, indexOf) + ')' + selector.substring(indexOf);
															// after: html ${prefix} {
														}

														char = 58;
													}

													// :
													if (char === 58) {
														var secondChar = selector.charCodeAt(1);

														// h, t, :host
														if (secondChar === 104 && selector.charCodeAt(4) === 116) {
															var nextChar = selector.charCodeAt(5);

															// (, :host(selector)                    
															if (nextChar === 40) {
																// before: `(selector)`
																selector = prefix + selector.replace(/:host\((.*)\)/g, '$1').replace(stylis.regex.and, prefix);
																// after: ${prefx} selector {
															}
															// -, :host-context(selector)
															else if (nextChar === 45) {
																	// before: `-context(selector)`
																	selector = selector.replace(/:host-context\((.*)\)/g, '$1 ' + prefix).replace(stylis.regex.and, prefix);
																	// after: selector ${prefix} {
																}
																// :host
																else {
																		selector = prefix + selector.substring(5);
																	}
														}
														// g, :global(selector)
														else if (secondChar === 103) {
																if (globs !== 2) {
																	globs = 1;
																}

																// before: `:global(selector)`
																selector = selector.replace(stylis.regex.global[0], '$1').replace(stylis.regex.and, prefix);

																// after: selector
															}
															// :hover, :active, :focus, etc...
															else {
																	selector = prefix + selector;
																}
													}
													// non-pseudo selectors
													else if (globs === 0) {
															selector = prefix + ' ' + selector;
														}
												}

												// middleware, post-processed selector context
												if (use) {
													temp = middleware(1.5, j === length - 1 ? selector.substring(0, selector.length - 1).trim() : selector, line, column, prefix, output.length);

													if (temp != null) {
														selector = j === length - 1 ? temp + ' {' : temp;
													}
												}

												// if first selector do not prefix with `,`
												prev += (j !== 0 ? ',' : '') + (globs !== 1 ? selector : ':global()' + selector);
												build += j !== 0 ? ',' + selector : selector;

												// reset :global flag
												globs = 0;
											}

											buff = build;
										} else {
											prev = buff;
										}
								}
								// not single `}`
								else if ((code === 125 && buff.length === 1) === false) {
										// ;
										if (code !== 59) {
											buff = (code === 125 ? buff.substring(0, buff.length - 1) : buff.trim()) + ';';
										}

										// animation: a, n, i characters
										if (first === 97 && second === 110 && third === 105) {
											// removes ;
											buff = buff.substring(0, buff.length - 1);

											// position of :
											colon = buff.indexOf(':') + 1;

											// left hand side everything before `:`
											build = buff.substring(0, colon);

											// short hand animation syntax
											if (animations === true && buff.charCodeAt(9) !== 45) {
												var anims = buff.substring(colon).trim().split(',');

												length = anims.length;

												// because we can have multiple animations `animation: slide 4s, slideOut 2s`
												for (var j = 0; j < length; j++) {
													var anim = anims[j];
													var props = anim.split(' ');

													// since we can't be sure of the position of the name of the animation we have to find it
													for (var k = 0, l = props.length; k < l; k++) {
														var prop = props[k].trim();
														var frst = prop.charCodeAt(0);
														var thrd = prop.charCodeAt(2);
														var len = prop.length;
														var last = prop.charCodeAt(len - 1);

														// animation name is anything not in this list
														if (
														// cubic-bezier()/steps(), ) 
														last !== 41 && len !== 0 &&

														// infinite, i, f, e
														!(frst === 105 && thrd === 102 && last === 101 && len === 8) &&

														// linear, l, n, r
														!(frst === 108 && thrd === 110 && last === 114 && len === 6) &&

														// alternate/alternate-reverse, a, t, e
														!(frst === 97 && thrd === 116 && last === 101 && (len === 9 || len === 17)) &&

														// normal, n, r, l
														!(frst === 110 && thrd === 114 && last === 108 && len === 6) &&

														// backwards, b, c, s
														!(frst === 98 && thrd === 99 && last === 115 && len === 9) &&

														// forwards, f, r, s
														!(frst === 102 && thrd === 114 && last === 115 && len === 8) &&

														// both, b, t, h
														!(frst === 98 && thrd === 116 && last === 104 && len === 4) &&

														// none, n, n, e
														!(frst === 110 && thrd === 110 && last === 101 && len === 4) &&

														// running, r, n, g 
														!(frst === 114 && thrd === 110 && last === 103 && len === 7) &&

														// paused, p, u, d
														!(frst === 112 && thrd === 117 && last === 100 && len === 6) &&

														// reversed, r, v, d
														!(frst === 114 && thrd === 118 && last === 100 && len === 8) &&

														// step-start/step-end, s, e, (t/d)
														!(frst === 115 && thrd === 101 && (last === 116 && len === 10 || last === 100 && len === 8)) &&

														// ease/ease-in/ease-out/ease-in-out, e, s, e
														!(frst === 101 && thrd === 115 && (last === 101 && len === 4 || (len === 11 || len === 7 || len === 8) && prop.charCodeAt(4) === 45)) &&

														// durations, 0.4ms, .4s, 400ms ...
														isNaN(parseFloat(prop)) &&

														// handle spaces in cubic-bezier()/steps() functions
														prop.indexOf('(') === -1) {
															props[k] = animns + prop;
														}
													}

													build += (j === 0 ? '' : ',') + props.join(' ').trim();
												}
											}
											// explicit syntax, anims array should have only one elemenet
											else {
													// n
													build += (buff.charCodeAt(10) !== 110 ? '' : animns) + buff.substring(colon).trim().trim();
												}

											// vendor prefix
											buff = webkit + build + ';' + build + (code === 125 ? ';}' : ';');
										}
										// appearance: a, p, p
										else if (first === 97 && second === 112 && third === 112) {
												// vendor prefix -webkit- and -moz-
												buff = webkit + buff + moz + buff + buff;
											}
											// display: d, i, s
											else if (first === 100 && second === 105 && third === 115) {
													// flex/inline-flex
													if ((indexOf = buff.indexOf('flex')) !== -1) {
														// e, inline-flex
														temp = buff.charCodeAt(indexOf - 2) === 101 ? 'inline-' : '';

														// vendor prefix
														buff = 'display: ' + webkit + temp + 'box;' + 'display: ' + webkit + temp + 'flex;' + 'display: ' + ms + 'flexbox;' + 'display: ' + temp + 'flex;';
													}
												}
												// transforms & transitions: t, r, a 
												else if (first === 116 && second === 114 && third === 97) {
														// vendor prefix -webkit- and -ms- if transform
														buff = webkit + buff + (buff.charCodeAt(5) === 102 ? ms + buff : '') + buff;
													}
													// hyphens: h, y, p
													// user-select: u, s, e
													else if (first === 104 && second === 121 && third === 112 || first === 117 && second === 115 && third === 101) {
															// vendor prefix all
															buff = webkit + buff + moz + buff + ms + buff + buff;
														}
														// flex: f, l, e
														else if (first === 102 && second === 108 && third === 101) {
																// vendor prefix all but moz
																buff = webkit + buff + ms + buff + buff;
															}
															// order: o, r, d
															else if (first === 111 && second === 114 && third === 100) {
																	// vendor prefix all but moz
																	buff = webkit + buff + ms + 'flex-' + buff + buff;
																}
																// align-items, align-center, align-self: a, l, i, -
																else if (first === 97 && second === 108 && third === 105 && buff.charCodeAt(5) === 45) {
																		switch (buff.charCodeAt(6)) {
																			// align-items, i
																			case 105:
																				{
																					temp = buff.replace('-items', '');
																					buff = webkit + 'box-' + temp + ms + 'flex-' + temp + buff;
																					break;
																				}
																			// align-self, s
																			case 115:
																				{
																					buff = ms + 'flex-item-' + buff.replace('-self', '') + buff;
																					break;
																				}
																			// align-content
																			default:
																				{
																					buff = ms + 'flex-line-pack' + buff.replace('align-content', '') + buff;
																					break;
																				}
																		}
																	}
																	// cursor, c, u, r
																	else if (first === 99 && second === 117 && third === 114 && /zoo|gra/.exec(buff) !== null) {
																			buff = buff.replace(/: +/g, ': ' + webkit) + buff.replace(/: +/g, ': ' + moz) + buff;
																		}
																		// width: min-content / width: max-content
																		else if (first === 119 && second === 105 && third === 100 && (indexOf = buff.indexOf('-content')) !== -1) {
																				temp = buff.substring(indexOf - 3);

																				// vendor prefix all but moz
																				buff = 'width: -webkit-' + temp + 'width: -moz-' + temp + 'width: ' + temp;
																			}

										if (code !== 59) {
											buff = buff.substring(0, buff.length - 1);

											// }
											if (code === 125) {
												buff += '}';
											}
										}
									}

								// } character
								if (code === 125) {
									if (depth !== 0) {
										depth--;
									}

									// concat nested css
									if (depth === 0 && nested === 1) {
										styles = styles.substring(0, caret + 1) + nest + styles.substring(caret + 1);
										eof += nest.length;
										nest = '';
										nested = 0;
										close++;
									}

									// }, ` ` whitespace
									if (first !== 125 && buff.charCodeAt(buff.length - 2) === 32) {
										buff = buff.substring(0, buff.length - 1).trim() + '}';
									}
								}

								// @global/@keyframes
								if (special !== 0) {
									// }, find closing tag
									if (code === 125) {
										close++;
									}
									// {
									else if (code === 123 && close !== 0) {
											close--;
										}

									// append flat @media css
									if (level === 1 && (code === 123 || close === 0) && flat.length !== 0) {
										level = 0;
										buff = prefix + ' {' + flat + '}' + buff;
										flat = '';
									}

									// closing tag
									if (close === 0) {
										// @global
										if (type === 0) {
											glob = 0;
											buff = '';
										}
										// @keyframes 
										else if (type === 1) {
												// vendor prefix
												buff = '}@' + blob + '}';

												// reset
												blob = '';
											}
											// @mixin
											else if (type === 3) {
													// append body of mixin
													mixins[mixin].body = blob;

													// reset
													mixin = '';
													buff = '';
													blob = '';
												}

										// reset signatures
										type = 0;
										close--;
										special--;
									}
									// @keyframes, @mixin
									else if (type === 1 || type === 3) {
											blob += buff;

											if (type === 3) {
												buff = '';
											}
										}
										// @media flat context
										else if (type === 2 && depth === 0) {
												if (code !== 125) {
													if (level === 0) {
														flat = '';
													}

													flat += buff;
													buff = '';
												}

												level = 1;
											}
								}
								// flat context
								else if (depth === 0 && code !== 125) {
										levels = 1;
										flat = flat === undefined ? buff : flat + buff;
										buff = '';
									}
							}

					// append line to blck buffer
					blck += buff;

					// add blck buffer to output
					if (code === 125 && (type === 0 || type === 2 || type === 4)) {
						char = blck.charCodeAt(blck.length - 2);

						if (type === 4) {
							type = 0;
						}

						if (media !== undefined && media.length !== 0) {
							blck = char === 123 ? media : blck + media;
							media = '';
							char = blck.charCodeAt(blck.length - 2);
						}

						// {, @
						if (char !== 123) {
							// middleware, block context
							if (use) {
								temp = middleware(3, blck, line, column, prefix, output.length);

								if (temp != null) {
									blck = temp;
								}
							}

							if (query !== undefined) {
								query += blck;

								// }
								if (query.charCodeAt(query.length - 2) === 125) {
									output += query;
									query = undefined;
								}
							} else {
								// append blck buffer
								output += blck;
							}
						}

						// reset blck buffer
						blck = '';
					}

					// reset line buffer
					buff = '';
				}
				// build line by line
				else {
						// \r, \n, new lines
						if (code === 13 || code === 10) {
							if (comline === 1) {
								comment = comline = 0;
								buff = buff.substring(0, buff.indexOf('//'));
							}
							// /
							else if (use && comment === 0 && (length = (str = str.trim()).length) !== 0 && str.charCodeAt(0) !== 47) {
									if (buff.length !== 0) {
										temp = middleware(7, str, line, column, prefix, output.length);

										if (temp != null) {
											buff = buff.replace(new RegExp(str + '$'), temp);
										}
									}

									str = '';
								}

							column = 0;
							line++;
						} else {
							// not `\t` tab character
							if (code !== 9) {
								character = styles.charAt(caret);

								// build line buffer
								if (use && comment === 0) {
									str += character;
								}

								// build character buffer
								buff += character;

								switch (code) {
									// " character
									case 34:
										{
											if (comment === 0) {
												// exit string " context / enter string context
												strings = strings === 34 ? 0 : strings === 39 ? 39 : 34;
											}
											break;
										}
									// ' character
									case 39:
										{
											if (comment === 0) {
												// exit string ' context / enter string context
												strings = strings === 39 ? 0 : strings === 34 ? 34 : 39;
											}
											break;
										}
									// ( character
									case 40:
										{
											if (strings === 0 && comment === 0) {
												func = 1;
											}
											break;
										}
									// ) character
									case 41:
										{
											if (strings === 0 && comment === 0) {
												func = 0;
											}
											break;
										}
									// / character
									case 47:
										{
											if (strings === 0 && func === 0) {
												char = styles.charCodeAt(caret - 1);

												// /, begin line comment
												if (comblck === 0 && char === 47) {
													comment = comline = 1;
												}
												// *, end block comment
												else if (char === 42) {
														comment = comblck = 0;
														buff = buff.substring(0, buff.indexOf('/*'));
													}
											}

											break;
										}
									// * character
									case 42:
										{
											if (strings === 0 && func === 0 && comline === 0 && comblck === 0) {
												// /, begin block comment
												if (styles.charCodeAt(caret - 1) === 47) {
													comment = comblck = 1;
												}
											}

											break;
										}
								}
							}

							// move column position
							column++;
						}
					}

				// move caret position
				caret++;
			}

			// trailing flat css
			if (flat !== undefined && flat.length !== 0) {
				flat = prefix + ' {' + flat + '}';

				// middleware, flat context
				if (use) {
					temp = middleware(4, flat, line, column, prefix, output.length);

					if (temp != null) {
						flat = temp;
					}
				}

				// append flat css
				output += flat;
			}

			// has variables
			if (compact && vars !== undefined) {
				// replace all variables
				for (var i = 0; i < varlen; i++) {
					output = output.replace(new RegExp('var\\(' + vars[i][0] + '\\)', 'g'), vars[i][1]);
				}
			}

			// middleware, output context
			if (use) {
				temp = middleware(6, output, line, column, prefix, output.length);

				if (temp != null) {
					output = temp;
				}
			}

			return output;
		}

		/**
   * use plugin
   * 
   * @param  {string|function|function[]} key
   * @param  {function?} plugin
   * @return {Object} {use, plugins}
   */
		stylis.use = function (key, plugin) {
			var plugins = stylis.plugins;
			var length = plugins.length;

			if (plugin == null) {
				plugin = key;
				key = undefined;
			}

			if (plugin != null) {
				// object of plugins
				if (plugin.constructor === Object) {
					for (var name in plugin) {
						stylis.use(name, plugin[name]);
					}
				}
				// array of plugins
				else if (plugin.constructor === Array) {
						for (var i = 0, len = plugin.length; i < len; i++) {
							plugins[length++] = plugin[i];
						}
					}
					// single un-keyed plugin
					else if (key == null) {
							plugins[length] = plugin;
						}
						// keyed plugin
						else {
								var pattern = key instanceof RegExp ? key : new RegExp(key + '\\([ \\t\\r\\n]*([^\\0]*?)[ \\t\\r\\n]*\\)', 'g');
								var trimmer = /[ \t\r\n]*,[ \t\r\n]*/g;

								var replacer = function replacer(match, group) {
									var params = group.replace(trimmer, ',').split(',');
									var replace = plugin.apply(null, params);

									return replace != null ? replace : match;
								};

								plugins[length] = function (ctx, str) {
									if (ctx === 6) {
										return str.replace(pattern, replacer);
									}
								};
							}
			}

			return stylis;
		};

		/**
   * plugin store
   * 
   * @type {function[]}
   */
		stylis.plugins = [];

		/**
   * regular expresions
   * 
   * @type {Object<string, RegExp>}
   */
		stylis.regex = {
			and: /&/g,
			split: /,[\s]*(?![^\r\n\[]*[\]\)])/g,
			import: /@import.*?(["'`][^\.\n\r]*?["'`];|["'`][^:\r\n]*?\.[^c].*?["'`])/g,
			global: [/:global\(((?:[^\(\)\[\]]*|\[.*\]|\([^\(\)]*\))*)\)/g, /(?:&| ):global\(((?:[^\(\)\[\]]*|\[.*\]|\([^\(\)]*\))*)\)/g]
		};

		return stylis;
	});
});

//      
var stringifyRules = function stringifyRules(rules, selector, shouldWrap) {
  var flatCSS = rules.join('').replace(/^\s*\/\/.*$/gm, ''); // replace JS comments

  var cssString = selector && shouldWrap ? selector + ' { ' + flatCSS + ' }' : flatCSS;

  var css = stylis(shouldWrap ? '' : '.' + (selector || ''), cssString, false, false);

  return css;
};

//      
var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/* Some high number, usually 9-digit base-10. Map it to base-😎 */
var generateAlphabeticName = function generateAlphabeticName(code) {
  var lastDigit = chars[code % chars.length];
  return code > chars.length ? '' + generateAlphabeticName(Math.floor(code / chars.length)) + lastDigit : lastDigit;
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

/*

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance
- 'polyfills' on server side


// usage

import StyleSheet from 'glamor/lib/sheet'
let styleSheet = new StyleSheet()

styleSheet.inject()
- 'injects' the stylesheet into the page (or into memory if on server)

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents


*/

function last(arr) {
  return arr[arr.length - 1];
}

function sheetForTag(tag) {
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
}

var isBrowser = typeof document !== 'undefined';
var isDev = function (x) {
  return x === 'development' || !x;
}("development");
var isTest = "development" === 'test';

var oldIE = function () {
  if (isBrowser) {
    var div = document.createElement('div');
    div.innerHTML = '<!--[if lt IE 10]><i></i><![endif]-->';
    return div.getElementsByTagName('i').length === 1;
  }
}();

function makeStyleTag() {
  var tag = document.createElement('style');
  tag.type = 'text/css';
  tag.appendChild(document.createTextNode(''));
  (document.head || document.getElementsByTagName('head')[0]).appendChild(tag);
  return tag;
}

var StyleSheet$1 = function () {
  function StyleSheet() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$speedy = _ref.speedy,
        speedy = _ref$speedy === undefined ? !isDev && !isTest : _ref$speedy,
        _ref$maxLength = _ref.maxLength,
        maxLength = _ref$maxLength === undefined ? isBrowser && oldIE ? 4000 : 65000 : _ref$maxLength;

    classCallCheck(this, StyleSheet);

    this.isSpeedy = speedy; // the big drawback here is that the css won't be editable in devtools
    this.sheet = undefined;
    this.tags = [];
    this.maxLength = maxLength;
    this.ctr = 0;
  }

  createClass(StyleSheet, [{
    key: 'inject',
    value: function inject() {
      var _this = this;

      if (this.injected) {
        throw new Error('already injected stylesheet!');
      }
      if (isBrowser) {
        // this section is just weird alchemy I found online off many sources
        this.tags[0] = makeStyleTag();
        // this weirdness brought to you by firefox
        this.sheet = sheetForTag(this.tags[0]);
      } else {
        // server side 'polyfill'. just enough behavior to be useful.
        this.sheet = {
          cssRules: [],
          insertRule: function insertRule(rule) {
            // enough 'spec compliance' to be able to extract the rules later
            // in other words, just the cssText field
            var serverRule = { cssText: rule };
            _this.sheet.cssRules.push(serverRule);
            return { serverRule: serverRule, appendRule: function appendRule(newCss) {
                return serverRule.cssText += newCss;
              } };
          }
        };
      }
      this.injected = true;
    }
  }, {
    key: 'speedy',
    value: function speedy(bool) {
      if (this.ctr !== 0) {
        throw new Error('cannot change speedy mode after inserting any rule to sheet. Either call speedy(' + bool + ') earlier in your app, or call flush() before speedy(' + bool + ')');
      }
      this.isSpeedy = !!bool;
    }
  }, {
    key: '_insert',
    value: function _insert(rule) {
      // this weirdness for perf, and chrome's weird bug
      // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
      try {
        this.sheet.insertRule(rule, this.sheet.cssRules.length); // todo - correct index here
      } catch (e) {
        if (isDev) {
          // might need beter dx for this
          console.warn('whoops, illegal rule inserted', rule); //eslint-disable-line no-console
        }
      }
    }
  }, {
    key: 'insert',
    value: function insert(rule) {
      var insertedRule = void 0;

      if (isBrowser) {
        // this is the ultrafast version, works across browsers
        if (this.isSpeedy && this.sheet.insertRule) {
          this._insert(rule);
        } else {
          var textNode = document.createTextNode(rule);
          last(this.tags).appendChild(textNode);
          insertedRule = { textNode: textNode, appendRule: function appendRule(newCss) {
              return textNode.appendData(newCss);
            } };

          if (!this.isSpeedy) {
            // sighhh
            this.sheet = sheetForTag(last(this.tags));
          }
        }
      } else {
        // server side is pretty simple
        insertedRule = this.sheet.insertRule(rule);
      }

      this.ctr++;
      if (isBrowser && this.ctr % this.maxLength === 0) {
        this.tags.push(makeStyleTag());
        this.sheet = sheetForTag(last(this.tags));
      }
      return insertedRule;
    }
  }, {
    key: 'flush',
    value: function flush() {
      if (isBrowser) {
        this.tags.forEach(function (tag) {
          return tag.parentNode.removeChild(tag);
        });
        this.tags = [];
        this.sheet = null;
        this.ctr = 0;
        // todo - look for remnants in document.styleSheets
      } else {
        // simpler on server
        this.sheet.cssRules = [];
      }
      this.injected = false;
    }
  }, {
    key: 'rules',
    value: function rules() {
      if (!isBrowser) {
        return this.sheet.cssRules;
      }
      var arr = [];
      this.tags.forEach(function (tag) {
        return arr.splice.apply(arr, [arr.length, 0].concat(toConsumableArray(Array.from(sheetForTag(tag).cssRules))));
      });
      return arr;
    }
  }]);
  return StyleSheet;
}();

//      

/* Wraps glamor's stylesheet and exports a singleton for the rest
*  of the app to use. */

var StyleSheet$$1 = function () {
  function StyleSheet$$1() {
    classCallCheck(this, StyleSheet$$1);

    this.styleSheet = new StyleSheet$1({ speedy: false, maxLength: 40 });
  }

  createClass(StyleSheet$$1, [{
    key: 'inject',
    value: function inject() {
      return this.styleSheet.inject();
    }
  }, {
    key: 'insert',
    value: function insert(css) {
      return this.styleSheet.insert(css);
    }
  }, {
    key: 'reset',
    value: function reset() {
      if (this.styleSheet.sheet) this.styleSheet.flush();
    }
  }, {
    key: 'rules',
    value: function rules() {
      return this.styleSheet.rules();
    }
  }, {
    key: 'getCSS',
    value: function getCSS() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$min = _ref.min,
          min = _ref$min === undefined ? true : _ref$min;

      return this.styleSheet.sheet ? this.styleSheet.rules().map(function (rule) {
        return rule.cssText;
      }).join(min ? '' : '\n') : '';
    }
  }, {
    key: 'injected',
    get: function get() {
      return this.styleSheet.injected;
    }
  }]);
  return StyleSheet$$1;
}();

var styleSheet = new StyleSheet$$1();

//      

var LIMIT = 200;

var createWarnTooManyClasses = (function () {
  var generatedClasses = {};
  var warningSeen = false;

  return function (className, displayName) {
    if (!warningSeen) {
      generatedClasses[className] = true;
      if (Object.keys(generatedClasses).length >= LIMIT) {
        var latestRule = styleSheet.rules().find(function (s) {
          return s.selectorText && s.selectorText.indexOf('.' + className) !== -1;
        });
        // Unable to find latestRule in test environment.
        /* eslint-disable no-console, prefer-template */
        console.warn('Over ' + LIMIT + ' classes were generated for component ' + displayName + '. ' + 'Consider using style property for frequently changed styles.\n' + 'Example:\n' + '  const StyledComp = styled.div`width: 100%;`\n' + '  <StyledComp style={{ background: background }} />' + (latestRule ? '\nLatest generated class: ' + latestRule.cssText : ''));
        warningSeen = true;
        generatedClasses = {};
      }
    }
  };
});

//      
/* Trying to avoid the unknown-prop errors on styled components
 by filtering by React's attribute whitelist.
 */

/* Logic copied from ReactDOMUnknownPropertyHook */
var reactProps = {
  children: true,
  dangerouslySetInnerHTML: true,
  key: true,
  ref: true,
  autoFocus: true,
  defaultValue: true,
  valueLink: true,
  defaultChecked: true,
  checkedLink: true,
  innerHTML: true,
  suppressContentEditableWarning: true,
  onFocusIn: true,
  onFocusOut: true,
  className: true,

  /* List copied from https://facebook.github.io/react/docs/events.html */
  onCopy: true,
  onCut: true,
  onPaste: true,
  onCompositionEnd: true,
  onCompositionStart: true,
  onCompositionUpdate: true,
  onKeyDown: true,
  onKeyPress: true,
  onKeyUp: true,
  onFocus: true,
  onBlur: true,
  onChange: true,
  onInput: true,
  onSubmit: true,
  onClick: true,
  onContextMenu: true,
  onDoubleClick: true,
  onDrag: true,
  onDragEnd: true,
  onDragEnter: true,
  onDragExit: true,
  onDragLeave: true,
  onDragOver: true,
  onDragStart: true,
  onDrop: true,
  onMouseDown: true,
  onMouseEnter: true,
  onMouseLeave: true,
  onMouseMove: true,
  onMouseOut: true,
  onMouseOver: true,
  onMouseUp: true,
  onSelect: true,
  onTouchCancel: true,
  onTouchEnd: true,
  onTouchMove: true,
  onTouchStart: true,
  onScroll: true,
  onWheel: true,
  onAbort: true,
  onCanPlay: true,
  onCanPlayThrough: true,
  onDurationChange: true,
  onEmptied: true,
  onEncrypted: true,
  onEnded: true,
  onError: true,
  onLoadedData: true,
  onLoadedMetadata: true,
  onLoadStart: true,
  onPause: true,
  onPlay: true,
  onPlaying: true,
  onProgress: true,
  onRateChange: true,
  onSeeked: true,
  onSeeking: true,
  onStalled: true,
  onSuspend: true,
  onTimeUpdate: true,
  onVolumeChange: true,
  onWaiting: true,
  onLoad: true,
  onAnimationStart: true,
  onAnimationEnd: true,
  onAnimationIteration: true,
  onTransitionEnd: true,

  onCopyCapture: true,
  onCutCapture: true,
  onPasteCapture: true,
  onCompositionEndCapture: true,
  onCompositionStartCapture: true,
  onCompositionUpdateCapture: true,
  onKeyDownCapture: true,
  onKeyPressCapture: true,
  onKeyUpCapture: true,
  onFocusCapture: true,
  onBlurCapture: true,
  onChangeCapture: true,
  onInputCapture: true,
  onSubmitCapture: true,
  onClickCapture: true,
  onContextMenuCapture: true,
  onDoubleClickCapture: true,
  onDragCapture: true,
  onDragEndCapture: true,
  onDragEnterCapture: true,
  onDragExitCapture: true,
  onDragLeaveCapture: true,
  onDragOverCapture: true,
  onDragStartCapture: true,
  onDropCapture: true,
  onMouseDownCapture: true,
  onMouseEnterCapture: true,
  onMouseLeaveCapture: true,
  onMouseMoveCapture: true,
  onMouseOutCapture: true,
  onMouseOverCapture: true,
  onMouseUpCapture: true,
  onSelectCapture: true,
  onTouchCancelCapture: true,
  onTouchEndCapture: true,
  onTouchMoveCapture: true,
  onTouchStartCapture: true,
  onScrollCapture: true,
  onWheelCapture: true,
  onAbortCapture: true,
  onCanPlayCapture: true,
  onCanPlayThroughCapture: true,
  onDurationChangeCapture: true,
  onEmptiedCapture: true,
  onEncryptedCapture: true,
  onEndedCapture: true,
  onErrorCapture: true,
  onLoadedDataCapture: true,
  onLoadedMetadataCapture: true,
  onLoadStartCapture: true,
  onPauseCapture: true,
  onPlayCapture: true,
  onPlayingCapture: true,
  onProgressCapture: true,
  onRateChangeCapture: true,
  onSeekedCapture: true,
  onSeekingCapture: true,
  onStalledCapture: true,
  onSuspendCapture: true,
  onTimeUpdateCapture: true,
  onVolumeChangeCapture: true,
  onWaitingCapture: true,
  onLoadCapture: true,
  onAnimationStartCapture: true,
  onAnimationEndCapture: true,
  onAnimationIterationCapture: true,
  onTransitionEndCapture: true
};

/* From HTMLDOMPropertyConfig */
var htmlProps = {
  /**
   * Standard Properties
   */
  accept: true,
  acceptCharset: true,
  accessKey: true,
  action: true,
  allowFullScreen: true,
  allowTransparency: true,
  alt: true,
  // specifies target context for links with `preload` type
  as: true,
  async: true,
  autoComplete: true,
  // autoFocus is polyfilled/normalized by AutoFocusUtils
  // autoFocus: true,
  autoPlay: true,
  capture: true,
  cellPadding: true,
  cellSpacing: true,
  charSet: true,
  challenge: true,
  checked: true,
  cite: true,
  classID: true,
  className: true,
  cols: true,
  colSpan: true,
  content: true,
  contentEditable: true,
  contextMenu: true,
  controls: true,
  coords: true,
  crossOrigin: true,
  data: true, // For `<object />` acts as `src`.
  dateTime: true,
  default: true,
  defer: true,
  dir: true,
  disabled: true,
  download: true,
  draggable: true,
  encType: true,
  form: true,
  formAction: true,
  formEncType: true,
  formMethod: true,
  formNoValidate: true,
  formTarget: true,
  frameBorder: true,
  headers: true,
  height: true,
  hidden: true,
  high: true,
  href: true,
  hrefLang: true,
  htmlFor: true,
  httpEquiv: true,
  icon: true,
  id: true,
  inputMode: true,
  integrity: true,
  is: true,
  keyParams: true,
  keyType: true,
  kind: true,
  label: true,
  lang: true,
  list: true,
  loop: true,
  low: true,
  manifest: true,
  marginHeight: true,
  marginWidth: true,
  max: true,
  maxLength: true,
  media: true,
  mediaGroup: true,
  method: true,
  min: true,
  minLength: true,
  // Caution; `option.selected` is not updated if `select.multiple` is
  // disabled with `removeAttribute`.
  multiple: true,
  muted: true,
  name: true,
  nonce: true,
  noValidate: true,
  open: true,
  optimum: true,
  pattern: true,
  placeholder: true,
  playsInline: true,
  poster: true,
  preload: true,
  profile: true,
  radioGroup: true,
  readOnly: true,
  referrerPolicy: true,
  rel: true,
  required: true,
  reversed: true,
  role: true,
  rows: true,
  rowSpan: true,
  sandbox: true,
  scope: true,
  scoped: true,
  scrolling: true,
  seamless: true,
  selected: true,
  shape: true,
  size: true,
  sizes: true,
  span: true,
  spellCheck: true,
  src: true,
  srcDoc: true,
  srcLang: true,
  srcSet: true,
  start: true,
  step: true,
  style: true,
  summary: true,
  tabIndex: true,
  target: true,
  title: true,
  // Setting .type throws on non-<input> tags
  type: true,
  useMap: true,
  value: true,
  width: true,
  wmode: true,
  wrap: true,

  /**
   * RDFa Properties
   */
  about: true,
  datatype: true,
  inlist: true,
  prefix: true,
  // property is also supported for OpenGraph in meta tags.
  property: true,
  resource: true,
  typeof: true,
  vocab: true,

  /**
   * Non-standard Properties
   */
  // autoCapitalize and autoCorrect are supported in Mobile Safari for
  // keyboard hints.
  autoCapitalize: true,
  autoCorrect: true,
  // autoSave allows WebKit/Blink to persist values of input fields on page reloads
  autoSave: true,
  // color is for Safari mask-icon link
  color: true,
  // itemProp, itemScope, itemType are for
  // Microdata support. See http://schema.org/docs/gs.html
  itemProp: true,
  itemScope: true,
  itemType: true,
  // itemID and itemRef are for Microdata support as well but
  // only specified in the WHATWG spec document. See
  // https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
  itemID: true,
  itemRef: true,
  // results show looking glass icon and recent searches on input
  // search fields in WebKit/Blink
  results: true,
  // IE-only attribute that specifies security restrictions on an iframe
  // as an alternative to the sandbox attribute on IE<10
  security: true,
  // IE-only attribute that controls focus behavior
  unselectable: 0
};

var svgProps = {
  accentHeight: true,
  accumulate: true,
  additive: true,
  alignmentBaseline: true,
  allowReorder: true,
  alphabetic: true,
  amplitude: true,
  arabicForm: true,
  ascent: true,
  attributeName: true,
  attributeType: true,
  autoReverse: true,
  azimuth: true,
  baseFrequency: true,
  baseProfile: true,
  baselineShift: true,
  bbox: true,
  begin: true,
  bias: true,
  by: true,
  calcMode: true,
  capHeight: true,
  clip: true,
  clipPath: true,
  clipRule: true,
  clipPathUnits: true,
  colorInterpolation: true,
  colorInterpolationFilters: true,
  colorProfile: true,
  colorRendering: true,
  contentScriptType: true,
  contentStyleType: true,
  cursor: true,
  cx: true,
  cy: true,
  d: true,
  decelerate: true,
  descent: true,
  diffuseConstant: true,
  direction: true,
  display: true,
  divisor: true,
  dominantBaseline: true,
  dur: true,
  dx: true,
  dy: true,
  edgeMode: true,
  elevation: true,
  enableBackground: true,
  end: true,
  exponent: true,
  externalResourcesRequired: true,
  fill: true,
  fillOpacity: true,
  fillRule: true,
  filter: true,
  filterRes: true,
  filterUnits: true,
  floodColor: true,
  floodOpacity: true,
  focusable: true,
  fontFamily: true,
  fontSize: true,
  fontSizeAdjust: true,
  fontStretch: true,
  fontStyle: true,
  fontVariant: true,
  fontWeight: true,
  format: true,
  from: true,
  fx: true,
  fy: true,
  g1: true,
  g2: true,
  glyphName: true,
  glyphOrientationHorizontal: true,
  glyphOrientationVertical: true,
  glyphRef: true,
  gradientTransform: true,
  gradientUnits: true,
  hanging: true,
  horizAdvX: true,
  horizOriginX: true,
  ideographic: true,
  imageRendering: true,
  in: true,
  in2: true,
  intercept: true,
  k: true,
  k1: true,
  k2: true,
  k3: true,
  k4: true,
  kernelMatrix: true,
  kernelUnitLength: true,
  kerning: true,
  keyPoints: true,
  keySplines: true,
  keyTimes: true,
  lengthAdjust: true,
  letterSpacing: true,
  lightingColor: true,
  limitingConeAngle: true,
  local: true,
  markerEnd: true,
  markerMid: true,
  markerStart: true,
  markerHeight: true,
  markerUnits: true,
  markerWidth: true,
  mask: true,
  maskContentUnits: true,
  maskUnits: true,
  mathematical: true,
  mode: true,
  numOctaves: true,
  offset: true,
  opacity: true,
  operator: true,
  order: true,
  orient: true,
  orientation: true,
  origin: true,
  overflow: true,
  overlinePosition: true,
  overlineThickness: true,
  paintOrder: true,
  panose1: true,
  pathLength: true,
  patternContentUnits: true,
  patternTransform: true,
  patternUnits: true,
  pointerEvents: true,
  points: true,
  pointsAtX: true,
  pointsAtY: true,
  pointsAtZ: true,
  preserveAlpha: true,
  preserveAspectRatio: true,
  primitiveUnits: true,
  r: true,
  radius: true,
  refX: true,
  refY: true,
  renderingIntent: true,
  repeatCount: true,
  repeatDur: true,
  requiredExtensions: true,
  requiredFeatures: true,
  restart: true,
  result: true,
  rotate: true,
  rx: true,
  ry: true,
  scale: true,
  seed: true,
  shapeRendering: true,
  slope: true,
  spacing: true,
  specularConstant: true,
  specularExponent: true,
  speed: true,
  spreadMethod: true,
  startOffset: true,
  stdDeviation: true,
  stemh: true,
  stemv: true,
  stitchTiles: true,
  stopColor: true,
  stopOpacity: true,
  strikethroughPosition: true,
  strikethroughThickness: true,
  string: true,
  stroke: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeLinecap: true,
  strokeLinejoin: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true,
  surfaceScale: true,
  systemLanguage: true,
  tableValues: true,
  targetX: true,
  targetY: true,
  textAnchor: true,
  textDecoration: true,
  textRendering: true,
  textLength: true,
  to: true,
  transform: true,
  u1: true,
  u2: true,
  underlinePosition: true,
  underlineThickness: true,
  unicode: true,
  unicodeBidi: true,
  unicodeRange: true,
  unitsPerEm: true,
  vAlphabetic: true,
  vHanging: true,
  vIdeographic: true,
  vMathematical: true,
  values: true,
  vectorEffect: true,
  version: true,
  vertAdvY: true,
  vertOriginX: true,
  vertOriginY: true,
  viewBox: true,
  viewTarget: true,
  visibility: true,
  widths: true,
  wordSpacing: true,
  writingMode: true,
  x: true,
  xHeight: true,
  x1: true,
  x2: true,
  xChannelSelector: true,
  xlinkActuate: true,
  xlinkArcrole: true,
  xlinkHref: true,
  xlinkRole: true,
  xlinkShow: true,
  xlinkTitle: true,
  xlinkType: true,
  xmlBase: true,
  xmlns: true,
  xmlnsXlink: true,
  xmlLang: true,
  xmlSpace: true,
  y: true,
  y1: true,
  y2: true,
  yChannelSelector: true,
  z: true,
  zoomAndPan: true
};

/* From DOMProperty */
var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
var isCustomAttribute = RegExp.prototype.test.bind(new RegExp('^(data|aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$'));

var hasOwnProperty = {}.hasOwnProperty;
var validAttr = (function (name) {
  return hasOwnProperty.call(htmlProps, name) || hasOwnProperty.call(svgProps, name) || isCustomAttribute(name.toLowerCase()) || hasOwnProperty.call(reactProps, name);
});

//      


function isTag(target) /* : %checks */{
  return typeof target === 'string';
}

var index$3 = isFunction;

var toString = Object.prototype.toString;

function isFunction(fn) {
  var string = toString.call(fn);
  return string === '[object Function]' || typeof fn === 'function' && string !== '[object RegExp]' || typeof window !== 'undefined' && (
  // IE8 and below
  fn === window.setTimeout || fn === window.alert || fn === window.confirm || fn === window.prompt);
}

//      
/**
 * Creates a broadcast that can be listened to, i.e. simple event emitter
 *
 * @see https://github.com/ReactTraining/react-broadcast
 */

var createBroadcast = function createBroadcast(initialValue) {
  var listeners = [];
  var currentValue = initialValue;

  return {
    publish: function publish(value) {
      currentValue = value;
      listeners.forEach(function (listener) {
        return listener(currentValue);
      });
    },
    subscribe: function subscribe(listener) {
      listeners.push(listener);

      // Publish to this subscriber once immediately.
      listener(currentValue);

      return function () {
        listeners = listeners.filter(function (item) {
          return item !== listener;
        });
      };
    }
  };
};

//      
/* globals React$Element */
// NOTE: DO NOT CHANGE, changing this is a semver major change!
var CHANNEL = '__styled-components__';

/**
 * Provide a theme to an entire react component tree via context and event listeners (have to do
 * both context and event emitter as pure components block context updates)
 */

var ThemeProvider = function (_Component) {
  inherits(ThemeProvider, _Component);

  function ThemeProvider() {
    classCallCheck(this, ThemeProvider);

    var _this = possibleConstructorReturn(this, (ThemeProvider.__proto__ || Object.getPrototypeOf(ThemeProvider)).call(this));

    _this.getTheme = _this.getTheme.bind(_this);
    return _this;
  }

  createClass(ThemeProvider, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      // If there is a ThemeProvider wrapper anywhere around this theme provider, merge this theme
      // with the outer theme
      if (this.context[CHANNEL]) {
        var subscribe = this.context[CHANNEL];
        this.unsubscribeToOuter = subscribe(function (theme) {
          _this2.outerTheme = theme;
        });
      }
      this.broadcast = createBroadcast(this.getTheme());
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return _extends({}, this.context, defineProperty({}, CHANNEL, this.broadcast.subscribe));
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.theme !== nextProps.theme) this.broadcast.publish(this.getTheme(nextProps.theme));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.context[CHANNEL]) {
        this.unsubscribeToOuter();
      }
    }

    // Get the theme from the props, supporting both (outerTheme) => {} as well as object notation

  }, {
    key: 'getTheme',
    value: function getTheme(passedTheme) {
      var theme = passedTheme || this.props.theme;
      if (index$3(theme)) {
        var mergedTheme = theme(this.outerTheme);
        if (!index(mergedTheme)) {
          throw new Error('[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!');
        }
        return mergedTheme;
      }
      if (!index(theme)) {
        throw new Error('[ThemeProvider] Please make your theme prop a plain object');
      }
      return _extends({}, this.outerTheme, theme);
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.children) {
        return null;
      }
      return React__default.Children.only(this.props.children);
    }
  }]);
  return ThemeProvider;
}(React.Component);

ThemeProvider.childContextTypes = defineProperty({}, CHANNEL, React.PropTypes.func.isRequired);
ThemeProvider.contextTypes = defineProperty({}, CHANNEL, React.PropTypes.func);

//      
var AbstractStyledComponent = function (_Component) {
  inherits(AbstractStyledComponent, _Component);

  function AbstractStyledComponent() {
    classCallCheck(this, AbstractStyledComponent);
    return possibleConstructorReturn(this, (AbstractStyledComponent.__proto__ || Object.getPrototypeOf(AbstractStyledComponent)).apply(this, arguments));
  }

  return AbstractStyledComponent;
}(React.Component);

AbstractStyledComponent.contextTypes = defineProperty({}, CHANNEL, React.PropTypes.func);

//      

var _StyledComponent = (function (ComponentStyle, constructWithOptions) {
  /* We depend on components having unique IDs */
  var identifiers = {};
  var generateId = function generateId(_displayName) {
    var displayName = _displayName.replace(/[[\].#*$><+~=|^:(),"'`]/g, '-') // Replace all possible CSS selectors
    .replace(/--+/g, '-'); // Replace multiple -- with single -
    var nr = (identifiers[displayName] || 0) + 1;
    identifiers[displayName] = nr;
    var hash = ComponentStyle.generateName(displayName + nr);
    return displayName + '-' + hash;
  };

  var createStyledComponent = function createStyledComponent(target, options, rules) {
    var _options$displayName = options.displayName,
        displayName = _options$displayName === undefined ? isTag(target) ? 'styled.' + target : 'Styled(' + target.displayName + ')' : _options$displayName,
        _options$componentId = options.componentId,
        componentId = _options$componentId === undefined ? generateId(options.displayName || 'sc') : _options$componentId,
        _options$attrs = options.attrs,
        attrs = _options$attrs === undefined ? {} : _options$attrs,
        _options$rules = options.rules,
        extendingRules = _options$rules === undefined ? [] : _options$rules,
        _options$ParentCompon = options.ParentComponent,
        ParentComponent = _options$ParentCompon === undefined ? AbstractStyledComponent : _options$ParentCompon;

    var componentStyle = new ComponentStyle([].concat(toConsumableArray(extendingRules), toConsumableArray(rules)), componentId);

    var warnTooManyClasses = void 0;
    if (typeof process !== 'undefined' && "development" !== 'production') {
      warnTooManyClasses = createWarnTooManyClasses();
    }

    var StyledComponent = function (_ParentComponent) {
      inherits(StyledComponent, _ParentComponent);

      function StyledComponent() {
        var _ref;

        var _temp, _this, _ret;

        classCallCheck(this, StyledComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = StyledComponent.__proto__ || Object.getPrototypeOf(StyledComponent)).call.apply(_ref, [this].concat(args))), _this), _this.attrs = {}, _this.state = {
          theme: null,
          generatedClassName: ''
        }, _temp), possibleConstructorReturn(_this, _ret);
      }

      createClass(StyledComponent, [{
        key: 'buildExecutionContext',
        value: function buildExecutionContext(theme, props) {
          var context = _extends({}, props, { theme: theme });
          this.attrs = Object.keys(attrs).reduce(function (accum, key) {
            return _extends({}, accum, defineProperty({}, key, typeof attrs[key] === 'function' ? attrs[key](context) : attrs[key]));
          }, {});
          return _extends({}, context, this.attrs);
        }
      }, {
        key: 'generateAndInjectStyles',
        value: function generateAndInjectStyles(theme, props) {
          var executionContext = this.buildExecutionContext(theme, props);
          return componentStyle.generateAndInjectStyles(executionContext);
        }
      }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
          var _this2 = this;

          // If there is a theme in the context, subscribe to the event emitter. This
          // is necessary due to pure components blocking context updates, this circumvents
          // that by updating when an event is emitted
          if (this.context[CHANNEL]) {
            var subscribe = this.context[CHANNEL];
            this.unsubscribe = subscribe(function (nextTheme) {
              // This will be called once immediately

              // Props should take precedence over ThemeProvider, which should take precedence over
              // defaultProps, but React automatically puts defaultProps on props.
              var defaultProps = _this2.constructor.defaultProps;

              var isDefaultTheme = defaultProps && _this2.props.theme === defaultProps.theme;
              var theme = _this2.props.theme && !isDefaultTheme ? _this2.props.theme : nextTheme;
              var generatedClassName = _this2.generateAndInjectStyles(theme, _this2.props);
              _this2.setState({ theme: theme, generatedClassName: generatedClassName });
            });
          } else {
            var theme = this.props.theme || {};
            var generatedClassName = this.generateAndInjectStyles(theme, this.props);
            this.setState({ theme: theme, generatedClassName: generatedClassName });
          }
        }
      }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          var _this3 = this;

          this.setState(function (oldState) {
            // Props should take precedence over ThemeProvider, which should take precedence over
            // defaultProps, but React automatically puts defaultProps on props.
            var defaultProps = _this3.constructor.defaultProps;

            var isDefaultTheme = defaultProps && nextProps.theme === defaultProps.theme;
            var theme = nextProps.theme && !isDefaultTheme ? nextProps.theme : oldState.theme;
            var generatedClassName = _this3.generateAndInjectStyles(theme, nextProps);

            return { theme: theme, generatedClassName: generatedClassName };
          });
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          if (this.unsubscribe) {
            this.unsubscribe();
          }
        }
      }, {
        key: 'render',
        value: function render() {
          var _this4 = this;

          var _props = this.props,
              className = _props.className,
              children = _props.children,
              innerRef = _props.innerRef;
          var generatedClassName = this.state.generatedClassName;


          var propsForElement = _extends({}, this.attrs);
          /* Don't pass through non HTML tags through to HTML elements */
          Object.keys(this.props).filter(function (propName) {
            return !isTag(target) || validAttr(propName);
          }).forEach(function (propName) {
            propsForElement[propName] = _this4.props[propName];
          });
          propsForElement.className = [className, componentId, this.attrs.className, generatedClassName].filter(function (x) {
            return x;
          }).join(' ');
          if (innerRef) {
            propsForElement.ref = innerRef;
            delete propsForElement.innerRef;
          }

          if (typeof process !== 'undefined' && "development" !== 'production' && generatedClassName) {
            warnTooManyClasses(generatedClassName, StyledComponent.displayName);
          }
          return React.createElement(target, propsForElement, children);
        }
      }], [{
        key: 'extend',
        get: function get() {
          return StyledComponent.extendWith(target);
        }
      }]);
      return StyledComponent;
    }(ParentComponent);

    StyledComponent.displayName = displayName;
    StyledComponent.styledComponentId = componentId;
    StyledComponent.extendWith = function (tag) {
      var _ = options.displayName,
          __ = options.componentId,
          optionsToCopy = objectWithoutProperties(options, ['displayName', 'componentId']);

      return constructWithOptions(createStyledComponent, tag, _extends({}, optionsToCopy, { rules: rules, ParentComponent: StyledComponent }));
    };

    return StyledComponent;
  };

  return createStyledComponent;
});

var hash = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = doHash;
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
});

var hashStr = unwrapExports(hash);

//      
/*
 ComponentStyle is all the CSS-specific stuff, not
 the React-specific stuff.
 */
var _ComponentStyle = (function (nameGenerator, flatten, stringifyRules) {
  var inserted = {};

  var ComponentStyle = function () {
    function ComponentStyle(rules, componentId) {
      classCallCheck(this, ComponentStyle);

      this.rules = rules;
      this.componentId = componentId;
      if (!styleSheet.injected) styleSheet.inject();
      this.insertedRule = styleSheet.insert('.' + componentId + ' {}');
    }

    createClass(ComponentStyle, [{
      key: 'generateAndInjectStyles',


      /*
       * Flattens a rule set into valid CSS
       * Hashes it, wraps the whole chunk in a ._hashName {}
       * Parses that with PostCSS then runs PostCSS-Nested on it
       * Returns the hash to be injected on render()
       * */
      value: function generateAndInjectStyles(executionContext) {
        var flatCSS = flatten(this.rules, executionContext);
        var hash = hashStr(this.componentId + flatCSS.join(''));

        if (!inserted[hash]) {
          var selector = nameGenerator(hash);
          inserted[hash] = selector;

          var css = stringifyRules(flatCSS, selector, false);
          this.insertedRule.appendRule(css);
        }

        return inserted[hash];
      }
    }], [{
      key: 'generateName',
      value: function generateName(str) {
        return nameGenerator(hashStr(str));
      }
    }]);
    return ComponentStyle;
  }();

  return ComponentStyle;
});

//      

var _GlobalStyle = (function (flatten, stringifyRules) {
  var GlobalStyle = function () {
    function GlobalStyle(rules, selector) {
      classCallCheck(this, GlobalStyle);

      this.rules = rules;
      this.selector = selector;
    }

    createClass(GlobalStyle, [{
      key: 'generateAndInject',
      value: function generateAndInject() {
        if (!styleSheet.injected) styleSheet.inject();
        var flatRules = flatten(this.rules);
        var css = stringifyRules(flatRules, this.selector, true);
        styleSheet.insert(css);
      }
    }]);
    return GlobalStyle;
  }();

  return GlobalStyle;
});

//      
// Thanks to ReactDOMFactories for this handy list!

var domElements = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr',

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

var _keyframes = (function (nameGenerator, GlobalStyle, css) {
  return function (strings) {
    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    var rules = css.apply(undefined, [strings].concat(interpolations));
    var hash = hashStr(replaceWhitespace(JSON.stringify(rules)));
    var name = nameGenerator(hash);
    var keyframes = new GlobalStyle(rules, '@keyframes ' + name);
    keyframes.generateAndInject();
    return name;
  };
});

//      


var _injectGlobal = (function (GlobalStyle, css) {
  var injectGlobal = function injectGlobal(strings) {
    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    var globalStyle = new GlobalStyle(css.apply(undefined, [strings].concat(interpolations)));
    globalStyle.generateAndInject();
  };

  return injectGlobal;
});

//      


var _constructWithOptions = (function (css) {
  var constructWithOptions = function constructWithOptions(componentConstructor, tag) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    /* This is callable directly as a template function */
    var templateFunction = function templateFunction(strings) {
      for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        interpolations[_key - 1] = arguments[_key];
      }

      return componentConstructor(tag, options, css.apply(undefined, [strings].concat(interpolations)), templateFunction);
    };

    /* If config methods are called, wrap up a new template function and merge options */
    templateFunction.withConfig = function (config) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, config));
    };
    templateFunction.attrs = function (attrs) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, {
        attrs: _extends({}, options.attrs || {}, attrs) }));
    };

    return templateFunction;
  };

  return constructWithOptions;
});

//      
/* globals ReactClass */

var withTheme = (function (Component$$1) {
  var _class, _temp2;

  return _temp2 = _class = function (_React$Component) {
    inherits(_class, _React$Component);

    function _class() {
      var _ref;

      var _temp, _this, _ret;

      classCallCheck(this, _class);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(_class, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var _this2 = this;

        if (!this.context[CHANNEL]) {
          throw new Error('[withTheme] Please use ThemeProvider to be able to use withTheme');
        }

        var subscribe = this.context[CHANNEL];
        this.unsubscribe = subscribe(function (theme) {
          _this2.setState({ theme: theme });
        });
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (typeof this.unsubscribe === 'function') this.unsubscribe();
      }
    }, {
      key: 'render',
      value: function render() {
        var theme = this.state.theme;


        return React__default.createElement(Component$$1, _extends({ theme: theme }, this.props));
      }
    }]);
    return _class;
  }(React__default.Component), _class.contextTypes = defineProperty({}, CHANNEL, React__default.PropTypes.func), _temp2;
});

//      

/* Import singletons */
/* Import singleton constructors */
/* Import components */
/* Import Higher Order Components */
/* Instantiate singletons */
var GlobalStyle = _GlobalStyle(flatten, stringifyRules);
var ComponentStyle = _ComponentStyle(generateAlphabeticName, flatten, stringifyRules);
var constructWithOptions = _constructWithOptions(css);
var StyledComponent = _StyledComponent(ComponentStyle, constructWithOptions);

/* Instantiate exported singletons */
var keyframes = _keyframes(generateAlphabeticName, GlobalStyle, css);
var injectGlobal = _injectGlobal(GlobalStyle, css);
var styled = _styled(StyledComponent, constructWithOptions);

exports['default'] = styled;
exports.css = css;
exports.keyframes = keyframes;
exports.injectGlobal = injectGlobal;
exports.ThemeProvider = ThemeProvider;
exports.withTheme = withTheme;
exports.styleSheet = styleSheet;

Object.defineProperty(exports, '__esModule', { value: true });

})));
