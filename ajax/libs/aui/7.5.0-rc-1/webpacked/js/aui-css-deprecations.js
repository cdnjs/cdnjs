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
/******/ 	return __webpack_require__(__webpack_require__.s = 31);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/*!************************!*\
  !*** external "__AJS" ***!
  \************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = __AJS;

/***/ }),

/***/ 10:
/*!*******************************************************************************!*\
  !*** delegated ./src/js/aui/internal/deprecation.js from dll-reference __AJS ***!
  \*******************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(2);

/***/ }),

/***/ 3:
/*!**************************************************************************!*\
  !*** delegated ./src/js/aui/internal/amdify.js from dll-reference __AJS ***!
  \**************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(77);

/***/ }),

/***/ 31:
/*!****************************************!*\
  !*** ./src/js/aui-css-deprecations.js ***!
  \****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _deprecation = __webpack_require__(/*! ./aui/internal/deprecation */ 10);

var _amdify = __webpack_require__(/*! ./aui/internal/amdify */ 3);

var _amdify2 = _interopRequireDefault(_amdify);

var _aliasesMappings = __webpack_require__(/*! ../../build/lib/generate-adgs-iconfont/aliases-mappings */ 32);

var _aliasesMappings2 = _interopRequireDefault(_aliasesMappings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _deprecation.css)('.aui-badge', {
    displayName: 'AUI Badges class'
});
(0, _deprecation.css)('.aui-dropdown2-trigger.aui-style-dropdown2triggerlegacy1', {
    displayName: 'Dropdown2 legacy trigger'
});
(0, _deprecation.css)('.aui-message span.aui-icon', {
    displayName: 'Message icon span'
});
(0, _deprecation.css)('.aui-zebra', {
    displayName: 'Zebra table rows'
});
(0, _deprecation.css)('.aui-nav-pagination > li.aui-nav-current', {
    alternativeName: 'aui-nav-selected'
});
(0, _deprecation.css)('.aui-tabs.vertical-tabs', {
    displayName: 'Vertical tabs'
});
(0, _deprecation.css)('form.aui span.content');
(0, _deprecation.css)(['form.aui .button', 'form.aui .buttons-container'], {
    displayName: 'Unprefixed buttons',
    alternativeName: 'aui-button and aui-buttons'
});
(0, _deprecation.css)(['form.aui .icon-date', 'form.aui .icon-range', 'form.aui .icon-help', 'form.aui .icon-required', 'form.aui .icon-inline-help', 'form.aui .icon-users', '.aui-icon-date', '.aui-icon-range', '.aui-icon-help', '.aui-icon-required', '.aui-icon-users', '.aui-icon-inline-help'], {
    displayName: 'Form icons'
});
(0, _deprecation.css)(['.aui-icon.icon-move-d', '.aui-icon.icon-move', '.aui-icon.icon-dropdown-d', '.aui-icon.icon-dropdown', '.aui-icon.icon-dropdown-active-d', '.aui-icon.icon-dropdown-active', '.aui-icon.icon-minimize-d', '.aui-icon.icon-minimize', '.aui-icon.icon-maximize-d', '.aui-icon.icon-maximize'], {
    displayName: 'Core icons'
});
(0, _deprecation.css)(['.aui-message.error', '.aui-message.warning', '.aui-message.hint', '.aui-message.info', '.aui-message.success'], {
    displayName: 'Unprefixed message types AUI-2150'
});
(0, _deprecation.css)(['.aui-dropdown2 .active', '.aui-dropdown2 .checked', '.aui-dropdown2 .disabled', '.aui-dropdown2 .interactive'], {
    displayName: 'Unprefixed dropdown2 css AUI-2150'
});

(0, _deprecation.css)(['aui-page-header-marketing', 'aui-page-header-hero'], {
    displayName: 'Marketing style headings'
});

// 5.9.0
// -----

var fiveNineZero = {
    // Inline Dialog
    'arrow': 'aui-inline-dialog-arrow',
    'contents': 'aui-inline-dialog-contents',

    // Messages
    'error': 'aui-message-error',
    'generic': 'aui-message-generic',
    'hint': 'aui-message-hint',
    'info': 'aui-message-info',
    'success': 'aui-message-success',
    'warning': 'aui-message-warning'
};
var name;

for (name in fiveNineZero) {
    if (Object.hasOwnProperty.call(fiveNineZero, name)) {
        (0, _deprecation.css)(name, {
            alternativeName: fiveNineZero[name],
            removeVersion: '8.0.0',
            sinceVersion: '5.9.0'
        });
    }
}

// 6.1.0
// -----

(0, _deprecation.css)(['.aui-header-logo-atlassian', '.aui-header-logo-aui', '.aui-header-logo-bamboo', '.aui-header-logo-bitbucket', '.aui-header-logo-stash', '.aui-header-logo-clover', '.aui-header-logo-confluence', '.aui-header-logo-crowd', '.aui-header-logo-crucible', '.aui-header-logo-fecru', '.aui-header-logo-fisheye', '.aui-header-logo-hipchat', '.aui-header-logo-jira', '.aui-header-logo-jira-core', '.aui-header-logo-jira-software', '.aui-header-logo-jira-service-desk', '.aui-header-logo-answer', '.aui-header-logo-community', '.aui-header-logo-developers', '.aui-header-logo-expert', '.aui-header-logo-partner-program', '.aui-header-logo-marketplace', '.aui-header-logo-support', '.aui-header-logo-university', '.aui-header-logo-cloud'], {
    displayName: 'Atlassian Brand Logos'
});

// 7.1.0
// -----

(0, _deprecation.css)('.aui-badge', {
    displayName: 'AUI Badge CSS class',
    alternativeName: 'aui-badge',
    sinceVersion: '7.1.0',
    extraInfo: 'The badge pattern is best used as a web component instead of a CSS class'
});

// 7.5.0
// -----

(0, _deprecation.css)(['.aui-iconfont-image-extrasmall'], {
    displayName: 'Special size icon names',
    sinceVersion: '7.5.0',
    extraInfo: 'The only size variant allowed for icon names is `-small`.'
});

(0, _deprecation.css)('.aui-icon-dropdown', {
    displayName: 'AUI dropdown icon element',
    alternativeName: '.aui-icon-chevron-down',
    sinceVersion: '7.5.0',
    extraInfo: 'Use of an explicit element for the dropdown icon is part of a ' + 'deprecated markup pattern for dropdowns and should not be used. If you must ' + 'render an explicit icon element for a dropdown trigger, use the new ' + 'alternative class name.'
});

// New ADGS names for the old ADG2 icon
_aliasesMappings2.default.forEach(function (_ref) {
    var name = _ref.name,
        alias = _ref.alias;
    return (0, _deprecation.css)('.aui-iconfont-' + alias, {
        displayName: 'ADG2 icon',
        alternativeName: '.aui-iconfont-' + name,
        sinceVersion: '7.5.0',
        removeVersion: '8.0.0',
        extraInfo: 'Use the new ADGS icon CSS class name'
    });
});

(0, _amdify2.default)('aui/css-deprecation-warnings');

/***/ }),

/***/ 32:
/*!****************************************************************!*\
  !*** ./build/lib/generate-adgs-iconfont/aliases-mappings.json ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = [{"name":"menu","alias":"appswitcher"},{"name":"refresh","alias":"build"},{"name":"cross","alias":"close-dialog"},{"name":"chevron-down","alias":"collapsed"},{"name":"settings","alias":"configure"},{"name":"copy","alias":"copy-clipboard"},{"name":"trash","alias":"delete"},{"name":"detail-view","alias":"details"},{"name":"arrow-left","alias":"devtools-arrow-left"},{"name":"arrow-right","alias":"devtools-arrow-right"},{"name":"sign-in","alias":"devtools-checkout"},{"name":"import","alias":"devtools-clone"},{"name":"folder-filled","alias":"devtools-folder-closed"},{"name":"export","alias":"devtools-pull-request"},{"name":"tag","alias":"devtools-tag"},{"name":"tag","alias":"devtools-tag-small"},{"name":"menu","alias":"drag-vertical"},{"name":"edit-filled","alias":"edit"},{"name":"edit-filled","alias":"edit-small"},{"name":"chevron-up","alias":"expanded"},{"name":"vid-full-screen-on","alias":"focus"},{"name":"more-vertical","alias":"handle-horizontal"},{"name":"question-circle","alias":"help"},{"name":"home-circle","alias":"homepage"},{"name":"image","alias":"image-extrasmall"},{"name":"info-circle","alias":"info"},{"name":"world","alias":"weblink"},{"name":"add-circle","alias":"list-add"},{"name":"cross-circle","alias":"list-remove"},{"name":"lock-filled","alias":"locked"},{"name":"lock-filled","alias":"locked-small"},{"name":"document","alias":"page-blank"},{"name":"document","alias":"doc"},{"name":"documents","alias":"pages"},{"name":"cross-circle","alias":"remove"},{"name":"cross-circle","alias":"remove-label"},{"name":"search","alias":"search-small"},{"name":"person-circle","alias":"space-personal"},{"name":"star-filled","alias":"star"},{"name":"check","alias":"success"},{"name":"recent","alias":"time"},{"name":"vid-full-screen-off","alias":"unfocus"},{"name":"unlock-filled","alias":"unlocked"},{"name":"star","alias":"unstar"},{"name":"watch","alias":"unwatch"},{"name":"arrow-up","alias":"up"},{"name":"arrow-down","alias":"down"},{"name":"person","alias":"user"},{"name":"watch-filled","alias":"view"},{"name":"room-menu","alias":"view-list"},{"name":"menu","alias":"view-table"},{"name":"watch-filled","alias":"watch"},{"name":"tray","alias":"workbox"},{"name":"bullet-list","alias":"configure-columns"},{"name":"image","alias":"file-image"},{"name":"group","alias":"admin-roles"},{"name":"vid-pause","alias":"pause"},{"name":"refresh","alias":"refresh-small"},{"name":"swap","alias":"switch-small"},{"name":"arrow-down-small","alias":"arrow-down"},{"name":"arrow-up-small","alias":"arrow-up"},{"name":"email","alias":"email-large"},{"name":"documents","alias":"pages-large"},{"name":"person","alias":"user-large"},{"name":"documents","alias":"bp-decisions"},{"name":"documents","alias":"bp-default"},{"name":"documents","alias":"bp-files"},{"name":"documents","alias":"bp-requirements"},{"name":"documents","alias":"bp-howto"},{"name":"documents","alias":"bp-jira"},{"name":"documents","alias":"bp-meeting"},{"name":"documents","alias":"bp-retrospective"},{"name":"documents","alias":"bp-sharedlinks"},{"name":"documents","alias":"bp-troubleshooting"},{"name":"upload","alias":"deploy"},{"name":"file","alias":"page-default"},{"name":"shortcut","alias":"sidebar-link"},{"name":"shortcut","alias":"sidebar-link-large"},{"name":"incomplete-build","alias":"devtools-task-cancelled"},{"name":"plan-disabled","alias":"devtools-task-disabled"},{"name":"queued-build","alias":"devtools-task-in-progress"},{"name":"branch","alias":"devtools-branch"},{"name":"branch","alias":"devtools-branch-small"},{"name":"commits","alias":"devtools-commit"},{"name":"create-fork","alias":"devtools-for"},{"name":"bold","alias":"editor-bold"},{"name":"italic","alias":"editor-italic"},{"name":"underline","alias":"editor-underline"},{"name":"text-color","alias":"editor-color"},{"name":"left-alignment","alias":"editor-align-left"},{"name":"right-alignment","alias":"editor-align-right"},{"name":"center-alignment","alias":"editor-align-center"},{"name":"indent-left-mall","alias":"editor-indent"},{"name":"indent-right-mall","alias":"editor-outdent"},{"name":"number-list-mall","alias":"editor-list-number"},{"name":"bullet-list-mall","alias":"editor-list-bullet"},{"name":"mention","alias":"editor-mention"},{"name":"table-of-contents-mall","alias":"editor-macro-toc"},{"name":"advanced","alias":"editor-style"},{"name":"symbol","alias":"editor-symbol"},{"name":"horizontal-rule","alias":"editor-hr"},{"name":"page-layout-toggle","alias":"editor-layout"},{"name":"table","alias":"editor-table"},{"name":"location","alias":"nav-children-large"},{"name":"location","alias":"nav-children"},{"name":"single-column","alias":"layout-1col-large"},{"name":"two-column","alias":"layout-2col-large"},{"name":"right-side-bar","alias":"layout-2col-left-large"},{"name":"left-side-bar","alias":"layout-2col-right-large"},{"name":"three-column-side-bars","alias":"layout-3col-center-large"},{"name":"three-column","alias":"layout-3col-large"},{"name":"heading-column","alias":"table-header-column"},{"name":"heading-row","alias":"table-header-row"},{"name":"insert-row-after","alias":"table-row-down"},{"name":"insert-row-before","alias":"table-row-up"},{"name":"remove-row","alias":"table-row-remove"},{"name":"remove-column","alias":"table-col-remove"},{"name":"insert-column-before","alias":"table-col-left"},{"name":"insert-column-after","alias":"table-col-right"},{"name":"remove-table","alias":"table-remove"},{"name":"merge-table-cells","alias":"table-merge"},{"name":"split-merged-table-cells","alias":"table-split"},{"name":"copy-table-row","alias":"table-copy-row"},{"name":"paste-table-row","alias":"table-paste-row"},{"name":"cut-table-row","alias":"table-cut-row"},{"name":"team-calendar","alias":"teamcals-large"},{"name":"team-calendar","alias":"teamcals"},{"name":"emoji","alias":"editor-emoticon"},{"name":"help","alias":"editor-help"},{"name":"task","alias":"editor-task"},{"name":"like","alias":"like-small"}]

/***/ })

/******/ });
//# sourceMappingURL=aui-css-deprecations.js.map