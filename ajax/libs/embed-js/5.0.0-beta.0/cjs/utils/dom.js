"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.insert = undefined;

var pushEmbedContent = function () {
	var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(text, options, pluginOptions, index) {
		var _this = this;

		var regex;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						regex = pluginOptions.regex;
						_context2.next = 3;
						return (0, _stringReplaceAsync2.default)(text, regex, _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
							for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
								args[_key] = arguments[_key];
							}

							return regeneratorRuntime.wrap(function _callee$(_context) {
								while (1) {
									switch (_context.prev = _context.next) {
										case 0:
											_context.t0 = options._embeds;
											_context.next = 3;
											return getTemplate(args, options, pluginOptions);

										case 3:
											_context.t1 = _context.sent;
											_context.t2 = index || args.find(function (x) {
												return typeof x === "number";
											});
											_context.t3 = {
												content: _context.t1,
												index: _context.t2
											};

											_context.t0.push.call(_context.t0, _context.t3);

											saveServiceName(options, pluginOptions, args[0]);

										case 8:
										case "end":
											return _context.stop();
									}
								}
							}, _callee, _this);
						})));

					case 3:
						return _context2.abrupt("return", options);

					case 4:
					case "end":
						return _context2.stop();
				}
			}
		}, _callee2, this);
	}));

	return function pushEmbedContent(_x2, _x3, _x4, _x5) {
		return _ref5.apply(this, arguments);
	};
}();

/**
 * Save the embed code into an array that can be added later to the end of original string
 * @param opts
 * @param pluginOptions
 */


var saveEmbedData = function () {
	var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(opts, pluginOptions) {
		var _this2 = this;

		var regex, options;
		return regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						regex = pluginOptions.regex;
						options = (0, _justExtend2.default)({}, opts);

						if (!isAnchorTagApplied(options.result)) {
							_context4.next = 7;
							break;
						}

						_context4.next = 5;
						return (0, _stringReplaceAsync2.default)(options.result, anchorRegex, function () {
							var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(match, url, index) {
								return regeneratorRuntime.wrap(function _callee3$(_context3) {
									while (1) {
										switch (_context3.prev = _context3.next) {
											case 0:
												if (isMatchPresent(regex, match, true)) {
													_context3.next = 2;
													break;
												}

												return _context3.abrupt("return", match);

											case 2:
												saveServiceName(options, pluginOptions, match);
												_context3.next = 5;
												return pushEmbedContent(url, options, pluginOptions, index);

											case 5:
												options = _context3.sent;
												return _context3.abrupt("return", match);

											case 7:
											case "end":
												return _context3.stop();
										}
									}
								}, _callee3, _this2);
							}));

							return function (_x8, _x9, _x10) {
								return _ref8.apply(this, arguments);
							};
						}());

					case 5:
						_context4.next = 8;
						break;

					case 7:
						options = pushEmbedContent(options.result, options, pluginOptions);

					case 8:
						return _context4.abrupt("return", options);

					case 9:
					case "end":
						return _context4.stop();
				}
			}
		}, _callee4, this);
	}));

	return function saveEmbedData(_x6, _x7) {
		return _ref7.apply(this, arguments);
	};
}();

var getTemplate = function () {
	var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(args, options, pluginOptions) {
		var _process, template, data;

		return regeneratorRuntime.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						_process = pluginOptions._process, template = pluginOptions.template;
						data = void 0;

						if (!_process) {
							_context5.next = 6;
							break;
						}

						_context5.next = 5;
						return _process(args, options, pluginOptions);

					case 5:
						data = _context5.sent;

					case 6:
						return _context5.abrupt("return", template(args, options, pluginOptions, data));

					case 7:
					case "end":
						return _context5.stop();
				}
			}
		}, _callee5, this);
	}));

	return function getTemplate(_x11, _x12, _x13) {
		return _ref9.apply(this, arguments);
	};
}();

var basicReplace = function () {
	var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(options, pluginOptions) {
		var _this3 = this;

		var result, replaceUrl, regex, _replaceAnyways;

		return regeneratorRuntime.wrap(function _callee7$(_context7) {
			while (1) {
				switch (_context7.prev = _context7.next) {
					case 0:
						result = options.result, replaceUrl = options.replaceUrl;
						regex = pluginOptions.regex, _replaceAnyways = pluginOptions._replaceAnyways;
						return _context7.abrupt("return", (0, _stringReplaceAsync2.default)(result, regex, _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
							for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
								args[_key2] = arguments[_key2];
							}

							return regeneratorRuntime.wrap(function _callee6$(_context6) {
								while (1) {
									switch (_context6.prev = _context6.next) {
										case 0:
											saveServiceName(options, pluginOptions, args[0]);

											if (!(replaceUrl || _replaceAnyways)) {
												_context6.next = 5;
												break;
											}

											_context6.t0 = getTemplate(args, options, pluginOptions);
											_context6.next = 10;
											break;

										case 5:
											_context6.t1 = args[0] + " ";
											_context6.next = 8;
											return getTemplate(args, options, pluginOptions);

										case 8:
											_context6.t2 = _context6.sent;
											_context6.t0 = _context6.t1 + _context6.t2;

										case 10:
											return _context6.abrupt("return", _context6.t0);

										case 11:
										case "end":
											return _context6.stop();
									}
								}
							}, _callee6, _this3);
						}))));

					case 3:
					case "end":
						return _context7.stop();
				}
			}
		}, _callee7, this);
	}));

	return function basicReplace(_x14, _x15) {
		return _ref10.apply(this, arguments);
	};
}();

var anchorReplace = function () {
	var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(options, pluginOptions) {
		var _this4 = this;

		var result, replaceUrl, regex, _replaceAnyways;

		return regeneratorRuntime.wrap(function _callee10$(_context10) {
			while (1) {
				switch (_context10.prev = _context10.next) {
					case 0:
						result = options.result, replaceUrl = options.replaceUrl;
						regex = pluginOptions.regex, _replaceAnyways = pluginOptions._replaceAnyways;
						return _context10.abrupt("return", (0, _stringReplaceAsync2.default)(result, anchorRegex, function () {
							var _ref13 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(match, url) {
								var args, t;
								return regeneratorRuntime.wrap(function _callee9$(_context9) {
									while (1) {
										switch (_context9.prev = _context9.next) {
											case 0:
												if (isMatchPresent(regex, url, true)) {
													_context9.next = 2;
													break;
												}

												return _context9.abrupt("return", match);

											case 2:
												if (replaceUrl || _replaceAnyways) {
													_context9.next = 9;
													break;
												}

												args = getMatch(regex, url);

												saveServiceName(options, pluginOptions, args[0]);
												_context9.next = 7;
												return getTemplate(args, options, pluginOptions);

											case 7:
												t = _context9.sent;
												return _context9.abrupt("return", args ? match + t : match);

											case 9:
												return _context9.abrupt("return", (0, _stringReplaceAsync2.default)(url, regex, _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
													for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
														args[_key3] = arguments[_key3];
													}

													return regeneratorRuntime.wrap(function _callee8$(_context8) {
														while (1) {
															switch (_context8.prev = _context8.next) {
																case 0:
																	saveServiceName(options, pluginOptions, args[0]);
																	return _context8.abrupt("return", getTemplate(args, options, pluginOptions));

																case 2:
																case "end":
																	return _context8.stop();
															}
														}
													}, _callee8, _this4);
												}))));

											case 10:
											case "end":
												return _context9.stop();
										}
									}
								}, _callee9, _this4);
							}));

							return function (_x18, _x19) {
								return _ref13.apply(this, arguments);
							};
						}()));

					case 3:
					case "end":
						return _context10.stop();
				}
			}
		}, _callee10, this);
	}));

	return function anchorReplace(_x16, _x17) {
		return _ref12.apply(this, arguments);
	};
}();

/**
 * Insert the embed code in the original string.
 * @param options
 * @param pluginOptions
 * @returns options
 */


var insert = exports.insert = function () {
	var _ref15 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(options, pluginOptions) {
		var result, inlineEmbed, _ignoreAnchorCheck, _ignoreInlineCheck, output;

		return regeneratorRuntime.wrap(function _callee11$(_context11) {
			while (1) {
				switch (_context11.prev = _context11.next) {
					case 0:
						result = options.result, inlineEmbed = options.inlineEmbed;
						_ignoreAnchorCheck = pluginOptions._ignoreAnchorCheck, _ignoreInlineCheck = pluginOptions._ignoreInlineCheck;

						if (!(!inlineEmbed && !_ignoreInlineCheck)) {
							_context11.next = 4;
							break;
						}

						return _context11.abrupt("return", saveEmbedData(options, pluginOptions));

					case 4:
						output = void 0;

						if (!(isAnchorTagApplied(result) && !_ignoreAnchorCheck)) {
							_context11.next = 11;
							break;
						}

						_context11.next = 8;
						return anchorReplace(options, pluginOptions);

					case 8:
						_context11.t0 = _context11.sent;
						_context11.next = 14;
						break;

					case 11:
						_context11.next = 13;
						return basicReplace(options, pluginOptions);

					case 13:
						_context11.t0 = _context11.sent;

					case 14:
						output = _context11.t0;
						return _context11.abrupt("return", (0, _justExtend2.default)({}, options, {
							result: output
						}));

					case 16:
					case "end":
						return _context11.stop();
				}
			}
		}, _callee11, this);
	}));

	return function insert(_x20, _x21) {
		return _ref15.apply(this, arguments);
	};
}();

exports.appendEmbedsAtEnd = appendEmbedsAtEnd;

var _justExtend = require("just-extend");

var _justExtend2 = _interopRequireDefault(_justExtend);

var _stringReplaceAsync = require("../utils/string-replace-async");

var _stringReplaceAsync2 = _interopRequireDefault(_stringReplaceAsync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var anchorRegex = /<a[^>]*>([^<]+)<\/a>/gi;

/**
 * Returns the matched regex data or whether the text has any matching string
 * @param regex Regex of the matching pattern
 * @param text String which has to be searched
 * @param test Return boolean or matching array
 * @returns {*} Boolean|Array
 */
function isMatchPresent(regex, text) {
	var test = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	return test ? regex.test(text) : text.match(regex);
}

/**
 * Tells wheteher the matching string is present inside an anchor tag
 * @param text
 * @returns {*} Boolean
 */
function isAnchorTagApplied(text) {
	return anchorRegex.test(text);
}

/**
 * Sort all the saved embeds by the position index they are present in the string.
 * @param embeds
 * @returns {Array.<T>}
 */
function sortEmbeds(embeds) {
	return embeds.sort(function (a, b) {
		return a.index - b.index;
	});
}

/**
 * Returns the embed code to be added at the end of original string.
 * @param embeds
 * @returns {string}
 */
function combineEmbedsText(embeds) {
	return sortEmbeds(embeds).map(function (_ref) {
		var content = _ref.content;
		return content;
	}).join(" ");
}

/**
 * Add the embed code at the end of string and return the new string
 * @param text - original string
 * @param _embeds - Array of embed code
 * @returns {string}
 */
function appendEmbedsAtEnd(_ref2) {
	var result = _ref2.result,
	    _embeds = _ref2._embeds;

	return result + " " + combineEmbedsText(_embeds);
}

function saveServiceName(_ref3, _ref4, match) {
	var _services = _ref3._services;
	var name = _ref4.name;

	if (!_services.filter(function (x) {
		return x.match === match;
	}).length) {
		_services.push({ name: name, match: match });
	}
}

function getMatch(regex, string) {
	regex.lastIndex = 0;
	var matches = regex.exec(string);
	regex.lastIndex = 0;
	return matches;
}