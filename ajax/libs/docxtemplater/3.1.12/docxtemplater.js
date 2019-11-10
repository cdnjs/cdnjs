window["docxtemplater"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function first(a) {
	return a[0];
}
function last(a) {
	return a[a.length - 1];
}
function XTError(message) {
	this.name = "GenericError";
	this.message = message;
	this.stack = new Error(message).stack;
}
XTError.prototype = Error.prototype;

function XTTemplateError(message) {
	this.name = "TemplateError";
	this.message = message;
	this.stack = new Error(message).stack;
}
XTTemplateError.prototype = new XTError();

function RenderingError(message) {
	this.name = "RenderingError";
	this.message = message;
	this.stack = new Error(message).stack;
}
RenderingError.prototype = new XTError();

function XTScopeParserError(message) {
	this.name = "ScopeParserError";
	this.message = message;
	this.stack = new Error(message).stack;
}
XTScopeParserError.prototype = new XTError();

function XTInternalError(message) {
	this.name = "InternalError";
	this.properties = { explanation: "InternalError" };
	this.message = message;
	this.stack = new Error(message).stack;
}
XTInternalError.prototype = new XTError();

function throwMultiError(errors) {
	var err = new XTTemplateError("Multi error");
	err.properties = {
		errors: errors,
		id: "multi_error",
		explanation: "The template has multiple errors"
	};
	throw err;
}

function getUnopenedTagException(options) {
	var err = new XTTemplateError("Unopened tag");
	err.properties = {
		xtag: last(options.xtag.split(" ")),
		id: "unopened_tag",
		context: options.xtag,
		offset: options.offset,
		lIndex: options.lIndex,
		explanation: "The tag beginning with \"" + options.xtag.substr(0, 10) + "\" is unopened"
	};
	return err;
}

function getUnclosedTagException(options) {
	var err = new XTTemplateError("Unclosed tag");
	err.properties = {
		xtag: first(options.xtag.split(" ")).substr(1),
		id: "unclosed_tag",
		context: options.xtag,
		offset: options.offset,
		lIndex: options.lIndex,
		explanation: "The tag beginning with \"" + options.xtag.substr(0, 10) + "\" is unclosed"
	};
	return err;
}

function throwXmlTagNotFound(options) {
	var err = new XTTemplateError("No tag \"" + options.element + "\" was found at the " + options.position);
	err.properties = {
		id: "no_xml_tag_found_at_" + options.position,
		explanation: "No tag \"" + options.element + "\" was found at the " + options.position,
		parsed: options.parsed,
		index: options.index,
		element: options.element
	};
	throw err;
}

function throwDecodeUTF8Error(s) {
	var err = new XTInternalError("End");
	err.properties = {
		id: "utf8_decode",
		data: s,
		explanation: "Could not decode string to UTF8"
	};
	throw err;
}

function throwContentMustBeString(type) {
	var err = new XTInternalError("Content must be a string");
	err.properties.id = "xmltemplater_content_must_be_string";
	err.properties.type = type;
	throw err;
}

function throwRawTagNotInParagraph(options) {
	var err = new XTTemplateError("Raw tag not in paragraph");
	var _options$part = options.part,
	    value = _options$part.value,
	    offset = _options$part.offset;

	err.properties = {
		id: "raw_tag_outerxml_invalid",
		explanation: "The tag \"" + value + "\" is not inside a paragraph",
		rootError: options.rootError,
		xtag: value,
		offset: offset,
		postparsed: options.postparsed,
		expandTo: options.expandTo,
		index: options.index
	};
	throw err;
}

function throwRawTagShouldBeOnlyTextInParagraph(options) {
	var err = new XTTemplateError("Raw tag should be the only text in paragraph");
	var tag = options.part.value;
	err.properties = {
		id: "raw_xml_tag_should_be_only_text_in_paragraph",
		explanation: "The tag \"" + tag + "\" should be the only text in this paragraph",
		xtag: options.part.value,
		offset: options.part.offset,
		paragraphParts: options.paragraphParts
	};
	throw err;
}

function getUnmatchedLoopException(options) {
	var location = options.location;

	var t = location === "start" ? "unclosed" : "unopened";
	var T = location === "start" ? "Unclosed" : "Unopened";

	var err = new XTTemplateError(T + " loop");
	var tag = options.part.value;
	err.properties = {
		id: t + "_loop",
		explanation: "The loop with tag \"" + tag + "\" is " + t,
		xtag: tag
	};
	return err;
}

function getClosingTagNotMatchOpeningTag(options) {
	var tags = options.tags;


	var err = new XTTemplateError("Closing tag does not match opening tag");
	err.properties = {
		id: "closing_tag_does_not_match_opening_tag",
		explanation: "The tag \"" + tags[0].value + "\" is closed by the tag \"" + tags[1].value + "\"",
		openingtag: tags[0].value,
		offset: [tags[0].offset, tags[1].offset],
		closingtag: tags[1].value
	};
	return err;
}

function getScopeCompilationError(_ref) {
	var tag = _ref.tag,
	    rootError = _ref.rootError;

	var err = new XTScopeParserError("Scope parser compilation failed");
	err.properties = {
		id: "scopeparser_compilation_failed",
		tag: tag,
		explanation: "The scope parser for the tag \"" + tag + "\" failed to compile",
		rootError: rootError
	};
	return err;
}

function getLoopPositionProducesInvalidXMLError(_ref2) {
	var tag = _ref2.tag;

	var err = new XTTemplateError("The position of the loop tags \"" + tag + "\" would produce invalid XML");
	err.properties = {
		tag: tag,
		id: "loop_position_invalid",
		explanation: "The tags \"" + tag + "\" are misplaced in the document, for example one of them is in a table and the other one outside the table"
	};
	return err;
}

function throwUnimplementedTagType(part) {
	var err = new XTTemplateError("Unimplemented tag type \"" + part.type + "\"");
	err.properties = {
		part: part,
		id: "unimplemented_tag_type"
	};
	throw err;
}

function throwMalformedXml(part) {
	var err = new XTInternalError("Malformed xml");
	err.properties = {
		part: part,
		id: "malformed_xml"
	};
	throw err;
}

function throwLocationInvalid(part) {
	throw new XTInternalError("Location should be one of \"start\" or \"end\" (given : " + part.location + ")");
}

function throwFileTypeNotHandled(fileType) {
	var err = new XTInternalError("The filetype \"" + fileType + "\" is not handled by docxtemplater");
	err.properties = {
		id: "filetype_not_handled",
		explanation: "The file you are trying to generate is of type \"" + fileType + "\", but only docx and pptx formats are handled"
	};
	throw err;
}

function throwFileTypeNotIdentified() {
	var err = new XTInternalError("The filetype for this file could not be identified, is this file corrupted ?");
	err.properties = {
		id: "filetype_not_identified"
	};
	throw err;
}

module.exports = {
	XTError: XTError,
	XTTemplateError: XTTemplateError,
	XTInternalError: XTInternalError,
	XTScopeParserError: XTScopeParserError,
	RenderingError: RenderingError,
	throwMultiError: throwMultiError,
	throwXmlTagNotFound: throwXmlTagNotFound,
	throwDecodeUTF8Error: throwDecodeUTF8Error,
	throwContentMustBeString: throwContentMustBeString,
	getUnmatchedLoopException: getUnmatchedLoopException,
	throwRawTagShouldBeOnlyTextInParagraph: throwRawTagShouldBeOnlyTextInParagraph,
	throwRawTagNotInParagraph: throwRawTagNotInParagraph,
	getClosingTagNotMatchOpeningTag: getClosingTagNotMatchOpeningTag,
	throwUnimplementedTagType: throwUnimplementedTagType,
	getScopeCompilationError: getScopeCompilationError,
	getUnopenedTagException: getUnopenedTagException,
	getUnclosedTagException: getUnclosedTagException,
	throwMalformedXml: throwMalformedXml,
	throwFileTypeNotIdentified: throwFileTypeNotIdentified,
	throwFileTypeNotHandled: throwFileTypeNotHandled,
	getLoopPositionProducesInvalidXMLError: getLoopPositionProducesInvalidXMLError,
	throwLocationInvalid: throwLocationInvalid
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = __webpack_require__(6),
    DOMParser = _require.DOMParser,
    XMLSerializer = _require.XMLSerializer;

var _require2 = __webpack_require__(0),
    throwXmlTagNotFound = _require2.throwXmlTagNotFound;

var DocUtils = {};

function parser(tag) {
	return _defineProperty({}, "get", function get(scope) {
		if (tag === ".") {
			return scope;
		}
		return scope[tag];
	});
}

DocUtils.defaults = {
	nullGetter: function nullGetter(part) {
		if (!part.module) {
			return "undefined";
		}
		if (part.module === "rawxml") {
			return "";
		}
		return "";
	},

	parser: parser,
	delimiters: {
		start: "{",
		end: "}"
	}
};

DocUtils.mergeObjects = function () {
	var resObj = {};
	var obj = void 0,
	    keys = void 0;
	for (var i = 0; i < arguments.length; i += 1) {
		obj = arguments[i];
		keys = Object.keys(obj);
		for (var j = 0; j < keys.length; j += 1) {
			resObj[keys[j]] = obj[keys[j]];
		}
	}
	return resObj;
};

DocUtils.xml2str = function (xmlNode) {
	var a = new XMLSerializer();
	return a.serializeToString(xmlNode);
};

DocUtils.str2xml = function (str, errorHandler) {
	var parser = new DOMParser({ errorHandler: errorHandler });
	return parser.parseFromString(str, "text/xml");
};

DocUtils.charMap = {
	"&": "&amp;",
	"'": "&apos;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;"
};

var regexStripRegexp = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;
DocUtils.escapeRegExp = function (str) {
	return str.replace(regexStripRegexp, "\\$&");
};

DocUtils.charMapRegexes = Object.keys(DocUtils.charMap).map(function (endChar) {
	var startChar = DocUtils.charMap[endChar];
	return {
		rstart: new RegExp(DocUtils.escapeRegExp(startChar), "g"),
		rend: new RegExp(DocUtils.escapeRegExp(endChar), "g"),
		start: startChar,
		end: endChar
	};
});

DocUtils.wordToUtf8 = function (string) {
	var r = void 0;
	for (var i = 0, l = DocUtils.charMapRegexes.length; i < l; i++) {
		r = DocUtils.charMapRegexes[i];
		string = string.replace(r.rstart, r.end);
	}
	return string;
};

DocUtils.utf8ToWord = function (string) {
	if (typeof string !== "string") {
		string = string.toString();
	}
	var r = void 0;
	for (var i = 0, l = DocUtils.charMapRegexes.length; i < l; i++) {
		r = DocUtils.charMapRegexes[i];
		string = string.replace(r.rend, r.start);
	}
	return string;
};

// This function is written with for loops for performance
DocUtils.concatArrays = function (arrays) {
	var result = [];
	for (var i = 0; i < arrays.length; i++) {
		var array = arrays[i];
		for (var j = 0, len = array.length; j < len; j++) {
			result.push(array[j]);
		}
	}
	return result;
};

var spaceRegexp = new RegExp(String.fromCharCode(160), "g");
DocUtils.convertSpaces = function (s) {
	return s.replace(spaceRegexp, " ");
};

DocUtils.pregMatchAll = function (regex, content) {
	/* regex is a string, content is the content. It returns an array of all matches with their offset, for example:
 	 regex=la
 	 content=lolalolilala
 returns: [{array: {0: 'la'},offset: 2},{array: {0: 'la'},offset: 8},{array: {0: 'la'} ,offset: 10}]
 */
	var matchArray = [];
	var match = void 0;
	while ((match = regex.exec(content)) != null) {
		matchArray.push({ array: match, offset: match.index });
	}
	return matchArray;
};

DocUtils.getRight = function (parsed, element, index) {
	for (var i = index, l = parsed.length; i < l; i++) {
		var part = parsed[i];
		if (part.value === "</" + element + ">") {
			return i;
		}
	}
	throwXmlTagNotFound({ position: "right", element: element, parsed: parsed, index: index });
};

DocUtils.getLeft = function (parsed, element, index) {
	for (var i = index; i >= 0; i--) {
		var part = parsed[i];
		if (part.value.indexOf("<" + element) === 0 && [">", " "].indexOf(part.value[element.length + 1]) !== -1) {
			return i;
		}
	}
	throwXmlTagNotFound({ position: "left", element: element, parsed: parsed, index: index });
};

module.exports = DocUtils;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function emptyFun() {}
function identity(i) {
	return i;
}
module.exports = function (module) {
	var defaults = {
		set: emptyFun,
		parse: emptyFun,
		render: emptyFun,
		getTraits: emptyFun,
		optionsTransformer: identity,
		errorsTransformer: identity,
		getRenderedMap: identity,
		postparse: identity,
		on: emptyFun
	};
	if (Object.keys(defaults).every(function (key) {
		return !module[key];
	})) {
		throw new Error("This module cannot be wrapped, because it doesn't define any of the necessary functions");
	}
	Object.keys(defaults).forEach(function (key) {
		module[key] = module[key] || defaults[key];
	});
	return module;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(1),
    getRight = _require.getRight,
    getLeft = _require.getLeft,
    concatArrays = _require.concatArrays;

var _require2 = __webpack_require__(0),
    XTTemplateError = _require2.XTTemplateError,
    throwRawTagNotInParagraph = _require2.throwRawTagNotInParagraph,
    getLoopPositionProducesInvalidXMLError = _require2.getLoopPositionProducesInvalidXMLError;

function lastTagIsOpenTag(array, tag) {
	if (array.length === 0) {
		return false;
	}
	var lastTag = array[array.length - 1];
	var innerLastTag = lastTag.tag.substr(1);
	var innerCurrentTag = tag.substr(2, tag.length - 3);
	return innerLastTag.indexOf(innerCurrentTag) === 0;
}

function addTag(array, tag) {
	array.push({ tag: tag });
	return array;
}

function getListXmlElements(parts) {
	/*
 get the different closing and opening tags between two texts (doesn't take into account tags that are opened then closed (those that are closed then opened are returned)):
 returns:[{"tag":"</w:r>","offset":13},{"tag":"</w:p>","offset":265},{"tag":"</w:tc>","offset":271},{"tag":"<w:tc>","offset":828},{"tag":"<w:p>","offset":883},{"tag":"<w:r>","offset":1483}]
 */
	var tags = parts.filter(function (part) {
		return part.type === "tag";
	}).map(function (part) {
		return part.value;
	});

	var result = [];

	for (var i = 0, tag; i < tags.length; i++) {
		tag = tags[i];
		// closing tag
		if (tag[1] === "/") {
			if (lastTagIsOpenTag(result, tag)) {
				result.pop();
			} else {
				result = addTag(result, tag);
			}
		} else if (tag[tag.length - 1] !== "/") {
			result = addTag(result, tag);
		}
	}
	return result;
}

function has(name, xmlElements) {
	for (var i = 0; i < xmlElements.length; i++) {
		var xmlElement = xmlElements[i];
		if (xmlElement.tag.indexOf(name) === 0) {
			return true;
		}
	}
	return false;
}

function getExpandToDefault(parts, pair) {
	var xmlElements = getListXmlElements(parts);
	var closingTagCount = xmlElements.filter(function (xmlElement) {
		return xmlElement.tag[1] === "/";
	}).length;
	var startingTagCount = xmlElements.filter(function (xmlElement) {
		var tag = xmlElement.tag;

		return tag[1] !== "/" && tag[tag.length - 2] !== "/";
	}).length;
	if (closingTagCount !== startingTagCount) {
		return {
			error: getLoopPositionProducesInvalidXMLError({ tag: pair[0].part.value })
		};
	}

	if (has("<w:tc", xmlElements)) {
		return { value: "w:tr" };
	}
	if (has("<a:tc", xmlElements)) {
		return { value: "a:tr" };
	}
	return { value: false };
}

function expandOne(part, postparsed, options) {
	var expandTo = part.expandTo || options.expandTo;
	var index = postparsed.indexOf(part);
	if (!expandTo) {
		return postparsed;
	}
	var right = void 0,
	    left = void 0;
	try {
		right = getRight(postparsed, expandTo, index);
		left = getLeft(postparsed, expandTo, index);
	} catch (rootError) {
		if (rootError instanceof XTTemplateError) {
			throwRawTagNotInParagraph({ part: part, rootError: rootError, postparsed: postparsed, expandTo: expandTo, index: index });
		}
		throw rootError;
	}
	var leftParts = postparsed.slice(left, index);
	var rightParts = postparsed.slice(index + 1, right + 1);
	var inner = options.getInner({ index: index, part: part, leftParts: leftParts, rightParts: rightParts, left: left, right: right, postparsed: postparsed });
	if (!inner.length) {
		inner.expanded = [leftParts, rightParts];
		inner = [inner];
	}
	return concatArrays([postparsed.slice(0, left), inner, postparsed.slice(right + 1)]);
}

function expandToOne(postparsed, options) {
	var errors = [];
	if (postparsed.errors) {
		errors = postparsed.errors;
		postparsed = postparsed.postparsed;
	}
	var expandToElements = postparsed.reduce(function (elements, part) {
		if (part.type === "placeholder" && part.module === options.moduleName) {
			elements.push(part);
		}
		return elements;
	}, []);

	expandToElements.forEach(function (part) {
		try {
			postparsed = expandOne(part, postparsed, options);
		} catch (error) {
			if (error instanceof XTTemplateError) {
				errors.push(error);
			} else {
				throw error;
			}
		}
	});
	return { postparsed: postparsed, errors: errors };
}

module.exports = {
	expandToOne: expandToOne,
	getExpandToDefault: getExpandToDefault
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// res class responsibility is to parse the XML.

var _require = __webpack_require__(1),
    pregMatchAll = _require.pregMatchAll;

function handleRecursiveCase(res) {
	/*
 	 Because xmlTemplater is recursive (meaning it can call it self), we need to handle special cases where the XML is not valid:
 	 For example with res string "I am</w:t></w:r></w:p><w:p><w:r><w:t>sleeping",
 	 - we need to match also the string that is inside an implicit <w:t> (that's the role of replacerUnshift) (in res case 'I am')
 	 - we need to match the string that is at the right of a <w:t> (that's the role of replacerPush) (in res case 'sleeping')
 	 the test: describe "scope calculation" it "should compute the scope between 2 <w:t>" makes sure that res part of code works
 	 It should even work if they is no XML at all, for example if the code is just "I am sleeping", in res case however, they should only be one match
 	 */

	function replacerUnshift() {
		var pn = { array: Array.prototype.slice.call(arguments) };
		pn.array.shift();
		var match = pn.array[0] + pn.array[1];
		// add match so that pn[0] = whole match, pn[1]= first parenthesis,...
		pn.array.unshift(match);
		pn.array.pop();
		var offset = pn.array.pop();
		pn.offset = offset;
		pn.first = true;
		// add at the beginning
		res.matches.unshift(pn);
	}

	if (res.content.indexOf("<") === -1 && res.content.indexOf(">") === -1) {
		res.content.replace(/^()([^<>]*)$/, replacerUnshift);
	}

	var r = new RegExp("^()([^<]+)</(?:" + res.tagsXmlArrayJoined + ")>");
	res.content.replace(r, replacerUnshift);

	function replacerPush() {
		var pn = { array: Array.prototype.slice.call(arguments) };
		pn.array.pop();
		var offset = pn.array.pop();
		pn.offset = offset;
		pn.last = true;
		if (pn.array[0].indexOf("/>") !== -1) {
			return;
		}
		// add at the end
		res.matches.push(pn);
	}

	r = new RegExp("(<(?:" + res.tagsXmlArrayJoined + ")[^>]*>)([^>]+)$");
	res.content.replace(r, replacerPush);
	return res;
}

module.exports = function xmlMatcher(content, tagsXmlArray) {
	var res = {};
	res.content = content;
	res.tagsXmlArray = tagsXmlArray;
	res.tagsXmlArrayJoined = res.tagsXmlArray.join("|");
	var regexp = new RegExp("(?:(<(?:" + res.tagsXmlArrayJoined + ")[^>]*>)([^<>]*)</(?:" + res.tagsXmlArrayJoined + ")>)|(<(?:" + res.tagsXmlArrayJoined + ")[^>]*/>)", "g");
	res.matches = pregMatchAll(regexp, res.content);
	return handleRecursiveCase(res);
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DocUtils = __webpack_require__(1);
DocUtils.traits = __webpack_require__(3);
DocUtils.moduleWrapper = __webpack_require__(2);
var defaults = DocUtils.defaults,
    str2xml = DocUtils.str2xml,
    xml2str = DocUtils.xml2str,
    moduleWrapper = DocUtils.moduleWrapper,
    concatArrays = DocUtils.concatArrays;

var _require = __webpack_require__(0),
    XTInternalError = _require.XTInternalError,
    throwFileTypeNotIdentified = _require.throwFileTypeNotIdentified,
    throwFileTypeNotHandled = _require.throwFileTypeNotHandled;

var Docxtemplater = function () {
	function Docxtemplater() {
		_classCallCheck(this, Docxtemplater);

		if (arguments.length > 0) {
			throw new Error("The constructor with parameters has been removed in docxtemplater 3.0, please check the upgrade guide.");
		}
		this.compiled = {};
		this.modules = [];
		this.setOptions({});
	}

	_createClass(Docxtemplater, [{
		key: "setModules",
		value: function setModules(obj) {
			this.modules.forEach(function (module) {
				module.set(obj);
			});
		}
	}, {
		key: "sendEvent",
		value: function sendEvent(eventName) {
			this.modules.forEach(function (module) {
				module.on(eventName);
			});
		}
	}, {
		key: "attachModule",
		value: function attachModule(module) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var prefix = options.prefix;

			if (prefix) {
				module.prefix = prefix;
			}
			this.modules.push(moduleWrapper(module));
			return this;
		}
	}, {
		key: "setOptions",
		value: function setOptions(options) {
			var _this = this;

			this.options = options;
			Object.keys(defaults).forEach(function (key) {
				var defaultValue = defaults[key];
				_this[key] = _this.options[key] != null ? _this.options[key] : defaultValue;
			});
			if (this.zip) {
				this.updateFileTypeConfig();
			}
			return this;
		}
	}, {
		key: "loadZip",
		value: function loadZip(zip) {
			if (zip.loadAsync) {
				throw new XTInternalError("Docxtemplater doesn't handle JSZip version >=3, see changelog");
			}
			this.zip = zip;
			this.updateFileTypeConfig();
			return this;
		}
	}, {
		key: "compileFile",
		value: function compileFile(fileName) {
			var currentFile = this.createTemplateClass(fileName);
			currentFile.parse();
			this.compiled[fileName] = currentFile;
		}
	}, {
		key: "compile",
		value: function compile() {
			var _this2 = this;

			if (Object.keys(this.compiled).length) {
				return this;
			}

			this.options.xmlFileNames = [];
			this.modules = concatArrays([this.fileTypeConfig.baseModules.map(function (moduleFunction) {
				return moduleFunction();
			}), this.modules]);
			this.options = this.modules.reduce(function (options, module) {
				return module.optionsTransformer(options, _this2);
			}, this.options);
			this.xmlDocuments = this.options.xmlFileNames.reduce(function (xmlDocuments, fileName) {
				var content = _this2.zip.files[fileName].asText();
				xmlDocuments[fileName] = str2xml(content);
				return xmlDocuments;
			}, {});
			this.setModules({ zip: this.zip, xmlDocuments: this.xmlDocuments, data: this.data });
			this.getTemplatedFiles();
			this.setModules({ compiled: this.compiled });
			// Loop inside all templatedFiles (ie xml files with content).
			// Sometimes they don't exist (footer.xml for example)
			this.templatedFiles.forEach(function (fileName) {
				if (_this2.zip.files[fileName] != null) {
					_this2.compileFile(fileName);
				}
			});
			return this;
		}
	}, {
		key: "updateFileTypeConfig",
		value: function updateFileTypeConfig() {
			var _this3 = this;

			var fileTypeIdentifiers = {
				docx: "word/document.xml",
				pptx: "ppt/presentation.xml",
				odt: "mimetype"
			};

			var fileType = Object.keys(fileTypeIdentifiers).reduce(function (fileType, key) {
				if (fileType) {
					return fileType;
				}
				if (_this3.zip.files[fileTypeIdentifiers[key]]) {
					return key;
				}
				return fileType;
			}, null);

			if (fileType === "odt") {
				throwFileTypeNotHandled(fileType);
			}
			if (!fileType) {
				throwFileTypeNotIdentified();
			}
			this.fileType = fileType;
			this.fileTypeConfig = this.options.fileTypeConfig || Docxtemplater.FileTypeConfig[this.fileType];
			return this;
		}
	}, {
		key: "render",
		value: function render() {
			var _this4 = this;

			this.compile();
			this.mapper = this.modules.reduce(function (value, module) {
				return module.getRenderedMap(value);
			}, {});

			Object.keys(this.mapper).forEach(function (to) {
				var _mapper$to = _this4.mapper[to],
				    from = _mapper$to.from,
				    data = _mapper$to.data;

				var currentFile = _this4.compiled[from];
				currentFile.setTags(data);
				currentFile.render(to);
				_this4.zip.file(to, currentFile.content, { createFolders: true });
			});
			this.sendEvent("syncing-zip");
			this.syncZip();
			return this;
		}
	}, {
		key: "syncZip",
		value: function syncZip() {
			var _this5 = this;

			Object.keys(this.xmlDocuments).forEach(function (fileName) {
				_this5.zip.remove(fileName);
				var content = xml2str(_this5.xmlDocuments[fileName]);
				return _this5.zip.file(fileName, content, { createFolders: true });
			});
		}
	}, {
		key: "setData",
		value: function setData(data) {
			this.data = data;
			return this;
		}
	}, {
		key: "getZip",
		value: function getZip() {
			return this.zip;
		}
	}, {
		key: "createTemplateClass",
		value: function createTemplateClass(path) {
			var usedData = this.zip.files[path].asText();
			return this.createTemplateClassFromContent(usedData, path);
		}
	}, {
		key: "createTemplateClassFromContent",
		value: function createTemplateClassFromContent(content, filePath) {
			var _this6 = this;

			var xmltOptions = {
				filePath: filePath
			};
			Object.keys(defaults).forEach(function (key) {
				xmltOptions[key] = _this6[key];
			});
			xmltOptions.fileTypeConfig = this.fileTypeConfig;
			xmltOptions.modules = this.modules;
			return new Docxtemplater.XmlTemplater(content, xmltOptions);
		}
	}, {
		key: "getFullText",
		value: function getFullText(path) {
			return this.createTemplateClass(path || this.fileTypeConfig.textPath).getFullText();
		}
	}, {
		key: "getTemplatedFiles",
		value: function getTemplatedFiles() {
			this.templatedFiles = this.fileTypeConfig.getTemplatedFiles(this.zip);
			return this.templatedFiles;
		}
	}]);

	return Docxtemplater;
}();

Docxtemplater.DocUtils = DocUtils;
Docxtemplater.Errors = __webpack_require__(0);
Docxtemplater.XmlTemplater = __webpack_require__(7);
Docxtemplater.FileTypeConfig = __webpack_require__(12);
Docxtemplater.XmlMatcher = __webpack_require__(4);
module.exports = Docxtemplater;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = window;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(1),
    wordToUtf8 = _require.wordToUtf8,
    convertSpaces = _require.convertSpaces,
    defaults = _require.defaults;

var createScope = __webpack_require__(8);
var xmlMatcher = __webpack_require__(4);

var _require2 = __webpack_require__(0),
    throwMultiError = _require2.throwMultiError,
    throwContentMustBeString = _require2.throwContentMustBeString;

var Lexer = __webpack_require__(9);
var Parser = __webpack_require__(10);

var _require3 = __webpack_require__(11),
    _render = _require3.render;

function _getFullText(content, tagsXmlArray) {
	var matcher = xmlMatcher(content, tagsXmlArray);
	var result = matcher.matches.map(function (match) {
		return match.array[2];
	});
	return wordToUtf8(convertSpaces(result.join("")));
}

module.exports = function () {
	function XmlTemplater(content, options) {
		_classCallCheck(this, XmlTemplater);

		this.fromJson(options);
		this.setModules({ inspect: { filePath: this.filePath } });
		this.load(content);
	}

	_createClass(XmlTemplater, [{
		key: "load",
		value: function load(content) {
			if (typeof content !== "string") {
				throwContentMustBeString(typeof content === "undefined" ? "undefined" : _typeof(content));
			}
			this.content = content;
		}
	}, {
		key: "setTags",
		value: function setTags(tags) {
			this.tags = tags != null ? tags : {};
			this.scopeManager = createScope({ tags: this.tags, parser: this.parser });
			return this;
		}
	}, {
		key: "fromJson",
		value: function fromJson(options) {
			this.filePath = options.filePath;
			this.modules = options.modules;
			this.fileTypeConfig = options.fileTypeConfig;
			Object.keys(defaults).map(function (key) {
				this[key] = options[key] != null ? options[key] : defaults[key];
			}, this);
		}
	}, {
		key: "getFullText",
		value: function getFullText() {
			return _getFullText(this.content, this.fileTypeConfig.tagsXmlTextArray);
		}
	}, {
		key: "setModules",
		value: function setModules(obj) {
			this.modules.forEach(function (module) {
				module.set(obj);
			});
		}
	}, {
		key: "parse",
		value: function parse() {
			var allErrors = [];
			this.xmllexed = Lexer.xmlparse(this.content, { text: this.fileTypeConfig.tagsXmlTextArray, other: this.fileTypeConfig.tagsXmlLexedArray });
			this.setModules({ inspect: { xmllexed: this.xmllexed } });

			var _Lexer$parse = Lexer.parse(this.xmllexed, this.delimiters),
			    lexed = _Lexer$parse.lexed,
			    lexerErrors = _Lexer$parse.errors;

			allErrors = allErrors.concat(lexerErrors);
			this.lexed = lexed;
			this.setModules({ inspect: { lexed: this.lexed } });
			this.parsed = Parser.parse(this.lexed, this.modules);
			this.setModules({ inspect: { parsed: this.parsed } });

			var _Parser$postparse = Parser.postparse(this.parsed, this.modules),
			    postparsed = _Parser$postparse.postparsed,
			    postparsedErrors = _Parser$postparse.errors;

			this.postparsed = postparsed;
			this.setModules({ inspect: { postparsed: this.postparsed } });
			allErrors = allErrors.concat(postparsedErrors);
			this.errorChecker(allErrors);
			return this;
		}
	}, {
		key: "errorChecker",
		value: function errorChecker(errors) {
			var _this = this;

			if (errors.length) {
				this.modules.forEach(function (module) {
					errors = module.errorsTransformer(errors);
				});
				errors.forEach(function (error) {
					error.properties.file = _this.filePath;
				});
				throwMultiError(errors);
			}
		}
		/*
  content is the whole content to be tagged
  scope is the current scope
  returns the new content of the tagged content
  */

	}, {
		key: "render",
		value: function render(to) {
			this.filePath = to;
			var options = {
				compiled: this.postparsed,
				tags: this.tags,
				modules: this.modules,
				parser: this.parser,
				nullGetter: this.nullGetter,
				filePath: this.filePath,
				render: _render
			};
			options.scopeManager = createScope(options);

			var _render2 = _render(options),
			    errors = _render2.errors,
			    parts = _render2.parts;

			this.errorChecker(errors);
			this.content = parts.join("");
			this.setModules({ inspect: { content: this.content } });
			return this;
		}
	}]);

	return XmlTemplater;
}();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(0),
    XTScopeParserError = _require.XTScopeParserError;

// This class responsibility is to manage the scope


var ScopeManager = function () {
	function ScopeManager(options) {
		_classCallCheck(this, ScopeManager);

		this.scopePath = options.scopePath;
		this.scopeList = options.scopeList;
		this.parser = options.parser;
	}

	_createClass(ScopeManager, [{
		key: "loopOver",
		value: function loopOver(tag, callback, inverted) {
			inverted = inverted || false;
			return this.loopOverValue(this.getValue(tag), callback, inverted);
		}
	}, {
		key: "functorIfInverted",
		value: function functorIfInverted(inverted, functor, value) {
			if (inverted) {
				functor(value);
			}
		}
	}, {
		key: "isValueFalsy",
		value: function isValueFalsy(value, type) {
			return value == null || !value || type === "[object Array]" && value.length === 0;
		}
	}, {
		key: "loopOverValue",
		value: function loopOverValue(value, functor, inverted) {
			var type = Object.prototype.toString.call(value);
			var currentValue = this.scopeList[this.num];
			if (this.isValueFalsy(value, type)) {
				return this.functorIfInverted(inverted, functor, currentValue);
			}
			if (type === "[object Array]") {
				for (var i = 0, scope; i < value.length; i++) {
					scope = value[i];
					this.functorIfInverted(!inverted, functor, scope);
				}
				return;
			}
			if (type === "[object Object]") {
				return this.functorIfInverted(!inverted, functor, value);
			}
			return this.functorIfInverted(!inverted, functor, currentValue);
		}
	}, {
		key: "getValue",
		value: function getValue(tag, num) {
			// search in the scopes (in reverse order) and keep the first defined value
			this.num = num == null ? this.scopeList.length - 1 : num;
			var err = void 0;
			var result = void 0;
			var scope = this.scopeList[this.num];
			var parser = this.parser(tag, { scopePath: this.scopePath });
			try {
				result = parser.get(scope, { num: this.num, scopeList: this.scopeList });
			} catch (error) {
				err = new XTScopeParserError("Scope parser execution failed");
				err.properties = {
					id: "scopeparser_execution_failed",
					explanation: "The scope parser for the tag " + tag + " failed to execute",
					scope: scope,
					tag: tag,
					rootError: error
				};
				throw err;
			}
			if (result == null && this.num > 0) {
				return this.getValue(tag, this.num - 1);
			}
			return result;
		}
	}, {
		key: "createSubScopeManager",
		value: function createSubScopeManager(scope, tag) {
			return new ScopeManager({
				parser: this.parser,
				scopeList: this.scopeList.concat(scope),
				scopePath: this.scopePath.concat(tag)
			});
		}
	}]);

	return ScopeManager;
}();

module.exports = function (options) {
	options.scopePath = [];
	options.scopeList = [options.tags];
	return new ScopeManager(options);
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    getUnclosedTagException = _require.getUnclosedTagException,
    getUnopenedTagException = _require.getUnopenedTagException,
    throwMalformedXml = _require.throwMalformedXml;

var _require2 = __webpack_require__(1),
    concatArrays = _require2.concatArrays;

function inRange(range, match) {
	return range[0] <= match.offset && match.offset < range[1];
}

function updateInTextTag(part, inTextTag) {
	if (part.type === "tag" && part.position === "start" && part.text) {
		if (inTextTag) {
			throwMalformedXml(part);
		}
		return true;
	}
	if (part.type === "tag" && part.position === "end" && part.text) {
		if (!inTextTag) {
			throwMalformedXml(part);
		}
		return false;
	}
	return inTextTag;
}

function offsetSort(a, b) {
	return a.offset - b.offset;
}

function getTag(tag) {
	var position = "start";
	var start = 1;
	if (tag[tag.length - 2] === "/") {
		position = "selfclosing";
	}
	if (tag[1] === "/") {
		start = 2;
		position = "end";
	}
	var index = tag.indexOf(" ");
	var end = index === -1 ? tag.length - 1 : index;
	return {
		tag: tag.slice(start, end),
		position: position
	};
}

function tagMatcher(content, textMatchArray, othersMatchArray) {
	var cursor = 0;
	var contentLength = content.length;
	var allMatches = concatArrays([textMatchArray.map(function (tag) {
		return { tag: tag, text: true };
	}), othersMatchArray.map(function (tag) {
		return { tag: tag, text: false };
	})]).reduce(function (allMatches, t) {
		allMatches[t.tag] = t.text;
		return allMatches;
	}, {});
	var totalMatches = [];

	while (cursor < contentLength) {
		cursor = content.indexOf("<", cursor);
		if (cursor === -1) {
			break;
		}
		var offset = cursor;
		cursor = content.indexOf(">", cursor);
		var tagText = content.slice(offset, cursor + 1);

		var _getTag = getTag(tagText),
		    tag = _getTag.tag,
		    position = _getTag.position;

		var text = allMatches[tag];
		if (text == null) {
			continue;
		}
		totalMatches.push({ type: "tag", position: position, text: text, offset: offset, value: tagText, tag: tag });
	}

	return totalMatches;
}

function getDelimiterErrors(delimiterMatches, fullText, ranges) {
	if (delimiterMatches.length === 0) {
		return [];
	}
	var errors = [];
	var inDelimiter = false;
	var lastDelimiterMatch = { offset: 0 };
	var xtag = void 0;
	var rangeIndex = 0;
	delimiterMatches.forEach(function (delimiterMatch) {
		while (ranges[rangeIndex + 1]) {
			if (ranges[rangeIndex + 1].offset > delimiterMatch.offset) {
				break;
			}
			rangeIndex++;
		}
		xtag = fullText.substr(lastDelimiterMatch.offset, delimiterMatch.offset - lastDelimiterMatch.offset);
		if (delimiterMatch.position === "start" && inDelimiter || delimiterMatch.position === "end" && !inDelimiter) {
			if (delimiterMatch.position === "start") {
				errors.push(getUnclosedTagException({ xtag: xtag, offset: lastDelimiterMatch.offset }));
				delimiterMatch.error = true;
			} else {
				errors.push(getUnopenedTagException({ xtag: xtag, offset: delimiterMatch.offset }));
				delimiterMatch.error = true;
			}
		} else {
			inDelimiter = !inDelimiter;
		}
		lastDelimiterMatch = delimiterMatch;
	});
	var delimiterMatch = { offset: fullText.length };
	xtag = fullText.substr(lastDelimiterMatch.offset, delimiterMatch.offset - lastDelimiterMatch.offset);
	if (inDelimiter) {
		errors.push(getUnclosedTagException({ xtag: xtag, offset: lastDelimiterMatch.offset }));
		delimiterMatch.error = true;
	}
	return errors;
}

function getAllIndexes(arr, val, position) {
	var indexes = [];
	var offset = -1;
	do {
		offset = arr.indexOf(val, offset + 1);
		if (offset !== -1) {
			indexes.push({ offset: offset, position: position });
		}
	} while (offset !== -1);
	return indexes;
}

function Reader(innerContentParts) {
	var _this = this;

	this.innerContentParts = innerContentParts;
	this.full = "";
	this.parseDelimiters = function (delimiters) {
		_this.full = _this.innerContentParts.map(function (p) {
			return p.value;
		}).join("");
		var delimiterMatches = concatArrays([getAllIndexes(_this.full, delimiters.start, "start"), getAllIndexes(_this.full, delimiters.end, "end")]).sort(offsetSort);

		var offset = 0;
		var ranges = _this.innerContentParts.map(function (part) {
			offset += part.value.length;
			return { offset: offset - part.value.length, lIndex: part.lIndex };
		});

		var errors = getDelimiterErrors(delimiterMatches, _this.full, ranges);
		var delimiterLength = { start: delimiters.start.length, end: delimiters.end.length };
		var cutNext = 0;
		var delimiterIndex = 0;

		_this.parsed = ranges.map(function (p, i) {
			var offset = p.offset;

			var range = [offset, offset + this.innerContentParts[i].value.length];
			var partContent = this.innerContentParts[i].value;
			var delimitersInOffset = [];
			while (delimiterIndex < delimiterMatches.length && inRange(range, delimiterMatches[delimiterIndex])) {
				delimitersInOffset.push(delimiterMatches[delimiterIndex]);
				delimiterIndex++;
			}
			var parts = [];
			var cursor = 0;
			if (cutNext > 0) {
				cursor = cutNext;
				cutNext = 0;
			}
			delimitersInOffset.forEach(function (delimiterInOffset) {
				var value = partContent.substr(cursor, delimiterInOffset.offset - offset - cursor);
				if (value.length > 0) {
					parts.push({ type: "content", value: value, offset: cursor + offset });
					cursor += value.length;
				}
				var delimiterPart = {
					type: "delimiter",
					position: delimiterInOffset.position,
					offset: cursor + offset
				};
				if (delimiterInOffset.error) {
					delimiterPart.error = delimiterInOffset.error;
				}
				parts.push(delimiterPart);
				cursor = delimiterInOffset.offset - offset + delimiterLength[delimiterInOffset.position];
			});
			cutNext = cursor - partContent.length;
			var value = partContent.substr(cursor);
			if (value.length > 0) {
				parts.push({ type: "content", value: value, offset: offset });
			}
			return parts;
		}, _this);
		_this.errors = errors;
	};
}

module.exports = {
	parse: function parse(xmlparsed, delimiters) {
		var inTextTag = false;
		var innerContentParts = [];
		xmlparsed.forEach(function (part) {
			inTextTag = updateInTextTag(part, inTextTag);
			if (inTextTag && part.type === "content") {
				innerContentParts.push(part);
			}
		});
		var reader = new Reader(innerContentParts);
		reader.parseDelimiters(delimiters);

		var lexed = [];
		var index = 0;
		xmlparsed.forEach(function (part) {
			inTextTag = updateInTextTag(part, inTextTag);
			if (part.type === "content") {
				part.position = inTextTag ? "insidetag" : "outsidetag";
			}
			if (inTextTag && part.type === "content") {
				Array.prototype.push.apply(lexed, reader.parsed[index].map(function (p) {
					if (p.type === "content") {
						p.position = "insidetag";
					}
					return p;
				}));
				index++;
			} else {
				lexed.push(part);
			}
		});
		return { errors: reader.errors, lexed: lexed };
	},
	xmlparse: function xmlparse(content, xmltags) {
		var matches = tagMatcher(content, xmltags.text, xmltags.other);
		var cursor = 0;
		var parsed = matches.reduce(function (parsed, match) {
			var value = content.substr(cursor, match.offset - cursor);
			if (value.length > 0) {
				parsed.push({ type: "content", value: value });
			}
			cursor = match.offset + match.value.length;
			delete match.offset;
			if (match.value.length > 0) {
				parsed.push(match);
			}
			return parsed;
		}, []).map(function (p, i) {
			p.lIndex = i;
			return p;
		});
		var value = content.substr(cursor);
		if (value.length > 0) {
			parsed.push({ type: "content", value: value });
		}
		return parsed;
	}
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(1),
    wordToUtf8 = _require.wordToUtf8,
    concatArrays = _require.concatArrays;

function moduleParse(modules, placeHolderContent, parsed, startOffset) {
	var moduleParsed = void 0;
	for (var i = 0, l = modules.length; i < l; i++) {
		var _module = modules[i];
		moduleParsed = _module.parse(placeHolderContent);
		if (moduleParsed) {
			moduleParsed.offset = startOffset;
			parsed.push(moduleParsed);
			return parsed;
		}
	}
	parsed.push({ type: "placeholder", value: placeHolderContent, offset: startOffset });
	return parsed;
}

var parser = {
	postparse: function postparse(postparsed, modules) {
		function getTraits(traitName, postparsed) {
			return modules.map(function (module) {
				return module.getTraits(traitName, postparsed);
			});
		}
		var errors = [];
		function postparse(postparsed) {
			return modules.reduce(function (postparsed, module) {
				var r = module.postparse(postparsed, { postparse: postparse, getTraits: getTraits });
				if (r.errors) {
					errors = concatArrays([errors, r.errors]);
					return r.postparsed;
				}
				return r;
			}, postparsed);
		}
		return { postparsed: postparse(postparsed), errors: errors };
	},
	parse: function parse(lexed, modules) {
		var inPlaceHolder = false;
		var placeHolderContent = "";
		var startOffset = void 0;
		var tailParts = [];
		return lexed.filter(function (token) {
			return !token.error;
		}).reduce(function lexedToParsed(parsed, token) {
			if (token.type === "delimiter") {
				inPlaceHolder = token.position === "start";
				if (token.position === "end") {
					placeHolderContent = wordToUtf8(placeHolderContent);
					parsed = moduleParse(modules, placeHolderContent, parsed, startOffset);
					startOffset = null;
					Array.prototype.push.apply(parsed, tailParts);
					tailParts = [];
				} else {
					startOffset = token.offset;
				}
				placeHolderContent = "";
				return parsed;
			}
			if (!inPlaceHolder) {
				parsed.push(token);
				return parsed;
			}
			if (token.type !== "content" || token.position !== "insidetag") {
				tailParts.push(token);
				return parsed;
			}
			placeHolderContent += token.value;
			return parsed;
		}, []);
	}
};

module.exports = parser;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(1),
    utf8ToWord = _require.utf8ToWord,
    concatArrays = _require.concatArrays;

var _require2 = __webpack_require__(0),
    throwUnimplementedTagType = _require2.throwUnimplementedTagType;

function moduleRender(part, options) {
	var moduleRendered = void 0;
	for (var i = 0, l = options.modules.length; i < l; i++) {
		var _module = options.modules[i];
		moduleRendered = _module.render(part, options);
		if (moduleRendered) {
			return moduleRendered;
		}
	}
	return false;
}

function render(options) {
	var compiled = options.compiled,
	    scopeManager = options.scopeManager,
	    nullGetter = options.nullGetter;

	var errors = [];
	var parts = compiled.map(function (part) {
		var moduleRendered = moduleRender(part, options);
		if (moduleRendered) {
			if (moduleRendered.errors) {
				errors = concatArrays([errors, moduleRendered.errors]);
			}
			return moduleRendered.value;
		}
		if (part.type === "placeholder") {
			var value = scopeManager.getValue(part.value);
			if (value == null) {
				value = nullGetter(part);
			}
			return utf8ToWord(value);
		}
		if (part.type === "content" || part.type === "tag") {
			return part.value;
		}
		throwUnimplementedTagType(part);
	});
	return { errors: errors, parts: parts };
}

module.exports = { render: render };

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var loopModule = __webpack_require__(13);
var spacePreserveModule = __webpack_require__(14);
var rawXmlModule = __webpack_require__(15);
var expandPairTrait = __webpack_require__(16);
var render = __webpack_require__(18);

var PptXFileTypeConfig = {
	getTemplatedFiles: function getTemplatedFiles(zip) {
		var slideTemplates = zip.file(/ppt\/(slides|slideMasters)\/(slide|slideMaster)\d+\.xml/).map(function (file) {
			return file.name;
		});
		return slideTemplates.concat(["ppt/presentation.xml"]);
	},

	textPath: "ppt/slides/slide1.xml",
	tagsXmlTextArray: ["a:t", "m:t"],
	tagsXmlLexedArray: ["p:sp", "a:tc", "a:tr", "a:table", "a:p", "a:r"],
	tagRawXml: "p:sp",
	tagTextXml: "a:t",
	baseModules: [loopModule, expandPairTrait, rawXmlModule, render]
};

var DocXFileTypeConfig = {
	getTemplatedFiles: function getTemplatedFiles(zip) {
		var baseTags = ["docProps/core.xml", "docProps/app.xml", "word/document.xml"];
		var slideTemplates = zip.file(/word\/(header|footer)\d+\.xml/).map(function (file) {
			return file.name;
		});
		return slideTemplates.concat(baseTags);
	},

	textPath: "word/document.xml",
	tagsXmlTextArray: ["w:t", "m:t", "vt:lpstr", "dc:title", "dc:creator", "cp:keywords"],
	tagsXmlLexedArray: ["w:tc", "w:tr", "w:table", "w:p", "w:r"],
	tagRawXml: "w:p",
	tagTextXml: "w:t",
	baseModules: [loopModule, spacePreserveModule, expandPairTrait, rawXmlModule, render]
};

module.exports = {
	docx: DocXFileTypeConfig,
	pptx: PptXFileTypeConfig
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(1),
    mergeObjects = _require.mergeObjects;

var dashInnerRegex = /^-([^\s]+)\s(.+)$/;
var wrapper = __webpack_require__(2);

var moduleName = "loop";

var loopModule = {
	name: "LoopModule",
	prefix: {
		start: "#",
		end: "/",
		dash: "-",
		inverted: "^"
	},
	parse: function parse(placeHolderContent) {
		var module = moduleName;
		var type = "placeholder";
		var prefix = this.prefix;
		if (placeHolderContent[0] === prefix.start) {
			return {
				type: type,
				value: placeHolderContent.substr(1),
				expandTo: "auto",
				module: module,
				location: "start",
				inverted: false
			};
		}
		if (placeHolderContent[0] === prefix.inverted) {
			return {
				type: type,
				value: placeHolderContent.substr(1),
				expandTo: "auto",
				module: module,
				location: "start",
				inverted: true
			};
		}
		if (placeHolderContent[0] === prefix.end) {
			return {
				type: type,
				value: placeHolderContent.substr(1),
				module: module,
				location: "end"
			};
		}
		if (placeHolderContent[0] === prefix.dash) {
			var value = placeHolderContent.replace(dashInnerRegex, "$2");
			var expandTo = placeHolderContent.replace(dashInnerRegex, "$1");
			return {
				type: type,
				value: value,
				expandTo: expandTo,
				module: module,
				location: "start",
				inverted: false
			};
		}
		return null;
	},
	getTraits: function getTraits(traitName, parsed) {
		if (traitName !== "expandPair") {
			return;
		}

		return parsed.reduce(function (tags, part, offset) {
			if (part.type === "placeholder" && part.module === moduleName) {
				tags.push({ part: part, offset: offset });
			}
			return tags;
		}, []);
	},
	render: function render(part, options) {
		if (!part.type === "placeholder" || part.module !== moduleName) {
			return null;
		}
		var totalValue = [];
		var errors = [];
		function loopOver(scope) {
			var scopeManager = options.scopeManager.createSubScopeManager(scope, part.value);
			var subRendered = options.render(mergeObjects({}, options, {
				compiled: part.subparsed,
				tags: {},
				scopeManager: scopeManager
			}));
			totalValue = totalValue.concat(subRendered.parts);
			errors = errors.concat(subRendered.errors || []);
		}
		options.scopeManager.loopOver(part.value, loopOver, part.inverted);
		return { value: totalValue.join(""), errors: errors };
	}
};

module.exports = function () {
	return wrapper(loopModule);
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var wrapper = __webpack_require__(2);
var spacePreserve = {
	name: "SpacePreserveModule",
	postparse: function postparse(postparsed) {
		var chunk = [];
		var inChunk = false;
		var result = postparsed.reduce(function (postparsed, part) {
			if (part.type === "tag" && part.position === "start" && part.text && part.value === "<w:t>") {
				inChunk = true;
			}
			if (inChunk) {
				if (part.type === "placeholder" && !part.module) {
					chunk[0].value = '<w:t xml:space="preserve">';
				}
				chunk.push(part);
			} else {
				postparsed.push(part);
			}
			if (part.type === "tag" && part.position === "end" && part.text && part.value === "</w:t>") {
				Array.prototype.push.apply(postparsed, chunk);
				inChunk = false;
				chunk = [];
			}
			return postparsed;
		}, []);
		Array.prototype.push.apply(result, chunk);
		return result;
	}
};
module.exports = function () {
	return wrapper(spacePreserve);
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var traits = __webpack_require__(3);

var _require = __webpack_require__(0),
    throwRawTagShouldBeOnlyTextInParagraph = _require.throwRawTagShouldBeOnlyTextInParagraph;

var moduleName = "rawxml";
var wrapper = __webpack_require__(2);

function getInner(_ref) {
	var part = _ref.part,
	    left = _ref.left,
	    right = _ref.right,
	    postparsed = _ref.postparsed,
	    index = _ref.index;

	var paragraphParts = postparsed.slice(left + 1, right);
	paragraphParts.forEach(function (p, i) {
		if (i === index - left - 1) {
			return;
		}
		if (p.type === "placeholder" || p.type === "content" && p.position === "insidetag") {
			throwRawTagShouldBeOnlyTextInParagraph({ paragraphParts: paragraphParts, part: part });
		}
	});
	return part;
}

var RawXmlModule = function () {
	function RawXmlModule() {
		_classCallCheck(this, RawXmlModule);

		this.name = "RawXmlModule";
		this.prefix = "@";
	}

	_createClass(RawXmlModule, [{
		key: "optionsTransformer",
		value: function optionsTransformer(options, docxtemplater) {
			this.fileTypeConfig = docxtemplater.fileTypeConfig;
			return options;
		}
	}, {
		key: "parse",
		value: function parse(placeHolderContent) {
			var type = "placeholder";
			if (placeHolderContent[0] !== this.prefix) {
				return null;
			}
			return { type: type, value: placeHolderContent.substr(1), module: moduleName };
		}
	}, {
		key: "postparse",
		value: function postparse(postparsed) {
			return traits.expandToOne(postparsed, { moduleName: moduleName, getInner: getInner, expandTo: this.fileTypeConfig.tagRawXml });
		}
	}, {
		key: "render",
		value: function render(part, options) {
			if (part.module !== moduleName) {
				return null;
			}
			var value = options.scopeManager.getValue(part.value);
			if (value == null) {
				value = options.nullGetter(part);
			}
			return { value: value };
		}
	}]);

	return RawXmlModule;
}();

module.exports = function () {
	return wrapper(new RawXmlModule());
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var traitName = "expandPair";
var mergeSort = __webpack_require__(17);

var _require = __webpack_require__(1),
    getLeft = _require.getLeft,
    getRight = _require.getRight;

var wrapper = __webpack_require__(2);

var _require2 = __webpack_require__(3),
    getExpandToDefault = _require2.getExpandToDefault;

var _require3 = __webpack_require__(0),
    getUnmatchedLoopException = _require3.getUnmatchedLoopException,
    getClosingTagNotMatchOpeningTag = _require3.getClosingTagNotMatchOpeningTag,
    throwLocationInvalid = _require3.throwLocationInvalid;

function getOpenCountChange(part) {
	switch (part.location) {
		case "start":
			return 1;
		case "end":
			return -1;
		default:
			throwLocationInvalid(part);
	}
}

function getPairs(traits) {
	var errors = [];
	var pairs = [];
	if (traits.length === 0) {
		return { pairs: pairs, errors: errors };
	}
	var countOpen = 1;

	var _traits = _slicedToArray(traits, 1),
	    firstTrait = _traits[0];

	if (firstTrait.part.location === "start") {
		for (var i = 1; i < traits.length; i++) {
			var currentTrait = traits[i];
			countOpen += getOpenCountChange(currentTrait.part);
			if (countOpen === 0) {
				var _outer = getPairs(traits.slice(i + 1));
				if (currentTrait.part.value !== firstTrait.part.value && currentTrait.part.value !== "") {
					errors.push(getClosingTagNotMatchOpeningTag({ tags: [firstTrait.part, currentTrait.part] }));
				} else {
					pairs = [[firstTrait, currentTrait]];
				}
				return { pairs: pairs.concat(_outer.pairs), errors: errors.concat(_outer.errors) };
			}
		}
	}
	var part = firstTrait.part;

	errors.push(getUnmatchedLoopException({ part: part, location: part.location }));
	var outer = getPairs(traits.slice(1));
	return { pairs: outer.pairs, errors: errors.concat(outer.errors) };
}

var expandPairTrait = {
	name: "ExpandPairTrait",
	postparse: function postparse(postparsed, _ref) {
		var getTraits = _ref.getTraits,
		    _postparse = _ref.postparse;

		var traits = getTraits(traitName, postparsed);
		traits = traits.map(function (trait) {
			return trait || [];
		});
		traits = mergeSort(traits);

		var _getPairs = getPairs(traits),
		    pairs = _getPairs.pairs,
		    errors = _getPairs.errors;

		var expandedPairs = pairs.map(function (pair) {
			var expandTo = pair[0].part.expandTo;

			if (expandTo === "auto") {
				var result = getExpandToDefault(postparsed.slice(pair[0].offset, pair[1].offset), pair);
				if (result.error) {
					errors.push(result.error);
				}
				expandTo = result.value;
			}
			if (!expandTo) {
				return [pair[0].offset, pair[1].offset];
			}
			var left = getLeft(postparsed, expandTo, pair[0].offset);
			var right = getRight(postparsed, expandTo, pair[1].offset);
			return [left, right];
		});

		var currentPairIndex = 0;
		var innerParts = void 0;
		var newParsed = postparsed.reduce(function (newParsed, part, i) {
			var inPair = currentPairIndex < pairs.length && expandedPairs[currentPairIndex][0] <= i;
			var pair = pairs[currentPairIndex];
			var expandedPair = expandedPairs[currentPairIndex];
			if (!inPair) {
				newParsed.push(part);
				return newParsed;
			}
			if (expandedPair[0] === i) {
				innerParts = [];
			}
			if (pair[0].offset !== i && pair[1].offset !== i) {
				innerParts.push(part);
			}
			if (expandedPair[1] === i) {
				var basePart = postparsed[pair[0].offset];
				delete basePart.location;
				delete basePart.expandTo;
				basePart.subparsed = _postparse(innerParts);
				newParsed.push(basePart);
				currentPairIndex++;
			}
			return newParsed;
		}, []);
		return { postparsed: newParsed, errors: errors };
	}
};

module.exports = function () {
	return wrapper(expandPairTrait);
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getMinFromArrays(arrays, state) {
	var minIndex = -1;
	for (var i = 0, l = arrays.length; i < l; i++) {
		if (state[i] >= arrays[i].length) {
			continue;
		}
		if (minIndex === -1 || arrays[i][state[i]].offset < arrays[minIndex][state[minIndex]].offset) {
			minIndex = i;
		}
	}
	if (minIndex === -1) {
		throw new Error("minIndex negative");
	}
	return minIndex;
}

module.exports = function (arrays) {
	var totalLength = arrays.reduce(function (sum, array) {
		return sum + array.length;
	}, 0);
	arrays = arrays.filter(function (array) {
		return array.length > 0;
	});

	var resultArray = new Array(totalLength);

	var state = arrays.map(function () {
		return 0;
	});

	var i = 0;

	while (i <= totalLength - 1) {
		var arrayIndex = getMinFromArrays(arrays, state);
		resultArray[i] = arrays[arrayIndex][state[arrayIndex]];
		state[arrayIndex]++;
		i++;
	}

	return resultArray;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var wrapper = __webpack_require__(2);

var _require = __webpack_require__(0),
    getScopeCompilationError = _require.getScopeCompilationError;

var Render = function () {
	function Render() {
		_classCallCheck(this, Render);

		this.name = "Render";
	}

	_createClass(Render, [{
		key: "set",
		value: function set(obj) {
			if (obj.compiled) {
				this.compiled = obj.compiled;
			}
			if (obj.data != null) {
				this.data = obj.data;
			}
		}
	}, {
		key: "getRenderedMap",
		value: function getRenderedMap(mapper) {
			var _this = this;

			return Object.keys(this.compiled).reduce(function (mapper, from) {
				mapper[from] = { from: from, data: _this.data };
				return mapper;
			}, mapper);
		}
	}, {
		key: "optionsTransformer",
		value: function optionsTransformer(options, docxtemplater) {
			this.parser = docxtemplater.parser;
			return options;
		}
	}, {
		key: "postparse",
		value: function postparse(postparsed) {
			var _this2 = this;

			var errors = [];
			postparsed.forEach(function (p) {
				if (p.type === "placeholder") {
					var tag = p.value;
					try {
						_this2.parser(tag);
					} catch (rootError) {
						errors.push(getScopeCompilationError({ tag: tag, rootError: rootError }));
					}
				}
			});
			return { postparsed: postparsed, errors: errors };
		}
	}]);

	return Render;
}();

module.exports = function () {
	return wrapper(new Render());
};

/***/ })
/******/ ]);