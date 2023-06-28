/*!
 * jodit - Jodit is awesome and usefully wysiwyg editor with filebrowser
 * Author: Chupurnov <chupurnov@gmail.com> (https://xdsoft.net/)
 * Version: v3.24.9
 * Url: https://xdsoft.net/jodit/
 * License(s): MIT
 */
	
"use strict";
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return (self["webpackChunkjodit"] = self["webpackChunkjodit"] || []).push([[101],{

/***/ 86206:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Debug = void 0;
var tslib_1 = __webpack_require__(20255);
var plugin_1 = __webpack_require__(57549);
var global_1 = __webpack_require__(17332);
var dom_1 = __webpack_require__(24263);
var helpers_1 = __webpack_require__(40332);
var constants_1 = __webpack_require__(86893);
var Debug = (function (_super) {
    tslib_1.__extends(Debug, _super);
    function Debug() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Debug.prototype.afterInit = function (jodit) {
        var mirror = jodit.create.div();
        var tree = jodit.create.div();
        var sel = jodit.create.div();
        mirror.appendChild(tree);
        mirror.appendChild(sel);
        jodit.workplace.appendChild(mirror);
        Object.assign(mirror.style, {
            padding: '16px',
            backgroundColor: '#fcfcfc'
        });
        Object.assign(sel.style, {
            paddingTop: '16px'
        });
        jodit.e
            .on('keydown keyup keypress change afterInit updateDebug', function () {
            tree.innerHTML = render(jodit.editor);
        })
            .on(jodit.od, 'selectionchange', function () {
            var range = jodit.selection.range;
            tree.innerHTML = render(jodit.editor);
            sel.innerHTML = "start ".concat(range.startContainer.nodeName, " ").concat(range.startOffset, "<br>end ").concat(range.endContainer.nodeName, " ").concat(range.endOffset);
        });
    };
    Debug.prototype.beforeDestruct = function (jodit) { };
    return Debug;
}(plugin_1.Plugin));
exports.Debug = Debug;
function renderText(elm) {
    if (!elm.nodeValue) {
        return "<span style='color:red'>empty</span>";
    }
    return (0, helpers_1.stripTags)(elm.nodeValue.replace((0, constants_1.INVISIBLE_SPACE_REG_EXP)(), 'INV'));
}
function render(elm, level) {
    if (level === void 0) { level = 0; }
    return "<div style='padding-left: ".concat(level * 5, "px'>\n\t\t").concat(elm.nodeName, " ").concat(dom_1.Dom.isText(elm) ? "- ".concat(renderText(elm)) : '', "\n\t").concat(Array.from(elm.childNodes)
        .map(function (ch) { return render(ch, level + 1); })
        .join(''), "\n</div>");
}
global_1.pluginSystem.add('debug', Debug);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__(86206));
/******/ return __webpack_exports__;
/******/ }
]);
});