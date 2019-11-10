/*!
 * 
 * jQuery contextMenu v2.6.3 - Plugin for simple contextMenu handling
 * 
 * Version: v2.6.3
 * 
 * Authors: Björn Brala (SWIS.nl), Rodney Rehm, Addy Osmani (patches for FF)
 * 
 * Web: http://swisnl.github.io/jQuery-contextMenu/
 * 
 * Copyright (c) 2011-2017 SWIS BV and contributors
 * 
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 * 
 * Date: 2017-12-30T20:11:31.302Z
 * 
 * 
 */(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ContextMenu"] = factory();
	else
		root["ContextMenu"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var ContextMenuItemTypes = {
  simple: '',

  text: 'text',

  textarea: 'textarea',

  checkbox: 'checkbox',

  radio: 'radio',

  select: 'select',

  html: 'html',

  separator: 'cm_separator',

  submenu: 'sub'
};

exports.default = ContextMenuItemTypes;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _position = __webpack_require__(7);

exports.default = {
    selector: null,

    appendTo: null,

    trigger: 'right',

    autoHide: false,

    delay: 200,

    reposition: true,

    hideOnSecondTrigger: false,

    selectableSubMenu: false,

    className: '',

    classNames: {
        hover: 'context-menu-hover',
        disabled: 'context-menu-disabled',
        visible: 'context-menu-visible',
        notSelectable: 'context-menu-not-selectable',

        icon: 'context-menu-icon',
        iconEdit: 'context-menu-icon-edit',
        iconCut: 'context-menu-icon-cut',
        iconCopy: 'context-menu-icon-copy',
        iconPaste: 'context-menu-icon-paste',
        iconDelete: 'context-menu-icon-delete',
        iconAdd: 'context-menu-icon-add',
        iconQuit: 'context-menu-icon-quit',
        iconLoadingClass: 'context-menu-icon-loading'
    },

    zIndex: 1,

    animation: {
        duration: 50,
        show: 'slideDown',
        hide: 'slideUp'
    },

    events: {
        show: $.noop,
        hide: $.noop,
        activated: $.noop
    },

    callback: null,

    items: {},

    build: false,

    types: {},

    determinePosition: _position.determinePosition,

    position: _position.position,

    positionSubmenu: _position.positionSubmenu
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

var _ContextMenu = __webpack_require__(4);

var _ContextMenu2 = _interopRequireDefault(_ContextMenu);

var _ContextMenuItemTypes = __webpack_require__(0);

var _ContextMenuItemTypes2 = _interopRequireDefault(_ContextMenuItemTypes);

var _contextMenuFunction = __webpack_require__(10);

var _contextMenuFunction2 = _interopRequireDefault(_contextMenuFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var manager = new _ContextMenu2.default();

var contextMenu = function contextMenu(operation, options) {
    manager.execute(operation, options);
};

contextMenu.getInputValues = function (currentMenuData, data) {
    return manager.getInputValues(currentMenuData, data);
};
contextMenu.setInputValues = function (currentMenuData, data) {
    return manager.getInputValues(currentMenuData, data);
};
contextMenu.fromMenu = function (element) {
    return manager.html5builder.fromMenu(element);
};

contextMenu.defaults = manager.defaults;
contextMenu.types = manager.defaults.types;
contextMenu.manager = manager;

contextMenu.handle = manager.handler;
contextMenu.operations = manager.operations;
contextMenu.menus = manager.menus;
contextMenu.namespaces = manager.namespaces;

$.fn.contextMenu = _contextMenuFunction2.default;
$.contextMenu = contextMenu;

module.exports = { ContextMenu: _ContextMenu2.default, ContextMenuItemTypes: _ContextMenuItemTypes2.default };

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ContextMenuOperations = __webpack_require__(5);

var _ContextMenuOperations2 = _interopRequireDefault(_ContextMenuOperations);

var _defaults = __webpack_require__(1);

var _defaults2 = _interopRequireDefault(_defaults);

var _ContextMenuHtml5Builder = __webpack_require__(8);

var _ContextMenuHtml5Builder2 = _interopRequireDefault(_ContextMenuHtml5Builder);

var _ContextMenuEventHandler = __webpack_require__(9);

var _ContextMenuEventHandler2 = _interopRequireDefault(_ContextMenuEventHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContextMenu = function () {
    function ContextMenu() {
        _classCallCheck(this, ContextMenu);

        this.html5builder = new _ContextMenuHtml5Builder2.default();
        this.defaults = _defaults2.default;
        this.handler = new _ContextMenuEventHandler2.default();
        this.operations = new _ContextMenuOperations2.default();
        this.namespaces = {};
        this.initialized = false;
        this.menus = {};
        this.counter = 0;
    }

    _createClass(ContextMenu, [{
        key: 'execute',
        value: function execute(operation, options) {
            var normalizedArguments = this.normalizeArguments(operation, options);
            operation = normalizedArguments.operation;
            options = normalizedArguments.options;

            switch (operation) {
                case 'update':
                    this.update(options);
                    break;

                case 'create':
                    this.create(options);
                    break;

                case 'destroy':
                    this.destroy(options);
                    break;

                case 'html5':
                    this.html5(options);
                    break;

                default:
                    throw new Error('Unknown operation "' + operation + '"');
            }

            return this;
        }
    }, {
        key: 'html5',
        value: function html5(options) {
            options = this.buildOptions(options);

            var menuItemSupport = 'contextMenu' in document.body && 'HTMLMenuItemElement' in window;

            if (!menuItemSupport || typeof options === 'boolean' && options === true) {
                $('menu[type="context"]').each(function () {
                    if (this.id) {
                        $.contextMenu({
                            selector: '[contextmenu=' + this.id + ']',
                            items: $.contextMenu.fromMenu(this)
                        });
                    }
                }).css('display', 'none');
            }
        }
    }, {
        key: 'destroy',
        value: function destroy(options) {
            var _this = this;

            options = this.buildOptions(options);

            var $visibleMenu = void 0;
            if (options._hasContext) {
                var context = options.context;

                Object.keys(this.menus).forEach(function (ns) {
                    var o = _this.menus[ns];

                    if (!o) {
                        return true;
                    }

                    if (!$(context).is(o.selector)) {
                        return true;
                    }

                    $visibleMenu = $('.context-menu-list').filter(':visible');
                    if ($visibleMenu.length && $visibleMenu.data().contextMenuRoot.$trigger.is($(o.context).find(o.selector))) {
                        $visibleMenu.trigger('contextmenu:hide', { force: true });
                    }

                    if (_this.menus[o.ns].$menu) {
                        _this.menus[o.ns].$menu.remove();
                    }
                    delete _this.menus[o.ns];

                    $(o.context).off(o.ns);
                    return true;
                });
            } else if (!options.selector) {
                $(document).off('.contextMenu .contextMenuAutoHide');

                Object.keys(this.menus).forEach(function (ns) {
                    var o = _this.menus[ns];
                    $(o.context).off(o.ns);
                });

                this.namespaces = {};
                this.menus = {};
                this.counter = 0;
                this.initialized = false;

                $('#context-menu-layer, .context-menu-list').remove();
            } else if (this.namespaces[options.selector]) {
                $visibleMenu = $('.context-menu-list').filter(':visible');
                if ($visibleMenu.length && $visibleMenu.data().contextMenuRoot.$trigger.is(options.selector)) {
                    $visibleMenu.trigger('contextmenu:hide', { force: true });
                }

                if (this.menus[this.namespaces[options.selector]].$menu) {
                    this.menus[this.namespaces[options.selector]].$menu.remove();
                }
                delete this.menus[this.namespaces[options.selector]];

                $(document).off(this.namespaces[options.selector]);
            }
            this.handler.$currentTrigger = null;
        }
    }, {
        key: 'create',
        value: function create(options) {
            options = this.buildOptions(options);

            if (!options.selector) {
                throw new Error('No selector specified');
            }

            if (options.selector.match(/.context-menu-(list|item|input)($|\s)/)) {
                throw new Error('Cannot bind to selector "' + options.selector + '" as it contains a reserved className');
            }
            if (!options.build && (!options.items || $.isEmptyObject(options.items))) {
                throw new Error('No Items specified');
            }
            this.counter++;
            options.ns = '.contextMenu' + this.counter;
            if (!options._hasContext) {
                this.namespaces[options.selector] = options.ns;
            }
            this.menus[options.ns] = options;

            if (!options.trigger) {
                options.trigger = 'right';
            }

            if (!this.initialized) {
                var itemClick = options.itemClickEvent === 'click' ? 'click.contextMenu' : 'mouseup.contextMenu';
                var contextMenuItemObj = {
                    'contextmenu:focus.contextMenu': this.handler.focusItem,
                    'contextmenu:blur.contextMenu': this.handler.blurItem,
                    'contextmenu.contextMenu': this.handler.abortevent,
                    'mouseenter.contextMenu': this.handler.itemMouseenter,
                    'mouseleave.contextMenu': this.handler.itemMouseleave
                };
                contextMenuItemObj[itemClick] = this.handler.itemClick;

                $(document).on({
                    'contextmenu:hide.contextMenu': this.handler.hideMenu,
                    'prevcommand.contextMenu': this.handler.prevItem,
                    'nextcommand.contextMenu': this.handler.nextItem,
                    'contextmenu.contextMenu': this.handler.abortevent,
                    'mouseenter.contextMenu': this.handler.menuMouseenter,
                    'mouseleave.contextMenu': this.handler.menuMouseleave
                }, '.context-menu-list').on('mouseup.contextMenu', '.context-menu-input', this.handler.inputClick).on(contextMenuItemObj, '.context-menu-item');

                this.initialized = true;
            }

            options.context.on('contextmenu' + options.ns, options.selector, options, this.handler.contextmenu);

            switch (options.trigger) {
                case 'hover':
                    options.context.on('mouseenter' + options.ns, options.selector, options, this.handler.mouseenter).on('mouseleave' + options.ns, options.selector, options, this.handler.mouseleave);
                    break;

                case 'left':
                    options.context.on('click' + options.ns, options.selector, options, this.handler.click);
                    break;
                case 'touchstart':
                    options.context.on('touchstart' + options.ns, options.selector, options, this.handler.click);
                    break;
            }

            if (!options.build) {
                this.operations.create(null, options);
            }
        }
    }, {
        key: 'update',
        value: function update(options) {
            options = this.buildOptions(options);

            if (options._hasContext) {
                this.operations.update(null, $(options.context).data('contextMenu'), $(options.context).data('contextMenuRoot'));
            } else {
                for (var menu in this.menus) {
                    if (this.menus.hasOwnProperty(menu)) {
                        this.operations.update(null, this.menus[menu]);
                    }
                }
            }
        }
    }, {
        key: 'buildOptions',
        value: function buildOptions(userOptions) {
            if (typeof userOptions === 'string') {
                userOptions = { selector: userOptions };
            }

            var options = $.extend(true, { manager: this }, this.defaults, userOptions);

            if (!options.context || !options.context.length) {
                options.context = $(document);
                options._hasContext = false;
            } else {
                options.context = $(options.context).first();
                options._hasContext = !$(options.context).is($(document));
            }
            return options;
        }
    }, {
        key: 'normalizeArguments',
        value: function normalizeArguments(operation, options) {
            if (typeof operation !== 'string') {
                options = operation;
                operation = 'create';
            }

            if (typeof options === 'string') {
                options = { selector: options };
            } else if (typeof options === 'undefined') {
                options = {};
            }
            return { operation: operation, options: options };
        }
    }, {
        key: 'setInputValues',
        value: function setInputValues(contextMenuData, data) {
            if (typeof data === 'undefined') {
                data = {};
            }

            $.each(contextMenuData.inputs, function (key, item) {
                switch (item.type) {
                    case 'text':
                    case 'textarea':
                        item.value = data[key] || '';
                        break;

                    case 'checkbox':
                        item.selected = !!data[key];
                        break;

                    case 'radio':
                        item.selected = (data[item.radio] || '') === item.value;
                        break;

                    case 'select':
                        item.selected = data[key] || '';
                        break;
                }
            });
        }
    }, {
        key: 'getInputValues',
        value: function getInputValues(contextMenuData, data) {
            if (typeof data === 'undefined') {
                data = {};
            }

            $.each(contextMenuData.inputs, function (key, item) {
                switch (item.type) {
                    case 'text':
                    case 'textarea':
                    case 'select':
                        data[key] = item.$input.val();
                        break;

                    case 'checkbox':
                        data[key] = item.$input.prop('checked');
                        break;

                    case 'radio':
                        if (item.$input.prop('checked')) {
                            data[item.radio] = item.value;
                        }
                        break;
                }
            });

            return data;
        }
    }]);

    return ContextMenu;
}();

exports.default = ContextMenu;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ContextMenuHelper = __webpack_require__(6);

var _ContextMenuHelper2 = _interopRequireDefault(_ContextMenuHelper);

var _ContextMenuItemTypes = __webpack_require__(0);

var _ContextMenuItemTypes2 = _interopRequireDefault(_ContextMenuItemTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContextMenuOperations = function () {
    function ContextMenuOperations() {
        _classCallCheck(this, ContextMenuOperations);

        return this;
    }

    _createClass(ContextMenuOperations, [{
        key: 'show',
        value: function show(e, menuData, x, y) {
            var $trigger = $(this);
            var css = {};

            $('#context-menu-layer').trigger('mousedown');

            menuData.$trigger = $trigger;

            if (menuData.events.show.call($trigger, e, menuData) === false) {
                menuData.manager.handler.$currentTrigger = null;
                return;
            }

            menuData.manager.operations.update.call($trigger, e, menuData);

            menuData.position.call($trigger, e, menuData, x, y);

            if (menuData.zIndex) {
                var additionalZValue = menuData.zIndex;

                if (typeof menuData.zIndex === 'function') {
                    additionalZValue = menuData.zIndex.call($trigger, menuData);
                }
                css.zIndex = _ContextMenuHelper2.default.zindex($trigger) + additionalZValue;
            }

            menuData.manager.operations.layer.call(menuData.$menu, e, menuData, css.zIndex);

            menuData.$menu.find('ul').css('zIndex', css.zIndex + 1);

            menuData.$menu.css(css)[menuData.animation.show](menuData.animation.duration, function () {
                $trigger.trigger('contextmenu:visible');

                menuData.manager.operations.activated(e, menuData);
                menuData.events.activated($trigger, e, menuData);
            });

            $trigger.data('contextMenu', menuData).addClass('context-menu-active');

            $(document).off('keydown.contextMenu').on('keydown.contextMenu', menuData, menuData.manager.handler.key);

            if (menuData.autoHide) {
                $(document).on('mousemove.contextMenuAutoHide', function (e) {
                    var pos = $trigger.offset();
                    pos.right = pos.left + $trigger.outerWidth();
                    pos.bottom = pos.top + $trigger.outerHeight();

                    if (menuData.$layer && !menuData.hovering && (!(e.pageX >= pos.left && e.pageX <= pos.right) || !(e.pageY >= pos.top && e.pageY <= pos.bottom))) {
                        setTimeout(function () {
                            if (!menuData.hovering && menuData.$menu !== null && typeof menuData.$menu !== 'undefined') {
                                menuData.$menu.trigger('contextmenu:hide');
                            }
                        }, 50);
                    }
                });
            }
        }
    }, {
        key: 'hide',
        value: function hide(e, menuData, force) {
            var $trigger = $(this);
            if ((typeof menuData === 'undefined' ? 'undefined' : _typeof(menuData)) !== 'object' && $trigger.data('contextMenu')) {
                menuData = $trigger.data('contextMenu');
            } else if ((typeof menuData === 'undefined' ? 'undefined' : _typeof(menuData)) !== 'object') {
                return;
            }

            if (!force && menuData.events && menuData.events.hide.call($trigger, e, menuData) === false) {
                return;
            }

            $trigger.removeData('contextMenu').removeClass('context-menu-active');

            if (menuData.$layer) {
                setTimeout(function ($layer) {
                    return function () {
                        $layer.remove();
                    };
                }(menuData.$layer), 10);

                try {
                    delete menuData.$layer;
                } catch (e) {
                    menuData.$layer = null;
                }
            }

            menuData.manager.handler.$currentTrigger = null;

            menuData.$menu.find('.' + menuData.classNames.hover).trigger('contextmenu:blur');
            menuData.$selected = null;

            menuData.$menu.find('.' + menuData.classNames.visible).removeClass(menuData.classNames.visible);

            $(document).off('.contextMenuAutoHide').off('keydown.contextMenu');

            if (menuData.$menu) {
                menuData.$menu[menuData.animation.hide](menuData.animation.duration, function () {
                    if (menuData.build) {
                        menuData.$menu.remove();
                        Object.keys(menuData).forEach(function (key) {
                            switch (key) {
                                case 'ns':
                                case 'selector':
                                case 'build':
                                case 'trigger':
                                    return true;

                                default:
                                    menuData[key] = undefined;
                                    try {
                                        delete menuData[key];
                                    } catch (e) {}
                                    return true;
                            }
                        });
                    }

                    setTimeout(function () {
                        $trigger.trigger('contextmenu:hidden');
                    }, 10);
                });
            }
        }
    }, {
        key: 'create',
        value: function create(e, currentMenuData, rootMenuData) {
            if (typeof rootMenuData === 'undefined') {
                rootMenuData = currentMenuData;
            }

            currentMenuData.$menu = $('<ul class="context-menu-list"></ul>').addClass(currentMenuData.className || '').data({
                'contextMenu': currentMenuData,
                'contextMenuRoot': rootMenuData
            });

            $.each(['callbacks', 'commands', 'inputs'], function (i, k) {
                currentMenuData[k] = {};
                if (!rootMenuData[k]) {
                    rootMenuData[k] = {};
                }
            });

            if (!rootMenuData.accesskeys) {
                rootMenuData.accesskeys = {};
            }

            function createNameNode(item) {
                var $name = $('<span></span>');
                if (item._accesskey) {
                    if (item._beforeAccesskey) {
                        $name.append(document.createTextNode(item._beforeAccesskey));
                    }
                    $('<span></span>').addClass('context-menu-accesskey').text(item._accesskey).appendTo($name);
                    if (item._afterAccesskey) {
                        $name.append(document.createTextNode(item._afterAccesskey));
                    }
                } else {
                    if (item.isHtmlName) {
                        if (typeof item.accesskey !== 'undefined') {
                            throw new Error('accesskeys are not compatible with HTML names and cannot be used together in the same item');
                        }
                        $name.html(item.name);
                    } else {
                        $name.text(item.name);
                    }
                }
                return $name;
            }

            $.each(currentMenuData.items, function (key, item) {
                var $t = $('<li class="context-menu-item"></li>').addClass(item.className || '');
                var $label = null;
                var $input = null;

                $t.on('click', $.noop);

                if (typeof item === 'string' || item.type === 'cm_seperator') {
                    item = { type: _ContextMenuItemTypes2.default.separator };
                }

                item.$node = $t.data({
                    'contextMenu': currentMenuData,
                    'contextMenuRoot': rootMenuData,
                    'contextMenuKey': key
                });

                if (typeof item.accesskey !== 'undefined') {
                    var aks = _ContextMenuHelper2.default.splitAccesskey(item.accesskey);
                    for (var i = 0, ak; ak = aks[i]; i++) {
                        if (!rootMenuData.accesskeys[ak]) {
                            rootMenuData.accesskeys[ak] = item;
                            var matched = item.name.match(new RegExp('^(.*?)(' + ak + ')(.*)$', 'i'));
                            if (matched) {
                                item._beforeAccesskey = matched[1];
                                item._accesskey = matched[2];
                                item._afterAccesskey = matched[3];
                            }
                            break;
                        }
                    }
                }

                if (item.type && rootMenuData.types[item.type]) {
                    rootMenuData.types[item.type].call($t, e, item, currentMenuData, rootMenuData);

                    $.each([currentMenuData, rootMenuData], function (i, k) {
                        k.commands[key] = item;

                        if ($.isFunction(item.callback) && (typeof k.callbacks[key] === 'undefined' || typeof currentMenuData.type === 'undefined')) {
                            k.callbacks[key] = item.callback;
                        }
                    });
                } else {
                    if (item.type === _ContextMenuItemTypes2.default.separator) {
                        $t.addClass('context-menu-separator ' + rootMenuData.classNames.notSelectable);
                    } else if (item.type === _ContextMenuItemTypes2.default.html) {
                        $t.addClass('context-menu-html ' + rootMenuData.classNames.notSelectable);
                    } else if (item.type && item.type !== _ContextMenuItemTypes2.default.submenu) {
                        $label = $('<label></label>').appendTo($t);
                        createNameNode(item).appendTo($label);

                        $t.addClass('context-menu-input');
                        currentMenuData.hasTypes = true;
                        $.each([currentMenuData, rootMenuData], function (i, k) {
                            k.commands[key] = item;
                            k.inputs[key] = item;
                        });
                    } else if (item.items) {
                        item.type = _ContextMenuItemTypes2.default.submenu;
                    }

                    switch (item.type) {
                        case _ContextMenuItemTypes2.default.separator:
                            break;

                        case _ContextMenuItemTypes2.default.text:
                            $input = $('<input type="text" value="1" name="" />').attr('name', 'context-menu-input-' + key).val(item.value || '').appendTo($label);
                            break;

                        case _ContextMenuItemTypes2.default.textarea:
                            $input = $('<textarea name=""></textarea>').attr('name', 'context-menu-input-' + key).val(item.value || '').appendTo($label);

                            if (item.height) {
                                $input.height(item.height);
                            }
                            break;

                        case _ContextMenuItemTypes2.default.checkbox:
                            $input = $('<input type="checkbox" value="1" name="" />').attr('name', 'context-menu-input-' + key).val(item.value || '').prop('checked', !!item.selected).prependTo($label);
                            break;

                        case _ContextMenuItemTypes2.default.radio:
                            $input = $('<input type="radio" value="1" name="" />').attr('name', 'context-menu-input-' + item.radio).val(item.value || '').prop('checked', !!item.selected).prependTo($label);
                            break;

                        case _ContextMenuItemTypes2.default.select:
                            $input = $('<select name=""></select>').attr('name', 'context-menu-input-' + key).appendTo($label);
                            if (item.options) {
                                $.each(item.options, function (value, text) {
                                    $('<option></option>').val(value).text(text).appendTo($input);
                                });
                                $input.val(item.selected);
                            }
                            break;

                        case _ContextMenuItemTypes2.default.submenu:
                            createNameNode(item).appendTo($t);
                            item.appendTo = item.$node;
                            $t.data('contextMenu', item).addClass('context-menu-submenu');
                            item.callback = null;

                            if (typeof item.items.then === 'function') {
                                rootMenuData.manager.operations.processPromises(e, item, rootMenuData, item.items);
                            } else {
                                rootMenuData.manager.operations.create(e, item, rootMenuData);
                            }
                            break;

                        case _ContextMenuItemTypes2.default.html:
                            $(item.html).appendTo($t);
                            break;

                        default:
                            $.each([currentMenuData, rootMenuData], function (i, k) {
                                k.commands[key] = item;

                                if ($.isFunction(item.callback) && (typeof k.callbacks[key] === 'undefined' || typeof currentMenuData.type === 'undefined')) {
                                    k.callbacks[key] = item.callback;
                                }
                            });
                            createNameNode(item).appendTo($t);
                            break;
                    }

                    if (item.type && item.type !== _ContextMenuItemTypes2.default.submenu && item.type !== _ContextMenuItemTypes2.default.html && item.type !== _ContextMenuItemTypes2.default.separator) {
                        $input.on('focus', rootMenuData.manager.handler.focusInput).on('blur', rootMenuData.manager.handler.blurInput);

                        if (item.events) {
                            $input.on(item.events, currentMenuData);
                        }
                    }

                    if (item.icon) {
                        if ($.isFunction(item.icon)) {
                            item._icon = item.icon.call(this, e, $t, key, item, currentMenuData, rootMenuData);
                        } else {
                            if (typeof item.icon === 'string' && item.icon.substring(0, 3) === 'fa-') {
                                item._icon = rootMenuData.classNames.icon + ' ' + rootMenuData.classNames.icon + '--fa fa ' + item.icon;
                            } else {
                                item._icon = rootMenuData.classNames.icon + ' ' + rootMenuData.classNames.icon + '-' + item.icon;
                            }
                        }
                        $t.addClass(item._icon);
                    }
                }

                item.$input = $input;
                item.$label = $label;

                $t.appendTo(currentMenuData.$menu);

                if (!currentMenuData.hasTypes && $.support.eventSelectstart) {
                    $t.on('selectstart.disableTextSelect', currentMenuData.manager.handler.abortevent);
                }
            });

            if (!currentMenuData.$node) {
                currentMenuData.$menu.css('display', 'none').addClass('context-menu-rootMenuData');
            }
            currentMenuData.$menu.appendTo(currentMenuData.appendTo || document.body);
        }
    }, {
        key: 'resize',
        value: function resize(e, $menu, nested) {
            var domMenu = void 0;

            $menu.css({ position: 'absolute', display: 'block' });

            $menu.data('width', (domMenu = $menu.get(0)).getBoundingClientRect ? Math.ceil(domMenu.getBoundingClientRect().width) : $menu.outerWidth() + 1);
            $menu.css({
                position: 'static',
                minWidth: '0px',
                maxWidth: '100000px'
            });

            $menu.find('> li > ul').each(function (index, element) {
                e.data.manager.operations.resize(e, $(element), true);
            });

            if (!nested) {
                $menu.find('ul').addBack().css({
                    position: '',
                    display: '',
                    minWidth: '',
                    maxWidth: ''
                }).outerWidth(function () {
                    return $(this).data('width');
                });
            }
        }
    }, {
        key: 'update',
        value: function update(e, currentMenuData, rootMenuData) {
            var $trigger = this;
            if (typeof rootMenuData === 'undefined') {
                rootMenuData = currentMenuData;
                rootMenuData.manager.operations.resize(e, currentMenuData.$menu);
            }

            currentMenuData.$menu.children().each(function (index, element) {
                var $item = $(element);
                var key = $item.data('contextMenuKey');
                var item = currentMenuData.items[key];

                var disabled = $.isFunction(item.disabled) && item.disabled.call($trigger, e, key, currentMenuData, rootMenuData) || item.disabled === true;
                var visible = void 0;

                if ($.isFunction(item.visible)) {
                    visible = item.visible.call($trigger, e, key, currentMenuData, rootMenuData);
                } else if (typeof item.visible !== 'undefined') {
                    visible = item.visible === true;
                } else {
                    visible = true;
                }
                $item[visible ? 'show' : 'hide']();

                $item[disabled ? 'addClass' : 'removeClass'](rootMenuData.classNames.disabled);

                if ($.isFunction(item.icon)) {
                    $item.removeClass(item._icon);
                    item._icon = item.icon.call($trigger, e, $item, key, item, currentMenuData, rootMenuData);
                    $item.addClass(item._icon);
                }

                if (item.type) {
                    $item.find('input, select, textarea').prop('disabled', disabled);

                    switch (item.type) {
                        case _ContextMenuItemTypes2.default.text:
                        case _ContextMenuItemTypes2.default.textarea:
                            item.$input.val(item.value || '');
                            break;

                        case _ContextMenuItemTypes2.default.checkbox:
                        case _ContextMenuItemTypes2.default.radio:
                            item.$input.val(item.value || '').prop('checked', !!item.selected);
                            break;

                        case _ContextMenuItemTypes2.default.select:
                            item.$input.val((item.selected === 0 ? '0' : item.selected) || '');
                            break;
                    }
                }

                if (item.$menu) {
                    rootMenuData.manager.operations.update.call($trigger, e, item, rootMenuData);
                }
            });
        }
    }, {
        key: 'layer',
        value: function layer(e, menuData, zIndex) {
            var $window = $(window);

            var $layer = menuData.$layer = $('<div id="context-menu-layer"></div>').css({
                height: $window.height(),
                width: $window.width(),
                display: 'block',
                position: 'fixed',
                'z-index': zIndex,
                top: 0,
                left: 0,
                opacity: 0,
                filter: 'alpha(opacity=0)',
                'background-color': '#000'
            }).data('contextMenuRoot', menuData).insertBefore(this).on('contextmenu', menuData.manager.handler.abortevent).on('mousedown', menuData.manager.handler.layerClick);

            if (typeof document.body.style.maxWidth === 'undefined') {
                $layer.css({
                    'position': 'absolute',
                    'height': $(document).height()
                });
            }

            return $layer;
        }
    }, {
        key: 'processPromises',
        value: function processPromises(e, currentMenuData, rootMenuData, promise) {
            currentMenuData.$node.addClass(rootMenuData.classNames.iconLoadingClass);

            function finishPromiseProcess(currentMenuData, rootMenuData, items) {
                if (typeof rootMenuData.$menu === 'undefined' || !rootMenuData.$menu.is(':visible')) {
                    return;
                }
                currentMenuData.$node.removeClass(rootMenuData.classNames.iconLoadingClass);
                currentMenuData.items = items;
                rootMenuData.manager.operations.create(e, currentMenuData, rootMenuData);
                rootMenuData.manager.operations.update(e, currentMenuData, rootMenuData);
                rootMenuData.positionSubmenu.call(currentMenuData.$node, e, currentMenuData.$menu);
            }

            function errorPromise(currentMenuData, rootMenuData, errorItem) {
                if (typeof errorItem === 'undefined') {
                    errorItem = {
                        'error': {
                            name: 'No items and no error item',
                            icon: 'context-menu-icon context-menu-icon-quit'
                        }
                    };
                    if (window.console) {
                        (console.error || console.log).call(console, 'When you reject a promise, provide an "items" object, equal to normal sub-menu items');
                    }
                } else if (typeof errorItem === 'string') {
                    errorItem = { 'error': { name: errorItem } };
                }
                finishPromiseProcess(currentMenuData, rootMenuData, errorItem);
            }

            function completedPromise(currentMenuData, rootMenuData, items) {
                if (typeof items === 'undefined') {
                    errorPromise(undefined);
                }
                finishPromiseProcess(currentMenuData, rootMenuData, items);
            }

            promise.then(completedPromise.bind(this, currentMenuData, rootMenuData), errorPromise.bind(this, currentMenuData, rootMenuData));
        }
    }, {
        key: 'activated',
        value: function activated(e, menuData) {
            var $menu = menuData.$menu;
            var $menuOffset = $menu.offset();
            var winHeight = $(window).height();
            var winScrollTop = $(window).scrollTop();
            var menuHeight = $menu.height();
            if (menuHeight > winHeight) {
                $menu.css({
                    'height': winHeight + 'px',
                    'overflow-x': 'hidden',
                    'overflow-y': 'auto',
                    'top': winScrollTop + 'px'
                });
            } else if ($menuOffset.top < winScrollTop || $menuOffset.top + menuHeight > winScrollTop + winHeight) {
                $menu.css({
                    'top': '0px'
                });
            }
        }
    }]);

    return ContextMenuOperations;
}();

exports.default = ContextMenuOperations;
;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContextMenuHelper = function () {
    function ContextMenuHelper() {
        _classCallCheck(this, ContextMenuHelper);
    }

    _createClass(ContextMenuHelper, null, [{
        key: 'zindex',
        value: function zindex($t) {
            var zin = 0;
            var $tt = $t;

            while (true) {
                zin = Math.max(zin, parseInt($tt.css('z-index'), 10) || 0);
                $tt = $tt.parent();
                if (!$tt || !$tt.length || 'html body'.indexOf($tt.prop('nodeName').toLowerCase()) > -1) {
                    break;
                }
            }
            return zin;
        }
    }, {
        key: 'splitAccesskey',
        value: function splitAccesskey(val) {
            var t = val.split(/\s+/);
            var keys = [];

            for (var i = 0, k; k = t[i]; i++) {
                k = k.charAt(0).toUpperCase();
                keys.push(k);
            }

            return keys;
        }
    }]);

    return ContextMenuHelper;
}();

exports.default = ContextMenuHelper;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.determinePosition = determinePosition;
exports.position = position;
exports.positionSubmenu = positionSubmenu;
function determinePosition($menu) {
    if ($.ui && $.ui.position) {
        $menu.css('display', 'block').position({
            my: 'center top',
            at: 'center bottom',
            of: this,
            offset: '0 5',
            collision: 'fit'
        }).css('display', 'none');
    } else {
        var offset = this.offset();
        offset.top += this.outerHeight();
        offset.left += this.outerWidth() / 2 - $menu.outerWidth() / 2;
        $menu.css(offset);
    }
}

function position(e, currentMenuData, x, y) {
    var $window = $(window);
    var offset = void 0;

    if (!x && !y) {
        currentMenuData.determinePosition.call(this, currentMenuData.$menu);
        return;
    } else if (x === 'maintain' && y === 'maintain') {
        offset = currentMenuData.$menu.position();
    } else {
        var offsetParentOffset = currentMenuData.$menu.offsetParent().offset();
        offset = { top: y - offsetParentOffset.top, left: x - offsetParentOffset.left };
    }

    var bottom = $window.scrollTop() + $window.height();
    var right = $window.scrollLeft() + $window.width();
    var height = currentMenuData.$menu.outerHeight();
    var width = currentMenuData.$menu.outerWidth();

    if (offset.top + height > bottom) {
        offset.top -= height;
    }

    if (offset.top < 0) {
        offset.top = 0;
    }

    if (offset.left + width > right) {
        offset.left -= width;
    }

    if (offset.left < 0) {
        offset.left = 0;
    }

    currentMenuData.$menu.css(offset);
}

function positionSubmenu(e, $menu) {
    if (typeof $menu === 'undefined') {
        return;
    }
    if ($.ui && $.ui.position) {
        $menu.css('display', 'block').position({
            my: 'left top-5',
            at: 'right top',
            of: this,
            collision: 'flipfit fit'
        }).css('display', '');
    } else {
        var offset = {
            top: -9,
            left: this.outerWidth() - 5
        };
        $menu.css(offset);
    }
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContextMenuHtml5Builder = function () {
    function ContextMenuHtml5Builder() {
        _classCallCheck(this, ContextMenuHtml5Builder);
    }

    _createClass(ContextMenuHtml5Builder, [{
        key: 'inputLabel',
        value: function inputLabel(node) {
            return node.id && $('label[for="' + node.id + '"]').val() || node.name;
        }
    }, {
        key: 'fromMenu',
        value: function fromMenu(element) {
            var $this = $(element);
            var items = {};

            this.build(items, $this.children());

            return items;
        }
    }, {
        key: 'build',
        value: function build(items, $children, counter) {
            if (!counter) {
                counter = 0;
            }

            var builder = this;

            $children.each(function () {
                var $node = $(this);
                var node = this;
                var nodeName = this.nodeName.toLowerCase();
                var label = void 0;
                var item = void 0;

                if (nodeName === 'label' && $node.find('input, textarea, select').length) {
                    label = $node.text();
                    $node = $node.children().first();
                    node = $node.get(0);
                    nodeName = node.nodeName.toLowerCase();
                }

                switch (nodeName) {
                    case 'menu':
                        item = { name: $node.attr('label'), items: {} };
                        counter = builder.build(item.items, $node.children(), counter);
                        break;

                    case 'a':
                    case 'button':
                        item = {
                            name: $node.text(),
                            disabled: !!$node.attr('disabled'),
                            callback: function () {
                                return function () {
                                    $node.get(0).click();
                                };
                            }()
                        };
                        break;

                    case 'menuitem':
                    case 'command':
                        switch ($node.attr('type')) {
                            case undefined:
                            case 'command':
                            case 'menuitem':
                                item = {
                                    name: $node.attr('label'),
                                    disabled: !!$node.attr('disabled'),
                                    icon: $node.attr('icon'),
                                    callback: function () {
                                        return function () {
                                            $node.get(0).click();
                                        };
                                    }()
                                };
                                break;

                            case 'checkbox':
                                item = {
                                    type: 'checkbox',
                                    disabled: !!$node.attr('disabled'),
                                    name: $node.attr('label'),
                                    selected: !!$node.attr('checked')
                                };
                                break;
                            case 'radio':
                                item = {
                                    type: 'radio',
                                    disabled: !!$node.attr('disabled'),
                                    name: $node.attr('label'),
                                    radio: $node.attr('radiogroup'),
                                    value: $node.attr('id'),
                                    selected: !!$node.attr('checked')
                                };
                                break;

                            default:
                                item = undefined;
                        }
                        break;

                    case 'hr':
                        item = '-------';
                        break;

                    case 'input':
                        switch ($node.attr('type')) {
                            case 'text':
                                item = {
                                    type: 'text',
                                    name: label || builder.inputLabel(node),
                                    disabled: !!$node.attr('disabled'),
                                    value: $node.val()
                                };
                                break;

                            case 'checkbox':
                                item = {
                                    type: 'checkbox',
                                    name: label || builder.inputLabel(node),
                                    disabled: !!$node.attr('disabled'),
                                    selected: !!$node.attr('checked')
                                };
                                break;

                            case 'radio':
                                item = {
                                    type: 'radio',
                                    name: label || builder.inputLabel(node),
                                    disabled: !!$node.attr('disabled'),
                                    radio: !!$node.attr('name'),
                                    value: $node.val(),
                                    selected: !!$node.attr('checked')
                                };
                                break;

                            default:
                                item = undefined;
                                break;
                        }
                        break;

                    case 'select':
                        item = {
                            type: 'select',
                            name: label || builder.inputLabel(node),
                            disabled: !!$node.attr('disabled'),
                            selected: $node.val(),
                            options: {}
                        };
                        $node.children().each(function () {
                            item.options[this.value] = $(this).text();
                        });
                        break;

                    case 'textarea':
                        item = {
                            type: 'textarea',
                            name: label || builder.inputLabel(node),
                            disabled: !!$node.attr('disabled'),
                            value: $node.val()
                        };
                        break;

                    case 'label':
                        break;

                    default:
                        item = { type: 'html', html: $node.clone(true) };
                        break;
                }

                if (item) {
                    counter++;
                    items['key' + counter] = item;
                }
            });

            return counter;
        }
    }]);

    return ContextMenuHtml5Builder;
}();

exports.default = ContextMenuHtml5Builder;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _defaults = __webpack_require__(1);

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContextMenuEventHandler = function () {
    function ContextMenuEventHandler() {
        _classCallCheck(this, ContextMenuEventHandler);

        this.$currentTrigger = null;
        this.hoveract = {};
    }

    _createClass(ContextMenuEventHandler, [{
        key: 'abortevent',
        value: function abortevent(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }
    }, {
        key: 'contextmenu',
        value: function contextmenu(e) {
            var $this = $(e.currentTarget);

            if (!e.data) {
                throw new Error('No data attached');
            }

            if (e.data.trigger === 'right') {
                e.preventDefault();
                e.stopImmediatePropagation();
            }

            if (e.data.trigger !== 'right' && e.data.trigger !== 'demand' && e.originalEvent) {
                return;
            }

            if (typeof e.mouseButton !== 'undefined') {
                if (!(e.data.trigger === 'left' && e.mouseButton === 0) && !(e.data.trigger === 'right' && e.mouseButton === 2)) {
                    return;
                }
            }

            if ($this.hasClass('context-menu-active')) {
                return;
            }

            if (!$this.hasClass('context-menu-disabled')) {

                e.data.manager.handler.$currentTrigger = $this;
                if (e.data.build) {
                    var built = e.data.build(e, $this);

                    if (built === false) {
                        return;
                    }

                    e.data = $.extend(true, {}, _defaults2.default, e.data, built || {});

                    if (!e.data.items || $.isEmptyObject(e.data.items)) {
                        if (window.console) {
                            (console.error || console.log).call(console, 'No items specified to show in contextMenu');
                        }

                        throw new Error('No Items specified');
                    }

                    e.data.$trigger = e.data.manager.handler.$currentTrigger;

                    e.data.manager.operations.create(e, e.data);
                }
                var showMenu = false;
                for (var key in e.data.items) {
                    if (e.data.items.hasOwnProperty(key)) {
                        var visible = void 0;
                        if ($.isFunction(e.data.items[key].visible)) {
                            visible = e.data.items[key].visible.call($this, e, key, e.data, e.data);
                        } else if (typeof e.data.items[key].visible !== 'undefined') {
                            visible = e.data.items[key].visible === true;
                        } else {
                            visible = true;
                        }
                        if (visible) {
                            showMenu = true;
                        }
                    }
                }
                if (showMenu) {
                    e.data.manager.operations.show.call($this, e, e.data, e.pageX, e.pageY);
                }
            }
        }
    }, {
        key: 'click',
        value: function click(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $(this).trigger($.Event('contextmenu', { data: e.data, pageX: e.pageX, pageY: e.pageY, originalEvent: e }));
        }
    }, {
        key: 'mousedown',
        value: function mousedown(e) {
            var $this = $(this);

            if (e.data.manager.handler.$currentTrigger && e.data.manager.handler.$currentTrigger.length && !e.data.manager.handler.$currentTrigger.is($this)) {
                e.data.manager.handler.$currentTrigger.data('contextMenu').$menu.trigger($.Event('contextmenu', { data: e.data, originalEvent: e }));
            }

            if (e.button === 2) {
                e.data.manager.handler.$currentTrigger = $this.data('contextMenuActive', true);
            }
        }
    }, {
        key: 'mouseup',
        value: function mouseup(e) {
            var $this = $(this);
            if ($this.data('contextMenuActive') && e.data.manager.handler.$currentTrigger && e.data.manager.handler.$currentTrigger.length && e.data.manager.handler.$currentTrigger.is($this) && !$this.hasClass('context-menu-disabled')) {
                e.preventDefault();
                e.stopImmediatePropagation();
                e.data.manager.handler.$currentTrigger = $this;
                $this.trigger($.Event('contextmenu', { data: e.data, pageX: e.pageX, pageY: e.pageY, originalEvent: e }));
            }

            $this.removeData('contextMenuActive');
        }
    }, {
        key: 'mouseenter',
        value: function mouseenter(e) {
            var $this = $(this);
            var $related = $(e.relatedTarget);
            var $document = $(document);

            if ($related.is('.context-menu-list') || $related.closest('.context-menu-list').length) {
                return;
            }

            if (e.data.manager.handler.$currentTrigger && e.data.manager.handler.$currentTrigger.length) {
                return;
            }

            e.data.manager.handler.hoveract.pageX = e.pageX;
            e.data.manager.handler.hoveract.pageY = e.pageY;
            e.data.manager.handler.hoveract.data = e.data;
            $document.on('mousemove.contextMenuShow', e.data.manager.handler.mousemove);
            e.data.manager.handler.hoveract.timer = setTimeout(function () {
                e.data.manager.handler.hoveract.timer = null;
                $document.off('mousemove.contextMenuShow');
                e.data.manager.handler.$currentTrigger = $this;
                $this.trigger($.Event('contextmenu', {
                    data: e.data.manager.handler.hoveract.data,
                    pageX: e.data.manager.handler.hoveract.pageX,
                    pageY: e.data.manager.handler.hoveract.pageY
                }));
            }, e.data.delay);
        }
    }, {
        key: 'mousemove',
        value: function mousemove(e) {
            e.data.manager.handler.hoveract.pageX = e.pageX;
            e.data.manager.handler.hoveract.pageY = e.pageY;
        }
    }, {
        key: 'mouseleave',
        value: function mouseleave(e) {
            var $related = $(e.relatedTarget);
            if ($related.is('.context-menu-list') || $related.closest('.context-menu-list').length) {
                return;
            }

            try {
                clearTimeout(e.data.manager.handler.hoveract.timer);
            } catch (e) {}

            e.data.manager.handler.hoveract.timer = null;
        }
    }, {
        key: 'layerClick',
        value: function layerClick(e) {
            var $this = $(this);
            var root = $this.data('contextMenuRoot');

            if (root === null || typeof root === 'undefined') {
                throw new Error('No ContextMenuData found');
            }

            var button = e.button;
            var x = e.pageX;
            var y = e.pageY;
            var target = void 0;
            var offset = void 0;

            e.preventDefault();

            setTimeout(function () {
                var $window = $(window);
                var triggerAction = root.trigger === 'left' && button === 0 || root.trigger === 'right' && button === 2;

                if (document.elementFromPoint && root.$layer) {
                    root.$layer.hide();
                    target = document.elementFromPoint(x - $window.scrollLeft(), y - $window.scrollTop());

                    if (target.isContentEditable) {
                        var range = document.createRange();
                        var sel = window.getSelection();
                        range.selectNode(target);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                    $(target).trigger(e);
                    root.$layer.show();
                }

                if (root.hideOnSecondTrigger && triggerAction && root.$menu !== null && typeof root.$menu !== 'undefined') {
                    root.$menu.trigger('contextmenu:hide', { data: root, originalEvent: e });
                    return;
                }

                if (root.reposition && triggerAction) {
                    if (document.elementFromPoint) {
                        if (root.$trigger.is(target)) {
                            root.position.call(root.$trigger, e, root, x, y);
                            return;
                        }
                    } else {
                        offset = root.$trigger.offset();
                        var _$window = $(window);

                        offset.top += _$window.scrollTop();
                        if (offset.top <= e.pageY) {
                            offset.left += _$window.scrollLeft();
                            if (offset.left <= e.pageX) {
                                offset.bottom = offset.top + root.$trigger.outerHeight();
                                if (offset.bottom >= e.pageY) {
                                    offset.right = offset.left + root.$trigger.outerWidth();
                                    if (offset.right >= e.pageX) {
                                        root.position.call(root.$trigger, e, root, x, y);
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }

                if (target && triggerAction) {
                    root.$trigger.one('contextmenu:hidden', function () {
                        $(target).contextMenu({ x: x, y: y, button: button, originalEvent: e });
                    });
                }

                if (root.$menu !== null && typeof root.$menu !== 'undefined') {
                    root.$menu.trigger('contextmenu:hide', { data: root, originalEvent: e });
                }
            }, 50);
        }
    }, {
        key: 'keyStop',
        value: function keyStop(e, currentMenuData) {
            if (!currentMenuData.isInput) {
                e.preventDefault();
            }

            e.stopPropagation();
        }
    }, {
        key: 'key',
        value: function key(e) {
            var rootMenuData = {};

            if (e.data.manager.handler.$currentTrigger) {
                rootMenuData = e.data.manager.handler.$currentTrigger.data('contextMenu') || {};
            }

            if (typeof rootMenuData.zIndex === 'undefined') {
                rootMenuData.zIndex = 0;
            }
            var getZIndexOfTriggerTarget = function getZIndexOfTriggerTarget(target) {
                if (target.style.zIndex !== '') {
                    return target.style.zIndex;
                } else {
                    if (target.offsetParent !== null && typeof target.offsetParent !== 'undefined') {
                        return getZIndexOfTriggerTarget(target.offsetParent);
                    } else if (target.parentElement !== null && typeof target.parentElement !== 'undefined') {
                        return getZIndexOfTriggerTarget(target.parentElement);
                    }
                }
            };
            var targetZIndex = getZIndexOfTriggerTarget(e.target);

            if (rootMenuData.$menu && parseInt(targetZIndex, 10) > parseInt(rootMenuData.$menu.css('zIndex'), 10)) {
                return;
            }
            switch (e.keyCode) {
                case 9:
                case 38:
                    e.data.manager.handler.keyStop(e, rootMenuData);

                    if (rootMenuData.isInput) {
                        if (e.keyCode === 9 && e.shiftKey) {
                            e.preventDefault();
                            if (rootMenuData.$selected) {
                                rootMenuData.$selected.find('input, textarea, select').blur();
                            }
                            if (rootMenuData.$menu !== null && typeof rootMenuData.$menu !== 'undefined') {
                                rootMenuData.$menu.trigger('prevcommand', { data: rootMenuData, originalEvent: e });
                            }
                            return;
                        } else if (e.keyCode === 38 && rootMenuData.$selected.find('input, textarea, select').prop('type') === 'checkbox') {
                            e.preventDefault();
                            return;
                        }
                    } else if (e.keyCode !== 9 || e.shiftKey) {
                        if (rootMenuData.$menu !== null && typeof rootMenuData.$menu !== 'undefined') {
                            rootMenuData.$menu.trigger('prevcommand', { data: rootMenuData, originalEvent: e });
                        }
                        return;
                    }
                    break;

                case 40:
                    e.data.manager.handler.keyStop(e, rootMenuData);
                    if (rootMenuData.isInput) {
                        if (e.keyCode === 9) {
                            e.preventDefault();
                            if (rootMenuData.$selected) {
                                rootMenuData.$selected.find('input, textarea, select').blur();
                            }
                            if (rootMenuData.$menu !== null && typeof rootMenuData.$menu !== 'undefined') {
                                rootMenuData.$menu.trigger('nextcommand', { data: rootMenuData, originalEvent: e });
                            }
                            return;
                        } else if (e.keyCode === 40 && rootMenuData.$selected.find('input, textarea, select').prop('type') === 'checkbox') {
                            e.preventDefault();
                            return;
                        }
                    } else {
                        if (rootMenuData.$menu !== null && typeof rootMenuData.$menu !== 'undefined') {
                            rootMenuData.$menu.trigger('nextcommand', { data: rootMenuData, originalEvent: e });
                        }
                        return;
                    }
                    break;

                case 37:
                    e.data.manager.handler.keyStop(e, rootMenuData);
                    if (rootMenuData.isInput || !rootMenuData.$selected || !rootMenuData.$selected.length) {
                        break;
                    }

                    if (!rootMenuData.$selected.parent().hasClass('context-menu-root')) {
                        var $parent = rootMenuData.$selected.parent().parent();
                        rootMenuData.$selected.trigger('contextmenu:blur', { data: rootMenuData, originalEvent: e });
                        rootMenuData.$selected = $parent;
                        return;
                    }
                    break;

                case 39:
                    e.data.manager.handler.keyStop(e, rootMenuData);
                    if (rootMenuData.isInput || !rootMenuData.$selected || !rootMenuData.$selected.length) {
                        break;
                    }

                    var itemdata = rootMenuData.$selected.data('contextMenu') || {};
                    if (itemdata.$menu && rootMenuData.$selected.hasClass('context-menu-submenu')) {
                        rootMenuData.$selected = null;
                        itemdata.$selected = null;
                        itemdata.$menu.trigger('nextcommand', { data: itemdata, originalEvent: e });
                        return;
                    }
                    break;

                case 35:
                case 36:
                    if (rootMenuData.$selected && rootMenuData.$selected.find('input, textarea, select').length) {
                        break;
                    } else {
                        (rootMenuData.$selected && rootMenuData.$selected.parent() || rootMenuData.$menu).children(':not(.' + rootMenuData.classNames.disabled + ', .' + rootMenuData.classNames.notSelectable + ')')[e.keyCode === 36 ? 'first' : 'last']().trigger('contextmenu:focus', { data: rootMenuData, originalEvent: e });
                        e.preventDefault();
                        break;
                    }
                case 13:
                    e.data.manager.handler.keyStop(e, rootMenuData);
                    if (rootMenuData.isInput) {
                        if (rootMenuData.$selected && !rootMenuData.$selected.is('textarea, select')) {
                            e.preventDefault();
                            return;
                        }
                        break;
                    }
                    if (typeof rootMenuData.$selected !== 'undefined' && rootMenuData.$selected !== null) {
                        rootMenuData.$selected.trigger('mouseup', { data: rootMenuData, originalEvent: e });
                    }
                    return;
                case 32:
                case 33:
                case 34:
                    e.data.manager.handler.keyStop(e, rootMenuData);
                    return;

                case 27:
                    e.data.manager.handler.keyStop(e, rootMenuData);
                    if (rootMenuData.$menu !== null && typeof rootMenuData.$menu !== 'undefined') {
                        rootMenuData.$menu.trigger('contextmenu:hide', { data: rootMenuData, originalEvent: e });
                    }
                    return;

                default:
                    var k = String.fromCharCode(e.keyCode).toUpperCase();
                    if (rootMenuData.accesskeys && rootMenuData.accesskeys[k]) {
                        rootMenuData.accesskeys[k].$node.trigger(rootMenuData.accesskeys[k].$menu ? 'contextmenu:focus' : 'mouseup', { data: rootMenuData, originalEvent: e });
                        return;
                    }
                    break;
            }

            e.stopPropagation();
            if (typeof rootMenuData.$selected !== 'undefined' && rootMenuData.$selected !== null) {
                rootMenuData.$selected.trigger(e);
            }
        }
    }, {
        key: 'prevItem',
        value: function prevItem(e) {
            e.stopPropagation();
            var currentMenuData = $(this).data('contextMenu') || {};
            var rootMenuData = $(this).data('contextMenuRoot') || {};

            if (currentMenuData.$selected) {
                var $s = currentMenuData.$selected;
                currentMenuData = currentMenuData.$selected.parent().data('contextMenu') || {};
                currentMenuData.$selected = $s;
            }

            var $children = currentMenuData.$menu.children();
            var $prev = !currentMenuData.$selected || !currentMenuData.$selected.prev().length ? $children.last() : currentMenuData.$selected.prev();
            var $round = $prev;

            while ($prev.hasClass(rootMenuData.classNames.disabled) || $prev.hasClass(rootMenuData.classNames.notSelectable) || $prev.is(':hidden')) {
                if ($prev.prev().length) {
                    $prev = $prev.prev();
                } else {
                    $prev = $children.last();
                }

                if ($prev.is($round)) {
                    return;
                }
            }

            if (currentMenuData.$selected) {
                rootMenuData.manager.handler.itemMouseleave.call(currentMenuData.$selected.get(0), e);
            }

            rootMenuData.manager.handler.itemMouseenter.call($prev.get(0), e);

            var $input = $prev.find('input, textarea, select');
            if ($input.length) {
                $input.focus();
            }
        }
    }, {
        key: 'nextItem',
        value: function nextItem(e) {
            e.stopPropagation();
            var currentMenuData = $(this).data('contextMenu') || {};
            var rootMenuData = $(this).data('contextMenuRoot') || {};

            if (currentMenuData.$selected) {
                var $s = currentMenuData.$selected;
                currentMenuData = currentMenuData.$selected.parent().data('contextMenu') || {};
                currentMenuData.$selected = $s;
            }

            var $children = currentMenuData.$menu.children();
            var $next = !currentMenuData.$selected || !currentMenuData.$selected.next().length ? $children.first() : currentMenuData.$selected.next();
            var $round = $next;

            while ($next.hasClass(rootMenuData.classNames.disabled) || $next.hasClass(rootMenuData.classNames.notSelectable) || $next.is(':hidden')) {
                if ($next.next().length) {
                    $next = $next.next();
                } else {
                    $next = $children.first();
                }
                if ($next.is($round)) {
                    return;
                }
            }

            if (currentMenuData.$selected) {
                rootMenuData.manager.handler.itemMouseleave.call(currentMenuData.$selected.get(0), e);
            }

            rootMenuData.manager.handler.itemMouseenter.call($next.get(0), e);

            var $input = $next.find('input, textarea, select');
            if ($input.length) {
                $input.focus();
            }
        }
    }, {
        key: 'focusInput',
        value: function focusInput(e) {
            var $this = $(this).closest('.context-menu-item');
            var data = $this.data();
            var currentMenuData = data.contextMenu;
            var rootMenuData = data.contextMenuRoot;

            rootMenuData.$selected = currentMenuData.$selected = $this;
            rootMenuData.isInput = currentMenuData.isInput = true;
        }
    }, {
        key: 'blurInput',
        value: function blurInput(e) {
            var $this = $(this).closest('.context-menu-item');
            var data = $this.data();
            var currentMenuData = data.contextMenu;
            var rootMenuData = data.contextMenuRoot;

            rootMenuData.isInput = currentMenuData.isInput = false;
        }
    }, {
        key: 'menuMouseenter',
        value: function menuMouseenter(e) {
            var root = $(this).data().contextMenuRoot;
            root.hovering = true;
        }
    }, {
        key: 'menuMouseleave',
        value: function menuMouseleave(e) {
            var root = $(this).data().contextMenuRoot;
            if (root.$layer && root.$layer.is(e.relatedTarget)) {
                root.hovering = false;
            }
        }
    }, {
        key: 'itemMouseenter',
        value: function itemMouseenter(e) {
            var $this = $(this);
            var data = $this.data();
            var currentMenuData = data.contextMenu;
            var rootMenuData = data.contextMenuRoot;

            rootMenuData.hovering = true;

            if (e && rootMenuData.$layer && rootMenuData.$layer.is(e.relatedTarget)) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }

            var targetMenu = currentMenuData.$menu ? currentMenuData : rootMenuData;
            targetMenu.$menu.children('.' + rootMenuData.classNames.hover).trigger('contextmenu:blur', { data: targetMenu, originalEvent: e }).children('.hover').trigger('contextmenu:blur', { data: targetMenu, originalEvent: e });

            if ($this.hasClass(rootMenuData.classNames.disabled) || $this.hasClass(rootMenuData.classNames.notSelectable)) {
                currentMenuData.$selected = null;
                return;
            }

            $this.trigger('contextmenu:focus', { data: currentMenuData, originalEvent: e });
        }
    }, {
        key: 'itemMouseleave',
        value: function itemMouseleave(e) {
            var $this = $(this);
            var data = $this.data();
            var currentMenuData = data.contextMenu;
            var rootMenuData = data.contextMenuRoot;

            if (rootMenuData !== currentMenuData && rootMenuData.$layer && rootMenuData.$layer.is(e.relatedTarget)) {
                if (typeof rootMenuData.$selected !== 'undefined' && rootMenuData.$selected !== null) {
                    rootMenuData.$selected.trigger('contextmenu:blur', { data: rootMenuData, originalEvent: e });
                }
                e.preventDefault();
                e.stopImmediatePropagation();
                rootMenuData.$selected = currentMenuData.$selected = currentMenuData.$node;
                return;
            }

            if (currentMenuData && currentMenuData.$menu && currentMenuData.$menu.hasClass(rootMenuData.classNames.visible)) {
                return;
            }

            $this.trigger('contextmenu:blur');
        }
    }, {
        key: 'itemClick',
        value: function itemClick(e) {
            var $this = $(this);
            var data = $this.data();
            var currentMenuData = data.contextMenu;
            var rootMenuData = data.contextMenuRoot;
            var key = data.contextMenuKey;
            var callback = void 0;

            if (!currentMenuData.items[key] || $this.is('.' + rootMenuData.classNames.disabled + ', .context-menu-separator, .' + rootMenuData.classNames.notSelectable) || $this.is('.context-menu-submenu') && rootMenuData.selectableSubMenu === false) {
                return;
            }

            e.preventDefault();
            e.stopImmediatePropagation();

            if ($.isFunction(currentMenuData.callbacks[key]) && Object.prototype.hasOwnProperty.call(currentMenuData.callbacks, key)) {
                callback = currentMenuData.callbacks[key];
            } else if ($.isFunction(rootMenuData.callback)) {
                callback = rootMenuData.callback;
            } else {
                return;
            }

            if (callback.call(rootMenuData.$trigger, e, key, currentMenuData, rootMenuData) !== false) {
                rootMenuData.$menu.trigger('contextmenu:hide');
            } else if (rootMenuData.$menu.parent().length) {
                rootMenuData.manager.operations.update.call(rootMenuData.$trigger, e, rootMenuData);
            }
        }
    }, {
        key: 'inputClick',
        value: function inputClick(e) {
            e.stopImmediatePropagation();
        }
    }, {
        key: 'hideMenu',
        value: function hideMenu(e, data) {
            var root = $(this).data('contextMenuRoot');
            root.manager.operations.hide.call(root.$trigger, e, root, data && data.force);
        }
    }, {
        key: 'focusItem',
        value: function focusItem(e) {
            e.stopPropagation();
            var $this = $(this);
            var data = $this.data();
            var currentMenuData = data.contextMenu;
            var rootMenuData = data.contextMenuRoot;

            if ($this.hasClass(rootMenuData.classNames.disabled) || $this.hasClass(rootMenuData.classNames.notSelectable)) {
                return;
            }

            $this.addClass([rootMenuData.classNames.hover, rootMenuData.classNames.visible].join(' ')).parent().find('.context-menu-item').not($this).removeClass(rootMenuData.classNames.visible).filter('.' + rootMenuData.classNames.hover).trigger('contextmenu:blur');

            currentMenuData.$selected = rootMenuData.$selected = $this;

            if (currentMenuData.$node && currentMenuData.$node.hasClass('context-menu-submenu')) {
                currentMenuData.$node.addClass(rootMenuData.classNames.hover);
            }

            if (currentMenuData.$node) {
                rootMenuData.positionSubmenu.call(currentMenuData.$node, e, currentMenuData.$menu);
            }
        }
    }, {
        key: 'blurItem',
        value: function blurItem(e) {
            e.stopPropagation();
            var $this = $(this);
            var data = $this.data();
            var currentMenuData = data.contextMenu;
            var rootMenuData = data.contextMenuRoot;

            if (rootMenuData.autoHide) {
                $this.removeClass(rootMenuData.classNames.visible);
            }
            $this.removeClass(rootMenuData.classNames.hover);
            currentMenuData.$selected = null;
        }
    }]);

    return ContextMenuEventHandler;
}();

exports.default = ContextMenuEventHandler;
;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (operation) {
    var $t = this;
    var $o = operation;
    if ($t.length > 0) {
        if (typeof operation === 'undefined') {
            $t.first().trigger('contextmenu');
        } else if (typeof operation.x !== 'undefined' && typeof operation.y !== 'undefined') {
            $t.first().trigger($.Event('contextmenu', {
                pageX: operation.x,
                pageY: operation.y,
                mouseButton: operation.button
            }));
        } else if (operation === 'hide') {
            var $menu = this.first().data('contextMenu') ? this.first().data('contextMenu').$menu : null;
            if ($menu) {
                $menu.trigger('contextmenu:hide');
            }
        } else if (operation === 'destroy') {
            $.contextMenu('destroy', { context: this });
        } else if (operation === 'update') {
            $.contextMenu('update', { context: this });
        } else if ($.isPlainObject(operation)) {
            operation.context = this;
            $.contextMenu('create', operation);
        } else if (operation === true) {
            $t.removeClass('context-menu-disabled');
        } else if (operation === false) {
            $t.addClass('context-menu-disabled');
        }
    } else {
        $.each($.contextMenu.menus, function () {
            if (this.selector === $t.selector) {
                $o.data = this;

                $.extend($o.data, { trigger: 'demand' });
            }
        });

        $.contextMenu.handle.contextmenu.call($o.target, $o);
    }

    return this;
};

/***/ })
/******/ ]);
});