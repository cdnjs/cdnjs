(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pell"] = factory();
	else
		root["pell"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

if (!document.contentEditable && !document.execCommand) {
  // eslint-disable-next-line no-console
  console.error('HTML5 Document Editing API Is Not Supported');
}

var self = {};

var defaultSettings = {
  classes: {
    actionbar: 'pell-actionbar',
    button: 'pell-button',
    editor: 'pell-editor'
  }
};

var execute = function execute(command) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  document.execCommand(command, false, value);
};

var ensureHTTP = function ensureHTTP(str) {
  if (str.indexOf('http://') === 0 || str.indexOf('https://') === 0) return str;
  return 'http://' + str;
};

var link = function link() {
  var url = window.prompt('Enter the link URL');
  execute('createLink', ensureHTTP(url));
};

var image = function image() {
  var url = window.prompt('Enter the image URL');
  execute('insertImage', ensureHTTP(url));
};

var actions = [{
  icon: 'B',
  name: 'bold',
  result: function result() {
    return execute('bold');
  }
}, {
  icon: 'I',
  name: 'italic',
  result: function result() {
    return execute('italic');
  }
}, {
  icon: 'U',
  name: 'underline',
  result: function result() {
    return execute('underline');
  }
}, {
  icon: 'S',
  name: 'strikeThrough',
  result: function result() {
    return execute('strikeThrough');
  }
}, {
  icon: 'H1',
  name: 'heading1',
  result: function result() {
    return execute('formatBlock', '<H1>');
  }
}, {
  icon: 'H2',
  name: 'heading2',
  result: function result() {
    return execute('formatBlock', '<H2>');
  }
}, {
  icon: 'P',
  name: 'paragraph',
  result: function result() {
    return execute('formatBlock', '<P>');
  }
}, {
  icon: '"',
  name: 'quote',
  result: function result() {
    return execute('formatBlock', '<BLOCKQUOTE>');
  }
}, {
  icon: 'OL',
  name: 'orderedList',
  result: function result() {
    return execute('insertOrderedList');
  }
}, {
  icon: 'UL',
  name: 'unorderedList',
  result: function result() {
    return execute('insertUnorderedList');
  }
}, {
  icon: 'JC',
  name: 'justifyCenter',
  result: function result() {
    return execute('justifyCenter');
  }
}, {
  icon: 'JF',
  name: 'justifyFull',
  result: function result() {
    return execute('justifyFull');
  }
}, {
  icon: 'JL',
  name: 'justifyLeft',
  result: function result() {
    return execute('justifyLeft');
  }
}, {
  icon: 'JR',
  name: 'justifyRight',
  result: function result() {
    return execute('justifyRight');
  }
}, {
  icon: 'S1',
  name: 'subscript',
  result: function result() {
    return execute('subscript');
  }
}, {
  icon: 'S2',
  name: 'superscript',
  result: function result() {
    return execute('superscript');
  }
}, {
  icon: ';',
  name: 'code',
  result: function result() {
    return execute('formatBlock', '<PRE>');
  }
}, {
  icon: 'HR',
  name: 'line',
  result: function result() {
    return execute('insertHorizontalRule', '<PRE>');
  }
}, {
  icon: 'L',
  name: 'link',
  result: link
}, {
  icon: 'IM',
  name: 'image',
  result: image
}, {
  icon: 'C',
  name: 'clear',
  result: function result() {
    return execute('removeFormat');
  }
}, {
  icon: 'UN',
  name: 'undo',
  result: function result() {
    return execute('undo');
  }
}, {
  icon: 'RE',
  name: 'redo',
  result: function result() {
    return execute('redo');
  }
}];

var init = exports.init = function init(settings) {
  settings.classes = _extends({}, defaultSettings.classes, settings.classes);

  self.root = document.getElementById(settings.root);
  self.editor = document.createElement('div');
  self.editor.contentEditable = true;
  self.editor.className = settings.classes.editor;
  self.editor.oninput = function (event) {
    settings.onChange && settings.onChange(event.target.innerHTML);
  };
  self.root.appendChild(self.editor);

  self.actionbar = document.createElement('div');
  self.actionbar.className = settings.classes.actionbar;
  self.root.appendChild(self.actionbar);

  self.buttons = {};

  actions.forEach(function (action) {
    self.buttons[action.name] = document.createElement('button');
    self.buttons[action.name].className = settings.classes.button;
    self.buttons[action.name].innerHTML = action.icon;
    self.buttons[action.name].onclick = action.result;
    self.actionbar.appendChild(self.buttons[action.name]);
  });
};

exports.default = { init: init };

/***/ })
/******/ ]);
});